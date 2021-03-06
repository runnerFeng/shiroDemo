/**
 * list\u5de6\u53f3\u9009\u62e9
 * @fileOverview
 * @ignore
 */define("bui/extensions/multiselect/multilist", ["bui/common", "bui/list"], function (e) {
    function i(e, n, r) {
        t.isFunction(e.set) ? e.set(n, r) : e[n] = r
    }

    var t = e("bui/common"), n = t.Component, r = e("bui/list"), s = t.prefix, o = s + "multilist-source",
        u = s + "multilist-target", a = s + "multilist-btn-right", f = s + "multilist-btn-left",
        l = n.Controller.extend({
            renderUI: function () {
                var e = this, t = e.get("source"), n = e.get("target");
                t = e._initControl(t, o), n = e._initControl(n, u), t.render(), n.render(), e.set("source", t), e.set("target", n)
            }, _initControl: function (e, t) {
                var n = this, r = n.get("el");
                return e.isController ? (e.set("render", r.find("." + t)), e) : (e.render = r.find("." + t), n._createControl(e))
            }, _createControl: function (e) {
                if (e.isController)return e;
                var t = e.multipleSelect || this.get("multipleSelect"), r = e.xclass || t ? "listbox" : "simple-list";
                return e.xclass = r, n.create(e, this)
            }, bindUI: function () {
                var e = this, t = e.get("el"), n = e.get("source"), r = e.get("target"), i = t.find("." + a),
                    s = t.find("." + f);
                i.on("click", function (t) {
                    var i = n.getSelection();
                    e.fire("selected", {items: i}) !== !1 && (n.removeItems(i), r.addItems(i))
                }), s.on("click", function (t) {
                    var i = r.getSelection();
                    e.fire("unselected", {items: i}) !== !1 && (r.removeItems(i), n.addItems(i))
                }), n.on("dblclick", function (t) {
                    var i = $(t.domTarget).closest("li"), s = n.getItemByElement(i);
                    e.fire("selected", {items: [s]}) !== !1 && (n.removeItem(s), r.addItem(s))
                }), r.on("dblclick", function (t) {
                    var i = $(t.domTarget).closest("li"), s = r.getItemByElement(i);
                    e.fire("unselected", {items: [s]}) !== !1 && (r.removeItem(s), n.addItem(s))
                })
            }, _uiSetStore: function (e) {
                var n = this, r = n.get("target"), i = r.get("idField");
                e.filter(function (e) {
                    var n = r.getItems(), s = !0;
                    return t.each(n, function (t) {
                        if (t[i] === e[i])return s = !1, !1
                    }), s
                })
            }
        }, {
            ATTRS: {
                source: {value: {elCls: "bui-select-list"}, shared: !1},
                target: {value: {elCls: "bui-select-list"}, shared: !1},
                store: {
                    setter: function (e) {
                        return i(this.get("source"), "store", e), e
                    }
                },
                items: {
                    setter: function (e) {
                        var n = new t.Data.Store({data: e});
                        return this.set("store", n), e
                    }
                },
                url: {
                    setter: function (e) {
                        if (!e)return;
                        var n = new t.Data.Store({url: e, autoLoad: !0});
                        return this.set("store", n), e
                    }
                },
                tpl: {value: '<div class="row"><div class="span5 ' + o + '"></div>' + '<div class="span2 bui-multilist-action centered">' + '<p><button  class="button button-small ' + a + '" type="button">&gt;&gt;</button></p>' + '<p><button  class="button button-small ' + f + '" type="button">&lt;&lt;</button></p>' + "</div>" + '<div class="span5 ' + u + '"></div>' + "</div>"}
            }
        }, {xclass: "multilist"});
    return l
});
