/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Cullen and Frey graph with descriptives of an empirical distribution for non-censored data",
		navigation: "Distribution Analysis (Cullen and Frey graph)",
		
		variableSelcted: "Select a variable that contains the distribution",
		boot: "(Optional) Boot values of skewness and kurtosis. If specified must be an integer above 10",
		discreteChk: "Discrete - unchecked (default) for uniform, normal, logistic, lognormal, beta and gamma. Checked for poisson and negative binomial",
		method: "Unbiased (default) for unbiased estimated values of statistics or sample for sample values",
	
		help: {
            title: "Description of an empirical distribution for non-censored data",
            r_help: "help(descdist, package = fitdistrplus)",
			body: `
				<b>Description</b></br>
				Computes descriptive parameters of an empirical distribution for non-censored data and provides a skewness-kurtosis plot
				<br/>
				For the detail help - use R help(descdist, package = fitdistrplus)
				<br/>
				<br/>
				Minimum, maximum, median, mean, sample sd, and sample (if method=="sample") or by default unbiased estimations of 
				skewness and Pearsons's kurtosis values are printed (Sokal and Rohlf, 1995). A skewness-kurtosis plot such as the 
				one proposed by Cullen and Frey (1999) is given for the empirical distribution. On this plot, values for common 
				distributions are also displayed as a tools to help the choice of distributions to fit to data. For some 
				distributions (normal, uniform, logistic, exponential for example), there is only one possible value for the skewness 
				and the kurtosis (for a normal distribution for example, skewness = 0 and kurtosis = 3), and the distribution is thus 
				represented by a point on the plot. For other distributions, areas of possible values are represented, consisting in 
				lines (gamma and lognormal distributions for example), or larger areas (beta distribution for example). 
				The Weibull distribution is not represented on the graph but it is indicated on the legend that shapes close to 
				lognormal and gamma distributions may be obtained with this distribution.
				<br/>
				<br/>
				In order to take into account the uncertainty of the estimated values of kurtosis and skewness from data, the data set 
				may be bootstraped by fixing the argument boot to an integer above 10. boot values of skewness and kurtosis 
				corresponding to the boot bootstrap samples are then computed and reported in blue color on the skewness-kurtosis plot.
				<br/>
				<br/>
				If discrete is TRUE, the represented distributions are the Poisson, negative binomial distributions, and the normal 
				distribution to which previous discrete distributions may converge. If discrete is FALSE, these are uniform, normal, 
				logistic, lognormal, beta and gamma distributions.
				<br/>
				<br/>
				<a href="https://stats.stackexchange.com/questions/132652/how-to-determine-which-distribution-fits-my-data-best">For a good overview of distribution fit, see https://stats.stackexchange.com/questions/132652/how-to-determine-which-distribution-fits-my-data-best</a>
				<br/>
				<br/>
				<br/>
				-x-
			`
		},
	}
}

class distributionDescriptives extends baseModal {
    constructor() {
        var config = {
            id: "distributionDescriptives",
            label: localization.en.title,
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
                    label: localization.en.variableSelcted,
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
                    label: localization.en.boot,
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
                    label: localization.en.discreteChk,
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
                    label: localization.en.method,
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
                name: localization.en.navigation,
                icon: "icon-gaussian-function",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new distributionDescriptives().render()