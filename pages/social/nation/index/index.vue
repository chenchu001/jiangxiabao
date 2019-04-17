<template>
	<view class="index" v-if="loading">
		<!-- search -->
		<view class="search" @tap="openSearch">
			<image src="../../../../static/social-icon5.png"></image>
			<text>搜索</text>
		</view>
		<!-- news -->
		<view class="news">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in listData" :key="index" @tap="openDetail" :data-id="item.id">
					<view class="uni-media-list">
						<!-- <image class="uni-media-list-logo" lazy-load :src="item.pic"></image> -->
						<lazy-image class="uni-media-list-logo" v-if="item.pic" :realSrc="item.pic" :placeholdSrc="placeholderSrc"></lazy-image>
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
	import uSwiper from '../../../../components/swiper/swiper.vue'
	import uniLoadMore from '../../../../components/uni-load-more.vue'
	import lazyImage from "../../../../components/lazy-image.vue"
	import {Toast, sucToast, checkphone, config} from '../../../../common/dialog.js'
	
	export default {
		components: {
			uSwiper,uniLoadMore,lazyImage
		},
		data() {
			return {
				placeholderSrc: "../../../../static/defaultImg.jpg",
				loading: false,
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
			};
		},
		methods: {
			openDetail (event) {
				let id = event.currentTarget.dataset.id
				uni.navigateTo({
					url: '../detail/detail?id=' + id,
					success: res => {}
				});
			},
			openSearch () {
				uni.navigateTo({
					url: '../search/search'
				});
			},
			_getList () {
				uni.request({
					url: config.api_base_url + "articlelist" + '?p=' + this.num + '&size=' + this.size,
					data: {
						cateid: 2
					},
					success: (res) => {
						uni.hideLoading()
						this.loading = true
						if (res.statusCode == 200) {
							res = res.data
							this.total = Number(res.total)
							this.listData = res.data
							this.loadingFlag = true
							if (this.total < 10) {
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
						cateid: 2
					},
					success: (res) => {
						if (res.statusCode == 200) {
							res = res.data
							console.log(res)
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
		},
	}
</script>

<style lang="scss">
	@import './../../../../uni.scss';
	
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
	.uni-media-list-logo, .lazy-image {
		width: 240upx !important;
		height: 160upx !important;
		flex: 0 0 240upx !important;
		margin-right: 20upx;
	}
	.uni-media-list-body {
		height: auto;
	}
	.index {
		width: 100%;
		height: 100%;
		padding-top: 20upx;
		box-sizing: border-box;
		.search {
			border: 1px solid #eaeaec;
			margin: 0 24upx 20upx;
			height: 66upx;
			background: #fff;
			border-radius: 12upx;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 22upx;
				height: 26upx;
			}
			text {
				font-size: $login-size;
				margin-left: 10upx;
				color: #868686;
			}
		}
		.news {
			width: 100%;
		}
	}
</style>
