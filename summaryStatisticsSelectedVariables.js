/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Summary Statistics, selected variables",
        navigation: "Summary Statistics, selected variables (Legacy)",
        subsetvars: "Selected Variables",
        help: {
            title: "Summary Statistics",
            r_help: "",
            body: `
            <b>Description</b></br>
            Generates the summaries for every variable selected. Shows Minimum, 1st Quartile, Median, Mean, 3rd Quartile, Maximum and count of NAs for numeric and date variables.</br>
            For factor variable it displays the counts of each level.</br>
            For logical variable it displays the counts of TRUE, FALSE and NAs</br>
            R Help is not available because in we have written custom code using  multiple  R functions. If you need to inspect the code click the "<>" button.</br>
`}
    }
}






class summaryStatisticsSelectedVariables extends baseModal {
    constructor() {
        var config = {
            id: "summaryStatisticsSelectedVariables",
            label: localization.en.title,
            modalType: "two",
            RCode: `
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}))
BSky_Summary_By_Variable <- ftable(summary({{dataset.name}}[c({{selected.subsetvars | safe}})], maxsum =  1+max(sapply( {{dataset.name}}[c({{selected.subsetvars | safe}})] [,sapply( {{dataset.name}}[c({{selected.subsetvars | safe}})], is.factor)], nlevels  )) ))
BSky_Summary_By_Variable[is.na(BSky_Summary_By_Variable[])]=c("")
BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Summary_By_Variable, singleTableOutputHeader=c("Summary By Variable"))
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: localization.en.subsetvars,
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.subsetvars.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sigma-variables",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new summaryStatisticsSelectedVariables().render()