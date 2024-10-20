
class polychoricPolyserialCorrelations extends baseModal {
    static dialogId = 'polychoricPolyserialCorrelations'
    static t = baseModal.makeT(polychoricPolyserialCorrelations.dialogId)

    constructor() {
        var config = {
            id: polychoricPolyserialCorrelations.dialogId,
            label: polychoricPolyserialCorrelations.t('title'),
            splitProcessing: false,
            modalType: "two",
            RCode: `
{{if (options.selected.gpbox1 == "FALSE")}}
require(polycor);
#The function polychor returns an object of class polycor or numeric, the function BSkyFormatPolycor handles the formatting of both polycor and numerics so that they display nicely
polycor::polychor(x={{dataset.name}}\${{selected.Target | safe}}, y={{dataset.name}}\${{selected.Target2 | safe}}, ML={{selected.gpbox2 | safe}}, 
    std.err={{selected.Missvals | safe}}, maxcor={{selected.conflevel | safe}},
    {{if (options.selected.Seed != "")}}start={{selected.Seed | safe}},{{/if}}
     thresholds={{selected.showEffectSizes | safe}}) %>% BSkyFormatPolycor(tableHeader = "{{selected.Target | safe}},{{selected.Target2 | safe}}", typeofcorrelation = "Polychoric correlation" ) %>% BSkyFormat()
{{#else}}
#The function polyserial returns an object of class polycor or numeric, the function BSkyFormatPolycor handles the formatting of both polycor and numerics so that they display nicely
polycor::polyserial(x={{dataset.name}}\${{selected.Target | safe}}, y={{dataset.name}}\${{selected.Target2 | safe}}, ML={{selected.gpbox2 | safe}}, 
    std.err={{selected.Missvals | safe}}, maxcor={{selected.conflevel | safe}}, bins = {{selected.bins | safe}},
    {{if (options.selected.Seed != "")}}start={{selected.Seed | safe}},{{/if}}
     thresholds={{selected.showEffectSizes | safe}}) %>% BSkyFormatPolycor(tableHeader = "{{selected.Target | safe}},{{selected.Target2 | safe}}", typeofcorrelation = "Polyserial correlation") %>% BSkyFormat()
{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            Target: {
                el: new dstVariableList(config, {
                    label: polychoricPolyserialCorrelations.t('Target'),
                    no: "Target",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
            Target2: {
                el: new dstVariable(config, {
                    label: polychoricPolyserialCorrelations.t('Target2'),
                    no: "Target2",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                })
            },
			
			
			correlationType: { el: new labelVar(config, { label: polychoricPolyserialCorrelations.t('correlationType'), h: 6 }) },
            Polychoric: {
                el: new radioButton(config, {
                    label: polychoricPolyserialCorrelations.t('Polychoric'),
                    no: "gpbox1",
                    increment: "Polychoric",
                    value: "FALSE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            Polyserial: {
                el: new radioButton(config, {
                    label: polychoricPolyserialCorrelations.t('Polyserial'),
                    no: "gpbox1",
                    increment: "Polyserial",
                    value: "TRUE",
                    style: "mb:3",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },			
            label1: { el: new labelVar(config, { label: polychoricPolyserialCorrelations.t('label1'), h: 6 }) },
            label2: { el: new labelVar(config, { label: polychoricPolyserialCorrelations.t('header'), h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: polychoricPolyserialCorrelations.t('test1'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "FALSE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: polychoricPolyserialCorrelations.t('test2'),
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
                    label: polychoricPolyserialCorrelations.t('Missvals'),
                    no: "Missvals",
                    newline: true,
                    extraction: "Boolean",
                })
            },
            conf_level: {
                el: new inputSpinner(config, {
                    no: 'conflevel',
                    label: polychoricPolyserialCorrelations.t('conflevel'),
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
                    label: polychoricPolyserialCorrelations.t('Seed'),
                    extraction: "TextAsIs",
                }),
            },
            showEffectSizes: {
                el: new checkbox(config, {
                    label: polychoricPolyserialCorrelations.t('showEffectSizes'),
                    no: "showEffectSizes",
                    style: "mt-3",
                    newline: true,
                    extraction: "Boolean",
                })
            },
			
			  bins: {
                el: new inputSpinner(config, {
                    no: 'bins',
                    label: polychoricPolyserialCorrelations.t('bins'),
                    min: 0,
                    max: 9999,
                    step: 1,
                    value: 4,
                    extraction: "NoPrefix|UseComma"
                })
            }
			
        }
        var MissingVals = {
            el: new optionsVar(config, {
                no: "MissingVals",
                name: "Advanced",
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
            right: [objects.Target.el.content, objects.Target2.el.content, objects.correlationType.el.content, objects.Polychoric.el.content, objects.Polyserial.el.content,
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.Missvals.el.content, objects.bins.el.content],
            bottom: [MissingVals.el.content],
            nav: {
                name: polychoricPolyserialCorrelations.t('navigation'),
                icon: "icon-rank",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: polychoricPolyserialCorrelations.t('help.title'),
            r_help: "help(data,package='utils')",
            body: polychoricPolyserialCorrelations.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        var temp = ""
        let count =0
        instance.objects.Target.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
                },
                selected: instance.dialog.extractData()
            }
            code_vars.selected.Target = value;
            temp =instance.dialog.renderR(code_vars)
            //let cmd = instance.dialog.renderR(code_vars)
            //cmd = removenewline(cmd);
            // temp = temp + cmd + "\n";
            if (count == 0) {
                res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
            }
            else {
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: instance.config.RCode, code_vars: code_vars })
            }
            count++


        })
        //res.push({ cmd: temp, cgid: newCommandGroup() })
        return res;
    }
}

module.exports = {
    render: () => new polychoricPolyserialCorrelations().render()
}
