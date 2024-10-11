

class frequencyTable extends baseModal {
    static dialogId = 'frequencyTable'
    static t = baseModal.makeT(frequencyTable.dialogId)

    constructor() {
        var config = {
            id: frequencyTable.dialogId,
            label: frequencyTable.t('title'),
            modalType: "two",
            RCode:`
library(kableExtra) 
#Run the the frequency command   
{{dataset.name}} %>%
    dplyr::select({{selected.subsetvars | safe}}) %>%
      BSkyFrequency(order_by = c('{{selected.gpbox1 | safe}}'), decreasing = {{selected.selectSortOrderChk | safe}}) %>%
        BSkyFormat()

`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: frequencyTable.t('subsetvars'),
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
			label1: { 
				el: new labelVar(config, { 
					label: frequencyTable.t('label1'), 
					h: 6, 
					style: "mb-2",
				}) 
			},
			selectFreqSortRad: {
                el: new radioButton(config, {
                    label: frequencyTable.t('selectFreqSortRad'),
                    no: "gpbox1",
                    increment: "selectFreqSortRad",
                    value: "freq",
                    state: "checked",
					//style: "mb-3",
                    extraction: "ValueAsIs",
                })
            },
			selectVarSortRad: {
                el: new radioButton(config, {
                    label: frequencyTable.t('selectVarSortRad'),
                    no: "gpbox1",
                    increment: "selectVarSortRad",
                    value: "var",
                    state: "",
                    extraction: "ValueAsIs",
                })
            },
			selectNoSortRad: {
                el: new radioButton(config, {
                    label: frequencyTable.t('selectNoSortRad'),
                    no: "gpbox1",
                    increment: "selectNoSortRad",
                    value: "none",
					style: "mb-3",
                    state: "",
                    extraction: "ValueAsIs",
                })
            },
			selectSortOrderChk: {
                el: new checkbox(config, {
                    label: frequencyTable.t('selectSortOrderChk'),
                    no: "selectSortOrderChk",
                    style: "mb-3",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					state: "checked",
					newline: true,
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [
				objects.subsetvars.el.content,
				objects.label1.el.content,
				objects.selectFreqSortRad.el.content,
				objects.selectVarSortRad.el.content,
				objects.selectNoSortRad.el.content,
				objects.selectSortOrderChk.el.content,
			],
            nav: {
                name: frequencyTable.t('navigation'),
                icon: "icon-f",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: frequencyTable.t('help.title'),
            r_help: "help(data,package='utils')",
            body: frequencyTable.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new frequencyTable().render()
}
