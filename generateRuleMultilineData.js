


class generateRuleMultilineData extends baseModal {
    static dialogId = 'generateRuleMultilineData'
    static t = baseModal.makeT(generateRuleMultilineData.dialogId)

    constructor() {
        var config = {
            id: generateRuleMultilineData.dialogId,
            label: generateRuleMultilineData.t('title'),
            modalType: "two",
            RCode: `
library(arules);
library(arulesViz);

local(
{
    T1 <- BSkyReadTransactions(datasetname = '{{dataset.name}}', format = 'single', cols = c('{{selected.idcolname | safe}}', '{{selected.itemcolname | safe}}'))
    
    {{selected.rulesobj | safe}} <<- arules::apriori(T1, parameter = list(supp = {{selected.support | safe}}, conf = {{selected.confidence | safe}}, minlen = {{selected.minlen | safe}}, maxlen = {{selected.maxlen | safe}}))

    ## Sorting

    {{selected.rulesobj | safe}}  <<- arules::sort( {{selected.rulesobj | safe}}, decreasing={{selected.ordergrp | safe}}, by = c('{{selected.sortgrp | safe}}') )
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
            if({{selected.gpbox2 | safe}})
            {
                fromidx = min( recs - 1, {{selected.from | safe}})
                toidx = min( recs, {{selected.to | safe}})
            }
        
            displayObject <- BSkyDisplayRules(rulesObject = rules.redundant,1,toidx)
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
        print(summary({{selected.rulesobj | safe}}))
        displayObject <- BSkyDisplayRules (rulesObject = {{selected.rulesobj | safe}}, fromidx, toidx)
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
                    label: generateRuleMultilineData.t('src'),
                    no: "src",
					action: "move"
				}) 
			},
            idcolname: {
                el: new dstVariable(config, {
                    label: generateRuleMultilineData.t('idcolname'),
                    no: "idcolname",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },

            itemcolname: {
                el: new dstVariable(config, {
                    label: generateRuleMultilineData.t('itemcolname'),
                    no: "itemcolname",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },            
	
	
			prunerules: { 
				el: new checkbox(config, { 
					label: generateRuleMultilineData.t('prunerules'), 
					newline:true, 
                    no: "prunerules", 
					state: "checked",
					extraction: "Boolean" 
					}) 
			},
			graphs: { 
				el: new checkbox(config, {
					label: generateRuleMultilineData.t('graphs'), 
					newline:true, 
                    no: "graphs", 
					extraction: "Boolean" 
				}) 
			},
			
            label1: { 
				el: new labelVar(config, { 
					label: generateRuleMultilineData.t('label1'), 
                    no: "label1",
					style:"mt-2",h: 5 
				}) 
			},

			rulesobj: {
                el: new input(config, {
                    no: 'rulesobj',
                    label: generateRuleMultilineData.t('rulesobj'),
                    value:"Rules2",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
					overwrite: "variable"					
                }),
            },
			rulesobjhint: { 
				el: new labelVar(config, {
					label: generateRuleMultilineData.t('rulesobjhint'), 
                    no: "rulesobjhint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			support: {
                el: new inputSpinner(config, {
                    no: 'support',
                    label: generateRuleMultilineData.t('support'),
                    min: 0,
                    max: 9999999,
                    step: 0.01,
                    value: 0.1,
                    extraction: "NoPrefix|UseComma"
                })
            },
			supphint: { 
				el: new labelVar(config, { 
					label: generateRuleMultilineData.t('supphint'), 
                    no: "supphint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			confidence: {
                el: new inputSpinner(config, {
                    no: 'confidence',
                    label: generateRuleMultilineData.t('confidence'),
                    min: 0,
                    max: 9999999,
                    step: 0.01,
                    value: 0.8,
                    extraction: "NoPrefix|UseComma"
                })
            },
			confhint: { 
				el: new labelVar(config, { 
					label: generateRuleMultilineData.t('confhint'), 
                    no:"confhint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			minlen: {
                el: new inputSpinner(config, {
                    no: 'minlen',
                    label: generateRuleMultilineData.t('minlen'),
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
                    label: generateRuleMultilineData.t('maxlen'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 10,
                    extraction: "NoPrefix|UseComma"
                })
            },			
			
			sortopt: { 
				el: new labelVar(config, { 
					label: generateRuleMultilineData.t('sortopt'), 
                    no:"sortopt",
					style:"mt-2",h: 5 
				}) 
			},
			
			sortby: { 
				el: new labelVar(config, { 
					label: generateRuleMultilineData.t('sortby'), 
                    no: "sortby",
					style:"mt-3",h: 5 
				}) 
			},
            rd1: { 
				el: new radioButton(config, { 
					label: generateRuleMultilineData.t('rd1'), 
					no: "sortgrp", 
					increment: "rd1", 
					value: "confidence", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd2: { 
				el: new radioButton(config, { 
					label: generateRuleMultilineData.t('rd2'), 
					no: "sortgrp", 
					increment: "rd2", 
					value: "lift", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd3: { 
				el: new radioButton(config, { 
					label: generateRuleMultilineData.t('rd3'), 
					no: "sortgrp", 
					increment: "rd3", 
					value: "support", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},		
			
			
			sortord: { 
				el: new labelVar(config, { 
					label: generateRuleMultilineData.t('sortord'), 
                    no: "sortord",
					style:"mt-3",
					h: 5 
				}) 
			},
            increasing: { 
				el: new radioButton(config, { 
					label: generateRuleMultilineData.t('increasing'), 
					no: "ordergrp", 
					increment: "increasing", 
					value: "FALSE", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            decreasing: { 
				el: new radioButton(config, { 
					label: generateRuleMultilineData.t('decreasing'), 
					no: "ordergrp", 
					increment: "decreasing", 
					value: "TRUE", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
		
			
			
			noofrules: { 
				el: new labelVar(config, { 
					label: generateRuleMultilineData.t('noofrules'), 
                    no:"noofrules",
					style:"mt-2",
					h: 5 
				}) 
			},
            numofrule: { 
				el: new radioButton(config, { 
					label: generateRuleMultilineData.t('noofrules'), 
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
                    label: generateRuleMultilineData.t('rulecount'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 20,
                    extraction: "NoPrefix|UseComma"
                })
            },	
			
            fromto: { 
				el: new radioButton(config, { 
					label: generateRuleMultilineData.t('fromto'), 
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
                    label: generateRuleMultilineData.t('from'),
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
                    label: generateRuleMultilineData.t('to'),
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
                name: generateRuleMultilineData.t('advoptions'),
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
            right: [objects.idcolname.el.content, objects.itemcolname.el.content],
			bottom: [objects.prunerules.el.content, objects.graphs.el.content, objects.label1.el.content, objects.rulesobj.el.content, 
                objects.rulesobjhint.el.content, objects.support.el.content, objects.supphint.el.content,objects.confidence.el.content,
                advoptions.el.content],
            nav: {
                name: generateRuleMultilineData.t('navigation'),
                icon: "icon-factor_list",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: generateRuleMultilineData.t('help.title'),
            r_help: generateRuleMultilineData.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: generateRuleMultilineData.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new generateRuleMultilineData().render()
}
