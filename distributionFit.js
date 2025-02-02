


class distributionFit extends baseModal {
    static dialogId = 'distributionFit'
    static t = baseModal.makeT(distributionFit.dialogId)

    constructor() {
        var config = {
            id: distributionFit.dialogId,
            label: distributionFit.t('title'),
            modalType: "two",
            RCode:`

require(fitdistrplus)

gofstat_format <- function(dist_test_list = list(), fitname_list = c())
{
	if(length(dist_test_list) > 0){
		gofstat_comp = gofstat(dist_test_list, fitnames = fitname_list)
		if(!is.null(gofstat_comp$ks)){
			gofstat_comp_stat = rbind(gofstat_comp$ks, gofstat_comp$cvm, gofstat_comp$ad)
			row.names(gofstat_comp_stat) = c("Kolmogorov-Smirnov", "Cramer-von Mises", "Anderson-Darling")
			BSkyFormat(gofstat_comp_stat, outputTableRenames="Goodness-of-fit statistics")
		}
		gofstat_comp_criterion = rbind(gofstat_comp$aic, gofstat_comp$bic)
		row.names(gofstat_comp_criterion) = c("Akaike's Information Criterion (AIC)", "Bayesian Information Criterion (BIC)")
		BSkyFormat(gofstat_comp_criterion, outputTableRenames="Goodness-of-fit criteria")
		
		#BSkyFormat(gofstat_comp, outputTableRenames=c("Goodness-of-fit: Details"))	
	}
}

	
dist_test_comp_list = list()
dist_test_comp_legendtext = c()
boost_niter = 600

bSkyVarData = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}})
bSkyVarData = bSkyVarData[!is.na(bSkyVarData)]

{{if(options.selected.normDistChk === 'TRUE')}} 
	fitg_norm = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_norm <- fitdist(data = bSkyVarData, 
							distr = "norm",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_norm <- fitdist(data = bSkyVarData, 
							distr = "norm",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_norm)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_norm))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "normal")
		
		filter_empty_rows = BSkyFormat2(fitg_norm)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: normal distribution fit test for {{selected.variableSelcted | safe}}"))
	
		gofstat_format(dist_test_list = fitg_norm, fitname_list = c("normal"))
	}
	
	if(!is.null(fitg_norm)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_norm, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
	
	if(!is.null(fitg_norm)) {
		plot(fitg_norm, demp = TRUE)
		cdfcomp(fitg_norm, addlegend=TRUE)
		denscomp(fitg_norm, addlegend=TRUE)
		ppcomp(fitg_norm, addlegend=TRUE)
		qqcomp(fitg_norm, addlegend=TRUE)
	}
{{/if}}

{{if(options.selected.weibullDistChk === 'TRUE')}} 
	fitg_weibull = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_weibull <- fitdist(data = bSkyVarData, 
							distr = "weibull",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_weibull <- fitdist(data = bSkyVarData, 
							distr = "weibull",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_weibull)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_weibull))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "Weibull")
		
		filter_empty_rows = BSkyFormat2(fitg_weibull)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: Weibull distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_weibull, fitname_list = c("Weibull"))
	}
		
	if(!is.null(fitg_weibull)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_weibull, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_weibull)) {
		plot(fitg_weibull, demp = TRUE)
		cdfcomp(fitg_weibull, addlegend=TRUE)
		denscomp(fitg_weibull, addlegend=TRUE)
		ppcomp(fitg_weibull, addlegend=TRUE)
		qqcomp(fitg_weibull, addlegend=TRUE)
	}
{{/if}}

{{if(options.selected.lnormDistChk === 'TRUE')}} 
	fitg_lnorm = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_lnorm <- fitdist(data = bSkyVarData, 
							distr = "lnorm",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_lnorm <- fitdist(data = bSkyVarData, 
							distr = "lnorm",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_lnorm)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_lnorm))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "lnorm")
		
		filter_empty_rows = BSkyFormat2(fitg_lnorm)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: log normal distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_lnorm, fitname_list = c("lnorm"))
	}
		
	if(!is.null(fitg_lnorm)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_lnorm, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
	
	if(!is.null(fitg_lnorm)) {
		plot(fitg_lnorm, demp = TRUE)
		cdfcomp(fitg_lnorm, addlegend=TRUE)
		denscomp(fitg_lnorm, addlegend=TRUE)
		ppcomp(fitg_lnorm, addlegend=TRUE)
		qqcomp(fitg_lnorm, addlegend=TRUE)
	}
{{/if}}

{{if(options.selected.poissonDistChk === 'TRUE')}} 
	fitg_poisson = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_poisson <- fitdist(data = bSkyVarData, 
							distr = "pois",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_poisson <- fitdist(data = bSkyVarData, 
							distr = "pois",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_poisson)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_poisson))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "poisson")
		
		filter_empty_rows = BSkyFormat2(fitg_poisson)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: poisson distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_poisson, fitname_list = c("poisson"))
	}
		
	if(!is.null(fitg_poisson)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_poisson, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_poisson)) {
		plot(fitg_poisson, demp = TRUE)
		cdfcomp(fitg_poisson, addlegend=TRUE)
		denscomp(fitg_poisson, addlegend=TRUE)
		ppcomp(fitg_poisson, addlegend=TRUE)
		qqcomp(fitg_poisson, addlegend=TRUE)
	}
{{/if}}

{{if(options.selected.expDistChk === 'TRUE')}} 
	fitg_exp = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_exp <- fitdist(data = bSkyVarData, 
							distr = "exp",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_exp <- fitdist(data = bSkyVarData, 
							distr = "exp",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_exp)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_exp))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "exponential")
		
		filter_empty_rows = BSkyFormat2(fitg_exp)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: exponential distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_exp, fitname_list = c("exponential"))
	}
		
	if(!is.null(fitg_exp)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_exp, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_exp)) {
		plot(fitg_exp, demp = TRUE)
		cdfcomp(fitg_exp, addlegend=TRUE)
		denscomp(fitg_exp, addlegend=TRUE)
		ppcomp(fitg_exp, addlegend=TRUE)
		qqcomp(fitg_exp, addlegend=TRUE)
	}
{{/if}}

{{if(options.selected.gammaDistChk === 'TRUE')}} 
	fitg_gamma = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_gamma <- fitdist(data = bSkyVarData, 
							distr = "gamma",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_gamma <- fitdist(data = bSkyVarData, 
							distr = "gamma",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_gamma)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_gamma))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "gamma")
		
		filter_empty_rows = BSkyFormat2(fitg_gamma)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: gamma distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_gamma, fitname_list = c("gamma"))
	}
	
	if(!is.null(fitg_gamma)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_gamma, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_gamma)) {
		plot(fitg_gamma, demp = TRUE)
		cdfcomp(fitg_gamma, addlegend=TRUE)
		denscomp(fitg_gamma, addlegend=TRUE)
		ppcomp(fitg_gamma, addlegend=TRUE)
		qqcomp(fitg_gamma, addlegend=TRUE)
	}
{{/if}}
	
{{if(options.selected.nbinomDistChk === 'TRUE')}} 
	fitg_nbinom = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_nbinom <- fitdist(data = bSkyVarData, 
							distr = "nbinom",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_nbinom <- fitdist(data = bSkyVarData, 
							distr = "nbinom",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_nbinom)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_nbinom))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "nbinom")
		
		filter_empty_rows = BSkyFormat2(fitg_nbinom)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: negative binomial distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_nbinom, fitname_list = c("nbinom"))
	}
		
	if(!is.null(fitg_nbinom)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_nbinom, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_nbinom)) {
		plot(fitg_nbinom, demp = TRUE)
		cdfcomp(fitg_nbinom, addlegend=TRUE)
		denscomp(fitg_nbinom, addlegend=TRUE)
		ppcomp(fitg_nbinom, addlegend=TRUE)
		qqcomp(fitg_nbinom, addlegend=TRUE)
	}
{{/if}}
	
{{if(options.selected.geomDistChk === 'TRUE')}} 
	fitg_geom = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_geom <- fitdist(data = bSkyVarData, 
							distr = "geom",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_geom <- fitdist(data = bSkyVarData, 
							distr = "geom",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_geom)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_geom))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "geometric")
		
		filter_empty_rows = BSkyFormat2(fitg_geom)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: geometric distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_geom, fitname_list = c("geometric"))
	}
		
	if(!is.null(fitg_geom)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_geom, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_geom)) {
		plot(fitg_geom, demp = TRUE)
		cdfcomp(fitg_geom, addlegend=TRUE)
		denscomp(fitg_geom, addlegend=TRUE)
		ppcomp(fitg_geom, addlegend=TRUE)
		qqcomp(fitg_geom, addlegend=TRUE)
	}
{{/if}}
	
{{if(options.selected.betaDistChk === 'TRUE')}} 
	fitg_beta = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_beta <- fitdist(data = bSkyVarData, 
							distr = "beta",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_beta <- fitdist(data = bSkyVarData, 
							distr = "beta",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_beta)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_beta))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "beta")
		
		filter_empty_rows = BSkyFormat2(fitg_beta)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: beta distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_beta, fitname_list = c("beta"))
	}
		
	if(!is.null(fitg_beta)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_beta, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_beta)) {
		plot(fitg_beta, demp = TRUE)
		cdfcomp(fitg_beta, addlegend=TRUE)
		denscomp(fitg_beta, addlegend=TRUE)
		ppcomp(fitg_beta, addlegend=TRUE)
		qqcomp(fitg_beta, addlegend=TRUE)
	}
{{/if}}
	
{{if(options.selected.unifDistChk === 'TRUE')}} 
	fitg_unif = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_unif <- fitdist(data = bSkyVarData, 
							distr = "unif",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_unif <- fitdist(data = bSkyVarData, 
							distr = "unif",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_unif)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_unif))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "uniform")
		
		filter_empty_rows = BSkyFormat2(fitg_unif)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: uniform distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_unif, fitname_list = c("uniform"))
	}
		
	if(!is.null(fitg_unif)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_unif, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_unif)) {
		plot(fitg_unif, demp = TRUE)
		cdfcomp(fitg_unif, addlegend=TRUE)
		denscomp(fitg_unif, addlegend=TRUE)
		ppcomp(fitg_unif, addlegend=TRUE)
		qqcomp(fitg_unif, addlegend=TRUE)
	}
{{/if}}
	
{{if(options.selected.logisDistChk === 'TRUE')}} 
	fitg_logis = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_logis <- fitdist(data = bSkyVarData, 
							distr = "logis",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_logis <- fitdist(data = bSkyVarData, 
							distr = "logis",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_logis)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_logis))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "logistic")
		
		filter_empty_rows = BSkyFormat2(fitg_logis)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: logistic distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_logis, fitname_list = c("logistic"))
	}
		
	if(!is.null(fitg_logis)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_logis, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_logis)) {
		plot(fitg_logis, demp = TRUE)
		cdfcomp(fitg_logis, addlegend=TRUE)
		denscomp(fitg_logis, addlegend=TRUE)
		ppcomp(fitg_logis, addlegend=TRUE)
		qqcomp(fitg_logis, addlegend=TRUE)
	}
{{/if}}
	
{{if(options.selected.cauchyDistChk === 'TRUE')}} 
	fitg_cauchy = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_cauchy <- fitdist(data = bSkyVarData, 
							distr = "cauchy",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_cauchy <- fitdist(data = bSkyVarData, 
							distr = "cauchy",
							method = '{{selected.method | safe}}',
							keepdata = TRUE
							)
		)
	{{/if}}
	
	if(!is.null(fitg_cauchy)) {
		dist_test_comp_list = c(dist_test_comp_list, list(fitg_cauchy))
		dist_test_comp_legendtext = c(dist_test_comp_legendtext, "Cauchy")
		
		filter_empty_rows = BSkyFormat2(fitg_cauchy)$tables[[1]]
		filter_empty_rows = filter_empty_rows[filter_empty_rows[,2]!="",]
		
		tmp_row = filter_empty_rows[2,]
		filter_empty_rows[2,] = filter_empty_rows[3,]
		filter_empty_rows[3,] = tmp_row
		filter_empty_rows[2,1] = "Std. Error"
		
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: Cauchy distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_cauchy, fitname_list = c("Cauchy"))
	}
		
	if(!is.null(fitg_cauchy)) {
		b1 = NULL
		b1 = suppressWarnings(bootdist(fitg_cauchy, niter= boost_niter))
		CIcdfplot(b1, CI.level= 95/100, CI.output = "probability", main = "Probability plot (Empirical and Theoretical CDF with 95% CI) for {{selected.variableSelcted | safe}}", xlab="{{selected.variableSelcted | safe}}")
	}
		
	if(!is.null(fitg_cauchy)) {
		plot(fitg_cauchy, demp = TRUE)
		cdfcomp(fitg_cauchy, addlegend=TRUE)
		denscomp(fitg_cauchy, addlegend=TRUE)
		ppcomp(fitg_cauchy, addlegend=TRUE)
		qqcomp(fitg_cauchy, addlegend=TRUE)
	}
{{/if}}

if(length(dist_test_comp_list) > 1){
	BSkyFormat("Comparison of the distribution fits")
	
	gofstat_format(dist_test_list = dist_test_comp_list, fitname_list = dist_test_comp_legendtext)
	
	cdfcomp(dist_test_comp_list, legendtext=dist_test_comp_legendtext)
	denscomp(dist_test_comp_list, legendtext=dist_test_comp_legendtext)
	qqcomp(dist_test_comp_list, legendtext=dist_test_comp_legendtext)
	ppcomp(dist_test_comp_list, legendtext=dist_test_comp_legendtext)
}
			
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) }, 
			variableSelcted: {
                el: new dstVariable(config, {
                    label: distributionFit.t('variableSelcted'),
                    no: "variableSelcted",
                    required: true,
                    //filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					filter: "Numeric|Scale",
					//style: "mt-1 ml-3",
                    extraction: "NoPrefix",
                }), r: ['{{ var | safe}}']
            },
			/*
			boot: {
                el: new input(config, {
                    no: 'boot',
                    label: distributionFit.t('boot'),
                    placeholder: "",
                    required: false,
                    type: "numeric",
					//filter: "character|numeric",
					//style: "ml-5",
                    extraction: "TextAsIs",
					allow_spaces:true,
                    value: "",
					style: "mb-3",
					width: "w-25",
                })
            },
			*/
			/*discreteChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('discreteChk'),
                    no: "discreteChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },*/
			label2: { 
				el: new labelVar(config, { 
					label: distributionFit.t('label2'), 
					h: 6, 
					style: "mb-2",
				}) 
			},
			cauchyDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('cauchyDistChk'),
                    no: "cauchyDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			logisDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('logisDistChk'),
                    no: "logisDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			unifDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('unifDistChk'),
                    no: "unifDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			betaDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('betaDistChk'),
                    no: "betaDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			geomDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('geomDistChk'),
                    no: "geomDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			nbinomDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('nbinomDistChk'),
                    no: "nbinomDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			gammaDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('gammaDistChk'),
                    no: "gammaDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			expDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('expDistChk'),
                    no: "expDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			poissonDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('poissonDistChk'),
                    no: "poissonDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			lnormDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('lnormDistChk'),
                    no: "lnormDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            }, 
			weibullDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('weibullDistChk'),
                    no: "weibullDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			normDistChk: {
                el: new checkbox(config, {
                    label: distributionFit.t('normDistChk'),
                    no: "normDistChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			
			method: {
                el: new selectVar(config, {
                    no: 'method',
                    label: distributionFit.t('method'),
                    multiple: false,
                    //required: true,
                    extraction: "NoPrefix|UseComma",
					options: ["mle", "mme", "mge", "qme", "mse"],
                    default: "mle",
                })
            },
			gof: {
                el: new selectVar(config, {
                    no: 'gof',
                    label: distributionFit.t('gof'),
                    multiple: false,
                    //required: true,
                    extraction: "NoPrefix|UseComma",
					options: ["AD", "KS", "CvM", "ADR", "ADL", "AD2", "AD2R", "AD2L"],
                    default: "AD",
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [
					objects.variableSelcted.el.content,
					//objects.boot.el.content,
					//objects.discreteChk.el.content, 
					
					objects.label2.el.content,
					objects.normDistChk.el.content,
					objects.weibullDistChk.el.content,
					objects.lnormDistChk.el.content,
					objects.poissonDistChk.el.content,
					objects.expDistChk.el.content,
					objects.gammaDistChk.el.content,
					objects.nbinomDistChk.el.content,
					objects.geomDistChk.el.content,
					objects.betaDistChk.el.content,
					objects.unifDistChk.el.content,
					objects.logisDistChk.el.content, 
					objects.cauchyDistChk.el.content,
					objects.method.el.content,
					objects.gof.el.content
					],
            nav: {
                name: distributionFit.t('navigation'),
                icon: "icon-sixsigma",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: distributionFit.t('help.title'),
            r_help: distributionFit.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: distributionFit.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new distributionFit().render()
}
