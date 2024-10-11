











class KMeansCluster extends baseModal {
    static dialogId = 'KMeansCluster'
    static t = baseModal.makeT(KMeansCluster.dialogId)

    constructor() {
        var config = {
            id: KMeansCluster.dialogId,
            label: KMeansCluster.t('title'),
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
                    label: KMeansCluster.t('destination'),
                    no: "destination",
                    filter: "Numeric|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            clusters: {
                el: new inputSpinner(config, {
                    no: 'clusters',
                    label: KMeansCluster.t('clusters'),
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
                    label: KMeansCluster.t('seeds'),
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
                    label: KMeansCluster.t('iterations'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 10,
                    extraction: "NoPrefix|UseComma"
                })
            },
            storeClusterInDataset: { el: new checkbox(config, { label: KMeansCluster.t('storeClusterInDataset'), no: "storeClusterInDataset", required: true, dependant_objects: ["variablename"], extraction: "Boolean" }) },
            variablename: {
                el: new input(config, {
                    no: 'variablename',
                    label: KMeansCluster.t('variablename'),
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    value: "",
                    type: "character",
                })
            },
            biplot: { el: new checkbox(config, { label: KMeansCluster.t('biplot'), no: "biplot", extraction: "Boolean" }) }
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.clusters.el.content, objects.seeds.el.content, objects.iterations.el.content, objects.storeClusterInDataset.el.content, objects.variablename.el.content, objects.biplot.el.content],
            nav: {
                name: KMeansCluster.t('navigation'),
                icon: "icon-cluster",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: KMeansCluster.t('help.title'),
            r_help: "help(data,package='utils')",
            body: KMeansCluster.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new KMeansCluster().render()
}
