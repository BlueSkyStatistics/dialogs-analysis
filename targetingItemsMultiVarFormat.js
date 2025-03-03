/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Targeting Items, Multi-Variable Format",
        navigation: "Targeting Items, Multi-Variable Format",
        src: "Columns",
        destination: "Variables representing items in a basket",
        prunerules: "Prune rules",
        graphs: "Show visualizations",
        test3: "Difference < 0",
        txtbox2: "Null hypothesis (mu)",
        txtbox1: "Confidence level",
		label1 : "Generate Rules",
		rulesobj : "Rules object name",
		rulesobjhint : "This object holds all the rules and can be specified in other related dialogs. i.e Display Rules, Plot Rules ",
		support: "Minimum support value",
		supphint: "The support of an item(s) is the fraction of transactions in data set that contain that item(s).",
		confidence : "Minimum confidence value",
		confhint: "The confidence of a rule is the likelihood that it is true for a new transaction that contains the items on the LHS of the rule",
		label2: "Targeting Items",
		label3: "Enter levels of the variables you are interested in, in the format variable name=level. For example if variable name Survived has levels Yes and No, enter Survived=Yes,Survived=No",
		lhs:"Items appearing on left hand side",
		rhs: "Items appearing on right hand side",
		both: "Items appearing on both sides",
		none: "Items not appearing at all",
        label4: "default appearance",
		rdboth:"both",
		rdlhs:"lhs",
		rdrhs:"rhs",
		rdnone: "none",
		advoptions : "Advanced Options",
		minlen: "Minimum number of items on the left",
        maxlen: "Maximum number of items on the left",
        sortopt: "Sort Options",
        sortby: "Sort by",
        rd1:"Confidence",
        rd2:"Lift",
        rd3:"Support",
        sortord:"Sort order",
        increasing:"Ascending",
        decreasing:"Descending",
        noofrules:"Number of rules to display",
        rulecount:"",
        fromto:"Display rules",
        from:"From",
        to:"To",        
		
        help: {
            title: "Targeting Items, Multi-Variable Format",
            r_help: "help(apriori, package='arules')",
            body: `
                    <b>
                    NOTE: Depending on the format of the data, you will choose either the 'Basket data format; or 'Multi-line transaction format' or Multi-Variable format.  A separate set of dialogs are provided for each of these data formats. See below for details:
                    </b>
                    <br/><br/>
                    <b>
                    Basket Data Format
                    </b>
                    <br/>
                    With Basket data format, all the items in a single basket are contained in a single column in the dataset. Multiple items are separated by any single character like comma(,) , semi-colon (;) or colon (:) etc.
                    <br/>
                    <b>
                    Example 1
                    </b>
                    <table style="border: 1px solid ; border-collapse: collapse;">
                    <tr>
                    <th style="border: 1px solid ; border-collapse: collapse;">Items</th>
                    </tr>
                    <tr>
                    <td style="border: 1px solid ; border-collapse: collapse;">item10,item20,item23,item24</td>
                    </tr>
                    <tr>
                    <td style="border: 1px solid ; border-collapse: collapse;">item12,item13,item43</td>
                    </tr>
                    <tr>
                    <td style="border: 1px solid ; border-collapse: collapse;">item12,item14,item32</td>
                    </tr>            
                </table> 

                <br/>
                <b>
                Example 2
                </b>
                <table style="border: 1px solid ; border-collapse: collapse;">
                <tr>
                    <th style="border: 1px solid ; border-collapse: collapse;">Food Items</th>
                </tr>
                <tr>
                    <td style="border: 1px solid ; border-collapse: collapse;">apples,mangos,beer</td>
                </tr>
                <tr>
                    <td style="border: 1px solid ; border-collapse: collapse;">milk,chicken,cheese</td>
                </tr>
                <tr>
                    <td style="border: 1px solid ; border-collapse: collapse;">apples,wine,cheese</td>
                </tr>            
                </table>    
                <br/>
                <br>
                <b>
                Multi-line Transaction Data Format
                </b>
                <br/>
                With transaction format, every item in a single basket is represented in a separate row. All rows representing items in a single basket contain a common transaction id. The transaction ID is captured in a separate column        
                <br/>
                <b>
                Example 1
                </b>
                <table style="border: 1px solid ; border-collapse: collapse;">
                <tr>
                <th style="border: 1px solid ; border-collapse: collapse;">ID</th>
                <th style="border: 1px solid ; border-collapse: collapse;">Items</th>
                </tr>
                <tr>
                <td style="border: 1px solid ; border-collapse: collapse;">1</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Bread</td>
                </tr>
                <tr>
                <td style="border: 1px solid ; border-collapse: collapse;">1</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Butter</td>
                </tr>
                <tr>
                <td style="border: 1px solid ; border-collapse: collapse;">2</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Meat</td>
                </tr>      
                <tr>
                <td style="border: 1px solid ; border-collapse: collapse;">2</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Eggs</td>
                </tr>
                <tr>
                <td style="border: 1px solid ; border-collapse: collapse;">2</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Cheese</td>
                </tr>
                <tr>
                <td style="border: 1px solid ; border-collapse: collapse;">2</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Milk</td>
                </tr>                              
            </table> 
            <br/>
            So basket 1 contains bread and butter and basket 2 contains Meat, Eggs, Cheese and Milk

            <br/><br/>
            <b>
            Multi-Variable Data Format
            </b>
            <br/>
            In this format, every level of a variable in a dataset represents an item. Every row of the dataset represents a basket. See below
            <br/>
            <b>
            Example 1
            </b>
            <table style="border: 1px solid ; border-collapse: collapse;">
            <tr>
                <th style="border: 1px solid ; border-collapse: collapse;">Baked goods</th>
                <th style="border: 1px solid ; border-collapse: collapse;">Dairy </th>
                <th style="border: 1px solid ; border-collapse: collapse;">Meat</th>
                <th style="border: 1px solid ; border-collapse: collapse;">Vegetables</th>        
            </tr>
            <tr>
                <td style="border: 1px solid ; border-collapse: collapse;">Bread</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Milk</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Chicken</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Tomatoes</td>
            </tr>
            <tr>
                <td style="border: 1px solid ; border-collapse: collapse;">NA</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Cheese</td>
                <td style="border: 1px solid ; border-collapse: collapse;">NA</td>
                <td style="border: 1px solid ; border-collapse: collapse;">Onions</td>
            </tr>
            </table> 
            <br/>
            The prune rules check box allows you to prune rules. When selected, the redundant rules are displayed and the pruned model with redundant rules removed is saved and displayed. 
            <br/>
            When clicking the show visualizations check box, graphs are displayed. We have commented the  #plot(rule1, method ="paracoord",control = list(reorder=TRUE)) as it can take a long time to execute. You can paste the syntax  and run the command manually.            
            <br/>
            <br/>
            <b>Target Items</b>
            <br/>
            Now that we know how to generate rules, limit the output by removing redundant rules, lets say we wanted to target items to generate rules. There are two types of targets we might be interested in that are illustrated with a grocery store  example of “milk”:
            <br/><br/>
            What are customers likely to buy before buying milk
            <br/><br/>
            What are customers likely to buy if they purchase milk?
            <br/><br/>
            This essentially means we want to set either the Left Hand Side and Right Hand Side. 
            <br/><br/>
            If you are interested in what items people buy before they buy milk, enter milk  in textbox for right hand side (RHS) below.Since all other items can appear on LHS, check radio button relating to default appearance to LHS.
            <br/><br/>
            Remember the default appearance is relevant to all items that are not explicitly mentioned in LHS, RHS, items appearing on both sides or items not appearing at all
            <br/><br/>
            If you are interested in what are customers likely to buy if they purchase  milk, put milk in the LHS and since any item can appear in the RHS, check radio button relating to default appearance to RHS
            <br/>
            <br/>
            <b>
            Output
            </b>
            <br/>
            The results are displayed in Tabular format
            <br/>
            The Columns in the table are below
            <br/><br/>
            <b>LHS:</b> These represent the items in the basket
            <br/><br/>
            <b>RHS:</b> Given the items in the basket (LHS), the RHS contains a single item that will likely be bought
            <br/><br/>
            <b>Support:</b> Support is the fraction of transactions in the dataset that contain the items on the LHS
            <br/><br/>
            <b>Confidence:</b> Confidence is conditional probability that customer buying items on the LHS will also buy item on RHS
            <br/><br/>
            <b>Lift:</b> If someone buys items on the LHS,  what would the % of chance of buying product on RHS would increase. So basically how much our confidence has increased that the RHS will be purchased given the LHS is purchased. If lift is >1, the presence of items on LHS has increased the probability of items on RHS will occur in transaction, if <1 , presence of items on LHS will make probability of items on RHS lower, if =1, then LHS and RHS are independent
            <br/><br/>
            For details see 
            <br/><br/>
            http://infocenter.informationbuilders.com/wf80/index.jsp?topic=%2Fpubdocs%2FRStat16%2Fsource%2Ftopic49.htm
            <br/><br/>
            https://discourse.snowplowanalytics.com/t/market-basket-analysis-identifying-products-and-content-that-go-well-together/1132
            <br/><br/>
            http://www.listendata.com/2015/12/market-basket-analysis-with-r.html
            <br/><br/>
            http://www.salemmarafi.com/code/market-basket-analysis-with-r/
            <br/><br/>
        
            <b>Package : arules</b> 
            <br/><br/>
            <b>Description</b> 
            <br/>
            Mine frequent itemsets, association rules or association hyperedges using the Apriori algorithm. The Apriori algorithm employs level-wise search for frequent itemsets. The implementation of Apriori used includes some improvements (e.g., a prefix tree and item sorting).
            <br/><br/>
            <b>Usage</b> 
            <br/>
            <code>
            apriori(data, parameter = NULL, appearance = NULL, control = NULL)
            </code>
            <br/><br/>
        
            <b>Arguments</b><br/>
            <ul>
            <li>
            data: object of class transactions or any data structure which can be coerced into transactions (e.g., a binary matrix or data.frame).
            </li>
            <li>
            parameter: object of class APparameter or named list. The default behavior is to mine rules with minimum support of 0.1, minimum confidence of 0.8, maximum of 10 items (maxlen), and a maximal time for subset checking of 5 seconds (maxtime).
            </li>
            <li>
            appearance: object of class APappearance or named list. With this argument item appearance can be restricted (implements rule templates). By default all items can appear unrestricted.
            </li>
            <li>
            control: object of class APcontrol or named list. Controls the algorithmic performance of the mining algorithm (item sorting, report progress (verbose), etc.)
            </li>
            </ul>
            <br/><br/>
            <b>Details</b><br/>
            Calls the C implementation of the Apriori algorithm by Christian Borgelt for mining frequent itemsets, rules or hyperedges.
            <br/><br/>
        
            <b>Note</b>
            Apriori only creates rules with one item in the RHS (Consequent)! The default value in APparameter for minlen is 1. This means that rules with only one item (i.e., an empty antecedent/LHS) like
            <br/><br/>
            <code>{} => {beer}</code>
            <br/><br/>
            will be created. These rules mean that no matter what other items are involved, the item in the RHS will appear with the probability given by the rule's confidence (which equals the support). If you want to avoid these rules then use the argument parameter=list(minlen=2).
            <br/><br/>
            <b>Notes on run time and memory usage:</b>
            If the minimum support is chosen too low for the dataset, then the algorithm will try to create an extremely large set of itemsets/rules. This will result in very long run time and eventually the process will run out of memory. To prevent this, the default maximal length of itemsets/rules is restricted to 10 items (via the parameter element maxlen=10) and the time for checking subsets is limited to 5 seconds (via maxtime=5). The output will show if you hit these limits in the "checking subsets" line of the output. The time limit is only checked when the subset size increases, so it may run significantly longer than what you specify in maxtime. Setting maxtime=0 disables the time limit.
            <br/>
            Interrupting execution with Control-C/Esc is not recommended. Memory cleanup will be prevented resulting in a memory leak. Also, interrupts are only checked when the subset size increases, so it may take some time till the execution actually stops.
            <br/><br/>
            <b>Value</b><br/><br/>
            Returns an object of class rules or itemsets.
            <br/>            
    `}
    }
}

