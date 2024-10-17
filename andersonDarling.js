
class andersonDarling extends baseModal {
    static dialogId = 'andersonDarling'
    static t = baseModal.makeT(andersonDarling.dialogId)

    constructor() {
        var config = {
            id: andersonDarling.dialogId,
            label: andersonDarling.t('title'),
            modalType: "two",
            splitProcessing: false,
            RCode: `
#Runs an Anderson-Darling Test for the composite hypothesis of normality for variable: {{selected.varname | safe}}\n
\nBSkyResults <- nortest::ad.test(x={{selected.vars | safe}})
BSkyFormat( BSkyResults, outputTableIndex = c(tableone=1), outputTableRenames = c("Anderson-Darling Test results for variable: {{selected.varname | safe}}"))
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            trg: {
                el: new dstVariableList(config, {
                    label: andersonDarling.t('trg'),
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
                name: andersonDarling.t('navigation'),
                icon: "icon-gaussian-function",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: andersonDarling.t('help.title'),
            r_help: "help(data,package='utils')",
            body: andersonDarling.t('help.body')
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
module.exports.item = new andersonDarling().render()
