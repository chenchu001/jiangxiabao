(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/judge/judge"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!D:\\phpStudy\\WWW\\jiangxia daily\\pages\\judge\\judge.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!D:/phpStudy/WWW/jiangxia daily/pages/judge/judge.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var _default =\n\n\n\n\n\n\n{\n  data: function data() {\n    return {};\n\n  },\n  onLoad: function onLoad() {\n    this.loadExecution();\n  },\n  methods: {\n    loadExecution: function loadExecution() {\n\n      try {\n        var value = uni.getStorageSync('launchFlag');\n        var memberid = uni.getStorageSync('memberid');\n        if (value) {\n          if (value == true) {\n            if (memberid != null) {\n              uni.switchTab({\n                url: '/pages/tabBar/index/index' });\n\n            } else {\n              uni.redirectTo({\n                url: '/pages/login/login' });\n\n            }\n          } else {\n            uni.redirectTo({\n              url: '/pages/index/guide' });\n\n          }\n        } else {\n          // \t\t\t\t        uni.setStorage({\n          // \t\t\t\t            key: 'launchFlag',\n          // \t\t\t\t            data: true,\n          // \t\t\t\t            success: function() {\n          // \t\t\t\t\t\t\t\tconsole.log('存储launchFlag');\n          // \t\t\t\t\t\t\t}\n          // \t\t\t\t        });\n          uni.redirectTo({\n            url: '/pages/index/guide' });\n\n        }\n      } catch (e) {\n        // error \n        uni.setStorage({\n          key: 'launchFlag',\n          data: true,\n          success: function success() {\n            console.log('error时存储launchFlag');\n          } });\n\n        uni.redirectTo({ url: '/pages/index/guide' });\n      }\n      return;\n\n      uni.switchTab({\n        url: '/pages/tabBar/index/index' });\n\n    } } };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ \"./node_modules/@dcloudio/uni-app-plus/dist/index.js\")[\"default\"]))\n\n//# sourceURL=uni-app:///pages/judge/judge.vue?vue&type=script&lang=js&?e25a");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!D:\\phpStudy\\WWW\\jiangxia daily\\pages\\judge\\judge.vue?vue&type=template&id=fbd3a0c4&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!D:/phpStudy/WWW/jiangxia daily/pages/judge/judge.vue?vue&type=template&id=fbd3a0c4& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"view\", { staticClass: \"content\" })\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=D:/phpStudy/WWW/jiangxia_daily/pages/judge/judge.vue?vue&type=template&id=fbd3a0c4&");

/***/ }),

/***/ "D:\\phpStudy\\WWW\\jiangxia daily\\main.js?{\"page\":\"pages%2Fjudge%2Fjudge\"}":
/*!*******************************************************************************!*\
  !*** D:/phpStudy/WWW/jiangxia daily/main.js?{"page":"pages%2Fjudge%2Fjudge"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("__webpack_require__(/*! uni-pages */ \"D:\\\\phpStudy\\\\WWW\\\\jiangxia daily\\\\pages.json\");\nvar _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ \"./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js\"));\nvar _judge = _interopRequireDefault(__webpack_require__(/*! ./pages/judge/judge.vue */ \"D:\\\\phpStudy\\\\WWW\\\\jiangxia daily\\\\pages\\\\judge\\\\judge.vue\"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\nPage((0, _mpvuePageFactory.default)(_judge.default));\n\n//# sourceURL=D:/phpStudy/WWW/jiangxia_daily/main.js?%7B%22page%22:%22pages%252Fjudge%252Fjudge%22%7D");

/***/ }),

/***/ "D:\\phpStudy\\WWW\\jiangxia daily\\pages\\judge\\judge.vue":
/*!************************************************************!*\
  !*** D:/phpStudy/WWW/jiangxia daily/pages/judge/judge.vue ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _judge_vue_vue_type_template_id_fbd3a0c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./judge.vue?vue&type=template&id=fbd3a0c4& */ \"D:\\\\phpStudy\\\\WWW\\\\jiangxia daily\\\\pages\\\\judge\\\\judge.vue?vue&type=template&id=fbd3a0c4&\");\n/* harmony import */ var _judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./judge.vue?vue&type=script&lang=js& */ \"D:\\\\phpStudy\\\\WWW\\\\jiangxia daily\\\\pages\\\\judge\\\\judge.vue?vue&type=script&lang=js&\");\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _judge_vue_vue_type_template_id_fbd3a0c4___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _judge_vue_vue_type_template_id_fbd3a0c4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"D:/phpStudy/WWW/jiangxia daily/pages/judge/judge.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=D:/phpStudy/WWW/jiangxia_daily/pages/judge/judge.vue");

/***/ }),

/***/ "D:\\phpStudy\\WWW\\jiangxia daily\\pages\\judge\\judge.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** D:/phpStudy/WWW/jiangxia daily/pages/judge/judge.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./judge.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!D:\\\\phpStudy\\\\WWW\\\\jiangxia daily\\\\pages\\\\judge\\\\judge.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_judge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=uni-app:///pages/judge/judge.vue?vue&type=script&lang=js&?52c4");

/***/ }),

/***/ "D:\\phpStudy\\WWW\\jiangxia daily\\pages\\judge\\judge.vue?vue&type=template&id=fbd3a0c4&":
/*!*******************************************************************************************!*\
  !*** D:/phpStudy/WWW/jiangxia daily/pages/judge/judge.vue?vue&type=template&id=fbd3a0c4& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_judge_vue_vue_type_template_id_fbd3a0c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./judge.vue?vue&type=template&id=fbd3a0c4& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!D:\\\\phpStudy\\\\WWW\\\\jiangxia daily\\\\pages\\\\judge\\\\judge.vue?vue&type=template&id=fbd3a0c4&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_judge_vue_vue_type_template_id_fbd3a0c4___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_weichong_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_judge_vue_vue_type_template_id_fbd3a0c4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=D:/phpStudy/WWW/jiangxia_daily/pages/judge/judge.vue?vue&type=template&id=fbd3a0c4&");

/***/ })

},[["D:\\phpStudy\\WWW\\jiangxia daily\\main.js?{\"page\":\"pages%2Fjudge%2Fjudge\"}","common/runtime","common/vendor"]]]);