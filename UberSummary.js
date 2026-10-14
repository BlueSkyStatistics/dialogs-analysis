/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class UberSummary extends baseModal {
    static dialogId = 'UberSummary'
    static t = baseModal.makeT(UberSummary.dialogId)

    constructor() {
        var config = {
            id: UberSummary.dialogId,
            label: UberSummary.t('title'),
            modalType: "two",
            RCode: `
require(psych);
require(dplyr);


# Transpose the grouped "long" stats table into a wide layout.
#
# df           : data frame built by BSkySummaryStats with columns
#                [group cols..., "stats", var1, var2, ...]
#                (group labels are only filled on the first stat row of each
#                group combination; the rest are "")
# n_group_cols : number of grouping variables
# layout       : "var_stat"    -> one row per group combo, columns Var.stat ordered by variable
#                "stat_var"    -> one row per group combo, columns Var.stat ordered by stat
#                "by_var_rows" -> one row per group combo x variable, columns = stats
BSkyGroupedStatsToWide <- function(df, n_group_cols,
                                   layout = c("var_stat", "stat_var", "by_var_rows")) {
    layout     <- match.arg(layout)
    group_cols <- names(df)[seq_len(n_group_cols)]
    var_cols   <- setdiff(names(df), c(group_cols, "stats"))

    df[] <- lapply(df, as.character)

    # 1. Forward-fill blank group labels
    for (g in group_cols) {
        last <- ""
        for (r in seq_len(nrow(df))) {
            if (!is.na(df[r, g]) && df[r, g] != "") {
                last <- df[r, g]
            } else {
                df[r, g] <- last
            }
        }
    }

    # 2. Preserve original order of group combinations and stats
    df$.grp    <- do.call(paste, c(df[group_cols], sep = "\r"))
    grp_order  <- unique(df$.grp)
    stat_order <- unique(df$stats)

    # 3. Long -> tidy (one row per group x stat x variable)
    tidy <- do.call(rbind, lapply(var_cols, function(v) {
        data.frame(.grp = df$.grp, stats = df$stats, variable = v,
                   value = df[[v]], stringsAsFactors = FALSE)
    }))

    # 4. Lookup of group labels, one row per group combo, in original order
    group_lookup <- df[!duplicated(df$.grp), c(".grp", group_cols), drop = FALSE]
    group_lookup <- group_lookup[match(grp_order, group_lookup$.grp), , drop = FALSE]

    if (layout == "by_var_rows") {
        # rows = group combo x variable, columns = stats
        out <- do.call(rbind, lapply(grp_order, function(gk) {
            do.call(rbind, lapply(var_cols, function(v) {
                sub  <- tidy[tidy$.grp == gk & tidy$variable == v, ]
                vals <- sub$value[match(stat_order, sub$stats)]
                row  <- as.data.frame(as.list(vals), stringsAsFactors = FALSE)
                names(row) <- stat_order
                cbind(group_lookup[group_lookup$.grp == gk, group_cols, drop = FALSE],
                      Variable = v, row, row.names = NULL)
            }))
        }))
    } else {
        # rows = group combo, columns = variable x stat
        if (length(var_cols) == 1) {
            combos    <- data.frame(variable = var_cols[1], stats = stat_order,
                                    stringsAsFactors = FALSE)
            col_names <- stat_order
        } else if (layout == "var_stat") {
            combos    <- expand.grid(stats = stat_order, variable = var_cols,
                                     stringsAsFactors = FALSE)
            col_names <- paste(combos$variable, combos$stats, sep = ".")
        } else {
            combos    <- expand.grid(variable = var_cols, stats = stat_order,
                                     stringsAsFactors = FALSE)
            col_names <- paste(combos$variable, combos$stats, sep = ".")
        }

        combo_key <- paste(combos$variable, combos$stats, sep = "\r")
        mat <- do.call(rbind, lapply(grp_order, function(gk) {
            sub <- tidy[tidy$.grp == gk, ]
            sub$value[match(combo_key, paste(sub$variable, sub$stats, sep = "\r"))]
        }))

        out <- data.frame(group_lookup[group_cols], mat, stringsAsFactors = FALSE)
        names(out) <- c(group_cols, col_names)
    }

    # 5. Blank repeated OUTER group labels; always keep the leaf (innermost) filled.
    #    Keys are computed BEFORE any blanking, using the full path down to each level,
    #    so "Good|Batch2" is never confused with "Bad|Batch2".
    n_g  <- length(group_cols)
    keys <- lapply(seq_len(n_g), function(k)
        do.call(paste, c(out[group_cols[seq_len(k)]], sep = "\r")))

    if (n_g > 1) {
        for (k in seq_len(n_g - 1)) {
            out[duplicated(keys[[k]]), group_cols[k]] <- ""
        }
    }

    rownames(out) <- NULL
    out
}


cv <<- function(x, na.rm = TRUE)  {
			sd(x, na.rm = na.rm)/mean(x, na.rm = na.rm)
}


range_spread <<- function(x, na.rm = TRUE)  {
			spread = max(x, na.rm = na.rm) - min(x, na.rm = na.rm)
			invisible(return(spread))
	}


bsky_tmp_stat_tbl = {{dataset.name}} %>%
dplyr::group_by({{selected.tvarbox2 | safe}}) %>%
    dplyr::select({{selected.tvarbox1 | safe}},{{selected.tvarbox2 | safe}}) %>%
        BSkySummaryStats(stats = c(min={{selected.min | safe}}, 
                                        max={{selected.max | safe}}, 
                                        mean={{selected.mean | safe}}, 
                                        median={{selected.median | safe}}, 
                                        sum={{selected.sum | safe}}, 
                                        sd={{selected.sd | safe}}, 
                                        stderror={{selected.stderror | safe}}, 
                                        skew={{selected.skew | safe}},
                                        mad={{selected.mad | safe}},
                                        kurtos={{selected.kurtos | safe}},
                                        iqr={{selected.iqr | safe}}, 
                                        quantiles={{selected.quantile | safe}}), 
                                    quantilesProbs = c({{selected.probs | safe}}), 
                                    {{if (options.selected.ChkboxShowOnlyTopFewFactors=="TRUE")}}maxsum = {{selected.txtNumTopFactorsToShow | safe}}{{#else}}maxsum = 0{{/if}}, datasetName="{{dataset.name}}",
                                    additionalStats = {{selected.addIsstatnames | safe}},
                                    long_table={{selected.longTbl | safe}}) 
									
{{if(options.selected.tvarbox2 === "" || options.selected.longTbl !== "TRUE" )}}
			bsky_tmp_stat_tbl	%>%
					BSkyFormat() 
{{#else}}
			bsky_tmp_stat_tbl[[1]] %>%
						BSkyFormat(outputTableRenames = "Dataset Overview") 
									
			BSkyGroupedStatsToWide(bsky_tmp_stat_tbl[[2]], 
															n_group_cols = length(strsplit('{{selected.tvarbox2 | safe}}', ",")[[1]]),
															layout ="by_var_rows") %>%
																		BSkyFormat(outputTableRenames = "Numerical Statistical Analysis by Variable") 			
{{/if}}	
				
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: UberSummary.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: UberSummary.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },

            label1: { el: new labelVar(config, { label: UberSummary.t('label1'), style: "mt-3", h: 5 }) },
            min: { el: new checkbox(config, { label: UberSummary.t('min'), state:"checked", newline: true, no: "min", extraction: "Boolean" }) },
            max: { el: new checkbox(config, { label: UberSummary.t('max'), state:"checked", newline: true, no: "max", extraction: "Boolean" }) },
            mean: { el: new checkbox(config, { label: UberSummary.t('mean'), state:"checked", newline: true, no: "mean", extraction: "Boolean" }) },
            median: { el: new checkbox(config, { label: UberSummary.t('median'), newline: true,state:"checked", no: "median", extraction: "Boolean" }) },
            sum: { el: new checkbox(config, { label: UberSummary.t('sum'), newline: true, no: "sum", extraction: "Boolean" }) },
            sd: { el: new checkbox(config, { label: UberSummary.t('sd'), newline: true, state:"checked", no: "sd", extraction: "Boolean" }) },
            stderror: { el: new checkbox(config, { label: UberSummary.t('stderror'), newline: true, state:"checked", no: "stderror", extraction: "Boolean" }) },
            skew: { el: new checkbox(config, { label: UberSummary.t('skew'), newline: true, no: "skew", extraction: "Boolean" }) },
            mad: { el: new checkbox(config, { label: UberSummary.t('mad'), newline: true, no: "mad", extraction: "Boolean" }) },
            kurtos: { el: new checkbox(config, { label: UberSummary.t('kurtos'), newline: true, no: "kurtos", extraction: "Boolean" }) },
            iqr: { el: new checkbox(config, { label: UberSummary.t('iqr'), newline: true, no: "iqr", extraction: "Boolean" }) },
            quantiles: { el: new checkbox(config, { label: UberSummary.t('quantiles'), newline: true,state:"checked", no: "quantile", extraction: "Boolean" }) },
            probs: {
                el: new input(config, {
                    no: 'probs',
                    label: UberSummary.t('probs'),
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    allow_spaces: true,
                    value: "0, 0.25, 0.5, 0.75, 1"
                })
            },
            addIsstatnames: {
                el: new input(config, {
                    no: 'addIsstatnames',
                    label: UberSummary.t('addIsstatnames'),
                    placeholder: "",
                    extraction: "CreateArray|RemoveSpaces",
                    allow_spaces: true,
                    value: "cv, var"
                })
            },
            label3: { el: new labelVar(config, { label: UberSummary.t('label3'), style: "mt-2", h: 6 }) },
            ChkboxShowOnlyTopFewFactors: { el: new checkbox(config, { label: UberSummary.t('ChkboxShowOnlyTopFewFactors'), style: "mt-3", dependant_objects: ['txtNumTopFactorsToShow'], no: "ChkboxShowOnlyTopFewFactors", required: true, state:"checked",extraction: "Boolean" }) },
            txtNumTopFactorsToShow: {
                el: new inputSpinner(config, {
                    no: 'txtNumTopFactorsToShow',
                    label: UberSummary.t('txtNumTopFactorsToShow'),
                    style: "ml-2 mb-1",
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { label: UberSummary.t('label2'), style: "mb-3", h: 6 }) },
            longTbl: { el: new checkbox(config, {
                label: UberSummary.t('label4'),
                style: "mt-2",
                no: "longTbl",
                extraction: "Boolean",
            })},            
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            bottom: [objects.label1.el.content, objects.min.el.content, objects.max.el.content, 
                objects.mean.el.content, objects.median.el.content, 
                objects.sum.el.content, objects.sd.el.content, 
                objects.stderror.el.content,objects.skew.el.content,objects.mad.el.content, 
                objects.kurtos.el.content,objects.iqr.el.content, objects.quantiles.el.content, 
                objects.probs.el.content, objects.addIsstatnames.el.content, objects.ChkboxShowOnlyTopFewFactors.el.content, 
                objects.label2.el.content, objects.txtNumTopFactorsToShow.el.content,
                objects.longTbl.el.content,
            ],
            nav: {
                name: UberSummary.t('navigation'),
                icon: "icon-sigma",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: UberSummary.t('help.title'),
            r_help: UberSummary.t('help.r_help'), //Fix by Anil //r_help: "help(data,package='utils')",
            body: UberSummary.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new UberSummary().render()
}
