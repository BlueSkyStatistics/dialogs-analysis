/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */










var localization = {
    en: {  
        title: "ANOVA, one-way with random blocks",
        navigation: "ANOVA, 1 way (random blocks)",    
        tvarbox1: "Response Variable",
            tvarbox2: "Fixed Effect",
            blockVar: "Blocking Variable(s)",
            Post_hoc: "Post-hoc analysis",
            chk1: "Histogram of residuals",
            help: {
                title: "ANOVA, one-way with random blocks",
                r_help: "help(lmer, package ='lme4')",            
                body: `
<b>Description</b></br>
Fit a linear mixed-effects model (LMM) to data, via REML or maximum likelihood.
<br/>
<b>Usage</b>
<br/>
<code> 
lmer(formula, data = NULL, REML = TRUE, control = lmerControl(),
        start = NULL, verbose = 0L, subset, weights, na.action,
        offset, contrasts = NULL, devFunOnly = FALSE, ...)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
formula: a two-sided linear formula object describing both the fixed-effects and random-effects part of the model, with the response on the left of a ~ operator and the terms, separated by +operators, on the right. Random-effects terms are distinguished by vertical bars (|) separating expressions for design matrices from grouping factors. Two vertical bars (||) can be used to specify multiple uncorrelated random effects for the same grouping variable. (Because of the way it is implemented, the ||-syntax works only for design matrices containing numeric (continuous) predictors; to fit models with independent categorical effects, see dummy or the lmer_alt function from the afex package.)
</li>
<li>
data: an optional data frame containing the variables named in formula. By default the variables are taken from the environment from which lmer is called. While data is optional, the package authors strongly recommend its use, especially when later applying methods such as update and drop1 to the fitted model (such methods are not guaranteed to work properly if data is omitted). If data is omitted, variables will be taken from the environment of formula (if specified as a formula) or from the parent frame (if specified as a character vector).
</li>
<li>
REML: logical scalar - Should the estimates be chosen to optimize the REML criterion (as opposed to the log-likelihood)?
na.action: a function that indicates what should happen when the data contain NAs. The default action (na.omit, inherited from the 'factory fresh' value of getOption("na.action")) strips any observations with any missing values in any variables.
</li>
</ul>
<b>Value</b></br>
An object of class merMod (more specifically, an object of subclass lmerMod), for which many methods are available (e.g. methods(class="merMod"))</br>
<b>Package</b></br>
lme4</br>
<b>Help</b></br>
help(lmer, package ='lme4')</br></br>
<b>Description</b></br>
Description Methods for Function anova in Package lmerTest
<br/>
<b>Usage</b>
<br/>
<code> 
## S4 method for signature 'merModLmerTest' anova(object, ... , ddf="Satterthwaite", type=3)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
object: object of class "merModLmerTest" ... object of class "merModLmerTest". Then the model comparison statistisc will be calculated
</li>
<li>
ddf: By default the Satterthwaite’s approximation to degrees of freedom is calculated. If ddf="Kenward-Roger", then the Kenward-Roger’s approximation is calculated using KRmodcomp function from pbkrtest package. If ddf="lme4" then the anova table that comes from lme4 package is returned.
</li>
<li>
Type: type of hypothesis to be tested. Could be type=3 or type=2 or type = 1 (The definition comes from SAS theory) Details According to (Goodnight, J.H. 1976) the behaviour of the type 3 hypothesis is not fully studied for the situations with missing cells (where observations are missing at some factor-level combination). A warning is returned in such cases.
</li>
</ul>
<b>Details</b></br>
According to (Goodnight, J.H. 1976) the behaviour of the type 3 hypothesis is not fully studied for the situations with missing cells (where observations are missing at some factor-level combination). A warning is returned in such cases.</br>
<b>Package</b></br>
lme4;lmerTest;rcompanion;ggplot2;multcomp</br>
<b>Help</b></br>
https://cran.r-project.org/web/packages/lmerTest/lmerTest.pdf</br>
help(nagelkerke, package ='rcompanion')</br>
help(emmeans,package="cld")</br>
help(cld,package='emmeans')</br>
<b>Reference material</b></br>
http://rcompanion.org/handbook/I_07.html
`		}
	}
}

class ANOVAOneWayWithRanBlocks extends baseModal {
    constructor() {
        var config = {
            id: "ANOVAOneWayWithRanBlocks",
            label:localization.en.title ,
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
                label: localization.en.tvarbox1, 
                no: "tvarbox1", 
                filter: "Numeric|Ordinal|Nominal|Scale",
                extraction: "NoPrefix|UseComma",
                required: true,
            })},
            Fixed: {el: new dstVariable(config, {
                label: localization.en.tvarbox2, 
                no: "tvarbox2", 
                filter: "Numeric|Ordinal|Nominal|Scale",
                extraction: "NoPrefix|UseComma",
                required: true,
            })},
            Block: {
                el: new dstVariableList(config, {
                    label: localization.en.blockVar, 
                    no: "blockVar", 
                    filter: "Numeric|Ordinal|Nominal|Scale", 
                    extraction: "NoPrefix|UsePlus",
                    required: true,
                })},
                chk1: { el: new checkbox(config, { label: localization.en.chk1, no: "chk1", extraction: "Boolean" }) },
             Post_hoc: {el: new checkbox(config, {label: localization.en.Post_hoc, no: "chk2", newline:true,extraction: "Boolean"})}
        }
        
        const content = {
            left: [ objects.content_var.el.content ],
            right: [ objects.response.el.content, objects.Fixed.el.content, objects.Block.el.content, objects.chk1.el.content, objects.Post_hoc.el.content ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-anova_random_blocks",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}

module.exports.item = new ANOVAOneWayWithRanBlocks().render()