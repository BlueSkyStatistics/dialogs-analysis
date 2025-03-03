/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */










class binomialTestSingleSample extends baseModal {
    static dialogId = 'binomialTestSingleSample'
    static t = baseModal.makeT(binomialTestSingleSample.dialogId)

    constructor() {
        var config = {
            id: binomialTestSingleSample.dialogId,
            label: binomialTestSingleSample.t('title'),
            modalType: "two",
            RCode: `
{{selected.tvarbox1 | safe}}_success_failure_count = xtabs(~{{selected.tvarbox1 | safe}} , data= {{dataset.name}})
BSkyFormat({{selected.tvarbox1 | safe}}_success_failure_count,singleTableOutputHeader="Counts")
if ( dim({{selected.tvarbox1 | safe}}_success_failure_count) ==2)
{
BSky_Single_Sample_Exact_Binom_Proportion_Test = binom.test({{selected.tvarbox1 | safe}}_success_failure_count, alternative='{{selected.gpbox2 | safe}}', p={{selected.txtbox2 | safe}}, conf.level={{selected.txtbox1 | safe}})
BSkyFormat(BSky_Single_Sample_Exact_Binom_Proportion_Test)
} else if (dim({{selected.tvarbox1 | safe}}_success_failure_count) > 2)
{
cat("ERROR: The target variable has more than 2 unique values")
} else  if (dim({{selected.tvarbox1 | safe}}_success_failure_count) == 1)
{
cat("ERROR: The target variable has a single unique value")
}
#remove(BSky_Factor_Variable_Count_Table)
#remove(BSky_Single_Sample_Exact_Binom_Proportion_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config,  {action: "move"})},
            tvarbox1: {
                el: new dstVariable(config, {
                    label: binomialTestSingleSample.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { label: binomialTestSingleSample.t('label1'), h: 6 }) },
            test1: {
                el: new radioButton(config, {
                    label: binomialTestSingleSample.t('test1'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            test2: {
                el: new radioButton(config, {
                    label: binomialTestSingleSample.t('test2'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            test3: {
                el: new radioButton(config, {
                    label: binomialTestSingleSample.t('test3'),
                    no: "gpbox2",
                    increment: "less",
                    value: "less",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            txtbox1: {
                el: new inputSpinner(config, {
                    no: 'txtbox1',
                    label: binomialTestSingleSample.t('txtbox1'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            txtbox2: {
                el: new inputSpinner(config, {
                    no: 'txtbox2',
                    label: binomialTestSingleSample.t('txtbox2'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.5,
                    extraction: "NoPrefix|UseComma"
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.label1.el.content,
            objects.test1.el.content, objects.test2.el.content, objects.test3.el.content,
            objects.txtbox1.el.content, objects.txtbox2.el.content],
            nav: {
                name: binomialTestSingleSample.t('navigation'),
                icon: "icon-b1",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: binomialTestSingleSample.t('help.title'),
            r_help: binomialTestSingleSample.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: binomialTestSingleSample.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new binomialTestSingleSample().render()
}
