var localization = {
  en: {
    title: "SEM",
    modelname: "Enter a name of the model",
    navigation: "SEM",
    modelTermsDst: "Relationship",
    modelTerms: "Predictor",
    modelTerms1: "Outcome",
    sem: "Latent variables",
    sem_model_terms: "Structural parameters",
    semSuppCtrl: "First order factors",
    sem2: "Second order factors",
    label1: "Select an item from the predictor and the outcome lists and click on the button with an arrow to move the selected items to the relationship list",
    label2: "Select an item from the predictor and the outcome lists and click on the button with an arrow to move the selected items to the relationship list",
    label3: "Information",
    label4: "Additional outputs",
    label5: "Covariances and correlations",
    label6: "R-squared",
    label7: "Save predicted",
    coVarTerms: "1st variable/factor",
    coVarTerms1: "2nd variable/factor",
    coVarDst: "Selected covariances",
    optionsCoVarTerms: "Covariances",
    parameterizeFormula: "Parameterize formula",
    modelOptions: "Model options",
    method: "Select a method and approach (if applicable)",
    approach: "ML likelihood approach",
    missing: "Missing values",
    addFitMeasures: "Additional fit measures",
    mardiaSkew: "Mardia's skew",
    mardiaKurt: "Mardia's kurtosis",
    observed: "Observed",
    modelImplied: "Model-implied (fitted)",
    residual: "Residual",
    r2squareNone: "None",
    r2squareEndo: "Endogenous",
    factorScores: "Factor scores (variables saved with prefix FS)",
    indicators: "Indicators (variables saved with prefix I)",
    dependentVars: "Dependent variables (variables saved with prefix DV)",
    label8: "Modification Indices",
    modIndices: "Modification Indices",
    highLowIndices: "Hide low indices",
    threshold: "Threshold",
    residuals: "Show residuals",
    intercepts: "Show intercepts",
    includeThresholds: "Show thresholds",
    edgeLabels: "Select options for edge labels",
    layout: "Options for how the nodes should be placed",
    rotate: "Position of the exogenous variables when tree or tree2 layout is used",
    abbNodeLabels: "No of characters to abbreviate node labels to",
    abbEdgeLabels: "No of characters to abbreviate edge labels to",
    label101: "Paths",
    label102: "Layout",
    label103: "Nodes",
    semPlotOptions: "Plot options",
    manifestShapes: "Manifest shapes",
    latentShapes: "Latent shapes",
    outputOptions: "Output options",
    label104: "Standardized solutions",
    stdall: "The standardized estimates are based on the variances of both (continuous) observed and latent variables",
    stdlv: "The standardized estimates are on the variances of the (continuous) latent variables only",
    stdnox: "The standardized estimates are based on both the variances of both (continuous) observed and latent variables, but not the variances of exogenous covariates",
    label105: "Standard errors",
    label106: "Bootstrap settings",
    automatic: "Automatic",
    standard: "Standard",
    robust: "Robust",
    pseudoML: "Pseudo ML",
    bootstrap: "Bootstrap",
    percentiles: "Percentiles",
    normal: "Normal",
    adjustedBiasCorrected: "Adjusted bias-corrected",
    basic: "basic",
    bootstratRep: "Bootstrap repetitions",
    autoComputeCovar: "Automatically compute covariances",
    equalityConstraints1: "Relationship",
    help: {
      title: "SEM",
      r_help: "help(sem, package=lavaan)",
      body: `
<b>Description</b></br>
Performs Bartlett's test of the null that the variances in each of the groups (samples) are the same.
<br/>
<b>Usage</b>
<br/>
<code>
bartlett.test(x, ...)</br>
## Default S3 method:</br>
bartlett.test(x, g, ...)</br>
## S3 method for class 'formula'</br>
bartlett.test(formula, data, subset, na.action, ...)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
Arguments
x: a numeric vector of data values, or a list of numeric data vectors representing the respective samples, or fitted linear model objects (inheriting from class "lm").
</li>
<li>
g: a vector or factor object giving the group for the corresponding elements of x. Ignored if x is a list.
</li>
<li>
formula: a formula of the form lhs ~ rhs where lhs gives the data values and rhs the corresponding groups.
</li>
<li>
data: an optional matrix or data frame (or similar: see model.frame) containing the variables in the formula formula. By default the variables are taken from environment(formula).
</li>
<li>
subset: an optional vector specifying a subset of observations to be used.
</li>
<li>
na.action: a function which indicates what should happen when the data contain NAs. Defaults to getOption("na.action").
</li>
<li>
...: further arguments to be passed to or from methods.
</li>
</ul>
<b>Details</b></br>
If x is a list, its elements are taken as the samples or fitted linear models to be compared for homogeneity of variances. In this case, the elements must either all be numeric data vectors or fitted linear model objects, g is ignored, and one can simply use bartlett.test(x) to perform the test. If the samples are not yet contained in a list, use bartlett.test(list(x, ...)).</br>
Otherwise, x must be a numeric data vector, and g must be a vector or factor object of the same length as x giving the group for the corresponding elements of x.</br>
<b>Value</b><br/>
A list of class "htest" containing the following components:<br/>allvarsparameterEstimates(Sem1, level = 0.95, boot.ci.type = "perc")
statistic: Bartlett's K-squared test statistic.<br/>
parameter: the degrees of freedom of the approximate chi-squared distribution of the test statistic.<br/>
p.value: the p-value of the test.<br/>
method: the character string "Bartlett test of homogeneity of variances".<br/>
data.name: a character string giving the names of the data.<br/>
<b>Examples</b><br/>
<code>
Dataset <- data.frame(Age=c(20,23,19,25,26), Weight=c(48,50,55,51,49), Gender=c('m','f','f','m','m' ))
Result_Bartlett_Test = bartlett.test(sales ~ interaction(Dataset$Gender),data=Dataset)
</code> <br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(bartlett.test, package=stats)
`}
  }
}
class sem extends baseModal {
  constructor() {
    var config = {
      id: "sem",
      label: localization.en.title,
      modalType: "two",
      parameterCount: 0,
      RCode: `
require(lavaan)
require(semPlot)  
require(semTools)      
{{selected.modelname | safe}}_def <- '{{selected.sem | safe}}{{selected.sem2 | safe}}{{selected.modelTermsDst | safe}} {{selected.coVarDst | safe}}'
\n{{selected.modelname | safe}} <- {{if (options.selected.useSemFunction)}}sem{{#else}}cfa{{/if}}({{selected.modelname | safe}}_def,    
    {{if (options.selected.family =="Maximum likelihood (ML)")}}estimator = "ML",
    {{/if}}{{if (options.selected.family =="Robust maximum likelihood (MLM)")}}estimator = "MLM",
    {{/if}}{{if (options.selected.family =="Robust maximum likelihood (MLMV)")}}estimator = "MLMV",
    {{/if}}{{if (options.selected.family =="Pairwise maximum likelihood (PML)")}}estimator = "PML",
    {{/if}}{{if (options.selected.family =="Generalized least squares (GLS)")}}estimator = "GLS",
    {{/if}}{{if (options.selected.family =="Weighted least squares (WLS)")}}estimator = "WLS",
    {{/if}}{{if (options.selected.family =="Diagonally weighted least squares (DWLS)")}}estimator = "DWLS",
    {{/if}}{{if (options.selected.family =="Robust weighted least squares (WLSM)")}}estimator = "WLSM",
    {{/if}}{{if (options.selected.family =="Robust weighted least squares (WLSM)")}}estimator = "WLSMV",
    {{/if}}{{if (options.selected.family =="Robust weighted least squares (WLSMVS)")}}estimator = "WLSMVS",
    {{/if}}{{if (options.selected.family =="Unweighted least squares")}}estimator = "ULS",
    {{/if}}{{if (options.selected.combokid !="")}}\nlikelihood = "{{selected.combokid | safe}}",
    {{/if}}{{if (options.selected.gpbox2 != "" )}}se ="{{selected.gpbox2 | safe}}", 
    {{/if}}{{if (options.selected.gpbox2 == "bootstrap" )}}bootstrap = {{selected.bootstratRep   | safe}},
    {{/if}}missing = "{{selected.missing | safe}}", data = {{dataset.name}})
BSkySummaryRes <- summary({{selected.modelname | safe}}, fit.measures = TRUE{{if(options.selected.gpbox1 =="endo")}}, rsq = TRUE{{/if}} {{if (options.selected.gpbox2 == "bootstrap" )}},ci = TRUE{{/if}})
print.lavaan.summary_bsky(BSkySummaryRes)
{{if (options.selected.gpbox2 == "bootstrap" )}}
BSkyParameterEst <- lavaan::parameterEstimates({{selected.modelname | safe}}, 
  level = 0.95, 
  boot.ci.type="{{selected.gpbox3 | safe}}")
BSkyFormat(as.data.frame(BSkyParameterEst), singleTableOutputHeader="Parameter estimates")
{{/if}}
{{if (options.selected.addFitMeasures == "TRUE")}}
#Additional fit measures
BSkyfitMeasures <- fitMeasures({{selected.modelname | safe}})
BSkyFormat(as.data.frame(BSkyfitMeasures), singleTableOutputHeader="Additional fit measures")
{{/if}}
{{if (options.selected.mardiaSkew =="TRUE")}}
#Mardia's skew
BSkyMardiasSkew <- semTools::mardiaSkew({{dataset.name}}[, c({{selected.allvars | safe}})])
BSkyFormat(BSkyMardiasSkew, singleTableOutputHeader="Mardia's skew")
{{/if}}
{{if (options.selected.mardiaKurt =="TRUE")}}
#Mardia's kurtosis
BSkyMardiasKurt <- semTools::mardiaKurtosis({{dataset.name}}[, c({{selected.allvars | safe}})])
BSkyFormat(BSkyMardiasKurt, singleTableOutputHeader="Mardia's kurtosis")
{{/if}}
{{if (options.selected.observed =="TRUE")}}
#Observed covariances  
BSKyObservedCov <- cov(x = {{dataset.name}}[, c({{selected.endoExoString | safe}})])
BSkyFormat(as.data.frame(BSKyObservedCov), singleTableOutputHeader="Observed covariances")
{{/if}}
{{if (options.selected.modelImplied =="TRUE")}}
#Model implied (fitted) covariances
BSkyCov <- fitted({{selected.modelname | safe}})
print.lavaan.matrix.symmetric_bsky(BSkyCov$cov, message ="Model-implied fitted covariances")
{{/if}}
{{if (options.selected.residual =="TRUE")}}
#Model implied (fitted) covariances
BSkyResiduals <- resid({{selected.modelname | safe}})
print.lavaan.matrix.symmetric_bsky(BSkyCov$cov, message ="Residuals")
{{/if}}
BSkyFormat("Estimated Model")
{{if (options.selected.modIndices =="TRUE")}}
#Modification indices
{{if (options.selected.highLowIndices =="TRUE")}}
BSkyModIndices <- modificationIndices({{selected.modelname | safe}}, high.power = {{selected.threshold | safe}})
BSkyFormat(as.data.frame(BSkyModIndices), singleTableOutputHeader = "Modification Indices: threshold = {{selected.threshold | safe}}")
{{#else}}
BSkyModIndices <- modificationIndices({{selected.modelname | safe}})
BSkyFormat(as.data.frame(BSkyModIndices), singleTableOutputHeader = "Modification Indices")
{{/if}}
{{/if}}
{{if (options.selected.stdall =="TRUE")}}
#Standardized solution (type ="std.all")
BSkyStdSol <- standardizedSolution({{selected.modelname | safe}}, type ="std.all")
BSkyFormat(as.data.frame(BSkyStdSol), singleTableOutputHeader = "Standardized estimates based on variances of both observed and latent variables")
{{/if}}
{{if (options.selected.stdlv =="TRUE")}}
#Standardized solution (type ="std.lv")
BSkyStdSol <-standardizedSolution({{selected.modelname | safe}}, type ="std.lv")
BSkyFormat(as.data.frame(BSkyStdSol), singleTableOutputHeader = "Standardized estimates based on variances of (continuous) latent variables only")
{{/if}}
{{if (options.selected.stdnox =="TRUE")}}
#Standardized solution (type ="std.nox")
BSkyStdSol <-standardizedSolution({{selected.modelname | safe}}, type ="std.nox")
BSkyFormat(as.data.frame(BSkyStdSol), singleTableOutputHeader = "Standardized estimates based on observed and latent but not exogenous covariates")
{{/if}}
semPaths({{selected.modelname | safe}}, {{if (options.selected.residuals =="TRUE")}} residuals = TRUE,{{/if}} {{if (options.selected.intercepts =="TRUE")}} intercepts = TRUE,{{/if}} {{if (options.selected.includeThresholds =="TRUE")}} thresholds = TRUE,{{/if}}
    whatLabels = "{{if (options.selected.edgeLabels =="names")}}name{{/if}}{{if (options.selected.edgeLabels =="parameter estimates")}}est{{/if}}{{if (options.selected.edgeLabels =="standardized parameter estimates")}}std{{/if}}{{if (options.selected.edgeLabels =="parameter number")}}eq{{/if}}{{if (options.selected.edgeLabels =="hide")}}hide{{/if}}",
    layout = "{{selected.layout | safe}}",
    rotation = {{if (options.selected.rotate =="Exog. top")}}1{{/if}}{{if (options.selected.rotate =="Exog. left")}}2{{/if}}{{if (options.selected.rotate =="Exog. bottom")}}3{{/if}}{{if (options.selected.rotate =="Exog. right")}}4{{/if}},
    {{if (options.selected.manifestShapes != "default")}}shapeMan = "{{selected.manifestShapes | safe}}",{{/if}}
    {{if (options.selected.latentShapes != "default")}}shapeLat = "{{selected.latentShapes | safe}}"{{/if}}
    )
{{if (options.selected.factorScores == "TRUE")}}
has_nas <- any(is.na({{dataset.name}}[, c({{selected.allvars | safe}})]))
# If 'has_nas' is TRUE, it means the dataset contains NAs
if (has_nas) {
  cat("The dataset contains missing values (NAs), we cannot save predicted values to the dataset, we will display predicted values in the output window.\n")
  cat("Displaying a large number of predicted values in the output window can cause performance problems.\n")
  BSkyFormat(as.data.frame(lavaan::lavPredict({{selected.modelname | safe}}, 
    type = "lv")), singleTableOutputHeader = "Predicted factor scores")
} else {
  BSkyFS <- lavaan::lavPredict({{selected.modelname | safe}}, 
    type = "lv")
    base::colnames(BSkyFS) <- base::paste("FS", base::colnames(BSkyFS), sep="_") 
  .GlobalEnv\${{dataset.name}} <- tibble::add_column ({{dataset.name}}, data.frame(BSkyFS))
  BSkyLoadRefresh("{{dataset.name}}")
}
{{/if}}
{{if (options.selected.indicators == "TRUE")}}
has_nas <- base::any(base::is.na({{dataset.name}}[, c({{selected.allvars | safe}})]))
# If 'has_nas' is TRUE, it means the dataset contains NAs
if (has_nas) {
  cat("The dataset contains missing values (NAs), we cannot save predicted values to the dataset, we will display predicted values in the output window.\n")
  cat("NOTE::Displaying a large number of predicted values in the output window can cause performance problems.\n")
  BSkyFormat(as.data.frame(lavaan::lavPredict({{selected.modelname | safe}}, 
    type = "ov")), singleTableOutputHeader = "Predicted indicators")
} else {
  BSkyI <- lavaan::lavPredict({{selected.modelname | safe}}, 
    type = "ov")
    base::colnames(BSkyI) <- base::paste("I", colnames(BSkyI),sep="_") 
  .GlobalEnv\${{dataset.name}} <- tibble::add_column({{dataset.name}}, data.frame(BSkyI))
  BSkyLoadRefresh("{{dataset.name}}")
}
{{/if}}
{{if (options.selected.dependentVars == "TRUE")}}
has_nas <- base::any(is.na({{dataset.name}}[, c({{selected.allvars | safe}})]))
# If 'has_nas' is TRUE, it means the dataset contains NAs
if (has_nas) {
  cat("The dataset contains missing values (NAs), we cannot save predicted values to the dataset, we will display predicted values in the output window.\n")
  cat("NOTE::Displaying a large number of predicted values in the output window can cause performance problems.\n")
  BSkyFormat(lavaan::lavPredict({{selected.modelname | safe}}, 
    type = "yhat"), singleTableOutputHeader = "Predicted dependent variables") 
} else {
  BSkyDV <- lavaan::lavPredict({{selected.modelname | safe}}, 
    type = "yhat")
    base::colnames(BSkyDV) <- base::paste("DV", colnames(BSkyDV),sep="_") 
  .GlobalEnv\${{dataset.name}} <- tibble::add_column({{dataset.name}}, data.frame(BSkyDV))
  BSkyLoadRefresh("{{dataset.name}}")
}
{{/if}}
`
    }
    var objects =
    {
      modelname: {
        el: new input(config, {
          no: 'modelname',
          label: localization.en.modelname,
          placeholder: "",
          required: true,
          type: "character",
          extraction: "TextAsIs",
          value: "Sem1",
          overwrite: "dataset"
        })
      },
      content_var: { el: new srcVariableList(config, { action: "move", semMain: true }) },

      autoComputeCovar: {
        el: new checkbox(config, {
          label: localization.en.autoComputeCovar,
          no: "autoComputeCovar",
          style: "mb-2",
          extraction: "Boolean",
          state: "checked",
          newline: "true",
          autoComputeCovar: true
        })
      },

      parameterizeFormula: {
        el: new checkbox(config, {
          label: localization.en.parameterizeFormula,
          no: "chk1",
          style: "mb-2",
          extraction: "Boolean",
          state: "checked",
          parameterizeFormula: true
        })
      },
      sem: {
        el: new semControl(config, {
          no: "sem",
          label: localization.en.sem,
          filter: "Numeric|Date|Logical|Scale|semFactor",
          extraction: "NoPrefix|UsePlus",
          required: false,
          suppCtrlIds: ["semSuppCtrl1", "modelTerms", "modelTerms1", "coVarTerms", "coVarTerms1"]
        }), r: ['{{ var | safe}}']
      },
      semSuppCtrl1: {
        el: new semSuppCtrl(config, {
          action: "move",
          no: "semSuppCtrl1", label: localization.en.semSuppCtrl
        })
      },
      sem2: {
        el: new semControl(config, {
          label: localization.en.sem2,
          no: "sem2",
          filter: "Numeric|Date|Logical|Scale|semFactor",
          extraction: "NoPrefix|UsePlus",
          required: false,
          suppCtrlIds: ["modelTerms", "modelTerms1", "coVarTerms", "coVarTerms1"]
        }), r: ['{{ var | safe}}']
      },
      label1: {
        el: new labelVar(config, {
          label: localization.en.label1,
        })
      },
      label2: {
        el: new labelVar(config, {
          label: localization.en.label1,
        })
      },
      modelTerms: {
        el: new semModelTerms(config, {
          action: "move",
          no: "modelTerms", label: localization.en.modelTerms
        })
      },
      modelTerms1: {
        el: new semModelTerms(config, {
          action: "move",
          no: "modelTerms1", label: localization.en.modelTerms1
        })
      },
      modelTermsDst: {
        el: new semModelTermsDest(config, {
          action: "move",
          no: "modelTermsDst", label: localization.en.modelTermsDst, filter: "String|Numeric|Logical|Ordinal|Nominal|Scale", extraction: "modelTerms", firstModelTermCtrl: "modelTerms", secondModelTermCtrl: "modelTerms1"
        })
      },
      coVarTerms: {
        el: new semModelTerms(config, {
          action: "move",
          no: "coVarTerms", label: localization.en.coVarTerms
        })
      },
      coVarTerms1: {
        el: new semModelTerms(config, {
          action: "move",
          no: "coVarTerms1", label: localization.en.coVarTerms1
        })
      },
      coVarDst: {
        el: new semModelTermsDest(config, {
          action: "move",
          no: "coVarDst", label: localization.en.coVarDst, filter: "String|Numeric|Logical|Ordinal|Nominal|Scale", extraction: "coVariances", firstModelTermCtrl: "coVarTerms", secondModelTermCtrl: "coVarTerms1"
        })
      },
      equalityConstraints1: {
        el: new equalityConstraints(config, {
          action: "move",
          no: "equalityConstraints1", label: localization.en.equalityConstraints
        })
      },
      sem3: {
        el: new semControl(config, {
          label: localization.en.sem3,
          no: "sem3",
          filter: "Numeric|Date|Logical|Scale|semFactor",
          extraction: "NoPrefix|UsePlus",
          required: false,
        }), r: ['{{ var | safe}}']
      },

      family: {
        el: new comboBoxWithChilderen(config, {
          no: 'family',
          nochild: 'combokid',
          label: localization.en.method,
          multiple: false,
          extraction: "NoPrefix|UseComma",
          options: [
            { "name": "Automatic", "value": [] },
            { "name": "Maximum likelihood (ML)", "value": ["normal", "Wishart"] },
            { "name": "Robust maximum likelihood (MLM)", "value": [] },
            { "name": "Robust maximum likelihood (MLMV)", "value": [] },
            { "name": "Robust maximum likelihood (MLMVS)", "value": [] },
            { "name": "Pairwise maximum likelihood (PML)", "value": ["normal", "Wishart"] },
            { "name": "Generalized least squares (GLS)", "value": [] },
            { "name": "Weighted least squares (WLS)", "value": [] },
            { "name": "Diagonally weighted least squares (DWLS)", "value": [] },
            { "name": "Robust weighted least squares (WLSM)", "value": [] },
            { "name": "Robust weighted least squares (WLSMV)", "value": [] },
            { "name": "Robust weighted least squares (WLSMVS)", "value": [] },
            { "name": "Unweighted least squares", "value": [] },
          ]
        })
      },
      missing: {
        el: new selectVar(config, {
          no: 'missing',
          label: localization.en.missing,
          multiple: false,
          width: "w-25",
          extraction: "NoPrefix|UseComma",
          options: ["listwise", "fiml", "fiml.x", "two.stage", "robust.two.stage", "pairwise", "availanle.cases", "doubly.robust"],
          default: "listwise"
        })
      },
      label3: {
        el: new labelVar(config, {
          label: localization.en.label3,
        })
      },
      label4: {
        el: new labelVar(config, {
          label: localization.en.label4,
          h: 4
        })
      },
      addFitMeasures: {
        el: new checkbox(config, {
          label: localization.en.addFitMeasures,
          no: "addFitMeasures",
          style: "mb-2",
          extraction: "Boolean"
        })
      },
      mardiaSkew: {
        el: new checkbox(config, {
          label: localization.en.mardiaSkew,
          no: "mardiaSkew",
          style: "mb-2",
          extraction: "Boolean",
        })
      },
      mardiaKurt: {
        el: new checkbox(config, {
          label: localization.en.mardiaKurt,
          no: "mardiaKurt",
          style: "mb-2",
          extraction: "Boolean",
        })
      },
      label5: {
        el: new labelVar(config, {
          label: localization.en.label5,
          h: 4
        })
      },
      observed: {
        el: new checkbox(config, {
          label: localization.en.observed,
          no: "observed",
          style: "mb-2",
          extraction: "Boolean",
        })
      },
      modelImplied: {
        el: new checkbox(config, {
          label: localization.en.modelImplied,
          no: "modelImplied",
          style: "mb-2",
          extraction: "Boolean",
        })
      },
      residual: {
        el: new checkbox(config, {
          label: localization.en.residual,
          no: "residual",
          style: "mb-2",
          extraction: "Boolean",
        })
      },
      label8: {
        el: new labelVar(config, {
          label: localization.en.label8,
          h: 4
        })
      },
      modIndices: {
        el: new checkbox(config, {
          label: localization.en.modIndices,
          no: "modIndices",
          style: "mb-2",
          extraction: "Boolean",
        })
      },
      highLowIndices: {
        el: new checkbox(config, {
          label: localization.en.highLowIndices,
          no: "highLowIndices",
          style: "ml-2",
          newline: true,
          extraction: "Boolean",
        })
      },
      threshold: {
        el: new inputSpinner(config, {
          no: 'threshold',
          label: localization.en.threshold,
          min: 0,
          max: 99999999,
          style: "ml-4",
          step: 0.01,
          value: 10,
          extraction: "NoPrefix|UseComma"
        })
      },
      label6: {
        el: new labelVar(config, {
          label: localization.en.label6,
          style: "mt-3",
          h: 4
        })
      },
      r2squareNone: {
        el: new radioButton(config, {
          label: localization.en.r2squareNone,
          no: "gpbox1",
          increment: "r2squareNone",
          style: "mb-2",
          value: "none",
          extraction: "ValueAsIs",
          state: "checked",
        })
      },
      r2squareEndo: {
        el: new radioButton(config, {
          label: localization.en.r2squareEndo,
          no: "gpbox1",
          increment: "r2squareEndo",
          value: "endo",
          state: "",
          extraction: "ValueAsIs"
        })
      },
      label7: {
        el: new labelVar(config, {
          label: localization.en.label7,
          style: "mt-3",
          h: 4
        })
      },
      factorScores: {
        el: new checkbox(config, {
          label: localization.en.factorScores,
          no: "factorScores",
          style: "mb-2",
          extraction: "Boolean",
        })
      },
      indicators: {
        el: new checkbox(config, {
          label: localization.en.indicators,
          no: "indicators",
          style: "mb-2",
          extraction: "Boolean",
        })
      },
      dependentVars: {
        el: new checkbox(config, {
          label: localization.en.dependentVars,
          no: "dependentVars",
          style: "mb-2",
          extraction: "Boolean",
        })
      },
      residuals: {
        el: new checkbox(config, {
          label: localization.en.residuals,
          no: "residuals",
          //style: "mb-2",
          newline: true,
          extraction: "Boolean"
        })
      },
      intercepts: {
        el: new checkbox(config, {
          label: localization.en.intercepts,
          no: "intercepts",
          newline: true,
          //style: "mb-2",
          extraction: "Boolean",
        })
      },
      includeThresholds: {
        el: new checkbox(config, {
          label: localization.en.includeThresholds,
          no: "includeThresholds",
          //style: "mb-2",
          newline: true,
          extraction: "Boolean",
        })
      },
      label101: {
        el: new labelVar(config, {
          label: localization.en.label101,
          style: "mt-3",
          h: 4
        })
      },
      edgeLabels: {
        el: new comboBox(config, {
          no: "edgeLabels",
          label: localization.en.edgeLabels,
          multiple: false,
          extraction: "NoPrefix|UseComma",
          options: ["label", "parameter estimates", "standardized parameter estimate", "parameter number", "hide"],
          default: "parameter estimates"
        })
      },
      label102: {
        el: new labelVar(config, {
          label: localization.en.label102,
          style: "mt-3",
          h: 4
        })
      },
      layout: {
        el: new comboBox(config, {
          no: "layout",
          label: localization.en.layout,
          multiple: false,
          extraction: "NoPrefix|UseComma",
          options: ["tree", "circle", "spring", "tree2"],
          default: "tree"
        })
      },
      rotate: {
        el: new comboBox(config, {
          no: "rotate",
          label: localization.en.rotate,
          multiple: false,
          extraction: "NoPrefix|UseComma",
          options: ["Exog. top", "Exog. left", "Exog. bottom", "Exog. right"],
          default: "Exog. top"
        })
      },
      label103: {
        el: new labelVar(config, {
          label: localization.en.label101,
          style: "mt-3",
          h: 4
        })
      },
      manifestShapes: {
        el: new comboBox(config, {
          no: "manifestShapes",
          label: localization.en.manifestShapes,
          multiple: false,
          extraction: "NoPrefix|UseComma",
          options: ["default","circle", "rectangle", "square", "ellipse", "diamond"],
          default: "default"
        })
      },
      latentShapes: {
        el: new comboBox(config, {
          no: "latentShapes",
          label: localization.en.latentShapes,
          multiple: false,
          extraction: "NoPrefix|UseComma",
          options: ["default","circle","rectangle", "square", "ellipse", "diamond"],
          default: "default"
        })
      },
      abbNodeLabels: {
        el: new inputSpinner(config, {
          no: 'abbNodeLabels',
          label: localization.en.abbNodeLabels,
          min: 0,
          max: 99999999,
          step: 1,
          value: 5,
          extraction: "NoPrefix|UseComma"
        })
      },
      abbEdgeLabels: {
        el: new inputSpinner(config, {
          no: 'abbEdgeLabels',
          label: localization.en.abbEdgeLabels,
          min: 0,
          max: 99999999,
          step: 0.01,
          value: 5,
          extraction: "NoPrefix|UseComma"
        })
      },
      label104: {
        el: new labelVar(config, {
          label: localization.en.label104,
        })
      },
      stdall: {
        el: new checkbox(config, {
          label: localization.en.stdall,
          no: "stdall",
          //style: "mb-2",
          newline: true,
          extraction: "Boolean",
        })
      },
      stdlv: {
        el: new checkbox(config, {
          label: localization.en.stdlv,
          no: "stdlv",
          //style: "mb-2",
          newline: true,
          extraction: "Boolean",
        })
      },
      stnox: {
        el: new checkbox(config, {
          label: localization.en.stdnox,
          no: "stdnox",
          //style: "mb-2",
          newline: true,
          extraction: "Boolean",
        })
      },
      label105: {
        el: new labelVar(config, {
          label: localization.en.label105,
        })
      },
      automatic: {
        el: new radioButton(config, {
          label: localization.en.automatic,
          no: "gpbox2",
          increment: "automatic",
          value: "",
          extraction: "ValueAsIs",
          state: "checked",
        })
      },
      standard: {
        el: new radioButton(config, {
          label: localization.en.standard,
          no: "gpbox2",
          increment: "standard",
          value: "standard",
          extraction: "ValueAsIs"
        })
      },
      robust: {
        el: new radioButton(config, {
          label: localization.en.robust,
          no: "gpbox2",
          increment: "robust",
          value: "robust",
          extraction: "ValueAsIs",
        })
      },
      pseudoML: {
        el: new radioButton(config, {
          label: localization.en.pseudoML,
          no: "gpbox2",
          increment: "pseudoML",
          value: "robust.huber.white",
          extraction: "ValueAsIs"
        })
      },
      bootstrap: {
        el: new radioButton(config, {
          label: localization.en.bootstrap,
          no: "gpbox2",
          increment: "bootstrap",
          value: "bootstrap",
          //  dependant_objects: [],
          extraction: "ValueAsIs",
        })
      },
      label106: {
        el: new labelVar(config, {
          label: localization.en.label106,
        })
      },
      percentiles: {
        el: new radioButton(config, {
          label: localization.en.percentiles,
          no: "gpbox3",
          increment: "percentiles",
          value: "perc",
          extraction: "ValueAsIs",
          state: "checked",
        })
      },
      normal: {
        el: new radioButton(config, {
          label: localization.en.normal,
          no: "gpbox3",
          increment: "normal",
          value: "norm",
          extraction: "ValueAsIs",
        })
      },
      adjustedBiasCorrected: {
        el: new radioButton(config, {
          label: localization.en.adjustedBiasCorrected,
          no: "gpbox3",
          increment: "adjustedBiasCorrected",
          value: "bca.simple",
          extraction: "ValueAsIs",
        })
      },
      basic: {
        el: new radioButton(config, {
          label: localization.en.basic,
          no: "gpbox3",
          increment: "basic",
          value: "basic",
          extraction: "ValueAsIs",
        })
      },
      bootstratRep: {
        el: new input(config, {
          no: 'bootstratRep',
          label: localization.en.bootstratRep,
          placeholder: "",
          extraction: "TextAsIs",
          type: "numeric",
          allow_spaces: true,
          value: "1000",
          ml: 4,
          width: "w-25",
        })
      },
    }
    var secOrderFactors = {
      el: new optionsVar(config, {
        no: "sem_options",
        name: "Second order factors",
        layout: "two",
        left: [
          objects.semSuppCtrl1.el,
        ],
        right: [
          objects.sem2.el
        ],
      })
    };
    var equalConst = {
      el: new optionsVar(config, {
        no: "equalConst",
        name: "Equality constraints",
        layout: "two",
        left: [
          objects.equalityConstraints1.el,
        ],
        right: [
          objects.sem3.el
        ],
      })
    };
    var optionsModelTerms = {
      el: new optionsVar(config, {
        no: "sem_model_terms",
        name: localization.en.sem_model_terms,
        layout: "three",
        top: [objects.label1.el,],
        left: [
          objects.modelTerms.el,
        ],
        center: [
          objects.modelTerms1.el,
        ],
        right: [
          objects.modelTermsDst.el,
        ],
      })
    };
    var optionsCoVarTerms = {
      el: new optionsVar(config, {
        no: "optionsCoVarTerms",
        name: localization.en.optionsCoVarTerms,
        layout: "three",
        top: [objects.label2.el,],
        left: [
          objects.coVarTerms.el,
        ],
        center: [
          objects.coVarTerms1.el,
        ],
        right: [
          objects.coVarDst.el,
        ],
      })
    };
    var modelOptions = {
      el: new optionsVar(config, {
        no: "modelOptions",
        name: localization.en.modelOptions,
        content: [
          objects.family.el,
          objects.missing.el,
          objects.label104.el,
          objects.stdall.el,
          objects.stdlv.el,
          objects.stnox.el,
        ]
      })
    };
    var parameterOptions = {
      el: new optionsVar(config, {
        no: "parameterOptions",
        name: localization.en.parameterOptions,
        layout: "four",
        top: [],
        left: [
          objects.label105.el,
          objects.automatic.el,
          objects.standard.el,
          objects.robust.el,
          objects.pseudoML.el,
          objects.bootstrap.el,
        ],
        center: [
          objects.label106.el,
          objects.percentiles.el,
          objects.normal.el,
          objects.adjustedBiasCorrected.el,
          objects.basic.el,
          objects.bootstratRep.el,
        ],
        right: [
        ],
      })
    };
    var outputOptions = {
      el: new optionsVar(config, {
        no: "outputOptions",
        name: localization.en.outputOptions,
        layout: "four",
        top: [objects.label5.el],
        left: [
          objects.label4.el,
          objects.addFitMeasures.el,
          objects.mardiaSkew.el,
          objects.mardiaKurt.el,
          objects.label6.el,
          objects.r2squareNone.el,
          objects.r2squareEndo.el
        ],
        center: [
          objects.label5.el,
          objects.observed.el,
          objects.modelImplied.el,
          objects.residual.el,
          objects.label7.el,
          objects.factorScores.el,
          objects.indicators.el,
          objects.dependentVars.el
        ],
        right: [
          objects.label8.el,
          objects.modIndices.el,
          objects.highLowIndices.el,
          objects.threshold.el
        ],
      })
    };
    var semPlotOptions = {
      el: new optionsVar(config, {
        no: "semPlotOptions",
        name: localization.en.semPlotOptions,
        layout: "four",
        top: [objects.residuals.el,
        objects.intercepts.el,
        objects.includeThresholds.el,],
        left: [
          objects.label101.el,
          objects.edgeLabels.el,
        ],
        center: [
          objects.label102.el,
          objects.layout.el,
          objects.rotate.el,
        ],
        right: [
          objects.label103.el,
          objects.manifestShapes.el,
          objects.latentShapes.el,
          objects.abbNodeLabels.el,
          objects.abbEdgeLabels.el
        ],
      })
    };
    const content = {
      head: [objects.modelname.el.content],
      left: [objects.content_var.el.content],
      right: [objects.parameterizeFormula.el.content, objects.autoComputeCovar.el.content, objects.sem.el.content],
      bottom: [secOrderFactors.el.content, optionsModelTerms.el.content, optionsCoVarTerms.el.content, equalConst.el.content,modelOptions.el.content, outputOptions.el.content, semPlotOptions.el.content, parameterOptions.el.content],
      nav: {
        name: localization.en.navigation,
        icon: "icon-b",
        modal: config.id
      }
    }
    super(config, objects, content);
    this.help = localization.en.help;
  }
  prepareExecution(instance) {
    let res = [];
    let tempRes = [];
    let endoExo = {};
    let allVarsArray = []
    let separator = ',';
    let value = `"{{item | safe}}"`;
    let tempretval = "";
    let finalRetString = "";
    let allColumnProps = fetchAllColumnAttributes()
    var code_vars = {
      dataset: {
        name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
      },
      selected: instance.dialog.extractData()
    }
    let item = '{{item | safe}}';
    endoExo = instance.objects.sem.el.getVal()
    Object.keys(endoExo).forEach(function (key, index) {
      endoExo[key].forEach(function (element, index) {
        if (!allVarsArray.includes(element)) {
          allVarsArray.push(element)
        }
        tempRes[index] = "'" + element + "'";
      })
      tempretval = tempRes.join(separator);
      if (finalRetString == "") {
        finalRetString = tempretval
      }
      else {
        finalRetString = finalRetString + "," + tempretval
      }
    })
    if (code_vars.selected.combokid == null || code_vars.selected.combokid == 'null') code_vars.selected.combokid = ""
    code_vars.selected.endoExoString = finalRetString
    code_vars.selected.useSemFunction = true
    if (code_vars.selected.modelTermsDst.length == 0 && code_vars.selected.sem.length == 0) {
      dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Required controls not populated", message: `You need to specify latent traits or a relationship.` })
      return res
    } else if (code_vars.selected.modelTermsDst.length == 0) {
      code_vars.selected.useSemFunction = false
    } else if (code_vars.selected.sem.length == 0) {
      code_vars.selected.useSemFunction = true
    } else {
      code_vars.selected.useSemFunction = true
    }
    let myArray = []
    let modTerms = []
    if (code_vars.selected.modelTermsDst != "") {
      myArray = []
      modTerms = instance.objects.modelTermsDst.el.getVal()
      modTerms.forEach(function (value) {
        myArray = value.split("->");
        myArray.forEach(function (val, index) {
          if (!allVarsArray.includes(val) && allColumnProps[val] != undefined ) {
            allVarsArray.push(val)
          }
        })
      })
    }
    if (code_vars.selected.coVarDst != "") {
      myArray = []
      modTerms = instance.objects.coVarDst.el.getVal()
      modTerms.forEach(function (value) {
        myArray = value.split("<->");
        myArray.forEach(function (val, index) {
          if (!allVarsArray.includes(val) && allColumnProps[val] != undefined) {
            allVarsArray.push(val)
          }
        })
      })
    }
    allVarsArray.forEach(function (val, index) {
      allVarsArray[index] = "'" + val + "'";
    })
    code_vars.selected.allvars = allVarsArray.join(separator)
    const cmd = instance.dialog.renderR(code_vars);
    res.push({ cmd: cmd, cgid: newCommandGroup() })
    return res;
  }
}
module.exports.item = new sem().render()
