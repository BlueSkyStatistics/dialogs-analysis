/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "t-test, One Sample",
        navigation: "t-test, One Sample",
		
        tvarbox1: "Select variables",
        textbox1: "Confidence interval",
        textbox2: "Null hypothesis (mu)",
        label1: "Aternative hypothesis",
        test1: "Population mean !=mu",
        test2: "Population mean > mu",
        test3: "Population mean < mu",
        testval: "Test value (mu)",
        label2: "Missing values",
        Analysis: "Analysis by analysis",
        Listwise: "Listwise",
        conflevel: "Confidence interval:",
		
		showHistogramChk: "Show histogram with overlaid t-test result",
		specify_a_title: "Enter a title",
		specify_a_subtitle: "Enter a subtitle",
        x_title: "X axis label",
        y_title: "Y axis label",
        
		MissingVals: "Options for missing values",
        cohensdNoCorrection: "Cohen's d",
        hedgesgNoCorrection: "Hedges' g",
        glassd: "Glass's delta",
        hedgesgCorrect: "Hedges' g with bias corrected",
        glassdCorrect: "Correct bias for Glass's Delta",
        hedgesg: "Hedges' g",
        glassd: "Glass's delta",
        effectsizes: "Effect sizes",
        cohensdCorrect: "Cohen's d with bias corrected",
        label3: "Options for Cohen's d",
        label4: "Options for Hedges' g",
        showEffectSizes: "Display effect sizes",
        help: {
            title: "t-test, One Sample",
            r_help: "help(t.test, package=stats)",
            body: `
<b>Description</b></br>
Performs one sample t-tests on selected variables. Optionally computes effect size indices for standardized differences: Cohen's d and Hedges' g (This function returns the population estimate.)
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyOneSmTTest(varNamesOrVarGlobalIndices  =c('var1','var2'), mu=.9, conf.level=0.95, alternative= "two.sided",datasetNameOrDatasetGlobalIndex='Dataset', missing=1) 
cohens_d(var1~1, mu=valuetocompare, correction =FALSE, ci = 0.95)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
varNamesOrVarGlobalIndices: selected scale variables (say var1, var2)
</li>
<li>
mu: a number indicating the true value of the mean. (say 10)
</li>
<li>
conf.level: a numeric value  (say 0.95) .
</li>
<li>
missing: missing values are handled on a per variable basis (missing =0) or list wise across all variables (missing=1). 
</li>
<li>
datasetNameOrDatasetGlobalIndex: Name of the dataset (say Dataset)  from which var1, var2 and var3 are selected.
</li>
<li>
alternative:  a character string specifying the alternative hypothesis, must be one of "two.sided"  (default), "greater" or "less". You can specify just the initial letter.
</li>
</ul>
<b>Details</b></br>
A list with the results of the test
<br/>
<b>Example</b></br>
<code> 
Dataset <- data.frame(Expenses=c(20,23,19,25,26), Sales=c(48,50,55,51,49), Gender=c('m','f','f','m','m'), Deptt=c('IT', 'Sales', 'IT','Sales','IT'))</br>
# Dataset must also be loaded in the UI grid</br>
BSkyLoadRefreshDataframe(Dataset)</br> 
BSky_One_Simple_T_Test = BSkyOneSmTTest(varNamesOrVarGlobalIndices =c('Sales','Expenses'),mu=.9,conf.level=0.95,alternative ="two.sided", datasetNameOrDatasetGlobalIndex ='Dataset',missing=1</br>
</code> <br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(t.test, package ='stats') by creating a R code chunk by clicking + in the output window
`
        }
    }
}
class ttestOneSample extends baseModal {
    constructor() {
        var config = {
            id: "ttestOneSample",
            label: localization.en.title,
            splitProcessing: false,
            modalType: "two",
            RCode: `
#Run the t-test
require(effectsize)
require(ggplot2)

{{if (options.selected.showEffectSizes == "TRUE")}}
	bsky_t_test_result = {{dataset.name}} %>%
		dplyr::select({{selected.tvarbox1 | safe}}) %>%
			BSkyOneSmTTest( 
			mu = {{selected.testval | safe}}, 
			conf.level = {{selected.conflevel | safe}}, 
			alternative ='{{selected.gpbox2 | safe}}',
			cohens_d = {{if (options.selected.cohensd =="0")}}TRUE{{#else}}FALSE{{/if}},
			cohensd_correction = {{if (options.selected.cohensd =="1")}}TRUE{{#else}}FALSE{{/if}},
			hedges_g = {{if (options.selected.hedgesg =="0")}}TRUE{{#else}}FALSE{{/if}},
			hedgesg_correction = {{if (options.selected.hedgesg =="1")}}TRUE{{#else}}FALSE{{/if}},
			missing={{selected.Missvals | safe}},
			datasetNameOrDatasetGlobalIndex ='{{dataset.name}}') 
			
			bsky_t_test_result  %>%
				BSkyFormat()
{{#else}}
	bsky_t_test_result = {{dataset.name}} %>%
		dplyr::select({{selected.tvarbox1 | safe}}) %>%
			BSkyOneSmTTest( 
			mu = {{selected.testval | safe}}, 
			conf.level = {{selected.conflevel | safe}}, 
			alternative ='{{selected.gpbox2 | safe}}',
			missing={{selected.Missvals | safe}},
			datasetNameOrDatasetGlobalIndex ='{{dataset.name}}') 
			
			bsky_t_test_result %>%
				BSkyFormat()
{{/if}}

{{if (options.selected.showHistogramChk == "TRUE")}}

bsky_selected_names = colnames(dplyr::select({{dataset.name}}, {{selected.tvarbox1 | safe}}))

for(i in 1:length(bsky_selected_names)){
	bsky_ci_low   <-  as.numeric(bsky_t_test_result[[2]][2+i, 5])
	bsky_ci_high  <- as.numeric(bsky_t_test_result[[2]][2+i, 6])
	
	# After extracting ci_low and ci_high (which are mean differences):
	bsky_mu <- {{selected.testval | safe}} 

	bsky_ci_low_plot  <- bsky_mu + bsky_ci_low
	bsky_ci_high_plot <- bsky_mu + bsky_ci_high

	# --- Fixed 9 bins to match standard histogram UI ---
	bsky_col_data  <- {{dataset.name}}[[bsky_selected_names[i]]]
	
	bsky_data_min  <- min(bsky_col_data, na.rm = TRUE)
	bsky_data_max  <- max(bsky_col_data, na.rm = TRUE)

	# --- Dynamic ci_y and tick_half based on actual counts ---
	bsky_n_bins    <- 9
	bsky_bin_width <- (bsky_data_max - bsky_data_min) / bsky_n_bins
	bsky_bks       <- seq(bsky_data_min, bsky_data_max + bsky_bin_width, by = bsky_bin_width)
	max_count      <- max(hist(bsky_col_data, breaks = bsky_bks, plot = FALSE)$counts)
	
	ci_y              <- -max_count * 0.10   # CI bracket line: 10% below zero
	tick_half         <-  max_count * 0.03   # endpoint tick half-height
	bsky_row_offset   <-  max_count * 0.06   # gap for CI endpoint labels and x-bar label
	bsky_ho_offset    <-  max_count * 0.10   # extra drop for Ho label to clear CI value labels

	# --- Sample mean (x-bar) ---
	bsky_xbar <- mean(bsky_col_data, na.rm = TRUE)

	# --- CI endpoint label strings (rounded to 4 decimal places) ---
	bsky_label_low  <- round(bsky_ci_low_plot,  4)
	bsky_label_high <- round(bsky_ci_high_plot, 4)

	bsky_plot = ggplot({{dataset.name}}, aes(x =.data[[bsky_selected_names[i]]])) +
						  # --- Histogram ---
						  geom_histogram(
							bins      = 9,
							fill      = "steelblue",
							color     = "white",
							closed    = "left"
						  ) +
						# --- CI horizontal line ---
						annotate("segment",
						x = bsky_ci_low_plot, xend = bsky_ci_high_plot,
						y = ci_y,   yend = ci_y,
						linewidth = 0.8
						) +
					  # --- CI endpoint ticks ---
					  annotate("segment",
						x = bsky_ci_low_plot,  xend = bsky_ci_low_plot,
						y = ci_y - tick_half, yend = ci_y + tick_half,
						linewidth = 0.8
					  ) +
					annotate("segment",
					x = bsky_ci_high_plot, xend = bsky_ci_high_plot,
					y = ci_y - tick_half, yend = ci_y + tick_half,
					linewidth = 0.8
					) +
				  # --- CI endpoint numeric labels ---
				  annotate("text",
					x = bsky_ci_low_plot, y = ci_y - bsky_row_offset,
					label = bsky_label_low, color = "black", size = 3, hjust = 1
				  ) +
				  annotate("text",
					x = bsky_ci_high_plot, y = ci_y - bsky_row_offset,
					label = bsky_label_high, color = "black", size = 3, hjust = 0
				  ) +
				  # --- H0 marker (X) and label ---
				  annotate("point",
					x = {{selected.testval | safe}}, y = ci_y,
					shape = 4, color = "red", size = 3, stroke = 1.2
				  ) +
				  annotate("text",
					x = {{selected.testval | safe}}, y = ci_y - bsky_ho_offset,
					label = "Ho({{selected.testval | safe}})", color = "red", size = 3.5
				  ) +
				  # --- Sample mean (x-bar) marker ---
				  annotate("point",
					x = bsky_xbar, y = ci_y,
					shape = 16, color = "blue", size = 3
				  ) +
				  annotate("text",
					x = bsky_xbar, y = ci_y + bsky_row_offset,
					label = paste0("x\u0305=", round(bsky_xbar, 4)), color = "blue", size = 3, hjust = 0.5
				  ) +
				  # --- Labels & theme ---
				  labs(
					title    = {{if (options.selected.specify_a_title == "")}} paste("Histogram for variable",  bsky_selected_names[i]) {{#else}} "{{selected.specify_a_title | safe}}" {{/if}},
					subtitle = {{if (options.selected.specify_a_subtitle == "")}} paste0("with Ho(mu = {{selected.testval | safe}}) and ", 100*c({{selected.conflevel | safe}}), "% t-confidence interval for the mean") {{#else}} "{{selected.specify_a_subtitle | safe}}" {{/if}},
					x        =  {{if (options.selected.x_title == "")}} bsky_selected_names[i] {{#else}} "{{selected.x_title | safe}}" {{/if}},
					y        =  {{if (options.selected.y_title == "")}} "Counts" {{#else}} "{{selected.y_title | safe}}" {{/if}}
				  ) +
				  # --- Y-axis padding so CI bracket and labels fit below zero ---
				  scale_y_continuous(expand = expansion(add = c(max_count * 0.05, max_count * 0.02))) +
				  coord_cartesian(clip = "off") +
				 {{selected.BSkyThemes | safe}} +
				  theme(
					plot.title    = element_text(hjust = 0.5, face = "bold"),
					plot.subtitle = element_text(hjust = 0.5)
				  )
		
		print(bsky_plot)
}
{{/if}}

`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move", scroll:true }) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mt-2", h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: localization.en.test1,
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: localization.en.test2,
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            less: {
                el: new radioButton(config, {
                    label: localization.en.test3,
                    no: "gpbox2",
                    increment: "less",
                    value: "less",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            testval: {
                el: new inputSpinner(config, {
                    no: 'testval',
                    label: localization.en.testval,
                    min: -9999999,
                    max: 9999999,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            conf_level: {
                el: new inputSpinner(config, {
                    no: 'conflevel',
                    label: localization.en.conflevel,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
			showHistogramChk: {
                el: new checkbox(config, {
                    label: localization.en.showHistogramChk, 
					no: "showHistogramChk",
                    bs_type: "valuebox",
                    //style: "mt-2 ml-5 mb-2",
					style: "mb-3",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
			},
			specify_a_title: {
                el: new input(config, {
                    no: "specify_a_title",
                    label: localization.en.specify_a_title,
                    allow_spaces:true,
                    placeholder: "Histogram title",
                    extraction: "NoPrefix|UseComma"
            })},
			 specify_a_subtitle: {
                el: new input(config, {
                    no: "specify_a_subtitle",
                    label: localization.en.specify_a_subtitle,
                    allow_spaces:true,
                    placeholder: "Histogram subtitle",
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: localization.en.x_title,
                    allow_spaces:true,
                    placeholder: "Histogram X axis",
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: localization.en.y_title,
                    allow_spaces:true,
                    placeholder: "Histogram Y axis",
                    extraction: "NoPrefix|UseComma"
            })},
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 6 }) },
            Analysis: {
                el: new radioButton(config, {
                    label: localization.en.Analysis,
                    no: "Missvals",
                    increment: "Analysis",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            Listwise: {
                el: new radioButton(config, {
                    label: localization.en.Listwise,
                    no: "Missvals",
                    increment: "Listwise",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },

            showEffectSizes: {
                el: new checkbox(config, {
                    label: localization.en.showEffectSizes,
                    no: "showEffectSizes",
                    newline: true,
                    extraction: "Boolean",
                })
            },


            label3: { el: new labelVar(config, { label: localization.en.label3, style: "mb-1, mt-1", h: 6 }) },
            cohensdNoCorrection: {
                el: new radioButton(config, {
                    label: localization.en.cohensdNoCorrection,
                    no: "cohensd",
                    increment: "cohensdNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            cohensdCorrect: {
                el: new radioButton(config, {
                    label: localization.en.cohensdCorrect,
                    no: "cohensd",
                    increment: "cohensdCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            hedgesgNoCorrection: {
                el: new radioButton(config, {
                    label: localization.en.hedgesgNoCorrection,
                    no: "hedgesg",
                    increment: "hedgesgNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            hedgesgCorrect: {
                el: new radioButton(config, {
                    label: localization.en.hedgesgCorrect,
                    no: "hedgesg",
                    increment: "hedgesgCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label4: { el: new labelVar(config, { label: localization.en.label4, style: "mb-1, mt-1", h: 6 }) },
            glassd: {
                el: new checkbox(config, {
                    label: localization.en.glassd,
                    no: "glassd",
                    newline: true,
                    extraction: "Boolean",
                })
            },
            glassdCorrect: {
                el: new checkbox(config, {
                    label: localization.en.glassdCorrect,
                    no: "glassdCorrect",
                    extraction: "Boolean",
                })
            },
        }
		 var opts = new optionsVar(config, {
            no: "frequency_chart_options",
            content: [
                objects.specify_a_title.el,
				objects.specify_a_subtitle.el,
                objects.x_title.el,
                objects.y_title.el,
            ]
        });
        var effectsizes = {
            el: new optionsVar(config, {
                no: "effects",
                name: localization.en.effectsizes,
                content: [
                    objects.showEffectSizes.el,
                    objects.label3.el,
                    objects.cohensdNoCorrection.el,
                    objects.cohensdCorrect.el,
                    objects.label4.el,
                    objects.hedgesgNoCorrection.el,
                    objects.hedgesgCorrect.el,
                ]
            })
        };
        var MissingVals = {
            el: new optionsVar(config, {
                no: "MissingVals",
                name: localization.en.MissingVals,
                content: [
                    objects.label2.el,
                    objects.Analysis.el,
                    objects.Listwise.el,
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content,
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.less.el.content,
            objects.testval.el.content, objects.conf_level.el.content, objects.showHistogramChk.el.content],
            bottom: [effectsizes.el.content, MissingVals.el.content, opts.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-t1",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new ttestOneSample().render()