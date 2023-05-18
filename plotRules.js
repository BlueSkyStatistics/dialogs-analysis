
var localization = {
    en: {
        title: "Plot Rules",
        navigation: "Plot Rules",
		rulesobj : "Enter an existing rules object",
        label1: "Here you can specify the 'rules' object name to plot all rules or specify begin and end index to plot desired rules e.g. Rules1[1:10]",

        label2: "Visualization Method",
        scatterplot:"scatterplot",
        twokeyplot:"two-key plot",
        matrix:"matrix",
        matrix3D:"matrix3D",
        graph:"graph",
        paracoord:"paracoord",
        grouped:"grouped matrix",
		mosaic: "mosaic",
		doubledecker: "doubledecker",

        label3 : "Engine",
        engggplot2:"ggplot2",
        engdefault:"default",
        enggraphviz:"graphviz",
        enghtmlwidget:"htmlwidget",
        enginteractive:"interactive",
        engigraph:"igraph",
        engvisnetwork:"visNetwork",
		engbase : "base",
		eng3d	: "3d",
		engplotly : "plotly",
								
        label4 : "Shading",
        lift:"lift",
        support:"support",
        confidence:"confidence",
        NA:"supress shading",
        
        warn : "NOTE : Depending on the size of the 'Rules' object, some of these visualization options may take a long or may terminate  because of a lack of resources. Instead of processing the whole set of rules at once, you can specify a small set. e.g. Rules1[1:10]. ",
		javanote : "Note : This dialog requires Java (JDK/JRE). Install Java and set JAVA_HOME as an environment variable that points to the installed Java location.",

        help: {
            title: "Plot Rules",
            r_help: "help(plot, package='arulesViz')",
            body: `
			<b>
			Package : arulesViz
			</b>
			<br/><br/>
			<b>
			Description
			</b>
			<br/><br/>
			This is the S3 method to visualize association rules and itemsets. Implemented are several popular visualization methods including scatter plots with shading (two-key plots), graph based visualizations, doubledecker plots, etc.
			<br/>
			Interactive plotting with plotly is available with plotly_arules.
			<br/><br/>
			<b>
			Usage
			</b>
			<br/><br/>
			<code>
			## S3 method for class 'rules'
			plot(x, method = NULL, measure = "support", shading = "lift", 
    		interactive = FALSE, data = NULL, control = NULL, ...)
			</code>
			<br/><br/>
			<code>
			## S3 method for class 'itemsets'
			plot(x, method = NULL, measure = "support", shading = NA,
			interactive=FALSE, data = NULL, control = NULL, ...)
			</code>			
			<br/><br/>
			<b>
			Arguments
			</b>
			<br/>
			<ul>
			<li>
			x: an object of class "rules" or "itemsets".
			</li>
			<li>
			method: a string with value "scatterplot", "two-key plot", "matrix", "matrix3D", "mosaic", "doubledecker", "graph", "paracoord" or "grouped", "iplots" selecting the visualization method (see Details).
			</li>
			<li>
			measure: measure(s) of interestingness (e.g., "support", "confidence", "lift", "order") used in the visualization. Some visualization methods need one measure, others take a vector with two measures (e.g., scatterplot). In some plots (e.g., graphs) NA can be used to suppress using a measure.
			</li>
			<li>
			shading: measure of interestingness used for the color of the points/arrows/nodes (e.g., "support", "confidence", "lift"). The default is "lift". NA can be often used to suppress shading.
			</li>
			<li>
			interactive: enable interactive exploration (not implemented by all methods).
			</li>
			<li>
			control: a list of control parameters for the plot. The available control parameters depends on the visualization technique (see Details).
			</li>
			<li>
			data: the dataset (class "transactions") used to generate the rules/itemsets. Only "mosaic" and "doubledecker" require the original data.
			</li>
			<li>
			...: further arguments are usually passed on to the low level plotting function. For scatterplot it is added for convenience to the control list (see above).
			</li>			
			</ul>
			<br/><br/>
			
			<b>
			Details
			</b>
			<br/>
			Most visualization techniques are described by Bruzzese and Davino (2008), however, we added more color shading, reordering and interactive features. Many visualization methods take extra parameters as a list in the control parameter. Some of the parameters are described below. Use verbose mode with, e.g., plot(rules, method = "graph", control = list(verbose = TRUE)) to get a complete list of parameters and theit default values.
			<br/>
			The following visualization method are available:
			<br/><br/>

			<b>"scatterplot", "two-key plot"</b>
			<br/>
			This visualization method draws a two dimensional scatterplot with different measures of interestingness (parameter "measure") on the axes and a third measure (parameter "shading") is represented by the color of the points. There is a special value for shading called "order" which produces a two-key plot where the color of the points represents the length (order) of the rule.
			<br/>
			Interactive manipulations are available.
			<br/>
			The list of control parameters for this method is:
			<br/><br/>
			"main" :
			<br/>
			plot title
			<br/><br/>
			
			"pch" :
			<br/>
			use filled symbols: 20-25
			<br/><br/>
			
			"cex" :
			<br/>
			symbol size
			<br/><br/>
			
			"xlim","ylim" :
			<br/>
			limits
			<br/><br/>
			
			"jitter" :
			<br/>
			a number greater than 0 adds jitter to the points. If overplotting would occur, jitter defaults to .1.
			<br/><br/>
			
			"col" :
			<br/>
			color palette
			<br/><br/><br/>
			
			
			
			<b>"matrix", "matrix3D"</b>
			<br/>
			Arranges the association rules as a matrix with the itemsets in the antecedents on one axis and the itemsets in the consequents on the other. The interest measure is either visualized by a color (darker means a higher value for the measure) or as the height of a bar (method "matrix3D").
			<br/>
			Currently there is no interactive version available.
			<br/>
			The list of control parameters for this method is:
			<br/><br/>
			"main" :
			<br/>
			plot title
			<br/><br/>

			
			"type" :
			<br/>
			defines the way the data is rendered: "grid", "image" or "3D" (scatterplot3d)
			<br/><br/>
			
			"reorder" :
			<br/>
			if TRUE then the itemsets on the x and y-axes are reordered to bring rules with similar values for the interest measure closer together and make the plot clearer.
			<br/><br/>
			
			"orderBy" :
			<br/>
			specifies the measure of interest for reordering (default is the visualized measure)
			<br/><br/>
			
			"reorderMethod","reorderControl","reorderDist" :
			<br/>
			seriation method, control arguments and distance method (default "euclidean") used for reordering (see seriate() method in seriation)
			<br/><br/>
			
			"col" :
			<br/>
			a vector of n colors used for the plot (default: 100 heat colors)
			<br/><br/>
			
			"xlim","ylim" :
			<br/>
			limits
			<br/><br/><br/>
			
			
			
			<b>"grouped"</b>
			<br/>
			Grouped matrix-based visualization (Hahsler and Karpienko, 2016; Hahsler 2016). Antecedents (columns) in the matrix are grouped using clustering. Groups are represented by the most interesting item (highest ratio of support in the group to support in all rules) in the group. Balloons in the matrix are used to represent with what consequent the antecedents are connected.
			<br/>
			Interactive manipulations are available. They can be used to zoom into groups and identify rules.
			<br/>
			The list of control parameters for this method is:
			<br/><br/>
			"main" :
			<br/>
			plot title
			<br/><br/>
			
			"k" :
			<br/>
			number of antecedent groups (default: 20)
			<br/><br/>
			
			"rhs_max" :
			<br/>
			maximal number of RHSs to show. The rest are suppressed. (default: 10)
			<br/><br/>
			
			"lhs_items" :
			<br/>
			number of LHS items shown (default: 2)
			<br/><br/>
			
			"aggr.fun" :
			<br/>
			aggregation function can be any function computing a scalar from a vector (e.g., min, mean, median (default), sum, max). It is also used to reorder the balloons in the plot.
			<br/><br/>

			"col" :
			<br/>
			color palette (default is 100 heat colors.)
			<br/><br/>
			
			"gp_labels", "gp_main", "gp_labs", "gp_lines" :
			<br/>
			gpar() objects used to specify color, font and font size for different elements.
			<br/><br/><br/>
			
			
			
			<b>"graph"</b>
			<br/>
			Represents the rules (or itemsets) as a graph.
			<br/>
			Control arguments are:
			<br/><br/>
			"main" :
			<br/>
			plot title
			<br/><br/>
			
			"cex" :
			<br/>
			cex for labels
			<br/><br/>
			
			"itemLabels" :
			<br/>
			display item/itemset names instead of ids (TRUE)
			<br/><br/>
			
			"edgeCol", "nodeCol" :
			<br/>
			color palettes for edges and nodes.
			<br/><br/>
			
			"measureLabels" :
			<br/>
			display values of interest measures (FALSE)
			<br/><br/>
			
			"precision" :
			<br/>
			number of digits for numbers in plot.
			<br/><br/>
			
			"type" :
			<br/>
			vertices represent: "items" (default) or "itemsets"
			<br/><br/>
			
			"engine" :
			<br/>
			graph layout engine: "igraph" (default) or "graphviz"
			<br/><br/>
			
			"layout" :
			<br/>
			layout algorithm defined in igraph or Rgraphviz (default: igraph::nicely which usually does a Fruchterman-Reingold layout for engine igraph and "dot"/"neato" for graphviz)
			<br/><br/>

			"arrowSize" :
			<br/>
			[0,1]
			<br/><br/>
			
			"alpha" :
			<br/>
			alpha transparency value (default .8; set to 1 for no transparency)
			<br/><br/>
			
			
			For the igraph engine the used plot function is plot.igraph in igraph. For graphviz the function plot in Rgraphviz is used. Note that Rgraphviz is available at http://www.bioconductor.org/. For the interactive version tkplot in igraph is always used.
			<br/>
			... arguments are passed on to the respective plotting function (use for color, etc.).
			<br/><br/><br/>

			<b>"doubledecker", "mosaic"</b>
			<br/>
			Represents a single rule as a doubledecker or mosaic plot. Parameter data has to be specified to compute the needed contingency table. Available control parameters are:
			<br/><br/>
			"main" :
			<br/>
			plot title
			<br/><br/><br/>
			
			
			
			<b>"paracoord"</b> 
			<br/>
			Represents the rules (or itemsets) as a parallel coordinate plot. Currently there is no interactive version available. Available control parameters are:
			<br/><br/>
			"main" :
			<br/>
			plot title
			<br/><br/>
			
			"reorder" :
			<br/>
			reorder to minimize crossing lines.
			<br/><br/>
			
			"alpha" :
			<br/>
			alpha transparency value
			<br/><br/><br/>
			
			
			
			<b>"iplots"</b>
			<br/>
			Experimental interactive plots (package iplots) which support selection, highlighting, brushing, etc. Currently plots a scatterplot (support vs. confidence) and several histograms. Interactive manipulations are available.
			<br/><br/><br/>

			<b>
			Value
			</b>
			<br/>
			Several interactive plots return a set of selected rules/itemsets. Other plots might return other data structures. For example graph-based plots return the graph (invisibly).			
    `}
    }
}

