(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"0dfe":function(e,t,a){"use strict";a.r(t);var n=a("83b2"),s=a.n(n);for(var o in n)"default"!==o&&function(e){a.d(t,e,function(){return n[e]})}(o);t["default"]=s.a},"14c5":function(e,t,a){"use strict";var n=a("d52f"),s=a.n(n);s.a},"1caa":function(e,t,a){"use strict";a.r(t);var n=a("552f"),s=a("0dfe");for(var o in s)"default"!==o&&function(e){a.d(t,e,function(){return s[e]})}(o);a("14c5");var i=a("2877"),r=Object(i["a"])(s["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports},"552f":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view",{staticClass:"login"},[a("image",{staticClass:"logo",attrs:{src:"../../static/login-logo.png"}}),a("view",{staticClass:"login-wrapper"},[a("view",{staticClass:"login-phone"},[a("i",{staticClass:"icon"}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.phoneVal,expression:"phoneVal"}],attrs:{type:"text",placeholder:"请输入您的手机号码",eventid:"28a77ee8-0"},domProps:{value:e.phoneVal},on:{input:function(t){t.target.composing||(e.phoneVal=t.target.value)}}})],1),a("view",{staticClass:"login-password"},[a("i",{staticClass:"icon"}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordVal,expression:"passwordVal"}],attrs:{type:"password",placeholder:"请输入您的密码",eventid:"28a77ee8-1"},domProps:{value:e.passwordVal},on:{input:function(t){t.target.composing||(e.passwordVal=t.target.value)}}})],1),a("view",{staticClass:"btn-wrap"},[a("view",{staticClass:"sure-btn",attrs:{eventid:"28a77ee8-2"},on:{tap:e.handleClickLogin}},[e._v("确认登陆")]),a("view",{staticClass:"register-btn",attrs:{eventid:"28a77ee8-3"},on:{tap:e.openRegister}},[e._v("没有账号？去注册")])]),a("view",{staticClass:"forget",attrs:{eventid:"28a77ee8-4"},on:{tap:e.openForget}},[e._v("忘记密码？")])])])},s=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return s})},"83b2":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a("e635"),s={data:function(){return{phoneVal:"",passwordVal:""}},methods:{handleClickLogin:function(){""!=this.phoneVal?(0,n.checkphone)(this.phoneVal)?""!=this.passwordVal?e.request({url:n.config.api_base_url+"member/login",method:"POST",data:{telphone:this.phoneVal,password:this.passwordVal},success:function(t){var a=t.data;"0000"==a.rescode?(e.setStorageSync("memberid",a.data.memberid),e.setStorageSync("nickname",a.data.nickname),e.setStorageSync("headimgurl",a.data.headimgurl),(0,n.sucToast)("登陆成功"),setTimeout(function(){e.switchTab({url:"/pages/tabBar/index/index"})},1500)):(0,n.Toast)(a.resmsg)}}):(0,n.Toast)("密码不能为空！"):(0,n.Toast)("手机号格式不正确！"):(0,n.Toast)("手机号码不能为空！")},openRegister:function(){e.navigateTo({url:"../register/register"})},openForget:function(){e.navigateTo({url:"../forget/forget"})}}};t.default=s}).call(this,a("6e42")["default"])},d52f:function(e,t,a){},fdda:function(e,t,a){"use strict";a("6de6");var n=o(a("b0ce")),s=o(a("1caa"));function o(e){return e&&e.__esModule?e:{default:e}}Page((0,n.default)(s.default))}},[["fdda","common/runtime","common/vendor"]]]);