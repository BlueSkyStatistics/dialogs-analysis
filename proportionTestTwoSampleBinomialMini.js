/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class proportionTestTwoSampleBinomialMini extends baseModal {
    static dialogId = 'proportionTestTwoSampleBinomialMini'
    static t = baseModal.makeT(proportionTestTwoSampleBinomialMini.dialogId)

    constructor() {
        var config = {
            id: proportionTestTwoSampleBinomialMini.dialogId,
            label: proportionTestTwoSampleBinomialMini.t('title'),
            modalType: "two",
            RCode: `
{{if (options.selected.gpbox1 =="dataInCols")}}
{{if (options.selected.tvarbox1 =="" || options.selected.tvarbox2 =="")}}
    cat("You need to drag and drop variables to the list boxes with labels numeric of factor with 2 levels/values only and numeric or factor with 2 levels/values only")
{{#else}}
twoPropTestBothSamplesSingleColMini( dataset ="{{dataset.name}}", col1_name ="{{ selected.tvarbox1 | safe}}", col2_name= "{{ selected.tvarbox2 | safe}}",
    p={{selected.txtbox2 | safe}}, alternate="{{selected.gpbox2 | safe}}", conf.level={{selected.txtbox1 | safe}}, testMethod ="{{selected.method | safe}}")
{{/if}}
{{/if}}
{{if (options.selected.gpbox1 =="dataInOneCols")}}
{{if (options.selected.tvarbox3 =="" || options.selected.tvarbox4 =="")}}
    cat("You need to drag and drop variables to the list boxes with labels numeric label and factor variable with 2 levels/values only")
{{#else}}
BSkyTwoPropTestSingleColMini( dataset ="{{dataset.name}}", col1_name ="{{ selected.tvarbox3 | safe}}", col2_name= "{{ selected.tvarbox4 | safe}}",
    p={{selected.txtbox2 | safe}}, alternate="{{selected.gpbox2 | safe}}", conf.level={{selected.txtbox1 | safe}}, testMethod ="{{selected.method | safe}}")
{{/if}}
{{/if}}
{{if (options.selected.gpbox1 =="summarized")}}
BSky2SampleProportionMT( x1={{selected.noOfEvents | safe}}, x2={{selected.noOfEvents2 | safe}},
    n1={{selected. noOfTrials | safe}}, n2={{selected. noOfTrials2 | safe}}, p={{selected.txtbox2 | safe}}, 
    alternate="{{selected.gpbox2 | safe}}", conf.level={{selected.txtbox1 | safe}}, testMethod ="{{selected.method | safe}}")
{{/if}}


`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            dataInCols: {
                el: new radioButton(config, {
                  label: proportionTestTwoSampleBinomialMini.t('dataInCols'),
                  no: "gpbox1",
                  increment: "dataInCols",
                  value: "dataInCols",
                  state: "checked",
                  extraction: "ValueAsIs"
                })
              },  
              dataInOneCols: {
                el: new radioButton(config, {
                  label: proportionTestTwoSampleBinomialMini.t('dataInOneCols'),
                  no: "gpbox1",
                  increment: "dataInOneCols",
                  dependant_objects: ["tvarbox3", "tvarbox4"],
                  required:true,
                  value: "dataInOneCols",
                  state: "",
                  extraction: "ValueAsIs"
                })
              },     
              
              summarized: {
                el: new radioButton(config, {
                  label: proportionTestTwoSampleBinomialMini.t('summarized'),
                  no: "gpbox1",
                  increment: "summarized",
                  dependant_objects: ["noOfEvents", "noOfTrials","noOfEvents2", "noOfTrials2"],
                  value: "summarized",
                  required: true,
                  state: "",
                  extraction: "ValueAsIs"
                })
              },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: proportionTestTwoSampleBinomialMini.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                  
                })
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: proportionTestTwoSampleBinomialMini.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",    
                })
            },
            tvarbox3: {
                el: new dstVariable(config, {
                    label: proportionTestTwoSampleBinomialMini.t('tvarbox3'),
                    no: "tvarbox3",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                  
                })
            },
            tvarbox4: {
                el: new dstVariable(config, {
                    label: proportionTestTwoSampleBinomialMini.t('tvarbox4'),
                    no: "tvarbox4",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",    
                })
            },
            label2: {
                el: new labelVar(config, {
                  label: proportionTestTwoSampleBinomialMini.t('label2'), 
                  style: "mt-3", 
                  h:5
                })
              },
            noOfEvents: {
                el: new input(config, {
                    no: 'noOfEvents',
                    label: proportionTestTwoSampleBinomialMini.t('noOfEvents'),
                    placeholder: "",
                    allow_spaces:true,
                    enabled:false,
                    width: "w-25",
                    ml:4,
                    type: "numeric",
                    extraction: "TextAsIs",
                    value: "",
                })
            },
            noOfTrials: {
                el: new input(config, {
                    no: 'noOfTrials',
                    label: proportionTestTwoSampleBinomialMini.t('noOfTrials'),
                    placeholder: "",
                    ml:4,
                    enabled:false,
                    allow_spaces:true,
                    width: "w-25",
                    type: "numeric",
                    extraction: "TextAsIs",
                    value: "",
                })
            },
            label3: {
                el: new labelVar(config, {
                  label: proportionTestTwoSampleBinomialMini.t('label3'), 
                  style: "mt-3", 
                  h:5
                })
              },
            noOfEvents2: {
                el: new input(config, {
                    no: 'noOfEvents2',
                    label: proportionTestTwoSampleBinomialMini.t('noOfEvents2'),
                    placeholder: "",
                    allow_spaces:true,
                    enabled:false,
                    width: "w-25",
                    ml:4,
                    type: "numeric",
                    extraction: "TextAsIs",
                    value: "",
                })
            },
            noOfTrials2: {
                el: new input(config, {
                    no: 'noOfTrials2',
                    label: proportionTestTwoSampleBinomialMini.t('noOfTrials2'),
                    placeholder: "",
                    ml:4,
                    enabled:false,
                    allow_spaces:true,
                    width: "w-25",
                    type: "numeric",
                    extraction: "TextAsIs",
                    value: "",
                })
            },
            label1: { el: new labelVar(config, { label: proportionTestTwoSampleBinomialMini.t('label1'), style: "mt-3",h: 6 }) },
            test1: {
                el: new radioButton(config, {
                    label: proportionTestTwoSampleBinomialMini.t('test1'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            test2: {
                el: new radioButton(config, {
                    label: proportionTestTwoSampleBinomialMini.t('test2'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            test3: {
                el: new radioButton(config, {
                    label: proportionTestTwoSampleBinomialMini.t('test3'),
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
                    label: proportionTestTwoSampleBinomialMini.t('txtbox1'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            txtbox2: {
                el: new inputSpinner(config, {
                    no: 'txtbox2',
                    label: proportionTestTwoSampleBinomialMini.t('txtbox2'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            chkbox1: { el: new checkbox(config, { label: proportionTestTwoSampleBinomialMini.t('chkbox1'), no: "chkbox1", extraction: "Boolean" }) },
            method: {
                el: new comboBox(config, {
                  no: "method",
                  label: proportionTestTwoSampleBinomialMini.t('method'),
                  multiple: false,
                  extraction: "NoPrefix|UseComma",
                  options: ["Estimate proportions separately", "Use pooled estimate of the proportion"],
                  default: "Estimate proportions separately"
                })
              },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.dataInCols.el.content, objects.tvarbox1.el.content,objects.tvarbox2.el.content, objects.dataInOneCols.el.content, objects.tvarbox3.el.content,objects.tvarbox4.el.content,objects.summarized.el.content,objects.label2.el.content,objects.noOfEvents.el.content,objects.noOfTrials.el.content,objects.label3.el.content,objects.noOfEvents2.el.content,objects.noOfTrials2.el.content,objects.label1.el.content,
            objects.test1.el.content, objects.test2.el.content, objects.test3.el.content,
            //objects.txtbox1.el.content, objects.txtbox2.el.content, objects.chkbox1.el.content],
            objects.txtbox1.el.content, objects.txtbox2.el.content, objects.method.el.content],
            nav: {
                name: proportionTestTwoSampleBinomialMini.t('navigation'),
                icon: "icon-p1",
                modal: config.id,
                datasetRequired:false
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: proportionTestTwoSampleBinomialMini.t('help.title'),
            r_help: proportionTestTwoSampleBinomialMini.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: proportionTestTwoSampleBinomialMini.t('help.body')
        }
;
    }

}

module.exports = {
    render: () => new proportionTestTwoSampleBinomialMini().render()
}
