
var localization = {
    en: {
        title: "Multidimensional Scaling",
        navigation: "Multidimensional Scaling",
        betRows: "Between rows",
        betVariables: "Between variables",
        textSize: "Text size",
        textPos: "Text position",
        destination: "Select variables",
        maxDimensions: "Maximum dimensions",
        label1: "Distance matrix",
        computationMethod: "Computation method",
        power: "Power of Minkowski distance",
        dispDist: "Display distance matrix",
        saveDims: "Save dimensions to a new dataset",
        datasetName: "Optionally enter a dataset name to save dimensions to",
        label2: "Advanced options",
        scalingMethod:"Scaling method",
        maxIter: "Maximum number of iterations (*Not applicable for classical metric)",
        plotResults: "Plot results",
        help: {
            title: "Multidimensional Scaling",
            r_help: "help(cmdscale, package=stats)",
            body: `
<b>Description</b></br>
There are different types of MDS algorithms, including</br>
<b>Classical multidimensional scaling</b></br>
Preserves the original distance metric, between points, as well as possible. That is the fitted distances on the MDS map and the original distances are in the same metric. Classic MDS belongs to the so-called metric multidimensional scaling category.</br>
It's also known as principal coordinates analysis. It's suitable for quantitative data.</br></br>
<b>Non-metric multidimensional scaling</b></br>
It's also known as ordinal MDS. Here, it's not the metric of a distance value that is important or meaningful, but its value in relation to the distances between other pairs of objects.</br>
Ordinal MDS constructs fitted distances that are in the same rank order as the original distance. For example, if the distance of apart objects 1 and 5 rank fifth in the original distance data, then they should also rank fifth in the MDS configuration.</br>
It's suitable for qualitative data.</br>
We use the following R functions</br>
cmdscale() [stats package]: Compute classical (metric) multidimensional scaling.</br>
isoMDS() [MASS package]: Compute Kruskal's non-metric multidimensional scaling (one form of non-metric MDS).</br>
sammon() [MASS package]: Compute sammon's non-linear mapping (one form of non-metric MDS).</br>
All these functions take a distance object as the main argument and k is the desired number of dimensions in the scaled output. By default, they return two dimension solutions, but we can change that through the parameter k which defaults to 2.</br>
<br/>
Options to display the distance matrix, save the dimensions to a new dataset and plot the dimensions can be selected. </br>
When classical metric scaling method is selected, we display the eigen values, goodness of fit statistic and the screeplot. For other scaling methods we display the stress value.
<b>Help</b></br>
For detailed help run the following commands help(dist, package="stats") or help(cmdscale, package ='stats') or help(isoMDS, package = "MASS") or help(sammon, package ="MASS") in the BlueSky Statistics R editor.           
<br/>
<br/>
`}
    }
}
class multiDimensionalScaling extends baseModal {
    constructor() {
        var config = {
            id: "multiDimensionalScaling",
            label: localization.en.title,
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
                    label: localization.en.destination,
                    no: "destination",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            maxDimensions: {
                el: new inputSpinner(config, {
                    no: "maxDimensions",
                    label: localization.en.maxDimensions,
                    min: 2,
                    max: 999999,
                    step: 1,
                    value: 2,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label1: { el: new labelVar(config, { no: "label1", style: "mt-3",label: localization.en.label1, h: 5 }) },
            betRows: {
                el: new radioButton(config, {
                    label: localization.en.betRows,
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
                    label: localization.en.betVariables,
                    no: "gpbox1",
                    increment: "betVariables",
                    value: "betVariables",
                    state: "checked",            
                    extraction: "ValueAsIs"
                })
            },
            dispDist: {
                el: new checkbox(config, {
                    label: localization.en.dispDist,
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
                    label: localization.en.computationMethod,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["euclidean", "maximum", "manhattan", "canberra", "binary","minkowski"],
                    default: "euclidean"
                })
            },
            power: {
                el: new inputSpinner(config, {
                    no: "power",
                    label: localization.en.power,
                    min: 2,
                    max: 999999,
                    style: "mb-3",
                    step: 1,
                    value: 2,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { no: "label2", label: localization.en.label2, h: 5 }) },
            scalingMethod: {
                el: new comboBox(config, {
                    no: 'scalingMethod',
                    label: localization.en.scalingMethod,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["Classical(metric)", "Kruskal (non-metric)", "Sammon (non-linear)"],
                    default: "Classical(metric)"
                })
            },
            maxIter: {
                el: new inputSpinner(config, {
                    no: "maxIter",
                    label: localization.en.maxIter,
                    min: 2,
                    max: 999999,
                    step: 1,
                    value: 100,
                    extraction: "NoPrefix|UseComma"
                })
            },
            plotResults: {
                el: new checkbox(config, {
                    label: localization.en.plotResults,
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
                    label: localization.en.textSize,
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
                    label: localization.en.textPos,
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
                    label: localization.en.datasetName,
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
                name: localization.en.navigation,
                icon: "icon-ruler",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new multiDimensionalScaling().render()