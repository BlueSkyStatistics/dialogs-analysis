/**
 * This file is protected by copyright (c) 2023-2026 by BlueSky Statistics, LLC.
 * All rights reserved. The copy, modification, or distribution of this file is not
 * allowed without the prior written permission from BlueSky Statistics, LLC.
 *
 * Dialog: One-Sample Variance (Minitab-like) — UPDATED per request
 *
 * Changes requested:
 * 1) Always run Chi-square method => removed "assume normal distribution" checkbox
 * 2) Always perform hypothesis test => removed checkbox
 * 3) Add two radio buttons:
 *      - Hypothesized Standard Deviation
 *      - Hypothesized Variance
 *    plus one numeric input for the hypothesized value (interpreted per radio)
 * 4) Keep alternate hypothesis options (two-sided / greater / less)
 *
 * R side expectation:
 *   BSky_one_sample_variance(
 *     data_format="wide"/"long",
 *     cols_to_test=..., response_col=..., group_col=...,
 *     conf_level=..., alt_hypothesis=...,
 *     hypoth_type="sd"|"var",
 *     hypoth_value=...,
 *     data_name="Dataset1"
 *   )
 * It should ALWAYS compute BOTH Bonett and Chi-square method outputs and tests.
 */



class oneSampleVariance extends baseModal {
    static dialogId = 'oneSampleVariance'
    static t = baseModal.makeT(oneSampleVariance.dialogId)

