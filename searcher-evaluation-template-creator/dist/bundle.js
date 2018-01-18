/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(296);

	var _redux = __webpack_require__(110);

	var _reactRedux = __webpack_require__(20);

	var _reduxThunk = __webpack_require__(297);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _index = __webpack_require__(138);

	var _index2 = _interopRequireDefault(_index);

	var _EvaluationTemplateCreator = __webpack_require__(131);

	var _EvaluationTemplateCreator2 = _interopRequireDefault(_EvaluationTemplateCreator);

	var _api = __webpack_require__(139);

	var _api2 = _interopRequireDefault(_api);

	__webpack_require__(197);

	var _axios = __webpack_require__(67);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	!window._babelPolyfill && __webpack_require__(295); // prevent polyfill from importing twice


	// Add redux dev tools unless we have a production build
	var enhance =  false ? (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), window.devToolsExtension && window.devToolsExtension()) : (0, _redux.applyMiddleware)(_reduxThunk2.default);

	// Configure store with thunk middleware to allow async requests
	var store = (0, _redux.createStore)(_index2.default, enhance);

	var hostname = _api2.default.configureHostname();
	var headers = _api2.default.configureHeaders();

	_axios2.default.defaults.baseURL = hostname;
	_axios2.default.defaults.headers.common = headers;

	(0, _reactDom.render)(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_EvaluationTemplateCreator2.default, null)
	), document.querySelector('[data-component="searcher-evaluation-template-creator"]'));
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(enhance, 'enhance', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/index.js');

	    __REACT_HOT_LOADER__.register(store, 'store', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/index.js');

	    __REACT_HOT_LOADER__.register(hostname, 'hostname', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/index.js');

	    __REACT_HOT_LOADER__.register(headers, 'headers', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/index.js');
	})();

	;

/***/ },
/* 1 */
/***/ function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(72);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(56)('wks');
	var uid = __webpack_require__(35);
	var Symbol = __webpack_require__(6).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6);
	var core = __webpack_require__(1);
	var ctx = __webpack_require__(48);
	var hide = __webpack_require__(16);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(12))(327);

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(14);
	var IE8_DOM_DEFINE = __webpack_require__(82);
	var toPrimitive = __webpack_require__(58);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ },
