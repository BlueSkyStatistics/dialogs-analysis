
class crossTabMultiWay extends baseModal {
    static dialogId = 'crossTabMultiWay'
    static t = baseModal.makeT(crossTabMultiWay.dialogId)

    constructor() {
        var config = {
            id: crossTabMultiWay.dialogId,
            label: crossTabMultiWay.t('title'),
            modalType: "two",
            splitProcessing: false,
            RCode: `#Create the crosstab
{{each(options.selected.row)}}
{{dataset.name}} %>%
dplyr::select({{@this}}, {{selected.col | safe}}, {{selected.layer | safe}} ) %>%
    BSkyCrossTable(
            chisq = {{selected.chisq | safe}},
            chisqCorrect = {{if (options.selected.gpbox1 =="chisqContCorrection")}}TRUE{{#else}}FALSE{{/if}},
            chisqSimulate = {{if (options.selected.gpbox1 =="chisqSimulatePValues")}}TRUE{{#else}}FALSE{{/if}},
            chisqNoOfSimulations = {{selected.chisqNoOfReplicates | safe}},
            fisher = {{selected.fisher | safe}},
            fisherSimulate = {{selected.fisherSimulatePValues | safe}},
            fisherNoOfSimulations = {{selected.fisherNoOfReplicates | safe}},
            fisherAlternate = "{{selected.fishersAlternative | safe}}",
            mcnemar={{selected.mcnemar | safe}}, 
            mcnemarCorrect={{selected.mcnemarContCorrection | safe}}, 
            prop.r={{selected.rowpercent | safe}}, 
            prop.c={{selected.colpercent | safe}},
            resid={{selected.unstandardized | safe}}, 
            sresid={{selected.standardized | safe}}, 
            asresid={{selected.adjusted | safe}},
            expected={{selected.expected | safe}}, 
            long_table = {{selected.longTbl | safe}},
            {{selected.weight | safe}}
            datasetname='{{dataset.name}}') %>%
                BSkyFormat()   
{{/each}}               
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move", scroll: true }) },
            label6: { el: new labelVar(config, { no: "label6", label: crossTabMultiWay.t('label6'), h: 5 }) },
            row: {
                el: new dstVariableList(config, {
                    label: crossTabMultiWay.t('rowlabel'),
                    no: "row",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true
                })
            },
            column: {
                el: new dstVariableList(config, {
                    label: crossTabMultiWay.t('collabel'),
                    no: "column",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true
                })
            },
            layer: {
                el: new dstVariableList(config, {
                    label: crossTabMultiWay.t('layerlabel'),
                    no: "layer",
                    filter: "Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    //wrapped: 'layers=c(%val%),\n',
                })
            },
            weight: {
                el: new dstVariable(config, {
                    label: crossTabMultiWay.t('weightlabel'),
                    no: "weight",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    wrapped: 'weight=c(%val%),\n'
                })
            },
            label1: { el: new labelVar(config, { no: "label1", label: crossTabMultiWay.t('label1'), h: 5 }) },
            chisq: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('chisqlabel'),
                    style: "mt-2",
                    no: "chisq",
                    extraction: "Boolean",
                })
            },
            chisqNoContCorrection: {
                el: new radioButton(config, {
                    label: crossTabMultiWay.t('chisqNoContCorrection'),
                    style: "ml-2",
                    //   dependant_objects: ['chisq'],
                    increment: "chisqNoContCorrection",
                    no: "gpbox1",
                    value: "chisqNoContCorrection",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            chisqContCorrection: {
                el: new radioButton(config, {
                    label: crossTabMultiWay.t('chisqContCorrection'),
                    style: "ml-2",
                    //  dependant_objects: ['chisq'],
                    increment: "chisqContCorrection",
                    value: "chisqContCorrection",
                    no: "gpbox1",
                    extraction: "ValueAsIs"
                })
            },
            chisqSimulatePValues: {
                el: new radioButton(config, {
                    label: crossTabMultiWay.t('chisqSimulatePValues'),
                    increment: "chisqSimulatePValues",
                    style: "ml-2",
                    //  dependant_objects: ['chisq'],
                    extraction: "ValueAsIs",
                    no: "gpbox1",
                    value: "chisqSimulatePValues",
                })
            },
            chisqNoOfReplicates: {
                el: new inputSpinner(config, {
                    no: 'chisqNoOfReplicates',
                    label: crossTabMultiWay.t('chisqNoOfReplicates'),
                    min: 0,
                    style: "ml-4",
                    max: 999999999999999,
                    step: 1000,
                    value: 2000,
                    extraction: "NoPrefix|UseComma"
                })
            },
            mcnemar: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('mcnemar'),
                    no: "mcnemar",
                    style: "mt-4",
                    extraction: "Boolean",
                })
            },
            mcnemarContCorrection: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('mcnemarContCorrection'),
                    style: "ml-2",
                    // dependant_objects: ['mcnemar'],
                    newline: true,
                    no: "mcnemarContCorrection",
                    extraction: "Boolean",
                })
            },
            fisher: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('fisher'),
                    no: "fisher",
                    style: "mt-4",
                    newline: true,
                    extraction: "Boolean",
                })
            },
            fisherSimulatePValues: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('fisherSimulatePValues'),
                    style: "ml-2",
                    newline: true,
                    no: "fisherSimulatePValues",
                    extraction: "Boolean",
                })
            },
            fisherNoOfReplicates: {
                el: new inputSpinner(config, {
                    no: 'fisherNoOfReplicates',
                    label: crossTabMultiWay.t('fisherNoOfReplicates'),
                    min: 0,
                    style: "ml-4",
                    max: 999999999999999,
                    step: 1000,
                    value: 2000,
                    extraction: "NoPrefix|UseComma"
                })
            },
            fishersAlternative: {
                el: new comboBox(config, {
                    no: "fishersAlternative",
                    label: crossTabMultiWay.t('fishersAlternative'),
                    multiple: false,
                    style: "ml-2",
                    extraction: "NoPrefix|UseComma",
                    options: ["two.sided", "greater", "less"],
                    default: "two.sided"
                })
            },
            label2: { el: new labelVar(config, { no: "label2", label: crossTabMultiWay.t('label2'), h: 5 }) },
            unstandardized: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('unstandardized'),
                    no: "unstandardized",
                    extraction: "Boolean",
                })
            },
            standardized: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('standardized'),
                    no: "standardized",
                    extraction: "Boolean",
                })
            },
            adjusted: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('adjusted'),
                    no: "adjusted",
                    extraction: "Boolean",
                })
            },
            label3: { el: new labelVar(config, { no: "label3", label: crossTabMultiWay.t('label3'), h: 5 }) },
            rowpercent: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('rowpercent'),
                    no: "rowpercent",
                    extraction: "Boolean",
                })
            },
            colpercent: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('colpercent'),
                    no: "colpercent",
                    extraction: "Boolean",
                })
            },
            label4: { el: new labelVar(config, { no: "label4", label: crossTabMultiWay.t('label4'), h: 5 }) },
            expected: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('expected'),
                    no: "expected",
                    extraction: "Boolean",
                })
            },
            label5: { el: new labelVar(config, { no: "label5", label: crossTabMultiWay.t('label5'), h: 5 }) },
            longTbl: {
                el: new checkbox(config, {
                    label: crossTabMultiWay.t('longTbl'),
                    no: "longTbl",
                    extraction: "Boolean",
                })
            },
        };
        var advoptions = {
            el: new optionsVar(config, {
                no: "barchart_options",
                //name: "Options",
                content: [
                    objects.label1.el,
                    objects.chisq.el,
                    objects.chisqNoContCorrection.el,
                    objects.chisqContCorrection.el,
                    objects.chisqSimulatePValues.el,
                    objects.chisqNoOfReplicates.el,
                    objects.mcnemar.el,
                    objects.mcnemarContCorrection.el,
                    objects.fisher.el,
                    objects.fisherSimulatePValues.el,
                    objects.fisherNoOfReplicates.el,
                    objects.fishersAlternative.el,
                    objects.label2.el,
                    objects.unstandardized.el,
                    objects.standardized.el,
                    objects.adjusted.el,
                    objects.label3.el,
                    objects.rowpercent.el,
                    objects.colpercent.el,
                    objects.label4.el,
                    objects.expected.el,
                    objects.label5.el,
                    objects.longTbl.el
                ]
            })
        };
        const content = {
            head: [objects.label6.el.content],
            left: [objects.content_var.el.content],
            right: [objects.row.el.content, objects.column.el.content, objects.layer.el.content, objects.weight.el.content],
            bottom: [advoptions.el.content],
            nav: {
                name: crossTabMultiWay.t('navigation'),
                icon: "icon-crosstab",
                modal: config.id,
                datasetRequired: true
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: crossTabMultiWay.t('help.title'),
            r_help: "help(data,package='utils')",
            body: crossTabMultiWay.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        let temp = ""
        let count =0
        instance.objects.column.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
                },
                selected: instance.dialog.extractData()
            }
            code_vars.selected.row = code_vars.selected.row.split(",");
            code_vars.selected.col = value
            temp = instance.dialog.renderR(code_vars);
            if (count == 0) {
                res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
            }
            else {
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: instance.config.RCode, code_vars: code_vars })
            }
            count++
        })
        return res;
    }
}

module.exports = {
    render: () => new crossTabMultiWay().render()
}
