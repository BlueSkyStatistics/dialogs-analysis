


class wilcoxonMannWhitney extends baseModal {
    static dialogId = 'wilcoxonMannWhitney'
    static t = baseModal.makeT(wilcoxonMannWhitney.dialogId)

    constructor() {
        var config = {
            id: wilcoxonMannWhitney.dialogId,
            label: wilcoxonMannWhitney.t('title'),
            modalType: "two",
            RCode: `
#Wilcoxon Mann Whitney analysis
BSky_Median = by({{dataset.name}}\${{selected.tvarbox1}}, list({{dataset.name}}\${{selected.tvarbox2}}),  median, na.rm=TRUE)
BSky_Wilcoxon_Test = wilcox.test({{selected.tvarbox1}} ~{{selected.tvarbox2}}, alternative='{{selected.gpbox2}}', conf.int = TRUE, conf.level={{selected.txtbox1}}, {{selected.gpbox1}}, mu = {{selected.txtbox2}}, data={{dataset.name}})
BSkyFormat(BSky_Median, singleTableOutputHeader='Summary Statistics')
BSkyFormat(BSky_Wilcoxon_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: wilcoxonMannWhitney.t('tvarbox1'),
                    no: "tvarbox1",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: wilcoxonMannWhitney.t('tvarbox2'),
                    no: "tvarbox2",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                })
            },
            label1: { el: new labelVar(config, { label: wilcoxonMannWhitney.t('label1'), style: "mt-4",h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: wilcoxonMannWhitney.t('twosided'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: wilcoxonMannWhitney.t('greater'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            less: {
                el: new radioButton(config, {
                    label: wilcoxonMannWhitney.t('less'),
                    no: "gpbox2",
                    increment: "less",
                    value: "less",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label2: { el: new labelVar(config, { label: wilcoxonMannWhitney.t('label2'),style: "mt-4", h: 6 }) },
            default: {
                el: new radioButton(config, {
                    label: wilcoxonMannWhitney.t('default'),
                    no: "gpbox1",
                    increment: "default",
                    value: "exact = NULL, correct = TRUE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            exact: {
                el: new radioButton(config, {
                    label: wilcoxonMannWhitney.t('exact'),
                    no: "gpbox1",
                    increment: "exact",
                    value: "exact = TRUE, correct = FALSE",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            normal: {
                el: new radioButton(config, {
                    label: wilcoxonMannWhitney.t('normal'),
                    no: "gpbox1",
                    increment: "normal",
                    value: "exact = FALSE, correct = FALSE",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            contingency: {
                el: new radioButton(config, {
                    label: wilcoxonMannWhitney.t('contingency'),
                    no: "gpbox1",
                    increment: "contingency",
                    value: "exact = FALSE, correct = TRUE",
                    state: "",
                    style: "mb-3",
                    extraction: "ValueAsIs"
                })
            },
            null_hypotesys: {
                el: new inputSpinner(config, {
                    no: 'txtbox2',
                    label: wilcoxonMannWhitney.t('textbox2'),
                    min: -9999999,
                    max: 9999999,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            conf_level: {
                el: new inputSpinner(config, {
                    no: 'txtbox1',
                    label: wilcoxonMannWhitney.t('textbox1'),
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
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content,
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.less.el.content,
            objects.label2.el.content, objects.default.el.content, objects.exact.el.content, objects.normal.el.content, objects.contingency.el.content,
            objects.null_hypotesys.el.content, objects.conf_level.el.content],
            nav: {
                name: wilcoxonMannWhitney.t('navigation'),
                icon: "icon-w1",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: wilcoxonMannWhitney.t('help.title'),
            r_help: "help(data,package='utils')",
            body: wilcoxonMannWhitney.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new wilcoxonMannWhitney().render()
}
