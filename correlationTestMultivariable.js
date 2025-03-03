/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class correlationTestMultivariable extends baseModal {
    static dialogId = 'correlationTestMultivariable'
    static t = baseModal.makeT(correlationTestMultivariable.dialogId)

    constructor() {
        var config = {
            id: correlationTestMultivariable.dialogId,
            label: correlationTestMultivariable.t('title'),
            modalType: "two",
            RCode: `
require(stats);
require(RcmdrMisc);
require(corrplot);
require(DescTools); 
require(dplyr); 
{{if(options.selected.displayErrorMessage)}}cat("WARNING: More than 2 variables need to be selected for the webplot to display")\n{{/if}}
{{dataset.name}} %>%
dplyr::select({{selected.tvarbox1 | safe}}) %T>%
    BSkyPlotCorrelationMatrix( correlationType = "{{selected.gpbox2 | safe}}",
        visualizeCorrelation = {{selected.visualizeCorrelation | safe}}, 
        plotWeb = {{selected.plotweb | safe}}) %>%
    BSkyCorrelationMatrix(
        correlationType = "{{selected.gpbox2 | safe}}",
        missingValues = "{{selected.gpbox1 | safe}}",
        pValue = "{{selected.gpbox3 | safe}}" ) %>%
            BSkyFormat()            
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox: {
                el: new dstVariableList(config, {
                    label: correlationTestMultivariable.t('tvarbox'),
                    required: true,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma"
                })
            },
            lable1: { el: new labelVar(config, { label: correlationTestMultivariable.t('lable1'), h: 6 , style:"mt-3"}) },
            radio_pearson: { el: new radioButton(config, { label: correlationTestMultivariable.t('radio_pearson'), no: "gpbox2", increment: "pearson", value: "Pearson", state: "checked", extraction: "ValueAsIs" }) },
            radio_spearman: { el: new radioButton(config, { label: correlationTestMultivariable.t('radio_spearman'), no: "gpbox2", increment: "spearman", value: "Spearman", state: "", extraction: "ValueAsIs" }) },
            lable2: { el: new labelVar(config, { label: correlationTestMultivariable.t('lable2'), h: 6, style:"mt-3" }) },
            radio_cc: { el: new radioButton(config, { label: correlationTestMultivariable.t('radio_cc'), no: "gpbox1", increment: "completeCases", value: "complete.obs", state: "checked", extraction: "ValueAsIs" }) },
            radio_pairwise: { el: new radioButton(config, { label: correlationTestMultivariable.t('radio_pairwise'), no: "gpbox1", increment: "pairwiseComplete", value: "pairwise.complete.obs", state: "", extraction: "ValueAsIs" }) },
            lable3: { el: new labelVar(config, { label: correlationTestMultivariable.t('lable3'), h: 6, style:"mt-3" }) },
            ajp: { el: new radioButton(config, { label: correlationTestMultivariable.t('ajp'), no: "gpbox3", increment: "adjP", value: "adjP", state: "checked", extraction: "ValueAsIs" }) },
            unajp: { el: new radioButton(config, { label: correlationTestMultivariable.t('unajp'), no: "gpbox3", increment: "unAdjP", value: "unAdjP", state: "", extraction: "ValueAsIs" }) },
            bothp: { el: new radioButton(config, { label: correlationTestMultivariable.t('bothp'), no: "gpbox3", increment: "bothP", value: "bothP", state: "", extraction: "ValueAsIs" }) },
            vis_cor: { el: new checkbox(config, { label: correlationTestMultivariable.t('vis_cor'), no: "visualizeCorrelation", extraction: "Boolean", style:"mt-3" }) },
            vis_plot: { el: new checkbox(config, { label: correlationTestMultivariable.t('vis_plot'), no: "plotweb", newline: true, extraction: "Boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox.el.content, objects.lable1.el.content, objects.radio_pearson.el.content, objects.radio_spearman.el.content,
            objects.lable2.el.content, objects.radio_cc.el.content, objects.radio_pairwise.el.content,
            objects.lable3.el.content, objects.ajp.el.content, objects.unajp.el.content, objects.bothp.el.content,
            objects.vis_cor.el.content, objects.vis_plot.el.content
            ],
            nav: {
                name: correlationTestMultivariable.t('navigation'),
                icon: "icon-link",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: correlationTestMultivariable.t('help.title'),
            r_help: correlationTestMultivariable.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: correlationTestMultivariable.t('help.body')
        }
;
    }

    prepareExecution(instance) {
        var res = [];
        let temp = ""
        let displayErrorMessage =""
        if (instance.objects.tvarbox.el.getVal().length ==2)
        {
            displayErrorMessage =true
        }
        var code_vars = {
            dataset: {
                name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
            },
            selected: instance.dialog.extractData()
        }
        code_vars.selected.displayErrorMessage=false
        if (displayErrorMessage == true && code_vars.selected.plotweb =='TRUE')
        {
            code_vars.selected.plotweb ='FALSE'
            code_vars.selected.displayErrorMessage=displayErrorMessage
        }
        temp = temp + instance.dialog.renderR(code_vars);
        const cmd = temp
        res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`,`${instance.config.label}`), oriR :instance.config.RCode, code_vars : code_vars })
        return res;
    }
}

module.exports = {
    render: () => new correlationTestMultivariable().render()
}
