/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Re = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Fe = Symbol(), a1 = /* @__PURE__ */ new WeakMap();
class di {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== Fe)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Re && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = a1.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && a1.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Cs = (e) => new di(typeof e == "string" ? e : e + "", void 0, Fe), Ms = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, s, n) => r + ((l) => {
    if (l._$cssResult$ === !0)
      return l.cssText;
    if (typeof l == "number")
      return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[n + 1], e[0]);
  return new di(i, e, Fe);
}, ws = (e, t) => {
  Re ? e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet) : t.forEach((i) => {
    const r = document.createElement("style"), s = window.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = i.cssText, e.appendChild(r);
  });
}, h1 = Re ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules)
    i += r.cssText;
  return Cs(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ne;
const c1 = window.trustedTypes, Hs = c1 ? c1.emptyScript : "", d1 = window.reactiveElementPolyfillSupport, ze = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Hs : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, pi = (e, t) => t !== e && (t == t || e == e), le = { attribute: !0, type: String, converter: ze, reflect: !1, hasChanged: pi };
class J extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var i;
    (i = this.h) !== null && i !== void 0 || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, r) => {
      const s = this._$Ep(r, i);
      s !== void 0 && (this._$Ev.set(s, r), t.push(s));
    }), t;
  }
  static createProperty(t, i = le) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const r = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, r, i);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    return { get() {
      return this[i];
    }, set(s) {
      const n = this[t];
      this[i] = s, this.requestUpdate(t, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || le;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const i = this.properties, r = [...Object.getOwnPropertyNames(i), ...Object.getOwnPropertySymbols(i)];
      for (const s of r)
        this.createProperty(s, i[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r)
        i.unshift(h1(s));
    } else
      t !== void 0 && i.push(h1(t));
    return i;
  }
  static _$Ep(t, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((i) => i(this));
  }
  addController(t) {
    var i, r;
    ((i = this._$ES) !== null && i !== void 0 ? i : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) === null || r === void 0 || r.call(t));
  }
  removeController(t) {
    var i;
    (i = this._$ES) === null || i === void 0 || i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const i = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return ws(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
      var r;
      return (r = i.hostConnected) === null || r === void 0 ? void 0 : r.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
      var r;
      return (r = i.hostDisconnected) === null || r === void 0 ? void 0 : r.call(i);
    });
  }
  attributeChangedCallback(t, i, r) {
    this._$AK(t, r);
  }
  _$EO(t, i, r = le) {
    var s, n;
    const l = this.constructor._$Ep(t, r);
    if (l !== void 0 && r.reflect === !0) {
      const o = ((n = (s = r.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== null && n !== void 0 ? n : ze.toAttribute)(i, r.type);
      this._$El = t, o == null ? this.removeAttribute(l) : this.setAttribute(l, o), this._$El = null;
    }
  }
  _$AK(t, i) {
    var r, s;
    const n = this.constructor, l = n._$Ev.get(t);
    if (l !== void 0 && this._$El !== l) {
      const o = n.getPropertyOptions(l), a = o.converter, h = (s = (r = a == null ? void 0 : a.fromAttribute) !== null && r !== void 0 ? r : typeof a == "function" ? a : null) !== null && s !== void 0 ? s : ze.fromAttribute;
      this._$El = l, this[l] = h(i, o.type), this._$El = null;
    }
  }
  requestUpdate(t, i, r) {
    let s = !0;
    t !== void 0 && (((r = r || this.constructor.getPropertyOptions(t)).hasChanged || pi)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), r.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, r))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, n) => this[n] = s), this._$Ei = void 0);
    let i = !1;
    const r = this._$AL;
    try {
      i = this.shouldUpdate(r), i ? (this.willUpdate(r), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var n;
        return (n = s.hostUpdate) === null || n === void 0 ? void 0 : n.call(s);
      }), this.update(r)) : this._$Ek();
    } catch (s) {
      throw i = !1, this._$Ek(), s;
    }
    i && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$ES) === null || i === void 0 || i.forEach((r) => {
      var s;
      return (s = r.hostUpdated) === null || s === void 0 ? void 0 : s.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((i, r) => this._$EO(r, this[r], i)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
J.finalized = !0, J.elementProperties = /* @__PURE__ */ new Map(), J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, d1 == null || d1({ ReactiveElement: J }), ((ne = globalThis.reactiveElementVersions) !== null && ne !== void 0 ? ne : globalThis.reactiveElementVersions = []).push("1.3.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var oe;
const K = globalThis.trustedTypes, p1 = K ? K.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, T = `lit$${(Math.random() + "").slice(9)}$`, ui = "?" + T, Ss = `<${ui}>`, Z = document, gt = (e = "") => Z.createComment(e), yt = (e) => e === null || typeof e != "object" && typeof e != "function", fi = Array.isArray, Ps = (e) => fi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", st = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, u1 = /-->/g, f1 = />/g, D = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), m1 = /'/g, _1 = /"/g, mi = /^(?:script|style|textarea|title)$/i, Vs = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), ae = Vs(1), Q = Symbol.for("lit-noChange"), y = Symbol.for("lit-nothing"), v1 = /* @__PURE__ */ new WeakMap(), Ls = (e, t, i) => {
  var r, s;
  const n = (r = i == null ? void 0 : i.renderBefore) !== null && r !== void 0 ? r : t;
  let l = n._$litPart$;
  if (l === void 0) {
    const o = (s = i == null ? void 0 : i.renderBefore) !== null && s !== void 0 ? s : null;
    n._$litPart$ = l = new Lt(t.insertBefore(gt(), o), o, void 0, i != null ? i : {});
  }
  return l._$AI(e), l;
}, X = Z.createTreeWalker(Z, 129, null, !1), Es = (e, t) => {
  const i = e.length - 1, r = [];
  let s, n = t === 2 ? "<svg>" : "", l = st;
  for (let a = 0; a < i; a++) {
    const h = e[a];
    let c, d, p = -1, f = 0;
    for (; f < h.length && (l.lastIndex = f, d = l.exec(h), d !== null); )
      f = l.lastIndex, l === st ? d[1] === "!--" ? l = u1 : d[1] !== void 0 ? l = f1 : d[2] !== void 0 ? (mi.test(d[2]) && (s = RegExp("</" + d[2], "g")), l = D) : d[3] !== void 0 && (l = D) : l === D ? d[0] === ">" ? (l = s != null ? s : st, p = -1) : d[1] === void 0 ? p = -2 : (p = l.lastIndex - d[2].length, c = d[1], l = d[3] === void 0 ? D : d[3] === '"' ? _1 : m1) : l === _1 || l === m1 ? l = D : l === u1 || l === f1 ? l = st : (l = D, s = void 0);
    const m = l === D && e[a + 1].startsWith("/>") ? " " : "";
    n += l === st ? h + Ss : p >= 0 ? (r.push(c), h.slice(0, p) + "$lit$" + h.slice(p) + T + m) : h + T + (p === -2 ? (r.push(void 0), a) : m);
  }
  const o = n + (e[i] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [p1 !== void 0 ? p1.createHTML(o) : o, r];
};
class zt {
  constructor({ strings: t, _$litType$: i }, r) {
    let s;
    this.parts = [];
    let n = 0, l = 0;
    const o = t.length - 1, a = this.parts, [h, c] = Es(t, i);
    if (this.el = zt.createElement(h, r), X.currentNode = this.el.content, i === 2) {
      const d = this.el.content, p = d.firstChild;
      p.remove(), d.append(...p.childNodes);
    }
    for (; (s = X.nextNode()) !== null && a.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const d = [];
          for (const p of s.getAttributeNames())
            if (p.endsWith("$lit$") || p.startsWith(T)) {
              const f = c[l++];
              if (d.push(p), f !== void 0) {
                const m = s.getAttribute(f.toLowerCase() + "$lit$").split(T), g = /([.?@])?(.*)/.exec(f);
                a.push({ type: 1, index: n, name: g[2], strings: m, ctor: g[1] === "." ? xs : g[1] === "?" ? Os : g[1] === "@" ? Ns : Kt });
              } else
                a.push({ type: 6, index: n });
            }
          for (const p of d)
            s.removeAttribute(p);
        }
        if (mi.test(s.tagName)) {
          const d = s.textContent.split(T), p = d.length - 1;
          if (p > 0) {
            s.textContent = K ? K.emptyScript : "";
            for (let f = 0; f < p; f++)
              s.append(d[f], gt()), X.nextNode(), a.push({ type: 2, index: ++n });
            s.append(d[p], gt());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === ui)
          a.push({ type: 2, index: n });
        else {
          let d = -1;
          for (; (d = s.data.indexOf(T, d + 1)) !== -1; )
            a.push({ type: 7, index: n }), d += T.length - 1;
        }
      n++;
    }
  }
  static createElement(t, i) {
    const r = Z.createElement("template");
    return r.innerHTML = t, r;
  }
}
function tt(e, t, i = e, r) {
  var s, n, l, o;
  if (t === Q)
    return t;
  let a = r !== void 0 ? (s = i._$Cl) === null || s === void 0 ? void 0 : s[r] : i._$Cu;
  const h = yt(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== h && ((n = a == null ? void 0 : a._$AO) === null || n === void 0 || n.call(a, !1), h === void 0 ? a = void 0 : (a = new h(e), a._$AT(e, i, r)), r !== void 0 ? ((l = (o = i)._$Cl) !== null && l !== void 0 ? l : o._$Cl = [])[r] = a : i._$Cu = a), a !== void 0 && (t = tt(e, a._$AS(e, t.values), a, r)), t;
}
class As {
  constructor(t, i) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var i;
    const { el: { content: r }, parts: s } = this._$AD, n = ((i = t == null ? void 0 : t.creationScope) !== null && i !== void 0 ? i : Z).importNode(r, !0);
    X.currentNode = n;
    let l = X.nextNode(), o = 0, a = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let c;
        h.type === 2 ? c = new Lt(l, l.nextSibling, this, t) : h.type === 1 ? c = new h.ctor(l, h.name, h.strings, this, t) : h.type === 6 && (c = new ks(l, this, t)), this.v.push(c), h = s[++a];
      }
      o !== (h == null ? void 0 : h.index) && (l = X.nextNode(), o++);
    }
    return n;
  }
  m(t) {
    let i = 0;
    for (const r of this.v)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class Lt {
  constructor(t, i, r, s) {
    var n;
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = s, this._$C_ = (n = s == null ? void 0 : s.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var t, i;
    return (i = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && i !== void 0 ? i : this._$C_;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = tt(this, t, i), yt(t) ? t === y || t == null || t === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : t !== this._$AH && t !== Q && this.T(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.k(t) : Ps(t) ? this.S(t) : this.T(t);
  }
  j(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.j(t));
  }
  T(t) {
    this._$AH !== y && yt(this._$AH) ? this._$AA.nextSibling.data = t : this.k(Z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var i;
    const { values: r, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = zt.createElement(s.h, this.options)), s);
    if (((i = this._$AH) === null || i === void 0 ? void 0 : i._$AD) === n)
      this._$AH.m(r);
    else {
      const l = new As(n, this), o = l.p(this.options);
      l.m(r), this.k(o), this._$AH = l;
    }
  }
  _$AC(t) {
    let i = v1.get(t.strings);
    return i === void 0 && v1.set(t.strings, i = new zt(t)), i;
  }
  S(t) {
    fi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, s = 0;
    for (const n of t)
      s === i.length ? i.push(r = new Lt(this.j(gt()), this.j(gt()), this, this.options)) : r = i[s], r._$AI(n), s++;
    s < i.length && (this._$AR(r && r._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, i); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$C_ = t, (i = this._$AP) === null || i === void 0 || i.call(this, t));
  }
}
class Kt {
  constructor(t, i, r, s, n) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = y;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, r, s) {
    const n = this.strings;
    let l = !1;
    if (n === void 0)
      t = tt(this, t, i, 0), l = !yt(t) || t !== this._$AH && t !== Q, l && (this._$AH = t);
    else {
      const o = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++)
        h = tt(this, o[r + a], i, a), h === Q && (h = this._$AH[a]), l || (l = !yt(h) || h !== this._$AH[a]), h === y ? t = y : t !== y && (t += (h != null ? h : "") + n[a + 1]), this._$AH[a] = h;
    }
    l && !s && this.P(t);
  }
  P(t) {
    t === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class xs extends Kt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === y ? void 0 : t;
  }
}
const Ts = K ? K.emptyScript : "";
class Os extends Kt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== y ? this.element.setAttribute(this.name, Ts) : this.element.removeAttribute(this.name);
  }
}
class Ns extends Kt {
  constructor(t, i, r, s, n) {
    super(t, i, r, s, n), this.type = 5;
  }
  _$AI(t, i = this) {
    var r;
    if ((t = (r = tt(this, t, i, 0)) !== null && r !== void 0 ? r : y) === Q)
      return;
    const s = this._$AH, n = t === y && s !== y || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, l = t !== y && (s === y || n);
    n && this.element.removeEventListener(this.name, this, s), l && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (i = this.options) === null || i === void 0 ? void 0 : i.host) !== null && r !== void 0 ? r : this.element, t) : this._$AH.handleEvent(t);
  }
}
class ks {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    tt(this, t);
  }
}
const g1 = window.litHtmlPolyfillSupport;
g1 == null || g1(zt, Lt), ((oe = globalThis.litHtmlVersions) !== null && oe !== void 0 ? oe : globalThis.litHtmlVersions = []).push("2.2.7");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var he, ce;
class dt extends J {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, i;
    const r = super.createRenderRoot();
    return (t = (i = this.renderOptions).renderBefore) !== null && t !== void 0 || (i.renderBefore = r.firstChild), r;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ls(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return Q;
  }
}
dt.finalized = !0, dt._$litElement$ = !0, (he = globalThis.litElementHydrateSupport) === null || he === void 0 || he.call(globalThis, { LitElement: dt });
const y1 = globalThis.litElementPolyfillSupport;
y1 == null || y1({ LitElement: dt });
((ce = globalThis.litElementVersions) !== null && ce !== void 0 ? ce : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Is = (e) => (t) => typeof t == "function" ? ((i, r) => (window.customElements.define(i, r), r))(e, t) : ((i, r) => {
  const { kind: s, elements: n } = r;
  return { kind: s, elements: n, finisher(l) {
    window.customElements.define(i, l);
  } };
})(e, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $s = (e, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(i) {
  i.createProperty(t.key, e);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(i) {
  i.createProperty(t.key, e);
} };
function Et(e) {
  return (t, i) => i !== void 0 ? ((r, s, n) => {
    s.constructor.createProperty(n, r);
  })(e, t, i) : $s(e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ds = ({ finisher: e, descriptor: t }) => (i, r) => {
  var s;
  if (r === void 0) {
    const n = (s = i.originalKey) !== null && s !== void 0 ? s : i.key, l = t != null ? { kind: "method", placement: "prototype", key: n, descriptor: t(i.key) } : { ...i, key: n };
    return e != null && (l.finisher = function(o) {
      e(o, n);
    }), l;
  }
  {
    const n = i.constructor;
    t !== void 0 && Object.defineProperty(i, r, t(r)), e == null || e(n, r);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Rs(e, t) {
  return Ds({ descriptor: (i) => {
    const r = { get() {
      var s, n;
      return (n = (s = this.renderRoot) === null || s === void 0 ? void 0 : s.querySelector(e)) !== null && n !== void 0 ? n : null;
    }, enumerable: !0, configurable: !0 };
    if (t) {
      const s = typeof i == "symbol" ? Symbol() : "__" + i;
      r.get = function() {
        var n, l;
        return this[s] === void 0 && (this[s] = (l = (n = this.renderRoot) === null || n === void 0 ? void 0 : n.querySelector(e)) !== null && l !== void 0 ? l : null), this[s];
      };
    }
    return r;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var de;
((de = window.HTMLSlotElement) === null || de === void 0 ? void 0 : de.prototype.assignedElements) != null;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Zt = !(window.ShadyDOM && window.ShadyDOM.inUse);
let Rt;
function z1(e) {
  e && e.shimcssproperties ? Rt = !1 : Rt = Zt || Boolean(
    !navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) && window.CSS && CSS.supports && CSS.supports("box-shadow", "0 0 0 var(--foo)")
  );
}
let bt;
window.ShadyCSS && window.ShadyCSS.cssBuild !== void 0 && (bt = window.ShadyCSS.cssBuild);
const _i = Boolean(
  window.ShadyCSS && window.ShadyCSS.disableRuntime
);
window.ShadyCSS && window.ShadyCSS.nativeCss !== void 0 ? Rt = window.ShadyCSS.nativeCss : window.ShadyCSS ? (z1(window.ShadyCSS), window.ShadyCSS = void 0) : z1(window.WebComponents && window.WebComponents.flags);
const Be = Rt;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class b1 {
  constructor() {
    this.start = 0, this.end = 0, this.previous = null, this.parent = null, this.rules = null, this.parsedCssText = "", this.cssText = "", this.atRule = !1, this.type = 0, this.keyframesName = "", this.selector = "", this.parsedSelector = "";
  }
}
function vi(e) {
  return e = Fs(e), gi(Bs(e), e);
}
function Fs(e) {
  return e.replace(E.comments, "").replace(E.port, "");
}
function Bs(e) {
  let t = new b1();
  t.start = 0, t.end = e.length;
  let i = t;
  for (let r = 0, s = e.length; r < s; r++)
    if (e[r] === zi) {
      i.rules || (i.rules = []);
      let n = i, l = n.rules[n.rules.length - 1] || null;
      i = new b1(), i.start = r + 1, i.parent = n, i.previous = l, n.rules.push(i);
    } else
      e[r] === bi && (i.end = r + 1, i = i.parent || t);
  return t;
}
function gi(e, t) {
  let i = t.substring(e.start, e.end - 1);
  if (e.parsedCssText = e.cssText = i.trim(), e.parent) {
    let s = e.previous ? e.previous.end : e.parent.start;
    i = t.substring(s, e.start - 1), i = Us(i), i = i.replace(E.multipleSpaces, " "), i = i.substring(i.lastIndexOf(";") + 1);
    let n = e.parsedSelector = e.selector = i.trim();
    e.atRule = n.indexOf(Gs) === 0, e.atRule ? n.indexOf(Xs) === 0 ? e.type = O.MEDIA_RULE : n.match(E.keyframesRule) && (e.type = O.KEYFRAMES_RULE, e.keyframesName = e.selector.split(E.multipleSpaces).pop()) : n.indexOf(Ci) === 0 ? e.type = O.MIXIN_RULE : e.type = O.STYLE_RULE;
  }
  let r = e.rules;
  if (r)
    for (let s = 0, n = r.length, l; s < n && (l = r[s]); s++)
      gi(l, t);
  return e;
}
function Us(e) {
  return e.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
    let t = arguments[1], i = 6 - t.length;
    for (; i--; )
      t = "0" + t;
    return "\\" + t;
  });
}
function yi(e, t, i = "") {
  let r = "";
  if (e.cssText || e.rules) {
    let s = e.rules;
    if (s && !js(s))
      for (let n = 0, l = s.length, o; n < l && (o = s[n]); n++)
        r = yi(o, t, r);
    else
      r = t ? e.cssText : qs(e.cssText), r = r.trim(), r && (r = "  " + r + `
`);
  }
  return r && (e.selector && (i += e.selector + " " + zi + `
`), i += r, e.selector && (i += bi + `

`)), i;
}
function js(e) {
  let t = e[0];
  return Boolean(t) && Boolean(t.selector) && t.selector.indexOf(Ci) === 0;
}
function qs(e) {
  return e = Ys(e), Js(e);
}
function Ys(e) {
  return e.replace(E.customProp, "").replace(E.mixinProp, "");
}
function Js(e) {
  return e.replace(E.mixinApply, "").replace(E.varApply, "");
}
const O = {
  STYLE_RULE: 1,
  KEYFRAMES_RULE: 7,
  MEDIA_RULE: 4,
  MIXIN_RULE: 1e3
}, zi = "{", bi = "}", E = {
  comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
  port: /@import[^;]*;/gim,
  customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
  mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
  mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
  varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
  keyframesRule: /^@[^\s]*keyframes/,
  multipleSpaces: /\s+/g
}, Ci = "--", Xs = "@media", Gs = "@";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const be = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi, Ft = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi, Ws = /@media\s(.*)/;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const C1 = /* @__PURE__ */ new Set(), Ks = "shady-unscoped";
function Zs(e) {
  const t = e.textContent;
  if (!C1.has(t)) {
    C1.add(t);
    const i = document.createElement("style");
    i.setAttribute("shady-unscoped", ""), i.textContent = t, document.head.appendChild(i);
  }
}
function Qs(e) {
  return e.hasAttribute(Ks);
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Ce(e, t) {
  return e ? (typeof e == "string" && (e = vi(e)), t && pt(e, t), yi(e, Be)) : "";
}
function M1(e) {
  return !e.__cssRules && e.textContent && (e.__cssRules = vi(e.textContent)), e.__cssRules || null;
}
function pt(e, t, i, r) {
  if (!e)
    return;
  let s = !1, n = e.type;
  if (r && n === O.MEDIA_RULE) {
    let o = e.selector.match(Ws);
    o && (window.matchMedia(o[1]).matches || (s = !0));
  }
  n === O.STYLE_RULE ? t(e) : i && n === O.KEYFRAMES_RULE ? i(e) : n === O.MIXIN_RULE && (s = !0);
  let l = e.rules;
  if (l && !s)
    for (let o = 0, a = l.length, h; o < a && (h = l[o]); o++)
      pt(h, t, i, r);
}
function t2(e, t) {
  let i = 0;
  for (let r = t, s = e.length; r < s; r++)
    if (e[r] === "(")
      i++;
    else if (e[r] === ")" && --i === 0)
      return r;
  return -1;
}
function Mi(e, t) {
  let i = e.indexOf("var(");
  if (i === -1)
    return t(e, "", "", "");
  let r = t2(e, i + 3), s = e.substring(i + 4, r), n = e.substring(0, i), l = Mi(e.substring(r + 1), t), o = s.indexOf(",");
  if (o === -1)
    return t(n, s.trim(), "", l);
  let a = s.substring(0, o).trim(), h = s.substring(o + 1).trim();
  return t(n, a, h, l);
}
window.ShadyDOM && window.ShadyDOM.wrap;
function e2(e) {
  let t = e.localName, i = "", r = "";
  return t ? t.indexOf("-") > -1 ? i = t : (r = t, i = e.getAttribute && e.getAttribute("is") || "") : (i = e.is, r = e.extends), { is: i, typeExtension: r };
}
function i2(e) {
  const t = [], i = e.querySelectorAll(
    "style"
  );
  for (let r = 0; r < i.length; r++) {
    const s = i[r];
    Qs(s) ? Zt || (Zs(s), s.parentNode.removeChild(s)) : (t.push(s.textContent), s.parentNode.removeChild(s));
  }
  return t.join("").trim();
}
const wi = "css-build";
function s2(e) {
  if (bt !== void 0)
    return bt;
  if (e.__cssBuild === void 0) {
    const t = e.getAttribute(wi);
    if (t)
      e.__cssBuild = t;
    else {
      const i = r2(e);
      i !== "" && n2(e), e.__cssBuild = i;
    }
  }
  return e.__cssBuild || "";
}
function w1(e) {
  return s2(e) !== "";
}
function r2(e) {
  const t = e.localName === "template" ? e.content.firstChild : e.firstChild;
  if (t instanceof Comment) {
    const i = t.textContent.trim().split(":");
    if (i[0] === wi)
      return i[1];
  }
  return "";
}
function n2(e) {
  const t = e.localName === "template" ? e.content.firstChild : e.firstChild;
  t.parentNode.removeChild(t);
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Me(e, t) {
  for (let i in t)
    i === null ? e.style.removeProperty(i) : e.style.setProperty(i, t[i]);
}
function Hi(e, t) {
  const i = window.getComputedStyle(e).getPropertyValue(t);
  return i ? i.trim() : "";
}
function l2(e) {
  const t = Ft.test(e) || be.test(e);
  return Ft.lastIndex = 0, be.lastIndex = 0, t;
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const o2 = /;\s*/m, a2 = /^\s*(initial)|(inherit)\s*$/, H1 = /\s*!important/, we = "_-_";
class h2 {
  constructor() {
    this._map = {};
  }
  set(t, i) {
    t = t.trim(), this._map[t] = {
      properties: i,
      dependants: {}
    };
  }
  get(t) {
    return t = t.trim(), this._map[t] || null;
  }
}
let Bt = null;
class M {
  constructor() {
    this._currentElement = null, this._measureElement = null, this._map = new h2();
  }
  detectMixin(t) {
    return l2(t);
  }
  gatherStyles(t) {
    const i = i2(t.content);
    if (i) {
      const r = document.createElement(
        "style"
      );
      return r.textContent = i, t.content.insertBefore(r, t.content.firstChild), r;
    }
    return null;
  }
  transformTemplate(t, i) {
    t._gatheredStyle === void 0 && (t._gatheredStyle = this.gatherStyles(t));
    const r = t._gatheredStyle;
    return r ? this.transformStyle(r, i) : null;
  }
  transformStyle(t, i = "") {
    let r = M1(t);
    return this.transformRules(r, i), t.textContent = Ce(r), r;
  }
  transformCustomStyle(t) {
    let i = M1(t);
    return pt(i, (r) => {
      r.selector === ":root" && (r.selector = "html"), this.transformRule(r);
    }), t.textContent = Ce(i), i;
  }
  transformRules(t, i) {
    this._currentElement = i, pt(t, (r) => {
      this.transformRule(r);
    }), this._currentElement = null;
  }
  transformRule(t) {
    t.cssText = this.transformCssText(t.parsedCssText, t), t.selector === ":root" && (t.selector = ":host > *");
  }
  transformCssText(t, i) {
    return t = t.replace(
      be,
      (r, s, n, l) => this._produceCssProperties(
        r,
        s,
        n,
        l,
        i
      )
    ), this._consumeCssProperties(t, i);
  }
  _getInitialValueForProperty(t) {
    return this._measureElement || (this._measureElement = document.createElement(
      "meta"
    ), this._measureElement.setAttribute("apply-shim-measure", ""), this._measureElement.style.all = "initial", document.head.appendChild(this._measureElement)), window.getComputedStyle(this._measureElement).getPropertyValue(t);
  }
  _fallbacksFromPreviousRules(t) {
    let i = t;
    for (; i.parent; )
      i = i.parent;
    const r = {};
    let s = !1;
    return pt(i, (n) => {
      s = s || n === t, !s && n.selector === t.selector && Object.assign(r, this._cssTextToMap(n.parsedCssText));
    }), r;
  }
  _consumeCssProperties(t, i) {
    let r = null;
    for (; r = Ft.exec(t); ) {
      let s = r[0], n = r[1], l = r.index, o = l + s.indexOf("@apply"), a = l + s.length, h = t.slice(0, o), c = t.slice(a), d = i ? this._fallbacksFromPreviousRules(i) : {};
      Object.assign(d, this._cssTextToMap(h));
      let p = this._atApplyToCssProperties(n, d);
      t = `${h}${p}${c}`, Ft.lastIndex = l + p.length;
    }
    return t;
  }
  _atApplyToCssProperties(t, i) {
    t = t.replace(o2, "");
    let r = [], s = this._map.get(t);
    if (s || (this._map.set(t, {}), s = this._map.get(t)), s) {
      this._currentElement && (s.dependants[this._currentElement] = !0);
      let n, l, o;
      const a = s.properties;
      for (n in a)
        o = i && i[n], l = [n, ": var(", t, we, n], o && l.push(",", o.replace(H1, "")), l.push(")"), H1.test(a[n]) && l.push(" !important"), r.push(l.join(""));
    }
    return r.join("; ");
  }
  _replaceInitialOrInherit(t, i) {
    let r = a2.exec(i);
    return r && (r[1] ? i = this._getInitialValueForProperty(t) : i = "apply-shim-inherit"), i;
  }
  _cssTextToMap(t, i = !1) {
    let r = t.split(";"), s, n, l = {};
    for (let o = 0, a, h; o < r.length; o++)
      a = r[o], a && (h = a.split(":"), h.length > 1 && (s = h[0].trim(), n = h.slice(1).join(":"), i && (n = this._replaceInitialOrInherit(s, n)), l[s] = n));
    return l;
  }
  _invalidateMixinEntry(t) {
    if (!!Bt)
      for (let i in t.dependants)
        i !== this._currentElement && Bt(i);
  }
  _produceCssProperties(t, i, r, s, n) {
    if (r && Mi(r, (V, z) => {
      z && this._map.get(z) && (s = `@apply ${z};`);
    }), !s)
      return t;
    let l = this._consumeCssProperties("" + s, n), o = t.slice(0, t.indexOf("--")), a = this._cssTextToMap(l, !0), h = a, c = this._map.get(i), d = c && c.properties;
    d ? h = Object.assign(Object.create(d), a) : this._map.set(i, h);
    let p = [], f, m, g = !1;
    for (f in h)
      m = a[f], m === void 0 && (m = "initial"), d && !(f in d) && (g = !0), p.push(`${i}${we}${f}: ${m}`);
    return g && this._invalidateMixinEntry(c), c && (c.properties = h), r && (o = `${t};${o}`), `${o}${p.join("; ")};`;
  }
}
M.prototype.detectMixin = M.prototype.detectMixin;
M.prototype.transformStyle = M.prototype.transformStyle;
M.prototype.transformCustomStyle = M.prototype.transformCustomStyle;
M.prototype.transformRules = M.prototype.transformRules;
M.prototype.transformRule = M.prototype.transformRule;
M.prototype.transformTemplate = M.prototype.transformTemplate;
M.prototype._separator = we;
Object.defineProperty(M.prototype, "invalidCallback", {
  get() {
    return Bt;
  },
  set(e) {
    Bt = e;
  }
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const He = {};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Ut = "_applyShimCurrentVersion", et = "_applyShimNextVersion", jt = "_applyShimValidatingVersion", c2 = Promise.resolve();
function d2(e) {
  let t = He[e];
  t && p2(t);
}
function p2(e) {
  e[Ut] = e[Ut] || 0, e[jt] = e[jt] || 0, e[et] = (e[et] || 0) + 1;
}
function Si(e) {
  return e[Ut] === e[et];
}
function u2(e) {
  return !Si(e) && e[jt] === e[et];
}
function f2(e) {
  e[jt] = e[et], e._validating || (e._validating = !0, c2.then(function() {
    e[Ut] = e[et], e._validating = !1;
  }));
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let pe = null, S1 = window.HTMLImports && window.HTMLImports.whenReady || null, ue;
function P1(e) {
  requestAnimationFrame(function() {
    S1 ? S1(e) : (pe || (pe = new Promise((t) => {
      ue = t;
    }), document.readyState === "complete" ? ue() : document.addEventListener("readystatechange", () => {
      document.readyState === "complete" && ue();
    })), pe.then(function() {
      e && e();
    }));
  });
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const V1 = "__seenByShadyCSS", Tt = "__shadyCSSCachedStyle";
let qt = null, ut = null;
class I {
  constructor() {
    this.customStyles = [], this.enqueued = !1, P1(() => {
      window.ShadyCSS.flushCustomStyles && window.ShadyCSS.flushCustomStyles();
    });
  }
  enqueueDocumentValidation() {
    this.enqueued || !ut || (this.enqueued = !0, P1(ut));
  }
  addCustomStyle(t) {
    t[V1] || (t[V1] = !0, this.customStyles.push(t), this.enqueueDocumentValidation());
  }
  getStyleForCustomStyle(t) {
    if (t[Tt])
      return t[Tt];
    let i;
    return t.getStyle ? i = t.getStyle() : i = t, i;
  }
  processStyles() {
    const t = this.customStyles;
    for (let i = 0; i < t.length; i++) {
      const r = t[i];
      if (r[Tt])
        continue;
      const s = this.getStyleForCustomStyle(r);
      if (s) {
        const n = s.__appliedElement || s;
        qt && qt(n), r[Tt] = n;
      }
    }
    return t;
  }
}
I.prototype.addCustomStyle = I.prototype.addCustomStyle;
I.prototype.getStyleForCustomStyle = I.prototype.getStyleForCustomStyle;
I.prototype.processStyles = I.prototype.processStyles;
Object.defineProperties(I.prototype, {
  transformCallback: {
    get() {
      return qt;
    },
    set(e) {
      qt = e;
    }
  },
  validateCallback: {
    get() {
      return ut;
    },
    set(e) {
      let t = !1;
      ut || (t = !0), ut = e, t && this.enqueueDocumentValidation();
    }
  }
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const at = new M();
class m2 {
  constructor() {
    this.customStyleInterface = null, at.invalidCallback = d2;
  }
  ensure() {
    this.customStyleInterface || window.ShadyCSS.CustomStyleInterface && (this.customStyleInterface = window.ShadyCSS.CustomStyleInterface, this.customStyleInterface.transformCallback = (t) => {
      at.transformCustomStyle(t);
    }, this.customStyleInterface.validateCallback = () => {
      requestAnimationFrame(() => {
        this.customStyleInterface.enqueued && this.flushCustomStyles();
      });
    });
  }
  prepareTemplate(t, i) {
    if (this.ensure(), w1(t))
      return;
    He[i] = t;
    let r = at.transformTemplate(t, i);
    t._styleAst = r;
  }
  flushCustomStyles() {
    if (this.ensure(), !this.customStyleInterface)
      return;
    let t = this.customStyleInterface.processStyles();
    if (!!this.customStyleInterface.enqueued) {
      for (let i = 0; i < t.length; i++) {
        let r = t[i], s = this.customStyleInterface.getStyleForCustomStyle(r);
        s && at.transformCustomStyle(s);
      }
      this.customStyleInterface.enqueued = !1;
    }
  }
  styleSubtree(t, i) {
    if (this.ensure(), i && Me(t, i), t.shadowRoot) {
      this.styleElement(t);
      let r = t.shadowRoot.children || t.shadowRoot.childNodes;
      for (let s = 0; s < r.length; s++)
        this.styleSubtree(r[s]);
    } else {
      let r = t.children || t.childNodes;
      for (let s = 0; s < r.length; s++)
        this.styleSubtree(r[s]);
    }
  }
  styleElement(t) {
    this.ensure();
    let { is: i } = e2(t), r = He[i];
    if (!(r && w1(r)) && r && !Si(r)) {
      u2(r) || (this.prepareTemplate(r, i), f2(r));
      let s = t.shadowRoot;
      if (s) {
        let n = s.querySelector(
          "style"
        );
        n && (n.__cssRules = r._styleAst, n.textContent = Ce(r._styleAst));
      }
    }
  }
  styleDocument(t) {
    this.ensure(), this.styleSubtree(document.body, t);
  }
}
if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
  const e = new m2();
  let t = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
  window.ShadyCSS = {
    prepareTemplate(i, r, s) {
      e.flushCustomStyles(), e.prepareTemplate(i, r);
    },
    prepareTemplateStyles(i, r, s) {
      window.ShadyCSS.prepareTemplate(i, r, s);
    },
    prepareTemplateDom(i, r) {
    },
    styleSubtree(i, r) {
      e.flushCustomStyles(), e.styleSubtree(i, r);
    },
    styleElement(i) {
      e.flushCustomStyles(), e.styleElement(i);
    },
    styleDocument(i) {
      e.flushCustomStyles(), e.styleDocument(i);
    },
    getComputedStyleValue(i, r) {
      return Hi(i, r);
    },
    flushCustomStyles() {
      e.flushCustomStyles();
    },
    nativeCss: Be,
    nativeShadow: Zt,
    cssBuild: bt,
    disableRuntime: _i
  }, t && (window.ShadyCSS.CustomStyleInterface = t);
}
window.ShadyCSS.ApplyShim = at;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.JSCompiler_renameProperty = function(e, t) {
  return e;
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let _2 = /(url\()([^)]*)(\))/g, v2 = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/, Ot, H;
function ft(e, t) {
  if (e && v2.test(e) || e === "//")
    return e;
  if (Ot === void 0) {
    Ot = !1;
    try {
      const i = new URL("b", "http://a");
      i.pathname = "c%20d", Ot = i.href === "http://a/c%20d";
    } catch {
    }
  }
  if (t || (t = document.baseURI || window.location.href), Ot)
    try {
      return new URL(e, t).href;
    } catch {
      return e;
    }
  return H || (H = document.implementation.createHTMLDocument("temp"), H.base = H.createElement("base"), H.head.appendChild(H.base), H.anchor = H.createElement("a"), H.body.appendChild(H.anchor)), H.base.href = t, H.anchor.href = e, H.anchor.href || e;
}
function Ue(e, t) {
  return e.replace(_2, function(i, r, s, n) {
    return r + "'" + ft(s.replace(/["']/g, ""), t) + "'" + n;
  });
}
function je(e) {
  return e.substring(0, e.lastIndexOf("/") + 1);
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Pi = !window.ShadyDOM || !window.ShadyDOM.inUse;
Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
const g2 = Pi && "adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype && (() => {
  try {
    const e = new CSSStyleSheet();
    e.replaceSync("");
    const t = document.createElement("div");
    return t.attachShadow({ mode: "open" }), t.shadowRoot.adoptedStyleSheets = [e], t.shadowRoot.adoptedStyleSheets[0] === e;
  } catch {
    return !1;
  }
})();
let y2 = window.Polymer && window.Polymer.rootPath || je(document.baseURI || window.location.href), Yt = window.Polymer && window.Polymer.sanitizeDOMValue || void 0, z2 = window.Polymer && window.Polymer.setPassiveTouchGestures || !1, it = window.Polymer && window.Polymer.strictTemplatePolicy || !1, b2 = window.Polymer && window.Polymer.allowTemplateFromDomModule || !1, Ct = window.Polymer && window.Polymer.legacyOptimizations || !1, Vi = window.Polymer && window.Polymer.legacyWarnings || !1, C2 = window.Polymer && window.Polymer.syncInitialRender || !1, Se = window.Polymer && window.Polymer.legacyUndefined || !1, M2 = window.Polymer && window.Polymer.orderedComputed || !1, L1 = window.Polymer && window.Polymer.removeNestedTemplates || !1, Li = window.Polymer && window.Polymer.fastDomIf || !1, Pe = window.Polymer && window.Polymer.suppressTemplateNotifications || !1, Nt = window.Polymer && window.Polymer.legacyNoObservedAttributes || !1, w2 = window.Polymer && window.Polymer.useAdoptedStyleSheetsWithBuiltCSS || !1;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let H2 = 0;
const P = function(e) {
  let t = e.__mixinApplications;
  t || (t = /* @__PURE__ */ new WeakMap(), e.__mixinApplications = t);
  let i = H2++;
  function r(s) {
    let n = s.__mixinSet;
    if (n && n[i])
      return s;
    let l = t, o = l.get(s);
    if (!o) {
      o = e(s), l.set(s, o);
      let a = Object.create(o.__mixinSet || n || null);
      a[i] = !0, o.__mixinSet = a;
    }
    return o;
  }
  return r;
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let qe = {}, Ei = {};
function E1(e, t) {
  qe[e] = Ei[e.toLowerCase()] = t;
}
function A1(e) {
  return qe[e] || Ei[e.toLowerCase()];
}
function S2(e) {
  e.querySelector("style") && console.warn("dom-module %s has style outside template", e.id);
}
class Mt extends HTMLElement {
  static get observedAttributes() {
    return ["id"];
  }
  static import(t, i) {
    if (t) {
      let r = A1(t);
      return r && i ? r.querySelector(i) : r;
    }
    return null;
  }
  attributeChangedCallback(t, i, r, s) {
    i !== r && this.register();
  }
  get assetpath() {
    if (!this.__assetpath) {
      const t = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument, i = ft(
        this.getAttribute("assetpath") || "",
        t.baseURI
      );
      this.__assetpath = je(i);
    }
    return this.__assetpath;
  }
  register(t) {
    if (t = t || this.id, t) {
      if (it && A1(t) !== void 0)
        throw E1(t, null), new Error(`strictTemplatePolicy: dom-module ${t} re-registered`);
      this.id = t, E1(t, this), S2(this);
    }
  }
}
Mt.prototype.modules = qe;
customElements.define("dom-module", Mt);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const P2 = "link[rel=import][type~=css]", V2 = "include", x1 = "shady-unscoped";
function Ye(e) {
  return Mt.import(e);
}
function T1(e) {
  let t = e.body ? e.body : e;
  const i = Ue(
    t.textContent,
    e.baseURI
  ), r = document.createElement("style");
  return r.textContent = i, r;
}
function L2(e) {
  const t = e.trim().split(/\s+/), i = [];
  for (let r = 0; r < t.length; r++)
    i.push(...E2(t[r]));
  return i;
}
function E2(e) {
  const t = Ye(e);
  if (!t)
    return console.warn("Could not find style data in module named", e), [];
  if (t._styles === void 0) {
    const i = [];
    i.push(...Xe(t));
    const r = t.querySelector("template");
    r && i.push(...Je(
      r,
      t.assetpath
    )), t._styles = i;
  }
  return t._styles;
}
function Je(e, t) {
  if (!e._styles) {
    const i = [], r = e.content.querySelectorAll("style");
    for (let s = 0; s < r.length; s++) {
      let n = r[s], l = n.getAttribute(V2);
      l && i.push(...L2(l).filter(function(o, a, h) {
        return h.indexOf(o) === a;
      })), t && (n.textContent = Ue(n.textContent, t)), i.push(n);
    }
    e._styles = i;
  }
  return e._styles;
}
function A2(e) {
  let t = Ye(e);
  return t ? Xe(t) : [];
}
function Xe(e) {
  const t = [], i = e.querySelectorAll(P2);
  for (let r = 0; r < i.length; r++) {
    let s = i[r];
    if (s.import) {
      const n = s.import, l = s.hasAttribute(x1);
      if (l && !n._unscopedStyle) {
        const o = T1(n);
        o.setAttribute(x1, ""), n._unscopedStyle = o;
      } else
        n._style || (n._style = T1(n));
      t.push(l ? n._unscopedStyle : n._style);
    }
  }
  return t;
}
function x2(e) {
  let t = e.trim().split(/\s+/), i = "";
  for (let r = 0; r < t.length; r++)
    i += T2(t[r]);
  return i;
}
function T2(e) {
  let t = Ye(e);
  if (t && t._cssText === void 0) {
    let i = N2(t), r = t.querySelector("template");
    r && (i += O2(
      r,
      t.assetpath
    )), t._cssText = i || null;
  }
  return t || console.warn("Could not find style data in module named", e), t && t._cssText || "";
}
function O2(e, t) {
  let i = "";
  const r = Je(e, t);
  for (let s = 0; s < r.length; s++) {
    let n = r[s];
    n.parentNode && n.parentNode.removeChild(n), i += n.textContent;
  }
  return i;
}
function N2(e) {
  let t = "", i = Xe(e);
  for (let r = 0; r < i.length; r++)
    t += i[r].textContent;
  return t;
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const u = window.ShadyDOM && window.ShadyDOM.noPatch && window.ShadyDOM.wrap ? window.ShadyDOM.wrap : window.ShadyDOM ? (e) => ShadyDOM.patch(e) : (e) => e;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Ve(e) {
  return e.indexOf(".") >= 0;
}
function x(e) {
  let t = e.indexOf(".");
  return t === -1 ? e : e.slice(0, t);
}
function Ai(e, t) {
  return e.indexOf(t + ".") === 0;
}
function wt(e, t) {
  return t.indexOf(e + ".") === 0;
}
function Ht(e, t, i) {
  return t + i.slice(e.length);
}
function k2(e, t) {
  return e === t || Ai(e, t) || wt(e, t);
}
function ht(e) {
  if (Array.isArray(e)) {
    let t = [];
    for (let i = 0; i < e.length; i++) {
      let r = e[i].toString().split(".");
      for (let s = 0; s < r.length; s++)
        t.push(r[s]);
    }
    return t.join(".");
  } else
    return e;
}
function xi(e) {
  return Array.isArray(e) ? ht(e).split(".") : e.toString().split(".");
}
function C(e, t, i) {
  let r = e, s = xi(t);
  for (let n = 0; n < s.length; n++) {
    if (!r)
      return;
    let l = s[n];
    r = r[l];
  }
  return i && (i.path = s.join(".")), r;
}
function O1(e, t, i) {
  let r = e, s = xi(t), n = s[s.length - 1];
  if (s.length > 1) {
    for (let l = 0; l < s.length - 1; l++) {
      let o = s[l];
      if (r = r[o], !r)
        return;
    }
    r[n] = i;
  } else
    r[t] = i;
  return s.join(".");
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Jt = {}, I2 = /-[a-z]/g, $2 = /([A-Z])/g;
function Ti(e) {
  return Jt[e] || (Jt[e] = e.indexOf("-") < 0 ? e : e.replace(
    I2,
    (t) => t[1].toUpperCase()
  ));
}
function Qt(e) {
  return Jt[e] || (Jt[e] = e.replace($2, "-$1").toLowerCase());
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let D2 = 0, Oi = 0, G = [], R2 = 0, Le = !1, Ni = document.createTextNode("");
new window.MutationObserver(F2).observe(Ni, { characterData: !0 });
function F2() {
  Le = !1;
  const e = G.length;
  for (let t = 0; t < e; t++) {
    let i = G[t];
    if (i)
      try {
        i();
      } catch (r) {
        setTimeout(() => {
          throw r;
        });
      }
  }
  G.splice(0, e), Oi += e;
}
const mt = {
  after(e) {
    return {
      run(t) {
        return window.setTimeout(t, e);
      },
      cancel(t) {
        window.clearTimeout(t);
      }
    };
  },
  run(e, t) {
    return window.setTimeout(e, t);
  },
  cancel(e) {
    window.clearTimeout(e);
  }
}, N = {
  run(e) {
    return Le || (Le = !0, Ni.textContent = R2++), G.push(e), D2++;
  },
  cancel(e) {
    const t = e - Oi;
    if (t >= 0) {
      if (!G[t])
        throw new Error("invalid async handle: " + e);
      G[t] = null;
    }
  }
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const B2 = N, ki = P(
  (e) => {
    class t extends e {
      static createProperties(r) {
        const s = this.prototype;
        for (let n in r)
          n in s || s._createPropertyAccessor(n);
      }
      static attributeNameForProperty(r) {
        return r.toLowerCase();
      }
      static typeForProperty(r) {
      }
      _createPropertyAccessor(r, s) {
        this._addPropertyToAttributeMap(r), this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor", this)) || (this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor)), this.__dataHasAccessor[r] || (this.__dataHasAccessor[r] = !0, this._definePropertyAccessor(r, s));
      }
      _addPropertyToAttributeMap(r) {
        this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes", this)) || (this.__dataAttributes = Object.assign({}, this.__dataAttributes));
        let s = this.__dataAttributes[r];
        return s || (s = this.constructor.attributeNameForProperty(r), this.__dataAttributes[s] = r), s;
      }
      _definePropertyAccessor(r, s) {
        Object.defineProperty(this, r, {
          get() {
            return this.__data[r];
          },
          set: s ? function() {
          } : function(n) {
            this._setPendingProperty(r, n, !0) && this._invalidateProperties();
          }
        });
      }
      constructor() {
        super(), this.__dataEnabled = !1, this.__dataReady = !1, this.__dataInvalid = !1, this.__data = {}, this.__dataPending = null, this.__dataOld = null, this.__dataInstanceProps = null, this.__dataCounter = 0, this.__serializing = !1, this._initializeProperties();
      }
      ready() {
        this.__dataReady = !0, this._flushProperties();
      }
      _initializeProperties() {
        for (let r in this.__dataHasAccessor)
          this.hasOwnProperty(r) && (this.__dataInstanceProps = this.__dataInstanceProps || {}, this.__dataInstanceProps[r] = this[r], delete this[r]);
      }
      _initializeInstanceProperties(r) {
        Object.assign(this, r);
      }
      _setProperty(r, s) {
        this._setPendingProperty(r, s) && this._invalidateProperties();
      }
      _getProperty(r) {
        return this.__data[r];
      }
      _setPendingProperty(r, s, n) {
        let l = this.__data[r], o = this._shouldPropertyChange(r, s, l);
        return o && (this.__dataPending || (this.__dataPending = {}, this.__dataOld = {}), this.__dataOld && !(r in this.__dataOld) && (this.__dataOld[r] = l), this.__data[r] = s, this.__dataPending[r] = s), o;
      }
      _isPropertyPending(r) {
        return !!(this.__dataPending && this.__dataPending.hasOwnProperty(r));
      }
      _invalidateProperties() {
        !this.__dataInvalid && this.__dataReady && (this.__dataInvalid = !0, B2.run(() => {
          this.__dataInvalid && (this.__dataInvalid = !1, this._flushProperties());
        }));
      }
      _enableProperties() {
        this.__dataEnabled || (this.__dataEnabled = !0, this.__dataInstanceProps && (this._initializeInstanceProperties(this.__dataInstanceProps), this.__dataInstanceProps = null), this.ready());
      }
      _flushProperties() {
        this.__dataCounter++;
        const r = this.__data, s = this.__dataPending, n = this.__dataOld;
        this._shouldPropertiesChange(r, s, n) && (this.__dataPending = null, this.__dataOld = null, this._propertiesChanged(r, s, n)), this.__dataCounter--;
      }
      _shouldPropertiesChange(r, s, n) {
        return Boolean(s);
      }
      _propertiesChanged(r, s, n) {
      }
      _shouldPropertyChange(r, s, n) {
        return n !== s && (n === n || s === s);
      }
      attributeChangedCallback(r, s, n, l) {
        s !== n && this._attributeToProperty(r, n), super.attributeChangedCallback && super.attributeChangedCallback(r, s, n, l);
      }
      _attributeToProperty(r, s, n) {
        if (!this.__serializing) {
          const l = this.__dataAttributes, o = l && l[r] || r;
          this[o] = this._deserializeValue(s, n || this.constructor.typeForProperty(o));
        }
      }
      _propertyToAttribute(r, s, n) {
        this.__serializing = !0, n = arguments.length < 3 ? this[r] : n, this._valueToNodeAttribute(
          this,
          n,
          s || this.constructor.attributeNameForProperty(r)
        ), this.__serializing = !1;
      }
      _valueToNodeAttribute(r, s, n) {
        const l = this._serializeValue(s);
        (n === "class" || n === "name" || n === "slot") && (r = u(r)), l === void 0 ? r.removeAttribute(n) : r.setAttribute(
          n,
          l === "" && window.trustedTypes ? window.trustedTypes.emptyScript : l
        );
      }
      _serializeValue(r) {
        switch (typeof r) {
          case "boolean":
            return r ? "" : void 0;
          default:
            return r != null ? r.toString() : void 0;
        }
      }
      _deserializeValue(r, s) {
        switch (s) {
          case Boolean:
            return r !== null;
          case Number:
            return Number(r);
          default:
            return r;
        }
      }
    }
    return t;
  }
);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Ii = {};
let kt = HTMLElement.prototype;
for (; kt; ) {
  let e = Object.getOwnPropertyNames(kt);
  for (let t = 0; t < e.length; t++)
    Ii[e[t]] = !0;
  kt = Object.getPrototypeOf(kt);
}
const U2 = (() => window.trustedTypes ? (e) => trustedTypes.isHTML(e) || trustedTypes.isScript(e) || trustedTypes.isScriptURL(e) : () => !1)();
function j2(e, t) {
  if (!Ii[t]) {
    let i = e[t];
    i !== void 0 && (e.__data ? e._setPendingProperty(t, i) : (e.__dataProto ? e.hasOwnProperty(JSCompiler_renameProperty("__dataProto", e)) || (e.__dataProto = Object.create(e.__dataProto)) : e.__dataProto = {}, e.__dataProto[t] = i));
  }
}
const $i = P((e) => {
  const t = ki(e);
  class i extends t {
    static createPropertiesForAttributes() {
      let s = this.observedAttributes;
      for (let n = 0; n < s.length; n++)
        this.prototype._createPropertyAccessor(Ti(s[n]));
    }
    static attributeNameForProperty(s) {
      return Qt(s);
    }
    _initializeProperties() {
      this.__dataProto && (this._initializeProtoProperties(this.__dataProto), this.__dataProto = null), super._initializeProperties();
    }
    _initializeProtoProperties(s) {
      for (let n in s)
        this._setProperty(n, s[n]);
    }
    _ensureAttribute(s, n) {
      const l = this;
      l.hasAttribute(s) || this._valueToNodeAttribute(l, n, s);
    }
    _serializeValue(s) {
      switch (typeof s) {
        case "object":
          if (s instanceof Date)
            return s.toString();
          if (s) {
            if (U2(s))
              return s;
            try {
              return JSON.stringify(s);
            } catch {
              return "";
            }
          }
        default:
          return super._serializeValue(s);
      }
    }
    _deserializeValue(s, n) {
      let l;
      switch (n) {
        case Object:
          try {
            l = JSON.parse(s);
          } catch {
            l = s;
          }
          break;
        case Array:
          try {
            l = JSON.parse(s);
          } catch {
            l = null, console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${s}`);
          }
          break;
        case Date:
          l = isNaN(s) ? String(s) : Number(s), l = new Date(l);
          break;
        default:
          l = super._deserializeValue(s, n);
          break;
      }
      return l;
    }
    _definePropertyAccessor(s, n) {
      j2(this, s), super._definePropertyAccessor(s, n);
    }
    _hasAccessor(s) {
      return this.__dataHasAccessor && this.__dataHasAccessor[s];
    }
    _isPropertyPending(s) {
      return Boolean(this.__dataPending && s in this.__dataPending);
    }
  }
  return i;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const q2 = {
  "dom-if": !0,
  "dom-repeat": !0
};
let N1 = !1, k1 = !1;
function Y2() {
  if (!N1) {
    N1 = !0;
    const e = document.createElement("textarea");
    e.placeholder = "a", k1 = e.placeholder === e.textContent;
  }
  return k1;
}
function J2(e) {
  Y2() && e.localName === "textarea" && e.placeholder && e.placeholder === e.textContent && (e.textContent = null);
}
const X2 = (() => {
  const e = window.trustedTypes && window.trustedTypes.createPolicy(
    "polymer-template-event-attribute-policy",
    {
      createScript: (t) => t
    }
  );
  return (t, i, r) => {
    const s = i.getAttribute(r);
    if (e && r.startsWith("on-")) {
      t.setAttribute(
        r,
        e.createScript(s, r)
      );
      return;
    }
    t.setAttribute(r, s);
  };
})();
function G2(e) {
  let t = e.getAttribute("is");
  if (t && q2[t]) {
    let i = e;
    for (i.removeAttribute("is"), e = i.ownerDocument.createElement(t), i.parentNode.replaceChild(e, i), e.appendChild(i); i.attributes.length; ) {
      const { name: r } = i.attributes[0];
      X2(e, i, r), i.removeAttribute(r);
    }
  }
  return e;
}
function Di(e, t) {
  let i = t.parentInfo && Di(e, t.parentInfo);
  if (i) {
    for (let r = i.firstChild, s = 0; r; r = r.nextSibling)
      if (t.parentIndex === s++)
        return r;
  } else
    return e;
}
function W2(e, t, i, r) {
  r.id && (t[r.id] = i);
}
function K2(e, t, i) {
  if (i.events && i.events.length)
    for (let r = 0, s = i.events, n; r < s.length && (n = s[r]); r++)
      e._addMethodEventListenerToNode(t, n.name, n.value, e);
}
function Z2(e, t, i, r) {
  i.templateInfo && (t._templateInfo = i.templateInfo, t._parentTemplateInfo = r);
}
function Q2(e, t, i) {
  return e = e._methodHost || e, function(s) {
    e[i] ? e[i](s, s.detail) : console.warn("listener method `" + i + "` not defined");
  };
}
const tr = P(
  (e) => {
    class t extends e {
      static _parseTemplate(r, s) {
        if (!r._templateInfo) {
          let n = r._templateInfo = {};
          n.nodeInfoList = [], n.nestedTemplate = Boolean(s), n.stripWhiteSpace = s && s.stripWhiteSpace || r.hasAttribute && r.hasAttribute("strip-whitespace"), this._parseTemplateContent(
            r,
            n,
            { parent: null }
          );
        }
        return r._templateInfo;
      }
      static _parseTemplateContent(r, s, n) {
        return this._parseTemplateNode(r.content, s, n);
      }
      static _parseTemplateNode(r, s, n) {
        let l = !1, o = r;
        return o.localName == "template" && !o.hasAttribute("preserve-content") ? l = this._parseTemplateNestedTemplate(o, s, n) || l : o.localName === "slot" && (s.hasInsertionPoint = !0), J2(o), o.firstChild && this._parseTemplateChildNodes(o, s, n), o.hasAttributes && o.hasAttributes() && (l = this._parseTemplateNodeAttributes(o, s, n) || l), l || n.noted;
      }
      static _parseTemplateChildNodes(r, s, n) {
        if (!(r.localName === "script" || r.localName === "style"))
          for (let l = r.firstChild, o = 0, a; l; l = a) {
            if (l.localName == "template" && (l = G2(l)), a = l.nextSibling, l.nodeType === Node.TEXT_NODE) {
              let c = a;
              for (; c && c.nodeType === Node.TEXT_NODE; )
                l.textContent += c.textContent, a = c.nextSibling, r.removeChild(c), c = a;
              if (s.stripWhiteSpace && !l.textContent.trim()) {
                r.removeChild(l);
                continue;
              }
            }
            let h = { parentIndex: o, parentInfo: n };
            this._parseTemplateNode(l, s, h) && (h.infoIndex = s.nodeInfoList.push(h) - 1), l.parentNode && o++;
          }
      }
      static _parseTemplateNestedTemplate(r, s, n) {
        let l = r, o = this._parseTemplate(l, s);
        return (o.content = l.content.ownerDocument.createDocumentFragment()).appendChild(l.content), n.templateInfo = o, !0;
      }
      static _parseTemplateNodeAttributes(r, s, n) {
        let l = !1, o = Array.from(r.attributes);
        for (let a = o.length - 1, h; h = o[a]; a--)
          l = this._parseTemplateNodeAttribute(r, s, n, h.name, h.value) || l;
        return l;
      }
      static _parseTemplateNodeAttribute(r, s, n, l, o) {
        return l.slice(0, 3) === "on-" ? (r.removeAttribute(l), n.events = n.events || [], n.events.push({
          name: l.slice(3),
          value: o
        }), !0) : l === "id" ? (n.id = o, !0) : !1;
      }
      static _contentForTemplate(r) {
        let s = r._templateInfo;
        return s && s.content || r.content;
      }
      _stampTemplate(r, s) {
        r && !r.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(r), s = s || this.constructor._parseTemplate(r);
        let n = s.nodeInfoList, l = s.content || r.content, o = document.importNode(l, !0);
        o.__noInsertionPoint = !s.hasInsertionPoint;
        let a = o.nodeList = new Array(n.length);
        o.$ = {};
        for (let h = 0, c = n.length, d; h < c && (d = n[h]); h++) {
          let p = a[h] = Di(o, d);
          W2(this, o.$, p, d), Z2(this, p, d, s), K2(this, p, d);
        }
        return o = o, o;
      }
      _addMethodEventListenerToNode(r, s, n, l) {
        l = l || r;
        let o = Q2(l, s, n);
        return this._addEventListenerToNode(r, s, o), o;
      }
      _addEventListenerToNode(r, s, n) {
        r.addEventListener(s, n);
      }
      _removeEventListenerFromNode(r, s, n) {
        r.removeEventListener(s, n);
      }
    }
    return t;
  }
);
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
let St = 0;
const Pt = [], _ = {
  COMPUTE: "__computeEffects",
  REFLECT: "__reflectEffects",
  NOTIFY: "__notifyEffects",
  PROPAGATE: "__propagateEffects",
  OBSERVE: "__observeEffects",
  READ_ONLY: "__readOnly"
}, Ri = "__computeInfo", er = /[A-Z]/;
function fe(e, t, i) {
  let r = e[t];
  if (!r)
    r = e[t] = {};
  else if (!e.hasOwnProperty(t) && (r = e[t] = Object.create(e[t]), i))
    for (let s in r) {
      let n = r[s], l = r[s] = Array(n.length);
      for (let o = 0; o < n.length; o++)
        l[o] = n[o];
    }
  return r;
}
function ct(e, t, i, r, s, n) {
  if (t) {
    let l = !1;
    const o = St++;
    for (let a in i) {
      let h = s ? x(a) : a, c = t[h];
      if (c)
        for (let d = 0, p = c.length, f; d < p && (f = c[d]); d++)
          (!f.info || f.info.lastRun !== o) && (!s || Ge(a, f.trigger)) && (f.info && (f.info.lastRun = o), f.fn(e, a, i, r, f.info, s, n), l = !0);
    }
    return l;
  }
  return !1;
}
function ir(e, t, i, r, s, n, l, o) {
  let a = !1, h = l ? x(r) : r, c = t[h];
  if (c)
    for (let d = 0, p = c.length, f; d < p && (f = c[d]); d++)
      (!f.info || f.info.lastRun !== i) && (!l || Ge(r, f.trigger)) && (f.info && (f.info.lastRun = i), f.fn(e, r, s, n, f.info, l, o), a = !0);
  return a;
}
function Ge(e, t) {
  if (t) {
    let i = t.name;
    return i == e || !!(t.structured && Ai(i, e)) || !!(t.wildcard && wt(i, e));
  } else
    return !0;
}
function I1(e, t, i, r, s) {
  let n = typeof s.method == "string" ? e[s.method] : s.method, l = s.property;
  n ? n.call(e, e.__data[l], r[l]) : s.dynamicFn || console.warn("observer method `" + s.method + "` not defined");
}
function sr(e, t, i, r, s) {
  let n = e[_.NOTIFY], l, o = St++;
  for (let h in t)
    t[h] && (n && ir(e, n, o, h, i, r, s) || s && rr(e, h, i)) && (l = !0);
  let a;
  l && (a = e.__dataHost) && a._invalidateProperties && a._invalidateProperties();
}
function rr(e, t, i) {
  let r = x(t);
  if (r !== t) {
    let s = Qt(r) + "-changed";
    return Fi(e, s, i[t], t), !0;
  }
  return !1;
}
function Fi(e, t, i, r) {
  let s = {
    value: i,
    queueProperty: !0
  };
  r && (s.path = r), u(e).dispatchEvent(new CustomEvent(t, { detail: s }));
}
function nr(e, t, i, r, s, n) {
  let o = (n ? x(t) : t) != t ? t : null, a = o ? C(e, o) : e.__data[t];
  o && a === void 0 && (a = i[t]), Fi(e, s.eventName, a, o);
}
function lr(e, t, i, r, s) {
  let n, l = e.detail, o = l && l.path;
  o ? (r = Ht(i, r, o), n = l && l.value) : n = e.currentTarget[i], n = s ? !n : n, (!t[_.READ_ONLY] || !t[_.READ_ONLY][r]) && t._setPendingPropertyOrPath(r, n, !0, Boolean(o)) && (!l || !l.queueProperty) && t._invalidateProperties();
}
function or(e, t, i, r, s) {
  let n = e.__data[t];
  Yt && (n = Yt(n, s.attrName, "attribute", e)), e._propertyToAttribute(t, s.attrName, n);
}
function ar(e, t, i, r) {
  let s = e[_.COMPUTE];
  if (s)
    if (M2) {
      St++;
      const n = cr(e), l = [];
      for (let a in t)
        $1(a, s, l, n, r);
      let o;
      for (; o = l.shift(); )
        Bi(e, "", t, i, o) && $1(o.methodInfo, s, l, n, r);
      Object.assign(i, e.__dataOld), Object.assign(t, e.__dataPending), e.__dataPending = null;
    } else {
      let n = t;
      for (; ct(e, s, n, i, r); )
        Object.assign(i, e.__dataOld), Object.assign(t, e.__dataPending), n = e.__dataPending, e.__dataPending = null;
    }
}
const hr = (e, t, i) => {
  let r = 0, s = t.length - 1, n = -1;
  for (; r <= s; ) {
    const l = r + s >> 1, o = i.get(t[l].methodInfo) - i.get(e.methodInfo);
    if (o < 0)
      r = l + 1;
    else if (o > 0)
      s = l - 1;
    else {
      n = l;
      break;
    }
  }
  n < 0 && (n = s + 1), t.splice(n, 0, e);
}, $1 = (e, t, i, r, s) => {
  const n = s ? x(e) : e, l = t[n];
  if (l)
    for (let o = 0; o < l.length; o++) {
      const a = l[o];
      a.info.lastRun !== St && (!s || Ge(e, a.trigger)) && (a.info.lastRun = St, hr(a.info, i, r));
    }
};
function cr(e) {
  let t = e.constructor.__orderedComputedDeps;
  if (!t) {
    t = /* @__PURE__ */ new Map();
    const i = e[_.COMPUTE];
    let { counts: r, ready: s, total: n } = dr(e), l;
    for (; l = s.shift(); ) {
      t.set(l, t.size);
      const o = i[l];
      o && o.forEach((a) => {
        const h = a.info.methodInfo;
        --n, --r[h] === 0 && s.push(h);
      });
    }
    n !== 0 && console.warn(`Computed graph for ${e.localName} incomplete; circular?`), e.constructor.__orderedComputedDeps = t;
  }
  return t;
}
function dr(e) {
  const t = e[Ri], i = {}, r = e[_.COMPUTE], s = [];
  let n = 0;
  for (let l in t) {
    const o = t[l];
    n += i[l] = o.args.filter((a) => !a.literal).length + (o.dynamicFn ? 1 : 0);
  }
  for (let l in r)
    t[l] || s.push(l);
  return { counts: i, ready: s, total: n };
}
function Bi(e, t, i, r, s) {
  let n = Ee(e, t, i, r, s);
  if (n === Pt)
    return !1;
  let l = s.methodInfo;
  return e.__dataHasAccessor && e.__dataHasAccessor[l] ? e._setPendingProperty(l, n, !0) : (e[l] = n, !1);
}
function pr(e, t, i) {
  let r = e.__dataLinkedPaths;
  if (r) {
    let s;
    for (let n in r) {
      let l = r[n];
      wt(n, t) ? (s = Ht(n, l, t), e._setPendingPropertyOrPath(s, i, !0, !0)) : wt(l, t) && (s = Ht(l, n, t), e._setPendingPropertyOrPath(s, i, !0, !0));
    }
  }
}
function me(e, t, i, r, s, n, l) {
  i.bindings = i.bindings || [];
  let o = { kind: r, target: s, parts: n, literal: l, isCompound: n.length !== 1 };
  if (i.bindings.push(o), vr(o)) {
    let { event: h, negate: c } = o.parts[0];
    o.listenerEvent = h || Qt(s) + "-changed", o.listenerNegate = c;
  }
  let a = t.nodeInfoList.length;
  for (let h = 0; h < o.parts.length; h++) {
    let c = o.parts[h];
    c.compoundIndex = h, ur(e, t, o, c, a);
  }
}
function ur(e, t, i, r, s) {
  if (!r.literal)
    if (i.kind === "attribute" && i.target[0] === "-")
      console.warn("Cannot set attribute " + i.target + ' because "-" is not a valid attribute starting character');
    else {
      let n = r.dependencies, l = { index: s, binding: i, part: r, evaluator: e };
      for (let o = 0; o < n.length; o++) {
        let a = n[o];
        typeof a == "string" && (a = ji(a), a.wildcard = !0), e._addTemplatePropertyEffect(t, a.rootProperty, {
          fn: fr,
          info: l,
          trigger: a
        });
      }
    }
}
function fr(e, t, i, r, s, n, l) {
  let o = l[s.index], a = s.binding, h = s.part;
  if (n && h.source && t.length > h.source.length && a.kind == "property" && !a.isCompound && o.__isPropertyEffectsClient && o.__dataHasAccessor && o.__dataHasAccessor[a.target]) {
    let c = i[t];
    t = Ht(h.source, a.target, t), o._setPendingPropertyOrPath(t, c, !1, !0) && e._enqueueClient(o);
  } else {
    let c = s.evaluator._evaluateBinding(e, h, t, i, r, n);
    c !== Pt && mr(e, o, a, h, c);
  }
}
function mr(e, t, i, r, s) {
  if (s = _r(t, s, i, r), Yt && (s = Yt(s, i.target, i.kind, t)), i.kind == "attribute")
    e._valueToNodeAttribute(t, s, i.target);
  else {
    let n = i.target;
    t.__isPropertyEffectsClient && t.__dataHasAccessor && t.__dataHasAccessor[n] ? (!t[_.READ_ONLY] || !t[_.READ_ONLY][n]) && t._setPendingProperty(n, s) && e._enqueueClient(t) : e._setUnmanagedPropertyToNode(t, n, s);
  }
}
function _r(e, t, i, r) {
  if (i.isCompound) {
    let s = e.__dataCompoundStorage[i.target];
    s[r.compoundIndex] = t, t = s.join("");
  }
  return i.kind !== "attribute" && (i.target === "textContent" || i.target === "value" && (e.localName === "input" || e.localName === "textarea")) && (t = t == null ? "" : t), t;
}
function vr(e) {
  return Boolean(e.target) && e.kind != "attribute" && e.kind != "text" && !e.isCompound && e.parts[0].mode === "{";
}
function gr(e, t) {
  let { nodeList: i, nodeInfoList: r } = t;
  if (r.length)
    for (let s = 0; s < r.length; s++) {
      let n = r[s], l = i[s], o = n.bindings;
      if (o)
        for (let a = 0; a < o.length; a++) {
          let h = o[a];
          yr(l, h), zr(l, e, h);
        }
      l.__dataHost = e;
    }
}
function yr(e, t) {
  if (t.isCompound) {
    let i = e.__dataCompoundStorage || (e.__dataCompoundStorage = {}), r = t.parts, s = new Array(r.length);
    for (let l = 0; l < r.length; l++)
      s[l] = r[l].literal;
    let n = t.target;
    i[n] = s, t.literal && t.kind == "property" && (n === "className" && (e = u(e)), e[n] = t.literal);
  }
}
function zr(e, t, i) {
  if (i.listenerEvent) {
    let r = i.parts[0];
    e.addEventListener(i.listenerEvent, function(s) {
      lr(s, t, i.target, r.source, r.negate);
    });
  }
}
function D1(e, t, i, r, s, n) {
  n = t.static || n && (typeof n != "object" || n[t.methodName]);
  let l = {
    methodName: t.methodName,
    args: t.args,
    methodInfo: s,
    dynamicFn: n
  };
  for (let o = 0, a; o < t.args.length && (a = t.args[o]); o++)
    a.literal || e._addPropertyEffect(a.rootProperty, i, {
      fn: r,
      info: l,
      trigger: a
    });
  return n && e._addPropertyEffect(t.methodName, i, {
    fn: r,
    info: l
  }), l;
}
function Ee(e, t, i, r, s) {
  let n = e._methodHost || e, l = n[s.methodName];
  if (l) {
    let o = e._marshalArgs(s.args, t, i);
    return o === Pt ? Pt : l.apply(n, o);
  } else
    s.dynamicFn || console.warn("method `" + s.methodName + "` not defined");
}
const br = [], Ui = "(?:[a-zA-Z_$][\\w.:$\\-*]*)", Cr = "(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)", Mr = "(?:'(?:[^'\\\\]|\\\\.)*')", wr = '(?:"(?:[^"\\\\]|\\\\.)*")', Hr = "(?:" + Mr + "|" + wr + ")", R1 = "(?:(" + Ui + "|" + Cr + "|" + Hr + ")\\s*)", Sr = "(?:" + R1 + "(?:,\\s*" + R1 + ")*)", Pr = "(?:\\(\\s*(?:" + Sr + "?)\\)\\s*)", Vr = "(" + Ui + "\\s*" + Pr + "?)", Lr = "(\\[\\[|{{)\\s*", Er = "(?:]]|}})", Ar = "(?:(!)\\s*)?", xr = Lr + Ar + Vr + Er, F1 = new RegExp(xr, "g");
function B1(e) {
  let t = "";
  for (let i = 0; i < e.length; i++)
    t += e[i].literal || "";
  return t;
}
function _e(e) {
  let t = e.match(/([^\s]+?)\(([\s\S]*)\)/);
  if (t) {
    let r = { methodName: t[1], static: !0, args: br };
    if (t[2].trim()) {
      let s = t[2].replace(/\\,/g, "&comma;").split(",");
      return Tr(s, r);
    } else
      return r;
  }
  return null;
}
function Tr(e, t) {
  return t.args = e.map(function(i) {
    let r = ji(i);
    return r.literal || (t.static = !1), r;
  }, this), t;
}
function ji(e) {
  let t = e.trim().replace(/&comma;/g, ",").replace(/\\(.)/g, "$1"), i = {
    name: t,
    value: "",
    literal: !1
  }, r = t[0];
  switch (r === "-" && (r = t[1]), r >= "0" && r <= "9" && (r = "#"), r) {
    case "'":
    case '"':
      i.value = t.slice(1, -1), i.literal = !0;
      break;
    case "#":
      i.value = Number(t), i.literal = !0;
      break;
  }
  return i.literal || (i.rootProperty = x(t), i.structured = Ve(t), i.structured && (i.wildcard = t.slice(-2) == ".*", i.wildcard && (i.name = t.slice(0, -2)))), i;
}
function U1(e, t, i) {
  let r = C(e, i);
  return r === void 0 && (r = t[i]), r;
}
function qi(e, t, i, r) {
  const s = { indexSplices: r };
  Se && !e._overrideLegacyUndefined && (t.splices = s), e.notifyPath(i + ".splices", s), e.notifyPath(i + ".length", t.length), Se && !e._overrideLegacyUndefined && (s.indexSplices = []);
}
function rt(e, t, i, r, s, n) {
  qi(e, t, i, [{
    index: r,
    addedCount: s,
    removed: n,
    object: t,
    type: "splice"
  }]);
}
function Or(e) {
  return e[0].toUpperCase() + e.substring(1);
}
const te = P((e) => {
  const t = tr($i(e));
  class i extends t {
    constructor() {
      super(), this.__isPropertyEffectsClient = !0, this.__dataClientsReady, this.__dataPendingClients, this.__dataToNotify, this.__dataLinkedPaths, this.__dataHasPaths, this.__dataCompoundStorage, this.__dataHost, this.__dataTemp, this.__dataClientsInitialized, this.__data, this.__dataPending, this.__dataOld, this.__computeEffects, this.__computeInfo, this.__reflectEffects, this.__notifyEffects, this.__propagateEffects, this.__observeEffects, this.__readOnly, this.__templateInfo, this._overrideLegacyUndefined;
    }
    get PROPERTY_EFFECT_TYPES() {
      return _;
    }
    _initializeProperties() {
      super._initializeProperties(), this._registerHost(), this.__dataClientsReady = !1, this.__dataPendingClients = null, this.__dataToNotify = null, this.__dataLinkedPaths = null, this.__dataHasPaths = !1, this.__dataCompoundStorage = this.__dataCompoundStorage || null, this.__dataHost = this.__dataHost || null, this.__dataTemp = {}, this.__dataClientsInitialized = !1;
    }
    _registerHost() {
      if (nt.length) {
        let s = nt[nt.length - 1];
        s._enqueueClient(this), this.__dataHost = s;
      }
    }
    _initializeProtoProperties(s) {
      this.__data = Object.create(s), this.__dataPending = Object.create(s), this.__dataOld = {};
    }
    _initializeInstanceProperties(s) {
      let n = this[_.READ_ONLY];
      for (let l in s)
        (!n || !n[l]) && (this.__dataPending = this.__dataPending || {}, this.__dataOld = this.__dataOld || {}, this.__data[l] = this.__dataPending[l] = s[l]);
    }
    _addPropertyEffect(s, n, l) {
      this._createPropertyAccessor(s, n == _.READ_ONLY);
      let o = fe(this, n, !0)[s];
      o || (o = this[n][s] = []), o.push(l);
    }
    _removePropertyEffect(s, n, l) {
      let o = fe(this, n, !0)[s], a = o.indexOf(l);
      a >= 0 && o.splice(a, 1);
    }
    _hasPropertyEffect(s, n) {
      let l = this[n];
      return Boolean(l && l[s]);
    }
    _hasReadOnlyEffect(s) {
      return this._hasPropertyEffect(s, _.READ_ONLY);
    }
    _hasNotifyEffect(s) {
      return this._hasPropertyEffect(s, _.NOTIFY);
    }
    _hasReflectEffect(s) {
      return this._hasPropertyEffect(s, _.REFLECT);
    }
    _hasComputedEffect(s) {
      return this._hasPropertyEffect(s, _.COMPUTE);
    }
    _setPendingPropertyOrPath(s, n, l, o) {
      if (o || x(Array.isArray(s) ? s[0] : s) !== s) {
        if (!o) {
          let a = C(this, s);
          if (s = O1(this, s, n), !s || !super._shouldPropertyChange(s, n, a))
            return !1;
        }
        if (this.__dataHasPaths = !0, this._setPendingProperty(s, n, l))
          return pr(this, s, n), !0;
      } else {
        if (this.__dataHasAccessor && this.__dataHasAccessor[s])
          return this._setPendingProperty(s, n, l);
        this[s] = n;
      }
      return !1;
    }
    _setUnmanagedPropertyToNode(s, n, l) {
      (l !== s[n] || typeof l == "object") && (n === "className" && (s = u(s)), s[n] = l);
    }
    _setPendingProperty(s, n, l) {
      let o = this.__dataHasPaths && Ve(s), a = o ? this.__dataTemp : this.__data;
      return this._shouldPropertyChange(s, n, a[s]) ? (this.__dataPending || (this.__dataPending = {}, this.__dataOld = {}), s in this.__dataOld || (this.__dataOld[s] = this.__data[s]), o ? this.__dataTemp[s] = n : this.__data[s] = n, this.__dataPending[s] = n, (o || this[_.NOTIFY] && this[_.NOTIFY][s]) && (this.__dataToNotify = this.__dataToNotify || {}, this.__dataToNotify[s] = l), !0) : !1;
    }
    _setProperty(s, n) {
      this._setPendingProperty(s, n, !0) && this._invalidateProperties();
    }
    _invalidateProperties() {
      this.__dataReady && this._flushProperties();
    }
    _enqueueClient(s) {
      this.__dataPendingClients = this.__dataPendingClients || [], s !== this && this.__dataPendingClients.push(s);
    }
    _flushClients() {
      this.__dataClientsReady ? this.__enableOrFlushClients() : (this.__dataClientsReady = !0, this._readyClients(), this.__dataReady = !0);
    }
    __enableOrFlushClients() {
      let s = this.__dataPendingClients;
      if (s) {
        this.__dataPendingClients = null;
        for (let n = 0; n < s.length; n++) {
          let l = s[n];
          l.__dataEnabled ? l.__dataPending && l._flushProperties() : l._enableProperties();
        }
      }
    }
    _readyClients() {
      this.__enableOrFlushClients();
    }
    setProperties(s, n) {
      for (let l in s)
        (n || !this[_.READ_ONLY] || !this[_.READ_ONLY][l]) && this._setPendingPropertyOrPath(l, s[l], !0);
      this._invalidateProperties();
    }
    ready() {
      this._flushProperties(), this.__dataClientsReady || this._flushClients(), this.__dataPending && this._flushProperties();
    }
    _propertiesChanged(s, n, l) {
      let o = this.__dataHasPaths;
      this.__dataHasPaths = !1;
      let a;
      ar(this, n, l, o), a = this.__dataToNotify, this.__dataToNotify = null, this._propagatePropertyChanges(n, l, o), this._flushClients(), ct(this, this[_.REFLECT], n, l, o), ct(this, this[_.OBSERVE], n, l, o), a && sr(this, a, n, l, o), this.__dataCounter == 1 && (this.__dataTemp = {});
    }
    _propagatePropertyChanges(s, n, l) {
      this[_.PROPAGATE] && ct(this, this[_.PROPAGATE], s, n, l), this.__templateInfo && this._runEffectsForTemplate(this.__templateInfo, s, n, l);
    }
    _runEffectsForTemplate(s, n, l, o) {
      const a = (h, c) => {
        ct(
          this,
          s.propertyEffects,
          h,
          l,
          c,
          s.nodeList
        );
        for (let d = s.firstChild; d; d = d.nextSibling)
          this._runEffectsForTemplate(d, h, l, c);
      };
      s.runEffects ? s.runEffects(a, n, o) : a(n, o);
    }
    linkPaths(s, n) {
      s = ht(s), n = ht(n), this.__dataLinkedPaths = this.__dataLinkedPaths || {}, this.__dataLinkedPaths[s] = n;
    }
    unlinkPaths(s) {
      s = ht(s), this.__dataLinkedPaths && delete this.__dataLinkedPaths[s];
    }
    notifySplices(s, n) {
      let l = { path: "" }, o = C(this, s, l);
      qi(this, o, l.path, n);
    }
    get(s, n) {
      return C(n || this, s);
    }
    set(s, n, l) {
      l ? O1(l, s, n) : (!this[_.READ_ONLY] || !this[_.READ_ONLY][s]) && this._setPendingPropertyOrPath(s, n, !0) && this._invalidateProperties();
    }
    push(s, ...n) {
      let l = { path: "" }, o = C(this, s, l), a = o.length, h = o.push(...n);
      return n.length && rt(this, o, l.path, a, n.length, []), h;
    }
    pop(s) {
      let n = { path: "" }, l = C(this, s, n), o = Boolean(l.length), a = l.pop();
      return o && rt(this, l, n.path, l.length, 0, [a]), a;
    }
    splice(s, n, l, ...o) {
      let a = { path: "" }, h = C(this, s, a);
      n < 0 ? n = h.length - Math.floor(-n) : n && (n = Math.floor(n));
      let c;
      return arguments.length === 2 ? c = h.splice(n) : c = h.splice(n, l, ...o), (o.length || c.length) && rt(this, h, a.path, n, o.length, c), c;
    }
    shift(s) {
      let n = { path: "" }, l = C(this, s, n), o = Boolean(l.length), a = l.shift();
      return o && rt(this, l, n.path, 0, 0, [a]), a;
    }
    unshift(s, ...n) {
      let l = { path: "" }, o = C(this, s, l), a = o.unshift(...n);
      return n.length && rt(this, o, l.path, 0, n.length, []), a;
    }
    notifyPath(s, n) {
      let l;
      if (arguments.length == 1) {
        let o = { path: "" };
        n = C(this, s, o), l = o.path;
      } else
        Array.isArray(s) ? l = ht(s) : l = s;
      this._setPendingPropertyOrPath(l, n, !0, !0) && this._invalidateProperties();
    }
    _createReadOnlyProperty(s, n) {
      this._addPropertyEffect(s, _.READ_ONLY), n && (this["_set" + Or(s)] = function(l) {
        this._setProperty(s, l);
      });
    }
    _createPropertyObserver(s, n, l) {
      let o = { property: s, method: n, dynamicFn: Boolean(l) };
      this._addPropertyEffect(s, _.OBSERVE, {
        fn: I1,
        info: o,
        trigger: { name: s }
      }), l && this._addPropertyEffect(n, _.OBSERVE, {
        fn: I1,
        info: o,
        trigger: { name: n }
      });
    }
    _createMethodObserver(s, n) {
      let l = _e(s);
      if (!l)
        throw new Error("Malformed observer expression '" + s + "'");
      D1(this, l, _.OBSERVE, Ee, null, n);
    }
    _createNotifyingProperty(s) {
      this._addPropertyEffect(s, _.NOTIFY, {
        fn: nr,
        info: {
          eventName: Qt(s) + "-changed",
          property: s
        }
      });
    }
    _createReflectedProperty(s) {
      let n = this.constructor.attributeNameForProperty(s);
      n[0] === "-" ? console.warn("Property " + s + " cannot be reflected to attribute " + n + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.') : this._addPropertyEffect(s, _.REFLECT, {
        fn: or,
        info: {
          attrName: n
        }
      });
    }
    _createComputedProperty(s, n, l) {
      let o = _e(n);
      if (!o)
        throw new Error("Malformed computed expression '" + n + "'");
      const a = D1(this, o, _.COMPUTE, Bi, s, l);
      fe(this, Ri)[s] = a;
    }
    _marshalArgs(s, n, l) {
      const o = this.__data, a = [];
      for (let h = 0, c = s.length; h < c; h++) {
        let { name: d, structured: p, wildcard: f, value: m, literal: g } = s[h];
        if (!g)
          if (f) {
            const V = wt(d, n), z = U1(o, l, V ? n : d);
            m = {
              path: V ? n : d,
              value: z,
              base: V ? C(o, d) : z
            };
          } else
            m = p ? U1(o, l, d) : o[d];
        if (Se && !this._overrideLegacyUndefined && m === void 0 && s.length > 1)
          return Pt;
        a[h] = m;
      }
      return a;
    }
    static addPropertyEffect(s, n, l) {
      this.prototype._addPropertyEffect(s, n, l);
    }
    static createPropertyObserver(s, n, l) {
      this.prototype._createPropertyObserver(s, n, l);
    }
    static createMethodObserver(s, n) {
      this.prototype._createMethodObserver(s, n);
    }
    static createNotifyingProperty(s) {
      this.prototype._createNotifyingProperty(s);
    }
    static createReadOnlyProperty(s, n) {
      this.prototype._createReadOnlyProperty(s, n);
    }
    static createReflectedProperty(s) {
      this.prototype._createReflectedProperty(s);
    }
    static createComputedProperty(s, n, l) {
      this.prototype._createComputedProperty(s, n, l);
    }
    static bindTemplate(s) {
      return this.prototype._bindTemplate(s);
    }
    _bindTemplate(s, n) {
      let l = this.constructor._parseTemplate(s), o = this.__preBoundTemplateInfo == l;
      if (!o)
        for (let a in l.propertyEffects)
          this._createPropertyAccessor(a);
      if (n)
        if (l = Object.create(l), l.wasPreBound = o, !this.__templateInfo)
          this.__templateInfo = l;
        else {
          const a = s._parentTemplateInfo || this.__templateInfo, h = a.lastChild;
          l.parent = a, a.lastChild = l, l.previousSibling = h, h ? h.nextSibling = l : a.firstChild = l;
        }
      else
        this.__preBoundTemplateInfo = l;
      return l;
    }
    static _addTemplatePropertyEffect(s, n, l) {
      let o = s.hostProps = s.hostProps || {};
      o[n] = !0;
      let a = s.propertyEffects = s.propertyEffects || {};
      (a[n] = a[n] || []).push(l);
    }
    _stampTemplate(s, n) {
      n = n || this._bindTemplate(s, !0), nt.push(this);
      let l = super._stampTemplate(s, n);
      if (nt.pop(), n.nodeList = l.nodeList, !n.wasPreBound) {
        let o = n.childNodes = [];
        for (let a = l.firstChild; a; a = a.nextSibling)
          o.push(a);
      }
      return l.templateInfo = n, gr(this, n), this.__dataClientsReady && (this._runEffectsForTemplate(n, this.__data, null, !1), this._flushClients()), l;
    }
    _removeBoundDom(s) {
      const n = s.templateInfo, { previousSibling: l, nextSibling: o, parent: a } = n;
      l ? l.nextSibling = o : a && (a.firstChild = o), o ? o.previousSibling = l : a && (a.lastChild = l), n.nextSibling = n.previousSibling = null;
      let h = n.childNodes;
      for (let c = 0; c < h.length; c++) {
        let d = h[c];
        u(u(d).parentNode).removeChild(d);
      }
    }
    static _parseTemplateNode(s, n, l) {
      let o = t._parseTemplateNode.call(
        this,
        s,
        n,
        l
      );
      if (s.nodeType === Node.TEXT_NODE) {
        let a = this._parseBindings(s.textContent, n);
        a && (s.textContent = B1(a) || " ", me(this, n, l, "text", "textContent", a), o = !0);
      }
      return o;
    }
    static _parseTemplateNodeAttribute(s, n, l, o, a) {
      let h = this._parseBindings(a, n);
      if (h) {
        let c = o, d = "property";
        er.test(o) ? d = "attribute" : o[o.length - 1] == "$" && (o = o.slice(0, -1), d = "attribute");
        let p = B1(h);
        return p && d == "attribute" && (o == "class" && s.hasAttribute("class") && (p += " " + s.getAttribute(o)), s.setAttribute(o, p)), d == "attribute" && c == "disable-upgrade$" && s.setAttribute(o, ""), s.localName === "input" && c === "value" && s.setAttribute(c, ""), s.removeAttribute(c), d === "property" && (o = Ti(o)), me(this, n, l, d, o, h, p), !0;
      } else
        return t._parseTemplateNodeAttribute.call(
          this,
          s,
          n,
          l,
          o,
          a
        );
    }
    static _parseTemplateNestedTemplate(s, n, l) {
      let o = t._parseTemplateNestedTemplate.call(
        this,
        s,
        n,
        l
      );
      const a = s.parentNode, h = l.templateInfo, c = a.localName === "dom-if", d = a.localName === "dom-repeat";
      L1 && (c || d) && (a.removeChild(s), l = l.parentInfo, l.templateInfo = h, l.noted = !0, o = !1);
      let p = h.hostProps;
      if (Li && c)
        p && (n.hostProps = Object.assign(n.hostProps || {}, p), L1 || (l.parentInfo.noted = !0));
      else {
        let f = "{";
        for (let m in p) {
          let g = [{ mode: f, source: m, dependencies: [m], hostProp: !0 }];
          me(this, n, l, "property", "_host_" + m, g);
        }
      }
      return o;
    }
    static _parseBindings(s, n) {
      let l = [], o = 0, a;
      for (; (a = F1.exec(s)) !== null; ) {
        a.index > o && l.push({ literal: s.slice(o, a.index) });
        let h = a[1][0], c = Boolean(a[2]), d = a[3].trim(), p = !1, f = "", m = -1;
        h == "{" && (m = d.indexOf("::")) > 0 && (f = d.substring(m + 2), d = d.substring(0, m), p = !0);
        let g = _e(d), V = [];
        if (g) {
          let { args: z, methodName: w } = g;
          for (let re = 0; re < z.length; re++) {
            let o1 = z[re];
            o1.literal || V.push(o1);
          }
          let j = n.dynamicFns;
          (j && j[w] || g.static) && (V.push(w), g.dynamicFn = !0);
        } else
          V.push(d);
        l.push({
          source: d,
          mode: h,
          negate: c,
          customEvent: p,
          signature: g,
          dependencies: V,
          event: f
        }), o = F1.lastIndex;
      }
      if (o && o < s.length) {
        let h = s.substring(o);
        h && l.push({
          literal: h
        });
      }
      return l.length ? l : null;
    }
    static _evaluateBinding(s, n, l, o, a, h) {
      let c;
      return n.signature ? c = Ee(s, l, o, a, n.signature) : l != n.source ? c = C(s, n.source) : h && Ve(l) ? c = C(s, l) : c = s.__data[l], n.negate && (c = !c), c;
    }
  }
  return i;
}), nt = [];
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Nr(e) {
  const t = {};
  for (let i in e) {
    const r = e[i];
    t[i] = typeof r == "function" ? { type: r } : r;
  }
  return t;
}
const kr = P((e) => {
  const t = ki(e);
  function i(n) {
    const l = Object.getPrototypeOf(n);
    return l.prototype instanceof s ? l : null;
  }
  function r(n) {
    if (!n.hasOwnProperty(JSCompiler_renameProperty("__ownProperties", n))) {
      let l = null;
      if (n.hasOwnProperty(JSCompiler_renameProperty("properties", n))) {
        const o = n.properties;
        o && (l = Nr(o));
      }
      n.__ownProperties = l;
    }
    return n.__ownProperties;
  }
  class s extends t {
    static get observedAttributes() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes", this))) {
        this.prototype;
        const l = this._properties;
        this.__observedAttributes = l ? Object.keys(l).map((o) => this.prototype._addPropertyToAttributeMap(o)) : [];
      }
      return this.__observedAttributes;
    }
    static finalize() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("__finalized", this))) {
        const l = i(this);
        l && l.finalize(), this.__finalized = !0, this._finalizeClass();
      }
    }
    static _finalizeClass() {
      const l = r(this);
      l && this.createProperties(l);
    }
    static get _properties() {
      if (!this.hasOwnProperty(
        JSCompiler_renameProperty("__properties", this)
      )) {
        const l = i(this);
        this.__properties = Object.assign(
          {},
          l && l._properties,
          r(this)
        );
      }
      return this.__properties;
    }
    static typeForProperty(l) {
      const o = this._properties[l];
      return o && o.type;
    }
    _initializeProperties() {
      this.constructor.finalize(), super._initializeProperties();
    }
    connectedCallback() {
      super.connectedCallback && super.connectedCallback(), this._enableProperties();
    }
    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();
    }
  }
  return s;
});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
const Ir = "3.5.1", Ae = window.ShadyCSS && window.ShadyCSS.cssBuild, ee = P((e) => {
  const t = kr(te(e));
  function i(a) {
    if (!a.hasOwnProperty(
      JSCompiler_renameProperty("__propertyDefaults", a)
    )) {
      a.__propertyDefaults = null;
      let h = a._properties;
      for (let c in h) {
        let d = h[c];
        "value" in d && (a.__propertyDefaults = a.__propertyDefaults || {}, a.__propertyDefaults[c] = d);
      }
    }
    return a.__propertyDefaults;
  }
  function r(a) {
    return a.hasOwnProperty(
      JSCompiler_renameProperty("__ownObservers", a)
    ) || (a.__ownObservers = a.hasOwnProperty(
      JSCompiler_renameProperty("observers", a)
    ) ? a.observers : null), a.__ownObservers;
  }
  function s(a, h, c, d) {
    c.computed && (c.readOnly = !0), c.computed && (a._hasReadOnlyEffect(h) ? console.warn(`Cannot redefine computed property '${h}'.`) : a._createComputedProperty(h, c.computed, d)), c.readOnly && !a._hasReadOnlyEffect(h) ? a._createReadOnlyProperty(h, !c.computed) : c.readOnly === !1 && a._hasReadOnlyEffect(h) && console.warn(`Cannot make readOnly property '${h}' non-readOnly.`), c.reflectToAttribute && !a._hasReflectEffect(h) ? a._createReflectedProperty(h) : c.reflectToAttribute === !1 && a._hasReflectEffect(h) && console.warn(`Cannot make reflected property '${h}' non-reflected.`), c.notify && !a._hasNotifyEffect(h) ? a._createNotifyingProperty(h) : c.notify === !1 && a._hasNotifyEffect(h) && console.warn(`Cannot make notify property '${h}' non-notify.`), c.observer && a._createPropertyObserver(h, c.observer, d[c.observer]), a._addPropertyToAttributeMap(h);
  }
  function n(a, h, c, d) {
    if (!Ae) {
      const p = h.content.querySelectorAll("style"), f = Je(h), m = A2(c), g = h.content.firstElementChild;
      for (let z = 0; z < m.length; z++) {
        let w = m[z];
        w.textContent = a._processStyleText(w.textContent, d), h.content.insertBefore(w, g);
      }
      let V = 0;
      for (let z = 0; z < f.length; z++) {
        let w = f[z], j = p[V];
        j !== w ? (w = w.cloneNode(!0), j.parentNode.insertBefore(w, j)) : V++, w.textContent = a._processStyleText(w.textContent, d);
      }
    }
    if (window.ShadyCSS && window.ShadyCSS.prepareTemplate(h, c), w2 && Ae && g2) {
      const p = h.content.querySelectorAll("style");
      if (p) {
        let f = "";
        Array.from(p).forEach((m) => {
          f += m.textContent, m.parentNode.removeChild(m);
        }), a._styleSheet = new CSSStyleSheet(), a._styleSheet.replaceSync(f);
      }
    }
  }
  function l(a) {
    let h = null;
    if (a && (!it || b2) && (h = Mt.import(a, "template"), it && !h))
      throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${a}`);
    return h;
  }
  class o extends t {
    static get polymerElementVersion() {
      return Ir;
    }
    static _finalizeClass() {
      t._finalizeClass.call(this);
      const h = r(this);
      h && this.createObservers(h, this._properties), this._prepareTemplate();
    }
    static _prepareTemplate() {
      let h = this.template;
      h && (typeof h == "string" ? (console.error("template getter must return HTMLTemplateElement"), h = null) : Ct || (h = h.cloneNode(!0))), this.prototype._template = h;
    }
    static createProperties(h) {
      for (let c in h)
        s(
          this.prototype,
          c,
          h[c],
          h
        );
    }
    static createObservers(h, c) {
      const d = this.prototype;
      for (let p = 0; p < h.length; p++)
        d._createMethodObserver(h[p], c);
    }
    static get template() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("_template", this))) {
        let h = this.prototype.hasOwnProperty(
          JSCompiler_renameProperty("_template", this.prototype)
        ) ? this.prototype._template : void 0;
        typeof h == "function" && (h = h()), this._template = h !== void 0 ? h : this.hasOwnProperty(JSCompiler_renameProperty("is", this)) && l(this.is) || Object.getPrototypeOf(this.prototype).constructor.template;
      }
      return this._template;
    }
    static set template(h) {
      this._template = h;
    }
    static get importPath() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("_importPath", this))) {
        const h = this.importMeta;
        if (h)
          this._importPath = je(h.url);
        else {
          const c = Mt.import(this.is);
          this._importPath = c && c.assetpath || Object.getPrototypeOf(this.prototype).constructor.importPath;
        }
      }
      return this._importPath;
    }
    constructor() {
      super(), this._template, this._importPath, this.rootPath, this.importPath, this.root, this.$;
    }
    _initializeProperties() {
      this.constructor.finalize(), this.constructor._finalizeTemplate(this.localName), super._initializeProperties(), this.rootPath = y2, this.importPath = this.constructor.importPath;
      let h = i(this.constructor);
      if (!!h)
        for (let c in h) {
          let d = h[c];
          if (this._canApplyPropertyDefault(c)) {
            let p = typeof d.value == "function" ? d.value.call(this) : d.value;
            this._hasAccessor(c) ? this._setPendingProperty(c, p, !0) : this[c] = p;
          }
        }
    }
    _canApplyPropertyDefault(h) {
      return !this.hasOwnProperty(h);
    }
    static _processStyleText(h, c) {
      return Ue(h, c);
    }
    static _finalizeTemplate(h) {
      const c = this.prototype._template;
      if (c && !c.__polymerFinalized) {
        c.__polymerFinalized = !0;
        const d = this.importPath, p = d ? ft(d) : "";
        n(this, c, h, p), this.prototype._bindTemplate(c);
      }
    }
    connectedCallback() {
      window.ShadyCSS && this._template && window.ShadyCSS.styleElement(this), super.connectedCallback();
    }
    ready() {
      this._template && (this.root = this._stampTemplate(this._template), this.$ = this.root.$), super.ready();
    }
    _readyClients() {
      this._template && (this.root = this._attachDom(this.root)), super._readyClients();
    }
    _attachDom(h) {
      const c = u(this);
      if (c.attachShadow)
        return h ? (c.shadowRoot || (c.attachShadow({ mode: "open", shadyUpgradeFragment: h }), c.shadowRoot.appendChild(h), this.constructor._styleSheet && (c.shadowRoot.adoptedStyleSheets = [this.constructor._styleSheet])), C2 && window.ShadyDOM && window.ShadyDOM.flushInitial(c.shadowRoot), c.shadowRoot) : null;
      throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.");
    }
    updateStyles(h) {
      window.ShadyCSS && window.ShadyCSS.styleSubtree(this, h);
    }
    resolveUrl(h, c) {
      return !c && this.importPath && (c = ft(this.importPath)), ft(h, c);
    }
    static _parseTemplateContent(h, c, d) {
      return c.dynamicFns = c.dynamicFns || this._properties, t._parseTemplateContent.call(
        this,
        h,
        c,
        d
      );
    }
    static _addTemplatePropertyEffect(h, c, d) {
      return Vi && !(c in this._properties) && !(d.info.part.signature && d.info.part.signature.static) && !d.info.part.hostProp && !h.nestedTemplate && console.warn(`Property '${c}' used in template but not declared in 'properties'; attribute will not be observed.`), t._addTemplatePropertyEffect.call(
        this,
        h,
        c,
        d
      );
    }
  }
  return o;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class B {
  constructor() {
    this._asyncModule = null, this._callback = null, this._timer = null;
  }
  setConfig(t, i) {
    this._asyncModule = t, this._callback = i, this._timer = this._asyncModule.run(() => {
      this._timer = null, Vt.delete(this), this._callback();
    });
  }
  cancel() {
    this.isActive() && (this._cancelAsync(), Vt.delete(this));
  }
  _cancelAsync() {
    this.isActive() && (this._asyncModule.cancel(this._timer), this._timer = null);
  }
  flush() {
    this.isActive() && (this.cancel(), this._callback());
  }
  isActive() {
    return this._timer != null;
  }
  static debounce(t, i, r) {
    return t instanceof B ? t._cancelAsync() : t = new B(), t.setConfig(i, r), t;
  }
}
let Vt = /* @__PURE__ */ new Set();
const Yi = function(e) {
  Vt.add(e);
}, $r = function() {
  const e = Boolean(Vt.size);
  return Vt.forEach((t) => {
    try {
      t.flush();
    } catch (i) {
      setTimeout(() => {
        throw i;
      });
    }
  }), e;
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let We = typeof document.head.style.touchAction == "string", Xt = "__polymerGestures", $t = "__polymerGesturesHandled", xe = "__polymerGesturesTouchAction", j1 = 25, q1 = 5, Dr = 2, Rr = 2500, Ji = ["mousedown", "mousemove", "mouseup", "click"], Fr = [0, 1, 4, 2], Br = function() {
  try {
    return new MouseEvent("test", { buttons: 1 }).buttons === 1;
  } catch {
    return !1;
  }
}();
function Ke(e) {
  return Ji.indexOf(e) > -1;
}
let Ze = !1;
(function() {
  try {
    let e = Object.defineProperty({}, "passive", { get() {
      Ze = !0;
    } });
    window.addEventListener("test", null, e), window.removeEventListener("test", null, e);
  } catch {
  }
})();
function Xi(e) {
  if (!(Ke(e) || e === "touchend") && We && Ze && z2)
    return { passive: !0 };
}
let Gi = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
const Te = [], Ur = {
  button: !0,
  input: !0,
  keygen: !0,
  meter: !0,
  output: !0,
  textarea: !0,
  progress: !0,
  select: !0
}, jr = {
  button: !0,
  command: !0,
  fieldset: !0,
  input: !0,
  keygen: !0,
  optgroup: !0,
  option: !0,
  select: !0,
  textarea: !0
};
function qr(e) {
  return Ur[e.localName] || !1;
}
function Yr(e) {
  let t = Array.prototype.slice.call(e.labels || []);
  if (!t.length) {
    t = [];
    try {
      let i = e.getRootNode();
      if (e.id) {
        let r = i.querySelectorAll(`label[for = '${e.id}']`);
        for (let s = 0; s < r.length; s++)
          t.push(r[s]);
      }
    } catch {
    }
  }
  return t;
}
let Y1 = function(e) {
  let t = e.sourceCapabilities;
  if (!(t && !t.firesTouchEvents) && (e[$t] = { skip: !0 }, e.type === "click")) {
    let i = !1, r = ie(e);
    for (let s = 0; s < r.length; s++) {
      if (r[s].nodeType === Node.ELEMENT_NODE) {
        if (r[s].localName === "label")
          Te.push(r[s]);
        else if (qr(r[s])) {
          let n = Yr(r[s]);
          for (let l = 0; l < n.length; l++)
            i = i || Te.indexOf(n[l]) > -1;
        }
      }
      if (r[s] === b.mouse.target)
        return;
    }
    if (i)
      return;
    e.preventDefault(), e.stopPropagation();
  }
};
function J1(e) {
  let t = Gi ? ["click"] : Ji;
  for (let i = 0, r; i < t.length; i++)
    r = t[i], e ? (Te.length = 0, document.addEventListener(r, Y1, !0)) : document.removeEventListener(r, Y1, !0);
}
function Jr(e) {
  b.mouse.mouseIgnoreJob || J1(!0);
  let t = function() {
    J1(), b.mouse.target = null, b.mouse.mouseIgnoreJob = null;
  };
  b.mouse.target = ie(e)[0], b.mouse.mouseIgnoreJob = B.debounce(
    b.mouse.mouseIgnoreJob,
    mt.after(Rr),
    t
  );
}
function F(e) {
  let t = e.type;
  if (!Ke(t))
    return !1;
  if (t === "mousemove") {
    let i = e.buttons === void 0 ? 1 : e.buttons;
    return e instanceof window.MouseEvent && !Br && (i = Fr[e.which] || 0), Boolean(i & 1);
  } else
    return (e.button === void 0 ? 0 : e.button) === 0;
}
function Xr(e) {
  if (e.type === "click") {
    if (e.detail === 0)
      return !0;
    let t = k(e);
    if (!t.nodeType || t.nodeType !== Node.ELEMENT_NODE)
      return !0;
    let i = t.getBoundingClientRect(), r = e.pageX, s = e.pageY;
    return !(r >= i.left && r <= i.right && s >= i.top && s <= i.bottom);
  }
  return !1;
}
let b = {
  mouse: {
    target: null,
    mouseIgnoreJob: null
  },
  touch: {
    x: 0,
    y: 0,
    id: -1,
    scrollDecided: !1
  }
};
function Gr(e) {
  let t = "auto", i = ie(e);
  for (let r = 0, s; r < i.length; r++)
    if (s = i[r], s[xe]) {
      t = s[xe];
      break;
    }
  return t;
}
function Wi(e, t, i) {
  e.movefn = t, e.upfn = i, document.addEventListener("mousemove", t), document.addEventListener("mouseup", i);
}
function W(e) {
  document.removeEventListener("mousemove", e.movefn), document.removeEventListener("mouseup", e.upfn), e.movefn = null, e.upfn = null;
}
document.addEventListener("touchend", Jr, Ze ? { passive: !0 } : !1);
const ie = window.ShadyDOM && window.ShadyDOM.noPatch ? window.ShadyDOM.composedPath : (e) => e.composedPath && e.composedPath() || [], At = {}, R = [];
function Wr(e, t) {
  let i = document.elementFromPoint(e, t), r = i;
  for (; r && r.shadowRoot && !window.ShadyDOM; ) {
    let s = r;
    if (r = r.shadowRoot.elementFromPoint(e, t), s === r)
      break;
    r && (i = r);
  }
  return i;
}
function k(e) {
  const t = ie(e);
  return t.length > 0 ? t[0] : e.target;
}
function Ki(e) {
  let t, i = e.type, s = e.currentTarget[Xt];
  if (!s)
    return;
  let n = s[i];
  if (!!n) {
    if (!e[$t] && (e[$t] = {}, i.slice(0, 5) === "touch")) {
      e = e;
      let l = e.changedTouches[0];
      if (i === "touchstart" && e.touches.length === 1 && (b.touch.id = l.identifier), b.touch.id !== l.identifier)
        return;
      We || (i === "touchstart" || i === "touchmove") && Kr(e);
    }
    if (t = e[$t], !t.skip) {
      for (let l = 0, o; l < R.length; l++)
        o = R[l], n[o.name] && !t[o.name] && o.flow && o.flow.start.indexOf(e.type) > -1 && o.reset && o.reset();
      for (let l = 0, o; l < R.length; l++)
        o = R[l], n[o.name] && !t[o.name] && (t[o.name] = !0, o[i](e));
    }
  }
}
function Kr(e) {
  let t = e.changedTouches[0], i = e.type;
  if (i === "touchstart")
    b.touch.x = t.clientX, b.touch.y = t.clientY, b.touch.scrollDecided = !1;
  else if (i === "touchmove") {
    if (b.touch.scrollDecided)
      return;
    b.touch.scrollDecided = !0;
    let r = Gr(e), s = !1, n = Math.abs(b.touch.x - t.clientX), l = Math.abs(b.touch.y - t.clientY);
    e.cancelable && (r === "none" ? s = !0 : r === "pan-x" ? s = l > n : r === "pan-y" && (s = n > l)), s ? e.preventDefault() : Gt("track");
  }
}
function Zr(e, t, i) {
  return At[t] ? (tn(e, t, i), !0) : !1;
}
function Qr(e, t, i) {
  return At[t] ? (en(e, t, i), !0) : !1;
}
function tn(e, t, i) {
  let r = At[t], s = r.deps, n = r.name, l = e[Xt];
  l || (e[Xt] = l = {});
  for (let o = 0, a, h; o < s.length; o++)
    a = s[o], !(Gi && Ke(a) && a !== "click") && (h = l[a], h || (l[a] = h = { _count: 0 }), h._count === 0 && e.addEventListener(a, Ki, Xi(a)), h[n] = (h[n] || 0) + 1, h._count = (h._count || 0) + 1);
  e.addEventListener(t, i), r.touchAction && Zi(e, r.touchAction);
}
function en(e, t, i) {
  let r = At[t], s = r.deps, n = r.name, l = e[Xt];
  if (l)
    for (let o = 0, a, h; o < s.length; o++)
      a = s[o], h = l[a], h && h[n] && (h[n] = (h[n] || 1) - 1, h._count = (h._count || 1) - 1, h._count === 0 && e.removeEventListener(a, Ki, Xi(a)));
  e.removeEventListener(t, i);
}
function Qe(e) {
  R.push(e);
  for (let t = 0; t < e.emits.length; t++)
    At[e.emits[t]] = e;
}
function sn(e) {
  for (let t = 0, i; t < R.length; t++) {
    i = R[t];
    for (let r = 0, s; r < i.emits.length; r++)
      if (s = i.emits[r], s === e)
        return i;
  }
  return null;
}
function Zi(e, t) {
  We && e instanceof HTMLElement && N.run(() => {
    e.style.touchAction = t;
  }), e[xe] = t;
}
function t1(e, t, i) {
  let r = new Event(t, { bubbles: !0, cancelable: !0, composed: !0 });
  if (r.detail = i, u(e).dispatchEvent(r), r.defaultPrevented) {
    let s = i.preventer || i.sourceEvent;
    s && s.preventDefault && s.preventDefault();
  }
}
function Gt(e) {
  let t = sn(e);
  t.info && (t.info.prevent = !0);
}
Qe({
  name: "downup",
  deps: ["mousedown", "touchstart", "touchend"],
  flow: {
    start: ["mousedown", "touchstart"],
    end: ["mouseup", "touchend"]
  },
  emits: ["down", "up"],
  info: {
    movefn: null,
    upfn: null
  },
  reset: function() {
    W(this.info);
  },
  mousedown: function(e) {
    if (!F(e))
      return;
    let t = k(e), i = this, r = function(l) {
      F(l) || (lt("up", t, l), W(i.info));
    }, s = function(l) {
      F(l) && lt("up", t, l), W(i.info);
    };
    Wi(this.info, r, s), lt("down", t, e);
  },
  touchstart: function(e) {
    lt("down", k(e), e.changedTouches[0], e);
  },
  touchend: function(e) {
    lt("up", k(e), e.changedTouches[0], e);
  }
});
function lt(e, t, i, r) {
  !t || t1(t, e, {
    x: i.clientX,
    y: i.clientY,
    sourceEvent: i,
    preventer: r,
    prevent: function(s) {
      return Gt(s);
    }
  });
}
Qe({
  name: "track",
  touchAction: "none",
  deps: ["mousedown", "touchstart", "touchmove", "touchend"],
  flow: {
    start: ["mousedown", "touchstart"],
    end: ["mouseup", "touchend"]
  },
  emits: ["track"],
  info: {
    x: 0,
    y: 0,
    state: "start",
    started: !1,
    moves: [],
    addMove: function(e) {
      this.moves.length > Dr && this.moves.shift(), this.moves.push(e);
    },
    movefn: null,
    upfn: null,
    prevent: !1
  },
  reset: function() {
    this.info.state = "start", this.info.started = !1, this.info.moves = [], this.info.x = 0, this.info.y = 0, this.info.prevent = !1, W(this.info);
  },
  mousedown: function(e) {
    if (!F(e))
      return;
    let t = k(e), i = this, r = function(l) {
      let o = l.clientX, a = l.clientY;
      X1(i.info, o, a) && (i.info.state = i.info.started ? l.type === "mouseup" ? "end" : "track" : "start", i.info.state === "start" && Gt("tap"), i.info.addMove({ x: o, y: a }), F(l) || (i.info.state = "end", W(i.info)), t && ve(i.info, t, l), i.info.started = !0);
    }, s = function(l) {
      i.info.started && r(l), W(i.info);
    };
    Wi(this.info, r, s), this.info.x = e.clientX, this.info.y = e.clientY;
  },
  touchstart: function(e) {
    let t = e.changedTouches[0];
    this.info.x = t.clientX, this.info.y = t.clientY;
  },
  touchmove: function(e) {
    let t = k(e), i = e.changedTouches[0], r = i.clientX, s = i.clientY;
    X1(this.info, r, s) && (this.info.state === "start" && Gt("tap"), this.info.addMove({ x: r, y: s }), ve(this.info, t, i), this.info.state = "track", this.info.started = !0);
  },
  touchend: function(e) {
    let t = k(e), i = e.changedTouches[0];
    this.info.started && (this.info.state = "end", this.info.addMove({ x: i.clientX, y: i.clientY }), ve(this.info, t, i));
  }
});
function X1(e, t, i) {
  if (e.prevent)
    return !1;
  if (e.started)
    return !0;
  let r = Math.abs(e.x - t), s = Math.abs(e.y - i);
  return r >= q1 || s >= q1;
}
function ve(e, t, i) {
  if (!t)
    return;
  let r = e.moves[e.moves.length - 2], s = e.moves[e.moves.length - 1], n = s.x - e.x, l = s.y - e.y, o, a = 0;
  r && (o = s.x - r.x, a = s.y - r.y), t1(t, "track", {
    state: e.state,
    x: i.clientX,
    y: i.clientY,
    dx: n,
    dy: l,
    ddx: o,
    ddy: a,
    sourceEvent: i,
    hover: function() {
      return Wr(i.clientX, i.clientY);
    }
  });
}
Qe({
  name: "tap",
  deps: ["mousedown", "click", "touchstart", "touchend"],
  flow: {
    start: ["mousedown", "touchstart"],
    end: ["click", "touchend"]
  },
  emits: ["tap"],
  info: {
    x: NaN,
    y: NaN,
    prevent: !1
  },
  reset: function() {
    this.info.x = NaN, this.info.y = NaN, this.info.prevent = !1;
  },
  mousedown: function(e) {
    F(e) && (this.info.x = e.clientX, this.info.y = e.clientY);
  },
  click: function(e) {
    F(e) && G1(this.info, e);
  },
  touchstart: function(e) {
    const t = e.changedTouches[0];
    this.info.x = t.clientX, this.info.y = t.clientY;
  },
  touchend: function(e) {
    G1(this.info, e.changedTouches[0], e);
  }
});
function G1(e, t, i) {
  let r = Math.abs(t.clientX - e.x), s = Math.abs(t.clientY - e.y), n = k(i || t);
  !n || jr[n.localName] && n.hasAttribute("disabled") || (isNaN(r) || isNaN(s) || r <= j1 && s <= j1 || Xr(t)) && (e.prevent || t1(n, "tap", {
    x: t.clientX,
    y: t.clientY,
    sourceEvent: t,
    preventer: i
  }));
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Qi = P((e) => {
  class t extends e {
    _addEventListenerToNode(r, s, n) {
      Zr(r, s, n) || super._addEventListenerToNode(r, s, n);
    }
    _removeEventListenerFromNode(r, s, n) {
      Qr(r, s, n) || super._removeEventListenerFromNode(r, s, n);
    }
  }
  return t;
});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
const rn = /:host\(:dir\((ltr|rtl)\)\)/g, nn = ':host([dir="$1"])', ln = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g, on = ':host([dir="$2"]) $1', an = /:dir\((?:ltr|rtl)\)/, W1 = Boolean(window.ShadyDOM && window.ShadyDOM.inUse), _t = [];
let vt = null, e1 = "";
function ts() {
  e1 = document.documentElement.getAttribute("dir");
}
function es(e) {
  e.__autoDirOptOut || e.setAttribute("dir", e1);
}
function is() {
  ts(), e1 = document.documentElement.getAttribute("dir");
  for (let e = 0; e < _t.length; e++)
    es(_t[e]);
}
function hn() {
  vt && vt.takeRecords().length && is();
}
const cn = P((e) => {
  W1 || vt || (ts(), vt = new MutationObserver(is), vt.observe(document.documentElement, { attributes: !0, attributeFilter: ["dir"] }));
  const t = $i(e);
  class i extends t {
    static _processStyleText(s, n) {
      return s = t._processStyleText.call(this, s, n), !W1 && an.test(s) && (s = this._replaceDirInCssText(s), this.__activateDir = !0), s;
    }
    static _replaceDirInCssText(s) {
      let n = s;
      return n = n.replace(rn, nn), n = n.replace(ln, on), n;
    }
    constructor() {
      super(), this.__autoDirOptOut = !1;
    }
    ready() {
      super.ready(), this.__autoDirOptOut = this.hasAttribute("dir");
    }
    connectedCallback() {
      t.prototype.connectedCallback && super.connectedCallback(), this.constructor.__activateDir && (hn(), _t.push(this), es(this));
    }
    disconnectedCallback() {
      if (t.prototype.disconnectedCallback && super.disconnectedCallback(), this.constructor.__activateDir) {
        const s = _t.indexOf(this);
        s > -1 && _t.splice(s, 1);
      }
    }
  }
  return i.__activateDir = !1, i;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function K1() {
  document.body.removeAttribute("unresolved");
}
document.readyState === "interactive" || document.readyState === "complete" ? K1() : window.addEventListener("DOMContentLoaded", K1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function ot(e, t, i) {
  return {
    index: e,
    removed: t,
    addedCount: i
  };
}
const ss = 0, rs = 1, Oe = 2, Ne = 3;
function dn(e, t, i, r, s, n) {
  let l = n - s + 1, o = i - t + 1, a = new Array(l);
  for (let h = 0; h < l; h++)
    a[h] = new Array(o), a[h][0] = h;
  for (let h = 0; h < o; h++)
    a[0][h] = h;
  for (let h = 1; h < l; h++)
    for (let c = 1; c < o; c++)
      if (i1(e[t + c - 1], r[s + h - 1]))
        a[h][c] = a[h - 1][c - 1];
      else {
        let d = a[h - 1][c] + 1, p = a[h][c - 1] + 1;
        a[h][c] = d < p ? d : p;
      }
  return a;
}
function pn(e) {
  let t = e.length - 1, i = e[0].length - 1, r = e[t][i], s = [];
  for (; t > 0 || i > 0; ) {
    if (t == 0) {
      s.push(Oe), i--;
      continue;
    }
    if (i == 0) {
      s.push(Ne), t--;
      continue;
    }
    let n = e[t - 1][i - 1], l = e[t - 1][i], o = e[t][i - 1], a;
    l < o ? a = l < n ? l : n : a = o < n ? o : n, a == n ? (n == r ? s.push(ss) : (s.push(rs), r = n), t--, i--) : a == l ? (s.push(Ne), t--, r = l) : (s.push(Oe), i--, r = o);
  }
  return s.reverse(), s;
}
function un(e, t, i, r, s, n) {
  let l = 0, o = 0, a, h = Math.min(i - t, n - s);
  if (t == 0 && s == 0 && (l = fn(e, r, h)), i == e.length && n == r.length && (o = mn(e, r, h - l)), t += l, s += l, i -= o, n -= o, i - t == 0 && n - s == 0)
    return [];
  if (t == i) {
    for (a = ot(t, [], 0); s < n; )
      a.removed.push(r[s++]);
    return [a];
  } else if (s == n)
    return [ot(t, [], i - t)];
  let c = pn(
    dn(
      e,
      t,
      i,
      r,
      s,
      n
    )
  );
  a = void 0;
  let d = [], p = t, f = s;
  for (let m = 0; m < c.length; m++)
    switch (c[m]) {
      case ss:
        a && (d.push(a), a = void 0), p++, f++;
        break;
      case rs:
        a || (a = ot(p, [], 0)), a.addedCount++, p++, a.removed.push(r[f]), f++;
        break;
      case Oe:
        a || (a = ot(p, [], 0)), a.addedCount++, p++;
        break;
      case Ne:
        a || (a = ot(p, [], 0)), a.removed.push(r[f]), f++;
        break;
    }
  return a && d.push(a), d;
}
function fn(e, t, i) {
  for (let r = 0; r < i; r++)
    if (!i1(e[r], t[r]))
      return r;
  return i;
}
function mn(e, t, i) {
  let r = e.length, s = t.length, n = 0;
  for (; n < i && i1(e[--r], t[--s]); )
    n++;
  return n;
}
function ns(e, t) {
  return un(
    e,
    0,
    e.length,
    t,
    0,
    t.length
  );
}
function i1(e, t) {
  return e === t;
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function q(e) {
  return e.localName === "slot";
}
let Z1 = class {
  static getFlattenedNodes(e) {
    const t = u(e);
    return q(e) ? (e = e, t.assignedNodes({ flatten: !0 })) : Array.from(t.childNodes).map((i) => q(i) ? (i = i, u(i).assignedNodes({ flatten: !0 })) : [i]).reduce((i, r) => i.concat(r), []);
  }
  constructor(e, t) {
    this._shadyChildrenObserver = null, this._nativeChildrenObserver = null, this._connected = !1, this._target = e, this.callback = t, this._effectiveNodes = [], this._observer = null, this._scheduled = !1, this._boundSchedule = () => {
      this._schedule();
    }, this.connect(), this._schedule();
  }
  connect() {
    q(this._target) ? this._listenSlots([this._target]) : u(this._target).children && (this._listenSlots(
      u(this._target).children
    ), window.ShadyDOM ? this._shadyChildrenObserver = window.ShadyDOM.observeChildren(this._target, (e) => {
      this._processMutations(e);
    }) : (this._nativeChildrenObserver = new MutationObserver((e) => {
      this._processMutations(e);
    }), this._nativeChildrenObserver.observe(this._target, { childList: !0 }))), this._connected = !0;
  }
  disconnect() {
    q(this._target) ? this._unlistenSlots([this._target]) : u(this._target).children && (this._unlistenSlots(
      u(this._target).children
    ), window.ShadyDOM && this._shadyChildrenObserver ? (window.ShadyDOM.unobserveChildren(this._shadyChildrenObserver), this._shadyChildrenObserver = null) : this._nativeChildrenObserver && (this._nativeChildrenObserver.disconnect(), this._nativeChildrenObserver = null)), this._connected = !1;
  }
  _schedule() {
    this._scheduled || (this._scheduled = !0, N.run(() => this.flush()));
  }
  _processMutations(e) {
    this._processSlotMutations(e), this.flush();
  }
  _processSlotMutations(e) {
    if (e)
      for (let t = 0; t < e.length; t++) {
        let i = e[t];
        i.addedNodes && this._listenSlots(i.addedNodes), i.removedNodes && this._unlistenSlots(i.removedNodes);
      }
  }
  flush() {
    if (!this._connected)
      return !1;
    window.ShadyDOM && ShadyDOM.flush(), this._nativeChildrenObserver ? this._processSlotMutations(this._nativeChildrenObserver.takeRecords()) : this._shadyChildrenObserver && this._processSlotMutations(this._shadyChildrenObserver.takeRecords()), this._scheduled = !1;
    let e = {
      target: this._target,
      addedNodes: [],
      removedNodes: []
    }, t = this.constructor.getFlattenedNodes(this._target), i = ns(
      t,
      this._effectiveNodes
    );
    for (let s = 0, n; s < i.length && (n = i[s]); s++)
      for (let l = 0, o; l < n.removed.length && (o = n.removed[l]); l++)
        e.removedNodes.push(o);
    for (let s = 0, n; s < i.length && (n = i[s]); s++)
      for (let l = n.index; l < n.index + n.addedCount; l++)
        e.addedNodes.push(t[l]);
    this._effectiveNodes = t;
    let r = !1;
    return (e.addedNodes.length || e.removedNodes.length) && (r = !0, this.callback.call(this._target, e)), r;
  }
  _listenSlots(e) {
    for (let t = 0; t < e.length; t++) {
      let i = e[t];
      q(i) && i.addEventListener("slotchange", this._boundSchedule);
    }
  }
  _unlistenSlots(e) {
    for (let t = 0; t < e.length; t++) {
      let i = e[t];
      q(i) && i.removeEventListener("slotchange", this._boundSchedule);
    }
  }
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const ls = function() {
  let e, t;
  do
    e = window.ShadyDOM && ShadyDOM.flush(), window.ShadyCSS && window.ShadyCSS.ScopingShim && window.ShadyCSS.ScopingShim.flush(), t = $r();
  while (e || t);
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Y = Element.prototype, _n = Y.matches || Y.matchesSelector || Y.mozMatchesSelector || Y.msMatchesSelector || Y.oMatchesSelector || Y.webkitMatchesSelector, os = function(e, t) {
  return _n.call(e, t);
};
class v {
  constructor(t) {
    window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.patch(t), this.node = t;
  }
  observeNodes(t) {
    return new Z1(
      this.node,
      t
    );
  }
  unobserveNodes(t) {
    t.disconnect();
  }
  notifyObserver() {
  }
  deepContains(t) {
    if (u(this.node).contains(t))
      return !0;
    let i = t, r = t.ownerDocument;
    for (; i && i !== r && i !== this.node; )
      i = u(i).parentNode || u(i).host;
    return i === this.node;
  }
  getOwnerRoot() {
    return u(this.node).getRootNode();
  }
  getDistributedNodes() {
    return this.node.localName === "slot" ? u(this.node).assignedNodes({ flatten: !0 }) : [];
  }
  getDestinationInsertionPoints() {
    let t = [], i = u(this.node).assignedSlot;
    for (; i; )
      t.push(i), i = u(i).assignedSlot;
    return t;
  }
  importNode(t, i) {
    let r = this.node instanceof Document ? this.node : this.node.ownerDocument;
    return u(r).importNode(t, i);
  }
  getEffectiveChildNodes() {
    return Z1.getFlattenedNodes(
      this.node
    );
  }
  queryDistributedElements(t) {
    let i = this.getEffectiveChildNodes(), r = [];
    for (let s = 0, n = i.length, l; s < n && (l = i[s]); s++)
      l.nodeType === Node.ELEMENT_NODE && os(l, t) && r.push(l);
    return r;
  }
  get activeElement() {
    let t = this.node;
    return t._activeElement !== void 0 ? t._activeElement : t.activeElement;
  }
}
function vn(e, t) {
  for (let i = 0; i < t.length; i++) {
    let r = t[i];
    e[r] = function() {
      return this.node[r].apply(this.node, arguments);
    };
  }
}
function Q1(e, t) {
  for (let i = 0; i < t.length; i++) {
    let r = t[i];
    Object.defineProperty(e, r, {
      get: function() {
        return this.node[r];
      },
      configurable: !0
    });
  }
}
function gn(e, t) {
  for (let i = 0; i < t.length; i++) {
    let r = t[i];
    Object.defineProperty(e, r, {
      get: function() {
        return this.node[r];
      },
      set: function(s) {
        this.node[r] = s;
      },
      configurable: !0
    });
  }
}
class ke {
  constructor(t) {
    this.event = t;
  }
  get rootTarget() {
    return this.path[0];
  }
  get localTarget() {
    return this.event.target;
  }
  get path() {
    return this.event.composedPath();
  }
}
v.prototype.cloneNode;
v.prototype.appendChild;
v.prototype.insertBefore;
v.prototype.removeChild;
v.prototype.replaceChild;
v.prototype.setAttribute;
v.prototype.removeAttribute;
v.prototype.querySelector;
v.prototype.querySelectorAll;
v.prototype.parentNode;
v.prototype.firstChild;
v.prototype.lastChild;
v.prototype.nextSibling;
v.prototype.previousSibling;
v.prototype.firstElementChild;
v.prototype.lastElementChild;
v.prototype.nextElementSibling;
v.prototype.previousElementSibling;
v.prototype.childNodes;
v.prototype.children;
v.prototype.classList;
v.prototype.textContent;
v.prototype.innerHTML;
let Ie = v;
if (window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.noPatch && window.ShadyDOM.Wrapper) {
  class e extends window.ShadyDOM.Wrapper {
  }
  Object.getOwnPropertyNames(v.prototype).forEach((t) => {
    t != "activeElement" && (e.prototype[t] = v.prototype[t]);
  }), Q1(e.prototype, [
    "classList"
  ]), Ie = e, Object.defineProperties(ke.prototype, {
    localTarget: {
      get() {
        const t = this.event.currentTarget, i = t && L(t).getOwnerRoot(), r = this.path;
        for (let s = 0; s < r.length; s++) {
          const n = r[s];
          if (L(n).getOwnerRoot() === i)
            return n;
        }
      },
      configurable: !0
    },
    path: {
      get() {
        return window.ShadyDOM.composedPath(this.event);
      },
      configurable: !0
    }
  });
} else
  vn(v.prototype, [
    "cloneNode",
    "appendChild",
    "insertBefore",
    "removeChild",
    "replaceChild",
    "setAttribute",
    "removeAttribute",
    "querySelector",
    "querySelectorAll",
    "attachShadow"
  ]), Q1(v.prototype, [
    "parentNode",
    "firstChild",
    "lastChild",
    "nextSibling",
    "previousSibling",
    "firstElementChild",
    "lastElementChild",
    "nextElementSibling",
    "previousElementSibling",
    "childNodes",
    "children",
    "classList",
    "shadowRoot"
  ]), gn(v.prototype, [
    "textContent",
    "innerHTML",
    "className"
  ]);
const L = function(e) {
  if (e = e || document, e instanceof Ie || e instanceof ke)
    return e;
  let t = e.__domApi;
  return t || (e instanceof Event ? t = new ke(e) : t = new Ie(e), e.__domApi = t), t;
};
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const ge = window.ShadyDOM, ti = window.ShadyCSS;
function ei(e, t) {
  return u(e).getRootNode() === t;
}
function yn(e, t = !1) {
  if (!ge || !ti || !ge.handlesDynamicScoping)
    return null;
  const i = ti.ScopingShim;
  if (!i)
    return null;
  const r = i.scopeForNode(e), s = u(e).getRootNode(), n = (l) => {
    if (!ei(l, s))
      return;
    const o = Array.from(ge.nativeMethods.querySelectorAll.call(l, "*"));
    o.push(l);
    for (let a = 0; a < o.length; a++) {
      const h = o[a];
      if (!ei(h, s))
        continue;
      const c = i.currentScopeForNode(h);
      c !== r && (c !== "" && i.unscopeNode(h, c), i.scopeNode(h, r));
    }
  };
  if (n(e), t) {
    const l = new MutationObserver((o) => {
      for (let a = 0; a < o.length; a++) {
        const h = o[a];
        for (let c = 0; c < h.addedNodes.length; c++) {
          const d = h.addedNodes[c];
          d.nodeType === Node.ELEMENT_NODE && n(d);
        }
      }
    });
    return l.observe(e, { childList: !0, subtree: !0 }), l;
  } else
    return null;
}
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
const ye = "disable-upgrade", as = (e) => {
  for (; e; ) {
    const t = Object.getOwnPropertyDescriptor(e, "observedAttributes");
    if (t)
      return t.get;
    e = Object.getPrototypeOf(e.prototype).constructor;
  }
  return () => [];
};
P((e) => {
  const t = ee(e);
  let i = as(t);
  class r extends t {
    constructor() {
      super(), this.__isUpgradeDisabled;
    }
    static get observedAttributes() {
      return i.call(this).concat(ye);
    }
    _initializeProperties() {
      this.hasAttribute(ye) ? this.__isUpgradeDisabled = !0 : super._initializeProperties();
    }
    _enableProperties() {
      this.__isUpgradeDisabled || super._enableProperties();
    }
    _canApplyPropertyDefault(n) {
      return super._canApplyPropertyDefault(n) && !(this.__isUpgradeDisabled && this._isPropertyPending(n));
    }
    attributeChangedCallback(n, l, o, a) {
      n == ye ? this.__isUpgradeDisabled && o == null && (super._initializeProperties(), this.__isUpgradeDisabled = !1, u(this).isConnected && super.connectedCallback()) : super.attributeChangedCallback(
        n,
        l,
        o,
        a
      );
    }
    connectedCallback() {
      this.__isUpgradeDisabled || super.connectedCallback();
    }
    disconnectedCallback() {
      this.__isUpgradeDisabled || super.disconnectedCallback();
    }
  }
  return r;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const It = "disable-upgrade";
let zn = window.ShadyCSS;
const hs = P((e) => {
  const t = Qi(ee(e)), i = Ae ? t : cn(t), r = as(i), s = {
    x: "pan-x",
    y: "pan-y",
    none: "none",
    all: "auto"
  };
  class n extends i {
    constructor() {
      super(), this.isAttached, this.__boundListeners, this._debouncers, this.__isUpgradeDisabled, this.__needsAttributesAtConnected, this._legacyForceObservedAttributes;
    }
    static get importMeta() {
      return this.prototype.importMeta;
    }
    created() {
    }
    __attributeReaction(o, a, h) {
      (this.__dataAttributes && this.__dataAttributes[o] || o === It) && this.attributeChangedCallback(o, a, h, null);
    }
    setAttribute(o, a) {
      if (Nt && !this._legacyForceObservedAttributes) {
        const h = this.getAttribute(o);
        super.setAttribute(o, a), this.__attributeReaction(o, h, String(a));
      } else
        super.setAttribute(o, a);
    }
    removeAttribute(o) {
      if (Nt && !this._legacyForceObservedAttributes) {
        const a = this.getAttribute(o);
        super.removeAttribute(o), this.__attributeReaction(o, a, null);
      } else
        super.removeAttribute(o);
    }
    static get observedAttributes() {
      return Nt && !this.prototype._legacyForceObservedAttributes ? (this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes", this)) || (this.__observedAttributes = [], this.prototype, void 0), this.__observedAttributes) : r.call(this).concat(It);
    }
    _enableProperties() {
      this.__isUpgradeDisabled || super._enableProperties();
    }
    _canApplyPropertyDefault(o) {
      return super._canApplyPropertyDefault(o) && !(this.__isUpgradeDisabled && this._isPropertyPending(o));
    }
    connectedCallback() {
      this.__needsAttributesAtConnected && this._takeAttributes(), this.__isUpgradeDisabled || (super.connectedCallback(), this.isAttached = !0, this.attached());
    }
    attached() {
    }
    disconnectedCallback() {
      this.__isUpgradeDisabled || (super.disconnectedCallback(), this.isAttached = !1, this.detached());
    }
    detached() {
    }
    attributeChangedCallback(o, a, h, c) {
      a !== h && (o == It ? this.__isUpgradeDisabled && h == null && (this._initializeProperties(), this.__isUpgradeDisabled = !1, u(this).isConnected && this.connectedCallback()) : (super.attributeChangedCallback(o, a, h, c), this.attributeChanged(o, a, h)));
    }
    attributeChanged(o, a, h) {
    }
    _initializeProperties() {
      if (Ct && this.hasAttribute(It))
        this.__isUpgradeDisabled = !0;
      else {
        let o = Object.getPrototypeOf(this);
        o.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished", o)) || (this._registered(), o.__hasRegisterFinished = !0), super._initializeProperties(), this.root = this, this.created(), Nt && !this._legacyForceObservedAttributes && (this.hasAttributes() ? this._takeAttributes() : this.parentNode || (this.__needsAttributesAtConnected = !0)), this._applyListeners();
      }
    }
    _takeAttributes() {
      const o = this.attributes;
      for (let a = 0, h = o.length; a < h; a++) {
        const c = o[a];
        this.__attributeReaction(c.name, null, c.value);
      }
    }
    _registered() {
    }
    ready() {
      this._ensureAttributes(), super.ready();
    }
    _ensureAttributes() {
    }
    _applyListeners() {
    }
    serialize(o) {
      return this._serializeValue(o);
    }
    deserialize(o, a) {
      return this._deserializeValue(o, a);
    }
    reflectPropertyToAttribute(o, a, h) {
      this._propertyToAttribute(o, a, h);
    }
    serializeValueToAttribute(o, a, h) {
      this._valueToNodeAttribute(h || this, o, a);
    }
    extend(o, a) {
      if (!(o && a))
        return o || a;
      let h = Object.getOwnPropertyNames(a);
      for (let c = 0, d; c < h.length && (d = h[c]); c++) {
        let p = Object.getOwnPropertyDescriptor(a, d);
        p && Object.defineProperty(o, d, p);
      }
      return o;
    }
    mixin(o, a) {
      for (let h in a)
        o[h] = a[h];
      return o;
    }
    chainObject(o, a) {
      return o && a && o !== a && (o.__proto__ = a), o;
    }
    instanceTemplate(o) {
      let a = this.constructor._contentForTemplate(o);
      return document.importNode(a, !0);
    }
    fire(o, a, h) {
      h = h || {}, a = a == null ? {} : a;
      let c = new Event(o, {
        bubbles: h.bubbles === void 0 ? !0 : h.bubbles,
        cancelable: Boolean(h.cancelable),
        composed: h.composed === void 0 ? !0 : h.composed
      });
      c.detail = a;
      let d = h.node || this;
      return u(d).dispatchEvent(c), c;
    }
    listen(o, a, h) {
      o = o || this;
      let c = this.__boundListeners || (this.__boundListeners = /* @__PURE__ */ new WeakMap()), d = c.get(o);
      d || (d = {}, c.set(o, d));
      let p = a + h;
      d[p] || (d[p] = this._addMethodEventListenerToNode(
        o,
        a,
        h,
        this
      ));
    }
    unlisten(o, a, h) {
      o = o || this;
      let c = this.__boundListeners && this.__boundListeners.get(o), d = a + h, p = c && c[d];
      p && (this._removeEventListenerFromNode(
        o,
        a,
        p
      ), c[d] = null);
    }
    setScrollDirection(o, a) {
      Zi(
        a || this,
        s[o] || "auto"
      );
    }
    $$(o) {
      return this.root.querySelector(o);
    }
    get domHost() {
      let o = u(this).getRootNode();
      return o instanceof DocumentFragment ? o.host : o;
    }
    distributeContent() {
      const a = L(this);
      window.ShadyDOM && a.shadowRoot && ShadyDOM.flush();
    }
    getEffectiveChildNodes() {
      return L(this).getEffectiveChildNodes();
    }
    queryDistributedElements(o) {
      return L(this).queryDistributedElements(o);
    }
    getEffectiveChildren() {
      return this.getEffectiveChildNodes().filter(function(a) {
        return a.nodeType === Node.ELEMENT_NODE;
      });
    }
    getEffectiveTextContent() {
      let o = this.getEffectiveChildNodes(), a = [];
      for (let h = 0, c; c = o[h]; h++)
        c.nodeType !== Node.COMMENT_NODE && a.push(c.textContent);
      return a.join("");
    }
    queryEffectiveChildren(o) {
      let a = this.queryDistributedElements(o);
      return a && a[0];
    }
    queryAllEffectiveChildren(o) {
      return this.queryDistributedElements(o);
    }
    getContentChildNodes(o) {
      let a = this.root.querySelector(o || "slot");
      return a ? L(a).getDistributedNodes() : [];
    }
    getContentChildren(o) {
      return this.getContentChildNodes(o).filter(function(h) {
        return h.nodeType === Node.ELEMENT_NODE;
      });
    }
    isLightDescendant(o) {
      const a = this;
      return a !== o && u(a).contains(o) && u(a).getRootNode() === u(o).getRootNode();
    }
    isLocalDescendant(o) {
      return this.root === u(o).getRootNode();
    }
    scopeSubtree(o, a = !1) {
      return yn(o, a);
    }
    getComputedStyleValue(o) {
      return zn.getComputedStyleValue(this, o);
    }
    debounce(o, a, h) {
      return this._debouncers = this._debouncers || {}, this._debouncers[o] = B.debounce(
        this._debouncers[o],
        h > 0 ? mt.after(h) : N,
        a.bind(this)
      );
    }
    isDebouncerActive(o) {
      this._debouncers = this._debouncers || {};
      let a = this._debouncers[o];
      return !!(a && a.isActive());
    }
    flushDebouncer(o) {
      this._debouncers = this._debouncers || {};
      let a = this._debouncers[o];
      a && a.flush();
    }
    cancelDebouncer(o) {
      this._debouncers = this._debouncers || {};
      let a = this._debouncers[o];
      a && a.cancel();
    }
    async(o, a) {
      return a > 0 ? mt.run(o.bind(this), a) : ~N.run(o.bind(this));
    }
    cancelAsync(o) {
      o < 0 ? N.cancel(~o) : mt.cancel(o);
    }
    create(o, a) {
      let h = document.createElement(o);
      if (a)
        if (h.setProperties)
          h.setProperties(a);
        else
          for (let c in a)
            h[c] = a[c];
      return h;
    }
    elementMatches(o, a) {
      return os(a || this, o);
    }
    toggleAttribute(o, a) {
      let h = this;
      return arguments.length === 3 && (h = arguments[2]), arguments.length == 1 && (a = !h.hasAttribute(o)), a ? (u(h).setAttribute(o, ""), !0) : (u(h).removeAttribute(o), !1);
    }
    toggleClass(o, a, h) {
      h = h || this, arguments.length == 1 && (a = !h.classList.contains(o)), a ? h.classList.add(o) : h.classList.remove(o);
    }
    transform(o, a) {
      a = a || this, a.style.webkitTransform = o, a.style.transform = o;
    }
    translate3d(o, a, h, c) {
      c = c || this, this.transform("translate3d(" + o + "," + a + "," + h + ")", c);
    }
    arrayDelete(o, a) {
      let h;
      if (Array.isArray(o)) {
        if (h = o.indexOf(a), h >= 0)
          return o.splice(h, 1);
      } else if (h = C(this, o).indexOf(a), h >= 0)
        return this.splice(o, h, 1);
      return null;
    }
    _logger(o, a) {
      switch (Array.isArray(a) && a.length === 1 && Array.isArray(a[0]) && (a = a[0]), o) {
        case "log":
        case "warn":
        case "error":
          console[o](...a);
      }
    }
    _log(...o) {
      this._logger("log", o);
    }
    _warn(...o) {
      this._logger("warn", o);
    }
    _error(...o) {
      this._logger("error", o);
    }
    _logf(o, ...a) {
      return ["[%s::%s]", this.is, o, ...a];
    }
  }
  return n.prototype.is = "", n;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const bn = {
  attached: !0,
  detached: !0,
  ready: !0,
  created: !0,
  beforeRegister: !0,
  registered: !0,
  attributeChanged: !0,
  listeners: !0,
  hostAttributes: !0
}, cs = {
  attached: !0,
  detached: !0,
  ready: !0,
  created: !0,
  beforeRegister: !0,
  registered: !0,
  attributeChanged: !0,
  behaviors: !0,
  _noAccessors: !0
}, Cn = Object.assign({
  listeners: !0,
  hostAttributes: !0,
  properties: !0,
  observers: !0
}, cs);
function Mn(e, t, i) {
  const r = e._noAccessors, s = Object.getOwnPropertyNames(e);
  for (let n = 0; n < s.length; n++) {
    let l = s[n];
    if (!(l in i))
      if (r)
        t[l] = e[l];
      else {
        let o = Object.getOwnPropertyDescriptor(e, l);
        o && (o.configurable = !0, Object.defineProperty(t, l, o));
      }
  }
}
function wn(e, t, i) {
  for (let r = 0; r < t.length; r++)
    ds(e, t[r], i, Cn);
}
function ds(e, t, i, r) {
  Mn(t, e, r);
  for (let s in bn)
    t[s] && (i[s] = i[s] || [], i[s].push(t[s]));
}
function ps(e, t, i) {
  t = t || [];
  for (let r = e.length - 1; r >= 0; r--) {
    let s = e[r];
    s ? Array.isArray(s) ? ps(s, t) : t.indexOf(s) < 0 && (!i || i.indexOf(s) < 0) && t.unshift(s) : console.warn("behavior is null, check for missing or 404 import");
  }
  return t;
}
function ii(e, t) {
  for (const i in t) {
    const r = e[i], s = t[i];
    !("value" in s) && r && "value" in r ? e[i] = Object.assign({ value: r.value }, s) : e[i] = s;
  }
}
const si = hs(HTMLElement);
function Hn(e, t, i) {
  let r;
  const s = {};
  class n extends t {
    static _finalizeClass() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom", this)))
        t._finalizeClass.call(this);
      else {
        if (r)
          for (let a = 0, h; a < r.length; a++)
            h = r[a], h.properties && this.createProperties(h.properties), h.observers && this.createObservers(h.observers, h.properties);
        e.properties && this.createProperties(e.properties), e.observers && this.createObservers(e.observers, e.properties), this._prepareTemplate();
      }
    }
    static get properties() {
      const a = {};
      if (r)
        for (let h = 0; h < r.length; h++)
          ii(a, r[h].properties);
      return ii(a, e.properties), a;
    }
    static get observers() {
      let a = [];
      if (r)
        for (let h = 0, c; h < r.length; h++)
          c = r[h], c.observers && (a = a.concat(c.observers));
      return e.observers && (a = a.concat(e.observers)), a;
    }
    created() {
      super.created();
      const a = s.created;
      if (a)
        for (let h = 0; h < a.length; h++)
          a[h].call(this);
    }
    _registered() {
      const a = n.prototype;
      if (!a.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished", a))) {
        a.__hasRegisterFinished = !0, super._registered(), Ct && l(a);
        const h = Object.getPrototypeOf(this);
        let c = s.beforeRegister;
        if (c)
          for (let d = 0; d < c.length; d++)
            c[d].call(h);
        if (c = s.registered, c)
          for (let d = 0; d < c.length; d++)
            c[d].call(h);
      }
    }
    _applyListeners() {
      super._applyListeners();
      const a = s.listeners;
      if (a)
        for (let h = 0; h < a.length; h++) {
          const c = a[h];
          if (c)
            for (let d in c)
              this._addMethodEventListenerToNode(this, d, c[d]);
        }
    }
    _ensureAttributes() {
      const a = s.hostAttributes;
      if (a)
        for (let h = a.length - 1; h >= 0; h--) {
          const c = a[h];
          for (let d in c)
            this._ensureAttribute(d, c[d]);
        }
      super._ensureAttributes();
    }
    ready() {
      super.ready();
      let a = s.ready;
      if (a)
        for (let h = 0; h < a.length; h++)
          a[h].call(this);
    }
    attached() {
      super.attached();
      let a = s.attached;
      if (a)
        for (let h = 0; h < a.length; h++)
          a[h].call(this);
    }
    detached() {
      super.detached();
      let a = s.detached;
      if (a)
        for (let h = 0; h < a.length; h++)
          a[h].call(this);
    }
    attributeChanged(a, h, c) {
      super.attributeChanged();
      let d = s.attributeChanged;
      if (d)
        for (let p = 0; p < d.length; p++)
          d[p].call(this, a, h, c);
    }
  }
  if (i) {
    Array.isArray(i) || (i = [i]);
    let o = t.prototype.behaviors;
    r = ps(i, null, o), n.prototype.behaviors = o ? o.concat(i) : r;
  }
  const l = (o) => {
    r && wn(o, r, s), ds(o, e, s, cs);
  };
  return Ct || l(n.prototype), n.generatedFrom = e, n;
}
const Sn = function(e, t) {
  e || console.warn("Polymer.Class requires `info` argument");
  let i = t ? t(si) : si;
  return i = Hn(e, i, e.behaviors), i.is = i.prototype.is = e.is, i;
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const xt = function(e) {
  let t;
  return typeof e == "function" ? t = e : t = xt.Class(e), e._legacyForceObservedAttributes && (t.prototype._legacyForceObservedAttributes = e._legacyForceObservedAttributes), customElements.define(t.is, t), t;
};
xt.Class = Sn;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function s1(e, t, i, r, s) {
  let n;
  s && (n = typeof i == "object" && i !== null, n && (r = e.__dataTemp[t]));
  let l = r !== i && (r === r || i === i);
  return n && l && (e.__dataTemp[t] = i), l;
}
const r1 = P((e) => {
  class t extends e {
    _shouldPropertyChange(r, s, n) {
      return s1(this, r, s, n, !0);
    }
  }
  return t;
}), us = P((e) => {
  class t extends e {
    static get properties() {
      return {
        mutableData: Boolean
      };
    }
    _shouldPropertyChange(r, s, n) {
      return s1(this, r, s, n, this.mutableData);
    }
  }
  return t;
});
r1._mutablePropertyChange = s1;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let $e = null;
function De() {
  return $e;
}
De.prototype = Object.create(HTMLTemplateElement.prototype, {
  constructor: {
    value: De,
    writable: !0
  }
});
const fs = te(De), Pn = r1(fs);
function Vn(e, t) {
  $e = e, Object.setPrototypeOf(e, t.prototype), new t(), $e = null;
}
const Ln = te(class {
});
function ms(e, t) {
  for (let i = 0; i < t.length; i++) {
    let r = t[i];
    if (Boolean(e) != Boolean(r.__hideTemplateChildren__))
      if (r.nodeType === Node.TEXT_NODE)
        e ? (r.__polymerTextContent__ = r.textContent, r.textContent = "") : r.textContent = r.__polymerTextContent__;
      else if (r.localName === "slot")
        if (e)
          r.__polymerReplaced__ = document.createComment("hidden-slot"), u(u(r).parentNode).replaceChild(r.__polymerReplaced__, r);
        else {
          const s = r.__polymerReplaced__;
          s && u(u(s).parentNode).replaceChild(r, s);
        }
      else
        r.style && (e ? (r.__polymerDisplay__ = r.style.display, r.style.display = "none") : r.style.display = r.__polymerDisplay__);
    r.__hideTemplateChildren__ = e, r._showHideChildren && r._showHideChildren(e);
  }
}
class $ extends Ln {
  constructor(t) {
    super(), this._configureProperties(t), this.root = this._stampTemplate(this.__dataHost);
    let i = [];
    this.children = i;
    for (let s = this.root.firstChild; s; s = s.nextSibling)
      i.push(s), s.__templatizeInstance = this;
    this.__templatizeOwner && this.__templatizeOwner.__hideTemplateChildren__ && this._showHideChildren(!0);
    let r = this.__templatizeOptions;
    (t && r.instanceProps || !r.instanceProps) && this._enableProperties();
  }
  _configureProperties(t) {
    if (this.__templatizeOptions.forwardHostProp)
      for (let r in this.__hostProps)
        this._setPendingProperty(r, this.__dataHost["_host_" + r]);
    for (let r in t)
      this._setPendingProperty(r, t[r]);
  }
  forwardHostProp(t, i) {
    this._setPendingPropertyOrPath(t, i, !1, !0) && this.__dataHost._enqueueClient(this);
  }
  _addEventListenerToNode(t, i, r) {
    if (this._methodHost && this.__templatizeOptions.parentModel)
      this._methodHost._addEventListenerToNode(t, i, (s) => {
        s.model = this, r(s);
      });
    else {
      let s = this.__dataHost.__dataHost;
      s && s._addEventListenerToNode(t, i, r);
    }
  }
  _showHideChildren(t) {
    ms(t, this.children);
  }
  _setUnmanagedPropertyToNode(t, i, r) {
    t.__hideTemplateChildren__ && t.nodeType == Node.TEXT_NODE && i == "textContent" ? t.__polymerTextContent__ = r : super._setUnmanagedPropertyToNode(t, i, r);
  }
  get parentModel() {
    let t = this.__parentModel;
    if (!t) {
      let i;
      t = this;
      do
        t = t.__dataHost.__dataHost;
      while ((i = t.__templatizeOptions) && !i.parentModel);
      this.__parentModel = t;
    }
    return t;
  }
  dispatchEvent(t) {
    return !0;
  }
}
$.prototype.__dataHost;
$.prototype.__templatizeOptions;
$.prototype._methodHost;
$.prototype.__templatizeOwner;
$.prototype.__hostProps;
const En = r1(
  $
);
function ri(e) {
  let t = e.__dataHost;
  return t && t._methodHost || t;
}
function An(e, t, i) {
  let r = i.mutableData ? En : $;
  Wt.mixin && (r = Wt.mixin(r));
  let s = class extends r {
  };
  return s.prototype.__templatizeOptions = i, s.prototype._bindTemplate(e), On(s, e, t, i), s;
}
function xn(e, t, i, r) {
  let s = i.forwardHostProp;
  if (s && t.hasHostProps) {
    const n = e.localName == "template";
    let l = t.templatizeTemplateClass;
    if (!l) {
      if (n) {
        let a = i.mutableData ? Pn : fs;
        class h extends a {
        }
        l = t.templatizeTemplateClass = h;
      } else {
        const a = e.constructor;
        class h extends a {
        }
        l = t.templatizeTemplateClass = h;
      }
      let o = t.hostProps;
      for (let a in o)
        l.prototype._addPropertyEffect(
          "_host_" + a,
          l.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,
          { fn: Tn(a, s) }
        ), l.prototype._createNotifyingProperty("_host_" + a);
      Vi && r && In(t, i, r);
    }
    if (e.__dataProto && Object.assign(e.__data, e.__dataProto), n)
      Vn(e, l), e.__dataTemp = {}, e.__dataPending = null, e.__dataOld = null, e._enableProperties();
    else {
      Object.setPrototypeOf(e, l.prototype);
      const o = t.hostProps;
      for (let a in o)
        if (a = "_host_" + a, a in e) {
          const h = e[a];
          delete e[a], e.__data[a] = h;
        }
    }
  }
}
function Tn(e, t) {
  return function(r, s, n) {
    t.call(
      r.__templatizeOwner,
      s.substring(6),
      n[s]
    );
  };
}
function On(e, t, i, r) {
  let s = i.hostProps || {};
  for (let n in r.instanceProps) {
    delete s[n];
    let l = r.notifyInstanceProp;
    l && e.prototype._addPropertyEffect(
      n,
      e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
      { fn: Nn(n, l) }
    );
  }
  if (r.forwardHostProp && t.__dataHost)
    for (let n in s)
      i.hasHostProps || (i.hasHostProps = !0), e.prototype._addPropertyEffect(
        n,
        e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
        { fn: kn() }
      );
}
function Nn(e, t) {
  return function(r, s, n) {
    t.call(
      r.__templatizeOwner,
      r,
      s,
      n[s]
    );
  };
}
function kn() {
  return function(t, i, r) {
    t.__dataHost._setPendingPropertyOrPath("_host_" + i, r[i], !0, !0);
  };
}
function Wt(e, t, i) {
  if (it && !ri(e))
    throw new Error("strictTemplatePolicy: template owner not trusted");
  if (i = i || {}, e.__templatizeOwner)
    throw new Error("A <template> can only be templatized once");
  e.__templatizeOwner = t;
  let s = (t ? t.constructor : $)._parseTemplate(e), n = s.templatizeInstanceClass;
  n || (n = An(e, s, i), s.templatizeInstanceClass = n);
  const l = ri(e);
  xn(e, s, i, l);
  let o = class extends n {
  };
  return o.prototype._methodHost = l, o.prototype.__dataHost = e, o.prototype.__templatizeOwner = t, o.prototype.__hostProps = s.hostProps, o = o, o;
}
function In(e, t, i) {
  const r = i.constructor._properties, { propertyEffects: s } = e, { instanceProps: n } = t;
  for (let l in s)
    if (!r[l] && !(n && n[l])) {
      const o = s[l];
      for (let a = 0; a < o.length; a++) {
        const { part: h } = o[a].info;
        if (!(h.signature && h.signature.static)) {
          console.warn(`Property '${l}' used in template but not declared in 'properties'; attribute will not be observed.`);
          break;
        }
      }
    }
}
function $n(e, t) {
  let i;
  for (; t; )
    if (i = t.__dataHost ? t : t.__templatizeInstance)
      if (i.__dataHost != e)
        t = i.__dataHost;
      else
        return i;
    else
      t = u(t).parentNode;
  return null;
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let ni = !1;
function n1() {
  if (Ct && !Pi) {
    if (!ni) {
      ni = !0;
      const e = document.createElement("style");
      e.textContent = "dom-bind,dom-if,dom-repeat{display:none;}", document.head.appendChild(e);
    }
    return !0;
  }
  return !1;
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Dn = Qi(
  us(
    te(HTMLElement)
  )
);
class Rn extends Dn {
  static get observedAttributes() {
    return ["mutable-data"];
  }
  constructor() {
    if (super(), it)
      throw new Error("strictTemplatePolicy: dom-bind not allowed");
    this.root = null, this.$ = null, this.__children = null;
  }
  attributeChangedCallback(t, i, r, s) {
    this.mutableData = !0;
  }
  connectedCallback() {
    n1() || (this.style.display = "none"), this.render();
  }
  disconnectedCallback() {
    this.__removeChildren();
  }
  __insertChildren() {
    u(u(this).parentNode).insertBefore(this.root, this);
  }
  __removeChildren() {
    if (this.__children)
      for (let t = 0; t < this.__children.length; t++)
        this.root.appendChild(this.__children[t]);
  }
  render() {
    let t;
    if (!this.__children) {
      if (t = t || this.querySelector("template"), !t) {
        let i = new MutationObserver(() => {
          if (t = this.querySelector("template"), t)
            i.disconnect(), this.render();
          else
            throw new Error("dom-bind requires a <template> child");
        });
        i.observe(this, { childList: !0 });
        return;
      }
      this.root = this._stampTemplate(
        t
      ), this.$ = this.root.$, this.__children = [];
      for (let i = this.root.firstChild; i; i = i.nextSibling)
        this.__children[this.__children.length] = i;
      this._enableProperties();
    }
    this.__insertChildren(), this.dispatchEvent(new CustomEvent("dom-change", {
      bubbles: !0,
      composed: !0
    }));
  }
}
customElements.define("dom-bind", Rn);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const li = window.trustedTypes && trustedTypes.createPolicy("polymer-html-literal", { createHTML: (e) => e });
class _s {
  constructor(t, i) {
    gs(t, i);
    const r = i.reduce(
      (s, n, l) => s + vs(n) + t[l + 1],
      t[0]
    );
    this.value = r.toString();
  }
  toString() {
    return this.value;
  }
}
function vs(e) {
  if (e instanceof _s)
    return e.value;
  throw new Error(
    `non-literal value passed to Polymer's htmlLiteral function: ${e}`
  );
}
function Fn(e) {
  if (e instanceof HTMLTemplateElement)
    return e.innerHTML;
  if (e instanceof _s)
    return vs(e);
  throw new Error(
    `non-template value passed to Polymer's html function: ${e}`
  );
}
const se = function(t, ...i) {
  gs(t, i);
  const r = document.createElement("template");
  let s = i.reduce(
    (n, l, o) => n + Fn(l) + t[o + 1],
    t[0]
  );
  return li && (s = li.createHTML(s)), r.innerHTML = s, r;
}, gs = (e, t) => {
  if (!Array.isArray(e) || !Array.isArray(e.raw) || t.length !== e.length - 1)
    throw new TypeError("Invalid call to the html template tag");
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const l1 = ee(HTMLElement);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Bn = us(l1);
class oi extends Bn {
  static get is() {
    return "dom-repeat";
  }
  static get template() {
    return null;
  }
  static get properties() {
    return {
      items: {
        type: Array
      },
      as: {
        type: String,
        value: "item"
      },
      indexAs: {
        type: String,
        value: "index"
      },
      itemsIndexAs: {
        type: String,
        value: "itemsIndex"
      },
      sort: {
        type: Function,
        observer: "__sortChanged"
      },
      filter: {
        type: Function,
        observer: "__filterChanged"
      },
      observe: {
        type: String,
        observer: "__observeChanged"
      },
      delay: Number,
      renderedItemCount: {
        type: Number,
        notify: !Pe,
        readOnly: !0
      },
      initialCount: {
        type: Number
      },
      targetFramerate: {
        type: Number,
        value: 20
      },
      _targetFrameTime: {
        type: Number,
        computed: "__computeFrameTime(targetFramerate)"
      },
      notifyDomChange: {
        type: Boolean
      },
      reuseChunkedInstances: {
        type: Boolean
      }
    };
  }
  static get observers() {
    return ["__itemsChanged(items.*)"];
  }
  constructor() {
    super(), this.__instances = [], this.__renderDebouncer = null, this.__itemsIdxToInstIdx = {}, this.__chunkCount = null, this.__renderStartTime = null, this.__itemsArrayChanged = !1, this.__shouldMeasureChunk = !1, this.__shouldContinueChunking = !1, this.__chunkingId = 0, this.__sortFn = null, this.__filterFn = null, this.__observePaths = null, this.__ctor = null, this.__isDetached = !0, this.template = null, this._templateInfo;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.__isDetached = !0;
    for (let t = 0; t < this.__instances.length; t++)
      this.__detachInstance(t);
    this.__chunkingId && cancelAnimationFrame(this.__chunkingId);
  }
  connectedCallback() {
    if (super.connectedCallback(), n1() || (this.style.display = "none"), this.__isDetached) {
      this.__isDetached = !1;
      let t = u(u(this).parentNode);
      for (let i = 0; i < this.__instances.length; i++)
        this.__attachInstance(i, t);
      this.__chunkingId && this.__render();
    }
  }
  __ensureTemplatized() {
    if (!this.__ctor) {
      const t = this;
      let i = this.template = t._templateInfo ? t : this.querySelector("template");
      if (!i) {
        let s = new MutationObserver(() => {
          if (this.querySelector("template"))
            s.disconnect(), this.__render();
          else
            throw new Error("dom-repeat requires a <template> child");
        });
        return s.observe(this, { childList: !0 }), !1;
      }
      let r = {};
      r[this.as] = !0, r[this.indexAs] = !0, r[this.itemsIndexAs] = !0, this.__ctor = Wt(i, this, {
        mutableData: this.mutableData,
        parentModel: !0,
        instanceProps: r,
        forwardHostProp: function(s, n) {
          let l = this.__instances;
          for (let o = 0, a; o < l.length && (a = l[o]); o++)
            a.forwardHostProp(s, n);
        },
        notifyInstanceProp: function(s, n, l) {
          if (k2(this.as, n)) {
            let o = s[this.itemsIndexAs];
            n == this.as && (this.items[o] = l);
            let a = Ht(this.as, `${JSCompiler_renameProperty("items", this)}.${o}`, n);
            this.notifyPath(a, l);
          }
        }
      });
    }
    return !0;
  }
  __getMethodHost() {
    return this.__dataHost._methodHost || this.__dataHost;
  }
  __functionFromPropertyValue(t) {
    if (typeof t == "string") {
      let i = t, r = this.__getMethodHost();
      return function() {
        return r[i].apply(r, arguments);
      };
    }
    return t;
  }
  __sortChanged(t) {
    this.__sortFn = this.__functionFromPropertyValue(t), this.items && this.__debounceRender(this.__render);
  }
  __filterChanged(t) {
    this.__filterFn = this.__functionFromPropertyValue(t), this.items && this.__debounceRender(this.__render);
  }
  __computeFrameTime(t) {
    return Math.ceil(1e3 / t);
  }
  __observeChanged() {
    this.__observePaths = this.observe && this.observe.replace(".*", ".").split(" ");
  }
  __handleObservedPaths(t) {
    if (this.__sortFn || this.__filterFn) {
      if (!t)
        this.__debounceRender(this.__render, this.delay);
      else if (this.__observePaths) {
        let i = this.__observePaths;
        for (let r = 0; r < i.length; r++)
          t.indexOf(i[r]) === 0 && this.__debounceRender(this.__render, this.delay);
      }
    }
  }
  __itemsChanged(t) {
    this.items && !Array.isArray(this.items) && console.warn("dom-repeat expected array for `items`, found", this.items), this.__handleItemPath(t.path, t.value) || (t.path === "items" && (this.__itemsArrayChanged = !0), this.__debounceRender(this.__render));
  }
  __debounceRender(t, i = 0) {
    this.__renderDebouncer = B.debounce(
      this.__renderDebouncer,
      i > 0 ? mt.after(i) : N,
      t.bind(this)
    ), Yi(this.__renderDebouncer);
  }
  render() {
    this.__debounceRender(this.__render), ls();
  }
  __render() {
    if (!this.__ensureTemplatized())
      return;
    let t = this.items || [];
    const i = this.__sortAndFilterItems(t), r = this.__calculateLimit(i.length);
    this.__updateInstances(t, r, i), this.initialCount && (this.__shouldMeasureChunk || this.__shouldContinueChunking) && (cancelAnimationFrame(this.__chunkingId), this.__chunkingId = requestAnimationFrame(() => {
      this.__chunkingId = null, this.__continueChunking();
    })), this._setRenderedItemCount(this.__instances.length), (!Pe || this.notifyDomChange) && this.dispatchEvent(new CustomEvent("dom-change", {
      bubbles: !0,
      composed: !0
    }));
  }
  __sortAndFilterItems(t) {
    let i = new Array(t.length);
    for (let r = 0; r < t.length; r++)
      i[r] = r;
    return this.__filterFn && (i = i.filter((r, s, n) => this.__filterFn(t[r], s, n))), this.__sortFn && i.sort((r, s) => this.__sortFn(t[r], t[s])), i;
  }
  __calculateLimit(t) {
    let i = t;
    const r = this.__instances.length;
    if (this.initialCount) {
      let s;
      !this.__chunkCount || this.__itemsArrayChanged && !this.reuseChunkedInstances ? (i = Math.min(t, this.initialCount), s = Math.max(i - r, 0), this.__chunkCount = s || 1) : (s = Math.min(
        Math.max(t - r, 0),
        this.__chunkCount
      ), i = Math.min(r + s, t)), this.__shouldMeasureChunk = s === this.__chunkCount, this.__shouldContinueChunking = i < t, this.__renderStartTime = performance.now();
    }
    return this.__itemsArrayChanged = !1, i;
  }
  __continueChunking() {
    if (this.__shouldMeasureChunk) {
      const t = performance.now() - this.__renderStartTime, i = this._targetFrameTime / t;
      this.__chunkCount = Math.round(this.__chunkCount * i) || 1;
    }
    this.__shouldContinueChunking && this.__debounceRender(this.__render);
  }
  __updateInstances(t, i, r) {
    const s = this.__itemsIdxToInstIdx = {};
    let n;
    for (n = 0; n < i; n++) {
      let l = this.__instances[n], o = r[n], a = t[o];
      s[o] = n, l ? (l._setPendingProperty(this.as, a), l._setPendingProperty(this.indexAs, n), l._setPendingProperty(this.itemsIndexAs, o), l._flushProperties()) : this.__insertInstance(a, n, o);
    }
    for (let l = this.__instances.length - 1; l >= n; l--)
      this.__detachAndRemoveInstance(l);
  }
  __detachInstance(t) {
    let i = this.__instances[t];
    const r = u(i.root);
    for (let s = 0; s < i.children.length; s++) {
      let n = i.children[s];
      r.appendChild(n);
    }
    return i;
  }
  __attachInstance(t, i) {
    let r = this.__instances[t];
    i.insertBefore(r.root, this);
  }
  __detachAndRemoveInstance(t) {
    this.__detachInstance(t), this.__instances.splice(t, 1);
  }
  __stampInstance(t, i, r) {
    let s = {};
    return s[this.as] = t, s[this.indexAs] = i, s[this.itemsIndexAs] = r, new this.__ctor(s);
  }
  __insertInstance(t, i, r) {
    const s = this.__stampInstance(t, i, r);
    let n = this.__instances[i + 1], l = n ? n.children[0] : this;
    return u(u(this).parentNode).insertBefore(s.root, l), this.__instances[i] = s, s;
  }
  _showHideChildren(t) {
    for (let i = 0; i < this.__instances.length; i++)
      this.__instances[i]._showHideChildren(t);
  }
  __handleItemPath(t, i) {
    let r = t.slice(6), s = r.indexOf("."), n = s < 0 ? r : r.substring(0, s);
    if (n == parseInt(n, 10)) {
      let l = s < 0 ? "" : r.substring(s + 1);
      this.__handleObservedPaths(l);
      let o = this.__itemsIdxToInstIdx[n], a = this.__instances[o];
      if (a) {
        let h = this.as + (l ? "." + l : "");
        a._setPendingPropertyOrPath(h, i, !1, !0), a._flushProperties();
      }
      return !0;
    }
  }
  itemForElement(t) {
    let i = this.modelForElement(t);
    return i && i[this.as];
  }
  indexForElement(t) {
    let i = this.modelForElement(t);
    return i && i[this.indexAs];
  }
  modelForElement(t) {
    return $n(this.template, t);
  }
}
customElements.define(oi.is, oi);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class ys extends l1 {
  static get is() {
    return "dom-if";
  }
  static get template() {
    return null;
  }
  static get properties() {
    return {
      if: {
        type: Boolean,
        observer: "__debounceRender"
      },
      restamp: {
        type: Boolean,
        observer: "__debounceRender"
      },
      notifyDomChange: {
        type: Boolean
      }
    };
  }
  constructor() {
    super(), this.__renderDebouncer = null, this._lastIf = !1, this.__hideTemplateChildren__ = !1, this.__template, this._templateInfo;
  }
  __debounceRender() {
    this.__renderDebouncer = B.debounce(
      this.__renderDebouncer,
      N,
      () => this.__render()
    ), Yi(this.__renderDebouncer);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    const t = u(this).parentNode;
    (!t || t.nodeType == Node.DOCUMENT_FRAGMENT_NODE && !u(t).host) && this.__teardownInstance();
  }
  connectedCallback() {
    super.connectedCallback(), n1() || (this.style.display = "none"), this.if && this.__debounceRender();
  }
  __ensureTemplate() {
    if (!this.__template) {
      const t = this;
      let i = t._templateInfo ? t : u(t).querySelector("template");
      if (!i) {
        let r = new MutationObserver(() => {
          if (u(this).querySelector("template"))
            r.disconnect(), this.__render();
          else
            throw new Error("dom-if requires a <template> child");
        });
        return r.observe(this, { childList: !0 }), !1;
      }
      this.__template = i;
    }
    return !0;
  }
  __ensureInstance() {
    let t = u(this).parentNode;
    if (this.__hasInstance()) {
      let i = this.__getInstanceNodes();
      if (i && i.length && u(this).previousSibling !== i[i.length - 1])
        for (let s = 0, n; s < i.length && (n = i[s]); s++)
          u(t).insertBefore(n, this);
    } else {
      if (!t || !this.__ensureTemplate())
        return !1;
      this.__createAndInsertInstance(t);
    }
    return !0;
  }
  render() {
    ls();
  }
  __render() {
    if (this.if) {
      if (!this.__ensureInstance())
        return;
    } else
      this.restamp && this.__teardownInstance();
    this._showHideChildren(), (!Pe || this.notifyDomChange) && this.if != this._lastIf && (this.dispatchEvent(new CustomEvent("dom-change", {
      bubbles: !0,
      composed: !0
    })), this._lastIf = this.if);
  }
  __hasInstance() {
  }
  __getInstanceNodes() {
  }
  __createAndInsertInstance(t) {
  }
  __teardownInstance() {
  }
  _showHideChildren() {
  }
}
class Un extends ys {
  constructor() {
    super(), this.__instance = null, this.__syncInfo = null;
  }
  __hasInstance() {
    return Boolean(this.__instance);
  }
  __getInstanceNodes() {
    return this.__instance.templateInfo.childNodes;
  }
  __createAndInsertInstance(t) {
    const i = this.__dataHost || this;
    if (it && !this.__dataHost)
      throw new Error("strictTemplatePolicy: template owner not trusted");
    const r = i._bindTemplate(
      this.__template,
      !0
    );
    r.runEffects = (s, n, l) => {
      let o = this.__syncInfo;
      if (this.if)
        o && (this.__syncInfo = null, this._showHideChildren(), n = Object.assign(o.changedProps, n)), s(n, l);
      else if (this.__instance)
        if (o || (o = this.__syncInfo = { runEffects: s, changedProps: {} }), l)
          for (const a in n) {
            const h = x(a);
            o.changedProps[h] = this.__dataHost[h];
          }
        else
          Object.assign(o.changedProps, n);
    }, this.__instance = i._stampTemplate(
      this.__template,
      r
    ), u(t).insertBefore(this.__instance, this);
  }
  __syncHostProperties() {
    const t = this.__syncInfo;
    t && (this.__syncInfo = null, t.runEffects(t.changedProps, !1));
  }
  __teardownInstance() {
    const t = this.__dataHost || this;
    this.__instance && (t._removeBoundDom(this.__instance), this.__instance = null, this.__syncInfo = null);
  }
  _showHideChildren() {
    const t = this.__hideTemplateChildren__ || !this.if;
    this.__instance && Boolean(this.__instance.__hidden) !== t && (this.__instance.__hidden = t, ms(t, this.__instance.templateInfo.childNodes)), t || this.__syncHostProperties();
  }
}
class jn extends ys {
  constructor() {
    super(), this.__ctor = null, this.__instance = null, this.__invalidProps = null;
  }
  __hasInstance() {
    return Boolean(this.__instance);
  }
  __getInstanceNodes() {
    return this.__instance.children;
  }
  __createAndInsertInstance(t) {
    this.__ctor || (this.__ctor = Wt(
      this.__template,
      this,
      {
        mutableData: !0,
        forwardHostProp: function(i, r) {
          this.__instance && (this.if ? this.__instance.forwardHostProp(i, r) : (this.__invalidProps = this.__invalidProps || /* @__PURE__ */ Object.create(null), this.__invalidProps[x(i)] = !0));
        }
      }
    )), this.__instance = new this.__ctor(), u(t).insertBefore(this.__instance.root, this);
  }
  __teardownInstance() {
    if (this.__instance) {
      let t = this.__instance.children;
      if (t && t.length) {
        let i = u(t[0]).parentNode;
        if (i) {
          i = u(i);
          for (let r = 0, s; r < t.length && (s = t[r]); r++)
            i.removeChild(s);
        }
      }
      this.__invalidProps = null, this.__instance = null;
    }
  }
  __syncHostProperties() {
    let t = this.__invalidProps;
    if (t) {
      this.__invalidProps = null;
      for (let i in t)
        this.__instance._setPendingProperty(i, this.__dataHost[i]);
      this.__instance._flushProperties();
    }
  }
  _showHideChildren() {
    const t = this.__hideTemplateChildren__ || !this.if;
    this.__instance && Boolean(this.__instance.__hidden) !== t && (this.__instance.__hidden = t, this.__instance._showHideChildren(t)), t || this.__syncHostProperties();
  }
}
const ai = Li ? Un : jn;
customElements.define(ai.is, ai);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let qn = P((e) => {
  let t = ee(e);
  class i extends t {
    static get properties() {
      return {
        items: {
          type: Array
        },
        multi: {
          type: Boolean,
          value: !1
        },
        selected: { type: Object, notify: !0 },
        selectedItem: { type: Object, notify: !0 },
        toggle: { type: Boolean, value: !1 }
      };
    }
    static get observers() {
      return ["__updateSelection(multi, items.*)"];
    }
    constructor() {
      super(), this.__lastItems = null, this.__lastMulti = null, this.__selectedMap = null;
    }
    __updateSelection(s, n) {
      let l = n.path;
      if (l == JSCompiler_renameProperty("items", this)) {
        let o = n.base || [], a = this.__lastItems, h = this.__lastMulti;
        if (s !== h && this.clearSelection(), a) {
          let c = ns(o, a);
          this.__applySplices(c);
        }
        this.__lastItems = o, this.__lastMulti = s;
      } else if (n.path == `${JSCompiler_renameProperty("items", this)}.splices`)
        this.__applySplices(n.value.indexSplices);
      else {
        let o = l.slice(`${JSCompiler_renameProperty("items", this)}.`.length), a = parseInt(o, 10);
        o.indexOf(".") < 0 && o == a && this.__deselectChangedIdx(a);
      }
    }
    __applySplices(s) {
      let n = this.__selectedMap;
      for (let o = 0; o < s.length; o++) {
        let a = s[o];
        n.forEach((h, c) => {
          h < a.index || (h >= a.index + a.removed.length ? n.set(c, h + a.addedCount - a.removed.length) : n.set(c, -1));
        });
        for (let h = 0; h < a.addedCount; h++) {
          let c = a.index + h;
          n.has(this.items[c]) && n.set(this.items[c], c);
        }
      }
      this.__updateLinks();
      let l = 0;
      n.forEach((o, a) => {
        o < 0 ? (this.multi ? this.splice(JSCompiler_renameProperty("selected", this), l, 1) : this.selected = this.selectedItem = null, n.delete(a)) : l++;
      });
    }
    __updateLinks() {
      if (this.__dataLinkedPaths = {}, this.multi) {
        let s = 0;
        this.__selectedMap.forEach((n) => {
          n >= 0 && this.linkPaths(
            `${JSCompiler_renameProperty("items", this)}.${n}`,
            `${JSCompiler_renameProperty("selected", this)}.${s++}`
          );
        });
      } else
        this.__selectedMap.forEach((s) => {
          this.linkPaths(
            JSCompiler_renameProperty("selected", this),
            `${JSCompiler_renameProperty("items", this)}.${s}`
          ), this.linkPaths(
            JSCompiler_renameProperty("selectedItem", this),
            `${JSCompiler_renameProperty("items", this)}.${s}`
          );
        });
    }
    clearSelection() {
      this.__dataLinkedPaths = {}, this.__selectedMap = /* @__PURE__ */ new Map(), this.selected = this.multi ? [] : null, this.selectedItem = null;
    }
    isSelected(s) {
      return this.__selectedMap.has(s);
    }
    isIndexSelected(s) {
      return this.isSelected(this.items[s]);
    }
    __deselectChangedIdx(s) {
      let n = this.__selectedIndexForItemIndex(s);
      if (n >= 0) {
        let l = 0;
        this.__selectedMap.forEach((o, a) => {
          n == l++ && this.deselect(a);
        });
      }
    }
    __selectedIndexForItemIndex(s) {
      let n = this.__dataLinkedPaths[`${JSCompiler_renameProperty("items", this)}.${s}`];
      if (n)
        return parseInt(n.slice(`${JSCompiler_renameProperty("selected", this)}.`.length), 10);
    }
    deselect(s) {
      let n = this.__selectedMap.get(s);
      if (n >= 0) {
        this.__selectedMap.delete(s);
        let l;
        this.multi && (l = this.__selectedIndexForItemIndex(n)), this.__updateLinks(), this.multi ? this.splice(JSCompiler_renameProperty("selected", this), l, 1) : this.selected = this.selectedItem = null;
      }
    }
    deselectIndex(s) {
      this.deselect(this.items[s]);
    }
    select(s) {
      this.selectIndex(this.items.indexOf(s));
    }
    selectIndex(s) {
      let n = this.items[s];
      this.isSelected(n) ? this.toggle && this.deselectIndex(s) : (this.multi || this.__selectedMap.clear(), this.__selectedMap.set(n, s), this.__updateLinks(), this.multi ? this.push(JSCompiler_renameProperty("selected", this), n) : this.selected = this.selectedItem = n);
    }
  }
  return i;
}), Yn = qn(l1);
class hi extends Yn {
  static get is() {
    return "array-selector";
  }
  static get template() {
    return null;
  }
}
customElements.define(hi.is, hi);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Dt = new I();
window.ShadyCSS || (window.ShadyCSS = {
  prepareTemplate(e, t, i) {
  },
  prepareTemplateDom(e, t) {
  },
  prepareTemplateStyles(e, t, i) {
  },
  styleSubtree(e, t) {
    Dt.processStyles(), Me(e, t);
  },
  styleElement(e) {
    Dt.processStyles();
  },
  styleDocument(e) {
    Dt.processStyles(), Me(document.body, e);
  },
  getComputedStyleValue(e, t) {
    return Hi(e, t);
  },
  flushCustomStyles() {
  },
  nativeCss: Be,
  nativeShadow: Zt,
  cssBuild: bt,
  disableRuntime: _i
});
window.ShadyCSS.CustomStyleInterface = Dt;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const ci = "include", Jn = window.ShadyCSS.CustomStyleInterface;
class Xn extends HTMLElement {
  constructor() {
    super(), this._style = null, Jn.addCustomStyle(this);
  }
  getStyle() {
    if (this._style)
      return this._style;
    const t = this.querySelector("style");
    if (!t)
      return null;
    this._style = t;
    const i = t.getAttribute(ci);
    return i && (t.removeAttribute(ci), t.textContent = x2(i) + t.textContent), this.ownerDocument !== window.document && window.document.head.appendChild(this), this._style;
  }
}
window.customElements.define("custom-style", Xn);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Gn = hs(HTMLElement).prototype;
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const zs = se`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;
zs.setAttribute("style", "display: none;");
document.head.appendChild(zs.content);
var bs = document.createElement("style");
bs.textContent = "[hidden] { display: none !important; }";
document.head.appendChild(bs);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class S {
  constructor(t) {
    S[" "](t), this.type = t && t.type || "default", this.key = t && t.key, t && "value" in t && (this.value = t.value);
  }
  get value() {
    var t = this.type, i = this.key;
    if (t && i)
      return S.types[t] && S.types[t][i];
  }
  set value(t) {
    var i = this.type, r = this.key;
    i && r && (i = S.types[i] = S.types[i] || {}, t == null ? delete i[r] : i[r] = t);
  }
  get list() {
    var t = this.type;
    if (t) {
      var i = S.types[this.type];
      return i ? Object.keys(i).map(function(r) {
        return Wn[this.type][r];
      }, this) : [];
    }
  }
  byKey(t) {
    return this.key = t, this.value;
  }
}
S[" "] = function() {
};
S.types = {};
var Wn = S.types;
xt({
  is: "iron-meta",
  properties: {
    type: {
      type: String,
      value: "default"
    },
    key: {
      type: String
    },
    value: {
      type: String,
      notify: !0
    },
    self: { type: Boolean, observer: "_selfChanged" },
    __meta: { type: Boolean, computed: "__computeMeta(type, key, value)" }
  },
  hostAttributes: { hidden: !0 },
  __computeMeta: function(e, t, i) {
    var r = new S({ type: e, key: t });
    return i !== void 0 && i !== r.value ? r.value = i : this.value !== r.value && (this.value = r.value), r;
  },
  get list() {
    return this.__meta && this.__meta.list;
  },
  _selfChanged: function(e) {
    e && (this.value = this);
  },
  byKey: function(e) {
    return new S({ type: this.type, key: e }).value;
  }
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
xt({
  _template: se`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        @apply --iron-icon;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
`,
  is: "iron-icon",
  properties: {
    icon: { type: String },
    theme: { type: String },
    src: { type: String },
    _meta: { value: Gn.create("iron-meta", { type: "iconset" }) }
  },
  observers: [
    "_updateIcon(_meta, isAttached)",
    "_updateIcon(theme, isAttached)",
    "_srcChanged(src, isAttached)",
    "_iconChanged(icon, isAttached)"
  ],
  _DEFAULT_ICONSET: "icons",
  _iconChanged: function(e) {
    var t = (e || "").split(":");
    this._iconName = t.pop(), this._iconsetName = t.pop() || this._DEFAULT_ICONSET, this._updateIcon();
  },
  _srcChanged: function(e) {
    this._updateIcon();
  },
  _usesIconset: function() {
    return this.icon || !this.src;
  },
  _updateIcon: function() {
    this._usesIconset() ? (this._img && this._img.parentNode && L(this.root).removeChild(this._img), this._iconName === "" ? this._iconset && this._iconset.removeIcon(this) : this._iconsetName && this._meta && (this._iconset = this._meta.byKey(this._iconsetName), this._iconset ? (this._iconset.applyIcon(this, this._iconName, this.theme), this.unlisten(window, "iron-iconset-added", "_updateIcon")) : this.listen(window, "iron-iconset-added", "_updateIcon"))) : (this._iconset && this._iconset.removeIcon(this), this._img || (this._img = document.createElement("img"), this._img.style.width = "100%", this._img.style.height = "100%", this._img.draggable = !1), this._img.src = this.src, L(this.root).appendChild(this._img));
  }
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
xt({
  is: "iron-iconset-svg",
  properties: {
    name: { type: String, observer: "_nameChanged" },
    size: { type: Number, value: 24 },
    rtlMirroring: { type: Boolean, value: !1 },
    useGlobalRtlAttribute: { type: Boolean, value: !1 }
  },
  created: function() {
    this._meta = new S({ type: "iconset", key: null, value: null });
  },
  attached: function() {
    this.style.display = "none";
  },
  getIconNames: function() {
    return this._icons = this._createIconMap(), Object.keys(this._icons).map(function(e) {
      return this.name + ":" + e;
    }, this);
  },
  applyIcon: function(e, t) {
    this.removeIcon(e);
    var i = this._cloneIcon(
      t,
      this.rtlMirroring && this._targetIsRTL(e)
    );
    if (i) {
      var r = L(e.root || e);
      return r.insertBefore(i, r.childNodes[0]), e._svgIcon = i;
    }
    return null;
  },
  removeIcon: function(e) {
    e._svgIcon && (L(e.root || e).removeChild(e._svgIcon), e._svgIcon = null);
  },
  _targetIsRTL: function(e) {
    if (this.__targetIsRTL == null)
      if (this.useGlobalRtlAttribute) {
        var t = document.body && document.body.hasAttribute("dir") ? document.body : document.documentElement;
        this.__targetIsRTL = t.getAttribute("dir") === "rtl";
      } else
        e && e.nodeType !== Node.ELEMENT_NODE && (e = e.host), this.__targetIsRTL = e && window.getComputedStyle(e).direction === "rtl";
    return this.__targetIsRTL;
  },
  _nameChanged: function() {
    this._meta.value = null, this._meta.key = this.name, this._meta.value = this, this.async(function() {
      this.fire("iron-iconset-added", this, { node: window });
    });
  },
  _createIconMap: function() {
    var e = /* @__PURE__ */ Object.create(null);
    return L(this).querySelectorAll("[id]").forEach(function(t) {
      e[t.id] = t;
    }), e;
  },
  _cloneIcon: function(e, t) {
    return this._icons = this._icons || this._createIconMap(), this._prepareSvgClone(this._icons[e], this.size, t);
  },
  _prepareSvgClone: function(e, t, i) {
    if (e) {
      var r = e.cloneNode(!0), s = document.createElementNS("http://www.w3.org/2000/svg", "svg"), n = r.getAttribute("viewBox") || "0 0 " + t + " " + t, l = "pointer-events: none; display: block; width: 100%; height: 100%;";
      return i && r.hasAttribute("mirror-in-rtl") && (l += "-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"), s.setAttribute("viewBox", n), s.setAttribute("preserveAspectRatio", "xMidYMid meet"), s.setAttribute("focusable", "false"), s.style.cssText = l, s.appendChild(r).removeAttribute("id"), s;
    }
    return null;
  }
});
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Kn = se`<iron-iconset-svg name="icons" size="24">
<svg><defs>
<g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>
<g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>
<g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>
<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>
<g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>
<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>
<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
<g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>
<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>
<g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
<g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>
<g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>
<g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>
<g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>
<g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>
<g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>
<g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>
<g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>
<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>
<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
<g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>
<g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>
<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
<g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>
<g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>
<g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>
<g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>
<g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>
<g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>
<g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>
<g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>
<g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>
<g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>
<g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>
<g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>
<g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>
<g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>
<g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
<g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>
<g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>
<g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>
<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
<g id="check-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="check-box-outline-blank"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
<g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>
<g id="class"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>
<g id="cloud-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"></path></g>
<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>
<g id="cloud-download"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g>
<g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>
<g id="cloud-queue"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path></g>
<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
<g id="compare-arrows"><path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path></g>
<g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
<g id="content-cut"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"></path></g>
<g id="content-paste"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>
<g id="copyright"><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="create-new-folder"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g>
<g id="credit-card"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="dashboard"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g>
<g id="date-range"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g>
<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-forever"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-sweep"><path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"></path></g>
<g id="description"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></g>
<g id="dns"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="done"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g>
<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>
<g id="donut-large"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"></path></g>
<g id="donut-small"><path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z"></path></g>
<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>
<g id="eject"><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g>
<g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="euro-symbol"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"></path></g>
<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="event-seat"><path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></g>
<g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
<g id="explore"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></g>
<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>
<g id="face"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></g>
<g id="favorite"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></g>
<g id="favorite-border"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></g>
<g id="feedback"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g>
<g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>
<g id="filter-list"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>
<g id="find-in-page"><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></g>
<g id="find-replace"><path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"></path></g>
<g id="fingerprint"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g>
<g id="first-page"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g>
<g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
<g id="flight-land"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"></path></g>
<g id="flight-takeoff"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path></g>
<g id="flip-to-back"><path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"></path></g>
<g id="flip-to-front"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g>
<g id="folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>
<g id="folder-open"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g>
<g id="folder-shared"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g>
<g id="font-download"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"></path></g>
<g id="forward"><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g>
<g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
<g id="fullscreen-exit"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>
<g id="g-translate"><path d="M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z"></path></g>
<g id="gavel"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></g>
<g id="gesture"><path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path></g>
<g id="get-app"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="gif"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></g>
<g id="grade"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="group-work"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>
<g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>
<g id="highlight-off"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="history"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>
<g id="hourglass-empty"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g>
<g id="hourglass-full"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g>
<g id="http"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"></path></g>
<g id="https"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="important-devices"><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"></path></g>
<g id="inbox"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path></g>
<g id="indeterminate-check-box"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g>
<g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>
<g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>
<g id="input"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"></path></g>
<g id="invert-colors"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path></g>
<g id="label"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g>
<g id="label-outline"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></g>
<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
<g id="last-page"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g>
<g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="lightbulb-outline"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></g>
<g id="line-style"><path d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"></path></g>
<g id="line-weight"><path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"></path></g>
<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="list"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g>
<g id="lock"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="lock-open"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g>
<g id="lock-outline"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g>
<g id="low-priority"><path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"></path></g>
<g id="loyalty"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"></path></g>
<g id="mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread-mailbox"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="motorcycle"><path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g>
<g id="move-to-inbox"><path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"></path></g>
<g id="next-week"><path d="M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"></path></g>
<g id="note-add"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path></g>
<g id="offline-pin"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g>
<g id="opacity"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"></path></g>
<g id="open-in-browser"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></g>
<g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="open-with"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g>
<g id="pageview"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"></path></g>
<g id="pan-tool"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path></g>
<g id="payment"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="perm-camera-mic"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>
<g id="perm-contact-calendar"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"></path></g>
<g id="perm-data-setting"><path d="M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="perm-device-information"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>
<g id="perm-identity"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>
<g id="perm-media"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></g>
<g id="perm-phone-msg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"></path></g>
<g id="perm-scan-wifi"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"></path></g>
<g id="pets"><circle cx="4.5" cy="9.5" r="2.5"></circle><circle cx="9" cy="5.5" r="2.5"></circle><circle cx="15" cy="5.5" r="2.5"></circle><circle cx="19.5" cy="9.5" r="2.5"></circle><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path></g>
<g id="picture-in-picture"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"></path></g>
<g id="picture-in-picture-alt"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path></g>
<g id="play-for-work"><path d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"></path></g>
<g id="polymer"><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g>
<g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>
<g id="pregnant-woman"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"></path></g>
<g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>
<g id="query-builder"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="question-answer"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>
<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="receipt"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g>
<g id="record-voice-over"><circle cx="9" cy="9" r="4"></circle><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"></path></g>
<g id="redeem"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>
<g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>
<g id="remove"><path d="M19 13H5v-2h14v2z"></path></g>
<g id="remove-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g>
<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="remove-shopping-cart"><path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path></g>
<g id="reorder"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g>
<g id="reply"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="reply-all"><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>
<g id="report-problem"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="restore-page"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g>
<g id="room"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="rounded-corner"><path d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"></path></g>
<g id="rowing"><path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z"></path></g>
<g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>
<g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
<g id="select-all"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"></path></g>
<g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>
<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
<g id="settings-applications"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>
<g id="settings-backup-restore"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>
<g id="settings-bluetooth"><path d="M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z"></path></g>
<g id="settings-brightness"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"></path></g>
<g id="settings-cell"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g>
<g id="settings-ethernet"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></g>
<g id="settings-input-antenna"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z"></path></g>
<g id="settings-input-component"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-composite"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-hdmi"><path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"></path></g>
<g id="settings-input-svideo"><path d="M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>
<g id="settings-overscan"><path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="settings-phone"><path d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"></path></g>
<g id="settings-power"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z"></path></g>
<g id="settings-remote"><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"></path></g>
<g id="settings-voice"><path d="M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z"></path></g>
<g id="shop"><path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path></g>
<g id="shop-two"><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g>
<g id="shopping-basket"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="sort"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g>
<g id="speaker-notes"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z"></path></g>
<g id="speaker-notes-off"><path d="M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z"></path></g>
<g id="spellcheck"><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g>
<g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="star-border"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="star-half"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>
<g id="store"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g>
<g id="subdirectory-arrow-left"><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"></path></g>
<g id="subdirectory-arrow-right"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></g>
<g id="subject"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g>
<g id="supervisor-account"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path></g>
<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>
<g id="swap-vert"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g>
<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>
<g id="system-update-alt"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"></path></g>
<g id="tab"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g>
<g id="tab-unselected"><path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>
<g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
<g id="theaters"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></g>
<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>
<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>
<g id="thumbs-up-down"><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></g>
<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>
<g id="toc"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g>
<g id="today"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>
<g id="toll"><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z"></path></g>
<g id="touch-app"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"></path></g>
<g id="track-changes"><path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"></path></g>
<g id="translate"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></g>
<g id="trending-down"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path></g>
<g id="trending-flat"><path d="M22 12l-4-4v3H3v2h15v3z"></path></g>
<g id="trending-up"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g>
<g id="turned-in"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="turned-in-not"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="unarchive"><path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"></path></g>
<g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>
<g id="unfold-less"><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path></g>
<g id="unfold-more"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path></g>
<g id="update"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></g>
<g id="verified-user"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="view-agenda"><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g>
<g id="view-array"><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g>
<g id="view-carousel"><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g>
<g id="view-column"><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g>
<g id="view-day"><path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"></path></g>
<g id="view-headline"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g>
<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>
<g id="view-module"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g>
<g id="view-quilt"><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g>
<g id="view-stream"><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g>
<g id="view-week"><path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path></g>
<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="visibility-off"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></g>
<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="watch-later"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path></g>
<g id="weekend"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path></g>
<g id="work"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g>
<g id="youtube-searched-for"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></g>
<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>
<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>
</defs></svg>
</iron-iconset-svg>`;
document.head.appendChild(Kn.content);
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Zn = se`<iron-iconset-svg name="av" size="24">
<svg><defs>
<g id="add-to-queue"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2h-3v3h-2v-3H8v-2h3V7h2v3h3z"></path></g>
<g id="airplay"><path d="M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="album"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"></path></g>
<g id="art-track"><path d="M22 13h-8v-2h8v2zm0-6h-8v2h8V7zm-8 10h8v-2h-8v2zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm-1.5 6l-2.25-3-1.75 2.26-1.25-1.51L3.5 15h7z"></path></g>
<g id="av-timer"><path d="M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9h-1zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"></path></g>
<g id="branding-watermark"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16h-9v-6h9v6z"></path></g>
<g id="call-to-action"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3v-3h18v3z"></path></g>
<g id="closed-caption"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"></path></g>
<g id="equalizer"><path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"></path></g>
<g id="explicit"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z"></path></g>
<g id="fast-forward"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"></path></g>
<g id="fast-rewind"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"></path></g>
<g id="featured-play-list"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 8H3V9h9v2zm0-4H3V5h9v2z"></path></g>
<g id="featured-video"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 9H3V5h9v7z"></path></g>
<g id="fiber-dvr"><path d="M17.5 10.5h2v1h-2zm-13 0h2v3h-2zM21 3H3c-1.11 0-2 .89-2 2v14c0 1.1.89 2 2 2h18c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zM8 13.5c0 .85-.65 1.5-1.5 1.5H3V9h3.5c.85 0 1.5.65 1.5 1.5v3zm4.62 1.5h-1.5L9.37 9h1.5l1 3.43 1-3.43h1.5l-1.75 6zM21 11.5c0 .6-.4 1.15-.9 1.4L21 15h-1.5l-.85-2H17.5v2H16V9h3.5c.85 0 1.5.65 1.5 1.5v1z"></path></g>
<g id="fiber-manual-record"><circle cx="12" cy="12" r="8"></circle></g>
<g id="fiber-new"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM8.5 15H7.3l-2.55-3.5V15H3.5V9h1.25l2.5 3.5V9H8.5v6zm5-4.74H11v1.12h2.5v1.26H11v1.11h2.5V15h-4V9h4v1.26zm7 3.74c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1V9h1.25v4.51h1.13V9.99h1.25v3.51h1.12V9h1.25v5z"></path></g>
<g id="fiber-pin"><path d="M5.5 10.5h2v1h-2zM20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM9 11.5c0 .85-.65 1.5-1.5 1.5h-2v2H4V9h3.5c.85 0 1.5.65 1.5 1.5v1zm3.5 3.5H11V9h1.5v6zm7.5 0h-1.2l-2.55-3.5V15H15V9h1.25l2.5 3.5V9H20v6z"></path></g>
<g id="fiber-smart-record"><g><circle cx="9" cy="12" r="8"></circle><path d="M17 4.26v2.09c2.33.82 4 3.04 4 5.65s-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74s-2.55-6.85-6-7.74z"></path></g></g>
<g id="forward-10"><path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.8 3H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path></g>
<g id="forward-30"><path d="M9.6 13.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5zM4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8z"></path></g>
<g id="forward-5"><path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.7.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.5.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.6z"></path></g>
<g id="games"><path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"></path></g>
<g id="hd"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm2-6h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4V9zm1.5 4.5h2v-3h-2v3z"></path></g>
<g id="hearing"><path d="M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.32-2.53C9.29 10.98 9 9.93 9 9c0-2.8 2.2-5 5-5s5 2.2 5 5h2c0-3.93-3.07-7-7-7S7 5.07 7 9c0 1.26.38 2.65 1.07 3.9.91 1.65 1.98 2.48 2.85 3.15.81.62 1.39 1.07 1.71 2.05.6 1.82 1.37 2.84 2.73 3.55.51.23 1.07.35 1.64.35 2.21 0 4-1.79 4-4h-2c0 1.1-.9 2-2 2zM7.64 2.64L6.22 1.22C4.23 3.21 3 5.96 3 9s1.23 5.79 3.22 7.78l1.41-1.41C6.01 13.74 5 11.49 5 9s1.01-4.74 2.64-6.36zM11.5 9c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z"></path></g>
<g id="high-quality"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 11H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm7-1c0 .55-.45 1-1 1h-.75v1.5h-1.5V15H14c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v4zm-3.5-.5h2v-3h-2v3z"></path></g>
<g id="library-add"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></g>
<g id="library-books"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"></path></g>
<g id="library-music"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"></path></g>
<g id="loop"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"></path></g>
<g id="mic"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></g>
<g id="mic-none"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1.2-9.1c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2l-.01 6.2c0 .66-.53 1.2-1.19 1.2-.66 0-1.2-.54-1.2-1.2V4.9zm6.5 6.1c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></g>
<g id="mic-off"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"></path></g>
<g id="movie"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"></path></g>
<g id="music-video"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v7.03c-.02 1.64-1.35 2.97-3 2.97-1.66 0-3-1.34-3-3z"></path></g>
<g id="new-releases"><path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="not-interested"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"></path></g>
<g id="note"><path d="M22 10l-6-6H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99l16-.01c1.1 0 2-.89 2-1.99v-8zm-7-4.5l5.5 5.5H15V5.5z"></path></g>
<g id="pause"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></g>
<g id="pause-circle-filled"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path></g>
<g id="pause-circle-outline"><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"></path></g>
<g id="play-arrow"><path d="M8 5v14l11-7z"></path></g>
<g id="play-circle-filled"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></g>
<g id="play-circle-outline"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="playlist-add"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"></path></g>
<g id="playlist-add-check"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z"></path></g>
<g id="playlist-play"><path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z"></path></g>
<g id="queue"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></g>
<g id="queue-music"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"></path></g>
<g id="queue-play-next"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h2v-2H3V5h18v8h2V5c0-1.11-.9-2-2-2zm-8 7V7h-2v3H8v2h3v3h2v-3h3v-2h-3zm11 8l-4.5 4.5L18 21l3-3-3-3 1.5-1.5L24 18z"></path></g>
<g id="radio"><path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z"></path></g>
<g id="recent-actors"><path d="M21 5v14h2V5h-2zm-4 14h2V5h-2v14zM14 5H2c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM8 7.75c1.24 0 2.25 1.01 2.25 2.25S9.24 12.25 8 12.25 5.75 11.24 5.75 10 6.76 7.75 8 7.75zM12.5 17h-9v-.75c0-1.5 3-2.25 4.5-2.25s4.5.75 4.5 2.25V17z"></path></g>
<g id="remove-from-queue"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2H8v-2h8z"></path></g>
<g id="repeat"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></g>
<g id="repeat-one"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"></path></g>
<g id="replay"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path></g>
<g id="replay-10"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.1 11H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1c.2.1.3.2.5.3s.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path></g>
<g id="replay-30"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-2.4 8.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5c0-.1-.1-.2-.1-.3s-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path></g>
<g id="replay-5"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.3 8.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.4.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.7z"></path></g>
<g id="shuffle"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path></g>
<g id="skip-next"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></g>
<g id="skip-previous"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></g>
<g id="slow-motion-video"><path d="M13.05 9.79L10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zM11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zM5.69 7.1L4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zm1.61 6.74C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43zM22 12c0 5.16-3.92 9.42-8.95 9.95v-2.02C16.97 19.41 20 16.05 20 12s-3.03-7.41-6.95-7.93V2.05C18.08 2.58 22 6.84 22 12z"></path></g>
<g id="snooze"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-3-9h3.63L9 15.2V17h6v-2h-3.63L15 10.8V9H9v2z"></path></g>
<g id="sort-by-alpha"><path d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"></path></g>
<g id="stop"><path d="M6 6h12v12H6z"></path></g>
<g id="subscriptions"><path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"></path></g>
<g id="subtitles"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z"></path></g>
<g id="surround-sound"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.76 16.24l-1.41 1.41C4.78 16.1 4 14.05 4 12c0-2.05.78-4.1 2.34-5.66l1.41 1.41C6.59 8.93 6 10.46 6 12s.59 3.07 1.76 4.24zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5.66 1.66l-1.41-1.41C17.41 15.07 18 13.54 18 12s-.59-3.07-1.76-4.24l1.41-1.41C19.22 7.9 20 9.95 20 12c0 2.05-.78 4.1-2.34 5.66zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="video-call"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path></g>
<g id="video-label"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path></g>
<g id="video-library"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></g>
<g id="videocam"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></g>
<g id="videocam-off"><path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z"></path></g>
<g id="volume-down"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"></path></g>
<g id="volume-mute"><path d="M7 9v6h4l5 5V4l-5 5H7z"></path></g>
<g id="volume-off"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></g>
<g id="volume-up"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g>
<g id="web"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></g>
<g id="web-asset"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H5V8h14v10z"></path></g>
</defs></svg>
</iron-iconset-svg>`;
document.head.appendChild(Zn.content);
var Qn = Object.defineProperty, tl = Object.getOwnPropertyDescriptor, U = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? tl(t, i) : t, n = e.length - 1, l; n >= 0; n--)
    (l = e[n]) && (s = (r ? l(t, i, s) : l(s)) || s);
  return r && s && Qn(t, i, s), s;
};
let A = class extends dt {
  constructor() {
    super(...arguments), this.mediaUrl = "", this.meta = {}, this.playing = !1, this.playStateRAF = 0, this.playTimePercentage = 0, this.pointerOverSeekBarXPos = 0, this.audioClipDuration = 0, this.ready = !1;
  }
  connectedCallback() {
    super.connectedCallback(), addEventListener("keydown", this._onKeyDown.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._onKeyDown);
  }
  attributeChangedCallback(e, t, i) {
    if (i && i !== t && this.audioElem)
      switch (e) {
        case "mediaurl": {
          this._mediaUrlChange(i);
          break;
        }
        case "title": {
          this._metaAttributeChange(e, i);
          break;
        }
        case "subtitle": {
          this._metaAttributeChange(e, i);
          break;
        }
      }
  }
  render() {
    var e, t;
    return ae`
      <div>
        <audio id="audio"
          controls="none"
          @seeking=${this._playingListener}
          @playing=${this._playingListener}
          @play=${this._playListener}
          @pause=${this._pauseListener}
          @durationchange=${this._onDurationChange}
          @loadeddata=${this._onLoadedData}
          hidden
        ></audio>
      </div>
      
      <div class="progress-container"
        @pointermove=${this._setPointerOverSeek}
        @pointerleave=${this._clearPointerOverSeek}
      >
        
        <div class="progress-indicator-container"
          @click=${this._onSeek}
          @touchmove=${this._onTouchMove}
          style="pointer-events: ${this.ready ? "all" : "none"}"
        >
          <div class="progress-indicator" style="transform: translateX(${this.playTimePercentage - 100}%)" ></div>
        </div>
        
        <div class="play-time-container"
          style="transform: translateX(${this.pointerOverSeekBarXPos}px)"
        >
          <span class="play-time">
            ${this._secondsToTime(this._getSeekVal())}
          </span>
        </div>
      </div>

      <div class="controls-container">
        <div class="media-control-buttons">
          <button tabindex="0" @click=${this._rewind} part="button" ?disabled=${!this.ready} aria-label="rewind audio 5 seconds">
            <iron-icon icon="av:replay-5"></iron-icon>
          </button>
          <button tabindex="0" @click=${this._togglePlay} part="button" ?disabled=${!this.ready} aria-label="${this.playing ? "pause" : "play"} audio">
            ${this.playing ? ae`<iron-icon icon="av:pause-circle-filled"></iron-icon>` : ae`<iron-icon icon="av:play-circle-outline"></iron-icon>`}
          </button>
          <button tabindex="0" @click=${this._fastForward} part="button" ?disabled=${!this.ready} aria-label="fast forward audio 5 seconds">
            <iron-icon icon="av:forward-5"></iron-icon>
          </button>
        </div>

        <div class="media-info">
          <div class="meta">
            <div class="title" tabindex="0" aria-label="clip title: ${this.getAttribute("title")}">${this.getAttribute("title")}</div>
            <div class="season" tabindex="0" aria-label="clip subtitle: ${this.getAttribute("subtitle")}">${this.getAttribute("subtitle")}</div>
          </div>
          <div class="elapsed-time" tabindex="0">
            <span aria-label="Current play time is ${Math.floor((e = this.audioElem) == null ? void 0 : e.currentTime)} seconds">${this._secondsToTime((t = this.audioElem) == null ? void 0 : t.currentTime)}</span>
            <span class="separator" role="separator">/</span>
            <span aria-label="total play time ${Math.floor(this.audioClipDuration)} seconds">${this._secondsToTime(this.audioClipDuration)}</span>
          </div>
        </div>
      </div>

    `;
  }
  _mediaUrlChange(e) {
    this.audioElem.pause(), this.ready = !1, this.audioElem.setAttribute("src", e), this.audioElem.play();
  }
  _metaAttributeChange(e, t) {
    this.setAttribute(e, t);
  }
  _onLoadedData() {
    this.audioElem.readyState >= 2 && (this.ready = !0);
  }
  _onKeyDown(e) {
    let t = !1;
    for (let i of e.path) {
      if (i.tagName === "BUTTON") {
        t = !0;
        break;
      }
      if (i.tagName === "INPUT" || i.tagName === "TEXTAREA")
        return;
    }
    switch (e.key) {
      case "ArrowLeft": {
        this._rewind();
        break;
      }
      case "ArrowRight": {
        this._fastForward();
        break;
      }
      case " ": {
        this._togglePlay(), e.preventDefault();
        break;
      }
    }
    t && e.stopPropagation();
  }
  _getSeekVal() {
    const e = this.getBoundingClientRect().width || 0;
    return Math.ceil(this.pointerOverSeekBarXPos * 100 / e * this.audioClipDuration / 100);
  }
  _onDurationChange() {
    this.audioClipDuration = this.audioElem.duration;
  }
  _setPointerOverSeek(e) {
    this.pointerOverSeekBarXPos = e.x;
  }
  _clearPointerOverSeek() {
    this.pointerOverSeekBarXPos = 0;
  }
  _onTouchMove(e) {
    const t = this.getBoundingClientRect(), i = e.changedTouches[0].clientX - e.changedTouches[0].target.offsetLeft;
    i > t.width ? this._seekToOnTouch(t.width) : i <= 0 ? this._seekToOnTouch(0) : this._seekToOnTouch(i);
  }
  _onSeek(e) {
    const t = e.offsetX;
    this._seekToOnTouch(t);
  }
  _seekToOnTouch(e) {
    const t = this.getBoundingClientRect();
    this.playTimePercentage = e * 100 / t.width, this.audioElem.currentTime = this.audioElem.duration * this.playTimePercentage / 100;
  }
  _fastForward() {
    this.audioElem.currentTime = this.audioElem.currentTime + 5;
  }
  _rewind() {
    this.audioElem.currentTime = this.audioElem.currentTime - 5;
  }
  _playingListener() {
    const e = () => {
      this.playTimePercentage = this.audioElem.currentTime * 100 / this.audioElem.duration, this.playing ? this.playStateRAF = requestAnimationFrame(e) : cancelAnimationFrame(this.playStateRAF);
    };
    this.playStateRAF = requestAnimationFrame(e);
  }
  _pauseListener() {
    this.playing = !1;
  }
  _playListener() {
    this.playing = !0;
  }
  _togglePlay() {
    this.playing ? this.audioElem.pause() : this.audioElem.play();
  }
  _secondsToTime(e = 0) {
    const t = e >= 3600 ? Math.floor(e / 3600).toString().padStart(2, "0") : null, i = Math.floor(e % 3600 / 60).toString().padStart(2, "0"), r = Math.floor(e % 60).toString().padStart(2, "0");
    return `${t ? `${t}:` : ""}${i}:${r}`;
  }
};
A.styles = Ms`
    :host {
      margin: 0;
      padding: 0;
      text-align: center;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;

      --lightness-progress-bar: 53%;
      --color-progress-bar-body: hsl(0deg 79% var(--lightness-progress-bar));
      --color-progress-tip: hsl(0deg 79% calc(var(--lightness-progress-bar) + 10%));
      --color-progress-tip-highlight: hsl(0deg 79% calc(var(--lightness-progress-bar) + 20%));

      --lightness-progress-background: 23%;
      --color-progress-background: hsl(235deg 0% var(--lightness-progress-background));
      --color-progress-background-light: hsl(235deg 0% calc(var(--lightness-progress-background) + 50%));

      --color-play-time-background: hsl(0 0% var(--lightness-progress-background));
      --color-play-time-background-light: hsl(0 0% calc(var(--lightness-progress-background) + 50%));
      
      --lightness-player-body: 14%;
      --color-player-body-background: hsl(0deg 0% var(--lightness-player-body));
      --color-player-body-background-light: hsl(0deg 0% calc(var(--lightness-player-body) + 50%));

      --lightness-info-text: 75%;
      --color-info-base: hsl(0deg, 2%, var(--lightness-info-text));
      --color-info-darker: hsl(0deg, 2%, calc(var(--lightness-info-text) - 15%));
      --color-info-darkest: hsl(0deg, 2%, calc(var(--lightness-info-text) - 25%))
    }

    .progress-indicator-container {
      background-color: var(--color-progress-background);
      display: flex;
      width: 100%;
      overflow: hidden;
      align-items: center;
    }

    .progress-indicator {
      background-color: var(--color-progress-bar-body);
      height: 0.5rem;
      width: 100%;
      transform: translateX(-100%);
      border-radius: 0 3px 3px 0;
      pointer-events: none;
    }

    .progress-indicator::after {
      content: " ";
      height: 0.75rem;
      width: 0.75rem;
      background-color: var(--color-progress-tip);
      right: -0.5rem;
      top: -0.125rem;
      position: absolute;
      border-radius: 50%;
    }

    .progress-indicator-container:hover {
      cursor: pointer;
    }

    .progress-indicator-container:hover .progress-indicator::after {
      background-color: var(--color-progress-tip-highlight);
    }

    .progress-container {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }

    .progress-indicator-container:hover + .play-time-container {
      visibility: visible;
    }

    .play-time-container {
      width: 100%;
      text-align: start;
      height: 2ch;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      visibility: hidden;
      pointer-events: none;
    }

    .play-time {
      display: block;
      transform: translateX(0);
      display: inline;
      background-color: var(--color-play-time-background);
      padding: 0.5rem;
    }

    .controls-container {
      align-items: center;
      background-color: var(--color-player-body-background);
      display: grid; 
      grid-template-columns: auto 2fr;
      grid-template-rows: 1fr; 
      grid-template-areas: "buttons info"; 
      padding: 0 0.1rem;
      place-items: center start;
      justify-content: start;
      justify-items: start;
      gap: 0px 1rem;
      max-height: 4.75rem;
      align-content: center;
      height: 100vh;
    }

    .media-control-buttons {
      grid-area: buttons;
      padding: 0 0.1rem;
    }

    .media-info {
      grid-area: info;
      color: var(--color-info-base);
      text-align: start;
      display: grid;
      grid-template: "elapsed meta" 1fr / auto 2fr;
      gap: 0 1rem;
      align-items: center;
    }

    .media-info .meta {
      grid-area: meta;
      display: grid;
    }
    
    .meta .title {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta .season {
      color: var(--color-info-darker);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 0.9rem;
    }
    
    .media-info .elapsed-time {
      grid-area: elapsed;
      color: var(--color-info-darkest);
      font-size: 0.8rem
    }

    button {
      border: 1px solid transparent;
      background-color: transparent;
      padding: 0.3rem 0.6rem;
      font-size: 1rem;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      transition: border-color 0.25s;
      border-radius: 3px;
    }

    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media screen and (max-width: 360px) {
      .controls-container {
        justify-items: center;
        gap: 0;
      }
      .elapsed-time {
        display: none;
      }
      .media-info {
        gap: 0;
      }
      .meta .title {
        font-size: 0.8rem;
      }
      .meta .season {
        font-size: 0.75rem;
      }
      button {
        padding: 0.15rem 0.3rem;
      }
    }

    @media (min-width:361px) and (max-width: 720px) {
      .controls-container {
        grid-template-columns: auto auto;
        gap: 0 0.1rem;
      }
      .media-info {
        grid-template: "meta meta" "elapsed elapsed";
      }
      .media-control-buttons {
        min-width: 9.25rem;
      }
      .meta .title {
        font-size: 1rem;
      }
      .meta .season {
        font-size: 0.8rem;
      }
    }

    @media (prefers-color-scheme: light) {
      .play-time {
        background-color: var(--color-play-time-background-light);
      }
      .progress-indicator-container {
        background-color: var(--color-progress-background-light);
      }
      .controls-container {
        background-color: var(--color-player-body-background-light);
      }
      button {
        background-color: var(--color-button-background-light);
      }
    }
  `;
U([
  Rs("#audio")
], A.prototype, "audioElem", 2);
U([
  Et({ type: String })
], A.prototype, "mediaUrl", 2);
U([
  Et({ type: Number })
], A.prototype, "playTimePercentage", 2);
U([
  Et({ type: Number })
], A.prototype, "pointerOverSeekBarXPos", 2);
U([
  Et({ type: Number })
], A.prototype, "audioClipDuration", 2);
U([
  Et({ type: Boolean })
], A.prototype, "ready", 2);
A = U([
  Is("dc-aplayer")
], A);
export {
  A as DCAplayer
};
