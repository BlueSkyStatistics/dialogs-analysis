/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class frequencyForFactorsTopN extends baseModal {
    static dialogId = 'frequencyForFactorsTopN'
    static t = baseModal.makeT(frequencyForFactorsTopN.dialogId)

    constructor() {
        var config = {
            id: frequencyForFactorsTopN.dialogId,
            label: frequencyForFactorsTopN.t('title'),
            modalType: "two",
            RCode: `
bfacvar = BSkyFactorVariableAnalysis (vars=c({{selected.subsetvars | safe}}), data={{dataset.name}}, show.only.top.factors={{selected.ChkboxShowOnlyTopFewFactors | safe}}, max.number.top.factors={{selected.txtNumTopFactorsToShow | safe}})
BSkyFormat(bfacvar)
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: frequencyForFactorsTopN.t('subsetvars'),
                    no: "subsetvars",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            ChkboxShowOnlyTopFewFactors: { el: new checkbox(config, { label: frequencyForFactorsTopN.t('ChkboxShowOnlyTopFewFactors'), dependant_objects: ['txtNumTopFactorsToShow'], no: "ChkboxShowOnlyTopFewFactors", checked: true, extraction: "Boolean" }) },
            txtNumTopFactorsToShow: {
                el: new inputSpinner(config, {
                    no: 'txtNumTopFactorsToShow',
                    label: frequencyForFactorsTopN.t('txtNumTopFactorsToShow'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label1: { el: new labelVar(config, { label: frequencyForFactorsTopN.t('label1'), style: "mb-3",h: 6 }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.subsetvars.el.content, objects.ChkboxShowOnlyTopFewFactors.el.content, objects.label1.el.content, objects.txtNumTopFactorsToShow.el.content],
            nav: {
                name: frequencyForFactorsTopN.t('navigation'),
                icon: "icon-fn",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: frequencyForFactorsTopN.t('help.title'),
            r_help: frequencyForFactorsTopN.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: frequencyForFactorsTopN.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new frequencyForFactorsTopN().render()
}
