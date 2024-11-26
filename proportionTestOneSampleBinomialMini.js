
var localization = {
    en: {
        title: "Single Sample Proportion Test",
        navigation: "Single sample",
        tvarbox1: "Numeric or factor with 2 levels/values only",
        label1: "Alternative hypothesis",
        test1: "Proportion != Hypothesized proportion",
        test2: "Proportion > Hypothesized proportion",
        test3: "Proportion < Hypothesized proportion",
        txtbox1: "Confidence level",
        txtbox2: "Null hypothesis (Hypothesized proportion in range 0-1)",
        chkbox1: "With continuity correction",
        dataInCols: "One or more variables contain samples",
        summarized: "Summarized data",
        noOfEvents:"No of events",
        noOfTrials:"No of trials",
        method: "Select method",
        
        help: {
            title: "Single Sample Proportion Test",
            r_help: "help(prop.test, package=stats)",
            body: `
<b>Description</b></br>
prop.test can be used for testing the null that the proportions (probabilities of success) in several groups are the same, or that they equal certain given values.<br/>
When method = "Exact", an exact test of a simple null hypothesis about the probability of success in a Bernoulli experiment.<br/>
When method ="Normal approximation" the normal distribution is used as an approximation for the binomal distribution (when sample size is large enough)<br/>
<code> 
BSky_Single_Sample_Proportion_Test = stats::binom.test( x =5, n =20 , alternative='two.sided', p=0.5, conf.level=0.95)
</code> <br/>
<code> 
BSky_Single_Sample_Proportion_Test = BSkyNormalApprox( x =6, n =26 , alternative='two.sided', p=0.5, conf.level=0.95)
</code> <br/>
<br/>
<b>Usage</b>
<br/>
<code> 
prop.test(x, n, p = NULL,
            alternative = c("two.sided", "less", "greater"),
            conf.level = 0.95, correct = TRUE)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: a vector of counts of successes, a one-dimensional table with two entries, or a two-dimensional table (or matrix) with 2 columns, giving the counts of successes and failures, respectively.
</li>
<li>
n: a vector of counts of trials; ignored if x is a matrix or a table.
</li>
<li>
p: a vector of probabilities of success. The length of p must be the same as the number of groups specified by x, and its elements must be greater than 0 and less than 1.
</li>
<li>
alternative: a character string specifying the alternative hypothesis, must be one of "two.sided" (default), "greater" or "less". You can specify just the initial letter. Only used for testing the null that a single proportion equals a given value, or that two proportions are equal; ignored otherwise.
</li>
<li>
conf.level: confidence level of the returned confidence interval. Must be a single number between 0 and 1. Only used when testing the null that a single proportion equals a given value, or that two proportions are equal; ignored otherwise.
</li>
<li>
correct: a logical indicating whether Yates' continuity correction should be applied where possible.
</li>
</ul>
<b>Details</b></br>
Only groups with finite numbers of successes and failures are used. Counts of successes and failures must be nonnegative and hence not greater than the corresponding numbers of trials which must be positive. All finite counts should be integers.</br>
If p is NULL and there is more than one group, the null tested is that the proportions in each group are the same. If there are two groups, the alternatives are that the probability of success in the first group is less than, not equal to, or greater than the probability of success in the second group, as specified by alternative. A confidence interval for the difference of proportions with confidence level as specified by conf.level and clipped to [-1,1] is returned. Continuity correction is used only if it does not exceed the difference of the sample proportions in absolute value. Otherwise, if there are more than 2 groups, the alternative is always "two.sided", the returned confidence interval is NULL, and continuity correction is never used.</br>
If there is only one group, then the null tested is that the underlying probability of success is p, or .5 if p is not given. The alternative is that the probability of success is less than, not equal to, or greater than p or 0.5, respectively, as specified by alternative. A confidence interval for the underlying proportion with confidence level as specified by conf.level and clipped to [0,1] is returned. Continuity correction is used only if it does not exceed the difference between sample and null proportions in absolute value. The confidence interval is computed by inverting the score test.</br>
Finally, if p is given and there are more than 2 groups, the null tested is that the underlying probabilities of success are those given by p. The alternative is always "two.sided", the returned confidence interval is NULL, and continuity correction is never used.</br>
<b>Value</b><br/>
A list with class "htest" containing the following components:</br>
statistic: the value of Pearson's chi-squared test statistic.</br>
parameter: the degrees of freedom of the approximate chi-squared distribution of the test statistic.</br>
p.value: the p-value of the test.</br>
estimate: a vector with the sample proportions x/n.</br>
conf.int: a confidence interval for the true proportion if there is one group, or for the difference in proportions if there are 2 groups and p is not given, or NULL otherwise. In the cases where it is not NULL, the returned confidence interval has an asymptotic confidence level as specified by conf.level, and is appropriate to the specified alternative hypothesis.</br>
null.value: the value of p if specified by the null, or NULL otherwise.</br>
alternative: a character string describing the alternative.</br>
method: a character string indicating the method used, and whether Yates' continuity correction was applied.</br>
data.name: a character string giving the names of the data.</br>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(prop.test, package ='stats')
`}
    }
}








class proportionTestOneSampleBinomialMini extends baseModal {
    constructor() {
        var config = {
            id: "proportionTestOneSampleBinomialMini",
            label: localization.en.title,
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
                  label: localization.en.dataInCols,
                  no: "gpbox1",
                  increment: "dataInCols",
                  value: "dataInCols",
                  state: "checked",
                  extraction: "ValueAsIs"
                })
              },
              
              summarized: {
                el: new radioButton(config, {
                  label: localization.en.summarized,
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
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                  
                })
            },

            noOfEvents: {
                el: new input(config, {
                    no: 'noOfEvents',
                    label: localization.en.noOfEvents   ,
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
                    label: localization.en.noOfTrials   ,
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


            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mt-3",h: 6 }) },
            test1: {
                el: new radioButton(config, {
                    label: localization.en.test1,
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            test2: {
                el: new radioButton(config, {
                    label: localization.en.test2,
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            test3: {
                el: new radioButton(config, {
                    label: localization.en.test3,
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
                    label: localization.en.txtbox1,
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
                    label: localization.en.txtbox2,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.5,
                    extraction: "NoPrefix|UseComma"
                })
            },
            chkbox1: { el: new checkbox(config, { label: localization.en.chkbox1, no: "chkbox1", extraction: "Boolean" }) },
            method: {
                el: new comboBox(config, {
                  no: "method",
                  label: localization.en.method,
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
                name: localization.en.navigation,
                icon: "icon-p1",
                modal: config.id,
                datasetRequired:false
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
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
module.exports.item = new proportionTestOneSampleBinomialMini().render()