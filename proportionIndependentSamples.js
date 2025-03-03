/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Two Sample Proportion Test",
        navigation: "Two sample (Continuity Correction)",
        tvarbox1: "GroupBy, specify a factor variable",
        response: "Response variable, factor variable with 2 levels only",
        label1: "Alternative hypothesis",
        test1: "Proportion != Hypothesized proportion",
        test2: "Proportion > Hypothesized proportion",
        test3: "Proportion < Hypothesized proportion",
        txtbox1: "Confidence level",
        chkbox1: "With continuity correction",
        help: {
            title: "Two Sample Proportion Test",
            r_help: "help(prop.test, package=stats)",
            body: `
<b>Description</b></br>
prop.test can be used for testing the null that the proportions (probabilities of success) in several groups are the same, or that they equal certain given values.
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








class proportionIndependentSamples extends baseModal {
    constructor() {
        var config = {
            id: "proportionIndependentSamples",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(RcmdrMisc)
BSky_Factor_Variable_Count_Table = xtabs(~{{selected.tvarbox1 | safe}} +{{selected.response | safe}}, data= {{dataset.name}})
BSkyFormat(rowPercents(BSky_Factor_Variable_Count_Table), singleTableOutputHeader="Percentage Table" )
BSky_Two_Sample_Proportion_Test = prop.test((BSky_Factor_Variable_Count_Table), alternative='{{selected.gpbox2 | safe}}', conf.level={{selected.txtbox1 | safe}}, correct={{selected.chkbox1 | safe}})
BSkyFormat(BSky_Two_Sample_Proportion_Test)
#remove(BSky_Factor_Variable_Count_Table)
#remove(BSky_Two_Sample_Proportion_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UsePlus",
                    required: true,
                })
            },
            response: {
                el: new dstVariable(config, {
                    label: localization.en.response,
                    no: "response",
                    filter: "Numeric|Logical|Ordinal(with 2 levels)|Nominal(with 2 levels)",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
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
            chkbox1: { el: new checkbox(config, { label: localization.en.chkbox1, no: "chkbox1", extraction: "Boolean" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.response.el.content, objects.label1.el.content,
            objects.test1.el.content, objects.test2.el.content, objects.test3.el.content,
            objects.txtbox1.el.content, objects.chkbox1.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-p2",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new proportionIndependentSamples().render()