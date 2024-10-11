








class summaryStatisticsByGroup extends baseModal {
    static dialogId = 'summaryStatisticsByGroup'
    static t = baseModal.makeT(summaryStatisticsByGroup.dialogId)

    constructor() {
        var config = {
            id: summaryStatisticsByGroup.dialogId,
            label: summaryStatisticsByGroup.t('title'),
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
                    label: summaryStatisticsByGroup.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Date|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: summaryStatisticsByGroup.t('tvarbox2'),
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
                name: summaryStatisticsByGroup.t('navigation'),
                icon: "icon-sigma-by-group",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: summaryStatisticsByGroup.t('help.title'),
            r_help: "help(data,package='utils')",
            body: summaryStatisticsByGroup.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new summaryStatisticsByGroup().render()
}
