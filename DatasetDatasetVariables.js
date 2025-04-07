/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Explore variable(s)",
		navigation: "Explore variables",
		
		variableListSelcted: "Select one or more variables to explore",
		
		histCurveDispChk: "Display a normal curve on the histogram (missing values are removed for curve to display)",
		showCountsChk: "Display counts on the histogram bins",
		statTableOrientionChk: "Summary statistics in columns",
		histBins: "Specify the number of bins for the histogram",
		
		help: {
            title: "Explore characteristics of one or more variable(s)",
            r_help: "help(summary)",
			body: `
				<b>Description</b></br>
				Outputs the following descriptive statistics and plots:
				min, max, mean, median, modes, sum, sd, cv (coefficient of variance), var, stderror, skew, kurtosi, mad, iqr, and quartiles. In addition, 95% confidence interval for mean and sd are computed. Histogram and QQ plots are displayed. 
				<br/>
				<br/>
				For the detail help - use R help(summary, package = base)
				<br/>
				<br/>
				To compute skew and kurtosis, type = 3 parameter is used as default. With parameter type = 2, the values for skew and kurtosis will likely match with the values from MS Excel formula SKEW() and KURT()
				<br/>
				psych::skew(x, na.rm = TRUE, type=3)
				<br/>
				psych::kurtosi(x, na.rm = TRUE, type=3)
				<br/>
				See more details 
				<br/>
				help(skew, package = psych)
				<br/>
				help(kurtosi, package = psych)
				<br/>
			`
		},
		
	}
}

class DatasetDatasetVariables extends baseModal {
    constructor() {
        var config = {
            id: "DatasetDatasetVariables",
            label: localization.en.title,
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
	
	
	cv <<- function(x, na.rm = TRUE)  {
			sd(x, na.rm = na.rm)/mean(x, na.rm = na.rm)
	}
	
	range_spread <<- function(x, na.rm = TRUE)  {
			spread = max(x, na.rm = na.rm) - min(x, na.rm = na.rm)
			invisible(return(spread))
	}
	
	modes <<- function(x, na.rm = TRUE, max_display = 25) {
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
	
	sdMeanCI <<- function(x, na.rm = TRUE) {
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
	
			bsky_hist_plot = NULL 
			bsky_col_no_na = na.omit(col[[1]])
			bsky_col_no_na_df = data.frame(bsky_col_no_na = bsky_col_no_na)
			
			# Define the bin width for histogram
			bsky_bin_width <- (max(bsky_col_no_na) - min(bsky_col_no_na))/({{if (options.selected.histBins != "")}}{{selected.histBins | safe}}{{#else}}30{{/if}})
			
			bsky_hist_plot = ggplot(data = bsky_col_no_na_df, aes(x = bsky_col_no_na)) +
			# Histogram showing counts
			geom_histogram(
			{{if (options.selected.histBins != "")}}  bins ={{selected.histBins | safe}}, {{/if}}
			alpha=0.4,  
			fill = "#ada9a9", #"#727272",
			color = "black"
			) +
			labs(x=names(col), title= paste("Histogram for variable", names(col))) +
			xlab(names(col)) + 
			ylab("Counts") + 
			{{selected.BSkyThemes | safe}}
			
			{{if(options.selected.showCountsChk === "TRUE")}}
			# Add count labels on the histogram bars
			bsky_hist_plot = bsky_hist_plot + stat_bin(
			aes(label = ..count..), # Count values for labels
			geom = "text",
			{{if (options.selected.histBins != "")}}  bins ={{selected.histBins | safe}}, {{/if}}
			vjust = -0.5,
			color = "black",
			size = 5
			)
			{{/if}}
			
			{{if(options.selected.histCurveDispChk === 'TRUE')}}
			bsky_hist_plot = bsky_hist_plot +
			geom_density(
				aes(y = ..density.. * nrow(bsky_col_no_na_df) * bsky_bin_width) # Rescale density
				#color = "#F8766D",
				#size = 1
			)
			{{/if}}
				
			suppressWarnings(plot(bsky_hist_plot))
			
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
                    label: localization.en.summaryPrintChk, 
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
                    label: localization.en.variableListSelcted,
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
                    label: localization.en.statTableOrientionChk, 
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
			showCountsChk: { el: new checkbox(config, { 
				label: localization.en.showCountsChk, 
				no: "showCountsChk",
				bs_type: "valuebox",
				extraction: "BooleanValue",
                true_value: "TRUE",
                false_value: "FALSE",
				state:"checked",
				newline:true
				}),
			},
			histCurveDispChk: {
                el: new checkbox(config, {
                    label: localization.en.histCurveDispChk, 
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
                    label: localization.en.histBins,
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
					objects.showCountsChk.el.content,
					objects.histCurveDispChk.el.content,
					objects.histBins.el.content,
					objects.statTableOrientionChk.el.content
					],
            nav: {
                name: localization.en.navigation,
                icon: "icon-list-2",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }

}
module.exports.item = new DatasetDatasetVariables().render()