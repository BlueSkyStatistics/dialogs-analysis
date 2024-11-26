










class ANOVAOneWayWithRanBlocks extends baseModal {
    static dialogId = 'ANOVAOneWayWithRanBlocks'
    static t = baseModal.makeT(ANOVAOneWayWithRanBlocks.dialogId)

    constructor() {
        var config = {
            id: ANOVAOneWayWithRanBlocks.dialogId,
            label:ANOVAOneWayWithRanBlocks.t('title') ,
            modalType: "two",
            RCode: `
require(lme4)
require(lmerTest)
require(rcompanion)
require(ggplot2)
require(ggthemes)
require(stringr)
library(multcomp)
local({
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
cat("Summaries for fixed effect and blocking variables cannot be computed with a quantitative response {{selected.tvarbox1 | safe}}")
}

varDependent =c('{{selected.tvarbox1 | safe}}')
#varFixed <-paste ({{selected.tvarbox2 | safe }}, sep='', collapse ='+')
varFixed <-c('{{selected.tvarbox2 | safe}}')

varRandom =c("{{selected.blockVar | safe}}")
varRandom <-strsplit(varRandom,"[+]")[[1]]

varRandom <-paste("(1|",varRandom, ")",sep='',collapse ='+')
model <-eval(parse(text =paste("lme4::lmer(", varDependent , "~", varFixed, "+",varRandom, ",","data =",  "{{dataset.name}}", ")", sep='', collapse='+')))

#P-values for the fixed effects
BSkyFormat( as.data.frame(anova(model)),singleTableOutputHeader="P-values for Fixed Efects")

#P values for the random effects
BSkyFormat( as.data.frame(rand(model)),singleTableOutputHeader="P-values for Random Efects")

#p-value and pseudo R-squared for model
#Creating the null model
model.null <-eval(parse(text =paste("lme4::lmer(", varDependent , "~", 1, "+",varRandom, ",","data =",  "{{dataset.name}}", ")", sep='', collapse='+')))
BSkyFormat( as.data.frame(anova(model, model.null)), singleTableOutputHeader="Deviance tables with the null model")

fitResults <-rcompanion::nagelkerke(model,model.null)
cat(fitResults$Messages)
BSkyFormat(fitResults$Number.of.observations,singleTableOutputHeader="Number of observations in model and null model")

BSkyFormat(fitResults$Likelihood.ratio.test,singleTableOutputHeader="Likelihood ratio test with p value")

BSkyFormat( fitResults$Pseudo.R.squared.for.model.vs.null,\n\tdecimalDigitsRounding =6,\n\tsingleTableOutputHeader="Nagelkerke pseudo R-squared measures")
if ({{selected.chk2 | safe}})
{
#pairwise comparisons
marginal = emmeans::lsmeans(model, ~ {{selected.tvarbox2 | safe}})
pairwiseComparisons <-graphics::pairs(marginal,adjust="tukey")
BSkyFormat(as.data.frame(pairwiseComparisons) , singleTableOutputHeader="Pairwise comparisons")

#Compact letter display of pairwise comparisons
### Use lower-case letters for .group
cldComparisons <-multcomp::cld(marginal, alpha = 0.05, Letters = letters,  
            adjust = "tukey")

BSkyFormat(as.data.frame(cldComparisons), singleTableOutputHeader="Compact letter display of pairwise comparisons")
cat(sprintf("%s\\n%s \\n%s \\n%s",attr(cldComparisons,"mesg")[1],attr(cldComparisons,"mesg")[2],attr(cldComparisons,"mesg")[3],attr(cldComparisons,"mesg")[4]))
cat("\\n\\n")
plot <- ggplot(cldComparisons,aes(x = {{selected.tvarbox2 | safe}},y = lsmean,label = .group)) +\n\tgeom_point(shape  = 15,size   = 4) +\n\t geom_errorbar(aes(ymin  =  lower.CL,ymax  =  upper.CL),width =  0.2,size  =  0.7) +\n\ttheme(axis.title   = element_text(face = "bold"),axis.text = element_text(face = "bold"),plot.caption = element_text(hjust = 0)) +\n\tgeom_text(nudge_x = c(0,0,0),nudge_y = c(120,120,120),color = "black") +\n\tggtitle("Least square means of the fixed effect (adjusted for means of other factors in model)")+ {{selected.BSkyThemes | safe}}
\n\tprint(plot)
}
if ({{selected.chk1 | safe}})
{
    #Histogram and plot of residuals
    dataframeResiduals =data.frame(residuals=stats::residuals(model))
    print(ggplot2::ggplot(dataframeResiduals, aes(x=stats::residuals(model)))+ geom_histogram( colour="black", aes(y=..density..), bins=9)+ stat_function(fun=dnorm,color="red",args=list(mean=mean(stats::residuals(model)), sd=sd(stats::residuals(model))))  + labs(x = "Residuals", title="Histogram plot of model residuals") + {{selected.BSkyThemes | safe}})
    #Plot residuals vs. fitted
    plot(fitted(model), residuals(model),main ="Residuals vs. Fitted")
}


}
)
                `
        }

        var objects = {
            content_var: {el: new srcVariableList(config, {action: "move"})},
            response: {el: new dstVariable(config, {
                label: ANOVAOneWayWithRanBlocks.t('tvarbox1'), 
                no: "tvarbox1", 
                filter: "Numeric|Ordinal|Nominal|Scale",
                extraction: "NoPrefix|UseComma",
                required: true,
            })},
            Fixed: {el: new dstVariable(config, {
                label: ANOVAOneWayWithRanBlocks.t('tvarbox2'), 
                no: "tvarbox2", 
                filter: "Numeric|Ordinal|Nominal|Scale",
                extraction: "NoPrefix|UseComma",
                required: true,
            })},
            Block: {
                el: new dstVariableList(config, {
                    label: ANOVAOneWayWithRanBlocks.t('blockVar'), 
                    no: "blockVar", 
                    filter: "Numeric|Ordinal|Nominal|Scale", 
                    extraction: "NoPrefix|UsePlus",
                    required: true,
                })},
                chk1: { el: new checkbox(config, { label: ANOVAOneWayWithRanBlocks.t('chk1'), no: "chk1", extraction: "Boolean" }) },
             Post_hoc: {el: new checkbox(config, {label: ANOVAOneWayWithRanBlocks.t('Post_hoc'), no: "chk2", newline:true,extraction: "Boolean"})}
        }
        
        const content = {
            left: [ objects.content_var.el.content ],
            right: [ objects.response.el.content, objects.Fixed.el.content, objects.Block.el.content, objects.chk1.el.content, objects.Post_hoc.el.content ],
            nav: {
                name: ANOVAOneWayWithRanBlocks.t('navigation'),
                icon: "icon-anova_random_blocks",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ANOVAOneWayWithRanBlocks.t('help.title'),
            r_help: "help(data,package='utils')",
            body: ANOVAOneWayWithRanBlocks.t('help.body')
        }
;
    }
}


module.exports = {
    render: () => new ANOVAOneWayWithRanBlocks().render()
}
