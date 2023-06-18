var localization = {
    en: {
        title: "SEM",
        modelname: "Enter a name of the model",
        navigation: "SEM",
        modelTermsDst: "Relationship",
        modelTerms: "Predictor",
        modelTerms1: "Outcome",
        sem: "Latent variables",
        sem_model_terms: "Structural parameters",
        semSuppCtrl: "First order factors",
        sem2: "Second order factors",
        label1: "Select an item from the predictor and the outcome lists and click on the button with an arrow to move the selected items to the relationship list",
        label2: "Select an item from the predictor and the outcome lists and click on the button with an arrow to move the selected items to the relationship list",
        coVarTerms: "1st variable/factor",
        coVarTerms1: "2nd variable/factor",
        coVarDst: "Selected covariances",
        optionsCoVarTerms: "Covariances",
        parameterizeFormula: "Parameterize formula",
        help: {
            title: "SEM",
            r_help: "help(sem, package=lavaan)",
            body: `
<b>Description</b></br>
Performs Bartlett's test of the null that the variances in each of the groups (samples) are the same.
<br/>
<b>Usage</b>
<br/>
<code>
bartlett.test(x, ...)</br>
## Default S3 method:</br>
bartlett.test(x, g, ...)</br>
## S3 method for class 'formula'</br>
bartlett.test(formula, data, subset, na.action, ...)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
Arguments
x: a numeric vector of data values, or a list of numeric data vectors representing the respective samples, or fitted linear model objects (inheriting from class "lm").
</li>
<li>
g: a vector or factor object giving the group for the corresponding elements of x. Ignored if x is a list.
</li>
<li>
formula: a formula of the form lhs ~ rhs where lhs gives the data values and rhs the corresponding groups.
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
If x is a list, its elements are taken as the samples or fitted linear models to be compared for homogeneity of variances. In this case, the elements must either all be numeric data vectors or fitted linear model objects, g is ignored, and one can simply use bartlett.test(x) to perform the test. If the samples are not yet contained in a list, use bartlett.test(list(x, ...)).</br>
Otherwise, x must be a numeric data vector, and g must be a vector or factor object of the same length as x giving the group for the corresponding elements of x.</br>
<b>Value</b><br/>
A list of class "htest" containing the following components:<br/>
statistic: Bartlett's K-squared test statistic.<br/>
parameter: the degrees of freedom of the approximate chi-squared distribution of the test statistic.<br/>
p.value: the p-value of the test.<br/>
method: the character string "Bartlett test of homogeneity of variances".<br/>
data.name: a character string giving the names of the data.<br/>
<b>Examples</b><br/>
<code>
Dataset <- data.frame(Age=c(20,23,19,25,26), Weight=c(48,50,55,51,49), Gender=c('m','f','f','m','m' ))
Result_Bartlett_Test = bartlett.test(sales ~ interaction(Dataset$Gender),data=Dataset)
</code> <br/>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
help(bartlett.test, package=stats)
`}
    }
}

