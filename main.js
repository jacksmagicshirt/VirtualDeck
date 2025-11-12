function _regeneratorRuntime() {
  'use strict'; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function () {
    return t
  };
  var e,
  t = {},
  n = Object.prototype,
  r = n.hasOwnProperty,
  i = Object.defineProperty ||
  function (e, t, n) {
    e[t] = n.value
  },
  o = 'function' == typeof Symbol ? Symbol : {
  },
  a = o.iterator ||
  '@@iterator',
  s = o.asyncIterator ||
  '@@asyncIterator',
  c = o.toStringTag ||
  '@@toStringTag';
  function u(e, t, n) {
    return Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }),
    e[t]
  }
  try {
    u({
    }, '')
  } catch (e) {
    u = function (e, t, n) {
      return e[t] = n
    }
  }
  function l(e, t, n, r) {
    var o = t &&
    t.prototype instanceof m ? t : m,
    a = Object.create(o.prototype),
    s = new P(r || []);
    return i(a, '_invoke', {
      value: L(e, n, s)
    }),
    a
  }
  function h(e, t, n) {
    try {
      return {
        type: 'normal',
        arg: e.call(t, n)
      }
    } catch (e) {
      return {
        type: 'throw',
        arg: e
      }
    }
  }
  t.wrap = l;
  var d = 'suspendedStart',
  f = 'suspendedYield',
  p = 'executing',
  y = 'completed',
  v = {};
  function m() {
  }
  function g() {
  }
  function _() {
  }
  var w = {};
  u(w, a, (function () {
    return this
  }));
  var k = Object.getPrototypeOf,
  x = k &&
  k(k(j([])));
  x &&
  x !== n &&
  r.call(x, a) &&
  (w = x);
  var b = _.prototype = m.prototype = Object.create(w);
  function C(e) {
    [
      'next',
      'throw',
      'return'
    ].forEach((function (t) {
      u(e, t, (function (e) {
        return this._invoke(t, e)
      }))
    }))
  }
  function E(e, t) {
    function n(i, o, a, s) {
      var c = h(e[i], e, o);
      if ('throw' !== c.type) {
        var u = c.arg,
        l = u.value;
        return l &&
        'object' == _typeof(l) &&
        r.call(l, '__await') ? t.resolve(l.__await).then(
          (function (e) {
            n('next', e, a, s)
          }),
          (function (e) {
            n('throw', e, a, s)
          })
        ) : t.resolve(l).then(
          (function (e) {
            u.value = e,
            a(u)
          }),
          (function (e) {
            return n('throw', e, a, s)
          })
        )
      }
      s(c.arg)
    }
    var o;
    i(
      this,
      '_invoke',
      {
        value: function (e, r) {
          function i() {
            return new t((function (t, i) {
              n(e, r, t, i)
            }))
          }
          return o = o ? o.then(i, i) : i()
        }
      }
    )
  }
  function L(t, n, r) {
    var i = d;
    return function (o, a) {
      if (i === p) throw Error('Generator is already running');
      if (i === y) {
        if ('throw' === o) throw a;
        return {
          value: e,
          done: !0
        }
      }
      for (r.method = o, r.arg = a; ; ) {
        var s = r.delegate;
        if (s) {
          var c = T(s, r);
          if (c) {
            if (c === v) continue;
            return c
          }
        }
        if ('next' === r.method) r.sent = r._sent = r.arg;
         else if ('throw' === r.method) {
          if (i === d) throw i = y,
          r.arg;
          r.dispatchException(r.arg)
        } else 'return' === r.method &&
        r.abrupt('return', r.arg);
        i = p;
        var u = h(t, n, r);
        if ('normal' === u.type) {
          if (i = r.done ? y : f, u.arg === v) continue;
          return {
            value: u.arg,
            done: r.done
          }
        }
        'throw' === u.type &&
        (i = y, r.method = 'throw', r.arg = u.arg)
      }
    }
  }
  function T(t, n) {
    var r = n.method,
    i = t.iterator[r];
    if (i === e) return n.delegate = null,
    'throw' === r &&
    t.iterator.return &&
    (n.method = 'return', n.arg = e, T(t, n), 'throw' === n.method) ||
    'return' !== r &&
    (
      n.method = 'throw',
      n.arg = new TypeError('The iterator does not provide a \'' + r + '\' method')
    ),
    v;
    var o = h(i, t.iterator, n.arg);
    if ('throw' === o.type) return n.method = 'throw',
    n.arg = o.arg,
    n.delegate = null,
    v;
    var a = o.arg;
    return a ? a.done ? (
      n[t.resultName] = a.value,
      n.next = t.nextLoc,
      'return' !== n.method &&
      (n.method = 'next', n.arg = e),
      n.delegate = null,
      v
    ) : a : (
      n.method = 'throw',
      n.arg = new TypeError('iterator result is not an object'),
      n.delegate = null,
      v
    )
  }
  function S(e) {
    var t = {
      tryLoc: e[0]
    };
    1 in e &&
    (t.catchLoc = e[1]),
    2 in e &&
    (t.finallyLoc = e[2], t.afterLoc = e[3]),
    this.tryEntries.push(t)
  }
  function O(e) {
    var t = e.completion ||
    {
    };
    t.type = 'normal',
    delete t.arg,
    e.completion = t
  }
  function P(e) {
    this.tryEntries = [
      {
        tryLoc: 'root'
      }
    ],
    e.forEach(S, this),
    this.reset(!0)
  }
  function j(t) {
    if (t || '' === t) {
      var n = t[a];
      if (n) return n.call(t);
      if ('function' == typeof t.next) return t;
      if (!isNaN(t.length)) {
        var i = - 1,
        o = function n() {
          for (; ++i < t.length; ) if (r.call(t, i)) return n.value = t[i],
          n.done = !1,
          n;
          return n.value = e,
          n.done = !0,
          n
        };
        return o.next = o
      }
    }
    throw new TypeError(_typeof(t) + ' is not iterable')
  }
  return g.prototype = _,
  i(b, 'constructor', {
    value: _,
    configurable: !0
  }),
  i(_, 'constructor', {
    value: g,
    configurable: !0
  }),
  g.displayName = u(_, c, 'GeneratorFunction'),
  t.isGeneratorFunction = function (e) {
    var t = 'function' == typeof e &&
    e.constructor;
    return !!t &&
    (t === g || 'GeneratorFunction' === (t.displayName || t.name))
  },
  t.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, _) : (e.__proto__ = _, u(e, c, 'GeneratorFunction')),
    e.prototype = Object.create(b),
    e
  },
  t.awrap = function (e) {
    return {
      __await: e
    }
  },
  C(E.prototype),
  u(E.prototype, s, (function () {
    return this
  })),
  t.AsyncIterator = E,
  t.async = function (e, n, r, i, o) {
    void 0 === o &&
    (o = Promise);
    var a = new E(l(e, n, r, i), o);
    return t.isGeneratorFunction(n) ? a : a.next().then((function (e) {
      return e.done ? e.value : a.next()
    }))
  },
  C(b),
  u(b, c, 'Generator'),
  u(b, a, (function () {
    return this
  })),
  u(b, 'toString', (function () {
    return '[object Generator]'
  })),
  t.keys = function (e) {
    var t = Object(e),
    n = [];
    for (var r in t) n.push(r);
    return n.reverse(),
    function e() {
      for (; n.length; ) {
        var r = n.pop();
        if (r in t) return e.value = r,
        e.done = !1,
        e
      }
      return e.done = !0,
      e
    }
  },
  t.values = j,
  P.prototype = {
    constructor: P,
    reset: function (t) {
      if (
        this.prev = 0,
        this.next = 0,
        this.sent = this._sent = e,
        this.done = !1,
        this.delegate = null,
        this.method = 'next',
        this.arg = e,
        this.tryEntries.forEach(O),
        !t
      ) for (var n in this) 't' === n.charAt(0) &&
      r.call(this, n) &&
      !isNaN( + n.slice(1)) &&
      (this[n] = e)
    },
    stop: function () {
      this.done = !0;
      var e = this.tryEntries[0].completion;
      if ('throw' === e.type) throw e.arg;
      return this.rval
    },
    dispatchException: function (t) {
      if (this.done) throw t;
      var n = this;
      function i(r, i) {
        return s.type = 'throw',
        s.arg = t,
        n.next = r,
        i &&
        (n.method = 'next', n.arg = e),
        !!i
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var a = this.tryEntries[o],
        s = a.completion;
        if ('root' === a.tryLoc) return i('end');
        if (a.tryLoc <= this.prev) {
          var c = r.call(a, 'catchLoc'),
          u = r.call(a, 'finallyLoc');
          if (c && u) {
            if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
            if (this.prev < a.finallyLoc) return i(a.finallyLoc)
          } else if (c) {
            if (this.prev < a.catchLoc) return i(a.catchLoc, !0)
          } else {
            if (!u) throw Error('try statement without catch or finally');
            if (this.prev < a.finallyLoc) return i(a.finallyLoc)
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var n = this.tryEntries.length - 1; n >= 0; --n) {
        var i = this.tryEntries[n];
        if (
          i.tryLoc <= this.prev &&
          r.call(i, 'finallyLoc') &&
          this.prev < i.finallyLoc
        ) {
          var o = i;
          break
        }
      }
      o &&
      ('break' === e || 'continue' === e) &&
      o.tryLoc <= t &&
      t <= o.finallyLoc &&
      (o = null);
      var a = o ? o.completion : {
      };
      return a.type = e,
      a.arg = t,
      o ? (this.method = 'next', this.next = o.finallyLoc, v) : this.complete(a)
    },
    complete: function (e, t) {
      if ('throw' === e.type) throw e.arg;
      return 'break' === e.type ||
      'continue' === e.type ? this.next = e.arg : 'return' === e.type ? (
        this.rval = this.arg = e.arg,
        this.method = 'return',
        this.next = 'end'
      ) : 'normal' === e.type &&
      t &&
      (this.next = t),
      v
    },
    finish: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc),
        O(n),
        v
      }
    },
    catch : function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.tryLoc === e) {
          var r = n.completion;
          if ('throw' === r.type) {
            var i = r.arg;
            O(n)
          }
          return i
        }
      }
      throw Error('illegal catch attempt')
    },
    delegateYield: function (t, n, r) {
      return this.delegate = {
        iterator: j(t),
        resultName: n,
        nextLoc: r
      },
      'next' === this.method &&
      (this.arg = e),
      v
    }
  },
  t
}
function asyncGeneratorStep(e, t, n, r, i, o, a) {
  try {
    var s = e[o](a),
    c = s.value
  } catch (e) {
    return void n(e)
  }
  s.done ? t(c) : Promise.resolve(c).then(r, i)
}
function _asyncToGenerator(e) {
  return function () {
    var t = this,
    n = arguments;
    return new Promise(
      (
        function (r, i) {
          var o = e.apply(t, n);
          function a(e) {
            asyncGeneratorStep(o, r, i, a, s, 'next', e)
          }
          function s(e) {
            asyncGeneratorStep(o, r, i, a, s, 'throw', e)
          }
          a(void 0)
        }
      )
    )
  }
}
function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) ||
  _iterableToArray(e) ||
  _unsupportedIterableToArray(e) ||
  _nonIterableSpread()
}
function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}
function _iterableToArray(e) {
  if (
    'undefined' != typeof Symbol &&
    null != e[Symbol.iterator] ||
    null != e['@@iterator']
  ) return Array.from(e)
}
function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) return _arrayLikeToArray(e)
}
function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable ||
    !1,
    r.configurable = !0,
    'value' in r &&
    (r.writable = !0),
    Object.defineProperty(e, _toPropertyKey(r.key), r)
  }
}
function _createClass(e, t, n) {
  return t &&
  _defineProperties(e.prototype, t),
  n &&
  _defineProperties(e, n),
  Object.defineProperty(e, 'prototype', {
    writable: !1
  }),
  e
}
function _toPropertyKey(e) {
  var t = _toPrimitive(e, 'string');
  return 'symbol' == _typeof(t) ? t : t + ''
}
function _toPrimitive(e, t) {
  if ('object' != _typeof(e) || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (void 0 !== n) {
    var r = n.call(e, t || 'default');
    if ('object' != _typeof(r)) return r;
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return ('string' === t ? String : Number) (e)
}
function _createForOfIteratorHelper(e, t) {
  var n = 'undefined' != typeof Symbol &&
  e[Symbol.iterator] ||
  e['@@iterator'];
  if (!n) {
    if (
      Array.isArray(e) ||
      (n = _unsupportedIterableToArray(e)) ||
      t &&
      e &&
      'number' == typeof e.length
    ) {
      n &&
      (e = n);
      var r = 0,
      i = function () {
      };
      return {
        s: i,
        n: function () {
          return r >= e.length ? {
            done: !0
          }
           : {
            done: !1,
            value: e[r++]
          }
        },
        e: function (e) {
          throw e
        },
        f: i
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  var o,
  a = !0,
  s = !1;
  return {
    s: function () {
      n = n.call(e)
    },
    n: function () {
      var e = n.next();
      return a = e.done,
      e
    },
    e: function (e) {
      s = !0,
      o = e
    },
    f: function () {
      try {
        a ||
        null == n.return ||
        n.return()
      } finally {
        if (s) throw o
      }
    }
  }
}
function _unsupportedIterableToArray(e, t) {
  if (e) {
    if ('string' == typeof e) return _arrayLikeToArray(e, t);
    var n = Object.prototype.toString.call(e).slice(8, - 1);
    return 'Object' === n &&
    e.constructor &&
    (n = e.constructor.name),
    'Map' === n ||
    'Set' === n ? Array.from(e) : 'Arguments' === n ||
    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(e, t) : void 0
  }
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) &&
  (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r
}
function _construct(e, t, n) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var r = [
    null
  ];
  r.push.apply(r, t);
  var i = new (e.bind.apply(e, r));
  return n &&
  _setPrototypeOf(i, n.prototype),
  i
}
function _isNativeReflectConstruct() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
    })))
  } catch (e) {
  }
  return (_isNativeReflectConstruct = function () {
    return !!e
  }) ()
}
function _setPrototypeOf(e, t) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    return e.__proto__ = t,
    e
  },
  _setPrototypeOf(e, t)
}
function _typeof(e) {
  return _typeof = 'function' == typeof Symbol &&
  'symbol' == typeof Symbol.iterator ? function (e) {
    return typeof e
  }
   : function (e) {
    return e &&
    'function' == typeof Symbol &&
    e.constructor === Symbol &&
    e !== Symbol.prototype ? 'symbol' : typeof e
  },
  _typeof(e)
}
!function () {
  'use strict';
  function e(e, t) {
    var n = function (e) {
      for (var t = e.split(/([.#])/), n = '', r = '', i = 1; i < t.length; i += 2) switch (t[i]) {
        case '.':
          n += ' '.concat(t[i + 1]);
          break;
        case '#':
          r = t[i + 1]
      }
      return {
        className: n.trim(),
        tag: t[0] ||
        'div',
        id: r
      }
    }(e),
    r = n.tag,
    i = n.id,
    o = n.className,
    a = t ? document.createElementNS(t, r) : document.createElement(r);
    return i &&
    (a.id = i),
    o &&
    (t ? a.setAttribute('class', o) : a.className = o),
    a
  }
  function t(t) {
    for (
      var n,
      r = _typeof(t),
      i = arguments.length,
      o = new Array(i > 1 ? i - 1 : 0),
      a = 1;
      a < i;
      a++
    ) o[a - 1] = arguments[a];
    if ('string' === r) n = e(t);
     else {
      if ('function' !== r) throw new Error('At least one argument required');
      n = _construct(t, o)
    }
    return v(m(n), o),
    n
  }
  var n = t;
  function r(e, t) {
    var n = m(e),
    r = m(t);
    return t === r &&
    r.__redom_view &&
    (t = r.__redom_view),
    r.parentNode &&
    (i(t, r, n), n.removeChild(r)),
    t
  }
  function i(e, t, n) {
    var r = t.__redom_lifecycle;
    if (o(r)) t.__redom_lifecycle = {};
     else {
      var i = n;
      for (t.__redom_mounted && u(t, 'onunmount'); i; ) {
        var a = i.__redom_lifecycle ||
        {
        };
        for (var s in r) a[s] &&
        (a[s] -= r[s]);
        o(a) &&
        (i.__redom_lifecycle = null),
        i = i.parentNode
      }
    }
  }
  function o(e) {
    if (null == e) return !0;
    for (var t in e) if (e[t]) return !1;
    return !0
  }
  t.extend = function () {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
    return t.bind.apply(t, [
      this
    ].concat(n))
  };
  var a = [
    'onmount',
    'onremount',
    'onunmount'
  ],
  s = 'undefined' != typeof window &&
  'ShadowRoot' in window;
  function c(e, t, n, r) {
    var o = m(e),
    c = m(t);
    t === c &&
    c.__redom_view &&
    (t = c.__redom_view),
    t !== c &&
    (c.__redom_view = t);
    var l = c.__redom_mounted,
    h = c.parentNode;
    if (l && h !== o && i(0, c, h), null != n) if (r) {
      var d = m(n);
      d.__redom_mounted &&
      u(d, 'onunmount'),
      o.replaceChild(c, d)
    } else o.insertBefore(c, m(n));
     else o.appendChild(c);
    return function (e, t, n, r) {
      var i,
      o = t.__redom_lifecycle ||
      (t.__redom_lifecycle = {}),
      c = n === r,
      l = !1,
      h = _createForOfIteratorHelper(a);
      try {
        for (h.s(); !(i = h.n()).done; ) {
          var d = i.value;
          c ||
          e !== t &&
          d in e &&
          (o[d] = (o[d] || 0) + 1),
          o[d] &&
          (l = !0)
        }
      } catch (e) {
        h.e(e)
      } finally {
        h.f()
      }
      if (!l) return void (t.__redom_lifecycle = {});
      var f = n,
      p = !1;
      (c || f && f.__redom_mounted) &&
      (u(t, c ? 'onremount' : 'onmount'), p = !0);
      for (; f; ) {
        var y = f.parentNode,
        v = f.__redom_lifecycle ||
        (f.__redom_lifecycle = {});
        for (var m in o) v[m] = (v[m] || 0) + o[m];
        if (p) break;
        (
          f.nodeType === Node.DOCUMENT_NODE ||
          s &&
          f instanceof ShadowRoot ||
          y &&
          y.__redom_mounted
        ) &&
        (u(f, c ? 'onremount' : 'onmount'), p = !0),
        f = y
      }
    }(t, c, o, h),
    t
  }
  function u(e, t) {
    'onmount' === t ||
    'onremount' === t ? e.__redom_mounted = !0 : 'onunmount' === t &&
    (e.__redom_mounted = !1);
    var n = e.__redom_lifecycle;
    if (n) {
      var r = e.__redom_view,
      i = 0;
      for (var o in r && r[t] && r[t](), n) o &&
      i++;
      if (i) for (var a = e.firstChild; a; ) {
        var s = a.nextSibling;
        u(a, t),
        a = s
      }
    }
  }
  function l(e, t, n) {
    e.style[t] = null == n ? '' : n
  }
  var h = 'http://www.w3.org/1999/xlink';
  function d(e, t, n, r) {
    var i = m(e);
    if ('object' === _typeof(t)) for (var o in t) d(i, o, t[o]);
     else {
      var a = i instanceof SVGElement,
      s = 'function' == typeof n;
      if ('style' === t && 'object' === _typeof(n)) !function (e, t, n) {
        var r = m(e);
        if ('object' === _typeof(t)) for (var i in t) l(r, i, t[i]);
         else l(r, t, n)
      }(i, n);
       else if (a && s) i[t] = n;
       else if ('dataset' === t) p(i, n);
       else if (a || !(t in i) && !s || 'list' === t) {
        if (a && 'xlink' === t) return void f(i, n);
        'class' === t &&
        (n = i.className + ' ' + n),
        null == n ? i.removeAttribute(t) : i.setAttribute(t, n)
      } else i[t] = n
    }
  }
  function f(e, t, n) {
    if ('object' === _typeof(t)) for (var r in t) f(e, r, t[r]);
     else null != n ? e.setAttributeNS(h, t, n) : e.removeAttributeNS(h, t, n)
  }
  function p(e, t, n) {
    if ('object' === _typeof(t)) for (var r in t) p(e, r, t[r]);
     else null != n ? e.dataset[t] = n : delete e.dataset[t]
  }
  function y(e) {
    return document.createTextNode(null != e ? e : '')
  }
  function v(e, t, n) {
    var r,
    i = _createForOfIteratorHelper(t);
    try {
      for (i.s(); !(r = i.n()).done; ) {
        var o = r.value;
        if (0 === o || o) {
          var a = _typeof(o);
          'function' === a ? o(e) : 'string' === a ||
          'number' === a ? e.appendChild(y(o)) : g(m(o)) ? c(e, o) : o.length ? v(e, o) : 'object' === a &&
          d(e, o, null)
        }
      }
    } catch (e) {
      i.e(e)
    } finally {
      i.f()
    }
  }
  function m(e) {
    return e.nodeType &&
    e ||
    !e.el &&
    e ||
    m(e.el)
  }
  function g(e) {
    return e &&
    e.nodeType
  }
  function _(e) {
    for (
      var t = m(e),
      n = arguments.length,
      i = new Array(n > 1 ? n - 1 : 0),
      o = 1;
      o < n;
      o++
    ) i[o - 1] = arguments[o];
    for (var a = w(e, i, t.firstChild); a; ) {
      var s = a.nextSibling;
      r(e, a),
      a = s
    }
  }
  function w(e, t, n) {
    for (var r = n, i = Array(t.length), o = 0; o < t.length; o++) i[o] = t[o] &&
    m(t[o]);
    for (var a = 0; a < t.length; a++) {
      var s = t[a];
      if (s) {
        var u = i[a];
        if (u !== r) if (g(u)) {
          var l = r &&
          r.nextSibling,
          h = null != s.__redom_index &&
          l === i[a + 1];
          c(e, s, r, h),
          h &&
          (r = l)
        } else null != s.length &&
        (r = w(e, s, r));
         else r = r.nextSibling
      }
    }
    return r
  }
  var k = function () {
    return _createClass(
      (
        function e(t, n, r) {
          _classCallCheck(this, e),
          this.View = t,
          this.initData = r,
          this.oldLookup = {},
          this.lookup = {},
          this.oldViews = [],
          this.views = [],
          null != n &&
          (
            this.key = 'function' == typeof n ? n : function (e) {
              return function (t) {
                return t[e]
              }
            }(n)
          )
        }
      ),
      [
        {
          key: 'update',
          value: function (e, t) {
            for (
              var n = this.View,
              r = this.key,
              i = this.initData,
              o = null != r,
              a = this.lookup,
              s = {},
              c = Array(e.length),
              u = this.views,
              l = 0;
              l < e.length;
              l++
            ) {
              var h = e[l],
              d = void 0;
              if (o) {
                var f = r(h);
                d = a[f] ||
                new n(i, h, l, e),
                s[f] = d,
                d.__redom_id = f
              } else d = u[l] ||
              new n(i, h, l, e);
              d.update &&
              d.update(h, l, e, t),
              m(d.el).__redom_view = d,
              c[l] = d
            }
            this.oldViews = u,
            this.views = c,
            this.oldLookup = a,
            this.lookup = s
          }
        }
      ]
    )
  }();
  function x(e, t, n, r) {
    return new b(e, t, n, r)
  }
  var b = function () {
    return _createClass(
      (
        function e(n, r, i, o) {
          _classCallCheck(this, e),
          this.View = r,
          this.initData = o,
          this.views = [],
          this.pool = new k(r, i, o),
          this.el = function (e) {
            return 'string' == typeof e ? t(e) : m(e)
          }(n),
          this.keySet = null != i
        }
      ),
      [
        {
          key: 'update',
          value: function () {
            var e = arguments.length > 0 &&
            void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments.length > 1 ? arguments[1] : void 0,
            n = this.keySet,
            i = this.views;
            this.pool.update(e, t);
            var o = this.pool,
            a = o.views,
            s = o.lookup;
            if (n) for (var c = 0; c < i.length; c++) {
              var u = i[c];
              null == s[u.__redom_id] &&
              (u.__redom_index = null, r(this, u))
            }
            for (var l = 0; l < a.length; l++) {
              a[l].__redom_index = l
            }
            _(this, a),
            n &&
            (this.lookup = s),
            this.views = a
          }
        }
      ]
    )
  }();
  b.extend = function (e, t, n, r) {
    return b.bind(b, e, t, n, r)
  },
  x.extend = b.extend;
  var C = function () {
    return _createClass(
      (
        function e(t, n) {
          _classCallCheck(this, e),
          this.el = y(''),
          this.visible = !1,
          this.view = null,
          this._placeholder = this.el,
          t instanceof Node ? this._el = t : t.el instanceof Node ? (this._el = t, this.view = t) : this._View = t,
          this._initData = n
        }
      ),
      [
        {
          key: 'update',
          value: function (e, t) {
            var n = this._placeholder,
            i = this.el.parentNode;
            if (e) {
              if (!this.visible) if (this._el) c(i, this._el, n),
              r(i, n),
              this.el = m(this._el),
              this.visible = e;
               else {
                var o = new (0, this._View) (this._initData);
                this.el = m(o),
                this.view = o,
                c(i, o, n),
                r(i, n)
              }
              this.view &&
              this.view.update &&
              this.view.update(t)
            } else if (this.visible) {
              if (this._el) return c(i, n, this._el),
              r(i, this._el),
              this.el = n,
              void (this.visible = e);
              c(i, n, this.view),
              r(i, this.view),
              this.el = n,
              this.view = null
            }
            this.visible = e
          }
        }
      ]
    )
  }(),
  E = 'http://www.w3.org/2000/svg';
  function L(t) {
    for (
      var n,
      r = _typeof(t),
      i = arguments.length,
      o = new Array(i > 1 ? i - 1 : 0),
      a = 1;
      a < i;
      a++
    ) o[a - 1] = arguments[a];
    if ('string' === r) n = e(t, E);
     else {
      if ('function' !== r) throw new Error('At least one argument required');
      n = _construct(t, o)
    }
    return v(m(n), o),
    n
  }
  L.extend = function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return L.bind.apply(L, [
      this
    ].concat(t))
  },
  L.ns = E;
  var T = function () {
    return _createClass(
      (function e() {
        _classCallCheck(this, e),
        this.el = n('.menu-item')
      }),
      [
        {
          key: 'update',
          value: function (e) {
            var t = this,
            n = e.name,
            r = e.onclick;
            this.el.textContent = n,
            this.el.onclick = function (e) {
              r(e),
              t.el.blur()
            }
          }
        }
      ]
    )
  }(),
  S = function () {
    return _createClass(
      (function e() {
        _classCallCheck(this, e),
        this.el = x('.menu', T)
      }),
      [
        {
          key: 'update',
          value: function (e) {
            this.el.update(e)
          }
        }
      ]
    )
  }(),
  O = {
    width: 448,
    height: 512,
    path: 'M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z'
  },
  P = _createClass(
    (
      function e(t) {
        var r = t.id,
        i = t.x,
        o = t.y,
        a = t.name;
        _classCallCheck(this, e),
        this.el = n(
          '.player',
          {
            style: {
              transform: 'translate('.concat(i, 'em, ').concat(o, 'em)')
            }
          },
          n(
            '.symbol',
            L(
              'svg',
              {
                height: '3em',
                viewBox: '0 0 '.concat(O.width, ' ').concat(O.height)
              },
              L('path', {
                d: O.path
              })
            )
          ),
          n('.name', a)
        ),
        this.id = r,
        this.x = i,
        this.y = o,
        this.name = a
      }
    )
  ),
  j = function () {
    return _createClass(
      (
        function e() {
          var t = arguments.length > 0 &&
          void 0 !== arguments[0] ? arguments[0] : {
          },
          r = t.width,
          i = t.height;
          _classCallCheck(this, e),
          this.el = n('.stage', this.$cards = n('.cards'), this.$players = n('.players')),
          this.cards = [],
          this.players = [],
          this.x = 0,
          this.y = 0,
          this.width = r,
          this.height = i,
          this.size = 1
        }
      ),
      [
        {
          key: 'update',
          value: function () {
            var e = 2100,
            t = 1400,
            n = Math.min(1, Math.min(window.innerWidth / e, window.innerHeight / t));
            this.size < n ? this.size = n : this.size > 1 &&
            (this.size = 1);
            var r = - (1050 * this.size - window.innerWidth / 2),
            i = 1050 * this.size - window.innerWidth / 2,
            o = - (700 * this.size - window.innerHeight / 2),
            a = 700 * this.size - window.innerHeight / 2;
            r > i &&
            (r = i = 0),
            o > a &&
            (o = a = 0),
            this.x < r ? this.x = r : this.x > i &&
            (this.x = i),
            this.y < o ? this.y = o : this.y > a &&
            (this.y = a),
            this.el.style.transform = 'translate('.concat(this.x, 'px, ').concat(this.y, 'px) scale(').concat(this.size, ', ').concat(this.size, ')')
          }
        },
        {
          key: 'get',
          value: function (e) {
            for (var t = 0; t < this.cards.length; t++) if (this.cards[t]._id === e) return this.cards[t]
          }
        },
        {
          key: 'reset',
          value: function () {
            for (var e = 0; e < this.cards.length; e++) this.cards.splice(e--, 1);
            for (var t = 0; t < this.players.length; t++) this.players.splice(t--, 1);
            for (; this.$cards.firstChild; ) r(this.$cards, this.$cards.firstChild);
            for (; this.$players.firstChild; ) r(this.$players, this.$players.firstChild)
          }
        },
        {
          key: 'remove',
          value: function (e) {
            for (var t = 0; t < this.cards.length; t++) this.cards[t] === e &&
            (this.cards.splice(t--, 1), r(this.$cards, e))
          }
        },
        {
          key: 'pushPlayer',
          value: function (e) {
            this.players.push(e),
            c(this.$players, new P(e))
          }
        },
        {
          key: 'push',
          value: function (e) {
            this.cards.push(e),
            c(this.$cards, e)
          }
        },
        {
          key: 'ondeckcardpop',
          value: function (e, t) {
            e.pop(),
            window.multiplayer &&
            M(this.socket, t._id, 'deckpop', {
              _id: t._id
            })
          }
        },
        {
          key: 'oncardclick',
          value: function (e) {
            window.multiplayer ? M(this.socket, e._id, 'cardflip', {
              _id: e._id
            }) : (e.frontside = !e.frontside, e.update())
          }
        },
        {
          key: 'oncardmovestart',
          value: function (e, t) {
            t.card = !0,
            e._moveStart = {
              x: e.x,
              y: e.y
            },
            this._moveStart = {
              x: this.x,
              y: this.y
            },
            window.multiplayer ? M(this.socket, e._id, 'cardmovestart', {
              _id: e._id
            }) : (this.remove(e), this.push(e))
          }
        },
        {
          key: 'oncardmove',
          value: function (e, t, n, r) {
            var i = this;
            r.card = !0;
            var o,
            a = 746,
            s = 376,
            c = {
              x: e._moveStart.x + t / this.size,
              y: e._moveStart.y + n / this.size
            };
            this.players.forEach(
              (
                function (e) {
                  var t = 16 * e.x,
                  n = 16 * e.y;
                  Math.abs(c.x - t) < 100 &&
                  Math.abs(c.y - n) < 100 &&
                  (o = e)
                }
              )
            ),
            (o && o._id) !== e.player &&
            (
              e.player = o &&
              o._id,
              window.multiplayer &&
              M(this.socket, e._id, 'playercard', {
                _id: e._id,
                player: o &&
                o._id
              })
            ),
            o ||
            (
              c.x < - 746 ? (
                c.x = - 746,
                this.el.style.borderColor = '#ccc',
                clearTimeout(this.collisionTimeout),
                this.collisionTimeout = setTimeout((function () {
                  i.el.style.borderColor = ''
                }), 2000)
              ) : c.x > a &&
              (
                c.x = a,
                this.el.style.borderColor = '#ccc',
                clearTimeout(this.collisionTimeout),
                this.collisionTimeout = setTimeout((function () {
                  i.el.style.borderColor = ''
                }), 2000)
              ),
              c.y < - 376 ? (
                c.y = - 376,
                this.el.style.borderColor = '#ccc',
                clearTimeout(this.collisionTimeout),
                this.collisionTimeout = setTimeout((function () {
                  i.el.style.borderColor = ''
                }), 2000)
              ) : c.y > s &&
              (
                c.y = s,
                this.el.style.borderColor = '#ccc',
                clearTimeout(this.collisionTimeout),
                this.collisionTimeout = setTimeout((function () {
                  i.el.style.borderColor = ''
                }), 2000)
              ),
              e.move(c.x, c.y, !0),
              window.multiplayer &&
              M(this.socket, e._id, 'cardmove', {
                _id: e._id,
                x: c.x,
                y: c.y
              })
            )
          }
        },
        {
          key: 'oncardmoveend',
          value: function (e, t, n, r) {
            if (r.card = !0, window.multiplayer) {
              var i = {
                x: e._moveStart.x + t / this.size,
                y: e._moveStart.y + n / this.size
              };
              A['cardmove.' + e._id] = !1,
              M(this.socket, e._id, 'cardmove', {
                _id: e._id,
                x: i.x,
                y: i.y
              })
            }
          }
        }
      ]
    )
  }(),
  A = {};
  function M(e, t, n, r) {
    if ('cardmove' === n) {
      if (A[n + '.' + t]) return;
      A[n + '.' + t] = !0
    }
    e.emit(n, r, (function () {
      'cardmove' === n &&
      (A[n + '.' + t] = !1)
    }))
  }
  var z = function (e) {
    return e.x - e.width / 2
  },
  I = function (e) {
    return e.x + e.width / 2
  },
  N = function (e) {
    return e.y - e.height / 2
  },
  G = function (e) {
    return e.y + e.height / 2
  };
  var D = window.requestAnimationFrame ||
  function (e) {
    setTimeout(e, 0)
  },
  q = function () {
    this.animations = []
  };
  q.prototype.add = function (e) {
    this.animations.push(e)
  },
  q.prototype.render = function () {
    for (var e = this.animations, t = Date.now(), n = 0; n < e.length; n++) {
      var r = e[n];
      if (!(t < r.start)) {
        r.started ||
        (r.started = !0, r.onstart && r.onstart());
        var i = Math.min(1, (t - r.start) / (r.end - r.start)),
        o = r.ease(i);
        r.onprogress &&
        r.onprogress(o, i),
        t >= r.end &&
        (r.onend && r.onend(), e.splice(n--, 1))
      }
    }
  },
  q.prototype.remove = function (e) {
    for (var t = this.animations, n = 0; n < t.length; n++) t[n] === this &&
    t.splice(n--, 1)
  };
  var R,
  Y = new q,
  H = function (e) {
    return function (t) {
      return Math.pow(t, e)
    }
  },
  X = function (e) {
    return function (t) {
      return 1 - Math.abs(Math.pow(t - 1, e))
    }
  },
  F = function (e) {
    return function (t) {
      return t < 0.5 ? H(e) (2 * t) / 2 : X(e) (2 * t - 1) / 2 + 0.5
    }
  },
  $ = {
    linear: function (e) {
      return e
    },
    quadIn: H(2),
    quadOut: X(2),
    quadInOut: F(2),
    cubicIn: H(3),
    cubicOut: X(3),
    cubicInOut: F(3),
    quartIn: H(4),
    quartOut: X(4),
    quartInOut: F(4),
    quintIn: H(5),
    quintOut: X(5),
    quintInOut: F(5),
    sineIn: function (e) {
      return 1 + Math.sin(Math.PI / 2 * e - Math.PI / 2)
    },
    sineOut: function (e) {
      return Math.sin(Math.PI / 2 * e)
    },
    sineInOut: function (e) {
      return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2
    },
    bounce: function (e) {
      var t = 7.5625,
      n = 2.75;
      return e < 1 / n ? t * e * e : e < 2 / n ? t * (e -= 1.5 / n) * e + 0.75 : e < 2.5 / n ? t * (e -= 2.25 / n) * e + 0.9375 : t * (e -= 2.625 / n) * e + 0.984375
    }
  },
  V = function (e) {
    void 0 === e &&
    (e = {});
    var t = e.delay;
    void 0 === t &&
    (t = 0);
    var n = e.duration;
    void 0 === n &&
    (n = 0);
    var r = e.easing;
    void 0 === r &&
    (r = 'quadOut');
    var i = e.oninit,
    o = e.onstart,
    a = e.onprogress,
    s = e.onend;
    R ||
    (R = D(W));
    var c = Date.now();
    if (
      this.initTime = c,
      this.delay = t,
      this.duration = n,
      this.easing = r,
      this.onstart = o,
      this.onprogress = a,
      this.onend = s,
      !this.ease
    ) throw new Error('Easing not found');
    Y.add(this),
    i &&
    i()
  },
  B = {
    start: {
      configurable: !0
    },
    end: {
      configurable: !0
    },
    ease: {
      configurable: !0
    }
  };
  function W() {
    Y.render(),
    R = D(W)
  }
  function U(e) {
    for (var t = [], n = [], r = [], i = 0; i < e.cards.length; i++) {
      var o = {
        x: e.cards[i].x,
        y: e.cards[i].y,
        i: i
      };
      o.xStart = o.x,
      o.yStart = o.y,
      t.push(o);
      var a = e.width / 2 * 16;
      Math.random() < 0.5 ? (n.push(o), o.xTarget = - a - a * Math.random()) : (r.push(o), o.xTarget = a + a * Math.random())
    }
    return new Promise(
      (
        function (n) {
          e.cards.forEach(
            (
              function (r, i) {
                var o = new V({
                  delay: 54 * i * 2 / e.cards.length,
                  duration: 225,
                  easing: 'quadInOut'
                });
                r.animation = o;
                var a = t[i],
                s = a.xStart,
                c = a.xTarget;
                o.onprogress = function (n) {
                  r.x = s + n * (c - s),
                  r.y = - e.d * i,
                  t[i].x = r.x,
                  t[i].y = r.y,
                  r.update()
                },
                o.onend = function () {
                  i === Math.round(e.cards.length / 2) &&
                  n()
                }
              }
            )
          )
        }
      )
    ).then(
      (
        function () {
          return Promise.all(
            e.cards.map(
              (
                function (i, o) {
                  return new Promise(
                    (
                      function (a) {
                        Math.random() < 0.5 ? t[o] = n.length ? n.shift() : r.shift() : t[o] = r.length ? r.shift() : n.shift(),
                        i.animation.destroy();
                        var s = t[o].x,
                        c = t[o].y,
                        u = - e.d * o,
                        l = - e.d * o;
                        i.x = s,
                        i.y = c,
                        i.update();
                        var h = new V({
                          delay: 54 * o * 2 / e.cards.length,
                          duration: 225,
                          easing: 'quadInOut'
                        });
                        h.onprogress = function (e) {
                          i.x = s + e * (u - s),
                          i.y = c + e * (l - c),
                          i.update()
                        },
                        h.onend = function () {
                          a()
                        }
                      }
                    )
                  )
                }
              )
            )
          )
        }
      )
    )
  }
  B.start.get = function () {
    return this.initTime + this.delay
  },
  B.end.get = function () {
    return this.start + this.duration
  },
  B.ease.get = function () {
    return $[this.easing]
  },
  V.prototype.destroy = function () {
    Y.remove(this)
  },
  V.from = function (e, t) {
    return e * (1 - t)
  },
  Object.defineProperties(V.prototype, B),
  V.ease = $;
  var J = function () {
    return _createClass(
      (
        function e(t) {
          _classCallCheck(this, e),
          this.stage = t,
          this.cards = [],
          this.x = 0,
          this.y = 0,
          this.d = 1 / 4,
          this.z = 0
        }
      ),
      [
        {
          key: 'reset',
          value: function () {
            for (var e = 0; e < this.cards.length; e++) this.cards.splice(e--, 1)
          }
        },
        {
          key: 'intro',
          value: function () {
            !function (e) {
              e.cards = _toConsumableArray(e.stage.cards);
              var t = 0;
              Promise.all(
                e.cards.map(
                  (
                    function (e, n) {
                      return new Promise(
                        (
                          function (n) {
                            var r = e.x,
                            i = e.y - 300,
                            o = e.x,
                            a = e.y;
                            e.frontside = !0,
                            e.el.style.opacity = 0,
                            e.update();
                            var s = new V({
                              delay: 1000 + 10 * t++,
                              duration: 1000,
                              easing: 'quartOut'
                            });
                            s.onstart = function () {
                              e.frontside = !1,
                              e.el.style.opacity = ''
                            },
                            s.onprogress = function (t, n) {
                              e.x = r + t * (o - r),
                              e.y = i + t * (a - i),
                              e.update()
                            },
                            s.onend = function () {
                              e.frontside = !1,
                              n()
                            }
                          }
                        )
                      )
                    }
                  )
                )
              ).then((function () {
                e.resetPositions()
              }))
            }(this)
          }
        },
        {
          key: 'pop',
          value: function () {
            this.cards.pop().deck = null
          }
        },
        {
          key: 'collision',
          value: function (e) {
            for (var t = 0; t < this.cards.length; t++) if (
              this.cards[t] !== e &&
              (
                n = this.cards[t],
                r = e,
                z(n) < I(r) &&
                I(n) > z(r) &&
                N(n) < G(r) &&
                G(n) > N(r)
              )
            ) return !0;
            var n,
            r;
            return !1
          }
        },
        {
          key: 'oncardlongpress',
          value: function (e, t) {
            var n = this;
            this._moving = !0,
            this.cards.forEach(
              (
                function (e) {
                  n.stage.oncardmovestart(e, t),
                  e.el.classList.add('moving'),
                  e.el.classList.add('movingdeck')
                }
              )
            )
          }
        },
        {
          key: 'oncardmovestart',
          value: function (e, t) {
            return !this.shuffling &&
            (
              this.cards[this.cards.length - 1] === e &&
              (
                this.stage.oncardmovestart(e, t),
                void e.el.classList.add('moving')
              )
            )
          }
        },
        {
          key: 'oncardmove',
          value: function (e, t, n, r) {
            var i = this;
            this._moving ? this.cards.forEach((function (e, o) {
              i.stage.oncardmove(e, t, n, r)
            })) : this.stage.oncardmove(e, t, n, r)
          }
        },
        {
          key: 'oncardmoveend',
          value: function (e, t, n, r) {
            var i = this;
            this._moving ? (
              this._moving = !1,
              this.cards.forEach(
                (
                  function (e, o) {
                    i.stage.oncardmoveend(e, t, n, r),
                    e.el.classList.remove('moving'),
                    e.el.classList.remove('movingdeck')
                  }
                )
              )
            ) : (
              this.stage.ondeckcardpop(this, e),
              e.el.classList.remove('moving'),
              this.stage.oncardmoveend(e, t, n, r)
            )
          }
        },
        {
          key: 'shuffle',
          value: function () {
            var e = this;
            if (!this.shuffling) return this.shuffling = !0,
            U(this).then((function () {
              return U(e)
            })).then((function () {
              e.shuffling = !1
            }))
          }
        },
        {
          key: 'collect',
          value: function () {
            return function (e) {
              e.cards = [];
              for (var t = 0; t < e.stage.cards.length; t++) e.cards.push(e.stage.cards[t]);
              var n = 0;
              return Promise.all(
                e.cards.map(
                  (
                    function (t, r) {
                      return new Promise(
                        (
                          function (i) {
                            var o = t.x,
                            a = t.y,
                            s = - e.d * r,
                            c = - e.d * r;
                            if (o === s && a === c) return i();
                            var u = new V({
                              delay: 10 * n++,
                              duration: 300,
                              easing: 'quadInOut'
                            });
                            u.onprogress = function (e, n) {
                              t.x = o + e * (s - o),
                              t.y = a + e * (c - a),
                              t.update()
                            },
                            u.onend = i
                          }
                        )
                      )
                    }
                  )
                )
              ).then((function () {
                e.resetPositions()
              }))
            }(this)
          }
        },
        {
          key: 'width',
          get: function () {
            return this.stage.width
          }
        },
        {
          key: 'height',
          get: function () {
            return this.stage.height
          }
        },
        {
          key: 'resetPositions',
          value: function () {
            this.z = 0;
            for (var e = 0; e < this.cards.length; e++) {
              var t = this.cards[e];
              t.x = - this.d * e,
              t.y = - this.d * e,
              t.z = this.z++,
              t.frontside = !1,
              t.player = null,
              this.stage.remove(t),
              this.stage.push(t),
              t.deck = this,
              t.update()
            }
          }
        },
        {
          key: 'push',
          value: function (e) {
            e.deck = this,
            this.cards.push(e)
          }
        }
      ]
    )
  }(),
  K = !1;
  try {
    var Z = Object.defineProperty({
    }, 'passive', {
      get: function () {
        K = !0
      }
    });
    window.addEventListener('testPassive', null, Z),
    window.removeEventListener('testPassive', null, Z)
  } catch (e) {
  }
  var Q = !!K &&
  {
    passive: !1
  };
  var ee = function () {
    return _createClass(
      (
        function e(t) {
          var r = this;
          _classCallCheck(this, e),
          this.x = 0,
          this.y = 0,
          this.stage = t,
          this.data = {},
          this.el = n('.card'),
          function (e) {
            var t;
            function n(n) {
              if (
                n.preventDefault(),
                !(
                  'mousedown' === n.type &&
                  n.which > 1 ||
                  n.touches &&
                  n.touches.length > 1 ||
                  e.onmovestart &&
                  !1 === e.onmovestart(n)
                )
              ) {
                var r = Date.now();
                'touchstart' === n.type ? (
                  document.addEventListener('touchmove', s, Q),
                  document.addEventListener('touchend', c, Q)
                ) : (
                  document.addEventListener('mousemove', s, Q),
                  document.addEventListener('mouseup', c, Q)
                );
                var i = {
                  x: n.touches ? n.touches[0].pageX : n.pageX,
                  y: n.touches ? n.touches[0].pageY : n.pageY
                },
                o = {
                  x: 0,
                  y: 0
                },
                a = !1;
                t = setTimeout((function () {
                  a ||
                  e.onlongpress &&
                  e.onlongpress(n)
                }), 1000)
              }
              function s(t) {
                if (t.preventDefault(), !(t.touches && t.touches.length > 1)) {
                  var n = t.touches ? t.touches[0].pageX : t.pageX,
                  r = t.touches ? t.touches[0].pageY : t.pageY,
                  s = {
                    x: n - i.x,
                    y: r - i.y
                  };
                  o.x = s.x,
                  o.y = s.y,
                  e.onmove &&
                  e.onmove(s.x, s.y, t),
                  (Math.abs(o.x) > 5 || Math.abs(o.y) > 5) &&
                  (a = !0),
                  e.update()
                }
              }
              function c(n) {
                n.preventDefault(),
                'touchend' === n.type ? (
                  document.removeEventListener('touchmove', s),
                  document.removeEventListener('touchend', c)
                ) : (
                  document.removeEventListener('mousemove', s),
                  document.removeEventListener('mouseup', c)
                ),
                e.onmoveend &&
                e.onmoveend(o.x, o.y, n),
                !a &&
                Date.now() - r < 300 &&
                e.onclick &&
                e.onclick(),
                clearTimeout(t)
              }
            }
            e.el.addEventListener('touchstart', n, Q),
            e.el.addEventListener('mousedown', n, Q)
          }(this),
          this.el.style.backgroundImage = 'url(/img/standard-deck/back.png',
          this.onlongpress = function (e) {
            r.deck &&
            r.deck.oncardlongpress(r, e)
          },
          this.onclick = function () {
            r.stage.oncardclick(r)
          },
          this.onmovestart = function (e) {
            return r.deck ? r.deck.oncardmovestart(r, e) : r.stage.oncardmovestart(r, e)
          },
          this.onmove = function (e, t, n) {
            return r.deck ? r.deck.oncardmove(r, e, t, n) : r.stage.oncardmove(r, e, t, n)
          },
          this.onmoveend = function (e, t, n) {
            return r.deck ? r.deck.oncardmoveend(r, e, t, n) : r.stage.oncardmoveend(r, e, t, n)
          }
        }
      ),
      [
        {
          key: 'width',
          get: function () {
            return this.stage.width
          }
        },
        {
          key: 'height',
          get: function () {
            return this.stage.height
          }
        },
        {
          key: 'getSuit',
          value: function (e) {
            return Math.floor(e / 13)
          }
        },
        {
          key: 'getValue',
          value: function (e) {
            return e % 13
          }
        },
        {
          key: 'getColor',
          value: function (e) {
            return this.getSuit(e) % 2
          }
        },
        {
          key: 'move',
          value: function (e, t, n) {
            this.x = e,
            this.y = t,
            this.el.style.transform = 'translate('.concat(this.x / 16, 'em, ').concat(this.y / 16, 'em)')
          }
        },
        {
          key: 'update',
          value: function () {
            if (this.move(this.x, this.y), this.frontside !== this._frontside) {
              if (this._frontside = this.frontside, !this.frontside) return this.el.style.backgroundImage = 'url(/img/standard-deck/back.png',
              void (this._i = null);
              this.el.style.backgroundImage = 'url(/img/standard-deck/front-'.concat(this.i, '.png)')
            }
            this.frontside &&
            null != this.i &&
            this.i !== this._i &&
            (this._i = this.i)
          }
        }
      ]
    )
  }(),
  te = 0,
  ne = _createClass(
    (
      function e(t) {
        _classCallCheck(this, e),
        this._id = te++,
        this.x = 0,
        this.y = 0,
        this.z = t.moveUp(),
        this.width = 6.25,
        this.height = 8.75,
        this.frontside = !1,
        this.moveUp = function () {
          return t.moveUp()
        }
      }
    )
  );
  var re = function () {
    return _createClass(
      (
        function e(t) {
          _classCallCheck(this, e),
          this.cards = new Array(54),
          this.cardLookup = {},
          this.d = 1 / 4,
          this.z = 0;
          for (var n = 0; n < this.cards.length; n++) {
            var r = new ne(t);
            r.i = this.cards.length - 1 - n,
            r.deck = !0,
            this.cards[n] = r,
            this.cardLookup[r._id] = r
          }
          this.init()
        }
      ),
      [
        {
          key: 'shuffle',
          value: function () {
            !function (e) {
              if (!e.length) return e;
              for (var t = e.length - 1; t; t--) {
                var n = Math.floor(Math.random() * (t + 1)),
                r = e[t];
                e[t] = e[n],
                e[n] = r
              }
            }(this.cards),
            this.z = 0,
            this.init()
          }
        },
        {
          key: 'init',
          value: function () {
            for (var e = 0; e < this.cards.length; e++) {
              var t = this.cards[e];
              t.x = - e * this.d,
              t.y = - e * this.d,
              t.z = this.z++,
              t.frontside = !1,
              t.deck = !0
            }
          }
        }
      ]
    )
  }(),
  ie = function () {
    return _createClass(
      (
        function e() {
          _classCallCheck(this, e),
          this.z = 0,
          this.deck = new re(this)
        }
      ),
      [
        {
          key: 'moveUp',
          value: function () {
            return this.z++
          }
        }
      ]
    )
  }();
  function oe(e, t, n) {
    var r = new XMLHttpRequest;
    return r.open('POST', e, !0),
    r.setRequestHeader('Content-Type', 'application/json; charset=UTF-8'),
    r.onload = function () {
      200 === r.status ? n &&
      n(null, JSON.parse(r.responseText)) : n &&
      n(r.status, r.responseText)
    },
    r.onerror = function (e) {
      n &&
      n(e, r.responseText)
    },
    t ? r.send(JSON.stringify(t)) : r.send(),
    r
  }
  var ae = function () {
    return _createClass(
      (
        function e(t) {
          var r = t.oncancel;
          _classCallCheck(this, e),
          this.el = n(
            '.multiplayer',
            this.wrapper = n(
              '.wrapper',
              this.createButton = n('.button', 'Create multiplayer game'),
              this.creatingGame = n('.button.disabled', 'Creating multiplayer game...'),
              this.copyGame = n(
                '.input',
                n('.label', 'Share game link:'),
                this.copyGameInput = n('input', {
                  readonly: !0
                })
              ),
              this.play = n('.button', 'Play'),
              this.error = n('.button.disabled'),
              this.join = n(
                'form',
                this.enterName = n(
                  '.input',
                  n('.label', 'Enter your name:'),
                  this.name = n('input', {
                    placeholder: 'John Doe',
                    autofocus: !0
                  }),
                  n(
                    'p',
                    {
                      style: {
                        color: '#888',
                        padding: '.5rem',
                        fontSize: '.75rem'
                      }
                    },
                    {
                      innerHTML: 'Privacy notice: You can send messages to other players in the game. Messages, players and games get deleted from servers automatically after 24 hours. Transfer of all data is secure (HTTPS).'
                    }
                  )
                ),
                this.joinGame = n('.button', 'Join game')
              ),
              this.joiningGame = n('.button.disabled', 'Joining game...')
            )
          ),
          this.wrapper.onclick = function (e) {
            e.multiplayer = !0
          },
          this.el.onclick = function (e) {
            e.multiplayer ||
            r()
          }
        }
      ),
      [
        {
          key: 'update',
          value: function (e) {
            var t = this,
            n = e.join,
            r = e.game,
            i = e.onstart;
            e.oncancel;
            this.creatingGame.style.display = 'none',
            this.copyGame.style.display = 'none',
            this.play.style.display = 'none',
            this.error.style.display = 'none',
            this.creatingGame.style.display = 'none',
            this.enterName.style.display = 'none',
            this.joinGame.style.display = 'none',
            this.joiningGame.style.display = 'none',
            n &&
            (
              this.createButton.style.display = 'none',
              this.enterName.style.display = '',
              this.joinGame.style.display = '',
              this.join.onsubmit = function (e) {
                e.preventDefault(),
                t.enterName.style.display = 'none',
                t.joinGame.style.display = 'none',
                t.joiningGame.style.display = '',
                oe(
                  '/api/game/join',
                  {
                    game: r,
                    name: t.name.value
                  },
                  (
                    function (e, n) {
                      if (t.joiningGame.style.display = 'none', e) return t.error.textContent = 'Something went wrong 😞',
                      void (t.error.style.display = '');
                      var r = n.game,
                      o = n.player;
                      i({
                        game: r,
                        player: o
                      })
                    }
                  )
                )
              },
              this.joinGame.onclick = this.join.onsubmit
            ),
            this.createButton.onclick = function () {
              t.creatingGame.style.display = '',
              t.createButton.style.display = 'none',
              oe(
                '/api/game/create',
                {
                },
                (
                  function (e, n) {
                    if (t.creatingGame.style.display = 'none', e) return t.error.textContent = 'Something went wrong 😞',
                    void (t.error.style.display = '');
                    var r = n.game;
                    t.copyGame.style.display = '',
                    t.copyGameInput.value = 'https://deck.of.cards/play/' + r,
                    t.play.style.display = '',
                    t.play.onclick = function () {
                      location.pathname = '/play/' + r
                    }
                  }
                )
              )
            }
          }
        }
      ]
    )
  }(),
  se = function () {
    return _createClass(
      (
        function e() {
          var t = this;
          _classCallCheck(this, e),
          this.data = [],
          this.lastReadAt = 0,
          this.opened = !1,
          this.el = n(
            '.messages',
            this.title = n('.messages-title', 'Messages'),
            this.messages = x('.messages-list', ce),
            this.form = n(
              'form',
              n(
                '.messages-compose',
                this.message = n('input', {
                  maxlength: 1000
                }),
                n('div', n('button', 'Send message'))
              )
            )
          ),
          this.messages.el.style.display = 'none',
          this.form.style.display = 'none',
          window.addEventListener('wheel', (function (e) {
            e.letScroll = !0
          }), !0),
          this.title.onclick = function () {
            t.opened = !t.opened,
            t.opened ? (t.messages.el.style.display = '', t.form.style.display = '') : (
              t.messages.el.style.display = 'none',
              t.form.style.display = 'none'
            ),
            t.update()
          }
        }
      ),
      [
        {
          key: 'update',
          value: function () {
            var e = arguments.length > 0 &&
            void 0 !== arguments[0] ? arguments[0] : this.data;
            if (
              this.data = e,
              this.messages.update(e),
              this.unread = 0,
              this.opened
            ) {
              this.el.classList.add('opened');
              for (var t = 0; t < e.length; t++) this.lastReadAt = e[t].time;
              this.title.textContent = 'Messages'
            } else {
              this.el.classList.remove('opened');
              for (var n = 0; n < e.length; n++) new Date(e[n].time) > this.lastReadAt &&
              this.unread++;
              this.unread ? this.title.textContent = 1 === this.unread ? ''.concat(this.unread, ' unread message') : ''.concat(this.unread, ' unread messages') : this.title.textContent = 'Messages'
            }
            this.messages.el.scrollTop = this.messages.el.scrollHeight
          }
        },
        {
          key: 'onsubmit',
          set: function (e) {
            var t = this;
            this.form.onsubmit = function (n) {
              n.preventDefault(),
              t.message.value &&
              e(t.message.value.slice(0, 1000)),
              t.message.value = ''
            }
          }
        }
      ]
    )
  }(),
  ce = function () {
    return _createClass(
      (
        function e() {
          _classCallCheck(this, e),
          this.el = n(
            '.message',
            this.name = n('.message-name'),
            this.time = n('.message-time'),
            this.message = n('.message-message')
          )
        }
      ),
      [
        {
          key: 'update',
          value: function (e) {
            var t = e._player,
            n = e.time,
            r = e.message;
            this.name.textContent = t,
            this.time.textContent = new Date(n).toLocaleTimeString(),
            this.message.textContent = r
          }
        }
      ]
    )
  }(),
  ue = 'deck-dev.of.cards' === location.hostname,
  le = new ie,
  he = new j({
    width: 6.25,
    height: 8.75
  }),
  de = new J(he);
  he.game = le,
  he.deck = de;
  for (var fe = 0; fe < le.deck.cards.length; fe++) {
    var pe = new ee(he);
    pe._id = le.deck.cards[fe]._id,
    pe.i = le.deck.cards[fe].i,
    pe.update(),
    de.push(pe),
    he.push(pe)
  }
  de.resetPositions(),
  window.multiplayer ||
  de.intro(),
  c(document.body, he, document.querySelector('.oldlink'));
  var ye = function () {
    var e = _asyncToGenerator(
      _regeneratorRuntime().mark(
        (
          function e(t, n) {
            var r,
            i,
            o,
            a,
            s,
            u,
            l,
            h;
            return _regeneratorRuntime().wrap(
              (
                function (e) {
                  for (; ; ) switch (e.prev = e.next) {
                    case 0:
                      return (r = new se).onsubmit = function (e) {
                        u.emit('message', {
                          message: e,
                          game: t,
                          player: n
                        })
                      },
                      c(document.body, r),
                      (i = document.createElement('div')).className = 'popup',
                      i.textContent = 'Connecting...',
                      document.body.appendChild(i),
                      e.next = 9,
                      be(
                        [{
                          host: 'https://deck'.concat(ue ? '-dev' : '', '-hel1.of.cards'),
                          city: 'Helsinki, Finland',
                          continent: 'Europe'
                        },
                        {
                          host: 'https://deck'.concat(ue ? '-dev' : '', '-nbg1.of.cards'),
                          city: 'Nuremberg, Germany',
                          continent: 'Europe'
                        },
                        {
                          host: 'https://deck'.concat(ue ? '-dev' : '', '-fsn1.of.cards'),
                          city: 'Falkenstein, Germany',
                          continent: 'Europe'
                        }
                        ],
                        {
                          host: 'https://deck'.concat(ue ? '-dev' : '', '.of.cards'),
                          city: 'Cloudflare (fallback)'
                        }
                      );
                    case 9:
                      o = e.sent,
                      a = o.host,
                      s = o.city,
                      i.textContent = 'Connected to '.concat(s, '. Have fun!'),
                      setTimeout((function () {
                        document.body.removeChild(i)
                      }), 1500),
                      u = io(a, {
                        query: {
                          game: t ||
                          '',
                          player: n ||
                          ''
                        }
                      }),
                      l = [],
                      h = {},
                      u.on(
                        'hello',
                        (
                          function (e) {
                            he.reset(),
                            he.deck.reset();
                            var t = e.cards;
                            e.players.forEach(
                              (
                                function (e) {
                                  if (e.you) {
                                    var t = e._id,
                                    n = e.name,
                                    r = e.x,
                                    i = e.y;
                                    u.emit('player', {
                                      _id: t,
                                      name: n,
                                      x: r,
                                      y: i
                                    })
                                  }
                                  he.pushPlayer(e),
                                  h[e._id] = e
                                }
                              )
                            ),
                            r.update(e.messages.map((function (e) {
                              return l.push(e),
                              e
                            }))),
                            u.on('message', (function (e) {
                              l.push(e),
                              r.update(l)
                            })),
                            t.sort((function (e, t) {
                              return e.z - t.z
                            }));
                            for (var n = 0; n < t.length; n++) {
                              var i = new ee(he),
                              o = t[n],
                              a = o._id,
                              s = o.x,
                              c = o.y,
                              d = o.z,
                              f = o.frontside,
                              p = o.player;
                              i._id = a,
                              i.x = s,
                              i.y = c,
                              i.z = d,
                              i.i = t[n].i,
                              i.frontside = f,
                              i.player = p,
                              i.update(),
                              t[n].deck &&
                              de.push(i),
                              he.push(i)
                            }
                          }
                        )
                      ),
                      u.on(
                        'player',
                        (
                          function (e) {
                            h[e._id] = e,
                            he.players.find((function (t) {
                              return t._id === e._id
                            })) ||
                            he.pushPlayer(e)
                          }
                        )
                      ),
                      u.on(
                        'playercard',
                        (
                          function (e) {
                            he.players.forEach(
                              (
                                function (e) {
                                  var t = 0;
                                  he.cards.forEach(
                                    (
                                      function (n) {
                                        if (n.player === e._id) {
                                          var r = 16 * (e.x + 1 * t),
                                          i = 16 * e.y;
                                          n.x = r,
                                          n.y = i,
                                          n.z = Date.now(),
                                          n.update(),
                                          t++
                                        }
                                      }
                                    )
                                  )
                                }
                              )
                            )
                          }
                        )
                      ),
                      u.on(
                        'cardmovestart',
                        (
                          function (e) {
                            var t = e._id,
                            n = he.cards.find((function (e) {
                              return e._id === t
                            }));
                            n &&
                            (n.player || (he.remove(n), he.push(n)))
                          }
                        )
                      ),
                      u.on(
                        'cardmove',
                        (
                          function (e) {
                            var t = e._id,
                            n = e.x,
                            r = e.y,
                            i = he.cards.find((function (e) {
                              return e._id === t
                            }));
                            i &&
                            i.move(n, r)
                          }
                        )
                      ),
                      u.on(
                        'cardflip',
                        (
                          function (e) {
                            var t = e._id,
                            n = e.i,
                            r = e.frontside,
                            i = he.cards.find((function (e) {
                              return e._id === t
                            }));
                            i &&
                            (i.i = n, i.frontside = r, i.update())
                          }
                        )
                      ),
                      u.on(
                        'deckpop',
                        (
                          function (e) {
                            var t = e._id;
                            he.cards.find((function (e) {
                              return e._id === t
                            })) &&
                            de.pop()
                          }
                        )
                      ),
                      u.on(
                        'reset',
                        (
                          function (e) {
                            he.cards.length = e.length,
                            de.cards.length = e.length;
                            for (var t = 0; t < e.length; t++) {
                              var n = he.cards[t] ||
                              new ee(he),
                              r = e[t],
                              i = r._id,
                              o = r.x,
                              a = r.y,
                              s = r.z,
                              c = r.frontside,
                              u = r.player;
                              n._id = i,
                              n.x = o,
                              n.y = a,
                              n.z = s,
                              n.i = e[t].i,
                              n.frontside = c,
                              n.player = u,
                              n.update(),
                              de.cards[t] = n,
                              he.cards[t] = n
                            }
                            he.deck.collect()
                          }
                        )
                      ),
                      u.on(
                        'shuffle',
                        (
                          function () {
                            he.deck.collect().then((function () {
                              return he.deck.shuffle()
                            }))
                          }
                        )
                      ),
                      he.socket = u;
                    case 27:
                    case 'end':
                      return e.stop()
                  }
                }
              ),
              e
            )
          }
        )
      )
    );
    return function (t, n) {
      return e.apply(this, arguments)
    }
  }();
  window.startMultiplayer = ye;
  var ve = new S;
  window.castSpectate ||
  c(document.body, ve);
  var me,
  ge,
  _e,
  we = new C(ae, {
    oncancel: function () {
      we.update(null)
    }
  });
  c(document.body, we),
  window.multiplayer &&
  we.update(
    !0,
    {
      join: !0,
      game: window.game,
      onstart: function (e) {
        var t = e.game,
        n = e.player;
        ye(t, n),
        we.update(!1)
      }
    }
  ),
  ve.update(
    [window.multiplayer ? {
      name: 'Single player',
      onclick: function () {
        window.location.pathname = '/'
      }
    }
     : {
      name: 'Multiplayer',
      onclick: function () {
        we.update(!0, {
          multiplayer: we
        })
      }
    },
    {
      name: 'Shuffle',
      onclick: function () {
        window.multiplayer ? he.socket.emit('shuffle') : he.deck.collect().then((function () {
          return he.deck.shuffle()
        })).then(
          (
            function () {
              le.deck.shuffle(),
              he.deck.cards.forEach((function (e, t) {
                e.i = le.deck.cards[t].i,
                e.update()
              }))
            }
          )
        )
      }
    },
    {
      name: 'Add deck',
      onclick: function () {
        if (window.multiplayer) he.socket.emit('add-deck');
         else {
          for (var e = 0; e < 54; e++) {
            var t = new ne(le);
            t.i = e,
            le.deck.cards.push(t);
            var n = new ee(he);
            n._id = le.deck.cards[e]._id,
            n.i = le.deck.cards[e].i,
            n.x = - de.d * (e + le.deck.cards.length),
            n.y = - 300 - de.d * (e + le.deck.cards.length),
            n.update(),
            de.push(n),
            he.push(n)
          }
          he.deck.collect()
        }
      }
    }
    ]
  );
  var ke = function (e) {
    if ((0 !== e.touches.length || e.stage) && !e.card) {
      var t;
      e.preventDefault(),
      1 === e.touches.length ? (
        ge = {
          x: he.x,
          y: he.y
        },
        _e = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        }
      ) : 2 === e.touches.length &&
      (
        ge = {
          x: he.x,
          y: he.y
        },
        me = he.size,
        _e = {
          x: e.touches[0].pageX + (e.touches[1].pageX - e.touches[0].pageX) / 2,
          y: e.touches[0].pageY + (e.touches[1].pageY - e.touches[0].pageY) / 2
        }
      );
      var n = function (e) {
        if (e.preventDefault(), 1 === e.touches.length) {
          var n = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
          },
          r = {
            x: n.x - _e.x,
            y: n.y - _e.y
          };
          he.x = ge.x + r.x,
          he.y = ge.y + r.y,
          he.update()
        } else if (2 === e.touches.length) {
          var i = e.touches[0].pageX,
          o = e.touches[0].pageY,
          a = e.touches[1].pageX,
          s = e.touches[1].pageY,
          c = Math.sqrt(Math.pow(a - i, 2) + Math.pow(s - o, 2));
          null == t &&
          (t = c),
          he.size = me * c / t,
          he.update();
          var u = {
            x: e.touches[0].pageX + (e.touches[1].pageX - e.touches[0].pageX) / 2,
            y: e.touches[0].pageY + (e.touches[1].pageY - e.touches[0].pageY) / 2
          },
          l = {
            x: u.x - _e.x,
            y: u.y - _e.y
          };
          he.x = ge.x + l.x,
          he.y = ge.y + l.y,
          he.update()
        }
      },
      r = function (e) {
        window.removeEventListener('touchstart', ke, Q),
        window.removeEventListener('touchmove', n, Q),
        window.removeEventListener('touchend', r, Q)
      };
      window.addEventListener('touchmove', n, Q),
      window.addEventListener('touchend', r, Q)
    }
  };
  he.el.addEventListener(
    'touchstart',
    (
      function (e) {
        e.stage = !0,
        ke(e),
        window.addEventListener('touchstart', ke, Q)
      }
    ),
    Q
  );
  he.el.addEventListener('mousedown', (function (e) {
    e.stage = !0
  })),
  window.addEventListener(
    'mousedown',
    (
      function (e) {
        if (e.stage && !(e.card || e.which > 1)) {
          e.preventDefault();
          var t = he.x,
          n = he.y,
          r = e.pageX,
          i = e.pageY,
          o = function (e) {
            var o = e.pageX - r,
            a = e.pageY - i;
            he.x = t + o,
            he.y = n + a,
            he.update()
          },
          a = function (e) {
            window.removeEventListener('mousemove', o),
            window.removeEventListener('mouseup', a)
          };
          window.addEventListener('mousemove', o),
          window.addEventListener('mouseup', a)
        }
      }
    )
  );
  var xe = function () {
    var e = window.innerWidth,
    t = window.innerHeight,
    n = Math.max(0.25, Math.min(e / 1600, t / 900));
    he.size = n,
    he.update()
  };
  xe(),
  window.addEventListener('resize', (function () {
    he.update()
  })),
  window.addEventListener(
    'orientationchange',
    (function () {
      requestAnimationFrame((function () {
        xe()
      }))
    })
  );
  function be(e, t) {
    return Ce.apply(this, arguments)
  }
  function Ce() {
    return (
      Ce = _asyncToGenerator(
        _regeneratorRuntime().mark(
          (
            function e(t, n) {
              var r,
              i,
              o,
              a,
              s;
              return _regeneratorRuntime().wrap(
                (
                  function (e) {
                    for (; ; ) switch (e.prev = e.next) {
                      case 0:
                        try {
                          i = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/') [0],
                          t.sort(
                            (
                              function (e, t) {
                                return i === e.continent &&
                                i !== t.continent ? - 1 : i === t.continent &&
                                i !== e.continent ? 1 : 0
                              }
                            )
                          )
                        } catch (e) {
                          console.error(e)
                        }
                        o = _createForOfIteratorHelper(t),
                        e.prev = 2,
                        s = _regeneratorRuntime().mark(
                          (
                            function e() {
                              var t,
                              n,
                              i,
                              o,
                              s,
                              c,
                              u;
                              return _regeneratorRuntime().wrap(
                                (
                                  function (e) {
                                    for (; ; ) switch (e.prev = e.next) {
                                      case 0:
                                        return t = a.value,
                                        n = t.host,
                                        i = t.city,
                                        o = new AbortController,
                                        s = setTimeout((function () {
                                          return o.abort()
                                        }), 5000),
                                        e.prev = 3,
                                        c = Date.now(),
                                        e.next = 7,
                                        fetch(n + '/ping', {
                                          signal: o.signal
                                        });
                                      case 7:
                                        clearTimeout(s),
                                        u = Date.now() - c,
                                        r ? u < r.latency &&
                                        (r = {
                                          host: n,
                                          city: i,
                                          latency: u
                                        }) : r = {
                                          host: n,
                                          city: i,
                                          latency: u
                                        },
                                        e.next = 16;
                                        break;
                                      case 12:
                                        e.prev = 12,
                                        e.t0 = e.catch(3),
                                        console.error(e.t0),
                                        clearTimeout(s);
                                      case 16:
                                      case 'end':
                                        return e.stop()
                                    }
                                  }
                                ),
                                e,
                                null,
                                [
                                  [3,
                                  12]
                                ]
                              )
                            }
                          )
                        ),
                        o.s();
                      case 5:
                        if ((a = o.n()).done) {
                          e.next = 9;
                          break
                        }
                        return e.delegateYield(s(), 't0', 7);
                      case 7:
                        e.next = 5;
                        break;
                      case 9:
                        e.next = 14;
                        break;
                      case 11:
                        e.prev = 11,
                        e.t1 = e.catch(2),
                        o.e(e.t1);
                      case 14:
                        return e.prev = 14,
                        o.f(),
                        e.finish(14);
                      case 17:
                        if (!r) {
                          e.next = 21;
                          break
                        }
                        return e.abrupt('return', r);
                      case 21:
                        return e.abrupt('return', n);
                      case 22:
                      case 'end':
                        return e.stop()
                    }
                  }
                ),
                e,
                null,
                [
                  [2,
                  11,
                  14,
                  17]
                ]
              )
            }
          )
        )
      )
    ).apply(this, arguments)
  }
  window.addEventListener(
    'wheel',
    (
      function (e) {
        for (var t = e.target; t; ) {
          if ('messages' === t.className) return;
          t = t.parentNode
        }
        e.preventDefault(),
        he.size += - 0.0025 * e.deltaY,
        he.update()
      }
    ),
    Q
  ),
  'serviceWorker' in navigator &&
  window.addEventListener(
    'load',
    (
      function () {
        navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        }).then(
          (
            function (e) {
              console.log('Registration succeeded. Scope is ' + e.scope)
            }
          )
        ).catch((function (e) {
          console.error('Registration failed with ' + e)
        }))
      }
    )
  )
}();