/* 9 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(83);
	var defined = __webpack_require__(49);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = vendor_lib;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var UPLOAD_SUCCESS = exports.UPLOAD_SUCCESS = 'success';
	var UPLOAD_FAILED = exports.UPLOAD_FAILED = 'failed';
	var UPLOAD_IN_PROGRESS = exports.UPLOAD_IN_PROGRESS = 'uploading';
	var INPUT_SYNC_INTERVAL = exports.INPUT_SYNC_INTERVAL = 350;
	var SAVE_ANIM_INTERVAL = exports.SAVE_ANIM_INTERVAL = 1000;
	var MESSAGE_TYPE_ERROR = exports.MESSAGE_TYPE_ERROR = 'error';
	var MESSAGE_TYPE_SUCCESS = exports.MESSAGE_TYPE_SUCCESS = 'success';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(UPLOAD_SUCCESS, 'UPLOAD_SUCCESS', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/index.js');

	  __REACT_HOT_LOADER__.register(UPLOAD_FAILED, 'UPLOAD_FAILED', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/index.js');

	  __REACT_HOT_LOADER__.register(UPLOAD_IN_PROGRESS, 'UPLOAD_IN_PROGRESS', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/index.js');

	  __REACT_HOT_LOADER__.register(INPUT_SYNC_INTERVAL, 'INPUT_SYNC_INTERVAL', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/index.js');

	  __REACT_HOT_LOADER__.register(SAVE_ANIM_INTERVAL, 'SAVE_ANIM_INTERVAL', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/index.js');

	  __REACT_HOT_LOADER__.register(MESSAGE_TYPE_ERROR, 'MESSAGE_TYPE_ERROR', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/index.js');

	  __REACT_HOT_LOADER__.register(MESSAGE_TYPE_SUCCESS, 'MESSAGE_TYPE_SUCCESS', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/index.js');
	})();

	;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(27);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7);
	var createDesc = __webpack_require__(30);
	module.exports = __webpack_require__(8) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(88);
	var enumBugKeys = __webpack_require__(50);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(98);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(12))(381);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(152), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(155), __esModule: true };

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(143);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(145);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(142);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(80);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(80);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {};


/***/ },
/* 29 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(49);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(61),
	    getRawTag = __webpack_require__(238),
	    objectToString = __webpack_require__(263);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MESSAGE_TYPE_ERROR = exports.MESSAGE_TYPE_ERROR = 'error';
	var MESSAGE_TYPE_SUCCESS = exports.MESSAGE_TYPE_SUCCESS = 'success';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(MESSAGE_TYPE_ERROR, 'MESSAGE_TYPE_ERROR', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/constants/index.js');

	  __REACT_HOT_LOADER__.register(MESSAGE_TYPE_SUCCESS, 'MESSAGE_TYPE_SUCCESS', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/constants/index.js');
	})();

	;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(21);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(250),
	    listCacheDelete = __webpack_require__(251),
	    listCacheGet = __webpack_require__(252),
	    listCacheHas = __webpack_require__(253),
	    listCacheSet = __webpack_require__(254);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(40);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(248);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(63);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(65),
	    isLength = __webpack_require__(106);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(224);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(2);
	var normalizeHeaderName = __webpack_require__(125);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(68);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(68);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(290)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVALUATION_TEMPLATE_LIST_PAGE = undefined;

	var _extends2 = __webpack_require__(34);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.publishTemplate = publishTemplate;
	exports.minimiseAllQuestions = minimiseAllQuestions;
	exports.minimiseAllCriteria = minimiseAllCriteria;
	exports.toggleMaximiseQuestion = toggleMaximiseQuestion;
	exports.toggleMaximiseCriteria = toggleMaximiseCriteria;
	exports.initialize = initialize;
	exports.addTemplate = addTemplate;
	exports.updateTemplate = updateTemplate;
	exports.addCriteria = addCriteria;
	exports.deleteCriteria = deleteCriteria;
	exports.updateCriteria = updateCriteria;
	exports.addQuestionToCriteria = addQuestionToCriteria;
	exports.onQuestionTypeChange = onQuestionTypeChange;
	exports.onQuestionTitleChange = onQuestionTitleChange;
	exports.onQuestionAllowUploadChange = onQuestionAllowUploadChange;
	exports.onAllowScaleDefinitionChange = onAllowScaleDefinitionChange;
	exports.onQuestionAllowCommentsChange = onQuestionAllowCommentsChange;
	exports.deleteQuestion = deleteQuestion;
	exports.onScaleDefinitionChange = onScaleDefinitionChange;
	exports.addDocumentsForQuestion = addDocumentsForQuestion;
	exports.deleteDocument = deleteDocument;
	exports.incrementProgress = incrementProgress;
	exports.fetchTemplate = fetchTemplate;
	exports.isBusy = isBusy;

	var _axios = __webpack_require__(67);

	var _axios2 = _interopRequireDefault(_axios);

	var _jsonApiNormalizer = __webpack_require__(93);

	var _jsonApiNormalizer2 = _interopRequireDefault(_jsonApiNormalizer);

	var _reduxObject = __webpack_require__(109);

	var _reduxObject2 = _interopRequireDefault(_reduxObject);

	var _dataParserUtil = __webpack_require__(46);

	var _ActionTypes = __webpack_require__(73);

	var _constants = __webpack_require__(33);

	var _actions = __webpack_require__(77);

	var _actions2 = __webpack_require__(75);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TEMPLATE_SERVICE_URL = 'evaluation-templates';
	var EVALUATION_TEMPLATE_LIST_PAGE = exports.EVALUATION_TEMPLATE_LIST_PAGE = '/searcher/evaluation_templates/list';

	function publishTemplate() {
	    return function (dispatch, getState) {

	        var templateId = getState().evaluationTemplateCreator.id;
	        return _axios2.default.post(TEMPLATE_SERVICE_URL + '/' + templateId + '/finalise', {}).then(function () {
	            var title = 'Template Published';
	            var comment = 'Your Template has been successfully published.';
	            dispatch((0, _actions2.showModal)(title, comment, function () {
	                window.location.href = EVALUATION_TEMPLATE_LIST_PAGE;
	            }));
	        }).catch(function (error) {
	            if (error.status_code === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
	            } else {
	                error.response.data.errors.forEach(function (item) {
	                    var detail = item.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}
	function minimiseAllQuestions() {
	    return { type: _ActionTypes.MINIMISE_ALL_QUESTIONS };
	}
	function minimiseAllCriteria() {
	    return { type: _ActionTypes.MINIMISE_ALL_CRITERIA };
	}
	function toggleMaximiseQuestion(id, isMaximised) {
	    return { type: _ActionTypes.QUESTION_MAXIMISE_CHANGE, id: id, isMaximised: isMaximised };
	}

	function toggleMaximiseCriteria(id, isMaximised) {
	    return { type: _ActionTypes.CRITERIA_MAXIMISE_CHANGE, id: id, isMaximised: isMaximised };
	}

	function initialize() {
	    return function (dispatch) {
	        dispatch(isBusy(true));
	        return _axios2.default.get('evaluation-question-types').then(function (response) {
	            var questionTypes = (0, _dataParserUtil.parseInitialData)(response.data);
	            if (questionTypes.length) {
	                dispatch({ type: _ActionTypes.INITIALIZED, questionTypes: questionTypes });
	            } else {
	                var message = 'Unable to proceed. Initial data returned by the service is empty';
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, message));
	            }
	        }).catch(function () {
	            dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, 'Unable to recieve data.'));
	        });
	    };
	}
	function addTemplate(title) {
	    return function (dispatch) {
	        dispatch(isBusy(true));
	        var data = (0, _dataParserUtil.parseDataForCreateTemplate)(title);
	        return _axios2.default.post(TEMPLATE_SERVICE_URL, data).then(function (response) {
	            var template = response.data.data;
	            dispatch({ type: _ActionTypes.TEMPLATE_CREATED,
	                title: template.attributes.title,
	                id: Number(template.id)
	            });
	        }).catch(function (error) {
	            isBusy(false);
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}

	function updateTemplate(title, templateId) {

	    return function (dispatch) {
	        var data = (0, _dataParserUtil.parseDataForUpdateTemplate)(title, templateId);
	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        return _axios2.default.patch(serviceUrl, data).then(function () {
	            dispatch({ type: _ActionTypes.TEMPLATE_UPDATED, title: title });
	        }).catch(function (error) {
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}

	function addCriteria(title, weight) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));

	        var _getState = getState(),
	            evaluationTemplateCreator = _getState.evaluationTemplateCreator;

	        var templateId = evaluationTemplateCreator.id;
	        var data = (0, _dataParserUtil.parseDataForCreateCriteria)(title, weight);
	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria';

	        return _axios2.default.post(serviceUrl, data).then(function (response) {
	            dispatch({ type: _ActionTypes.CRITERIA_ADD, criterion: (0, _dataParserUtil.createCriterionFromData)(response.data) });
	        }).catch(function (error) {
	            dispatch(isBusy(false));
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}

	function deleteCriteria(id) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));

	        var _getState2 = getState(),
	            evaluationTemplateCreator = _getState2.evaluationTemplateCreator;

	        var templateId = evaluationTemplateCreator.id;
	        var data = (0, _dataParserUtil.parseDataForDeleteCriteria)(id);
	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + id;
	        return _axios2.default.delete(serviceUrl, data).then(function () {
	            dispatch({ type: _ActionTypes.CRITERIA_DELETE, id: id });
	        }).catch(function (error) {
	            dispatch(isBusy(false));
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}

	function updateCriteria(id, title, weight) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));

	        var _getState3 = getState(),
	            evaluationTemplateCreator = _getState3.evaluationTemplateCreator;

	        var templateId = evaluationTemplateCreator.id;
	        var data = (0, _dataParserUtil.parseDataForUpdateCriteria)(id, title, weight);
	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + id;
	        return _axios2.default.patch(serviceUrl, data).then(function () {
	            dispatch({ type: _ActionTypes.CRITERIA_UPDATE, id: id, title: title, weight: weight });
	        }).catch(function (error) {
	            dispatch(isBusy(false));
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}

	function addQuestionToCriteria(criteriaId, questionTitle, questionType) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));

	        var _getState4 = getState(),
	            evaluationTemplateCreator = _getState4.evaluationTemplateCreator;

	        var templateId = evaluationTemplateCreator.id;
	        var data = (0, _dataParserUtil.parseDataForCreateQuestion)(questionTitle, questionType);
	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions';
	        return _axios2.default.post(serviceUrl, data).then(function (response) {
	            var question = (0, _dataParserUtil.parseDataFromCreateQuestion)(response.data);
	            dispatch({ type: _ActionTypes.QUESTION_ADD, criteriaId: criteriaId, question: question });
	        }).catch(function (error) {
	            dispatch(isBusy(false));
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}

	function onQuestionTypeChange(criteriaId, questionId, type) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));

	        var _getState5 = getState(),
	            evaluationTemplateCreator = _getState5.evaluationTemplateCreator;

	        var templateId = evaluationTemplateCreator.id;
	        var question = evaluationTemplateCreator.questionsByIndex[questionId];
	        question = (0, _extends3.default)({}, question, { type: type });
	        var data = (0, _dataParserUtil.parseDataForUpdateQuestion)(question);
	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions/' + questionId;

	        return _axios2.default.patch(serviceUrl, data).then(function (response) {
	            var question = (0, _dataParserUtil.parseDataFromCreateQuestion)(response.data);
	            dispatch({ type: _ActionTypes.QUESTION_UPDATE, criteriaId: criteriaId, question: question });
	        }).catch(function (error) {
	            dispatch(isBusy(false));
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}
	function onQuestionTitleChange(criteriaId, questionId, title) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));

	        var _getState6 = getState(),
	            evaluationTemplateCreator = _getState6.evaluationTemplateCreator;

	        var templateId = evaluationTemplateCreator.id;

	        var question = evaluationTemplateCreator.questionsByIndex[questionId];
	        question = (0, _extends3.default)({}, question, { title: title });
	        var data = (0, _dataParserUtil.parseDataForUpdateQuestion)(question);

	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions/' + questionId;

	        return _axios2.default.patch(serviceUrl, data).then(function () {
	            dispatch({ type: _ActionTypes.QUESTION_UPDATE, criteriaId: criteriaId, question: question });
	        }).catch(function (error) {
	            dispatch(isBusy(false));
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}

	function onQuestionAllowUploadChange(criteriaId, questionId, isAllowUpload) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));

	        var _getState7 = getState(),
	            evaluationTemplateCreator = _getState7.evaluationTemplateCreator;

	        var templateId = evaluationTemplateCreator.id;

	        var question = evaluationTemplateCreator.questionsByIndex[questionId];
	        question = (0, _extends3.default)({}, question, { isAllowUpload: isAllowUpload });

	        var data = (0, _dataParserUtil.parseDataForUpdateQuestion)(question);

	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions/' + questionId;

	        return _axios2.default.patch(serviceUrl, data).then(function () {
	            dispatch({ type: _ActionTypes.QUESTION_UPDATE, criteriaId: criteriaId, question: question });
	        }).catch(function (error) {
	            dispatch(isBusy(false));
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}

	function onAllowScaleDefinitionChange(criteriaId, questionId, isAllowScaleDefinitions) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));

	        var _getState8 = getState(),
	            evaluationTemplateCreator = _getState8.evaluationTemplateCreator;

	        var templateId = evaluationTemplateCreator.id;

	        var question = evaluationTemplateCreator.questionsByIndex[questionId];
	        question = (0, _extends3.default)({}, question, { isAllowScaleDefinitions: isAllowScaleDefinitions });

	        var data = (0, _dataParserUtil.parseDataForUpdateQuestion)(question);

	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions/' + questionId;

	        return _axios2.default.patch(serviceUrl, data).then(function () {
	            dispatch({ type: _ActionTypes.QUESTION_UPDATE, criteriaId: criteriaId, question: question });
	        }).catch(function (error) {
	            dispatch(isBusy(false));
	            if (error.response.status === 422) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, error.response.statusText));
	            } else {
	                error.response.data.errors.forEach(function (e) {
	                    var detail = e.detail;

	                    dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, detail));
	                });
	            }
	        });
	    };
	}

	function onQuestionAllowCommentsChange(criteriaId, questionId, isCommentRequired) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));

	        var _getState9 = getState(),
	            evaluationTemplateCreator = _getState9.evaluationTemplateCreator;

	        var templateId = evaluationTemplateCreator.id;

	        var question = evaluationTemplateCreator.questionsByIndex[questionId];
	        question = (0, _extends3.default)({}, question, { isCommentRequired: isCommentRequired });

	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions/' + questionId;

	        var data = (0, _dataParserUtil.parseDataForUpdateQuestion)(question);

	        return _axios2.default.patch(serviceUrl, data).then(function () {
	            dispatch({ type: _ActionTypes.QUESTION_UPDATE, criteriaId: criteriaId, question: question });
	        }).catch(function (error) {
	            var message = void 0;
	            if (Array.isArray(error.response.data.errors)) {
	                message = error.response.data.errors[0].detail;
	            } else {
	                message = error.response.data.errors.detail;
	            }
	            dispatch(isBusy(true));
	            dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, message));
	        });
	    };
	}

	function deleteQuestion(criteriaId, questionId) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));
	        var templateId = getState().evaluationTemplateCreator.id;
	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions/' + questionId;

	        return _axios2.default.delete(serviceUrl).then(function () {
	            dispatch({ type: _ActionTypes.QUESTION_DELETE, criteriaId: criteriaId, questionId: questionId });
	        }).catch(function (error) {
	            var message = void 0;
	            dispatch(isBusy(false));
	            if (Array.isArray(error.response.data.errors)) {
	                message = error.response.data.errors[0].detail;
	            } else {
	                message = error.response.data.errors.detail;
	            }

	            dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, message));
	        });
	    };
	}

	function onScaleDefinitionChange(criteriaId, questionId, typeDefinitionId, text, score, scaleDefinitionId) {
	    return function (dispatch, getState) {
	        dispatch(isBusy(true));
	        var templateId = getState().evaluationTemplateCreator.id;
	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions/' + questionId;
	        serviceUrl += '/scale-definitions';
	        var data = (0, _dataParserUtil.parseDataForScaleDefinition)(typeDefinitionId, scaleDefinitionId, text, score);
	        var question = (0, _extends3.default)({}, getState().evaluationTemplateCreator.questionsByIndex[questionId]);
	        var promise = void 0;
	        if (scaleDefinitionId === undefined) {

	            promise = _axios2.default.post(serviceUrl, data).then(function (response) {
	                var responseScaleDef = (0, _jsonApiNormalizer2.default)(response.data, { endpoint: 'evaluation-question-scale-definitions' });
	                responseScaleDef = (0, _reduxObject2.default)(responseScaleDef, 'evaluationQuestionScaleDefinitions')[0];
	                question.scaleDefinitions = question.scaleDefinitions.map(function (item) {
	                    if (item.id === responseScaleDef.typeDefinition.id) {
	                        var label = text;
	                        var definitionId = response.data.data.id;
	                        return (0, _extends3.default)({}, item, { label: label, definitionId: definitionId });
	                    } else {
	                        return item;
	                    }
	                });
	                dispatch({ type: _ActionTypes.QUESTION_UPDATE, criteriaId: criteriaId, question: question });
	            });
	        } else {
	            serviceUrl += '/' + scaleDefinitionId;
	            if (text) {
	                promise = _axios2.default.patch(serviceUrl, data).then(function (response) {
	                    var responseScaleDef = (0, _jsonApiNormalizer2.default)(response.data, { endpoint: 'evaluation-question-scale-definitions' });
	                    responseScaleDef = (0, _reduxObject2.default)(responseScaleDef, 'evaluationQuestionScaleDefinitions')[0];

	                    question.scaleDefinitions = question.scaleDefinitions.map(function (item) {
	                        if (item.id === responseScaleDef.typeDefinition.id) {
	                            var label = text;
	                            return (0, _extends3.default)({}, item, { label: label });
	                        } else {
	                            return item;
	                        }
	                    });
	                    dispatch({ type: _ActionTypes.QUESTION_UPDATE, criteriaId: criteriaId, question: question });
	                });
	            } else {
	                promise = _axios2.default.delete(serviceUrl).then(function () {
	                    question.scaleDefinitions = question.scaleDefinitions.map(function (item) {
	                        if (item.definitionId === scaleDefinitionId) {
	                            var id = item.id,
	                                title = item.title,
	                                value = item.value;

	                            return { id: id, title: title, value: value };
	                        } else {
	                            return item;
	                        }
	                    });
	                    dispatch({ type: _ActionTypes.QUESTION_UPDATE, criteriaId: criteriaId, question: question });
	                });
	            }
	        }
	        promise.catch(function (error) {
	            var message = void 0;
	            if (Array.isArray(error.response.data.errors)) {
	                message = error.response.data.errors[0].detail;
	            } else {
	                message = error.response.data.errors.detail;
	            }
	            dispatch(isBusy(false));
	            dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, message));
	        });
	        return promise;
	    };
	}

	function addDocumentsForQuestion(criteriaId, questionId, documents) {
	    return function (dispatch, getState) {
	        var templateId = getState().evaluationTemplateCreator.id;
	        dispatch({
	            type: _ActionTypes.DOCUMENTS_UPLOADING,
	            questionId: questionId,
	            documents: documents
	        });

	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions/' + questionId;
	        serviceUrl += '/documents';

	        return _axios2.default.all(documents.map(function (document) {
	            var formData = new FormData();
	            formData.append('template_id', templateId);
	            formData.append('criteria_id', criteriaId);
	            formData.append('question_id', questionId);
	            formData.append('document', document);

	            return _axios2.default.post(serviceUrl, formData, {
	                onUploadProgress: function onUploadProgress(progressEvent) {
	                    var percentCompleted = progressEvent.loaded / progressEvent.total;
	                    dispatch(incrementProgress(document.id, Math.ceil(percentCompleted * 100)));
	                }
	            }).then(function (response) {
	                dispatch({
	                    type: _ActionTypes.DOCUMENT_UPLOAD_SUCCESS,
	                    criteriaId: criteriaId,
	                    questionId: questionId,
	                    documentId: document.id,
	                    newDocumentId: Number(response.data.data.id),
	                    url: String(response.data.data.attributes.download_url)
	                });
	                return response;
	            }).catch(function (error) {
	                dispatch({
	                    type: _ActionTypes.DOCUMENT_UPLOAD_FAILED,
	                    documentId: document.id
	                });
	                return error;
	            });
	        })).then(function (response) {
	            if (!response.every(function (response) {
	                return response.status === 200;
	            })) {
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, 'Error in uploading the document.'));
	            }
	        });
	    };
	}

	function deleteDocument(criteriaId, questionId, id) {
	    return function (dispatch, getState) {

	        var templateId = getState().evaluationTemplateCreator.id;
	        var reffId = getState().evaluationTemplateCreator.documentsByIndex[id].referenceId;

	        var serviceUrl = TEMPLATE_SERVICE_URL;
	        serviceUrl += '/' + templateId;
	        serviceUrl += '/criteria/' + criteriaId;
	        serviceUrl += '/questions/' + questionId;
	        serviceUrl += '/documents/' + reffId;

	        return _axios2.default.delete(serviceUrl).then(function () {
	            dispatch({ type: _ActionTypes.DOCUMENT_DELETE, questionId: questionId, id: id });
	        }).catch(function (error) {
	            var message = void 0;
	            if (Array.isArray(error.response.data.errors)) {
	                message = error.response.data.errors[0].detail;
	            } else {
	                message = error.response.data.errors.detail;
	            }

	            dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, message));
	        });
	    };
	}

	function incrementProgress(documentId, progress) {
	    return {
	        type: _ActionTypes.DOCUMENT_UPLOAD_IN_PROGRESS,
	        documentId: documentId,
	        progress: progress
	    };
	}

	function fetchTemplate(id) {
	    return function (dispatch) {
	        dispatch(isBusy(true));
	        _axios2.default.all([_axios2.default.get('evaluation-question-types').then(function (response) {
	            dispatch(isBusy(false));
	            var questionTypes = (0, _dataParserUtil.parseInitialData)(response.data);
	            if (questionTypes.length) {
	                dispatch({ type: _ActionTypes.INITIALIZED, questionTypes: questionTypes });
	            } else {
	                var message = 'Unable to proceed. Initial data returned by the service is empty';
	                dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, message));
	            }
	        }).catch(function (error) {
	            dispatch(isBusy(false));
	            var message = void 0;
	            if (Array.isArray(error.response.data.errors)) {
	                message = error.response.data.errors[0].detail;
	            } else {
	                message = error.response.data.errors.detail;
	            }

	            dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, message));
	        }), getPromiseForService(TEMPLATE_SERVICE_URL + '/' + id + '?include=criteria.questions', dispatch).then(function (response) {
	            var template = (0, _dataParserUtil.parseDataFromFetchTemplate)(response.data);
	            dispatch({ type: _ActionTypes.TEMPLATE_FETCHED, template: template });
	        })]);
	    };
	}

	function getPromiseForService(url, dispatch) {
	    return _axios2.default.get(url).catch(function (error) {
	        var message = error.message;

	        if (!message) {
	            if (Array.isArray(error.response.data.errors)) {
	                message = error.response.data.errors[0].details;
	            } else {

	                message = error.response.data.errors.details;
	            }
	        }
	        dispatch((0, _actions.showNotification)(_constants.MESSAGE_TYPE_ERROR, message));
	    });
	}

	function isBusy(status) {
	    return {
	        type: _ActionTypes.IS_BUSY,
	        status: status
	    };
	}
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(TEMPLATE_SERVICE_URL, 'TEMPLATE_SERVICE_URL', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(EVALUATION_TEMPLATE_LIST_PAGE, 'EVALUATION_TEMPLATE_LIST_PAGE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(publishTemplate, 'publishTemplate', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(minimiseAllQuestions, 'minimiseAllQuestions', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(minimiseAllCriteria, 'minimiseAllCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(toggleMaximiseQuestion, 'toggleMaximiseQuestion', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(toggleMaximiseCriteria, 'toggleMaximiseCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(initialize, 'initialize', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(addTemplate, 'addTemplate', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(updateTemplate, 'updateTemplate', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(addCriteria, 'addCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(deleteCriteria, 'deleteCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(updateCriteria, 'updateCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(addQuestionToCriteria, 'addQuestionToCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(onQuestionTypeChange, 'onQuestionTypeChange', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(onQuestionTitleChange, 'onQuestionTitleChange', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(onQuestionAllowUploadChange, 'onQuestionAllowUploadChange', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(onAllowScaleDefinitionChange, 'onAllowScaleDefinitionChange', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(onQuestionAllowCommentsChange, 'onQuestionAllowCommentsChange', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(deleteQuestion, 'deleteQuestion', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(onScaleDefinitionChange, 'onScaleDefinitionChange', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(addDocumentsForQuestion, 'addDocumentsForQuestion', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(deleteDocument, 'deleteDocument', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(incrementProgress, 'incrementProgress', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(fetchTemplate, 'fetchTemplate', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(getPromiseForService, 'getPromiseForService', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(isBusy, 'isBusy', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/actions/evaluationTemplateCreator.js');
	})();

	;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _assign = __webpack_require__(21);

	var _assign2 = _interopRequireDefault(_assign);

	var _extends2 = __webpack_require__(34);

	var _extends3 = _interopRequireDefault(_extends2);

	var _values = __webpack_require__(79);

	var _values2 = _interopRequireDefault(_values);

	var _stringify = __webpack_require__(141);

	var _stringify2 = _interopRequireDefault(_stringify);

	exports.getItemByAttrib = getItemByAttrib;
	exports.parseInitialData = parseInitialData;
	exports.deepClone = deepClone;
	exports.parseDataForCreateTemplate = parseDataForCreateTemplate;
	exports.parseDataForUpdateTemplate = parseDataForUpdateTemplate;
	exports.parseDataForCreateCriteria = parseDataForCreateCriteria;
	exports.parseDataForUpdateCriteria = parseDataForUpdateCriteria;
	exports.parseDataForDeleteCriteria = parseDataForDeleteCriteria;
	exports.parseDataForCreateQuestion = parseDataForCreateQuestion;
	exports.parseDataFromFetchTemplate = parseDataFromFetchTemplate;
	exports.parseDataFromCreateQuestion = parseDataFromCreateQuestion;
	exports.parseDataForScaleDefinition = parseDataForScaleDefinition;
	exports.parseDataForUpdateQuestion = parseDataForUpdateQuestion;
	exports.createQuestion = createQuestion;
	exports.createCriteria = createCriteria;
	exports.createCriterionFromData = createCriterionFromData;

	var _jsonApiNormalizer = __webpack_require__(93);

	var _jsonApiNormalizer2 = _interopRequireDefault(_jsonApiNormalizer);

	var _reduxObject = __webpack_require__(109);

	var _reduxObject2 = _interopRequireDefault(_reduxObject);

	var _models = __webpack_require__(74);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getItemByAttrib(arr, attrib, value) {
	    for (var i in arr) {
	        if (arr[i][attrib] === value) {
	            return arr[i];
	        }
	    }
	}
	function parseInitialData(responseData) {
	    var data = responseData.data;

	    return data.map(function (item) {
	        var type = item.id;
	        var title = item.attributes.title;

	        var definitions = item.relationships.definitions.data;
	        var maxOptionDefinitions = definitions.length;
	        return { title: title, type: type, maxOptionDefinitions: maxOptionDefinitions, definitions: definitions };
	    });
	}
	function deepClone(obj) {
	    return JSON.parse((0, _stringify2.default)(obj));
	}

	function parseDataForCreateTemplate(title) {
	    return { data: { type: 'evaluation-templates', attributes: { title: title } } };
	}

	function parseDataForUpdateTemplate(title, id) {
	    return { data: { type: 'evaluation-templates', id: id, attributes: { title: title } } };
	}

	function parseDataForCreateCriteria(title, weight) {
	    weight = Number(weight);
	    return { data: { type: 'evaluation-criteria', attributes: { title: title, weight: weight } } };
	}

	function parseDataForUpdateCriteria(id, title, weight) {
	    weight = Number(weight);
	    return { data: { type: 'evaluation-criteria', id: id, attributes: { title: title, weight: weight } } };
	}

	function parseDataForDeleteCriteria(id) {
	    return { data: { type: 'evaluation-criteria', id: id, attributes: { active: 0 } } };
	}

	function parseDataForCreateQuestion(text, questionType) {
	    var id = questionType;
	    return {
	        data: {
	            type: 'evaluation-questions',
	            attributes: {
	                text: text
	            },
	            relationships: {
	                type: {
	                    data: {
	                        type: 'evaluation-question-types',
	                        id: id
	                    }
	                }
	            }
	        }
	    };
	}
	function parseDataFromFetchTemplate(d) {
	    var normalizedData = (0, _jsonApiNormalizer2.default)(d, { endpoint: 'evaluation-templates' });
	    var data = d.data,
	        included = d.included;

	    var result = {};
	    result.id = Number(data.id);
	    var attributes = data.attributes,
	        relationships = data.relationships;

	    var allCriteriaIndexes = [];
	    var criteriaByIndex = {};
	    var questionsByIndex = {};
	    var allQuestionIndexes = [];
	    var documentsByIndex = {};
	    var allDocumentIndexes = [];
	    relationships.criteria.data.forEach(function (crtieriaItem) {

	        allCriteriaIndexes.push(String(crtieriaItem.id));
	        var includeCriteria = included.filter(function (include) {
	            return include.type === 'evaluation-criteria' && include.id === crtieriaItem.id;
	        });
	        includeCriteria = includeCriteria[0];
	        var criteria = createCriteria();
	        criteria.id = crtieriaItem.id;
	        criteria.title = includeCriteria.attributes.title;
	        criteria.weight = includeCriteria.attributes.weight;
	        criteria.isMaximised = false;
	        includeCriteria.relationships.questions.data.forEach(function (questionItem) {
	            var includedQuestion = included.filter(function (include) {
	                if (include.type === 'evaluation-questions' && include.id === questionItem.id) {
	                    return include;
	                }
	            });
	            includedQuestion = includedQuestion[0];
	            var question = createQuestion(Number(includedQuestion.relationships.type.data.id));
	            var _includedQuestion = includedQuestion,
	                attributes = _includedQuestion.attributes;

	            question.id = includedQuestion.id;
	            question.title = attributes.text;
	            question.isAllowScaleDefinitions = Boolean(attributes.enable_scale_definitions);
	            question.isAllowUpload = Boolean(attributes.allow_documents);
	            question.isCommentRequired = Boolean(attributes.mandatory_comments);
	            question.isMaximised = false;
	            question.documentIds = [];
	            var includedDocuments = [];
	            if (includedQuestion.relationships.documents) {
	                includedDocuments = includedQuestion.relationships.documents.data.map(function (documentItem) {
	                    var includedDocument = included.filter(function (include) {
	                        return include.type === 'uploads' && include.id === documentItem.id;
	                    });
	                    includedDocument = includedDocument[0];
	                    var document = {};
	                    includedDocument.id = includedDocument.id;
	                    document.name = includedDocument.attributes.original_name;
	                    document.status = 'success';
	                    document.progress = 100;
	                    document.id = includedDocument.id;
	                    document.referenceId = includedDocument.id;
	                    document.referenceUrl = includedDocument.attributes.download_url;
	                    return document;
	                });
	            }
	            includedDocuments.forEach(function (document) {
	                question.documentIds.push(document.id);
	                documentsByIndex[String(document.id)] = document;
	                allDocumentIndexes.push(document.id);
	            });

	            var evaluationQuestion = (0, _reduxObject2.default)(normalizedData, 'evaluationQuestions', question.id);

	            var typeDefinitionByIndex = {};

	            // convert object to array.
	            evaluationQuestion.type.definitions.forEach(function (definition) {
	                typeDefinitionByIndex[definition.id] = definition;
	            });

	            if (evaluationQuestion.definitions) {
	                evaluationQuestion.definitions.forEach(function (def) {

	                    var typeDefinitionId = def.typeDefinition.id;
	                    var typeDef = typeDefinitionByIndex[typeDefinitionId];
	                    if (typeDef) {
	                        var score = def.score,
	                            definition = def.definition,
	                            id = def.id;

	                        var definitionId = id;
	                        var label = definition;
	                        var newScaleDefinition = { id: typeDef.id, label: label, value: typeDef.value, score: score, definitionId: definitionId };
	                        typeDefinitionByIndex[typeDefinitionId] = newScaleDefinition;
	                    }
	                });
	            }
	            question.scaleDefinitions = (0, _values2.default)(typeDefinitionByIndex);
	            questionsByIndex[question.id] = question;
	            allQuestionIndexes.push(question.id);
	            criteria.questions.push(question.id);
	        });
	        criteriaByIndex[crtieriaItem.id] = criteria;
	    });
	    result.title = attributes.title;
	    result.published = Boolean(attributes.published);
	    result.allCriteriaIndexes = allCriteriaIndexes;
	    result.criteriaByIndex = criteriaByIndex;
	    result.allQuestionIndexes = allQuestionIndexes;
	    result.questionsByIndex = questionsByIndex;
	    result.documentsByIndex = documentsByIndex;
	    result.allDocumentIndexes = allDocumentIndexes;
	    return result;
	}
	function parseDataFromCreateQuestion(response) {
	    var normalizedObject = (0, _jsonApiNormalizer2.default)(response, { endpoint: 'evaluation-questions' });
	    var evaluationQuestionData = (0, _reduxObject2.default)(normalizedObject, 'evaluationQuestions')[0];
	    var id = evaluationQuestionData.id,
	        text = evaluationQuestionData.text,
	        enableScaleDefinitions = evaluationQuestionData.enableScaleDefinitions,
	        mandatoryComments = evaluationQuestionData.mandatoryComments,
	        allowDocuments = evaluationQuestionData.allowDocuments,
	        documents = evaluationQuestionData.documents,
	        type = evaluationQuestionData.type,
	        definitions = evaluationQuestionData.definitions;

	    var question = createQuestion();
	    question.id = id;
	    question.title = text;
	    question.type = type.id;
	    question.isAllowScaleDefinitions = Boolean(enableScaleDefinitions);
	    question.isCommentRequired = Boolean(mandatoryComments);
	    question.isAllowUpload = Boolean(allowDocuments);
	    question.documentIds = documents ? documents.map(function (document) {
	        return document.id;
	    }) : [];

	    var typeDefinitionByIndex = {};
	    type.definitions.forEach(function (item) {
	        typeDefinitionByIndex[item.id] = item;
	    });
	    if (definitions) {
	        definitions.forEach(function (item) {
	            var typeDefinition = typeDefinitionByIndex[item.typeDefinition.id];
	            if (typeDefinition) {
	                var score = item.score,
	                    definition = item.definition,
	                    _id = item.id;

	                var definitionId = _id;
	                var label = definition;
	                var newScaleDefinition = (0, _extends3.default)({}, typeDefinition, { score: score, definitionId: definitionId, label: label });
	                typeDefinitionByIndex[item.typeDefinition.id] = newScaleDefinition;
	            }
	        });
	    }
	    question.scaleDefinitions = (0, _values2.default)(typeDefinitionByIndex);

	    return question;
	}

	function parseDataForScaleDefinition(typeDefinitionId, scaleDefinitionId, definition, score) {
	    score = String(score);
	    var data = {
	        type: 'evaluation-question-scale-definitions',
	        attributes: {
	            definition: definition
	        }
	    };
	    if (scaleDefinitionId === undefined) {
	        data.attributes.score = score;
	        data.relationships = {
	            typeDefinition: {
	                data: {
	                    type: 'evaluation-question-type-definitions',
	                    id: typeDefinitionId
	                }
	            }
	        };
	    } else {
	        data.id = scaleDefinitionId;
	    }
	    return { data: data };
	}
	function parseDataForUpdateQuestion(question) {
	    return {
	        data: {
	            type: 'evaluation-question',
	            id: question.id,
	            attributes: {
	                text: question.title,
	                allow_documents: Number(question.isAllowUpload),
	                enable_scale_definitions: Number(question.isAllowScaleDefinitions),
	                mandatory_comments: Number(question.isCommentRequired)
	            },
	            relationships: {
	                type: {
	                    data: {
	                        type: 'evaluation-question-types',
	                        id: question.type
	                    }
	                }
	            }
	        }
	    };
	}
	function createQuestion() {
	    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1';

	    var question = deepClone(_models.QUESTION_SKELETON);
	    question.type = String(type);
	    return question;
	}
	function createCriteria() {
	    return deepClone(_models.CRITERION_SKELETON);
	}
	function createCriterionFromData(responseData) {
	    var data = responseData.data;

	    return (0, _assign2.default)(createCriteria(), { id: data.id, title: data.attributes.title, weight: data.attributes.weight });
	}
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(getItemByAttrib, 'getItemByAttrib', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseInitialData, 'parseInitialData', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(deepClone, 'deepClone', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataForCreateTemplate, 'parseDataForCreateTemplate', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataForUpdateTemplate, 'parseDataForUpdateTemplate', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataForCreateCriteria, 'parseDataForCreateCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataForUpdateCriteria, 'parseDataForUpdateCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataForDeleteCriteria, 'parseDataForDeleteCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataForCreateQuestion, 'parseDataForCreateQuestion', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataFromFetchTemplate, 'parseDataFromFetchTemplate', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataFromCreateQuestion, 'parseDataFromCreateQuestion', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataForScaleDefinition, 'parseDataForScaleDefinition', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(parseDataForUpdateQuestion, 'parseDataForUpdateQuestion', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(createQuestion, 'createQuestion', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(createCriteria, 'createCriteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');

	    __REACT_HOT_LOADER__.register(createCriterionFromData, 'createCriterionFromData', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/utils/dataParserUtil.js');
	})();

	;

/***/ },
/* 47 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(161);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ },
/* 49 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ },
/* 50 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = true;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(14);
	var dPs = __webpack_require__(176);
	var enumBugKeys = __webpack_require__(50);
	var IE_PROTO = __webpack_require__(55)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(81)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(167).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 53 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).f;
	var has = __webpack_require__(9);
	var TAG = __webpack_require__(3)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(56)('keys');
	var uid = __webpack_require__(35);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ },
/* 57 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(27);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6);
	var core = __webpack_require__(1);
	var LIBRARY = __webpack_require__(51);
	var wksExt = __webpack_require__(60);
	var defineProperty = __webpack_require__(7).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(3);


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(18);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(97);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(213),
	    getValue = __webpack_require__(239);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(32),
	    isObject = __webpack_require__(11);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(12))(372);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(111);

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);
	var settle = __webpack_require__(117);
	var buildURL = __webpack_require__(120);
	var parseHeaders = __webpack_require__(126);
	var isURLSameOrigin = __webpack_require__(124);
	var createError = __webpack_require__(71);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(119);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (("production") !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(122);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(116);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var IS_BUSY = exports.IS_BUSY = 'IS_BUSY';
	var TEMPLATE_FETCHED = exports.TEMPLATE_FETCHED = 'TEMPLATE_FETCHED';
	var TEMPLATE_CREATED = exports.TEMPLATE_CREATED = 'TEMPLATE_CREATED';
	var TEMPLATE_UPDATED = exports.TEMPLATE_UPDATED = 'TEMPLATE_UPDATED';
	var CRITERIA_ADD = exports.CRITERIA_ADD = 'CRITERIA_ADD';
	var CRITERIA_DELETE = exports.CRITERIA_DELETE = 'CRITERIA_DELETE';
	var CRITERIA_UPDATE = exports.CRITERIA_UPDATE = 'CRITERIA_UPDATE';
	var QUESTION_ADD = exports.QUESTION_ADD = 'QUESTION_ADD';
	var QUESTION_UPDATE = exports.QUESTION_UPDATE = 'QUESTION_UPDATE';
	var QUESTION_DELETE = exports.QUESTION_DELETE = 'QUESTION_DELETE';
	var DOCUMENTS_UPLOADING = exports.DOCUMENTS_UPLOADING = 'DOCUMENTS_UPLOADING';
	var DOCUMENT_UPLOAD_IN_PROGRESS = exports.DOCUMENT_UPLOAD_IN_PROGRESS = 'DOCUMENT_UPLOAD_IN_PROGRESS';
	var DOCUMENT_UPLOAD_SUCCESS = exports.DOCUMENT_UPLOAD_SUCCESS = 'DOCUMENT_UPLOAD_SUCCESS';
	var DOCUMENT_UPLOAD_FAILED = exports.DOCUMENT_UPLOAD_FAILED = 'DOCUMENT_UPLOAD_FAILED';
	var DOCUMENT_DELETE = exports.DOCUMENT_DELETE = 'DOCUMENT_DELETE';
	var PROMPT_MESSAGE = exports.PROMPT_MESSAGE = 'PROMPT_MESSAGE';
	var CLEAR_MESSAGES = exports.CLEAR_MESSAGES = 'CLEAR_MESSAGES';
	var INITIALIZED = exports.INITIALIZED = 'INITIALIZED';
	var CRITERIA_MAXIMISE_CHANGE = exports.CRITERIA_MAXIMISE_CHANGE = 'CRITERIA_MAXIMISE_CHANGE';
	var MINIMISE_ALL_CRITERIA = exports.MINIMISE_ALL_CRITERIA = 'MINIMISE_ALL_CRITERIA';
	var QUESTION_MAXIMISE_CHANGE = exports.QUESTION_MAXIMISE_CHANGE = 'QUESTION_MAXIMISE_CHANGE';
	var MINIMISE_ALL_QUESTIONS = exports.MINIMISE_ALL_QUESTIONS = 'MINIMISE_ALL_QUESTIONS';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(IS_BUSY, 'IS_BUSY', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(TEMPLATE_FETCHED, 'TEMPLATE_FETCHED', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(TEMPLATE_CREATED, 'TEMPLATE_CREATED', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(TEMPLATE_UPDATED, 'TEMPLATE_UPDATED', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(CRITERIA_ADD, 'CRITERIA_ADD', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(CRITERIA_DELETE, 'CRITERIA_DELETE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(CRITERIA_UPDATE, 'CRITERIA_UPDATE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(QUESTION_ADD, 'QUESTION_ADD', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(QUESTION_UPDATE, 'QUESTION_UPDATE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(QUESTION_DELETE, 'QUESTION_DELETE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(DOCUMENTS_UPLOADING, 'DOCUMENTS_UPLOADING', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(DOCUMENT_UPLOAD_IN_PROGRESS, 'DOCUMENT_UPLOAD_IN_PROGRESS', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(DOCUMENT_UPLOAD_SUCCESS, 'DOCUMENT_UPLOAD_SUCCESS', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(DOCUMENT_UPLOAD_FAILED, 'DOCUMENT_UPLOAD_FAILED', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(DOCUMENT_DELETE, 'DOCUMENT_DELETE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(PROMPT_MESSAGE, 'PROMPT_MESSAGE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(CLEAR_MESSAGES, 'CLEAR_MESSAGES', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(INITIALIZED, 'INITIALIZED', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(CRITERIA_MAXIMISE_CHANGE, 'CRITERIA_MAXIMISE_CHANGE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(MINIMISE_ALL_CRITERIA, 'MINIMISE_ALL_CRITERIA', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(QUESTION_MAXIMISE_CHANGE, 'QUESTION_MAXIMISE_CHANGE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(MINIMISE_ALL_QUESTIONS, 'MINIMISE_ALL_QUESTIONS', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/ActionTypes.js');
	})();

	;

/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	                                    value: true
	});
	var QUESTION_OPTIONS = exports.QUESTION_OPTIONS = [{ id: 'scale', label: 'Do you need to define the scale?' }, { id: 'upload', label: 'Allow respondant to upload documents.' }, { id: 'comments', label: 'Comments are mandatory.' }];

	var QUESTION_SKELETON = exports.QUESTION_SKELETON = { id: null,
	                                    title: '',
	                                    isAllowUpload: false,
	                                    isCommentRequired: false,
	                                    isAllowScaleDefinitions: false,
	                                    type: 0,
	                                    isMaximised: true,
	                                    scaleDefinitions: [],
	                                    documentIds: [],
	                                    isSaved: false,
	                                    errorMessage: '' };

	var CRITERION_SKELETON = exports.CRITERION_SKELETON = { id: null,
	                                    questions: [],
	                                    weight: '',
	                                    title: '',
	                                    isMaximised: true,
	                                    isSaved: false,
	                                    errorMessage: '' };
	;

	(function () {
	                                    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	                                                                        return;
	                                    }

	                                    __REACT_HOT_LOADER__.register(QUESTION_OPTIONS, 'QUESTION_OPTIONS', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/models.js');

	                                    __REACT_HOT_LOADER__.register(QUESTION_SKELETON, 'QUESTION_SKELETON', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/models.js');

	                                    __REACT_HOT_LOADER__.register(CRITERION_SKELETON, 'CRITERION_SKELETON', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/constants/models.js');
	})();

	;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.closeModal = closeModal;
	exports.showModal = showModal;

	var _ActionTypes = __webpack_require__(76);

	function closeModal() {
	    return { type: _ActionTypes.MODAL_CLOSE };
	}

	function showModal() {
	    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var onClose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	    return { type: _ActionTypes.MODAL_PROMPT_MESSAGE, title: title, message: message, onClose: onClose };
	}
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(closeModal, 'closeModal', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/modal/actions/index.js');

	    __REACT_HOT_LOADER__.register(showModal, 'showModal', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/modal/actions/index.js');
	})();

	;

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MODAL_PROMPT_MESSAGE = exports.MODAL_PROMPT_MESSAGE = 'MODAL_PROMPT_MESSAGE';
	var MODAL_CLOSE = exports.MODAL_CLOSE = 'MODAL_CLOSE';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(MODAL_PROMPT_MESSAGE, 'MODAL_PROMPT_MESSAGE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/modal/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(MODAL_CLOSE, 'MODAL_CLOSE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/modal/constants/ActionTypes.js');
	})();

	;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.clearNotifications = clearNotifications;
	exports.showNotification = showNotification;

	var _ActionTypes = __webpack_require__(78);

	var _constants = __webpack_require__(33);

	function clearNotifications() {
	    return { type: _ActionTypes.NOTIFICATION_CLEAR_MESSAGES };
	}

	function showNotification() {
	    var messageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.MESSAGE_TYPE_ERROR;
	    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	    return { type: _ActionTypes.NOTIFICATION_PROMPT_MESSAGE, messageType: messageType, message: message };
	}
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(clearNotifications, 'clearNotifications', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/actions/index.js');

	    __REACT_HOT_LOADER__.register(showNotification, 'showNotification', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/actions/index.js');
	})();

	;

/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NOTIFICATION_PROMPT_MESSAGE = exports.NOTIFICATION_PROMPT_MESSAGE = 'PROMPT_MESSAGE';
	var NOTIFICATION_CLEAR_MESSAGES = exports.NOTIFICATION_CLEAR_MESSAGES = 'CLEAR_MESSAGES';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(NOTIFICATION_PROMPT_MESSAGE, 'NOTIFICATION_PROMPT_MESSAGE', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(NOTIFICATION_CLEAR_MESSAGES, 'NOTIFICATION_CLEAR_MESSAGES', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/constants/ActionTypes.js');
	})();

	;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(158), __esModule: true };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(147);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(146);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(27);
	var document = __webpack_require__(6).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(8) && !__webpack_require__(15)(function () {
	  return Object.defineProperty(__webpack_require__(81)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(47);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(51);
	var $export = __webpack_require__(4);
	var redefine = __webpack_require__(90);
	var hide = __webpack_require__(16);
	var has = __webpack_require__(9);
	var Iterators = __webpack_require__(28);
	var $iterCreate = __webpack_require__(171);
	var setToStringTag = __webpack_require__(54);
	var getPrototypeOf = __webpack_require__(87);
	var ITERATOR = __webpack_require__(3)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(29);
	var createDesc = __webpack_require__(30);
	var toIObject = __webpack_require__(10);
	var toPrimitive = __webpack_require__(58);
	var has = __webpack_require__(9);
	var IE8_DOM_DEFINE = __webpack_require__(82);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(88);
	var hiddenKeys = __webpack_require__(50).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(9);
	var toObject = __webpack_require__(31);
	var IE_PROTO = __webpack_require__(55)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var has = __webpack_require__(9);
	var toIObject = __webpack_require__(10);
	var arrayIndexOf = __webpack_require__(163)(false);
	var IE_PROTO = __webpack_require__(55)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(4);
	var core = __webpack_require__(1);
	var fails = __webpack_require__(15);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(57);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(180)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(84)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports=function(e){function t(i){if(a[i])return a[i].exports;var n=a[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){e.exports=a(1)},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function n(e){return(0,h.default)(e)?e:[e]}function r(e){return"[object Date]"===Object.prototype.toString.call(e)}function o(e){if(null===e||"object"!==("undefined"==typeof e?"undefined":c(e))||r(e))return e;if((0,h.default)(e))return e.map(o);var t={};return(0,x.default)(e).forEach(function(a){t[(0,y.default)(a)]=o(e[a])}),t}function u(e,t){var a=t.camelizeKeys,i={};return(0,x.default)(e).forEach(function(t){var n=e[t],r=a?(0,y.default)(t):t;i[r]={},"undefined"!=typeof n.data&&((0,h.default)(n.data)?i[r].data=n.data.map(function(e){return{id:e.id,type:a?(0,y.default)(e.type):e.type}}):(0,b.default)(n.data)?i[r].data=n.data:i[r].data={id:n.data.id,type:a?(0,y.default)(n.data.type):n.data.type},"undefined"!=typeof n.meta&&(i[r].meta=o(n.meta))),n.links&&(i[r].links=n.links)}),i}function d(e,t){var a=t.camelizeKeys,i={};return n(e).forEach(function(e){var t=a?(0,y.default)(e.type):e.type;i[t]=i[t]||{},i[t][e.id]=i[t][e.id]||{id:e.id},a?(i[t][e.id].attributes={},(0,x.default)(e.attributes).forEach(function(a){i[t][e.id].attributes[(0,y.default)(a)]=o(e.attributes[a])})):i[t][e.id].attributes=e.attributes,e.links&&(i[t][e.id].links={},(0,x.default)(e.links).forEach(function(a){i[t][e.id].links[a]=e.links[a]})),e.relationships&&(i[t][e.id].relationships=u(e.relationships,{camelizeKeys:a})),e.meta&&(i[t][e.id].meta=e.meta)}),i}function l(e){return e.replace(/\?.*$/,"")}function f(e,t,a){var i=a.camelizeKeys,r=a.filterEndpoint,o={};o.meta={};var d=void 0;if(r)o.meta[t]={},d=o.meta[t];else{var f=l(t);o.meta[f]={},o.meta[f][t.slice(f.length)]={},d=o.meta[f][t.slice(f.length)]}if(d.data={},e.data){var s=[];n(e.data).forEach(function(e){var t={id:e.id,type:i?(0,y.default)(e.type):e.type};e.relationships&&(t.relationships=u(e.relationships,{camelizeKeys:i})),s.push(t)}),d.data=s,e.links&&(d.links=e.links,o.meta[l(t)].links=e.links),e.meta&&(d.meta=e.meta)}return o}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a={},i=t.endpoint,n=t.filterEndpoint,r=t.camelizeKeys;if("undefined"==typeof n&&(n=!0),"undefined"==typeof r&&(r=!0),e.data&&(0,E.default)(a,d(e.data,{camelizeKeys:r})),e.included&&(0,E.default)(a,d(e.included,{camelizeKeys:r})),i){var o=n?l(i):i;(0,E.default)(a,f(e,o,{camelizeKeys:r,filterEndpoint:n}))}return a}Object.defineProperty(t,"__esModule",{value:!0});var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=s;var p=a(2),y=i(p),m=a(3),h=i(m),v=a(4),b=i(v),k=a(5),x=i(k),z=a(6),E=i(z)},function(e,t){e.exports=__webpack_require__(276)},function(e,t){e.exports=__webpack_require__(41)},function(e,t){e.exports=__webpack_require__(281)},function(e,t){e.exports=__webpack_require__(284)},function(e,t){e.exports=__webpack_require__(285)}]);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(63),
	    root = __webpack_require__(18);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(223),
	    isArguments = __webpack_require__(104),
	    isArray = __webpack_require__(41),
	    isBuffer = __webpack_require__(105),
	    isIndex = __webpack_require__(101),
	    isTypedArray = __webpack_require__(107);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(62),
	    eq = __webpack_require__(40);

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignMergeValue;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(63);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 98 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(102);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsZWJ = '\\u200d';

	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}

	module.exports = hasUnicode;


/***/ },
/* 101 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 103 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(212),
	    isObjectLike = __webpack_require__(19);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(18),
	    stubFalse = __webpack_require__(286);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module)))

/***/ },
/* 106 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(214),
	    baseUnary = __webpack_require__(225),
	    nodeUtil = __webpack_require__(262);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(95),
	    baseKeysIn = __webpack_require__(216),
	    isArrayLike = __webpack_require__(42);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports=function(e){function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){e.exports=t(1)},function(e,r){"use strict";function t(e,r){return r?""+e+r:null}function n(e,r,t,n,o){var a=n.ignoreLinks,u=r.relationships[t];if("undefined"!=typeof u.data)return Array.isArray(u.data)?u.data.map(function(r){return i(e,r.type,r.id,n,o)||r}):null===u.data?null:i(e,u.data.type,u.data.id,n,o)||u.data;if(!a&&u.links)throw new Error("Remote lazy loading is not supported (see: https://github.com/yury-dymov/json-api-normalizer/issues/2). To disable this error, include option 'ignoreLinks: true' in the build function like so: build(reducer, type, id, { ignoreLinks: true })")}function i(e,r){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},d={eager:!1,ignoreLinks:!1,includeType:!1},s=o({},d,u),c=s.eager,f=s.includeType;if(!e[r])return null;if(null===a||Array.isArray(a)){var p=a||Object.keys(e[r]);return p.map(function(t){return i(e,r,t,s,l)})}var y=a.toString(),v=t(r,y),b=l[v];if(b)return b;var g={},h=e[r][y];return h?(h.id&&(g.id=h.id),Object.keys(h.attributes).forEach(function(e){g[e]=h.attributes[e]}),h.meta&&(g.meta=h.meta),f&&!g.type&&(g.type=r),l[v]=g,h.relationships&&Object.keys(h.relationships).forEach(function(r){c?g[r]=n(e,h,r,s,l):Object.defineProperty(g,r,{enumerable:!0,get:function(){var t="__"+r;if(g[t])return g[t];var i=n(e,h,r,s,l);return Object.defineProperty(g,t,{enumerable:!1,value:i}),g[t]}})}),"undefined"==typeof g.id&&(g.id=y),g):null}Object.defineProperty(r,"__esModule",{value:!0});var o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e};r.default=i}]);

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(12))(358);

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);
	var bind = __webpack_require__(72);
	var Axios = __webpack_require__(113);
	var defaults = __webpack_require__(44);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(69);
	axios.CancelToken = __webpack_require__(112);
	axios.isCancel = __webpack_require__(70);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(127);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(69);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(44);
	var utils = __webpack_require__(2);
	var InterceptorManager = __webpack_require__(114);
	var dispatchRequest = __webpack_require__(115);
	var isAbsoluteURL = __webpack_require__(123);
	var combineURLs = __webpack_require__(121);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);
	var transformData = __webpack_require__(118);
	var isCancel = __webpack_require__(70);
	var defaults = __webpack_require__(44);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 116 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(71);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 119 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },
/* 121 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 123 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 127 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Progress = __webpack_require__(129);

	var _Progress2 = _interopRequireDefault(_Progress);

	var _constants = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Document = function Document(_ref) {
	    var file = _ref.file,
	        onFileRemove = _ref.onFileRemove;

	    return _react2.default.createElement(
	        'li',
	        { className: 'list-group-item document' },
	        _react2.default.createElement(
	            'div',
	            { className: 'pull-left document__filename' },
	            file.name,
	            file.status === _constants.UPLOAD_FAILED ? ' - Something went wrong. Please try again' : null
	        ),
	        file.status === _constants.UPLOAD_SUCCESS ? _react2.default.createElement(
	            'div',
	            { className: 'pull-right' },
	            file.locked_in !== 1 && _react2.default.createElement(
	                'a',
	                { onClick: function onClick() {
	                        return onFileRemove(file.id);
	                    } },
	                _react2.default.createElement('i', { className: 'fa fa-times' })
	            ),
	            _react2.default.createElement(
	                'a',
	                { key: 'link-' + (file.id + 1),
	                    href: file.referenceUrl
	                },
	                _react2.default.createElement('i', { className: 'group-panel__actions fa fa-download' })
	            )
	        ) : null,
	        _react2.default.createElement('div', { className: 'clearfix' }),
	        file.status === _constants.UPLOAD_IN_PROGRESS ? _react2.default.createElement(_Progress2.default, { key: file.id,
	            status: file.status,
	            progress: file.progress }) : null
	    );
	};

	Document.propTypes = {
	    file: _react.PropTypes.object.isRequired,
	    onFileRemove: _react.PropTypes.func,
	    onDownloadFile: _react.PropTypes.func
	};

	var _default = Document;
	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(Document, 'Document', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/components/Document.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/components/Document.js');
	})();

	;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(149);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _constants = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Progress = function Progress(_ref) {
	    var status = _ref.status,
	        progress = _ref.progress;
	    return _react2.default.createElement(
	        'div',
	        { className: 'progress' },
	        _react2.default.createElement(
	            'div',
	            { className: (0, _classnames2.default)('progress-bar progress-bar-striped', {
	                    'progress-bar-success': status === _constants.UPLOAD_SUCCESS,
	                    'progress-bar-danger': status === _constants.UPLOAD_FAILED,
	                    'active': status === _constants.UPLOAD_IN_PROGRESS
	                }),
	                style: { width: progress + '%' } },
	            _react2.default.createElement(
	                'span',
	                { className: 'sr-only' },
	                progress + '% Complete'
	            )
	        )
	    );
	};

	Progress.propTypes = {
	    status: _react.PropTypes.string,
	    progress: _react.PropTypes.number
	};

	var _default = Progress;
	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(Progress, 'Progress', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/components/Progress.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/components/Progress.js');
	})();

	;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(23);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(25);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Question = __webpack_require__(132);

	var _Question2 = _interopRequireDefault(_Question);

	var _reactRedux = __webpack_require__(20);

	var _evaluationTemplateCreator = __webpack_require__(45);

	var _dataParserUtil = __webpack_require__(46);

	var _constants = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Criteria = function (_Component) {
	    (0, _inherits3.default)(Criteria, _Component);

	    function Criteria(props) {
	        (0, _classCallCheck3.default)(this, Criteria);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Criteria.__proto__ || (0, _getPrototypeOf2.default)(Criteria)).call(this, props));

	        _this.state = {
	            title: _this.props.criteria.title,
	            weight: _this.props.criteria.weight,
	            showAdd: false,
	            isSaved: false,
	            isTitleError: false,
	            isWeightError: false
	        };
	        _this.newQuestion = (0, _dataParserUtil.createQuestion)();
	        _this.onSave = _this.onSave.bind(_this);
	        _this.updateCriteriaChange = _this.updateCriteriaChange.bind(_this);
	        _this.toggleMaximise = _this.toggleMaximise.bind(_this);
	        _this.onDelete = _this.onDelete.bind(_this);
	        _this.onToggleNewQuestionClick = _this.onToggleNewQuestionClick.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(Criteria, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                showAdd: false,
	                title: nextProps.criteria.title,
	                weight: nextProps.criteria.weight
	            });
	        }
	    }, {
	        key: 'toggleMaximise',
	        value: function toggleMaximise() {
	            if (this.intervalId) {
	                this.updateCriteriaChange();
	            }
	            var criteria = this.props.criteria;

	            this.props.dispatch((0, _evaluationTemplateCreator.toggleMaximiseCriteria)(criteria.id, !criteria.isMaximised));
	            // this.setStateWithQuestion(question, false);
	        }
	    }, {
	        key: 'onToggleNewQuestionClick',
	        value: function onToggleNewQuestionClick() {
	            this.setState({ showAdd: !this.state.showAdd });
	            this.props.dispatch((0, _evaluationTemplateCreator.minimiseAllQuestions)());
	        }
	    }, {
	        key: 'onDelete',
	        value: function onDelete() {
	            this.props.dispatch((0, _evaluationTemplateCreator.deleteCriteria)(this.props.criteria.id));
	        }
	    }, {
	        key: 'updateCriteriaChange',
	        value: function updateCriteriaChange() {
	            var _state = this.state,
	                title = _state.title,
	                weight = _state.weight;

	            if (title.length) {
	                this.props.dispatch((0, _evaluationTemplateCreator.updateCriteria)(this.props.criteria.id, title, weight));
	            }
	            this.intervalId = clearInterval(this.intervalId);
	        }
	    }, {
	        key: 'onTitleChange',
	        value: function onTitleChange(title) {
	            this.setState({ title: title, isTitleError: !title.length });
	            this.intervalId = clearInterval(this.intervalId);
	            if (this.props.criteria.id && title.length) {
	                this.intervalId = setInterval(this.updateCriteriaChange, _constants.INPUT_SYNC_INTERVAL);
	            }
	        }
	    }, {
	        key: 'onWeightChange',
	        value: function onWeightChange(weight) {
	            var isWeightError = false;
	            if (weight.length) {
	                if (!isNaN(weight)) {
	                    if (Number(weight > 100)) {
	                        isWeightError = true;
	                    } else if (Number(weight < 1)) {
	                        isWeightError = true;
	                    } else if (weight.indexOf('.') !== -1) {
	                        isWeightError = true;
	                    }
	                } else {
	                    isWeightError = true;
	                }
	            } else {
	                weight = 0;
	            }
	            if (isWeightError) {
	                this.setState({ isWeightError: isWeightError });
	            } else {
	                this.setState({ weight: weight, isWeightError: isWeightError });
	            }

	            this.intervalId = clearInterval(this.intervalId);
	            if (this.props.criteria.id && !isWeightError) {
	                this.intervalId = setInterval(this.updateCriteriaChange, _constants.INPUT_SYNC_INTERVAL);
	            }
	        }
	    }, {
	        key: 'getWeightInputStyle',
	        value: function getWeightInputStyle() {
	            var style = 'form-control';
	            if (this.state.isWeightError) {
	                style += ' error';
	            } else if (this.state.isSaved) {
	                style += ' saved';
	            }
	            return style;
	        }
	    }, {
	        key: 'getTitleInputStyle',
	        value: function getTitleInputStyle() {
	            var style = 'form-control';
	            if (this.state.isTitleError) {
	                style += ' error';
	            } else if (this.state.isSaved) {
	                style += ' saved';
	            }
	            return style;
	        }
	    }, {
	        key: 'onSave',
	        value: function onSave() {
	            var title = this.state.title;
	            var weight = this.state.weight;
	            if (!this.props.criteria.id) {
	                this.props.dispatch((0, _evaluationTemplateCreator.addCriteria)(title, weight));
	            }
	        }
	    }, {
	        key: 'getQuestionIndex',
	        value: function getQuestionIndex(index) {
	            return index + 1;
	        }
	    }, {
	        key: 'renderMaximised',
	        value: function renderMaximised() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'fieldset',
	                    { className: 'criteria-container' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-4 col-sm-12' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'form-group' },
	                                _react2.default.createElement(
	                                    'label',
	                                    { className: 'control-label' },
	                                    _react2.default.createElement(
	                                        'span',
	                                        { className: 'required', 'aria-required': 'true' },
	                                        'Criteria'
	                                    )
	                                ),
	                                _react2.default.createElement('input', {
	                                    type: 'text',
	                                    name: 'title',
	                                    maxLength: '255',
	                                    className: this.getTitleInputStyle(),
	                                    defaultValue: this.state.title,
	                                    title: 'Criteria',
	                                    placeholder: 'Criteria Title',
	                                    onChange: function onChange(event) {
	                                        return _this2.onTitleChange(event.target.value);
	                                    } }),
	                                this.state.isTitleError ? _react2.default.createElement(
	                                    'span',
	                                    { className: 'error danger' },
	                                    'Please add a Title'
	                                ) : null
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-2 col-sm-12' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'form-group' },
	                                _react2.default.createElement(
	                                    'label',
	                                    { className: 'control-label' },
	                                    _react2.default.createElement(
	                                        'span',
	                                        { className: 'required', 'aria-required': 'true' },
	                                        'Weighting',
	                                        _react2.default.createElement('i', { className: 'fa fa-info-circle',
	                                            'data-tooltip': 'The total weighting across all criteria must equal 100%.',
	                                            'aria-hidden': 'true' })
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'input-group' },
	                                    _react2.default.createElement('input', {
	                                        name: 'weight',
	                                        defaultValue: this.state.weight,
	                                        className: this.getWeightInputStyle(),
	                                        title: 'Criteria Weight',
	                                        placeholder: 'Value',
	                                        onChange: function onChange(event) {
	                                            return _this2.onWeightChange(event.target.value);
	                                        },
	                                        'aria-describedby': 'weighting-addon' }),
	                                    _react2.default.createElement(
	                                        'span',
	                                        { className: 'input-group-addon', id: 'weighting-addon' },
	                                        '%'
	                                    )
	                                ),
	                                this.state.isWeightError ? _react2.default.createElement(
	                                    'span',
	                                    { className: 'error danger' },
	                                    "Accepted values: 1 to 100."
	                                ) : null
	                            )
	                        ),
	                        this.props.criteria.id === null && this.state.title ? _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-2 col-sm-12' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'form-group pull-right' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'hidden-sm' },
	                                    _react2.default.createElement('br', null),
	                                    _react2.default.createElement('br', null)
	                                ),
	                                _react2.default.createElement(
	                                    'button',
	                                    {
	                                        className: 'btn btn-sm',
	                                        disabled: !this.state.title,
	                                        onClick: this.onSave },
	                                    _react2.default.createElement('i', { className: 'fa fa-plus' }),
	                                    'Add Criteria'
	                                )
	                            )
	                        ) : _react2.default.createElement(
	                            'div',
	                            null,
	                            this.props.criteria.id !== null && (this.state.title || this.state.title !== this.props.criteria.title || this.state.weight !== this.props.criteria.weight) ? _react2.default.createElement(
	                                'div',
	                                { className: 'col-md-6 col-sm-12' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'form-group pull-right' },
	                                    _react2.default.createElement(
	                                        'div',
	                                        { className: 'hidden-sm' },
	                                        _react2.default.createElement('br', null),
	                                        _react2.default.createElement('br', null)
	                                    ),
	                                    _react2.default.createElement(
	                                        'button',
	                                        { className: 'btn btn-sm',
	                                            onClick: this.toggleMaximise },
	                                        _react2.default.createElement('i', { className: 'fa fa-angle-double-up' }),
	                                        ' Collapse Criteria'
	                                    )
	                                )
	                            ) : null
	                        )
	                    ),
	                    this.props.criteria.questions.length ? _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-12' },
	                            _react2.default.createElement('hr', null)
	                        )
	                    ) : null,
	                    _react2.default.createElement(
	                        'div',
	                        null,
	                        this.props.criteria.questions.length ? _react2.default.createElement(
	                            'div',
	                            null,
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'row' },
	                                this.props.criteria.questions.map(function (item, index) {
	                                    return _react2.default.createElement(
	                                        'div',
	                                        { className: 'row', key: item },
	                                        _react2.default.createElement(_Question2.default, { criteriaId: _this2.props.criteria.id,
	                                            questionId: item,
	                                            questionIndex: index + 1 })
	                                    );
	                                })
	                            ),
	                            !this.state.showAdd ? _react2.default.createElement(
	                                'div',
	                                { className: 'row' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'col-md-12 new-question mar-btm' },
	                                    _react2.default.createElement(
	                                        'button',
	                                        { className: 'btn btn-sm',
	                                            onClick: this.onToggleNewQuestionClick },
	                                        _react2.default.createElement('i', { className: 'fa fa-plus' }),
	                                        'Add New Question'
	                                    )
	                                )
	                            ) : null,
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'row' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'row' },
	                                    this.state.showAdd ? _react2.default.createElement(_Question2.default, { criteriaId: this.props.criteria.id,
	                                        question: this.newQuestion,
	                                        onNewQuestionClose: this.onToggleNewQuestionClick,
	                                        questionIndex: this.props.criteria.questions.length + 1 }) : null
	                                )
	                            )
	                        ) : _react2.default.createElement(
	                            'div',
	                            null,
	                            this.props.criteria.id ? _react2.default.createElement(
	                                'div',
	                                { className: 'row' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'row' },
	                                    _react2.default.createElement(_Question2.default, { criteriaId: this.props.criteria.id,
	                                        question: this.newQuestion,
	                                        questionIndex: this.props.criteria.questions.length + 1 })
	                                )
	                            ) : null,
	                            this.props.onNewCriteriaClose ? _react2.default.createElement(
	                                'div',
	                                { className: 'row' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'col-md-12' },
	                                    _react2.default.createElement(
	                                        'div',
	                                        { className: 'form-group pull-right' },
	                                        _react2.default.createElement(
	                                            'button',
	                                            { className: 'btn',
	                                                onClick: this.props.onNewCriteriaClose },
	                                            _react2.default.createElement('i', { className: 'fa fa-times' }),
	                                            'Discard Criteria'
	                                        )
	                                    )
	                                )
	                            ) : null
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'renderMinimised',
	        value: function renderMinimised() {
	            var _state2 = this.state,
	                title = _state2.title,
	                weight = _state2.weight;

	            return _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-12' },
	                    _react2.default.createElement(
	                        'fieldset',
	                        { className: 'criteria-container collapsed' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-6' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'form-group' },
	                                _react2.default.createElement(
	                                    'label',
	                                    { className: 'control-label' },
	                                    _react2.default.createElement(
	                                        'span',
	                                        { className: 'required', 'aria-required': 'true', required: true },
	                                        'Criteria'
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'div',
	                                    null,
	                                    title
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-2 text-center' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'form-group' },
	                                _react2.default.createElement(
	                                    'label',
	                                    { className: 'control-label' },
	                                    _react2.default.createElement(
	                                        'span',
	                                        { className: 'required', 'aria-required': 'true' },
	                                        'Weighting'
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'div',
	                                    null,
	                                    weight,
	                                    ' %'
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-4 text-right' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'form-group' },
	                                _react2.default.createElement('br', null),
	                                _react2.default.createElement(
	                                    'button',
	                                    {
	                                        className: 'btn btn-sm',
	                                        onClick: this.toggleMaximise },
	                                    _react2.default.createElement('i', { className: 'fa fa-pencil' }),
	                                    'Edit Criteria'
	                                ),
	                                '\xA0',
	                                _react2.default.createElement(
	                                    'button',
	                                    {
	                                        className: 'btn btn-sm', onClick: this.onDelete },
	                                    _react2.default.createElement('i', { className: 'fa fa-trash-o' }),
	                                    'Delete Criteria'
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return this.props.criteria.isMaximised ? this.renderMaximised() : this.renderMinimised();
	        }
	    }]);
	    return Criteria;
	}(_react.Component);

	Criteria.propTypes = {
	    criteriaId: _react.PropTypes.string,
	    dispatch: _react.PropTypes.func.isRequired,
	    onNewCriteriaClose: _react.PropTypes.func,
	    criteriaByIndex: _react.PropTypes.array,
	    criteria: _react.PropTypes.object.isRequired
	};

	function mapStateToProps(state, props) {
	    var criteriaByIndex = state.evaluationTemplateCreator.criteriaByIndex;

	    var criteria = props.criteriaId ? criteriaByIndex[props.criteriaId] : (0, _dataParserUtil.createCriteria)();

	    return { criteria: criteria };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps)(Criteria);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(Criteria, 'Criteria', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/containers/Criteria.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/containers/Criteria.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/containers/Criteria.js');
	})();

	;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(23);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(25);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(20);

	var _Criteria = __webpack_require__(130);

	var _Criteria2 = _interopRequireDefault(_Criteria);

	var _evaluationTemplateCreator = __webpack_require__(45);

	var _Notification = __webpack_require__(135);

	var _Notification2 = _interopRequireDefault(_Notification);

	var _Modal = __webpack_require__(133);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _constants = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EvaluationTemplateCreator = function (_Component) {
	    (0, _inherits3.default)(EvaluationTemplateCreator, _Component);

	    function EvaluationTemplateCreator(props) {
	        (0, _classCallCheck3.default)(this, EvaluationTemplateCreator);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (EvaluationTemplateCreator.__proto__ || (0, _getPrototypeOf2.default)(EvaluationTemplateCreator)).call(this, props));

	        _this.onSave = _this.onSave.bind(_this);
	        _this.onTitleTextChange = _this.onTitleTextChange.bind(_this);
	        _this.updateTitleText = _this.updateTitleText.bind(_this);
	        _this.getTitleInputStyle = _this.getTitleInputStyle.bind(_this);
	        _this.onToggleNewCriteriaClick = _this.onToggleNewCriteriaClick.bind(_this);
	        _this.state = { title: _this.props.title, showAdd: false, isTitleError: false, isSaved: false };
	        _this.intervalId_update = null;
	        _this.intervalId_saveAnim = null;
	        return _this;
	    }

	    (0, _createClass3.default)(EvaluationTemplateCreator, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var element = document.querySelector('[data-component="searcher-evaluation-template-creator"]');
	            var id = Number(element.getAttribute('data-template-id'));

	            if (id) {
	                this.props.dispatch((0, _evaluationTemplateCreator.fetchTemplate)(id));
	            } else {
	                this.props.dispatch((0, _evaluationTemplateCreator.initialize)());
	            }
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearInterval(this.intervalId_update);
	            clearInterval(this.intervalId_saveAnim);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.templateTitleField.value = nextProps.title;
	            this.setState({ title: nextProps.title, showAdd: false, isSaved: true, isTitleError: false });
	        }
	    }, {
	        key: 'onSave',
	        value: function onSave() {
	            if (this.props.id) {
	                this.props.dispatch((0, _evaluationTemplateCreator.updateTemplate)(this.state.title, this.props.id));
	            } else {
	                this.props.dispatch((0, _evaluationTemplateCreator.addTemplate)(this.state.title));
	            }
	        }
	    }, {
	        key: 'updateTitleText',
	        value: function updateTitleText() {
	            this.props.dispatch((0, _evaluationTemplateCreator.updateTemplate)(this.state.title, this.props.id));
	            clearInterval(this.intervalId_update);
	        }
	    }, {
	        key: 'onTitleTextChange',
	        value: function onTitleTextChange(event) {
	            clearInterval(this.intervalId_update);
	            var isTitleError = !event.target.value.length || event.target.value.match('(.|\s)*\S(.|\s)*');
	            this.setState({ title: event.target.value, isTitleError: isTitleError });
	            if (this.props.id && event.target.value) {
	                this.intervalId_update = setInterval(this.updateTitleText, _constants.INPUT_SYNC_INTERVAL);
	            }
	        }
	    }, {
	        key: 'onToggleNewCriteriaClick',
	        value: function onToggleNewCriteriaClick() {
	            this.setState({ showAdd: !this.state.showAdd });
	            this.props.dispatch((0, _evaluationTemplateCreator.minimiseAllCriteria)());
	        }
	    }, {
	        key: 'getTitleInputStyle',
	        value: function getTitleInputStyle() {
	            var style = 'form-control';
	            if (this.state.isTitleError) {
	                style += ' error';
	            } else if (this.state.isSaved) {
	                style += ' saved';
	            }
	            return style;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var _props = this.props,
	                allCriteriaIndexes = _props.allCriteriaIndexes,
	                id = _props.id;

	            return _react2.default.createElement(
	                'div',
	                { className: 'searcher-evaluation-template-creator' },
	                _react2.default.createElement(_Notification2.default, null),
	                _react2.default.createElement(_Modal2.default, null),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'db-form-section' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-12' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'template-title-container' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'form-group' },
	                                    _react2.default.createElement(
	                                        'label',
	                                        { className: 'control-label' },
	                                        _react2.default.createElement(
	                                            'span',
	                                            { className: 'required', 'aria-required': 'true' },
	                                            'Template Title'
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'div',
	                                        { className: 'row' },
	                                        _react2.default.createElement(
	                                            'div',
	                                            { className: 'col-md-8 col-sm-12' },
	                                            _react2.default.createElement('input', { type: 'text',
	                                                name: 'title',
	                                                ref: function ref(input) {
	                                                    _this2.templateTitleField = input;
	                                                },
	                                                className: this.getTitleInputStyle(),
	                                                defaultValue: this.state.title,
	                                                title: 'Template Title',
	                                                placeholder: 'Enter template title',
	                                                onChange: this.onTitleTextChange
	                                            }),
	                                            this.state.isTitleError ? _react2.default.createElement(
	                                                'span',
	                                                { className: 'error danger' },
	                                                'Title cannot be empty'
	                                            ) : null
	                                        ),
	                                        _react2.default.createElement(
	                                            'div',
	                                            { className: 'col-md-4 col-sm-12' },
	                                            _react2.default.createElement(
	                                                'div',
	                                                { className: 'form-group' },
	                                                id === null ? _react2.default.createElement(
	                                                    'button',
	                                                    { className: 'btn btn-sm', disabled: !this.state.title, onClick: this.onSave },
	                                                    _react2.default.createElement('i', { className: 'fa fa-plus' }),
	                                                    'Create Template'
	                                                ) : null
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    allCriteriaIndexes.map(function (criteriaId, index) {
	                        return _react2.default.createElement(
	                            'div',
	                            { className: 'row', key: index },
	                            _react2.default.createElement(_Criteria2.default, {
	                                criteriaId: criteriaId })
	                        );
	                    }),
	                    id !== null ? allCriteriaIndexes.length ? _react2.default.createElement(
	                        'div',
	                        null,
	                        this.state.showAdd ? _react2.default.createElement(
	                            'div',
	                            { className: 'row' },
	                            _react2.default.createElement(_Criteria2.default, {
	                                criteriaId: null,
	                                onNewCriteriaClose: this.onToggleNewCriteriaClick })
	                        ) : _react2.default.createElement(
	                            'div',
	                            { className: 'row' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'col-md-12' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'form-group new-criteria' },
	                                    _react2.default.createElement(
	                                        'button',
	                                        { className: 'btn',
	                                            onClick: this.onToggleNewCriteriaClick },
	                                        _react2.default.createElement('i', { className: 'fa fa-plus' }),
	                                        'Add New Criteria'
	                                    )
	                                )
	                            )
	                        )
	                    ) : _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(_Criteria2.default, { criteriaId: null })
	                    ) : null,
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-12 text-right ' + (id !== null ? 'show' : 'hidden') },
	                            _react2.default.createElement('hr', null),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'form-group' },
	                                this.props.isBusy ? _react2.default.createElement(
	                                    'ul',
	                                    { className: 'list-inline' },
	                                    _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'a',
	                                            { className: 'btn btn-md', disabled: true },
	                                            'Saving'
	                                        )
	                                    )
	                                ) : _react2.default.createElement(
	                                    'ul',
	                                    { className: 'list-inline' },
	                                    _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'a',
	                                            { className: 'btn btn-md', href: '/searcher/evaluation_templates/list' },
	                                            _react2.default.createElement('i', { className: 'fa fa-save' }),
	                                            'Save and Continue Later'
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'button',
	                                            { className: 'btn btn-md save-template ', type: 'button', onClick: function onClick() {
	                                                    return _this2.props.dispatch((0, _evaluationTemplateCreator.publishTemplate)());
	                                                } },
	                                            _react2.default.createElement('i', { className: 'fa fa-send' }),
	                                            'Publish Template'
	                                        )
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return EvaluationTemplateCreator;
	}(_react.Component);

	EvaluationTemplateCreator.propTypes = {
	    creatable: _react.PropTypes.object,
	    allCriteriaIndexes: _react.PropTypes.array,
	    title: _react.PropTypes.string.isRequired,
	    dispatch: _react.PropTypes.func.isRequired,
	    id: _react.PropTypes.number,
	    isBusy: _react.PropTypes.bool.isRequired
	};

	function mapStateToProps(state) {
	    var _state$evaluationTemp = state.evaluationTemplateCreator,
	        allCriteriaIndexes = _state$evaluationTemp.allCriteriaIndexes,
	        title = _state$evaluationTemp.title,
	        id = _state$evaluationTemp.id,
	        isBusy = _state$evaluationTemp.isBusy;

	    return { allCriteriaIndexes: allCriteriaIndexes, title: title, id: id, isBusy: isBusy };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps)(EvaluationTemplateCreator);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(EvaluationTemplateCreator, 'EvaluationTemplateCreator', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/containers/EvaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/containers/EvaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/containers/EvaluationTemplateCreator.js');
	})();

	;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _assign = __webpack_require__(21);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(23);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(25);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(20);

	var _reactDropzone = __webpack_require__(294);

	var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

	var _Document = __webpack_require__(128);

	var _Document2 = _interopRequireDefault(_Document);

	var _models = __webpack_require__(74);

	var _dataParserUtil = __webpack_require__(46);

	var _evaluationTemplateCreator = __webpack_require__(45);

	var _constants = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Question = function (_Component) {
	    (0, _inherits3.default)(Question, _Component);

	    function Question(props) {
	        (0, _classCallCheck3.default)(this, Question);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Question.__proto__ || (0, _getPrototypeOf2.default)(Question)).call(this, props));

	        var _this$props$question = _this.props.question,
	            title = _this$props$question.title,
	            isAllowUpload = _this$props$question.isAllowUpload,
	            isCommentRequired = _this$props$question.isCommentRequired,
	            isAllowScaleDefinitions = _this$props$question.isAllowScaleDefinitions,
	            type = _this$props$question.type,
	            scaleDefinitions = _this$props$question.scaleDefinitions,
	            isSaved = _this$props$question.isSaved;


	        _this.state = {
	            isMaximiseEnabled: true,
	            title: title,
	            isAllowUpload: isAllowUpload,
	            isCommentRequired: isCommentRequired,
	            isAllowScaleDefinitions: isAllowScaleDefinitions,
	            type: type,
	            scaleDefinitions: scaleDefinitions,
	            documentError: '',
	            documents: [],
	            isSaved: isSaved
	        };
	        _this.addQuestion = _this.addQuestion.bind(_this);
	        _this.deleteQuestion = _this.deleteQuestion.bind(_this);
	        _this.toggleMaximise = _this.toggleMaximise.bind(_this);
	        _this.onDocumentDrop = _this.onDocumentDrop.bind(_this);
	        _this.onRemoveDocument = _this.onRemoveDocument.bind(_this);
	        _this.onScaleDefinitionChange = _this.onScaleDefinitionChange.bind(_this);
	        _this.updateScaleDefinition = _this.updateScaleDefinition.bind(_this);
	        _this.updateTitle = _this.updateTitle.bind(_this);
	        _this.intervalId_update = null;
	        _this.intervalId_saveAnim = null;
	        return _this;
	    }

	    (0, _createClass3.default)(Question, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var _this2 = this;

	            var question = nextProps.question;


	            this.setStateWithQuestion(question, question.isSaved);
	            this.clearAllIntervals();
	            this.intervalId_saveAnim = setInterval(function () {
	                _this2.setState({ isSaved: false });
	                clearInterval(_this2.intervalId_saveAnim);
	            }, _constants.SAVE_ANIM_INTERVAL);
	        }
	    }, {
	        key: 'setStateWithQuestion',
	        value: function setStateWithQuestion(question, isSaved) {
	            var title = question.title,
	                isAllowUpload = question.isAllowUpload,
	                isCommentRequired = question.isCommentRequired,
	                isAllowScaleDefinitions = question.isAllowScaleDefinitions,
	                type = question.type,
	                scaleDefinitions = question.scaleDefinitions;

	            var documentError = '';
	            this.setState({
	                isQuestionTitleError: false,
	                title: title,
	                isAllowUpload: isAllowUpload,
	                isCommentRequired: isCommentRequired,
	                isAllowScaleDefinitions: isAllowScaleDefinitions,
	                type: type,
	                scaleDefinitions: scaleDefinitions,
	                documentError: documentError,
	                isSaved: isSaved
	            });
	        }
	    }, {
	        key: 'updateQuestionIndex',
	        value: function updateQuestionIndex() {
	            var newQuestionIndex = this.state.questionIndex;
	            this.setState({ newQuestionIndex: newQuestionIndex });
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.clearAllIntervals();
	        }
	    }, {
	        key: 'addQuestion',
	        value: function addQuestion() {
	            this.props.dispatch((0, _evaluationTemplateCreator.addQuestionToCriteria)(this.props.criteriaId, this.state.title, this.state.type));
	        }
	    }, {
	        key: 'deleteQuestion',
	        value: function deleteQuestion() {
	            this.props.dispatch((0, _evaluationTemplateCreator.deleteQuestion)(this.props.criteriaId, this.props.question.id));
	        }
	    }, {
	        key: 'updateTitle',
	        value: function updateTitle() {
	            if (this.props.question.id !== null) {
	                this.props.dispatch((0, _evaluationTemplateCreator.onQuestionTitleChange)(this.props.criteriaId, this.props.question.id, this.state.title));
	            }
	            this.setState({ isMaximiseEnabled: true });
	            clearInterval(this.intervalId_update);
	        }
	    }, {
	        key: 'onTitleChange',
	        value: function onTitleChange(title) {
	            if (title.length) {
	                this.clearAllIntervals();
	                this.setState({ title: title, isMaximiseEnabled: false, isQuestionTitleError: false });
	                this.intervalId_update = setInterval(this.updateTitle, _constants.INPUT_SYNC_INTERVAL);
	            } else {
	                this.setState({ isQuestionTitleError: true });
	            }
	        }
	    }, {
	        key: 'clearAllIntervals',
	        value: function clearAllIntervals() {
	            clearInterval(this.intervalId_update);
	            clearInterval(this.intervalId_saveAnim);
	        }
	    }, {
	        key: 'toggleMaximise',
	        value: function toggleMaximise() {
	            this.clearAllIntervals();
	            var question = this.props.question;

	            this.props.dispatch((0, _evaluationTemplateCreator.toggleMaximiseQuestion)(question.id, !question.isMaximised));
	        }
	    }, {
	        key: 'onCommentRequiredChange',
	        value: function onCommentRequiredChange(isCommentRequired) {
	            this.props.dispatch((0, _evaluationTemplateCreator.onQuestionAllowCommentsChange)(this.props.criteriaId, this.props.question.id, isCommentRequired));
	        }
	    }, {
	        key: 'onAllowUploadChange',
	        value: function onAllowUploadChange(isAllowUpload) {
	            this.props.dispatch((0, _evaluationTemplateCreator.onQuestionAllowUploadChange)(this.props.criteriaId, this.props.question.id, isAllowUpload));
	        }
	    }, {
	        key: 'onQuestionTypeChange',
	        value: function onQuestionTypeChange(type) {
	            clearInterval(this.intervalId_saveAnim);
	            this.setState({ type: type });
	            if (this.props.question.id) {
	                this.props.dispatch((0, _evaluationTemplateCreator.onQuestionTypeChange)(this.props.criteriaId, this.props.question.id, type));
	            }
	        }
	    }, {
	        key: 'updateScaleDefinition',
	        value: function updateScaleDefinition(id, index, label, value, definitionId) {
	            this.clearAllIntervals();
	            this.setState({ isMaximiseEnabled: true });
	            this.props.dispatch((0, _evaluationTemplateCreator.onScaleDefinitionChange)(this.props.criteriaId, this.props.question.id, id, label, value, definitionId));
	        }
	    }, {
	        key: 'onScaleDefinitionChange',
	        value: function onScaleDefinitionChange(id, index, label) {
	            var _this3 = this;

	            var scaleDefinitions = this.state.scaleDefinitions;

	            scaleDefinitions[index] = (0, _assign2.default)({}, scaleDefinitions[index], { label: label });

	            var _scaleDefinitions$ind = scaleDefinitions[index],
	                value = _scaleDefinitions$ind.value,
	                definitionId = _scaleDefinitions$ind.definitionId;


	            this.setState({ scaleDefinitions: scaleDefinitions, isMaximiseEnabled: false });
	            this.clearAllIntervals();
	            this.intervalId_update = setInterval(function () {
	                _this3.updateScaleDefinition(id, index, label, value, definitionId);
	            }, _constants.INPUT_SYNC_INTERVAL);
	        }
	    }, {
	        key: 'onAllowScaleDefinitionChange',
	        value: function onAllowScaleDefinitionChange(isAllowScaleDefinitions) {
	            var scaleDefinitions = [];
	            this.setState({ isAllowScaleDefinitions: isAllowScaleDefinitions, scaleDefinitions: scaleDefinitions });
	            this.props.dispatch((0, _evaluationTemplateCreator.onAllowScaleDefinitionChange)(this.props.criteriaId, this.props.question.id, isAllowScaleDefinitions));
	        }
	    }, {
	        key: 'onRemoveDocument',
	        value: function onRemoveDocument(id) {
	            var _props = this.props,
	                criteriaId = _props.criteriaId,
	                question = _props.question;

	            this.props.dispatch((0, _evaluationTemplateCreator.deleteDocument)(criteriaId, question.id, id));
	        }
	    }, {
	        key: 'onDocumentDrop',
	        value: function onDocumentDrop(files) {
	            var allowedExtenstions = ['.pdf', '.png', '.jpg', '.jpeg', '.csv', '.xls', '.xlsx', '.doc', '.docx', '.dwg'];
	            var invalid = [];

	            var filteredFiles = files.filter(function (file) {
	                var extension = file.name.split('.').pop().toLowerCase();

	                if (!~allowedExtenstions.indexOf('.' + extension)) {
	                    invalid.push(file.name);
	                }

	                return !!~allowedExtenstions.indexOf('.' + extension);
	            });

	            if (filteredFiles.length !== files.length) {
	                this.setState({
	                    documentError: invalid.join(', ') + ' - file type not supported'
	                });

	                return;
	            }
	            var documentError = '';
	            this.setState({ documentError: documentError });

	            var documents = files.map(function (file, key) {
	                file.id = +new Date() + key;
	                return file;
	            });
	            var _props2 = this.props,
	                criteriaId = _props2.criteriaId,
	                question = _props2.question;


	            this.props.dispatch((0, _evaluationTemplateCreator.addDocumentsForQuestion)(criteriaId, question.id, documents));
	        }
	    }, {
	        key: 'getWeightInputStyle',
	        value: function getWeightInputStyle() {
	            var style = 'form-control';
	            if (this.state.isWeightError) {
	                style += ' error';
	            } else if (this.state.isSaved) {
	                style += ' saved';
	            }
	            return style;
	        }
	    }, {
	        key: 'getClassIfError',
	        value: function getClassIfError(val) {
	            if (val) {
	                return ' error';
	            } else {
	                return '';
	            }
	        }
	    }, {
	        key: 'renderMinimised',
	        value: function renderMinimised() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-md-12' },
	                    _react2.default.createElement(
	                        'fieldset',
	                        { className: 'question-container collapsed' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'row' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'col-md-6' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'form-group' },
	                                    _react2.default.createElement(
	                                        'label',
	                                        null,
	                                        'Question ',
	                                        this.props.questionIndex,
	                                        ' ',
	                                        _react2.default.createElement(
	                                            'span',
	                                            null,
	                                            (0, _dataParserUtil.getItemByAttrib)(this.props.questionTypes, 'type', this.state.type).title
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'p',
	                                        null,
	                                        this.state.title
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'col-md-6 text-right' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'form-group' },
	                                    _react2.default.createElement('br', null),
	                                    _react2.default.createElement(
	                                        'button',
	                                        { className: 'btn btn-sm', onClick: this.toggleMaximise },
	                                        _react2.default.createElement('i', { className: 'fa fa-pencil' }),
	                                        'Edit Question'
	                                    ),
	                                    '\xA0',
	                                    _react2.default.createElement(
	                                        'button',
	                                        { className: 'btn btn-sm', onClick: this.deleteQuestion },
	                                        _react2.default.createElement('i', { className: 'fa fa-trash-o' }),
	                                        'Delete Question'
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'renderMaximised',
	        value: function renderMaximised() {
	            var _this4 = this;

	            var isDefsDisabled = this.state.type === '3' || this.state.type === '4';
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h3',
	                    null,
	                    'Question ',
	                    this.props.questionIndex
	                ),
	                _react2.default.createElement(
	                    'fieldset',
	                    { className: 'question-container ' + (this.state.isSaved ? 'saved' : '') },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'col-md-4 col-sm-12' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'form-group' },
	                            _react2.default.createElement(
	                                'label',
	                                { className: 'control-label' },
	                                _react2.default.createElement(
	                                    'span',
	                                    { className: 'required', 'aria-required': 'true' },
	                                    'Question Type'
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'select',
	                                { className: 'form-control', value: this.state.type,
	                                    onChange: function onChange(event) {
	                                        return _this4.onQuestionTypeChange(event.target.value);
	                                    } },
	                                this.props.questionTypes.map(function (type, index) {
	                                    return _react2.default.createElement(
	                                        'option',
	                                        { key: index, value: type.type },
	                                        type.title
	                                    );
	                                })
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'col-md-6 col-sm-12' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'form-group' },
	                            _react2.default.createElement(
	                                'label',
	                                { className: 'control-label' },
	                                _react2.default.createElement(
	                                    'span',
	                                    { className: 'required', 'aria-required': 'true' },
	                                    'Question Title'
	                                )
	                            ),
	                            _react2.default.createElement('input', { className: 'form-control ' + this.getClassIfError(this.state.isQuestionTitleError),
	                                defaultValue: this.state.title,
	                                onChange: function onChange(event) {
	                                    return _this4.onTitleChange(event.target.value);
	                                } })
	                        )
	                    ),
	                    this.props.question.id !== null ? _react2.default.createElement(
	                        'div',
	                        null,
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'form-group pull-right' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'hidden-sm' },
	                                _react2.default.createElement('br', null),
	                                _react2.default.createElement('br', null)
	                            ),
	                            this.state.isMaximiseEnabled ? _react2.default.createElement(
	                                'button',
	                                {
	                                    className: 'btn btn-sm',
	                                    onClick: this.toggleMaximise },
	                                _react2.default.createElement('i', { className: 'fa fa-angle-double-up' }),
	                                'Collapse Question'
	                            ) : _react2.default.createElement(
	                                'button',
	                                { disabled: true,
	                                    className: 'btn btn-sm' },
	                                'Saving...'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-12' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'form-group' },
	                                _react2.default.createElement(
	                                    'label',
	                                    { className: 'control-label' },
	                                    'Options'
	                                ),
	                                _react2.default.createElement(
	                                    'ul',
	                                    null,
	                                    isDefsDisabled !== true ? _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'div',
	                                            { className: 'checkbox' },
	                                            _react2.default.createElement(
	                                                'label',
	                                                null,
	                                                _react2.default.createElement('input', { type: 'checkbox', disabled: isDefsDisabled,
	                                                    checked: this.state.isAllowScaleDefinitions,
	                                                    onChange: function onChange(event) {
	                                                        return _this4.onAllowScaleDefinitionChange(event.target.checked);
	                                                    }
	                                                }),
	                                                _models.QUESTION_OPTIONS[0].label
	                                            ),
	                                            this.state.isAllowScaleDefinitions ? _react2.default.createElement(
	                                                'ul',
	                                                null,
	                                                this.state.scaleDefinitions.map(function (type, index) {
	                                                    return _react2.default.createElement(
	                                                        'li',
	                                                        { key: index, className: 'mar-btm-sm' },
	                                                        _react2.default.createElement(
	                                                            'div',
	                                                            { className: 'input-group' },
	                                                            _react2.default.createElement(
	                                                                'span',
	                                                                { className: 'input-group-addon scale', id: 'basic-addon1' },
	                                                                index
	                                                            ),
	                                                            _react2.default.createElement('input', { type: 'text',
	                                                                defaultValue: type.label,
	                                                                onChange: function onChange(event) {
	                                                                    return _this4.onScaleDefinitionChange(type.id, index, event.target.value);
	                                                                },
	                                                                className: 'form-control', 'aria-describedby': 'basic-addon1', placeholder: 'Enter Definition' })
	                                                        )
	                                                    );
	                                                })
	                                            ) : null
	                                        )
	                                    ) : null,
	                                    _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'div',
	                                            { className: 'checkbox' },
	                                            _react2.default.createElement(
	                                                'label',
	                                                null,
	                                                _react2.default.createElement('input', { type: 'checkbox',
	                                                    defaultChecked: this.props.question.isAllowUpload,
	                                                    value: this.state.isAllowUpload,
	                                                    onChange: function onChange(event) {
	                                                        return _this4.onAllowUploadChange(event.target.checked);
	                                                    }
	                                                }),
	                                                _models.QUESTION_OPTIONS[1].label
	                                            )
	                                        )
	                                    ),
	                                    this.state.type === '4' ? null : _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'div',
	                                            { className: 'checkbox' },
	                                            _react2.default.createElement(
	                                                'label',
	                                                null,
	                                                _react2.default.createElement('input', { type: 'checkbox',
	                                                    defaultChecked: this.props.question.isCommentRequired,
	                                                    value: this.state.isCommentRequired,
	                                                    onChange: function onChange(event) {
	                                                        return _this4.onCommentRequiredChange(event.target.checked);
	                                                    } }),
	                                                _models.QUESTION_OPTIONS[2].label
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-md-12' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'form-group' },
	                                _react2.default.createElement(
	                                    'label',
	                                    { className: 'control-label' },
	                                    'Documents'
	                                ),
	                                this.state.documentError ? _react2.default.createElement(
	                                    'div',
	                                    { className: 'bs-callout bs-callout-danger' },
	                                    this.state.documentError
	                                ) : null,
	                                _react2.default.createElement(
	                                    _reactDropzone2.default,
	                                    { className: 'dropzone',
	                                        onDrop: this.onDocumentDrop },
	                                    _react2.default.createElement(
	                                        'p',
	                                        { className: 'text-center dropzone__placeholder' },
	                                        _react2.default.createElement('i', { className: 'fa fa-cloud-upload' }),
	                                        ' Drop files here or click to select files.'
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'ul',
	                                    null,
	                                    this.props.documents.map(function (document, index) {
	                                        return _react2.default.createElement(_Document2.default, {
	                                            key: index,
	                                            file: document,
	                                            preview: false,
	                                            onFileRemove: _this4.onRemoveDocument
	                                        });
	                                    })
	                                )
	                            )
	                        )
	                    ) : null,
	                    this.renderFunctionButtons(),
	                    this.props.onNewQuestionClose ? _react2.default.createElement(
	                        'div',
	                        { className: 'col-md-12 text-right' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'form-group' },
	                            _react2.default.createElement(
	                                'button',
	                                { className: 'btn btn-sm',
	                                    onClick: this.props.onNewQuestionClose },
	                                _react2.default.createElement('i', { className: 'fa fa-times' }),
	                                'Discard Question'
	                            )
	                        )
	                    ) : null
	                )
	            );
	        }
	    }, {
	        key: 'renderFunctionButtons',
	        value: function renderFunctionButtons() {
	            if (this.props.question.id === null && this.state.title) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'col-md-2' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'form-group pull-right' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'hidden-sm' },
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement('br', null)
	                        ),
	                        _react2.default.createElement(
	                            'button',
	                            { className: 'btn btn-sm',
	                                disabled: !this.state.title,
	                                onClick: this.addQuestion },
	                            _react2.default.createElement('i', { className: 'fa fa-plus' }),
	                            'Add Question'
	                        )
	                    )
	                );
	            } else {
	                return null;
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return this.props.question.isMaximised ? this.renderMaximised() : this.renderMinimised();
	        }
	    }]);
	    return Question;
	}(_react.Component);

	Question.propTypes = {
	    question: _react.PropTypes.object,
	    documents: _react.PropTypes.array,
	    questionId: _react.PropTypes.string,
	    questionIndex: _react.PropTypes.number,
	    criteriaId: _react.PropTypes.string.isRequired,
	    dispatch: _react.PropTypes.func.isRequired,
	    onNewQuestionClose: _react.PropTypes.func,
	    questionTypes: _react.PropTypes.array.isRequired
	};

	function mapStateToProps(state, props) {
	    var _state$evaluationTemp = state.evaluationTemplateCreator,
	        questionsByIndex = _state$evaluationTemp.questionsByIndex,
	        documentsByIndex = _state$evaluationTemp.documentsByIndex,
	        questionTypes = _state$evaluationTemp.questionTypes;

	    var question = props.questionId ? questionsByIndex[props.questionId] : (0, _dataParserUtil.createQuestion)(questionTypes[0].type);
	    var questionIndex = props.questionIndex;
	    var documents = [];
	    documents = question.documentIds.map(function (id) {
	        return documentsByIndex[id];
	    });
	    return { question: question, documents: documents, questionTypes: questionTypes, questionIndex: questionIndex };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps)(Question);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(Question, 'Question', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/containers/Question.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/containers/Question.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/containers/Question.js');
	})();

	;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(23);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(25);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(20);

	var _actions = __webpack_require__(75);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Modal = function (_Component) {
	    (0, _inherits3.default)(Modal, _Component);

	    function Modal(props) {
	        (0, _classCallCheck3.default)(this, Modal);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call(this, props));

	        _this.onCloseModal = _this.onCloseModal.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(Modal, [{
	        key: 'onCloseModal',
	        value: function onCloseModal() {
	            this.props.dispatch((0, _actions.closeModal)());
	            if (this.props.onClose) {
	                this.props.onClose();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                message = _props.message,
	                title = _props.title,
	                isOpen = _props.isOpen;

	            var modalStyle = void 0,
	                containerClassName = void 0;
	            if (isOpen) {
	                containerClassName += ' fade in ';
	                modalStyle = { display: 'block' };
	            } else {
	                containerClassName += ' fade out ';
	                modalStyle = { display: 'none' };
	            }
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement('div', { className: 'modal-backdrop ' + containerClassName, style: modalStyle }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'modal ' + containerClassName, style: modalStyle },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'modal-dialog' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'modal-content' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'modal-header' },
	                                _react2.default.createElement(
	                                    'h4',
	                                    { className: 'modal-title' },
	                                    title
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'modal-body' },
	                                _react2.default.createElement(
	                                    'p',
	                                    null,
	                                    message
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'modal-footer' },
	                                _react2.default.createElement(
	                                    'button',
	                                    { type: 'button', className: 'btn btn-sm btn-success pmfilters__success', onClick: this.onCloseModal },
	                                    ' Back to Templates \u203A'
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return Modal;
	}(_react.Component);

	Modal.propTypes = {
	    message: _react.PropTypes.string.isRequired,
	    title: _react.PropTypes.string.isRequired,
	    onClose: _react.PropTypes.func,
	    isOpen: _react.PropTypes.bool.isRequired,
	    dispatch: _react.PropTypes.func.isRequired
	};

	function mapStateToProps(state) {
	    var modal = state.modal;
	    var message = modal.message,
	        title = modal.title,
	        isOpen = modal.isOpen,
	        onClose = modal.onClose;


	    return { message: message, title: title, isOpen: isOpen, onClose: onClose };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps)(Modal);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(Modal, 'Modal', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/modal/Modal.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/modal/Modal.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/modal/Modal.js');
	})();

	;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(34);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.modal = modal;

	var _ActionTypes = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getInitialData() {
	    return { message: '', title: '', isOpen: false, onClose: null };
	}

	function modal() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getInitialData();
	    var action = arguments[1];

	    switch (action.type) {
	        case _ActionTypes.MODAL_PROMPT_MESSAGE:
	            {
	                var message = action.message,
	                    title = action.title,
	                    onClose = action.onClose;

	                var isOpen = true;
	                return (0, _extends3.default)({}, state, { message: message, title: title, isOpen: isOpen, onClose: onClose });
	            }
	        case _ActionTypes.MODAL_CLOSE:
	            {
	                var _isOpen = false;
	                var _message = '';
	                var _title = '';
	                var _onClose = null;
	                return (0, _extends3.default)({}, state, { message: _message, title: _title, isOpen: _isOpen, onClose: _onClose });
	            }
	        default:
	            return state;
	    }
	}
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(getInitialData, 'getInitialData', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/modal/reducers/index.js');

	    __REACT_HOT_LOADER__.register(modal, 'modal', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/modal/reducers/index.js');
	})();

	;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(23);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(24);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(26);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(25);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(20);

	var _actions = __webpack_require__(77);

	var _constants = __webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Notification = function (_Component) {
	    (0, _inherits3.default)(Notification, _Component);

	    function Notification(props) {
	        (0, _classCallCheck3.default)(this, Notification);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Notification.__proto__ || (0, _getPrototypeOf2.default)(Notification)).call(this, props));

	        _this.toasterTimerId = null;
	        return _this;
	    }

	    (0, _createClass3.default)(Notification, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearInterval(this.toasterTimerId);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var _this2 = this;

	            clearInterval(this.toasterTimerId);
	            if (nextProps.messages.length) {
	                this.toasterTimerId = setInterval(function () {
	                    _this2.props.dispatch((0, _actions.clearNotifications)());
	                    clearInterval(_this2.toasterTimerId);
	                }, 3500);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var messages = this.props.messages;

	            var errorClass = '';
	            var messagesCount = messages.length;
	            if (this.props.messages.length && this.props.messages.find(function (item) {
	                return item.messageType === _constants.MESSAGE_TYPE_ERROR;
	            })) {
	                errorClass = 'error';
	            }
	            if (messagesCount) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'toast-container ' + errorClass + ' active auto-hide' },
	                    messages.map(function (item, index) {
	                        return _react2.default.createElement(
	                            'span',
	                            { key: index },
	                            ' ',
	                            item.message
	                        );
	                    })
	                );
	            } else {
	                return null;
	            }
	        }
	    }]);
	    return Notification;
	}(_react.Component);

	Notification.propTypes = {
	    messages: _react.PropTypes.array,
	    dispatch: _react.PropTypes.func.isRequired
	};

	function mapStateToProps(state) {
	    var messages = state.notification.messages;


	    return { messages: messages };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps)(Notification);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(Notification, 'Notification', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/Notification.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/Notification.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/Notification.js');
	})();

	;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _assign = __webpack_require__(21);

	var _assign2 = _interopRequireDefault(_assign);

	exports.notification = notification;

	var _ActionTypes = __webpack_require__(78);

	var _constants = __webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getInitialData() {
	    return { messages: [] };
	}

	function notification() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getInitialData();
	    var action = arguments[1];

	    switch (action.type) {
	        case _ActionTypes.NOTIFICATION_PROMPT_MESSAGE:
	            {
	                var message = action.message,
	                    messageType = action.messageType;

	                switch (action.messageType) {
	                    case _constants.MESSAGE_TYPE_ERROR:
	                        state.messages = [{ messageClass: 'error', message: message, messageType: messageType }];
	                        break;
	                    case _constants.MESSAGE_TYPE_SUCCESS:
	                        state.messages = [{ messageClass: 'success', message: message, messageType: messageType }];
	                        break;
	                }

	                return (0, _assign2.default)({}, state);
	            }
	        case _ActionTypes.NOTIFICATION_CLEAR_MESSAGES:
	            {
	                state.messages = [];
	                return (0, _assign2.default)({}, state);
	            }
	        default:
	            return state;
	    }
	}
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(getInitialData, 'getInitialData', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/reducers/index.js');

	    __REACT_HOT_LOADER__.register(notification, 'notification', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/notification/reducers/index.js');
	})();

	;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _toConsumableArray2 = __webpack_require__(148);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _assign = __webpack_require__(21);

	var _assign2 = _interopRequireDefault(_assign);

	var _keys = __webpack_require__(144);

	var _keys2 = _interopRequireDefault(_keys);

	var _values = __webpack_require__(79);

	var _values2 = _interopRequireDefault(_values);

	var _extends2 = __webpack_require__(34);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.evaluationTemplateCreator = evaluationTemplateCreator;

	var _ActionTypes = __webpack_require__(73);

	var _constants = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getInitialData() {
	    return {
	        isBusy: false,
	        messages: [],
	        id: null,
	        title: '',
	        criteriaByIndex: {},
	        allCriteriaIndexes: [],
	        questionsByIndex: {},
	        allQuestionIndexes: [],
	        documentsByIndex: {},
	        allDocumentIndexes: [],
	        questionTypes: []
	    };
	}

	function evaluationTemplateCreator() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getInitialData();
	    var action = arguments[1];

	    switch (action.type) {
	        case _ActionTypes.INITIALIZED:
	            {
	                var isBusy = false;
	                var questionTypes = action.questionTypes;

	                return (0, _extends3.default)({}, state, { questionTypes: questionTypes, isBusy: isBusy });
	            }
	        case _ActionTypes.QUESTION_MAXIMISE_CHANGE:
	            {
	                var id = action.id,
	                    isMaximised = action.isMaximised;
	                var questionsByIndex = state.questionsByIndex;

	                if (isMaximised) {
	                    // if a question is maximised minimse others.
	                    (0, _values2.default)(questionsByIndex).forEach(function (item) {
	                        item.isMaximised = false;
	                    });
	                }
	                var question = questionsByIndex[id];
	                questionsByIndex[id] = (0, _extends3.default)({}, question, { isMaximised: isMaximised });
	                return (0, _extends3.default)({}, state, { questionsByIndex: questionsByIndex });
	            }
	        case _ActionTypes.CRITERIA_MAXIMISE_CHANGE:
	            {
	                var _id = action.id,
	                    _isMaximised = action.isMaximised;
	                var criteriaByIndex = state.criteriaByIndex,
	                    _questionsByIndex = state.questionsByIndex;

	                if (_isMaximised) {
	                    // if a criteria is maximised minimse others.
	                    (0, _values2.default)(criteriaByIndex).forEach(function (item) {
	                        var id = item.id;

	                        var isMaximised = false;
	                        var criteria = criteriaByIndex[id];
	                        criteriaByIndex[id] = (0, _extends3.default)({}, criteria, { isMaximised: isMaximised });
	                    });
	                } else {
	                    // if a criteria is minimised, minimise all its questions aswell.
	                    (0, _values2.default)(_questionsByIndex).forEach(function (item) {
	                        var isMaximised = false;
	                        var id = item.id;

	                        var question = _questionsByIndex[id];
	                        _questionsByIndex[id] = (0, _extends3.default)({}, question, { isMaximised: isMaximised });
	                    });
	                }
	                var criteria = criteriaByIndex[_id];
	                criteriaByIndex[_id] = (0, _extends3.default)({}, criteria, { isMaximised: _isMaximised });
	                return (0, _extends3.default)({}, state, { criteriaByIndex: criteriaByIndex, questionsByIndex: _questionsByIndex });
	            }
	        case _ActionTypes.MINIMISE_ALL_QUESTIONS:
	            {
	                var _questionsByIndex2 = state.questionsByIndex;

	                (0, _values2.default)(_questionsByIndex2).forEach(function (item) {
	                    var id = item.id;

	                    var isMaximised = false;
	                    var question = _questionsByIndex2[id];
	                    _questionsByIndex2[id] = (0, _extends3.default)({}, question, { isMaximised: isMaximised });
	                });
	                return (0, _extends3.default)({}, state, { questionsByIndex: _questionsByIndex2 });
	            }
	        case _ActionTypes.MINIMISE_ALL_CRITERIA:
	            {
	                var _criteriaByIndex = state.criteriaByIndex;

	                (0, _values2.default)(_criteriaByIndex).forEach(function (item) {
	                    var id = item.id;

	                    var isMaximised = false;
	                    var criteria = _criteriaByIndex[id];
	                    _criteriaByIndex[id] = (0, _extends3.default)({}, criteria, { isMaximised: isMaximised });
	                });
	                return (0, _extends3.default)({}, state, { criteriaByIndex: _criteriaByIndex });
	            }
	        case _ActionTypes.TEMPLATE_FETCHED:
	            {
	                var _isBusy = false;
	                var template = action.template;
	                var _id2 = template.id,
	                    title = template.title,
	                    _criteriaByIndex2 = template.criteriaByIndex,
	                    allCriteriaIndexes = template.allCriteriaIndexes,
	                    _questionsByIndex3 = template.questionsByIndex,
	                    allQuestionIndexes = template.allQuestionIndexes,
	                    documentsByIndex = template.documentsByIndex,
	                    allDocumentIndexes = template.allDocumentIndexes;

	                return (0, _extends3.default)({}, state, { id: _id2,
	                    title: title,
	                    criteriaByIndex: _criteriaByIndex2,
	                    allCriteriaIndexes: allCriteriaIndexes,
	                    questionsByIndex: _questionsByIndex3,
	                    allQuestionIndexes: allQuestionIndexes,
	                    documentsByIndex: documentsByIndex,
	                    allDocumentIndexes: allDocumentIndexes,
	                    isBusy: _isBusy });
	            }
	        case _ActionTypes.TEMPLATE_CREATED:
	            {
	                var _isBusy2 = false;
	                var _title = action.title,
	                    _id3 = action.id;

	                return (0, _extends3.default)({}, state, { title: _title, id: _id3, isBusy: _isBusy2 });
	            }
	        case _ActionTypes.TEMPLATE_UPDATED:
	            {
	                var _isBusy3 = false;
	                var _title2 = action.title;

	                return (0, _extends3.default)({}, state, { title: _title2, isBusy: _isBusy3 });
	            }
	        case _ActionTypes.CRITERIA_ADD:
	            {
	                var _isBusy4 = false;
	                var criterion = action.criterion;
	                var _criteriaByIndex3 = state.criteriaByIndex,
	                    _allCriteriaIndexes = state.allCriteriaIndexes;

	                (0, _keys2.default)(_criteriaByIndex3).forEach(function (key) {
	                    if (_criteriaByIndex3[key].isMaximised) {
	                        _criteriaByIndex3[key] = (0, _assign2.default)({}, _criteriaByIndex3[key], { isMaximised: false });
	                    }
	                });
	                _criteriaByIndex3[criterion.id] = criterion;
	                _allCriteriaIndexes = _allCriteriaIndexes.concat(criterion.id);
	                return (0, _extends3.default)({}, state, { allCriteriaIndexes: _allCriteriaIndexes, criteriaByIndex: _criteriaByIndex3, isBusy: _isBusy4 });
	            }
	        case _ActionTypes.CRITERIA_UPDATE:
	            {
	                var _isBusy5 = false;
	                var _id4 = action.id,
	                    _title3 = action.title,
	                    weight = action.weight;
	                var _allCriteriaIndexes2 = state.allCriteriaIndexes,
	                    _criteriaByIndex4 = state.criteriaByIndex,
	                    _allQuestionIndexes = state.allQuestionIndexes,
	                    _questionsByIndex4 = state.questionsByIndex;

	                _criteriaByIndex4 = (0, _extends3.default)({}, _criteriaByIndex4);
	                for (var i in _allQuestionIndexes) {
	                    if (_questionsByIndex4[_allQuestionIndexes[i]].isSaved) {
	                        _questionsByIndex4[_allQuestionIndexes[i]].isSaved = false;
	                    }
	                }
	                for (var _i in _allCriteriaIndexes2) {
	                    if (_criteriaByIndex4[_allCriteriaIndexes2[_i]].isSaved) {
	                        _criteriaByIndex4[_allCriteriaIndexes2[_i]].isSaved = false;
	                    }
	                }
	                _criteriaByIndex4[_id4] = (0, _assign2.default)({}, _criteriaByIndex4[_id4], { title: _title3, weight: weight, isSaved: true });

	                return (0, _extends3.default)({}, state, { isBusy: _isBusy5, criteriaByIndex: _criteriaByIndex4 });
	            }
	        case _ActionTypes.CRITERIA_DELETE:
	            {
	                var _isBusy6 = false;
	                var _id5 = action.id;

	                var _allCriteriaIndexes3 = state.allCriteriaIndexes.filter(function (id) {
	                    return id !== action.id;
	                });
	                var _criteriaByIndex5 = (0, _assign2.default)({}, state.criteriaByIndex);
	                var _allQuestionIndexes2 = [].concat((0, _toConsumableArray3.default)(state.allQuestionIndexes));
	                var _questionsByIndex5 = (0, _assign2.default)({}, state.questionsByIndex);
	                var questions = state.criteriaByIndex[action.id].questions;
	                questions.forEach(function (questionId) {
	                    delete _questionsByIndex5[questionId];
	                    _allQuestionIndexes2 = _allQuestionIndexes2.slice(_allQuestionIndexes2.indexOf(questionId), 1);
	                });
	                delete _criteriaByIndex5[_id5];
	                return (0, _extends3.default)({}, state, { allCriteriaIndexes: _allCriteriaIndexes3, criteriaByIndex: _criteriaByIndex5, allQuestionIndexes: _allQuestionIndexes2, questionsByIndex: _questionsByIndex5, isBusy: _isBusy6 });
	            }
	        case _ActionTypes.DOCUMENT_UPLOAD_SUCCESS:
	            {
	                var documentId = action.documentId,
	                    newDocumentId = action.newDocumentId,
	                    url = action.url;
	                var _documentsByIndex = state.documentsByIndex;

	                var document = (0, _extends3.default)({}, _documentsByIndex[documentId]);

	                _documentsByIndex[documentId] = (0, _assign2.default)({}, document, {
	                    status: _constants.UPLOAD_SUCCESS,
	                    progress: 100,
	                    referenceId: newDocumentId,
	                    referenceUrl: url
	                });

	                return (0, _assign2.default)({}, state);
	            }
	        case _ActionTypes.DOCUMENT_UPLOAD_FAILED:
	            {
	                state.documentsByIndex[action.documentId] = (0, _assign2.default)({}, state.documentsByIndex[action.documentId], {
	                    status: _constants.UPLOAD_FAILED,
	                    progress: action.progress
	                });

	                return (0, _assign2.default)({}, state);
	            }
	        case _ActionTypes.DOCUMENT_UPLOAD_IN_PROGRESS:
	            {
	                state.documentsByIndex[action.documentId] = (0, _assign2.default)({}, state.documentsByIndex[action.documentId], {
	                    status: _constants.UPLOAD_IN_PROGRESS,
	                    progress: action.progress
	                });

	                return (0, _assign2.default)({}, state);
	            }
	        case _ActionTypes.DOCUMENTS_UPLOADING:
	            {
	                action.documents.map(function (document) {
	                    state.questionsByIndex[action.questionId].documentIds.push(document.id);
	                    state.documentsByIndex[document.id] = (0, _assign2.default)({}, document, {
	                        status: _constants.UPLOAD_IN_PROGRESS,
	                        name: document.name,
	                        progress: 15
	                    });
	                    state.allDocumentIndexes.push(document.id);
	                });
	                return (0, _assign2.default)({}, state);
	            }
	        case _ActionTypes.DOCUMENT_DELETE:
	            {
	                var _questionsByIndex6 = (0, _assign2.default)({}, state.questionsByIndex);
	                var _question = _questionsByIndex6[action.questionId];
	                var _allDocumentIndexes = state.allDocumentIndexes.filter(function (id) {
	                    return id !== action.id;
	                });
	                var _documentsByIndex2 = (0, _assign2.default)({}, state.documentsByIndex);
	                delete _documentsByIndex2[String(action.id)];
	                _question.documentIds = _question.documentIds.filter(function (id) {
	                    return id !== action.id;
	                });
	                _questionsByIndex6[action.id] = _question;
	                return (0, _assign2.default)({}, state, { allDocumentIndexes: _allDocumentIndexes, documentsByIndex: _documentsByIndex2, questionsByIndex: _questionsByIndex6 });
	            }
	        case _ActionTypes.QUESTION_ADD:
	            {
	                var _isBusy7 = false;
	                var _question2 = action.question,
	                    criteriaId = action.criteriaId;
	                var _id6 = _question2.id;

	                var _questionsByIndex7 = (0, _assign2.default)({}, state.questionsByIndex);
	                var _criteriaByIndex6 = (0, _assign2.default)({}, state.criteriaByIndex);
	                _questionsByIndex7[_id6] = _question2;
	                var _allQuestionIndexes3 = [].concat((0, _toConsumableArray3.default)(state.allQuestionIndexes), [_id6]);
	                var _questions = [].concat((0, _toConsumableArray3.default)(state.criteriaByIndex[criteriaId].questions), [_id6]);
	                _criteriaByIndex6[action.criteriaId] = (0, _assign2.default)({}, _criteriaByIndex6[criteriaId], { questions: _questions });
	                return (0, _extends3.default)({}, state, { criteriaByIndex: _criteriaByIndex6, allQuestionIndexes: _allQuestionIndexes3, questionsByIndex: _questionsByIndex7, isBusy: _isBusy7 });
	            }
	        case _ActionTypes.QUESTION_UPDATE:
	            {
	                var _isBusy8 = action.isBusy;

	                var _question3 = (0, _assign2.default)({}, action.question, { isSaved: true });
	                var _id7 = _question3.id;

	                for (var _i2 in state.allQuestionIndexes) {
	                    if (state.questionsByIndex[state.allQuestionIndexes[_i2]].isSaved) {
	                        state.questionsByIndex[state.allQuestionIndexes[_i2]].isSaved = false;
	                    }
	                }
	                for (var _i3 in state.allCriteriaIndexes) {
	                    if (state.criteriaByIndex[state.allCriteriaIndexes[_i3]].isSaved) {
	                        state.criteriaByIndex[state.allCriteriaIndexes[_i3]].isSaved = false;
	                    }
	                }
	                var _questionsByIndex8 = (0, _assign2.default)({}, state.questionsByIndex);
	                _questionsByIndex8[_id7] = _question3;
	                return (0, _extends3.default)({}, state, { questionsByIndex: _questionsByIndex8, isBusy: _isBusy8 });
	            }
	        case _ActionTypes.QUESTION_DELETE:
	            {
	                var _isBusy9 = false;
	                var _criteriaId = action.criteriaId,
	                    questionId = action.questionId;

	                var _allQuestionIndexes4 = state.allQuestionIndexes.filter(function (id) {
	                    return id !== questionId;
	                });
	                var _questionsByIndex9 = (0, _assign2.default)({}, state.questionsByIndex);
	                delete _questionsByIndex9[questionId];
	                var _criteriaByIndex7 = (0, _assign2.default)({}, state.criteriaByIndex);
	                var _questions2 = state.criteriaByIndex[_criteriaId].questions.filter(function (qnId) {
	                    return qnId !== questionId;
	                });
	                _criteriaByIndex7[_criteriaId].questions = _questions2;
	                _criteriaByIndex7[_criteriaId] = (0, _assign2.default)({}, _criteriaByIndex7[_criteriaId], { criteriaId: _criteriaByIndex7[_criteriaId] });

	                return (0, _extends3.default)({}, state, {
	                    criteriaByIndex: _criteriaByIndex7,
	                    allQuestionIndexes: _allQuestionIndexes4,
	                    questionsByIndex: _questionsByIndex9,
	                    isBusy: _isBusy9 });
	            }
	        case _ActionTypes.IS_BUSY:
	            {
	                var status = action.status;

	                var _isBusy10 = status;
	                return (0, _extends3.default)({}, state, { isBusy: _isBusy10 });
	            }
	        default:
	            return state;
	    }
	}
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(getInitialData, 'getInitialData', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/reducers/evaluationTemplateCreator.js');

	    __REACT_HOT_LOADER__.register(evaluationTemplateCreator, 'evaluationTemplateCreator', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/reducers/evaluationTemplateCreator.js');
	})();

	;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(110);

	var _evaluationTemplateCreator = __webpack_require__(137);

	var _reducers = __webpack_require__(136);

	var _reducers2 = __webpack_require__(134);

	var _default = (0, _redux.combineReducers)({
	    modal: _reducers2.modal, notification: _reducers.notification, evaluationTemplateCreator: _evaluationTemplateCreator.evaluationTemplateCreator
	});

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(_default, 'default', '/var/www/plantminer-components/searcher-evaluation-template-creator/src/reducers/index.js');
	})();

	;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @description
	 * Read token value from cookie
	 * And return headers with the correct token
	 *
	 * @returns {{Authorization: string, Accept: string}}
	 */
	function configureHeaders() {
	    var COOKIE_TOKEN = 'pm_token';

	    var token = document.cookie.split(';').map(function (cookie) {
	        return cookie.trim().split('=');
	    }).reduce(function (a, b) {
	        a[b[0]] = b[1];
	        return a;
	    }, {})[COOKIE_TOKEN];

	    if (false) return getLocalHeaders();

	    return {
	        Authorization: 'Bearer ' + token,
	        Accept: 'application/vnd.pm.v1+json',
	        'Content-Type': 'application/vnd.pm.v1+json'
	    };
	}

	/**
	 * @description
	 * Configure token and header for local development
	 * This method is used to ease local development of plantminer components
	 * It allows to obtain an api token thus make other api request
	 *
	 * @returns {{Authorization: string, Accept: string}}
	 */
	function getLocalHeaders() {
	    var api_url = window.api_url || 'https://pit-460-api.pmstg.com';
	    var tokenRequest = new Request(api_url + '/authenticate', {
	        method: 'POST',
	        headers: {
	            'Accept': 'application/vnd.pm.v1+json',
	            'Content-Type': 'application/vnd.pm.v1+json'
	        },
	        body: '{"email":"troy.redden@bundaberg.qld.gov.au", "password": "password"}'
	    });

	    fetch(tokenRequest).then(function (response) {
	        return response.json();
	    }).then(function (response) {
	        localStorage.setItem('token', response.token);
	    });

	    return {
	        Authorization: 'Bearer ' + localStorage.getItem('token'),
	        Accept: 'application/vnd.pm.v1+json',
	        'Content-Type': 'application/vnd.pm.v1+json'
	    };
	}

	function configureHostname() {

	    if (window.api_url) {
	        // fetched from pm-web configuration
	        return window.api_url;
	    }

	    return 'https://pit-460-api.pmstg.com';
	}

	module.exports = {
	    configureHostname: configureHostname,
	    configureHeaders: configureHeaders
		};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(150), __esModule: true };

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(153), __esModule: true };

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(154), __esModule: true };

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(156), __esModule: true };

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(157), __esModule: true };

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(159), __esModule: true };

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(140);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	__webpack_require__(183);
	module.exports = __webpack_require__(1).Array.from;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(1);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(185);
	module.exports = __webpack_require__(1).Object.assign;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(186);
	var $Object = __webpack_require__(1).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(187);
	var $Object = __webpack_require__(1).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(188);
	module.exports = __webpack_require__(1).Object.getPrototypeOf;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(189);
	module.exports = __webpack_require__(1).Object.keys;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(190);
	module.exports = __webpack_require__(1).Object.setPrototypeOf;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(193);
	module.exports = __webpack_require__(1).Object.values;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(192);
	__webpack_require__(191);
	__webpack_require__(194);
	__webpack_require__(195);
	module.exports = __webpack_require__(1).Symbol;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	__webpack_require__(196);
	module.exports = __webpack_require__(60).f('iterator');


