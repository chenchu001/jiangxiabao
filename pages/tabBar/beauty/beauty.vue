<template>
	<view class="beauty" v-if="loading">
		<!-- content -->
		<view class="wrap">
			<view class="item">
				<view class="list" v-for="(item, index) in list" :key="index" @tap="openDetail" :data-classifyid="item.catetype" :data-id="item.id">
					<image :src="item.pic"></image>
					<image src="../../../static/play-icon.png" class="play-icon" v-if="item.catetype == 3" ></image>
					<view class="info">
						<text class="left uni-ellipsis">{{item.title}}</text>
						<text class="right">{{item.createtime ? item.createtime.split(" ")[0] : ""}}</text>
					</view>
				</view>
				<uni-load-more v-if="loadingFlag" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			</view>
		</view>
		<!-- 选择分类 -->
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="checkClassify" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	import uniLoadMore from '../../../components/uni-load-more.vue'
	
	export default {
		components: {
			mpvuePicker,uniLoadMore
		},
		data() {
			return {
				loading: false,
				loadingType: 1,
				loadingFlag: true,
				num: 1,
				total: 0,
				size: 10,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				classifyVal: "",
				themeColor: '#007AFF',
				pickerValueArray: [],
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				list: [],
				pickerSingleArray: [
					{
						label: '全部',
						value: 3
					},
					{
						label: '摄影',
						value: 1
					},
					{
						label: '视频',
						value: 2
					}
				]
			};
		},
		methods: {
			// 选择分类
			checkClassify (event) {
				uni.showTabBar()
				this.setStyle(0,event.label)
				uni.showLoading({
					title: "加载中"
				})
				this.num = 1
				this.total = 0
				this.loadingType = 1
				this.classifyVal = event.label
				if (event.label === "摄影") {
					this._getClassifyList(2)
				} else if (event.label === "视频") {
					this._getClassifyList(3)
				} else {
					this._getAllList()
				}
			},
			onCancel () {
				uni.showTabBar()
			},
			openDetail (event) {
				let classifyid = event.currentTarget.dataset.classifyid
				let id = event.currentTarget.dataset.id
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
			/**
			 * 修改导航栏buttons
			 * index[number] 修改的buttons 下标索引，最右边索引为0
			 * text[string] 需要修改的text 内容
			 */
			setStyle(index,text) {
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleNView = currentWebview.getStyle().titleNView;
				// 添加文字过长截取为3个字符，请根据自己业务需求更改
				if(text.length > 3){
					text = text.substr(0,3)+"..."
				}
				titleNView.buttons[0].text = text;
				currentWebview.setStyle({
					titleNView:titleNView
				});
				// #endif
			},
			// 获取全部分类
			_getAllList () {
				this.list = []
				uni.request({
					url: config.api_base_url + "articlelist",
					method: "GET",
					data: {
						cateid: 3
					},
					success: (res) => {
						uni.hideLoading()
						res = res.data
						this.loading = true
						this.total = Number(res.total)
						this.loadingFlag = true
						this.list = res.data
						if (this.total <= 10) {
							this.loadingType = 2
						}
					}
				})
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
						this.list = res.data
						uni.hideLoading()
						this.total = Number(res.total)
						this.loadingFlag = true
						if (this.total <= 10) {
							this.loadingType = 2
						}
					}
				})
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.hideTabBar()
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			}
			if (e.index === 1) {
				uni.navigateTo({
					url: '../../info/index/index'
				});
			}
		},
		onReachBottom() {
			if (this.loadingType == 2) {
				return
			}
			if (this.classifyVal === "摄影") {
				this.num = this.num + 1
				if ((this.num-1) * this.size <= this.total) {
					uni.request({
						url: config.api_base_url + "articlelist" + '?p=' + this.num + '&size=' + this.size,
						data: {
							cateid: 3,
							catetype: 2
						},
						success: (res) => {
							if (res.statusCode == 200) {
								res = res.data
								this.list = this.list.concat(res.data)
								if (this.list.length === this.total) {
									this.loadingType = 2
								}
							}
						}
					})
				} else {
				    this.loadingType = 2
				}
			} else if (this.classifyVal === "视频") {
				this.num = this.num + 1
				if ((this.num-1) * this.size <= this.total) {
					uni.request({
						url: config.api_base_url + "articlelist" + '?p=' + this.num + '&size=' + this.size,
						data: {
							cateid: 3,
							catetype: 3
						},
						success: (res) => {
							if (res.statusCode == 200) {
								res = res.data
								this.list = this.list.concat(res.data)
								if (this.list.length === this.total) {
									this.loadingType = 2
								}
							}
						}
					})
				} else {
				    this.loadingType = 2
				}
			} else {
				this.num = this.num + 1
				if ((this.num-1) * this.size <= this.total) {
					uni.request({
						url: config.api_base_url + "articlelist" + '?p=' + this.num + '&size=' + this.size,
						data: {
							cateid: 3
						},
						success: (res) => {
							if (res.statusCode == 200) {
								res = res.data
								this.list = this.list.concat(res.data)
								if (this.list.length === this.total) {
									this.loadingType = 2
								}
							}
						}
					})
				} else {
				    this.loadingType = 2
				}
			}
			
		},
		onLoad () {
			uni.showLoading({
				title: "加载中"
			})
			this.classifyVal = "全部"
			this._getAllList()
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
	.beauty {
		box-sizing: bordder-box;
		.wrap {
			padding: 0 24upx;
			overflow: hidden;
			.item {
				width: 100%;
				display: flex;
				flex-direction: column;
				.list {
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
