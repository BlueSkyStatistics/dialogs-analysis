var localization = {
    en: {
        title: "ANOVA, 1 and 2 way",
        label3: "Effect size",
        confInterval: "Confidence interval for effect sizes",
        effectsizes: "Select effect size measure",
        navigation: "ANOVA, 1 and 2 way",
        target: "Target variable (numeric/scale)",
        dest: "Specify  a maximum of 2 factor variables",
        options: "Options",
        Interaction: "Ignore interaction terms in model",
        type: "Select type I/II/III Sums of squares",
        levene: "Levene's test for homogeneity of variances",
        label1: "Post-hoc",
        combon: "Compare Means using:",
        adjust: "Method for adjusting p-values",
        compactly: "Comparing means compactly",
        alpha: "Enter a value of alpha:",
        label2: "Plots",
        diag: "Diagnostic plots",
        plot1: "Plot all comparisons",
        plot2: "Least square means interaction plots",
        showEffectSizes: "Display effect sizes",
        help: {
            title: "Anova (1 Way and 2 Way)",
            r_help: "help(aov, package='stats')",
            body: `
<b>Description</b></br>
Fits a analysis of variance model along with data summaries, displays type I,II,III sum of squares, displays marginal means and contrasts (using marginal means). Model is built with and without interaction effects. Optionally performs  Levene's test for homogeneity of variance across groups and plots graphs.</br>
The following is displayed</br>
1. Summarizes the data</br>
<br/>
<b>Usage</b>
<br/>
<code> 
dplyr::group_by(year,origin,cylinder) %>% dplyr::summarize(n=n(),mean=mean(mpg,na.rm =TRUE)
</code> <br/>
<b>Package</b></br>
dplyr</br>
<b>Help</b></br>
help(group_by, package ='dplyr')</br>
2. Optionally builds and summarizes a full factorial anova model or a model without interaction terms</br>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(aov, package='stats')</br> 
3. Displays Anova table with Type I/II/III sum of squares</br>
Uses function Anova in package car for Type II, III sum of squares, function anova in package stats for Type I. When computing type III sum of squares appropriate contrasts (contr.sum) are set for factor variables.</br>
<b>Package</b></br>
car</br>
<b>Help</b></br>
help(Anova, package='car')</br> 
4. Displays estimated marginal means</br>
<b>Package</b></br>
emmeans</br>
<b>Help</b></br>
help(emmeans, package='car')</br>
5. (Optional) Computes Levene's test for homogeneity of variance across groups. 
<b>Package</b></br>
emmeans;car;dplyr;ggplot2;multcomp</br>
<b>Help</b></br>
help(leveneTest, package='car')
`}
    }
}
class ANOVAOneWayTwoWay extends baseModal {
    constructor() {
        var config = {
            id: "ANOVAOneWayTwoWay",
            label: localization.en.title,
            modalType: "two",
            RCode: `
        `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            target: {
                el: new dstVariable(config, {
                    label: localization.en.target,
                    no: "target",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            dest: {
                el: new dstVariableList(config, {
                    label: localization.en.dest,
                    no: "dest",
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ dest | safe}}']
            },
            Interaction: {
                el: new checkbox(config, {
                    label: localization.en.Interaction,
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
            plot2: {
                el: new checkbox(config, {
                    label: localization.en.plot2,
                    no: "plot2",
                    bs_type: "valuebox",
                    extraction: "TextAsIs",
                    newline: true,
                    style: "mb-3",
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
                    step: 0.001,
                    value: 0.95,
                    style: "ml-1",
                    extraction: "NoPrefix|UseComma"
                })
            },
            showEffectSizes: {
                el: new checkbox(config, {
                    label: localization.en.showEffectSizes,
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
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.dest.el.content],
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
temp <-{{dataset.name }} %>%\n\t group_by({{selected.dest | safe}}) %>%
summarise(n = n(),mean = mean({{selected.target | safe}},na.rm = TRUE),median = median({{selected.target | safe}},na.rm = TRUE),min = min({{selected.target | safe}},na.rm = TRUE),max = max({{selected.target | safe}},na.rm = TRUE),sd = sd({{selected.target | safe}},na.rm = TRUE),variance = var({{selected.target | safe}},na.rm = TRUE))
names(temp)[1] ="{{selected.dest | safe}}"
BSkyFormat( as.data.frame(temp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variable {{selected.dest | safe}} ")
#Setting contrasts
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum
#Creating the model
BSkyMultiAnova =as.data.frame(summary(MultiAnova <-aov({{selected.target | safe}}~{{selected.dest | safe}},data ={{dataset.name }}))[[1]])
#Creating the ANOVA table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova(MultiAnova,type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "ANOVA table with type III sum of squares for {{selected.target | safe}} by {{selected.dest | safe}}")
#Displaying estimated marginal means
resultsEmmeans = list()
resultsEmmeans<-emmeans::emmeans(MultiAnova,~{{selected.dest | safe}})
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
{{if (options.selected.diag =="TRUE") }}#Displaying diagnostic plots\nplot(MultiAnova){{/if}}
#Creating the Anova table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova(MultiAnova, type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "Anova table with type {{selected.type | safe}} sum of squares for {{selected.target | safe}} by {{selected.dest | safe}}")
#Displaying estimated marginal means
resultsEmmeans = list()
resultsEmmeans<-emmeans::emmeans(MultiAnova,~{{selected.dest | safe}})
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
BSkyFormat(as.data.frame(temp),singleTableOutputHeader = "Summaries for {{selected.target | safe}} by factor variables {{selected.commaSepDest | safe}}")
`};
        let snippet6 = {
            RCode: `
contrasts({{dataset.name }}\${{selected.dest | safe}}) <- contr.sum`};
        let snippet7 = {
            RCode: `
BSkyMultiAnova =as.data.frame(summary(MultiAnova <- aov({{selected.target | safe}} ~ {{selected.dependentVars | safe}}, data ={{dataset.name }}))[[1]])
#Creating the Anova table with type I/II/III sum of squares
anovaTable =as.data.frame(car::Anova(MultiAnova,type ="{{selected.type | safe}}"))
BSkyFormat(BSkyMultiAnova,singleTableOutputHeader = "Anova table with type {{selected.type | safe}} sum of squares for {{selected.target | safe}} by {{selected.dependentVars | safe}}")`};
        //Generating estimated marginal means
        let snippet8 = {
            RCode: `
resEmmeans[[{{selected.counter |safe}}]] <- emmeans::emmeans(MultiAnova,~{{selected.dest | safe}})
BSkyFormat(data.frame(resEmmeans[[{{selected.counter | safe}}]]),singleTableOutputHeader ="Estimated Marginal Means for {{selected.target | safe}} by {{selected.dest | safe}}")`};
        //Generating conditional means
        let snippet81 = {
            RCode: `
resEmmeans[[{{selected.counter |safe}}]] <- emmeans::emmeans(MultiAnova,~{{selected.dependentVars | safe}})
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
    simpleEffectsRes <- emmeans(aov(MultiAnova), pairwise ~ {{selected.firstFactor}} | {{selected.secondFactor}} )
    simpleEffectsDes <- data.frame(simpleEffectsRes$emmeans)
    base::row.names(simpleEffectsDes) <- NULL
    BSkyFormat(simpleEffectsDes, singleTableOutputHeader = 'Descriptive Statistics for Simple Effects Tests')
    simpleEffectsComp <- data.frame(simpleEffectsRes$contrasts)
    base::row.names(simpleEffectsComp) <- NULL
    BSkyFormat(simpleEffectsComp, singleTableOutputHeader = 'Comparisons for {{selected.firstFactor}} holding {{selected.secondFactor}} constant')
    #Holding the 1st factor variable constant
    simpleEffectsRes <- emmeans(aov(MultiAnova), pairwise ~ {{selected.secondFactor}} | {{selected.firstFactor}} )
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
print(emmeans::lsmip(MultiAnova, {{selected.stringInteractionPlots | safe}}  ,CIs=TRUE)){{/if}}`};
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
                confInterval: instance.objects.confInterval.el.getVal(),
                compactly: instance.objects.compactly.el.getVal(),
                diag: instance.objects.diag.el.getVal(),
                plot2: instance.objects.plot2.el.getVal(),
                plot1: instance.objects.plot1.el.getVal(),
                Interaction: instance.objects.Interaction.el.getVal(),
                //We may introduce this based on feedback
                // showEffectSizes: instance.objects.showEffectSizes.el.getVal() ? "TRUE" : "FALSE",
            }
        }
        if (noFactorvars == 1) {
            code_vars.selected.dest = instance.dialog.prepareSelected({ dest: instance.objects.dest.el.getVal()[0] }, instance.objects.dest.r);
            cmd = instance.dialog.renderSample(snippet1.RCode, code_vars)
            res.push({ cmd: cmd, cgid: newCommandGroup() })
        }
        else {
            code_vars.selected.commaSepDest = instance.objects.dest.el.getVal();
            temp = temp + snippet3 + "\n";
            temp = temp + "\n#Generating summaries";
            //Generating summaries for each factor
            instance.objects.dest.el.getVal().forEach(function (value) {
                code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                cmd = instance.dialog.renderSample(snippet4.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd;
            })
            //Generating summaries for the target by both groups
            code_vars.selected.dest = instance.objects.dest.el.getVal()[0]
            cmd = instance.dialog.renderSample(snippet5.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd;
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
            temp = temp + "\n#Setting contrasts";
            instance.objects.dest.el.getVal().forEach(function (value) {
                code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                cmd = instance.dialog.renderSample(snippet6.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd;
            })
            //Creating the model and optionally plotting diagnostics
            temp = temp + "\n\n#Creating the model";
            cmd = instance.dialog.renderSample(snippet7.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd;
            //Generating estimated marginal means for each group
            let i = 1;
            temp = temp + "\n\n#Displaying estimated marginal means";
            temp = temp + "\nresEmmeans = list()"
            instance.objects.dest.el.getVal().forEach(function (value) {
                code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                code_vars.selected.counter = i;
                cmd = instance.dialog.renderSample(snippet8.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";
                i = i + 1;
            })
            //Generating conditional means
            if (code_vars.selected.Interaction == "FALSE") {
                temp = temp + "\n#Displaying conditional means";
                code_vars.selected.counter = 3;
                cmd = instance.dialog.renderSample(snippet81.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";
            }
            //Levene's test
            if (code_vars.selected.levene == "TRUE") {
                temp = temp + "\n\n#Levenes test";
                instance.objects.dest.el.getVal().forEach(function (value) {
                    code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                    cmd = instance.dialog.renderSample(snippet9.RCode, code_vars)
                    cmd = removenewline(cmd);
                    temp = temp + cmd + "\n";;
                })
            }
            //post-hoc tests
            i = 1;
            temp = temp + "\n\n#Post-hoc tests";
            temp = temp + "\nresContrasts = list()";
            instance.objects.dest.el.getVal().forEach(function (value) {
                code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                code_vars.selected.counter = i;
                cmd = instance.dialog.renderSample(snippet10.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";;
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
                temp = temp + cmd + "\n";
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
                temp = temp + "\n\n#Comparing means compactly";
                temp = temp + "\nresultsContrasts = list()";
                instance.objects.dest.el.getVal().forEach(function (value) {
                    code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                    code_vars.selected.counter = i;
                    cmd = instance.dialog.renderSample(snippet11.RCode, code_vars)
                    cmd = removenewline(cmd);
                    temp = temp + cmd + "\n";;
                    i = i + 1;
                })
                //Comparing means compactly with interaction
                if (code_vars.selected.Interaction == "FALSE") {
                    temp = temp + "\n\n#Comparing means compactly with the interaction";
                    code_vars.selected.counter = 3;
                    cmd = instance.dialog.renderSample(snippet111.RCode, code_vars)
                    cmd = removenewline(cmd);
                    temp = temp + cmd + "\n";;
                }
            }
            if (code_vars.selected.plot1 == "TRUE") {
                i = 1;
                temp = temp + "\n\n#Plot all comparisons";
                instance.objects.dest.el.getVal().forEach(function (value) {
                    code_vars.selected.dest = instance.dialog.prepareSelected({ dest: value }, instance.objects.dest.r);
                    code_vars.selected.counter = i;
                    cmd = instance.dialog.renderSample(snippet12.RCode, code_vars)
                    cmd = removenewline(cmd);
                    temp = temp + cmd + "\n";
                    i = i + 1;
                })
            }
            if (code_vars.selected.plot2 == "TRUE") {
                temp = temp + "\n\n#Interaction plots";
                cmd = instance.dialog.renderSample(snippet13.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd + "\n";;
            }
        }
        //Effect sizes
        temp = temp + "\n\n#Diagnostic plots and Effect sizes";
        cmd = instance.dialog.renderSample(snippet14.RCode, code_vars)
        cmd = removenewline(cmd);
        temp = temp + cmd + "\n";
        res.push({ cmd: temp, cgid: newCommandGroup() })
        return res;
    }
}
module.exports.item = new ANOVAOneWayTwoWay().render()