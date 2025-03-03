/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Summaries, numeric only",
        //navigation: "Numerical Summaries",
        navigation: "Numeric Variables Only (Legacy)",
        tvarbox1: "Selected variables",
        tvarbox2: "Group by",
        min: "Min",
        max: "Max",
        mean: "Mean",
        median: "Median",
        sum: "Sum",
        sd: "Standard deviation",
        stderror: "Std error of mean",
        iqr: "Inter quartile range",
        quantiles: "Quartiles",
        probs: "Specify quartiles (if quartile is selected)",
        addIsstatnames: "Additonal statistical function names comma separated, for e.g. var)",
        label1: "Options",
        help: {
            title: "Summaries, numeric only",
            r_help: "",
            body: `
<b>Description</b></br>
Outputs the  following numerical statistics:</br>
min, max, mean, median, sum, sd, stderror, iqr,  quartiles. If quartiles is selected, you can specify the comma separated quartiles needed.</br>
In addition to these, the user can pass, a list of comma separated statistical function names for example var.
<br/>
<b>Usage</b>
<br/>
<code> 
BSkySummaryStats(datasetColumnObjects=list(var1=Dataset$var1, var2=Dataset$var2), groupByColumnObjects=list(var2=Dataset$var2, var3=Dataset$var3), stats = c(min=FALSE,max=FALSE,mean=TRUE,median=TRUE,sum=FALSE,sd=FALSE,stderror=FALSE,iqr=FALSE,quantiles=FALSE) quantilesProbs = c(0,0.25,0.5,0.75,1), additionalStats = c(c('var',' IQR')), datasetName="name of dataset")
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
datasetColumnObjects: selected scale variables (say Dataset$var1, Dataset$var2)
</li>
<li>
groupByColumnObjects: one or more factor variables to group by (say  Dataset$var3, Dataset$var4)
</li>
<li>
statFunctionList: List of functions. The ones set to TRUE will be executed. (say min=TRUE, sd=TRUE)
</li>
<li>
quantilesProbs: Probabilities of the quantiles
</li>
<li>
additionalStats: Addition statistical function that user can pass (say var)
</li>
<li>
datasetName: Name of the dataset from which datasetColumnObjects and groupByColumnObjects are chosen
</li>
</ul>
<b>Value</b></br>
An object of class "data.frame", giving the results for each function on each variable.</br>
<b>Examples</b><br/>
<code> 
Dataset <- data.frame(Expenses=c(20,23,19,25,26), Sales=c(48,50,55,51,49), Gender=c('m','f','f','m','m'), Deptt=c('IT', 'Sales', 'IT','Sales','IT'), stringsAsFactors = TRUE)</br>
Result_Numerical_Statistics_Analysis = BSkySummaryStats(datasetColumnObjects = list(Sales = Dataset$Sales, Expenses = Dataset$Expenses), groupByColumnObjects = list(Deptt= Dataset$Deptt), stats = c(min=FALSE,max=FALSE,mean=TRUE,median=TRUE,sum=FALSE,sd=FALSE,stderror=FALSE,iqr=FALSE,quantiles=FALSE),datasetName="Dataset" )
</code> <br/>
<b>Package</b></br>
BlueSky</br>
<b>Help</b></br>
R Help is not available because in we have written custom code using  multiple  R functions. If you need to inspect the code click the "<>" button.</br>
    `}
    }
}








class NumericalStatisticalAnalysis extends baseModal {
    constructor() {
        var config = {
            id: "NumericalStatisticalAnalysis",
            label: localization.en.title,
            modalType: "two",
            RCode: `
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"),Variables = length(names({{dataset.name}})),Observations = nrow({{dataset.name}}), stringsAsFactors = TRUE)
BSky_Numerical_Statistics_Analysis = BSkySummaryStats(datasetColumnObjects = list({{selected.tvarbox1 | safe}}), groupByColumnObjects = list({{selected.tvarbox2 | safe}}), stats = c(min={{selected.min | safe}}, max={{selected.max | safe}}, mean={{selected.mean | safe}}, median={{selected.median | safe}}, sum={{selected.sum | safe}}, sd={{selected.sd | safe}}, stderror={{selected.stderror | safe}}, iqr={{selected.iqr | safe}}, quantiles={{selected.quantile | safe}}), quantilesProbs = c({{selected.probs | safe}}), additionalStats = c({{selected.addIsstatnames | safe}}), datasetName="{{dataset.name}}" )
BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Numerical_Statistics_Analysis, singleTableOutputHeader=c("Numerical Statistical Analysis by Variable"))
#remove(BSky_Dataset_Overview)
#remove(BSky_Numerical_Statistics_Analysis )
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "CustomFormat",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "CustomFormat",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mt-3",h: 5 }) },
            min: { el: new checkbox(config, { label: localization.en.min, newline:true,no: "min", extraction: "Boolean" }) },
            max: { el: new checkbox(config, { label: localization.en.max, newline:true,no: "max", extraction: "Boolean" }) },
            mean: { el: new checkbox(config, { label: localization.en.mean, newline:true,no: "mean", extraction: "Boolean" }) },
            median: { el: new checkbox(config, { label: localization.en.median, newline:true,no: "median", extraction: "Boolean" }) },
            sum: { el: new checkbox(config, { label: localization.en.sum, newline:true,no: "sum", extraction: "Boolean" }) },
            sd: { el: new checkbox(config, { label: localization.en.sd, newline:true,no: "sd", extraction: "Boolean" }) },
            stderror: { el: new checkbox(config, { label: localization.en.stderror, newline:true,no: "stderror", extraction: "Boolean" }) },
            iqr: { el: new checkbox(config, { label: localization.en.iqr, newline:true,no: "iqr", extraction: "Boolean" }) },
            quantiles: { el: new checkbox(config, { label: localization.en.quantiles, newline:true,no: "quantile", extraction: "Boolean" }) },
            probs: {
                el: new input(config, {
                    no: 'probs',
                    label: localization.en.probs,
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: "0, 0.25, 0.5, 0.75, 1"
                })
            },
            addIsstatnames: {
                el: new input(config, {
                    no: 'addIsstatnames',
                    label: localization.en.addIsstatnames,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            bottom: [objects.label1.el.content, objects.min.el.content, objects.max.el.content, objects.mean.el.content, objects.median.el.content, objects.sum.el.content, objects.sd.el.content, objects.stderror.el.content, objects.iqr.el.content, objects.quantiles.el.content, objects.probs.el.content, objects.addIsstatnames.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sigma",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new NumericalStatisticalAnalysis().render()