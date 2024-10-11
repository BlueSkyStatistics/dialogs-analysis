










class principalComponentAnalysis extends baseModal {
    static dialogId = 'principalComponentAnalysis'
    static t = baseModal.makeT(principalComponentAnalysis.dialogId)

    constructor() {
        var config = {
            id: principalComponentAnalysis.dialogId,
            label: principalComponentAnalysis.t('title'),
            modalType: "two",
            RCode: `
#Runs the principal component analysis
BSkyPCARes <-BSkyPrinCompAnalysis(vars=c({{selected.destination | safe}}), cor ={{selected.grp | safe}}, 
    componentsToRetain ={{selected.noOfComponents | safe}}, generateScreeplot={{selected.screeplot | safe}},
    prefixForComponents ="{{selected.variablePrefix | safe}}",dataset="{{dataset.name}}")
#Displays the results in the output window
BSkyFormat(BSkyPCARes)
#biplot
stats::biplot(BSkyPCA,ylab = "Second component", xlab = "First component",main = "Biplot")
#Mahalanobis distance
ggplot2::ggplot() + geom_point(aes( x = stats::mahalanobis({{dataset.name}}[,c({{selected.destination | safe}})], 
    base::colMeans({{dataset.name}}[,c({{selected.destination | safe}})], na.rm=TRUE),
    {{if (options.selected.grp =="TRUE")}}stats::cor{{#else}}cov{{/if}}({{dataset.name}}[,c({{selected.destination | safe}})],use ="pairwise.complete.obs"),
    inverted = FALSE), y = 1:nrow({{dataset.name}}))) + 
    xlab("Mahalanobis distances") + 
    ylab("Observations") +
    ggtitle("Plotting Mahalanobis distance vs. observations") + {{selected.BSkyThemes | safe}}\n
{{if(options.selected.addToDataset =="TRUE" && options.selected.variablePrefix != "" && options.selected.noOfComponents !="" )}}
##Score Plot
ggplot2::ggplot() + geom_point(aes( x = {{dataset.name}}\${{selected.variablePrefix | safe}}1, 
    y = {{dataset.name}}\${{selected.variablePrefix | safe}}2)) +
    ylab("Second component") + 
    xlab("First component") +
    ggtitle("Score plot") + {{selected.BSkyThemes | safe}}\n
{{/if}}
#Refreshes the dataset in the output window
BSkyLoadRefresh("{{dataset.name}}",{{selected.addToDataset | safe}})
            `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            destination: {
                el: new dstVariableList(config, {
                    label: principalComponentAnalysis.t('destination'),
                    required: true,
                    no: "destination",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: principalComponentAnalysis.t('label1'), h: 6 }) },
            rd1: { el: new radioButton(config, { label: principalComponentAnalysis.t('rd1'), no: "grp", increment: "rd1", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            rd2: { el: new radioButton(config, { label: principalComponentAnalysis.t('rd2'), no: "grp", increment: "rd2", value: "FALSE", state: "", extraction: "ValueAsIs" }) },
            screeplot: { el: new checkbox(config, { label: principalComponentAnalysis.t('screeplot'), no: "screeplot", extraction: "Boolean" }) },
            addToDataset: {
                el: new checkbox(config, {
                    label: principalComponentAnalysis.t('addToDataset'), no: "addToDataset", required:true,extraction: "boolean",
                    dependant_objects: ["variablePrefix", "noOfComponents"]
                })
            },
            variablePrefix: {
                el: new input(config, {
                    no: 'variablePrefix',
                    label: principalComponentAnalysis.t('variablePrefix'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    value: "",
                    ml: 5
                }),
            },
            noOfComponents: {
                el: new input(config, {
                    no: 'noOfComponents',
                    label: principalComponentAnalysis.t('noOfComponents'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    type: "numeric",
                    value: "",
                    ml: 5
                }),
            },
            screeplot: { el: new checkbox(config, { label: principalComponentAnalysis.t('screeplot'), no: "screeplot", extraction: "Boolean" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content],
            bottom: [objects.label1.el.content, objects.rd1.el.content, objects.rd2.el.content, objects.addToDataset.el.content, objects.variablePrefix.el.content, objects.noOfComponents.el.content, objects.screeplot.el.content],
            nav: {
                name: principalComponentAnalysis.t('navigation'),
                icon: "icon-pca",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: principalComponentAnalysis.t('help.title'),
            r_help: "help(data,package='utils')",
            body: principalComponentAnalysis.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new principalComponentAnalysis().render()
}
