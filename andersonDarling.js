/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "Anderson-Darling Test of Normality",
        navigation: "Anderson-Darling Normality Test",
        trg: "Target variables",
        help: {
            title: "Anderson-Darling Test of Normality",
            r_help: "help(ad.test, package=nortest)",
            body: `
<b>Description</b></br>
Anderson-Darling test for normality. 
<br/>
<b>Usage</b>
<br/>
<code>
ad.test(x)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: a numeric vector of data values, the number of which must be greater than 7. Missing values are allowed.
</li>
</ul>
<b>Details</b></br>
The Anderson-Darling test is an EDF omnibus test for the composite hypothesis of normality.<br/>
<b>Value</b><br/>
A list with class “htest” containing the following components:<br/>
<ul>
<li>
statistic: the value of the Anderson-Darling statistic.
</li>
<li>
p.value: P value of the test.
</li>
</ul>
<b>Package</b></br>
nortest</br>
<b>Help</b></br>
help(ad.test, package =nortest)
`}
    }
}
class andersonDarling extends baseModal {
    constructor() {
        var config = {
            id: "andersonDarling",
            label: localization.en.title,
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
                    label: localization.en.trg,
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
                name: localization.en.navigation,
                icon: "icon-gaussian-function",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
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
module.exports.item = new andersonDarling().render()
