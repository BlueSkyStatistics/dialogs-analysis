
class repeatedMeasuresAnovaW extends baseModal {
    static dialogId = 'repeatedMeasuresAnovaW'
    static t = baseModal.makeT(repeatedMeasuresAnovaW.dialogId)

    constructor() {
        var config = {
            id: repeatedMeasuresAnovaW.dialogId,
            label: repeatedMeasuresAnovaW.t('title'),
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
{{if(options.selected.no_subjectID =="TRUE")}}
.GlobalEnv\${{dataset.name}}_rehapedLonger <- {{dataset.name}} %>% mutate( {{selected.subjectID | safe}} = dplyr::row_number()) %>%
	pivot_longer( cols = c({{selected.repMeasuresConfig_depVar_1 | safe}}), 
	names_to = c( "{{selected.repMeasuresConfig_factorList | safe}}"), 
	values_to = c("{{selected.repMeasuresConfig_measureList | safe}}" ) ) 
{{#else}}
.GlobalEnv\${{dataset.name}}_rehapedLonger <- {{dataset.name}} %>% 
	pivot_longer( cols = c({{selected.repMeasuresConfig_depVar_1 | safe}}), 
	names_to = c( "{{selected.repMeasuresConfig_factorList | safe}}"), 
	values_to = c("{{selected.repMeasuresConfig_measureList | safe}}" ) )  
{{/if}}
# We will reuse code below in a future release  
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
BSkyFormat(data.frame(BSkyEmmWithinSubj), \n\tsingleTableOutputHeader ="Estimated marginal means for within subjects factor: {{selected.repMeasuresConfig_factorList | safe}}, CI=0.95")
{{if (options.selected.Fixed !="")}}
#Between subjects
BSkyEmmBetweenSubj <- {{selected.modelname | safe}} %>% \n\t emmeans::emmeans(~{{selected.Fixed | safe}})
BSkyFormat(data.frame(BSkyEmmBetweenSubj), \n\tsingleTableOutputHeader ="Estimated marginal means for between subjects factor: {{selected.Fixed | safe}}, CI=0.95")
#With interactions
BSkyEmmWithInteractions <- {{selected.modelname | safe}} %>% \n\temmeans::emmeans(~{{selected.Fixed | safe}}:{{selected.repMeasuresConfig_factorList | safe}})
BSkyFormat(data.frame(BSkyEmmWithInteractions), \n\tsingleTableOutputHeader ="Estimated marginal means with Interactions: {{selected.Fixed | safe}}:{{selected.repMeasuresConfig_factorList | safe}}, CI=0.95")\n
{{/if}}
{{/if}}
{{if (options.selected.chk3=="TRUE")}}
#Posthocs
#Posthoc for within subject factor
resContrastsWithinSubj <- emmeans::contrast(BSkyEmmWithinSubj, \n\tmethod = "{{selected.combon | safe}}", adjust = "{{selected.adjust | safe}}")
resSummaryContWithinSubj <- summary(resContrastsWithinSubj)
cat("\\n\\n\\n")
cat(attributes(resSummaryContWithinSubj)$mesg,sep = "\\n")
BSkyFormat(data.frame(resSummaryContWithinSubj), \n\tsingleTableOutputHeader = "Post-hoc tests for: {{selected.repMeasuresConfig_measureList | safe}} as a function of: {{selected.repMeasuresConfig_factorList | safe}} (using method = {{selected.combon | safe}})")
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
BSkyFormat(data.frame(resSummaryContWithInteractions), \n\tsingleTableOutputHeader = "Simple effects test: {{selected.repMeasuresConfig_measureList | safe}} for {{selected.repMeasuresConfig_factorList | safe}} by {{selected.Fixed | safe}} (using method = {{selected.combon | safe}})")\n
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
if (exists('{{dataset.name}}_rehapedLonger')) rm({{dataset.name}}_rehapedLonger)
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
                    label: repeatedMeasuresAnovaW.t('repMeasuresConfig'),
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
                    label: repeatedMeasuresAnovaW.t('modelname'),
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
                    label: repeatedMeasuresAnovaW.t('subjectID'),
                    no: "subjectID",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ subjectID | safe}}']
            },
            Fixed: {
                el: new dstVariable(config, {
                    label: repeatedMeasuresAnovaW.t('Fixed'),
                    no: "Fixed",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ Fixed | safe}}']
            },
            covariates: {
                el: new dstVariableList(config, {
                    label: repeatedMeasuresAnovaW.t('covariates'),
                    no: "covariates",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ covariates | safe}}']
            },
            plotMeansCI: { el: new checkbox(config, { label: repeatedMeasuresAnovaW.t('plotMeansCI'), newline: true, checked: true, no: "plotMeansCI", extraction: "Boolean" }) },
            Summary: { el: new checkbox(config, { label: repeatedMeasuresAnovaW.t('Summary'), newline: true, checked: true, no: "chk5", style: "mb-2", extraction: "Boolean" }) },
            Scatter_plot: { el: new checkbox(config, { label: repeatedMeasuresAnovaW.t('Scatter_plot'), newline: true, no: "chk3", extraction: "Boolean" }) },
            brownForsythe: { el: new checkbox(config, { label: repeatedMeasuresAnovaW.t('brownForsythe'), no: "brownForsythe", newline: true, extraction: "Boolean" }) },
            levenesTest: { el: new checkbox(config, { label: repeatedMeasuresAnovaW.t('levenesTest'), no: "levenesTest", newline: true, extraction: "Boolean" }) },
            simpleEffectsTest: { el: new checkbox(config, { label: repeatedMeasuresAnovaW.t('simpleEffectsTest'), no: "simpleEffectsTest", newline: true, extraction: "Boolean" }) },
            displayBoxMDetails: { el: new checkbox(config, { label: repeatedMeasuresAnovaW.t('displayBoxMDetails'), no: "displayBoxMDetails", newline: true, extraction: "Boolean" }) },
            label2: { el: new labelVar(config, { label: repeatedMeasuresAnovaW.t('label2'), h: 6 }) },
            helpText: { el: new labelVar(config, { label: repeatedMeasuresAnovaW.t('helpText'), h: 6 }) },
            combon: {
                el: new comboBox(config, {
                    no: 'combon',
                    label: repeatedMeasuresAnovaW.t('combon'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["pairwise", "revpairwise", "poly", "trt.vs.ctrl1", "trt.vs.ctrlk", "eff", "def", "consec", "mean_chg"],
                    default: "pairwise"
                })
            },
            adjust: {
                el: new comboBox(config, {
                    no: 'adjust',
                    label: repeatedMeasuresAnovaW.t('adjust'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["holm", "BY", "bonferroni", "fdr", "hochberg", "BH", "hommel", "none", "mvt", "scheffe", "sidak", "tukey"],
                    default: "none"
                })
            },
        };
        var opts = {
            el: new optionsVar(config, {
                no: "RepeatedMeasures_options",
                name: repeatedMeasuresAnovaW.t('options'),
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
            right: [objects.subjectID.el.content, objects.Fixed.el.content, objects.covariates.el.content, objects.modelname.el.content],
            bottom: [opts.el.content],
            nav: {
                name: repeatedMeasuresAnovaW.t('navigation'),
                icon: "icon-repeated_measures",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: repeatedMeasuresAnovaW.t('help.title'),
            r_help: "help(data,package='utils')",
            body: repeatedMeasuresAnovaW.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        var code_vars = {
            dataset: {
                name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
            },
            selected: instance.dialog.extractData()
        }
        let randomString = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 2; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        code_vars.selected.no_subjectID = "FALSE"
        if (code_vars.selected.subjectID == "") {
            code_vars.selected.subjectID = "BSky_Inserted_Row_ID" + "_" + randomString
            code_vars.selected.no_subjectID = "TRUE"
        }
        const cmd = instance.dialog.renderR(code_vars);
        //res.push({ cmd: cmd, cgid: newCommandGroup() })
        res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
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

module.exports = {
    render: () => new repeatedMeasuresAnovaW().render()
}
