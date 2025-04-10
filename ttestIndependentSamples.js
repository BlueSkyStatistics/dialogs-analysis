/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class ttestIndependentSamples extends baseModal {
    static dialogId = 'ttestIndependentSamples'
    static t = baseModal.makeT(ttestIndependentSamples.dialogId)

    constructor() {
        var config = {
            id: ttestIndependentSamples.dialogId,
            label: ttestIndependentSamples.t('title'),
            splitProcessing: false,
            modalType: "two",
            RCode: `
# Run the T-test
require(effectsize)
{{if (options.selected.showEffectSizes == "TRUE")}}
	
	{{dataset.name}} %>%
		dplyr::group_by({{selected.Target2 | safe}}) %>%
			dplyr::select({{selected.Target | safe}}, {{selected.Target2 | safe}}) %>%
				 BSkyIndSmTTest( 
					conf.level = {{selected.conflevel | safe}}, 
					alternative = '{{selected.gpbox2 | safe}}', 
					cohens_d = {{if (options.selected.cohensd =="0")}}TRUE{{#else}}FALSE{{/if}}, 
					cohensd_correction = {{if (options.selected.cohensd =="1")}}TRUE{{#else}}FALSE{{/if}},
					hedges_g = {{if (options.selected.hedgesg =="0")}}TRUE{{#else}}FALSE{{/if}}, 
					hedgesg_correction = {{if (options.selected.hedgesg =="1")}}TRUE{{#else}}FALSE{{/if}},
					glass_d = {{if (options.selected.glassd =="0")}}TRUE{{#else}}FALSE{{/if}},  
					glassd_correction = {{if (options.selected.glassd =="1")}}TRUE{{#else}}FALSE{{/if}},
					missing ={{selected.Missvals | safe}}, center = "{{selected.gpbox1 | safe}}",
					datasetNameOrDatasetGlobalIndex='{{dataset.name}}') %>%
						BSkyFormat()			
{{#else}}

	{{dataset.name}} %>%
		dplyr::group_by({{selected.Target2 | safe}}) %>%
			dplyr::select({{selected.Target | safe}}, {{selected.Target2 | safe}}) %>%
				 BSkyIndSmTTest(  
					conf.level = {{selected.conflevel | safe}}, 
					alternative = '{{selected.gpbox2 | safe}}', 
					missing ={{selected.Missvals | safe}}, center = "{{selected.gpbox1 | safe}}",
					datasetNameOrDatasetGlobalIndex='{{dataset.name}}') %>%
						BSkyFormat()
{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            Target: {
                el: new dstVariableList(config, {
                    label: ttestIndependentSamples.t('Target'),
                    no: "Target",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: ttestIndependentSamples.t('label1'), h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('test1'),
                    no: "gpbox2",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('test2'),
                    no: "gpbox2",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            less: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('test3'),
                    no: "gpbox2",
                    increment: "less",
                    value: "less",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            Target2: {
                el: new dstVariable(config, {
                    label: ttestIndependentSamples.t('Target2'),
                    no: "Target2",
                    required: true,
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                })
            },
            conf_level: {
                el: new inputSpinner(config, {
                    no: 'conflevel',
                    label: ttestIndependentSamples.t('conflevel'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { label: ttestIndependentSamples.t('label2'), h: 6 }) },
            Analysis: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('Analysis'),
                    no: "Missvals",
                    increment: "Analysis",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            Listwise: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('Listwise'),
                    no: "Missvals",
                    increment: "Listwise",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            showEffectSizes: {
                el: new checkbox(config, {
                    label: ttestIndependentSamples.t('showEffectSizes'),
                    no: "showEffectSizes",
                    newline: true,
                    extraction: "Boolean",
                })
            },
            label3: { el: new labelVar(config, { label: ttestIndependentSamples.t('label3'), style: "mb-1, mt-1", h: 6 }) },
            cohensdNoCorrection: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('cohensdNoCorrection'),
                    no: "cohensd",
                    increment: "cohensdNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            cohensdCorrect: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('cohensdCorrect'),
                    no: "cohensd",
                    increment: "cohensdCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            hedgesgNoCorrection: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('hedgesgNoCorrection'),
                    no: "hedgesg",
                    increment: "hedgesgNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            hedgesgCorrect: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('hedgesgCorrect'),
                    no: "hedgesg",
                    increment: "hedgesgCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label4: { el: new labelVar(config, { label: ttestIndependentSamples.t('label4'), style: "mb-1, mt-1", h: 6 }) },
            label5: { el: new labelVar(config, { label: ttestIndependentSamples.t('label5'), style: "mb-1, mt-1", h: 6 }) },
            glassdNoCorrection: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('glassdNoCorrection'),
                    no: "glassd",
                    increment: "glassdNoCorrection",
                    value: "0",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            glassdCorrect: {
                el: new radioButton(config, {
                    label: ttestIndependentSamples.t('glassdCorrect'),
                    no: "glassd",
                    increment: "glassdCorrect",
                    value: "1",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label21: { el: new labelVar(config, { label: ttestIndependentSamples.t('label21'), style: "mt-3",h: 5 }) },
            median: { el: new radioButton(config, { label: ttestIndependentSamples.t('median'), no: "gpbox1", increment: "median", value: "median", state: "", extraction: "ValueAsIs" }) },
            mean: { el: new radioButton(config, { label: ttestIndependentSamples.t('mean'), no: "gpbox1", increment: "mean", value: "mean", state: "checked", extraction: "ValueAsIs" }) },
        }
        var effectsizes = {
            el: new optionsVar(config, {
                no: "effects",
                name: ttestIndependentSamples.t('effectsizes'),
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
        var MissingVals = {
            el: new optionsVar(config, {
                no: "MissingVals",
                name: ttestIndependentSamples.t('MissingVals'),
                content: [
                    objects.label2.el,
                    objects.Analysis.el,
                    objects.Listwise.el,
                ]
            })
        };
        var LevenesTest = {
            el: new optionsVar(config, {
                no: "LevenesTest",
                name: ttestIndependentSamples.t('LevenesTest'),
                content: [
                    objects.label21.el,
                    objects.mean.el,
                    objects.median.el
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.Target.el.content, objects.Target2.el.content,
            objects.label1.el.content, objects.twosided.el.content, objects.greater.el.content, objects.less.el.content,
            objects.conf_level.el.content],
            bottom: [effectsizes.el.content, MissingVals.el.content, LevenesTest.el.content],
            nav: {
                name: ttestIndependentSamples.t('navigation'),
                icon: "icon-t2",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ttestIndependentSamples.t('help.title'),
            r_help: ttestIndependentSamples.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: ttestIndependentSamples.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new ttestIndependentSamples().render()
}