/***/ },
/* 161 */
/***/ function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ },
/* 162 */
/***/ function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(10);
	var toLength = __webpack_require__(91);
	var toAbsoluteIndex = __webpack_require__(181);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(47);
	var TAG = __webpack_require__(3)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(7);
	var createDesc = __webpack_require__(30);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(17);
	var gOPS = __webpack_require__(53);
	var pIE = __webpack_require__(29);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(6).document;
	module.exports = document && document.documentElement;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(28);
	var ITERATOR = __webpack_require__(3)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(47);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(14);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(52);
	var descriptor = __webpack_require__(30);
	var setToStringTag = __webpack_require__(54);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(16)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(3)('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};


/***/ },
/* 173 */
/***/ function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var META = __webpack_require__(35)('meta');
	var isObject = __webpack_require__(27);
	var has = __webpack_require__(9);
	var setDesc = __webpack_require__(7).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(15)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys = __webpack_require__(17);
	var gOPS = __webpack_require__(53);
	var pIE = __webpack_require__(29);
	var toObject = __webpack_require__(31);
	var IObject = __webpack_require__(83);
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(15)(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7);
	var anObject = __webpack_require__(14);
	var getKeys = __webpack_require__(17);

	module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(10);
	var gOPN = __webpack_require__(86).f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys = __webpack_require__(17);
	var toIObject = __webpack_require__(10);
	var isEnum = __webpack_require__(29).f;
	module.exports = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it);
	    var keys = getKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(27);
	var anObject = __webpack_require__(14);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(48)(Function.call, __webpack_require__(85).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(57);
	var defined = __webpack_require__(49);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(57);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(164);
	var ITERATOR = __webpack_require__(3)('iterator');
	var Iterators = __webpack_require__(28);
	module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx = __webpack_require__(48);
	var $export = __webpack_require__(4);
	var toObject = __webpack_require__(31);
	var call = __webpack_require__(170);
	var isArrayIter = __webpack_require__(168);
	var toLength = __webpack_require__(91);
	var createProperty = __webpack_require__(165);
	var getIterFn = __webpack_require__(182);

	$export($export.S + $export.F * !__webpack_require__(172)(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(162);
	var step = __webpack_require__(173);
	var Iterators = __webpack_require__(28);
	var toIObject = __webpack_require__(10);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(84)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(4);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(175) });


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(52) });


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(31);
	var $getPrototypeOf = __webpack_require__(87);

	__webpack_require__(89)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(31);
	var $keys = __webpack_require__(17);

	__webpack_require__(89)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(4);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(179).set });


