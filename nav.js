// const i18next = require("i18next");
// let t = getT('menutoolbar')
const nav = () => ({
    "name": i18next.t('analysis_top_level_title', {ns: 'menutoolbar'}),
    "tab": "analysis",
    "buttons": [
        {
            "name": i18next.t('analysis_Association_Rules', {ns: 'menutoolbar'}),
            "icon": "icon-shoppingcart_1",
            "children": [
                "./generateRuleBasketData",
                "./ItemFreqPlotBasketData",
                "./targetingItemsBasketData",
                "./generateRuleMultilineData",
                "./ItemFreqPlotMultilineData",
                "./targetingItemsMultilineData",
                "./generateRuleMultiVarFormat",
                "./targetingItemsMultiVarFormat",
                "./displayRules",
                "./plotRules"                                                                
            ]
        }, 
        {
            "name": i18next.t('analysis_Cluster', {ns: 'menutoolbar'}),
            "icon": "icon-cluster",
            "children": [
                "./hierarchicalCluster",
                "./KMeansCluster"
            ]
        },        
        {
            "name": i18next.t('analysis_Correlations', {ns: 'menutoolbar'}),
            "icon": "icon-link",
            "children": [
                "./semipartialCorrelation",
                "./correlationTestMultivariableLegacy",
                "./correlationTestMultivariable",
                "./polychoricPolyserialCorrelations",
                "./partialCorrelation"

            ]
        },
        {
            "name": i18next.t('analysis_Crosstab', {ns: 'menutoolbar'}),
            "icon": "icon-crosstab",
            "children": [
                "./crossTabMultiWay"
            ]
        },    
        {
            "name": i18next.t('analysis_Distribution_Analysis', {ns: 'menutoolbar'}),
            "icon": "icon-gaussian-function",
            "children": [
                "./andersonDarling",
                "./kstest",
                "./shapiroWilkNormalityTest",
                "./shapiroWilkNormalityTestLegacy",
                "./distributionFit",
                "./distributionGamlssAutoFitTests",
                "./distributionDescriptives"
            ]
        },    
      
        {
            "name": i18next.t('analysis_Factor_Analysis', {ns: 'menutoolbar'}),
            "icon": "icon-teamwork",
            "children": [
                "./factorAnalysis",
                "./principalComponentAnalysis"
            ]
        },
        {
            "name": i18next.t('analysis_Means', {ns: 'menutoolbar'}),
            "icon": "icon-mean",
            "children": [
                "./ANCOVA",
                "./ANOVAOneWayTwoWay",
                "./ANOVAOneWayWithRanBlocks",
                "./ANOVAOneWayWithBlocks",
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
            "name": i18next.t('analysis_Missing_Values', {ns: 'menutoolbar'}),
            "icon": "icon-na",
            "children": [
                "./missingValsColOutput",
                "./missingValueAnalysis"
                
            ]
        },
        {
            "name": i18next.t('analysis_Moments', {ns: 'menutoolbar'}),
            "icon": "icon-target-1",
            "children": [
                "./Anscombe",
                "./Bonnett",
                "./agostino",       
                "./sampleMoment"     
            ]
        },
        "./multiDimensionalScaling",
        {
            "name": i18next.t('analysis_Non_Parametric', {ns: 'menutoolbar'}),
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
            "name": i18next.t('analysis_Proportions', {ns: 'menutoolbar'}),
            "icon": "icon-percent",
            "children": [
                "./proportionIndependentSamples",
                "./binomialTestSingleSample",
                "./proportionTestSingleSample",
                "./proportionTestOneSampleBinomialMini",
                "./proportionTestTwoSampleBinomialMini"
            ]
        },       
        {
            "name": i18next.t('analysis_Summary', {ns: 'menutoolbar'}),
            "icon": "icon-sigma",
            "children": [
                "./UberSummary",
				"./DatasetDatasetVariables",
                "./frequencyTable"
                            
            ]
        },
        {
			"name": i18next.t('analysis_Survival', {ns: 'menutoolbar'}),
			"icon": "icon-survival",
            "children": [
      
            ]
        },	
        {
            "name": i18next.t('analysis_Tables', {ns: 'menutoolbar'}),
            "icon": "icon-table_basic",
            "children": [
      
            ]
        },	        	
        {
            "name": i18next.t('analysis_Variance', {ns: 'menutoolbar'}),
            "icon": "icon-variance",
            "children": [
                "./bartlettsTest",
                "./leveneTest",
                "./varianceTest2Samples"
            ]
        }
    ]
})

module.exports = {
    nav: nav(),
    render: () => nav()
}
