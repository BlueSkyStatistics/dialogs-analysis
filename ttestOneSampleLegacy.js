/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class ttestOneSampleLegacy extends baseModal {
    static dialogId = 'ttestOneSampleLegacy'
    static t = baseModal.makeT(ttestOneSampleLegacy.dialogId)

    constructor() {
        var config = {
            id: ttestOneSampleLegacy.dialogId,
            label: ttestOneSampleLegacy.t('title'),
            splitProcessing: false,
            modalType: "two",
            RCode: `
#Run the t-test
require(effectsize)
{{if (options.selected.showEffectSizes == "TRUE")}}
BSky_One_Sample_T_Test = BSkyOneSmTTest(varNamesOrVarGlobalIndices = c({{selected.tvarbox1 | safe}}), 
    mu = {{selected.testval | safe}}, conf.level = {{selected.conflevel | safe}}, 
    alternative ='{{selected.gpbox2 | safe}}',
    cohens_d = {{if (options.selected.cohensd =="0")}}TRUE{{#else}}FALSE{{/if}},
    cohensd_correction = {{if (options.selected.cohensd =="1")}}TRUE{{#else}}FALSE{{/if}},
    hedges_g = {{if (options.selected.hedgesg =="0")}}TRUE{{#else}}FALSE{{/if}},
    hedgesg_correction = {{if (options.selected.hedgesg =="1")}}TRUE{{#else}}FALSE{{/if}},
    datasetNameOrDatasetGlobalIndex ='{{dataset.name}}', 
    missing={{selected.Missvals | safe}})
{{#else}}
BSky_One_Sample_T_Test = BSkyOneSmTTest(varNamesOrVarGlobalIndices = c({{selected.tvarbox1 | safe}}), 
    mu = {{selected.testval | safe}}, conf.level = {{selected.conflevel | safe}}, 
    alternative ='{{selected.gpbox2 | safe}}',
    datasetNameOrDatasetGlobalIndex ='{{dataset.name}}', 
    missing={{selected.Missvals | safe}})
{{/if}}
#Display the results in the output
BSkyFormat(BSky_One_Sample_T_Test)
#Remove temporary objects
if (exists('BSky_One_Sample_T_Test')) rm(BSky_One_Sample_T_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: ttestOneSampleLegacy.t('tvarbox1'),
                    no: "tvarbox1",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },
            label1: { el: new labelVar(config, { label: ttestOneSampleLegacy.t('label1'), style: "mt-2", h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: ttestOneSampleLegacy.t('test1'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: ttestOneSampleLegacy.t('test2'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            less: {
                el: new radioButton(config, {
                    label: ttestOneSampleLegacy.t('test3'),
                    no: "gpbox2",
                    increment: "less",
                    value: "less",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            testval: {
                el: new inputSpinner(config, {
                    no: 'testval',
                    label: ttestOneSampleLegacy.t('testval'),
                    min: -9999999,
                    max: 9999999,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            conf_level: {
                el: new inputSpinner(config, {
                    no: 'conflevel',
                    label: ttestOneSampleLegacy.t('conflevel'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { label: ttestOneSampleLegacy.t('label2'), h: 6 }) },
            Analysis: {
                el: new radioButton(config, {
                    label: ttestOneSampleLegacy.t('Analysis'),
                    no: "Missvals",
                    increment: "Analysis",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            Listwise: {
                el: new radioButton(config, {
                    label: ttestOneSampleLegacy.t('Listwise'),
                    no: "Missvals",
                    increment: "Listwise",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },

            showEffectSizes: {
                el: new checkbox(config, {
                    label: ttestOneSampleLegacy.t('showEffectSizes'),
                    no: "showEffectSizes",
                    newline: true,
                    extraction: "Boolean",
                })
            },


            label3: { el: new labelVar(config, { label: ttestOneSampleLegacy.t('label3'), style: "mb-1, mt-1", h: 6 }) },
            cohensdNoCorrection: {
                el: new radioButton(config, {
                    label: ttestOneSampleLegacy.t('cohensdNoCorrection'),
                    no: "cohensd",
                    increment: "cohensdNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            cohensdCorrect: {
                el: new radioButton(config, {
                    label: ttestOneSampleLegacy.t('cohensdCorrect'),
                    no: "cohensd",
                    increment: "cohensdCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            hedgesgNoCorrection: {
                el: new radioButton(config, {
                    label: ttestOneSampleLegacy.t('hedgesgNoCorrection'),
                    no: "hedgesg",
                    increment: "hedgesgNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            hedgesgCorrect: {
                el: new radioButton(config, {
                    label: ttestOneSampleLegacy.t('hedgesgCorrect'),
                    no: "hedgesg",
                    increment: "hedgesgCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label4: { el: new labelVar(config, { label: ttestOneSampleLegacy.t('label4'), style: "mb-1, mt-1", h: 6 }) },
            glassd: {
                el: new checkbox(config, {
                    label: ttestOneSampleLegacy.t('glassd'),
                    no: "glassd",
                    newline: true,
                    extraction: "Boolean",
                })
            },
            glassdCorrect: {
                el: new checkbox(config, {
                    label: ttestOneSampleLegacy.t('glassdCorrect'),
                    no: "glassdCorrect",
                    extraction: "Boolean",
                })
            },
        }
        var effectsizes = {
            el: new optionsVar(config, {
                no: "effects",
                name: ttestOneSampleLegacy.t('effectsizes'),
                content: [
                    objects.showEffectSizes.el,
                    objects.label3.el,
                    objects.cohensdNoCorrection.el,
                    objects.cohensdCorrect.el,
                    objects.label4.el,
                    objects.hedgesgNoCorrection.el,
                    objects.hedgesgCorrect.el,
                ]
            })
        };
        var MissingVals = {
            el: new optionsVar(config, {
                no: "MissingVals",
                name: ttestOneSampleLegacy.t('MissingVals'),
                content: [
                    objects.label2.el,
                    objects.Analysis.el,
                    objects.Listwise.el,
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content,
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.less.el.content,
            objects.testval.el.content, objects.conf_level.el.content],
            bottom: [effectsizes.el.content, MissingVals.el.content],
            nav: {
                name: ttestOneSampleLegacy.t('navigation'),
                icon: "icon-t1",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ttestOneSampleLegacy.t('help.title'),
            r_help: ttestOneSampleLegacy.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: ttestOneSampleLegacy.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new ttestOneSampleLegacy().render()
}
