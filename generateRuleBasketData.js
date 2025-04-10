/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class generateRuleBasketData extends baseModal {
    static dialogId = 'generateRuleBasketData'
    static t = baseModal.makeT(generateRuleBasketData.dialogId)

    constructor() {
        var config = {
            id: generateRuleBasketData.dialogId,
            label: generateRuleBasketData.t('title'),
            modalType: "two",
            RCode: `
library(arules);
library(arulesViz);
local(
{
    T1 <- BSkyReadTransactions(datasetname = '{{selected.datasetcol | safe}}', format = 'basket', sep = "{{selected.separator | safe}}")

    {{selected.rulesobj | safe}} <<- arules::apriori(T1, parameter = list(supp = {{selected.support | safe}}, conf = {{selected.confidence | safe}}, minlen = {{selected.minlen | safe}}, maxlen = {{selected.maxlen | safe}}))
    
    ## Sorting

    {{selected.rulesobj | safe}}  <<- arules::sort( {{selected.rulesobj | safe}}, decreasing = {{selected.ordergrp | safe}}, by = c('{{selected.sortgrp | safe}}') )
    sortby = c('{{selected.sortgrp | safe}}')
    recs = length({{selected.rulesobj | safe}})
    if(recs == 0)
    {
        print("ERROR: There are no Rules to Display that match the support, lift and confidence criteria selected.")
        return()
    }


    if({{selected.prunerules | safe}})
    {
        #list redundant rules, we display all redundant rules
        rules.redundant <- {{selected.rulesobj | safe}}[is.redundant({{selected.rulesobj | safe}})]
        recs = length(rules.redundant)
        if(recs == 0)
        {
            print("ERROR: There are no Redundant Rules to Display, rerun the analysis with prune rules unchecked")
            return()
        }
        else
        {
            fromidx = 1
            toidx = min( {{selected.rulecount | safe}}, recs)
            if({{selected.gpbox2 | safe}} )
            {
                fromidx = min( recs - 1, {{selected.from | safe}})
                toidx = min( recs, {{selected.to | safe}})
            }
            
            displayObject <- BSkyDisplayRules(rulesObject = rules.redundant, 1, toidx)
            BSkyFormat(obj = displayObject, singleTableOutputHeader = sprintf("All Redundant rules (from rule number %s to %s of %s rules sorted by %s)", 1, toidx, recs, sortby))

            ## remove redundant rules and display pruned rules
            {{selected.rulesobj | safe}} <- {{selected.rulesobj | safe}}[!is.redundant({{selected.rulesobj | safe}})]

            fromidx = 1
            recs = length({{selected.rulesobj | safe}})
            toidx = min( {{selected.rulecount | safe}}, recs)
            if({{selected.gpbox2 | safe}})
            {
                fromidx = min( recs - 1, {{selected.from | safe}})
                toidx = min( recs, {{selected.to | safe}})
            }
            cat("\n\n Summary of Rule Statistics \n")
            print(summary({{selected.rulesobj | safe}}))
            displayObject <- BSkyDisplayRules(rulesObject = {{selected.rulesobj | safe}}, fromidx, toidx)
            BSkyFormat(obj = displayObject, singleTableOutputHeader = sprintf("All Pruned Rules (from rule number %s to %s of %s rules sorted by %s)", fromidx, toidx, recs, sortby))

            if({{selected.graphs | safe}})
            {
                plot({{selected.rulesobj | safe}})
                plot({{selected.rulesobj | safe}}, method = "grouped")
                plot({{selected.rulesobj | safe}}, method = "graph")
                #plot({{selected.rulesobj | safe}}, method = "paracoord", control = list(reorder = TRUE))
            }

        }
    }
    else
    {
        recs = length({{selected.rulesobj | safe}})

        if(recs == 0)
        {
            print("ERROR: There are no Rules to Display that match the support, lift and confidence criteria selected.")
            return()
        }

        fromidx = 1
        toidx = min( {{selected.rulecount | safe}}, recs)
        if({{selected.gpbox2 | safe}})
        {
            fromidx = min( recs - 1, {{selected.from | safe}})
            toidx = min( recs, {{selected.to | safe}})
        }

        cat("\n\n Summary of Rule Statistics \n")
        print( summary({{selected.rulesobj | safe}}))
        displayObject <- BSkyDisplayRules (rulesObject = {{selected.rulesobj | safe}}, fromidx,toidx)
        BSkyFormat(displayObject, singleTableOutputHeader = sprintf("All Unpruned Rules (from rule number %s to %s of %s rules sorted by %s)", fromidx, toidx, recs, sortby))
        if({{selected.graphs | safe}})
        {
            plot({{selected.rulesobj | safe}})
            plot({{selected.rulesobj | safe}}, method = "grouped")
            plot({{selected.rulesobj | safe}}, method = "graph")
            #plot({{selected.rulesobj | safe}}, method = "paracoord", control = list(reorder = TRUE))
        }

    }

}
)
`
        }
		
        var objects = {
            content_var: { 
			el: new srcVariableList(config, {
                    label: generateRuleBasketData.t('src'),
                    no: "src",
					action: "move"
				}) 
			},
            datasetcol: {
                el: new dstVariable(config, {
                    label: generateRuleBasketData.t('datasetcol'),
                    no: "datasetcol",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "Prefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
	
			separator: {
                el: new input(config, {
                    no: 'separator',
                    label: generateRuleBasketData.t('separator'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    Type: "character",                  
                    value: ","
                }),
            },
			
			prunerules: { 
				el: new checkbox(config, { 
					label: generateRuleBasketData.t('prunerules'), 
					newline:true, 
                    no: "prunerules", 
					state: "checked",
					extraction: "Boolean" 
					}) 
			},
			graphs: { 
				el: new checkbox(config, {
					label: generateRuleBasketData.t('graphs'), 
					newline:true, 
                    no: "graphs", 
					extraction: "Boolean" 
				}) 
			},
			
            label1: { 
				el: new labelVar(config, { 
					label: generateRuleBasketData.t('label1'), 
                    no: "label1",
					style:"mt-2",h: 5 
				}) 
			},

			rulesobj: {
                el: new input(config, {
                    no: 'rulesobj',
                    label: generateRuleBasketData.t('rulesobj'),
                    value:"Rules1",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
					overwrite: "variable"				
                }),
            },
			rulesobjhint: { 
				el: new labelVar(config, {
					label: generateRuleBasketData.t('rulesobjhint'), 
                    no: "rulesobjhint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			support: {
                el: new inputSpinner(config, {
                    no: 'support',
                    label: generateRuleBasketData.t('support'),
                    min: 0,
                    max: 9999999,
                    step: 0.01,
                    value: 0.1,
                    extraction: "NoPrefix|UseComma"
                })
            },
			supphint: { 
				el: new labelVar(config, { 
					label: generateRuleBasketData.t('supphint'), 
                    no: "supphint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			confidence: {
                el: new inputSpinner(config, {
                    no: 'confidence',
                    label: generateRuleBasketData.t('confidence'),
                    min: 0,
                    max: 9999999,
                    step: 0.01,
                    value: 0.8,
                    extraction: "NoPrefix|UseComma"
                })
            },
			confhint: { 
				el: new labelVar(config, { 
					label: generateRuleBasketData.t('confhint'), 
                    no:"confhint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			minlen: {
                el: new inputSpinner(config, {
                    no: 'minlen',
                    label: generateRuleBasketData.t('minlen'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
			maxlen: {
                el: new inputSpinner(config, {
                    no: 'maxlen',
                    label: generateRuleBasketData.t('maxlen'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 10,
                    extraction: "NoPrefix|UseComma"
                })
            },			
			
			sortopt: { 
				el: new labelVar(config, { 
					label: generateRuleBasketData.t('sortopt'), 
                    no:"sortopt",
					style:"mt-2",h: 5 
				}) 
			},
			
			sortby: { 
				el: new labelVar(config, { 
					label: generateRuleBasketData.t('sortby'), 
                    no: "sortby",
					style:"mt-3",h: 5 
				}) 
			},
            rd1: { 
				el: new radioButton(config, { 
					label: generateRuleBasketData.t('rd1'), 
					no: "sortgrp", 
					increment: "rd1", 
					value: "confidence", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd2: { 
				el: new radioButton(config, { 
					label: generateRuleBasketData.t('rd2'), 
					no: "sortgrp", 
					increment: "rd2", 
					value: "lift", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd3: { 
				el: new radioButton(config, { 
					label: generateRuleBasketData.t('rd3'), 
					no: "sortgrp", 
					increment: "rd3", 
					value: "support", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},		
			
			
			sortord: { 
				el: new labelVar(config, { 
					label: generateRuleBasketData.t('sortord'), 
                    no: "sortord",
					style:"mt-3",
					h: 5 
				}) 
			},
            increasing: { 
				el: new radioButton(config, { 
					label: generateRuleBasketData.t('increasing'), 
					no: "ordergrp", 
					increment: "increasing", 
					value: "FALSE", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            decreasing: { 
				el: new radioButton(config, { 
					label: generateRuleBasketData.t('decreasing'), 
					no: "ordergrp", 
					increment: "decreasing", 
					value: "TRUE", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
		
			
			
			noofrules: { 
				el: new labelVar(config, { 
					label: generateRuleBasketData.t('noofrules'), 
                    no:"noofrules",
					style:"mt-2",
					h: 5 
				}) 
			},
            numofrule: { 
				el: new radioButton(config, { 
					label: generateRuleBasketData.t('noofrules'), 
					no: "gpbox2", 
					increment: "numofrule", 
					value: "FALSE", 
					state: "checked", 
					extraction: "ValueAsIs",
					dependant_objects: ["rulecount"]
				}) 
			},
			rulecount: {
                el: new inputSpinner(config, {
                    no: 'rulecount',
                    label: generateRuleBasketData.t('rulecount'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 20,
                    extraction: "NoPrefix|UseComma"
                })
            },	
			
            fromto: { 
				el: new radioButton(config, { 
					label: generateRuleBasketData.t('fromto'), 
					no: "gpbox2", 
					increment: "fromto", 
					value: "", 
					state: "", 
					extraction: "ValueAsIs",
					dependant_objects: ["from", "to"]
				}) 
			},	
			from: {
                el: new inputSpinner(config, {
                    no: 'from',
                    label: generateRuleBasketData.t('from'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 1,
                    extraction: "ValueAsIs",
                    extraction: "NoPrefix|UseComma"
                })
            },	
			to: {
                el: new inputSpinner(config, {
                    no: 'to',
                    label: generateRuleBasketData.t('to'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 10,
                    extraction: "ValueAsIs",
                    extraction: "NoPrefix|UseComma"
                })
            }	
			
            
        }
		var advoptions = {
            el: new optionsVar(config, {
                no: "advoptions",
                name: generateRuleBasketData.t('advoptions'),
                content: [
                    objects.minlen.el,
                    objects.maxlen.el,
                    objects.sortopt.el,
                    objects.sortby.el,
                    objects.rd1.el,
                    objects.rd2.el,
                    objects.rd3.el,
                    objects.sortord.el,
                    objects.increasing.el,
                    objects.decreasing.el,
                    objects.noofrules.el,
                    objects.numofrule.el,
                    objects.rulecount.el,
                    objects.fromto.el,
                    objects.from.el,
                    objects.to.el

                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.datasetcol.el.content, objects.separator.el.content],
			bottom: [objects.prunerules.el.content, objects.graphs.el.content, objects.label1.el.content, objects.rulesobj.el.content, 
                objects.rulesobjhint.el.content, objects.support.el.content, objects.supphint.el.content,objects.confidence.el.content,
                advoptions.el.content],
            nav: {
                name: generateRuleBasketData.t('navigation'),
                icon: "icon-market_basket",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: generateRuleBasketData.t('help.title'),
            r_help: generateRuleBasketData.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: generateRuleBasketData.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new generateRuleBasketData().render()
}
