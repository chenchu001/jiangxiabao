<template>
	<view class="index">
		<!-- 头像 -->
		<view class="avatar" @tap="openDatum">
			<view class="avatar-left">
				<image :src="headimgurl"></image>
				<text>{{nickname}}</text>
			</view>
			<image src="../../../static/black-more.png" class="more"></image>
		</view>
		<!-- 线上通知 -->
		<view class="notice" @tap="openNotice">
			<view class="info-left">
				<image src="../../../static/info-icon2.png"></image>
				<text>线上通知</text>
			</view>
			<image src="../../../static/black-more.png" class="more"></image>
		</view>
		<!-- 浏览记录 -->
		<view class="history" @tap="openHistory">
			<view class="info-left">
				<image src="../../../static/info-icon3.png"></image>
				<text>浏览记录</text>
			</view>
			<image src="../../../static/black-more.png" class="more"></image>
		</view>
		<!-- 我的发布 -->
		<view class="release" @tap="openRelease">
			<view class="info-left">
				<image src="../../../static/info-icon4.png"></image>
				<text>我的发布</text>
			</view>
			<image src="../../../static/black-more.png" class="more"></image>
		</view>
		<!-- 我的评论 -->
		<view class="review" @tap="openReview">
			<view class="info-left">
				<image src="../../../static/info-icon5.png"></image>
				<text>我的评论</text>
			</view>
			<image src="../../../static/black-more.png" class="more"></image>
		</view>
		<!-- 更改密码 -->
		<view class="change" @tap="openChange">
			<view class="info-left">
				<image src="../../../static/info-icon6.png"></image>
				<text>更改密码</text>
			</view>
			<image src="../../../static/black-more.png" class="more"></image>
		</view>
		<!-- 设置 -->
		<view class="set" @tap="openSet">
			<view class="info-left">
				<image src="../../../static/info-icon7.png"></image>
				<text>设置</text>
			</view>
			<image src="../../../static/black-more.png" class="more"></image>
		</view>
		<!-- 退出 -->
		<view class="quit" @tap="onQuit">退出账号</view>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	
	export default {
		data() {
			return {
				headimgurl: "http://mrjx.weasing.cn/defaultimg.png",
				nickname: "",
				myInfo: {}
			};
		},
		methods: {
			onQuit () {
				uni.showModal({
					content: "确定退出当前账号",
					success: function (res) {
						if (res.confirm) {
							uni.setStorageSync("memberid", null)
							uni.reLaunch({
								url: '../../login/login'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			openDatum () {
				uni.navigateTo({
					url: '../datum/datum'
				});
			},
			openChange () {
				uni.navigateTo({
					url: '../change/change'
				});
			},
			openHistory () {
				uni.navigateTo({
					url: '../history/history'
				})
			},
			openNotice () {
				uni.navigateTo({
					url: '../notice/notice'
				})
			},
			openRelease () {
				uni.navigateTo({
					url: '../release/release'
				})
			},
			openReview () {
				uni.navigateTo({
					url: '../review/review'
				})
			},
			openSet () {
				uni.navigateTo({
					url: '../set/set'
				})
			},
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
							this.myInfo = res.data
						}
					}
				})
			}
		},
		onShow () {
			this.nickname = uni.getStorageSync("nickname")
			if (uni.getStorageSync("headimgurl") != null) {
				this.headimgurl = uni.getStorageSync("headimgurl")
			}
		},
		onLoad () {
			// this._getList()
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
	.index {
		width: 100%;
		padding: 0 24upx;
		background: #fff;
		box-sizing: border-box;
		.avatar {
			width: 100%;
			background: #fff;
			display: flex;
			align-items: center;
			height: 140upx;
			box-sizing: border-box;
			justify-content: space-between;
			border-bottom: 1px solid #e6e6ed;
			.avatar-left {
				display: flex;
				align-items: center;
				image {
					width: 100upx;
					height: 100upx;
				}
				text {
					margin-left: 30upx;
					font-size: $login-size;
				}
			}
			.more {
				width: 36upx;
				height: 36upx;
			}
		}
		.info, .notice, .history, .release, .review, .change, .set, .quit {
			width: 100%;
			background: #fff;
			height: 88upx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			justify-content: space-between;
			border-bottom: 1px solid #e6e6ed;
			.info-left {
				display: flex;
				align-items: center;
				image {
					width: 32upx;
					height: 41upx;
				}
				text {
					margin-left: 20upx;
					font-size: $login-size;
				}
			}
			.more {
				width: 36upx;
				height: 36upx;
			}
		}
		.notice {
			.info-left{
				image {
					width: 36upx !important;
				}
			}
			
		}
		.history {
			.info-left {
				image {
					width: 37upx !important;
					height: 35upx !important;
				}
			}
		}
		.release {
			.info-left {
				image {
					width: 34upx !important;
					height: 33upx !important;
				}
			}
		}
		.review {
			.info-left {
				image {
					width: 37upx !important;
					height: 33upx !important;
				}
			}
		}
		.change {
			.info-left {
				image {
					width: 33upx !important;
					height: 37upx !important;
				}
			}
		}
		.set {
			border-bottom: none;
			.info-left {
				image {
					width: 37upx !important;
					height: 37upx !important;
				}
			}
		}
		.quit {
			position: absolute;
			left: 0;
			bottom: 0upx;
			width: 100%;
			justify-content: center;
		}
	}
</style>
