import At from "@techstark/opencv-js";
function je(i) {
  return typeof i > "u" || i === null;
}
function Yr(i) {
  return typeof i == "object" && i !== null;
}
function Fr(i) {
  return Array.isArray(i) ? i : je(i) ? [] : [i];
}
function Rr(i, e) {
  var l, a, u, c;
  if (e)
    for (c = Object.keys(e), l = 0, a = c.length; l < a; l += 1)
      u = c[l], i[u] = e[u];
  return i;
}
function kr(i, e) {
  var l = "", a;
  for (a = 0; a < e; a += 1)
    l += i;
  return l;
}
function Wr(i) {
  return i === 0 && Number.NEGATIVE_INFINITY === 1 / i;
}
var Ur = je, qr = Yr, Hr = Fr, zr = kr, Zr = Wr, Gr = Rr, H = {
  isNothing: Ur,
  isObject: qr,
  toArray: Hr,
  repeat: zr,
  isNegativeZero: Zr,
  extend: Gr
};
function Ve(i, e) {
  var l = "", a = i.reason || "(unknown reason)";
  return i.mark ? (i.mark.name && (l += 'in "' + i.mark.name + '" '), l += "(" + (i.mark.line + 1) + ":" + (i.mark.column + 1) + ")", !e && i.mark.snippet && (l += `

` + i.mark.snippet), a + " " + l) : a;
}
function Ot(i, e) {
  Error.call(this), this.name = "YAMLException", this.reason = i, this.mark = e, this.message = Ve(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ot.prototype = Object.create(Error.prototype);
Ot.prototype.constructor = Ot;
Ot.prototype.toString = function(e) {
  return this.name + ": " + Ve(this, e);
};
var V = Ot;
function Zt(i, e, l, a, u) {
  var c = "", p = "", h = Math.floor(u / 2) - 1;
  return a - e > h && (c = " ... ", e = a - h + c.length), l - a > h && (p = " ...", l = a + h - p.length), {
    str: c + i.slice(e, l).replace(/\t/g, "→") + p,
    pos: a - e + c.length
    // relative position
  };
}
function Gt(i, e) {
  return H.repeat(" ", e - i.length) + i;
}
function jr(i, e) {
  if (e = Object.create(e || null), !i.buffer) return null;
  e.maxLength || (e.maxLength = 79), typeof e.indent != "number" && (e.indent = 1), typeof e.linesBefore != "number" && (e.linesBefore = 3), typeof e.linesAfter != "number" && (e.linesAfter = 2);
  for (var l = /\r?\n|\r|\0/g, a = [0], u = [], c, p = -1; c = l.exec(i.buffer); )
    u.push(c.index), a.push(c.index + c[0].length), i.position <= c.index && p < 0 && (p = a.length - 2);
  p < 0 && (p = a.length - 1);
  var h = "", m, x, C = Math.min(i.line + e.linesAfter, u.length).toString().length, _ = e.maxLength - (e.indent + C + 3);
  for (m = 1; m <= e.linesBefore && !(p - m < 0); m++)
    x = Zt(
      i.buffer,
      a[p - m],
      u[p - m],
      i.position - (a[p] - a[p - m]),
      _
    ), h = H.repeat(" ", e.indent) + Gt((i.line - m + 1).toString(), C) + " | " + x.str + `
` + h;
  for (x = Zt(i.buffer, a[p], u[p], i.position, _), h += H.repeat(" ", e.indent) + Gt((i.line + 1).toString(), C) + " | " + x.str + `
`, h += H.repeat("-", e.indent + C + 3 + x.pos) + `^
`, m = 1; m <= e.linesAfter && !(p + m >= u.length); m++)
    x = Zt(
      i.buffer,
      a[p + m],
      u[p + m],
      i.position - (a[p] - a[p + m]),
      _
    ), h += H.repeat(" ", e.indent) + Gt((i.line + m + 1).toString(), C) + " | " + x.str + `
`;
  return h.replace(/\n$/, "");
}
var Vr = jr, Jr = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], $r = [
  "scalar",
  "sequence",
  "mapping"
];
function Kr(i) {
  var e = {};
  return i !== null && Object.keys(i).forEach(function(l) {
    i[l].forEach(function(a) {
      e[String(a)] = l;
    });
  }), e;
}
function Qr(i, e) {
  if (e = e || {}, Object.keys(e).forEach(function(l) {
    if (Jr.indexOf(l) === -1)
      throw new V('Unknown option "' + l + '" is met in definition of "' + i + '" YAML type.');
  }), this.options = e, this.tag = i, this.kind = e.kind || null, this.resolve = e.resolve || function() {
    return !0;
  }, this.construct = e.construct || function(l) {
    return l;
  }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = Kr(e.styleAliases || null), $r.indexOf(this.kind) === -1)
    throw new V('Unknown kind "' + this.kind + '" is specified for "' + i + '" YAML type.');
}
var Z = Qr;
function ge(i, e) {
  var l = [];
  return i[e].forEach(function(a) {
    var u = l.length;
    l.forEach(function(c, p) {
      c.tag === a.tag && c.kind === a.kind && c.multi === a.multi && (u = p);
    }), l[u] = a;
  }), l;
}
function to() {
  var i = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, e, l;
  function a(u) {
    u.multi ? (i.multi[u.kind].push(u), i.multi.fallback.push(u)) : i[u.kind][u.tag] = i.fallback[u.tag] = u;
  }
  for (e = 0, l = arguments.length; e < l; e += 1)
    arguments[e].forEach(a);
  return i;
}
function te(i) {
  return this.extend(i);
}
te.prototype.extend = function(e) {
  var l = [], a = [];
  if (e instanceof Z)
    a.push(e);
  else if (Array.isArray(e))
    a = a.concat(e);
  else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
    e.implicit && (l = l.concat(e.implicit)), e.explicit && (a = a.concat(e.explicit));
  else
    throw new V("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  l.forEach(function(c) {
    if (!(c instanceof Z))
      throw new V("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (c.loadKind && c.loadKind !== "scalar")
      throw new V("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (c.multi)
      throw new V("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), a.forEach(function(c) {
    if (!(c instanceof Z))
      throw new V("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var u = Object.create(te.prototype);
  return u.implicit = (this.implicit || []).concat(l), u.explicit = (this.explicit || []).concat(a), u.compiledImplicit = ge(u, "implicit"), u.compiledExplicit = ge(u, "explicit"), u.compiledTypeMap = to(u.compiledImplicit, u.compiledExplicit), u;
};
var Je = te, $e = new Z("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(i) {
    return i !== null ? i : "";
  }
}), Ke = new Z("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(i) {
    return i !== null ? i : [];
  }
}), Qe = new Z("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(i) {
    return i !== null ? i : {};
  }
}), ti = new Je({
  explicit: [
    $e,
    Ke,
    Qe
  ]
});
function eo(i) {
  if (i === null) return !0;
  var e = i.length;
  return e === 1 && i === "~" || e === 4 && (i === "null" || i === "Null" || i === "NULL");
}
function io() {
  return null;
}
function no(i) {
  return i === null;
}
var ei = new Z("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: eo,
  construct: io,
  predicate: no,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function ro(i) {
  if (i === null) return !1;
  var e = i.length;
  return e === 4 && (i === "true" || i === "True" || i === "TRUE") || e === 5 && (i === "false" || i === "False" || i === "FALSE");
}
function oo(i) {
  return i === "true" || i === "True" || i === "TRUE";
}
function so(i) {
  return Object.prototype.toString.call(i) === "[object Boolean]";
}
var ii = new Z("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: ro,
  construct: oo,
  predicate: so,
  represent: {
    lowercase: function(i) {
      return i ? "true" : "false";
    },
    uppercase: function(i) {
      return i ? "TRUE" : "FALSE";
    },
    camelcase: function(i) {
      return i ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function lo(i) {
  return 48 <= i && i <= 57 || 65 <= i && i <= 70 || 97 <= i && i <= 102;
}
function ao(i) {
  return 48 <= i && i <= 55;
}
function uo(i) {
  return 48 <= i && i <= 57;
}
function fo(i) {
  if (i === null) return !1;
  var e = i.length, l = 0, a = !1, u;
  if (!e) return !1;
  if (u = i[l], (u === "-" || u === "+") && (u = i[++l]), u === "0") {
    if (l + 1 === e) return !0;
    if (u = i[++l], u === "b") {
      for (l++; l < e; l++)
        if (u = i[l], u !== "_") {
          if (u !== "0" && u !== "1") return !1;
          a = !0;
        }
      return a && u !== "_";
    }
    if (u === "x") {
      for (l++; l < e; l++)
        if (u = i[l], u !== "_") {
          if (!lo(i.charCodeAt(l))) return !1;
          a = !0;
        }
      return a && u !== "_";
    }
    if (u === "o") {
      for (l++; l < e; l++)
        if (u = i[l], u !== "_") {
          if (!ao(i.charCodeAt(l))) return !1;
          a = !0;
        }
      return a && u !== "_";
    }
  }
  if (u === "_") return !1;
  for (; l < e; l++)
    if (u = i[l], u !== "_") {
      if (!uo(i.charCodeAt(l)))
        return !1;
      a = !0;
    }
  return !(!a || u === "_");
}
function ho(i) {
  var e = i, l = 1, a;
  if (e.indexOf("_") !== -1 && (e = e.replace(/_/g, "")), a = e[0], (a === "-" || a === "+") && (a === "-" && (l = -1), e = e.slice(1), a = e[0]), e === "0") return 0;
  if (a === "0") {
    if (e[1] === "b") return l * parseInt(e.slice(2), 2);
    if (e[1] === "x") return l * parseInt(e.slice(2), 16);
    if (e[1] === "o") return l * parseInt(e.slice(2), 8);
  }
  return l * parseInt(e, 10);
}
function po(i) {
  return Object.prototype.toString.call(i) === "[object Number]" && i % 1 === 0 && !H.isNegativeZero(i);
}
var ni = new Z("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: fo,
  construct: ho,
  predicate: po,
  represent: {
    binary: function(i) {
      return i >= 0 ? "0b" + i.toString(2) : "-0b" + i.toString(2).slice(1);
    },
    octal: function(i) {
      return i >= 0 ? "0o" + i.toString(8) : "-0o" + i.toString(8).slice(1);
    },
    decimal: function(i) {
      return i.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(i) {
      return i >= 0 ? "0x" + i.toString(16).toUpperCase() : "-0x" + i.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), co = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function mo(i) {
  return !(i === null || !co.test(i) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  i[i.length - 1] === "_");
}
function yo(i) {
  var e, l;
  return e = i.replace(/_/g, "").toLowerCase(), l = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? l === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : l * parseFloat(e, 10);
}
var Po = /^[-+]?[0-9]+e/;
function xo(i, e) {
  var l;
  if (isNaN(i))
    switch (e) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === i)
    switch (e) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === i)
    switch (e) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (H.isNegativeZero(i))
    return "-0.0";
  return l = i.toString(10), Po.test(l) ? l.replace("e", ".e") : l;
}
function vo(i) {
  return Object.prototype.toString.call(i) === "[object Number]" && (i % 1 !== 0 || H.isNegativeZero(i));
}
var ri = new Z("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: mo,
  construct: yo,
  predicate: vo,
  represent: xo,
  defaultStyle: "lowercase"
}), oi = ti.extend({
  implicit: [
    ei,
    ii,
    ni,
    ri
  ]
}), si = oi, li = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), ai = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function _o(i) {
  return i === null ? !1 : li.exec(i) !== null || ai.exec(i) !== null;
}
function Co(i) {
  var e, l, a, u, c, p, h, m = 0, x = null, C, _, g;
  if (e = li.exec(i), e === null && (e = ai.exec(i)), e === null) throw new Error("Date resolve error");
  if (l = +e[1], a = +e[2] - 1, u = +e[3], !e[4])
    return new Date(Date.UTC(l, a, u));
  if (c = +e[4], p = +e[5], h = +e[6], e[7]) {
    for (m = e[7].slice(0, 3); m.length < 3; )
      m += "0";
    m = +m;
  }
  return e[9] && (C = +e[10], _ = +(e[11] || 0), x = (C * 60 + _) * 6e4, e[9] === "-" && (x = -x)), g = new Date(Date.UTC(l, a, u, c, p, h, m)), x && g.setTime(g.getTime() - x), g;
}
function Io(i) {
  return i.toISOString();
}
var ui = new Z("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: _o,
  construct: Co,
  instanceOf: Date,
  represent: Io
});
function To(i) {
  return i === "<<" || i === null;
}
var fi = new Z("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: To
}), fe = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function go(i) {
  if (i === null) return !1;
  var e, l, a = 0, u = i.length, c = fe;
  for (l = 0; l < u; l++)
    if (e = c.indexOf(i.charAt(l)), !(e > 64)) {
      if (e < 0) return !1;
      a += 6;
    }
  return a % 8 === 0;
}
function wo(i) {
  var e, l, a = i.replace(/[\r\n=]/g, ""), u = a.length, c = fe, p = 0, h = [];
  for (e = 0; e < u; e++)
    e % 4 === 0 && e && (h.push(p >> 16 & 255), h.push(p >> 8 & 255), h.push(p & 255)), p = p << 6 | c.indexOf(a.charAt(e));
  return l = u % 4 * 6, l === 0 ? (h.push(p >> 16 & 255), h.push(p >> 8 & 255), h.push(p & 255)) : l === 18 ? (h.push(p >> 10 & 255), h.push(p >> 2 & 255)) : l === 12 && h.push(p >> 4 & 255), new Uint8Array(h);
}
function Ao(i) {
  var e = "", l = 0, a, u, c = i.length, p = fe;
  for (a = 0; a < c; a++)
    a % 3 === 0 && a && (e += p[l >> 18 & 63], e += p[l >> 12 & 63], e += p[l >> 6 & 63], e += p[l & 63]), l = (l << 8) + i[a];
  return u = c % 3, u === 0 ? (e += p[l >> 18 & 63], e += p[l >> 12 & 63], e += p[l >> 6 & 63], e += p[l & 63]) : u === 2 ? (e += p[l >> 10 & 63], e += p[l >> 4 & 63], e += p[l << 2 & 63], e += p[64]) : u === 1 && (e += p[l >> 2 & 63], e += p[l << 4 & 63], e += p[64], e += p[64]), e;
}
function So(i) {
  return Object.prototype.toString.call(i) === "[object Uint8Array]";
}
var hi = new Z("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: go,
  construct: wo,
  predicate: So,
  represent: Ao
}), Lo = Object.prototype.hasOwnProperty, Oo = Object.prototype.toString;
function Eo(i) {
  if (i === null) return !0;
  var e = [], l, a, u, c, p, h = i;
  for (l = 0, a = h.length; l < a; l += 1) {
    if (u = h[l], p = !1, Oo.call(u) !== "[object Object]") return !1;
    for (c in u)
      if (Lo.call(u, c))
        if (!p) p = !0;
        else return !1;
    if (!p) return !1;
    if (e.indexOf(c) === -1) e.push(c);
    else return !1;
  }
  return !0;
}
function bo(i) {
  return i !== null ? i : [];
}
var pi = new Z("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Eo,
  construct: bo
}), No = Object.prototype.toString;
function Mo(i) {
  if (i === null) return !0;
  var e, l, a, u, c, p = i;
  for (c = new Array(p.length), e = 0, l = p.length; e < l; e += 1) {
    if (a = p[e], No.call(a) !== "[object Object]" || (u = Object.keys(a), u.length !== 1)) return !1;
    c[e] = [u[0], a[u[0]]];
  }
  return !0;
}
function Do(i) {
  if (i === null) return [];
  var e, l, a, u, c, p = i;
  for (c = new Array(p.length), e = 0, l = p.length; e < l; e += 1)
    a = p[e], u = Object.keys(a), c[e] = [u[0], a[u[0]]];
  return c;
}
var ci = new Z("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Mo,
  construct: Do
}), Bo = Object.prototype.hasOwnProperty;
function Xo(i) {
  if (i === null) return !0;
  var e, l = i;
  for (e in l)
    if (Bo.call(l, e) && l[e] !== null)
      return !1;
  return !0;
}
function Yo(i) {
  return i !== null ? i : {};
}
var di = new Z("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Xo,
  construct: Yo
}), he = si.extend({
  implicit: [
    ui,
    fi
  ],
  explicit: [
    hi,
    pi,
    ci,
    di
  ]
}), ht = Object.prototype.hasOwnProperty, Ft = 1, mi = 2, yi = 3, Rt = 4, jt = 1, Fo = 2, we = 3, Ro = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, ko = /[\x85\u2028\u2029]/, Wo = /[,\[\]\{\}]/, Pi = /^(?:!|!!|![a-z\-]+!)$/i, xi = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Ae(i) {
  return Object.prototype.toString.call(i);
}
function rt(i) {
  return i === 10 || i === 13;
}
function mt(i) {
  return i === 9 || i === 32;
}
function K(i) {
  return i === 9 || i === 32 || i === 10 || i === 13;
}
function It(i) {
  return i === 44 || i === 91 || i === 93 || i === 123 || i === 125;
}
function Uo(i) {
  var e;
  return 48 <= i && i <= 57 ? i - 48 : (e = i | 32, 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function qo(i) {
  return i === 120 ? 2 : i === 117 ? 4 : i === 85 ? 8 : 0;
}
function Ho(i) {
  return 48 <= i && i <= 57 ? i - 48 : -1;
}
function Se(i) {
  return i === 48 ? "\0" : i === 97 ? "\x07" : i === 98 ? "\b" : i === 116 || i === 9 ? "	" : i === 110 ? `
` : i === 118 ? "\v" : i === 102 ? "\f" : i === 114 ? "\r" : i === 101 ? "\x1B" : i === 32 ? " " : i === 34 ? '"' : i === 47 ? "/" : i === 92 ? "\\" : i === 78 ? "" : i === 95 ? " " : i === 76 ? "\u2028" : i === 80 ? "\u2029" : "";
}
function zo(i) {
  return i <= 65535 ? String.fromCharCode(i) : String.fromCharCode(
    (i - 65536 >> 10) + 55296,
    (i - 65536 & 1023) + 56320
  );
}
function vi(i, e, l) {
  e === "__proto__" ? Object.defineProperty(i, e, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: l
  }) : i[e] = l;
}
var _i = new Array(256), Ci = new Array(256);
for (var _t = 0; _t < 256; _t++)
  _i[_t] = Se(_t) ? 1 : 0, Ci[_t] = Se(_t);
function Zo(i, e) {
  this.input = i, this.filename = e.filename || null, this.schema = e.schema || he, this.onWarning = e.onWarning || null, this.legacy = e.legacy || !1, this.json = e.json || !1, this.listener = e.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = i.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Ii(i, e) {
  var l = {
    name: i.filename,
    buffer: i.input.slice(0, -1),
    // omit trailing \0
    position: i.position,
    line: i.line,
    column: i.position - i.lineStart
  };
  return l.snippet = Vr(l), new V(e, l);
}
function b(i, e) {
  throw Ii(i, e);
}
function kt(i, e) {
  i.onWarning && i.onWarning.call(null, Ii(i, e));
}
var Le = {
  YAML: function(e, l, a) {
    var u, c, p;
    e.version !== null && b(e, "duplication of %YAML directive"), a.length !== 1 && b(e, "YAML directive accepts exactly one argument"), u = /^([0-9]+)\.([0-9]+)$/.exec(a[0]), u === null && b(e, "ill-formed argument of the YAML directive"), c = parseInt(u[1], 10), p = parseInt(u[2], 10), c !== 1 && b(e, "unacceptable YAML version of the document"), e.version = a[0], e.checkLineBreaks = p < 2, p !== 1 && p !== 2 && kt(e, "unsupported YAML version of the document");
  },
  TAG: function(e, l, a) {
    var u, c;
    a.length !== 2 && b(e, "TAG directive accepts exactly two arguments"), u = a[0], c = a[1], Pi.test(u) || b(e, "ill-formed tag handle (first argument) of the TAG directive"), ht.call(e.tagMap, u) && b(e, 'there is a previously declared suffix for "' + u + '" tag handle'), xi.test(c) || b(e, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      c = decodeURIComponent(c);
    } catch {
      b(e, "tag prefix is malformed: " + c);
    }
    e.tagMap[u] = c;
  }
};
function ft(i, e, l, a) {
  var u, c, p, h;
  if (e < l) {
    if (h = i.input.slice(e, l), a)
      for (u = 0, c = h.length; u < c; u += 1)
        p = h.charCodeAt(u), p === 9 || 32 <= p && p <= 1114111 || b(i, "expected valid JSON character");
    else Ro.test(h) && b(i, "the stream contains non-printable characters");
    i.result += h;
  }
}
function Oe(i, e, l, a) {
  var u, c, p, h;
  for (H.isObject(l) || b(i, "cannot merge mappings; the provided source object is unacceptable"), u = Object.keys(l), p = 0, h = u.length; p < h; p += 1)
    c = u[p], ht.call(e, c) || (vi(e, c, l[c]), a[c] = !0);
}
function Tt(i, e, l, a, u, c, p, h, m) {
  var x, C;
  if (Array.isArray(u))
    for (u = Array.prototype.slice.call(u), x = 0, C = u.length; x < C; x += 1)
      Array.isArray(u[x]) && b(i, "nested arrays are not supported inside keys"), typeof u == "object" && Ae(u[x]) === "[object Object]" && (u[x] = "[object Object]");
  if (typeof u == "object" && Ae(u) === "[object Object]" && (u = "[object Object]"), u = String(u), e === null && (e = {}), a === "tag:yaml.org,2002:merge")
    if (Array.isArray(c))
      for (x = 0, C = c.length; x < C; x += 1)
        Oe(i, e, c[x], l);
    else
      Oe(i, e, c, l);
  else
    !i.json && !ht.call(l, u) && ht.call(e, u) && (i.line = p || i.line, i.lineStart = h || i.lineStart, i.position = m || i.position, b(i, "duplicated mapping key")), vi(e, u, c), delete l[u];
  return e;
}
function pe(i) {
  var e;
  e = i.input.charCodeAt(i.position), e === 10 ? i.position++ : e === 13 ? (i.position++, i.input.charCodeAt(i.position) === 10 && i.position++) : b(i, "a line break is expected"), i.line += 1, i.lineStart = i.position, i.firstTabInLine = -1;
}
function q(i, e, l) {
  for (var a = 0, u = i.input.charCodeAt(i.position); u !== 0; ) {
    for (; mt(u); )
      u === 9 && i.firstTabInLine === -1 && (i.firstTabInLine = i.position), u = i.input.charCodeAt(++i.position);
    if (e && u === 35)
      do
        u = i.input.charCodeAt(++i.position);
      while (u !== 10 && u !== 13 && u !== 0);
    if (rt(u))
      for (pe(i), u = i.input.charCodeAt(i.position), a++, i.lineIndent = 0; u === 32; )
        i.lineIndent++, u = i.input.charCodeAt(++i.position);
    else
      break;
  }
  return l !== -1 && a !== 0 && i.lineIndent < l && kt(i, "deficient indentation"), a;
}
function Ht(i) {
  var e = i.position, l;
  return l = i.input.charCodeAt(e), !!((l === 45 || l === 46) && l === i.input.charCodeAt(e + 1) && l === i.input.charCodeAt(e + 2) && (e += 3, l = i.input.charCodeAt(e), l === 0 || K(l)));
}
function ce(i, e) {
  e === 1 ? i.result += " " : e > 1 && (i.result += H.repeat(`
`, e - 1));
}
function Go(i, e, l) {
  var a, u, c, p, h, m, x, C, _ = i.kind, g = i.result, T;
  if (T = i.input.charCodeAt(i.position), K(T) || It(T) || T === 35 || T === 38 || T === 42 || T === 33 || T === 124 || T === 62 || T === 39 || T === 34 || T === 37 || T === 64 || T === 96 || (T === 63 || T === 45) && (u = i.input.charCodeAt(i.position + 1), K(u) || l && It(u)))
    return !1;
  for (i.kind = "scalar", i.result = "", c = p = i.position, h = !1; T !== 0; ) {
    if (T === 58) {
      if (u = i.input.charCodeAt(i.position + 1), K(u) || l && It(u))
        break;
    } else if (T === 35) {
      if (a = i.input.charCodeAt(i.position - 1), K(a))
        break;
    } else {
      if (i.position === i.lineStart && Ht(i) || l && It(T))
        break;
      if (rt(T))
        if (m = i.line, x = i.lineStart, C = i.lineIndent, q(i, !1, -1), i.lineIndent >= e) {
          h = !0, T = i.input.charCodeAt(i.position);
          continue;
        } else {
          i.position = p, i.line = m, i.lineStart = x, i.lineIndent = C;
          break;
        }
    }
    h && (ft(i, c, p, !1), ce(i, i.line - m), c = p = i.position, h = !1), mt(T) || (p = i.position + 1), T = i.input.charCodeAt(++i.position);
  }
  return ft(i, c, p, !1), i.result ? !0 : (i.kind = _, i.result = g, !1);
}
function jo(i, e) {
  var l, a, u;
  if (l = i.input.charCodeAt(i.position), l !== 39)
    return !1;
  for (i.kind = "scalar", i.result = "", i.position++, a = u = i.position; (l = i.input.charCodeAt(i.position)) !== 0; )
    if (l === 39)
      if (ft(i, a, i.position, !0), l = i.input.charCodeAt(++i.position), l === 39)
        a = i.position, i.position++, u = i.position;
      else
        return !0;
    else rt(l) ? (ft(i, a, u, !0), ce(i, q(i, !1, e)), a = u = i.position) : i.position === i.lineStart && Ht(i) ? b(i, "unexpected end of the document within a single quoted scalar") : (i.position++, u = i.position);
  b(i, "unexpected end of the stream within a single quoted scalar");
}
function Vo(i, e) {
  var l, a, u, c, p, h;
  if (h = i.input.charCodeAt(i.position), h !== 34)
    return !1;
  for (i.kind = "scalar", i.result = "", i.position++, l = a = i.position; (h = i.input.charCodeAt(i.position)) !== 0; ) {
    if (h === 34)
      return ft(i, l, i.position, !0), i.position++, !0;
    if (h === 92) {
      if (ft(i, l, i.position, !0), h = i.input.charCodeAt(++i.position), rt(h))
        q(i, !1, e);
      else if (h < 256 && _i[h])
        i.result += Ci[h], i.position++;
      else if ((p = qo(h)) > 0) {
        for (u = p, c = 0; u > 0; u--)
          h = i.input.charCodeAt(++i.position), (p = Uo(h)) >= 0 ? c = (c << 4) + p : b(i, "expected hexadecimal character");
        i.result += zo(c), i.position++;
      } else
        b(i, "unknown escape sequence");
      l = a = i.position;
    } else rt(h) ? (ft(i, l, a, !0), ce(i, q(i, !1, e)), l = a = i.position) : i.position === i.lineStart && Ht(i) ? b(i, "unexpected end of the document within a double quoted scalar") : (i.position++, a = i.position);
  }
  b(i, "unexpected end of the stream within a double quoted scalar");
}
function Jo(i, e) {
  var l = !0, a, u, c, p = i.tag, h, m = i.anchor, x, C, _, g, T, A = /* @__PURE__ */ Object.create(null), O, E, N, L;
  if (L = i.input.charCodeAt(i.position), L === 91)
    C = 93, T = !1, h = [];
  else if (L === 123)
    C = 125, T = !0, h = {};
  else
    return !1;
  for (i.anchor !== null && (i.anchorMap[i.anchor] = h), L = i.input.charCodeAt(++i.position); L !== 0; ) {
    if (q(i, !0, e), L = i.input.charCodeAt(i.position), L === C)
      return i.position++, i.tag = p, i.anchor = m, i.kind = T ? "mapping" : "sequence", i.result = h, !0;
    l ? L === 44 && b(i, "expected the node content, but found ','") : b(i, "missed comma between flow collection entries"), E = O = N = null, _ = g = !1, L === 63 && (x = i.input.charCodeAt(i.position + 1), K(x) && (_ = g = !0, i.position++, q(i, !0, e))), a = i.line, u = i.lineStart, c = i.position, gt(i, e, Ft, !1, !0), E = i.tag, O = i.result, q(i, !0, e), L = i.input.charCodeAt(i.position), (g || i.line === a) && L === 58 && (_ = !0, L = i.input.charCodeAt(++i.position), q(i, !0, e), gt(i, e, Ft, !1, !0), N = i.result), T ? Tt(i, h, A, E, O, N, a, u, c) : _ ? h.push(Tt(i, null, A, E, O, N, a, u, c)) : h.push(O), q(i, !0, e), L = i.input.charCodeAt(i.position), L === 44 ? (l = !0, L = i.input.charCodeAt(++i.position)) : l = !1;
  }
  b(i, "unexpected end of the stream within a flow collection");
}
function $o(i, e) {
  var l, a, u = jt, c = !1, p = !1, h = e, m = 0, x = !1, C, _;
  if (_ = i.input.charCodeAt(i.position), _ === 124)
    a = !1;
  else if (_ === 62)
    a = !0;
  else
    return !1;
  for (i.kind = "scalar", i.result = ""; _ !== 0; )
    if (_ = i.input.charCodeAt(++i.position), _ === 43 || _ === 45)
      jt === u ? u = _ === 43 ? we : Fo : b(i, "repeat of a chomping mode identifier");
    else if ((C = Ho(_)) >= 0)
      C === 0 ? b(i, "bad explicit indentation width of a block scalar; it cannot be less than one") : p ? b(i, "repeat of an indentation width identifier") : (h = e + C - 1, p = !0);
    else
      break;
  if (mt(_)) {
    do
      _ = i.input.charCodeAt(++i.position);
    while (mt(_));
    if (_ === 35)
      do
        _ = i.input.charCodeAt(++i.position);
      while (!rt(_) && _ !== 0);
  }
  for (; _ !== 0; ) {
    for (pe(i), i.lineIndent = 0, _ = i.input.charCodeAt(i.position); (!p || i.lineIndent < h) && _ === 32; )
      i.lineIndent++, _ = i.input.charCodeAt(++i.position);
    if (!p && i.lineIndent > h && (h = i.lineIndent), rt(_)) {
      m++;
      continue;
    }
    if (i.lineIndent < h) {
      u === we ? i.result += H.repeat(`
`, c ? 1 + m : m) : u === jt && c && (i.result += `
`);
      break;
    }
    for (a ? mt(_) ? (x = !0, i.result += H.repeat(`
`, c ? 1 + m : m)) : x ? (x = !1, i.result += H.repeat(`
`, m + 1)) : m === 0 ? c && (i.result += " ") : i.result += H.repeat(`
`, m) : i.result += H.repeat(`
`, c ? 1 + m : m), c = !0, p = !0, m = 0, l = i.position; !rt(_) && _ !== 0; )
      _ = i.input.charCodeAt(++i.position);
    ft(i, l, i.position, !1);
  }
  return !0;
}
function Ee(i, e) {
  var l, a = i.tag, u = i.anchor, c = [], p, h = !1, m;
  if (i.firstTabInLine !== -1) return !1;
  for (i.anchor !== null && (i.anchorMap[i.anchor] = c), m = i.input.charCodeAt(i.position); m !== 0 && (i.firstTabInLine !== -1 && (i.position = i.firstTabInLine, b(i, "tab characters must not be used in indentation")), !(m !== 45 || (p = i.input.charCodeAt(i.position + 1), !K(p)))); ) {
    if (h = !0, i.position++, q(i, !0, -1) && i.lineIndent <= e) {
      c.push(null), m = i.input.charCodeAt(i.position);
      continue;
    }
    if (l = i.line, gt(i, e, yi, !1, !0), c.push(i.result), q(i, !0, -1), m = i.input.charCodeAt(i.position), (i.line === l || i.lineIndent > e) && m !== 0)
      b(i, "bad indentation of a sequence entry");
    else if (i.lineIndent < e)
      break;
  }
  return h ? (i.tag = a, i.anchor = u, i.kind = "sequence", i.result = c, !0) : !1;
}
function Ko(i, e, l) {
  var a, u, c, p, h, m, x = i.tag, C = i.anchor, _ = {}, g = /* @__PURE__ */ Object.create(null), T = null, A = null, O = null, E = !1, N = !1, L;
  if (i.firstTabInLine !== -1) return !1;
  for (i.anchor !== null && (i.anchorMap[i.anchor] = _), L = i.input.charCodeAt(i.position); L !== 0; ) {
    if (!E && i.firstTabInLine !== -1 && (i.position = i.firstTabInLine, b(i, "tab characters must not be used in indentation")), a = i.input.charCodeAt(i.position + 1), c = i.line, (L === 63 || L === 58) && K(a))
      L === 63 ? (E && (Tt(i, _, g, T, A, null, p, h, m), T = A = O = null), N = !0, E = !0, u = !0) : E ? (E = !1, u = !0) : b(i, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), i.position += 1, L = a;
    else {
      if (p = i.line, h = i.lineStart, m = i.position, !gt(i, l, mi, !1, !0))
        break;
      if (i.line === c) {
        for (L = i.input.charCodeAt(i.position); mt(L); )
          L = i.input.charCodeAt(++i.position);
        if (L === 58)
          L = i.input.charCodeAt(++i.position), K(L) || b(i, "a whitespace character is expected after the key-value separator within a block mapping"), E && (Tt(i, _, g, T, A, null, p, h, m), T = A = O = null), N = !0, E = !1, u = !1, T = i.tag, A = i.result;
        else if (N)
          b(i, "can not read an implicit mapping pair; a colon is missed");
        else
          return i.tag = x, i.anchor = C, !0;
      } else if (N)
        b(i, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return i.tag = x, i.anchor = C, !0;
    }
    if ((i.line === c || i.lineIndent > e) && (E && (p = i.line, h = i.lineStart, m = i.position), gt(i, e, Rt, !0, u) && (E ? A = i.result : O = i.result), E || (Tt(i, _, g, T, A, O, p, h, m), T = A = O = null), q(i, !0, -1), L = i.input.charCodeAt(i.position)), (i.line === c || i.lineIndent > e) && L !== 0)
      b(i, "bad indentation of a mapping entry");
    else if (i.lineIndent < e)
      break;
  }
  return E && Tt(i, _, g, T, A, null, p, h, m), N && (i.tag = x, i.anchor = C, i.kind = "mapping", i.result = _), N;
}
function Qo(i) {
  var e, l = !1, a = !1, u, c, p;
  if (p = i.input.charCodeAt(i.position), p !== 33) return !1;
  if (i.tag !== null && b(i, "duplication of a tag property"), p = i.input.charCodeAt(++i.position), p === 60 ? (l = !0, p = i.input.charCodeAt(++i.position)) : p === 33 ? (a = !0, u = "!!", p = i.input.charCodeAt(++i.position)) : u = "!", e = i.position, l) {
    do
      p = i.input.charCodeAt(++i.position);
    while (p !== 0 && p !== 62);
    i.position < i.length ? (c = i.input.slice(e, i.position), p = i.input.charCodeAt(++i.position)) : b(i, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; p !== 0 && !K(p); )
      p === 33 && (a ? b(i, "tag suffix cannot contain exclamation marks") : (u = i.input.slice(e - 1, i.position + 1), Pi.test(u) || b(i, "named tag handle cannot contain such characters"), a = !0, e = i.position + 1)), p = i.input.charCodeAt(++i.position);
    c = i.input.slice(e, i.position), Wo.test(c) && b(i, "tag suffix cannot contain flow indicator characters");
  }
  c && !xi.test(c) && b(i, "tag name cannot contain such characters: " + c);
  try {
    c = decodeURIComponent(c);
  } catch {
    b(i, "tag name is malformed: " + c);
  }
  return l ? i.tag = c : ht.call(i.tagMap, u) ? i.tag = i.tagMap[u] + c : u === "!" ? i.tag = "!" + c : u === "!!" ? i.tag = "tag:yaml.org,2002:" + c : b(i, 'undeclared tag handle "' + u + '"'), !0;
}
function ts(i) {
  var e, l;
  if (l = i.input.charCodeAt(i.position), l !== 38) return !1;
  for (i.anchor !== null && b(i, "duplication of an anchor property"), l = i.input.charCodeAt(++i.position), e = i.position; l !== 0 && !K(l) && !It(l); )
    l = i.input.charCodeAt(++i.position);
  return i.position === e && b(i, "name of an anchor node must contain at least one character"), i.anchor = i.input.slice(e, i.position), !0;
}
function es(i) {
  var e, l, a;
  if (a = i.input.charCodeAt(i.position), a !== 42) return !1;
  for (a = i.input.charCodeAt(++i.position), e = i.position; a !== 0 && !K(a) && !It(a); )
    a = i.input.charCodeAt(++i.position);
  return i.position === e && b(i, "name of an alias node must contain at least one character"), l = i.input.slice(e, i.position), ht.call(i.anchorMap, l) || b(i, 'unidentified alias "' + l + '"'), i.result = i.anchorMap[l], q(i, !0, -1), !0;
}
function gt(i, e, l, a, u) {
  var c, p, h, m = 1, x = !1, C = !1, _, g, T, A, O, E;
  if (i.listener !== null && i.listener("open", i), i.tag = null, i.anchor = null, i.kind = null, i.result = null, c = p = h = Rt === l || yi === l, a && q(i, !0, -1) && (x = !0, i.lineIndent > e ? m = 1 : i.lineIndent === e ? m = 0 : i.lineIndent < e && (m = -1)), m === 1)
    for (; Qo(i) || ts(i); )
      q(i, !0, -1) ? (x = !0, h = c, i.lineIndent > e ? m = 1 : i.lineIndent === e ? m = 0 : i.lineIndent < e && (m = -1)) : h = !1;
  if (h && (h = x || u), (m === 1 || Rt === l) && (Ft === l || mi === l ? O = e : O = e + 1, E = i.position - i.lineStart, m === 1 ? h && (Ee(i, E) || Ko(i, E, O)) || Jo(i, O) ? C = !0 : (p && $o(i, O) || jo(i, O) || Vo(i, O) ? C = !0 : es(i) ? (C = !0, (i.tag !== null || i.anchor !== null) && b(i, "alias node should not have any properties")) : Go(i, O, Ft === l) && (C = !0, i.tag === null && (i.tag = "?")), i.anchor !== null && (i.anchorMap[i.anchor] = i.result)) : m === 0 && (C = h && Ee(i, E))), i.tag === null)
    i.anchor !== null && (i.anchorMap[i.anchor] = i.result);
  else if (i.tag === "?") {
    for (i.result !== null && i.kind !== "scalar" && b(i, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + i.kind + '"'), _ = 0, g = i.implicitTypes.length; _ < g; _ += 1)
      if (A = i.implicitTypes[_], A.resolve(i.result)) {
        i.result = A.construct(i.result), i.tag = A.tag, i.anchor !== null && (i.anchorMap[i.anchor] = i.result);
        break;
      }
  } else if (i.tag !== "!") {
    if (ht.call(i.typeMap[i.kind || "fallback"], i.tag))
      A = i.typeMap[i.kind || "fallback"][i.tag];
    else
      for (A = null, T = i.typeMap.multi[i.kind || "fallback"], _ = 0, g = T.length; _ < g; _ += 1)
        if (i.tag.slice(0, T[_].tag.length) === T[_].tag) {
          A = T[_];
          break;
        }
    A || b(i, "unknown tag !<" + i.tag + ">"), i.result !== null && A.kind !== i.kind && b(i, "unacceptable node kind for !<" + i.tag + '> tag; it should be "' + A.kind + '", not "' + i.kind + '"'), A.resolve(i.result, i.tag) ? (i.result = A.construct(i.result, i.tag), i.anchor !== null && (i.anchorMap[i.anchor] = i.result)) : b(i, "cannot resolve a node with !<" + i.tag + "> explicit tag");
  }
  return i.listener !== null && i.listener("close", i), i.tag !== null || i.anchor !== null || C;
}
function is(i) {
  var e = i.position, l, a, u, c = !1, p;
  for (i.version = null, i.checkLineBreaks = i.legacy, i.tagMap = /* @__PURE__ */ Object.create(null), i.anchorMap = /* @__PURE__ */ Object.create(null); (p = i.input.charCodeAt(i.position)) !== 0 && (q(i, !0, -1), p = i.input.charCodeAt(i.position), !(i.lineIndent > 0 || p !== 37)); ) {
    for (c = !0, p = i.input.charCodeAt(++i.position), l = i.position; p !== 0 && !K(p); )
      p = i.input.charCodeAt(++i.position);
    for (a = i.input.slice(l, i.position), u = [], a.length < 1 && b(i, "directive name must not be less than one character in length"); p !== 0; ) {
      for (; mt(p); )
        p = i.input.charCodeAt(++i.position);
      if (p === 35) {
        do
          p = i.input.charCodeAt(++i.position);
        while (p !== 0 && !rt(p));
        break;
      }
      if (rt(p)) break;
      for (l = i.position; p !== 0 && !K(p); )
        p = i.input.charCodeAt(++i.position);
      u.push(i.input.slice(l, i.position));
    }
    p !== 0 && pe(i), ht.call(Le, a) ? Le[a](i, a, u) : kt(i, 'unknown document directive "' + a + '"');
  }
  if (q(i, !0, -1), i.lineIndent === 0 && i.input.charCodeAt(i.position) === 45 && i.input.charCodeAt(i.position + 1) === 45 && i.input.charCodeAt(i.position + 2) === 45 ? (i.position += 3, q(i, !0, -1)) : c && b(i, "directives end mark is expected"), gt(i, i.lineIndent - 1, Rt, !1, !0), q(i, !0, -1), i.checkLineBreaks && ko.test(i.input.slice(e, i.position)) && kt(i, "non-ASCII line breaks are interpreted as content"), i.documents.push(i.result), i.position === i.lineStart && Ht(i)) {
    i.input.charCodeAt(i.position) === 46 && (i.position += 3, q(i, !0, -1));
    return;
  }
  if (i.position < i.length - 1)
    b(i, "end of the stream or a document separator is expected");
  else
    return;
}
function Ti(i, e) {
  i = String(i), e = e || {}, i.length !== 0 && (i.charCodeAt(i.length - 1) !== 10 && i.charCodeAt(i.length - 1) !== 13 && (i += `
`), i.charCodeAt(0) === 65279 && (i = i.slice(1)));
  var l = new Zo(i, e), a = i.indexOf("\0");
  for (a !== -1 && (l.position = a, b(l, "null byte is not allowed in input")), l.input += "\0"; l.input.charCodeAt(l.position) === 32; )
    l.lineIndent += 1, l.position += 1;
  for (; l.position < l.length - 1; )
    is(l);
  return l.documents;
}
function ns(i, e, l) {
  e !== null && typeof e == "object" && typeof l > "u" && (l = e, e = null);
  var a = Ti(i, l);
  if (typeof e != "function")
    return a;
  for (var u = 0, c = a.length; u < c; u += 1)
    e(a[u]);
}
function rs(i, e) {
  var l = Ti(i, e);
  if (l.length !== 0) {
    if (l.length === 1)
      return l[0];
    throw new V("expected a single document in the stream, but found more");
  }
}
var os = ns, ss = rs, gi = {
  loadAll: os,
  load: ss
}, wi = Object.prototype.toString, Ai = Object.prototype.hasOwnProperty, de = 65279, ls = 9, Et = 10, as = 13, us = 32, fs = 33, hs = 34, ee = 35, ps = 37, cs = 38, ds = 39, ms = 42, Si = 44, ys = 45, Wt = 58, Ps = 61, xs = 62, vs = 63, _s = 64, Li = 91, Oi = 93, Cs = 96, Ei = 123, Is = 124, bi = 125, G = {};
G[0] = "\\0";
G[7] = "\\a";
G[8] = "\\b";
G[9] = "\\t";
G[10] = "\\n";
G[11] = "\\v";
G[12] = "\\f";
G[13] = "\\r";
G[27] = "\\e";
G[34] = '\\"';
G[92] = "\\\\";
G[133] = "\\N";
G[160] = "\\_";
G[8232] = "\\L";
G[8233] = "\\P";
var Ts = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], gs = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function ws(i, e) {
  var l, a, u, c, p, h, m;
  if (e === null) return {};
  for (l = {}, a = Object.keys(e), u = 0, c = a.length; u < c; u += 1)
    p = a[u], h = String(e[p]), p.slice(0, 2) === "!!" && (p = "tag:yaml.org,2002:" + p.slice(2)), m = i.compiledTypeMap.fallback[p], m && Ai.call(m.styleAliases, h) && (h = m.styleAliases[h]), l[p] = h;
  return l;
}
function As(i) {
  var e, l, a;
  if (e = i.toString(16).toUpperCase(), i <= 255)
    l = "x", a = 2;
  else if (i <= 65535)
    l = "u", a = 4;
  else if (i <= 4294967295)
    l = "U", a = 8;
  else
    throw new V("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + l + H.repeat("0", a - e.length) + e;
}
var Ss = 1, bt = 2;
function Ls(i) {
  this.schema = i.schema || he, this.indent = Math.max(1, i.indent || 2), this.noArrayIndent = i.noArrayIndent || !1, this.skipInvalid = i.skipInvalid || !1, this.flowLevel = H.isNothing(i.flowLevel) ? -1 : i.flowLevel, this.styleMap = ws(this.schema, i.styles || null), this.sortKeys = i.sortKeys || !1, this.lineWidth = i.lineWidth || 80, this.noRefs = i.noRefs || !1, this.noCompatMode = i.noCompatMode || !1, this.condenseFlow = i.condenseFlow || !1, this.quotingType = i.quotingType === '"' ? bt : Ss, this.forceQuotes = i.forceQuotes || !1, this.replacer = typeof i.replacer == "function" ? i.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function be(i, e) {
  for (var l = H.repeat(" ", e), a = 0, u = -1, c = "", p, h = i.length; a < h; )
    u = i.indexOf(`
`, a), u === -1 ? (p = i.slice(a), a = h) : (p = i.slice(a, u + 1), a = u + 1), p.length && p !== `
` && (c += l), c += p;
  return c;
}
function ie(i, e) {
  return `
` + H.repeat(" ", i.indent * e);
}
function Os(i, e) {
  var l, a, u;
  for (l = 0, a = i.implicitTypes.length; l < a; l += 1)
    if (u = i.implicitTypes[l], u.resolve(e))
      return !0;
  return !1;
}
function Ut(i) {
  return i === us || i === ls;
}
function Nt(i) {
  return 32 <= i && i <= 126 || 161 <= i && i <= 55295 && i !== 8232 && i !== 8233 || 57344 <= i && i <= 65533 && i !== de || 65536 <= i && i <= 1114111;
}
function Ne(i) {
  return Nt(i) && i !== de && i !== as && i !== Et;
}
function Me(i, e, l) {
  var a = Ne(i), u = a && !Ut(i);
  return (
    // ns-plain-safe
    (l ? (
      // c = flow-in
      a
    ) : a && i !== Si && i !== Li && i !== Oi && i !== Ei && i !== bi) && i !== ee && !(e === Wt && !u) || Ne(e) && !Ut(e) && i === ee || e === Wt && u
  );
}
function Es(i) {
  return Nt(i) && i !== de && !Ut(i) && i !== ys && i !== vs && i !== Wt && i !== Si && i !== Li && i !== Oi && i !== Ei && i !== bi && i !== ee && i !== cs && i !== ms && i !== fs && i !== Is && i !== Ps && i !== xs && i !== ds && i !== hs && i !== ps && i !== _s && i !== Cs;
}
function bs(i) {
  return !Ut(i) && i !== Wt;
}
function Lt(i, e) {
  var l = i.charCodeAt(e), a;
  return l >= 55296 && l <= 56319 && e + 1 < i.length && (a = i.charCodeAt(e + 1), a >= 56320 && a <= 57343) ? (l - 55296) * 1024 + a - 56320 + 65536 : l;
}
function Ni(i) {
  var e = /^\n* /;
  return e.test(i);
}
var Mi = 1, ne = 2, Di = 3, Bi = 4, Ct = 5;
function Ns(i, e, l, a, u, c, p, h) {
  var m, x = 0, C = null, _ = !1, g = !1, T = a !== -1, A = -1, O = Es(Lt(i, 0)) && bs(Lt(i, i.length - 1));
  if (e || p)
    for (m = 0; m < i.length; x >= 65536 ? m += 2 : m++) {
      if (x = Lt(i, m), !Nt(x))
        return Ct;
      O = O && Me(x, C, h), C = x;
    }
  else {
    for (m = 0; m < i.length; x >= 65536 ? m += 2 : m++) {
      if (x = Lt(i, m), x === Et)
        _ = !0, T && (g = g || // Foldable line = too long, and not more-indented.
        m - A - 1 > a && i[A + 1] !== " ", A = m);
      else if (!Nt(x))
        return Ct;
      O = O && Me(x, C, h), C = x;
    }
    g = g || T && m - A - 1 > a && i[A + 1] !== " ";
  }
  return !_ && !g ? O && !p && !u(i) ? Mi : c === bt ? Ct : ne : l > 9 && Ni(i) ? Ct : p ? c === bt ? Ct : ne : g ? Bi : Di;
}
function Ms(i, e, l, a, u) {
  i.dump = (function() {
    if (e.length === 0)
      return i.quotingType === bt ? '""' : "''";
    if (!i.noCompatMode && (Ts.indexOf(e) !== -1 || gs.test(e)))
      return i.quotingType === bt ? '"' + e + '"' : "'" + e + "'";
    var c = i.indent * Math.max(1, l), p = i.lineWidth === -1 ? -1 : Math.max(Math.min(i.lineWidth, 40), i.lineWidth - c), h = a || i.flowLevel > -1 && l >= i.flowLevel;
    function m(x) {
      return Os(i, x);
    }
    switch (Ns(
      e,
      h,
      i.indent,
      p,
      m,
      i.quotingType,
      i.forceQuotes && !a,
      u
    )) {
      case Mi:
        return e;
      case ne:
        return "'" + e.replace(/'/g, "''") + "'";
      case Di:
        return "|" + De(e, i.indent) + Be(be(e, c));
      case Bi:
        return ">" + De(e, i.indent) + Be(be(Ds(e, p), c));
      case Ct:
        return '"' + Bs(e) + '"';
      default:
        throw new V("impossible error: invalid scalar style");
    }
  })();
}
function De(i, e) {
  var l = Ni(i) ? String(e) : "", a = i[i.length - 1] === `
`, u = a && (i[i.length - 2] === `
` || i === `
`), c = u ? "+" : a ? "" : "-";
  return l + c + `
`;
}
function Be(i) {
  return i[i.length - 1] === `
` ? i.slice(0, -1) : i;
}
function Ds(i, e) {
  for (var l = /(\n+)([^\n]*)/g, a = (function() {
    var x = i.indexOf(`
`);
    return x = x !== -1 ? x : i.length, l.lastIndex = x, Xe(i.slice(0, x), e);
  })(), u = i[0] === `
` || i[0] === " ", c, p; p = l.exec(i); ) {
    var h = p[1], m = p[2];
    c = m[0] === " ", a += h + (!u && !c && m !== "" ? `
` : "") + Xe(m, e), u = c;
  }
  return a;
}
function Xe(i, e) {
  if (i === "" || i[0] === " ") return i;
  for (var l = / [^ ]/g, a, u = 0, c, p = 0, h = 0, m = ""; a = l.exec(i); )
    h = a.index, h - u > e && (c = p > u ? p : h, m += `
` + i.slice(u, c), u = c + 1), p = h;
  return m += `
`, i.length - u > e && p > u ? m += i.slice(u, p) + `
` + i.slice(p + 1) : m += i.slice(u), m.slice(1);
}
function Bs(i) {
  for (var e = "", l = 0, a, u = 0; u < i.length; l >= 65536 ? u += 2 : u++)
    l = Lt(i, u), a = G[l], !a && Nt(l) ? (e += i[u], l >= 65536 && (e += i[u + 1])) : e += a || As(l);
  return e;
}
function Xs(i, e, l) {
  var a = "", u = i.tag, c, p, h;
  for (c = 0, p = l.length; c < p; c += 1)
    h = l[c], i.replacer && (h = i.replacer.call(l, String(c), h)), (lt(i, e, h, !1, !1) || typeof h > "u" && lt(i, e, null, !1, !1)) && (a !== "" && (a += "," + (i.condenseFlow ? "" : " ")), a += i.dump);
  i.tag = u, i.dump = "[" + a + "]";
}
function Ye(i, e, l, a) {
  var u = "", c = i.tag, p, h, m;
  for (p = 0, h = l.length; p < h; p += 1)
    m = l[p], i.replacer && (m = i.replacer.call(l, String(p), m)), (lt(i, e + 1, m, !0, !0, !1, !0) || typeof m > "u" && lt(i, e + 1, null, !0, !0, !1, !0)) && ((!a || u !== "") && (u += ie(i, e)), i.dump && Et === i.dump.charCodeAt(0) ? u += "-" : u += "- ", u += i.dump);
  i.tag = c, i.dump = u || "[]";
}
function Ys(i, e, l) {
  var a = "", u = i.tag, c = Object.keys(l), p, h, m, x, C;
  for (p = 0, h = c.length; p < h; p += 1)
    C = "", a !== "" && (C += ", "), i.condenseFlow && (C += '"'), m = c[p], x = l[m], i.replacer && (x = i.replacer.call(l, m, x)), lt(i, e, m, !1, !1) && (i.dump.length > 1024 && (C += "? "), C += i.dump + (i.condenseFlow ? '"' : "") + ":" + (i.condenseFlow ? "" : " "), lt(i, e, x, !1, !1) && (C += i.dump, a += C));
  i.tag = u, i.dump = "{" + a + "}";
}
function Fs(i, e, l, a) {
  var u = "", c = i.tag, p = Object.keys(l), h, m, x, C, _, g;
  if (i.sortKeys === !0)
    p.sort();
  else if (typeof i.sortKeys == "function")
    p.sort(i.sortKeys);
  else if (i.sortKeys)
    throw new V("sortKeys must be a boolean or a function");
  for (h = 0, m = p.length; h < m; h += 1)
    g = "", (!a || u !== "") && (g += ie(i, e)), x = p[h], C = l[x], i.replacer && (C = i.replacer.call(l, x, C)), lt(i, e + 1, x, !0, !0, !0) && (_ = i.tag !== null && i.tag !== "?" || i.dump && i.dump.length > 1024, _ && (i.dump && Et === i.dump.charCodeAt(0) ? g += "?" : g += "? "), g += i.dump, _ && (g += ie(i, e)), lt(i, e + 1, C, !0, _) && (i.dump && Et === i.dump.charCodeAt(0) ? g += ":" : g += ": ", g += i.dump, u += g));
  i.tag = c, i.dump = u || "{}";
}
function Fe(i, e, l) {
  var a, u, c, p, h, m;
  for (u = l ? i.explicitTypes : i.implicitTypes, c = 0, p = u.length; c < p; c += 1)
    if (h = u[c], (h.instanceOf || h.predicate) && (!h.instanceOf || typeof e == "object" && e instanceof h.instanceOf) && (!h.predicate || h.predicate(e))) {
      if (l ? h.multi && h.representName ? i.tag = h.representName(e) : i.tag = h.tag : i.tag = "?", h.represent) {
        if (m = i.styleMap[h.tag] || h.defaultStyle, wi.call(h.represent) === "[object Function]")
          a = h.represent(e, m);
        else if (Ai.call(h.represent, m))
          a = h.represent[m](e, m);
        else
          throw new V("!<" + h.tag + '> tag resolver accepts not "' + m + '" style');
        i.dump = a;
      }
      return !0;
    }
  return !1;
}
function lt(i, e, l, a, u, c, p) {
  i.tag = null, i.dump = l, Fe(i, l, !1) || Fe(i, l, !0);
  var h = wi.call(i.dump), m = a, x;
  a && (a = i.flowLevel < 0 || i.flowLevel > e);
  var C = h === "[object Object]" || h === "[object Array]", _, g;
  if (C && (_ = i.duplicates.indexOf(l), g = _ !== -1), (i.tag !== null && i.tag !== "?" || g || i.indent !== 2 && e > 0) && (u = !1), g && i.usedDuplicates[_])
    i.dump = "*ref_" + _;
  else {
    if (C && g && !i.usedDuplicates[_] && (i.usedDuplicates[_] = !0), h === "[object Object]")
      a && Object.keys(i.dump).length !== 0 ? (Fs(i, e, i.dump, u), g && (i.dump = "&ref_" + _ + i.dump)) : (Ys(i, e, i.dump), g && (i.dump = "&ref_" + _ + " " + i.dump));
    else if (h === "[object Array]")
      a && i.dump.length !== 0 ? (i.noArrayIndent && !p && e > 0 ? Ye(i, e - 1, i.dump, u) : Ye(i, e, i.dump, u), g && (i.dump = "&ref_" + _ + i.dump)) : (Xs(i, e, i.dump), g && (i.dump = "&ref_" + _ + " " + i.dump));
    else if (h === "[object String]")
      i.tag !== "?" && Ms(i, i.dump, e, c, m);
    else {
      if (h === "[object Undefined]")
        return !1;
      if (i.skipInvalid) return !1;
      throw new V("unacceptable kind of an object to dump " + h);
    }
    i.tag !== null && i.tag !== "?" && (x = encodeURI(
      i.tag[0] === "!" ? i.tag.slice(1) : i.tag
    ).replace(/!/g, "%21"), i.tag[0] === "!" ? x = "!" + x : x.slice(0, 18) === "tag:yaml.org,2002:" ? x = "!!" + x.slice(18) : x = "!<" + x + ">", i.dump = x + " " + i.dump);
  }
  return !0;
}
function Rs(i, e) {
  var l = [], a = [], u, c;
  for (re(i, l, a), u = 0, c = a.length; u < c; u += 1)
    e.duplicates.push(l[a[u]]);
  e.usedDuplicates = new Array(c);
}
function re(i, e, l) {
  var a, u, c;
  if (i !== null && typeof i == "object")
    if (u = e.indexOf(i), u !== -1)
      l.indexOf(u) === -1 && l.push(u);
    else if (e.push(i), Array.isArray(i))
      for (u = 0, c = i.length; u < c; u += 1)
        re(i[u], e, l);
    else
      for (a = Object.keys(i), u = 0, c = a.length; u < c; u += 1)
        re(i[a[u]], e, l);
}
function ks(i, e) {
  e = e || {};
  var l = new Ls(e);
  l.noRefs || Rs(i, l);
  var a = i;
  return l.replacer && (a = l.replacer.call({ "": a }, "", a)), lt(l, 0, a, !0, !0) ? l.dump + `
` : "";
}
var Ws = ks, Us = {
  dump: Ws
};
function me(i, e) {
  return function() {
    throw new Error("Function yaml." + i + " is removed in js-yaml 4. Use yaml." + e + " instead, which is now safe by default.");
  };
}
var qs = Z, Hs = Je, zs = ti, Zs = oi, Gs = si, js = he, Vs = gi.load, Js = gi.loadAll, $s = Us.dump, Ks = V, Qs = {
  binary: hi,
  float: ri,
  map: Qe,
  null: ei,
  pairs: ci,
  set: di,
  timestamp: ui,
  bool: ii,
  int: ni,
  merge: fi,
  omap: pi,
  seq: Ke,
  str: $e
}, tl = me("safeLoad", "load"), el = me("safeLoadAll", "loadAll"), il = me("safeDump", "dump"), Xi = {
  Type: qs,
  Schema: Hs,
  FAILSAFE_SCHEMA: zs,
  JSON_SCHEMA: Zs,
  CORE_SCHEMA: Gs,
  DEFAULT_SCHEMA: js,
  load: Vs,
  loadAll: Js,
  dump: $s,
  YAMLException: Ks,
  types: Qs,
  safeLoad: tl,
  safeLoadAll: el,
  safeDump: il
};
function Yi(i, e, l) {
  let a = "";
  for (let u = e; u < e + l; u += 1) {
    const c = i[u];
    if (c === 0) break;
    a += String.fromCharCode(c);
  }
  return a.replace(/\0.*$/, "").trim();
}
function nl(i, e, l) {
  const a = Yi(i, e, l).replace(/\0/g, "").trim();
  return a ? Number.parseInt(a, 8) : 0;
}
function rl(i, e) {
  for (let l = e; l < e + 512; l += 1)
    if (i[l] !== 0) return !1;
  return !0;
}
function ye(i) {
  return i.replace(/^\.?\//, "");
}
function ol(i) {
  const e = ye(i).split("/");
  return (e[e.length - 1] || "").startsWith("._") || e.includes("PaxHeader") || e.includes("__MACOSX");
}
function sl(i) {
  const e = i instanceof Uint8Array ? i : new Uint8Array(i), l = /* @__PURE__ */ new Map();
  let a = 0;
  for (; a + 512 <= e.length && !rl(e, a); ) {
    const u = ye(Yi(e, a, 100)), c = nl(e, a + 124, 12), p = e[a + 156], h = a + 512, m = h + c;
    p !== 53 && p !== 120 && u && !ol(u) && l.set(u, e.slice(h, m)), a = h + Math.ceil(c / 512) * 512;
  }
  return l;
}
function Re(i, e) {
  const l = ye(e), a = i.get(l);
  if (a)
    return a;
  for (const [u, c] of i)
    if (u.endsWith(`/${l}`) || u === l)
      return c;
  throw new Error(`Entry "${e}" was not found in the tar archive.`);
}
const Fi = {
  "PP-OCRv5_mobile_det": {
    url: "https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-OCRv5_mobile_det_onnx_infer.tar"
  },
  "PP-OCRv5_mobile_rec": {
    url: "https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-OCRv5_mobile_rec_onnx_infer.tar"
  },
  "PP-OCRv6_small_det": {
    url: "https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-OCRv6_small_det_onnx_infer.tar"
  },
  "PP-OCRv6_small_rec": {
    url: "https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-OCRv6_small_rec_onnx_infer.tar"
  },
  "PP-OCRv6_tiny_det": {
    url: "https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-OCRv6_tiny_det_onnx_infer.tar"
  },
  "PP-OCRv6_tiny_rec": {
    url: "https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-OCRv6_tiny_rec_onnx_infer.tar"
  }
}, qt = Object.freeze({
  model: "inference.onnx",
  config: "inference.yml"
});
function ke(i) {
  return typeof i == "string" && i.length > 0;
}
function ll(i) {
  return !!(i && typeof i == "object" && !Array.isArray(i));
}
function al(i, e) {
  if (ke(e)) {
    const l = Fi[e];
    if (!l)
      throw new Error(`Asset "${i}" references unknown model asset "${e}".`);
    return { url: l.url };
  }
  if (!ll(e))
    throw new Error(`Asset "${i}" must be an object.`);
  if (!ke(e.url))
    throw new Error(`Asset "${i}" must define url.`);
  return {
    url: e.url
  };
}
function ul(i, e, l) {
  if (e === "model") {
    if (!(l instanceof Uint8Array) || l.byteLength === 0)
      throw new Error(`${i} model requires a non-empty ${qt.model} resource.`);
    return;
  }
  if (e === "config") {
    if (typeof l != "string" || l.trim().length === 0)
      throw new Error(`${i} model requires a non-empty ${qt.config} resource.`);
    return;
  }
  throw new Error(`Unsupported model resource slot "${e}".`);
}
function Ri(i, e) {
  for (const [l, a] of Object.entries(e))
    ul(i, l, a);
}
async function We(i, e = fetch) {
  const l = await e(i.url);
  if (!l.ok)
    throw new Error(`Failed to download ${i.url}: HTTP ${String(l.status)}`);
  const a = await l.arrayBuffer(), u = sl(a), c = Re(u, qt.model), p = Re(u, qt.config);
  return {
    modelBytes: c,
    configText: new TextDecoder().decode(p),
    download: {
      url: i.url,
      bytes: a.byteLength
    }
  };
}
const Vt = "OCR";
function ut(i) {
  return !!i && typeof i == "object" && !Array.isArray(i);
}
function $(i) {
  if (i == null || i === "")
    return;
  const e = Number(i);
  return Number.isFinite(e) ? e : void 0;
}
function Jt(i) {
  const e = $(i);
  return e !== void 0 && e >= 1 ? e : 1;
}
function fl(i, e) {
  return i !== "general" ? e : {
    text_det_limit_side_len: e.text_det_limit_side_len ?? 960,
    text_det_limit_type: e.text_det_limit_type ?? "max",
    text_det_max_side_limit: e.text_det_max_side_limit ?? 4e3,
    text_det_thresh: e.text_det_thresh ?? 0.3,
    text_det_box_thresh: e.text_det_box_thresh ?? 0.6,
    text_det_unclip_ratio: e.text_det_unclip_ratio ?? 2,
    text_rec_score_thresh: e.text_rec_score_thresh ?? 0
  };
}
function ki(i) {
  if (typeof i == "string") {
    const e = Xi.load(i);
    if (!ut(e))
      throw new Error("OCR pipeline config text must decode to an object.");
    return e;
  }
  if (!ut(i))
    throw new Error("OCR pipeline config must be an object or YAML text.");
  return i;
}
function Ue(i, e, l) {
  i.push(
    `${e} is not yet supported in PaddleOCR.js${`: ${l}`}.`
  );
}
function oe(i) {
  return typeof i?.model_name == "string" ? i.model_name : null;
}
function hl(i, e) {
  if (!e)
    throw new Error(
      `${i}.model_name must be provided when ${i}.model_dir is set.`
    );
}
function qe(i, e, l) {
  if (l?.model_dir == null)
    return null;
  if (ut(l.model_dir)) {
    const a = al(i, l.model_dir);
    return hl(e, oe(l)), a;
  }
  throw new Error(
    `${e}.model_dir must be null or an asset descriptor object in browser usage.`
  );
}
function $a(i) {
  return ki(i);
}
function Wi(i) {
  const e = ki(i), l = e.pipeline_name ?? Vt;
  if (l !== Vt)
    throw new Error(
      `Unsupported pipeline_name "${l}". PaddleOCR.js currently supports only "${Vt}".`
    );
  const a = [], u = ut(e.SubModules) ? e.SubModules : {}, c = ut(u.TextDetection) ? u.TextDetection : null, p = ut(u.TextRecognition) ? u.TextRecognition : null;
  if (!c || !p)
    throw new Error(
      'OCR pipeline config must define both "SubModules.TextDetection" and "SubModules.TextRecognition".'
    );
  const h = !!e.use_doc_preprocessor, m = !!e.use_textline_orientation, x = e.SubPipelines, C = ut(x?.DocPreprocessor) ? x.DocPreprocessor : null, _ = ut(u.TextLineOrientation) ? u.TextLineOrientation : null;
  (h || C) && Ue(a, "DocPreprocessor", "config will be ignored for now"), (m || _) && Ue(a, "TextLineOrientation", "config will be ignored for now");
  const g = typeof e.text_type == "string" && e.text_type.length > 0 ? e.text_type : "general";
  e.text_type && e.text_type !== "general" && a.push(`text_type ${JSON.stringify(e.text_type)} is not used by PaddleOCR.js yet.`);
  const T = qe("det", "SubModules.TextDetection", c), A = qe("rec", "SubModules.TextRecognition", p), O = Jt(e.batch_size), E = Jt(c.batch_size), N = Jt(p.batch_size);
  return {
    pipelineName: l,
    raw: e,
    warnings: a,
    unsupportedFeatures: [
      ...h || C ? ["DocPreprocessor"] : [],
      ...m || _ ? ["TextLineOrientation"] : []
    ],
    modelSelection: {
      textDetectionModelName: oe(c),
      textRecognitionModelName: oe(p)
    },
    assets: {
      ...T ? { det: T } : {},
      ...A ? { rec: A } : {}
    },
    runtimeDefaults: fl(g, {
      text_det_limit_side_len: $(c.limit_side_len),
      text_det_limit_type: c.limit_type || void 0,
      text_det_max_side_limit: $(c.max_side_limit),
      text_det_thresh: $(c.thresh),
      text_det_box_thresh: $(c.box_thresh),
      text_det_unclip_ratio: $(c.unclip_ratio),
      text_rec_score_thresh: $(p.score_thresh)
    }),
    pipelineBatchSize: O,
    textDetectionBatchSize: E,
    textRecognitionBatchSize: N
  };
}
function pl() {
  if (globalThis.location.protocol === "file:")
    throw new Error("PaddleOCR.js requires an HTTP(S) origin so model assets can be fetched.");
}
function He(i) {
  return typeof globalThis[i] < "u";
}
async function Ui(i) {
  if (typeof ImageBitmap < "u" && i instanceof ImageBitmap) return i;
  if (i instanceof Blob || He("HTMLCanvasElement") && i instanceof HTMLCanvasElement)
    return createImageBitmap(i);
  if (i instanceof ImageData) {
    const e = document.createElement("canvas");
    e.width = i.width, e.height = i.height;
    const l = e.getContext("2d");
    if (!l) throw new Error("Failed to create a 2D canvas context.");
    return l.putImageData(i, 0, 0), createImageBitmap(e);
  }
  if (He("HTMLImageElement") && i instanceof HTMLImageElement)
    return createImageBitmap(i);
  throw new Error("Unsupported image source. Use a Blob, ImageBitmap, ImageData, canvas, or img.");
}
async function cl(i) {
  return typeof ImageBitmap < "u" && i instanceof ImageBitmap ? createImageBitmap(i) : Ui(i);
}
function dl(i, e) {
  const l = document.createElement("canvas");
  l.width = e.width, l.height = e.height;
  const a = l.getContext("2d", { willReadFrequently: !0 });
  if (!a) throw new Error("Failed to create a 2D canvas context.");
  return a.drawImage(e, 0, 0), {
    canvas: l,
    mat: i.imread(l)
  };
}
async function ml(i, e) {
  if (typeof i.Mat == "function" && e instanceof i.Mat) {
    const u = e.clone();
    return {
      width: e.cols,
      height: e.rows,
      mat: u,
      dispose() {
        u.delete();
      }
    };
  }
  const l = await Ui(e), a = dl(i, l);
  return {
    width: l.width,
    height: l.height,
    mat: a.mat,
    dispose() {
      a.mat.delete(), l.close();
    }
  };
}
async function yl(i) {
  if (typeof ImageBitmap > "u" || typeof createImageBitmap != "function")
    throw new Error("Worker mode requires ImageBitmap support in this browser.");
  const e = await cl(i);
  return {
    payload: {
      kind: "imageBitmap",
      imageBitmap: e
    },
    transferables: [e]
  };
}
let Dt = null;
async function Pl() {
  return Dt || (Dt = import("onnxruntime-web"), Dt);
}
async function xl() {
  const i = globalThis.navigator?.gpu;
  if (!i?.requestAdapter)
    return {
      available: !1,
      reason: "navigator.gpu is unavailable in this browser."
    };
  try {
    return await i.requestAdapter() ? {
      available: !0,
      reason: ""
    } : {
      available: !1,
      reason: "The browser did not return a WebGPU adapter."
    };
  } catch (e) {
    return {
      available: !1,
      reason: e instanceof Error ? e.message : "Failed to request a WebGPU adapter."
    };
  }
}
function qi(i, e) {
  if (i === "webgpu") {
    if (!e.available)
      throw new Error(`WebGPU is unavailable: ${e.reason}`);
    return [["webgpu"]];
  }
  return i === "wasm" ? [["wasm"]] : e.available ? [["webgpu"], ["wasm"]] : [["wasm"]];
}
function vl(i, e) {
  const l = i.env.wasm;
  e.wasmPaths !== void 0 && (l.wasmPaths = e.wasmPaths), e.numThreads !== void 0 && (l.numThreads = e.numThreads), e.simd !== void 0 && (l.simd = e.simd), e.proxy !== void 0 && (l.proxy = e.proxy), e.disableWasmProxy && (l.proxy = !1);
}
async function _l(i = {}) {
  const e = typeof i == "string" ? i : i.backend === "webgpu" || i.backend === "wasm" ? i.backend : "auto", l = await xl(), a = await Pl();
  return typeof i != "string" && vl(a, i), {
    ort: a,
    webgpuState: l,
    backend: e
  };
}
async function Hi(i, e, l) {
  let a = null;
  for (const u of l)
    try {
      return { session: await i.InferenceSession.create(e, {
        executionProviders: u,
        graphOptimizationLevel: "all"
      }), provider: u[0] };
    } catch (c) {
      a = c;
    }
  throw a instanceof Error ? a : new Error("Failed to create ONNX session.");
}
async function zi(...i) {
  await Promise.all(
    i.map(async (e) => {
      e?.release && await e.release();
    })
  );
}
function at() {
  return performance.now();
}
function st(i, e, l) {
  return Math.max(e, Math.min(l, i));
}
function se(i, e) {
  const l = i[0] - e[0], a = i[1] - e[1];
  return Math.sqrt(l * l + a * a);
}
function Zi(i, e, l) {
  let a = !1;
  return new Promise((u, c) => {
    const p = setTimeout(() => {
      a || (a = !0, c(new Error(`${l} timed out after ${String(e / 1e3)}s`)));
    }, e);
    i.then((h) => {
      a || (a = !0, clearTimeout(p), u(h));
    }).catch((h) => {
      a || (a = !0, clearTimeout(p), c(h));
    });
  });
}
function Gi(i, e) {
  const l = i ?? e, a = typeof l == "number" ? l : typeof l == "string" ? Number.parseInt(l, 10) : Number.NaN;
  return Math.max(1, Number.isFinite(a) ? a : 1);
}
function Pe(i, e) {
  const l = [];
  for (let a = 0; a < i.length; a += e)
    l.push(i.slice(a, a + e));
  return l;
}
function ji(i) {
  return structuredClone(i);
}
async function Vi(i, e) {
  const l = i.inputNames[0];
  return (await i.run({ [l]: e }))[i.outputNames[0]];
}
function Cl(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var $t = { exports: {} }, ze;
function Il() {
  return ze || (ze = 1, (function(i) {
    (function() {
      var e = {};
      e.version = "6.4.2.2", e.use_lines = !0, e.use_xyz = !1;
      var l = !1;
      i.exports ? (i.exports = e, l = !0) : typeof document < "u" ? window.ClipperLib = e : self.ClipperLib = e;
      var a;
      if (l) {
        var u = "chrome";
        a = "Netscape";
      } else {
        var u = navigator.userAgent.toString().toLowerCase();
        a = navigator.appName;
      }
      var c = {};
      u.indexOf("chrome") != -1 && u.indexOf("chromium") == -1 ? c.chrome = 1 : c.chrome = 0, u.indexOf("chromium") != -1 ? c.chromium = 1 : c.chromium = 0, u.indexOf("safari") != -1 && u.indexOf("chrome") == -1 && u.indexOf("chromium") == -1 ? c.safari = 1 : c.safari = 0, u.indexOf("firefox") != -1 ? c.firefox = 1 : c.firefox = 0, u.indexOf("firefox/17") != -1 ? c.firefox17 = 1 : c.firefox17 = 0, u.indexOf("firefox/15") != -1 ? c.firefox15 = 1 : c.firefox15 = 0, u.indexOf("firefox/3") != -1 ? c.firefox3 = 1 : c.firefox3 = 0, u.indexOf("opera") != -1 ? c.opera = 1 : c.opera = 0, u.indexOf("msie 10") != -1 ? c.msie10 = 1 : c.msie10 = 0, u.indexOf("msie 9") != -1 ? c.msie9 = 1 : c.msie9 = 0, u.indexOf("msie 8") != -1 ? c.msie8 = 1 : c.msie8 = 0, u.indexOf("msie 7") != -1 ? c.msie7 = 1 : c.msie7 = 0, u.indexOf("msie ") != -1 ? c.msie = 1 : c.msie = 0, e.biginteger_used = null;
      var p;
      function h(t, n, r) {
        e.biginteger_used = 1, t != null && (typeof t == "number" && typeof n > "u" ? this.fromInt(t) : typeof t == "number" ? this.fromNumber(t, n, r) : n == null && typeof t != "string" ? this.fromString(t, 256) : this.fromString(t, n));
      }
      function m() {
        return new h(null, void 0, void 0);
      }
      function x(t, n, r, o, s, f) {
        for (; --f >= 0; ) {
          var d = n * this[t++] + r[o] + s;
          s = Math.floor(d / 67108864), r[o++] = d & 67108863;
        }
        return s;
      }
      function C(t, n, r, o, s, f) {
        for (var d = n & 32767, y = n >> 15; --f >= 0; ) {
          var P = this[t] & 32767, v = this[t++] >> 15, w = y * P + v * d;
          P = d * P + ((w & 32767) << 15) + r[o] + (s & 1073741823), s = (P >>> 30) + (w >>> 15) + y * v + (s >>> 30), r[o++] = P & 1073741823;
        }
        return s;
      }
      function _(t, n, r, o, s, f) {
        for (var d = n & 16383, y = n >> 14; --f >= 0; ) {
          var P = this[t] & 16383, v = this[t++] >> 14, w = y * P + v * d;
          P = d * P + ((w & 16383) << 14) + r[o] + s, s = (P >> 28) + (w >> 14) + y * v, r[o++] = P & 268435455;
        }
        return s;
      }
      a == "Microsoft Internet Explorer" ? (h.prototype.am = C, p = 30) : a != "Netscape" ? (h.prototype.am = x, p = 26) : (h.prototype.am = _, p = 28), h.prototype.DB = p, h.prototype.DM = (1 << p) - 1, h.prototype.DV = 1 << p;
      var g = 52;
      h.prototype.FV = Math.pow(2, g), h.prototype.F1 = g - p, h.prototype.F2 = 2 * p - g;
      var T = "0123456789abcdefghijklmnopqrstuvwxyz", A = new Array(), O, E;
      for (O = 48, E = 0; E <= 9; ++E) A[O++] = E;
      for (O = 97, E = 10; E < 36; ++E) A[O++] = E;
      for (O = 65, E = 10; E < 36; ++E) A[O++] = E;
      function N(t) {
        return T.charAt(t);
      }
      function L(t, n) {
        var r = A[t.charCodeAt(n)];
        return r ?? -1;
      }
      function D(t) {
        for (var n = this.t - 1; n >= 0; --n) t[n] = this[n];
        t.t = this.t, t.s = this.s;
      }
      function R(t) {
        this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0;
      }
      function W(t) {
        var n = m();
        return n.fromInt(t), n;
      }
      function z(t, n) {
        var r;
        if (n == 16) r = 4;
        else if (n == 8) r = 3;
        else if (n == 256) r = 8;
        else if (n == 2) r = 1;
        else if (n == 32) r = 5;
        else if (n == 4) r = 2;
        else {
          this.fromRadix(t, n);
          return;
        }
        this.t = 0, this.s = 0;
        for (var o = t.length, s = !1, f = 0; --o >= 0; ) {
          var d = r == 8 ? t[o] & 255 : L(t, o);
          if (d < 0) {
            t.charAt(o) == "-" && (s = !0);
            continue;
          }
          s = !1, f == 0 ? this[this.t++] = d : f + r > this.DB ? (this[this.t - 1] |= (d & (1 << this.DB - f) - 1) << f, this[this.t++] = d >> this.DB - f) : this[this.t - 1] |= d << f, f += r, f >= this.DB && (f -= this.DB);
        }
        r == 8 && (t[0] & 128) != 0 && (this.s = -1, f > 0 && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f)), this.clamp(), s && h.ZERO.subTo(this, this);
      }
      function k() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t;
      }
      function tt(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var n;
        if (t == 16) n = 4;
        else if (t == 8) n = 3;
        else if (t == 2) n = 1;
        else if (t == 32) n = 5;
        else if (t == 4) n = 2;
        else return this.toRadix(t);
        var r = (1 << n) - 1, o, s = !1, f = "", d = this.t, y = this.DB - d * this.DB % n;
        if (d-- > 0)
          for (y < this.DB && (o = this[d] >> y) > 0 && (s = !0, f = N(o)); d >= 0; )
            y < n ? (o = (this[d] & (1 << y) - 1) << n - y, o |= this[--d] >> (y += this.DB - n)) : (o = this[d] >> (y -= n) & r, y <= 0 && (y += this.DB, --d)), o > 0 && (s = !0), s && (f += N(o));
        return s ? f : "0";
      }
      function it() {
        var t = m();
        return h.ZERO.subTo(this, t), t;
      }
      function U() {
        return this.s < 0 ? this.negate() : this;
      }
      function Mt(t) {
        var n = this.s - t.s;
        if (n != 0) return n;
        var r = this.t;
        if (n = r - t.t, n != 0) return this.s < 0 ? -n : n;
        for (; --r >= 0; )
          if ((n = this[r] - t[r]) != 0) return n;
        return 0;
      }
      function ot(t) {
        var n = 1, r;
        return (r = t >>> 16) != 0 && (t = r, n += 16), (r = t >> 8) != 0 && (t = r, n += 8), (r = t >> 4) != 0 && (t = r, n += 4), (r = t >> 2) != 0 && (t = r, n += 2), (r = t >> 1) != 0 && (t = r, n += 1), n;
      }
      function yt() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + ot(this[this.t - 1] ^ this.s & this.DM);
      }
      function rn(t, n) {
        var r;
        for (r = this.t - 1; r >= 0; --r) n[r + t] = this[r];
        for (r = t - 1; r >= 0; --r) n[r] = 0;
        n.t = this.t + t, n.s = this.s;
      }
      function on(t, n) {
        for (var r = t; r < this.t; ++r) n[r - t] = this[r];
        n.t = Math.max(this.t - t, 0), n.s = this.s;
      }
      function sn(t, n) {
        var r = t % this.DB, o = this.DB - r, s = (1 << o) - 1, f = Math.floor(t / this.DB), d = this.s << r & this.DM, y;
        for (y = this.t - 1; y >= 0; --y)
          n[y + f + 1] = this[y] >> o | d, d = (this[y] & s) << r;
        for (y = f - 1; y >= 0; --y) n[y] = 0;
        n[f] = d, n.t = this.t + f + 1, n.s = this.s, n.clamp();
      }
      function ln(t, n) {
        n.s = this.s;
        var r = Math.floor(t / this.DB);
        if (r >= this.t) {
          n.t = 0;
          return;
        }
        var o = t % this.DB, s = this.DB - o, f = (1 << o) - 1;
        n[0] = this[r] >> o;
        for (var d = r + 1; d < this.t; ++d)
          n[d - r - 1] |= (this[d] & f) << s, n[d - r] = this[d] >> o;
        o > 0 && (n[this.t - r - 1] |= (this.s & f) << s), n.t = this.t - r, n.clamp();
      }
      function an(t, n) {
        for (var r = 0, o = 0, s = Math.min(t.t, this.t); r < s; )
          o += this[r] - t[r], n[r++] = o & this.DM, o >>= this.DB;
        if (t.t < this.t) {
          for (o -= t.s; r < this.t; )
            o += this[r], n[r++] = o & this.DM, o >>= this.DB;
          o += this.s;
        } else {
          for (o += this.s; r < t.t; )
            o -= t[r], n[r++] = o & this.DM, o >>= this.DB;
          o -= t.s;
        }
        n.s = o < 0 ? -1 : 0, o < -1 ? n[r++] = this.DV + o : o > 0 && (n[r++] = o), n.t = r, n.clamp();
      }
      function un(t, n) {
        var r = this.abs(), o = t.abs(), s = r.t;
        for (n.t = s + o.t; --s >= 0; ) n[s] = 0;
        for (s = 0; s < o.t; ++s) n[s + r.t] = r.am(0, o[s], n, s, 0, r.t);
        n.s = 0, n.clamp(), this.s != t.s && h.ZERO.subTo(n, n);
      }
      function fn(t) {
        for (var n = this.abs(), r = t.t = 2 * n.t; --r >= 0; ) t[r] = 0;
        for (r = 0; r < n.t - 1; ++r) {
          var o = n.am(r, n[r], t, 2 * r, 0, 1);
          (t[r + n.t] += n.am(r + 1, 2 * n[r], t, 2 * r + 1, o, n.t - r - 1)) >= n.DV && (t[r + n.t] -= n.DV, t[r + n.t + 1] = 1);
        }
        t.t > 0 && (t[t.t - 1] += n.am(r, n[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp();
      }
      function hn(t, n, r) {
        var o = t.abs();
        if (!(o.t <= 0)) {
          var s = this.abs();
          if (s.t < o.t) {
            n?.fromInt(0), r != null && this.copyTo(r);
            return;
          }
          r == null && (r = m());
          var f = m(), d = this.s, y = t.s, P = this.DB - ot(o[o.t - 1]);
          P > 0 ? (o.lShiftTo(P, f), s.lShiftTo(P, r)) : (o.copyTo(f), s.copyTo(r));
          var v = f.t, w = f[v - 1];
          if (w != 0) {
            var I = w * (1 << this.F1) + (v > 1 ? f[v - 2] >> this.F2 : 0), S = this.FV / I, M = (1 << this.F1) / I, X = 1 << this.F2, Y = r.t, F = Y - v, J = n ?? m();
            for (f.dlShiftTo(F, J), r.compareTo(J) >= 0 && (r[r.t++] = 1, r.subTo(J, r)), h.ONE.dlShiftTo(v, J), J.subTo(f, f); f.t < v; ) f[f.t++] = 0;
            for (; --F >= 0; ) {
              var nt = r[--Y] == w ? this.DM : Math.floor(r[Y] * S + (r[Y - 1] + X) * M);
              if ((r[Y] += f.am(0, nt, r, F, 0, v)) < nt)
                for (f.dlShiftTo(F, J), r.subTo(J, r); r[Y] < --nt; ) r.subTo(J, r);
            }
            n != null && (r.drShiftTo(v, n), d != y && h.ZERO.subTo(n, n)), r.t = v, r.clamp(), P > 0 && r.rShiftTo(P, r), d < 0 && h.ZERO.subTo(r, r);
          }
        }
      }
      function pn(t) {
        var n = m();
        return this.abs().divRemTo(t, null, n), this.s < 0 && n.compareTo(h.ZERO) > 0 && t.subTo(n, n), n;
      }
      function pt(t) {
        this.m = t;
      }
      function cn(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
      }
      function dn(t) {
        return t;
      }
      function mn(t) {
        t.divRemTo(this.m, null, t);
      }
      function yn(t, n, r) {
        t.multiplyTo(n, r), this.reduce(r);
      }
      function Pn(t, n) {
        t.squareTo(n), this.reduce(n);
      }
      pt.prototype.convert = cn, pt.prototype.revert = dn, pt.prototype.reduce = mn, pt.prototype.mulTo = yn, pt.prototype.sqrTo = Pn;
      function xn() {
        if (this.t < 1) return 0;
        var t = this[0];
        if ((t & 1) == 0) return 0;
        var n = t & 3;
        return n = n * (2 - (t & 15) * n) & 15, n = n * (2 - (t & 255) * n) & 255, n = n * (2 - ((t & 65535) * n & 65535)) & 65535, n = n * (2 - t * n % this.DV) % this.DV, n > 0 ? this.DV - n : -n;
      }
      function ct(t) {
        this.m = t, this.mp = t.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t;
      }
      function vn(t) {
        var n = m();
        return t.abs().dlShiftTo(this.m.t, n), n.divRemTo(this.m, null, n), t.s < 0 && n.compareTo(h.ZERO) > 0 && this.m.subTo(n, n), n;
      }
      function _n(t) {
        var n = m();
        return t.copyTo(n), this.reduce(n), n;
      }
      function Cn(t) {
        for (; t.t <= this.mt2; )
          t[t.t++] = 0;
        for (var n = 0; n < this.m.t; ++n) {
          var r = t[n] & 32767, o = r * this.mpl + ((r * this.mph + (t[n] >> 15) * this.mpl & this.um) << 15) & t.DM;
          for (r = n + this.m.t, t[r] += this.m.am(0, o, t, n, 0, this.m.t); t[r] >= t.DV; )
            t[r] -= t.DV, t[++r]++;
        }
        t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
      }
      function In(t, n) {
        t.squareTo(n), this.reduce(n);
      }
      function Tn(t, n, r) {
        t.multiplyTo(n, r), this.reduce(r);
      }
      ct.prototype.convert = vn, ct.prototype.revert = _n, ct.prototype.reduce = Cn, ct.prototype.mulTo = Tn, ct.prototype.sqrTo = In;
      function gn() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0;
      }
      function wn(t, n) {
        if (t > 4294967295 || t < 1) return h.ONE;
        var r = m(), o = m(), s = n.convert(this), f = ot(t) - 1;
        for (s.copyTo(r); --f >= 0; )
          if (n.sqrTo(r, o), (t & 1 << f) > 0) n.mulTo(o, s, r);
          else {
            var d = r;
            r = o, o = d;
          }
        return n.revert(r);
      }
      function An(t, n) {
        var r;
        return t < 256 || n.isEven() ? r = new pt(n) : r = new ct(n), this.exp(t, r);
      }
      h.prototype.copyTo = D, h.prototype.fromInt = R, h.prototype.fromString = z, h.prototype.clamp = k, h.prototype.dlShiftTo = rn, h.prototype.drShiftTo = on, h.prototype.lShiftTo = sn, h.prototype.rShiftTo = ln, h.prototype.subTo = an, h.prototype.multiplyTo = un, h.prototype.squareTo = fn, h.prototype.divRemTo = hn, h.prototype.invDigit = xn, h.prototype.isEven = gn, h.prototype.exp = wn, h.prototype.toString = tt, h.prototype.negate = it, h.prototype.abs = U, h.prototype.compareTo = Mt, h.prototype.bitLength = yt, h.prototype.mod = pn, h.prototype.modPowInt = An, h.ZERO = W(0), h.ONE = W(1);
      function Sn() {
        var t = m();
        return this.copyTo(t), t;
      }
      function Ln() {
        if (this.s < 0) {
          if (this.t == 1) return this[0] - this.DV;
          if (this.t == 0) return -1;
        } else {
          if (this.t == 1) return this[0];
          if (this.t == 0) return 0;
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
      }
      function On() {
        return this.t == 0 ? this.s : this[0] << 24 >> 24;
      }
      function En() {
        return this.t == 0 ? this.s : this[0] << 16 >> 16;
      }
      function bn(t) {
        return Math.floor(Math.LN2 * this.DB / Math.log(t));
      }
      function Nn() {
        return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this[0] <= 0 ? 0 : 1;
      }
      function Mn(t) {
        if (t == null && (t = 10), this.signum() == 0 || t < 2 || t > 36) return "0";
        var n = this.chunkSize(t), r = Math.pow(t, n), o = W(r), s = m(), f = m(), d = "";
        for (this.divRemTo(o, s, f); s.signum() > 0; )
          d = (r + f.intValue()).toString(t).substr(1) + d, s.divRemTo(o, s, f);
        return f.intValue().toString(t) + d;
      }
      function Dn(t, n) {
        this.fromInt(0), n == null && (n = 10);
        for (var r = this.chunkSize(n), o = Math.pow(n, r), s = !1, f = 0, d = 0, y = 0; y < t.length; ++y) {
          var P = L(t, y);
          if (P < 0) {
            t.charAt(y) == "-" && this.signum() == 0 && (s = !0);
            continue;
          }
          d = n * d + P, ++f >= r && (this.dMultiply(o), this.dAddOffset(d, 0), f = 0, d = 0);
        }
        f > 0 && (this.dMultiply(Math.pow(n, f)), this.dAddOffset(d, 0)), s && h.ZERO.subTo(this, this);
      }
      function Bn(t, n, r) {
        if (typeof n == "number")
          if (t < 2) this.fromInt(1);
          else
            for (this.fromNumber(t, r), this.testBit(t - 1) || this.bitwiseTo(h.ONE.shiftLeft(t - 1), zt, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(n); )
              this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(h.ONE.shiftLeft(t - 1), this);
        else {
          var o = new Array(), s = t & 7;
          o.length = (t >> 3) + 1, n.nextBytes(o), s > 0 ? o[0] &= (1 << s) - 1 : o[0] = 0, this.fromString(o, 256);
        }
      }
      function Xn() {
        var t = this.t, n = new Array();
        n[0] = this.s;
        var r = this.DB - t * this.DB % 8, o, s = 0;
        if (t-- > 0)
          for (r < this.DB && (o = this[t] >> r) != (this.s & this.DM) >> r && (n[s++] = o | this.s << this.DB - r); t >= 0; )
            r < 8 ? (o = (this[t] & (1 << r) - 1) << 8 - r, o |= this[--t] >> (r += this.DB - 8)) : (o = this[t] >> (r -= 8) & 255, r <= 0 && (r += this.DB, --t)), (o & 128) != 0 && (o |= -256), s == 0 && (this.s & 128) != (o & 128) && ++s, (s > 0 || o != this.s) && (n[s++] = o);
        return n;
      }
      function Yn(t) {
        return this.compareTo(t) == 0;
      }
      function Fn(t) {
        return this.compareTo(t) < 0 ? this : t;
      }
      function Rn(t) {
        return this.compareTo(t) > 0 ? this : t;
      }
      function kn(t, n, r) {
        var o, s, f = Math.min(t.t, this.t);
        for (o = 0; o < f; ++o) r[o] = n(this[o], t[o]);
        if (t.t < this.t) {
          for (s = t.s & this.DM, o = f; o < this.t; ++o) r[o] = n(this[o], s);
          r.t = this.t;
        } else {
          for (s = this.s & this.DM, o = f; o < t.t; ++o) r[o] = n(s, t[o]);
          r.t = t.t;
        }
        r.s = n(this.s, t.s), r.clamp();
      }
      function Wn(t, n) {
        return t & n;
      }
      function Un(t) {
        var n = m();
        return this.bitwiseTo(t, Wn, n), n;
      }
      function zt(t, n) {
        return t | n;
      }
      function qn(t) {
        var n = m();
        return this.bitwiseTo(t, zt, n), n;
      }
      function _e(t, n) {
        return t ^ n;
      }
      function Hn(t) {
        var n = m();
        return this.bitwiseTo(t, _e, n), n;
      }
      function Ce(t, n) {
        return t & ~n;
      }
      function zn(t) {
        var n = m();
        return this.bitwiseTo(t, Ce, n), n;
      }
      function Zn() {
        for (var t = m(), n = 0; n < this.t; ++n) t[n] = this.DM & ~this[n];
        return t.t = this.t, t.s = ~this.s, t;
      }
      function Gn(t) {
        var n = m();
        return t < 0 ? this.rShiftTo(-t, n) : this.lShiftTo(t, n), n;
      }
      function jn(t) {
        var n = m();
        return t < 0 ? this.lShiftTo(-t, n) : this.rShiftTo(t, n), n;
      }
      function Vn(t) {
        if (t == 0) return -1;
        var n = 0;
        return (t & 65535) == 0 && (t >>= 16, n += 16), (t & 255) == 0 && (t >>= 8, n += 8), (t & 15) == 0 && (t >>= 4, n += 4), (t & 3) == 0 && (t >>= 2, n += 2), (t & 1) == 0 && ++n, n;
      }
      function Jn() {
        for (var t = 0; t < this.t; ++t)
          if (this[t] != 0) return t * this.DB + Vn(this[t]);
        return this.s < 0 ? this.t * this.DB : -1;
      }
      function $n(t) {
        for (var n = 0; t != 0; )
          t &= t - 1, ++n;
        return n;
      }
      function Kn() {
        for (var t = 0, n = this.s & this.DM, r = 0; r < this.t; ++r) t += $n(this[r] ^ n);
        return t;
      }
      function Qn(t) {
        var n = Math.floor(t / this.DB);
        return n >= this.t ? this.s != 0 : (this[n] & 1 << t % this.DB) != 0;
      }
      function tr(t, n) {
        var r = h.ONE.shiftLeft(t);
        return this.bitwiseTo(r, n, r), r;
      }
      function er(t) {
        return this.changeBit(t, zt);
      }
      function ir(t) {
        return this.changeBit(t, Ce);
      }
      function nr(t) {
        return this.changeBit(t, _e);
      }
      function rr(t, n) {
        for (var r = 0, o = 0, s = Math.min(t.t, this.t); r < s; )
          o += this[r] + t[r], n[r++] = o & this.DM, o >>= this.DB;
        if (t.t < this.t) {
          for (o += t.s; r < this.t; )
            o += this[r], n[r++] = o & this.DM, o >>= this.DB;
          o += this.s;
        } else {
          for (o += this.s; r < t.t; )
            o += t[r], n[r++] = o & this.DM, o >>= this.DB;
          o += t.s;
        }
        n.s = o < 0 ? -1 : 0, o > 0 ? n[r++] = o : o < -1 && (n[r++] = this.DV + o), n.t = r, n.clamp();
      }
      function or(t) {
        var n = m();
        return this.addTo(t, n), n;
      }
      function sr(t) {
        var n = m();
        return this.subTo(t, n), n;
      }
      function lr(t) {
        var n = m();
        return this.multiplyTo(t, n), n;
      }
      function ar() {
        var t = m();
        return this.squareTo(t), t;
      }
      function ur(t) {
        var n = m();
        return this.divRemTo(t, n, null), n;
      }
      function fr(t) {
        var n = m();
        return this.divRemTo(t, null, n), n;
      }
      function hr(t) {
        var n = m(), r = m();
        return this.divRemTo(t, n, r), new Array(n, r);
      }
      function pr(t) {
        this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp();
      }
      function cr(t, n) {
        if (t != 0) {
          for (; this.t <= n; ) this[this.t++] = 0;
          for (this[n] += t; this[n] >= this.DV; )
            this[n] -= this.DV, ++n >= this.t && (this[this.t++] = 0), ++this[n];
        }
      }
      function wt() {
      }
      function Ie(t) {
        return t;
      }
      function dr(t, n, r) {
        t.multiplyTo(n, r);
      }
      function mr(t, n) {
        t.squareTo(n);
      }
      wt.prototype.convert = Ie, wt.prototype.revert = Ie, wt.prototype.mulTo = dr, wt.prototype.sqrTo = mr;
      function yr(t) {
        return this.exp(t, new wt());
      }
      function Pr(t, n, r) {
        var o = Math.min(this.t + t.t, n);
        for (r.s = 0, r.t = o; o > 0; ) r[--o] = 0;
        var s;
        for (s = r.t - this.t; o < s; ++o) r[o + this.t] = this.am(0, t[o], r, o, 0, this.t);
        for (s = Math.min(t.t, n); o < s; ++o) this.am(0, t[o], r, o, 0, n - o);
        r.clamp();
      }
      function xr(t, n, r) {
        --n;
        var o = r.t = this.t + t.t - n;
        for (r.s = 0; --o >= 0; ) r[o] = 0;
        for (o = Math.max(n - this.t, 0); o < t.t; ++o)
          r[this.t + o - n] = this.am(n - o, t[o], r, 0, 0, this.t + o - n);
        r.clamp(), r.drShiftTo(1, r);
      }
      function Pt(t) {
        this.r2 = m(), this.q3 = m(), h.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t;
      }
      function vr(t) {
        if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
        if (t.compareTo(this.m) < 0) return t;
        var n = m();
        return t.copyTo(n), this.reduce(n), n;
      }
      function _r(t) {
        return t;
      }
      function Cr(t) {
        for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; ) t.dAddOffset(1, this.m.t + 1);
        for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; ) t.subTo(this.m, t);
      }
      function Ir(t, n) {
        t.squareTo(n), this.reduce(n);
      }
      function Tr(t, n, r) {
        t.multiplyTo(n, r), this.reduce(r);
      }
      Pt.prototype.convert = vr, Pt.prototype.revert = _r, Pt.prototype.reduce = Cr, Pt.prototype.mulTo = Tr, Pt.prototype.sqrTo = Ir;
      function gr(t, n) {
        var r = t.bitLength(), o, s = W(1), f;
        if (r <= 0) return s;
        r < 18 ? o = 1 : r < 48 ? o = 3 : r < 144 ? o = 4 : r < 768 ? o = 5 : o = 6, r < 8 ? f = new pt(n) : n.isEven() ? f = new Pt(n) : f = new ct(n);
        var d = new Array(), y = 3, P = o - 1, v = (1 << o) - 1;
        if (d[1] = f.convert(this), o > 1) {
          var w = m();
          for (f.sqrTo(d[1], w); y <= v; )
            d[y] = m(), f.mulTo(w, d[y - 2], d[y]), y += 2;
        }
        var I = t.t - 1, S, M = !0, X = m(), Y;
        for (r = ot(t[I]) - 1; I >= 0; ) {
          for (r >= P ? S = t[I] >> r - P & v : (S = (t[I] & (1 << r + 1) - 1) << P - r, I > 0 && (S |= t[I - 1] >> this.DB + r - P)), y = o; (S & 1) == 0; )
            S >>= 1, --y;
          if ((r -= y) < 0 && (r += this.DB, --I), M)
            d[S].copyTo(s), M = !1;
          else {
            for (; y > 1; )
              f.sqrTo(s, X), f.sqrTo(X, s), y -= 2;
            y > 0 ? f.sqrTo(s, X) : (Y = s, s = X, X = Y), f.mulTo(X, d[S], s);
          }
          for (; I >= 0 && (t[I] & 1 << r) == 0; )
            f.sqrTo(s, X), Y = s, s = X, X = Y, --r < 0 && (r = this.DB - 1, --I);
        }
        return f.revert(s);
      }
      function wr(t) {
        var n = this.s < 0 ? this.negate() : this.clone(), r = t.s < 0 ? t.negate() : t.clone();
        if (n.compareTo(r) < 0) {
          var o = n;
          n = r, r = o;
        }
        var s = n.getLowestSetBit(), f = r.getLowestSetBit();
        if (f < 0) return n;
        for (s < f && (f = s), f > 0 && (n.rShiftTo(f, n), r.rShiftTo(f, r)); n.signum() > 0; )
          (s = n.getLowestSetBit()) > 0 && n.rShiftTo(s, n), (s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r), n.compareTo(r) >= 0 ? (n.subTo(r, n), n.rShiftTo(1, n)) : (r.subTo(n, r), r.rShiftTo(1, r));
        return f > 0 && r.lShiftTo(f, r), r;
      }
      function Ar(t) {
        if (t <= 0) return 0;
        var n = this.DV % t, r = this.s < 0 ? t - 1 : 0;
        if (this.t > 0)
          if (n == 0) r = this[0] % t;
          else
            for (var o = this.t - 1; o >= 0; --o) r = (n * r + this[o]) % t;
        return r;
      }
      function Sr(t) {
        var n = t.isEven();
        if (this.isEven() && n || t.signum() == 0) return h.ZERO;
        for (var r = t.clone(), o = this.clone(), s = W(1), f = W(0), d = W(0), y = W(1); r.signum() != 0; ) {
          for (; r.isEven(); )
            r.rShiftTo(1, r), n ? ((!s.isEven() || !f.isEven()) && (s.addTo(this, s), f.subTo(t, f)), s.rShiftTo(1, s)) : f.isEven() || f.subTo(t, f), f.rShiftTo(1, f);
          for (; o.isEven(); )
            o.rShiftTo(1, o), n ? ((!d.isEven() || !y.isEven()) && (d.addTo(this, d), y.subTo(t, y)), d.rShiftTo(1, d)) : y.isEven() || y.subTo(t, y), y.rShiftTo(1, y);
          r.compareTo(o) >= 0 ? (r.subTo(o, r), n && s.subTo(d, s), f.subTo(y, f)) : (o.subTo(r, o), n && d.subTo(s, d), y.subTo(f, y));
        }
        if (o.compareTo(h.ONE) != 0) return h.ZERO;
        if (y.compareTo(t) >= 0) return y.subtract(t);
        if (y.signum() < 0) y.addTo(t, y);
        else return y;
        return y.signum() < 0 ? y.add(t) : y;
      }
      var j = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], Lr = (1 << 26) / j[j.length - 1];
      function Or(t) {
        var n, r = this.abs();
        if (r.t == 1 && r[0] <= j[j.length - 1]) {
          for (n = 0; n < j.length; ++n)
            if (r[0] == j[n]) return !0;
          return !1;
        }
        if (r.isEven()) return !1;
        for (n = 1; n < j.length; ) {
          for (var o = j[n], s = n + 1; s < j.length && o < Lr; ) o *= j[s++];
          for (o = r.modInt(o); n < s; )
            if (o % j[n++] == 0) return !1;
        }
        return r.millerRabin(t);
      }
      function Er(t) {
        var n = this.subtract(h.ONE), r = n.getLowestSetBit();
        if (r <= 0) return !1;
        var o = n.shiftRight(r);
        t = t + 1 >> 1, t > j.length && (t = j.length);
        for (var s = m(), f = 0; f < t; ++f) {
          s.fromInt(j[Math.floor(Math.random() * j.length)]);
          var d = s.modPow(o, this);
          if (d.compareTo(h.ONE) != 0 && d.compareTo(n) != 0) {
            for (var y = 1; y++ < r && d.compareTo(n) != 0; )
              if (d = d.modPowInt(2, this), d.compareTo(h.ONE) == 0) return !1;
            if (d.compareTo(n) != 0) return !1;
          }
        }
        return !0;
      }
      h.prototype.chunkSize = bn, h.prototype.toRadix = Mn, h.prototype.fromRadix = Dn, h.prototype.fromNumber = Bn, h.prototype.bitwiseTo = kn, h.prototype.changeBit = tr, h.prototype.addTo = rr, h.prototype.dMultiply = pr, h.prototype.dAddOffset = cr, h.prototype.multiplyLowerTo = Pr, h.prototype.multiplyUpperTo = xr, h.prototype.modInt = Ar, h.prototype.millerRabin = Er, h.prototype.clone = Sn, h.prototype.intValue = Ln, h.prototype.byteValue = On, h.prototype.shortValue = En, h.prototype.signum = Nn, h.prototype.toByteArray = Xn, h.prototype.equals = Yn, h.prototype.min = Fn, h.prototype.max = Rn, h.prototype.and = Un, h.prototype.or = qn, h.prototype.xor = Hn, h.prototype.andNot = zn, h.prototype.not = Zn, h.prototype.shiftLeft = Gn, h.prototype.shiftRight = jn, h.prototype.getLowestSetBit = Jn, h.prototype.bitCount = Kn, h.prototype.testBit = Qn, h.prototype.setBit = er, h.prototype.clearBit = ir, h.prototype.flipBit = nr, h.prototype.add = or, h.prototype.subtract = sr, h.prototype.multiply = lr, h.prototype.divide = ur, h.prototype.remainder = fr, h.prototype.divideAndRemainder = hr, h.prototype.modPow = gr, h.prototype.modInverse = Sr, h.prototype.pow = yr, h.prototype.gcd = wr, h.prototype.isProbablePrime = Or, h.prototype.square = ar;
      var B = h;
      B.prototype.IsNegative = function() {
        return this.compareTo(B.ZERO) == -1;
      }, B.op_Equality = function(t, n) {
        return t.compareTo(n) == 0;
      }, B.op_Inequality = function(t, n) {
        return t.compareTo(n) != 0;
      }, B.op_GreaterThan = function(t, n) {
        return t.compareTo(n) > 0;
      }, B.op_LessThan = function(t, n) {
        return t.compareTo(n) < 0;
      }, B.op_Addition = function(t, n) {
        return new B(t, void 0, void 0).add(new B(n, void 0, void 0));
      }, B.op_Subtraction = function(t, n) {
        return new B(t, void 0, void 0).subtract(new B(n, void 0, void 0));
      }, B.Int128Mul = function(t, n) {
        return new B(t, void 0, void 0).multiply(new B(n, void 0, void 0));
      }, B.op_Division = function(t, n) {
        return t.divide(n);
      }, B.prototype.ToDouble = function() {
        return parseFloat(this.toString());
      };
      var Te = function(t, n) {
        var r;
        if (typeof Object.getOwnPropertyNames > "u") {
          for (r in n.prototype)
            (typeof t.prototype[r] > "u" || t.prototype[r] === Object.prototype[r]) && (t.prototype[r] = n.prototype[r]);
          for (r in n)
            typeof t[r] > "u" && (t[r] = n[r]);
          t.$baseCtor = n;
        } else {
          for (var o = Object.getOwnPropertyNames(n.prototype), s = 0; s < o.length; s++)
            typeof Object.getOwnPropertyDescriptor(t.prototype, o[s]) > "u" && Object.defineProperty(t.prototype, o[s], Object.getOwnPropertyDescriptor(n.prototype, o[s]));
          for (r in n)
            typeof t[r] > "u" && (t[r] = n[r]);
          t.$baseCtor = n;
        }
      };
      e.Path = function() {
        return [];
      }, e.Path.prototype.push = Array.prototype.push, e.Paths = function() {
        return [];
      }, e.Paths.prototype.push = Array.prototype.push, e.DoublePoint = function() {
        var t = arguments;
        this.X = 0, this.Y = 0, t.length === 1 ? (this.X = t[0].X, this.Y = t[0].Y) : t.length === 2 && (this.X = t[0], this.Y = t[1]);
      }, e.DoublePoint0 = function() {
        this.X = 0, this.Y = 0;
      }, e.DoublePoint0.prototype = e.DoublePoint.prototype, e.DoublePoint1 = function(t) {
        this.X = t.X, this.Y = t.Y;
      }, e.DoublePoint1.prototype = e.DoublePoint.prototype, e.DoublePoint2 = function(t, n) {
        this.X = t, this.Y = n;
      }, e.DoublePoint2.prototype = e.DoublePoint.prototype, e.PolyNode = function() {
        this.m_Parent = null, this.m_polygon = new e.Path(), this.m_Index = 0, this.m_jointype = 0, this.m_endtype = 0, this.m_Childs = [], this.IsOpen = !1;
      }, e.PolyNode.prototype.IsHoleNode = function() {
        for (var t = !0, n = this.m_Parent; n !== null; )
          t = !t, n = n.m_Parent;
        return t;
      }, e.PolyNode.prototype.ChildCount = function() {
        return this.m_Childs.length;
      }, e.PolyNode.prototype.Contour = function() {
        return this.m_polygon;
      }, e.PolyNode.prototype.AddChild = function(t) {
        var n = this.m_Childs.length;
        this.m_Childs.push(t), t.m_Parent = this, t.m_Index = n;
      }, e.PolyNode.prototype.GetNext = function() {
        return this.m_Childs.length > 0 ? this.m_Childs[0] : this.GetNextSiblingUp();
      }, e.PolyNode.prototype.GetNextSiblingUp = function() {
        return this.m_Parent === null ? null : this.m_Index === this.m_Parent.m_Childs.length - 1 ? this.m_Parent.GetNextSiblingUp() : this.m_Parent.m_Childs[this.m_Index + 1];
      }, e.PolyNode.prototype.Childs = function() {
        return this.m_Childs;
      }, e.PolyNode.prototype.Parent = function() {
        return this.m_Parent;
      }, e.PolyNode.prototype.IsHole = function() {
        return this.IsHoleNode();
      }, e.PolyTree = function() {
        this.m_AllPolys = [], e.PolyNode.call(this);
      }, e.PolyTree.prototype.Clear = function() {
        for (var t = 0, n = this.m_AllPolys.length; t < n; t++)
          this.m_AllPolys[t] = null;
        this.m_AllPolys.length = 0, this.m_Childs.length = 0;
      }, e.PolyTree.prototype.GetFirst = function() {
        return this.m_Childs.length > 0 ? this.m_Childs[0] : null;
      }, e.PolyTree.prototype.Total = function() {
        var t = this.m_AllPolys.length;
        return t > 0 && this.m_Childs[0] !== this.m_AllPolys[0] && t--, t;
      }, Te(e.PolyTree, e.PolyNode), e.Math_Abs_Int64 = e.Math_Abs_Int32 = e.Math_Abs_Double = function(t) {
        return Math.abs(t);
      }, e.Math_Max_Int32_Int32 = function(t, n) {
        return Math.max(t, n);
      }, c.msie || c.opera || c.safari ? e.Cast_Int32 = function(t) {
        return t | 0;
      } : e.Cast_Int32 = function(t) {
        return ~~t;
      }, typeof Number.toInteger > "u" && (Number.toInteger = null), c.chrome ? e.Cast_Int64 = function(t) {
        return t < -2147483648 || t > 2147483647 ? t < 0 ? Math.ceil(t) : Math.floor(t) : ~~t;
      } : c.firefox && typeof Number.toInteger == "function" ? e.Cast_Int64 = function(t) {
        return Number.toInteger(t);
      } : c.msie7 || c.msie8 ? e.Cast_Int64 = function(t) {
        return parseInt(t, 10);
      } : c.msie ? e.Cast_Int64 = function(t) {
        return t < -2147483648 || t > 2147483647 ? t < 0 ? Math.ceil(t) : Math.floor(t) : t | 0;
      } : e.Cast_Int64 = function(t) {
        return t < 0 ? Math.ceil(t) : Math.floor(t);
      }, e.Clear = function(t) {
        t.length = 0;
      }, e.PI = 3.141592653589793, e.PI2 = 2 * 3.141592653589793, e.IntPoint = function() {
        var t = arguments, n = t.length;
        if (this.X = 0, this.Y = 0, e.use_xyz)
          if (this.Z = 0, n === 3)
            this.X = t[0], this.Y = t[1], this.Z = t[2];
          else if (n === 2)
            this.X = t[0], this.Y = t[1], this.Z = 0;
          else if (n === 1)
            if (t[0] instanceof e.DoublePoint) {
              var r = t[0];
              this.X = e.Clipper.Round(r.X), this.Y = e.Clipper.Round(r.Y), this.Z = 0;
            } else {
              var o = t[0];
              typeof o.Z > "u" && (o.Z = 0), this.X = o.X, this.Y = o.Y, this.Z = o.Z;
            }
          else
            this.X = 0, this.Y = 0, this.Z = 0;
        else if (n === 2)
          this.X = t[0], this.Y = t[1];
        else if (n === 1)
          if (t[0] instanceof e.DoublePoint) {
            var r = t[0];
            this.X = e.Clipper.Round(r.X), this.Y = e.Clipper.Round(r.Y);
          } else {
            var o = t[0];
            this.X = o.X, this.Y = o.Y;
          }
        else
          this.X = 0, this.Y = 0;
      }, e.IntPoint.op_Equality = function(t, n) {
        return t.X === n.X && t.Y === n.Y;
      }, e.IntPoint.op_Inequality = function(t, n) {
        return t.X !== n.X || t.Y !== n.Y;
      }, e.IntPoint0 = function() {
        this.X = 0, this.Y = 0, e.use_xyz && (this.Z = 0);
      }, e.IntPoint0.prototype = e.IntPoint.prototype, e.IntPoint1 = function(t) {
        this.X = t.X, this.Y = t.Y, e.use_xyz && (typeof t.Z > "u" ? this.Z = 0 : this.Z = t.Z);
      }, e.IntPoint1.prototype = e.IntPoint.prototype, e.IntPoint1dp = function(t) {
        this.X = e.Clipper.Round(t.X), this.Y = e.Clipper.Round(t.Y), e.use_xyz && (this.Z = 0);
      }, e.IntPoint1dp.prototype = e.IntPoint.prototype, e.IntPoint2 = function(t, n, r) {
        this.X = t, this.Y = n, e.use_xyz && (typeof r > "u" ? this.Z = 0 : this.Z = r);
      }, e.IntPoint2.prototype = e.IntPoint.prototype, e.IntRect = function() {
        var t = arguments, n = t.length;
        if (n === 4)
          this.left = t[0], this.top = t[1], this.right = t[2], this.bottom = t[3];
        else if (n === 1) {
          var r = t[0];
          this.left = r.left, this.top = r.top, this.right = r.right, this.bottom = r.bottom;
        } else
          this.left = 0, this.top = 0, this.right = 0, this.bottom = 0;
      }, e.IntRect0 = function() {
        this.left = 0, this.top = 0, this.right = 0, this.bottom = 0;
      }, e.IntRect0.prototype = e.IntRect.prototype, e.IntRect1 = function(t) {
        this.left = t.left, this.top = t.top, this.right = t.right, this.bottom = t.bottom;
      }, e.IntRect1.prototype = e.IntRect.prototype, e.IntRect4 = function(t, n, r, o) {
        this.left = t, this.top = n, this.right = r, this.bottom = o;
      }, e.IntRect4.prototype = e.IntRect.prototype, e.ClipType = {
        ctIntersection: 0,
        ctUnion: 1,
        ctDifference: 2,
        ctXor: 3
      }, e.PolyType = {
        ptSubject: 0,
        ptClip: 1
      }, e.PolyFillType = {
        pftEvenOdd: 0,
        pftNonZero: 1,
        pftPositive: 2,
        pftNegative: 3
      }, e.JoinType = {
        jtSquare: 0,
        jtRound: 1,
        jtMiter: 2
      }, e.EndType = {
        etOpenSquare: 0,
        etOpenRound: 1,
        etOpenButt: 2,
        etClosedLine: 3,
        etClosedPolygon: 4
      }, e.EdgeSide = {
        esLeft: 0,
        esRight: 1
      }, e.Direction = {
        dRightToLeft: 0,
        dLeftToRight: 1
      }, e.TEdge = function() {
        this.Bot = new e.IntPoint0(), this.Curr = new e.IntPoint0(), this.Top = new e.IntPoint0(), this.Delta = new e.IntPoint0(), this.Dx = 0, this.PolyTyp = e.PolyType.ptSubject, this.Side = e.EdgeSide.esLeft, this.WindDelta = 0, this.WindCnt = 0, this.WindCnt2 = 0, this.OutIdx = 0, this.Next = null, this.Prev = null, this.NextInLML = null, this.NextInAEL = null, this.PrevInAEL = null, this.NextInSEL = null, this.PrevInSEL = null;
      }, e.IntersectNode = function() {
        this.Edge1 = null, this.Edge2 = null, this.Pt = new e.IntPoint0();
      }, e.MyIntersectNodeSort = function() {
      }, e.MyIntersectNodeSort.Compare = function(t, n) {
        var r = n.Pt.Y - t.Pt.Y;
        return r > 0 ? 1 : r < 0 ? -1 : 0;
      }, e.LocalMinima = function() {
        this.Y = 0, this.LeftBound = null, this.RightBound = null, this.Next = null;
      }, e.Scanbeam = function() {
        this.Y = 0, this.Next = null;
      }, e.Maxima = function() {
        this.X = 0, this.Next = null, this.Prev = null;
      }, e.OutRec = function() {
        this.Idx = 0, this.IsHole = !1, this.IsOpen = !1, this.FirstLeft = null, this.Pts = null, this.BottomPt = null, this.PolyNode = null;
      }, e.OutPt = function() {
        this.Idx = 0, this.Pt = new e.IntPoint0(), this.Next = null, this.Prev = null;
      }, e.Join = function() {
        this.OutPt1 = null, this.OutPt2 = null, this.OffPt = new e.IntPoint0();
      }, e.ClipperBase = function() {
        this.m_MinimaList = null, this.m_CurrentLM = null, this.m_edges = new Array(), this.m_UseFullRange = !1, this.m_HasOpenPaths = !1, this.PreserveCollinear = !1, this.m_Scanbeam = null, this.m_PolyOuts = null, this.m_ActiveEdges = null;
      }, e.ClipperBase.horizontal = -9007199254740992, e.ClipperBase.Skip = -2, e.ClipperBase.Unassigned = -1, e.ClipperBase.tolerance = 1e-20, e.ClipperBase.loRange = 47453132, e.ClipperBase.hiRange = 4503599627370495, e.ClipperBase.near_zero = function(t) {
        return t > -e.ClipperBase.tolerance && t < e.ClipperBase.tolerance;
      }, e.ClipperBase.IsHorizontal = function(t) {
        return t.Delta.Y === 0;
      }, e.ClipperBase.prototype.PointIsVertex = function(t, n) {
        var r = n;
        do {
          if (e.IntPoint.op_Equality(r.Pt, t))
            return !0;
          r = r.Next;
        } while (r !== n);
        return !1;
      }, e.ClipperBase.prototype.PointOnLineSegment = function(t, n, r, o) {
        return o ? t.X === n.X && t.Y === n.Y || t.X === r.X && t.Y === r.Y || t.X > n.X == t.X < r.X && t.Y > n.Y == t.Y < r.Y && B.op_Equality(
          B.Int128Mul(t.X - n.X, r.Y - n.Y),
          B.Int128Mul(r.X - n.X, t.Y - n.Y)
        ) : t.X === n.X && t.Y === n.Y || t.X === r.X && t.Y === r.Y || t.X > n.X == t.X < r.X && t.Y > n.Y == t.Y < r.Y && (t.X - n.X) * (r.Y - n.Y) === (r.X - n.X) * (t.Y - n.Y);
      }, e.ClipperBase.prototype.PointOnPolygon = function(t, n, r) {
        for (var o = n; ; ) {
          if (this.PointOnLineSegment(t, o.Pt, o.Next.Pt, r))
            return !0;
          if (o = o.Next, o === n)
            break;
        }
        return !1;
      }, e.ClipperBase.prototype.SlopesEqual = e.ClipperBase.SlopesEqual = function() {
        var t = arguments, n = t.length, r, o, s, f, d, y, P;
        return n === 3 ? (r = t[0], o = t[1], P = t[2], P ? B.op_Equality(B.Int128Mul(r.Delta.Y, o.Delta.X), B.Int128Mul(r.Delta.X, o.Delta.Y)) : e.Cast_Int64(r.Delta.Y * o.Delta.X) === e.Cast_Int64(r.Delta.X * o.Delta.Y)) : n === 4 ? (s = t[0], f = t[1], d = t[2], P = t[3], P ? B.op_Equality(B.Int128Mul(s.Y - f.Y, f.X - d.X), B.Int128Mul(s.X - f.X, f.Y - d.Y)) : e.Cast_Int64((s.Y - f.Y) * (f.X - d.X)) - e.Cast_Int64((s.X - f.X) * (f.Y - d.Y)) === 0) : (s = t[0], f = t[1], d = t[2], y = t[3], P = t[4], P ? B.op_Equality(B.Int128Mul(s.Y - f.Y, d.X - y.X), B.Int128Mul(s.X - f.X, d.Y - y.Y)) : e.Cast_Int64((s.Y - f.Y) * (d.X - y.X)) - e.Cast_Int64((s.X - f.X) * (d.Y - y.Y)) === 0);
      }, e.ClipperBase.SlopesEqual3 = function(t, n, r) {
        return r ? B.op_Equality(B.Int128Mul(t.Delta.Y, n.Delta.X), B.Int128Mul(t.Delta.X, n.Delta.Y)) : e.Cast_Int64(t.Delta.Y * n.Delta.X) === e.Cast_Int64(t.Delta.X * n.Delta.Y);
      }, e.ClipperBase.SlopesEqual4 = function(t, n, r, o) {
        return o ? B.op_Equality(B.Int128Mul(t.Y - n.Y, n.X - r.X), B.Int128Mul(t.X - n.X, n.Y - r.Y)) : e.Cast_Int64((t.Y - n.Y) * (n.X - r.X)) - e.Cast_Int64((t.X - n.X) * (n.Y - r.Y)) === 0;
      }, e.ClipperBase.SlopesEqual5 = function(t, n, r, o, s) {
        return s ? B.op_Equality(B.Int128Mul(t.Y - n.Y, r.X - o.X), B.Int128Mul(t.X - n.X, r.Y - o.Y)) : e.Cast_Int64((t.Y - n.Y) * (r.X - o.X)) - e.Cast_Int64((t.X - n.X) * (r.Y - o.Y)) === 0;
      }, e.ClipperBase.prototype.Clear = function() {
        this.DisposeLocalMinimaList();
        for (var t = 0, n = this.m_edges.length; t < n; ++t) {
          for (var r = 0, o = this.m_edges[t].length; r < o; ++r)
            this.m_edges[t][r] = null;
          e.Clear(this.m_edges[t]);
        }
        e.Clear(this.m_edges), this.m_UseFullRange = !1, this.m_HasOpenPaths = !1;
      }, e.ClipperBase.prototype.DisposeLocalMinimaList = function() {
        for (; this.m_MinimaList !== null; ) {
          var t = this.m_MinimaList.Next;
          this.m_MinimaList = null, this.m_MinimaList = t;
        }
        this.m_CurrentLM = null;
      }, e.ClipperBase.prototype.RangeTest = function(t, n) {
        n.Value ? (t.X > e.ClipperBase.hiRange || t.Y > e.ClipperBase.hiRange || -t.X > e.ClipperBase.hiRange || -t.Y > e.ClipperBase.hiRange) && e.Error("Coordinate outside allowed range in RangeTest().") : (t.X > e.ClipperBase.loRange || t.Y > e.ClipperBase.loRange || -t.X > e.ClipperBase.loRange || -t.Y > e.ClipperBase.loRange) && (n.Value = !0, this.RangeTest(t, n));
      }, e.ClipperBase.prototype.InitEdge = function(t, n, r, o) {
        t.Next = n, t.Prev = r, t.Curr.X = o.X, t.Curr.Y = o.Y, e.use_xyz && (t.Curr.Z = o.Z), t.OutIdx = -1;
      }, e.ClipperBase.prototype.InitEdge2 = function(t, n) {
        t.Curr.Y >= t.Next.Curr.Y ? (t.Bot.X = t.Curr.X, t.Bot.Y = t.Curr.Y, e.use_xyz && (t.Bot.Z = t.Curr.Z), t.Top.X = t.Next.Curr.X, t.Top.Y = t.Next.Curr.Y, e.use_xyz && (t.Top.Z = t.Next.Curr.Z)) : (t.Top.X = t.Curr.X, t.Top.Y = t.Curr.Y, e.use_xyz && (t.Top.Z = t.Curr.Z), t.Bot.X = t.Next.Curr.X, t.Bot.Y = t.Next.Curr.Y, e.use_xyz && (t.Bot.Z = t.Next.Curr.Z)), this.SetDx(t), t.PolyTyp = n;
      }, e.ClipperBase.prototype.FindNextLocMin = function(t) {
        for (var n; ; ) {
          for (; e.IntPoint.op_Inequality(t.Bot, t.Prev.Bot) || e.IntPoint.op_Equality(t.Curr, t.Top); )
            t = t.Next;
          if (t.Dx !== e.ClipperBase.horizontal && t.Prev.Dx !== e.ClipperBase.horizontal)
            break;
          for (; t.Prev.Dx === e.ClipperBase.horizontal; )
            t = t.Prev;
          for (n = t; t.Dx === e.ClipperBase.horizontal; )
            t = t.Next;
          if (t.Top.Y !== t.Prev.Bot.Y) {
            n.Prev.Bot.X < t.Bot.X && (t = n);
            break;
          }
        }
        return t;
      }, e.ClipperBase.prototype.ProcessBound = function(t, n) {
        var r, o = t, s;
        if (o.OutIdx === e.ClipperBase.Skip) {
          if (t = o, n) {
            for (; t.Top.Y === t.Next.Bot.Y; ) t = t.Next;
            for (; t !== o && t.Dx === e.ClipperBase.horizontal; ) t = t.Prev;
          } else {
            for (; t.Top.Y === t.Prev.Bot.Y; ) t = t.Prev;
            for (; t !== o && t.Dx === e.ClipperBase.horizontal; ) t = t.Next;
          }
          if (t === o)
            n ? o = t.Next : o = t.Prev;
          else {
            n ? t = o.Next : t = o.Prev;
            var f = new e.LocalMinima();
            f.Next = null, f.Y = t.Bot.Y, f.LeftBound = null, f.RightBound = t, t.WindDelta = 0, o = this.ProcessBound(t, n), this.InsertLocalMinima(f);
          }
          return o;
        }
        if (t.Dx === e.ClipperBase.horizontal && (n ? r = t.Prev : r = t.Next, r.Dx === e.ClipperBase.horizontal ? r.Bot.X !== t.Bot.X && r.Top.X !== t.Bot.X && this.ReverseHorizontal(t) : r.Bot.X !== t.Bot.X && this.ReverseHorizontal(t)), r = t, n) {
          for (; o.Top.Y === o.Next.Bot.Y && o.Next.OutIdx !== e.ClipperBase.Skip; )
            o = o.Next;
          if (o.Dx === e.ClipperBase.horizontal && o.Next.OutIdx !== e.ClipperBase.Skip) {
            for (s = o; s.Prev.Dx === e.ClipperBase.horizontal; )
              s = s.Prev;
            s.Prev.Top.X > o.Next.Top.X && (o = s.Prev);
          }
          for (; t !== o; )
            t.NextInLML = t.Next, t.Dx === e.ClipperBase.horizontal && t !== r && t.Bot.X !== t.Prev.Top.X && this.ReverseHorizontal(t), t = t.Next;
          t.Dx === e.ClipperBase.horizontal && t !== r && t.Bot.X !== t.Prev.Top.X && this.ReverseHorizontal(t), o = o.Next;
        } else {
          for (; o.Top.Y === o.Prev.Bot.Y && o.Prev.OutIdx !== e.ClipperBase.Skip; )
            o = o.Prev;
          if (o.Dx === e.ClipperBase.horizontal && o.Prev.OutIdx !== e.ClipperBase.Skip) {
            for (s = o; s.Next.Dx === e.ClipperBase.horizontal; )
              s = s.Next;
            (s.Next.Top.X === o.Prev.Top.X || s.Next.Top.X > o.Prev.Top.X) && (o = s.Next);
          }
          for (; t !== o; )
            t.NextInLML = t.Prev, t.Dx === e.ClipperBase.horizontal && t !== r && t.Bot.X !== t.Next.Top.X && this.ReverseHorizontal(t), t = t.Prev;
          t.Dx === e.ClipperBase.horizontal && t !== r && t.Bot.X !== t.Next.Top.X && this.ReverseHorizontal(t), o = o.Prev;
        }
        return o;
      }, e.ClipperBase.prototype.AddPath = function(t, n, r) {
        e.use_lines ? !r && n === e.PolyType.ptClip && e.Error("AddPath: Open paths must be subject.") : r || e.Error("AddPath: Open paths have been disabled.");
        var o = t.length - 1;
        if (r)
          for (; o > 0 && e.IntPoint.op_Equality(t[o], t[0]); )
            --o;
        for (; o > 0 && e.IntPoint.op_Equality(t[o], t[o - 1]); )
          --o;
        if (r && o < 2 || !r && o < 1)
          return !1;
        for (var s = new Array(), f = 0; f <= o; f++)
          s.push(new e.TEdge());
        var d = !0;
        s[1].Curr.X = t[1].X, s[1].Curr.Y = t[1].Y, e.use_xyz && (s[1].Curr.Z = t[1].Z);
        var y = {
          Value: this.m_UseFullRange
        };
        this.RangeTest(t[0], y), this.m_UseFullRange = y.Value, y.Value = this.m_UseFullRange, this.RangeTest(t[o], y), this.m_UseFullRange = y.Value, this.InitEdge(s[0], s[1], s[o], t[0]), this.InitEdge(s[o], s[0], s[o - 1], t[o]);
        for (var f = o - 1; f >= 1; --f)
          y.Value = this.m_UseFullRange, this.RangeTest(t[f], y), this.m_UseFullRange = y.Value, this.InitEdge(s[f], s[f + 1], s[f - 1], t[f]);
        for (var P = s[0], v = P, w = P; ; ) {
          if (v.Curr === v.Next.Curr && (r || v.Next !== P)) {
            if (v === v.Next)
              break;
            v === P && (P = v.Next), v = this.RemoveEdge(v), w = v;
            continue;
          }
          if (v.Prev === v.Next)
            break;
          if (r && e.ClipperBase.SlopesEqual4(v.Prev.Curr, v.Curr, v.Next.Curr, this.m_UseFullRange) && (!this.PreserveCollinear || !this.Pt2IsBetweenPt1AndPt3(v.Prev.Curr, v.Curr, v.Next.Curr))) {
            v === P && (P = v.Next), v = this.RemoveEdge(v), v = v.Prev, w = v;
            continue;
          }
          if (v = v.Next, v === w || !r && v.Next === P) break;
        }
        if (!r && v === v.Next || r && v.Prev === v.Next)
          return !1;
        r || (this.m_HasOpenPaths = !0, P.Prev.OutIdx = e.ClipperBase.Skip), v = P;
        do
          this.InitEdge2(v, n), v = v.Next, d && v.Curr.Y !== P.Curr.Y && (d = !1);
        while (v !== P);
        if (d) {
          if (r)
            return !1;
          v.Prev.OutIdx = e.ClipperBase.Skip;
          var I = new e.LocalMinima();
          for (I.Next = null, I.Y = v.Bot.Y, I.LeftBound = null, I.RightBound = v, I.RightBound.Side = e.EdgeSide.esRight, I.RightBound.WindDelta = 0; v.Bot.X !== v.Prev.Top.X && this.ReverseHorizontal(v), v.Next.OutIdx !== e.ClipperBase.Skip; )
            v.NextInLML = v.Next, v = v.Next;
          return this.InsertLocalMinima(I), this.m_edges.push(s), !0;
        }
        this.m_edges.push(s);
        var S, M = null;
        for (e.IntPoint.op_Equality(v.Prev.Bot, v.Prev.Top) && (v = v.Next); v = this.FindNextLocMin(v), v !== M; ) {
          M === null && (M = v);
          var I = new e.LocalMinima();
          I.Next = null, I.Y = v.Bot.Y, v.Dx < v.Prev.Dx ? (I.LeftBound = v.Prev, I.RightBound = v, S = !1) : (I.LeftBound = v, I.RightBound = v.Prev, S = !0), I.LeftBound.Side = e.EdgeSide.esLeft, I.RightBound.Side = e.EdgeSide.esRight, r ? I.LeftBound.Next === I.RightBound ? I.LeftBound.WindDelta = -1 : I.LeftBound.WindDelta = 1 : I.LeftBound.WindDelta = 0, I.RightBound.WindDelta = -I.LeftBound.WindDelta, v = this.ProcessBound(I.LeftBound, S), v.OutIdx === e.ClipperBase.Skip && (v = this.ProcessBound(v, S));
          var X = this.ProcessBound(I.RightBound, !S);
          X.OutIdx === e.ClipperBase.Skip && (X = this.ProcessBound(X, !S)), I.LeftBound.OutIdx === e.ClipperBase.Skip ? I.LeftBound = null : I.RightBound.OutIdx === e.ClipperBase.Skip && (I.RightBound = null), this.InsertLocalMinima(I), S || (v = X);
        }
        return !0;
      }, e.ClipperBase.prototype.AddPaths = function(t, n, r) {
        for (var o = !1, s = 0, f = t.length; s < f; ++s)
          this.AddPath(t[s], n, r) && (o = !0);
        return o;
      }, e.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3 = function(t, n, r) {
        return e.IntPoint.op_Equality(t, r) || e.IntPoint.op_Equality(t, n) || e.IntPoint.op_Equality(r, n) ? !1 : t.X !== r.X ? n.X > t.X == n.X < r.X : n.Y > t.Y == n.Y < r.Y;
      }, e.ClipperBase.prototype.RemoveEdge = function(t) {
        t.Prev.Next = t.Next, t.Next.Prev = t.Prev;
        var n = t.Next;
        return t.Prev = null, n;
      }, e.ClipperBase.prototype.SetDx = function(t) {
        t.Delta.X = t.Top.X - t.Bot.X, t.Delta.Y = t.Top.Y - t.Bot.Y, t.Delta.Y === 0 ? t.Dx = e.ClipperBase.horizontal : t.Dx = t.Delta.X / t.Delta.Y;
      }, e.ClipperBase.prototype.InsertLocalMinima = function(t) {
        if (this.m_MinimaList === null)
          this.m_MinimaList = t;
        else if (t.Y >= this.m_MinimaList.Y)
          t.Next = this.m_MinimaList, this.m_MinimaList = t;
        else {
          for (var n = this.m_MinimaList; n.Next !== null && t.Y < n.Next.Y; )
            n = n.Next;
          t.Next = n.Next, n.Next = t;
        }
      }, e.ClipperBase.prototype.PopLocalMinima = function(t, n) {
        return n.v = this.m_CurrentLM, this.m_CurrentLM !== null && this.m_CurrentLM.Y === t ? (this.m_CurrentLM = this.m_CurrentLM.Next, !0) : !1;
      }, e.ClipperBase.prototype.ReverseHorizontal = function(t) {
        var n = t.Top.X;
        t.Top.X = t.Bot.X, t.Bot.X = n, e.use_xyz && (n = t.Top.Z, t.Top.Z = t.Bot.Z, t.Bot.Z = n);
      }, e.ClipperBase.prototype.Reset = function() {
        if (this.m_CurrentLM = this.m_MinimaList, this.m_CurrentLM !== null) {
          this.m_Scanbeam = null;
          for (var t = this.m_MinimaList; t !== null; ) {
            this.InsertScanbeam(t.Y);
            var n = t.LeftBound;
            n !== null && (n.Curr.X = n.Bot.X, n.Curr.Y = n.Bot.Y, e.use_xyz && (n.Curr.Z = n.Bot.Z), n.OutIdx = e.ClipperBase.Unassigned), n = t.RightBound, n !== null && (n.Curr.X = n.Bot.X, n.Curr.Y = n.Bot.Y, e.use_xyz && (n.Curr.Z = n.Bot.Z), n.OutIdx = e.ClipperBase.Unassigned), t = t.Next;
          }
          this.m_ActiveEdges = null;
        }
      }, e.ClipperBase.prototype.InsertScanbeam = function(t) {
        if (this.m_Scanbeam === null)
          this.m_Scanbeam = new e.Scanbeam(), this.m_Scanbeam.Next = null, this.m_Scanbeam.Y = t;
        else if (t > this.m_Scanbeam.Y) {
          var n = new e.Scanbeam();
          n.Y = t, n.Next = this.m_Scanbeam, this.m_Scanbeam = n;
        } else {
          for (var r = this.m_Scanbeam; r.Next !== null && t <= r.Next.Y; )
            r = r.Next;
          if (t === r.Y)
            return;
          var o = new e.Scanbeam();
          o.Y = t, o.Next = r.Next, r.Next = o;
        }
      }, e.ClipperBase.prototype.PopScanbeam = function(t) {
        return this.m_Scanbeam === null ? (t.v = 0, !1) : (t.v = this.m_Scanbeam.Y, this.m_Scanbeam = this.m_Scanbeam.Next, !0);
      }, e.ClipperBase.prototype.LocalMinimaPending = function() {
        return this.m_CurrentLM !== null;
      }, e.ClipperBase.prototype.CreateOutRec = function() {
        var t = new e.OutRec();
        return t.Idx = e.ClipperBase.Unassigned, t.IsHole = !1, t.IsOpen = !1, t.FirstLeft = null, t.Pts = null, t.BottomPt = null, t.PolyNode = null, this.m_PolyOuts.push(t), t.Idx = this.m_PolyOuts.length - 1, t;
      }, e.ClipperBase.prototype.DisposeOutRec = function(t) {
        var n = this.m_PolyOuts[t];
        n.Pts = null, n = null, this.m_PolyOuts[t] = null;
      }, e.ClipperBase.prototype.UpdateEdgeIntoAEL = function(t) {
        t.NextInLML === null && e.Error("UpdateEdgeIntoAEL: invalid call");
        var n = t.PrevInAEL, r = t.NextInAEL;
        return t.NextInLML.OutIdx = t.OutIdx, n !== null ? n.NextInAEL = t.NextInLML : this.m_ActiveEdges = t.NextInLML, r !== null && (r.PrevInAEL = t.NextInLML), t.NextInLML.Side = t.Side, t.NextInLML.WindDelta = t.WindDelta, t.NextInLML.WindCnt = t.WindCnt, t.NextInLML.WindCnt2 = t.WindCnt2, t = t.NextInLML, t.Curr.X = t.Bot.X, t.Curr.Y = t.Bot.Y, t.PrevInAEL = n, t.NextInAEL = r, e.ClipperBase.IsHorizontal(t) || this.InsertScanbeam(t.Top.Y), t;
      }, e.ClipperBase.prototype.SwapPositionsInAEL = function(t, n) {
        if (!(t.NextInAEL === t.PrevInAEL || n.NextInAEL === n.PrevInAEL)) {
          if (t.NextInAEL === n) {
            var r = n.NextInAEL;
            r !== null && (r.PrevInAEL = t);
            var o = t.PrevInAEL;
            o !== null && (o.NextInAEL = n), n.PrevInAEL = o, n.NextInAEL = t, t.PrevInAEL = n, t.NextInAEL = r;
          } else if (n.NextInAEL === t) {
            var s = t.NextInAEL;
            s !== null && (s.PrevInAEL = n);
            var f = n.PrevInAEL;
            f !== null && (f.NextInAEL = t), t.PrevInAEL = f, t.NextInAEL = n, n.PrevInAEL = t, n.NextInAEL = s;
          } else {
            var d = t.NextInAEL, y = t.PrevInAEL;
            t.NextInAEL = n.NextInAEL, t.NextInAEL !== null && (t.NextInAEL.PrevInAEL = t), t.PrevInAEL = n.PrevInAEL, t.PrevInAEL !== null && (t.PrevInAEL.NextInAEL = t), n.NextInAEL = d, n.NextInAEL !== null && (n.NextInAEL.PrevInAEL = n), n.PrevInAEL = y, n.PrevInAEL !== null && (n.PrevInAEL.NextInAEL = n);
          }
          t.PrevInAEL === null ? this.m_ActiveEdges = t : n.PrevInAEL === null && (this.m_ActiveEdges = n);
        }
      }, e.ClipperBase.prototype.DeleteFromAEL = function(t) {
        var n = t.PrevInAEL, r = t.NextInAEL;
        n === null && r === null && t !== this.m_ActiveEdges || (n !== null ? n.NextInAEL = r : this.m_ActiveEdges = r, r !== null && (r.PrevInAEL = n), t.NextInAEL = null, t.PrevInAEL = null);
      }, e.Clipper = function(t) {
        typeof t > "u" && (t = 0), this.m_PolyOuts = null, this.m_ClipType = e.ClipType.ctIntersection, this.m_Scanbeam = null, this.m_Maxima = null, this.m_ActiveEdges = null, this.m_SortedEdges = null, this.m_IntersectList = null, this.m_IntersectNodeComparer = null, this.m_ExecuteLocked = !1, this.m_ClipFillType = e.PolyFillType.pftEvenOdd, this.m_SubjFillType = e.PolyFillType.pftEvenOdd, this.m_Joins = null, this.m_GhostJoins = null, this.m_UsingPolyTree = !1, this.ReverseSolution = !1, this.StrictlySimple = !1, e.ClipperBase.call(this), this.m_Scanbeam = null, this.m_Maxima = null, this.m_ActiveEdges = null, this.m_SortedEdges = null, this.m_IntersectList = new Array(), this.m_IntersectNodeComparer = e.MyIntersectNodeSort.Compare, this.m_ExecuteLocked = !1, this.m_UsingPolyTree = !1, this.m_PolyOuts = new Array(), this.m_Joins = new Array(), this.m_GhostJoins = new Array(), this.ReverseSolution = (1 & t) !== 0, this.StrictlySimple = (2 & t) !== 0, this.PreserveCollinear = (4 & t) !== 0, e.use_xyz && (this.ZFillFunction = null);
      }, e.Clipper.ioReverseSolution = 1, e.Clipper.ioStrictlySimple = 2, e.Clipper.ioPreserveCollinear = 4, e.Clipper.prototype.Clear = function() {
        this.m_edges.length !== 0 && (this.DisposeAllPolyPts(), e.ClipperBase.prototype.Clear.call(this));
      }, e.Clipper.prototype.InsertMaxima = function(t) {
        var n = new e.Maxima();
        if (n.X = t, this.m_Maxima === null)
          this.m_Maxima = n, this.m_Maxima.Next = null, this.m_Maxima.Prev = null;
        else if (t < this.m_Maxima.X)
          n.Next = this.m_Maxima, n.Prev = null, this.m_Maxima = n;
        else {
          for (var r = this.m_Maxima; r.Next !== null && t >= r.Next.X; )
            r = r.Next;
          if (t === r.X)
            return;
          n.Next = r.Next, n.Prev = r, r.Next !== null && (r.Next.Prev = n), r.Next = n;
        }
      }, e.Clipper.prototype.Execute = function() {
        var t = arguments, n = t.length, r = t[1] instanceof e.PolyTree;
        if (n === 4 && !r) {
          var o = t[0], s = t[1], f = t[2], d = t[3];
          if (this.m_ExecuteLocked)
            return !1;
          this.m_HasOpenPaths && e.Error("Error: PolyTree struct is needed for open path clipping."), this.m_ExecuteLocked = !0, e.Clear(s), this.m_SubjFillType = f, this.m_ClipFillType = d, this.m_ClipType = o, this.m_UsingPolyTree = !1;
          try {
            var y = this.ExecuteInternal();
            y && this.BuildResult(s);
          } finally {
            this.DisposeAllPolyPts(), this.m_ExecuteLocked = !1;
          }
          return y;
        } else if (n === 4 && r) {
          var o = t[0], P = t[1], f = t[2], d = t[3];
          if (this.m_ExecuteLocked)
            return !1;
          this.m_ExecuteLocked = !0, this.m_SubjFillType = f, this.m_ClipFillType = d, this.m_ClipType = o, this.m_UsingPolyTree = !0;
          try {
            var y = this.ExecuteInternal();
            y && this.BuildResult2(P);
          } finally {
            this.DisposeAllPolyPts(), this.m_ExecuteLocked = !1;
          }
          return y;
        } else if (n === 2 && !r) {
          var o = t[0], s = t[1];
          return this.Execute(o, s, e.PolyFillType.pftEvenOdd, e.PolyFillType.pftEvenOdd);
        } else if (n === 2 && r) {
          var o = t[0], P = t[1];
          return this.Execute(o, P, e.PolyFillType.pftEvenOdd, e.PolyFillType.pftEvenOdd);
        }
      }, e.Clipper.prototype.FixHoleLinkage = function(t) {
        if (!(t.FirstLeft === null || t.IsHole !== t.FirstLeft.IsHole && t.FirstLeft.Pts !== null)) {
          for (var n = t.FirstLeft; n !== null && (n.IsHole === t.IsHole || n.Pts === null); )
            n = n.FirstLeft;
          t.FirstLeft = n;
        }
      }, e.Clipper.prototype.ExecuteInternal = function() {
        try {
          this.Reset(), this.m_SortedEdges = null, this.m_Maxima = null;
          var t = {}, n = {};
          if (!this.PopScanbeam(t))
            return !1;
          for (this.InsertLocalMinimaIntoAEL(t.v); this.PopScanbeam(n) || this.LocalMinimaPending(); ) {
            if (this.ProcessHorizontals(), this.m_GhostJoins.length = 0, !this.ProcessIntersections(n.v))
              return !1;
            this.ProcessEdgesAtTopOfScanbeam(n.v), t.v = n.v, this.InsertLocalMinimaIntoAEL(t.v);
          }
          var r, o, s;
          for (o = 0, s = this.m_PolyOuts.length; o < s; o++)
            r = this.m_PolyOuts[o], !(r.Pts === null || r.IsOpen) && (r.IsHole ^ this.ReverseSolution) == this.Area$1(r) > 0 && this.ReversePolyPtLinks(r.Pts);
          for (this.JoinCommonEdges(), o = 0, s = this.m_PolyOuts.length; o < s; o++)
            r = this.m_PolyOuts[o], r.Pts !== null && (r.IsOpen ? this.FixupOutPolyline(r) : this.FixupOutPolygon(r));
          return this.StrictlySimple && this.DoSimplePolygons(), !0;
        } finally {
          this.m_Joins.length = 0, this.m_GhostJoins.length = 0;
        }
      }, e.Clipper.prototype.DisposeAllPolyPts = function() {
        for (var t = 0, n = this.m_PolyOuts.length; t < n; ++t)
          this.DisposeOutRec(t);
        e.Clear(this.m_PolyOuts);
      }, e.Clipper.prototype.AddJoin = function(t, n, r) {
        var o = new e.Join();
        o.OutPt1 = t, o.OutPt2 = n, o.OffPt.X = r.X, o.OffPt.Y = r.Y, e.use_xyz && (o.OffPt.Z = r.Z), this.m_Joins.push(o);
      }, e.Clipper.prototype.AddGhostJoin = function(t, n) {
        var r = new e.Join();
        r.OutPt1 = t, r.OffPt.X = n.X, r.OffPt.Y = n.Y, e.use_xyz && (r.OffPt.Z = n.Z), this.m_GhostJoins.push(r);
      }, e.Clipper.prototype.SetZ = function(t, n, r) {
        if (this.ZFillFunction !== null) {
          if (t.Z !== 0 || this.ZFillFunction === null) return;
          e.IntPoint.op_Equality(t, n.Bot) ? t.Z = n.Bot.Z : e.IntPoint.op_Equality(t, n.Top) ? t.Z = n.Top.Z : e.IntPoint.op_Equality(t, r.Bot) ? t.Z = r.Bot.Z : e.IntPoint.op_Equality(t, r.Top) ? t.Z = r.Top.Z : this.ZFillFunction(n.Bot, n.Top, r.Bot, r.Top, t);
        }
      }, e.Clipper.prototype.InsertLocalMinimaIntoAEL = function(t) {
        for (var n = {}, r, o; this.PopLocalMinima(t, n); ) {
          r = n.v.LeftBound, o = n.v.RightBound;
          var s = null;
          if (r === null ? (this.InsertEdgeIntoAEL(o, null), this.SetWindingCount(o), this.IsContributing(o) && (s = this.AddOutPt(o, o.Bot))) : o === null ? (this.InsertEdgeIntoAEL(r, null), this.SetWindingCount(r), this.IsContributing(r) && (s = this.AddOutPt(r, r.Bot)), this.InsertScanbeam(r.Top.Y)) : (this.InsertEdgeIntoAEL(r, null), this.InsertEdgeIntoAEL(o, r), this.SetWindingCount(r), o.WindCnt = r.WindCnt, o.WindCnt2 = r.WindCnt2, this.IsContributing(r) && (s = this.AddLocalMinPoly(r, o, r.Bot)), this.InsertScanbeam(r.Top.Y)), o !== null && (e.ClipperBase.IsHorizontal(o) ? (o.NextInLML !== null && this.InsertScanbeam(o.NextInLML.Top.Y), this.AddEdgeToSEL(o)) : this.InsertScanbeam(o.Top.Y)), !(r === null || o === null)) {
            if (s !== null && e.ClipperBase.IsHorizontal(o) && this.m_GhostJoins.length > 0 && o.WindDelta !== 0)
              for (var f = 0, d = this.m_GhostJoins.length; f < d; f++) {
                var y = this.m_GhostJoins[f];
                this.HorzSegmentsOverlap(y.OutPt1.Pt.X, y.OffPt.X, o.Bot.X, o.Top.X) && this.AddJoin(y.OutPt1, s, y.OffPt);
              }
            if (r.OutIdx >= 0 && r.PrevInAEL !== null && r.PrevInAEL.Curr.X === r.Bot.X && r.PrevInAEL.OutIdx >= 0 && e.ClipperBase.SlopesEqual5(r.PrevInAEL.Curr, r.PrevInAEL.Top, r.Curr, r.Top, this.m_UseFullRange) && r.WindDelta !== 0 && r.PrevInAEL.WindDelta !== 0) {
              var P = this.AddOutPt(r.PrevInAEL, r.Bot);
              this.AddJoin(s, P, r.Top);
            }
            if (r.NextInAEL !== o) {
              if (o.OutIdx >= 0 && o.PrevInAEL.OutIdx >= 0 && e.ClipperBase.SlopesEqual5(o.PrevInAEL.Curr, o.PrevInAEL.Top, o.Curr, o.Top, this.m_UseFullRange) && o.WindDelta !== 0 && o.PrevInAEL.WindDelta !== 0) {
                var P = this.AddOutPt(o.PrevInAEL, o.Bot);
                this.AddJoin(s, P, o.Top);
              }
              var v = r.NextInAEL;
              if (v !== null)
                for (; v !== o; )
                  this.IntersectEdges(o, v, r.Curr), v = v.NextInAEL;
            }
          }
        }
      }, e.Clipper.prototype.InsertEdgeIntoAEL = function(t, n) {
        if (this.m_ActiveEdges === null)
          t.PrevInAEL = null, t.NextInAEL = null, this.m_ActiveEdges = t;
        else if (n === null && this.E2InsertsBeforeE1(this.m_ActiveEdges, t))
          t.PrevInAEL = null, t.NextInAEL = this.m_ActiveEdges, this.m_ActiveEdges.PrevInAEL = t, this.m_ActiveEdges = t;
        else {
          for (n === null && (n = this.m_ActiveEdges); n.NextInAEL !== null && !this.E2InsertsBeforeE1(n.NextInAEL, t); )
            n = n.NextInAEL;
          t.NextInAEL = n.NextInAEL, n.NextInAEL !== null && (n.NextInAEL.PrevInAEL = t), t.PrevInAEL = n, n.NextInAEL = t;
        }
      }, e.Clipper.prototype.E2InsertsBeforeE1 = function(t, n) {
        return n.Curr.X === t.Curr.X ? n.Top.Y > t.Top.Y ? n.Top.X < e.Clipper.TopX(t, n.Top.Y) : t.Top.X > e.Clipper.TopX(n, t.Top.Y) : n.Curr.X < t.Curr.X;
      }, e.Clipper.prototype.IsEvenOddFillType = function(t) {
        return t.PolyTyp === e.PolyType.ptSubject ? this.m_SubjFillType === e.PolyFillType.pftEvenOdd : this.m_ClipFillType === e.PolyFillType.pftEvenOdd;
      }, e.Clipper.prototype.IsEvenOddAltFillType = function(t) {
        return t.PolyTyp === e.PolyType.ptSubject ? this.m_ClipFillType === e.PolyFillType.pftEvenOdd : this.m_SubjFillType === e.PolyFillType.pftEvenOdd;
      }, e.Clipper.prototype.IsContributing = function(t) {
        var n, r;
        switch (t.PolyTyp === e.PolyType.ptSubject ? (n = this.m_SubjFillType, r = this.m_ClipFillType) : (n = this.m_ClipFillType, r = this.m_SubjFillType), n) {
          case e.PolyFillType.pftEvenOdd:
            if (t.WindDelta === 0 && t.WindCnt !== 1)
              return !1;
            break;
          case e.PolyFillType.pftNonZero:
            if (Math.abs(t.WindCnt) !== 1)
              return !1;
            break;
          case e.PolyFillType.pftPositive:
            if (t.WindCnt !== 1)
              return !1;
            break;
          default:
            if (t.WindCnt !== -1)
              return !1;
            break;
        }
        switch (this.m_ClipType) {
          case e.ClipType.ctIntersection:
            switch (r) {
              case e.PolyFillType.pftEvenOdd:
              case e.PolyFillType.pftNonZero:
                return t.WindCnt2 !== 0;
              case e.PolyFillType.pftPositive:
                return t.WindCnt2 > 0;
              default:
                return t.WindCnt2 < 0;
            }
          case e.ClipType.ctUnion:
            switch (r) {
              case e.PolyFillType.pftEvenOdd:
              case e.PolyFillType.pftNonZero:
                return t.WindCnt2 === 0;
              case e.PolyFillType.pftPositive:
                return t.WindCnt2 <= 0;
              default:
                return t.WindCnt2 >= 0;
            }
          case e.ClipType.ctDifference:
            if (t.PolyTyp === e.PolyType.ptSubject)
              switch (r) {
                case e.PolyFillType.pftEvenOdd:
                case e.PolyFillType.pftNonZero:
                  return t.WindCnt2 === 0;
                case e.PolyFillType.pftPositive:
                  return t.WindCnt2 <= 0;
                default:
                  return t.WindCnt2 >= 0;
              }
            else
              switch (r) {
                case e.PolyFillType.pftEvenOdd:
                case e.PolyFillType.pftNonZero:
                  return t.WindCnt2 !== 0;
                case e.PolyFillType.pftPositive:
                  return t.WindCnt2 > 0;
                default:
                  return t.WindCnt2 < 0;
              }
          case e.ClipType.ctXor:
            if (t.WindDelta === 0)
              switch (r) {
                case e.PolyFillType.pftEvenOdd:
                case e.PolyFillType.pftNonZero:
                  return t.WindCnt2 === 0;
                case e.PolyFillType.pftPositive:
                  return t.WindCnt2 <= 0;
                default:
                  return t.WindCnt2 >= 0;
              }
            else
              return !0;
        }
        return !0;
      }, e.Clipper.prototype.SetWindingCount = function(t) {
        for (var n = t.PrevInAEL; n !== null && (n.PolyTyp !== t.PolyTyp || n.WindDelta === 0); )
          n = n.PrevInAEL;
        if (n === null) {
          var r = t.PolyTyp === e.PolyType.ptSubject ? this.m_SubjFillType : this.m_ClipFillType;
          t.WindDelta === 0 ? t.WindCnt = r === e.PolyFillType.pftNegative ? -1 : 1 : t.WindCnt = t.WindDelta, t.WindCnt2 = 0, n = this.m_ActiveEdges;
        } else if (t.WindDelta === 0 && this.m_ClipType !== e.ClipType.ctUnion)
          t.WindCnt = 1, t.WindCnt2 = n.WindCnt2, n = n.NextInAEL;
        else if (this.IsEvenOddFillType(t)) {
          if (t.WindDelta === 0) {
            for (var o = !0, s = n.PrevInAEL; s !== null; )
              s.PolyTyp === n.PolyTyp && s.WindDelta !== 0 && (o = !o), s = s.PrevInAEL;
            t.WindCnt = o ? 0 : 1;
          } else
            t.WindCnt = t.WindDelta;
          t.WindCnt2 = n.WindCnt2, n = n.NextInAEL;
        } else
          n.WindCnt * n.WindDelta < 0 ? Math.abs(n.WindCnt) > 1 ? n.WindDelta * t.WindDelta < 0 ? t.WindCnt = n.WindCnt : t.WindCnt = n.WindCnt + t.WindDelta : t.WindCnt = t.WindDelta === 0 ? 1 : t.WindDelta : t.WindDelta === 0 ? t.WindCnt = n.WindCnt < 0 ? n.WindCnt - 1 : n.WindCnt + 1 : n.WindDelta * t.WindDelta < 0 ? t.WindCnt = n.WindCnt : t.WindCnt = n.WindCnt + t.WindDelta, t.WindCnt2 = n.WindCnt2, n = n.NextInAEL;
        if (this.IsEvenOddAltFillType(t))
          for (; n !== t; )
            n.WindDelta !== 0 && (t.WindCnt2 = t.WindCnt2 === 0 ? 1 : 0), n = n.NextInAEL;
        else
          for (; n !== t; )
            t.WindCnt2 += n.WindDelta, n = n.NextInAEL;
      }, e.Clipper.prototype.AddEdgeToSEL = function(t) {
        this.m_SortedEdges === null ? (this.m_SortedEdges = t, t.PrevInSEL = null, t.NextInSEL = null) : (t.NextInSEL = this.m_SortedEdges, t.PrevInSEL = null, this.m_SortedEdges.PrevInSEL = t, this.m_SortedEdges = t);
      }, e.Clipper.prototype.PopEdgeFromSEL = function(t) {
        if (t.v = this.m_SortedEdges, t.v === null)
          return !1;
        var n = t.v;
        return this.m_SortedEdges = t.v.NextInSEL, this.m_SortedEdges !== null && (this.m_SortedEdges.PrevInSEL = null), n.NextInSEL = null, n.PrevInSEL = null, !0;
      }, e.Clipper.prototype.CopyAELToSEL = function() {
        var t = this.m_ActiveEdges;
        for (this.m_SortedEdges = t; t !== null; )
          t.PrevInSEL = t.PrevInAEL, t.NextInSEL = t.NextInAEL, t = t.NextInAEL;
      }, e.Clipper.prototype.SwapPositionsInSEL = function(t, n) {
        if (!(t.NextInSEL === null && t.PrevInSEL === null) && !(n.NextInSEL === null && n.PrevInSEL === null)) {
          if (t.NextInSEL === n) {
            var r = n.NextInSEL;
            r !== null && (r.PrevInSEL = t);
            var o = t.PrevInSEL;
            o !== null && (o.NextInSEL = n), n.PrevInSEL = o, n.NextInSEL = t, t.PrevInSEL = n, t.NextInSEL = r;
          } else if (n.NextInSEL === t) {
            var r = t.NextInSEL;
            r !== null && (r.PrevInSEL = n);
            var o = n.PrevInSEL;
            o !== null && (o.NextInSEL = t), t.PrevInSEL = o, t.NextInSEL = n, n.PrevInSEL = t, n.NextInSEL = r;
          } else {
            var r = t.NextInSEL, o = t.PrevInSEL;
            t.NextInSEL = n.NextInSEL, t.NextInSEL !== null && (t.NextInSEL.PrevInSEL = t), t.PrevInSEL = n.PrevInSEL, t.PrevInSEL !== null && (t.PrevInSEL.NextInSEL = t), n.NextInSEL = r, n.NextInSEL !== null && (n.NextInSEL.PrevInSEL = n), n.PrevInSEL = o, n.PrevInSEL !== null && (n.PrevInSEL.NextInSEL = n);
          }
          t.PrevInSEL === null ? this.m_SortedEdges = t : n.PrevInSEL === null && (this.m_SortedEdges = n);
        }
      }, e.Clipper.prototype.AddLocalMaxPoly = function(t, n, r) {
        this.AddOutPt(t, r), n.WindDelta === 0 && this.AddOutPt(n, r), t.OutIdx === n.OutIdx ? (t.OutIdx = -1, n.OutIdx = -1) : t.OutIdx < n.OutIdx ? this.AppendPolygon(t, n) : this.AppendPolygon(n, t);
      }, e.Clipper.prototype.AddLocalMinPoly = function(t, n, r) {
        var o, s, f;
        if (e.ClipperBase.IsHorizontal(n) || t.Dx > n.Dx ? (o = this.AddOutPt(t, r), n.OutIdx = t.OutIdx, t.Side = e.EdgeSide.esLeft, n.Side = e.EdgeSide.esRight, s = t, s.PrevInAEL === n ? f = n.PrevInAEL : f = s.PrevInAEL) : (o = this.AddOutPt(n, r), t.OutIdx = n.OutIdx, t.Side = e.EdgeSide.esRight, n.Side = e.EdgeSide.esLeft, s = n, s.PrevInAEL === t ? f = t.PrevInAEL : f = s.PrevInAEL), f !== null && f.OutIdx >= 0 && f.Top.Y < r.Y && s.Top.Y < r.Y) {
          var d = e.Clipper.TopX(f, r.Y), y = e.Clipper.TopX(s, r.Y);
          if (d === y && s.WindDelta !== 0 && f.WindDelta !== 0 && e.ClipperBase.SlopesEqual5(new e.IntPoint2(d, r.Y), f.Top, new e.IntPoint2(y, r.Y), s.Top, this.m_UseFullRange)) {
            var P = this.AddOutPt(f, r);
            this.AddJoin(o, P, s.Top);
          }
        }
        return o;
      }, e.Clipper.prototype.AddOutPt = function(t, n) {
        if (t.OutIdx < 0) {
          var r = this.CreateOutRec();
          r.IsOpen = t.WindDelta === 0;
          var o = new e.OutPt();
          return r.Pts = o, o.Idx = r.Idx, o.Pt.X = n.X, o.Pt.Y = n.Y, e.use_xyz && (o.Pt.Z = n.Z), o.Next = o, o.Prev = o, r.IsOpen || this.SetHoleState(t, r), t.OutIdx = r.Idx, o;
        } else {
          var r = this.m_PolyOuts[t.OutIdx], s = r.Pts, f = t.Side === e.EdgeSide.esLeft;
          if (f && e.IntPoint.op_Equality(n, s.Pt))
            return s;
          if (!f && e.IntPoint.op_Equality(n, s.Prev.Pt))
            return s.Prev;
          var o = new e.OutPt();
          return o.Idx = r.Idx, o.Pt.X = n.X, o.Pt.Y = n.Y, e.use_xyz && (o.Pt.Z = n.Z), o.Next = s, o.Prev = s.Prev, o.Prev.Next = o, s.Prev = o, f && (r.Pts = o), o;
        }
      }, e.Clipper.prototype.GetLastOutPt = function(t) {
        var n = this.m_PolyOuts[t.OutIdx];
        return t.Side === e.EdgeSide.esLeft ? n.Pts : n.Pts.Prev;
      }, e.Clipper.prototype.SwapPoints = function(t, n) {
        var r = new e.IntPoint1(t.Value);
        t.Value.X = n.Value.X, t.Value.Y = n.Value.Y, e.use_xyz && (t.Value.Z = n.Value.Z), n.Value.X = r.X, n.Value.Y = r.Y, e.use_xyz && (n.Value.Z = r.Z);
      }, e.Clipper.prototype.HorzSegmentsOverlap = function(t, n, r, o) {
        var s;
        return t > n && (s = t, t = n, n = s), r > o && (s = r, r = o, o = s), t < o && r < n;
      }, e.Clipper.prototype.SetHoleState = function(t, n) {
        for (var r = t.PrevInAEL, o = null; r !== null; )
          r.OutIdx >= 0 && r.WindDelta !== 0 && (o === null ? o = r : o.OutIdx === r.OutIdx && (o = null)), r = r.PrevInAEL;
        o === null ? (n.FirstLeft = null, n.IsHole = !1) : (n.FirstLeft = this.m_PolyOuts[o.OutIdx], n.IsHole = !n.FirstLeft.IsHole);
      }, e.Clipper.prototype.GetDx = function(t, n) {
        return t.Y === n.Y ? e.ClipperBase.horizontal : (n.X - t.X) / (n.Y - t.Y);
      }, e.Clipper.prototype.FirstIsBottomPt = function(t, n) {
        for (var r = t.Prev; e.IntPoint.op_Equality(r.Pt, t.Pt) && r !== t; )
          r = r.Prev;
        var o = Math.abs(this.GetDx(t.Pt, r.Pt));
        for (r = t.Next; e.IntPoint.op_Equality(r.Pt, t.Pt) && r !== t; )
          r = r.Next;
        var s = Math.abs(this.GetDx(t.Pt, r.Pt));
        for (r = n.Prev; e.IntPoint.op_Equality(r.Pt, n.Pt) && r !== n; )
          r = r.Prev;
        var f = Math.abs(this.GetDx(n.Pt, r.Pt));
        for (r = n.Next; e.IntPoint.op_Equality(r.Pt, n.Pt) && r !== n; )
          r = r.Next;
        var d = Math.abs(this.GetDx(n.Pt, r.Pt));
        return Math.max(o, s) === Math.max(f, d) && Math.min(o, s) === Math.min(f, d) ? this.Area(t) > 0 : o >= f && o >= d || s >= f && s >= d;
      }, e.Clipper.prototype.GetBottomPt = function(t) {
        for (var n = null, r = t.Next; r !== t; )
          r.Pt.Y > t.Pt.Y ? (t = r, n = null) : r.Pt.Y === t.Pt.Y && r.Pt.X <= t.Pt.X && (r.Pt.X < t.Pt.X ? (n = null, t = r) : r.Next !== t && r.Prev !== t && (n = r)), r = r.Next;
        if (n !== null)
          for (; n !== r; )
            for (this.FirstIsBottomPt(r, n) || (t = n), n = n.Next; e.IntPoint.op_Inequality(n.Pt, t.Pt); )
              n = n.Next;
        return t;
      }, e.Clipper.prototype.GetLowermostRec = function(t, n) {
        t.BottomPt === null && (t.BottomPt = this.GetBottomPt(t.Pts)), n.BottomPt === null && (n.BottomPt = this.GetBottomPt(n.Pts));
        var r = t.BottomPt, o = n.BottomPt;
        return r.Pt.Y > o.Pt.Y ? t : r.Pt.Y < o.Pt.Y ? n : r.Pt.X < o.Pt.X ? t : r.Pt.X > o.Pt.X || r.Next === r ? n : o.Next === o || this.FirstIsBottomPt(r, o) ? t : n;
      }, e.Clipper.prototype.OutRec1RightOfOutRec2 = function(t, n) {
        do
          if (t = t.FirstLeft, t === n)
            return !0;
        while (t !== null);
        return !1;
      }, e.Clipper.prototype.GetOutRec = function(t) {
        for (var n = this.m_PolyOuts[t]; n !== this.m_PolyOuts[n.Idx]; )
          n = this.m_PolyOuts[n.Idx];
        return n;
      }, e.Clipper.prototype.AppendPolygon = function(t, n) {
        var r = this.m_PolyOuts[t.OutIdx], o = this.m_PolyOuts[n.OutIdx], s;
        this.OutRec1RightOfOutRec2(r, o) ? s = o : this.OutRec1RightOfOutRec2(o, r) ? s = r : s = this.GetLowermostRec(r, o);
        var f = r.Pts, d = f.Prev, y = o.Pts, P = y.Prev;
        t.Side === e.EdgeSide.esLeft ? n.Side === e.EdgeSide.esLeft ? (this.ReversePolyPtLinks(y), y.Next = f, f.Prev = y, d.Next = P, P.Prev = d, r.Pts = P) : (P.Next = f, f.Prev = P, y.Prev = d, d.Next = y, r.Pts = y) : n.Side === e.EdgeSide.esRight ? (this.ReversePolyPtLinks(y), d.Next = P, P.Prev = d, y.Next = f, f.Prev = y) : (d.Next = y, y.Prev = d, f.Prev = P, P.Next = f), r.BottomPt = null, s === o && (o.FirstLeft !== r && (r.FirstLeft = o.FirstLeft), r.IsHole = o.IsHole), o.Pts = null, o.BottomPt = null, o.FirstLeft = r;
        var v = t.OutIdx, w = n.OutIdx;
        t.OutIdx = -1, n.OutIdx = -1;
        for (var I = this.m_ActiveEdges; I !== null; ) {
          if (I.OutIdx === w) {
            I.OutIdx = v, I.Side = t.Side;
            break;
          }
          I = I.NextInAEL;
        }
        o.Idx = r.Idx;
      }, e.Clipper.prototype.ReversePolyPtLinks = function(t) {
        if (t !== null) {
          var n, r;
          n = t;
          do
            r = n.Next, n.Next = n.Prev, n.Prev = r, n = r;
          while (n !== t);
        }
      }, e.Clipper.SwapSides = function(t, n) {
        var r = t.Side;
        t.Side = n.Side, n.Side = r;
      }, e.Clipper.SwapPolyIndexes = function(t, n) {
        var r = t.OutIdx;
        t.OutIdx = n.OutIdx, n.OutIdx = r;
      }, e.Clipper.prototype.IntersectEdges = function(t, n, r) {
        var o = t.OutIdx >= 0, s = n.OutIdx >= 0;
        if (e.use_xyz && this.SetZ(r, t, n), e.use_lines && (t.WindDelta === 0 || n.WindDelta === 0)) {
          if (t.WindDelta === 0 && n.WindDelta === 0) return;
          t.PolyTyp === n.PolyTyp && t.WindDelta !== n.WindDelta && this.m_ClipType === e.ClipType.ctUnion ? t.WindDelta === 0 ? s && (this.AddOutPt(t, r), o && (t.OutIdx = -1)) : o && (this.AddOutPt(n, r), s && (n.OutIdx = -1)) : t.PolyTyp !== n.PolyTyp && (t.WindDelta === 0 && Math.abs(n.WindCnt) === 1 && (this.m_ClipType !== e.ClipType.ctUnion || n.WindCnt2 === 0) ? (this.AddOutPt(t, r), o && (t.OutIdx = -1)) : n.WindDelta === 0 && Math.abs(t.WindCnt) === 1 && (this.m_ClipType !== e.ClipType.ctUnion || t.WindCnt2 === 0) && (this.AddOutPt(n, r), s && (n.OutIdx = -1)));
          return;
        }
        if (t.PolyTyp === n.PolyTyp)
          if (this.IsEvenOddFillType(t)) {
            var f = t.WindCnt;
            t.WindCnt = n.WindCnt, n.WindCnt = f;
          } else
            t.WindCnt + n.WindDelta === 0 ? t.WindCnt = -t.WindCnt : t.WindCnt += n.WindDelta, n.WindCnt - t.WindDelta === 0 ? n.WindCnt = -n.WindCnt : n.WindCnt -= t.WindDelta;
        else
          this.IsEvenOddFillType(n) ? t.WindCnt2 = t.WindCnt2 === 0 ? 1 : 0 : t.WindCnt2 += n.WindDelta, this.IsEvenOddFillType(t) ? n.WindCnt2 = n.WindCnt2 === 0 ? 1 : 0 : n.WindCnt2 -= t.WindDelta;
        var d, y, P, v;
        t.PolyTyp === e.PolyType.ptSubject ? (d = this.m_SubjFillType, P = this.m_ClipFillType) : (d = this.m_ClipFillType, P = this.m_SubjFillType), n.PolyTyp === e.PolyType.ptSubject ? (y = this.m_SubjFillType, v = this.m_ClipFillType) : (y = this.m_ClipFillType, v = this.m_SubjFillType);
        var w, I;
        switch (d) {
          case e.PolyFillType.pftPositive:
            w = t.WindCnt;
            break;
          case e.PolyFillType.pftNegative:
            w = -t.WindCnt;
            break;
          default:
            w = Math.abs(t.WindCnt);
            break;
        }
        switch (y) {
          case e.PolyFillType.pftPositive:
            I = n.WindCnt;
            break;
          case e.PolyFillType.pftNegative:
            I = -n.WindCnt;
            break;
          default:
            I = Math.abs(n.WindCnt);
            break;
        }
        if (o && s)
          w !== 0 && w !== 1 || I !== 0 && I !== 1 || t.PolyTyp !== n.PolyTyp && this.m_ClipType !== e.ClipType.ctXor ? this.AddLocalMaxPoly(t, n, r) : (this.AddOutPt(t, r), this.AddOutPt(n, r), e.Clipper.SwapSides(t, n), e.Clipper.SwapPolyIndexes(t, n));
        else if (o)
          (I === 0 || I === 1) && (this.AddOutPt(t, r), e.Clipper.SwapSides(t, n), e.Clipper.SwapPolyIndexes(t, n));
        else if (s)
          (w === 0 || w === 1) && (this.AddOutPt(n, r), e.Clipper.SwapSides(t, n), e.Clipper.SwapPolyIndexes(t, n));
        else if ((w === 0 || w === 1) && (I === 0 || I === 1)) {
          var S, M;
          switch (P) {
            case e.PolyFillType.pftPositive:
              S = t.WindCnt2;
              break;
            case e.PolyFillType.pftNegative:
              S = -t.WindCnt2;
              break;
            default:
              S = Math.abs(t.WindCnt2);
              break;
          }
          switch (v) {
            case e.PolyFillType.pftPositive:
              M = n.WindCnt2;
              break;
            case e.PolyFillType.pftNegative:
              M = -n.WindCnt2;
              break;
            default:
              M = Math.abs(n.WindCnt2);
              break;
          }
          if (t.PolyTyp !== n.PolyTyp)
            this.AddLocalMinPoly(t, n, r);
          else if (w === 1 && I === 1)
            switch (this.m_ClipType) {
              case e.ClipType.ctIntersection:
                S > 0 && M > 0 && this.AddLocalMinPoly(t, n, r);
                break;
              case e.ClipType.ctUnion:
                S <= 0 && M <= 0 && this.AddLocalMinPoly(t, n, r);
                break;
              case e.ClipType.ctDifference:
                (t.PolyTyp === e.PolyType.ptClip && S > 0 && M > 0 || t.PolyTyp === e.PolyType.ptSubject && S <= 0 && M <= 0) && this.AddLocalMinPoly(t, n, r);
                break;
              case e.ClipType.ctXor:
                this.AddLocalMinPoly(t, n, r);
                break;
            }
          else
            e.Clipper.SwapSides(t, n);
        }
      }, e.Clipper.prototype.DeleteFromSEL = function(t) {
        var n = t.PrevInSEL, r = t.NextInSEL;
        n === null && r === null && t !== this.m_SortedEdges || (n !== null ? n.NextInSEL = r : this.m_SortedEdges = r, r !== null && (r.PrevInSEL = n), t.NextInSEL = null, t.PrevInSEL = null);
      }, e.Clipper.prototype.ProcessHorizontals = function() {
        for (var t = {}; this.PopEdgeFromSEL(t); )
          this.ProcessHorizontal(t.v);
      }, e.Clipper.prototype.GetHorzDirection = function(t, n) {
        t.Bot.X < t.Top.X ? (n.Left = t.Bot.X, n.Right = t.Top.X, n.Dir = e.Direction.dLeftToRight) : (n.Left = t.Top.X, n.Right = t.Bot.X, n.Dir = e.Direction.dRightToLeft);
      }, e.Clipper.prototype.ProcessHorizontal = function(t) {
        var n = {
          Dir: null,
          Left: null,
          Right: null
        };
        this.GetHorzDirection(t, n);
        for (var r = n.Dir, o = n.Left, s = n.Right, f = t.WindDelta === 0, d = t, y = null; d.NextInLML !== null && e.ClipperBase.IsHorizontal(d.NextInLML); )
          d = d.NextInLML;
        d.NextInLML === null && (y = this.GetMaximaPair(d));
        var P = this.m_Maxima;
        if (P !== null)
          if (r === e.Direction.dLeftToRight) {
            for (; P !== null && P.X <= t.Bot.X; )
              P = P.Next;
            P !== null && P.X >= d.Top.X && (P = null);
          } else {
            for (; P.Next !== null && P.Next.X < t.Bot.X; )
              P = P.Next;
            P.X <= d.Top.X && (P = null);
          }
        for (var v = null; ; ) {
          for (var w = t === d, I = this.GetNextInAEL(t, r); I !== null; ) {
            if (P !== null)
              if (r === e.Direction.dLeftToRight)
                for (; P !== null && P.X < I.Curr.X; )
                  t.OutIdx >= 0 && !f && this.AddOutPt(t, new e.IntPoint2(P.X, t.Bot.Y)), P = P.Next;
              else
                for (; P !== null && P.X > I.Curr.X; )
                  t.OutIdx >= 0 && !f && this.AddOutPt(t, new e.IntPoint2(P.X, t.Bot.Y)), P = P.Prev;
            if (r === e.Direction.dLeftToRight && I.Curr.X > s || r === e.Direction.dRightToLeft && I.Curr.X < o || I.Curr.X === t.Top.X && t.NextInLML !== null && I.Dx < t.NextInLML.Dx)
              break;
            if (t.OutIdx >= 0 && !f) {
              e.use_xyz && (r === e.Direction.dLeftToRight ? this.SetZ(I.Curr, t, I) : this.SetZ(I.Curr, I, t)), v = this.AddOutPt(t, I.Curr);
              for (var S = this.m_SortedEdges; S !== null; ) {
                if (S.OutIdx >= 0 && this.HorzSegmentsOverlap(t.Bot.X, t.Top.X, S.Bot.X, S.Top.X)) {
                  var M = this.GetLastOutPt(S);
                  this.AddJoin(M, v, S.Top);
                }
                S = S.NextInSEL;
              }
              this.AddGhostJoin(v, t.Bot);
            }
            if (I === y && w) {
              t.OutIdx >= 0 && this.AddLocalMaxPoly(t, y, t.Top), this.DeleteFromAEL(t), this.DeleteFromAEL(y);
              return;
            }
            if (r === e.Direction.dLeftToRight) {
              var X = new e.IntPoint2(I.Curr.X, t.Curr.Y);
              this.IntersectEdges(t, I, X);
            } else {
              var X = new e.IntPoint2(I.Curr.X, t.Curr.Y);
              this.IntersectEdges(I, t, X);
            }
            var Y = this.GetNextInAEL(I, r);
            this.SwapPositionsInAEL(t, I), I = Y;
          }
          if (t.NextInLML === null || !e.ClipperBase.IsHorizontal(t.NextInLML))
            break;
          t = this.UpdateEdgeIntoAEL(t), t.OutIdx >= 0 && this.AddOutPt(t, t.Bot), n = {
            Dir: r,
            Left: o,
            Right: s
          }, this.GetHorzDirection(t, n), r = n.Dir, o = n.Left, s = n.Right;
        }
        if (t.OutIdx >= 0 && v === null) {
          v = this.GetLastOutPt(t);
          for (var S = this.m_SortedEdges; S !== null; ) {
            if (S.OutIdx >= 0 && this.HorzSegmentsOverlap(t.Bot.X, t.Top.X, S.Bot.X, S.Top.X)) {
              var M = this.GetLastOutPt(S);
              this.AddJoin(M, v, S.Top);
            }
            S = S.NextInSEL;
          }
          this.AddGhostJoin(v, t.Top);
        }
        if (t.NextInLML !== null)
          if (t.OutIdx >= 0) {
            if (v = this.AddOutPt(t, t.Top), t = this.UpdateEdgeIntoAEL(t), t.WindDelta === 0)
              return;
            var F = t.PrevInAEL, Y = t.NextInAEL;
            if (F !== null && F.Curr.X === t.Bot.X && F.Curr.Y === t.Bot.Y && F.WindDelta === 0 && F.OutIdx >= 0 && F.Curr.Y > F.Top.Y && e.ClipperBase.SlopesEqual3(t, F, this.m_UseFullRange)) {
              var M = this.AddOutPt(F, t.Bot);
              this.AddJoin(v, M, t.Top);
            } else if (Y !== null && Y.Curr.X === t.Bot.X && Y.Curr.Y === t.Bot.Y && Y.WindDelta !== 0 && Y.OutIdx >= 0 && Y.Curr.Y > Y.Top.Y && e.ClipperBase.SlopesEqual3(t, Y, this.m_UseFullRange)) {
              var M = this.AddOutPt(Y, t.Bot);
              this.AddJoin(v, M, t.Top);
            }
          } else
            t = this.UpdateEdgeIntoAEL(t);
        else
          t.OutIdx >= 0 && this.AddOutPt(t, t.Top), this.DeleteFromAEL(t);
      }, e.Clipper.prototype.GetNextInAEL = function(t, n) {
        return n === e.Direction.dLeftToRight ? t.NextInAEL : t.PrevInAEL;
      }, e.Clipper.prototype.IsMinima = function(t) {
        return t !== null && t.Prev.NextInLML !== t && t.Next.NextInLML !== t;
      }, e.Clipper.prototype.IsMaxima = function(t, n) {
        return t !== null && t.Top.Y === n && t.NextInLML === null;
      }, e.Clipper.prototype.IsIntermediate = function(t, n) {
        return t.Top.Y === n && t.NextInLML !== null;
      }, e.Clipper.prototype.GetMaximaPair = function(t) {
        return e.IntPoint.op_Equality(t.Next.Top, t.Top) && t.Next.NextInLML === null ? t.Next : e.IntPoint.op_Equality(t.Prev.Top, t.Top) && t.Prev.NextInLML === null ? t.Prev : null;
      }, e.Clipper.prototype.GetMaximaPairEx = function(t) {
        var n = this.GetMaximaPair(t);
        return n === null || n.OutIdx === e.ClipperBase.Skip || n.NextInAEL === n.PrevInAEL && !e.ClipperBase.IsHorizontal(n) ? null : n;
      }, e.Clipper.prototype.ProcessIntersections = function(t) {
        if (this.m_ActiveEdges === null)
          return !0;
        try {
          if (this.BuildIntersectList(t), this.m_IntersectList.length === 0)
            return !0;
          if (this.m_IntersectList.length === 1 || this.FixupIntersectionOrder())
            this.ProcessIntersectList();
          else
            return !1;
        } catch {
          this.m_SortedEdges = null, this.m_IntersectList.length = 0, e.Error("ProcessIntersections error");
        }
        return this.m_SortedEdges = null, !0;
      }, e.Clipper.prototype.BuildIntersectList = function(t) {
        if (this.m_ActiveEdges !== null) {
          var n = this.m_ActiveEdges;
          for (this.m_SortedEdges = n; n !== null; )
            n.PrevInSEL = n.PrevInAEL, n.NextInSEL = n.NextInAEL, n.Curr.X = e.Clipper.TopX(n, t), n = n.NextInAEL;
          for (var r = !0; r && this.m_SortedEdges !== null; ) {
            for (r = !1, n = this.m_SortedEdges; n.NextInSEL !== null; ) {
              var o = n.NextInSEL, s = new e.IntPoint0();
              if (n.Curr.X > o.Curr.X) {
                this.IntersectPoint(n, o, s), s.Y < t && (s = new e.IntPoint2(e.Clipper.TopX(n, t), t));
                var f = new e.IntersectNode();
                f.Edge1 = n, f.Edge2 = o, f.Pt.X = s.X, f.Pt.Y = s.Y, e.use_xyz && (f.Pt.Z = s.Z), this.m_IntersectList.push(f), this.SwapPositionsInSEL(n, o), r = !0;
              } else
                n = o;
            }
            if (n.PrevInSEL !== null)
              n.PrevInSEL.NextInSEL = null;
            else
              break;
          }
          this.m_SortedEdges = null;
        }
      }, e.Clipper.prototype.EdgesAdjacent = function(t) {
        return t.Edge1.NextInSEL === t.Edge2 || t.Edge1.PrevInSEL === t.Edge2;
      }, e.Clipper.IntersectNodeSort = function(t, n) {
        return n.Pt.Y - t.Pt.Y;
      }, e.Clipper.prototype.FixupIntersectionOrder = function() {
        this.m_IntersectList.sort(this.m_IntersectNodeComparer), this.CopyAELToSEL();
        for (var t = this.m_IntersectList.length, n = 0; n < t; n++) {
          if (!this.EdgesAdjacent(this.m_IntersectList[n])) {
            for (var r = n + 1; r < t && !this.EdgesAdjacent(this.m_IntersectList[r]); )
              r++;
            if (r === t)
              return !1;
            var o = this.m_IntersectList[n];
            this.m_IntersectList[n] = this.m_IntersectList[r], this.m_IntersectList[r] = o;
          }
          this.SwapPositionsInSEL(this.m_IntersectList[n].Edge1, this.m_IntersectList[n].Edge2);
        }
        return !0;
      }, e.Clipper.prototype.ProcessIntersectList = function() {
        for (var t = 0, n = this.m_IntersectList.length; t < n; t++) {
          var r = this.m_IntersectList[t];
          this.IntersectEdges(r.Edge1, r.Edge2, r.Pt), this.SwapPositionsInAEL(r.Edge1, r.Edge2);
        }
        this.m_IntersectList.length = 0;
      };
      var br = function(t) {
        return t < 0 ? Math.ceil(t - 0.5) : Math.round(t);
      }, Nr = function(t) {
        return t < 0 ? Math.ceil(t - 0.5) : Math.floor(t + 0.5);
      }, Mr = function(t) {
        return t < 0 ? -Math.round(Math.abs(t)) : Math.round(t);
      }, Dr = function(t) {
        return t < 0 ? (t -= 0.5, t < -2147483648 ? Math.ceil(t) : t | 0) : (t += 0.5, t > 2147483647 ? Math.floor(t) : t | 0);
      };
      c.msie ? e.Clipper.Round = br : c.chromium ? e.Clipper.Round = Mr : c.safari ? e.Clipper.Round = Dr : e.Clipper.Round = Nr, e.Clipper.TopX = function(t, n) {
        return n === t.Top.Y ? t.Top.X : t.Bot.X + e.Clipper.Round(t.Dx * (n - t.Bot.Y));
      }, e.Clipper.prototype.IntersectPoint = function(t, n, r) {
        r.X = 0, r.Y = 0;
        var o, s;
        if (t.Dx === n.Dx) {
          r.Y = t.Curr.Y, r.X = e.Clipper.TopX(t, r.Y);
          return;
        }
        if (t.Delta.X === 0)
          r.X = t.Bot.X, e.ClipperBase.IsHorizontal(n) ? r.Y = n.Bot.Y : (s = n.Bot.Y - n.Bot.X / n.Dx, r.Y = e.Clipper.Round(r.X / n.Dx + s));
        else if (n.Delta.X === 0)
          r.X = n.Bot.X, e.ClipperBase.IsHorizontal(t) ? r.Y = t.Bot.Y : (o = t.Bot.Y - t.Bot.X / t.Dx, r.Y = e.Clipper.Round(r.X / t.Dx + o));
        else {
          o = t.Bot.X - t.Bot.Y * t.Dx, s = n.Bot.X - n.Bot.Y * n.Dx;
          var f = (s - o) / (t.Dx - n.Dx);
          r.Y = e.Clipper.Round(f), Math.abs(t.Dx) < Math.abs(n.Dx) ? r.X = e.Clipper.Round(t.Dx * f + o) : r.X = e.Clipper.Round(n.Dx * f + s);
        }
        if (r.Y < t.Top.Y || r.Y < n.Top.Y) {
          if (t.Top.Y > n.Top.Y)
            return r.Y = t.Top.Y, r.X = e.Clipper.TopX(n, t.Top.Y), r.X < t.Top.X;
          r.Y = n.Top.Y, Math.abs(t.Dx) < Math.abs(n.Dx) ? r.X = e.Clipper.TopX(t, r.Y) : r.X = e.Clipper.TopX(n, r.Y);
        }
        r.Y > t.Curr.Y && (r.Y = t.Curr.Y, Math.abs(t.Dx) > Math.abs(n.Dx) ? r.X = e.Clipper.TopX(n, r.Y) : r.X = e.Clipper.TopX(t, r.Y));
      }, e.Clipper.prototype.ProcessEdgesAtTopOfScanbeam = function(t) {
        for (var n = this.m_ActiveEdges; n !== null; ) {
          var r = this.IsMaxima(n, t);
          if (r) {
            var o = this.GetMaximaPairEx(n);
            r = o === null || !e.ClipperBase.IsHorizontal(o);
          }
          if (r) {
            this.StrictlySimple && this.InsertMaxima(n.Top.X);
            var s = n.PrevInAEL;
            this.DoMaxima(n), s === null ? n = this.m_ActiveEdges : n = s.NextInAEL;
          } else {
            if (this.IsIntermediate(n, t) && e.ClipperBase.IsHorizontal(n.NextInLML) ? (n = this.UpdateEdgeIntoAEL(n), n.OutIdx >= 0 && this.AddOutPt(n, n.Bot), this.AddEdgeToSEL(n)) : (n.Curr.X = e.Clipper.TopX(n, t), n.Curr.Y = t), e.use_xyz && (n.Top.Y === t ? n.Curr.Z = n.Top.Z : n.Bot.Y === t ? n.Curr.Z = n.Bot.Z : n.Curr.Z = 0), this.StrictlySimple) {
              var s = n.PrevInAEL;
              if (n.OutIdx >= 0 && n.WindDelta !== 0 && s !== null && s.OutIdx >= 0 && s.Curr.X === n.Curr.X && s.WindDelta !== 0) {
                var f = new e.IntPoint1(n.Curr);
                e.use_xyz && this.SetZ(f, s, n);
                var d = this.AddOutPt(s, f), y = this.AddOutPt(n, f);
                this.AddJoin(d, y, f);
              }
            }
            n = n.NextInAEL;
          }
        }
        for (this.ProcessHorizontals(), this.m_Maxima = null, n = this.m_ActiveEdges; n !== null; ) {
          if (this.IsIntermediate(n, t)) {
            var d = null;
            n.OutIdx >= 0 && (d = this.AddOutPt(n, n.Top)), n = this.UpdateEdgeIntoAEL(n);
            var s = n.PrevInAEL, P = n.NextInAEL;
            if (s !== null && s.Curr.X === n.Bot.X && s.Curr.Y === n.Bot.Y && d !== null && s.OutIdx >= 0 && s.Curr.Y === s.Top.Y && e.ClipperBase.SlopesEqual5(n.Curr, n.Top, s.Curr, s.Top, this.m_UseFullRange) && n.WindDelta !== 0 && s.WindDelta !== 0) {
              var y = this.AddOutPt(ePrev2, n.Bot);
              this.AddJoin(d, y, n.Top);
            } else if (P !== null && P.Curr.X === n.Bot.X && P.Curr.Y === n.Bot.Y && d !== null && P.OutIdx >= 0 && P.Curr.Y === P.Top.Y && e.ClipperBase.SlopesEqual5(n.Curr, n.Top, P.Curr, P.Top, this.m_UseFullRange) && n.WindDelta !== 0 && P.WindDelta !== 0) {
              var y = this.AddOutPt(P, n.Bot);
              this.AddJoin(d, y, n.Top);
            }
          }
          n = n.NextInAEL;
        }
      }, e.Clipper.prototype.DoMaxima = function(t) {
        var n = this.GetMaximaPairEx(t);
        if (n === null) {
          t.OutIdx >= 0 && this.AddOutPt(t, t.Top), this.DeleteFromAEL(t);
          return;
        }
        for (var r = t.NextInAEL; r !== null && r !== n; )
          this.IntersectEdges(t, r, t.Top), this.SwapPositionsInAEL(t, r), r = t.NextInAEL;
        t.OutIdx === -1 && n.OutIdx === -1 ? (this.DeleteFromAEL(t), this.DeleteFromAEL(n)) : t.OutIdx >= 0 && n.OutIdx >= 0 ? (t.OutIdx >= 0 && this.AddLocalMaxPoly(t, n, t.Top), this.DeleteFromAEL(t), this.DeleteFromAEL(n)) : e.use_lines && t.WindDelta === 0 ? (t.OutIdx >= 0 && (this.AddOutPt(t, t.Top), t.OutIdx = e.ClipperBase.Unassigned), this.DeleteFromAEL(t), n.OutIdx >= 0 && (this.AddOutPt(n, t.Top), n.OutIdx = e.ClipperBase.Unassigned), this.DeleteFromAEL(n)) : e.Error("DoMaxima error");
      }, e.Clipper.ReversePaths = function(t) {
        for (var n = 0, r = t.length; n < r; n++)
          t[n].reverse();
      }, e.Clipper.Orientation = function(t) {
        return e.Clipper.Area(t) >= 0;
      }, e.Clipper.prototype.PointCount = function(t) {
        if (t === null)
          return 0;
        var n = 0, r = t;
        do
          n++, r = r.Next;
        while (r !== t);
        return n;
      }, e.Clipper.prototype.BuildResult = function(t) {
        e.Clear(t);
        for (var n = 0, r = this.m_PolyOuts.length; n < r; n++) {
          var o = this.m_PolyOuts[n];
          if (o.Pts !== null) {
            var s = o.Pts.Prev, f = this.PointCount(s);
            if (!(f < 2)) {
              for (var d = new Array(f), y = 0; y < f; y++)
                d[y] = s.Pt, s = s.Prev;
              t.push(d);
            }
          }
        }
      }, e.Clipper.prototype.BuildResult2 = function(t) {
        t.Clear();
        for (var n = 0, r = this.m_PolyOuts.length; n < r; n++) {
          var o = this.m_PolyOuts[n], s = this.PointCount(o.Pts);
          if (!(o.IsOpen && s < 2 || !o.IsOpen && s < 3)) {
            this.FixHoleLinkage(o);
            var f = new e.PolyNode();
            t.m_AllPolys.push(f), o.PolyNode = f, f.m_polygon.length = s;
            for (var d = o.Pts.Prev, y = 0; y < s; y++)
              f.m_polygon[y] = d.Pt, d = d.Prev;
          }
        }
        for (var n = 0, r = this.m_PolyOuts.length; n < r; n++) {
          var o = this.m_PolyOuts[n];
          o.PolyNode !== null && (o.IsOpen ? (o.PolyNode.IsOpen = !0, t.AddChild(o.PolyNode)) : o.FirstLeft !== null && o.FirstLeft.PolyNode !== null ? o.FirstLeft.PolyNode.AddChild(o.PolyNode) : t.AddChild(o.PolyNode));
        }
      }, e.Clipper.prototype.FixupOutPolyline = function(t) {
        for (var n = t.Pts, r = n.Prev; n !== r; )
          if (n = n.Next, e.IntPoint.op_Equality(n.Pt, n.Prev.Pt)) {
            n === r && (r = n.Prev);
            var o = n.Prev;
            o.Next = n.Next, n.Next.Prev = o, n = o;
          }
        n === n.Prev && (t.Pts = null);
      }, e.Clipper.prototype.FixupOutPolygon = function(t) {
        var n = null;
        t.BottomPt = null;
        for (var r = t.Pts, o = this.PreserveCollinear || this.StrictlySimple; ; ) {
          if (r.Prev === r || r.Prev === r.Next) {
            t.Pts = null;
            return;
          }
          if (e.IntPoint.op_Equality(r.Pt, r.Next.Pt) || e.IntPoint.op_Equality(r.Pt, r.Prev.Pt) || e.ClipperBase.SlopesEqual4(r.Prev.Pt, r.Pt, r.Next.Pt, this.m_UseFullRange) && (!o || !this.Pt2IsBetweenPt1AndPt3(r.Prev.Pt, r.Pt, r.Next.Pt)))
            n = null, r.Prev.Next = r.Next, r.Next.Prev = r.Prev, r = r.Prev;
          else {
            if (r === n)
              break;
            n === null && (n = r), r = r.Next;
          }
        }
        t.Pts = r;
      }, e.Clipper.prototype.DupOutPt = function(t, n) {
        var r = new e.OutPt();
        return r.Pt.X = t.Pt.X, r.Pt.Y = t.Pt.Y, e.use_xyz && (r.Pt.Z = t.Pt.Z), r.Idx = t.Idx, n ? (r.Next = t.Next, r.Prev = t, t.Next.Prev = r, t.Next = r) : (r.Prev = t.Prev, r.Next = t, t.Prev.Next = r, t.Prev = r), r;
      }, e.Clipper.prototype.GetOverlap = function(t, n, r, o, s) {
        return t < n ? r < o ? (s.Left = Math.max(t, r), s.Right = Math.min(n, o)) : (s.Left = Math.max(t, o), s.Right = Math.min(n, r)) : r < o ? (s.Left = Math.max(n, r), s.Right = Math.min(t, o)) : (s.Left = Math.max(n, o), s.Right = Math.min(t, r)), s.Left < s.Right;
      }, e.Clipper.prototype.JoinHorz = function(t, n, r, o, s, f) {
        var d = t.Pt.X > n.Pt.X ? e.Direction.dRightToLeft : e.Direction.dLeftToRight, y = r.Pt.X > o.Pt.X ? e.Direction.dRightToLeft : e.Direction.dLeftToRight;
        if (d === y)
          return !1;
        if (d === e.Direction.dLeftToRight) {
          for (; t.Next.Pt.X <= s.X && t.Next.Pt.X >= t.Pt.X && t.Next.Pt.Y === s.Y; )
            t = t.Next;
          f && t.Pt.X !== s.X && (t = t.Next), n = this.DupOutPt(t, !f), e.IntPoint.op_Inequality(n.Pt, s) && (t = n, t.Pt.X = s.X, t.Pt.Y = s.Y, e.use_xyz && (t.Pt.Z = s.Z), n = this.DupOutPt(t, !f));
        } else {
          for (; t.Next.Pt.X >= s.X && t.Next.Pt.X <= t.Pt.X && t.Next.Pt.Y === s.Y; )
            t = t.Next;
          !f && t.Pt.X !== s.X && (t = t.Next), n = this.DupOutPt(t, f), e.IntPoint.op_Inequality(n.Pt, s) && (t = n, t.Pt.X = s.X, t.Pt.Y = s.Y, e.use_xyz && (t.Pt.Z = s.Z), n = this.DupOutPt(t, f));
        }
        if (y === e.Direction.dLeftToRight) {
          for (; r.Next.Pt.X <= s.X && r.Next.Pt.X >= r.Pt.X && r.Next.Pt.Y === s.Y; )
            r = r.Next;
          f && r.Pt.X !== s.X && (r = r.Next), o = this.DupOutPt(r, !f), e.IntPoint.op_Inequality(o.Pt, s) && (r = o, r.Pt.X = s.X, r.Pt.Y = s.Y, e.use_xyz && (r.Pt.Z = s.Z), o = this.DupOutPt(r, !f));
        } else {
          for (; r.Next.Pt.X >= s.X && r.Next.Pt.X <= r.Pt.X && r.Next.Pt.Y === s.Y; )
            r = r.Next;
          !f && r.Pt.X !== s.X && (r = r.Next), o = this.DupOutPt(r, f), e.IntPoint.op_Inequality(o.Pt, s) && (r = o, r.Pt.X = s.X, r.Pt.Y = s.Y, e.use_xyz && (r.Pt.Z = s.Z), o = this.DupOutPt(r, f));
        }
        return d === e.Direction.dLeftToRight === f ? (t.Prev = r, r.Next = t, n.Next = o, o.Prev = n) : (t.Next = r, r.Prev = t, n.Prev = o, o.Next = n), !0;
      }, e.Clipper.prototype.JoinPoints = function(t, n, r) {
        var o = t.OutPt1, s = new e.OutPt(), f = t.OutPt2, d = new e.OutPt(), y = t.OutPt1.Pt.Y === t.OffPt.Y;
        if (y && e.IntPoint.op_Equality(t.OffPt, t.OutPt1.Pt) && e.IntPoint.op_Equality(t.OffPt, t.OutPt2.Pt)) {
          if (n !== r) return !1;
          for (s = t.OutPt1.Next; s !== o && e.IntPoint.op_Equality(s.Pt, t.OffPt); )
            s = s.Next;
          var P = s.Pt.Y > t.OffPt.Y;
          for (d = t.OutPt2.Next; d !== f && e.IntPoint.op_Equality(d.Pt, t.OffPt); )
            d = d.Next;
          var v = d.Pt.Y > t.OffPt.Y;
          return P === v ? !1 : P ? (s = this.DupOutPt(o, !1), d = this.DupOutPt(f, !0), o.Prev = f, f.Next = o, s.Next = d, d.Prev = s, t.OutPt1 = o, t.OutPt2 = s, !0) : (s = this.DupOutPt(o, !0), d = this.DupOutPt(f, !1), o.Next = f, f.Prev = o, s.Prev = d, d.Next = s, t.OutPt1 = o, t.OutPt2 = s, !0);
        } else if (y) {
          for (s = o; o.Prev.Pt.Y === o.Pt.Y && o.Prev !== s && o.Prev !== f; )
            o = o.Prev;
          for (; s.Next.Pt.Y === s.Pt.Y && s.Next !== o && s.Next !== f; )
            s = s.Next;
          if (s.Next === o || s.Next === f)
            return !1;
          for (d = f; f.Prev.Pt.Y === f.Pt.Y && f.Prev !== d && f.Prev !== s; )
            f = f.Prev;
          for (; d.Next.Pt.Y === d.Pt.Y && d.Next !== f && d.Next !== o; )
            d = d.Next;
          if (d.Next === f || d.Next === o)
            return !1;
          var w = {
            Left: null,
            Right: null
          };
          if (!this.GetOverlap(o.Pt.X, s.Pt.X, f.Pt.X, d.Pt.X, w))
            return !1;
          var I = w.Left, S = w.Right, M = new e.IntPoint0(), X;
          return o.Pt.X >= I && o.Pt.X <= S ? (M.X = o.Pt.X, M.Y = o.Pt.Y, e.use_xyz && (M.Z = o.Pt.Z), X = o.Pt.X > s.Pt.X) : f.Pt.X >= I && f.Pt.X <= S ? (M.X = f.Pt.X, M.Y = f.Pt.Y, e.use_xyz && (M.Z = f.Pt.Z), X = f.Pt.X > d.Pt.X) : s.Pt.X >= I && s.Pt.X <= S ? (M.X = s.Pt.X, M.Y = s.Pt.Y, e.use_xyz && (M.Z = s.Pt.Z), X = s.Pt.X > o.Pt.X) : (M.X = d.Pt.X, M.Y = d.Pt.Y, e.use_xyz && (M.Z = d.Pt.Z), X = d.Pt.X > f.Pt.X), t.OutPt1 = o, t.OutPt2 = f, this.JoinHorz(o, s, f, d, M, X);
        } else {
          for (s = o.Next; e.IntPoint.op_Equality(s.Pt, o.Pt) && s !== o; )
            s = s.Next;
          var Y = s.Pt.Y > o.Pt.Y || !e.ClipperBase.SlopesEqual4(o.Pt, s.Pt, t.OffPt, this.m_UseFullRange);
          if (Y) {
            for (s = o.Prev; e.IntPoint.op_Equality(s.Pt, o.Pt) && s !== o; )
              s = s.Prev;
            if (s.Pt.Y > o.Pt.Y || !e.ClipperBase.SlopesEqual4(o.Pt, s.Pt, t.OffPt, this.m_UseFullRange))
              return !1;
          }
          for (d = f.Next; e.IntPoint.op_Equality(d.Pt, f.Pt) && d !== f; )
            d = d.Next;
          var F = d.Pt.Y > f.Pt.Y || !e.ClipperBase.SlopesEqual4(f.Pt, d.Pt, t.OffPt, this.m_UseFullRange);
          if (F) {
            for (d = f.Prev; e.IntPoint.op_Equality(d.Pt, f.Pt) && d !== f; )
              d = d.Prev;
            if (d.Pt.Y > f.Pt.Y || !e.ClipperBase.SlopesEqual4(f.Pt, d.Pt, t.OffPt, this.m_UseFullRange))
              return !1;
          }
          return s === o || d === f || s === d || n === r && Y === F ? !1 : Y ? (s = this.DupOutPt(o, !1), d = this.DupOutPt(f, !0), o.Prev = f, f.Next = o, s.Next = d, d.Prev = s, t.OutPt1 = o, t.OutPt2 = s, !0) : (s = this.DupOutPt(o, !0), d = this.DupOutPt(f, !1), o.Next = f, f.Prev = o, s.Prev = d, d.Next = s, t.OutPt1 = o, t.OutPt2 = s, !0);
        }
      }, e.Clipper.GetBounds = function(t) {
        for (var n = 0, r = t.length; n < r && t[n].length === 0; ) n++;
        if (n === r) return new e.IntRect(0, 0, 0, 0);
        var o = new e.IntRect();
        for (o.left = t[n][0].X, o.right = o.left, o.top = t[n][0].Y, o.bottom = o.top; n < r; n++)
          for (var s = 0, f = t[n].length; s < f; s++)
            t[n][s].X < o.left ? o.left = t[n][s].X : t[n][s].X > o.right && (o.right = t[n][s].X), t[n][s].Y < o.top ? o.top = t[n][s].Y : t[n][s].Y > o.bottom && (o.bottom = t[n][s].Y);
        return o;
      }, e.Clipper.prototype.GetBounds2 = function(t) {
        var n = t, r = new e.IntRect();
        for (r.left = t.Pt.X, r.right = t.Pt.X, r.top = t.Pt.Y, r.bottom = t.Pt.Y, t = t.Next; t !== n; )
          t.Pt.X < r.left && (r.left = t.Pt.X), t.Pt.X > r.right && (r.right = t.Pt.X), t.Pt.Y < r.top && (r.top = t.Pt.Y), t.Pt.Y > r.bottom && (r.bottom = t.Pt.Y), t = t.Next;
        return r;
      }, e.Clipper.PointInPolygon = function(t, n) {
        var r = 0, o = n.length;
        if (o < 3)
          return 0;
        for (var s = n[0], f = 1; f <= o; ++f) {
          var d = f === o ? n[0] : n[f];
          if (d.Y === t.Y && (d.X === t.X || s.Y === t.Y && d.X > t.X == s.X < t.X))
            return -1;
          if (s.Y < t.Y != d.Y < t.Y) {
            if (s.X >= t.X)
              if (d.X > t.X)
                r = 1 - r;
              else {
                var y = (s.X - t.X) * (d.Y - t.Y) - (d.X - t.X) * (s.Y - t.Y);
                if (y === 0)
                  return -1;
                y > 0 == d.Y > s.Y && (r = 1 - r);
              }
            else if (d.X > t.X) {
              var y = (s.X - t.X) * (d.Y - t.Y) - (d.X - t.X) * (s.Y - t.Y);
              if (y === 0)
                return -1;
              y > 0 == d.Y > s.Y && (r = 1 - r);
            }
          }
          s = d;
        }
        return r;
      }, e.Clipper.prototype.PointInPolygon = function(t, n) {
        var r = 0, o = n, s = t.X, f = t.Y, d = n.Pt.X, y = n.Pt.Y;
        do {
          n = n.Next;
          var P = n.Pt.X, v = n.Pt.Y;
          if (v === f && (P === s || y === f && P > s == d < s))
            return -1;
          if (y < f != v < f) {
            if (d >= s)
              if (P > s)
                r = 1 - r;
              else {
                var w = (d - s) * (v - f) - (P - s) * (y - f);
                if (w === 0)
                  return -1;
                w > 0 == v > y && (r = 1 - r);
              }
            else if (P > s) {
              var w = (d - s) * (v - f) - (P - s) * (y - f);
              if (w === 0)
                return -1;
              w > 0 == v > y && (r = 1 - r);
            }
          }
          d = P, y = v;
        } while (o !== n);
        return r;
      }, e.Clipper.prototype.Poly2ContainsPoly1 = function(t, n) {
        var r = t;
        do {
          var o = this.PointInPolygon(r.Pt, n);
          if (o >= 0)
            return o > 0;
          r = r.Next;
        } while (r !== t);
        return !0;
      }, e.Clipper.prototype.FixupFirstLefts1 = function(t, n) {
        for (var r, o, s = 0, f = this.m_PolyOuts.length; s < f; s++)
          r = this.m_PolyOuts[s], o = e.Clipper.ParseFirstLeft(r.FirstLeft), r.Pts !== null && o === t && this.Poly2ContainsPoly1(r.Pts, n.Pts) && (r.FirstLeft = n);
      }, e.Clipper.prototype.FixupFirstLefts2 = function(t, n) {
        for (var r = n.FirstLeft, o, s, f = 0, d = this.m_PolyOuts.length; f < d; f++)
          o = this.m_PolyOuts[f], !(o.Pts === null || o === n || o === t) && (s = e.Clipper.ParseFirstLeft(o.FirstLeft), !(s !== r && s !== t && s !== n) && (this.Poly2ContainsPoly1(o.Pts, t.Pts) ? o.FirstLeft = t : this.Poly2ContainsPoly1(o.Pts, n.Pts) ? o.FirstLeft = n : (o.FirstLeft === t || o.FirstLeft === n) && (o.FirstLeft = r)));
      }, e.Clipper.prototype.FixupFirstLefts3 = function(t, n) {
        for (var r, o, s = 0, f = this.m_PolyOuts.length; s < f; s++)
          r = this.m_PolyOuts[s], o = e.Clipper.ParseFirstLeft(r.FirstLeft), r.Pts !== null && o === t && (r.FirstLeft = n);
      }, e.Clipper.ParseFirstLeft = function(t) {
        for (; t !== null && t.Pts === null; )
          t = t.FirstLeft;
        return t;
      }, e.Clipper.prototype.JoinCommonEdges = function() {
        for (var t = 0, n = this.m_Joins.length; t < n; t++) {
          var r = this.m_Joins[t], o = this.GetOutRec(r.OutPt1.Idx), s = this.GetOutRec(r.OutPt2.Idx);
          if (!(o.Pts === null || s.Pts === null) && !(o.IsOpen || s.IsOpen)) {
            var f;
            o === s ? f = o : this.OutRec1RightOfOutRec2(o, s) ? f = s : this.OutRec1RightOfOutRec2(s, o) ? f = o : f = this.GetLowermostRec(o, s), this.JoinPoints(r, o, s) && (o === s ? (o.Pts = r.OutPt1, o.BottomPt = null, s = this.CreateOutRec(), s.Pts = r.OutPt2, this.UpdateOutPtIdxs(s), this.Poly2ContainsPoly1(s.Pts, o.Pts) ? (s.IsHole = !o.IsHole, s.FirstLeft = o, this.m_UsingPolyTree && this.FixupFirstLefts2(s, o), (s.IsHole ^ this.ReverseSolution) == this.Area$1(s) > 0 && this.ReversePolyPtLinks(s.Pts)) : this.Poly2ContainsPoly1(o.Pts, s.Pts) ? (s.IsHole = o.IsHole, o.IsHole = !s.IsHole, s.FirstLeft = o.FirstLeft, o.FirstLeft = s, this.m_UsingPolyTree && this.FixupFirstLefts2(o, s), (o.IsHole ^ this.ReverseSolution) == this.Area$1(o) > 0 && this.ReversePolyPtLinks(o.Pts)) : (s.IsHole = o.IsHole, s.FirstLeft = o.FirstLeft, this.m_UsingPolyTree && this.FixupFirstLefts1(o, s))) : (s.Pts = null, s.BottomPt = null, s.Idx = o.Idx, o.IsHole = f.IsHole, f === s && (o.FirstLeft = s.FirstLeft), s.FirstLeft = o, this.m_UsingPolyTree && this.FixupFirstLefts3(s, o)));
          }
        }
      }, e.Clipper.prototype.UpdateOutPtIdxs = function(t) {
        var n = t.Pts;
        do
          n.Idx = t.Idx, n = n.Prev;
        while (n !== t.Pts);
      }, e.Clipper.prototype.DoSimplePolygons = function() {
        for (var t = 0; t < this.m_PolyOuts.length; ) {
          var n = this.m_PolyOuts[t++], r = n.Pts;
          if (!(r === null || n.IsOpen))
            do {
              for (var o = r.Next; o !== n.Pts; ) {
                if (e.IntPoint.op_Equality(r.Pt, o.Pt) && o.Next !== r && o.Prev !== r) {
                  var s = r.Prev, f = o.Prev;
                  r.Prev = f, f.Next = r, o.Prev = s, s.Next = o, n.Pts = r;
                  var d = this.CreateOutRec();
                  d.Pts = o, this.UpdateOutPtIdxs(d), this.Poly2ContainsPoly1(d.Pts, n.Pts) ? (d.IsHole = !n.IsHole, d.FirstLeft = n, this.m_UsingPolyTree && this.FixupFirstLefts2(d, n)) : this.Poly2ContainsPoly1(n.Pts, d.Pts) ? (d.IsHole = n.IsHole, n.IsHole = !d.IsHole, d.FirstLeft = n.FirstLeft, n.FirstLeft = d, this.m_UsingPolyTree && this.FixupFirstLefts2(n, d)) : (d.IsHole = n.IsHole, d.FirstLeft = n.FirstLeft, this.m_UsingPolyTree && this.FixupFirstLefts1(n, d)), o = r;
                }
                o = o.Next;
              }
              r = r.Next;
            } while (r !== n.Pts);
        }
      }, e.Clipper.Area = function(t) {
        if (!Array.isArray(t))
          return 0;
        var n = t.length;
        if (n < 3)
          return 0;
        for (var r = 0, o = 0, s = n - 1; o < n; ++o)
          r += (t[s].X + t[o].X) * (t[s].Y - t[o].Y), s = o;
        return -r * 0.5;
      }, e.Clipper.prototype.Area = function(t) {
        var n = t;
        if (t === null) return 0;
        var r = 0;
        do
          r = r + (t.Prev.Pt.X + t.Pt.X) * (t.Prev.Pt.Y - t.Pt.Y), t = t.Next;
        while (t !== n);
        return r * 0.5;
      }, e.Clipper.prototype.Area$1 = function(t) {
        return this.Area(t.Pts);
      }, e.Clipper.SimplifyPolygon = function(t, n) {
        var r = new Array(), o = new e.Clipper(0);
        return o.StrictlySimple = !0, o.AddPath(t, e.PolyType.ptSubject, !0), o.Execute(e.ClipType.ctUnion, r, n, n), r;
      }, e.Clipper.SimplifyPolygons = function(t, n) {
        typeof n > "u" && (n = e.PolyFillType.pftEvenOdd);
        var r = new Array(), o = new e.Clipper(0);
        return o.StrictlySimple = !0, o.AddPaths(t, e.PolyType.ptSubject, !0), o.Execute(e.ClipType.ctUnion, r, n, n), r;
      }, e.Clipper.DistanceSqrd = function(t, n) {
        var r = t.X - n.X, o = t.Y - n.Y;
        return r * r + o * o;
      }, e.Clipper.DistanceFromLineSqrd = function(t, n, r) {
        var o = n.Y - r.Y, s = r.X - n.X, f = o * n.X + s * n.Y;
        return f = o * t.X + s * t.Y - f, f * f / (o * o + s * s);
      }, e.Clipper.SlopesNearCollinear = function(t, n, r, o) {
        return Math.abs(t.X - n.X) > Math.abs(t.Y - n.Y) ? t.X > n.X == t.X < r.X ? e.Clipper.DistanceFromLineSqrd(t, n, r) < o : n.X > t.X == n.X < r.X ? e.Clipper.DistanceFromLineSqrd(n, t, r) < o : e.Clipper.DistanceFromLineSqrd(r, t, n) < o : t.Y > n.Y == t.Y < r.Y ? e.Clipper.DistanceFromLineSqrd(t, n, r) < o : n.Y > t.Y == n.Y < r.Y ? e.Clipper.DistanceFromLineSqrd(n, t, r) < o : e.Clipper.DistanceFromLineSqrd(r, t, n) < o;
      }, e.Clipper.PointsAreClose = function(t, n, r) {
        var o = t.X - n.X, s = t.Y - n.Y;
        return o * o + s * s <= r;
      }, e.Clipper.ExcludeOp = function(t) {
        var n = t.Prev;
        return n.Next = t.Next, t.Next.Prev = n, n.Idx = 0, n;
      }, e.Clipper.CleanPolygon = function(t, n) {
        typeof n > "u" && (n = 1.415);
        var r = t.length;
        if (r === 0)
          return new Array();
        for (var o = new Array(r), s = 0; s < r; ++s)
          o[s] = new e.OutPt();
        for (var s = 0; s < r; ++s)
          o[s].Pt = t[s], o[s].Next = o[(s + 1) % r], o[s].Next.Prev = o[s], o[s].Idx = 0;
        for (var f = n * n, d = o[0]; d.Idx === 0 && d.Next !== d.Prev; )
          e.Clipper.PointsAreClose(d.Pt, d.Prev.Pt, f) ? (d = e.Clipper.ExcludeOp(d), r--) : e.Clipper.PointsAreClose(d.Prev.Pt, d.Next.Pt, f) ? (e.Clipper.ExcludeOp(d.Next), d = e.Clipper.ExcludeOp(d), r -= 2) : e.Clipper.SlopesNearCollinear(d.Prev.Pt, d.Pt, d.Next.Pt, f) ? (d = e.Clipper.ExcludeOp(d), r--) : (d.Idx = 1, d = d.Next);
        r < 3 && (r = 0);
        for (var y = new Array(r), s = 0; s < r; ++s)
          y[s] = new e.IntPoint1(d.Pt), d = d.Next;
        return o = null, y;
      }, e.Clipper.CleanPolygons = function(t, n) {
        for (var r = new Array(t.length), o = 0, s = t.length; o < s; o++)
          r[o] = e.Clipper.CleanPolygon(t[o], n);
        return r;
      }, e.Clipper.Minkowski = function(t, n, r, o) {
        var s = o ? 1 : 0, f = t.length, d = n.length, y = new Array();
        if (r)
          for (var P = 0; P < d; P++) {
            for (var v = new Array(f), w = 0, I = t.length, S = t[w]; w < I; w++, S = t[w])
              v[w] = new e.IntPoint2(n[P].X + S.X, n[P].Y + S.Y);
            y.push(v);
          }
        else
          for (var P = 0; P < d; P++) {
            for (var v = new Array(f), w = 0, I = t.length, S = t[w]; w < I; w++, S = t[w])
              v[w] = new e.IntPoint2(n[P].X - S.X, n[P].Y - S.Y);
            y.push(v);
          }
        for (var M = new Array(), P = 0; P < d - 1 + s; P++)
          for (var w = 0; w < f; w++) {
            var X = new Array();
            X.push(y[P % d][w % f]), X.push(y[(P + 1) % d][w % f]), X.push(y[(P + 1) % d][(w + 1) % f]), X.push(y[P % d][(w + 1) % f]), e.Clipper.Orientation(X) || X.reverse(), M.push(X);
          }
        return M;
      }, e.Clipper.MinkowskiSum = function(t, n, r) {
        if (n[0] instanceof Array) {
          for (var s = n, d = new e.Paths(), f = new e.Clipper(), y = 0; y < s.length; ++y) {
            var P = e.Clipper.Minkowski(t, s[y], !0, r);
            if (f.AddPaths(P, e.PolyType.ptSubject, !0), r) {
              var o = e.Clipper.TranslatePath(s[y], t[0]);
              f.AddPath(o, e.PolyType.ptClip, !0);
            }
          }
          return f.Execute(
            e.ClipType.ctUnion,
            d,
            e.PolyFillType.pftNonZero,
            e.PolyFillType.pftNonZero
          ), d;
        } else {
          var o = n, s = e.Clipper.Minkowski(t, o, !0, r), f = new e.Clipper();
          return f.AddPaths(s, e.PolyType.ptSubject, !0), f.Execute(e.ClipType.ctUnion, s, e.PolyFillType.pftNonZero, e.PolyFillType.pftNonZero), s;
        }
      }, e.Clipper.TranslatePath = function(t, n) {
        for (var r = new e.Path(), o = 0; o < t.length; o++)
          r.push(new e.IntPoint2(t[o].X + n.X, t[o].Y + n.Y));
        return r;
      }, e.Clipper.MinkowskiDiff = function(t, n) {
        var r = e.Clipper.Minkowski(t, n, !1, !0), o = new e.Clipper();
        return o.AddPaths(r, e.PolyType.ptSubject, !0), o.Execute(e.ClipType.ctUnion, r, e.PolyFillType.pftNonZero, e.PolyFillType.pftNonZero), r;
      }, e.Clipper.PolyTreeToPaths = function(t) {
        var n = new Array();
        return e.Clipper.AddPolyNodeToPaths(t, e.Clipper.NodeType.ntAny, n), n;
      }, e.Clipper.AddPolyNodeToPaths = function(t, n, r) {
        var o = !0;
        switch (n) {
          case e.Clipper.NodeType.ntOpen:
            return;
          case e.Clipper.NodeType.ntClosed:
            o = !t.IsOpen;
            break;
        }
        t.m_polygon.length > 0 && o && r.push(t.m_polygon);
        for (var s = 0, f = t.Childs(), d = f.length, y = f[s]; s < d; s++, y = f[s])
          e.Clipper.AddPolyNodeToPaths(y, n, r);
      }, e.Clipper.OpenPathsFromPolyTree = function(t) {
        for (var n = new e.Paths(), r = 0, o = t.ChildCount(); r < o; r++)
          t.Childs()[r].IsOpen && n.push(t.Childs()[r].m_polygon);
        return n;
      }, e.Clipper.ClosedPathsFromPolyTree = function(t) {
        var n = new e.Paths();
        return e.Clipper.AddPolyNodeToPaths(t, e.Clipper.NodeType.ntClosed, n), n;
      }, Te(e.Clipper, e.ClipperBase), e.Clipper.NodeType = {
        ntAny: 0,
        ntOpen: 1,
        ntClosed: 2
      }, e.ClipperOffset = function(t, n) {
        typeof t > "u" && (t = 2), typeof n > "u" && (n = e.ClipperOffset.def_arc_tolerance), this.m_destPolys = new e.Paths(), this.m_srcPoly = new e.Path(), this.m_destPoly = new e.Path(), this.m_normals = new Array(), this.m_delta = 0, this.m_sinA = 0, this.m_sin = 0, this.m_cos = 0, this.m_miterLim = 0, this.m_StepsPerRad = 0, this.m_lowest = new e.IntPoint0(), this.m_polyNodes = new e.PolyNode(), this.MiterLimit = t, this.ArcTolerance = n, this.m_lowest.X = -1;
      }, e.ClipperOffset.two_pi = 6.28318530717959, e.ClipperOffset.def_arc_tolerance = 0.25, e.ClipperOffset.prototype.Clear = function() {
        e.Clear(this.m_polyNodes.Childs()), this.m_lowest.X = -1;
      }, e.ClipperOffset.Round = e.Clipper.Round, e.ClipperOffset.prototype.AddPath = function(t, n, r) {
        var o = t.length - 1;
        if (!(o < 0)) {
          var s = new e.PolyNode();
          if (s.m_jointype = n, s.m_endtype = r, r === e.EndType.etClosedLine || r === e.EndType.etClosedPolygon)
            for (; o > 0 && e.IntPoint.op_Equality(t[0], t[o]); )
              o--;
          s.m_polygon.push(t[0]);
          for (var f = 0, d = 0, y = 1; y <= o; y++)
            e.IntPoint.op_Inequality(s.m_polygon[f], t[y]) && (f++, s.m_polygon.push(t[y]), (t[y].Y > s.m_polygon[d].Y || t[y].Y === s.m_polygon[d].Y && t[y].X < s.m_polygon[d].X) && (d = f));
          if (!(r === e.EndType.etClosedPolygon && f < 2) && (this.m_polyNodes.AddChild(s), r === e.EndType.etClosedPolygon))
            if (this.m_lowest.X < 0)
              this.m_lowest = new e.IntPoint2(this.m_polyNodes.ChildCount() - 1, d);
            else {
              var P = this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y];
              (s.m_polygon[d].Y > P.Y || s.m_polygon[d].Y === P.Y && s.m_polygon[d].X < P.X) && (this.m_lowest = new e.IntPoint2(this.m_polyNodes.ChildCount() - 1, d));
            }
        }
      }, e.ClipperOffset.prototype.AddPaths = function(t, n, r) {
        for (var o = 0, s = t.length; o < s; o++)
          this.AddPath(t[o], n, r);
      }, e.ClipperOffset.prototype.FixOrientations = function() {
        if (this.m_lowest.X >= 0 && !e.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon))
          for (var t = 0; t < this.m_polyNodes.ChildCount(); t++) {
            var n = this.m_polyNodes.Childs()[t];
            (n.m_endtype === e.EndType.etClosedPolygon || n.m_endtype === e.EndType.etClosedLine && e.Clipper.Orientation(n.m_polygon)) && n.m_polygon.reverse();
          }
        else
          for (var t = 0; t < this.m_polyNodes.ChildCount(); t++) {
            var n = this.m_polyNodes.Childs()[t];
            n.m_endtype === e.EndType.etClosedLine && !e.Clipper.Orientation(n.m_polygon) && n.m_polygon.reverse();
          }
      }, e.ClipperOffset.GetUnitNormal = function(t, n) {
        var r = n.X - t.X, o = n.Y - t.Y;
        if (r === 0 && o === 0)
          return new e.DoublePoint2(0, 0);
        var s = 1 / Math.sqrt(r * r + o * o);
        return r *= s, o *= s, new e.DoublePoint2(o, -r);
      }, e.ClipperOffset.prototype.DoOffset = function(t) {
        if (this.m_destPolys = new Array(), this.m_delta = t, e.ClipperBase.near_zero(t)) {
          for (var n = 0; n < this.m_polyNodes.ChildCount(); n++) {
            var r = this.m_polyNodes.Childs()[n];
            r.m_endtype === e.EndType.etClosedPolygon && this.m_destPolys.push(r.m_polygon);
          }
          return;
        }
        this.MiterLimit > 2 ? this.m_miterLim = 2 / (this.MiterLimit * this.MiterLimit) : this.m_miterLim = 0.5;
        var o;
        this.ArcTolerance <= 0 ? o = e.ClipperOffset.def_arc_tolerance : this.ArcTolerance > Math.abs(t) * e.ClipperOffset.def_arc_tolerance ? o = Math.abs(t) * e.ClipperOffset.def_arc_tolerance : o = this.ArcTolerance;
        var s = 3.14159265358979 / Math.acos(1 - o / Math.abs(t));
        this.m_sin = Math.sin(e.ClipperOffset.two_pi / s), this.m_cos = Math.cos(e.ClipperOffset.two_pi / s), this.m_StepsPerRad = s / e.ClipperOffset.two_pi, t < 0 && (this.m_sin = -this.m_sin);
        for (var n = 0; n < this.m_polyNodes.ChildCount(); n++) {
          var r = this.m_polyNodes.Childs()[n];
          this.m_srcPoly = r.m_polygon;
          var f = this.m_srcPoly.length;
          if (!(f === 0 || t <= 0 && (f < 3 || r.m_endtype !== e.EndType.etClosedPolygon))) {
            if (this.m_destPoly = new Array(), f === 1) {
              if (r.m_jointype === e.JoinType.jtRound)
                for (var d = 1, y = 0, P = 1; P <= s; P++) {
                  this.m_destPoly.push(new e.IntPoint2(e.ClipperOffset.Round(this.m_srcPoly[0].X + d * t), e.ClipperOffset.Round(this.m_srcPoly[0].Y + y * t)));
                  var v = d;
                  d = d * this.m_cos - this.m_sin * y, y = v * this.m_sin + y * this.m_cos;
                }
              else
                for (var d = -1, y = -1, P = 0; P < 4; ++P)
                  this.m_destPoly.push(new e.IntPoint2(e.ClipperOffset.Round(this.m_srcPoly[0].X + d * t), e.ClipperOffset.Round(this.m_srcPoly[0].Y + y * t))), d < 0 ? d = 1 : y < 0 ? y = 1 : d = -1;
              this.m_destPolys.push(this.m_destPoly);
              continue;
            }
            this.m_normals.length = 0;
            for (var P = 0; P < f - 1; P++)
              this.m_normals.push(e.ClipperOffset.GetUnitNormal(this.m_srcPoly[P], this.m_srcPoly[P + 1]));
            if (r.m_endtype === e.EndType.etClosedLine || r.m_endtype === e.EndType.etClosedPolygon ? this.m_normals.push(e.ClipperOffset.GetUnitNormal(this.m_srcPoly[f - 1], this.m_srcPoly[0])) : this.m_normals.push(new e.DoublePoint1(this.m_normals[f - 2])), r.m_endtype === e.EndType.etClosedPolygon) {
              for (var w = f - 1, P = 0; P < f; P++)
                w = this.OffsetPoint(P, w, r.m_jointype);
              this.m_destPolys.push(this.m_destPoly);
            } else if (r.m_endtype === e.EndType.etClosedLine) {
              for (var w = f - 1, P = 0; P < f; P++)
                w = this.OffsetPoint(P, w, r.m_jointype);
              this.m_destPolys.push(this.m_destPoly), this.m_destPoly = new Array();
              for (var I = this.m_normals[f - 1], P = f - 1; P > 0; P--)
                this.m_normals[P] = new e.DoublePoint2(-this.m_normals[P - 1].X, -this.m_normals[P - 1].Y);
              this.m_normals[0] = new e.DoublePoint2(-I.X, -I.Y), w = 0;
              for (var P = f - 1; P >= 0; P--)
                w = this.OffsetPoint(P, w, r.m_jointype);
              this.m_destPolys.push(this.m_destPoly);
            } else {
              for (var w = 0, P = 1; P < f - 1; ++P)
                w = this.OffsetPoint(P, w, r.m_jointype);
              var S;
              if (r.m_endtype === e.EndType.etOpenButt) {
                var P = f - 1;
                S = new e.IntPoint2(e.ClipperOffset.Round(this.m_srcPoly[P].X + this.m_normals[P].X * t), e.ClipperOffset.Round(this.m_srcPoly[P].Y + this.m_normals[P].Y * t)), this.m_destPoly.push(S), S = new e.IntPoint2(e.ClipperOffset.Round(this.m_srcPoly[P].X - this.m_normals[P].X * t), e.ClipperOffset.Round(this.m_srcPoly[P].Y - this.m_normals[P].Y * t)), this.m_destPoly.push(S);
              } else {
                var P = f - 1;
                w = f - 2, this.m_sinA = 0, this.m_normals[P] = new e.DoublePoint2(-this.m_normals[P].X, -this.m_normals[P].Y), r.m_endtype === e.EndType.etOpenSquare ? this.DoSquare(P, w) : this.DoRound(P, w);
              }
              for (var P = f - 1; P > 0; P--)
                this.m_normals[P] = new e.DoublePoint2(-this.m_normals[P - 1].X, -this.m_normals[P - 1].Y);
              this.m_normals[0] = new e.DoublePoint2(-this.m_normals[1].X, -this.m_normals[1].Y), w = f - 1;
              for (var P = w - 1; P > 0; --P)
                w = this.OffsetPoint(P, w, r.m_jointype);
              r.m_endtype === e.EndType.etOpenButt ? (S = new e.IntPoint2(e.ClipperOffset.Round(this.m_srcPoly[0].X - this.m_normals[0].X * t), e.ClipperOffset.Round(this.m_srcPoly[0].Y - this.m_normals[0].Y * t)), this.m_destPoly.push(S), S = new e.IntPoint2(e.ClipperOffset.Round(this.m_srcPoly[0].X + this.m_normals[0].X * t), e.ClipperOffset.Round(this.m_srcPoly[0].Y + this.m_normals[0].Y * t)), this.m_destPoly.push(S)) : (w = 1, this.m_sinA = 0, r.m_endtype === e.EndType.etOpenSquare ? this.DoSquare(0, 1) : this.DoRound(0, 1)), this.m_destPolys.push(this.m_destPoly);
            }
          }
        }
      }, e.ClipperOffset.prototype.Execute = function() {
        var t = arguments, n = t[0] instanceof e.PolyTree;
        if (n) {
          var r = t[0], o = t[1];
          r.Clear(), this.FixOrientations(), this.DoOffset(o);
          var s = new e.Clipper(0);
          if (s.AddPaths(this.m_destPolys, e.PolyType.ptSubject, !0), o > 0)
            s.Execute(e.ClipType.ctUnion, r, e.PolyFillType.pftPositive, e.PolyFillType.pftPositive);
          else {
            var f = e.Clipper.GetBounds(this.m_destPolys), d = new e.Path();
            if (d.push(new e.IntPoint2(f.left - 10, f.bottom + 10)), d.push(new e.IntPoint2(f.right + 10, f.bottom + 10)), d.push(new e.IntPoint2(f.right + 10, f.top - 10)), d.push(new e.IntPoint2(f.left - 10, f.top - 10)), s.AddPath(d, e.PolyType.ptSubject, !0), s.ReverseSolution = !0, s.Execute(e.ClipType.ctUnion, r, e.PolyFillType.pftNegative, e.PolyFillType.pftNegative), r.ChildCount() === 1 && r.Childs()[0].ChildCount() > 0) {
              var y = r.Childs()[0];
              r.Childs()[0] = y.Childs()[0], r.Childs()[0].m_Parent = r;
              for (var P = 1; P < y.ChildCount(); P++)
                r.AddChild(y.Childs()[P]);
            } else
              r.Clear();
          }
        } else {
          var r = t[0], o = t[1];
          e.Clear(r), this.FixOrientations(), this.DoOffset(o);
          var s = new e.Clipper(0);
          if (s.AddPaths(this.m_destPolys, e.PolyType.ptSubject, !0), o > 0)
            s.Execute(e.ClipType.ctUnion, r, e.PolyFillType.pftPositive, e.PolyFillType.pftPositive);
          else {
            var f = e.Clipper.GetBounds(this.m_destPolys), d = new e.Path();
            d.push(new e.IntPoint2(f.left - 10, f.bottom + 10)), d.push(new e.IntPoint2(f.right + 10, f.bottom + 10)), d.push(new e.IntPoint2(f.right + 10, f.top - 10)), d.push(new e.IntPoint2(f.left - 10, f.top - 10)), s.AddPath(d, e.PolyType.ptSubject, !0), s.ReverseSolution = !0, s.Execute(e.ClipType.ctUnion, r, e.PolyFillType.pftNegative, e.PolyFillType.pftNegative), r.length > 0 && r.splice(0, 1);
          }
        }
      }, e.ClipperOffset.prototype.OffsetPoint = function(t, n, r) {
        if (this.m_sinA = this.m_normals[n].X * this.m_normals[t].Y - this.m_normals[t].X * this.m_normals[n].Y, Math.abs(this.m_sinA * this.m_delta) < 1) {
          var o = this.m_normals[n].X * this.m_normals[t].X + this.m_normals[t].Y * this.m_normals[n].Y;
          if (o > 0)
            return this.m_destPoly.push(new e.IntPoint2(
              e.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_normals[n].X * this.m_delta),
              e.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_normals[n].Y * this.m_delta)
            )), n;
        } else this.m_sinA > 1 ? this.m_sinA = 1 : this.m_sinA < -1 && (this.m_sinA = -1);
        if (this.m_sinA * this.m_delta < 0)
          this.m_destPoly.push(new e.IntPoint2(
            e.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_normals[n].X * this.m_delta),
            e.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_normals[n].Y * this.m_delta)
          )), this.m_destPoly.push(new e.IntPoint1(this.m_srcPoly[t])), this.m_destPoly.push(new e.IntPoint2(
            e.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_normals[t].X * this.m_delta),
            e.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_normals[t].Y * this.m_delta)
          ));
        else
          switch (r) {
            case e.JoinType.jtMiter: {
              var s = 1 + (this.m_normals[t].X * this.m_normals[n].X + this.m_normals[t].Y * this.m_normals[n].Y);
              s >= this.m_miterLim ? this.DoMiter(t, n, s) : this.DoSquare(t, n);
              break;
            }
            case e.JoinType.jtSquare:
              this.DoSquare(t, n);
              break;
            case e.JoinType.jtRound:
              this.DoRound(t, n);
              break;
          }
        return n = t, n;
      }, e.ClipperOffset.prototype.DoSquare = function(t, n) {
        var r = Math.tan(Math.atan2(
          this.m_sinA,
          this.m_normals[n].X * this.m_normals[t].X + this.m_normals[n].Y * this.m_normals[t].Y
        ) / 4);
        this.m_destPoly.push(new e.IntPoint2(
          e.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_delta * (this.m_normals[n].X - this.m_normals[n].Y * r)),
          e.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_delta * (this.m_normals[n].Y + this.m_normals[n].X * r))
        )), this.m_destPoly.push(new e.IntPoint2(
          e.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_delta * (this.m_normals[t].X + this.m_normals[t].Y * r)),
          e.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_delta * (this.m_normals[t].Y - this.m_normals[t].X * r))
        ));
      }, e.ClipperOffset.prototype.DoMiter = function(t, n, r) {
        var o = this.m_delta / r;
        this.m_destPoly.push(new e.IntPoint2(
          e.ClipperOffset.Round(this.m_srcPoly[t].X + (this.m_normals[n].X + this.m_normals[t].X) * o),
          e.ClipperOffset.Round(this.m_srcPoly[t].Y + (this.m_normals[n].Y + this.m_normals[t].Y) * o)
        ));
      }, e.ClipperOffset.prototype.DoRound = function(t, n) {
        for (var r = Math.atan2(
          this.m_sinA,
          this.m_normals[n].X * this.m_normals[t].X + this.m_normals[n].Y * this.m_normals[t].Y
        ), o = Math.max(e.Cast_Int32(e.ClipperOffset.Round(this.m_StepsPerRad * Math.abs(r))), 1), s = this.m_normals[n].X, f = this.m_normals[n].Y, d, y = 0; y < o; ++y)
          this.m_destPoly.push(new e.IntPoint2(
            e.ClipperOffset.Round(this.m_srcPoly[t].X + s * this.m_delta),
            e.ClipperOffset.Round(this.m_srcPoly[t].Y + f * this.m_delta)
          )), d = s, s = s * this.m_cos - this.m_sin * f, f = d * this.m_sin + f * this.m_cos;
        this.m_destPoly.push(new e.IntPoint2(
          e.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_normals[t].X * this.m_delta),
          e.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_normals[t].Y * this.m_delta)
        ));
      }, e.Error = function(t) {
        try {
          throw new Error(t);
        } catch (n) {
          alert(n.message);
        }
      }, e.JS = {}, e.JS.AreaOfPolygon = function(t, n) {
        return n || (n = 1), e.Clipper.Area(t) / (n * n);
      }, e.JS.AreaOfPolygons = function(t, n) {
        n || (n = 1);
        for (var r = 0, o = 0; o < t.length; o++)
          r += e.Clipper.Area(t[o]);
        return r / (n * n);
      }, e.JS.BoundsOfPath = function(t, n) {
        return e.JS.BoundsOfPaths([t], n);
      }, e.JS.BoundsOfPaths = function(t, n) {
        n || (n = 1);
        var r = e.Clipper.GetBounds(t);
        return r.left /= n, r.bottom /= n, r.right /= n, r.top /= n, r;
      }, e.JS.Clean = function(o, n) {
        if (!(o instanceof Array)) return [];
        var r = o[0] instanceof Array, o = e.JS.Clone(o);
        if (typeof n != "number" || n === null)
          return e.Error("Delta is not a number in Clean()."), o;
        if (o.length === 0 || o.length === 1 && o[0].length === 0 || n < 0) return o;
        r || (o = [o]);
        for (var s = o.length, f, d, y, P, v, w, I, S = [], M = 0; M < s; M++)
          if (d = o[M], f = d.length, f !== 0) {
            if (f < 3) {
              y = d, S.push(y);
              continue;
            }
            for (y = d, P = n * n, v = d[0], w = 1, I = 1; I < f; I++)
              (d[I].X - v.X) * (d[I].X - v.X) + (d[I].Y - v.Y) * (d[I].Y - v.Y) <= P || (y[w] = d[I], v = d[I], w++);
            v = d[w - 1], (d[0].X - v.X) * (d[0].X - v.X) + (d[0].Y - v.Y) * (d[0].Y - v.Y) <= P && w--, w < f && y.splice(w, f - w), y.length && S.push(y);
          }
        return !r && S.length ? S = S[0] : !r && S.length === 0 ? S = [] : r && S.length === 0 && (S = [
          []
        ]), S;
      }, e.JS.Clone = function(t) {
        if (!(t instanceof Array)) return [];
        if (t.length === 0) return [];
        if (t.length === 1 && t[0].length === 0) return [
          []
        ];
        var n = t[0] instanceof Array;
        n || (t = [t]);
        var r = t.length, o, s, f, d, y = new Array(r);
        for (s = 0; s < r; s++) {
          for (o = t[s].length, d = new Array(o), f = 0; f < o; f++)
            d[f] = {
              X: t[s][f].X,
              Y: t[s][f].Y
            };
          y[s] = d;
        }
        return n || (y = y[0]), y;
      }, e.JS.Lighten = function(t, n) {
        if (!(t instanceof Array)) return [];
        if (typeof n != "number" || n === null)
          return e.Error("Tolerance is not a number in Lighten()."), e.JS.Clone(t);
        if (t.length === 0 || t.length === 1 && t[0].length === 0 || n < 0)
          return e.JS.Clone(t);
        var r = t[0] instanceof Array;
        r || (t = [t]);
        var o, s, f, d, y, P, v, w, I, S, M, X, Y, F, J, nt, xt, Br = t.length, Xr = n * n, vt = [];
        for (o = 0; o < Br; o++)
          if (f = t[o], P = f.length, P !== 0) {
            for (d = 0; d < 1e6; d++) {
              for (y = [], P = f.length, f[P - 1].X !== f[0].X || f[P - 1].Y !== f[0].Y ? (X = 1, f.push(
                {
                  X: f[0].X,
                  Y: f[0].Y
                }
              ), P = f.length) : X = 0, M = [], s = 0; s < P - 2; s++)
                v = f[s], I = f[s + 1], w = f[s + 2], nt = v.X, xt = v.Y, Y = w.X - nt, F = w.Y - xt, (Y !== 0 || F !== 0) && (J = ((I.X - nt) * Y + (I.Y - xt) * F) / (Y * Y + F * F), J > 1 ? (nt = w.X, xt = w.Y) : J > 0 && (nt += Y * J, xt += F * J)), Y = I.X - nt, F = I.Y - xt, S = Y * Y + F * F, S <= Xr && (M[s + 1] = 1, s++);
              for (y.push(
                {
                  X: f[0].X,
                  Y: f[0].Y
                }
              ), s = 1; s < P - 1; s++)
                M[s] || y.push(
                  {
                    X: f[s].X,
                    Y: f[s].Y
                  }
                );
              if (y.push(
                {
                  X: f[P - 1].X,
                  Y: f[P - 1].Y
                }
              ), X && f.pop(), M.length) f = y;
              else break;
            }
            P = y.length, y[P - 1].X === y[0].X && y[P - 1].Y === y[0].Y && y.pop(), y.length > 2 && vt.push(y);
          }
        return r || (vt = vt[0]), typeof vt > "u" && (vt = []), vt;
      }, e.JS.PerimeterOfPath = function(t, n, r) {
        if (typeof t > "u") return 0;
        var o = Math.sqrt, s = 0, f, d, y = 0, P = 0, v = 0, w = 0, I = t.length;
        if (I < 2) return 0;
        for (n && (t[I] = t[0], I++); --I; )
          f = t[I], y = f.X, P = f.Y, d = t[I - 1], v = d.X, w = d.Y, s += o((y - v) * (y - v) + (P - w) * (P - w));
        return n && t.pop(), s / r;
      }, e.JS.PerimeterOfPaths = function(t, n, r) {
        r || (r = 1);
        for (var o = 0, s = 0; s < t.length; s++)
          o += e.JS.PerimeterOfPath(t[s], n, r);
        return o;
      }, e.JS.ScaleDownPath = function(t, n) {
        var r, o;
        for (n || (n = 1), r = t.length; r--; )
          o = t[r], o.X = o.X / n, o.Y = o.Y / n;
      }, e.JS.ScaleDownPaths = function(t, n) {
        var r, o, s;
        for (n || (n = 1), r = t.length; r--; )
          for (o = t[r].length; o--; )
            s = t[r][o], s.X = s.X / n, s.Y = s.Y / n;
      }, e.JS.ScaleUpPath = function(t, n) {
        var r, o, s = Math.round;
        for (n || (n = 1), r = t.length; r--; )
          o = t[r], o.X = s(o.X * n), o.Y = s(o.Y * n);
      }, e.JS.ScaleUpPaths = function(t, n) {
        var r, o, s, f = Math.round;
        for (n || (n = 1), r = t.length; r--; )
          for (o = t[r].length; o--; )
            s = t[r][o], s.X = f(s.X * n), s.Y = f(s.Y * n);
      }, e.ExPolygons = function() {
        return [];
      }, e.ExPolygon = function() {
        this.outer = null, this.holes = null;
      }, e.JS.AddOuterPolyNodeToExPolygons = function(t, n) {
        var r = new e.ExPolygon();
        r.outer = t.Contour();
        var o = t.Childs(), s = o.length;
        r.holes = new Array(s);
        var f, d, y, P, v, w;
        for (y = 0; y < s; y++)
          for (f = o[y], r.holes[y] = f.Contour(), P = 0, v = f.Childs(), w = v.length; P < w; P++)
            d = v[P], e.JS.AddOuterPolyNodeToExPolygons(d, n);
        n.push(r);
      }, e.JS.ExPolygonsToPaths = function(t) {
        var n, r, o, s, f = new e.Paths();
        for (n = 0, o = t.length; n < o; n++)
          for (f.push(t[n].outer), r = 0, s = t[n].holes.length; r < s; r++)
            f.push(t[n].holes[r]);
        return f;
      }, e.JS.PolyTreeToExPolygons = function(t) {
        var n = new e.ExPolygons(), r, o, s, f;
        for (o = 0, s = t.Childs(), f = s.length; o < f; o++)
          r = s[o], e.JS.AddOuterPolyNodeToExPolygons(r, n);
        return n;
      };
    })();
  })($t)), $t.exports;
}
var Tl = Il();
const Bt = /* @__PURE__ */ Cl(Tl);
function Ji(i) {
  return !!i && typeof i == "object" && !Array.isArray(i);
}
function xe(i) {
  const e = Xi.load(i);
  return Ji(e) ? e : {};
}
function gl(i, e) {
  if (typeof i == "number") return i;
  if (typeof i != "string") return e;
  const l = i.replace(/\s/g, ""), a = Number(l);
  if (!Number.isNaN(a)) return a;
  const u = l.split("/");
  if (u.length === 2) {
    const c = Number(u[0].replace(/\.+$/, "")), p = Number(u[1].replace(/\.+$/, ""));
    if (!Number.isNaN(c) && !Number.isNaN(p) && p !== 0)
      return c / p;
  }
  return e;
}
function le(i, e) {
  for (const l of i || [])
    if (Object.prototype.hasOwnProperty.call(l, e))
      return l[e];
  return null;
}
function ae(i) {
  if (Array.isArray(i)) {
    for (const e of i) {
      const l = ae(e);
      if (l) return l;
    }
    return null;
  }
  if (!Ji(i))
    return null;
  for (const [e, l] of Object.entries(i)) {
    if (e === "model_name" && typeof l == "string" && l.trim())
      return l;
    const a = ae(l);
    if (a) return a;
  }
  return null;
}
function wl(i) {
  const e = xe(i), l = [
    e.Global?.model_name,
    e.model_name
  ];
  for (const a of l)
    if (typeof a == "string" && a.trim())
      return a;
  return ae(e);
}
function $i(i, e, l, a) {
  const u = new Float32Array(3 * e * l), c = e * l, p = a.mean, h = a.std, m = a.scale;
  for (let x = 0; x < l; x += 1)
    for (let C = 0; C < e; C += 1) {
      const _ = x * e + C, g = _ * 3, T = i[g], A = i[g + 1], O = i[g + 2];
      u[_] = (T * m - p[0]) / h[0], u[_ + c] = (A * m - p[1]) / h[1], u[_ + 2 * c] = (O * m - p[2]) / h[2];
    }
  return u;
}
function Al(i) {
  const e = i.slice().sort((p, h) => p[0] - h[0]);
  let l, a, u, c;
  return e[1][1] > e[0][1] ? (l = 0, c = 1) : (l = 1, c = 0), e[3][1] > e[2][1] ? (a = 2, u = 3) : (a = 3, u = 2), [e[l], e[a], e[u], e[c]];
}
function Ki(i) {
  let e = 0;
  for (let l = 0; l < i.length; l += 1) {
    const a = (l + 1) % i.length;
    e += i[l][0] * i[a][1] - i[a][0] * i[l][1];
  }
  return Math.abs(e) * 0.5;
}
function Sl(i) {
  let e = 0;
  for (let l = 0; l < i.length; l += 1) {
    const a = (l + 1) % i.length;
    e += se(i[l], i[a]);
  }
  return e;
}
function Ll(i) {
  let e = null, l = 0;
  for (const a of i) {
    if (a.length < 4) continue;
    const u = a.map((p) => [p.X, p.Y]), c = Ki(u);
    c > l && (l = c, e = a);
  }
  return e;
}
function Ol(i, e) {
  const l = Ki(i), a = Sl(i);
  if (a <= 0) return null;
  const u = l * e / a, c = i.map((x) => ({ X: Math.trunc(x[0]), Y: Math.trunc(x[1]) })), p = new Bt.ClipperOffset();
  p.AddPath(c, Bt.JoinType.jtRound, Bt.EndType.etClosedPolygon);
  const h = new Bt.Paths();
  p.Execute(h, u);
  const m = Ll(h);
  return m ? m.map((x) => [x.X, x.Y]) : null;
}
function ue(i, e) {
  const l = [];
  for (const x of e) l.push(x[0], x[1]);
  const a = i.matFromArray(e.length, 1, i.CV_32FC2, l), u = i.minAreaRect(a), c = i.RotatedRect.points(u), p = [];
  for (let x = 0; x < 4; x += 1) p.push([c[x].x, c[x].y]);
  a.delete();
  const h = Al(p), m = Math.min(se(h[0], h[1]), se(h[1], h[2]));
  return { box: h, side: m };
}
function El(i, e, l) {
  const a = e.rows, u = e.cols;
  let c = u - 1, p = 0, h = a - 1, m = 0;
  for (const L of l)
    c = Math.min(c, L[0]), p = Math.max(p, L[0]), h = Math.min(h, L[1]), m = Math.max(m, L[1]);
  c = st(Math.floor(c), 0, u - 1), p = st(Math.ceil(p), 0, u - 1), h = st(Math.floor(h), 0, a - 1), m = st(Math.ceil(m), 0, a - 1);
  const x = Math.max(1, p - c + 1), C = Math.max(1, m - h + 1), _ = e.roi(new i.Rect(c, h, x, C)), g = i.Mat.zeros(C, x, i.CV_8UC1), T = l.map((L) => [Math.trunc(L[0] - c), Math.trunc(L[1] - h)]), A = [];
  for (const L of T) A.push(L[0], L[1]);
  const O = i.matFromArray(T.length, 1, i.CV_32SC2, A), E = new i.MatVector();
  E.push_back(O), i.fillPoly(g, E, new i.Scalar(1));
  const N = i.mean(_, g)[0];
  return _.delete(), g.delete(), O.delete(), E.delete(), N;
}
const Ze = 3, et = Object.freeze({
  resizeLong: 960,
  limitType: "max",
  maxSideLimit: 4e3,
  normalize: {
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225],
    scale: 1 / 255
  },
  postprocess: {
    thresh: 0.3,
    boxThresh: 0.6,
    maxCandidates: 1e3,
    unclipRatio: 2
  }
}), bl = Object.freeze({
  ...et
});
function Nl(i) {
  const e = typeof i == "string" ? i.trim().toLowerCase() : "";
  return e === "min" || e === "max" ? e : et.limitType;
}
function Ml(i) {
  const e = xe(i), a = e.PreProcess?.transform_ops, u = le(a, "DetResizeForTest"), c = le(a, "NormalizeImage"), p = e.PostProcess || {}, h = u?.max_side_limit, m = Number(h), x = Number.isFinite(m) && m > 0 ? m : et.maxSideLimit;
  return {
    resizeLong: Number(u?.resize_long ?? et.resizeLong),
    limitType: Nl(u?.limit_type),
    maxSideLimit: x,
    normalize: {
      mean: c?.mean ?? et.normalize.mean,
      std: c?.std ?? et.normalize.std,
      scale: gl(c?.scale, et.normalize.scale)
    },
    postprocess: {
      thresh: Number(p.thresh ?? et.postprocess.thresh),
      boxThresh: Number(
        p.box_thresh ?? et.postprocess.boxThresh
      ),
      maxCandidates: Number(
        p.max_candidates ?? et.postprocess.maxCandidates
      ),
      unclipRatio: Number(
        p.unclip_ratio ?? et.postprocess.unclipRatio
      )
    }
  };
}
function Dl(i, e) {
  return {
    limitSideLen: e?.limitSideLen ?? i.limitSideLen,
    limitType: e?.limitType ?? i.limitType,
    maxSideLimit: e?.maxSideLimit ?? i.maxSideLimit,
    thresh: e?.thresh ?? i.thresh,
    boxThresh: e?.boxThresh ?? i.boxThresh,
    unclipRatio: e?.unclipRatio ?? i.unclipRatio
  };
}
async function Bl({
  ort: i,
  modelBytes: e,
  configText: l,
  backend: a,
  webgpuState: u,
  batchSize: c
}) {
  Ri("Detection", {
    model: e,
    config: l
  });
  const p = Ml(l), h = Math.max(1, c ?? 1), m = {
    limitSideLen: p.resizeLong,
    limitType: p.limitType,
    maxSideLimit: p.maxSideLimit,
    thresh: p.postprocess.thresh,
    boxThresh: p.postprocess.boxThresh,
    unclipRatio: p.postprocess.unclipRatio
  };
  let x = await Xl(
    i,
    e,
    a,
    u
  );
  return {
    kind: "det",
    config: p,
    get provider() {
      return x?.provider || "";
    },
    async predict(C, _, g) {
      if (!x?.session)
        throw new Error("Detection model session is not initialized.");
      const T = Dl(m, g), A = Gi(g?.batchSize, h), O = [], E = {
        cv: C,
        ort: i,
        config: p,
        session: x.session
      };
      for (const N of Pe(_, A)) {
        const L = Yl({ cv: C, ort: i, config: p }, N, T), D = Wl(i, L), R = await Vi(x.session, D), W = zl(E, R, L, T);
        for (const z of W)
          O.push({
            boxes: z.boxes,
            srcW: z.prep.srcW,
            srcH: z.prep.srcH
          });
      }
      return O;
    },
    async dispose() {
      await zi(x?.session), x = null;
    }
  };
}
async function Xl(i, e, l, a) {
  const u = qi(l, a);
  return Zi(Hi(i, e, u), 6e4, "Detection model");
}
function Yl(i, e, l) {
  return e.map((a) => Fl(i, a, l));
}
function Fl(i, e, l) {
  const { cv: a, ort: u, config: c } = i, p = e.cols, h = e.rows, m = Math.max(32, l.limitSideLen), x = l.limitType, C = Math.max(32, l.maxSideLimit);
  let _ = 1;
  if (x === "max") {
    const N = Math.max(p, h);
    N > m && (_ = m / Math.max(1, N));
  } else {
    const N = Math.min(p, h);
    N < m && (_ = m / Math.max(1, N));
  }
  let g = Math.max(32, Math.round(p * _ / 32) * 32), T = Math.max(32, Math.round(h * _ / 32) * 32);
  if (Math.max(g, T) > C) {
    const N = C / Math.max(g, T);
    g = Math.max(32, Math.floor(g * N)), T = Math.max(32, Math.floor(T * N));
  }
  g = st(g, 32, C), T = st(T, 32, C), g = Math.max(32, Math.round(g / 32) * 32), T = Math.max(32, Math.round(T / 32) * 32);
  const A = new a.Mat(), O = new a.Mat();
  a.resize(e, A, new a.Size(g, T), 0, 0, a.INTER_LINEAR), A.channels() === 4 ? a.cvtColor(A, O, a.COLOR_RGBA2BGR) : A.channels() === 1 ? a.cvtColor(A, O, a.COLOR_GRAY2BGR) : A.copyTo(O);
  const E = $i(O.data, g, T, c.normalize);
  return A.delete(), O.delete(), {
    tensor: new u.Tensor("float32", E, [1, 3, T, g]),
    srcW: p,
    srcH: h,
    dstW: g,
    dstH: T
  };
}
function Rl(i) {
  const e = i.dims, l = i.data;
  if (e.length === 4) return { data: l, h: e[2], w: e[3] };
  if (e.length === 3) return { data: l, h: e[1], w: e[2] };
  throw new Error(`Unexpected det output dims: [${e.join(", ")}]`);
}
function kl(i, e, l, a) {
  const u = e.length, c = 3 * l * a, p = new Float32Array(u * c);
  for (let h = 0; h < u; h += 1) {
    const m = e[h], x = m.tensor.data, { dstH: C, dstW: _ } = m, g = h * c;
    for (let T = 0; T < 3; T += 1) {
      const A = T * C * _, O = g + T * l * a;
      for (let E = 0; E < C; E += 1) {
        const N = A + E * _, L = O + E * a;
        p.set(x.subarray(N, N + _), L);
      }
    }
  }
  return new i.Tensor("float32", p, [u, 3, l, a]);
}
function Wl(i, e) {
  const l = Math.max(...e.map((u) => u.dstH)), a = Math.max(...e.map((u) => u.dstW));
  return kl(i, e, l, a);
}
function Ul(i, e) {
  const l = i.slice(1).reduce((a, u) => a * u, 1);
  return e * l;
}
function ql(i, e, l, a, u, c) {
  const p = Math.max(1, Math.min(u, Math.round(u * i / l))), h = Math.max(1, Math.min(c, Math.round(c * e / a)));
  return { cropOh: p, cropOw: h };
}
function Hl(i, e, l, a, u, c, p) {
  const h = e.data, m = e.dims, x = Ul(m, l), C = new Float32Array(a * u);
  for (let _ = 0; _ < a; _ += 1) {
    const g = x + _ * p;
    C.set(h.subarray(g, g + u), _ * u);
  }
  return new i.Tensor("float32", C, [1, 1, a, u]);
}
function zl(i, e, l, a) {
  const { cv: u, ort: c, config: p } = i, h = e.dims;
  if (h.length !== 3 && h.length !== 4)
    throw new Error(`Unexpected det output dims: [${h.join(", ")}]`);
  const m = h.length === 4 ? h[2] : h[1], x = h.length === 4 ? h[3] : h[2], C = h.length === 4 ? h[0] : l.length === 1 ? 1 : h[0];
  if (C !== l.length)
    throw new Error(
      `Detection batch output N=${String(C)} does not match input batch ${String(l.length)}`
    );
  const _ = Math.max(...l.map((A) => A.dstH)), g = Math.max(...l.map((A) => A.dstW)), T = [];
  for (let A = 0; A < l.length; A += 1) {
    const O = l[A], { cropOh: E, cropOw: N } = ql(O.dstH, O.dstW, _, g, m, x), L = Hl(
      c,
      e,
      A,
      E,
      N,
      m,
      x
    ), D = Zl(
      { cv: u, config: p },
      L,
      O,
      a.thresh,
      a.boxThresh,
      a.unclipRatio
    );
    T.push({ prep: O, boxes: D });
  }
  return T;
}
function Zl(i, e, l, a, u, c) {
  const { cv: p, config: h } = i, { data: m, h: x, w: C } = Rl(e), _ = p.matFromArray(x, C, p.CV_32FC1, m), g = new Uint8Array(x * C);
  for (let L = 0; L < m.length; L += 1)
    g[L] = m[L] > a ? 255 : 0;
  const T = p.matFromArray(x, C, p.CV_8UC1, g), A = new p.MatVector(), O = new p.Mat();
  p.findContours(T, A, O, p.RETR_LIST, p.CHAIN_APPROX_SIMPLE);
  const E = [], N = Math.min(h.postprocess.maxCandidates, A.size());
  for (let L = 0; L < N; L += 1) {
    const D = A.get(L);
    if (D.rows < 4) {
      D.delete();
      continue;
    }
    const R = [];
    for (let U = 0; U < D.rows; U += 1)
      R.push([D.data32S[U * 2], D.data32S[U * 2 + 1]]);
    const W = ue(p, R);
    if (W.side < Ze) {
      D.delete();
      continue;
    }
    const z = El(p, _, W.box);
    if (z < u) {
      D.delete();
      continue;
    }
    const k = Ol(W.box, c);
    if (!k || k.length < 4) {
      D.delete();
      continue;
    }
    const tt = ue(p, k);
    if (tt.side < Ze + 2) {
      D.delete();
      continue;
    }
    const it = tt.box.map((U) => [
      st(Math.round(U[0] * l.srcW / Math.max(1, C)), 0, l.srcW),
      st(Math.round(U[1] * l.srcH / Math.max(1, x)), 0, l.srcH)
    ]);
    E.push({ poly: it, score: z }), D.delete();
  }
  _.delete(), T.delete(), A.delete(), O.delete(), E.sort((L, D) => L.poly[0][1] - D.poly[0][1] || L.poly[0][0] - D.poly[0][0]);
  for (let L = 0; L < E.length - 1; L += 1)
    for (let D = L; D >= 0 && (Math.abs(E[D + 1].poly[0][1] - E[D].poly[0][1]) < 10 && E[D + 1].poly[0][0] < E[D].poly[0][0]); D -= 1) {
      const R = E[D];
      E[D] = E[D + 1], E[D + 1] = R;
    }
  return E;
}
const Gl = "0123456789abcdefghijklmnopqrstuvwxyz".split(""), jl = Object.freeze({
  mean: [0.5, 0.5, 0.5],
  std: [0.5, 0.5, 0.5],
  scale: 1 / 255
}), Vl = Object.freeze({
  imageShape: [3, 48, 320],
  charDict: []
}), Jl = 3200, $l = Object.freeze({
  ...Vl
});
function Kl(i) {
  const e = xe(i), a = e.PreProcess?.transform_ops, u = le(a, "RecResizeImg"), p = (e.PostProcess || {}).character_dict, h = u?.image_shape;
  if (!h || !Array.isArray(h) || h.length < 3)
    throw new Error("RecResizeImg.image_shape is required in rec inference.yml");
  const m = Array.isArray(p) && p.length > 0 ? [...p, " "] : [...Gl, " "];
  return {
    imageShape: h,
    charDict: m
  };
}
async function Ql({
  ort: i,
  modelBytes: e,
  configText: l,
  backend: a,
  webgpuState: u,
  batchSize: c
}) {
  Ri("Recognition", {
    model: e,
    config: l
  });
  const p = Kl(l), h = Math.max(1, c ?? 1);
  let m = await ta(
    i,
    e,
    a,
    u
  );
  return {
    kind: "rec",
    config: p,
    get provider() {
      return m?.provider || "";
    },
    async predict(x, C, _) {
      if (!m?.session)
        throw new Error("Recognition model session is not initialized.");
      const g = Gi(_?.batchSize, h), A = ea({ cv: x, config: p }, C), O = p.charDict, E = A.slice().sort((D, R) => D.width - R.width), N = [], L = p.imageShape[1];
      for (const D of Pe(E, g)) {
        const R = ra(i, D, L), W = await Vi(m.session, R), z = sa(W, O);
        for (let k = 0; k < z.length; k += 1)
          N.push({
            inputIndex: D[k].inputIndex,
            ...z[k]
          });
      }
      return N.sort((D, R) => D.inputIndex - R.inputIndex), N.map(({ text: D, score: R }) => ({ text: D, score: R }));
    },
    async dispose() {
      await zi(m?.session), m = null;
    }
  };
}
async function ta(i, e, l, a) {
  const u = qi(l, a);
  return Zi(
    Hi(i, e, u),
    6e4,
    "Recognition model"
  );
}
function ea(i, e) {
  const l = [];
  for (let a = 0; a < e.length; a += 1)
    l.push(ia(i, e[a], a));
  return l;
}
function ia(i, e, l) {
  const { cv: a, config: u } = i, [c, p, h] = u.imageShape, m = e.cols, x = e.rows;
  if (c !== 3)
    throw new Error(`Unexpected recognition channels: ${String(c)}`);
  const C = m / Math.max(1, x), _ = Math.max(h / Math.max(1, p), C), g = st(Math.trunc(p * _), 1, Jl), T = Math.min(g, Math.ceil(p * C)), A = new a.Mat(), O = new a.Mat();
  a.resize(e, A, new a.Size(T, p), 0, 0, a.INTER_LINEAR), A.channels() === 4 ? a.cvtColor(A, O, a.COLOR_RGBA2BGR) : A.channels() === 1 ? a.cvtColor(A, O, a.COLOR_GRAY2BGR) : A.copyTo(O);
  const E = $i(O.data, T, p, jl), N = new Float32Array(3 * p * g), L = p * g, D = p * T;
  for (let R = 0; R < 3; R += 1)
    for (let W = 0; W < p; W += 1) {
      const z = R * D + W * T, k = R * L + W * g;
      N.set(E.subarray(z, z + T), k);
    }
  return O.delete(), A.delete(), { inputIndex: l, width: g, chw: N };
}
function na(i, e, l, a) {
  const u = e.length, c = new Float32Array(u * 3 * a * l), p = a * l;
  for (let h = 0; h < u; h += 1) {
    const m = e[h], x = m.width, C = a * x;
    for (let _ = 0; _ < 3; _ += 1) {
      const g = _ * C, T = h * (3 * p) + _ * p;
      for (let A = 0; A < a; A += 1) {
        const O = g + A * x, E = T + A * l;
        c.set(m.chw.subarray(O, O + x), E);
      }
    }
  }
  return new i.Tensor("float32", c, [u, 3, a, l]);
}
function ra(i, e, l) {
  const a = e.reduce((u, c) => Math.max(u, c.width), 1);
  return na(i, e, a, l);
}
function oa(i, e, l, a, u) {
  let c = -1, p = "";
  const h = [];
  for (let x = 0; x < l; x += 1) {
    let C = 0, _ = -1 / 0;
    const g = e + x * a;
    for (let T = 0; T < a; T += 1) {
      const A = i[g + T];
      A > _ && (_ = A, C = T);
    }
    if (C > 0 && C !== c) {
      const T = C - 1;
      T >= 0 && T < u.length && (p += u[T], h.push(_));
    }
    c = C;
  }
  const m = h.length ? h.reduce((x, C) => x + C, 0) / h.length : 0;
  return { text: p, score: m };
}
function sa(i, e) {
  const l = i.dims;
  if (l.length !== 3)
    throw new Error(`Unexpected rec output dims: [${l.join(", ")}]`);
  const a = l[0], u = l[1], c = l[2], p = i.data, h = u * c, m = [];
  for (let x = 0; x < a; x += 1)
    m.push(oa(p, x * h, u, c, e));
  return m;
}
function la(i, e, l) {
  const a = ue(i, l).box, u = Math.hypot(a[1][0] - a[0][0], a[1][1] - a[0][1]), c = Math.hypot(a[2][0] - a[3][0], a[2][1] - a[3][1]), p = Math.hypot(a[3][0] - a[0][0], a[3][1] - a[0][1]), h = Math.hypot(a[2][0] - a[1][0], a[2][1] - a[1][1]), m = Math.max(1, Math.floor(Math.max(u, c))), x = Math.max(1, Math.floor(Math.max(p, h))), C = i.matFromArray(4, 1, i.CV_32FC2, [
    a[0][0],
    a[0][1],
    a[1][0],
    a[1][1],
    a[2][0],
    a[2][1],
    a[3][0],
    a[3][1]
  ]), _ = i.matFromArray(4, 1, i.CV_32FC2, [0, 0, m, 0, m, x, 0, x]), g = i.getPerspectiveTransform(C, _), T = new i.Mat();
  if (i.warpPerspective(
    e,
    T,
    g,
    new i.Size(m, x),
    i.INTER_CUBIC,
    i.BORDER_REPLICATE,
    new i.Scalar()
  ), C.delete(), _.delete(), g.delete(), T.rows / Math.max(1, T.cols) >= 1.5) {
    const A = new i.Mat();
    return i.rotate(T, A, i.ROTATE_90_COUNTERCLOCKWISE), T.delete(), A;
  }
  return T;
}
let Xt = null;
async function aa() {
  let i;
  if (At instanceof Promise)
    i = await At;
  else {
    const e = At;
    e.Mat ? i = At : (await new Promise((l) => {
      e.onRuntimeInitialized = () => {
        l();
      };
    }), i = At);
  }
  return { cv: i };
}
async function ua() {
  return Xt || (Xt = aa().catch((i) => {
    throw Xt = null, i;
  })), Xt;
}
function dt(...i) {
  for (const e of i)
    if (e != null)
      return e;
}
function St(i) {
  if (i == null) return;
  const e = Number(i);
  return Number.isFinite(e) ? e : void 0;
}
function fa(i, e = {}, l = {}) {
  return {
    det: {
      limitSideLen: St(
        dt(
          l.text_det_limit_side_len,
          l.textDetLimitSideLen,
          e.text_det_limit_side_len,
          e.textDetLimitSideLen,
          i.det.resizeLong
        )
      ),
      limitType: dt(
        l.text_det_limit_type,
        l.textDetLimitType,
        e.text_det_limit_type,
        e.textDetLimitType,
        i.det.limitType
      ),
      maxSideLimit: St(
        dt(
          l.text_det_max_side_limit,
          l.textDetMaxSideLimit,
          e.text_det_max_side_limit,
          e.textDetMaxSideLimit,
          i.det.maxSideLimit
        )
      ),
      thresh: St(
        dt(
          l.text_det_thresh,
          l.textDetThresh,
          e.text_det_thresh,
          e.textDetThresh,
          i.det.postprocess.thresh
        )
      ),
      boxThresh: St(
        dt(
          l.text_det_box_thresh,
          l.textDetBoxThresh,
          e.text_det_box_thresh,
          e.textDetBoxThresh,
          i.det.postprocess.boxThresh
        )
      ),
      unclipRatio: St(
        dt(
          l.text_det_unclip_ratio,
          l.textDetUnclipRatio,
          e.text_det_unclip_ratio,
          e.textDetUnclipRatio,
          i.det.postprocess.unclipRatio
        )
      )
    },
    pipeline: {
      scoreThresh: Number(
        dt(
          l.text_rec_score_thresh,
          l.textRecScoreThresh,
          e.text_rec_score_thresh,
          e.textRecScoreThresh,
          0
        )
      )
    }
  };
}
const ha = `
pipeline_name: OCR

text_type: general

use_doc_preprocessor: False
use_textline_orientation: False

SubPipelines:
  DocPreprocessor:
    pipeline_name: doc_preprocessor
    use_doc_orientation_classify: False
    use_doc_unwarping: False
    SubModules:
      DocOrientationClassify:
        module_name: doc_text_orientation
        model_name: PP-LCNet_x1_0_doc_ori
        model_dir: null
      DocUnwarping:
        module_name: image_unwarping
        model_name: UVDoc
        model_dir: null

SubModules:
  TextDetection:
    module_name: text_detection
    model_name: PP-OCRv5_mobile_det
    model_dir: null
    limit_side_len: 64
    limit_type: min
    max_side_limit: 4000
    thresh: 0.3
    box_thresh: 0.6
    unclip_ratio: 1.5
  TextLineOrientation:
    module_name: textline_orientation
    model_name: PP-LCNet_x1_0_textline_ori
    model_dir: null
    batch_size: 6
  TextRecognition:
    module_name: text_recognition
    model_name: PP-OCRv5_mobile_rec
    model_dir: null
    batch_size: 6
    score_thresh: 0.0
`.trimStart(), pa = {
  det: bl,
  rec: $l
}, Qi = Wi(
  ha
), tn = Object.freeze({
  ...Qi.modelSelection
}), Yt = Object.freeze({
  ...tn
}), ca = Object.freeze({
  textDetectionModelName: "PP-OCRv6_small_det",
  textRecognitionModelName: "PP-OCRv6_small_rec"
}), da = /* @__PURE__ */ new Set([
  "af",
  "az",
  "bs",
  "cs",
  "cy",
  "da",
  "de",
  "es",
  "et",
  "fr",
  "ga",
  "hr",
  "hu",
  "id",
  "is",
  "it",
  "ku",
  "la",
  "lt",
  "lv",
  "mi",
  "ms",
  "mt",
  "nl",
  "no",
  "oc",
  "pi",
  "pl",
  "pt",
  "ro",
  "rs_latin",
  "sk",
  "sl",
  "sq",
  "sv",
  "sw",
  "tl",
  "tr",
  "uz",
  "vi",
  "french",
  "german",
  "fi",
  "eu",
  "gl",
  "lb",
  "rm",
  "ca",
  "qu"
]), ma = /* @__PURE__ */ new Set(["pi"]), ya = /* @__PURE__ */ new Set([
  "ch",
  "chinese_cht",
  "en",
  "japan",
  ...[...da].filter((i) => !ma.has(i))
]);
function Pa(i) {
  return ya.has(i);
}
const ve = Object.freeze([
  {
    assetKey: "det",
    modelRole: "TextDetection",
    selectionKey: "textDetectionModelName",
    nameAliases: ["text_detection_model_name", "textDetectionModelName"],
    assetAliases: ["textDetectionModelAsset", "text_detection_model_dir", "textDetectionModelDir"],
    nameLabel: "text detection model name",
    assetLabel: "text detection model asset",
    assetRequirementError: "text_detection_model_dir requires text_detection_model_name."
  },
  {
    assetKey: "rec",
    modelRole: "TextRecognition",
    selectionKey: "textRecognitionModelName",
    nameAliases: ["text_recognition_model_name", "textRecognitionModelName"],
    assetAliases: [
      "textRecognitionModelAsset",
      "text_recognition_model_dir",
      "textRecognitionModelDir"
    ],
    nameLabel: "text recognition model name",
    assetLabel: "text recognition model asset",
    assetRequirementError: "text_recognition_model_dir requires text_recognition_model_name."
  }
]), xa = /* @__PURE__ */ new Map([
  ["ch::PP-OCRv5", Yt],
  ["chinese_cht::PP-OCRv5", Yt],
  ["en::PP-OCRv5", Yt],
  ["japan::PP-OCRv5", Yt]
]);
function Q(i, e, l) {
  let a, u = !1;
  for (const c of e) {
    if (!(c in i)) continue;
    const p = i[c];
    if (!u) {
      a = p, u = !0;
      continue;
    }
    if (p !== a)
      throw new Error(`Conflicting values provided for ${l}: ${e.join(", ")}.`);
  }
  return u ? a : void 0;
}
function va(i) {
  return i === "min" || i === "max";
}
function _a(i, e) {
  const l = { ...i };
  for (const a of Object.keys(e)) {
    const u = e[a];
    u !== void 0 && (l[a] = u);
  }
  return l;
}
function Ca(i) {
  const e = {}, l = Q(
    i,
    ["text_det_limit_side_len", "textDetLimitSideLen"],
    "text_det_limit_side_len"
  );
  if (l !== void 0) {
    const x = $(l);
    x !== void 0 && (e.text_det_limit_side_len = x);
  }
  const a = Q(
    i,
    ["text_det_limit_type", "textDetLimitType"],
    "text_det_limit_type"
  );
  a !== void 0 && va(a) && (e.text_det_limit_type = a);
  const u = Q(
    i,
    ["text_det_max_side_limit", "textDetMaxSideLimit"],
    "text_det_max_side_limit"
  );
  if (u !== void 0) {
    const x = $(u);
    x !== void 0 && (e.text_det_max_side_limit = x);
  }
  const c = Q(
    i,
    ["text_det_thresh", "textDetThresh"],
    "text_det_thresh"
  );
  if (c !== void 0) {
    const x = $(c);
    x !== void 0 && (e.text_det_thresh = x);
  }
  const p = Q(
    i,
    ["text_det_box_thresh", "textDetBoxThresh"],
    "text_det_box_thresh"
  );
  if (p !== void 0) {
    const x = $(p);
    x !== void 0 && (e.text_det_box_thresh = x);
  }
  const h = Q(
    i,
    ["text_det_unclip_ratio", "textDetUnclipRatio"],
    "text_det_unclip_ratio"
  );
  if (h !== void 0) {
    const x = $(h);
    x !== void 0 && (e.text_det_unclip_ratio = x);
  }
  const m = Q(
    i,
    ["text_rec_score_thresh", "textRecScoreThresh"],
    "text_rec_score_thresh"
  );
  if (m !== void 0) {
    const x = $(m);
    x !== void 0 && (e.text_rec_score_thresh = x);
  }
  return e;
}
function Kt(i) {
  const e = $(i);
  return e !== void 0 && e >= 1 ? Math.floor(e) : void 0;
}
function Ia(i) {
  return {
    det: Kt(
      Q(
        i,
        ["textDetectionBatchSize", "text_detection_batch_size"],
        "textDetectionBatchSize"
      )
    ),
    rec: Kt(
      Q(
        i,
        ["textRecognitionBatchSize", "text_recognition_batch_size"],
        "textRecognitionBatchSize"
      )
    ),
    pipeline: Kt(
      Q(
        i,
        ["pipelineBatchSize", "pipeline_batch_size", "batch_size"],
        "pipelineBatchSize"
      )
    )
  };
}
function Ta(i, e) {
  const l = Ca(e), a = Ia(e), u = ji(i);
  return u.runtimeDefaults = _a(u.runtimeDefaults, l), a.det !== void 0 && (u.textDetectionBatchSize = a.det), a.rec !== void 0 && (u.textRecognitionBatchSize = a.rec), a.pipeline !== void 0 && (u.pipelineBatchSize = a.pipeline), u;
}
function ga(i) {
  return i === "ignore" || i === "error" ? i : "warn";
}
function wa(i, e) {
  if (!(!i.length || e === "ignore")) {
    if (e === "error")
      throw new Error(i.join(" "));
    for (const l of i)
      console.warn(`[PaddleOCR.js] ${l}`);
  }
}
function Qt(i, e) {
  const l = Fi[e];
  if (!l)
    throw new Error(`Unknown model asset "${e}".`);
  return { url: l.url };
}
function Aa(i, e, l, a) {
  return l?.[a] ?? e?.[a] ?? i?.[a] ?? null;
}
function Sa(i, e, l) {
  return Object.fromEntries(
    ve.map((a) => [
      a.selectionKey,
      Aa(i, e, l, a.selectionKey)
    ])
  );
}
function Ge(i, e, l) {
  if (!e)
    throw new Error(`${i} model selection must define model_name.`);
  const a = wl(l);
  if (!a)
    throw new Error(`${i} in inference.yml must define model_name.`);
  if (a !== e)
    throw new Error(
      `${i} in inference.yml declares model_name "${a}" but requested model_name is "${e}".`
    );
}
function La(i, e, l, a, u, c, p, h) {
  const m = h?.[i];
  if (m)
    return m;
  const x = c?.[l];
  if (x)
    return Qt(e, x);
  const C = p?.[i];
  if (C)
    return C;
  const _ = u?.[l];
  if (_)
    return Qt(e, _);
  const g = a?.[l];
  return g ? Qt(e, g) : null;
}
function Oa(i, e, l, a, u) {
  const c = Object.fromEntries(
    ve.map((p) => [
      p.assetKey,
      La(
        p.assetKey,
        p.modelRole,
        p.selectionKey,
        i,
        e,
        l,
        a,
        u
      )
    ])
  );
  if (Object.values(c).some((p) => !p))
    throw new Error("OCR model selection must define both detection and recognition models.");
  return c;
}
function Ea(i) {
  const e = {}, l = {};
  let a = !1;
  for (const u of ve) {
    const c = Q(i, u.nameAliases, u.nameLabel), p = Q(i, u.assetAliases, u.assetLabel);
    if (c !== void 0 && (e[u.selectionKey] = c, a = !0), p !== void 0) {
      if (c === void 0)
        throw new Error(u.assetRequirementError);
      l[u.assetKey] = p, a = !0;
    }
  }
  return a ? {
    modelSelection: e,
    assets: l
  } : null;
}
function ba(i, e = !1) {
  const l = Q(i, ["ocrVersion", "ocr_version"], "ocrVersion");
  if (!i.lang && !l)
    return e ? tn : null;
  const a = i.lang || "ch", u = l || "PP-OCRv5";
  if (u === "PP-OCRv6") {
    if (!Pa(a))
      throw new Error(
        `Unsupported lang/ocrVersion combination: lang="${a}", ocrVersion="${u}".`
      );
    return ca;
  }
  const c = xa.get(`${a}::${u}`);
  if (!c)
    throw new Error(
      `Unsupported lang/ocrVersion combination: lang="${a}", ocrVersion="${u}".`
    );
  return c;
}
function Na(i = {}) {
  const e = i.pipelineConfig, l = e != null ? Wi(e) : null, a = ga(i.unsupportedBehavior), u = l?.warnings || [], c = ba(i, !l), p = l?.modelSelection || null, h = l?.assets || null, m = Ea(i), x = m?.modelSelection || null, C = m?.assets || null, _ = Sa(
    c,
    p,
    x
  ), g = Oa(
    c,
    p,
    x,
    h,
    C
  ), T = l ?? Qi;
  l && wa(u, a);
  const A = Ta(T, i);
  return A.modelSelection = _, A.assets = { ...g }, A;
}
function Ma(i) {
  return i === "webgpu" || i === "wasm" ? i : "auto";
}
function Da(i = {}) {
  return {
    backend: Ma(i.backend),
    ...i.wasmPaths !== void 0 ? { wasmPaths: i.wasmPaths } : {},
    ...i.numThreads !== void 0 ? { numThreads: i.numThreads } : {},
    ...i.simd !== void 0 ? { simd: i.simd } : {},
    ...i.proxy !== void 0 ? { proxy: i.proxy } : {}
  };
}
function Ba(i) {
  if (!i)
    return {
      enabled: !1,
      createWorker: null
    };
  if (i === !0)
    return {
      enabled: !0,
      createWorker: null
    };
  if (typeof i == "object") {
    const e = i;
    return {
      enabled: !0,
      createWorker: typeof e.createWorker == "function" ? e.createWorker : null
    };
  }
  throw new Error("worker must be a boolean or an options object.");
}
function Xa(i = {}) {
  return {
    pipelineConfig: Na(i),
    ortOptions: Da(i.ortOptions || {})
  };
}
function en() {
  return ji(pa);
}
function Ya() {
}
function Fa(i) {
  const e = i?.det, l = i?.rec;
  if (!e || typeof e != "object" || !l || typeof l != "object")
    throw new Error(
      "PaddleOCRCore requires pre-resolved detection and recognition asset descriptors."
    );
  return { det: e, rec: l };
}
class Ra {
  options;
  modelConfig;
  runtimeDefaults;
  cv;
  ort;
  detModel;
  recModel;
  webgpuState;
  pipelineConfig;
  lastInitializationSummary;
  ensureServedFromHttp;
  sourceToMat;
  constructor(e) {
    this.options = e, this.modelConfig = en(), this.pipelineConfig = e.pipelineConfig, this.runtimeDefaults = { ...e.pipelineConfig.runtimeDefaults }, this.cv = null, this.ort = null, this.detModel = null, this.recModel = null, this.webgpuState = { available: !1, reason: "" }, this.lastInitializationSummary = null, this.ensureServedFromHttp = e.ensureServedFromHttp || Ya, this.sourceToMat = e.sourceToMat;
  }
  async initialize() {
    this.ensureServedFromHttp();
    const e = at(), { cv: l } = await ua();
    this.cv = l;
    const { ort: a, webgpuState: u, backend: c } = await _l(this.options.ortOptions || {});
    this.ort = a, this.webgpuState = u;
    const p = Fa(this.pipelineConfig.assets), h = this.options.fetch || fetch, m = await Promise.all([
      We(p.det, h),
      We(p.rec, h)
    ]);
    Ge(
      "TextDetection",
      this.pipelineConfig.modelSelection.textDetectionModelName,
      m[0].configText
    ), Ge(
      "TextRecognition",
      this.pipelineConfig.modelSelection.textRecognitionModelName,
      m[1].configText
    ), await this.disposeModelsOnly();
    const x = this.pipelineConfig.textDetectionBatchSize, C = this.pipelineConfig.textRecognitionBatchSize, [_, g] = await Promise.all([
      Bl({
        ort: this.ort,
        modelBytes: m[0].modelBytes,
        configText: m[0].configText,
        backend: c,
        webgpuState: u,
        batchSize: x
      }),
      Ql({
        ort: this.ort,
        modelBytes: m[1].modelBytes,
        configText: m[1].configText,
        backend: c,
        webgpuState: u,
        batchSize: C
      })
    ]);
    this.detModel = _, this.recModel = g, this.modelConfig = {
      det: this.detModel.config,
      rec: this.recModel.config
    };
    const T = at() - e;
    return this.lastInitializationSummary = {
      backend: c,
      webgpuAvailable: u.available,
      detProvider: this.detModel.provider,
      recProvider: this.recModel.provider,
      assets: m.map((A) => A.download),
      elapsedMs: T,
      pipelineConfigWarnings: this.pipelineConfig.warnings
    }, this.lastInitializationSummary;
  }
  getInitializationSummary() {
    return this.lastInitializationSummary;
  }
  getModelConfig() {
    return this.modelConfig;
  }
  async predict(e, l = {}) {
    if (!this.sourceToMat)
      throw new Error("PaddleOCR source adapter is not configured.");
    (!this.detModel || !this.recModel || !this.cv || !this.ort) && await this.initialize();
    const a = this.cv, u = this.detModel, c = this.recModel;
    if (!a || !u || !c)
      throw new Error("Initialization did not complete. Call initialize() first.");
    const p = Array.isArray(e) ? e : [e], h = this.sourceToMat, m = Math.max(1, Math.floor(this.pipelineConfig.pipelineBatchSize) || 1), x = Pe(p, m), C = at(), _ = fa(this.modelConfig, this.runtimeDefaults, l);
    let g = 0, T = 0;
    const A = [];
    for (const N of x) {
      const L = await Promise.all(
        N.map((D) => Promise.resolve(h(a, D)))
      );
      try {
        const D = at(), R = await u.predict(
          a,
          L.map((k) => k.mat),
          _.det
        );
        g += at() - D;
        const W = at(), z = [];
        for (let k = 0; k < R.length; k += 1) {
          const tt = R[k]?.boxes ?? [], it = [];
          for (let U = 0; U < tt.length; U += 1)
            it.push(la(a, L[k].mat, tt[U].poly));
          try {
            const U = it.length ? await c.predict(a, it) : [], Mt = [];
            for (let ot = 0; ot < U.length; ot += 1) {
              const yt = U[ot];
              yt.text && yt.score >= _.pipeline.scoreThresh && Mt.push({
                poly: tt[ot].poly,
                text: yt.text,
                score: yt.score
              });
            }
            z.push(Mt);
          } finally {
            for (const U of it)
              U.delete();
          }
        }
        T += at() - W;
        for (let k = 0; k < L.length; k += 1) {
          const tt = L[k], it = R[k]?.boxes ?? [], U = z[k] ?? [];
          A.push({
            image: {
              width: tt.width,
              height: tt.height
            },
            items: U,
            detectedBoxes: it.length,
            recognizedCount: U.length
          });
        }
      } finally {
        for (const D of L)
          D.dispose();
      }
    }
    const O = at() - C, E = this.options.ortOptions?.backend ?? "auto";
    return A.map(
      (N) => ({
        image: N.image,
        items: N.items,
        metrics: {
          detMs: g,
          recMs: T,
          totalMs: O,
          detectedBoxes: N.detectedBoxes,
          recognizedCount: N.recognizedCount
        },
        runtime: {
          requestedBackend: E,
          detProvider: u.provider,
          recProvider: c.provider,
          webgpuAvailable: this.webgpuState.available
        }
      })
    );
  }
  async disposeModelsOnly() {
    await Promise.all([this.detModel?.dispose(), this.recModel?.dispose()]), this.detModel = null, this.recModel = null;
  }
  async dispose() {
    await this.disposeModelsOnly();
  }
}
const ka = "worker-transport-request", Wa = "worker-transport-response";
function Ua(i, e, l) {
  return {
    kind: ka,
    type: i,
    payload: e,
    requestId: l
  };
}
function qa(i) {
  return typeof i == "object" && i !== null && "kind" in i && i.kind === Wa;
}
function Ha(i) {
  const e = i || {}, l = new Error(e.message || "Unknown worker error.");
  return l.name = e.name || "Error", e.stack && (l.stack = e.stack), l;
}
class za {
  workerOptions;
  worker;
  pending;
  nextRequestId;
  disposed;
  constructor(e = {}) {
    this.workerOptions = e, this.worker = null, this.pending = /* @__PURE__ */ new Map(), this.nextRequestId = 1, this.disposed = !1;
  }
  ensureActive() {
    if (this.disposed)
      throw new Error("Worker transport client has been disposed.");
  }
  ensureWorker() {
    if (this.ensureActive(), this.worker)
      return this.worker;
    const e = this.workerOptions.createWorker;
    if (typeof e != "function")
      throw new Error("Worker transport client requires a createWorker() factory.");
    const l = e();
    return l.onmessage = (a) => {
      const u = a.data;
      if (!qa(u)) return;
      const c = this.pending.get(u.requestId);
      c && (this.pending.delete(u.requestId), u.status === "success" ? c.resolve(u.payload) : c.reject(Ha(u.error)));
    }, l.onerror = (a) => {
      const u = new Error(a.message || "OCR worker failed.");
      for (const c of this.pending.values())
        c.reject(u);
      this.pending.clear();
    }, this.worker = l, l;
  }
  request(e, l, a = []) {
    const u = this.ensureWorker(), c = this.nextRequestId;
    return this.nextRequestId += 1, new Promise((p, h) => {
      this.pending.set(c, { resolve: p, reject: h }), u.postMessage(Ua(e, l, c), a);
    });
  }
  disposeWorker() {
    this.worker && (this.worker.terminate(), this.worker = null);
  }
  dispose() {
    if (!this.disposed) {
      this.disposed = !0;
      for (const e of this.pending.values())
        e.reject(new Error("Worker transport client has been disposed."));
      this.pending.clear(), this.disposeWorker();
    }
  }
}
function Za(i) {
  return new za(i);
}
function Ga() {
  if (typeof Worker != "function")
    throw new Error("worker mode requires Web Worker support in this environment.");
  return new Worker(new URL(
    /* @vite-ignore */
    "/assets/worker-entry-C7VMb0Lt.js",
    import.meta.url
  ), {
    type: "module"
  });
}
class ja {
  options;
  lastInitializationSummary;
  modelConfig;
  transportClient;
  initPromise;
  disposed;
  constructor(e, l) {
    this.options = e, this.lastInitializationSummary = null, this.modelConfig = en(), this.transportClient = l, this.initPromise = null, this.disposed = !1;
  }
  ensureActive() {
    if (this.disposed)
      throw new Error("PaddleOCR worker instance has been disposed.");
  }
  async initialize() {
    if (this.ensureActive(), this.lastInitializationSummary)
      return this.lastInitializationSummary;
    if (!this.initPromise) {
      const e = this.options.ortOptions || {};
      e.wasmPaths === void 0 && console.warn(
        '[PaddleOCR.js] Worker mode: ortOptions.wasmPaths is not set — falling back to CDN (%s). For version consistency between main thread and worker, set ortOptions.wasmPaths to the path where your bundler outputs the onnxruntime-web WASM files (e.g. ortOptions: { wasmPaths: "/assets/" }).',
        "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/"
      );
      const l = e.wasmPaths === void 0 ? { wasmPaths: "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/" } : {};
      this.initPromise = this.transportClient.request("init", {
        options: {
          ...this.options,
          ortOptions: {
            ...e,
            ...l,
            disableWasmProxy: !0
          }
        }
      }).then((a) => {
        const u = a;
        return this.lastInitializationSummary = u.summary, this.modelConfig = u.modelConfig, this.lastInitializationSummary;
      }).catch((a) => {
        throw this.initPromise = null, this.transportClient.dispose(), a;
      });
    }
    return this.initPromise;
  }
  getInitializationSummary() {
    return this.lastInitializationSummary;
  }
  getModelConfig() {
    return this.modelConfig;
  }
  async predict(e, l = {}) {
    this.ensureActive(), await this.initialize();
    const a = Array.isArray(e) ? e : [e], u = await Promise.all(
      a.map(
        (h) => yl(h)
      )
    ), c = u.map((h) => h.payload), p = u.flatMap((h) => h.transferables);
    return this.transportClient.request(
      "predict",
      {
        sources: c,
        params: l
      },
      p
    );
  }
  async dispose() {
    if (!this.disposed) {
      this.disposed = !0;
      try {
        await this.transportClient.request("dispose", {});
      } catch {
      }
      this.transportClient.dispose();
    }
  }
}
function Va(i, e = {}) {
  const l = Za({
    ...e,
    createWorker: e.createWorker || Ga
  });
  return new ja(i, l);
}
class nn extends Ra {
  constructor(e) {
    super({
      ...e,
      ensureServedFromHttp: pl,
      sourceToMat: ml
    });
  }
  static async create(e = {}) {
    const l = Ba(e.worker);
    if (l.enabled && e.fetch)
      throw new Error("worker mode does not support a custom fetch implementation.");
    const a = Xa(e), u = l.enabled ? Va(a, {
      createWorker: l.createWorker ?? void 0
    }) : new nn({
      ...a,
      fetch: e.fetch
    });
    return e.initialize !== !1 && await u.initialize(), u;
  }
}
export {
  nn as PaddleOCR,
  Wi as normalizeOcrPipelineConfig,
  $a as parseOcrPipelineConfigText
};
