/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */









class numericalStatisticalAnalysisUsingDescribe extends baseModal {
    static dialogId = 'numericalStatisticalAnalysisUsingDescribe'
    static t = baseModal.makeT(numericalStatisticalAnalysisUsingDescribe.dialogId)

    constructor() {
        var config = {
            id: numericalStatisticalAnalysisUsingDescribe.dialogId,
            label: numericalStatisticalAnalysisUsingDescribe.t('title'),
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
                    label: numericalStatisticalAnalysisUsingDescribe.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },

            tvarbox2: {
                el: new dstVariableList(config, {
                    label: numericalStatisticalAnalysisUsingDescribe.t('tvarbox2'),
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
                name: numericalStatisticalAnalysisUsingDescribe.t('navigation'),
                icon: "icon-sigma-describe",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: numericalStatisticalAnalysisUsingDescribe.t('help.title'),
            r_help: numericalStatisticalAnalysisUsingDescribe.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: numericalStatisticalAnalysisUsingDescribe.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new numericalStatisticalAnalysisUsingDescribe().render()
}
