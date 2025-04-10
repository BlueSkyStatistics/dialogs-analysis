/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class summaryStatisticsByGroupLatest extends baseModal {
    static dialogId = 'summaryStatisticsByGroupLatest'
    static t = baseModal.makeT(summaryStatisticsByGroupLatest.dialogId)

    constructor() {
        var config = {
            id: summaryStatisticsByGroupLatest.dialogId,
            label: summaryStatisticsByGroupLatest.t('title'),
            modalType: "two",
            RCode: `
{{if (options.selected.tvarbox2 != "")}}
BSky_Summary_Statistics = BSkyVariableSummaryStats(data = {{dataset.name}}, vars = c({{selected.tvarbox1b | safe}}), group_by_vars = c({{selected.tvarbox2b | safe}}), {{if (options.selected.ChkboxShowOnlyTopFewFactorsb=="TRUE")}}maxsum = {{selected.txtNumTopFactorsToShowb | safe}}{{#else}}maxsum = 0{{/if}})
BSkyFormat(BSky_Summary_Statistics, singleTableOutputHeader=c("Summary Statistics by Group"))
#remove(BSky_Summary_Statistics)
{{#else}}
BSky_Summary_Statistics = BSkyVariableSummaryStats(data = {{dataset.name}}, vars = c({{selected.tvarbox1b | safe}}), {{if (options.selected.ChkboxShowOnlyTopFewFactors=="TRUE")}}maxsum ={{selected.txtNumTopFactorsToShow | safe}}{{#else}}maxsum = 0 {{/if}}))
BSkyFormat(BSky_Summary_Statistics, singleTableOutputHeader=c("Summary Statistics by Group"))
{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: summaryStatisticsByGroupLatest.t('tvarbox1'),
                    no: "tvarbox1b",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: summaryStatisticsByGroupLatest.t('tvarbox2'),
                    no: "tvarbox2b",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    }), r: ['{{ var | safe}}']
            },
            ChkboxShowOnlyTopFewFactors: { el: new checkbox(config, { label: summaryStatisticsByGroupLatest.t('ChkboxShowOnlyTopFewFactors'), dependant_objects: ['txtNumTopFactorsToShowb'], no: "ChkboxShowOnlyTopFewFactorsb", checked: true, extraction: "Boolean" }) },
            txtNumTopFactorsToShow: {
                el: new inputSpinner(config, {
                    no: 'txtNumTopFactorsToShowb',
                    label: summaryStatisticsByGroupLatest.t('txtNumTopFactorsToShow'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label1: { el: new labelVar(config, { label: summaryStatisticsByGroupLatest.t('label1'), style: "mb-3",h: 6 }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content,objects.ChkboxShowOnlyTopFewFactors.el.content, objects.label1.el.content, objects.txtNumTopFactorsToShow.el.content],
            nav: {
                name: summaryStatisticsByGroupLatest.t('navigation'),
                icon: "icon-sigma",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: summaryStatisticsByGroupLatest.t('help.title'),
            r_help: summaryStatisticsByGroupLatest.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: summaryStatisticsByGroupLatest.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new summaryStatisticsByGroupLatest().render()
}
