
var localization = {
    en: {
        title: "Kruskal-Wallis Rank Sum Test",
        navigation: "Kruskal-Wallis Test",
        tvarbox1: "Response variable",
        tvarbox2: "Factor variable",
        label1: "Estimation method",
        default: "Asymptotic",
        exact: "Exact NOTE: factor variable must have exactly 2 levels or else an error will display",
        normal: "Monte Carlo",
        header: "NOTE: When selecting the exact estimation method, the factor variable must have exactly 2 levels else an error will display",
        //continuity: "Normal approximation, continuity correction",
        padjust: "Multiple comparison adjustment",
        //Exact:"Exact test to handle ties",
        ties: "Options for handling ties",
        simulations: "Enter the number of simulations",
        help: {
            title: "Kruskal-Wallis Rank Sum Test",
            r_help: "help(kruskal.test, package=stats)",
            body: `
<b>Description</b></br>
Performs a Kruskal-Wallis rank sum test.
<br/>
<b>Usage</b>
<br/>
<code> 
kruskal.test(x, ...)
## Default S3 method:
kruskal.test(x, g, ...)
## S3 method for class 'formula'
kruskal.test(formula, data, subset, na.action, ...)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
Arguments
x: a numeric vector of data values, or a list of numeric data vectors. Non-numeric elements of a list will be coerced, with a warning.
</li>
<li>
g: a vector or factor object giving the group for the corresponding elements of x. Ignored with a warning if x is a list.
</li>
<li>
formula: a formula of the form response ~ group where response gives the data values and group a vector or factor of the corresponding groups.
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
kruskal.test performs a Kruskal-Wallis rank sum test of the null that the location parameters of the distribution of x are the same in each group (sample). The alternative is that they differ in at least one.</br>
If x is a list, its elements are taken as the samples to be compared, and hence have to be numeric data vectors. In this case, g is ignored, and one can simply use kruskal.test(x) to perform the test. If the samples are not yet contained in a list, use kruskal.test(list(x, ...)).</br>
Otherwise, x must be a numeric data vector, and g must be a vector or factor object of the same length as x giving the group for the corresponding elements of x.</br>
<b>Value</b><br/>
A list with class "htest" containg the following components:<br/>
statistic: the Kruskal-Wallis rank sum statistic<br/>
parameter: the degrees of freedom of the approximate chi-squared distribution of the test statistic<br/>
p.value: the p-value of the test<br/>
method: the character string "Kruskal-Wallis rank sum test"<br/>
data.name: a character string giving the names of the data<br/>
<b>Description</b></br>
Multiple Comparison Adjustment</br>
The adjustment methods include the Bonferroni correction ("bonferroni") in which the p-values are multiplied by the number of comparisons. Less conservative corrections are also included by Holm (1979) ("holm"), Hochberg (1988) ("hochberg"), Hommel (1988) ("hommel"), Benjamini & Hochberg (1995) ("BH" or its alias "fdr"), and Benjamini & Yekutieli (2001) ("BY"), respectively. A pass-through option ("none") is also included. The set of methods are contained in the p.adjust.methods vector for the benefit of methods that need to have the method as an option and pass it on to p.adjust.</br>
The first four methods are designed to give strong control of the family-wise error rate. There seems no reason to use the unmodified Bonferroni correction because it is dominated by Holm's method, which is also valid under arbitrary assumptions.</br>
Hochberg's and Hommel's methods are valid when the hypothesis tests are independent or when they are non-negatively associated (Sarkar, 1998; Sarkar and Chang, 1997). Hommel's method is more powerful than Hochberg's, but the difference is usually small and the Hochberg p-values are faster to compute.</br>
The "BH" (aka "fdr") and "BY" method of Benjamini, Hochberg, and Yekutieli control the false discovery rate, the expected proportion of false discoveries amongst the rejected hypotheses. The false discovery rate is a less stringent condition than the family-wise error rate, so these methods are more powerful than the others.</br>
</br>
Test Method for pairwise group comparisons:</br>
Default: an exact p-value is computed if the samples contain less than 50 finite values and there are no ties.  Otherwise, a normal approximation is used.</br>
Exact: an exact p-value is computed; not recommended for large sample sizes due to computation time</br>
Normal Approximation: p-values using a normal approximation are computed</br>
With Continuity Correction: p-values using a normal approximation with a continuity correction are computed </br>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(kruskal.test, package=stats)
`}
    }
}








