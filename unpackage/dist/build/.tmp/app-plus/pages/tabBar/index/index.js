(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/index/index"],{3504:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.loading?e("view",{staticClass:"index"},[e("view",{staticClass:"swiper"},[e("u-swiper",{attrs:{imgUrls:t.imgUrls,eventid:"c45e8082-0",mpcomid:"c45e8082-0"},on:{openSwiperDetail:t.openSwiperDetail}})],1),e("view",{staticClass:"notice"},[t._m(0),e("view",{staticClass:"right"},[e("swiper",{attrs:{vertical:"true",autoplay:"true",circular:"true",interval:"5000"}},t._l(t.msg,function(i,a){return e("swiper-item",{key:a,attrs:{"data-id":i.id,eventid:"c45e8082-1-"+a,mpcomid:"c45e8082-1-"+a},on:{tap:function(i){t.openDetail()}}},[e("navigator",{staticClass:"uni-ellipsis"},[t._v(t._s(i.title))])],1)}))],1)]),e("view",{staticClass:"news"},[e("view",{staticClass:"uni-list"},[t._l(t.listData,function(i,a){return e("view",{key:a,staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover","data-id":i.id,eventid:"c45e8082-2-"+a},on:{tap:t.openDetail}},[e("view",{staticClass:"uni-media-list"},[e("image",{staticClass:"uni-media-list-logo",attrs:{"lazy-load":"",src:i.pic}}),e("view",{staticClass:"uni-media-list-body"},[e("view",{staticClass:"uni-media-list-text-top"},[t._v(t._s(i.title))]),e("view",{staticClass:"time"},[t._v(t._s(i.createtime))]),e("view",{staticClass:"uni-media-list-text-bottom uni-ellipsis"},[t._v(t._s(i.summary))])])])])}),t.loadingFlag?e("uni-load-more",{attrs:{loadingType:t.loadingType,contentText:t.contentText,mpcomid:"c45e8082-2"}}):t._e()],2)])]):t._e()},n=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("view",{staticClass:"left"},[e("image",{staticClass:"icon",attrs:{src:"../../../static/info-icon8.png",mode:""}}),e("text",{staticClass:"text"},[t._v("最新公告")])])}];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return n})},"3c99":function(t,i,e){"use strict";e.r(i);var a=e("48b1"),n=e.n(a);for(var s in a)"default"!==s&&function(t){e.d(i,t,function(){return a[t]})}(s);i["default"]=n.a},"48b1":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=o(e("20e6")),n=o(e("56ed")),s=e("e635");function o(t){return t&&t.__esModule?t:{default:t}}var l={components:{uSwiper:a.default,uniLoadMore:n.default},data:function(){return{headerText:"每日江夏",loadingType:1,loadingFlag:!1,contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},listData:[],num:1,total:0,size:10,msg:[],imgUrls:[],loading:!1}},methods:{openSwiperDetail:function(i){t.navigateTo({url:"./detail/detail?id="+i,success:function(t){}})},openDetail:function(i){var e=i.currentTarget.dataset.id;t.navigateTo({url:"./detail/detail?id="+e,success:function(t){},fail:function(){},complete:function(){}})},_getBanner:function(){var i=this;t.request({url:s.config.api_base_url+"articlelist/banner",method:"GET",data:{cateid:4},success:function(t){var e=t.data;i.imgUrls=e.data}})},_getNotice:function(){var i=this;t.request({url:s.config.api_base_url+"noticelist",method:"GET",success:function(t){if(200==t.statusCode){t=t.data;for(var e=[],a=0;a<t.data.length;a++)e.push({title:t.data[a].title,id:t.data[a].id});i.msg=e}},fail:function(t,i){console.log("fail"+JSON.stringify(t))}})},_getList:function(){var i=this;t.request({url:s.config.api_base_url+"articlelist?p="+this.num+"&size="+this.size,method:"GET",data:{cateid:4},success:function(e){t.hideLoading(),i.loading=!0,200==e.statusCode&&(e=e.data,i.total=Number(e.total),i.listData=e.data,i.loadingFlag=!0,i.total<=10&&(i.loadingType=2))},fail:function(t,i){console.log("fail"+JSON.stringify(t))}})}},onReachBottom:function(){var i=this;2!=this.loadingType&&(this.num=this.num+1,(this.num-1)*this.size<=this.total?t.request({url:s.config.api_base_url+"articlelist?p="+this.num+"&size="+this.size,data:{cateid:4},success:function(t){200==t.statusCode&&(t=t.data,i.listData=i.listData.concat(t.data),i.listData.length===i.total&&(i.loadingType=2))}}):this.loadingType=2)},onLoad:function(){t.showLoading({title:"加载中"}),this._getList(),this._getNotice(),this._getBanner()},onNavigationBarButtonTap:function(i){var e=i.index;1===e&&t.navigateTo({url:"../../info/index/index"})}};i.default=l}).call(this,e("6e42")["default"])},8508:function(t,i,e){},"8b47":function(t,i,e){"use strict";e("6de6");var a=s(e("b0ce")),n=s(e("f463"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(n.default))},e18c:function(t,i,e){"use strict";var a=e("8508"),n=e.n(a);n.a},f463:function(t,i,e){"use strict";e.r(i);var a=e("3504"),n=e("3c99");for(var s in n)"default"!==s&&function(t){e.d(i,t,function(){return n[t]})}(s);e("e18c");var o=e("2877"),l=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,null,null);i["default"]=l.exports}},[["8b47","common/runtime","common/vendor"]]]);