(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/social/province/search/search"],{"0917":function(t,e,a){"use strict";a.r(e);var n=a("b569"),i=a("ce7a");for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);a("4d70");var s=a("2877"),r=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},"4d70":function(t,e,a){"use strict";var n=a("6c95"),i=a.n(n);i.a},"6c95":function(t,e,a){},"7dc1":function(t,e,a){"use strict";a("6de6");var n=c(a("b0ce")),i=c(a("0917"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},"9ec6":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=c(a("6499")),i=a("e635");function c(t){return t&&t.__esModule?t:{default:t}}var s={components:{uniIcon:n.default},data:function(){return{searchList:[],loading:!1}},methods:{openDetail:function(e){var a=e.currentTarget.dataset.id;t.navigateTo({url:"../detail/detail?id="+a,success:function(t){},fail:function(){},complete:function(){}})},onSubmit:function(e){var a=this;t.showLoading({title:"正在搜索"});var n=e.detail.value;t.request({url:i.config.api_base_url+"articlelist",data:{keywords:n,cateid:1},success:function(t){wx.hideLoading(),console.log(t),t=t.data,"0000"===t.rescode?a.searchList=t.data:(a.searchList=[],a.loading=!0)},fail:function(t,e){console.log("fail"+JSON.stringify(t))}})}}};e.default=s}).call(this,a("6e42")["default"])},b569:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"search"},[a("view",{staticClass:"search-input"},[a("uni-icon",{staticClass:"search-icon",attrs:{size:"14",type:"search",mpcomid:"52a9c2d2-0"}}),a("input",{staticClass:"search-val",attrs:{focus:"",type:"text","confirm-type":"search",value:"",eventid:"52a9c2d2-0"},on:{confirm:t.onSubmit}}),a("uni-icon",{staticClass:"search-clear",attrs:{type:"clear",size:"14",mpcomid:"52a9c2d2-1"}})],1),a("view",{staticClass:"content"},[t.searchList.length?a("view",{staticClass:"search-item"},t._l(t.searchList,function(e,n){return a("view",{key:n,staticClass:"search-list uni-ellipsis",attrs:{"data-id":e.id,eventid:"52a9c2d2-1-"+n},on:{tap:t.openDetail}},[t._v(t._s(e.title))])})):t._e(),!t.searchList.length&&t.loading?a("view",{staticClass:"search-none"},[a("image",{attrs:{src:"../../../../static/info-icon10.png",mode:""}})]):t._e()])])},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},ce7a:function(t,e,a){"use strict";a.r(e);var n=a("9ec6"),i=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,function(){return n[t]})}(c);e["default"]=i.a}},[["7dc1","common/runtime","common/vendor"]]]);