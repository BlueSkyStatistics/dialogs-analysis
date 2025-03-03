/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class Anscombe extends baseModal {
    static dialogId = 'Anscombe'
    static t = baseModal.makeT(Anscombe.dialogId)

    constructor() {
        var config = {
            id: Anscombe.dialogId,
            label: Anscombe.t('title'),
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
		t <- anscombe.test (var, alternative = "{{selected.gpbox1 | safe}}")
		results[i, 'Kurtosis estimator (tau)'] <- t$statistic["kurt"]
		results[i, 'Transformation (z)'] <- t$statistic["z"]
		results[i, 'p-value'] <- t$p.value
		{{if (options.selected.verbose =="TRUE")}}
		results[i, 'Alternative Hypothesis'] <- rk.describe.alternative (t)
		{{/if}}
		NA				# no error
	}, error=function (e) e$message)	# catch any errors
	
	{{if (options.selected.showLengthNAs =="TRUE")}}
	results[i, "Length"] <- length (var)
	results[i, 'NAs'] <- sum (is.na(var))
	{{/if}}
}
if (all (is.na (results$"Error"))) results$"Error" <- NULL
## Print result
BSkyFormat(results,singleTableOutputHeader = paste("Anscombe-Glynn test of kurtosis - ", "Test hypothesis (H1): {{selected.gpbox1 | safe}}" ))
})
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            Target: {
                el: new dstVariableList(config, {
                    label: Anscombe.t('Target'),
                    no: "Target",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },
			hypothesisType: { el: new labelVar(config, { label: Anscombe.t('hypothesisType'), h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: Anscombe.t('twosided'),
                    no: "gpbox1",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: Anscombe.t('greater'),
                    no: "gpbox1",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
			less: {
                el: new radioButton(config, {
                    label: Anscombe.t('less'),
                    no: "gpbox1",
                    increment: "less",
                    value: "less",
                    style: "mb:3",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },	
			label2: { el: new labelVar(config, { label: Anscombe.t('label2'), style: "mt-2", h: 6 }) },			         
            showLengthNAs: {
                el: new checkbox(config, {
                    label: Anscombe.t('showLengthNAs'),
                    no: "showLengthNAs",
                    newline: true,
					style: "mt-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            
            verbose: {
                el: new checkbox(config, {
                    label: Anscombe.t('verbose'),
                    no: "verbose",
                    newline: true,
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
            right: [objects.Target.el.content, objects.hypothesisType.el.content, objects.twosided.el.content, objects.greater.el.content, objects.less.el.content,
            objects.label2.el.content, objects.showLengthNAs.el.content, objects.verbose.el.content],
          //  bottom: [MissingVals.el.content],
            nav: {
                name: Anscombe.t('navigation'),
                icon: "icon-anscombe-glynn",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: Anscombe.t('help.title'),
            r_help: Anscombe.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: Anscombe.t('help.body')
        }
;
    }
   
}

module.exports = {
    render: () => new Anscombe().render()
}
