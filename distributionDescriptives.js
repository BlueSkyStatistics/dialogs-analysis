/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class distributionDescriptives extends baseModal {
    static dialogId = 'distributionDescriptives'
    static t = baseModal.makeT(distributionDescriptives.dialogId)

    constructor() {
        var config = {
            id: distributionDescriptives.dialogId,
            label: distributionDescriptives.t('title'),
            modalType: "two",
            RCode:`

require(fitdistrplus)

descdist_ret_vals = NULL 

{{if(options.selected.boot === "")}} 
	
descdist_ret_vals = fitdistrplus::descdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}),
						boot = NULL,
						discrete = {{selected.discreteChk | safe}},  
						method = '{{selected.method | safe}}', 
						graph = TRUE, obs.col="blue", obs.pch = 15)		
			
{{#else}}	

descdist_ret_vals = fitdistrplus::descdist(data = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}),
						boot = {{selected.boot | safe}},
						discrete = {{selected.discreteChk | safe}},  
						method = '{{selected.method | safe}}', 
						graph = TRUE, obs.col="blue", obs.pch = 15, boot.col="orange")
					
{{/if}}

if(!is.null(descdist_ret_vals))
	BSkyFormat(descdist_ret_vals, 
		  outputTableRenames = paste("Descriptives: distribution {{selected.variableSelcted | safe}}"),
		  outputTableIndex = c(tableone=1), 
		  outputColumnIndex = c(tableone=c(1,2)),
		  outputColumnRenames = c(tableone = c("Stats","Value")))

					
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) }, 
			variableSelcted: {
                el: new dstVariable(config, {
                    label: distributionDescriptives.t('variableSelcted'),
                    no: "variableSelcted",
                    required: true,
                    //filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					filter: "Numeric|Scale",
					//style: "mt-1 ml-3",
                    extraction: "NoPrefix",
                }), r: ['{{ var | safe}}']
            },
			boot: {
                el: new input(config, {
                    no: 'boot',
                    label: distributionDescriptives.t('boot'),
                    placeholder: "",
                    required: false,
                    type: "numeric",
					//filter: "character|numeric",
					//style: "ml-5",
                    extraction: "TextAsIs",
					allow_spaces:true,
                    value: "",
					style: "mb-3",
					width: "w-25",
                })
            },
			discreteChk: {
                el: new checkbox(config, {
                    label: distributionDescriptives.t('discreteChk'),
                    no: "discreteChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            }, 
			method: {
                el: new selectVar(config, {
                    no: 'method',
                    label: distributionDescriptives.t('method'),
                    multiple: false,
                    //required: true,
                    extraction: "NoPrefix|UseComma",
					options: ["unbiased", "sample"],
                    default: "unbiased",
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [
					objects.variableSelcted.el.content,
					objects.boot.el.content,
					objects.discreteChk.el.content,
					objects.method.el.content
					],
            nav: {
                name: distributionDescriptives.t('navigation'),
                icon: "icon-gaussian-function",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: distributionDescriptives.t('help.title'),
            r_help: distributionDescriptives.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: distributionDescriptives.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new distributionDescriptives().render()
}
