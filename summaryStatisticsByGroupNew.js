
var localization = {
    en: {
        title: "Summary Statistics(old)",
        navigation: "Summary Statistics (Legacy)",
        tvarbox1: "Selected variables",
        tvarbox2: "Group by",
        ChkboxShowOnlyTopFewFactors: "Show counts for only top N factor levels",
        txtNumTopFactorsToShow: "Enter a value for N",
        label1: "Note: When the checkbox is un-checked counts for ALL levels will be displayed. This may take a considerable amount of time if you have many factor levels",
        help: {
            title: "Summary Statistics",
            r_help: "",
            body: `
<b>Description</b></br>
Generates the summaries for every group. One or more source variables are grouped by the destination variables. Shows Minimum, 1st Quartile, Median, Mean, 3rd Quartile, Maximum and count of NAs for numeric and date variables.</br>
R Help is not available because in we have written custom code using  multiple  R functions. If you need to inspect the code click the "<>" button.</br>
    `}
    }
}








class summaryStatisticsByGroupNew extends baseModal {
    constructor() {
        var config = {
            id: "summaryStatisticsByGroupNew",
            label: localization.en.title,
            modalType: "two",
            RCode: `
{{if (options.selected.tvarbox2 != "")}}
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}))
BSky_Summary_Statistics = by({{dataset.name}}[c({{selected.tvarbox1 | safe}})], list({{selected.tvarbox2 | safe}}), base::summary,{{if (options.selected.ChkboxShowOnlyTopFewFactors=="TRUE")}}maxsum ={{selected.txtNumTopFactorsToShow | safe}}{{#else}}maxsum = 1+max(sapply({{dataset.name}}[c({{selected.tvarbox1 | safe}})] [,sapply( {{dataset.name}}[c({{selected.tvarbox1 | safe}})], is.factor)], nlevels  )){{/if}})
BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Summary_Statistics, singleTableOutputHeader=c("Summary Statistics by Group"))
#remove(BSky_Dataset_Overview)
#remove(BSky_Summary_Statistics)
{{#else}}
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}))
BSky_Summary_By_Variable <- ftable(summary({{dataset.name}}[c({{selected.tvarbox1 | safe}})], {{if (options.selected.ChkboxShowOnlyTopFewFactors=="TRUE")}}maxsum ={{selected.txtNumTopFactorsToShow | safe}}{{#else}}maxsum = 1+max(sapply({{dataset.name}}[c({{selected.tvarbox1 | safe}})] [,sapply( {{dataset.name}}[c({{selected.tvarbox1 | safe}})], is.factor)], nlevels  )){{/if}} ))
BSky_Summary_By_Variable[is.na(BSky_Summary_By_Variable[])]=c("")
BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Summary_By_Variable, singleTableOutputHeader=c("Summary By Variable"))
{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "Prefix|UseComma",
                    }), r: ['{{ var | safe}}']
            },
            ChkboxShowOnlyTopFewFactors: { el: new checkbox(config, { label: localization.en.ChkboxShowOnlyTopFewFactors, dependant_objects: ['txtNumTopFactorsToShow'], no: "ChkboxShowOnlyTopFewFactors", checked: true, extraction: "Boolean" }) },
            txtNumTopFactorsToShow: {
                el: new inputSpinner(config, {
                    no: 'txtNumTopFactorsToShow',
                    label: localization.en.txtNumTopFactorsToShow,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mb-3",h: 6 }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content,objects.ChkboxShowOnlyTopFewFactors.el.content, objects.label1.el.content, objects.txtNumTopFactorsToShow.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sigma",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new summaryStatisticsByGroupNew().render()