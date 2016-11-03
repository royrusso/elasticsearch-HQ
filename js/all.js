﻿/*! 
 * ElasticHQ
 * Version: 0.99.1
 * Build Date: 11-04-2015
 * Home: http://www.elastichq.org
 * Copyright: (c) 2015, Roy Russo
 * License: Apache License 
 */

function NodeInfoModelFactory() {
    this.create = function (a) {
        var b = new NodeInfoModel({
            nodeId: a,
            connectionRootURL: cluster.get("connectionRootURL")
        });
        if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
            return b.url = function () {
                return a ? "/_nodes/" + a + "/_all" : "/_nodes/_all"
            }, b
        }
        if (versionUtil.isNewer("0.99.0", cluster.versionNumber.concat)) {
            return b.url = function() {
                return a ? "/_nodes/" + a + "?all=true" : "/_nodes?all=true"
            }, b
        }
        return b
    }
}

function NodeStatsModelFactory() {
    this.create = function(a) {
        var b = new NodeStatsModel({
            nodeId: a,
            connectionRootURL: cluster.get("connectionRootURL")
        });
        if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
            return b.url = function () {
                return "/_nodes/" + this.nodeId + "/stats/_all"
            }, b
        }
        if (versionUtil.isNewer("0.99.0", cluster.versionNumber.concat)) {
            return b.url = function() {
                return "/_nodes/" + this.nodeId + "/stats?all=1"
            }, b
        }
        return b
    }
}

function NodeStatsListModelFactory() {
    this.create = function(a) {
        var b = new NodeStatsListModel({
            connectionRootURL: cluster.get("connectionRootURL"),
            selectedNodes: a
        });
        if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
            return b.url = function () {
                var a = this.get("selectedNodes");
                if (void 0 == a || 0 === a.length) return "/_nodes/stats/_all";
                for (var b = "", c = 0; c < a.length; c++) b += a[c], a.length - 1 > c && (b += ",");
                return "/_nodes/" + b + "/stats/_all"
            }, b
        }
        if (versionUtil.isNewer("0.99.0", cluster.versionNumber.concat)) {
            return b.url = function() {
                var a = this.get("selectedNodes");
                if (void 0 == a || 0 === a.length) return "/_nodes/stats?all=1";
                for (var b = "", c = 0; c < a.length; c++) b += a[c], a.length - 1 > c && (b += ",");
                return "/_nodes/" + b + "/stats?all=1"
            }, b
        }
        return b
    }
}

function NodeInfoListModelFactory() {
    this.create = function(a) {
        var b = new NodeInfoListModel({
            connectionRootURL: cluster.get("connectionRootURL"),
            selectedNodes: a
        });
        if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
            return b.url = function () {
                var a = this.get("selectedNodes");
                if (void 0 == a || 0 === a.length) return "/_nodes/_all";
                for (var b = "", c = 0; c < a.length; c++) b += a[c], a.length - 1 > c && (b += ",");
                return "/_nodes/" + b + "/_all"
            }, b
        }
        if (versionUtil.isNewer("0.99.0", cluster.versionNumber.concat)) {
            return b.url = function() {
                var a = this.get("selectedNodes");
                if (void 0 == a || 0 === a.length) return "/_nodes?all=1";
                for (var b = "", c = 0; c < a.length; c++) b += a[c], a.length - 1 > c && (b += ",");
                return "/_nodes/" + b + "?all=1"
            }, b
        }
        return b
    }
}

function RESTModelFactory() {
    this.create = function(a) {
        var b = new RESTModel({
            connectionRootURL: cluster.get("connectionRootURL"),
            cmd: a
        });
        if (versionUtil.isNewerOrEqual("5.0.0", cluster.get("versionNumber").concat)) {
            return b.url = function () {
                return this.fetchURL = "health" == this.cmd ? "/_cluster/health" : "state" == this.cmd ? "/_cluster/state" : "cluster_settings" == this.cmd ? "/_cluster/settings" : "ping" == this.cmd ? "/" : "nodeinfo" == this.cmd ? "/_nodes/_all" : "nodestats" == this.cmd ? "/_nodes/stats/_all" : "indexaliases" == this.cmd ? "/_aliases" : "indexsettings" == this.cmd ? "/_settings" : "indexstats" == this.cmd ? "/_stats/_all" : "indexstatus" == this.cmd ? "/_status" : "indexsegments" == this.cmd ? "/_segments" : "indexmappings" == this.cmd ? "/_mapping" : "indexrefresh" == this.cmd ? "/_refresh" : "indexflush" == this.cmd ? "/_flush" : "indexoptimize" == this.cmd ? "/_optimize" : "indexclearcache" == this.cmd ? "/_cache/clear" : "/", this.fetchURL
            }, b
        }
        if (versionUtil.isNewer("0.99.0", cluster.get("versionNumber").concat)) {
            return b.url = function() {
                return this.fetchURL = "health" == this.cmd ? "/_cluster/health" : "state" == this.cmd ? "/_cluster/state" : "cluster_settings" == this.cmd ? "/_cluster/settings" : "ping" == this.cmd ? "/" : "nodeinfo" == this.cmd ? "/_nodes?all=true" : "nodestats" == this.cmd ? "/_nodes/stats?all=1" : "indexaliases" == this.cmd ? "/_aliases" : "indexsettings" == this.cmd ? "/_settings" : "indexstats" == this.cmd ? "/_stats?all=true" : "indexstatus" == this.cmd ? "/_status" : "indexsegments" == this.cmd ? "/_segments" : "indexmappings" == this.cmd ? "/_mapping" : "indexrefresh" == this.cmd ? "/_refresh" : "indexflush" == this.cmd ? "/_flush" : "indexoptimize" == this.cmd ? "/_optimize" : "indexclearcache" == this.cmd ? "/_cache/clear" : "/", this.fetchURL
            }, b
        }
        return b
    }
}

function MappingsModelFactory() {
    this.create = function() {
        if (versionUtil.isNewer("0.99.0", cluster.versionNumber.concat)) {
            var a = new MappingsModel;
            return a.parse = function(a) {
                for (var b = [], c = _.keys(a), d = _.values(a), e = 0; e < c.length; e++)
                    for (var f = c[e], g = _.keys(d[e]), h = _.values(d[e]), i = 0; i < g.length; i++)
                        if ("mappings" == g[i])
                            for (var j = _.keys(h[i]), k = _.values(h[i]), l = 0; l < j.length; l++) {
                                var m = new MappingSimple;
                                m.indexId = f, m.mappingName = j[l], m.properties = k[l].properties, b.push(m)
                            }
                        return b
            }, a
        }
        return new MappingsModel
    }
}

function MapTypeViewFactory() {
    this.create = function(a) {
        if (versionUtil.isNewer("0.99.0", cluster.versionNumber.concat)) {
            var b = new MapTypeView({
                model: a
            });
            return b.render = function() {
                var a = this.model.model.toJSON(),
                    b = {};
                b.indexId = a.indexId, b.mappingName = a.mappingName;
                var c = a[a.indexId].mappings[a.mappingName].properties,
                    d = _.template(mappingTemplate.mapView, {
                        props: c,
                        mapType: b
                    });
                $("#workspace").html(d), $("[rel=popRight]").popover()
            }, b
        }
        return new MapTypeView({
            model: a
        })
    }
}

function calculateRuleValue(a, b, c, d) {
    var e = "N/A";
    return void 0 !== a && void 0 !== b && (e = lookupValue(a, b), void 0 !== d && (e = Formats[d](void 0 !== e ? e : 0)), void 0 !== c && (e = e + " " + c)), e
}

function calculateCellClass(a, b) {
    var c = lookupValue(a, b.value);
    return void 0 === c && (c = 0), b.upper_limit ? c <= b.upper_limit[0] ? "success" : c <= b.upper_limit[1] ? "warning" : "error" : b.lower_limit ? 3 === b.lower_limit.length && 0 === c ? "success" : c >= b.lower_limit[0] ? "success" : c >= b.lower_limit[1] ? "warning" : "error" : ""
}

function makeDiagnosticsPopOver(a, b) {
    var c = "";
    c = '<ul style="font-size: 13px;">', b.comment && (c = c + '<div class="alert alert-info"><i class="icon-info-sign"></i> ' + b.comment + "</div>"), void 0 !== b.formula ? c = c + "<li><b>Keys: </b> " + b.formula + "</li>" : (c = c + "<li><b>Keys: </b> " + b.value + "</li>", b.formula = b.value, b.formulaKeys = b.value), c += "<li><b>Value: </b> ";
    var d = 0,
        e = b.formula;
    if (void 0 !== b.formulaKeys) {
        e = b.formula;
        var f = b.formulaKeys.split(/@@/);
        for (i = 0; i < f.length; i++) {
            var g = f[i],
                h = lookupValue(a, g);
            void 0 === h && (h = 0), e = e.replace(g, h)
        }
    }
    try {
        d = Parser.evaluate(e)
    } catch (j) {}
    return (isNaN(d) || !isFinite(d)) && (d = 0), c = b.calc !== !1 ? c + e + " = " + d + "</li>" : c + e + "</li>", b.upper_limit && (c += "<li><b>Thresholds:</b> ", c = c + "<ul><li>" + d + " <= " + b.upper_limit[0] + " = Pass!</li>", c = c + "<li>" + d + " <= " + b.upper_limit[1] + " = Warning!</li></ul>", c += "</li>"), b.lower_limit && (c += "<li><b>Thresholds:</b> ", c = c + "<ul><li>" + d + " >= " + b.lower_limit[0] + " = Pass!</li>", c = c + "<li>" + d + " >= " + b.lower_limit[1] + " = Warning!</li></ul>", c += "</li>"), c += "</ul>"
}

function general_rules() {
    return [{
        label: "Node Name:",
        value: "stats.name",
        formula: "stats.name",
        formulaKeys: "stats.name",
        calc: !1
    }, {
        label: "IP Address:",
        value: "stats.transport_address",
        formula: "stats.transport_address",
        formulaKeys: "stats.transport_address",
        calc: !1
    }, {
        label: "Node ID:",
        value: "id",
        formula: "id",
        formulaKeys: "id",
        calc: !1
    }, {
        label: "ES Uptime:",
        value: "stats.jvm.uptime",
        formula: "stats.jvm.uptime_in_millis/1000/60/60/24",
        formulaKeys: "stats.jvm.uptime_in_millis",
        unit: "days"
    }]
}

function fs_rules() {
    return [{
        label: "Store Size:",
        value: "stats.storeSize",
        formula: "stats.indices.store.size_in_bytes",
        formulaKeys: "stats.indices.store.size_in_bytes",
        calc: !1
    }, {
        label: "# Documents:",
        value: "stats.indices.docs.count",
        formula: "stats.indices.docs.count",
        formulaKeys: "stats.indices.docs.count",
        format: "comma",
        calc: !1
    }, {
        label: "Documents Deleted:",
        value: "stats.docsdeletedperc",
        formula: "stats.indices.docs.deleted / stats.indices.docs.count",
        formulaKeys: "stats.indices.docs.deleted@@stats.indices.docs.count",
        comment: "High values indicate insufficient merging.<br/>Slow I/O?",
        format: "pct",
        upper_limit: ["0.1", "0.25"]
    }, {
        label: "Merge Size:",
        value: "stats.mergeSize",
        formula: "stats.indices.merges.total_size_in_bytes",
        formulaKeys: "stats.indices.merges.total_size_in_bytes",
        calc: !1
    }, {
        label: "Merge Time:",
        value: "stats.mergeTime",
        formula: "stats.indices.merges.total_time_in_millis",
        formulaKeys: "stats.indices.merges.total_time_in_millis",
        calc: !1
    }, {
        label: "Merge Rate:",
        unit: "MB/s",
        comment: "Low rates indicate throttling or slow I/O",
        format: "float",
        value: "stats.mergerate",
        formula: "stats.indices.merges.total_size_in_bytes / stats.indices.merges.total_time_in_millis / 1000",
        formulaKeys: "stats.indices.merges.total_size_in_bytes@@stats.indices.merges.total_time_in_millis"
    }, {
        label: "File Descriptors:",
        format: "comma",
        value: "stats.process.open_file_descriptors",
        formula: "stats.process.open_file_descriptors",
        formulaKeys: "stats.process.open_file_descriptors",
        calc: !1
    }, {
        label: "Disk space used:",
        value: "stats.diskSpaceUsed",
        formula: "(stats.fs.total.total_in_bytes - stats.fs.total.free_in_bytes) / stats.fs.total.total_in_bytes",
        formulaKeys: "stats.fs.total.free_in_bytes@@stats.fs.total.total_in_bytes@@stats.fs.total.total_in_bytes",
        format: "pct",
        upper_limit: ["0.8", "0.95"]
    }, {
        label: "Disk space free:",
        value: "stats.diskFree",
        formula: "stats.fs.total.free_in_bytes",
        formulaKeys: "stats.fs.total.free_in_bytes",
        calc: !1
    }]
}

function action_rules() {
    return [{
        label: "Indexing - Index:",
        comment: "High values indicate complex documents or slow I/O or CPU.",
        format: "ms",
        value: "stats.indexindexing",
        formula: "stats.indices.indexing.index_time_in_millis / stats.indices.indexing.index_total",
        formulaKeys: "stats.indices.indexing.index_time_in_millis@@stats.indices.indexing.index_total",
        upper_limit: ["10", "50"]
    }, {
        label: "Indexing - Delete:",
        comment: "High values indicate slow I/O.",
        format: "ms",
        value: "stats.indexdelete",
        formula: "stats.indices.indexing.delete_time_in_millis / stats.indices.indexing.delete_total",
        formulaKeys: "stats.indices.indexing.delete_time_in_millis@@stats.indices.indexing.delete_total",
        upper_limit: ["5", "10"]
    }, {
        label: "Search - Query:",
        comment: "High values indicate complex or inefficient queries, insufficient use of filters, insufficient RAM for caching, slow I/O or CPU.",
        format: "ms",
        value: "stats.searchquery",
        formula: "stats.indices.search.query_time_in_millis / stats.indices.search.query_total",
        formulaKeys: "stats.indices.search.query_time_in_millis@@stats.indices.search.query_total",
        upper_limit: ["50", "500"]
    }, {
        label: "Search - Fetch:",
        comment: "High values indicate slow I/O, large docs, or fetching too many docs, eg deep paging.",
        format: "ms",
        value: "stats.searchfetch",
        formula: "stats.indices.search.fetch_time_in_millis / stats.indices.search.fetch_total",
        formulaKeys: "stats.indices.search.fetch_time_in_millis@@stats.indices.search.fetch_total",
        upper_limit: ["8", "15"]
    }, {
        label: "Get - Total:",
        comment: "High values indicate slow I/O.",
        format: "ms",
        value: "stats.gettotal",
        formula: "stats.indices.get.time_in_millis / stats.indices.get.total",
        formulaKeys: "stats.indices.get.time_in_millis@@stats.indices.get.total",
        upper_limit: ["5", "10"]
    }, {
        label: "Get - Exists:",
        format: "ms",
        value: "stats.getexists",
        formula: "stats.indices.get.exists_time_in_millis / stats.indices.get.exists_total",
        formulaKeys: "stats.indices.get.exists_time_in_millis@@stats.indices.get.exists_total",
        upper_limit: ["5", "10"]
    }, {
        label: "Get - Missing:",
        format: "ms",
        value: "stats.getmissing",
        formula: "stats.indices.get.missing_time_in_millis / stats.indices.get.missing_total",
        formulaKeys: "stats.indices.get.missing_time_in_millis@@stats.indices.get.missing_total",
        upper_limit: ["2", "5"]
    }, {
        label: "Refresh:",
        comment: "High values indicate slow I/O.",
        format: "ms",
        value: "stats.refresh",
        formula: "stats.indices.refresh.total_time_in_millis / stats.indices.refresh.total",
        formulaKeys: "stats.indices.refresh.total_time_in_millis@@stats.indices.refresh.total",
        upper_limit: ["10", "20"]
    }, {
        label: "Flush:",
        comment: "High values indicate slow I/O.",
        format: "ms",
        value: "stats.flush",
        formula: "stats.indices.flush.total_time_in_millis / stats.indices.flush.total",
        formulaKeys: "stats.indices.flush.total_time_in_millis@@stats.indices.flush.total",
        upper_limit: ["750", "1500"]
    }]
}

function cache_rules() {
    return [{
        label: "Field Size:",
        value: "stats.fieldsize",
        formula: "stats.indices.fielddata.memory_size_in_bytes",
        formulaKeys: "stats.indices.fielddata.memory_size_in_bytes",
        calc: !1
    }, {
        label: "Field Evictions:",
        comment: "Field values should not be evicted - insufficient RAM for current queries.",
        format: "comma",
        value: "stats.indices.fielddata.evictions",
        upper_limit: ["0", "0"],
        calc: !1
    }, {
        label: "Filter Cache Size:",
        value: "stats.filtercache",
        formula: "stats.indices.filter_cache.memory_size_in_bytes",
        formulaKeys: "stats.indices.filter_cache.memory_size_in_bytes",
        calc: !1
    }, {
        label: "Filter Evictions:",
        unit: "per query",
        comment: "High values indicate insufficient RAM for current queries, or frequent use of one-off values in filters.",
        format: "float",
        value: "stats.filterevictions",
        formula: "stats.indices.filter_cache.evictions / stats.indices.search.query_total",
        formulaKeys: "stats.indices.filter_cache.evictions@@stats.indices.search.query_total",
        upper_limit: ["0.1", "0.2"]
    }, {
        label: "ID Cache Size:",
        value: "stats.indices.id_cache.memory_size",
        calc: !1
    }, {
        label: "% ID Cache:",
        value: "stats.idpercentage",
        formula: "stats.indices.id_cache.memory_size_in_bytes / stats.jvm.mem.heap_committed_in_bytes",
        formulaKeys: "stats.indices.id_cache.memory_size_in_bytes@@stats.jvm.mem.heap_committed_in_bytes",
        format: "pct",
        upper_limit: ["0.2", "0.4"],
        comment: "Large parent/child ID caches reduce the amount of memory available on the heap."
    }]
}

function memory_rules() {
    return [{
        label: "Total Memory:",
        unit: "gb",
        format: "comma",
        value: "stats.totalmem",
        formula: "( stats.os.mem.actual_used_in_bytes + stats.os.mem.actual_free_in_bytes ) / 1024 / 1024 / 1024",
        formulaKeys: "stats.os.mem.actual_used_in_bytes@@stats.os.mem.actual_free_in_bytes"
    }, {
        label: "Heap Size:",
        unit: "gb",
        comment: "A heap size over 32GB causes the JVM to use uncompressed pointers and can slow GC.",
        format: "float",
        value: "stats.heapsize",
        formula: "stats.jvm.mem.heap_committed_in_bytes / 1024 / 1024 / 1024",
        formulaKeys: "stats.jvm.mem.heap_committed_in_bytes",
        upper_limit: ["30", "32"]
    }, {
        label: "Heap % of RAM:",
        comment: "Approx 40-50% of RAM should be available to the kernel for file caching.",
        format: "pct",
        value: "stats.heappercram",
        formula: "stats.jvm.mem.heap_committed_in_bytes / (stats.os.mem.actual_used_in_bytes + stats.os.mem.actual_free_in_bytes)",
        formulaKeys: "stats.jvm.mem.heap_committed_in_bytes@@stats.os.mem.actual_used_in_bytes@@stats.os.mem.actual_free_in_bytes",
        upper_limit: ["0.6", "0.75"]
    }, {
        label: "% Heap Used:",
        format: "pct",
        value: "stats.heapused",
        formula: "stats.jvm.mem.heap_used_in_bytes / stats.jvm.mem.heap_committed_in_bytes",
        formulaKeys: "stats.jvm.mem.heap_used_in_bytes@@stats.jvm.mem.heap_committed_in_bytes"
    }, {
        label: "GC MarkSweep Frequency:",
        unit: "s",
        comment: "Too frequent GC indicates memory pressure and need for more heap space.",
        format: "comma",
        value: "stats.gcfreq",
        formula: "stats.jvm.uptime_in_millis / stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_count / 1000",
        formulaKeys: "stats.jvm.uptime_in_millis@@stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_count",
        lower_limit: ["30", "15", "0"]
    }, {
        label: "GC MarkSweep Duration:",
        comment: "Long durations may indicate that swapping is slowing down GC, or need for more heap space.",
        format: "ms",
        value: "stats.gcduration",
        formula: "stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_time_in_millis / stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_count",
        formulaKeys: "stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_time_in_millis@@stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_count",
        upper_limit: ["150", "400"]
    }, {
        label: "GC ParNew Frequency:",
        unit: "s",
        format: "comma",
        value: "stats.gcparnew",
        formula: "stats.jvm.uptime_in_millis / stats.jvm.gc.collectors.ParNew.collection_count / 1000",
        formulaKeys: "stats.jvm.uptime_in_millis@@stats.jvm.gc.collectors.ParNew.collection_count"
    }, {
        label: "GC ParNew Duration:",
        format: "ms",
        value: "stats.gcparnewduration",
        formula: "stats.jvm.gc.collectors.ParNew.collection_time_in_millis / stats.jvm.gc.collectors.ParNew.collection_count",
        formulaKeys: "stats.jvm.gc.collectors.ParNew.collection_time_in_millis@@stats.jvm.gc.collectors.ParNew.collection_count",
        upper_limit: ["100", "200"]
    }, {
        label: "G1 GC Young Generation Freq:",
        unit: "s",
        comment: "Too frequent GC indicates memory pressure and need for more heap space.",
        format: "comma",
        value: "stats.g1gcfreq",
        formula: "stats.jvm.uptime_in_millis / stats.jvm.gc.collectors['G1 Young Generation'].collection_count / 1000",
        formulaKeys: "stats.jvm.uptime_in_millis@@stats.jvm.gc.collectors['G1 Young Generation'].collection_count",
        lower_limit: ["30", "15", "0"]
    }, {
        label: "G1 GC Young Generation Duration:",
        comment: "Long durations may indicate that swapping is slowing down GC, or need for more heap space.",
        format: "ms",
        value: "stats.g1gcduration",
        formula: "stats.jvm.gc.collectors['G1 Young Generation'].collection_time_in_millis / stats.jvm.gc.collectors['G1 Young Generation'].collection_count",
        formulaKeys: "stats.jvm.gc.collectors['G1 Young Generation'].collection_time_in_millis@@stats.jvm.gc.collectors['G1 Young Generation'].collection_count",
        upper_limit: ["150", "400"]
    }, {
        label: "G1 GC Old Generation Freq:",
        unit: "s",
        comment: "Too frequent GC indicates memory pressure and need for more heap space.",
        format: "comma",
        value: "stats.g1gcold",
        formula: "stats.jvm.uptime_in_millis / stats.jvm.gc.collectors['G1 Old Generation'].collection_count / 1000",
        formulaKeys: "stats.jvm.uptime_in_millis@@stats.jvm.gc.collectors['G1 Old Generation'].collection_count",
        lower_limit: ["30", "15", "0"]
    }, {
        label: "G1 GC Old Generation Duration:",
        comment: "Long durations may indicate that swapping is slowing down GC, or need for more heap space.",
        format: "ms",
        value: "stats.g1gcoldduration",
        formula: "stats.jvm.gc.collectors['G1 Old Generation'].collection_time_in_millis / stats.jvm.gc.collectors['G1 Old Generation'].collection_count",
        formulaKeys: "stats.jvm.gc.collectors['G1 Old Generation'].collection_time_in_millis@@stats.jvm.gc.collectors['G1 Old Generation'].collection_count",
        upper_limit: ["150", "400"]
    }, {
        label: "Swap Space:",
        value: "stats.swap",
        formula: "stats.os.swap.used_in_bytes / 1024 / 1024",
        formulaKeys: "stats.os.swap.used_in_bytes",
        unit: "MB",
        upper_limit: ["1", "1"],
        comment: "Any use of swap by the JVM, no matter how small, can greatly impact the speed of the garbage collector."
    }]
}

function network_rules() {
    return [{
        label: "HTTP Connection Rate:",
        unit: "/second",
        comment: "Too many HTTP connections per second may exhaust the number of sockets available in the kernel, and cause a service outage.",
        format: "comma",
        value: "stats.httpconnectrate",
        upper_limit: ["5", "30"],
        formula: "stats.http.total_opened / stats.jvm.uptime_in_millis * 1000",
        formulaKeys: "stats.http.total_opened@@stats.jvm.uptime_in_millis"
    }]
}

function NodeStatsViewFactory() {
    this.create = function(a, b) {
        var c = new NodeStatView({
            model: a,
            infoModel: b
        });
        return versionUtil.isNewer("0.99.0", cluster.versionNumber.concat) ? (c.buildJVMStats = function(a) {
            var b = a.nodes[a.nodeId].jvm;
            return b
        }, c.buildSettings = function(a, b) {
            var c = {};
            return a.nodes[b].settings || (a.nodes[b].settings = []), c.nodeName = a.nodes[b].settings.name, c.pathHome = a.nodes[b].settings.path.home, void 0 !== a.nodes[b].settings.node && (c.nodeMaster = a.nodes[b].settings.node.master, c.nodeData = a.nodes[b].settings.node.data), void 0 === c.nodeMaster && void 0 === c.nodeData && (c.nodeMaster = !0, c.nodeData = !0), c.clusterName = a.nodes[b].settings.cluster.name, c.logPath = a.nodes[b].settings.path.logs, c.http_address = a.nodes[b].http_address, c.host = a.nodes[b].host, c
        }, c) : c
    }
}

function show_stack_bottomright(a) {
    var b = {
        styling: "bootstrap2",
        title: a.title,
        text: a.text,
        addclass: "stack-bottomright",
        stack: stack_bottomright,
        animation: "fade",
        animate_speed: "normal",
        shadow: !0,
        icon: !0,
        hide: void 0 === a.hide ? !0 : a.hide,
        closer_hover: void 0 === a.closer_hover ? !0 : a.closer_hover,
        delay: 5e3
    };
    switch (a.type) {
        case "error":
            b.type = "error";
            break;
        case "info":
            b.type = "info";
            break;
        case "success":
            b.type = "success"
    }
    $(function() {
        new PNotify(b)
    })
}

function uppercaseFirst(a) {
    return a.charAt(0).toUpperCase() + a.slice(1)
}

function lookupValue(a, b) {
    var c = a[b];
    return void 0 === a[b] && (c = getValue(b, a)), c
}

