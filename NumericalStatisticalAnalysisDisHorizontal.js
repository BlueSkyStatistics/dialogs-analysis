/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class NumericalStatisticalAnalysisDisHorizontal extends baseModal {
    static dialogId = 'NumericalStatisticalAnalysisDisHorizontal'
    static t = baseModal.makeT(NumericalStatisticalAnalysisDisHorizontal.dialogId)

    constructor() {
        var config = {
            id: NumericalStatisticalAnalysisDisHorizontal.dialogId,
            label: NumericalStatisticalAnalysisDisHorizontal.t('title'),
            modalType: "two",
            RCode: `
require(dplyr)
BSkyResults=NULL
BSkyVars = c({{selected.tvarbox1 | safe}})
for (var in BSkyVars)
{
df <-{{dataset.name}} %>%\n\tdplyr::group_by({{selected.tvarbox2 | safe}})  %>%\n\tdplyr::summarize( count =dplyr::n(),\n\t\tmin = base::min(eval(parse(text=var)), na.rm = TRUE),\n\t\tQuantile_1st_25 =stats::quantile(eval(parse(text=var)),\n\t\t probs = seq(0.25),na.rm=TRUE),\n\t\tmean=base::mean(eval(parse(text=var)),na.rm =TRUE),\n\t\tmedian=stats::median(eval(parse(text=var)),na.rm =TRUE),\n\t\tQuantile_3rd_75 =stats::quantile(eval(parse(text=var)),\n\t\tprobs = seq(0.75), na.rm = TRUE),\n\t\tvariance=stats::var(eval(parse(text=var)),na.rm =TRUE),\n\t\tstd_err=BlueSky::bskystderr(eval(parse(text=var))),\n\t\tskewness=moments::skewness(eval(parse(text=var)),na.rm =TRUE),\n\t\tkurtosis=moments::kurtosis(eval(parse(text=var)),na.rm =TRUE))
#Adding the target variable to the results
df = cbind(TargetVariable=rep(var, nrow(df)),df)
#Transposing the dataframe 
df = t(df)
#Combining the results for each target variable
BSkyResults = cbind (BSkyResults, df)
}
{{if (options.selected.gpbox2 =="vertical")}}BSkyResults =t(BSkyResults)\n{{/if}}
BSkyFormat(BSkyResults, singleTableOutputHeader = "Summaries")
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: NumericalStatisticalAnalysisDisHorizontal.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: NumericalStatisticalAnalysisDisHorizontal.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: NumericalStatisticalAnalysisDisHorizontal.t('label1'), style: "mt-4", h: 6 }) },
            horizontal: {
                el: new radioButton(config, {
                    label: NumericalStatisticalAnalysisDisHorizontal.t('horizontal'),
                    no: "gpbox2",
                    increment: "horizontal",
                    value: "horizontal",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            vertical: {
                el: new radioButton(config, {
                    label: NumericalStatisticalAnalysisDisHorizontal.t('vertical'),
                    no: "gpbox2",
                    increment: "vertical",
                    value: "vertical",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },

        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.label1.el.content,objects.horizontal.el.content, objects.vertical.el.content],
            nav: {
                name: NumericalStatisticalAnalysisDisHorizontal.t('navigation'),
                icon: "icon-sigma-horizontal",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: NumericalStatisticalAnalysisDisHorizontal.t('help.title'),
            r_help: NumericalStatisticalAnalysisDisHorizontal.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: NumericalStatisticalAnalysisDisHorizontal.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new NumericalStatisticalAnalysisDisHorizontal().render()
}
