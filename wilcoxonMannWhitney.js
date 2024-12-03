
var localization = {
    en: {
        title: "Wilcoxon Test, independent samples",
        navigation: "Wilcoxon Test, Independent Samples",
        tvarbox1 : "Response Variable (one)",
        tvarbox2 : "Factor (one) with only two levels",
        label1 : "Aternative Hypothesis",
        twosided : "Group1 - Group2 != mu",
        greater : "Group1 - Group2 > mu",
        less : "Group1 - Group2 < mu",
        label2 : "Test Method",
        default : "Default",
        exact : "Exact",
        normal : "Normal Approximation",
        contingency  : "Normal Approximation (Continuity correction)",
        textbox1: "Confidence interval",
        textbox2: "Null hypothesis (mu)",
        help: {
            title: "Wilcoxon Test, independent samples",
            r_help: "help(wilcox.test, package=stats)",
            body: `
<b>Description</b></br>
Performs one- and two-sample Wilcoxon tests on vectors of data; the latter is also known as ‘Mann-Whitney’ test.
<br/>
<b>Usage</b>
<br/>
<code>
wilcox.test(x, ...)<br/>
## Default S3 method:<br/>
wilcox.test(x, y = NULL,<br/>
            alternative = c("two.sided", "less", "greater"),<br/>
            mu = 0, paired = FALSE, exact = NULL, correct = TRUE,<br/>
            conf.int = FALSE, conf.level = 0.95, ...)<br/>
## S3 method for class 'formula'<br/>
wilcox.test(formula, data, subset, na.action, ...)<br/>
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: numeric vector of data values. Non-finite (e.g., infinite or missing) values will be omitted.
</li>
<li>
y: an optional numeric vector of data values: as with x non-finite values will be omitted.
</li>
<li>
alternative: a character string specifying the alternative hypothesis, must be one of "two.sided" (default), "greater" or "less". You can specify just the initial letter.
</li>
<li>
mu: a number specifying an optional parameter used to form the null hypothesis. See ‘Details’.
</li>
<li>
paired: a logical indicating whether you want a paired test.
</li>
<li>
exact: a logical indicating whether an exact p-value should be computed.
</li>
<li>
correct: a logical indicating whether to apply continuity correction in the normal approximation for the p-value.
</li>
<li>
conf.int: a logical indicating whether a confidence interval should be computed.
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
If only x is given, or if both x and y are given and paired is TRUE, a Wilcoxon signed rank test of the null that the distribution of x (in the one sample case) or of x - y (in the paired two sample case) is symmetric about mu is performed.</br>
Otherwise, if both x and y are given and paired is FALSE, a Wilcoxon rank sum test (equivalent to the Mann-Whitney test: see the Note) is carried out. In this case, the null hypothesis is that the distributions of x and y differ by a location shift of mu and the alternative is that they differ by some other location shift (and the one-sided alternative "greater" is that x is shifted to the right of y).</br>
By default (if exact is not specified), an exact p-value is computed if the samples contain less than 50 finite values and there are no ties. Otherwise, a normal approximation is used.</br>
Optionally (if argument conf.int is true), a nonparametric confidence interval and an estimator for the pseudomedian (one-sample case) or for the difference of the location parameters x-y is computed. (The pseudomedian of a distribution F is the median of the distribution of (u+v)/2, where u and v are independent, each with distribution F. If F is symmetric, then the pseudomedian and median coincide. See Hollander & Wolfe (1973), page 34.) Note that in the two-sample case the estimator for the difference in location parameters does not estimate the difference in medians (a common misconception) but rather the median of the difference between a sample from x and a sample from y.</br>
If exact p-values are available, an exact confidence interval is obtained by the algorithm described in Bauer (1972), and the Hodges-Lehmann estimator is employed. Otherwise, the returned confidence interval and point estimate are based on normal approximations. These are continuity-corrected for the interval but not the estimate (as the correction depends on the alternative).</br>
With small samples it may not be possible to achieve very high confidence interval coverages. If this happens a warning will be given and an interval with lower coverage will be substituted.</br>
<b>Value</b><br/>
A list with class "htest" containing the following components:
statistic: the value of the test statistic with a name describing it.</br>
parameter: the parameter(s) for the exact distribution of the test statistic.</br>
p.value: the p-value for the test.</br>
null.value: the location parameter mu.</br>
alternative: a character string describing the alternative hypothesis.</br>
method: the type of test applied.</br>
data.name: a character string giving the names of the data.</br>
conf.int: a confidence interval for the location parameter. (Only present if argument conf.int = TRUE.)</br>
estimate: an estimate of the location parameter. (Only present if argument conf.int = TRUE.)</br>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(wilcox.test, package=stats)
    `}
    }
}

class wilcoxonMannWhitney extends baseModal {
    constructor() {
        var config = {
            id: "wilcoxonMannWhitney",
            label: localization.en.title,
            modalType: "two",
            RCode: `
#Wilcoxon Mann Whitney analysis
BSky_Median = by({{dataset.name}}\${{selected.tvarbox1}}, list({{dataset.name}}\${{selected.tvarbox2}}),  median, na.rm=TRUE)
BSky_Wilcoxon_Test = wilcox.test({{selected.tvarbox1}} ~{{selected.tvarbox2}}, alternative='{{selected.gpbox2}}', conf.int = TRUE, conf.level={{selected.txtbox1}}, {{selected.gpbox1}}, mu = {{selected.txtbox2}}, data={{dataset.name}})
BSkyFormat(BSky_Median, singleTableOutputHeader='Summary Statistics')
BSkyFormat(BSky_Wilcoxon_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mt-4",h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: localization.en.twosided,
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: localization.en.greater,
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            less: {
                el: new radioButton(config, {
                    label: localization.en.less,
                    no: "gpbox2",
                    increment: "less",
                    value: "less",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label2: { el: new labelVar(config, { label: localization.en.label2,style: "mt-4", h: 6 }) },
            default: {
                el: new radioButton(config, {
                    label: localization.en.default,
                    no: "gpbox1",
                    increment: "default",
                    value: "exact = NULL, correct = TRUE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            exact: {
                el: new radioButton(config, {
                    label: localization.en.exact,
                    no: "gpbox1",
                    increment: "exact",
                    value: "exact = TRUE, correct = FALSE",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            normal: {
                el: new radioButton(config, {
                    label: localization.en.normal,
                    no: "gpbox1",
                    increment: "normal",
                    value: "exact = FALSE, correct = FALSE",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            contingency: {
                el: new radioButton(config, {
                    label: localization.en.contingency,
                    no: "gpbox1",
                    increment: "contingency",
                    value: "exact = FALSE, correct = TRUE",
                    state: "",
                    style: "mb-3",
                    extraction: "ValueAsIs"
                })
            },
            null_hypotesys: {
                el: new inputSpinner(config, {
                    no: 'txtbox2',
                    label: localization.en.textbox2,
                    min: -9999999,
                    max: 9999999,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            conf_level: {
                el: new inputSpinner(config, {
                    no: 'txtbox1',
                    label: localization.en.textbox1,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content,
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.less.el.content,
            objects.label2.el.content, objects.default.el.content, objects.exact.el.content, objects.normal.el.content, objects.contingency.el.content,
            objects.null_hypotesys.el.content, objects.conf_level.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-w1",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new wilcoxonMannWhitney().render()