/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const {getT} = global.requireFromRoot("localization");
let t = getT('menutoolbar')
const nav = () => ({
    "name": t('analysis_top_level_title'),// {ns: 'menutoolbar'}),
    "tab": "analysis",
    "buttons": [
        {
            "name": t('analysis_Association_Rules'),// {ns: 'menutoolbar'}),
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
            "name": t('analysis_Cluster'),// {ns: 'menutoolbar'}),
            "icon": "icon-cluster",
            "children": [
                "./hierarchicalCluster",
                "./KMeansCluster"
            ]
        },        
        {
            "name": t('analysis_Correlations'),// {ns: 'menutoolbar'}),
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
            "name": t('analysis_Crosstab'),// {ns: 'menutoolbar'}),
            "icon": "icon-crosstab",
            "children": [
                "./crossTabMultiWay"
            ]
        },    
        {
            "name": t('analysis_Distribution_Analysis'),// {ns: 'menutoolbar'}),
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
            "name": t('analysis_Factor_Analysis'),// {ns: 'menutoolbar'}),
            "icon": "icon-teamwork",
            "children": [
                "./factorAnalysis",
                "./principalComponentAnalysis"
            ]
        },
        {
            "name": t('analysis_Means'),// {ns: 'menutoolbar'}),
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
            "name": t('analysis_Missing_Values'),// {ns: 'menutoolbar'}),
            "icon": "icon-na",
            "children": [
                "./missingValsColOutput",
                "./missingValueAnalysis"
                
            ]
        },
        {
            "name": t('analysis_Moments'),// {ns: 'menutoolbar'}),
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
            "name": t('analysis_Non_Parametric'),// {ns: 'menutoolbar'}),
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
            "name": t('analysis_Outlier'),// {ns: 'menutoolbar'}),
            "icon": "icon-outlier",
            "children": [
      
            ]
        },		
        {
            "name": t('analysis_Proportions'),// {ns: 'menutoolbar'}),
            "icon": "icon-percent",
            "children": [
                "./binomialTestSingleSample",
                "./proportionTestOneSampleBinomialMini",
                "./proportionTestTwoSampleBinomialMini",
                "./proportionTestSingleSample",
                "./proportionIndependentSamples"				
            ]
        },       
        {
            "name": t('analysis_Summary'),// {ns: 'menutoolbar'}),
            "icon": "icon-sigma",
            "children": [
                "./UberSummary",
				"./DatasetDatasetVariables",
                "./frequencyTable"
                            
            ]
        },
        {
			"name": t('analysis_Survival'),// {ns: 'menutoolbar'}),
			"icon": "icon-survival",
            "children": [
      
            ]
        },	
        {
            "name": t('analysis_Tables'),// {ns: 'menutoolbar'}),
            "icon": "icon-table_basic",
            "children": [
      
            ]
        },	        	
        {
            "name": t('analysis_Variance'),// {ns: 'menutoolbar'}),
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
