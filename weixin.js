var r = window.baidu || {}; // tpl/media/  audiomsq_layout.html.js
window.baidu = r, window.UE = r.editor = {}, UE.plugins = {}, UE.commands = {}, UE.instants = {}, UE.I18N = {}, UE.version = "1.2.6.3";
var a = UE.dom = {},
	s = UE.browser = function() {
		var e = navigator.userAgent.toLowerCase(),
			t = window.opera,
			n = {
				edge: /edge\/([\w.]+)/i.test(e),
				ie: /(msie\s|trident.*rv:)([\w.]+)/.test(e),
				opera: !! t && t.version,
				webkit: e.indexOf(" applewebkit/") > -1,
				mac: e.indexOf("macintosh") > -1,
				quirks: "BackCompat" == document.compatMode
			};
		n.gecko = "Gecko" == navigator.product && !n.webkit && !n.opera && !n.ie;
		var i = 0;
		if (n.ie) {
			var o = e.match(/(?:msie\s([\w.]+))/),
				r = e.match(/(?:trident.*rv:([\w.]+))/);
			i = o && r && o[1] && r[1] ? Math.max(1 * o[1], 1 * r[1]) : o && o[1] ? 1 * o[1] : r && r[1] ? 1 * r[1] : 0, n.ie11Compat = 11 == document.documentMode, n.ie9Compat = 9 == document.documentMode, n.ie8 = !! document.documentMode, n.ie8Compat = 8 == document.documentMode, n.ie7Compat = 7 == i && !document.documentMode || 7 == document.documentMode, n.ie6Compat = 7 > i || n.quirks, n.ie9above = i > 8, n.ie9below = 9 > i, n.ie11above = i > 10, n.ie11below = 11 > i;
		}
		if (n.gecko) {
			var a = e.match(/rv:([\d\.]+)/);
			a && (a = a[1].split("."), i = 1e4 * a[0] + 100 * (a[1] || 0) + 1 * (a[2] || 0));
		}
		return /chrome\/(\d+\.\d)/i.test(e) && (n.chrome = +RegExp.$1), /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && !/chrome/i.test(e) && (n.safari = +(RegExp.$1 || RegExp.$2)), n.opera && (i = parseFloat(t.version())), n.webkit && (i = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])), n.version = i, n.isCompatible = !n.mobile && (n.ie && i >= 6 || n.gecko && i >= 10801 || n.opera && i >= 9.5 || n.air && i >= 1 || n.webkit && i >= 522 || !1), n;
	}(),
	l = s.ie,
	d = (s.webkit, s.gecko, s.opera),
	c = UE.utils = {
		each: function(e, t, n) {
			if (null != e) if (e.length === +e.length) {
				for (var i = 0, o = e.length; o > i; i++) if (t.call(n, e[i], i, e) === !1) return !1;
			} else for (var r in e) if (e.hasOwnProperty(r) && t.call(n, e[r], r, e) === !1) return !1;
		},
		makeInstance: function(e) {
			var t = new Function;
			return t.prototype = e, e = new t, t.prototype = null, e;
		},
		extend: function(e, t, n) {
			if (t) for (var i in t) n && e.hasOwnProperty(i) || (e[i] = t[i]);
			return e;
		},
		extend2: function(e) {
			for (var t = arguments, n = 1; n < t.length; n++) {
				var i = t[n];
				for (var o in i) e.hasOwnProperty(o) || (e[o] = i[o]);
			}
			return e;
		},
		inherits: function(e, t) {
			var n = e.prototype,
				i = c.makeInstance(t.prototype);
			return c.extend(i, n, !0), e.prototype = i, i.constructor = e;
		},
		bind: function(e, t) {
			return function() {
				return e.apply(t, arguments);
			};
		},
		defer: function(e, t, n) {
			var i;
			return function() {
				n && clearTimeout(i), i = setTimeout(e, t);
			};
		},
		indexOf: function(e, t, n) {
			var i = -1;
			return n = this.isNumber(n) ? n : 0, this.each(e, function(e, o) {
				return o >= n && e === t ? (i = o, !1) : void 0;
			}), i;
		},
		removeItem: function(e, t) {
			for (var n = 0, i = e.length; i > n; n++) e[n] === t && (e.splice(n, 1), n--);
		},
		trim: function(e) {
			return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
		},
		listToMap: function(e) {
			if (!e) return {};
			e = c.isArray(e) ? e : e.split(",");
			for (var t, n = 0, i = {}; t = e[n++];) i[t.toUpperCase()] = i[t] = 1;
			return i;
		},
		unhtml: function(e, t) {
			return e ? e.replace(t || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g, function(e, t) {
				return t ? e : {
					"<": "&lt;",
					"&": "&amp;",
					'"': "&quot;",
					">": "&gt;",
					"'": "&#39;"
				}[e];
			}) : "";
		},
		html: function(e) {
			return e ? e.replace(/&((g|l|quo)t|amp|#39);/g, function(e) {
				return {
					"&lt;": "<",
					"&amp;": "&",
					"&quot;": '"',
					"&gt;": ">",
					"&#39;": "'"
				}[e];
			}) : "";
		},
		cssStyleToDomStyle: function() {
			var e = document.createElement("div").style,
				t = {
					"float": void 0 != e.cssFloat ? "cssFloat" : void 0 != e.styleFloat ? "styleFloat" : "float"
				};
			return function(e) {
				return t[e] || (t[e] = e.toLowerCase().replace(/-./g, function(e) {
					return e.charAt(1).toUpperCase();
				}));
			};
		}(),
		loadFile: function() {
			function e(e, n) {
				try {
					for (var i, o = 0; i = t[o++];) if (i.doc === e && i.url == (n.src || n.href)) return i;
				} catch (r) {
					return null;
				}
			}
			var t = [];
			return function(n, i, o) {
				i.src && (i.src += "?v=" + UE.version), i.href && (i.href += "?v=" + UE.version);
				var r = e(n, i);
				if (r) return void(r.ready ? o && o() : r.funs.push(o));
				if (t.push({
					doc: n,
					url: i.src || i.href,
					funs: [o]
				}), !n.body) {
					var a = [];
					for (var s in i)"tag" != s && a.push(s + '="' + i[s] + '"');
					return void n.write("<" + i.tag + " " + a.join(" ") + " ></" + i.tag + ">");
				}
				if (!i.id || !n.getElementById(i.id)) {
					var l = n.createElement(i.tag);
					delete i.tag;
					for (var s in i) l.setAttribute(s, i[s]);
					l.onload = l.onreadystatechange = function() {
						if (!this.readyState || /loaded|complete/.test(this.readyState)) {
							if (r = e(n, i), r.funs.length > 0) {
								r.ready = 1;
								for (var t; t = r.funs.pop();) t();
							}
							l.onload = l.onreadystatechange = null;
						}
					}, l.onerror = function() {
						throw Error("The load " + (i.href || i.src) + " fails,check the url settings of file ueditor.config.js ");
					}, n.getElementsByTagName("head")[0].appendChild(l);
				}
			};
		}(),
		isEmptyObject: function(e) {
			if (null == e) return !0;
			if (this.isArray(e) || this.isString(e)) return 0 === e.length;
			for (var t in e) if (e.hasOwnProperty(t)) return !1;
			return !0;
		},
		fixColor: function(e, t) {
			if (/color/i.test(e) && /rgba?/.test(t)) {
				var n = t.split(",");
				if (n.length > 3) return "";
				t = "#";
				for (var i, o = 0; i = n[o++];) i = parseInt(i.replace(/[^\d]/gi, ""), 10).toString(16), t += 1 == i.length ? "0" + i : i;
				t = t.toUpperCase();
			}
			return t;
		},
		optCss: function(e) {
			function t(e, t) {
				if (!e) return "";
				var n = e.top,
					i = e.bottom,
					o = e.left,
					r = e.right,
					a = "";
				if (n && o && i && r) a += ";" + t + ":" + (n == i && i == o && o == r ? n : n == i && o == r ? n + " " + o : o == r ? n + " " + o + " " + i : n + " " + r + " " + i + " " + o) + ";";
				else for (var s in e) a += ";" + t + "-" + s + ":" + e[s] + ";";
				return a;
			}
			var n, i;
			return e = e.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function(e, t, o, r) {
				if (1 == r.split(" ").length) switch (t) {
				case "padding":
					return !n && (n = {}), n[o] = r, "";

				case "margin":
					return !i && (i = {}), i[o] = r, "";

				case "border":
					return "initial" == r ? "" : e;
				}
				return e;
			}), e += t(n, "padding") + t(i, "margin"), e.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g, function(e, t) {
				return t ? t + ";;" : ";";
			});
		},
		clone: function(e, t) {
			var n;
			t = t || {};
			for (var i in e) e.hasOwnProperty(i) && (n = e[i], "object" == typeof n ? (t[i] = c.isArray(n) ? [] : {}, c.clone(e[i], t[i])) : t[i] = n);
			return t;
		},
		transUnitToPx: function(e) {
			if (!/(pt|cm)/.test(e)) return e;
			var t;
			switch (e.replace(/([\d.]+)(\w+)/, function(n, i, o) {
				e = i, t = o;
			}), t) {
			case "cm":
				e = 25 * parseFloat(e);
				break;

			case "pt":
				e = Math.round(96 * parseFloat(e) / 72);
			}
			return e + (e ? "px" : "");
		},
		domReady: function() {
			function e(e) {
				e.isReady = !0;
				for (var n; n = t.pop(); n());
			}
			var t = [];
			return function(n, i) {
				function o() {
					r.removeEventListener("DOMContentLoaded", o, !1), e(r);
				}
				i = i || window;
				var r = i.document;
				n && t.push(n), "complete" === r.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? e(r) : (r.isReady && e(r), s.ie && 11 != s.version ? (!
				function() {
					if (!r.isReady) {
						try {
							r.documentElement.doScroll("left");
						} catch (t) {
							return void setTimeout(arguments.callee, 0);
						}
						e(r);
					}
				}(), i.attachEvent("onload", function() {
					e(r);
				})) : (r.addEventListener("DOMContentLoaded", o, !1), i.addEventListener("load", function() {
					e(r);
				}, !1)));
			};
		}(),
		cssRule: s.ie && 11 != s.version && document.createStyleSheet ?
		function(e, t, n) {
			var i, o;
			n = n || document, i = n.indexList ? n.indexList : n.indexList = {};
			var r;
			if (i[e]) r = n.styleSheets[i[e]];
			else {
				if (void 0 === t) return "";
				r = n.createStyleSheet("", o = n.styleSheets.length), i[e] = o;
			}
			return void 0 === t ? r.cssText : void(r.cssText = t || "");
		} : function(e, t, n) {
			n = n || document;
			var i, o = n.getElementsByTagName("head")[0];
			if (!(i = n.getElementById(e))) {
				if (void 0 === t) return "";
				i = n.createElement("style"), i.id = e, o.appendChild(i);
			}
			return void 0 === t ? i.innerHTML : void("" !== t ? i.innerHTML = t : o.removeChild(i));
		},
		sort: function(e, t) {
			t = t ||
			function(e, t) {
				return e.localeCompare(t);
			};
			for (var n = 0, i = e.length; i > n; n++) for (var o = n, r = e.length; r > o; o++) if (t(e[n], e[o]) > 0) {
				var a = e[n];
				e[n] = e[o], e[o] = a;
			}
			return e;
		}
	};
c.each(["String", "Function", "Array", "Number", "RegExp", "Object"], function(e) {
	UE.utils["is" + e] = function(t) {
		return Object.prototype.toString.apply(t) == "[object " + e + "]";
	};
});
var u = UE.EventBase = function() {};
u.prototype = {
	addListener: function(e, n) {
		e = c.trim(e).split(" ");
		for (var i, o = 0; i = e[o++];) t(this, i, !0).push(n);
	},
	removeListener: function(e, n) {
		e = c.trim(e).split(" ");
		for (var i, o = 0; i = e[o++];) c.removeItem(t(this, i) || [], n);
	},
	fireEvent: function() {
		var e = arguments[0];
		e = c.trim(e).split(" ");
		for (var n, i = 0; n = e[i++];) {
			var o, r, a, s = t(this, n);
			if (s) for (a = s.length; a--;) if (s[a]) {
				if (r = s[a].apply(this, arguments), r === !0) return r;
				void 0 !== r && (o = r);
			}(r = this["on" + n.toLowerCase()]) && (o = r.apply(this, arguments));
		}
		return o;
	}
};
var f = a.dtd = function() {
		function e(e) {
			for (var t in e) e[t.toUpperCase()] = e[t];
			return e;
		}
		var t = c.extend2,
			n = e({
				isindex: 1,
				fieldset: 1
			}),
			i = e({
				input: 1,
				button: 1,
				select: 1,
				textarea: 1,
				label: 1
			}),
			o = t(e({
				a: 1
			}), i),
			r = t({
				iframe: 1
			}, o),
			a = e({
				hr: 1,
				ul: 1,
				menu: 1,
				div: 1,
				blockquote: 1,
				noscript: 1,
				table: 1,
				center: 1,
				address: 1,
				dir: 1,
				pre: 1,
				h5: 1,
				dl: 1,
				h4: 1,
				noframes: 1,
				h6: 1,
				ol: 1,
				h1: 1,
				h3: 1,
				h2: 1
			}),
			s = e({
				ins: 1,
				del: 1,
				script: 1,
				style: 1
			}),
			l = t(e({
				b: 1,
				acronym: 1,
				bdo: 1,
				"var": 1,
				"#": 1,
				abbr: 1,
				code: 1,
				br: 1,
				i: 1,
				cite: 1,
				kbd: 1,
				u: 1,
				strike: 1,
				s: 1,
				tt: 1,
				strong: 1,
				q: 1,
				samp: 1,
				em: 1,
				dfn: 1,
				span: 1
			}), s),
			d = t(e({
				sub: 1,
				img: 1,
				embed: 1,
				object: 1,
				sup: 1,
				basefont: 1,
				map: 1,
				applet: 1,
				font: 1,
				big: 1,
				small: 1
			}), l),
			u = t(e({
				p: 1
			}), d),
			f = t(e({
				iframe: 1
			}), d, i),
			m = e({
				img: 1,
				embed: 1,
				noscript: 1,
				br: 1,
				kbd: 1,
				center: 1,
				button: 1,
				basefont: 1,
				h5: 1,
				h4: 1,
				samp: 1,
				h6: 1,
				ol: 1,
				h1: 1,
				h3: 1,
				h2: 1,
				form: 1,
				font: 1,
				"#": 1,
				select: 1,
				menu: 1,
				ins: 1,
				abbr: 1,
				label: 1,
				code: 1,
				table: 1,
				script: 1,
				cite: 1,
				input: 1,
				iframe: 1,
				strong: 1,
				textarea: 1,
				noframes: 1,
				big: 1,
				small: 1,
				span: 1,
				hr: 1,
				sub: 1,
				bdo: 1,
				"var": 1,
				div: 1,
				object: 1,
				sup: 1,
				strike: 1,
				dir: 1,
				map: 1,
				dl: 1,
				applet: 1,
				del: 1,
				isindex: 1,
				fieldset: 1,
				ul: 1,
				b: 1,
				acronym: 1,
				a: 1,
				blockquote: 1,
				i: 1,
				u: 1,
				s: 1,
				tt: 1,
				address: 1,
				q: 1,
				pre: 1,
				p: 1,
				em: 1,
				dfn: 1
			}),
			h = t(e({
				a: 0
			}), f),
			p = e({
				tr: 1
			}),
			g = e({
				"#": 1
			}),
			v = t(e({
				param: 1
			}), m),
			b = t(e({
				form: 1
			}), n, r, a, u),
			y = e({
				li: 1,
				ol: 1,
				ul: 1
			}),
			C = e({
				style: 1,
				script: 1
			}),
			N = e({
				base: 1,
				link: 1,
				meta: 1,
				title: 1
			}),
			x = t(N, C),
			w = e({
				head: 1,
				body: 1
			}),
			E = e({
				html: 1
			}),
			T = e({
				address: 1,
				blockquote: 1,
				center: 1,
				dir: 1,
				div: 1,
				dl: 1,
				fieldset: 1,
				form: 1,
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1,
				hr: 1,
				isindex: 1,
				menu: 1,
				noframes: 1,
				ol: 1,
				p: 1,
				pre: 1,
				table: 1,
				ul: 1
			}),
			S = e({
				area: 1,
				base: 1,
				basefont: 1,
				br: 1,
				col: 1,
				command: 1,
				dialog: 1,
				embed: 1,
				hr: 1,
				img: 1,
				input: 1,
				isindex: 1,
				keygen: 1,
				link: 1,
				meta: 1,
				param: 1,
				source: 1,
				track: 1,
				wbr: 1
			});
		return e({
			$nonBodyContent: t(E, w, N),
			$block: T,
			$inline: h,
			$inlineWithA: t(e({
				a: 1
			}), h),
			$body: t(e({
				script: 1,
				style: 1
			}), T),
			$cdata: e({
				script: 1,
				style: 1
			}),
			$empty: S,
			$nonChild: e({
				iframe: 1,
				textarea: 1
			}),
			$listItem: e({
				dd: 1,
				dt: 1,
				li: 1
			}),
			$list: e({
				ul: 1,
				ol: 1,
				dl: 1
			}),
			$isNotEmpty: e({
				table: 1,
				ul: 1,
				ol: 1,
				dl: 1,
				iframe: 1,
				area: 1,
				base: 1,
				col: 1,
				hr: 1,
				img: 1,
				embed: 1,
				input: 1,
				link: 1,
				meta: 1,
				param: 1,
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1
			}),
			$removeEmpty: e({
				a: 1,
				abbr: 1,
				acronym: 1,
				address: 1,
				b: 1,
				bdo: 1,
				big: 1,
				cite: 1,
				code: 1,
				del: 1,
				dfn: 1,
				em: 1,
				font: 1,
				i: 1,
				ins: 1,
				label: 1,
				kbd: 1,
				q: 1,
				s: 1,
				samp: 1,
				small: 1,
				span: 1,
				strike: 1,
				strong: 1,
				sub: 1,
				sup: 1,
				tt: 1,
				u: 1,
				"var": 1
			}),
			$removeEmptyBlock: e({
				p: 1,
				div: 1
			}),
			$tableContent: e({
				caption: 1,
				col: 1,
				colgroup: 1,
				tbody: 1,
				td: 1,
				tfoot: 1,
				th: 1,
				thead: 1,
				tr: 1,
				table: 1
			}),
			$notTransContent: e({
				pre: 1,
				script: 1,
				style: 1,
				textarea: 1
			}),
			html: w,
			head: x,
			style: g,
			script: g,
			body: b,
			base: {},
			link: {},
			meta: {},
			title: g,
			col: {},
			tr: e({
				td: 1,
				th: 1
			}),
			img: {},
			embed: {},
			colgroup: e({
				thead: 1,
				col: 1,
				tbody: 1,
				tr: 1,
				tfoot: 1
			}),
			noscript: b,
			td: b,
			br: {},
			th: b,
			center: b,
			kbd: h,
			button: t(u, a),
			basefont: {},
			h5: h,
			h4: h,
			samp: h,
			h6: h,
			ol: y,
			h1: h,
			h3: h,
			option: g,
			h2: h,
			form: t(n, r, a, u),
			select: e({
				optgroup: 1,
				option: 1
			}),
			font: h,
			ins: h,
			menu: y,
			abbr: h,
			label: h,
			table: e({
				thead: 1,
				col: 1,
				tbody: 1,
				tr: 1,
				colgroup: 1,
				caption: 1,
				tfoot: 1
			}),
			code: h,
			tfoot: p,
			cite: h,
			li: b,
			input: {},
			iframe: b,
			strong: h,
			textarea: g,
			noframes: b,
			big: h,
			small: h,
			span: e({
				"#": 1,
				br: 1,
				b: 1,
				strong: 1,
				u: 1,
				i: 1,
				em: 1,
				sub: 1,
				sup: 1,
				strike: 1,
				span: 1
			}),
			hr: h,
			dt: h,
			sub: h,
			optgroup: e({
				option: 1
			}),
			param: {},
			bdo: h,
			"var": h,
			div: b,
			object: v,
			sup: h,
			dd: b,
			strike: h,
			area: {},
			dir: y,
			map: t(e({
				area: 1,
				form: 1,
				p: 1
			}), n, s, a),
			applet: v,
			dl: e({
				dt: 1,
				dd: 1
			}),
			del: h,
			isindex: {},
			fieldset: t(e({
				legend: 1
			}), m),
			thead: p,
			ul: y,
			acronym: h,
			b: h,
			a: t(e({
				a: 1
			}), f),
			blockquote: t(e({
				td: 1,
				tr: 1,
				tbody: 1,
				li: 1
			}), b),
			caption: h,
			i: h,
			u: h,
			tbody: p,
			s: h,
			address: t(r, u),
			tt: h,
			legend: h,
			q: h,
			pre: t(l, o),
			p: t(e({
				a: 1
			}), h),
			em: h,
			dfn: h
		});
	}(),
	m = l && s.version < 9 ? {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder"
	} : {
		tabindex: "tabIndex",
		readonly: "readOnly"
	},
	h = c.listToMap(["-webkit-box", "-moz-box", "block", "list-item", "table", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-column-group", "table-column", "table-cell", "table-caption"]),
	p = a.domUtils = {
		NODE_ELEMENT: 1,
		NODE_DOCUMENT: 9,
		NODE_TEXT: 3,
		NODE_COMMENT: 8,
		NODE_DOCUMENT_FRAGMENT: 11,
		POSITION_IDENTICAL: 0,
		POSITION_DISCONNECTED: 1,
		POSITION_FOLLOWING: 2,
		POSITION_PRECEDING: 4,
		POSITION_IS_CONTAINED: 8,
		POSITION_CONTAINS: 16,
		fillChar: l && "6" == s.version ? "﻿" : "​",
		keys: {
			8: 1,
			46: 1,
			16: 1,
			17: 1,
			18: 1,
			37: 1,
			38: 1,
			39: 1,
			40: 1,
			13: 1
		},
		getPosition: function(e, t) {
			if (e === t) return 0;
			var n, i = [e],
				o = [t];
			for (n = e; n = n.parentNode;) {
				if (n === t) return 10;
				i.push(n);
			}
			for (n = t; n = n.parentNode;) {
				if (n === e) return 20;
				o.push(n);
			}
			if (i.reverse(), o.reverse(), i[0] !== o[0]) return 1;
			for (var r = -1; r++, i[r] === o[r];);
			for (e = i[r], t = o[r]; e = e.nextSibling;) if (e === t) return 4;
			return 2;
		},
		getNodeIndex: function(e, t) {
			for (var n = e, i = 0; n = n.previousSibling;) t && 3 == n.nodeType ? n.nodeType != n.nextSibling.nodeType && i++ : i++;
			return i;
		},
		inDoc: function(e, t) {
			return 10 == p.getPosition(e, t);
		},
		findParent: function(e, t, n) {
			if (e && !p.isBody(e)) for (e = n ? e : e.parentNode; e;) {
				if (!t || t(e) || p.isBody(e)) return t && !t(e) && p.isBody(e) ? null : e;
				e = e.parentNode;
			}
			return null;
		},
		findParentByTagName: function(e, t, n, i) {
			return t = c.listToMap(c.isArray(t) ? t : [t]), p.findParent(e, function(e) {
				return t[e.tagName] && !(i && i(e));
			}, n);
		},
		findParents: function(e, t, n, i) {
			for (var o = t && (n && n(e) || !n) ? [e] : []; e = p.findParent(e, n);) o.push(e);
			return i ? o : o.reverse();
		},
		insertAfter: function(e, t) {
			return e.parentNode.insertBefore(t, e.nextSibling);
		},
		remove: function(e, t) {
			var n, i = e.parentNode;
			if (i) {
				if (t && e.hasChildNodes()) for (; n = e.firstChild;) i.insertBefore(n, e);
				i.removeChild(e);
			}
			return e;
		},
		getNextDomNode: function(e, t, i, o) {
			return n(e, "firstChild", "nextSibling", t, i, o);
		},
		isBookmarkNode: function(e) {
			return 1 == e.nodeType && e.id && /^_baidu_bookmark_/i.test(e.id);
		},
		getWindow: function(e) {
			var t = e.ownerDocument || e;
			return t.defaultView || t.parentWindow;
		},
		getCommonAncestor: function(e, t) {
			if (e === t) return e;
			for (var n = [e], i = [t], o = e, r = -1; o = o.parentNode;) {
				if (o === t) return o;
				n.push(o);
			}
			for (o = t; o = o.parentNode;) {
				if (o === e) return o;
				i.push(o);
			}
			for (n.reverse(), i.reverse(); r++, n[r] === i[r];);
			return 0 == r ? null : n[r - 1];
		},
		clearEmptySibling: function(e, t, n) {
			function i(e, t) {
				for (var n; e && !p.isBookmarkNode(e) && (p.isEmptyInlineElement(e) || !new RegExp("[^	\n\r" + p.fillChar + "]").test(e.nodeValue));) n = e[t], p.remove(e), e = n;
			}!t && i(e.nextSibling, "nextSibling"), !n && i(e.previousSibling, "previousSibling");
		},
		split: function(e, t) {
			var n = e.ownerDocument;
			if (s.ie && t == e.nodeValue.length) {
				var i = n.createTextNode("");
				return p.insertAfter(e, i);
			}
			var o = e.splitText(t);
			if (s.ie8) {
				var r = n.createTextNode("");
				p.insertAfter(o, r), p.remove(r);
			}
			return o;
		},
		isWhitespace: function(e) {
			return !new RegExp("[^ 	\n\r" + p.fillChar + "]").test(e.nodeValue);
		},
		getXY: function(e) {
			for (var t = 0, n = 0; e.offsetParent;) n += e.offsetTop, t += e.offsetLeft, e = e.offsetParent;
			if (0 == t && 0 == n) {
				var i = $(e).offset();
				t = i.left, n = i.top;
			}
			return {
				x: t,
				y: n
			};
		},
		on: function(e, t, n) {
			var i = c.isArray(t) ? t : [t],
				o = i.length;
			if (o) for (; o--;) if (t = i[o], e.addEventListener) e.addEventListener(t, n, !1);
			else {
				n._d || (n._d = {
					els: []
				});
				var r = t + n.toString(),
					a = c.indexOf(n._d.els, e);
				n._d[r] && -1 != a || (-1 == a && n._d.els.push(e), n._d[r] || (n._d[r] = function(e) {
					return n.call(e.srcElement, e || window.event);
				}), e.attachEvent("on" + t, n._d[r]));
			}
			e = null;
		},
		un: function(e, t, n) {
			var i = c.isArray(t) ? t : [t],
				o = i.length;
			if (o) for (; o--;) if (t = i[o], e.removeEventListener) e.removeEventListener(t, n, !1);
			else {
				var r = t + n.toString();
				try {
					e.detachEvent("on" + t, n._d ? n._d[r] : n);
				} catch (a) {}
				if (n._d && n._d[r]) {
					var s = c.indexOf(n._d.els, e); - 1 != s && n._d.els.splice(s, 1), 0 == n._d.els.length && delete n._d[r];
				}
			}
		},
		isSameElement: function(e, t) {
			if (e.tagName != t.tagName) return !1;
			var n = e.attributes,
				i = t.attributes;
			if (!l && n.length != i.length) return !1;
			for (var o, r, a = 0, s = 0, d = 0; o = n[d++];) {
				if ("style" == o.nodeName) {
					if (o.specified && a++, p.isSameStyle(e, t)) continue;
					return !1;
				}
				if (l) {
					if (!o.specified) continue;
					a++, r = i.getNamedItem(o.nodeName);
				} else r = t.attributes[o.nodeName];
				if (!r.specified || o.nodeValue != r.nodeValue) return !1;
			}
			if (l) {
				for (d = 0; r = i[d++];) r.specified && s++;
				if (a != s) return !1;
			}
			return !0;
		},
		isSameStyle: function(e, t) {
			var n = e.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"),
				i = t.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":");
			if (s.opera) {
				if (n = e.style, i = t.style, n.length != i.length) return !1;
				for (var o in n) if (!/^(\d+|csstext)$/i.test(o) && n[o] != i[o]) return !1;
				return !0;
			}
			if (!n || !i) return n == i;
			if (n = n.split(";"), i = i.split(";"), n.length != i.length) return !1;
			for (var r, a = 0; r = n[a++];) if (-1 == c.indexOf(i, r)) return !1;
			return !0;
		},
		isBlockElm: function(e) {
			return 1 == e.nodeType && (f.$block[e.tagName] || h[p.getComputedStyle(e, "display")]) && !f.$nonChild[e.tagName];
		},
		isBody: function(e) {
			return e && 1 == e.nodeType && "body" == e.tagName.toLowerCase();
		},
		breakParent: function(e, t) {
			var n, i, o, r = e,
				a = e;
			do {
				for (r = r.parentNode, i ? (n = r.cloneNode(!1), n.appendChild(i), i = n, n = r.cloneNode(!1), n.appendChild(o), o = n) : (i = r.cloneNode(!1), o = i.cloneNode(!1)); n = a.previousSibling;) i.insertBefore(n, i.firstChild);
				for (; n = a.nextSibling;) o.appendChild(n);
				a = r;
			} while (t !== r);
			return n = t.parentNode, n.insertBefore(i, t), n.insertBefore(o, t), n.insertBefore(e, o), p.remove(t), e;
		},
		isEmptyInlineElement: function(e) {
			if (1 != e.nodeType || !f.$removeEmpty[e.tagName]) return 0;
			for (e = e.firstChild; e;) {
				if (p.isBookmarkNode(e)) return 0;
				if (1 == e.nodeType && !p.isEmptyInlineElement(e) || 3 == e.nodeType && !p.isWhitespace(e)) return 0;
				e = e.nextSibling;
			}
			return 1;
		},
		trimWhiteTextNode: function(e) {
			function t(t) {
				for (var n;
				(n = e[t]) && 3 == n.nodeType && p.isWhitespace(n);) e.removeChild(n);
			}
			t("firstChild"), t("lastChild");
		},
		mergeChild: function(e, t, n) {
			for (var i, o = p.getElementsByTagName(e, e.tagName.toLowerCase()), r = 0; i = o[r++];) if (i.parentNode && !p.isBookmarkNode(i)) if ("span" != i.tagName.toLowerCase()) p.isSameElement(e, i) && p.remove(i, !0);
			else {
				if (e === i.parentNode && (p.trimWhiteTextNode(e), 1 == e.childNodes.length)) {
					e.style.cssText = i.style.cssText + ";" + e.style.cssText, p.remove(i, !0);
					continue;
				}
				if (i.style.cssText = e.style.cssText + ";" + i.style.cssText, n) {
					var a = n.style;
					if (a) {
						a = a.split(";");
						for (var s, l = 0; s = a[l++];) i.style[c.cssStyleToDomStyle(s.split(":")[0])] = s.split(":")[1];
					}
				}
				p.isSameStyle(i, e) && p.remove(i, !0);
			}
		},
		getElementsByTagName: function(e, t, n) {
			if (n && c.isString(n)) {
				var i = n;
				n = function(e) {
					return p.hasClass(e, i);
				};
			}
			t = c.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
			for (var o, r = [], a = 0; o = t[a++];) for (var s, l = e.getElementsByTagName(o), d = 0; s = l[d++];)(!n || n(s)) && r.push(s);
			return r;
		},
		mergeToParent: function(e) {
			for (var t = e.parentNode; t && f.$removeEmpty[t.tagName];) {
				if (t.tagName == e.tagName || "A" == t.tagName) {
					if (p.trimWhiteTextNode(t), "SPAN" == t.tagName && !p.isSameStyle(t, e) || "A" == t.tagName && "SPAN" == e.tagName) {
						if (t.childNodes.length > 1 || t !== e.parentNode) {
							e.style.cssText = t.style.cssText + ";" + e.style.cssText, t = t.parentNode;
							continue;
						}
						t.style.cssText += ";" + e.style.cssText, "A" == t.tagName && (t.style.textDecoration = "underline");
					}
					if ("A" != t.tagName) {
						t === e.parentNode && p.remove(e, !0);
						break;
					}
				}
				t = t.parentNode;
			}
		},
		mergeSibling: function(e, t, n) {
			function i(e, t, n) {
				var i;
				if ((i = n[e]) && !p.isBookmarkNode(i) && 1 == i.nodeType && p.isSameElement(n, i)) {
					for (; i.firstChild;)"firstChild" == t ? n.insertBefore(i.lastChild, n.firstChild) : n.appendChild(i.firstChild);
					p.remove(i);
				}
			}!t && i("previousSibling", "firstChild", e), !n && i("nextSibling", "lastChild", e);
		},
		unSelectable: l && s.ie9below || s.opera ?
		function(e) {
			e.onselectstart = function() {
				return !1;
			}, e.onclick = e.onkeyup = e.onkeydown = function() {
				return !1;
			}, e.unselectable = "on", e.setAttribute("unselectable", "on");
			for (var t, n = 0; t = e.all[n++];) switch (t.tagName.toLowerCase()) {
			case "iframe":
			case "textarea":
			case "input":
			case "select":
				break;

			default:
				t.unselectable = "on", e.setAttribute("unselectable", "on");
			}
		} : function(e) {
			e.style.MozUserSelect = e.style.webkitUserSelect = e.style.KhtmlUserSelect = "none";
		},
		removeAttributes: function(e, t) {
			t = c.isArray(t) ? t : c.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
			for (var n, i = 0; n = t[i++];) {
				switch (n = m[n] || n) {
				case "className":
					e[n] = "";
					break;

				case "style":
					e.style.cssText = "", !s.ie && !! e.getAttributeNode("style") && e.removeAttributeNode(e.getAttributeNode("style"));
				}
				e.removeAttribute(n);
			}
		},
		createElement: function(e, t, n) {
			return p.setAttributes(e.createElement(t), n);
		},
		setAttributes: function(e, t) {
			for (var n in t) if (t.hasOwnProperty(n)) {
				var i = t[n];
				switch (n) {
				case "class":
					e.className = i;
					break;

				case "style":
					e.style.cssText = e.style.cssText + ";" + i;
					break;

				case "innerHTML":
					e[n] = i;
					break;

				case "value":
					e.value = i;
					break;

				default:
					e.setAttribute(m[n] || n, i);
				}
			}
			return e;
		},
		getComputedStyle: function(e, t) {
			var n = "width height top left";
			if (n.indexOf(t) > -1) return e["offset" + t.replace(/^\w/, function(e) {
				return e.toUpperCase();
			})] + "px";
			if (3 == e.nodeType && (e = e.parentNode), s.ie && s.version < 9 && "font-size" == t && !e.style.fontSize && !f.$empty[e.tagName] && !f.$nonChild[e.tagName]) {
				var i = e.ownerDocument.createElement("span");
				i.style.cssText = "padding:0;border:0;font-family:simsun;", i.innerHTML = ".", e.appendChild(i);
				var o = i.offsetHeight;
				return e.removeChild(i), i = null, o + "px";
			}
			try {
				var r = p.getStyle(e, t) || (window.getComputedStyle ? p.getWindow(e).getComputedStyle(e, "").getPropertyValue(t) : (e.currentStyle || e.style)[c.cssStyleToDomStyle(t)]);
			} catch (a) {
				return "";
			}
			return c.transUnitToPx(c.fixColor(t, r));
		},
		removeClasses: function(e, t) {
			t = c.isArray(t) ? t : c.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
			for (var n, i = 0, o = e.className; n = t[i++];) o = o.replace(new RegExp("\\b" + n + "\\b"), "");
			o = c.trim(o).replace(/[ ]{2,}/g, " "), o ? e.className = o : p.removeAttributes(e, ["class"]);
		},
		addClass: function(e, t) {
			if (e) {
				t = c.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
				for (var n, i = 0, o = e.className; n = t[i++];) new RegExp("\\b" + n + "\\b").test(o) || (e.className += " " + n);
			}
		},
		hasClass: function(e, t) {
			if (!e) return !1;
			if (c.isRegExp(t)) return t.test(e.className);
			t = c.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
			for (var n, i = 0, o = e.className; n = t[i++];) if (!new RegExp("\\b" + n + "\\b", "i").test(o)) return !1;
			return i - 1 == t.length;
		},
		preventDefault: function(e) {
			e.preventDefault ? e.preventDefault() : e.returnValue = !1;
		},
		removeStyle: function(e, t) {
			s.ie ? ("color" == t && (t = "(^|;)" + t), e.style.cssText = e.style.cssText.replace(new RegExp(t + "[^:]*:[^;]+;?", "ig"), "")) : e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(c.cssStyleToDomStyle(t)), e.style.cssText || p.removeAttributes(e, ["style"]);
		},
		getStyle: function(e, t) {
			var n = e.style[c.cssStyleToDomStyle(t)];
			return c.fixColor(t, n);
		},
		setStyle: function(e, t, n) {
			e.style[c.cssStyleToDomStyle(t)] = n, c.trim(e.style.cssText) || this.removeAttributes(e, "style");
		},
		setStyles: function(e, t) {
			for (var n in t) t.hasOwnProperty(n) && p.setStyle(e, n, t[n]);
		},
		removeDirtyAttr: function(e) {
			for (var t, n = 0, i = e.getElementsByTagName("*"); t = i[n++];) t.removeAttribute("_moz_dirty");
			e.removeAttribute("_moz_dirty");
		},
		getChildCount: function(e, t) {
			var n = 0,
				i = e.firstChild;
			for (t = t ||
			function() {
				return 1;
			}; i;) t(i) && n++, i = i.nextSibling;
			return n;
		},
		isEmptyNode: function(e) {
			return !e.firstChild || 0 == p.getChildCount(e, function(e) {
				return !p.isBr(e) && !p.isBookmarkNode(e) && !p.isWhitespace(e);
			});
		},
		clearSelectedArr: function(e) {
			for (var t; t = e.pop();) p.removeAttributes(t, ["class"]);
		},
		scrollToView: function(e, t, n) {
			var i = function() {
					var e = t.document,
						n = "CSS1Compat" == e.compatMode;
					return {
						width: (n ? e.documentElement.clientWidth : e.body.clientWidth) || 0,
						height: (n ? e.documentElement.clientHeight : e.body.clientHeight) || 0
					};
				},
				o = function(e) {
					if ("pageXOffset" in e) return {
						x: e.pageXOffset || 0,
						y: e.pageYOffset || 0
					};
					var t = e.document;
					return {
						x: t.documentElement.scrollLeft || t.body.scrollLeft || 0,
						y: t.documentElement.scrollTop || t.body.scrollTop || 0
					};
				},
				r = i().height,
				a = -1 * r + n;
			a += e.offsetHeight || 0;
			var s = p.getXY(e);
			a += s.y;
			var l = o(t).y;
			(a > l || l - r > a) && t.scrollTo(0, a + (0 > a ? -20 : 20));
		},
		isBr: function(e) {
			return 1 == e.nodeType && "BR" == e.tagName;
		},
		isFillChar: function(e, t) {
			return 3 == e.nodeType && !e.nodeValue.replace(new RegExp((t ? "^" : "") + p.fillChar), "").length;
		},
		isStartInblock: function(e) {
			var t, n = e.cloneRange(),
				i = 0,
				o = n.startContainer;
			if (1 == o.nodeType && o.childNodes[n.startOffset]) {
				o = o.childNodes[n.startOffset];
				for (var r = o.previousSibling; r && p.isFillChar(r);) o = r, r = r.previousSibling;
			}
			for (this.isFillChar(o, !0) && 1 == n.startOffset && (n.setStartBefore(o), o = n.startContainer); o && p.isFillChar(o);) t = o, o = o.previousSibling;
			for (t && (n.setStartBefore(t), o = n.startContainer), 1 == o.nodeType && p.isEmptyNode(o) && 1 == n.startOffset && n.setStart(o, 0).collapse(!0); !n.startOffset;) {
				if (o = n.startContainer, p.isBlockElm(o) || p.isBody(o)) {
					i = 1;
					break;
				}
				var a, r = n.startContainer.previousSibling;
				if (r) {
					for (; r && p.isFillChar(r);) a = r, r = r.previousSibling;
					n.setStartBefore(a ? a : n.startContainer);
				} else n.setStartBefore(n.startContainer);
			}
			return i && !p.isBody(n.startContainer) ? 1 : 0;
		},
		isEmptyBlock: function(e, t) {
			if (!e) return 0;
			if (1 != e.nodeType) return 0;
			if (t = t || new RegExp("[ 	\r\n" + p.fillChar + "]", "g"), e[s.ie ? "innerText" : "textContent"].replace(t, "").length > 0) return 0;
			for (var n in f.$isNotEmpty) if (e.getElementsByTagName(n).length) return 0;
			return 1;
		},
		setViewportOffset: function(e, t) {
			var n = 0 | parseInt(e.style.left),
				i = 0 | parseInt(e.style.top),
				o = e.getBoundingClientRect(),
				r = t.left - o.left,
				a = t.top - o.top;
			r && (e.style.left = n + r + "px"), a && (e.style.top = i + a + "px");
		},
		fillNode: function(e, t) {
			var n = s.ie ? e.createTextNode(p.fillChar) : e.createElement("br");
			t.innerHTML = "", t.appendChild(n);
		},
		moveChild: function(e, t, n) {
			for (; e.firstChild;) n && t.firstChild ? t.insertBefore(e.lastChild, t.firstChild) : t.appendChild(e.firstChild);
		},
		hasNoAttributes: function(e) {
			return s.ie ? /^<\w+\s*?>/.test(e.outerHTML) : 0 == e.attributes.length;
		},
		isCustomeNode: function(e) {
			return 1 == e.nodeType && e.getAttribute("_ue_custom_node_");
		},
		isTagNode: function(e, t) {
			return 1 == e.nodeType && new RegExp("^" + e.tagName + "$", "i").test(t);
		},
		filterNodeList: function(e, t, n) {
			var i = [];
			if (!c.isFunction(t)) {
				var o = t;
				t = function(e) {
					return -1 != c.indexOf(c.isArray(o) ? o : o.split(" "), e.tagName.toLowerCase());
				};
			}
			return c.each(e, function(e) {
				t(e) && i.push(e);
			}), 0 == i.length ? null : 1 != i.length && n ? i : i[0];
		},
		isInNodeEndBoundary: function(e, t) {
			var n = e.startContainer;
			if (3 == n.nodeType && e.startOffset != n.nodeValue.length) return 0;
			if (1 == n.nodeType && e.startOffset != n.childNodes.length) return 0;
			for (; n !== t;) {
				if (n.nextSibling) return 0;
				n = n.parentNode;
			}
			return 1;
		},
		isBoundaryNode: function(e, t) {
			for (var n; !p.isBody(e);) if (n = e, e = e.parentNode, n !== e[t]) return !1;
			return !0;
		},
		fillHtml: s.ie11below ? "&nbsp;" : "<br/>"
	},
	g = new RegExp(p.fillChar, "g");
!
function() {
	function e(e) {
		e.collapsed = e.startContainer && e.endContainer && e.startContainer === e.endContainer && e.startOffset == e.endOffset;
	}

	function t(e) {
		return !e.collapsed && 1 == e.startContainer.nodeType && e.startContainer === e.endContainer && e.endOffset - e.startOffset == 1;
	}

	function n(t, n, i, o) {
		return 1 == n.nodeType && (f.$empty[n.tagName] || f.$nonChild[n.tagName]) && (i = p.getNodeIndex(n) + (t ? 0 : 1), n = n.parentNode), t ? (o.startContainer = n, o.startOffset = i, o.endContainer || o.collapse(!0)) : (o.endContainer = n, o.endOffset = i, o.startContainer || o.collapse(!1)), e(o), o;
	}

	function i(e, t) {
		var n, i, o = e.startContainer,
			r = e.endContainer,
			a = e.startOffset,
			s = e.endOffset,
			l = e.document,
			d = l.createDocumentFragment();
		if (1 == o.nodeType && (o = o.childNodes[a] || (n = o.appendChild(l.createTextNode("")))), 1 == r.nodeType && (r = r.childNodes[s] || (i = r.appendChild(l.createTextNode("")))), o === r && 3 == o.nodeType) return d.appendChild(l.createTextNode(o.substringData(a, s - a))), t && (o.deleteData(a, s - a), e.collapse(!0)), d;
		for (var c, u, f = d, m = p.findParents(o, !0), h = p.findParents(r, !0), g = 0; m[g] == h[g];) g++;
		for (var v, b = g; v = m[b]; b++) {
			for (c = v.nextSibling, v == o ? n || (3 == e.startContainer.nodeType ? (f.appendChild(l.createTextNode(o.nodeValue.slice(a))), t && o.deleteData(a, o.nodeValue.length - a)) : f.appendChild(t ? o : o.cloneNode(!0))) : (u = v.cloneNode(!1), f.appendChild(u)); c && c !== r && c !== h[b];) v = c.nextSibling, f.appendChild(t ? c : c.cloneNode(!0)), c = v;
			f = u;
		}
		f = d, m[g] || (f.appendChild(m[g - 1].cloneNode(!1)), f = f.firstChild);
		for (var y, b = g; y = h[b]; b++) {
			if (c = y.previousSibling, y == r ? i || 3 != e.endContainer.nodeType || (f.appendChild(l.createTextNode(r.substringData(0, s))), t && r.deleteData(0, s)) : (u = y.cloneNode(!1), f.appendChild(u)), b != g || !m[g]) for (; c && c !== o;) y = c.previousSibling, f.insertBefore(t ? c : c.cloneNode(!0), f.firstChild), c = y;
			f = u;
		}
		return t && e.setStartBefore(h[g] ? m[g] ? h[g] : m[g - 1] : h[g - 1]).collapse(!0), n && p.remove(n), i && p.remove(i), d;
	}

	function o(e, t) {
		try {
			if (l && p.inDoc(l, e)) if (l.nodeValue.replace(g, "").length) l.nodeValue = l.nodeValue.replace(g, "");
			else {
				var n = l.parentNode;
				for (p.remove(l); n && p.isEmptyInlineElement(n) && (s.safari ? !(p.getPosition(n, t) & p.POSITION_CONTAINS) : !n.contains(t));) l = n.parentNode, p.remove(n), n = l;
			}
		} catch (i) {}
	}

	function r(e, t) {
		var n;
		for (e = e[t]; e && p.isFillChar(e);) n = e[t], p.remove(e), e = n;
	}
	var l, d = 0,
		u = p.fillChar,
		m = a.Range = function(e) {
			var t = this;
			t.startContainer = t.startOffset = t.endContainer = t.endOffset = null, t.document = e, t.collapsed = !0;
		};
	m.prototype = {
		cloneContents: function() {
			return this.collapsed ? null : i(this, 0);
		},
		deleteContents: function() {
			var e;
			return this.collapsed || i(this, 1), s.webkit && (e = this.startContainer, 3 != e.nodeType || e.nodeValue.length || (this.setStartBefore(e).collapse(!0), p.remove(e))), this;
		},
		extractContents: function() {
			return this.collapsed ? null : i(this, 2);
		},
		setStart: function(e, t) {
			return n(!0, e, t, this);
		},
		setEnd: function(e, t) {
			return n(!1, e, t, this);
		},
		setStartAfter: function(e) {
			return this.setStart(e.parentNode, p.getNodeIndex(e) + 1);
		},
		setStartBefore: function(e) {
			return this.setStart(e.parentNode, p.getNodeIndex(e));
		},
		setEndAfter: function(e) {
			return this.setEnd(e.parentNode, p.getNodeIndex(e) + 1);
		},
		setEndBefore: function(e) {
			return this.setEnd(e.parentNode, p.getNodeIndex(e));
		},
		setStartAtFirst: function(e) {
			return this.setStart(e, 0);
		},
		setStartAtLast: function(e) {
			return this.setStart(e, 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length);
		},
		setEndAtFirst: function(e) {
			return this.setEnd(e, 0);
		},
		setEndAtLast: function(e) {
			return this.setEnd(e, 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length);
		},
		selectNode: function(e) {
			return this.setStartBefore(e).setEndAfter(e);
		},
		selectNodeContents: function(e) {
			return this.setStart(e, 0).setEndAtLast(e);
		},
		cloneRange: function() {
			var e = this;
			return new m(e.document).setStart(e.startContainer, e.startOffset).setEnd(e.endContainer, e.endOffset);
		},
		collapse: function(e) {
			var t = this;
			return e ? (t.endContainer = t.startContainer, t.endOffset = t.startOffset) : (t.startContainer = t.endContainer, t.startOffset = t.endOffset), t.collapsed = !0, t;
		},
		shrinkBoundary: function(e) {
			function t(e) {
				return 1 == e.nodeType && !p.isBookmarkNode(e) && !f.$empty[e.tagName] && !f.$nonChild[e.tagName];
			}
			for (var n, i = this, o = i.collapsed; 1 == i.startContainer.nodeType && (n = i.startContainer.childNodes[i.startOffset]) && t(n);) i.setStart(n, 0);
			if (o) return i.collapse(!0);
			if (!e) for (; 1 == i.endContainer.nodeType && i.endOffset > 0 && (n = i.endContainer.childNodes[i.endOffset - 1]) && t(n);) i.setEnd(n, n.childNodes.length);
			return i;
		},
		getCommonAncestor: function(e, n) {
			var i = this,
				o = i.startContainer,
				r = i.endContainer;
			return o === r ? e && t(this) && (o = o.childNodes[i.startOffset], 1 == o.nodeType) ? o : n && 3 == o.nodeType ? o.parentNode : o : p.getCommonAncestor(o, r);
		},
		trimBoundary: function(e) {
			this.txtToElmBoundary();
			var t = this.startContainer,
				n = this.startOffset,
				i = this.collapsed,
				o = this.endContainer;
			if (3 == t.nodeType) {
				if (0 == n) this.setStartBefore(t);
				else if (n >= t.nodeValue.length) this.setStartAfter(t);
				else {
					var r = p.split(t, n);
					t === o ? this.setEnd(r, this.endOffset - n) : t.parentNode === o && (this.endOffset += 1), this.setStartBefore(r);
				}
				if (i) return this.collapse(!0);
			}
			return e || (n = this.endOffset, o = this.endContainer, 3 == o.nodeType && (0 == n ? this.setEndBefore(o) : (n < o.nodeValue.length && p.split(o, n), this.setEndAfter(o)))), this;
		},
		txtToElmBoundary: function(e) {
			function t(e, t) {
				var n = e[t + "Container"],
					i = e[t + "Offset"];
				3 == n.nodeType && (i ? i >= n.nodeValue.length && e["set" + t.replace(/(\w)/, function(e) {
					return e.toUpperCase();
				}) + "After"](n) : e["set" + t.replace(/(\w)/, function(e) {
					return e.toUpperCase();
				}) + "Before"](n));
			}
			return (e || !this.collapsed) && (t(this, "start"), t(this, "end")), this;
		},
		insertNode: function(e) {
			var t = e,
				n = 1;
			11 == e.nodeType && (t = e.firstChild, n = e.childNodes.length), this.trimBoundary(!0);
			var i = this.startContainer,
				o = this.startOffset,
				r = i.childNodes[o];
			return r ? i.insertBefore(e, r) : i.appendChild(e), t.parentNode === this.endContainer && (this.endOffset = this.endOffset + n), this.setStartBefore(t);
		},
		setCursor: function(e, t) {
			return this.collapse(!e).select(t);
		},
		createBookmark: function(e, t) {
			var n, i = this.document.createElement("span");
			return i.style.cssText = "display:none;line-height:0px;", i.appendChild(this.document.createTextNode("‍")), i.id = "_baidu_bookmark_start_" + (t ? "" : d++), this.collapsed || (n = i.cloneNode(!0), n.id = "_baidu_bookmark_end_" + (t ? "" : d++)), this.insertNode(i), n && this.collapse().insertNode(n).setEndBefore(n), this.setStartAfter(i), {
				start: e ? i.id : i,
				end: n ? e ? n.id : n : null,
				id: e
			};
		},
		moveToBookmark: function(e) {
			var t = e.id ? this.document.getElementById(e.start) : e.start,
				n = e.end && e.id ? this.document.getElementById(e.end) : e.end;
			return this.setStartBefore(t), p.remove(t), n ? (this.setEndBefore(n), p.remove(n)) : this.collapse(!0), this;
		},
		enlarge: function(e, t) {
			var n, i, o = p.isBody,
				r = this.document.createTextNode("");
			if (e) {
				for (i = this.startContainer, 1 == i.nodeType ? i.childNodes[this.startOffset] ? n = i = i.childNodes[this.startOffset] : (i.appendChild(r), n = i = r) : n = i;;) {
					if (p.isBlockElm(i)) {
						for (i = n;
						(n = i.previousSibling) && !p.isBlockElm(n);) i = n;
						this.setStartBefore(i);
						break;
					}
					n = i, i = i.parentNode;
				}
				for (i = this.endContainer, 1 == i.nodeType ? ((n = i.childNodes[this.endOffset]) ? i.insertBefore(r, n) : i.appendChild(r), n = i = r) : n = i;;) {
					if (p.isBlockElm(i)) {
						for (i = n;
						(n = i.nextSibling) && !p.isBlockElm(n);) i = n;
						this.setEndAfter(i);
						break;
					}
					n = i, i = i.parentNode;
				}
				r.parentNode === this.endContainer && this.endOffset--, p.remove(r);
			}
			if (!this.collapsed) {
				for (; !(0 != this.startOffset || t && t(this.startContainer) || o(this.startContainer));) this.setStartBefore(this.startContainer);
				for (; !(this.endOffset != (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) || t && t(this.endContainer) || o(this.endContainer));) this.setEndAfter(this.endContainer);
			}
			return this;
		},
		adjustmentBoundary: function() {
			if (!this.collapsed) {
				for (; !p.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setStartAfter(this.startContainer);
				for (; !p.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setEndBefore(this.endContainer);
			}
			return this;
		},
		applyInlineStyle: function(e, t, n) {
			if (this.collapsed) return this;
			this.trimBoundary().enlarge(!1, function(e) {
				return 1 == e.nodeType && p.isBlockElm(e);
			}).adjustmentBoundary();
			for (var i, o, r = this.createBookmark(), a = r.end, s = function(e) {
					return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() : !p.isWhitespace(e);
				}, l = p.getNextDomNode(r.start, !1, s), d = this.cloneRange(); l && p.getPosition(l, a) & p.POSITION_PRECEDING;) if (3 == l.nodeType || f[e][l.tagName]) {
				for (d.setStartBefore(l), i = l; i && (3 == i.nodeType || f[e][i.tagName]) && i !== a;) o = i, i = p.getNextDomNode(i, 1 == i.nodeType, null, function(t) {
					return f[e][t.tagName];
				});
				var c, u = d.setEndAfter(o).extractContents();
				if (n && n.length > 0) {
					var m, h;
					h = m = n[0].cloneNode(!1);
					for (var g, v = 1; g = n[v++];) m.appendChild(g.cloneNode(!1)), m = m.firstChild;
					c = m;
				} else c = d.document.createElement(e);
				t && p.setAttributes(c, t), c.appendChild(u), d.insertNode(n ? h : c);
				var b;
				if ("span" == e && t.style && /text\-decoration/.test(t.style) && (b = p.findParentByTagName(c, "a", !0)) ? (p.setAttributes(b, t), p.remove(c, !0), c = b) : (p.mergeSibling(c), p.clearEmptySibling(c)), p.mergeChild(c, t), l = p.getNextDomNode(c, !1, s), p.mergeToParent(c), i === a) break;
			} else l = p.getNextDomNode(l, !0, s);
			return this.moveToBookmark(r);
		},
		removeInlineStyle: function(e) {
			if (this.collapsed) return this;
			e = c.isArray(e) ? e : [e], this.shrinkBoundary().adjustmentBoundary();
			for (var t = this.startContainer, n = this.endContainer;;) {
				if (1 == t.nodeType) {
					if (c.indexOf(e, t.tagName.toLowerCase()) > -1) break;
					if ("body" == t.tagName.toLowerCase()) {
						t = null;
						break;
					}
				}
				t = t.parentNode;
			}
			for (;;) {
				if (1 == n.nodeType) {
					if (c.indexOf(e, n.tagName.toLowerCase()) > -1) break;
					if ("body" == n.tagName.toLowerCase()) {
						n = null;
						break;
					}
				}
				n = n.parentNode;
			}
			var i, o, r = this.createBookmark();
			t && (o = this.cloneRange().setEndBefore(r.start).setStartBefore(t), i = o.extractContents(), o.insertNode(i), p.clearEmptySibling(t, !0), t.parentNode.insertBefore(r.start, t)), n && (o = this.cloneRange().setStartAfter(r.end).setEndAfter(n), i = o.extractContents(), o.insertNode(i), p.clearEmptySibling(n, !1, !0), n.parentNode.insertBefore(r.end, n.nextSibling));
			for (var a, s = p.getNextDomNode(r.start, !1, function(e) {
				return 1 == e.nodeType;
			}); s && s !== r.end;) a = p.getNextDomNode(s, !0, function(e) {
				return 1 == e.nodeType;
			}), c.indexOf(e, s.tagName.toLowerCase()) > -1 && p.remove(s, !0), s = a;
			return this.moveToBookmark(r);
		},
		getClosedNode: function() {
			var e;
			if (!this.collapsed) {
				var n = this.cloneRange().adjustmentBoundary().shrinkBoundary();
				if (t(n)) {
					var i = n.startContainer.childNodes[n.startOffset];
					i && 1 == i.nodeType && (f.$empty[i.tagName] || f.$nonChild[i.tagName]) && (e = i);
				}
			}
			return e;
		},
		select: s.ie ?
		function(e, t) {
			var n;
			this.collapsed || this.shrinkBoundary();
			var i = this.getClosedNode();
			if (i && !t) {
				try {
					n = this.document.body.createControlRange(), n.addElement(i), n.select();
				} catch (a) {}
				return this;
			}
			var s, d = this.createBookmark(),
				c = d.start;
			if (n = this.document.body.createTextRange(), n.moveToElementText(c), n.moveStart("character", 1), this.collapsed) {
				if (!e && 3 != this.startContainer.nodeType) {
					var f = this.document.createTextNode(u),
						m = this.document.createElement("span");
					m.appendChild(this.document.createTextNode(u)), c.parentNode.insertBefore(m, c), c.parentNode.insertBefore(f, c), o(this.document, f), l = f, r(m, "previousSibling"), r(c, "nextSibling"), n.moveStart("character", -1), n.collapse(!0);
				}
			} else {
				var h = this.document.body.createTextRange();
				s = d.end, h.moveToElementText(s), n.setEndPoint("EndToEnd", h);
			}
			this.moveToBookmark(d), m && p.remove(m);
			try {
				n.select();
			} catch (a) {}
			return this;
		} : function(e) {
			function t(e) {
				function t(t, n, i) {
					3 == t.nodeType && t.nodeValue.length < n && (e[i + "Offset"] = t.nodeValue.length);
				}
				t(e.startContainer, e.startOffset, "start"), t(e.endContainer, e.endOffset, "end");
			}
			var n, i = p.getWindow(this.document),
				a = i.getSelection();
			if (s.gecko ? this.document.body.focus() : i.focus(), a) {
				if (a.removeAllRanges(), this.collapsed && !e) {
					var d = this.startContainer,
						c = d;
					1 == d.nodeType && (c = d.childNodes[this.startOffset]), 3 == d.nodeType && this.startOffset || (c ? c.previousSibling && 3 == c.previousSibling.nodeType : d.lastChild && 3 == d.lastChild.nodeType) || (n = this.document.createTextNode(u), this.insertNode(n), o(this.document, n), r(n, "previousSibling"), r(n, "nextSibling"), l = n, this.setStart(n, s.webkit ? 1 : 0).collapse(!0));
				}
				var f = this.document.createRange();
				if (this.collapsed && s.opera && 1 == this.startContainer.nodeType) {
					var c = this.startContainer.childNodes[this.startOffset];
					if (c) {
						for (; c && p.isBlockElm(c) && 1 == c.nodeType && c.childNodes[0];) c = c.childNodes[0];
						c && this.setStartBefore(c).collapse(!0);
					} else c = this.startContainer.lastChild, c && p.isBr(c) && this.setStartBefore(c).collapse(!0);
				}
				t(this), f.setStart(this.startContainer, this.startOffset), f.setEnd(this.endContainer, this.endOffset), a.addRange(f);
			}
			return this;
		},
		scrollToView: function(e, t) {
			e = e ? window : p.getWindow(this.document);
			var n = this,
				i = n.document.createElement("span");
			return i.innerHTML = "&nbsp;", n.cloneRange().insertNode(i), p.scrollToView(i, e, t), p.remove(i), n;
		},
		inFillChar: function() {
			var e = this.startContainer;
			return this.collapsed && 3 == e.nodeType && e.nodeValue.replace(new RegExp("^" + p.fillChar), "").length + 1 == e.nodeValue.length ? !0 : !1;
		},
		createAddress: function(e, t) {
			function n(e) {
				for (var n, i = e ? o.startContainer : o.endContainer, r = p.findParents(i, !0, function(e) {
					return !p.isBody(e);
				}), a = [], s = 0; n = r[s++];) a.push(p.getNodeIndex(n, t));
				var l = 0;
				if (t) if (3 == i.nodeType) {
					for (var d = i.previousSibling; d && 3 == d.nodeType;) l += d.nodeValue.replace(g, "").length, d = d.previousSibling;
					l += e ? o.startOffset : o.endOffset;
				} else if (i = i.childNodes[e ? o.startOffset : o.endOffset]) l = p.getNodeIndex(i, t);
				else {
					i = e ? o.startContainer : o.endContainer;
					for (var c = i.firstChild; c;) if (p.isFillChar(c)) c = c.nextSibling;
					else if (l++, 3 == c.nodeType) for (; c && 3 == c.nodeType;) c = c.nextSibling;
					else c = c.nextSibling;
				} else l = e ? p.isFillChar(i) ? 0 : o.startOffset : o.endOffset;
				return 0 > l && (l = 0), a.push(l), a;
			}
			var i = {},
				o = this;
			return i.startAddress = n(!0), e || (i.endAddress = o.collapsed ? [].concat(i.startAddress) : n()), i;
		},
		moveToAddress: function(e, t) {
			function n(e, t) {
				for (var n, o, r, a = i.document.body, s = 0, l = e.length; l > s; s++) if (r = e[s], n = a, a = a.childNodes[r], !a) {
					o = r;
					break;
				}
				t ? a ? i.setStartBefore(a) : i.setStart(n, o) : a ? i.setEndBefore(a) : i.setEnd(n, o);
			}
			var i = this;
			return n(e.startAddress, !0), !t && e.endAddress && n(e.endAddress), i;
		},
		equals: function(e) {
			for (var t in this) if (this.hasOwnProperty(t) && this[t] !== e[t]) return !1;
			return !0;
		},
		traversal: function(e, t) {
			if (this.collapsed) return this;
			for (var n = this.createBookmark(), i = n.end, o = p.getNextDomNode(n.start, !1, t); o && o !== i && p.getPosition(o, i) & p.POSITION_PRECEDING;) {
				var r = p.getNextDomNode(o, !1, t);
				e(o), o = r;
			}
			return this.moveToBookmark(n);
		}
	};
}(), function() {
	function e(e, t) {
		var n = p.getNodeIndex;
		e = e.duplicate(), e.collapse(t);
		var i = e.parentElement();
		if (!i.hasChildNodes()) return {
			container: i,
			offset: 0
		};
		for (var o, r, a = i.children, s = e.duplicate(), l = 0, d = a.length - 1, c = -1; d >= l;) {
			c = Math.floor((l + d) / 2), o = a[c], s.moveToElementText(o);
			var u = s.compareEndPoints("StartToStart", e);
			if (u > 0) d = c - 1;
			else {
				if (!(0 > u)) return {
					container: i,
					offset: n(o)
				};
				l = c + 1;
			}
		}
		if (-1 == c) {
			if (s.moveToElementText(i), s.setEndPoint("StartToStart", e), r = s.text.replace(/(\r\n|\r)/g, "\n").length, a = i.childNodes, !r) return o = a[a.length - 1], {
				container: o,
				offset: o.nodeValue.length
			};
			for (var m = a.length; r > 0;) r -= a[--m].nodeValue.length;
			return {
				container: a[m],
				offset: -r
			};
		}
		if (s.collapse(u > 0), s.setEndPoint(u > 0 ? "StartToStart" : "EndToStart", e), r = s.text.replace(/(\r\n|\r)/g, "\n").length, !r) return f.$empty[o.tagName] || f.$nonChild[o.tagName] ? {
			container: i,
			offset: n(o) + (u > 0 ? 0 : 1)
		} : {
			container: o,
			offset: u > 0 ? 0 : o.childNodes.length
		};
		for (; r > 0;) try {
			var h = o;
			o = o[u > 0 ? "previousSibling" : "nextSibling"], r -= o.nodeValue.length;
		} catch (g) {
			return {
				container: i,
				offset: n(h)
			};
		}
		return {
			container: o,
			offset: u > 0 ? -r : o.nodeValue.length + r
		};
	}

	function t(t, n) {
		if (t.item) n.selectNode(t.item(0));
		else {
			var i = e(t, !0);
			n.setStart(i.container, i.offset), 0 != t.compareEndPoints("StartToEnd", t) && (i = e(t, !1), n.setEnd(i.container, i.offset));
		}
		return n;
	}

	function n(e) {
		var t;
		try {
			t = e.getNative().createRange();
		} catch (n) {
			return null;
		}
		var i = t.item ? t.item(0) : t.parentElement();
		return (i.ownerDocument || i) === e.document ? t : null;
	}
	var i = a.Selection = function(e) {
			var t, i = this;
			i.document = e, s.ie9below && (t = p.getWindow(e).frameElement, p.on(t, "beforedeactivate", function() {
				i._bakIERange = i.getIERange();
			}), p.on(t, "activate", function() {
				try {
					!n(i) && i._bakIERange && i._bakIERange.select();
				} catch (e) {}
				i._bakIERange = null;
			})), t = e = null;
		};
	i.prototype = {
		rangeInBody: function(e, t) {
			var n = s.ie9below || t ? e.item ? e.item() : e.parentElement() : e.startContainer;
			return n === this.document.body || p.inDoc(n, this.document);
		},
		getNative: function() {
			var e = this.document;
			try {
				return e ? s.ie9below ? e.selection : p.getWindow(e).getSelection() : null;
			} catch (t) {
				return null;
			}
		},
		getIERange: function() {
			var e = n(this);
			return !e && this._bakIERange ? this._bakIERange : e;
		},
		cache: function() {
			this.clear(), this._cachedRange = this.getRange(), this._cachedStartElement = this.getStart(), this._cachedStartElementPath = this.getStartElementPath();
		},
		getStartElementPath: function() {
			if (this._cachedStartElementPath) return this._cachedStartElementPath;
			var e = this.getStart();
			return e ? p.findParents(e, !0, null, !0) : [];
		},
		clear: function() {
			this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null;
		},
		isFocus: function() {
			try {
				if (s.ie9below) {
					var e = n(this);
					return !(!e || !this.rangeInBody(e));
				}
				return !!this.getNative().rangeCount;
			} catch (t) {
				return !1;
			}
		},
		getRange: function() {
			function e(e) {
				for (var t = n.document.body.firstChild, i = e.collapsed; t && t.firstChild;) e.setStart(t, 0), t = t.firstChild;
				e.startContainer || e.setStart(n.document.body, 0), i && e.collapse(!0);
			}
			var n = this;
			if (null != n._cachedRange) return this._cachedRange;
			var i = new r.editor.dom.Range(n.document);
			if (s.ie9below) {
				var o = n.getIERange();
				if (o) try {
					t(o, i);
				} catch (a) {
					e(i);
				} else e(i);
			} else {
				var l = n.getNative();
				if (l && l.rangeCount) {
					var d = l.getRangeAt(0),
						c = l.getRangeAt(l.rangeCount - 1);
					i.setStart(d.startContainer, d.startOffset).setEnd(c.endContainer, c.endOffset), i.collapsed && p.isBody(i.startContainer) && !i.startOffset && e(i);
				} else {
					if (this._bakRange && p.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange;
					e(i);
				}
			}
			return this._bakRange = i;
		},
		getStart: function() {
			if (this._cachedStartElement) return this._cachedStartElement;
			var e, t, n, i, o = s.ie9below ? this.getIERange() : this.getRange();
			if (s.ie9below) {
				if (!o) return this.document.body.firstChild;
				if (o.item) return o.item(0);
				for (e = o.duplicate(), e.text.length > 0 && e.moveStart("character", 1), e.collapse(1), t = e.parentElement(), i = n = o.parentElement(); n = n.parentNode;) if (n == t) {
					t = i;
					break;
				}
			} else if (o.shrinkBoundary(), t = o.startContainer, 1 == t.nodeType && t.hasChildNodes() && (t = t.childNodes[Math.min(t.childNodes.length - 1, o.startOffset)]), 3 == t.nodeType) return t.parentNode;
			return t;
		},
		getText: function() {
			var e, t;
			return this.isFocus() && (e = this.getNative()) ? (t = s.ie9below ? e.createRange() : e.getRangeAt(0), s.ie9below ? t.text : t.toString()) : "";
		},
		clearRange: function() {
			this.getNative()[s.ie9below ? "empty" : "removeAllRanges"]();
		}
	};
}(), function() {
	function e(e, t) {
		var n;
		if (t.textarea) if (c.isString(t.textarea)) {
			for (var i, o = 0, r = p.getElementsByTagName(e, "textarea"); i = r[o++];) if (i.id == "ueditor_textarea_" + t.options.textarea) {
				n = i;
				break;
			}
		} else n = t.textarea;
		n || (e.appendChild(n = p.createElement(document, "textarea", {
			name: t.options.textarea,
			id: "ueditor_textarea_" + t.options.textarea,
			style: "display:none"
		})), t.textarea = n), n.value = t.hasContents() ? t.options.allHtmlEnabled ? t.getAllHtml() : t.getContent(null, null, !0) : "";
	}

	function t(e) {
		for (var t in UE.plugins) UE.plugins[t].call(e);
		e.langIsReady = !0, e.fireEvent("langReady");
	}

	function n(e) {
		for (var t in e) return t;
	}
	var i, o = 0,
		r = UE.Editor = function(e) {
			var i = this;
			i.uid = o++, u.call(i), i.commands = {}, i.options = c.clone(e || {}), i.shortcutkeys = {}, i.inputRules = [], i.outputRules = [], c.isEmptyObject(UE.I18N) ? t(i) : (i.options.lang = n(UE.I18N), t(i)), UE.instants["ueditorInstant" + i.uid] = i;
		};
	r.prototype = {
		ready: function(e) {
			var t = this;
			e && (t.isReady ? e.apply(t) : t.addListener("ready", e));
		},
		setOpt: function(e, t) {
			var n = {};
			c.isString(e) ? n[e] = t : n = e, c.extend(this.options, n, !0);
		},
		destroy: function() {
			var e = this;
			e.fireEvent("destroy");
			var t = e.container.parentNode,
				n = e.textarea;
			n ? n.style.display = "" : (n = document.createElement("textarea"), t.parentNode.insertBefore(n, t)), n.style.width = e.iframe.offsetWidth + "px", n.style.height = e.iframe.offsetHeight + "px", n.value = e.getContent(), n.id = e.key, t.innerHTML = "", p.remove(t);
			var i = e.key;
			for (var o in e) e.hasOwnProperty(o) && delete this[o];
			UE.delEditor(i);
		},
		render: function(e) {
			var t = this,
				n = t.options;
			if (c.isString(e) && (e = document.getElementById(e)), e) {
				var i = "";
				i = s.edge ? "javascript:void(function(){" + (n.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";' : "") + 'window.parent.UE.instants["ueditorInstant' + t.uid + '"]._docWrite(document);}())' : "javascript:void(function(){document.open();" + (n.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";' : "") + 'document.write("' + t._getIframeHtml() + '");document.close();}())', e.appendChild(p.createElement(document, "iframe", {
					id: "ueditor_" + t.uid,
					allowtransparency: "true",
					width: "100%",
					height: "100%",
					frameborder: "0",
					src: i
				})), setTimeout(function() {
					/%$/.test(n.initialFrameWidth) && (n.minFrameWidth = n.initialFrameWidth = e.offsetWidth, e.style.width = n.initialFrameWidth + "px"), /%$/.test(n.initialFrameHeight) && (n.minFrameHeight = n.initialFrameHeight = e.offsetHeight, e.style.height = n.initialFrameHeight + "px");
				});
			}
		},
		_getIframeHtml: function() {
			var e = this,
				t = e.options,
				n = (l && s.version < 9 ? "" : "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml' ><head><style type='text/css'>body{font-family:sans-serif;}</style>" + (t.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" + c.unhtml(t.iframeCssUrl) + "'/>" : "") + (t.initialStyle ? "<style>" + t.initialStyle + "</style>" : "") + "</head><body class='view' lang='en' ></body><script type='text/javascript' " + (l ? "defer='defer'" : "") + " id='_initialScript'>setTimeout(function(){window.parent.UE.instants['ueditorInstant" + e.uid + "']._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>";
			return n;
		},
		_docWrite: function(e) {
			var t = this,
				n = t.options;
			e.open(), n.customDomain && document.domain != location.hostname && (e.domain = document.domain), e.write(t._getIframeHtml()), e.close();
		},
		_setup: function(t) {
			var n = this,
				i = n.options;
			l ? (t.body.disabled = !0, t.body.contentEditable = !0, t.body.disabled = !1) : t.body.contentEditable = !0, t.body.spellcheck = !1, n.document = t, n.window = t.defaultView || t.parentWindow, n.iframe = n.window.frameElement, n.body = t.body, n.selection = new a.Selection(t);
			var o;
			s.gecko && (o = this.selection.getNative()) && o.removeAllRanges(), this._initEvents();
			for (var r = this.iframe.parentNode; !p.isBody(r); r = r.parentNode) if ("FORM" == r.tagName) {
				n.form = r, n.options.autoSyncData ? p.on(n.window, "blur", function() {
					e(r, n);
				}) : p.on(r, "submit", function() {
					e(this, n);
				});
				break;
			}
			if (i.initialContent) if (i.autoClearinitialContent) {
				var d = n.execCommand;
				n.execCommand = function() {
					return n.fireEvent("firstBeforeExecCommand"), d.apply(n, arguments);
				}, this._setDefaultContent(i.initialContent);
			} else this.setContent(i.initialContent, !1, !0);
			p.isEmptyNode(n.body) && (n.body.innerHTML = "<p>" + (s.ie ? "" : "<br/>") + "</p>"), i.focus && setTimeout(function() {
				n.focus(n.options.focusInEnd), !n.options.autoClearinitialContent && n._selectionChange();
			}, 0), n.container || (n.container = this.iframe.parentNode), i.fullscreen && n.ui && n.ui.setFullScreen(!0);
			try {
				n.document.execCommand("2D-position", !1, !1);
			} catch (c) {}
			try {
				n.document.execCommand("enableInlineTableEditing", !1, !1);
			} catch (c) {}
			try {
				n.document.execCommand("enableObjectResizing", !1, !1);
			} catch (c) {}
			n._bindshortcutKeys(), n.isReady = 1, n.fireEvent("ready"), i.onready && i.onready.call(n), s.ie9below || p.on(n.window, ["blur", "focus"], function(e) {
				if ("blur" == e.type) {
					n._bakRange = n.selection.getRange();
					try {
						n._bakNativeRange = n.selection.getNative().getRangeAt(0), n.selection.getNative().removeAllRanges();
					} catch (e) {
						n._bakNativeRange = null;
					}
				} else try {
					n._bakRange && n._bakRange.select();
				} catch (e) {}
			}), s.gecko && s.version <= 10902 && (n.body.contentEditable = !1, setTimeout(function() {
				n.body.contentEditable = !0;
			}, 100), setInterval(function() {
				n.body.style.height = n.iframe.offsetHeight - 20 + "px";
			}, 100)), !i.isShow && n.setHide(), i.readonly && n.setDisabled();
		},
		sync: function(t) {
			var n = this,
				i = t ? document.getElementById(t) : p.findParent(n.iframe.parentNode, function(e) {
					return "FORM" == e.tagName;
				}, !0);
			i && e(i, n);
		},
		setHeight: function(e, t) {
			e !== parseInt(this.iframe.parentNode.style.height) && $(this.iframe).parent().height(e), !t && (this.options.minFrameHeight = this.options.initialFrameHeight = e), this.iframe.style.height = e + "px", this.body.style.height = e + "px", this.fireEvent("heightChanged", e);
		},
		addshortcutkey: function(e, t) {
			var n = {};
			t ? n[e] = t : n = e, c.extend(this.shortcutkeys, n);
		},
		_bindshortcutKeys: function() {
			var e = this,
				t = this.shortcutkeys;
			e.addListener("keydown", function(n, i) {
				var o = i.keyCode || i.which;
				for (var r in t) for (var a, s = t[r].split(","), l = 0; a = s[l++];) {
					a = a.split(":");
					var d = a[0],
						c = a[1];
					(/^(ctrl)(\+shift)?\+(\d+)$/.test(d.toLowerCase()) || /^(\d+)$/.test(d)) && (("ctrl" == RegExp.$1 ? i.ctrlKey || i.metaKey : 0) && ("" != RegExp.$2 ? i[RegExp.$2.slice(1) + "Key"] : 1) && o == RegExp.$3 || o == RegExp.$1) && (-1 != e.queryCommandState(r, c) && e.execCommand(r, c), p.preventDefault(i));
				}
			});
		},
		getContent: function(e, t, n, i, o) {
			var r = this;
			if (e && c.isFunction(e) && (t = e, e = ""), t ? !t() : !this.hasContents()) return "";
			r.fireEvent("beforegetcontent");
			var a = UE.htmlparser(r.body.innerHTML, i);
			return r.filterOutputRule(a), r.fireEvent("aftergetcontent", e), a.toHtml(o);
		},
		getAllHtml: function() {
			var e = this,
				t = [];
			if (e.fireEvent("getAllHtml", t), s.ie && s.version > 8) {
				var n = "";
				c.each(e.document.styleSheets, function(e) {
					n += e.href ? '<link rel="stylesheet" type="text/css" href="' + e.href + '" />' : "<style>" + e.cssText + "</style>";
				}), c.each(e.document.getElementsByTagName("script"), function(e) {
					n += e.outerHTML;
				});
			}
			return "<html><head>" + (e.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + e.options.charset + '"/>' : "") + (n || e.document.getElementsByTagName("head")[0].innerHTML) + t.join("\n") + "</head><body " + (l && s.version < 9 ? 'class="view"' : "") + ">" + e.getContent(null, null, !0) + "</body></html>";
		},
		getPlainTxt: function() {
			var e = new RegExp(p.fillChar, "g"),
				t = this.body.innerHTML.replace(/[\n\r]/g, "");
			return t = t.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/]+>/g, "").replace(/(\n)?<\/([^>]+)>/g, function(e, t, n) {
				return f.$block[n] ? "\n" : t ? t : "";
			}), t.replace(e, "").replace(/ /g, " ").replace(/&nbsp;/g, " ");
		},
		getContentTxt: function() {
			var e = new RegExp(p.fillChar, "g");
			return this.body[s.ie ? "innerText" : "textContent"].replace(e, "").replace(/ /g, " ");
		},
		setContent: function(t, n, i) {
			function o(e) {
				return "DIV" == e.tagName && e.getAttribute("cdata_tag");
			}
			var r = this;
			r.fireEvent("beforesetcontent", t);
			var a = UE.htmlparser(t, !0);
			if (r.filterInputRule(a), t = a.toHtml(), r.body.innerHTML = (n ? r.body.innerHTML : "") + t, "p" == r.options.enterTag) {
				var l, d = this.body.firstChild;
				if (!d || 1 == d.nodeType && (f.$cdata[d.tagName] || o(d) || p.isCustomeNode(d)) && d === this.body.lastChild) this.body.innerHTML = "<p>" + (s.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML;
				else for (var c = r.document.createElement("p"); d;) {
					for (; d && (3 == d.nodeType || 1 == d.nodeType && f.p[d.tagName] && !f.$cdata[d.tagName]);) l = d.nextSibling, c.appendChild(d), d = l;
					if (c.firstChild) {
						if (!d) {
							r.body.appendChild(c);
							break;
						}
						d.parentNode.insertBefore(c, d), c = r.document.createElement("p");
					}
					d = d.nextSibling;
				}
			}
			r.fireEvent("aftersetcontent", t, [r.body]), r.fireEvent("contentchange"), !i && r._selectionChange(), r._bakRange = r._bakIERange = r._bakNativeRange = null;
			var u;
			s.gecko && (u = this.selection.getNative()) && u.removeAllRanges(), r.options.autoSyncData && r.form && e(r.form, r);
		},
		focus: function(e) {
			try {
				var t = this,
					n = t.selection.getRange();
				e ? n.setStartAtLast(t.body.lastChild).setCursor(!1, !0) : n.select(!0), this.fireEvent("focus");
			} catch (i) {}
		},
		_initEvents: function() {
			var e = this,
				t = e.document,
				n = e.window;
			e._proxyDomEvent = c.bind(e._proxyDomEvent, e), p.on(t, ["click", "contextmenu", "mousedown", "keydown", "keyup", "keypress", "mouseup", "mouseover", "mouseout", "selectstart"], e._proxyDomEvent), p.on(n, ["focus", "blur"], e._proxyDomEvent), p.on(t, ["mouseup", "keydown"], function(t) {
				"keydown" == t.type && (t.ctrlKey || t.metaKey || t.shiftKey || t.altKey) || 2 != t.button && e._selectionChange(250, t);
			});
		},
		_proxyDomEvent: function(e) {
			return this.fireEvent(e.type.replace(/^on/, ""), e);
		},
		_selectionChange: function(e, t) {
			var n, o, r = this,
				a = !1;
			if (s.ie && s.version < 9 && t && "mouseup" == t.type) {
				var l = this.selection.getRange();
				l.collapsed || (a = !0, n = t.clientX, o = t.clientY);
			}
			clearTimeout(i), i = setTimeout(function() {
				if (r.selection && r.selection.getNative()) {
					var e;
					if (a && "None" == r.selection.getNative().type) {
						e = r.document.body.createTextRange();
						try {
							e.moveToPoint(n, o);
						} catch (i) {
							e = null;
						}
					}
					var s;
					e && (s = r.selection.getIERange, r.selection.getIERange = function() {
						return e;
					}), r.selection.cache(), s && (r.selection.getIERange = s), r.selection._cachedRange && r.selection._cachedStartElement && (r.fireEvent("beforeselectionchange"), r.fireEvent("selectionchange", !! t), r.fireEvent("afterselectionchange"), r.selection.clear());
				}
			}, e || 50);
		},
		_callCmdFn: function(e, t) {
			var n, i, o = t[0].toLowerCase();
			return n = this.commands[o] || UE.commands[o], i = n && n[e], n && i || "queryCommandState" != e ? i ? ("execCommand" == e && n.noCommandReprot !== !0 && this._cmdReport(t), i.apply(this, t)) : void 0 : 0;
		},
		_cmdReport: function(e) {
			var t = e[0];
			"justify" == t || "imagefloat" == t ? this.fireEvent("funcPvUvReport", t + (e[1] || "")) : "rowspacing" == t ? this.fireEvent("funcPvUvReport", t + (e[2] || "")) : this.fireEvent("funcPvUvReport", t);
		},
		execCommand: function(e) {
			arguments[0] = arguments[0].toLowerCase(), e = e.toLowerCase();
			var t, n = this,
				i = n.commands[e] || UE.commands[e];
			return i && i.execCommand ? (i.notNeedUndo || n.__hasEnterExecCommand ? (t = this._callCmdFn("execCommand", arguments), !n._ignoreContentChange && n.fireEvent("contentchange")) : (n.__hasEnterExecCommand = !0, -1 != n.queryCommandState.apply(n, arguments) && (n.fireEvent("beforeexeccommand", e), t = this._callCmdFn("execCommand", arguments), !n._ignoreContentChange && n.fireEvent("contentchange"), n.fireEvent("afterexeccommand", e)), n.__hasEnterExecCommand = !1), !n._ignoreContentChange && n._selectionChange(), t) : null;
		},
		queryCommandState: function() {
			return this._callCmdFn("queryCommandState", arguments);
		},
		queryCommandValue: function() {
			return this._callCmdFn("queryCommandValue", arguments);
		},
		hasContents: function(e) {
			if (e) for (var t, n = 0; t = e[n++];) if (this.document.getElementsByTagName(t).length > 0) return !0;
			if (!p.isEmptyBlock(this.body)) return !0;
			for (e = ["div"], n = 0; t = e[n++];) for (var i, o = p.getElementsByTagName(this.document, t), r = 0; i = o[r++];) if (p.isCustomeNode(i)) return !0;
			return !1;
		},
		reset: function() {
			this.fireEvent("reset");
		},
		setEnabled: function() {
			var e, t = this;
			if ("false" == t.body.contentEditable) {
				t.body.contentEditable = !0, e = t.selection.getRange();
				try {
					e.moveToBookmark(t.lastBk), delete t.lastBk;
				} catch (n) {
					e.setStartAtFirst(t.body).collapse(!0);
				}
				e.select(!0), t.bkqueryCommandState && (t.queryCommandState = t.bkqueryCommandState, delete t.bkqueryCommandState), t.fireEvent("selectionchange");
			}
		},
		enable: function() {
			return this.setEnabled();
		},
		setDisabled: function(e) {
			var t = this;
			e = e ? c.isArray(e) ? e : [e] : [], "true" == t.body.contentEditable && (t.lastBk || (t.lastBk = t.selection.getRange().createBookmark(!0)), t.body.contentEditable = !1, t.bkqueryCommandState = t.queryCommandState, t.queryCommandState = function(n) {
				return -1 != c.indexOf(e, n) ? t.bkqueryCommandState.apply(t, arguments) : -1;
			}, t.fireEvent("selectionchange"));
		},
		disable: function(e) {
			return this.setDisabled(e);
		},
		_setDefaultContent: function() {
			function e() {
				var t = this;
				t.document.getElementById("initContent") && (t.body.innerHTML = "<p>" + (l ? "" : "<br/>") + "</p>", t.removeListener("firstBeforeExecCommand focus", e), setTimeout(function() {
					t.focus(), t._selectionChange();
				}, 0));
			}
			return function(t) {
				var n = this;
				n.body.innerHTML = '<p id="initContent">' + t + "</p>", n.addListener("firstBeforeExecCommand focus", e);
			};
		}(),
		setShow: function() {
			var e = this,
				t = e.selection.getRange();
			if ("none" == e.container.style.display) {
				try {
					t.moveToBookmark(e.lastBk), delete e.lastBk;
				} catch (n) {
					t.setStartAtFirst(e.body).collapse(!0);
				}
				setTimeout(function() {
					t.select(!0);
				}, 100), e.container.style.display = "";
			}
		},
		show: function() {
			return this.setShow();
		},
		setHide: function() {
			var e = this;
			e.lastBk || (e.lastBk = e.selection.getRange().createBookmark(!0)), e.container.style.display = "none";
		},
		hide: function() {
			return this.setHide();
		},
		getLang: function(e) {
			var t = UE.I18N[this.options.lang];
			if (!t) throw Error("not import language file");
			e = (e || "").split(".");
			for (var n, i = 0;
			(n = e[i++]) && (t = t[n], t););
			return t;
		},
		getContentLength: function(e, t) {
			var n = this.getContent(!1, !1, !0).length;
			if (e) {
				t = (t || []).concat(["hr", "img", "iframe"]), n = this.getContentTxt().replace(/[\t\r\n]+/g, "").length;
				for (var i, o = 0; i = t[o++];) n += this.document.getElementsByTagName(i).length;
			}
			return n;
		},
		addInputRule: function(e) {
			this.inputRules.push(e);
		},
		filterInputRule: function(e) {
			for (var t, n = 0; t = this.inputRules[n++];) t.call(this, e);
		},
		addOutputRule: function(e) {
			this.outputRules.push(e);
		},
		filterOutputRule: function(e) {
			for (var t, n = 0; t = this.outputRules[n++];) t.call(this, e);
		}
	}, c.inherits(r, u);
}(), UE.ajax = function() {
	function e(e) {
		var t = [];
		for (var n in e)"method" != n && "timeout" != n && "async" != n && "function" != (typeof e[n]).toLowerCase() && "object" != (typeof e[n]).toLowerCase() && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
		return t.join("&");
	}
	var t = "XMLHttpRequest()";
	try {
		new ActiveXObject("Msxml2.XMLHTTP"), t = "ActiveXObject('Msxml2.XMLHTTP')";
	} catch (n) {
		try {
			new ActiveXObject("Microsoft.XMLHTTP"), t = "ActiveXObject('Microsoft.XMLHTTP')";
		} catch (n) {}
	}
	var i = new Function("return new " + t);
	return {
		request: function(t, n) {
			var o = i(),
				r = !1,
				a = {
					method: "POST",
					timeout: 5e3,
					async: !0,
					data: {},
					onsuccess: function() {},
					onerror: function() {}
				};
			if ("object" == typeof t && (n = t, t = n.url), o && t) {
				var s = n ? c.extend(a, n) : a,
					l = e(s);
				c.isEmptyObject(s.data) || (l += (l ? "&" : "") + e(s.data));
				var d = setTimeout(function() {
					4 != o.readyState && (r = !0, o.abort(), clearTimeout(d));
				}, s.timeout),
					u = s.method.toUpperCase(),
					f = t + (-1 == t.indexOf("?") ? "?" : "&") + ("POST" == u ? "" : l + "&noCache=" + +new Date);
				o.open(u, f, s.async), o.onreadystatechange = function() {
					4 == o.readyState && (r || 200 != o.status ? s.onerror(o) : s.onsuccess(o));
				}, "POST" == u ? (o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send(l)) : o.send(null);
			}
		}
	};
}();
UE.filterWord = function() {
	function e(e) {
		return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<v:)/gi.test(e);
	}

	function t(e) {
		return e = e.replace(/[\d.]+\w+/g, function(e) {
			return c.transUnitToPx(e);
		});
	}

	function n(e) {
		return e.replace(/[\t\r\n]+/g, "").replace(/<!--[\s\S]*?-->/gi, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function(e) {
			if (s.opera) return "";
			try {
				var n = e.match(/width:([ \d.]*p[tx])/i)[1],
					i = e.match(/height:([ \d.]*p[tx])/i)[1],
					o = e.match(/src=\s*"([^"]*)"/i)[1];
				return '<img width="' + t(n) + '" height="' + t(i) + '" src="' + o + '" />';
			} catch (r) {
				return "";
			}
		}).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/gi, function(e, t, n, i) {
			return "class" == t && "MsoListParagraph" == i ? e : "";
		}).replace(/<(font|span)[^>]*>\s*<\/\1>/gi, "").replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function(e, n, i, o) {
			for (var r, a = [], s = o.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").split(/;\s*/g), l = 0; r = s[l]; l++) {
				var d, c, u = r.split(":");
				if (2 == u.length) {
					if (d = u[0].toLowerCase(), c = u[1].toLowerCase(), /^(background)\w*/.test(d) && 0 == c.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(d) && /^0\w+$/.test(c)) continue;
					switch (d) {
					case "mso-padding-alt":
					case "mso-padding-top-alt":
					case "mso-padding-right-alt":
					case "mso-padding-bottom-alt":
					case "mso-padding-left-alt":
					case "mso-margin-alt":
					case "mso-margin-top-alt":
					case "mso-margin-right-alt":
					case "mso-margin-bottom-alt":
					case "mso-margin-left-alt":
					case "mso-height":
					case "mso-width":
					case "mso-vertical-align-alt":
						/<table/.test(n) || (a[l] = d.replace(/^mso-|-alt$/g, "") + ":" + t(c));
						continue;

					case "horiz-align":
						a[l] = "text-align:" + c;
						continue;

					case "vert-align":
						a[l] = "vertical-align:" + c;
						continue;

					case "font-color":
					case "mso-foreground":
						a[l] = "color:" + c;
						continue;

					case "mso-background":
					case "mso-highlight":
						a[l] = "background:" + c;
						continue;

					case "mso-default-height":
						a[l] = "min-height:" + t(c);
						continue;

					case "mso-default-width":
						a[l] = "min-width:" + t(c);
						continue;

					case "mso-padding-between-alt":
						a[l] = "border-collapse:separate;border-spacing:" + t(c);
						continue;

					case "text-line-through":
						("single" == c || "double" == c) && (a[l] = "text-decoration:line-through");
						continue;

					case "mso-zero-height":
						"yes" == c && (a[l] = "display:none");
						continue;

					case "background":
						break;

					case "margin":
						if (!/[1-9]/.test(c)) continue;

					case "font-family":
						c = u[1].replace(/'([^\s']+)'/g, "$1"), /'([^']+)'/.test(c) || (a[l] = "font-family:" + c);
						continue;
					}
					if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(d) || /text\-indent|padding|margin/.test(d) && /\-[\d.]+/.test(c)) continue;
					a[l] = d + ":" + u[1];
				}
			}
			return n + (a.length ? ' style="' + a.join(";").replace(/;{2,}/g, ";") + '"' : "");
		}).replace(/[\d]+(\.\d+)?(cm|pt)(?=[^<]*>)/g, function(e) {
			return c.transUnitToPx(e);
		});
	}
	return function(t) {
		return e(t) ? n(t) : t;
	};
}();
!
function() {
	function e(e, t, n) {
		return e.push(m), t + (n ? 1 : -1);
	}

	function t(e, t) {
		for (var n = 0; t > n; n++) e.push(u);
	}

	function n(a, s, l, d) {
		switch (a.type) {
		case "root":
			for (var c, u = 0; c = a.children[u++];) l && "element" == c.type && !f.$inlineWithA[c.tagName] && u > 1 && (e(s, d, !0), t(s, d)), n(c, s, l, d);
			break;

		case "text":
			i(a, s);
			break;

		case "element":
			o(a, s, l, d);
			break;

		case "comment":
			r(a, s, l);
		}
		return s;
	}

	function i(e, t) {
		t.push("pre" == e.parentNode.tagName ? e.data : e.data.replace(/[ ]{2}/g, " &nbsp;"));
	}

	function o(i, o, r, a) {
		var s = "";
		if (i.attrs) {
			s = [];
			var l = i.attrs;
			for (var d in l) s.push(d + (void 0 !== l[d] ? '="' + c.unhtml(l[d]) + '"' : ""));
			s = s.join(" ");
		}
		if (o.push("<" + i.tagName + (s ? " " + s : "") + (f.$empty[i.tagName] ? "/" : "") + ">"), r && !f.$inlineWithA[i.tagName] && "pre" != i.tagName && i.children && i.children.length && (a = e(o, a, !0), t(o, a)), i.children && i.children.length) for (var u, m = 0; u = i.children[m++];) r && "element" == u.type && !f.$inlineWithA[u.tagName] && m > 1 && (e(o, a), t(o, a)), n(u, o, r, a);
		f.$empty[i.tagName] || (r && !f.$inlineWithA[i.tagName] && "pre" != i.tagName && i.children && i.children.length && (a = e(o, a), t(o, a)), o.push("</" + i.tagName + ">"));
	}

	function r(e, t) {
		t.push("<!--" + e.data + "-->");
	}

	function a(e, t) {
		var n;
		if ("element" == e.type && e.getAttr("id") == t) return e;
		if (e.children && e.children.length) for (var i, o = 0; i = e.children[o++];) if (n = a(i, t)) return n;
	}

	function s(e, t, n) {
		if ("element" == e.type && e.tagName == t && n.push(e), e.children && e.children.length) for (var i, o = 0; i = e.children[o++];) s(i, t, n);
	}

	function l(e, t) {
		if (e.children && e.children.length) for (var n, i = 0; n = e.children[i];) l(n, t), n.parentNode && (n.children && n.children.length && t(n), n.parentNode && i++);
		else t(e);
	}
	var d = UE.uNode = function(e) {
			this.type = e.type, this.data = e.data, this.tagName = e.tagName, this.parentNode = e.parentNode, this.attrs = e.attrs || {}, this.children = e.children;
		},
		u = "    ",
		m = "\n";
	d.createElement = function(e) {
		return /[<>]/.test(e) ? UE.htmlparser(e).children[0] : new d({
			type: "element",
			children: [],
			tagName: e
		});
	}, d.createText = function(e) {
		return new UE.uNode({
			type: "text",
			data: c.unhtml(e || "")
		});
	}, d.prototype = {
		toHtml: function(e) {
			var t = [];
			return n(this, t, e, 0), t.join("");
		},
		innerHTML: function(e) {
			if ("element" != this.type || f.$empty[this.tagName]) return this;
			if (c.isString(e)) {
				if (this.children) for (var t, n = 0; t = this.children[n++];) t.parentNode = null;
				this.children = [];
				for (var t, i = UE.htmlparser(e), n = 0; t = i.children[n++];) this.children.push(t), t.parentNode = this;
				return this;
			}
			var i = new UE.uNode({
				type: "root",
				children: this.children
			});
			return i.toHtml();
		},
		innerText: function(e) {
			if ("element" != this.type || f.$empty[this.tagName]) return this;
			if (e) {
				if (this.children) for (var t, n = 0; t = this.children[n++];) t.parentNode = null;
				return this.children = [], this.appendChild(d.createText(e)), this;
			}
			return this.toHtml().replace(/<[^>]+>/g, "");
		},
		getData: function() {
			return "element" == this.type ? "" : this.data;
		},
		firstChild: function() {
			return this.children ? this.children[0] : null;
		},
		lastChild: function() {
			return this.children ? this.children[this.children.length - 1] : null;
		},
		previousSibling: function() {
			for (var e, t = this.parentNode, n = 0; e = t.children[n]; n++) if (e === this) return 0 == n ? null : t.children[n - 1];
		},
		nextSibling: function() {
			for (var e, t = this.parentNode, n = 0; e = t.children[n++];) if (e === this) return t.children[n];
		},
		replaceChild: function(e, t) {
			if (this.children) {
				e.parentNode && e.parentNode.removeChild(e);
				for (var n, i = 0; n = this.children[i]; i++) if (n === t) return this.children.splice(i, 1, e), t.parentNode = null, e.parentNode = this, e;
			}
		},
		appendChild: function(e) {
			if ("root" == this.type || "element" == this.type && !f.$empty[this.tagName]) {
				this.children || (this.children = []), e.parentNode && e.parentNode.removeChild(e);
				for (var t, n = 0; t = this.children[n]; n++) if (t === e) {
					this.children.splice(n, 1);
					break;
				}
				return this.children.push(e), e.parentNode = this, e;
			}
		},
		insertBefore: function(e, t) {
			if (this.children) {
				e.parentNode && e.parentNode.removeChild(e);
				for (var n, i = 0; n = this.children[i]; i++) if (n === t) return this.children.splice(i, 0, e), e.parentNode = this, e;
			}
		},
		insertAfter: function(e, t) {
			if (this.children) {
				e.parentNode && e.parentNode.removeChild(e);
				for (var n, i = 0; n = this.children[i]; i++) if (n === t) return this.children.splice(i + 1, 0, e), e.parentNode = this, e;
			}
		},
		removeChild: function(e, t) {
			if (this.children) for (var n, i = 0; n = this.children[i]; i++) if (n === e) {
				if (this.children.splice(i, 1), n.parentNode = null, t && n.children && n.children.length) for (var o, r = 0; o = n.children[r]; r++) this.children.splice(i + r, 0, o), o.parentNode = this;
				return n;
			}
		},
		getAttr: function(e) {
			return this.attrs && this.attrs[e.toLowerCase()];
		},
		setAttr: function(e, t) {
			if (!e) return void delete this.attrs;
			if (this.attrs || (this.attrs = {}), c.isObject(e)) for (var n in e) e[n] ? this.attrs[n.toLowerCase()] = e[n] : delete this.attrs[n];
			else t ? this.attrs[e.toLowerCase()] = t : delete this.attrs[e];
		},
		getIndex: function() {
			for (var e, t = this.parentNode, n = 0; e = t.children[n]; n++) if (e === this) return n;
			return -1;
		},
		getNodeById: function(e) {
			var t;
			if (this.children && this.children.length) for (var n, i = 0; n = this.children[i++];) if (t = a(n, e)) return t;
		},
		getNodesByTagName: function(e) {
			e = c.trim(e).replace(/[ ]{2,}/g, " ").split(" ");
			var t = [],
				n = this;
			return c.each(e, function(e) {
				if (n.children && n.children.length) for (var i, o = 0; i = n.children[o++];) s(i, e, t);
			}), t;
		},
		getStyle: function(e) {
			var t = this.getAttr("style");
			if (!t) return "";
			var n = new RegExp(e + ":([^;]+)", "i"),
				i = t.match(n);
			return i && i[0] ? i[1] : "";
		},
		setStyle: function(e, t) {
			function n(e, t) {
				var n = new RegExp(e + ":([^;]+;?)", "gi");
				i = i.replace(n, ""), t && (i = e + ":" + c.unhtml(t) + ";" + i);
			}
			var i = this.getAttr("style");
			if (i || (i = ""), c.isObject(e)) for (var o in e) n(o, e[o]);
			else n(e, t);
			this.setAttr("style", c.trim(i));
		},
		traversal: function(e) {
			return this.children && this.children.length && l(this, e), this;
		}
	};
}();
UE.htmlparser = function(e, t) {
	function n(e, t) {
		if (m[e.tagName]) {
			var n = d.createElement(m[e.tagName]);
			e.appendChild(n), n.appendChild(d.createText(t)), e = n;
		} else e.appendChild(d.createText(t));
	}

	function i(e, t, n) {
		var o;
		if (o = u[t]) {
			for (var r, s = e;
			"root" != s.type;) {
				if (c.isArray(o) ? -1 != c.indexOf(o, s.tagName) : o == s.tagName) {
					e = s, r = !0;
					break;
				}
				s = s.parentNode;
			}
			r || (e = i(e, c.isArray(o) ? o[0] : o));
		}
		var l = new d({
			parentNode: e,
			type: "element",
			tagName: t.toLowerCase(),
			children: f.$empty[t] ? null : []
		});
		if (n) {
			for (var m, h = {}; m = a.exec(n);) h[m[1].toLowerCase()] = c.unhtml(m[2] || m[3] || m[4]);
			l.attrs = h;
		}
		return e.children.push(l), f.$empty[t] ? e : l;
	}

	function o(e, t) {
		e.children.push(new d({
			type: "comment",
			data: t,
			parentNode: e
		}));
	}
	var r = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
		a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
		s = {
			b: 1,
			code: 1,
			i: 1,
			u: 1,
			strike: 1,
			s: 1,
			tt: 1,
			strong: 1,
			q: 1,
			samp: 1,
			em: 1,
			span: 1,
			sub: 1,
			img: 1,
			sup: 1,
			font: 1,
			big: 1,
			small: 1,
			iframe: 1,
			a: 1,
			br: 1,
			pre: 1
		};
	e = e.replace(new RegExp(p.fillChar, "g"), ""), t || (e = e.replace(new RegExp("[\\r\\t\\n" + (t ? "" : " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (t ? "" : " ") + "]*", "g"), function(e, n) {
		return n && s[n.toLowerCase()] ? e.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : e.replace(new RegExp("^[\\r\\n" + (t ? "" : " ") + "]+"), "").replace(new RegExp("[\\r\\n" + (t ? "" : " ") + "]+$"), "");
	}));
	for (var l, d = UE.uNode, u = {
		td: "tr",
		tr: ["tbody", "thead", "tfoot"],
		tbody: "table",
		th: "tr",
		thead: "table",
		tfoot: "table",
		caption: "table",
		li: ["ul", "ol"],
		dt: "dl",
		dd: "dl",
		option: "select"
	}, m = {
		ol: "li",
		ul: "li"
	}, h = 0, g = 0, v = new d({
		type: "root",
		children: []
	}), b = v; l = r.exec(e);) {
		h = l.index;
		try {
			if (h > g && n(b, e.slice(g, h)), l[3]) b = i(b, l[3].toLowerCase(), l[4]);
			else if (l[1]) {
				if ("root" != b.type) {
					for (var y = b;
					"element" == b.type && b.tagName != l[1].toLowerCase();) if (b = b.parentNode, "root" == b.type) throw b = y, "break";
					b = b.parentNode;
				}
			} else l[2] && o(b, l[2]);
		} catch (C) {}
		g = r.lastIndex;
	}
	return g < e.length && n(b, e.slice(g)), v;
}, UE.filterNode = function() {
	function e(t, n) {
		switch (t.type) {
		case "text":
			break;

		case "element":
			var i;
			if (i = n[t.tagName]) if ("-" === i) t.parentNode.removeChild(t);
			else if (c.isFunction(i)) {
				var o = t.parentNode,
					r = t.getIndex();
				if (i(t), t.parentNode) {
					if (t.children) for (var a, s = 0; a = t.children[s];) e(a, n), a.parentNode && s++;
				} else for (var a, s = r; a = o.children[s];) e(a, n), a.parentNode && s++;
			} else {
				var l = i.$;
				if (l && t.attrs) {
					var d, u = {};
					for (var m in l) {
						if (d = t.getAttr(m), "style" == m && c.isArray(l[m])) {
							var h = [];
							c.each(l[m], function(e) {
								var n;
								(n = t.getStyle(e)) && h.push(e + ":" + n);
							}), d = h.join(";");
						}
						d && (u[m] = d);
					}
					t.attrs = u;
				}
				if (t.children) for (var a, s = 0; a = t.children[s];) e(a, n), a.parentNode && s++;
			} else if (f.$cdata[t.tagName]) t.parentNode.removeChild(t);
			else {
				var o = t.parentNode,
					r = t.getIndex();
				t.parentNode.removeChild(t, !0);
				for (var a, s = r; a = o.children[s];) e(a, n), a.parentNode && s++;
			}
			break;

		case "comment":
			t.parentNode.removeChild(t);
		}
	}
	return function(t, n) {
		if (c.isEmptyObject(n)) return t;
		var i;
		(i = n["-"]) && c.each(i.split(" "), function(e) {
			n[e] = "-";
		});
		for (var o, r = 0; o = t.children[r];) e(o, n), o.parentNode && r++;
		return t;
	};
}();
UE.plugins.defaultfilter = function() {
	var e = this;
	e.setOpt("allowDivTransToP", !0), e.addInputRule(function(t) {
		var n, i = this.options.allowDivTransToP;
		t.traversal(function(t) {
			if ("element" == t.type) {
				if (!f.$cdata[t.tagName] && e.options.autoClearEmptyNode && f.$inline[t.tagName] && !f.$empty[t.tagName] && (!t.attrs || c.isEmptyObject(t.attrs))) return void(t.firstChild() ? "span" != t.tagName || t.attrs && !c.isEmptyObject(t.attrs) || t.parentNode.removeChild(t, !0) : t.parentNode.removeChild(t));
				switch (t.tagName) {
				case "style":
				case "script":
					t.setAttr({
						cdata_tag: t.tagName,
						cdata_data: encodeURIComponent(t.innerText() || "")
					}), t.tagName = "div", t.removeChild(t.firstChild());
					break;

				case "a":
					(n = t.getAttr("href")) && t.setAttr("_href", n);
					break;

				case "img":
					n = t.getAttr("src"), /^wewebkit-fake-url:\/\//i.test(n) ? t.parentNode.removeChild(t) : /^data:/.test(n) || t.setAttr("_src", n);
					break;

				case "span":
					s.webkit && (n = t.getStyle("white-space")) && /nowrap|normal/.test(n) && (t.setStyle("white-space", ""), e.options.autoClearEmptyNode && c.isEmptyObject(t.attrs) && t.parentNode.removeChild(t, !0));
					break;

				case "p":
					(n = t.getAttr("align")) && (t.setAttr("align"), t.setStyle("text-align", n)), t.firstChild() || t.innerHTML("<br />");
					break;

				case "div":
					if (t.getAttr("cdata_tag")) break;
					if (n = t.getAttr("class"), n && /^line number\d+/.test(n)) break;
					if (!i) break;
					for (var o, r = UE.uNode.createElement("p"); o = t.firstChild();)"text" != o.type && UE.dom.dtd.$block[o.tagName] ? r.firstChild() ? (t.parentNode.insertBefore(r, t), r = UE.uNode.createElement("p")) : t.parentNode.insertBefore(o, t) : r.appendChild(o);
					r.firstChild() && t.parentNode.insertBefore(r, t), t.parentNode.removeChild(t);
					break;

				case "dl":
					t.tagName = "ul";
					break;

				case "dt":
				case "dd":
					t.tagName = "li";
					break;

				case "li":
					var a = t.getAttr("class");
					a && /list\-/.test(a) || t.setAttr();
					var l = t.getNodesByTagName("ol ul");
					UE.utils.each(l, function(e) {
						t.parentNode.insertAfter(e, t);
					});
					break;

				case "td":
				case "th":
				case "caption":
					t.children && t.children.length || t.appendChild(s.ie11below ? UE.uNode.createText(" ") : UE.uNode.createElement("br"));
				}
			}
			"comment" == t.type && t.parentNode.removeChild(t);
		});
	}), e.addOutputRule(function(t) {
		var n;
		t.traversal(function(t) {
			if ("element" == t.type) {
				if (e.options.autoClearEmptyNode && f.$inline[t.tagName] && !f.$empty[t.tagName] && (!t.attrs || c.isEmptyObject(t.attrs))) return void(t.firstChild() ? "span" != t.tagName || t.attrs && !c.isEmptyObject(t.attrs) || t.parentNode.removeChild(t, !0) : t.parentNode.removeChild(t));
				switch (t.tagName) {
				case "div":
					(n = t.getAttr("cdata_tag")) && (t.tagName = n, t.appendChild(UE.uNode.createText(t.getAttr("cdata_data"))), t.setAttr({
						cdata_tag: "",
						cdata_data: ""
					}));
					break;

				case "a":
					(n = t.getAttr("_href")) && t.setAttr({
						href: n,
						_href: ""
					});
					break;

				case "img":
					(n = t.getAttr("_src")) && t.setAttr({
						src: t.getAttr("_src"),
						_src: ""
					});
					break;

				case "p":
					t.firstChild() || t.innerHTML("<br />");
				}
			}
		});
	});
}, UE.commands.inserthtml = {
	execCommand: function(e, t, n) {
		var i, o, r = this;
		if (t && r.fireEvent("beforeinserthtml", t) !== !0) {
			if (i = r.selection.getRange(), o = i.document.createElement("div"), o.style.display = "inline", !n) {
				var a = UE.htmlparser(t);
				r.options.filterRules && UE.filterNode(a, r.options.filterRules), r.filterInputRule(a), t = a.toHtml();
			}
			o.innerHTML = c.trim(t);
			var l = [];
			if (!i.collapsed) {
				var d = i.startContainer;
				if (p.isFillChar(d) && i.setStartBefore(d), d = i.endContainer, p.isFillChar(d) && i.setEndAfter(d), i.txtToElmBoundary(), i.endContainer && 1 == i.endContainer.nodeType && (d = i.endContainer.childNodes[i.endOffset], d && p.isBr(d) && i.setEndAfter(d)), 0 == i.startOffset && (d = i.startContainer, p.isBoundaryNode(d, "firstChild") && (d = i.endContainer, i.endOffset == (3 == d.nodeType ? d.nodeValue.length : d.childNodes.length) && p.isBoundaryNode(d, "lastChild") && (r.body.innerHTML = "<p>" + (s.ie ? "" : "<br/>") + "</p>", i.setStart(r.body.firstChild, 0).collapse(!0)))), !i.collapsed && i.deleteContents(), 1 == i.startContainer.nodeType) {
					var u, m = i.startContainer.childNodes[i.startOffset];
					if (m && p.isBlockElm(m) && (u = m.previousSibling) && p.isBlockElm(u)) {
						for (i.setEnd(u, u.childNodes.length).collapse(); m.firstChild;) u.appendChild(m.firstChild);
						p.remove(m);
					}
				}
			}
			var m, h, u, v, b, y = 0;
			i.inFillChar() && (m = i.startContainer, p.isFillChar(m) ? (i.setStartBefore(m).collapse(!0), p.remove(m)) : p.isFillChar(m, !0) && (m.nodeValue = m.nodeValue.replace(g, ""), i.startOffset--, i.collapsed && i.collapse(!0)));
			var C = p.findParentByTagName(i.startContainer, "li", !0);
			if (C) {
				for (var N, x; m = o.firstChild;) {
					for (; m && (3 == m.nodeType || !p.isBlockElm(m) || "HR" == m.tagName);) N = m.nextSibling, i.insertNode(m).collapse(), l.push(m), x = m, m = N;
					if (m) if (/^(ol|ul)$/i.test(m.tagName)) {
						for (; m.firstChild;) x = m.firstChild, p.insertAfter(C, m.firstChild), l.push(x), C = C.nextSibling;
						p.remove(m);
					} else {
						var w;
						N = m.nextSibling, w = r.document.createElement("li"), p.insertAfter(C, w), w.appendChild(m), x = m, l.push(x), m = N, C = w;
					}
				}
				C = p.findParentByTagName(i.startContainer, "li", !0), p.isEmptyBlock(C) && p.remove(C), x && i.setStartAfter(x).collapse(!0).select(!0);
			} else {
				for (; m = o.firstChild;) {
					if (y) {
						for (var E = r.document.createElement("p"); m && (3 == m.nodeType || !f.$block[m.tagName]);) b = m.nextSibling, E.appendChild(m), m = b;
						E.firstChild && (m = E);
					}
					if (i.insertNode(m), l.push(m), b = m.nextSibling, !y && m.nodeType == p.NODE_ELEMENT && p.isBlockElm(m) && (h = p.findParent(m, function(e) {
						return p.isBlockElm(e);
					}), h && "body" != h.tagName.toLowerCase() && (!f[h.tagName] || !f[h.tagName][m.nodeName] || m.parentNode !== h))) {
						if (f[h.tagName][m.nodeName]) for (v = m.parentNode; v !== h;) u = v, v = v.parentNode;
						else u = h;
						p.breakParent(m, u || v);
						var u = m.previousSibling;
						p.trimWhiteTextNode(u), u.childNodes.length || p.remove(u), !s.ie && (N = m.nextSibling) && p.isBlockElm(N) && N.lastChild && !p.isBr(N.lastChild) && N.appendChild(r.document.createElement("br")), y = 1;
					}
					var N = m.nextSibling;
					if (!o.firstChild && N && p.isBlockElm(N)) {
						i.setStart(N, 0).collapse(!0);
						break;
					}
					i.setEndAfter(m).collapse();
				}
				if (m = i.startContainer, b && p.isBr(b) && p.remove(b), p.isBlockElm(m) && p.isEmptyNode(m)) if (b = m.nextSibling) p.remove(m), 1 == b.nodeType && f.$block[b.tagName] && i.setStart(b, 0).collapse(!0).shrinkBoundary();
				else try {
					m.innerHTML = s.ie ? p.fillChar : "<br/>";
				} catch (T) {
					i.setStartBefore(m), p.remove(m);
				}
				try {
					i.select(!0);
				} catch (T) {}
			}
			return setTimeout(function() {
				i = r.selection.getRange(), i.scrollToView(r.autoHeightEnabled, r.autoHeightEnabled ? p.getXY(r.iframe).y : 0), r.fireEvent("afterinserthtml");
			}, 200), l;
		}
	}
}, UE.plugins.autosubmit = function() {
	var e = this;
	e.commands.autosubmit = {
		execCommand: function() {
			var e = this,
				t = p.findParentByTagName(e.iframe, "form", !1);
			if (t) {
				if (e.fireEvent("beforesubmit") === !1) return;
				e.sync(), t.submit();
			}
		}
	}, e.addshortcutkey({
		autosubmit: "ctrl+13"
	});
}, UE.commands.imagefloat = {
	execCommand: function(e, t) {
		var n = this,
			i = n.selection.getRange();
		if (!i.collapsed) {
			var o = i.getClosedNode();
			if (o && "IMG" == o.tagName) switch (t) {
			case "left":
			case "right":
			case "none":
				for (var r, a, s, l = o.parentNode; f.$inline[l.tagName] || "A" == l.tagName;) l = l.parentNode;
				if (r = l, "P" == r.tagName && "center" == p.getStyle(r, "text-align")) {
					if (!p.isBody(r) && 1 == p.getChildCount(r, function(e) {
						return !p.isBr(e) && !p.isWhitespace(e);
					})) if (a = r.previousSibling, s = r.nextSibling, a && s && 1 == a.nodeType && 1 == s.nodeType && a.tagName == s.tagName && p.isBlockElm(a)) {
						for (a.appendChild(r.firstChild); s.firstChild;) a.appendChild(s.firstChild);
						p.remove(r), p.remove(s);
					} else p.setStyle(r, "text-align", "");
					i.selectNode(o).select();
				}
				p.setStyle(o, "float", "none" == t ? "" : t), "none" == t && p.removeAttributes(o, "align");
				break;

			case "center":
				if ("center" != n.queryCommandValue("imagefloat")) {
					for (l = o.parentNode, p.setStyle(o, "float", ""), p.removeAttributes(o, "align"), r = o; l && 1 == p.getChildCount(l, function(e) {
						return !p.isBr(e) && !p.isWhitespace(e);
					}) && (f.$inline[l.tagName] || "A" == l.tagName);) r = l, l = l.parentNode;
					i.setStartBefore(r).setCursor(!1), l = n.document.createElement("div"), l.appendChild(r), p.setStyle(r, "float", ""), n.execCommand("insertHtml", '<p id="_img_parent_tmp" style="text-align:center">' + l.innerHTML + "</p>"), r = n.document.getElementById("_img_parent_tmp");
					var d = r.getElementsByTagName("img")[0];
					r.removeAttribute("id"), r = r.firstChild, i.selectNode(d).select(), s = r.parentNode.nextSibling, s && p.isEmptyNode(s) && p.remove(s);
				}
			}
		}
	},
	queryCommandValue: function() {
		var e, t, n = this.selection.getRange();
		return n.collapsed ? "none" : (e = n.getClosedNode(), e && 1 == e.nodeType && "IMG" == e.tagName ? (t = e.getAttribute("align") || p.getComputedStyle(e, "float"), "none" == t && (t = "center" == p.getComputedStyle(e.parentNode, "text-align") ? "center" : t), {
			left: 1,
			right: 1,
			center: 1
		}[t] ? t : "none") : "none");
	},
	queryCommandState: function() {
		var e, t = this.selection.getRange();
		return t.collapsed ? -1 : (e = t.getClosedNode(), e && 1 == e.nodeType && "IMG" == e.tagName ? 0 : -1);
	}
}, UE.plugins.justify = function() {
	var e = p.isBlockElm,
		t = {
			left: 1,
			right: 1,
			center: 1,
			justify: 1
		},
		n = function(t, n) {
			var i = t.createBookmark(),
				o = function(e) {
					return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() && !p.isBookmarkNode(e) : !p.isWhitespace(e);
				};
			t.enlarge(!0);
			for (var r, a = t.createBookmark(), s = p.getNextDomNode(a.start, !1, o), l = t.cloneRange(); s && !(p.getPosition(s, a.end) & p.POSITION_FOLLOWING);) if (3 != s.nodeType && e(s)) s = p.getNextDomNode(s, !0, o);
			else {
				for (l.setStartBefore(s); s && s !== a.end && !e(s);) r = s, s = p.getNextDomNode(s, !1, null, function(t) {
					return !e(t);
				});
				l.setEndAfter(r);
				var d = l.getCommonAncestor();
				if (!p.isBody(d) && e(d)) p.setStyles(d, c.isString(n) ? {
					"text-align": n
				} : n), s = d;
				else {
					var u = t.document.createElement("p");
					p.setStyles(u, c.isString(n) ? {
						"text-align": n
					} : n);
					var f = l.extractContents();
					u.appendChild(f), l.insertNode(u), s = u;
				}
				s = p.getNextDomNode(s, !1, o);
			}
			return t.moveToBookmark(a).moveToBookmark(i);
		};
	UE.commands.justify = {
		execCommand: function(e, t) {
			var i, o = this.selection.getRange();
			return o.collapsed && (i = this.document.createTextNode("p"), o.insertNode(i)), n(o, t), i && (o.setStartBefore(i).collapse(!0), p.remove(i)), o.select(), !0;
		},
		queryCommandValue: function() {
			var e = this.selection.getStart(),
				n = p.getComputedStyle(e, "text-align");
			return t[n] ? n : "left";
		},
		queryCommandState: function() {
			var e = this.selection.getStart(),
				t = e && p.findParentByTagName(e, ["td", "th", "caption"], !0);
			return t ? -1 : 0;
		}
	};
}, UE.plugins.font = function() {
	function e(e) {
		for (var t;
		(t = e.parentNode) && "SPAN" == t.tagName && 1 == p.getChildCount(t, function(e) {
			return !p.isBookmarkNode(e) && !p.isBr(e);
		});) t.style.cssText += e.style.cssText, p.remove(e, !0), e = t;
	}

	function t(e, t, n) {
		if (a[t] && (e.adjustmentBoundary(), !e.collapsed && 1 == e.startContainer.nodeType)) {
			var i = e.startContainer.childNodes[e.startOffset];
			if (i && p.isTagNode(i, "span")) {
				var o = e.createBookmark();
				c.each(p.getElementsByTagName(i, "span"), function(e) {
					e.parentNode && !p.isBookmarkNode(e) && ("backcolor" != t || p.getComputedStyle(e, "background-color").toLowerCase() !== n) && (p.removeStyle(e, a[t]), 0 == e.style.cssText.replace(/^\s+$/, "").length && p.remove(e, !0));
				}), e.moveToBookmark(o);
			}
		}
	}

	function n(n, i, o) {
		var r, a = n.collapsed,
			l = n.createBookmark();
		if (a) for (r = l.start.parentNode; f.$inline[r.tagName];) r = r.parentNode;
		else r = p.getCommonAncestor(l.start, l.end);
		c.each(p.getElementsByTagName(r, "span"), function(t) {
			if (t.parentNode && !p.isBookmarkNode(t)) {
				if (/\s*border\s*:\s*none;?\s*/i.test(t.style.cssText)) return void(/^\s*border\s*:\s*none;?\s*$/.test(t.style.cssText) ? p.remove(t, !0) : p.removeStyle(t, "border"));
				if (/border/i.test(t.style.cssText) && "SPAN" == t.parentNode.tagName && /border/i.test(t.parentNode.style.cssText) && (t.style.cssText = t.style.cssText.replace(/border[^:]*:[^;]+;?/gi, "")), "fontborder" != i || "none" != o) for (var n = t.nextSibling; n && 1 == n.nodeType && "SPAN" == n.tagName;) if (p.isBookmarkNode(n) && "fontborder" == i) t.appendChild(n), n = t.nextSibling;
				else {
					if (n.style.cssText == t.style.cssText && (p.moveChild(n, t), p.remove(n)), t.nextSibling === n) break;
					n = t.nextSibling;
				}
				if (e(t), s.ie && s.version > 8) {
					var r = p.findParent(t, function(e) {
						return "SPAN" == e.tagName && /background-color/.test(e.style.cssText);
					});
					r && !/background-color/.test(t.style.cssText) && (t.style.backgroundColor = r.style.backgroundColor);
				}
			}
		}), n.moveToBookmark(l), t(n, i, o);
	}
	var i = this,
		o = {
			forecolor: "color",
			backcolor: "background-color",
			fontsize: "font-size",
			fontfamily: "font-family",
			underline: "text-decoration",
			strikethrough: "text-decoration",
			fontborder: "border"
		},
		r = {
			underline: 1,
			strikethrough: 1,
			fontborder: 1
		},
		a = {
			forecolor: "color",
			backcolor: "background-color",
			fontsize: "font-size",
			fontfamily: "font-family"
		};
	i.setOpt({
		fontfamily: [{
			name: "songti",
			val: "宋体,SimSun"
		}, {
			name: "yahei",
			val: "微软雅黑,Microsoft YaHei"
		}, {
			name: "kaiti",
			val: "楷体,楷体_GB2312, SimKai"
		}, {
			name: "heiti",
			val: "黑体, SimHei"
		}, {
			name: "lishu",
			val: "隶书, SimLi"
		}, {
			name: "andaleMono",
			val: "andale mono"
		}, {
			name: "arial",
			val: "arial, helvetica,sans-serif"
		}, {
			name: "arialBlack",
			val: "arial black,avant garde"
		}, {
			name: "comicSansMs",
			val: "comic sans ms"
		}, {
			name: "impact",
			val: "impact,chicago"
		}, {
			name: "timesNewRoman",
			val: "times new roman"
		}],
		fontsize: [12, 14, 15, 16, 18, 20, 24]
	}), i.addInputRule(function(e) {
		c.each(e.getNodesByTagName("u s del font strike"), function(e) {
			if ("font" == e.tagName) {
				var t = [];
				for (var n in e.attrs) switch (n) {
				case "size":
					t.push("font-size:" + e.attrs[n] + "px");
					break;

				case "color":
					t.push("color:" + e.attrs[n]);
					break;

				case "face":
					t.push("font-family:" + e.attrs[n]);
					break;

				case "style":
					t.push(e.attrs[n]);
				}
				e.attrs = {
					style: t.join(";")
				};
			} else {
				var i = "u" == e.tagName ? "underline" : "line-through";
				e.attrs = {
					style: (e.getAttr("style") || "") + "text-decoration:" + i + ";"
				};
			}
			e.tagName = "span";
		});
	});
	for (var l in o)!
	function(e, t) {
		UE.commands[e] = {
			execCommand: function(i, o) {
				o = o || (this.queryCommandState(i) ? "none" : "underline" == i ? "underline" : "fontborder" == i ? "1px solid #000" : "line-through");
				var a, l = this,
					c = this.selection.getRange();
				if ("default" == o) c.collapsed && (a = l.document.createTextNode("font"), c.insertNode(a).select()), l.execCommand("removeFormat", "span,a", t), a && (c.setStartBefore(a).collapse(!0), p.remove(a)), n(c, i, o), c.select();
				else if (c.collapsed) {
					var u = p.findParentByTagName(c.startContainer, "span", !0);
					if (a = l.document.createTextNode("font"), !u || u.children.length || u[s.ie ? "innerText" : "textContent"].replace(g, "").length) {
						if (c.insertNode(a), c.selectNode(a).select(), u = c.document.createElement("span"), r[e]) {
							if (p.findParentByTagName(a, "a", !0)) return c.setStartBefore(a).setCursor(), void p.remove(a);
							l.execCommand("removeFormat", "span,a", t);
						}
						if (u.style.cssText = t + ":" + o, a.parentNode.insertBefore(u, a), !s.ie || s.ie && 9 == s.version) for (var f = u.parentNode; !p.isBlockElm(f);)"SPAN" == f.tagName && (u.style.cssText = f.style.cssText + ";" + u.style.cssText), f = f.parentNode;
						d ? setTimeout(function() {
							c.setStart(u, 0).collapse(!0), n(c, i, o), c.select();
						}) : (c.setStart(u, 0).collapse(!0), n(c, i, o), c.select());
					} else c.insertNode(a), r[e] && (c.selectNode(a).select(), l.execCommand("removeFormat", "span,a", t, null), u = p.findParentByTagName(a, "span", !0), c.setStartBefore(a)), u && (u.style.cssText += ";" + t + ":" + o), c.collapse(!0).select();
					p.remove(a);
				} else r[e] && l.queryCommandValue(e) && l.execCommand("removeFormat", "span,a", t), c = l.selection.getRange(), c.applyInlineStyle("span", {
					style: t + ":" + o
				}), n(c, i, o), c.select();
				return !0;
			},
			queryCommandValue: function(e) {
				var n = this.selection.getStart();
				if ("underline" == e || "strikethrough" == e) {
					for (var i, o = n; o && !p.isBlockElm(o) && !p.isBody(o);) {
						if (1 == o.nodeType && (i = p.getComputedStyle(o, t), "none" != i)) return i;
						o = o.parentNode;
					}
					return "none";
				}
				if ("fontborder" == e) {
					for (var r, a = n; a && f.$inline[a.tagName];) {
						if ((r = p.getComputedStyle(a, "border")) && /1px/.test(r) && /solid/.test(r)) return r;
						a = a.parentNode;
					}
					return "";
				}
				if ("FontSize" == e) {
					var s = p.getComputedStyle(n, t),
						a = /^([\d\.]+)(\w+)$/.exec(s);
					return a ? Math.floor(a[1]) + a[2] : s;
				}
				return p.getComputedStyle(n, t);
			},
			queryCommandState: function(e) {
				if (!r[e]) return 0;
				var t = this.queryCommandValue(e);
				return "fontborder" == e ? /1px/.test(t) && /solid/.test(t) : t == ("underline" == e ? "underline" : "line-through");
			}
		};
	}(l, o[l]);
}, UE.plugins.removeformat = function() {
	var e = this;
	e.setOpt({
		removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
		removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
	}), e.commands.removeformat = {
		execCommand: function(e, t, n, i, o) {
			function r(e) {
				if (3 == e.nodeType || "span" != e.tagName.toLowerCase()) return 0;
				if (s.ie) {
					var t = e.attributes;
					if (t.length) {
						for (var n = 0, i = t.length; i > n; n++) if (t[n].specified) return 0;
						return 1;
					}
				}
				return !e.attributes.length;
			}

			function l(e) {
				var t = e.createBookmark();
				if (e.collapsed && e.enlarge(!0), !o) {
					var i = p.findParentByTagName(e.startContainer, "a", !0);
					i && e.setStartBefore(i), i = p.findParentByTagName(e.endContainer, "a", !0), i && e.setEndAfter(i);
				}
				for (d = e.createBookmark(), v = d.start;
				(c = v.parentNode) && !p.isBlockElm(c);) p.breakParent(v, c), p.clearEmptySibling(v);
				if (d.end) {
					for (v = d.end;
					(c = v.parentNode) && !p.isBlockElm(c);) p.breakParent(v, c), p.clearEmptySibling(v);
					for (var a, s = p.getNextDomNode(d.start, !1, g); s && s != d.end;) a = p.getNextDomNode(s, !0, g), f.$empty[s.tagName.toLowerCase()] || p.isBookmarkNode(s) || (u.test(s.tagName) ? n ? (p.removeStyle(s, n), r(s) && "text-decoration" != n && p.remove(s, !0)) : p.remove(s, !0) : f.$tableContent[s.tagName] || f.$list[s.tagName] || (p.removeAttributes(s, m), r(s) && p.remove(s, !0))), s = a;
				}
				var l = d.start.parentNode;
				!p.isBlockElm(l) || f.$tableContent[l.tagName] || f.$list[l.tagName] || p.removeAttributes(l, m), l = d.end.parentNode, d.end && p.isBlockElm(l) && !f.$tableContent[l.tagName] && !f.$list[l.tagName] && p.removeAttributes(l, m), e.moveToBookmark(d).moveToBookmark(t);
				for (var h, v = e.startContainer, b = e.collapsed; 1 == v.nodeType && p.isEmptyNode(v) && f.$removeEmpty[v.tagName];) h = v.parentNode, e.setStartBefore(v), e.startContainer === e.endContainer && e.endOffset--, p.remove(v), v = h;
				if (!b) for (v = e.endContainer; 1 == v.nodeType && p.isEmptyNode(v) && f.$removeEmpty[v.tagName];) h = v.parentNode, e.setEndBefore(v), p.remove(v), v = h;
			}
			var d, c, u = new RegExp("^(?:" + (t || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"),
				m = n ? [] : (i || this.options.removeFormatAttributes).split(","),
				h = new a.Range(this.document),
				g = function(e) {
					return 1 == e.nodeType;
				};
			h = this.selection.getRange(), l(h), h.select();
		}
	};
}, UE.plugins.blockquote = function() {
	function e(e) {
		return p.filterNodeList(e.selection.getStartElementPath(), "blockquote");
	}
	var t = this;
	t.commands.blockquote = {
		execCommand: function(t, n) {
			var i = this.selection.getRange(),
				o = e(this),
				r = f.blockquote,
				a = i.createBookmark();
			if (o) {
				var s = i.startContainer,
					l = p.isBlockElm(s) ? s : p.findParent(s, function(e) {
						return p.isBlockElm(e);
					}),
					d = i.endContainer,
					c = p.isBlockElm(d) ? d : p.findParent(d, function(e) {
						return p.isBlockElm(e);
					});
				l = p.findParentByTagName(l, "li", !0) || l, c = p.findParentByTagName(c, "li", !0) || c, "LI" == l.tagName || "TD" == l.tagName || l === o || p.isBody(l) ? p.remove(o, !0) : p.breakParent(l, o), l !== c && (o = p.findParentByTagName(c, "blockquote"), o && ("LI" == c.tagName || "TD" == c.tagName || p.isBody(c) ? o.parentNode && p.remove(o, !0) : p.breakParent(c, o)));
				for (var u, m = p.getElementsByTagName(this.document, "blockquote"), h = 0; u = m[h++];) u.childNodes.length ? p.getPosition(u, l) & p.POSITION_FOLLOWING && p.getPosition(u, c) & p.POSITION_PRECEDING && p.remove(u, !0) : p.remove(u);
			} else {
				for (var g = i.cloneRange(), v = 1 == g.startContainer.nodeType ? g.startContainer : g.startContainer.parentNode, b = v, y = 1;;) {
					if (p.isBody(v)) {
						b !== v ? i.collapsed ? (g.selectNode(b), y = 0) : g.setStartBefore(b) : g.setStart(v, 0);
						break;
					}
					if (!r[v.tagName]) {
						i.collapsed ? g.selectNode(b) : g.setStartBefore(b);
						break;
					}
					b = v, v = v.parentNode;
				}
				if (y) for (b = v = v = 1 == g.endContainer.nodeType ? g.endContainer : g.endContainer.parentNode;;) {
					if (p.isBody(v)) {
						b !== v ? g.setEndAfter(b) : g.setEnd(v, v.childNodes.length);
						break;
					}
					if (!r[v.tagName]) {
						g.setEndAfter(b);
						break;
					}
					b = v, v = v.parentNode;
				}
				v = i.document.createElement("blockquote"), p.setAttributes(v, n), v.appendChild(g.extractContents()), g.insertNode(v);
				for (var C, N = p.getElementsByTagName(v, "blockquote"), h = 0; C = N[h++];) C.parentNode && p.remove(C, !0);
			}
			i.moveToBookmark(a).select();
		},
		queryCommandState: function() {
			return e(this) ? 1 : 0;
		}
	};
}, UE.commands.indent = {
	execCommand: function() {
		var e = this,
			t = e.queryCommandState("indent") ? "0em" : e.options.indentValue || "2em";
		e.execCommand("Paragraph", "p", {
			style: "text-indent:" + t
		});
	},
	queryCommandState: function() {
		var e = p.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
		return e && e.style.textIndent && parseInt(e.style.textIndent) ? 1 : 0;
	}
}, UE.plugins.selectall = function() {
	var e = this;
	e.commands.selectall = {
		execCommand: function() {
			var e = this,
				t = e.body,
				n = e.selection.getRange();
			n.selectNodeContents(t), p.isEmptyBlock(t) && (s.opera && t.firstChild && 1 == t.firstChild.nodeType && n.setStartAtFirst(t.firstChild), n.collapse(!0)), n.select(!0);
		},
		notNeedUndo: 1
	}, e.addshortcutkey({
		selectAll: "ctrl+65"
	});
}, UE.plugins.paragraph = function() {
	var e = this,
		t = p.isBlockElm,
		n = ["TD", "LI", "PRE"],
		i = function(e, i, o, r) {
			var a, s = e.createBookmark(),
				l = function(e) {
					return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() && !p.isBookmarkNode(e) : !p.isWhitespace(e);
				};
			e.enlarge(!0);
			for (var d, u = e.createBookmark(), f = p.getNextDomNode(u.start, !1, l), m = e.cloneRange(); f && !(p.getPosition(f, u.end) & p.POSITION_FOLLOWING);) if (3 != f.nodeType && t(f)) f = p.getNextDomNode(f, !0, l);
			else {
				for (m.setStartBefore(f); f && f !== u.end && !t(f);) d = f, f = p.getNextDomNode(f, !1, null, function(e) {
					return !t(e);
				});
				m.setEndAfter(d), a = e.document.createElement(i), o && (p.setAttributes(a, o), r && "customstyle" == r && o.style && (a.style.cssText = o.style)), a.appendChild(m.extractContents()), p.isEmptyNode(a) && p.fillChar(e.document, a), m.insertNode(a);
				var h = a.parentNode;
				t(h) && !p.isBody(a.parentNode) && -1 == c.indexOf(n, h.tagName) && (r && "customstyle" == r || (h.getAttribute("dir") && a.setAttribute("dir", h.getAttribute("dir")), h.style.cssText && (a.style.cssText = h.style.cssText + ";" + a.style.cssText), h.style.textAlign && !a.style.textAlign && (a.style.textAlign = h.style.textAlign), h.style.textIndent && !a.style.textIndent && (a.style.textIndent = h.style.textIndent), h.style.padding && !a.style.padding && (a.style.padding = h.style.padding)), o && /h\d/i.test(h.tagName) && !/h\d/i.test(a.tagName) ? (p.setAttributes(h, o), r && "customstyle" == r && o.style && (h.style.cssText = o.style), p.remove(a, !0), a = h) : p.remove(a.parentNode, !0)), f = -1 != c.indexOf(n, h.tagName) ? h : a, f = p.getNextDomNode(f, !1, l);
			}
			return e.moveToBookmark(u).moveToBookmark(s);
		};
	e.setOpt("paragraph", {
		p: "",
		h1: "",
		h2: "",
		h3: "",
		h4: "",
		h5: "",
		h6: ""
	}), e.commands.paragraph = {
		execCommand: function(e, t, n, o) {
			var r = this.selection.getRange();
			if (r.collapsed) {
				var a = this.document.createTextNode("p");
				if (r.insertNode(a), s.ie) {
					var l = a.previousSibling;
					l && p.isWhitespace(l) && p.remove(l), l = a.nextSibling, l && p.isWhitespace(l) && p.remove(l);
				}
			}
			if (r = i(r, t, n, o), a && (r.setStartBefore(a).collapse(!0), pN = a.parentNode, p.remove(a), p.isBlockElm(pN) && p.isEmptyNode(pN) && p.fillNode(this.document, pN)), s.gecko && r.collapsed && 1 == r.startContainer.nodeType) {
				var d = r.startContainer.childNodes[r.startOffset];
				d && 1 == d.nodeType && d.tagName.toLowerCase() == t && r.setStart(d, 0).collapse(!0);
			}
			return r.select(), !0;
		},
		queryCommandValue: function() {
			var e = p.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
			return e ? e.tagName.toLowerCase() : "";
		}
	};
}, UE.plugins.horizontal = function() {
	var e = this;
	e.commands.horizontal = {
		execCommand: function(e) {
			var t = this;
			if (-1 !== t.queryCommandState(e)) {
				t.execCommand("insertHtml", "<hr>");
				var n = t.selection.getRange(),
					i = n.startContainer;
				if (1 == i.nodeType && !i.childNodes[n.startOffset]) {
					var o;
					(o = i.childNodes[n.startOffset - 1]) && 1 == o.nodeType && "HR" == o.tagName && ("p" == t.options.enterTag ? (o = t.document.createElement("p"), n.insertNode(o), n.setStart(o, 0).setCursor()) : (o = t.document.createElement("br"), n.insertNode(o), n.setStartBefore(o).setCursor()));
				}
				return !0;
			}
		},
		queryCommandState: function() {
			return p.filterNodeList(this.selection.getStartElementPath(), "table") ? -1 : 0;
		}
	}, e.addListener("delkeydown", function(e, t) {
		var n = this.selection.getRange();
		if (n.txtToElmBoundary(!0), p.isStartInblock(n)) {
			var i = n.startContainer,
				o = i.previousSibling;
			if (o && p.isTagNode(o, "hr")) return p.remove(o), n.select(), p.preventDefault(t), !0;
		}
	});
}, UE.plugins.rowspacing = function() {
	var e = this;
	e.setOpt({
		rowspacingtop: ["5", "10", "15", "20", "25"],
		rowspacingbottom: ["5", "10", "15", "20", "25"]
	}), e.commands.rowspacing = {
		execCommand: function(e, t, n) {
			return this.execCommand("paragraph", "p", {
				style: "margin-" + n + ":" + t + "px"
			}), !0;
		},
		queryCommandValue: function(e, t) {
			var n, i = p.filterNodeList(this.selection.getStartElementPath(), function(e) {
				return p.isBlockElm(e);
			});
			return i ? (n = p.getComputedStyle(i, "margin-" + t).replace(/[^\d]/g, ""), n ? n : 0) : 0;
		}
	};
}, UE.plugins.lineheight = function() {
	var e = this;
	e.setOpt({
		lineheight: ["1", "1.5", "1.75", "2", "3", "4", "5"]
	}), e.commands.lineheight = {
		execCommand: function(e, t) {
			return this.execCommand("paragraph", "p", {
				style: "line-height:" + ("1" == t ? "normal" : t + "em")
			}), !0;
		},
		queryCommandValue: function() {
			var e = p.filterNodeList(this.selection.getStartElementPath(), function(e) {
				return p.isBlockElm(e);
			});
			if (e) {
				var t = p.getComputedStyle(e, "line-height");
				return "normal" == t ? 1 : t.replace(/[^\d.]*/gi, "");
			}
		}
	};
}, UE.plugins.insertcode = function() {
	var e = this;
	e.ready(function() {
		c.cssRule("pre", "pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;}", e.document);
	}), e.setOpt("insertcode", {
		as3: "ActionScript3",
		bash: "Bash/Shell",
		cpp: "C/C++",
		css: "Css",
		cf: "CodeFunction",
		"c#": "C#",
		delphi: "Delphi",
		diff: "Diff",
		erlang: "Erlang",
		groovy: "Groovy",
		html: "Html",
		java: "Java",
		jfx: "JavaFx",
		js: "Javascript",
		pl: "Perl",
		php: "Php",
		plain: "Plain Text",
		ps: "PowerShell",
		python: "Python",
		ruby: "Ruby",
		scala: "Scala",
		sql: "Sql",
		vb: "Vb",
		xml: "Xml"
	}), e.commands.insertcode = {
		execCommand: function(e, t) {
			var n = this,
				i = n.selection.getRange(),
				o = p.findParentByTagName(i.startContainer, "pre", !0);
			if (o) o.className = "brush:" + t + ";toolbar:false;";
			else {
				var r = "";
				if (i.collapsed) r = s.ie && s.ie11below ? s.version <= 8 ? "&nbsp;" : "" : "<br/>";
				else {
					var a = i.extractContents(),
						l = n.document.createElement("div");
					l.appendChild(a), c.each(UE.filterNode(UE.htmlparser(l.innerHTML.replace(/[\r\t]/g, "")), n.options.filterTxtRules).children, function(e) {
						if (s.ie && s.ie11below && s.version > 8)"element" == e.type ? "br" == e.tagName ? r += "\n" : f.$empty[e.tagName] || (c.each(e.children, function(t) {
							"element" == t.type ? "br" == t.tagName ? r += "\n" : f.$empty[e.tagName] || (r += t.innerText()) : r += t.data;
						}), /\n$/.test(r) || (r += "\n")) : r += e.data + "\n", !e.nextSibling() && /\n$/.test(r) && (r = r.replace(/\n$/, ""));
						else if (s.ie && s.ie11below)"element" == e.type ? "br" == e.tagName ? r += "<br>" : f.$empty[e.tagName] || (c.each(e.children, function(t) {
							"element" == t.type ? "br" == t.tagName ? r += "<br>" : f.$empty[e.tagName] || (r += t.innerText()) : r += t.data;
						}), /br>$/.test(r) || (r += "<br>")) : r += e.data + "<br>", !e.nextSibling() && /<br>$/.test(r) && (r = r.replace(/<br>$/, ""));
						else if (r += "element" == e.type ? f.$empty[e.tagName] ? "" : e.innerText() : e.data, !/br\/?\s*>$/.test(r)) {
							if (!e.nextSibling()) return;
							r += "<br>";
						}
					});
				}
				n.execCommand("inserthtml", '<pre id="coder"class="brush:' + t + ';toolbar:false">' + r + "</pre>", !0), o = n.document.getElementById("coder"), p.removeAttributes(o, "id");
				var d = o.previousSibling;
				d && (3 == d.nodeType && 1 == d.nodeValue.length && s.ie && 6 == s.version || p.isEmptyBlock(d)) && p.remove(d);
				var i = n.selection.getRange();
				p.isEmptyBlock(o) ? i.setStart(o, 0).setCursor(!1, !0) : i.selectNodeContents(o).select();
			}
		},
		queryCommandValue: function() {
			var e = this.selection.getStartElementPath(),
				t = "";
			return c.each(e, function(e) {
				if ("PRE" == e.nodeName) {
					var n = e.className.match(/brush:([^;]+)/);
					return t = n && n[1] ? n[1] : "", !1;
				}
			}), t;
		}
	}, e.addOutputRule(function(e) {
		c.each(e.getNodesByTagName("pre"), function() {});
	}), e.notNeedCodeQuery = {
		help: 1,
		undo: 1,
		redo: 1,
		source: 1,
		print: 1,
		searchreplace: 1,
		fullscreen: 1,
		preview: 1,
		insertparagraph: 1,
		elementpath: 1,
		highlightcode: 1,
		insertcode: 1,
		inserthtml: 1,
		selectall: 1
	};
	e.queryCommandState;
	e.queryCommandState = function(e) {
		var t = this;
		return !t.notNeedCodeQuery[e.toLowerCase()] && t.selection && t.queryCommandValue("insertcode") ? -1 : UE.Editor.prototype.queryCommandState.apply(this, arguments);
	}, e.addListener("beforeenterkeydown", function() {
		var t = e.selection.getRange(),
			n = p.findParentByTagName(t.startContainer, "pre", !0);
		if (n) {
			if (e.fireEvent("saveScene"), t.collapsed || t.deleteContents(), s.ie) if (s.version > 8) {
				var i = e.document.createTextNode("\n"),
					o = t.startContainer;
				if (0 == t.startOffset) {
					var r = o.previousSibling;
					if (r) {
						t.insertNode(i);
						var a = e.document.createTextNode(" ");
						t.setStartAfter(i).insertNode(a).setStart(a, 0).collapse(!0).select(!0);
					}
				} else {
					t.insertNode(i).setStartAfter(i);
					var a = e.document.createTextNode(" ");
					o = t.startContainer.childNodes[t.startOffset], o && !/^\n/.test(o.nodeValue) && t.setStartBefore(i), t.insertNode(a).setStart(a, 0).collapse(!0).select(!0);
				}
			} else {
				var l = e.document.createElement("br");
				t.insertNode(l), t.insertNode(e.document.createTextNode(p.fillChar)), t.setStartAfter(l), n = l.previousSibling;
				for (var d; n;) if (d = n, n = n.previousSibling, !n || "BR" == n.nodeName) {
					n = d;
					break;
				}
				if (n) {
					for (var c = ""; n && "BR" != n.nodeName && new RegExp("^[ " + p.fillChar + "]*$").test(n.nodeValue);) c += n.nodeValue, n = n.nextSibling;
					if ("BR" != n.nodeName) {
						var u = n.nodeValue.match(new RegExp("^([ " + p.fillChar + "]+)"));
						u && u[1] && (c += u[1]);
					}
					c = e.document.createTextNode(c), t.insertNode(c).setStartAfter(c);
				}
				t.collapse(!0).select();
			} else {
				var n, l = e.document.createElement("br");
				t.insertNode(l).setStartAfter(l).collapse(!0);
				var f = l.nextSibling;
				f ? t.setStartAfter(l) : t.insertNode(l.cloneNode(!1)), n = l.previousSibling;
				for (var d; n;) if (d = n, n = n.previousSibling, !n || "BR" == n.nodeName) {
					n = d;
					break;
				}
				if (n) {
					for (var c = ""; n && "BR" != n.nodeName && new RegExp("^[\\s" + p.fillChar + "]*$").test(n.nodeValue);) c += n.nodeValue, n = n.nextSibling;
					if (n && n.nodeValue && n.nodeName && "BR" != n.nodeName) {
						var u = n.nodeValue.match(new RegExp("^([\\s" + p.fillChar + "]+)"));
						u && u[1] && (c += u[1]);
					}
					c && (c = e.document.createTextNode(c), t.insertNode(c).setStartAfter(c));
				}
				t.collapse(!0).select(!0);
			}
			return e.fireEvent("saveScene"), !0;
		}
	}), e.addListener("tabkeydown", function(t, n) {
		var i = e.selection.getRange(),
			o = p.findParentByTagName(i.startContainer, "pre", !0);
		if (o) {
			if (e.fireEvent("saveScene"), n.shiftKey);
			else if (i.collapsed) {
				var r = e.document.createTextNode("    ");
				i.insertNode(r).setStartAfter(r).collapse(!0).select(!0);
			} else {
				for (var a = i.createBookmark(), s = a.start.previousSibling; s;) {
					if (o.firstChild === s && !p.isBr(s)) {
						o.insertBefore(e.document.createTextNode("    "), s);
						break;
					}
					if (p.isBr(s)) {
						o.insertBefore(e.document.createTextNode("    "), s.nextSibling);
						break;
					}
					s = s.previousSibling;
				}
				var l = a.end;
				for (s = a.start.nextSibling, o.firstChild === a.start && o.insertBefore(e.document.createTextNode("    "), s.nextSibling); s && s !== l;) {
					if (p.isBr(s) && s.nextSibling) {
						if (s.nextSibling === l) break;
						o.insertBefore(e.document.createTextNode("    "), s.nextSibling);
					}
					s = s.nextSibling;
				}
				i.moveToBookmark(a).select();
			}
			return e.fireEvent("saveScene"), !0;
		}
	}), e.addListener("beforeinserthtml", function() {
		{
			var e = this,
				t = e.selection.getRange();
			p.findParentByTagName(t.startContainer, "pre", !0);
		}
	}), e.addListener("keydown", function(e, t) {
		var n = this,
			i = t.keyCode || t.which;
		if (40 == i) {
			var o, r = n.selection.getRange(),
				a = r.startContainer;
			if (r.collapsed && (o = p.findParentByTagName(r.startContainer, "pre", !0)) && !o.nextSibling) {
				for (var s = o.lastChild; s && "BR" == s.nodeName;) s = s.previousSibling;
				(s === a || r.startContainer === o && r.startOffset == o.childNodes.length) && (n.execCommand("insertparagraph"), p.preventDefault(t));
			}
		}
	}), e.addListener("delkeydown", function(t, n) {
		var i = this.selection.getRange();
		i.txtToElmBoundary(!0);
		var o = i.startContainer;
		if (p.isTagNode(o, "pre") && i.collapsed && p.isStartInblock(i)) {
			var r = e.document.createElement("p");
			return p.fillNode(e.document, r), o.parentNode.insertBefore(r, o), p.remove(o), i.setStart(r, 0).setCursor(!1, !0), p.preventDefault(n), !0;
		}
	});
}, UE.commands.cleardoc = {
	execCommand: function() {
		var e = this,
			t = e.options.enterTag,
			n = e.selection.getRange();
		"br" == t ? (e.body.innerHTML = "<br/>", n.setStart(e.body, 0).setCursor()) : (e.body.innerHTML = "<p>" + (l ? "" : "<br/>") + "</p>", n.setStart(e.body.firstChild, 0).setCursor(!1, !0)), setTimeout(function() {
			e.fireEvent("clearDoc");
		}, 0);
	}
}, UE.plugins.wordcount = function() {
	var e = this;
	e.addListener("contentchange", function() {
		e.fireEvent("wordcount");
	});
	var t;
	e.addListener("ready", function() {
		var e = this;
		p.on(e.body, "keyup", function(n) {
			var i = n.keyCode || n.which,
				o = {
					16: 1,
					18: 1,
					20: 1,
					37: 1,
					38: 1,
					39: 1,
					40: 1
				};
			i in o || (clearTimeout(t), t = setTimeout(function() {
				e.fireEvent("wordcount");
			}, 200));
		});
	});
}, UE.plugins.dragdrop = function() {
	var e = this;
	e.ready(function() {
		p.on(this.body, "dragend", function() {
			var t = e.selection.getRange(),
				n = t.getClosedNode() || e.selection.getStart();
			if (n && "IMG" == n.tagName) {
				for (var i, o = n.previousSibling;
				(i = n.nextSibling) && 1 == i.nodeType && "SPAN" == i.tagName && !i.firstChild;) p.remove(i);
				(!o || 1 != o.nodeType || p.isEmptyBlock(o)) && o || i && (!i || p.isEmptyBlock(i)) || (o && "P" == o.tagName && !p.isEmptyBlock(o) ? (o.appendChild(n), p.moveChild(i, o), p.remove(i)) : i && "P" == i.tagName && !p.isEmptyBlock(i) && i.insertBefore(n, i.firstChild), o && "P" == o.tagName && p.isEmptyBlock(o) && p.remove(o), i && "P" == i.tagName && p.isEmptyBlock(i) && p.remove(i), t.selectNode(n).select(), e.fireEvent("saveScene"));
			}
		});
	});
}, UE.plugins.undo = function() {
	function e(e, t) {
		if (e.length != t.length) return 0;
		for (var n = 0, i = e.length; i > n; n++) if (e[n] != t[n]) return 0;
		return 1;
	}

	function t(t, n) {
		return t.collapsed != n.collapsed ? 0 : e(t.startAddress, n.startAddress) && e(t.endAddress, n.endAddress) ? 1 : 0;
	}

	function n() {
		this.list = [], this.index = 0, this.hasUndo = !1, this.hasRedo = !1, this.undo = function() {
			if (this.hasUndo) {
				if (!this.list[this.index - 1] && 1 == this.list.length) return void this.reset();
				for (; this.list[this.index].content == this.list[this.index - 1].content;) if (this.index--, 0 == this.index) return this.restore(0);
				this.restore(--this.index);
			}
		}, this.redo = function() {
			if (this.hasRedo) {
				for (; this.list[this.index].content == this.list[this.index + 1].content;) if (this.index++, this.index == this.list.length - 1) return this.restore(this.index);
				this.restore(++this.index);
			}
		}, this.restore = function() {
			var e = this.editor,
				t = this.list[this.index],
				n = UE.htmlparser(t.content.replace(u, ""));
			e.options.autoClearEmptyNode = !1, e.filterInputRule(n), e.options.autoClearEmptyNode = m, e.document.body.innerHTML = n.toHtml(), e.fireEvent("afterscencerestore"), s.ie && c.each(p.getElementsByTagName(e.document, "td th caption p"), function(t) {
				p.isEmptyNode(t) && p.fillNode(e.document, t);
			});
			try {
				var i = new a.Range(e.document).moveToAddress(t.address);
				i.select(f[i.startContainer.nodeName.toLowerCase()]);
			} catch (o) {}
			this.editor.fireEvent("hide_common_popup"), this.update(), this.clearKey(), e.fireEvent("reset", !0);
		}, this.getScene = function() {
			var e = this.editor,
				t = e.selection.getRange(),
				n = t.createAddress(!1, !0);
			e.fireEvent("beforegetscene");
			var i = UE.htmlparser(e.body.innerHTML);
			e.options.autoClearEmptyNode = !1, e.filterOutputRule(i), e.options.autoClearEmptyNode = m;
			var o = i.toHtml();
			return e.fireEvent("aftergetscene"), {
				address: n,
				content: o
			};
		}, this.save = function(e, n) {
			clearTimeout(o);
			var i = this.getScene(n),
				r = this.list[this.index];
			r && r.content == i.content && (e ? 1 : t(r.address, i.address)) || (this.list = this.list.slice(0, this.index + 1), this.list.push(i), this.list.length > l && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update());
		}, this.update = function() {
			this.hasRedo = !! this.list[this.index + 1], this.hasUndo = !! this.list[this.index - 1];
		}, this.reset = function() {
			this.list = [], this.index = 0, this.hasUndo = !1, this.hasRedo = !1, this.clearKey(), this.editor.fireEvent("hide_common_popup");
		}, this.clearKey = function() {
			v = 0, h = null;
		};
	}

	function i() {
		this.undoManger.save();
	}
	var o, r = this,
		l = r.options.maxUndoCount || 20,
		d = r.options.maxInputCount || 20,
		u = new RegExp(p.fillChar + "|</hr>", "gi"),
		f = {
			ol: 1,
			ul: 1,
			table: 1,
			tbody: 1,
			tr: 1,
			body: 1
		},
		m = r.options.autoClearEmptyNode;
	r.undoManger = new n, r.undoManger.editor = r, r.addListener("saveScene", function() {
		var e = Array.prototype.splice.call(arguments, 1);
		this.undoManger.save.apply(this.undoManger, e);
	}), r.addListener("beforeexeccommand", i), r.addListener("afterexeccommand", i), r.addListener("reset", function(e, t) {
		t || this.undoManger.reset();
	}), r.commands.redo = r.commands.undo = {
		execCommand: function(e) {
			this.undoManger[e]();
		},
		queryCommandState: function(e) {
			return this.undoManger["has" + ("undo" == e.toLowerCase() ? "Undo" : "Redo")] ? 0 : -1;
		},
		notNeedUndo: 1
	};
	var h, g = {
		16: 1,
		17: 1,
		18: 1,
		37: 1,
		38: 1,
		39: 1,
		40: 1
	},
		v = 0,
		b = !1;
	r.addListener("ready", function() {
		p.on(this.body, "compositionstart", function() {
			b = !0;
		}), p.on(this.body, "compositionend", function() {
			b = !1;
		});
	}), r.addshortcutkey({
		Undo: "ctrl+90",
		Redo: "ctrl+89"
	});
	var y = !0;
	r.addListener("keydown", function(e, t) {
		function n(e) {
			e.selection.getRange().collapsed && e.fireEvent("contentchange"), e.undoManger.save(!1, !0), e.fireEvent("selectionchange");
		}
		var i = this,
			r = t.keyCode || t.which;
		if (!(g[r] || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
			if (b) return;
			if (!i.selection.getRange().collapsed) return i.undoManger.save(!1, !0), void(y = !1);
			0 == i.undoManger.list.length && i.undoManger.save(!0), clearTimeout(o), o = setTimeout(function() {
				if (b) var e = setInterval(function() {
					b || (n(i), clearInterval(e));
				}, 300);
				else n(i);
			}, 200), h = r, v++, v >= d && n(i);
		}
	}), r.addListener("keyup", function(e, t) {
		var n = t.keyCode || t.which;
		if (!(g[n] || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
			if (b) return;
			y || (this.undoManger.save(!1, !0), y = !0);
		}
	});
}, UE.plugins.paste = function() {
	function e(e) {
		var t = this.document;
		if (!t.getElementById("baidu_pastebin")) {
			var n = this.selection.getRange(),
				i = n.createBookmark(),
				o = t.createElement("div");
			o.id = "baidu_pastebin", s.webkit && o.appendChild(t.createTextNode(p.fillChar + p.fillChar)), t.body.appendChild(o), i.start.style.display = "", o.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + p.getXY(i.start).y + "px", n.selectNodeContents(o).select(!0), setTimeout(function() {
				if (s.webkit) for (var r, a = 0, l = t.querySelectorAll("#baidu_pastebin"); r = l[a++];) {
					if (!p.isEmptyNode(r)) {
						o = r;
						break;
					}
					p.remove(r);
				}
				try {
					o.parentNode.removeChild(o);
				} catch (d) {}
				n.moveToBookmark(i).select(!0), e(o);
			}, 0);
		}
	}

	function t(e) {
		var t, a;
		if (e.firstChild) {
			for (var l, d = p.getElementsByTagName(e, "span"), u = 0; l = d[u++];)("_baidu_cut_start" == l.id || "_baidu_cut_end" == l.id) && p.remove(l);
			if (s.webkit) {
				for (var f, m = e.querySelectorAll("div br"), u = 0; f = m[u++];) {
					var h = f.parentNode;
					"DIV" == h.tagName && 1 == h.childNodes.length && (h.innerHTML = "<p><br/></p>", p.remove(h));
				}
				for (var g, v = e.querySelectorAll("#baidu_pastebin"), u = 0; g = v[u++];) {
					var b = r.document.createElement("p");
					for (g.parentNode.insertBefore(b, g); g.firstChild;) b.appendChild(g.firstChild);
					p.remove(g);
				}
				for (var y, C = e.querySelectorAll("meta"), u = 0; y = C[u++];) p.remove(y);
				var m = e.querySelectorAll("br");
				for (u = 0; y = m[u++];) / ^ apple - /i.test(y.className)&&p.remove(y);
}
if(s.gecko){
var N=e.querySelectorAll("[_moz_dirty]");
for(u=0;y=N[u++];)y.removeAttribute("_moz_dirty");
}
if(!s.ie)for(var y,x=e.querySelectorAll("span.Apple-style-span"),u=0;y=x[u++];)p.remove(y,!0);
t=e.innerHTML,t=UE.filterWord(t),t=t.replace(/ ( < [ ^ > ] + ? style = ([\'\"]))([^\2]*?text-decoration-line[\s]*:[^\2]*?)(\2)/gi,function(){
return arguments[1]+arguments[3].replace(/text-decoration-line[\s]*:/g,"text-decoration:")+arguments[4];
});
var w=UE.htmlparser(t);
if(r.options.filterRules&&UE.filterNode(w,r.options.filterRules),r.filterInputRule(w),
s.webkit){
var E=w.lastChild();
E&&"element"==E.type&&"br"==E.tagName&&w.removeChild(E),c.each(r.body.querySelectorAll("div"),function(e){
p.isEmptyBlock(e)&&p.remove(e);
});
}
if(t={
html:w.toHtml()
},r.fireEvent("beforepaste",t,w),!t.html)return;
w=UE.htmlparser(t.html,!0),1===r.queryCommandState("pasteplain")?a=r.execCommand("insertHtml",UE.filterNode(w,r.options.filterTxtRules).toHtml(),!0):(UE.filterNode(w,r.options.filterTxtRules),
n=w.toHtml(),i=t.html,o=r.selection.getRange().createAddress(!0),a=r.execCommand("insertHtml",i,!0)),
r.fireEvent("funcPvUvReport","paste"),r.fireEvent("afterpaste",t,a);
}
}
var n,i,o,r=this;
r.addListener("pasteTransfer",function(e,t){
if(o&&n&&i&&n!=i){
var a=r.selection.getRange();
if(a.moveToAddress(o,!0),!a.collapsed){
for(;!p.isBody(a.startContainer);){
var s=a.startContainer;
if(1==s.nodeType){
if(s=s.childNodes[a.startOffset],!s){
a.setStartBefore(a.startContainer);
continue;
}
var l=s.previousSibling;
l&&3==l.nodeType&&new RegExp("^[\n\r	 "+p.fillChar+"]*$").test(l.nodeValue)&&a.setStartBefore(l);
}
if(0!=a.startOffset)break;
a.setStartBefore(a.startContainer);
}
for(;!p.isBody(a.endContainer);){
var d=a.endContainer;
if(1==d.nodeType){
if(d=d.childNodes[a.endOffset],!d){
a.setEndAfter(a.endContainer);
continue;
}
var u=d.nextSibling;
u&&3==u.nodeType&&new RegExp("^[\n\r	"+p.fillChar+"]*$").test(u.nodeValue)&&a.setEndAfter(u);
}
if(a.endOffset!=a.endContainer[3==a.endContainer.nodeType?"nodeValue":"childNodes"].length)break;
a.setEndAfter(a.endContainer);
}
}
a.deleteContents(),a.select(!0),r.__hasEnterExecCommand=!0;
var f=i;
2===t?f=f.replace(/<(\/?)([\w\-]+)([^>]*)>/gi,function(e,t,n,i){
return n=n.toLowerCase(),{
img:1
}[n]?e:(i=i.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|(' ([ ^ ']*)') | ([ ^ \s > ] + )) / gi, function(e, t, n) {
					return {
						src: 1,
						href: 1,
						name: 1
					}[t.toLowerCase()] ? t + "=" + n + " " : "";
				}), {
					span: 1,
					div: 1
				}[n] ? "" : "<" + t + n + " " + c.trim(i) + ">");
				}): t && (f = n),
			r.execCommand("inserthtml", f, !0),
			r.__hasEnterExecCommand = !1;
			for (var m = r.selection.getRange(); !p.isBody(m.startContainer) && !m.startOffset && m.startContainer[3 == m.startContainer.nodeType ? "nodeValue" : "childNodes"].length;) m.setStartBefore(m.startContainer);
			var h = m.createAddress(!0);
			o.endAddress = h.startAddress;
		}
	}), r.addListener("ready", function() {
	p.on(r.body, "cut", function() {
		var e = r.selection.getRange();
		!e.collapsed && r.undoManger && r.undoManger.save();
	});
	var n = "onpaste" in r.document;
	p.on(r.body, n ? "paste" : "keydown", function(i) {
		return n || (i.ctrlKey || i.metaKey) && "86" == i.keyCode ? r.fireEvent("onpasting", i) === !0 ? (i.stopPropagation && (i.stopPropagation(), i.preventDefault()), !1) : void e.call(r, function(e) {
			t(e);
		}) : void 0;
	});
});
}, UE.plugins.list = function() {
	function e(e) {
		var t = [];
		for (var n in e) t.push(n);
		return t;
	}

	function t(e) {
		var t = e.className;
		return p.hasClass(e, /custom_/) ? t.match(/custom_(\w+)/)[1] : p.getStyle(e, "list-style-type");
	}

	function n(e, n) {
		c.each(p.getElementsByTagName(e, "ol ul"), function(r) {
			if (p.inDoc(r, e)) {
				var a = r.parentNode;
				if (a.tagName == r.tagName) {
					var s = t(r) || ("OL" == r.tagName ? "decimal" : "disc"),
						l = t(a) || ("OL" == a.tagName ? "decimal" : "disc");
					if (s == l) {
						var d = c.indexOf(m[r.tagName], s);
						d = d + 1 == m[r.tagName].length ? 0 : d + 1, o(r, m[r.tagName][d]);
					}
				}
				var f = 0,
					h = 2;
				p.hasClass(r, /custom_/) ? /[ou]l/i.test(a.tagName) && p.hasClass(a, /custom_/) || (h = 1) : /[ou]l/i.test(a.tagName) && p.hasClass(a, /custom_/) && (h = 3);
				var g = p.getStyle(r, "list-style-type");
				g && (r.style.cssText = "list-style-type:" + g), r.className = c.trim(r.className.replace(/list-paddingleft-\w+/, "")) + " list-paddingleft-" + h, c.each(p.getElementsByTagName(r, "li"), function(e) {
					if (e.style.cssText && (e.style.cssText = ""), !e.firstChild) return void p.remove(e);
					if (e.parentNode === r) {
						if (f++, p.hasClass(r, /custom_/)) {
							var n = 1,
								i = t(r);
							if ("OL" == r.tagName) {
								if (i) switch (i) {
								case "cn":
								case "cn1":
								case "cn2":
									f > 10 && (f % 10 == 0 || f > 10 && 20 > f) ? n = 2 : f > 20 && (n = 3);
									break;

								case "num2":
									f > 9 && (n = 2);
								}
								e.className = "list-" + u[i] + f + " list-" + i + "-paddingleft-" + n;
							} else e.className = "list-" + u[i] + " list-" + i + "-paddingleft";
						} else e.className = e.className.replace(/list-[\w\-]+/gi, "");
						var o = e.getAttribute("class");
						null === o || o.replace(/\s/g, "") || p.removeAttributes(e, "class");
					}
				}), !n && i(r, r.tagName.toLowerCase(), t(r) || p.getStyle(r, "list-style-type"), !0);
			}
		});
	}

	function i(e, i, o, r) {
		var a = e.nextSibling;
		a && 1 == a.nodeType && a.tagName.toLowerCase() == i && (t(a) || p.getStyle(a, "list-style-type") || ("ol" == i ? "decimal" : "disc")) == o && (p.moveChild(a, e), 0 == a.childNodes.length && p.remove(a)), a && p.isFillChar(a) && p.remove(a);
		var s = e.previousSibling;
		s && 1 == s.nodeType && s.tagName.toLowerCase() == i && (t(s) || p.getStyle(s, "list-style-type") || ("ol" == i ? "decimal" : "disc")) == o && p.moveChild(e, s), s && p.isFillChar(s) && p.remove(s), !r && p.isEmptyBlock(e) && p.remove(e), t(e) && n(e.ownerDocument, !0);
	}

	function o(e, t) {
		u[t] && (e.className = "custom_" + t);
		try {
			p.setStyle(e, "list-style-type", t);
		} catch (n) {}
	}

	function r(e) {
		var t = e.previousSibling;
		t && p.isEmptyBlock(t) && p.remove(t), t = e.nextSibling, t && p.isEmptyBlock(t) && p.remove(t);
	}

	function a(e) {
		for (; e && !p.isBody(e);) {
			if ("TABLE" == e.nodeName) return null;
			if ("LI" == e.nodeName) return e;
			e = e.parentNode;
		}
	}
	var l = this,
		d = {
			TD: 1,
			PRE: 1,
			BLOCKQUOTE: 1
		},
		u = {
			cn: "cn-1-",
			cn1: "cn-2-",
			cn2: "cn-3-",
			num: "num-1-",
			num1: "num-2-",
			num2: "num-3-",
			dash: "dash",
			dot: "dot"
		};
	l.setOpt({
		insertorderedlist: {
			decimal: "",
			"lower-alpha": "",
			"lower-roman": "",
			"upper-alpha": "",
			"upper-roman": ""
		},
		insertunorderedlist: {
			circle: "",
			disc: "",
			square: ""
		},
		listDefaultPaddingLeft: "30",
		listiconpath: "http://bs.baidu.com/listicon/",
		maxListLevel: -1
	});
	var m = {
		OL: e(l.options.insertorderedlist),
		UL: e(l.options.insertunorderedlist)
	},
		h = l.options.listiconpath;
	for (var g in u) l.options.insertorderedlist.hasOwnProperty(g) || l.options.insertunorderedlist.hasOwnProperty(g) || delete u[g];
	l.ready(function() {
		var e = [];
		for (var t in u) {
			if ("dash" == t || "dot" == t) e.push("li.list-" + u[t] + "{background-image:url(" + h + u[t] + ".gif)}"), e.push("ul.custom_" + t + "{list-style:none;}ul.custom_" + t + " li{background-position:0 3px;background-repeat:no-repeat}");
			else {
				for (var n = 0; 99 > n; n++) e.push("li.list-" + u[t] + n + "{background-image:url(" + h + "list-" + u[t] + n + ".gif)}");
				e.push("ol.custom_" + t + "{list-style:none;}ol.custom_" + t + " li{background-position:0 3px;background-repeat:no-repeat}");
			}
			switch (t) {
			case "cn":
				e.push("li.list-" + t + "-paddingleft-1{padding-left:25px}"), e.push("li.list-" + t + "-paddingleft-2{padding-left:40px}"), e.push("li.list-" + t + "-paddingleft-3{padding-left:55px}");
				break;

			case "cn1":
				e.push("li.list-" + t + "-paddingleft-1{padding-left:30px}"), e.push("li.list-" + t + "-paddingleft-2{padding-left:40px}"), e.push("li.list-" + t + "-paddingleft-3{padding-left:55px}");
				break;

			case "cn2":
				e.push("li.list-" + t + "-paddingleft-1{padding-left:40px}"), e.push("li.list-" + t + "-paddingleft-2{padding-left:55px}"), e.push("li.list-" + t + "-paddingleft-3{padding-left:68px}");
				break;

			case "num":
			case "num1":
				e.push("li.list-" + t + "-paddingleft-1{padding-left:25px}");
				break;

			case "num2":
				e.push("li.list-" + t + "-paddingleft-1{padding-left:35px}"), e.push("li.list-" + t + "-paddingleft-2{padding-left:40px}");
				break;

			case "dash":
				e.push("li.list-" + t + "-paddingleft{padding-left:35px}");
				break;

			case "dot":
				e.push("li.list-" + t + "-paddingleft{padding-left:20px}");
			}
		}
		e.push(".list-paddingleft-1{padding-left:0}"), e.push(".list-paddingleft-2{padding-left:" + l.options.listDefaultPaddingLeft + "px}"), e.push(".list-paddingleft-3{padding-left:" + 2 * l.options.listDefaultPaddingLeft + "px}"), c.cssRule("list", "ol,ul{margin:0;padding:0;" + (s.ie || s.gecko && s.version >= 11e4 ? "" : "width:95%") + "}li{clear:both;}" + e.join("\n"), l.document);
	}), l.ready(function() {
		p.on(l.body, "cut", function() {
			setTimeout(function() {
				var e, t = l.selection.getRange();
				if (!t.collapsed && (e = p.findParentByTagName(t.startContainer, "li", !0)) && !e.nextSibling && p.isEmptyBlock(e)) {
					var n, i = e.parentNode;
					if (n = i.previousSibling) p.remove(i), t.setStartAtLast(n).collapse(!0), t.select(!0);
					else if (n = i.nextSibling) p.remove(i), t.setStartAtFirst(n).collapse(!0), t.select(!0);
					else {
						var o = l.document.createElement("p");
						p.fillNode(l.document, o), i.parentNode.insertBefore(o, i), p.remove(i), t.setStart(o, 0).collapse(!0), t.select(!0);
					}
				}
			});
		});
	}), l.addListener("beforepaste", function(e, n) {
		var i, o = this,
			r = o.selection.getRange(),
			a = UE.htmlparser(n.html, !0);
		if (i = p.findParentByTagName(r.startContainer, "li", !0)) {
			var s = i.parentNode,
				l = "OL" == s.tagName ? "ul" : "ol";
			c.each(a.getNodesByTagName(l), function(n) {
				if (n.tagName = s.tagName, n.setAttr(), n.parentNode === a) e = t(s) || ("OL" == s.tagName ? "decimal" : "disc");
				else {
					var i = n.parentNode.getAttr("class");
					e = i && /custom_/.test(i) ? i.match(/custom_(\w+)/)[1] : n.parentNode.getStyle("list-style-type"), e || (e = "OL" == s.tagName ? "decimal" : "disc");
				}
				var o = c.indexOf(m[s.tagName], e);
				n.parentNode !== a && (o = o + 1 == m[s.tagName].length ? 0 : o + 1);
				var r = m[s.tagName][o];
				u[r] ? n.setAttr("class", "custom_" + r) : n.setStyle("list-style-type", r);
			});
		}
		n.html = a.toHtml();
	}), l.addInputRule(function(e) {
		function t(e, t) {
			var o = t.firstChild();
			if (o && "element" == o.type && "span" == o.tagName && /Wingdings|Symbol/.test(o.getStyle("font-family"))) {
				for (var r in i) if (i[r] == o.data) return r;
				return "disc";
			}
			for (var r in n) if (n[r].test(e)) return r;
		}
		c.each(e.getNodesByTagName("li"), function(e) {
			for (var t, n = UE.uNode.createElement("p"), i = 0; t = e.children[i];)"text" == t.type || f.p[t.tagName] ? n.appendChild(t) : n.firstChild() ? (e.insertBefore(n, t), n = UE.uNode.createElement("p"), i += 2) : i++;
			(n.firstChild() && !n.parentNode || !e.firstChild()) && e.appendChild(n), n.firstChild() || n.innerHTML(s.ie ? "&nbsp;" : "<br/>");
			var o = e.firstChild(),
				r = o.lastChild();
			r && "text" == r.type && /^\s*$/.test(r.data) && o.removeChild(r);
		});
		var n = {
			num1: /^\d+\)/,
			decimal: /^\d+\./,
			"lower-alpha": /^[a-z]+\)/,
			"upper-alpha": /^[A-Z]+\./,
			cn: /^[一二三四六五七八九]+[、]/,
			cn2: /^\([一二三四六五七八九]+\)/
		},
			i = {
				square: "n"
			};
		c.each(e.getNodesByTagName("p"), function(e) {
			function i(e, t, i) {
				if ("ol" == e.tagName) if (s.ie) {
					var o = t.firstChild();
					"element" == o.type && "span" == o.tagName && n[i].test(o.innerText()) && t.removeChild(o);
				} else t.innerHTML(t.innerHTML().replace(n[i], ""));
				else t.removeChild(t.firstChild());
				var r = UE.uNode.createElement("li");
				r.appendChild(t), e.appendChild(r);
			}
			if ("MsoListParagraph" == e.getAttr("class")) {
				e.setStyle("margin", ""), e.setStyle("margin-left", ""), e.setAttr("class", "");
				var o, r = e,
					a = e;
				if ("li" != e.parentNode.tagName && (o = t(e.innerText(), e))) {
					var d = UE.uNode.createElement(l.options.insertorderedlist.hasOwnProperty(o) ? "ol" : "ul");
					for (u[o] ? d.setAttr("class", "custom_" + o) : d.setStyle("list-style-type", o); e && "li" != e.parentNode.tagName && t(e.innerText(), e);) r = e.nextSibling(), r || e.parentNode.insertBefore(d, e), i(d, e, o), e = r;
					!d.parentNode && e && e.parentNode && e.parentNode.insertBefore(d, e);
				}
				var c = a.firstChild();
				c && "element" == c.type && "span" == c.tagName && /^\s*(&nbsp;)+\s*$/.test(c.innerText()) && c.parentNode.removeChild(c);
			}
		});
	}), l.addListener("contentchange", function() {
		n(l.document);
	}), l.addListener("keydown", function(e, t) {
		function n() {
			t.preventDefault ? t.preventDefault() : t.returnValue = !1, l.fireEvent("contentchange"), l.undoManger && l.undoManger.save();
		}

		function i(e, t) {
			for (; e && !p.isBody(e);) {
				if (t(e)) return null;
				if (1 == e.nodeType && /[ou]l/i.test(e.tagName)) return e;
				e = e.parentNode;
			}
			return null;
		}
		var o = t.keyCode || t.which;
		if (13 == o && !t.shiftKey) {
			var a = l.selection.getRange(),
				s = p.findParent(a.startContainer, function(e) {
					return p.isBlockElm(e);
				}, !0),
				d = p.findParentByTagName(a.startContainer, "li", !0);
			if (s && "PRE" != s.tagName && !d) {
				var c = s.innerHTML.replace(new RegExp(p.fillChar, "g"), "");
				/^\s*1\s*\.[^\d]/.test(c) && (s.innerHTML = c.replace(/^\s*1\s*\./, ""), a.setStartAtLast(s).collapse(!0).select(), l.__hasEnterExecCommand = !0, l.execCommand("insertorderedlist"), l.__hasEnterExecCommand = !1);
			}
			var u = l.selection.getRange(),
				m = i(u.startContainer, function(e) {
					return "TABLE" == e.tagName;
				}),
				h = u.collapsed ? m : i(u.endContainer, function(e) {
					return "TABLE" == e.tagName;
				});
			if (m && h && m === h) {
				if (!u.collapsed) {
					if (m = p.findParentByTagName(u.startContainer, "li", !0), h = p.findParentByTagName(u.endContainer, "li", !0), !m || !h || m !== h) {
						var g = u.cloneRange(),
							v = g.collapse(!1).createBookmark();
						u.deleteContents(), g.moveToBookmark(v);
						var d = p.findParentByTagName(g.startContainer, "li", !0);
						return r(d), g.select(), void n();
					}
					if (u.deleteContents(), d = p.findParentByTagName(u.startContainer, "li", !0), d && p.isEmptyBlock(d)) return w = d.previousSibling, next = d.nextSibling, C = l.document.createElement("p"), p.fillNode(l.document, C), b = d.parentNode, w && next ? (u.setStart(next, 0).collapse(!0).select(!0), p.remove(d)) : ((w || next) && w ? d.parentNode.parentNode.insertBefore(C, b.nextSibling) : b.parentNode.insertBefore(C, b), p.remove(d), b.firstChild || p.remove(b), u.setStart(C, 0).setCursor()), void n();
				}
				if (d = p.findParentByTagName(u.startContainer, "li", !0)) {
					if (p.isEmptyBlock(d)) {
						v = u.createBookmark();
						var b = d.parentNode;
						if (d !== b.lastChild ? (p.breakParent(d, b), r(d)) : (b.parentNode.insertBefore(d, b.nextSibling), p.isEmptyNode(b) && p.remove(b)), !f.$list[d.parentNode.tagName]) if (p.isBlockElm(d.firstChild)) p.remove(d, !0);
						else {
							for (C = l.document.createElement("p"), d.parentNode.insertBefore(C, d); d.firstChild;) C.appendChild(d.firstChild);
							p.remove(d);
						}
						u.moveToBookmark(v).select();
					} else {
						var y = d.firstChild;
						if (!y || !p.isBlockElm(y)) {
							var C = l.document.createElement("p");
							for (!d.firstChild && p.fillNode(l.document, C); d.firstChild;) C.appendChild(d.firstChild);
							d.appendChild(C), y = C;
						}
						var N = l.document.createElement("span");
						u.insertNode(N), p.breakParent(N, d);
						var x = N.nextSibling;
						y = x.firstChild, y || (C = l.document.createElement("p"), p.fillNode(l.document, C), x.appendChild(C), y = C), p.isEmptyNode(y) && (y.innerHTML = "", p.fillNode(l.document, y)), u.setStart(y, 0).collapse(!0).shrinkBoundary().select(), p.remove(N);
						var w = x.previousSibling;
						w && p.isEmptyBlock(w) && (w.innerHTML = "<p></p>", p.fillNode(l.document, w.firstChild));
					}
					n();
				}
			}
		}
		if (8 == o && (u = l.selection.getRange(), u.collapsed && p.isStartInblock(u) && (g = u.cloneRange().trimBoundary(), d = p.findParentByTagName(u.startContainer, "li", !0), d && p.isStartInblock(g)))) {
			if (m = p.findParentByTagName(u.startContainer, "p", !0), m && m !== d.firstChild) {
				var b = p.findParentByTagName(m, ["ol", "ul"]);
				return p.breakParent(m, b), r(m), l.fireEvent("contentchange"), u.setStart(m, 0).setCursor(!1, !0), l.fireEvent("saveScene"), void p.preventDefault(t);
			}
			if (d && (w = d.previousSibling)) {
				if (46 == o && d.childNodes.length) return;
				if (f.$list[w.tagName] && (w = w.lastChild), l.undoManger && l.undoManger.save(), y = d.firstChild, p.isBlockElm(y)) if (p.isEmptyNode(y)) for (w.appendChild(y), u.setStart(y, 0).setCursor(!1, !0); d.firstChild;) w.appendChild(d.firstChild);
				else N = l.document.createElement("span"), u.insertNode(N), p.isEmptyBlock(w) && (w.innerHTML = ""), p.moveChild(d, w), u.setStartBefore(N).collapse(!0).select(!0), p.remove(N);
				else if (p.isEmptyNode(d)) {
					var C = l.document.createElement("p");
					w.appendChild(C), u.setStart(C, 0).setCursor();
				} else for (u.setEnd(w, w.childNodes.length).collapse().select(!0); d.firstChild;) w.appendChild(d.firstChild);
				return p.remove(d), l.fireEvent("contentchange"), l.fireEvent("saveScene"), void p.preventDefault(t);
			}
			if (d && !d.previousSibling) {
				var b = d.parentNode,
					v = u.createBookmark();
				if (p.isTagNode(b.parentNode, "ol ul")) b.parentNode.insertBefore(d, b), p.isEmptyNode(b) && p.remove(b);
				else {
					for (; d.firstChild;) b.parentNode.insertBefore(d.firstChild, b);
					p.remove(d), p.isEmptyNode(b) && p.remove(b);
				}
				return u.moveToBookmark(v).setCursor(!1, !0), l.fireEvent("contentchange"), l.fireEvent("saveScene"), void p.preventDefault(t);
			}
		}
	}), l.addListener("keyup", function(e, n) {
		var o = n.keyCode || n.which;
		if (8 == o) {
			var r, a = l.selection.getRange();
			(r = p.findParentByTagName(a.startContainer, ["ol", "ul"], !0)) && i(r, r.tagName.toLowerCase(), t(r) || p.getComputedStyle(r, "list-style-type"), !0);
		}
	}), l.addListener("tabkeydown", function() {
		function e(e) {
			if (-1 != l.options.maxListLevel) {
				for (var t = e.parentNode, n = 0;
				/[ou]l/i.test(t.tagName);) n++, t = t.parentNode;
				if (n >= l.options.maxListLevel) return !0;
			}
		}
		var n = l.selection.getRange(),
			r = p.findParentByTagName(n.startContainer, "li", !0);
		if (r) {
			var a;
			if (!n.collapsed) {
				l.fireEvent("saveScene"), a = n.createBookmark();
				for (var s, d, u = 0, f = p.findParents(r); d = f[u++];) if (p.isTagNode(d, "ol ul")) {
					s = d;
					break;
				}
				var h = r;
				if (a.end) for (; h && !(p.getPosition(h, a.end) & p.POSITION_FOLLOWING);) if (e(h)) h = p.getNextDomNode(h, !1, null, function(e) {
					return e !== s;
				});
				else {
					var g = h.parentNode,
						v = l.document.createElement(g.tagName),
						b = c.indexOf(m[v.tagName], t(g) || p.getComputedStyle(g, "list-style-type")),
						y = b + 1 == m[v.tagName].length ? 0 : b + 1,
						C = m[v.tagName][y];
					for (o(v, C), g.insertBefore(v, h); h && !(p.getPosition(h, a.end) & p.POSITION_FOLLOWING);) {
						if (r = h.nextSibling, v.appendChild(h), !r || p.isTagNode(r, "ol ul")) {
							if (r) for (;
							(r = r.firstChild) && "LI" != r.tagName;);
							else r = p.getNextDomNode(h, !1, null, function(e) {
								return e !== s;
							});
							break;
						}
						h = r;
					}
					i(v, v.tagName.toLowerCase(), C), h = r;
				}
				return l.fireEvent("contentchange"), n.moveToBookmark(a).select(), !0;
			}
			if (e(r)) return !0;
			var g = r.parentNode,
				v = l.document.createElement(g.tagName),
				b = c.indexOf(m[v.tagName], t(g) || p.getComputedStyle(g, "list-style-type"));
			b = b + 1 == m[v.tagName].length ? 0 : b + 1;
			var C = m[v.tagName][b];
			if (o(v, C), p.isStartInblock(n)) return l.fireEvent("saveScene"), a = n.createBookmark(), g.insertBefore(v, r), v.appendChild(r), i(v, v.tagName.toLowerCase(), C), l.fireEvent("contentchange"), n.moveToBookmark(a).select(!0), !0;
		}
	}), l.commands.insertorderedlist = l.commands.insertunorderedlist = {
		execCommand: function(e, n) {
			n || (n = "insertorderedlist" == e.toLowerCase() ? "decimal" : "disc");
			var r = this,
				s = this.selection.getRange(),
				l = function(e) {
					return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() : !p.isWhitespace(e);
				},
				u = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul",
				m = r.document.createDocumentFragment();
			s.adjustmentBoundary().shrinkBoundary();
			var h, g, v, b, y = s.createBookmark(!0),
				C = a(r.document.getElementById(y.start)),
				N = 0,
				x = a(r.document.getElementById(y.end)),
				w = 0;
			if (C || x) {
				if (C && (h = C.parentNode), y.end || (x = C), x && (g = x.parentNode), h === g) {
					for (; C !== x;) {
						if (b = C, C = C.nextSibling, !p.isBlockElm(b.firstChild)) {
							for (var E = r.document.createElement("p"); b.firstChild;) E.appendChild(b.firstChild);
							b.appendChild(E);
						}
						m.appendChild(b);
					}
					if (b = r.document.createElement("span"), h.insertBefore(b, x), !p.isBlockElm(x.firstChild)) {
						for (E = r.document.createElement("p"); x.firstChild;) E.appendChild(x.firstChild);
						x.appendChild(E);
					}
					m.appendChild(x), p.breakParent(b, h), p.isEmptyNode(b.previousSibling) && p.remove(b.previousSibling), p.isEmptyNode(b.nextSibling) && p.remove(b.nextSibling);
					var T = t(h) || p.getComputedStyle(h, "list-style-type") || ("insertorderedlist" == e.toLowerCase() ? "decimal" : "disc");
					if (h.tagName.toLowerCase() == u && T == n) {
						for (var S, k = 0, B = r.document.createDocumentFragment(); S = m.childNodes[k++];) if (p.isTagNode(S, "ol ul")) c.each(p.getElementsByTagName(S, "li"), function(e) {
							for (; e.firstChild;) B.appendChild(e.firstChild);
						});
						else for (; S.firstChild;) B.appendChild(S.firstChild);
						b.parentNode.insertBefore(B, b);
					} else v = r.document.createElement(u), o(v, n), v.appendChild(m), b.parentNode.insertBefore(v, b);
					return p.remove(b), v && i(v, u, n), void s.moveToBookmark(y).select();
				}
				if (C) {
					for (; C;) {
						if (b = C.nextSibling, p.isTagNode(C, "ol ul")) m.appendChild(C);
						else {
							for (var _ = r.document.createDocumentFragment(), I = 0; C.firstChild;) p.isBlockElm(C.firstChild) && (I = 1), _.appendChild(C.firstChild);
							if (I) m.appendChild(_);
							else {
								var R = r.document.createElement("p");
								R.appendChild(_), m.appendChild(R);
							}
							p.remove(C);
						}
						C = b;
					}
					h.parentNode.insertBefore(m, h.nextSibling), p.isEmptyNode(h) ? (s.setStartBefore(h), p.remove(h)) : s.setStartAfter(h), N = 1;
				}
				if (x && p.inDoc(g, r.document)) {
					for (C = g.firstChild; C && C !== x;) {
						if (b = C.nextSibling, p.isTagNode(C, "ol ul")) m.appendChild(C);
						else {
							for (_ = r.document.createDocumentFragment(), I = 0; C.firstChild;) p.isBlockElm(C.firstChild) && (I = 1), _.appendChild(C.firstChild);
							I ? m.appendChild(_) : (R = r.document.createElement("p"), R.appendChild(_), m.appendChild(R)), p.remove(C);
						}
						C = b;
					}
					var L = p.createElement(r.document, "div", {
						tmpDiv: 1
					});
					p.moveChild(x, L), m.appendChild(L), p.remove(x), g.parentNode.insertBefore(m, g), s.setEndBefore(g), p.isEmptyNode(g) && p.remove(g), w = 1;
				}
			}
			N || s.setStartBefore(r.document.getElementById(y.start)), y.end && !w && s.setEndAfter(r.document.getElementById(y.end)), s.enlarge(!0, function(e) {
				return d[e.tagName];
			}), m = r.document.createDocumentFragment();
			for (var A, D = s.createBookmark(), P = p.getNextDomNode(D.start, !1, l), M = s.cloneRange(), O = p.isBlockElm; P && P !== D.end && p.getPosition(P, D.end) & p.POSITION_PRECEDING;) if (3 == P.nodeType || f.li[P.tagName]) {
				if (1 == P.nodeType && f.$list[P.tagName]) {
					for (; P.firstChild;) m.appendChild(P.firstChild);
					A = p.getNextDomNode(P, !1, l), p.remove(P), P = A;
					continue;
				}
				for (A = P, M.setStartBefore(P); P && P !== D.end && (!O(P) || p.isBookmarkNode(P));) A = P, P = p.getNextDomNode(P, !1, null, function(e) {
					return !d[e.tagName];
				});
				P && O(P) && (b = p.getNextDomNode(A, !1, l), b && p.isBookmarkNode(b) && (P = p.getNextDomNode(b, !1, l), A = b)), M.setEndAfter(A), P = p.getNextDomNode(A, !1, l);
				var U = s.document.createElement("li");
				if (U.appendChild(M.extractContents()), p.isEmptyNode(U)) {
					for (var A = s.document.createElement("p"); U.firstChild;) A.appendChild(U.firstChild);
					U.appendChild(A);
				}
				m.appendChild(U);
			} else P = p.getNextDomNode(P, !0, l);
			s.moveToBookmark(D).collapse(!0), v = r.document.createElement(u), o(v, n), v.appendChild(m), s.insertNode(v), i(v, u, n);
			for (var S, k = 0, H = p.getElementsByTagName(v, "div"); S = H[k++];) S.getAttribute("tmpDiv") && p.remove(S, !0);
			s.moveToBookmark(y).select();
		},
		queryCommandState: function(e) {
			for (var t, n = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul", i = this.selection.getStartElementPath(), o = 0; t = i[o++];) {
				if ("TABLE" == t.nodeName) return 0;
				if (n == t.nodeName.toLowerCase()) return 1;
			}
			return 0;
		},
		queryCommandValue: function(e) {
			for (var n, i, o = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul", r = this.selection.getStartElementPath(), a = 0; i = r[a++];) {
				if ("TABLE" == i.nodeName) {
					n = null;
					break;
				}
				if (o == i.nodeName.toLowerCase()) {
					n = i;
					break;
				}
			}
			return n ? t(n) || p.getComputedStyle(n, "list-style-type") : null;
		}
	};
}, UE.plugins.enterkey = function() {
	var e, t = this,
		n = t.options.enterTag;
	t.addListener("keyup", function(n, i) {
		var o = i.keyCode || i.which;
		if (13 == o) {
			var r, a = t.selection.getRange(),
				l = a.startContainer;
			if (s.ie) t.fireEvent("saveScene", !0, !0);
			else {
				if (/h\d/i.test(e)) {
					if (s.gecko) {
						var d = p.findParentByTagName(l, ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption", "table"], !0);
						d || (t.document.execCommand("formatBlock", !1, "<p>"), r = 1);
					} else if (1 == l.nodeType) {
						var c, u = t.document.createTextNode("");
						if (a.insertNode(u), c = p.findParentByTagName(u, "div", !0)) {
							for (var f = t.document.createElement("p"); c.firstChild;) f.appendChild(c.firstChild);
							c.parentNode.insertBefore(f, c), p.remove(c), a.setStartBefore(u).setCursor(), r = 1;
						}
						p.remove(u);
					}
					t.undoManger && r && t.undoManger.save();
				}
				s.opera && a.select();
			}
		}
	}), t.addListener("keydown", function(i, o) {
		var r = o.keyCode || o.which;
		if (13 == r) {
			if (t.fireEvent("beforeenterkeydown")) return void p.preventDefault(o);
			t.fireEvent("saveScene", !0, !0), e = "";
			var a = t.selection.getRange();
			if (!a.collapsed) {
				var l = a.startContainer,
					d = a.endContainer,
					c = p.findParentByTagName(l, "td", !0),
					u = p.findParentByTagName(d, "td", !0);
				if (c && u && c !== u || !c && u || c && !u) return void(o.preventDefault ? o.preventDefault() : o.returnValue = !1);
			}
			if ("p" == n) s.ie || (l = p.findParentByTagName(a.startContainer, ["ol", "ul", "p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption"], !0), l || s.opera ? (e = l.tagName, "p" == l.tagName.toLowerCase() && s.gecko && p.removeDirtyAttr(l)) : (t.document.execCommand("formatBlock", !1, "<p>"), s.gecko && (a = t.selection.getRange(), l = p.findParentByTagName(a.startContainer, "p", !0), l && p.removeDirtyAttr(l))));
			else if (o.preventDefault ? o.preventDefault() : o.returnValue = !1, a.collapsed) {
				h = a.document.createElement("br"), a.insertNode(h);
				var m = h.parentNode;
				m.lastChild === h ? (h.parentNode.insertBefore(h.cloneNode(!0), h), a.setStartBefore(h)) : a.setStartAfter(h), a.setCursor();
			} else if (a.deleteContents(), l = a.startContainer, 1 == l.nodeType && (l = l.childNodes[a.startOffset])) {
				for (; 1 == l.nodeType;) {
					if (f.$empty[l.tagName]) return a.setStartBefore(l).setCursor(), t.undoManger && t.undoManger.save(), !1;
					if (!l.firstChild) {
						var h = a.document.createElement("br");
						return l.appendChild(h), a.setStart(l, 0).setCursor(), t.undoManger && t.undoManger.save(), !1;
					}
					l = l.firstChild;
				}
				l === a.startContainer.childNodes[a.startOffset] ? (h = a.document.createElement("br"), a.insertNode(h).setCursor()) : a.setStart(l, 0).setCursor();
			} else h = a.document.createElement("br"), a.insertNode(h).setStartAfter(h).setCursor();
		}
	});
}, UE.plugins.keystrokes = function() {
	var e = this,
		t = !0;
	e.addListener("keydown", function(n, i) {
		var o = i.keyCode || i.which,
			r = e.selection.getRange();
		if (!r.collapsed && !(i.ctrlKey || i.shiftKey || i.altKey || i.metaKey) && (o >= 65 && 90 >= o || o >= 48 && 57 >= o || o >= 96 && 111 >= o || {
			13: 1,
			8: 1,
			46: 1
		}[o])) {
			var a = r.startContainer;
			if (p.isFillChar(a) && r.setStartBefore(a), a = r.endContainer, p.isFillChar(a) && r.setEndAfter(a), r.txtToElmBoundary(), r.endContainer && 1 == r.endContainer.nodeType && (a = r.endContainer.childNodes[r.endOffset], a && p.isBr(a) && r.setEndAfter(a)), 0 == r.startOffset && (a = r.startContainer, p.isBoundaryNode(a, "firstChild") && (a = r.endContainer, r.endOffset == (3 == a.nodeType ? a.nodeValue.length : a.childNodes.length) && p.isBoundaryNode(a, "lastChild")))) return e.fireEvent("saveScene"), e.body.innerHTML = "<p>" + (s.ie ? "" : "<br/>") + "</p>", r.setStart(e.body.firstChild, 0).setCursor(!1, !0), void e._selectionChange();
		}
		if (8 == o) {
			if (r = e.selection.getRange(), t = r.collapsed, e.fireEvent("delkeydown", i)) return;
			var l, d;
			if (r.collapsed && r.inFillChar() && (l = r.startContainer, p.isFillChar(l) ? (r.setStartBefore(l).shrinkBoundary(!0).collapse(!0), p.remove(l)) : (l.nodeValue = l.nodeValue.replace(new RegExp("^" + p.fillChar), ""), r.startOffset--, r.collapse(!0).select(!0))), l = r.getClosedNode()) return e.fireEvent("saveScene"), r.setStartBefore(l), p.remove(l), r.setCursor(), e.fireEvent("saveScene"), void p.preventDefault(i);
			if (!s.ie && (l = p.findParentByTagName(r.startContainer, "table", !0), d = p.findParentByTagName(r.endContainer, "table", !0), l && !d || !l && d || l !== d)) return void i.preventDefault();
		}
		if (9 == o) {
			var c = {
				ol: 1,
				ul: 1,
				table: 1
			};
			if (e.fireEvent("tabkeydown", i)) return void p.preventDefault(i);
			var u = e.selection.getRange();
			e.fireEvent("saveScene");
			for (var f = 0, m = "", h = e.options.tabSize || 4, g = e.options.tabNode || "&nbsp;"; h > f; f++) m += g;
			var v = e.document.createElement("span");
			if (v.innerHTML = m + p.fillChar, u.collapsed) u.insertNode(v.cloneNode(!0).firstChild).setCursor(!0);
			else if (l = p.findParent(u.startContainer, y), d = p.findParent(u.endContainer, y), l && d && l === d) u.deleteContents(), u.insertNode(v.cloneNode(!0).firstChild).setCursor(!0);
			else {
				var b = u.createBookmark(),
					y = function(e) {
						return p.isBlockElm(e) && !c[e.tagName.toLowerCase()];
					};
				u.enlarge(!0);
				for (var C = u.createBookmark(), N = p.getNextDomNode(C.start, !1, y); N && !(p.getPosition(N, C.end) & p.POSITION_FOLLOWING);) N.insertBefore(v.cloneNode(!0).firstChild, N.firstChild), N = p.getNextDomNode(N, !1, y);
				u.moveToBookmark(C).moveToBookmark(b).select();
			}
			p.preventDefault(i);
		}
		if (s.gecko && 46 == o && (u = e.selection.getRange(), u.collapsed && (l = u.startContainer, p.isEmptyBlock(l)))) {
			for (var x = l.parentNode; 1 == p.getChildCount(x) && !p.isBody(x);) l = x, x = x.parentNode;
			return void(l === x.lastChild && i.preventDefault());
		}
	}), e.addListener("keyup", function(e, n) {
		var i, o = n.keyCode || n.which,
			r = this;
		if (8 == o) {
			if (r.fireEvent("delkeyup")) return;
			if (i = r.selection.getRange(), i.collapsed) {
				var a, l = ["h1", "h2", "h3", "h4", "h5", "h6"];
				if ((a = p.findParentByTagName(i.startContainer, l, !0)) && p.isEmptyBlock(a)) {
					var d = a.previousSibling;
					if (d && "TABLE" != d.nodeName) return p.remove(a), void i.setStartAtLast(d).setCursor(!1, !0);
					var c = a.nextSibling;
					if (c && "TABLE" != c.nodeName) return p.remove(a), void i.setStartAtFirst(c).setCursor(!1, !0);
				}
				if (p.isBody(i.startContainer)) {
					var a = p.createElement(r.document, "p", {
						innerHTML: s.ie ? p.fillChar : "<br/>"
					});
					i.insertNode(a).setStart(a, 0).setCursor(!1, !0);
				}
			}
			if (!t && (3 == i.startContainer.nodeType || 1 == i.startContainer.nodeType && p.isEmptyBlock(i.startContainer))) if (s.ie) {
				var u = i.document.createElement("span");
				i.insertNode(u).setStartBefore(u).collapse(!0), i.select(), p.remove(u);
			} else i.select();
		}
	});
}, UE.plugins.autoheight = function() {
	function e(e) {
		var t = this;
		clearTimeout(o), l || (!t.queryCommandState || t.queryCommandState && 1 != t.queryCommandState("source")) && (o = setTimeout(function() {
			for (var n = t.body.lastChild; n && 1 != n.nodeType;) n = n.previousSibling;
			n && 1 == n.nodeType && (n.style.clear = "both", i = Math.max(p.getXY(n).y + n.offsetHeight + 25, Math.max(a.minFrameHeight, a.initialFrameHeight)), ("adjustheight" == e || i != r && i != $(t.iframe).height()) && (t.setHeight(i, !0), r = i), p.removeStyle(n, "clear"));
		}, 50));
	}
	var t = this;
	if (t.autoHeightEnabled = t.options.autoHeightEnabled !== !1, t.autoHeightEnabled) {
		var n, i, o, r = 0,
			a = t.options;
		t.addListener("foldcontentarea", function() {
			r = 0, t.setHeight("60", !0);
		});
		var l;
		t.addListener("fullscreenchanged", function(e, t) {
			l = t;
		}), t.addListener("destroy", function() {
			t.removeListener("adjustheight contentchange afterinserthtml keyup mouseup", e);
		}), t.enableAutoHeight = function() {
			var t = this;
			if (t.autoHeightEnabled) {
				var i = t.document;
				t.autoHeightEnabled = !0, n = i.body.style.overflowY, i.body.style.overflowY = "hidden", t.addListener("adjustheight contentchange afterinserthtml keyup mouseup", e), setTimeout(function() {
					e.call(t);
				}, s.gecko ? 100 : 0), t.fireEvent("autoheightchanged", t.autoHeightEnabled);
			}
		}, t.disableAutoHeight = function() {
			t.body.style.overflowY = n || "", t.removeListener("contentchange", e), t.removeListener("keyup", e), t.removeListener("mouseup", e), t.autoHeightEnabled = !1, t.fireEvent("autoheightchanged", t.autoHeightEnabled);
		}, t.addListener("ready", function() {
			t.enableAutoHeight();
			var n;
			p.on(s.ie ? t.body : t.document, s.webkit ? "dragover" : "drop", function() {
				clearTimeout(n), n = setTimeout(function() {
					e.call(t);
				}, 100);
			});
		});
	}
}, UE.plugins.autofloat = function() {
	function e() {
		return UE.ui ? 1 : (alert(a.autofloatMsg), 0);
	}

	function t() {
		var e = document.body.style;
		e.backgroundImage = 'url("about:blank")', e.backgroundAttachment = "fixed";
	}

	function n() {
		var e = p.getXY(f),
			t = p.getComputedStyle(f, "position"),
			n = p.getComputedStyle(f, "left");
		f.style.width = f.offsetWidth + "px", f.style.zIndex = 1 * r.options.zIndex + 1, f.parentNode.insertBefore(y, f), v || b && s.ie ? ("absolute" != f.style.position && (f.style.position = "absolute"), f.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - m + d + "px") : (s.ie7Compat && C && (C = !1, f.style.marginLeft = "-45px", f.style.left = p.getXY(f).x - document.documentElement.getBoundingClientRect().left + 2 + "px"), "fixed" != f.style.position && (f.style.position = "fixed", f.style.top = d + "px", ("absolute" == t || "relative" == t) && parseFloat(n) && (f.style.left = e.x + "px")));
	}

	function i() {
		C = !0, y.parentNode && y.parentNode.removeChild(y), f.style.cssText = u, f.style.marginLeft = "0px";
	}

	function o() {
		var e = h(r.container),
			t = r.options.toolbarTopOffset || 0;
		e.top < 0 && e.bottom - f.offsetHeight > t ? n() : i();
	}
	var r = this,
		a = r.getLang(),
		l = r.options.autoFloatEnabled !== !1,
		d = r.options.topOffset;
	if (l) {
		var u, f, m, h, g = UE.ui.uiUtils,
			v = s.ie && s.version <= 6,
			b = s.quirks,
			y = document.createElement("div"),
			C = !0,
			N = c.defer(function() {
				o();
			}, s.ie ? 200 : 100, !0);
		r.addListener("destroy", function() {
			p.un(window, ["scroll", "resize"], o), r.removeListener("keydown", N);
		}), r.addListener("ready", function() {
			e(r) && (h = g.getClientRect, f = r.ui.getDom("toolbarbox"), m = h(f).top, u = f.style.cssText, y.style.height = f.offsetHeight + 53 + "px", v && t(), p.on(window, ["scroll", "resize"], o), r.addListener("keydown", N), r.addListener("beforefullscreenchange", function(e, t) {
				t && i();
			}), r.addListener("fullscreenchanged", function(e, t) {
				t || o();
			}), r.addListener("sourcemodechanged", function() {
				setTimeout(function() {
					o();
				}, 0);
			}), r.addListener("clearDoc", function() {
				setTimeout(function() {
					o();
				}, 0);
			}));
		});
	}
}, UE.plugins.pasteplain = function() {
	var e = this;
	e.setOpt({
		pasteplain: !1,
		filterTxtRules: function() {
			function e(e) {
				e.tagName = "p", e.setStyle();
			}

			function t(e) {
				e.parentNode.removeChild(e, !0);
			}
			return {
				"-": "script style object iframe embed input select",
				p: {
					$: {}
				},
				br: {
					$: {}
				},
				div: function(e) {
					for (var t, n = UE.uNode.createElement("p"); t = e.firstChild();)"text" != t.type && UE.dom.dtd.$block[t.tagName] ? n.firstChild() ? (e.parentNode.insertBefore(n, e), n = UE.uNode.createElement("p")) : e.parentNode.insertBefore(t, e) : n.appendChild(t);
					n.firstChild() && e.parentNode.insertBefore(n, e), e.parentNode.removeChild(e);
				},
				ol: t,
				ul: t,
				dl: t,
				dt: t,
				dd: t,
				li: t,
				caption: e,
				th: e,
				tr: e,
				h1: e,
				h2: e,
				h3: e,
				h4: e,
				h5: e,
				h6: e,
				td: function(e) {
					var t = !! e.innerText();
					t && e.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"), e), e.parentNode.removeChild(e, e.innerText());
				}
			};
		}()
	});
	var t = e.options.pasteplain;
	e.commands.pasteplain = {
		queryCommandState: function() {
			return t ? 1 : 0;
		},
		execCommand: function() {
			t = 0 | !t;
		},
		notNeedUndo: 1
	};
}, function() {
	function e() {}
	var t = UE.UETable = function(e) {
			this.table = e, this.indexTable = [], this.selectedTds = [], this.cellsRange = {}, this.update(e);
		};
	t.removeSelectedClass = function(e) {
		c.each(e, function(e) {
			p.removeClasses(e, "selectTdClass");
		});
	}, t.addSelectedClass = function(e) {
		c.each(e, function(e) {
			p.addClass(e, "selectTdClass");
		});
	}, t.isEmptyBlock = function(e) {
		var t = new RegExp(p.fillChar, "g");
		if (e[s.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(t, "").length > 0) return 0;
		for (var n in f.$isNotEmpty) if (f.$isNotEmpty.hasOwnProperty(n) && e.getElementsByTagName(n).length) return 0;
		return 1;
	}, t.getWidth = function(e) {
		return e ? parseInt(p.getComputedStyle(e, "width"), 10) : 0;
	}, t.getTableCellAlignState = function(e) {
		!c.isArray(e) && (e = [e]);
		var t = {},
			n = ["align", "valign"],
			i = null,
			o = !0;
		return c.each(e, function(e) {
			return c.each(n, function(n) {
				if (i = e.getAttribute(n), !t[n] && i) t[n] = i;
				else if (!t[n] || i !== t[n]) return o = !1, !1;
			}), o;
		}), o ? t : null;
	}, t.getTableItemsByRange = function(e) {
		var t = e.selection.getStart();
		t && t.id && 0 === t.id.indexOf("_baidu_bookmark_start_") && (t = t.nextSibling);
		var n = t && p.findParentByTagName(t, ["td", "th"], !0),
			i = n && n.parentNode,
			o = t && p.findParentByTagName(t, "caption", !0),
			r = o ? o.parentNode : i && i.parentNode.parentNode;
		return {
			cell: n,
			tr: i,
			table: r,
			caption: o
		};
	}, t.getUETableBySelected = function(e) {
		var n = t.getTableItemsByRange(e).table;
		return n && n.ueTable && n.ueTable.selectedTds.length ? n.ueTable : null;
	}, t.getDefaultValue = function(e, t) {
		var n, i, o, r, a = {
			thin: "0px",
			medium: "1px",
			thick: "2px"
		};
		if (t) return s = t.getElementsByTagName("td")[0], r = p.getComputedStyle(t, "border-left-width"), n = parseInt(a[r] || r, 10), r = p.getComputedStyle(s, "padding-left"), i = parseInt(a[r] || r, 10), r = p.getComputedStyle(s, "border-left-width"), o = parseInt(a[r] || r, 10), {
			tableBorder: n,
			tdPadding: i,
			tdBorder: o
		};
		t = e.document.createElement("table"), t.insertRow(0).insertCell(0).innerHTML = "xxx", e.body.appendChild(t);
		var s = t.getElementsByTagName("td")[0];
		return r = p.getComputedStyle(t, "border-left-width"), n = parseInt(a[r] || r, 10), r = p.getComputedStyle(s, "padding-left"), i = parseInt(a[r] || r, 10), r = p.getComputedStyle(s, "border-left-width"), o = parseInt(a[r] || r, 10), p.remove(t), {
			tableBorder: n,
			tdPadding: i,
			tdBorder: o
		};
	}, t.getUETable = function(e) {
		var n = e.tagName.toLowerCase();
		return e = "td" == n || "th" == n || "caption" == n ? p.findParentByTagName(e, "table", !0) : e, e.ueTable || (e.ueTable = new t(e)), e.ueTable;
	}, t.cloneCell = function(e, t, n) {
		if (!e || c.isString(e)) return this.table.ownerDocument.createElement(e || "td");
		var i = p.hasClass(e, "selectTdClass");
		i && p.removeClasses(e, "selectTdClass");
		var o = e.cloneNode(!0);
		return t && (o.rowSpan = o.colSpan = 1), !n && p.removeAttributes(o, "width height"), !n && p.removeAttributes(o, "style"), o.style.borderLeftStyle = "", o.style.borderTopStyle = "", o.style.borderLeftColor = e.style.borderRightColor, o.style.borderLeftWidth = e.style.borderRightWidth, o.style.borderTopColor = e.style.borderBottomColor, o.style.borderTopWidth = e.style.borderBottomWidth, i && p.addClass(e, "selectTdClass"), o;
	}, t.prototype = {
		getMaxRows: function() {
			for (var e, t = this.table.rows, n = 1, i = 0; e = t[i]; i++) {
				for (var o, r = 1, a = 0; o = e.cells[a++];) r = Math.max(o.rowSpan || 1, r);
				n = Math.max(r + i, n);
			}
			return n;
		},
		getMaxCols: function() {
			for (var e, t = this.table.rows, n = 0, i = {}, o = 0; e = t[o]; o++) {
				for (var r, a = 0, s = 0; r = e.cells[s++];) if (a += r.colSpan || 1, r.rowSpan && r.rowSpan > 1) for (var l = 1; l < r.rowSpan; l++) i["row_" + (o + l)] ? i["row_" + (o + l)]++ : i["row_" + (o + l)] = r.colSpan || 1;
				a += i["row_" + o] || 0, n = Math.max(a, n);
			}
			return n;
		},
		getCellColIndex: function() {},
		getHSideCell: function(t, n) {
			try {
				var i, o, r = this.getCellInfo(t),
					a = this.selectedTds.length,
					s = this.cellsRange;
				return !n && (a ? !s.beginColIndex : !r.colIndex) || n && (a ? s.endColIndex == this.colsNum - 1 : r.colIndex == this.colsNum - 1) ? null : (i = a ? s.beginRowIndex : r.rowIndex, o = n ? a ? s.endColIndex + 1 : r.colIndex + 1 : a ? s.beginColIndex - 1 : r.colIndex < 1 ? 0 : r.colIndex - 1, this.getCell(this.indexTable[i][o].rowIndex, this.indexTable[i][o].cellIndex));
			} catch (l) {
				e(l);
			}
		},
		getTabNextCell: function(e, t) {
			var n, i = this.getCellInfo(e),
				o = t || i.rowIndex,
				r = i.colIndex + 1 + (i.colSpan - 1);
			try {
				n = this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex);
			} catch (a) {
				try {
					o = 1 * o + 1, r = 0, n = this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex);
				} catch (a) {}
			}
			return n;
		},
		getVSideCell: function(t, n, i) {
			try {
				var o, r, a = this.getCellInfo(t),
					s = this.selectedTds.length && !i,
					l = this.cellsRange;
				return !n && 0 == a.rowIndex || n && (s ? l.endRowIndex == this.rowsNum - 1 : a.rowIndex + a.rowSpan > this.rowsNum - 1) ? null : (o = n ? s ? l.endRowIndex + 1 : a.rowIndex + a.rowSpan : s ? l.beginRowIndex - 1 : a.rowIndex - 1, r = s ? l.beginColIndex : a.colIndex, this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex));
			} catch (d) {
				e(d);
			}
		},
		getSameEndPosCells: function(t, n) {
			try {
				for (var i = "x" === n.toLowerCase(), o = p.getXY(t)[i ? "x" : "y"] + t["offset" + (i ? "Width" : "Height")], r = this.table.rows, a = null, s = [], l = 0; l < this.rowsNum; l++) {
					a = r[l].cells;
					for (var d, c = 0; d = a[c++];) {
						var u = p.getXY(d)[i ? "x" : "y"] + d["offset" + (i ? "Width" : "Height")];
						if (u > o && i) break;
						if ((t == d || o == u) && (1 == d[i ? "colSpan" : "rowSpan"] && s.push(d), i)) break;
					}
				}
				return s;
			} catch (f) {
				e(f);
			}
		},
		setCellContent: function(e, t) {
			e.innerHTML = t || (s.ie ? p.fillChar : "<br />");
		},
		cloneCell: t.cloneCell,
		getSameStartPosXCells: function(t) {
			try {
				for (var n, i = p.getXY(t).x + t.offsetWidth, o = this.table.rows, r = [], a = 0; a < this.rowsNum; a++) {
					n = o[a].cells;
					for (var s, l = 0; s = n[l++];) {
						var d = p.getXY(s).x;
						if (d > i) break;
						if (d == i && 1 == s.colSpan) {
							r.push(s);
							break;
						}
					}
				}
				return r;
			} catch (c) {
				e(c);
			}
		},
		update: function(e) {
			this.table = e || this.table, this.selectedTds = [], this.cellsRange = {}, this.indexTable = [];
			for (var t = this.table.rows, n = this.getMaxRows(), i = n - t.length, o = this.getMaxCols(); i--;) this.table.insertRow(t.length);
			this.rowsNum = n, this.colsNum = o;
			for (var r = 0, a = t.length; a > r; r++) this.indexTable[r] = new Array(o);
			for (var s, l = 0; s = t[l]; l++) for (var d, u = 0, f = s.cells; d = f[u]; u++) {
				d.rowSpan > n && (d.rowSpan = n);
				for (var m = u, h = d.rowSpan || 1, g = d.colSpan || 1; this.indexTable[l][m];) m++;
				for (var v = 0; h > v; v++) for (var b = 0; g > b; b++) this.indexTable[l + v][m + b] = {
					rowIndex: l,
					cellIndex: u,
					colIndex: m,
					rowSpan: h,
					colSpan: g
				};
			}
			for (v = 0; n > v; v++) for (b = 0; o > b; b++) void 0 === this.indexTable[v][b] && (s = t[v], d = s.cells[s.cells.length - 1], d = d ? d.cloneNode(!0) : this.table.ownerDocument.createElement("td"), this.setCellContent(d), 1 !== d.colSpan && (d.colSpan = 1), 1 !== d.rowSpan && (d.rowSpan = 1), s.appendChild(d), this.indexTable[v][b] = {
				rowIndex: v,
				cellIndex: d.cellIndex,
				colIndex: b,
				rowSpan: 1,
				colSpan: 1
			});
			var y = p.getElementsByTagName(this.table, "td"),
				C = [];
			if (c.each(y, function(e) {
				p.hasClass(e, "selectTdClass") && C.push(e);
			}), C.length) {
				var N = C[0],
					x = C[C.length - 1],
					w = this.getCellInfo(N),
					E = this.getCellInfo(x);
				this.selectedTds = C, this.cellsRange = {
					beginRowIndex: w.rowIndex,
					beginColIndex: w.colIndex,
					endRowIndex: E.rowIndex + E.rowSpan - 1,
					endColIndex: E.colIndex + E.colSpan - 1
				};
			}
		},
		getCellInfo: function(e) {
			if (e) for (var t = e.cellIndex, n = e.parentNode.rowIndex, i = this.indexTable[n], o = this.colsNum, r = t; o > r; r++) {
				var a = i[r];
				if (a.rowIndex === n && a.cellIndex === t) return a;
			}
		},
		getCell: function(e, t) {
			return e < this.rowsNum && this.table.rows[e].cells[t] || null;
		},
		deleteCell: function(e, t) {
			t = "number" == typeof t ? t : e.parentNode.rowIndex;
			var n = this.table.rows[t];
			n.deleteCell(e.cellIndex);
		},
		getCellsRange: function(e, t) {
			function n(e, t, o, r) {
				var a, s, l, d = e,
					c = t,
					u = o,
					f = r;
				if (e > 0) for (s = t; r > s; s++) a = i.indexTable[e][s], l = a.rowIndex, e > l && (d = Math.min(l, d));
				if (r < i.colsNum) for (l = e; o > l; l++) a = i.indexTable[l][r], s = a.colIndex + a.colSpan - 1, s > r && (f = Math.max(s, f));
				if (o < i.rowsNum) for (s = t; r > s; s++) a = i.indexTable[o][s], l = a.rowIndex + a.rowSpan - 1, l > o && (u = Math.max(l, u));
				if (t > 0) for (l = e; o > l; l++) a = i.indexTable[l][t], s = a.colIndex, t > s && (c = Math.min(a.colIndex, c));
				return d != e || c != t || u != o || f != r ? n(d, c, u, f) : {
					beginRowIndex: e,
					beginColIndex: t,
					endRowIndex: o,
					endColIndex: r
				};
			}
			try {
				var i = this,
					o = i.getCellInfo(e);
				if (e === t) return {
					beginRowIndex: o.rowIndex,
					beginColIndex: o.colIndex,
					endRowIndex: o.rowIndex + o.rowSpan - 1,
					endColIndex: o.colIndex + o.colSpan - 1
				};
				var r = i.getCellInfo(t),
					a = Math.min(o.rowIndex, r.rowIndex),
					s = Math.min(o.colIndex, r.colIndex),
					l = Math.max(o.rowIndex + o.rowSpan - 1, r.rowIndex + r.rowSpan - 1),
					d = Math.max(o.colIndex + o.colSpan - 1, r.colIndex + r.colSpan - 1);
				return n(a, s, l, d);
			} catch (c) {}
		},
		getCells: function(e) {
			this.clearSelected();
			for (var t, n, i, o = e.beginRowIndex, r = e.beginColIndex, a = e.endRowIndex, s = e.endColIndex, l = {}, d = [], c = o; a >= c; c++) for (var u = r; s >= u; u++) {
				t = this.indexTable[c][u], n = t.rowIndex, i = t.colIndex;
				var f = n + "|" + i;
				if (!l[f]) {
					if (l[f] = 1, c > n || u > i || n + t.rowSpan - 1 > a || i + t.colSpan - 1 > s) return null;
					d.push(this.getCell(n, t.cellIndex));
				}
			}
			return d;
		},
		clearSelected: function() {
			t.removeSelectedClass(this.selectedTds), this.selectedTds = [], this.cellsRange = {};
		},
		setSelected: function(e) {
			var n = this.getCells(e);
			t.addSelectedClass(n), this.selectedTds = n, this.cellsRange = e;
		},
		isFullRow: function() {
			var e = this.cellsRange;
			return e.endColIndex - e.beginColIndex + 1 == this.colsNum;
		},
		isFullCol: function() {
			var e = this.cellsRange,
				t = this.table,
				n = t.getElementsByTagName("th"),
				i = e.endRowIndex - e.beginRowIndex + 1;
			return n.length ? i == this.rowsNum || i == this.rowsNum - 1 : i == this.rowsNum;
		},
		getNextCell: function(t, n, i) {
			try {
				var o, r, a = this.getCellInfo(t),
					s = this.selectedTds.length && !i,
					l = this.cellsRange;
				return !n && 0 == a.rowIndex || n && (s ? l.endRowIndex == this.rowsNum - 1 : a.rowIndex + a.rowSpan > this.rowsNum - 1) ? null : (o = n ? s ? l.endRowIndex + 1 : a.rowIndex + a.rowSpan : s ? l.beginRowIndex - 1 : a.rowIndex - 1, r = s ? l.beginColIndex : a.colIndex, this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex));
			} catch (d) {
				e(d);
			}
		},
		getPreviewCell: function(t, n) {
			try {
				var i, o, r = this.getCellInfo(t),
					a = this.selectedTds.length,
					s = this.cellsRange;
				return !n && (a ? !s.beginColIndex : !r.colIndex) || n && (a ? s.endColIndex == this.colsNum - 1 : r.rowIndex > this.colsNum - 1) ? null : (i = n ? a ? s.beginRowIndex : r.rowIndex < 1 ? 0 : r.rowIndex - 1 : a ? s.beginRowIndex : r.rowIndex, o = n ? a ? s.endColIndex + 1 : r.colIndex : a ? s.beginColIndex - 1 : r.colIndex < 1 ? 0 : r.colIndex - 1, this.getCell(this.indexTable[i][o].rowIndex, this.indexTable[i][o].cellIndex));
			} catch (l) {
				e(l);
			}
		},
		moveContent: function(e, n) {
			if (!t.isEmptyBlock(n)) {
				if (t.isEmptyBlock(e)) return void(e.innerHTML = n.innerHTML);
				var i = e.lastChild;
				for (3 != i.nodeType && f.$block[i.tagName] || e.appendChild(e.ownerDocument.createElement("br")); i = n.firstChild;) e.appendChild(i);
			}
		},
		mergeRight: function(e) {
			var t = this.getCellInfo(e),
				n = t.colIndex + t.colSpan,
				i = this.indexTable[t.rowIndex][n],
				o = this.getCell(i.rowIndex, i.cellIndex);
			e.colSpan = t.colSpan + i.colSpan, e.removeAttribute("width"), this.moveContent(e, o), this.deleteCell(o, i.rowIndex), this.update();
		},
		mergeDown: function(e) {
			var t = this.getCellInfo(e),
				n = t.rowIndex + t.rowSpan,
				i = this.indexTable[n][t.colIndex],
				o = this.getCell(i.rowIndex, i.cellIndex);
			e.rowSpan = t.rowSpan + i.rowSpan, e.removeAttribute("height"), this.moveContent(e, o), this.deleteCell(o, i.rowIndex), this.update();
		},
		mergeRange: function() {
			var e = this.cellsRange,
				t = this.getCell(e.beginRowIndex, this.indexTable[e.beginRowIndex][e.beginColIndex].cellIndex);
			if ("TH" == t.tagName && e.endRowIndex !== e.beginRowIndex) {
				var n = this.indexTable,
					i = this.getCellInfo(t);
				t = this.getCell(1, n[1][i.colIndex].cellIndex), e = this.getCellsRange(t, this.getCell(n[this.rowsNum - 1][i.colIndex].rowIndex, n[this.rowsNum - 1][i.colIndex].cellIndex));
			}
			for (var o, r = this.getCells(e), a = 0; o = r[a++];) o !== t && (this.moveContent(t, o), this.deleteCell(o));
			if (t.rowSpan = e.endRowIndex - e.beginRowIndex + 1, t.rowSpan > 1 && t.removeAttribute("height"), t.colSpan = e.endColIndex - e.beginColIndex + 1, t.colSpan > 1 && t.removeAttribute("width"), t.rowSpan == this.rowsNum && 1 != t.colSpan && (t.colSpan = 1), t.colSpan == this.colsNum && 1 != t.rowSpan) {
				var s = t.parentNode.rowIndex;
				if (this.table.deleteRow) for (var a = s + 1, l = s + 1, d = t.rowSpan; d > a; a++) this.table.deleteRow(l);
				else for (var a = 0, d = t.rowSpan - 1; d > a; a++) {
					var c = this.table.rows[s + 1];
					c.parentNode.removeChild(c);
				}
				t.rowSpan = 1;
			}
			this.update();
		},
		insertRow: function(e, t) {
			{
				var n, i = this.colsNum,
					o = this.table,
					r = o.insertRow(e);
				parseInt((o.offsetWidth - 20 * i - i - 1) / i, 10);
			}
			if (0 == e || e == this.rowsNum) for (var a = 0; i > a; a++) n = this.cloneCell(t, !0), this.setCellContent(n), n.getAttribute("vAlign") && n.setAttribute("vAlign", n.getAttribute("vAlign")), r.appendChild(n);
			else {
				var s = this.indexTable[e];
				for (a = 0; i > a; a++) {
					var l = s[a];
					l.rowIndex < e ? (n = this.getCell(l.rowIndex, l.cellIndex), n.rowSpan = l.rowSpan + 1) : (n = this.cloneCell(t, !0), this.setCellContent(n), r.appendChild(n));
				}
			}
			return this.update(), r;
		},
		deleteRow: function(e) {
			for (var t = this.table.rows[e], n = this.indexTable[e], i = this.colsNum, o = 0, r = 0; i > r;) {
				var a = n[r],
					s = this.getCell(a.rowIndex, a.cellIndex);
				if (s.rowSpan > 1 && a.rowIndex == e) {
					var l = s.cloneNode(!0);
					l.rowSpan = s.rowSpan - 1, l.innerHTML = "", s.rowSpan = 1;
					var d, u = e + 1,
						f = this.table.rows[u],
						m = this.getPreviewMergedCellsNum(u, r) - o;
					r > m ? (d = r - m - 1, p.insertAfter(f.cells[d], l)) : f.cells.length && f.insertBefore(l, f.cells[0]), o += 1;
				}
				r += s.colSpan || 1;
			}
			var h = [],
				g = {};
			for (r = 0; i > r; r++) {
				var v = n[r].rowIndex,
					b = n[r].cellIndex,
					y = v + "_" + b;
				g[y] || (g[y] = 1, s = this.getCell(v, b), h.push(s));
			}
			var C = [];
			c.each(h, function(e) {
				1 == e.rowSpan ? e.parentNode.removeChild(e) : C.push(e);
			}), c.each(C, function(e) {
				e.rowSpan--;
			}), t.parentNode.removeChild(t), this.update();
		},
		insertCol: function(e, t, n) {
			function i(e, t, n) {
				if (0 == e) {
					var i = t.nextSibling || t.previousSibling;
					"TH" == i.tagName && (i = t.ownerDocument.createElement("th"), i.appendChild(t.firstChild), n.insertBefore(i, t), p.remove(t));
				} else if ("TH" == t.tagName) {
					var o = t.ownerDocument.createElement("td");
					o.appendChild(t.firstChild), n.insertBefore(o, t), p.remove(t);
				}
			}
			var o, r, a, s = this.rowsNum,
				l = 0,
				d = parseInt((this.table.offsetWidth - 20 * (this.colsNum + 1) - (this.colsNum + 1)) / (this.colsNum + 1), 10);
			if (0 == e || e == this.colsNum) for (; s > l; l++) o = this.table.rows[l], a = o.cells[0 == e ? e : o.cells.length], r = this.cloneCell(t, !0), this.setCellContent(r), r.setAttribute("vAlign", r.getAttribute("vAlign")), a && r.setAttribute("width", a.getAttribute("width")), e ? p.insertAfter(o.cells[o.cells.length - 1], r) : o.insertBefore(r, o.cells[0]), i(l, r, o);
			else for (; s > l; l++) {
				var c = this.indexTable[l][e];
				c.colIndex < e ? (r = this.getCell(c.rowIndex, c.cellIndex), r.colSpan = c.colSpan + 1) : (o = this.table.rows[l], a = o.cells[c.cellIndex], r = this.cloneCell(t, !0), this.setCellContent(r), r.setAttribute("vAlign", r.getAttribute("vAlign")), a && r.setAttribute("width", a.getAttribute("width")), a ? o.insertBefore(r, a) : o.appendChild(r)), i(l, r, o);
			}
			this.update(), this.updateWidth(d, n || {
				tdPadding: 10,
				tdBorder: 1
			});
		},
		updateWidth: function(e, n) {
			var i = this.table,
				o = t.getWidth(i) - 2 * n.tdPadding - n.tdBorder + e;
			if (o < i.ownerDocument.body.offsetWidth) return void i.setAttribute("width", o);
			var r = p.getElementsByTagName(this.table, "td");
			c.each(r, function(t) {
				t.setAttribute("width", e);
			});
		},
		deleteCol: function(e) {
			for (var t = this.indexTable, n = this.table.rows, i = this.table.getAttribute("width"), o = 0, r = this.rowsNum, a = {}, s = 0; r > s;) {
				var l = t[s],
					d = l[e],
					c = d.rowIndex + "_" + d.colIndex;
				if (!a[c]) {
					a[c] = 1;
					var u = this.getCell(d.rowIndex, d.cellIndex);
					o || (o = u && parseInt(u.offsetWidth / u.colSpan, 10).toFixed(0)), u.colSpan > 1 ? u.colSpan-- : n[s].deleteCell(d.cellIndex), s += d.rowSpan || 1;
				}
			}
			this.table.setAttribute("width", i - o), this.update();
		},
		splitToCells: function(e) {
			var t = this,
				n = this.splitToRows(e);
			c.each(n, function(e) {
				t.splitToCols(e);
			});
		},
		splitToRows: function(e) {
			var t = this.getCellInfo(e),
				n = t.rowIndex,
				i = t.colIndex,
				o = [];
			e.rowSpan = 1, o.push(e);
			for (var r = n, a = n + t.rowSpan; a > r; r++) if (r != n) {
				var s = this.table.rows[r],
					l = s.insertCell(i - this.getPreviewMergedCellsNum(r, i));
				l.colSpan = t.colSpan, this.setCellContent(l), l.setAttribute("vAlign", e.getAttribute("vAlign")), l.setAttribute("align", e.getAttribute("align")), e.style.cssText && (l.style.cssText = e.style.cssText), o.push(l);
			}
			return this.update(), o;
		},
		getPreviewMergedCellsNum: function(e, t) {
			for (var n = this.indexTable[e], i = 0, o = 0; t > o;) {
				var r = n[o].colSpan,
					a = n[o].rowIndex;
				i += r - (a == e ? 1 : 0), o += r;
			}
			return i;
		},
		splitToCols: function(e) {
			var t = (e.offsetWidth / e.colSpan - 22).toFixed(0),
				n = this.getCellInfo(e),
				i = n.rowIndex,
				o = n.colIndex,
				r = [];
			e.colSpan = 1, e.setAttribute("width", t), r.push(e);
			for (var a = o, s = o + n.colSpan; s > a; a++) if (a != o) {
				var l = this.table.rows[i],
					d = l.insertCell(this.indexTable[i][a].cellIndex + 1);
				if (d.rowSpan = n.rowSpan, this.setCellContent(d), d.setAttribute("vAlign", e.getAttribute("vAlign")), d.setAttribute("align", e.getAttribute("align")), d.setAttribute("width", t), e.style.cssText && (d.style.cssText = e.style.cssText), "TH" == e.tagName) {
					var c = e.ownerDocument.createElement("th");
					c.appendChild(d.firstChild), c.setAttribute("vAlign", e.getAttribute("vAlign")), c.rowSpan = d.rowSpan, l.insertBefore(c, d), p.remove(d);
				}
				r.push(d);
			}
			return this.update(), r;
		},
		isLastCell: function(e, t, n) {
			t = t || this.rowsNum, n = n || this.colsNum;
			var i = this.getCellInfo(e);
			return i.rowIndex + i.rowSpan == t && i.colIndex + i.colSpan == n;
		},
		getLastCell: function(e) {
			e = e || this.table.getElementsByTagName("td");
			var t, n = (this.getCellInfo(e[0]), this),
				i = e[0],
				o = i.parentNode,
				r = 0,
				a = 0;
			return c.each(e, function(e) {
				e.parentNode == o && (a += e.colSpan || 1), r += e.rowSpan * e.colSpan || 1;
			}), t = r / a, c.each(e, function(e) {
				return n.isLastCell(e, t, a) ? (i = e, !1) : void 0;
			}), i;
		},
		selectRow: function(e) {
			var t = this.indexTable[e],
				n = this.getCell(t[0].rowIndex, t[0].cellIndex),
				i = this.getCell(t[this.colsNum - 1].rowIndex, t[this.colsNum - 1].cellIndex),
				o = this.getCellsRange(n, i);
			this.setSelected(o);
		},
		selectTable: function() {
			var e = this.table.getElementsByTagName("td"),
				t = this.getCellsRange(e[0], e[e.length - 1]);
			this.setSelected(t);
		},
		sortTable: function(e, t) {
			var n = this.table,
				i = n.rows,
				o = [],
				r = "TH" === i[0].cells[0].tagName,
				a = 0;
			if (this.selectedTds.length) {
				for (var s = this.cellsRange, l = s.endRowIndex + 1, d = s.beginRowIndex; l > d; d++) o[d] = i[d];
				o.splice(0, s.beginRowIndex), a = s.endRowIndex + 1 === this.rowsNum ? 0 : s.endRowIndex + 1;
			} else for (var d = 0, l = i.length; l > d; d++) o[d] = i[d];
			r && o.splice(0, 1), o = c.sort(o, function(n, i) {
				var o = function(e) {
						return e.innerText || e.textContent;
					};
				return t ? "number" == typeof t ? t : t.call(this, n.cells[e], i.cells[e]) : function() {
					var t = o(n.cells[e]),
						r = o(i.cells[e]);
					return t.localeCompare(r);
				}();
			});
			for (var u = n.ownerDocument.createDocumentFragment(), f = 0, l = o.length; l > f; f++) u.appendChild(o[f]);
			var m = n.getElementsByTagName("tbody")[0];
			a ? m.insertBefore(u, i[a - s.endRowIndex + s.beginRowIndex - 1]) : m.appendChild(u);
		},
		setBackground: function(e, t) {
			if ("string" == typeof t) c.each(e, function(e) {
				e.style.backgroundColor = t;
			});
			else if ("object" == typeof t) {
				t = c.extend({
					repeat: !0,
					colorList: ["#ddd", "#fff"]
				}, t);
				for (var n, i = this.getCellInfo(e[0]).rowIndex, o = 0, r = t.colorList, a = function(e, t, n) {
						return e[t] ? e[t] : n ? e[t % e.length] : "";
					}, s = 0; n = e[s++];) {
					var l = this.getCellInfo(n);
					n.style.backgroundColor = a(r, i + o == l.rowIndex ? o : ++o, t.repeat);
				}
			}
		},
		removeBackground: function(e) {
			c.each(e, function(e) {
				e.style.backgroundColor = "";
			});
		}
	};
}(), function() {
	function e(e, n) {
		var i = e.getElementsByTagName("td");
		c.each(i, function(e) {
			e.removeAttribute("width");
		}), e.setAttribute("width", t(n, !0, a(n, e))), setTimeout(function() {
			c.each(i, function(e) {
				1 == e.colSpan && e.setAttribute("width", e.offsetWidth + "");
			});
		}, 0);
	}

	function t(e, t, n) {
		var i = e.body;
		return i.offsetWidth - (t ? 2 * parseInt(p.getComputedStyle(i, "margin-left"), 10) : 0) - 2 * n.tableBorder - (e.options.offsetWidth || 0);
	}

	function n(e) {
		var t = o(e).cell;
		if (t) {
			var n = l(t);
			return n.selectedTds.length ? n.selectedTds : [t];
		}
		return [];
	}
	var i = UE.UETable,
		o = function(e) {
			return i.getTableItemsByRange(e);
		},
		r = function(e) {
			return i.getUETableBySelected(e);
		},
		a = function(e, t) {
			return i.getDefaultValue(e, t);
		},
		l = function(e) {
			return i.getUETable(e);
		};
	UE.commands.inserttable = {
		queryCommandState: function() {
			return o(this).table ? -1 : 0;
		},
		execCommand: function(e, t) {
			function n(e, t) {
				for (var n = [], i = e.numRows, o = e.numCols, r = 0; i > r; r++) {
					n.push("<tr>");
					for (var a = 0; o > a; a++) n.push('<td width="' + t + '"  vAlign="' + e.tdvalign + '" >' + (s.ie ? p.fillChar : "<br/>") + "</td>");
					n.push("</tr>");
				}
				return "<table><tbody>" + n.join("") + "</tbody></table>";
			}
			t || (t = c.extend({}, {
				numCols: this.options.defaultCols,
				numRows: this.options.defaultRows,
				tdvalign: this.options.tdvalign
			}));
			var i = this,
				o = this.selection.getRange(),
				r = o.startContainer,
				l = p.findParent(r, function(e) {
					return p.isBlockElm(e);
				}, !0) || i.body,
				d = a(i),
				u = l.offsetWidth,
				f = Math.floor(u / t.numCols - 2 * d.tdPadding - d.tdBorder);
			!t.tdvalign && (t.tdvalign = i.options.tdvalign), i.execCommand("inserthtml", n(t, f));
		}
	}, UE.commands.insertparagraphbeforetable = {
		queryCommandState: function() {
			return o(this).cell ? 0 : -1;
		},
		execCommand: function() {
			var e = o(this).table;
			if (e) {
				var t = this.document.createElement("p");
				t.innerHTML = s.ie ? "&nbsp;" : "<br />", e.parentNode.insertBefore(t, e), this.selection.getRange().setStart(t, 0).setCursor();
			}
		}
	}, UE.commands.deletetable = {
		queryCommandState: function() {
			var e = this.selection.getRange();
			return p.findParentByTagName(e.startContainer, "table", !0) ? 0 : -1;
		},
		execCommand: function(e, t) {
			var n = this.selection.getRange();
			if (t = t || p.findParentByTagName(n.startContainer, "table", !0)) {
				var i = t.nextSibling;
				i || (i = p.createElement(this.document, "p", {
					innerHTML: s.ie ? p.fillChar : "<br/>"
				}), t.parentNode.insertBefore(i, t)), p.remove(t), n = this.selection.getRange(), 3 == i.nodeType ? n.setStartBefore(i) : n.setStart(i, 0), n.setCursor(!1, !0), this.fireEvent("tablehasdeleted");
			}
		}
	}, UE.commands.cellalign = {
		queryCommandState: function() {
			return n(this).length ? 0 : -1;
		},
		execCommand: function(e, t) {
			var i = n(this);
			if (i.length) for (var o, r = 0; o = i[r++];) o.setAttribute("align", t);
		}
	}, UE.commands.cellvalign = {
		queryCommandState: function() {
			return n(this).length ? 0 : -1;
		},
		execCommand: function(e, t) {
			var i = n(this);
			if (i.length) for (var o, r = 0; o = i[r++];) o.setAttribute("vAlign", t);
		}
	}, UE.commands.insertcaption = {
		queryCommandState: function() {
			var e = o(this).table;
			return e && 0 == e.getElementsByTagName("caption").length ? 1 : -1;
		},
		execCommand: function() {
			var e = o(this).table;
			if (e) {
				var t = this.document.createElement("caption");
				t.innerHTML = s.ie ? p.fillChar : "<br/>", e.insertBefore(t, e.firstChild);
				var n = this.selection.getRange();
				n.setStart(t, 0).setCursor();
			}
		}
	}, UE.commands.deletecaption = {
		queryCommandState: function() {
			var e = this.selection.getRange(),
				t = p.findParentByTagName(e.startContainer, "table");
			return t ? 0 == t.getElementsByTagName("caption").length ? -1 : 1 : -1;
		},
		execCommand: function() {
			var e = this.selection.getRange(),
				t = p.findParentByTagName(e.startContainer, "table");
			if (t) {
				p.remove(t.getElementsByTagName("caption")[0]);
				var n = this.selection.getRange();
				n.setStart(t.rows[0].cells[0], 0).setCursor();
			}
		}
	}, UE.commands.inserttitle = {
		queryCommandState: function() {
			var e = o(this).table;
			if (e) {
				var t = e.rows[0];
				return 0 == t.getElementsByTagName("th").length ? 0 : -1;
			}
			return -1;
		},
		execCommand: function() {
			var e = o(this).table;
			e && l(e).insertRow(0, "th");
			var t = e.getElementsByTagName("th")[0];
			this.selection.getRange().setStart(t, 0).setCursor(!1, !0);
		}
	}, UE.commands.deletetitle = {
		queryCommandState: function() {
			var e = o(this).table;
			if (e) {
				var t = e.rows[0];
				return t.getElementsByTagName("th").length ? 0 : -1;
			}
			return -1;
		},
		execCommand: function() {
			var e = o(this).table;
			e && p.remove(e.rows[0]);
			var t = e.getElementsByTagName("td")[0];
			this.selection.getRange().setStart(t, 0).setCursor(!1, !0);
		}
	}, UE.commands.mergeright = {
		queryCommandState: function() {
			var e = o(this);
			if (!e.cell) return -1;
			var t = l(e.table);
			if (t.selectedTds.length) return -1;
			var n = t.getCellInfo(e.cell),
				i = n.colIndex + n.colSpan;
			if (i >= t.colsNum) return -1;
			var r = t.indexTable[n.rowIndex][i];
			return r.rowIndex == n.rowIndex && r.rowSpan == n.rowSpan ? 0 : -1;
		},
		execCommand: function() {
			var e = this.selection.getRange(),
				t = e.createBookmark(!0),
				n = o(this).cell,
				i = l(n);
			i.mergeRight(n), e.moveToBookmark(t).select();
		}
	}, UE.commands.mergedown = {
		queryCommandState: function() {
			var e = o(this),
				t = e.cell;
			if (!t || "TH" == t.tagName) return -1;
			var n = l(e.table);
			if (n.selectedTds.length) return -1;
			var i = n.getCellInfo(e.cell),
				r = i.rowIndex + i.rowSpan;
			if (r >= n.rowsNum) return -1;
			var a = n.indexTable[r][i.colIndex];
			return a.colIndex == i.colIndex && a.colSpan == i.colSpan && "TH" !== e.cell.tagName ? 0 : -1;
		},
		execCommand: function() {
			var e = this.selection.getRange(),
				t = e.createBookmark(!0),
				n = o(this).cell,
				i = l(n);
			i.mergeDown(n), e.moveToBookmark(t).select();
		}
	}, UE.commands.mergecells = {
		queryCommandState: function() {
			return r(this) ? 0 : -1;
		},
		execCommand: function() {
			var e = r(this);
			if (e && e.selectedTds.length) {
				var t = e.selectedTds[0];
				e.mergeRange();
				var n = this.selection.getRange();
				p.isEmptyBlock(t) ? n.setStart(t, 0).collapse(!0) : n.selectNodeContents(t), n.select();
			}
		}
	}, UE.commands.insertrow = {
		queryCommandState: function() {
			var e = o(this),
				t = e.cell;
			return t && "TD" == t.tagName && l(e.table).rowsNum < this.options.maxRowNum ? 0 : -1;
		},
		execCommand: function() {
			var e = this.selection.getRange(),
				t = e.createBookmark(!0),
				n = o(this),
				i = n.cell,
				r = n.table,
				a = l(r),
				s = a.getCellInfo(i);
			if (a.selectedTds.length) for (var d = a.cellsRange, c = 0, u = d.endRowIndex - d.beginRowIndex + 1; u > c; c++) a.insertRow(d.beginRowIndex, i);
			else a.insertRow(s.rowIndex, i);
			e.moveToBookmark(t).select(), "enabled" === r.getAttribute("interlaced") && this.fireEvent("interlacetable", r);
		}
	}, UE.commands.insertrownext = {
		queryCommandState: function() {
			var e = o(this),
				t = e.cell;
			return t && "TD" == t.tagName && l(e.table).rowsNum < this.options.maxRowNum ? 0 : -1;
		},
		execCommand: function() {
			var e = this.selection.getRange(),
				t = e.createBookmark(!0),
				n = o(this),
				i = n.cell,
				r = n.table,
				a = l(r),
				s = a.getCellInfo(i);
			if (a.selectedTds.length) for (var d = a.cellsRange, c = 0, u = d.endRowIndex - d.beginRowIndex + 1; u > c; c++) a.insertRow(d.endRowIndex + 1, i);
			else a.insertRow(s.rowIndex + s.rowSpan, i);
			e.moveToBookmark(t).select(), "enabled" === r.getAttribute("interlaced") && this.fireEvent("interlacetable", r);
		}
	}, UE.commands.deleterow = {
		queryCommandState: function() {
			var e = o(this);
			return e.cell ? 0 : -1;
		},
		execCommand: function() {
			var e = o(this).cell,
				t = l(e),
				n = t.cellsRange,
				i = t.getCellInfo(e),
				r = t.getVSideCell(e),
				a = t.getVSideCell(e, !0),
				s = this.selection.getRange();
			if (c.isEmptyObject(n)) t.deleteRow(i.rowIndex);
			else for (var d = n.beginRowIndex; d < n.endRowIndex + 1; d++) t.deleteRow(n.beginRowIndex);
			var u = t.table;
			if (u.getElementsByTagName("td").length) if (1 == i.rowSpan || i.rowSpan == n.endRowIndex - n.beginRowIndex + 1)(a || r) && s.selectNodeContents(a || r).setCursor(!1, !0);
			else {
				var f = t.getCell(i.rowIndex, t.indexTable[i.rowIndex][i.colIndex].cellIndex);
				f && s.selectNodeContents(f).setCursor(!1, !0);
			} else {
				var m = u.nextSibling;
				p.remove(u), m && s.setStart(m, 0).setCursor(!1, !0);
			}
			"enabled" === u.getAttribute("interlaced") && this.fireEvent("interlacetable", u);
		}
	}, UE.commands.insertcol = {
		queryCommandState: function() {
			var e = o(this),
				t = e.cell;
			return t && ("TD" == t.tagName || "TH" == t.tagName) && l(e.table).colsNum < this.options.maxColNum ? 0 : -1;
		},
		execCommand: function(e) {
			var t = this.selection.getRange(),
				n = t.createBookmark(!0);
			if (-1 != this.queryCommandState(e)) {
				var i = o(this).cell,
					r = l(i),
					a = r.getCellInfo(i);
				if (r.selectedTds.length) for (var s = r.cellsRange, d = 0, c = s.endColIndex - s.beginColIndex + 1; c > d; d++) r.insertCol(s.beginColIndex, i);
				else r.insertCol(a.colIndex, i);
				t.moveToBookmark(n).select(!0);
			}
		}
	}, UE.commands.insertcolnext = {
		queryCommandState: function() {
			var e = o(this),
				t = e.cell;
			return t && l(e.table).colsNum < this.options.maxColNum ? 0 : -1;
		},
		execCommand: function() {
			var e = this.selection.getRange(),
				t = e.createBookmark(!0),
				n = o(this).cell,
				i = l(n),
				r = i.getCellInfo(n);
			if (i.selectedTds.length) for (var a = i.cellsRange, s = 0, d = a.endColIndex - a.beginColIndex + 1; d > s; s++) i.insertCol(a.endColIndex + 1, n);
			else i.insertCol(r.colIndex + r.colSpan, n);
			e.moveToBookmark(t).select();
		}
	}, UE.commands.deletecol = {
		queryCommandState: function() {
			var e = o(this);
			return e.cell ? 0 : -1;
		},
		execCommand: function() {
			var e = o(this).cell,
				t = l(e),
				n = t.cellsRange,
				i = t.getCellInfo(e),
				r = t.getHSideCell(e),
				a = t.getHSideCell(e, !0);
			if (c.isEmptyObject(n)) t.deleteCol(i.colIndex);
			else for (var s = n.beginColIndex; s < n.endColIndex + 1; s++) t.deleteCol(n.beginColIndex);
			var d = t.table,
				u = this.selection.getRange();
			if (d.getElementsByTagName("td").length) p.inDoc(e, this.document) ? u.setStart(e, 0).setCursor(!1, !0) : a && p.inDoc(a, this.document) ? u.selectNodeContents(a).setCursor(!1, !0) : r && p.inDoc(r, this.document) && u.selectNodeContents(r).setCursor(!0, !0);
			else {
				var f = d.nextSibling;
				p.remove(d), f && u.setStart(f, 0).setCursor(!1, !0);
			}
		}
	}, UE.commands.splittocells = {
		queryCommandState: function() {
			var e = o(this),
				t = e.cell;
			if (!t) return -1;
			var n = l(e.table);
			return n.selectedTds.length > 0 ? -1 : t && (t.colSpan > 1 || t.rowSpan > 1) ? 0 : -1;
		},
		execCommand: function() {
			var e = this.selection.getRange(),
				t = e.createBookmark(!0),
				n = o(this).cell,
				i = l(n);
			i.splitToCells(n), e.moveToBookmark(t).select();
		}
	}, UE.commands.splittorows = {
		queryCommandState: function() {
			var e = o(this),
				t = e.cell;
			if (!t) return -1;
			var n = l(e.table);
			return n.selectedTds.length > 0 ? -1 : t && t.rowSpan > 1 ? 0 : -1;
		},
		execCommand: function() {
			var e = this.selection.getRange(),
				t = e.createBookmark(!0),
				n = o(this).cell,
				i = l(n);
			i.splitToRows(n), e.moveToBookmark(t).select();
		}
	}, UE.commands.splittocols = {
		queryCommandState: function() {
			var e = o(this),
				t = e.cell;
			if (!t) return -1;
			var n = l(e.table);
			return n.selectedTds.length > 0 ? -1 : t && t.colSpan > 1 ? 0 : -1;
		},
		execCommand: function() {
			var e = this.selection.getRange(),
				t = e.createBookmark(!0),
				n = o(this).cell,
				i = l(n);
			i.splitToCols(n), e.moveToBookmark(t).select();
		}
	}, UE.commands.adaptbytext = UE.commands.adaptbywindow = {
		queryCommandState: function() {
			return o(this).table ? 0 : -1;
		},
		execCommand: function(t) {
			var n = o(this),
				i = n.table;
			if (i) if ("adaptbywindow" == t) e(i, this);
			else {
				var r = p.getElementsByTagName(i, "td th");
				c.each(r, function(e) {
					e.removeAttribute("width");
				}), i.removeAttribute("width");
			}
		}
	}, UE.commands.averagedistributecol = {
		queryCommandState: function() {
			var e = r(this);
			return e && (e.isFullRow() || e.isFullCol()) ? 0 : -1;
		},
		execCommand: function() {
			function e() {
				var e, t = i.table,
					o = 0,
					r = 0,
					s = a(n, t);
				if (i.isFullRow()) o = t.offsetWidth, r = i.colsNum;
				else for (var l, d = i.cellsRange.beginColIndex, c = i.cellsRange.endColIndex, u = d; c >= u;) l = i.selectedTds[u], o += l.offsetWidth, u += l.colSpan, r += 1;
				return e = Math.ceil(o / r) - 2 * s.tdBorder - 2 * s.tdPadding;
			}

			function t(e) {
				c.each(p.getElementsByTagName(i.table, "th"), function(e) {
					e.setAttribute("width", "");
				});
				var t = i.isFullRow() ? p.getElementsByTagName(i.table, "td") : i.selectedTds;
				c.each(t, function(t) {
					1 == t.colSpan && t.setAttribute("width", e);
				});
			}
			var n = this,
				i = r(n);
			i && i.selectedTds.length && t(e());
		}
	}, UE.commands.averagedistributerow = {
		queryCommandState: function() {
			var e = r(this);
			return e ? e.selectedTds && /th/gi.test(e.selectedTds[0].tagName) ? -1 : e.isFullRow() || e.isFullCol() ? 0 : -1 : -1;
		},
		execCommand: function() {
			function e() {
				var e, t, o = 0,
					r = i.table,
					l = a(n, r),
					d = parseInt(p.getComputedStyle(r.getElementsByTagName("td")[0], "padding-top"));
				if (i.isFullCol()) {
					var c, u, f = p.getElementsByTagName(r, "caption"),
						m = p.getElementsByTagName(r, "th");
					f.length > 0 && (c = f[0].offsetHeight), m.length > 0 && (u = m[0].offsetHeight), o = r.offsetHeight - (c || 0) - (u || 0), t = 0 == m.length ? i.rowsNum : i.rowsNum - 1;
				} else {
					for (var h = i.cellsRange.beginRowIndex, g = i.cellsRange.endRowIndex, v = 0, b = p.getElementsByTagName(r, "tr"), y = h; g >= y; y++) o += b[y].offsetHeight, v += 1;
					t = v;
				}
				return e = s.ie && s.version < 9 ? Math.ceil(o / t) : Math.ceil(o / t) - 2 * l.tdBorder - 2 * d;
			}

			function t(e) {
				var t = i.isFullCol() ? p.getElementsByTagName(i.table, "td") : i.selectedTds;
				c.each(t, function(t) {
					1 == t.rowSpan && t.setAttribute("height", e);
				});
			}
			var n = this,
				i = r(n);
			i && i.selectedTds.length && t(e());
		}
	}, UE.commands.cellalignment = {
		queryCommandState: function() {
			return o(this).table ? 0 : -1;
		},
		execCommand: function(e, t) {
			var n = this,
				i = r(n);
			if (i) c.each(i.selectedTds, function(e) {
				p.setAttributes(e, t);
			});
			else {
				var o = n.selection.getStart(),
					a = o && p.findParentByTagName(o, ["td", "th", "caption"], !0);
				/caption/gi.test(a.tagName) ? (a.style.textAlign = t.align, a.style.verticalAlign = t.vAlign) : p.setAttributes(a, t), n.selection.getRange().setCursor(!0);
			}
		},
		queryCommandValue: function() {
			var e = o(this).cell;
			if (e || (e = n(this)[0]), e) {
				var t = UE.UETable.getUETable(e).selectedTds;
				return !t.length && (t = e), UE.UETable.getTableCellAlignState(t);
			}
			return null;
		}
	}, UE.commands.tablealignment = {
		queryCommandState: function() {
			return s.ie && s.version < 8 ? -1 : o(this).table ? 0 : -1;
		},
		execCommand: function(e, t) {
			var n = this,
				i = n.selection.getStart(),
				o = i && p.findParentByTagName(i, ["table"], !0);
			o && o.setAttribute("align", t);
		}
	}, UE.commands.edittable = {
		queryCommandState: function() {
			return o(this).table ? 0 : -1;
		},
		execCommand: function(e, t) {
			var n = this.selection.getRange(),
				i = p.findParentByTagName(n.startContainer, "table");
			if (i) {
				var o = p.getElementsByTagName(i, "td").concat(p.getElementsByTagName(i, "th"), p.getElementsByTagName(i, "caption"));
				c.each(o, function(e) {
					e.style.borderColor = t;
				});
			}
		}
	}, UE.commands.edittd = {
		queryCommandState: function() {
			return o(this).table ? 0 : -1;
		},
		execCommand: function(e, t) {
			var n = this,
				i = r(n);
			if (i) c.each(i.selectedTds, function(e) {
				e.style.backgroundColor = t;
			});
			else {
				var o = n.selection.getStart(),
					a = o && p.findParentByTagName(o, ["td", "th", "caption"], !0);
				a && (a.style.backgroundColor = t);
			}
		}
	}, UE.commands.sorttable = {
		queryCommandState: function() {
			var e = this,
				t = o(e);
			if (!t.cell) return -1;
			for (var n, i = t.table, r = i.getElementsByTagName("td"), a = 0; n = r[a++];) if (1 != n.rowSpan || 1 != n.colSpan) return -1;
			return 0;
		},
		execCommand: function(e, t) {
			var n = this,
				i = n.selection.getRange(),
				r = i.createBookmark(!0),
				a = o(n),
				s = a.cell,
				d = l(a.table),
				c = d.getCellInfo(s);
			d.sortTable(c.cellIndex, t), i.moveToBookmark(r).select();
		}
	}, UE.commands.enablesort = UE.commands.disablesort = {
		queryCommandState: function() {
			return o(this).table ? 0 : -1;
		},
		execCommand: function(e) {
			var t = o(this).table;
			t.setAttribute("data-sort", "enablesort" == e ? "sortEnabled" : "sortDisabled");
		}
	}, UE.commands.settablebackground = {
		queryCommandState: function() {
			return n(this).length > 1 ? 0 : -1;
		},
		execCommand: function(e, t) {
			var i, o;
			i = n(this), o = l(i[0]), o.setBackground(i, t);
		}
	}, UE.commands.cleartablebackground = {
		queryCommandState: function() {
			var e = n(this);
			if (!e.length) return -1;
			for (var t, i = 0; t = e[i++];) if ("" !== t.style.backgroundColor) return 0;
			return -1;
		},
		execCommand: function() {
			var e = n(this),
				t = l(e[0]);
			t.removeBackground(e);
		}
	}, UE.commands.interlacetable = UE.commands.uninterlacetable = {
		queryCommandState: function(e) {
			var t = o(this).table;
			if (!t) return -1;
			var n = t.getAttribute("interlaced");
			return "interlacetable" == e ? "enabled" === n ? -1 : 0 : n && "disabled" !== n ? 0 : -1;
		},
		execCommand: function(e, t) {
			var n = o(this).table;
			"interlacetable" == e ? (n.setAttribute("interlaced", "enabled"), this.fireEvent("interlacetable", n, t)) : (n.setAttribute("interlaced", "disabled"), this.fireEvent("uninterlacetable", n));
		}
	};
}(), UE.plugins.table = function() {
	function e() {}

	function t(e) {
		n(e, "width", !0), n(e, "height", !0);
	}

	function n(e, t, n) {
		e.style[t] && (n && e.setAttribute(t, parseInt(e.style[t], 10)), e.style[t] = "");
	}

	function i(e) {
		if ("TD" == e.tagName || "TH" == e.tagName) return e;
		var t;
		return (t = p.findParentByTagName(e, "td", !0) || p.findParentByTagName(e, "th", !0)) ? t : null;
	}

	function o(e) {
		var t = new RegExp(p.fillChar, "g");
		if (e[s.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(t, "").length > 0) return 0;
		for (var n in f.$isNotEmpty) if (e.getElementsByTagName(n).length) return 0;
		return 1;
	}

	function r(e) {
		return e.pageX || e.pageY ? {
			x: e.pageX,
			y: e.pageY
		} : {
			x: e.clientX + W.document.body.scrollLeft - W.document.body.clientLeft,
			y: e.clientY + W.document.body.scrollTop - W.document.body.clientTop
		};
	}

	function l(t) {
		if (!R()) try {
			var n, o = i(t.target || t.srcElement);
			if (Y && (W.body.style.webkitUserSelect = "none", (Math.abs(J.x - t.clientX) > G || Math.abs(J.y - t.clientY) > G) && (E(), Y = !1, Q = 0, S(t))), st && ft) return Q = 0, W.body.style.webkitUserSelect = "none", W.selection.getNative()[s.ie9below ? "empty" : "removeAllRanges"](), n = r(t), v(W, !0, st, n, o), void("h" == st ? ut.style.left = h(ft, t) + "px" : "v" == st && (ut.style.top = g(ft, t) + "px"));
			if (o) {
				if (W.fireEvent("excludetable", o) === !0) return;
				n = r(t);
				var a = b(o, n),
					l = p.findParentByTagName(o, "table", !0);
				if (m(l, o, t, !0)) {
					if (W.fireEvent("excludetable", l) === !0) return;
					W.body.style.cursor = "url(" + W.options.cursorpath + "h.png),pointer";
				} else if (m(l, o, t)) {
					if (W.fireEvent("excludetable", l) === !0) return;
					W.body.style.cursor = "url(" + W.options.cursorpath + "v.png),pointer";
				} else {
					W.body.style.cursor = "text";
					/\d/.test(a) && (a = a.replace(/\d/, ""), o = tt(o).getPreviewCell(o, "v" == a)), v(W, o ? !! a : !1, o ? a : "", n, o);
				}
			} else d(!1, l, W);
		} catch (c) {
			e(c);
		}
	}

	function d(e, t, n) {
		if (e) u(t, n);
		else {
			if (ct) return;
			gt = setTimeout(function() {
				!ct && dt && dt.parentNode && dt.parentNode.removeChild(dt);
			}, 2e3);
		}
	}

	function u(e, t) {
		function n(n, i) {
			clearTimeout(a), a = setTimeout(function() {
				t.fireEvent("tableClicked", e, i);
			}, 300);
		}

		function i() {
			clearTimeout(a);
			var n = tt(e),
				i = e.rows[0].cells[0],
				o = n.getLastCell(),
				r = n.getCellsRange(i, o);
			t.selection.getRange().setStart(i, 0).setCursor(!1, !0), n.setSelected(r);
		}
		var o = p.getXY(e),
			r = e.ownerDocument;
		if (dt && dt.parentNode) return dt;
		dt = r.createElement("div"), dt.contentEditable = !1, dt.innerHTML = "", dt.style.cssText = "width:15px;height:15px;background-image:url(" + t.options.UEDITOR_HOME_URL + "dialogs/table/dragicon.png);position: absolute;cursor:move;top:" + (o.y - 15) + "px;left:" + o.x + "px;", p.unSelectable(dt), dt.onmouseover = function() {
			ct = !0;
		}, dt.onmouseout = function() {
			ct = !1;
		}, p.on(dt, "click", function(e, t) {
			n(t, this);
		}), p.on(dt, "dblclick", function(e, t) {
			i(t);
		}), p.on(dt, "dragstart", function(e, t) {
			p.preventDefault(t);
		});
		var a;
		r.body.appendChild(dt);
	}

	function m(e, t, n, i) {
		var o = r(n),
			a = b(t, o);
		if (i) {
			var s = e.getElementsByTagName("caption")[0],
				l = s ? s.offsetHeight : 0;
			return "v1" == a && o.y - p.getXY(e).y - l < 8;
		}
		return "h1" == a && o.x - p.getXY(e).x < 8;
	}

	function h(e, t) {
		var n = tt(e);
		if (n) {
			var i = n.getSameEndPosCells(e, "x")[0],
				o = n.getSameStartPosXCells(e)[0],
				a = r(t).x,
				s = (i ? p.getXY(i).x : p.getXY(n.table).x) + 20,
				l = o ? p.getXY(o).x + o.offsetWidth - 20 : W.body.offsetWidth + 5 || parseInt(p.getComputedStyle(W.body, "width"), 10);
			return s += X, l -= X, s > a ? s : a > l ? l : a;
		}
	}

	function g(t, n) {
		try {
			var i = p.getXY(t).y,
				o = r(n).y;
			return i > o ? i : o;
		} catch (a) {
			e(a);
		}
	}

	function v(t, n, i, o, r) {
		try {
			t.body.style.cursor = "h" == i ? "col-resize" : "v" == i ? "row-resize" : "text", s.ie && (!i || mt || nt(t) ? H(t) : (U(t, t.document), $(i, r))), lt = n;
		} catch (a) {
			e(a);
		}
	}

	function b(e, t) {
		var n = p.getXY(e);
		return n ? n.x + e.offsetWidth - t.x < K ? "h" : t.x - n.x < K ? "h1" : n.y + e.offsetHeight - t.y < K ? "v" : t.y - n.y < K ? "v1" : "" : "";
	}

	function y(e, t) {
		if (!R()) if (J = {
			x: t.clientX,
			y: t.clientY
		}, 2 == t.button) {
			var n = nt(W),
				i = !1;
			if (n) {
				var o = V(W, t);
				c.each(n.selectedTds, function(e) {
					e === o && (i = !0);
				}), i ? (o = n.selectedTds[0], setTimeout(function() {
					W.selection.getRange().setStart(o, 0).setCursor(!1, !0);
				}, 0)) : (ot(p.getElementsByTagName(W.body, "th td")), n.clearSelected());
			}
		} else N(t);
	}

	function C(e) {
		Q = 0, e = e || W.window.event;
		var t = i(e.target || e.srcElement);
		if (t) {
			var n;
			if (n = b(t, r(e))) {
				if (H(W), "h1" == n) if (n = "h", m(p.findParentByTagName(t, "table"), t, e)) W.execCommand("adaptbywindow");
				else if (t = tt(t).getPreviewCell(t)) {
					var o = W.selection.getRange();
					o.selectNodeContents(t).setCursor(!0, !0);
				}
				if ("h" == n) {
					var a = tt(t),
						s = a.table,
						l = A(t, s, !0);
					l = w(l, "left"), a.width = a.offsetWidth;
					var d = [],
						u = [];
					c.each(l, function(e) {
						d.push(e.offsetWidth);
					}), c.each(l, function(e) {
						e.removeAttribute("width");
					}), window.setTimeout(function() {
						var e = !0;
						c.each(l, function(t, n) {
							var i = t.offsetWidth;
							return i > d[n] ? (e = !1, !1) : void u.push(i);
						});
						var t = e ? u : d;
						c.each(l, function(e, n) {
							e.width = t[n] - O();
						});
					}, 0);
				}
			}
		}
	}

	function N(e) {
		if (ot(p.getElementsByTagName(W.body, "td th")), c.each(W.document.getElementsByTagName("table"), function(e) {
			e.ueTable = null;
		}), rt = V(W, e)) {
			var t = p.findParentByTagName(rt, "table", !0),
				n = tt(t);
			n && n.clearSelected(), lt ? x(e) : (W.document.body.style.webkitUserSelect = "", mt = !0, W.addListener("mouseover", B));
		}
	}

	function x(e) {
		s.ie && (e = T(e)), E(), Y = !0, z = setTimeout(function() {
			S(e);
		}, Z);
	}

	function w(e, t) {
		for (var n = [], i = null, o = 0, r = e.length; r > o; o++) i = e[o][t], i && n.push(i);
		return n;
	}

	function E() {
		z && clearTimeout(z), z = null;
	}

	function T(e) {
		var t = ["pageX", "pageY", "clientX", "clientY", "srcElement", "target"],
			n = {};
		if (e) for (var i, o, r = 0; i = t[r]; r++) o = e[i], o && (n[i] = o);
		return n;
	}

	function S(e) {
		if (Y = !1, rt) {
			var t = Math.abs(J.x - e.clientX) >= Math.abs(J.y - e.clientY) ? "h" : "v";
			/\d/.test(t) && (t = t.replace(/\d/, ""), rt = tt(rt).getPreviewCell(rt, "v" == t)), H(W), U(W, W.document), W.fireEvent("saveScene"), $(t, rt), mt = !0, st = t, ft = rt;
		}
	}

	function k(e, t) {
		if (!R()) {
			if (E(), Y = !1, lt && (Q = ++Q % 3, J = {
				x: t.clientX,
				y: t.clientY
			}, j = setTimeout(function() {
				Q > 0 && Q--;
			}, Z), 2 === Q)) return Q = 0, void C(t);
			if (2 != t.button) {
				var n = this,
					i = n.selection.getRange(),
					o = p.findParentByTagName(i.startContainer, "table", !0),
					r = p.findParentByTagName(i.endContainer, "table", !0);
				if ((o || r) && (o === r ? (o = p.findParentByTagName(i.startContainer, ["td", "th", "caption"], !0), r = p.findParentByTagName(i.endContainer, ["td", "th", "caption"], !0), o !== r && n.selection.clearRange()) : n.selection.clearRange()), mt = !1, n.document.body.style.webkitUserSelect = "", st && ft) {
					n.selection.getNative()[s.ie9below ? "empty" : "removeAllRanges"](), Q = 0, ut = n.document.getElementById("ue_tableDragLine");
					var l = p.getXY(ft),
						d = p.getXY(ut);
					switch (st) {
					case "h":
						I(ft, d.x - l.x);
						break;

					case "v":
						L(ft, d.y - l.y - ft.offsetHeight);
					}
					return st = "", ft = null, H(n), void n.fireEvent("saveScene");
				}
				if (rt) {
					var c = tt(rt),
						u = c ? c.selectedTds[0] : null;
					if (u) i = new a.Range(n.document), p.isEmptyBlock(u) ? i.setStart(u, 0).setCursor(!1, !0) : i.selectNodeContents(u).shrinkBoundary().setCursor(!1, !0);
					else if (i = n.selection.getRange().shrinkBoundary(), !i.collapsed) {
						var o = p.findParentByTagName(i.startContainer, ["td", "th"], !0),
							r = p.findParentByTagName(i.endContainer, ["td", "th"], !0);
						(o && !r || !o && r || o && r && o !== r) && i.setCursor(!1, !0);
					}
					rt = null, n.removeListener("mouseover", B);
				} else {
					var f = p.findParentByTagName(t.target || t.srcElement, "td", !0);
					if (f || (f = p.findParentByTagName(t.target || t.srcElement, "th", !0)), f && ("TD" == f.tagName || "TH" == f.tagName)) {
						if (n.fireEvent("excludetable", f) === !0) return;
						i = new a.Range(n.document), i.setStart(f, 0).setCursor(!1, !0);
					}
				}
				n._selectionChange(250, t);
			}
		}
	}

	function B(e, t) {
		if (!R()) {
			var n = this,
				i = t.target || t.srcElement;
			if (at = p.findParentByTagName(i, "td", !0) || p.findParentByTagName(i, "th", !0), rt && at && ("TD" == rt.tagName && "TD" == at.tagName || "TH" == rt.tagName && "TH" == at.tagName) && p.findParentByTagName(rt, "table") == p.findParentByTagName(at, "table")) {
				var o = tt(at);
				if (rt != at) {
					n.document.body.style.webkitUserSelect = "none", n.selection.getNative()[s.ie9below ? "empty" : "removeAllRanges"]();
					var r = o.getCellsRange(rt, at);
					o.setSelected(r);
				} else n.document.body.style.webkitUserSelect = "", o.clearSelected();
			}
			t.preventDefault ? t.preventDefault() : t.returnValue = !1;
		}
	}

	function _(e, t, n) {
		var i = parseInt(p.getComputedStyle(e, "line-height"), 10),
			o = n + t;
		t = i > o ? i : o, e.style.height && (e.style.height = ""), 1 == e.rowSpan ? e.setAttribute("height", t) : e.removeAttribute && e.removeAttribute("height");
	}

	function I(e, t) {
		var n = tt(e);
		if (n) {
			var i = n.table,
				o = A(e, i);
			if (i.style.width = "", i.removeAttribute("width"), t = D(t, e, o), e.nextSibling) {
				c.each(o, function(e) {
					e.left.width = +e.left.width + t, e.right && (e.right.width = +e.right.width - t);
				});
			} else c.each(o, function(e) {
				e.left.width -= -t;
			});
		}
	}

	function R() {
		return "false" === W.body.contentEditable;
	}

	function L(e, t) {
		if (!(Math.abs(t) < 10)) {
			var n = tt(e);
			if (n) for (var i, o = n.getSameEndPosCells(e, "y"), r = o[0] ? o[0].offsetHeight : 0, a = 0; i = o[a++];) _(i, t, r);
		}
	}

	function A(e, t, n) {
		if (t || (t = p.findParentByTagName(e, "table")), !t) return null;
		for (var i = (p.getNodeIndex(e), e), o = t.rows, r = 0; i;) 1 === i.nodeType && (r += i.colSpan || 1), i = i.previousSibling;
		i = null;
		var a = [];
		return c.each(o, function(e) {
			var t = e.cells,
				i = 0;
			c.each(t, function(e) {
				return i += e.colSpan || 1, i === r ? (a.push({
					left: e,
					right: e.nextSibling || null
				}), !1) : i > r ? (n && a.push({
					left: e
				}), !1) : void 0;
			});
		}), a;
	}

	function D(e, t, n) {
		if (e -= O(), 0 > e) return 0;
		e -= P(t);
		var i = 0 > e ? "left" : "right";
		return e = Math.abs(e), c.each(n, function(t) {
			var n = t[i];
			n && (e = Math.min(e, P(n) - X));
		}), e = 0 > e ? 0 : e, "left" === i ? -e : e;
	}

	function P(e) {
		var t = 0,
			t = e.offsetWidth - O();
		e.nextSibling || (t -= M(e)), t = 0 > t ? 0 : t;
		try {
			e.width = t;
		} catch (n) {}
		return t;
	}

	function M(e) {
		if (tab = p.findParentByTagName(e, "table", !1), void 0 === tab.offsetVal) {
			var t = e.previousSibling;
			tab.offsetVal = t && e.offsetWidth - t.offsetWidth === et.borderWidth ? et.borderWidth : 0;
		}
		return tab.offsetVal;
	}

	function O() {
		if (void 0 === et.tabcellSpace) {
			var e = W.document.createElement("table"),
				t = W.document.createElement("tbody"),
				n = W.document.createElement("tr"),
				i = W.document.createElement("td"),
				o = null;
			i.style.cssText = "border: 0;", i.width = 1, n.appendChild(i), n.appendChild(o = i.cloneNode(!1)), t.appendChild(n), e.appendChild(t), e.style.cssText = "visibility: hidden;", W.body.appendChild(e), et.paddingSpace = i.offsetWidth - 1;
			var r = e.offsetWidth;
			i.style.cssText = "", o.style.cssText = "", et.borderWidth = (e.offsetWidth - r) / 3, et.tabcellSpace = et.paddingSpace + et.borderWidth, W.body.removeChild(e);
		}
		return O = function() {
			return et.tabcellSpace;
		}, et.tabcellSpace;
	}

	function U(e) {
		mt || (ut = e.document.createElement("div"), p.setAttributes(ut, {
			id: "ue_tableDragLine",
			unselectable: "on",
			contenteditable: !1,
			onresizestart: "return false",
			ondragstart: "return false",
			onselectstart: "return false",
			style: "background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"
		}), e.body.appendChild(ut));
	}

	function H(e) {
		if (!mt) for (var t; t = e.document.getElementById("ue_tableDragLine");) p.remove(t);
	}

	function $(e, t) {
		if (t) {
			var n, i = p.findParentByTagName(t, "table"),
				o = i.getElementsByTagName("caption"),
				r = i.offsetWidth,
				a = i.offsetHeight - (o.length > 0 ? o[0].offsetHeight : 0),
				s = p.getXY(i),
				l = p.getXY(t);
			switch (e) {
			case "h":
				n = "height:" + a + "px;top:" + (s.y + (o.length > 0 ? o[0].offsetHeight : 0)) + "px;left:" + (l.x + t.offsetWidth), ut.style.cssText = n + "px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)";
				break;

			case "v":
				n = "width:" + r + "px;left:" + s.x + "px;top:" + (l.y + t.offsetHeight), ut.style.cssText = n + "px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)";
			}
		}
	}

	function q(e, t) {
		for (var n, i, o = p.getElementsByTagName(e.body, "table"), r = 0; i = o[r++];) {
			var a = p.getElementsByTagName(i, "td");
			a[0] && (t ? (n = a[0].style.borderColor.replace(/\s/g, ""), /(#ffffff)|(rgb\(255,f55,255\))/gi.test(n) && p.addClass(i, "noBorderTable")) : p.removeClasses(i, "noBorderTable"));
		}
	}

	function F(e, t, n) {
		var i = e.body;
		return i.offsetWidth - (t ? 2 * parseInt(p.getComputedStyle(i, "margin-left"), 10) : 0) - 2 * n.tableBorder - (e.options.offsetWidth || 0);
	}

	function V(e, t) {
		var n = p.findParentByTagName(t.target || t.srcElement, ["td", "th"], !0),
			i = null;
		if (!n) return null;
		if (i = b(n, r(t)), !n) return null;
		if ("h1" === i && n.previousSibling) {
			var o = p.getXY(n),
				a = n.offsetWidth;
			Math.abs(o.x + a - t.clientX) > a / 3 && (n = n.previousSibling);
		} else if ("v1" === i && n.parentNode.previousSibling) {
			var o = p.getXY(n),
				s = n.offsetHeight;
			Math.abs(o.y + s - t.clientY) > s / 3 && (n = n.parentNode.previousSibling.firstChild);
		}
		return n && e.fireEvent("excludetable", n) !== !0 ? n : null;
	}
	var W = this,
		z = null,
		j = null,
		X = 5,
		Y = !1,
		K = 5,
		G = 10,
		Q = 0,
		J = null,
		Z = 360,
		et = UE.UETable,
		tt = function(e) {
			return et.getUETable(e);
		},
		nt = function(e) {
			return et.getUETableBySelected(e);
		},
		it = function(e, t) {
			return et.getDefaultValue(e, t);
		},
		ot = function(e) {
			return et.removeSelectedClass(e);
		};
	W.ready(function() {
		var e = this,
			t = e.selection.getText;
		e.selection.getText = function() {
			var n = nt(e);
			if (n) {
				var i = "";
				return c.each(n.selectedTds, function(e) {
					i += e[s.ie ? "innerText" : "textContent"];
				}), i;
			}
			return t.call(e.selection);
		};
	});
	var rt = null,
		at = null,
		st = "",
		lt = !1,
		dt = null,
		ct = !1,
		ut = null,
		ft = null,
		mt = !1,
		ht = !0;
	W.setOpt({
		maxColNum: 20,
		maxRowNum: 100,
		defaultCols: 5,
		defaultRows: 5,
		tdvalign: "top",
		cursorpath: W.options.UEDITOR_HOME_URL + "themes/default/images/cursor_",
		tableDragable: !1,
		classList: ["ue-table-interlace-color-single", "ue-table-interlace-color-double"]
	}), W.getUETable = tt;
	var pt = {
		deletetable: 1,
		inserttable: 1,
		cellvalign: 1,
		insertcaption: 1,
		deletecaption: 1,
		inserttitle: 1,
		deletetitle: 1,
		mergeright: 1,
		mergedown: 1,
		mergecells: 1,
		insertrow: 1,
		insertrownext: 1,
		deleterow: 1,
		insertcol: 1,
		insertcolnext: 1,
		deletecol: 1,
		splittocells: 1,
		splittorows: 1,
		splittocols: 1,
		adaptbytext: 1,
		adaptbywindow: 1,
		adaptbycustomer: 1,
		insertparagraph: 1,
		insertparagraphbeforetable: 1,
		averagedistributecol: 1,
		averagedistributerow: 1
	};
	W.ready(function() {
		c.cssRule("table", ".selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:2px solid #BBB;background:#F7F7F7;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}", W.document);
		var e, n, r;
		W.addListener("keydown", function(t, i) {
			var a = this,
				s = i.keyCode || i.which;
			if (8 == s) {
				var l = nt(a);
				l && l.selectedTds.length && (l.isFullCol() ? a.execCommand("deletecol") : l.isFullRow() ? a.execCommand("deleterow") : a.fireEvent("delcells"), p.preventDefault(i));
				var d = p.findParentByTagName(a.selection.getStart(), "caption", !0),
					c = a.selection.getRange();
				if (c.collapsed && d && o(d)) {
					a.fireEvent("saveScene");
					var u = d.parentNode;
					p.remove(d), u && c.setStart(u.rows[0].cells[0], 0).setCursor(!1, !0), a.fireEvent("saveScene");
				}
			}
			if (46 == s) {
				var l = nt(a);
				if (l) {
					a.fireEvent("saveScene");
					for (var f, m = 0; f = l.selectedTds[m++];) p.fillNode(a.document, f);
					a.fireEvent("saveScene"), p.preventDefault(i);
				}
			}
			if (13 == s) {
				var h = a.selection.getRange(),
					d = p.findParentByTagName(h.startContainer, "caption", !0);
				if (d) {
					var u = p.findParentByTagName(d, "table");
					return h.collapsed ? d && h.setStart(u.rows[0].cells[0], 0).setCursor(!1, !0) : (h.deleteContents(), a.fireEvent("saveScene")), void p.preventDefault(i);
				}
				if (h.collapsed) {
					var u = p.findParentByTagName(h.startContainer, "table");
					if (u) {
						var g = u.rows[0].cells[0],
							v = p.findParentByTagName(a.selection.getStart(), ["td", "th"], !0),
							b = u.previousSibling;
						if (g === v && (!b || 1 == b.nodeType && "TABLE" == b.tagName) && p.isStartInblock(h)) {
							var y = p.findParent(a.selection.getStart(), function(e) {
								return p.isBlockElm(e);
							}, !0);
							y && (/t(h|d)/i.test(y.tagName) || y === v.firstChild) && (a.execCommand("insertparagraphbeforetable"), p.preventDefault(i));
						}
					}
				}
			}
			if ((i.ctrlKey || i.metaKey) && "67" == i.keyCode) {
				e = null;
				var l = nt(a);
				if (l) {
					var C = l.selectedTds;
					n = l.isFullCol(), r = l.isFullRow(), e = [
						[l.cloneCell(C[0], null, !0)]
					];
					for (var f, m = 1; f = C[m]; m++) f.parentNode !== C[m - 1].parentNode ? e.push([l.cloneCell(f, null, !0)]) : e[e.length - 1].push(l.cloneCell(f, null, !0));
				}
			}
		}), W.addListener("tablehasdeleted", function() {
			v(this, !1, "", null), dt && p.remove(dt);
		}), W.addListener("beforepaste", function(i, a) {
			var l = this,
				d = l.selection.getRange();
			if (p.findParentByTagName(d.startContainer, "caption", !0)) {
				var u = l.document.createElement("div");
				return u.innerHTML = a.html, void(a.html = u[s.ie9below ? "innerText" : "textContent"]);
			}
			var f = nt(l);
			if (e) {
				l.fireEvent("saveScene");
				var m, h, d = l.selection.getRange(),
					g = p.findParentByTagName(d.startContainer, ["td", "th"], !0);
				if (g) {
					var v = tt(g);
					if (r) {
						var b = v.getCellInfo(g).rowIndex;
						"TH" == g.tagName && b++;
						for (var y, C = 0; y = e[C++];) {
							for (var N, x = v.insertRow(b++, "td"), w = 0; N = y[w]; w++) {
								var E = x.cells[w];
								E || (E = x.insertCell(w)), E.innerHTML = N.innerHTML, N.getAttribute("width") && E.setAttribute("width", N.getAttribute("width")), N.getAttribute("vAlign") && E.setAttribute("vAlign", N.getAttribute("vAlign")), N.getAttribute("align") && E.setAttribute("align", N.getAttribute("align")), N.style.cssText && (E.style.cssText = N.style.cssText);
							}
							for (var N, w = 0;
							(N = x.cells[w]) && y[w]; w++) N.innerHTML = y[w].innerHTML, y[w].getAttribute("width") && N.setAttribute("width", y[w].getAttribute("width")), y[w].getAttribute("vAlign") && N.setAttribute("vAlign", y[w].getAttribute("vAlign")), y[w].getAttribute("align") && N.setAttribute("align", y[w].getAttribute("align")), y[w].style.cssText && (N.style.cssText = y[w].style.cssText);
						}
					} else {
						if (n) {
							k = v.getCellInfo(g);
							for (var N, T = 0, w = 0, y = e[0]; N = y[w++];) T += N.colSpan || 1;
							for (l.__hasEnterExecCommand = !0, C = 0; T > C; C++) l.execCommand("insertcol");
							l.__hasEnterExecCommand = !1, g = v.table.rows[0].cells[k.cellIndex], "TH" == g.tagName && (g = v.table.rows[1].cells[k.cellIndex]);
						}
						for (var y, C = 0; y = e[C++];) {
							m = g;
							for (var N, w = 0; N = y[w++];) if (g) g.innerHTML = N.innerHTML, N.getAttribute("width") && g.setAttribute("width", N.getAttribute("width")), N.getAttribute("vAlign") && g.setAttribute("vAlign", N.getAttribute("vAlign")), N.getAttribute("align") && g.setAttribute("align", N.getAttribute("align")), N.style.cssText && (g.style.cssText = N.style.cssText), h = g, g = g.nextSibling;
							else {
								var S = N.cloneNode(!0);
								p.removeAttributes(S, ["class", "rowSpan", "colSpan"]), h.parentNode.appendChild(S);
							}
							if (g = v.getNextCell(m, !0, !0), !e[C]) break;
							if (!g) {
								var k = v.getCellInfo(m);
								v.table.insertRow(v.table.rows.length), v.update(), g = v.getVSideCell(m, !0);
							}
						}
					}
					v.update();
				} else {
					f = l.document.createElement("table");
					for (var y, C = 0; y = e[C++];) {
						for (var N, x = f.insertRow(f.rows.length), w = 0; N = y[w++];) S = et.cloneCell(N, null, !0), p.removeAttributes(S, ["class"]), x.appendChild(S);
						2 == w && S.rowSpan > 1 && (S.rowSpan = 1);
					}
					var B = it(l),
						_ = l.body.offsetWidth - (ht ? 2 * parseInt(p.getComputedStyle(l.body, "margin-left"), 10) : 0) - 2 * B.tableBorder - (l.options.offsetWidth || 0);
					l.execCommand("insertHTML", "<table  " + (n && r ? 'width="' + _ + '"' : "") + ">" + f.innerHTML.replace(/>\s*</g, "><").replace(/\bth\b/gi, "td") + "</table>");
				}
				return l.fireEvent("contentchange"), l.fireEvent("saveScene"), a.html = "", !0;
			}
			var I, u = l.document.createElement("div");
			u.innerHTML = a.html, I = u.getElementsByTagName("table"), p.findParentByTagName(l.selection.getStart(), "table") ? (c.each(I, function(e) {
				p.remove(e);
			}), p.findParentByTagName(l.selection.getStart(), "caption", !0) && (u.innerHTML = u[s.ie ? "innerText" : "textContent"])) : c.each(I, function(e) {
				t(e, !0), p.removeAttributes(e, ["style", "border"]), c.each(p.getElementsByTagName(e, "td"), function(e) {
					o(e) && p.fillNode(l.document, e), t(e, !0);
				});
			}), a.html = u.innerHTML;
		}), W.addListener("afterpaste", function() {
			c.each(p.getElementsByTagName(W.body, "table"), function(e) {
				if (e.offsetWidth > W.body.offsetWidth) {
					var t = it(W, e);
					e.style.width = W.body.offsetWidth - (ht ? 2 * parseInt(p.getComputedStyle(W.body, "margin-left"), 10) : 0) - 2 * t.tableBorder - (W.options.offsetWidth || 0) + "px";
				}
			});
		}), W.addListener("blur", function() {
			e = null;
		});
		var u;
		W.addListener("keydown", function() {
			clearTimeout(u), u = setTimeout(function() {
				var e = W.selection.getRange(),
					t = p.findParentByTagName(e.startContainer, ["th", "td"], !0);
				if (t) {
					var n = t.parentNode.parentNode.parentNode;
					n.offsetWidth > n.getAttribute("width") && (t.style.wordBreak = "break-all");
				}
			}, 100);
		}), W.addListener("selectionchange", function() {
			v(W, !1, "", null);
		}), W.addListener("contentchange", function() {
			var e = this;
			if (H(e), !nt(e)) {
				var t = e.selection.getRange(),
					n = t.startContainer;
				n = p.findParentByTagName(n, ["td", "th"], !0), c.each(p.getElementsByTagName(e.document, "table"), function(t) {
					e.fireEvent("excludetable", t) !== !0 && (t.ueTable = new et(t), c.each(p.getElementsByTagName(e.document, "td"), function(t) {
						p.isEmptyBlock(t) && t !== n && (p.fillNode(e.document, t), s.ie && 6 == s.version && (t.innerHTML = "&nbsp;"));
					}), c.each(p.getElementsByTagName(e.document, "th"), function(t) {
						p.isEmptyBlock(t) && t !== n && (p.fillNode(e.document, t), s.ie && 6 == s.version && (t.innerHTML = "&nbsp;"));
					}), t.onmouseover = function() {
						e.fireEvent("tablemouseover", t);
					}, t.onmousemove = function() {
						e.fireEvent("tablemousemove", t), e.options.tableDragable && d(!0, this, e);
					}, t.onmouseout = function() {
						e.fireEvent("tablemouseout", t), v(e, !1, "", null), H(e);
					}, t.onclick = function(t) {
						t = e.window.event || t;
						var n = i(t.target || t.srcElement);
						if (n) {
							var o, r = tt(n),
								a = r.table,
								s = r.getCellInfo(n),
								l = e.selection.getRange();
							if (m(a, n, t, !0)) {
								var d = r.getCell(r.indexTable[r.rowsNum - 1][s.colIndex].rowIndex, r.indexTable[r.rowsNum - 1][s.colIndex].cellIndex);
								return void(t.shiftKey && r.selectedTds.length ? r.selectedTds[0] !== d ? (o = r.getCellsRange(r.selectedTds[0], d), r.setSelected(o)) : l && l.selectNodeContents(d).select() : n !== d ? (o = r.getCellsRange(n, d), r.setSelected(o)) : l && l.selectNodeContents(d).select());
							}
							if (m(a, n, t)) {
								var c = r.getCell(r.indexTable[s.rowIndex][r.colsNum - 1].rowIndex, r.indexTable[s.rowIndex][r.colsNum - 1].cellIndex);
								t.shiftKey && r.selectedTds.length ? r.selectedTds[0] !== c ? (o = r.getCellsRange(r.selectedTds[0], c), r.setSelected(o)) : l && l.selectNodeContents(c).select() : n !== c ? (o = r.getCellsRange(n, c), r.setSelected(o)) : l && l.selectNodeContents(c).select();
							}
						}
					});
				}), q(e, !0);
			}
		}), p.on(W.document, "mousemove", l), p.on(W.document, "mouseout", function(e) {
			var t = e.target || e.srcElement;
			"TABLE" == t.tagName && v(W, !1, "", null);
		}), W.addListener("interlacetable", function(e, t, n) {
			if (t) for (var i = this, o = t.rows, r = o.length, a = function(e, t, n) {
					return e[t] ? e[t] : n ? e[t % e.length] : "";
				}, s = 0; r > s; s++) o[s].className = a(n || i.options.classList, s, !0);
		}), W.addListener("uninterlacetable", function(e, t) {
			if (t) for (var n = this, i = t.rows, o = n.options.classList, r = i.length, a = 0; r > a; a++) p.removeClasses(i[a], o);
		}), W.addListener("mousedown", y), W.addListener("mouseup", k), p.on(W.body, "dragstart", function(e) {
			k.call(W, "dragstart", e);
		});
		var f = 0;
		W.addListener("mousedown", function() {
			f = 0;
		}), W.addListener("tabkeydown", function() {
			var e = this.selection.getRange(),
				t = e.getCommonAncestor(!0, !0),
				n = p.findParentByTagName(t, "table");
			if (n) {
				if (p.findParentByTagName(t, "caption", !0)) {
					var i = p.getElementsByTagName(n, "th td");
					i && i.length && e.setStart(i[0], 0).setCursor(!1, !0);
				} else {
					var i = p.findParentByTagName(t, ["td", "th"], !0),
						r = tt(i);
					f = i.rowSpan > 1 ? f : r.getCellInfo(i).rowIndex;
					var a = r.getTabNextCell(i, f);
					a ? o(a) ? e.setStart(a, 0).setCursor(!1, !0) : e.selectNodeContents(a).select() : (W.fireEvent("saveScene"), W.__hasEnterExecCommand = !0, this.execCommand("insertrownext"), W.__hasEnterExecCommand = !1, e = this.selection.getRange(), e.setStart(n.rows[n.rows.length - 1].cells[0], 0).setCursor(), W.fireEvent("saveScene"));
				}
				return !0;
			}
		}), s.ie && W.addListener("selectionchange", function() {
			v(this, !1, "", null);
		}), W.addListener("keydown", function(e, t) {
			var n = this,
				i = t.keyCode || t.which;
			if (8 != i && 46 != i) {
				var o = !(t.ctrlKey || t.metaKey || t.shiftKey || t.altKey);
				o && ot(p.getElementsByTagName(n.body, "td"));
				var r = nt(n);
				r && o && r.clearSelected();
			}
		}), W.addListener("beforegetcontent", function() {
			q(this, !1), s.ie && c.each(this.document.getElementsByTagName("caption"), function(e) {
				p.isEmptyNode(e) && (e.innerHTML = "&nbsp;");
			});
		}), W.addListener("aftergetcontent", function() {
			q(this, !0);
		}), W.addListener("getAllHtml", function() {
			ot(W.document.getElementsByTagName("td"));
		}), W.addListener("fullscreenchanged", function(e, t) {
			if (!t) {
				var n = this.body.offsetWidth / document.body.offsetWidth,
					i = p.getElementsByTagName(this.body, "table");
				c.each(i, function(e) {
					if (e.offsetWidth < W.body.offsetWidth) return !1;
					var t = p.getElementsByTagName(e, "td"),
						i = [];
					c.each(t, function(e) {
						i.push(e.offsetWidth);
					});
					for (var o, r = 0; o = t[r]; r++) o.setAttribute("width", Math.floor(i[r] * n));
					e.setAttribute("width", Math.floor(F(W, ht, it(W))));
				});
			}
		});
		var h = W.execCommand;
		W.execCommand = function(e) {
			var t = this;
			e = e.toLowerCase();
			var n, i, r = nt(t),
				s = new a.Range(t.document),
				l = t.commands[e] || UE.commands[e];
			if (l) {
				if (!r || pt[e] || l.notNeedUndo || t.__hasEnterExecCommand) i = h.apply(t, arguments);
				else {
					t.__hasEnterExecCommand = !0, t.fireEvent("beforeexeccommand", e), n = r.selectedTds;
					for (var d, c, u, f = -2, m = -2, g = 0; u = n[g]; g++) o(u) ? s.setStart(u, 0).setCursor(!1, !0) : s.selectNode(u).select(!0), c = t.queryCommandState(e), d = t.queryCommandValue(e), -1 != c && ((f !== c || m !== d) && (t._ignoreContentChange = !0, i = h.apply(t, arguments), t._ignoreContentChange = !1), f = t.queryCommandState(e), m = t.queryCommandValue(e), p.isEmptyBlock(u) && p.fillNode(t.document, u));
					s.setStart(n[0], 0).shrinkBoundary(!0).setCursor(!1, !0), t.fireEvent("contentchange"), t.fireEvent("afterexeccommand", e), t.__hasEnterExecCommand = !1, t._selectionChange();
				}
				return i;
			}
		};
	});
	var gt;
}, UE.plugins.contextmenu = function() {
	var e, t = this,
		n = t.getLang("contextMenu"),
		i = t.options.contextMenu;
	if (i.length) {
		var o = UE.ui.uiUtils;
		t.addListener("contextmenu", function(r, l) {
			var d = o.getViewportOffsetByEvent(l);
			t.fireEvent("beforeselectionchange"), e && e.destroy();
			for (var c, u = 0, f = []; c = i[u]; u++) {
				var m;
				!
				function(e) {
					function i() {
						switch (e.icon) {
						case "table":
							return t.getLang("contextMenu.table");

						case "justifyjustify":
							return t.getLang("contextMenu.paragraph");

						case "aligntd":
							return t.getLang("contextMenu.aligntd");

						case "aligntable":
							return t.getLang("contextMenu.aligntable");

						case "tablesort":
							return n.tablesort;

						case "borderBack":
							return n.borderbk;

						default:
							return "";
						}
					}
					if ("-" == e)(m = f[f.length - 1]) && "-" !== m && f.push("-");
					else if (e.hasOwnProperty("group")) {
						for (var o, r = 0, a = []; o = e.subMenu[r]; r++)!
						function(e) {
							"-" == e ? (m = a[a.length - 1]) && "-" !== m ? a.push("-") : a.splice(a.length - 1) : (t.commands[e.cmdName] || UE.commands[e.cmdName] || e.query) && (e.query ? e.query() : t.queryCommandState(e.cmdName)) > -1 && a.push({
								label: e.label || t.getLang("contextMenu." + e.cmdName + (e.value || "")) || "",
								className: "edui-for-" + e.cmdName + (e.className ? " edui-for-" + e.cmdName + "-" + e.className : ""),
								onclick: e.exec ?
								function() { !! e.cmdName && t.fireEvent("funcPvUvReport", "menu_" + e.cmdName), e.exec.call(t);
								} : function() {
									t.fireEvent("funcPvUvReport", "menu_" + e.cmdName + (e.value || "")), t.execCommand(e.cmdName, e.value);
								}
							});
						}(o);
						a.length && f.push({
							label: i(),
							className: "edui-for-" + e.icon,
							subMenu: {
								items: a,
								editor: t
							}
						});
					} else if ((t.commands[e.cmdName] || UE.commands[e.cmdName] || e.query) && (e.query ? e.query.call(t) : t.queryCommandState(e.cmdName)) > -1) {
						if ("highlightcode" == e.cmdName) {
							if (1 == t.queryCommandState(e.cmdName) && "deletehighlightcode" != e.icon) return;
							if (1 != t.queryCommandState(e.cmdName) && "deletehighlightcode" == e.icon) return;
						}
						f.push({
							label: e.label || t.getLang("contextMenu." + e.cmdName),
							className: "edui-for-" + (e.icon ? e.icon : e.cmdName + (e.value || "")),
							onclick: e.exec ?
							function() { !! e.cmdName && t.fireEvent("funcPvUvReport", "menu_" + e.cmdName), e.exec.call(t);
							} : function() {
								t.fireEvent("funcPvUvReport", "menu_" + e.cmdName + (e.value || "")), t.execCommand(e.cmdName, e.value);
							}
						});
					}
				}(c);
			}
			if ("-" == f[f.length - 1] && f.pop(), e = new UE.ui.Menu({
				items: f,
				className: "edui-contextmenu",
				editor: t
			}), e.render(), e.showAt(d), t.fireEvent("funcPvUvReport", "contextmenu"), t.fireEvent("aftershowcontextmenu", e), p.preventDefault(l), s.ie) {
				var h;
				try {
					h = t.selection.getNative().createRange();
				} catch (g) {
					return;
				}
				if (h.item) {
					var v = new a.Range(t.document);
					v.selectNode(h.item(0)).select(!0, !0);
				}
			}
		});
	}
}, UE.plugins.shortcutmenu = function() {
	var e, t = this,
		n = t.options.shortcutMenu || [];
	n.length && (t.addListener("contextmenu mouseup", function(t, i) {
		var o = this,
			l = {
				type: t,
				target: i.target || i.srcElement,
				screenX: i.screenX,
				screenY: i.screenY,
				clientX: i.clientX,
				clientY: i.clientY
			};
		if (setTimeout(function() {
			var i = o.selection.getRange();
			(i.collapsed === !1 || "contextmenu" == t) && (e || (e = new r.editor.ui.ShortCutMenu({
				editor: o,
				items: n,
				theme: o.options.theme,
				className: "edui-shortcutmenu"
			}), e.render(), o.fireEvent("afterrendershortcutmenu", e)), e.show(l, !! UE.plugins.contextmenu));
		}), "contextmenu" == t && (p.preventDefault(i), s.ie9below)) {
			var d;
			try {
				d = o.selection.getNative().createRange();
			} catch (i) {
				return;
			}
			if (d.item) {
				var c = new a.Range(o.document);
				c.selectNode(d.item(0)).select(!0, !0);
			}
		}
		"keydown" == t && e && !e.isHidden && e.hide();
	}), t.addListener("keydown", function(t) {
		"keydown" == t && e && !e.isHidden && e.hide();
	}));
}, UE.plugins.basestyle = function() {
	var e = {
		bold: ["strong", "b"],
		italic: ["em", "i"],
		subscript: ["sub"],
		superscript: ["sup"]
	},
		t = function(e, t) {
			return p.filterNodeList(e.selection.getStartElementPath(), t);
		},
		n = this;
	n.addshortcutkey({
		Bold: "ctrl+66",
		Italic: "ctrl+73",
		Underline: "ctrl+85"
	}), n.addInputRule(function(e) {
		c.each(e.getNodesByTagName("b i"), function(e) {
			switch (e.tagName) {
			case "b":
				e.tagName = "strong";
				break;

			case "i":
				e.tagName = "em";
			}
		});
	});
	for (var i in e)!
	function(e, i) {
		n.commands[e] = {
			execCommand: function(e) {
				var o = n.selection.getRange(),
					r = t(this, i);
				if (o.collapsed) {
					if (r) {
						var a = n.document.createTextNode("");
						o.insertNode(a).removeInlineStyle(i), o.setStartBefore(a), p.remove(a);
					} else {
						var s = o.document.createElement(i[0]);
						("superscript" == e || "subscript" == e) && (a = n.document.createTextNode(""), o.insertNode(a).removeInlineStyle(["sub", "sup"]).setStartBefore(a).collapse(!0)), o.insertNode(s).setStart(s, 0);
					}
					o.collapse(!0);
				} else("superscript" == e || "subscript" == e) && (r && r.tagName.toLowerCase() == e || o.removeInlineStyle(["sub", "sup"])), r ? o.removeInlineStyle(i) : o.applyInlineStyle(i[0]);
				o.select();
			},
			queryCommandState: function() {
				return t(this, i) ? 1 : 0;
			}
		};
	}(i, e[i]);
}, UE.plugins.elementpath = function() {
	var e, t, n = this;
	n.setOpt("elementPathEnabled", !0), n.options.elementPathEnabled && (n.commands.elementpath = {
		execCommand: function(i, o) {
			var r = t[o],
				a = n.selection.getRange();
			e = 1 * o, a.selectNode(r).select();
		},
		queryCommandValue: function() {
			var n = [].concat(this.selection.getStartElementPath()).reverse(),
				i = [];
			t = n;
			for (var o, r = 0; o = n[r]; r++) if (3 != o.nodeType) {
				var a = o.tagName.toLowerCase();
				if ("img" == a && o.getAttribute("anchorname") && (a = "anchor"), i[r] = a, e == r) {
					e = -1;
					break;
				}
			}
			return i;
		}
	});
}, UE.plugins.formatmatch = function() {
	function e(r, a) {
		function l(e) {
			return m && e.selectNode(m), e.applyInlineStyle(i[i.length - 1].tagName, null, i);
		}
		if (s.webkit) var d = "IMG" == a.target.tagName ? a.target : null;
		n.undoManger && n.undoManger.save();
		var c = n.selection.getRange(),
			u = d || c.getClosedNode();
		if (t && u && "IMG" == u.tagName) u.style.cssText += ";float:" + (t.style.cssFloat || t.style.styleFloat || "none") + ";display:" + (t.style.display || "inline"), t = null;
		else if (!t) {
			var f = c.collapsed;
			if (f) {
				var m = n.document.createTextNode("match");
				c.insertNode(m).select();
			}
			n.__hasEnterExecCommand = !0;
			var h = n.options.removeFormatAttributes;
			n.options.removeFormatAttributes = "", n.execCommand("removeformat"), n.options.removeFormatAttributes = h, n.__hasEnterExecCommand = !1, c = n.selection.getRange(), i.length && l(c), m && c.setStartBefore(m).collapse(!0), c.select(), m && p.remove(m);
		}
		n.undoManger && n.undoManger.save(), n.removeListener("mouseup", e), o = 0;
	}
	var t, n = this,
		i = [],
		o = 0;
	n.addListener("reset", function() {
		i = [], o = 0;
	}), n.commands.formatmatch = {
		execCommand: function() {
			if (o) return o = 0, i = [], void n.removeListener("mouseup", e);
			var r = n.selection.getRange();
			if (t = r.getClosedNode(), !t || "IMG" != t.tagName) {
				r.collapse(!0).shrinkBoundary();
				var a = r.startContainer;
				i = p.findParents(a, !0, function(e) {
					return !p.isBlockElm(e) && 1 == e.nodeType;
				});
				for (var s, l = 0; s = i[l]; l++) if ("A" == s.tagName) {
					i.splice(l, 1);
					break;
				}
			}
			n.addListener("mouseup", e), o = 1;
		},
		queryCommandState: function() {
			return o;
		},
		notNeedUndo: 1
	};
}, UE.plugins.customstyle = function() {
	var e = this;
	e.setOpt({
		customstyle: [{
			tag: "h1",
			name: "tc",
			style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;"
		}, {
			tag: "h1",
			name: "tl",
			style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;"
		}, {
			tag: "span",
			name: "im",
			style: "font-size:16px;font-style:italic;font-weight:bold;line-height:18px;"
		}, {
			tag: "span",
			name: "hi",
			style: "font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;"
		}]
	}), e.commands.customstyle = {
		execCommand: function(e, t) {
			var n, i, o = this,
				r = t.tag,
				a = p.findParent(o.selection.getStart(), function(e) {
					return e.getAttribute("label");
				}, !0),
				s = {};
			for (var l in t) void 0 !== t[l] && (s[l] = t[l]);
			if (delete s.tag, a && a.getAttribute("label") == t.label) {
				if (n = this.selection.getRange(), i = n.createBookmark(), n.collapsed) if (f.$block[a.tagName]) {
					var d = o.document.createElement("p");
					p.moveChild(a, d), a.parentNode.insertBefore(d, a), p.remove(a);
				} else p.remove(a, !0);
				else {
					var c = p.getCommonAncestor(i.start, i.end),
						u = p.getElementsByTagName(c, r);
					new RegExp(r, "i").test(c.tagName) && u.push(c);
					for (var m, h = 0; m = u[h++];) if (m.getAttribute("label") == t.label) {
						var g = p.getPosition(m, i.start),
							v = p.getPosition(m, i.end);
						if ((g & p.POSITION_FOLLOWING || g & p.POSITION_CONTAINS) && (v & p.POSITION_PRECEDING || v & p.POSITION_CONTAINS) && f.$block[r]) {
							var d = o.document.createElement("p");
							p.moveChild(m, d), m.parentNode.insertBefore(d, m);
						}
						p.remove(m, !0);
					}
					a = p.findParent(c, function(e) {
						return e.getAttribute("label") == t.label;
					}, !0), a && p.remove(a, !0);
				}
				n.moveToBookmark(i).select();
			} else if (f.$block[r]) {
				if (this.execCommand("paragraph", r, s, "customstyle"), n = o.selection.getRange(), !n.collapsed) {
					n.collapse(), a = p.findParent(o.selection.getStart(), function(e) {
						return e.getAttribute("label") == t.label;
					}, !0);
					var b = o.document.createElement("p");
					p.insertAfter(a, b), p.fillNode(o.document, b), n.setStart(b, 0).setCursor();
				}
			} else {
				if (n = o.selection.getRange(), n.collapsed) return a = o.document.createElement(r), p.setAttributes(a, s), void n.insertNode(a).setStart(a, 0).setCursor();
				i = n.createBookmark(), n.applyInlineStyle(r, s).moveToBookmark(i).select();
			}
		},
		queryCommandValue: function() {
			var e = p.filterNodeList(this.selection.getStartElementPath(), function(e) {
				return e.getAttribute("label");
			});
			return e ? e.getAttribute("label") : "";
		}
	}, e.addListener("keyup", function(t, n) {
		var i = n.keyCode || n.which;
		if (32 == i || 13 == i) {
			var o = e.selection.getRange();
			if (o.collapsed) {
				var r = p.findParent(e.selection.getStart(), function(e) {
					return e.getAttribute("label");
				}, !0);
				if (r && f.$block[r.tagName] && p.isEmptyNode(r)) {
					var a = e.document.createElement("p");
					p.insertAfter(r, a), p.fillNode(e.document, a), p.remove(r), o.setStart(a, 0).setCursor();
				}
			}
		}
	});
}, UE.commands.insertparagraph = {
	execCommand: function(e, t) {
		for (var n, i = this, o = i.selection.getRange(), r = o.startContainer; r && !p.isBody(r);) n = r, r = r.parentNode;
		if (n) {
			var a = i.document.createElement("p");
			t ? n.parentNode.insertBefore(a, n) : n.parentNode.insertBefore(a, n.nextSibling), p.fillNode(i.document, a), o.setStart(a, 0).setCursor(!1, !0);
		}
	}
};
var r = r || {};
r.editor = r.editor || {}, r.editor.ui = {}, function() {
	function e() {
		var e = document.getElementById("edui_fixedlayer");
		d.setViewportOffset(e, {
			left: 0,
			top: 0
		});
	}

	function t() {
		i.on(window, "scroll", e), i.on(window, "resize", r.editor.utils.defer(e, 0, !0));
	}
	var n = r.editor.browser,
		i = r.editor.dom.domUtils,
		o = "$EDITORUI",
		a = window[o] = {},
		s = "ID" + o,
		l = 0,
		d = r.editor.ui.uiUtils = {
			uid: function(e) {
				return e ? e[s] || (e[s] = ++l) : ++l;
			},
			hook: function(e, t) {
				var n;
				return e && e._callbacks ? n = e : (n = function() {
					var t;
					e && (t = e.apply(this, arguments));
					for (var i = n._callbacks, o = i.length; o--;) {
						var r = i[o].apply(this, arguments);
						void 0 === t && (t = r);
					}
					return t;
				}, n._callbacks = []), n._callbacks.push(t), n;
			},
			createElementByHtml: function(e) {
				var t = document.createElement("div");
				return t.innerHTML = e, t = t.firstChild, t.parentNode.removeChild(t), t;
			},
			getViewportElement: function() {
				return n.ie && n.quirks ? document.body : document.documentElement;
			},
			getClientRect: function(e) {
				var t;
				try {
					t = e.getBoundingClientRect();
				} catch (n) {
					t = {
						left: 0,
						top: 0,
						height: 0,
						width: 0
					};
				}
				for (var o, r = {
					left: Math.round(t.left),
					top: Math.round(t.top),
					height: Math.round(t.bottom - t.top),
					width: Math.round(t.right - t.left)
				};
				(o = e.ownerDocument) !== document && (e = i.getWindow(o).frameElement);) t = e.getBoundingClientRect(), r.left += t.left, r.top += t.top;
				return r.bottom = r.top + r.height, r.right = r.left + r.width, r;
			},
			getViewportRect: function() {
				var e = d.getViewportElement(),
					t = 0 | (window.innerWidth || e.clientWidth),
					n = 0 | (window.innerHeight || e.clientHeight);
				return {
					left: 0,
					top: 0,
					height: n,
					width: t,
					bottom: n,
					right: t
				};
			},
			setViewportOffset: function(e, t) {
				var n = d.getFixedLayer();
				e.parentNode === n ? (e.style.left = t.left + "px", e.style.top = t.top + "px") : i.setViewportOffset(e, t);
			},
			getEventOffset: function(e) {
				var t = e.target || e.srcElement,
					n = d.getClientRect(t),
					i = d.getViewportOffsetByEvent(e);
				return {
					left: i.left - n.left,
					top: i.top - n.top
				};
			},
			getViewportOffsetByEvent: function(e) {
				var t = e.target || e.srcElement,
					n = i.getWindow(t).frameElement,
					o = {
						left: e.clientX,
						top: e.clientY
					};
				if (n && t.ownerDocument !== document) {
					var r = d.getClientRect(n);
					o.left += r.left, o.top += r.top;
				}
				return o;
			},
			setGlobal: function(e, t) {
				return a[e] = t, o + '["' + e + '"]';
			},
			unsetGlobal: function(e) {
				delete a[e];
			},
			copyAttributes: function(e, t) {
				for (var o = t.attributes, r = o.length; r--;) {
					var a = o[r];
					"style" == a.nodeName || "class" == a.nodeName || n.ie && !a.specified || e.setAttribute(a.nodeName, a.nodeValue);
				}
				t.className && i.addClass(e, t.className), t.style.cssText && (e.style.cssText += ";" + t.style.cssText);
			},
			removeStyle: function(e, t) {
				if (e.style.removeProperty) e.style.removeProperty(t);
				else {
					if (!e.style.removeAttribute) throw "";
					e.style.removeAttribute(t);
				}
			},
			contains: function(e, t) {
				return e && t && (e === t ? !1 : e.contains ? e.contains(t) : 16 & e.compareDocumentPosition(t));
			},
			startDrag: function(e, t, n) {
				function i(e) {
					var n = e.clientX - a,
						i = e.clientY - s;
					t.ondragmove(n, i, e), e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
				}

				function o() {
					n.removeEventListener("mousemove", i, !0), n.removeEventListener("mouseup", o, !0), window.removeEventListener("mouseup", o, !0), t.ondragstop();
				}

				function r() {
					l.releaseCapture(), l.detachEvent("onmousemove", i), l.detachEvent("onmouseup", r), l.detachEvent("onlosecaptrue", r), t.ondragstop();
				}
				var n = n || document,
					a = e.clientX,
					s = e.clientY;
				if (n.addEventListener) n.addEventListener("mousemove", i, !0), n.addEventListener("mouseup", o, !0), window.addEventListener("mouseup", o, !0), e.preventDefault();
				else {
					var l = e.srcElement;
					l.setCapture(), l.attachEvent("onmousemove", i), l.attachEvent("onmouseup", r), l.attachEvent("onlosecaptrue", r), e.returnValue = !1;
				}
				t.ondragstart();
			},
			getFixedLayer: function() {
				var i = document.getElementById("edui_fixedlayer");
				return null == i && (i = document.createElement("div"), i.id = "edui_fixedlayer", document.body.appendChild(i), n.ie && n.version <= 8 ? (i.style.position = "absolute", t(), setTimeout(e)) : i.style.position = "fixed", i.style.left = "0", i.style.top = "0", i.style.width = "0", i.style.height = "0"), i;
			},
			makeUnselectable: function(e) {
				if (n.opera || n.ie && n.version < 9) {
					if (e.unselectable = "on", e.hasChildNodes()) for (var t = 0; t < e.childNodes.length; t++) 1 == e.childNodes[t].nodeType && d.makeUnselectable(e.childNodes[t]);
				} else void 0 !== e.style.MozUserSelect ? e.style.MozUserSelect = "none" : void 0 !== e.style.WebkitUserSelect ? e.style.WebkitUserSelect = "none" : void 0 !== e.style.KhtmlUserSelect && (e.style.KhtmlUserSelect = "none");
			}
		};
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		n = r.editor.EventBase,
		i = r.editor.ui.UIBase = function() {};
	i.prototype = {
		className: "",
		uiName: "",
		initOptions: function(e) {
			var n = this;
			for (var i in e) n[i] = e[i];
			this.id = this.id || "edui" + t.uid();
		},
		initUIBase: function() {
			this._globalKey = e.unhtml(t.setGlobal(this.id, this));
		},
		render: function(e) {
			for (var n, i = this.renderHtml(), o = t.createElementByHtml(i), r = p.getElementsByTagName(o, "*"), a = "edui-" + (this.theme || this.editor.options.theme), s = document.getElementById("edui_fixedlayer"), l = 0; n = r[l++];) p.addClass(n, a);
			p.addClass(o, a), s && (s.className = "", p.addClass(s, a));
			var d = this.getDom();
			null != d ? (d.parentNode.replaceChild(o, d), t.copyAttributes(o, d)) : ("string" == typeof e && (e = document.getElementById(e)), e = e || t.getFixedLayer(), p.addClass(e, a), e.appendChild(o)), this.postRender();
		},
		getDom: function(e) {
			return document.getElementById(e ? this.id + "_" + e : this.id);
		},
		postRender: function() {
			this.fireEvent("postrender");
		},
		getHtmlTpl: function() {
			return "";
		},
		formatHtml: function(e) {
			var t = "edui-" + this.uiName;
			return e.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? t + "-" : "").replace(/%%/g, (this.uiName ? t : "") + " " + this.className).replace(/\$\$/g, this._globalKey);
		},
		renderHtml: function() {
			return this.formatHtml(this.getHtmlTpl());
		},
		dispose: function() {
			var e = this.getDom();
			e && r.editor.dom.domUtils.remove(e), t.unsetGlobal(this.id);
		}
	}, e.inherits(i, n);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.UIBase,
		n = r.editor.ui.Separator = function(e) {
			this.initOptions(e), this.initSeparator();
		};
	n.prototype = {
		uiName: "separator",
		initSeparator: function() {
			this.initUIBase();
		},
		getHtmlTpl: function() {
			return '<div id="##" class="edui-box %%"></div>';
		}
	}, e.inherits(n, t);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.dom.domUtils,
		n = r.editor.ui.UIBase,
		i = r.editor.ui.uiUtils,
		o = r.editor.ui.Mask = function(e) {
			this.initOptions(e), this.initUIBase();
		};
	o.prototype = {
		getHtmlTpl: function() {
			return '<div id="##" class="edui-mask %%" onmousedown="return $$._onMouseDown(event, this);"></div>';
		},
		postRender: function() {
			var e = this;
			t.on(window, "resize", function() {
				setTimeout(function() {
					e.isHidden() || e._fill();
				});
			});
		},
		show: function(e) {
			this._fill(), this.getDom().style.display = "", this.getDom().style.zIndex = e;
		},
		hide: function() {
			this.getDom().style.display = "none", this.getDom().style.zIndex = "";
		},
		isHidden: function() {
			return "none" == this.getDom().style.display;
		},
		_onMouseDown: function() {
			return !1;
		},
		_fill: function() {
			var e = this.getDom(),
				t = i.getViewportRect();
			e.style.width = t.width + "px", e.style.height = t.height + "px";
		}
	}, e.inherits(o, n);
}(), function() {
	function e(e, t) {
		for (var n = 0; n < s.length; n++) {
			var i = s[n];
			if (!i.isHidden() && i.queryAutoHide(t) !== !1) {
				if (e && /scroll/gi.test(e.type) && "edui-wordpastepop" == i.className) return;
				i.hide();
			}
		}
		s.length && i.editor.fireEvent("afterhidepop");
	}
	var t = r.editor.utils,
		n = r.editor.ui.uiUtils,
		i = r.editor.dom.domUtils,
		o = r.editor.ui.UIBase,
		a = r.editor.ui.Popup = function(e) {
			this.initOptions(e), this.initPopup();
		},
		s = [];
	a.postHide = e;
	var l = ["edui-anchor-topleft", "edui-anchor-topright", "edui-anchor-bottomleft", "edui-anchor-bottomright"];
	a.prototype = {
		SHADOW_RADIUS: 5,
		content: null,
		_hidden: !1,
		autoRender: !0,
		canSideLeft: !0,
		canSideUp: !0,
		initPopup: function() {
			this.initUIBase(), s.push(this);
		},
		getHtmlTpl: function() {
			return '<div id="##" class="edui-popup %%"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="javascript:"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + this.getContentHtmlTpl() + "  </div> </div></div>";
		},
		getContentHtmlTpl: function() {
			return this.content ? "string" == typeof this.content ? this.content : this.content.renderHtml() : "";
		},
		_UIBase_postRender: o.prototype.postRender,
		postRender: function() {
			if (this.content instanceof o && this.content.postRender(), this.captureWheel && !this.captured) {
				this.captured = !0;
				for (var e = (document.documentElement.clientHeight || document.body.clientHeight) - 80, t = this.getDom().offsetHeight, n = this.combox.getDom().getBoundingClientRect().top, r = this.getDom("content"), a = this; n + t > e;) t -= 30;
				r.style.height = t + "px", window.XMLHttpRequest ? i.on(r, "onmousewheel" in document.body ? "mousewheel" : "DOMMouseScroll", function(e) {
					e.preventDefault ? e.preventDefault() : e.returnValue = !1, r.scrollTop -= e.wheelDelta ? e.wheelDelta / 120 * 60 : e.detail / -3 * 60;
				}) : i.on(this.getDom(), "mousewheel", function(e) {
					e.returnValue = !1, a.getDom("content").scrollTop -= e.wheelDelta / 120 * 60;
				});
			}
			this.fireEvent("postRenderAfter"), this.hide(!0), this._UIBase_postRender();
		},
		_doAutoRender: function() {
			!this.getDom() && this.autoRender && this.render();
		},
		mesureSize: function() {
			var e = this.getDom("content");
			return n.getClientRect(e);
		},
		fitSize: function() {
			if (this.captureWheel && this.sized) return this.__size;
			this.sized = !0;
			var e = this.getDom("body");
			e.style.width = "", e.style.height = "";
			var t = this.mesureSize();
			return e.style.width = this.captureWheel ? -(-20 - t.width) + "px" : t.width + "px", e.style.height = t.height + "px", this.__size = t, this.captureWheel && (this.getDom("content").style.overflow = "auto"), t;
		},
		showAnchor: function(e, t) {
			this.showAnchorRect(n.getClientRect(e), t);
		},
		showAnchorRect: function(e, t) {
			this._doAutoRender();
			var o = n.getViewportRect();
			this._show();
			var a, s, d, c, u = this.fitSize();
			t ? (a = this.canSideLeft && e.right + u.width > o.right && e.left > u.width, s = this.canSideUp && e.top + u.height > o.bottom && e.bottom > u.height, d = a ? e.left - u.width : e.right, c = s ? e.bottom - u.height : e.top) : (a = this.canSideLeft && e.right + u.width > o.right && e.left > u.width, s = this.canSideUp && e.top + u.height > o.bottom && e.bottom > u.height, d = a ? e.right - u.width : e.left, c = s ? e.top - u.height : e.bottom);
			var f = this.getDom();
			n.setViewportOffset(f, {
				left: d,
				top: c
			}), i.removeClasses(f, l), f.className += " " + l[2 * (s ? 1 : 0) + (a ? 1 : 0)], this.editor && (f.style.zIndex = 1 * this.editor.container.style.zIndex + 10, r.editor.ui.uiUtils.getFixedLayer().style.zIndex = f.style.zIndex - 1);
		},
		showAt: function(e) {
			var t = e.left,
				n = e.top,
				i = {
					left: t,
					top: n,
					right: t,
					bottom: n,
					height: 0,
					width: 0
				};
			this.showAnchorRect(i, !1, !0);
		},
		_show: function() {
			if (this._hidden) {
				var e = this.getDom();
				e.style.display = "", this._hidden = !1, this.fireEvent("show");
			}
		},
		isHidden: function() {
			return this._hidden;
		},
		show: function() {
			this._doAutoRender(), this._show();
		},
		hide: function(e) {
			!this._hidden && this.getDom() && (this.getDom().style.display = "none", this._hidden = !0, e || this.fireEvent("hide"));
		},
		queryAutoHide: function(e) {
			return !e || !n.contains(this.getDom(), e);
		}
	}, t.inherits(a, o), i.on(document, "mousedown", function(t) {
		var n = t.target || t.srcElement;
		e(t, n);
	}), i.on(window, "scroll", function(t, n) {
		e(t, n);
	});
}(), function() {
	function e(e, t, n) {
		var i = '<div unselectable="on" id="##_preview" class="edui-colorpicker-preview" style="display:none;"></div><div class="ue_colorpicker_box" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);">';
		i += '<div class="ue_colorpicker_group" style="overflow:hidden;"><div class="ue_colorpicker_hd">' + t.getLang("recentlyColor") + '</div><div class="ue_colorpicker_bd" id="##_recently_color" >' + s;
		var o = n.recentlyColor;
		if (o.length > 0) for (var r = 0, a = o.length; a > r; r++) {
			var l = o[r].substr(1);
			i += '<span onclick="return false;" title="#' + l + '" data-color="#' + l + '" class="ue_colorpicker_square" style="background-color:#' + l + '"></span>';
		}
		i += "</div></div>";
		var c = '<span id="##_colorpicker_tab" class="ue_colorpicker_hd_tab" onclick="return $$._onColorPickerClick(event, this);">更多颜色</span>';
		document.getElementsByClassName || (c = ""), i += '<div class="ue_colorpicker_group" style="overflow:hidden;"><div class="ue_colorpicker_hd"><span id="##_basiccolor_tab" class="ue_colorpicker_hd_tab selected" onclick="return $$._onBasicColorClick(event, this);">' + t.getLang("basicColor") + "</span>" + c + '</div><div class="ue_colorpicker_bd" id="##_basiccolor">';
		for (var r = 0, a = d.length; a > r; r++) {
			var l = d[r];
			i += '<span onclick="return false;" title="#' + l + '" data-color="#' + l + '" class="ue_colorpicker_square" style="background-color:#' + l + '"></span>';
		}
		return i += '</div><div class="ue_colorpicker_bd" id="##_colorpicker" style="display:none;"></div></div><div class="ue_colorpicker_toolbar"><span class="ue_colorpicker_square" id="##_colorinput_preview" style="background-color:#f00"></span><a href="javascript:void(0);" onclick="return $$._onBtnClick(event, this);" class="btn_ue_colorpicker">确认</a><span class="ue_colorpicker_input_box"><span class="ue_colorpicker_input_append">#</span><span class="ue_colorpicker_input_inner"><input id="##_colorinput" value="ff0000" type="text" onkeyup="return $$._onInputKeyup(event, this);" onclick="return $$._onInputClick(event, this);"></span></span></div></div>';
	}
	var t = r.editor.utils,
		n = r.editor.ui.UIBase,
		a = 8,
		s = '<span onclick="return false;" title="清除颜色" class="ue_colorpicker_nocolor ue_colorpicker_square"></span>',
		l = r.editor.ui.ColorPicker = function(e) {
			this.initOptions(e), this.noColorText = this.noColorText || this.editor.getLang("clearColor"), this.initUIBase();
			var t = this.storekey = "__ue_recentlycolor_" + (e.storekey || ""),
				n = i.get(t);
			n = n ? n.split(",").slice(0, a) : ["#000"], this.recentlyColor = n;
		};
	l.prototype = {
		getHtmlTpl: function() {
			return e(this.noColorText, this.editor, this);
		},
		_initColorPicker: function() {
			var e = this,
				t = this.getDom("colorpicker"),
				n = this.getDom("colorinput_preview"),
				i = e.getDom("colorinput");
			$(t).addClass("cp cp-default");
			o(t, function(t) {
				if (t) {
					t = t.substr(1), i.value = t;
					var o = e._getColor();
					o && (n.style.backgroundColor = o ? o : "#fff");
				}
			});
		},
		_onTableClick: function(e) {
			var t = e.target || e.srcElement,
				n = t.getAttribute("data-color");
			if (n) {
				this._saveColor(n);
				var i = this.getDom("colorinput_preview"),
					o = this.getDom("colorinput");
				i.style.backgroundColor = n, o.value = (n || "").substr(1), this.fireEvent("pickcolor", n);
			} else this._onPickNoColor();
		},
		_saveColor: function(e) {
			for (var t = this.recentlyColor || ["#000"], n = [], o = 0, r = t.length; r > o; ++o) {
				var l = t[o];
				l != e && n.push(l);
			}
			n.unshift(e), t = n.slice(0, a), this.recentlyColor = t, i.set(this.storekey, t.join(",")), html = s;
			for (var o = 0, r = t.length; r > o; o++) {
				var l = t[o].substr(1);
				html += '<span onclick="return false;" title="#' + l + '" data-color="#' + l + '" class="ue_colorpicker_square" style="background-color:#' + l + '"></span>';
			}
			this.getDom("recently_color").innerHTML = html;
		},
		_onTableOver: function(e) {
			var t = e.target || e.srcElement,
				n = t.getAttribute("data-color");
			n && (this.getDom("preview").style.backgroundColor = n);
		},
		_getColor: function() {
			var e = this.getDom("colorinput"),
				t = e.value || "";
			t = t.toLowerCase();
			var n = t.split(""),
				i = n.length;
			if (3 != i && 6 != i) return !1;
			for (var o = 0; i > o; ++o) {
				var r = n[o];
				if (!(r >= "0" && "9" >= r || r >= "a" && "f" >= r)) return !1;
			}
			return "#" + t;
		},
		_onBtnClick: function(e) {
			var t = this._getColor();
			return t && (this._saveColor(t), this.fireEvent("pickcolor", t)), e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : e.cancelBubble = !0, !1;
		},
		_onInputKeyup: function(e) {
			var t = this.getDom("colorinput_preview"),
				n = this._getColor(),
				i = e.keyCode || e.which;
			t.style.backgroundColor = n ? n : "#fff", n && 13 == i && (this._saveColor(n), this.fireEvent("pickcolor", n));
		},
		_onInputClick: function(e) {
			e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : e.cancelBubble = !0;
		},
		_onTableOut: function() {
			this.getDom("preview").style.backgroundColor = "";
		},
		_onPickNoColor: function() {
			this.fireEvent("picknocolor");
		},
		_onBasicColorClick: function(e) {
			var t = this.getDom("basiccolor"),
				n = this.getDom("colorpicker");
			t.style.display = "block", n.style.display = "none";
			var i = this.getDom("basiccolor_tab"),
				o = this.getDom("colorpicker_tab");
			return $(i).addClass("selected"), $(o).removeClass("selected"), e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : e.cancelBubble = !0, !1;
		},
		_onColorPickerClick: function(e) {
			var t = this.getDom("basiccolor"),
				n = this.getDom("colorpicker");
			t.style.display = "none", n.style.display = "block";
			var i = this.getDom("basiccolor_tab"),
				o = this.getDom("colorpicker_tab");
			return $(i).removeClass("selected"), $(o).addClass("selected"), this.__hasInitColorPicker || (this.__hasInitColorPicker = !0, this._initColorPicker()), e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : e.cancelBubble = !0, !1;
		}
	}, t.inherits(l, n);
	var d = "ffffff,ffd7d5,ffdaa9,fffed5,d4fa00,73fcd6,a5c8ff,ffacd5,ff7faa,d6d6d6,ffacaa,ffb995,fffb00,73fa79,00fcff,78acfe,d84fa9,ff4f79,b2b2b2,d7aba9,ff6827,ffda51,00d100,00d5ff,0080ff,ac39ff,ff2941,888888,7a4442,ff4c00,ffa900,3da742,3daad6,0052ff,7a4fd6,d92142,000000,7b0c00,ff4c41,d6a841,407600,007aaa,021eaa,797baa,ab1942".split(",");
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		n = r.editor.ui.UIBase,
		i = r.editor.ui.TablePicker = function(e) {
			this.initOptions(e), this.initTablePicker();
		};
	i.prototype = {
		defaultNumRows: 10,
		defaultNumCols: 10,
		maxNumRows: 20,
		maxNumCols: 20,
		numRows: 10,
		numCols: 10,
		lengthOfCellSide: 22,
		initTablePicker: function() {
			this.initUIBase();
		},
		getHtmlTpl: function() {
			return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>';
		},
		_UIBase_render: n.prototype.render,
		render: function(e) {
			this._UIBase_render(e), this.getDom("label").innerHTML = "0" + this.editor.getLang("t_row") + " x 0" + this.editor.getLang("t_col");
		},
		_track: function(e, t) {
			var n = this.getDom("overlay").style,
				i = this.lengthOfCellSide;
			n.width = e * i + "px", n.height = t * i + "px";
			var o = this.getDom("label");
			o.innerHTML = e + this.editor.getLang("t_col") + " x " + t + this.editor.getLang("t_row"), this.numCols = e, this.numRows = t;
		},
		_onMouseOver: function(e, n) {
			var i = e.relatedTarget || e.fromElement;
			t.contains(n, i) || n === i || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "");
		},
		_onMouseOut: function(e, n) {
			var i = e.relatedTarget || e.toElement;
			t.contains(n, i) || n === i || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "hidden");
		},
		_onMouseMove: function(e) {
			var n = (this.getDom("overlay").style, t.getEventOffset(e)),
				i = this.lengthOfCellSide,
				o = Math.ceil(n.left / i),
				r = Math.ceil(n.top / i);
			this._track(o, r);
		},
		_onClick: function() {
			this.fireEvent("picktable", this.numCols, this.numRows);
		}
	}, e.inherits(i, n);
}(), function() {
	var e = r.editor.browser,
		t = r.editor.dom.domUtils,
		n = r.editor.ui.uiUtils,
		i = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (e.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"' : ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"');
	r.editor.ui.Stateful = {
		alwalysHoverable: !1,
		target: null,
		Stateful_init: function() {
			this._Stateful_dGetHtmlTpl = this.getHtmlTpl, this.getHtmlTpl = this.Stateful_getHtmlTpl;
		},
		Stateful_getHtmlTpl: function() {
			var e = this._Stateful_dGetHtmlTpl();
			return e.replace(/stateful/g, function() {
				return i;
			});
		},
		Stateful_onMouseEnter: function(e, t) {
			this.target = t, (!this.isDisabled() || this.alwalysHoverable) && (this.addState("hover"), this.fireEvent("over"));
		},
		Stateful_onMouseLeave: function() {
			(!this.isDisabled() || this.alwalysHoverable) && (this.removeState("hover"), this.removeState("active"), this.fireEvent("out"));
		},
		Stateful_onMouseOver: function(e, t) {
			var i = e.relatedTarget;
			n.contains(t, i) || t === i || this.Stateful_onMouseEnter(e, t);
		},
		Stateful_onMouseOut: function(e, t) {
			var i = e.relatedTarget;
			n.contains(t, i) || t === i || this.Stateful_onMouseLeave(e, t);
		},
		Stateful_onMouseDown: function() {
			this.isDisabled() || this.addState("active");
		},
		Stateful_onMouseUp: function() {
			this.isDisabled() || this.removeState("active");
		},
		Stateful_postRender: function() {
			this.disabled && !this.hasState("disabled") && this.addState("disabled");
		},
		hasState: function(e) {
			return t.hasClass(this.getStateDom(), "edui-state-" + e);
		},
		addState: function(e) {
			this.hasState(e) || (this.getStateDom().className += " edui-state-" + e);
		},
		removeState: function(e) {
			this.hasState(e) && t.removeClasses(this.getStateDom(), ["edui-state-" + e]);
		},
		getStateDom: function() {
			return this.getDom("state");
		},
		isChecked: function() {
			return this.hasState("checked");
		},
		setChecked: function(e) {
			!this.isDisabled() && e ? this.addState("checked") : this.removeState("checked");
		},
		isDisabled: function() {
			return this.hasState("disabled");
		},
		setDisabled: function(e) {
			e ? (this.removeState("hover"), this.removeState("checked"), this.removeState("active"), this.addState("disabled")) : this.removeState("disabled");
		}
	};
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.UIBase,
		n = r.editor.ui.Stateful,
		i = r.editor.ui.Button = function(e) {
			this.initOptions(e), this.initButton();
		};
	i.prototype = {
		uiName: "button",
		label: "",
		title: "",
		showIcon: !0,
		showText: !0,
		initButton: function() {
			this.initUIBase(), this.Stateful_init();
		},
		getHtmlTpl: function() {
			return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'data-tooltip="' + this.title + '"' : "") + ' class="%%-body js_tooltip" onmousedown="return false;" onclick="return $$._onClick();">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>' : "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>" : "") + "</div></div></div></div>";
		},
		postRender: function() {
			this.Stateful_postRender(), this.setDisabled(this.disabled);
		},
		_onClick: function() {
			this.isDisabled() || this.fireEvent("click");
		}
	}, e.inherits(i, t), e.extend(i.prototype, n);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		n = (r.editor.dom.domUtils, r.editor.ui.UIBase),
		i = r.editor.ui.Stateful,
		o = r.editor.ui.SplitButton = function(e) {
			this.initOptions(e), this.initSplitButton();
		};
	o.prototype = {
		popup: null,
		uiName: "splitbutton",
		title: "",
		initSplitButton: function() {
			this.initUIBase(), this.Stateful_init();
			if (null != this.popup) {
				var e = this.popup;
				this.popup = null, this.setPopup(e);
			}
		},
		_UIBase_postRender: n.prototype.postRender,
		postRender: function() {
			this.Stateful_postRender(), this._UIBase_postRender();
		},
		setPopup: function(n) {
			this.popup !== n && (null != this.popup && this.popup.dispose(), n.addListener("show", e.bind(this._onPopupShow, this)), n.addListener("hide", e.bind(this._onPopupHide, this)), n.addListener("postrender", e.bind(function() {
				n.getDom("body").appendChild(t.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (t.getClientRect(this.getDom()).width + 20) + 'px"></div>')), n.getDom().className += " " + this.className;
			}, this)), this.popup = n);
		},
		_onPopupShow: function() {
			this.addState("opened");
		},
		_onPopupHide: function() {
			this.removeState("opened");
		},
		getHtmlTpl: function() {
			var e = '<div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div>';
			return this.useInput && (e = '<div id="##_button_body" class="edui-box edui-button-body"><input id="##_wx_input" class="edui-box edui-wx-input " type="text" onkeydown="$$._onInputKeydown(event, this);" onclick="$$._onInputClick(event, this);" onblur="$$._onInputBlur(event, this);"></div>'), '<div id="##" class="edui-box %%"><div ' + (this.title ? 'data-tooltip="' + this.title + '"' : "") + ' id="##_state" stateful class="js_tooltip"><div class="%%-body">' + e + '<div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>';
		},
		showPopup: function() {
			var e = t.getClientRect(this.getDom());
			e.top -= this.popup.SHADOW_RADIUS, e.height += this.popup.SHADOW_RADIUS, this.popup.showAnchorRect(e);
		},
		_onArrowClick: function() {
			this.isDisabled() || this.showPopup();
		},
		_onInputClick: function() {
			this.isDisabled() || this.fireEvent("inputclick");
		},
		_onInputBlur: function(e) {
			this.isDisabled() || this.fireEvent("inputblur"), e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : e.cancelBubble = !0;
		},
		_onInputKeydown: function(e) {
			this.isDisabled() || this.fireEvent("inputkeydown", e);
		},
		_onButtonClick: function() {
			this.isDisabled() || this.fireEvent("buttonclick");
		}
	}, e.inherits(o, n), e.extend(o.prototype, i, !0);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		n = r.editor.ui.ColorPicker,
		i = r.editor.ui.Popup,
		o = r.editor.ui.SplitButton,
		a = r.editor.ui.ColorButton = function(e) {
			this.initOptions(e), this.initColorButton();
		};
	a.prototype = {
		initColorButton: function() {
			var e = this;
			this.popup = new i({
				content: new n({
					noColorText: e.editor.getLang("clearColor"),
					storekey: e.storekey,
					editor: e.editor,
					onpickcolor: function(t, n) {
						e._onPickColor(n);
					},
					onpicknocolor: function(t, n) {
						e._onPickNoColor(n);
					}
				}),
				editor: e.editor
			}), this.initSplitButton();
		},
		_SplitButton_postRender: o.prototype.postRender,
		postRender: function() {
			this._SplitButton_postRender(), this.getDom("button_body").appendChild(t.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>')), this.getDom().className += " edui-colorbutton";
		},
		setColor: function(e) {
			this.getDom("colorlump").style.backgroundColor = e, this.color = e;
		},
		_onPickColor: function(e) {
			this.fireEvent("pickcolor", e) !== !1 && (this.setColor(e), this.popup.hide());
		},
		_onPickNoColor: function() {
			this.fireEvent("picknocolor") !== !1 && this.popup.hide();
		}
	}, e.inherits(a, o);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.Popup,
		n = r.editor.ui.TablePicker,
		i = r.editor.ui.SplitButton,
		o = r.editor.ui.TableButton = function(e) {
			this.initOptions(e), this.initTableButton();
		};
	o.prototype = {
		initTableButton: function() {
			var e = this;
			this.popup = new t({
				content: new n({
					editor: e.editor,
					onpicktable: function(t, n, i) {
						e._onPickTable(n, i);
					}
				}),
				editor: e.editor
			}), this.initSplitButton();
		},
		_onPickTable: function(e, t) {
			this.fireEvent("picktable", e, t) !== !1 && this.popup.hide();
		}
	}, e.inherits(o, i);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.UIBase,
		n = r.editor.ui.AutoTypeSetPicker = function(e) {
			this.initOptions(e), this.initAutoTypeSetPicker();
		};
	n.prototype = {
		initAutoTypeSetPicker: function() {
			this.initUIBase();
		},
		getHtmlTpl: function() {
			var e = this.editor,
				t = e.options.autotypeset,
				n = e.getLang("autoTypeSet"),
				i = "textAlignValue" + e.uid,
				o = "imageBlockLineValue" + e.uid;
			return '<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap colspan="2"><input type="checkbox" name="mergeEmptyline" ' + (t.mergeEmptyline ? "checked" : "") + ">" + n.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (t.removeEmptyline ? "checked" : "") + ">" + n.delLine + '</td></tr><tr><td nowrap colspan="2"><input type="checkbox" name="removeClass" ' + (t.removeClass ? "checked" : "") + ">" + n.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (t.indent ? "checked" : "") + ">" + n.indent + '</td></tr><tr><td nowrap colspan="2"><input type="checkbox" name="textAlign" ' + (t.textAlign ? "checked" : "") + ">" + n.alignment + '</td><td colspan="2" id="' + i + '"><input type="radio" name="' + i + '" value="left" ' + (t.textAlign && "left" == t.textAlign ? "checked" : "") + ">" + e.getLang("justifyleft") + '<input type="radio" name="' + i + '" value="center" ' + (t.textAlign && "center" == t.textAlign ? "checked" : "") + ">" + e.getLang("justifycenter") + '<input type="radio" name="' + i + '" value="right" ' + (t.textAlign && "right" == t.textAlign ? "checked" : "") + ">" + e.getLang("justifyright") + ' </tr><tr><td nowrap colspan="2"><input type="checkbox" name="imageBlockLine" ' + (t.imageBlockLine ? "checked" : "") + ">" + n.imageFloat + '</td><td nowrap colspan="2" id="' + o + '"><input type="radio" name="' + o + '" value="none" ' + (t.imageBlockLine && "none" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("default") + '<input type="radio" name="' + o + '" value="left" ' + (t.imageBlockLine && "left" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("justifyleft") + '<input type="radio" name="' + o + '" value="center" ' + (t.imageBlockLine && "center" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("justifycenter") + '<input type="radio" name="' + o + '" value="right" ' + (t.imageBlockLine && "right" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("justifyright") + '</tr><tr><td nowrap colspan="2"><input type="checkbox" name="clearFontSize" ' + (t.clearFontSize ? "checked" : "") + ">" + n.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (t.clearFontFamily ? "checked" : "") + ">" + n.removeFontFamily + '</td></tr><tr><td nowrap colspan="4"><input type="checkbox" name="removeEmptyNode" ' + (t.removeEmptyNode ? "checked" : "") + ">" + n.removeHtml + '</td></tr><tr><td nowrap colspan="4"><input type="checkbox" name="pasteFilter" ' + (t.pasteFilter ? "checked" : "") + ">" + n.pasteFilter + '</td></tr><tr><td nowrap colspan="4" align="right"><button >' + n.run + "</button></td></tr></table></div></div>";
		},
		_UIBase_render: t.prototype.render
	}, e.inherits(n, t);
}(), function() {
	function e(e) {
		for (var t, n = e.editor.options.autotypeset, i = e.getDom(), o = e.editor.uid, r = null, a = null, s = p.getElementsByTagName(i, "input"), l = s.length - 1; t = s[l--];) if (r = t.getAttribute("type"), "checkbox" == r && (a = t.getAttribute("name"), n[a] && delete n[a], t.checked)) {
			var d = document.getElementById(a + "Value" + o);
			if (d) {
				if (/input/gi.test(d.tagName)) n[a] = d.value;
				else for (var c, u = d.getElementsByTagName("input"), f = u.length - 1; c = u[f--];) if (c.checked) {
					n[a] = c.value;
					break;
				}
			} else n[a] = !0;
		}
		for (var m, h = p.getElementsByTagName(i, "select"), l = 0; m = h[l++];) {
			var g = m.getAttribute("name");
			n[g] = n[g] ? m.value : "";
		}
		e.editor.options.autotypeset = n;
	}
	var t = r.editor.utils,
		n = r.editor.ui.Popup,
		i = r.editor.ui.AutoTypeSetPicker,
		o = r.editor.ui.SplitButton,
		a = r.editor.ui.AutoTypeSetButton = function(e) {
			this.initOptions(e), this.initAutoTypeSetButton();
		};
	a.prototype = {
		initAutoTypeSetButton: function() {
			var t = this;
			this.popup = new n({
				content: new i({
					editor: t.editor
				}),
				editor: t.editor,
				hide: function() {
					!this._hidden && this.getDom() && (e(this), this.getDom().style.display = "none", this._hidden = !0, this.fireEvent("hide"));
				}
			});
			var o = 0;
			this.popup.addListener("postRenderAfter", function() {
				var n = this;
				if (!o) {
					var i = this.getDom(),
						r = i.getElementsByTagName("button")[0];
					r.onclick = function() {
						e(n), t.editor.execCommand("autotypeset"), n.hide();
					}, o = 1;
				}
			}), this.initSplitButton();
		}
	}, t.inherits(a, o);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.Popup,
		n = r.editor.ui.Stateful,
		i = r.editor.ui.UIBase,
		o = r.editor.ui.CellAlignPicker = function(e) {
			this.initOptions(e), this.initSelected(), this.initCellAlignPicker();
		};
	o.prototype = {
		initSelected: function() {
			var e = {
				valign: {
					top: 0,
					middle: 1,
					bottom: 2
				},
				align: {
					left: 0,
					center: 1,
					right: 2
				},
				count: 3
			};
			this.selected && (this.selectedIndex = e.valign[this.selected.valign] * e.count + e.align[this.selected.align]);
		},
		initCellAlignPicker: function() {
			this.initUIBase(), this.Stateful_init();
		},
		getHtmlTpl: function() {
			for (var e = ["left", "center", "right"], t = 9, n = null, i = -1, o = [], r = 0; t > r; r++) n = this.selectedIndex === r ? ' class="edui-cellalign-selected" ' : "", i = r % 3, 0 === i && o.push("<tr>"), o.push('<td index="' + r + '" ' + n + ' stateful><div class="edui-icon edui-' + e[i] + '"></div></td>'), 2 === i && o.push("</tr>");
			return '<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">' + o.join("") + "</table></div></div>";
		},
		getStateDom: function() {
			return this.target;
		},
		_onClick: function(e) {
			var n = e.target || e.srcElement;
			/icon/.test(n.className) && (this.items[n.parentNode.getAttribute("index")].onclick(), t.postHide(e));
		},
		_UIBase_render: i.prototype.render
	}, e.inherits(o, i), e.extend(o.prototype, n, !0);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.Stateful,
		n = r.editor.ui.uiUtils,
		i = r.editor.ui.UIBase,
		o = r.editor.ui.PastePicker = function(e) {
			this.initOptions(e), this.initPastePicker();
		};
	o.prototype = {
		initPastePicker: function() {
			this.initUIBase(), this.Stateful_init();
		},
		getHtmlTpl: function() {
			return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">' + this.editor.getLang("pasteOpt") + '</div><div class="edui-button"><div title="' + this.editor.getLang("pasteSourceFormat") + '" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="' + this.editor.getLang("tagFormat") + '" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="' + this.editor.getLang("pasteTextFormat") + '" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>';
		},
		getStateDom: function() {
			return this.target;
		},
		format: function(e) {
			this.editor.ui._isTransfer = !0, this.editor.fireEvent("pasteTransfer", e);
		},
		_onClick: function(e) {
			var t = p.getNextDomNode(e),
				i = n.getViewportRect().height,
				o = n.getClientRect(t);
			t.style.top = o.top + o.height > i ? -o.height - e.offsetHeight + "px" : "", /hidden/gi.test(p.getComputedStyle(t, "visibility")) ? (t.style.visibility = "visible", p.addClass(e, "edui-state-opened")) : (t.style.visibility = "hidden", p.removeClasses(e, "edui-state-opened"));
		},
		_UIBase_render: i.prototype.render
	}, e.inherits(o, i), e.extend(o.prototype, t, !0);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		n = r.editor.ui.UIBase,
		i = r.editor.ui.Toolbar = function(e) {
			this.initOptions(e), this.initToolbar();
		};
	i.prototype = {
		items: null,
		initToolbar: function() {
			this.items = this.items || [], this.initUIBase();
		},
		add: function(e) {
			this.items.push(e);
		},
		getHtmlTpl: function() {
			for (var e = [], t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml();
			return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + e.join("") + "</div>";
		},
		postRender: function() {
			for (var e = this.getDom(), n = 0; n < this.items.length; n++) this.items[n].postRender();
			t.makeUnselectable(e);
		},
		_onMouseDown: function() {
			return !1;
		}
	}, e.inherits(i, n);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.dom.domUtils,
		n = r.editor.ui.uiUtils,
		i = r.editor.ui.UIBase,
		o = r.editor.ui.Popup,
		a = r.editor.ui.Stateful,
		s = r.editor.ui.CellAlignPicker,
		l = r.editor.ui.Menu = function(e) {
			this.initOptions(e), this.initMenu();
		},
		d = {
			renderHtml: function() {
				return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>';
			},
			postRender: function() {},
			queryAutoHide: function() {
				return !0;
			}
		};
	l.prototype = {
		items: null,
		uiName: "menu",
		initMenu: function() {
			this.items = this.items || [], this.initPopup(), this.initItems();
		},
		initItems: function() {
			for (var e = 0; e < this.items.length; e++) {
				var t = this.items[e];
				"-" == t ? this.items[e] = this.getSeparator() : t instanceof c || (t.editor = this.editor, t.theme = this.editor.options.theme, this.items[e] = this.createItem(t));
			}
		},
		getSeparator: function() {
			return d;
		},
		createItem: function(e) {
			return e.menu = this, new c(e);
		},
		_Popup_getContentHtmlTpl: o.prototype.getContentHtmlTpl,
		getContentHtmlTpl: function() {
			if (0 == this.items.length) return this._Popup_getContentHtmlTpl();
			for (var e = [], t = 0; t < this.items.length; t++) {
				var n = this.items[t];
				e[t] = n.renderHtml();
			}
			return '<div class="%%-body">' + e.join("") + "</div>";
		},
		_Popup_postRender: o.prototype.postRender,
		postRender: function() {
			for (var e = this, i = 0; i < this.items.length; i++) {
				var o = this.items[i];
				o.ownerMenu = this, o.postRender();
			}
			t.on(this.getDom(), "mouseover", function(t) {
				t = t || event;
				var i = t.relatedTarget || t.fromElement,
					o = e.getDom();
				n.contains(o, i) || o === i || e.fireEvent("over");
			}), this._Popup_postRender();
		},
		queryAutoHide: function(e) {
			if (e) {
				if (n.contains(this.getDom(), e)) return !1;
				for (var t = 0; t < this.items.length; t++) {
					var i = this.items[t];
					if (i.queryAutoHide(e) === !1) return !1;
				}
			}
		},
		clearItems: function() {
			for (var e = 0; e < this.items.length; e++) {
				var t = this.items[e];
				clearTimeout(t._showingTimer), clearTimeout(t._closingTimer), t.subMenu && t.subMenu.destroy();
			}
			this.items = [];
		},
		destroy: function() {
			this.getDom() && t.remove(this.getDom()), this.clearItems();
		},
		dispose: function() {
			this.destroy();
		}
	}, e.inherits(l, o);
	var c = r.editor.ui.MenuItem = function(e) {
			if (this.initOptions(e), this.initUIBase(), this.Stateful_init(), this.subMenu && !(this.subMenu instanceof l)) if (e.className && -1 != e.className.indexOf("aligntd")) {
				var n = this;
				this.subMenu.selected = this.editor.queryCommandValue("cellalignment"), this.subMenu = new o({
					content: new s(this.subMenu),
					parentMenu: n,
					editor: n.editor,
					destroy: function() {
						this.getDom() && t.remove(this.getDom());
					}
				}), this.subMenu.addListener("postRenderAfter", function() {
					t.on(this.getDom(), "mouseover", function() {
						n.addState("opened");
					});
				});
			} else this.subMenu = new l(this.subMenu);
		};
	c.prototype = {
		label: "",
		subMenu: null,
		ownerMenu: null,
		uiName: "menuitem",
		alwalysHoverable: !0,
		getHtmlTpl: function() {
			return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + "</div></div>";
		},
		postRender: function() {
			var e = this;
			this.addListener("over", function() {
				e.ownerMenu.fireEvent("submenuover", e), e.subMenu && e.delayShowSubMenu();
			}), this.subMenu && (this.getDom().className += " edui-hassubmenu", this.subMenu.render(), this.addListener("out", function() {
				e.delayHideSubMenu();
			}), this.subMenu.addListener("over", function() {
				clearTimeout(e._closingTimer), e._closingTimer = null, e.addState("opened");
			}), this.ownerMenu.addListener("hide", function() {
				e.hideSubMenu();
			}), this.ownerMenu.addListener("submenuover", function(t, n) {
				n !== e && e.delayHideSubMenu();
			}), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function(t) {
				return t && n.contains(e.getDom(), t) ? !1 : this._bakQueryAutoHide(t);
			}), this.getDom().style.tabIndex = "-1", n.makeUnselectable(this.getDom()), this.Stateful_postRender();
		},
		delayShowSubMenu: function() {
			var e = this;
			e.isDisabled() || (e.addState("opened"), clearTimeout(e._showingTimer), clearTimeout(e._closingTimer), e._closingTimer = null, e._showingTimer = setTimeout(function() {
				e.showSubMenu();
			}, 250));
		},
		delayHideSubMenu: function() {
			var e = this;
			e.isDisabled() || (e.removeState("opened"), clearTimeout(e._showingTimer), e._closingTimer || (e._closingTimer = setTimeout(function() {
				e.hasState("opened") || e.hideSubMenu(), e._closingTimer = null;
			}, 400)));
		},
		renderLabelHtml: function() {
			return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || "") + "</div>";
		},
		getStateDom: function() {
			return this.getDom();
		},
		queryAutoHide: function(e) {
			return this.subMenu && this.hasState("opened") ? this.subMenu.queryAutoHide(e) : void 0;
		},
		_onClick: function(e, t) {
			this.hasState("disabled") || this.fireEvent("click", e, t) !== !1 && (this.subMenu ? this.showSubMenu() : o.postHide(e));
		},
		showSubMenu: function() {
			var e = n.getClientRect(this.getDom());
			e.right -= 5, e.left += 2, e.width -= 7, e.top -= 4, e.bottom += 4, e.height += 8, this.subMenu.showAnchorRect(e, !0, !0);
		},
		hideSubMenu: function() {
			this.subMenu.hide();
		}
	}, e.inherits(c, i), e.extend(c.prototype, a, !0);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		n = r.editor.ui.Menu,
		i = r.editor.ui.SplitButton,
		o = r.editor.ui.Combox = function(e) {
			this.initOptions(e), this.initCombox();
		};
	o.prototype = {
		uiName: "combox",
		initCombox: function() {
			var e = this;
			this.items = this.items || [];
			for (var t = 0; t < this.items.length; t++) {
				var i = this.items[t];
				i.uiName = "listitem", i.index = t, i.onclick = function() {
					e.selectByIndex(this.index);
				};
			}
			this.popup = new n({
				items: this.items,
				uiName: "list",
				editor: this.editor,
				captureWheel: !0,
				combox: this
			}), this.initSplitButton();
		},
		_SplitButton_postRender: i.prototype.postRender,
		postRender: function() {
			this._SplitButton_postRender(), this.setLabel(this.label || ""), this.setValue(this.initValue || "");
		},
		showPopup: function() {
			var e = t.getClientRect(this.getDom());
			e.top += 1, e.bottom -= 1, e.height -= 2, this.popup.showAnchorRect(e);
		},
		getValue: function() {
			return this.value;
		},
		setValue: function(e) {
			var t = this.indexByValue(e); - 1 != t ? (this.selectedIndex = t, this.setLabel(this.items[t].label), this.value = this.items[t].value) : (this.selectedIndex = -1, this.setLabel(this.getLabelForUnknowValue(e)), this.value = e);
		},
		setLabel: function(e) {
			this.useInput ? this.getDom("wx_input").value = e : this.getDom("button_body").innerHTML = e, this.label = e;
		},
		getLabelForUnknowValue: function(e) {
			return e;
		},
		indexByValue: function(e) {
			for (var t = 0; t < this.items.length; t++) if (e == this.items[t].value) return t;
			return -1;
		},
		getItem: function(e) {
			return this.items[e];
		},
		selectByIndex: function(e) {
			e < this.items.length && this.fireEvent("select", e) !== !1 && (this.selectedIndex = e, this.value = this.items[e].value, this.setLabel(this.items[e].label));
		}
	}, e.inherits(o, i);
}(), function() {
	var e, t, n = r.editor.utils,
		i = r.editor.dom.domUtils,
		o = r.editor.ui.uiUtils,
		a = r.editor.ui.Mask,
		l = r.editor.ui.UIBase,
		d = r.editor.ui.Button,
		c = r.editor.ui.Dialog = function(e) {
			this.initOptions(n.extend({
				autoReset: !0,
				draggable: !0,
				onok: function() {},
				oncancel: function() {},
				onclose: function(e, t) {
					return t ? this.onok() : this.oncancel();
				},
				holdScroll: !1
			}, e)), this.initDialog();
		};
	c.prototype = {
		draggable: !1,
		uiName: "dialog",
		initDialog: function() {
			var n = this,
				i = this.editor.options.theme;
			if (this.initUIBase(), this.modalMask = e || (e = new a({
				className: "edui-dialog-modalmask",
				theme: i
			})), this.dragMask = t || (t = new a({
				className: "edui-dialog-dragmask",
				theme: i
			})), this.closeButton = new d({
				className: "edui-dialog-closebutton",
				title: n.closeDialog,
				theme: i,
				onclick: function() {
					n.close(!1);
				}
			}), this.buttons) for (var o = 0; o < this.buttons.length; o++) this.buttons[o] instanceof d || (this.buttons[o] = new d(this.buttons[o]));
		},
		fitSize: function() {
			var e = this.getDom("body"),
				t = this.mesureSize();
			return e.style.width = t.width + "px", e.style.height = t.height + "px", t;
		},
		safeSetOffset: function(e) {
			var t = this,
				n = t.getDom(),
				i = o.getViewportRect(),
				r = o.getClientRect(n),
				a = e.left;
			a + r.width > i.right && (a = i.right - r.width);
			var s = e.top;
			s + r.height > i.bottom && (s = i.bottom - r.height), n.style.left = Math.max(a, 0) + "px", n.style.top = Math.max(s, 0) + "px";
		},
		showAtCenter: function() {
			this.getDom().style.display = "";
			var e = o.getViewportRect(),
				t = this.fitSize(),
				n = 0 | this.getDom("titlebar").offsetHeight,
				r = e.width / 2 - t.width / 2,
				a = e.height / 2 - (t.height - n) / 2 - n,
				s = this.getDom();
			this.safeSetOffset({
				left: Math.max(0 | r, 0),
				top: Math.max(0 | a, 0)
			}), i.hasClass(s, "edui-state-centered") || (s.className += " edui-state-centered"), this._show();
		},
		getContentHtml: function() {
			var e = "";
			return "string" == typeof this.content ? e = this.content : this.iframeUrl && (e = '<span id="' + this.id + '_contmask" class="dialogcontmask"></span><iframe id="' + this.id + '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' + this.iframeUrl + '"></iframe>'), e;
		},
		getHtmlTpl: function() {
			var e = "";
			if (this.buttons) {
				for (var t = [], n = 0; n < this.buttons.length; n++) t[n] = this.buttons[n].renderHtml();
				e = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">' + t.join("") + "</div></div>";
			}
			return '<div id="##" class="%%"><div class="%%-wrap"><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">' + (this.title || "") + "</span></div>" + this.closeButton.renderHtml() + '</div><div id="##_content" class="%%-content">' + (this.autoReset ? "" : this.getContentHtml()) + "</div>" + e + "</div></div></div>";
		},
		postRender: function() {
			this.modalMask.getDom() || (this.modalMask.render(), this.modalMask.hide()), this.dragMask.getDom() || (this.dragMask.render(), this.dragMask.hide());
			var e = this;
			if (this.addListener("show", function() {
				e.modalMask.show(this.getDom().style.zIndex - 2);
			}), this.addListener("hide", function() {
				e.modalMask.hide();
			}), this.buttons) for (var t = 0; t < this.buttons.length; t++) this.buttons[t].postRender();
			i.on(window, "resize", function() {
				setTimeout(function() {
					e.isHidden() || e.safeSetOffset(o.getClientRect(e.getDom()));
				});
			}), this.holdScroll && (e.iframeUrl ? e.addListener("dialogafterreset", function() {
				window.setTimeout(function() {
					var t = document.getElementById(e.id + "_iframe").contentWindow;
					if (s.ie) var n = window.setInterval(function() {
						t.document && t.document.body && (window.clearInterval(n), n = null, i.on(t.document.body, s.gecko ? "DOMMouseScroll" : "mousewheel", function(e) {
							i.preventDefault(e);
						}));
					}, 100);
					else i.on(t, s.gecko ? "DOMMouseScroll" : "mousewheel", function(e) {
						i.preventDefault(e);
					});
				}, 1);
			}) : i.on(document.getElementById(e.id + "_iframe"), s.gecko ? "DOMMouseScroll" : "mousewheel", function(e) {
				i.preventDefault(e);
			})), this._hide();
		},
		mesureSize: function() {
			var e = this.getDom("body"),
				t = o.getClientRect(this.getDom("content")).width,
				n = e.style;
			return n.width = t, o.getClientRect(e);
		},
		_onTitlebarMouseDown: function(e) {
			if (this.draggable) {
				var t, n = (o.getViewportRect(), this);
				o.startDrag(e, {
					ondragstart: function() {
						t = o.getClientRect(n.getDom()), n.getDom("contmask").style.visibility = "visible", n.dragMask.show(n.getDom().style.zIndex - 1);
					},
					ondragmove: function(e, i) {
						var o = t.left + e,
							r = t.top + i;
						n.safeSetOffset({
							left: o,
							top: r
						});
					},
					ondragstop: function() {
						n.getDom("contmask").style.visibility = "hidden", i.removeClasses(n.getDom(), ["edui-state-centered"]), n.dragMask.hide();
					}
				});
			}
		},
		reset: function() {
			this.getDom("content").innerHTML = this.getContentHtml(), this.fireEvent("dialogafterreset");
		},
		_show: function() {
			this._hidden && (this.getDom().style.display = "", this.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * this.editor.container.style.zIndex + 10), this._hidden = !1, this.fireEvent("show"), r.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4);
		},
		isHidden: function() {
			return this._hidden;
		},
		_hide: function() {
			this._hidden || (this.getDom().style.display = "none", this.getDom().style.zIndex = "", this._hidden = !0, this.fireEvent("hide"));
		},
		open: function() {
			if (this.autoReset) try {
				this.reset();
			} catch (e) {
				this.render(), this.open();
			}
			if (this.showAtCenter(), this.iframeUrl) try {
				this.getDom("iframe").focus();
			} catch (t) {}
		},
		_onCloseButtonClick: function() {
			this.close(!1);
		},
		close: function(e) {
			this.fireEvent("close", e) !== !1 && this._hide();
		}
	}, n.inherits(c, l);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.Menu,
		n = r.editor.ui.SplitButton,
		i = r.editor.ui.MenuButton = function(e) {
			this.initOptions(e), this.initMenuButton();
		};
	i.prototype = {
		initMenuButton: function() {
			var e = this;
			this.uiName = "menubutton", this.popup = new t({
				items: e.items,
				className: e.className,
				editor: e.editor
			}), this.popup.addListener("show", function() {
				for (var t = this, n = 0; n < t.items.length; n++) t.items[n].removeState("checked"), t.items[n].value == e._value && (t.items[n].addState("checked"), this.value = e._value);
			}), this.initSplitButton();
		},
		setValue: function(e) {
			this._value = e;
		}
	}, e.inherits(i, n);
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui,
		n = t.Dialog;
	t.buttons = {}, t.Dialog = function(e) {
		var t = new n(e);
		return t.addListener("hide", function() {
			if (t.editor) {
				var e = t.editor;
				try {
					if (s.gecko) {
						var n = e.window.scrollY,
							i = e.window.scrollX;
						e.body.focus(), e.window.scrollTo(i, n);
					} else e.focus();
				} catch (o) {}
			}
		}), t;
	};
	for (var i, o = {
		edittable: "~/dialogs/table/edittable.html",
		edittd: "~/dialogs/table/edittd.html"
	}, a = ["undo", "redo", "formatmatch", "bold", "italic", "underline", "fontborder", "indent", "blockquote", "pasteplain", "selectall", "horizontal", "removeformat", , "insertparagraphbeforetable", "insertrow", "insertcol", "mergeright", "mergedown", "deleterow", "deletecol", "splittorows", "splittocols", "splittocells", "mergecells", "deletetable"], l = 0; i = a[l++];) i = i.toLowerCase(), t[i] = function(e) {
		return function(n) {
			var i = new t.Button({
				className: "edui-for-" + e,
				title: n.options.labelMap[e] || n.getLang("labelMap." + e) || "",
				onclick: function() {
					n.execCommand(e);
				},
				theme: n.options.theme,
				showText: !1
			});
			return t.buttons[e] = i, n.addListener("selectionchange", function(t, o, r) {
				var a = n.queryCommandState(e); - 1 == a ? (i.setDisabled(!0), i.setChecked(!1)) : r || (i.setDisabled(!1), i.setChecked(a));
			}), i;
		};
	}(i);
	t.cleardoc = function(e) {
		var n = new t.Button({
			className: "edui-for-cleardoc",
			title: e.options.labelMap.cleardoc || e.getLang("labelMap.cleardoc") || "",
			theme: e.options.theme,
			onclick: function() {
				confirm(e.getLang("confirmClear")) && e.execCommand("cleardoc");
			}
		});
		return t.buttons.cleardoc = n, e.addListener("selectionchange", function() {
			n.setDisabled(-1 == e.queryCommandState("cleardoc"));
		}), n;
	};
	var d = {
		justify: ["left", "right", "center", "justify"],
		imagefloat: ["none", "left", "center", "right"]
	};
	for (var c in d)!
	function(e, n) {
		for (var i, o = 0; i = n[o++];)!
		function(n) {
			t[e.replace("float", "") + n] = function(i) {
				var o = new t.Button({
					className: "edui-for-" + e.replace("float", "") + n,
					title: i.options.labelMap[e.replace("float", "") + n] || i.getLang("labelMap." + e.replace("float", "") + n) || "",
					theme: i.options.theme,
					onclick: function() {
						i.execCommand(e, n);
					}
				});
				return t.buttons[e] = o, i.addListener("selectionchange", function(t, r, a) {
					o.setDisabled(-1 == i.queryCommandState(e)), o.setChecked(i.queryCommandValue(e) == n && !a);
				}), o;
			};
		}(i);
	}(c, d[c]);
	for (var i, l = 0; i = ["backcolor", "forecolor"][l++];) t[i] = function(e) {
		return function(n) {
			var i = new t.ColorButton({
				className: "edui-for-" + e,
				color: "default",
				storekey: e,
				title: n.options.labelMap[e] || n.getLang("labelMap." + e) || "",
				editor: n,
				onpickcolor: function(t, i) {
					n.execCommand(e, i);
				},
				onpicknocolor: function() {
					n.execCommand(e, "default"), this.setColor("transparent"), this.color = "default";
				},
				onbuttonclick: function() {
					n.execCommand(e, this.color);
				}
			});
			return t.buttons[e] = i, n.addListener("selectionchange", function() {
				i.setDisabled(-1 == n.queryCommandState(e));
			}), i;
		};
	}(i);
	var u = {
		noOk: [],
		ok: ["edittable", "edittd"]
	};
	for (var c in u)!
	function(n, i) {
		for (var r, a = 0; r = i[a++];) s.opera && "searchreplace" === r || !
		function(i) {
			t[i] = function(r, a, s) {
				a = a || (r.options.iframeUrlMap || {})[i] || o[i], s = r.options.labelMap[i] || r.getLang("labelMap." + i) || "";
				var l;
				a && (l = new t.Dialog(e.extend({
					iframeUrl: r.ui.mapUrl(a),
					editor: r,
					className: "edui-for-" + i,
					title: s,
					holdScroll: "insertimage" === i,
					closeDialog: r.getLang("closeDialog")
				}, "ok" == n ? {
					buttons: [{
						className: "edui-okbutton",
						label: r.getLang("ok"),
						editor: r,
						onclick: function() {
							l.close(!0);
						}
					}, {
						className: "edui-cancelbutton",
						label: r.getLang("cancel"),
						editor: r,
						onclick: function() {
							l.close(!1);
						}
					}]
				} : {})), r.ui._dialogs[i + "Dialog"] = l);
				var d = new t.Button({
					className: "edui-for-" + i,
					title: s,
					onclick: function() {
						if (l) switch (i) {
						case "wordimage":
							r.execCommand("wordimage", "word_img"), r.word_img && (l.render(), l.open());
							break;

						case "scrawl":
							-1 != r.queryCommandState("scrawl") && (l.render(), l.open());
							break;

						default:
							l.render(), l.open();
						}
					},
					theme: r.options.theme,
					disabled: "scrawl" == i && -1 == r.queryCommandState("scrawl")
				});
				return t.buttons[i] = d, r.addListener("selectionchange", function() {
					var e = {
						edittable: 1
					};
					if (!(i in e)) {
						var t = r.queryCommandState(i);
						d.getDom() && (d.setDisabled(-1 == t), d.setChecked(t));
					}
				}), d;
			};
		}(r.toLowerCase());
	}(c, u[c]);
	t.fontfamily = function(n, i, o) {
		if (i = n.options.fontfamily || [], o = n.options.labelMap.fontfamily || n.getLang("labelMap.fontfamily") || "", i.length) {
			for (var r, a = 0, s = []; r = i[a]; a++) {
				var l = n.getLang("fontfamily")[r.name] || "";
				!
				function(t, i) {
					s.push({
						label: t,
						value: i,
						theme: n.options.theme,
						renderLabelHtml: function() {
							return '<div class="edui-label %%-label" style="font-family:' + e.unhtml(this.value) + '">' + (this.label || "") + "</div>";
						}
					});
				}(r.label || l, r.val);
			}
			var d = new t.Combox({
				editor: n,
				items: s,
				onselect: function(e, t) {
					n.execCommand("FontFamily", this.items[t].value);
				},
				onbuttonclick: function() {
					this.showPopup();
				},
				title: o,
				initValue: o,
				className: "edui-for-fontfamily",
				indexByValue: function(e) {
					if (e) for (var t, n = 0; t = this.items[n]; n++) if (-1 != t.value.indexOf(e)) return n;
					return -1;
				}
			});
			return t.buttons.fontfamily = d, n.addListener("selectionchange", function(e, t, i) {
				if (!i) {
					var o = n.queryCommandState("FontFamily");
					if (-1 == o) d.setDisabled(!0);
					else {
						d.setDisabled(!1);
						var r = n.queryCommandValue("FontFamily");
						r && (r = r.replace(/['"]/g, "").split(",")[0]), d.setValue(r);
					}
				}
			}), d;
		}
	}, t.fontsize = function(e, n, i) {
		if (i = e.options.labelMap.fontsize || e.getLang("labelMap.fontsize") || "", n = n || e.options.fontsize || [], n.length) {
			for (var o = [], r = 0; r < n.length; r++) {
				var a = n[r] + "px";
				o.push({
					label: a,
					value: a,
					theme: e.options.theme,
					renderLabelHtml: function() {
						return '<div class="edui-label %%-label" style="line-height:1;font-size:' + this.value + '">' + (this.label || "") + "</div>";
					}
				});
			}
			var l = {
				"10px": 9,
				"11px": 11,
				"12px": 13,
				"14px": 15,
				"15px": 17,
				"16px": 19,
				"18px": 21,
				"20px": 23,
				"24px": 25,
				"36px": 27,
				other: 29
			},
				d = new t.Combox({
					editor: e,
					items: o,
					title: i,
					useInput: s.ie && s.version < 9 ? !1 : !0,
					initValue: i,
					onselect: function(t, n) {
						var i = this.items[n].value;
						this.value != i && (this.editor.fireEvent("reportAddNum", 65080, 8, 1), this.editor.fireEvent("reportAddNum", 65080, l[i], 1), e.execCommand("FontSize", i));
					},
					onbuttonclick: function() {
						this.showPopup();
					},
					oninputclick: function() {
						var e = this;
						setTimeout(function() {
							{
								var t = e.getDom("wx_input"),
									n = (parseInt(this.value), t.value);
								parseInt(n);
							}
							s.ie ? (t.value = "", t.focus()) : (t.focus(), t.select());
						}, 100);
					},
					oninputblur: function() {
						var t = this,
							n = t.getDom("wx_input"),
							i = n.value,
							o = parseInt(i),
							r = parseInt(this.value);
						if ("" == i) return n.value = r + "px", !1;
						if (10 > o && (o = 10), o > 50 && (o = 50), r == o) return !1;
						var a, s = this.indexByValue(o + "px");
						a = -1 == s ? l.other : l[o + "px"], this.editor.fireEvent("reportAddNum", 65080, 8, 1), this.editor.fireEvent("reportAddNum", 65080, a, 1), e.execCommand("FontSize", o + "px");
					},
					oninputkeydown: function(e, t) {
						var n = this,
							i = t.keyCode || t.which,
							o = n.getDom("wx_input");
						13 == i && (o.blur(), t.stopPropagation ? (t.stopPropagation(), t.preventDefault()) : t.cancelBubble = !0);
					},
					className: "edui-for-fontsize"
				});
			return t.buttons.fontsize = d, e.addListener("selectionchange", function(t, n, i) {
				if (!i) {
					var o = e.queryCommandState("FontSize"); - 1 == o ? d.setDisabled(!0) : (d.setDisabled(!1), d.setValue(e.queryCommandValue("FontSize")));
				}
			}), d;
		}
	}, t.paragraph = function(n, i, o) {
		if (o = n.options.labelMap.paragraph || n.getLang("labelMap.paragraph") || "", i = n.options.paragraph || [], !e.isEmptyObject(i)) {
			var r = [];
			for (var a in i) r.push({
				value: a,
				label: i[a] || n.getLang("paragraph")[a],
				theme: n.options.theme,
				renderLabelHtml: function() {
					return '<div class="edui-label %%-label"><span class="edui-for-' + this.value + '">' + (this.label || "") + "</span></div>";
				}
			});
			var s = new t.Combox({
				editor: n,
				items: r,
				title: o,
				initValue: o,
				className: "edui-for-paragraph",
				onselect: function(e, t) {
					n.execCommand("Paragraph", this.items[t].value);
				},
				onbuttonclick: function() {
					this.showPopup();
				}
			});
			return t.buttons.paragraph = s, n.addListener("selectionchange", function(e, t, i) {
				if (!i) {
					var o = n.queryCommandState("Paragraph");
					if (-1 == o) s.setDisabled(!0);
					else {
						s.setDisabled(!1);
						var r = n.queryCommandValue("Paragraph"),
							a = s.indexByValue(r);
						s.setValue(-1 != a ? r : s.initValue);
					}
				}
			}), s;
		}
	}, t.customstyle = function(e) {
		var n = e.options.customstyle || [],
			i = e.options.labelMap.customstyle || e.getLang("labelMap.customstyle") || "";
		if (n.length) {
			for (var o, r = e.getLang("customstyle"), a = 0, s = []; o = n[a++];)!
			function(t) {
				var n = {};
				n.label = t.label ? t.label : r[t.name], n.style = t.style, n.className = t.className, n.tag = t.tag, s.push({
					label: n.label,
					value: n,
					theme: e.options.theme,
					renderLabelHtml: function() {
						return '<div class="edui-label %%-label"><' + n.tag + " " + (n.className ? ' class="' + n.className + '"' : "") + (n.style ? ' style="' + n.style + '"' : "") + ">" + n.label + "</" + n.tag + "></div>";
					}
				});
			}(o);
			var l = new t.Combox({
				editor: e,
				items: s,
				title: i,
				initValue: i,
				className: "edui-for-customstyle",
				onselect: function(t, n) {
					e.execCommand("customstyle", this.items[n].value);
				},
				onbuttonclick: function() {
					this.showPopup();
				},
				indexByValue: function(e) {
					for (var t, n = 0; t = this.items[n++];) if (t.label == e) return n - 1;
					return -1;
				}
			});
			return t.buttons.customstyle = l, e.addListener("selectionchange", function(t, n, i) {
				if (!i) {
					var o = e.queryCommandState("customstyle");
					if (-1 == o) l.setDisabled(!0);
					else {
						l.setDisabled(!1);
						var r = e.queryCommandValue("customstyle"),
							a = l.indexByValue(r);
						l.setValue(-1 != a ? r : l.initValue);
					}
				}
			}), l;
		}
	}, t.inserttable = function(e, n, i) {
		i = e.options.labelMap.inserttable || e.getLang("labelMap.inserttable") || "";
		var o = new t.TableButton({
			editor: e,
			title: i,
			className: "edui-for-inserttable",
			onpicktable: function(t, n, i) {
				e.execCommand("InsertTable", {
					numRows: i,
					numCols: n,
					border: 1
				});
			},
			onbuttonclick: function() {
				this.showPopup();
			}
		});
		return t.buttons.inserttable = o, e.addListener("selectionchange", function() {
			o.setDisabled(-1 == e.queryCommandState("inserttable"));
		}), o;
	}, t.lineheight = function(e) {
		var n = e.options.lineheight || [];
		if (n.length) {
			for (var i, o = 0, r = []; i = n[o++];) r.push({
				label: i,
				value: i,
				theme: e.options.theme,
				onclick: function() {
					e.execCommand("lineheight", this.value);
				}
			});
			var a = new t.MenuButton({
				editor: e,
				className: "edui-for-lineheight",
				title: e.options.labelMap.lineheight || e.getLang("labelMap.lineheight") || "",
				items: r,
				onbuttonclick: function() {
					var t = e.queryCommandValue("LineHeight") || this.value;
					e.execCommand("LineHeight", t);
				}
			});
			return t.buttons.lineheight = a, e.addListener("selectionchange", function() {
				var t = e.queryCommandState("LineHeight");
				if (-1 == t) a.setDisabled(!0);
				else {
					a.setDisabled(!1);
					var n = e.queryCommandValue("LineHeight");
					n && a.setValue((n + "").replace(/cm/, "")), a.setChecked(t);
				}
			}), a;
		}
	};
	for (var f, m = ["top", "bottom"], h = 0; f = m[h++];)!
	function(e) {
		t["rowspacing" + e] = function(n) {
			var i = n.options["rowspacing" + e] || [];
			if (!i.length) return null;
			for (var o, r = 0, a = []; o = i[r++];) a.push({
				label: o,
				value: o,
				theme: n.options.theme,
				onclick: function() {
					n.execCommand("rowspacing", this.value, e);
				}
			});
			var s = new t.MenuButton({
				editor: n,
				className: "edui-for-rowspacing" + e,
				title: n.options.labelMap["rowspacing" + e] || n.getLang("labelMap.rowspacing" + e) || "",
				items: a,
				onbuttonclick: function() {
					var t = n.queryCommandValue("rowspacing", e) || this.value;
					n.execCommand("rowspacing", t, e);
				}
			});
			return t.buttons[e] = s, n.addListener("selectionchange", function() {
				var t = n.queryCommandState("rowspacing", e);
				if (-1 == t) s.setDisabled(!0);
				else {
					s.setDisabled(!1);
					var i = n.queryCommandValue("rowspacing", e);
					i && s.setValue((i + "").replace(/%/, "")), s.setChecked(t);
				}
			}), s;
		};
	}(f);
	for (var p, g = ["insertorderedlist", "insertunorderedlist"], v = 0; p = g[v++];)!
	function(e) {
		t[e] = function(n) {
			var i = n.options[e],
				o = function() {
					n.execCommand(e, this.value);
				},
				r = [];
			for (var a in i) r.push({
				label: i[a] || n.getLang()[e][a] || "",
				value: a,
				theme: n.options.theme,
				onclick: o
			});
			var s = new t.MenuButton({
				editor: n,
				className: "edui-for-" + e,
				title: n.getLang("labelMap." + e) || "",
				items: r,
				onbuttonclick: function() {
					var t = n.queryCommandValue(e) || this.value;
					n.execCommand(e, t);
				}
			});
			return t.buttons[e] = s, n.addListener("selectionchange", function() {
				var t = n.queryCommandState(e);
				if (-1 == t) s.setDisabled(!0);
				else {
					s.setDisabled(!1);
					var i = n.queryCommandValue(e);
					s.setValue(i), s.setChecked(t);
				}
			}), s;
		};
	}(p);
}(), function() {
	function t(e) {
		this.initOptions(e), this.initEditorUI();
	}
	var i = r.editor.utils,
		o = r.editor.ui.uiUtils,
		a = r.editor.ui.UIBase,
		l = r.editor.dom.domUtils,
		d = [],
		c = e("tpl/mpEditor/layout.html.js");
	c = template.compile(c), t.prototype = {
		uiName: "editor",
		initEditorUI: function() {
			function e(e, t) {
				e.setOpt({
					wordCount: !0,
					maximumWords: 1e4,
					wordCountMsg: e.options.wordCountMsg || e.getLang("wordCountMsg"),
					wordOverFlowMsg: e.options.wordOverFlowMsg || e.getLang("wordOverFlowMsg")
				});
				var n = e.options,
					i = n.maximumWords,
					o = n.wordCountMsg,
					r = n.wordOverFlowMsg,
					a = t.getDom("wordcount");
				if (n.wordCount) {
					var s = e.getContentLength(!0);
					s > i ? (a.innerHTML = r, e.fireEvent("wordcountoverflow")) : a.innerHTML = o.replace("{#leave}", i - s).replace("{#count}", s);
				}
			}
			this.editor.ui = this, this._dialogs = {}, this.initUIBase(), this._initToolbars();
			var t = this.editor,
				i = this;
			t.addListener("ready", function() {
				function n() {
					e(t, i), l.un(t.document, "click", n);
				}
				t.getDialog = function(e) {
					return t.ui._dialogs[e + "Dialog"];
				}, l.on(t.window, "scroll", function(e) {
					r.editor.ui.Popup.postHide(e);
				}), t.ui._actualFrameWidth = t.options.initialFrameWidth, t.options.elementPathEnabled && (t.ui.getDom("elementpath").innerHTML = '<div class="edui-editor-breadcrumb">' + t.getLang("elementPathTip") + ":</div>"), t.options.wordCount && (l.on(t.document, "click", n), t.ui.getDom("wordcount").innerHTML = t.getLang("wordCountTip")), t.ui._scale(), t.options.scaleEnabled ? (t.autoHeightEnabled && t.disableAutoHeight(), i.enableScale()) : i.disableScale(), t.options.elementPathEnabled || t.options.wordCount || t.options.scaleEnabled || (t.ui.getDom("elementpath").style.display = "none", t.ui.getDom("wordcount").style.display = "none", t.ui.getDom("scale").style.display = "none"), t.selection.isFocus() && t.fireEvent("selectionchange", !1, !0);
			}), t.addListener("mousedown", function(e, t) {
				var n = t.target || t.srcElement;
				r.editor.ui.Popup.postHide(t, n), r.editor.ui.ShortCutMenu.postHide(t);
			}), t.addListener("delcells", function() {
				UE.ui.edittip && new UE.ui.edittip(t), t.getDialog("edittip").open();
			});
			var o, a, s = !1;
			t.addListener("afterpaste", function() {
				t.queryCommandState("pasteplain") || (r.editor.ui.PastePicker && (o = new r.editor.ui.Popup({
					content: new r.editor.ui.PastePicker({
						editor: t
					}),
					editor: t,
					className: "edui-wordpastepop"
				}), o.render()), s = !0);
			}), t.addListener("afterinserthtml", function() {
				clearTimeout(a), a = setTimeout(function() {
					if (o && (s || t.ui._isTransfer)) {
						if (o.isHidden()) {
							var e = l.createElement(t.document, "span", {
								style: "line-height:0px;",
								innerHTML: "﻿"
							}),
								i = t.selection.getRange();
							i.insertNode(e);
							var r = n(e, "firstChild", "previousSibling");
							r && o.showAnchor(3 == r.nodeType ? r.parentNode : r), l.remove(e);
						} else o.show();
						delete t.ui._isTransfer, s = !1;
					}
				}, 200);
			}), t.addListener("contextmenu", function(e, t) {
				r.editor.ui.Popup.postHide(t);
			}), t.addListener("keydown", function(e, t) {
				o && o.dispose(t);
				var n = t.keyCode || t.which;
				t.altKey && 90 == n && UE.ui.buttons.fullscreen.onclick();
			}), t.addListener("wordcount", function() {
				e(this, i);
			}), t.addListener("selectionchange", function() {
				t.options.elementPathEnabled && i[(-1 == t.queryCommandState("elementpath") ? "dis" : "en") + "ableElementPath"](), t.options.scaleEnabled && i[(-1 == t.queryCommandState("scale") ? "dis" : "en") + "ableScale"]();
			});
		},
		_initToolbars: function() {
			for (var e = this.editor, t = this.toolbars || [], n = [], i = ["edui-toolbar-primary", "edui-toobar-secondary"], o = 0; o < t.length; o++) {
				for (var a = t[o], s = new r.editor.ui.Toolbar({
					theme: e.options.theme,
					className: i[o],
					id: "js_toolbar_" + o
				}), l = 0; l < a.length; l++) {
					var d = a[l],
						c = null;
					"string" == typeof d ? (d = d.toLowerCase(), "|" == d && (d = "Separator"), "||" == d && (d = "Breakline"), r.editor.ui[d] && (c = new r.editor.ui[d](e))) : c = d, c && c.id && s.add(c);
				}
				n[o] = s;
			}
			this.toolbars = n;
		},
		getHtmlTpl: function() {
			return c({
				is_illegal: 1 * this.is_illegal || 0,
				length: this.toolbars.length,
				toolbarBoxHtml: this.renderToolbarBoxHtml(),
				clickToUpload: this.editor.getLang("clickToUpload")
			});
		},
		showWordImageDialog: function() {
			this.editor.execCommand("wordimage", "word_img"), this._dialogs.wordimageDialog.open();
		},
		renderToolbarBoxHtml: function() {
			for (var e = [], t = 0; t < this.toolbars.length; t++) e.push(this.toolbars[t].renderHtml());
			return e.join("");
		},
		setFullScreen: function(e) {
			var t = this.editor,
				n = t.container.parentNode.parentNode;
			if (this._fullscreen != e) {
				if (this._fullscreen = e, this.editor.fireEvent("beforefullscreenchange", e), r.editor.browser.gecko) var i = t.selection.getRange().createBookmark();
				if (e) {
					for (;
					"BODY" != n.tagName;) {
						var o = r.editor.dom.domUtils.getComputedStyle(n, "position");
						d.push(o), n.style.position = "static", n = n.parentNode;
					}
					this._bakHtmlOverflow = document.documentElement.style.overflow, this._bakBodyOverflow = document.body.style.overflow, this._bakAutoHeight = this.editor.autoHeightEnabled, this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop), this._bakEditorContaninerWidth = t.iframe.parentNode.offsetWidth, this._bakAutoHeight && (t.autoHeightEnabled = !1, this.editor.disableAutoHeight()), document.documentElement.style.overflow = "hidden", document.body.style.overflow = "hidden", this._bakCssText = this.getDom().style.cssText, this._bakCssText1 = this.getDom("iframeholder").style.cssText, t.iframe.parentNode.style.width = "", this._updateFullScreen();
				} else {
					for (;
					"BODY" != n.tagName;) n.style.position = d.shift(), n = n.parentNode;
					this.getDom().style.cssText = this._bakCssText, this.getDom("iframeholder").style.cssText = this._bakCssText1, this._bakAutoHeight && (t.autoHeightEnabled = !0, this.editor.enableAutoHeight()), document.documentElement.style.overflow = this._bakHtmlOverflow, document.body.style.overflow = this._bakBodyOverflow, t.iframe.parentNode.style.width = this._bakEditorContaninerWidth + "px", window.scrollTo(0, this._bakScrollTop);
				}
				if (s.gecko && "true" === t.body.contentEditable) {
					var a = document.createElement("input");
					document.body.appendChild(a), t.body.contentEditable = !1, setTimeout(function() {
						a.focus(), setTimeout(function() {
							t.body.contentEditable = !0, t.fireEvent("fullscreenchanged", e), t.selection.getRange().moveToBookmark(i).select(!0), r.editor.dom.domUtils.remove(a), e && window.scroll(0, 0);
						}, 0);
					}, 0);
				}
				"true" === t.body.contentEditable && (this.editor.fireEvent("fullscreenchanged", e), this.triggerLayout());
			}
		},
		_updateFullScreen: function() {
			if (this._fullscreen) {
				var e = o.getViewportRect();
				if (this.getDom().style.cssText = "border:0;position:absolute;left:0;top:" + (this.editor.options.topOffset || 0) + "px;width:" + e.width + "px;height:" + e.height + "px;z-index:" + (1 * this.getDom().style.zIndex + 100), o.setViewportOffset(this.getDom(), {
					left: 0,
					top: this.editor.options.topOffset || 0
				}), this.editor.setHeight(e.height - this.getDom("toolbarbox").offsetHeight - this.getDom("bottombar").offsetHeight - (this.editor.options.topOffset || 0)), s.gecko) try {
					window.onresize();
				} catch (t) {}
			}
		},
		_updateElementPath: function() {
			var e, t = this.getDom("elementpath");
			if (this.elementPathEnabled && (e = this.editor.queryCommandValue("elementpath"))) {
				for (var n, i = [], o = 0; n = e[o]; o++) i[o] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + o + '&quot;);">' + n + "</span>");
				t.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' + this.editor.getLang("elementPathTip") + ": " + i.join(" &gt; ") + "</div>";
			} else t.style.display = "none";
		},
		disableElementPath: function() {
			var e = this.getDom("elementpath");
			e.innerHTML = "", e.style.display = "none", this.elementPathEnabled = !1;
		},
		enableElementPath: function() {
			var e = this.getDom("elementpath");
			e.style.display = "", this.elementPathEnabled = !0, this._updateElementPath();
		},
		_scale: function() {
			function e() {
				p = l.getXY(a), g || (g = r.options.minFrameHeight + c.offsetHeight + u.offsetHeight), m.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" + a.offsetWidth + "px;height:" + a.offsetHeight + "px;z-index:" + (r.options.zIndex + 1), l.on(o, "mousemove", t), l.on(d, "mouseup", n), l.on(o, "mouseup", n);
			}

			function t(e) {
				i();
				var t = e || window.event;
				b = t.pageX || o.documentElement.scrollLeft + t.clientX, y = t.pageY || o.documentElement.scrollTop + t.clientY, C = b - p.x, N = y - p.y, C >= v && (h = !0, m.style.width = C + "px"), N >= g && (h = !0, m.style.height = N + "px");
			}

			function n() {
				h && (h = !1, r.ui._actualFrameWidth = m.offsetWidth - 2, a.style.width = r.ui._actualFrameWidth + "px", r.setHeight(m.offsetHeight - u.offsetHeight - c.offsetHeight - 2)), m && (m.style.display = "none"), i(), l.un(o, "mousemove", t), l.un(d, "mouseup", n), l.un(o, "mouseup", n);
			}

			function i() {
				s.ie ? o.selection.clear() : window.getSelection().removeAllRanges();
			}
			var o = document,
				r = this.editor,
				a = r.container,
				d = r.document,
				c = this.getDom("toolbarbox"),
				u = this.getDom("bottombar"),
				f = this.getDom("scale"),
				m = this.getDom("scalelayer"),
				h = !1,
				p = null,
				g = 0,
				v = r.options.minFrameWidth,
				b = 0,
				y = 0,
				C = 0,
				N = 0;
			this.enableScale = function() {
				1 != r.queryCommandState("source") && (f.style.display = "", this.scaleEnabled = !0, l.on(f, "mousedown", e));
			}, this.disableScale = function() {
				f.style.display = "none", this.scaleEnabled = !1, l.un(f, "mousedown", e);
			};
		},
		isFullScreen: function() {
			return this._fullscreen;
		},
		postRender: function() {
			a.prototype.postRender.call(this);
			for (var e = 0; e < this.toolbars.length; e++) this.toolbars[e].postRender();
			var t, n = this,
				i = r.editor.dom.domUtils,
				o = function() {
					clearTimeout(t), t = setTimeout(function() {
						n._updateFullScreen();
					});
				};
			i.on(window, "resize", o), n.addListener("destroy", function() {
				i.un(window, "resize", o), clearTimeout(t);
			});
		},
		showToolbarMsg: function(e, t) {
			if (this.getDom("toolbarmsg_label").innerHTML = e, this.getDom("toolbarmsg").style.display = "", !t) {
				var n = this.getDom("upload_dialog");
				n.style.display = "none";
			}
		},
		hideToolbarMsg: function() {
			this.getDom("toolbarmsg").style.display = "none";
		},
		mapUrl: function(e) {
			return e ? e.replace("~/", this.editor.options.UEDITOR_HOME_URL || "") : "";
		},
		triggerLayout: function() {
			var e = this.getDom();
			e.style.zoom = "1" == e.style.zoom ? "100%" : "1";
		}
	}, i.inherits(t, r.editor.ui.UIBase);
	var u = {};
	UE.ui.Editor = function(e) {
		var n = new UE.Editor(e);
		n.options.editor = n;
		var o = n.render;
		return n.render = function(e) {
			e.constructor === String && (n.key = e, u[e] = n), i.domReady(function() {
				function i() {
					if (n.setOpt({
						labelMap: n.options.labelMap || n.getLang("labelMap")
					}), new t(n.options), e && (e.constructor === String && (e = document.getElementById(e)), e && e.getAttribute("name") && (n.options.textarea = e.getAttribute("name")), e && /script|textarea/gi.test(e.tagName))) {
						var i = document.createElement("div");
						e.parentNode.insertBefore(i, e);
						var r = e.value || e.innerHTML;
						n.options.initialContent = /^[\t\r\n ]*$/.test(r) ? n.options.initialContent : r.replace(/>[\n\r\t]+([ ]{4})+/g, ">").replace(/[\n\r\t]+([ ]{4})+</g, "<").replace(/>[\n\r\t]+</g, "><"), e.className && (i.className = e.className), e.style.cssText && (i.style.cssText = e.style.cssText), /textarea/i.test(e.tagName) ? (n.textarea = e, n.textarea.style.display = "none") : (e.parentNode.removeChild(e), e.id && (i.id = e.id)), e = i, e.innerHTML = "";
					}
					l.addClass(e, "edui-" + n.options.theme), n.ui.render(e);
					n.options;
					n.container = n.ui.getDom(), n.container.style.cssText = "z-index:" + n.options.zIndex + ";width:" + n.options.initialFrameWidth + "px", o.call(n, n.ui.getDom("iframeholder"));
				}
				n.langIsReady ? i() : n.addListener("langReady", i);
			});
		}, n;
	}, UE.getEditor = function(e, t) {
		var n = u[e];
		return n || (n = u[e] = new UE.ui.Editor(t), n.render(e)), n;
	}, UE.delEditor = function(e) {
		var t;
		(t = u[e]) && (t.key && t.destroy(), delete u[e]);
	};
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.Popup,
		n = r.editor.ui.SplitButton,
		i = r.editor.ui.MultiMenuPop = function(e) {
			this.initOptions(e), this.initMultiMenu();
		};
	i.prototype = {
		initMultiMenu: function() {
			var e = this;
			this.popup = new t({
				content: "",
				editor: e.editor,
				iframe_rendered: !1,
				onshow: function() {
					this.iframe_rendered || (this.iframe_rendered = !0, this.getDom("content").innerHTML = '<iframe id="' + e.id + '_iframe" src="' + e.iframeUrl + '" frameborder="0"></iframe>', e.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * e.editor.container.style.zIndex + 1));
				}
			}), this.onbuttonclick = function() {
				this.showPopup();
			}, this.initSplitButton();
		}
	}, e.inherits(i, n);
}(), function() {
	function e(e) {
		var t = e.target || e.srcElement,
			n = l.findParent(t, function(e) {
				return l.hasClass(e, "edui-shortcutmenu") || l.hasClass(e, "edui-popup");
			}, !0);
		if (!n) for (var i, o = 0; i = d[o++];) i.hide();
	}
	var t, n = r.editor.ui,
		i = n.UIBase,
		o = n.uiUtils,
		a = r.editor.utils,
		l = r.editor.dom.domUtils,
		d = [],
		c = !1,
		u = n.ShortCutMenu = function(e) {
			this.initOptions(e), this.initShortCutMenu();
		};
	u.postHide = e, u.prototype = {
		isHidden: !0,
		SPACE: 5,
		initShortCutMenu: function() {
			this.items = this.items || [], this.initUIBase(), this.initItems(), this.initEvent(), d.push(this);
		},
		initEvent: function() {
			var e = this,
				n = e.editor.document;
			l.on(n, "mousemove", function(n) {
				if (e.isHidden === !1) {
					if (e.getSubMenuMark() || "contextmenu" == e.eventType) return;
					var i = !0,
						o = e.getDom(),
						r = o.offsetWidth,
						a = o.offsetHeight,
						s = r / 2 + e.SPACE,
						l = a / 2,
						d = Math.abs(n.screenX - e.left),
						c = Math.abs(n.screenY - e.top);
					clearTimeout(t), t = setTimeout(function() {
						c > 0 && l > c ? e.setOpacity(o, "1") : c > l && l + 70 > c ? (e.setOpacity(o, "0.5"), i = !1) : c > l + 70 && l + 140 > c && e.hide(), i && d > 0 && s > d ? e.setOpacity(o, "1") : d > s && s + 70 > d ? e.setOpacity(o, "0.5") : d > s + 70 && s + 140 > d && e.hide();
					});
				}
			}), s.chrome && l.on(n, "mouseout", function(t) {
				var n = t.relatedTarget || t.toElement;
				(null == n || "HTML" == n.tagName) && e.hide();
			}), e.editor.addListener("afterhidepop", function() {
				e.isHidden || (c = !0);
			});
		},
		initItems: function() {
			if (a.isArray(this.items)) for (var e = 0, t = this.items.length; t > e; e++) {
				var i = this.items[e].toLowerCase();
				n[i] && (this.items[e] = new n[i](this.editor), this.items[e].className += " edui-shortcutsubmenu ");
			}
		},
		setOpacity: function(e, t) {
			s.ie && s.version < 9 ? e.style.filter = "alpha(opacity = " + 100 * parseFloat(t) + ");" : e.style.opacity = t;
		},
		getSubMenuMark: function() {
			c = !1;
			for (var e, t = o.getFixedLayer(), n = l.getElementsByTagName(t, "div", function(e) {
				return l.hasClass(e, "edui-shortcutsubmenu edui-popup");
			}), i = 0; e = n[i++];)"none" != e.style.display && (c = !0);
			return c;
		},
		show: function(e, t) {
			function n(e) {
				e.left < 0 && (e.left = 0), e.top < 0 && (e.top = 0), s.style.cssText = "position:absolute;left:" + e.left + "px;top:" + e.top + "px;";
			}

			function i(e) {
				e.tagName || (e = e.getDom()), a.left = parseInt(e.style.left), a.top = parseInt(e.style.top), a.top -= s.offsetHeight + 15, n(a);
			}
			var r = this,
				a = {},
				s = this.getDom(),
				d = o.getFixedLayer();
			if (r.eventType = e.type, s.style.cssText = "display:block;left:-9999px", "contextmenu" == e.type && t) {
				var c = l.getElementsByTagName(d, "div", "edui-contextmenu")[0];
				c ? i(c) : r.editor.addListener("aftershowcontextmenu", function(e, t) {
					i(t);
				});
			} else a = o.getViewportOffsetByEvent(e), a.top -= s.offsetHeight + r.SPACE, a.left += r.SPACE + 20, n(a), r.setOpacity(s, .2);
			r.isHidden = !1, r.left = e.screenX + s.offsetWidth / 2 - r.SPACE, r.top = e.screenY - s.offsetHeight / 2 - r.SPACE, r.editor && (s.style.zIndex = 1 * r.editor.container.style.zIndex + 10, d.style.zIndex = s.style.zIndex - 1);
		},
		hide: function() {
			this.getDom() && (this.getDom().style.display = "none"), this.isHidden = !0;
		},
		postRender: function() {
			if (a.isArray(this.items)) for (var e, t = 0; e = this.items[t++];) e.postRender();
		},
		getHtmlTpl: function() {
			var e;
			if (a.isArray(this.items)) {
				e = [];
				for (var t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml();
				e = e.join("");
			} else e = this.items;
			return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' + e + "</div>";
		}
	}, a.inherits(u, i), l.on(document, "mousedown", function(t) {
		e(t);
	}), l.on(window, "scroll", function(t) {
		e(t);
	});
}(), function() {
	var e = r.editor.utils,
		t = r.editor.ui.UIBase,
		n = r.editor.ui.Breakline = function(e) {
			this.initOptions(e), this.initSeparator();
		};
	n.prototype = {
		uiName: "Breakline",
		initSeparator: function() {
			this.initUIBase();
		},
		getHtmlTpl: function() {
			return "<br/>";
		}
	}, e.inherits(n, t);
}();
});
