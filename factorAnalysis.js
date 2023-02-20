
var localization = {
    en: {
        title: "Factor Analysis",
        navigation: "Factor",
        destination: "Select variables",
        label1: "Factor extraction",
        factorextraction1: "Automatically extract factors",
        factorextraction2: "Specify number of factors to extract",
        noOfFactors: "Enter the number of factors to extract",
        screeplot: "Screeplot",
        label2: "Factor Scores",
        saveScores: "Save factor scores to the dataset",
        scores1: "Bartlett's method, enter a variable name prefix",
        scores2: "Regression method, enter a variable name prefix",
        varForScores: "Enter variable name prefix for scores:",
        label3: "Rotation Options",
        grpBox21: "None",
        grpBox22: "Varimax",
        grpBox23: "Promax",
        grpBox24: "BentlerQ",
        grpBox25: "Quartimax",
        grpBox26: "Oblimin",
        grpBox27: "GeominQ",
        grpBox28: "GeominT",
        grpBox29: "Simplimax",
        help: {
            title: "Factor Analysis",
            r_help: "help(factanal, package ='stats')",
            body: `
<b>Description</b></br>
​Perform maximum-likelihood factor analysis on a covariance matrix or data matrix and generates a screeplot. Calls the function factanal in the stats package.
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyFARes <-BSkyFactorAnalysis(vars=c('var1','var2','var3','var4','var5','var6'), autoextraction =TRUE, screeplot =FALSE,rotation="none",saveScores =FALSE,dataset="Dataset")
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
vars: One or more numeric variables to extract factors from.
</li>
<li>
autoextraction: Automatically determine the number factors or extract specific numbers of factors.
</li>
<li>
screeplot: If TRUE generates a screeplot.
</li>
<li>
rotation: determine the type of rotation and takes one of the values (none, quartimax, geominT, varimax, oblimin, simplimax, promax, geominQ and bentlerQ)
</li>
<li>
saveScores: saves the factor scores in the dataset
</li>
<li>
dataset: The dataset from which the 'vars' have been picked.
</li>
</ul>
<b>Details</b></br>
An object of class "factanal" with components</br>
loadings: A matrix of loadings, one column for each factor. The factors are ordered in decreasing order of sums of squares of loadings, and given the sign that will make the sum of the loadings positive. This is of class "loadings": see loadings for its print method.</br>
uniquenesses: The uniquenesses computed.</br>
correlation: The correlation matrix used.</br>
criteria: The results of the optimization: the value of the criterion (a linear function of the negative log-likelihood) and information on the iterations used.</br>
factors: The argument factors.</br>
dof: The number of degrees of freedom of the factor analysis model.</br>
method: The method: always "mle".</br>
rotmat:	The rotation matrix if relevant.</br>
scores: If requested, a matrix of scores. napredict is applied to handle the treatment of values omitted by the na.action.</br>
n.obs: The number of observations if available, or NA.</br>
call: The matched call.</br>
na.action: If relevant.</br>
STATISTIC, PVAL:The significance-test statistic and P value, if it can be computed.</br>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(factanal, package ='stats')
`}
    }
}









