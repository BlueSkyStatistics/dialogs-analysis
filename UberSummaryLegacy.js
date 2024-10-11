
class UberSummaryLegacy extends baseModal {
    static dialogId = 'UberSummaryLegacy'
    static t = baseModal.makeT(UberSummaryLegacy.dialogId)

    constructor() {
        var config = {
            id: UberSummaryLegacy.dialogId,
            label: UberSummaryLegacy.t('title'),
            modalType: "two",
            RCode: `
require(psych)
#BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}), stringsAsFactors = TRUE)
BSky_Numerical_Statistics_Analysis = BSkySummaryStats(datasetColumnObjects = list({{selected.tvarbox1 | safe}}), groupByColumnObjects = list({{selected.tvarbox2 | safe}}), stats = c(min={{selected.min | safe}}, max={{selected.max | safe}}, mean={{selected.mean | safe}}, median={{selected.median | safe}}, sum={{selected.sum | safe}}, sd={{selected.sd | safe}}, stderror={{selected.stderror | safe}}, skew ={{selected.skew | safe}}, mad = {{selected.mad | safe}}, kurtos = {{selected.kurtos | safe}}, iqr={{selected.iqr | safe}}, quantiles={{selected.quantile | safe}}), quantilesProbs = c({{selected.probs | safe}}), additionalStats = {{selected.addIsstatnames | safe}}, {{if (options.selected.ChkboxShowOnlyTopFewFactors)}}maxsum = {{selected.txtNumTopFactorsToShow | safe}}{{#else}}maxsum = 0{{/if}}, datasetName="{{dataset.name}}" )
#BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Numerical_Statistics_Analysis, singleTableOutputHeader=c("Numerical Statistical Analysis by Variable"))
#remove(BSky_Dataset_Overview)
#remove(BSky_Numerical_Statistics_Analysis )
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: UberSummaryLegacy.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "CustomFormat",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: UberSummaryLegacy.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "CustomFormat",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: UberSummaryLegacy.t('label1'), style: "mt-3", h: 5 }) },
            min: { el: new checkbox(config, { label: UberSummaryLegacy.t('min'), newline: true, no: "min", extraction: "Boolean" }) },
            max: { el: new checkbox(config, { label: UberSummaryLegacy.t('max'), newline: true, no: "max", extraction: "Boolean" }) },
            mean: { el: new checkbox(config, { label: UberSummaryLegacy.t('mean'), newline: true, no: "mean", extraction: "Boolean" }) },
            median: { el: new checkbox(config, { label: UberSummaryLegacy.t('median'), newline: true, no: "median", extraction: "Boolean" }) },
            sum: { el: new checkbox(config, { label: UberSummaryLegacy.t('sum'), newline: true, no: "sum", extraction: "Boolean" }) },
            sd: { el: new checkbox(config, { label: UberSummaryLegacy.t('sd'), newline: true, no: "sd", extraction: "Boolean" }) },
            stderror: { el: new checkbox(config, { label: UberSummaryLegacy.t('stderror'), newline: true, no: "stderror", extraction: "Boolean" }) },
            skew: { el: new checkbox(config, { label: UberSummaryLegacy.t('skew'), newline: true, no: "skew", extraction: "Boolean" }) },
            mad: { el: new checkbox(config, { label: UberSummaryLegacy.t('mad'), newline: true, no: "mad", extraction: "Boolean" }) },
            kurtos: { el: new checkbox(config, { label: UberSummaryLegacy.t('kurtos'), newline: true, no: "kurtos", extraction: "Boolean" }) },
            iqr: { el: new checkbox(config, { label: UberSummaryLegacy.t('iqr'), newline: true, no: "iqr", extraction: "Boolean" }) },
            quantiles: { el: new checkbox(config, { label: UberSummaryLegacy.t('quantiles'), newline: true, no: "quantile", extraction: "Boolean" }) },
            probs: {
                el: new input(config, {
                    no: 'probs',
                    label: UberSummaryLegacy.t('probs'),
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
                    label: UberSummaryLegacy.t('addIsstatnames'),
                    placeholder: "",
                    extraction: "CreateArray|RemoveSpaces",
                    allow_spaces: true,
                    value: ""
                })
            },
            label3: { el: new labelVar(config, { label: UberSummaryLegacy.t('label3'), style: "mt-2", h: 6 }) },
            ChkboxShowOnlyTopFewFactors: { el: new checkbox(config, { label: UberSummaryLegacy.t('ChkboxShowOnlyTopFewFactors'), style: "mt-3", dependant_objects: ['txtNumTopFactorsToShow'], no: "ChkboxShowOnlyTopFewFactors", checked: true, extraction: "Boolean" }) },
            txtNumTopFactorsToShow: {
                el: new inputSpinner(config, {
                    no: 'txtNumTopFactorsToShow',
                    label: UberSummaryLegacy.t('txtNumTopFactorsToShow'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { label: UberSummaryLegacy.t('label2'), style: "mb-3", h: 6 }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            bottom: [objects.label1.el.content, objects.min.el.content, objects.max.el.content, objects.mean.el.content, objects.median.el.content, objects.sum.el.content, objects.sd.el.content, objects.stderror.el.content,objects.skew.el.content,objects.mad.el.content, objects.kurtos.el.content,objects.iqr.el.content, objects.quantiles.el.content, objects.probs.el.content, objects.addIsstatnames.el.content, objects.ChkboxShowOnlyTopFewFactors.el.content, objects.label2.el.content, objects.txtNumTopFactorsToShow.el.content],
            nav: {
                name: UberSummaryLegacy.t('navigation'),
                icon: "icon-sigma",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: UberSummaryLegacy.t('help.title'),
            r_help: "help(data,package='utils')",
            body: UberSummaryLegacy.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new UberSummaryLegacy().render()
}
