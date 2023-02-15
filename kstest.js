var localization = {
    en: {
        title: "Kolmogorov-Smirnov Test of Normality",
        navigation: "Kolmogorov-Smirnov Normality Test",
        trg: "Target variables",
        help: {
            title: "Kolmogorov-Smirnov Test of Normality",
            r_help: "help(ks.test, package=stats)",
            body: `
<b>Description</b></br>
Kolmogorov-Smirnov Test for conformance with a normal distribution 
<br/>
<b>Usage</b>
<br/>
<code>
ks.test(x, y ="pnorm")
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: A numeric vector of data values.
</li>
<li>
y:	a character string naming a cumulative distribution function or an actual cumulative distribution function such as pnorm. Only continuous CDFs are valid..
</li>
</ul>
<b>Details</b></br>
In this case, a one-sample test is carried out of the null that the distribution function which generated x is distribution y (i.e. the normal distribution).<br/>
The presence of ties always generates a warning, since continuous distributions do not generate them. If the ties arose from rounding the tests may be approximately valid, but even modest amounts of rounding can have a significant effect on the calculated statistic.<br/>
Missing values are silently omitted from x. </br>
<b>Value</b><br/>
A list with class “htest” containing the following components:<br/>
<ul>
<li>
statistic: the value of the test statistic.
</li>
<li>
p.value: p value of the test.
</li>
</ul>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(ks.test, package =stats)
`}
    }
}
class kstest extends baseModal {
    constructor() {
        var config = {
            id: "kstest",
            label: localization.en.title,
            modalType: "two",
            splitProcessing: false,
            RCode: `
#Runs a Kolmogorov-Smirnov Test to test whether the variable: {{selected.varname | safe}} conforms to a normal distribution
BSkyResults <- stats::ks.test(x={{selected.vars | safe}}, y="pnorm")
BSkyFormat( BSkyResults, outputTableRenames = c("Kolmogorov-Smirnov Test results for variable: {{selected.varname | safe}}", "."))
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            trg: {
                el: new dstVariableList(config, {
                    label: localization.en.trg,
                    no: "trg",
                    filter: "|Numeric|Scale",
                    extraction: "Prefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.trg.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-gaussian-function",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
    prepareExecution(instance) {
        var res = [];
        var code_vars = {
            dataset: {
                name: getActiveDataset()
            },
            selected: instance.dialog.extractData()
        }
        let temp = ""
        instance.objects.trg.el.getVal().forEach(function (value) {
            code_vars.selected.vars = code_vars.dataset.name + "\$" + value
            code_vars.selected.varname = value
            temp += instance.dialog.renderR(code_vars);
        });
        let cmd = temp
        res.push({ cmd: cmd, cgid: newCommandGroup() })
        return res
    }
}
module.exports.item = new kstest().render()
