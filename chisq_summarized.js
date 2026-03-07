/**
 * This file is protected by copyright (c) 2023-2026 by BlueSky Statistics, LLC.
 * All rights reserved. The copy, modification, or distribution of this file is not
 * allowed without the prior written permission from BlueSky Statistics, LLC.
 *
 * Dialog: Chi-Square Test for Association (Summarized Table) — Minitab-like
 *
 * R side expectation:
 *   BSky_ChiSquare_Association_Summarized(
 *     data,
 *     table_cols,
 *     row_label_col = NULL,
 *     show_counts = TRUE,
 *     show_margins = TRUE,
 *     show_expected = TRUE,
 *     show_raw_residuals = FALSE,
 *     show_std_residuals = FALSE,
 *     show_adj_residuals = FALSE,
 *     show_contrib = TRUE
 *   )
 *
 * This dialog is for summarized tables ONLY (counts in columns).
 */

var localization = {
  en: {
    title: "Chi-Square Test for Association",
    navigation: "Chi-Square Test (Summarized)",

    label_table_cols: "Columns containing the table (counts)",
    label_row_labels: "Row labels (optional)",
    label_cell_contents: "Cell contents",
    label_options: "Options",

    opt_counts: "Counts",
    opt_margins: "Marginal totals",
    opt_expected: "Expected counts",
    opt_raw_resid: "Raw residuals (O − E)",
    opt_std_resid: "Standardized residuals",
    opt_adj_resid: "Adjusted residuals",
    opt_contrib: "Contribution to Chi-square",

    help: {
      title: "Chi-Square Test for Association (Summarized)",
      r_help: "help(chisq.test, package=stats); help(qchisq, package=stats)",
      body: `
<b>Description</b></br>
Performs a Chi-square test for association using a <b>summarized two-way table</b>
where each selected column contains counts for one level of the column variable.</br></br>

<b>Inputs</b></br>
<ul>
  <li><b>Columns containing the table</b>: numeric columns that form the contingency table (counts).</li>
  <li><b>Row labels</b> (optional): a column containing row names/labels (e.g., Yes/No).</li>
</ul>

<b>Outputs</b></br>
<ul>
  <li>Observed counts table</li>
  <li>Cell contents table (Count, Expected, Contribution, Residuals — as selected)</li>
  <li>Chi-square tests (Pearson and Likelihood Ratio)</li>
</ul>

<b>Usage</b></br>
<code>
BSky_ChiSquare_Association_Summarized(</br>
  data = Dataset1,</br>
  table_cols = c('Plant1','Plant2','Plant3'),</br>
  row_label_col = 'Rework',</br>
  show_counts = TRUE,</br>
  show_margins = TRUE,</br>
  show_expected = TRUE,</br>
  show_contrib = TRUE</br>
)</br>
</code>

<b>Help</b></br>
Please contact support@blueskystatistics.com for additional information.
      `
    }
  }
};

