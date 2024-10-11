









class sumStatsSelectVarsCtrlLevels extends baseModal {
    static dialogId = 'sumStatsSelectVarsCtrlLevels'
    static t = baseModal.makeT(sumStatsSelectVarsCtrlLevels.dialogId)

    constructor() {
        var config = {
            id: sumStatsSelectVarsCtrlLevels.dialogId,
            label: sumStatsSelectVarsCtrlLevels.t('title'),
            modalType: "two",
            RCode: `
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}))
BSky_Summary_By_Variable <- ftable(summary({{dataset.name}}[c({{selected.subsetvars | safe}})], maxsum={{selected.levels | safe}}))
BSky_Summary_By_Variable[is.na(BSky_Summary_By_Variable[])]=c("")
BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Summary_By_Variable, singleTableOutputHeader=c("Summary By Variable"))
#remove(BSky_Dataset_Overview)
#remove(BSky_Summary_By_Variable)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: sumStatsSelectVarsCtrlLevels.t('subsetvars'),
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            levels: {
                el: new inputSpinner(config, {
                    no: 'levels',
                    label: sumStatsSelectVarsCtrlLevels.t('levels'),
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
            left: [objects.content_var.el.content],
            right: [objects.subsetvars.el.content, objects.levels.el.content],
            nav: {
                name: sumStatsSelectVarsCtrlLevels.t('navigation'),
                icon: "icon-sigma-control-variables",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: sumStatsSelectVarsCtrlLevels.t('help.title'),
            r_help: "help(data,package='utils')",
            body: sumStatsSelectVarsCtrlLevels.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new sumStatsSelectVarsCtrlLevels().render()
}