/***/ },
/* 191 */
/***/ function(module, exports) {

	

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(6);
	var has = __webpack_require__(9);
	var DESCRIPTORS = __webpack_require__(8);
	var $export = __webpack_require__(4);
	var redefine = __webpack_require__(90);
	var META = __webpack_require__(174).KEY;
	var $fails = __webpack_require__(15);
	var shared = __webpack_require__(56);
	var setToStringTag = __webpack_require__(54);
	var uid = __webpack_require__(35);
	var wks = __webpack_require__(3);
	var wksExt = __webpack_require__(60);
	var wksDefine = __webpack_require__(59);
	var enumKeys = __webpack_require__(166);
	var isArray = __webpack_require__(169);
	var anObject = __webpack_require__(14);
	var toIObject = __webpack_require__(10);
	var toPrimitive = __webpack_require__(58);
	var createDesc = __webpack_require__(30);
	var _create = __webpack_require__(52);
	var gOPNExt = __webpack_require__(177);
	var $GOPD = __webpack_require__(85);
	var $DP = __webpack_require__(7);
	var $keys = __webpack_require__(17);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(86).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(29).f = $propertyIsEnumerable;
	  __webpack_require__(53).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(51)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(16)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(4);
	var $values = __webpack_require__(178)(false);

	$export($export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59)('asyncIterator');


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59)('observable');


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(184);
	var global = __webpack_require__(6);
	var hide = __webpack_require__(16);
	var Iterators = __webpack_require__(28);
	var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ },
