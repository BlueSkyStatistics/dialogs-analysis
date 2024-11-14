var localization = {
    en: {
        correlationType : "Type of correlation",
		Polychoric: "Polychoric",
		Polyserial : "Polyserial",
		title: "Polychoric/Polyserial correlation",
		bins: "For Polyserial correlations - No of bins to dissect x for bivariate normality test",
        navigation: "Polychoric, polyserial",
        Target: "Select one or more x variables",
        textbox1: "Confidence interval",
        textbox2: "Null hypothesis (mu)",
        Target2: "Select a single ordered factor variable y",
        label1: "Type of estimation",
        test1: "Two-step approximation",
        test2: "Maximum-likelihood estimator",
        label2: "Standard error",
        Missvals: "Display standard error",
        conflevel: "Maximum absolute correlation (to insure numerical stability).",
        Seed: "Optional start value(s)",
        header: "Correlation is estimated between each x variable and the y variable",
        showEffectSizes: "Return estimated thresholds",
        help: {
            title: "Polychoric/Polyserial correlation",
            r_help: "help(polychor, package ='polycor')",
            body: `
<b>Description</b></br>
Computes a Polychoric or polyserial correlation.Correlation is estimated between each x variable and the y variable
<br/>
<br/>
<b>Description-Polychoric</b></br>
Computes the polychoric correlation (and its standard error) between two ordinal variables, under the assumption that the ordinal variables dissect continuous latent variables that are bivariate normal. Either the maximum-likelihood estimator or a (possibly much) quicker “two-step” approximation is available. For the ML estimator, the estimates of the thresholds and the covariance matrix of the estimates are also available.
<br/>
<b>Usage</b>
<br/>
<code> 
polychor(x, y, ML = FALSE, control = list(), 
  std.err = FALSE, maxcor=.9999, start, thresholds=FALSE)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: ordered categorical variable; the variable can be numeric, logical, a factor, an ordered factor, or a character variable, but if a factor, its levels should be in proper order, and the values of a character variable are ordered alphabetically.
</li>
<li>
y: an ordered factor variable
</li>
<li>
ML: if TRUE, compute the maximum-likelihood estimate; if FALSE, the default, compute a quicker “two-step” approximation.
</li>
<li>
std.err: if TRUE, return the estimated variance of the correlation (for the two-step estimator) or the estimated covariance matrix (for the ML estimator) of the correlation and thresholds; the default is FALSE. 
</li>
<li>
maxcor: maximum absolute correlation (to insure numerical stability).
</li>
<li>
start:  optional start value(s): if a single number, start value for the correlation.
</li>
<li>
thresholds:  if TRUE (the default is FALSE) return estimated thresholds along with the estimated correlation even if standard errors aren't computed.
</li>
</ul>
<b>Values</b></br>
Value: If std.err or thresholds is TRUE, returns an object of class "polycor" with the following components:</br>
type: set to "polychoric".</br>
rho: the polychoric correlation.</br>
row.cuts: estimated thresholds for the row variable (x), for the ML estimate.</br>
col.cuts: estimated thresholds for the column variable (y), for the ML estimate.</br>
var: the estimated variance of the correlation, or, for the ML estimate, the estimated covariance matrix of the correlation and thresholds.</br>
n: the number of observations on which the correlation is based.</br>
chisq: chi-square test for bivariate normality.</br>
df: degrees of freedom for the test of bivariate normality.</br>
ML: TRUE for the ML estimate, FALSE for the two-step estimate
<b>Details</b></br>
The ML estimator is computed by maximizing the bivariate-normal likelihood with respect to the thresholds for the two variables (τ^x[i], i = 1,…, r - 1; τ^y[j], j = 1,…, c - 1) and the population correlation (ρ). Here, r and c are respectively the number of levels of x and y. The likelihood is maximized numerically using the optim function, and the covariance matrix of the estimated parameters is based on the numerical Hessian computed by optim.</br>
The two-step estimator is computed by first estimating the thresholds (τ^x[i], i = 1,…, r - 1 and τ^y[j], i = j,…, c - 1) separately from the marginal distribution of each variable. Then the one-dimensional likelihood for ρ is maximized numerically, using optim if standard errors are requested, or optimise if they are not. The standard error computed treats the thresholds as fixed.
<br/>
<b>Example</b></br>
<code> 
if(require(mvtnorm)){
    set.seed(12345)
    data <- rmvnorm(1000, c(0, 0), matrix(c(1, .5, .5, 1), 2, 2))
    x <- data[,1]
    y <- data[,2]
    cor(x, y)  # sample correlation
    }\n
if(require(mvtnorm)){
    x <- cut(x, c(-Inf, .75, Inf))
    y <- cut(y, c(-Inf, -1, .5, 1.5, Inf))
    polychor(x, y)  # 2-step estimate
    }\n
if(require(mvtnorm)){
    polychor(x, y, ML=TRUE, std.err=TRUE)  # ML estimate
    }
</code> <br/>
<b>Package</b></br>
polycor</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(polycor, package ='polychor') by creating a R code chunk by clicking + in the output window           
<br/>
<br/>
<b>Description-PolySerial</b></br>
Computes the polyserial correlation (and its standard error) between a quantitative variable and an ordinal variable, based on the assumption that the joint distribution of the quantitative variable and a latent continuous variable underlying the ordinal variable is bivariate normal. Either the maximum-likelihood estimator or a quicker “two-step” approximation is available. For the ML estimator the estimates of the thresholds and the covariance matrix of the estimates are also available.
<br/>
<b>Usage</b>
<br/>
<code> 
polyserial(x, y, ML = FALSE, control = list(), 
  std.err = FALSE, maxcor=.9999, bins=4, start, thresholds=FALSE)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: a numeric variable
</li>
<li>
y: an ordered categorical variable; can be numeric, logical, a factor, an ordered factor, or a character variables, but if a factor, its levels should be in proper order, and the values of a character variable are ordered alphabetically.
</li>
<li>
ML: if TRUE, compute the maximum-likelihood estimate; if FALSE, the default, compute a quicker “two-step” approximation.
</li>
<li>
std.err: if TRUE, return the estimated variance of the correlation (for the two-step estimator) or the estimated covariance matrix (for the ML estimator) of the correlation and thresholds; the default is FALSE. 
</li>
<li>
bins: the number of bins into which to dissect x for a test of bivariate normality; the default is 4.
</li>
<li>
maxcor: maximum absolute correlation (to insure numerical stability).
</li>
<li>
start:  optional start value(s): if a single number, start value for the correlation.
</li>
<li>
thresholds:  if TRUE (the default is FALSE) return estimated thresholds along with the estimated correlation even if standard errors aren't computed.
</li>
</ul>
<b>Values</b></br>
Value: If std.err or thresholds is TRUE, returns an object of class "polycor" with the following components:</br>
type: set to "polychoric".</br>
rho: the polyserial correlation.</br>
cuts: estimated thresholds for the ordinal variable (y), for the ML estimator.</br>
var: the estimated variance of the correlation, or, for the ML estimate, the estimated covariance matrix of the correlation and thresholds.</br>
n: the number of observations on which the correlation is based.</br>
chisq: chi-square test for bivariate normality.</br>
df: degrees of freedom for the test of bivariate normality.</br>
ML: TRUE for the ML estimate, FALSE for the two-step estimate
<b>Example</b></br>
<code> 
if(require(mvtnorm)){
    set.seed(12345)
    data <- rmvnorm(1000, c(0, 0), matrix(c(1, .5, .5, 1), 2, 2))
    x <- data[,1]
    y <- data[,2]
    cor(x, y)  # sample correlation
    }\n
if(require(mvtnorm)){
    y <- cut(y, c(-Inf, -1, .5, 1.5, Inf))
    polyserial(x, y)  # 2-step estimate
    }\n
if(require(mvtnorm)){
    polyserial(x, y, ML=TRUE, std.err=TRUE) # ML estimate
    }\n
</code> <br/>
<b>Package</b></br>
polycor</br>
<b>Help</b></br>
For detailed help run the following command help(polyserial, package ='polychor') by creating a R code chunk by clicking + in the output window           

			`}
    }
}
class polychoricPolyserialCorrelations extends baseModal {
    constructor() {
        var config = {
            id: "polychoricPolyserialCorrelations",
            label: localization.en.title,
            splitProcessing: false,
            modalType: "two",
            RCode: `
{{if (options.selected.gpbox1 == "FALSE")}}
require(polycor);
#The function polychor returns an object of class polycor or numeric, the function BSkyFormatPolycor handles the formatting of both polycor and numerics so that they display nicely
polycor::polychor(x={{dataset.name}}\${{selected.Target | safe}}, y={{dataset.name}}\${{selected.Target2 | safe}}, ML={{selected.gpbox2 | safe}}, 
    std.err={{selected.Missvals | safe}}, maxcor={{selected.conflevel | safe}},
    {{if (options.selected.Seed != "")}}start={{selected.Seed | safe}},{{/if}}
     thresholds={{selected.showEffectSizes | safe}}) %>% BSkyFormatPolycor(tableHeader = "{{selected.Target | safe}},{{selected.Target2 | safe}}", typeofcorrelation = "Polychoric correlation" ) %>% BSkyFormat()
{{#else}}
#The function polyserial returns an object of class polycor or numeric, the function BSkyFormatPolycor handles the formatting of both polycor and numerics so that they display nicely
polycor::polyserial(x={{dataset.name}}\${{selected.Target | safe}}, y={{dataset.name}}\${{selected.Target2 | safe}}, ML={{selected.gpbox2 | safe}}, 
    std.err={{selected.Missvals | safe}}, maxcor={{selected.conflevel | safe}}, bins = {{selected.bins | safe}},
    {{if (options.selected.Seed != "")}}start={{selected.Seed | safe}},{{/if}}
     thresholds={{selected.showEffectSizes | safe}}) %>% BSkyFormatPolycor(tableHeader = "{{selected.Target | safe}},{{selected.Target2 | safe}}", typeofcorrelation = "Polyserial correlation") %>% BSkyFormat()
{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            Target: {
                el: new dstVariableList(config, {
                    label: localization.en.Target,
                    no: "Target",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
            Target2: {
                el: new dstVariable(config, {
                    label: localization.en.Target2,
                    no: "Target2",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
			
			
			correlationType: { el: new labelVar(config, { label: localization.en.correlationType, h: 6 }) },
            Polychoric: {
                el: new radioButton(config, {
                    label: localization.en.Polychoric,
                    no: "gpbox1",
                    increment: "Polychoric",
                    value: "FALSE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            Polyserial: {
                el: new radioButton(config, {
                    label: localization.en.Polyserial,
                    no: "gpbox1",
                    increment: "Polyserial",
                    value: "TRUE",
                    style: "mb:3",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },			
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
            label2: { el: new labelVar(config, { label: localization.en.header, h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: localization.en.test1,
                    no: "gpbox2",
                    increment: "twosided",
                    value: "FALSE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: localization.en.test2,
                    no: "gpbox2",
                    increment: "greater",
                    value: "TRUE",
                    style: "mb:3",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            Missvals: {
                el: new checkbox(config, {
                    label: localization.en.Missvals,
                    no: "Missvals",
                    newline: true,
                    extraction: "Boolean",
                })
            },
            conf_level: {
                el: new inputSpinner(config, {
                    no: 'conflevel',
                    label: localization.en.conflevel,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.99,
                    extraction: "NoPrefix|UseComma"
                })
            },
            Seed: {
                el: new input(config, {
                    no: 'Seed',
                    allow_spaces: true,
                    label: localization.en.Seed,
                    extraction: "TextAsIs",
                }),
            },
            showEffectSizes: {
                el: new checkbox(config, {
                    label: localization.en.showEffectSizes,
                    no: "showEffectSizes",
                    style: "mt-3",
                    newline: true,
                    extraction: "Boolean",
                })
            },
			
			  bins: {
                el: new inputSpinner(config, {
                    no: 'bins',
                    label: localization.en.bins,
                    min: 0,
                    max: 9999,
                    step: 1,
                    value: 4,
                    extraction: "NoPrefix|UseComma"
                })
            }
			
        }
        var MissingVals = {
            el: new optionsVar(config, {
                no: "MissingVals",
                name: "Advanced",
                content: [
                    objects.conf_level.el,
                    objects.Seed.el,
                    objects.showEffectSizes.el,
                ]
            })
        };
        const content = {
            head: [objects.label2.el.content],
            left: [objects.content_var.el.content],
            right: [objects.Target.el.content, objects.Target2.el.content, objects.correlationType.el.content, objects.Polychoric.el.content, objects.Polyserial.el.content,
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.Missvals.el.content, objects.bins.el.content],
            bottom: [MissingVals.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-rank",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
    prepareExecution(instance) {
        var res = [];
        var temp = ""
        let count =0
        instance.objects.Target.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
                },
                selected: instance.dialog.extractData()
            }
            code_vars.selected.Target = value;
            temp =instance.dialog.renderR(code_vars)
            //let cmd = instance.dialog.renderR(code_vars)
            //cmd = removenewline(cmd);
            // temp = temp + cmd + "\n";
            if (count == 0) {
                res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
            }
            else {
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: instance.config.RCode, code_vars: code_vars })
            }
            count++
        })
        //res.push({ cmd: temp, cgid: newCommandGroup() })
        return res;
    }
}
module.exports.item = new polychoricPolyserialCorrelations().render()