class factorAnalysis extends baseModal {
    constructor() {
        var config = {
            id: "factorAnalysis",
            label: localization.en.title,
            modalType: "two",
            RCode: `
## [Factor Analysis]
require(GPArotation)
{{if (options.selected.noOfFactors ==0 && options.selected.factorextraction =="FALSE" )}}cat("ERROR: The number of factors you need to extract needs to be greater than 0"){{#else}}
BSkyFARes <-BSkyFactorAnalysis(vars=c({{selected.destination | safe}}), autoextraction ={{selected.factorextraction | safe}},factors={{selected.noOfFactors | safe}}, screeplot ={{selected.screeplot | safe}},rotation="{{selected.grpBox2 | safe}}", saveScores ={{selected.saveScores | safe}},scores="{{selected.scores | safe}}", prefixForScores="{{selected.varForScores | safe}}",dataset="{{dataset.name}}")
#Display the results in the output grid
BSkyFormat(BSkyFARes)
#Refresh the dataset in the data grid to show the factor scores 
BSkyLoadRefresh("{{dataset.name}}",{{selected.saveScores | safe}})
{{/if}}
            `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            destination: {
                el: new dstVariableList(config, {
                    label: localization.en.destination,
                    no: "destination",
                    copy: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5 }) },
            autoFactExt: { el: new radioButton(config, { label: localization.en.factorextraction1, no: "factorextraction", increment: "autoFactExt", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            specifyFactors: { el: new radioButton(config, { label: localization.en.factorextraction2, no: "factorextraction", increment: "specifyFactors", value: "FALSE", state: "",  extraction: "ValueAsIs" }) },
            noOfFactors: {
                el: new inputSpinner(config, {
                    no: 'noOfFactors',
                    label: localization.en.noOfFactors,
                    min: 0,
                    max: 9999999,   
                    ml:4,
                    step: 1,
                    value:2,
                    extraction: "NoPrefix|UseComma"
                })
            },
            screeplot: { el: new checkbox(config, { label: localization.en.screeplot, no: "screeplot", extraction: "Boolean" }) },
            label2: { el: new labelVar(config, { label: localization.en.label2, style: "mt-2", h: 5 }) },
            saveScores: { el: new checkbox(config, { label: localization.en.saveScores, no: "saveScores", newline: true, extraction: "Boolean", required:true,dependant_objects: ["varForScores"], }) },
            bartlett: { el: new radioButton(config, { label: localization.en.scores1, style: "ml-3", no: "scores", increment: "bartlett", value: "Bartlett", state: "checked", extraction: "ValueAsIs",  }) },
            regression: { el: new radioButton(config, { label: localization.en.scores2, style: "ml-3",no: "scores", increment: "regression", value: "regression", state: "", extraction: "ValueAsIs"}) },
            varForScores: {
                el: new input(config, {
                    no: 'varForScores',
                    label: localization.en.varForScores,
                    ml: 4,
                    type: "character",
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                }),
            },
            label3: { el: new labelVar(config, { label: localization.en.label3, h: 5, style: "mt-2" }) },
            None: { el: new radioButton(config, { label: localization.en.grpBox21, no: "grpBox2", increment: "none", value: "none", state: "checked", extraction: "ValueAsIs" }) },
            Varimax: { el: new radioButton(config, { label: localization.en.grpBox22, no: "grpBox2", increment: "varimax", value: "varimax", state: "", extraction: "ValueAsIs" }) },
            Promax: { el: new radioButton(config, { label: localization.en.grpBox23, no: "grpBox2", increment: "promax", value: "promax", state: "", extraction: "ValueAsIs" }) },
            BentlerQ: { el: new radioButton(config, { label: localization.en.grpBox24, no: "grpBox2", increment: "BentlerQ", value: "bentlerQ", state: "", extraction: "ValueAsIs" }) },
            Quartimax: { el: new radioButton(config, { label: localization.en.grpBox25, no: "grpBox2", increment: "Quartimax", value: "quartimax", state: "", extraction: "ValueAsIs" }) },
            Oblimin: { el: new radioButton(config, { label: localization.en.grpBox26, no: "grpBox2", increment: "oblimin", value: "oblimin", state: "", extraction: "ValueAsIs" }) },
            GeominQ: { el: new radioButton(config, { label: localization.en.grpBox27, no: "grpBox2", increment: "geominQ", value: "geominQ", state: "", extraction: "ValueAsIs" }) },
            GeominT: { el: new radioButton(config, { label: localization.en.grpBox28, no: "grpBox2", increment: "geominT", value: "geominT", state: "", extraction: "ValueAsIs" }) },
            Simplimax: { el: new radioButton(config, { label: localization.en.grpBox29, no: "grpBox2", increment: "simplimax", value: "simplimax", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content],
            bottom: [objects.label1.el.content, objects.autoFactExt.el.content, objects.specifyFactors.el.content, objects.noOfFactors.el.content, objects.screeplot.el.content, objects.label2.el.content, objects.saveScores.el.content, objects.bartlett.el.content, objects.regression.el.content, objects.varForScores.el.content, objects.label3.el.content, objects.None.el.content, objects.Varimax.el.content, objects.Promax.el.content, objects.BentlerQ.el.content, objects.Quartimax.el.content, objects.Oblimin.el.content, objects.GeominQ.el.content, objects.GeominT.el.content, objects.Simplimax.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-fa",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new factorAnalysis().render()