/* 197 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 198 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (false) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(241),
	    hashDelete = __webpack_require__(242),
	    hashGet = __webpack_require__(243),
	    hashHas = __webpack_require__(244),
	    hashSet = __webpack_require__(245);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(255),
	    mapCacheDelete = __webpack_require__(256),
	    mapCacheGet = __webpack_require__(257),
	    mapCacheHas = __webpack_require__(258),
	    mapCacheSet = __webpack_require__(259);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(36),
	    stackClear = __webpack_require__(267),
	    stackDelete = __webpack_require__(268),
	    stackGet = __webpack_require__(269),
	    stackHas = __webpack_require__(270),
	    stackSet = __webpack_require__(271);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(18);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 204 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 205 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 206 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 207 */
/***/ function(module, exports) {

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}

	module.exports = asciiToArray;


/***/ },
/* 208 */
/***/ function(module, exports) {

	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

	/**
	 * Splits an ASCII `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function asciiWords(string) {
	  return string.match(reAsciiWord) || [];
	}

	module.exports = asciiWords;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(62),
	    eq = __webpack_require__(40);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(234);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(32),
	    isObjectLike = __webpack_require__(19);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(65),
	    isMasked = __webpack_require__(249),
	    isObject = __webpack_require__(11),
	    toSource = __webpack_require__(273);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(32),
	    isLength = __webpack_require__(106),
	    isObjectLike = __webpack_require__(19);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(64),
	    nativeKeys = __webpack_require__(260);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11),
	    isPrototype = __webpack_require__(64),
	    nativeKeysIn = __webpack_require__(261);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(202),
	    assignMergeValue = __webpack_require__(96),
	    baseFor = __webpack_require__(211),
	    baseMergeDeep = __webpack_require__(218),
	    isObject = __webpack_require__(11),
	    keysIn = __webpack_require__(108);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	module.exports = baseMerge;


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(96),
	    cloneBuffer = __webpack_require__(228),
	    cloneTypedArray = __webpack_require__(229),
	    copyArray = __webpack_require__(230),
	    initCloneObject = __webpack_require__(246),
	    isArguments = __webpack_require__(104),
	    isArray = __webpack_require__(41),
	    isArrayLikeObject = __webpack_require__(280),
	    isBuffer = __webpack_require__(105),
	    isFunction = __webpack_require__(65),
	    isObject = __webpack_require__(11),
	    isPlainObject = __webpack_require__(282),
	    isTypedArray = __webpack_require__(107),
	    toPlainObject = __webpack_require__(287);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;


/***/ },
/* 219 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = basePropertyOf;


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(103),
	    overRest = __webpack_require__(264),
	    setToString = __webpack_require__(265);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(278),
	    defineProperty = __webpack_require__(97),
	    identity = __webpack_require__(103);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 222 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 223 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(61),
	    arrayMap = __webpack_require__(205),
	    isArray = __webpack_require__(41),
	    isSymbol = __webpack_require__(283);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 225 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(222);

	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : baseSlice(array, start, end);
	}

	module.exports = castSlice;


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(203);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(18);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module)))

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(227);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 230 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(209),
	    baseAssignValue = __webpack_require__(62);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(18);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(220),
	    isIterateeCall = __webpack_require__(247);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 234 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var castSlice = __webpack_require__(226),
	    hasUnicode = __webpack_require__(100),
	    stringToArray = __webpack_require__(272),
	    toString = __webpack_require__(43);

	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new case function.
	 */
	function createCaseFirst(methodName) {
	  return function(string) {
	    string = toString(string);

	    var strSymbols = hasUnicode(string)
	      ? stringToArray(string)
	      : undefined;

	    var chr = strSymbols
	      ? strSymbols[0]
	      : string.charAt(0);

	    var trailing = strSymbols
	      ? castSlice(strSymbols, 1).join('')
	      : string.slice(1);

	    return chr[methodName]() + trailing;
	  };
	}

	module.exports = createCaseFirst;


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(206),
	    deburr = __webpack_require__(279),
	    words = __webpack_require__(289);

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]";

	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos, 'g');

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
	  };
	}

	module.exports = createCompounder;


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var basePropertyOf = __webpack_require__(219);

	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
	  // Latin-1 Supplement block.
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss',
	  // Latin Extended-A block.
	  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
	  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
	  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
	  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
	  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
	  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
	  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
	  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
	  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
	  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
	  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
	  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
	  '\u0134': 'J',  '\u0135': 'j',
	  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
	  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
	  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
	  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
	  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
	  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
	  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
	  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
	  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
	  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
	  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
	  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
	  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
	  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
	  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
	  '\u0174': 'W',  '\u0175': 'w',
	  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
	  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
	  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
	  '\u0132': 'IJ', '\u0133': 'ij',
	  '\u0152': 'Oe', '\u0153': 'oe',
	  '\u0149': "'n", '\u017f': 's'
	};

	/**
	 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	 * letters to basic Latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	var deburrLetter = basePropertyOf(deburredLetters);

	module.exports = deburrLetter;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(61);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 239 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 240 */
