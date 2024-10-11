








class crossTabMultiWayLegacy extends baseModal {
    static dialogId = 'crossTabMultiWayLegacy'
    static t = baseModal.makeT(crossTabMultiWayLegacy.dialogId)

    constructor() {
        var config = {
            id: crossTabMultiWayLegacy.dialogId,
            label: "Crosstab",
            modalType: "two",
            splitProcessing:false,
            RCode: `#Create the crosstab
BSky_Multiway_Cross_Tab = BSkyCrossTable(
    x=c({{selected.row | safe}}), y=c({{selected.column | safe}}), 
    {{selected.layer | safe}}{{selected.weight | safe}}datasetname='{{dataset.name}}', 
    chisq={{selected.chisq | safe}}, mcnemar={{selected.mcnemar | safe}}, fisher={{selected.fisher | safe}},
    prop.r={{selected.rowpercent | safe}}, prop.c={{selected.colpercent | safe}},
    resid={{selected.unstandardized | safe}}, sresid={{selected.standardized | safe}}, asresid={{selected.adjusted | safe}},
    expected={{selected.expected | safe}}, long_table = {{selected.longTbl | safe}})
#Display the crosstab in the output grid
BSkyFormat(BSky_Multiway_Cross_Tab)`
        }
        var objects = {
                content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) },
                row: {
                        el: new dstVariableList(config, {
                            label: "Row Variable",
                            no: "row",
                            filter: "Numeric|Ordinal|Nominal",
                            extraction: "NoPrefix|UseComma|Enclosed",
                            required: true
                        })
                    },
                    column: {
                        el: new dstVariableList(config, {
                            label: "Column Variable",
                            no: "column",
                            filter: "Numeric|Ordinal|Nominal",
                            extraction: "NoPrefix|UseComma|Enclosed",
                            required: true
                        })
                    },
                    layer: {
                        el: new dstVariableList(config, {
                            label: "Layer Variable(s)",
                            no: "layer",
                            filter: "Numeric|Ordinal|Nominal|Scale",
                            extraction: "NoPrefix|UseComma|Enclosed",
                            wrapped: 'layers=c(%val%),\n',
                                })
                    },
                    weight: {
                        el: new dstVariable(config, {
                            label: "Weight (one)",
                            no: "weight",
                            filter: "Numeric|Scale",
                            extraction: "NoPrefix|UseComma|Enclosed",
                            wrapped: 'weight=c(%val%),'
                        })},

                        label1: { el: new labelVar(config, { no:"label1", label: "Statistics", h: 5 })},				
                                
                        chisq: {
                                el: new checkbox(config, {
                                            label: "Chisq",
                                            no: "chisq",
                                            extraction: "Boolean",
                                        })
                                        },
                        
                                        
                        mcnemar: {
                                el:	new checkbox(config, {
                                            label: "McNemar",
                                            no: "mcnemar",
                                            extraction: "Boolean",
                                        })
                                        },
                                        
                                        
                            fisher: {
                                el:	 new checkbox(config, {
                                            label: "Fisher",
                                            no: "fisher",
                                            extraction: "Boolean",
                                        })
                                        },
                                        
                                        
                        label2: { el: new labelVar(config, { no:"label2", label: "Residuals", h: 5 })},						
                                        
                    unstandardized: { el: new checkbox(config, {
                                        label: "Unstandardized",
                                        no: "unstandardized",
                                        extraction: "Boolean",
                                    })},
                                    
                        standardized: { el: new checkbox(config, {
                                        label: "Standardized",
                                        no: "standardized",
                                        extraction: "Boolean",
                                    })},
                                    
                                    
                        adjusted: {
                                    el: new checkbox(config, {
                                        label: "Adjusted",
                                        no: "adjusted",
                                        extraction: "Boolean",
                                    })},
                                    
                    
                    label3: { el: new labelVar(config, { no:"label3", label: "Percentages", h: 5 })},	
                                    
                            rowpercent: { el:  new checkbox(config, {
                                        label: "Row",
                                        no: "rowpercent",
                                        extraction: "Boolean",
                                    })},
                                    
                                    
                                    
                                colpercent: { el: new checkbox(config, {
                                        label: "Column",
                                        no: "colpercent",
                                        extraction: "Boolean",
                                    })},
                                    
                                    
                            label4: { el: new labelVar(config, { no:"label4", label: "Counts", h: 5 })},			
                            
                                    
                        expected: { el: new checkbox(config, {
                                        label: "Expected",
                                        no: "expected",
                                        extraction: "Boolean",
                                    })},

                        label5: { el: new labelVar(config, { no:"label5", label: "Long table output format", h: 5 })},			
                
                        
                        longTbl: { el: new checkbox(config, {
                                        label: "Long table",
                                        no: "longTbl",
                                        extraction: "Boolean",
                                    })},
            };
           var advoptions = {
                el: new optionsVar(config, {
                    no: "barchart_options",
                    name: "Options",
                    content: [
                        objects.label1.el,
                        objects.chisq.el,
                        objects.mcnemar.el,
                        objects.fisher.el,
                        objects.label2.el,
                        objects.unstandardized.el,
                        objects.standardized.el,
                        objects.adjusted.el,
                        objects.label3.el,
                        objects.rowpercent.el,
                        objects.colpercent.el,
                        objects.label4.el,
                        objects.expected.el,
                        objects.label5.el,
                        objects.longTbl.el
                    ]
                })
            };
        
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.row.el.content, objects.column.el.content, objects.layer.el.content, objects.weight.el.content],
            bottom: [advoptions.el.content],
            nav: {
                name: "Crosstab (Legacy)",
                icon: "icon-crosstab",
                modal: config.id,
                datasetRequired: true
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: crossTabMultiWayLegacy.t('help.title'),
            r_help: "help(data,package='utils')",
            body: crossTabMultiWayLegacy.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new crossTabMultiWayLegacy().render()
}
