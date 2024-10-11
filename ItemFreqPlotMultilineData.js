


class ItemFreqPlotMultilineData extends baseModal {
    static dialogId = 'ItemFreqPlotMultilineData'
    static t = baseModal.makeT(ItemFreqPlotMultilineData.dialogId)

    constructor() {
        var config = {
            id: ItemFreqPlotMultilineData.dialogId,
            label: ItemFreqPlotMultilineData.t('title'),
            modalType: "two",
            RCode: `
library(arules);
local(
{
    T1 <- BSkyReadTransactions(datasetname = '{{dataset.name}}', format = 'single',  cols = c('{{selected.idcolname | safe}}','{{selected.itemcolname | safe}}'))
    
    # Item Frequency Plot
    itemFrequencyPlot(T1, topN = {{selected.topN | safe}}, type = "{{selected.typegrp | safe}}", horiz = {{selected.horizcheck | safe}})
}
)                
`
        }
		
        var objects = {
            content_var: { 
			el: new srcVariableList(config, {
                    label: ItemFreqPlotMultilineData.t('src'),
                    no: "src",
					action: "move"
				}) 
			},
            idcolname: {
                el: new dstVariable(config, {
                    label: ItemFreqPlotMultilineData.t('idcolname'),
                    no: "idcolname",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
	
            itemcolname: {
                el: new dstVariable(config, {
                    label: ItemFreqPlotMultilineData.t('itemcolname'),
                    no: "itemcolname",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            }, 
			
            plotOpts: { 
				el: new labelVar(config, { 
					label: ItemFreqPlotMultilineData.t('plotOpts'), 
                    no: "plotOpts",
					style:"mt-2",h: 5 
				}) 
			},		
			topN: {
                el: new inputSpinner(config, {
                    no: 'topN',
                    label: ItemFreqPlotMultilineData.t('topN'),
                    min: 0,
                    max: 9999999,
                    step: 0.1,
                    value: 20,
                    extraction: "NoPrefix|UseComma"
                })
            },			
		
			horizcheck: { 
				el: new checkbox(config, { 
					label: ItemFreqPlotMultilineData.t('horizcheck'), 
					newline:true, 
                    no: "horizcheck", 
					extraction: "Boolean" 
					}) 
			},

			
            freqtype: { 
				el: new labelVar(config, { 
					label: ItemFreqPlotMultilineData.t('freqtype'), 
                    no: "freqtype",
					style:"mt-2",h: 5 
				}) 
			},


            rd1: { 
				el: new radioButton(config, { 
					label: ItemFreqPlotMultilineData.t('relative'), 
					no: "typegrp", 
					increment: "rd1", 
					value: "relative", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd2: { 
				el: new radioButton(config, { 
					label: ItemFreqPlotMultilineData.t('absolute'), 
					no: "typegrp", 
					increment: "rd2", 
					value: "absolute", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			}
        }

		const content = {
            left: [objects.content_var.el.content],
            right: [objects.idcolname.el.content, objects.itemcolname.el.content],
			bottom: [objects.plotOpts.el.content, objects.topN.el.content, objects.horizcheck.el.content, 
			objects.freqtype.el.content, objects.rd1.el.content, objects.rd2.el.content],
            nav: {
                name: ItemFreqPlotMultilineData.t('navigation'),
                icon: "icon-line-dot-chart",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ItemFreqPlotMultilineData.t('help.title'),
            r_help: "help(data,package='utils')",
            body: ItemFreqPlotMultilineData.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new ItemFreqPlotMultilineData().render()
}
