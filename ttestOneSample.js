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
{{if (options.selected.showEffectSizes == "TRUE")}}

	{{dataset.name}} %>%
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
			datasetNameOrDatasetGlobalIndex ='{{dataset.name}}') %>%
				BSkyFormat()
{{#else}}

	{{dataset.name}} %>%
		dplyr::select({{selected.tvarbox1 | safe}}) %>%
			BSkyOneSmTTest( 
			mu = {{selected.testval | safe}}, 
			conf.level = {{selected.conflevel | safe}}, 
			alternative ='{{selected.gpbox2 | safe}}',
			missing={{selected.Missvals | safe}},
			datasetNameOrDatasetGlobalIndex ='{{dataset.name}}') %>%
				BSkyFormat()
{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
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
            objects.testval.el.content, objects.conf_level.el.content],
            bottom: [effectsizes.el.content, MissingVals.el.content],
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