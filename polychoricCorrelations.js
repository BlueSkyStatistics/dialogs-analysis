
class polychoricCorrelations extends baseModal {
    static dialogId = 'polychoricCorrelations'
    static t = baseModal.makeT(polychoricCorrelations.dialogId)

    constructor() {
        var config = {
            id: polychoricCorrelations.dialogId,
            label: polychoricCorrelations.t('title'),
            splitProcessing: false,
            modalType: "two",
            RCode: `
require(polycor);
#The function polychor returns an object of class polycor or numeric, the function handles the formatting of both polycor and numerics so that they display nicely
polycor::polychor(x={{dataset.name}}\${{selected.Target | safe}}, y={{dataset.name}}\${{selected.Target2 | safe}}, ML={{selected.gpbox2 | safe}}, 
    std.err={{selected.Missvals | safe}}, maxcor={{selected.conflevel | safe}},
    {{if (options.selected.Seed != "")}}start={{selected.Seed | safe}},{{/if}}
     thresholds={{selected.showEffectSizes | safe}}) %>% BSkyFormatPolycor(tableHeader = "{{selected.Target | safe}},{{selected.Target2 | safe}}") %>% BSkyFormat()
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            Target: {
                el: new dstVariableList(config, {
                    label: polychoricCorrelations.t('Target'),
                    no: "Target",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
            Target2: {
                el: new dstVariable(config, {
                    label: polychoricCorrelations.t('Target2'),
                    no: "Target2",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
            label1: { el: new labelVar(config, { label: polychoricCorrelations.t('label1'), h: 6 }) },
            label2: { el: new labelVar(config, { label: polychoricCorrelations.t('header'), h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: polychoricCorrelations.t('test1'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "FALSE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: polychoricCorrelations.t('test2'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "TRUE",
                    style: "mb:3",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            Missvals: {
                el: new checkbox(config, {
                    label: polychoricCorrelations.t('Missvals'),
                    no: "Missvals",
                    newline: true,
                    extraction: "Boolean",
                })
            },
            conf_level: {
                el: new inputSpinner(config, {
                    no: 'conflevel',
                    label: polychoricCorrelations.t('conflevel'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.99,
                    extraction: "NoPrefix|UseComma"
                })
            },
            Seed: {
                el: new input(config, {
                    no: 'Seed',
                    allow_spaces: true,
                    label: polychoricCorrelations.t('Seed'),
                    extraction: "TextAsIs",
                }),
            },
            showEffectSizes: {
                el: new checkbox(config, {
                    label: polychoricCorrelations.t('showEffectSizes'),
                    no: "showEffectSizes",
                    style: "mt-3",
                    newline: true,
                    extraction: "Boolean",
                })
            },
        }
        var MissingVals = {
            el: new optionsVar(config, {
                no: "MissingVals",
                name: polychoricCorrelations.t('advanced_lbl'),
                content: [
                    objects.conf_level.el,
                    objects.Seed.el,
                    objects.showEffectSizes.el,
                ]
            })
        };
        const content = {
            head: [objects.label2.el.content],
            left: [objects.content_var.el.content],
            right: [objects.Target.el.content, objects.Target2.el.content,
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.Missvals.el.content],
            bottom: [MissingVals.el.content],
            nav: {
                name: polychoricCorrelations.t('navigation'),
                icon: "icon-rank",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: polychoricCorrelations.t('help.title'),
            r_help: polychoricCorrelations.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: polychoricCorrelations.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        var temp = ""
        instance.objects.Target.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
                },
                selected: instance.dialog.extractData()
            }
            code_vars.selected.Target = value;
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd + "\n";
        })
        res.push({ cmd: temp, cgid: newCommandGroup() })
        return res;
    }
}

module.exports = {
    render: () => new polychoricCorrelations().render()
}
