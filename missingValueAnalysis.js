
var localization = {
    en: {
        title: "Missing Value Analysis, row layout",
        navigation: "Row layout",
        subsetvars: "Select variable(s) to analyze for missing values",
        chk1: "Sort results by the number of missing values",
        chk2: "Add cumulative sum of missings to the data",
        help: {
            title: "Missing Value Analysis, row layout",
            r_help: "help(miss_var_summary, package ='naniar')",
            body: `
<b>Description</b></br>
Analyzes missing values and displays results in rows, displays summary information of missing values at the variable level and lists the number of missing values on each row for variables being analyzed. </br>
Provide a summary for each variable of the number, percent missings, and cumulative sum of missings of the order of the variables. By default, it orders by the most missings in each variable.
<br/>
<b>Usage</b>
<br/>
<code> 
miss_var_summary(data, order = FALSE, add_cumsum = FALSE, ...)
</code> <br/>
Arguments
<ul>
<li>
data: a dataframe
</li>
<li>
order: a logical indicating whether to order the result by n_miss. Defaults to TRUE. If FALSE, order of variables is the order input.
</li>
<li>
add_cumsum: logical indicating whether or not to add the cumulative sum of missings to the data. This can be useful when exploring patterns of nonresponse. These are calculated as the cumulative sum of the missings in the variables as they are first presented to the function.</br>
</li>
</ul>
<b>Details</b></br>
a tibble of the percent of missing data in each variable<br/>
<b>Package</b></br>
naniar</br>
<b>Help</b></br>
help(miss_var_summary, package ='naniar')<br/><br/>
<b>Description</b></br>
Provide a summary for each case in the data of the number, percent missings, and cumulative sum of missings of the order of the variables. By default, it orders by the most missings in each variable.
<br/>
<b>Usage</b>
<br/>
<code> 
miss_case_summary(data, order = TRUE, add_cumsum = FALSE, ...)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
data: a dataframe
</li>
<li>
order: a logical indicating whether to order the result by n_miss. Defaults to TRUE. If FALSE, order of variables is the order input.
</li>
<li>
add_cumsum: logical indicating whether or not to add the cumulative sum of missings to the data. This can be useful when exploring patterns of nonresponse. These are calculated as the cumulative sum of the missings in the variables as they are first presented to the function.
</li>
</ul>
<b>Values</b><br/>
a tibble of the percent of missing data in each case.<br/>
<b>Package</b></br>
naniar</br>
<b>Help</b></br>
help(miss_case_summary, package ='naniar')
`}
    }
}






class missingValueAnalysis extends baseModal {
    constructor() {
        var config = {
            id: "missingValueAnalysis",
            label: localization.en.title,
            modalType: "two",
            RCode: `
local({
##Run summary analysis on missing values
missVarSummary <-naniar::miss_var_summary(as.data.frame({{dataset.name}}[,c({{selected.subsetvars | safe}})]), order ={{selected.chk1 | safe}}, add_cumsum={{selected.chk2 | safe}})
##Display results in tabular form
BSkyFormat(as.data.frame(missVarSummary), singleTableOutputHeader = "Missing Variable Summary")
##Analyze cases that are missing
missCaseSummary <-naniar::miss_case_summary(as.data.frame({{dataset.name}}[,c({{selected.subsetvars | safe}})]),order ={{selected.chk1 | safe}}, add_cumsum={{selected.chk2 | safe}} )
##Display the results in tabular form
BSkyFormat(as.data.frame(missCaseSummary), singleTableOutputHeader = "Missing Case Summary")
})
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: localization.en.subsetvars,
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            chk1: {
                el: new checkbox(config, {
                    label: localization.en.chk1,
                    no: "chk1",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            chk2: {
                el: new checkbox(config, {
                    label: localization.en.chk2,
                    no: "chk2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.subsetvars.el.content, objects.chk1.el.content, objects.chk2.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-na_row",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new missingValueAnalysis().render()