/***/ function(module, exports) {

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/**
	 * Checks if `string` contains a word composed of Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a word is found, else `false`.
	 */
	function hasUnicodeWord(string) {
	  return reHasUnicodeWord.test(string);
	}

	module.exports = hasUnicodeWord;


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(39);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 242 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(39);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(39);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(39);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(210),
	    getPrototype = __webpack_require__(99),
	    isPrototype = __webpack_require__(64);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(40),
	    isArrayLike = __webpack_require__(42),
	    isIndex = __webpack_require__(101),
	    isObject = __webpack_require__(11);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 248 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(232);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 250 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(37);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(37);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(37);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(37);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(200),
	    ListCache = __webpack_require__(36),
	    Map = __webpack_require__(94);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(38);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(38);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(38);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(38);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(102);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 261 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(98);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module)))

/***/ },
/* 263 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(204);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(221),
	    shortOut = __webpack_require__(266);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 266 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(36);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 268 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 269 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 270 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(36),
	    Map = __webpack_require__(94),
	    MapCache = __webpack_require__(201);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var asciiToArray = __webpack_require__(207),
	    hasUnicode = __webpack_require__(100),
	    unicodeToArray = __webpack_require__(274);

	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return hasUnicode(string)
	    ? unicodeToArray(string)
	    : asciiToArray(string);
	}

	module.exports = stringToArray;


/***/ },
/* 273 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 274 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}

	module.exports = unicodeToArray;


/***/ },
/* 275 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsPunctuationRange = '\\u2000-\\u206f',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]",
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
	    rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([
	  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
	  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
	  rsUpper + '+' + rsOptContrUpper,
	  rsOrdUpper,
	  rsOrdLower,
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');

	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	  return string.match(reUnicodeWord) || [];
	}

	module.exports = unicodeWords;


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var capitalize = __webpack_require__(277),
	    createCompounder = __webpack_require__(236);

	/**
	 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the camel cased string.
	 * @example
	 *
	 * _.camelCase('Foo Bar');
	 * // => 'fooBar'
	 *
	 * _.camelCase('--foo-bar--');
	 * // => 'fooBar'
	 *
	 * _.camelCase('__FOO_BAR__');
	 * // => 'fooBar'
	 */
	var camelCase = createCompounder(function(result, word, index) {
	  word = word.toLowerCase();
	  return result + (index ? capitalize(word) : word);
	});

	module.exports = camelCase;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(43),
	    upperFirst = __webpack_require__(288);

	/**
	 * Converts the first character of `string` to upper case and the remaining
	 * to lower case.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to capitalize.
	 * @returns {string} Returns the capitalized string.
	 * @example
	 *
	 * _.capitalize('FRED');
	 * // => 'Fred'
	 */
	function capitalize(string) {
	  return upperFirst(toString(string).toLowerCase());
	}

	module.exports = capitalize;


