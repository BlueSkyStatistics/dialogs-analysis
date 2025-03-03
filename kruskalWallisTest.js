/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class kruskalWallisTest extends baseModal {
    static dialogId = 'kruskalWallisTest'
    static t = baseModal.makeT(kruskalWallisTest.dialogId)

    constructor() {
        var config = {
            id: kruskalWallisTest.dialogId,
            label: kruskalWallisTest.t('title'),
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
		probs = 0.25,na.rm=TRUE),
		mean=base::mean( {{selected.tvarbox1 | safe}}, na.rm =TRUE),
		median=stats::median( {{selected.tvarbox1 | safe}}, na.rm =TRUE),
		Quantile_3rd_75 =stats::quantile( {{selected.tvarbox1 | safe}},
		probs = 0.75, na.rm = TRUE),
        max=base::max( {{selected.tvarbox1 | safe}}, na.rm =TRUE),
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
    xlab("{{selected.tvarbox2 | safe}}") + ylab("{{selected.tvarbox1 | safe}}") + {{selected.BSkyThemes | safe}}

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
            label0: { el: new labelVar(config, { no: 'header', label: kruskalWallisTest.t('header'), h: 9 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: kruskalWallisTest.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                })
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: kruskalWallisTest.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { no: 'label1', label: kruskalWallisTest.t('label1'), h: 9 }) },
            default: { el: new radioButton(config, { label: kruskalWallisTest.t('default'), no: "testmethodbox", increment: "default", value: "0", state: "checked", extraction: "ValueAsIs" }) },
            normal: { el: new radioButton(config, { label: kruskalWallisTest.t('normal'), no: "testmethodbox", increment: "normal", value: "1", state: "", extraction: "ValueAsIs" }) },
            simulations: {
                el: new inputSpinner(config, {
                    no: 'simulations',
                    label: kruskalWallisTest.t('simulations'),
                    min: 1,
                    style: 'ml-2',
                    max: 9999999,
                    step: 1,
                    value: 10000,
                    extraction: "NoPrefix|UseComma"
                })
            },
            exact: { el: new radioButton(config, { label: kruskalWallisTest.t('exact'), no: "testmethodbox", increment: "exact", style: "mb-2", value: "2", state: "", extraction: "ValueAsIs" }) },
            
            //continuity: { el: new radioButton(config, { label: kruskalWallisTest.t('continuity'), no: "testmethodbox", increment: "continuity", value: "exact=FALSE, correct=TRUE", state: "", extraction: "ValueAsIs" }) },
            padjust: {
                el: new comboBox(config, {
                    no: 'padjust',
                    label: kruskalWallisTest.t('padjust'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["holm", "hochberg", "hommel", "bonferroni", "fdr", "BY", "none"],
                    default: "holm"
                })
            },
            ties: {
                el: new comboBox(config, {
                    no: 'ties',
                    label: kruskalWallisTest.t('ties'),
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
                name: kruskalWallisTest.t('navigation'),
                icon: "icon-kw",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: kruskalWallisTest.t('help.title'),
            r_help: kruskalWallisTest.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: kruskalWallisTest.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new kruskalWallisTest().render()
}
