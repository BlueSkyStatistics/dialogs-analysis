const nav = {
    "name": "Analysis",
    "tab": "analysis",
    "buttons": [
        {
            "name": "Correlations",
            "icon": "icon-link",
            "children": [
                "./correlationTestMultivariable",
                "./polychorserial",
                "./correlationTestMultivariableLegacy",
                "./partialCorrelations",
                "./semipartialCorrelations"

            ]
        },
        "./crossTabMultiWay",
        {
            "name": "Cluster",
            "icon": "icon-cluster",
            "children": [
                "./hierarchicalCluster",
                "./KMeansCluster"
            ]
        },
        {
            "name": "Factor Analysis",
            "icon": "icon-teamwork",
            "children": [
                "./factorAnalysis",
                "./principalComponentAnalysis"
            ]
        },
        {
            "name": "Means",
            "icon": "icon-mean",
            "children": [
                "./ANCOVA",
                "./ANOVAOneWayWithBlocks",
                "./ANOVAOneWayWithRanBlocks",
                "./ANOVAOneWayTwoWay",
                "./ANOVANWay",
                "./repeatedMeasuresAnovaL",  
                "./repeatedMeasuresAnovaW",
                "./MANOVA",                     
                "./ttestIndependentSamples",
                "./ttestIndependentSamplesLegacy",
                "./ttestOneSample",
                "./ttestOneSampleLegacy",
                "./tTestIndependentSamplesTwoNumericVars"
            ]
        },
        {
            "name": "Missing Values",
            "icon": "icon-na",
            "children": [
                "./missingValueAnalysis",
                "./missingValsColOutput"
            ]
        },
        {
            "name": "Moments",
            "icon": "icon-target-1",
            "children": [
                "./Anscombe",
                "./Bonnett",
                "./DAgostino",       
                "./sampleMoment"     
            ]
        },
        "./multiDimensionalScaling",
        {
            "name": "Non-Parametric",
            "icon": "icon-non_parametric_fix",
            "children": [
                "./chiSquaredTest",
                "./friedmanTest",
                "./kruskalWallisTest",
                "./wilcoxonMannWhitney",
                "./wilcoxonOneSample",
                "./pairedWilcoxon"
            ]
        },
        {
            "name": "Normality Test",
            "icon": "icon-gaussian-function",
            "children": [
                "./andersonDarling",
                "./kstest",
                "./shapiroWilkNormalityTest",
                "./shapiroWilkNormalityTestLegacy"            
            ]
        },
       
        {
            "name": "Proportions",
            "icon": "icon-percent",
            "children": [
                "./binomialTestSingleSample",
                "./proportionTestSingleSample",
                "./proportionIndependentSamples"
            ]
        },
        {
            "name": "Summary",
            "icon": "icon-sigma",
            "children": [
                "./frequencyTable",
                "./UberSummary"             
            ]
        },
        {
            "name": "Survival",
            "icon": "icon-survival",
            "children": [
                "./Survival/competingRisksOneGroup",
                "./Survival/KaplanMeierEstimationCompareGroups",
                "./Survival/KaplanMeierEstimationOneGroup"

            ]
        },                
        {
            "name": "Variance",
            "icon": "icon-variance",
            "children": [
                "./bartlettsTest",
                "./leveneTest",
                "./varianceTest2Samples"
            ]
        }
    ]
}

module.exports.nav = nav
