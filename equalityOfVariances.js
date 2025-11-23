var localization = { 
    en: {
        title: "Equality of Variances",
        navigation: "Equality of Variances",
        label1: "Choose tests",
        bartlett: "Bartlett’s Test",
        levene: "Levene’s Test",
        fligner: "Fligner–Killeen Test",
        normal_distribution: "Test based on normal distribution",
        pairwiseLeveneTest: "Pairwise Levene's test",

        label2: "Data format",
        wide: "Wide format",
        long: "Long format",

        label3: "Confidence level",
        label4: "Alternative hypothesis",
        alt1: "Two-sided",
        alt2: "Greater",
        alt3: "Less",

        label5: "P-value adjustment method (for pairwise Levene's test)",
        padj1: "Holm",
        padj2: "Hochberg",
        padj3: "Hommel",
        padj4: "Bonferroni",
        padj5: "BH",
        padj6: "BY",
        padj7: "FDR",
        padj8: "None",

        help: {
            title: "Tests for Equality of Variances",
            r_help: "help(bartlett.test, package=stats); help(leveneTest, package=car); help(fligner.test, package=stats)",
            body: `
<b>Description</b></br>
Tests equality of variances. Supports data in the following formats<br/>
wide: Each variable contains measurements e.g. variable 1 contains measurements from machine A, variable 2 contains measurements of machine B...<br/>
long: The measurements in a variable are grouped by one or more variables e.g. Test scores are grouped by gender and class. <br/>
P-value adjustment method applied only when the pairwise Levene' test is selected.<br/>
<b>Usage</b>
<br/>
<code> 
BSky_variance_analysis (<br/>
    data_format = c("wide" ),<br/>
    cols_to_compare = c('A','B','C'),<br/>
    response_col = NULL,<br/>
    group_col = NULL,<br/>
    conf_level = 0.95,<br/>
    alt_hypothesis = "two.sided",<br/>
    p_adjust_method = "holm",<br/>
    normal_distribution =FALSE,<br/>
    Fligner_Killeen =FALSE,<br/>
  pairwiseComparison=FALSE,<br/>
    data_name="Dataset1"<br/>
)<br/>
BSky_variance_analysis (<br/>
    data_format = c("long" ),<br/>
    cols_to_compare = NULL,<br/>
    response_col = c('Score'),<br/>
    group_col = c('Gender','Class'),<br/>
    conf_level = 0.95,<br/>
    alt_hypothesis = "two.sided",<br/>
    p_adjust_method = "holm",<br/>
    normal_distribution =FALSE,<br/>
     Fligner_Killeen =FALSE,<br/>
  pairwiseComparison=FALSE,<br/>
    data_name="Dataset2"<br/>
)<br/>
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
data_format: Can be wide or long
</li>
<li>
cols_to_compare: The variables to compare variances across when dataset is in wide format, NULL for data in long format
</li>
<li>
response_col: The measurement variable to compare variances across groups. NULL for wide data
</li>
<li>
group_col: One or more variables used to group the measurement variable, we test for equality of variances across groups
</li>
<li>
conf_level: Confidence interval
</li>
<li>
alt_hypothesis: Set to two.sided
</li>
<li>
p_adjust_method: Method used to adjust the p value
</li>
<li>
normal_distribution: if TRUE, we assume normality
</li>
<li>
Fligner_Killeen: if TRUE, performs a Fligner_Killeen test
</li>
<li>
pairwiseComparison: Perform a pairwise Levene's test
</li>
<li>
datasetname: Name of the dataset from which x,y and layers (variables) are chosen
</li>
</ul>
<b>Value</b></br>
Bonferroni confidence intervals for the confidence intervals specified. Test recults for multi-comparison tests (when normality is not assumed) and results of other tests
<br/>
<b>Example</b></br>
<code> 
BSky_variance_analysis (<br/>
    data_format = c("long" ),<br/>
    cols_to_compare = NULL,<br/>
    response_col = c('Score'),<br/>
    group_col = c('Gender','Class'),<br/>
    conf_level = 0.95,<br/>
    alt_hypothesis = "two.sided",<br/>
    p_adjust_method = "holm",<br/>
    normal_distribution =FALSE,<br/>
     Fligner_Killeen =FALSE,<br/>
  pairwiseComparison=FALSE,<br/>
    data_name="Dataset2"<br/>
)<br/>
</code> <br/>

<b>Details</b></br>
Multiple comparisons test</br>
Used when you do not select “Use test based on normal distribution” – i.e., you favour methods robust to non-normal distributions. </br>
If you have k > 2 groups, we compute the intervals for standard deviations such that if two intervals do not overlap, the associated standard deviations are 
significantly different.</br> 
For k = 2 samples, it uses Bonett’s method for testing two variances with hypothesized ratio = 1. </br>
When the overall multiple comparison test is significant, the standard deviations that correspond to the non-overlapping intervals are statistically different.</br>
Advantages: More powerful than Levene’s method in many situations (for continuous distributions). But when sample sizes are small (< 20) or distributions are 
extremely skewed/heavy-tailed, the type I error rate may be inflated.</br>
P-value for the test</br>
If there are 2 samples in the design, then we calculate the p-value for the multiple comparisons test using Bonett's method for a 2 variances test and a hypothesized ratio, Ρo, of 1.</br>
If there are k > 2 samples in the design, then let Pij be the p-value of the test for any pair (i, j ) of samples. The p-value for the multiple comparisons procedure as an overall test of equality of variances is given by the following:</br>
P =min{Pij, 1<=i<j<=k}
</br>
Levene’s test statistic</br>
Levene’s test is used to test the null hypothesis that variances are equal across groups (H₀: all variances equal) versus the alternative that at least 
one variance differs. </br>
It is more robust to departures from normality compared to tests that assume normality (e.g., Bartlett’s). </br>
Specifically, we use the Brown-Forsythe modification (absolute deviations from the sample median rather than mean) for improved robustness. </br>
Interpretation: If the p-value < α, you reject H₀ and conclude variances are not equal. </br>
</br>
Bartlett’s test statistic</br>
Bartlett’s test is designed to test for equality of variances when the data are normally distributed. H₀: all variances equal. When k > 2 groups,
we use Bartlett’s test (if “use test based on normal distribution” is selected). </br>
The test statistic (commonly denoted B) is based on comparing the weighted arithmetic mean and the weighted geometric mean of sample variances. </br>
The statistic follows (approximately) a chi-square distribution with k-1 df. </br>
Because Bartlett’s test assumes normality, it is sensitive to departures from normality (i.e., non-normal or heavy-tailed distributions can lead to 
misleading results)</br>
</br>
F-test statistic</br>
When there are exactly two groups (k = 2), we use an F-test rather than Bartlett’s (if “use test based on normal distribution” is selected). </br>
H₀: the variances are equal (σ₁² = σ₂²). </br>
The F-statistic is computed as the ratio of the two sample variances (larger over smaller). Then the p-value depends on the alternative hypothesis
 (one-sided “less than” or “greater than”, or two-sided). </br>
Interpretation: If p-value < α, reject H₀ and conclude that variances differ. It is valid only under the assumption of normality.</br>
<b>Value</b><br/>

<b>Package</b></br>
BlueSky</br>
<b>Help</b></br>
Please contact support@blueskystatistics.com for additional information.
    `

        }
    }
}

