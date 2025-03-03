/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Fitting Different Parametric gamlss.family Distributions (from R pkg gamlss)",
		navigation: "Distribution fit with gamlss",
		
		variableSelcted: "Select a variable that contains the distribution",
		distType: "Type of gamlss.family of distributions to be tried",
		tryGamlssChk: "if checked (will be slow for large data points), it will try gamlss() instead of gamlssML() if it fails to fit the model",
		traceFitProcessingChk: "Show more information while processing",
		additionalDetailChk: "Display AIC score of all successful fit tests and the list of all failed fit tests",
		wormPlotChk: "Draw the worm plot graph",
		
		help: {
            title: "Fitting Different Parametric gamlss.family Distributions",
            r_help: "help(fitDist , package = gamlss)",
			body: `
				<b>Description</b></br>
				The function fitDist() is using the function gamlssML() to fit all relevant parametric gamlss.family distributions, 
				specified by the argument type, to a single data vector (with no explanatory variables). The final marginal 
				distribution is the one selected by the generalised Akaike information criterion with penalty k. 
				The default is k=2 i.e AIC which means that the "best" distribution is selected according to the classic AIC. 
				k can be set to anything, such as log(n) for the BIC (not provided on the dialog at this time)
				<br/>
				<br/>
				For the detail help - use R help(fitDist , package = gamlss) and for worm plot, help(wp , package = gamlss)
				<br/>
				<br/>
				The following are the different type argument:
				<br/>
				realAll: All the gamlss.family (not provided on the dialog at this time) continuous distributions defined on the real line, i.e. realline and the real positive line i.e. realplus
				<br/>
				<br/>
				realline: The gamlss.family continuous distributions : "NO", "GU", "RG" ,"LO", "NET", "TF", "TF2", "PE","PE2", "SN1", "SN2", "exGAUS", "SHASH", "SHASHo","SHASHo2", "EGB2", "JSU", "JSUo", "SEP1", "SEP2", "SEP3", "SEP4", "ST1", "ST2", "ST3", "ST4", "ST5", "SST", "GT"
				<br/>
				<br/>
				realplus: The gamlss.family continuous distributions in the positive real line: "EXP", "GA","IG","LOGNO", "LOGNO2","WEI", "WEI2", "WEI3", "IGAMMA","PARETO2", "PARETO2o", "GP", "BCCG", "BCCGo", "exGAUS", "GG", "GIG", "LNO","BCTo", "BCT", "BCPEo", "BCPE", "GB2"
				<br/>
				<br/>
				real0to1: The gamlss.family continuous distributions from 0 to 1: "BE", "BEo", "BEINF0", "BEINF1", "BEOI", "BEZI", "BEINF", "GB1""
				<br/>
				<br/>
				counts: The gamlss.family distributions for counts: "PO", "GEOM", "GEOMo","LG", "YULE", "ZIPF", "WARING", "GPO", "DPO", "BNB", "NBF","NBI", "NBII", "PIG", "ZIP","ZIP2", "ZAP", "ZALG", "DEL", "ZAZIPF", "SI", "SICHEL","ZANBI", "ZAPIG", "ZINBI", "ZIPIG", "ZINBF", "ZABNB", "ZASICHEL", "ZINBF", "ZIBNB", "ZISICHEL"
				<br/>
				<br/>
				binom: The gamlss.family distributions for binomial type data :"BI", "BB", "DB", "ZIBI", "ZIBB", "ZABI", "ZABB"
				<br/>
				<br/>
				The function fitDist() uses the function gamlssML() to fit the different models
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

class distributionGamlssAutoFitTests extends baseModal {
    constructor() {
        var config = {
            id: "distributionGamlssAutoFitTests",
            label: localization.en.title,
            modalType: "two",
            RCode:`

require(gamlss)
require(gamlss.dist)
require(gamlss.add)

dist_fit = NULL 


BSkyFormat("\nIf the distribution variable {{selected.variableSelcted | safe}} generates R errors during distribution fit test, try choosing different 'type' of gamlss.family from the dropdown choices")


BSkyFormat(paste('Progress status to test gamlss.family of distributions for {{selected.variableSelcted | safe}} to find the best distribution fit the minimizes the GAIC (Generalized Akaike Information Criterion)'))

suppressWarnings(
dist_fit  <- gamlss::fitDist(y = as.numeric({{dataset.name}}\${{selected.variableSelcted | safe}}), 
					   k = 2, 
					   type = '{{selected.distType | safe}}', 
					   try.gamlss = {{selected.tryGamlssChk | safe}},
					   trace = {{selected.traceFitProcessingChk | safe}}
					)
) 
	

if(!is.null(dist_fit)){
	BSkyFormat("Best distribution fit found that minimizes the GAIC (Generalized Akaike Information Criterion)")
	summary(dist_fit)
{{if(options.selected.additionalDetailChk === "TRUE")}}
	if(length(dist_fit$fits) > 0){
		fits_AIC =matrix((dist_fit$fits), ncol =1)
		dimnames(fits_AIC) = list((names(dist_fit$fits)), "AIC")
		BSkyFormat(fits_AIC, outputTableRenames = "Distribution fit tests with GAIC value from low to high")
	}
	
	if(length(dist_fit$failed) > 0){
		failed_fits = t(unique(as.data.frame(dist_fit$failed)))
		failed_fits = as.data.frame(failed_fits[order(failed_fits[,1]),])
		row.names(failed_fits) = NULL
		names(failed_fits) = "Fit Tests" 
		BSkyFormat(failed_fits, outputTableRenames = "Failed distribution fit tests")
	}
{{/if}}
}

{{if(options.selected.wormPlotChk === "TRUE")}}
	BSkyFormat("Worm Plot")
	if(!is.null(dist_fit)){
		wp(dist_fit)
	}
{{/if}}


					
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
			distType: {
                el: new selectVar(config, {
                    no: 'distType',
                    label: localization.en.distType,
                    multiple: false,
                    //required: true,
                    extraction: "NoPrefix|UseComma",
					options: ["realplus", "realline", "real0to1", "counts", "binom"],
                    default: "realplus",
					style: "mb-2",
                })
            },
			tryGamlssChk: {
                el: new checkbox(config, {
                    label: localization.en.tryGamlssChk,
                    no: "tryGamlssChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
					state: "checked",
					style: "mb-2",
                })
            }, 
			additionalDetailChk: { 
                el: new checkbox(config, {
                    label: localization.en.additionalDetailChk,
                    no: "additionalDetailChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
					style: "mb-2",
                })
            }, 
			traceFitProcessingChk: { 
                el: new checkbox(config, {
                    label: localization.en.traceFitProcessingChk,
                    no: "traceFitProcessingChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
					state: "checked",
					style: "mb-2",
                })
            }, 
			wormPlotChk: { 
                el: new checkbox(config, {
                    label: localization.en.wormPlotChk,
                    no: "wormPlotChk",
                    style: "mb-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            }, 
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [
					objects.variableSelcted.el.content,
					objects.distType.el.content,
					objects.additionalDetailChk.el.content,
					objects.wormPlotChk.el.content,
					objects.tryGamlssChk.el.content,
					objects.traceFitProcessingChk.el.content 
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
module.exports.item = new distributionGamlssAutoFitTests().render()