/***/ },
/* 278 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var deburrLetter = __webpack_require__(237),
	    toString = __webpack_require__(43);

	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboRange + ']';

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/**
	 * Deburrs `string` by converting
	 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	 * letters to basic Latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
	}

	module.exports = deburr;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(42),
	    isObjectLike = __webpack_require__(19);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 281 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	 * @example
	 *
	 * _.isNull(null);
	 * // => true
	 *
	 * _.isNull(void 0);
	 * // => false
	 */
	function isNull(value) {
	  return value === null;
	}

	module.exports = isNull;


/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(32),
	    getPrototype = __webpack_require__(99),
	    isObjectLike = __webpack_require__(19);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(32),
	    isObjectLike = __webpack_require__(19);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(95),
	    baseKeys = __webpack_require__(215),
	    isArrayLike = __webpack_require__(42);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(217),
	    createAssigner = __webpack_require__(233);

	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});

	module.exports = merge;


/***/ },
/* 286 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(231),
	    keysIn = __webpack_require__(108);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	var createCaseFirst = __webpack_require__(235);

	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */
	var upperFirst = createCaseFirst('toUpperCase');

	module.exports = upperFirst;


/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	var asciiWords = __webpack_require__(208),
	    hasUnicodeWord = __webpack_require__(240),
	    toString = __webpack_require__(43),
	    unicodeWords = __webpack_require__(275);

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
	  }
	  return string.match(pattern) || [];
	}

	module.exports = words;