class sem extends baseModal {
    constructor() {
        var config = {
            id: "sem",
            label: localization.en.title,
            modalType: "two",
            parameterCount: 0,
            RCode: `
require(lavaan)
require(semPlot)        
{{selected.modelname | safe}} <- '{{selected.sem | safe}} {{selected.modelTermsDst | safe}} {{selected.coVarDst | safe}}'
\nBSkyRes <- {{if (options.selected.useSemFunction)}}sem{{#else}}cfa{{/if}}({{selected.modelname | safe}}, data = {{dataset.name}})
summary(BSkyRes, fit.measures = TRUE)
semPaths(BSkyRes)
`
        }
        var objects = {
            modelname: {
                el: new input(config, {
                    no: 'modelname',
                    label: localization.en.modelname,
                    placeholder: "",
                    required: true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "Sem1",
                    overwrite: "dataset"
                })
            },
            content_var: { el: new srcVariableList(config, {action: "move", semMain:true}) },
            parameterizeFormula: {
                el: new checkbox(config, {
                  label: localization.en.parameterizeFormula,
                  no: "chk1",
                  style: "mb-2",
                  extraction: "Boolean",
                  state: "checked",
                  parameterizeFormula: true
                })
              },
            sem: {
                el: new semControl(config, {
                    no: "sem",
                    label: localization.en.sem,
                    filter: "Numeric|Date|Logical|Scale|semFactor",
                    extraction: "NoPrefix|UsePlus",
                    required: false,
                    suppCtrlIds:["semSuppCtrl", "modelTerms", "modelTerms1", "coVarTerms", "coVarTerms1"]
                }), r: ['{{ var | safe}}']
            },
            semSuppCtrl: { el: new semSuppCtrl(config, {action: "move",
                no:"semSuppCtrl", label: localization.en.semSuppCtrl}) },
            sem2: {
                    el: new semControl(config, {
                        label:localization.en.sem2,
                        no: "sem2",
                        filter: "Numeric|Date|Logical|Scale|semFactor",
                        extraction: "NoPrefix|UsePlus",
                        required: false,
                    }), r: ['{{ var | safe}}']
                },
            label1: {
                    el: new labelVar(config, {
                      label: localization.en.label1,
                    })
                  },
            label2: {
                    el: new labelVar(config, {
                      label: localization.en.label1,
                    })
                  },
            modelTerms: { el: new semModelTerms(config, {action: "move",
                no:"modelTerms", label: localization.en.modelTerms}) },
            modelTerms1: { el: new semModelTerms(config, {action: "move",
                  no:"modelTerms1", label: localization.en.modelTerms1}) },
            modelTermsDst: { el: new semModelTermsDest(config, {action: "move",
                  no:"modelTermsDst", label: localization.en.modelTermsDst,  filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",  extraction: "modelTerms",firstModelTermCtrl: "modelTerms", secondModelTermCtrl: "modelTerms1"}) },
            coVarTerms: { el: new semModelTerms(config, {action: "move",
                  no:"coVarTerms", label: localization.en.coVarTerms}) },
            coVarTerms1: { el: new semModelTerms(config, {action: "move",
                    no:"coVarTerms1", label: localization.en.coVarTerms1}) },
            coVarDst: { el: new semModelTermsDest(config, {action: "move",
                    no:"coVarDst", label: localization.en.coVarDst,  filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",  extraction: "coVariances",firstModelTermCtrl: "coVarTerms", secondModelTermCtrl: "coVarTerms1"}) },
        }
        var secOrderFactors = {
            el: new optionsVar(config, {
                no: "sem_options",
                name: "Second order factors",
                layout: "two",
                left: [
                     objects.semSuppCtrl.el,
                 ],
                right: [
                   objects.sem2.el
                ],
            })
        };       
        var optionsModelTerms = {
            el: new optionsVar(config, {
                no: "sem_model_terms",
                name: localization.en.sem_model_terms,
                layout: "three",
                top: [objects.label1.el,],
                left: [
                     objects.modelTerms.el,
                ],
                center: [
                    objects.modelTerms1.el,
                ],
                right: [  
                    objects.modelTermsDst.el,
                ],
            })
        };
        var optionsCoVarTerms = {
            el: new optionsVar(config, {
                no: "optionsCoVarTerms",
                name: localization.en.optionsCoVarTerms,
                layout: "three",
                top: [objects.label2.el,],
                left: [ 
                    objects.coVarTerms.el,
                ],
                center: [
                    objects.coVarTerms1.el,
                ],
                right: [
                    objects.coVarDst.el,
                ],
            })
        };  
        const content = {
            head:[objects.modelname.el.content],
            left: [objects.content_var.el.content],
            right: [objects.parameterizeFormula.el.content, objects.sem.el.content ],
            bottom: [ secOrderFactors.el.content, optionsModelTerms.el.content, optionsCoVarTerms.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-b",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
    prepareExecution(instance)
    {
        var res = [];
        var code_vars = {
            dataset: {
                name: $(`#${instance.config.id}`).attr('dataset') ? $(`#${instance.config.id}`).attr('dataset') : getActiveDataset()
            },
            selected: instance.dialog.extractData()
        }
        code_vars.selected.useSemFunction = true
        if ( code_vars.selected.modelTermsDst.length ==0 && code_vars.selected.sem.length ==0 )
        {  
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Required controls not populated", message: `You need to specify latent traits or a relationship.`})
            return res
        } else if ( code_vars.selected.modelTermsDst.length ==0  )
        {
            code_vars.selected.useSemFunction = false
        } else if ( code_vars.selected.sem.length ==0  )
        {
            code_vars.selected.useSemFunction = true
        } else {
            code_vars.selected.useSemFunction = true
        }
            const cmd = instance.dialog.renderR(code_vars);
            res.push({ cmd: cmd, cgid: newCommandGroup() })
            return res;
       
       
    }
}
module.exports.item = new sem().render()
