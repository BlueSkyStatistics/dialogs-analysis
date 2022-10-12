
var localization = {
    en: {
        title: "K-Means Cluster",
        navigation: "K-Means",
        destination: "Destination",
        clusters: "No of clusters",
        seeds: "No of starting seeds",
        iterations: "Maximum iterations",
        storeClusterInDataset: "Assign clusters to the dataset",
        variablename: "Variable to store cluster numbers",
        biplot: "Show cluster biplot",
        help: {
            title: "K-Means Cluster",
            r_help: "help(kmeans, package ='stats')",
            body: `
<b>Description</b></br>
Performs K-means clustering
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyKMeans (vars, centers, iter.max = 10, num.seeds = 10,storeClusterInDataset =FALSE, varNameForCluster="", dataset="dataset name") 
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
vars: The variables to analyze in a vector of form c('var1','var2'...)
</li>
<li>
centers:either the number of clusters, say k, or a set of initial (distinct) cluster centers. If a number, a random set of (distinct) 
rows in x is chosen as the initial centers.
</li>
<li>
iter.max: the maximum number of iterations allowed.
</li>
<li>
num.seeds: The number of different starting random seeds to use. Each random seed results in a different k-means solution.
</li>
<li>
storeClusterInDataset : Save the cluster assignments to the dataset
</li>
<li>
varNameForCluster: The variable names for the assigned clusters
</li>
<li>
dataset: The dataset to analyze
</li>
</ul>
<b>Package</b></br>
BlueSky</br>
<b>Help</b></br>
help(kmeans, package="stats")
    `}
    }
}










class KMeansCluster extends baseModal {
    constructor() {
        var config = {
            id: "KMeansCluster",
            label: localization.en.title,
            modalType: "two",
            RCode: `
#Run the cluster analysis
BSkyKmeansRes<-BSkyKMeans  (vars=c({{selected.destination | safe}}), centers={{selected.clusters | safe}}, iter.max = {{selected.iterations | safe}}, num.seeds = {{selected.seeds | safe}}, storeClusterInDataset ={{selected.storeClusterInDataset | safe}}, varNameForCluster="{{selected.variablename | safe}}",dataset='{{dataset.name}}') 
#Display results in the output
BSkyFormat(BSkyKmeansRes)
#Bi plot
if ({{selected.biplot | safe}}) {BSkyBiPlot(vars=c({{selected.destination | safe}}), dataset='{{dataset.name}}') }
#Store cluster numbers in the dataset
BSkyLoadRefresh("{{dataset.name}}", {{selected.storeClusterInDataset | safe}})
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
            seeds: {
                el: new inputSpinner(config, {
                    no: 'seeds',
                    label: localization.en.seeds,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 10,
                    extraction: "NoPrefix|UseComma"
                })
            },
            iterations: {
                el: new inputSpinner(config, {
                    no: 'iterations',
                    label: localization.en.iterations,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 10,
                    extraction: "NoPrefix|UseComma"
                })
            },
            storeClusterInDataset: { el: new checkbox(config, { label: localization.en.storeClusterInDataset, no: "storeClusterInDataset", required: true, dependant_objects: ["variablename"], extraction: "Boolean" }) },
            variablename: {
                el: new input(config, {
                    no: 'variablename',
                    label: localization.en.variablename,
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    value: "",
                    type: "character",
                })
            },
            biplot: { el: new checkbox(config, { label: localization.en.biplot, no: "biplot", extraction: "Boolean" }) }
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.clusters.el.content, objects.seeds.el.content, objects.iterations.el.content, objects.storeClusterInDataset.el.content, objects.variablename.el.content, objects.biplot.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-cluster",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new KMeansCluster().render()