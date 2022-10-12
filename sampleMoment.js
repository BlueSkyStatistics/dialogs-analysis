var localization = {
    en: {
		navigation: "Sample Moment",
		title: "Sample Moment",
        label2: "Specific test settings",
		label3: "Additional settings",
        showLengthNAs: "Show length and NAs",
		order: "Order",
		centralMoments : "Compute central moments",
		absoluteMoments :"Compute absolute moments",
		missingValues: "Remove missing values",
        Target: "Select one or more variables",
        help: {
            title: "Sample Moment",
            r_help: "help(moment, package ='moments')",
            body: `
<b>Description</b></br>
This function computes the sample moment of specified order.
<br/>
<b>Usage</b>
<br/>
<code> 
moment(x, order = 1, central = FALSE, absolute = FALSE, na.rm = FALSE)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: a numeric vector of data values.
</li>
<li>
order: order of the moment to be computed
</li>
<li>
central: a logical value - if central moments are to be computed.</br>
</li>
<li>
</li>
<li>
absolute: a logical value - if absolute moments are to be computed.</br>
</li>
<li>
na.rm: a logical value - remove NA values?.</br>
</li>
</ul>
<b>Example</b></br>
<code> 
set.seed(1234)</br>
x = rnorm(1000)</br>
moment(x))</br>
moment(x,order=3,absolute=TRUE)</br>
</code> <br/>
<b>Package</b></br>
moments</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(moment, package ='moments') in the BlueSky Statistics R editor.           
<br/>
<br/>	
			`}
    }
}
class sampleMoment extends baseModal {
    constructor() {
        var config = {
            id: "sampleMoment",
            label: localization.en.title,
            splitProcessing: false,
            modalType: "two",
            RCode: `
local({
## Prepare
require(moments)
## Compute
vars <- c({{selected.Target | safe}})
results <- data.frame ('Variable Name'=vars, check.names=FALSE)

for (i in 1:length (vars)) {
	var <- vars[[i]]
	var <- {{dataset.name}}[, vars[i]]
	results[i, "Error"] <- tryCatch ({
		# This is the core of the calculation
		results[i, "Moment"] <- moment (var, order = {{selected.order | safe}}, central = {{selected.centralMoments | safe}}, absolute = {{selected.absoluteMoments | safe}}, na.rm = {{selected.missingValues | safe}})
		NA				# no error
	}, error=function (e) e$message)	# catch any errors	
}
if (all (is.na (results$"Error"))) results$"Error" <- NULL
attr(results, "BSkyFootnote_BSkyfooter") = paste("Statistical Moment - ", paste("Parameters: Order =", "{{selected.order | safe}}, ",
"compute central moments =", "{{selected.centralMoments | safe}}, ",
"compute absolute moments =", "{{selected.absoluteMoments | safe}}, ",
"remove missing values =", "{{selected.missingValues | safe}}") )
## Print result
BSkyFormat(results,singleTableOutputHeader ="Statistical Moment" )
})
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            Target: {
                el: new dstVariableList(config, {
                    label: localization.en.Target,
                    no: "Target",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },
				
			

			 order: {
				el: new inputSpinner(config, {
			  no: 'order',
			  label: localization.en.order,
			  min: 1,
			  max: 999,
			  step: 1,
			  value: 1,
			  extraction: "NoPrefix|UseComma"
				})
			},
			
			label2: { el: new labelVar(config, { label: localization.en.label2, style: "mt-2", h: 6 }) },	
			
			centralMoments: {
                el: new checkbox(config, {
                    label: localization.en.centralMoments,
                    no: "centralMoments",
                    newline: true,
					style: "mt-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
			
			absoluteMoments: {
                el: new checkbox(config, {
                    label: localization.en.absoluteMoments,
                    no: "absoluteMoments",
                    newline: true,
					style: "mt-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
			
			missingValues: {
                el: new checkbox(config, {
                    label: localization.en.missingValues,
                    no: "missingValues",
                    newline: true,
					style: "mt-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
			
			
            
            label3: { el: new labelVar(config, { label: localization.en.label3, style: "mt-2", h: 6 }) },
			showLengthNAs: {
                el: new checkbox(config, {
                    label: localization.en.showLengthNAs,
                    no: "showLengthNAs",
                    newline: true,
					style: "mt-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            }
            
        }
        
        const content = {
         //   head: [objects.label2.el.content],
            left: [objects.content_var.el.content],
            right: [objects.Target.el.content, objects.order.el.content, objects.label2.el.content, objects.centralMoments.el.content, objects.absoluteMoments.el.content,
            objects.missingValues.el.content,  objects.label3.el.content,objects.showLengthNAs.el.content,],
          //  bottom: [MissingVals.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sample",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
   
}
module.exports.item = new sampleMoment().render()