
class correlationTestMultivariableLegacy extends baseModal {
    static dialogId = 'correlationTestMultivariableLegacy'
    static t = baseModal.makeT(correlationTestMultivariableLegacy.dialogId)

    constructor() {
        var config = {
            id: correlationTestMultivariableLegacy.dialogId,
            label: correlationTestMultivariableLegacy.t('title'),
            modalType: "two",
            RCode: `require(stats);
require(RcmdrMisc);
require(corrplot);
require(DescTools);            
BSkyResults <- BSkyCorrelationMatrix (data= {{dataset.name}},\n\t vars = c({{selected.tvarbox1 | safe}}), \n\tcorrelationType = "{{selected.gpbox2 | safe}}", missingValues = "{{selected.gpbox1 | safe}}",
    pValue = "{{selected.gpbox3 | safe}}")
BSkyFormat(BSkyResults)
BSkyPlotCorrelationMatrix (data= {{dataset.name}},\n\t vars = c({{selected.tvarbox1 | safe}}), \n\tcorrelationType = "{{selected.gpbox2 | safe}}", missingValues = "{{selected.gpbox1 | safe}}",
    visualizeCorrelation = {{selected.visualizeCorrelation | safe}}, \n\tplotWeb = {{selected.plotweb | safe}})
if (exists('BSkyResults')){rm(BSkyResults)}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox: {
                el: new dstVariableList(config, {
                    label: correlationTestMultivariableLegacy.t('tvarbox'),
                    required: true,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed"
                })
            },
            lable1: { el: new labelVar(config, { label: correlationTestMultivariableLegacy.t('lable1'), h: 6 , style:"mt-3"}) },
            radio_pearson: { el: new radioButton(config, { label: correlationTestMultivariableLegacy.t('radio_pearson'), no: "gpbox2", increment: "pearson", value: "Pearson", state: "checked", extraction: "ValueAsIs" }) },
            radio_spearman: { el: new radioButton(config, { label: correlationTestMultivariableLegacy.t('radio_spearman'), no: "gpbox2", increment: "spearman", value: "Spearman", state: "", extraction: "ValueAsIs" }) },
            lable2: { el: new labelVar(config, { label: correlationTestMultivariableLegacy.t('lable2'), h: 6, style:"mt-3" }) },
            radio_cc: { el: new radioButton(config, { label: correlationTestMultivariableLegacy.t('radio_cc'), no: "gpbox1", increment: "completeCases", value: "complete.obs", state: "checked", extraction: "ValueAsIs" }) },
            radio_pairwise: { el: new radioButton(config, { label: correlationTestMultivariableLegacy.t('radio_pairwise'), no: "gpbox1", increment: "pairwiseComplete", value: "pairwise.complete.obs", state: "", extraction: "ValueAsIs" }) },
            lable3: { el: new labelVar(config, { label: correlationTestMultivariableLegacy.t('lable3'), h: 6, style:"mt-3" }) },
            ajp: { el: new radioButton(config, { label: correlationTestMultivariableLegacy.t('ajp'), no: "gpbox3", increment: "adjP", value: "adjP", state: "checked", extraction: "ValueAsIs" }) },
            unajp: { el: new radioButton(config, { label: correlationTestMultivariableLegacy.t('unajp'), no: "gpbox3", increment: "unAdjP", value: "unAdjP", state: "", extraction: "ValueAsIs" }) },
            bothp: { el: new radioButton(config, { label: correlationTestMultivariableLegacy.t('bothp'), no: "gpbox3", increment: "bothP", value: "bothP", state: "", extraction: "ValueAsIs" }) },
            vis_cor: { el: new checkbox(config, { label: correlationTestMultivariableLegacy.t('vis_cor'), no: "visualizeCorrelation", extraction: "Boolean", style:"mt-3" }) },
            vis_plot: { el: new checkbox(config, { label: correlationTestMultivariableLegacy.t('vis_plot'), no: "plotweb", newline: true, extraction: "Boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox.el.content, objects.lable1.el.content, objects.radio_pearson.el.content, objects.radio_spearman.el.content,
            objects.lable2.el.content, objects.radio_cc.el.content, objects.radio_pairwise.el.content,
            objects.lable3.el.content, objects.ajp.el.content, objects.unajp.el.content, objects.bothp.el.content,
            objects.vis_cor.el.content, objects.vis_plot.el.content
            ],
            nav: {
                name: correlationTestMultivariableLegacy.t('navigation'),
                icon: "icon-link",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: correlationTestMultivariableLegacy.t('help.title'),
            r_help: "help(data,package='utils')",
            body: correlationTestMultivariableLegacy.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new correlationTestMultivariableLegacy().render()
}
