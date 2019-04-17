<template>
	<view class="uni-tab-bar" v-if="loading">
		<!-- title部分 -->
		<scroll-view id="tab-bar" class="uni-swiper-tab">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
		</scroll-view>
		<!-- 内容部分 -->
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<!-- 摄影 -->
			<swiper-item>
				<scroll-view class="list" scroll-y @scrolltolower="loadPicMore" @scroll="loadPicTop">
					<view class="list-wrap" v-for="(item,index1) in picList" :key="index1" :data-id="item.id" :data-classifyid="item.catetype" @tap="openDetail">
						<!-- <image :src="item.pic"></image> -->
						<lazy-image :realSrc="item.pic" :placeholdSrc="placeholderSrc"></lazy-image>
						<image src="../../../static/play-icon.png" class="play-icon" v-if="item.catetype == 3" ></image>
						<view class="info">
							<text class="left uni-ellipsis">{{item.title}}</text>
						</view>
					</view>
					<uni-load-more v-if="loadingPicFlag" :loadingType="loadingPicType" :contentText="contentText"></uni-load-more>
				</scroll-view>
			</swiper-item>
			<!-- 视频 -->
			<swiper-item>
				<scroll-view class="list" scroll-y @scrolltolower="loadVideoMore" @scroll="loadVideoTop">
					<view class="list-wrap" v-for="(item,index2) in videoList" :key="index2" :data-id="item.id" :data-classifyid="item.catetype" @tap="openDetail">
						<!-- <image :src="item.pic"></image> -->
						<lazy-image :realSrc="item.pic" :placeholdSrc="placeholderSrc"></lazy-image>
						<image src="../../../static/play-icon.png" class="play-icon" v-if="item.catetype == 3" ></image>
						<view class="info">
							<text class="left uni-ellipsis">{{item.title}}</text>
						</view>
					</view>
					<uni-load-more v-if="loadingVideoFlag" :loadingType="loadingVideoType" :contentText="contentText"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import lazyImage from "../../../components/lazy-image.vue"
	
	export default {
		components: {
			lazyImage,
			uniLoadMore
		},
		data() {
			return {
				placeholderSrc: "../../../static/defaultImg.jpg",
				tabBars: [{
					name: '摄影',
					id: 'sheying'
				}, {
					name: '视频',
					id: 'shipin'
				}],
				winHeight: "",
				tabIndex: 0,
				scrollLeft: 0,
				picList: [],
				videoList: [],
				loading: false,
				loadingPicType: 1,
				loadingPicFlag: false,
				picNum: 1,
				picTotal: 0,
				loadingVideoType: 1,
				loadingVideoFlag: false,
				videoNum: 1,
				videoTotal: 0,
				size: 10,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				isSupport: true
			}
		},
		methods: {
			tapTab (index) {
				if (this.tabIndex === index) {
					return false
				} else {
					this.tabIndex = index
					if (this.tabIndex == 0) {
						if (this.picList.length) {
							return
						}
						this._getClassifyList(2)
					} else {
						if (this.videoList.length) {
							return
						}
						uni.showLoading({
							title: "加载中"
						})
						this._getClassifyList(3)
					}
				}
			},
			changeTab (event) {
				let index = event.detail.current
				this.tabIndex = index
				if (this.tabIndex == 0) {
					if (this.picList.length) {
						return
					}
					this._getClassifyList(2)
				} else {
					if (this.videoList.length) {
						return
					}
					uni.showLoading({
						title: "加载中"
					})
					this._getClassifyList(3)
				}
			},
			// 摄影上拉加载
			loadPicMore () {
				if (this.loadingPicType == 2) {
					return
				}
				this.picNum = this.picNum + 1
				if ((this.picNum-1) * this.size <= this.picTotal) {
					uni.request({
						url: config.api_base_url + "articlelist",
						data: {
							p: this.picNum,
							size: this.size,
							cateid: 3,
							catetype: 2
						},
						success: (res) => {
							if (res.statusCode == 200) {
								res = res.data
								this.picList = this.picList.concat(res.data)
								if (this.picList.length === this.picTotal) {
									this.loadingPicType = 2
								}
							}
						}
					})
				} else {
				    this.loadingPicType = 2
				}
			},
			// 视频下拉加载
			loadVideoMore () {
				if (this.loadingVideoType == 2) {
					return
				}
				this.videoNum = this.videoNum + 1
				if ((this.videoNum-1) * this.size <= this.videoTotal) {
					uni.request({
						url: config.api_base_url + "articlelist",
						data: {
							p: this.videoNum,
							size: this.size,
							cateid: 3,
							catetype: 3
						},
						success: (res) => {
							if (res.statusCode == 200) {
								res = res.data
								this.videoList = this.videoList.concat(res.data)
								if (this.videoList.length === this.videoTotal) {
									this.loadingVideoType = 2
								}
							}
						}
					})
				} else {
				    this.loadingPicType = 2
				}
			},
			// 进入详情
			openDetail (event) {
				let classifyid = event.currentTarget.dataset.classifyid
				let id = event.currentTarget.dataset.id
				console.log(classifyid, id)
				// 1为图片
				if (classifyid == 2) {
					uni.navigateTo({
						url: '../../beauty/pic/pic?id=' + id
					})
				} else {
					uni.navigateTo({
						url: '../../beauty/video/video?id=' + id
					})
				}
			},
			// #ifdef APP-PLUS
			switchPullRefresh() {
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.setStyle({
					pullToRefresh: {
						support: !this.isSupport,
						style: plus.os.name === 'Android' ? 'circle' : 'default'
					}
				});
			},
			// #endif
			loadPicTop (event) {
				if (event.detail.scrollTop < 5) {
					this.isSupport = false
					this.switchPullRefresh()
				} else {
					this.isSupport = true
					this.switchPullRefresh()
				}
			},
			loadVideoTop (event) {
				if (event.detail.scrollTop < 5) {
					this.isSupport = false
					this.switchPullRefresh()
				} else {
					this.isSupport = true
					this.switchPullRefresh()
				}
			},
			// 获取单项分类
			_getClassifyList (value) {
				this.list = []
				uni.request({
					url: config.api_base_url + "articlelist",
					method: "GET",
					data: {
						cateid: 3,
						catetype: value
					},
					success: (res) => {
						res = res.data
						this.loading = true
						if (value == 2) {
							uni.hideLoading()
							uni.stopPullDownRefresh()
							this.loadingPicFlag = true
							this.picTotal = Number(res.total)
							this.picList = res.data
							if (this.picTotal <= 10) {
								this.loadingPicType = 2
							}
						} else {
							uni.hideLoading()
							uni.stopPullDownRefresh()
							this.loadingVideoFlag = true
							this.videoTotal = Number(res.total)
							this.videoList = res.data
							if (this.videoTotal <= 10) {
								this.loadingVideoType = 2
							}
						}
					}
				})
			}
		},
		onLoad () {
			uni.showLoading({
				title: "加载中"
			})
			this._getClassifyList(2)
		},
		// 下拉刷新
		onPullDownRefresh() {
			if (this.tabIndex == 0) {
				this.picList = []
				this.picNum = 1
				this.picTotal = 0
				this.loadingPicType = 1
				this._getClassifyList(2)
			} else {
				this.videoList = []
				this.videoNum = 1
				this.videoTotal = 0
				this.loadingVideoType = 1
				this._getClassifyList(3)
			}
		},
		// 导航栏跳转
		onNavigationBarButtonTap(event) {
			let index = event.index
			if (index === 0) {
				
			}
			if (index === 1) {
				uni.navigateTo({
					url: '../../info/index/index'
				});
			}
		},
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';
	
	page {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		.list {
			width: 100% !important;
		}
		.swiper-tab-list {
			width: 50% !important
		}
		.active {
			color: rgb(62, 95, 251)
		}
	}
	.uni-tab-bar {
		width: 100%;
		.swiper-box {
			padding: 0 24upx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			height: 100%;
			swiper-item {
				width: 100%;
				height: 100%;
				overflow: hidden;
				.list-wrap {
					width: 100%;
					margin-top: 20upx;
					width: 100%;
					height: 395upx;
					overflow: hidden;
					position: relative;
					image {
						width: 100%;
						height: 395upx;
						border-top-left-radius: 12upx;
						border-top-right-radius: 12upx;
						display: block;
						
					}
					.play-icon {
						position: absolute;
						width: 80upx;
						height: 80upx;
						left: 50%;
						top: 50%;
						margin-left: -40upx;
						margin-top: -60upx;
					}
					video {
						width: 100%;
						height: 335upx;
						border-top-left-radius: 12upx;
						border-top-right-radius: 12upx;
						display: block;
					}
					.info {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						padding: 0 12upx;
						box-sizing: border-box;
						height: 60upx;
						background: rgba(0, 0, 0, .7);
						display: flex;
						align-items: center;
						color: #fff;
						border-bottom-left-radius: 12upx;
						border-bottom-right-radius: 12upx;
						.left {
							flex: 1
						}
						.right {
							width: 190upx;
							flex: 0 0 190upx;
							text-align: right;
						}
					}
				}
			}
		}
	}
</style>
