/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class ANOVAOneWayTwoWay extends baseModal {
    static dialogId = 'ANOVAOneWayTwoWay'
    static t = baseModal.makeT(ANOVAOneWayTwoWay.dialogId)

    constructor() {
        var config = {
            id: ANOVAOneWayTwoWay.dialogId,
            label: ANOVAOneWayTwoWay.t('title'),
            modalType: "two",
            RCode: `
        `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            modelname: {
                el: new input(config, {
                    no: 'modelname',
                    label: ANOVAOneWayTwoWay.t('modelname'),
                    placeholder: "",
                    required: true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "MultiAnova",
                    overwrite: "dataset"
                })
            },
            target: {
                el: new dstVariable(config, {
                    label: ANOVAOneWayTwoWay.t('target'),
                    no: "target",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            dest: {
                el: new dstVariableList(config, {
                    label: ANOVAOneWayTwoWay.t('dest'),
                    no: "dest",
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ dest | safe}}']
            },
            Interaction: {
                el: new checkbox(config, {
                    label: ANOVAOneWayTwoWay.t('Interaction'),
                    no: "Interaction",
                    bs_type: "valuebox",
                    newline: true,
                    extraction: "TextAsIs",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            type: {
                el: new comboBox(config, {
                    no: 'type',
                    label: ANOVAOneWayTwoWay.t('type'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["III", "II", "I"],
                    default: "III"
                })
            },
            levene: {
                el: new checkbox(config, {
                    label: ANOVAOneWayTwoWay.t('levene'),
                    no: "levene",
                    bs_type: "valuebox",
                    newline: true,
                    extraction: "TextAsIs",
                    style: "mb-3",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label1: { el: new labelVar(config, { label: ANOVAOneWayTwoWay.t('label1'), h: 5 }) },
            combon: {
                el: new comboBox(config, {
                    no: 'combon',
                    label: ANOVAOneWayTwoWay.t('combon'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["pairwise", "revpairwise", "poly", "trt.vs.ctrl1", "trt.vs.ctrlk", "eff", "def", "consec", "mean_chg"],
                    default: "pairwise"
                })
            },
            adjust: {
                el: new comboBox(config, {
                    no: 'adjust',
                    label: ANOVAOneWayTwoWay.t('adjust'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["holm", "BY", "bonferroni", "fdr", "hochberg", "BH", "hommel", "none", "mvt", "scheffe", "sidak", "tukey"],
                    default: "holm"
                })
            },
            compactly: {
                el: new checkbox(config, {
                    label: ANOVAOneWayTwoWay.t('compactly'),
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
                    label: ANOVAOneWayTwoWay.t('alpha'),
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: 0.05,
                    style: "ml-1",
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { label: ANOVAOneWayTwoWay.t('label2'), h: 6 }) },
            diag: {
                el: new checkbox(config, {
                    label: ANOVAOneWayTwoWay.t('diag'),
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
                    label: ANOVAOneWayTwoWay.t('plot1'),
                    no: "plot1",
                    bs_type: "valuebox",
                    newline: true,
                    extraction: "TextAsIs",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            plot2: {
                el: new checkbox(config, {
                    label: ANOVAOneWayTwoWay.t('plot2'),
                    no: "plot2",
                    bs_type: "valuebox",
                    extraction: "TextAsIs",
                    newline: true,
                    style: "mb-3",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label3: { el: new labelVar(config, { no: 'label3', label: ANOVAOneWayTwoWay.t('label3'), style: "mt-0", h: 5 }) },
            confInterval: {
                el: new advancedSlider(config, {
                    no: "confInterval",
                    label: ANOVAOneWayTwoWay.t('confInterval'),
                    min: 0,
                    max: 1,
                    step: 0.001,
                    value: 0.95,
                    style: "ml-1",
                    extraction: "NoPrefix|UseComma"
                })
            },
            showEffectSizes: {
                el: new checkbox(config, {
                    label: ANOVAOneWayTwoWay.t('showEffectSizes'),
                    no: "showEffectSizes",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    newline: true,
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            effectsizes: {
                el: new comboBox(config, {
                    no: 'effectsizes',
                    label: ANOVAOneWayTwoWay.t('effectsizes'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["eta_squared", "partial_eta_squared", "omega_squared", "epsilon_squared", "cohens_f"],
                    default: "partial_eta_squared"
                })
            },
            labelSaveResiduals: { el: new labelVar(config, { no: 'labelSaveResiduals', style: "mt-3",label: ANOVAOneWayTwoWay.t('labelSaveResiduals'), h: 5 }) },

residuals: {
    el: new checkbox(config, {
      label: ANOVAOneWayTwoWay.t('residuals'),
      no: "residuals",
      extraction: "Boolean"
    })
  },
  
 
stuResiduals: {
    el: new checkbox(config, {
      label: ANOVAOneWayTwoWay.t('stuResiduals'),
      no: "stuResiduals",
      extraction: "Boolean"
    })
  },
  
fittedVals: {
    el: new checkbox(config, {
      label: ANOVAOneWayTwoWay.t('fittedVals'),
      no: "fittedVals",
      extraction: "Boolean"
    })
  },

  prefixForSavedStatistics: {
    el: new input(config, {
        no: 'prefixForSavedStatistics',
        label: ANOVAOneWayTwoWay.t('prefixForSavedStatistics'),
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
                name: ANOVAOneWayTwoWay.t('options'),
                content: [
                    objects.Interaction.el,
                    objects.type.el,
                    objects.levene.el,
                    objects.label1.el,
                    objects.combon.el,
                    objects.adjust.el,
                    objects.compactly.el,
                    objects.alpha.el,
                    objects.diag.el,
                    objects.plot1.el,
                    objects.plot2.el,
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
            right: [objects.modelname.el.content,objects.target.el.content, objects.dest.el.content],
            bottom: [opts.el.content],
            nav: {
                name: ANOVAOneWayTwoWay.t('navigation'),
                icon: "icon-variance",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ANOVAOneWayTwoWay.t('help.title'),
            r_help: ANOVAOneWayTwoWay.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: ANOVAOneWayTwoWay.t('help.body')
        }
;
        this.opts = opts;
    }
    prepareExecution(instance) {
        let cmd = {};
        var res = [];
        var temp = "";
        let header = ""
        let count_for_title = 0
        let loop_iterator = 0        
        var noFactorvars = instance.objects.dest.el.getVal().length;
        let snippet1 = {
            RCode: `
require(emmeans);
require(car);
require(dplyr);
require(ggplot2);
require(multcomp);
require(effectsize);
require(DBI)
#Generating summaries
BSkyTemp <-{{dataset.name }} %>%\n\t dplyr::group_by({{selected.dest | safe}}) %>%
dplyr::summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(BSkyTemp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(BSkyTemp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variable {{selected.dest | safe}} ")
#Setting contrasts
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum
#Creating the model
BSkyFormula = {{selected.target | safe}}~{{selected.dest | safe}}
\nBSkyMultiAnova =as.data.frame(summary({{selected.modelname | safe}} <-aov({{selected.target | safe}}~{{selected.dest | safe}},data ={{dataset.name }}))[[1]])
#Creating the ANOVA table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova({{selected.modelname | safe}},type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "ANOVA table with type III sum of squares for {{selected.target | safe}} by {{selected.dest | safe}}")
#Displaying estimated marginal means
resultsEmmeans = list()
resultsEmmeans<-emmeans::emmeans({{selected.modelname | safe}},~{{selected.dest | safe}})
BSkyFormat(data.frame(resultsEmmeans),singleTableOutputHeader ="Estimated Marginal Means for {{selected.target | safe}} by {{selected.dest | safe}}")
{{if (options.selected.levene == "TRUE") }}
#Levene's Test
BSky_Levene_Test <-with({{dataset.name}},car::leveneTest({{selected.target | safe}},{{selected.dest | safe}}))
BSkyFormat(as.data.frame(BSky_Levene_Test), singleTableOutputHeader = "Levene's test for homogenity of variances (center=mean) for {{selected.target | safe}} against {{selected.dest | safe}}"){{/if}}
#Post-hoc tests
resContrasts <-emmeans::contrast(resultsEmmeans,method = "{{selected.combon | safe}}",adjust = "{{selected.adjust | safe}}")
resSummary <-summary(resContrasts)
cat("\\n\\n")
cat(attributes(resSummary)$mesg,sep = "\\n")
BSkyFormat(as.data.frame(resContrasts),singleTableOutputHeader = "Post-hoc tests for {{selected.target | safe}} by {{selected.dest | safe}} (using method = {{selected.combon | safe}})")
{{if (options.selected.compactly == "TRUE") }}
#Compare means compactly
resultsContrasts = list()
resultsContrasts <-multcomp::cld(resultsEmmeans,level = {{selected.alpha | safe}})
BSkyFormat( as.data.frame(resultsContrasts),singleTableOutputHeader = "Comparing means compactly for {{selected.target | safe}} by {{selected.dest | safe}} using {{selected.combon | safe}} comparison (p values adjusted using {{selected.adjust | safe}})"){{/if}}
{{if (options.selected.plot1 == "TRUE") }}
#Plot all comparisons
plot( contrast(resultsEmmeans,method = "{{selected.combon | safe}}", adjust = "{{selected.adjust | safe}}")) + geom_vline(xintercept = 0) + ggtitle ("Plotting all comparisons pairwise for {{selected.target | safe}} by {{selected.dest | safe}}"){{/if}}
#Setting attributes to support scoring
attr(.GlobalEnv\${{selected.modelname | safe}},"depvar") = "{{selected.target | safe}}"
attr(.GlobalEnv\${{selected.modelname | safe}},"indepvar") = paste ("'", paste (base::all.vars(BSkyFormula[-2]), collapse="','"), "'", sep="")
attr(.GlobalEnv\${{selected.modelname | safe}},"classDepVar")= class({{dataset.name}}[, c("{{selected.target | safe}}")])
attr(.GlobalEnv\${{selected.modelname | safe}},"depVarSample")= sample({{dataset.name}}[, c("{{selected.target | safe}}")], size = 2, replace = TRUE)
{{if (options.selected.residuals)}}
#Saving residuals to the dataset
{{dataset.name}}\${{selected.prefixForSavedStatistics | safe}}residuals[stats::complete.cases({{dataset.name}} %>% dplyr::select({{selected.target | safe}}, {{selected.dest | safe}}))] <- base::round(stats::residuals({{selected.modelname | safe}}), digits =BSkyGetDecimalDigitSetting())
{{/if}}
{{if (options.selected.stuResiduals)}}
#Saving standardized residuals to the dataset
{{dataset.name}}\${{selected.prefixForSavedStatistics | safe}}resStudentized[stats::complete.cases({{dataset.name}} %>% dplyr::select({{selected.target | safe}}, {{selected.dest | safe}}))] <- base::round(stats::rstudent({{selected.modelname | safe}}), digits =BSkyGetDecimalDigitSetting())
{{/if}}
{{if (options.selected.fittedVals)}}
#Saving fitted values to the dataset
{{dataset.name}}\${{selected.prefixForSavedStatistics | safe}}fitted[stats::complete.cases({{dataset.name}} %>% dplyr::select({{selected.target | safe}}, {{selected.dest | safe}}))] <- base::round(stats::fitted({{selected.modelname | safe}}), digits =BSkyGetDecimalDigitSetting())
{{/if}}
{{if (options.selected.residuals || options.selected.stuResiduals || options.selected.fittedVals)}}
#Refreshing the dataset to display saved values in the data grid
BSkyLoadRefresh("{{dataset.name}}")
{{/if}}
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
BSkyTemp <-{{dataset.name }} %>%\n\t dplyr::group_by({{selected.dest | safe}}) %>%\n\t
    dplyr::summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(BSkyTemp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(BSkyTemp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variable {{selected.dest | safe}} ")
#Setting contrasts
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum
#Creating the model
BSkyFormula = {{selected.target | safe}}~{{selected.dest | safe}}
\nBSkyMultiAnova =as.data.frame(summary({{selected.modelname | safe}} <-aov({{selected.target | safe}}~{{selected.dest | safe}},data ={{dataset.name }}))[[1]])
{{if (options.selected.diag =="TRUE") }}#Displaying diagnostic plots\nplot({{selected.modelname | safe}}){{/if}}
#Creating the Anova table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova({{selected.modelname | safe}}, type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "Anova table with type {{selected.type | safe}} sum of squares for {{selected.target | safe}} by {{selected.dest | safe}}")
#Displaying estimated marginal means
resultsEmmeans = list()
resultsEmmeans<-emmeans::emmeans({{selected.modelname | safe}},~{{selected.dest | safe}})
BSkyFormat(data.frame(resultsEmmeans),singleTableOutputHeader ="Estimated Marginal Means for {{selected.target | safe}} by {{selected.dest | safe}}, CI=0.95")
{{if (options.selected.levene == "TRUE") }}
#Levene's Test
BSky_Levene_Test <-with({{dataset.name}},car::leveneTest({{selected.target | safe}},{{selected.dest | safe}}))
BSkyFormat(as.data.frame(BSky_Levene_Test),singleTableOutputHeader = "Levene's test for homogenity of variances (center=mean) for {{selected.target | safe}} against {{selected.dest | safe}}"){{/if}}
\n#Post-hoc tests
resContrasts <-emmeans::contrast(resultsEmmeans,method = "{{selected.combon | safe}}",adjust = "{{selected.adjust | safe}}")
resSummary <-summary(resContrasts)
cat("\\n\\n\\n")
cat(attributes(resSummary)$mesg,sep = "\\n")
BSkyFormat(as.data.frame(resContrasts),singleTableOutputHeader = "Post-hoc tests for {{selected.target | safe}} by {{selected.dest | safe}} (using method = {{selected.combon | safe}})")
{{if (options.selected.compactly == "TRUE") }}
#Compare means compactly
resultsContrasts = list()
resultsContrasts <-multcomp::cld(resultsEmmeans,level = {{selected.alpha | safe}})
BSkyFormat(data.frame(resultsContrasts),singleTableOutputHeader = "Comparing means compactly for {{selected.target | safe}} by {{selected.dest | safe}} using {{selected.combon | safe}} comparison (p values adjusted using {{selected.adjust | safe}})"){{/if}}
{{if (options.selected.plot1 == "TRUE") }}
#Plot all comparisons
print(plot( contrast(resultsEmmeans,method = "{{selected.combon | safe}}", adjust = "{{selected.adjust | safe}}")) + geom_vline(xintercept = 0) + ggtitle ("Plotting all comparisons pairwise for {{selected.target | safe}} by {{selected.dest | safe}}")){{/if}}
#Setting attributes to support scoring
attr(.GlobalEnv\${{selected.modelname | safe}},"depvar") = "{{selected.target | safe}}"
attr(.GlobalEnv\${{selected.modelname | safe}},"indepvar") = paste ("'", paste (base::all.vars(BSkyFormula[-2]), collapse="','"), "'", sep="")
attr(.GlobalEnv\${{selected.modelname | safe}},"classDepVar")= class({{dataset.name}}[, c("{{selected.depvar | safe}}")])
attr(.GlobalEnv\${{selected.modelname | safe}},"depVarSample")= sample({{dataset.name}}[, c("{{selected.depvar | safe}}")], size = 2, replace = TRUE)
`};
        let snippet3 = "require(emmeans);\nrequire(car);\nrequire(dplyr);\nrequire(ggplot2);\nrequire(multcomp);\nrequire(effectsize);";
        let snippet4 = {
            RCode: `
BSkyTemp <-{{dataset.name }} %>%\n\tgroup_by({{selected.dest | safe}}) %>%\n\t
    dplyr::summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(BSkyTemp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(BSkyTemp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variable {{selected.dest | safe}} ")
`};
        let snippet5 = {
            RCode: `
BSkyTemp <-{{dataset.name }} %>%\n\t dplyr::group_by({{selected.commaSepDest | safe}}) %>%\n\t
    dplyr::summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(BSkyTemp)[1] ="{{selected.dest | safe}}"
BSkyFormat(as.data.frame(BSkyTemp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variables {{selected.commaSepDest | safe}}")
`};
        let snippet6 = {
            RCode: `
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum`};
        let snippet7 = {
            RCode: `
BSkyFormula = {{selected.target | safe}} ~ {{selected.dependentVars | safe}}
\nBSkyMultiAnova =as.data.frame(summary({{selected.modelname | safe}} <- aov({{selected.target | safe}} ~ {{selected.dependentVars | safe}}, data ={{dataset.name }}))[[1]])
#Creating the Anova table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova({{selected.modelname | safe}},type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "Anova table with type {{selected.type | safe}} sum of squares for {{selected.target | safe}} by {{selected.dependentVars | safe}}")
#Setting attributes to support scoring
attr(.GlobalEnv\${{selected.modelname | safe}},"depvar") = "{{selected.target | safe}}"
attr(.GlobalEnv\${{selected.modelname | safe}},"indepvar") = paste ("'", paste (base::all.vars(BSkyFormula[-2]), collapse="','"), "'", sep="")
attr(.GlobalEnv\${{selected.modelname | safe}},"classDepVar")= class({{dataset.name}}[, c("{{selected.target | safe}}")])
attr(.GlobalEnv\${{selected.modelname | safe}},"depVarSample")= sample({{dataset.name}}[, c("{{selected.target | safe}}")], size = 2, replace = TRUE)
if (exists("BSkyFormula")) rm (BSkyFormula)
{{if (options.selected.residuals)}}
#Saving residuals to the dataset
{{dataset.name}}\${{selected.prefixForSavedStatistics | safe}}residuals[stats::complete.cases({{dataset.name}} %>% dplyr::select({{selected.target | safe}}, {{selected.commaSepDest | safe}}))] <- base::round(stats::residuals({{selected.modelname | safe}}), digits =BSkyGetDecimalDigitSetting())
{{/if}}
{{if (options.selected.stuResiduals)}}
#Saving standardized residuals to the dataset
{{dataset.name}}\${{selected.prefixForSavedStatistics | safe}}resStudentized[stats::complete.cases({{dataset.name}} %>% dplyr::select({{selected.target | safe}}, {{selected.commaSepDest | safe}}))] <- base::round(stats::rstudent({{selected.modelname | safe}}), digits = BSkyGetDecimalDigitSetting())
{{/if}}
{{if (options.selected.fittedVals)}}
#Saving fitted values to the dataset
{{dataset.name}}\${{selected.prefixForSavedStatistics | safe}}fitted[stats::complete.cases({{dataset.name}} %>% dplyr::select({{selected.target | safe}}, {{selected.commaSepDest | safe}}))] <- base::round(stats::fitted({{selected.modelname | safe}}), digits =BSkyGetDecimalDigitSetting())
{{/if}}
{{if (options.selected.residuals || options.selected.stuResiduals || options.selected.fittedVals)}}
#Refreshing the dataset to display saved values in the data grid
BSkyLoadRefresh("{{dataset.name}}")
{{/if}}
`};

        //Generating estimated marginal means
        let snippet8 = {
            RCode: `
resEmmeans[[{{selected.counter |safe}}]] <- emmeans::emmeans({{selected.modelname | safe}},~{{selected.dest | safe}})
BSkyFormat(data.frame(resEmmeans[[{{selected.counter | safe}}]]),singleTableOutputHeader ="Estimated Marginal Means for {{selected.target | safe}} by {{selected.dest | safe}}")`};
        //Generating conditional means
        let snippet81 = {
            RCode: `
resEmmeans[[{{selected.counter |safe}}]] <- emmeans::emmeans({{selected.modelname | safe}},~{{selected.dependentVars | safe}})
BSkyFormat(data.frame(resEmmeans[[{{selected.counter | safe}}]]),singleTableOutputHeader ="Estimated Marginal Means for {{selected.target | safe}} by {{selected.dependentVars | safe}}")`};
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
BSkyFormat(data.frame(resContrasts[[{{selected.counter |safe}}]]),singleTableOutputHeader = "Post-hoc tests for {{selected.target | safe}} by {{selected.dest | safe}} (using method = {{selected.combon | safe}})")
`};
        // Simple effects tests
        let snippet101 = {
            RCode: `
resContrasts[[{{selected.counter |safe}}]] <- emmeans::contrast(resEmmeans[[{{selected.counter |safe}}]], method = "{{selected.combon | safe}}", adjust = "{{selected.adjust | safe}}")
resSummary <- summary(resContrasts[[{{selected.counter |safe}}]])
cat("\\n\\n\\n")
cat(attributes(resSummary)$mesg,sep = "\\n")
BSkyFormat(data.frame(resContrasts[[{{selected.counter |safe}}]]), singleTableOutputHeader = "Simple effects test for {{selected.target | safe}} by {{selected.dependentVars | safe}} (using method = {{selected.combon | safe}})")`};
        // Simple effects tests
        let newsnippet101 = {
            RCode: `
    #Simple effects test and descriptives
    #Holding the 2st factor variable constant
    simpleEffectsRes <- emmeans(aov({{selected.modelname | safe}}), pairwise ~ {{selected.firstFactor}} | {{selected.secondFactor}} )
    simpleEffectsDes <- data.frame(simpleEffectsRes$emmeans)
    base::row.names(simpleEffectsDes) <- NULL
    BSkyFormat(simpleEffectsDes, singleTableOutputHeader = 'Descriptive Statistics for Simple Effects Tests')
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.firstFactor}} holding {{selected.secondFactor}} constant')
    #Holding the 1st factor variable constant
    simpleEffectsRes <- emmeans(aov({{selected.modelname | safe}}), pairwise ~ {{selected.secondFactor}} | {{selected.firstFactor}} )
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.secondFactor}} holding {{selected.firstFactor}} constant')
`}
        //Compare means compactly
        let snippet11 = {
            RCode: `
resultsContrasts[[{{selected.counter | safe}}]] <-multcomp::cld(resEmmeans[[{{selected.counter | safe}}]],level ={{selected.alpha | safe}})
BSkyFormat( data.frame(resultsContrasts[[{{selected.counter | safe}}]]),singleTableOutputHeader = "Comparing means compactly for {{selected.target | safe}} by {{selected.dest | safe}} using {{selected.combon | safe}} comparison (p values adjusted using {{selected.adjust | safe}})")`};
        //Compare means compactly with interaction
        let snippet111 = {
            RCode: `
resultsContrasts[[{{selected.counter | safe}}]] <-multcomp::cld(resEmmeans[[{{selected.counter | safe}}]],level ={{selected.alpha | safe}})
BSkyFormat( data.frame(resultsContrasts[[{{selected.counter | safe}}]]),singleTableOutputHeader = "Comparing means compactly for {{selected.target | safe}} by {{selected.dependentVars | safe}} using {{selected.combon | safe}} comparison (p values adjusted using {{selected.adjust | safe}})")`};
        //Plot all comparisons
        let snippet12 = {
            RCode: `
{{if (options.selected.plot1 == "TRUE") }}
print(plot( contrast(resEmmeans[[{{selected.counter |safe}}]],method = "{{selected.combon | safe}}", adjust = "{{selected.adjust | safe}}")) + geom_vline(xintercept = 0) + ggtitle ("Plotting all comparisons pairwise for {{selected.target | safe}} by {{selected.dest | safe}}")){{/if}}`};
        //Interaction plots
        let snippet13 = {
            RCode: `
{{if (options.selected.plot2 == "TRUE") }}
BSkyFormat("Interaction plot with Confidence Intervals")
print(emmeans::lsmip({{selected.modelname | safe}}, {{selected.stringInteractionPlots | safe}}  ,CIs=TRUE)){{/if}}`};
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
if (exists("resEmmeans")) rm (resEmmeans)
`
        };
        var code_vars = {
            dataset: {
                name: getActiveDataset()
            },
            selected: {
                target: instance.dialog.prepareSelected({ target: instance.objects.target.el.getVal()[0] }, instance.objects.target.r),
                levene: instance.objects.levene.el.getVal(),
                type: instance.objects.type.el.getVal(),
                combon: instance.objects.combon.el.getVal(),
                effectsizes: instance.objects.effectsizes.el.getVal(),
                adjust: instance.objects.adjust.el.getVal(),
                alpha: instance.objects.alpha.el.getVal(),
                modelname: instance.objects.modelname.el.getVal(),
                confInterval: instance.objects.confInterval.el.getVal(),
                compactly: instance.objects.compactly.el.getVal(),
                diag: instance.objects.diag.el.getVal(),
                plot2: instance.objects.plot2.el.getVal(),
                plot1: instance.objects.plot1.el.getVal(),
                Interaction: instance.objects.Interaction.el.getVal(),
                residuals: instance.objects.residuals.el.getVal(),
                stuResiduals: instance.objects.stuResiduals.el.getVal(),
                fittedVals: instance.objects.fittedVals.el.getVal(),
                prefixForSavedStatistics: instance.objects.prefixForSavedStatistics.el.getVal(),


                //We may introduce this based on feedback
                // showEffectSizes: instance.objects.showEffectSizes.el.getVal() ? "TRUE" : "FALSE",
            }
        }
        if (noFactorvars == 1) {
            code_vars.selected.dest = instance.dialog.prepareSelected({ dest: instance.objects.dest.el.getVal()[0] }, instance.objects.dest.r);
            cmd = instance.dialog.renderSample(snippet1.RCode, code_vars)
            res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: snippet1.RCode, code_vars: code_vars })
        }
        else {
            code_vars.selected.commaSepDest = instance.objects.dest.el.getVal();
            header = snippet3 + "\n";
            header = header + "\n#Generating summaries";
            //Generating summaries for each factor
            instance.objects.dest.el.getVal().forEach(function (value) {
                code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                cmd = instance.dialog.renderSample(snippet4.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = header + cmd;
                if (count_for_title !=0){
                    res.push({ cmd: temp, cgid: newCommandGroup(), oriR: snippet4.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                }else{
                res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: header+snippet4.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                }
                header = ""
                count_for_title++
            })
            //Generating summaries for the target by both groups
            code_vars.selected.dest = instance.objects.dest.el.getVal()[0]
            cmd = instance.dialog.renderSample(snippet5.RCode, code_vars)
            // cmd = removenewline(cmd);
            // temp = temp + cmd;
            res.push({ cmd: cmd, cgid: newCommandGroup(), oriR: snippet5.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
            let vars = "";
            vars = code_vars.selected.commaSepDest.toString();
            if (code_vars.selected.Interaction == "FALSE") {
                code_vars.selected.dependentVars = vars.replace(",", "*");
            }
            else {
                code_vars.selected.dependentVars = vars.replace(",", "+");
            }
            //Creating a string for interaction plots
            code_vars.selected.stringInteractionPlots = vars.replace(",", "~");
            //Setting contrasts
            header = "\n#Setting contrasts\n#There is no output associated with this code\n";
            instance.objects.dest.el.getVal().forEach(function (value) {
                code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                cmd = instance.dialog.renderSample(snippet6.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = header + cmd;
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header+snippet6.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                temp =""
                header = ""
            })
            //Creating the model and optionally plotting diagnostics
            header =  "\n\n#Creating the model";
            cmd = instance.dialog.renderSample(snippet7.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = header + cmd;
            res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header+snippet7.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })

            //Generating estimated marginal means for each group
            let i = 1;
            header = header + "\n\n#Displaying estimated marginal means";
            header = header + "\nresEmmeans = list()"
            instance.objects.dest.el.getVal().forEach(function (value) {
                code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                code_vars.selected.counter = i;
                cmd = instance.dialog.renderSample(snippet8.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = header + cmd + "\n";
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header + snippet8.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                i = i + 1;
                temp = ""
                header=""
            })
            //Generating conditional means
            temp =""
            header = ""
            if (code_vars.selected.Interaction == "FALSE") {
                header ="\n#Displaying conditional means";
                code_vars.selected.counter = 3;
                cmd = instance.dialog.renderSample(snippet81.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = header + cmd + "\n";
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header + snippet81.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                temp = ""
                header = ""
            }
            //Levene's test
            if (code_vars.selected.levene == "TRUE") {
                header ="\n\n#Levenes test";
                instance.objects.dest.el.getVal().forEach(function (value) {
                    code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                    cmd = instance.dialog.renderSample(snippet9.RCode, code_vars)
                    cmd = removenewline(cmd);
                    temp = header + cmd + "\n";
                    res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header+snippet9.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                    temp = ""
                    header=""
                })
            }
            //post-hoc tests
            i = 1;
            header = "\n\n#Post-hoc tests";
            header = header + "\nresContrasts = list()";
            instance.objects.dest.el.getVal().forEach(function (value) {
                code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                code_vars.selected.counter = i;
                cmd = instance.dialog.renderSample(snippet10.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = header + cmd + "\n";
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header+snippet10.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                temp = ""
                header = ""
                i = i + 1;
            })
            //Generating simple effects
            /* if (code_vars.selected.Interaction == "FALSE") {
                temp = temp + "\n#Simple effects";
                code_vars.selected.counter = 3;
                cmd = instance.dialog.renderSample(snippet101.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";
            } */
            //Generating simple effects
            if (code_vars.selected.Interaction == "FALSE") {
                code_vars.selected.firstFactor = instance.objects.dest.el.getVal()[0];
                code_vars.selected.secondFactor = instance.objects.dest.el.getVal()[1];
                cmd = instance.dialog.renderSample(newsnippet101.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = cmd + "\n";
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: newsnippet101.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                temp = ""
            }
            /*   if (code_vars.selected.Interaction == "FALSE") {
                  temp = temp + "\n#Simple effects";
                  if (code_vars.selected.Interaction == "FALSE") {
                  temp = temp + "\n#Simple effects";
                  code_vars.selected.counter = 3;
                  cmd = instance.dialog.renderSample(snippet101.RCode, code_vars)
                  cmd = removenewline(cmd);
                  temp = temp + cmd + "\n";
              }
                  code_vars.selected.counter = 3;
                  cmd = instance.dialog.renderSample(snippet101.RCode, code_vars)
                  cmd = removenewline(cmd);
                  temp = temp + cmd + "\n";
              } */
            //Comparing means compactly
            if (code_vars.selected.compactly == "TRUE") {
                i = 1;
                header =  "\n\n#Comparing means compactly";
                header = header + "\nresultsContrasts = list()";
                instance.objects.dest.el.getVal().forEach(function (value) {
                    code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                    code_vars.selected.counter = i;
                    cmd = instance.dialog.renderSample(snippet11.RCode, code_vars)
                    cmd = removenewline(cmd);
                    temp = header + cmd + "\n";
                    res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header + snippet11.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                    temp = ""
                    header =""
                    i = i + 1;
                })
                //Comparing means compactly with interaction
                if (code_vars.selected.Interaction == "FALSE") {
                    header = "\n\n#Comparing means compactly with the interaction";
                    code_vars.selected.counter = 3;
                    cmd = instance.dialog.renderSample(snippet111.RCode, code_vars)
                    cmd = removenewline(cmd);
                    temp = header + cmd + "\n";
                    res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header +snippet111.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                    temp = ""
                    header =""
                }
            }
            if (code_vars.selected.plot1 == "TRUE") {
                i = 1;
                header = "\n\n#Plot all comparisons";
                instance.objects.dest.el.getVal().forEach(function (value) {
                    code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                    code_vars.selected.counter = i;
                    cmd = instance.dialog.renderSample(snippet12.RCode, code_vars)
                    cmd = removenewline(cmd);
                    temp = header + cmd + "\n";
                    res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header + snippet12.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                    temp = ""
                    header = ""
                    i = i + 1;
                })
            }
            if (code_vars.selected.plot2 == "TRUE") {
                header = "\n\n#Interaction plots";
                cmd = instance.dialog.renderSample(snippet13.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = header + cmd + "\n";
                res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header + snippet13.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
                temp = ""
                header =""
            }
        }
        //Effect sizes
        header =  "\n\n#Diagnostic plots and Effect sizes";
        cmd = instance.dialog.renderSample(snippet14.RCode, code_vars)
        cmd = removenewline(cmd);
        temp = header + cmd + "\n";
        res.push({ cmd: temp, cgid: newCommandGroup(), oriR: header +snippet14.RCode, code_vars: JSON.parse(JSON.stringify(code_vars)) })
        return res;
    }
}

module.exports = {
    render: () => new ANOVAOneWayTwoWay().render()
}
