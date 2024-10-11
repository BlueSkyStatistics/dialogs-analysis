


class tTestIndependentSamplesTwoNumericVars extends baseModal {
    static dialogId = 'tTestIndependentSamplesTwoNumericVars'
    static t = baseModal.makeT(tTestIndependentSamplesTwoNumericVars.dialogId)

    constructor() {
        var config = {
            id: tTestIndependentSamplesTwoNumericVars.dialogId,
            label: tTestIndependentSamplesTwoNumericVars.t('title'),
            modalType: "two",
            RCode: `
require(effectsize)
#Summary Statistics
BSkyFormat (as.data.frame({{dataset.name}} %>% dplyr::select({{selected.tvarbox1 | safe}}, {{selected.tvarbox3 | safe}}) %>% na.omit %>% psych::describe()), singleTableOutputHeader ="Summary Statistics" )
# Running the paired t-test
BSky_Paired_t_Test = t.test( {{dataset.name}}\${{selected.tvarbox1 | safe}}, {{dataset.name}}\${{selected.tvarbox3 | safe}}, 
    alternative = '{{selected.gpbox2 | safe}}', conf.level = {{selected.txtbox1 | safe}}, 
    mu = {{selected.txtbox2 | safe}}, var.equal = {{selected.chkbox1 | safe}}, paired = TRUE, data = {{dataset.name}})
BSkyFormat(BSky_Paired_t_Test)
{{ if( options.selected.showEffectSizes == "TRUE")}}
{{if (options.selected.cohensd =="1")}}
BSky_Cohensd_Res <- cohens_d("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}", 
    data = {{dataset.name}}, paired = TRUE, correction = TRUE)
BSkyFormat(as.data.frame(BSky_Cohensd_Res), 
    singleTableOutputHeader = c("Cohen's d results with bias corrected"))
{{/if}}
{{if (options.selected.cohensd == "0")}}
BSky_Cohensd_Res <- cohens_d("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}", 
    data = {{dataset.name}}, paired = TRUE, correction = FALSE)
BSkyFormat(as.data.frame(BSky_Cohensd_Res), 
    singleTableOutputHeader = c("Cohen's d results"))
{{/if}}
{{if (options.selected.hedgesg =="1")}}
BSky_hedgesg_Res <- hedges_g("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}",
    data = {{dataset.name}}, paired = TRUE, adjust = TRUE)
BSkyFormat(as.data.frame(BSky_hedgesg_Res), 
    singleTableOutputHeader = c("Hedges' g results with bias corrected"))
{{/if}}
{{if (options.selected.hedgesg == "0")}}
BSky_hedgesg_Res <- hedges_g("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}", 
    data = {{dataset.name}}, paired = TRUE, adjust = FALSE)
BSkyFormat(as.data.frame(BSky_hedgesg_Res), 
    singleTableOutputHeader = c("Hedges' g Results"))
{{/if}}
{{if (options.selected.glassd == "1")}}
BSky_glassd_Res <- glass_delta("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}", 
    data = {{dataset.name}}, correction = TRUE)
BSkyFormat(as.data.frame(BSky_glassd_Res), 
    singleTableOutputHeader = c("Glass's d Results with bias corrected"))
{{/if}}
{{if (options.selected.glassd == "0")}}
BSky_glassd_Res <- glass_delta("{{selected.tvarbox1 | safe}}", "{{selected.tvarbox3 | safe}}",
    data = {{dataset.name}}, correction = FALSE)
BSkyFormat(as.data.frame(BSky_glassd_Res), 
    singleTableOutputHeader = c("Glass's d Results"))
{{/if}}
{{/if}}
#remove temporary objects
if (exists('BSky_Paired_t_Test')) rm(BSky_Paired_t_Test)
if (exists('BSky_Cohensd_Res')) rm(BSky_Cohensd_Res)
if (exists('BSky_hedgesg_Res')) rm(BSky_hedgesg_Res)
if (exists('BSky_glassd_Res')) rm(BSky_glassd_Res)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: tTestIndependentSamplesTwoNumericVars.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox3: {
                el: new dstVariable(config, {
                    label: tTestIndependentSamplesTwoNumericVars.t('tvarbox3'),
                    no: "tvarbox3",
                    filter: "Numeric|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: tTestIndependentSamplesTwoNumericVars.t('label1'), style: "mt-3", h: 6 }) },
            test1: { el: new radioButton(config, { label: tTestIndependentSamplesTwoNumericVars.t('test1'), no: "gpbox2", increment: "test1", value: "two.sided", state: "checked", extraction: "ValueAsIs" }) },
            test2: { el: new radioButton(config, { label: tTestIndependentSamplesTwoNumericVars.t('test2'), no: "gpbox2", increment: "test2", value: "greater", state: "", extraction: "ValueAsIs" }) },
            test3: { el: new radioButton(config, { label: tTestIndependentSamplesTwoNumericVars.t('test3'), no: "gpbox2", increment: "test3", value: "less", state: "", extraction: "ValueAsIs" }) },
            chkbox1: { el: new checkbox(config, { label: tTestIndependentSamplesTwoNumericVars.t('chkbox1'), no: "chkbox1", extraction: "Boolean" }) },
            txtbox2: {
                el: new inputSpinner(config, {
                    no: 'txtbox2',
                    label: tTestIndependentSamplesTwoNumericVars.t('txtbox2'),
                    min: -9999999,
                    max: 9999999,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            txtbox1: {
                el: new inputSpinner(config, {
                    no: 'txtbox1',
                    label: tTestIndependentSamplesTwoNumericVars.t('txtbox1'),
                    min: 0,
                    max: 1,
                    step: 1,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            showEffectSizes: {
                el: new checkbox(config, {
                    label: tTestIndependentSamplesTwoNumericVars.t('showEffectSizes'),
                    no: "showEffectSizes",
                    newline: true,
                    extraction: "Boolean",
                })
            },
            label3: { el: new labelVar(config, { label: tTestIndependentSamplesTwoNumericVars.t('label3'), style: "mb-1, mt-1", h: 6 }) },
            cohensdNoCorrection: {
                el: new radioButton(config, {
                    label: tTestIndependentSamplesTwoNumericVars.t('cohensdNoCorrection'),
                    no: "cohensd",
                    increment: "cohensdNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            cohensdCorrect: {
                el: new radioButton(config, {
                    label: tTestIndependentSamplesTwoNumericVars.t('cohensdCorrect'),
                    no: "cohensd",
                    increment: "cohensdCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            hedgesgNoCorrection: {
                el: new radioButton(config, {
                    label: tTestIndependentSamplesTwoNumericVars.t('hedgesgNoCorrection'),
                    no: "hedgesg",
                    increment: "hedgesgNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            hedgesgCorrect: {
                el: new radioButton(config, {
                    label: tTestIndependentSamplesTwoNumericVars.t('hedgesgCorrect'),
                    no: "hedgesg",
                    increment: "hedgesgCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label4: { el: new labelVar(config, { label: tTestIndependentSamplesTwoNumericVars.t('label4'), style: "mb-1, mt-1", h: 6 }) },
            label5: { el: new labelVar(config, { label: tTestIndependentSamplesTwoNumericVars.t('label5'), style: "mb-1, mt-1", h: 6 }) },
            glassdNoCorrection: {
                el: new radioButton(config, {
                    label: tTestIndependentSamplesTwoNumericVars.t('glassdNoCorrection'),
                    no: "glassd",
                    increment: "glassdNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            glassdCorrect: {
                el: new radioButton(config, {
                    label: tTestIndependentSamplesTwoNumericVars.t('glassdCorrect'),
                    no: "glassd",
                    increment: "glassdCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
        }
        var effectsizes = {
            el: new optionsVar(config, {
                no: "effects",
                name: tTestIndependentSamplesTwoNumericVars.t('effectsizes'),
                content: [
                    objects.showEffectSizes.el,
                    objects.label3.el,
                    objects.cohensdNoCorrection.el,
                    objects.cohensdCorrect.el,
                    objects.label4.el,
                    objects.hedgesgNoCorrection.el,
                    objects.hedgesgCorrect.el,
                    objects.label5.el,
                    objects.glassdNoCorrection.el,
                    objects.glassdCorrect.el,
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox3.el.content, objects.label1.el.content, objects.test1.el.content, objects.test2.el.content, objects.test3.el.content, objects.chkbox1.el.content, objects.txtbox2.el.content, objects.txtbox1.el.content],
            bottom: [effectsizes.el.content],
            nav: {
                name: tTestIndependentSamplesTwoNumericVars.t('navigation'),
                icon: "icon-tp",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: tTestIndependentSamplesTwoNumericVars.t('help.title'),
            r_help: "help(data,package='utils')",
            body: tTestIndependentSamplesTwoNumericVars.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new tTestIndependentSamplesTwoNumericVars().render()
}
