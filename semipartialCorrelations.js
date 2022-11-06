
var localization = {
    en: {
        title: "Semi-partial Correlations",
        navigation: "Semi-partial",
        statistic: "Select a method",
        tvarbox1: "Select variables",
        correlationType: "Type of correlation",
        tvarbox2: "Select control variables",
        help: {
            title: "Semi-partial Correlations",
            r_help: "help(spcor.test, package=ppcor)",
            body: `
            <b>Description</b></br>
            Semi-partial correlation for two variables given a third variable. We will calculate the pairwise semi-partial correlation between each of the variables specified in the select variables control, controlling for the variables specified in the control variables control.<br/>
            We have written a wrapper around the function spcor.test that calls spcor.test for each pair of the variables specified.
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            spcor.test(x, y, z, method = c("pearson", "kendall", "spearman"))</br>
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            Arguments
            x: a numeric vector.
            </li>
            <li>
            y: a numeric vector.
            </li>
            <li>
            y: a numeric vector.
            </li>
            <li>
            method: a character string indicating which partial correlation coefficient is to be computed. One of "pearson" (default), "kendall", or "spearman" can be abbreviated..
            </li>
            </ul>
            <b>Details</b></br>
            Semi-partial correlation is the correlation of two variables with variation from a third variable removed only from the second variable. When the determinant of variance-covariance matrix is numerically zero, Moore-Penrose generalized matrix inverse is used. In this case, no p-value and statistic will be provided if the number of variables are greater than or equal to the sample size.</br>
            <b>Value</b><br/>
            estimate: the semi-partial (part) correlation coefficient between two variables.<br/>
            p.value: the p-value of the test.<br/>
            n: The number of samples.<br/>
            <b>Examples</b><br/>
            <code> 
            spcor.test(y.data$hl,y.data$disp,y.data[,c("deg","BC")])
            </code> <br/>
            <b>Package</b></br>
            ppcor</br>
            <b>Help</b></br>
            help(pcor.test, package=ppcor)
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
    type = "semipartial", method = {{selected.statistic | safe}}, data = "{{dataset.name}}")
#Formatting the results
BSkyFormat(BSkyResults, "Results")
#Removing the R object after displaying the results
rm(BSkyResults)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            statistic: {
                el: new selectVar(config, {
                    no: 'statistic',
                    label: localization.en.statistic,
                    multiple: false,
                    extraction: "NoPrefix|UseComma|Enclosed",
                    options: ["pearson", "kendall", "spearman"],
                    default: "pearson"
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
            right: [objects.statistic.el.content, objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-link",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new partialCorrelation().render()