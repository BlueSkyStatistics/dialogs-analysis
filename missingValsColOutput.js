/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */






class missingValsColOutput extends baseModal {
    static dialogId = 'missingValsColOutput'
    static t = baseModal.makeT(missingValsColOutput.dialogId)

    constructor() {
        var config = {
            id: missingValsColOutput.dialogId,
            label: missingValsColOutput.t('title'),
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

            label1: {el: new labelVar(config, {no: 'label1', label: missingValsColOutput.t('label1'), h: 9}) },
          }
        const content = {
            items: [objects.label1.el.content],
            nav: {
                name: missingValsColOutput.t('navigation'),
                icon: "icon-na_column",
                modal: config.id
            }
        }
        super(config, objects, content);
    }
}

module.exports = {
    render: () => new missingValsColOutput().render()
}
