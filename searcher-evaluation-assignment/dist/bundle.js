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

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(112);

	var _redux = __webpack_require__(3);

	var _reactRedux = __webpack_require__(6);

	var _reduxThunk = __webpack_require__(291);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _index = __webpack_require__(142);

	var _index2 = _interopRequireDefault(_index);

	var _api = __webpack_require__(143);

	var _api2 = _interopRequireDefault(_api);

	var _api3 = __webpack_require__(42);

	var _api4 = _interopRequireDefault(_api3);

	__webpack_require__(189);

	var _axios = __webpack_require__(40);

	var _axios2 = _interopRequireDefault(_axios);

	var _EvaluationAssignment = __webpack_require__(130);

	var _EvaluationAssignment2 = _interopRequireDefault(_EvaluationAssignment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	!window._babelPolyfill && __webpack_require__(290); // prevent polyfill from importing twice

	// Add redux dev tools unless we have a production build
	var enhance =  false ? (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, _api4.default), window.devToolsExtension && window.devToolsExtension()) : (0, _redux.applyMiddleware)(_reduxThunk2.default, _api4.default);

	// Configure store with thunk middleware to allow async requests
	var store = (0, _redux.createStore)(_index2.default, enhance);

	var hostname = _api2.default.configureHostname();
	var headers = _api2.default.configureHeaders();

	_axios2.default.defaults.baseURL = hostname;
	_axios2.default.defaults.headers.common = headers;

	(0, _reactDom.render)(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_EvaluationAssignment2.default, null)
	), document.querySelector('[data-component="searcher-evaluation-assignment"]'));
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(enhance, 'enhance', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/index.js');

	    __REACT_HOT_LOADER__.register(store, 'store', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/index.js');

	    __REACT_HOT_LOADER__.register(hostname, 'hostname', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/index.js');

	    __REACT_HOT_LOADER__.register(headers, 'headers', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/index.js');
	})();

	;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(16))(327);

/***/ },
/* 2 */
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
	  module.exports = __webpack_require__(284)();
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(16))(358);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(70);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(74);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(16))(381);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.updateSelectedAssigneeChairman = exports.updateSelectedAssignees = exports.updateChangeSuppliers = exports.updateChangeEngagements = exports.updateChangeMatchedItems = exports.updateChangeMatchedSuppliers = exports.getCurrentUserFromStore = exports.fetchMatchedSuppliers = exports.updateChangeEvaluationType = exports.evaluationTemplateUpdateChange = exports.createAssignment = undefined;

	var _defineProperty2 = __webpack_require__(43);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _ActionTypes = __webpack_require__(72);

	var actionTypes = _interopRequireWildcard(_ActionTypes);

	var _axios = __webpack_require__(40);

	var _axios2 = _interopRequireDefault(_axios);

	var _apiActions = __webpack_require__(71);

	var apiActions = _interopRequireWildcard(_apiActions);

	var _selectFromStore = __webpack_require__(8);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createAssignment = exports.createAssignment = function createAssignment() {
	    return function (dispatch, getState) {
	        var _getState$evaluationA = getState().evaluationAssignment,
	            selectedTemplateId = _getState$evaluationA.selectedTemplateId,
	            selectedAssignees = _getState$evaluationA.selectedAssignees,
	            selectedAssigneeChairman = _getState$evaluationA.selectedAssigneeChairman,
	            selectedAssignmentEntityInstanceId = _getState$evaluationA.selectedAssignmentEntityInstanceId,
	            evaluationTypeSelected = _getState$evaluationA.evaluationTypeSelected,
	            currentUser = _getState$evaluationA.currentUser;


	        dispatch({
	            type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START
	        });

	        // formatting assignee users to match up with service requirement
	        var assigneeUserData = currentUser.role === 'Standard User' ? { type: 'users', 'id': currentUser.userId } : selectedAssignees.map(function (item) {
	            var userId = item.userId;

	            return {
	                'type': 'users',
	                'id': userId
	            };
	        });

	        var chairStaffData = currentUser.role === 'Standard User' || selectedAssigneeChairman === null ? null : {
	            'type': 'staff',
	            'id': selectedAssigneeChairman.id
	        };

	        var data = (0, _defineProperty3.default)({}, 'data', {
	            'type': 'evaluation-template-assignments',
	            'id': selectedTemplateId, // TO DO:
	            'attributes': {
	                'assignment_entity_instance_id': selectedAssignmentEntityInstanceId
	            },
	            'relationships': {
	                'template': {
	                    'data': {
	                        'type': 'evaluation-templates',
	                        'id': selectedTemplateId
	                    }
	                },
	                'chairStaff': {
	                    'data': chairStaffData
	                },
	                'assigneeUser': {
	                    'data': assigneeUserData
	                },
	                'assignmentType': {
	                    'data': {
	                        'type': 'evaluation-template-assignment-types',
	                        'id': evaluationTypeSelected
	                    }
	                }
	            }
	        });

	        _axios2.default.post('/evaluation-template-assignments', data).then(function (response) {
	            dispatch({
	                type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS,
	                response: response
	            });
	            // back to assignments list page
	            window.location.href = '/searcher/evaluation_assignments/list';
	        }).catch(function (error) {
	            throw error;
	        });
	    };
	};

	var evaluationTemplateUpdateChange = exports.evaluationTemplateUpdateChange = function evaluationTemplateUpdateChange(templateId) {
	    return function (dispatch) {
	        dispatch(apiActions.fetchEvaluationTypes());

	        dispatch({
	            type: actionTypes.ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE,
	            templateId: templateId
	        });
	    };
	};

	var updateChangeEvaluationType = exports.updateChangeEvaluationType = function updateChangeEvaluationType(evaluationType) {
	    return function (dispatch) {
	        dispatch({
	            type: actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE,
	            evaluationType: evaluationType
	        });

	        if (evaluationType === '4') {
	            dispatch(apiActions.fetchEngagements());
	            return;
	        }

	        if (evaluationType === '3') {
	            dispatch(apiActions.fetchPreferredSuppliers());
	            return;
	        }

	        dispatch(apiActions.fetchRequestsForQuotations());
	    };
	};

	var fetchMatchedSuppliers = exports.fetchMatchedSuppliers = function fetchMatchedSuppliers(rfqTypeId) {
	    return function (dispatch) {
	        dispatch({
	            type: actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_RFQ,
	            rfqTypeId: rfqTypeId
	        });

	        dispatch(apiActions.fetchRfqMatchedSuppliers(rfqTypeId));
	    };
	};

	var getCurrentUserFromStore = exports.getCurrentUserFromStore = function getCurrentUserFromStore(state) {
	    var users = (0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/user', 'users');
	    var currentUser = {
	        firstName: '' + users[0].staff.firstName,
	        lastName: '' + users[0].staff.lastName,
	        userId: '' + users[0].staff.userId,
	        role: '' + users[0].staff.pitRoles[0].title
	    };

	    return {
	        type: actionTypes.ASSIGNMENT_CREATION_SET_UPDATE_CURRENT_USER,
	        currentUser: currentUser
	    };
	};

	var updateChangeMatchedSuppliers = exports.updateChangeMatchedSuppliers = function updateChangeMatchedSuppliers(matchedSupplierId) {
	    return function (dispatch, getState) {
	        var _getState$evaluationA2 = getState().evaluationAssignment,
	            rfqTypeSelectedId = _getState$evaluationA2.rfqTypeSelectedId,
	            evaluationTypeSelected = _getState$evaluationA2.evaluationTypeSelected;

	        dispatch({
	            type: actionTypes.ASSIGNMENT_CREATION_UPDATE_MATCHED_SUPPLIER_ID,
	            matchedSupplierId: matchedSupplierId
	        });

	        if (evaluationTypeSelected === '1') {
	            dispatch({
	                type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
	                selectedAssignmentEntityInstanceId: matchedSupplierId
	            });
	            dispatch(getCurrentUserFromStore(getState()));
	            return;
	        }

	        dispatch(apiActions.fetchMatchedItems(rfqTypeSelectedId, matchedSupplierId));
	    };
	};

	var updateChangeMatchedItems = exports.updateChangeMatchedItems = function updateChangeMatchedItems(matchedItemId) {
	    return function (dispatch, getState) {
	        dispatch({
	            type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
	            selectedAssignmentEntityInstanceId: matchedItemId
	        });
	        dispatch(getCurrentUserFromStore(getState()));
	    };
	};

	var updateChangeEngagements = exports.updateChangeEngagements = function updateChangeEngagements(engagementId) {
	    return function (dispatch, getState) {
	        dispatch({
	            type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
	            selectedAssignmentEntityInstanceId: engagementId
	        });
	        dispatch(getCurrentUserFromStore(getState()));
	    };
	};

	var updateChangeSuppliers = exports.updateChangeSuppliers = function updateChangeSuppliers(supplierId) {
	    return function (dispatch, getState) {
	        dispatch({
	            type: actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID,
	            selectedAssignmentEntityInstanceId: supplierId
	        });
	        dispatch(getCurrentUserFromStore(getState()));
	    };
	};

	var updateSelectedAssignees = exports.updateSelectedAssignees = function updateSelectedAssignees(assignees) {
	    return {
	        type: actionTypes.ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE,
	        assignees: assignees
	    };
	};

	var updateSelectedAssigneeChairman = exports.updateSelectedAssigneeChairman = function updateSelectedAssigneeChairman(assigneeChairman) {
	    return {
	        type: actionTypes.ASSIGNMENT_CREATION_ASSIGNEES_CHAIRMAN_CHANGE_UPDATE,
	        assigneeChairman: assigneeChairman
	    };
	};
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(createAssignment, 'createAssignment', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(evaluationTemplateUpdateChange, 'evaluationTemplateUpdateChange', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(updateChangeEvaluationType, 'updateChangeEvaluationType', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(fetchMatchedSuppliers, 'fetchMatchedSuppliers', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(getCurrentUserFromStore, 'getCurrentUserFromStore', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(updateChangeMatchedSuppliers, 'updateChangeMatchedSuppliers', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(updateChangeMatchedItems, 'updateChangeMatchedItems', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(updateChangeEngagements, 'updateChangeEngagements', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(updateChangeSuppliers, 'updateChangeSuppliers', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(updateSelectedAssignees, 'updateSelectedAssignees', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');

	    __REACT_HOT_LOADER__.register(updateSelectedAssigneeChairman, 'updateSelectedAssigneeChairman', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/evaluationAssignmentsAction.js');
	})();

	;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.selectFromStore = undefined;

	var _reduxObject = __webpack_require__(289);

	var _reduxObject2 = _interopRequireDefault(_reduxObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var selectFromStore = exports.selectFromStore = function selectFromStore(state, metaEndpoint, type) {

	    if (typeof state === 'undefined' || !state.meta[metaEndpoint]) {
	        return [];
	    }

	    return (state.meta[metaEndpoint].data || []).map(function (object) {
	        return (0, _reduxObject2.default)(state, type, object.id);
	    });
	};
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(selectFromStore, 'selectFromStore', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/utils/selectFromStore.js');
	})();

	;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ },
/* 10 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10);
	var core = __webpack_require__(9);
	var ctx = __webpack_require__(79);
	var hide = __webpack_require__(18);
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
/* 13 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(24);
	var IE8_DOM_DEFINE = __webpack_require__(81);
	var toPrimitive = __webpack_require__(55);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 15 */
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
/* 16 */
/***/ function(module, exports) {

	module.exports = vendor_lib;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(14);
	var createDesc = __webpack_require__(29);
	module.exports = __webpack_require__(11) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(82);
	var defined = __webpack_require__(44);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(52)('wks');
	var uid = __webpack_require__(30);
	var Symbol = __webpack_require__(10).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(93);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(58),
	    getRawTag = __webpack_require__(231),
	    objectToString = __webpack_require__(256);

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(87);
	var enumBugKeys = __webpack_require__(45);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(243),
	    listCacheDelete = __webpack_require__(244),
	    listCacheGet = __webpack_require__(245),
	    listCacheHas = __webpack_require__(246),
	    listCacheSet = __webpack_require__(247);

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(35);

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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(241);

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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 35 */
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
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(62),
	    isLength = __webpack_require__(101);

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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(217);

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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(112);

	var _reactInputAutosize = __webpack_require__(286);

	var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

	var _classnames = __webpack_require__(23);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _defaultArrowRenderer = __webpack_require__(109);

	var _defaultArrowRenderer2 = _interopRequireDefault(_defaultArrowRenderer);

	var _defaultFilterOptions = __webpack_require__(63);

	var _defaultFilterOptions2 = _interopRequireDefault(_defaultFilterOptions);

	var _defaultMenuRenderer = __webpack_require__(64);

	var _defaultMenuRenderer2 = _interopRequireDefault(_defaultMenuRenderer);

	var _defaultClearRenderer = __webpack_require__(110);

	var _defaultClearRenderer2 = _interopRequireDefault(_defaultClearRenderer);

	var _Option = __webpack_require__(106);

	var _Option2 = _interopRequireDefault(_Option);

	var _Value = __webpack_require__(107);

	var _Value2 = _interopRequireDefault(_Value);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Copyright (c) 2017 Jed Watson.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Licensed under the MIT License (MIT), see
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 http://jedwatson.github.io/react-select
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


	var stringifyValue = function stringifyValue(value) {
		return typeof value === 'string' ? value : value !== null && JSON.stringify(value) || '';
	};

	var stringOrNode = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]);
	var stringOrNumber = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]);

	var instanceId = 1;

	var Select = function (_React$Component) {
		_inherits(Select, _React$Component);

		function Select(props) {
			_classCallCheck(this, Select);

			var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

			['clearValue', 'focusOption', 'handleInputBlur', 'handleInputChange', 'handleInputFocus', 'handleInputValueChange', 'handleKeyDown', 'handleMenuScroll', 'handleMouseDown', 'handleMouseDownOnArrow', 'handleMouseDownOnMenu', 'handleRequired', 'handleTouchOutside', 'handleTouchMove', 'handleTouchStart', 'handleTouchEnd', 'handleTouchEndClearValue', 'handleValueClick', 'getOptionLabel', 'onOptionRef', 'removeValue', 'selectValue'].forEach(function (fn) {
				return _this[fn] = _this[fn].bind(_this);
			});

			_this.state = {
				inputValue: '',
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false,
				required: false
			};
			return _this;
		}

		_createClass(Select, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
				var valueArray = this.getValueArray(this.props.value);

				if (this.props.required) {
					this.setState({
						required: this.handleRequired(valueArray[0], this.props.multi)
					});
				}
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (typeof this.props.autofocus !== 'undefined' && typeof console !== 'undefined') {
					console.warn('Warning: The autofocus prop has changed to autoFocus, support will be removed after react-select@1.0');
				}
				if (this.props.autoFocus || this.props.autofocus) {
					this.focus();
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var valueArray = this.getValueArray(nextProps.value, nextProps);

				if (nextProps.required) {
					this.setState({
						required: this.handleRequired(valueArray[0], nextProps.multi)
					});
				} else if (this.props.required) {
					// Used to be required but it's not any more
					this.setState({ required: false });
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps, prevState) {
				// focus to the selected option
				if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
					var focusedOptionNode = (0, _reactDom.findDOMNode)(this.focused);
					var menuNode = (0, _reactDom.findDOMNode)(this.menu);

					var scrollTop = menuNode.scrollTop;
					var scrollBottom = scrollTop + menuNode.offsetHeight;
					var optionTop = focusedOptionNode.offsetTop;
					var optionBottom = optionTop + focusedOptionNode.offsetHeight;

					if (scrollTop > optionTop || scrollBottom < optionBottom) {
						menuNode.scrollTop = focusedOptionNode.offsetTop;
					}

					// We still set hasScrolledToOption to true even if we didn't
					// actually need to scroll, as we've still confirmed that the
					// option is in view.
					this.hasScrolledToOption = true;
				} else if (!this.state.isOpen) {
					this.hasScrolledToOption = false;
				}

				if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
					this._scrollToFocusedOptionOnUpdate = false;
					var focusedDOM = (0, _reactDom.findDOMNode)(this.focused);
					var menuDOM = (0, _reactDom.findDOMNode)(this.menu);
					var focusedRect = focusedDOM.getBoundingClientRect();
					var menuRect = menuDOM.getBoundingClientRect();
					if (focusedRect.bottom > menuRect.bottom) {
						menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
					} else if (focusedRect.top < menuRect.top) {
						menuDOM.scrollTop = focusedDOM.offsetTop;
					}
				}
				if (this.props.scrollMenuIntoView && this.menuContainer) {
					var menuContainerRect = this.menuContainer.getBoundingClientRect();
					if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
						window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
					}
				}
				if (prevProps.disabled !== this.props.disabled) {
					this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
					this.closeMenu();
				}
				if (prevState.isOpen !== this.state.isOpen) {
					this.toggleTouchOutsideEvent(this.state.isOpen);
					var handler = this.state.isOpen ? this.props.onOpen : this.props.onClose;
					handler && handler();
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.toggleTouchOutsideEvent(false);
			}
		}, {
			key: 'toggleTouchOutsideEvent',
			value: function toggleTouchOutsideEvent(enabled) {
				if (enabled) {
					if (!document.addEventListener && document.attachEvent) {
						document.attachEvent('ontouchstart', this.handleTouchOutside);
					} else {
						document.addEventListener('touchstart', this.handleTouchOutside);
					}
				} else {
					if (!document.removeEventListener && document.detachEvent) {
						document.detachEvent('ontouchstart', this.handleTouchOutside);
					} else {
						document.removeEventListener('touchstart', this.handleTouchOutside);
					}
				}
			}
		}, {
			key: 'handleTouchOutside',
			value: function handleTouchOutside(event) {
				// handle touch outside on ios to dismiss menu
				if (this.wrapper && !this.wrapper.contains(event.target)) {
					this.closeMenu();
				}
			}
		}, {
			key: 'focus',
			value: function focus() {
				if (!this.input) return;
				this.input.focus();
			}
		}, {
			key: 'blurInput',
			value: function blurInput() {
				if (!this.input) return;
				this.input.blur();
			}
		}, {
			key: 'handleTouchMove',
			value: function handleTouchMove(event) {
				// Set a flag that the view is being dragged
				this.dragging = true;
			}
		}, {
			key: 'handleTouchStart',
			value: function handleTouchStart(event) {
				// Set a flag that the view is not being dragged
				this.dragging = false;
			}
		}, {
			key: 'handleTouchEnd',
			value: function handleTouchEnd(event) {
				// Check if the view is being dragged, In this case
				// we don't want to fire the click event (because the user only wants to scroll)
				if (this.dragging) return;

				// Fire the mouse events
				this.handleMouseDown(event);
			}
		}, {
			key: 'handleTouchEndClearValue',
			value: function handleTouchEndClearValue(event) {
				// Check if the view is being dragged, In this case
				// we don't want to fire the click event (because the user only wants to scroll)
				if (this.dragging) return;

				// Clear the value
				this.clearValue(event);
			}
		}, {
			key: 'handleMouseDown',
			value: function handleMouseDown(event) {
				// if the event was triggered by a mousedown and not the primary
				// button, or if the component is disabled, ignore it.
				if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
					return;
				}

				if (event.target.tagName === 'INPUT') {
					if (!this.state.isFocused) {
						this._openAfterFocus = this.props.openOnClick;
						this.focus();
					} else if (!this.state.isOpen) {
						this.setState({
							isOpen: true,
							isPseudoFocused: false
						});
					}
					return;
				}

				// prevent default event handlers
				event.preventDefault();

				// for the non-searchable select, toggle the menu
				if (!this.props.searchable) {
					// TODO: This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
					this.focus();
					return this.setState({
						isOpen: !this.state.isOpen
					});
				}

				if (this.state.isFocused) {
					// On iOS, we can get into a state where we think the input is focused but it isn't really,
					// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
					// Call focus() again here to be safe.
					this.focus();

					var input = this.input;
					if (typeof input.getInput === 'function') {
						// Get the actual DOM input if the ref is an <AutosizeInput /> component
						input = input.getInput();
					}

					// clears the value so that the cursor will be at the end of input when the component re-renders
					input.value = '';

					// if the input is focused, ensure the menu is open
					this.setState({
						isOpen: true,
						isPseudoFocused: false
					});
				} else {
					// otherwise, focus the input and open the menu
					this._openAfterFocus = this.props.openOnClick;
					this.focus();
				}
			}
		}, {
			key: 'handleMouseDownOnArrow',
			value: function handleMouseDownOnArrow(event) {
				// if the event was triggered by a mousedown and not the primary
				// button, or if the component is disabled, ignore it.
				if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
					return;
				}
				// If the menu isn't open, let the event bubble to the main handleMouseDown
				if (!this.state.isOpen) {
					this.setState({
						isOpen: true
					});
				}
				// prevent default event handlers
				event.stopPropagation();
				event.preventDefault();
				// close the menu
				if (this.state.isOpen) {
					this.closeMenu();
				}
			}
		}, {
			key: 'handleMouseDownOnMenu',
			value: function handleMouseDownOnMenu(event) {
				// if the event was triggered by a mousedown and not the primary
				// button, or if the component is disabled, ignore it.
				if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
					return;
				}
				event.stopPropagation();
				event.preventDefault();

				this._openAfterFocus = true;
				this.focus();
			}
		}, {
			key: 'closeMenu',
			value: function closeMenu() {
				if (this.props.onCloseResetsInput) {
					this.setState({
						isOpen: false,
						isPseudoFocused: this.state.isFocused && !this.props.multi,
						inputValue: this.handleInputValueChange('')
					});
				} else {
					this.setState({
						isOpen: false,
						isPseudoFocused: this.state.isFocused && !this.props.multi
					});
				}
				this.hasScrolledToOption = false;
			}
		}, {
			key: 'handleInputFocus',
			value: function handleInputFocus(event) {
				if (this.props.disabled) return;
				var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
				if (this.props.onFocus) {
					this.props.onFocus(event);
				}
				this.setState({
					isFocused: true,
					isOpen: isOpen
				});
				this._openAfterFocus = false;
			}
		}, {
			key: 'handleInputBlur',
			value: function handleInputBlur(event) {
				// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
				if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
					this.focus();
					return;
				}

				if (this.props.onBlur) {
					this.props.onBlur(event);
				}
				var onBlurredState = {
					isFocused: false,
					isOpen: false,
					isPseudoFocused: false
				};
				if (this.props.onBlurResetsInput) {
					onBlurredState.inputValue = this.handleInputValueChange('');
				}
				this.setState(onBlurredState);
			}
		}, {
			key: 'handleInputChange',
			value: function handleInputChange(event) {
				var newInputValue = event.target.value;

				if (this.state.inputValue !== event.target.value) {
					newInputValue = this.handleInputValueChange(newInputValue);
				}

				this.setState({
					isOpen: true,
					isPseudoFocused: false,
					inputValue: newInputValue
				});
			}
		}, {
			key: 'handleInputValueChange',
			value: function handleInputValueChange(newValue) {
				if (this.props.onInputChange) {
					var nextState = this.props.onInputChange(newValue);
					// Note: != used deliberately here to catch undefined and null
					if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
						newValue = '' + nextState;
					}
				}
				return newValue;
			}
		}, {
			key: 'handleKeyDown',
			value: function handleKeyDown(event) {
				if (this.props.disabled) return;

				if (typeof this.props.onInputKeyDown === 'function') {
					this.props.onInputKeyDown(event);
					if (event.defaultPrevented) {
						return;
					}
				}

				switch (event.keyCode) {
					case 8:
						// backspace
						if (!this.state.inputValue && this.props.backspaceRemoves) {
							event.preventDefault();
							this.popValue();
						}
						return;
					case 9:
						// tab
						if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
							return;
						}
						event.preventDefault();
						this.selectFocusedOption();
						return;
					case 13:
						// enter
						event.preventDefault();
						event.stopPropagation();
						if (this.state.isOpen) {
							this.selectFocusedOption();
						} else {
							this.focusNextOption();
						}
						return;
						break;
					case 27:
						// escape
						if (this.state.isOpen) {
							this.closeMenu();
							event.stopPropagation();
						} else if (this.props.clearable && this.props.escapeClearsValue) {
							this.clearValue(event);
							event.stopPropagation();
						}
						break;
					case 32:
						// space
						if (this.props.searchable) {
							return;
						}
						event.preventDefault();
						if (!this.state.isOpen) {
							this.focusNextOption();
							return;
						}
						event.stopPropagation();
						this.selectFocusedOption();
						break;
					case 38:
						// up
						this.focusPreviousOption();
						break;
					case 40:
						// down
						this.focusNextOption();
						break;
					case 33:
						// page up
						this.focusPageUpOption();
						break;
					case 34:
						// page down
						this.focusPageDownOption();
						break;
					case 35:
						// end key
						if (event.shiftKey) {
							return;
						}
						this.focusEndOption();
						break;
					case 36:
						// home key
						if (event.shiftKey) {
							return;
						}
						this.focusStartOption();
						break;
					case 46:
						// delete
						if (!this.state.inputValue && this.props.deleteRemoves) {
							event.preventDefault();
							this.popValue();
						}
						return;
					default:
						return;
				}
				event.preventDefault();
			}
		}, {
			key: 'handleValueClick',
			value: function handleValueClick(option, event) {
				if (!this.props.onValueClick) return;
				this.props.onValueClick(option, event);
			}
		}, {
			key: 'handleMenuScroll',
			value: function handleMenuScroll(event) {
				if (!this.props.onMenuScrollToBottom) return;
				var target = event.target;

				if (target.scrollHeight > target.offsetHeight && target.scrollHeight - target.offsetHeight - target.scrollTop <= 0) {
					this.props.onMenuScrollToBottom();
				}
			}
		}, {
			key: 'handleRequired',
			value: function handleRequired(value, multi) {
				if (!value) return true;
				return multi ? value.length === 0 : Object.keys(value).length === 0;
			}
		}, {
			key: 'getOptionLabel',
			value: function getOptionLabel(op) {
				return op[this.props.labelKey];
			}

			/**
	   * Turns a value into an array from the given options
	   * @param	{String|Number|Array}	value		- the value of the select input
	   * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	   * @returns	{Array}	the value of the select represented in an array
	   */

		}, {
			key: 'getValueArray',
			value: function getValueArray(value, nextProps) {
				var _this2 = this;

				/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
				var props = (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object' ? nextProps : this.props;
				if (props.multi) {
					if (typeof value === 'string') {
						value = value.split(props.delimiter);
					}
					if (!Array.isArray(value)) {
						if (value === null || value === undefined) return [];
						value = [value];
					}
					return value.map(function (value) {
						return _this2.expandValue(value, props);
					}).filter(function (i) {
						return i;
					});
				}
				var expandedValue = this.expandValue(value, props);
				return expandedValue ? [expandedValue] : [];
			}

			/**
	   * Retrieve a value from the given options and valueKey
	   * @param	{String|Number|Array}	value	- the selected value(s)
	   * @param	{Object}		props	- the Select component's props (or nextProps)
	   */

		}, {
			key: 'expandValue',
			value: function expandValue(value, props) {
				var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
				if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
				var options = props.options,
				    valueKey = props.valueKey;

				if (!options) return;
				for (var i = 0; i < options.length; i++) {
					if (String(options[i][valueKey]) === String(value)) return options[i];
				}
			}
		}, {
			key: 'setValue',
			value: function setValue(value) {
				var _this3 = this;

				if (this.props.autoBlur) {
					this.blurInput();
				}
				if (this.props.required) {
					var required = this.handleRequired(value, this.props.multi);
					this.setState({ required: required });
				}
				if (this.props.onChange) {
					if (this.props.simpleValue && value) {
						value = this.props.multi ? value.map(function (i) {
							return i[_this3.props.valueKey];
						}).join(this.props.delimiter) : value[this.props.valueKey];
					}
					this.props.onChange(value);
				}
			}
		}, {
			key: 'selectValue',
			value: function selectValue(value) {
				var _this4 = this;

				// NOTE: we actually add/set the value in a callback to make sure the
				// input value is empty to avoid styling issues in Chrome
				if (this.props.closeOnSelect) {
					this.hasScrolledToOption = false;
				}
				if (this.props.multi) {
					var updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
					this.setState({
						focusedIndex: null,
						inputValue: this.handleInputValueChange(updatedValue),
						isOpen: !this.props.closeOnSelect
					}, function () {
						var valueArray = _this4.getValueArray(_this4.props.value);
						if (valueArray.some(function (i) {
							return i[_this4.props.valueKey] === value[_this4.props.valueKey];
						})) {
							_this4.removeValue(value);
						} else {
							_this4.addValue(value);
						}
					});
				} else {
					this.setState({
						inputValue: this.handleInputValueChange(''),
						isOpen: !this.props.closeOnSelect,
						isPseudoFocused: this.state.isFocused
					}, function () {
						_this4.setValue(value);
					});
				}
			}
		}, {
			key: 'addValue',
			value: function addValue(value) {
				var valueArray = this.getValueArray(this.props.value);
				var visibleOptions = this._visibleOptions.filter(function (val) {
					return !val.disabled;
				});
				var lastValueIndex = visibleOptions.indexOf(value);
				this.setValue(valueArray.concat(value));
				if (visibleOptions.length - 1 === lastValueIndex) {
					// the last option was selected; focus the second-last one
					this.focusOption(visibleOptions[lastValueIndex - 1]);
				} else if (visibleOptions.length > lastValueIndex) {
					// focus the option below the selected one
					this.focusOption(visibleOptions[lastValueIndex + 1]);
				}
			}
		}, {
			key: 'popValue',
			value: function popValue() {
				var valueArray = this.getValueArray(this.props.value);
				if (!valueArray.length) return;
				if (valueArray[valueArray.length - 1].clearableValue === false) return;
				this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
			}
		}, {
			key: 'removeValue',
			value: function removeValue(value) {
				var _this5 = this;

				var valueArray = this.getValueArray(this.props.value);
				this.setValue(valueArray.filter(function (i) {
					return i[_this5.props.valueKey] !== value[_this5.props.valueKey];
				}));
				this.focus();
			}
		}, {
			key: 'clearValue',
			value: function clearValue(event) {
				// if the event was triggered by a mousedown and not the primary
				// button, ignore it.
				if (event && event.type === 'mousedown' && event.button !== 0) {
					return;
				}
				event.preventDefault();
				this.setValue(this.getResetValue());
				this.setState({
					isOpen: false,
					inputValue: this.handleInputValueChange('')
				}, this.focus);
			}
		}, {
			key: 'getResetValue',
			value: function getResetValue() {
				if (this.props.resetValue !== undefined) {
					return this.props.resetValue;
				} else if (this.props.multi) {
					return [];
				} else {
					return null;
				}
			}
		}, {
			key: 'focusOption',
			value: function focusOption(option) {
				this.setState({
					focusedOption: option
				});
			}
		}, {
			key: 'focusNextOption',
			value: function focusNextOption() {
				this.focusAdjacentOption('next');
			}
		}, {
			key: 'focusPreviousOption',
			value: function focusPreviousOption() {
				this.focusAdjacentOption('previous');
			}
		}, {
			key: 'focusPageUpOption',
			value: function focusPageUpOption() {
				this.focusAdjacentOption('page_up');
			}
		}, {
			key: 'focusPageDownOption',
			value: function focusPageDownOption() {
				this.focusAdjacentOption('page_down');
			}
		}, {
			key: 'focusStartOption',
			value: function focusStartOption() {
				this.focusAdjacentOption('start');
			}
		}, {
			key: 'focusEndOption',
			value: function focusEndOption() {
				this.focusAdjacentOption('end');
			}
		}, {
			key: 'focusAdjacentOption',
			value: function focusAdjacentOption(dir) {
				var options = this._visibleOptions.map(function (option, index) {
					return { option: option, index: index };
				}).filter(function (option) {
					return !option.option.disabled;
				});
				this._scrollToFocusedOptionOnUpdate = true;
				if (!this.state.isOpen) {
					this.setState({
						isOpen: true,
						inputValue: '',
						focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null)
					});
					return;
				}
				if (!options.length) return;
				var focusedIndex = -1;
				for (var i = 0; i < options.length; i++) {
					if (this._focusedOption === options[i].option) {
						focusedIndex = i;
						break;
					}
				}
				if (dir === 'next' && focusedIndex !== -1) {
					focusedIndex = (focusedIndex + 1) % options.length;
				} else if (dir === 'previous') {
					if (focusedIndex > 0) {
						focusedIndex = focusedIndex - 1;
					} else {
						focusedIndex = options.length - 1;
					}
				} else if (dir === 'start') {
					focusedIndex = 0;
				} else if (dir === 'end') {
					focusedIndex = options.length - 1;
				} else if (dir === 'page_up') {
					var potentialIndex = focusedIndex - this.props.pageSize;
					if (potentialIndex < 0) {
						focusedIndex = 0;
					} else {
						focusedIndex = potentialIndex;
					}
				} else if (dir === 'page_down') {
					var potentialIndex = focusedIndex + this.props.pageSize;
					if (potentialIndex > options.length - 1) {
						focusedIndex = options.length - 1;
					} else {
						focusedIndex = potentialIndex;
					}
				}

				if (focusedIndex === -1) {
					focusedIndex = 0;
				}

				this.setState({
					focusedIndex: options[focusedIndex].index,
					focusedOption: options[focusedIndex].option
				});
			}
		}, {
			key: 'getFocusedOption',
			value: function getFocusedOption() {
				return this._focusedOption;
			}
		}, {
			key: 'selectFocusedOption',
			value: function selectFocusedOption() {
				if (this._focusedOption) {
					return this.selectValue(this._focusedOption);
				}
			}
		}, {
			key: 'renderLoading',
			value: function renderLoading() {
				if (!this.props.isLoading) return;
				return _react2.default.createElement(
					'span',
					{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
					_react2.default.createElement('span', { className: 'Select-loading' })
				);
			}
		}, {
			key: 'renderValue',
			value: function renderValue(valueArray, isOpen) {
				var _this6 = this;

				var renderLabel = this.props.valueRenderer || this.getOptionLabel;
				var ValueComponent = this.props.valueComponent;
				if (!valueArray.length) {
					return !this.state.inputValue ? _react2.default.createElement(
						'div',
						{ className: 'Select-placeholder' },
						this.props.placeholder
					) : null;
				}
				var onClick = this.props.onValueClick ? this.handleValueClick : null;
				if (this.props.multi) {
					return valueArray.map(function (value, i) {
						return _react2.default.createElement(
							ValueComponent,
							{
								id: _this6._instancePrefix + '-value-' + i,
								instancePrefix: _this6._instancePrefix,
								disabled: _this6.props.disabled || value.clearableValue === false,
								key: 'value-' + i + '-' + value[_this6.props.valueKey],
								onClick: onClick,
								onRemove: _this6.removeValue,
								value: value
							},
							renderLabel(value, i),
							_react2.default.createElement(
								'span',
								{ className: 'Select-aria-only' },
								'\xA0'
							)
						);
					});
				} else if (!this.state.inputValue) {
					if (isOpen) onClick = null;
					return _react2.default.createElement(
						ValueComponent,
						{
							id: this._instancePrefix + '-value-item',
							disabled: this.props.disabled,
							instancePrefix: this._instancePrefix,
							onClick: onClick,
							value: valueArray[0]
						},
						renderLabel(valueArray[0])
					);
				}
			}
		}, {
			key: 'renderInput',
			value: function renderInput(valueArray, focusedOptionIndex) {
				var _classNames,
				    _this7 = this;

				var className = (0, _classnames2.default)('Select-input', this.props.inputProps.className);
				var isOpen = !!this.state.isOpen;

				var ariaOwns = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));
				var inputProps = _extends({}, this.props.inputProps, {
					role: 'combobox',
					'aria-expanded': '' + isOpen,
					'aria-owns': ariaOwns,
					'aria-haspopup': '' + isOpen,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-describedby': this.props['aria-describedby'],
					'aria-labelledby': this.props['aria-labelledby'],
					'aria-label': this.props['aria-label'],
					className: className,
					tabIndex: this.props.tabIndex,
					onBlur: this.handleInputBlur,
					onChange: this.handleInputChange,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref) {
						return _this7.input = _ref;
					},
					required: this.state.required,
					value: this.state.inputValue
				});

				if (this.props.inputRenderer) {
					return this.props.inputRenderer(inputProps);
				}

				if (this.props.disabled || !this.props.searchable) {
					var _props$inputProps = this.props.inputProps,
					    inputClassName = _props$inputProps.inputClassName,
					    divProps = _objectWithoutProperties(_props$inputProps, ['inputClassName']);

					var _ariaOwns = (0, _classnames2.default)(_defineProperty({}, this._instancePrefix + '-list', isOpen));
					return _react2.default.createElement('div', _extends({}, divProps, {
						role: 'combobox',
						'aria-expanded': isOpen,
						'aria-owns': _ariaOwns,
						'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
						'aria-labelledby': this.props['aria-labelledby'],
						'aria-label': this.props['aria-label'],
						className: className,
						tabIndex: this.props.tabIndex || 0,
						onBlur: this.handleInputBlur,
						onFocus: this.handleInputFocus,
						ref: function ref(_ref2) {
							return _this7.input = _ref2;
						},
						'aria-disabled': '' + !!this.props.disabled,
						style: { border: 0, width: 1, display: 'inline-block' } }));
				}

				if (this.props.autosize) {
					return _react2.default.createElement(_reactInputAutosize2.default, _extends({ id: this.props.id }, inputProps, { minWidth: '5' }));
				}
				return _react2.default.createElement(
					'div',
					{ className: className, key: 'input-wrap' },
					_react2.default.createElement('input', _extends({ id: this.props.id }, inputProps))
				);
			}
		}, {
			key: 'renderClear',
			value: function renderClear() {
				var valueArray = this.getValueArray(this.props.value);
				if (!this.props.clearable || !valueArray.length || this.props.disabled || this.props.isLoading) return;
				var clear = this.props.clearRenderer();

				return _react2.default.createElement(
					'span',
					{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
						'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
						onMouseDown: this.clearValue,
						onTouchStart: this.handleTouchStart,
						onTouchMove: this.handleTouchMove,
						onTouchEnd: this.handleTouchEndClearValue
					},
					clear
				);
			}
		}, {
			key: 'renderArrow',
			value: function renderArrow() {
				if (!this.props.arrowRenderer) return;

				var onMouseDown = this.handleMouseDownOnArrow;
				var isOpen = this.state.isOpen;
				var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

				if (!arrow) {
					return null;
				}

				return _react2.default.createElement(
					'span',
					{
						className: 'Select-arrow-zone',
						onMouseDown: onMouseDown
					},
					arrow
				);
			}
		}, {
			key: 'filterOptions',
			value: function filterOptions(excludeOptions) {
				var filterValue = this.state.inputValue;
				var options = this.props.options || [];
				if (this.props.filterOptions) {
					// Maintain backwards compatibility with boolean attribute
					var filterOptions = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : _defaultFilterOptions2.default;

					return filterOptions(options, filterValue, excludeOptions, {
						filterOption: this.props.filterOption,
						ignoreAccents: this.props.ignoreAccents,
						ignoreCase: this.props.ignoreCase,
						labelKey: this.props.labelKey,
						matchPos: this.props.matchPos,
						matchProp: this.props.matchProp,
						valueKey: this.props.valueKey,
						trimFilter: this.props.trimFilter
					});
				} else {
					return options;
				}
			}
		}, {
			key: 'onOptionRef',
			value: function onOptionRef(ref, isFocused) {
				if (isFocused) {
					this.focused = ref;
				}
			}
		}, {
			key: 'renderMenu',
			value: function renderMenu(options, valueArray, focusedOption) {
				if (options && options.length) {
					return this.props.menuRenderer({
						focusedOption: focusedOption,
						focusOption: this.focusOption,
						inputValue: this.state.inputValue,
						instancePrefix: this._instancePrefix,
						labelKey: this.props.labelKey,
						onFocus: this.focusOption,
						onSelect: this.selectValue,
						optionClassName: this.props.optionClassName,
						optionComponent: this.props.optionComponent,
						optionRenderer: this.props.optionRenderer || this.getOptionLabel,
						options: options,
						selectValue: this.selectValue,
						removeValue: this.removeValue,
						valueArray: valueArray,
						valueKey: this.props.valueKey,
						onOptionRef: this.onOptionRef
					});
				} else if (this.props.noResultsText) {
					return _react2.default.createElement(
						'div',
						{ className: 'Select-noresults' },
						this.props.noResultsText
					);
				} else {
					return null;
				}
			}
		}, {
			key: 'renderHiddenField',
			value: function renderHiddenField(valueArray) {
				var _this8 = this;

				if (!this.props.name) return;
				if (this.props.joinValues) {
					var value = valueArray.map(function (i) {
						return stringifyValue(i[_this8.props.valueKey]);
					}).join(this.props.delimiter);
					return _react2.default.createElement('input', {
						type: 'hidden',
						ref: function ref(_ref3) {
							return _this8.value = _ref3;
						},
						name: this.props.name,
						value: value,
						disabled: this.props.disabled });
				}
				return valueArray.map(function (item, index) {
					return _react2.default.createElement('input', { key: 'hidden.' + index,
						type: 'hidden',
						ref: 'value' + index,
						name: _this8.props.name,
						value: stringifyValue(item[_this8.props.valueKey]),
						disabled: _this8.props.disabled });
				});
			}
		}, {
			key: 'getFocusableOptionIndex',
			value: function getFocusableOptionIndex(selectedOption) {
				var options = this._visibleOptions;
				if (!options.length) return null;

				var valueKey = this.props.valueKey;
				var focusedOption = this.state.focusedOption || selectedOption;
				if (focusedOption && !focusedOption.disabled) {
					var focusedOptionIndex = -1;
					options.some(function (option, index) {
						var isOptionEqual = option[valueKey] === focusedOption[valueKey];
						if (isOptionEqual) {
							focusedOptionIndex = index;
						}
						return isOptionEqual;
					});
					if (focusedOptionIndex !== -1) {
						return focusedOptionIndex;
					}
				}

				for (var i = 0; i < options.length; i++) {
					if (!options[i].disabled) return i;
				}
				return null;
			}
		}, {
			key: 'renderOuter',
			value: function renderOuter(options, valueArray, focusedOption) {
				var _this9 = this;

				var menu = this.renderMenu(options, valueArray, focusedOption);
				if (!menu) {
					return null;
				}

				return _react2.default.createElement(
					'div',
					{ ref: function ref(_ref5) {
							return _this9.menuContainer = _ref5;
						}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
					_react2.default.createElement(
						'div',
						{ ref: function ref(_ref4) {
								return _this9.menu = _ref4;
							}, role: 'listbox', tabIndex: -1, className: 'Select-menu', id: this._instancePrefix + '-list',
							style: this.props.menuStyle,
							onScroll: this.handleMenuScroll,
							onMouseDown: this.handleMouseDownOnMenu },
						menu
					)
				);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this10 = this;

				var valueArray = this.getValueArray(this.props.value);
				var options = this._visibleOptions = this.filterOptions(this.props.multi && this.props.removeSelected ? valueArray : null);
				var isOpen = this.state.isOpen;
				if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
				var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

				var focusedOption = null;
				if (focusedOptionIndex !== null) {
					focusedOption = this._focusedOption = options[focusedOptionIndex];
				} else {
					focusedOption = this._focusedOption = null;
				}
				var className = (0, _classnames2.default)('Select', this.props.className, {
					'Select--multi': this.props.multi,
					'Select--single': !this.props.multi,
					'is-clearable': this.props.clearable,
					'is-disabled': this.props.disabled,
					'is-focused': this.state.isFocused,
					'is-loading': this.props.isLoading,
					'is-open': isOpen,
					'is-pseudo-focused': this.state.isPseudoFocused,
					'is-searchable': this.props.searchable,
					'has-value': valueArray.length,
					'Select--rtl': this.props.rtl
				});

				var removeMessage = null;
				if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
					removeMessage = _react2.default.createElement(
						'span',
						{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
						this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
					);
				}

				return _react2.default.createElement(
					'div',
					{ ref: function ref(_ref7) {
							return _this10.wrapper = _ref7;
						},
						className: className,
						style: this.props.wrapperStyle },
					this.renderHiddenField(valueArray),
					_react2.default.createElement(
						'div',
						{ ref: function ref(_ref6) {
								return _this10.control = _ref6;
							},
							className: 'Select-control',
							style: this.props.style,
							onKeyDown: this.handleKeyDown,
							onMouseDown: this.handleMouseDown,
							onTouchEnd: this.handleTouchEnd,
							onTouchStart: this.handleTouchStart,
							onTouchMove: this.handleTouchMove
						},
						_react2.default.createElement(
							'span',
							{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
							this.renderValue(valueArray, isOpen),
							this.renderInput(valueArray, focusedOptionIndex)
						),
						removeMessage,
						this.renderLoading(),
						this.renderClear(),
						this.renderArrow()
					),
					isOpen ? this.renderOuter(options, valueArray, focusedOption) : null
				);
			}
		}]);

		return Select;
	}(_react2.default.Component);

	;

	Select.propTypes = {
		'aria-describedby': _propTypes2.default.string, // html id(s) of element(s) that should be used to describe this input (for assistive tech)
		'aria-label': _propTypes2.default.string, // aria label (for assistive tech)
		'aria-labelledby': _propTypes2.default.string, // html id of an element that should be used as the label (for assistive tech)
		arrowRenderer: _propTypes2.default.func, // create the drop-down caret element
		autoBlur: _propTypes2.default.bool, // automatically blur the component when an option is selected
		autoFocus: _propTypes2.default.bool, // autofocus the component on mount
		autofocus: _propTypes2.default.bool, // deprecated; use autoFocus instead
		autosize: _propTypes2.default.bool, // whether to enable autosizing or not
		backspaceRemoves: _propTypes2.default.bool, // whether backspace removes an item if there is no text input
		backspaceToRemoveMessage: _propTypes2.default.string, // message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
		className: _propTypes2.default.string, // className for the outer element
		clearAllText: stringOrNode, // title for the "clear" control when multi: true
		clearRenderer: _propTypes2.default.func, // create clearable x element
		clearValueText: stringOrNode, // title for the "clear" control
		clearable: _propTypes2.default.bool, // should it be possible to reset value
		closeOnSelect: _propTypes2.default.bool, // whether to close the menu when a value is selected
		deleteRemoves: _propTypes2.default.bool, // whether delete removes an item if there is no text input
		delimiter: _propTypes2.default.string, // delimiter to use to join multiple values for the hidden field value
		disabled: _propTypes2.default.bool, // whether the Select is disabled or not
		escapeClearsValue: _propTypes2.default.bool, // whether escape clears the value when the menu is closed
		filterOption: _propTypes2.default.func, // method to filter a single option (option, filterString)
		filterOptions: _propTypes2.default.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
		id: _propTypes2.default.string, // html id to set on the input element for accessibility or tests
		ignoreAccents: _propTypes2.default.bool, // whether to strip diacritics when filtering
		ignoreCase: _propTypes2.default.bool, // whether to perform case-insensitive filtering
		inputProps: _propTypes2.default.object, // custom attributes for the Input
		inputRenderer: _propTypes2.default.func, // returns a custom input component
		instanceId: _propTypes2.default.string, // set the components instanceId
		isLoading: _propTypes2.default.bool, // whether the Select is loading externally or not (such as options being loaded)
		joinValues: _propTypes2.default.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
		labelKey: _propTypes2.default.string, // path of the label value in option objects
		matchPos: _propTypes2.default.string, // (any|start) match the start or entire string when filtering
		matchProp: _propTypes2.default.string, // (any|label|value) which option property to filter on
		menuBuffer: _propTypes2.default.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
		menuContainerStyle: _propTypes2.default.object, // optional style to apply to the menu container
		menuRenderer: _propTypes2.default.func, // renders a custom menu with options
		menuStyle: _propTypes2.default.object, // optional style to apply to the menu
		multi: _propTypes2.default.bool, // multi-value input
		name: _propTypes2.default.string, // generates a hidden <input /> tag with this field name for html forms
		noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
		onBlur: _propTypes2.default.func, // onBlur handler: function (event) {}
		onBlurResetsInput: _propTypes2.default.bool, // whether input is cleared on blur
		onChange: _propTypes2.default.func, // onChange handler: function (newValue) {}
		onClose: _propTypes2.default.func, // fires when the menu is closed
		onCloseResetsInput: _propTypes2.default.bool, // whether input is cleared when menu is closed through the arrow
		onFocus: _propTypes2.default.func, // onFocus handler: function (event) {}
		onInputChange: _propTypes2.default.func, // onInputChange handler: function (inputValue) {}
		onInputKeyDown: _propTypes2.default.func, // input keyDown handler: function (event) {}
		onMenuScrollToBottom: _propTypes2.default.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
		onOpen: _propTypes2.default.func, // fires when the menu is opened
		onSelectResetsInput: _propTypes2.default.bool, // whether input is cleared on select (works only for multiselect)
		onValueClick: _propTypes2.default.func, // onClick handler for value labels: function (value, event) {}
		openOnClick: _propTypes2.default.bool, // boolean to control opening the menu when the control is clicked
		openOnFocus: _propTypes2.default.bool, // always open options menu on focus
		optionClassName: _propTypes2.default.string, // additional class(es) to apply to the <Option /> elements
		optionComponent: _propTypes2.default.func, // option component to render in dropdown
		optionRenderer: _propTypes2.default.func, // optionRenderer: function (option) {}
		options: _propTypes2.default.array, // array of options
		pageSize: _propTypes2.default.number, // number of entries to page when using page up/down keys
		placeholder: stringOrNode, // field placeholder, displayed when there's no value
		removeSelected: _propTypes2.default.bool, // whether the selected option is removed from the dropdown on multi selects
		required: _propTypes2.default.bool, // applies HTML5 required attribute when needed
		resetValue: _propTypes2.default.any, // value to use when you clear the control
		rtl: _propTypes2.default.bool, // set to true in order to use react-select in right-to-left direction
		scrollMenuIntoView: _propTypes2.default.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
		searchable: _propTypes2.default.bool, // whether to enable searching feature or not
		simpleValue: _propTypes2.default.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
		style: _propTypes2.default.object, // optional style to apply to the control
		tabIndex: stringOrNumber, // optional tab index of the control
		tabSelectsValue: _propTypes2.default.bool, // whether to treat tabbing out while focused to be value selection
		trimFilter: _propTypes2.default.bool, // whether to trim whitespace around filter value
		value: _propTypes2.default.any, // initial field value
		valueComponent: _propTypes2.default.func, // value component to render
		valueKey: _propTypes2.default.string, // path of the label value in option objects
		valueRenderer: _propTypes2.default.func, // valueRenderer: function (option) {}
		wrapperStyle: _propTypes2.default.object // optional style to apply to the component wrapper
	};

	Select.defaultProps = {
		arrowRenderer: _defaultArrowRenderer2.default,
		autosize: true,
		backspaceRemoves: true,
		backspaceToRemoveMessage: 'Press backspace to remove {label}',
		clearable: true,
		clearAllText: 'Clear all',
		clearRenderer: _defaultClearRenderer2.default,
		clearValueText: 'Clear value',
		closeOnSelect: true,
		deleteRemoves: true,
		delimiter: ',',
		disabled: false,
		escapeClearsValue: true,
		filterOptions: _defaultFilterOptions2.default,
		ignoreAccents: true,
		ignoreCase: true,
		inputProps: {},
		isLoading: false,
		joinValues: false,
		labelKey: 'label',
		matchPos: 'any',
		matchProp: 'any',
		menuBuffer: 0,
		menuRenderer: _defaultMenuRenderer2.default,
		multi: false,
		noResultsText: 'No results found',
		onBlurResetsInput: true,
		onSelectResetsInput: true,
		onCloseResetsInput: true,
		openOnClick: true,
		optionComponent: _Option2.default,
		pageSize: 5,
		placeholder: 'Select...',
		removeSelected: true,
		required: false,
		rtl: false,
		scrollMenuIntoView: true,
		searchable: true,
		simpleValue: false,
		tabSelectsValue: true,
		trimFilter: true,
		valueComponent: _Value2.default,
		valueKey: 'value'
	};

	exports.default = Select;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(113);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(4);
	var normalizeHeaderName = __webpack_require__(127);

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
	    adapter = __webpack_require__(66);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(66);
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(283)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CALL_API = exports.API_DATA_FAILURE = exports.API_DATA_SUCCESS = exports.API_DATA_REQUEST = undefined;

	var _symbol = __webpack_require__(76);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _assign = __webpack_require__(74);

	var _assign2 = _interopRequireDefault(_assign);

	var _axios = __webpack_require__(40);

	var _axios2 = _interopRequireDefault(_axios);

	var _jsonApiNormalizer = __webpack_require__(192);

	var _jsonApiNormalizer2 = _interopRequireDefault(_jsonApiNormalizer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_DATA_REQUEST = exports.API_DATA_REQUEST = 'API_DATA_REQUEST';
	var API_DATA_SUCCESS = exports.API_DATA_SUCCESS = 'API_DATA_SUCCESS';
	var API_DATA_FAILURE = exports.API_DATA_FAILURE = 'API_DATA_FAILURE';

	function callApi(endpoint) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	    return _axios2.default.get(endpoint, options).then(function (response) {
	        return (0, _assign2.default)({}, (0, _jsonApiNormalizer2.default)(response.data, { endpoint: endpoint }));
	    });
	}

	var CALL_API = exports.CALL_API = (0, _symbol2.default)('Call API');

	var _default = function _default(store) {
	    return function nxt(next) {
	        return function call(action) {
	            var callAPI = action[CALL_API];

	            if (typeof callAPI === 'undefined') {
	                return next(action);
	            }

	            var endpoint = callAPI.endpoint;
	            var options = callAPI.options;


	            if (typeof endpoint === 'function') {
	                endpoint = endpoint(store.getState());
	            }

	            if (typeof endpoint !== 'string') {
	                throw new Error('Specify a string endpoint URL.');
	            }

	            var actionWith = function actionWith(data) {
	                var finalAction = (0, _assign2.default)({}, action, data);
	                delete finalAction[CALL_API];
	                return finalAction;
	            };

	            next(actionWith({ type: API_DATA_REQUEST, endpoint: endpoint }));

	            return callApi(endpoint, options || {}).then(function (response) {
	                return next(actionWith({ response: response, type: API_DATA_SUCCESS, endpoint: endpoint }));
	            }, function (error) {
	                return next(actionWith({ type: API_DATA_FAILURE, error: error.message || 'Something bad happened' }));
	            });
	        };
	    };
	};

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(API_DATA_REQUEST, 'API_DATA_REQUEST', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/middleware/api.js');

	    __REACT_HOT_LOADER__.register(API_DATA_SUCCESS, 'API_DATA_SUCCESS', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/middleware/api.js');

	    __REACT_HOT_LOADER__.register(API_DATA_FAILURE, 'API_DATA_FAILURE', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/middleware/api.js');

	    __REACT_HOT_LOADER__.register(callApi, 'callApi', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/middleware/api.js');

	    __REACT_HOT_LOADER__.register(CALL_API, 'CALL_API', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/middleware/api.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/middleware/api.js');
	})();

	;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(75);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = {};


/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = true;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(24);
	var dPs = __webpack_require__(169);
	var enumBugKeys = __webpack_require__(45);
	var IE_PROTO = __webpack_require__(51)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(80)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(163).appendChild(iframe);
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
/* 49 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(14).f;
	var has = __webpack_require__(13);
	var TAG = __webpack_require__(20)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(52)('keys');
	var uid = __webpack_require__(30);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ },
/* 53 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(44);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(25);
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10);
	var core = __webpack_require__(9);
	var LIBRARY = __webpack_require__(47);
	var wksExt = __webpack_require__(57);
	var defineProperty = __webpack_require__(14).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(20);


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(21);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(92);

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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(206),
	    getValue = __webpack_require__(232);

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
/* 61 */
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(26),
	    isObject = __webpack_require__(15);

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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _stripDiacritics = __webpack_require__(111);

	var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

	var _trim = __webpack_require__(288);

	var _trim2 = _interopRequireDefault(_trim);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function filterOptions(options, filterValue, excludeOptions, props) {
		var _this = this;

		if (props.ignoreAccents) {
			filterValue = (0, _stripDiacritics2.default)(filterValue);
		}

		if (props.ignoreCase) {
			filterValue = filterValue.toLowerCase();
		}

		if (props.trimFilter) {
			filterValue = (0, _trim2.default)(filterValue);
		}

		if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
			return i[props.valueKey];
		});

		return options.filter(function (option) {
			if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
			if (props.filterOption) return props.filterOption.call(_this, option, filterValue);
			if (!filterValue) return true;
			var valueTest = String(option[props.valueKey]);
			var labelTest = String(option[props.labelKey]);

			if (props.ignoreAccents) {
				if (props.matchProp !== 'label') valueTest = (0, _stripDiacritics2.default)(valueTest);
				if (props.matchProp !== 'value') labelTest = (0, _stripDiacritics2.default)(labelTest);
			}

			if (props.ignoreCase) {
				if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
				if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
			}
			return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
		});
	}

	exports.default = filterOptions;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classnames = __webpack_require__(23);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function menuRenderer(_ref) {
		var focusedOption = _ref.focusedOption,
		    focusOption = _ref.focusOption,
		    inputValue = _ref.inputValue,
		    instancePrefix = _ref.instancePrefix,
		    labelKey = _ref.labelKey,
		    onFocus = _ref.onFocus,
		    onOptionRef = _ref.onOptionRef,
		    onSelect = _ref.onSelect,
		    optionClassName = _ref.optionClassName,
		    optionComponent = _ref.optionComponent,
		    optionRenderer = _ref.optionRenderer,
		    options = _ref.options,
		    removeValue = _ref.removeValue,
		    selectValue = _ref.selectValue,
		    valueArray = _ref.valueArray,
		    valueKey = _ref.valueKey;

		var Option = optionComponent;

		return options.map(function (option, i) {
			var isSelected = valueArray && valueArray.some(function (x) {
				return x[valueKey] == option[valueKey];
			});
			var isFocused = option === focusedOption;
			var optionClass = (0, _classnames2.default)(optionClassName, {
				'Select-option': true,
				'is-selected': isSelected,
				'is-focused': isFocused,
				'is-disabled': option.disabled
			});

			return _react2.default.createElement(
				Option,
				{
					className: optionClass,
					focusOption: focusOption,
					inputValue: inputValue,
					instancePrefix: instancePrefix,
					isDisabled: option.disabled,
					isFocused: isFocused,
					isSelected: isSelected,
					key: 'option-' + i + '-' + option[valueKey],
					onFocus: onFocus,
					onSelect: onSelect,
					option: option,
					optionIndex: i,
					ref: function ref(_ref2) {
						onOptionRef(_ref2, isFocused);
					},
					removeValue: removeValue,
					selectValue: selectValue
				},
				optionRenderer(option, i, inputValue)
			);
		});
	}

	exports.default = menuRenderer;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(16))(372);

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);
	var settle = __webpack_require__(119);
	var buildURL = __webpack_require__(122);
	var parseHeaders = __webpack_require__(128);
	var isURLSameOrigin = __webpack_require__(126);
	var createError = __webpack_require__(69);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(121);

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
	      var cookies = __webpack_require__(124);

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
/* 67 */
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
/* 68 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(118);

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
/* 70 */
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty2 = __webpack_require__(43);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	exports.fetchEvaluationTemplates = fetchEvaluationTemplates;
	exports.fetchAssigneesStaff = fetchAssigneesStaff;
	exports.fetchEvaluationTypes = fetchEvaluationTypes;
	exports.fetchEngagements = fetchEngagements;
	exports.fetchPreferredSuppliers = fetchPreferredSuppliers;
	exports.fetchRequestsForQuotations = fetchRequestsForQuotations;
	exports.fetchRfqMatchedSuppliers = fetchRfqMatchedSuppliers;
	exports.fetchMatchedItems = fetchMatchedItems;
	exports.fetchUser = fetchUser;

	var _api = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function fetchEvaluationTemplates() {
	    return (0, _defineProperty3.default)({}, _api.CALL_API, {
	        endpoint: '/evaluation-templates'
	    });
	}

	function fetchAssigneesStaff() {
	    return (0, _defineProperty3.default)({}, _api.CALL_API, {
	        endpoint: '/staff?filter[pitRoles]=1,2,3,4&filter[is_deleted]=0'
	    });
	}

	function fetchEvaluationTypes() {
	    return (0, _defineProperty3.default)({}, _api.CALL_API, {
	        endpoint: '/evaluation-template-assignment-types'
	    });
	}

	function fetchEngagements() {
	    return (0, _defineProperty3.default)({}, _api.CALL_API, {
	        endpoint: '/engagements'
	    });
	}

	function fetchPreferredSuppliers() {
	    return (0, _defineProperty3.default)({}, _api.CALL_API, {
	        endpoint: '/preferred-suppliers'
	    });
	}

	function fetchRequestsForQuotations() {
	    return (0, _defineProperty3.default)({}, _api.CALL_API, {
	        endpoint: '/request-for-quotations?filter[sent]=1&filter[archived]=0'
	    });
	}

	function fetchRfqMatchedSuppliers(rfqTypeId) {
	    return (0, _defineProperty3.default)({}, _api.CALL_API, {
	        endpoint: '/request-for-quotations/' + rfqTypeId + '/matched-suppliers'
	    });
	}

	function fetchMatchedItems(rfqTypeId, matchedSupplierId) {
	    return (0, _defineProperty3.default)({}, _api.CALL_API, {
	        endpoint: '/request-for-quotations/' + rfqTypeId + '/matched-suppliers/' + matchedSupplierId + '/matched-items'
	    });
	}

	function fetchUser() {
	    return (0, _defineProperty3.default)({}, _api.CALL_API, {
	        endpoint: '/user?include=staff.pitRoles'
	    });
	}
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(fetchEvaluationTemplates, 'fetchEvaluationTemplates', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/apiActions.js');

	    __REACT_HOT_LOADER__.register(fetchAssigneesStaff, 'fetchAssigneesStaff', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/apiActions.js');

	    __REACT_HOT_LOADER__.register(fetchEvaluationTypes, 'fetchEvaluationTypes', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/apiActions.js');

	    __REACT_HOT_LOADER__.register(fetchEngagements, 'fetchEngagements', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/apiActions.js');

	    __REACT_HOT_LOADER__.register(fetchPreferredSuppliers, 'fetchPreferredSuppliers', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/apiActions.js');

	    __REACT_HOT_LOADER__.register(fetchRequestsForQuotations, 'fetchRequestsForQuotations', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/apiActions.js');

	    __REACT_HOT_LOADER__.register(fetchRfqMatchedSuppliers, 'fetchRfqMatchedSuppliers', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/apiActions.js');

	    __REACT_HOT_LOADER__.register(fetchMatchedItems, 'fetchMatchedItems', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/apiActions.js');

	    __REACT_HOT_LOADER__.register(fetchUser, 'fetchUser', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/actions/apiActions.js');
	})();

	;

/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE = exports.ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE = 'ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE';
	var ASSIGNMENT_CREATION_ASSIGNEES_CHAIRMAN_CHANGE_UPDATE = exports.ASSIGNMENT_CREATION_ASSIGNEES_CHAIRMAN_CHANGE_UPDATE = 'ASSIGNMENT_CREATION_ASSIGNEES_CHAIRMAN_CHANGE_UPDATE';
	var ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE = exports.ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE = 'ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE';
	var ASSIGNMENT_CREATION_UPDATE_MATCHED_SUPPLIER_ID = exports.ASSIGNMENT_CREATION_UPDATE_MATCHED_SUPPLIER_ID = 'ASSIGNMENT_CREATION_UPDATE_MATCHED_SUPPLIER_ID';
	var ASSIGNMENT_CREATION_UPDATE_CHANGE_RFQ = exports.ASSIGNMENT_CREATION_UPDATE_CHANGE_RFQ = 'ASSIGNMENT_CREATION_UPDATE_CHANGE_RFQ';
	var ASSIGNMENT_CREATION_PREFERRED_SUPPLIERS_UPDATE_CHANGE = exports.ASSIGNMENT_CREATION_PREFERRED_SUPPLIERS_UPDATE_CHANGE = 'ASSIGNMENT_CREATION_PREFERRED_SUPPLIERS_UPDATE_CHANGE';
	var ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE = exports.ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE = 'ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE';
	var ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID = exports.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID = 'ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID';
	var ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START = exports.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START = 'ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START';
	var ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS = exports.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS = 'ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS';
	var ASSIGNMENT_CREATION_UPDATE_USER_PIT_ROLES = exports.ASSIGNMENT_CREATION_UPDATE_USER_PIT_ROLES = 'ASSIGNMENT_CREATION_UPDATE_USER_PIT_ROLES';
	var ASSIGNMENT_CREATION_SET_UPDATE_CURRENT_USER = exports.ASSIGNMENT_CREATION_SET_UPDATE_CURRENT_USER = 'ASSIGNMENT_CREATION_SET_UPDATE_CURRENT_USER';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE, 'ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_ASSIGNEES_CHAIRMAN_CHANGE_UPDATE, 'ASSIGNMENT_CREATION_ASSIGNEES_CHAIRMAN_CHANGE_UPDATE', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE, 'ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_UPDATE_MATCHED_SUPPLIER_ID, 'ASSIGNMENT_CREATION_UPDATE_MATCHED_SUPPLIER_ID', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_UPDATE_CHANGE_RFQ, 'ASSIGNMENT_CREATION_UPDATE_CHANGE_RFQ', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_PREFERRED_SUPPLIERS_UPDATE_CHANGE, 'ASSIGNMENT_CREATION_PREFERRED_SUPPLIERS_UPDATE_CHANGE', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE, 'ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID, 'ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START, 'ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS, 'ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_UPDATE_USER_PIT_ROLES, 'ASSIGNMENT_CREATION_UPDATE_USER_PIT_ROLES', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');

	  __REACT_HOT_LOADER__.register(ASSIGNMENT_CREATION_SET_UPDATE_CURRENT_USER, 'ASSIGNMENT_CREATION_SET_UPDATE_CURRENT_USER', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/constants/ActionTypes.js');
	})();

	;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.concatLabelKey = undefined;

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var concatLabelKey = exports.concatLabelKey = function concatLabelKey(optionsList) {
	    return optionsList.map(function (optionItem) {
	        return (0, _extends3.default)({}, optionItem, {
	            fullName: optionItem.firstName + " " + optionItem.lastName,
	            value: "" + optionItem.id
	        });
	    });
	};
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(concatLabelKey, "concatLabelKey", "/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/utils/concatLabelKey.js");
	})();

	;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(152), __esModule: true };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(154), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(157), __esModule: true };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(147);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(76);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(159);
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25);
	var document = __webpack_require__(10).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(11) && !__webpack_require__(17)(function () {
	  return Object.defineProperty(__webpack_require__(80)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(78);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(47);
	var $export = __webpack_require__(12);
	var redefine = __webpack_require__(88);
	var hide = __webpack_require__(18);
	var has = __webpack_require__(13);
	var Iterators = __webpack_require__(46);
	var $iterCreate = __webpack_require__(165);
	var setToStringTag = __webpack_require__(50);
	var getPrototypeOf = __webpack_require__(86);
	var ITERATOR = __webpack_require__(20)('iterator');
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(28);
	var createDesc = __webpack_require__(29);
	var toIObject = __webpack_require__(19);
	var toPrimitive = __webpack_require__(55);
	var has = __webpack_require__(13);
	var IE8_DOM_DEFINE = __webpack_require__(81);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(11) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(87);
	var hiddenKeys = __webpack_require__(45).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(13);
	var toObject = __webpack_require__(54);
	var IE_PROTO = __webpack_require__(51)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var has = __webpack_require__(13);
	var toIObject = __webpack_require__(19);
	var arrayIndexOf = __webpack_require__(161)(false);
	var IE_PROTO = __webpack_require__(51)('IE_PROTO');

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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60),
	    root = __webpack_require__(21);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(216),
	    isArguments = __webpack_require__(99),
	    isArray = __webpack_require__(36),
	    isBuffer = __webpack_require__(100),
	    isIndex = __webpack_require__(96),
	    isTypedArray = __webpack_require__(102);

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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(59),
	    eq = __webpack_require__(35);

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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(97);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 95 */
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
/* 96 */
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
/* 97 */
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
/* 98 */
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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(205),
	    isObjectLike = __webpack_require__(22);

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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(21),
	    stubFalse = __webpack_require__(279);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module)))

