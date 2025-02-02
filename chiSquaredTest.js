








class chiSquaredTest extends baseModal {
    static dialogId = 'chiSquaredTest'
    static t = baseModal.makeT(chiSquaredTest.dialogId)

    constructor() {
        var config = {
            id: chiSquaredTest.dialogId,
            label: chiSquaredTest.t('title'),
            modalType: "two",
            RCode: `
local(
{
vars =c({{selected.target | safe}})
for(variable in vars)
{
    {{if (options.selected.proportions != "")}}
    propToTest =c({{selected.proportions | safe}})
    if (sum(propToTest) !=1)
    {
        print("Sum of all the proportions must =1")
        stop()
    }
    if (length(propToTest) !=with({{dataset.name}},length(levels(eval(parse(text =paste(variable)))))))
    {
        print(paste("You must enter a proportion for each level of factor variable ",variable))
        stop()
    }
    {{/if}}
    eval( parse (text =paste( variable, "=", "with ({{dataset.name}},table(", variable, " ) )")))
    {{if (options.selected.proportions != "")}}
    eval ( parse(text = paste ( "x = chisq.test(" , variable, ", p=propToTest)")))
    {{#else}}
    eval ( parse(text = paste ( "x = chisq.test(" , variable, ")")))
    {{/if}}
    y= x[1:5]
    class(y) = class(x)
    z = cbind(Observed = x$observed, Expected = x$expected, Residuals=x$residuals)
    row.names(z) = names(x$observed)
    BSkyFormat(z,singleTableOutputHeader =paste("Frequencies for variable", variable) )
    BSkyFormat(y)
}
}
)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: chiSquaredTest.t('target'),
                    no: "target",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            proportions: {
                el: new input(config, {
                    no: 'proportions',
                    label: chiSquaredTest.t('proportions'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    value: "",
                  }),
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.proportions.el.content],
            nav: {
                name: chiSquaredTest.t('navigation'),
                icon: "icon-chi_squared",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: chiSquaredTest.t('help.title'),
            r_help: chiSquaredTest.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: chiSquaredTest.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new chiSquaredTest().render()
}
