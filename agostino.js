var localization = {
    en: {
		navigation: "D'Agostino skewness test",
		title: "D'Agostino test of skewness",
        hypothesisType : "Test hypothesis (H1)",
		twosided: "Two-sided",
		greater : "Greater",
		less: "Less",
		label2: "Other options",
        showLengthNAs: "Show length and NAs",
		verbose: "Verbose alternative hypothesis",
        Target: "Select one or more variables",
        help: {
            title: "D'Agostino test of skewness",
            r_help: "help(agostino.test, package ='moments')",
            body: `
<b>Description</b></br>
Performs D'Agostino test for skewness in normally distributed data.
<br/>
<b>Usage</b>
<br/>
<code> 
agostino.test(x, alternative = c("two.sided", "less", "greater"))
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: a numeric vector of data values.
</li>
<li>
y: a character string specifying the alternative hypothesis, must be one of '"two.sided"' (default), '"greater"' or '"less"'. You can specify just the initial letter.
</li>
</ul>
<b>Details</b></br>
Under the hypothesis of normality, data should be symmetrical (i.e. skewness should be equal to zero). This test has such null hypothesis and is useful to detect a significant skewness in normally distributed data.
<br/>
<b>Values</b></br>
A list with class htest containing the following components:
<ul>
<li>
statistic: the list containing skewness estimator and its transformation.</br>
</li>
<li>
p.value: pvalue of the test. </br>
</li>
<li>
alternative: a character string describing the alternative hypothesis</br>
</li>
<li>
method: a character string indicating what type of test was performed.
</li>
<li>
data.name: Name of the data argument.</br>
</li>
</ul>
<b>Example</b></br>
<code> 
set.seed(1234)</br>
x = rnorm(1000)</br>
skewness(x)</br>
agostino.test(x)</br>
</code> <br/>
<b>Package</b></br>
moments</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(agostino.test, package ='moments') in the BlueSky Statistics R editor.           
<br/>
<br/>	
`}
    }
}
class agostino extends baseModal {
    constructor() {
        var config = {
            id: "agostino",
            label: localization.en.title,
            splitProcessing: false,
            modalType: "two",
            RCode: `
local({
## Prepare
require(moments)
## Compute
vars <- c({{selected.Target | safe}})
results <- data.frame ('Variable Name'=vars, check.names=FALSE)

for (i in 1:length (vars)) {
	var <- vars[[i]]
	var <- {{dataset.name}}[, vars[i]]
	results[i, "Error"] <- tryCatch ({
		# This is the core of the calculation
		t <- agostino.test (var, alternative = "two.sided")
		results[i, 'skewness estimator (skew)'] <- t$statistic["skew"]
		results[i, 'transformation (z)'] <- t$statistic["z"]
		results[i, 'p-value'] <- t$p.value
		{{if (options.selected.verbose =="TRUE")}}
		results[i, 'Alternative Hypothesis'] <- rk.describe.alternative (t)
		{{/if}}
		NA				# no error
	}, error=function (e) e$message)	# catch any errors
	
	{{if (options.selected.showLengthNAs =="TRUE")}}
	results[i, "Length"] <- length (var)
	results[i, 'NAs'] <- sum (is.na(var))
	{{/if}}
}
if (all (is.na (results$"Error"))) results$"Error" <- NULL
## Print result
BSkyFormat(results,singleTableOutputHeader = paste("D'Agostino test of skewness - ", "Test hypothesis (H1): {{selected.gpbox1 | safe}}" ))
})
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            Target: {
                el: new dstVariableList(config, {
                    label: localization.en.Target,
                    no: "Target",
                    required: true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },
			hypothesisType: { el: new labelVar(config, { label: localization.en.hypothesisType, h: 6 }) },
            twosided: {
                el: new radioButton(config, {
                    label: localization.en.twosided,
                    no: "gpbox1",
                    increment: "twosided",
                    value: "two.sided",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            greater: {
                el: new radioButton(config, {
                    label: localization.en.greater,
                    no: "gpbox1",
                    increment: "greater",
                    value: "greater",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
			less: {
                el: new radioButton(config, {
                    label: localization.en.less,
                    no: "gpbox1",
                    increment: "less",
                    value: "less",
                    style: "mb:3",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },	
			label2: { el: new labelVar(config, { label: localization.en.label2, style: "mt-2", h: 6 }) },			         
            showLengthNAs: {
                el: new checkbox(config, {
                    label: localization.en.showLengthNAs,
                    no: "showLengthNAs",
                    newline: true,
					style: "mt-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            
            verbose: {
                el: new checkbox(config, {
                    label: localization.en.verbose,
                    no: "verbose",
                    newline: true,
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            }
        }
        
        const content = {
         //   head: [objects.label2.el.content],
            left: [objects.content_var.el.content],
            right: [objects.Target.el.content, objects.hypothesisType.el.content, objects.twosided.el.content, objects.greater.el.content, objects.less.el.content,
            objects.label2.el.content, objects.showLengthNAs.el.content, objects.verbose.el.content],
          //  bottom: [MissingVals.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-log-normal-distribution",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
   
}
module.exports.item = new agostino().render()