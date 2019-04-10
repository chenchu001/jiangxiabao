<template>
	<view class="pic" v-if="loading">
		<!-- banner -->
		<view class="detail-banner" @tap="chooseImage">
			<image mode="aspectFill" :src="imgArr.length ? imgArr[0].fileurl : ''"></image>
			<view class="banner-wrap">
				<image src="../../../static/016.png"></image>
				<text>{{imgArr.length}}</text>
			</view>
		</view>
		<view class="detail-top">
			<view class="title">{{detailList.title}}</view>
			<view class="content">
				<rich-text :nodes="detailList.summary" class="richText"></rich-text>
			</view>
			<view class="bottom">
				<div class="left">
					<!-- <image class="share-icon" src="../../../static/share-icon.png" mode=""></image> -->
					<text class="like-text">阅读</text>
					<text class="share-text">{{detailList.viewnum}}</text>
				</div>
				<div class="right" @tap="handleClickLike">
					<image v-if="!detailList.hasprize" class="like-icon" src="../../../static/love-icon2.png" mode=""></image>
					<image v-if="detailList.hasprize" class="like-icon" src="../../../static/love-icon2-active.png" mode=""></image>
					<text class="share-text">{{detailList.prizenum}}</text>
				</div>
			</view>
		</view>
		<!-- split -->
		<view class="split" v-if="messageList.length"></view>
		<!-- 留言部分 -->
		<view class="detail-bottom">
			<!-- 有留言 -->
			<view class="check-message" v-if="messageList.length">
				<!-- <div class="check-title">
					<text>精选评论</text>
					<text @tap.stop="openReply">写评论</text>
				</div> -->
				<div class="check-list" v-for="(item, index) in messageList" :key="index">
					<div class="left">
						<image class="pic" :src="item.headimgurl == null ? 'http://mrjx.weasing.cn/defaultimg.png' : item.headimgurl" mode=""></image>
					</div>
					<div class="right">
						<div class="right-top">
							<span class="text">{{item.nickname}}</span>
							<!-- <div class="list-like">
								<image v-if="!item.isLike" src="../../../static/love-icon2.png" mode=""></image>
								<image v-if="item.isLike" src="../../../static/love-icon2-active.png" mode=""></image>
								<text>{{item.likeNum}}</text>
							</div> -->
						</div>
						<div class="right-bottom">{{item.replyinfo}}</div>
					</div>
				</div>
			</view>
		</view>
		<!-- 留言 -->
		<view class="detail-fixed">
			<view class="fixed-item" @tap.stop="onShare">
				<image src="../../../static/share-icon1.png"></image>
				<text>分享</text>
			</view>
			<view class="fixed-item" @tap.stop="openReply">
				<image src="../../../static/review-icon1.png"></image>
				<text>留言</text>
			</view>
		</view>
		<!-- share -->
		<view class="detail-share" v-if="share" @tap.stop="hideShare">
			<view class="share-wrap">
				<view class="fixed-item" @tap.stop="shareWeiXin">
					<image src="../../../static/img-icon1.png"></image>
					<text>微信</text>
				</view>
				<view class="fixed-item" @tap.stop="shareFriend">
					<image src="../../../static/img-icon2.png"></image>
					<text>朋友圈</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config, shareWeiXin, shareFriend} from '../../../common/dialog.js'
	
	export default {
		data() {
			return {
				share: false,
				loading: false,
				id: "",
				detailList: {},
				isLike: false,
				imgArr: [],
				messageList: []
			};
		},
		methods: {
			openReply () {
				uni.navigateTo({
					url: '../../love/reply/reply?id=' + this.id + '&type=pic'
				})
			},
			chooseImage () {
				let ret = []
				for (let i=0;i<this.imgArr.length;i++) {
					ret.push(this.imgArr[i].fileurl)
				}
				uni.previewImage({
					indicator: ret.length,
					loop: true,
					urls: ret
				})
			},
			// 点赞
			handleClickLike () {
				let memberid = uni.getStorageSync("memberid")
				uni.request({
					url: config.api_base_url + "articleprize",
					method: 'POST',
					data: {
						artid: this.id,
						memberid: memberid,
						prizetype: 1
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: res => {
						if (res.statusCode == 200) {
							res = res.data
							if (res.rescode === "0000") {
								if (this.detailList.hasprize == 0) {
									this.detailList.hasprize = 1
									this.detailList.prizenum++
								} else {
									this.detailList.hasprize = 0
									this.detailList.prizenum--
								}
							}
						}
					},
					fail: () => {},
					complete: () => {}
				})
			},
			// 分享
			onShare() {
				this.share = true
			},
			hideShare () {
				this.share = false
			},
			// 分享到微信
			shareWeiXin() {
				shareWeiXin("http://uniapp.dcloud.io/", "uni-app分享", "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！","https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",this.hideShare())
			},
			// 分享到朋友圈
			shareFriend () {
				shareFriend("http://uniapp.dcloud.io/", "uni-app分享", "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！","https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png", this.hideShare())
			},
			// 获取评论数据
			_getMessageList (id, cateid, memberid) {
				uni.request({
					url: config.api_base_url + "articlecomment?artid=" + id + "&cateid=" + cateid + "&memberid=" + memberid,
					method: 'GET',
					success: res => {
						if (res.statusCode == 200) {
							res = res.data
							if (res.resmsg === "数据为空") {
								this.messageList = []
							} else {
								this.messageList = res.data
							}
						}
					},
					fail: () => {},
					complete: () => {}
				})
			},
			// 请求详情数据
			_getDetailList (id, memberid) {
				uni.request({
					url: config.api_base_url + "articlelist/read",
					method: 'GET',
					data: {
						cateid: 2,
						memberid: memberid,
						id: id
					},
					success: res => {
						if (res.statusCode == 200) {
							uni.hideLoading()
							this.loading = true
							res = res.data.data
							this.detailList = res
							this.imgArr = res.content
						}
					}
				})
			}
		},
		onLoad (event) {
			let memberid = uni.getStorageSync("memberid")
			this.id = event.id
			uni.showLoading({
				title: "加载中"
			})
			this._getDetailList(this.id, memberid)
			this._getMessageList(this.id, 2, memberid)
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';
	
	.pic {
		flex-wrap: wrap;
		background: #fff;
		overflow: hidden;
		.pic-hint {
			width: 100%;
			position: fixed;
			z-index: 9999;
			bottom: 10px;
			height: 60px;
			background: red;
			left: 0;
		}
		.detail-banner {
			width: 100%;
			height: 460upx;
			position: relative;
			image {
				width: 100%;
				height: 100%;
			}
			.banner-wrap {
				position: absolute;
				height: 40px;
				bottom: 0;
				left: 0;
				width: 100%;
				line-height: 40px;
				background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 1)));
				background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
				padding: 0 10px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				color: #fff;
				font-size: 32upx;
				text-align: right;
				image {
					width: 50upx;
					height: 42upx;
					display: inline-block;
					vertical-align: middle;
				}
				text {
					font-size: 28upx;
					color: #fff;
					display: inline-block;
					vertical-align: middle;
					margin-left: 14upx;
				}
			}
		}
		.split {
			width: 100%;
			height: 20upx;
			background: #f5f5f5;
		}
		.detail-share {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0, 0, 0, .8);
			z-index: 999;
			.share-wrap {
				width: 100%;
				height: 160upx;
				position: absolute;
				align-items: center;
				position: fixed;
				bottom: 0;
				left: 0;
				background: #fff;
				display: flex;
				.fixed-item {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-right: 1px solid rgba(7, 17, 27, .1);
					&:nth-child(2) {
						border-right: none;
					}
					image {
						width: 48upx;
						height: 48upx;
					}
					text {
						font-size: 32upx;
					}
				}
			}
		}
		.detail-fixed {
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1upx solid rgba(7, 17, 27, .1);
			.fixed-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				border-right: 1px solid rgba(7, 17, 27, .1);
				&:nth-child(2) {
					border-right: none;
				}
				image {
					width: 48upx;
					height: 48upx;
				}
				text {
					font-size: 32upx;
					margin-left: 14upx;
				}
			}
		}
		.detail-top {
			width: 100%;
			background: #fff;
			padding: 14upx 36upx;
			box-sizing: border-box;
			.title {
				line-height: 2em;
				font-weight: 700;
				font-size: $login-large-size;
			}
			.content {
				font-size: $login-size;
				line-height: 2em;
				text-align: justify;
				text-indent: 2em;
			}
			.bottom {
				margin-top: 30upx;
				display: flex;
				justify-content: space-between;
				.left, .right {
					display: flex;
					align-items: center;
					.share-icon, .like-icon {
						width: 48upx;
						height: 48upx;
					}
					.share-text {
						font-size: $login-size;
						margin-left: 12upx;
						color: #576b95;
					},
					.like-text {
						font-size: $login-size;
						color: #576b95;
					}
				}
			}
		}
		.detail-bottom {
			width: 100%;
			box-sizing: border-box;
			padding: 22upx 36upx;
			.none-message {
				width: 100%;
				text-align: center;
				color: #576b95;
				font-size: $login-large-size;
			}
			.check-message {
				.check-title {
					display: flex;
					justify-content: space-between;
					margin-bottom: 40upx;
					text {
						font-size: $login-size;
						color: #576b95;
					}
				}
				.check-list {
					display: flex;
					justify-content: space-between;
					overflow: hidden;
					margin-bottom: 40upx;
					.left {
						flex: 0 0 80upx;
						width: 80upx;
						.pic {
							width: 80upx;
							height: 80upx;
							border-radius: 50%;
						}
					}
					.right {
						flex: 1;
						display: flex;
						flex-direction: column;
						margin-left: 16upx;
						.right-top {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.text {
								font-size: $login-size;
								color: #576b95;
							}
							.list-like {
								display: flex;
								align-items: center;
								image {
									width: 36upx;
									height: 36upx;
								}
								text {
									margin-left: 8upx;
									font-size: $login-size;
									color: #576b95;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
