/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class andersonDarling extends baseModal {
    static dialogId = 'andersonDarling'
    static t = baseModal.makeT(andersonDarling.dialogId)

    constructor() {
        var config = {
            id: andersonDarling.dialogId,
            label: andersonDarling.t('title'),
            modalType: "two",
            splitProcessing: false,
            RCode: `
#Runs an Anderson-Darling Test for the composite hypothesis of normality for variable: {{selected.varname | safe}}\n
\nBSkyResults <- nortest::ad.test(x={{dataset.name}}\${{selected.varname | safe}})
BSkyFormat( BSkyResults, outputTableIndex = c(tableone=1), outputTableRenames = c("Anderson-Darling Test results for variable: {{selected.varname | safe}}"))
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            trg: {
                el: new dstVariableList(config, {
                    label: andersonDarling.t('trg'),
                    no: "trg",
                    filter: "|Numeric|Scale",
                    extraction: "Prefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.trg.el.content],
            nav: {
                name: andersonDarling.t('navigation'),
                icon: "icon-gaussian-function",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: andersonDarling.t('help.title'),
            r_help: andersonDarling.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: andersonDarling.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        let count =0     
        let temp = ""
        instance.objects.trg.el.getVal().forEach(function (value) {
        //Push code_vars inside 
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: instance.dialog.extractData()
            }      
            code_vars.selected.varname = value
            temp = instance.dialog.renderR(code_vars);
            if (count == 0) {
                res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
            }
            else {
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: instance.config.RCode, code_vars: code_vars })
            }
            count++
        });
						   
        return res
    }
}

module.exports = {
    render: () => new andersonDarling().render()
}

