<template>
	<view class="suggest">
		<textarea focus class="suggest-val" v-model="suggestVal" placeholder="请您留下对我们的宝贵意见" />
		<view class="suggest-btn" @tap="onSubmit">提交</view>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	
	export default {
		data() {
			return {
				suggestVal: ""
			};
		},
		methods: {
			onSubmit () {
				if (this.suggestVal == "") {
					Toast("填写内容之后才能成功提交哦")
					return
				}
				// 表单提交
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: "POST",
					data: {
						memberid: uni.getStorageSync("memberid"),
						actname: "suggest",
						suggest: this.suggestVal
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: (res) => {
						console.log(res)
						sucToast("提交成功")
						setTimeout(() => {
							uni.reLaunch({
								url: '../index/index'
							})
						}, 1500)
					}
				})
			}
		},
		onLoad () {
			
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';
	
	page {
		background: #f6f5fb;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.suggest {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		.suggest-val {
			width: 100%;
			height: 540upx;
			background: #fff;
			padding: 24upx;
			box-sizing: border-box;
		}
		.suggest-btn {
			position: absolute;
			bottom: 0;
			width: 100%;
			left: 0;
			background: #2d4de8;
			color: #fff;
			height: 56px;
			text-align: center;
			line-height: 56px;
			font-size: 16px; 
		}
	}
</style>
