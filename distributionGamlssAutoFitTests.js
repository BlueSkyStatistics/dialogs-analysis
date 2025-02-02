


class distributionGamlssAutoFitTests extends baseModal {
    static dialogId = 'distributionGamlssAutoFitTests'
    static t = baseModal.makeT(distributionGamlssAutoFitTests.dialogId)

    constructor() {
        var config = {
            id: distributionGamlssAutoFitTests.dialogId,
            label: distributionGamlssAutoFitTests.t('title'),
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
                    label: distributionGamlssAutoFitTests.t('variableSelcted'),
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
                    label: distributionGamlssAutoFitTests.t('distType'),
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
                    label: distributionGamlssAutoFitTests.t('tryGamlssChk'),
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
                    label: distributionGamlssAutoFitTests.t('additionalDetailChk'),
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
                    label: distributionGamlssAutoFitTests.t('traceFitProcessingChk'),
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
                    label: distributionGamlssAutoFitTests.t('wormPlotChk'),
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
                name: distributionGamlssAutoFitTests.t('navigation'),
                icon: "icon-gaussian-function",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: distributionGamlssAutoFitTests.t('help.title'),
            r_help: distributionGamlssAutoFitTests.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: distributionGamlssAutoFitTests.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new distributionGamlssAutoFitTests().render()
}
