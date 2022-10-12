
var localization = {
    en: {
        title: "Summary Statistics By Group",
        navigation: "Summary Statistics By Group (Legacy)",
        tvarbox1: "Selected variables",
        tvarbox2: "Group by",
        help: {
            title: "Summary Statistics By Group",
            r_help: "",
            body: `
<b>Description</b></br>
Generates the summaries for every group. One or more source variables are grouped by the destination variables. Shows Minimum, 1st Quartile, Median, Mean, 3rd Quartile, Maximum and count of NAs for numeric and date variables.</br>
R Help is not available because in we have written custom code using  multiple  R functions. If you need to inspect the code click the "<>" button.</br>
    `}
    }
}







class summaryStatisticsByGroup extends baseModal {
    constructor() {
        var config = {
            id: "summaryStatisticsByGroup",
            label: localization.en.title,
            modalType: "two",
            RCode: `
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}))
BSky_Summary_Statistics = by({{dataset.name}}[c({{selected.tvarbox1 | safe}})], list({{selected.tvarbox2 | safe}}), base::summary)
BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Summary_Statistics, singleTableOutputHeader=c("Summary Statistics by Group"))
#remove(BSky_Dataset_Overview)
#remove(BSky_Summary_Statistics)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Date|Ordinal|Nominal|Scale",
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
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sigma-by-group",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new summaryStatisticsByGroup().render()