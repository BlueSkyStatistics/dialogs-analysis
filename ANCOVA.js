    







class ANCOVA extends baseModal {
    static dialogId = 'ANCOVA'
    static t = baseModal.makeT(ANCOVA.dialogId)

    constructor() {
        var config = {
            id: ANCOVA.dialogId,
            label: ANCOVA.t('title'),
            modalType: "two",
            RCode: `
require(car)
require(ggplot2)
local({
#We first generate an Anova table with the interaction term. The goal is to examine whether the interaction term is not significant i.e. the slopes of the dependent variable against the covariate for each level of the fixed factor is not different. We use the Anova package in the car package to generate this Anova table.
modelWithInteraction = lm ({{selected.tvarbox1 | safe}} ~ {{selected.tvarbox2 | safe}} + {{selected.blockVar | safe}} + {{selected.tvarbox2 | safe}}:{{selected.blockVar | safe}}, data = {{dataset.name}})
BSkyFormat(as.data.frame(Anova(modelWithInteraction, type="II")),decimalDigitsRounding=4,engNotationSetting=4,singleTableOutputHeader=paste("ANCOVA table testing homogeneity of slopes",c("{{selected.blockVar | safe}}")))
# We then regenerate the Anova table controlling for the interaction term to determine whether the intercepts of the dependent variable against the covariate for each level of the fixed factor are different. 
modelInteractionCtrl = lm ({{selected.tvarbox1 | safe}} ~ {{selected.tvarbox2 | safe}}+{{selected.blockVar | safe}}, data = {{dataset.name}})
BSkyFormat(as.data.frame(Anova(modelInteractionCtrl)), decimalDigitsRounding=4, singleTableOutputHeader=paste ("ANCOVA table assuming homogeneity of slopes", c('{{selected.blockVar | safe}}')))
#We provide the option to generating a scatter plot for of dependent variable against the covariate variable for each level of the fixed factor
    if ({{selected.chk3 | safe}})
    {
        print(ggplot({{dataset.name}},aes(x = {{selected.blockVar | safe}},y ={{selected.tvarbox1 | safe}},color = {{selected.tvarbox2 | safe}})) + geom_point() + labs(x = "{{selected.blockVar | safe}}",y = "{{selected.tvarbox1 | safe}}",color = "{{selected.tvarbox2 | safe}}") +geom_smooth(method ="lm",se=TRUE) +ggtitle(paste('Scatter plot of the response variable', c('{{selected.tvarbox1 | safe}}'), 'against the covariate variable' ,c('{{selected.blockVar | safe}}'),'\nusing separate symbols for each level of the factor variable \n(lines should have the same slope)' ,c('{{selected.tvarbox2 | safe}}') ) + {{selected.BSkyThemes | safe}}))
    }
    # We provide the option to plot the residuals vs. fitted plot For the model where we have controlled the interaction term. The residuals should be unbiased and homoscedastic.
    if ({{selected.chk2  | safe}})
    {
        plot(modelInteractionCtrl$fitted,modelInteractionCtrl$res,xlab="Fitted",ylab="Residuals", main ="A plot of residuals vs. fitted values.\n(The residuals should be unbiased and homoscedastic.)")
    }
    # We provide the option to generate a histogram for the residuals for model where we have controlled the interaction term. (Distribution should be approx normal).
    if ({{selected.chk4 | safe}})
    {
        print (qplot(modelInteractionCtrl$residuals, bins=9,geom="histogram",ylab='Counts',xlab='Residuals', main ='Histogram of Residuals \n(Distribution should be approx normal)')) 
    }
    # Summarizing the model
    if ({{selected.chk5 | safe}})
    {
        cat(paste ("Model summary controlling for interaction variable", c('{{selected.blockVar | safe}}')))
        BSkyFormat(summary(modelInteractionCtrl), decimalDigitsRounding=4, singleTableOutputHeader=paste ("Model summary controlling for interaction variable", c('{{selected.blockVar | safe}}')))
    }
}
)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            response: {
                el: new dstVariable(config, {
                    label: ANCOVA.t('response'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            Fixed: {
                el: new dstVariable(config, {
                    label: ANCOVA.t('Fixed'),
                    no: "tvarbox2",
                    required: true,
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            Block: {
                el: new dstVariable(config, {
                    label: ANCOVA.t('Block'),
                    no: "blockVar",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseSeperator",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            Summary: { el: new checkbox(config, { label: ANCOVA.t('Summary'), newline:true, no: "chk5", extraction: "boolean" }) },
            Scatter_plot: { el: new checkbox(config, { label: ANCOVA.t('Scatter_plot'), newline:true,no: "chk3", extraction: "boolean" }) },
            Residual: { el: new checkbox(config, { label: ANCOVA.t('Residual'), no: "chk2", newline:true,extraction: "boolean" }) },
            Histogram: { el: new checkbox(config, { label: ANCOVA.t('Histogram'), no: "chk4", newline:true,extraction: "boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.response.el.content, objects.Fixed.el.content, objects.Block.el.content, objects.Summary.el.content, objects.Scatter_plot.el.content, objects.Residual.el.content, objects.Histogram.el.content],
            nav: {
                name: ANCOVA.t('navigation'),
                icon: "icon-ancova",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ANCOVA.t('help.title'),
            r_help: ANCOVA.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: ANCOVA.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new ANCOVA().render()
}
