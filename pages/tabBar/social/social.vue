<template>
	<view class="social" v-if="loading">
		<!-- swiper -->
		<view class="swiper">
			<u-swiper :imgUrls="imgUrls" @openSwiperDetail="openSwiperDetail"></u-swiper>
		</view>
		<!-- province -->
		<view class="province">
			<view class="title">
				<image src="../../../static/social-icon1.png" class="title-left"></image>
				<image src="../../../static/social-icon2.png" class="title-right" @tap="openProvince"></image>
			</view>
			<view class="content">
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
				</view>
			</view>
		</view>
		<!-- nation -->
		<view class="nation">
			<view class="title">
				<image src="../../../static/social-icon3.png" class="title-left"></image>
				<image src="../../../static/social-icon4.png" class="title-right" @tap="openNation"></image>
			</view>
			<view class="content">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in nationData" :key="index" @tap="openNationDetail" :data-id="item.id">
						<view class="uni-media-list">
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top uni-ellipsis">{{index+1}}. {{item.title}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uSwiper from '../../../components/swiper/swiper.vue'
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	const url = "http://qyg.weasing.com/api/index.php?g=Api&m=Guanwang&a=dongtai"
	
	export default {
		components: {
			uSwiper,uniLoadMore
		},
		data() {
			return {
				loading: false,
				listData: [],
				nationData: [],
				num: 1,
				total: 0,
				size: 10,
				imgUrls: []
			};
		},
		methods: {
			openSwiperDetail (value) {
				uni.navigateTo({
					url: '../../social/province/detail/detail?id=' + value,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			openNationDetail (event) {
				let id = event.currentTarget.dataset.id
				uni.navigateTo({
					url: '../../social/nation/detail/detail?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			openDetail (event) {
				let id = event.currentTarget.dataset.id
				uni.navigateTo({
					url: '../../social/province/detail/detail?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			openProvince () {
				uni.navigateTo({
					url: '../../social/province/index/index'
				});
			},
			openNation () {
				uni.navigateTo({
					url: '../../social/nation/index/index'
				});
			},
			// 获取banner
			_getBanner () {
				uni.request({
					url: config.api_base_url + "articlelist/banner",
					method: "GET",
					data: {
						cateid: 1
					},
					success: (res) => {
						let ret = res.data
						this.imgUrls = ret.data
					}
				})
			},
			// 获取省内热点
			_getList () {
				uni.request({
					url: config.api_base_url + "articlelist" + '?page=' + this.num + '&size=' + this.size,
					data: {
						cateid: 1
					},
					success: (res) => {
						if (res.statusCode == 200) {
							res = res.data
							this.listData = res.data
							uni.hideLoading()
							this.loading = true
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data))
					}
				})
			},
			// 获取全国热点
			_getNationList () {
				uni.request({
					url: config.api_base_url + "articlelist" + '?page=' + this.num + '&size=' + this.size,
					data: {
						cateid: 2
					},
					success: (res) => {
						if (res.statusCode == 200) {
							res = res.data
							this.nationData = res.data
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data))
					}
				})
			}
		},
		onLoad () {
			uni.showLoading({
				title: "加载中"
			})
			this._getBanner()
			this._getList()
			this._getNationList()
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
		right: 0upx;
		left: 0upx;
	}
	.uni-media-list {
		padding: 22upx 0;
	}
	.uni-media-list-logo {
		width: 240upx;
		height: 160upx;
	}
	.uni-media-list-body {
		height: auto;
	}
	.social {
		width: 100%;
		height: 100%;
		padding-top: 20upx;
		.swiper {
			width: 100%;
			height: 340upx;
		}
		.province, .nation {
			margin: 20upx 24upx;
			padding: 0 24upx;
			background: #fff;
			overflow: hidden;
			border: 1px solid #e9e8ee;
			border-radius: 12upx;
			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 88upx;
				border-bottom: 1px solid #eee;
				.title-left {
					width: 127upx;
					height: 31upx;
				}
				.title-right {
					width: 58upx;
					height: 29upx;
				}
			}
		}
		.nation {
			padding-bottom: 0upx;
		}
	}
</style>