/***/ },
/* 101 */
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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(207),
	    baseUnary = __webpack_require__(218),
	    nodeUtil = __webpack_require__(255);

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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(90),
	    baseKeysIn = __webpack_require__(209),
	    isArrayLike = __webpack_require__(37);

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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Select = __webpack_require__(39);

	var _Select2 = _interopRequireDefault(_Select);

	var _stripDiacritics = __webpack_require__(111);

	var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
		autoload: _propTypes2.default.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
		cache: _propTypes2.default.any, // object to use to cache results; set to null/false to disable caching
		children: _propTypes2.default.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
		ignoreAccents: _propTypes2.default.bool, // strip diacritics when filtering; defaults to true
		ignoreCase: _propTypes2.default.bool, // perform case-insensitive filtering; defaults to true
		loadOptions: _propTypes2.default.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
		loadingPlaceholder: _propTypes2.default.oneOfType([// replaces the placeholder while options are loading
		_propTypes2.default.string, _propTypes2.default.node]),
		multi: _propTypes2.default.bool, // multi-value input
		noResultsText: _propTypes2.default.oneOfType([// field noResultsText, displayed when no options come back from the server
		_propTypes2.default.string, _propTypes2.default.node]),
		onChange: _propTypes2.default.func, // onChange handler: function (newValue) {}
		onInputChange: _propTypes2.default.func, // optional for keeping track of what is being typed
		options: _propTypes2.default.array.isRequired, // array of options
		placeholder: _propTypes2.default.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
		_propTypes2.default.string, _propTypes2.default.node]),
		searchPromptText: _propTypes2.default.oneOfType([// label to prompt for search input
		_propTypes2.default.string, _propTypes2.default.node]),
		value: _propTypes2.default.any // initial field value
	};

	var defaultCache = {};

	var defaultProps = {
		autoload: true,
		cache: defaultCache,
		children: defaultChildren,
		ignoreAccents: true,
		ignoreCase: true,
		loadingPlaceholder: 'Loading...',
		options: [],
		searchPromptText: 'Type to search'
	};

	var Async = function (_Component) {
		_inherits(Async, _Component);

		function Async(props, context) {
			_classCallCheck(this, Async);

			var _this = _possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).call(this, props, context));

			_this._cache = props.cache === defaultCache ? {} : props.cache;

			_this.state = {
				inputValue: '',
				isLoading: false,
				options: props.options
			};

			_this.onInputChange = _this.onInputChange.bind(_this);
			return _this;
		}

		_createClass(Async, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var autoload = this.props.autoload;


				if (autoload) {
					this.loadOptions('');
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (nextProps.options !== this.props.options) {
					this.setState({
						options: nextProps.options
					});
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this._callback = null;
			}
		}, {
			key: 'loadOptions',
			value: function loadOptions(inputValue) {
				var _this2 = this;

				var loadOptions = this.props.loadOptions;

				var cache = this._cache;

				if (cache && Object.prototype.hasOwnProperty.call(cache, inputValue)) {
					this._callback = null;

					this.setState({
						isLoading: false,
						options: cache[inputValue]
					});

					return;
				}

				var callback = function callback(error, data) {
					var options = data && data.options || [];

					if (cache) {
						cache[inputValue] = options;
					}

					if (callback === _this2._callback) {
						_this2._callback = null;

						_this2.setState({
							isLoading: false,
							options: options
						});
					}
				};

				// Ignore all but the most recent request
				this._callback = callback;

				var promise = loadOptions(inputValue, callback);
				if (promise) {
					promise.then(function (data) {
						return callback(null, data);
					}, function (error) {
						return callback(error);
					});
				}

				if (this._callback && !this.state.isLoading) {
					this.setState({
						isLoading: true
					});
				}
			}
		}, {
			key: 'onInputChange',
			value: function onInputChange(inputValue) {
				var _props = this.props,
				    ignoreAccents = _props.ignoreAccents,
				    ignoreCase = _props.ignoreCase,
				    onInputChange = _props.onInputChange;

				var newInputValue = inputValue;

				if (onInputChange) {
					var value = onInputChange(newInputValue);
					// Note: != used deliberately here to catch undefined and null
					if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
						newInputValue = '' + value;
					}
				}

				var transformedInputValue = newInputValue;

				if (ignoreAccents) {
					transformedInputValue = (0, _stripDiacritics2.default)(transformedInputValue);
				}

				if (ignoreCase) {
					transformedInputValue = transformedInputValue.toLowerCase();
				}

				this.setState({ inputValue: newInputValue });
				this.loadOptions(transformedInputValue);

				// Return new input value, but without applying toLowerCase() to avoid modifying the user's view case of the input while typing.
				return newInputValue;
			}
		}, {
			key: 'noResultsText',
			value: function noResultsText() {
				var _props2 = this.props,
				    loadingPlaceholder = _props2.loadingPlaceholder,
				    noResultsText = _props2.noResultsText,
				    searchPromptText = _props2.searchPromptText;
				var _state = this.state,
				    inputValue = _state.inputValue,
				    isLoading = _state.isLoading;


				if (isLoading) {
					return loadingPlaceholder;
				}
				if (inputValue && noResultsText) {
					return noResultsText;
				}
				return searchPromptText;
			}
		}, {
			key: 'focus',
			value: function focus() {
				this.select.focus();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var _props3 = this.props,
				    children = _props3.children,
				    loadingPlaceholder = _props3.loadingPlaceholder,
				    multi = _props3.multi,
				    onChange = _props3.onChange,
				    placeholder = _props3.placeholder,
				    value = _props3.value;
				var _state2 = this.state,
				    isLoading = _state2.isLoading,
				    options = _state2.options;


				var props = {
					noResultsText: this.noResultsText(),
					placeholder: isLoading ? loadingPlaceholder : placeholder,
					options: isLoading && loadingPlaceholder ? [] : options,
					ref: function ref(_ref) {
						return _this3.select = _ref;
					}
				};

				return children(_extends({}, this.props, props, {
					isLoading: isLoading,
					onInputChange: this.onInputChange
				}));
			}
		}]);

		return Async;
	}(_react.Component);

	exports.default = Async;


	Async.propTypes = propTypes;
	Async.defaultProps = defaultProps;

	function defaultChildren(props) {
		return _react2.default.createElement(_Select2.default, props);
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Select = __webpack_require__(39);

	var _Select2 = _interopRequireDefault(_Select);

	var _defaultFilterOptions = __webpack_require__(63);

	var _defaultFilterOptions2 = _interopRequireDefault(_defaultFilterOptions);

	var _defaultMenuRenderer = __webpack_require__(64);

	var _defaultMenuRenderer2 = _interopRequireDefault(_defaultMenuRenderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CreatableSelect = function (_React$Component) {
		_inherits(CreatableSelect, _React$Component);

		function CreatableSelect(props, context) {
			_classCallCheck(this, CreatableSelect);

			var _this = _possibleConstructorReturn(this, (CreatableSelect.__proto__ || Object.getPrototypeOf(CreatableSelect)).call(this, props, context));

			_this.filterOptions = _this.filterOptions.bind(_this);
			_this.menuRenderer = _this.menuRenderer.bind(_this);
			_this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
			_this.onInputChange = _this.onInputChange.bind(_this);
			_this.onOptionSelect = _this.onOptionSelect.bind(_this);
			return _this;
		}

		_createClass(CreatableSelect, [{
			key: 'createNewOption',
			value: function createNewOption() {
				var _props = this.props,
				    isValidNewOption = _props.isValidNewOption,
				    newOptionCreator = _props.newOptionCreator,
				    onNewOptionClick = _props.onNewOptionClick,
				    _props$options = _props.options,
				    options = _props$options === undefined ? [] : _props$options,
				    shouldKeyDownEventCreateNewOption = _props.shouldKeyDownEventCreateNewOption;


				if (isValidNewOption({ label: this.inputValue })) {
					var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
					var _isOptionUnique = this.isOptionUnique({ option: option });

					// Don't add the same option twice.
					if (_isOptionUnique) {
						if (onNewOptionClick) {
							onNewOptionClick(option);
						} else {
							options.unshift(option);

							this.select.selectValue(option);
						}
					}
				}
			}
		}, {
			key: 'filterOptions',
			value: function filterOptions() {
				var _props2 = this.props,
				    filterOptions = _props2.filterOptions,
				    isValidNewOption = _props2.isValidNewOption,
				    promptTextCreator = _props2.promptTextCreator;

				// TRICKY Check currently selected options as well.
				// Don't display a create-prompt for a value that's selected.
				// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.

				var excludeOptions = (arguments.length <= 2 ? undefined : arguments[2]) || [];

				var filteredOptions = filterOptions.apply(undefined, arguments) || [];

				if (isValidNewOption({ label: this.inputValue })) {
					var _newOptionCreator = this.props.newOptionCreator;


					var option = _newOptionCreator({
						label: this.inputValue,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
					// For multi-selects, this would remove it from the filtered list.
					var _isOptionUnique2 = this.isOptionUnique({
						option: option,
						options: excludeOptions.concat(filteredOptions)
					});

					if (_isOptionUnique2) {
						var prompt = promptTextCreator(this.inputValue);

						this._createPlaceholderOption = _newOptionCreator({
							label: prompt,
							labelKey: this.labelKey,
							valueKey: this.valueKey
						});

						filteredOptions.unshift(this._createPlaceholderOption);
					}
				}

				return filteredOptions;
			}
		}, {
			key: 'isOptionUnique',
			value: function isOptionUnique(_ref) {
				var option = _ref.option,
				    options = _ref.options;
				var isOptionUnique = this.props.isOptionUnique;


				options = options || this.props.options;

				return isOptionUnique({
					labelKey: this.labelKey,
					option: option,
					options: options,
					valueKey: this.valueKey
				});
			}
		}, {
			key: 'menuRenderer',
			value: function menuRenderer(params) {
				var menuRenderer = this.props.menuRenderer;


				return menuRenderer(_extends({}, params, {
					onSelect: this.onOptionSelect,
					selectValue: this.onOptionSelect
				}));
			}
		}, {
			key: 'onInputChange',
			value: function onInputChange(input) {
				var onInputChange = this.props.onInputChange;

				// This value may be needed in between Select mounts (when this.select is null)

				this.inputValue = input;

				if (onInputChange) {
					this.inputValue = onInputChange(input);
				}

				return this.inputValue;
			}
		}, {
			key: 'onInputKeyDown',
			value: function onInputKeyDown(event) {
				var _props3 = this.props,
				    shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption,
				    onInputKeyDown = _props3.onInputKeyDown;

				var focusedOption = this.select.getFocusedOption();

				if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
					this.createNewOption();

					// Prevent decorated Select from doing anything additional with this keyDown event
					event.preventDefault();
				} else if (onInputKeyDown) {
					onInputKeyDown(event);
				}
			}
		}, {
			key: 'onOptionSelect',
			value: function onOptionSelect(option, event) {
				if (option === this._createPlaceholderOption) {
					this.createNewOption();
				} else {
					this.select.selectValue(option);
				}
			}
		}, {
			key: 'focus',
			value: function focus() {
				this.select.focus();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props4 = this.props,
				    newOptionCreator = _props4.newOptionCreator,
				    shouldKeyDownEventCreateNewOption = _props4.shouldKeyDownEventCreateNewOption,
				    refProp = _props4.ref,
				    restProps = _objectWithoutProperties(_props4, ['newOptionCreator', 'shouldKeyDownEventCreateNewOption', 'ref']);

				var children = this.props.children;

				// We can't use destructuring default values to set the children,
				// because it won't apply work if `children` is null. A falsy check is
				// more reliable in real world use-cases.

				if (!children) {
					children = defaultChildren;
				}

				var props = _extends({}, restProps, {
					allowCreate: true,
					filterOptions: this.filterOptions,
					menuRenderer: this.menuRenderer,
					onInputChange: this.onInputChange,
					onInputKeyDown: this.onInputKeyDown,
					ref: function ref(_ref2) {
						_this2.select = _ref2;

						// These values may be needed in between Select mounts (when this.select is null)
						if (_ref2) {
							_this2.labelKey = _ref2.props.labelKey;
							_this2.valueKey = _ref2.props.valueKey;
						}
						if (refProp) {
							refProp(_ref2);
						}
					}
				});

				return children(props);
			}
		}]);

		return CreatableSelect;
	}(_react2.default.Component);

	;

	function defaultChildren(props) {
		return _react2.default.createElement(_Select2.default, props);
	};

	function isOptionUnique(_ref3) {
		var option = _ref3.option,
		    options = _ref3.options,
		    labelKey = _ref3.labelKey,
		    valueKey = _ref3.valueKey;

		return options.filter(function (existingOption) {
			return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
		}).length === 0;
	};

	function isValidNewOption(_ref4) {
		var label = _ref4.label;

		return !!label;
	};

	function newOptionCreator(_ref5) {
		var label = _ref5.label,
		    labelKey = _ref5.labelKey,
		    valueKey = _ref5.valueKey;

		var option = {};
		option[valueKey] = label;
		option[labelKey] = label;
		option.className = 'Select-create-option-placeholder';
		return option;
	};

	function promptTextCreator(label) {
		return 'Create option "' + label + '"';
	}

	function shouldKeyDownEventCreateNewOption(_ref6) {
		var keyCode = _ref6.keyCode;

		switch (keyCode) {
			case 9: // TAB
			case 13: // ENTER
			case 188:
				// COMMA
				return true;
			default:
				return false;
		}
	};

	// Default prop methods
	CreatableSelect.isOptionUnique = isOptionUnique;
	CreatableSelect.isValidNewOption = isValidNewOption;
	CreatableSelect.newOptionCreator = newOptionCreator;
	CreatableSelect.promptTextCreator = promptTextCreator;
	CreatableSelect.shouldKeyDownEventCreateNewOption = shouldKeyDownEventCreateNewOption;

	CreatableSelect.defaultProps = {
		filterOptions: _defaultFilterOptions2.default,
		isOptionUnique: isOptionUnique,
		isValidNewOption: isValidNewOption,
		menuRenderer: _defaultMenuRenderer2.default,
		newOptionCreator: newOptionCreator,
		promptTextCreator: promptTextCreator,
		shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
	};

	CreatableSelect.propTypes = {
		// Child function responsible for creating the inner Select component
		// This component can be used to compose HOCs (eg Creatable and Async)
		// (props: Object): PropTypes.element
		children: _propTypes2.default.func,

		// See Select.propTypes.filterOptions
		filterOptions: _propTypes2.default.any,

		// Searches for any matching option within the set of options.
		// This function prevents duplicate options from being created.
		// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
		isOptionUnique: _propTypes2.default.func,

		// Determines if the current input text represents a valid option.
		// ({ label: string }): boolean
		isValidNewOption: _propTypes2.default.func,

		// See Select.propTypes.menuRenderer
		menuRenderer: _propTypes2.default.any,

		// Factory to create new option.
		// ({ label: string, labelKey: string, valueKey: string }): Object
		newOptionCreator: _propTypes2.default.func,

		// input change handler: function (inputValue) {}
		onInputChange: _propTypes2.default.func,

		// input keyDown handler: function (event) {}
		onInputKeyDown: _propTypes2.default.func,

		// new option click handler: function (option) {}
		onNewOptionClick: _propTypes2.default.func,

		// See Select.propTypes.options
		options: _propTypes2.default.array,

		// Creates prompt/placeholder option text.
		// (filterText: string): string
		promptTextCreator: _propTypes2.default.func,

		ref: _propTypes2.default.func,

		// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
		shouldKeyDownEventCreateNewOption: _propTypes2.default.func
	};

	exports.default = CreatableSelect;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(23);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Option = function (_React$Component) {
		_inherits(Option, _React$Component);

		function Option(props) {
			_classCallCheck(this, Option);

			var _this = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

			_this.handleMouseDown = _this.handleMouseDown.bind(_this);
			_this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
			_this.handleMouseMove = _this.handleMouseMove.bind(_this);
			_this.handleTouchStart = _this.handleTouchStart.bind(_this);
			_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
			_this.handleTouchMove = _this.handleTouchMove.bind(_this);
			_this.onFocus = _this.onFocus.bind(_this);
			return _this;
		}

		_createClass(Option, [{
			key: 'blockEvent',
			value: function blockEvent(event) {
				event.preventDefault();
				event.stopPropagation();
				if (event.target.tagName !== 'A' || !('href' in event.target)) {
					return;
				}
				if (event.target.target) {
					window.open(event.target.href, event.target.target);
				} else {
					window.location.href = event.target.href;
				}
			}
		}, {
			key: 'handleMouseDown',
			value: function handleMouseDown(event) {
				event.preventDefault();
				event.stopPropagation();
				this.props.onSelect(this.props.option, event);
			}
		}, {
			key: 'handleMouseEnter',
			value: function handleMouseEnter(event) {
				this.onFocus(event);
			}
		}, {
			key: 'handleMouseMove',
			value: function handleMouseMove(event) {
				this.onFocus(event);
			}
		}, {
			key: 'handleTouchEnd',
			value: function handleTouchEnd(event) {
				// Check if the view is being dragged, In this case
				// we don't want to fire the click event (because the user only wants to scroll)
				if (this.dragging) return;

				this.handleMouseDown(event);
			}
		}, {
			key: 'handleTouchMove',
			value: function handleTouchMove(event) {
				// Set a flag that the view is being dragged
				this.dragging = true;
			}
		}, {
			key: 'handleTouchStart',
			value: function handleTouchStart(event) {
				// Set a flag that the view is not being dragged
				this.dragging = false;
			}
		}, {
			key: 'onFocus',
			value: function onFocus(event) {
				if (!this.props.isFocused) {
					this.props.onFocus(this.props.option, event);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props,
				    option = _props.option,
				    instancePrefix = _props.instancePrefix,
				    optionIndex = _props.optionIndex;

				var className = (0, _classnames2.default)(this.props.className, option.className);

				return option.disabled ? _react2.default.createElement(
					'div',
					{ className: className,
						onMouseDown: this.blockEvent,
						onClick: this.blockEvent },
					this.props.children
				) : _react2.default.createElement(
					'div',
					{ className: className,
						style: option.style,
						role: 'option',
						'aria-label': option.label,
						onMouseDown: this.handleMouseDown,
						onMouseEnter: this.handleMouseEnter,
						onMouseMove: this.handleMouseMove,
						onTouchStart: this.handleTouchStart,
						onTouchMove: this.handleTouchMove,
						onTouchEnd: this.handleTouchEnd,
						id: instancePrefix + '-option-' + optionIndex,
						title: option.title },
					this.props.children
				);
			}
		}]);

		return Option;
	}(_react2.default.Component);

	;

	Option.propTypes = {
		children: _propTypes2.default.node,
		className: _propTypes2.default.string, // className (based on mouse position)
		instancePrefix: _propTypes2.default.string.isRequired, // unique prefix for the ids (used for aria)
		isDisabled: _propTypes2.default.bool, // the option is disabled
		isFocused: _propTypes2.default.bool, // the option is focused
		isSelected: _propTypes2.default.bool, // the option is selected
		onFocus: _propTypes2.default.func, // method to handle mouseEnter on option element
		onSelect: _propTypes2.default.func, // method to handle click on option element
		onUnfocus: _propTypes2.default.func, // method to handle mouseLeave on option element
		option: _propTypes2.default.object.isRequired, // object that is base for that option
		optionIndex: _propTypes2.default.number // index of the option, used to generate unique ids for aria
	};

	exports.default = Option;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(23);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Value = function (_React$Component) {
		_inherits(Value, _React$Component);

		function Value(props) {
			_classCallCheck(this, Value);

			var _this = _possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).call(this, props));

			_this.handleMouseDown = _this.handleMouseDown.bind(_this);
			_this.onRemove = _this.onRemove.bind(_this);
			_this.handleTouchEndRemove = _this.handleTouchEndRemove.bind(_this);
			_this.handleTouchMove = _this.handleTouchMove.bind(_this);
			_this.handleTouchStart = _this.handleTouchStart.bind(_this);
			return _this;
		}

		_createClass(Value, [{
			key: 'handleMouseDown',
			value: function handleMouseDown(event) {
				if (event.type === 'mousedown' && event.button !== 0) {
					return;
				}
				if (this.props.onClick) {
					event.stopPropagation();
					this.props.onClick(this.props.value, event);
					return;
				}
				if (this.props.value.href) {
					event.stopPropagation();
				}
			}
		}, {
			key: 'onRemove',
			value: function onRemove(event) {
				event.preventDefault();
				event.stopPropagation();
				this.props.onRemove(this.props.value);
			}
		}, {
			key: 'handleTouchEndRemove',
			value: function handleTouchEndRemove(event) {
				// Check if the view is being dragged, In this case
				// we don't want to fire the click event (because the user only wants to scroll)
				if (this.dragging) return;

				// Fire the mouse events
				this.onRemove(event);
			}
		}, {
			key: 'handleTouchMove',
			value: function handleTouchMove(event) {
				// Set a flag that the view is being dragged
				this.dragging = true;
			}
		}, {
			key: 'handleTouchStart',
			value: function handleTouchStart(event) {
				// Set a flag that the view is not being dragged
				this.dragging = false;
			}
		}, {
			key: 'renderRemoveIcon',
			value: function renderRemoveIcon() {
				if (this.props.disabled || !this.props.onRemove) return;
				return _react2.default.createElement(
					'span',
					{ className: 'Select-value-icon',
						'aria-hidden': 'true',
						onMouseDown: this.onRemove,
						onTouchEnd: this.handleTouchEndRemove,
						onTouchStart: this.handleTouchStart,
						onTouchMove: this.handleTouchMove },
					'\xD7'
				);
			}
		}, {
			key: 'renderLabel',
			value: function renderLabel() {
				var className = 'Select-value-label';
				return this.props.onClick || this.props.value.href ? _react2.default.createElement(
					'a',
					{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
					this.props.children
				) : _react2.default.createElement(
					'span',
					{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
					this.props.children
				);
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)('Select-value', this.props.value.className),
						style: this.props.value.style,
						title: this.props.value.title
					},
					this.renderRemoveIcon(),
					this.renderLabel()
				);
			}
		}]);

		return Value;
	}(_react2.default.Component);

	;

	Value.propTypes = {
		children: _propTypes2.default.node,
		disabled: _propTypes2.default.bool, // disabled prop passed to ReactSelect
		id: _propTypes2.default.string, // Unique id for the value - used for aria
		onClick: _propTypes2.default.func, // method to handle click on value label
		onRemove: _propTypes2.default.func, // method to handle removal of the value
		value: _propTypes2.default.object.isRequired // the option object for this value
	};

	exports.default = Value;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.defaultFilterOptions = exports.defaultClearRenderer = exports.defaultArrowRenderer = exports.defaultMenuRenderer = exports.Option = exports.Value = exports.Creatable = exports.AsyncCreatable = exports.Async = undefined;

	var _Select = __webpack_require__(39);

	var _Select2 = _interopRequireDefault(_Select);

	var _Async = __webpack_require__(104);

	var _Async2 = _interopRequireDefault(_Async);

	var _AsyncCreatable = __webpack_require__(287);

	var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

	var _Creatable = __webpack_require__(105);

	var _Creatable2 = _interopRequireDefault(_Creatable);

	var _Value = __webpack_require__(107);

	var _Value2 = _interopRequireDefault(_Value);

	var _Option = __webpack_require__(106);

	var _Option2 = _interopRequireDefault(_Option);

	var _defaultMenuRenderer = __webpack_require__(64);

	var _defaultMenuRenderer2 = _interopRequireDefault(_defaultMenuRenderer);

	var _defaultArrowRenderer = __webpack_require__(109);

	var _defaultArrowRenderer2 = _interopRequireDefault(_defaultArrowRenderer);

	var _defaultClearRenderer = __webpack_require__(110);

	var _defaultClearRenderer2 = _interopRequireDefault(_defaultClearRenderer);

	var _defaultFilterOptions = __webpack_require__(63);

	var _defaultFilterOptions2 = _interopRequireDefault(_defaultFilterOptions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_Select2.default.Async = _Async2.default;
	_Select2.default.AsyncCreatable = _AsyncCreatable2.default;
	_Select2.default.Creatable = _Creatable2.default;
	_Select2.default.Value = _Value2.default;
	_Select2.default.Option = _Option2.default;

	exports.default = _Select2.default;
	exports.Async = _Async2.default;
	exports.AsyncCreatable = _AsyncCreatable2.default;
	exports.Creatable = _Creatable2.default;
	exports.Value = _Value2.default;
	exports.Option = _Option2.default;
	exports.defaultMenuRenderer = _defaultMenuRenderer2.default;
	exports.defaultArrowRenderer = _defaultArrowRenderer2.default;
	exports.defaultClearRenderer = _defaultClearRenderer2.default;
	exports.defaultFilterOptions = _defaultFilterOptions2.default;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = arrowRenderer;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function arrowRenderer(_ref) {
		var onMouseDown = _ref.onMouseDown;

		return _react2.default.createElement('span', {
			className: 'Select-arrow',
			onMouseDown: onMouseDown
		});
	};

	arrowRenderer.propTypes = {
		onMouseDown: _propTypes2.default.func
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = clearRenderer;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function clearRenderer() {
		return _react2.default.createElement('span', {
			className: 'Select-clear',
			dangerouslySetInnerHTML: { __html: '&times;' }
		});
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = stripDiacritics;
	var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

	function stripDiacritics(str) {
		for (var i = 0; i < map.length; i++) {
			str = str.replace(map[i].letters, map[i].base);
		}
		return str;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(16))(410);

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);
	var bind = __webpack_require__(70);
	var Axios = __webpack_require__(115);
	var defaults = __webpack_require__(41);

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
	axios.Cancel = __webpack_require__(67);
	axios.CancelToken = __webpack_require__(114);
	axios.isCancel = __webpack_require__(68);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(129);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(67);

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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(41);
	var utils = __webpack_require__(4);
	var InterceptorManager = __webpack_require__(116);
	var dispatchRequest = __webpack_require__(117);
	var isAbsoluteURL = __webpack_require__(125);
	var combineURLs = __webpack_require__(123);

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
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);
	var transformData = __webpack_require__(120);
	var isCancel = __webpack_require__(68);
	var defaults = __webpack_require__(41);

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
/* 118 */
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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(69);

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
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

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
/* 121 */
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
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

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
/* 123 */
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
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

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
/* 125 */
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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

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
/* 129 */
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
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(145);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(148);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(149);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(151);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(150);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	var _apiActions = __webpack_require__(71);

	var apiCalls = _interopRequireWildcard(_apiActions);

	var _selectFromStore = __webpack_require__(8);

	var _EvaluationTemplatesDropdown = __webpack_require__(135);

	var _EvaluationTemplatesDropdown2 = _interopRequireDefault(_EvaluationTemplatesDropdown);

	var _EvaluationTypeDropdown = __webpack_require__(136);

	var _EvaluationTypeDropdown2 = _interopRequireDefault(_EvaluationTypeDropdown);

	var _RfqListDropdown = __webpack_require__(140);

	var _RfqListDropdown2 = _interopRequireDefault(_RfqListDropdown);

	var _MatchedSuppliersDropdown = __webpack_require__(138);

	var _MatchedSuppliersDropdown2 = _interopRequireDefault(_MatchedSuppliersDropdown);

	var _MatchedItemsDropdown = __webpack_require__(137);

	var _MatchedItemsDropdown2 = _interopRequireDefault(_MatchedItemsDropdown);

	var _EngagementsDropdown = __webpack_require__(132);

	var _EngagementsDropdown2 = _interopRequireDefault(_EngagementsDropdown);

	var _PreferredSuppliersDropdown = __webpack_require__(139);

	var _PreferredSuppliersDropdown2 = _interopRequireDefault(_PreferredSuppliersDropdown);

	var _EvaluationAssigneesSelect = __webpack_require__(133);

	var _EvaluationAssigneesSelect2 = _interopRequireDefault(_EvaluationAssigneesSelect);

	var _EvaluationAssignmentChairSelect = __webpack_require__(134);

	var _EvaluationAssignmentChairSelect2 = _interopRequireDefault(_EvaluationAssignmentChairSelect);

	var _ButtonSaveAssignment = __webpack_require__(131);

	var _ButtonSaveAssignment2 = _interopRequireDefault(_ButtonSaveAssignment);

	var _classnames = __webpack_require__(23);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EvaluationAssignment = function (_Component) {
	    (0, _inherits3.default)(EvaluationAssignment, _Component);

	    function EvaluationAssignment() {
	        (0, _classCallCheck3.default)(this, EvaluationAssignment);
	        return (0, _possibleConstructorReturn3.default)(this, (EvaluationAssignment.__proto__ || (0, _getPrototypeOf2.default)(EvaluationAssignment)).apply(this, arguments));
	    }

	    (0, _createClass3.default)(EvaluationAssignment, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var apiActions = this.props.apiActions;

	            apiActions.fetchEvaluationTemplates();
	            apiActions.fetchAssigneesStaff();
	            apiActions.fetchUser();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                evaluationTemplates = _props.evaluationTemplates,
	                selectedTemplateId = _props.selectedTemplateId,
	                evaluationTypeSelected = _props.evaluationTypeSelected,
	                rfqTypeSelectedId = _props.rfqTypeSelectedId,
	                matchedSupplierId = _props.matchedSupplierId,
	                selectedAssignmentEntityInstanceId = _props.selectedAssignmentEntityInstanceId;


	            evaluationTemplates = evaluationTemplates.filter(function (item) {
	                return item.active === 1;
	            });
	            var columnWidth = (0, _classnames2.default)('form-group', {
	                'col-sm-4': rfqTypeSelectedId !== '' && (evaluationTypeSelected === '2' || evaluationTypeSelected === '1'),
	                'col-sm-6': rfqTypeSelectedId === ''
	            });

	            return _react2.default.createElement(
	                'div',
	                { id: 'searcher-evaluation-assignment-container', className: 'db-form-section' },
	                _react2.default.createElement(
	                    'form',
	                    null,
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-sm-4 form-group' },
	                            _react2.default.createElement(
	                                'label',
	                                { htmlFor: 'evaluationTemplate', className: 'control-label' },
	                                'Evaluation Template'
	                            ),
	                            _react2.default.createElement(_EvaluationTemplatesDropdown2.default, { evaluationTemplates: evaluationTemplates })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        selectedTemplateId !== '' ? _react2.default.createElement(
	                            'div',
	                            { className: columnWidth },
	                            _react2.default.createElement(
	                                'label',
	                                { htmlFor: 'evaluationIsOn', className: 'control-label' },
	                                'Evaluation Type'
	                            ),
	                            _react2.default.createElement(_EvaluationTypeDropdown2.default, null)
	                        ) : null,
	                        evaluationTypeSelected === '2' || evaluationTypeSelected === '1' ? _react2.default.createElement(
	                            'div',
	                            { className: columnWidth },
	                            _react2.default.createElement(
	                                'label',
	                                { htmlFor: 'evaluationLink', className: 'control-label' },
	                                'RFQ List'
	                            ),
	                            _react2.default.createElement(_RfqListDropdown2.default, null)
	                        ) : null,
	                        rfqTypeSelectedId !== '' && (evaluationTypeSelected === '2' || evaluationTypeSelected === '1') ? _react2.default.createElement(
	                            'div',
	                            { className: columnWidth },
	                            _react2.default.createElement(
	                                'label',
	                                { htmlFor: 'evaluationLink' },
	                                'Matched Suppliers'
	                            ),
	                            _react2.default.createElement(_MatchedSuppliersDropdown2.default, null)
	                        ) : null
	                    ),
	                    matchedSupplierId !== '' && evaluationTypeSelected === '2' ? _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-sm-4' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'row' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'col-sm-2 text-center' },
	                                    _react2.default.createElement('br', null),
	                                    _react2.default.createElement('br', null),
	                                    _react2.default.createElement(
	                                        'span',
	                                        null,
	                                        '\u21B3'
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'col-sm-10' },
	                                    _react2.default.createElement(
	                                        'label',
	                                        { htmlFor: 'evaluationLink' },
	                                        'Matched Items'
	                                    ),
	                                    _react2.default.createElement(_MatchedItemsDropdown2.default, null)
	                                )
	                            )
	                        )
	                    ) : null,
	                    evaluationTypeSelected === '4' ? _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-sm-4 form-group' },
	                            _react2.default.createElement(
	                                'label',
	                                { htmlFor: 'evaluationLink' },
	                                'Engagements'
	                            ),
	                            _react2.default.createElement(_EngagementsDropdown2.default, null)
	                        )
	                    ) : null,
	                    evaluationTypeSelected === '3' ? _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-sm-4 form-group' },
	                            _react2.default.createElement(
	                                'label',
	                                { htmlFor: 'evaluationLink' },
	                                'Suppliers'
	                            ),
	                            _react2.default.createElement(_PreferredSuppliersDropdown2.default, null)
	                        )
	                    ) : null,
	                    selectedAssignmentEntityInstanceId !== '' ? _react2.default.createElement(
	                        'div',
	                        { className: 'row' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-sm-12' },
	                            _react2.default.createElement('hr', null)
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-sm-4 form-group' },
	                            _react2.default.createElement(_EvaluationAssignmentChairSelect2.default, null)
	                        ),
	                        _react2.default.createElement('div', { className: 'col-sm-12' }),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'col-sm-4 form-group' },
	                            _react2.default.createElement(_EvaluationAssigneesSelect2.default, null)
	                        )
	                    ) : null,
	                    _react2.default.createElement(_ButtonSaveAssignment2.default, null)
	                )
	            );
	        }
	    }]);
	    return EvaluationAssignment;
	}(_react.Component);

	EvaluationAssignment.propTypes = {
	    evaluationTemplates: _react.PropTypes.array.isRequired,
	    selectedTemplateId: _react.PropTypes.string.isRequired,
	    evaluationTypeSelected: _react.PropTypes.string.isRequired,
	    rfqTypeSelectedId: _react.PropTypes.string.isRequired,
	    matchedSupplierId: _react.PropTypes.string.isRequired,
	    isLoading: _react.PropTypes.bool.isRequired,
	    selectedAssignmentEntityInstanceId: _react.PropTypes.string.isRequired,
	    matchedSuppliersIsLoading: _react.PropTypes.bool,
	    actions: _react.PropTypes.object,
	    apiActions: _react.PropTypes.object,
	    columnWidth: _react.PropTypes.string
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch),
	        apiActions: (0, _redux.bindActionCreators)(apiCalls, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var _state$evaluationAssi = state.evaluationAssignment,
	        evaluationTypeSelected = _state$evaluationAssi.evaluationTypeSelected,
	        isLoading = _state$evaluationAssi.isLoading,
	        selectedTemplateId = _state$evaluationAssi.selectedTemplateId,
	        selectedAssignmentEntityInstanceId = _state$evaluationAssi.selectedAssignmentEntityInstanceId,
	        rfqTypeSelectedId = _state$evaluationAssi.rfqTypeSelectedId,
	        matchedSupplierId = _state$evaluationAssi.matchedSupplierId;


	    var evaluationTemplates = (0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/evaluation-templates', 'evaluationTemplates');

	    return (0, _extends3.default)({}, ownProps, {
	        selectedTemplateId: selectedTemplateId,
	        evaluationTemplates: evaluationTemplates,
	        matchedSupplierId: matchedSupplierId,
	        evaluationTypeSelected: evaluationTypeSelected,
	        selectedAssignmentEntityInstanceId: selectedAssignmentEntityInstanceId,
	        rfqTypeSelectedId: rfqTypeSelectedId,
	        isLoading: isLoading
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EvaluationAssignment);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(EvaluationAssignment, 'EvaluationAssignment', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/EvaluationAssignment.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/EvaluationAssignment.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/EvaluationAssignment.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/EvaluationAssignment.js');
	})();

	;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ButtonSaveAssignment = function ButtonSaveAssignment(_ref) {
	    var selectedAssignees = _ref.selectedAssignees,
	        selectedAssignmentEntityInstanceId = _ref.selectedAssignmentEntityInstanceId,
	        currentUser = _ref.currentUser,
	        actions = _ref.actions;
	    return _react2.default.createElement(
	        'div',
	        null,
	        (selectedAssignmentEntityInstanceId === '' || selectedAssignees.length === 0) && currentUser.role !== 'Standard User' ? _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	                'div',
	                { className: 'col-sm-4' },
	                _react2.default.createElement(
	                    'button',
	                    { title: 'Save', disabled: true, className: 'btn btn-md disabled', type: 'button' },
	                    'Save'
	                )
	            )
	        ) : _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	                'div',
	                { className: 'col-sm-4' },
	                _react2.default.createElement(
	                    'button',
	                    { title: 'Save', className: 'btn btn-md ', type: 'button', onClick: actions.createAssignment },
	                    'Save'
	                )
	            )
	        )
	    );
	};

	ButtonSaveAssignment.propTypes = {
	    actions: _propTypes2.default.object,
	    selectedAssignmentEntityInstanceId: _propTypes2.default.string.isRequired,
	    selectedAssignees: _propTypes2.default.array.isRequired,
	    currentUser: _propTypes2.default.object
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var _state$evaluationAssi = state.evaluationAssignment,
	        selectedAssignees = _state$evaluationAssi.selectedAssignees,
	        selectedAssignmentEntityInstanceId = _state$evaluationAssi.selectedAssignmentEntityInstanceId,
	        currentUser = _state$evaluationAssi.currentUser;


	    return (0, _extends3.default)({}, ownProps, {
	        selectedAssignees: selectedAssignees,
	        selectedAssignmentEntityInstanceId: selectedAssignmentEntityInstanceId,
	        currentUser: currentUser
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ButtonSaveAssignment);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(ButtonSaveAssignment, 'ButtonSaveAssignment', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/ButtonSaveAssignment.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/ButtonSaveAssignment.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/ButtonSaveAssignment.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/ButtonSaveAssignment.js');
	})();

	;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _selectFromStore = __webpack_require__(8);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EngagementsDropdown = function EngagementsDropdown(_ref) {
	    var evaluationEngagements = _ref.evaluationEngagements,
	        isLoading = _ref.isLoading,
	        actions = _ref.actions;
	    return _react2.default.createElement(
	        'div',
	        null,
	        !isLoading ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'select',
	                { name: 'evaluationLink',
	                    className: 'form-control',
	                    onChange: function onChange(event) {
	                        return actions.updateChangeEngagements(event.target.value);
	                    } },
	                _react2.default.createElement(
	                    'option',
	                    { key: '-', value: null },
	                    'Select Engagement'
	                ),
	                evaluationEngagements.map(function (item, index) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: index, value: item.id },
	                        '#',
	                        item.id,
	                        ' \u2013 ',
	                        item.supplier.title
	                    );
	                })
	            )
	        ) : _react2.default.createElement(
	            'div',
	            { className: 'input-group' },
	            _react2.default.createElement(
	                'select',
	                { className: 'form-control', disabled: true },
	                _react2.default.createElement(
	                    'option',
	                    null,
	                    'Loading Engagements ...'
	                )
	            ),
	            _react2.default.createElement('span', { className: 'spinner-animation form-control-feedback' })
	        )
	    );
	};

	EngagementsDropdown.propTypes = {
	    actions: _propTypes2.default.object,
	    isLoading: _propTypes2.default.bool,
	    evaluationEngagements: _propTypes2.default.array.isRequired
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var isLoading = state.evaluationAssignment.meta['/engagements'].loading;
	    var evaluationEngagements = (0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/engagements', 'engagements');

	    return (0, _extends3.default)({}, ownProps, {
	        isLoading: isLoading,
	        evaluationEngagements: evaluationEngagements
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EngagementsDropdown);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(EngagementsDropdown, 'EngagementsDropdown', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EngagementsDropdown.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EngagementsDropdown.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EngagementsDropdown.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EngagementsDropdown.js');
	})();

	;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _reactSelect = __webpack_require__(108);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	var _selectFromStore = __webpack_require__(8);

	var _concatLabelKey = __webpack_require__(73);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EvaluationAssigneesSelect = function EvaluationAssigneesSelect(_ref) {
	    var evaluationAssignees = _ref.evaluationAssignees,
	        actions = _ref.actions,
	        selectedAssignees = _ref.selectedAssignees,
	        currentUser = _ref.currentUser;
	    return _react2.default.createElement(
	        'div',
	        null,
	        currentUser.role === 'Standard User' ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'select',
	                { className: 'form-control', disabled: true },
	                _react2.default.createElement(
	                    'option',
	                    null,
	                    currentUser.firstName + ' ' + currentUser.lastName
	                )
	            )
	        ) : _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'label',
	                { htmlFor: 'assignees' },
	                'Evaluation Assignees'
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'input-group' },
	                _react2.default.createElement(_reactSelect2.default, {
	                    className: 'pm-react-select',
	                    labelKey: 'fullName',
	                    closeOnSelect: true,
	                    multi: true,
	                    backspaceToRemoveMessage: "",
	                    onChange: actions.updateSelectedAssignees,
	                    options: evaluationAssignees,
	                    placeholder: 'Select Assignees',
	                    removeSelected: true,
	                    value: selectedAssignees
	                })
	            )
	        )
	    );
	};

	EvaluationAssigneesSelect.propTypes = {
	    actions: _propTypes2.default.object,
	    evaluationAssignees: _propTypes2.default.array.isRequired,
	    selectedAssignees: _propTypes2.default.array.isRequired,
	    currentUser: _propTypes2.default.object
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var _state$evaluationAssi = state.evaluationAssignment,
	        selectedAssignees = _state$evaluationAssi.selectedAssignees,
	        currentUser = _state$evaluationAssi.currentUser;

	    var evaluationAssignees = (0, _concatLabelKey.concatLabelKey)((0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/staff', 'staff'));

	    return (0, _extends3.default)({}, ownProps, {
	        selectedAssignees: selectedAssignees,
	        evaluationAssignees: evaluationAssignees,
	        currentUser: currentUser
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EvaluationAssigneesSelect);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(EvaluationAssigneesSelect, 'EvaluationAssigneesSelect', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationAssigneesSelect.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationAssigneesSelect.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationAssigneesSelect.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationAssigneesSelect.js');
	})();

	;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _selectFromStore = __webpack_require__(8);

	var _concatLabelKey = __webpack_require__(73);

	var _reactSelect = __webpack_require__(108);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EvaluationAssignmentChairSelect = function EvaluationAssignmentChairSelect(_ref) {
	    var evaluationAssignees = _ref.evaluationAssignees,
	        actions = _ref.actions,
	        selectedAssigneeChairman = _ref.selectedAssigneeChairman,
	        currentUser = _ref.currentUser;
	    return _react2.default.createElement(
	        'div',
	        null,
	        currentUser.role === 'Standard User' ? null : _react2.default.createElement(
	            'div',
	            { className: 'input-group' },
	            _react2.default.createElement(
	                'label',
	                { htmlFor: 'assignees' },
	                'Evaluation Assignment Chair'
	            ),
	            _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_reactSelect2.default, {
	                    className: 'pm-react-select',
	                    labelKey: 'fullName',
	                    closeOnSelect: true,
	                    onChange: actions.updateSelectedAssigneeChairman,
	                    options: evaluationAssignees,
	                    placeholder: 'Select Assignment Chair',
	                    removeSelected: true,
	                    value: selectedAssigneeChairman
	                })
	            )
	        )
	    );
	};

	EvaluationAssignmentChairSelect.propTypes = {
	    actions: _propTypes2.default.object,
	    evaluationAssignees: _propTypes2.default.array.isRequired,
	    selectedAssigneeChairman: _propTypes2.default.object,
	    currentUser: _propTypes2.default.object
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var _state$evaluationAssi = state.evaluationAssignment,
	        currentUser = _state$evaluationAssi.currentUser,
	        selectedAssigneeChairman = _state$evaluationAssi.selectedAssigneeChairman;

	    var evaluationAssignees = (0, _concatLabelKey.concatLabelKey)((0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/staff', 'staff'));

	    return (0, _extends3.default)({}, ownProps, {
	        evaluationAssignees: evaluationAssignees,
	        selectedAssigneeChairman: selectedAssigneeChairman,
	        currentUser: currentUser
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EvaluationAssignmentChairSelect);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(EvaluationAssignmentChairSelect, 'EvaluationAssignmentChairSelect', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationAssignmentChairSelect.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationAssignmentChairSelect.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationAssignmentChairSelect.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationAssignmentChairSelect.js');
	})();

	;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EvaluationTemplatesDropdown = function EvaluationTemplatesDropdown(_ref) {
	    var evaluationTemplates = _ref.evaluationTemplates,
	        actions = _ref.actions;
	    return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	            'select',
	            { name: 'evaluationTemplate',
	                className: 'form-control',
	                onChange: function onChange(evt) {
	                    return actions.evaluationTemplateUpdateChange(evt.target.value);
	                } },
	            _react2.default.createElement(
	                'option',
	                { key: '-', value: null },
	                'Select Template'
	            ),
	            evaluationTemplates.map(function (item) {
	                return _react2.default.createElement(
	                    'option',
	                    { key: item.id, value: item.id },
	                    item.title
	                );
	            })
	        )
	    );
	};

	EvaluationTemplatesDropdown.propTypes = {
	    actions: _propTypes2.default.object,
	    evaluationTemplates: _propTypes2.default.array.isRequired
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var _default = (0, _reactRedux.connect)(null, mapDispatchToProps)(EvaluationTemplatesDropdown);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(EvaluationTemplatesDropdown, 'EvaluationTemplatesDropdown', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationTemplatesDropdown.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationTemplatesDropdown.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationTemplatesDropdown.js');
	})();

	;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _selectFromStore = __webpack_require__(8);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EvaluationTypeDropdown = function EvaluationTypeDropdown(_ref) {
	    var evaluationTypes = _ref.evaluationTypes,
	        actions = _ref.actions,
	        isLoading = _ref.isLoading;
	    return _react2.default.createElement(
	        'div',
	        null,
	        !isLoading ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'select',
	                { name: 'evaluationIsOn',
	                    className: 'form-control',
	                    onChange: function onChange(evt) {
	                        return actions.updateChangeEvaluationType(evt.target.value);
	                    } },
	                _react2.default.createElement(
	                    'option',
	                    { key: '-', value: null },
	                    'Select Evaluation Type'
	                ),
	                evaluationTypes.map(function (item) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: item.id, value: item.id },
	                        item.title
	                    );
	                })
	            )
	        ) : _react2.default.createElement(
	            'div',
	            { className: 'input-group' },
	            _react2.default.createElement(
	                'select',
	                { className: 'form-control', disabled: true },
	                _react2.default.createElement(
	                    'option',
	                    null,
	                    'Loading Evaluation Types ...'
	                )
	            ),
	            _react2.default.createElement('span', { className: 'spinner-animation form-control-feedback' })
	        )
	    );
	};

	EvaluationTypeDropdown.propTypes = {
	    actions: _propTypes2.default.object,
	    isLoading: _propTypes2.default.bool,
	    evaluationTypes: _propTypes2.default.array.isRequired
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var isLoading = state.evaluationAssignment.meta['/evaluation-template-assignment-types'].loading;
	    var evaluationTypes = (0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/evaluation-template-assignment-types', 'evaluationTemplateAssignmentTypes');
	    return (0, _extends3.default)({}, ownProps, {
	        evaluationTypes: evaluationTypes,
	        isLoading: isLoading
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EvaluationTypeDropdown);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(EvaluationTypeDropdown, 'EvaluationTypeDropdown', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationTypeDropdown.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationTypeDropdown.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationTypeDropdown.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/EvaluationTypeDropdown.js');
	})();

	;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _selectFromStore = __webpack_require__(8);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MatchedItemsDropdown = function MatchedItemsDropdown(_ref) {
	    var matchedItems = _ref.matchedItems,
	        isLoading = _ref.isLoading,
	        actions = _ref.actions;
	    return _react2.default.createElement(
	        'div',
	        null,
	        !isLoading ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'select',
	                { name: 'evaluationLink',
	                    className: 'form-control',
	                    onChange: function onChange(event) {
	                        return actions.updateChangeMatchedItems(event.target.value);
	                    } },
	                _react2.default.createElement(
	                    'option',
	                    { key: '-', value: null },
	                    'Select RFQ Item'
	                ),
	                matchedItems.map(function (item, index) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: index, value: item.id },
	                        item.title
	                    );
	                })
	            )
	        ) : _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'div',
	                { className: 'input-group' },
	                _react2.default.createElement(
	                    'select',
	                    { className: 'form-control', disabled: true },
	                    _react2.default.createElement(
	                        'option',
	                        null,
	                        'Loading RFQ Items...'
	                    )
	                ),
	                _react2.default.createElement('span', { className: 'spinner-animation form-control-feedback' })
	            )
	        )
	    );
	};

	MatchedItemsDropdown.propTypes = {
	    actions: _propTypes2.default.object,
	    isLoading: _propTypes2.default.bool,
	    matchedItems: _propTypes2.default.array.isRequired
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var _state$evaluationAssi = state.evaluationAssignment,
	        rfqTypeSelectedId = _state$evaluationAssi.rfqTypeSelectedId,
	        matchedSupplierId = _state$evaluationAssi.matchedSupplierId;

	    var isLoading = state.evaluationAssignment.meta['/request-for-quotations/' + rfqTypeSelectedId + '/matched-suppliers/' + matchedSupplierId + '/matched-items'].loading;
	    var matchedItems = (0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/request-for-quotations/' + rfqTypeSelectedId + '/matched-suppliers/' + matchedSupplierId + '/matched-items', 'matchedItems');

	    return (0, _extends3.default)({}, ownProps, {
	        isLoading: isLoading,
	        matchedItems: matchedItems
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MatchedItemsDropdown);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(MatchedItemsDropdown, 'MatchedItemsDropdown', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/MatchedItemsDropdown.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/MatchedItemsDropdown.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/MatchedItemsDropdown.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/MatchedItemsDropdown.js');
	})();

	;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _selectFromStore = __webpack_require__(8);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MatchedSuppliersDropdown = function MatchedSuppliersDropdown(_ref) {
	    var matchedSuppliers = _ref.matchedSuppliers,
	        actions = _ref.actions,
	        isLoading = _ref.isLoading;
	    return _react2.default.createElement(
	        'div',
	        null,
	        !isLoading ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'select',
	                { name: 'evaluationLink',
	                    className: 'form-control ' + (matchedSuppliers.length === 0 ? 'hidden' : 'visible'),
	                    onChange: function onChange(event) {
	                        return actions.updateChangeMatchedSuppliers(event.target.value);
	                    } },
	                _react2.default.createElement(
	                    'option',
	                    { key: '-', value: null },
	                    'Select Supplier'
	                ),
	                matchedSuppliers.map(function (item, index) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: index, value: item.id },
	                        item.title
	                    );
	                })
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'bs-callout bs-callout-warning ' + (matchedSuppliers.length === 0 ? 'visible' : 'hidden') },
	                'The selected RFQ does not match any suppliers, please select other option.'
	            )
	        ) : _react2.default.createElement(
	            'div',
	            { className: 'input-group' },
	            _react2.default.createElement(
	                'select',
	                { className: 'form-control', disabled: true },
	                _react2.default.createElement(
	                    'option',
	                    null,
	                    'Loading Suppliers ...'
	                )
	            ),
	            _react2.default.createElement('span', { className: 'spinner-animation form-control-feedback' })
	        )
	    );
	};

	MatchedSuppliersDropdown.propTypes = {
	    actions: _propTypes2.default.object,
	    matchedSuppliers: _propTypes2.default.array.isRequired,
	    isLoading: _propTypes2.default.bool.isRequired
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var rfqTypeSelectedId = state.evaluationAssignment.rfqTypeSelectedId;

	    var isLoading = state.evaluationAssignment.meta['/request-for-quotations/' + rfqTypeSelectedId + '/matched-suppliers'].loading;
	    var matchedSuppliers = (0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/request-for-quotations/' + rfqTypeSelectedId + '/matched-suppliers', 'matchedSuppliers');
	    return (0, _extends3.default)({}, ownProps, {
	        isLoading: isLoading,
	        matchedSuppliers: matchedSuppliers
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MatchedSuppliersDropdown);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(MatchedSuppliersDropdown, 'MatchedSuppliersDropdown', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/MatchedSuppliersDropdown.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/MatchedSuppliersDropdown.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/MatchedSuppliersDropdown.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/MatchedSuppliersDropdown.js');
	})();

	;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _selectFromStore = __webpack_require__(8);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PreferredSuppliersDropdown = function PreferredSuppliersDropdown(_ref) {
	    var evaluationSuppliers = _ref.evaluationSuppliers,
	        isLoading = _ref.isLoading,
	        actions = _ref.actions;
	    return _react2.default.createElement(
	        'div',
	        null,
	        !isLoading ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'select',
	                { name: 'evaluationLink',
	                    className: 'form-control',
	                    onChange: function onChange(event) {
	                        return actions.updateChangeSuppliers(event.target.value);
	                    } },
	                _react2.default.createElement(
	                    'option',
	                    { key: '-', value: null },
	                    'Select Supplier'
	                ),
	                evaluationSuppliers.map(function (item, index) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: index, value: item.id },
	                        item.supplier.title
	                    );
	                })
	            )
	        ) : _react2.default.createElement(
	            'div',
	            { className: 'input-group' },
	            _react2.default.createElement(
	                'select',
	                { className: 'form-control', disabled: true },
	                _react2.default.createElement(
	                    'option',
	                    null,
	                    'Loading Suppliers ...'
	                )
	            ),
	            _react2.default.createElement('span', { className: 'spinner-animation form-control-feedback' })
	        )
	    );
	};

	PreferredSuppliersDropdown.propTypes = {
	    actions: _propTypes2.default.object,
	    isLoading: _propTypes2.default.bool,
	    evaluationSuppliers: _propTypes2.default.array.isRequired
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var isLoading = state.evaluationAssignment.meta['/preferred-suppliers'].loading;
	    var evaluationSuppliers = (0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/preferred-suppliers', 'preferredSuppliers');

	    return (0, _extends3.default)({}, ownProps, {
	        isLoading: isLoading,
	        evaluationSuppliers: evaluationSuppliers
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PreferredSuppliersDropdown);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(PreferredSuppliersDropdown, 'PreferredSuppliersDropdown', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/PreferredSuppliersDropdown.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/PreferredSuppliersDropdown.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/PreferredSuppliersDropdown.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/PreferredSuppliersDropdown.js');
	})();

	;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactRedux = __webpack_require__(6);

	var _redux = __webpack_require__(3);

	var _selectFromStore = __webpack_require__(8);

	var _evaluationAssignmentsAction = __webpack_require__(7);

	var actions = _interopRequireWildcard(_evaluationAssignmentsAction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RfqListDropdown = function RfqListDropdown(_ref) {
	    var evaluationTypesRfq = _ref.evaluationTypesRfq,
	        isLoading = _ref.isLoading,
	        actions = _ref.actions;
	    return _react2.default.createElement(
	        'div',
	        null,
	        !isLoading ? _react2.default.createElement(
	            'div',
	            { className: 'input-group' },
	            _react2.default.createElement(
	                'select',
	                { name: 'evaluationLink',
	                    className: 'form-control',
	                    onChange: function onChange(event) {
	                        return actions.fetchMatchedSuppliers(event.target.value);
	                    } },
	                _react2.default.createElement(
	                    'option',
	                    { key: '-', value: null },
	                    'Select RFQ'
	                ),
	                evaluationTypesRfq.map(function (item, index) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: index, value: item.id },
	                        '#',
	                        item.id,
	                        ' \u2013 ',
	                        item.quoteTitle
	                    );
	                })
	            )
	        ) : _react2.default.createElement(
	            'div',
	            { className: 'input-group' },
	            _react2.default.createElement(
	                'select',
	                { className: 'form-control', disabled: true },
	                _react2.default.createElement(
	                    'option',
	                    null,
	                    'Loading RFQs...'
	                )
	            ),
	            _react2.default.createElement('span', { className: 'spinner-animation form-control-feedback' })
	        )
	    );
	};

	RfqListDropdown.propTypes = {
	    actions: _propTypes2.default.object,
	    evaluationTypesRfq: _propTypes2.default.array.isRequired,
	    isLoading: _propTypes2.default.bool.isRequired
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(actions, dispatch)
	    };
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    var isLoading = state.evaluationAssignment.meta['/request-for-quotations?filter[sent]=1&filter[archived]=0'].loading;
	    var evaluationTypesRfq = (0, _selectFromStore.selectFromStore)(state.evaluationAssignment, '/request-for-quotations', 'requestForQuotations');

	    return (0, _extends3.default)({}, ownProps, {
	        isLoading: isLoading,
	        evaluationTypesRfq: evaluationTypesRfq
	    });
	};

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RfqListDropdown);

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(RfqListDropdown, 'RfqListDropdown', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/RfqListDropdown.js');

	    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/RfqListDropdown.js');

	    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/RfqListDropdown.js');

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/containers/components/RfqListDropdown.js');
	})();

	;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(43);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	exports.evaluationAssignment = evaluationAssignment;

	var _deepmerge = __webpack_require__(188);

	var _deepmerge2 = _interopRequireDefault(_deepmerge);

	var _ActionTypes = __webpack_require__(72);

	var actionTypes = _interopRequireWildcard(_ActionTypes);

	var _api = __webpack_require__(42);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialState = {
	    selectedAssignees: [],
	    selectedAssigneeChairman: null,
	    selectedTemplateId: '',
	    selectedAssignmentEntityInstanceId: '',
	    evaluationTypeSelected: '',
	    rfqTypeSelectedId: '',
	    matchedSupplierId: '',
	    isLoading: false,
	    meta: {},
	    currentUser: {}
	};

	function evaluationAssignment() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];

	    switch (action.type) {

	        case _api.API_DATA_SUCCESS:
	            return (0, _deepmerge2.default)(state, (0, _deepmerge2.default)(action.response, { meta: (0, _defineProperty3.default)({}, action.endpoint, { loading: false }) }));

	        case _api.API_DATA_REQUEST:
	            return (0, _deepmerge2.default)(state, { meta: (0, _defineProperty3.default)({}, action.endpoint, { loading: true }) });

	        case actionTypes.ASSIGNMENT_CREATION_EVALUATION_TEMPLATE_UPDATE_CHANGE:
	            return (0, _extends3.default)({}, state, {
	                selectedTemplateId: action.templateId
	            });

	        case actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_EVALUATION_TYPE:
	            return (0, _extends3.default)({}, state, {
	                evaluationTypeSelected: action.evaluationType,
	                rfqTypeSelectedId: '',
	                matchedSupplierId: ''
	            });

	        case actionTypes.ASSIGNMENT_CREATION_UPDATE_CHANGE_RFQ:
	            return (0, _extends3.default)({}, state, {
	                rfqTypeSelectedId: action.rfqTypeId,
	                matchedSupplierId: ''
	            });

	        case actionTypes.ASSIGNMENT_CREATION_UPDATE_MATCHED_SUPPLIER_ID:
	            return (0, _extends3.default)({}, state, {
	                matchedSupplierId: action.matchedSupplierId
	            });

	        case actionTypes.ASSIGNMENT_CREATION_PREFERRED_SUPPLIERS_UPDATE_CHANGE:
	            return (0, _extends3.default)({}, state);

	        case actionTypes.ASSIGNMENT_CREATION_ASSIGNEES_CHANGE_UPDATE:
	            return (0, _extends3.default)({}, state, {
	                selectedAssignees: action.assignees
	            });

	        case actionTypes.ASSIGNMENT_CREATION_ASSIGNEES_CHAIRMAN_CHANGE_UPDATE:
	            return (0, _extends3.default)({}, state, {
	                selectedAssigneeChairman: action.assigneeChairman
	            });

	        case actionTypes.ASSIGNMENT_CREATION_SET_ASSIGNMENT_ENTITY_INSTANCE_ID:
	            return (0, _extends3.default)({}, state, {
	                selectedAssignmentEntityInstanceId: action.selectedAssignmentEntityInstanceId
	            });

	        case actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_REQUEST_START:
	            return (0, _extends3.default)({}, state, {
	                isLoading: true
	            });

	        case actionTypes.ASSIGNMENT_CREATION_EVALUATION_ASSIGNMENT_CREATE_SUCCESS:
	            return (0, _extends3.default)({}, state, {
	                isLoading: false
	            });

	        case actionTypes.ASSIGNMENT_CREATION_SET_UPDATE_CURRENT_USER:
	            return (0, _extends3.default)({}, state, {
	                currentUser: action.currentUser
	            });

	        default:
	            return state;
	    }
	}
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/reducers/evaluationAssignmentsReducer.js');

	    __REACT_HOT_LOADER__.register(evaluationAssignment, 'evaluationAssignment', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/reducers/evaluationAssignmentsReducer.js');
	})();

	;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(3);

	var _evaluationAssignmentsReducer = __webpack_require__(141);

	var _default = (0, _redux.combineReducers)({
	    evaluationAssignment: _evaluationAssignmentsReducer.evaluationAssignment
	});

	exports.default = _default;
	;

	(function () {
	    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        return;
	    }

	    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/stan.zaichenko/Sites/plantminer-components/searcher-evaluation-assignment/src/reducers/index.js');
	})();

	;

