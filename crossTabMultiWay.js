var localization = {
    en: {
        title : "Crosstab",
        navigation : "Crosstab",
        label6 : "When multiple row and column variables are specified, we generate a separate cross table for each pair of row and column variables.",
        rowlabel : "Row Variable",
        collabel : "Column Variable",
        layerlabel : "Layer Variable(s)",
        weightlabel: "Weight (one)",
        label1 : "Statistics",
        chisqlabel : "Chisq",
        chisqNoContCorrection : "No continuity correction for Chi-squared test",
        chisqContCorrection : "Apply continuity correction for Chi-squared test (Applies to a 2 by 2 table)",
        chisqSimulatePValues : "Compute p-values using Monte Carlo simulation",
        chisqNoOfReplicates : "Number of replicates used in the Monte Carlo test",
        mcnemar : "McNemar",
        mcnemarContCorrection : "Apply continuity correction for McNemar's test (Applies to a 2 by 2 table)",
        fisher : "Fisher",
        fisherSimulatePValues : "Compute p-values using Monte Carlo simulation",
        fisherNoOfReplicates : "Number of replicates used in the Monte Carlo test",
        fishersAlternative : "Alternative hypothesis for Fisher's Exact test",
        label2 : "Residuals",
        unstandardized : "Unstandardized",
        standardized : "Standardized",
        adjusted : "Adjusted",
        label3 : "Percentages",
        rowpercent : "Row",
        colpercent : "Column",
        label4 : "Counts",
        expected : "Expected",      
        label5 : "Output format",
        longTbl : "List-style table (Constrain table width when many levels)",          
        help: {
            title: "Crosstab",
            r_help: "help(CrossTable, package=gmodels)",
            body: `
            <b>Description</b></br>
Creates crosstab with row, column and layer variables. When multiple row and column variables are specified, we generate a separate cross table for each pair of row and column variables. Additionally the following are displayed<br/>
Expected counts<br/>
Row and column percentages<br/>
Unstandardized, standardized and adjusted residuals<br/>
Chisq with odds ratio, McNemar and Fisher statistics<br/>
NOTE: We automatically remove all rows where every count is 0. This may impact how the Chisq, McNemar and Fisher tests are run. For example, you may expect 3 rows and 2 columns as the row variable has 3 levels and the column variable 2 levels. However as a row level has all 0 counts, you get a 2*2 table. While Monte Carlo simulation with Fisher's test runs on a 3*2 table, it does not apply to a 2*2 table and the normal Fisher's Test is run. 
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyCrossTable(x,y,layers, weight, datasetname, chisq= FALSE, prop.r=FALSE, prop.c=FALSE, resid=FALSE, sresid=FALSE, expected=FALSE, asresid=FALSE,long_table = FALSE )
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: row variable
</li>
<li>
y: column variable
</li>
<li>
layers: one or more variables for layers
</li>
<li>
weights: a numeric variable containing the frequency weights
</li>
<li>
datasetname: Name of the dataset from which x,y and layers (variables) are chosen
</li>
<li>
chisq:  if TRUE generates chi-square table
</li>
<li>
prop.r: Row percentages are produced if this is TRUE
</li>
<li>
prop.c: Column percentages are generated if this is TRUE
</li>
<li>
resid: if TRUE, unstandardized residual are generated
</li>
<li>
sresid: if TRUE, standardized residuals are generated
</li>
<li>
expected: Expected counts are generated if this is TRUE
</li>
<li>
asresid:  if TRUE, adjusted residuals are generated
</li>
<li>
long_table: Long table option is introduced to accommodate analysis done on a large number of variables. Choosing the long format controls the width of the output table making it easy to view results withing having to scroll right on the output window. 
</li>
</ul>
<b>value</b></br>
A list with the results
<br/>
<b>Example</b></br>
<code> 
BSky_Multiway_Cross_Tab = BSkyCrossTable(x=c('manufact'),y=c('model'),<br/>
layers=c('type'),datasetname='Dataset2',<br/>
chisq = FALSE,prop.r=FALSE,prop.c=FALSE,<br/>
resid=FALSE,sresid=FALSE,expected=FALSE,<br/>
asresid=FALSE)</br>
BSkyFormat(BSky_Multiway_Cross_Tab)</br>
</code> <br/>
<b>Package</b></br>
gmodels</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(CrossTable, package=gmodels) by creating a R code chunk by clicking + in the output window  
    `}
    }
}
class crossTabMultiWay extends baseModal {
    constructor() {
        var config = {
            id: "crossTabMultiWay",
            label: localization.en.title,
            modalType: "two",
            splitProcessing: false,
            RCode: `#Create the crosstab
{{each(options.selected.row)}}
{{dataset.name}} %>%
dplyr::select({{@this}}, {{selected.col | safe}}, {{selected.layer | safe}} ) %>%
    BSkyCrossTable(
            chisq = {{selected.chisq | safe}},
            chisqCorrect = {{if (options.selected.gpbox1 =="chisqContCorrection")}}TRUE{{#else}}FALSE{{/if}},
            chisqSimulate = {{if (options.selected.gpbox1 =="chisqSimulatePValues")}}TRUE{{#else}}FALSE{{/if}},
            chisqNoOfSimulations = {{selected.chisqNoOfReplicates | safe}},
            fisher = {{selected.fisher | safe}},
            fisherSimulate = {{selected.fisherSimulatePValues | safe}},
            fisherNoOfSimulations = {{selected.fisherNoOfReplicates | safe}},
            fisherAlternate = "{{selected.fishersAlternative | safe}}",
            mcnemar={{selected.mcnemar | safe}}, 
            mcnemarCorrect={{selected.mcnemarContCorrection | safe}}, 
            prop.r={{selected.rowpercent | safe}}, 
            prop.c={{selected.colpercent | safe}},
            resid={{selected.unstandardized | safe}}, 
            sresid={{selected.standardized | safe}}, 
            asresid={{selected.adjusted | safe}},
            expected={{selected.expected | safe}}, 
            long_table = {{selected.longTbl | safe}},
            {{selected.weight | safe}}
            datasetname='{{dataset.name}}') %>%
                BSkyFormat()   
{{/each}}               
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move", scroll: true }) },
            label6: { el: new labelVar(config, { no: "label6", label: localization.en.label6, h: 5 }) },
            row: {
                el: new dstVariableList(config, {
                    label: localization.en.rowlabel,
                    no: "row",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true
                })
            },
            column: {
                el: new dstVariableList(config, {
                    label: localization.en.collabel,
                    no: "column",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true
                })
            },
            layer: {
                el: new dstVariableList(config, {
                    label: localization.en.layerlabel,
                    no: "layer",
                    filter: "Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    //wrapped: 'layers=c(%val%),\n',
                })
            },
            weight: {
                el: new dstVariable(config, {
                    label: localization.en.weightlabel,
                    no: "weight",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    wrapped: 'weight=c(%val%),\n'
                })
            },
            label1: { el: new labelVar(config, { no: "label1", label: localization.en.label1, h: 5 }) },
            chisq: {
                el: new checkbox(config, {
                    label: localization.en.chisqlabel,
                    style: "mt-2",
                    no: "chisq",
                    extraction: "Boolean",
                })
            },
            chisqNoContCorrection: {
                el: new radioButton(config, {
                    label: localization.en.chisqNoContCorrection,
                    style: "ml-2",
                    //   dependant_objects: ['chisq'],
                    increment: "chisqNoContCorrection",
                    no: "gpbox1",
                    value: "chisqNoContCorrection",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            chisqContCorrection: {
                el: new radioButton(config, {
                    label: localization.en.chisqContCorrection,
                    style: "ml-2",
                    //  dependant_objects: ['chisq'],
                    increment: "chisqContCorrection",
                    value: "chisqContCorrection",
                    no: "gpbox1",
                    extraction: "ValueAsIs"
                })
            },
            chisqSimulatePValues: {
                el: new radioButton(config, {
                    label: localization.en.chisqSimulatePValues,
                    increment: "chisqSimulatePValues",
                    style: "ml-2",
                    //  dependant_objects: ['chisq'],
                    extraction: "ValueAsIs",
                    no: "gpbox1",
                    value: "chisqSimulatePValues",
                })
            },
            chisqNoOfReplicates: {
                el: new inputSpinner(config, {
                    no: 'chisqNoOfReplicates',
                    label: localization.en.chisqNoOfReplicates,
                    min: 0,
                    style: "ml-4",
                    max: 999999999999999,
                    step: 1000,
                    value: 2000,
                    extraction: "NoPrefix|UseComma"
                })
            },
            mcnemar: {
                el: new checkbox(config, {
                    label: localization.en.mcnemar,
                    no: "mcnemar",
                    style: "mt-4",
                    extraction: "Boolean",
                })
            },
            mcnemarContCorrection: {
                el: new checkbox(config, {
                    label: localization.en.mcnemarContCorrection,
                    style: "ml-2",
                    // dependant_objects: ['mcnemar'],
                    newline: true,
                    no: "mcnemarContCorrection",
                    extraction: "Boolean",
                })
            },
            fisher: {
                el: new checkbox(config, {
                    label: localization.en.fisher,
                    no: "fisher",
                    style: "mt-4",
                    newline: true,
                    extraction: "Boolean",
                })
            },
            fisherSimulatePValues: {
                el: new checkbox(config, {
                    label: localization.en.fisherSimulatePValues,
                    style: "ml-2",
                    newline: true,
                    no: "fisherSimulatePValues",
                    extraction: "Boolean",
                })
            },
            fisherNoOfReplicates: {
                el: new inputSpinner(config, {
                    no: 'fisherNoOfReplicates',
                    label: localization.en.fisherNoOfReplicates,
                    min: 0,
                    style: "ml-4",
                    max: 999999999999999,
                    step: 1000,
                    value: 2000,
                    extraction: "NoPrefix|UseComma"
                })
            },
            fishersAlternative: {
                el: new comboBox(config, {
                    no: "fishersAlternative",
                    label: localization.en.fishersAlternative,
                    multiple: false,
                    style: "ml-2",
                    extraction: "NoPrefix|UseComma",
                    options: ["two.sided", "greater", "less"],
                    default: "two.sided"
                })
            },
            label2: { el: new labelVar(config, { no: "label2", label: localization.en.label2, h: 5 }) },
            unstandardized: {
                el: new checkbox(config, {
                    label: localization.en.unstandardized,
                    no: "unstandardized",
                    extraction: "Boolean",
                })
            },
            standardized: {
                el: new checkbox(config, {
                    label: localization.en.standardized,
                    no: "standardized",
                    extraction: "Boolean",
                })
            },
            adjusted: {
                el: new checkbox(config, {
                    label: localization.en.adjusted,
                    no: "adjusted",
                    extraction: "Boolean",
                })
            },
            label3: { el: new labelVar(config, { no: "label3", label: localization.en.label3, h: 5 }) },
            rowpercent: {
                el: new checkbox(config, {
                    label: localization.en.rowpercent,
                    no: "rowpercent",
                    extraction: "Boolean",
                })
            },
            colpercent: {
                el: new checkbox(config, {
                    label: localization.en.colpercent,
                    no: "colpercent",
                    extraction: "Boolean",
                })
            },
            label4: { el: new labelVar(config, { no: "label4", label: localization.en.label4, h: 5 }) },
            expected: {
                el: new checkbox(config, {
                    label: localization.en.expected,
                    no: "expected",
                    extraction: "Boolean",
                })
            },
            label5: { el: new labelVar(config, { no: "label5", label: localization.en.label5, h: 5 }) },
            longTbl: {
                el: new checkbox(config, {
                    label: localization.en.longTbl,
                    no: "longTbl",
                    extraction: "Boolean",
                })
            },
        };
        var advoptions = {
            el: new optionsVar(config, {
                no: "barchart_options",
                //name: "Options",
                content: [
                    objects.label1.el,
                    objects.chisq.el,
                    objects.chisqNoContCorrection.el,
                    objects.chisqContCorrection.el,
                    objects.chisqSimulatePValues.el,
                    objects.chisqNoOfReplicates.el,
                    objects.mcnemar.el,
                    objects.mcnemarContCorrection.el,
                    objects.fisher.el,
                    objects.fisherSimulatePValues.el,
                    objects.fisherNoOfReplicates.el,
                    objects.fishersAlternative.el,
                    objects.label2.el,
                    objects.unstandardized.el,
                    objects.standardized.el,
                    objects.adjusted.el,
                    objects.label3.el,
                    objects.rowpercent.el,
                    objects.colpercent.el,
                    objects.label4.el,
                    objects.expected.el,
                    objects.label5.el,
                    objects.longTbl.el
                ]
            })
        };
        const content = {
            head: [objects.label6.el.content],
            left: [objects.content_var.el.content],
            right: [objects.row.el.content, objects.column.el.content, objects.layer.el.content, objects.weight.el.content],
            bottom: [advoptions.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-crosstab",
                modal: config.id,
                datasetRequired: true
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
    prepareExecution(instance) {
        var res = [];
        let temp = ""
        let count =0
        instance.objects.column.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
                },
                selected: instance.dialog.extractData()
            }
            code_vars.selected.row = code_vars.selected.row.split(",");
            code_vars.selected.col = value
            temp = instance.dialog.renderR(code_vars);
            if (count == 0) {
                res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
            }
            else {
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: instance.config.RCode, code_vars: code_vars })
            }
            count++
        })
        return res;
    }
}
module.exports.item = new crossTabMultiWay().render()