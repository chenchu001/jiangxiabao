<template>
	<view class="review">
		<!-- 列表 -->
		<view class="item" v-if="news.length && loading">
			<view class="list" v-for="(item, index) in news" :key="index">
				<view class="reply">
					<text>评价内容: {{item.replyinfo}}</text>
				</view>
				<view class="info">
					<view class="text">{{item.bbstitle}}</view>
					<!-- 图片展示 -->
					<view class="pic-wrap" v-if="item.artpics">
						<view class="pic" v-for="(list, key) in item.artpics" :key="key">
							<image :src="list" mode="aspectFill" @tap="previewImage(item.artpics, key)"></image>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="left">{{item.createtime}}</view>
				</view>
			</view>
			<uni-load-more v-if="loadingFlag" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</view>
		<view class="no-result-wrap" v-if="!news.length && loading">
			<image class="notice-none" src="../../../static/no-result.png"></image>
			<text class="no-result-text">暂无信息</text>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				loading: false,
				loadingType: 1,
				loadingFlag: false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				news: [],
				num: 1,
				total: 0,
				size: 10
			};
		},
		methods: {
			// 预览图片
			previewImage(imageList, image_index) {
				var current = imageList[image_index]
				uni.previewImage({
					current: current,
					urls: imageList
				});
			},
			_getList () {
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: 'GET',
					data: {
						p: this.num,
						memberid: uni.getStorageSync("memberid"),
						actname: "mycomment"
					},
					success: res => {
						res = res.data
						if (res.rescode === "0000") {
							uni.hideLoading()
							this.loading = true
							this.total = Number(res.total)
							this.loadingFlag = true
							this.news = res.data
							console.log(this.news)
							if (this.news == null) {
								this.news = []
							}
							if (this.total <= 10) {
								this.loadingType = 2
							}
						}
					}
				})
			}
		},
		onReachBottom() {
			if (this.loadingType == 2) {
				return
			}
			this.num = this.num + 1
			if ((this.num-1) * this.size <= this.total) {
				uni.request({
					url: config.api_base_url + "mycenter/index" + '?p=' + this.num + '&size=' + this.size,
					data: {
						p: this.num,
						memberid: uni.getStorageSync("memberid"),
						actname: "mycomment"
					},
					success: (res) => {
						if (res.statusCode == 200) {
							res = res.data
							this.news = this.news.concat(res.data)
							if (this.news.length === this.total) {
								this.loadingType = 2
							}
						}
					}
				})
		    } else {
		        this.loadingType = 2
		    }
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this._getList()
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';

	page {
		height: 100%;
	}
	.review {
		.item {
			padding: 0 24upx;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			width: 100%;
			.load-more {
				margin-top: 20upx;
				padding: 16upx 0 36upx;
				box-sizing: border-box;
			}
			.list {
				width: 100%;
				padding: 20upx 0;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				.reply {
					width: 100%;
					background: #f5f5f5;
					padding: 16upx;
					box-sizing: border-box;
				}
				.title {
					display: flex;
					align-items: center;
					.avatar {
						width: 110upx;
						height: 110upx;
						border-radius: 50%;
					}
					.text {
						font-size: $login-size;
						color: #000;
						margin-left: 8upx;
					}
				}
				.info {
					margin: 8upx 0;
					display: flex;
					flex-direction: column;
					font-size: $login-size;
					.pic-wrap {
						display: flex;
						width: 100%;
						flex-wrap: wrap;
						margin: 14upx 0;
						.pic {
							width: 30%;
							margin-bottom: 10upx;
							height: 152upx;
							margin-right: 10upx;
							image {
								width: 100%;
								height: 100%;
								background-size: cover;
								object-fit: cover;
							}
						}
					}
				}
				.bottom {
					display: flex;
					justify-content: space-between;
					align-content: center;
					.left {
						color: #a9a9a9;
						font-size: $login-small-size;
						display: flex;
						align-items: center;
					}
					.right {
						display: flex;
						align-items: center;
						.review, .like {
							display: flex;
							align-items: center;
							image {
								width: 36upx;
								height: 36upx;
							}
							text {
								margin-left: 12upx;
								color: #a9a9a9;
								font-size: $login-size;
							}
						}
						.like {
							margin-left: 24upx;
							text.active {
								color: #ff7777;
							}
						}
					}
				}
				.area {
					margin-top: 18upx;
					width: 100%;
					background: #efeff1;
					padding: 14upx;
					box-sizing: border-box;
					position: relative;
					.daosanjiao {
						width: 0;
						height: 0;
						border-left: 10upx solid transparent;
						border-right: 10upx solid transparent;
						border-bottom: 10upx solid #efeff1;
						position: absolute;
						top: -10upx;
					}
					.like-wrap {
						padding-bottom: 6upx;
						box-sizing: border-box;
						border-bottom: 1upx solid #ddd;
						image {
							width: 32upx;
							height: 32upx;
							margin-right: 16upx;
							display: inline-block;
							vertical-align: middle;
						}
						text {
							font-size: $login-small-size;
							line-height: 1.4;
						}
					}
					.review-wrap {
						.list {
							padding: 0;
							color: #000;
							.left {
								color: #5e647a;
								font-size: $login-small-size;
							}
							.right {
								font-size: $login-small-size;
							}
						}
					}
				}
			}
		}
		.no-result-wrap {
			width: 160upx;
			height: 200upx;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -80upx;
			margin-top: -100upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.notice-none {
				width: 160upx;
				height: 128upx;
			}
			.no-result-text {
				font-size: 28upx;
				margin-top: 10upx
			}
		}
	}
</style>
