
class kstest extends baseModal {
    static dialogId = 'kstest'
    static t = baseModal.makeT(kstest.dialogId)

    constructor() {
        var config = {
            id: kstest.dialogId,
            label: kstest.t('title'),
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
                    label: kstest.t('trg'),
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
                name: kstest.t('navigation'),
                icon: "icon-gaussian-function",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: kstest.t('help.title'),
            r_help: "help(data,package='utils')",
            body: kstest.t('help.body')
        }
;
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
        res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
        return res
    }
}
module.exports.item = new kstest().render()
