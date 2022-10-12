
var localization = {
    en: {
        title: "Summary Statistics, control levels",
        navigation: "Summary Statistics, all variables, control levels (Legacy)",
        levels: "Specify the number of levels to display counts for factor variables. NOTE: Less frequent levels of factor variables are summarized in the (Other) category.",
        help: {
            title: "Summary Statistics, control levels",
            r_help: "",
            body: `
    <b>Description</b></br>
    Generates the summaries for all dataset variables while allowing you to control the number of levels for which counts are displayed.</br>
    NOTE: COUNTS OF LESS FREQUENT VARIABLES ARE SUMMARIZED IN THE (OTHER) CATEGORY</br>
    Shows Minimum, 1st Quartile, Median, Mean, 3rd Quartile, Maximum and count of NAs for numeric and date variables.</br>
    For factor variable it displays the counts of each level.</br>
    For logical variable it displays the counts of TRUE, FALSE and NAs</br>
    R Help is not available because in we have written custom code using  multiple  R functions. If you need to inspect the code click the "<>" button.</br>
    `}
    }
}





class summaryStatsAllVarsControlLevels extends baseModal {
    constructor() {
        var config = {
            id: "summaryStatsAllVarsControlLevels",
            label: localization.en.title,
            modalType: "one",
            RCode: `
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}))
BSky_Dataset_Summary = ftable(summary( {{dataset.name}}, maxsum={{selected.levels | safe}}))
BSky_Dataset_Summary[is.na(BSky_Dataset_Summary[])]=c("")
BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Dataset_Summary, singleTableOutputHeader=c("Summary for All Variables"))
#remove(BSky_Dataset_Overview)
`
        }
        var objects = {
                levels: {
                el: new inputSpinner(config, {
                    no: 'levels',
                    label: localization.en.levels,
                    min: 1,
                    max: 9999999,
                    required: true,
                    step: 1,
                    value: 15,
                    extraction: "NoPrefix|UseComma"
                })
            },
        }
        const content = {
            items: [objects.levels.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sigma-control",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new summaryStatsAllVarsControlLevels().render()