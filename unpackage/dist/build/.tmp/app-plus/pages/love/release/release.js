(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/love/release/release"],{"00bb":function(t,e,i){},"0ab0":function(t,e,i){"use strict";var s=i("00bb"),n=i.n(s);n.a},"1b9d":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i("e635"),n=[["camera"],["album"],["camera","album"]],a=[["compressed"],["original"],["compressed","original"]],o=i("8dac"),c={data:function(){return{input_content:"",imageList:[],sourceTypeIndex:2,sourceType:["拍照","相册","拍照或相册"],sizeTypeIndex:2,sizeType:["压缩","原图","压缩或原图"],countIndex:8,count:[1,2,3,4,5,6,7,8,9],faceList:[],faceShow:!1,getBrowString:""}},methods:{blurInput:function(t){},focusInput:function(){this.faceShow=!1,this.faceList=[]},hideEmoji:function(){this.faceShow=!1,this.faceList=[]},showEmoji:function(){if(this.faceShow=!this.faceShow,1==this.faceShow)for(var t in o)this.faceList.push(o[t].char);else this.faceList=[]},getBrow:function(t){for(var e in this.faceList)t==e&&(this.getBrowString=this.faceList[t],this.input_content+=this.getBrowString)},close:function(t){this.imageList.splice(t,1)},previewImage:function(e){var i=e.target.dataset.src;t.previewImage({current:i,urls:this.imageList})},chooseImage:function(){var e=this;this.imageList.length>=9||t.chooseImage({sourceType:n[this.sourceTypeIndex],sizeType:a[this.sizeTypeIndex],count:this.imageList.length+this.count[this.countIndex]>9?9-this.imageList.length:this.count[this.countIndex],success:function(i){var s=0,n=0,a=i.tempFilePaths.length,o=0;t.showLoading({title:"正在上传"}),e.uploadPic(i.tempFilePaths,s,n,o,a)}})},uploadPic:function(e,i,s,n,a){var o=this;t.uploadFile({url:"http://mrjx.weasing.cn/uploadfile.php",filePath:e[n],name:"pic",success:function(t){i++},fail:function(t){s++},complete:function(c){o.imageList.push(c.data),n++,n==a?t.hideLoading():o.uploadPic(e,i,s,n,a)}})},_getList:function(){var e=this;""!==this.input_content?t.request({url:s.config.api_base_url+"bbsarticle/save",method:"POST",data:{memberid:t.getStorageSync("memberid"),bbstitle:this.input_content,pic:this.imageList},header:{"content-type":"application/x-www-form-urlencoded"},success:function(i){200==i.statusCode&&(i=i.data,"0000"===i.rescode?(e.$store.commit("changePublish",!0),(0,s.sucToast)("发表成功"),setTimeout(function(){t.switchTab({url:"../../tabBar/love/love"})},1500)):(0,s.Toast)(i.resmsg))}}):(0,s.Toast)("写点东西在提交呗")}},onNavigationBarButtonTap:function(t){var e=t.index;0===e&&this._getList()},onUnload:function(){this.imageList=[],this.sourceTypeIndex=2,this.sourceType=["拍照","相册","拍照或相册"],this.sizeTypeIndex=2,this.sizeType=["压缩","原图","压缩或原图"],this.countIndex=8}};e.default=c}).call(this,i("6e42")["default"])},5234:function(t,e,i){"use strict";i.r(e);var s=i("6dc3"),n=i("5b3b");for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);i("0ab0");var o=i("2877"),c=Object(o["a"])(n["default"],s["a"],s["b"],!1,null,null,null);e["default"]=c.exports},"5b3b":function(t,e,i){"use strict";i.r(e);var s=i("1b9d"),n=i.n(s);for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);e["default"]=n.a},"6dc3":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"release",attrs:{eventid:"5785b15d-6"},on:{tap:t.hideEmoji}},[i("view",{staticClass:"wrap"},[i("view",{staticClass:"uni-textarea"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.input_content,expression:"input_content"}],attrs:{focus:"",maxlength:"-1",placeholder:"这一刻的想法...",eventid:"5785b15d-0"},domProps:{value:t.input_content},on:{focus:t.focusInput,blur:t.blurInput,input:function(e){e.target.composing||(t.input_content=e.target.value)}}})]),i("view",{staticClass:"release-hint"},[i("view",{staticClass:"left"},[i("image",{attrs:{src:"../../../static/love-icon3.png",eventid:"5785b15d-1"},on:{tap:function(e){e.stopPropagation(),t.showEmoji(e)}}}),i("image",{attrs:{src:"../../../static/love-icon4.png",eventid:"5785b15d-2"},on:{tap:t.chooseImage}})]),i("view",{staticClass:"right"},[i("text",[t._v(t._s(t.imageList.length)+"/9")])])]),i("view",{staticClass:"release-body"},[i("view",{staticClass:"uni-uploader__files"},t._l(t.imageList,function(e,s){return i("block",{key:s},[i("view",{staticClass:"uni-uploader__file",staticStyle:{position:"relative"}},[i("image",{staticClass:"uni-uploader__img",attrs:{mode:"aspectFill",src:e,"data-src":e,eventid:"5785b15d-3-"+s},on:{tap:t.previewImage}}),i("view",{staticClass:"close-view",attrs:{eventid:"5785b15d-4-"+s},on:{click:function(e){t.close(s)}}},[t._v("x")])])])}))])]),t.faceShow?i("view",{staticClass:"emoji"},[i("view",{staticClass:"item"},t._l(t.faceList,function(e,s){return i("view",{key:s,staticClass:"list",attrs:{eventid:"5785b15d-5-"+s},on:{tap:function(e){e.stopPropagation(),t.getBrow(s)}}},[t._v(t._s(e))])}))]):t._e()])},n=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return n})},f714:function(t,e,i){"use strict";i("6de6");var s=a(i("b0ce")),n=a(i("5234"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(n.default))}},[["f714","common/runtime","common/vendor"]]]);