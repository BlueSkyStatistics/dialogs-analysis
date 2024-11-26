


class DatasetDatasetVariables extends baseModal {
    static dialogId = 'DatasetDatasetVariables'
    static t = baseModal.makeT(DatasetDatasetVariables.dialogId)

    constructor() {
        var config = {
            id: DatasetDatasetVariables.dialogId,
            label: DatasetDatasetVariables.t('title'),
            modalType: "two",
            RCode:`
	
	require(psych)
	require(dplyr)
	require(nortest)
	require(ggplot2)
	require(ggthemes)
	require(qqplotr)

	var_list = NULL
	histPlot = NULL
	qqPlot = NULL
	
	
	cv <- function(x, na.rm = TRUE)  {
			sd(x, na.rm = na.rm)/mean(x, na.rm = na.rm)
	}
	
	range_spread <- function(x, na.rm = TRUE)  {
			spread = max(x, na.rm = na.rm) - min(x, na.rm = na.rm)
			invisible(return(spread))
	}
	
	modes <- function(x, na.rm = TRUE, max_display = 25) {
	  if(length(x) != length(unique(x))){
		x = x[!is.na(x)]
		ux <- unique(x)
		if(length(ux) > max_display){ 
			ux = ux[1:max_display]
			tab <- tabulate(match(x, ux))
			invisible(return(paste(paste(ux[tab == max(tab)], collapse=","),",...", sep="")))
		} else {
			tab <- tabulate(match(x, ux))
			invisible(return(paste(ux[tab == max(tab)], collapse=",")))
		}
	  } else {
		invisible(return(' '))
	  }
	}
	
	sdMeanCI <- function(x, na.rm = TRUE) {
		# Calculate the mean of the sample data
		mean_value = mean(x, na.rm = na.rm)
		 
		# Compute the size
		#n <- length(x)
		n = length(x[!is.na(x)])
		 
		# Compute the standard deviation
		standard_deviation = sd(x, na.rm = na.rm)
		 
		# Compute the standard error
		standard_error = standard_deviation / sqrt(n)
		alpha = 0.05
		degrees_of_freedom = n - 1
		t_score = qt(p=alpha/2, df=degrees_of_freedom,lower.tail=F)
		margin_error = t_score * standard_error
		 
		# Calculate the lower bound and upper bound
		lower_bound = mean_value - margin_error
		upper_bound = mean_value + margin_error
		
		CI_values = c(mean = mean_value, '95% lower bound' = lower_bound, '95% upper bound' = upper_bound)
		
		#Calculate the CI for SD
		lower_bound.sd = sqrt(n-1)*standard_deviation/sqrt(qchisq(1-alpha/2, df = n-1))
		upper_bound.sd = sqrt(n-1)*standard_deviation/sqrt(qchisq(alpha/2, df = n-1))
		
		CI_values = rbind(CI_values, c(sd = standard_deviation, '95% lower bound' = lower_bound.sd, '95% upper bound' = upper_bound.sd))
		
		dimnames(CI_values)[[2]] = c("", '95% lower bound', '95% upper bound')
		rownames(CI_values) = c("mean", "sd")
		
		invisible(return(CI_values))
	}
	
	var_list = list({{selected.variableListSelcted | safe}})
	
	for(i in 1:length(var_list)){
		col = list(var_list[[i]])
		names(col) = names(var_list)[i]
		BSkyFormat(paste("Exploration of the variable:", names(col), "from dataset {{dataset.name}}"))
		
		BSkySummaryStats(datasetName = '{{dataset.name}}',
							datasetColumnObjects = col ,
							stats = c(
							min=TRUE, 
							max=TRUE, 
							mean=TRUE, 
							median=TRUE, 
							sum=FALSE, 
							sd=TRUE, 
							stderror=TRUE, 
							skew=TRUE,
							mad=TRUE,
							kurtos=TRUE,
							iqr=TRUE, 
							quantiles=TRUE), 
							quantilesProbs = c(0, 0.25, 0.5, 0.75, 1), 
							maxsum = 60, 
							additionalStats = c('cv','var','modes','range_spread'),
							long_table = {{selected.statTableOrientionChk | safe}}) %>% 
										BSkyFormat(outputTableIndex = c(2,3), outputTableRenames = paste("Numerical Statistical Analysis for variable:", names(col)))
	
		
		if(is.numeric(var_list[[i]])){
			sdMeanCI(col[[1]]) %>%
			BSkyFormat(outputTableRenames = paste("Confidence Interval of mean and sd for variable:", names(col)))
		
			BSky_Shapiro_Wilk_normality_test(vars = c(names(col)), dataset = '{{dataset.name}}') %>%
					BSkyFormat(outputTableRenames = paste("Shapiro Wilk Test results for variable:", names(col)))

			nortest::ad.test(x=var_list[[i]]) %>%
					BSkyFormat(outputTableIndex = c(tableone=1), outputTableRenames = paste("Anderson-Darling Test results for variable:", names(col)))
		
			suppressWarnings(stats::ks.test(x=var_list[[i]], y="pnorm") %>% BSkyFormat(outputTableIndex = c(1), outputTableRenames = paste("Kolmogorov-Smirnov Test resusts for variable:", names(col))))
	
			{{if(options.selected.histCurveDispChk === 'TRUE')}}
				histPlot = ggplot(data={{dataset.name}}, aes(x = col[[1]])) +
					geom_histogram(bins = {{selected.histBins | safe}}, alpha=1,  fill ="#727272"  , aes(y =..density..)) +
					stat_function(fun = dnorm, args = list(mean = mean(var_list[[i]], na.rm = TRUE) , sd = sd(var_list[[i]], na.rm = TRUE)) , col = "#eaf820", linewidth = 2) +
					labs(x=names(col), title= paste("Histogram for variable", names(col))) +
					xlab(names(col)) + 
					ylab("Density") + {{selected.BSkyThemes | safe}} \n
			{{#else}}
				histPlot = ggplot(data={{dataset.name}}, aes(x = col[[1]])) +
					geom_histogram(bins = {{selected.histBins | safe}}, alpha=1,  fill ="#727272") +
					labs(x=names(col), title= paste("Histogram for variable", names(col))) +
					xlab(names(col)) + 
					ylab("Counts") + {{selected.BSkyThemes | safe}}	\n	
			{{/if}}
			suppressWarnings(plot(histPlot))
			qqPlot = ggplot(data={{dataset.name}}, aes(sample = col[[1]])) +
			stat_qq_point(distribution = "norm", detrend = FALSE) +
			stat_qq_line(detrend = FALSE) + 
			labs(x=names(col) , title= paste("Q-Q Plot for variable",names(col))) +
			xlab("Theoretical Quantiles") +
			ylab("Sample Quantiles") + {{selected.BSkyThemes | safe}} \n
			suppressWarnings(plot(qqPlot))
			
			BSkyGraphicsFormat(bSkyFormatAppRequest = FALSE, noOfGraphics= 2, isRmarkdownOutputOn = TRUE)
		}
	}
	
`
        };
        var objects = {
			content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) }, 
			/*summaryPrintChk: {
                el: new checkbox(config, {
                    label: DatasetDatasetVariables.t('summaryPrintChk'), 
					no: "summaryPrintChk",
                    bs_type: "valuebox",
                    style: "mt-2 mb-3",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },*/
			
