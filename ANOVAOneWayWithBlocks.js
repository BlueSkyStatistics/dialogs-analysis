
var localization = {
    en: {
        title: "ANOVA, one way with blocks",
        navigation: "ANOVA, 1 way with blocks",
        tvarbox1: "Response variable (one)",
        tvarbox2: "Fixed effect",
        blockVar: "Blocking variable(s)",
        chk1: "Histogram of residuals",
        chk2: "Post-hoc analysis",
        help: {
            title: "ANOVA, one way with blocks",
            r_help: "help(Anova, package='car')",
            body: `
<b>Description</b></br>
Anova Tables for Various Statistical Models​
Calculates type-II or type-III analysis-of-variance tables for model objects produced by lm, glm, multinom (in the nnet package), polr (in the MASS package), coxph (in the survival package),coxme (in the coxme pckage), svyglm (in the survey package), rlm (in the MASS package), lmer in the lme4 package, lme in the nlme package, and (by the default method) for most models with a linear predictor and asymptotically normal coefficients (see details below). For linear models, F-tests are calculated; for generalized linear models, likelihood-ratio chisquare, Wald chisquare, or F-tests are calculated; for multinomial logit and proportional-odds logit models, likelihood-ratio tests are calculated. Various test statistics are provided for multivariate linear models produced by lm or manova. Partial-likelihood-ratio tests or Wald tests are provided for Cox models. Wald chi-square tests are provided for fixed effects in linear and generalized linear mixed-effects models. Wald chi-square or F tests are provided in the default case.​
<br/>
<b>Usage</b>
<br/>
<code> 
Anova(mod, type='II,...)​
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
mod: lm, aov, glm, multinom, polr mlm, coxph, coxme, lme, mer, merMod, svyglm, rlm, or other suitable model object.​
</li>
<li>
type: type of test, "II", "III", 2, or 3.​
</li>
</ul>
<b>Details</b></br>
The designations "type-II" and "type-III" are borrowed from SAS, but the definitions used here do not correspond precisely to those employed by SAS. Type-II tests are calculated according to the principle of marginality, testing each term after all others, except ignoring the term's higher-order relatives; so-called type-III tests violate marginality, testing each term in the model after all of the others. This definition of Type-II tests corresponds to the tests produced by SAS for analysis-of-variance models, where all of the predictors are factors, but not more generally (i.e., when there are quantitative predictors). Be very careful in formulating the model for type-III tests, or the hypotheses tested will not make sense.​</br>
As implemented here, type-II Wald tests are a generalization of the linear hypotheses used to generate these tests in linear models.​</br>
For tests for linear models, multivariate linear models, and Wald tests for generalized linear models, Cox models, mixed-effects models, generalized linear models fit to survey data, and in the default case, Anova finds the test statistics without refitting the model. The svyglm method simply calls the default method and therefore can take the same arguments.​</br>
<b>Value</b><br/>
An object of class "anova", or "Anova.mlm", which usually is printed. For objects of class "Anova.mlm", there is also a summary method, which provides much more detail than the print method about the MANOVA, including traditional mixed-model univariate F-tests with Greenhouse-Geisser and Huynh-Feldt corrections.​​</br>
<b>Package</b></br>
Anova</br>
<b>Help</b></br>
help(Anova, package='car')​</br></br>
<b>Description</b></br>
Post-hoc mean separation tests. To perform post-hoc mean separation tests for each main effect factor variable we will use the emmeans package.  The linear model under consideration is called model, created the lm function above.  
<br/>
<b>Usage</b>
<br/>
<code> 
lsmeans(model,
            var1 ~ var2, 
            adjust="tukey") 
</code> <br/>
<b>Package</b></br>
FSA;car;emmeans;ggplot2;multcomp</br>
<b>Help</b></br>
help(lsmeans, package="emmeans")​
    `}
    }
}







class ANOVAOneWayWithBlocks extends baseModal {
    constructor() {
        var config = {
            id: "ANOVAOneWayWithBlocks",
            label: localization.en.title,
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
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    filter: "String|Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            blockVar: {
                el: new dstVariableList(config, {
                    label: localization.en.blockVar,
                    no: "blockVar",
                    filter: "String|Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UsePlus",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            chk1: { el: new checkbox(config, { label: localization.en.chk1, no: "chk1", extraction: "Boolean" }) },
            chk2: { el: new checkbox(config, { label: localization.en.chk2, newline: true, no: "chk2", extraction: "Boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.blockVar.el.content, objects.chk1.el.content, objects.chk2.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-anova_blocks",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new ANOVAOneWayWithBlocks().render()