  constructor() {
    var config = {
            id: oneSampleVariance.dialogId,
      label: oneSampleVariance.t('title'),
      modalType: "two",

      RCode: `

library(dplyr)
library(tidyr)

{{if(options.selected.gpbox_format =="wide")}}

BSkyOneSampleVar <- BSky_one_sample_variance(
  data_format = "wide",
  cols_to_test = c({{selected.tvarbox_samples | safe}}),
  response_col = NULL,
  group_col = NULL,
  conf_level = {{selected.txt_conf | safe}},
  alt_hypothesis = "{{selected.gpbox_alt | safe}}",
  hypoth_type = "{{selected.gpbox_hyp_type | safe}}",
  hypoth_value = {{selected.txt_hyp_value | safe}},
  data_name = "{{dataset.name}}"
)

{{#else}}

BSkyOneSampleVar <- BSky_one_sample_variance(
  data_format = "long",
  cols_to_test = NULL,
  response_col = c({{selected.tvarbox_response | safe}}),
  group_col = c({{selected.groupvar | safe}}),
  conf_level = {{selected.txt_conf | safe}},
  alt_hypothesis = "{{selected.gpbox_alt | safe}}",
  hypoth_type = "{{selected.gpbox_hyp_type | safe}}",
  hypoth_value = {{selected.txt_hyp_value | safe}},
  data_name = "{{dataset.name}}"
)

{{/if}}

if (exists('BSkyOneSampleVar')) rm(BSkyOneSampleVar)

`
    };

    var objects = {
      // Left
      content_var: { el: new srcVariableList(config, { action: "move" }) },

      // Format
      label_data_format: { el: new labelVar(config, { label: oneSampleVariance.t('label_data_format'), style: "mt-3", h: 6 }) },
      wide: {
        el: new radioButton(config, {
          label: oneSampleVariance.t('wide'),
          no: "gpbox_format",
          increment: "wide",
          value: "wide",
          state: "checked",
          extraction: "ValueAsIs"
        })
      },
      long: {
        el: new radioButton(config, {
          label: oneSampleVariance.t('long'),
          no: "gpbox_format",
          increment: "long",
          value: "long",
          state: "",
          extraction: "ValueAsIs"
        })
      },

      // Wide samples list (Minitab-like)
      label_samples: { el: new labelVar(config, { label: oneSampleVariance.t('label_samples'), style: "mt-2", h: 6 }) },
      tvarbox_samples: {
        el: new dstVariableList(config, {
          label: "",
          no: "tvarbox_samples",
          filter: "Numeric|Scale",
          extraction: "NoPrefix|UseComma|Enclosed"
        })
      },

      // Long mode controls
      tvarbox_response: {
        el: new dstVariable(config, {
          label: oneSampleVariance.t('label_response'),
          no: "tvarbox_response",
          filter: "Numeric|Scale",
          extraction: "NoPrefix|UseComma|Enclosed"
        })
      },
      groupvar: {
        el: new dstVariable(config, {
          label: oneSampleVariance.t('label_group'),
          no: "groupvar",
          filter: "Nominal|Ordinal|Factor",
          extraction: "NoPrefix|UseComma|Enclosed"
        })
      },

      // Hypothesis test controls (ALWAYS ON)
      label_hyp_test: { el: new labelVar(config, { label: oneSampleVariance.t('label_hyp_test'), style: "mt-3", h: 6 }) },

      hyp_sd: {
        el: new radioButton(config, {
          label: oneSampleVariance.t('hyp_sd'),
          no: "gpbox_hyp_type",
          increment: "sd",
          value: "sd",
          state: "checked",
          extraction: "ValueAsIs"
        })
      },
      hyp_var: {
        el: new radioButton(config, {
          label: oneSampleVariance.t('hyp_var'),
          no: "gpbox_hyp_type",
          increment: "var",
          value: "var",
          state: "",
          extraction: "ValueAsIs"
        })
      },

      txt_hyp_value: {
        el: new inputSpinner(config, {
          no: "txt_hyp_value",
          label: oneSampleVariance.t('value_label'),
          min: 0,
          max: 1000000000000,
          step: 0.1,
          value: 1,
          extraction: "NoPrefix|UseComma"
        })
      },

      // Options
      txt_conf: {
        el: new inputSpinner(config, {
          no: "txt_conf",
          label: oneSampleVariance.t('label_conf'),
          min: 0,
          max: 1,
          step: 0.01,
          value: 0.95,
          extraction: "NoPrefix|UseComma"
        })
      },

      label_alt: { el: new labelVar(config, { label: oneSampleVariance.t('label_alt'), style: "mt-2", h: 6 }) },
      alt1: {
        el: new radioButton(config, {
          label: oneSampleVariance.t('alt1'),
          no: "gpbox_alt",
          increment: "twosided",
          value: "two.sided",
          state: "checked",
          extraction: "ValueAsIs"
        })
      },
      alt2: {
        el: new radioButton(config, {
          label: oneSampleVariance.t('alt2'),
          no: "gpbox_alt",
          increment: "greater",
          value: "greater",
          state: "",
          extraction: "ValueAsIs"
        })
      },
      alt3: {
        el: new radioButton(config, {
          label: oneSampleVariance.t('alt3'),
          no: "gpbox_alt",
          increment: "less",
          value: "less",
          state: "",
          extraction: "ValueAsIs"
        })
      }
    };

    const content = {
      left: [objects.content_var.el.content],
      right: [
        objects.label_data_format.el.content,
        objects.wide.el.content,
        objects.long.el.content,

        objects.label_samples.el.content,
        objects.tvarbox_samples.el.content,

        objects.tvarbox_response.el.content,
        objects.groupvar.el.content,

        objects.label_hyp_test.el.content,
        objects.hyp_sd.el.content,
        objects.hyp_var.el.content,
        objects.txt_hyp_value.el.content,

        objects.txt_conf.el.content,
        objects.label_alt.el.content,
        objects.alt1.el.content,
        objects.alt2.el.content,
        objects.alt3.el.content
      ],
      nav: {
        name: oneSampleVariance.t('navigation'),
        icon: "icon-variance",
        modal: config.id
      }
    };

    super(config, objects, content);
    
        this.help = {
            title: oneSampleVariance.t('help.title'),
            r_help: oneSampleVariance.t('help.r_help'), //Fix by Anil //r_help: "help(data,package='utils')",
            body: oneSampleVariance.t('help.body')
        }
;
  }
}


module.exports = {
    render: () => new oneSampleVariance().render()
}

