var localization = {
    en: {
        title: "ANOVA, N way",
        label3: "Effect size",
        confInterval: "Confidence interval for effect sizes",
        effectsizes: "Select effect size measure",
        navigation: "ANOVA, N way",
        target: "Target variable (numeric/scale)",
        dest: "Specify  a maximum of 2 factor variables",
        options: "Options",
        type: "Select type I/II/III Sums of squares",
        levene: "Levene's test for homogeneity of variances",
        label1: "Post-hoc",
        combon: "Compare means using:",
        adjust: "Method for adjusting p-values",
        compactly: "Comparing means compactly",
        alpha: "Enter a value of alpha:",
        label2: "Plots",
        label4: "Plots",
        diag: "Diagnostic plots",
        plot1: "Plot all comparisons",
        //We may reintroduce this based on feedback
        // showEffectSizes: "Display effect sizes",
        horizontalAxis: "Separate lines",
        separateLines: "Horizontal axis",
        separatePlots: "Separate plots",
        help: {
            title: "ANOVA, N way",
            r_help: "help(aov, package='stats')",
            body: `
NOTE:</br>
1. To get all marginal means and post-hocs you need to construct a formula with the main effects and all the interaction terms in the model.</br> 
So if you are attempting to analyze a 3 way interaction, you need to specify</br>
A + B + C + A:B + B:C + A:C + A:B:C</br>
If instead you specify A*B*C, you will get the complete ANOVA table, you will NOT get the estimated marginal means and post-hocs for all the interactions.</br>
2. Estimated marginal means AND POST-HOCS are computed for all main effects and the SPECIFIED INTERACTIONS</br>
<b>Description</b></br>
Fits an analysis of variance model, displays type I,II,III sum of squares, displays marginal means and contrasts (using marginal means).</br> 
Optionally performs Levene's test for homogeneity of variance across groups and plots graphs.</br>
Levene's test is run for all the main effects</br></br>
Builds and summarizes an anova model using the formula specified using the aov function</br>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(aov, package='stats')</br></br>
Displays Anova table with Type I/II/III sum of squares</br>
Uses function Anova in package car for Type II, III sum of squares, function anova in package stats for Type I. When computing type III sum of squares appropriate contrasts (contr.sum) are set for factor variables.</br>
<b>Package</b></br>
car</br>
<b>Help</b></br>
help(Anova, package='car')</br></br>
Displays estimated marginal means</br>
<b>Package</b></br>
emmeans</br>
<b>Help</b></br>
help(emmeans, package='car')</br></br>
Computes Levene's test for homogeneity of variance across groups. 
<b>Package</b></br>
car</br>
<b>Help</b></br>
help(leveneTest, package='car')
`}
    }
}
class ANOVANWay extends baseModal {
    constructor() {
        var config = {
            id: "ANOVANWay",
            label: localization.en.title,
            modalType: "two",
            RCode: `
        `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "copy", scroll:true }) },
            target: {
                el: new dstVariable(config, {
                    label: localization.en.target,
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
            label4: { el: new labelVar(config, { label: localization.en.label4, h: 5 , style: "mt-2"}) },
            horizontalAxis: {
                el: new dstVariable(config, {
                    label: localization.en.horizontalAxis,
                    no: "horizontalAxis",
                    filter: "Numeric|Scale|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ horizontalAxis | safe}}']
            },
            separateLines: {
                el: new dstVariable(config, {
                    label: localization.en.separateLines,
                    no: "separateLines",
                    filter: "Numeric|Scale|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ separateLines | safe}}']
            },
            separatePlots: {
                el: new dstVariable(config, {
                    label: localization.en.separatePlots,
                    no: "separatePlots",
                    filter: "Numeric|Scale|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ separatePlots | safe}}']
            },
            type: {
                el: new comboBox(config, {
                    no: 'type',
                    label: localization.en.type,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["III", "II", "I"],
                    default: "III"
                })
            },
            levene: {
                el: new checkbox(config, {
                    label: localization.en.levene,
                    no: "levene",
                    bs_type: "valuebox",
                    newline: true,
                    extraction: "TextAsIs",
                    style: "mb-3",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5 }) },
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
                    default: "holm"
                })
            },
            compactly: {
                el: new checkbox(config, {
                    label: localization.en.compactly,
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
                    label: localization.en.alpha,
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: 0.05,
                    style: "ml-1",
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 6 }) },
            diag: {
                el: new checkbox(config, {
                    label: localization.en.diag,
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
                    label: localization.en.plot1,
                    no: "plot1",
                    bs_type: "valuebox",
                    newline: true,
                    extraction: "TextAsIs",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label3: { el: new labelVar(config, { no: 'label3', label: localization.en.label3, style: "mt-0", h: 5 }) },
            confInterval: {
                el: new advancedSlider(config, {
                    no: "confInterval",
                    label: localization.en.confInterval,
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
                    label: localization.en.effectsizes,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["eta_squared", "partial_eta_squared", "omega_squared", "epsilon_squared", "cohens_f"],
                    default: "partial_eta_squared"
                })
            },
        };
        var opts = {
            el: new optionsVar(config, {
                no: "Heatmap_options",
                name: localization.en.options,
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
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.formulaBuilder.el.content, objects.label4.el.content, objects.horizontalAxis.el.content, objects.separateLines.el.content, objects.separatePlots.el.content],
            bottom: [opts.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-variance",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
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
BSkyMultiAnova =as.data.frame(summary(MultiAnova <-aov({{selected.target | safe}}~{{selected.formula | safe}},data ={{dataset.name }}))[[1]])
{{if (options.selected.diag =="TRUE") }}#Displaying diagnostic plots\nplot(MultiAnova, main = "Diagnostic Plots")\n{{/if}}
#Creating the ANOVA table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova(MultiAnova,type ="{{selected.type | safe}}"))
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
temp <-{{dataset.name }} %>%\n\t group_by({{selected.dest | safe}}) %>%\n\t
    summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(temp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(temp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variable {{selected.dest | safe}} ")
#Setting contrasts
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum
#Creating the model
BSkyMultiAnova =as.data.frame(summary(MultiAnova <-aov({{selected.target | safe}}~{{selected.dest | safe}},data ={{dataset.name }}))[[1]])
{{if (options.selected.diag =="TRUE") }}#Displaying diagnostic plots\nplot(MultiAnova, main ="Diagnostic Plots"){{/if}}
#Creating the ANOVA table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova(MultiAnova,type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "ANOVA table with type {{selected.type | safe}} sum of squares for {{selected.target | safe}} by {{selected.dest | safe}}")
#Displaying estimated marginal means
resultsEmmeans = list()
resultsEmmeans<-emmeans::emmeans(MultiAnova,~{{selected.dest | safe}})
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
temp <-{{dataset.name }} %>%\n\tgroup_by({{selected.dest | safe}}) %>%\n\t
    summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(temp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(temp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variable {{selected.dest | safe}} ")
`};
        let snippet5 = {
            RCode: `
temp <-{{dataset.name }} %>%\n\t group_by({{selected.commaSepDest | safe}}) %>%\n\t
    summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(temp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(temp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variables {{selected.commaSepDest | safe}}")
`};
        let snippet6 = {
            RCode: `
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum`};
        let snippet7 = {
            RCode: `
BSkyMultiAnova =as.data.frame(summary(MultiAnova <- aov({{selected.target | safe}} ~ {{selected.dependentVars | safe}}, data ={{dataset.name }}))[[1]])
#Creating the Anova table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova(MultiAnova,type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "ANOVA table with type {{selected.type | safe}} sum of squares for {{selected.target | safe}} by {{selected.dependentVars | safe}}")`};
        //Generating estimated marginal means
        let snippet8 = {
            RCode: `
resEmmeans[[{{selected.counter |safe}}]]<-emmeans::emmeans(MultiAnova,~{{selected.dest | safe}})
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
print(emmeans::emmmip(MultiAnova, {{selected.stringInteractionPlots | safe}}  ,CIs=TRUE)){{/if}}`};
        let snippet14 = {
            RCode: `
{{if (options.selected.diag =="TRUE") }}#Displaying diagnostic plots\nplot(MultiAnova, main = "Diagnostic Plots")\n{{/if}}
{{if (options.selected.effectsizes == "eta_squared") }}BSkyEffectSizeResults <- eta_squared(MultiAnova, partial = FALSE, ci={{selected.confInterval | safe}}){{/if}}
{{if (options.selected.effectsizes == "partial_eta_squared") }}BSkyEffectSizeResults <- eta_squared(MultiAnova, partial = TRUE, ci={{selected.confInterval | safe}}){{/if}}
{{if (options.selected.effectsizes == "omega_squared") }}BSkyEffectSizeResults <- omega_squared(MultiAnova, ci={{selected.confInterval | safe}} ){{/if}}
{{if (options.selected.effectsizes == "epsilon_squared") }}BSkyEffectSizeResults <- epsilon_squared(MultiAnova, ci={{selected.confInterval | safe}}){{/if}}
{{if (options.selected.effectsizes == "cohens_f") }}BSkyEffectSizeResults <- cohens_f(MultiAnova, ci={{selected.confInterval | safe}}){{/if}}
\nBSkyFormat( as.data.frame(BSkyEffectSizeResults), singleTableOutputHeader= "Effect Size for ANOVA (Type {{selected.type | safe}}): {{selected.effectsizes | safe}}, CI={{selected.confInterval | safe}}")
`
        };
        let snippet15 = {
            RCode: `
    #emmip(MultiAnova, {{selected.horizontalAxis | safe}} ~ {{selected.separateLines | safe}} | {{selected.separatePlots | safe}})
    emmeans::lsmip(MultiAnova, {{selected.horizontalAxis | safe}} ~ {{selected.separateLines | safe}} | {{selected.separatePlots | safe}},\n\tCIs = TRUE, ylab = "{{selected.target | safe}}")
`
        };
        let snippet16 = {
            RCode: `
    #emmip(MultiAnova, {{selected.horizontalAxis | safe}} ~ {{selected.separateLines | safe}} )
    emmeans::lsmip(MultiAnova, {{selected.horizontalAxis | safe}} ~ {{selected.separateLines | safe}}, \n\tCIs = TRUE, ylab = "{{selected.target | safe}}")
`
        };
        let snippet17 = {
            RCode: `
    #emmip(MultiAnova, ~ {{selected.horizontalAxis | safe}} ! {{selected.separatePlots | safe}} )
    emmeans::lsmip(MultiAnova, ~ {{selected.horizontalAxis | safe}} | {{selected.separatePlots | safe}}, \n\tCIs = TRUE, ylab = "{{selected.target | safe}}")
`
        };
        // Simple effects tests
        let newsnippet101 = {
            RCode: `
    #Simple effects test and descriptives
    #Holding the 2nd and 3rd factor variables constant
    simpleEffectsRes <- emmeans(aov(MultiAnova), pairwise ~ {{selected.firstFactor}} | {{selected.secondFactor}} * {{selected.thirdFactor}} )
    simpleEffectsDes <- data.frame(simpleEffectsRes$emmeans)
    base::row.names(simpleEffectsDes) <- NULL
    BSkyFormat(simpleEffectsDes, singleTableOutputHeader = 'Descriptive Statistics for Simple Effects Tests -{{selected.firstFactor}}:{{selected.secondFactor}}:{{selected.thirdFactor}}')
    simpleEffectsComp <- as.data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.firstFactor}} holding {{selected.secondFactor}} and {{selected.thirdFactor}} constant')
    #Simple effects test holding the 2nd and 3rd factor variables constant
    simpleEffectsRes <- emmeans(aov(MultiAnova), pairwise ~ {{selected.secondFactor}} | {{selected.firstFactor}} * {{selected.thirdFactor}} )
    #simpleEffectsDes <- as.data.frame(simpleEffectsRes$emmeans)
    #base::row.names(simpleEffectsDes) <- NULL
    #BSkyFormat(simpleEffectsDes, singleTableOutputHeader = 'Descriptive Statistics for Simple Effects Tests')
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.secondFactor}} holding {{selected.firstFactor}} and {{selected.thirdFactor}} constant')
    #Simple effects test holding the 2nd and 3rd factor variables constant
    simpleEffectsRes <- emmeans(aov(MultiAnova), pairwise ~ {{selected.thirdFactor}} | {{selected.firstFactor}} * {{selected.secondFactor}} )
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
    simpleEffectsRes <- emmeans(aov(MultiAnova), pairwise ~ {{selected.firstFactor}} | {{selected.secondFactor}} )
    simpleEffectsDes <- data.frame(simpleEffectsRes$emmeans)
    base::row.names(simpleEffectsDes) <- NULL
    BSkyFormat(simpleEffectsDes, singleTableOutputHeader = 'Descriptive Statistics for Simple Effects Tests -{{selected.firstFactor}}:{{selected.secondFactor}}')
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.firstFactor}} holding {{selected.secondFactor}} constant')
    #Holding the 1st factor variable constant
    simpleEffectsRes <- emmeans(aov(MultiAnova), pairwise ~ {{selected.secondFactor}} | {{selected.firstFactor}} )
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
        res.push({ cmd: temp, cgid: newCommandGroup() })
        return res;
    }
}
module.exports.item = new ANOVANWay().render()