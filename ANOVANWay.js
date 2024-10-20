
class ANOVANWay extends baseModal {
    static dialogId = 'ANOVANWay'
    static t = baseModal.makeT(ANOVANWay.dialogId)

    constructor() {
        var config = {
            id: ANOVANWay.dialogId,
            label: ANOVANWay.t('title'),
            modalType: "two",
            RCode: `
        `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "copy", scroll:true }) },
            modelname: {
                el: new input(config, {
                    no: 'modelname',
                    label: ANOVANWay.t('modelname'),
                    placeholder: "",
                    required: true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "NWayAnova",
                    overwrite: "dataset"
                })
            },
            target: {
                el: new dstVariable(config, {
                    label: ANOVANWay.t('target'),
                    no: "target",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            formulaBuilder: {
                el: new formulaBuilder(config, {
                    no: "formula",
                    default: "plus",
                    required:true
                })
            },
            label4: { el: new labelVar(config, { label: ANOVANWay.t('label4'), h: 5 , style: "mt-2"}) },
            horizontalAxis: {
                el: new dstVariable(config, {
                    label: ANOVANWay.t('horizontalAxis'),
                    no: "horizontalAxis",
                    filter: "Numeric|Scale|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ horizontalAxis | safe}}']
            },
            separateLines: {
                el: new dstVariable(config, {
                    label: ANOVANWay.t('separateLines'),
                    no: "separateLines",
                    filter: "Numeric|Scale|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ separateLines | safe}}']
            },
            separatePlots: {
                el: new dstVariable(config, {
                    label: ANOVANWay.t('separatePlots'),
                    no: "separatePlots",
                    filter: "Numeric|Scale|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ separatePlots | safe}}']
            },
            type: {
                el: new comboBox(config, {
                    no: 'type',
                    label: ANOVANWay.t('type'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["III", "II", "I"],
                    default: "III"
                })
            },
            levene: {
                el: new checkbox(config, {
                    label: ANOVANWay.t('levene'),
                    no: "levene",
                    bs_type: "valuebox",
                    newline: true,
                    extraction: "TextAsIs",
                    style: "mb-3",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label1: { el: new labelVar(config, { label: ANOVANWay.t('label1'), h: 5 }) },
            combon: {
                el: new comboBox(config, {
                    no: 'combon',
                    label: ANOVANWay.t('combon'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["pairwise", "revpairwise", "poly", "trt.vs.ctrl1", "trt.vs.ctrlk", "eff", "def", "consec", "mean_chg"],
                    default: "pairwise"
                })
            },
            adjust: {
                el: new comboBox(config, {
                    no: 'adjust',
                    label: ANOVANWay.t('adjust'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["holm", "BY", "bonferroni", "fdr", "hochberg", "BH", "hommel", "none", "mvt", "scheffe", "sidak", "tukey"],
                    default: "holm"
                })
            },
            compactly: {
                el: new checkbox(config, {
                    label: ANOVANWay.t('compactly'),
                    no: "compactly",
                    bs_type: "valuebox",
                    newline: true,
                    extraction: "TextAsIs",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: ANOVANWay.t('alpha'),
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: 0.05,
                    style: "ml-1",
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { label: ANOVANWay.t('label2'), h: 6 }) },
            diag: {
                el: new checkbox(config, {
                    label: ANOVANWay.t('diag'),
                    no: "diag",
                    newline: true,
                    bs_type: "valuebox",
                    extraction: "TextAsIs",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            plot1: {
                el: new checkbox(config, {
                    label: ANOVANWay.t('plot1'),
                    no: "plot1",
                    bs_type: "valuebox",
                    newline: true,
                    extraction: "TextAsIs",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label3: { el: new labelVar(config, { no: 'label3', label: ANOVANWay.t('label3'), style: "mt-0", h: 5 }) },
            confInterval: {
                el: new advancedSlider(config, {
                    no: "confInterval",
                    label: ANOVANWay.t('confInterval'),
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: 0.95,
                    style: "ml-1",
                    extraction: "NoPrefix|UseComma"
                })
            },
            effectsizes: {
                el: new comboBox(config, {
                    no: 'effectsizes',
                    label: ANOVANWay.t('effectsizes'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["eta_squared", "partial_eta_squared", "omega_squared", "epsilon_squared", "cohens_f"],
                    default: "partial_eta_squared"
                })
            },
            labelSaveResiduals: { el: new labelVar(config, { no: 'labelSaveResiduals', style: "mt-3",label: ANOVANWay.t('labelSaveResiduals'), h: 5 }) },

            residuals: {
                el: new checkbox(config, {
                label: ANOVANWay.t('residuals'),
                no: "residuals",
                extraction: "Boolean"
                })
            },
            
            
            stuResiduals: {
                el: new checkbox(config, {
                label: ANOVANWay.t('stuResiduals'),
                no: "stuResiduals",
                extraction: "Boolean"
                })
            },
            
            fittedVals: {
                el: new checkbox(config, {
                label: ANOVANWay.t('fittedVals'),
                no: "fittedVals",
                extraction: "Boolean"
                })
            },

            prefixForSavedStatistics: {
                            el: new input(config, {
                                no: 'prefixForSavedStatistics',
                                label: ANOVANWay.t('prefixForSavedStatistics'),
                                placeholder: "",
                                type: "character",
                                enforceRobjectRules:false,
                                extraction: "TextAsIs",
                                value: "",
                                allowSpacesNew: false,
                                })
                        },   

        };
        var opts = {
            el: new optionsVar(config, {
                no: "Heatmap_options",
                name: ANOVANWay.t('options'),
                content: [
                    objects.type.el,
                    objects.levene.el,
                    objects.label1.el,
                    objects.combon.el,
                    objects.adjust.el,
                    objects.compactly.el,
                    objects.alpha.el,
                    objects.diag.el,
                    objects.plot1.el,
                    objects.label3.el,
                    objects.confInterval.el,
                    objects.effectsizes.el,
                    objects.labelSaveResiduals.el,
                    objects.residuals.el,
                    objects.stuResiduals.el,
                    objects.fittedVals.el,
					objects.prefixForSavedStatistics.el
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.modelname.el.content,objects.target.el.content, objects.formulaBuilder.el.content, objects.label4.el.content, objects.horizontalAxis.el.content, objects.separateLines.el.content, objects.separatePlots.el.content],
            bottom: [opts.el.content],
            nav: {
                name: ANOVANWay.t('navigation'),
                icon: "icon-variance",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ANOVANWay.t('help.title'),
            r_help: "help(data,package='utils')",
            body: ANOVANWay.t('help.body')
        }
;
        this.opts = opts;
    }
    prepareExecution(instance) {
        let cmd = {};
        var res = [];
        var temp = "";
        let snippet1 = {
            RCode: `
require(emmeans);
require(car);
require(dplyr);
require(ggplot2);
require(multcomp);
require(effectsize);
#Generating summaries
#temp <-{{dataset.name }} %>%\n\t group_by({{selected.dest | safe}}) %>%
#summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
#names(temp)[1] ="{{selected.dest | safe}}"
#BSkyFormat( as.data.frame(temp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variable {{selected.dest | safe}} ")
#Setting contrasts
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum
#Creating the model
BSkyFormula = {{selected.target | safe}}~{{selected.formula | safe}}
BSky{{select.modelname | safe}} =as.data.frame(summary({{selected.modelname | safe}} <-aov({{selected.target | safe}}~{{selected.formula | safe}},data ={{dataset.name }}))[[1]])
{{if (options.selected.diag =="TRUE") }}#Displaying diagnostic plots\nplot({{selected.modelname | safe}}, main = "Diagnostic Plots")\n{{/if}}
#Creating the ANOVA table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova({{selected.modelname | safe}},type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "ANOVA table with type III sum of squares for {{selected.target | safe}} by {{selected.dest | safe}}")
`};
        let snippet2 = {
            RCode: `
require(emmeans);
require(car);
require(dplyr);
require(ggplot2);
require(multcomp);
require(effectsize);
#Generating summaries
BSkyTemp <-{{dataset.name }} %>%\n\t group_by({{selected.dest | safe}}) %>%\n\t
    summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(BSkyTemp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(BSkyTemp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variable {{selected.dest | safe}} ")
#Setting contrasts
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum
#Creating the model

BSkyMultiAnova =as.data.frame(summary({{selected.modelname | safe}} <-aov({{selected.target | safe}}~{{selected.dest | safe}},data ={{dataset.name }}))[[1]])
{{if (options.selected.diag =="TRUE") }}#Displaying diagnostic plots\nplot({{selected.modelname | safe}}, main ="Diagnostic Plots"){{/if}}
#Creating the ANOVA table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova({{selected.modelname | safe}},type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "ANOVA table with type {{selected.type | safe}} sum of squares for {{selected.target | safe}} by {{selected.dest | safe}}")
#Displaying estimated marginal means
resultsEmmeans = list()
resultsEmmeans<-emmeans::emmeans({{selected.modelname | safe}},~{{selected.dest | safe}})
BSkyFormat( data.frame(resultsEmmeans),singleTableOutputHeader ="Estimated Marginal Means for {{selected.target | safe}} by {{selected.dest | safe}}, CI=0.95")
{{if (options.selected.levene == "TRUE") }}
#Levene's Test
BSky_Levene_Test <-with({{dataset.name}},car::leveneTest({{selected.target | safe}},{{selected.dest | safe}}))
BSkyFormat(as.data.frame(BSky_Levene_Test),singleTableOutputHeader = "Levene's test for homogenity of variances (center=mean) for {{selected.target | safe}} against {{selected.dest | safe}}"){{/if}}
\n#Post-hoc tests
resContrasts <-emmeans::contrast(resultsEmmeans,method = "{{selected.combon | safe}}",adjust = "{{selected.adjust | safe}}")
resSummary <-summary(resContrasts)
cat("\\n\\n\\n")
cat(attributes(resSummary)$mesg,sep = "\\n")
BSkyFormat(data.frame(resContrasts),singleTableOutputHeader = "Post-hoc tests for {{selected.target | safe}} by {{selected.dest | safe}} (using method = {{selected.combon | safe}})")
{{if (options.selected.compactly == "TRUE") }}
#Compare means compactly
resultsContrasts = list()
resultsContrasts <-multcomp::cld(resultsEmmeans,level = {{selected.alpha | safe}})
BSkyFormat( data.frame(resultsContrasts),singleTableOutputHeader = "Comparing means compactly for {{selected.target | safe}} by {{selected.dest | safe}} using {{selected.combon | safe}} comparison (p values adjusted using {{selected.adjust | safe}})"){{/if}}
{{if (options.selected.plot1 == "TRUE") }}
#Plot all comparisons
print(plot( contrast(resultsEmmeans,method = "{{selected.combon | safe}}", adjust = "{{selected.adjust | safe}}")) + geom_vline(xintercept = 0) + ggtitle ("Plotting all comparisons pairwise for {{selected.target | safe}} by {{selected.dest | safe}}")){{/if}}
`};
        let snippet3 = "require(emmeans);\nrequire(car);\nrequire(dplyr);\nrequire(ggplot2);\nrequire(multcomp);\nrequire(effectsize);";
        let snippet4 = {
            RCode: `
BSkyTemp <-{{dataset.name }} %>%\n\tgroup_by({{selected.dest | safe}}) %>%\n\t
    summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(BSkyTemp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(BSkyTemp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variable {{selected.dest | safe}} ")
`};
        let snippet5 = {
            RCode: `
BSkyTemp <-{{dataset.name }} %>%\n\t group_by({{selected.commaSepDest | safe}}) %>%\n\t
    summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(BSkyTemp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(BSkyTemp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variables {{selected.commaSepDest | safe}}")
`};
        let snippet6 = {
            RCode: `
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum`};
        let snippet7 = {
            RCode: `
BSkyFormula ={{selected.target | safe}} ~ {{selected.dependentVars | safe}}
\nBSkyMultiAnova =as.data.frame(summary({{selected.modelname | safe}} <- aov({{selected.target | safe}} ~ {{selected.dependentVars | safe}}, data ={{dataset.name }}))[[1]])
#Creating the Anova table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova({{selected.modelname | safe}},type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "ANOVA table with type {{selected.type | safe}} sum of squares for {{selected.target | safe}} by {{selected.dependentVars | safe}}")

{{if (options.selected.residuals)}}
#Saving residuals to the dataset
varsToCheckForNAs =base::all.vars(BSkyFormula[-2])
varsToCheckForNAs =c("{{selected.target | safe}}",varsToCheckForNAs )
{{dataset.name}}\${{selected.prefixForSavedStatistics | safe}}residuals[stats::complete.cases({{dataset.name}} %>% dplyr::select(tidyselect::one_of(varsToCheckForNAs)))] <- base::round(stats::residuals({{selected.modelname | safe}}), digits =BSkyGetDecimalDigitSetting())
{{/if}}
{{if (options.selected.stuResiduals)}}
#Saving standardized residuals to the dataset
varsToCheckForNAs =base::all.vars(BSkyFormula[-2])
varsToCheckForNAs =c("{{selected.target | safe}}",varsToCheckForNAs )
{{dataset.name}}\${{selected.prefixForSavedStatistics | safe}}resStudentized[stats::complete.cases({{dataset.name}} %>% dplyr::select(tidyselect::one_of(varsToCheckForNAs)))] <- base::round(stats::rstudent({{selected.modelname | safe}}), digits =BSkyGetDecimalDigitSetting())
{{/if}}
{{if (options.selected.fittedVals)}}
#Saving fitted values to the dataset
{{dataset.name}}\${{selected.prefixForSavedStatistics | safe}}fitted[stats::complete.cases({{dataset.name}} %>%  dplyr::select(tidyselect::one_of(varsToCheckForNAs)))] <- base::round(stats::fitted({{selected.modelname | safe}}), digits =BSkyGetDecimalDigitSetting())
{{/if}}
{{if (options.selected.residuals || options.selected.stuResiduals || options.selected.fittedVals)}}
#Refreshing the dataset to display saved values in the data grid
BSkyLoadRefresh("{{dataset.name}}")
{{/if}}

`};

        //Generating estimated marginal means
        let snippet8 = {
            RCode: `
resEmmeans[[{{selected.counter |safe}}]]<-emmeans::emmeans({{selected.modelname | safe}},~{{selected.dest | safe}})
BSkyFormat( data.frame(resEmmeans[[{{selected.counter | safe}}]]), singleTableOutputHeader = "Estimated Marginal Means for {{selected.target | safe}} by {{selected.dest | safe}}")`};
        let snippet9 = {
            RCode: `
{{if (options.selected.levene == "TRUE") }}
BSky_Levene_Test <- with({{dataset.name}}, car::leveneTest({{selected.target | safe}}, {{selected.dest | safe}}))
BSkyFormat(as.data.frame(BSky_Levene_Test),singleTableOutputHeader = "Levene's test for homogenity of variances (center=mean) for {{selected.target | safe}} against {{selected.dest | safe}}"){{/if}}`};
        //Post Hoc tests
        let snippet10 = {
            RCode: `
resContrasts[[{{selected.counter |safe}}]] <- emmeans::contrast(resEmmeans[[{{selected.counter |safe}}]],method = "{{selected.combon | safe}}",adjust = "{{selected.adjust | safe}}")
resSummary <- summary(resContrasts[[{{selected.counter |safe}}]])
cat("\\n\\n\\n")
cat(attributes(resSummary)$mesg,sep = "\\n")
BSkyFormat(data.frame(resContrasts[[{{selected.counter |safe}}]]),singleTableOutputHeader = "Post-hoc tests for {{selected.target | safe}} by {{selected.dest | safe}} (using method = {{selected.combon | safe}})")`};
        //Compare means compactly
        let snippet11 = {
            RCode: `
resultsContrasts[[{{selected.counter | safe}}]] <-multcomp::cld(resEmmeans[[{{selected.counter | safe}}]],level ={{selected.alpha | safe}})
BSkyFormat( data.frame(resultsContrasts[[{{selected.counter | safe}}]]),singleTableOutputHeader = "Comparing means compactly for {{selected.target | safe}} by {{selected.dest | safe}} using {{selected.combon | safe}} comparison (p values adjusted using {{selected.adjust | safe}})")`};
        //Plot all comparisons
        let snippet12 = {
            RCode: `
{{if (options.selected.plot1 == "TRUE") }}
print(plot( contrast(resEmmeans[[{{selected.counter |safe}}]],method = "{{selected.combon | safe}}", adjust = "{{selected.adjust | safe}}")) + geom_vline(xintercept = 0) + ggtitle ("Plotting all comparisons pairwise for {{selected.target | safe}} by {{selected.dest | safe}}")){{/if}}`};
        //Interactin plots
        let snippet13 = {
            RCode: `
{{if (options.selected.plot2 == "TRUE") }}
BSkyFormat("Interaction plot with Confidence Intervals")
print(emmeans::emmmip({{selected.modelname | safe}}, {{selected.stringInteractionPlots | safe}}  ,CIs=TRUE)){{/if}}`};
        let snippet14 = {
            RCode: `
{{if (options.selected.diag =="TRUE") }}#Displaying diagnostic plots\nplot({{selected.modelname | safe}}, main = "Diagnostic Plots")\n{{/if}}
{{if (options.selected.effectsizes == "eta_squared") }}BSkyEffectSizeResults <- eta_squared({{selected.modelname | safe}}, partial = FALSE, ci={{selected.confInterval | safe}}){{/if}}
{{if (options.selected.effectsizes == "partial_eta_squared") }}BSkyEffectSizeResults <- eta_squared({{selected.modelname | safe}}, partial = TRUE, ci={{selected.confInterval | safe}}){{/if}}
{{if (options.selected.effectsizes == "omega_squared") }}BSkyEffectSizeResults <- omega_squared({{selected.modelname | safe}}, ci={{selected.confInterval | safe}} ){{/if}}
{{if (options.selected.effectsizes == "epsilon_squared") }}BSkyEffectSizeResults <- epsilon_squared({{selected.modelname | safe}}, ci={{selected.confInterval | safe}}){{/if}}
{{if (options.selected.effectsizes == "cohens_f") }}BSkyEffectSizeResults <- cohens_f({{selected.modelname | safe}}, ci={{selected.confInterval | safe}}){{/if}}
\nBSkyFormat( as.data.frame(BSkyEffectSizeResults), singleTableOutputHeader= "Effect Size for ANOVA (Type {{selected.type | safe}}): {{selected.effectsizes | safe}}, CI={{selected.confInterval | safe}}")
#Removing temporary objects
if (exists("BSkyFormula")) rm (BSkyFormula)
if (exists("BSkyMultiAnova")) rm (BSkyMultiAnova)
if (exists("anovaTable")) rm (anovaTable)
if (exists("resultsEmmeans")) rm (resultsEmmeans)
if (exists("BSky_Levene_Test")) rm (BSky_Levene_Test)
if (exists("resContrasts")) rm (resContrasts)
if (exists("resSummary")) rm (resSummary)
if (exists("resultsContrasts")) rm (resultsContrasts)
if (exists("BSkyTemp")) rm (BSkyTemp)
if (exists("BSkyEffectSizeResults")) rm (BSkyEffectSizeResults)
if (exists("resEmmeans")) rm (resEmmeans)
if (exists("BSkyEffectSizeResults")) rm (BSkyEffectSizeResults)


`
        };
        let snippet15 = {
            RCode: `
    #emmip({{selected.modelname | safe}}, {{selected.horizontalAxis | safe}} ~ {{selected.separateLines | safe}} | {{selected.separatePlots | safe}})
    emmeans::lsmip({{selected.modelname | safe}}, {{selected.horizontalAxis | safe}} ~ {{selected.separateLines | safe}} | {{selected.separatePlots | safe}},\n\tCIs = TRUE, ylab = "{{selected.target | safe}}")
`
        };
        let snippet16 = {
            RCode: `
    #emmip({{selected.modelname | safe}}, {{selected.horizontalAxis | safe}} ~ {{selected.separateLines | safe}} )
    emmeans::lsmip({{selected.modelname | safe}}, {{selected.horizontalAxis | safe}} ~ {{selected.separateLines | safe}}, \n\tCIs = TRUE, ylab = "{{selected.target | safe}}")
`
        };
        let snippet17 = {
            RCode: `
    #emmip({{selected.modelname | safe}}, ~ {{selected.horizontalAxis | safe}} ! {{selected.separatePlots | safe}} )
    emmeans::lsmip({{selected.modelname | safe}}, ~ {{selected.horizontalAxis | safe}} | {{selected.separatePlots | safe}}, \n\tCIs = TRUE, ylab = "{{selected.target | safe}}")
`
        };
        // Simple effects tests
        let newsnippet101 = {
            RCode: `
    #Simple effects test and descriptives
    #Holding the 2nd and 3rd factor variables constant
    simpleEffectsRes <- emmeans(aov({{selected.modelname | safe}}), pairwise ~ {{selected.firstFactor}} | {{selected.secondFactor}} * {{selected.thirdFactor}} )
    simpleEffectsDes <- data.frame(simpleEffectsRes$emmeans)
    base::row.names(simpleEffectsDes) <- NULL
    BSkyFormat(simpleEffectsDes, singleTableOutputHeader = 'Descriptive Statistics for Simple Effects Tests -{{selected.firstFactor}}:{{selected.secondFactor}}:{{selected.thirdFactor}}')
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.firstFactor}} holding {{selected.secondFactor}} and {{selected.thirdFactor}} constant')
    #Simple effects test holding the 2nd and 3rd factor variables constant
    simpleEffectsRes <- emmeans(aov({{selected.modelname | safe}}), pairwise ~ {{selected.secondFactor}} | {{selected.firstFactor}} * {{selected.thirdFactor}} )
    #simpleEffectsDes <- as.data.frame(simpleEffectsRes$emmeans)
    #base::row.names(simpleEffectsDes) <- NULL
    #BSkyFormat(simpleEffectsDes, singleTableOutputHeader = 'Descriptive Statistics for Simple Effects Tests')
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.secondFactor}} holding {{selected.firstFactor}} and {{selected.thirdFactor}} constant')
    #Simple effects test holding the 2nd and 3rd factor variables constant
    simpleEffectsRes <- emmeans(aov({{selected.modelname | safe}}), pairwise ~ {{selected.thirdFactor}} | {{selected.firstFactor}} * {{selected.secondFactor}} )
    #simpleEffectsDes <- data.frame(simpleEffectsRes$emmeans)
    #base::row.names(simpleEffectsDes) <- NULL
    #BSkyFormat(simpleEffectsDes, singleTableOutputHeader = 'Descriptive Statistics for Simple Effects Tests')
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.thirdFactor}} holding {{selected.firstFactor}} and {{selected.secondFactor}} constant')
`};
        // Simple effects tests
        let newsnippet1012 = {
            RCode: `
    #Simple effects test and descriptives
    #Holding the 2st factor variable constant
    simpleEffectsRes <- emmeans(aov({{selected.modelname | safe}}), pairwise ~ {{selected.firstFactor}} | {{selected.secondFactor}} )
    simpleEffectsDes <- data.frame(simpleEffectsRes$emmeans)
    base::row.names(simpleEffectsDes) <- NULL
    BSkyFormat(simpleEffectsDes, singleTableOutputHeader = 'Descriptive Statistics for Simple Effects Tests -{{selected.firstFactor}}:{{selected.secondFactor}}')
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.firstFactor}} holding {{selected.secondFactor}} constant')
    #Holding the 1st factor variable constant
    simpleEffectsRes <- emmeans(aov({{selected.modelname | safe}}), pairwise ~ {{selected.secondFactor}} | {{selected.firstFactor}} )
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.secondFactor}} holding {{selected.firstFactor}} constant')
`}
        var code_vars = {
            dataset: {
                name: getActiveDataset()
            },
            selected: {
                target: instance.dialog.prepareSelected({ target: instance.objects.target.el.getVal()[0] }, instance.objects.target.r),
                horizontalAxis: instance.dialog.prepareSelected({ horizontalAxis: instance.objects.horizontalAxis.el.getVal()[0] }, instance.objects.horizontalAxis.r),
                separatePlots: instance.dialog.prepareSelected({ separatePlots: instance.objects.separatePlots.el.getVal()[0] }, instance.objects.separatePlots.r),
                separateLines: instance.dialog.prepareSelected({ separateLines: instance.objects.separateLines.el.getVal()[0] }, instance.objects.separateLines.r),
                levene: instance.objects.levene.el.getVal(),
                type: instance.objects.type.el.getVal(),
                combon: instance.objects.combon.el.getVal(),
                effectsizes: instance.objects.effectsizes.el.getVal(),
                adjust: instance.objects.adjust.el.getVal(),
                alpha: instance.objects.alpha.el.getVal(),
                confInterval: instance.objects.confInterval.el.getVal(),
                compactly: instance.objects.compactly.el.getVal(),
                diag: instance.objects.diag.el.getVal(),
                plot1: instance.objects.plot1.el.getVal(),
                modelname: instance.objects.modelname.el.getVal(),
                residuals: instance.objects.residuals.el.getVal(),
                stuResiduals: instance.objects.stuResiduals.el.getVal(),
                fittedVals: instance.objects.fittedVals.el.getVal(),
                prefixForSavedStatistics: instance.objects.prefixForSavedStatistics.el.getVal(),


            }
        }
        let NWayInteractions = {}
        code_vars.selected.dependentVars = instance.objects.formulaBuilder.el.getVal();
        NWayInteractions = listOfAllNWayInteractions(code_vars.selected.dependentVars);
        temp = temp + snippet3 + "\n";
        temp = temp + "\n#Generating summaries";
        //Setting contrasts
        let results = {}
        //Results holds the fixed effects
        results = getFixedEffectsandCovariates(code_vars.selected.dependentVars)["fixedEffects"]
        let i = 1;
        //Generating summaries
        //Univariate summaries
        for (let dest in results) {
            code_vars.selected.dest = dest
            code_vars.selected.counter = i;
            cmd = instance.dialog.renderSample(snippet4.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd;
            i = i + 1;
        }
        //WE generate multivariate statistics only when there are more than 1 fixed effect/factor
        if (Object.keys(results).length > 1) {
            //Resetting code_vars.selected.dest to the first fixed factor in results, this is for
            //the code in snippet 5 below to run correctly
            i = 1
            for (let dest in results) {
                if (i == 1) {
                    code_vars.selected.dest = dest
                }
                i = i + 1
            }
            i = 1
            for (let interaction in NWayInteractions) {
                code_vars.selected.dest = interaction.substring(0, interaction.indexOf(":"));
                code_vars.selected.commaSepDest = interaction.replaceAll(':', ',');
                cmd = instance.dialog.renderSample(snippet5.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd;
            }
        }
        temp = temp + "\n#Setting contrasts";
        for (let dest in results) {
            code_vars.selected.dest = dest
            cmd = instance.dialog.renderSample(snippet6.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd;
        }
        //Creating the model and optionally plotting diagnostics
        temp = temp + "\n\n#Creating the model";
        cmd = instance.dialog.renderSample(snippet7.RCode, code_vars)
        cmd = removenewline(cmd);
        temp = temp + cmd;
        //Generating estimated marginal means for each group
        i = 1
        temp = temp + "\n\n#Displaying estimated marginal means";
        temp = temp + "\nresEmmeans = list()"
        for (let dest in results) {
            code_vars.selected.dest = dest
            code_vars.selected.counter = i;
            cmd = instance.dialog.renderSample(snippet8.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd;
            i = i + 1;
        }
        for (let interaction in NWayInteractions) {
            code_vars.selected.dest = interaction;
            code_vars.selected.counter = i;
            cmd = instance.dialog.renderSample(snippet8.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd + "\n";
            i = i + 1;
        }
        //post-hoc tests
        i = 1;
        temp = temp + "\n\n#Post-hoc tests";
        temp = temp + "\nresContrasts = list()";
        for (let dest in results) {
            code_vars.selected.dest = dest
            code_vars.selected.counter = i;
            cmd = instance.dialog.renderSample(snippet10.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd;
            i = i + 1;
        }
        /*   for (let interaction in NWayInteractions) {
              code_vars.selected.dest = interaction
              code_vars.selected.counter = i;
              cmd = instance.dialog.renderSample(snippet10.RCode, code_vars)
              cmd = removenewline(cmd);
              temp = temp + cmd + "\n";;
              i = i + 1;
          }
   */
        //Simple effects test
        for (let interaction in NWayInteractions) {
            regexpression = /[:]/
            if (interaction.split(regexpression).length == 2) {
                code_vars.selected.firstFactor = interaction.split(regexpression)[0];
                code_vars.selected.secondFactor = interaction.split(regexpression)[1];
                cmd = instance.dialog.renderSample(newsnippet1012.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";
            }
            if (interaction.split(regexpression).length == 3) {
                code_vars.selected.firstFactor = interaction.split(regexpression)[0];
                code_vars.selected.secondFactor = interaction.split(regexpression)[1];
                code_vars.selected.thirdFactor = interaction.split(regexpression)[2];
                cmd = instance.dialog.renderSample(newsnippet101.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";;
                i = i + 1;
            }
        }
        //Saving this code for later
        /*   if (Object.keys(results).length >=3 ) {
              //Resetting code_vars.selected.dest to the first fixed factor in results, this is for
              //the code in snippet 5 below to run correctly
              i = 0
              let resultsAsArray = Object.values(results);
              let noOfFixedFactors = resultsAsArray.length
              while ( i <= noOfFixedFactors-3)
              {
                  code_vars.selected.firstFactor = resultsAsArray[i];
                  code_vars.selected.secondFactor = resultsAsArray[i+1];
                  code_vars.selected.thirdFactor = resultsAsArray[i+2];
                  cmd = instance.dialog.renderSample(newsnippet101.RCode, code_vars)
                  cmd = removenewline(cmd);
                  temp = temp + cmd + "\n";;
                  i = i + 1;
              }
          } */
        //Levene's test           
        if (code_vars.selected.levene == "TRUE") {
            temp = temp + "\n\n#Levenes test";
            for (let dest in results) {
                code_vars.selected.dest = dest
                cmd = instance.dialog.renderSample(snippet9.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";;
            }
        }
        //Univariate plots
        if (code_vars.selected.horizontalAxis != "" && code_vars.selected.separateLines != "" && code_vars.selected.separatePlots != "") {
            cmd = instance.dialog.renderSample(snippet15.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd + "\n";;
        }
        else if (code_vars.selected.horizontalAxis != "" && code_vars.selected.separateLines != "") {
            cmd = instance.dialog.renderSample(snippet16.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd + "\n";;
        }
        else if (code_vars.selected.horizontalAxis != "" && code_vars.selected.separatePlots != "") {
            cmd = instance.dialog.renderSample(snippet17.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd + "\n";;
        }
        else if (code_vars.selected.horizontalAxis == "" && (code_vars.selected.separatePlots != "" || code_vars.selected.separateLines != "")) {
            temp = temp + "cat(\"ERROR: You need to specify a variable on the horizontal axis for the plot to display\")" + "\n";;
        }
        //Plot all comparisons
        if (code_vars.selected.plot1 == "TRUE") {
            i = 1;
            temp = temp + "\n\n#Plot all comparisons";
            for (let dest in results) {
                code_vars.selected.dest = dest
                code_vars.selected.counter = i;
                cmd = instance.dialog.renderSample(snippet12.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";;
                i = i + 1;
            }
            for (let interaction in NWayInteractions) {
                code_vars.selected.dest = interaction
                code_vars.selected.counter = i;
                cmd = instance.dialog.renderSample(snippet12.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";;
                i = i + 1;
            }
        }
        //Comparing means compactly
        if (code_vars.selected.compactly == "TRUE") {
            i = 1;
            temp = temp + "\n\n#Comparing means compactly";
            temp = temp + "\nresultsContrasts = list()";
            for (let dest in results) {
                code_vars.selected.dest = dest
                code_vars.selected.counter = i;
                cmd = instance.dialog.renderSample(snippet11.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";;
                i = i + 1;
            }
            for (let interaction in NWayInteractions) {
                code_vars.selected.dest = interaction
                code_vars.selected.counter = i;
                cmd = instance.dialog.renderSample(snippet11.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";;
                i = i + 1;
            }
        }
        temp = temp + "\n\n#Effect sizes and diagnostic plots";
        cmd = instance.dialog.renderSample(snippet14.RCode, code_vars)
        cmd = removenewline(cmd);
        temp = temp + cmd + "\n";
        res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
        return res;
    }
}

module.exports = {
    render: () => new ANOVANWay().render()
}