class plotRules extends baseModal {
    constructor() {
        var config = {
            id: "plotRules",
            label: localization.en.title,
            modalType: "two",
            RCode: `
library(arules); 
library(arulesViz); 
library(iplots); 

plot({{selected.rulesobj | safe}}, method = "{{selected.methgrp | safe}}", engine = "{{selected.enggrp | safe}}", shading = {{selected.shgrp | safe}})

`
        }
		
        var objects = {
			javanote: { 
				el: new labelVar(config, { 
					label: localization.en.javanote, 
                    no:"javanote",
					style:"mt-2",
					h: 5 
				}) 
			},

			rulesobj: {
                el: new input(config, {
                    no: 'rulesobj',
                    label: localization.en.rulesobj,
                    value:"Rules1",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    type: "character"					
                }),
            },
			label1: { 
				el: new labelVar(config, { 
					label: localization.en.label1, 
                    no:"label1",
					style:"mt-2",
					h: 5 
				}) 
			},					
		
			label2: { 
				el: new labelVar(config, { 
					label: localization.en.label2, 
                    no:"label2",
					style:"mt-2",
					h: 5 
				}) 
			},					
		            

            scatterplot: { 
				el: new radioButton(config, { 
					label: localization.en.scatterplot, 
					no: "methgrp", 
					increment: "scatterplot", 
					value: "scatterplot", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            twokeyplot: { 
				el: new radioButton(config, { 
					label: localization.en.twokeyplot, 
					no: "methgrp", 
					increment: "twokeyplot", 
					value: "two-key plot", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            matrix: { 
				el: new radioButton(config, { 
					label: localization.en.matrix, 
					no: "methgrp", 
					increment: "matrix", 
					value: "matrix", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            matrix3D: { 
				el: new radioButton(config, { 
					label: localization.en.matrix3D, 
					no: "methgrp", 
					increment: "matrix3D", 
					value: "matrix3D", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            graph: { 
				el: new radioButton(config, { 
					label: localization.en.graph, 
					no: "methgrp", 
					increment: "graph", 
					value: "graph", 
					state: "checked", 
					extraction: "ValueAsIs" 
				}) 
			},
            paracoord: { 
				el: new radioButton(config, { 
					label: localization.en.paracoord, 
					no: "methgrp", 
					increment: "paracoord", 
					value: "paracoord", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            grouped: { 
				el: new radioButton(config, { 
					label: localization.en.grouped, 
					no: "methgrp", 
					increment: "grouped", 
					value: "grouped matrix", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            mosaic: { 
				el: new radioButton(config, { 
					label: localization.en.mosaic, 
					no: "methgrp", 
					increment: "mosaic", 
					value: "mosaic", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            doubledecker: { 
				el: new radioButton(config, { 
					label: localization.en.doubledecker, 
					no: "methgrp", 
					increment: "doubledecker", 
					value: "doubledecker", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},						
                    		
			
			
			label3: { 
				el: new labelVar(config, { 
					label: localization.en.label3, 
                    no:"label3",
					style:"mt-2",
					h: 5 
				}) 
			},

            engggplot2: { 
				el: new radioButton(config, { 
					label: localization.en.engggplot2, 
					no: "enggrp", 
					increment: "engggplot2", 
					value: "ggplot2", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
			
            engdefault: { 
				el: new radioButton(config, { 
					label: localization.en.engdefault, 
					no: "enggrp", 
					increment: "engdefault", 
					value: "default", 
					state: "checked", 
					extraction: "ValueAsIs"
				}) 
			},	
            enggraphviz: { 
				el: new radioButton(config, { 
					label: localization.en.enggraphviz, 
					no: "enggrp", 
					increment: "enggraphviz", 
					value: "graphviz", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
	
            enghtmlwidget: { 
				el: new radioButton(config, { 
					label: localization.en.enghtmlwidget, 
					no: "enggrp", 
					increment: "enghtmlwidget", 
					value: "htmlwidget", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
			
            enginteractive: { 
				el: new radioButton(config, { 
					label: localization.en.enginteractive, 
					no: "enggrp", 
					increment: "enginteractive", 
					value: "interactive", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},	
            engigraph: { 
				el: new radioButton(config, { 
					label: localization.en.engigraph, 
					no: "enggrp", 
					increment: "engigraph", 
					value: "igraph", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
					
            engvisnetwork: { 
				el: new radioButton(config, { 
					label: localization.en.engvisnetwork, 
					no: "enggrp", 
					increment: "engvisnetwork", 
					value: "visNetwork", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},		
            engbase: { 
				el: new radioButton(config, { 
					label: localization.en.engbase, 
					no: "enggrp", 
					increment: "engbase", 
					value: "base", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
            eng3d: { 
				el: new radioButton(config, { 
					label: localization.en.eng3d, 
					no: "enggrp", 
					increment: "eng3d", 
					value: "3d", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
            engplotly: { 
				el: new radioButton(config, { 
					label: localization.en.engplotly, 
					no: "enggrp", 
					increment: "engplotly", 
					value: "plotly", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},																				


            label4: { 
				el: new labelVar(config, { 
					label: localization.en.label4, 
                    no:"label4",
					style:"mt-2",
					h: 5 
				}) 
			},


            lift: { 
				el: new radioButton(config, { 
					label: localization.en.lift, 
					no: "shgrp", 
					increment: "lift", 
					value: '"lift"', 
					state: "checked", 
					extraction: "ValueAsIs"
				}) 
			},
			
            support: { 
				el: new radioButton(config, { 
					label: localization.en.support, 
					no: "shgrp", 
					increment: "support", 
					value: '"support"', 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},	
            confidence: { 
				el: new radioButton(config, { 
					label: localization.en.confidence, 
					no: "shgrp", 
					increment: "confidence", 
					value: '"confidence"', 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},
			
            NA: { 
				el: new radioButton(config, { 
					label: localization.en.NA, 
					no: "shgrp", 
					increment: "NA", 
					value: "NA", 
					state: "", 
					extraction: "ValueAsIs"
				}) 
			},	            


            warn: { 
				el: new labelVar(config, { 
					label: localization.en.warn, 
                    no:"warn",
					style:"mt-2",
					h: 5 
				}) 
			},
			
            
        }

        const content = {
            left: [],
            right: [],
			bottom: [objects.javanote.el.content, objects.rulesobj.el.content, objects.label1.el.content,
                    objects.label2.el.content, 
                    objects.scatterplot.el.content, objects.twokeyplot.el.content,objects.matrix.el.content,objects.matrix3D.el.content,objects.graph.el.content,
                    objects.paracoord.el.content,objects.grouped.el.content, objects.mosaic.el.content, objects.doubledecker.el.content,
                    objects.label3.el.content,
					objects.engggplot2.el.content, objects.engdefault.el.content, objects.enggraphviz.el.content,
					objects.enghtmlwidget.el.content, objects.enginteractive.el.content, objects.engigraph.el.content, objects.engvisnetwork.el.content,
					objects.engbase.el.content, objects.eng3d.el.content, objects.engplotly.el.content,
                    objects.label4.el.content,objects.lift.el.content,objects.support.el.content,
                    objects.confidence.el.content,objects.NA.el.content,
                    objects.warn.el.content
                ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-line-dot-chart",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new plotRules().render()