class targetingItemsMultiVarFormat extends baseModal {
    constructor() {
        var config = {
            id: "targetingItemsMultiVarFormat",
            label: localization.en.title,
            modalType: "two",
            RCode: `
library(arules);
library(arulesViz);

local(
{
    {{selected.rulesobj | safe}} <<- arules::apriori( {{dataset.name}}[, c({{selected.destination | safe}})], parameter = list(supp = {{selected.support | safe}}, conf = {{selected.confidence | safe}}, minlen = {{selected.minlen | safe}}, maxlen = {{selected.maxlen | safe}}), appearance = list({{selected.lhsstr | safe}} {{selected.rhsstr | safe}} {{selected.bothstr | safe}} {{selected.nonestr | safe}} default = '{{selected.defgrp | safe}}'))
    ## Sorting
    
    sortby = c('{{selected.sortgrp | safe}}')
    
    {{selected.rulesobj | safe}}  <<- arules::sort( {{selected.rulesobj | safe}} , decreasing = {{selected.ordergrp | safe}}, by = c('{{selected.sortgrp | safe}}') )
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
            toidx= min( {{selected.rulecount | safe}}, recs)
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
                    label: localization.en.src,
                    no: "src",
					action: "move"
				}) 
			},
            destination: {
                el: new dstVariableList(config, {
                    label: localization.en.destination,
                    no: "destination",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
			prunerules: { 
				el: new checkbox(config, { 
					label: localization.en.prunerules, 
					newline:true, 
                    no: "prunerules", 
                    state: "checked",
					extraction: "Boolean" 
					}) 
			},
			graphs: { 
				el: new checkbox(config, {
					label: localization.en.graphs, 
					newline:true, 
                    no: "graphs", 
					extraction: "Boolean" 
				}) 
			},
			
            label1: { 
				el: new labelVar(config, { 
					label: localization.en.label1, 
                    no: "label1",
					style:"mt-2",h: 5 
				}) 
			},

			rulesobj: {
                el: new input(config, {
                    no: 'rulesobj',
                    label: localization.en.rulesobj,
                    value:"Rules6",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
					overwrite: "variable"					
                }),
            },
			rulesobjhint: { 
				el: new labelVar(config, {
					label: localization.en.rulesobjhint, 
                    no: "rulesobjhint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			support: {
                el: new inputSpinner(config, {
                    no: 'support',
                    label: localization.en.support,
                    min: 0,
                    max: 9999999,
                    step: 0.01,
                    value: 0.1,
                    extraction: "NoPrefix|UseComma"
                })
            },
			supphint: { 
				el: new labelVar(config, { 
					label: localization.en.supphint, 
                    no: "supphint",
					style:"mt-2",h: 6 
				}) 
			},
			
			
			confidence: {
                el: new inputSpinner(config, {
                    no: 'confidence',
                    label: localization.en.confidence,
                    min: 0,
                    max: 9999999,
                    step: 0.01,
                    value: 0.8,
                    extraction: "NoPrefix|UseComma"
                })
            },
			confhint: { 
				el: new labelVar(config, { 
					label: localization.en.confhint, 
                    no:"confhint",
					style:"mt-2",h: 6 
				}) 
			},
			
            label2: { 
				el: new labelVar(config, { 
					label: localization.en.label2, 
                    no: "label2",
					style:"mt-2",h: 5 
				}) 
			},
            label3: { 
				el: new labelVar(config, { 
					label: localization.en.label3, 
                    no: "label3",
					style:"mt-2",h: 5 
				}) 
			},            

			lhs: {
                el: new input(config, {
                    no: 'lhs',
                    label: localization.en.lhs,
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
                    label: localization.en.rhs,
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
                    label: localization.en.both,
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
                    label: localization.en.none,
                    value:"",
                    extraction: "CreateArray|RemoveSpaces",
                    allow_spaces:true,
                    Type: "character",
                    wrapped: 'none=%val%,'
                }),
            },			

            label4: { 
				el: new labelVar(config, { 
					label: localization.en.label4, 
                    no: "label4",
					style:"mt-2",h: 5 
				}) 
			},

            both2: { 
				el: new radioButton(config, { 
					label: localization.en.rdboth, 
					no: "defgrp", 
					increment: "both2", 
					value: "both", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
            lhs2: { 
				el: new radioButton(config, { 
					label: localization.en.rdlhs, 
					no: "defgrp", 
					increment: "lhs2", 
					value: "lhs", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            rhs2: { 
				el: new radioButton(config, { 
					label: localization.en.rdrhs, 
					no: "defgrp", 
					increment: "rhs2", 
					value: "rhs", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            none2: { 
				el: new radioButton(config, { 
					label: localization.en.rdnone, 
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
                    label: localization.en.minlen,
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
                    label: localization.en.maxlen,
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 10,
                    extraction: "NoPrefix|UseComma"
                })
            },			
			
			sortopt: { 
				el: new labelVar(config, { 
					label: localization.en.sortopt, 
                    no:"sortopt",
					style:"mt-2",h: 5 
				}) 
			},
			
			sortby: { 
				el: new labelVar(config, { 
					label: localization.en.sortby, 
                    no: "sortby",
					style:"mt-3",h: 5 
				}) 
			},
            rd1: { 
				el: new radioButton(config, { 
					label: localization.en.rd1, 
					no: "sortgrp", 
					increment: "rd1", 
					value: "confidence", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd2: { 
				el: new radioButton(config, { 
					label: localization.en.rd2, 
					no: "sortgrp", 
					increment: "rd2", 
					value: "lift", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd3: { 
				el: new radioButton(config, { 
					label: localization.en.rd3, 
					no: "sortgrp", 
					increment: "rd3", 
					value: "support", 
					state: "", 
					extraction: "ValueAsIs" 
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
		var advoptions = {
            el: new optionsVar(config, {
                no: "advoptions",
                name: localization.en.advoptions,
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
            right: [objects.destination.el.content],
			bottom: [ objects.label1.el.content, objects.rulesobj.el.content, 
                objects.rulesobjhint.el.content, objects.support.el.content, objects.supphint.el.content,objects.confidence.el.content,
				objects.prunerules.el.content, objects.graphs.el.content,
                objects.label2.el.content, objects.label3.el.content,
				objects.lhs.el.content, objects.rhs.el.content,objects.both.el.content, objects.none.el.content,
                objects.label4.el.content,
				objects.lhs2.el.content, objects.rhs2.el.content,objects.both2.el.content, objects.none2.el.content,
                advoptions.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-target",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
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
module.exports.item = new targetingItemsMultiVarFormat().render()