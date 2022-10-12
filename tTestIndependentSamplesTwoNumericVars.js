
var localization = {
    en: {
        title: "t-test, Paired Samples",
        navigation: "t-test, Paired Samples",
        tvarbox1: "First numeric variable",
        tvarbox3: "Second numeric variable",
        label1: "Alternative hypothesis",
        test1: "Difference != mu",
        test2: "Difference > mu",
        test3: "Difference < mu",
        chkbox1: "Assume equal variance",
        txtbox2: "Null hypothesis (mu)",
        txtbox1: "Confidence level",
        cohensdNoCorrection: "Cohen's d",
        hedgesgNoCorrection: "Hedges' g",
        glassdNoCorrection: "Glass's delta",
        hedgesgCorrect: "Hedges' g with bias corrected",
        glassdCorrect: "Glass's delta with bias corrected",
        glassdNoCorrection: "Glass's delta",
        effectsizes: "Effect sizes",
        showEffectSizes: "Display effect sizes",
        cohensdCorrect: "Cohen's d with bias corrected",
        label3: "Options for Cohen's d",
        label4: "Options for Hedges' g",
        label5: "Options for Glass's delta",
        help: {
            title: "t-test, independent samples",
            r_help: "help(t.test, package ='stats')",
            body: `
<b>Description</b></br>
Performs one and two sample t-tests on vectors of data.
<br/>
<b>Usage</b>
<br/>
<code> 
t.test(x, ...)<br/>
## Default S3 method:<br/>
t.test(x, y = NULL,
        alternative = c("two.sided", "less", "greater"),
        mu = 0, paired = FALSE, var.equal = FALSE,
        conf.level = 0.95, ...)<br/>
## S3 method for class 'formula'<br/>
t.test(formula, data, subset, na.action, ...)<br/>
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: a (non-empty) numeric vector of data values.
</li>
<li>
y: an optional (non-empty) numeric vector of data values.
</li>
<li>
alternative: a character string specifying the alternative hypothesis, must be one of "two.sided" (default), "greater" or "less". You can specify just the initial letter.
</li>
<li>
mu: a number indicating the true value of the mean (or difference in means if you are performing a two sample test).
</li>
<li>
paired: a logical indicating whether you want a paired t-test.
</li>
<li>
var.equal: A logical variable indicating whether to treat the two variances as being equal. If TRUE then the pooled variance is used to estimate the variance otherwise the Welch (or Satterthwaite) approximation to the degrees of freedom is used.
</li>
<li>
conf.level: confidence level of the interval.
</li>
<li>
formula: a formula of the form lhs ~ rhs where lhs is a numeric variable giving the data values and rhs a factor with two levels giving the corresponding groups.
</li>
<li>
data: an optional matrix or data frame (or similar: see model.frame) containing the variables in the formula formula. By default the variables are taken from environment(formula).
</li>
<li>
subset: an optional vector specifying a subset of observations to be used.
</li>
<li>
na.action: a function which indicates what should happen when the data contain NAs. Defaults to getOption("na.action").
</li>
<li>
...: further arguments to be passed to or from methods.
</li>
</ul>
<b>Details</b></br>
The formula interface is only applicable for the 2-sample tests.</br>
alternative = "greater" is the alternative that x has a larger mean than y.</br>
If paired is TRUE then both x and y must be specified and they must be the same length. Missing values are silently removed (in pairs if paired is TRUE). If var.equal is TRUE then the pooled estimate of the variance is used. By default, if var.equal is FALSE then the variance is estimated separately for both groups and the Welch modification to the degrees of freedom is used.</br>
If the input data are effectively constant (compared to the larger of the two means) an error is generated.</br>
<b>Value</b><br/>
A list with class "htest" containing the following components:<br/>
statistic: the value of the t-statistic.<br/>
parameter: the degrees of freedom for the t-statistic.<br/>
p.value: the p-value for the test.<br/>
conf.int: a confidence interval for the mean appropriate to the specified alternative hypothesis.<br/>
estimate: the estimated mean or difference in means depending on whether it was a one-sample test or a two-sample test.<br/>
null.value: the specified hypothesized value of the mean or mean difference depending on whether it was a one-sample test or a two-sample test.<br/>
alternative: a character string describing the alternative hypothesis.<br/>
method: a character string indicating what type of t-test was performed.<br/>
data.name: a character string giving the name(s) of the data.<br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(t.test, package ='stats')
`}
    }
}

