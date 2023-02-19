    
var localization = {
    en: {
        title: "ANCOVA, analysis of covariance",
        navigation: "ANCOVA",
        response: "Dependent Variable",
        Fixed: "Fixed Factor",
        Block: "Covariate",
        Summary: "Model Summary",
        Scatter_plot: "Scatter plot for each level of the factor variable",
        Residual: "Residual vs. Fitted plot",
        Histogram: "Histogram plot of residuals",
        help: {
            title: "ANCOVA",
            r_help: "help(Anova, package='car')",
            body: `
<b>Description</b></br>
Analysis of covariance (ANCOVA) combines features of both ANOVA and regression. It augments the ANOVA model with one or more additional quantitative variables, called covariates, which are related to the response variable. The covariates are included to reduce the variance in the error terms and provide more precise measurement of the treatment effects.</br> ANCOVA is used to test the main and interaction effects of the factors, while controlling for the effects of the covariate.</br>
We first generate an Anova table with the interaction term. The goal is to examine whether the interaction term is not significant i.e. the slopes of the dependent variable against the covariate for each level of the fixed factor is not different. We use the Anova package in the car package to generate this Anova table.</br>
We then regenerate the Anova table controlling for the interaction term to determine whether the intercepts of the dependent variable against the covariate for each level of the fixed factor are different.</br> 
We provide the option to generating a scatter plot for of dependent variable against the covariate variable for each level of the fixed factor.</br>
We provide the option to plot the residuals vs. fitted plot For the model where we have controlled the interaction term. The residuals should be unbiased and homoscedastic.</br>
We provide the option to generate a histogram for the residuals for model where we have controlled the interaction term. (Distribution should be approx normal).</br>
We give you the option to summarize the model</br>
<br/>
<b>Usage</b>
<br/>
<code> 
lm(formula, data)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
formula: an object of class "formula" (or one that can be coerced to that class): a symbolic description of the model to be fitted. The details of model specification are given under ‘Details’.
</li>
<li>
data: an optional data frame, list or environment (or object coercible by as.data.frame to a data frame) containing the variables in the model. If not found in data, the variables are taken from environment(formula), typically the environment from which lm is called.
</li>
</ul>
<br/>
<b>Usage</b>
<br/>
<code> 
Anova(mod, , type=c("II"))
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
mod :lm, aov, glm, multinom, polr mlm, coxph, coxme, lme, mer, merMod, svyglm, rlm, or other suitable model object.​
</li>
<li>
type: type of test, "II", "III", 2, or 3.
</li>
</ul>
<b>Package</b></br>
Anova</br>
<b>Help</b></br>
help(Anova, package ='car')
    `}
    }
}






class ANCOVA extends baseModal {
    constructor() {
        var config = {
            id: "ANCOVA",
            label: localization.en.title,
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
                    label: localization.en.response,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            Fixed: {
                el: new dstVariable(config, {
                    label: localization.en.Fixed,
                    no: "tvarbox2",
                    required: true,
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale   ",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            Block: {
                el: new dstVariable(config, {
                    label: localization.en.Block,
                    no: "blockVar",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseSeperator",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            Summary: { el: new checkbox(config, { label: localization.en.Summary, newline:true, no: "chk5", extraction: "boolean" }) },
            Scatter_plot: { el: new checkbox(config, { label: localization.en.Scatter_plot, newline:true,no: "chk3", extraction: "boolean" }) },
            Residual: { el: new checkbox(config, { label: localization.en.Residual, no: "chk2", newline:true,extraction: "boolean" }) },
            Histogram: { el: new checkbox(config, { label: localization.en.Histogram, no: "chk4", newline:true,extraction: "boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.response.el.content, objects.Fixed.el.content, objects.Block.el.content, objects.Summary.el.content, objects.Scatter_plot.el.content, objects.Residual.el.content, objects.Histogram.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-ancova",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new ANCOVA().render()