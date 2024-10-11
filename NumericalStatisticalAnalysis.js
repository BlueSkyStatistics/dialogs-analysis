









class NumericalStatisticalAnalysis extends baseModal {
    static dialogId = 'NumericalStatisticalAnalysis'
    static t = baseModal.makeT(NumericalStatisticalAnalysis.dialogId)

    constructor() {
        var config = {
            id: NumericalStatisticalAnalysis.dialogId,
            label: NumericalStatisticalAnalysis.t('title'),
            modalType: "two",
            RCode: `
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}), stringsAsFactors = TRUE)
BSky_Numerical_Statistics_Analysis = BSkySummaryStats(datasetColumnObjects = list({{selected.tvarbox1 | safe}}), groupByColumnObjects = list({{selected.tvarbox2 | safe}}), stats = c(min={{selected.min | safe}}, max={{selected.max | safe}}, mean={{selected.mean | safe}}, median={{selected.median | safe}}, sum={{selected.sum | safe}}, sd={{selected.sd | safe}}, stderror={{selected.stderror | safe}}, iqr={{selected.iqr | safe}}, quantiles={{selected.quantile | safe}}), quantilesProbs = c({{selected.probs | safe}}), additionalStats = c({{selected.addIsstatnames | safe}}), datasetName="{{dataset.name}}" )
BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Numerical_Statistics_Analysis, singleTableOutputHeader=c("Numerical Statistical Analysis by Variable"))
#remove(BSky_Dataset_Overview)
#remove(BSky_Numerical_Statistics_Analysis )
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: NumericalStatisticalAnalysis.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "CustomFormat",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: NumericalStatisticalAnalysis.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "CustomFormat",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: NumericalStatisticalAnalysis.t('label1'), style: "mt-3",h: 5 }) },
            min: { el: new checkbox(config, { label: NumericalStatisticalAnalysis.t('min'), newline:true,no: "min", extraction: "Boolean" }) },
            max: { el: new checkbox(config, { label: NumericalStatisticalAnalysis.t('max'), newline:true,no: "max", extraction: "Boolean" }) },
            mean: { el: new checkbox(config, { label: NumericalStatisticalAnalysis.t('mean'), newline:true,no: "mean", extraction: "Boolean" }) },
            median: { el: new checkbox(config, { label: NumericalStatisticalAnalysis.t('median'), newline:true,no: "median", extraction: "Boolean" }) },
            sum: { el: new checkbox(config, { label: NumericalStatisticalAnalysis.t('sum'), newline:true,no: "sum", extraction: "Boolean" }) },
            sd: { el: new checkbox(config, { label: NumericalStatisticalAnalysis.t('sd'), newline:true,no: "sd", extraction: "Boolean" }) },
            stderror: { el: new checkbox(config, { label: NumericalStatisticalAnalysis.t('stderror'), newline:true,no: "stderror", extraction: "Boolean" }) },
            iqr: { el: new checkbox(config, { label: NumericalStatisticalAnalysis.t('iqr'), newline:true,no: "iqr", extraction: "Boolean" }) },
            quantiles: { el: new checkbox(config, { label: NumericalStatisticalAnalysis.t('quantiles'), newline:true,no: "quantile", extraction: "Boolean" }) },
            probs: {
                el: new input(config, {
                    no: 'probs',
                    label: NumericalStatisticalAnalysis.t('probs'),
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: "0, 0.25, 0.5, 0.75, 1"
                })
            },
            addIsstatnames: {
                el: new input(config, {
                    no: 'addIsstatnames',
                    label: NumericalStatisticalAnalysis.t('addIsstatnames'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            bottom: [objects.label1.el.content, objects.min.el.content, objects.max.el.content, objects.mean.el.content, objects.median.el.content, objects.sum.el.content, objects.sd.el.content, objects.stderror.el.content, objects.iqr.el.content, objects.quantiles.el.content, objects.probs.el.content, objects.addIsstatnames.el.content],
            nav: {
                name: NumericalStatisticalAnalysis.t('navigation'),
                icon: "icon-sigma",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: NumericalStatisticalAnalysis.t('help.title'),
            r_help: "help(data,package='utils')",
            body: NumericalStatisticalAnalysis.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new NumericalStatisticalAnalysis().render()
}
