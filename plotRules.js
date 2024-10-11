


class plotRules extends baseModal {
    static dialogId = 'plotRules'
    static t = baseModal.makeT(plotRules.dialogId)

    constructor() {
        var config = {
            id: plotRules.dialogId,
            label: plotRules.t('title'),
            modalType: "two",
            RCode: `
library(arules); 
library(arulesViz); 

plot({{selected.rulesobj | safe}}, method = "{{selected.methgrp | safe}}", engine = "{{selected.enggrp | safe}}", shading = {{selected.shgrp | safe}})

`
        }
		
        var objects = {
			// javanote: { 
			// 	el: new labelVar(config, { 
			// 		label: plotRules.t('javanote'), 
            //         no:"javanote",
			// 		style:"mt-2",
			// 		h: 5 
			// 	}) 
			// },

			rulesobj: {
                el: new input(config, {
                    no: 'rulesobj',
                    label: plotRules.t('rulesobj'),
                    value:"Rules1",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    type: "character"					
                }),
            },
			label1: { 
				el: new labelVar(config, { 
					label: plotRules.t('label1'), 
                    no:"label1",
					style:"mt-2",
					h: 5 
				}) 
			},					
		
			label2: { 
				el: new labelVar(config, { 
					label: plotRules.t('label2'), 
                    no:"label2",
					style:"mt-2",
					h: 5 
				}) 
			},					
		            

            scatterplot: { 
				el: new radioButton(config, { 
					label: plotRules.t('scatterplot'), 
					no: "methgrp", 
					increment: "scatterplot", 
					value: "scatterplot", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            twokeyplot: { 
				el: new radioButton(config, { 
					label: plotRules.t('twokeyplot'), 
					no: "methgrp", 
					increment: "twokeyplot", 
					value: "two-key plot", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            matrix: { 
				el: new radioButton(config, { 
					label: plotRules.t('matrix'), 
					no: "methgrp", 
					increment: "matrix", 
					value: "matrix", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            matrix3D: { 
				el: new radioButton(config, { 
					label: plotRules.t('matrix3D'), 
					no: "methgrp", 
					increment: "matrix3D", 
					value: "matrix3D", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            graph: { 
				el: new radioButton(config, { 
					label: plotRules.t('graph'), 
					no: "methgrp", 
					increment: "graph", 
					value: "graph", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
            paracoord: { 
				el: new radioButton(config, { 
					label: plotRules.t('paracoord'), 
					no: "methgrp", 
					increment: "paracoord", 
					value: "paracoord", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            grouped: { 
				el: new radioButton(config, { 
					label: plotRules.t('grouped'), 
					no: "methgrp", 
					increment: "grouped", 
					value: "grouped matrix", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            mosaic: { 
				el: new radioButton(config, { 
					label: plotRules.t('mosaic'), 
					no: "methgrp", 
					increment: "mosaic", 
					value: "mosaic", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            doubledecker: { 
				el: new radioButton(config, { 
					label: plotRules.t('doubledecker'), 
					no: "methgrp", 
					increment: "doubledecker", 
					value: "doubledecker", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},						
                    		
			
			
			label3: { 
				el: new labelVar(config, { 
					label: plotRules.t('label3'), 
                    no:"label3",
					style:"mt-2",
					h: 5 
				}) 
			},

            engggplot2: { 
				el: new radioButton(config, { 
					label: plotRules.t('engggplot2'), 
					no: "enggrp", 
					increment: "engggplot2", 
					value: "ggplot2", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
			
            engdefault: { 
				el: new radioButton(config, { 
					label: plotRules.t('engdefault'), 
					no: "enggrp", 
					increment: "engdefault", 
					value: "default", 
					state: "checked", 
					extraction: "ValueAsIs"
				}) 
			},	
	
            enghtmlwidget: { 
				el: new radioButton(config, { 
					label: plotRules.t('enghtmlwidget'), 
					no: "enggrp", 
					increment: "enghtmlwidget", 
					value: "htmlwidget", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
	
            engbase: { 
				el: new radioButton(config, { 
					label: plotRules.t('engbase'), 
					no: "enggrp", 
					increment: "engbase", 
					value: "base", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
            eng3d: { 
				el: new radioButton(config, { 
					label: plotRules.t('eng3d'), 
					no: "enggrp", 
					increment: "eng3d", 
					value: "3d", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
            engplotly: { 
				el: new radioButton(config, { 
					label: plotRules.t('engplotly'), 
					no: "enggrp", 
					increment: "engplotly", 
					value: "plotly", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},																				


            label4: { 
				el: new labelVar(config, { 
					label: plotRules.t('label4'), 
                    no:"label4",
					style:"mt-2",
					h: 5 
				}) 
			},


            lift: { 
				el: new radioButton(config, { 
					label: plotRules.t('lift'), 
					no: "shgrp", 
					increment: "lift", 
					value: '"lift"', 
					state: "checked", 
					extraction: "ValueAsIs"
				}) 
			},
			
            support: { 
				el: new radioButton(config, { 
					label: plotRules.t('support'), 
					no: "shgrp", 
					increment: "support", 
					value: '"support"', 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},	
            confidence: { 
				el: new radioButton(config, { 
					label: plotRules.t('confidence'), 
					no: "shgrp", 
					increment: "confidence", 
					value: '"confidence"', 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
			
            NA: { 
				el: new radioButton(config, { 
					label: plotRules.t('NA'), 
					no: "shgrp", 
					increment: "NA", 
					value: "NA", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},	            


            warn: { 
				el: new labelVar(config, { 
					label: plotRules.t('warn'), 
                    no:"warn",
					style:"mt-2",
					h: 5 
				}) 
			},
			
            
        }

        const content = {
            left: [],
            right: [],
			bottom: [ //objects.javanote.el.content, 
				objects.rulesobj.el.content, objects.label1.el.content,
                    objects.label2.el.content, 
                    objects.scatterplot.el.content, objects.twokeyplot.el.content,objects.matrix.el.content,objects.matrix3D.el.content,objects.graph.el.content,
                    objects.paracoord.el.content,objects.grouped.el.content, objects.mosaic.el.content, objects.doubledecker.el.content,
                    objects.label3.el.content,
					objects.engggplot2.el.content, objects.engdefault.el.content, 
					objects.enghtmlwidget.el.content, 
					objects.engbase.el.content, objects.eng3d.el.content, objects.engplotly.el.content,
                    objects.label4.el.content,objects.lift.el.content,objects.support.el.content,
                    objects.confidence.el.content,objects.NA.el.content,
                    objects.warn.el.content
                ],
            nav: {
                name: plotRules.t('navigation'),
                icon: "icon-line-dot-chart",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: plotRules.t('help.title'),
            r_help: "help(data,package='utils')",
            body: plotRules.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new plotRules().render()
}