function getValue(a, b) {
    for (var c = a.split("."), d = b || window, e = 0; e < c.length; e += 1)
        if (d[c[e]]) d = d[c[e]];
        else if (e >= c.length - 1) return void 0;
    return d
}
var clusterTemplate = {};
clusterTemplate.Health = ['<a id="clusterHealthButton" class="btn btn-<%- statusClass %> " rel="popRight" data-trigger="hover"', 'data-content="Status: <span class=\'label label-<%- statusClassLabel %>\'><%- statusText %></span>" data-html="true"', 'href="#cluster" role="button">', '<i class="icon-info-sign"></i> <%- cluster_name %></a>'].join("\n"), clusterTemplate.HealthDescribe = ['<div class="well">', '<div class="span2 pull-left"><a href="#refreshCluster" class="btn btn-mini"  rel="tipRight" data-placement="bottom" data-html="true" data-title="Refreshing every <%- polling/1000 %> seconds.<br/>Click to Force Refresh."><i class="icon-refresh"></i> <%- lastUpdateTime %></a></div>', '<div class="text-center span8"><span style="font-size: 28px;">Cluster Overview</span></div>', '<div class="pull-right">', '<a href="#visualize" class="btn btn-info" rel="tipRight" data-placement="bottom" data-html="true" data-title="View Cluster Diagram">', '<i class="icon-sitemap"></i></a>', "</div>", "</div>", '<div class="row-fluid">', '<div class="grid" style="margin-top: 10px;">', '<div class="grid-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-bar-chart"></i></div>', "<span>Cluster Statistics</span>", '<div class="clearfix"></div>', "</div>", '<div class="clearfix"></div>', "</div>", '<div class="grid-content overflow">', '<div class="row-fluid center-table">', '<div class="span2">', '<div class="well stat-box"><span class="stat-detail"><%- numeral(health.number_of_nodes).format("0,0") %></span><span>Nodes</span>', "</div></div>", '<div class="span2">', '<div class="well stat-box"><span class="stat-detail"><%- numeral(indices.shards.total).format("0,0") %></span><span>Total Shards</span>', "</div></div>", '<div class="span2">', '<div class="well stat-box"><span class="stat-detail"><%- numeral(indices.shards.successful).format("0,0") %></span><span>Successful Shards</span>', "</div></div>", '<div class="span2">', '<div class="well stat-box"><span class="stat-detail"><%- numeral(indices.count).format("0,0") %></span><span>Indices</span>', "</div></div>", '<div class="span2">', '<div class="well stat-box"><span class="stat-detail"><%- numeral(indices.docs.count).format("0,0") %></span><span>Documents</span>', "</div></div>", '<div class="span2">', '<div class="well stat-box"><span class="stat-detail"><%- numeral(indices.store.size_in_bytes).format("0.0b") %></span><span>Size</span>', "</div></div>", "</div>", '<div class="clear"></div>', "</div>", "</div>", "</div>", '<div class="row-fluid">', '<div class="span6">', '<div class="grid">', '<div class="grid-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-ambulance"></i></div>', "<span>Cluster Health</span>", '<div class="clearfix"></div>', "</div>", '<div class="clearfix"></div>', "</div>", '<div class="grid-content overflow">', '<table class="table table-striped table-hover table-bordered  center-table">', "<tr>", "<td>Status</td>", '<td><span class="label label-<%- health.statusClassLabel %>"><%- health.statusText %></span></td>', "</tr>", "<tr>", "<td>Timed Out?</td>", "<td><%- health.timed_out %></td>", "</tr>", "<tr>", "<td># Nodes</td>", '<td><%- numeral(health.number_of_nodes).format("0,0") %></td>', "</tr>", "<tr>", "<td># Data Nodes</td>", '<td><%- numeral(health.number_of_data_nodes).format("0,0") %></td>', "</tr>", "<tr>", "<td>Active Primary Shards</td>", '<td><%- numeral(health.active_primary_shards).format("0,0") %></td>', "</tr>", "<tr>", "<td>Active Shards</td>", '<td><%- numeral(health.active_shards).format("0,0") %></td>', "</tr>", "<tr>", "<td>Relocating Shards</td>", '<td><%- numeral(health.relocating_shards).format("0,0") %></td>', "</tr>", "<tr>", "<td>Initializing Shards</td>", '<td><%- numeral(health.initializing_shards).format("0,0") %></td>', "</tr>", "<tr>", "<td>Unassigned Shards</td>", '<td><%- numeral(health.unassigned_shards).format("0,0") %></td>', "</tr>", "</table>", '<div class="clear"></div>', "</div>", '<div class="grid-content">', '<div class="clear"></div>', '<div class="clearfix"></div>', "</div>", "</div>", "</div>", '<div class="span6">', '<div class="grid">', '<div class="grid-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-list"></i></div>', "<span>Indices</span>", '<div class="clearfix"></div>', "</div>", '<div class="clearfix"></div>', "</div>", '<div class="grid-content overflow">', "<% if (!jQuery.isEmptyObject(indices.indices)) { %>", '<table class="table table-bordered table-striped table-hover" id="indicesTable">', "<thead>", "<tr><th>Index</th><th># Docs</th><th>Primary Size</th><th># Shards</th><th># Replicas</th><th>Status</th></tr>", "</thead>", "<tbody>", "<% _.each(indices.indices.sort(function(a,b) {return (a.name > b.name) ? -1 : ((b.name > a.name) ? 11 : 0);} ), function(index) { %>", "<tr><td>", '<a href="#index/<%- index.id %>"  rel="tipRight" data-placement="bottom" data-title="Index Information"><%- index.name %></a>', '</td><td><%- numeral(index.primaries.docs.count).format("0,0") %></td><td><%- numeral(index.primaries.store.size_in_bytes).format("0.0b")  %></td>', '<td><%- numeral(index.numshards).format("0,0") %></td><td><%- numeral(index.numreplicas).format("0,0") %></td><td><%- index.status %></td></tr>', "<% }); %>", "</tbody>", "</table>", "<% } %>", '<div class="clear"></div>', "</div>", '<div class="grid-content">', '<div class="clear"></div>', '<div class="clearfix"></div>', "</div>", "</div>", "</div>"].join("\n");
var indexActionTemplate = {};
indexActionTemplate.createIndex = ['<div class="span8 center-table">', '<form class="form-horizontal" id="createIndexForm">', "<fieldset>", '<div id="legend">', '<legend class="">Create an Index</legend>', "</div>", '<div class="control-group">', '<label class="control-label"  for="indexId">Index ID</label>', '<div class="controls">', '<input type="text" id="indexId" name="indexId" placeholder="" class="input-xlarge"  data-error-style="inline">', "</div>", "</div>", '<div class="control-group">', '<label class="control-label" for="shards"># Shards</label>', '<div class="controls">', '<input type="text" id="shards" name="shards" placeholder="" class="input-mini"  data-error-style="inline">', "</div>", "</div>", '<div class="control-group">', '<label class="control-label" for="replicas"># Replicas</label>', '<div class="controls">', '<input type="text" id="replicas" name="replicas" placeholder="" class="input-mini"  data-error-style="inline">', "</div>", "</div>", '<div class="control-group">', '<div class="controls">', '<button type="submit" id="createIndexSubmit" class="btn btn-success">Create</button>', '<a href="#indices" class="btn">Cancel</a>', "</div>", "</div>", "</fieldset>", "</form>", "</div>"].join("\n"), indexActionTemplate.defaultModal = ['<div class="modal hide fade" id="defaultindexmodal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3><%- title %></h3>", "</div>", '<div class="modal-body">', "<p>Response from Server is... </p>", '<pre class="prettyprint linenums language-json">', "<%- res %>", "</pre>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', "</div>", "</div>"].join("\n"), indexActionTemplate.optimizeAll = ['<div class="modal hide fade" id="optimizeallmodal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>Indices Optimized</h3>", "</div>", '<div class="modal-body">', "<p>Response from Server is... </p>", '<pre class="prettyprint linenums language-json">', "<%- res %>", "</pre>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', "</div>", "</div>"].join("\n"), indexActionTemplate.flushAll = ['<div class="modal hide fade" id="flushallmodal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>Indices Flushed</h3>", "</div>", '<div class="modal-body">', "<p>Response from Server is... </p>", '<pre class="prettyprint linenums language-json">', "<%- res %>", "</pre>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', "</div>", "</div>"].join("\n"), indexActionTemplate.clearCacheAll = ['<div class="modal hide fade" id="clearcacheallmodal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>Indices Cache Cleared</h3>", "</div>", '<div class="modal-body">', "<p>Response from Server is... </p>", '<pre class="prettyprint linenums language-json">', "<%- res %>", "</pre>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', "</div>", "</div>"].join("\n"), indexActionTemplate.createAlias = ['<div class="span8 center-table">', '<form class="form-horizontal" id="createAliasForm">', '<input type="hidden" name="indexId" value="<%- indexId %>">', "<fieldset>", '<div id="legend">', '<legend class="">Create an Alias on Index "<%- indexName %>"</legend>', "</div>", '<div class="control-group">', '<label class="control-label"  for="aliasId">Alias ID</label>', '<div class="controls">', '<input type="text" id="aliasId" name="aliasId" placeholder="" class="input-xlarge"  data-error-style="inline">', "</div>", "</div>", '<div class="control-group">', '<label class="control-label" for="index_routing">Index Routing</label>', '<div class="controls">', '<input type="text" id="index_routing" name="index_routing" placeholder="" class="input-mini"  data-error-style="inline">', "</div>", "</div>", '<div class="control-group">', '<label class="control-label" for="search_routing">Search Routing</label>', '<div class="controls">', '<input type="text" id="search_routing" name="search_routing" placeholder="" class="input-mini"  data-error-style="inline">', "</div>", "</div>", '<div class="control-group">', '<div class="controls">', '<button type="submit" id="createAliasSubmit" class="btn btn-success">Create</button>', '<a href="#index/<%- indexId %>" class="btn">Cancel</a>', "</div>", "</div>", "</fieldset>", "</form>", "</div>"].join("\n");
var indexTemplate = {};
indexTemplate.indexList = ['<div class="well">', '<div class="span2 pull-left"><a href="#refreshindices" class="btn btn-mini"  rel="tipRight" data-placement="bottom" data-html="true" data-title="Refreshing every <%- polling/1000 %> seconds.<br/>Click to Force Refresh."><i class="icon-refresh"></i> <%- lastUpdateTime %></a></div>', '<div class="text-center span8"><span style="font-size: 28px;">Indices Overview</span></div>', "</div>", '<div class="span11 center-table">', '<div id="toolbar" class="pull-right" style="padding-bottom: 10px;">', '<div class="btn-group">', '<a href="#refreshall" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Refresh all Indices" ', 'data-content="Makes all operations performed since the last refresh available for search. The (near) real-time capabilities depend on the index engine used. For example, the robin one requires refresh to be called, but by default a refresh is scheduled periodically."', '><i class="icon-refresh"></i> Refresh</a>', '<a href="#optimizeall" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Optimize all Indices" ', 'data-content="The optimize process basically optimizes the index for faster search operations (and relates to the number of segments a lucene index holds within each shard). The optimize operation allows to reduce the number of segments by merging them."', '><i class="icon-rocket"></i> Optimize</a>', '<a href="#flushall" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Flush all Indices" ', 'data-content="The flush process of an index basically frees memory from the index by flushing data to the index storage and clearing the internal transaction log. By default, ElasticSearch uses memory heuristics in order to automatically trigger flush operations as required in order to clear memory.">', '<i class="icon-rotate-right"></i> Flush</a>', '<a href="#clearcacheall" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Clear all Caches" data-content="Clears the cache on all indices."><i class="icon-eraser"></i> Clear Cache</a>', "</div> <!-- btn group -->", "</div> <!-- toolbar --> ", '<div id="indicesToolbar" class="pull-left" style="padding-bottom: 10px;">', '<a href="#createindex" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Create Index" data-content="Create a New Index on your cluster."><i class="icon-edit"></i> Create Index</a>', "</div> <!-- toolbar --> ", '<table class="table table-bordered table-striped table-hover" id="indicesTable">', "<thead>", "<tr><th>Index</th><th># Docs</th><th>Primary Size</th><th># Shards</th><th># Replicas</th><th>Status</th></tr>", "</thead>", "<tbody>", "<% _.each(indices, function(index) { %>", "<tr><td>", '<a href="#index/<%- index.id %>"  rel="tipRight" data-placement="bottom" data-title="Index Information"><%- index.name %></a>', '</td><td><%- numeral(index.docs.num_docs).format("0,0") %></td><td><%- numeral(index.index.primary_size_in_bytes).format("0.0b")  %></td><td><%- numeral(index.numshards).format("0,0") %></td><td><%- numeral(index.numreplicas).format("0,0") %></td><td><%- index.status %></td></tr>', "<% }); %>", "</tbody>", "</table>", "</div>"].join("\n"), indexTemplate.indexView = ['<div class="modal hide fade" id="deleteindexmodal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>WARNING!</h3>", "</div>", '<div class="modal-body">', "<p>Are you sure you want to delete this index?<br/><br/>This action will delete the index and its data!</p>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', '<a href="#deleteindex/<%- indexId %>" class="btn btn-danger">Delete</a>', "</div>", "</div>", '<div class="modal hide fade" id="deletealiasmodal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>WARNING!</h3>", "</div>", '<div class="modal-body">', "<p>Are you sure you want to delete this alias?<br/><br/>This action cannot be undone!</p>", '<input type="hidden" name="deleteAliasId" id="deleteAliasId" value="">', "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', '<button class="btn btn-danger" id="deleteIndexBtn">Delete</a>', "</div>", "</div>", '<div class="pull-left"><a href="#refreshindexpoller/<%- indexId %>" class="btn btn-mini"  rel="tipRight" data-placement="bottom" data-html="true" data-title="Refreshing every <%- polling/1000 %> seconds.<br/>Click to Force Refresh."><i class="icon-refresh"></i> <%- lastUpdateTime %></a></div>', '<div class="text-center"><h2><%- indexName %></h2>', '<div class="span12 center-table">', '<ul class="nav nav-tabs">', '<li><a href="#metrics"  class="active" data-toggle="tab" id="indexTab">Metrics</a></li>', '<li><a href="#shards" data-toggle="tab" id="shardTab">Shards</a></li>', '<li><a href="#aliases" data-toggle="tab" id="aliasTab">Aliases</a></li>', '<li><a href="#administration" data-toggle="tab" id="adminTab">Administration</a></li>', "</ul>", '<div class="tab-content">', '<div class="tab-pane active" id="metrics">', '<div class="row center-table">', "<% if (isOpenState == true) { %>", '<div class="span3">', '<div class="well"><span class="stat-detail"><%- numeral(index.docs.num_docs).format("0,0") %></span><span>Documents</span>', "</div></div>", '<div class="span3">', '<div class="well"><span class="stat-detail"><%- numeral(index.index.primary_size_in_bytes).format("0.0b") %></span><span>Primary Size</span>', "</div></div>", '<div class="span3">', '<div class="well"><span class="stat-detail"><%- numeral(index.index.size_in_bytes).format("0.0b") %></span><span>Total Size</span>', "</div></div>", '<div class="span3">', '<div class="well"><span class="stat-detail"><%- numeral(totalShards.total).format("0,0") %></span><span>Total Shards</span>', "</div></div>", "</div>", '<div class="row-fluid">', '<div class="span6">', '<table class="table table-bordered table-striped grid-table">', "<thead>", '<tr><td colspan="2"><div class="grid-table-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-file-alt"></i></div>', '<span class="text-left">Health</span>', "</div>", "</div>", "</td></tr>", "</thead>", '<tr><td class="span3">Status:</td><td><span class="label label-<%- index.statusClassLabel %>"><%- index.statusText %></span></td></tr>', '<tr><td>Nodes:</td><td><%- numeral(index.number_of_nodes).format("0,0") %></td></tr>', '<tr><td>Data Nodes:</td><td><%- numeral(index.number_of_data_nodes).format("0,0") %></td></tr>', '<tr><td>Primary Shards:</td><td><%- numeral(index.active_primary_shards).format("0,0") %></td></tr>', '<tr><td>Active Shards:</td><td><%- numeral(index.active_shards).format("0,0") %></td></tr>', '<tr><td>Relocating Shards:</td><td><%- numeral(index.relocating_shards).format("0,0") %></td></tr>', '<tr><td>Initializing Shards:</td><td><%- numeral(index.initializing_shards).format("0,0") %></td></tr>', '<tr><td>Unassigned Shards:</td><td><%- numeral(index.unassigned_shards).format("0,0") %></td></tr>', "</table>", "</div>", '<div class="span6">', '<table class="table table-bordered table-striped grid-table">', "<thead>", '<tr><td colspan="2"><div class="grid-table-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-file-alt"></i></div>', '<span class="text-left">Documents</span>', "</div>", "</div>", "</td></tr>", "</thead>", '<tr><td class="span3">Documents:</td><td><%- numeral(index.docs.num_docs).format("0,0") %></td></tr>', '<tr><td>Max Documents:</td><td><%- numeral(index.docs.max_doc).format("0,0") %></td></tr>', '<tr><td>Deleted Documents:</td><td><%- numeral(index.docs.deleted_docs).format("0,0") %></td></tr>', '<tr><td>Primary Size:</td><td><%- numeral(index.index.primary_size_in_bytes).format("0.0b")  %></td></tr>', '<tr><td>Total Size:</td><td><%- numeral(index.index.size_in_bytes).format("0.0b")  %></td></tr>', "</table>", "</div>", "</div> <!-- end row -->", '<div class="row center-table">', '<div class="span6">', '<table class="table table-bordered table-striped grid-table">', "<thead>", '<tr><td colspan="2"><div class="grid-table-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-search"></i></div>', '<span class="text-left">Search Totals</span>', "</div>", "</div>", "</td></tr>", "</thead>", "<tbody>", '<tr><td class="span3">Query Total:</td><td><%- numeral(index.total.search.query_total).format("0,0") %></td></tr>', "<tr><td>Query Time:</td><td><%- timeUtil.convertMS(index.total.search.query_time_in_millis) %></td></tr>", '<tr><td>Fetch Total:</td><td><%- numeral(index.total.search.fetch_total).format("0,0") %></td></tr>', "<tr><td>Fetch Time:</td><td><%- timeUtil.convertMS(index.total.search.fetch_time_in_millis) %></td></tr>", "</tbody>", "</table>", "</div>", '<div class="span6">', '<table class="table table-bordered table-striped grid-table">', "<thead>", '<tr><td colspan="2"><div class="grid-table-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-list"></i></div>', '<span class="text-left">Indexing Totals</span>', "</div>", "</div>", "</td></tr>", "</thead>", '<tr><td class="span3">Index Total:</td><td><%- numeral(index.total.indexing.index_total).format("0,0") %></td></tr>', '<tr><td class="span3">Index Time:</td><td><%- timeUtil.convertMS(index.total.indexing.index_time_in_millis) %></td></tr>', '<tr><td>Delete Total:</td><td><%- numeral(index.total.indexing.delete_total).format("0,0") %></td></tr>', "<tr><td>Delete Time:</td><td><%- timeUtil.convertMS(index.total.indexing.delete_time_in_millis) %></td></tr>", "</table>", "</div>", "</div> <!-- end row -->", '<div class="row center-table">', '<div class="span6">', '<table class="table table-bordered table-striped grid-table">', "<thead>", '<tr><td colspan="2"><div class="grid-table-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-upload-alt"></i></div>', '<span class="text-left">Get Totals</span>', "</div>", "</div>", "</td></tr>", "</thead>", '<tr><td class="span3">Get Total:</td><td><%- numeral(index.total.get.total).format("0,0") %></td></tr>', "<tr><td>Get Time:</td><td><%- timeUtil.convertMS(index.total.get.time_in_millis) %></td></tr>", '<tr><td>Exists Total:</td><td><%- numeral(index.total.get.exists_total).format("0,0") %></td></tr>', "<tr><td>Exists Time:</td><td><%- timeUtil.convertMS(index.total.get.exists_time_in_millis) %></td></tr>", '<tr><td>Missing Total:</td><td><%- numeral(index.total.get.missing_total).format("0,0") %></td></tr>', "<tr><td>Missing Time:</td><td><%- timeUtil.convertMS(index.total.get.missing_time_in_millis) %></td></tr>", "</table>", "</div>", '<div class="span6">', '<table class="table table-bordered table-striped grid-table">', "<thead>", '<tr><td colspan="2"><div class="grid-table-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-cogs"></i></div>', '<span class="text-left">Operations</span>', "</div>", "</div>", "</td></tr>", "</thead>", "</table>", "</div>", '<div class="span6">', '<table class="table table-bordered table-striped grid-table">', "<thead>", '<tr><td colspan="2"><div class="grid-table-title">', '<div class="pull-left">', '<div class="icon-title"><i class="icon-copy"></i></div>', '<span class="text-left">Merge Activity</span>', "</div>", "</div>", "</td></tr>", "</thead>", "</table>", "</div>", "<% } else { %>", '<div class="lead">You must open the index to see any statistics.</div> ', "<% } %>", "</div> <!-- end row -->", "</div> <!-- end tab -->", '<div class="tab-pane" id="shards">', "<% if (isOpenState == true) { %>", '<div class="row center-table">', '<div class="span12">', '<table class="table table-bordered table-striped" id="shardTable">', "<thead>", "<tr><th>Shard</th><th>State</th><th># Docs</th><th>Size</th><th>Primary?</th><th>Node</th></tr>", "</thead>", "<tbody>", "<% _.each(shards, function(shard) { %>", '<tr><td><%- shard.routing.shard %></td><td><%- shard.state %></td><td><%- numeral(shard.docs.num_docs).format("0,0") %></td><td><%- numeral(shard.index.size_in_bytes).format("0.0b") %></td><td><%- shard.routing.primary %></td><td><%- shard.node %></td></tr>', "<% }) %>", "</tbody>", "</table>", "</div>", "</div>", "<% } else { %>", '<div class="lead">You must open the index to see any statistics.</div> ', "<% } %>", "</div>", '<div class="tab-pane" id="aliases">', "<% if (isOpenState == true) { %>", '<div class="row center-table">', '<div class="span12">', '<div id="aliasToolbar" class="pull-left" style="padding-bottom: 10px;">', '<a href="#createalias/<%- indexId %>" class="btn" rel="tipRight" data-trigger="hover" data-placement="bottom" data-title="Create a New Alias on this Index."><i class="icon-edit"></i> Create Alias</a>', "</div> <!-- toolbar --> ", "<% if (!jQuery.isEmptyObject(index.aliases)) { %>", '<table class="table table-bordered table-striped" id="aliasesTable">', "<thead>", "<tr><th>Alias</th><th>Index Routing</th><th>Search Routing</th><th>Filter</th><th>Action</th></tr>", "</thead>", "<tbody>", "<% _.each(index.aliases, function(item, key, list) { %>", "<tr><td><%- key %></td><td><%- item.index_routing %></td><td><%- item.search_routing %></td><td>", "<% if (item.filter) { %>", '<pre class="prettyprint linenums language-json"><%- JSON.stringify(item.filter) %></pre>', "<% } %>", "</td>", '<td><a href="#deletealiasmodal" data-id="<%- key %>" role="button" class="btn btn-block btn-danger opendeletealiasmodal" style="white-space: nowrap">Delete</a></td>', "</tr>", "<% }) %>", "</tbody>", "</table>", "<% } else { %>", '<div class="lead">No aliases associated with this index.</div> ', "<% } %>", "</div>", "</div>", "<% } else { %>", '<div class="lead">You must open the index to see any alias information.</div> ', "<% } %>", "</div>", '<div class="tab-pane" id="administration">', '<table class="table table-bordered table-striped">', "<% if (isOpenState == true) { %>", '<tr><td><a href="#flushindex/<%- indexId %>" class="btn btn-block" style="white-space: nowrap;">Flush Index</a></td><td>The flush process of an index frees memory from the index by flushing data to the index storage and clearing the internal transaction log. By default, ElasticSearch uses memory heuristics in order to automatically trigger flush operations as required in order to clear memory.</td></tr>', '<tr><td><a href="#clearcacheindex/<%- indexId %>" class="btn btn-block" style="white-space: nowrap;">Clear Cache</a></td><td>Clears the cache on all indices.</td></tr>', '<tr><td><a href="#optimizeindex/<%- indexId %>" class="btn btn-block" style="white-space: nowrap;">Optimize Index</a></td><td>The optimize process basically optimizes the index for faster search operations (and relates to the number of segments a lucene index holds within each shard). The optimize operation allows to reduce the number of segments by merging them.</td></tr>', '<tr><td><a href="#refreshindex/<%- indexId %>" class="btn btn-block" style="white-space: nowrap;">Refresh Index</a></td><td>Refresh the index, making all operations performed since the last refresh available for search. The (near) real-time capabilities depend on the index engine used. For example, the robin one requires refresh to be called, but by default a refresh is scheduled periodically.</td></tr>', '<tr><td><a href="#closeindex/<%- indexId %>" class="btn btn-warning btn-block" style="white-space: nowrap;">Close Index</a></td>', "<td>The open and close index commands allow to close an index, and later on opening it. A closed index has almost no overhead on the cluster (except for maintaining its metadata), and is blocked for read/write operations. A closed index can be opened which will then go through the normal recovery process.</td></tr>", '<tr><td><a href="#deleteindexmodal" data-toggle="modal" role="button" class="btn btn-block btn-danger" rel="popRight" data-trigger="hover" data-placement="bottom" style="white-space: nowrap">Delete Index</a></td><td><strong>WARNING! This action cannot be undone. You will destroy this index and all documents associated with this, by clicking this button.</strong></td></tr>', "<% } else { %>", '<tr><td><a href="#openindex/<%- indexId %>" class="btn btn-block" style="white-space: nowrap;">Open Index</a></td>', "<td>The open and close index commands allow to close an index, and later on opening it. A closed index has almost no overhead on the cluster (except for maintaining its metadata), and is blocked for read/write operations. A closed index can be opened which will then go through the normal recovery process.</td></tr>", "<% } %>", "</table>", "</div>", "</div>", "</div></div>"].join("\n");
var mappingTemplate = {};
mappingTemplate.mappingList = ['<div class="text-center"><h2>Type Mappings</h2></div>', '<div class="span11 center-table">', '<table class="table table-bordered table-striped table-hover" id="indicesTable">', "<thead>", "<tr><th>Type</th><th>Index</th></tr>", "</thead>", "<tbody>", "<% _.each(maps, function(map) { %>", "<tr><td>", '<a href="#mappings/<%- map.indexId %>/<%- map.mappingName %>"  rel="tipRight" data-placement="bottom" data-title="Mapping Information"><%- map.mappingName %></a>', "</td><td><%- map.indexId %></td></tr>", "<% }); %>", "</tbody>", "</table>", '<div class="alert alert-info"><i class="icon-info-sign"></i> Only the basic mapping actions are available here. Power-users are advised to use the <a href="http://www.elasticsearch.org/guide/reference/api/admin-indices-put-mapping/" target="_blank">Mapping API</a> directly and read the <a href="http://www.elasticsearch.org/guide/reference/mapping/" target="_blank">Documentation</a>. </div>', "</div>"].join("\n"), mappingTemplate.mapView = ['<div class="text-center"><h2>Index: <%- mapType.indexId %>, Type: <%- mapType.mappingName %></h2></div>', '<div class="span11 center-table">', '<div class="pull-right" style="padding-bottom: 10px;">', '<a href="#deletemappingmodal" data-toggle="modal" role="button" class="btn btn-danger" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Delete Mapping" data-content="WARNING! This action cannot be undone!"><i class="icon-warning-sign"></i> Delete Mapping</a>', "</div> <!-- toolbar --> ", '<table class="table table-bordered table-striped table-hover" id="indicesTable">', "<thead>", "<tr><th>Name</th><th>Type</th><th>Format</th><th>Store?</th></tr>", "</thead>", "<tbody>", "<% _.each(props, function(item, key, list) { %>", "<tr><td><%- key %></td>", "<td><%- item.type %></td>", "<td><%- item.format %></td>", "<td><%- item.store %></td></tr>", "<% }); %>", "</tbody>", "</table>", "</div>", '<div class="modal hide fade" id="deletemappingmodal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>WARNING!</h3>", "</div>", '<div class="modal-body">', "<p>Are you sure you want to delete this mapping?<br/><br/>This action will delete the mapping and its data!</p>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', '<a href="#deletemapping/<%- mapType.indexId %>/<%- mapType.mappingName %>" class="btn btn-danger">Delete</a>', "</div>", "</div>"].join("\n"), mappingTemplate.createType = ['<div class="span8 center-table">', '<form class="form-horizontal" id="createIndexForm">', "<fieldset>", '<div id="legend">', '<legend class="">Create Mapping</legend>', "</div>", '<div class="control-group">', '<label class="control-label"  for="indexId">Index ID</label>', '<div class="controls">', "<select>", "</select>", "</div>", "</div>", '<div class="control-group">', '<label class="control-label" for="shards">Mapping Type</label>', '<div class="controls">', '<input type="text" id="shards" name="shards" placeholder="" class="input-xlarge"  data-error-style="inline">', "</div>", "</div>", '<div class="control-group">', '<div class="controls">', '<button type="submit" class="btn btn-success">Create</button>', '<a href="#indices" class="btn">Cancel</a>', "</div>", "</div>", "</fieldset>", "</form>", "</div>"].join("\n");
var messageTemplate = {};
messageTemplate.error = ['<div class="alert alert-error">', '<button type="button" class="close" data-dismiss="alert">&times;</button>', "<h4><%- warningTitle %></h4>", '<% if (warningMessage != "") { %>', "<%- warningMessage %>", "<% } %>", "</div>"].join("\n"), messageTemplate.warn = ['<div class="alert alert-danger">', '<button type="button" class="close" data-dismiss="alert">&times;</button>', "<h4><%- warningTitle %></h4>", "<%- warningMessage %>", "</div>"].join("\n"), messageTemplate.info = ['<div class="alert alert-info">', '<button type="button" class="close" data-dismiss="alert">&times;</button>', "<h4><%- infoTitle %></h4>", "<%- infoMessage %>", "</div>"].join("\n"), messageTemplate.success = ['<div class="alert alert-success">', '<button type="button" class="close" data-dismiss="alert">&times;</button>', "<h4><%- infoTitle %></h4>", "<%- infoMessage %>", "</div>"].join("\n");
var nodeTemplate = {};
nodeTemplate.nodeList = ['<a href="#nodediagnostics" class="btn btn-info" rel="tipRight" data-trigger="hover" data-placement="bottom" data-title="Provides helpful diagnostic & performance information for all nodes in your cluster."><i class="icon-ambulance"></i> Node Diagnostics</a>', "<!-- if more than 5 nodes, show dropdown. else, show individual nodes. -->", "<% if (_.size(nodes.models) > 5 ) { %>", '<div class="btn-group">', '<button class="btn dropdown-toggle btn-info" data-toggle="dropdown" href="#" rel="tipRight" data-trigger="hover" data-placement="right" data-title="Monitor individual nodes in real-time."><i class="icon-th"></i> Monitor Nodes <span class="caret"></span></button> ', '<ul class="dropdown-menu">', "<% _.each(nodes.models, function(node, key) { %>", '<li><a href="#nodes/<%- node.attributes.id %>" data-nodeid="<%- node.id %>">', "<% if (node.attributes.master == true) { %>", '<i class="icon-bolt"></i> ', "<% } %>", "<%= node.attributes.name %></a>", "<% }); %>", "</ul>", "</div>", "<% } else { %>", "<% _.each(nodes.models, function(node, key) { %>", '<a href="#nodes/<%- node.attributes.id %>" class="btn btn-info" rel="tipRight" data-trigger="hover" data-placement="bottom" data-nodeid="<%- node.id %>"', 'data-content="<b>IP:</b> <%- node.attributes.transport_address %>.<br/><b>ID:</b> <%- node.id %>" data-html="true" data-title="Click for Node Information.">', "<% if (node.attributes.master == true) { %>", '<i class="icon-bolt"></i> ', "<% } %>", "<%= node.attributes.name %></a>", "<% }); %>", "<% } %>"].join("\n"), nodeTemplate.nodeShutdown = ['<div class="lead text-center" style="padding-top: 20px;">Shutdown Command has been sent to Node.<br/>Click button below to refresh node list.<br/>', '<br/><br/><a href="#cluster" class="btn btn-large btn-primary">Click to Continue <i class="icon-chevron-right"></i></a>', "</div>"].join("\n"), nodeTemplate.nodeHotThreads = ['<div class="modal hide fade" id="threadModal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>', "<h3>Modal header</h3>", "</div>", '<div class="modal-body">', "<p>One fine bodyâ€¦</p>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn">Close</a>', '<a href="#" class="btn btn-primary">Save changes</a>', "</div>", "</div>"].join("\n"), nodeTemplate.nodeInfoModal = ['<div class="modal hide fade" id="nodeInfoModal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>Settings Information</h3>", "</div>", '<div class="modal-body">', "<p>", '<table class="table table-condensed table-striped table-bordered">', "<tr><td>Node Name:</td><td><%- settings.nodeName %></td></tr>", "<tr><td>Node Version:</td><td><%- version %></td></tr>", "<tr><td>Node is Master?</td><td><%- settings.nodeMaster %></td></tr>", "<tr><td>Node Holds Data?</td><td><%- settings.nodeData %></td></tr>", "<tr><td>Cluster Name:</td><td><%- settings.clusterName %></td></tr>", '<% if(versionUtil.isNewer("0.99.0", cluster.versionNumber.concat)) { %>', "<tr><td>Hostname:</td><td><%- settings.host %></td></tr>", "<% } else { %> ", "<tr><td>Hostname:</td><td><%- host %></td></tr>", "<tr><td>Logger Prefix:</td><td><%- settings.logPrefix %></td></tr>", "<% } %>", "<tr><td>HTTP Address:</td><td><%- settings.http_address %></td></tr>", "<tr><td>Home Path:</td><td><%- settings.pathHome %></td></tr>", "<tr><td>Log Path:</td><td><%- settings.logPath %></td></tr>", "</table>", "</p>", "</div>", '<div class="modal-footer">', '<a href="#" data-dismiss="modal"  class="btn">Close</a>', "</div>", "</div>", "</div>"].join("\n"), nodeTemplate.diagnostics = ['<div class="well">', '<div class="span2 pull-left"><a href="#refreshNodeDiagnostics" class="btn btn-mini"  rel="tipRight" data-placement="bottom" data-html="true" data-title="Refreshing every <%- polling/1000 %> seconds.<br/>Click to Force Refresh."><i class="icon-refresh"></i> <%- lastUpdateTime %></a></div>', '<div class="pull-right">', '<div class="btn-group">', '<a href="#selectDiagnosticsNodeModal" id="openNodeSelect" class="btn" rel="tipRight" data-placement="bottom" data-html="true" data-title="Monitoring <%- nodes.length %> of <%- allNodes.length %> nodes."><i class="icon-list-ul"></i> Select</a>', '<a href="#diagnosticsModal" data-toggle="modal" role="button" class="btn" rel="tipRight" data-placement="bottom" data-html="true" data-title="Trouble understanding this screen?"><i class="icon-question-sign"></i> Help</a></div>', "</div>", '<div class="text-center">', '<span style="font-size: 28px;">Node Diagnostics Information</span>', "</div>", "</div><!-- well -->", '<div class="row-fluid">', '<small class="muted"><i class="icon-info-sign"></i> Mouseover each table cell for detailed information.</small>', '<table id="nodestable" class="table table-condensed table-bordered nodestable"  style="overflow-x: auto;width: auto;" >', '<thead><tr><td colspan="<%- _.size(nodes)+1 %>" class="lead" style="font-weight: bold;"><i class="icon-th-large"></i> Summary</td></tr></thead>', "<tbody>", "<% _.each(generalRules, function(rule, key) { %>", "<tr>", '<td style="white-space: nowrap;">', "<strong><%- rule.label %></strong>", "</td>", "<% _.each(nodes, function(node, k) { %>", '<td rel="popRight" data-trigger="hover" data-container="#nodestable" data-html="true" data-placement="top" data-title="<b>How this Field is Calculated</b>" data-content="<%- makeDiagnosticsPopOver(node, rule) %>" style="white-space: nowrap; text-align: right;" class="<%- calculateCellClass(node, rule) %>">', "<%- calculateRuleValue(node, rule.value, rule.unit, rule.format) %>", "</td>", "<% }); %>", "</tr>", "<% }); %>", "</tbody>", '<thead><tr><td colspan="<%- _.size(nodes)+1 %>" style="font-weight: bold;"><i class="icon-th-large"></i> File System</td></tr></thead>', "<tbody>", "<% _.each(fsRules, function(rule, key) { %>", "<tr>", '<td style="white-space: nowrap;">', "<strong><%- rule.label %></strong>", "</td>", "<% _.each(nodes, function(node, k) { %>", '<td rel="popRight" data-trigger="hover" data-container="#nodestable" data-html="true" data-placement="top" data-title="<b>How this Field is Calculated</b>" data-content="<%- makeDiagnosticsPopOver(node, rule) %>" style="white-space: nowrap; text-align: right;" class="<%- calculateCellClass(node, rule) %>">', "<%- calculateRuleValue(node, rule.value, rule.unit, rule.format) %>", "</td>", "<% }); %>", "</tr>", "<% }); %>", "</tbody>", '<thead><tr><td colspan="<%- _.size(nodes)+1 %>" class="lead" style="font-weight: bold;"><i class="icon-th-large"></i> Index Activity</td></tr></thead>', "<tbody>", "<% _.each(actionRules, function(rule, key) { %>", "<tr>", '<td style="white-space: nowrap;">', "<strong><%- rule.label %></strong>", "</td>", "<% _.each(nodes, function(node, k) { %>", '<td rel="popRight" data-trigger="hover" data-container="#nodestable" data-html="true" data-placement="top" data-title="<b>How this Field is Calculated</b>" data-content="<%- makeDiagnosticsPopOver(node, rule) %>" style="white-space: nowrap; text-align: right;" class="<%- calculateCellClass(node, rule) %>">', "<%- calculateRuleValue(node, rule.value, rule.unit, rule.format) %>", "</td>", "<% }); %>", "</tr>", "<% }); %>", "</tbody>", '<thead><tr><td colspan="<%- _.size(nodes)+1 %>" class="lead" style="font-weight: bold;"><i class="icon-th-large"></i> Cache Activity</td></tr></thead>', "<tbody>", "<% _.each(cacheRules, function(rule, key) { %>", "<tr>", '<td style="white-space: nowrap;">', "<strong><%- rule.label %></strong>", "</td>", "<% _.each(nodes, function(node, k) { %>", '<td rel="popRight" data-trigger="hover" data-container="#nodestable" data-html="true" data-placement="top" data-title="<b>About this Field</b>" data-content="<%- makeDiagnosticsPopOver(node, rule) %>" style="white-space: nowrap; text-align: right;" class="<%- calculateCellClass(node, rule) %>">', "<%- calculateRuleValue(node, rule.value, rule.unit, rule.format) %>", "</td>", "<% }); %>", "</tr>", "<% }); %>", "</tbody>", '<thead><tr><td colspan="<%- _.size(nodes)+1 %>" class="lead" style="font-weight: bold;"><i class="icon-th-large"></i> Memory</td></tr></thead>', "<tbody>", "<% _.each(memoryRules, function(rule, key) { %>", "<tr>", '<td style="white-space: nowrap;">', "<strong><%- rule.label %></strong>", "</td>", "<% _.each(nodes, function(node, k) { %>", '<td rel="popRight" data-trigger="hover" data-container="#nodestable" data-html="true" data-placement="top" data-title="<b>How this Field is Calculated</b>" data-content="<%- makeDiagnosticsPopOver(node, rule) %>" style="white-space: nowrap; text-align: right;" class="<%- calculateCellClass(node, rule) %>">', "<%- calculateRuleValue(node, rule.value, rule.unit, rule.format) %>", "</td>", "<% }); %>", "</tr>", "<% }); %>", "</tbody>", '<thead><tr><td colspan="<%- _.size(nodes)+1 %>" class="lead" style="font-weight: bold;"><i class="icon-th-large"></i> Network</td></tr></thead>', "<tbody>", "<% _.each(networkRules, function(rule, key) { %>", "<tr>", '<td style="white-space: nowrap;">', "<strong><%- rule.label %></strong>", "</td>", "<% _.each(nodes, function(node, k) { %>", '<td rel="popRight" data-trigger="hover" data-container="#nodestable" data-html="true" data-placement="top" data-title="<b>How this Field is Calculated</b>" data-content="<%- makeDiagnosticsPopOver(node, rule) %>" style="white-space: nowrap; text-align: right;" class="<%- calculateCellClass(node, rule) %>">', "<%- calculateRuleValue(node, rule.value, rule.unit, rule.format) %>", "</td>", "<% }); %>", "</tr>", "<% }); %>", "</tbody>", "</table>", "</div> <!-- row -->", '<div class="modal hide fade" id="selectDiagnosticsNodeModal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>Select Nodes</h3>", "</div>", '<div class="modal-body" style="overflow-y: visible;">', '<div class="alert alert-info" id="selectNodes">', "<p>Choose which nodes you would like to diagnose. Note that selecting a large number of nodes, may negatively impact performance.</p>", '<form  class="form-inline"><select id="selectedNodes" class="selectpicker" data-style="btn-default" data-selected-text-format="count>5" multiple title="Select Nodes..." data-size="10">', "<% _.each(allNodes, function(node, key) { %>", "<% if (node.selected == true) { %>", '<option selected value="<%- node.id %>"><%- node.name %></option>', "<% } else { %>", '<option value="<%- node.id %>"><%- node.name %></option>', "<% } %>", "<% }) %>", "</select>", '<button class="btn btn-info" id="refreshSelectedNodes">Filter</button>', "</form>", "</div>", "</div>", "</div>", '<div class="modal hide fade" id="diagnosticsModal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>About Node Diagnostics</h3>", "</div>", '<div class="modal-body">', "<p>This screen provides helpful information for common metrics and performance problems.</p>", "<p><b>Note: Mouseover each table cell for help, calculation logic and values.</b></p>", "<p>The color-coding scheme uses threshold ranges to determine acceptable values for each of your node values.</p>", '<table class="table table-bordered">', '<tr><td class="success">Value is in acceptable range.</td></tr>', '<tr><td class="warning">Value is within a warning range.</td></tr>', '<tr><td class="error">Value is beyond acceptable levels.</td></tr>', "</table> ", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', "</div>", "</div>"].join("\n"), nodeTemplate.jvminfotable = ['<div class="span4"> ', '<div class="text-center">&nbsp;</div>', '<table class="table table-condensed table-striped table-bordered">', '<tr><td>Heap Used:</td><td><%- numeral(jvmStats.mem.heap_used_in_bytes).format("0.0b") %></td></tr>', '<tr><td>Heap Committed:</td><td><%- numeral(jvmStats.mem.heap_committed_in_bytes).format("0.0b") %></td></tr>', '<tr><td>Non Heap Used:</td><td><%- numeral(jvmStats.mem.non_heap_used_in_bytes).format("0.0b") %></td></tr>', '<tr><td>Non Heap Committed:</td><td><%- numeral(jvmStats.mem.non_heap_committed_in_bytes).format("0.0b") %></td></tr>', "<tr><td>JVM Uptime:</td><td><%- timeUtil.convertMS(jvmStats.uptime_in_millis) %></td></tr>", "<tr><td>Thread Count/Peak:</td><td><%- jvmStats.threads.count %> / <%- jvmStats.threads.peak_count %></td></tr>", '<% if(versionUtil.isNewer("0.99.0", cluster.versionNumber.concat)) { %>', "<tr><td>GC (Young) Count:</td><td><%- jvmStats.gc.collectors.young.collection_count %></td></tr>", "<tr><td>GC (Young)Time:</td><td><%- timeUtil.convertMS(jvmStats.gc.collectors.young.collection_time_in_millis) %></td></tr>", "<tr><td>GC (Old) Count:</td><td><%- jvmStats.gc.collectors.old.collection_count %></td></tr>", "<tr><td>GC (Old)Time:</td><td><%- timeUtil.convertMS(jvmStats.gc.collectors.old.collection_time_in_millis) %></td></tr>", "<% } else { %>", "<tr><td>GC Count:</td><td><%- jvmStats.gc.collection_count %></td></tr>", "<tr><td>GC Time:</td><td><%- timeUtil.convertMS(jvmStats.gc.collection_time_in_millis) %></td></tr>", "<% } %>", "<tr><td>Java Version:</td><td><%- jvmStats.version %></td></tr>", "<tr><td>JVM Vendor:</td><td><%- jvmStats.vm_vendor %></td></tr>", "<tr><td>JVM:</td><td><%- jvmStats.vm_name %></td></tr>", "</table>", "</div>"].join("\n"), nodeTemplate.nodeInfo = ['<div class="modal hide fade" id="killnodemodal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>WARNING!</h3>", "</div>", '<div class="modal-body">', "<p>Are you sure you want to Shutdown this Node?<br/><br/>You will have to re-start the node manually after this action!</p>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', '<a href="#shutdownNode/<%- nodeId %>" class="btn btn-danger">Shutdown!</a>', "</div>", "</div>", '<div class="row-fluid"">', '<div class="well">', '<div class="pull-left"><button id="refreshNodeInfo" class="btn btn-mini"  rel="tipRight" data-placement="bottom" data-html="true" data-title="Refreshing every <%- polling/1000 %> seconds.<br/>Click to Force Refresh."><i class="icon-refresh"></i> <%- lastUpdateTime %></button></div>', '<div id="toolbar" class="pull-right">', '<div class="btn-group">', '<a href="#nodeInfoModal" role="button" data-toggle="modal" class="btn btn-info" rel="tipRight" data-placement="bottom" data-title="Just the Facts, Ma\'am"', '><i class="icon-info-sign"></i></a>', '<a href="#killnodemodal" data-toggle="modal" role="button" class="btn btn-info" rel="tipRight" data-placement="bottom" data-title="Shutdown Node"><i', ' class="icon-off"></i>', "</a>", "</div> <!-- btn group -->", "</div> <!-- toolbar --> ", '<div class="text-center">', '<span style="font-size: 28px;"><%- nodeName %></span>', "</div>", "</div><!-- well -->", "</div>", '<div class="lead text-left"><i class="icon-th-large"></i> JVM</div>', '<div class="row-fluid">', nodeTemplate.jvminfotable, '<div class="span4">', '<div class="text-center"><strong>Heap Memory</strong></div>', '<div class="chart-container text-center">', '<div id="chart-jvmheap" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", '<div class="span4">', '<div class="text-center"><strong>Non Heap Memory</strong></div>', '<div class="chart-container text-center">', '<div id="chart-jvmnonheap" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", "</div>", "</div> <!-- end row -->", '<ul class="nav nav-list">', '<li class="divider"></li>', "</ul>", '<div class="lead text-left"><i class="icon-th-large"></i> Indices</div>', '<div class="row-fluid">', '<div class="span4"> ', '<div class="text-center">&nbsp;</div>', '<table class="table table-condensed table-striped table-bordered">', '<tr><td>Documents:</td><td><%- numeral(indices.docs.count).format("0,0") %></td></tr>', '<tr><td>Documents Deleted:</td><td><%- numeral(indices.docs.deleted).format("0,0") %></td></tr>', '<tr><td>Store Size:</td><td><%- numeral(indices.store.size_in_bytes).format("0.0b") %></td></tr>', '<tr><td>Index Req Total:</td><td><%- numeral(indices.indexing.index_total).format("0,0") %></td></tr>', '<tr><td>Delete Req Total:</td><td><%- numeral(indices.indexing.delete_total).format("0,0") %></td></tr>', '<tr><td>Get Req Total:</td><td><%- numeral(indices.get.total).format("0,0") %></td></tr>', '<tr><td>Get(Exists) Total:</td><td><%- numeral(indices.get.exists_total).format("0,0") %></td></tr>', '<tr><td>Get(Missing) Total:</td><td><%- numeral(indices.get.missing_total).format("0,0") %></td></tr>', '<tr><td>Query Total:</td><td><%- numeral(indices.search.query_total).format("0,0") %></td></tr>', '<tr><td>Fetch Total:</td><td><%- numeral(indices.search.fetch_total).format("0,0") %></td></tr>', "</table>", "</div>", '<div class="span4">', '<div class="text-center"><strong>Index Requests Total</strong></div>', '<div class="chart-container text-center">', '<div id="chart-index" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", '<div class="span4">', '<div class="text-center"><strong>Get Requests Total</strong></div>', '<div class="chart-container text-center">', '<div id="chart-indexget" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", "</div>", "</div> <!-- end row -->", '<ul class="nav nav-list">', '<li class="divider"></li>', "</ul>", '<div class="lead text-left"><i class="icon-th-large"></i> Operating System</div>', '<div class="row-fluid">', '<div class="span4"> ', '<div class="text-center">&nbsp;</div>', '<table class="table table-condensed table-striped table-bordered">', "<tr><td>Uptime:</td><td><%- timeUtil.convertMS(osStats.uptime_in_millis) %></td></tr>", "<tr><td>Total Memory:</td><td><%- osStats.mem.total %></td></tr>", "<tr><td>Total Swap:</td><td><%- osStats.swap.total %></td></tr>", "<tr><td>Memory (Used/Free):</td><td><%- osStats.mem.used %> / <%- osStats.mem.free %></td></tr>", "<tr><td>Swap (Used/Free):</td><td><%- osStats.swap.used %> / <%- osStats.swap.free %></td></tr>", "<tr><td>CPU User/Sys:</td><td><%- osStats.cpu.user %>% / <%- osStats.cpu.sys %>%</td></tr>", "<tr><td>CPU Idle:</td><td><%- osStats.cpu.idle %>%</td></tr>", "<tr><td>CPU Vendor:</td><td><%- osStats.cpu.vendor %></td></tr>", "<tr><td>CPU Model:</td><td><%- osStats.cpu.model %></td></tr>", "<tr><td>Total Cores:</td><td><%- osStats.cpu.total_cores %></td></tr>", "</table>", "</div>", '<div class="span4">', '<div class="text-center"><strong>CPU Usage (%)</strong></div>', '<div class="chart-container text-center">', '<div id="chart-cpu" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", '<div class="span4">', '<div class="text-center"><strong>Memory Usage (GB)</strong></div>', '<div class="chart-container text-center">', '<div id="chart-mem" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", "</div>", "</div> <!-- end row -->", '<ul class="nav nav-list">', '<li class="divider"></li>', "</ul>", '<div class="lead text-left"><i class="icon-th-large"></i> Process</div>', '<div class="row-fluid">', '<div class="span4"> ', '<div class="text-center">&nbsp;</div>', '<table class="table table-condensed table-striped table-bordered">', "<tr><td>Open File Descriptors:</td><td><%- processStats.open_file_descriptors %></td></tr>", "<tr><td>CPU Usage:</td><td><%- processStats.cpu.percent %>% of <%- osStats.max_proc_cpu %>%</td></tr>", "<tr><td>CPU System:</td><td><%- timeUtil.convertMS(processStats.cpu.sys_in_millis) %></td></tr>", "<tr><td>CPU User:</td><td><%- timeUtil.convertMS(processStats.cpu.user_in_millis) %></td></tr>", "<tr><td>CPU Total:</td><td><%- timeUtil.convertMS(processStats.cpu.total_in_millis) %></td></tr>", '<tr><td>Resident Memory:</td><td><%- numeral(processStats.mem.resident_in_bytes).format("0.0b") %></td></tr>', '<tr><td>Shared Memory:</td><td><%- numeral(processStats.mem.share_in_bytes).format("0.0b") %></td></tr>', '<tr><td>Total Virtual Memory:</td><td><%- numeral(processStats.mem.total_virtual_in_bytes).format("0.0b") %></td></tr>', "</table>", "</div>", '<div class="span4">', '<div class="text-center"><strong>CPU Usage (%)</strong></div>', '<div class="chart-container text-center">', '<div id="chart-procpu" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", '<div class="span4">', '<div class="text-center"><strong>Memory Usage</strong></div>', '<div class="chart-container text-center">', '<div id="chart-procmem" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", "</div>", "</div> <!-- end row -->", '<ul class="nav nav-list">', '<li class="divider"></li>', "</ul>", '<div class="lead text-left"><i class="icon-th-large"></i> Thread Pools</div>', '<div class="row-fluid">', '<div class="span4"> ', '<div class="text-center">&nbsp;</div>', '<table class="table table-condensed table-striped table-bordered">', "<tr><td>Index (Queue/Peak/Active):</td><td><%- threadPool.index.queue %>/<%- threadPool.index.largest %>/<%- threadPool.index.active%></td></tr>", "<tr><td>Get (Queue/Peak/Active):</td><td><%- threadPool.get.queue %>/<%- threadPool.get.largest %>/<%- threadPool.get.active%></td></tr>", "<tr><td>Search (Queue/Peak/Active):</td><td><%- threadPool.search.queue %>/<%- threadPool.search.largest %>/<%- threadPool.search.active%></td></tr>", "<tr><td>Bulk (Queue/Peak/Active):</td><td><%- threadPool.bulk.queue %>/<%- threadPool.bulk.largest %>/<%- threadPool.bulk.active%></td></tr>", "<tr><td>Refresh (Queue/Peak/Active):</td><td><%- threadPool.refresh.queue %>/<%- threadPool.refresh.largest %>/<%- threadPool.refresh.active%></td></tr>", "<tr><td>Flush (Queue/Peak/Active):</td><td><%- threadPool.flush.queue %>/<%- threadPool.flush.largest %>/<%- threadPool.flush.active%></td></tr>", "<tr><td>Merge (Queue/Peak/Active):</td><td><%- threadPool.merge.queue %>/<%- threadPool.merge.largest %>/<%- threadPool.merge.active%></td></tr>", "<tr><td>Management (Queue/Peak/Active):</td><td><%- threadPool.management.queue %>/<%- threadPool.management.largest %>/<%- threadPool.management.active%></td></tr>", "</table>", "</div>", '<div class="span4">', '<div class="text-center"><strong>Index Thread Count</strong></div>', '<div class="chart-container text-center">', '<div id="chart-threadindex" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", '<div class="span4">', '<div class="text-center"><strong>Search Thread Count</strong></div>', '<div class="chart-container text-center">', '<div id="chart-threadsearch" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", "</div>", "</div> <!-- end row -->", '<ul class="nav nav-list">', '<li class="divider"></li>', "</ul>", '<div class="lead text-left"><i class="icon-th-large"></i> Network</div>', '<div class="row-fluid">', '<div class="span4"> ', '<div class="text-center">&nbsp;</div>', '<table class="table table-condensed table-striped table-bordered">', "<tr><td>HTTP Address:</td><td><%- netInfo.http.address %></td></tr>", "<tr><td>HTTP Bound Address:</td><td><%- netInfo.http.bound_address %></td></tr>", "<tr><td>HTTP Publish Address:</td><td><%- netInfo.http.publish_address %></td></tr>", "<tr><td>Transport Address:</td><td><%- netInfo.transport.address %></td></tr>", "<tr><td>Transport Bound Address:</td><td><%- netInfo.transport.bound_address %></td></tr>", "<tr><td>Transport Publish Address:</td><td><%- netInfo.transport.publish_address %></td></tr>", "</table>", "</div>", '<div class="span4">', '<div class="text-center"><strong>Transport TX Count</strong></div>', '<div class="chart-container text-center">', '<div id="chart-transporttx" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", '<div class="span4">', '<div class="text-center"><strong>HTTP Open</strong></div>', '<div class="chart-container text-center">', '<div id="chart-httpopen" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", "</div>", "</div> <!-- end row -->", '<ul class="nav nav-list">', '<li class="divider"></li>', "</ul>", '<div class="lead text-left"><i class="icon-th-large"></i> File System</div>', "<% if (_.size(fileSystemArr) > 0) { %>", "<% _.each(fileSystemArr, function(fileSystem, count) { %>", "<% if (fileSystem != undefined) { %>", '<div class="row-fluid">', '<div class="span4"> ', "<h4>FileSystem <%- count %></h4>", '<div class="text-center">&nbsp;</div>', '<table class="table table-condensed table-striped table-bordered">', "<tr><td>Path:</td><td><%- fileSystem.path %></td></tr>", "<tr><td>Mount:</td><td><%- fileSystem.mount %></td></tr>", "<tr><td>Device:</td><td><%- fileSystem.dev %></td></tr>", '<tr><td>Total Space:</td><td><%- numeral(fileSystem.total_in_bytes).format("0.0b") %></td></tr>', '<tr><td>Free Space:</td><td><%- numeral(fileSystem.free_in_bytes).format("0.0b") %></td></tr>', '<tr><td>Disk Reads:</td><td><%- numeral(fileSystem.disk_reads).format("0,0") %></td></tr>', '<tr><td>Disk Writes:</td><td><%- numeral(fileSystem.disk_writes).format("0,0") %></td></tr>', '<tr><td>Read Size:</td><td><%- numeral(fileSystem.disk_read_size_in_bytes).format("0.0b") %></td></tr>', '<tr><td>Write Size:</td><td><%- numeral(fileSystem.disk_write_size_in_bytes).format("0.0b") %></td></tr>', "</table>", "</div>", '<div class="span4">', '<div class="text-center"><strong># Disk Reads</strong></div>', '<div class="chart-container text-center">', '<div id="chart-fsreads<%- count %>" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", '<div class="span4">', '<div class="text-center"><strong># Disk Writes</strong></div>', '<div class="chart-container text-center">', '<div id="chart-fswrites<%- count %>" class="chart-placeholder"></div>', '<div id="legend"></div>', "</div>", "</div>", "</div>", "</div> <!-- end row -->", '<ul class="nav nav-list">', '<li class="divider"></li>', "</ul>", "<% } %>", "<% }) %>", "<% } %>"].join("\n");
var queryTemplate = {};
queryTemplate.sideNav = ['<div id="queryError-loc"></div>', "<form>", '<input type="text" placeholder="Search Query..." name="queryString" class="span12" id="queryString">', "<hr/>", '<div class="accordion" id="queryAccordion">', '<a data-toggle="collapse" data-parent="#queryAccordion" href="#collapseIndices">', '<b><i class="icon-expand-alt"></i> Indices</b>', "</a>", '<a href="#toggleIndex" id="toggleIndex" class="pull-right checked">', '<b><i class="icon-check"></i> Toggle</b>', "</a>", '<div id="collapseIndices" class="accordion-body collapse in">', '<div class="accordion-inner">', '<ul class="nav nav-list" id="checkboxindices">', "<% _.each(indices, function(index) { %>", "<li>", '<label><input type="checkbox" name="<%- index %>" style="margin: 0px;" checked> <span><%- index %></span></label>', "</li>", "<% }) %>", "</ul>", "</div>", "</div>", '<a data-toggle="collapse" data-parent="#queryAccordion" href="#collapseFields">', '<b><i class="icon-expand-alt"></i> Fields</b>', "</a>", '<a href="#toggleFields" id="toggleFields" class="pull-right checked">', '<b><i class="icon-check"></i> Toggle</b>', "</a>", '<div id="collapseFields" class="accordion-body collapse in">', '<div class="accordion-inner">', '<ul class="nav nav-list" id="checkboxfields">', "<% _.each(fields, function(field) { %>", "<li>", '<label><input type="checkbox" name="<%- field %>" style="margin: 0px;" checked> <span><%- field %></span></label>', "</li>", "<% }) %>", "</ul>", "</div>", "</div>", '<a data-toggle="collapse" data-parent="#queryAccordion" href="#collapseSort">', '<b><i class="icon-expand-alt"></i> Sort By</b>', "</a>", '<div id="collapseSort" class="accordion-body collapse in">', '<div class="accordion-inner" style="padding-left: 0px;">', '<div id="collapseSort" style="padding-left: 0px;">', '<select id="sortBy" class="span12 selectpicker" data-container="body">', "<% _.each(types, function(type) { %>", "<option><%- type %></option>", "<% }) %>", "</select>", '<select id="sortDir" class="span12 selectpicker" data-container="body">', '<option data-icon="icon-chevron-sign-up">Ascending</option>', '<option data-icon="icon-chevron-sign-down">Descending</option>', "</select>", "</div>", "</div>", "</div>", '<a data-toggle="collapse" data-parent="#queryAccordion" href="#collapseDisplay">', '<b><i class="icon-expand-alt"></i> Display</b>', "</a>", '<div id="collapseDisplay" class="accordion-body collapse in">', '<div class="accordion-inner" style="padding-left: 0px;">', '<div  style="padding-left: 0px;">', '<div class="controls form-inline">', '<label class="control-label">Per Page</label>', '<select id="perPage" class="span6">', "<option>50</option>", "<option>100</option>", "<option>500</option>", "<option>1000</option>", "</select>", "</div>", "</div>", "</div>", "</div>", "</div>", "<hr/>", '<button class="btn btn-success pull-right" type="button" id="querySubmit"><b>Search <i class="icon-caret-right"></i></b></button>', "</form>"].join("\n"), queryTemplate.view = ['<div class="span2 sidebar-nav well">', queryTemplate.sideNav, "</div>", '<div class="span10" id="searchResults">', "<h2>Query UI</h2>", "<p>Use the options on the left-hand menu to query your indices.</p>", "</div>"].join("\n"), queryTemplate.results = ['<div class="row-fluid">', '<div class="span6">', '<div class="pull-left muted"><small><%- results.totalHits %> results in <%- results.responseTime %>ms<br/>', "Page <%- currentPage %> of <%- maxPages %>. Showing <%- pageSize %> Per Page.</small>", "</div>", "</div>", '<div class="span6">', '<div class="pull-right">', "<% if (currentPage != 1) { %>", '<a href="#" id="loadPrev" class="btn btn-success"><i class="icon-double-angle-left"></i> Prev</a>', "<% } %>", "<% if(currentPage != maxPages) { %>", '<a href="#" id="clearResults" class="btn btn-success">Clear results <i class="icon-reply"></i></a>', '<a href="#" id="loadNext" class="btn btn-success">Next <i class="icon-double-angle-right"></i></a>', "<% } %>", '<a href="#queryJSONRequestModal" id="queryRequest" class="btn" rel="tipRight" data-title="View JSON Request." data-toggle="modal" role="button" ><i class="icon-upload"></i></a>', '<a href="#queryJSONResponseModal" id="queryResponse" class="btn"  rel="tipRight" data-title="View JSON Response." data-toggle="modal" role="button" ><i class="icon-download"></i></a>', "</div>", "</div>", "</div>", '<div class="row-fluid">', '<div class="span12">', '<div class="center-table">', '<table class="table table-bordered table-striped table-hover" id="queryResultsTable">', "<thead><tr>", "<th></th>", "<% _.each(columns, function(col) { %>", '<% if (col.type == "source" )  { %> <th style="color: green"> ', "<% } else { %> <th> <% } %>", '<span style="font-size: 13px;"><%- col.name %></span></th>', "<% }); %>", "</tr>", "</thead>", "<tbody>", "<% _.each(results.results, function(hit, key) { %>", "<tr>", '<td><a href="#itemJSONReponseModal"  data-toggle="modal" role="button" data-id="<%- key %>"class="btn btn-mini itemjsoncl" rel="tipRight" data-title="View JSON Data"><i class="icon-code" style="font-size: 12px;"></i></a></td>', "<% _.each(columns, function(col) { %>", '<td style="font-size: 12px;"><%- hit[col.key] %></td>', "<% }); %>", "</tr>", "<% }); %>", "</tbody", "</table>", "</div>", "</div>", "</div>", '<div class="modal hide fade large" id="itemJSONReponseModal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>JSON Response</h3>", "</div>", '<div class="modal-body">', '<pre class="prettyprint language-json">', '<div id="itemraw"></div> ', "</pre>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', "</div>", "</div>", '<div class="modal hide fade large" id="queryJSONResponseModal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>JSON Response</h3>", "</div>", '<div class="modal-body">', '<pre class="prettyprint language-json">', "<%- resultBody %>", "</pre>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', "</div>", "</div>", '<div class="modal hide fade large" id="queryJSONRequestModal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>Query Request</h3>", "</div>", '<div class="modal-body">', '<pre class="prettyprint language-json">', "<%- requestBody %>", "</pre>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', "</div>", "</div>"].join("\n");
var restTemplate = {};
restTemplate.sideNav = ['<ul class="nav nav-list">', '<li class="nav-header">Editor</li>', '<li><a href="#jsoneditor"><i class="icon-double-angle-right"></i> JSON Editor</a></li>', '<li class="nav-header">Cluster</li>', '<li><a href="#restcall/health"><i class="icon-double-angle-right"></i> Health</a></li>', '<li><a href="#restcall/state"><i class="icon-double-angle-right"></i> State</a></li>', '<li><a href="#restcall/cluster_settings"><i class="icon-double-angle-right"></i> Settings</a></li>', '<li><a href="#restcall/ping"><i class="icon-double-angle-right"></i> Ping</a></li>', '<li class="nav-header">Nodes</li>', '<li><a href="#restcall/nodeinfo"><i class="icon-double-angle-right"></i> Info</a></li>', '<li><a href="#restcall/nodestats"><i class="icon-double-angle-right"></i> Stats</a></li>', '<li><a href="#restcall/cputhreads" rel="popRight"  data-trigger="hover"  data-title="Note..." data-html="true" data-content="The information will open in a new window."><i class="icon-double-angle-right"></i> CPU Threads</a></li>', '<li><a href="#restcall/waitthreads" rel="popRight"  data-trigger="hover"  data-title="Note..." data-html="true" data-content="The information will open in a new window."><i class="icon-double-angle-right"></i> Wait Threads</a></li>', '<li><a href="#restcall/blockthreads" rel="popRight"  data-trigger="hover"  data-title="Note..." data-html="true" data-content="The information will open in a new window."><i class="icon-double-angle-right"></i> Block Threads</a></li>', '<li class="nav-header">Indices</li>', '<li><a href="#restcall/indexaliases"><i class="icon-double-angle-right"></i> Aliases</a></li>', '<li><a href="#restcall/indexsettings"><i class="icon-double-angle-right"></i> Settings</a></li>', '<li><a href="#restcall/indexstats"><i class="icon-double-angle-right"></i> Stats</a></li>', '<li><a href="#restcall/indexstatus"><i class="icon-double-angle-right"></i> Status</a></li>', '<li><a href="#restcall/indexsegments"><i class="icon-double-angle-right"></i> Segments</a></li>', '<li><a href="#restcall/indexmappings"><i class="icon-double-angle-right"></i> Mappings</a></li>', '<li><a href="#restcall/indexrefresh"><i class="icon-cog"></i> Refresh</a></li>', '<li><a href="#restcall/indexflush"><i class="icon-cog"></i> Flush</a></li>', '<li><a href="#restcall/indexoptimize"><i class="icon-cog"></i> Optimize</a></li>', '<li><a href="#restcall/indexclearcache"><i class="icon-cog"></i> Clear Cache</a></li>', "</ul>"].join("\n"), restTemplate.docsLink = ['<a href="http://www.elasticsearch.org/guide/reference/api/" target="_blank" class="btn btn-success pull-right">API Docs <i class="icon-external-link"></i></a>'].join("\n"), restTemplate.mainView = ['<div class="span2 well sidebar-nav">', restTemplate.sideNav, "</div>", '<div class="span10">', "<div><h2>REST API UI", restTemplate.docsLink, "</h2></div>", "<p>Use the options on the left-hand menu to make REST API requests to your cluster. This screen will then display the JSON response.</p>", "<p>All commands are issued in <b>'_all'</b> scope; meaning that the request will <b>affect all of your nodes, indices, or mappings</b>.</p>", "<p>'<i class=\"icon-double-angle-right\"></i>' denote requests for information. '<i class=\"icon-cog\"></i>' denote commands and actions.</p>", "</div>"].join("\n"), restTemplate.JSONView = ['<div class="span2 well sidebar-nav">', restTemplate.sideNav, "</div>", '<div class="span10">', "<div><h2><%- title %>", restTemplate.docsLink, "</h2></div>", '<div style="padding-bottom: 5px;"><code><%- fetchURL %></code> ', '<a href="<%-fetchURL %>" target="_blank" class="btn btn-mini" rel="tipRight" data-placement="bottom" data-title="Open in New Window"><i class="icon-external-link"></i></a></div>', '<pre class="prettyprint linenums language-json">', "<%- res %>", "</pre>", "</div>"].join("\n"), restTemplate.jsonEditorView = ['<div class="span12">', "<h2>REST Editor</h2>", '<form class="form-inline">', '<select  data-width="auto" class="selectpicker" data-container="body" id="jsonformaction">', "<option>GET</option>", "<option>POST</option>", "</select>", '<span id="endpointSelect">', "</span>", '<button class="btn btn-success" type="button" id="jsonformsubmit"><b><i class="icon-caret-right"></i></b></button>', "</form>", '<div class="span3" style="padding: 0;margin: 0;">', '<pre id="jsoneditor"></pre>', "</div>", '<div class="span9">', '<pre id="jsonoutput"></pre>', "</div>", "</div>"].join("\n"), restTemplate.jsonapiendpoints = ['<select  data-width="auto" class=" selectpicker" data-container="body" id="jsonformendpoint">', "<% _.each(endpoints, function(ep) { %>", '<optgroup label="<%- ep.key %>">', "<% _.each(ep.value, function(val) { %>", "<option><%- val %></option>", "<% }) %>", "<% }) %>", "</select>"].join("\n");
var settingsTemplate = {};
settingsTemplate.saved = ['<div class="alert alert-success lead">', '<i class="icon-info-sign icon-large"></i> Settings Saved Successully! ', '<button type="button" class="close" data-dismiss="alert">&times;</button>', "</div>"].join("\n"), settingsTemplate.init = ['<div class="span10 center-table">', '<div id="savedSettings"></div>', '<form class="form-horizontal" id="editSettingsForm">', "<fieldset>", '<div id="legend">', '<legend class="">Edit Settings</legend>', "</div>", '<table class="table table-bordered table-striped">', "<tbody>", "<tr>", '<td style="white-space: nowrap;"><label for="clusterPoller"><strong>Cluster Auto-Refresh</strong></label></td>', "<td>", '<div class="input-append">', '<div class="control-group">', '<div class="controls">', '<input type="text" value="<%- settings.poller.cluster %>" id="clusterPoller" name="clusterPoller" placeholder="" class="input"  data-error-style="tooltip">', '<span class="add-on">ms.</span>', "</div>", "</div>", "</div>", "</td>", "<td>Polling frequency used on the main Cluster Overview page.</td>", "</tr>", "<tr>", '<td style="white-space: nowrap;"><label for="ndPoller"><strong>Node Diagnostics Auto-Refresh</strong></label></td>', "<td>", '<div class="input-append">', '<div class="control-group">', '<div class="controls">', '<input type="text" value="<%- settings.poller.nodeDiagnostics %>" id="ndPoller" name="ndPoller" placeholder="" class="input"  data-error-style="tooltip">', '<span class="add-on">ms.</span>', "</div>", "</div>", "</div>", "</td>", "<td>Polling frequency used on the Node Diagnostics page.</td>", "</tr>", "<tr>", '<td style="white-space: nowrap;"><label for="nPoller"><strong>Node Monitoring Auto-Refresh</strong></label></td>', "<td>", '<div class="input-append">', '<div class="control-group">', '<div class="controls">', '<input type="text" value="<%- settings.poller.node %>" id="nPoller" name="nPoller" placeholder="" class="input"  data-error-style="tooltip">', '<span class="add-on">ms.</span>', "</div>", "</div>", "</div>", "</td>", "<td>Polling frequency used on individual Node Monitoring page.</td>", "</tr>", "<tr>", '<td style="white-space: nowrap;"><label for="indicesPoller"><strong>Indices Auto-Refresh</strong></label></td>', "<td>", '<div class="input-append">', '<div class="control-group">', '<div class="controls">', '<input type="text" value="<%- settings.poller.indices %>" id="indicesPoller" name="indicesPoller" placeholder="" class="input"  data-error-style="tooltip">', '<span class="add-on">ms.</span>', "</div>", "</div>", "</div>", "</td>", "<td>Polling frequency used on the Indices List page.</td>", "</tr>", "<tr>", '<td style="white-space: nowrap;"><label for="indexPoller"><strong>Index Monitoring Auto-Refresh</strong></label></td>', "<td>", '<div class="input-append">', '<div class="control-group">', '<div class="controls">', '<input type="text" value="<%- settings.poller.index %>" id="indexPoller" name="indexPoller" placeholder="" class="input"  data-error-style="tooltip">', '<span class="add-on">ms.</span>', "</div>", "</div>", "</div>", "</td>", "<td>Polling frequency used on the Index Monitoring page.</td>", "</tr>", "<tr>", '<td style="white-space: nowrap;"><label for="nodeDiagnosticsMax"><strong>Max # Diagnostics Nodes</strong></label></td>', "<td>", '<div class="input-append">', '<div class="control-group">', '<div class="controls">', '<input type="text" value="<%- settings.nodeDiagnosticsMax %>" id="nodeDiagnosticsMax" name="nodeDiagnosticsMax" placeholder="" class="input"  data-error-style="tooltip">', "</div>", "</div>", "</div>", "</td>", "<td>Maximum number of nodes to display on the diagnostics page.</td>", "</tr>", "<tr>", '<td><label for="debugMode"><strong>Debug Mode</strong></label></td>', "<td>", '<div class="controls">', '<label class="checkbox">', "<% if ( settings.debugMode == 1) { %>", '<input type="checkbox" value="on" checked id="debugMode" name="debugMode"> Log all messages to Console', "<% } else { %>", '<input type="checkbox" value="on" id="debugMode" name="debugMode"> Log all messages to Console', "<% } %>", "</label>", "</div>", "</td>", "<td>Will print debug messages to browser console.</td>", "</tr>", "<tr>", '<td><label for="optoutStats"><strong>Statistics Opt-Out?</strong></label></td>', "<td>", '<div class="controls">', '<label class="checkbox">', "<% if ( settings.optoutStats == 1) { %>", '<input type="checkbox" value="on" checked id="optoutStats" name="optoutStats"> Opt-Out of Statistics', "<% } else { %>", '<input type="checkbox" value="on" id="optoutStats" name="optoutStats"> Opt-Out of Statistics', "<% } %>", "</label>", "</div>", "</td>", '<td>If checked, will opt you out of stats gathering. <a href="#optModal" data-toggle="modal" role="button"><small>What is this?</small></a></td>', "</tr>", "<tr>", '<td style="white-space: nowrap;"><label for="uuid"><strong>User ID</strong></label></td>', "<td>", '<div class="">', '<div class="control-group">', '<div class="controls">', '<input type="text" value="<%- settings.uuid %>" id="uuid" name="uuid" placeholder="" class="input" disabled>', "</div>", "</div>", "</div>", "</td>", "<td>Your unique User ID.</td>", "</tr>", "</tbody>", "</table>", "</fieldset>", '<div class="pull-right control-group">', '<div class="controls">', '<button type="submit" id="editSettingsSubmit" class="btn btn-success">Save Settings</button>', "</div>", "</div>", "</form>", "</div>", '<div class="modal hide fade" id="optModal">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>', "<h3>Statistics</h3>", "</div>", '<div class="modal-body">', "<p>From time to time, ElasticHQ gathers <b>Anonymous</b> Usage data that is aggregated and presented to the ", "ElasticSearch community. <b>There is no Personally Identifiable Information gathered. Only general use data is collected.</b>", '<br/><br/>To view the data gathered, <a href="http://www.elastichq.org/elasticsearchstats.php" target="_blank">click here.</a>', "<br/><br/>By opting-out, you will not be participating in the data gathering.</p>", "</div>", '<div class="modal-footer">', '<a href="#" class="btn" data-dismiss="modal">Close</a>', "</div>", "</div>"].join("\n");
var snapShotTemplate = {};
snapShotTemplate.init = [].join("\n");
var visualTemplate = {};
visualTemplate.init = ['<div class="span12 center-table">', '<div class="span2" style="padding-right: 5px;">', "<form>", '<div class="accordion" id="queryAccordion">', '<a data-toggle="collapse" data-parent="#queryAccordion" href="#collapseVIndices">', '<b><i class="icon-expand-alt"></i> Indices</b>', "</a>", '<div id="collapseVIndices" class="accordion-body collapse in">', '<div class="accordion-inner">', '<ul class="nav nav-list" id="vcheckboxindices">', "<% _.each(indices, function(index) { %>", "<li>", "<% if (_.contains(indicesArray, index)) { %>", '<label><input type="checkbox" name="<%- index %>" style="margin: 0px;" checked> <span><%- index %></span></label>', "<% } else { %>", '<label><input type="checkbox" name="<%- index %>" style="margin: 0px;"> <span><%- index %></span></label>', "<% } %>", "</li>", "<% }) %>", "</ul>", '<div class="center-table text-center" style="padding-top: 8px;padding-bottom: 10px;">', '<button class="btn btn-success btn-small" type="button" id="filterVizSubmit">Filter <i class="icon-caret-right"></i></button>', "</div>", "</div>", "</div>", '<a data-toggle="collapse" data-parent="#queryAccordion" href="#collapseLegend">', '<b><i class="icon-expand-alt"></i> Legend</b>', "</a>", '<div id="collapseLegend" class="accordion-body collapse in">', '<div class="accordion-inner">', '<ul class="nav nav-list" style="font-size: 13px;">', '<li><i class="icon-circle-blank" style="color:blue;font-weight: bold;"></i> Node</li>', '<li><i class="icon-circle-blank" style="color:green;font-weight: bold;"></i> Shard</li>', '<li><i class="icon-circle-blank" style="color:orange;font-weight: bold;"></i> Index</li>', '<li><i class="icon-asterisk" style="color:black;font-weight: bold;font-size: 10px;"></i> Primary</li>', "</ul>", '<div class="alert alert-info" style="margin-top: 20px;font-size: 12px;">Pan around the diagram using your mouse. Zoom in/out using a scroll wheel.</div>', "</div></div>", "</form>", "</div>", "</div>", '<div class="span10" id="thechart" style="width: <%- svgwidth-10 %>px; margin: 0 auto;"></div>', "</div>"].join("\n"), ErrorMessageModel = Backbone.Model.extend({});
var ClusterHealth = Backbone.Model.extend({
        initialize: function() {
            console.log("Inside ClusterHealth")
        },
        url: function() {
            return "/_cluster/health"
        }
    }),
    Cluster = Backbone.Model.extend({
        defaults: {
            versionNumber: {
                concat: void 0,
                major: void 0,
                minor: void 0,
                rev: void 0
            },
            connectionRootURL: void 0,
            clusterHealth: void 0,
            clusterState: void 0,
            nodeList: void 0,
            connected: !1,
            nodeStats: void 0,
            nodeInfo: void 0,
            indexStats: void 0
        },
        initialize: function(a) {
            var b = this;
            console.log(a.connectionRootURL);
            var c = new Ping({
                connectionRootURL: a.connectionRootURL
            });
            c.fetch({
                success: function() {
                    console.log("Successful connect!"), $.cookie("resturl", a.connectionRootURL, {
                        expires: 7,
                        path: "/"
                    });
                    var d = c.get("version");
                    d || (d = {}, d.number = "0.99.0"), d && d.number && (b.setVersionNumber(d.number), b.supportedVersion(d.number));
                    d.number.split(".")
                },
                error: function(a, b) {
                    console.log("Failed to Connect on Ping!"), show_stack_bottomright({
                        type: "error",
                        title: "Failed to Connect!",
                        text: "Connection to cluster could not be established."
                    });
                    var c = "Unable to Connect to Server! ";
                    b && (c += "Received Status Code: " + b.status + ".", 0 === b.status && (c += " A status code of 0, could mean the host is unreacheable or nothing is listening on the given port. Did you enable CORS?")), console.log("Error! " + c);
                    var d = new ErrorMessageModel({
                            warningTitle: "Error!",
                            warningMessage: c
                        }),
                        e = new ErrorMessageView({
                            el: $("#error-loc"),
                            model: d
                        });
                    e.render()
                }
            }), b.initModel(a.connectionRootURL)
        },
        setVersionNumber: function(a) {
            var b = this,
                c = a.split(".");
            b.versionNumber = {
                major: c[0],
                minor: c[1],
                rev: c[2],
                concat: c[0] + "." + c[1] + "." + c[2]
            }
        },
        supportedVersion: function(a) {
            var b = a.split(".");
            b[0] >= 0 && b[1] >= 90 || b[0] >= 1 && b[1] >= 0 || show_stack_bottomright({
                type: "warning",
                title: "Version Warning!",
                text: "ElasticHQ may not work with version " + a + ". Tested on 0.90.0-1.0.0."
            })
        },
        initModel: function(a) {
            var b = this;
            b.set({
                connected: !0
            }), b.set({
                connectionRootURL: a
            }), b.set({
                clusterHealth: new ClusterHealth({
                    connectionRootURL: a
                })
            }), b.set({
                clusterState: new ClusterState({
                    connectionRootURL: a
                })
            }), b.set({
                indexStats: new IndexStatsModel({
                    connectionRootURL: a
                })
            });
            var c = new NodeListModel;
            c.setConnectionRootURL(a), b.set({
                nodeList: c
            })
        },
        fetch: function() {
            console.log("Fetching ClusterHealth"), ajaxloading.show(), this.constructor.__super__.fetch.apply(this, arguments)
        },
        refreshClusterState: function() {
            var a = this;
            a.get("clusterState").fetch({
                success: function(b) {
                    a.set({
                        clusterState: b
                    })
                }
            })
        }
    }),
    ClusterState = Backbone.Model.extend({
        initialize: function() {
            console.log("Inside ClusterState")
        },
        url: function() {
            return "/_cluster/state"
        }
    }),
    Ping = Backbone.Model.extend({
        url: function() {
            return "/"
        }
    }),
    IndexAliasModel = Backbone.Model.extend({
        defaults: {
            indexId: void 0
        },
        initialize: function(a) {
            console.log("Inside IndexAliasModel"), this.indexId = a.indexId
        },
        url: function() {
            return void 0 !== this.indexId ? "/" + this.indexId + "/_aliases" : "/_aliases"
        },
        validation: {
            aliasId: {
                required: !0,
                msg: "Please enter a valid Alias ID"
            }
        }
    }),
    IndexHealthModel = Backbone.Model.extend({
        defaults: {
            indexId: void 0
        },
        initialize: function(a) {
            console.log("Inside IndexHealthModel"), this.indexId = a.indexId
        },
        url: function() {
            return "/_cluster/health/" + this.indexId
        }
    }),
    IndexSettingsModel = Backbone.Model.extend({
        defaults: {
            indexId: void 0
        },
        initialize: function(a) {
            console.log("Inside IndexSettingsModel"), this.indexId = a.indexId
        },
        url: function() {
            return "/" + this.indexId + "/_settings"
        }
    }),
    IndexSimple = Backbone.Model.extend({}),
    IndexStatsModel = Backbone.Model.extend({
        defaults: {
            indexId: void 0
        },
        initialize: function(a) {
            console.log("Inside IndexStatsModel"), this.indexId = a.indexId
        },
        url: function() {
            return void 0 !== this.indexId ? "/" + this.indexId + "/_stats" : "/_stats"
        }
    }),
    IndexStatusModel = Backbone.Model.extend({
        defaults: {
            indexId: void 0
        },
        initialize: function(a) {
            console.log("Inside IndexStatusModel"), this.indexId = a.indexId
        },
        url: function() {
            return "/" + this.indexId + "/_stats"
        }
    }),
    MappingSimple = Backbone.Model.extend({
        defaults: {
            indexId: void 0,
            mappingName: void 0,
            properties: {}
        },
        initialize: function(a) {
            a && (this.indexId = a.indexId, this.mappingName = a.mappingName)
        },
        url: function() {
            return "/" + this.indexId + "/" + this.mappingName + "/_mapping"
        }
    }),
    NodeHotThreadsModel = Backbone.Model.extend({
        defaults: {
            nodeId: void 0
        },
        initialize: function(a) {
            console.log("Inside NodeHotThreadsModel"), this.nodeId = a.nodeId
        },
        url: function() {
            return "/_nodes/" + this.nodeId + "/hot_threads"
        },
        parse: function(a) {
            return a
        }
    }),
    NodeInfoModel = Backbone.Model.extend({
        defaults: {
            nodeId: void 0
        },
        initialize: function(a) {
            console.log("Inside NodeInfoModel"), this.nodeId = a.nodeId
        },
        url: function () {
            if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
                return this.nodeId ? "/_cluster/nodes/" + this.nodeId + "/_all" : "/_cluster/nodes/_all"
            }
            return this.nodeId ? "/_cluster/nodes/" + this.nodeId + "?all=true" : "/_cluster/nodes?all=true"
        }
    }),
    NodeShutdownModel = Backbone.Model.extend({
        defaults: {
            nodeId: void 0
        },
        initialize: function(a) {
            console.log("Shutting down " + a.nodeId), this.nodeId = a.nodeId
        },
        url: function() {
            return "/_cluster/nodes/" + this.nodeId + "/_shutdown"
        }
    }),
    NodeSimple = Backbone.Model.extend({}),
    NodeStatsModel = Backbone.Model.extend({
        defaults: {
            nodeId: void 0
        },
        initialize: function(a) {
            console.log("Inside NodeStatsModel"), this.nodeId = a.nodeId
        },
        url: function () {
            // TODO plugin?
            if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
                return "/_cluster/nodes/" + this.nodeId + "/stats/_all"
            }
            return "/_cluster/nodes/" + this.nodeId + "/stats?all=true&plugin=true"
        },
        fetch: function() {
            console.log("Fetching NodeStats"), ajaxloading.show(), this.constructor.__super__.fetch.apply(this, arguments)
        }
    }),
    QueryModel = Backbone.Model.extend({
        defaults: {
            indexCSV: void 0,
            indicesArray: void 0,
            queryString: void 0,
            queryObj: {
                query: {
                    filtered: {
                        query: {
                            query_string: {
                                query: ""
                            }
                        }
                    }
                },
                fields: null,
                from: 0,
                size: 10,
                sort: [{
                    _score: {
                        order: "asc"
                    }
                }],
                explain: !0
            }
        },
        initialize: function(a) {
            console.log("Inside QueryModel"), this.indexCSV = a.indexCSV, this.indicesArray = a.indicesArray, this.queryString = a.queryString
        },
        url: function() {
            return "/" + this.indexCSV + "/_search"
        },
        getInstanceURL: function() {
            return cluster.get("connectionRootURL") + "/" + this.indexCSV + "/_search"
        }
    }),
    QueryResultsListModel = Backbone.Model.extend({
        defaults: {
            totalHits: 0,
            maxScore: 0,
            timeOut: !1,
            responseTime: 0,
            results: []
        },
        initialize: function() {}
    }),
    QueryUtil = {
        buildBody: function(a, b) {
            return "" === a.queryString ? {
                from: b,
                size: a.get("queryObj").size,
                sort: a.get("queryObj").sort,
                fields: a.get("queryObj").fields,
                explain: !0
            } : (a.get("queryObj").query.filtered.query.query_string.query = a.queryString, a.get("queryObj").from = b, a.toJSON().queryObj)
        }
    },
    JSONAPIModel = Backbone.Model.extend({
        defaults: {
            action: void 0,
            endpoint: void 0
        },
        initialize: function(a) {
            console.log("Inside JSONAPIModel"), this.action = a.action, this.endpoint = a.endpoint
        }
    }),
    RESTModel = Backbone.Model.extend({
        defaults: {
            fetchURL: void 0,
            cmd: void 0
        },
        initialize: function(a) {
            void 0 !== a.cmd && (this.cmd = a.cmd)
        },
        url: function() {
            return this.fetchURL = "health" == this.cmd ? "/_cluster/health" : "state" == this.cmd ? "/_cluster/state" : "cluster_settings" == this.cmd ? "/_cluster/settings" : "ping" == this.cmd ? "/" : "nodeinfo" == this.cmd ? "/_cluster/nodes?all=true" : "nodestats" == this.cmd ? "/_cluster/nodes/stats?all=true" : "indexaliases" == this.cmd ? "/_aliases" : "indexsettings" == this.cmd ? "/_settings" : "indexstats" == this.cmd ? "/_stats?all=true" : "indexstatus" == this.cmd ? "/_status" : "indexsegments" == this.cmd ? "/_segments" : "indexmappings" == this.cmd ? "/_mapping" : "indexrefresh" == this.cmd ? "/_refresh" : "indexflush" == this.cmd ? "/_flush" : "indexoptimize" == this.cmd ? "/_optimize" : "indexclearcache" == this.cmd ? "/_cache/clear" : "/", this.fetchURL
        }
    }),
    SettingsModel = Backbone.Model.extend({
        defaults: {
            hqversion: HQVERSION,
            settings: {
                uuid: null,
                poller: {
                    cluster: 1e4,
                    nodeDiagnostics: 3e4,
                    node: 1e4,
                    indices: 15e3,
                    index: 1e4
                },
                nodeDiagnosticsMax: 10,
                debugMode: 0,
                optoutStats: !1
            }
        },
        initialize: function() {
            console.log("Init Settings Model"), this.loadFromStorage()
        },
        url: function() {
            return "/"
        },
        loadFromStorage: function() {
            if (localStorage) {
                var a = localStorage.getItem("hqsettings");
                return void 0 !== a && "undefined" != a ? (this.buildSettings($.parseJSON(a)), this.saveToStorage()) : this.saveToStorage(), this
            }
        },
        getSettings: function() {
            return this.get("settings")
        },
        saveToStorage: function() {
            this.buildSettings(this.getSettings());
            try {
                localStorage.setItem("hqsettings", JSON.stringify(this.getSettings()))
            } catch (a) {
                console.log("Unable to save settings in local storage. " + a.message)
            }
        },
        buildSettings: function(a) {
            try {
                this.get("settings").uuid = null != a.uuid ? a.uuid : guid.generateGUID(), void 0 === a.poller && (a.poller = {}), this.get("settings").debugMode = void 0 !== a.debugMode ? a.debugMode : this.get("settings").debugMode, this.get("settings").nodeDiagnosticsMax = void 0 !== a.nodeDiagnosticsMax ? a.nodeDiagnosticsMax : this.get("settings").nodeDiagnosticsMax, this.get("settings").optoutStats = void 0 !== a.optoutStats ? a.optoutStats : this.get("settings").optoutStats, this.get("settings").poller.cluster = void 0 !== a.poller.cluster ? a.poller.cluster : this.get("settings").poller.cluster, this.get("settings").poller.nodeDiagnostics = void 0 !== a.poller.nodeDiagnostics ? a.poller.nodeDiagnostics : this.get("settings").poller.nodeDiagnostics, this.get("settings").poller.node = void 0 !== a.poller.node ? a.poller.node : this.get("settings").poller.node, this.get("settings").poller.indices = void 0 !== a.poller.indices ? a.poller.indices : this.get("settings").poller.indices, this.get("settings").poller.index = void 0 !== a.poller.index ? a.poller.index : this.get("settings").poller.index
            } catch (b) {
                console.log("Cannot build settings object. Using defaults. " + b.message)
            }
        },
        validation: {
            clusterPoller: {
                required: !0,
                range: [POLLER_MIN_FREQUENCY, POLLER_MAX_FREQUENCY],
                pattern: "number",
                msg: "Acceptable Range is " + POLLER_MIN_FREQUENCY + " to " + POLLER_MAX_FREQUENCY
            },
            ndPoller: {
                required: !0,
                range: [POLLER_MIN_FREQUENCY, POLLER_MAX_FREQUENCY],
                pattern: "number",
                msg: "Acceptable Range is " + POLLER_MIN_FREQUENCY + " to " + POLLER_MAX_FREQUENCY
            },
            nPoller: {
                required: !0,
                range: [POLLER_MIN_FREQUENCY, POLLER_MAX_FREQUENCY],
                pattern: "number",
                msg: "Acceptable Range is " + POLLER_MIN_FREQUENCY + " to " + POLLER_MAX_FREQUENCY
            },
            indicesPoller: {
                required: !0,
                range: [POLLER_MIN_FREQUENCY, POLLER_MAX_FREQUENCY],
                pattern: "number",
                msg: "Acceptable Range is " + POLLER_MIN_FREQUENCY + " to " + POLLER_MAX_FREQUENCY
            },
            indexPoller: {
                required: !0,
                range: [POLLER_MIN_FREQUENCY, POLLER_MAX_FREQUENCY],
                pattern: "number",
                msg: "Acceptable Range is " + POLLER_MIN_FREQUENCY + " to " + POLLER_MAX_FREQUENCY
            },
            nodeDiagnosticsMax: {
                required: !0,
                range: [1, 200],
                pattern: "number",
                msg: "Acceptable Range is 1 to 200"
            }
        }
    }),
    StatsModel = Backbone.Model.extend({
        defaults: {
            stats: {
                uuid: null,
                numnodes: null,
                numdatanodes: null,
                primaryshards: null,
                replicashards: null,
                indices: null,
                types: null,
                documents: null,
                storesize: null,
                totalmemory: null,
                heapcommitted: null,
                cpucores: null,
                plugins: null,
                javaversion: null,
                esversion: null
            }
        },
        initialize: function() {
            console.log("Init Stats Model"), this.buildStatsModel()
        },
        url: function() {
            return "/"
        },
        buildStatsModel: function() {
            console.log("Assembling Stats");
            var a = this;
            try {
                var b = (new NodeInfoModelFactory).create();
                $.when(b.fetch()).done(function(b) {
                    a.get("stats").uuid = settingsModel.get("settings").uuid, a.get("stats").numnodes = cluster.get("clusterHealth").get("number_of_nodes"), a.get("stats").numdatanodes = cluster.get("clusterHealth").get("number_of_data_nodes"), a.get("stats").primaryshards = cluster.get("clusterHealth").get("active_primary_shards"), a.get("stats").replicashards = cluster.get("clusterHealth").get("active_shards") - cluster.get("clusterHealth").get("active_primary_shards"), a.get("stats").indices = _.size(cluster.get("clusterState").get("metadata").indices), _.isUndefined(a.get("stats").documents = cluster.get("indexStats").get("_all").primaries.docs) ? (a.get("stats").documents = 0, a.get("stats").storesize = 0) : (a.get("stats").documents = cluster.get("indexStats").get("_all").primaries.docs.count, a.get("stats").storesize = cluster.get("indexStats").get("_all").primaries.store.size_in_bytes), _.each(cluster.get("clusterState").get("metadata").indices, function(b) {
                        _.each(b.mappings, function() {
                            a.get("stats").types++
                        })
                    });
                    var c = (cluster.get("clusterState").get("master_node"), b.nodes[cluster.get("clusterState").get("master_node")]);
                    void 0 !== c.jvm && (a.get("stats").javaversion = c.jvm.version, void 0 !== c.jvm.mem && (a.get("stats").heapcommitted = c.jvm.mem.heap_init_in_bytes)), void 0 !== c.os && (void 0 !== c.os.cpu && (a.get("stats").cpucores = c.os.cpu.total_cores), void 0 !== c.os.mem && (a.get("stats").totalmemory = c.os.mem.total_in_bytes)), a.get("stats").plugins = _.size(c.plugins), a.get("stats").esversion = c.version, $.ajax({
                        type: "POST",
                        url: REMOTE_API_PATH + "/statspost.php",
                        processData: !1,
                        cache: !1,
                        crossDomain: !0,
                        dataType: "json",
                        data: JSON.stringify(a.get("stats")),
                        success: function() {},
                        error: function(a) {
                            console.log("ERROR! " + a.responseText)
                        }
                    })
                })
            } catch (c) {
                console.log("ERROR! " + c.message)
            }
        }
    }),
    ClearCacheAllIndex = Backbone.Model.extend({
        initialize: function() {
            console.log("Inside ClearCacheAllIndex")
        },
        url: function() {
            return "/_cache/clear"
        }
    }),
    FlushAllIndex = Backbone.Model.extend({
        initialize: function() {
            console.log("Inside FlushAllIndex")
        },
        url: function() {
            return "/_flush"
        }
    }),
    IndexModel = Backbone.Model.extend({
        defaults: {
            indexId: void 0,
            cmd: void 0
        },
        initialize: function(a) {
            console.log("Creating Index " + a.indexId), this.indexId = a.indexId, void 0 !== a.cmd && (this.cmd = a.cmd)
        },
        url: function() {
            return void 0 !== this.cmd ? "/" + this.indexId + "/" + this.cmd : "/" + this.indexId
        },
        validation: {
            indexId: {
                required: !0,
                msg: "Please enter a valid Index ID"
            }
        }
    }),
    OptimizeAllIndex = Backbone.Model.extend({
        initialize: function() {
            console.log("Inside OptimizeAllIndex")
        },
        url: function() {
            return "/_optimize"
        }
    }),
    RefreshAllIndex = Backbone.Model.extend({
        initialize: function() {
            console.log("Inside RefreshAllIndex")
        },
        url: function() {
            return "/_refresh"
        }
    }),
    IndicesStatusModel = Backbone.Collection.extend({
        model: IndexSimple,
        initialize: function() {
            console.log("Inside IndicesStatusModel")
        },
        url: function() {
            return "/_stats"
        },
        parse: function(a) {
            for (var b = a.indices, c = _.keys(b), d = _.values(b), e = 0; e < c.length; e++) d[e].id = c[e];
            return d
        }
    }),
    MappingsModel = Backbone.Collection.extend({
        model: MappingSimple,
        url: function() {
            return "/_mapping"
        },
        parse: function(a) {
            for (var b = [], c = _.keys(a), d = _.values(a), e = 0; e < c.length; e++)
                for (var f = c[e], g = _.keys(d[e]), h = _.values(d[e]), i = 0; i < g.length; i++) {
                    var j = new MappingSimple;
                    j.indexId = f, j.mappingName = g[i], j.properties = h[i].properties, b.push(j)
                }
            return b
        }
    }),
    NodeInfoListModel = Backbone.Model.extend({
        defaults: {
            selectedNodes: void 0
        },
        initialize: function() {
            console.log("Inside NodeInfoListModel")
        },
        url: function() {
            var a = this.get("selectedNodes");
            if (void 0 == a || 0 === a.length) {
                if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
                    return "/_cluster/nodes/_all"
                }
                return "/_cluster/nodes?all=1"
            }
            for (var b = "", c = 0; c < a.length; c++) b += a[c], a.length - 1 > c && (b += ",");
            return "/_cluster/nodes/" + b
        }
    }),
    NodeListModel = Backbone.Collection.extend({
        model: NodeSimple,
        masterNode: "",
        initialize: function() {
            console.log("Inside NodeList")
        },
        url: function () {
            // TODO &filter_indices=true
            if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
                return "/_cluster/state/master_node,nodes,metadata,routing_table,blocks"
            }
            return "/_cluster/state?filter_nodes=false&filter_metadata=true&filter_routing_table=true&filter_blocks=true&filter_indices=true"
        },
        parse: function(a) {
            a.master_node && (console.log("Master Node is: " + a.master_node), this.masterNode = a.master_node);
            var b = a.nodes;
            b[this.masterNode].master = !0;
            for (var c = _.keys(b), d = _.values(b), e = 0; e < c.length; e++) d[e].id = c[e];
            return d = _.sortBy(d, function(a) {
                return a.name
            }), d = _.sortBy(d, function(a) {
                return a.master
            })
        }
    }),
    NodeStatsListModel = Backbone.Model.extend({
        defaults: {
            selectedNodes: void 0
        },
        initialize: function() {
            console.log("Inside NodeStatsListModel")
        },
        url: function() {
            var a = this.get("selectedNodes");
            if (void 0 == a || 0 === a.length) {
                if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
                    return "/_cluster/nodes/stats/_all"
                }
                return "/_cluster/nodes/stats?all=1"
            }
            for (var b = "", c = 0; c < a.length; c++) b += a[c], a.length - 1 > c && (b += ",");
            if (versionUtil.isNewerOrEqual("5.0.0", cluster.versionNumber.concat)) {
                return "/_cluster/nodes/" + b + "/stats/_all"
            }
            return "/_cluster/nodes/" + b + "/stats?all=1"
        },
        fetch: function() {
            ajaxloading.show(), this.constructor.__super__.fetch.apply(this, arguments)
        }
    }),
    ErrorMessageView = Backbone.View.extend({
        initialize: function() {
            console.log("Inside ErrorMessage")
        },
        render: function() {
            $(this.el).html(_.template(messageTemplate.error, this.model.attributes))
        }
    }),
    CreateAliasView = Backbone.View.extend({
        el: $("#workspace"),
        events: {
            "click #createAliasSubmit": "saveToModel"
        },
        initialize: function(a) {
            this.indexId = a.indexId
        },
        saveToModel: function(a) {
            a.preventDefault();
            var b = this.$("#createAliasForm").serializeObject();
            this.model.set(b);
            var c = this;
            return this.model.indexId = void 0, this.model.save({
                actions: [{
                    add: {
                        index: c.model.get("indexId"),
                        alias: c.model.get("aliasId"),
                        search_routing: c.model.get("search_routing") || void 0,
                        index_routing: c.model.get("index_routing") || void 0
                    }
                }]
            }, {
                success: function() {
                    Backbone.history.navigate("index/" + c.model.get("indexId"), !0), show_stack_bottomright({
                        type: "success",
                        title: "Alias Created",
                        text: '"' + c.model.get("aliasId") + '" created.'
                    })
                },
                error: function(a, b) {
                    var d = '<p>Server Response is...</p><pre class="prettyprint language-json">' + b.responseText + "</pre>";
                    show_stack_bottomright({
                        type: "error",
                        title: "Alias Failed",
                        text: d,
                        hide: !1,
                        closer_hover: !1
                    }), prettyPrint(), Backbone.history.navigate("index/" + c.model.get("indexId"), !0)
                }
            }), this.unbind(), this.model.unbind("#createAliasSubmit", this.render), Backbone.history.navigate("index/" + this.indexId, !0), !1
        },
        render: function() {
            var a = this,
                b = _.template(indexActionTemplate.createAlias);
            return $("#workspace").html(b({
                indexId: a.indexId,
                indexName: a.indexId,
                model: a.model
            })), Backbone.Validation.bind(this), this
        },
        onClose: function() {
            this.model.unbind("#createAliasSubmit", this.render)
        },
        indexId: void 0
    }),
    ClusterHealthView = Backbone.View.extend({
        initialize: function(a) {
            this.stateModel = a.stateModel, this.indexModel = a.indexModel
        },
        events: {
            "click #clusterHealthButton": "clicked"
        },
        clicked: function() {
            this.renderWorkspace()
        },
        renderWorkspace: function() {
            var a = this.model;
            void 0 === this.stateModel && (this.stateModel = cluster.get("clusterState")), void 0 === this.indexModel && (this.indexModel = cluster.get("indexStats"));
            var b = {};
            b.shards = this.indexModel.get("_shards"), b.docs = jQuery.isEmptyObject(this.indexModel.get("_all")) ? {} : this.indexModel.get("_all").primaries.docs, void 0 === b.docs && (b.docs = {}, b.docs.count = 0), b.store = this.indexModel.get("_all").primaries.store, void 0 === b.store && (b.store = {}, b.store.size = 0, b.store.size_in_bytes = 0);
            var c = _.keys(this.indexModel.get("indices"));
            b.count = void 0 !== c ? c.length : 0;
            for (var d = (this.stateModel.get("metadata").indices.twitter, _.values(this.indexModel.get("indices"))), e = 0; e < c.length; e++) d[e].id = c[e];
            b.indices = [];
            for (var f = 0; f < d.length; f++) {
                var g = d[f];
                g.name = g.id, versionUtil.isNewer("0.99.0", cluster.versionNumber.concat) ? (g.numshards = this.stateModel.get("metadata").indices[g.id].settings.index.number_of_shards, g.numreplicas = this.stateModel.get("metadata").indices[g.id].settings.index.number_of_replicas) : (g.numshards = this.stateModel.get("metadata").indices[g.id].settings["index.number_of_shards"], g.numreplicas = this.stateModel.get("metadata").indices[g.id].settings["index.number_of_replicas"]), g.status = this.stateModel.get("metadata").indices[g.id].state, void 0 === g.docs && (g.docs = {
                    num_docs: 0
                }), b.indices.push(g)
            }
            var h = _.template(clusterTemplate.HealthDescribe, {
                health: a.attributes,
                state: this.stateModel,
                indices: b,
                polling: settingsModel.get("settings").poller.cluster,
                lastUpdateTime: timeUtil.lastUpdated()
            });
            return $("#workspace").html(h), $("[rel=tipRight]").tooltip(), this
        },
        render: function() {
            var a = this.model;
            if (console.log("Drawing clusterHealth " + a.get("cluster_name")), a) {
                var b = a.get("status");
                "yellow" == b ? (a.set({
                    statusClass: "warning"
                }), a.set({
                    statusClassLabel: "warning"
                }), a.set({
                    statusText: "Yellow"
                })) : "green" == b ? (a.set({
                    statusClass: "success"
                }), a.set({
                    statusClassLabel: "success"
                }), a.set({
                    statusText: "Green"
                })) : "red" == b && (a.set({
                    statusClass: "danger"
                }), a.set({
                    statusClassLabel: "important"
                }), a.set({
                    statusText: "Red"
                }));
                var c = _.template(clusterTemplate.Health);
                $(this.el).html(c(a.attributes)), $("[rel=popRight]").popover({})
            }
            return this
        },
        stateModel: void 0
    }),
    DocumentListView = Backbone.View.extend({
        currentPage: 1,
        maxPages: 0,
        pageFrom: 0,
        pageSize: 0,
        columnArray: void 0,
        resultsModel: void 0,
        requestBody: void 0,
        resultBody: void 0,
        render: function() {
            this.pageSize = this.model.get("queryObj").size;
            var a = this,
                b = QueryUtil.buildBody(this.model, this.pageFrom);
            a.requestBody = JSON.stringify(b, void 0, 2);
            var c = $.ajax({
                url: this.model.getInstanceURL(),
                type: "POST",
                data: JSON.stringify(b)
            });
            c.success(function(b) {
                var c = new QueryResultsListModel;
                if (c.responseTime = b.took, c.timeOut = b.timed_out, a.resultBody = JSON.stringify(b, void 0, 2), b.hits && b.hits.hits.length > 0) {
                    if (a.columnArray = [{
                            key: "_index",
                            name: "Index"
                        }, {
                            key: "_type",
                            name: "Type"
                        }, {
                            key: "_score",
                            name: "Score"
                        }, {
                            key: "_id",
                            name: "ID"
                        }], !_.isEmpty(a.model.get("queryObj").fields)) {
                        var d = a.model.get("queryObj").fields;
                        _.each(d, function(b) {
                            var c = {
                                key: b,
                                name: uppercaseFirst(b),
                                type: "source"
                            };
                            a.columnArray.push(c)
                        })
                    }
                    c.totalHits = b.hits.total, c.maxScore = b.hits.max_score, c.results = [], _.each(b.hits.hits, function(a) {
                        var b = {};
                        b = a, b._raw = JSON.stringify(a, void 0, 2), jQuery.extend(b, a.fields), b.fields = void 0, c.results.push(b)
                    }), a.resultsModel = c, 0 === a.maxPages && (a.maxPages = Math.floor((c.totalHits - 1) / a.pageSize + 1))
                } else c.totalHits = 0, c.maxScore = 0, a.resultsModel = c
            }), c.error(function() {}), c.complete(function() {
                var b = _.template(queryTemplate.results);
                return $("#searchResults").html(b({
                    columns: a.columnArray,
                    requestBody: a.requestBody,
                    results: a.resultsModel,
                    resultBody: a.resultBody,
                    currentPage: a.currentPage,
                    pageSize: a.pageSize,
                    maxPages: a.maxPages
                })), $(".itemjsoncl").click(function() {
                    $("#itemraw").val($(this).data("id"));
                    var b = a.resultsModel.results[$(this).data("id")]._raw;
                    $("#itemraw").text(b), prettyPrint()
                }), $("[rel=tipRight]").tooltip(), a.calcPager(), a.clearResults(), prettyPrint(), this
            })
        },
        pageNext: function() {
            this.pageFrom = this.pageFrom + this.pageSize, this.currentPage++
        },
        pagePrev: function() {
            0 !== this.pageFrom && (this.pageFrom = this.pageFrom - this.pageSize, this.currentPage--)
        },
        calcPager: function() {
            var a = this;
            $("#loadNext").click(function() {
                a.pageNext(), a.render()
            }), $("#loadPrev").click(function() {
                a.pagePrev(), a.render()
            })
        },
        clearResults: function() {
            $("#clearResults").click(function() {
                $("#searchResults").empty()
            })
        }
    }),
    QueryView = Backbone.View.extend({
        initialize: function() {},
        render: function() {
            var a = _.keys(this.model),
                b = [],
                c = ["_score", "_type", "_uid"];
            try {
                for (var d = 0; d < a.length; d++) {
                    var e = _.keys(_.values(this.model)[d].mappings),
                        f = _.values(_.values(this.model)[d].mappings);
                    if (void 0 !== e)
                        for (var g = 0; g < e.length; g++)
                            if (void 0 !== f[g]) {
                                var h = f[g].properties;
                                if (void 0 !== h)
                                    for (var i = _.keys(h), j = 0; j < i.length; j++) _.contains(c, i[j]) || (c.push(i[j]), b.push(i[j]))
                            }
                }
            } catch (k) {
                console.log(k.message)
            }
            var l = _.template(queryTemplate.view);
            return $("#workspace").html(l({
                indices: a,
                fields: b,
                types: c
            })), $("#queryString").bind("focus", doFocus("#queryString", "#querySubmit"), !1), $("#queryString").focus(), $("#querySubmit").click(function() {
                queryRoute.doQuery()
            }), $("[rel=tipRight]").tooltip(), $(".selectpicker").selectpicker(), $("#toggleIndex").bind("click", function(a) {
                a.preventDefault();
                var b = $(this).hasClass("checked");
                b ? ($(this).removeClass("checked"), $(this).find("i").removeClass("icon-check").addClass("icon-check-empty")) : ($(this).addClass("checked"), $(this).find("i").removeClass("icon-check-empty").addClass("icon-check")), $('#checkboxindices li label input[type="checkbox"]').prop("checked", !b)
            }), $("#toggleFields").bind("click", function(a) {
                a.preventDefault();
                var b = $(this).hasClass("checked");
                b ? ($(this).removeClass("checked"), $(this).find("i").removeClass("icon-check").addClass("icon-check-empty")) : ($(this).addClass("checked"), $(this).find("i").removeClass("icon-check-empty").addClass("icon-check")), $('#checkboxfields li label input[type="checkbox"]').prop("checked", !b)
            }), this
        }
    }),
    IndexStatusListView = Backbone.View.extend({
        clusterStateModel: void 0,
        initialize: function(a) {
            this.clusterStateModel = a.clusterStateModel
        },
        render: function() {
            for (var a, b = this.model.toJSON(), c = [], d = this.clusterStateModel.toJSON(), e = 0; e < b.length; e++) a = b[e], a.cid = a.id, a.name = a.id, a.numshards = d.metadata.indices[a.id].settings.index.number_of_shards, a.numreplicas = d.metadata.indices[a.id].settings.index.number_of_replicas, a.status = d.metadata.indices[a.id].state, void 0 === a.docs && (a.docs = {
                num_docs: 0
            }), versionUtil.isNewer("1.7", cluster.versionNumber.concat) && (a.docs.num_docs = a.primaries.docs.count, a.index = {}, a.index.primary_size_in_bytes = a.primaries.store.size_in_bytes), c.push(a);
            try {
                for (var f = d.blocks.indices, g = _.keys(f), h = 0; h < g.length; h++) a = {}, a.cid = a.id, a.id = g[h], a.name = g[h], a.docs = {
                    num_docs: 0
                }, a.index = {
                    primary_size: 0
                }, a.status = "closed", c.push(a)
            } catch (i) {}
            var j = _.template(indexTemplate.indexList);
            return $("#workspace").html(j({
                indices: c,
                polling: settingsModel.get("settings").poller.indices,
                lastUpdateTime: timeUtil.lastUpdated()
            })), $("[rel=popRight]").popover(), $("[rel=tipRight]").tooltip(), jQuery.isEmptyObject(c) || $("#indicesTable").tablesorter({
                headers: {
                    2: {
                        sorter: "datasize"
                    }
                },
                widgets: ["sortPersist"]
            }), this
        }
    }),
    activeTab = "indexTab",
    IndexView = Backbone.View.extend({
        initialize: function(a) {
            this.statusModel = a.statusModel, this.healthModel = a.healthModel, this.aliasModel = a.aliasModel
        },
        render: function() {
            var a = this,
                b = a.model.indexId,
                c = !0;
            try {
                var d = cluster.get("clusterState").toJSON(),
                    e = d.metadata.indices[this.model.indexId].state;
                "open" != e && (c = !1)
            } catch (f) {}
            var g = this.model.toJSON(),
                h = g._shards,
                i = g.indices[this.model.indexId],
                j = this.statusModel.toJSON(),
                k = this.healthModel.toJSON(),
                l = this.aliasModel.toJSON(),
                m = l[this.model.indexId],
                n = j.indices[this.model.indexId];
            "yellow" == k.status ? (k.statusClassLabel = "warning", k.statusText = "Yellow") : "green" == k.status ? (k.statusClassLabel = "success", k.statusText = "Green") : "red" == k.status && (k.statusClassLabel = "important", k.statusText = "Red");
            var o = $.extend({}, i, n, k, m);
            versionUtil.isNewer("1.7", cluster.versionNumber.concat) && (o.docs = {}, o.docs.num_docs = o.primaries.docs.count, o.docs.num_docs = o.total.docs.count, o.index = {}, o.index.primary_size_in_bytes = o.primaries.store.size_in_bytes, o.index.size_in_bytes = o.total.store.size_in_bytes);
            var p = [];
            void 0 != j.indices[this.model.indexId] && (p = _.values(j.indices[this.model.indexId].shards));
            for (var q = cluster.get("nodeList"), r = [], s = 0; s < p.length; s++)
                for (var t = p[s], u = 0; u < t.length; u++) {
                    var v = t[u].routing.node;
                    if (void 0 != q.models)
                        for (var w = 0; w < q.models.length; w++) v == q.models[w].id && (t[u].node = q.models[w].attributes.name);
                    r.push(t[u])
                }
            var x = _.template(indexTemplate.indexView);
            return $("#workspace").html(x({
                indexId: a.model.indexId,
                indexName: b,
                index: o,
                totalShards: h,
                isOpenState: c,
                shards: r,
                polling: settingsModel.get("settings").poller.index,
                lastUpdateTime: timeUtil.lastUpdated()
            })), $("#shardTable").tablesorter({
                headers: {
                    3: {
                        sorter: "datasize"
                    }
                },
                widgets: ["sortPersist"]
            }), $('a[data-toggle="tab"]').on("shown", function(a) {
                activeTab = a.target.id
            }), $("#" + activeTab).tab("show"), $(document).on("click", ".opendeletealiasmodal", function() {
                var a = $(this).data("id");
                $(".modal-body #deleteAliasId").val(a), $("#deletealiasmodal").modal("show"), indexPoller.stop()
            }), $("#deletealiasmodal").on("hidden", function() {
                indexPoller.start()
            }), $("#deleteIndexBtn").on("click", function() {
                a.deleteAlias()
            }), $("[rel=popRight]").popover(), $("[rel=tipRight]").tooltip(), prettyPrint(), this
        },
        deleteAlias: function() {
            var a = $("#deleteAliasId").val(),
                b = this.model.indexId,
                c = new IndexAliasModel({
                    connectionRootURL: cluster.get("connectionRootURL"),
                    indexId: void 0
                });
            c.save({
                actions: [{
                    remove: {
                        index: b,
                        alias: a
                    }
                }]
            }, {
                success: function() {
                    show_stack_bottomright({
                        type: "success",
                        title: "Alias Deleted",
                        text: '"' + a + '" alias deleted.'
                    }), $("#deletealiasmodal").modal("hide")
                },
                error: function(a, b) {
                    var c = '<p>Server Response is...</p><pre class="prettyprint language-json">' + b.responseText + "</pre>";
                    show_stack_bottomright({
                        type: "error",
                        title: "Alias Delete Failed",
                        text: c,
                        hide: !1,
                        closer_hover: !1
                    }), prettyPrint(), $("#deletealiasmodal").modal("hide")
                }
            })
        },
        indexId: void 0,
        aliasModel: void 0,
        healthModel: void 0,
        statusModel: void 0,
        model: void 0
    }),
    MapTypeView = Backbone.View.extend({
        initialize: function() {},
        render: function() {
            var a = this,
                b = a.model.toJSON(),
                c = {};
            c.indexId = b.indexId, c.mappingName = b.mappingName;
            var d = b[b.mappingName].properties,
                e = _.template(mappingTemplate.mapView, {
                    props: d,
                    mapType: c
                });
            $("#workspace").html(e), $("[rel=popRight]").popover()
        }
    }),
    MappingListView = Backbone.View.extend({
        render: function() {
            var a = this.model.models,
                b = _.template(mappingTemplate.mappingList, {
                    maps: a
                });
            return $("#workspace").html(b), $("[rel=tipRight]").tooltip(), this
        }
    }),
    Formats = {
        comma: function(a) {
            a = Math.round(a) + "";
            for (var b = /^([-+]?\d+)(\d{3})/;;) {
                var c = a.replace(b, "$1,$2");
                if (c === a) break;
                a = c
            }
            return a
        },
        pct: function(a) {
            return a = Math.round(1e3 * a) / 10, a + "%"
        },
        ms: function(a) {
            return a = Math.round(100 * a) / 100, a + "ms"
        },
        "float": function(a) {
            return Math.round(10 * a) / 10
        }
    },
    NodeHotThreadView = Backbone.View.extend({
        render: function() {
            var a = this.model,
                b = _.template(nodeTemplate.nodeHotThreads, {
                    nodes: a
                });
            return $("#modal-div-loc").html(b), $("threadModal").modal("show"), this
        }
    }),
    NodeListView = Backbone.View.extend({
        render: function() {
            var a = this.model,
                b = _.template(nodeTemplate.nodeList, {
                    nodes: a
                });
            return $(this.el).html(b), $("[rel=tipRight]").tooltip(), this
        }
    }),
    NodeShutdownView = Backbone.View.extend({
        render: function() {
            var a = _.template(nodeTemplate.nodeShutdown);
            return $("#workspace").html(a), this
        }
    }),
    NodeStatsListView = Backbone.View.extend({
        initialize: function(a) {
            this.infoModel = a.infoModel
        },
        render: function() {
            for (var a = this, b = cluster.get("nodeList"), c = this.infoModel.get("selectedNodes"), d = [], e = 0; e < b.models.length; e++) {
                var f = new NodeSimple;
                f.id = b.models[e].id, f.name = b.models[e].get("name");
                for (var g = 0; g < c.length; g++) f.id == c[g] && (f.selected = !0);
                d.push(f)
            }
            for (var h = this.model.toJSON(), i = this.infoModel.toJSON(), j = [], k = [{
                    title: "Name",
                    key: "nodeName"
                }, {
                    title: "IP",
                    key: "address"
                }, {
                    title: "NodeID",
                    key: "nodeId"
                }, {
                    title: "JVM Uptime",
                    key: "jvmStats.uptime"
                }], l = _.keys(h.nodes), m = _.values(h.nodes), e = 0; e < l.length; e++) m[e].id = l[e];
            m = _.sortBy(m, function(a) {
                return a.name
            }), m = _.sortBy(m, function(a) {
                return a.attributes && a.attributes.master ? "true" : "false"
            });
            for (var e = 0; e < m.length; e++) {
                var n = m[e].id,
                    f = new NodeSimple;
                f.id = n, f.stats = h.nodes[n], f.info = i.nodes[n], f.stats.transport_address = h.nodes[n].transport_address.replace(/inet\[\/([^\]]+)\]/, "$1");
                var o = !0,
                    p = !0,
                    q = !0,
                    r = !0;
                f.stats.jvm || (o = !1, f.stats.jvm = {}, f.stats.jvm.mem = {}, f.stats.jvm.gc = {}, f.stats.jvm.gc.collectors = {}, f.stats.jvm.gc.collectors.ConcurrentMarkSweep = {}, f.stats.jvm.gc.collectors.ParNew = {}, f.stats.jvm.gc.collectors["G1 Young Generation"] = {}, f.stats.jvm.gc.collectors["G1 Old Generation"] = {}), f.stats.os || (p = !1, f.stats.os = {}, f.stats.os.mem = {}, f.stats.os.swap = {}), f.stats.indices || (q = !1, f.stats.indices = {}, f.stats.indices.docs = {}, f.stats.indices.flush = {}, f.stats.indices.refresh = {}, f.stats.indices.get = {}, f.stats.indices.search = {}, f.stats.indices.indexing = {}, f.stats.indices.merges = {}, f.stats.indices.filter_cache = {}, f.stats.indices.id_cache = {}, f.stats.indices.store = {}), f.stats.http || (r = !1, f.stats.http = {}), f.stats.jvm.uptime = (f.stats.jvm.uptime_in_millis / 1e3 / 60 / 60 / 24).toFixed(2), f.stats.storeSize = numeral(f.stats.indices.store.size_in_bytes).format("0.0b"), f.stats.mergeSize = numeral(f.stats.indices.merges.total_size_in_bytes).format("0.0b"), f.stats.mergeTime = timeUtil.convertMS(f.stats.indices.merges.total_time_in_millis), f.stats.docsdeletedperc = f.stats.indices.docs.deleted / f.stats.indices.docs.count, f.stats.mergerate = f.stats.indices.merges.total_size_in_bytes / f.stats.indices.merges.total_time_in_millis / 1e3, f.stats.diskSpaceUsed = (f.stats.fs.total.total_in_bytes - f.stats.fs.total.free_in_bytes) / f.stats.fs.total.total_in_bytes, f.stats.diskFree = numeral(f.stats.fs.total.free_in_bytes).format("0.0b"), f.stats.flush = f.stats.indices.flush.total_time_in_millis / f.stats.indices.flush.total, f.stats.refresh = f.stats.indices.refresh.total_time_in_millis / f.stats.indices.refresh.total, f.stats.getmissing = f.stats.indices.get.missing_time_in_millis / f.stats.indices.get.missing_total, f.stats.getexists = f.stats.indices.get.exists_time_in_millis / f.stats.indices.get.exists_total, f.stats.gettotal = f.stats.indices.get.time_in_millis / f.stats.indices.get.total, f.stats.searchfetch = f.stats.indices.search.fetch_time_in_millis / f.stats.indices.search.fetch_total, f.stats.searchquery = f.stats.indices.search.query_time_in_millis / f.stats.indices.search.query_total, f.stats.indexdelete = f.stats.indices.indexing.delete_time_in_millis / f.stats.indices.indexing.delete_total, f.stats.indexindexing = f.stats.indices.indexing.index_time_in_millis / f.stats.indices.indexing.index_total, f.stats.filterevictions = lodash.get(f, "stats.indices.filter_cache.evictions", 0) / f.stats.indices.search.query_total, f.stats.fieldsize = numeral(f.stats.indices.fielddata.memory_size_in_bytes).format("0.0b"), f.stats.filtercache = numeral(lodash.get(f, "stats.indices.filter_cache.memory_size_in_bytes", 0)).format("0.0b"), f.stats.idpercentage = lodash.get(f, "stats.indices.id_cache.memory_size_in_bytes", 0) / f.stats.jvm.mem.heap_committed_in_bytes, f.stats.totalmem = 0, f.stats.heappercram = 0, jQuery.isEmptyObject(f.stats.os.mem) || (f.stats.totalmem = (f.stats.os.mem.actual_used_in_bytes + f.stats.os.mem.actual_free_in_bytes) / 1024 / 1024 / 1024, f.stats.heappercram = f.stats.jvm.mem.heap_committed_in_bytes / (f.stats.os.mem.actual_used_in_bytes + f.stats.os.mem.actual_free_in_bytes)), f.stats.heapsize = f.stats.jvm.mem.heap_committed_in_bytes / 1024 / 1024 / 1024, f.stats.heapused = f.stats.jvm.mem.heap_used_in_bytes / f.stats.jvm.mem.heap_committed_in_bytes, f.stats.gcfreq = 0, f.stats.g1gcfreq = 0, f.stats.gcduration = 0, f.stats.g1gcduration = 0;
                try {
                    f.stats.gcfreq = 0 === f.stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_count ? 0 : f.stats.jvm.uptime_in_millis / f.stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_count / 1e3
                } catch (s) {}
                try {
                    f.stats.g1gcfreq = 0 === f.stats.jvm.gc.collectors["G1 Young Generation"].collection_count ? 0 : f.stats.jvm.uptime_in_millis / f.stats.jvm.gc.collectors["G1 Young Generation"].collection_count / 1e3
                } catch (s) {}
                try {
                    f.stats.gcduration = f.stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_time_in_millis / f.stats.jvm.gc.collectors.ConcurrentMarkSweep.collection_count
                } catch (s) {}
                try {
                    f.stats.g1gcduration = f.stats.jvm.gc.collectors["G1 Young Generation"].collection_time_in_millis / f.stats.jvm.gc.collectors["G1 Young Generation"].collection_count
                } catch (s) {}
                f.stats.jvm.gc.collectors.ParNew ? (f.stats.gcparnew = f.stats.jvm.uptime_in_millis / f.stats.jvm.gc.collectors.ParNew.collection_count / 1e3, f.stats.gcparnewduration = f.stats.jvm.gc.collectors.ParNew.collection_time_in_millis / f.stats.jvm.gc.collectors.ParNew.collection_count) : (f.stats.gcparnew = 0, f.stats.gcparnewduration = 0), f.stats.jvm.gc.collectors["G1 Old Generation"] && 0 !== f.stats.jvm.gc.collectors["G1 Old Generation"].collection_count ? (f.stats.g1gcold = f.stats.jvm.uptime_in_millis / f.stats.jvm.gc.collectors["G1 Old Generation"].collection_count / 1e3, f.stats.g1gcoldduration = f.stats.jvm.gc.collectors["G1 Old Generation"].collection_time_in_millis / f.stats.jvm.gc.collectors["G1 Old Generation"].collection_count) : (f.stats.g1gcold = 0, f.stats.g1gcoldduration = 0), f.stats.swap = 0, jQuery.isEmptyObject(f.stats.os.swap) || (f.stats.swap = numeral(f.stats.os.swap.used_in_bytes / 1024 / 1024).format("0,0.0000")), f.stats.httpconnectrate = f.stats.http.total_opened / f.stats.jvm.uptime_in_millis * 1e3, j.push(f)
            }
            var t = (settingsModel.get("settings").nodeDiagnosticsMax, _.template(nodeTemplate.diagnostics));
            return $("#workspace").html(t({
                allNodes: d,
                nodes: j,
                labels: k,
                generalRules: general_rules(),
                fsRules: fs_rules(),
                actionRules: action_rules(),
                cacheRules: cache_rules(),
                memoryRules: memory_rules(),
                networkRules: network_rules(),
                polling: settingsModel.get("settings").poller.nodeDiagnostics,
                lastUpdateTime: timeUtil.lastUpdated()
            })), $("[rel=tipRight]").tooltip(), $("[rel=popRight]").popover({}), $(".selectpicker").selectpicker(), $(document).on("click", "#openNodeSelect", function() {
                $("#selectDiagnosticsNodeModal").modal("show"), nodeDiagnosticsPoller.stop()
            }), $("#selectDiagnosticsNodeModal").on("hidden", function() {
                nodeDiagnosticsPoller.start()
            }), $("#refreshSelectedNodes").on("click", function() {
                a.refreshSelectedNodes(), $("#selectDiagnosticsNodeModal").modal("hide")
            }), this
        },
        refreshSelectedNodes: function() {
            var a = $("#selectedNodes").val();
            void 0 != a && 0 != a.length && (nodeRoute.selectedDiagnoseNodeIDs = $("#selectedNodes").val()), nodeRoute.diagnoseNodes()
        },
        renderedModal: !1,
        infoModel: void 0,
        nodeInfo: void 0
    }),
    NodeStatView = Backbone.View.extend({
        initialize: function(a) {
            this.infoModel = a.infoModel
        },
        buildJVMStats: function(a) {
            var b = a.nodes[a.nodeId].jvm;
            return b
        },
        buildSettings: function(a, b) {
            var c = {};
            return a.nodes[b].settings || (a.nodes[b].settings = []), c.nodeName = a.nodes[b].settings.name, c.pathHome = a.nodes[b].settings["path.home"], c.nodeMaster = a.nodes[b].settings["node.master"], c.nodeData = a.nodes[b].settings["node.data"], void 0 === c.nodeMaster && void 0 === c.nodeData && (c.nodeMaster = !0, c.nodeData = !0), c.logPrefix = a.nodes[b].settings["logger.prefix"], c.clusterName = a.nodes[b].settings["cluster.name"], c.logPath = a.nodes[b].settings["path.logs"], c.http_address = a.nodes[b].http_address, c
        },
        render: function() {
            var a = this.model.toJSON(),
                b = this.infoModel.toJSON(),
                c = a.nodeId,
                d = this.buildJVMStats(a),
                e = a.nodes[c].os,
                f = a.nodes[c].process,
                g = a.nodes[c].name,
                h = a.nodes[c].transport_address,
                i = a.nodes[c].hostname,
                j = a.nodes[c].thread_pool,
                k = {},
                l = [];
            a.nodes[c].fs || (k = a.nodes[c].fs = {}, k = a.nodes[c].fs.data = []), l = a.nodes[c].fs.data;
            var m = a.nodes[c].threads,
                n = a.nodes[c].indices,
                o = a.nodes[c].transport,
                p = a.nodes[c].http,
                q = b.nodes[c].network,
                r = !0,
                s = !0,
                t = !0,
                u = !0;
            jQuery.isEmptyObject(b.nodes[c].jvm) && (r = !1, d = {}, d.mem = {}, d.threads = {}, d.gc = {}, d.gc.collectors = {}, d.gc.collectors.young = {}, d.gc.collectors.old = {}, b.nodes[c].jvm = {}), (jQuery.isEmptyObject(b.nodes[c].os) || jQuery.isEmptyObject(e)) && (s = !1, e = {}, e.cpu = {}, e.mem = {}, e.swap = {}, b.nodes[c].os = {}, b.nodes[c].os.cpu = {}), jQuery.isEmptyObject(a.nodes[c].process) && (f = {}, f.cpu = {}, f.cpu.sys = {}, f.cpu.user = {}, f.cpu.total = {}, f.mem = {}), jQuery.isEmptyObject(q) && (q = {}), jQuery.isEmptyObject(a.nodes[c].indices) && (t = !1, n = {}, n.docs = {}, n.store = {}, n.flush = {}, n.refresh = {}, n.get = {}, n.search = {}, n.indexing = {}, n.merges = {}, n.filter_cache = {}, n.id_cache = {}), jQuery.isEmptyObject(p) && (p = {}), jQuery.isEmptyObject(o) && (o = {}), jQuery.isEmptyObject(j) && (j = {}, j.index = {}, j.search = {}, j.get = {}, j.bulk = {}, j.refresh = {}, j.flush = {}, j.merge = {}, j.management = {}), jQuery.isEmptyObject(j.merge) && (j.merge = {}), node = b.nodes[c], d.version = b.nodes[c].jvm.version, d.vm_name = b.nodes[c].jvm.vm_name, d.vm_vendor = b.nodes[c].jvm.vm_vendor, d.pid = b.nodes[c].jvm.pid, lodash.set(e, "cpu.vendor", lodash.get(node, "os.cpu.vendor", "N/A")), e.cpu.model = lodash.get(node, "os.cpu.model", "N/A"), e.cpu.total_cores = lodash.get(node, "os.cpu.total_cores", "N/A"), e.available_processors = b.nodes[c].os.available_processors, e.max_proc_cpu = 100 * e.available_processors, q.transport = b.nodes[c].transport, q.transport || (q.transport = {}), q.transport.address = b.nodes[c].transport_address, q.http = b.nodes[c].http, q.http || (q.http = {}), q.http.address = b.nodes[c].http_address;
            var v = this.buildSettings(b, c),
                w = b.nodes[c].version,
                x = b.nodes[c].hostname;
            d.uptime && (d.uptime = d.uptime.split("and")[0]), e.mem.total = convert.bytesToSize(e.mem.free_in_bytes + e.mem.used_in_bytes, 2), e.swap.total = convert.bytesToSize(e.swap.used_in_bytes + e.swap.free_in_bytes, 2), e.mem.used = convert.bytesToSize(e.mem.used_in_bytes, 2), e.mem.free = convert.bytesToSize(e.mem.free_in_bytes, 2), e.swap.used = convert.bytesToSize(e.swap.used_in_bytes, 2), e.swap.free = convert.bytesToSize(e.swap.free_in_bytes, 2);
            try {
                f.cpu.sys = f.cpu.sys.split("and")[0], f.cpu.user = f.cpu.user.split("and")[0], f.cpu.total = f.cpu.total.split("and")[0]
            } catch (y) {}
            var z = _.template(nodeTemplate.nodeInfo);
            if ($("#workspace").html(z({
                    jvmStats: d,
                    nodeId: c,
                    osStats: e,
                    processStats: f,
                    nodeName: g,
                    address: h,
                    hostName: i,
                    threadPool: j,
                    fileSystemArr: l,
                    threads: m,
                    indices: n,
                    netInfo: q,
                    netStats: o,
                    polling: settingsModel.get("settings").poller.node,
                    lastUpdateTime: timeUtil.lastUpdated()
                })), r && s && t && u || show_stack_bottomright({
                    type: "error",
                    title: "Missing Data",
                    text: "Incomplete dataset from server. Some values left intentionally blank."
                }), !this.renderedModal) {
                var A = _.template(nodeTemplate.nodeInfoModal);
                $("#infoModal-loc").html(A({
                    version: w,
                    host: x,
                    settings: v
                }))
            }
            this.renderedModal = !0, $("#refreshNodeInfo").click(function() {
                nodeRoute.refreshNodeInfo(c)
            });
            var B = (new Date).getTime();
            this.jvmheapdata = chart.addData(this.jvmheapdata, [(new Date).getTime() + 1, d.mem.heap_used_in_bytes / 1e6]), this.jvmheapdata.push([B, d.mem.heap_used_in_bytes / 1e6]), this.jvmheapchart = chart.draw("#chart-jvmheap", this.jvmheapdata, chart.jvmHeap.options()), this.jvmheapchart.setData([this.jvmheapdata]), this.jvmnonheapdata = chart.addData(this.jvmnonheapdata, [(new Date).getTime() + 1, d.mem.non_heap_used_in_bytes / 1e6]), this.jvmnonheapdata.push([B, d.mem.non_heap_used_in_bytes / 1e6]), this.jvmnonheapchart = chart.draw("#chart-jvmnonheap", this.jvmnonheapdata, chart.jvmHeap.options()), this.jvmnonheapchart.setData([this.jvmnonheapdata]), this.indexdata = chart.addData(this.indexdata, [(new Date).getTime() + 1, n.indexing.index_total]), this.indexdata.push([B, n.indexing.index_total]), this.indexchart = chart.draw("#chart-index", this.indexdata, chart.indices.options()), this.indexchart.setData([this.indexdata]), this.getdata = chart.addData(this.getdata, [(new Date).getTime() + 1, n.get.total]), this.getdata.push([B, n.get.total]), this.getchart = chart.draw("#chart-indexget", this.getdata, chart.indices.options()), this.getchart.setData([this.getdata]);
            var C = e.cpu.user + e.cpu.sys;
            this.cpudata = chart.addData(this.cpudata, [(new Date).getTime() + 1, C]), this.cpudata.push([B, C]), this.cpuchart = chart.draw("#chart-cpu", this.cpudata, chart.cpu.options()), this.cpuchart.setData([this.cpudata]);
            var D = (e.mem.free_in_bytes + e.mem.used_in_bytes) / 1073741824;
            this.memdata = chart.addData(this.memdata, [(new Date).getTime() + 1, e.mem.used_in_bytes / 1073741824]), this.memdata.push([B, e.mem.used_in_bytes / 1073741824]), this.memchart = chart.draw("#chart-mem", this.memdata, chart.mem.options(D)), this.memchart.setData([this.memdata]), this.proccpudata = chart.addData(this.proccpudata, [(new Date).getTime() + 1, f.cpu.percent]), this.proccpudata.push([B, f.cpu.percent]), this.proccpuchart = chart.draw("#chart-procpu", this.proccpudata, chart.procscpu.options(100 * e.available_processors)), this.proccpuchart.setData([this.proccpudata]);
            var E = f.mem.total_virtual_in_bytes / 1073741824,
                F = f.mem.resident_in_bytes / 1073741824;
            this.procmemdata = chart.addData(this.procmemdata, [(new Date).getTime() + 1, F]), this.procmemdata.push([B, F]), this.procmemchart = chart.draw("#chart-procmem", this.procmemdata, chart.procmem.options(E)), this.procmemchart.setData([this.procmemdata]);
            for (var G = 0; G < l.length; G++) k = l[G], this.fsreaddata = chart.addData(this.fsreaddata, [(new Date).getTime() + 1, k.disk_reads]), this.fsreaddata.push([B, k.disk_reads]), this.fsreadchart = chart.draw("#chart-fsreads" + G, this.fsreaddata, chart.fsreads.options()), this.fsreadchart.setData([this.fsreaddata]), this.fswritedata = chart.addData(this.fswritedata, [(new Date).getTime() + 1, k.disk_writes]), this.fswritedata.push([B, k.disk_writes]), this.fswritechart = chart.draw("#chart-fswrites" + G, this.fswritedata, chart.fswrites.options()), this.fswritechart.setData([this.fswritedata]);
            return this.httptxdata = chart.addData(this.httptxdata, [(new Date).getTime() + 1, p.current_open]), this.httptxdata.push([B, p.current_open]), this.httptxchart = chart.draw("#chart-httpopen", this.httptxdata, chart.httpopen.options()), this.httptxchart.setData([this.httptxdata]), this.transportdata = chart.addData(this.transportdata, [(new Date).getTime() + 1, o.tx_count]), this.transportdata.push([B, o.tx_count]), this.transportchart = chart.draw("#chart-transporttx", this.transportdata, chart.transporttxcount.options()), this.transportchart.setData([this.transportdata]), this.threadindexdata = chart.addData(this.threadindexdata, [(new Date).getTime() + 1, j.index.active]), this.threadindexdata.push([B, j.index.active]), this.threadindexchart = chart.draw("#chart-threadindex", this.threadindexdata, chart.threadindex.options()), this.threadindexchart.setData([this.threadindexdata]), this.threadsearchdata = chart.addData(this.threadsearchdata, [(new Date).getTime() + 1, j.search.active]), this.threadsearchdata.push([B, j.search.active]), this.threadsearchchart = chart.draw("#chart-threadsearch", this.threadsearchdata, chart.transporttxcount.options()), this.threadsearchchart.setData([this.threadsearchdata]), $("[rel=tipRight]").tooltip(), this
        },
        renderedModal: !1,
        infoModel: void 0,
        nodeInfo: void 0,
        jvmheapdata: void 0,
        jvmheapchart: void 0,
        jvmnonheapdata: void 0,
        jvmnonheapchart: void 0,
        indexdata: void 0,
        indexchart: void 0,
        getdata: void 0,
        getchart: void 0,
        cpudata: void 0,
        cpuchart: void 0,
        memdata: void 0,
        memchart: void 0,
        proccpudata: void 0,
        proccpuchart: void 0,
        procmemdata: void 0,
        procmemchart: void 0,
        fsreaddata: void 0,
        fsreadchart: void 0,
        fswritedata: void 0,
        fswritechart: void 0,
        httptxdata: void 0,
        httptxchart: void 0,
        transportdata: void 0,
        transportchart: void 0,
        threadindexdata: void 0,
        threadindexchart: void 0,
        threadsearchdata: void 0,
        threadsearchchart: void 0
    }),
    endPointMap = {};
