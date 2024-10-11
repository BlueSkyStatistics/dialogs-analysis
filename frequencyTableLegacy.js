

class frequencyTableLegacy extends baseModal {
    static dialogId = 'frequencyTableLegacy'
    static t = baseModal.makeT(frequencyTableLegacy.dialogId)

    constructor() {
        var config = {
            id: frequencyTableLegacy.dialogId,
            label: frequencyTableLegacy.t('title'),
            modalType: "two",
            RCode: `
#Run the the frequency command            
BSkyFreqResults <- BSkyFrequency( vars = c({{selected.subsetvars | safe}}) , data = {{dataset.name}})
#Display the results
BSkyFormat(BSkyFreqResults)
#Remove the temporary object
if (exists('BSkyFreqResults')) rm (BSkyFreqResults)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: frequencyTableLegacy.t('subsetvars'),
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
                name: frequencyTableLegacy.t('navigation'),
                icon: "icon-f",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: frequencyTableLegacy.t('help.title'),
            r_help: "help(data,package='utils')",
            body: frequencyTableLegacy.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new frequencyTableLegacy().render()
}
