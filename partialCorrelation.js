








class partialCorrelation extends baseModal {
    static dialogId = 'partialCorrelation'
    static t = baseModal.makeT(partialCorrelation.dialogId)

    constructor() {
        var config = {
            id: partialCorrelation.dialogId,
            label: partialCorrelation.t('title'),
            modalType: "two",
            RCode: `
library(ppcor)
local({
#Removing the temporary object if it exists
if (exists("BSkyTemp", envir = .GlobalEnv))
{ 
    rm(BSkyTemp, envir = .GlobalEnv)    
}
##Removing missing values
BSkyTemp <<- na.omit({{dataset.name}}[,c({{selected.tvarbox1 | safe }},{{selected.tvarbox2 | safe}})])
#Running the test
BSkyResults <- BSkyPartialSemiCorrelations ( vars = c({{selected.tvarbox1 | safe }}), constants = c({{selected.tvarbox2 | safe}}), 
    type = "semipartial", method = {{selected.statistic | safe}}, data = "BSkyTemp")
#Formatting the results
BSkyFormat(BSkyResults, "Results")
#Removing the R object after displaying the results
if (exists("BSkyResults"))
{
    rm(BSkyResults)
}
})
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            statistic: {
                el: new selectVar(config, {
                    no: 'statistic',
                    label: partialCorrelation.t('statistic'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma|Enclosed",
                    options: ["pearson", "kendall", "spearman"],
                    default: "pearson"
                })
            },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: partialCorrelation.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: partialCorrelation.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.statistic.el.content, objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            nav: {
                name: partialCorrelation.t('navigation'),
                icon: "icon-semi-partial",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: partialCorrelation.t('help.title'),
            r_help: partialCorrelation.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: partialCorrelation.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new partialCorrelation().render()
}
