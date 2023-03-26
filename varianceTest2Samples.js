
var localization = {
    en: {
        title: "Variance Test, F-test",
        navigation: "Variance Test, two samples",
        tvarbox1: "Response variable",
        tvarbox2: "Factor variable, with only two levels",
        label1: "Alternative hypothesis",
        test1: "Difference != 1",
        test2: "Difference > 1",
        test3: "Difference < 1",
        txtbox1: "Confidence level",
        help: {
            title: "Variance Test, F-test)",
            r_help: "help(var.test, package=stats)",
            body: `
                <b>Description</b></br>
                Performs an F test to compare the variances of two samples from normal populations.
                <br/>
                <b>Usage</b>
                <br/>
                <code> 
                var.test(x, ...)</br>
                ## Default S3 method:</br>
                var.test(x, y, ratio = 1,
                         alternative = c("two.sided", "less", "greater"),
                         conf.level = 0.95, ...)</br>
                ## S3 method for class 'formula'</br>
                var.test(formula, data, subset, na.action, ...)
                </code> <br/>
                <b>Arguments</b><br/>
                <ul>
                <li>
                x, y: numeric vectors of data values, or fitted linear model objects (inheriting from class "lm").
                </li>
                <li>
                ratio: the hypothesized ratio of the population variances of x and y.
                </li>
                <li>
                alternative: a character string specifying the alternative hypothesis, must be one of "two.sided" (default), "greater" or "less". You can specify just the initial letter.
                </li>
                <li>
                conf.level: confidence level for the returned confidence interval.
                </li>
                <li>
                formula: a formula of the form lhs ~ rhs where lhs is a numeric variable giving the data values and rhs a factor with two levels giving the corresponding groups.
                </li>
                <li>
                data: an optional matrix or data frame (or similar: see model.frame) containing the variables in the formula formula. By default the variables are taken from environment(formula).
                </li>
                <li>
                subset: an optional vector specifying a subset of observations to be used.
                </li>
                <li>
                na.action: a function which indicates what should happen when the data contain NAs. Defaults to getOption("na.action").
                </li>
                <li>
                ...: further arguments to be passed to or from methods.
                </li>
                </ul>
                <b>Details</b></br>
                The null hypothesis is that the ratio of the variances of the populations from which x and y were drawn, or in the data to which the linear models x and y were fitted, is equal to ratio.</br>
                <b>Value</b><br/>
                A list with class "htest" containing the following components:
                statistic: the value of the F test statistic.
                parameter: the degrees of the freedom of the F distribution of the test statistic.
                p.value: the p-value of the test.
                conf.int: a confidence interval for the ratio of the population variances.
                estimate: the ratio of the sample variances of x and y.
                null.value: the ratio of population variances under the null.
                alternative: a character string describing the alternative hypothesis.
                method: the character string "F test to compare two variances".
                data.name: a character string giving the names of the data.
                <b>Examples</b><br/>
                <code>
                Dataframe <- data.frame(Age=c(20,23,19,25,26), Weight=c(48,50,55,51,49), Gender=c('m','f','f','m','m' ))<br/>
                Result_Variance_Test = var.test( Age ~Gender,alternative='two.sided',conf.level=0.95,data=Dataframe )
                </code> <br/>
                <b>Package</b></br>
                stats</br>
                <b>Help</b></br>
                help(var.test, package=stats)
    `}
    }
}









class varianceTest2Samples extends baseModal {
    constructor() {
        var config = {
            id: "varianceTest2Samples",
            label: localization.en.title,
            modalType: "two",
            RCode: `
BSky_Variance = by( {{dataset.name}}[c('{{selected.tvarbox1 | safe}}')], list({{dataset.name}}\${{selected.tvarbox2 | safe}}),  var, na.rm=TRUE )
BSky_Variance_Test = var.test( {{selected.tvarbox1 | safe}} ~{{selected.tvarbox2 | safe}},  alternative='{{selected.gpbox2 | safe}}', conf.level={{selected.txtbox1 | safe}}, data={{dataset.name}} )
BSkyFormat(BSky_Variance, singleTableOutputHeader="Variance")
BSkyFormat(BSky_Variance_Test)
#remove(BSky_Variance)
#remove(BSky_Variance_Test)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    required:true,
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    required:true,
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mt-3",h: 6 }) },
            test1: { el: new radioButton(config, { label: localization.en.test1, no: "gpbox2", increment: "test1", value: "two.sided", state: "checked", extraction: "ValueAsIs" }) },
            test2: { el: new radioButton(config, { label: localization.en.test2, no: "gpbox2", increment: "test2", value: "greater", state: "", extraction: "ValueAsIs" }) },
            test3: { el: new radioButton(config, { label: localization.en.test3, no: "gpbox2", increment: "test3", value: "less", state: "", extraction: "ValueAsIs" }) },
            txtbox1: {
                el: new inputSpinner(config, {
                    no: 'txtbox1',
                    label: localization.en.txtbox1,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.label1.el.content, objects.test1.el.content, objects.test2.el.content, objects.test3.el.content, objects.txtbox1.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-variance-2",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new varianceTest2Samples().render()