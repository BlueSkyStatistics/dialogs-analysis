/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Numerical Statistics, using describe",
        navigation: "Numerical Summaries, using describe (Legacy)",
        tvarbox1: "Select variables",
        tvarbox2 :"Select grouping variables",
        help: {
            title: "Numerical Statistics, using describe",
            r_help: "help(describe, package=psych)",
            body: `
<b>Description</b></br>
Outputs the  following numerical statistics:</br>
count, mean, standard deviation, median, trimmed, mad, min, max, range, skew,  kurtosis, standard error
<br/>
<b>Usage</b>
<br/>
<code> 
#BSkyFormat displays nicely formatted output<br/>
BSkyFormat (as.data.frame(psych::describe(x=Dataset[,c('var1','var2'])))
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: A dataframe or matrix
</li>
</ul>
<b>Package</b></br>
psych</br>
<b>Help</b></br>
help(describe, package=psych)
`}
    }
}






class numericalStatisticalAnalysisUsingDescribe extends baseModal {
    constructor() {
        var config = {
            id: "numericalStatisticalAnalysisUsingDescribe",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(psych)
{{if (options.selected.tvarbox2 != "")}}
BSkyFormat (psych::describeBy({{dataset.name}}[,c({{selected.tvarbox1 | safe}})],\n\t group= list({{selected.tvarbox2 | safe}}), mat=TRUE), singleTableOutputHeader = "Numerical Summaries")
{{#else}}
BSkyFormat (as.data.frame(psych::describe({{dataset.name}}[,c({{selected.tvarbox1 | safe}})])), singleTableOutputHeader = "Numerical Summaries")
{{/if}}
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
                    required: true
                }), r: ['{{ var | safe}}']
            },

            tvarbox2: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "Prefix|UseComma",
                    }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sigma-describe",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new numericalStatisticalAnalysisUsingDescribe().render()