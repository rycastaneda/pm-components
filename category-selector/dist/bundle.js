webpackJsonp([1],[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var s=r(7),o=n(s),i=r(137),c=r(45),a=r(39),u=r(167),l=n(u),_=r(178),f=n(_),p=r(59),d=r(179),g=n(d),E=r(175),y=n(E);r(237);var T=(0,c.applyMiddleware)(l["default"]),S=(0,c.createStore)(f["default"],T);S.dispatch((0,p.setEndpointHost)(g["default"].configureHostname())),S.dispatch((0,p.setEndpointPath)("")),S.dispatch((0,p.setHeaders)(g["default"].configureHeaders())),(0,i.render)(o["default"].createElement(a.Provider,{store:S},o["default"].createElement(y["default"],null)),document.querySelector('[data-component="category-selector"]')),function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(T,"enhance","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/index.js"),__REACT_HOT_LOADER__.register(S,"store","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/index.js"))}()},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.SELECT_CATEGORY="SELECT_CATEGORY",n=t.SELECT_CATEGORY_TYPE="SELECT_CATEGORY_TYPE",s=t.REQUEST_CATEGORIES="REQUEST_CATEGORIES",o=t.RECEIVE_CATEGORIES="RECEIVE_CATEGORIES",i=t.REQUEST_FAILED="REQUEST_FAILED",c=t.RECEIVE_SUGGESTIONS="RECEIVE_SUGGESTIONS",a=t.RESET_SUGGESTIONS="RESET_SUGGESTIONS",u=t.UPDATE_INPUT="UPDATE_INPUT",l=t.ADD_DROPDOWN="ADD_DROPDOWN",_=t.RESET_DROPDOWNS="RESET_DROPDOWNS",f=t.SET_INITIAL_CATEGORY_SELECTOR_STATE="SET_INITIAL_CATEGORY_SELECTOR_STATE";!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(r,"SELECT_CATEGORY","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(n,"SELECT_CATEGORY_TYPE","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(s,"REQUEST_CATEGORIES","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(o,"RECEIVE_CATEGORIES","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(i,"REQUEST_FAILED","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(c,"RECEIVE_SUGGESTIONS","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(a,"RESET_SUGGESTIONS","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(u,"UPDATE_INPUT","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(l,"ADD_DROPDOWN","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(_,"RESET_DROPDOWNS","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(f,"SET_INITIAL_CATEGORY_SELECTOR_STATE","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/ActionTypes.js"))}()},,,,,,,,,,,,,,function(e,t,r){var n=r(10),s=r(6),o=r(46),i=r(75),c=r(17).f;e.exports=function(e){var t=s.Symbol||(s.Symbol=o?{}:n.Symbol||{});"_"==e.charAt(0)||e in t||c(t,e,{value:i.f(e)})}},function(e,t,r){t.f=r(8)},,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function s(e){return{type:E.REQUEST_CATEGORIES,categoryType:e}}function o(e,t){return function(r){r({type:E.RECEIVE_CATEGORIES,categories:t,categoryType:e}),t.data&&t.data.length>0&&r(a())}}function i(e){return{type:E.REQUEST_FAILED,categoryType:e}}function c(e){return function(t){var r=e.attributes.title||"",n=e.attributes.service_type||"";return t(s(r)),new g["default"](function(e,s){t((0,y.readEndpoint)("categories?filters[service_type]="+n+"&fields[categories]=title,selectable&include=categories.categories.categories")).then(function(n){t(o(r,n)),e()})["catch"](function(){return s()})})}}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return{type:E.ADD_DROPDOWN,index:e}}function u(e){return function(t,r){var n=e.attributes.title,s=r().fetchedCategoryTypes[n]||{},o=!(!s.categories||!s.categories.hasOwnProperty("data"))&&s.categories.data.length;if(!s.isFetching&&!s.isApiError)return o?t(a()):void t(c(e))["catch"](function(){return t(i(n))})}}function l(){return{type:E.SET_INITIAL_CATEGORY_SELECTOR_STATE}}function _(e){var t=e.attributes.title;return function(e){return p(),e(l()),e({type:E.SELECT_CATEGORY_TYPE,categoryType:t})}}function f(e,t){return function(r){var n=!!e.relationships&&e.relationships.categories.data.length>0;if(e.attributes.selectable&&p(e.id),r({type:E.SELECT_CATEGORY,category:e,index:t}),n)return r(a(t+1))}}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=document.getElementById("qr_category_id")||{},r=new Event("change");t.value=e,t.dispatchEvent=t.dispatchEvent||function(){},t.dispatchEvent(r),window.PlantminerComponents=window.PlantminerComponents||{},window.PlantminerComponents.categorySelector={selectedCategoryId:parseInt(e,10)}}Object.defineProperty(t,"__esModule",{value:!0});var d=r(107),g=n(d);t.requestCategories=s,t.receiveCategories=o,t.reportError=i,t.fetchCategories=c,t.addDropDown=a,t.fetchCategoriesIfNeeded=u,t.resetSelectedTypes=l,t.selectType=_,t.selectCategory=f,t.triggerDomChanges=p;var E=r(60),y=r(59);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(s,"requestCategories","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(o,"receiveCategories","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(i,"reportError","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(c,"fetchCategories","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(a,"addDropDown","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(u,"fetchCategoriesIfNeeded","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(l,"resetSelectedTypes","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(_,"selectType","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(f,"selectCategory","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"),__REACT_HOT_LOADER__.register(p,"triggerDomChanges","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/categories.js"))}()},,,function(e,t,r){e.exports={"default":r(196),__esModule:!0}},,function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var s=r(105),o=n(s);t["default"]=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,o["default"])(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}()},,,function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var s=r(184),o=n(s),i=r(183),c=n(i),a=r(114),u=n(a);t["default"]=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":(0,u["default"])(t)));e.prototype=(0,c["default"])(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(o["default"]?(0,o["default"])(e,t):e.__proto__=t)}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var s=r(114),o=n(s);t["default"]=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,o["default"])(t))&&"function"!=typeof t?e:t}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var s=r(186),o=n(s),i=r(185),c=n(i),a="function"==typeof c["default"]&&"symbol"==typeof o["default"]?function(e){return typeof e}:function(e){return e&&"function"==typeof c["default"]&&e.constructor===c["default"]&&e!==c["default"].prototype?"symbol":typeof e};t["default"]="function"==typeof c["default"]&&"symbol"===a(o["default"])?function(e){return"undefined"==typeof e?"undefined":a(e)}:function(e){return e&&"function"==typeof c["default"]&&e.constructor===c["default"]&&e!==c["default"].prototype?"symbol":"undefined"==typeof e?"undefined":a(e)}},,,,,,,,function(e,t,r){var n=r(47),s=r(36),o=r(26),i=r(73),c=r(24),a=r(116),u=Object.getOwnPropertyDescriptor;t.f=r(20)?u:function(e,t){if(e=o(e),t=i(t,!0),a)try{return u(e,t)}catch(r){}if(c(e,t))return s(!n.f.call(e,t),e[t])}},function(e,t,r){var n=r(125),s=r(66).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,s)}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function s(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function o(e,t,r){var n=s(t.trim()),o=new RegExp(n,"i"),i=e.fetchedCategoryTypes[e.categorySelector.selectedType].categories,c=i.data,a=i.included,u=e.categorySelector.dropDowns[r-1]?e.categorySelector.dropDowns[r-1].selectedCategory.relationships.categories.data:[],l=0===r?c:[],_=!0,p=!1,d=void 0;try{for(var g,E=function(){var e=g.value;l=l.concat(a.filter(function(t){if(t.id===e.id)return t}))},y=(0,f["default"])(u);!(_=(g=y.next()).done);_=!0)E()}catch(T){p=!0,d=T}finally{try{!_&&y["return"]&&y["return"]()}finally{if(p)throw d}}return l.filter(function(e){return o.test(e.attributes.title)})}function i(e,t){return{type:p.RECEIVE_SUGGESTIONS,suggestions:e,index:t}}function c(e,t){return function(r,n){var s=o(n(),e,t);return r(i(s,t))}}function a(e,t){return function(r,n){var s=t+1;return n().categorySelector.dropDowns[s]&&r(l(s)),r({type:p.UPDATE_INPUT,index:t,value:e})}}function u(){return{type:p.RESET_SUGGESTIONS,suggestions:[]}}function l(e){return{type:p.RESET_DROPDOWNS,index:e}}Object.defineProperty(t,"__esModule",{value:!0});var _=r(104),f=n(_);t.receiveSuggestions=i,t.fetchSuggestions=c,t.updateInput=a,t.resetSuggestions=u,t.resetDropDowns=l;var p=r(60);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(s,"escapeRegexCharacters","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(o,"getSuggestions","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(i,"receiveSuggestions","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(c,"fetchSuggestions","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(a,"updateInput","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(u,"resetSuggestions","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"),__REACT_HOT_LOADER__.register(l,"resetDropDowns","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/actions/suggestions.js"))}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var s=r(7),o=n(s),i=function(e){var t=e.id,r=e.attributes,n=e.onClick,s=e.selected,i=void 0!==s&&s,c=e.isFetching,a=void 0!==c&&c;return o["default"].createElement("li",{className:"category-types__item "+(i?"category-types__item--selected":""),id:t,onClick:n},r.title,i&&a?o["default"].createElement("i",{className:"category-types__spinner fa fa-spinner fa-spin"}):"")};i.propTypes={id:s.PropTypes.number.isRequired,attributes:s.PropTypes.object.isRequired,selected:s.PropTypes.bool,onClick:s.PropTypes.func.isRequired,isFetching:s.PropTypes.bool};var c=i;t["default"]=c,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(i,"CategoryType","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/components/CategoryType.js"),__REACT_HOT_LOADER__.register(c,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/components/CategoryType.js"))}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var s=r(111),o=n(s),i=r(7),c=n(i),a=r(172),u=n(a),l=function(e){var t=e.types,r=e.onTypeClick,n=e.selected,s=e.isFetching;return c["default"].createElement("div",{className:"col-xs-12 mar-btm"},c["default"].createElement("ul",{className:"category-types btn-group btn-group-justified"},t.map(function(e){return c["default"].createElement(u["default"],(0,o["default"])({key:e.id},e,{onClick:function(){return r(e)},selected:n===e.attributes.title,isFetching:s}))})))};l.propTypes={types:i.PropTypes.arrayOf(i.PropTypes.shape({id:i.PropTypes.number.isRequired,attributes:i.PropTypes.object}).isRequired).isRequired,onTypeClick:i.PropTypes.func.isRequired,selected:i.PropTypes.string,isFetching:i.PropTypes.bool.isRequired};var _=l;t["default"]=_,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(l,"CategoryTypeList","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/components/CategoryTypeList.js"),__REACT_HOT_LOADER__.register(_,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/components/CategoryTypeList.js"))}()},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.CATEGORY_TYPES=[{id:1,attributes:{title:"Equipment",service_type:"hire"}},{id:2,attributes:{title:"Trades",service_type:"trade"}},{id:3,attributes:{title:"Products",service_type:"product"}}];!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(r,"CATEGORY_TYPES","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/constants/CategoryTypes.js")}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function s(e){var t=e.categorySelector,r=e.fetchedCategoryTypes,n=r[t.selectedType]||{isApiError:!1,isFetching:!1},s=n.isApiError,o=n.isFetching;return{isFetching:o,isApiError:s,categorySelector:t}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(106),i=n(o),c=r(108),a=n(c),u=r(109),l=n(u),_=r(113),f=n(_),p=r(112),d=n(p),g=r(7),E=n(g),y=r(39),T=r(103),S=r(173),m=n(S),O=r(174),R=r(176),h=n(R),A=function(e){function t(e){(0,a["default"])(this,t);var r=(0,f["default"])(this,(t.__proto__||(0,i["default"])(t)).call(this,e));return r.handleCategoryTypeClick=r.handleCategoryTypeClick.bind(r),r}return(0,d["default"])(t,e),(0,l["default"])(t,[{key:"handleCategoryTypeClick",value:function(e){return this.props.dispatch((0,T.selectType)(e)),this.props.dispatch((0,T.fetchCategoriesIfNeeded)(e))}},{key:"render",value:function(){var e=this.props,t=e.categorySelector,r=e.isFetching,n=e.isApiError;return E["default"].createElement("div",null,E["default"].createElement(m["default"],{types:O.CATEGORY_TYPES,onTypeClick:this.handleCategoryTypeClick,selected:t.selectedType,isFetching:r}),t.dropDowns.map(function(e,t){return E["default"].createElement(h["default"],{key:t,currentIndex:t})}),n?E["default"].createElement("div",{className:"col-xs-12"},"Sorry, an error occurred while trying to fetch categories. Please refresh the page and try again."):"")}}]),t}(g.Component);A.propTypes={categorySelector:g.PropTypes.object.isRequired,isFetching:g.PropTypes.bool.isRequired,isApiError:g.PropTypes.bool.isRequired,dispatch:g.PropTypes.func.isRequired};var C=(0,y.connect)(s)(A);t["default"]=C,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(A,"CategorySelection","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySelection.js"),__REACT_HOT_LOADER__.register(s,"mapStateToProps","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySelection.js"),__REACT_HOT_LOADER__.register(C,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySelection.js"))}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function s(e){var t=e.categorySelector;return{categorySelector:t}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(61),i=n(o),c=r(106),a=n(c),u=r(108),l=n(u),_=r(109),f=n(_),p=r(113),d=n(p),g=r(112),E=n(g),y=r(7),T=n(y),S=r(135),m=n(S),O=r(39),R=r(103),h=r(171),A=function(e){function t(e){(0,l["default"])(this,t);var r=(0,d["default"])(this,(t.__proto__||(0,a["default"])(t)).call(this,e));return r.onSuggestionsFetchRequested=r.onSuggestionsFetchRequested.bind(r),r.onSuggestionsClearRequested=r.onSuggestionsClearRequested.bind(r),r.onSuggestionSelected=r.onSuggestionSelected.bind(r),r.getSuggestionValue=r.getSuggestionValue.bind(r),r.renderSuggestion=r.renderSuggestion.bind(r),r.shouldRenderSuggestions=r.shouldRenderSuggestions.bind(r),r.onChange=r.onChange.bind(r),r}return(0,E["default"])(t,e),(0,f["default"])(t,[{key:"onSuggestionsFetchRequested",value:function(e){var t=this;return function(r){var n=r.value;t.props.dispatch((0,h.fetchSuggestions)(n,e))}}},{key:"onSuggestionsClearRequested",value:function(){this.props.dispatch((0,h.resetSuggestions)())}},{key:"onSuggestionSelected",value:function(e){var t=this;return function(r,n){var s=n.suggestion;t.props.dispatch((0,R.selectCategory)(s,e))}}},{key:"getSuggestionValue",value:function(e){return e.attributes.title}},{key:"renderSuggestion",value:function(e){return T["default"].createElement("div",null,T["default"].createElement("i",{className:"fa fa-wrench"}),T["default"].createElement("span",null,e.attributes.title))}},{key:"shouldRenderSuggestions",value:function(){return!0}},{key:"onChange",value:function(e){var t=this;return function(r,n){var s=n.newValue;t.props.dispatch((0,h.updateInput)(s,e))}}},{key:"render",value:function(){var e=this,t=this.props,r=t.categorySelector,n=t.currentIndex,s={placeholder:"Select or type the category",className:"form-control"},o=function(t){return(0,i["default"])({},s,{id:"categories-input-"+t,value:r.dropDowns[t].input||"",onChange:e.onChange(t)})};return T["default"].createElement("div",{className:"col-xs-12 mar-btm category-suggestion"},n>0?T["default"].createElement("i",{className:"category-suggestion__icon fa fa-arrow-right"}):"",T["default"].createElement(m["default"],{id:"categories-0",suggestions:r.suggestions,onSuggestionsFetchRequested:this.onSuggestionsFetchRequested(n),onSuggestionsClearRequested:this.onSuggestionsClearRequested,onSuggestionSelected:this.onSuggestionSelected(n),getSuggestionValue:this.getSuggestionValue,renderSuggestion:this.renderSuggestion,shouldRenderSuggestions:this.shouldRenderSuggestions,inputProps:o(n)}))}}]),t}(y.Component);A.propTypes={categorySelector:y.PropTypes.object.isRequired,dispatch:y.PropTypes.func.isRequired,currentIndex:y.PropTypes.number.isRequired};var C=(0,O.connect)(s)(A);t["default"]=C,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(A,"CategorySuggestion","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySuggestion.js"),__REACT_HOT_LOADER__.register(s,"mapStateToProps","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySuggestion.js"),__REACT_HOT_LOADER__.register(C,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/containers/CategorySuggestion.js"))}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments[1];switch(t.type){case d.SELECT_CATEGORY_TYPE:return(0,p["default"])({},e,{selectedType:t.categoryType});case d.RECEIVE_SUGGESTIONS:case d.RESET_SUGGESTIONS:return(0,p["default"])({},e,{suggestions:t.suggestions});case d.SET_INITIAL_CATEGORY_SELECTOR_STATE:return(0,p["default"])({},e,g);case d.ADD_DROPDOWN:case d.RESET_DROPDOWNS:case d.UPDATE_INPUT:case d.SELECT_CATEGORY:return(0,p["default"])({},e,{dropDowns:o(e.dropDowns,t)});default:return e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];switch(t.type){case d.ADD_DROPDOWN:return[].concat((0,_["default"])(e.slice(0,t.index)),[E],(0,_["default"])(e.slice(t.index+1)));case d.RESET_DROPDOWNS:return e.slice(0,t.index);case d.UPDATE_INPUT:return e.map(function(e,r){return r===t.index?(0,p["default"])({},e,{input:t.value}):e});case d.SELECT_CATEGORY:return e.map(function(e,r){return r===t.index?(0,p["default"])({},e,{selectedCategory:t.category}):e});default:return e}}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isFetching:!1,categories:{},isApiError:!1},t=arguments[1];switch(t.type){case d.REQUEST_CATEGORIES:return(0,p["default"])({},e,{isFetching:!0,isApiError:!1});case d.RECEIVE_CATEGORIES:return(0,p["default"])({},e,{isFetching:!1,isApiError:!1,categories:t.categories});case d.REQUEST_FAILED:return(0,p["default"])({},e,{isFetching:!1,isApiError:!0});default:return e}}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];switch(t.type){case d.RECEIVE_CATEGORIES:case d.REQUEST_CATEGORIES:case d.REQUEST_FAILED:return(0,p["default"])({},e,(0,u["default"])({},t.categoryType,i(e[t.categoryType],t)));default:return e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(110),u=n(a),l=r(188),_=n(l),f=r(61),p=n(f);t.categorySelector=s,t.fetchedCategoryTypes=c;var d=r(60),g={selectedType:"",suggestions:[],dropDowns:[]},E={input:"",selectedCategory:{}};!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(g,"INITIAL_CATEGORY_SELECTOR_STATE","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(E,"DEFAULT_DROPDOWN_STATE","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(s,"categorySelector","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(o,"dropDowns","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(i,"categories","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"),__REACT_HOT_LOADER__.register(c,"fetchedCategoryTypes","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/categorySelector.js"))}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(45),s=r(59),o=r(177),i=(0,n.combineReducers)({api:s.reducer,categorySelector:o.categorySelector,fetchedCategoryTypes:o.fetchedCategoryTypes});t["default"]=i,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(i,"default","/Users/ekaterinashum/Sites/plantminer-components/category-selector/src/reducers/index.js")}()},function(e,t,r){function n(){const e="pm_token",t=document.cookie.split(";").map(function(e){return e.trim().split("=")}).reduce(function(e,t){return e[t[0]]=t[1],e},{})[e];return{Authorization:"Bearer "+t,Accept:"application/vnd.pm.v1+json"}}function s(){const e="https://",t=window.location.hostname.replace(/www./,""),r=window.location.search.substr(1).split("&").map(function(e){return e.split("=")}).reduce(function(e,t){return e[t[0]]=t[1],e},{}).apiBranch;return t.includes("staging")?r?e+t.replace(/.+staging/,r.toLowerCase()+".api.staging"):e+t.replace(/staging/,"api.staging"):"https://api."+t}e.exports={configureHostname:s,configureHeaders:n}},function(e,t,r){e.exports={"default":r(189),__esModule:!0}},,,function(e,t,r){e.exports={"default":r(194),__esModule:!0}},function(e,t,r){e.exports={"default":r(197),__esModule:!0}},function(e,t,r){e.exports={"default":r(199),__esModule:!0}},function(e,t,r){e.exports={"default":r(200),__esModule:!0}},,function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var s=r(180),o=n(s);t["default"]=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return(0,o["default"])(e)}},function(e,t,r){r(37),r(226),e.exports=r(6).Array.from},,,,,function(e,t,r){r(229);var n=r(6).Object;e.exports=function(e,t){return n.create(e,t)}},,function(e,t,r){r(231),e.exports=r(6).Object.getPrototypeOf},function(e,t,r){r(232),e.exports=r(6).Object.setPrototypeOf},,function(e,t,r){r(234),r(128),r(235),r(236),e.exports=r(6).Symbol},function(e,t,r){r(37),r(51),e.exports=r(75).f("iterator")},,,,function(e,t,r){"use strict";var n=r(17),s=r(36);e.exports=function(e,t,r){t in e?n.f(e,t,s(0,r)):e[t]=r}},function(e,t,r){var n=r(35),s=r(68),o=r(47);e.exports=function(e){var t=n(e),r=s.f;if(r)for(var i,c=r(e),a=o.f,u=0;c.length>u;)a.call(e,i=c[u++])&&t.push(i);return t}},,,function(e,t,r){var n=r(34);e.exports=Array.isArray||function(e){return"Array"==n(e)}},,,function(e,t,r){var n=r(35),s=r(26);e.exports=function(e,t){for(var r,o=s(e),i=n(o),c=i.length,a=0;c>a;)if(o[r=i[a++]]===t)return r}},function(e,t,r){var n=r(50)("meta"),s=r(29),o=r(24),i=r(17).f,c=0,a=Object.isExtensible||function(){return!0},u=!r(28)(function(){return a(Object.preventExtensions({}))}),l=function(e){i(e,n,{value:{i:"O"+ ++c,w:{}}})},_=function(e,t){if(!s(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,n)){if(!a(e))return"F";if(!t)return"E";l(e)}return e[n].i},f=function(e,t){if(!o(e,n)){if(!a(e))return!0;if(!t)return!1;l(e)}return e[n].w},p=function(e){return u&&d.NEED&&a(e)&&!o(e,n)&&l(e),e},d=e.exports={KEY:n,NEED:!1,fastKey:_,getWeak:f,onFreeze:p}},,,,function(e,t,r){var n=r(26),s=r(123).f,o={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(e){try{return s(e)}catch(t){return i.slice()}};e.exports.f=function(e){return i&&"[object Window]"==o.call(e)?c(e):s(n(e))}},function(e,t,r){var n=r(16),s=r(6),o=r(28);e.exports=function(e,t){var r=(s.Object||{})[e]||Object[e],i={};i[e]=t(r),n(n.S+n.F*o(function(){r(1)}),"Object",i)}},,function(e,t,r){var n=r(29),s=r(15),o=function(e,t){if(s(e),!n(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,n){try{n=r(27)(Function.call,r(122).f(Object.prototype,"__proto__").set,2),n(e,[]),t=!(e instanceof Array)}catch(s){t=!0}return function(e,r){return o(e,r),t?e.__proto__=r:n(e,r),e}}({},!1):void 0),check:o}},,,,,,,function(e,t,r){"use strict";var n=r(27),s=r(16),o=r(49),i=r(119),c=r(118),a=r(72),u=r(204),l=r(76);s(s.S+s.F*!r(121)(function(e){Array.from(e)}),"Array",{from:function(e){var t,r,s,_,f=o(e),p="function"==typeof this?this:Array,d=arguments.length,g=d>1?arguments[1]:void 0,E=void 0!==g,y=0,T=l(f);if(E&&(g=n(g,d>2?arguments[2]:void 0,2)),void 0==T||p==Array&&c(T))for(t=a(f.length),r=new p(t);t>y;y++)u(r,y,E?g(f[y],y):f[y]);else for(_=T.call(f),r=new p;!(s=_.next()).done;y++)u(r,y,E?i(_,g,[s.value,y],!0):s.value);return r.length=y,r}})},,,function(e,t,r){var n=r(16);n(n.S,"Object",{create:r(67)})},,function(e,t,r){var n=r(49),s=r(124);r(217)("getPrototypeOf",function(){return function(e){return s(n(e))}})},function(e,t,r){var n=r(16);n(n.S,"Object",{setPrototypeOf:r(219).set})},,function(e,t,r){"use strict";var n=r(10),s=r(24),o=r(20),i=r(16),c=r(126),a=r(212).KEY,u=r(28),l=r(70),_=r(48),f=r(50),p=r(8),d=r(75),g=r(74),E=r(211),y=r(205),T=r(208),S=r(15),m=r(26),O=r(73),R=r(36),h=r(67),A=r(216),C=r(122),v=r(17),D=r(35),b=C.f,L=v.f,P=A.f,j=n.Symbol,U=n.JSON,k=U&&U.stringify,I="prototype",w=p("_hidden"),H=p("toPrimitive"),N={}.propertyIsEnumerable,G=l("symbol-registry"),x=l("symbols"),F=l("op-symbols"),M=Object[I],q="function"==typeof j,Y=n.QObject,V=!Y||!Y[I]||!Y[I].findChild,W=o&&u(function(){return 7!=h(L({},"a",{get:function(){return L(this,"a",{value:7}).a}})).a})?function(e,t,r){var n=b(M,t);n&&delete M[t],L(e,t,r),n&&e!==M&&L(M,t,n)}:L,Q=function(e){var t=x[e]=h(j[I]);return t._k=e,t},J=q&&"symbol"==typeof j.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof j},B=function(e,t,r){return e===M&&B(F,t,r),S(e),t=O(t,!0),S(r),s(x,t)?(r.enumerable?(s(e,w)&&e[w][t]&&(e[w][t]=!1),r=h(r,{enumerable:R(0,!1)})):(s(e,w)||L(e,w,R(1,{})),e[w][t]=!0),W(e,t,r)):L(e,t,r)},K=function(e,t){S(e);for(var r,n=y(t=m(t)),s=0,o=n.length;o>s;)B(e,r=n[s++],t[r]);return e},z=function(e,t){return void 0===t?h(e):K(h(e),t)},$=function(e){var t=N.call(this,e=O(e,!0));return!(this===M&&s(x,e)&&!s(F,e))&&(!(t||!s(this,e)||!s(x,e)||s(this,w)&&this[w][e])||t)},X=function(e,t){if(e=m(e),t=O(t,!0),e!==M||!s(x,t)||s(F,t)){var r=b(e,t);return!r||!s(x,t)||s(e,w)&&e[w][t]||(r.enumerable=!0),r}},Z=function(e){for(var t,r=P(m(e)),n=[],o=0;r.length>o;)s(x,t=r[o++])||t==w||t==a||n.push(t);return n},ee=function(e){for(var t,r=e===M,n=P(r?F:m(e)),o=[],i=0;n.length>i;)!s(x,t=n[i++])||r&&!s(M,t)||o.push(x[t]);return o};q||(j=function(){if(this instanceof j)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(r){this===M&&t.call(F,r),s(this,w)&&s(this[w],e)&&(this[w][e]=!1),W(this,e,R(1,r))};return o&&V&&W(M,e,{configurable:!0,set:t}),Q(e)},c(j[I],"toString",function(){return this._k}),C.f=X,v.f=B,r(123).f=A.f=Z,r(47).f=$,r(68).f=ee,o&&!r(46)&&c(M,"propertyIsEnumerable",$,!0),d.f=function(e){return Q(p(e))}),i(i.G+i.W+i.F*!q,{Symbol:j});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),re=0;te.length>re;)p(te[re++]);for(var te=D(p.store),re=0;te.length>re;)g(te[re++]);i(i.S+i.F*!q,"Symbol",{"for":function(e){return s(G,e+="")?G[e]:G[e]=j(e)},keyFor:function(e){if(J(e))return E(G,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){V=!0},useSimple:function(){V=!1}}),i(i.S+i.F*!q,"Object",{create:z,defineProperty:B,defineProperties:K,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:ee}),U&&i(i.S+i.F*(!q||u(function(){var e=j();return"[null]"!=k([e])||"{}"!=k({a:e})||"{}"!=k(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!J(e)){for(var t,r,n=[e],s=1;arguments.length>s;)n.push(arguments[s++]);return t=n[1],"function"==typeof t&&(r=t),!r&&T(t)||(t=function(e,t){if(r&&(t=r.call(this,e,t)),!J(t))return t}),n[1]=t,k.apply(U,n)}}}),j[I][H]||r(25)(j[I],H,j[I].valueOf),_(j,"Symbol"),_(Math,"Math",!0),_(n.JSON,"JSON",!0)},function(e,t,r){r(74)("asyncIterator")},function(e,t,r){r(74)("observable")},function(e,t){}]);
//# sourceMappingURL=bundle.js.map