/***/ },
/* 143 */
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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(153), __esModule: true };

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(155), __esModule: true };

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(156), __esModule: true };

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(158), __esModule: true };

/***/ },
/* 148 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(75);

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
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(146);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(144);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(77);

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
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(77);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(177);
	module.exports = __webpack_require__(9).Object.assign;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(178);
	var $Object = __webpack_require__(9).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(179);
	var $Object = __webpack_require__(9).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(180);
	module.exports = __webpack_require__(9).Object.getPrototypeOf;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(181);
	module.exports = __webpack_require__(9).Object.setPrototypeOf;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(184);
	__webpack_require__(182);
	__webpack_require__(185);
	__webpack_require__(186);
	module.exports = __webpack_require__(9).Symbol;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(183);
	__webpack_require__(187);
	module.exports = __webpack_require__(57).f('iterator');


/***/ },
/* 159 */
/***/ function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ },
/* 160 */
/***/ function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(19);
	var toLength = __webpack_require__(175);
	var toAbsoluteIndex = __webpack_require__(174);
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
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(27);
	var gOPS = __webpack_require__(49);
	var pIE = __webpack_require__(28);
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
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(10).document;
	module.exports = document && document.documentElement;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(78);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(48);
	var descriptor = __webpack_require__(29);
	var setToStringTag = __webpack_require__(50);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(18)(IteratorPrototype, __webpack_require__(20)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ },
