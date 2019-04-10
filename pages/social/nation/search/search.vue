<template>
	<view class="search">
		<!-- search -->
		<view class="search-input">
			<uni-icon size="14" type="search" class="search-icon"></uni-icon>
			<input focus class="search-val" type="text" confirm-type="search" @confirm="onSubmit" value="" />
			<uni-icon type="clear" size="14" class="search-clear" />
		</view>
		<!-- content -->
		<view class="content">
			<view class="search-item" v-if="searchList.length">
				<view class="search-list uni-ellipsis" v-for="(item, index) in searchList" :key="index" @tap="openDetail" :data-id="item.id">
					{{item.title}}
				</view>
			</view>
			<view class="search-none" v-if="!searchList.length && loading">
				<image src="../../../../static/info-icon10.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../../../../components/uni-icon.vue'
	import {Toast, sucToast, checkphone, config} from '../../../../common/dialog.js'
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				searchList: [],
				loading: false
			};
		},
		methods: {
			openDetail (event) {
				let id = event.currentTarget.dataset.id
				uni.navigateTo({
					url: '../detail/detail?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			onSubmit (event) {
				uni.showLoading({
					title: "正在搜索"
				})
				let keywords = event.detail.value
				uni.request({
					url: config.api_base_url + "articlelist",
					data: {
						keywords: keywords,
						cateid: 2
					},
					success: (res) => {
						wx.hideLoading()
						console.log(res)
						res = res.data
						if (res.rescode === "0000") {
							this.searchList = res.data
						} else {
							this.searchList = []
							this.loading = true
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data))
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './../../../../uni.scss';

	page {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.search {
		width: 100%;
		height: 100%;
		padding-top: 20upx;
		box-sizing: border-box;
		.search-input {
			border: 1px solid #eaeaec;
			margin: 0 24upx 0upx;
			height: 66upx;
			background: #fff;
			border-radius: 12upx;
			display: flex;
			align-items: center;
			.search-icon,.search-clear {
				width: 30upx;
				flex: 0 0 30upx;
				margin-left: 10upx;
				margin-right: 10upx;
			}
			.search-val {
				height: 66upx;
				flex: 1;
				font-size: $login-size;
			}
		}
		.content {
			width: 100%;
			padding: 0 24upx;
			box-sizing: border-box;
			.search-none {
				width: 125upx;
				height: 173upx;
				margin: 60% auto 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.search-item {
				.search-list {
					height: 76upx;
					line-height: 76upx;
					border-bottom: 1px solid #eee;
					color: #000;
					font-size: $login-size;
					box-sizing: border-box;
				}
			}
		}
	}
	.uni-icon-search, .uni-icon-clear {
		margin: 0 10upx;
	}
</style>