class tTestIndependentSamplesTwoNumericVars extends baseModal {
    constructor() {
        var config = {
            id: "tTestIndependentSamplesTwoNumericVars",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(effectsize)
#Summary Statistics
BSkyFormat (as.data.frame({{dataset.name}} %>% dplyr::select({{selected.tvarbox1 | safe}}, {{selected.tvarbox3 | safe}}) %>% na.omit %>% psych::describe()), singleTableOutputHeader ="Summary Statistics" )
# Running the paired t-test
BSky_Paired_t_Test = t.test( {{dataset.name}}\${{selected.tvarbox1 | safe}}, {{dataset.name}}\${{selected.tvarbox3 | safe}}, 
    alternative = '{{selected.gpbox2 | safe}}', conf.level = {{selected.txtbox1 | safe}}, 
    mu = {{selected.txtbox2 | safe}}, var.equal = {{selected.chkbox1 | safe}}, paired = TRUE, data = {{dataset.name}})
BSkyFormat(BSky_Paired_t_Test)
{{ if( options.selected.showEffectSizes == "TRUE")}}
{{if (options.selected.cohensd =="1")}}
BSky_Cohensd_Res <- cohens_d("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}", 
    data = {{dataset.name}}, correction = TRUE)
BSkyFormat(as.data.frame(BSky_Cohensd_Res), 
    singleTableOutputHeader = c("Cohen's d results with bias corrected"))
{{/if}}
{{if (options.selected.cohensd == "0")}}
BSky_Cohensd_Res <- cohens_d("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}", 
    data = {{dataset.name}}, correction = FALSE)
BSkyFormat(as.data.frame(BSky_Cohensd_Res), 
    singleTableOutputHeader = c("Cohen's d results"))
{{/if}}
{{if (options.selected.hedgesg =="1")}}
BSky_hedgesg_Res <- hedges_g("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}",
    data = {{dataset.name}}, adjust = TRUE)
BSkyFormat(as.data.frame(BSky_hedgesg_Res), 
    singleTableOutputHeader = c("Hedges' g results with bias corrected"))
{{/if}}
{{if (options.selected.hedgesg == "0")}}
BSky_hedgesg_Res <- hedges_g("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}", 
    data = {{dataset.name}}, adjust = FALSE)
BSkyFormat(as.data.frame(BSky_hedgesg_Res), 
    singleTableOutputHeader = c("Hedges' g Results"))
{{/if}}
{{if (options.selected.glassd == "1")}}
BSky_glassd_Res <- glass_delta("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}", 
    data = {{dataset.name}}, correction = TRUE)
BSkyFormat(as.data.frame(BSky_glassd_Res), 
    singleTableOutputHeader = c("Glass's d Results with bias corrected"))
{{/if}}
{{if (options.selected.glassd == "0")}}
BSky_glassd_Res <- glass_delta("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}",
    data = {{dataset.name}}, correction=FALSE)
BSkyFormat(as.data.frame(BSky_glassd_Res), 
    singleTableOutputHeader = c("Glass's d Results"))
{{/if}}
{{/if}}
#remove temporary objects
if (exists('BSky_Paired_t_Test')) rm(BSky_Paired_t_Test)
if (exists('BSky_Cohensd_Res')) rm(BSky_Cohensd_Res)
if (exists('BSky_hedgesg_Res')) rm(BSky_hedgesg_Res)
if (exists('BSky_glassd_Res')) rm(BSky_glassd_Res)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox3: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox3,
                    no: "tvarbox3",
                    filter: "Numeric|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mt-3", h: 6 }) },
            test1: { el: new radioButton(config, { label: localization.en.test1, no: "gpbox2", increment: "test1", value: "two.sided", state: "checked", extraction: "ValueAsIs" }) },
            test2: { el: new radioButton(config, { label: localization.en.test2, no: "gpbox2", increment: "test2", value: "greater", state: "", extraction: "ValueAsIs" }) },
            test3: { el: new radioButton(config, { label: localization.en.test3, no: "gpbox2", increment: "test3", value: "less", state: "", extraction: "ValueAsIs" }) },
            chkbox1: { el: new checkbox(config, { label: localization.en.chkbox1, no: "chkbox1", extraction: "Boolean" }) },
            txtbox2: {
                el: new inputSpinner(config, {
                    no: 'txtbox2',
                    label: localization.en.txtbox2,
                    min: -9999999,
                    max: 9999999,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            txtbox1: {
                el: new inputSpinner(config, {
                    no: 'txtbox1',
                    label: localization.en.txtbox1,
                    min: 0,
                    max: 1,
                    step: 1,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
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
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox3.el.content, objects.label1.el.content, objects.test1.el.content, objects.test2.el.content, objects.test3.el.content, objects.chkbox1.el.content, objects.txtbox2.el.content, objects.txtbox1.el.content],
            bottom: [effectsizes.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-tp",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new tTestIndependentSamplesTwoNumericVars().render()