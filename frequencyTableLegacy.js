/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Frequency Table (Legacy)",
        navigation: "Frequencies (Legacy)",
        subsetvars: "Select variables",
        help: {
            title: "Frequency Table",
            r_help: "help(ftable, package=stats)",
            body: `
<b>Description</b></br>
Generates the frequencies for every unique value in one or more variables or column names selected.
<br/>
<b>Usage</b>
<br/>
<code> 
bfreq=BSkyFrequency( vars = c('var1','var2','var3'),data = "datasetname")
<br/>
BSkyFormat(bfreq)
</code> <br/>
<b>Details</b></br>
This dialog uses following functions:</br>
- ftable()</br>
- summary()</br>
- lapply()</br>
- rbind()</br>
- cbind()</br>
`}
    }
}
class frequencyTableLegacy extends baseModal {
    constructor() {
        var config = {
            id: "frequencyTableLegacy",
            label: localization.en.title,
            modalType: "two",
            RCode: `
#Run the the frequency command            
BSkyFreqResults <- BSkyFrequency( vars = c({{selected.subsetvars | safe}}) , data = {{dataset.name}})
#Display the results
BSkyFormat(BSkyFreqResults)
#Remove the temporary object
if (exists('BSkyFreqResults')) rm (BSkyFreqResults)
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
                icon: "icon-f",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new frequencyTableLegacy().render()