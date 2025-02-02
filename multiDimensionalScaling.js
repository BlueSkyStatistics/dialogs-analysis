

class multiDimensionalScaling extends baseModal {
    static dialogId = 'multiDimensionalScaling'
    static t = baseModal.makeT(multiDimensionalScaling.dialogId)

    constructor() {
        var config = {
            id: multiDimensionalScaling.dialogId,
            label: multiDimensionalScaling.t('title'),
            modalType: "two",
            RCode: `
require(MASS)
{{if (options.selected.gpbox1 == "betRows")}}
mds.distances <- dist( x = {{dataset.name}}[, c({{selected.destination | safe}})] ,method = "{{selected.computationMethod | safe}}" {{if (options.selected.computationMethod =="minkowski")}}, p ={{selected.power | safe}} {{/if}})
{{#else}}
mds.distances <- dist( x = base::t({{dataset.name}}[, c({{selected.destination | safe}})]) ,method = "{{selected.computationMethod | safe}}" {{if (options.selected.computationMethod =="minkowski")}}, p ={{selected.power | safe}} {{/if}})
{{/if}}
{{if (options.selected.dispDist == "TRUE")}}
\nBSkyprint.dist(mds.distances)
{{/if}}
{{if (options.selected.scalingMethod =="Classical(metric)")}} mds.results <- stats::cmdscale( d = mds.distances, k ={{selected.maxDimensions | safe}}, eig = TRUE){{/if}}
{{if (options.selected.scalingMethod =="Kruskal (non-metric)")}}mds.results <- MASS::isoMDS( d = mds.distances, k ={{selected.maxDimensions | safe}}, maxit ={{selected.maxIter | safe}}){{/if}}
{{if (options.selected.scalingMethod =="Sammon (non-linear)")}}mds.results <- MASS::sammon( d = mds.distances, k ={{selected.maxDimensions | safe}}, niter ={{selected.maxIter | safe}}){{/if}}
\ncolnames(mds.results$points) <- paste ("Dim.",seq(1:{{selected.maxDimensions | safe}}), sep="")
#Display dimensions
BSkyFormat(mds.results$points, singleTableOutputHeader = "Dimensions" )
{{if (options.selected.scalingMethod == "Classical(metric)")}}
#Display eigen values
BSkyFormat(data.frame(Values = round(mds.results$eig[round(mds.results$eig) > 0], digits = BSkyGetDecimalDigitSetting())), singleTableOutputHeader = "Eigen values", perTableFooter = c("We only display eigen values > 0"))
#Screeplot
options(scipen=999)
plot(round(mds.results$eig, digits = BSkyGetDecimalDigitSetting()), type="l", ylab="Eigen values", main ="Screeplot")
options(scipen=0)
#Goodness of fit test
BSkyFormat(mds.results$GOF, singleTableOutputHeader = "Goodness of fit")
{{#else}}
#Goodness of fit test
cat(paste("Stress:",format( round(mds.results$stress, digits = BSkyGetDecimalDigitSetting()), scientific=FALSE )))
{{/if}}
#Plot dimensions
{{if (options.selected.plotResults =="TRUE")}}
{
    plot(mds.results[["points"]],
            main="Multidimensional scaling",
            sub="Solution with {{selected.maxDimensions | safe}} dimensions ({{selected.scalingMethod | safe}})")
    text(mds.results[["points"]],
            rownames(mds.results[["points"]]),
            cex={{selected.textSize | safe}},
            pos={{if(options.selected.textPos =="Below point")}}1{{/if}}{{if(options.selected.textPos =="Left to point")}}2{{/if}}{{if(options.selected.textPos =="Above point")}}3{{/if}}{{if(options.selected.textPos =="Right to point")}}4{{/if}})
}
{{/if}}
{{if (options.selected.datasetName != "")}}
.GlobalEnv\${{selected.datasetName | safe}} = as.data.frame(mds.results[["points"]])
BSkyLoadRefresh(bskyDatasetName="{{selected.datasetName | safe}}")\n
{{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) },
            destination: {
                el: new dstVariableList(config, {
                    label: multiDimensionalScaling.t('destination'),
                    no: "destination",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            maxDimensions: {
                el: new inputSpinner(config, {
                    no: "maxDimensions",
                    label: multiDimensionalScaling.t('maxDimensions'),
                    min: 2,
                    max: 999999,
                    step: 1,
                    value: 2,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label1: { el: new labelVar(config, { no: "label1", style: "mt-3",label: multiDimensionalScaling.t('label1'), h: 5 }) },
            betRows: {
                el: new radioButton(config, {
                    label: multiDimensionalScaling.t('betRows'),
                    no: "gpbox1",
                    increment: "betRows",
                    value: "betRows",
                    style: "mb-2",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            betVariables: {
                el: new radioButton(config, {
                    label: multiDimensionalScaling.t('betVariables'),
                    no: "gpbox1",
                    increment: "betVariables",
                    value: "betVariables",
                    state: "checked",            
                    extraction: "ValueAsIs"
                })
            },
            dispDist: {
                el: new checkbox(config, {
                    label: multiDimensionalScaling.t('dispDist'),
                    no: "dispDist",
                    bs_type: "valuebox",
                    newline: true,
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE"
                    
                })
            },
            computationMethod: {
                el: new comboBox(config, {
                    no: 'computationMethod',
                    label: multiDimensionalScaling.t('computationMethod'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["euclidean", "maximum", "manhattan", "canberra", "binary","minkowski"],
                    default: "euclidean"
                })
            },
            power: {
                el: new inputSpinner(config, {
                    no: "power",
                    label: multiDimensionalScaling.t('power'),
                    min: 2,
                    max: 999999,
                    style: "mb-3",
                    step: 1,
                    value: 2,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { no: "label2", label: multiDimensionalScaling.t('label2'), h: 5 }) },
            scalingMethod: {
                el: new comboBox(config, {
                    no: 'scalingMethod',
                    label: multiDimensionalScaling.t('scalingMethod'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["Classical(metric)", "Kruskal (non-metric)", "Sammon (non-linear)"],
                    default: "Classical(metric)"
                })
            },
            maxIter: {
                el: new inputSpinner(config, {
                    no: "maxIter",
                    label: multiDimensionalScaling.t('maxIter'),
                    min: 2,
                    max: 999999,
                    step: 1,
                    value: 100,
                    extraction: "NoPrefix|UseComma"
                })
            },
            plotResults: {
                el: new checkbox(config, {
                    label: multiDimensionalScaling.t('plotResults'),
                    no: "plotResults",
                    bs_type: "valuebox",
                    newline: true,
                    style: "mt-3",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE"
                    
                })
            },
            textSize: {
                el: new inputSpinner(config, {
                    no: "textSize",
                    label: multiDimensionalScaling.t('textSize'),
                    min: 0,
                    max: 999999,
                    style: "ml-3",
                    step: 1,
                    value: 0.85,
                    extraction: "NoPrefix|UseComma"
                })
            },
            textPos: {
                el: new comboBox(config, {
                    no: 'textPos',
                    label: multiDimensionalScaling.t('textPos'),
                    multiple: false,
                    style: "ml-4",
                    extraction: "NoPrefix|UseComma",
                    options: ["Below point", "Left to point", "Above point", "Right to point"],
                    default: "Below point"
                })
            },
            datasetName: {
                el: new input(config, {
                    no: 'datasetName',
                    label: multiDimensionalScaling.t('datasetName'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    value: "", 
                    overwrite: "dataset"
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.maxDimensions.el.content, objects.label1.el.content, objects.betVariables.el.content,objects.betRows.el.content,objects.dispDist.el.content, objects.computationMethod.el.content,objects.power.el.content , objects.label2.el.content ,objects.scalingMethod.el.content ,objects.maxIter.el.content ,objects.datasetName.el.content,objects.plotResults.el.content,objects.textSize.el.content,objects.textPos.el.content  ],
            nav: {
                name: multiDimensionalScaling.t('navigation'),
                icon: "icon-ruler",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: multiDimensionalScaling.t('help.title'),
            r_help: multiDimensionalScaling.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: multiDimensionalScaling.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new multiDimensionalScaling().render()
}