class chiSquareAssociationSummarized extends baseModal {
  constructor() {
    var config = {
      id: "chiSquareAssociationSummarized",
      label: localization.en.title,
      modalType: "two",

 RCode: `

library(dplyr)
library(tidyr)

# Build row_label_col argument safely: if not selected => NULL
rowLab <- NULL
{{if (options.selected.row_labels !== undefined && options.selected.row_labels != "")}}
rowLab <- {{selected.row_labels | safe}}
{{/if}}

res <- BSky_ChiSquare_Association_Summarized(
  data = {{dataset.name}},
  table_cols = c({{selected.table_cols | safe}}),
  row_label_col = rowLab,

  show_counts = {{selected.chk_counts | safe}},
  show_margins = {{selected.chk_margins | safe}},
  show_expected = {{selected.chk_expected | safe}},
  show_contrib = {{selected.chk_contrib | safe}},
  show_raw_residuals = {{selected.chk_raw_resid | safe}},
  show_std_residuals = {{selected.chk_std_resid | safe}},
  show_adj_residuals = {{selected.chk_adj_resid | safe}}
)

if (exists('res')){
    # Main combined table (stacked rows)
    if (!is.null(res$CombinedTable)) {
    BSkyFormat(
        res$CombinedTable,
        singleTableOutputHeader="Chi-Square Test for Association: Worksheet rows. Worksheet columns"
    )
    }

    # Chi-square tests table
    if (!is.null(res$ChiSquareTests)) {
    BSkyFormat(
        res$ChiSquareTests,
        singleTableOutputHeader="Chi-Square Test"
    )
    }

    if (exists('res')) rm(res)
}
`

    };

    var objects = {
      // Left: source variable list
      content_var: { el: new srcVariableList(config, { action: "move" }) },

      // Right: table columns (counts)
      label_table_cols: { el: new labelVar(config, { label: localization.en.label_table_cols, style: "mt-2", h: 6 }) },
      table_cols: {
        el: new dstVariableList(config, {
          label: "",
          no: "table_cols",
          filter: "Numeric|Scale",
          extraction: "NoPrefix|UseComma|Enclosed"
        })
      },

      // Optional row labels
      label_row_labels: { el: new labelVar(config, { label: localization.en.label_row_labels, style: "mt-3", h: 6 }) },
      row_labels: {
        el: new dstVariable(config, {
          label: "",
          no: "row_labels",
          // allow Factor/Ordinal/Nominal/Text (some datasets store labels as text)
          filter: "Nominal|Ordinal|Factor|Text",
          extraction: "NoPrefix|UseComma|Enclosed"
        })
      },

      // Cell contents
      label_cell_contents: { el: new labelVar(config, { label: localization.en.label_cell_contents, style: "mt-3", h: 6 }) },

      chk_counts: {
        el: new checkbox(config, {
          label: localization.en.opt_counts,
          no: "chk_counts",
          state: "checked",
          extraction: "Boolean"
        })
      },
      chk_margins: {
        el: new checkbox(config, {
          label: localization.en.opt_margins,
          no: "chk_margins",
          state: "checked",
          extraction: "Boolean"
        })
      },
      chk_expected: {
        el: new checkbox(config, {
          label: localization.en.opt_expected,
          no: "chk_expected",
          state: "checked",
          extraction: "Boolean"
        })
      },
      chk_contrib: {
        el: new checkbox(config, {
          label: localization.en.opt_contrib,
          no: "chk_contrib",
          state: "checked",
          extraction: "Boolean"
        })
      },

      // Residual options (off by default)
      chk_raw_resid: {
        el: new checkbox(config, {
          label: localization.en.opt_raw_resid,
          no: "chk_raw_resid",
          state: "",
          extraction: "Boolean"
        })
      },
      chk_std_resid: {
        el: new checkbox(config, {
          label: localization.en.opt_std_resid,
          no: "chk_std_resid",
          state: "",
          extraction: "Boolean"
        })
      },
      chk_adj_resid: {
        el: new checkbox(config, {
          label: localization.en.opt_adj_resid,
          no: "chk_adj_resid",
          state: "",
          extraction: "Boolean"
        })
      }
    };

    const content = {
      left: [objects.content_var.el.content],
      right: [
        objects.label_table_cols.el.content,
        objects.table_cols.el.content,

        objects.label_row_labels.el.content,
        objects.row_labels.el.content,

        objects.label_cell_contents.el.content,
        objects.chk_counts.el.content,
        objects.chk_margins.el.content,
        objects.chk_expected.el.content,
        objects.chk_contrib.el.content,
        objects.chk_raw_resid.el.content,
        objects.chk_std_resid.el.content,
        objects.chk_adj_resid.el.content
      ],
      nav: {
        name: localization.en.navigation,
        icon: "icon-chi-square",
        modal: config.id
      }
    };

    super(config, objects, content);
    this.help = localization.en.help;
  }
}

module.exports.item = new chiSquareAssociationSummarized().render();
