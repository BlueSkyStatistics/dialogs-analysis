
var localization = {
    en: {
        title: "Principal Component Analysis",
        navigation: "Principal Components",
        lab40: "NOTE: The correlation or covariance matrix is automatically created from the variables selected",
        destination: "Select variables",
        label1: "Select a correlation or covariance matrix",
        rd1: "Correlation matrix",
        rd2: "Covariance matrix",
        addToDataset: "Add principal components to dataset. You must specify a prefix for the variable names and the number of components to add",
        variablePrefix: "Enter a prefix for the components added to the dataset",
        noOfComponents: "Enter the no of components to add to the dataset",
        screeplot: "Screeplot",
        help: {
            title: "Principal Component Analysis",
            r_help: "help(princomp, package ='stats')",
            body: `
<b>Description</b></br>
Performs a principal components analysis on the given numeric data matrix and returns the results as an object of class princomp. Internally calls princomp in the stats package.
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyPCARes <-BSkyPrinCompAnalysis(vars=c(),cor =TRUE, componentsToRetain =0, generateScreeplot=FALSE,prefixForComponents ="",dataset="")
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
vars: The variables in a character vector to extract components from
</li>
<li>
cor: A boolean that specifies whether the calculation should use a correlation or covariance matrix
</li>
<li>
componentsToRetain: A numeric that Specifies the number of components to retain in the dataset. A new variable is created in the dataset for each component invoked
</li>
<li>
​generateScreeplot: Generates a screeplot
</li>
<li>
prefixForComponents: Prefix to use when saving the components to a dataset
</li>
<li>
dataset: The name of the dataset as a string
</li>
</ul>
<b>Value</b></br>
princomp returns a list with class "princomp" containing the following components</br>
sdev: the standard deviations of the principal components.</br>
loadings: the matrix of variable loadings (i.e., a matrix whose columns contain the eigenvectors). This is of class "loadings": see loadings for its print method.</br>
center: the means that were subtracted.</br>
scale: the scalings applied to each variable.</br>
n.obs: the number of observations.</br>
scores: if scores = TRUE, the scores of the supplied data on the principal components. These are non-null only if x was supplied, and if covmat was also supplied if it was a covariance list. For the formula method, napredict() is applied to handle the treatment of values omitted by the na.action.</br>
call: the matched call.</br>
na.action: If relevant.</br>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(princomp, package ='stats')
`}
    }
}









class principalComponentAnalysis extends baseModal {
    constructor() {
        var config = {
            id: "principalComponentAnalysis",
            label: localization.en.title,
            modalType: "two",
            RCode: `
#Runs the principal component analysis
BSkyPCARes <-BSkyPrinCompAnalysis(vars=c({{selected.destination | safe}}), cor ={{selected.grp | safe}}, 
    componentsToRetain ={{selected.noOfComponents | safe}}, generateScreeplot={{selected.screeplot | safe}},
    prefixForComponents ="{{selected.variablePrefix | safe}}",dataset="{{dataset.name}}")
#Displays the results in the output window
BSkyFormat(BSkyPCARes)
#biplot
stats::biplot(BSkyPCA,ylab = "Second component", xlab = "First component",main = "Loading plot")
#Mahalanobis distance
ggplot2::ggplot() + geom_point(aes( x = mahalanobis({{dataset.name}}[,c({{selected.destination | safe}})], 
    colMeans({{dataset.name}}[,c({{selected.destination | safe}})]),
    cov({{dataset.name}}[,c({{selected.destination | safe}})]),
    inverted = FALSE), y = 1:nrow({{dataset.name}}))) + 
    ylab("Mahalanobis distances") + 
    xlab("Observations") +
    ggtitle("Outcome plot") + {{selected.BSkyThemes | safe}}\n
{{if(options.selected.addToDataset)}}
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
                    label: localization.en.destination,
                    required: true,
                    no: "destination",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
            rd1: { el: new radioButton(config, { label: localization.en.rd1, no: "grp", increment: "rd1", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            rd2: { el: new radioButton(config, { label: localization.en.rd2, no: "grp", increment: "rd2", value: "FALSE", state: "", extraction: "ValueAsIs" }) },
            screeplot: { el: new checkbox(config, { label: localization.en.screeplot, no: "screeplot", extraction: "Boolean" }) },
            addToDataset: {
                el: new checkbox(config, {
                    label: localization.en.addToDataset, no: "addToDataset", extraction: "Boolean",
                    dependant_objects: ["variablePrefix", "noOfComponents"]
                })
            },
            variablePrefix: {
                el: new input(config, {
                    no: 'variablePrefix',
                    label: localization.en.variablePrefix,
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
                    label: localization.en.noOfComponents,
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    type: "numeric",
                    value: "",
                    ml: 5
                }),
            },
            screeplot: { el: new checkbox(config, { label: localization.en.screeplot, no: "screeplot", extraction: "Boolean" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content],
            bottom: [objects.label1.el.content, objects.rd1.el.content, objects.rd2.el.content, objects.addToDataset.el.content, objects.variablePrefix.el.content, objects.noOfComponents.el.content, objects.screeplot.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-pca",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new principalComponentAnalysis().render()