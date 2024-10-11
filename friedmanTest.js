








class friedmanTest extends baseModal {
    static dialogId = 'friedmanTest'
    static t = baseModal.makeT(friedmanTest.dialogId)

    constructor() {
        var config = {
            id: friedmanTest.dialogId,
            label: friedmanTest.t('title'),
            modalType: "two",
            RCode: `
#Handling NAs
BSky_samples <- na.omit( with({{dataset.name}}, cbind({{selected.tvarbox1 | safe}})))
BSky_Median = as.data.frame( t(apply(BSky_samples,2,median)))
#Running the test
BSky_Friedman_Test = friedman.test(BSky_samples)
BSkyFormat(BSky_Median,singleTableOutputHeader = "Medians")
BSkyFormat(BSky_Friedman_Test )
#remove(BSky_Median)
#remove(BSky_Friedman_Test)
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: friedmanTest.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content],
            nav: {
                name: friedmanTest.t('navigation'),
                icon: "icon-f",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: friedmanTest.t('help.title'),
            r_help: "help(data,package='utils')",
            body: friedmanTest.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new friedmanTest().render()
}
