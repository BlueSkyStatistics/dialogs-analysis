
var localization = {
    en: {
       // navigation: "Factors, top N",
       navigation: "Factors Only (Legacy)",
     //   title: "Factor Variable Analysis, top N",
     title: "Summaries, factors only",
        subsetvars: "Response variables, 2 or more",
        ChkboxShowOnlyTopFewFactors: "Show counts for only top N factor levels",
        txtNumTopFactorsToShow: "Enter a value for N",
        label1: "Note: When the checkbox is un-checked counts for ALL levels will be displayed. This may take a considerable amount of time if you have many factor levels",
        help: {
            title: "Factors only",
            r_help: "",
            body: `
<b>Description</b></br>
Displays the counts of every level of each factor variable.
<br/>
<b>Usage</b>
<br/>
<code> 
bfacvar = BSkyFactorVariableAnalysis (vars=c("var1,"var2","var3"), data="datasetname", show.only.top.factors=TRUE, max.number.top.factors=30)
<br/>
BSkyFormat(bfacvar)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
vars: The factor variables to display level counts
</li>
<li>
data: The dataset name
</li>
<li>
show.only.top.factors: A boolean determining whether counts of only top levels or all levels should be displayed.
</li>
<li>
max.number.top.factors: if show.only.top.factors = TRUE , specifies the number of levels to display counts for
</li>
</ul>
`}
    }
}








class frequencyForFactorsTopN extends baseModal {
    constructor() {
        var config = {
            id: "frequencyForFactorsTopN",
            label: localization.en.title,
            modalType: "two",
            RCode: `
bfacvar = BSkyFactorVariableAnalysis (vars=c({{selected.subsetvars | safe}}), data={{dataset.name}}, show.only.top.factors={{selected.ChkboxShowOnlyTopFewFactors | safe}}, max.number.top.factors={{selected.txtNumTopFactorsToShow | safe}})
BSkyFormat(bfacvar)
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: localization.en.subsetvars,
                    no: "subsetvars",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            ChkboxShowOnlyTopFewFactors: { el: new checkbox(config, { label: localization.en.ChkboxShowOnlyTopFewFactors, dependant_objects: ['txtNumTopFactorsToShow'], no: "ChkboxShowOnlyTopFewFactors", checked: true, extraction: "Boolean" }) },
            txtNumTopFactorsToShow: {
                el: new inputSpinner(config, {
                    no: 'txtNumTopFactorsToShow',
                    label: localization.en.txtNumTopFactorsToShow,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style: "mb-3",h: 6 }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.subsetvars.el.content, objects.ChkboxShowOnlyTopFewFactors.el.content, objects.label1.el.content, objects.txtNumTopFactorsToShow.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-fn",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new frequencyForFactorsTopN().render()