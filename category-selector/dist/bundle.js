!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var o=r(9),s=n(o),i=r(98),c=r(45),u=r(24),a=r(97),l=n(a),f=r(52),_=n(f),p=r(23),d=r(53),g=n(d),E=r(49),y=n(E);r(90);var T=(0,c.applyMiddleware)(l["default"]),h=(0,c.createStore)(_["default"],T);h.dispatch((0,p.setEndpointHost)(g["default"].configureHostname())),h.dispatch((0,p.setEndpointPath)("")),h.dispatch((0,p.setHeaders)(g["default"].configureHeaders())),(0,i.render)(s["default"].createElement(u.Provider,{store:h},s["default"].createElement(y["default"],null)),document.querySelector('[data-component="category-selector"]')),function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(T,"enhance","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/index.js"),__REACT_HOT_LOADER__.register(h,"store","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/index.js"))}()},function(e,t){e.exports=vendor_lib},function(e,t){var r=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},function(e,t,r){var n=r(39)("wks"),o=r(42),s=r(7).Symbol,i="function"==typeof s,c=e.exports=function(e){return n[e]||(n[e]=i&&s[e]||(i?s:o)("Symbol."+e))};c.store=n},function(e,t,r){var n=r(11);e.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},function(e,t,r){e.exports=!r(17)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t,r){var n=r(7),o=r(2),s=r(15),i=r(10),c="prototype",u=function(e,t,r){var a,l,f,_=e&u.F,p=e&u.G,d=e&u.S,g=e&u.P,E=e&u.B,y=e&u.W,T=p?o:o[t]||(o[t]={}),h=T[c],S=p?n:d?n[t]:(n[t]||{})[c];p&&(r=t);for(a in r)l=!_&&S&&void 0!==S[a],l&&a in T||(f=l?S[a]:r[a],T[a]=p&&"function"!=typeof S[a]?r[a]:E&&l?s(f,n):y&&S[a]==f?function(e){var t=function(t,r,n){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,r)}return new e(t,r,n)}return e.apply(this,arguments)};return t[c]=e[c],t}(f):g&&"function"==typeof f?s(Function.call,f):f,g&&((T.virtual||(T.virtual={}))[a]=f,e&u.R&&h&&!h[a]&&i(h,a,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,e.exports=u},function(e,t){var r=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(e,t){var r={}.hasOwnProperty;e.exports=function(e,t){return r.call(e,t)}},function(e,t,r){e.exports=r(1)(1)},function(e,t,r){var n=r(12),o=r(13);e.exports=r(5)?function(e,t,r){return n.f(e,t,o(1,r))}:function(e,t,r){return e[t]=r,e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,r){var n=r(4),o=r(35),s=r(41),i=Object.defineProperty;t.f=r(5)?Object.defineProperty:function(e,t,r){if(n(e),t=s(t,!0),n(r),o)try{return i(e,t,r)}catch(c){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(e[t]=r.value),e}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.SELECT_CATEGORY="SELECT_CATEGORY",n=t.SELECT_CATEGORY_TYPE="SELECT_CATEGORY_TYPE",o=t.REQUEST_CATEGORIES="REQUEST_CATEGORIES",s=t.RECEIVE_CATEGORIES="RECEIVE_CATEGORIES",i=t.REQUEST_FAILED="REQUEST_FAILED",c=t.RECEIVE_SUGGESTIONS="RECEIVE_SUGGESTIONS",u=t.RESET_SUGGESTIONS="RESET_SUGGESTIONS",a=t.UPDATE_INPUT="UPDATE_INPUT",l=t.ADD_DROPDOWN="ADD_DROPDOWN",f=t.RESET_DROPDOWNS="RESET_DROPDOWNS",_=t.SET_INITIAL_CATEGORY_SELECTOR_STATE="SET_INITIAL_CATEGORY_SELECTOR_STATE";!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(r,"SELECT_CATEGORY","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(n,"SELECT_CATEGORY_TYPE","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(o,"REQUEST_CATEGORIES","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(s,"RECEIVE_CATEGORIES","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(i,"REQUEST_FAILED","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(c,"RECEIVE_SUGGESTIONS","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(u,"RESET_SUGGESTIONS","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(a,"UPDATE_INPUT","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(l,"ADD_DROPDOWN","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(f,"RESET_DROPDOWNS","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(_,"SET_INITIAL_CATEGORY_SELECTOR_STATE","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"))}()},function(e,t,r){var n=r(62);e.exports=function(e,t,r){if(n(e),void 0===t)return e;switch(r){case 1:return function(r){return e.call(t,r)};case 2:return function(r,n){return e.call(t,r,n)};case 3:return function(r,n,o){return e.call(t,r,n,o)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t){e.exports={}},function(e,t,r){var n=r(39)("keys"),o=r(42);e.exports=function(e){return n[e]||(n[e]=o(e))}},function(e,t){var r=Math.ceil,n=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?n:r)(e)}},function(e,t,r){var n=r(67),o=r(16);e.exports=function(e){return n(o(e))}},function(e,t,r){var n=r(16);e.exports=function(e){return Object(n(e))}},function(e,t,r){e.exports=r(1)(207)},function(e,t,r){e.exports=r(1)(55)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){return{type:E.REQUEST_CATEGORIES,categoryType:e}}function s(e,t){return function(r){r({type:E.RECEIVE_CATEGORIES,categories:t,categoryType:e}),t.data&&t.data.length>0&&r(u())}}function i(e){return{type:E.REQUEST_FAILED,categoryType:e}}function c(e){return function(t){var r=e.attributes.title||"",n=e.attributes.service_type||"";return t(o(r)),new g["default"](function(e,o){t((0,y.readEndpoint)("categories?filters[service_type]="+n+"&fields[categories]=title,selectable&include=categories.categories.categories")).then(function(n){t(s(r,n)),e()})["catch"](function(){return o()})})}}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return{type:E.ADD_DROPDOWN,index:e}}function a(e){return function(t,r){var n=e.attributes.title,o=r().fetchedCategoryTypes[n]||{},s=!(!o.categories||!o.categories.hasOwnProperty("data"))&&o.categories.data.length;if(!o.isFetching&&!o.isApiError)return s?t(u()):void t(c(e))["catch"](function(){return t(i(n))})}}function l(){return{type:E.SET_INITIAL_CATEGORY_SELECTOR_STATE}}function f(e){var t=e.attributes.title;return function(e){return p(),e(l()),e({type:E.SELECT_CATEGORY_TYPE,categoryType:t})}}function _(e,t){return function(r,n){var o=!!e.relationships&&e.relationships.categories.data.length>0;return r({type:E.SELECT_CATEGORY,category:e,index:t}),e.attributes.selectable&&p(e.id,n()),r(o?u(t+1):(0,T.resetDropDowns)(t+1))}}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=document.getElementById("qr_category_id")||{},n=new Event("change");r.value=e,r.dispatchEvent=r.dispatchEvent||function(){},r.dispatchEvent(n),window.PlantminerComponents=window.PlantminerComponents||{},window.PlantminerComponents.categorySelector={selectedCategoryId:parseInt(e,10),dropDowns:t.categorySelector?t.categorySelector.dropDowns:{}}}Object.defineProperty(t,"__esModule",{value:!0});var d=r(94),g=n(d);t.requestCategories=o,t.receiveCategories=s,t.reportError=i,t.fetchCategories=c,t.addDropDown=u,t.fetchCategoriesIfNeeded=a,t.resetSelectedTypes=l,t.selectType=f,t.selectCategory=_,t.triggerDomChanges=p;var E=r(14),y=r(23),T=r(26);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(o,"requestCategories","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(s,"receiveCategories","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(i,"reportError","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(c,"fetchCategories","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(u,"addDropDown","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(a,"fetchCategoriesIfNeeded","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(l,"resetSelectedTypes","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(f,"selectType","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(_,"selectCategory","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(p,"triggerDomChanges","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"))}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function s(e,t,r){var n=o(t.trim()),s=new RegExp(n,"i"),i=e.fetchedCategoryTypes[e.categorySelector.selectedType].categories,c=i.data,u=i.included,a=e.categorySelector.dropDowns[r-1]?e.categorySelector.dropDowns[r-1].selectedCategory.relationships.categories.data:[],l=0===r?c:[],f=!0,p=!1,d=void 0;try{for(var g,E=function(){var e=g.value;l=l.concat(u.filter(function(t){if(t.id===e.id)return t}))},y=(0,_["default"])(a);!(f=(g=y.next()).done);f=!0)E()}catch(T){p=!0,d=T}finally{try{!f&&y["return"]&&y["return"]()}finally{if(p)throw d}}return l.filter(function(e){return s.test(e.attributes.title)}).sort(function(e,t){var r=n.toLowerCase(),o=e.attributes.title,s=t.attributes.title,i=o.substr(0,n.length).toLowerCase(),c=s.substr(0,n.length).toLowerCase();if(i===r){if(c!==r)return-1}else if(c===r)return 1;return o<s?-1:o>s?1:0})}function i(e,t){return{type:p.RECEIVE_SUGGESTIONS,suggestions:e,index:t}}function c(e,t){return function(r,n){var o=s(n(),e,t);return r(i(o,t))}}function u(e,t){return function(r,n){var o=t+1,s=n().categorySelector.dropDowns[o];r({type:p.UPDATE_INPUT,index:t,value:e}),s&&!s.isDefault&&r(l(o))}}function a(){return{type:p.RESET_SUGGESTIONS,suggestions:[]}}function l(e){return{type:p.RESET_DROPDOWNS,index:e}}Object.defineProperty(t,"__esModule",{value:!0});var f=r(96),_=n(f);t.receiveSuggestions=i,t.fetchSuggestions=c,t.updateInput=u,t.resetSuggestions=a,t.resetDropDowns=l;var p=r(14);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(o,"escapeRegexCharacters","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(s,"getSuggestions","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(i,"receiveSuggestions","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(c,"fetchSuggestions","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(u,"updateInput","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(a,"resetSuggestions","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(l,"resetDropDowns","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"))}()},function(e,t,r){e.exports={"default":r(60),__esModule:!0}},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var o=r(92),s=n(o);t["default"]=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,s["default"])(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var o=r(56),s=n(o),i=r(55),c=n(i),u=r(44),a=n(u);t["default"]=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":(0,a["default"])(t)));e.prototype=(0,c["default"])(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(s["default"]?(0,s["default"])(e,t):e.__proto__=t)}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var o=r(44),s=n(o);t["default"]=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,s["default"])(t))&&"function"!=typeof t?e:t}},function(e,t){var r={}.toString;e.exports=function(e){return r.call(e).slice(8,-1)}},function(e,t,r){var n=r(11),o=r(7).document,s=n(o)&&n(o.createElement);e.exports=function(e){return s?o.createElement(e):{}}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,r){e.exports=!r(5)&&!r(17)(function(){return 7!=Object.defineProperty(r(33)("div"),"a",{get:function(){return 7}}).a})},function(e,t,r){var n=r(4),o=r(74),s=r(34),i=r(19)("IE_PROTO"),c=function(){},u="prototype",a=function(){var e,t=r(33)("iframe"),n=s.length,o="<",i=">";for(t.style.display="none",r(66).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(o+"script"+i+"document.F=Object"+o+"/script"+i),e.close(),a=e.F;n--;)delete a[u][s[n]];return a()};e.exports=Object.create||function(e,t){var r;return null!==e?(c[u]=n(e),r=new c,c[u]=null,r[i]=e):r=a(),void 0===t?r:o(r,t)}},function(e,t,r){var n=r(8),o=r(22),s=r(19)("IE_PROTO"),i=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=o(e),n(e,s)?e[s]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?i:null}},function(e,t,r){var n=r(12).f,o=r(8),s=r(3)("toStringTag");e.exports=function(e,t,r){e&&!o(e=r?e:e.prototype,s)&&n(e,s,{configurable:!0,value:t})}},function(e,t,r){var n=r(7),o="__core-js_shared__",s=n[o]||(n[o]={});e.exports=function(e){return s[e]||(s[e]={})}},function(e,t,r){var n=r(20),o=Math.min;e.exports=function(e){return e>0?o(n(e),9007199254740991):0}},function(e,t,r){var n=r(11);e.exports=function(e,t){if(!n(e))return e;var r,o;if(t&&"function"==typeof(r=e.toString)&&!n(o=r.call(e)))return o;if("function"==typeof(r=e.valueOf)&&!n(o=r.call(e)))return o;if(!t&&"function"==typeof(r=e.toString)&&!n(o=r.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},function(e,t){var r=0,n=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++r+n).toString(36))}},function(e,t,r){e.exports=r(1)(248)},function(e,t,r){e.exports=r(1)(306)},function(e,t,r){e.exports=r(1)(32)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(9),s=n(o),i=function(e){var t=e.id,r=e.attributes,n=e.onClick,o=e.selected,i=void 0!==o&&o,c=e.isFetching,u=void 0!==c&&c;return s["default"].createElement("li",{className:"category-types__item "+(i?"category-types__item--selected":""),id:t,onClick:n},r.title,i&&u?s["default"].createElement("i",{className:"category-types__spinner fa fa-spinner fa-spin"}):"")};i.propTypes={id:o.PropTypes.number.isRequired,attributes:o.PropTypes.object.isRequired,selected:o.PropTypes.bool,onClick:o.PropTypes.func.isRequired,isFetching:o.PropTypes.bool};var c=i;t["default"]=c,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(i,"CategoryType","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/components/CategoryType.js"),__REACT_HOT_LOADER__.register(c,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/components/CategoryType.js"))}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(93),s=n(o),i=r(9),c=n(i),u=r(46),a=n(u),l=function(e){var t=e.types,r=e.onTypeClick,n=e.selected,o=e.isFetching;return c["default"].createElement("div",{className:"col-xs-12 mar-btm"},c["default"].createElement("ul",{className:"category-types btn-group btn-group-justified"},t.map(function(e){return c["default"].createElement(a["default"],(0,s["default"])({key:e.id},e,{onClick:function(){return r(e)},selected:n===e.attributes.title,isFetching:o}))})))};l.propTypes={types:i.PropTypes.arrayOf(i.PropTypes.shape({id:i.PropTypes.number.isRequired,attributes:i.PropTypes.object}).isRequired).isRequired,onTypeClick:i.PropTypes.func.isRequired,selected:i.PropTypes.string,isFetching:i.PropTypes.bool.isRequired};var f=l;t["default"]=f,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(l,"CategoryTypeList","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/components/CategoryTypeList.js"),__REACT_HOT_LOADER__.register(f,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/components/CategoryTypeList.js"))}()},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.CATEGORY_TYPES=[{id:1,attributes:{title:"Equipment",service_type:"hire"}},{id:2,attributes:{title:"Trades",service_type:"trade"}},{id:3,attributes:{title:"Products",service_type:"product"}}];!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(r,"CATEGORY_TYPES","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/CategoryTypes.js")}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.categorySelector,r=e.fetchedCategoryTypes,n=r[t.selectedType]||{isApiError:!1,isFetching:!1},o=n.isApiError,s=n.isFetching;return{isFetching:s,isApiError:o,categorySelector:t}}Object.defineProperty(t,"__esModule",{value:!0});var s=r(27),i=n(s),c=r(28),u=n(c),a=r(29),l=n(a),f=r(31),_=n(f),p=r(30),d=n(p),g=r(9),E=n(g),y=r(24),T=r(25),h=r(47),S=n(h),m=r(48),O=r(50),R=n(O),A=function(e){function t(e){(0,u["default"])(this,t);var r=(0,_["default"])(this,(t.__proto__||(0,i["default"])(t)).call(this,e));return r.handleCategoryTypeClick=r.handleCategoryTypeClick.bind(r),r}return(0,d["default"])(t,e),(0,l["default"])(t,[{key:"handleCategoryTypeClick",value:function(e){return this.props.dispatch((0,T.selectType)(e)),this.props.dispatch((0,T.fetchCategoriesIfNeeded)(e))}},{key:"render",value:function(){var e=this.props,t=e.categorySelector,r=e.isFetching,n=e.isApiError;return E["default"].createElement("div",null,E["default"].createElement(S["default"],{types:m.CATEGORY_TYPES,onTypeClick:this.handleCategoryTypeClick,selected:t.selectedType,isFetching:r}),t.dropDowns.map(function(e,t){return E["default"].createElement(R["default"],{key:t,currentIndex:t})}),n?E["default"].createElement("div",{className:"col-xs-12"},"Sorry, an error occurred while trying to fetch categories. Please refresh the page and try again."):"")}}]),t}(g.Component);A.propTypes={categorySelector:g.PropTypes.object.isRequired,isFetching:g.PropTypes.bool.isRequired,isApiError:g.PropTypes.bool.isRequired,dispatch:g.PropTypes.func.isRequired};var v=(0,y.connect)(o)(A);t["default"]=v,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(A,"CategorySelection","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySelection.js"),__REACT_HOT_LOADER__.register(o,"mapStateToProps","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySelection.js"),__REACT_HOT_LOADER__.register(v,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySelection.js"))}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.categorySelector;return{categorySelector:t}}Object.defineProperty(t,"__esModule",{value:!0});var s=r(43),i=n(s),c=r(27),u=n(c),a=r(28),l=n(a),f=r(29),_=n(f),p=r(31),d=n(p),g=r(30),E=n(g),y=r(9),T=n(y),h=r(95),S=n(h),m=r(24),O=r(25),R=r(26),A=function(e){function t(e){(0,l["default"])(this,t);var r=(0,d["default"])(this,(t.__proto__||(0,u["default"])(t)).call(this,e));return r.onSuggestionsFetchRequested=r.onSuggestionsFetchRequested.bind(r),r.onSuggestionsClearRequested=r.onSuggestionsClearRequested.bind(r),r.onSuggestionSelected=r.onSuggestionSelected.bind(r),r.getSuggestionValue=r.getSuggestionValue.bind(r),r.renderSuggestion=r.renderSuggestion.bind(r),r.shouldRenderSuggestions=r.shouldRenderSuggestions.bind(r),r.onChange=r.onChange.bind(r),r}return(0,E["default"])(t,e),(0,_["default"])(t,[{key:"onSuggestionsFetchRequested",value:function(e){var t=this;return function(r){var n=r.value;t.props.dispatch((0,R.fetchSuggestions)(n,e))}}},{key:"onSuggestionsClearRequested",value:function(){this.props.dispatch((0,R.resetSuggestions)())}},{key:"onSuggestionSelected",value:function(e){var t=this;return function(r,n){var o=n.suggestion;t.props.dispatch((0,O.selectCategory)(o,e))}}},{key:"getSuggestionValue",value:function(e){return e.attributes.title}},{key:"renderSuggestion",value:function(e){return T["default"].createElement("div",null,T["default"].createElement("i",{className:"fa fa-wrench"}),T["default"].createElement("span",null,e.attributes.title))}},{key:"shouldRenderSuggestions",value:function(){return!0}},{key:"onChange",value:function(e){var t=this;return function(r,n){var o=n.newValue;t.props.dispatch((0,R.updateInput)(o,e))}}},{key:"render",value:function(){var e=this,t=this.props,r=t.categorySelector,n=t.currentIndex,o={placeholder:"Select or type the category",className:"form-control"},s=function(t){return(0,i["default"])({},o,{id:"categories-input-"+t,value:r.dropDowns[t].input||"",onChange:e.onChange(t)})};return T["default"].createElement("div",{className:"col-xs-12 mar-btm category-suggestion"},n>0?T["default"].createElement("i",{className:"category-suggestion__icon fa fa-arrow-right"}):"",T["default"].createElement(S["default"],{id:"categories-0",suggestions:r.suggestions,onSuggestionsFetchRequested:this.onSuggestionsFetchRequested(n),onSuggestionsClearRequested:this.onSuggestionsClearRequested,onSuggestionSelected:this.onSuggestionSelected(n),getSuggestionValue:this.getSuggestionValue,renderSuggestion:this.renderSuggestion,shouldRenderSuggestions:this.shouldRenderSuggestions,focusFirstSuggestion:!0,inputProps:s(n)}))}}]),t}(y.Component);A.propTypes={categorySelector:y.PropTypes.object.isRequired,dispatch:y.PropTypes.func.isRequired,currentIndex:y.PropTypes.number.isRequired};var v=(0,m.connect)(o)(A);t["default"]=v,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(A,"CategorySuggestion","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySuggestion.js"),__REACT_HOT_LOADER__.register(o,"mapStateToProps","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySuggestion.js"),__REACT_HOT_LOADER__.register(v,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySuggestion.js"))}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments[1];switch(t.type){case d.SELECT_CATEGORY_TYPE:return(0,p["default"])({},e,{selectedType:t.categoryType});case d.RECEIVE_SUGGESTIONS:case d.RESET_SUGGESTIONS:return(0,p["default"])({},e,{suggestions:t.suggestions});case d.SET_INITIAL_CATEGORY_SELECTOR_STATE:return(0,p["default"])({},e,g);case d.ADD_DROPDOWN:case d.RESET_DROPDOWNS:case d.UPDATE_INPUT:case d.SELECT_CATEGORY:return(0,p["default"])({},e,{dropDowns:s(e.dropDowns,t)});default:return e}}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];switch(t.type){case d.ADD_DROPDOWN:return[].concat((0,f["default"])(e.slice(0,t.index)),[E],(0,f["default"])(e.slice(t.index+1)));case d.RESET_DROPDOWNS:return e.slice(0,t.index);case d.UPDATE_INPUT:return e.map(function(e,r){return r===t.index?(0,p["default"])({},e,{input:t.value,isDefault:!1}):e});case d.SELECT_CATEGORY:return e.map(function(e,r){return r===t.index?(0,p["default"])({},e,{selectedCategory:t.category}):e});default:return e}}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isFetching:!1,categories:{},isApiError:!1},t=arguments[1];switch(t.type){case d.REQUEST_CATEGORIES:return(0,p["default"])({},e,{isFetching:!0,isApiError:!1});case d.RECEIVE_CATEGORIES:return(0,p["default"])({},e,{isFetching:!1,isApiError:!1,categories:t.categories});case d.REQUEST_FAILED:return(0,p["default"])({},e,{isFetching:!1,isApiError:!0});default:return e}}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];switch(t.type){case d.RECEIVE_CATEGORIES:case d.REQUEST_CATEGORIES:case d.REQUEST_FAILED:return(0,p["default"])({},e,(0,a["default"])({},t.categoryType,i(e[t.categoryType],t)));default:return e}}Object.defineProperty(t,"__esModule",{value:!0});var u=r(91),a=n(u),l=r(57),f=n(l),_=r(43),p=n(_);t.categorySelector=o,t.fetchedCategoryTypes=c;var d=r(14),g={selectedType:"",suggestions:[],dropDowns:[]},E={input:"",selectedCategory:{},isDefault:!0};!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(g,"INITIAL_CATEGORY_SELECTOR_STATE","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(E,"DEFAULT_DROPDOWN_STATE","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(o,"categorySelector","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(s,"dropDowns","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(i,"categories","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(c,"fetchedCategoryTypes","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"))}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(45),o=r(23),s=r(51),i=(0,n.combineReducers)({api:o.reducer,categorySelector:s.categorySelector,fetchedCategoryTypes:s.fetchedCategoryTypes});t["default"]=i,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(i,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/index.js")}()},function(e,t,r){function n(){const e="pm_token",t=document.cookie.split(";").map(function(e){return e.trim().split("=")}).reduce(function(e,t){return e[t[0]]=t[1],e},{})[e];return{Authorization:"Bearer "+t,Accept:"application/vnd.pm.v1+json"}}function o(){const e="https://",t=window.location.hostname.replace(/www./,""),r=t.includes("nz")?".co.nz":".com.au",n=".api.staging.plantminer",o=window.location.search.substr(1).split("&").map(function(e){return e.split("=")}).reduce(function(e,t){return e[t[0]]=t[1],e},{}).apiBranch;return t.includes("local.dev")?"https://api.pm.local.dev":o?[e,o.toLowerCase(),n,r].join(""):t.includes("release")?[e,"release",n,r].join(""):t.includes("hotfix")?[e,"hotfix",n,r].join(""):[e,"api.plantminer",r].join("")}e.exports={configureHostname:o,configureHeaders:n}},function(e,t,r){e.exports={"default":r(58),__esModule:!0}},function(e,t,r){e.exports={"default":r(59),__esModule:!0}},function(e,t,r){e.exports={"default":r(61),__esModule:!0}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var o=r(54),s=n(o);t["default"]=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return(0,s["default"])(e)}},function(e,t,r){r(89),r(85),e.exports=r(2).Array.from},function(e,t,r){r(86);var n=r(2).Object;e.exports=function(e,t){return n.create(e,t)}},function(e,t,r){r(87),e.exports=r(2).Object.getPrototypeOf},function(e,t,r){r(88),e.exports=r(2).Object.setPrototypeOf},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,r){var n=r(21),o=r(40),s=r(83);e.exports=function(e){return function(t,r,i){var c,u=n(t),a=o(u.length),l=s(i,a);if(e&&r!=r){for(;a>l;)if(c=u[l++],c!=c)return!0}else for(;a>l;l++)if((e||l in u)&&u[l]===r)return e||l||0;return!e&&-1}}},function(e,t,r){var n=r(32),o=r(3)("toStringTag"),s="Arguments"==n(function(){return arguments}()),i=function(e,t){try{return e[t]}catch(r){}};e.exports=function(e){var t,r,c;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=i(t=Object(e),o))?r:s?n(t):"Object"==(c=n(t))&&"function"==typeof t.callee?"Arguments":c}},function(e,t,r){"use strict";var n=r(12),o=r(13);e.exports=function(e,t,r){t in e?n.f(e,t,o(0,r)):e[t]=r}},function(e,t,r){e.exports=r(7).document&&document.documentElement},function(e,t,r){var n=r(32);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==n(e)?e.split(""):Object(e)}},function(e,t,r){var n=r(18),o=r(3)("iterator"),s=Array.prototype;e.exports=function(e){return void 0!==e&&(n.Array===e||s[o]===e)}},function(e,t,r){var n=r(4);e.exports=function(e,t,r,o){try{return o?t(n(r)[0],r[1]):t(r)}catch(s){var i=e["return"];throw void 0!==i&&n(i.call(e)),s}}},function(e,t,r){"use strict";var n=r(36),o=r(13),s=r(38),i={};r(10)(i,r(3)("iterator"),function(){return this}),e.exports=function(e,t,r){e.prototype=n(i,{next:o(1,r)}),s(e,t+" Iterator")}},function(e,t,r){"use strict";var n=r(73),o=r(6),s=r(80),i=r(10),c=r(8),u=r(18),a=r(70),l=r(38),f=r(37),_=r(3)("iterator"),p=!([].keys&&"next"in[].keys()),d="@@iterator",g="keys",E="values",y=function(){return this};e.exports=function(e,t,r,T,h,S,m){a(r,t,T);var O,R,A,v=function(e){if(!p&&e in x)return x[e];switch(e){case g:return function(){return new r(this,e)};case E:return function(){return new r(this,e)}}return function(){return new r(this,e)}},C=t+" Iterator",D=h==E,b=!1,x=e.prototype,j=x[_]||x[d]||h&&x[h],L=j||v(h),P=h?D?v("entries"):L:void 0,w="Array"==t?x.entries||j:j;if(w&&(A=f(w.call(new e)),
A!==Object.prototype&&(l(A,C,!0),n||c(A,_)||i(A,_,y))),D&&j&&j.name!==E&&(b=!0,L=function(){return j.call(this)}),n&&!m||!p&&!b&&x[_]||i(x,_,L),u[t]=L,u[C]=y,h)if(O={values:D?L:v(E),keys:S?L:v(g),entries:P},m)for(R in O)R in x||s(x,R,O[R]);else o(o.P+o.F*(p||b),t,O);return O}},function(e,t,r){var n=r(3)("iterator"),o=!1;try{var s=[7][n]();s["return"]=function(){o=!0},Array.from(s,function(){throw 2})}catch(i){}e.exports=function(e,t){if(!t&&!o)return!1;var r=!1;try{var s=[7],i=s[n]();i.next=function(){return{done:r=!0}},s[n]=function(){return i},e(s)}catch(c){}return r}},function(e,t){e.exports=!0},function(e,t,r){var n=r(12),o=r(4),s=r(77);e.exports=r(5)?Object.defineProperties:function(e,t){o(e);for(var r,i=s(t),c=i.length,u=0;c>u;)n.f(e,r=i[u++],t[r]);return e}},function(e,t,r){var n=r(78),o=r(13),s=r(21),i=r(41),c=r(8),u=r(35),a=Object.getOwnPropertyDescriptor;t.f=r(5)?a:function(e,t){if(e=s(e),t=i(t,!0),u)try{return a(e,t)}catch(r){}if(c(e,t))return o(!n.f.call(e,t),e[t])}},function(e,t,r){var n=r(8),o=r(21),s=r(63)(!1),i=r(19)("IE_PROTO");e.exports=function(e,t){var r,c=o(e),u=0,a=[];for(r in c)r!=i&&n(c,r)&&a.push(r);for(;t.length>u;)n(c,r=t[u++])&&(~s(a,r)||a.push(r));return a}},function(e,t,r){var n=r(76),o=r(34);e.exports=Object.keys||function(e){return n(e,o)}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t,r){var n=r(6),o=r(2),s=r(17);e.exports=function(e,t){var r=(o.Object||{})[e]||Object[e],i={};i[e]=t(r),n(n.S+n.F*s(function(){r(1)}),"Object",i)}},function(e,t,r){e.exports=r(10)},function(e,t,r){var n=r(11),o=r(4),s=function(e,t){if(o(e),!n(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,n){try{n=r(15)(Function.call,r(75).f(Object.prototype,"__proto__").set,2),n(e,[]),t=!(e instanceof Array)}catch(o){t=!0}return function(e,r){return s(e,r),t?e.__proto__=r:n(e,r),e}}({},!1):void 0),check:s}},function(e,t,r){var n=r(20),o=r(16);e.exports=function(e){return function(t,r){var s,i,c=String(o(t)),u=n(r),a=c.length;return u<0||u>=a?e?"":void 0:(s=c.charCodeAt(u),s<55296||s>56319||u+1===a||(i=c.charCodeAt(u+1))<56320||i>57343?e?c.charAt(u):s:e?c.slice(u,u+2):(s-55296<<10)+(i-56320)+65536)}}},function(e,t,r){var n=r(20),o=Math.max,s=Math.min;e.exports=function(e,t){return e=n(e),e<0?o(e+t,0):s(e,t)}},function(e,t,r){var n=r(64),o=r(3)("iterator"),s=r(18);e.exports=r(2).getIteratorMethod=function(e){if(void 0!=e)return e[o]||e["@@iterator"]||s[n(e)]}},function(e,t,r){"use strict";var n=r(15),o=r(6),s=r(22),i=r(69),c=r(68),u=r(40),a=r(65),l=r(84);o(o.S+o.F*!r(72)(function(e){Array.from(e)}),"Array",{from:function(e){var t,r,o,f,_=s(e),p="function"==typeof this?this:Array,d=arguments.length,g=d>1?arguments[1]:void 0,E=void 0!==g,y=0,T=l(_);if(E&&(g=n(g,d>2?arguments[2]:void 0,2)),void 0==T||p==Array&&c(T))for(t=u(_.length),r=new p(t);t>y;y++)a(r,y,E?g(_[y],y):_[y]);else for(f=T.call(_),r=new p;!(o=f.next()).done;y++)a(r,y,E?i(f,g,[o.value,y],!0):o.value);return r.length=y,r}})},function(e,t,r){var n=r(6);n(n.S,"Object",{create:r(36)})},function(e,t,r){var n=r(22),o=r(37);r(79)("getPrototypeOf",function(){return function(e){return o(n(e))}})},function(e,t,r){var n=r(6);n(n.S,"Object",{setPrototypeOf:r(81).set})},function(e,t,r){"use strict";var n=r(82)(!0);r(71)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,r=this._i;return r>=t.length?{value:void 0,done:!0}:(e=n(t,r),this._i+=e.length,{value:e,done:!1})})},function(e,t){},function(e,t,r){e.exports=r(1)(208)},function(e,t,r){e.exports=r(1)(209)},function(e,t,r){e.exports=r(1)(247)},function(e,t,r){e.exports=r(1)(256)},function(e,t,r){e.exports=r(1)(30)},function(e,t,r){e.exports=r(1)(327)},function(e,t,r){e.exports=r(1)(336)},function(e,t,r){e.exports=r(1)(74)}]);
//# sourceMappingURL=bundle.js.map