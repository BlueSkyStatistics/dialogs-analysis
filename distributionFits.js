
var localization = {
    en: {
        title: "Fit of univariate distributions to non-censored data",
		navigation: "Distribution Fit",
		
		variableSelcted: "Select a variable that contains the distribution",
		//boot: "(Optional) Boot values of skewness and kurtosis. If specified must be an integer above 10",
		//discreteChk: "Discrete - unchecked (default) for uniform, normal, logistic, lognormal, beta and gamma. Checked for poisson and negative binomial",
		
		label2: "Fit test for various distributions",
		
		normDistChk: "Normal",
		weibullDistChk: "Weibull",
		lnormDistChk: "Log Normal",
		poissonDistChk: "Poisson",
		expDistChk: "Exponential",
		gammaDistChk: "Gamma",
		nbinomDistChk: "Negative Binomial",
		geomDistChk: "Geometric",
		betaDistChk: "Beta",
		unifDistChk: "Uniform",
		logisDistChk: "Logistic",
		cauchyDistChk: "Cauchy",
		
		method: "Fitting method",
		gof: "Goodness-of-fit (gof) - required only when 'mge' method of fitting is chosen above",
		
		//fitdist(data, distr, method = c("mme", "mge", "mle", "qme", "mse"), 
		//	start=NULL, fix.arg=NULL, discrete, keepdata = TRUE, keepdata.nb=100, …)
		//"norm", "lnorm", "pois", "exp", "gamma", "nbinom", "geom", "beta", "unif" and "logis"
		
		//classical Cramer-von Mises distance ("CvM"), the classical Kolmogorov-Smirnov distance ("KS"), 
		//the classical Anderson-Darling distance ("AD") 
	
		help: {
            title: "Fit of univariate distributions to non-censored data",
            r_help: "help(fitdist, package = fitdistrplus)",
			body: `
				<b>Description</b></br>
				Fit of univariate distributions to non-censored data by maximum likelihood (mle), moment matching (mme), quantile matching (qme) or maximizing goodness-of-fit estimation (mge) which is also known as minimizing distance estimation.
				<br/>
				<br/>
				For the detail help - use R help(fitdist, package = fitdistrplus) and help(gofstat, package = fitdistrplus)
				<br/>
				<br/>
				The four possible fitting methods are described below:
				<br/>
				<br/>
				When method="mle" (default)
				Maximum likelihood estimation consists in maximizing the log-likelihood. A numerical optimization is carried out in mledist via optim to find the best values (see mledist for details).
				<br/>
				<br/>
				When method="mme"
				Moment matching estimation consists in equalizing theoretical and empirical moments. Estimated values of the distribution parameters are computed by a closed-form formula for the following distributions : "norm", "lnorm", "pois", "exp", "gamma", "nbinom", "geom", "beta", "unif" and "logis". Otherwise the theoretical and the empirical moments are matched numerically, by minimization of the sum of squared differences between observed and theoretical moments. In this last case, further arguments are needed in the call to fitdist: order and memp (see mmedist for details).
				<br/>
				<br/>
				When method = "qme"
				Quantile matching estimation consists in equalizing theoretical and empirical quantile. A numerical optimization is carried out in qmedist via optim to minimize of the sum of squared differences between observed and theoretical quantiles. The use of this method requires an additional argument probs, defined as the numeric vector of the probabilities for which the quantile(s) is(are) to be matched (see qmedist for details).
				<br/>
				<br/>
				When method = "mge"
				Maximum goodness-of-fit estimation consists in maximizing a goodness-of-fit statistics. A numerical optimization is carried out in mgedist via optim to minimize the goodness-of-fit distance. The use of this method requires an additional argument gof coding for the goodness-of-fit distance chosen. One can use the classical Cramer-von Mises distance ("CvM"), the classical Kolmogorov-Smirnov distance ("KS"), the classical Anderson-Darling distance ("AD") which gives more weight to the tails of the distribution, or one of the variants of this last distance proposed by Luceno (2006) (see mgedist for more details). This method is not suitable for discrete distributions.
				<br/>
				<br/>
				When method = "mse"
				Maximum goodness-of-fit estimation consists in maximizing the average log spacing. A numerical optimization is carried out in msedist via optim.
				<br/>
				<br/>
				convergence is 
				an integer code for the convergence of optim/constrOptim defined as below or defined by the user in the user-supplied optimization function. 0 indicates successful convergence. 1 indicates that the iteration limit of optim has been reached. 10 indicates degeneracy of the Nealder-Mead simplex. 100 indicates that optim encountered an internal error.
				<br/>
				<br/>
				Goodness-of-fit statistics are computed by gofstat(). The Chi-squared statistic is computed using cells defined by the argument chisqbreaks or cells automatically defined from data, in order to reach roughly the same number of observations per cell, roughly equal to the argument meancount, or sligthly more if there are some ties. 
				<br/>
				<br/>
				For continuous distributions, Kolmogorov-Smirnov, Cramer-von Mises and Anderson-Darling and statistics are also computed, as defined by Stephens (1986).
				<br/>
				<br/>
				Statistics of importance are Cramer-von Mises, Anderson-Darling and Kolmogorov statistics for continuous distributions and Chi-squared statistics for discrete ones ( "binom", "nbinom", "geom", "hyper" and "pois" )
				<br/>
				<br/>
				<a href="https://stats.stackexchange.com/questions/132652/how-to-determine-which-distribution-fits-my-data-best">For a good overview of distribution fit, see https://stats.stackexchange.com/questions/132652/how-to-determine-which-distribution-fits-my-data-best</a>
				<br/>
				<br/>
				<br/>
				-x-
			`
		},
	}
}

