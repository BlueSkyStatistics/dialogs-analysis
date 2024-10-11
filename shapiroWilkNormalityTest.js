







class shapiroWilkNormalityTest extends baseModal {
    static dialogId = 'shapiroWilkNormalityTest'
    static t = baseModal.makeT(shapiroWilkNormalityTest.dialogId)

    constructor() {
        var config = {
            id: shapiroWilkNormalityTest.dialogId,
            label: shapiroWilkNormalityTest.t('title'),
            modalType: "two",
            RCode: `
{{dataset.name}} %>%
dplyr::select({{selected.tvarbox1 | safe}}) %>%
    BSky_Shapiro_Wilk_normality_test() %>%
    BSkyFormat()
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: shapiroWilkNormalityTest.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content],
            nav: {
                name: shapiroWilkNormalityTest.t('navigation'),
                icon: "icon-sw",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: shapiroWilkNormalityTest.t('help.title'),
            r_help: "help(data,package='utils')",
            body: shapiroWilkNormalityTest.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new shapiroWilkNormalityTest().render()
}