endPointMap.getEndPointStruct = function(a) {
    var b = [];
    return b.push({
        key: "Cluster",
        value: endPointMap.CLUSTER(a)
    }), b.push({
        key: "Search",
        value: endPointMap.SEARCH(a)
    }), b.push({
        key: "Indices",
        value: endPointMap.INDICES(a)
    }), b
}, endPointMap.INDICES = function(a) {
    var b = [];
    return b.POST = ["/_aliases", "/_cache/clear", "/_flush", "/_optimize", "/_refresh"], b.GET = ["/_aliases", "/_mapping", "/_stats", "/_status", "/_segments"], b[a]
}, endPointMap.SEARCH = function(a) {
    var b = [];
    return b.POST = ["/_search"], b.GET = ["/_search"], b[a]
}, endPointMap.CLUSTER = function(a) {
    var b = [];
    return b.POST = [], b.GET = ["/", "/_cluster/settings", "/_cluster/health", "/_cluster/state", "/_cluster/pending_tasks", "/_cluster/nodes/stats"], b[a]
};
var JSONEditorPostView = Backbone.View.extend({
        requestBody: void 0,
        resultBody: void 0,
        initialize: function() {},
        render: function() {
            var a = this;
            ace.require("ace/ext/language_tools");
            var b = ace.edit("jsoneditor"),
                c = b.getSession().getValue(),
                d = $.ajax({
                    url: cluster.get("connectionRootURL") + this.model.endpoint,
                    type: this.model.action,
                    data: c
                });
            return d.success(function(b) {
                a.resultBody = JSON.stringify(b, void 0, 2);
                var c = ace.edit("jsonoutput");
                c.getSession().setMode("ace/mode/json"), c.setTheme("ace/theme/monokai"), c.setShowPrintMargin(!1), c.setFontSize(13), c.getSession().setUseSoftTabs(!0), c.getSession().setUseWrapMode(!0), c.setValue(a.resultBody), c.getSession().selection.clearSelection(), c.setOptions({
                    readOnly: !0
                }), c.moveCursorTo(1, 1), c.getSession().foldAll(1, 1e4)
            }), d.error(function(b) {
                a.resultBody = JSON.stringify(b, void 0, 2);
                var c = ace.edit("jsonoutput");
                c.getSession().setMode("ace/mode/json"), c.setTheme("ace/theme/monokai"), c.setShowPrintMargin(!1), c.setFontSize(13), c.getSession().setUseSoftTabs(!0), c.getSession().setUseWrapMode(!0), c.setValue(a.resultBody), c.getSession().selection.clearSelection(), c.setOptions({
                    readOnly: !0
                }), c.moveCursorTo(1, 1)
            }), d.complete(function() {}), this
        }
    }),
    JSONEditorView = Backbone.View.extend({
        initialize: function() {},
        render: function() {
            var a = this,
                b = _.template(restTemplate.jsonEditorView);
            $("#workspace").html(b({})), a.redrawEndPointSelect(), ace.require("ace/ext/language_tools");
            var c = ace.edit("jsoneditor");
            c.getSession().setMode("ace/mode/json"), c.setTheme("ace/theme/monokai"), c.setShowPrintMargin(!1), c.setFontSize(13), c.getSession().setUseSoftTabs(!0), c.getSession().setUseWrapMode(!0), c.setOptions({
                enableBasicAutocompletion: !0
            }), c.setValue("{\n\n}");
            var d = c.getSession().getValue();
            c.getSession().setValue(d), c.focus(), c.getSession().getSelection().selectionLead.setPosition(1, 1);
            var e = ace.edit("jsonoutput");
            return e.getSession().setMode("ace/mode/json"), e.setTheme("ace/theme/monokai"), e.setShowPrintMargin(!1), e.setFontSize(13), e.getSession().setUseSoftTabs(!0), e.getSession().setUseWrapMode(!0), $("#jsonformsubmit").click(function() {
                restRoute.doEditorQuery()
            }), $("#jsonformaction").change(function() {
                a.redrawEndPointSelect(), $(".selectpicker").selectpicker()
            }), $("[rel=tipRight]").tooltip(), $("[rel=popRight]").popover(), $(".selectpicker").selectpicker(), this
        },
        getEndPoints: function() {
            var a = $("#jsonformaction option:selected").val();
            void 0 === a && (a = "GET");
            var b = endPointMap.getEndPointStruct(a);
            return b
        },
        redrawEndPointSelect: function() {
            var a = _.template(restTemplate.jsonapiendpoints);
            $("#endpointSelect").html(a({
                endpoints: this.getEndPoints()
            }))
        }
    }),
    RESTJSONView = Backbone.View.extend({
        initialize: function(a) {
            this.str = a.res, this.title = a.title
        },
        render: function() {
            var a = this,
                b = this.getTitle(a.title),
                c = a.model.get("connectionRootURL") + a.model.fetchURL,
                d = _.template(restTemplate.JSONView, {
                    title: b,
                    res: a.str,
                    fetchURL: c
                });
            return $("#workspace").html(d), $("[rel=tipRight]").tooltip(), prettyPrint(), this
        },
        getTitle: function() {
            var a = this;
            return "health" == a.model.cmd ? "Cluster Health" : "state" == a.model.cmd ? "Cluster State" : "ping" == a.model.cmd ? "Ping" : "nodeinfo" == a.model.cmd ? "Node Information" : "nodestats" == a.model.cmd ? "Node Statistics" : "indexaliases" == a.model.cmd ? "Indices Aliases" : "indexsettings" == a.model.cmd ? "Indices Settings" : "indexstats" == a.model.cmd ? "Indices Stats" : "indexstatus" == a.model.cmd ? "Indices Status" : "indexsegments" == a.model.cmd ? "Indices Segments" : "indexmappings" == a.model.cmd ? "All Mappings" : "indexrefresh" == a.model.cmd ? "Indices Refresh Scheduled" : "indexflush" == a.model.cmd ? "Indices Flushed" : "indexoptimize" == a.model.cmd ? "Indices Optimized" : "indexclearcache" == a.model.cmd ? "Indices Cache Cleared" : "cluster_settings" == a.model.cmd ? "Cluster Settings" : void 0
        },
        str: void 0,
        title: void 0
    }),
    RESTView = Backbone.View.extend({
        initialize: function() {},
        render: function() {
            var a = _.template(restTemplate.mainView, {});
            return $("#workspace").html(a), $("[rel=popRight]").popover(), this
        }
    }),
    SettingsView = Backbone.View.extend({
        el: $("#workspace"),
        events: {
            "click #editSettingsSubmit": "saveToModel"
        },
        saveToModel: function(a) {
            a.preventDefault();
            var b = this.$("#editSettingsForm").serializeObject();
            try {
                this.model.set(b), this.model.save({})
            } catch (c) {}
            if (this.model.isValid()) {
                this.model = settingsModel, this.model.get("settings").poller.cluster = b.clusterPoller, this.model.get("settings").poller.nodeDiagnostics = b.ndPoller, this.model.get("settings").poller.node = b.nPoller, this.model.get("settings").poller.indices = b.indicesPoller, this.model.get("settings").poller.index = b.indexPoller, this.model.get("settings").nodeDiagnosticsMax = b.nodeDiagnosticsMax, this.model.get("settings").debugMode = void 0 !== b.debugMode ? 1 : 0, this.model.get("settings").optoutStats = void 0 !== b.optoutStats ? !0 : !1, this.model.saveToStorage(), settingsModel = settingsModel.loadFromStorage();
                var d = _.template(settingsTemplate.saved);
                $("#savedSettings").html(d({}))
            }
            return this.unbind(), this.model.unbind("#editSettingsSubmit", this.render), !1
        },
        render: function() {
            var a = this,
                b = _.template(settingsTemplate.init);
            return $("#workspace").html(b({
                settings: a.model.get("settings")
            })), Backbone.Validation.bind(this), this
        },
        onClose: function() {
            this.model.unbind("#editSettingsSubmit", this.render)
        }
    }),
    SnapShotView = Backbone.View.extend({
        initialize: function() {},
        render: function() {
            var a = _.template(snapShotTemplate.init);
            return $("#workspace").html(a({})), $("[rel=tipRight]").tooltip(), this
        }
    }),
    VisualView = Backbone.View.extend({
        indicesArray: void 0,
        initialize: function(a) {
            this.indicesArray = a.indicesArray
        },
        render: function() {
            function a(e) {
                var f = d3.event && d3.event.altKey ? 5e3 : 500,
                    g = w.nodes(d).reverse();
                g.forEach(function(a) {
                    a.y = 180 * a.depth
                });
                var h = y.selectAll("g.node").data(g, function(a) {
                        return a.id || (a.id = ++r)
                    }),
                    i = h.enter().append("svg:g").attr("class", "node").attr("transform", function() {
                        return "translate(" + e.y0 + "," + e.x0 + ")"
                    }).on("click", function(c) {
                        b(c), a(c)
                    });
                i.append("svg:text").attr("x", function(a) {
                    return a.children || a._children ? -10 : 10
                }).attr("dy", ".35em").attr("text-anchor", function(a) {
                    return a.children || a._children ? "end" : "start"
                }).text(function(a) {
                    return a.name
                }).style("fill-opacity", 1e-6), i.append("circle").attr("r", 1e-6).style("stroke", function(a) {
                    return "cluster" == a.type ? "red" : "node" == a.type ? "blue" : "shard" == a.type ? "green" : "index" == a.type ? "orange" : void 0
                });
                var j = h.transition().duration(f).attr("transform", function(a) {
                    return "translate(" + a.y + "," + a.x + ")"
                });
                j.select("circle").attr("r", 4.5).style("fill", function(a) {
                    if (a._children) {
                        if ("cluster" == a.type) return "red";
                        if ("node" == a.type) return "blue";
                        if ("shard" == a.type) return "green";
                        if ("index" == a.type) return "orange"
                    }
                }), j.select("text").style("fill-opacity", 1);
                var k = h.exit().transition().duration(f).attr("transform", function() {
                    return "translate(" + e.y + "," + e.x + ")"
                }).remove();
                k.select("circle").attr("r", 1e-6), k.select("text").style("fill-opacity", 1e-6);
                var l = y.selectAll("path.link").data(w.links(g), function(a) {
                    return a.target.id
                });
                l.enter().insert("svg:path", "g").attr("class", "link").attr("d", function() {
                    var a = {
                        x: e.x0,
                        y: e.y0
                    };
                    return x({
                        source: a,
                        target: a
                    })
                }).transition().duration(f).attr("d", x), l.transition().duration(f).attr("d", x), l.exit().transition().duration(f).attr("d", function() {
                    var a = {
                        x: e.x,
                        y: e.y
                    };
                    return x({
                        source: a,
                        target: a
                    })
                }).remove(), g.forEach(function(a) {
                    a.x0 = a.x, a.y0 = a.y
                }), d3.select("svg").call(d3.behavior.zoom().scaleExtent([.5, 5]).on("zoom", c))
            }

            function b(a) {
                a.children ? (a._children = a.children, a.children = null) : (a.children = a._children, a._children = null)
            }

            function c() {
                var a = d3.event.scale,
                    b = d3.event.translate,
                    c = -j * a,
                    d = j * a,
                    e = (-i + h[1]) * a,
                    f = (i - h[3]) * a;
                b = [Math.max(Math.min(b[0], f), e), Math.max(Math.min(b[1], d), c)], d3.select(".drawarea").attr("transform", "translate(" + b + ") scale(" + a + ")")
            }
            var d, e = this,
                f = window.innerWidth,
                g = window.innerHeight,
                h = [40, 200, 40, 120],
                i = f - h[1] - h[3],
                j = g - h[0] - h[2],
                k = {},
                l = (e.model.get("cluster_name"), e.model.get("master_node")),
                m = _.keys(e.model.get("metadata").indices);
            k.type = "cluster", void 0 === e.indicesArray && (e.indicesArray = m);
            var n = _.template(visualTemplate.init);
            $("#workspace").html(n({
                indicesArray: e.indicesArray,
                indices: m,
                svgwidth: i
            })), $("#filterVizSubmit").click(function() {
                visualRoute.doFilter()
            });
            for (var o = _.keys(e.model.get("nodes")), p = _.values(e.model.get("nodes")), q = [], r = 0; r < o.length; r++) p[r].id = o[r], q[r] = p[r].id == l ? {
                name: "*" + p[r].name,
                type: "node",
                id: p[r].id
            } : {
                name: p[r].name,
                type: "node",
                id: p[r].id
            };
            for (var s = e.model.get("routing_nodes").nodes, t = 0; t < q.length; t++) {
                var u = s[q[t].id],
                    v = [];
                _.each(u, function(a) {
                    var b = a.shard;
                    a.primary && (b = "*" + b);
                    var c = [];
                    if (a.index && _.contains(e.indicesArray, a.index)) {
                        c.push({
                            name: a.index,
                            type: "index"
                        });
                        var d = {
                            name: b,
                            type: "shard",
                            children: c
                        };
                        v.push(d)
                    }
                }), q[t].children = v
            }
            k.children = q;
            var w = (JSON.stringify(k), d3.layout.tree().size([j, i])),
                x = d3.svg.diagonal().projection(function(a) {
                    return [a.y, a.x]
                }),
                y = d3.select("#thechart").append("svg:svg").attr("class", "svg_container").attr("width", i).attr("height", j).style("overflow", "scroll").style("margin", "0 auto").style("background-color", "#F4F4F4").style("border", "1px solid #CCCCCC").append("svg:g").attr("class", "drawarea").append("svg:g").attr("transform", "translate(" + h[3] + "," + h[0] + ")");
            return d = k, d.x0 = j / 2, d.y0 = 0, a(d), this
        }
    }),
    ClearCacheAllIndexView = Backbone.View.extend({
        render: function() {
            var a = _.template(indexActionTemplate.clearCacheAll, {
                res: this.model
            });
            return $("#infoModal-loc").html(a), prettyPrint(), $("#clearcacheallmodal").modal("show"), $("#clearcacheallmodal").on("hidden", function() {
                router.navigate("indices", !0)
            }), this
        }
    }),
    CreateIndexView = Backbone.View.extend({
        el: $("#workspace"),
        events: {
            "click #createIndexSubmit": "saveToModel"
        },
        saveToModel: function(a) {
            a.preventDefault();
            var b = this,
                c = this.$("#createIndexForm").serializeObject();
            return this.model.set(c), this.model.indexId = c.indexId.toLowerCase(), this.model.save({
                settings: {
                    number_of_shards: c.shards,
                    number_of_replicas: c.replicas
                }
            }, {
                success: function() {
                    Backbone.history.navigate("indices", !0), show_stack_bottomright({
                        type: "success",
                        title: "Index Created",
                        text: '"' + b.model.indexId + '" index created.'
                    })
                },
                error: function(a, b) {
                    var c = '<p>Server Response is...</p><pre class="prettyprint linenums language-json">' + b.responseText + "</pre>";
                    show_stack_bottomright({
                        type: "error",
                        title: "Index Failed",
                        text: c,
                        hide: !1,
                        closer_hover: !1
                    }), prettyPrint(), Backbone.history.navigate("indices", !0)
                }
            }), this.unbind(), this.model.unbind("#createIndexSubmit", this.render), !1
        },
        render: function() {
            var a = _.template(indexActionTemplate.createIndex, {
                model: this.model
            });
            return $("#workspace").html(a), Backbone.Validation.bind(this), this
        },
        onClose: function() {
            this.model.unbind("#createIndexSubmit", this.render)
        }
    }),
    FlushAllIndexView = Backbone.View.extend({
        render: function() {
            var a = _.template(indexActionTemplate.flushAll, {
                res: this.model
            });
            return $("#infoModal-loc").html(a), prettyPrint(), $("#flushallmodal").modal("show"), $("#flushallmodal").on("hidden", function() {
                router.navigate("indices", !0)
            }), this
        }
    }),
    OptimizeAllIndexView = Backbone.View.extend({
        render: function() {
            var a = _.template(indexActionTemplate.optimizeAll, {
                res: this.model
            });
            return $("#infoModal-loc").html(a), prettyPrint(), $("#optimizeallmodal").modal("show"), $("#optimizeallmodal").on("hidden", function() {
                router.navigate("indices", !0)
            }), this
        }
    }),
    CreateTypeView = Backbone.View.extend({
        el: $("#workspace"),
        events: {
            submit: "saveToModel"
        },
        saveToModel: function(a) {
            a.preventDefault();
            var b = this,
                c = this.$("#createTypeForm").serializeObject();
            return this.model.set(c), this.model.indexId = c.indexId.toLowerCase(), this.model.save({
                settings: {
                    number_of_shards: c.shards,
                    number_of_replicas: c.replicas
                }
            }, {
                success: function() {
                    Backbone.history.navigate("indices", !0), show_stack_bottomright({
                        type: "success",
                        title: "Index Created",
                        text: '"' + b.model.indexId + '" index created.'
                    })
                },
                error: function(a, b) {
                    var c = '<p>Server Response is...</p><pre class="prettyprint linenums language-json">' + b.responseText + "</pre>";
                    show_stack_bottomright({
                        type: "error",
                        title: "Index Failed",
                        text: c,
                        hide: !1,
                        closer_hover: !1
                    }), prettyPrint(), Backbone.history.navigate("indices", !0)
                }
            }), this.unbind(), !1
        },
        render: function() {
            var a = _.template(mappingTemplate.createType, {
                model: this.model
            });
            return $("#workspace").html(a), Backbone.Validation.bind(this), this
        },
        onClose: function() {
            this.model.unbind("submit", this.render)
        }
    }),
    clusterRoute = {};
