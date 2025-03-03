/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */



var localization = {
    en: {
        title: "t-test, Independent Samples",
        navigation: "t-test, Independent Samples",
        Target: "Select variables",
        textbox1: "Confidence interval",
        textbox2: "Null hypothesis (mu)",
        label1: "Aternative hypothesis",
        test1: "group1 != group2",
        test2: "group1 > group2",
        test3: "group1 < group2",
        Target2: "Factor variable with 2 levels",
        label2: "Missing Values",
        Analysis: "Analysis by analysis",
        Listwise: "Listwise",
        conflevel: "Confidence Interval:",
        MissingVals: "Options for missing values",
        cohensdNoCorrection: "Cohen's d",
        hedgesgNoCorrection: "Hedges' g",
        glassdNoCorrection: "Glass's delta",
        hedgesgCorrect: "Hedges' g with bias corrected",
        glassdCorrect: "Glass's delta with bias corrected",
        glassdNoCorrection: "Glass's delta",
        effectsizes: "Effect sizes",
        cohensdCorrect: "Cohen's d with bias corrected",
        label3: "Options for Cohen's d",
        label4: "Options for Hedges' g",
        label5: "Options for Glass's delta",
        showEffectSizes: "Display effect sizes",
        label21: "Center",
        median: "Median",
        mean: "Mean",
        LevenesTest:"Options for Levene's Test",
        help: {
            title: "t-test, Independent Samples",
            r_help: "help(t.test, package ='stats')",
            body: `
<b>Description</b></br>
Performs a one sample t-tests against the two groups formed by a factor variable (with two levels). Displays results for equal variances TRUE and FALSE. For equal variances the pooled variance is used otherwise the Welch (or Satterthwaite) approximation to the degrees of freedom is used. Internally calls t.test in the stats package for every selected variable 
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyIndSmTTest(varNamesOrVarGlobalIndices=c('var1','var2'), group=c('var3'), conf.level = 0.95, alternative="two.sided", missing =0, datasetNameOrDatasetGlobalIndex = 'Dataset') 
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
varNamesOrVarGlobalIndices: selected scale variables (say var1, var2)
</li>
<li>
group: a factor variable with two levels (say var3)
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
A list with resulting tables is returned.
<br/>
<b>Example</b></br>
<code> 
Dataset <- data.frame(Expenses=c(20,23,19,25,26), Sales=c(48,50,55,51,49), Gender=c('m','f','f','m','m'), Deptt=c('IT', 'Sales', 'IT','Sales','IT'))</br>
# Dataset must be loaded in the UI grid</br>
BSkyLoadRefresh("Dataset")</br>
BSky_One_Simple_T_Test = BSkyIndSmTTest(varNamesOrVarGlobalIndices =c('Sales','Expenses'),group=c('Deptt'),conf.level=0.95, alternative="less", datasetNameOrDatasetGlobalIndex ='Dataset')</br>
</code> <br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(t.test, package ='stats') by creating a R code chunk by clicking + in the output window           
    `}
    }
}
class ttestIndependentSamples extends baseModal {
    constructor() {
        var config = {
            id: "ttestIndependentSamples",
            label: localization.en.title,
            splitProcessing: false,
            modalType: "two",
            RCode: `
# Run the T-test
require(effectsize)
{{if (options.selected.showEffectSizes == "TRUE")}}
	
	{{dataset.name}} %>%
		dplyr::group_by({{selected.Target2 | safe}}) %>%
			dplyr::select({{selected.Target | safe}}, {{selected.Target2 | safe}}) %>%
				 BSkyIndSmTTest( 
					conf.level = {{selected.conflevel | safe}}, 
					alternative = '{{selected.gpbox2 | safe}}', 
					cohens_d = {{if (options.selected.cohensd =="0")}}TRUE{{#else}}FALSE{{/if}}, 
					cohensd_correction = {{if (options.selected.cohensd =="1")}}TRUE{{#else}}FALSE{{/if}},
					hedges_g = {{if (options.selected.hedgesg =="0")}}TRUE{{#else}}FALSE{{/if}}, 
					hedgesg_correction = {{if (options.selected.hedgesg =="1")}}TRUE{{#else}}FALSE{{/if}},
					glass_d = {{if (options.selected.glassd =="0")}}TRUE{{#else}}FALSE{{/if}},  
					glassd_correction = {{if (options.selected.glassd =="1")}}TRUE{{#else}}FALSE{{/if}},
					missing ={{selected.Missvals | safe}}, center = "{{selected.gpbox1 | safe}}",
					datasetNameOrDatasetGlobalIndex='{{dataset.name}}') %>%
						BSkyFormat()			
{{#else}}

	{{dataset.name}} %>%
		dplyr::group_by({{selected.Target2 | safe}}) %>%
			dplyr::select({{selected.Target | safe}}, {{selected.Target2 | safe}}) %>%
				 BSkyIndSmTTest(  
					conf.level = {{selected.conflevel | safe}}, 
					alternative = '{{selected.gpbox2 | safe}}', 
					missing ={{selected.Missvals | safe}}, center = "{{selected.gpbox1 | safe}}",
					datasetNameOrDatasetGlobalIndex='{{dataset.name}}') %>%
						BSkyFormat()
{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            Target: {
                el: new dstVariableList(config, {
                    label: localization.en.Target,
                    no: "Target",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
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
            Target2: {
                el: new dstVariable(config, {
                    label: localization.en.Target2,
                    no: "Target2",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
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
            label5: { el: new labelVar(config, { label: localization.en.label5, style: "mb-1, mt-1", h: 6 }) },
            glassdNoCorrection: {
                el: new radioButton(config, {
                    label: localization.en.glassdNoCorrection,
                    no: "glassd",
                    increment: "glassdNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            glassdCorrect: {
                el: new radioButton(config, {
                    label: localization.en.glassdCorrect,
                    no: "glassd",
                    increment: "glassdCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label21: { el: new labelVar(config, { label: localization.en.label21, style: "mt-3",h: 5 }) },
            median: { el: new radioButton(config, { label: localization.en.median, no: "gpbox1", increment: "median", value: "median", state: "", extraction: "ValueAsIs" }) },
            mean: { el: new radioButton(config, { label: localization.en.mean, no: "gpbox1", increment: "mean", value: "mean", state: "checked", extraction: "ValueAsIs" }) },
        }
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
                    objects.label5.el,
                    objects.glassdNoCorrection.el,
                    objects.glassdCorrect.el,
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
        var LevenesTest = {
            el: new optionsVar(config, {
                no: "LevenesTest",
                name: localization.en.LevenesTest,
                content: [
                    objects.label21.el,
                    objects.mean.el,
                    objects.median.el
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.Target.el.content, objects.Target2.el.content,
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.less.el.content,
            objects.conf_level.el.content],
            bottom: [effectsizes.el.content, MissingVals.el.content, LevenesTest.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-t2",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new ttestIndependentSamples().render()