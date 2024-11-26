
var localization = {
    en: {
        title: "Two Sample Proportion Test",
        navigation: "Two sample",
        tvarbox1: "Numeric or factor with 2 levels/values only",
        tvarbox2: "Numeric or factor with 2 levels/values only",
        tvarbox3: "Numeric variable",
        tvarbox4: "Factor variable with 2 levels/values only",
        label1: "Alternative hypothesis",
        test1: "Proportion != Hypothesized proportion",
        test2: "Proportion > Hypothesized proportion",
        test3: "Proportion < Hypothesized proportion",
        txtbox1: "Confidence level",
        txtbox2: "Null hypothesis (Hypothesized proportion in range 0-1)",
        chkbox1: "With continuity correction",
        dataInCols: "Data is in 2 separate variables",
        dataInOneCols: "Data is in 1 variable",
        dataVariable: "Variable containing the data",
        groupingVariable: "Grouping variable",
        summarized: "Summarized data",
        noOfEvents:"No of events",
        noOfTrials:"No of trials",
        method: "Select method",
        label2: "Sample1",
        label3: "Sample2",
        noOfEvents2:"No of events",
        noOfTrials2:"No of trials",
        
        help: {
            title: "Two Sample Proportion Test",
            r_help: "help(prop.test, package=stats)",
            body: `
<b>Description</b></br>
prop.test can be used for testing the null that the proportions (probabilities of success) in several groups are the same, or that they equal certain given values.
We support the following options </br>
1. The data is in 2 columns: Here we compare the proportion of the successes in each column. A max of 2 unique values are allowed in each column.</br>
2. The data is in a single column: Here we compare the proportion of successes in each group in the 1st column, the group is defined by factor levels in another column. A max of 2 unique values are allowed in each column.</br>
3. The data is entered in summary format.method =Estimate proportions separately.</br>
When method =Estimate proportions separately we test the null that the proportions (probabilities of success) in each groups are the same, or that they equal certain given values. See code below for data in summarized format.</br>
<code> 
BSky2SampleProportionMT( x1=4, x2=5,
    n1=18, n2=7, p=0, 
    alternate="two.sided", conf.level=0.95, testMethod ="Estimate proportions separately") <br/>
</code> <br/>
When method =use pooled estimate of the proportion, pooled estimate of the proportion is a combined estimate of the proportion based on data from both samples. It is calculated when we assume that the two populations have the same proportion, which is the null hypothesis in many two-sample proportion tests. See example below for data in summarized format.</br>
<code> 
BSky2SampleProportionMT( x1=5, x2=3,
    n1=16, n2=10, p=0, 
    alternate="two.sided", conf.level=0.95, testMethod ="Use pooled estimate of the proportion")
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








class proportionTestTwoSampleBinomialMini extends baseModal {
    constructor() {
        var config = {
            id: "proportionTestTwoSampleBinomialMini",
            label: localization.en.title,
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
                  label: localization.en.dataInCols,
                  no: "gpbox1",
                  increment: "dataInCols",
                  value: "dataInCols",
                  state: "checked",
                  extraction: "ValueAsIs"
                })
              },  
              dataInOneCols: {
                el: new radioButton(config, {
                  label: localization.en.dataInOneCols,
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
                  label: localization.en.summarized,
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
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                  
                })
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",    
                })
            },
            tvarbox3: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox3,
                    no: "tvarbox3",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                  
                })
            },
            tvarbox4: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox4,
                    no: "tvarbox4",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",    
                })
            },
            label2: {
                el: new labelVar(config, {
                  label: localization.en.label2, 
                  style: "mt-3", 
                  h:5
                })
              },
            noOfEvents: {
                el: new input(config, {
                    no: 'noOfEvents',
                    label: localization.en.noOfEvents,
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
                    label: localization.en.noOfTrials,
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
                  label: localization.en.label3, 
                  style: "mt-3", 
                  h:5
                })
              },
            noOfEvents2: {
                el: new input(config, {
                    no: 'noOfEvents2',
                    label: localization.en.noOfEvents2,
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
                    label: localization.en.noOfTrials2,
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
                    value: 0,
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
                name: localization.en.navigation,
                icon: "icon-p1",
                modal: config.id,
                datasetRequired:false
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }

}
module.exports.item = new proportionTestTwoSampleBinomialMini().render()