








class wilcoxonOneSample extends baseModal {
    static dialogId = 'wilcoxonOneSample'
    static t = baseModal.makeT(wilcoxonOneSample.dialogId)

    constructor() {
        var config = {
            id: wilcoxonOneSample.dialogId,
            label: wilcoxonOneSample.t('title'),
            modalType: "two",
            RCode: `
#Wilcoxon Mann Whitney analysis
BSky_Median <- data.frame(Median = median({{dataset.name}}\${{selected.tvarbox1 | safe}}, na.rm=TRUE))
BSky_Wilcoxon_Test = wilcox.test({{dataset.name}}\${{selected.tvarbox1 | safe}}, alternative='{{selected.gpbox2 | safe}}', conf.int = TRUE, conf.level={{selected.txtbox1 | safe}}, {{selected.gpbox1 | safe}}, mu = {{selected.txtbox2 | safe}})
BSkyFormat(BSky_Median, singleTableOutputHeader='Median of {{selected.tvarbox1 | safe}}')
BSkyFormat(BSky_Wilcoxon_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: wilcoxonOneSample.t('tvarbox1'),
                    no: "tvarbox1",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
            label1: { el: new labelVar(config, { label: wilcoxonOneSample.t('label1'), style: "mt-4", h: 6}) },
            twosided: {
                el: new radioButton(config, {
                    label: wilcoxonOneSample.t('twosided'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: wilcoxonOneSample.t('greater'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            less: {
                el: new radioButton(config, {
                    label: wilcoxonOneSample.t('less'),
                    no: "gpbox2",
                    increment: "less",
                    value: "less",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label2: { el: new labelVar(config, { label: wilcoxonOneSample.t('label2'), style: "mt-4", h: 6 }) },
            default: {
                el: new radioButton(config, {
                    label: wilcoxonOneSample.t('default'),
                    no: "gpbox1",
                    increment: "default",
                    value: "exact = NULL, correct = TRUE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            exact: {
                el: new radioButton(config, {
                    label: wilcoxonOneSample.t('exact'),
                    no: "gpbox1",
                    increment: "exact",
                    value: "exact = TRUE, correct = FALSE",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            normal: {
                el: new radioButton(config, {
                    label: wilcoxonOneSample.t('normal'),
                    no: "gpbox1",
                    increment: "normal",
                    value: "exact = FALSE, correct = FALSE",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            contingency: {
                el: new radioButton(config, {
                    label: wilcoxonOneSample.t('contingency'),
                    no: "gpbox1",
                    style: "mb-2",
                    increment: "contingency",
                    value: "exact = FALSE, correct = TRUE",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            null_hypotesys: {
                el: new inputSpinner(config, {
                    no: 'txtbox2',
                    label: wilcoxonOneSample.t('textbox2'),
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
                    label: wilcoxonOneSample.t('textbox1'),
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
            right: [objects.tvarbox1.el.content, 
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.less.el.content,
            objects.label2.el.content, objects.default.el.content, objects.exact.el.content, objects.normal.el.content, objects.contingency.el.content,
            objects.null_hypotesys.el.content, objects.conf_level.el.content],
            nav: {
                name: wilcoxonOneSample.t('navigation'),
                icon: "icon-w1",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: wilcoxonOneSample.t('help.title'),
            r_help: wilcoxonOneSample.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: wilcoxonOneSample.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new wilcoxonOneSample().render()
}
