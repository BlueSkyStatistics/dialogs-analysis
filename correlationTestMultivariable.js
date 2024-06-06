






var localization = {
    en: {
        help: {
            title: "Correlation Analysis",
            r_help: "help(rcorr.adjust, package=RcmdrMisc)",
            body:
                `
<b>Description</b>
This function uses the rcorr function in the Hmisc package to compute matrices of Pearson or Spearman correlations along with the pair wise p-values among the correlations. The p-values are corrected for multiple inference using Holm's method (see p.adjust). Observations are filtered for missing data, and only complete observations are used.
<br/>
<b>Usage</b>
<br/>
        <code> 
rcorr.adjust(x, type = c("pearson", "spearman"), use=c("complete.obs", "pairwise.complete.obs"))
        </code> <br/>
## S3 method for class 'rcorr.adjust'
<br/>
 <code> 
print(x, ...)
 </code> 
  <br />
 <b>Arguments</b>
   <ul>
   <li>
x: a numeric matrix or data frame, or an object of class "rcorr.adjust" to be printed.
</li>
<li>
type: "pearson" or "spearman", depending upon the type of correlations desired; the default is "pearson".
</li>
<li>
use: how to handle missing data: "complete.obs", the default, use only complete cases; "pairwise.complete.obs", use all cases with valid data for each pair.
</li>
<li>
...: not used.
</li>
</ul>
<b>Value</b>
Returns an object of class "rcorr.adjust", which is normally just printed.
`}
    }
}
class correlationTestMultivariable extends baseModal {
    constructor() {
        var config = {
            id: "correlationTestMultivariable",
            label: "Correlation Test",
            modalType: "two",
            RCode: `
require(stats);
require(RcmdrMisc);
require(corrplot);
require(DescTools); 
require(dplyr); 
{{if(options.selected.displayErrorMessage)}}cat("WARNING: More than 2 variables need to be selected for the webplot to display")\n{{/if}}
{{dataset.name}} %>%
dplyr::select({{selected.tvarbox1 | safe}}) %T>%
    BSkyPlotCorrelationMatrix( correlationType = "{{selected.gpbox2 | safe}}",
        visualizeCorrelation = {{selected.visualizeCorrelation | safe}}, 
        plotWeb = {{selected.plotweb | safe}}) %>%
    BSkyCorrelationMatrix(
        correlationType = "{{selected.gpbox2 | safe}}",
        missingValues = "{{selected.gpbox1 | safe}}",
        pValue = "{{selected.gpbox3 | safe}}" ) %>%
            BSkyFormat()            
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox: {
                el: new dstVariableList(config, {
                    label: "Selected variables (at least two)",
                    required: true,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma"
                })
            },
            lable1: { el: new labelVar(config, { label: "Type of correlation", h: 6 , style:"mt-3"}) },
            radio_pearson: { el: new radioButton(config, { label: "Pearson", no: "gpbox2", increment: "pearson", value: "Pearson", state: "checked", extraction: "ValueAsIs" }) },
            radio_spearman: { el: new radioButton(config, { label: "Spearman", no: "gpbox2", increment: "spearman", value: "Spearman", state: "", extraction: "ValueAsIs" }) },
            lable2: { el: new labelVar(config, { label: "Options to handle missing values", h: 6, style:"mt-3" }) },
            radio_cc: { el: new radioButton(config, { label: "Only complete cases", no: "gpbox1", increment: "completeCases", value: "complete.obs", state: "checked", extraction: "ValueAsIs" }) },
            radio_pairwise: { el: new radioButton(config, { label: "Pairwise complete cases", no: "gpbox1", increment: "pairwiseComplete", value: "pairwise.complete.obs", state: "", extraction: "ValueAsIs" }) },
            lable3: { el: new labelVar(config, { label: "Show P value", h: 6, style:"mt-3" }) },
            ajp: { el: new radioButton(config, { label: "Adjusted P value", no: "gpbox3", increment: "adjP", value: "adjP", state: "checked", extraction: "ValueAsIs" }) },
            unajp: { el: new radioButton(config, { label: "Un-Adjusted P value", no: "gpbox3", increment: "unAdjP", value: "unAdjP", state: "", extraction: "ValueAsIs" }) },
            bothp: { el: new radioButton(config, { label: "Both P values", no: "gpbox3", increment: "bothP", value: "bothP", state: "", extraction: "ValueAsIs" }) },
            vis_cor: { el: new checkbox(config, { label: "Visualize correlation matrix", no: "visualizeCorrelation", extraction: "Boolean", style:"mt-3" }) },
            vis_plot: { el: new checkbox(config, { label: "Visualize webPlot", no: "plotweb", newline: true, extraction: "Boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox.el.content, objects.lable1.el.content, objects.radio_pearson.el.content, objects.radio_spearman.el.content,
            objects.lable2.el.content, objects.radio_cc.el.content, objects.radio_pairwise.el.content,
            objects.lable3.el.content, objects.ajp.el.content, objects.unajp.el.content, objects.bothp.el.content,
            objects.vis_cor.el.content, objects.vis_plot.el.content
            ],
            nav: {
                name: "Pearson, Spearman",
                icon: "icon-link",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }

    prepareExecution(instance) {
        var res = [];
        let temp = ""
        let displayErrorMessage =""
        if (instance.objects.tvarbox.el.getVal().length ==2)
        {
            displayErrorMessage =true
        }
        var code_vars = {
            dataset: {
                name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
            },
            selected: instance.dialog.extractData()
        }
        code_vars.selected.displayErrorMessage=false
        if (displayErrorMessage == true && code_vars.selected.plotweb =='TRUE')
        {
            code_vars.selected.plotweb ='FALSE'
            code_vars.selected.displayErrorMessage=displayErrorMessage
        }
        temp = temp + instance.dialog.renderR(code_vars);
        const cmd = temp
        res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`,`${instance.config.label}`), oriR :instance.config.RCode, code_vars : code_vars })
        return res;
    }
}
module.exports.item = new correlationTestMultivariable().render()