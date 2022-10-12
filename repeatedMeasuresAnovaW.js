var localization = {
    en: {
        helpText: "Repeated measures ANOVA requires data to be in the long format. If your data is not in the long format, see Datasets > ReShape > Longer",
        repMeasuresConfig: "Configuration",
        modelname: "Enter model name",
        title: "Repeated Measures ANOVA -Wide",
        subjectID: "Variable to use as a subject identifier",
        dependentVariable: "Dependent variable",
        navigation: "ANOVA, Repeated Measures, Wide",
        response: "Within-subjects variable(s) e.g. Time",
        Fixed: "Between-subjects factor",
        covariates: "Covariates",
        Summary: "Estimated marginal means",
        Scatter_plot: "Posthocs",
        Residual: "Residual vs. Fitted plot",
        Histogram: "Histogram plot of residuals",
        brownForsythe: "Brown-Forsythe test",
        levenesTest: "Levene's test",
        plotMeansCI: "Plot of means and confidence intervals",
        simpleEffectsTest: "Simple effects test",
        label2: "Options for posthocs and simple effects test",
        combon: "Compare Means using:",
        adjust: "Method for adjusting p-values",
        displayBoxMDetails: "Display details associated with Box's M test (Note: Results of Box's M test are always shown)",
        help: {
            title: "Repeated Measures ANOVA",
            r_help: "help(aov_ez , package='afex')",
            body: `
<b>Description</b></br>
NOTE:<br/>
1. We need to reshape the data when running a repeated measures ANOVA on a wide dataset<br/>
2. We support multiple repeated measures for a single variable e.g. Blood Sugar measured at pretest, posttest and at a followup visit<br/>
3. You need to specify a repeated factor name e.g. Blood Sugar and the number of levels. We will create a factor variable e.g. named Blood Sugar with levels created from the names of the variables containing the repeated measures e.g. the levels of the factor will be pretest, posttest and followup<br/>
4. You need to specify a measure name e.g. Value. We will create a variable e.g. Value with all the Blood Sugar values corresponding to the pretest, posttest and followup for each subject.<br/>
5. We support a single between-subject and within-subject factor variable.<br/>
6. Future versions will support multiple measures as well as multiple between subject and within subject factor variables.<br/><br/>
With repeated measures ANOVA F statistics are computed for each within subjects factor, between subject factor and the interaction term for mixed ANOVA</br>
Look for the additional ANOVA values tables in the output which display MSE (mean sum of squares for error) and pes (partial eta squared)</br>
We currently support a single within subject and between subject factor, the between subject factor is optional.</br>
<br/>
<b>Usage</b>
<br/>
<code> 
aov_ez(data = dataset1, dv = "dependentVariable", 
	id = "Identifier", within = c("Time"), 	between = c("Treatment"),  
	anova_table = list(es = "pes"))
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
data: A data.frame containing the data. Mandatory
</li>
<li>
dv: character vector (of length 1) indicating the column containing the dependent variable in data.
</li>
<li>
between: character vector indicating the between-subject(s) factor(s)/column(s) in data. Default is NULL indicating no between-subjects factors.
</li>
<li>
within: character vector indicating the within-subject(s)(or repeated-measures) factor(s)/column(s) in data. Default is NULL indicating no within-subjects factors.
</li>
<li>
covariate: character vector indicating the between-subject(s) covariate(s) (i.e., column(s)) in data. Default is NULL indicating no covariates. Please note that factorize needs to be set to FALSE in case the covariate is numeric and should be treated as such.
</li>
<li>
anovatable: list of further arguments passed to function producing the ANOVA table. 
</li>
</ul>
<br/>
<b>Details</b></br>
See detailed R help</br>
<b>Value</b><br/>
aov_car, aov_4, and aov_ez are wrappers for Anova and aov, the return value is dependent on the return argument. Per default, an S3 object of class "afex_aov" is returned containing the following slots:<br/>
"anova_table": An ANOVA table of class c("anova", "data.frame").<br/>
"aov": aov object returned from aov (should not be used to evaluate significance of effects, but can be passed to emmeans for post-hoc tests).<br/>
"Anova": object returned from Anova, an object of class "Anova.mlm" (if within-subjects factors are present) or of class c("anova", "data.frame").<br/>
"lm": the object fitted with lm and passed to Anova (i.e., an object of class "lm" or "mlm"). Also returned if return = "lm".<br/>
"data": a list containing: (1) long (the possibly aggregated data in long format used for aov), wide (the data used to fit the lm object), and idata (if within-subject factors are present, the idata argument passed to car::Anova). Also returned if return = "data".<br/>
<b>Package</b></br>
afex</br>
<b>Help</b></br>
help(aov_ez, package ='afex')
Click the R Help button to get detailed R help. You can also enter help(aov_ez, package ='afex') and hit CTRL Enter in the R syntax editor to get help
    `}
    }
}
var baseModal = require('../base/baseModal').baseModal
var srcVariableList = require('../library/srcVariableList').element
var dstVariableList = require('../library/dstVariableList').element
var dstVariable = require('../library/dstVariable').element
var checkbox = require('../library/checkBox').element
var input = require('../library/inputVariable').element
var labelVar = require('../library/label').element
var comboBox = require('../library/comboBox').element
var options = require('../library/options').element
class repeatedMeasuresAnovaW extends baseModal {
    constructor() {
        var config = {
            id: "repeatedMeasuresAnovaW",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(afex)
require(ggplot2)
require(car)
require(emmeans)
require(dplyr)
require(heplots)
require(tidyr)
#Using pivot longer to convert the dataset to longer format
.GlobalEnv\${{dataset.name}}_rehapedLonger <- {{dataset.name}} %>% 
	pivot_longer( cols = c({{selected.repMeasuresConfig_depVar_1 | safe}}), 
	names_to = c( "{{selected.repMeasuresConfig_factorList | safe}}"), 
	values_to = c("{{selected.repMeasuresConfig_measureList | safe}}" ) )  
# WE will reuse code below in a future release  
#.GlobalEnv\${{dataset.name}}_rehapedLonger <- {{dataset.name}} %>% 
#	pivot_longer( cols = c({{selected.repMeasuresConfig_depVar_1 | safe}}), 
#	names_to = c(".value", "{{selected.repMeasuresConfig_factorList | safe}}"), 
#   values_drop_na = FALSE, names_sep ="_") 
#Creating the model
{{selected.modelname | safe}} <- afex::aov_ez(data = {{dataset.name}}_rehapedLonger, dv = "{{selected.repMeasuresConfig_measureList | safe}}", \n\tid = "{{selected.subjectID | safe}}", within = "{{selected.repMeasuresConfig_factorList | safe}}"   ,{{if (options.selected.Fixed !="")}}\n\tbetween = c("{{selected.Fixed | safe}}"),{{/if}}{{if (options.selected.covariates !="")}}\n\tcovariate=c({{selected.covariates | safe}}), factorize = FALSE, {{/if}}\n\tanova_table = list(es = "pes"))
#Summarizing the model
BSkyRepMeasuresSummary <- summary({{selected.modelname | safe}})
BSkyFormat(BSkyRepMeasuresSummary)
BSkyFormat(as.data.frame({{selected.modelname | safe}}$anova_table), \n\toutputTableIndex = c(tableone=1), \n\toutputColumnIndex = c(tableone=c(3,5)), \n\tsingleTableOutputHeader ="Additional ANOVA values")\n
{{if (options.selected.Fixed !="")}}
#Running Box's M
BSkyBoxMRes <- heplots::boxM({{dataset.name}}[,c({{selected.repMeasuresConfig_depVar_1 | safe}})], group={{dataset.name}}[, c("{{selected.Fixed | safe}}")])
BSkyFormat(BSkyBoxMRes, outputTableIndex = c(tableone=1, tabletwo=2))
{{if (options.selected.displayBoxMDetails == "TRUE")}}
# Display details on Box's M
BSkyBoxMSummaryRes <- summary(BSkyBoxMRes, quiet=TRUE)\n
BSkyFormat(BSkyBoxMSummaryRes, outputTableRenames = c("Log of covariance determinants:", "Eigenvalues:", \n\t"Statistics based on eigenvalues:"))\n
{{/if}}
{{/if}}
{{if (options.selected.Fixed =="")}}
BSkyFormat(data.frame(Message = "Box's M cannot be run as a between subjects factor is not specified"))
{{/if}}
{{if (options.selected.plotMeansCI == "TRUE")}}
#Plot of means and confidence intervals
afex_plot({{selected.modelname | safe}}, x = c("{{selected.repMeasuresConfig_factorList | safe}}"), {{if (options.selected.Fixed !="")}}\n\ttrace = "{{selected.Fixed | safe}}", {{/if}}error = "within", 
    error_ci = TRUE, error_level = 0.95,
    data_plot = TRUE, legend_title = "Plot of means")\n
{{/if}}
{{if (options.selected.chk5 == "TRUE" || options.selected.chk3 == "TRUE")}}
#Estimated marginal means
#Within subjects
BSkyEmmWithinSubj <- {{selected.modelname | safe}} %>% \n\t emmeans::emmeans(~{{selected.repMeasuresConfig_factorList | safe}})
BSkyFormat(as.data.frame(BSkyEmmWithinSubj), \n\tsingleTableOutputHeader ="Estimated marginal means for within subjects factor: {{selected.repMeasuresConfig_factorList | safe}}, CI=0.95")
{{if (options.selected.Fixed !="")}}
#Between subjects
BSkyEmmBetweenSubj <- {{selected.modelname | safe}} %>% \n\t emmeans::emmeans(~{{selected.Fixed | safe}})
BSkyFormat(as.data.frame(BSkyEmmBetweenSubj), \n\tsingleTableOutputHeader ="Estimated marginal means for between subjects factor: {{selected.Fixed | safe}}, CI=0.95")
#With interactions
BSkyEmmWithInteractions <- {{selected.modelname | safe}} %>% \n\temmeans::emmeans(~{{selected.Fixed | safe}}:{{selected.repMeasuresConfig_factorList | safe}})
BSkyFormat(as.data.frame(BSkyEmmWithInteractions), \n\tsingleTableOutputHeader ="Estimated marginal means with Interactions: {{selected.Fixed | safe}}:{{selected.repMeasuresConfig_factorList | safe}}, CI=0.95")\n
{{/if}}
{{/if}}
{{if (options.selected.chk3=="TRUE")}}
#Posthocs
#Posthoc for within subject factor
resContrastsWithinSubj <- emmeans::contrast(BSkyEmmWithinSubj, \n\tmethod = "{{selected.combon | safe}}", adjust = "{{selected.adjust | safe}}")
resSummaryContWithinSubj <- summary(resContrastsWithinSubj)
cat("\\n\\n\\n")
cat(attributes(resSummaryContWithinSubj)$mesg,sep = "\\n")
BSkyFormat(as.data.frame(resSummaryContWithinSubj), \n\tsingleTableOutputHeader = "Post-hoc tests for: {{selected.repMeasuresConfig_measureList | safe}} as a function of: {{selected.repMeasuresConfig_factorList | safe}} (using method = {{selected.combon | safe}})")
{{if (options.selected.Fixed !="")}}
#Posthoc for between subject factor
resContrastsBetweenSubj <- emmeans::contrast(BSkyEmmBetweenSubj, \n\tmethod = "{{selected.combon | safe}}",adjust = "{{selected.adjust | safe}}")
resSummaryContBetweenSubj <- summary(resContrastsBetweenSubj)
cat("\\n\\n\\n")
cat(attributes(resSummaryContBetweenSubj)$mesg,sep = "\\n")
BSkyFormat(as.data.frame(resSummaryContBetweenSubj),\n\tsingleTableOutputHeader = "Post-hoc tests for: {{selected.repMeasuresConfig_measureList | safe}} as a function of: {{selected.Fixed | safe}} (using method = {{selected.combon | safe}})")\n
{{/if}}
{{/if}}
{{if (options.selected.simpleEffectsTest=="TRUE" && options.selected.Fixed != "")}}
#Simple effects test = Posthocs with interaction
resContWithInteractions <- emmeans::contrast(BSkyEmmWithInteractions,\n\tmethod = "{{selected.combon | safe}}",\n\tadjust = "{{selected.adjust | safe}}")
resSummaryContWithInteractions <- summary(resContWithInteractions)
cat("\\n\\n\\n")
cat(attributes(resSummaryContWithInteractions)$mesg,sep = "\\n")
BSkyFormat(as.data.frame(resSummaryContWithInteractions), \n\tsingleTableOutputHeader = "Simple effects test: {{selected.repMeasuresConfig_measureList | safe}} for {{selected.repMeasuresConfig_factorList | safe}} by {{selected.Fixed | safe}} (using method = {{selected.combon | safe}})")\n
{{/if}}
{{if (options.selected.simpleEffectsTest=="TRUE" && options.selected.Fixed == "")}}
BSkyFormat(data.frame(Message = "Simple effects tests cannot be run as a between subjects factor is not specified"))
{{/if}}
{{if (options.selected.brownForsythe=="TRUE" && options.selected.Fixed != "")}}
# Brown-Forsythe test on between subject factor 
BSkyBrFoFactor <- leveneTest({{selected.repMeasuresConfig_measureList | safe}} ~ {{selected.Fixed | safe}}, \n\tdata = {{dataset.name}}_rehapedLonger, center=median)
BSkyFormat(as.data.frame(BSkyBrFoFactor),\n\tsingleTableOutputHeader = "Brown-Forsythe test for between subject factor: {{selected.Fixed | safe}}, group = {{selected.Fixed | safe}} ")
# Brown-Forsythe test on between subject * within subject factor
BSkyBrFoFactor <- leveneTest({{selected.repMeasuresConfig_measureList | safe}} ~ {{selected.repMeasuresConfig_factorList | safe}}*{{selected.Fixed | safe}}, \n\tdata = {{dataset.name}}_rehapedLonger, center=median)
BSkyFormat(as.data.frame(BSkyBrFoFactor),\n\tsingleTableOutputHeader = "Brown-Forsythe test of: {{selected.repMeasuresConfig_factorList | safe}} by: {{selected.Fixed | safe}}, group = {{selected.repMeasuresConfig_factorList | safe}}")\n
{{/if}}
{{if (options.selected.brownForsythe =="TRUE" && options.selected.Fixed == "")}}
BSkyFormat(data.frame(Message = "Brown-Forsythe test cannot be run as a between subjects factor is not specified"))
{{/if}}
{{if (options.selected.levenesTest=="TRUE" && options.selected.Fixed != "")}}
#Levene's test on between subject factor 
BSkyLevenesFactor <- leveneTest({{selected.repMeasuresConfig_measureList | safe}} ~ {{selected.Fixed | safe }},\n\tdata = {{dataset.name}}_rehapedLonger, center=mean)
BSkyFormat(as.data.frame(BSkyLevenesFactor), \n\tsingleTableOutputHeader = "Levene's test for homogenity of variances center = mean, group = {{selected.Fixed | safe}}")
#Levene's test on between subject * within subject factor
BSkyLevenesFactor <- leveneTest({{selected.repMeasuresConfig_measureList | safe}} ~ {{selected.repMeasuresConfig_factorList | safe}}*{{selected.Fixed | safe}},\n\tdata = {{dataset.name}}_rehapedLonger, center=mean)
BSkyFormat(as.data.frame(BSkyLevenesFactor), \n\tsingleTableOutputHeader = "Levene's test for homogenity of variances center = mean, group = {{selected.repMeasuresConfig_factorList | safe}}")
{{/if}}
{{if (options.selected.levenesTest =="TRUE" && options.selected.Fixed == "")}}
BSkyFormat(data.frame(Message = "Levene's test cannot be run as a between subjects factor is not specified"))
{{/if}}
\n#Removing temporary objects
if (exists('BSkyRepMeasuresSummary')) rm(BSkyRepMeasuresSummary)
if (exists('BSkyDescBetweenSubj')) rm(BSkyDescBetweenSubj)
if (exists('BSkyEmmBetweenSubj')) rm(BSkyEmmBetweenSubj)
if (exists('BSkyEmmWithinSubj')) rm(BSkyEmmWithinSubj)
if (exists('BSkyEmmWithInteractions')) rm(BSkyEmmWithInteractions)
if (exists('resContrastsWithinSubj')) rm(resContrastsWithinSubj)
if (exists('resContrastsBetweenSubj')) rm(resContrastsBetweenSubj)
if (exists('resSummaryContWithinSubj')) rm(resSummaryContWithinSubj) 
if (exists('resSummaryContBetweenSubj')) rm(resSummaryContBetweenSubj)
if (exists('resSummaryContWithInteractions')) rm(resSummaryContWithInteractions)
if (exists('BSkyReshapedData')) rm(BSkyReshapedData)
if( exists('BSkyBoxMRes')) rm(BSkyBoxMRes) 
if( exists('boxMFactor')) rm(boxMFactor) 
if( exists('BSkyBoxMRes')) rm(BSkyBoxMRes)
if (exists('BSkyBoxMSummaryRes')) rm(BSkyBoxMSummaryRes)
if (exists('BSkyBrFoFactor')) rm(BSkyBrFoFactor) 
if (exists('BSkyLevenesFactor')) rm(BSkyLevenesFactor)
`
        }
        var objects = {
            repMeasuresConfig: {
                el: new repMeasuresCTRL(config, {
                    label: localization.en.repMeasuresConfig,
                    no: "repMeasuresConfig",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            }, 
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            modelname: {
                el: new input(config, {
                    no: 'modelname',
                    label: localization.en.modelname,
                    placeholder: "",
                    required: true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "RepMeasuresAnova",
                    overwrite: "dataset"
                })
            },
           
            subjectID: {
                el: new dstVariable(config, {
                    label: localization.en.subjectID,
                    no: "subjectID",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ subjectID | safe}}']
            },
           Fixed: {
                el: new dstVariable(config, {
                    label: localization.en.Fixed,
                    no: "Fixed",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ Fixed | safe}}']
            },
            covariates: {
                el: new dstVariableList(config, {
                    label: localization.en.covariates,
                    no: "covariates",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ covariates | safe}}']
            },
            plotMeansCI: { el: new checkbox(config, { label: localization.en.plotMeansCI, newline: true, checked: true, no: "plotMeansCI", extraction: "Boolean" }) },
            Summary: { el: new checkbox(config, { label: localization.en.Summary, newline: true, checked: true, no: "chk5", style: "mb-2", extraction: "Boolean" }) },
            Scatter_plot: { el: new checkbox(config, { label: localization.en.Scatter_plot, newline: true, no: "chk3", extraction: "Boolean" }) },
            brownForsythe: { el: new checkbox(config, { label: localization.en.brownForsythe, no: "brownForsythe", newline: true, extraction: "Boolean" }) },
            levenesTest: { el: new checkbox(config, { label: localization.en.levenesTest, no: "levenesTest", newline: true, extraction: "Boolean" }) },
            simpleEffectsTest: { el: new checkbox(config, { label: localization.en.simpleEffectsTest, no: "simpleEffectsTest", newline: true, extraction: "Boolean" }) },
            displayBoxMDetails: { el: new checkbox(config, { label: localization.en.displayBoxMDetails, no: "displayBoxMDetails", newline: true, extraction: "Boolean" }) },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 6 }) },
            helpText: { el: new labelVar(config, { label: localization.en.helpText, h: 6 }) },
            combon: {
                el: new comboBox(config, {
                    no: 'combon',
                    label: localization.en.combon,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["pairwise", "revpairwise", "poly", "trt.vs.ctrl1", "trt.vs.ctrlk", "eff", "def", "consec", "mean_chg"],
                    default: "pairwise"
                })
            },
            adjust: {
                el: new comboBox(config, {
                    no: 'adjust',
                    label: localization.en.adjust,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["holm", "BY", "bonferroni", "fdr", "hochberg", "BH", "hommel", "none", "mvt", "scheffe", "sidak", "tukey"],
                    default: "none"
                })
            },
        };
        var opts = {
            el: new options(config, {
                no: "RepeatedMeasures_options",
                name: localization.en.options,
                content: [
                    objects.plotMeansCI.el,
                    objects.Summary.el,
                    objects.label2.el,
                    objects.combon.el,
                    objects.adjust.el,
                    objects.Scatter_plot.el,
                    objects.simpleEffectsTest.el,
                    objects.displayBoxMDetails.el,
                    objects.brownForsythe.el,
                    objects.levenesTest.el,
                ]
            })
        };
        const content = {
            head: [objects.repMeasuresConfig.el.content,],
            left: [objects.content_var.el.content],
            right: [  objects.subjectID.el.content, objects.Fixed.el.content, objects.covariates.el.content,objects.modelname.el.content],
            bottom: [opts.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-repeated_measures",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
    prepareExecution(instance) {
        var res = [];
        var code_vars = {
            dataset: {
                name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
            },
            selected: instance.dialog.extractData()
        }
        const cmd = instance.dialog.renderR(code_vars);
        res.push({ cmd: cmd, cgid: newCommandGroup() })
        return res;
       /*  let i=1;
        let errorRaised =false
        let firstValue =""
        code_vars.selected.repMeasuresConfig_depVar_1.split(",").every(function (value) {
            if (!value.includes("_"))
            {
                const cmd ="cat(\"ERROR: Variable names that contain repeated measures must all have a common prefix followed by _ followed by a number that denotes the repetition.\nFor e.g. test_1, test_2 ...or Time_1, Time_2...\nPlease rename your variables accordingly\")";
                res.push({ cmd: cmd, cgid: newCommandGroup() })
                dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Incorrect variable name format", message: "Variable names that contain repeated measures must all have a common prefix followed by _ followed by a number that denotes the repetition.\nFor e.g. test_1, test_2 ...or Time_1, Time_2...\nPlease rename your variables accordingly" })
                errorRaised =true
                return 
            }        
            if (i==1)
            {
                firstValue = value.substring(0,value.indexOf("_"));
            }
            i=i+1
            if (firstValue != value.substring(0,value.indexOf("_")))
            {
                const cmd ="cat(\"ERROR: Variable names that contain repeated measures don't have a common prefix. All variables that contain repeated measures must all have a common prefix followed by _ followed by a number that denotes the repetition.\nFor e.g. test_1, test_2 ...or Time_1, Time_2...\nPlease rename your variables accordingly\")";
                res.push({ cmd: cmd, cgid: newCommandGroup() })
                dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Incorrect variable name format", message: "Variable names that contain repeated measures don't have a common prefix. \nAll Variable names that contain repeated measures must all have a common prefix followed by _ followed by a number that denotes the repetition.\nFor e.g. test_1, test_2 ...or Time_1, Time_2...\nPlease rename your variables accordingly" })
                errorRaised =true
                return 
            }
        })

        if (errorRaised)
        {
            return res
        }
        else
        {
            const cmd = instance.dialog.renderR(code_vars);
            res.push({ cmd: cmd, cgid: newCommandGroup() })
            return res;
        } */
    }
}
module.exports.item = new repeatedMeasuresAnovaW().render()