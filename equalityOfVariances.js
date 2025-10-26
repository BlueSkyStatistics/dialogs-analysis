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
<b>Description</b><br/>
Performs tests for the equality of variances across multiple groups.<br/>
<ul>
<li><b>Bartlett’s test</b>: Sensitive to departures from normality.</li>
<li><b>Levene’s test</b>: More robust to non-normality.</li>
<li><b>Fligner–Killeen test</b>: Non-parametric and very robust.</li>
</ul>
<b>Arguments</b><br/>
- alternative: two.sided, greater, or less.<br/>
- conf.level: confidence level for interval estimates.<br/>
- format: Wide or long data layout.<br/>
- p.adjust.method: Method for multiple comparison adjustment.
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
test<-BSky_variance_analysis (
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
test<-BSky_variance_analysis (
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