class distributionFit extends baseModal {
    constructor() {
        var config = {
            id: "distributionFit",
            label: localization.en.title,
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
		
		BSkyFormat(gofstat_comp, outputTableRenames=c("Goodness-of-fit: Details"))	
	}
}

	
dist_test_comp_list = list()
dist_test_comp_legendtext = c()

{{if(options.selected.normDistChk === 'TRUE')}} 
	fitg_norm = NULL
	{{if(options.selected.method === "mge")}}
		suppressWarnings(
			fitg_norm <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "norm",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_norm <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: normal distribution fit test for {{selected.variableSelcted | safe}}"))
	
		gofstat_format(dist_test_list = fitg_norm, fitname_list = c("normal"))
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
			fitg_weibull <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "weibull",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_weibull <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: Weibull distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_weibull, fitname_list = c("Weibull"))
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
			fitg_lnorm <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "lnorm",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_lnorm <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: log normal distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_lnorm, fitname_list = c("lnorm"))
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
			fitg_poisson <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "pois",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_poisson <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: poisson distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_poisson, fitname_list = c("poisson"))
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
			fitg_exp <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "exp",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_exp <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: exponential distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_exp, fitname_list = c("exponential"))
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
			fitg_gamma <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "gamma",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_gamma <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: gamma distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_gamma, fitname_list = c("gamma"))
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
			fitg_nbinom <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "nbinom",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_nbinom <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: negative binomial distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_nbinom, fitname_list = c("nbinom"))
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
			fitg_geom <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "geom",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_geom <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: geometric distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_geom, fitname_list = c("geometric"))
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
			fitg_beta <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "beta",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_beta <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: beta distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_beta, fitname_list = c("beta"))
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
			fitg_unif <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "unif",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_unif <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: uniform distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_unif, fitname_list = c("uniform"))
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
			fitg_logis <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "logis",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_logis <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: logistic distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_logis, fitname_list = c("logistic"))
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
			fitg_cauchy <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
							distr = "cauchy",
							method = '{{selected.method | safe}}',
							gof = '{{selected.gof | safe}}',
							keepdata = TRUE
							)
		)
	{{#else}}
		suppressWarnings(
			fitg_cauchy <- fitdistrplus::fitdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
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
		BSkyFormat(filter_empty_rows, 
						outputTableRenames = paste("Summary: Cauchy distribution fit test for {{selected.variableSelcted | safe}}"))
		
		gofstat_format(dist_test_list = fitg_cauchy, fitname_list = c("Cauchy"))
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
                    label: localization.en.variableSelcted,
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
                    label: localization.en.boot,
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
                    label: localization.en.discreteChk,
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
					label: localization.en.label2, 
					h: 6, 
					style: "mb-2",
				}) 
			},
			cauchyDistChk: {
                el: new checkbox(config, {
                    label: localization.en.cauchyDistChk,
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
                    label: localization.en.logisDistChk,
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
                    label: localization.en.unifDistChk,
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
                    label: localization.en.betaDistChk,
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
                    label: localization.en.geomDistChk,
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
                    label: localization.en.nbinomDistChk,
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
                    label: localization.en.gammaDistChk,
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
                    label: localization.en.expDistChk,
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
                    label: localization.en.poissonDistChk,
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
                    label: localization.en.lnormDistChk,
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
                    label: localization.en.weibullDistChk,
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
                    label: localization.en.normDistChk,
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
                    label: localization.en.method,
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
                    label: localization.en.gof,
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
                name: localization.en.navigation,
                icon: "icon-gaussian-function",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new distributionFit().render()