clusterRoute.cluster = function() {
    var a = cluster.get("clusterHealth");
    a.fetch({
        success: function() {
            document.title = a.get("cluster_name") + " | Elastic HQ", checkVersion(), activateLogging();
            var b = {
                delay: 1e4
            };
            mainMenuPoller = Backbone.Poller.get(a, b), mainMenuPoller.start(), mainMenuPoller.on("success", function(a) {
                var b = new ClusterHealthView({
                    el: $("#clusterHealth-loc"),
                    model: a
                });
                b.render(), $("#toolbar").css("visibility", "visible");
                var c = cluster.get("nodeList"),
                    d = _.size(c);
                c.fetch({
                    success: function(a) {
                        if (console.log("Node List retrieved"), d != _.size(a.models)) {
                            var b = new NodeListView({
                                el: $("#nodeList-loc"),
                                model: c
                            });
                            b.render(), console.log("Node List updated")
                        } else console.log("Node List eq. Nothing to update.")
                    },
                    error: function() {
                        var a = "Unable to Read Node List! ";
                        console.log("Error! " + a);
                        var b = new ErrorMessageModel({
                                warningTitle: "Error!",
                                warningMessage: a
                            }),
                            c = new ErrorMessageView({
                                el: $("#error-loc"),
                                model: b
                            });
                        c.render()
                    }
                })
            }), mainMenuPoller.on("error", function(a) {
                var b = "Unable to Connect to Server! Connection broken, or server has gone away. Please reconnect.";
                console.log("Error! " + b);
                var c = new ErrorMessageModel({
                        warningTitle: "Error!",
                        warningMessage: b
                    }),
                    d = new ErrorMessageView({
                        el: $("#error-loc"),
                        model: c
                    });
                d.render(), a.attributes.status = "red";
                var e = new ClusterHealthView({
                    el: $("#clusterHealth-loc"),
                    model: a
                });
                e.render(), $("#toolbar").css("visibility", "hidden");
                var f = new NodeListView({
                    el: $("#nodeList-loc"),
                    model: []
                });
                f.render()
            });
            var c = cluster.get("clusterState");
            c.fetch({
                success: function() {
                    clusterOverviewPoller = Backbone.Poller.get(c, {
                        delay: settingsModel.get("settings").poller.cluster
                    }), clusterOverviewPoller.start(), clusterOverviewPoller.on("success", function() {
                        ajaxloading.show(), $.when(cluster.get("indexStats").fetch()).done(function() {
                            var b = new ClusterHealthView({
                                model: a,
                                stateModel: cluster.get("clusterState"),
                                indexModel: cluster.get("indexStats")
                            });
                            if (b.renderWorkspace(), !postedStatsData && !settingsModel.get("settings").optoutStats) {
                                postedStatsData = !0; {
                                    new StatsModel
                                }
                            }
                        }), ajaxloading.hide()
                    })
                }
            })
        },
        error: function(a, b) {
            var c = "Unable to Connect to Server! ";
            b && (c += "Received Status Code: " + b.status + ".", 0 === b.status && (c += " A status code of 0, could mean the host is unreacheable or nothing is listening on the given port.")), console.log("Error! " + c);
            var d = new ErrorMessageModel({
                    warningTitle: "Error!",
                    warningMessage: c
                }),
                e = new ErrorMessageView({
                    el: $("#error-loc"),
                    model: d
                });
            e.render()
        }
    })
};
var indexRoute = {};
indexRoute.indexView = function(a) {
    var b = new IndexStatsModel({
            connectionRootURL: cluster.get("connectionRootURL"),
            indexId: a
        }),
        c = new IndexStatusModel({
            connectionRootURL: cluster.get("connectionRootURL"),
            indexId: a
        }),
        d = new IndexHealthModel({
            connectionRootURL: cluster.get("connectionRootURL"),
            indexId: a
        }),
        e = new IndexAliasModel({
            connectionRootURL: cluster.get("connectionRootURL"),
            indexId: a
        });
    c.fetch({
        success: function() {
            var f = {
                delay: settingsModel.get("settings").poller.index
            };
            indexPoller = Backbone.Poller.get(c, f), indexPoller.start(), indexPoller.on("success", function(c) {
                ajaxloading.show(), $.when(b.fetch(), d.fetch(), e.fetch()).done(function() {
                    var f = new IndexView({
                        indexId: a,
                        model: b,
                        statusModel: c,
                        healthModel: d,
                        aliasModel: e
                    });
                    f.render()
                }), ajaxloading.hide()
            })
        }
    })
}, indexRoute.deleteIndex = function(a) {
    var b = new IndexModel({
        connectionRootURL: cluster.get("connectionRootURL"),
        indexId: a
    });
    b.id = a, b.destroy({
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Deleted!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#deleteindexmodal").modal("hide"), $("#deleteindexmodal").on("hidden", function() {
                $("#defaultindexmodal").modal("show"), $("#defaultindexmodal").on("hidden", function() {
                    router.navigate("indices", !0)
                })
            })
        },
        error: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Delete Failed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#deleteindexmodal").modal("hide"), $("#deleteindexmodal").on("hidden", function() {
                $("#defaultindexmodal").modal("show"), $("#defaultindexmodal").on("hidden", function() {
                    router.navigate("indices", !0)
                })
            })
        }
    })
}, indexRoute.openIndex = function(a) {
    var b = new IndexModel({
        connectionRootURL: cluster.get("connectionRootURL"),
        indexId: a,
        cmd: "_open"
    });
    b.save({}, {
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Opened for Business!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show");
            var e = cluster.get("clusterState");
            e.fetch({
                success: function() {
                    $("#defaultindexmodal").on("hidden", function() {
                        router.navigate("indices", !0)
                    })
                }
            })
        },
        error: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Open Failed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show"), $("#defaultindexmodal").on("hidden", function() {
                router.navigate("indices", !0)
            })
        }
    })
}, indexRoute.closeIndex = function(a) {
    var b = new IndexModel({
        connectionRootURL: cluster.get("connectionRootURL"),
        indexId: a,
        cmd: "_close"
    });
    b.save({}, {
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Closed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show");
            var e = cluster.get("clusterState");
            e.fetch({
                success: function() {
                    $("#defaultindexmodal").on("hidden", function() {
                        router.navigate("indices", !0)
                    })
                }
            })
        },
        error: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Close Failed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show"), $("#defaultindexmodal").on("hidden", function() {
                router.navigate("indices", !0)
            })
        }
    })
}, indexRoute.flushIndex = function(a) {
    var b = new IndexModel({
        connectionRootURL: cluster.get("connectionRootURL"),
        indexId: a,
        cmd: "_flush"
    });
    b.fetch({
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Flushed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show")
        },
        error: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Flush Failed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show")
        }
    })
}, indexRoute.refreshIndex = function(a) {
    var b = new IndexModel({
        connectionRootURL: cluster.get("connectionRootURL"),
        indexId: a,
        cmd: "_refresh"
    });
    b.fetch({
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Refreshed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show")
        },
        error: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Refresh Failed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show")
        }
    })
}, indexRoute.optimizeIndex = function(a) {
    var b = new IndexModel({
        connectionRootURL: cluster.get("connectionRootURL"),
        indexId: a,
        cmd: "_optimize"
    });
    b.fetch({
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Optimized!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show")
        },
        error: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Optimization Failed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show")
        }
    })
}, indexRoute.clearCacheIndex = function(a) {
    var b = new IndexModel({
        connectionRootURL: cluster.get("connectionRootURL"),
        indexId: a,
        cmd: "_cache/clear"
    });
    b.fetch({
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Index Cache Cleared!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show")
        },
        error: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Clear Cache Failed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show")
        }
    })
};
var indicesRoute = {};
indicesRoute.viewIndices = function() {
    activeTab = "indexTab";
    var a = new IndicesStatusModel;
    a.setConnectionRootURL(cluster.get("connectionRootURL"));
    var b = new ClusterState({
        connectionRootURL: cluster.get("connectionRootURL")
    });
    a.fetch({
        success: function() {
            var c = {
                delay: settingsModel.get("settings").poller.indices
            };
            indicesPoller = Backbone.Poller.get(a, c), indicesPoller.start(), indicesPoller.on("success", function(a) {
                ajaxloading.show(), $.when(b.fetch()).done(function() {
                    var c = new IndexStatusListView({
                        model: a,
                        clusterStateModel: b
                    });
                    c.render()
                }), ajaxloading.hide()
            })
        }
    })
}, indicesRoute.optimizeAll = function() {
    var a = new OptimizeAllIndex({
        connectionRootURL: cluster.get("connectionRootURL")
    });
    a.fetch({
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = new OptimizeAllIndexView({
                    model: c
                });
            d.render()
        },
        error: function() {}
    })
}, indicesRoute.flushAll = function() {
    var a = new FlushAllIndex({
        connectionRootURL: cluster.get("connectionRootURL")
    });
    a.fetch({
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = new FlushAllIndexView({
                    model: c
                });
            d.render()
        },
        error: function() {}
    })
}, indicesRoute.clearCacheAll = function() {
    var a = new ClearCacheAllIndex({
        connectionRootURL: cluster.get("connectionRootURL")
    });
    a.fetch({
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = new ClearCacheAllIndexView({
                    model: c
                });
            d.render()
        },
        error: function() {}
    })
}, indicesRoute.refreshAll = function() {
    var a = new RefreshAllIndex({
        connectionRootURL: cluster.get("connectionRootURL")
    });
    a.fetch({
        success: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "A Refreshing Change!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show"), $("#defaultindexmodal").on("hidden", function() {
                router.navigate("indices", !0)
            })
        },
        error: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(indexActionTemplate.defaultModal, {
                    title: "Refresh Failed!",
                    res: c
                });
            $("#infoModal-loc").html(d), prettyPrint(), $("#defaultindexmodal").modal("show"), $("#defaultindexmodal").on("hidden", function() {
                router.navigate("indices", !0)
            })
        }
    })
};
var mapRoute = {};
mapRoute.createMapping = function() {
    var a = new MappingSimple({
        connectionRootURL: cluster.get("connectionRootURL")
    });
    void 0 === this.createTypeView && (this.createTypeView = new CreateTypeView({
        model: a
    })), this.createTypeView.render()
}, mapRoute.deleteMapType = function(a, b) {
    var c = new MappingSimple({
        connectionRootURL: cluster.get("connectionRootURL"),
        indexId: a,
        mappingName: b
    });
    c.id = a, c.destroy({
        success: function() {
            $("#deletemappingmodal").modal("hide"), $("#deletemappingmodal").on("hidden", function() {
                router.navigate("mappings", !0)
            })
        },
        error: function() {
            $("#deletemappingmodal").modal("hide"), $("#deletemappingmodal").on("hidden", function() {
                router.navigate("mappings", !0)
            })
        }
    })
}, mapRoute.viewMappings = function(a, b) {
    var c = (new MappingsModelFactory).create();
    void 0 === a && void 0 === b ? (c.setConnectionRootURL(cluster.get("connectionRootURL")), c.fetch({
        success: function() {
            var a = new MappingListView({
                model: c
            });
            a.render()
        },
        error: function() {}
    })) : (c = new MappingSimple({
        connectionRootURL: cluster.get("connectionRootURL"),
        indexId: a,
        mappingName: b
    }), c.fetch({
        success: function() {
            var a = (new MapTypeViewFactory).create({
                model: c
            });
            a.render()
        }
    }))
};
var nodeRoute = {};
nodeRoute.selectedDiagnoseNodeIDs = [], nodeRoute.selectDiagnoseNodes = function(a) {
    if (void 0 != a && a.length > 0)
        for (var b = settingsModel.get("settings").nodeDiagnosticsMax, c = 0; b > c; c++) a.models[c] && nodeRoute.selectedDiagnoseNodeIDs.push(a.models[c].id)
}, nodeRoute.diagnoseNodes = function() {
    var a = cluster.get("nodeList");
    0 === nodeRoute.selectedDiagnoseNodeIDs.length && nodeRoute.selectDiagnoseNodes(a);
    var b = (new NodeInfoListModelFactory).create(nodeRoute.selectedDiagnoseNodeIDs),
        c = (new NodeStatsListModelFactory).create(nodeRoute.selectedDiagnoseNodeIDs);
    b.fetch({
        success: function() {
            var a = new NodeStatsListView({
                    infoModel: b,
                    model: c
                }),
                d = {
                    delay: settingsModel.get("settings").poller.nodeDiagnostics
                };
            nodeDiagnosticsPoller = Backbone.Poller.get(c, d), nodeDiagnosticsPoller.start(), nodeDiagnosticsPoller.on("success", function() {
                console.log("another successful fetch!"), a.render(), ajaxloading.hide()
            })
        }
    })
}, nodeRoute.nodeView = {}, nodeRoute.nodeInfo = function(a) {
    console.log("route nodeId: " + a);
    var b = (new NodeStatsModelFactory).create(a),
        c = (new NodeInfoModelFactory).create(a);
    c.fetch({
        success: function() {
            var a = (new NodeStatsViewFactory).create(b, c);
            cluster.set({
                nodeStats: b,
                nodeInfo: c
            });
            var d = {
                delay: settingsModel.get("settings").poller.node
            };
            nodePoller = Backbone.Poller.get(b, d), nodePoller.start(), nodePoller.on("success", function() {
                console.log("another successful fetch!"), a.render(), nodeRoute.nodeView = a, ajaxloading.hide()
            }), nodePoller.on("error", function() {
                var a = "Unable to Read Node Information! ";
                console.log("Error! " + a);
                var b = new ErrorMessageModel({
                        warningTitle: "Error!",
                        warningMessage: a
                    }),
                    c = new ErrorMessageView({
                        el: $("#error-loc"),
                        model: b
                    });
                c.render()
            })
        },
        error: function() {
            var a = "Unable to Read Node Information! ";
            console.log("Error! " + a);
            var b = new ErrorMessageModel({
                    warningTitle: "Error!",
                    warningMessage: a
                }),
                c = new ErrorMessageView({
                    el: $("#error-loc"),
                    model: b
                });
            c.render()
        }
    })
}, nodeRoute.refreshNodeInfo = function() {
    var a = cluster.get("nodeStats"),
        b = cluster.get("nodeInfo");
    $.when(b.fetch(), a.fetch()).done(function() {
        cluster.set({
            nodeStats: a,
            nodeInfo: b
        });
        var c = nodeRoute.nodeView;
        c.render(), ajaxloading.hide()
    })
};
var queryRoute = {};
queryRoute.init = function() {
    var a = cluster.get("clusterState").toJSON(),
        b = a.metadata.indices;
    console.log(a);
    for (var c = {}, d = _.keys(b), e = 0; e < d.length; e++) "open" == b[d[e]].state && (c[d[e]] = b[d[e]]);
    var f = new QueryView({
        model: c
    });
    f.render()
}, queryRoute.doQuery = function() {
    var a = [];
    $("#checkboxindices input:checked").each(function() {
        a.push($(this).attr("name"))
    });
    var b = [];
    $("#checkboxfields input:checked").each(function() {
        b.push($(this).attr("name"))
    });
    var c = "";
    if (!(a.length > 0)) {
        var d = new ErrorMessageModel({
                warningMessage: "",
                warningTitle: "Index is required!"
            }),
            e = new ErrorMessageView({
                el: $("#queryError-loc"),
                model: d
            });
        return void e.render()
    }
    c = a.join(","), $("#queryError-loc").empty();
    var f = $("#queryString").val(),
        g = $("#perPage option:selected").val(),
        h = $("#sortBy option:selected").val(),
        i = $("#sortDir option:selected").val();
    i = "Ascending" == i ? "asc" : "desc";
    var j = {};
    j[h] = {
        order: i
    };
    var k = new QueryModel({
        indexCSV: c,
        queryString: f,
        indicesArray: a
    });
    k.get("queryObj").size = Math.floor(g), k.get("queryObj").sort = j, k.get("queryObj").fields = b;
    var l = new DocumentListView({
        model: k
    });
    l.render()
};
var restRoute = {};
restRoute.view = function() {
    var a = new RESTView({});
    a.render()
}, restRoute.editorView = function() {
    var a = new JSONEditorView;
    a.render()
}, restRoute.doEditorQuery = function() {
    var a = $("#jsonformaction option:selected").val(),
        b = $("#jsonformendpoint option:selected").val(),
        c = new JSONAPIModel({
            action: a,
            endpoint: b
        }),
        d = new JSONEditorPostView({
            model: c
        });
    d.render()
}, restRoute.json = function(a) {
    if ("cputhreads" == a) return void window.open(cluster.get("connectionRootURL") + "/_nodes/hot_threads?type=cpu&threads=10", "_blank");
    if ("blockthreads" == a) return void window.open(cluster.get("connectionRootURL") + "/_nodes/hot_threads?type=block&threads=10", "_blank");
    if ("waitthreads" == a) return void window.open(cluster.get("connectionRootURL") + "/_nodes/hot_threads?type=wait&threads=10", "_blank");
    var b = (new RESTModelFactory).create(a);
    b.fetch({
        success: function(a, c) {
            var d = JSON.stringify(c, void 0, 2),
                e = new RESTJSONView({
                    model: b,
                    res: d
                });
            e.render()
        },
        error: function(a, b) {
            var c = JSON.stringify(b, void 0, 2),
                d = _.template(restTemplate.JSONView, {
                    title: "Error!",
                    res: c
                });
            $("#workspace").html(d), prettyPrint()
        }
    })
};
var snapShotRoute = {};
snapShotRoute.init = function() {
    var a = new SnapShotView;
    a.render()
};
var visualRoute = {};
visualRoute.init = function() {
    var a = new ClusterState({
        connectionRootURL: cluster.get("connectionRootURL")
    });
    a.fetch({
        success: function() {
            var b = new VisualView({
                model: a
            });
            b.render()
        },
        error: function() {
            var a = "Unable to Read Cluster State! ";
            console.log("Error! " + a), show_stack_bottomright({
                type: "error",
                title: "Fetch Failed",
                text: a,
                hide: !1,
                closer_hover: !1
            })
        }
    })
}, visualRoute.doFilter = function() {
    var a = [];
    $("#vcheckboxindices input:checked").each(function() {
        a.push($(this).attr("name"))
    });
    var b = new ClusterState({
        connectionRootURL: cluster.get("connectionRootURL")
    });
    b.fetch({
        success: function() {
            var c = new VisualView({
                model: b,
                indicesArray: a
            });
            c.render()
        },
        error: function() {
            var a = "Unable to Read Cluster State! ";
            console.log("Error! " + a), show_stack_bottomright({
                type: "error",
                title: "Fetch Failed",
                text: a,
                hide: !1,
                closer_hover: !1
            })
        }
    })
};
var guid = {};
guid.setGUID = function() {
    var a = this.getGUID();
    return void 0 === a && (a = this.generateGUID(), localStorage.setItem("hqsettings", a)), a
}, guid.getGUID = function() {
    return localStorage ? localStorage.getItem("hqsettings") : void 0
}, guid.generateGUID = function() {
    return guid.S4() + guid.S4() + "-" + guid.S4() + "-" + guid.S4() + "-" + guid.S4() + "-" + guid.S4() + guid.S4() + guid.S4()
}, guid.S4 = function() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
};
var logger = function() {
        var a = null,
            b = {};
        return b.enableLogger = function() {
            null != a && (window.console.log = a)
        }, b.disableLogger = function() {
            a = console.log, window.console.log = function() {}
        }, b
    }(),
    activateLogging = function() {
        var a = settingsModel.get("settings").debugMode;
        1 == a ? logger.enableLogger() : logger.disableLogger()
    };
