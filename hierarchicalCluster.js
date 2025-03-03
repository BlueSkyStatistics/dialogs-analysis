/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */













class hierarchicalCluster extends baseModal {
    static dialogId = 'hierarchicalCluster'
    static t = baseModal.makeT(hierarchicalCluster.dialogId)

    constructor() {
        var config = {
            id: hierarchicalCluster.dialogId,
            label: hierarchicalCluster.t('title'),
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
                    label: hierarchicalCluster.t('destination'),
                    no: "destination",
                    filter: "Numeric|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            clusters: {
                el: new inputSpinner(config, {
                    no: 'clusters',
                    label: hierarchicalCluster.t('clusters'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 2,
                    required: true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            storeClusterInDataset: { el: new checkbox(config, { label: hierarchicalCluster.t('storeClusterInDataset'), required: true, dependant_objects: ['variablename'], no: "storeClusterInDataset", extraction: "Boolean" }) },
            variablename: {
                el: new input(config, {
                    no: 'variablename',
                    label: hierarchicalCluster.t('variablename'),
                    ml: 4,
                    placeholder: "",
                    type: "character",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            biplot: { el: new checkbox(config, { label: hierarchicalCluster.t('biplot'), no: "biplot", extraction: "Boolean" }) },
            dendogram: { el: new checkbox(config, { label: hierarchicalCluster.t('dendogram'), no: "dendogram", newline: true, extraction: "Boolean" }) },
            options: {
                el: new optionsVar(config, {
                    no: "barchart_options",
                    content: [
                        new labelVar(config, { label: hierarchicalCluster.t('Methodlabel'), h: 6 }),
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MethodRadlabel1'),
                            no: "rdgrp1",
                            increment: "wards",
                            value: "ward.D",
                            state: "checked",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MethodRadlabel2'),
                            no: "rdgrp1",
                            increment: "single",
                            value: "single",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MethodRadlabel3'),
                            no: "rdgrp1",
                            increment: "complete",
                            value: "complete",
                            state: "",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MethodRadlabel4'),
                            no: "rdgrp1",
                            increment: "linkage",
                            value: "average",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MethodRadlabel5'),
                            no: "rdgrp1",
                            increment: "mcquitty",
                            value: "mcquitty",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MethodRadlabel6'),
                            no: "rdgrp1",
                            increment: "median",
                            value: "median",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MethodRadlabel7'),
                            no: "rdgrp1",
                            increment: "centroid",
                            value: "centroid",
                            state: "",
                            extraction: "ValueAsIs"
                        }),
                        new labelVar(config, { label: hierarchicalCluster.t('Metriclabel'), h: 6, style: "mt-3" }),
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MetricRadlabel1'),
                            no: "rdgrp2",
                            increment: "euclidean",
                            value: "euclidean",
                            state: "checked",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MetricRadlabel2'),
                            no: "rdgrp2",
                            increment: "squared-euclidean",
                            value: "squared-euclidean",
                            state: "",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MetricRadlabel3'),
                            no: "rdgrp2",
                            increment: "city-block",
                            value: "city-block",
                            state: "",
                            extraction: "ValueAsIs"
                        })
                        ,
                        new radioButton(config, {
                            label: hierarchicalCluster.t('MetricRadlabel4'),
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
                name: hierarchicalCluster.t('navigation'),
                icon: "icon-hierarchical-structure",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: hierarchicalCluster.t('help.title'),
            r_help: hierarchicalCluster.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: hierarchicalCluster.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new hierarchicalCluster().render()
}
