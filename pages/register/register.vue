<template>
	<view class="register">
		<image class="logo" src="../../static/login-logo.png"></image>
		<view class="register-wrapper">
			<!-- 手机号码 -->
			<view class="register-phone">
				<i class="icon"></i>
				<input type="text" v-model="phoneVal" placeholder="请输入您的手机号码" />
			</view>
			<!-- 昵称 -->
			<view class="register-name">
				<i class="icon"></i>
				<input type="text" v-model="nameVal" placeholder="请输入您的昵称" />
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
			<view class="register-password">
				<i class="icon"></i>
				<input type="password" v-model="passwordVal" placeholder="请输入您的密码" />
			</view>
			<!-- 协议 -->
			<view class="register-tcp">
				<i class="icon"></i>
				<view class="tcp-wrapper">
					<text class="tcp-text" @tap="handleClickTcp">《每日江夏软件许可及服务协议》</text>
					<label class="checkbox" @tap="handleClickChecked">
						<checkbox value="" :checked="checked" />
					</label>
				</view>
			</view>
			<!-- 确认 -->
			<view class="register-btn" @tap="handleClickSure">确认注册</view>
		</view>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../common/dialog.js'
	
	const url = ""
	
	export default {
		data() {
			return {
				phoneVal: "",
				nameVal: "",
				codeVal: "",
				passwordVal: "",
				codeFlag: true,
				checked: false,
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
			handleClickChecked () {
				this.checked = !this.checked
			},
			// 确认注册
			handleClickSure () {
				if (this.phoneVal == "") {
					Toast("手机号码不能为空")
					return
				}
				if (!checkphone(this.phoneVal)) {
				    Toast('手机号格式不正确！')
				    return
				}
				if (this.nameVal == "") {
					Toast("昵称不能为空")
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
				if (!this.checked) {
					Toast("请勾选服务协议")
					return
				}
				// 表单提交
				uni.request({
					url: config.api_base_url + "member/register",
					method: "POST",
					data: {
						telphone: this.phoneVal,
						nickname: this.nameVal,
						yzcode: this.codeVal,
						password: this.passwordVal
					},
					success: (res) => {
						let ret = res.data
						if (ret.rescode === "0000") {
							sucToast("注册成功")
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
			handleClickTcp () {
				uni.navigateTo({
					url: '../tcp/tcp'
				});
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
	.register {
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
		.register-wrapper {
			width: 100%;
			padding: 0 100upx;
			box-sizing: border-box;
			margin-top: 66upx;
			.register-phone, .register-password, .register-name {
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
			.register-phone {
				input {
					margin-left: 36upx;
				}
			}
			.register-password, .register-name {
				margin-top: 40upx;
				.icon {
					width: 46upx;
					hegiht: 46upx;
					flex: 0 0 46upx;
					background: url("../../static/login-icon1.png") no-repeat;
					background-size: 100% 100%;
				}
			}
			.register-password {
				.icon {
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
			.register-tcp {
				display: flex;
				align-items: center;
				margin-top: 40upx;
				.icon {
					width: 46upx;
					height: 46upx;
					flex: 0 0 46upx;
					background-size: 100% 100%;
				}
				.tcp-wrapper {
					flex: 1;
					margin-left: 28upx;
					font-size: $login-small-size;
					color: #fff;
					display: flex;
					justify-content: space-between;
					align-content: center;
				}
			}
			.register-btn {
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
