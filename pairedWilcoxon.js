








class pairedWilcoxon extends baseModal {
    static dialogId = 'pairedWilcoxon'
    static t = baseModal.makeT(pairedWilcoxon.dialogId)

    constructor() {
        var config = {
            id: pairedWilcoxon.dialogId,
            label: pairedWilcoxon.t('title'),
            modalType: "two",
            RCode: `
BSky_Median_Difference = data.frame(Median_difference = median({{selected.tvarbox1 | safe}} - {{selected.tvarbox2 | safe}}, na.rm=TRUE))
#Run the test
BSky_Paired_Wilcoxon_Test = wilcox.test({{selected.tvarbox1 | safe}}, {{selected.tvarbox2 | safe}}, alternative='{{selected.gpbox2 | safe}}', conf.int = TRUE, conf.level={{selected.txtbox1 | safe}}, {{selected.gpbox1 | safe}}, mu = {{selected.txtbox2 | safe}}, paired=TRUE)
#Display results in the output
BSkyFormat(BSky_Median_Difference, singleTableOutputHeader='Median Difference')
BSkyFormat(BSky_Paired_Wilcoxon_Test)
#remove(BSky_Median_Difference)
#remove(BSky_Paired_Wilcoxon_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: pairedWilcoxon.t('tvarbox1'),
                    no: "tvarbox1",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "Prefix|UseComma",
                    required: true,
                })
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: pairedWilcoxon.t('tvarbox2'),
                    no: "tvarbox2",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "Prefix|UseComma",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { label: pairedWilcoxon.t('label1'), style: "mt-4", h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: pairedWilcoxon.t('twosided'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: pairedWilcoxon.t('greater'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            less: {
                el: new radioButton(config, {
                    label: pairedWilcoxon.t('less'),
                    no: "gpbox2",
                    increment: "less",
                    value: "less",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label2: { el: new labelVar(config, { label: pairedWilcoxon.t('label2'), style: "mt-4", h: 6 }) },
            default: {
                el: new radioButton(config, {
                    label: pairedWilcoxon.t('default'),
                    no: "gpbox1",
                    increment: "default",
                    value: "exact = NULL, correct = TRUE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            exact: {
                el: new radioButton(config, {
                    label: pairedWilcoxon.t('exact'),
                    no: "gpbox1",
                    increment: "exact",
                    value: "exact = TRUE, correct = FALSE",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            normal: {
                el: new radioButton(config, {
                    label: pairedWilcoxon.t('normal'),
                    no: "gpbox1",
                    increment: "normal",
                    value: "exact = FALSE, correct = FALSE",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            contingency: {
                el: new radioButton(config, {
                    label: pairedWilcoxon.t('contingency'),
                    no: "gpbox1",
                    increment: "contingency",
                    value: "exact = FALSE, correct = TRUE",
                    style: "mb-2", 
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            null_hypotesys: {
                el: new inputSpinner(config, {
                    no: 'txtbox2',
                    label: pairedWilcoxon.t('textbox2'),
                    min: -999999,
                    max: 9999999,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            conf_level: {
                el: new inputSpinner(config, {
                    no: 'txtbox1',
                    label: pairedWilcoxon.t('textbox1'),
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
                name: pairedWilcoxon.t('navigation'),
                icon: "icon-wp",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: pairedWilcoxon.t('help.title'),
            r_help: pairedWilcoxon.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: pairedWilcoxon.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new pairedWilcoxon().render()
}
