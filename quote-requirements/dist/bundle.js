!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=n(2),s=r(i),o=n(58),u=n(17),a=n(4),c=n(57),_=r(c),l=n(22),d=r(l),m=n(20),p=r(m),E=n(11),f=n(24),T=r(f);n(39);var R=(0,u.applyMiddleware)(_["default"]),h=(0,u.createStore)(d["default"],R);h.dispatch((0,E.setEndpointHost)(T["default"].configureHostname())),h.dispatch((0,E.setEndpointPath)("")),h.dispatch((0,E.setHeaders)(T["default"].configureHeaders())),(0,o.render)(s["default"].createElement(a.Provider,{store:h},s["default"].createElement(p["default"],null)),document.querySelector('[data-component="quote-requirements"]')),function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(R,"enhance","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/index.js"),__REACT_HOT_LOADER__.register(h,"store","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/index.js"))}()},function(e,t){e.exports=vendor_lib},function(e,t,n){e.exports=n(1)(1)},function(e,t,n){e.exports=n(1)(214)},function(e,t,n){e.exports=n(1)(55)},function(e,t,n){"use strict";function r(e){return function(t,n){t((0,h.setEndpointPath)("")),t((0,h.createEntity)({type:q,attributes:e.attributes})).then(function(e){var r=n().quoteRequirements.requirementsRelationship,s=n().quoteRequirements.quoteId;r.push({type:q,id:e.data.id}),t(i(s,r)),t({type:R.IS_CREATED,id:e.data.id}),t(T())})}}function i(e,t){return function(n){var r=document.getElementById("item_id")?document.getElementById("item_id").value:null;n((0,h.setEndpointPath)("/searcher-quote-requests/"+e)),n((0,h.updateEntity)({type:"requested-items",id:r,relationships:{"searcher-requirements":{data:t}}})).then(function(){n(_(t))})}}function s(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return function(s){console.log(e),s((0,h.readEndpoint)("searcher-quote-requests/"+t+"/requested-items/"+e+"?include=searcherRequirements")).then(function(e){var o=e.data.relationships||{},u=o.searcherRequirements?o.searcherRequirements.data:[];!u.length||r?!function(){var e=[];s((0,h.readEndpoint)(q+"?filters[category_id]="+n)).then(function(n){s(f(n.data)),n.data.forEach(function(t){e.push({type:q,id:parseInt(t.id,10)})}),s(i(t,e)),s(T())})}():(s(_(u)),s(f(e.included)),s(T()))})}}function o(e){return function(t){t((0,h.setEndpointPath)("")),t((0,h.updateEntity)({type:q,id:e.id,attributes:{include:e.attributes.include,mandatory:e.attributes.mandatory,text:e.attributes.text,category_id:e.attributes.category_id}})).then(function(e){t({type:R.IS_SAVED,id:e.data.id})})}}function u(e){return function(t,n){var r=n().quoteRequirements.requirementsRelationship.filter(function(t){return parseInt(t.id,10)!==parseInt(e.id,10)}),s=n().quoteRequirements.quoteId;return t(i(s,r)),t({type:R.IS_DELETED,id:e.id})}}function a(e){return{type:R.IS_EDITING,id:e.id}}function c(e){return{type:R.TOGGLE_VIEW_FULL_TEXT,id:e.id}}function _(e){return{type:R.REQUIREMENTS_RELATIONSHIP_UPDATED,requirementsRelationship:e}}function l(e,t){return{type:R.UPDATE_TEXT,id:e.id,text:t}}function d(e){return{type:R.UPDATE_QUOTE_ID,quoteId:e}}function m(e,t){return{type:R.UPDATE_MANDATORY_SELECTION,id:e.id,mandatory:t}}function p(e,t,n){return{type:R.UPDATE_INCLUSIONS_CATEGORY,id:e.id,include:t,category_id:n}}function E(){return{type:R.REQUIREMENTS_REQUESTED}}function f(e){return{type:R.REQUIREMENTS_RECEIVED,items:e}}function T(){return{type:R.IS_EMPTY_ADDED}}Object.defineProperty(t,"__esModule",{value:!0}),t.createItem=r,t.getItems=s,t.updateItem=o,t.deleteItem=u,t.setItemAsEditing=a,t.toggleViewFullText=c,t.updateRequirementsRelationship=_,t.handleTextChange=l,t.updateQuoteId=d,t.handleMandatorySelection=m,t.handleCategoryInclusionChange=p,t.requestRequirements=E,t.receiveRequirements=f,t.addEmptyRequirement=T;var R=n(13),h=n(11),q="searcher-requirements";!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(q,"TYPE","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(r,"createItem","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(i,"linkRequirementsToQuote","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(s,"getItems","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(o,"updateItem","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(u,"deleteItem","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(a,"setItemAsEditing","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(c,"toggleViewFullText","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(_,"updateRequirementsRelationship","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(l,"handleTextChange","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(d,"updateQuoteId","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(m,"handleMandatorySelection","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(p,"handleCategoryInclusionChange","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(E,"requestRequirements","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(f,"receiveRequirements","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"),__REACT_HOT_LOADER__.register(T,"addEmptyRequirement","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/actions/quoteRequirements.js"))}()},function(e,t,n){e.exports={"default":n(31),__esModule:!0}},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(40),s=r(i);t["default"]=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,s["default"])(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(27),s=r(i),o=n(26),u=r(o),a=n(16),c=r(a);t["default"]=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":(0,c["default"])(t)));e.prototype=(0,u["default"])(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(s["default"]?(0,s["default"])(e,t):e.__proto__=t)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(16),s=r(i);t["default"]=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,s["default"])(t))&&"function"!=typeof t?e:t}},function(e,t,n){e.exports=n(1)(207)},function(e,t,n){e.exports=n(1)(212)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.REQUIREMENTS_REQUESTED="REQUIREMENTS_REQUESTED",r=t.REQUIREMENTS_RECEIVED="REQUIREMENTS_RECEIVED",i=t.REQUIREMENTS_RELATIONSHIP_UPDATED="REQUIREMENTS_RELATIONSHIP_UPDATED",s=t.IS_EDITING="IS_EDITING",o=t.IS_DELETED="IS_DELETED",u=t.IS_SAVED="IS_SAVED",a=t.IS_CREATED="IS_CREATED",c=t.IS_EMPTY_ADDED="IS_EMPTY_ADDED",_=t.TOGGLE_VIEW_FULL_TEXT="TOGGLE_VIEW_FULL_TEXT",l=t.UPDATE_TEXT="UPDATE_TEXT",d=t.UPDATE_MANDATORY_SELECTION="UPDATE_MANDATORY_SELECTION",m=t.UPDATE_INCLUSIONS_CATEGORY="UPDATE_INCLUSIONS_CATEGORY",p=t.UPDATE_QUOTE_ID="UPDATE_QUOTE_ID";!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(n,"REQUIREMENTS_REQUESTED","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(r,"REQUIREMENTS_RECEIVED","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(i,"REQUIREMENTS_RELATIONSHIP_UPDATED","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(s,"IS_EDITING","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(o,"IS_DELETED","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(u,"IS_SAVED","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(a,"IS_CREATED","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(c,"IS_EMPTY_ADDED","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(_,"TOGGLE_VIEW_FULL_TEXT","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(l,"UPDATE_TEXT","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(d,"UPDATE_MANDATORY_SELECTION","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(m,"UPDATE_INCLUSIONS_CATEGORY","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"),__REACT_HOT_LOADER__.register(p,"UPDATE_QUOTE_ID","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/constants/ActionTypes.js"))}()},function(e,t,n){e.exports=n(1)(215)},function(e,t,n){e.exports=n(1)(230)},function(e,t,n){e.exports=n(1)(306)},function(e,t,n){e.exports=n(1)(32)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),s=r(i),o=function(e){var t=e.handleChange,n=e.category_id,r=void 0===n?null:n,i=e.include,o=void 0!==i&&i,u=e.options,a=void 0===u?[]:u,c=o?"all":"none";return s["default"].createElement("select",{defaultValue:r||c,className:"form-control edit-form__category-select",onChange:t},s["default"].createElement("option",{value:"none"},"only this quote request"),s["default"].createElement("option",{value:"all"},"any quote requests"),a.length?a.map(function(e){return s["default"].createElement("option",{key:e.id,value:e.selectedCategory.id},"any "+e.input)}):null)};o.propTypes={handleChange:i.PropTypes.func.isRequired,options:i.PropTypes.array,category_id:i.PropTypes.string,include:i.PropTypes.bool};var u=o;t["default"]=u,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(o,"InclusionSelection","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/components/InclusionSelection.js"),__REACT_HOT_LOADER__.register(u,"default","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/components/InclusionSelection.js"))}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),s=r(i),o=n(7),u=r(o),a=n(8),c=r(a),_=n(10),l=r(_),d=n(9),m=r(d),p=n(2),E=r(p),f=n(4),T=n(5),R=n(18),h=r(R),q=function(e){function t(e){(0,u["default"])(this,t);var n=(0,l["default"])(this,(t.__proto__||(0,s["default"])(t)).call(this,e));return n.handleDescriptionChange=n.handleDescriptionChange.bind(n),n.handleMandatoryChange=n.handleMandatoryChange.bind(n),n.handleCategoryInclusionChange=n.handleCategoryInclusionChange.bind(n),n.handleSave=n.handleSave.bind(n),n}return(0,m["default"])(t,e),(0,c["default"])(t,[{key:"handleCategoryInclusionChange",value:function(e){var t=this.props.item,n=e.target.value,r="none"!==n,i=r&&"all"!==n?parseInt(n,10):null;return this.props.dispatch((0,T.handleCategoryInclusionChange)(t,r,i))}},{key:"handleDescriptionChange",value:function(e){var t=this.props.item;return this.props.dispatch((0,T.handleTextChange)(t,e.target.value))}},{key:"handleMandatoryChange",value:function(e){var t=this.props.item;return this.props.dispatch((0,T.handleMandatorySelection)(t,e.target.checked))}},{key:"handleSave",value:function(e){e.preventDefault(),this.props.item.id?this.props.dispatch((0,T.updateItem)(this.props.item)):this.props.dispatch((0,T.createItem)(this.props.item))}},{key:"render",value:function(){var e=this.props.item,t=e.attributes.text||"",n=window.PlantminerComponents?window.PlantminerComponents.categorySelector:{},r=n?n.dropDowns:[];return E["default"].createElement("div",{className:"quote-inclusions__form edit-form"},E["default"].createElement("div",{className:"col-md-8"},E["default"].createElement("textarea",{name:"description",className:"form-control edit-form__textarea",defaultValue:t,onChange:this.handleDescriptionChange}),E["default"].createElement("div",{className:"checkbox edit-form__checkbox"},E["default"].createElement("label",{htmlFor:"mandatory__"+e.id},E["default"].createElement("input",{name:"mandatory-checkbox__"+e.id,id:"mandatory__"+e.id,type:"checkbox",checked:e.attributes.mandatory,onChange:this.handleMandatoryChange}),"Mandatory for supplier"))),E["default"].createElement("div",{className:"col-md-4"},E["default"].createElement("div",{className:"edit-form__category-select-label"},"Apply to"),E["default"].createElement(h["default"],{options:r,handleChange:this.handleCategoryInclusionChange,include:e.attributes.include,category_id:e.attributes.category_id}),E["default"].createElement("button",{className:"edit-form__button btn",disabled:!e.attributes.text,type:"submit",onClick:this.handleSave},e.id?"Save":"Add")))}}]),t}(p.Component);q.propTypes={dispatch:p.PropTypes.func.isRequired,item:p.PropTypes.object.isRequired};var A=(0,f.connect)()(q);t["default"]=A,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(q,"EditForm","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/containers/EditForm.js"),__REACT_HOT_LOADER__.register(A,"default","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/containers/EditForm.js"))}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){var t=e.quoteRequirements;return{quoteRequirements:t}}Object.defineProperty(t,"__esModule",{value:!0});var s=n(6),o=r(s),u=n(7),a=r(u),c=n(8),_=r(c),l=n(10),d=r(l),m=n(9),p=r(m),E=n(2),f=r(E),T=n(4),R=n(19),h=r(R),q=n(21),A=r(q),y=n(5),O=function(e){function t(e){return(0,a["default"])(this,t),(0,d["default"])(this,(t.__proto__||(0,o["default"])(t)).call(this,e))}return(0,p["default"])(t,e),(0,_["default"])(t,[{key:"componentDidMount",value:function(){var e=this,t=document.getElementById("quote_id").value,n=document.getElementById("qr_category_id"),r=document.getElementById("item_id"),i=n.value;this.props.dispatch((0,y.updateQuoteId)(t)),i&&this.props.dispatch((0,y.getItems)(r.value,t,""+i)),n.addEventListener("change",function(n){var r=document.getElementById("item_id").value;console.log("event.target.value id "+n.target.value+"item id "+r),"0"!==n.target.value&&e.props.dispatch((0,y.getItems)(r,t,""+n.target.value,!0))})}},{key:"render",value:function(){var e=this.props.quoteRequirements;return f["default"].createElement("div",{className:"quote-inclusions"},e.items.map(function(e){return e.isEditing?f["default"].createElement(h["default"],{key:e.id,item:e}):f["default"].createElement(A["default"],{key:e.id,item:e})}))}}]),t}(E.Component);O.propTypes={dispatch:E.PropTypes.func.isRequired,quoteRequirements:E.PropTypes.object.isRequired};var D=(0,T.connect)(i)(O);t["default"]=D,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(O,"QuoteRequirements","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/containers/QuoteRequirements.js"),__REACT_HOT_LOADER__.register(i,"mapStateToProps","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/containers/QuoteRequirements.js"),__REACT_HOT_LOADER__.register(D,"default","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/containers/QuoteRequirements.js"))}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),s=r(i),o=n(7),u=r(o),a=n(8),c=r(a),_=n(10),l=r(_),d=n(9),m=r(d),p=n(2),E=r(p),f=n(4),T=n(5),R=function(e){function t(e){(0,u["default"])(this,t);var n=(0,l["default"])(this,(t.__proto__||(0,s["default"])(t)).call(this,e));return n.handleUpdate=n.handleUpdate.bind(n),n.handleDelete=n.handleDelete.bind(n),n.toggleViewFullText=n.toggleViewFullText.bind(n),n}return(0,m["default"])(t,e),(0,c["default"])(t,[{key:"handleUpdate",value:function(){return this.props.dispatch((0,T.setItemAsEditing)(this.props.item))}},{key:"handleDelete",value:function(){return this.props.dispatch((0,T.deleteItem)(this.props.item))}},{key:"toggleViewFullText",value:function(){return this.props.dispatch((0,T.toggleViewFullText)(this.props.item))}},{key:"render",value:function(){var e=this.props.item,t=e.attributes.text;return E["default"].createElement("div",{className:"quote-inclusions__form view-form "+(e.attributes.include?"view-form--favourite":"")},E["default"].createElement("div",{className:"view-form__description"},E["default"].createElement("div",{className:"view-form__text"},e.viewFullText?t:t.length>200?t.substring(0,199)+"...":t),t.length>200?E["default"].createElement("a",{className:"view-form__read-more",onClick:this.toggleViewFullText},e.viewFullText?"Read less":"Read more"):null,e.attributes.mandatory?E["default"].createElement("div",{className:"form__text view-form__text--mandatory"},"Mandatory for supplier"):null),E["default"].createElement("div",{className:"view-form__buttons-container"},E["default"].createElement("div",{className:"view-form__button view-form__button--update"},E["default"].createElement("i",{className:"view-form__icon fa fa-pencil-square-o",onClick:this.handleUpdate})),E["default"].createElement("div",{className:"view-form__button view-form__button--delete"},E["default"].createElement("i",{className:"view-form__icon fa fa-trash-o",onClick:this.handleDelete}))))}}]),t}(p.Component);R.propTypes={dispatch:p.PropTypes.func.isRequired,item:p.PropTypes.object.isRequired};var h=(0,f.connect)()(R);t["default"]=h,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(R,"ViewForm","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/containers/ViewForm.js"),__REACT_HOT_LOADER__.register(h,"default","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/containers/ViewForm.js"))}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(17),i=n(11),s=n(23),o=(0,r.combineReducers)({api:i.reducer,quoteRequirements:s.quoteRequirements});t["default"]=o,function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(o,"default","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/reducers/index.js")}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments[1];switch(t.type){case d.REQUIREMENTS_REQUESTED:return(0,l["default"])({},e,{areLoading:!0});case d.REQUIREMENTS_RECEIVED:return(0,l["default"])({},e,{items:t.items,areLoading:!1});case d.UPDATE_QUOTE_ID:return(0,l["default"])({},e,{quoteId:t.quoteId});case d.REQUIREMENTS_RELATIONSHIP_UPDATED:return(0,l["default"])({},e,{requirementsRelationship:t.requirementsRelationship});case d.UPDATE_TEXT:case d.UPDATE_INCLUSIONS_CATEGORY:case d.UPDATE_MANDATORY_SELECTION:case d.IS_EMPTY_ADDED:case d.IS_SAVED:case d.IS_CREATED:case d.IS_DELETED:case d.IS_EDITING:case d.TOGGLE_VIEW_FULL_TEXT:return(0,l["default"])({},e,{items:s(e.items,t)});default:return e}}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];switch(t.type){case d.IS_EMPTY_ADDED:return[].concat((0,c["default"])(e),[m]);case d.IS_SAVED:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{id:t.id,isEditing:!1}):e});case d.IS_CREATED:return e.map(function(e){return 0===e.id?(0,u["default"])({},e,{id:t.id,isEditing:!1}):e});case d.IS_DELETED:return e.filter(function(e){return e.id!==t.id});case d.IS_EDITING:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{isEditing:!0}):e});case d.TOGGLE_VIEW_FULL_TEXT:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{viewFullText:!e.viewFullText}):e});case d.UPDATE_TEXT:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{attributes:(0,l["default"])({},e.attributes,{text:t.text})}):e});case d.UPDATE_MANDATORY_SELECTION:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{attributes:(0,l["default"])({},e.attributes,{mandatory:t.mandatory})}):e});case d.UPDATE_INCLUSIONS_CATEGORY:return e.map(function(e){return e.id===t.id?(0,u["default"])({},e,{attributes:(0,l["default"])({},e.attributes,{include:t.include,category_id:t.category_id})}):e});default:return e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(47),u=r(o),a=n(28),c=r(a),_=n(48),l=r(_);t.quoteRequirements=i;var d=n(13),m={id:0,isEditing:!0,viewFullText:!1,attributes:{mandatory:!1,include:!1,text:"",category_id:null}},p={items:[],areLoading:!1,requirementsRelationship:[],quoteRelationships:{},quoteId:""};!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(m,"DEFAULT_EMPTY_ITEM","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/reducers/quoteRequirements.js"),__REACT_HOT_LOADER__.register(p,"DEFAULT_STATE","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/reducers/quoteRequirements.js"),__REACT_HOT_LOADER__.register(i,"quoteRequirements","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/reducers/quoteRequirements.js"),__REACT_HOT_LOADER__.register(s,"items","/Users/ekaterinashum/Sites/plantminer-components/quote-requirements/src/reducers/quoteRequirements.js"))}()},function(e,t,n){function r(){const e="pm_token",t=document.cookie.split(";").map(function(e){return e.trim().split("=")}).reduce(function(e,t){return e[t[0]]=t[1],e},{})[e];return{Authorization:"Bearer "+t,Accept:"application/vnd.pm.v1+json","Content-Type":"application/vnd.pm.v1+json"}}function i(){const e="https://",t=window.location.hostname.replace(/www./,""),n=t.indexOf("nz")>-1?".co.nz":".com.au",r=".api.staging.plantminer",i=window.location.search.substr(1).split("&").map(function(e){return e.split("=")}).reduce(function(e,t){return e[t[0]]=t[1],e},{}).apiBranch;return t.indexOf("local.dev")>-1?"https://api.pm.local.dev":i?[e,i.toLowerCase(),r,n].join(""):t.indexOf("release")>-1?[e,"release",r,n].join(""):t.indexOf("hotfix")>-1?[e,"hotfix",r,n].join(""):[e,"api.plantminer",n].join("")}e.exports={configureHostname:i,configureHeaders:r}},function(e,t,n){e.exports={"default":n(29),__esModule:!0}},function(e,t,n){e.exports={"default":n(30),__esModule:!0}},function(e,t,n){e.exports={"default":n(32),__esModule:!0}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(25),s=r(i);t["default"]=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return(0,s["default"])(e)}},function(e,t,n){n(49),n(35),e.exports=n(3).Array.from},function(e,t,n){n(36);var r=n(3).Object;e.exports=function(e,t){return r.create(e,t)}},function(e,t,n){n(37),e.exports=n(3).Object.getPrototypeOf},function(e,t,n){n(38),e.exports=n(3).Object.setPrototypeOf},function(e,t,n){"use strict";var r=n(41),i=n(44);e.exports=function(e,t,n){t in e?r.f(e,t,i(0,n)):e[t]=n}},function(e,t,n){var r=n(43),i=n(42),s=function(e,t){if(i(e),!r(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,r){try{r=n(14)(Function.call,n(56).f(Object.prototype,"__proto__").set,2),r(e,[]),t=!(e instanceof Array)}catch(i){t=!0}return function(e,n){return s(e,n),t?e.__proto__=n:r(e,n),e}}({},!1):void 0),check:s}},function(e,t,n){"use strict";var r=n(14),i=n(12),s=n(15),o=n(52),u=n(53),a=n(45),c=n(33),_=n(54);i(i.S+i.F*!n(55)(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,i,l,d=s(e),m="function"==typeof this?this:Array,p=arguments.length,E=p>1?arguments[1]:void 0,f=void 0!==E,T=0,R=_(d);if(f&&(E=r(E,p>2?arguments[2]:void 0,2)),void 0==R||m==Array&&u(R))for(t=a(d.length),n=new m(t);t>T;T++)c(n,T,f?E(d[T],T):d[T]);else for(l=R.call(d),n=new m;!(i=l.next()).done;T++)c(n,T,f?o(l,E,[i.value,T],!0):i.value);return n.length=T,n}})},function(e,t,n){var r=n(12);r(r.S,"Object",{create:n(50)})},function(e,t,n){var r=n(15),i=n(51);n(46)("getPrototypeOf",function(){return function(e){return i(r(e))}})},function(e,t,n){var r=n(12);r(r.S,"Object",{setPrototypeOf:n(34).set})},function(e,t){},function(e,t,n){e.exports=n(1)(209)},function(e,t,n){e.exports=n(1)(218)},function(e,t,n){e.exports=n(1)(219)},function(e,t,n){e.exports=n(1)(220)},function(e,t,n){e.exports=n(1)(226)},function(e,t,n){e.exports=n(1)(239)},function(e,t,n){e.exports=n(1)(246)},function(e,t,n){e.exports=n(1)(247)},function(e,t,n){e.exports=n(1)(248)},function(e,t,n){e.exports=n(1)(259)},function(e,t,n){e.exports=n(1)(266)},function(e,t,n){e.exports=n(1)(271)},function(e,t,n){e.exports=n(1)(280)},function(e,t,n){e.exports=n(1)(281)},function(e,t,n){e.exports=n(1)(282)},function(e,t,n){e.exports=n(1)(289)},function(e,t,n){e.exports=n(1)(320)},function(e,t,n){e.exports=n(1)(336)},function(e,t,n){e.exports=n(1)(74)}]);
//# sourceMappingURL=bundle.js.map