class equalityOfVariances extends baseModal {
    constructor() {
        var config = {
            id: "equalityOfVariances",
            label: localization.en.title,
            modalType: "two",
            RCode: `

library(dplyr)
library(tidyr)
library(car)
library(ggplot2)
library(grid)

{{if(options.selected.groupvar =="")}}
BSkyEqualityVariances<-BSky_variance_analysis (
    data_format = c("wide" ),
    cols_to_compare = c({{selected.tvarbox1 | safe}}),
    response_col = NULL,
    group_col = NULL,
    conf_level = {{selected.txt_conf | safe}},
    alt_hypothesis = "two.sided",
    p_adjust_method = "{{selected.gpbox_padj | safe}}",
    normal_distribution ={{selected.normal_distribution | safe}},
    Fligner_Killeen ={{selected.chk_fligner | safe}},
  pairwiseComparison={{selected.pairwiseLeveneTest | safe}},
    data_name="{{dataset.name}}"
)
{{#else}}
BSkyEqualityVariances<-BSky_variance_analysis (
    data_format = c("long" ),
    cols_to_compare = NULL,
    response_col = c({{selected.tvarbox1 | safe}}),
    group_col = c({{selected.groupvar | safe}}),
    conf_level = {{selected.txt_conf | safe}},
    alt_hypothesis = "two.sided",
    p_adjust_method = "{{selected.gpbox_padj | safe}}",
    normal_distribution ={{selected.normal_distribution | safe}},
     Fligner_Killeen ={{selected.chk_fligner | safe}},
  pairwiseComparison={{selected.pairwiseLeveneTest | safe}},
    data_name="{{dataset.name}}"
)
{{/if}}
if (exists('BSkyEqualityVariances'))rm(BSkyEqualityVariances)
`
        }

        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: "Response variable",
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },

