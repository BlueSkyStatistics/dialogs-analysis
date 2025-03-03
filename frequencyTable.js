/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Frequency Table",
        navigation: "Frequencies",
        subsetvars: "Select variables",
		
		label1: "Sort options for the frequency table",
		selectFreqSortRad: "Sort the frequency table by frequency",
		selectVarSortRad: "Sort the frequency table by the values of the variable",
		selectNoSortRad: "None",
		
		selectSortOrderChk: "Decreasing sort order (uncheck for increasing order)",
		
		
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
class frequencyTable extends baseModal {
    constructor() {
        var config = {
            id: "frequencyTable",
            label: localization.en.title,
            modalType: "two",
            RCode:`
library(kableExtra) 
#Run the the frequency command   
{{dataset.name}} %>%
    dplyr::select({{selected.subsetvars | safe}}) %>%
      BSkyFrequency(order_by = c('{{selected.gpbox1 | safe}}'), decreasing = {{selected.selectSortOrderChk | safe}}) %>%
        BSkyFormat()

`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: localization.en.subsetvars,
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
			label1: { 
				el: new labelVar(config, { 
					label: localization.en.label1, 
					h: 6, 
					style: "mb-2",
				}) 
			},
			selectFreqSortRad: {
                el: new radioButton(config, {
                    label: localization.en.selectFreqSortRad,
                    no: "gpbox1",
                    increment: "selectFreqSortRad",
                    value: "freq",
                    state: "checked",
					//style: "mb-3",
                    extraction: "ValueAsIs",
                })
            },
			selectVarSortRad: {
                el: new radioButton(config, {
                    label: localization.en.selectVarSortRad,
                    no: "gpbox1",
                    increment: "selectVarSortRad",
                    value: "var",
                    state: "",
                    extraction: "ValueAsIs",
                })
            },
			selectNoSortRad: {
                el: new radioButton(config, {
                    label: localization.en.selectNoSortRad,
                    no: "gpbox1",
                    increment: "selectNoSortRad",
                    value: "none",
					style: "mb-3",
                    state: "",
                    extraction: "ValueAsIs",
                })
            },
			selectSortOrderChk: {
                el: new checkbox(config, {
                    label: localization.en.selectSortOrderChk,
                    no: "selectSortOrderChk",
                    style: "mb-3",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					state: "checked",
					newline: true,
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [
				objects.subsetvars.el.content,
				objects.label1.el.content,
				objects.selectFreqSortRad.el.content,
				objects.selectVarSortRad.el.content,
				objects.selectNoSortRad.el.content,
				objects.selectSortOrderChk.el.content,
			],
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
module.exports.item = new frequencyTable().render()