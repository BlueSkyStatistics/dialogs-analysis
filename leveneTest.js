









class leveneTest extends baseModal {
    static dialogId = 'leveneTest'
    static t = baseModal.makeT(leveneTest.dialogId)

    constructor() {
        var config = {
            id: leveneTest.dialogId,
            label: leveneTest.t('title'),
            modalType: "two",
            RCode: `
require(car)
require(moments)
require(dplyr)
#Summary statistics
BSkyFormat(as.data.frame({{dataset.name}} %>% dplyr::group_by({{selected.tvarbox3 | safe}})  %>% dplyr::summarize(count_{{selected.tvarbox1 | safe}} =dplyr::n(), variance_{{selected.tvarbox1 | safe}}=stats::var({{selected.tvarbox1 | safe}},na.rm =TRUE),sd_{{selected.tvarbox1 | safe}}=stats::sd({{selected.tvarbox1 | safe}},na.rm =TRUE),std_err_{{selected.tvarbox1 | safe}}=BlueSky::bskystderr({{selected.tvarbox1 | safe}}),min_{{selected.tvarbox1 | safe}} = base::min({{selected.tvarbox1 | safe}}, na.rm = TRUE),Quantile_1st_{{selected.tvarbox1 | safe}} =stats::quantile({{selected.tvarbox1 | safe}}, probs = seq(0.25), na.rm = TRUE),mean_{{selected.tvarbox1 | safe}}=base::mean({{selected.tvarbox1 | safe}},na.rm =TRUE),median_{{selected.tvarbox1 | safe}}=stats::median({{selected.tvarbox1 | safe}},na.rm =TRUE),Quantile_3rd_{{selected.tvarbox1 | safe}} =stats::quantile({{selected.tvarbox1 | safe}}, probs = seq(0.75), na.rm = TRUE),skewness_{{selected.tvarbox1 | safe}}=moments::skewness({{selected.tvarbox1 | safe}},na.rm =TRUE), kurtosis_{{selected.tvarbox1 | safe}}=moments::kurtosis({{selected.tvarbox1 | safe}},na.rm =TRUE)    )),singleTableOutputHeader="Summary Statistics")
#Levene's test
BSky_Levene_Test = leveneTest( {{selected.tvarbox1 | safe}} ~ interaction({{selected.tvarbox3 | safe}}), data={{dataset.name}}, center={{selected.gpbox1 | safe}} )
BSkyFormat(as.data.frame(BSky_Levene_Test), singleTableOutputHeader=paste ("Levene's test for homogenity of variances", "center ={{selected.gpbox1 | safe}}") )
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: leveneTest.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox3: {
                el: new dstVariableList(config, {
                    label: leveneTest.t('tvarbox3'),
                    no: "tvarbox3",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: leveneTest.t('label1'), style: "mt-3",h: 5 }) },
            median: { el: new radioButton(config, { label: leveneTest.t('median'), no: "gpbox1", increment: "median", value: "stats::median", state: "checked", extraction: "ValueAsIs" }) },
            mean: { el: new radioButton(config, { label: leveneTest.t('mean'), no: "gpbox1", increment: "mean", value: "base::mean", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox3.el.content, objects.label1.el.content, objects.median.el.content, objects.mean.el.content],
            nav: {
                name: leveneTest.t('navigation'),
                icon: "icon-l",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: leveneTest.t('help.title'),
            r_help: leveneTest.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: leveneTest.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new leveneTest().render()
}