            groupvar: {
                el: new dstVariableList(config, {
                    label: "Grouping variable",
                    no: "groupvar",
                    filter: "Nominal|Ordinal|Factor",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },

            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mt-3", h: 6 }) },
            chk_bartlett: { el: new checkbox(config, { label: localization.en.bartlett, no: "chk_bartlett", extraction: "Boolean" }) },
            chk_levene: { el: new checkbox(config, { label: localization.en.levene, no: "chk_levene", newline:true,extraction: "Boolean" }) },
            chk_fligner: { el: new checkbox(config, { label: localization.en.fligner, no: "chk_fligner", newline:true,extraction: "Boolean" }) },
            normal_distribution: { el: new checkbox(config, { label: localization.en.normal_distribution, no: "normal_distribution", newline:true,extraction: "Boolean" }) },
            pairwiseLeveneTest:{ el: new checkbox(config, { label: localization.en.pairwiseLeveneTest, no: "pairwiseLeveneTest", newline:true,extraction: "Boolean" }) },

            label2: { el: new labelVar(config, { label: localization.en.label2, style: "mt-3", h: 6 }) },
            wide: {
                el: new radioButton(config, {
                    label: localization.en.wide,
                    no: "gpbox_format",
                    increment: "wide",
                    value: "wide",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            long: {
                el: new radioButton(config, {
                    label: localization.en.long,
                    no: "gpbox_format",
                    increment: "long",
                    value: "long",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },

            txt_conf: {
                el: new inputSpinner(config, {
                    no: 'txt_conf',
                    label: localization.en.label3,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },

            label4: { el: new labelVar(config, { label: localization.en.label4, style: "mt-3", h: 6 }) },
            alt1: {
                el: new radioButton(config, {
                    label: localization.en.alt1,
                    no: "gpbox_alt",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            alt2: {
                el: new radioButton(config, {
                    label: localization.en.alt2,
                    no: "gpbox_alt",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            alt3: {
                el: new radioButton(config, {
                    label: localization.en.alt3,
                    no: "gpbox_alt",
                    increment: "less",
                    value: "less",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },

            // New p.adjust group
            label5: { el: new labelVar(config, { label: localization.en.label5, style: "mt-3", h: 6 }) },
            padj1: { el: new radioButton(config, { label: localization.en.padj1, no: "gpbox_padj", increment: "holm", value: "holm", state: "checked", extraction: "ValueAsIs" }) },
            padj2: { el: new radioButton(config, { label: localization.en.padj2, no: "gpbox_padj", increment: "hochberg", value: "hochberg", extraction: "ValueAsIs" }) },
            padj3: { el: new radioButton(config, { label: localization.en.padj3, no: "gpbox_padj", increment: "hommel", value: "hommel", extraction: "ValueAsIs" }) },
            padj4: { el: new radioButton(config, { label: localization.en.padj4, no: "gpbox_padj", increment: "bonferroni", value: "bonferroni", extraction: "ValueAsIs" }) },
            padj5: { el: new radioButton(config, { label: localization.en.padj5, no: "gpbox_padj", increment: "BH", value: "BH", extraction: "ValueAsIs" }) },
            padj6: { el: new radioButton(config, { label: localization.en.padj6, no: "gpbox_padj", increment: "BY", value: "BY", extraction: "ValueAsIs" }) },
            padj7: { el: new radioButton(config, { label: localization.en.padj7, no: "gpbox_padj", increment: "fdr", value: "fdr", extraction: "ValueAsIs" }) },
            padj8: { el: new radioButton(config, { label: localization.en.padj8, no: "gpbox_padj", increment: "none", value: "none", extraction: "ValueAsIs" }) }
        }

        const content = {
            left: [objects.content_var.el.content],
            right: [
                objects.tvarbox1.el.content, 
                objects.groupvar.el.content,
                objects.label1.el.content,
                //objects.chk_bartlett.el.content,
                //objects.chk_levene.el.content,
                objects.chk_fligner.el.content,
                objects.normal_distribution.el.content,
                objects.pairwiseLeveneTest.el.content,
                
                //objects.label2.el.content,
                //objects.wide.el.content,
                //objects.long.el.content,
                objects.txt_conf.el.content,
                //objects.label4.el.content,
                //objects.alt1.el.content,
                //objects.alt2.el.content,
                //objects.alt3.el.content,
                objects.label5.el.content,
                objects.padj1.el.content,
                objects.padj2.el.content,
                objects.padj3.el.content,
                objects.padj4.el.content,
                objects.padj5.el.content,
                objects.padj6.el.content,
                objects.padj7.el.content,
                objects.padj8.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-p1",
                modal: config.id
            }
        }

        super(config, objects, content);
        this.help = localization.en.help;
    }

    
}

module.exports.item = new equalityOfVariances().render()
