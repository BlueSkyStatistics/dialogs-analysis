/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const nav = {
    "id": "menu-analysis",
    "buttons": [
        {
            "id": "menu-analysis-association-rules",
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
            "id": "menu-analysis-cluster",
            "icon": "icon-cluster",
            "children": [
                "./hierarchicalCluster",
                "./KMeansCluster"
            ]
        },        
        {
            "id": "menu-analysis-correlations",
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
            "id": "menu-analysis-crosstab",
            "icon": "icon-crosstab",
            "children": [
                "./crossTabMultiWay"
            ]
        },    
        {
            "id": "menu-analysis-distribution-analysis",
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
            "id": "menu-analysis-factor-analysis",
            "icon": "icon-teamwork",
            "children": [
                "./factorAnalysis",
                "./principalComponentAnalysis"
            ]
        },
        {
            "id": "menu-analysis-means",
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
            "id": "menu-analysis-missing-values",
            "icon": "icon-na",
            "children": [
                "./missingValsColOutput",
                "./missingValueAnalysis"
                
            ]
        },
        {
            "id": "menu-analysis-moments",
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
            "id": "menu-analysis-non-parametric",
            "icon": "icon-non_parametric_fix",
            "children": [
                "./chiSquaredTest",
				"./chiSquareAssociationSummarized",
                "./friedmanTest",
                "./kruskalWallisTest",
                "./wilcoxonMannWhitney",
                "./wilcoxonOneSample",
                "./pairedWilcoxon"
            ]
        },
        {
            "id": "menu-analysis-outlier",
            "icon": "icon-outlier",
            "children": [
      
            ]
        },		
        {
            "id": "menu-analysis-proportions",
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
            "id": "menu-analysis-summary",
            "icon": "icon-sigma",
            "children": [
                "./UberSummary",
				"./DatasetDatasetVariables",
                "./frequencyTable"
                            
            ]
        },
        {
			"id": "menu-analysis-survival",
			"icon": "icon-survival",
            "children": [
      
            ]
        },	
        {
            "id": "menu-analysis-tables",
            "icon": "icon-table_basic",
            "children": [
      
            ]
        },	        	
        {
            "id": "menu-analysis-variance",
            "icon": "icon-variance",
            "children": [
                "./bartlettsTest",
                "./leveneTest",
                "./varianceTest2Samples",
                "./equalityOfVariances",
				"./oneSampleVariance"
            ]
        }
    ]
}

module.exports = {
    nav: nav,
    render: () => nav
}
