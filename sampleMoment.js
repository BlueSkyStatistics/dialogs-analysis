/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class sampleMoment extends baseModal {
    static dialogId = 'sampleMoment'
    static t = baseModal.makeT(sampleMoment.dialogId)

    constructor() {
        var config = {
            id: sampleMoment.dialogId,
            label: sampleMoment.t('title'),
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
                    label: sampleMoment.t('Target'),
                    no: "Target",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },
				
			

			 order: {
				el: new inputSpinner(config, {
			  no: 'order',
			  label: sampleMoment.t('order'),
			  min: 1,
			  max: 999,
			  step: 1,
			  value: 1,
			  extraction: "NoPrefix|UseComma"
				})
			},
			
			label2: { el: new labelVar(config, { label: sampleMoment.t('label2'), style: "mt-2", h: 6 }) },	
			
			centralMoments: {
                el: new checkbox(config, {
                    label: sampleMoment.t('centralMoments'),
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
                    label: sampleMoment.t('absoluteMoments'),
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
                    label: sampleMoment.t('missingValues'),
                    no: "missingValues",
                    newline: true,
					style: "mt-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
			
			
            
            label3: { el: new labelVar(config, { label: sampleMoment.t('label3'), style: "mt-2", h: 6 }) },
			showLengthNAs: {
                el: new checkbox(config, {
                    label: sampleMoment.t('showLengthNAs'),
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
                name: sampleMoment.t('navigation'),
                icon: "icon-sample",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: sampleMoment.t('help.title'),
            r_help: sampleMoment.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: sampleMoment.t('help.body')
        }
;
    }
   
}

module.exports = {
    render: () => new sampleMoment().render()
}
