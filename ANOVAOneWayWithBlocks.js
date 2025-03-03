/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */










class ANOVAOneWayWithBlocks extends baseModal {
    static dialogId = 'ANOVAOneWayWithBlocks'
    static t = baseModal.makeT(ANOVAOneWayWithBlocks.dialogId)

    constructor() {
        var config = {
            id: ANOVAOneWayWithBlocks.dialogId,
            label: ANOVAOneWayWithBlocks.t('title'),
            modalType: "two",
            RCode: `
require(FSA)
require(car)
require(emmeans)
require(ggplot2)
require(ggthemes)
require(multcomp)
#local({
#Use Summarize to check if cell sizes are balanced
BSkyFormat(FSA::Summarize({{selected.tvarbox1 | safe}} ~ {{selected.tvarbox2 | safe}} ,data={{dataset.name}},digits=3),singleTableOutputHeader="Summaries for fixed effect")
#Use Summarize with fixed and blocking variables
temp="FSA::Summarize({{selected.tvarbox1 | safe}} ~ {{selected.tvarbox2 | safe}}+{{selected.blockVar | safe}} ,data={{dataset.name}},digits=3)"
temp =str_replace_all(temp,"[+]","*")
if (str_count(string=temp,pattern="[*]") <=1)
{
    resSummFixedandBlockvars =eval(parse(text =temp))
    #Use Summarize with fixed and blocking variables
    BSkyFormat(resSummFixedandBlockvars,singleTableOutputHeader="Summaries for fixed effect and blocking variables")
} else
{
    cat("Summaries for fixed effect and blocking variables cannot be computed with a quantitative response {{tvarbox1}}")
}
#Define a linear model
model = stats::lm({{selected.tvarbox1 | safe}} ~{{selected.tvarbox2 | safe}} +{{selected.blockVar | safe}}, data = {{dataset.name}})
### Will show overall p-value and r-squared
BSkyFormat(summary(model))
#Conduct analysis of variance
BSkyFormat(as.data.frame(car::Anova(model, type = "II")), singleTableOutputHeader="Analysis of Variance")
if ({{selected.chk1 | safe}})
{
    #Histogram and plot of residuals
    dataframeResiduals =data.frame(residuals=stats::residuals(model))
    print(ggplot2::ggplot(dataframeResiduals, aes(x=stats::residuals(model)))+ geom_histogram( colour="black", aes(y=..density..), bins=9)+ stat_function(fun=dnorm,color="red",args=list(mean=mean(stats::residuals(model)), sd=sd(stats::residuals(model))))  + labs(x = "Residuals", title="Histogram plot of model residuals") + {{selected.BSkyThemes | safe}})
    #Plot residuals vs. fitted
    plot(fitted(model), residuals(model),main ="Residuals vs. Fitted")
}
if ({{selected.chk2 | safe}})
{
    #pairwise comparisons
    marginal = emmeans::lsmeans(model, ~ {{selected.tvarbox2 | safe}})
    pairwiseComparisons <-graphics::pairs(marginal,adjust="tukey")
    BSkyFormat(as.data.frame(pairwiseComparisons) , singleTableOutputHeader="Pairwise comparisons")
    cat(sprintf("Results are averaged over levels of: %s \nP value adjustment: %s method for comparing a family of %d estimates",paste(pairwiseComparisons@misc$avgd.over, collapse=","),pairwiseComparisons@misc$adjust,pairwiseComparisons@misc$famSize  ))
    #Compact letter display of pairwise comparisons
    ### Use lower-case letters for .group
    cldComparisons <-multcomp::cld(marginal,alpha = 0.05,  Letters = letters,  
                adjust  = "tukey")
    BSkyFormat(as.data.frame(cldComparisons), singleTableOutputHeader="Compact letter display of pairwise comparisons")
    cat(sprintf("%s\n%s \n%s \n%s",attr(cldComparisons,"mesg")[1],attr(cldComparisons,"mesg")[2],attr(cldComparisons,"mesg")[3],attr(cldComparisons,"mesg")[4]))
}
#})
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: ANOVAOneWayWithBlocks.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: ANOVAOneWayWithBlocks.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "String|Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            blockVar: {
                el: new dstVariableList(config, {
                    label: ANOVAOneWayWithBlocks.t('blockVar'),
                    no: "blockVar",
                    filter: "String|Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UsePlus",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            chk1: { el: new checkbox(config, { label: ANOVAOneWayWithBlocks.t('chk1'), no: "chk1", extraction: "Boolean" }) },
            chk2: { el: new checkbox(config, { label: ANOVAOneWayWithBlocks.t('chk2'), newline: true, no: "chk2", extraction: "Boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.blockVar.el.content, objects.chk1.el.content, objects.chk2.el.content],
            nav: {
                name: ANOVAOneWayWithBlocks.t('navigation'),
                icon: "icon-anova_blocks",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ANOVAOneWayWithBlocks.t('help.title'),
            r_help: ANOVAOneWayWithBlocks.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: ANOVAOneWayWithBlocks.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new ANOVAOneWayWithBlocks().render()
}
