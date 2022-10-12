
var localization = {
    en: {
        title: "Summary Statistics",
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








class summaryStatisticsByGroupLatest extends baseModal {
    constructor() {
        var config = {
            id: "summaryStatisticsByGroupLatest",
            label: localization.en.title,
            modalType: "two",
            RCode: `
{{if (options.selected.tvarbox2 != "")}}
BSky_Summary_Statistics = BSkyVariableSummaryStats(data = {{dataset.name}}, vars = c({{selected.tvarbox1b | safe}}), group_by_vars = c({{selected.tvarbox2b | safe}}), {{if (options.selected.ChkboxShowOnlyTopFewFactorsb=="TRUE")}}maxsum = {{selected.txtNumTopFactorsToShowb | safe}}{{#else}}maxsum = 0{{/if}})
BSkyFormat(BSky_Summary_Statistics, singleTableOutputHeader=c("Summary Statistics by Group"))
#remove(BSky_Summary_Statistics)
{{#else}}
BSky_Summary_Statistics = BSkyVariableSummaryStats(data = {{dataset.name}}, vars = c({{selected.tvarbox1b | safe}}), {{if (options.selected.ChkboxShowOnlyTopFewFactors=="TRUE")}}maxsum ={{selected.txtNumTopFactorsToShow | safe}}{{#else}}maxsum = 0 {{/if}}))
BSkyFormat(BSky_Summary_Statistics, singleTableOutputHeader=c("Summary Statistics by Group"))
{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1b",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2b",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    }), r: ['{{ var | safe}}']
            },
            ChkboxShowOnlyTopFewFactors: { el: new checkbox(config, { label: localization.en.ChkboxShowOnlyTopFewFactors, dependant_objects: ['txtNumTopFactorsToShowb'], no: "ChkboxShowOnlyTopFewFactorsb", checked: true, extraction: "Boolean" }) },
            txtNumTopFactorsToShow: {
                el: new inputSpinner(config, {
                    no: 'txtNumTopFactorsToShowb',
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
module.exports.item = new summaryStatisticsByGroupLatest().render()