/* 166 */
/***/ function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var META = __webpack_require__(30)('meta');
	var isObject = __webpack_require__(25);
	var has = __webpack_require__(13);
	var setDesc = __webpack_require__(14).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(17)(function () {
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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys = __webpack_require__(27);
	var gOPS = __webpack_require__(49);
	var pIE = __webpack_require__(28);
	var toObject = __webpack_require__(54);
	var IObject = __webpack_require__(82);
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(17)(function () {
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
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(14);
	var anObject = __webpack_require__(24);
	var getKeys = __webpack_require__(27);

	module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(19);
	var gOPN = __webpack_require__(85).f;
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
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(12);
	var core = __webpack_require__(9);
	var fails = __webpack_require__(17);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(25);
	var anObject = __webpack_require__(24);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(79)(Function.call, __webpack_require__(84).f(Object.prototype, '__proto__').set, 2);
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
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(53);
	var defined = __webpack_require__(44);
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
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(53);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(53);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(160);
	var step = __webpack_require__(166);
	var Iterators = __webpack_require__(46);
	var toIObject = __webpack_require__(19);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(83)(Array, 'Array', function (iterated, kind) {
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
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(12);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(168) });


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(48) });


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(11), 'Object', { defineProperty: __webpack_require__(14).f });


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(54);
	var $getPrototypeOf = __webpack_require__(86);

	__webpack_require__(171)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(12);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(172).set });


