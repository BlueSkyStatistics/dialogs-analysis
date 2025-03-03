/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class tTestPairedSamples extends baseModal {
    static dialogId = 'tTestPairedSamples'
    static t = baseModal.makeT(tTestPairedSamples.dialogId)

    constructor() {
        var config = {
            id: tTestPairedSamples.dialogId,
            label: tTestPairedSamples.t('title'),
            modalType: "two",
            RCode: `
require(psych)
require(dplyr)
#Summary Statistics
BSkyFormat (as.data.frame({{dataset.name}} %>% dplyr::select({{selected.tvarbox1 | safe}}, {{selected.tvarbox2 | safe}}) %>% na.omit %>% psych::describe()), singleTableOutputHeader ="Summary Statistics" )
#Paired sample t.test
BSky_Paired_t_Test = t.test({{dataset.name}}\${{selected.tvarbox1 | safe}}, {{dataset.name}}\${{selected.tvarbox2 | safe}}, 
    alternative='{{selected.gpbox2 | safe}}', conf.level={{selected.txtbox1 | safe}}, 
    mu={{selected.txtbox2 | safe}}, paired=TRUE)
BSkyFormat(BSky_Paired_t_Test)
#remove(BSkySummary)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: tTestPairedSamples.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: tTestPairedSamples.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: tTestPairedSamples.t('label1'), style:"mt-2",h: 6 }) },
            test1: { el: new radioButton(config, { label: tTestPairedSamples.t('test1'), no: "gpbox2", increment: "test1", value: "two.sided", state: "checked", extraction: "ValueAsIs" }) },
            test2: { el: new radioButton(config, { label: tTestPairedSamples.t('test2'), no: "gpbox2", increment: "test2", value: "greater", state: "", extraction: "ValueAsIs" }) },
            test3: { el: new radioButton(config, { label: tTestPairedSamples.t('test3'), no: "gpbox2", increment: "test3", value: "less", state: "", extraction: "ValueAsIs" }) },
            txtbox2: {
                el: new input(config, {
                    no: 'txtbox2',
                    label: tTestPairedSamples.t('txtbox2'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "0"
                }),
            },
            txtbox1: {
                el: new input(config, {
                    no: 'txtbox1',
                    label: tTestPairedSamples.t('txtbox1'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "0.95"
                }),
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.label1.el.content, objects.test1.el.content, objects.test2.el.content, objects.test3.el.content, objects.txtbox2.el.content, objects.txtbox1.el.content],
            nav: {
                name: tTestPairedSamples.t('navigation'),
                icon: "icon-tp",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: tTestPairedSamples.t('help.title'),
            r_help: tTestPairedSamples.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: tTestPairedSamples.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new tTestPairedSamples().render()
}
