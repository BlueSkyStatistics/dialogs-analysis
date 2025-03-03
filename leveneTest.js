/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Levene's Test",
        navigation: "Levene's Test",
        tvarbox1: "Response Variable (one) ",
        tvarbox3: "Factor Variable",
        label1: "Center",
        median: "Median",
        mean: "Mean",
        help: {
            title: "Levene's Test",
            r_help: "help(Anova, package='car')",
            body: `
<b>Description</b></br>
Computes Levene's test for homogeneity of variance across groups.
<br/>
<b>Usage</b>
<br/>
<code> 
leveneTest(y, ...)<br/>
## S3 method for class 'formula'<br/>
leveneTest(y, data, ...)<br/>
## S3 method for class 'lm'<br/>
leveneTest(y, ...)<br/>
## Default S3 method:<br/>
leveneTest(y, group, center=median, ...)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
y: response variable for the default method, or a lm or formula object. If y is a linear-model object or a formula, the variables on the right-hand-side of the model must all be factors and must be completely crossed.
</li>
<li>
group: factor defining groups.
</li>
<li>
center: The name of a function to compute the center of each group; mean gives the original Levene's test; the default, median, provides a more robust test.
</li>
<li>
data: a data frame for evaluating the formula.
</li>
<li>
...: arguments to be passed down, e.g., data for the formula and lm methods; can also be used to pass arguments to the function given by center (e.g., center=mean and trim=0.1 specify the 10% trimmed mean).
</li>
</ul>
<b>Value</b><br/>
returns an object meant to be printed showing the results of the test.<br/>
<b>Examples</b><br/>
<code> 
Dataframe <- data.frame(Expenses=c(20,23,19,25,26), Sales=c(48,50,55,51,49), Gender=c('m','f','f','m','m'), Deptt=c('Accounts', 'HR', 'Sales','Marketing','IT'))
Result_Levene_Test = leveneTest( Sales ~ interaction(Gender, Deptt),data=Dataframe,center=base::mean )
</code> <br/>
<b>Package</b></br>
car;moments;dplyr</br>
<b>Help</b></br>
help(leveneTest, package=car)
`}
    }
}








class leveneTest extends baseModal {
    constructor() {
        var config = {
            id: "leveneTest",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(car)
require(moments)
require(dplyr)
#Summary statistics
BSkyFormat(as.data.frame({{dataset.name}} %>% dplyr::group_by({{selected.tvarbox3 | safe}})  %>% dplyr::summarize(count_{{selected.tvarbox1 | safe}} =dplyr::n(), variance_{{selected.tvarbox1 | safe}}=stats::var({{selected.tvarbox1 | safe}},na.rm =TRUE),sd_{{selected.tvarbox1 | safe}}=stats::sd({{selected.tvarbox1 | safe}},na.rm =TRUE),std_err_{{selected.tvarbox1 | safe}}=BlueSky::bskystderr({{selected.tvarbox1 | safe}}),min_{{selected.tvarbox1 | safe}} = base::min({{selected.tvarbox1 | safe}}, na.rm = TRUE),Quantile_1st_{{selected.tvarbox1 | safe}} =stats::quantile({{selected.tvarbox1 | safe}}, probs = seq(0.25), na.rm = TRUE),mean_{{selected.tvarbox1 | safe}}=base::mean({{selected.tvarbox1 | safe}},na.rm =TRUE),median_{{selected.tvarbox1 | safe}}=stats::median({{selected.tvarbox1 | safe}},na.rm =TRUE),Quantile_3rd_{{selected.tvarbox1 | safe}} =stats::quantile({{selected.tvarbox1 | safe}}, probs = seq(0.75), na.rm = TRUE),skewness_{{selected.tvarbox1 | safe}}=moments::skewness({{selected.tvarbox1 | safe}},na.rm =TRUE), kurtosis_{{selected.tvarbox1 | safe}}=moments::kurtosis({{selected.tvarbox1 | safe}},na.rm =TRUE)    )),singleTableOutputHeader="Summary Statistics")
#Levene's test
BSky_Levene_Test = leveneTest( {{selected.tvarbox1 | safe}} ~ interaction({{selected.tvarbox3 | safe}}), data={{dataset.name}}, center={{selected.gpbox1 | safe}} )
BSkyFormat(as.data.frame(BSky_Levene_Test), singleTableOutputHeader=paste ("Levene's test for homogenity of variances", "center ={{selected.gpbox1 | safe}}") )
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
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox3,
                    no: "tvarbox3",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mt-3",h: 5 }) },
            median: { el: new radioButton(config, { label: localization.en.median, no: "gpbox1", increment: "median", value: "stats::median", state: "checked", extraction: "ValueAsIs" }) },
            mean: { el: new radioButton(config, { label: localization.en.mean, no: "gpbox1", increment: "mean", value: "base::mean", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox3.el.content, objects.label1.el.content, objects.median.el.content, objects.mean.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-l",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new leveneTest().render()