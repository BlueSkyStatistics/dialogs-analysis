
var localization = {
    en: {
        title: "Partial/Semi-partial Correlations",
        navigation: "Partial, semi-partial",
        tvarbox1: "Select variables",
        correlationType: "Type of correlation",
        tvarbox2: "Select variables to keep constant",
        help: {
            title: "Partial/Semi-partial Correlations",
            r_help: "help(pcor.test, package=ppcor)",
            body: `
<b>Description</b></br>
Performs Bartlett's test of the null that the variances in each of the groups (samples) are the same.
<br/>
<b>Usage</b>
<br/>
<code> 
bartlett.test(x, ...)</br>
## Default S3 method:</br>
bartlett.test(x, g, ...)</br>
## S3 method for class 'formula'</br>
bartlett.test(formula, data, subset, na.action, ...)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
Arguments
x: a numeric vector of data values, or a list of numeric data vectors representing the respective samples, or fitted linear model objects (inheriting from class "lm").
</li>
<li>
g: a vector or factor object giving the group for the corresponding elements of x. Ignored if x is a list.
</li>
<li>
formula: a formula of the form lhs ~ rhs where lhs gives the data values and rhs the corresponding groups.
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
If x is a list, its elements are taken as the samples or fitted linear models to be compared for homogeneity of variances. In this case, the elements must either all be numeric data vectors or fitted linear model objects, g is ignored, and one can simply use bartlett.test(x) to perform the test. If the samples are not yet contained in a list, use bartlett.test(list(x, ...)).</br>
Otherwise, x must be a numeric data vector, and g must be a vector or factor object of the same length as x giving the group for the corresponding elements of x.</br>
<b>Value</b><br/>
A list of class "htest" containing the following components:<br/>
statistic: Bartlett's K-squared test statistic.<br/>
parameter: the degrees of freedom of the approximate chi-squared distribution of the test statistic.<br/>
p.value: the p-value of the test.<br/>
method: the character string "Bartlett test of homogeneity of variances".<br/>
data.name: a character string giving the names of the data.<br/>
<b>Examples</b><br/>
<code> 
Dataset <- data.frame(Age=c(20,23,19,25,26), Weight=c(48,50,55,51,49), Gender=c('m','f','f','m','m' ))
Result_Bartlett_Test = bartlett.test(sales ~ interaction(Dataset$Gender),data=Dataset)
</code> <br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(bartlett.test, package=stats)
`}
    }
}







class partialCorrelation extends baseModal {
    constructor() {
        var config = {
            id: "partialCorrelation",
            label: localization.en.title,
            modalType: "two",
            RCode: `
library(ppcor)
#Running the test
BSkyResults <- BSkyPartialSemiCorrelations ( vars = c({{selected.tvarbox1 | safe }}), constants = c({{selected.tvarbox2 | safe}}), 
    type = {{selected.correlationType | safe}}, data = "{{dataset.name}}")
#Formatting the results
BSkyFormat(BSkyResults, "Results")
#Removing the R object after displaying the results
rm(BSkyResults)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            correlationType: {
                el: new selectVar(config, {
                    no: 'correlationType',
                    label: localization.en.correlationType,
                    multiple: false,
                    extraction: "NoPrefix|UseComma|Enclosed",
                    options: ["partial", "semipartial"],
                    default: ""
                })
            },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Date|Logical|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.correlationType.el.content,objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-b",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new partialCorrelation().render()