/***/ },
/* 290 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(198);
	var invariant = __webpack_require__(199);
	var ReactPropTypesSecret = __webpack_require__(293);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (false) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(291)();
	}


/***/ },
/* 293 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(5), __webpack_require__(292));
		else if(typeof define === 'function' && define.amd)
			define(["react", "prop-types"], factory);
		else if(typeof exports === 'object')
			exports["Dropzone"] = factory(require("react"), require("prop-types"));
		else
			root["Dropzone"] = factory(root["react"], root["prop-types"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		var _react = __webpack_require__(2);
		
		var _react2 = _interopRequireDefault(_react);
		
		var _propTypes = __webpack_require__(3);
		
		var _propTypes2 = _interopRequireDefault(_propTypes);
		
		var _attrAccept = __webpack_require__(4);
		
		var _attrAccept2 = _interopRequireDefault(_attrAccept);
		
		var _getDataTransferItems = __webpack_require__(5);
		
		var _getDataTransferItems2 = _interopRequireDefault(_getDataTransferItems);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
		
		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint prefer-template: 0 */
		
		var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;
		
		function fileAccepted(file, accept) {
		  // Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
		  // that MIME type will always be accepted
		  return file.type === 'application/x-moz-file' || (0, _attrAccept2.default)(file, accept);
		}
		
		var Dropzone = function (_React$Component) {
		  _inherits(Dropzone, _React$Component);
		
		  _createClass(Dropzone, null, [{
		    key: 'onDocumentDragOver',
		    value: function onDocumentDragOver(evt) {
		      // allow the entire document to be a drag target
		      evt.preventDefault();
		    }
		  }]);
		
		  function Dropzone(props, context) {
		    _classCallCheck(this, Dropzone);
		
		    var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this, props, context));
		
		    _this.renderChildren = function (children, isDragActive, isDragReject) {
		      if (typeof children === 'function') {
		        return children(_extends({}, _this.state, { isDragActive: isDragActive, isDragReject: isDragReject }));
		      }
		      return children;
		    };
		
		    _this.onClick = _this.onClick.bind(_this);
		    _this.onDocumentDrop = _this.onDocumentDrop.bind(_this);
		    _this.onDragStart = _this.onDragStart.bind(_this);
		    _this.onDragEnter = _this.onDragEnter.bind(_this);
		    _this.onDragLeave = _this.onDragLeave.bind(_this);
		    _this.onDragOver = _this.onDragOver.bind(_this);
		    _this.onDrop = _this.onDrop.bind(_this);
		    _this.onFileDialogCancel = _this.onFileDialogCancel.bind(_this);
		    _this.setRef = _this.setRef.bind(_this);
		    _this.setRefs = _this.setRefs.bind(_this);
		    _this.onInputElementClick = _this.onInputElementClick.bind(_this);
		    _this.isFileDialogActive = false;
		    _this.state = {
		      draggedFiles: [],
		      acceptedFiles: [],
		      rejectedFiles: []
		    };
		    return _this;
		  }
		
		  _createClass(Dropzone, [{
		    key: 'componentDidMount',
		    value: function componentDidMount() {
		      var preventDropOnDocument = this.props.preventDropOnDocument;
		
		      this.dragTargets = [];
		
		      if (preventDropOnDocument) {
		        document.addEventListener('dragover', Dropzone.onDocumentDragOver, false);
		        document.addEventListener('drop', this.onDocumentDrop, false);
		      }
		      this.fileInputEl.addEventListener('click', this.onInputElementClick, false);
		      // Tried implementing addEventListener, but didn't work out
		      document.body.onfocus = this.onFileDialogCancel;
		    }
		  }, {
		    key: 'componentWillUnmount',
		    value: function componentWillUnmount() {
		      var preventDropOnDocument = this.props.preventDropOnDocument;
		
		      if (preventDropOnDocument) {
		        document.removeEventListener('dragover', Dropzone.onDocumentDragOver);
		        document.removeEventListener('drop', this.onDocumentDrop);
		      }
		      this.fileInputEl.removeEventListener('click', this.onInputElementClick, false);
		      // Can be replaced with removeEventListener, if addEventListener works
		      document.body.onfocus = null;
		    }
		  }, {
		    key: 'onDocumentDrop',
		    value: function onDocumentDrop(evt) {
		      if (this.node.contains(evt.target)) {
		        // if we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
		        return;
		      }
		      evt.preventDefault();
		      this.dragTargets = [];
		    }
		  }, {
		    key: 'onDragStart',
		    value: function onDragStart(evt) {
		      if (this.props.onDragStart) {
		        this.props.onDragStart.call(this, evt);
		      }
		    }
		  }, {
		    key: 'onDragEnter',
		    value: function onDragEnter(evt) {
		      evt.preventDefault();
		
		      // Count the dropzone and any children that are entered.
		      if (this.dragTargets.indexOf(evt.target) === -1) {
		        this.dragTargets.push(evt.target);
		      }
		
		      this.setState({ draggedFiles: (0, _getDataTransferItems2.default)(evt) });
		
		      if (this.props.onDragEnter) {
		        this.props.onDragEnter.call(this, evt);
		      }
		    }
		  }, {
		    key: 'onDragOver',
		    value: function onDragOver(evt) {
		      // eslint-disable-line class-methods-use-this
		      evt.preventDefault();
		      evt.stopPropagation();
		      try {
		        evt.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
		      } catch (err) {
		        // continue regardless of error
		      }
		
		      if (this.props.onDragOver) {
		        this.props.onDragOver.call(this, evt);
		      }
		      return false;
		    }
		  }, {
		    key: 'onDragLeave',
		    value: function onDragLeave(evt) {
		      var _this2 = this;
		
		      evt.preventDefault();
		
		      // Only deactivate once the dropzone and all children have been left.
		      this.dragTargets = this.dragTargets.filter(function (el) {
		        return el !== evt.target && _this2.node.contains(el);
		      });
		      if (this.dragTargets.length > 0) {
		        return;
		      }
		
		      // Clear dragging files state
		      this.setState({ draggedFiles: [] });
		
		      if (this.props.onDragLeave) {
		        this.props.onDragLeave.call(this, evt);
		      }
		    }
		  }, {
		    key: 'onDrop',
		    value: function onDrop(evt) {
		      var _this3 = this;
		
		      var _props = this.props,
		          onDrop = _props.onDrop,
		          onDropAccepted = _props.onDropAccepted,
		          onDropRejected = _props.onDropRejected,
		          multiple = _props.multiple,
		          disablePreview = _props.disablePreview,
		          accept = _props.accept;
		
		      var fileList = (0, _getDataTransferItems2.default)(evt);
		      var acceptedFiles = [];
		      var rejectedFiles = [];
		
		      // Stop default browser behavior
		      evt.preventDefault();
		
		      // Reset the counter along with the drag on a drop.
		      this.dragTargets = [];
		      this.isFileDialogActive = false;
		
		      fileList.forEach(function (file) {
		        if (!disablePreview) {
		          try {
		            file.preview = window.URL.createObjectURL(file); // eslint-disable-line no-param-reassign
		          } catch (err) {
		            if (process.env.NODE_ENV !== 'production') {
		              console.error('Failed to generate preview for file', file, err); // eslint-disable-line no-console
		            }
		          }
		        }
		
		        if (fileAccepted(file, accept) && _this3.fileMatchSize(file)) {
		          acceptedFiles.push(file);
		        } else {
		          rejectedFiles.push(file);
		        }
		      });
		
		      if (!multiple) {
		        // if not in multi mode add any extra accepted files to rejected.
		        // This will allow end users to easily ignore a multi file drop in "single" mode.
		        rejectedFiles.push.apply(rejectedFiles, _toConsumableArray(acceptedFiles.splice(1)));
		      }
		
		      if (onDrop) {
		        onDrop.call(this, acceptedFiles, rejectedFiles, evt);
		      }
		
		      if (rejectedFiles.length > 0 && onDropRejected) {
		        onDropRejected.call(this, rejectedFiles, evt);
		      }
		
		      if (acceptedFiles.length > 0 && onDropAccepted) {
		        onDropAccepted.call(this, acceptedFiles, evt);
		      }
		
		      // Clear files value
		      this.draggedFiles = null;
		
		      // Reset drag state
		      this.setState({
		        draggedFiles: [],
		        acceptedFiles: acceptedFiles,
		        rejectedFiles: rejectedFiles
		      });
		    }
		  }, {
		    key: 'onClick',
		    value: function onClick(evt) {
		      var _props2 = this.props,
		          onClick = _props2.onClick,
		          disableClick = _props2.disableClick;
		
		      if (!disableClick) {
		        evt.stopPropagation();
		
		        if (onClick) {
		          onClick.call(this, evt);
		        }
		
		        // in IE11/Edge the file-browser dialog is blocking, ensure this is behind setTimeout
		        // this is so react can handle state changes in the onClick prop above above
		        // see: https://github.com/okonet/react-dropzone/issues/450
		        setTimeout(this.open.bind(this), 0);
		      }
		    }
		  }, {
		    key: 'onInputElementClick',
		    value: function onInputElementClick(evt) {
		      evt.stopPropagation();
		      if (this.props.inputProps && this.props.inputProps.onClick) {
		        this.props.inputProps.onClick();
		      }
		    }
		  }, {
		    key: 'onFileDialogCancel',
		    value: function onFileDialogCancel() {
		      // timeout will not recognize context of this method
		      var onFileDialogCancel = this.props.onFileDialogCancel;
		      var fileInputEl = this.fileInputEl;
		      var isFileDialogActive = this.isFileDialogActive;
		      // execute the timeout only if the onFileDialogCancel is defined and FileDialog
		      // is opened in the browser
		
		      if (onFileDialogCancel && isFileDialogActive) {
		        setTimeout(function () {
		          // Returns an object as FileList
		          var FileList = fileInputEl.files;
		          if (!FileList.length) {
		            isFileDialogActive = false;
		            onFileDialogCancel();
		          }
		        }, 300);
		      }
		    }
		  }, {
		    key: 'setRef',
		    value: function setRef(ref) {
		      this.node = ref;
		    }
		  }, {
		    key: 'setRefs',
		    value: function setRefs(ref) {
		      this.fileInputEl = ref;
		    }
		  }, {
		    key: 'fileMatchSize',
		    value: function fileMatchSize(file) {
		      return file.size <= this.props.maxSize && file.size >= this.props.minSize;
		    }
		  }, {
		    key: 'allFilesAccepted',
		    value: function allFilesAccepted(files) {
		      var _this4 = this;
		
		      return files.every(function (file) {
		        return fileAccepted(file, _this4.props.accept);
		      });
		    }
		
		    /**
		     * Open system file upload dialog.
		     *
		     * @public
		     */
		
		  }, {
		    key: 'open',
		    value: function open() {
		      this.isFileDialogActive = true;
		      this.fileInputEl.value = null;
		      this.fileInputEl.click();
		    }
		  }, {
		    key: 'render',
		    value: function render() {
		      var _props3 = this.props,
		          accept = _props3.accept,
		          activeClassName = _props3.activeClassName,
		          inputProps = _props3.inputProps,
		          multiple = _props3.multiple,
		          name = _props3.name,
		          rejectClassName = _props3.rejectClassName,
		          children = _props3.children,
		          rest = _objectWithoutProperties(_props3, ['accept', 'activeClassName', 'inputProps', 'multiple', 'name', 'rejectClassName', 'children']);
		
		      var activeStyle = rest.activeStyle,
		          className = rest.className,
		          rejectStyle = rest.rejectStyle,
		          style = rest.style,
		          props = _objectWithoutProperties(rest, ['activeStyle', 'className', 'rejectStyle', 'style']);
		
		      var draggedFiles = this.state.draggedFiles;
		
		      var filesCount = draggedFiles.length;
		      var isMultipleAllowed = multiple || filesCount <= 1;
		      var isDragActive = filesCount > 0 && this.allFilesAccepted(draggedFiles);
		      var isDragReject = filesCount > 0 && (!isDragActive || !isMultipleAllowed);
		
		      className = className || '';
		
		      if (isDragActive && activeClassName) {
		        className += ' ' + activeClassName;
		      }
		      if (isDragReject && rejectClassName) {
		        className += ' ' + rejectClassName;
		      }
		
		      if (!className && !style && !activeStyle && !rejectStyle) {
		        style = {
		          width: 200,
		          height: 200,
		          borderWidth: 2,
		          borderColor: '#666',
		          borderStyle: 'dashed',
		          borderRadius: 5
		        };
		        activeStyle = {
		          borderStyle: 'solid',
		          borderColor: '#6c6',
		          backgroundColor: '#eee'
		        };
		        rejectStyle = {
		          borderStyle: 'solid',
		          borderColor: '#c66',
		          backgroundColor: '#eee'
		        };
		      }
		
		      var appliedStyle = void 0;
		      if (activeStyle && isDragActive) {
		        appliedStyle = _extends({}, style, activeStyle);
		      } else if (rejectStyle && isDragReject) {
		        appliedStyle = _extends({}, style, rejectStyle);
		      } else {
		        appliedStyle = _extends({}, style);
		      }
		
		      var inputAttributes = {
		        accept: accept,
		        type: 'file',
		        style: { display: 'none' },
		        multiple: supportMultiple && multiple,
		        ref: this.setRefs,
		        onChange: this.onDrop
		      };
		
		      if (name && name.length) {
		        inputAttributes.name = name;
		      }
		
		      // Remove custom properties before passing them to the wrapper div element
		      var customProps = ['acceptedFiles', 'preventDropOnDocument', 'disablePreview', 'disableClick', 'onDropAccepted', 'onDropRejected', 'onFileDialogCancel', 'maxSize', 'minSize'];
		      var divProps = _extends({}, props);
		      customProps.forEach(function (prop) {
		        return delete divProps[prop];
		      });
		
		      return _react2.default.createElement(
		        'div',
		        _extends({
		          className: className,
		          style: appliedStyle
		        }, divProps /* expand user provided props first so event handlers are never overridden */, {
		          onClick: this.onClick,
		          onDragStart: this.onDragStart,
		          onDragEnter: this.onDragEnter,
		          onDragOver: this.onDragOver,
		          onDragLeave: this.onDragLeave,
		          onDrop: this.onDrop,
		          ref: this.setRef
		        }),
		        this.renderChildren(children, isDragActive, isDragReject),
		        _react2.default.createElement('input', _extends({}, inputProps /* expand user provided inputProps first so inputAttributes override them */, inputAttributes))
		      );
		    }
		  }]);
		
		  return Dropzone;
		}(_react2.default.Component);
		
		Dropzone.propTypes = {
		  /**
		   * Allow specific types of files. See https://github.com/okonet/attr-accept for more information.
		   * Keep in mind that mime type determination is not reliable accross platforms. CSV files,
		   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
		   * Windows. In some cases there might not be a mime type set at all.
		   * See: https://github.com/okonet/react-dropzone/issues/276
		   */
		  accept: _propTypes2.default.string,
		
		  /**
		   * Contents of the dropzone
		   */
		  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
		
		  /**
		   * Disallow clicking on the dropzone container to open file dialog
		   */
		  disableClick: _propTypes2.default.bool,
		
		  /**
		   * Enable/disable preview generation
		   */
		  disablePreview: _propTypes2.default.bool,
		
		  /**
		   * If false, allow dropped items to take over the current browser window
		   */
		  preventDropOnDocument: _propTypes2.default.bool,
		
		  /**
		   * Pass additional attributes to the `<input type="file"/>` tag
		   */
		  inputProps: _propTypes2.default.object,
		
		  /**
		   * Allow dropping multiple files
		   */
		  multiple: _propTypes2.default.bool,
		
		  /**
		   * `name` attribute for the input tag
		   */
		  name: _propTypes2.default.string,
		
		  /**
		   * Maximum file size
		   */
		  maxSize: _propTypes2.default.number,
		
		  /**
		   * Minimum file size
		   */
		  minSize: _propTypes2.default.number,
		
		  /**
		   * className
		   */
		  className: _propTypes2.default.string,
		
		  /**
		   * className for accepted state
		   */
		  activeClassName: _propTypes2.default.string,
		
		  /**
		   * className for rejected state
		   */
		  rejectClassName: _propTypes2.default.string,
		
		  /**
		   * CSS styles to apply
		   */
		  style: _propTypes2.default.object,
		
		  /**
		   * CSS styles to apply when drop will be accepted
		   */
		  activeStyle: _propTypes2.default.object,
		
		  /**
		   * CSS styles to apply when drop will be rejected
		   */
		  rejectStyle: _propTypes2.default.object,
		
		  /**
		   * onClick callback
		   * @param {Event} event
		   */
		  onClick: _propTypes2.default.func,
		
		  /**
		   * onDrop callback
		   */
		  onDrop: _propTypes2.default.func,
		
		  /**
		   * onDropAccepted callback
		   */
		  onDropAccepted: _propTypes2.default.func,
		
		  /**
		   * onDropRejected callback
		   */
		  onDropRejected: _propTypes2.default.func,
		
		  /**
		   * onDragStart callback
		   */
		  onDragStart: _propTypes2.default.func,
		
		  /**
		   * onDragEnter callback
		   */
		  onDragEnter: _propTypes2.default.func,
		
		  /**
		   * onDragOver callback
		   */
		  onDragOver: _propTypes2.default.func,
		
		  /**
		   * onDragLeave callback
		   */
		  onDragLeave: _propTypes2.default.func,
		
		  /**
		   * Provide a callback on clicking the cancel button of the file dialog
		   */
		  onFileDialogCancel: _propTypes2.default.func
		};
		
		Dropzone.defaultProps = {
		  preventDropOnDocument: true,
		  disablePreview: false,
		  disableClick: false,
		  multiple: true,
		  maxSize: Infinity,
		  minSize: 0
		};
		
		exports.default = Dropzone;
		module.exports = exports['default'];
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ }),
	/* 1 */
	/***/ (function(module, exports) {

		// shim for using process in browser
		var process = module.exports = {};
		
		// cached from whatever global is present so that test runners that stub it
		// don't break things.  But we need to wrap it in a try catch in case it is
		// wrapped in strict mode code which doesn't define any globals.  It's inside a
		// function because try/catches deoptimize in certain engines.
		
		var cachedSetTimeout;
		var cachedClearTimeout;
		
		function defaultSetTimout() {
		    throw new Error('setTimeout has not been defined');
		}
		function defaultClearTimeout () {
		    throw new Error('clearTimeout has not been defined');
		}
		(function () {
		    try {
		        if (typeof setTimeout === 'function') {
		            cachedSetTimeout = setTimeout;
		        } else {
		            cachedSetTimeout = defaultSetTimout;
		        }
		    } catch (e) {
		        cachedSetTimeout = defaultSetTimout;
		    }
		    try {
		        if (typeof clearTimeout === 'function') {
		            cachedClearTimeout = clearTimeout;
		        } else {
		            cachedClearTimeout = defaultClearTimeout;
		        }
		    } catch (e) {
		        cachedClearTimeout = defaultClearTimeout;
		    }
		} ())
		function runTimeout(fun) {
		    if (cachedSetTimeout === setTimeout) {
		        //normal enviroments in sane situations
		        return setTimeout(fun, 0);
		    }
		    // if setTimeout wasn't available but was latter defined
		    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
		        cachedSetTimeout = setTimeout;
		        return setTimeout(fun, 0);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedSetTimeout(fun, 0);
		    } catch(e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
		            return cachedSetTimeout.call(null, fun, 0);
		        } catch(e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
		            return cachedSetTimeout.call(this, fun, 0);
		        }
		    }
		
		
		}
		function runClearTimeout(marker) {
		    if (cachedClearTimeout === clearTimeout) {
		        //normal enviroments in sane situations
		        return clearTimeout(marker);
		    }
		    // if clearTimeout wasn't available but was latter defined
		    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
		        cachedClearTimeout = clearTimeout;
		        return clearTimeout(marker);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedClearTimeout(marker);
		    } catch (e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
		            return cachedClearTimeout.call(null, marker);
		        } catch (e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
		            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
		            return cachedClearTimeout.call(this, marker);
		        }
		    }
		
		
		
		}
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;
		
		function cleanUpNextTick() {
		    if (!draining || !currentQueue) {
		        return;
		    }
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}
		
		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = runTimeout(cleanUpNextTick);
		    draining = true;
		
		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    runClearTimeout(timeout);
		}
		
		process.nextTick = function (fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        runTimeout(drainQueue);
		    }
		};
		
		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};
		
		function noop() {}
		
		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;
		process.prependListener = noop;
		process.prependOnceListener = noop;
		
		process.listeners = function (name) { return [] }
		
		process.binding = function (name) {
		    throw new Error('process.binding is not supported');
		};
		
		process.cwd = function () { return '/' };
		process.chdir = function (dir) {
		    throw new Error('process.chdir is not supported');
		};
		process.umask = function() { return 0; };


	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

	/***/ }),
	/* 3 */
	/***/ (function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

	/***/ }),
	/* 4 */
	/***/ (function(module, exports) {

		module.exports=function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){"use strict";n.__esModule=!0,r(8),r(9),n["default"]=function(t,n){if(t&&n){var r=function(){var r=Array.isArray(n)?n:n.split(","),e=t.name||"",o=t.type||"",i=o.replace(/\/.*$/,"");return{v:r.some(function(t){var n=t.trim();return"."===n.charAt(0)?e.toLowerCase().endsWith(n.toLowerCase()):/\/\*$/.test(n)?i===n.replace(/\/.*$/,""):o===n})}}();if("object"==typeof r)return r.v}return!0},t.exports=n["default"]},function(t,n){var r=t.exports={version:"1.2.2"};"number"==typeof __e&&(__e=r)},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(2),o=r(1),i=r(4),u=r(19),c="prototype",f=function(t,n){return function(){return t.apply(n,arguments)}},s=function(t,n,r){var a,p,l,y,d=t&s.G,h=t&s.P,v=d?e:t&s.S?e[n]||(e[n]={}):(e[n]||{})[c],x=d?o:o[n]||(o[n]={});d&&(r=n);for(a in r)p=!(t&s.F)&&v&&a in v,l=(p?v:r)[a],y=t&s.B&&p?f(l,e):h&&"function"==typeof l?f(Function.call,l):l,v&&!p&&u(v,a,l),x[a]!=l&&i(x,a,y),h&&((x[c]||(x[c]={}))[a]=l)};e.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},function(t,n,r){var e=r(5),o=r(18);t.exports=r(22)?function(t,n,r){return e.setDesc(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){var e=r(20)("wks"),o=r(2).Symbol;t.exports=function(t){return e[t]||(e[t]=o&&o[t]||(o||r(6))("Symbol."+t))}},function(t,n,r){r(26),t.exports=r(1).Array.some},function(t,n,r){r(25),t.exports=r(1).String.endsWith},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(10);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r(7)("match")]=!1,!"/./"[t](n)}catch(o){}}return!0}},function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(16),o=r(11),i=r(7)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(2),o=r(4),i=r(6)("src"),u="toString",c=Function[u],f=(""+c).split(u);r(1).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,u){"function"==typeof r&&(o(r,i,t[n]?""+t[n]:f.join(String(n))),"name"in r||(r.name=n)),t===e?t[n]=r:(u||delete t[n],o(t,n,r))})(Function.prototype,u,function(){return"function"==typeof this&&this[i]||c.call(this)})},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e=r(17),o=r(13);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))}},function(t,n,r){t.exports=!r(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(23),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){"use strict";var e=r(3),o=r(24),i=r(21),u="endsWith",c=""[u];e(e.P+e.F*r(14)(u),"String",{endsWith:function(t){var n=i(this,t,u),r=arguments,e=r.length>1?r[1]:void 0,f=o(n.length),s=void 0===e?f:Math.min(o(e),f),a=String(t);return c?c.call(n,a,s):n.slice(s-a.length,s)===a}})},function(t,n,r){var e=r(5),o=r(3),i=r(1).Array||Array,u={},c=function(t,n){e.each.call(t.split(","),function(t){void 0==n&&t in i?u[t]=i[t]:t in[]&&(u[t]=r(12)(Function.call,[][t],n))})};c("pop,reverse,shift,keys,values,entries",1),c("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),c("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),o(o.S,"Array",u)}]);

	/***/ }),
	/* 5 */
	/***/ (function(module, exports) {

		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = getDataTransferFiles;
		function getDataTransferFiles(event) {
		  var dataTransferItemsList = [];
		  if (event.dataTransfer) {
		    var dt = event.dataTransfer;
		    if (dt.files && dt.files.length) {
		      dataTransferItemsList = dt.files;
		    } else if (dt.items && dt.items.length) {
		      // During the drag even the dataTransfer.files is null
		      // but Chrome implements some drag store, which is accesible via dataTransfer.items
		      dataTransferItemsList = dt.items;
		    }
		  } else if (event.target && event.target.files) {
		    dataTransferItemsList = event.target.files;
		  }
		  // Convert from DataTransferItemsList to the native Array
		  return Array.prototype.slice.call(dataTransferItemsList);
		}
		module.exports = exports["default"];

	/***/ })
	/******/ ])
	});
	;
	//# sourceMappingURL=index.js.map

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(12))(1);

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(12))(410);

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(12))(543);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map