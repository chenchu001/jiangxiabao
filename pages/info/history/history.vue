<template>
	<view class="history">
		<view class="uni-list" v-if="news.length && loading">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in news" :key="index"
				@tap="openInfo" :data-cateid="item.cateid" :data-id="item.artid" :data-catetype="item.catetype">
				<view class="uni-media-list">
					<image v-if="item.pic" class="uni-media-list-logo" :src="item.pic"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.title}}</view>
					</view>
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
				loadingType: 1,
				loadingFlag: false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading: false,
				news: [],
				num: 1,
				total: 0,
				size: 10
			};
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this._getList()
		},
		methods: {
			openInfo (event) {
				let cateid = event.currentTarget.dataset.cateid
				let id = event.currentTarget.dataset.id
				let catetype = event.currentTarget.dataset.catetype
				if (cateid == 4) {
					uni.navigateTo({
						url: "../../tabBar/index/detail/detail?id=" + id
					})
				}
				if (cateid == 1) {
					uni.navigateTo({
						url: "../../social/province/detail/detail?id=" + id
					})
				}
				if (cateid == 3 && catetype == 3) {
					uni.navigateTo({
						url: "../../beauty/video/video?id=" + id
					})
				}
				if (cateid == 3 && catetype == 2) {
					uni.navigateTo({
						url: "../../beauty/pic/pic?id=" + id
					})
				}
				if (cateid == 2) {
					uni.navigateTo({
						url: "../../social/nation/detail/detail?id=" + id
					})
				}
			},
			_getList () {
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: 'GET',
					data: {
						p: this.num,
						memberid: uni.getStorageSync("memberid"),
						actname: "viewhistory"
					},
					success: res => {
						res = res.data
						if (res.rescode === "0000") {
							uni.hideLoading()
							this.loading = true
							this.total = Number(res.total)
							this.loadingFlag = true
							this.news = res.data
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
						memberid: uni.getStorageSync("memberid"),
						actname: "viewhistory"
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
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';
	
	page {
		height: 100%;
	}
	.history {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		position: relative;
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
	.uni-media-list {
		align-items: center
	}
	.uni-media-list-body {
		height: auto
	}
	.uni-media-list-text-top {
		line-height: 1.6em
	}
	.uni-list-cell::after {
		left: 0;
	}
</style>
