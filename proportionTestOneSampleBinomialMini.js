









class proportionTestOneSampleBinomialMini extends baseModal {
    static dialogId = 'proportionTestOneSampleBinomialMini'
    static t = baseModal.makeT(proportionTestOneSampleBinomialMini.dialogId)

    constructor() {
        var config = {
            id: proportionTestOneSampleBinomialMini.dialogId,
            label: proportionTestOneSampleBinomialMini.t('title'),
            modalType: "two",
            RCode: `
{{if (options.selected.gpbox1 =="dataInCols")}}
{{if (options.selected.tvarbox1.length ==0)}}
cat("Error: You need to select one or more variables to compute the proportion test or select the option for summarized data")
{{#else}}
{{each(options.selected.tvarbox1)}}
BSky_Factor_Variable_Count_Table = xtabs( ~{{@this}} , data= {{dataset.name}})
BSkyFormat(BSky_Factor_Variable_Count_Table, singleTableOutputHeader="Counts for variable: {{@this}}")
{{if(options.selected.method == "Exact")}}

BSky_most_frequent_value <- names(BSky_Factor_Variable_Count_Table)[which.max(BSky_Factor_Variable_Count_Table)]
BSky_eventString = base::paste("Event: ", "{{@this}}", " = ", BSky_most_frequent_value, "                             ",sep ="" )
BSky_proportionString = base::paste( "p: proportion where ", "{{@this}}", " =", BSky_most_frequent_value)
BSky_differenceString = "Exact method is used in the analysis"
BSky_testMethodMatrix = base::matrix(c(BSky_eventString, BSky_proportionString, BSky_differenceString), nrow = 3, ncol = 1)
base::colnames(BSky_testMethodMatrix) ="Test details"
BSkyFormat(BSky_testMethodMatrix)

BSky_Single_Sample_Proportion_Test = stats::binom.test( x =max(BSky_Factor_Variable_Count_Table), n =base::sum(BSky_Factor_Variable_Count_Table) , alternative='{{selected.gpbox2 | safe}}', p={{selected.txtbox2 | safe}}, conf.level={{selected.txtbox1 | safe}})
attr(BSky_Single_Sample_Proportion_Test$estimate, "names") <-"Sample p"
BSkyFormat(BSky_Single_Sample_Proportion_Test,  outputTableRenames = c("1-sample proportional test for variable: {{@this}}", ".", "."), outputColumnRenames = c(tableone = c(".",".",".","Sample p",".",".")),repeatAllTableFooter ="hypothesized proportion={{selected.txtbox2 | safe}}, CI={{selected.txtbox1 | safe}}")
if (exists('BSky_Factor_Variable_Count_Table')){rm(BSky_Factor_Variable_Count_Table)}
if (exists('BSky_Single_Sample_Proportion_Test')){rm(BSky_Single_Sample_Proportion_Test)}

{{#else}}
BSky_most_frequent_value <- names(BSky_Factor_Variable_Count_Table)[which.max(BSky_Factor_Variable_Count_Table)]
BSky_eventString = base::paste("Event: ", "{{@this}}", " = ", BSky_most_frequent_value, "                             ",sep ="" )
BSky_proportionString = base::paste( "p: proportion where ", "{{@this}}", " =", BSky_most_frequent_value)
BSky_differenceString = "Normal approximation used in the analysis"
BSky_testMethodMatrix = base::matrix(c(BSky_eventString, BSky_proportionString, BSky_differenceString), nrow = 3, ncol = 1)
base::colnames(BSky_testMethodMatrix) ="Test details"
BSkyFormat(BSky_testMethodMatrix)
BSky_Single_Sample_Proportion_Test = BSkyNormalApprox( x =max(BSky_Factor_Variable_Count_Table), n =base::sum(BSky_Factor_Variable_Count_Table) , alternative='{{selected.gpbox2 | safe}}', p={{selected.txtbox2 | safe}}, conf.level={{selected.txtbox1 | safe}})
BSkyFormat(BSky_Single_Sample_Proportion_Test[[1]],  outputTableRenames = c("1-sample proportional test for variable: {{@this}}", "1-sample proportional test for variable: {{@this}}", "."), repeatAllTableFooter ="hypothesized proportion={{selected.txtbox2 | safe}}, CI={{selected.txtbox1 | safe}}")
BSkyFormat(BSky_Single_Sample_Proportion_Test[[2]])
if (exists('BSky_Factor_Variable_Count_Table')){rm(BSky_Factor_Variable_Count_Table)}
if (exists('BSky_Single_Sample_Proportion_Test')){rm(BSky_Single_Sample_Proportion_Test)}



{{/if}}
{{/each}} 
{{/if}}
{{#else}}
{{if(options.selected.method == "Exact")}}
#BSky_Single_Sample_Proportion_Test = stats::binom.test( x ={{selected.noOfEvents | safe}}, n ={{selected.noOfTrials | safe}} , alternative='{{selected.gpbox2 | safe}}', p={{selected.txtbox2 | safe}}, conf.level={{selected.txtbox1 | safe}}, correct={{selected.chkbox1 | safe}})
BSky_Single_Sample_Proportion_Test = stats::binom.test( x ={{selected.noOfEvents | safe}}, n ={{selected.noOfTrials | safe}} , alternative='{{selected.gpbox2 | safe}}', p={{selected.txtbox2 | safe}}, conf.level={{selected.txtbox1 | safe}})
attr(BSky_Single_Sample_Proportion_Test$estimate, "names") <-"Sample p"
BSkyFormat(BSky_Single_Sample_Proportion_Test,  outputTableRenames = c("1-sample proportional test: x={{selected.noOfEvents | safe}}, n={{selected.noOfTrials | safe}}", ".", "."), repeatAllTableFooter ="hypothesized proportion={{selected.txtbox2 | safe}}, CI={{selected.txtbox1 | safe}}")
if (exists('BSky_Factor_Variable_Count_Table')){rm(BSky_Factor_Variable_Count_Table)}
if (exists('BSky_Single_Sample_Proportion_Test')){rm(BSky_Single_Sample_Proportion_Test)}
{{/if}}

{{if(options.selected.method == "Normal approximation")}}
BSky_Single_Sample_Proportion_Test = BSkyNormalApprox( x ={{selected.noOfEvents | safe}}, n ={{selected.noOfTrials | safe}} , alternative='{{selected.gpbox2 | safe}}', p={{selected.txtbox2 | safe}}, conf.level={{selected.txtbox1 | safe}})
BSkyFormat(BSky_Single_Sample_Proportion_Test[[1]],  outputTableRenames = c("1-sample proportional test: x={{selected.noOfEvents | safe}}, n={{selected.noOfTrials | safe}}", ".", "."), repeatAllTableFooter ="hypothesized proportion={{selected.txtbox2 | safe}}, CI={{selected.txtbox1 | safe}}")
BSkyFormat(BSky_Single_Sample_Proportion_Test[[2]])
if (exists('BSky_Factor_Variable_Count_Table')){rm(BSky_Factor_Variable_Count_Table)}
if (exists('BSky_Single_Sample_Proportion_Test')){rm(BSky_Single_Sample_Proportion_Test)}
{{/if}}

{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },

            dataInCols: {
                el: new radioButton(config, {
                  label: proportionTestOneSampleBinomialMini.t('dataInCols'),
                  no: "gpbox1",
                  increment: "dataInCols",
                  value: "dataInCols",
                  state: "checked",
                  extraction: "ValueAsIs"
                })
              },
              
              summarized: {
                el: new radioButton(config, {
                  label: proportionTestOneSampleBinomialMini.t('summarized'),
                  no: "gpbox1",
                  increment: "summarized",
                  dependant_objects: ["noOfEvents", "noOfTrials"],
                  value: "summarized",
                  required: true,
                  state: "",
                  extraction: "ValueAsIs"
                })
              },

            tvarbox1: {
                el: new dstVariableList(config, {
                    label: proportionTestOneSampleBinomialMini.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                  
                })
            },

            noOfEvents: {
                el: new input(config, {
                    no: 'noOfEvents',
                    label: proportionTestOneSampleBinomialMini.t('noOfEvents')   ,
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
                    label: proportionTestOneSampleBinomialMini.t('noOfTrials')   ,
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


            label1: { el: new labelVar(config, { label: proportionTestOneSampleBinomialMini.t('label1'), style: "mt-3",h: 6 }) },
            test1: {
                el: new radioButton(config, {
                    label: proportionTestOneSampleBinomialMini.t('test1'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            test2: {
                el: new radioButton(config, {
                    label: proportionTestOneSampleBinomialMini.t('test2'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            test3: {
                el: new radioButton(config, {
                    label: proportionTestOneSampleBinomialMini.t('test3'),
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
                    label: proportionTestOneSampleBinomialMini.t('txtbox1'),
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
                    label: proportionTestOneSampleBinomialMini.t('txtbox2'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.5,
                    extraction: "NoPrefix|UseComma"
                })
            },
            chkbox1: { el: new checkbox(config, { label: proportionTestOneSampleBinomialMini.t('chkbox1'), no: "chkbox1", extraction: "Boolean" }) },
            method: {
                el: new comboBox(config, {
                  no: "method",
                  label: proportionTestOneSampleBinomialMini.t('method'),
                  multiple: false,
                  extraction: "NoPrefix|UseComma",
                  options: ["Exact", "Normal approximation"],
                  default: "Exact"
                })
              },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.dataInCols.el.content, objects.tvarbox1.el.content, objects.summarized.el.content,objects.noOfEvents.el.content,objects.noOfTrials.el.content,objects.label1.el.content,
            objects.test1.el.content, objects.test2.el.content, objects.test3.el.content,
            //objects.txtbox1.el.content, objects.txtbox2.el.content, objects.chkbox1.el.content],
            objects.txtbox1.el.content, objects.txtbox2.el.content, objects.method.el.content],
            nav: {
                name: proportionTestOneSampleBinomialMini.t('navigation'),
                icon: "icon-p1",
                modal: config.id,
                datasetRequired:false
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: proportionTestOneSampleBinomialMini.t('help.title'),
            r_help: proportionTestOneSampleBinomialMini.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: proportionTestOneSampleBinomialMini.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        
        var code_vars = {
            dataset: {
                name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
            },
            selected: instance.dialog.extractData()
        }
        code_vars.selected.tvarbox1 = code_vars.selected.tvarbox1.split(",");
        if (code_vars.selected.tvarbox1[0] =="")
        {
            code_vars.selected.tvarbox1 =[]
        }
        const cmd =  instance.dialog.renderR(code_vars);
        res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
        return res;
    }
}

module.exports = {
    render: () => new proportionTestOneSampleBinomialMini().render()
}
