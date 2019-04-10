<template>
	<view class="index" v-if="loading">
		<!-- swiper -->
		<view class="swiper">
			<u-swiper :imgUrls="imgUrls" @openSwiperDetail="openSwiperDetail"></u-swiper>
		</view>
		<!-- notice -->
		<view class="notice">
			<view class="left">
				<image class="icon" src="../../../static/info-icon8.png" mode=""></image>
				<text class="text">最新公告</text>
			</view>
			<view class="right">
				<swiper vertical="true" autoplay="true" circular="true" interval="5000">
					<swiper-item v-for="(item, index) in msg" :key="index" @tap="openDetail()" :data-id="item.id">
						<navigator class="uni-ellipsis">{{item.title}}</navigator>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- news -->
		<view class="news">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in listData" :key="index" @tap="openDetail" :data-id="item.id">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" lazy-load :src="item.pic"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{item.title}}</view>
							<view class="time">{{item.createtime}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{item.summary}}</view>
						</view>
					</view>
				</view>
				<uni-load-more v-if="loadingFlag" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import uSwiper from '../../../components/swiper/swiper.vue'
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'

	export default {
		components: {
			uSwiper,uniLoadMore
		},
		data() {
			return {
				headerText: "每日江夏",
				loadingType: 1,
				loadingFlag: false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				listData: [],
				num: 1,
				total: 0,
				size: 10,
				msg:[],
				imgUrls: [],
				loading: false
			};
		},
		methods: {
			openSwiperDetail (value) {
				uni.navigateTo({
					url: './detail/detail?id=' + value,
					success: res => {}
				});
			},
			openDetail (event) {
				let id = event.currentTarget.dataset.id
				uni.navigateTo({
					url: './detail/detail?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 获取banner
			_getBanner () {
				uni.request({
					url: config.api_base_url + "articlelist/banner",
					method: "GET",
					data: {
						cateid: 4
					},
					success: (res) => {
						let ret = res.data
						this.imgUrls = ret.data
					}
				})
			},
			// 获取最新公告
			_getNotice () {
				uni.request({
					url: config.api_base_url + "noticelist",
					method: "GET",
					success: (res) => {
						if (res.statusCode == 200) {
							res = res.data
							let ret = []
							for (let i=0;i<res.data.length;i++) {
								ret.push({
									title: res.data[i].title,
									id: res.data[i].id
								})
							}
							this.msg = ret
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data))
					}
				})
			},
			// 获取新闻列表
			_getList () {
				uni.request({
					url: config.api_base_url + "articlelist" + '?p=' + this.num + '&size=' + this.size,
					method: "GET",
					data: {
						cateid: 4
					},
					success: (res) => {
						uni.hideLoading()
						this.loading = true
						if (res.statusCode == 200) {
							res = res.data
							this.total = Number(res.total)
							this.listData = res.data
							this.loadingFlag = true
							if (this.total <= 10) {
								this.loadingType = 2
							}
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data))
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
					url: config.api_base_url + "articlelist" + '?p=' + this.num + '&size=' + this.size,
					data: {
						cateid: 4
					},
					success: (res) => {
						if (res.statusCode == 200) {
							res = res.data
							this.listData = this.listData.concat(res.data)
							if (this.listData.length === this.total) {
								this.loadingType = 2
							}
						}
					}
				})
		    } else {
		        this.loadingType = 2
		    }
		},
		onLoad () {
			uni.showLoading({
				title: "加载中"
			})
			this._getList()
			this._getNotice()
			this._getBanner()
		},
		// 导航栏跳转
		onNavigationBarButtonTap(event) {
			let index = event.index
			if (index === 1) {
				uni.navigateTo({
					url: '../../info/index/index'
				});
			}
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';

	page {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}
	.uni-list::before, .uni-list:after {
		height: 0;
	}
	.uni-list-cell::after {
		right: 30upx;
	}
	.uni-media-list-logo {
		width: 240upx;
		height: 160upx;
	}
	.uni-media-list-body {
		height: auto;
	}
	.time {
		font-size: $login-small-size;
		color: #888;
	}
	.index {
		width: 100%;
		height: 100%;
		padding-top: 20upx;
		.swiper {
			width: 100%;
			height: 340upx;
		}
		.notice {
			width: 100%;
			margin: 20upx 0;
			height: 79upx;
			display: flex;
			align-items: center;
			padding: 0 24upx;
			box-sizing: border-box;
			background: #fff;
			.left {
				width: 180upx;
				flex: 0 0 180upx;
				display: flex;
				align-items: center;
				border-right: 1px solid #eee;
				.icon {
					width: 38upx;
					height: 31upx;
				}
				.text {
					font-size: $login-size;
					color: #000;
					margin-left: 14upx;
				}
			}
			.right {
				flex: 1;
				height: 100%;
				margin-left: 17upx;
				swiper {
					width: 100%;
					height: 100%;
					overflow: hidden;
					navigator {
						display: block;
						width: 100%;
						height: 100%;
						line-height: 79upx;
						font-size: $login-size;
					}
				}
			}
		}
		.news {
			width: 100%;
			padding-bottom: 0upx;
			box-sizing: border-box;
			.uni-list {
				
			}
		}
	}
</style>
