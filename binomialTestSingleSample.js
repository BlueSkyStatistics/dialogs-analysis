/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Single Sample Exact Binomial Test",
        navigation: "Binomial Test",
        tvarbox1: "Factor (one) with 2 levels only",
        label1: "Alternative hypothesis",
        test1: "Population mean != mu",
        test2: "Population mean > mu",
        test3: "Population mean < mu",
        txtbox1: "Confidence level",
        txtbox2: "Null hypothesis (mu in range 0-1)",
        help: {
            title: "Exact Binomial Test",
            r_help: "help(binom.test, package=stats)",
            body: `
                <b>Description</b></br>
Performs an exact test of a simple null hypothesis about the probability of success in a Bernoulli experiment.
<br/>
<b>Usage</b>
<br/>
<code>
binom.test(x, n, p = 0.5,<br/>
           alternative = c("two.sided", "less", "greater"),<br/>
           conf.level = 0.95)<br/>
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: number of successes, or a vector of length 2 giving the numbers of successes and failures, respectively.
</li>
<li>
n: number of trials; ignored if x has length 2.
</li>
<li>
p: hypothesized probability of success.
</li>
<li>
alternative: indicates the alternative hypothesis and must be one of "two.sided", "greater" or "less". You can specify just the initial letter.
</li>
<li>
conf.level: confidence level for the returned confidence interval.
</li>
</ul>
<b>Details</b></br>
Confidence intervals are obtained by a procedure first given in Clopper and Pearson (1934). This guarantees that the confidence level is at least conf.level, but in general does not give the shortest-length confidence intervals.<br/>
<b>Value</b><br/>
A list with class "htest" containing the following components:<br/>
statistic: the number of successes.<br/>
parameter: the number of trials.<br/>
p.value: the p-value of the test.<br/>
conf.int: a confidence interval for the probability of success.<br/>
estimate: the estimated probability of success.<br/>
null.value: the probability of success under the null, p.<br/>
alternative: a character string describing the alternative hypothesis.<br/>
method: the character string "Exact binomial test".<br/>
data.name: a character string giving the names of the data.<br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(binom.test, package=stats)
    `}
    }
}







class binomialTestSingleSample extends baseModal {
    constructor() {
        var config = {
            id: "binomialTestSingleSample",
            label: localization.en.title,
            modalType: "two",
            RCode: `
{{selected.tvarbox1 | safe}}_success_failure_count = xtabs(~{{selected.tvarbox1 | safe}} , data= {{dataset.name}})
BSkyFormat({{selected.tvarbox1 | safe}}_success_failure_count,singleTableOutputHeader="Counts")
if ( dim({{selected.tvarbox1 | safe}}_success_failure_count) ==2)
{
BSky_Single_Sample_Exact_Binom_Proportion_Test = binom.test({{selected.tvarbox1 | safe}}_success_failure_count, alternative='{{selected.gpbox2 | safe}}', p={{selected.txtbox2 | safe}}, conf.level={{selected.txtbox1 | safe}})
BSkyFormat(BSky_Single_Sample_Exact_Binom_Proportion_Test)
} else if (dim({{selected.tvarbox1 | safe}}_success_failure_count) > 2)
{
cat("ERROR: The target variable has more than 2 unique values")
} else  if (dim({{selected.tvarbox1 | safe}}_success_failure_count) == 1)
{
cat("ERROR: The target variable has a single unique value")
}
#remove(BSky_Factor_Variable_Count_Table)
#remove(BSky_Single_Sample_Exact_Binom_Proportion_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config,  {action: "move"})},
            tvarbox1: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
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
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.label1.el.content,
            objects.test1.el.content, objects.test2.el.content, objects.test3.el.content,
            objects.txtbox1.el.content, objects.txtbox2.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-b1",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new binomialTestSingleSample().render()