<template>
	<view class="change">
		<view class="change-wrap">
			<view class="phone">
				<text>手机号码</text>
				<input type="text" v-model="phoneVal" placeholder="请输入您的手机号码">
			</view>
			<view class="code">
				<text>验证码</text>
				<view class="authcode-wrapper">
					<input type="text" v-model="codeVal" placeholder="请输入验证码">
					<view class="get-code" @tap="handleClickCode" v-bind:class="[codeFlag ? 'codeBlue' : 'codeGray']">{{codeText}}</view>
				</view>
			</view>
			<view class="password">
				<text>新密码</text>
				<input type="password" v-model="passwordVal" placeholder="请输入您的新密码">
			</view>
			<view class="passwords">
				<text>确认新密码</text>
				<input type="password" v-model="passwordsVal" placeholder="请重复输入新密码">
			</view>
		</view>
		<view class="sure-btn" @tap="handleClickSure">确认更改</view>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	
	export default {
		data() {
			return {
				phoneVal: "",
				codeVal: "",
				passwordVal: "",
				passwordsVal: "",
				codeFlag: true,
				codeText: "获取验证码"
			};
		},
		methods: {
			// 发送验证码
			handleClickCode () {
				if (this.phoneVal == "") {
					Toast("手机号码不能为空")
					return
				}
				if (!checkphone(this.phoneVal)) {
				    Toast('手机号格式不正确！')
				    return
				}
				if (!this.codeFlag) {
					return
				}
				this._getCode()
				let count = 60
				const countDown = setInterval(() => {
					count--
					if (count === 0) {
						this.codeText = "重新获取"
						this.codeFlag = true
						clearInterval(countDown)
					} else {
						this.codeFlag = false
						this.codeText = count + "s后重新获取"
					}
				}, 1000)
			},
			// 确认修改
			handleClickSure () {
				if (this.phoneVal == "") {
					Toast("手机号码不能为空")
					return
				}
				if (!checkphone(this.phoneVal)) {
				    Toast('手机号格式不正确！')
				    return
				}
				if (this.codeVal == "") {
					Toast("验证码不能为空")
					return
				}
				if (this.passwordVal == "") {
					Toast("密码不能为空")
					return
				}
				if (this.passwordsVal == "") {
					Toast("密码不能为空")
					return
				}
				// 表单提交
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: "POST",
					data: {
						memberid: uni.getStorageSync("memberid"),
						actname: "changepassword",
						telphone: this.phoneVal,
						yzcode: this.codeVal,
						password: this.passwordVal
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: (res) => {
						console.log(res)
						sucToast("修改成功")
						setTimeout(() => {
							uni.setStorageSync("memberid", null)
							uni.reLaunch({
								url: '../../login/login'
							})
						}, 1500)
					}
				})
			},
			// 获取验证码
			_getCode () {
				uni.request({
					url: config.api_base_url + "member/sendmsg",
					method: "POST",
					data: {
						telphone: this.phoneVal
					},
					success: (res) => {
						console.log(res)
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
	.change {
		background: #fff;
		height: 100%;
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}
	.sure-btn {
		position: absolute;
		bottom: 0;
		width: 100%;
		left: 0;
		background: #2d4de8;
		color: #fff;
		height: 113upx;
		text-align: center;
		line-height: 113upx;
		font-size: $login-large-size;
	}
	.change-wrap {
		width: 100%;
		padding: 0 46upx;
		box-sizing: border-box;
		.phone, .code, .password, .passwords {
			margin-top: 26upx;
			font-size: $login-large-size;
			text {
				display: block;
				color: #666;
			}
			input {
				width: 100%;
				padding: 0 20upx;
				margin-top: 10upx;
				box-sizing: border-box;
				height: 79upx;
				line-height: 79upx;
				background: #f5f5fa;
				border-radius: 10upx;
				display: block;
				color: #000;
			}
		}
		.code {
			.authcode-wrapper {
				display: flex;
				background: #f5f5fa;
				border-radius: 10upx;
				border-radius: 10upx;
				input {
					flex: 1;
					padding: 0 20upx;
					box-sizing: border-box;
					font-size: $login-size;
					border-top-left-radius: 10upx;
					border-bottom-left-radius: 10upx;
					margin-top: 0;
					height: 79upx;
					line-height: 79upx;
					background: #f5f5fa;
				}
				.get-code {
					border-top-right-radius: 10upx;
					border-bottom-right-radius: 10upx;
					flex: 0 0 210upx;
					width: 210upx;
					background: #89c757;
					font-size: $login-size;
					text-align: center;
					line-height: 79upx;
					color: #fff;
				}
				.codeGray {
					background: #d8d8d8;
					color: #707070;
				}
			}
		}
	}
</style>
