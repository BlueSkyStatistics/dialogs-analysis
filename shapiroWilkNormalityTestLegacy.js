







class shapiroWilkNormalityTestLegacy extends baseModal {
    static dialogId = 'shapiroWilkNormalityTestLegacy'
    static t = baseModal.makeT(shapiroWilkNormalityTestLegacy.dialogId)

    constructor() {
        var config = {
            id: shapiroWilkNormalityTestLegacy.dialogId,
            label: shapiroWilkNormalityTestLegacy.t('title'),
            modalType: "two",
            RCode: `
BSkyResults <-BSky_Shapiro_Wilk_normality_test(vars = c({{selected.tvarbox1 | safe}}), dataset=c('{{dataset.name}}'))
BSkyFormat(BSkyResults)
#remove (BSkyResults)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: shapiroWilkNormalityTestLegacy.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content],
            nav: {
                name: shapiroWilkNormalityTestLegacy.t('navigation'),
                icon: "icon-sw",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: shapiroWilkNormalityTestLegacy.t('help.title'),
            r_help: "help(data,package='utils')",
            body: shapiroWilkNormalityTestLegacy.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new shapiroWilkNormalityTestLegacy().render()
}
