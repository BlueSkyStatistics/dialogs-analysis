/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Display Rules",
        navigation: "Display Rules",
		rulename : "Enter an existing rules object",
        dosortingchk: "Sort the rules",
        sortopt: "Sort Options",
        sortby: "Sort by",
        confchk:"confidence",
        liftchk:"lift",
        suppchk:"support",
        sortord:"Sort order",
        increasing:"Ascending",
        decreasing:"Descending",
        noofrules:"Number of rules to display",
        rulecount:"",
        fromto:"Display rules",
        from:"From",
        to:"To",
		
		
        help: {
            title: "Display Rules",
            r_help: "help(inspect, package='arules')",
            body: `
            <b>
			Package : arulesViz
			</b>
			<br/><br/>
            <b>
            1.  inspect
            </b>
            <br/><br/>
			<b>
			Description
			</b>
			<br/><br/>
            Provides the generic function inspect and S4 methods to display associations and transactions plus additional information formatted for online inspection.
            <br/><br/>
			<b>
			Usage
			</b>
			<br/><br/>
			<code>
            inspect(x, ...)
            </code>
            <br/><br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            x: a set of associations or transactions or an itemMatrix.
            </li>
            <li>
            ...: additional arguments can be used to customize the output: setStart, setEnd, itemSep and ruleSep. Items are printed only one per line in case the output lines get very long. This can also be directly controlled using linebreak.
            </li>
            </ul>
            <br/><br/>

            <b>
            2. sort
            </b>
            <br/><br/>

			<b>
			Description
			</b>
			<br/><br/>
            Provides the method sort to sort elements in class associations (e.g., itemsets or rules) according to the value of measures stored in the association's slot quality (e.g., support).
            <br/><br/>
			<b>
			Usage
			</b>
			<br/><br/>
			<code>
            ## S4 method for signature 'associations'
            arules::sort(x, decreasing = TRUE, na.last = NA, 
            by = "support", order = FALSE, ...)
            </code>
            <br/><br/>
			<code>
            ## S4 method for signature 'associations'
            head(x, n = 6L, by = NULL, decreasing = TRUE, ...)
            </code>
            <br/><br/>
			<code>
            ## S4 method for signature 'associations'
            tail(x, n = 6L, by = NULL, decreasing = TRUE, ...)
            </code>
            <br/><br/>                        
            <b>Arguments</b><br/>
            <ul>
            <li>
            x: an object to be sorted.
            </li>
            <li>
            decreasing: a logical. Should the sort be increasing or decreasing? (default is decreasing)
            </li>
            <li>
            na.last: na.last is not supported for associations. NAs are always put last.
            </li>
            <li>
            by: a character string specifying the quality measure stored in x to be used to sort x. If a vector of character strings is specified then the additional strings are used to sort x in case of ties.
            </li>
            <li>
            order: should a order vector be returned instead of the sorted associations?
            </li>
            <li>
            n: a single integer indicating the number of associations returned.
            </li>
            <li>
            ... : Further arguments are ignored.
            </li>                                    
            </ul>
            <br/><br/>     
            <b> 
            Details
            </b> 
            <br/>
            sort is relatively slow for large sets of associations since it has to copy and rearrange a large data structure. Note that sorting creates a second copy of the set of associations which can be slow and memory consuming for large sets. With order = TRUE a integer vector with the order is returned instead of the reordered associations.
            If only the top n associations are needed then head using by performs this faster than calling sort and then head since it does it without copying and rearranging all the data. tail works in the same way.
            <br/><br/>  
            <b> 
            Value
            </b> 
            <br/>
            An object of the same class as x.                  
    `}
    }
}

class displayRules extends baseModal {
    constructor() {
        var config = {
            id: "displayRules",
            label: localization.en.title,
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
                    label: localization.en.rulename,
                    value:"Rules1",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    type: "character"					
                }),
            },
					
		
			sortopt: { 
				el: new labelVar(config, { 
					label: localization.en.sortopt, 
                    no:"sortopt",
					style:"mt-2",h: 5 
				}) 
			},
			dosortingchk: { 
				el: new checkbox(config, { 
					label: localization.en.dosortingchk, 
					newline:true, 
                    no: "dosortingchk", 
                    state: "checked",
					extraction: "Boolean",
					dependant_objects: ["suppchk", "liftchk", "confchk"]
					}) 
			},			

			sortby: { 
				el: new labelVar(config, { 
					label: localization.en.sortby, 
                    no: "sortby",
					style:"mt-3",h: 5 
				}) 
			},
			suppchk: { 
				el: new checkbox(config, { 
					label: localization.en.suppchk, 
					newline:true, 
                    no: "suppchk", 
                    state: "",
					extraction: "Boolean" 
					}) 
			},
			liftchk: { 
				el: new checkbox(config, { 
					label: localization.en.liftchk, 
					newline:true, 
                    no: "liftchk", 
                    state: "",
					extraction: "Boolean" 
					}) 
			},
			confchk: { 
				el: new checkbox(config, { 
					label: localization.en.confchk, 
					newline:true, 
                    no: "confchk", 
                    state: "",
					extraction: "Boolean" 
					}) 
			},	
			
			
			sortord: { 
				el: new labelVar(config, { 
					label: localization.en.sortord, 
                    no: "sortord",
					style:"mt-3",
					h: 5 
				}) 
			},
            increasing: { 
				el: new radioButton(config, { 
					label: localization.en.increasing, 
					no: "ordergrp", 
					increment: "increasing", 
					value: "FALSE", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            decreasing: { 
				el: new radioButton(config, { 
					label: localization.en.decreasing, 
					no: "ordergrp", 
					increment: "decreasing", 
					value: "TRUE", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
		
			
			
			noofrules: { 
				el: new labelVar(config, { 
					label: localization.en.noofrules, 
                    no:"noofrules",
					style:"mt-2",
					h: 5 
				}) 
			},
            numofrule: { 
				el: new radioButton(config, { 
					label: localization.en.noofrules, 
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
                    label: localization.en.rulecount,
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 20,
                    extraction: "NoPrefix|UseComma"
                })
            },	
			
            fromto: { 
				el: new radioButton(config, { 
					label: localization.en.fromto, 
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
                    label: localization.en.from,
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
                    label: localization.en.to,
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
                name: localization.en.navigation,
                icon: " icon-dialog_inspector",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new displayRules().render()