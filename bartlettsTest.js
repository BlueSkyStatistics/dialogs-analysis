








class bartlettsTest extends baseModal {
    static dialogId = 'bartlettsTest'
    static t = baseModal.makeT(bartlettsTest.dialogId)

    constructor() {
        var config = {
            id: bartlettsTest.dialogId,
            label: bartlettsTest.t('title'),
            modalType: "two",
            RCode: `
BSky_Variance = by({{dataset.name}}[c('{{selected.tvarbox1 | safe}}')], list({{selected.tvarbox2 | safe}}),  stats::var, na.rm=TRUE)
BSky_Bartlett_Test = bartlett.test({{selected.tvarbox1 | safe}} ~ interaction({{selected.tvarbox2 | safe}}), data={{dataset.name}})
BSkyFormat(BSky_Variance, singleTableOutputHeader='Variance')
BSkyFormat(BSky_Bartlett_Test )
#remove(BSky_Variance)
#remove(BSky_Bartlett_Test )
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: bartlettsTest.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Date|Logical|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: bartlettsTest.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "Prefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            nav: {
                name: bartlettsTest.t('navigation'),
                icon: "icon-b",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: bartlettsTest.t('help.title'),
            r_help: bartlettsTest.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: bartlettsTest.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new bartlettsTest().render()
}
