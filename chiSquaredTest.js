
var localization = {
    en: {
        title: "Chi-squared Test",
        navigation: "Chi-squared Test",
        target: "Selected variables",
        proportions: "Test against equal proportions or enter proportions to test against. If your variable is gender, leave this control blank to test for equal proportions. To test for 20% females, 80% males, enter 0.2,0.8. Enter a proportion for every level. Proportions must total to 1.",
        help: {
            title: "Chi-squared Test",
            r_help: "help(chisq.test, package=stats)",
            body: `
<b>Description</b></br>
chisq.test performs chi-squared contingency table tests and goodness-of-fit tests.
<br/>
<b>Usage</b>
<br/>
<code>
chisq.test(x, y = NULL, correct = TRUE,
            p = rep(1/length(x), length(x)), rescale.p = FALSE,
            simulate.p.value = FALSE, B = 2000)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: a numeric vector or matrix. x and y can also both be factors.
</li>
<li>
y: a numeric vector; ignored if x is a matrix. If x is a factor, y should be a factor of the same length.
</li>
<li>
correct: a logical indicating whether to apply continuity correction when computing the test statistic for 2 by 2 tables: one half is subtracted from all |O - E| differences; however, the correction will not be bigger than the differences themselves. No correction is done if simulate.p.value = TRUE.
</li>
<li>
p: a vector of probabilities of the same length of x. An error is given if any entry of p is negative.
</li>
<li>
rescale.p: a logical scalar; if TRUE then p is rescaled (if necessary) to sum to 1. If rescale.p is FALSE, and p does not sum to 1, an error is given.
</li>
<li>
simulate.p.value: a logical indicating whether to compute p-values by Monte Carlo simulation.
</li>
<li>
B: an integer specifying the number of replicates used in the Monte Carlo test.
</li>
</ul>
<b>Description</b><br/>
If x is a matrix with one row or column, or if x is a vector and y is not given, then a goodness-of-fit test is performed (x is treated as a one-dimensional contingency table). The entries of x must be non-negative integers. In this case, the hypothesis tested is whether the population probabilities equal those in p, or are all equal if p is not given.
If x is a matrix with at least two rows and columns, it is taken as a two-dimensional contingency table: the entries of x must be non-negative integers. Otherwise, x and y must be vectors or factors of the same length; cases with missing values are removed, the objects are coerced to factors, and the contingency table is computed from these. Then Pearson's chi-squared test is performed of the null hypothesis that the joint distribution of the cell counts in a 2-dimensional contingency table is the product of the row and column marginals.<br/>
If simulate.p.value is FALSE, the p-value is computed from the asymptotic chi-squared distribution of the test statistic; continuity correction is only used in the 2-by-2 case (if correct is TRUE, the default). Otherwise the p-value is computed for a Monte Carlo test (Hope, 1968) with B replicates.
In the contingency table case simulation is done by random sampling from the set of all contingency tables with given marginals, and works only if the marginals are strictly positive. Continuity correction is never used, and the statistic is quoted without it. Note that this is not the usual sampling situation assumed for the chi-squared test but rather that for Fisher's exact test.<br/>
In the goodness-of-fit case simulation is done by random sampling from the discrete distribution specified by p, each sample being of size n = sum(x). This simulation is done in R and may be slow.<br/>
<b>Value</b></br>
A list with class "htest" containing the following components:</br>
statistic:the value the chi-squared test statistic.</br>
parameter: the degrees of freedom of the approximate chi-squared distribution of the test statistic, NA if the p-value is computed by Monte Carlo simulation.</br>
p.value: the p-value for the test.</br>
method: a character string indicating the type of test performed, and whether Monte Carlo simulation or continuity correction was used.</br>
data.name: a character string giving the name(s) of the data.</br>
observed: the observed counts.</br>
expected: the expected counts under the null hypothesis.</br>
residuals: the Pearson residuals, (observed - expected) / sqrt(expected).</br>
stdres: standardized residuals, (observed - expected) / sqrt(V), where V is the residual cell variance (Agresti, 2007, section 2.4.5 for the case where x is a matrix, n * p * (1 - p) otherwise).​​</br>
<b>Examples</b><br/>
<code> 
## From Agresti(2007) p.39
M <- as.table(rbind(c(762, 327, 468), c(484, 239, 477)))</br>
dimnames(M) <- list(gender = c("F", "M"),</br>
                    party = c("Democrat","Independent", "Republican"))</br>
(Xsq <- chisq.test(M))  # Prints test summary</br>
Xsq$observed   # observed counts (same as M)</br>
Xsq$expected   # expected counts under the null</br>
Xsq$residuals  # Pearson residuals</br>
Xsq$stdres     # standardized residuals</br>
</br>
## Effect of simulating p-values</br>
x <- matrix(c(12, 5, 7, 7), ncol = 2)</br>
chisq.test(x)$p.value           # 0.4233</br>
chisq.test(x, simulate.p.value = TRUE, B = 10000)$p.value</br>
                                # around 0.29!</br>
</code> <br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(chisq.test, package ='caret')      
`}
    }
}







class chiSquaredTest extends baseModal {
    constructor() {
        var config = {
            id: "chiSquaredTest",
            label: localization.en.title,
            modalType: "two",
            RCode: `
local(
{
vars =c({{selected.target | safe}})
for(variable in vars)
{
    {{if (options.selected.proportions != "")}}
    propToTest =c({{selected.proportions | safe}})
    if (sum(propToTest) !=1)
    {
        print("Sum of all the proportions must =1")
        stop()
    }
    if (length(propToTest) !=with({{dataset.name}},length(levels(eval(parse(text =paste(variable)))))))
    {
        print(paste("You must enter a proportion for each level of factor variable ",variable))
        stop()
    }
    {{/if}}
    eval( parse (text =paste( variable, "=", "with ({{dataset.name}},table(", variable, " ) )")))
    {{if (options.selected.proportions != "")}}
    eval ( parse(text = paste ( "x = chisq.test(" , variable, ", p=propToTest)")))
    {{#else}}
    eval ( parse(text = paste ( "x = chisq.test(" , variable, ")")))
    {{/if}}
    y= x[1:5]
    class(y) = class(x)
    z = cbind(Observed = x$observed, Expected = x$expected, Residuals=x$residuals)
    row.names(z) = names(x$observed)
    BSkyFormat(z,singleTableOutputHeader =paste("Frequencies for variable", variable) )
    BSkyFormat(y)
}
}
)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: localization.en.target,
                    no: "target",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            proportions: {
                el: new input(config, {
                    no: 'proportions',
                    label: localization.en.proportions,
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    value: "",
                  }),
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.proportions.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-chi_squared",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new chiSquaredTest().render()