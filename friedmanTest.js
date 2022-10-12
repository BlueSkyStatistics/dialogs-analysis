
var localization = {
    en: {
        title: "Friedman Test",
        navigation: "Friedman Test",
        tvarbox1: "Response Variables, 2 or more",
        help: {
            title: "Friedman Test",
            r_help: "help(friedman.test, package=stats)",
            body: `
<b>Description</b></br>
Performs a Friedman rank sum test with unreplicated blocked data.
<br/>
<b>Usage</b>
<br/>
<code> 
friedman.test(y, ...)
## Default S3 method:
friedman.test(y, groups, blocks, ...)
## S3 method for class 'formula'
friedman.test(formula, data, subset, na.action, ...)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
y: either a numeric vector of data values, or a data matrix.
</li>
<li>
groups: a vector giving the group for the corresponding elements of y if this is a vector; ignored if y is a matrix. If not a factor object, it is coerced to one.
</li>
<li>
blocks: a vector giving the block for the corresponding elements of y if this is a vector; ignored if y is a matrix. If not a factor object, it is coerced to one.
</li>
<li>
formula: a formula of the form a ~ b | c, where a, b and c give the data values and corresponding groups and blocks, respectively.
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
friedman.test can be used for analyzing unreplicated complete block designs (i.e., there is exactly one observation in y for each combination of levels of groups and blocks) where the normality assumption may be violated.</br>
The null hypothesis is that apart from an effect of blocks, the location parameter of y is the same in each of the groups.
If y is a matrix, groups and blocks are obtained from the column and row indices, respectively. NA's are not allowed in groups or blocks; if y contains NA's, corresponding blocks are removed.</br>
<b>Value</b><br/>
A list with class "htest" containing the following components:<br/>
statistic: the value of Friedman's chi-squared statistic.<br/>
parameter: the degrees of freedom of the approximate chi-squared distribution of the test statistic.<br/>
p.value: the p-value of the test.<br/>
method:the character string "Friedman rank sum test".<br/>
data.name:a character string giving the names of the data.​<br/>
<b>Examples</b><br/>
<code> 
Dataframe <- data.frame(Expenses=c(20,23,19,25,26), Sales=c(48,50,55,51,49), Gender=c('m','f','f','m','m'), Deptt=c('Accounts', 'HR', 'Sales','Marketing','IT'))<br/>
my_samples <- na.omit( with(Dataframe,cbind(Sales,Expenses)))<br/>
Result_Friedman_Test = friedman.test(my_samples)<br/>
</code> <br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(friedman.test, package=stats)
`}
    }
}







class friedmanTest extends baseModal {
    constructor() {
        var config = {
            id: "friedmanTest",
            label: localization.en.title,
            modalType: "two",
            RCode: `
#Handling NAs
BSky_samples <- na.omit( with({{dataset.name}}, cbind({{selected.tvarbox1 | safe}})))
BSky_Median = as.data.frame( t(apply(BSky_samples,2,median)))
#Running the test
BSky_Friedman_Test = friedman.test(BSky_samples)
BSkyFormat(BSky_Median,singleTableOutputHeader = "Medians")
BSkyFormat(BSky_Friedman_Test )
#remove(BSky_Median)
#remove(BSky_Friedman_Test)
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-f",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new friedmanTest().render()