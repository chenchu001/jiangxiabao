<template>
	<view class="detail" v-if="loading">
		<view class="title">{{detailList.title}}</view>
		<view class="content">
			<rich-text :nodes="detailList.content" class="richText"></rich-text>
		</view>
		<view class="share-icon" @tap.stop="onShare">
			<image src="../../../../static/img-icon3.png" mode=""></image>
		</view>
		<!-- share -->
		<view class="detail-share" v-if="share" @tap.stop="hideShare">
			<view class="share-wrap">
				<view class="fixed-item" @tap.stop="shareWeiXin">
					<image src="../../../../static/img-icon1.png"></image>
					<text>微信</text>
				</view>
				<view class="fixed-item" @tap.stop="shareFriend">
					<image src="../../../../static/img-icon2.png"></image>
					<text>朋友圈</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config, shareWeiXin, shareFriend} from '../../../../common/dialog.js'

	export default {
		data() {
			return {
				share: false,
				loading: false,
				title: "",
				strings: "",
				detailList: {}
			};
		},
		methods: {
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
			// 获取详情数据
			_getDetailList (id, cateid, memberid) {
				console.log(id, cateid, memberid)
				uni.request({
					url: config.api_base_url + "articlelist/read?id=" + id + "&cateid=" + cateid + "&memberid=" + memberid,
					method: 'GET',
					success: res => {
						if (res.statusCode == 200) {
							uni.hideLoading()
							this.loading = true
							res = res.data.data
							this.detailList = res
						}
					},
					fail: () => {},
					complete: () => {}
				})
			}
		},
		onLoad (event) {
			uni.showLoading({
				title: "加载中"
			})
			let id = event.id
			let memberid = uni.getStorageSync("memberid")
			this._getDetailList(id, 2, memberid)
		}
	}
</script>

<style lang="scss">
	@import './../../../../uni.scss';
	
	.detail {
		padding: 30upx 44upx;
		flex-wrap: wrap;
		.share-icon {
			position: fixed;
			right: 16upx;
			top: 50%;
			display: flex;
			flex-direction: column;
			z-index: 999;
			image {
				width: 56upx;
				height: 56upx;
			}
			text {
				font-size: 32upx;
			}
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
		.title {
			line-height: 2em;
			font-weight: 700;
			font-size: $login-large-size;
			text-align: center;
		}
		.content {
			font-size: $login-size;
			line-height: 2em;
			text-align: justify;
			text-indent: 2em;
		}
	}
</style>
