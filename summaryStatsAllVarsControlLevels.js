/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */








class summaryStatsAllVarsControlLevels extends baseModal {
    static dialogId = 'summaryStatsAllVarsControlLevels'
    static t = baseModal.makeT(summaryStatsAllVarsControlLevels.dialogId)

    constructor() {
        var config = {
            id: summaryStatsAllVarsControlLevels.dialogId,
            label: summaryStatsAllVarsControlLevels.t('title'),
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
                    label: summaryStatsAllVarsControlLevels.t('levels'),
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
                name: summaryStatsAllVarsControlLevels.t('navigation'),
                icon: "icon-sigma-control",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: summaryStatsAllVarsControlLevels.t('help.title'),
            r_help: summaryStatsAllVarsControlLevels.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: summaryStatsAllVarsControlLevels.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new summaryStatsAllVarsControlLevels().render()
}
