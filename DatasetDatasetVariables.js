/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




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
		
			# Shapiro Test
			t(as.data.frame(BSky_Shapiro_Wilk_normality_test(vars = c(names(col)), dataset = '{{dataset.name}}'))) %>%
					BSkyFormat(outputTableRenames = paste("Shapiro Wilk Test results for variable:", names(col)))
			
			# Kolmogorov-Smirnov Test
			#suppressWarnings(stats::ks.test(x=var_list[[i]], y="pnorm") %>% BSkyFormat(outputTableIndex = c(1), outputTableRenames = paste("Kolmogorov-Smirnov Test resusts for variable:", names(col))))
			bsky_ks = suppressWarnings(stats::ks.test(x=var_list[[1]], y="pnorm"))
			bsky_ks_df = data.frame(bsky_ks$statistic, bsky_ks$p.value)
			names(bsky_ks_df) = c("D", "p-value")
			rownames(bsky_ks_df) = names(col)              
			bsky_ks_df%>% BSkyFormat(outputTableIndex = c(1), outputTableRenames = paste("Kolmogorov-Smirnov Test resusts for variable:", names(col)))
			
			#Anderson-Darling Test
			#nortest::ad.test(x=var_list[[i]]) %>%
			#		BSkyFormat(outputTableIndex = c(tableone=1), outputTableRenames = paste("Anderson-Darling Test results for variable:", names(col)))
			bsky_ad = suppressWarnings(nortest::ad.test(x=var_list[[1]]))
			bsky_ad_df = data.frame(bsky_ad$statistic, bsky_ad$p.value)
			names(bsky_ad_df) = c("A", "p-value")
			rownames(bsky_ad_df) = names(col)              
			bsky_ad_df%>% BSkyFormat(outputTableIndex = c(tableone=1), outputTableRenames = paste("Anderson-Darling Test results for variable:", names(col)))
			
			bsky_col_no_na = na.omit(col[[1]])
			bsky_col_no_na_df = data.frame(bsky_col_no_na = col[[1]], row_id = 1:nrow({{dataset.name}}))
			bsky_col_no_na_df = na.omit(bsky_col_no_na_df)
			
			####################
			# Histogram with normal curve and bin counts
			####################
				bsky_hist_plot = NULL 
				
				{{if(options.selected.showCountsChk != "TRUE" && options.selected.histCurveDispChk !="TRUE")}}
				bsky_hist_plot = ggplot(data= bsky_col_no_na_df, aes(x = bsky_col_no_na)) +
					geom_histogram(alpha=0.4, fill = "#ada9a9",color = "black", {{if (options.selected.histBins != "")}}  bins ={{selected.histBins | safe}}{{/if}} {{if( options.selected.histCurveDispChk =="TRUE")}}, aes(y =after_stat(density)){{/if}})
				{{#else}}
					{{if(options.selected.histCurveDispChk =="TRUE")}}
						#Compute scale factor between density and count
						bsky_hist_data <- ggplot_build(
						  ggplot(data = bsky_col_no_na_df, aes(x = bsky_col_no_na)) + 
							geom_histogram(
								alpha=0.4,  
								fill = "#ada9a9",
								color = "black"
								{{if (options.selected.histBins != "")}} , bins ={{selected.histBins | safe}} {{/if}}
								{{if(options.selected.histCurveDispChk =="TRUE")}} , aes(y = after_stat(density)) {{/if}}
						))$data[[1]]

							bsky_max_density <- max(bsky_hist_data$density, na.rm = TRUE)
							bsky_max_count <- max(bsky_hist_data$count, na.rm = TRUE)
						bsky_scale_factor <- bsky_max_count / bsky_max_density
					{{/if}}

					bsky_hist_plot = ggplot(data = bsky_col_no_na_df, aes(x = bsky_col_no_na)) +
					  # Histogram showing counts
					  geom_histogram(
						{{if(options.selected.histCurveDispChk =="TRUE")}} aes(y = after_stat(density)), {{/if}}
						{{if (options.selected.histBins != "")}}  bins ={{selected.histBins | safe}}, {{/if}}
						alpha=0.4,  
						fill = "#ada9a9", #"#727272"
						color = "black"
					  ){{if(options.selected.histCurveDispChk =="TRUE")}}+
						  # Add normal curve
						  stat_function(
							fun = dnorm,
							args = list(mean = mean(bsky_col_no_na_df\$bsky_col_no_na), sd = sd(bsky_col_no_na_df\$bsky_col_no_na)),
							color = "black",
							linewidth = 1
						  ) {{/if}}{{if(options.selected.showCountsChk =="TRUE")}} +
					  # Count labels without breaking y scale
					  stat_bin(
						{{if(options.selected.histCurveDispChk =="TRUE")}}
						aes(y = after_stat(density) {{if(options.selected.showCountsChk =="TRUE")}}, label = after_stat(count){{/if}}),
						{{#else}}
							{{if(options.selected.showCountsChk =="TRUE")}} aes(label = after_stat(count)), {{/if}}
						{{/if}}
						{{if (options.selected.histBins != "")}}  bins ={{selected.histBins | safe}}, {{/if}}
						geom = "text",
						vjust = -0.5,
						size = 5
					  ){{/if}}{{if(options.selected.histCurveDispChk =="TRUE")}}+ 
						  # Secondary Y-axis for counts
						  scale_y_continuous(
							name = "Density",
							sec.axis = sec_axis(~ . * bsky_scale_factor, name = "Counts")
						  ) 
					 {{/if}}
				{{/if}}
				
				# To remove padding of margin on the x axis on both side of the histogram plot
				# bsky_hist_plot = bsky_hist_plot + scale_x_continuous(expand = c(0, 0)) 
				
				bsky_hist_plot = bsky_hist_plot + labs(x=names(col), title= paste("Histogram for variable", names(col))) +
								xlab(names(col)) + 
								{{selected.BSkyThemes | safe}} \n
			
			suppressWarnings(plot(bsky_hist_plot))
			
			######################
			# Box Plot
			######################
			bsky_box_plot = NULL
			
			bsky_box_plot = ggplot(data= bsky_col_no_na_df, aes(x = "", y = bsky_col_no_na)) +
			geom_boxplot(fill = "#ada9a9", alpha=0.4, width = 0.2, outlier.colour = "red") +
			stat_summary(
				fun.data = function(y) {
				data.frame(
					y = c(median(y), quantile(y, probs = 0.25), quantile(y, probs = 0.75)),
					label = c(
						paste("Median\n",round(median(y), 2)),
						paste("Q1\n",round(quantile(y, probs = 0.25), 2)),
						paste("Q3\n",round(quantile(y, probs = 0.75), 2))
					)
				)
				},
			geom = "text",
			#aes(label = ..label..), 
			aes(label = after_stat(label)),
			position = position_dodge(width = 0.75),
			#hjust = -0.5,
			vjust = -1.5,
			color = "black",
			size = 4
			) + 
			labs(title = paste("Box Plot for variable", names(col)), x = "", y = "Value") +
			  {{selected.BSkyThemes | safe}} +
			coord_flip()
			 
			suppressWarnings(plot(bsky_box_plot))
			
			
			######################
			# P-P Plot
			bsky_ppPlot = NULL
			
			bsky_ppPlot = ggplot(data=bsky_col_no_na_df, aes(sample = bsky_col_no_na)) +
			stat_pp_point(distribution = "norm", detrend = FALSE) +
			stat_pp_line(detrend = FALSE) +      
			stat_pp_band(distribution="norm", detrend = FALSE) +     
			labs(sample=names(col) , title= paste("P-P Plot for variable", names(col))) +
			xlab("Probability Points") +
			ylab("Cumulative Probability") + 
			{{selected.BSkyThemes | safe}} \n
			
			suppressWarnings(plot(bsky_ppPlot))

			####################
			# Q-Q Plot
			bsky_qqPlot = NULL
			
			bsky_qqPlot = ggplot(data=bsky_col_no_na_df, aes(sample = bsky_col_no_na)) +
			stat_qq_point(distribution = "norm", detrend = FALSE) +
			stat_qq_line(detrend = FALSE) + 
			stat_qq_band(distribution="norm", detrend = FALSE) +
			labs(x=names(col) , title= paste("Q-Q Plot for variable",names(col))) +
			xlab("Theoretical Quantiles") +
			ylab("Sample Quantiles") + {{selected.BSkyThemes | safe}} \n
			
			suppressWarnings(plot(bsky_qqPlot))
			
			#######################
			# Line chart
			bsky_lineChart = NULL
			
			bsky_lineChart = ggplot(data=bsky_col_no_na_df, aes(x=row_id, y=bsky_col_no_na )) +
			geom_line(stat = "identity", position = "identity", alpha=0.5, linewidth = 1) +
			geom_point(size = 1) +
			labs(x="id",y=names(col), title= paste("Line chart (Observations connected by order of values for variable", names(col),")"))+
			xlab("id") + ylab(names(col)) + {{selected.BSkyThemes | safe}} \n
			
			suppressWarnings(plot(bsky_lineChart))
			
			BSkyGraphicsFormat(bSkyFormatAppRequest = FALSE, noOfGraphics= 5, isRmarkdownOutputOn = TRUE)
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
			showCountsChk: { el: new checkbox(config, { 
				label: DatasetDatasetVariables.t('showCountsChk'), 
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
			/*
			binwidth: {
                el: new input(config, {
                no: 'binwidth',
                allow_spaces: true,
                width: "w-25",
                type: "numeric",
                label: DatasetDatasetVariables.t('binwidth'),
                placeholder: "",
                extraction: "TextAsIs"
              }), r: ['{{binwidth|safe}}']
            },
			*/
        };

        const content = {
            left: [objects.content_var.el.content],
            right: [
					objects.variableListSelcted.el.content,
					objects.showCountsChk.el.content,
					objects.histCurveDispChk.el.content,
					objects.histBins.el.content, 
					//objects.binwidth.el.content, 
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
            //r_help: "help(data,package='utils')",
			r_help: DatasetDatasetVariables.t('help.r_help'),
            body: DatasetDatasetVariables.t('help.body')
        }
;
    }

}

module.exports = {
    render: () => new DatasetDatasetVariables().render()
}