			variableListSelcted: {
                el: new dstVariableList(config, {
                    label: DatasetDatasetVariables.t('variableListSelcted'),
                    no: "variableListSelcted",
                    required: true,
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					//filter: "Numeric|Scale",
					style: "mt-1 ml-3",
                    extraction: "CustomFormat",
                }), r: ['{{ var | safe}}']
            },
			statTableOrientionChk: {
                el: new checkbox(config, {
                    label: DatasetDatasetVariables.t('statTableOrientionChk'), 
					no: "statTableOrientionChk",
                    bs_type: "valuebox",
                    style: "mt-2 mb-2",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					//state:"checked",
					newline: true,
                })
            },
			histCurveDispChk: {
                el: new checkbox(config, {
                    label: DatasetDatasetVariables.t('histCurveDispChk'), 
					no: "histCurveDispChk",
                    bs_type: "valuebox",
                    style: "mt-2 mb-1",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					state:"checked",
					newline: true,
                })
            },
			histBins: {
                el: new input(config, {
                    no: 'histBins',
                    label: DatasetDatasetVariables.t('histBins'),
                    placeholder: "",
                    required: false,
                    type: "numeric",
                    extraction: "TextAsIs",
					allow_spaces:true,
                    value: "9",
					 style: "mb-3",
					//wrapped: '%val%',
					width: "w-25",
                })
            },
        };

        const content = {
            left: [objects.content_var.el.content],
            right: [
					objects.variableListSelcted.el.content, 
					objects.histCurveDispChk.el.content,
					objects.histBins.el.content,
					objects.statTableOrientionChk.el.content
					],
            nav: {
                name: DatasetDatasetVariables.t('navigation'),
                icon: "icon-list-2",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: DatasetDatasetVariables.t('help.title'),
            r_help: "help(data,package='utils')",
            body: DatasetDatasetVariables.t('help.body')
        }
;
    }

}

module.exports = {
    render: () => new DatasetDatasetVariables().render()
}
