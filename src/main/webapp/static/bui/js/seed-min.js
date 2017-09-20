/**
 * Sea.js 2.1.1 | seajs.org/LICENSE.md
 */(function (e, t) {
    function i(e) {
        return function (t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        }
    }

    function l() {
        return f++
    }

    function m(e) {
        return e.match(p)[0]
    }

    function g(e) {
        e = e.replace(d, "/");
        while (e.match(v))e = e.replace(v, "/");
        return e
    }

    function y(e) {
        var t = e.length - 1, n = e.charAt(t);
        return n === "#" ? e.substring(0, t) : e.substring(t - 2) === ".js" || e.indexOf("?") > 0 || e.substring(t - 3) === ".css" || n === "/" ? e : e + ".js"
    }

    function E(e) {
        var t = r.alias;
        return t && o(t[e]) ? t[e] : e
    }

    function S(e) {
        var t = r.paths, n;
        return t && (n = e.match(b)) && o(t[n[1]]) && (e = t[n[1]] + n[2]), e
    }

    function x(e) {
        var t = r.vars;
        return t && e.indexOf("{") > -1 && (e = e.replace(w, function (e, n) {
            return o(t[n]) ? t[n] : e
        })), e
    }

    function T(e) {
        var t = r.map, n = e;
        if (t)for (var i = 0, s = t.length; i < s; i++) {
            var o = t[i];
            n = a(o) ? o(e) || e : e.replace(o[0], o[1]);
            if (n !== e)break
        }
        return n
    }

    function k(e, t) {
        var n, i = e.charAt(0);
        if (N.test(e)) n = e; else if (i === ".") n = g((t ? m(t) : r.cwd) + e); else if (i === "/") {
            var s = r.cwd.match(C);
            n = s ? s[0] + e.substring(1) : e
        } else n = r.base + e;
        return n
    }

    function L(e, t) {
        if (!e)return "";
        e = E(e), e = S(e), e = x(e), e = y(e);
        var n = k(e, t);
        return n = T(n), n
    }

    function H(e) {
        return e.hasAttribute ? e.src : e.getAttribute("src", 4)
    }

    function z(e, t, n) {
        var r = F.test(e), i = A.createElement(r ? "link" : "script");
        if (n) {
            var s = a(n) ? n(e) : n;
            s && (i.charset = s)
        }
        W(i, t, r), r ? (i.rel = "stylesheet", i.href = e) : (i.async = !0, i.src = e), q = i, j ? B.insertBefore(i, j) : B.appendChild(i), q = null
    }

    function W(e, t, n) {
        var i = n && (U || !("onload" in e));
        if (i) {
            setTimeout(function () {
                X(e, t)
            }, 1);
            return
        }
        e.onload = e.onerror = e.onreadystatechange = function () {
            I.test(e.readyState) && (e.onload = e.onerror = e.onreadystatechange = null, !n && !r.debug && B.removeChild(e), e = null, t())
        }
    }

    function X(e, t) {
        var n = e.sheet, r;
        if (U) n && (r = !0); else if (n)try {
            n.cssRules && (r = !0)
        } catch (i) {
            i.name === "NS_ERROR_DOM_SECURITY_ERR" && (r = !0)
        }
        setTimeout(function () {
            r ? t() : X(e, t)
        }, 20)
    }

    function V() {
        if (q)return q;
        if (R && R.readyState === "interactive")return R;
        var e = B.getElementsByTagName("script");
        for (var t = e.length - 1; t >= 0; t--) {
            var n = e[t];
            if (n.readyState === "interactive")return R = n, R
        }
    }

    function K(e) {
        var t = [];
        return e.replace(J, "").replace($, function (e, n, r) {
            r && t.push(r)
        }), t
    }

    function nt(e, t) {
        this.uri = e, this.dependencies = t || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
    }

    if (e.seajs)return;
    var n = e.seajs = {version: "2.1.1"}, r = n.data = {}, s = i("Object"), o = i("String"),
        u = Array.isArray || i("Array"), a = i("Function"), f = 0, c = r.events = {};
    n.on = function (e, t) {
        var r = c[e] || (c[e] = []);
        return r.push(t), n
    }, n.off = function (e, t) {
        if (!e && !t)return c = r.events = {}, n;
        var i = c[e];
        if (i)if (t)for (var s = i.length - 1; s >= 0; s--)i[s] === t && i.splice(s, 1); else delete c[e];
        return n
    };
    var h = n.emit = function (e, t) {
            var r = c[e], i;
            if (r) {
                r = r.slice();
                while (i = r.shift())i(t)
            }
            return n
        }, p = /[^?#]*\//, d = /\/\.\//g, v = /\/[^/]+\/\.\.\//, b = /^([^/:]+)(\/.+)$/, w = /{([^{]+)}/g, N = /^\/\/.|:\//,
        C = /^.*?\/\/.*?\//, A = document, O = location, M = m(O.href), _ = A.getElementsByTagName("script"),
        D = A.getElementById("seajsnode") || _[_.length - 1], P = m(H(D) || M),
        B = A.getElementsByTagName("head")[0] || A.documentElement, j = B.getElementsByTagName("base")[0],
        F = /\.css(?:\?|$)/i, I = /^(?:loaded|complete|undefined)$/, q, R,
        U = navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") * 1 < 536,
        $ = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
        J = /\\\\/g, Q = n.cache = {}, G, Y = {}, Z = {}, et = {},
        tt = nt.STATUS = {FETCHING: 1, SAVED: 2, LOADING: 3, LOADED: 4, EXECUTING: 5, EXECUTED: 6};
    nt.prototype.resolve = function () {
        var e = this, t = e.dependencies, n = [];
        for (var r = 0, i = t.length; r < i; r++)n[r] = nt.resolve(t[r], e.uri);
        return n
    }, nt.prototype.load = function () {
        var e = this;
        if (e.status >= tt.LOADING)return;
        e.status = tt.LOADING;
        var t = e.resolve();
        h("load", t);
        var n = e._remain = t.length, r;
        for (var i = 0; i < n; i++)r = nt.get(t[i]), r.status < tt.LOADED ? r._waitings[e.uri] = (r._waitings[e.uri] || 0) + 1 : e._remain--;
        if (e._remain === 0) {
            e.onload();
            return
        }
        var s = {};
        for (i = 0; i < n; i++)r = Q[t[i]], r.status < tt.FETCHING ? r.fetch(s) : r.status === tt.SAVED && r.load();
        for (var o in s)s.hasOwnProperty(o) && s[o]()
    }, nt.prototype.onload = function () {
        var e = this;
        e.status = tt.LOADED, e.callback && e.callback();
        var t = e._waitings, n, r;
        for (n in t)t.hasOwnProperty(n) && (r = Q[n], r._remain -= t[n], r._remain === 0 && r.onload());
        delete e._waitings, delete e._remain
    }, nt.prototype.fetch = function (e) {
        function o() {
            z(i.requestUri, i.onRequest, i.charset)
        }

        function u() {
            delete Y[s], Z[s] = !0, G && (nt.save(n, G), G = null);
            var e, t = et[s];
            delete et[s];
            while (e = t.shift())e.load()
        }

        var t = this, n = t.uri;
        t.status = tt.FETCHING;
        var i = {uri: n};
        h("fetch", i);
        var s = i.requestUri || n;
        if (!s || Z[s]) {
            t.load();
            return
        }
        if (Y[s]) {
            et[s].push(t);
            return
        }
        Y[s] = !0, et[s] = [t], h("request", i = {
            uri: n,
            requestUri: s,
            onRequest: u,
            charset: r.charset
        }), i.requested || (e ? e[i.requestUri] = o : o())
    }, nt.prototype.exec = function () {
        function r(e) {
            return nt.get(r.resolve(e)).exec()
        }

        var e = this;
        if (e.status >= tt.EXECUTING)return e.exports;
        e.status = tt.EXECUTING;
        var n = e.uri;
        r.resolve = function (e) {
            return nt.resolve(e, n)
        }, r.async = function (e, t) {
            return nt.use(e, t, n + "_async_" + l()), r
        };
        var i = e.factory, s = a(i) ? i(r, e.exports = {}, e) : i;
        return s === t && (s = e.exports), s === null && !F.test(n) && h("error", e), delete e.factory, e.exports = s, e.status = tt.EXECUTED, h("exec", e), s
    }, nt.resolve = function (e, t) {
        var n = {id: e, refUri: t};
        return h("resolve", n), n.uri || L(n.id, t)
    }, nt.define = function (e, n, r) {
        var i = arguments.length;
        i === 1 ? (r = e, e = t) : i === 2 && (r = n, u(e) ? (n = e, e = t) : n = t), !u(n) && a(r) && (n = K(r.toString()));
        var s = {id: e, uri: nt.resolve(e), deps: n, factory: r};
        if (!s.uri && A.attachEvent) {
            var o = V();
            o && (s.uri = o.src)
        }
        h("define", s), s.uri ? nt.save(s.uri, s) : G = s
    }, nt.save = function (e, t) {
        var n = nt.get(e);
        n.status < tt.SAVED && (n.id = t.id || e, n.dependencies = t.deps || [], n.factory = t.factory, n.status = tt.SAVED)
    }, nt.get = function (e, t) {
        return Q[e] || (Q[e] = new nt(e, t))
    }, nt.use = function (t, n, r) {
        var i = nt.get(r, u(t) ? t : [t]);
        i.callback = function () {
            var t = [], r = i.resolve();
            for (var s = 0, o = r.length; s < o; s++)t[s] = Q[r[s]].exec();
            n && n.apply(e, t), delete i.callback
        }, i.load()
    }, nt.preload = function (e) {
        var t = r.preload, n = t.length;
        n ? nt.use(t, function () {
            t.splice(0, n), nt.preload(e)
        }, r.cwd + "_preload_" + l()) : e()
    }, n.use = function (e, t) {
        return nt.preload(function () {
            nt.use(e, t, r.cwd + "_use_" + l())
        }), n
    }, nt.define.cmd = {}, e.define = nt.define, n.Module = nt, r.fetchedList = Z, r.cid = l, n.resolve = L, n.require = function (e) {
        return (Q[nt.resolve(e)] || {}).exports
    };
    var rt = /^(.+?\/)(\?\?)?(seajs\/)+/;
    r.base = (P.match(rt) || ["", P])[1], r.dir = P, r.cwd = M, r.charset = "utf-8", r.preload = function () {
        var e = [], t = O.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
        return t += " " + A.cookie, t.replace(/(seajs-\w+)=1/g, function (t, n) {
            e.push(n)
        }), e
    }(), n.config = function (e) {
        for (var t in e) {
            var i = e[t], o = r[t];
            if (o && s(o))for (var a in i)o[a] = i[a]; else u(o) ? i = o.concat(i) : t === "base" && (i.slice(-1) === "/" || (i += "/"), i = k(i)), r[t] = i
        }
        return h("config", e), n
    }
})(this), function () {
    var e = seajs.pluginSDK ? seajs.pluginSDK.util.loaderDir : seajs.data.base, t = e.lastIndexOf("/");
    t == e.length - 1 && (e = e.substr(0, t)), seajs.config({charset: "utf-8"}), seajs.config({paths: {bui: e}});
    var n = window.BUI = window.BUI || {}, r = document.getElementsByTagName("script"), i = r[r.length - 1];
    n.loaderScript = i, i.getAttribute("data-debug") == "true" ? n.debug = !0 : n.debug = !1, n.use = seajs.use, n.config = function (e) {
        e.alias && (e.paths = e.alias, delete e.alias), seajs.config(e)
    }, n.setDebug = function (e) {
        n.debug = e;
        if (e) {
            var t = seajs.data.map, r = -1;
            if (t) {
                for (var i = 0; i < t.length; i++) {
                    var s = t[i];
                    if (s[0].toString() == /.js$/.toString() && s[1] == "-min.js") {
                        r = i;
                        break
                    }
                }
                r != -1 && t.splice(r, 1)
            }
        } else seajs.config({map: [[/.js$/, "-min.js"]]})
    }, n.setDebug(n.debug)
}(), function () {
    var e = ["bui/util", "bui/ua", "bui/json", "bui/date", "bui/array", "bui/keycode", "bui/observable", "bui/base", "bui/component"];
    window.KISSY && (!window.KISSY.Node || !window.jQuery) && e.unshift("bui/adapter"), define("bui/common", e, function (e) {
        window.KISSY && (!window.KISSY.Node || !window.jQuery) && e("bui/adapter");
        var t = e("bui/util");
        return t.mix(t, {
            UA: e("bui/ua"),
            JSON: e("bui/json"),
            Date: e("bui/date"),
            Array: e("bui/array"),
            KeyCode: e("bui/keycode"),
            Observable: e("bui/observable"),
            Base: e("bui/base"),
            Component: e("bui/component")
        }), t
    })
}(), window.BUI = window.BUI || {}, !BUI.use && window.seajs && (BUI.use = seajs.use, BUI.config = seajs.config), define("bui/util", function (e) {
    function t(e, t) {
        for (var r in t)t.hasOwnProperty(r) && (e[r] = e[r] || {}, n(e[r], t[r]))
    }

    function n(e, t) {
        for (var n in t)t.hasOwnProperty(n) && (n == "value" ? BUI.isObject(t[n]) ? (e[n] = e[n] || {}, BUI.mix(e[n], t[n])) : BUI.isArray(t[n]) ? (e[n] = e[n] || [], e[n] = e[n].concat(t[n])) : e[n] = t[n] : e[n] = t[n])
    }

    (function (e) {
        e.fn && (e.fn.on = e.fn.on || e.fn.bind, e.fn.off = e.fn.off || e.fn.unbind)
    })(jQuery);
    var r = window, i = document, s = Object.prototype, o = s.toString, u = "body", a = "documentElement", f = "scroll",
        l = f + "Width", c = f + "Height", h = "ATTRS", p = "PARSER", d = "guid";
    $.extend(BUI, {
        version: 1, subVersion: 96, isFunction: function (e) {
            return typeof e == "function"
        }, isArray: "isArray" in Array ? Array.isArray : function (e) {
            return o.call(e) === "[object Array]"
        }, isDate: function (e) {
            return o.call(e) === "[object Date]"
        }, isObject: o.call(null) === "[object Object]" ? function (e) {
            return e !== null && e !== undefined && o.call(e) === "[object Object]" && e.ownerDocument === undefined
        } : function (e) {
            return o.call(e) === "[object Object]"
        }, isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, augment: function (e, t) {
            if (!BUI.isFunction(e))return e;
            for (var n = 1; n < arguments.length; n++)BUI.mix(e.prototype, arguments[n].prototype || arguments[n]);
            return e
        }, cloneObject: function (e) {
            var t = BUI.isArray(e) ? [] : {};
            return BUI.mix(!0, t, e)
        }, error: function (e) {
            if (BUI.debug)throw e
        }, extend: function (e, t, n, r) {
            BUI.isFunction(t) || (n = t, t = e, e = function () {
            });
            var i = Object.create ? function (e, t) {
                return Object.create(e, {constructor: {value: t}})
            } : function (e, t) {
                function n() {
                }

                n.prototype = e;
                var r = new n;
                return r.constructor = t, r
            }, s = i(t.prototype, e);
            return e.prototype = BUI.mix(s, e.prototype), e.superclass = i(t.prototype, t), BUI.mix(s, n), BUI.mix(e, r), e
        }, guid: function () {
            var e = {};
            return function (t) {
                return t = t || BUI.prefix + d, e[t] ? e[t] += 1 : e[t] = 1, t + e[t]
            }
        }(), isString: function (e) {
            return typeof e == "string"
        }, isNumber: function (e) {
            return typeof e == "number"
        }, isBoolean: function (e) {
            return typeof e == "boolean"
        }, log: function (e) {
            BUI.debug && r.console && r.console.log && r.console.log(e)
        }, merge: function () {
            var e = $.makeArray(arguments), t = e[0];
            return BUI.isBoolean(t) ? (e.shift(), e.unshift({}), e.unshift(t)) : e.unshift({}), BUI.mix.apply(null, e)
        }, mix: function () {
            return $.extend.apply(null, arguments)
        }, app: function (e) {
            return window[e] || (window[e] = {
                namespace: function (t) {
                    return BUI.namespace(t, window[e])
                }
            }), window[e]
        }, mixAttrs: t, mixAttr: n, mixin: function (e, n, r) {
            r = r || [h, p];
            var i = n;
            if (i) {
                e.mixins = i;
                var s = {}, o = i.concat(e);
                BUI.each(o, function (e) {
                    e && BUI.each(r, function (n) {
                        e[n] && (s[n] = s[n] || {}, n == "ATTRS" ? t(s[n], e[n]) : BUI.mix(s[n], e[n]))
                    })
                }), BUI.each(s, function (t, n) {
                    e[n] = t
                });
                var u = {};
                BUI.each(o, function (e) {
                    if (e) {
                        var t = e.prototype;
                        for (var n in t)t.hasOwnProperty(n) && (u[n] = t[n])
                    }
                }), BUI.each(u, function (t, n) {
                    e.prototype[n] = t
                })
            }
            return e
        }, namespace: function (e, t) {
            t = t || BUI;
            if (!e)return t;
            var n = e.split("."), r = t;
            for (var i = 0; i < n.length; i++) {
                var s = n[i];
                r[s] || (r[s] = {}), r = r[s]
            }
            return r
        }, prefix: "bui-", substitute: function (e, t, n) {
            return !BUI.isString(e) || !BUI.isObject(t) && !BUI.isArray(t) ? e : e.replace(n || /\\?\{([^{}]+)\}/g, function (e, n) {
                return e.charAt(0) === "\\" ? e.slice(1) : t[n] === undefined ? "" : t[n]
            })
        }, ucfirst: function (e) {
            return e += "", e.charAt(0).toUpperCase() + e.substring(1)
        }, isInView: function (e) {
            var t = e.left, n = e.top, r = BUI.viewportWidth(), i = BUI.viewportHeight(), s = BUI.scrollTop(),
                o = BUI.scrollLeft();
            return t < o || t > o + r ? !1 : n < s || n > s + i ? !1 : !0
        }, isInVerticalView: function (e) {
            var t = BUI.viewportHeight(), n = BUI.scrollTop();
            return e < n || e > n + t ? !1 : !0
        }, isInHorizontalView: function (e) {
            var t = BUI.viewportWidth(), n = BUI.scrollLeft();
            return e < n || e > n + t ? !1 : !0
        }, viewportWidth: function () {
            return $(window).width()
        }, viewportHeight: function () {
            return $(window).height()
        }, scrollLeft: function () {
            return $(window).scrollLeft()
        }, scrollTop: function () {
            return $(window).scrollTop()
        }, docWidth: function () {
            return Math.max(this.viewportWidth(), i[a][l], i[u][l])
        }, docHeight: function () {
            return Math.max(this.viewportHeight(), i[a][c], i[u][c])
        }, each: function (e, t) {
            if (!e)return;
            $.each(e, function (e, n) {
                return t(n, e)
            })
        }, wrapBehavior: function (e, t) {
            return e["__bui_wrap_" + t] = function (n) {
                e.get("disabled") || e[t](n)
            }
        }, getWrapBehavior: function (e, t) {
            return e["__bui_wrap_" + t]
        }, getControl: function (e) {
            return BUI.Component.Manager.getComponent(e)
        }
    });
    var v = BUI.FormHelper = {
        serializeToObject: function (e) {
            var t = $(e).serializeArray(), n = {};
            return BUI.each(t, function (e) {
                var t = e.name;
                n[t] ? (BUI.isArray(n[t]) || (n[t] = [n[t]]), n[t].push(e.value)) : n[t] = e.value
            }), n
        }, setFields: function (e, t) {
            for (var n in t)t.hasOwnProperty(n) && BUI.FormHelper.setField(e, n, t[n])
        }, clear: function (e) {
            var t = $.makeArray(e.elements);
            BUI.each(t, function (e) {
                e.type === "checkbox" || e.type === "radio" ? $(e).attr("checked", !1) : $(e).val(""), $(e).change()
            })
        }, setField: function (e, t, n) {
            var r = e.elements[t];
            r && r.type ? v._setFieldValue(r, n) : (BUI.isArray(r) || r && r.length) && BUI.each(r, function (e) {
                    v._setFieldValue(e, n)
                })
        }, _setFieldValue: function (e, t) {
            e.type === "checkbox" ? e.value == "" + t || BUI.isArray(t) && BUI.Array.indexOf(e.value, t) !== -1 ? $(e).attr("checked", !0) : $(e).attr("checked", !1) : e.type === "radio" ? e.value == "" + t ? $(e).attr("checked", !0) : $(e).attr("checked", !1) : $(e).val(t)
        }, getField: function (e, t) {
            return BUI.FormHelper.serializeToObject(e)[t]
        }
    };
    return BUI
}), define("bui/array", ["bui/util"], function (e) {
    var t = e("bui/util");
    return t.Array = {
        peek: function (e) {
            return e[e.length - 1]
        }, indexOf: function (e, t, n) {
            var r = n == null ? 0 : n < 0 ? Math.max(0, t.length + n) : n;
            for (var i = r; i < t.length; i++)if (i in t && t[i] === e)return i;
            return -1
        }, contains: function (e, n) {
            return t.Array.indexOf(e, n) >= 0
        }, each: t.each, equals: function (e, t) {
            if (e == t)return !0;
            if (!e || !t)return !1;
            if (e.length != t.length)return !1;
            var n = !0;
            for (var r = 0; r < e.length; r++)if (e[r] !== t[r]) {
                n = !1;
                break
            }
            return n
        }, filter: function (e, n) {
            var r = [];
            return t.Array.each(e, function (e, t) {
                n(e, t) && r.push(e)
            }), r
        }, map: function (e, n) {
            var r = [];
            return t.Array.each(e, function (e, t) {
                r.push(n(e, t))
            }), r
        }, find: function (e, n) {
            var r = t.Array.findIndex(e, n);
            return r < 0 ? null : e[r]
        }, findIndex: function (e, n) {
            var r = -1;
            return t.Array.each(e, function (e, t) {
                if (n(e, t))return r = t, !1
            }), r
        }, isEmpty: function (e) {
            return e.length == 0
        }, add: function (e, t) {
            e.push(t)
        }, addAt: function (e, n, r) {
            t.Array.splice(e, r, 0, n)
        }, empty: function (e) {
            if (!(e instanceof Array))for (var t = e.length - 1; t >= 0; t--)delete e[t];
            e.length = 0
        }, remove: function (e, n) {
            var r = t.Array.indexOf(n, e), i;
            return (i = r >= 0) && t.Array.removeAt(e, r), i
        }, removeAt: function (e, n) {
            return t.Array.splice(e, n, 1).length == 1
        }, slice: function (e, t, n) {
            return arguments.length <= 2 ? Array.prototype.slice.call(e, t) : Array.prototype.slice.call(e, t, n)
        }, splice: function (e, n, r, i) {
            return Array.prototype.splice.apply(e, t.Array.slice(arguments, 1))
        }
    }, t.Array
}), define("bui/observable", ["bui/util"], function (e) {
    function r() {
        return new n
    }

    var t = e("bui/util"), n = function () {
        this._init()
    };
    t.augment(n, {
        _functions: null, _init: function () {
            var e = this;
            e._functions = []
        }, add: function (e) {
            this._functions.push(e)
        }, remove: function (e) {
            var n = this._functions;
            index = t.Array.indexOf(e, n), index >= 0 && n.splice(index, 1)
        }, empty: function () {
            var e = this._functions.length;
            this._functions.splice(0, e)
        }, pause: function () {
            this._paused = !0
        }, resume: function () {
            this._paused = !1
        }, fireWith: function (e, n) {
            var r = this, i;
            if (this._paused)return;
            return t.each(r._functions, function (t) {
                i = t.apply(e, n);
                if (i === !1)return !1
            }), i
        }
    });
    var i = function (e) {
        this._events = [], this._eventMap = {}, this._bubblesEvents = [], this._initEvents(e)
    };
    return t.augment(i, {
        _events: [],
        _eventMap: {},
        _bubblesEvents: [],
        _bubbleTarget: null,
        _getCallbacks: function (e) {
            var t = this, n = t._eventMap;
            return n[e]
        },
        _initEvents: function (e) {
            var t = this, n = null;
            if (!e)return;
            n = e.listeners || {}, e.handler && (n.click = e.handler);
            if (n)for (var r in n)n.hasOwnProperty(r) && t.on(r, n[r])
        },
        _isBubbles: function (e) {
            return t.Array.indexOf(e, this._bubblesEvents) >= 0
        },
        addTarget: function (e) {
            this._bubbleTarget = e
        },
        addEvents: function (e) {
            function o(e) {
                t.Array.indexOf(e, i) === -1 && (s[e] = r(), i.push(e))
            }

            var n = this, i = n._events, s = n._eventMap;
            t.isArray(e) ? $.each(e, function (e, t) {
                o(t)
            }) : o(e)
        },
        clearListeners: function () {
            var e = this, t = e._eventMap;
            for (var n in t)t.hasOwnProperty(n) && t[n].empty()
        },
        fire: function (e, t) {
            var n = this, r = n._getCallbacks(e), i = $.makeArray(arguments), s;
            t || (t = {}, i.push(t)), t.target || (t.target = n), r && (s = r.fireWith(n, Array.prototype.slice.call(i, 1)));
            if (n._isBubbles(e)) {
                var o = n._bubbleTarget;
                o && o.fire && o.fire(e, t)
            }
            return s
        },
        pauseEvent: function (e) {
            var t = this, n = t._getCallbacks(e);
            n && n.pause()
        },
        resumeEvent: function (e) {
            var t = this, n = t._getCallbacks(e);
            n && n.resume()
        },
        on: function (e, n) {
            var r = e.split(" "), i = this, s = null;
            return r.length > 1 ? t.each(r, function (e) {
                i.on(e, n)
            }) : (s = i._getCallbacks(e), s ? s.add(n) : (i.addEvents(e), i.on(e, n))), i
        },
        off: function (e, t) {
            if (!e && !t)return this.clearListeners(), this;
            var n = this, r = n._getCallbacks(e);
            return r && (t ? r.remove(t) : r.empty()), n
        },
        publish: function (e, n) {
            var r = this, i = r._bubblesEvents;
            if (n.bubbles) t.Array.indexOf(e, i) === -1 && i.push(e); else {
                var s = t.Array.indexOf(e, i);
                s !== -1 && i.splice(s, 1)
            }
        }
    }), i
}), define("bui/ua", function () {
    function e(e) {
        var t = 0;
        return parseFloat(e.replace(/\./g, function () {
            return t++ === 0 ? "." : ""
        }))
    }

    function t(e) {
        e = e.toLowerCase();
        var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
            n = {browser: t[1] || "", version: t[2] || "0"}, r = {};
        return n.browser && (r[n.browser] = !0, r.version = n.version), r.chrome ? r.webkit = !0 : r.webkit && (r.safari = !0), r
    }

    var n = $.UA || function () {
            var n = $.browser || t(navigator.userAgent), r = e(n.version),
                i = {ie: n.msie && r, webkit: n.webkit && r, opera: n.opera && r, mozilla: n.mozilla && r};
            return i
        }();
    return n
}), define("bui/json", ["bui/ua"], function (e) {
    function i(e) {
        return e < 10 ? "0" + e : e
    }

    function c(e) {
        return o.lastIndex = 0, o.test(e) ? '"' + e.replace(o, function (e) {
                var t = f[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
    }

    function h(e, t) {
        var n, r, i, s, o = u, f, p = t[e];
        p && typeof p == "object" && typeof p.toJSON == "function" && (p = p.toJSON(e)), typeof l == "function" && (p = l.call(t, e, p));
        switch (typeof p) {
            case"string":
                return c(p);
            case"number":
                return isFinite(p) ? String(p) : "null";
            case"boolean":
            case"null":
                return String(p);
            case"object":
                if (!p)return "null";
                u += a, f = [];
                if (Object.prototype.toString.apply(p) === "[object Array]") {
                    s = p.length;
                    for (n = 0; n < s; n += 1)f[n] = h(n, p) || "null";
                    return i = f.length === 0 ? "[]" : u ? "[\n" + u + f.join(",\n" + u) + "\n" + o + "]" : "[" + f.join(",") + "]", u = o, i
                }
                if (l && typeof l == "object") {
                    s = l.length;
                    for (n = 0; n < s; n += 1)r = l[n], typeof r == "string" && (i = h(r, p), i && f.push(c(r) + (u ? ": " : ":") + i))
                } else for (r in p)Object.hasOwnProperty.call(p, r) && (i = h(r, p), i && f.push(c(r) + (u ? ": " : ":") + i));
                return i = f.length === 0 ? "{}" : u ? "{\n" + u + f.join(",\n" + u) + "\n" + o + "}" : "{" + f.join(",") + "}", u = o, i
        }
    }

    function p(e) {
        try {
            return (new Function("return " + e + ";"))()
        } catch (t) {
            throw"Json parse error!"
        }
    }

    var t = window, n = e("bui/ua"), r = t.JSON;
    if (!r || n.ie < 9) r = t.JSON = {};
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + i(this.getUTCMonth() + 1) + "-" + i(this.getUTCDate()) + "T" + i(this.getUTCHours()) + ":" + i(this.getUTCMinutes()) + ":" + i(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
        return this.valueOf()
    });
    var s = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        o = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        u, a, f = {"\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, l;
    typeof r.stringify != "function" && (r.stringify = function (e, t, n) {
        var r;
        u = "", a = "";
        if (typeof n == "number")for (r = 0; r < n; r += 1)a += " "; else typeof n == "string" && (a = n);
        l = t;
        if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number")return h("", {"": e});
        throw new Error("JSON.stringify")
    });
    var r = {parse: $.parseJSON, looseParse: p, stringify: r.stringify};
    return r
}), define("bui/keycode", function () {
    var e = {
        BACKSPACE: 8,
        TAB: 9,
        NUM_CENTER: 12,
        ENTER: 13,
        RETURN: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PRINT_SCREEN: 44,
        INSERT: 45,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        CONTEXT_MENU: 93,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123
    };
    return e
}), define("bui/date", function () {
    function t(e, n) {
        if (e instanceof Date)return e;
        if (typeof n == "undefined" || n == null || n == "") {
            var r = new Array("y-m-d", "yyyy-mm-dd", "yyyy-mm-dd HH:MM:ss", "H:M:s");
            for (var i = 0; i < r.length; i++) {
                var s = t(e, r[i]);
                if (s != null)return s
            }
            return null
        }
        e += "";
        var o = 0, u = 0, a = "", f = "", l, c, h = new Date, p = h.getYear(), d = h.getMonth() + 1, v = 1, m = 0,
            g = 0, y = 0;
        this.isInteger = function (e) {
            return /^\d*$/.test(e)
        }, this.getInt = function (e, t, n, r) {
            for (var i = r; i >= n; i--) {
                var s = e.substring(t, t + i);
                if (s.length < n)return null;
                if (this.isInteger(s))return s
            }
            return null
        };
        while (u < n.length) {
            a = n.charAt(u), f = "";
            while (n.charAt(u) == a && u < n.length)f += n.charAt(u++);
            if (f == "yyyy" || f == "yy" || f == "y") {
                f == "yyyy" && (l = 4, c = 4), f == "yy" && (l = 2, c = 2), f == "y" && (l = 2, c = 4), p = this.getInt(e, o, l, c);
                if (p == null)return null;
                o += p.length, p.length == 2 && (p = p > 70 ? 1900 + (p - 0) : 2e3 + (p - 0))
            } else if (f == "mm" || f == "m") {
                d = this.getInt(e, o, f.length, 2);
                if (d == null || d < 1 || d > 12)return null;
                o += d.length
            } else if (f == "dd" || f == "d") {
                v = this.getInt(e, o, f.length, 2);
                if (v == null || v < 1 || v > 31)return null;
                o += v.length
            } else if (f == "hh" || f == "h") {
                m = this.getInt(e, o, f.length, 2);
                if (m == null || m < 1 || m > 12)return null;
                o += m.length
            } else if (f == "HH" || f == "H") {
                m = this.getInt(e, o, f.length, 2);
                if (m == null || m < 0 || m > 23)return null;
                o += m.length
            } else if (f == "MM" || f == "M") {
                g = this.getInt(e, o, f.length, 2);
                if (g == null || g < 0 || g > 59)return null;
                o += g.length
            } else if (f == "ss" || f == "s") {
                y = this.getInt(e, o, f.length, 2);
                if (y == null || y < 0 || y > 59)return null;
                o += y.length
            } else {
                if (e.substring(o, o + f.length) != f)return null;
                o += f.length
            }
        }
        if (o != e.length)return null;
        if (d == 2)if (p % 4 == 0 && p % 100 != 0 || p % 400 == 0) {
            if (v > 29)return null
        } else if (v > 28)return null;
        if (d == 4 || d == 6 || d == 9 || d == 11)if (v > 30)return null;
        return new Date(p, d - 1, v, m, g, y)
    }

    function n(e, t, n) {
        var r = new Date(n);
        isNaN(r) && (r = new Date), t = parseInt(t, 10);
        switch (e) {
            case"s":
                r = new Date(r.getTime() + 1e3 * t);
                break;
            case"n":
                r = new Date(r.getTime() + 6e4 * t);
                break;
            case"h":
                r = new Date(r.getTime() + 36e5 * t);
                break;
            case"d":
                r = new Date(r.getTime() + 864e5 * t);
                break;
            case"w":
                r = new Date(r.getTime() + 6048e5 * t);
                break;
            case"m":
                r = new Date(r.getFullYear(), r.getMonth() + t, r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds());
                break;
            case"y":
                r = new Date(r.getFullYear() + t, r.getMonth(), r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds())
        }
        return r
    }

    var e = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/,
        r = function () {
            var e = /w{1}|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                t = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                n = /[^-+\dA-Z]/g, r = function (e, t) {
                    e = String(e), t = t || 2;
                    while (e.length < t)e = "0" + e;
                    return e
                }, i = {
                    "default": "ddd mmm dd yyyy HH:MM:ss",
                    shortDate: "m/d/yy",
                    longDate: "mmmm d, yyyy",
                    fullDate: "dddd, mmmm d, yyyy",
                    shortTime: "h:MM TT",
                    longTime: "h:MM:ss TT Z",
                    isoDate: "yyyy-mm-dd",
                    isoTime: "HH:MM:ss",
                    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                    isoUTCDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
                    localShortDate: "yy\u5e74mm\u6708dd\u65e5",
                    localShortDateTime: "yy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",
                    localLongDate: "yyyy\u5e74mm\u6708dd\u65e5",
                    localLongDateTime: "yyyy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",
                    localFullDate: "yyyy\u5e74mm\u6708dd\u65e5 w",
                    localFullDateTime: "yyyy\u5e74mm\u6708dd\u65e5 w hh:MM:ss TT"
                }, s = {
                    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
                    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                };
            return function (o, u, a) {
                arguments.length === 1 && Object.prototype.toString.call(o) === "[object String]" && !/\d/.test(o) && (u = o, o = undefined), o = o ? new Date(o) : new Date;
                if (isNaN(o))throw SyntaxError("invalid date");
                u = String(i[u] || u || i["default"]), u.slice(0, 4) === "UTC:" && (u = u.slice(4), a = !0);
                var f = a ? "getUTC" : "get", l = o[f + "Date"](), c = o[f + "Day"](), h = o[f + "Month"](),
                    p = o[f + "FullYear"](), d = o[f + "Hours"](), v = o[f + "Minutes"](), m = o[f + "Seconds"](),
                    g = o[f + "Milliseconds"](), y = a ? 0 : o.getTimezoneOffset(), b = {
                        d: l,
                        dd: r(l, undefined),
                        ddd: s.dayNames[c],
                        dddd: s.dayNames[c + 7],
                        w: s.dayNames[c + 14],
                        m: h + 1,
                        mm: r(h + 1, undefined),
                        mmm: s.monthNames[h],
                        mmmm: s.monthNames[h + 12],
                        yy: String(p).slice(2),
                        yyyy: p,
                        h: d % 12 || 12,
                        hh: r(d % 12 || 12, undefined),
                        H: d,
                        HH: r(d, undefined),
                        M: v,
                        MM: r(v, undefined),
                        s: m,
                        ss: r(m, undefined),
                        l: r(g, 3),
                        L: r(g > 99 ? Math.round(g / 10) : g, undefined),
                        t: d < 12 ? "a" : "p",
                        tt: d < 12 ? "am" : "pm",
                        T: d < 12 ? "A" : "P",
                        TT: d < 12 ? "AM" : "PM",
                        Z: a ? "UTC" : (String(o).match(t) || [""]).pop().replace(n, ""),
                        o: (y > 0 ? "-" : "+") + r(Math.floor(Math.abs(y) / 60) * 100 + Math.abs(y) % 60, 4),
                        S: ["th", "st", "nd", "rd"][l % 10 > 3 ? 0 : (l % 100 - l % 10 !== 10) * l % 10]
                    };
                return u.replace(e, function (e) {
                    return e in b ? b[e] : e.slice(1, e.length - 1)
                })
            }
        }(), i = {
            add: function (e, t, r) {
                return n(e, t, r)
            }, addHour: function (e, t) {
                return n("h", e, t)
            }, addMinute: function (e, t) {
                return n("n", e, t)
            }, addSecond: function (e, t) {
                return n("s", e, t)
            }, addDay: function (e, t) {
                return n("d", e, t)
            }, addWeek: function (e, t) {
                return n("w", e, t)
            }, addMonths: function (e, t) {
                return n("m", e, t)
            }, addYear: function (e, t) {
                return n("y", e, t)
            }, isDateEquals: function (e, t) {
                return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
            }, isEquals: function (e, t) {
                return e == t ? !0 : !e || !t ? !1 : !e.getTime || !t.getTime ? !1 : e.getTime() == t.getTime()
            }, isDateString: function (t) {
                return e.test(t)
            }, format: function (e, t, n) {
                return r(e, t, n)
            }, parse: function (e, n) {
                return BUI.isString(e) && (e = e.replace("/", "-")), t(e, n)
            }, today: function () {
                var e = new Date;
                return new Date(e.getFullYear(), e.getMonth(), e.getDate())
            }, getDate: function (e) {
                return new Date(e.getFullYear(), e.getMonth(), e.getDate())
            }
        };
    return i
}), define("bui/base", ["bui/observable"], function (e) {
    function r(e, t, n) {
        var r = e[t] || {};
        return n && (e[t] = r), r
    }

    function i(e, t) {
        return BUI.isString(t) ? e[t] : t
    }

    function s(e, t, n, r, i) {
        var s = n;
        return e.fire(t + BUI.ucfirst(n) + "Change", {attrName: s, prevVal: r, newVal: i})
    }

    function o(e, t, n, r, i) {
        r = r || {};
        var o, u, a;
        return a = e.get(t), !$.isPlainObject(n) && !BUI.isArray(n) && a === n ? undefined : !r.silent && !1 === s(e, "before", t, a, n) ? !1 : (o = e._set(t, n, r), o === !1 ? o : (r.silent || (n = e.__attrVals[t], s(e, "after", t, a, n)), e))
    }

    function u(e) {
        if (e._attrs || e == a)return;
        var t = e.superclass.constructor;
        t && !t._attrs && u(t), e._attrs = {}, BUI.mixAttrs(e._attrs, t._attrs), BUI.mixAttrs(e._attrs, e.ATTRS)
    }

    var t = {}, n = e("bui/observable"), a = function (e) {
        var t = this, r = t.constructor, i = [];
        this.__attrs = {}, this.__attrVals = {}, n.apply(this, arguments);
        while (r)i.push(r), r.extensions && (BUI.mixin(r, r.extensions), delete r.extensions), r = r.superclass ? r.superclass.constructor : null;
        var s = t.constructor;
        u(s), t._initStaticAttrs(s._attrs), t._initAttrs(e)
    };
    return a.INVALID = t, BUI.extend(a, n), BUI.augment(a, {
        _initStaticAttrs: function (e) {
            var t = this, n;
            n = t.__attrs = {};
            for (var r in e)if (e.hasOwnProperty(r)) {
                var i = e[r];
                i.shared === !1 || i.valueFn ? (n[r] = {}, BUI.mixAttr(n[r], e[r])) : n[r] = e[r]
            }
        }, addAttr: function (e, t, n) {
            var r = this, i = r.__attrs, s = i[e];
            s || (s = i[e] = {});
            for (var o in t)t.hasOwnProperty(o) && (o == "value" ? BUI.isObject(t[o]) ? (s[o] = s[o] || {}, BUI.mix(s[o], t[o])) : BUI.isArray(t[o]) ? (s[o] = s[o] || [], BUI.mix(s[o], t[o])) : s[o] = t[o] : s[o] = t[o]);
            return r
        }, addAttrs: function (e, t, n) {
            var r = this;
            return e ? (typeof t == "boolean" && (n = t, t = null), BUI.each(e, function (e, t) {
                r.addAttr(t, e, n)
            }), t && r.set(t), r) : r
        }, hasAttr: function (e) {
            return e && this.__attrs.hasOwnProperty(e)
        }, getAttrs: function () {
            return this.__attrs
        }, getAttrVals: function () {
            return this.__attrVals
        }, get: function (e) {
            var t = this, n = t.__attrVals, s, o, u;
            return s = r(t.__attrs, e), o = s.getter, u = e in n ? n[e] : t._getDefAttrVal(e), o && (o = i(t, o)) && (u = o.call(t, u, e)), u
        }, clearAttrVals: function () {
            this.__attrVals = {}
        }, removeAttr: function (e) {
            var t = this;
            return t.hasAttr(e) && (delete t.__attrs[e], delete t.__attrVals[e]), t
        }, set: function (e, t, n) {
            var r = this;
            if ($.isPlainObject(e)) {
                n = t;
                var i = Object(e), s = [];
                for (e in i)i.hasOwnProperty(e) && o(r, e, i[e], n);
                return r
            }
            return o(r, e, t, n)
        }, setInternal: function (e, t, n) {
            return this._set(e, t, n)
        }, _getDefAttrVal: function (e) {
            var t = this, n = t.__attrs, s = r(n, e), o = s.valueFn, u;
            return o && (o = i(t, o)) && (u = o.call(t), u !== undefined && (s.value = u), delete s.valueFn, n[e] = s), s.value
        }, _set: function (e, n, s) {
            var o = this, u, a = r(o.__attrs, e, !0), f = a.setter;
            return f && (f = i(o, f)) && (u = f.call(o, n, e)), u === t ? !1 : (u !== undefined && (n = u), o.__attrVals[e] = n, o)
        }, _initAttrs: function (e) {
            var t = this;
            if (e)for (var n in e)e.hasOwnProperty(n) && t._set(n, e[n])
        }
    }), a
}), define("bui/component", ["bui/component/manage", "bui/component/uibase", "bui/component/view", "bui/component/controller"], function (e) {
    function n(e, n) {
        var r, i;
        return e && (i = e.xclass) && (n && !e.prefixCls && (e.prefixCls = n.get("prefixCls")), r = t.Manager.getConstructorByXClass(i), r || BUI.error("can not find class by xclass desc : " + i), e = new r(e)), e
    }

    var t = {};
    return BUI.mix(t, {
        Manager: e("bui/component/manage"),
        UIBase: e("bui/component/uibase"),
        View: e("bui/component/view"),
        Controller: e("bui/component/controller")
    }), t.create = n, t
}), define("bui/component/manage", function (e) {
    function n(e) {
        var n = e.split(/\s+/), r = -1, i, s = null;
        for (var o = 0; o < n.length; o++) {
            var u = t[n[o]];
            u && (i = u.priority) > r && (r = i, s = u.constructor)
        }
        return s
    }

    function r(e) {
        for (var n in t) {
            var r = t[n];
            if (r.constructor == e)return n
        }
        return 0
    }

    function i(e, n) {
        BUI.isFunction(n) ? t[e] = {constructor: n, priority: 0} : (n.priority = n.priority || 0, t[e] = n)
    }

    function s(e) {
        var t = $.trim(e).split(/\s+/);
        for (var n = 0; n < t.length; n++)t[n] && (t[n] = this.get("prefixCls") + t[n]);
        return t.join(" ")
    }

    var t = {}, o = {}, u = {
        __instances: o, addComponent: function (e, t) {
            o[e] = t
        }, removeComponent: function (e) {
            delete o[e]
        }, eachComponent: function (e) {
            BUI.each(o, e)
        }, getComponent: function (e) {
            return o[e]
        }, getCssClassWithPrefix: s, getXClassByConstructor: r, getConstructorByXClass: n, setConstructorByXClass: i
    };
    return u
}), function () {
    var e = "bui/component/uibase/";
    define("bui/component/uibase", [e + "base", e + "align", e + "autoshow", e + "autohide", e + "close", e + "collapsable", e + "drag", e + "keynav", e + "list", e + "listitem", e + "mask", e + "position", e + "selection", e + "stdmod", e + "decorate", e + "tpl", e + "childcfg", e + "bindable", e + "depends"], function (t) {
        var n = t(e + "base");
        return BUI.mix(n, {
            Align: t(e + "align"),
            AutoShow: t(e + "autoshow"),
            AutoHide: t(e + "autohide"),
            Close: t(e + "close"),
            Collapsable: t(e + "collapsable"),
            Drag: t(e + "drag"),
            KeyNav: t(e + "keynav"),
            List: t(e + "list"),
            ListItem: t(e + "listitem"),
            Mask: t(e + "mask"),
            Position: t(e + "position"),
            Selection: t(e + "selection"),
            StdMod: t(e + "stdmod"),
            Decorate: t(e + "decorate"),
            Tpl: t(e + "tpl"),
            ChildCfg: t(e + "childcfg"),
            Bindable: t(e + "bindable"),
            Depends: t(e + "depends")
        }), BUI.mix(n, {
            CloseView: n.Close.View,
            CollapsableView: n.Collapsable.View,
            ChildList: n.List.ChildList,
            ListItemView: n.ListItem.View,
            MaskView: n.Mask.View,
            PositionView: n.Position.View,
            StdModView: n.StdMod.View,
            TplView: n.Tpl.View
        }), n
    })
}(), define("bui/component/uibase/base", ["bui/component/manage"], function (e) {
    function u(e, t) {
        a(e, "initializer", "constructor")
    }

    function a(e, t, n) {
        var r = e.constructor, i = [], s, o, u, a;
        while (r) {
            a = [];
            if (u = r.mixins)for (var f = 0; f < u.length; f++)s = u[f], s && (n != "constructor" && (s.prototype.hasOwnProperty(n) ? s = s.prototype[n] : s = null), s && a.push(s));
            r.prototype.hasOwnProperty(t) && (o = r.prototype[t]) && a.push(o), a.length && i.push.apply(i, a.reverse()), r = r.superclass && r.superclass.constructor
        }
        for (f = i.length - 1; f >= 0; f--)i[f] && i[f].call(e)
    }

    function f(e) {
        var t = e.constructor, n, r, i;
        while (t) {
            t.prototype.hasOwnProperty("destructor") && t.prototype.destructor.apply(e);
            if (n = t.mixins)for (i = n.length - 1; i >= 0; i--)r = n[i] && n[i].prototype.__destructor, r && r.apply(e);
            t = t.superclass && t.superclass.constructor
        }
    }

    function l(e) {
        if (!e)return;
        BUI.each(e, function (t, n) {
            BUI.isFunction(t) && (e[n] = new t)
        })
    }

    function c(e, t, n) {
        if (!t)return;
        BUI.each(t, function (t, r) {
            t[n] && t[n](e)
        })
    }

    function h(e) {
    }

    function p(e) {
        var t, r, s = e.getAttrs();
        for (var o in s)if (s.hasOwnProperty(o)) {
            var u = n + i(o);
            (r = e[u]) && s[o].sync !== !1 && (t = e.get(o)) !== undefined && r.call(e, t)
        }
    }

    function v(e) {
        var t = [];
        while (e.base)t.push(e), e = e.base;
        for (var n = t.length - 1; n >= 0; n--) {
            var r = t[n];
            BUI.mix(r.prototype, r.px), BUI.mix(r, r.sx), r.base = null, r.px = null, r.sx = null
        }
    }

    var t = e("bui/component/manage"), n = "_uiSet", r = "ATTRS", i = BUI.ucfirst, s = $.noop, o = e("bui/base"),
        d = function (e) {
            var t = this, n;
            o.apply(t, arguments), t.setInternal("userConfig", e)
                , u(t, e);
            var r, i, s = t.get("plugins");
            l(s);
            var a = t.get("xclass");
            a && (t.__xclass = a), c(t, s, "initializer"), e && e.autoRender && t.render()
        };
    return d.ATTRS = {
        userConfig: {},
        autoRender: {value: !1},
        listeners: {value: {}},
        plugins: {},
        rendered: {value: !1},
        xclass: {
            valueFn: function () {
                return t.getXClassByConstructor(this.constructor)
            }
        }
    }, BUI.extend(d, o), BUI.augment(d, {
        create: function () {
            var e = this;
            return e.get("created") || (e.fire("beforeCreateDom"), a(e, "createDom", "__createDom"), e._set("created", !0), e.fire("afterCreateDom"), c(e, e.get("plugins"), "createDom")), e
        }, render: function () {
            var e = this;
            if (!e.get("rendered")) {
                var t = e.get("plugins");
                e.create(undefined), e.set("created", !0), e.fire("beforeRenderUI"), a(e, "renderUI", "__renderUI"), e.fire("afterRenderUI"), c(e, t, "renderUI"), e.fire("beforeBindUI"), h(e), a(e, "bindUI", "__bindUI"), e.set("binded", !0), e.fire("afterBindUI"), c(e, t, "bindUI"), e.fire("beforeSyncUI"), p(e), a(e, "syncUI", "__syncUI"), e.fire("afterSyncUI"), c(e, t, "syncUI"), e._set("rendered", !0)
            }
            return e
        }, createDom: s, renderUI: s, bindUI: s, syncUI: s, destroy: function () {
            var e = this;
            return e.destroyed ? e : (e.fire("beforeDestroy"), c(e, e.get("plugins"), "destructor"), f(e), e.fire("afterDestroy"), e.off(), e.clearAttrVals(), e.destroyed = !0, e)
        }
    }), BUI.mix(d, {
        define: function (e, t, n, r) {
            function i() {
                var e = this.constructor;
                e.base && v(e), d.apply(this, arguments)
            }

            return $.isPlainObject(t) && (r = n, n = t, t = []), BUI.extend(i, e), i.base = e, i.px = n, i.sx = r, t.length && (i.extensions = t), i
        }, extend: function m(e, n, r) {
            var i = $.makeArray(arguments), s, o = i[i.length - 1];
            i.unshift(this), o.xclass && (i.pop(), i.push(o.xclass)), s = d.define.apply(d, i);
            if (o.xclass) {
                var u = o.priority || (this.priority ? this.priority + 1 : 1);
                t.setConstructorByXClass(o.xclass, {
                    constructor: s,
                    priority: u
                }), s.__xclass = o.xclass, s.priority = u, s.toString = function () {
                    return o.xclass
                }
            }
            return s.extend = m, s
        }
    }), d
}), define("bui/component/uibase/align", ["bui/ua"], function (e) {
    function i(e) {
        var t = e.ownerDocument, n = t.body, r, i = $(e).css("position"), s = i == "fixed" || i == "absolute";
        if (!s)return e.nodeName.toLowerCase() == "html" ? null : e.parentNode;
        for (r = e.parentNode; r && r != n; r = r.parentNode) {
            i = $(r).css("position");
            if (i != "static")return r
        }
        return null
    }

    function s(e) {
        var n = {left: 0, right: Infinity, top: 0, bottom: Infinity}, s, o, u, a, f = e.ownerDocument, l = f.body,
            c = f.documentElement;
        for (s = e; s = i(s);)if ((!t.ie || s.clientWidth != 0) && s != l && s != c && $(s).css("overflow") != "visible") {
            var h = $(s).offset();
            h.left += s.clientLeft, h.top += s.clientTop, n.top = Math.max(n.top, h.top), n.right = Math.min(n.right, h.left + s.clientWidth), n.bottom = Math.min(n.bottom, h.top + s.clientHeight), n.left = Math.max(n.left, h.left)
        }
        return o = $(r).scrollLeft(), u = $(r).scrollTop(), n.left = Math.max(n.left, o), n.top = Math.max(n.top, u), a = {
            width: BUI.viewportWidth(),
            height: BUI.viewportHeight()
        }, n.right = Math.min(n.right, o + a.width), n.bottom = Math.min(n.bottom, u + a.height), n.top >= 0 && n.left >= 0 && n.bottom > n.top && n.right > n.left ? n : null
    }

    function o(e, t, n, r) {
        var i, s, o, u;
        return i = {
            left: e.left,
            top: e.top
        }, o = d(t, n[0]), u = d(e, n[1]), s = [u.left - o.left, u.top - o.top], {
            left: i.left - s[0] + +r[0],
            top: i.top - s[1] + +r[1]
        }
    }

    function u(e, t, n) {
        return e.left < n.left || e.left + t.width > n.right
    }

    function a(e, t, n) {
        return e.top < n.top || e.top + t.height > n.bottom
    }

    function f(e, t, n, r) {
        var i = BUI.cloneObject(e), s = {width: t.width, height: t.height};
        return r.adjustX && i.left < n.left && (i.left = n.left), r.resizeWidth && i.left >= n.left && i.left + s.width > n.right && (s.width -= i.left + s.width - n.right), r.adjustX && i.left + s.width > n.right && (i.left = Math.max(n.right - s.width, n.left)), r.adjustY && i.top < n.top && (i.top = n.top), r.resizeHeight && i.top >= n.top && i.top + s.height > n.bottom && (s.height -= i.top + s.height - n.bottom), r.adjustY && i.top + s.height > n.bottom && (i.top = Math.max(n.bottom - s.height, n.top)), BUI.mix(i, s)
    }

    function l(e, t, n) {
        var r = [];
        return $.each(e, function (e, i) {
            r.push(i.replace(t, function (e) {
                return n[e]
            }))
        }), r
    }

    function c(e, t) {
        return e[t] = -e[t], e
    }

    function h() {
    }

    function p(e) {
        var t, n, r;
        return e.length && !$.isWindow(e[0]) ? (t = e.offset(), n = e.outerWidth(), r = e.outerHeight()) : (t = {
            left: BUI.scrollLeft(),
            top: BUI.scrollTop()
        }, n = BUI.viewportWidth(), r = BUI.viewportHeight()), t.width = n, t.height = r, t
    }

    function d(e, t) {
        var n = t.charAt(0), r = t.charAt(1), i = e.width, s = e.height, o, u;
        return o = e.left, u = e.top, n === "c" ? u += s / 2 : n === "b" && (u += s), r === "c" ? o += i / 2 : r === "r" && (o += i), {
            left: o,
            top: u
        }
    }

    function v(e) {
        var t = e.attr("class"), r = new RegExp("s?" + n + "[a-z]{2}-[a-z]{2}", "ig"), i = r.exec(t);
        i && e.removeClass(i.join(" "))
    }

    var t = e("bui/ua"), n = "x-align-", r = window;
    return h.__getOffsetParent = i, h.__getVisibleRectForElement = s, h.ATTRS = {
        align: {
            shared: !1,
            value: {}
        }
    }, h.prototype = {
        _uiSetAlign: function (e, t) {
            var r = "", i, s;
            e && e.points && (this.align(e.node, e.points, e.offset, e.overflow), this.set("cachePosition", null), i = this.get("el"), v(i), s = e.points.join("-"), r = n + s, i.addClass(r))
        }, __bindUI: function () {
            var e = this, t = BUI.wrapBehavior(e, "handleWindowResize");
            e.on("show", function () {
                $(window).on("resize", t)
            }), e.on("hide", function () {
                $(window).off("resize", t)
            })
        }, handleWindowResize: function () {
            var e = this, t = e.get("align");
            e.set("align", t)
        }, align: function (e, t, n, i) {
            e = $(e || r), n = n && [].concat(n) || [0, 0], i = i || {};
            var h = this, d = h.get("el"), v = 0, m = s(d[0]), g = p(d), y = p(e), b = o(g, y, t, n),
                w = BUI.merge(g, b);
            if (m && (i.adjustX || i.adjustY)) {
                u(b, g, m) && (v = 1, t = l(t, /[lr]/ig, {
                    l: "r",
                    r: "l"
                }), n = c(n, 0)), a(b, g, m) && (v = 1, t = l(t, /[tb]/ig, {
                    t: "b",
                    b: "t"
                }), n = c(n, 1)), v && (b = o(g, y, t, n), BUI.mix(w, b));
                var E = {};
                E.adjustX = i.adjustX && u(b, g, m), E.adjustY = i.adjustY && a(b, g, m);
                if (E.adjustX || E.adjustY) w = f(b, g, m, E)
            }
            return w.left != g.left && (h.setInternal("x", null), h.get("view").setInternal("x", null), h.set("x", w.left)), w.top != g.top && (h.setInternal("y", null), h.get("view").setInternal("y", null), h.set("y", w.top)), w.width != g.width && d.width(d.width() + w.width - g.width), w.height != g.height && d.height(d.height() + w.height - g.height), h
        }, center: function (e) {
            var t = this;
            return t.set("align", {node: e, points: ["cc", "cc"], offset: [0, 0]}), t
        }
    }, h
}), define("bui/component/uibase/autoshow", function () {
    function e() {
    }

    return e.ATTRS = {
        trigger: {},
        delegateTigger: {
            getter: function () {
                this.get("delegateTrigger")
            }, setter: function (e) {
                this.set("delegateTrigger", e)
            }
        },
        delegateTrigger: {value: !1},
        autoAlign: {value: !0},
        autoFocused: {value: !0},
        triggerActiveCls: {},
        curTrigger: {},
        triggerCallback: {},
        triggerEvent: {value: "click"},
        triggerHideEvent: {},
        events: {value: {triggerchange: !1}}
    }, e.prototype = {
        __createDom: function () {
            this._setTrigger()
        }, __bindUI: function () {
            var e = this, t = e.get("triggerActiveCls");
            t && e.on("hide", function () {
                var n = e.get("curTrigger");
                n && n.removeClass(t)
            })
        }, _setTrigger: function () {
            function a(t) {
                if (e.get("disabled"))return;
                var n = e.get("curTrigger"), s = o ? $(t.currentTarget) : $(this), u = e.get("align");
                if (!n || n[0] != s[0]) n && n.removeClass(i), e.set("curTrigger", s), e.fire("triggerchange", {
                    prevTrigger: n,
                    curTrigger: s
                });
                s.addClass(i), e.get("autoAlign") && (u.node = s), e.set("align", u), e.show(), r && r(t)
            }

            function f(t) {
                var n = t.toElement || t.relatedTarget;
                (!n || !e.containsElement(n)) && e.hide()
            }

            var e = this, t = e.get("triggerEvent"), n = e.get("triggerHideEvent"), r = e.get("triggerCallback"),
                i = e.get("triggerActiveCls") || "", s = e.get("trigger"), o = e.get("delegateTrigger"), u = $(s);
            t && (o && BUI.isString(s) ? $(document).delegate(s, t, a) : u.on(t, a)), n && (o && BUI.isString(s) ? $(document).delegate(s, n, f) : u.on(n, f))
        }, __renderUI: function () {
            var e = this, t = e.get("align");
            t && !t.node && (t.node = e.get("render") || e.get("trigger"))
        }
    }, e
}), define("bui/component/uibase/autohide", function () {
    function n(e, t) {
        var n = e.get("hideExceptNode");
        return n && n.length ? $.contains(n[0], t) : !1
    }

    function r() {
    }

    var e = BUI.wrapBehavior, t = BUI.getWrapBehavior;
    return r.ATTRS = {
        autoHideType: {value: "click"},
        autoHide: {value: !1},
        hideExceptNode: {},
        events: {value: {autohide: !1}}
    }, r.prototype = {
        __bindUI: function () {
            var e = this;
            e.on("afterVisibleChange", function (t) {
                var n = t.newVal;
                e.get("autoHide") && (n ? e._bindHideEvent() : e._clearHideEvent())
            })
        }, handleMoveOuter: function (e) {
            var t = this, r = e.toElement || e.relatedTarget;
            !t.containsElement(r) && !n(t, r) && t.fire("autohide") !== !1 && t.hide()
        }, handleDocumentClick: function (e) {
            var t = this, r = e.target;
            !t.containsElement(r) && !n(t, r) && t.fire("autohide") !== !1 && t.hide()
        }, _bindHideEvent: function () {
            var t = this, n = t.get("curTrigger"), r = t.get("autoHideType");
            r === "click" ? $(document).on("mousedown", e(t, "handleDocumentClick")) : (t.get("el").on("mouseleave", e(t, "handleMoveOuter")), n && $(n).on("mouseleave", e(t, "handleMoveOuter")))
        }, _clearHideEvent: function () {
            var e = this, n = e.get("curTrigger"), r = e.get("autoHideType");
            r === "click" ? $(document).off("mousedown", t(e, "handleDocumentClick")) : (e.get("el").off("mouseleave", t(e, "handleMoveOuter")), n && $(n).off("mouseleave", t(e, "handleMoveOuter")))
        }
    }, r
}), define("bui/component/uibase/close", function () {
    function t(e) {
        return $(e.get("closeTpl"))
    }

    function n() {
    }

    function r() {
    }

    var e = BUI.prefix + "ext-";
    n.ATTRS = {
        closeTpl: {value: '<a tabindex="0" href=\'javascript:void("\u5173\u95ed")\' role="button" class="' + e + "close" + '">' + '<span class="' + e + "close-x" + '">\u5173\u95ed<' + "/span>" + "<" + "/a>"},
        closeable: {value: !0},
        closeBtn: {}
    }, n.prototype = {
        _uiSetCloseable: function (e) {
            var n = this, r = n.get("closeBtn");
            e ? (r || n.setInternal("closeBtn", r = t(n)), r.appendTo(n.get("el"), undefined)) : r && r.remove()
        }
    };
    var i = "hide";
    r.ATTRS = {closeTpl: {view: !0}, closeable: {view: 1}, closeBtn: {view: 1}, closeAction: {value: i}};
    var s = {hide: i, destroy: "destroy", remove: "remove"};
    return r.prototype = {
        _uiSetCloseable: function (e) {
            var t = this;
            e && !t.__bindCloseEvent && (t.__bindCloseEvent = 1, t.get("closeBtn").on("click", function (e) {
                t.fire("closeclick", {domTarget: e.target}) !== !1 && t.close(), e.preventDefault()
            }))
        }, __destructor: function () {
            var e = this.get("closeBtn");
            e && e.detach()
        }, close: function () {
            var e = this, t = s[e.get("closeAction") || i];
            e.fire("closing", {action: t}) !== !1 && (e.fire("beforeclosed", {action: t}), t == "remove" ? e[t](!0) : e[t](), e.fire("closed", {action: t}))
        }
    }, r.View = n, r
}), define("bui/component/uibase/drag", function () {
    function r() {
        var e = $(n).css("opacity", 0).prependTo("body");
        return e
    }

    var e = BUI.guid("drag"), t = function () {
    };
    t.ATTRS = {
        dragNode: {}, draging: {
            setter: function (e) {
                if (e === !0)return {}
            }, value: null
        }, constraint: {}, dragBackEl: {
            getter: function () {
                return $("#" + e)
            }
        }
    };
    var n = '<div id="' + e + '" style="background-color: red; position: fixed; left: 0px; width: 100%; height: 100%; top: 0px; cursor: move; z-index: 999999; display: none; "></div>';
    return t.prototype = {
        __bindUI: function () {
            function r(n) {
                var r = e.get("draging");
                r && (n.preventDefault(), e._dragMoveTo(n.pageX, n.pageY, r, t))
            }

            function i(t) {
                if (t.which == 1) {
                    e.set("draging", !1);
                    var n = e.get("dragBackEl");
                    n && n.hide(), o()
                }
            }

            function s() {
                $(document).on("mousemove", r), $(document).on("mouseup", i)
            }

            function o() {
                $(document).off("mousemove", r), $(document).off("mouseup", i)
            }

            var e = this, t = e.get("constraint"), n = e.get("dragNode");
            if (!n)return;
            n.on("mousedown", function (t) {
                t.which == 1 && (t.preventDefault(), e.set("draging", {
                    elX: e.get("x"),
                    elY: e.get("y"),
                    startX: t.pageX,
                    startY: t.pageY
                }), s())
            })
        }, _dragMoveTo: function (e, t, n, i) {
            var s = this, o = s.get("dragBackEl"), n = n || s.get("draging"), u = n.startX - e, a = n.startY - t;
            o.length || (o = r()), o.css({
                cursor: "move",
                display: "block"
            }), s.set("xy", [s._getConstrainX(n.elX - u, i), s._getConstrainY(n.elY - a, i)])
        }, _getConstrainX: function (e, t) {
            var n = this, r = n.get("el").outerWidth(), i = e + r, s = n.get("x");
            if (t) {
                var o = t.offset();
                return o.left >= e ? o.left : o.left + t.width() < i ? o.left + t.width() - r : e
            }
            return BUI.isInHorizontalView(e) && BUI.isInHorizontalView(i) ? e : s
        }, _getConstrainY: function (e, t) {
            var n = this, r = n.get("el").outerHeight(), i = e + r, s = n.get("y");
            if (t) {
                var o = t.offset();
                return o.top > e ? o.top : o.top + t.height() < i ? o.top + t.height() - r : e
            }
            return BUI.isInVerticalView(e) && BUI.isInVerticalView(i) ? e : s
        }
    }, t
}), define("bui/component/uibase/keynav", ["bui/keycode"], function (e) {
    var t = e("bui/keycode"), n = BUI.wrapBehavior, r = BUI.getWrapBehavior, i = function () {
    };
    return i.ATTRS = {
        allowKeyNav: {value: !0},
        navEvent: {value: "keydown"},
        ignoreInputFields: {value: !0}
    }, i.prototype = {
        __bindUI: function () {
        }, _uiSetAllowKeyNav: function (e) {
            var t = this, i = t.get("navEvent"), s = t.get("el");
            e ? s.on(i, n(t, "_handleKeyDown")) : s.off(i, r(t, "_handleKeyDown"))
        }, _handleKeyDown: function (e) {
            var n = this, r = n.get("ignoreInputFields"), i = e.which;
            if (r && $(e.target).is("input,select,textarea"))return;
            switch (i) {
                case t.UP:
                    e.preventDefault(), n.handleNavUp(e);
                    break;
                case t.DOWN:
                    e.preventDefault(), n.handleNavDown(e);
                    break;
                case t.RIGHT:
                    e.preventDefault(), n.handleNavRight(e);
                    break;
                case t.LEFT:
                    e.preventDefault(), n.handleNavLeft(e);
                    break;
                case t.ENTER:
                    n.handleNavEnter(e);
                    break;
                case t.ESC:
                    n.handleNavEsc(e);
                    break;
                case t.TAB:
                    n.handleNavTab(e);
                    break;
                default:
            }
        }, handleNavUp: function (e) {
        }, handleNavDown: function (e) {
        }, handleNavLeft: function (e) {
        }, handleNavRight: function (e) {
        }, handleNavEnter: function (e) {
        }, handleNavEsc: function (e) {
        }, handleNavTab: function (e) {
        }
    }, i
}), define("bui/component/uibase/mask", function (e) {
    function i(e) {
        return e.get("prefixCls") + "ext-mask"
    }

    function s() {
        return r ? BUI.docWidth() + "px" : "100%"
    }

    function o() {
        return r ? BUI.docHeight() + "px" : "100%"
    }

    function u(e) {
        var t = $('<div  style="width:' + s() + ";" + "left:0;" + "top:0;" + "height:" + o() + ";" + "position:" + (r ? "absolute" : "fixed") + ';"' + ' class="' + e + '">' + (r ? '<iframe style="position:absolute;left:0;top:0;background:white;width: expression(this.parentNode.offsetWidth);height: expression(this.parentNode.offsetHeight);filter:alpha(opacity=0);z-index:-1;"></iframe>' : "") + "</div>").prependTo("body");
        return t.on("mousedown", function (e) {
            e.preventDefault()
        }), t
    }

    function a() {
    }

    function f() {
    }

    var t = e("bui/ua"), n = {}, r = t.ie == 6;
    return a.ATTRS = {maskShared: {value: !0}}, a.prototype = {
        _maskExtShow: function () {
            var e = this, t, r = i(e), s = n[r], o = e.get("maskShared"), a = e.get("maskNode");
            a || (o ? s ? a = s.node : (a = u(r), s = n[r] = {
                num: 0,
                node: a
            }) : a = u(r), e.setInternal("maskNode", a)), (t = e.get("zIndex")) && a.css("z-index", t - 1), o && s.num++, (!o || s.num == 1) && a.show(), $("body").addClass("x-masked-relative")
        }, _maskExtHide: function () {
            var e = this, t = i(e), r = n[t], s = e.get("maskShared"), o = e.get("maskNode");
            s && r ? (r.num = Math.max(r.num - 1, 0), r.num == 0 && o.hide()) : o && o.hide(), $("body").removeClass("x-masked-relative")
        }, __destructor: function () {
            var e = this, t = e.get("maskShared"), n = e.get("maskNode");
            e.get("maskNode") && (t ? e.get("visible") && e._maskExtHide() : n.remove())
        }
    }, f.ATTRS = {mask: {value: !1}, maskNode: {view: 1}, maskShared: {view: 1}}, f.prototype = {
        __bindUI: function () {
            var e = this, t = e.get("view"), n = t._maskExtShow, r = t._maskExtHide;
            e.get("mask") && (e.on("show", function () {
                t._maskExtShow()
            }), e.on("hide", function () {
                t._maskExtHide()
            }))
        }
    }, f = f, f.View = a, f
}), define("bui/component/uibase/position", function () {
    function e() {
    }

    function t() {
    }

    return e.ATTRS = {
        x: {
            valueFn: function () {
                var e = this;
                return e.get("el") && e.get("el").offset().left
            }
        }, y: {
            valueFn: function () {
                var e = this;
                return e.get("el") && e.get("el").offset().top
            }
        }, zIndex: {}, visibleMode: {value: "visibility"}
    }, e.prototype = {
        __createDom: function () {
            this.get("el").addClass(BUI.prefix + "ext-position")
        }, _uiSetZIndex: function (e) {
            this.get("el").css("z-index", e)
        }, _uiSetX: function (e) {
            e != null && this.get("el").offset({left: e})
        }, _uiSetY: function (e) {
            e != null && this.get("el").offset({top: e})
        }, _uiSetLeft: function (e) {
            e != null && this.get("el").css({left: e})
        }, _uiSetTop: function (e) {
            e != null && this.get("el").css({top: e})
        }
    }, t.ATTRS = {
        x: {view: 1}, y: {view: 1}, left: {view: 1}, top: {view: 1}, xy: {
            setter: function (e) {
                var t = this, n = $.makeArray(e);
                return n.length && (n[0] && t.set("x", n[0]), n[1] && t.set("y", n[1])), e
            }, getter: function () {
                return [this.get("x"), this.get("y")]
            }
        }, zIndex: {view: 1}, visible: {view: !0, value: !0}
    }, t.prototype = {
        move: function (e, t) {
            var n = this;
            return BUI.isArray(e) && (t = e[1], e = e[0]), n.set("xy", [e, t]), n
        }, _uiSetX: function (e) {
            if (e != null) {
                var t = this, n = t.get("el");
                t.setInternal("left", n.position().left), e != -999 && this.set("cachePosition", null)
            }
        }, _uiSetY: function (e) {
            if (e != null) {
                var t = this, n = t.get("el");
                t.setInternal("top", n.position().top), e != -999 && this.set("cachePosition", null)
            }
        }, _uiSetLeft: function (e) {
            var t = this, n = t.get("el");
            e != null && t.setInternal("x", n.offset().left)
        }, _uiSetTop: function (e) {
            var t = this, n = t.get("el");
            e != null && t.setInternal("y", n.offset().top)
        }
    }, t.View = e, t
}), define("bui/component/uibase/listitem", function () {
    function e() {
    }

    function t() {
    }

    return e.ATTRS = {selected: {}}, e.prototype = {
        _uiSetSelected: function (e) {
            var t = this, n = t.getStatusCls("selected"), r = t.get("el");
            e ? r.addClass(n) : r.removeClass(n)
        }
    }, t.ATTRS = {selectable: {value: !0}, selected: {view: !0, sync: !1, value: !1}}, t.prototype = {}, t.View = e, t
}), define("bui/component/uibase/stdmod", function () {
    function t() {
    }

    function n(t, n) {
        var r = t.get("contentEl"), i = t.get(n);
        i || (i = $('<div class="' + e + n + '"' + " " + " >" + "</div>"), i.appendTo(r), t.setInternal(n, i))
    }

    function r(e, t, n) {
        t = e.get(t), BUI.isString(n) ? t.html(n) : t.html("").append(n)
    }

    function i() {
    }

    var e = BUI.prefix + "stdmod-";
    return t.ATTRS = {
        header: {},
        body: {},
        footer: {},
        bodyStyle: {},
        footerStyle: {},
        headerStyle: {},
        headerContent: {},
        bodyContent: {},
        footerContent: {}
    }, t.PARSER = {
        header: function (t) {
            return t.one("." + e + "header")
        }, body: function (t) {
            return t.one("." + e + "body")
        }, footer: function (t) {
            return t.one("." + e + "footer")
        }
    }, t.prototype = {
        __renderUI: function () {
            n(this, "header"), n(this, "body"), n(this, "footer")
        }, _uiSetBodyStyle: function (e) {
            this.get("body").css(e)
        }, _uiSetHeaderStyle: function (e) {
            this.get("header").css(e)
        }, _uiSetFooterStyle: function (e) {
            this.get("footer").css(e)
        }, _uiSetBodyContent: function (e) {
            r(this, "body", e)
        }, _uiSetHeaderContent: function (e) {
            r(this, "header", e)
        }, _uiSetFooterContent: function (e) {
            r(this, "footer", e)
        }
    }, i.ATTRS = {
        header: {view: 1},
        body: {view: 1},
        footer: {view: 1},
        bodyStyle: {view: 1},
        footerStyle: {view: 1},
        headerStyle: {view: 1},
        headerContent: {view: 1},
        bodyContent: {view: 1},
        footerContent: {view: 1}
    }, i.View = t, i
}), define("bui/component/uibase/decorate", ["bui/array", "bui/json", "bui/component/manage"], function (e) {
    function l(e, t) {
        if (t[e])return !0;
        var n = new RegExp("^" + i);
        return e !== s && n.test(e) ? !0 : !1
    }

    function c(e) {
        var t = [], n = e.constructor;
        while (n)t.push(n), n = n.superclass && n.superclass.constructor;
        return t
    }

    function h(e) {
        return e.toLowerCase().replace(a, function (e, t) {
            return (t + "").toUpperCase()
        })
    }

    function p(e) {
        e = $.trim(e);
        if (e.toLowerCase() === "false") e = !1; else if (e.toLowerCase() === "true") e = !0; else if (f.test(e)) e = n.looseParse(e); else if (/\d/.test(e) && /[^a-z]/i.test(e)) {
            var t = parseFloat(e);
            t + "" === e && (e = t)
        }
        return e
    }

    function d(e, t) {
        var n = e.userConfig || {};
        for (var r in t)r in n || e.setInternal(r, t[r])
    }

    function v(e, t) {
        var n = this, r, i, s = n.userConfig || {};
        for (r in t)r in s || (i = t[r], BUI.isFunction(i) ? n.setInternal(r, i.call(n, e)) : typeof i == "string" ? n.setInternal(r, e.find(i)) : BUI.isArray(i) && i[0] && n.setInternal(r, e.find(i[0])))
    }

    function m(e, t) {
        var n = e.constructor, r, i, s;
        s = c(e);
        for (r = s.length - 1; r >= 0; r--)n = s[r], (i = n[o]) && v.call(e, t, i)
    }

    function g(e) {
        var t = e, n = t.get("srcNode"), r, i;
        n && (n = $(n), t.setInternal("el", n), t.setInternal("srcNode", n), r = t.get("userConfig"), i = t.getDecorateConfig(n), d(e, i), t.get("isDecorateChild") && t.decorateInternal && t.decorateInternal(n), m(e, n))
    }

    function y() {
        g(this)
    }

    var t = e("bui/array"), n = e("bui/json"), r = BUI.prefix, i = "data-", s = i + "cfg", o = "PARSER",
        u = e("bui/component/manage"), a = /-([a-z])/g, f = /^[\{\[]/;
    return y.ATTRS = {
        srcNode: {view: !0},
        isDecorateChild: {value: !1},
        decorateCfgFields: {value: {id: !0, name: !0, value: !0, title: !0}}
    }, y.prototype = {
        getDecorateConfig: function (e) {
            if (!e.length)return null;
            var t = this, n = e[0], r = n.attributes, o = t.get("decorateCfgFields"), u = {}, a = t._getStautsCfg(e);
            return BUI.each(r, function (e) {
                var t = e.nodeName;
                try {
                    if (t === s) {
                        var n = p(e.nodeValue);
                        BUI.mix(u, n)
                    } else if (l(t, o)) {
                        var r = e.nodeValue;
                        t.indexOf(i) !== -1 && (t = t.replace(i, ""), t = h(t), r = p(r)), u[t] && BUI.isObject(r) ? BUI.mix(u[t], r) : u[t] = r
                    }
                } catch (a) {
                    BUI.log("parse field error,the attribute is:" + t)
                }
            }), BUI.mix(u, a)
        }, _getStautsCfg: function (e) {
            var t = this, n = {}, r = t.get("statusCls");
            return BUI.each(r, function (t, r) {
                e.hasClass(t) && (n[r] = !0)
            }), n
        }, getDecorateElments: function () {
            var e = this, t = e.get("el"), n = e.get("childContainer");
            return n ? t.find(n).children() : t.children()
        }, decorateInternal: function (e) {
            var t = this;
            t.decorateChildren(e)
        }, findXClassByNode: function (e, t) {
            var n = this, i = e.attr("class") || "", s = n.get("defaultChildClass");
            i = i.replace(new RegExp("\\b" + r, "ig"), "");
            var o = u.getConstructorByXClass(i) || u.getConstructorByXClass(s);
            return !o && !t && (BUI.log(e), BUI.error("can not find ui " + i + " from this markup")), u.getXClassByConstructor(o)
        }, decorateChildrenInternal: function (e, t) {
            var n = this, r = n.get("children");
            r.push({xclass: e, srcNode: t})
        }, decorateChildren: function (e) {
            var t = this, n = t.getDecorateElments();
            BUI.each(n, function (e) {
                var n = t.findXClassByNode($(e));
                t.decorateChildrenInternal(n, $(e))
            })
        }
    }, y
}), define("bui/component/uibase/tpl", function () {
    function e() {
    }

    function t() {
    }

    return e.ATTRS = {tpl: {}, tplEl: {}}, e.prototype = {
        __renderUI: function () {
            var e = this, t = e.get("childContainer"), n;
            t && (n = e.get("el").find(t), n.length && e.set("contentEl", n))
        }, getTpl: function (e) {
            var t = this, n = t.get("tpl"), r = t.get("tplRender");
            return e = e || t.getAttrVals(), r ? r(e) : n ? BUI.substitute(n, e) : ""
        }, setTplContent: function (e) {
            var t = this, n = t.get("el"), r = t.get("content"), i = t.get("tplEl"), s = t.getTpl(e);
            !r && s && (n.empty(), n.html(s))
        }
    }, t.ATTRS = {
        tpl: {view: !0, sync: !1},
        tplRender: {view: !0, value: null},
        childContainer: {view: !0}
    }, t.prototype = {
        __renderUI: function () {
            this.get("srcNode") || this.setTplContent()
        }, updateContent: function () {
            this.setTplContent()
        }, setTplContent: function () {
            var e = this, t = e.getAttrVals();
            e.get("view").setTplContent(t)
        }, _uiSetTpl: function () {
            this.setTplContent()
        }
    }, t.View = e, t
}), define("bui/component/uibase/collapsable", function () {
    var e = function () {
    };
    e.ATTRS = {collapsed: {}}, e.prototype = {
        _uiSetCollapsed: function (e) {
            var t = this, n = t.getStatusCls("collapsed"), r = t.get("el");
            e ? r.addClass(n) : r.removeClass(n)
        }
    };
    var t = function () {
    };
    return t.ATTRS = {
        collapsable: {value: !1},
        collapsed: {view: !0, value: !1},
        events: {value: {expanded: !0, collapsed: !0}}
    }, t.prototype = {
        _uiSetCollapsed: function (e) {
            var t = this;
            e ? t.fire("collapsed") : t.fire("expanded")
        }
    }, t.View = e, t
}), define("bui/component/uibase/selection", function () {
    var e = "single", t = function () {
    };
    return t.ATTRS = {
        selectedEvent: {value: "click"},
        events: {value: {selectedchange: !1, beforeselectedchange: !1, itemselected: !1, itemunselected: !1}},
        idField: {value: "id"},
        multipleSelect: {value: !1}
    }, t.prototype = {
        clearSelection: function () {
            var e = this, t = e.getSelection();
            BUI.each(t, function (t) {
                e.clearSelected(t)
            })
        }, getSelection: function () {
        }, getSelected: function () {
            return this.getSelection()[0]
        }, getSelectedValue: function () {
            var e = this, t = e.get("idField"), n = e.getSelected();
            return e.getValueByField(n, t)
        }, getSelectionValues: function () {
            var e = this, t = e.get("idField"), n = e.getSelection();
            return $.map(n, function (n) {
                return e.getValueByField(n, t)
            })
        }, getSelectionText: function () {
            var e = this, t = e.getSelection();
            return $.map(t, function (t) {
                return e.getItemText(t)
            })
        }, clearSelected: function (e) {
            var t = this;
            e = e || t.getSelected(), e && t.setItemSelected(e, !1)
        }, getSelectedText: function () {
            var e = this, t = e.getSelected();
            return e.getItemText(t)
        }, setSelection: function (e) {
            var t = this;
            e = BUI.isArray(e) ? e : [e], BUI.each(e, function (e) {
                t.setSelected(e)
            })
        }, setSelected: function (e) {
            var t = this, n = t.get("multipleSelect");
            if (!t.isItemSelectable(e))return;
            if (!n) {
                var r = t.getSelected();
                e != r && t.clearSelected(r)
            }
            t.setItemSelected(e, !0)
        }, isItemSelected: function (e) {
        }, isItemSelectable: function (e) {
            return !0
        }, setItemSelected: function (e, t) {
            var n = this, r;
            if (e) {
                r = n.isItemSelected(e);
                if (r == t)return
            }
            n.fire("beforeselectedchange", {item: e, selected: t}) !== !1 && n.setItemSelectedStatus(e, t)
        }, setItemSelectedStatus: function (e, t) {
        }, setAllSelection: function () {
        }, setSelectedByField: function (e, t) {
            t || (t = e, e = this.get("idField"));
            var n = this, r = n.findItemByField(e, t);
            n.setSelected(r)
        }, setSelectionByField: function (e, t) {
            t || (t = e, e = this.get("idField"));
            var n = this;
            BUI.each(t, function (t) {
                n.setSelectedByField(e, t)
            })
        }, afterSelected: function (e, t, n) {
            var r = this;
            t ? (r.fire("itemselected", {item: e, domTarget: n}), r.fire("selectedchange", {
                item: e,
                domTarget: n,
                selected: t
            })) : (r.fire("itemunselected", {
                item: e,
                domTarget: n
            }), r.get("multipleSelect") && r.fire("selectedchange", {item: e, domTarget: n, selected: t}))
        }
    }, t
}), define("bui/component/uibase/list", ["bui/component/uibase/selection"], function (e) {
    function r(e) {
        e.selected && (e.selected = !1), e.set && e.set("selected", !1)
    }

    function i(e, t) {
        var n = t.isController ? t.getAttrVals() : t, r = e.get("itemTpl"), i = e.get("itemStatusCls"),
            o = e.get("itemTplRender");
        r && !n.tpl && s(t, "tpl", r), o && !n.tplRender && s(t, "tplRender", o);
        if (i) {
            var u = n.statusCls || t.isController ? t.get("statusCls") : {};
            BUI.each(i, function (e, t) {
                e && !u[t] && (u[t] = e)
            }), s(t, "statusCls", u)
        }
    }

    function s(e, t, n) {
        e.isController ? e.set(t, n) : e[t] = n
    }

    var t = e("bui/component/uibase/selection"), n = function () {
    };
    n.ATTRS = {
        items: {shared: !1, view: !0},
        idField: {value: "id"},
        itemTpl: {view: !0},
        itemTplRender: {view: !0},
        itemStatusCls: {view: !0, value: {}},
        events: {value: {itemclick: !0}}
    }, n.prototype = {
        getItemCount: function () {
            return this.getItems().length
        }, getValueByField: function (e, t) {
        }, getItems: function () {
        }, getFirstItem: function () {
            return this.getItemAt(0)
        }, getLastItem: function () {
            return this.getItemAt(this.getItemCount() - 1)
        }, getItemAt: function (e) {
            return this.getItems()[e] || null
        }, getItem: function (e) {
            var t = this.get("idField");
            return this.findItemByField(t, e)
        }, indexOfItem: function (e) {
            return BUI.Array.indexOf(e, this.getItems())
        }, addItems: function (e) {
            var t = this;
            BUI.each(e, function (e) {
                t.addItem(e)
            })
        }, addItemsAt: function (e, t) {
            var n = this;
            BUI.each(e, function (e, r) {
                n.addItemAt(e, t + r)
            })
        }, updateItem: function (e) {
        }, addItem: function (e) {
            return this.addItemAt(e, this.getItemCount())
        }, addItemAt: function (e, t) {
        }, findItemByField: function (e, t) {
        }, getItemText: function (e) {
        }, clearItems: function () {
            var e = this, t = e.getItems();
            t.splice(0), e.clearControl()
        }, removeItem: function (e) {
        }, removeItems: function (e) {
            var t = this;
            BUI.each(e, function (e) {
                t.removeItem(e)
            })
        }, removeItemAt: function (e) {
            this.removeItem(this.getItemAt(e))
        }, clearControl: function () {
        }
    };
    var o = function () {
        this.__init()
    };
    return o.ATTRS = BUI.merge(!0, n.ATTRS, t.ATTRS, {
        items: {sync: !1},
        autoInitItems: {value: !0},
        isDecorateChild: {value: !0},
        defaultLoaderCfg: {value: {property: "children", dataType: "json"}}
    }), BUI.augment(o, n, t, {
        __init: function () {
            var e = this, t = e.get("items");
            t && e.get("autoInitItems") && e.addItems(t), e.on("beforeRenderUI", function () {
                e._beforeRenderUI()
            })
        }, _uiSetItems: function (e) {
            var t = this;
            t.clearControl(), t.addItems(e)
        }, _beforeRenderUI: function () {
            var e = this, t = e.get("children"), n = e.get("items");
            BUI.each(t, function (t) {
                i(e, t)
            })
        }, __bindUI: function () {
            var e = this, t = e.get("selectedEvent");
            e.on(t, function (t) {
                var n = t.target;
                n.get("selectable") && (n.get("selected") ? e.get("multipleSelect") && e.clearSelected(n) : e.setSelected(n))
            }), e.on("click", function (t) {
                t.target !== e && e.fire("itemclick", {item: t.target, domTarget: t.domTarget, domEvent: t})
            }), e.on("beforeAddChild", function (t) {
                i(e, t.child)
            }), e.on("beforeRemoveChild", function (t) {
                var n = t.child, r = n.get("selected");
                r && (e.get("multipleSelect") ? e.clearSelected(n) : e.setSelected(null)), n.set("selected", !1)
            })
        }, clearControl: function () {
            this.removeChildren(!0)
        }, getItems: function () {
            return this.get("children")
        }, updateItem: function (e) {
            var t = this, n = t.get("idField"), r = t.findItemByField(n, e[n]);
            return r && r.setTplContent(), r
        }, removeItem: function (e) {
            var t = this, n = t.get("idField");
            e instanceof BUI.Component.Controller || (e = t.findItemByField(n, e[n])), this.removeChild(e, !0)
        }, addItemAt: function (e, t) {
            return this.addChild(e, t)
        }, findItemByField: function (e, t, n) {
            n = n || this;
            var r = this, i = n.get("children"), s = null;
            return $(i).each(function (n, i) {
                i.get(e) == t ? s = i : i.get("children").length && (s = r.findItemByField(e, t, i));
                if (s)return !1
            }), s
        }, getItemText: function (e) {
            return e.get("el").text()
        }, getValueByField: function (e, t) {
            return e && e.get(t)
        }, setItemSelectedStatus: function (e, t) {
            var n = this, r = t ? "addClass" : "removeClass", i = null;
            e && (e.set("selected", t), i = e.get("el")), n.afterSelected(e, t, i)
        }, isItemSelected: function (e) {
            return e ? e.get("selected") : !1
        }, setAllSelection: function () {
            var e = this, t = e.getItems();
            e.setSelection(t)
        }, getSelection: function () {
            var e = this, t = e.getItems(), n = [];
            return BUI.each(t, function (t) {
                e.isItemSelected(t) && n.push(t)
            }), n
        }
    }), n.ChildList = o, n
}), define("bui/component/uibase/childcfg", function (e) {
    var t = function (e) {
        this._init()
    };
    return t.ATTRS = {defaultChildCfg: {}}, t.prototype = {
        _init: function () {
            var e = this, t = e.get("defaultChildCfg");
            t && e.on("beforeAddChild", function (e) {
                var n = e.child;
                $.isPlainObject(n) && BUI.each(t, function (e, t) {
                    n[t] == null && (n[t] = e)
                })
            })
        }
    }, t
}), define("bui/component/uibase/depends", ["bui/component/manage"], function (e) {
    function r(e) {
        var n = t.exec(e), r = n[1], i = n[2], s = o(r);
        return {source: s, eventType: i}
    }

    function i(e, t, n) {
        var i = r(t), s = i.source, o = i.eventType, u;
        return s && n && o && (BUI.isFunction(n) ? u = n : BUI.isArray(n) && (u = function () {
                BUI.each(n, function (t) {
                    e[t] && e[t]()
                })
            })), u ? (i.callbak = u, s.on(o, u), i) : null
    }

    function s(e) {
        var t = e.source, n = e.eventType, r = e.callbak;
        t.off(n, r)
    }

    function o(e) {
        var t = n.getComponent(e);
        return t || (t = $("#" + e), t.length || (t = null)), t
    }

    function u() {
    }

    var t = /^#(.*):(.*)$/, n = e("bui/component/manage");
    return u.ATTRS = {depends: {}, dependencesMap: {shared: !1, value: {}}}, u.prototype = {
        __syncUI: function () {
            this.initDependences()
        }, initDependences: function () {
            var e = this, t = e.get("depends");
            BUI.each(t, function (t, n) {
                e.addDependence(n, t)
            })
        }, addDependence: function (e, t) {
            var n = this, r = n.get("dependencesMap"), s;
            n.removeDependence(e), s = i(n, e, t), s && (r[e] = s)
        }, removeDependence: function (e) {
            var t = this, n = t.get("dependencesMap"), r = n[e];
            r && (s(r), delete n[e])
        }, clearDependences: function () {
            var e = this, t = e.get("dependencesMap");
            BUI.each(t, function (e, t) {
                s(e)
            }), e.set("dependencesMap", {})
        }, __destructor: function () {
            this.clearDependences()
        }
    }, u
}), define("bui/component/uibase/bindable", function () {
    function e() {
    }

    return e.ATTRS = {store: {}, loadMask: {value: !1}}, BUI.augment(e, {
        __bindUI: function () {
            var e = this, t = e.get("store"), n = e.get("loadMask");
            if (!t)return;
            t.on("beforeload", function (t) {
                e.onBeforeLoad(t), n && n.show && n.show()
            }), t.on("load", function (t) {
                e.onLoad(t), n && n.hide && n.hide()
            }), t.on("exception", function (t) {
                e.onException(t), n && n.hide && n.hide()
            }), t.on("add", function (t) {
                e.onAdd(t)
            }), t.on("remove", function (t) {
                e.onRemove(t)
            }), t.on("update", function (t) {
                e.onUpdate(t)
            }), t.on("localsort", function (t) {
                e.onLocalSort(t)
            }), t.on("filtered", function (t) {
                e.onFiltered(t)
            })
        }, __syncUI: function () {
            var e = this, t = e.get("store");
            if (!t)return;
            t.hasData() && e.onLoad()
        }, onBeforeLoad: function (e) {
        }, onLoad: function (e) {
        }, onException: function (e) {
        }, onAdd: function (e) {
        }, onRemove: function (e) {
        }, onUpdate: function (e) {
        }, onLocalSort: function (e) {
        }, onFiltered: function (e) {
        }
    }), e
}), define("bui/component/view", ["bui/component/manage", "bui/component/uibase"], function (e) {
    var t = window, n = e("bui/component/manage"), r = e("bui/component/uibase"), i = document,
        s = r.extend([r.TplView], {
            getComponentCssClassWithState: function (e) {
                var t = this, n = t.get("ksComponentCss");
                return e = e || "", t.getCssClassWithPrefix(n.split(/\s+/).join(e + " ") + e)
            }, getCssClassWithPrefix: n.getCssClassWithPrefix, getKeyEventTarget: function () {
                return this.get("el")
            }, getContentElement: function () {
                return this.get("contentEl") || this.get("el")
            }, getStatusCls: function (e) {
                var t = this, n = t.get("statusCls"), r = n[e];
                return r || (r = t.getComponentCssClassWithState("-" + e)), r
            }, renderUI: function () {
                var e = this;
                if (!e.get("srcNode")) {
                    var t = e.get("render"), n = e.get("el"), r = e.get("elBefore");
                    r ? n.insertBefore(r, undefined) : t ? n.appendTo(t, undefined) : n.appendTo(i.body, undefined)
                }
            }, createDom: function () {
                var e = this, t = e.get("contentEl"), n = e.get("el");
                e.get("srcNode") || (n = $("<" + e.get("elTagName") + ">"), t && n.append(t), e.setInternal("el", n)), n.addClass(e.getComponentCssClassWithState()), t || e.setInternal("contentEl", n)
            }, _uiSetHighlighted: function (e) {
                var t = this, n = t.getStatusCls("hover"), r = t.get("el");
                r[e ? "addClass" : "removeClass"](n)
            }, _uiSetDisabled: function (e) {
                var t = this, n = t.getStatusCls("disabled"), r = t.get("el");
                r[e ? "addClass" : "removeClass"](n).attr("aria-disabled", e), e && t.get("highlighted") && t.set("highlighted", !1), t.get("focusable") && t.getKeyEventTarget().attr("tabIndex", e ? -1 : 0)
            }, _uiSetActive: function (e) {
                var t = this, n = t.getStatusCls("active");
                t.get("el")[e ? "addClass" : "removeClass"](n).attr("aria-pressed", !!e)
            }, _uiSetFocused: function (e) {
                var t = this, n = t.get("el"), r = t.getStatusCls("focused");
                n[e ? "addClass" : "removeClass"](r)
            }, _uiSetElAttrs: function (e) {
                this.get("el").attr(e)
            }, _uiSetElCls: function (e) {
                this.get("el").addClass(e)
            }, _uiSetElStyle: function (e) {
                this.get("el").css(e)
            }, _uiSetRole: function (e) {
                e && this.get("el").attr("role", e)
            }, _uiSetWidth: function (e) {
                this.get("el").width(e)
            }, _uiSetHeight: function (e) {
                var t = this;
                t.get("el").height(e)
            }, _uiSetContent: function (e) {
                var t = this, n;
                if (!t.get("srcNode") || !!t.get("rendered")) n = t.get("contentEl"), typeof e == "string" ? n.html(e) : e && n.empty().append(e)
            }, _uiSetVisible: function (e) {
                var t = this, n = t.get("el"), r = t.get("visibleMode");
                r === "visibility" ? n.css("visibility", e ? "visible" : "hidden") : n.css("display", e ? "" : "none")
            }, set: function (e, t) {
                var n = this, r = n.__attrs[e], i, o, u;
                if (!r || !n.get("binded"))return s.superclass.set.call(this, e, t), n;
                var a = s.superclass.get.call(this, e);
                return !$.isPlainObject(t) && !BUI.isArray(t) && a === t ? n : (s.superclass.set.call(this, e, t), t = n.__attrVals[e], i = {
                    attrName: e,
                    prevVal: a,
                    newVal: t
                }, o = BUI.ucfirst(e), u = "_uiSet" + o, n[u] && n[u](t, i), n)
            }, destructor: function () {
                var e = this.get("el");
                e && e.remove()
            }
        }, {xclass: "view", priority: 0});
    return s.ATTRS = {
        el: {
            setter: function (e) {
                return $(e)
            }
        },
        elCls: {},
        elStyle: {},
        role: {},
        width: {},
        height: {},
        statusCls: {value: {}},
        elTagName: {value: "div"},
        elAttrs: {},
        content: {},
        elBefore: {},
        render: {},
        visible: {value: !0},
        visibleMode: {value: "display"},
        cachePosition: {},
        contentEl: {
            valueFn: function () {
                return this.get("el")
            }
        },
        prefixCls: {value: BUI.prefix},
        focusable: {value: !0},
        focused: {},
        active: {},
        disabled: {},
        highlighted: {}
    }, s
}), define("bui/component/loader", ["bui/util"], function (e) {
    "use strict";
    var t = e("bui/util"), n = e("bui/base"), r = function (e) {
        r.superclass.constructor.call(this, e), this._init()
    };
    return r.ATTRS = {
        url: {},
        target: {},
        hasLoad: {value: !1},
        autoLoad: {},
        lazyLoad: {},
        property: {},
        renderer: {
            value: function (e) {
                return e
            }
        },
        loadMask: {value: !1},
        dataType: {value: "text"},
        ajaxOptions: {value: {type: "get", cache: !1}},
        params: {},
        appendParams: {},
        lastParams: {shared: !1, value: {}},
        callback: {},
        failure: {}
    }, t.extend(r, n), t.augment(r, {
        isLoader: !0, _init: function () {
            var e = this, t = e.get("autoLoad"), n = e.get("params");
            e._initMask(), t ? e.load(n) : (e._initParams(), e._initLazyLoad())
        }, _initLazyLoad: function () {
            var e = this, t = e.get("target"), n = e.get("lazyLoad");
            t && n && n.event && t.on(n.event, function () {
                (!e.get("hasLoad") || n.repeat) && e.load()
            })
        }, _initMask: function () {
            var e = this, n = e.get("target"), r = e.get("loadMask");
            n && r && t.use("bui/mask", function (i) {
                var s = $.isPlainObject(r) ? r : {};
                r = new i.LoadMask(t.mix({el: n.get("el")}, s)), e.set("loadMask", r)
            })
        }, _initParams: function () {
            var e = this, n = e.get("lastParams"), r = e.get("params");
            t.mix(n, r)
        }, load: function (e) {
            var n = this, r = n.get("url"), i = n.get("ajaxOptions"), s = n.get("lastParams"),
                o = n.get("appendParams");
            e = e || s, e = t.merge(o, e), n.set("lastParams", e);
            if (!r)return;
            n.onBeforeLoad(), n.set("hasLoad", !0), $.ajax(t.mix({
                dataType: n.get("dataType"),
                data: e,
                url: r,
                success: function (t) {
                    n.onload(t, e)
                },
                error: function (t, r, i) {
                    n.onException({jqXHR: t, textStatus: r, errorThrown: i}, e)
                }
            }, i))
        }, onBeforeLoad: function () {
            var e = this, t = e.get("loadMask");
            t && t.show && t.show()
        }, onload: function (e, n) {
            var r = this, i = r.get("loadMask"), s = r.get("property"), o = r.get("callback"), u = r.get("renderer"),
                a = r.get("target");
            t.isString(e) && a.set(s, ""), a.set(s, u.call(r, e)), i && i.hide && i.hide(), o && o.call(this, e, n)
        }, onException: function (e, t) {
            var n = this, r = n.get("failure");
            r && r.call(this, e, t)
        }
    }), r
}), define("bui/component/controller", ["bui/component/uibase", "bui/component/manage", "bui/component/view", "bui/component/loader"], function (e) {
    "use strict";
    function u(e) {
        return function (t) {
            var n = this;
            if (n === t.target) {
                var r = t.newVal, i = n.get("view");
                i && i.set(e, r)
            }
        }
    }

    function a(e) {
        return function (t) {
            var n = this, r = n.get("view");
            return t === undefined ? r.get(e) : t
        }
    }

    function f(e, t, n) {
        e.create();
        var r = e.getContentElement(), i = e.get("defaultChildClass");
        return !t.xclass && !(t instanceof p) && (t.xtype ? t.xclass = i + "-" + t.xtype : t.xclass = i), t = BUI.Component.create(t, e), t.setInternal("parent", e), t.set("render", r), t.set("elBefore", n), t.create(undefined), t
    }

    function l(e) {
        var t, n, r, i = {}, s, o = e.get("xview");
        t = e.getAttrs();
        for (r in t)t.hasOwnProperty(r) && (n = t[r], n.view && (s = e.get(r)) !== undefined && (i[r] = s));
        return delete i.autoRender, i.ksComponentCss = c(e), new o(i)
    }

    function c(e) {
        var t = e.constructor, r, i = [];
        while (t && t !== p)r = n.getXClassByConstructor(t), r && i.push(r), t = t.superclass && t.superclass.constructor;
        return i.join(" ")
    }

    function h(e, t) {
        var n = e.relatedTarget;
        return n && (n === t[0] || $.contains(t, n))
    }

    var t = e("bui/component/uibase"), n = e("bui/component/manage"), r = e("bui/component/view"),
        i = e("bui/component/loader"), s = BUI.wrapBehavior, o = BUI.getWrapBehavior,
        p = t.extend([t.Decorate, t.Tpl, t.ChildCfg, t.KeyNav, t.Depends], {
            isController: !0,
            getCssClassWithPrefix: n.getCssClassWithPrefix,
            initializer: function () {
                var e = this;
                e.get("id") || e.set("id", e.getNextUniqueId()), n.addComponent(e.get("id"), e);
                var t = l(e);
                e.setInternal("view", t), e.__view = t
            },
            getNextUniqueId: function () {
                var e = this, t = n.getXClassByConstructor(e.constructor);
                return BUI.guid(t)
            },
            createDom: function () {
                var e = this, t = e.get("view");
                t.create(undefined)
            },
            renderUI: function () {
                var e = this, t = e.get("loader");
                e.get("view").render(), e._initChildren(), t && e.setInternal("loader", t)
            },
            _initChildren: function (e) {
                var t = this, n, e, r;
                e = e || t.get("children").concat(), t.get("children").length = 0;
                for (n = 0; n < e.length; n++)r = t.addChild(e[n]), r.render()
            },
            bindUI: function () {
                var e = this, t = e.get("events");
                this.on("afterVisibleChange", function (e) {
                    this.fire(e.newVal ? "show" : "hide")
                }), BUI.each(t, function (t, n) {
                    e.publish(n, {bubbles: t})
                })
            },
            containsElement: function (e) {
                var t = this, n = t.get("el"), r = t.get("children"), i = !1;
                return t.get("rendered") ? ($.contains(n[0], e) || n[0] === e ? i = !0 : BUI.each(r, function (t) {
                    if (t.containsElement(e))return i = !0, !1
                }), i) : !1
            },
            isChildrenElement: function (e) {
                var t = this, n = t.get("children"), r = !1;
                return BUI.each(n, function (t) {
                    if (t.containsElement(e))return r = !0, !1
                }), r
            },
            show: function () {
                var e = this;
                return e.render(), e.set("visible", !0), e
            },
            hide: function () {
                var e = this;
                return e.set("visible", !1), e
            },
            toggle: function () {
                return this.set("visible", !this.get("visible")), this
            },
            _uiSetFocusable: function (e) {
                var t = this, n, r = t.getKeyEventTarget();
                e ? r.attr("tabIndex", 0).attr("hideFocus", !0).on("focus", s(t, "handleFocus")).on("blur", s(t, "handleBlur")).on("keydown", s(t, "handleKeydown")).on("keyup", s(t, "handleKeyUp")) : (r.removeAttr("tabIndex"), (n = o(t, "handleFocus")) && r.off("focus", n), (n = o(t, "handleBlur")) && r.off("blur", n), (n = o(t, "handleKeydown")) && r.off("keydown", n), (n = o(t, "handleKeyUp")) && r.off("keyup", n))
            },
            _uiSetHandleMouseEvents: function (e) {
                var t = this, n = t.get("el"), r;
                e ? n.on("mouseenter", s(t, "handleMouseEnter")).on("mouseleave", s(t, "handleMouseLeave")).on("contextmenu", s(t, "handleContextMenu")).on("mousedown", s(t, "handleMouseDown")).on("mouseup", s(t, "handleMouseUp")).on("dblclick", s(t, "handleDblClick")) : (r = o(t, "handleMouseEnter") && n.off("mouseenter", r), r = o(t, "handleMouseLeave") && n.off("mouseleave", r), r = o(t, "handleContextMenu") && n.off("contextmenu", r), r = o(t, "handleMouseDown") && n.off("mousedown", r), r = o(t, "handleMouseUp") && n.off("mouseup", r), r = o(t, "handleDblClick") && n.off("dblclick", r))
            },
            _uiSetFocused: function (e) {
                e && this.getKeyEventTarget()[0].focus()
            },
            _uiSetVisible: function (e) {
                var t = this, n = t.get("el"), r = t.get("visibleMode");
                if (r === "visibility") {
                    if (e) {
                        var i = t.get("cachePosition");
                        i && t.set("xy", i)
                    }
                    if (!e) {
                        var i = [t.get("x"), t.get("y")];
                        t.set("cachePosition", i), t.set("xy", [-999, -999])
                    }
                }
            },
            _uiSetChildren: function (e) {
                var t = this, n = BUI.cloneObject(e);
                t._initChildren(n)
            },
            enable: function () {
                return this.set("disabled", !1), this
            },
            disable: function () {
                return this.set("disabled", !0), this
            },
            focus: function () {
                this.get("focusable") && this.set("focused", !0)
            },
            getContentElement: function () {
                return this.get("view").getContentElement()
            },
            getKeyEventTarget: function () {
                return this.get("view").getKeyEventTarget()
            },
            addChild: function (e, t) {
                var n = this, r = n.get("children"), i;
                return t === undefined && (t = r.length), n.fire("beforeAddChild", {
                    child: e,
                    index: t
                }), i = r[t] && r[t].get("el") || null, e = f(n, e, i), r.splice(t, 0, e), n.get("rendered") && e.render(), n.fire("afterAddChild", {
                    child: e,
                    index: t
                }), e
            },
            remove: function (e) {
                var t = this, n = t.get("parent");
                return n ? n.removeChild(t, e) : e && t.destroy(), t
            },
            removeChild: function (e, t) {
                var n = this, r = n.get("children"), i = BUI.Array.indexOf(e, r);
                if (i === -1)return;
                return n.fire("beforeRemoveChild", {
                    child: e,
                    destroy: t
                }), i !== -1 && r.splice(i, 1), t && e.destroy && e.destroy(), n.fire("afterRemoveChild", {
                    child: e,
                    destroy: t
                }), e
            },
            removeChildren: function (e) {
                var t = this, n, r = [].concat(t.get("children"));
                for (n = 0; n < r.length; n++)t.removeChild(r[n], e)
            },
            getChildAt: function (e) {
                var t = this.get("children");
                return t[e] || null
            },
            getChild: function (e, t) {
                return this.getChildBy(function (t) {
                    return t.get("id") === e
                }, t)
            },
            getChildBy: function (e, t) {
                return this.getChildrenBy(e, t)[0] || null
            },
            getAppendHeight: function () {
                var e = this.get("el");
                return e.outerHeight() - e.height()
            },
            getAppendWidth: function () {
                var e = this.get("el");
                return e.outerWidth() - e.width()
            },
            getChildrenBy: function (e, t) {
                var n = this, r = [];
                return e ? (n.eachChild(function (n) {
                    e(n) ? r.push(n) : t && (r = r.concat(n.getChildrenBy(e, t)))
                }), r) : r
            },
            eachChild: function (e) {
                BUI.each(this.get("children"), e)
            },
            handleDblClick: function (e) {
                this.performActionInternal(e), this.isChildrenElement(e.target) || this.fire("dblclick", {
                    domTarget: e.target,
                    domEvent: e
                })
            },
            handleMouseOver: function (e) {
                var t = this, n = t.get("el");
                h(e, n) || t.handleMouseEnter(e)
            },
            handleMouseOut: function (e) {
                var t = this, n = t.get("el");
                h(e, n) || t.handleMouseLeave(e)
            },
            handleMouseEnter: function (e) {
                var t = this;
                this.set("highlighted", !!e), t.fire("mouseenter", {domTarget: e.target, domEvent: e})
            },
            handleMouseLeave: function (e) {
                var t = this;
                t.set("active", !1), t.set("highlighted", !e), t.fire("mouseleave", {domTarget: e.target, domEvent: e})
            },
            handleMouseDown: function (e) {
                var t = this, n, r = $(e.target), i = e.which === 1, s;
                i && (s = t.getKeyEventTarget(), t.get("activeable") && t.set("active", !0), t.get("focusable") && t.setInternal("focused", !0), t.get("allowTextSelection") || (n = e.target.nodeName, n = n && n.toLowerCase(), n !== "input" && n !== "textarea" && e.preventDefault()), t.isChildrenElement(e.target) || t.fire("mousedown", {
                    domTarget: e.target,
                    domEvent: e
                }))
            },
            handleMouseUp: function (e) {
                var t = this, n = t.isChildrenElement(e.target);
                t.get("active") && e.which === 1 && (t.performActionInternal(e), t.set("active", !1), n || t.fire("click", {
                    domTarget: e.target,
                    domEvent: e
                })), n || t.fire("mouseup", {domTarget: e.target, domEvent: e})
            },
            handleContextMenu: function (e) {
            },
            handleFocus: function (e) {
                this.set("focused", !!e), this.fire("focus", {domEvent: e, domTarget: e.target})
            },
            handleBlur: function (e) {
                this.set("focused", !e), this.fire("blur", {domEvent: e, domTarget: e.target})
            },
            handleKeyEventInternal: function (e) {
                var t = this, n = t.isChildrenElement(e.target);
                if (e.which === 13)return n || t.fire("click", {
                    domTarget: e.target,
                    domEvent: e
                }), this.performActionInternal(e);
                n || t.fire("keydown", {domTarget: e.target, domEvent: e})
            },
            handleKeydown: function (e) {
                var t = this;
                if (t.handleKeyEventInternal(e))return e.halt(), !0
            },
            handleKeyUp: function (e) {
                var t = this;
                t.isChildrenElement(e.target) || t.fire("keyup", {domTarget: e.target, domEvent: e})
            },
            performActionInternal: function (e) {
            },
            destructor: function () {
                var e = this, t, r, i, s = e.get("children");
                t = e.get("id");
                for (r = 0; r < s.length; r++)s[r].destroy && s[r].destroy();
                e.get("view").destroy(), n.removeComponent(t)
            },
            set: function (e, t, n) {
                var r = this, i = r.__view, s = r.__attrs[e], o, u, a;
                BUI.isObject(e) && (n = t, BUI.each(e, function (e, t) {
                    r.set(t, e, n)
                }));
                if (!i || !s || n && n.silent)return p.superclass.set.call(this, e, t, n), r;
                var f = p.superclass.get.call(this, e);
                return !$.isPlainObject(t) && !BUI.isArray(t) && f === t ? r : (o = BUI.ucfirst(e), a = "_uiSet" + o, r.fire("before" + o + "Change", {
                    attrName: e,
                    prevVal: f,
                    newVal: t
                }), r.setInternal(e, t), t = r.__attrVals[e], i && s.view && i.set(e, t), u = {
                    attrName: e,
                    prevVal: f,
                    newVal: t
                }, r.fire("after" + o + "Change", u), r.get("binded") && r[a] && r[a](t, u), r)
            },
            get: function (e) {
                var t = this, n = t.__view, r = t.__attrs[e], i = p.superclass.get.call(this, e);
                return i !== undefined ? i : n && r && r.view ? n.get(e) : i
            }
        }, {
            ATTRS: {
                content: {view: 1},
                elTagName: {view: !0, value: "div"},
                defaultChildClass: {},
                xtype: {},
                id: {view: !0},
                width: {view: 1},
                height: {view: 1},
                elCls: {view: 1},
                elStyle: {view: 1},
                elAttrs: {view: 1},
                elBefore: {view: 1},
                el: {view: 1},
                events: {
                    value: {
                        click: !0,
                        dblclick: !0,
                        mouseenter: !0,
                        mouseleave: !0,
                        keydown: !0,
                        keyup: !0,
                        focus: !1,
                        blur: !1,
                        mousedown: !0,
                        mouseup: !0,
                        show: !1,
                        hide: !1
                    }
                },
                render: {view: 1},
                role: {view: 1},
                statusCls: {view: !0, value: {}},
                visibleMode: {view: 1, value: "display"},
                visible: {value: !0, view: 1},
                handleMouseEvents: {value: !0},
                focusable: {value: !1, view: 1},
                defaultLoaderCfg: {value: {property: "content", autoLoad: !0}},
                loader: {
                    getter: function (e) {
                        var t = this, n;
                        return e && !e.isLoader && (e.target = t, n = t.get("defaultLoaderCfg"), e = new i(BUI.merge(n, e)), t.setInternal("loader", e)), e
                    }
                },
                allowTextSelection: {value: !0},
                activeable: {value: !0},
                focused: {view: 1},
                active: {view: 1},
                highlighted: {view: 1},
                children: {sync: !1, shared: !1, value: []},
                prefixCls: {value: BUI.prefix, view: 1},
                parent: {
                    setter: function (e) {
                        this.addTarget(e)
                    }
                },
                disabled: {view: 1, value: !1},
                xview: {value: r}
            }, PARSER: {
                visible: function (e) {
                    var t = this, n = e.css("display"), r = e.css("visibility"), i = t.get("visibleMode");
                    return n == "none" && i == "display" || r == "hidden" && i == "visibility" ? !1 : !0
                }
            }
        }, {xclass: "controller", priority: 0});
    return p
}), define("bui/cookie", function () {
    function i(e) {
        return typeof e == "string" && e !== ""
    }

    var e = document, t = 864e5, n = encodeURIComponent, r = decodeURIComponent, s = {
        get: function (t) {
            var n, s;
            return i(t) && (s = String(e.cookie).match(new RegExp("(?:^| )" + t + "(?:(?:=([^;]*))|;|$)"))) && (n = s[1] ? r(s[1]) : ""), n
        }, set: function (r, s, o, u, a, f) {
            var l = String(n(s)), c = o;
            typeof c == "number" && (c = new Date, c.setTime(c.getTime() + o * t)), c instanceof Date && (l += "; expires=" + c.toUTCString()), i(u) && (l += "; domain=" + u), i(a) && (l += "; path=" + a), f && (l += "; secure"), e.cookie = r + "=" + l
        }, remove: function (e, t, n, r) {
            this.set(e, "", -1, t, n, r)
        }
    };
    return BUI.Cookie = s, s
}), BUI.use(["bui/common", "bui/cookie"]);