/***/ },
/* 182 */
/***/ function(module, exports) {

	

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(173)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(83)(String, 'String', function (iterated) {
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
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(10);
	var has = __webpack_require__(13);
	var DESCRIPTORS = __webpack_require__(11);
	var $export = __webpack_require__(12);
	var redefine = __webpack_require__(88);
	var META = __webpack_require__(167).KEY;
	var $fails = __webpack_require__(17);
	var shared = __webpack_require__(52);
	var setToStringTag = __webpack_require__(50);
	var uid = __webpack_require__(30);
	var wks = __webpack_require__(20);
	var wksExt = __webpack_require__(57);
	var wksDefine = __webpack_require__(56);
	var enumKeys = __webpack_require__(162);
	var isArray = __webpack_require__(164);
	var anObject = __webpack_require__(24);
	var toIObject = __webpack_require__(19);
	var toPrimitive = __webpack_require__(55);
	var createDesc = __webpack_require__(29);
	var _create = __webpack_require__(48);
	var gOPNExt = __webpack_require__(170);
	var $GOPD = __webpack_require__(84);
	var $DP = __webpack_require__(14);
	var $keys = __webpack_require__(27);
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
	  __webpack_require__(85).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(28).f = $propertyIsEnumerable;
	  __webpack_require__(49).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(47)) {
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(18)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56)('asyncIterator');


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56)('observable');


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(176);
	var global = __webpack_require__(10);
	var hide = __webpack_require__(18);
	var Iterators = __webpack_require__(46);
	var TO_STRING_TAG = __webpack_require__(20)('toStringTag');

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
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.deepmerge = factory());
	}(this, (function () { 'use strict';

	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value)
			&& !isSpecial(value)
	};

	function isNonNullObject(value) {
		return !!value && typeof value === 'object'
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value)
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {}
	}

	function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
		var clone = !optionsArgument || optionsArgument.clone !== false;

		return (clone && isMergeableObject(value))
			? deepmerge(emptyTarget(value), value, optionsArgument)
			: value
	}

	function defaultArrayMerge(target, source, optionsArgument) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, optionsArgument)
		})
	}

	function mergeObject(target, source, optionsArgument) {
		var destination = {};
		if (isMergeableObject(target)) {
			Object.keys(target).forEach(function(key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
			});
		}
		Object.keys(source).forEach(function(key) {
			if (!isMergeableObject(source[key]) || !target[key]) {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
			} else {
				destination[key] = deepmerge(target[key], source[key], optionsArgument);
			}
		});
		return destination
	}

	function deepmerge(target, source, optionsArgument) {
		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var options = optionsArgument || { arrayMerge: defaultArrayMerge };
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, optionsArgument)
		} else if (sourceIsArray) {
			var arrayMerge = options.arrayMerge || defaultArrayMerge;
			return arrayMerge(target, source, optionsArgument)
		} else {
			return mergeObject(target, source, optionsArgument)
		}
	}

	deepmerge.all = function deepmergeAll(array, optionsArgument) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}

		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, optionsArgument)
		}, {})
	};

	var deepmerge_1 = deepmerge;

	return deepmerge_1;

	})));


