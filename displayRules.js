


class displayRules extends baseModal {
    static dialogId = 'displayRules'
    static t = baseModal.makeT(displayRules.dialogId)

    constructor() {
        var config = {
            id: displayRules.dialogId,
            label: displayRules.t('title'),
            modalType: "two",
            RCode: `
library(arules); 
local(
    {
        ## Sorting
        if( {{selected.dosortingchk | safe}} )
        {
            tempsup <- c()
            if({{selected.suppchk | safe}})
            {
                tempsup = c('support')
            }
            tempconf <- c()
            if({{selected.confchk | safe}})
            {
                tempconf = c('confidence')
            }
            templift <- c()
            if({{selected.liftchk | safe}})
            {
                templift = c('lift')
            }
            
            {{selected.rulename | safe}} <- arules::sort( {{selected.rulename | safe}}, decreasing = {{selected.ordergrp | safe}}, by = c(tempsup, tempconf, templift) )
        }
        
        # Extract LHS
        lhsitems <- as(lhs({{selected.rulename | safe}}), "list")
        
        # Extract RHS
        rhsitems <- as(rhs({{selected.rulename | safe}}), "list")
        
        # Extract QUALITY( that has support, confidence and lift)
        qual <- as(quality({{selected.rulename | safe}}), "list")
        
        # support
        supp <- qual[[1]] 
        # confidence
        conf <- qual[[2]] 
        # lift
        lift <- qual[[3]] 
        
        #checking rule count
        recs <- length(supp)
        if(recs < 1)
        {
            print("No Rules to Display")
            return
        }
        
        fromidx = 1
        toidx = min( {{selected.rulecount | safe}}, recs)
        
        if({{selected.gpbox2 | safe}})
        {
            fromidx = min( recs-1, {{selected.from | safe}})
            toidx = min( recs, {{selected.to | safe}})
        }
        
        #collecting all lists in one list
        megalist = list(as.character(lhsitems[fromidx:toidx]), as.character(rhsitems[fromidx:toidx]), supp[fromidx:toidx], conf[fromidx:toidx], lift[fromidx:toidx] )
        
        #creating data.frame out of the list
        DF1 <- do.call(cbind, megalist) %>% as.data.frame
        
        #changing V1, V2, V3... col names
        names(DF1) <- c("LHS", "RHS", "Support", "Confidence", "Lift")
        
        # Formatted printing
        BSkyFormat(DF1)
    }
    )

`
        }
		
        var objects = {

			rulename: {
                el: new input(config, {
                    no: 'rulename',
                    label: displayRules.t('rulename'),
                    value:"Rules1",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    type: "character"					
                }),
            },
					
		
			sortopt: { 
				el: new labelVar(config, { 
					label: displayRules.t('sortopt'), 
                    no:"sortopt",
					style:"mt-2",h: 5 
				}) 
			},
			dosortingchk: { 
				el: new checkbox(config, { 
					label: displayRules.t('dosortingchk'), 
					newline:true, 
                    no: "dosortingchk", 
                    state: "checked",
					extraction: "Boolean",
					dependant_objects: ["suppchk", "liftchk", "confchk"]
					}) 
			},			

			sortby: { 
				el: new labelVar(config, { 
					label: displayRules.t('sortby'), 
                    no: "sortby",
					style:"mt-3",h: 5 
				}) 
			},
			suppchk: { 
				el: new checkbox(config, { 
					label: displayRules.t('suppchk'), 
					newline:true, 
                    no: "suppchk", 
                    state: "",
					extraction: "Boolean" 
					}) 
			},
			liftchk: { 
				el: new checkbox(config, { 
					label: displayRules.t('liftchk'), 
					newline:true, 
                    no: "liftchk", 
                    state: "",
					extraction: "Boolean" 
					}) 
			},
			confchk: { 
				el: new checkbox(config, { 
					label: displayRules.t('confchk'), 
					newline:true, 
                    no: "confchk", 
                    state: "",
					extraction: "Boolean" 
					}) 
			},	
			
			
			sortord: { 
				el: new labelVar(config, { 
					label: displayRules.t('sortord'), 
                    no: "sortord",
					style:"mt-3",
					h: 5 
				}) 
			},
            increasing: { 
				el: new radioButton(config, { 
					label: displayRules.t('increasing'), 
					no: "ordergrp", 
					increment: "increasing", 
					value: "FALSE", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            decreasing: { 
				el: new radioButton(config, { 
					label: displayRules.t('decreasing'), 
					no: "ordergrp", 
					increment: "decreasing", 
					value: "TRUE", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
		
			
			
			noofrules: { 
				el: new labelVar(config, { 
					label: displayRules.t('noofrules'), 
                    no:"noofrules",
					style:"mt-2",
					h: 5 
				}) 
			},
            numofrule: { 
				el: new radioButton(config, { 
					label: displayRules.t('noofrules'), 
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
                    label: displayRules.t('rulecount'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 20,
                    extraction: "NoPrefix|UseComma"
                })
            },	
			
            fromto: { 
				el: new radioButton(config, { 
					label: displayRules.t('fromto'), 
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
                    label: displayRules.t('from'),
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
                    label: displayRules.t('to'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 10,
                    extraction: "ValueAsIs",
                    extraction: "NoPrefix|UseComma"
                })
            }	
			
            
        }

        const content = {
            left: [],
            right: [],
			bottom: [objects.rulename.el.content, 
                    objects.sortopt.el.content, objects.dosortingchk.el.content,
                    objects.sortby.el.content,objects.suppchk.el.content,objects.liftchk.el.content,objects.confchk.el.content,
                    objects.sortord.el.content,objects.increasing.el.content,objects.decreasing.el.content,objects.noofrules.el.content,
                    objects.numofrule.el.content,objects.rulecount.el.content,objects.fromto.el.content,
                    objects.from.el.content,objects.to.el.content],
            nav: {
                name: displayRules.t('navigation'),
                icon: " icon-dialog_inspector",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: displayRules.t('help.title'),
            r_help: displayRules.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: displayRules.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new displayRules().render()
}
