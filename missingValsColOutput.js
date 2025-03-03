/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Missing Value Analysis, column layout",
        navigation:"Column Layout",
        label1: "Displays the results of missing values in columnar format",
        help: {
            title: "Missing Value Analysis",
            r_help: "help(sapply)",
            body: `
            <b>Description</b></br>
            Displays the following information on missing values<br/>
            1. The number of variables and observations in the dataset<br/>
            2. The count of missing values per variable<br/>
            3. The count of non-missing values per variable<br/>
            4. The row numbers of the variables that contain missing values<br/>
            We use several functions in the base package including sapply, which, ifelse<br/>
            <b>Package</b></br>
            base</br>
            <b>Help</b></br>
            For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(sapply) by creating a R code chunk by clicking + in the output window
`}
    }
}



class missingValsColOutput extends baseModal {
    constructor() {
        var config = {
            id: "missingValsColOutput",
            label: localization.en.title,
            modalType: "one",
            RCode: `
BSky_Dataset_Overview = data.frame(Dataset = c("{{dataset.name}}"), Variables = length(names({{dataset.name}})), Observations = nrow({{dataset.name}}))
BSky_Total_Missing_Count = as.data.frame(t(sapply({{dataset.name}}, function(x)(sum(is.na(x))))))
BSky_Total_Count_Excluding_Missing = as.data.frame(t(sapply({{dataset.name}}, function(x)(sum(!is.na(x))))))

BSkyVarNAList = sapply({{dataset.name}},function(x)(which(is.na(x))))
BSkyMaxVarLen <- ifelse((BSkyMaxVarLen=max(sapply(BSkyVarNAList, length)))>1, BSkyMaxVarLen, 1)
BSkyFiller <- c("")
BSky_Row_Num_With_NAs = as.data.frame(do.call(rbind,lapply(BSkyVarNAList, function(x) c(x, rep(BSkyFiller, BSkyMaxVarLen - length(x) ) ))))
names(BSky_Row_Num_With_NAs) = c(rep(c("Row numbers with NAs"), BSkyMaxVarLen))

BSkyFormat(BSky_Dataset_Overview, singleTableOutputHeader=c("Dataset Overview"))
BSkyFormat(BSky_Total_Missing_Count, singleTableOutputHeader=c("Missing Value (NAs) Count Per Variable"))
BSkyFormat(BSky_Total_Count_Excluding_Missing, singleTableOutputHeader=c("Non Missing Value Count Per Variable"))
BSkyFormat(BSky_Row_Num_With_NAs, singleTableOutputHeader=c("Row Numbers for Variables that have NAs"))

#remove(BSky_Dataset_Overview)
#remove(BSky_Total_Missing_Count )
#remove(BSky_Total_Count_Excluding_Missing)
#remove(BSky_Row_Num_With_NAs)
remove(BSkyVarNAList)
remove(BSkyMaxVarLen)
remove(BSkyFiller)
`
}
        var objects = {

            label1: {el: new labelVar(config, {no: 'label1', label: localization.en.label1, h: 9}) },
          }
        const content = {
            items: [objects.label1.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-na_column",
                modal: config.id
            }
        }
        super(config, objects, content);
    }
}
module.exports.item = new missingValsColOutput().render()