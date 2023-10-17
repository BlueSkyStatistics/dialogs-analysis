
var localization = {
    en: {
        title: "Frequency Table",
        navigation: "Frequencies",
        subsetvars: "Select variables",
        order: "Sort in decending order",
        help: {
            title: "Frequency Table",
            r_help: "help(ftable, package=stats)",
            body: `
<b>Description</b></br>
Generates the frequencies for every unique value in one or more variables or column names selected.
<br/>
<b>Usage</b>
<br/>
<code> 
bfreq=BSkyFrequency( vars = c('var1','var2','var3'),data = "datasetname")
<br/>
BSkyFormat(bfreq)
</code> <br/>
<b>Details</b></br>
This dialog uses following functions:</br>
- ftable()</br>
- summary()</br>
- lapply()</br>
- rbind()</br>
- cbind()</br>
`}
    }
}
class frequencyTable extends baseModal {
    constructor() {
        var config = {
            id: "frequencyTable",
            label: localization.en.title,
            modalType: "two",
            RCode: `
#Run the the frequency command            
{{dataset.name}} %>%
    dplyr::select({{selected.subsetvars | safe}}) %>%
      BSkyFrequency(decreasing = {{selected.order | safe}}) %>%
        BSkyFormat()
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: localization.en.subsetvars,
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            order: {
                el: new checkbox(config, {
                  label: localization.en.order,
                  no: "order",
                  newline: true,
                  extraction: "Boolean",
                  state: "checked"
                })
              },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.subsetvars.el.content,objects.order.el.content ],
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
module.exports.item = new frequencyTable().render()