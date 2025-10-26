/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const nav = {
    "name": "Analysis",
    "tab": "analysis",
    "buttons": [
        {
            "name": "Association Rules",
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
            "name": "Cluster",
            "icon": "icon-cluster",
            "children": [
                "./hierarchicalCluster",
                "./KMeansCluster"
            ]
        },        
        {
            "name": "Correlations",
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
            "name": "Crosstab",
            "icon": "icon-crosstab",
            "children": [
                "./crossTabMultiWay"
            ]
        },    
        {
            "name": "Distribution Analysis",
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
            "name": "Missing Values",
            "icon": "icon-na",
            "children": [
                "./missingValsColOutput",
                "./missingValueAnalysis"
                
            ]
        },
        {
            "name": "Moments",
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
            "name": "Proportions",
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
            "name": "Summary",
            "icon": "icon-sigma",
            "children": [
                "./UberSummary",
				"./DatasetDatasetVariables",
                "./frequencyTable"
                            
            ]
        },
        {
			"name": "Survival",
			"icon": "icon-survival",
            "children": [
      
            ]
        },	
        {
            "name": "Tables",
            "icon": "icon-table_basic",
            "children": [
      
            ]
        },	        	
        {
            "name": "Variance",
            "icon": "icon-variance",
            "children": [
                "./bartlettsTest",
                "./leveneTest",
                "./varianceTest2Samples",
                "./equalityOfVariances"
                
            ]
        }
    ]
}

module.exports.nav = nav