/***/ },
/* 189 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 190 */
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
/* 191 */
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
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	module.exports=function(e){function t(i){if(a[i])return a[i].exports;var n=a[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){e.exports=a(1)},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function n(e){return(0,h.default)(e)?e:[e]}function r(e){return"[object Date]"===Object.prototype.toString.call(e)}function o(e){if(null===e||"object"!==("undefined"==typeof e?"undefined":c(e))||r(e))return e;if((0,h.default)(e))return e.map(o);var t={};return(0,x.default)(e).forEach(function(a){t[(0,y.default)(a)]=o(e[a])}),t}function u(e,t){var a=t.camelizeKeys,i={};return(0,x.default)(e).forEach(function(t){var n=e[t],r=a?(0,y.default)(t):t;i[r]={},"undefined"!=typeof n.data&&((0,h.default)(n.data)?i[r].data=n.data.map(function(e){return{id:e.id,type:a?(0,y.default)(e.type):e.type}}):(0,b.default)(n.data)?i[r].data=n.data:i[r].data={id:n.data.id,type:a?(0,y.default)(n.data.type):n.data.type},"undefined"!=typeof n.meta&&(i[r].meta=o(n.meta))),n.links&&(i[r].links=n.links)}),i}function d(e,t){var a=t.camelizeKeys,i={};return n(e).forEach(function(e){var t=a?(0,y.default)(e.type):e.type;i[t]=i[t]||{},i[t][e.id]=i[t][e.id]||{id:e.id},a?(i[t][e.id].attributes={},(0,x.default)(e.attributes).forEach(function(a){i[t][e.id].attributes[(0,y.default)(a)]=o(e.attributes[a])})):i[t][e.id].attributes=e.attributes,e.links&&(i[t][e.id].links={},(0,x.default)(e.links).forEach(function(a){i[t][e.id].links[a]=e.links[a]})),e.relationships&&(i[t][e.id].relationships=u(e.relationships,{camelizeKeys:a})),e.meta&&(i[t][e.id].meta=e.meta)}),i}function l(e){return e.replace(/\?.*$/,"")}function f(e,t,a){var i=a.camelizeKeys,r=a.filterEndpoint,o={};o.meta={};var d=void 0;if(r)o.meta[t]={},d=o.meta[t];else{var f=l(t);o.meta[f]={},o.meta[f][t.slice(f.length)]={},d=o.meta[f][t.slice(f.length)]}if(d.data={},e.data){var s=[];n(e.data).forEach(function(e){var t={id:e.id,type:i?(0,y.default)(e.type):e.type};e.relationships&&(t.relationships=u(e.relationships,{camelizeKeys:i})),s.push(t)}),d.data=s,e.links&&(d.links=e.links,o.meta[l(t)].links=e.links),e.meta&&(d.meta=e.meta)}return o}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a={},i=t.endpoint,n=t.filterEndpoint,r=t.camelizeKeys;if("undefined"==typeof n&&(n=!0),"undefined"==typeof r&&(r=!0),e.data&&(0,E.default)(a,d(e.data,{camelizeKeys:r})),e.included&&(0,E.default)(a,d(e.included,{camelizeKeys:r})),i){var o=n?l(i):i;(0,E.default)(a,f(e,o,{camelizeKeys:r,filterEndpoint:n}))}return a}Object.defineProperty(t,"__esModule",{value:!0});var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=s;var p=a(2),y=i(p),m=a(3),h=i(m),v=a(4),b=i(v),k=a(5),x=i(k),z=a(6),E=i(z)},function(e,t){e.exports=__webpack_require__(269)},function(e,t){e.exports=__webpack_require__(36)},function(e,t){e.exports=__webpack_require__(274)},function(e,t){e.exports=__webpack_require__(277)},function(e,t){e.exports=__webpack_require__(278)}]);

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(234),
	    hashDelete = __webpack_require__(235),
	    hashGet = __webpack_require__(236),
	    hashHas = __webpack_require__(237),
	    hashSet = __webpack_require__(238);

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
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(248),
	    mapCacheDelete = __webpack_require__(249),
	    mapCacheGet = __webpack_require__(250),
	    mapCacheHas = __webpack_require__(251),
	    mapCacheSet = __webpack_require__(252);

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
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(31),
	    stackClear = __webpack_require__(260),
	    stackDelete = __webpack_require__(261),
	    stackGet = __webpack_require__(262),
	    stackHas = __webpack_require__(263),
	    stackSet = __webpack_require__(264);

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
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(21);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 197 */
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
/* 198 */
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
/* 199 */
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
/* 200 */
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
/* 201 */
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
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(59),
	    eq = __webpack_require__(35);

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
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);

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
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(227);

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
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(26),
	    isObjectLike = __webpack_require__(22);

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
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(62),
	    isMasked = __webpack_require__(242),
	    isObject = __webpack_require__(15),
	    toSource = __webpack_require__(266);

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
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(26),
	    isLength = __webpack_require__(101),
	    isObjectLike = __webpack_require__(22);

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
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(61),
	    nativeKeys = __webpack_require__(253);

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
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15),
	    isPrototype = __webpack_require__(61),
	    nativeKeysIn = __webpack_require__(254);

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
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(195),
	    assignMergeValue = __webpack_require__(91),
	    baseFor = __webpack_require__(204),
	    baseMergeDeep = __webpack_require__(211),
	    isObject = __webpack_require__(15),
	    keysIn = __webpack_require__(103);

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
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(91),
	    cloneBuffer = __webpack_require__(221),
	    cloneTypedArray = __webpack_require__(222),
	    copyArray = __webpack_require__(223),
	    initCloneObject = __webpack_require__(239),
	    isArguments = __webpack_require__(99),
	    isArray = __webpack_require__(36),
	    isArrayLikeObject = __webpack_require__(273),
	    isBuffer = __webpack_require__(100),
	    isFunction = __webpack_require__(62),
	    isObject = __webpack_require__(15),
	    isPlainObject = __webpack_require__(275),
	    isTypedArray = __webpack_require__(102),
	    toPlainObject = __webpack_require__(280);

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
/* 212 */
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
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(98),
	    overRest = __webpack_require__(257),
	    setToString = __webpack_require__(258);

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
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(271),
	    defineProperty = __webpack_require__(92),
	    identity = __webpack_require__(98);

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
/* 215 */
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
/* 216 */
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
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(58),
	    arrayMap = __webpack_require__(198),
	    isArray = __webpack_require__(36),
	    isSymbol = __webpack_require__(276);

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
/* 218 */
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
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(215);

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
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(196);

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
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(21);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module)))

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(220);

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
/* 223 */
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
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(202),
	    baseAssignValue = __webpack_require__(59);

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
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(21);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(213),
	    isIterateeCall = __webpack_require__(240);

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
/* 227 */
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
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var castSlice = __webpack_require__(219),
	    hasUnicode = __webpack_require__(95),
	    stringToArray = __webpack_require__(265),
	    toString = __webpack_require__(38);

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
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(199),
	    deburr = __webpack_require__(272),
	    words = __webpack_require__(282);

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
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var basePropertyOf = __webpack_require__(212);

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
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(58);

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
/* 232 */
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
/* 233 */
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
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(34);

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
/* 235 */
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
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(34);

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
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(34);

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
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(34);

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
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(203),
	    getPrototype = __webpack_require__(94),
	    isPrototype = __webpack_require__(61);

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
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(35),
	    isArrayLike = __webpack_require__(37),
	    isIndex = __webpack_require__(96),
	    isObject = __webpack_require__(15);

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
/* 241 */
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
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(225);

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
/* 243 */
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
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(32);

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
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(32);

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
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(32);

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
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(32);

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
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(193),
	    ListCache = __webpack_require__(31),
	    Map = __webpack_require__(89);

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
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(33);

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
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(33);

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
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(33);

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
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(33);

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
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(97);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 254 */
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
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(93);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module)))

