<template>
	<view class="forget">
		<image class="logo" src="../../static/login-logo.png"></image>
		<view class="forget-wrapper">
			<!-- 手机号码 -->
			<view class="forget-phone">
				<i class="icon"></i>
				<input type="text" v-model="phoneVal" placeholder="请输入您的手机号码" />
			</view>
			<!-- 验证码 -->
			<view class="authcode">
				<i class="icon"></i>
				<view class="authcode-wrapper">
					<input type="text" v-model="codeVal" placeholder="请输入验证码">
					<view class="get-code" @tap="handleClickCode" v-bind:class="[codeFlag ? 'codeBlue' : 'codeGray']">{{codeText}}</view>
				</view>
			</view>
			<!-- 密码 -->
			<view class="forget-password">
				<i class="icon"></i>
				<input type="password" v-model="passwordVal" placeholder="请输入您的新密码" />
			</view>
			<!-- 重复输入 -->
			<view class="forget-password-align">
				<i class="icon"></i>
				<input type="password" v-model="passwordAlignVal" placeholder="请重复输入新密码" />
			</view>
			<!-- 确认 -->
			<view class="forget-btn" @tap="handleClickChang">确认更改</view>
		</view>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../common/dialog.js'
	
	export default {
		data() {
			return {
				phoneVal: "",
				codeVal: "",
				passwordVal: "",
				passwordAlignVal: "",
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
			handleClickChang () {
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
				if (this.passwordAlignVal == "") {
					Toast("确认密码不能为空")
					return
				}
				if (this.passwordVal != this.passwordAlignVal) {
					Toast("两次密码不一致")
					return
				}
				// 表单提交
				uni.request({
					url: config.api_base_url + "member/forgetpass",
					method: "POST",
					data: {
						telphone: this.phoneVal,
						yzcode: this.codeVal,
						password: this.passwordVal
					},
					success: (res) => {
						let ret = res.data
						if (ret.rescode === "0000") {
							sucToast("重置成功")
							setTimeout(() => {
								uni.navigateTo({
									url: '../login/login'
								})
							}, 1500)
						} else {
							Toast(ret.resmsg)
						}
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
	@import './../../uni.scss';
	
	page {
		background: $login-bg;
		height: 100%;
	}
	.forget {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.logo {
			width: 150upx;
			height: 150upx;
		}
		.forget-wrapper {
			width: 100%;
			padding: 0 100upx;
			box-sizing: border-box;
			margin-top: 66upx;
			.forget-phone, .forget-password {
				display: flex;
				align-items: center;
				.icon {
					background: url("../../static/register-icon1.png") no-repeat;
					width: 38upx;
					height: 47upx;
					flex: 0 0 38upx;
					background-size: 100% 100%;
				}
				input {
					flex: 1;
					margin-left: 28upx;
					background: #fff;
					border-radius: 10upx;
					height: 60upx;
					line-height: 60upx;
					padding: 0 20upx;
					box-sizing: border-box;
					font-size: $login-size;
				}
			}
			.forget-phone {
				input {
					margin-left: 36upx;
				}
			}
			.forget-password {
				margin-top: 40upx;
				.icon {
					width: 46upx;
					height: 46upx;
					flex: 0 0 46upx;
					background: url("../../static/login-icon2.png") no-repeat;
					background-size: 100% 100%;
				}
			}
			.authcode {
				display: flex;
				align-items: center;
				margin-top: 40upx;
				.icon {
					background: url("../../static/register-icon2.png") no-repeat;
					width: 46upx;
					height: 46upx;
					flex: 0 0 46upx;
					background-size: 100% 100%;
				}
				.authcode-wrapper {
					flex: 1;
					display: flex;
					margin-left: 28upx;
					background: #fff;
					border-radius: 10upx;
					border-radius: 10upx;
					input {
						flex: 1;
						background: #fff;
						padding: 0 20upx;
						box-sizing: border-box;
						font-size: $login-size;
						border-top-left-radius: 10upx;
						border-bottom-left-radius: 10upx;
						height: 60upx;
						line-height: 60upx;
					}
					.get-code {
						border-top-right-radius: 10upx;
						border-bottom-right-radius: 10upx;
						flex: 0 0 210upx;
						width: 210upx;
						background: #89c757;
						font-size: $login-size;
						text-align: center;
						line-height: 60upx;
						color: #fff;
					}
					.codeGray {
						background: #d8d8d8;
						color: #707070;
					}
				}
			}
			.forget-password-align {
				display: flex;
				align-items: center;
				margin-top: 40upx;
				.icon {
					width: 46upx;
					height: 46upx;
					flex: 0 0 46upx;
					background-size: 100% 100%;
				}
				input {
					flex: 1;
					background: #fff;
					padding: 0 20upx;
					box-sizing: border-box;
					font-size: $login-size;
					border-top-left-radius: 10upx;
					border-bottom-left-radius: 10upx;
					height: 60upx;
					line-height: 60upx;
					margin-left: 28upx;
				}
			}
			.forget-btn {
				margin: 46upx auto 0;
				width: 260upx;
				height: 60upx;
				line-height: 60upx;
				font-weight: 400;
				background: $login-sure-btn;
				border: 1px solid #fff;
				text-align: center;
				color: #fff;
				border-radius: 8upx;
				font-size: $login-size;
				box-sizing: border-box;
			}
		}
	}
</style>