Array.indexOf || (Array.prototype.indexOf = function(a, b) {
    for (var c = b || 0; c < this.length; c++)
        if (this[c] === a) return c;
    return -1
});
var Parser = function(a) {
        function b(a) {
            function b() {}
            return b.prototype = a, new b
        }

        function c(a, b, c, d) {
            this.type_ = a, this.index_ = b || 0, this.prio_ = c || 0, this.number_ = void 0 !== d && null !== d ? d : 0, this.toString = function() {
                switch (this.type_) {
                    case r:
                        return this.number_;
                    case s:
                    case t:
                    case u:
                        return this.index_;
                    case v:
                        return "CALL";
                    default:
                        return "Invalid Token"
                }
            }
        }

        function d(a, b, c, d) {
            this.tokens = a, this.ops1 = b, this.ops2 = c, this.functions = d
        }

        function e(a) {
            return "string" == typeof a ? (w.lastIndex = 0, w.test(a) ? "'" + a.replace(w, function(a) {
                var b = x[a];
                return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + "'" : "'" + a + "'") : a
        }

        function f(a, b) {
            return Number(a) + Number(b)
        }

        function g(a, b) {
            return a - b
        }

        function h(a, b) {
            return a * b
        }

        function i(a, b) {
            return a / b
        }

        function j(a, b) {
            return a % b
        }

        function k(a, b) {
            return "" + a + b
        }

        function l(a) {
            return -a
        }

        function m(a) {
            return Math.random() * (a || 1)
        }

        function n(a) {
            a = Math.floor(a);
            for (var b = a; a > 1;) b *= --a;
            return b
        }

        function o(a, b) {
            return Math.sqrt(a * a + b * b)
        }

        function p(a, b) {
            return "[object Array]" != Object.prototype.toString.call(a) ? [a, b] : (a = a.slice(), a.push(b), a)
        }

        function q() {
            this.success = !1, this.errormsg = "", this.expression = "", this.pos = 0, this.tokennumber = 0, this.tokenprio = 0, this.tokenindex = 0, this.tmpprio = 0, this.ops1 = {
                sin: Math.sin,
                cos: Math.cos,
                tan: Math.tan,
                asin: Math.asin,
                acos: Math.acos,
                atan: Math.atan,
                sqrt: Math.sqrt,
                log: Math.log,
                abs: Math.abs,
                ceil: Math.ceil,
                floor: Math.floor,
                round: Math.round,
                "-": l,
                exp: Math.exp
            }, this.ops2 = {
                "+": f,
                "-": g,
                "*": h,
                "/": i,
                "%": j,
                "^": Math.pow,
                ",": p,
                "||": k
            }, this.functions = {
                random: m,
                fac: n,
                min: Math.min,
                max: Math.max,
                pyt: o,
                pow: Math.pow,
                atan2: Math.atan2
            }, this.consts = {
                E: Math.E,
                PI: Math.PI
            }
        }
        var r = 0,
            s = 1,
            t = 2,
            u = 3,
            v = 4,
            w = /[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            x = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                "'": "\\'",
                "\\": "\\\\"
            };
        d.prototype = {
            simplify: function(a) {
                a = a || {};
                var e, f, g, h, i = [],
                    j = [],
                    k = this.tokens.length,
                    l = 0;
                for (l = 0; k > l; l++) {
                    h = this.tokens[l];
                    var m = h.type_;
                    if (m === r) i.push(h);
                    else if (m === u && h.index_ in a) h = new c(r, 0, 0, a[h.index_]), i.push(h);
                    else if (m === t && i.length > 1) f = i.pop(), e = i.pop(), g = this.ops2[h.index_], h = new c(r, 0, 0, g(e.number_, f.number_)), i.push(h);
                    else if (m === s && i.length > 0) e = i.pop(), g = this.ops1[h.index_], h = new c(r, 0, 0, g(e.number_)), i.push(h);
                    else {
                        for (; i.length > 0;) j.push(i.shift());
                        j.push(h)
                    }
                }
                for (; i.length > 0;) j.push(i.shift());
                return new d(j, b(this.ops1), b(this.ops2), b(this.functions))
            },
            substitute: function(a, e) {
                e instanceof d || (e = (new q).parse(String(e)));
                var f, g = [],
                    h = this.tokens.length,
                    i = 0;
                for (i = 0; h > i; i++) {
                    f = this.tokens[i];
                    var j = f.type_;
                    if (j === u && f.index_ === a)
                        for (var k = 0; k < e.tokens.length; k++) {
                            var l = e.tokens[k],
                                m = new c(l.type_, l.index_, l.prio_, l.number_);
                            g.push(m)
                        } else g.push(f)
                }
                var n = new d(g, b(this.ops1), b(this.ops2), b(this.functions));
                return n
            },
            evaluate: function(a) {
                a = a || {};
                var b, c, d, e, f = [],
                    g = this.tokens.length,
                    h = 0;
                for (h = 0; g > h; h++) {
                    e = this.tokens[h];
                    var i = e.type_;
                    if (i === r) f.push(e.number_);
                    else if (i === t) c = f.pop(), b = f.pop(), d = this.ops2[e.index_], f.push(d(b, c));
                    else if (i === u)
                        if (e.index_ in a) f.push(a[e.index_]);
                        else {
                            if (!(e.index_ in this.functions)) throw new Error("undefined variable: " + e.index_);
                            f.push(this.functions[e.index_])
                        }
                    else if (i === s) b = f.pop(), d = this.ops1[e.index_], f.push(d(b));
                    else {
                        if (i !== v) throw new Error("invalid Expression");
                        if (b = f.pop(), d = f.pop(), !d.apply || !d.call) throw new Error(d + " is not a function");
                        f.push("[object Array]" == Object.prototype.toString.call(b) ? d.apply(void 0, b) : d.call(void 0, b))
                    }
                }
                if (f.length > 1) throw new Error("invalid Expression (parity)");
                return f[0]
            },
            toString: function(a) {
                var b, c, d, f, g = [],
                    h = this.tokens.length,
                    i = 0;
                for (i = 0; h > i; i++) {
                    f = this.tokens[i];
                    var j = f.type_;
                    if (j === r) g.push(e(f.number_));
                    else if (j === t) c = g.pop(), b = g.pop(), d = f.index_, g.push(a && "^" == d ? "Math.pow(" + b + "," + c + ")" : "(" + b + d + c + ")");
                    else if (j === u) g.push(f.index_);
                    else if (j === s) b = g.pop(), d = f.index_, g.push("-" === d ? "(" + d + b + ")" : d + "(" + b + ")");
                    else {
                        if (j !== v) throw new Error("invalid Expression");
                        b = g.pop(), d = g.pop(), g.push(d + "(" + b + ")")
                    }
                }
                if (g.length > 1) throw new Error("invalid Expression (parity)");
                return g[0]
            },
            variables: function() {
                for (var a = this.tokens.length, b = [], c = 0; a > c; c++) {
                    var d = this.tokens[c];
                    d.type_ === u && -1 == b.indexOf(d.index_) && b.push(d.index_)
                }
                return b
            },
            toJSFunction: function(a, b) {
                var c = new Function(a, "with(Parser.values) { return " + this.simplify(b).toString(!0) + "; }");
                return c
            }
        }, q.parse = function(a) {
            return (new q).parse(a)
        }, q.evaluate = function(a, b) {
            return q.parse(a).evaluate(b)
        }, q.Expression = d, q.values = {
            sin: Math.sin,
            cos: Math.cos,
            tan: Math.tan,
            asin: Math.asin,
            acos: Math.acos,
            atan: Math.atan,
            sqrt: Math.sqrt,
            log: Math.log,
            abs: Math.abs,
            ceil: Math.ceil,
            floor: Math.floor,
            round: Math.round,
            random: m,
            fac: n,
            exp: Math.exp,
            min: Math.min,
            max: Math.max,
            pyt: o,
            pow: Math.pow,
            atan2: Math.atan2,
            E: Math.E,
            PI: Math.PI
        };
        var y = 1,
            z = 2,
            A = 4,
            B = 8,
            C = 16,
            D = 32,
            E = 64,
            F = 128,
            G = 256;
        return q.prototype = {
            parse: function(a) {
                this.errormsg = "", this.success = !0;
                var e = [],
                    f = [];
                this.tmpprio = 0;
                var g = y | B | A | E,
                    h = 0;
                for (this.expression = a, this.pos = 0; this.pos < this.expression.length;)
                    if (this.isOperator()) this.isSign() && g & E ? (this.isNegativeSign() && (this.tokenprio = 2, this.tokenindex = "-", h++, this.addfunc(f, e, s)), g = y | B | A | E) : this.isComment() || (0 === (g & z) && this.error_parsing(this.pos, "unexpected operator"), h += 2, this.addfunc(f, e, t), g = y | B | A | E);
                    else if (this.isNumber()) {
                    0 === (g & y) && this.error_parsing(this.pos, "unexpected number");
                    var i = new c(r, 0, 0, this.tokennumber);
                    f.push(i), g = z | C | D
                } else if (this.isString()) {
                    0 === (g & y) && this.error_parsing(this.pos, "unexpected string");
                    var i = new c(r, 0, 0, this.tokennumber);
                    f.push(i), g = z | C | D
                } else if (this.isLeftParenth()) 0 === (g & B) && this.error_parsing(this.pos, 'unexpected "("'), g & F && (h += 2, this.tokenprio = -2, this.tokenindex = -1, this.addfunc(f, e, v)), g = y | B | A | E | G;
                else if (this.isRightParenth()) {
                    if (g & G) {
                        var i = new c(r, 0, 0, []);
                        f.push(i)
                    } else 0 === (g & C) && this.error_parsing(this.pos, 'unexpected ")"');
                    g = z | C | D | B | F
                } else if (this.isComma()) 0 === (g & D) && this.error_parsing(this.pos, 'unexpected ","'), this.addfunc(f, e, t), h += 2, g = y | B | A | E;
                else if (this.isConst()) {
                    0 === (g & y) && this.error_parsing(this.pos, "unexpected constant");
                    var j = new c(r, 0, 0, this.tokennumber);
                    f.push(j), g = z | C | D
                } else if (this.isOp2()) 0 === (g & A) && this.error_parsing(this.pos, "unexpected function"), this.addfunc(f, e, t), h += 2, g = B;
                else if (this.isOp1()) 0 === (g & A) && this.error_parsing(this.pos, "unexpected function"), this.addfunc(f, e, s), h++, g = B;
                else if (this.isVar()) {
                    0 === (g & y) && this.error_parsing(this.pos, "unexpected variable");
                    var k = new c(u, this.tokenindex, 0, 0);
                    f.push(k), g = z | C | D | B | F
                } else this.isWhite() || ("" === this.errormsg ? this.error_parsing(this.pos, "unknown character") : this.error_parsing(this.pos, this.errormsg));
                for ((this.tmpprio < 0 || this.tmpprio >= 10) && this.error_parsing(this.pos, 'unmatched "()"'); e.length > 0;) {
                    var l = e.pop();
                    f.push(l)
                }
                return h + 1 !== f.length && this.error_parsing(this.pos, "parity"), new d(f, b(this.ops1), b(this.ops2), b(this.functions))
            },
            evaluate: function(a, b) {
                return this.parse(a).evaluate(b)
            },
            error_parsing: function(a, b) {
                throw this.success = !1, this.errormsg = "parse error [column " + a + "]: " + b, new Error(this.errormsg)
            },
            addfunc: function(a, b, d) {
                for (var e = new c(d, this.tokenindex, this.tokenprio + this.tmpprio, 0); b.length > 0 && e.prio_ <= b[b.length - 1].prio_;) a.push(b.pop());
                b.push(e)
            },
            isNumber: function() {
                for (var a = !1, b = ""; this.pos < this.expression.length;) {
                    var c = this.expression.charCodeAt(this.pos);
                    if (!(c >= 48 && 57 >= c || 46 === c)) break;
                    b += this.expression.charAt(this.pos), this.pos++, this.tokennumber = parseFloat(b), a = !0
                }
                return a
            },
            unescape: function(a, b) {
                for (var c = [], d = !1, e = 0; e < a.length; e++) {
                    var f = a.charAt(e);
                    if (d) {
                        switch (f) {
                            case "'":
                                c.push("'");
                                break;
                            case "\\":
                                c.push("\\");
                                break;
                            case "/":
                                c.push("/");
                                break;
                            case "b":
                                c.push("\b");
                                break;
                            case "f":
                                c.push("\f");
                                break;
                            case "n":
                                c.push("\n");
                                break;
                            case "r":
                                c.push("\r");
                                break;
                            case "t":
                                c.push("	");
                                break;
                            case "u":
                                var g = parseInt(a.substring(e + 1, e + 5), 16);
                                c.push(String.fromCharCode(g)), e += 4;
                                break;
                            default:
                                throw this.error_parsing(b + e, "Illegal escape sequence: '\\" + f + "'")
                        }
                        d = !1
                    } else "\\" == f ? d = !0 : c.push(f)
                }
                return c.join("")
            },
            isString: function() {
                var a = !1,
                    b = "",
                    c = this.pos;
                if (this.pos < this.expression.length && "'" == this.expression.charAt(this.pos))
                    for (this.pos++; this.pos < this.expression.length;) {
                        var d = this.expression.charAt(this.pos);
                        if ("'" == d && "\\" != b.slice(-1)) {
                            this.pos++, this.tokennumber = this.unescape(b, c), a = !0;
                            break
                        }
                        b += this.expression.charAt(this.pos), this.pos++
                    }
                return a
            },
            isConst: function() {
                var a;
                for (var b in this.consts) {
                    var c = b.length;
                    if (a = this.expression.substr(this.pos, c), b === a) return this.tokennumber = this.consts[b], this.pos += c, !0
                }
                return !1
            },
            isOperator: function() {
                var a = this.expression.charCodeAt(this.pos);
                if (43 === a) this.tokenprio = 0, this.tokenindex = "+";
                else if (45 === a) this.tokenprio = 0, this.tokenindex = "-";
                else if (124 === a) {
                    if (124 !== this.expression.charCodeAt(this.pos + 1)) return !1;
                    this.pos++, this.tokenprio = 0, this.tokenindex = "||"
                } else if (42 === a) this.tokenprio = 1, this.tokenindex = "*";
                else if (47 === a) this.tokenprio = 2, this.tokenindex = "/";
                else if (37 === a) this.tokenprio = 2, this.tokenindex = "%";
                else {
                    if (94 !== a) return !1;
                    this.tokenprio = 3, this.tokenindex = "^"
                }
                return this.pos++, !0
            },
            isSign: function() {
                var a = this.expression.charCodeAt(this.pos - 1);
                return 45 === a || 43 === a ? !0 : !1
            },
            isPositiveSign: function() {
                var a = this.expression.charCodeAt(this.pos - 1);
                return 43 === a ? !0 : !1
            },
            isNegativeSign: function() {
                var a = this.expression.charCodeAt(this.pos - 1);
                return 45 === a ? !0 : !1
            },
            isLeftParenth: function() {
                var a = this.expression.charCodeAt(this.pos);
                return 40 === a ? (this.pos++, this.tmpprio += 10, !0) : !1
            },
            isRightParenth: function() {
                var a = this.expression.charCodeAt(this.pos);
                return 41 === a ? (this.pos++, this.tmpprio -= 10, !0) : !1
            },
            isComma: function() {
                var a = this.expression.charCodeAt(this.pos);
                return 44 === a ? (this.pos++, this.tokenprio = -1, this.tokenindex = ",", !0) : !1
            },
            isWhite: function() {
                var a = this.expression.charCodeAt(this.pos);
                return 32 === a || 9 === a || 10 === a || 13 === a ? (this.pos++, !0) : !1
            },
            isOp1: function() {
                for (var a = "", b = this.pos; b < this.expression.length; b++) {
                    var c = this.expression.charAt(b);
                    if (c.toUpperCase() === c.toLowerCase() && (b === this.pos || "_" != c && ("0" > c || c > "9"))) break;
                    a += c
                }
                return a.length > 0 && a in this.ops1 ? (this.tokenindex = a, this.tokenprio = 5, this.pos += a.length, !0) : !1
            },
            isOp2: function() {
                for (var a = "", b = this.pos; b < this.expression.length; b++) {
                    var c = this.expression.charAt(b);
                    if (c.toUpperCase() === c.toLowerCase() && (b === this.pos || "_" != c && ("0" > c || c > "9"))) break;
                    a += c
                }
                return a.length > 0 && a in this.ops2 ? (this.tokenindex = a, this.tokenprio = 5, this.pos += a.length, !0) : !1
            },
            isVar: function() {
                for (var a = "", b = this.pos; b < this.expression.length; b++) {
                    var c = this.expression.charAt(b);
                    if (c.toUpperCase() === c.toLowerCase() && (b === this.pos || "_" != c && ("0" > c || c > "9"))) break;
                    a += c
                }
                return a.length > 0 ? (this.tokenindex = a, this.tokenprio = 4, this.pos += a.length, !0) : !1
            },
            isComment: function() {
                var a = this.expression.charCodeAt(this.pos - 1);
                return 47 === a && 42 === this.expression.charCodeAt(this.pos) ? (this.pos = this.expression.indexOf("*/", this.pos) + 2, 1 === this.pos && (this.pos = this.expression.length), !0) : !1
            }
        }, a.Parser = q, q
    }("undefined" == typeof exports ? {} : exports),
    nodePoller, nodeDiagnosticsPoller, indicesPoller, indexPoller, mainMenuPoller, clusterOverviewPoller, stopNodePoller = function() {
        void 0 !== nodePoller && nodePoller.stop()
    },
    stopClusterOverviewPoller = function() {
        void 0 !== clusterOverviewPoller && clusterOverviewPoller.stop()
    },
    stopNodeDiagnosticsPoller = function() {
        void 0 !== nodeDiagnosticsPoller && nodeDiagnosticsPoller.stop()
    },
    stopIndicesPoller = function() {
        void 0 !== indicesPoller && indicesPoller.stop()
    },
    stopIndexPoller = function() {
        void 0 !== indexPoller && indexPoller.stop()
    },
    stopAllNodePollers = function() {
        stopNodePoller(), stopClusterOverviewPoller(), stopNodeDiagnosticsPoller(), stopIndicesPoller(), stopIndexPoller()
    },
    stopAllPollers = function() {
        stopAllNodePollers(), void 0 !== mainMenuPoller && mainMenuPoller.stop()
    };
$.tablesorter.addParser({
    id: "datasize",
    is: function(a) {
        return a.match(new RegExp(/[0-9]+(\.[0-9]+)?\ (B|K|KB|G|GB|M|MB|T|TB)/i))
    },
    format: function(a) {
        if (0 !== a) {
            var b = a.match(new RegExp(/(B|K|KB|G|GB|M|MB|T|TB)/i))[1],
                c = parseFloat(a.match(new RegExp(/^[0-9]+(\.[0-9]+)?/))[0]);
            switch (b.toLowerCase()) {
                case "b":
                    return c;
                case "k":
                case "kb":
                    return 1024 * c;
                case "m":
                case "mb":
                    return 1024 * c * 1024;
                case "g":
                case "gb":
                    return 1024 * c * 1024 * 1024;
                case "t":
                case "tb":
                    return 1024 * c * 1024 * 1024 * 1024
            }
        }
    },
    type: "numeric"
}), $.tablesorter.addWidget({
    id: "sortPersist",
    format: function(a) {
        var b = "elastichq_tablesorts",
            c = $.cookie(b),
            d = {
                path: "/"
            },
            e = {},
            f = a.config.sortList,
            g = $(a).attr("id"),
            h = "undefined" != typeof c && null != c;
        f.length > 0 ? (h && (e = JSON.parse(c)), e[g] = f, $.cookie(b, JSON.stringify(e), d)) : h && (e = JSON.parse($.cookie(b)), "undefined" != typeof e[g] && null != e[g] && (f = e[g], f.length > 0 && $(a).trigger("sorton", [f])))
    }
});
var ajaxloading = {
        show: function(a) {
            a ? $(a).fadeIn({
                duration: 1e3
            }) : $("#ajaxindicator").fadeIn({
                duration: 1e3
            })
        },
        hide: function(a) {
            a ? $(a).fadeOut({
                duration: 1e3
            }) : $("#ajaxindicator").fadeOut({
                duration: 1e3
            })
        }
    },
    tokenizeUserPassFromURL = function(a) {
        if (a && a.indexOf("@") >= 0) {
            var b = a.split("@")[0];
            if ((b.indexOf("http://") >= 0 || b.indexOf("https://") >= 0) && (b = b.replace("http://", ""), b = b.replace("https://", "")), b.indexOf(":") >= 0) {
                var c = b.split(":"),
                    d = c[0],
                    e = c[1],
                    f = d.concat(":", e);
                return f
            }
            return void 0
        }
    },
    doFocus = function(a, b) {
        var c = $(a),
            d = $(b);
        c.bind("keypress", function(a) {
            if ("undefined" == typeof a && window.event && (a = window.event), 13 == a.keyCode) {
                if (!a.cancelable || !a.preventDefault) return d.click(), !1;
                a.preventDefault(), d.click()
            }
        })
    },
    scrollToTop = {
        activate: function() {
            jQuery(document).ready(function() {
                jQuery(window).scroll(function() {
                    jQuery(this).scrollTop() > 100 ? (jQuery(".scrollup").fadeIn(), jQuery(".scrollupLeft").fadeIn()) : (jQuery(".scrollup").fadeOut(), jQuery(".scrollupLeft").fadeOut())
                }), jQuery(".scrollup").click(function() {
                    return jQuery("html, body").animate({
                        scrollTop: 0
                    }, 600), !1
                }), jQuery(".scrollupLeft").click(function() {
                    return jQuery("html, body").animate({
                        scrollTop: 0
                    }, 600), !1
                })
            })
        }
    },
    timeUtil = {
        lastUpdated: function() {
            var a = new Date,
                b = a.getHours(),
                c = a.getMinutes(),
                d = a.getSeconds();
            return 10 > b && (b = "0" + b), 10 > c && (c = "0" + c), 10 > d && (d = "0" + d), b + ":" + c + ":" + d
        },
        convertMS: function(a) {
            var b, c, d, e;
            return e = Math.floor(a / 1e3), d = Math.floor(e / 60), e %= 60, c = Math.floor(d / 60), d %= 60, b = Math.floor(c / 24), c %= 24, 10 > c && (c = "0" + c), 10 > d && (d = "0" + d), 10 > e && (e = "0" + e), c + ":" + d + ":" + e
        }
    },
    stack_bottomright = {
        dir1: "up",
        dir2: "left",
        firstpos1: 25,
        firstpos2: 25
    },
    convert = {
        bytesToSize: function(a, b) {
            var c = 1024,
                d = 1024 * c,
                e = 1024 * d,
                f = 1024 * e;
            return a >= 0 && c > a ? a + " B" : a >= c && d > a ? (a / c).toFixed(b) + " KB" : a >= d && e > a ? (a / d).toFixed(b) + " MB" : a >= e && f > a ? (a / e).toFixed(b) + " GB" : a >= f ? (a / f).toFixed(b) + " TB" : a + " B"
        }
    };
$.fn.serializeObject = function() {
    var a = {},
        b = this.serializeArray();
    return $.each(b, function() {
        void 0 !== a[this.name] ? (a[this.name].push || (a[this.name] = [a[this.name]]), a[this.name].push(this.value || "")) : a[this.name] = this.value || ""
    }), a
};
var getURLParameter = function(a) {
        return decodeURIComponent((new RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
    },
    checkVersion = function() {
        try {
            if (!showedVersionCheckMessage) {
                var a = settingsModel.get("settings").uuid;
                $.ajax({
                    type: "GET",
                    url: REMOTE_API_PATH + "/hq_settings.php",
                    processData: !1,
                    cache: !1,
                    crossDomain: !0,
                    dataType: "json",
                    data: "uuid=" + a,
                    success: function(a) {
                        if (void 0 != a && void 0 != a.version && a.version !== HQVERSION) {
                            var b = "ElasticHQ v" + a.version + ' is available.<br/>You should consider <a href="http://www.elastichq.org/gettingstarted.html" target="_blank">upgrading</a>.[<a href="https://github.com/royrusso/elasticsearch-HQ/issues?milestone=16&page=1&state=closed" target="_blank">ChangeLog</a>]<br/><small>(You are running version ' + HQVERSION + ".)</small>";
                            show_stack_bottomright({
                                hide: !1,
                                type: "error",
                                title: "New Version Available!",
                                text: b
                            }), showedVersionCheckMessage = !0
                        }
                    },
                    error: function(a) {
                        console.log("ERROR! " + a.responseText)
                    }
                })
            }
        } catch (b) {
            console.log("ERROR! " + b.message)
        }
    },
    versionUtil = {};
versionUtil.isNewer = function(a, b) {
    try {
        var c, d = a.split("."),
            e = b.split("."),
            f = d.length > e.length ? d.length : e.length;
        for (c = 0; f > c; c++)
            if ((parseInt(e[c], 10) || 0) !== (parseInt(d[c], 10) || 0)) return (parseInt(e[c], 10) || 0) > (parseInt(d[c], 10) || 0);
        return !1
    } catch (g) {}
    return !1
};
versionUtil.isNewerOrEqual = function (a, b) {
    try {
        var c, d = a.split("."),
            e = b.split("."),
            f = d.length > e.length ? d.length : e.length;
        for (c = 0; f > c; c++)
            if ((parseInt(e[c], 10) || 0) !== (parseInt(d[c], 10) || 0)) return (parseInt(e[c], 10) || 0) > (parseInt(d[c], 10) || 0);
        return !!1
    } catch (g) { }
    return !1
};