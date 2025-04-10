/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class UberSummary extends baseModal {
    static dialogId = 'UberSummary'
    static t = baseModal.makeT(UberSummary.dialogId)

    constructor() {
        var config = {
            id: UberSummary.dialogId,
            label: UberSummary.t('title'),
            modalType: "two",
            RCode: `
require(psych);
require(dplyr);

cv <<- function(x, na.rm = TRUE)  {
			sd(x, na.rm = na.rm)/mean(x, na.rm = na.rm)
}

{{dataset.name}} %>%
dplyr::group_by({{selected.tvarbox2 | safe}}) %>%
    dplyr::select({{selected.tvarbox1 | safe}},{{selected.tvarbox2 | safe}}) %>%
        BSkySummaryStats(stats = c(min={{selected.min | safe}}, 
                                        max={{selected.max | safe}}, 
                                        mean={{selected.mean | safe}}, 
                                        median={{selected.median | safe}}, 
                                        sum={{selected.sum | safe}}, 
                                        sd={{selected.sd | safe}}, 
                                        stderror={{selected.stderror | safe}}, 
                                        skew={{selected.skew | safe}},
                                        mad={{selected.mad | safe}},
                                        kurtos={{selected.kurtos | safe}},
                                        iqr={{selected.iqr | safe}}, 
                                        quantiles={{selected.quantile | safe}}), 
                                    quantilesProbs = c({{selected.probs | safe}}), 
                                    {{if (options.selected.ChkboxShowOnlyTopFewFactors=="TRUE")}}maxsum = {{selected.txtNumTopFactorsToShow | safe}}{{#else}}maxsum = 0{{/if}}, datasetName="{{dataset.name}}",
                                    additionalStats = {{selected.addIsstatnames | safe}},
                                    long_table={{selected.longTbl | safe}}) %>%
            BSkyFormat()                        
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: UberSummary.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: UberSummary.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },

            label1: { el: new labelVar(config, { label: UberSummary.t('label1'), style: "mt-3", h: 5 }) },
            min: { el: new checkbox(config, { label: UberSummary.t('min'), state:"checked", newline: true, no: "min", extraction: "Boolean" }) },
            max: { el: new checkbox(config, { label: UberSummary.t('max'), state:"checked", newline: true, no: "max", extraction: "Boolean" }) },
            mean: { el: new checkbox(config, { label: UberSummary.t('mean'), state:"checked", newline: true, no: "mean", extraction: "Boolean" }) },
            median: { el: new checkbox(config, { label: UberSummary.t('median'), newline: true,state:"checked", no: "median", extraction: "Boolean" }) },
            sum: { el: new checkbox(config, { label: UberSummary.t('sum'), newline: true, no: "sum", extraction: "Boolean" }) },
            sd: { el: new checkbox(config, { label: UberSummary.t('sd'), newline: true, state:"checked", no: "sd", extraction: "Boolean" }) },
            stderror: { el: new checkbox(config, { label: UberSummary.t('stderror'), newline: true, state:"checked", no: "stderror", extraction: "Boolean" }) },
            skew: { el: new checkbox(config, { label: UberSummary.t('skew'), newline: true, no: "skew", extraction: "Boolean" }) },
            mad: { el: new checkbox(config, { label: UberSummary.t('mad'), newline: true, no: "mad", extraction: "Boolean" }) },
            kurtos: { el: new checkbox(config, { label: UberSummary.t('kurtos'), newline: true, no: "kurtos", extraction: "Boolean" }) },
            iqr: { el: new checkbox(config, { label: UberSummary.t('iqr'), newline: true, no: "iqr", extraction: "Boolean" }) },
            quantiles: { el: new checkbox(config, { label: UberSummary.t('quantiles'), newline: true,state:"checked", no: "quantile", extraction: "Boolean" }) },
            probs: {
                el: new input(config, {
                    no: 'probs',
                    label: UberSummary.t('probs'),
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    allow_spaces: true,
                    value: "0, 0.25, 0.5, 0.75, 1"
                })
            },
            addIsstatnames: {
                el: new input(config, {
                    no: 'addIsstatnames',
                    label: UberSummary.t('addIsstatnames'),
                    placeholder: "",
                    extraction: "CreateArray|RemoveSpaces",
                    allow_spaces: true,
                    value: "cv, var"
                })
            },
            label3: { el: new labelVar(config, { label: UberSummary.t('label3'), style: "mt-2", h: 6 }) },
            ChkboxShowOnlyTopFewFactors: { el: new checkbox(config, { label: UberSummary.t('ChkboxShowOnlyTopFewFactors'), style: "mt-3", dependant_objects: ['txtNumTopFactorsToShow'], no: "ChkboxShowOnlyTopFewFactors", required: true, state:"checked",extraction: "Boolean" }) },
            txtNumTopFactorsToShow: {
                el: new inputSpinner(config, {
                    no: 'txtNumTopFactorsToShow',
                    label: UberSummary.t('txtNumTopFactorsToShow'),
                    style: "ml-2 mb-1",
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { label: UberSummary.t('label2'), style: "mb-3", h: 6 }) },
            longTbl: { el: new checkbox(config, {
                label: UberSummary.t('label4'),
                style: "mt-2",
                no: "longTbl",
                extraction: "Boolean",
            })},            
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            bottom: [objects.label1.el.content, objects.min.el.content, objects.max.el.content, 
                objects.mean.el.content, objects.median.el.content, 
                objects.sum.el.content, objects.sd.el.content, 
                objects.stderror.el.content,objects.skew.el.content,objects.mad.el.content, 
                objects.kurtos.el.content,objects.iqr.el.content, objects.quantiles.el.content, 
                objects.probs.el.content, objects.addIsstatnames.el.content, objects.ChkboxShowOnlyTopFewFactors.el.content, 
                objects.label2.el.content, objects.txtNumTopFactorsToShow.el.content,
                objects.longTbl.el.content,
            ],
            nav: {
                name: UberSummary.t('navigation'),
                icon: "icon-sigma",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: UberSummary.t('help.title'),
            r_help: UberSummary.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: UberSummary.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new UberSummary().render()
}
