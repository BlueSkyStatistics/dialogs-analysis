/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Numerical Statistics, using summarize",
        navigation: "Numerical Summaries, using summarize (Legacy)",
        tvarbox1: "Selected Variables",
        tvarbox2: "Group by",
        label1: "Display Options",
        horizontal:"Horizontal display",
        vertical:"Vertical display",
        help: {
            title: "Numerical Statistics, using summarize",
            r_help: "",
            body: `
<b>Description</b></br>
Outputs the  following numerical statistics for each group of the target variables. The target variables can be optionally grouped by one or more factor or numeric variables. Prints the following information for the target variables or each group that the target variables are grouped by namely min, 1st quantile (25%), max, mean, median, 3rd Quantile (75%), sum,variance,  standard deviation, stdard error, skewness, kurtosis
<br/>
<b>Usage</b>
<br/>
<code> 
##The function below is run for each target variable and the resulting dataframes  are transposed and combined<br/>
dataset1 %>% dplyr::group_by(var1,var2...)  %>% dplyr::summarize( count =dplyr::n(),min = base::min(var3, na.rm = TRUE),Quantile_1st_25 =stats::quantile(var3, probs = seq(0.25),na.rm=TRUE),mean=base::mean(var3,na.rm =TRUE),median=stats::median(var3,na.rm =TRUE),Quantile_3rd_75 =stats::quantile(var3, probs = seq(0.75), na.rm = TRUE),  variance=stats::var(var3,na.rm =TRUE),std_err=BlueSky::bskystderr(var3),skewness=moments::skewness(var3,na.rm =TRUE), kurtosis=moments::kurtosis(var3,na.rm =TRUE))
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
dataset1: This is the dataset
</li>
<li>
group_by: Optionally group the target variables by one or more factor or numeric variables
</li>
<li>
summarize: Summarize the target variables or groups of the target variables (if variables specified in the group_by) by the summary functions specified namely mean, median, min...
</li>
</ul>
<b>Value</b></br>
An object of class "data.frame", giving the results for each function on each variable.</br>
<b>Package</b></br>
caret</br>
<b>Help</b></br>
R Help is not available because in we have written custom code using  multiple  R functions. If you need to inspect the code click the "<>" button.</br>
    `}
    }
}








class NumericalStatisticalAnalysisDisHorizontal extends baseModal {
    constructor() {
        var config = {
            id: "NumericalStatisticalAnalysisDisHorizontal",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(dplyr)
BSkyResults=NULL
BSkyVars = c({{selected.tvarbox1 | safe}})
for (var in BSkyVars)
{
df <-{{dataset.name}} %>%\n\tdplyr::group_by({{selected.tvarbox2 | safe}})  %>%\n\tdplyr::summarize( count =dplyr::n(),\n\t\tmin = base::min(eval(parse(text=var)), na.rm = TRUE),\n\t\tQuantile_1st_25 =stats::quantile(eval(parse(text=var)),\n\t\t probs = seq(0.25),na.rm=TRUE),\n\t\tmean=base::mean(eval(parse(text=var)),na.rm =TRUE),\n\t\tmedian=stats::median(eval(parse(text=var)),na.rm =TRUE),\n\t\tQuantile_3rd_75 =stats::quantile(eval(parse(text=var)),\n\t\tprobs = seq(0.75), na.rm = TRUE),\n\t\tvariance=stats::var(eval(parse(text=var)),na.rm =TRUE),\n\t\tstd_err=BlueSky::bskystderr(eval(parse(text=var))),\n\t\tskewness=moments::skewness(eval(parse(text=var)),na.rm =TRUE),\n\t\tkurtosis=moments::kurtosis(eval(parse(text=var)),na.rm =TRUE))
#Adding the target variable to the results
df = cbind(TargetVariable=rep(var, nrow(df)),df)
#Transposing the dataframe 
df = t(df)
#Combining the results for each target variable
BSkyResults = cbind (BSkyResults, df)
}
{{if (options.selected.gpbox2 =="vertical")}}BSkyResults =t(BSkyResults)\n{{/if}}
BSkyFormat(BSkyResults, singleTableOutputHeader = "Summaries")
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mt-4", h: 6 }) },
            horizontal: {
                el: new radioButton(config, {
                    label: localization.en.horizontal,
                    no: "gpbox2",
                    increment: "horizontal",
                    value: "horizontal",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            vertical: {
                el: new radioButton(config, {
                    label: localization.en.vertical,
                    no: "gpbox2",
                    increment: "vertical",
                    value: "vertical",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },

        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.label1.el.content,objects.horizontal.el.content, objects.vertical.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sigma-horizontal",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new NumericalStatisticalAnalysisDisHorizontal().render()