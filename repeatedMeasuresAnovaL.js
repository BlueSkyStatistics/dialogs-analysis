

class repeatedMeasuresAnovaL extends baseModal {
    static dialogId = 'repeatedMeasuresAnovaL'
    static t = baseModal.makeT(repeatedMeasuresAnovaL.dialogId)

    constructor() {
        var config = {
            id: repeatedMeasuresAnovaL.dialogId,
            label: repeatedMeasuresAnovaL.t('title'),
            modalType: "two",
            RCode: `
require(afex)
require(ggplot2)
require(car)
require(emmeans)
require(dplyr)
require(heplots)
require(tidyr)
#Creating the model
{{selected.modelname | safe}} <- afex::aov_ez(data = {{dataset.name}}, dv = "{{selected.dependentVariable | safe}}", \n\tid = "{{selected.subjectID | safe}}", within = c("{{selected.response | safe}}"),{{if (options.selected.Fixed !="")}}\n\tbetween = c("{{selected.Fixed | safe}}"),{{/if}}{{if (options.selected.covariates !="")}}\n\tcovariate=c({{selected.covariates | safe}}), factorize = FALSE, {{/if}}\n\tanova_table = list(es = "pes"))
#Summarizing the model
BSkyRepMeasuresSummary <- summary({{selected.modelname | safe}})
BSkyFormat(BSkyRepMeasuresSummary)
BSkyFormat(as.data.frame({{selected.modelname | safe}}$anova_table), \n\toutputTableIndex = c(tableone=1), \n\toutputColumnIndex = c(tableone=c(3,5)), \n\tsingleTableOutputHeader ="Additional ANOVA values")\n
{{if (options.selected.Fixed !="")}}
#Reshaping data to run Box's M
BSkyReshapedData <- {{dataset.name}} %>%\n\ttidyr::pivot_wider(id_cols = c({{selected.subjectID | safe}},{{selected.Fixed | safe}} ),\n\tnames_from =c({{selected.response | safe}}),\n\tvalues_from=c({{selected.dependentVariable | safe}}),\n\tnames_prefix ="{{selected.dependentVariable | safe}}_",\n\tnames_sort= TRUE) %>% dplyr::select (-{{selected.subjectID | safe}})
#Converting BSkyReshapedData to a dataframe for compatibility with Box's M
BSkyReshapedData = as.data.frame(BSkyReshapedData)
#The factor for Box's M
boxMFactor <- c("{{selected.Fixed | safe}}")
#Dependent variables for Box's M
boxMDependentVariables <- names(BSkyReshapedData) [-which(names(BSkyReshapedData) %in% boxMFactor)]\n
#Running Box's M
BSkyBoxMRes <- heplots::boxM(BSkyReshapedData[,boxMDependentVariables], group=BSkyReshapedData[,boxMFactor])
BSkyFormat(BSkyBoxMRes, outputTableIndex = c(tableone=1, tabletwo=2))
{{if (options.selected.displayBoxMDetails == "TRUE")}}
# Display details on Box's M
BSkyBoxMSummaryRes <- summary(BSkyBoxMRes, quiet=TRUE)\n
BSkyFormat(BSkyBoxMSummaryRes ,outputTableRenames = c("Log of covariance determinants:", "Eigenvalues:", \n\t"Statistics based on eigenvalues:"))\n
{{/if}}
{{/if}}
{{if (options.selected.Fixed =="")}}
BSkyFormat(data.frame(Message = "Box's M cannot be run as a between subjects factor is not specified"))
{{/if}}
{{if (options.selected.plotMeansCI == "TRUE")}}
#Plot of means and confidence intervals
afex_plot({{selected.modelname | safe}}, x = "{{selected.response | safe}}", {{if (options.selected.Fixed !="")}}\n\ttrace = "{{selected.Fixed | safe}}", {{/if}}error = "within", 
    error_ci = TRUE, error_level = 0.95,
    data_plot = TRUE, legend_title = "Plot of means")\n
{{/if}}
{{if (options.selected.chk5=="TRUE" || options.selected.chk3=="TRUE")}}
#Estimated marginal means
#Within subjects
BSkyEmmWithinSubj <- {{selected.modelname | safe}} %>% \n\t emmeans::emmeans(~{{selected.response | safe}})
BSkyFormat(data.frame(BSkyEmmWithinSubj), \n\tsingleTableOutputHeader ="Estimated marginal means for within subjects factor: {{selected.response | safe}}, CI=0.95")
{{if (options.selected.Fixed !="")}}
#Between subjects
BSkyEmmBetweenSubj <- {{selected.modelname | safe}} %>% \n\t emmeans::emmeans(~{{selected.Fixed | safe}})
BSkyFormat(data.frame(BSkyEmmBetweenSubj), \n\tsingleTableOutputHeader ="Estimated marginal means for between subjects factor: {{selected.Fixed | safe}}, CI=0.95")
#With interactions
BSkyEmmWithInteractions <- {{selected.modelname | safe}} %>% \n\temmeans::emmeans(~{{selected.Fixed | safe}}:{{selected.response | safe}})
BSkyFormat(data.frame(BSkyEmmWithInteractions), \n\tsingleTableOutputHeader ="Estimated marginal means with Interactions: {{selected.Fixed | safe}}:{{selected.response | safe}}, CI=0.95")\n
{{/if}}
{{/if}}
{{if (options.selected.chk3=="TRUE")}}
#Posthocs
#Posthoc for within subject factor
resContrastsWithinSubj <- emmeans::contrast(BSkyEmmWithinSubj, \n\tmethod = "{{selected.combon | safe}}", adjust = "{{selected.adjust | safe}}")
resSummaryContWithinSubj <- summary(resContrastsWithinSubj)
cat("\\n\\n\\n")
cat(attributes(resSummaryContWithinSubj)$mesg,sep = "\\n")
BSkyFormat(data.frame(resSummaryContWithinSubj), \n\tsingleTableOutputHeader = "Post-hoc tests for: {{selected.dependentVariable | safe}} as a function of: {{selected.response | safe}} (using method = {{selected.combon | safe}})")
{{if (options.selected.Fixed !="")}}
#Posthoc for between subject factor
resContrastsBetweenSubj <- emmeans::contrast(BSkyEmmBetweenSubj, \n\tmethod = "{{selected.combon | safe}}",adjust = "{{selected.adjust | safe}}")
resSummaryContBetweenSubj <- summary(resContrastsBetweenSubj)
cat("\\n\\n\\n")
cat(attributes(resSummaryContBetweenSubj)$mesg,sep = "\\n")
BSkyFormat(data.frame(resSummaryContBetweenSubj),\n\tsingleTableOutputHeader = "Post-hoc tests for: {{selected.dependentVariable | safe}} as a function of: {{selected.Fixed | safe}} (using method = {{selected.combon | safe}})")\n
{{/if}}
{{/if}}
{{if (options.selected.simpleEffectsTest=="TRUE" && options.selected.Fixed != "")}}
#Simple effects test = Posthocs with interaction
resContWithInteractions <- emmeans::contrast(BSkyEmmWithInteractions,\n\tmethod = "{{selected.combon | safe}}",\n\tadjust = "{{selected.adjust | safe}}")
resSummaryContWithInteractions <- summary(resContWithInteractions)
cat("\\n\\n\\n")
cat(attributes(resSummaryContWithInteractions)$mesg,sep = "\\n")
BSkyFormat(data.frame(resSummaryContWithInteractions), \n\tsingleTableOutputHeader = "Simple effects test: {{selected.dependentVariable | safe}} for {{selected.response | safe}} by {{selected.Fixed | safe}} (using method = {{selected.combon | safe}})")\n
{{/if}}
{{if (options.selected.simpleEffectsTest=="TRUE" && options.selected.Fixed == "")}}
BSkyFormat(data.frame(Message = "Simple effects tests cannot be run as a between subjects factor is not specified"))
{{/if}}
{{if (options.selected.brownForsythe=="TRUE" && options.selected.Fixed != "")}}
# Brown-Forsythe test on between subject factor 
BSkyBrFoFactor <- leveneTest({{selected.dependentVariable | safe}} ~ {{selected.Fixed | safe}}, \n\tdata={{dataset.name}}, center=median)
BSkyFormat(as.data.frame(BSkyBrFoFactor),\n\tsingleTableOutputHeader = "Brown-Forsythe test, with between subject factor: {{selected.Fixed | safe}}, group = {{selected.Fixed | safe}} ")
# Brown-Forsythe test on between subject * within subject factor
BSkyBrFoFactor <- leveneTest({{selected.dependentVariable | safe}} ~ {{selected.response | safe}}*{{selected.Fixed | safe}}, \n\tdata={{dataset.name}}, center=median)
BSkyFormat(as.data.frame(BSkyBrFoFactor),\n\tsingleTableOutputHeader = "Brown-Forsythe test of: {{selected.response | safe}} by: {{selected.Fixed | safe}}, group = {{selected.response | safe}}")\n
{{/if}}
{{if (options.selected.brownForsythe =="TRUE" && options.selected.Fixed == "")}}
BSkyFormat(data.frame(Message = "Brown-Forsythe test cannot be run as a between subjects factor is not specified"))
{{/if}}
{{if (options.selected.levenesTest=="TRUE" && options.selected.Fixed != "")}}
#Levene's test on between subject factor 
BSkyLevenesFactor <- leveneTest({{selected.dependentVariable | safe}} ~ {{selected.Fixed | safe }},\n\tdata={{dataset.name}}, center=mean)
BSkyFormat(as.data.frame(BSkyLevenesFactor), \n\tsingleTableOutputHeader = "Levene's test for homogenity of variances center = mean, group = {{selected.Fixed | safe}}")
#Levene's test on between subject * within subject factor
BSkyLevenesFactor <- leveneTest({{selected.dependentVariable | safe}} ~ {{selected.response | safe}}*{{selected.Fixed | safe}},\n\tdata={{dataset.name}}, center=mean)
BSkyFormat(as.data.frame(BSkyLevenesFactor), \n\tsingleTableOutputHeader = "Levene's test for homogenity of variances center = mean, group = {{selected.response | safe}}")
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
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            modelname: {
                el: new input(config, {
                    no: 'modelname',
                    label: repeatedMeasuresAnovaL.t('modelname'),
                    placeholder: "",
                    required: true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "RepMeasuresAnova",
                    overwrite: "dataset"
                })
            },
            dependentVariable: {
                el: new dstVariable(config, {
                    label: repeatedMeasuresAnovaL.t('dependentVariable'),
                    no: "dependentVariable",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            subjectID: {
                el: new dstVariable(config, {
                    label: repeatedMeasuresAnovaL.t('subjectID'),
                    no: "subjectID",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            response: {
                el: new dstVariable(config, {
                    label: repeatedMeasuresAnovaL.t('response'),
                    no: "response",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            Fixed: {
                el: new dstVariable(config, {
                    label: repeatedMeasuresAnovaL.t('Fixed'),
                    no: "Fixed",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            covariates: {
                el: new dstVariableList(config, {
                    label: repeatedMeasuresAnovaL.t('covariates'),
                    no: "covariates",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            plotMeansCI: { el: new checkbox(config, { label: repeatedMeasuresAnovaL.t('plotMeansCI'), newline: true, checked: true, no: "plotMeansCI", extraction: "Boolean" }) },
            Summary: { el: new checkbox(config, { label: repeatedMeasuresAnovaL.t('Summary'), newline: true, checked: true, no: "chk5", style: "mb-2", extraction: "Boolean" }) },
            Scatter_plot: { el: new checkbox(config, { label: repeatedMeasuresAnovaL.t('Scatter_plot'), newline: true, no: "chk3", extraction: "Boolean" }) },
            brownForsythe: { el: new checkbox(config, { label: repeatedMeasuresAnovaL.t('brownForsythe'), no: "brownForsythe", newline: true, extraction: "Boolean" }) },
            levenesTest: { el: new checkbox(config, { label: repeatedMeasuresAnovaL.t('levenesTest'), no: "levenesTest", newline: true, extraction: "Boolean" }) },
            simpleEffectsTest: { el: new checkbox(config, { label: repeatedMeasuresAnovaL.t('simpleEffectsTest'), no: "simpleEffectsTest", newline: true, extraction: "Boolean" }) },
            displayBoxMDetails: { el: new checkbox(config, { label: repeatedMeasuresAnovaL.t('displayBoxMDetails'), no: "displayBoxMDetails", newline: true, extraction: "Boolean" }) },
            label2: { el: new labelVar(config, { label: repeatedMeasuresAnovaL.t('label2'), h: 6 }) },
            helpText: { el: new labelVar(config, { label: repeatedMeasuresAnovaL.t('helpText'), h: 6 }) },
            combon: {
                el: new comboBox(config, {
                    no: 'combon',
                    label: repeatedMeasuresAnovaL.t('combon'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["pairwise", "revpairwise", "poly", "trt.vs.ctrl1", "trt.vs.ctrlk", "eff", "def", "consec", "mean_chg"],
                    default: "pairwise"
                })
            },
            adjust: {
                el: new comboBox(config, {
                    no: 'adjust',
                    label: repeatedMeasuresAnovaL.t('adjust'),
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
                /*name: repeatedMeasuresAnovaL.t('options'),*/
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
            head: [objects.helpText.el.content,],
            left: [objects.content_var.el.content],
            right: [objects.modelname.el.content, objects.dependentVariable.el.content, objects.subjectID.el.content, objects.response.el.content, objects.Fixed.el.content, objects.covariates.el.content,],
            bottom: [opts.el.content],
            nav: {
                name: repeatedMeasuresAnovaL.t('navigation'),
                icon: "icon-repeated_measures-long",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: repeatedMeasuresAnovaL.t('help.title'),
            r_help: repeatedMeasuresAnovaL.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: repeatedMeasuresAnovaL.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new repeatedMeasuresAnovaL().render()
}