class kruskalWallisTest extends baseModal {
    constructor() {
        var config = {
            id: "kruskalWallisTest",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(dplyr)
require(coin)
require(ggplot2);
require(ggthemes);
BSkySummaries <- {{dataset.name}} %>%
	dplyr::group_by( {{selected.tvarbox2 | safe}} ) %>%
	dplyr::summarize( count =dplyr::n(),
		min = base::min( {{selected.tvarbox1 | safe}}, na.rm = TRUE),
		Quantile_1st_25 =stats::quantile( {{selected.tvarbox1 | safe}},
		probs = seq(0.25),na.rm=TRUE),
		mean=base::mean( {{selected.tvarbox1 | safe}}, na.rm =TRUE),
		median=stats::median( {{selected.tvarbox1 | safe}}, na.rm =TRUE),
		Quantile_3rd_75 =stats::quantile( {{selected.tvarbox1 | safe}},
		probs = seq(0.75), na.rm = TRUE),
		variance = stats::var( {{selected.tvarbox1 | safe}}, na.rm =TRUE),
		std_err = BlueSky::bskystderr( {{selected.tvarbox1 | safe}}),
		skewness = moments::skewness( {{selected.tvarbox1 | safe}}, na.rm =TRUE),
		kurtosis = moments::kurtosis( {{selected.tvarbox1 | safe}}, na.rm =TRUE))
#Adding the target variable to the results
BSkySummaries = cbind( TargetVariable = rep("{{selected.tvarbox1 | safe}}", nrow(BSkySummaries)),BSkySummaries)
BSkyFormat(BSkySummaries, singleTableOutputHeader = "Summary Statistics")

#Boxplot
ggplot(data={{dataset.name}}, aes( x = {{selected.tvarbox2 | safe}}, y = {{selected.tvarbox1 | safe}}  )) +
    geom_boxplot( alpha=1,) +
    labs(x="{{selected.tvarbox2 | safe}}",y="{{selected.tvarbox1 | safe}}", title= "Boxplot for variable: {{selected.tvarbox1 | safe}}, grouped by: {{selected.tvarbox2 | safe}}") +
    xlab("{{selected.tvarbox2 | safe}}") + ylab("{{selected.tvarbox1 | safe}}")

#Run the test
{{if (options.selected.testmethodbox =="0") }}BSky_Kruskal_Test = coin::kruskal_test( {{selected.tvarbox1 | safe}} ~ {{selected.tvarbox2 | safe}}, \n\tdata = {{dataset.name}}, distribution = "asymptotic"){{/if}}
{{if (options.selected.testmethodbox =="1") }}BSky_Kruskal_Test = coin::kruskal_test( {{selected.tvarbox1 | safe}} ~ {{selected.tvarbox2 | safe}}, \n\tdata = {{dataset.name}}, distribution = approximate(nresample = {{if (options.selected.simulations =="")}}10000{{#else}}{{selected.simulations | safe}}{{/if}})){{/if}}
{{if (options.selected.testmethodbox =="2") }}BSky_Kruskal_Test = coin::kruskal_test( {{selected.tvarbox1 | safe}} ~ {{selected.tvarbox2 | safe}}, \n\tdata = {{dataset.name}}, distribution = "exact"){{/if}}
\n#Display results in the output window
# Creating a dataframe that contains the statistic and p-value
BSkyKruskalStatResults = data.frame(Chi.squared = statistic(BSky_Kruskal_Test), P.value = pvalue(BSky_Kruskal_Test))
BSkyFormat(BSkyKruskalStatResults, \n\tsingleTableOutputHeader = paste ("Kruskal-Wallis Test - ", "{{selected.tvarbox1 | safe}}", " By ", "{{selected.tvarbox2 | safe}}", sep =""))
# Creating a dataframe that contains additional statistics p-value, expectation, variance, covariance
BSkyKruskalAddResults = data.frame(Expectation = expectation(BSky_Kruskal_Test)[,1], \n\tVariance = variance(BSky_Kruskal_Test)[,1], \n\tCovariance = covariance(BSky_Kruskal_Test)[,1])
BSkyFormat(BSkyKruskalAddResults, \n\tsingleTableOutputHeader = paste ("Aditional Statistics For Kruskal-Wallis Test - ", "{{selected.tvarbox1 | safe}}", " By ", "{{selected.tvarbox2 | safe}}", sep =""))

# pairwise group tests
if (nlevels({{dataset.name}}\${{selected.tvarbox2 | safe}}) > 2)
{
    BSky.pw.tests <- pairwise.wilcox.test({{dataset.name}}\${{selected.tvarbox1 | safe}},\n\t{{dataset.name}}\${{selected.tvarbox2 | safe}}, p.adjust.method="{{selected.padjust | safe}}")
    #For numeric rowlabels to show up using BSkyFormat
    #rownames(BSky.pw.tests$p.value) <- paste0(rownames(BSky.pw.tests$p.value), "\.")
    BSkyFormat(BSky.pw.tests, \n\toutputTableRenames = c("Overview of Pairwise Comparison", "P-value for Pairwise Test"))  
}
#Cleaning up temporary objects
if ( exists("BSkySummaries")) rm(BSkySummaries)
if ( exists("BSky_Kruskal_Test")) rm(BSky_Kruskal_Test)
if ( exists("BSkyKruskalStatResults")) rm(BSkyKruskalStatResults)
if ( exists("BSkyKruskalAddResults")) rm(BSkyKruskalAddResults)
if ( exists("BSky.pw.tests")) rm(BSky.pw.tests)
`
        }
        var objects = {
            label0: { el: new labelVar(config, { no: 'header', label: localization.en.header, h: 9 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                })
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { no: 'label1', label: localization.en.label1, h: 9 }) },
            default: { el: new radioButton(config, { label: localization.en.default, no: "testmethodbox", increment: "default", value: "0", state: "checked", extraction: "ValueAsIs" }) },
            normal: { el: new radioButton(config, { label: localization.en.normal, no: "testmethodbox", increment: "normal", value: "1", state: "", extraction: "ValueAsIs" }) },
            simulations: {
                el: new inputSpinner(config, {
                    no: 'simulations',
                    label: localization.en.simulations,
                    min: 1,
                    style: 'ml-2',
                    max: 9999999,
                    step: 1,
                    value: 10000,
                    extraction: "NoPrefix|UseComma"
                })
            },
            exact: { el: new radioButton(config, { label: localization.en.exact, no: "testmethodbox", increment: "exact", style: "mb-2", value: "2", state: "", extraction: "ValueAsIs" }) },
            
            //continuity: { el: new radioButton(config, { label: localization.en.continuity, no: "testmethodbox", increment: "continuity", value: "exact=FALSE, correct=TRUE", state: "", extraction: "ValueAsIs" }) },
            padjust: {
                el: new comboBox(config, {
                    no: 'padjust',
                    label: localization.en.padjust,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["holm", "hochberg", "hommel", "bonferroni", "fdr", "BY", "none"],
                    default: "holm"
                })
            },
            ties: {
                el: new comboBox(config, {
                    no: 'ties',
                    label: localization.en.ties,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["mid-ranks", "average-scores"],
                    default: "mid-ranks"
                })
            },

        }
        const content = {
          //  head: [objects.label0.el.content,],
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.label1.el.content, objects.default.el.content, objects.normal.el.content, objects.simulations.el.content, objects.exact.el.content, objects.padjust.el.content, objects.ties.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-kw",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new kruskalWallisTest().render()