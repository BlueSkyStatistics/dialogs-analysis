


class targetingItemsMultilineData extends baseModal {
    static dialogId = 'targetingItemsMultilineData'
    static t = baseModal.makeT(targetingItemsMultilineData.dialogId)

    constructor() {
        var config = {
            id: targetingItemsMultilineData.dialogId,
            label: targetingItemsMultilineData.t('title'),
            modalType: "two",
            RCode: `
library(arules);
library(arulesViz);
local(
{
    
    T1 <- BSkyReadTransactions(datasetname = '{{dataset.name}}', format = 'single',  cols = c('{{selected.idcolname | safe}}', '{{selected.itemcolname | safe}}'))
    
    ## apriori with targeting
    {{selected.rulesobj | safe}} <<- arules::apriori(T1, parameter = list(supp = {{selected.support | safe}}, conf = {{selected.confidence | safe}}, minlen = {{selected.minlen | safe}}, maxlen = {{selected.maxlen | safe}}), appearance = list({{selected.lhsstr | safe}} {{selected.rhsstr | safe}} {{selected.bothstr | safe}} {{selected.nonestr | safe}} default = '{{selected.defgrp | safe}}'  ) )
    
    ## Sorting
    
    sortby = c('{{selected.sortgrp | safe}}')
    
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
            if({{selected.gpbox2 | safe}})
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
        print(summary({{selected.rulesobj | safe}}))
        displayObject <- BSkyDisplayRules(rulesObject = {{selected.rulesobj | safe}}, fromidx, toidx)
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
                    label: targetingItemsMultilineData.t('src'),
                    no: "src",
					action: "move"
				}) 
			},
            idcolname: {
                el: new dstVariable(config, {
                    label: targetingItemsMultilineData.t('idcolname'),
                    no: "idcolname",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
	
            itemcolname: {
                el: new dstVariable(config, {
                    label: targetingItemsMultilineData.t('itemcolname'),
                    no: "itemcolname",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            }, 
			
			prunerules: { 
				el: new checkbox(config, { 
					label: targetingItemsMultilineData.t('prunerules'), 
					newline:true, 
                    no: "prunerules", 
                    state: "checked",
					extraction: "Boolean" 
					}) 
			},
			graphs: { 
				el: new checkbox(config, {
					label: targetingItemsMultilineData.t('graphs'), 
					newline:true, 
                    no: "graphs", 
					extraction: "Boolean" 
				}) 
			},
			
            label1: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('label1'), 
                    no: "label1",
					style:"mt-2",h: 5 
				}) 
			},

			rulesobj: {
                el: new input(config, {
                    no: 'rulesobj',
                    label: targetingItemsMultilineData.t('rulesobj'),
                    value:"Rules5",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
					overwrite: "variable"				
                }),
            },
			rulesobjhint: { 
				el: new labelVar(config, {
					label: targetingItemsMultilineData.t('rulesobjhint'), 
                    no: "rulesobjhint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			support: {
                el: new inputSpinner(config, {
                    no: 'support',
                    label: targetingItemsMultilineData.t('support'),
                    min: 0,
                    max: 9999999,
                    step: 0.01,
                    value: 0.1,
                    extraction: "NoPrefix|UseComma"
                })
            },
			supphint: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('supphint'), 
                    no: "supphint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			confidence: {
                el: new inputSpinner(config, {
                    no: 'confidence',
                    label: targetingItemsMultilineData.t('confidence'),
                    min: 0,
                    max: 9999999,
                    step: 0.01,
                    value: 0.8,
                    extraction: "NoPrefix|UseComma"
                })
            },
			confhint: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('confhint'), 
                    no:"confhint",
					style:"mt-2",h: 6 
				}) 
			},
			
            label2: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('label2'), 
                    no: "label2",
					style:"mt-2",h: 5 
				}) 
			},
            label3: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('label3'), 
                    no: "label3",
					style:"mt-2",h: 5 
				}) 
			},            

			lhs: {
                el: new input(config, {
                    no: 'lhs',
                    label: targetingItemsMultilineData.t('lhs'),
                    value:"",
                    extraction: "CreateArray|RemoveSpaces",
                    allow_spaces:true,
                    Type: "character",
                    wrapped: 'lhs=%val%,'				
                }),
            },
			rhs: {
                el: new input(config, {
                    no: 'rhs',
                    label: targetingItemsMultilineData.t('rhs'),
                    value:"",
                    extraction: "CreateArray|RemoveSpaces" ,
                    allow_spaces:true,
                    Type: "character",
                    wrapped: 'rhs=%val%,'				
                }),
            },
			both: {
                el: new input(config, {
                    no: 'both',
                    label: targetingItemsMultilineData.t('both'),
                    value:"",
                    extraction: "CreateArray|RemoveSpaces" ,
                    allow_spaces:true,
                    Type: "character",
                    wrapped: 'both=%val%,',			
                }),
            },
			none: {
                el: new input(config, {
                    no: 'none',
                    label: targetingItemsMultilineData.t('none'),
                    value:"",
                    extraction: "CreateArray|RemoveSpaces",
                    allow_spaces:true,
                    Type: "character",
                    wrapped: 'none=%val%,'
                }),
            },			

            label4: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('label4'), 
                    no: "label4",
					style:"mt-2",h: 5 
				}) 
			},

            both2: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('rdboth'), 
					no: "defgrp", 
					increment: "both2", 
					value: "both", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
            lhs2: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('rdlhs'), 
					no: "defgrp", 
					increment: "lhs2", 
					value: "lhs", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            rhs2: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('rdrhs'), 
					no: "defgrp", 
					increment: "rhs2", 
					value: "rhs", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            none2: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('rdnone'), 
					no: "defgrp", 
					increment: "none2", 
					value: "none", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},                                    			
			
			minlen: {
                el: new inputSpinner(config, {
                    no: 'minlen',
                    label: targetingItemsMultilineData.t('minlen'),
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
                    label: targetingItemsMultilineData.t('maxlen'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 10,
                    extraction: "NoPrefix|UseComma"
                })
            },			
			
			sortopt: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('sortopt'), 
                    no:"sortopt",
					style:"mt-2",h: 5 
				}) 
			},
			
			sortby: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('sortby'), 
                    no: "sortby",
					style:"mt-3",h: 5 
				}) 
			},
            rd1: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('rd1'), 
					no: "sortgrp", 
					increment: "rd1", 
					value: "confidence", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd2: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('rd2'), 
					no: "sortgrp", 
					increment: "rd2", 
					value: "lift", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd3: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('rd3'), 
					no: "sortgrp", 
					increment: "rd3", 
					value: "support", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},	
			
			
			sortord: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('sortord'), 
                    no: "sortord",
					style:"mt-3",
					h: 5 
				}) 
			},
            increasing: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('increasing'), 
					no: "ordergrp", 
					increment: "increasing", 
					value: "FALSE", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            decreasing: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('decreasing'), 
					no: "ordergrp", 
					increment: "decreasing", 
					value: "TRUE", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
		
			
			
			noofrules: { 
				el: new labelVar(config, { 
					label: targetingItemsMultilineData.t('noofrules'), 
                    no:"noofrules",
					style:"mt-2",
					h: 5 
				}) 
			},
            numofrule: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('noofrules'), 
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
                    label: targetingItemsMultilineData.t('rulecount'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 20,
                    extraction: "NoPrefix|UseComma"
                })
            },	
			
            fromto: { 
				el: new radioButton(config, { 
					label: targetingItemsMultilineData.t('fromto'), 
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
                    label: targetingItemsMultilineData.t('from'),
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
                    label: targetingItemsMultilineData.t('to'),
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
                name: targetingItemsMultilineData.t('advoptions'),
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
			bottom: [ objects.label1.el.content, objects.rulesobj.el.content, 
                objects.rulesobjhint.el.content, objects.support.el.content, objects.supphint.el.content,objects.confidence.el.content,
				objects.prunerules.el.content, objects.graphs.el.content,
                objects.label2.el.content, objects.label3.el.content,
				objects.lhs.el.content, objects.rhs.el.content,objects.both.el.content, objects.none.el.content,
                objects.label4.el.content,
				objects.lhs2.el.content, objects.rhs2.el.content,objects.both2.el.content, objects.none2.el.content,
                advoptions.el.content],
            nav: {
                name: targetingItemsMultilineData.t('navigation'),
                icon: "icon-target",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: targetingItemsMultilineData.t('help.title'),
            r_help: "help(data,package='utils')",
            body: targetingItemsMultilineData.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        let temp = ""
        var code_vars = {
            dataset: {
                name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
            },
            selected: instance.dialog.extractData()
        }
        code_vars.selected.lhsstr = code_vars.selected.lhs.includes("c('')") ? "" : code_vars.selected.lhs;
        code_vars.selected.rhsstr = code_vars.selected.rhs.includes("c('')") ? "" : code_vars.selected.rhs;
        code_vars.selected.bothstr = code_vars.selected.both.includes("c('')") ? "" : code_vars.selected.both;
        code_vars.selected.nonestr = code_vars.selected.none.includes("c('')") ? "" : code_vars.selected.none;

        const cmd = instance.dialog.renderR(code_vars);
        res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
        return res;
    }
}

module.exports = {
    render: () => new targetingItemsMultilineData().render()
}
