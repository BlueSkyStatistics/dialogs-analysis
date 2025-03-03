/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */









class missingValueAnalysis extends baseModal {
    static dialogId = 'missingValueAnalysis'
    static t = baseModal.makeT(missingValueAnalysis.dialogId)

    constructor() {
        var config = {
            id: missingValueAnalysis.dialogId,
            label: missingValueAnalysis.t('title'),
            modalType: "two",
            RCode: `
local({
##Run summary analysis on missing values
missVarSummary <-naniar::miss_var_summary(as.data.frame({{dataset.name}}[,c({{selected.subsetvars | safe}})]), order ={{selected.chk1 | safe}}, add_cumsum={{selected.chk2 | safe}})
##Display results in tabular form
BSkyFormat(as.data.frame(missVarSummary), singleTableOutputHeader = "Missing Variable Summary")
##Analyze cases that are missing
missCaseSummary <-naniar::miss_case_summary(as.data.frame({{dataset.name}}[,c({{selected.subsetvars | safe}})]),order ={{selected.chk1 | safe}}, add_cumsum={{selected.chk2 | safe}} )
##Display the results in tabular form
BSkyFormat(as.data.frame(missCaseSummary), singleTableOutputHeader = "Missing Case Summary")
})
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: missingValueAnalysis.t('subsetvars'),
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            chk1: {
                el: new checkbox(config, {
                    label: missingValueAnalysis.t('chk1'),
                    no: "chk1",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            chk2: {
                el: new checkbox(config, {
                    label: missingValueAnalysis.t('chk2'),
                    no: "chk2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.subsetvars.el.content, objects.chk1.el.content, objects.chk2.el.content],
            nav: {
                name: missingValueAnalysis.t('navigation'),
                icon: "icon-na_row",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: missingValueAnalysis.t('help.title'),
            r_help: missingValueAnalysis.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: missingValueAnalysis.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new missingValueAnalysis().render()
}
