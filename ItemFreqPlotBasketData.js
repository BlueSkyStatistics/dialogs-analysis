/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class ItemFreqPlotBasketData extends baseModal {
    static dialogId = 'ItemFreqPlotBasketData'
    static t = baseModal.makeT(ItemFreqPlotBasketData.dialogId)

    constructor() {
        var config = {
            id: ItemFreqPlotBasketData.dialogId,
            label: ItemFreqPlotBasketData.t('title'),
            modalType: "two",
            RCode: `
library(arules);

local(
{
    T1 <- BSkyReadTransactions(datasetname = '{{selected.datasetcol | safe}}', format = 'basket', sep = "{{selected.separator | safe}}")
    
    # Item Frequency Plot
    itemFrequencyPlot(T1, topN = {{selected.topN | safe}}, type = "{{selected.typegrp | safe}}", horiz = {{selected.horizcheck | safe}})
}
)
`
        }
		
        var objects = {
            content_var: { 
			el: new srcVariableList(config, {
                    label: ItemFreqPlotBasketData.t('src'),
                    no: "src",
					action: "move"
				}) 
			},
            datasetcol: {
                el: new dstVariable(config, {
                    label: ItemFreqPlotBasketData.t('datasetcol'),
                    no: "datasetcol",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "Prefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
	
			separator: {
                el: new input(config, {
                    no: 'separator',
                    label: ItemFreqPlotBasketData.t('separator'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    Type: "character",                  
                    value: ","
                }),
            },
			
            plotOpts: { 
				el: new labelVar(config, { 
					label: ItemFreqPlotBasketData.t('plotOpts'), 
                    no: "plotOpts",
					style:"mt-2",h: 5 
				}) 
			},		
			topN: {
                el: new inputSpinner(config, {
                    no: 'topN',
                    label: ItemFreqPlotBasketData.t('topN'),
                    min: 0,
                    max: 9999999,
                    step: 0.1,
                    value: 20,
                    extraction: "NoPrefix|UseComma"
                })
            },			
		
			horizcheck: { 
				el: new checkbox(config, { 
					label: ItemFreqPlotBasketData.t('horizcheck'), 
					newline:true, 
                    no: "horizcheck", 
					extraction: "Boolean" 
					}) 
			},

			
            freqtype: { 
				el: new labelVar(config, { 
					label: ItemFreqPlotBasketData.t('freqtype'), 
                    no: "freqtype",
					style:"mt-2",h: 5 
				}) 
			},


            rd1: { 
				el: new radioButton(config, { 
					label: ItemFreqPlotBasketData.t('relative'), 
					no: "typegrp", 
					increment: "rd1", 
					value: "relative", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd2: { 
				el: new radioButton(config, { 
					label: ItemFreqPlotBasketData.t('absolute'), 
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
            right: [objects.datasetcol.el.content, objects.separator.el.content],
			bottom: [objects.plotOpts.el.content, objects.topN.el.content, objects.horizcheck.el.content, 
			objects.freqtype.el.content, objects.rd1.el.content, objects.rd2.el.content],
            nav: {
                name: ItemFreqPlotBasketData.t('navigation'),
                icon: "icon-line-dot-chart",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ItemFreqPlotBasketData.t('help.title'),
            r_help: ItemFreqPlotBasketData.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: ItemFreqPlotBasketData.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new ItemFreqPlotBasketData().render()
}
