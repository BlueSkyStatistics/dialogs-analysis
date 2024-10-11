










class factorAnalysis extends baseModal {
    static dialogId = 'factorAnalysis'
    static t = baseModal.makeT(factorAnalysis.dialogId)

    constructor() {
        var config = {
            id: factorAnalysis.dialogId,
            label: factorAnalysis.t('title'),
            modalType: "two",
            RCode: `
## [Factor Analysis]
require(GPArotation)
{{if (options.selected.noOfFactors ==0 && options.selected.factorextraction =="FALSE" )}}cat("ERROR: The number of factors you need to extract needs to be greater than 0"){{#else}}
BSkyFARes <-BSkyFactorAnalysis(vars=c({{selected.destination | safe}}), autoextraction ={{selected.factorextraction | safe}},factors={{selected.noOfFactors | safe}}, screeplot ={{selected.screeplot | safe}},rotation="{{selected.grpBox2 | safe}}", saveScores ={{selected.saveScores | safe}},scores="{{selected.scores | safe}}", prefixForScores="{{selected.varForScores | safe}}",dataset="{{dataset.name}}")
#Display the results in the output grid
BSkyFormat(BSkyFARes)
#Refresh the dataset in the data grid to show the factor scores 
BSkyLoadRefresh("{{dataset.name}}",{{selected.saveScores | safe}})
{{/if}}
{{if (options.selected.parallel=="TRUE")}}
require(psych)
psych::fa.parallel({{dataset.name}}[,c({{selected.destination | safe}})],fa="fa")
{{/if}}
            `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            destination: {
                el: new dstVariableList(config, {
                    label: factorAnalysis.t('destination'),
                    no: "destination",
                    copy: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: factorAnalysis.t('label1'), h: 5 }) },
            autoFactExt: { el: new radioButton(config, { label: factorAnalysis.t('factorextraction1'), no: "factorextraction", increment: "autoFactExt", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            specifyFactors: { el: new radioButton(config, { label: factorAnalysis.t('factorextraction2'), no: "factorextraction", increment: "specifyFactors", value: "FALSE", state: "",  extraction: "ValueAsIs" }) },
            noOfFactors: {
                el: new inputSpinner(config, {
                    no: 'noOfFactors',
                    label: factorAnalysis.t('noOfFactors'),
                    min: 0,
                    max: 9999999,   
                    ml:4,
                    step: 1,
                    value:2,
                    extraction: "NoPrefix|UseComma"
                })
            },
            screeplot: { el: new checkbox(config, { label: factorAnalysis.t('screeplot'), no: "screeplot", extraction: "Boolean" }) },
            label2: { el: new labelVar(config, { label: factorAnalysis.t('label2'), style: "mt-2", h: 5 }) },
            saveScores: { el: new checkbox(config, { label: factorAnalysis.t('saveScores'), no: "saveScores", newline: true, extraction: "Boolean", required:true,dependant_objects: ["varForScores"], }) },
            bartlett: { el: new radioButton(config, { label: factorAnalysis.t('scores1'), style: "ml-3", no: "scores", increment: "bartlett", value: "Bartlett", state: "checked", extraction: "ValueAsIs",  }) },
            regression: { el: new radioButton(config, { label: factorAnalysis.t('scores2'), style: "ml-3",no: "scores", increment: "regression", value: "regression", state: "", extraction: "ValueAsIs"}) },
            varForScores: {
                el: new input(config, {
                    no: 'varForScores',
                    label: factorAnalysis.t('varForScores'),
                    ml: 4,
                    type: "character",
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                }),
            },
            label3: { el: new labelVar(config, { label: factorAnalysis.t('label3'), h: 5, style: "mt-2" }) },
            None: { el: new radioButton(config, { label: factorAnalysis.t('grpBox21'), no: "grpBox2", increment: "none", value: "none", state: "checked", extraction: "ValueAsIs" }) },
            Varimax: { el: new radioButton(config, { label: factorAnalysis.t('grpBox22'), no: "grpBox2", increment: "varimax", value: "varimax", state: "", extraction: "ValueAsIs" }) },
            Promax: { el: new radioButton(config, { label: factorAnalysis.t('grpBox23'), no: "grpBox2", increment: "promax", value: "promax", state: "", extraction: "ValueAsIs" }) },
            BentlerQ: { el: new radioButton(config, { label: factorAnalysis.t('grpBox24'), no: "grpBox2", increment: "BentlerQ", value: "bentlerQ", state: "", extraction: "ValueAsIs" }) },
            Quartimax: { el: new radioButton(config, { label: factorAnalysis.t('grpBox25'), no: "grpBox2", increment: "Quartimax", value: "quartimax", state: "", extraction: "ValueAsIs" }) },
            Oblimin: { el: new radioButton(config, { label: factorAnalysis.t('grpBox26'), no: "grpBox2", increment: "oblimin", value: "oblimin", state: "", extraction: "ValueAsIs" }) },
            GeominQ: { el: new radioButton(config, { label: factorAnalysis.t('grpBox27'), no: "grpBox2", increment: "geominQ", value: "geominQ", state: "", extraction: "ValueAsIs" }) },
            GeominT: { el: new radioButton(config, { label: factorAnalysis.t('grpBox28'), no: "grpBox2", increment: "geominT", value: "geominT", state: "", extraction: "ValueAsIs" }) },
            Simplimax: { el: new radioButton(config, { label: factorAnalysis.t('grpBox29'), no: "grpBox2", increment: "simplimax", value: "simplimax", state: "", extraction: "ValueAsIs" }) },
            parallel: { el: new checkbox(config, { label: factorAnalysis.t('parallel'), newline:true,style: "mt:4",no: "parallel", extraction: "Boolean" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content],
            bottom: [objects.label1.el.content, objects.autoFactExt.el.content, objects.specifyFactors.el.content, objects.noOfFactors.el.content, objects.screeplot.el.content, objects.parallel.el.content,objects.label2.el.content, objects.saveScores.el.content, objects.bartlett.el.content, objects.regression.el.content, objects.varForScores.el.content, objects.label3.el.content, objects.None.el.content, objects.Varimax.el.content, objects.Promax.el.content, objects.BentlerQ.el.content, objects.Quartimax.el.content, objects.Oblimin.el.content, objects.GeominQ.el.content, objects.GeominT.el.content, objects.Simplimax.el.content],
            nav: {
                name: factorAnalysis.t('navigation'),
                icon: "icon-fa",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: factorAnalysis.t('help.title'),
            r_help: "help(data,package='utils')",
            body: factorAnalysis.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new factorAnalysis().render()
}