/***/ },
/* 256 */
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
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(197);

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
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(214),
	    shortOut = __webpack_require__(259);

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
/* 259 */
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
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(31);

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
/* 261 */
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
/* 262 */
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
/* 263 */
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
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(31),
	    Map = __webpack_require__(89),
	    MapCache = __webpack_require__(194);

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
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var asciiToArray = __webpack_require__(200),
	    hasUnicode = __webpack_require__(95),
	    unicodeToArray = __webpack_require__(267);

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
/* 266 */
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
/* 267 */
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
/* 268 */
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
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var capitalize = __webpack_require__(270),
	    createCompounder = __webpack_require__(229);

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
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(38),
	    upperFirst = __webpack_require__(281);

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
/* 271 */
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
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var deburrLetter = __webpack_require__(230),
	    toString = __webpack_require__(38);

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
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(37),
	    isObjectLike = __webpack_require__(22);

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
/* 274 */
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
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(26),
	    getPrototype = __webpack_require__(94),
	    isObjectLike = __webpack_require__(22);

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
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(26),
	    isObjectLike = __webpack_require__(22);

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
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(90),
	    baseKeys = __webpack_require__(208),
	    isArrayLike = __webpack_require__(37);

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
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(210),
	    createAssigner = __webpack_require__(226);

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
/* 279 */
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
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(224),
	    keysIn = __webpack_require__(103);

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
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var createCaseFirst = __webpack_require__(228);

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
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var asciiWords = __webpack_require__(201),
	    hasUnicodeWord = __webpack_require__(233),
	    toString = __webpack_require__(38),
	    unicodeWords = __webpack_require__(268);

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
/* 283 */
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
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(190);
	var invariant = __webpack_require__(191);
	var ReactPropTypesSecret = __webpack_require__(285);

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
/* 285 */
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
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var sizerStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		visibility: 'hidden',
		height: 0,
		overflow: 'scroll',
		whiteSpace: 'pre'
	};

	var INPUT_PROPS_BLACKLIST = ['injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

	var cleanInputProps = function cleanInputProps(inputProps) {
		INPUT_PROPS_BLACKLIST.forEach(function (field) {
			return delete inputProps[field];
		});
		return inputProps;
	};

	var copyStyles = function copyStyles(styles, node) {
		node.style.fontSize = styles.fontSize;
		node.style.fontFamily = styles.fontFamily;
		node.style.fontWeight = styles.fontWeight;
		node.style.fontStyle = styles.fontStyle;
		node.style.letterSpacing = styles.letterSpacing;
		node.style.textTransform = styles.textTransform;
	};

	var isIE = typeof window === 'undefined' ? false : /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);

	var generateId = function generateId() {
		// we only need an auto-generated ID for stylesheet injection, which is only
		// used for IE. so if the browser is not IE, this should return undefined.
		return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
	};

	var AutosizeInput = function (_Component) {
		_inherits(AutosizeInput, _Component);

		function AutosizeInput(props) {
			_classCallCheck(this, AutosizeInput);

			var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

			_this.inputRef = function (el) {
				_this.input = el;
				if (typeof _this.props.inputRef === 'function') {
					_this.props.inputRef(el);
				}
			};

			_this.placeHolderSizerRef = function (el) {
				_this.placeHolderSizer = el;
			};

			_this.sizerRef = function (el) {
				_this.sizer = el;
			};

			_this.state = {
				inputWidth: props.minWidth,
				inputId: props.id || generateId()
			};
			return _this;
		}

		_createClass(AutosizeInput, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.mounted = true;
				this.copyInputStyles();
				this.updateInputWidth();
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var id = nextProps.id;

				if (id !== this.props.id) {
					this.setState({ inputId: id || generateId() });
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps, prevState) {
				if (prevState.inputWidth !== this.state.inputWidth) {
					if (typeof this.props.onAutosize === 'function') {
						this.props.onAutosize(this.state.inputWidth);
					}
				}
				this.updateInputWidth();
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.mounted = false;
			}
		}, {
			key: 'copyInputStyles',
			value: function copyInputStyles() {
				if (!this.mounted || !window.getComputedStyle) {
					return;
				}
				var inputStyles = this.input && window.getComputedStyle(this.input);
				if (!inputStyles) {
					return;
				}
				copyStyles(inputStyles, this.sizer);
				if (this.placeHolderSizer) {
					copyStyles(inputStyles, this.placeHolderSizer);
				}
			}
		}, {
			key: 'updateInputWidth',
			value: function updateInputWidth() {
				if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
					return;
				}
				var newInputWidth = void 0;
				if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
					newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
				} else {
					newInputWidth = this.sizer.scrollWidth + 2;
				}
				// allow for stepper UI on number types
				if (this.props.type === 'number') {
					newInputWidth += 16;
				}
				if (newInputWidth < this.props.minWidth) {
					newInputWidth = this.props.minWidth;
				}
				if (newInputWidth !== this.state.inputWidth) {
					this.setState({
						inputWidth: newInputWidth
					});
				}
			}
		}, {
			key: 'getInput',
			value: function getInput() {
				return this.input;
			}
		}, {
			key: 'focus',
			value: function focus() {
				this.input.focus();
			}
		}, {
			key: 'blur',
			value: function blur() {
				this.input.blur();
			}
		}, {
			key: 'select',
			value: function select() {
				this.input.select();
			}
		}, {
			key: 'renderStyles',
			value: function renderStyles() {
				// this method injects styles to hide IE's clear indicator, which messes
				// with input size detection. the stylesheet is only injected when the
				// browser is IE, and can also be disabled by the `injectStyles` prop.
				var injectStyles = this.props.injectStyles;

				return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
						__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
					} }) : null;
			}
		}, {
			key: 'render',
			value: function render() {
				var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
					if (previousValue !== null && previousValue !== undefined) {
						return previousValue;
					}
					return currentValue;
				});

				var wrapperStyle = _extends({}, this.props.style);
				if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

				var inputStyle = _extends({
					boxSizing: 'content-box',
					width: this.state.inputWidth + 'px'
				}, this.props.inputStyle);

				var inputProps = _objectWithoutProperties(this.props, []);

				cleanInputProps(inputProps);
				inputProps.className = this.props.inputClassName;
				inputProps.id = this.state.inputId;
				inputProps.style = inputStyle;

				return _react2.default.createElement(
					'div',
					{ className: this.props.className, style: wrapperStyle },
					this.renderStyles(),
					_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
					_react2.default.createElement(
						'div',
						{ ref: this.sizerRef, style: sizerStyle },
						sizerValue
					),
					this.props.placeholder ? _react2.default.createElement(
						'div',
						{ ref: this.placeHolderSizerRef, style: sizerStyle },
						this.props.placeholder
					) : null
				);
			}
		}]);

		return AutosizeInput;
	}(_react.Component);

	;

	AutosizeInput.propTypes = {
		className: _propTypes2.default.string, // className for the outer element
		defaultValue: _propTypes2.default.any, // default field value
		id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
		injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
		inputClassName: _propTypes2.default.string, // className for the input element
		inputRef: _propTypes2.default.func, // ref callback for the input element
		inputStyle: _propTypes2.default.object, // css styles for the input element
		minWidth: _propTypes2.default.oneOfType([// minimum width for input element
		_propTypes2.default.number, _propTypes2.default.string]),
		onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
		onChange: _propTypes2.default.func, // onChange handler: function(newValue) {}
		placeholder: _propTypes2.default.string, // placeholder text
		placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
		style: _propTypes2.default.object, // css styles for the outer element
		value: _propTypes2.default.any // field value
	};
	AutosizeInput.defaultProps = {
		minWidth: 1,
		injectStyles: true
	};

	exports.default = AutosizeInput;

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Select = __webpack_require__(39);

	var _Select2 = _interopRequireDefault(_Select);

	var _Async = __webpack_require__(104);

	var _Async2 = _interopRequireDefault(_Async);

	var _Creatable = __webpack_require__(105);

	var _Creatable2 = _interopRequireDefault(_Creatable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AsyncCreatableSelect = function (_React$Component) {
		_inherits(AsyncCreatableSelect, _React$Component);

		function AsyncCreatableSelect() {
			_classCallCheck(this, AsyncCreatableSelect);

			return _possibleConstructorReturn(this, (AsyncCreatableSelect.__proto__ || Object.getPrototypeOf(AsyncCreatableSelect)).apply(this, arguments));
		}

		_createClass(AsyncCreatableSelect, [{
			key: 'focus',
			value: function focus() {
				this.select.focus();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				return _react2.default.createElement(
					_Async2.default,
					this.props,
					function (_ref) {
						var ref = _ref.ref,
						    asyncProps = _objectWithoutProperties(_ref, ['ref']);

						var asyncRef = ref;
						return _react2.default.createElement(
							_Creatable2.default,
							asyncProps,
							function (_ref2) {
								var ref = _ref2.ref,
								    creatableProps = _objectWithoutProperties(_ref2, ['ref']);

								var creatableRef = ref;
								return _this2.props.children(_extends({}, creatableProps, {
									ref: function ref(select) {
										creatableRef(select);
										asyncRef(select);
										_this2.select = select;
									}
								}));
							}
						);
					}
				);
			}
		}]);

		return AsyncCreatableSelect;
	}(_react2.default.Component);

	;

	function defaultChildren(props) {
		return _react2.default.createElement(_Select2.default, props);
	};

	AsyncCreatableSelect.propTypes = {
		children: _propTypes2.default.func.isRequired // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	};

	AsyncCreatableSelect.defaultProps = {
		children: defaultChildren
	};

	exports.default = AsyncCreatableSelect;

/***/ },
/* 288 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = trim;
	function trim(str) {
	    return str.replace(/^\s+|\s+$/g, '');
	}

/***/ },
/* 289 */
/***/ function(module, exports) {

	module.exports=function(e){function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){e.exports=t(1)},function(e,r){"use strict";function t(e,r){return r?""+e+r:null}function n(e,r,t,n,o){var a=n.ignoreLinks,u=r.relationships[t];if("undefined"!=typeof u.data)return Array.isArray(u.data)?u.data.map(function(r){return i(e,r.type,r.id,n,o)||r}):null===u.data?null:i(e,u.data.type,u.data.id,n,o)||u.data;if(!a&&u.links)throw new Error("Remote lazy loading is not supported (see: https://github.com/yury-dymov/json-api-normalizer/issues/2). To disable this error, include option 'ignoreLinks: true' in the build function like so: build(reducer, type, id, { ignoreLinks: true })")}function i(e,r){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},d={eager:!1,ignoreLinks:!1,includeType:!1},s=o({},d,u),c=s.eager,f=s.includeType;if(!e[r])return null;if(null===a||Array.isArray(a)){var p=a||Object.keys(e[r]);return p.map(function(t){return i(e,r,t,s,l)})}var y=a.toString(),v=t(r,y),b=l[v];if(b)return b;var g={},h=e[r][y];return h?(h.id&&(g.id=h.id),Object.keys(h.attributes).forEach(function(e){g[e]=h.attributes[e]}),h.meta&&(g.meta=h.meta),f&&!g.type&&(g.type=r),l[v]=g,h.relationships&&Object.keys(h.relationships).forEach(function(r){c?g[r]=n(e,h,r,s,l):Object.defineProperty(g,r,{enumerable:!0,get:function(){var t="__"+r;if(g[t])return g[t];var i=n(e,h,r,s,l);return Object.defineProperty(g,t,{enumerable:!1,value:i}),g[t]}})}),"undefined"==typeof g.id&&(g.id=y),g):null}Object.defineProperty(r,"__esModule",{value:!0});var o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e};r.default=i}]);

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(16))(1);

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(16))(543);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map