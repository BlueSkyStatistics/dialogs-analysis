
var localization = {
    en: {
        title: "Shapiro-Wilk Normality Test",
        navigation: "Shapiro-Wilk Normality Test",
        tvarbox1: "Select numeric variables",
        help: {
            title: "Shapiro-Wilk Normality Test",
            r_help: "help(shapiro.test, package=stats)",
            body: `
<b>Description</b></br>
Performs the Shapiro-Wilk test of normality.
<br/>
<b>Usage</b>
<br/>
<code> 
shapiro.test(x)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: a numeric vector of data values. Missing values are allowed, but the number of non-missing values must be between 3 and 5000.
</li>
</ul>
<b>Value</b><br/>
A list with class "htest" containing the following components:<br/>
statistic: the value of the Shapiro-Wilk statistic.<br/>
p.value: an approximate p-value for the test. This is said in Royston (1995) to be adequate for p.value < 0.1.<br/>
method: the character string "Shapiro-Wilk normality test".<br/>
data.name: a character string giving the name(s) of the data.<br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(shapiro.test, package=stats)
`}
    }
}






class shapiroWilkNormalityTest extends baseModal {
    constructor() {
        var config = {
            id: "shapiroWilkNormalityTest",
            label: localization.en.title,
            modalType: "two",
            RCode: `
{{dataset.name}} %>%
dplyr::select({{selected.tvarbox1 | safe}}) %>%
    BSky_Shapiro_Wilk_normality_test() %>%
    BSkyFormat()
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sw",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new shapiroWilkNormalityTest().render()