(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/info/review/review"],{"0041":function(t,e,n){"use strict";n.r(e);var a=n("eb18"),i=n("8024");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("9040");var o=n("2877"),r=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},2975:function(t,e,n){"use strict";n("6de6");var a=s(n("b0ce")),i=s(n("0041"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},8024:function(t,e,n){"use strict";n.r(e);var a=n("901e"),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e["default"]=i.a},"901e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(n("56ed")),i=n("e635");function s(t){return t&&t.__esModule?t:{default:t}}var o={components:{uniLoadMore:a.default},data:function(){return{loading:!1,loadingType:1,loadingFlag:!1,contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},news:[],num:1,total:0,size:10}},methods:{previewImage:function(e,n){var a=e[n];t.previewImage({current:a,urls:e})},_getList:function(){var e=this;t.request({url:i.config.api_base_url+"mycenter/index",method:"GET",data:{p:this.num,memberid:t.getStorageSync("memberid"),actname:"mycomment"},success:function(n){n=n.data,"0000"===n.rescode&&(t.hideLoading(),e.loading=!0,e.total=Number(n.total),e.loadingFlag=!0,e.news=n.data,console.log(e.news),null==e.news&&(e.news=[]),e.total<=10&&(e.loadingType=2))}})}},onReachBottom:function(){var e=this;2!=this.loadingType&&(this.num=this.num+1,(this.num-1)*this.size<=this.total?t.request({url:i.config.api_base_url+"mycenter/index?p="+this.num+"&size="+this.size,data:{p:this.num,memberid:t.getStorageSync("memberid"),actname:"mycomment"},success:function(t){200==t.statusCode&&(t=t.data,e.news=e.news.concat(t.data),e.news.length===e.total&&(e.loadingType=2))}}):this.loadingType=2)},onLoad:function(){t.showLoading({title:"加载中"}),this._getList()}};e.default=o}).call(this,n("6e42")["default"])},9040:function(t,e,n){"use strict";var a=n("9a9d"),i=n.n(a);i.a},"9a9d":function(t,e,n){},eb18:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"review"},[t.news.length&&t.loading?n("view",{staticClass:"item"},[t._l(t.news,function(e,a){return n("view",{key:a,staticClass:"list"},[n("view",{staticClass:"reply"},[n("text",[t._v("评价内容: "+t._s(e.replyinfo))])]),n("view",{staticClass:"info"},[n("view",{staticClass:"text"},[t._v(t._s(e.bbstitle))]),e.artpics?n("view",{staticClass:"pic-wrap"},t._l(e.artpics,function(i,s){return n("view",{key:s,staticClass:"pic"},[n("image",{attrs:{src:i,mode:"aspectFill",eventid:"20ed8d09-0-"+a+"-"+s},on:{tap:function(n){t.previewImage(e.artpics,s)}}})])})):t._e()]),n("view",{staticClass:"bottom"},[n("view",{staticClass:"left"},[t._v(t._s(e.createtime))])])])}),t.loadingFlag?n("uni-load-more",{attrs:{loadingType:t.loadingType,contentText:t.contentText,mpcomid:"20ed8d09-0"}}):t._e()],2):t._e(),!t.news.length&&t.loading?n("view",{staticClass:"no-result-wrap"},[n("image",{staticClass:"notice-none",attrs:{src:"../../../static/no-result.png"}}),n("text",{staticClass:"no-result-text"},[t._v("暂无信息")])]):t._e()])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})}},[["2975","common/runtime","common/vendor"]]]);