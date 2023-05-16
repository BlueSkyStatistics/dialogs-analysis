
var localization = {
    en: {
        title: "Item Frequency Plot, Basket Format",
        navigation: "Item Frequency Plot, Basket Format",
        src: "Source variables",
        datasetcol: "Selected variable",
        separator: "Separator for items in a baset, e.g. , or ; or :",
        plotOpts: "Plot Options",
		topN: "Top N items to plot",
        horizcheck: "Show bars hrizontally",
        freqtype: "Item Frequency Type",
		relative : "relative",
		absolute : "absolute",
		
		
		
        help: {
            title: "Item Frequency Plot, Basket Format",
            r_help: "help(itemFrequencyPlot , package='arules')",
            body: `
            <b>
            NOTE: Depending on the format of the data, you will choose either the 'Basket data format; or 'Multi-line transaction format'.  A separate set of dialogs are provided for each of these data formats. See below for details:
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
            Provides the generic function <code>itemFrequencyPlot</code> and the S4 method to create an item frequency bar plot for inspecting the item frequency distribution for objects based on itemMatrix (e.g., transactions, or items in itemsets and rules).   
            <br/><br/>
            <b>Usage</b> 
            <br/>  
            <code>
            itemFrequencyPlot(x, ...)
            ## S4 method for signature 'itemMatrix'
            itemFrequencyPlot(x, type = c("relative", "absolute"), 
                weighted = FALSE, support = NULL, topN = NULL,
                population = NULL, popCol = "black", popLwd = 1,
                lift = FALSE, horiz = FALSE, 
                names = TRUE, cex.names =  graphics::par("cex.axis"), 
                xlab = NULL, ylab = NULL, mai = NULL, ...)
            </code>
            <br/><br/>

            <b>Arguments</b><br/>
            <ul>
            <li>
            x : the object to be plotted.
            </li>
            <li>
            ... : further arguments are passed on (see barplot from possible arguments).
            </li>
            <li>
            type : a character string indicating whether item frequencies should be displayed relative of absolute.
            </li>
            <li>
            weighted : should support be weighted by transactions weights stored as column "weight" in transactionInfo?
            </li>
            <li>
            support : a numeric value. Only display items which have a support of at least support. If no population is given, support is calculated from x otherwise from the population. Support is interpreted relative or absolute according to the setting of type.
            </li>
            <li>
            topN : a integer value. Only plot the topN items with the highest item frequency or lift (if lift = TRUE). The items are plotted ordered by descending support.
            </li>
            <li>
            population : object of same class as x; if x is a segment of a population, the population mean frequency for each item can be shown as a line in the plot.
            </li>
            <li>
            popCol : plotting color for population.
            </li>  
            <li>
            popLwd : line width for population.
            </li>
            <li>
            lift : a logical indicating whether to plot the lift ratio between instead of frequencies. The lift ratio is gives how many times an item is more frequent in x than in population.
            </li>
            <li>
            horiz : a logical. If horiz = FALSE (default), the bars are drawn vertically. If TRUE, the bars are drawn horizontally.
            </li>
            <li>
            names : a logical indicating if the names (bar labels) should be displayed?
            </li>  
            <li>
            cex.names : a numeric value for the expansion factor for axis names (bar labels).
            </li>
            <li>
            xlab : a character string with the label for the x axis (use an empty string to force no label).
            </li>
            <li>
            ylab : a character string with the label for the y axis (see xlab).
            </li>
            <li>
            mai : a numerical vector giving the plots margin sizes in inches (see ‘? par’).
            </li>                                                                        
            </ul>
            <br/><br/>
            <b>Value</b><br/>            
            A numeric vector with the midpoints of the drawn bars; useful for adding to the graph.
    `}
    }
}

class ItemFreqPlotBasketData extends baseModal {
    constructor() {
        var config = {
            id: "ItemFreqPlotBasketData",
            label: localization.en.title,
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
                    label: localization.en.src,
                    no: "src",
					action: "move"
				}) 
			},
            datasetcol: {
                el: new dstVariable(config, {
                    label: localization.en.datasetcol,
                    no: "datasetcol",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "Prefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
	
			separator: {
                el: new input(config, {
                    no: 'separator',
                    label: localization.en.separator,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    Type: "character",                  
                    value: ","
                }),
            },
			
            plotOpts: { 
				el: new labelVar(config, { 
					label: localization.en.plotOpts, 
                    no: "plotOpts",
					style:"mt-2",h: 5 
				}) 
			},		
			topN: {
                el: new inputSpinner(config, {
                    no: 'topN',
                    label: localization.en.topN,
                    min: 0,
                    max: 9999999,
                    step: 0.1,
                    value: 20,
                    extraction: "NoPrefix|UseComma"
                })
            },			
		
			horizcheck: { 
				el: new checkbox(config, { 
					label: localization.en.horizcheck, 
					newline:true, 
                    no: "horizcheck", 
					extraction: "Boolean" 
					}) 
			},

			
            freqtype: { 
				el: new labelVar(config, { 
					label: localization.en.freqtype, 
                    no: "freqtype",
					style:"mt-2",h: 5 
				}) 
			},


            rd1: { 
				el: new radioButton(config, { 
					label: localization.en.relative, 
					no: "typegrp", 
					increment: "rd1", 
					value: "relative", 
					state: "", 
					extraction: "ValueAsIs" 
				}) 
			},
            rd2: { 
				el: new radioButton(config, { 
					label: localization.en.absolute, 
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
                name: localization.en.navigation,
                icon: "icon-line-dot-chart",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new ItemFreqPlotBasketData().render()