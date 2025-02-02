









class proportionIndependentSamples extends baseModal {
    static dialogId = 'proportionIndependentSamples'
    static t = baseModal.makeT(proportionIndependentSamples.dialogId)

    constructor() {
        var config = {
            id: proportionIndependentSamples.dialogId,
            label: proportionIndependentSamples.t('title'),
            modalType: "two",
            RCode: `
require(RcmdrMisc)
BSky_Factor_Variable_Count_Table = xtabs(~{{selected.tvarbox1 | safe}} +{{selected.response | safe}}, data= {{dataset.name}})
BSkyFormat(rowPercents(BSky_Factor_Variable_Count_Table), singleTableOutputHeader="Percentage Table" )
BSky_Two_Sample_Proportion_Test = prop.test((BSky_Factor_Variable_Count_Table), alternative='{{selected.gpbox2 | safe}}', conf.level={{selected.txtbox1 | safe}}, correct={{selected.chkbox1 | safe}})
BSkyFormat(BSky_Two_Sample_Proportion_Test)
#remove(BSky_Factor_Variable_Count_Table)
#remove(BSky_Two_Sample_Proportion_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: proportionIndependentSamples.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UsePlus",
                    required: true,
                })
            },
            response: {
                el: new dstVariable(config, {
                    label: proportionIndependentSamples.t('response'),
                    no: "response",
                    filter: "Numeric|Logical|Ordinal(with 2 levels)|Nominal(with 2 levels)",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { label: proportionIndependentSamples.t('label1'), h: 6 }) },
            test1: {
                el: new radioButton(config, {
                    label: proportionIndependentSamples.t('test1'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            test2: {
                el: new radioButton(config, {
                    label: proportionIndependentSamples.t('test2'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            test3: {
                el: new radioButton(config, {
                    label: proportionIndependentSamples.t('test3'),
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
                    label: proportionIndependentSamples.t('txtbox1'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            chkbox1: { el: new checkbox(config, { label: proportionIndependentSamples.t('chkbox1'), no: "chkbox1", extraction: "Boolean" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.response.el.content, objects.label1.el.content,
            objects.test1.el.content, objects.test2.el.content, objects.test3.el.content,
            objects.txtbox1.el.content, objects.chkbox1.el.content],
            nav: {
                name: proportionIndependentSamples.t('navigation'),
                icon: "icon-p2",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: proportionIndependentSamples.t('help.title'),
            r_help: proportionIndependentSamples.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: proportionIndependentSamples.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new proportionIndependentSamples().render()
}
