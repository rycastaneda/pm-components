!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=n(9),o=r(i),s=n(92),u=n(43),a=n(14),c=n(91),l=r(c),_=n(48),f=r(_),d=n(46),p=r(d),m=n(29),E=n(50),h=r(E);n(87);var T=(0,u.applyMiddleware)(l["default"]),R=(0,u.createStore)(f["default"],T);R.dispatch((0,m.setEndpointHost)(h["default"].configureHostname())),R.dispatch((0,m.setEndpointPath)("")),R.dispatch((0,m.setHeaders)(h["default"].configureHeaders())),(0,s.render)(o["default"].createElement(a.Provider,{store:R},o["default"].createElement(p["default"],null)),document.querySelector('[data-component="quote-requirements"]')),function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(T,"enhance","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/index.js"),__REACT_HOT_LOADER__.register(R,"store","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/index.js"))}()},function(e,t){e.exports=vendor_lib},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){var r=n(38)("wks"),i=n(41),o=n(7).Symbol,s="function"==typeof o,u=e.exports=function(e){return r[e]||(r[e]=s&&o[e]||(s?o:i)("Symbol."+e))};u.store=r},function(e,t,n){var r=n(11);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){e.exports=!n(23)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(7),i=n(2),o=n(21),s=n(10),u="prototype",a=function(e,t,n){var c,l,_,f=e&a.F,d=e&a.G,p=e&a.S,m=e&a.P,E=e&a.B,h=e&a.W,T=d?i:i[t]||(i[t]={}),R=T[u],v=d?r:p?r[t]:(r[t]||{})[u];d&&(n=t);for(c in n)l=!f&&v&&void 0!==v[c],l&&c in T||(_=l?v[c]:n[c],T[c]=d&&"function"!=typeof v[c]?n[c]:E&&l?o(_,r):h&&v[c]==_?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[u]=e[u],t}(_):m&&"function"==typeof _?o(Function.call,_):_,m&&((T.virtual||(T.virtual={}))[c]=_,e&a.R&&R&&!R[c]&&s(R,c,_)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,e.exports=a},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){e.exports=n(1)(1)},function(e,t,n){var r=n(12),i=n(13);e.exports=n(5)?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){var r=n(4),i=n(34),o=n(40),s=Object.defineProperty;t.f=n(5)?Object.defineProperty:function(e,t,n){if(r(e),t=o(t,!0),r(n),i)try{return s(e,t,n)}catch(u){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){e.exports=n(1)(55)},function(e,t,n){"use strict";function r(e){return function(t,n){t((0,R.setEndpointPath)("")),t((0,R.createEntity)({type:v,attributes:e.attributes})).then(function(e){var r=n().quoteRequirements.requirementsRelationship,o=n().quoteRequirements.quoteId;r.push({type:v,id:e.data.id}),t(i(o,r)),t({type:T.IS_CREATED,id:e.data.id}),t(h())})}}function i(e,t){return function(n){var r=document.getElementById("item_id")?document.getElementById("item_id").value:null;n((0,R.setEndpointPath)("/searcher-quote-requests/"+e)),n((0,R.updateEntity)({type:"requested-items",id:r,relationships:{"searcher-requirements":{data:t}}})).then(function(){n(l(t))})}}function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return function(o){o((0,R.readEndpoint)("searcher-quote-requests/"+t+"/requested-items/"+e+"?include=searcherRequirements")).then(function(e){var s=e.data.relationships||{},u=s.searcherRequirements?s.searcherRequirements.data:[];!u.length||r?!function(){var e=[];o((0,R.readEndpoint)(v+"?filters[category_id]="+n)).then(function(n){o(E(n.data)),n.data.forEach(function(t){e.push({type:v,id:parseInt(t.id,10)})}),o(i(t,e)),o(h())})}():(o(l(u)),o(E(e.included)),o(h()))})}}function s(e){return function(t){t((0,R.setEndpointPath)("")),t((0,R.updateEntity)({type:v,id:e.id,attributes:{include:e.attributes.include,mandatory:e.attributes.mandatory,text:e.attributes.text,category_id:e.attributes.category_id}})).then(function(e){t({type:T.IS_SAVED,id:e.data.id})})}}function u(e){return function(t,n){var r=n().quoteRequirements.requirementsRelationship.filter(function(t){return parseInt(t.id,10)!==parseInt(e.id,10)}),o=n().quoteRequirements.quoteId;return t(i(o,r)),t({type:T.IS_DELETED,id:e.id})}}function a(e){return{type:T.IS_EDITING,id:e.id}}function c(e){return{type:T.TOGGLE_VIEW_FULL_TEXT,id:e.id}}function l(e){return{type:T.REQUIREMENTS_RELATIONSHIP_UPDATED,requirementsRelationship:e}}function _(e,t){return{type:T.UPDATE_TEXT,id:e.id,text:t}}function f(e){return{type:T.UPDATE_QUOTE_ID,quoteId:e}}function d(e,t){return{type:T.UPDATE_MANDATORY_SELECTION,id:e.id,mandatory:t}}function p(e,t,n){return{type:T.UPDATE_INCLUSIONS_CATEGORY,id:e.id,include:t,category_id:n}}function m(){return{type:T.REQUIREMENTS_REQUESTED}}function E(e){return{type:T.REQUIREMENTS_RECEIVED,items:e}}function h(){return{type:T.IS_EMPTY_ADDED}}Object.defineProperty(t,"__esModule",{value:!0}),t.createItem=r,t.getItems=o,t.updateItem=s,t.deleteItem=u,t.setItemAsEditing=a,t.toggleViewFullText=c,t.updateRequirementsRelationship=l,t.handleTextChange=_,t.updateQuoteId=f,t.handleMandatorySelection=d,t.handleCategoryInclusionChange=p,t.requestRequirements=m,t.receiveRequirements=E,t.addEmptyRequirement=h;var T=n(30),R=n(29),v="searcher-requirements";!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(v,"TYPE","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(r,"createItem","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(i,"linkRequirementsToQuote","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(o,"getItems","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(s,"updateItem","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(u,"deleteItem","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(a,"setItemAsEditing","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(c,"toggleViewFullText","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(l,"updateRequirementsRelationship","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(_,"handleTextChange","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(f,"updateQuoteId","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(d,"handleMandatorySelection","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(p,"handleCategoryInclusionChange","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(m,"requestRequirements","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(E,"receiveRequirements","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(h,"addEmptyRequirement","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"))}()},function(e,t,n){e.exports={"default":n(57),__esModule:!0}},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(88),o=r(i);t["default"]=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o["default"])(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(53),o=r(i),s=n(52),u=r(s),a=n(42),c=r(a);t["default"]=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":(0,c["default"])(t)));e.prototype=(0,u["default"])(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(o["default"]?(0,o["default"])(e,t):e.__proto__=t)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(42),o=r(i);t["default"]=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,o["default"])(t))&&"function"!=typeof t?e:t}},function(e,t,n){var r=n(59);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t){e.exports={}},function(e,t,n){var r=n(38)("keys"),i=n(41);e.exports=function(e){return r[e]||(r[e]=i(e))}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){var r=n(64),i=n(22);e.exports=function(e){return r(i(e))}},function(e,t,n){var r=n(22);e.exports=function(e){return Object(r(e))}},function(e,t,n){e.exports=n(1)(207)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.REQUIREMENTS_REQUESTED="REQUIREMENTS_REQUESTED",r=t.REQUIREMENTS_RECEIVED="REQUIREMENTS_RECEIVED",i=t.REQUIREMENTS_RELATIONSHIP_UPDATED="REQUIREMENTS_RELATIONSHIP_UPDATED",o=t.IS_EDITING="IS_EDITING",s=t.IS_DELETED="IS_DELETED",u=t.IS_SAVED="IS_SAVED",a=t.IS_CREATED="IS_CREATED",c=t.IS_EMPTY_ADDED="IS_EMPTY_ADDED",l=t.TOGGLE_VIEW_FULL_TEXT="TOGGLE_VIEW_FULL_TEXT",_=t.UPDATE_TEXT="UPDATE_TEXT",f=t.UPDATE_MANDATORY_SELECTION="UPDATE_MANDATORY_SELECTION",d=t.UPDATE_INCLUSIONS_CATEGORY="UPDATE_INCLUSIONS_CATEGORY",p=t.UPDATE_QUOTE_ID="UPDATE_QUOTE_ID";!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(n,"REQUIREMENTS_REQUESTED","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(r,"REQUIREMENTS_RECEIVED","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(i,"REQUIREMENTS_RELATIONSHIP_UPDATED","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(o,"IS_EDITING","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(s,"IS_DELETED","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(u,"IS_SAVED","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(a,"IS_CREATED","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(c,"IS_EMPTY_ADDED","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(l,"TOGGLE_VIEW_FULL_TEXT","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(_,"UPDATE_TEXT","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(f,"UPDATE_MANDATORY_SELECTION","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(d,"UPDATE_INCLUSIONS_CATEGORY","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(p,"UPDATE_QUOTE_ID","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"))}()},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(11),i=n(7).document,o=r(i)&&r(i.createElement);e.exports=function(e){return o?i.createElement(e):{}}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,n){e.exports=!n(5)&&!n(23)(function(){return 7!=Object.defineProperty(n(32)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(4),i=n(71),o=n(33),s=n(25)("IE_PROTO"),u=function(){},a="prototype",c=function(){var e,t=n(32)("iframe"),r=o.length,i="<",s=">";for(t.style.display="none",n(63).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(i+"script"+s+"document.F=Object"+i+"/script"+s),e.close(),c=e.F;r--;)delete c[a][o[r]];return c()};e.exports=Object.create||function(e,t){var n;return null!==e?(u[a]=r(e),n=new u,u[a]=null,n[s]=e):n=c(),void 0===t?n:i(n,t)}},function(e,t,n){var r=n(8),i=n(28),o=n(25)("IE_PROTO"),s=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=i(e),r(e,o)?e[o]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?s:null}},function(e,t,n){var r=n(12).f,i=n(8),o=n(3)("toStringTag");e.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,o)&&r(e,o,{configurable:!0,value:t})}},function(e,t,n){var r=n(7),i="__core-js_shared__",o=r[i]||(r[i]={});e.exports=function(e){return o[e]||(o[e]={})}},function(e,t,n){var r=n(26),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},function(e,t,n){var r=n(11);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t,n){e.exports=n(1)(306)},function(e,t,n){e.exports=n(1)(32)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(9),o=r(i),s=function(e){var t=e.handleChange,n=e.category_id,r=void 0===n?null:n,i=e.include,s=void 0!==i&&i,u=e.options,a=void 0===u?[]:u,c=s?"all":"none";return o["default"].createElement("select",{defaultValue:r||c,className:"form-control edit-form__category-select",onChange:t},o["default"].createElement("option",{value:"none"},"only this quote request"),o["default"].createElement("option",{value:"all"},"any quote requests"),a.length?a.map(function(e){return o["default"].createElement("option",{key:e.id,value:e.selectedCategory.id},"any "+e.input)}):null)};s.propTypes={handleChange:i.PropTypes.func.isRequired,options:i.PropTypes.array,category_id:i.PropTypes.string,include:i.PropTypes.bool};var u=s;t["default"]=u,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(s,"InclusionSelection","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/components/InclusionSelection.js"),__REACT_HOT_LOADER__.register(u,"default","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/components/InclusionSelection.js"))}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(16),o=r(i),s=n(17),u=r(s),a=n(18),c=r(a),l=n(20),_=r(l),f=n(19),d=r(f),p=n(9),m=r(p),E=n(14),h=n(15),T=n(44),R=r(T),v=function(e){function t(e){(0,u["default"])(this,t);var n=(0,_["default"])(this,(t.__proto__||(0,o["default"])(t)).call(this,e));return n.handleDescriptionChange=n.handleDescriptionChange.bind(n),n.handleMandatoryChange=n.handleMandatoryChange.bind(n),n.handleCategoryInclusionChange=n.handleCategoryInclusionChange.bind(n),n.handleSave=n.handleSave.bind(n),n}return(0,d["default"])(t,e),(0,c["default"])(t,[{key:"handleCategoryInclusionChange",value:function(e){var t=this.props.item,n=e.target.value,r="none"!==n,i=r&&"all"!==n?parseInt(n,10):null;return this.props.dispatch((0,h.handleCategoryInclusionChange)(t,r,i))}},{key:"handleDescriptionChange",value:function(e){var t=this.props.item;return this.props.dispatch((0,h.handleTextChange)(t,e.target.value))}},{key:"handleMandatoryChange",value:function(e){var t=this.props.item;return this.props.dispatch((0,h.handleMandatorySelection)(t,e.target.checked))}},{key:"handleSave",value:function(e){e.preventDefault(),this.props.item.id?this.props.dispatch((0,h.updateItem)(this.props.item)):this.props.dispatch((0,h.createItem)(this.props.item))}},{key:"render",value:function(){var e=this.props.item,t=e.attributes.text||"",n=window.PlantminerComponents?window.PlantminerComponents.categorySelector:{},r=n?n.dropDowns:[];return m["default"].createElement("div",{className:"quote-inclusions__form edit-form"},m["default"].createElement("div",{className:"col-md-8"},m["default"].createElement("textarea",{name:"description",className:"form-control edit-form__textarea",defaultValue:t,onChange:this.handleDescriptionChange}),m["default"].createElement("div",{className:"checkbox edit-form__checkbox"},m["default"].createElement("label",{htmlFor:"mandatory__"+e.id},m["default"].createElement("input",{name:"mandatory-checkbox__"+e.id,id:"mandatory__"+e.id,type:"checkbox",checked:e.attributes.mandatory,onChange:this.handleMandatoryChange}),"Mandatory for supplier"))),m["default"].createElement("div",{className:"col-md-4"},m["default"].createElement("div",{className:"edit-form__category-select-label"},"Apply to"),m["default"].createElement(R["default"],{options:r,handleChange:this.handleCategoryInclusionChange,include:e.attributes.include,category_id:e.attributes.category_id}),m["default"].createElement("button",{className:"edit-form__button btn",disabled:!e.attributes.text,type:"submit",onClick:this.handleSave},e.id?"Save":"Add")))}}]),t}(p.Component);v.propTypes={dispatch:p.PropTypes.func.isRequired,item:p.PropTypes.object.isRequired};var y=(0,E.connect)()(v);t["default"]=y,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(v,"EditForm","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/containers/EditForm.js"),__REACT_HOT_LOADER__.register(y,"default","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/containers/EditForm.js"))}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){var t=e.quoteRequirements;return{quoteRequirements:t}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(16),s=r(o),u=n(17),a=r(u),c=n(18),l=r(c),_=n(20),f=r(_),d=n(19),p=r(d),m=n(9),E=r(m),h=n(14),T=n(45),R=r(T),v=n(47),y=r(v),A=n(15),q=function(e){function t(e){return(0,a["default"])(this,t),(0,f["default"])(this,(t.__proto__||(0,s["default"])(t)).call(this,e))}return(0,p["default"])(t,e),(0,l["default"])(t,[{key:"componentDidMount",value:function(){var e=this,t=document.getElementById("quote_id").value,n=document.getElementById("qr_category_id"),r=document.getElementById("item_id"),i=n.value;this.props.dispatch((0,A.updateQuoteId)(t)),i&&this.props.dispatch((0,A.getItems)(r.value,t,""+i)),n.addEventListener("change",function(n){var r=document.getElementById("item_id").value;"0"!==n.target.value&&e.props.dispatch((0,A.getItems)(r,t,""+n.target.value,!0))})}},{key:"render",value:function(){var e=this.props.quoteRequirements;return E["default"].createElement("div",{className:"quote-inclusions"},e.items.map(function(e){return e.isEditing?E["default"].createElement(R["default"],{key:e.id,item:e}):E["default"].createElement(y["default"],{key:e.id,item:e})}))}}]),t}(m.Component);q.propTypes={dispatch:m.PropTypes.func.isRequired,quoteRequirements:m.PropTypes.object.isRequired};var O=(0,h.connect)(i)(q);t["default"]=O,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(q,"QuoteRequirements","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/containers/QuoteRequirements.js"),__REACT_HOT_LOADER__.register(i,"mapStateToProps","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/containers/QuoteRequirements.js"),__REACT_HOT_LOADER__.register(O,"default","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/containers/QuoteRequirements.js"))}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(16),o=r(i),s=n(17),u=r(s),a=n(18),c=r(a),l=n(20),_=r(l),f=n(19),d=r(f),p=n(9),m=r(p),E=n(14),h=n(15),T=function(e){function t(e){(0,u["default"])(this,t);var n=(0,_["default"])(this,(t.__proto__||(0,o["default"])(t)).call(this,e));return n.handleUpdate=n.handleUpdate.bind(n),n.handleDelete=n.handleDelete.bind(n),n.toggleViewFullText=n.toggleViewFullText.bind(n),n}return(0,d["default"])(t,e),(0,c["default"])(t,[{key:"handleUpdate",value:function(){return this.props.dispatch((0,h.setItemAsEditing)(this.props.item))}},{key:"handleDelete",value:function(){return this.props.dispatch((0,h.deleteItem)(this.props.item))}},{key:"toggleViewFullText",value:function(){return this.props.dispatch((0,h.toggleViewFullText)(this.props.item))}},{key:"render",value:function(){var e=this.props.item,t=e.attributes.text;return m["default"].createElement("div",{className:"quote-inclusions__form view-form "+(e.attributes.include?"view-form--favourite":"")},m["default"].createElement("div",{className:"view-form__description"},m["default"].createElement("div",{className:"view-form__text"},e.viewFullText?t:t.length>200?t.substring(0,199)+"...":t),t.length>200?m["default"].createElement("a",{className:"view-form__read-more",onClick:this.toggleViewFullText},e.viewFullText?"Read less":"Read more"):null,e.attributes.mandatory?m["default"].createElement("div",{className:"form__text view-form__text--mandatory"},"Mandatory for supplier"):null),m["default"].createElement("div",{className:"view-form__buttons-container"},m["default"].createElement("div",{className:"view-form__button view-form__button--update"},m["default"].createElement("i",{className:"view-form__icon fa fa-pencil-square-o",onClick:this.handleUpdate})),m["default"].createElement("div",{className:"view-form__button view-form__button--delete"},m["default"].createElement("i",{className:"view-form__icon fa fa-trash-o",onClick:this.handleDelete}))))}}]),t}(p.Component);T.propTypes={dispatch:p.PropTypes.func.isRequired,item:p.PropTypes.object.isRequired};var R=(0,E.connect)()(T);t["default"]=R,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(T,"ViewForm","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/containers/ViewForm.js"),__REACT_HOT_LOADER__.register(R,"default","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/containers/ViewForm.js"))}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(43),i=n(29),o=n(49),s=(0,r.combineReducers)({api:i.reducer,quoteRequirements:o.quoteRequirements});t["default"]=s,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(s,"default","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/reducers/index.js")}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments[1];switch(t.type){case f.REQUIREMENTS_REQUESTED:return(0,_["default"])({},e,{areLoading:!0});case f.REQUIREMENTS_RECEIVED:return(0,_["default"])({},e,{items:t.items,areLoading:!1});case f.UPDATE_QUOTE_ID:return(0,_["default"])({},e,{quoteId:t.quoteId});case f.REQUIREMENTS_RELATIONSHIP_UPDATED:return(0,_["default"])({},e,{requirementsRelationship:t.requirementsRelationship});case f.UPDATE_TEXT:case f.UPDATE_INCLUSIONS_CATEGORY:case f.UPDATE_MANDATORY_SELECTION:case f.IS_EMPTY_ADDED:case f.IS_SAVED:case f.IS_CREATED:case f.IS_DELETED:case f.IS_EDITING:case f.TOGGLE_VIEW_FULL_TEXT:return(0,_["default"])({},e,{items:o(e.items,t)});default:return e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];switch(t.type){case f.IS_EMPTY_ADDED:return[].concat((0,c["default"])(e),[d]);case f.IS_SAVED:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{id:t.id,isEditing:!1}):e});case f.IS_CREATED:return e.map(function(e){return 0===e.id?(0,u["default"])({},e,{id:t.id,isEditing:!1}):e});case f.IS_DELETED:return e.filter(function(e){return e.id!==t.id});case f.IS_EDITING:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{isEditing:!0}):e});case f.TOGGLE_VIEW_FULL_TEXT:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{viewFullText:!e.viewFullText}):e});case f.UPDATE_TEXT:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{attributes:(0,_["default"])({},e.attributes,{text:t.text})}):e});case f.UPDATE_MANDATORY_SELECTION:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{attributes:(0,_["default"])({},e.attributes,{mandatory:t.mandatory})}):e});case f.UPDATE_INCLUSIONS_CATEGORY:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{attributes:(0,_["default"])({},e.attributes,{include:t.include,category_id:t.category_id})}):e});default:return e}}Object.defineProperty(t,"__esModule",{value:!0});var s=n(89),u=r(s),a=n(54),c=r(a),l=n(90),_=r(l);t.quoteRequirements=i;var f=n(30),d={id:0,isEditing:!0,viewFullText:!1,attributes:{mandatory:!1,include:!1,text:"",category_id:null}},p={items:[],areLoading:!1,requirementsRelationship:[],quoteRelationships:{},quoteId:""};!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(d,"DEFAULT_EMPTY_ITEM","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/reducers/quoteRequirements.js"),__REACT_HOT_LOADER__.register(p,"DEFAULT_STATE","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/reducers/quoteRequirements.js"),__REACT_HOT_LOADER__.register(i,"quoteRequirements","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/reducers/quoteRequirements.js"),__REACT_HOT_LOADER__.register(o,"items","/Users/michaelheinrichs/Sites/plantminer-components/quote-requirements/src/reducers/quoteRequirements.js"))}()},function(e,t,n){function r(){var e="pm_token",t=document.cookie.split(";").map(function(e){return e.trim().split("=")}).reduce(function(e,t){return e[t[0]]=t[1],e},{})[e];return{Authorization:"Bearer "+t,Accept:"application/vnd.pm.v1+json","Content-Type":"application/vnd.pm.v1+json"}}function i(){var e="https://",t=window.location.hostname.replace(/www./,""),n=t.indexOf("nz")>-1?".co.nz":".com.au",r=".api.staging.plantminer",i=window.location.search.substr(1).split("&").map(function(e){return e.split("=")}).reduce(function(e,t){return e[t[0]]=t[1],e},{}).apiBranch;if(t.indexOf("local.dev")>-1)return e+"api.pm.local.dev";if(i)return[e,i.toLowerCase(),r,n].join("");if(t.indexOf("staging.pitclient")>-1){var o=window.location.hostname.replace(/client.staging.pitclient.com/,"api.staging.plantminer.com.au");return[e,o].join("")}if(t.indexOf("staging")>-1){var s=window.location.hostname.replace(/www/,"api");return[e,s].join("")}return[e,"api.plantminer",n].join("")}e.exports={configureHostname:i,configureHeaders:r}},function(e,t,n){e.exports={"default":n(55),__esModule:!0}},function(e,t,n){e.exports={"default":n(56),__esModule:!0}},function(e,t,n){e.exports={"default":n(58),__esModule:!0}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(51),o=r(i);t["default"]=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return(0,o["default"])(e)}},function(e,t,n){n(86),n(82),e.exports=n(2).Array.from},function(e,t,n){n(83);var r=n(2).Object;e.exports=function(e,t){return r.create(e,t)}},function(e,t,n){n(84),e.exports=n(2).Object.getPrototypeOf},function(e,t,n){n(85),e.exports=n(2).Object.setPrototypeOf},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var r=n(27),i=n(39),o=n(80);e.exports=function(e){return function(t,n,s){var u,a=r(t),c=i(a.length),l=o(s,c);if(e&&n!=n){for(;c>l;)if(u=a[l++],u!=u)return!0}else for(;c>l;l++)if((e||l in a)&&a[l]===n)return e||l||0;return!e&&-1}}},function(e,t,n){var r=n(31),i=n(3)("toStringTag"),o="Arguments"==r(function(){return arguments}()),s=function(e,t){try{return e[t]}catch(n){}};e.exports=function(e){var t,n,u;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=s(t=Object(e),i))?n:o?r(t):"Object"==(u=r(t))&&"function"==typeof t.callee?"Arguments":u}},function(e,t,n){"use strict";var r=n(12),i=n(13);e.exports=function(e,t,n){t in e?r.f(e,t,i(0,n)):e[t]=n}},function(e,t,n){e.exports=n(7).document&&document.documentElement},function(e,t,n){var r=n(31);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){var r=n(24),i=n(3)("iterator"),o=Array.prototype;e.exports=function(e){return void 0!==e&&(r.Array===e||o[i]===e)}},function(e,t,n){var r=n(4);e.exports=function(e,t,n,i){try{return i?t(r(n)[0],n[1]):t(n)}catch(o){var s=e["return"];throw void 0!==s&&r(s.call(e)),o}}},function(e,t,n){"use strict";var r=n(35),i=n(13),o=n(37),s={};n(10)(s,n(3)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(s,{next:i(1,n)}),o(e,t+" Iterator")}},function(e,t,n){"use strict";var r=n(70),i=n(6),o=n(77),s=n(10),u=n(8),a=n(24),c=n(67),l=n(37),_=n(36),f=n(3)("iterator"),d=!([].keys&&"next"in[].keys()),p="@@iterator",m="keys",E="values",h=function(){return this};e.exports=function(e,t,n,T,R,v,y){c(n,t,T);var A,q,O,g=function(e){if(!d&&e in C)return C[e];switch(e){case m:return function(){return new n(this,e)};case E:return function(){return new n(this,e)}}return function(){return new n(this,e)}},D=t+" Iterator",S=R==E,I=!1,C=e.prototype,x=C[f]||C[p]||R&&C[R],U=x||g(R),b=R?S?g("entries"):U:void 0,L="Array"==t?C.entries||x:x;if(L&&(O=_(L.call(new e)),
O!==Object.prototype&&(l(O,D,!0),r||u(O,f)||s(O,f,h))),S&&x&&x.name!==E&&(I=!0,U=function(){return x.call(this)}),r&&!y||!d&&!I&&C[f]||s(C,f,U),a[t]=U,a[D]=h,R)if(A={values:S?U:g(E),keys:v?U:g(m),entries:b},y)for(q in A)q in C||o(C,q,A[q]);else i(i.P+i.F*(d||I),t,A);return A}},function(e,t,n){var r=n(3)("iterator"),i=!1;try{var o=[7][r]();o["return"]=function(){i=!0},Array.from(o,function(){throw 2})}catch(s){}e.exports=function(e,t){if(!t&&!i)return!1;var n=!1;try{var o=[7],s=o[r]();s.next=function(){return{done:n=!0}},o[r]=function(){return s},e(o)}catch(u){}return n}},function(e,t){e.exports=!0},function(e,t,n){var r=n(12),i=n(4),o=n(74);e.exports=n(5)?Object.defineProperties:function(e,t){i(e);for(var n,s=o(t),u=s.length,a=0;u>a;)r.f(e,n=s[a++],t[n]);return e}},function(e,t,n){var r=n(75),i=n(13),o=n(27),s=n(40),u=n(8),a=n(34),c=Object.getOwnPropertyDescriptor;t.f=n(5)?c:function(e,t){if(e=o(e),t=s(t,!0),a)try{return c(e,t)}catch(n){}if(u(e,t))return i(!r.f.call(e,t),e[t])}},function(e,t,n){var r=n(8),i=n(27),o=n(60)(!1),s=n(25)("IE_PROTO");e.exports=function(e,t){var n,u=i(e),a=0,c=[];for(n in u)n!=s&&r(u,n)&&c.push(n);for(;t.length>a;)r(u,n=t[a++])&&(~o(c,n)||c.push(n));return c}},function(e,t,n){var r=n(73),i=n(33);e.exports=Object.keys||function(e){return r(e,i)}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t,n){var r=n(6),i=n(2),o=n(23);e.exports=function(e,t){var n=(i.Object||{})[e]||Object[e],s={};s[e]=t(n),r(r.S+r.F*o(function(){n(1)}),"Object",s)}},function(e,t,n){e.exports=n(10)},function(e,t,n){var r=n(11),i=n(4),o=function(e,t){if(i(e),!r(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,r){try{r=n(21)(Function.call,n(72).f(Object.prototype,"__proto__").set,2),r(e,[]),t=!(e instanceof Array)}catch(i){t=!0}return function(e,n){return o(e,n),t?e.__proto__=n:r(e,n),e}}({},!1):void 0),check:o}},function(e,t,n){var r=n(26),i=n(22);e.exports=function(e){return function(t,n){var o,s,u=String(i(t)),a=r(n),c=u.length;return a<0||a>=c?e?"":void 0:(o=u.charCodeAt(a),o<55296||o>56319||a+1===c||(s=u.charCodeAt(a+1))<56320||s>57343?e?u.charAt(a):o:e?u.slice(a,a+2):(o-55296<<10)+(s-56320)+65536)}}},function(e,t,n){var r=n(26),i=Math.max,o=Math.min;e.exports=function(e,t){return e=r(e),e<0?i(e+t,0):o(e,t)}},function(e,t,n){var r=n(61),i=n(3)("iterator"),o=n(24);e.exports=n(2).getIteratorMethod=function(e){if(void 0!=e)return e[i]||e["@@iterator"]||o[r(e)]}},function(e,t,n){"use strict";var r=n(21),i=n(6),o=n(28),s=n(66),u=n(65),a=n(39),c=n(62),l=n(81);i(i.S+i.F*!n(69)(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,i,_,f=o(e),d="function"==typeof this?this:Array,p=arguments.length,m=p>1?arguments[1]:void 0,E=void 0!==m,h=0,T=l(f);if(E&&(m=r(m,p>2?arguments[2]:void 0,2)),void 0==T||d==Array&&u(T))for(t=a(f.length),n=new d(t);t>h;h++)c(n,h,E?m(f[h],h):f[h]);else for(_=T.call(f),n=new d;!(i=_.next()).done;h++)c(n,h,E?s(_,m,[i.value,h],!0):i.value);return n.length=h,n}})},function(e,t,n){var r=n(6);r(r.S,"Object",{create:n(35)})},function(e,t,n){var r=n(28),i=n(36);n(76)("getPrototypeOf",function(){return function(e){return i(r(e))}})},function(e,t,n){var r=n(6);r(r.S,"Object",{setPrototypeOf:n(78).set})},function(e,t,n){"use strict";var r=n(79)(!0);n(68)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t){},function(e,t,n){e.exports=n(1)(209)},function(e,t,n){e.exports=n(1)(247)},function(e,t,n){e.exports=n(1)(248)},function(e,t,n){e.exports=n(1)(336)},function(e,t,n){e.exports=n(1)(74)}]);
//# sourceMappingURL=bundle.js.map