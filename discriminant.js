/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */



class discriminant extends baseModal {
    static dialogId = 'discriminant'
    static t = baseModal.makeT(discriminant.dialogId)

    constructor() {
        var config = {
            id: discriminant.dialogId,
            label: discriminant.t('title'),
            modalType: "two",
            RCode: `
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            modelname: {
                el: new input(config, {
                    no: 'modelname',
                    label: discriminant.t('modelname'),
                    placeholder: "",
                    required: true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "BSkyDiscriminantModel",
                    overwrite: "dataset"
                })
            },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: discriminant.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ tvarbox1 | safe}}']
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: discriminant.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "String|Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ tvarbox2 | safe}}']
            },
            blockVar: {
                el: new dstVariableList(config, {
                    label: discriminant.t('blockVar'),
                    no: "blockVar",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UsePlus",
                }), r: ['{{ blockVar | safe}}']
            },
            testStatistic: {
                el: new comboBox(config, {
                    no: 'testStatistic',
                    label: discriminant.t('testStatistic'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["Hotelling-Lawley", "Pillai", "Roy", "Wilks"],
                    default: "Wilks"
                })
            },
            plotMeansCI: { el: new checkbox(config, { label: discriminant.t('plotMeansCI'), newline: true, no: "plotMeansCI", extraction: "Boolean" }) },
            displayBoxMDetails: { el: new checkbox(config, { label: discriminant.t('displayBoxMDetails'), no: "displayBoxMDetails", newline: true, extraction: "Boolean" }) },
            emm: { el: new checkbox(config, { label: discriminant.t('emm'), newline: true, no: "emm", style: "mb-2", extraction: "Boolean" }) },
            posthocs: { el: new checkbox(config, { label: discriminant.t('posthocs'), newline: true, no: "chk3", extraction: "Boolean" }) },
            levenesTest: { el: new checkbox(config, { label: discriminant.t('levenesTest'), no: "levenesTest", newline: true, extraction: "Boolean" }) },
            label2: { el: new labelVar(config, { label: discriminant.t('label2'), h: 6 }) },
            combon: {
                el: new comboBox(config, {
                    no: 'combon',
                    label: discriminant.t('combon'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["pairwise", "revpairwise", "poly", "trt.vs.ctrl1", "trt.vs.ctrlk", "eff", "def", "consec", "mean_chg"],
                    default: "pairwise"
                })
            },
            adjust: {
                el: new comboBox(config, {
                    no: 'adjust',
                    label: discriminant.t('adjust'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["holm", "BY", "bonferroni", "fdr", "hochberg", "BH", "hommel", "none", "mvt", "scheffe", "sidak", "tukey"],
                    default: "none"
                })
            },
        }
        var opts = {
            el: new optionsVar(config, {
                no: "MANOVA_options",
                name: discriminant.t('options'),
                content: [
                    objects.plotMeansCI.el,
                    objects.displayBoxMDetails.el,
                    objects.emm.el,
                    objects.label2.el,
                    objects.combon.el,
                    objects.adjust.el,
                    objects.posthocs.el,
                    objects.levenesTest.el,
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.modelname.el.content, objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.blockVar.el.content, objects.testStatistic.el.content],
            bottom: [opts.el.content],
            nav: {
                name: discriminant.t('navigation'),
                icon: "icon-manova",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: discriminant.t('help.title'),
            r_help: discriminant.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: discriminant.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        let cmd = {};
        var res = [];
        var temp = "";
        var noFactorvars = instance.objects.tvarbox1.el.getVal().length;
        let snippet1 = {
            RCode: `
require(heplots)
require(gplots)
{{selected.modelname | safe}} <- manova(data = {{dataset.name}}, cbind({{selected.tvarbox1 | safe}}) ~ {{selected.tvarbox2 |safe}}{{if(options.selected.blockVar !="")}} + {{selected.blockVar | safe}}{{/if}})
BSkyDiscriminantSummary <- summary({{selected.modelname | safe}}, test = c("{{selected.testStatistic | safe}}"))
BSkyFormat(BSkyDiscriminantSummary, \n\tsingleTableOutputHeader=paste("discriminant summary, test statistic: ","{{selected.testStatistic | safe}}", sep="" ))\n
\n#Box's M Test\n
BSkyBoxMRes <- heplots::boxM(data = {{dataset.name}}, \n\tcbind({{selected.tvarbox1 | safe}}) ~ {{selected.tvarbox2 |safe}})
BSkyFormat(BSkyBoxMRes, \n\toutputTableIndex = c(tableone=1, tabletwo=2))\n
{{if (options.selected.displayBoxMDetails == "TRUE")}}
# Display details on Box's M
BSkyBoxMSummaryRes <- summary(BSkyBoxMRes, quiet=TRUE)\n
BSkyFormat(BSkyBoxMSummaryRes ,outputTableRenames = c("Log of covariance determinants:", "Eigenvalues:", \n\t"Statistics based on eigenvalues:"))\n
{{/if}}
\n#Univariate statistics\n
BSkyAOVSummary <- summary.aov({{selected.modelname | safe}})
BSkyFormat(BSkyAOVSummary, singleTableOutputHeader="Summary of analysis of variance")
`};
        let snippet2 = {
            RCode: `
{{if (options.selected.plotMeansCI == "TRUE")}}
\n#Plot of means\n
gplots::plotmeans({{selected.tvarbox1 |safe}} ~ {{selected.tvarbox2 |safe}}, \n\tdata = {{dataset.name}}, bars = FALSE, \n\tmain= "Plot of means x axis:{{selected.tvarbox2 |safe}}, y axis: {{selected.tvarbox1 |safe}}")
{{/if}}
{{if (options.selected.posthocs == "TRUE" || options.selected.emm == "TRUE")}}
\n#Univariate statistics (marginal means and posthocs) for {{selected.tvarbox1 |safe}}\n
#Estimated marginal means for {{selected.tvarbox1 |safe}}\n
BSkyUnivariateModel <- aov({{selected.tvarbox1 |safe}} ~ {{selected.tvarbox2 |safe}}, data = {{dataset.name}})
BSkyUnivariateEMM <- emmeans::emmeans(BSkyUnivariateModel, "{{selected.tvarbox2 |safe}}")
BSkyFormat(as.data.frame(BSkyUnivariateEMM), \n\tsingleTableOutputHeader="Marginal means for {{selected.tvarbox1 |safe}} by {{selected.tvarbox2 |safe}}")
{{if (options.selected.posthocs == "TRUE")}}
\n#Posthocs for {{selected.tvarbox1 |safe}}\n
BSkyUniContrasts <- emmeans::contrast(BSkyUnivariateEMM, "pairwise")
BSkyFormat(as.data.frame(BSkyUniContrasts), \n\tsingleTableOutputHeader="Posthocs for {{selected.tvarbox1 |safe}} by {{selected.tvarbox2 |safe}} (using method = {{selected.combon | safe}})")
{{/if}}
{{/if}}
{{if (options.selected.levenesTest == "TRUE") }}
\n#Levenes Test\n
BSkyLeveneTest <- with({{dataset.name}},\n\tcar::leveneTest({{selected.tvarbox1 | safe}}, {{selected.tvarbox2 | safe}}))
BSkyFormat(as.data.frame(BSkyLeveneTest), \n\tsingleTableOutputHeader = "Levene's test for homogenity of variances (center=mean) for {{selected.tvarbox1 | safe}} against {{selected.tvarbox2 | safe}}"){{/if}}
      `};
        let snippet3 = {
            RCode: `
\n#Removing temporary objects
if (exists('BSkyDiscriminantSummary')){rm(BSkyDiscriminantSummary)}
if (exists('BSkyAOVSummary')){rm(BSkyAOVSummary)}
if (exists('BSkyBoxMRes')){rm(BSkyBoxMRes)}
if (exists('BSkyBoxMSummaryRes')){rm(BSkyBoxMSummaryRes)}
if (exists('BSkyUnivariateModel')){rm(BSkyUnivariateModel)}
if (exists('BSkyUnivariateEMM')){rm(BSkyUnivariateEMM)}
if (exists('BSkyUniContrasts')){rm(BSkyUniContrasts)}
if (exists('BSkyLeveneTest')){rm(BSkyLeveneTest)}
        `};
        var code_vars = {
            dataset: {
                name: getActiveDataset()
            },
            selected: {
                levenesTest: instance.objects.levenesTest.el.getVal() ? "TRUE" : "FALSE",
                modelname: instance.objects.modelname.el.getVal(),
                testStatistic: instance.objects.testStatistic.el.getVal(),
                combon: instance.objects.combon.el.getVal(),
                blockVar: instance.objects.blockVar.el.getVal().join(" + "),
                tvarbox2: instance.dialog.prepareSelected({ tvarbox2: instance.objects.tvarbox2.el.getVal()[0] }, instance.objects.tvarbox2.r),
                adjust: instance.objects.adjust.el.getVal(),
                posthocs: instance.objects.posthocs.el.getVal() ? "TRUE" : "FALSE",
                emm: instance.objects.emm.el.getVal() ? "TRUE" : "FALSE",
                plotMeansCI: instance.objects.plotMeansCI.el.getVal() ? "TRUE" : "FALSE",
                displayBoxMDetails: instance.objects.displayBoxMDetails.el.getVal() ? "TRUE" : "FALSE",
            }
        }
        if (noFactorvars == 1) {
            code_vars.selected.tvarbox1 = instance.dialog.prepareSelected({ tvarbox1: instance.objects.tvarbox1.el.getVal()[0] }, instance.objects.tvarbox1.r);
            cmd = instance.dialog.renderSample(snippet1.RCode, code_vars)
            res.push({ cmd: cmd, cgid: newCommandGroup() })
        }
        else {
            code_vars.selected.tvarbox1 = instance.objects.tvarbox1.el.getVal();
            cmd = instance.dialog.renderSample(snippet1.RCode, code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd;
            instance.objects.tvarbox1.el.getVal().forEach(function (value) {
                code_vars.selected.tvarbox1 = instance.dialog.prepareSelected({ tvarbox1: value }, instance.objects.tvarbox1.r);
                cmd = instance.dialog.renderSample(snippet2.RCode, code_vars)
                cmd = removenewline(cmd);
                temp = temp + cmd;
            })
        }
        cmd = instance.dialog.renderSample(snippet3.RCode, code_vars)
        temp = temp + cmd;
        cmd = removenewline(cmd);
        res.push({ cmd: temp, cgid: newCommandGroup() })
        return res;
    }
}

module.exports = {
    render: () => new discriminant().render()
}
