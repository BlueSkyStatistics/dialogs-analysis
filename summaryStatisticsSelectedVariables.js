







class summaryStatisticsSelectedVariables extends baseModal {
    static dialogId = 'summaryStatisticsSelectedVariables'
    static t = baseModal.makeT(summaryStatisticsSelectedVariables.dialogId)

    constructor() {
        var config = {
            id: summaryStatisticsSelectedVariables.dialogId,
            label: summaryStatisticsSelectedVariables.t('title'),
            modalType: "two",
            RCode: `
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}))
BSky_Summary_By_Variable <- ftable(summary({{dataset.name}}[c({{selected.subsetvars | safe}})], maxsum =  1+max(sapply( {{dataset.name}}[c({{selected.subsetvars | safe}})] [,sapply( {{dataset.name}}[c({{selected.subsetvars | safe}})], is.factor)], nlevels  )) ))
BSky_Summary_By_Variable[is.na(BSky_Summary_By_Variable[])]=c("")
BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Summary_By_Variable, singleTableOutputHeader=c("Summary By Variable"))
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: summaryStatisticsSelectedVariables.t('subsetvars'),
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.subsetvars.el.content],
            nav: {
                name: summaryStatisticsSelectedVariables.t('navigation'),
                icon: "icon-sigma-variables",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: summaryStatisticsSelectedVariables.t('help.title'),
            r_help: summaryStatisticsSelectedVariables.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: summaryStatisticsSelectedVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new summaryStatisticsSelectedVariables().render()
}
