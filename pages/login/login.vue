<template>
	<view class="login">
		<image class="logo" src="../../static/login-logo.png"></image>
		<view class="login-wrapper">
			<!-- 手机号码 -->
			<view class="login-phone">
				<i class="icon"></i>
				<input type="text" v-model="phoneVal" placeholder="请输入您的手机号码" />
			</view>
			<!-- 密码 -->
			<view class="login-password">
				<i class="icon"></i>
				<input type="password" v-model="passwordVal" placeholder="请输入您的密码" />
			</view>
			<!-- 登陆 -->
			<view class="btn-wrap">
				<view class="sure-btn" @tap="handleClickLogin">确认登陆</view>
				<view class="register-btn" @tap="openRegister">没有账号？去注册</view>
			</view>
			<!-- 忘记 -->
			<view class="forget" @tap="openForget">忘记密码？</view>
		</view>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../common/dialog.js'
	
	export default {
		data() {
			return {
				phoneVal: "",
				passwordVal: ""
			};
		},
		methods: {
			// 登陆
			handleClickLogin () {
// 				uni.setStorage({
// 				    key: 'launchFlag',
// 				    data: false,
// 				    success: function() {
// 						console.log('存储launchFlag')
// 						plus.runtime.restart();
// 					}
// 				})
// 				return
				if (this.phoneVal == "") {
					Toast("手机号码不能为空！")
					return
				}
				if (!checkphone(this.phoneVal)) {
				    Toast('手机号格式不正确！')
				    return
				}
				if (this.passwordVal == "") {
					Toast("密码不能为空！")
					return
				}
				uni.request({
					url: config.api_base_url + "member/login",
					method: "POST",
					data: {
						telphone: this.phoneVal,
						password: this.passwordVal
					},
					success: (res) => {
						let ret = res.data
						if (ret.rescode == "0000") {
							uni.setStorageSync("memberid", ret.data.memberid)
							uni.setStorageSync("nickname", ret.data.nickname)
							uni.setStorageSync("headimgurl", ret.data.headimgurl)
							sucToast("登陆成功")
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/tabBar/index/index'
								})
							}, 1500)
						} else {
							Toast(ret.resmsg)
						}
					}
				})
			},
			// 注册
			openRegister () {
				uni.navigateTo({
					url: '../register/register'
				});
			},
			// 忘记密码
			openForget () {
				uni.navigateTo({
					url: '../forget/forget'
				});
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
	.login {
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
		.login-wrapper {
			width: 100%;
			padding: 0 100upx;
			box-sizing: border-box;
			margin-top: 66upx;
			.login-phone, .login-password {
				display: flex;
				align-items: center;
				.icon {
					background: url("../../static/login-icon1.png") no-repeat;
					width: 46upx;
					height: 46upx;
					flex: 0 0 46upx;
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
			.login-password {
				margin-top: 40upx;
				.icon {
					background: url("../../static/login-icon2.png") no-repeat;
					background-size: 100% 100%;
				}
			}
			.btn-wrap {
				margin-top: 78upx;
				display: flex;
				justify-content: space-between;
				.sure-btn, .register-btn {
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
				.register-btn {
					background: #8eca5f;
				}
			}
			.forget {
				margin-top:  42upx;
				text-align: center;
				color: #fff;
				font-size: 28upx;
			}
		}
	}
</style>
