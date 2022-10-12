
var localization = {
    en: {
        title: "Hierarchical Cluster",
        navigation: "Hierarchical",
        destination: "Destination",
        clusters: "No of clusters",
        storeClusterInDataset: "Assign clusters to the dataset",
        variablename: "Variable name to store clusters",
        biplot: "Show cluster biplot",
        dendogram: "Plot cluster dendogram",
        labelForClusteringMethod: "Clustering method",
        help: {
            title: "Hierarchical Cluster",
            r_help: "help(hclust, package ='stats')",
            body: `
<b>Description</b></br>
Hierarchical cluster analysis on a set of dissimilarities and methods for analyzing it.
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyHierClust <-BSkyHierClus(varsToCluster, method="ward.D",noOfClusters, distance="euclidian",plotDendogram=FALSE, assignClusterToDataset=FALSE, label, plotBiplot =FALSE,dataset="datasetname")
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
varsToCluster: The variables to analyze 
</li>
<li>
method: the agglomeration method to be used. This should be (an unambiguous abbreviation of) one of "ward.D", "ward.D2", 
"single", "complete", "average" (= UPGMA), "mcquitty" (= WPGMA),"median" (= WPGMC) or "centroid" (= UPGMC).
</li>
<li>
noOfClusters: The number of clusters desired
</li>
<li>
plotDendogram: Plot a dendogram True or false
</li>
<li>
assignClusterToDataset: Save the cluster assignments to the dataset
</li>
<li>
label: name for the new variable that stores the cluster assignments
</li>
<li>
plotBiplot: plot Biplot TRUE or FALSE
</li>
</ul>
<b>Package</b></br>
BlueSky</br>
<b>Help</b></br>
help(hclust, package ='stats')</br></br>
<b>Description</b></br>
plotDendrogram: Calls the plot function to plot the cluster dendrogram
<br/>
<b>Usage</b>
<br/>
<code> 
plotDendogram(method,distance,dataset)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
method: see above
</li>
<li>
distance: see above
plotBiplot: plot Biplot TRUE or FALSE
</li>
</ul>
<b>Package</b></br>
BlueSky</br>
<b>Help</b></br>
help(plot)
    `}
    }
}










class hierarchicalCluster extends baseModal {
    constructor() {
        var config = {
            id: "hierarchicalCluster",
            label: localization.en.title,
            modalType: "two",
            RCode: `
#Run the cluster analysis
BSkyHierClust <-BSkyHierClus(varsToCluster=c({{selected.destination | safe}}), method="{{selected.rdgrp1 | safe}}",noOfClusters={{selected.clusters | safe}}, distance="{{selected.rdgrp2 | safe}}",plotDendogram={{selected.dendogram | safe}}, assignClusterToDataset={{selected.storeClusterInDataset | safe}}, label="{{selected.variablename | safe}}", plotBiplot ={{selected.biplot | safe}},dataset='{{dataset.name}}')
#Display results in tabular format in the output
BSkyFormat(BSkyHierClust)
#Refresh the dataset in the dataset grid
BSkyLoadRefresh("{{dataset.name}}",{{selected.storeClusterInDataset | safe}})
#Plot dendogram
if({{selected.dendogram | safe}}) {plotDendogram(method="{{selected.rdgrp1 | safe}}",distance="{{selected.rdgrp2 | safe}}",dataset='{{dataset.name}}')}
#Plot bi plot
if({{selected.biplot | safe}}) {BSkyHClustBiPlot ( noOfClusters={{selected.clusters | safe}}) }
                `
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            destination: {
                el: new dstVariableList(config, {
                    label: localization.en.destination,
                    no: "destination",
                    filter: "Numeric|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            clusters: {
                el: new inputSpinner(config, {
                    no: 'clusters',
                    label: localization.en.clusters,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 2,
                    required: true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            storeClusterInDataset: { el: new checkbox(config, { label: localization.en.storeClusterInDataset, required: true, dependant_objects: ['variablename'], no: "storeClusterInDataset", extraction: "Boolean" }) },
            variablename: {
                el: new input(config, {
                    no: 'variablename',
                    label: localization.en.variablename,
                    ml: 4,
                    placeholder: "",
                    type: "character",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            biplot: { el: new checkbox(config, { label: localization.en.biplot, no: "biplot", extraction: "Boolean" }) },
            dendogram: { el: new checkbox(config, { label: localization.en.dendogram, no: "dendogram", newline: true, extraction: "Boolean" }) },
            options: {
                el: new optionsVar(config, {
                    no: "barchart_options",
                    content: [
                        new labelVar(config, { label: "Method", h: 6 }),
                        new radioButton(config, {
                            label: "Wards Method",
                            no: "rdgrp1",
                            increment: "wards",
                            value: "ward.D",
                            state: "checked",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: "Single Linkage",
                            no: "rdgrp1",
                            increment: "single",
                            value: "single",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new radioButton(config, {
                            label: "Complete Linkage",
                            no: "rdgrp1",
                            increment: "complete",
                            value: "complete",
                            state: "",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: "Average Linkage",
                            no: "rdgrp1",
                            increment: "linkage",
                            value: "average",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new radioButton(config, {
                            label: "McQuitty's Method",
                            no: "rdgrp1",
                            increment: "mcquitty",
                            value: "mcquitty",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new radioButton(config, {
                            label: "Median Linkage",
                            no: "rdgrp1",
                            increment: "median",
                            value: "median",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new radioButton(config, {
                            label: "Centroid Linkage",
                            no: "rdgrp1",
                            increment: "centroid",
                            value: "centroid",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new labelVar(config, { label: "Metric", h: 6, style: "mt-3" }),
                        new radioButton(config, {
                            label: "Euclidean",
                            no: "rdgrp2",
                            increment: "euclidean",
                            value: "euclidean",
                            state: "checked",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: "Squared-Euclidean",
                            no: "rdgrp2",
                            increment: "squared-euclidean",
                            value: "squared-euclidean",
                            state: "",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: "Manhattan (City Block)",
                            no: "rdgrp2",
                            increment: "city-block",
                            value: "city-block",
                            state: "",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: "No Transformation",
                            no: "rdgrp2",
                            increment: "untransformed",
                            value: "untransformed",
                            state: "",
                            extraction: "ValueAsIs"
                        })
                        ,
                    ]
                })
            }
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.clusters.el.content, objects.storeClusterInDataset.el.content, objects.variablename.el.content, objects.biplot.el.content, objects.dendogram.el.content],
            bottom: [objects.options.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-hierarchical-structure",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new hierarchicalCluster().render()