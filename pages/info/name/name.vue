<template>
	<view class="name">
		<input class="input" focus type="text" v-model="nameValue" />
		<text class="hint">好名字可以让你的朋友更容易记住你</text>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	export default {
		data() {
			return {
				nameValue: "",
				myInfo: ""
			};
		},
		methods: {
			_getList () {
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: 'GET',
					data: {
						memberid: uni.getStorageSync("memberid"),
						actname: "myinfo"
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: res => {
						res = res.data
						if (res.rescode === "0000") {
							this.nameValue = res.data.nickname
						}
					}
				})
			}
		},
		onLoad () {
			this._getList()
		},
		// 导航栏跳转
		onNavigationBarButtonTap(event) {
			let index = event.index
			if (index === 0) {
				if (this.nameValue === "") {
					Toast("昵称不能为空哦")
					return
				}
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: 'POST',
					data: {
						memberid: uni.getStorageSync("memberid"),
						actname: "savemyinfo",
						nickname: this.nameValue
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: res => {
						uni.setStorageSync("nickname", this.nameValue)
						this.$store.commit('changeName', true)
						uni.navigateBack({
							delta: 2,
							url: '../index/index'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';
	
	page {
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.name {
		background: #f6f5fb;
		height: 100%;
		width: 100%;
		padding: 0 24upx;
		box-sizing: border-box;
		overflow: hidden;
		.input {
			margin-top: 40upx;
			width: 100%;
			font-size: $login-large-size;
			height: 78upx;
			line-height: 78upx;
			border-bottom: 1px solid #ccc;
		}
		.hint {
			font-size: $login-size;
			margin-top: 12upx;
			display: block;
			color: #888;
		}
	}
</style>
