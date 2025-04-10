/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */












class varianceTest2Samples extends baseModal {
    static dialogId = 'varianceTest2Samples'
    static t = baseModal.makeT(varianceTest2Samples.dialogId)

    constructor() {
        var config = {
            id: varianceTest2Samples.dialogId,
            label: varianceTest2Samples.t('title'),
            modalType: "two",
            RCode: `
BSky_Variance = by( {{dataset.name}}[c('{{selected.tvarbox1 | safe}}')], list({{dataset.name}}\${{selected.tvarbox2 | safe}}),  var, na.rm=TRUE )
BSky_Variance_Test = var.test( {{selected.tvarbox1 | safe}} ~{{selected.tvarbox2 | safe}},  alternative='{{selected.gpbox2 | safe}}', conf.level={{selected.txtbox1 | safe}}, data={{dataset.name}} )
BSkyFormat(BSky_Variance, singleTableOutputHeader="Variance")
BSkyFormat(BSky_Variance_Test)
#remove(BSky_Variance)
#remove(BSky_Variance_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: varianceTest2Samples.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    required:true,
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: varianceTest2Samples.t('tvarbox2'),
                    no: "tvarbox2",
                    required:true,
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: varianceTest2Samples.t('label1'), style: "mt-3",h: 6 }) },
            test1: { el: new radioButton(config, { label: varianceTest2Samples.t('test1'), no: "gpbox2", increment: "test1", value: "two.sided", state: "checked", extraction: "ValueAsIs" }) },
            test2: { el: new radioButton(config, { label: varianceTest2Samples.t('test2'), no: "gpbox2", increment: "test2", value: "greater", state: "", extraction: "ValueAsIs" }) },
            test3: { el: new radioButton(config, { label: varianceTest2Samples.t('test3'), no: "gpbox2", increment: "test3", value: "less", state: "", extraction: "ValueAsIs" }) },
            txtbox1: {
                el: new inputSpinner(config, {
                    no: 'txtbox1',
                    label: varianceTest2Samples.t('txtbox1'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.label1.el.content, objects.test1.el.content, objects.test2.el.content, objects.test3.el.content, objects.txtbox1.el.content],
            nav: {
                name: varianceTest2Samples.t('navigation'),
                icon: "icon-variance-2",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: varianceTest2Samples.t('help.title'),
            r_help: varianceTest2Samples.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: varianceTest2Samples.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new varianceTest2Samples().render()
}
