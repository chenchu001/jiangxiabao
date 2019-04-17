<template>
	<view class="love" v-if="loading">
		<view class="content">
			<!-- 列表 -->
			<view class="item">
				<view class="list" v-for="(item, index) in loveList" :key="index">
					<view class="title">
						<image class="avatar" :src="item.headimgurl ? item.headimgurl : 'http://mrjx.weasing.cn/defaultimg.png'" mode=""></image>
						<text class="name">{{item.nickname}}</text>
					</view>
					<view class="info">
						<view class="text">{{item.bbstitle}}</view>
						<!-- 图片展示 -->
						<view class="pic-wrap" v-if="item.artpics">
							<view class="pic" v-for="(list, key) in item.artpics" :key="key">
								<!-- <image lazy-load=!loading @load="onLoadImg" :src="list" mode="aspectFill" @tap="previewImage(item.artpics, key)"></image> -->
								<lazy-image mode="aspectFill" :realSrc="list" :placeholdSrc="placeholderSrc" @handleImageClick="previewImage(item.artpics, key)"></lazy-image>
							</view>
						</view>
					</view>
					<view class="bottom">
						<view class="left">{{item.createtime}}</view>
						<view class="right">
							<view class="review" @tap="openRelease" :data-id="item.id">
								<image src="../../../static/love-icon1.png"></image>
							</view>
							<view class="like" @tap.stop="handleClickLike" :data-id="item.id">
								<image v-if="!item.hasfav" src="../../../static/love-icon2.png" mode=""></image>
								<image v-if="item.hasfav" src="../../../static/love-icon2-active.png" mode=""></image>
								<text v-bind:class="[item.isLike ? 'active' : '']">{{item.prizenum}}</text>
							</view>
						</view>
					</view>
					<view class="area" v-if="item.prise.length || item.comments.length">
						<view class="daosanjiao"></view>
						<!-- 点赞 -->
						<view class="like-wrap" v-if="item.prise.length">
							<image src="../../../static/love-icon5.png" mode=""></image>
							<text v-if="item.prise.length > 1" v-for="(list, key) in item.prise" :key="key">
								<text>{{list.nickname}}</text>
								<text v-if="!item.prise.length == key">,</text>
							</text>
							<text v-if="item.prise.length == 1" v-for="(list, key) in item.prise" :key="key">
								<text>{{list.nickname}}</text>
							</text>
							<!-- <text>{{item.prise[item.prise.length-1].nickname}}</text> -->
						</view>
						<!-- 回复 -->
						<view class="review-wrap" v-if="item.comments.length">
							<view class="list" v-for="(list, idx) in item.comments" :key="idx">
								<text class="left">{{list.nickname}}</text>：
								<text class="right">{{list.replyinfo}}</text>
							</view>
						</view>
					</view>
				</view>
				<uni-load-more v-if="loadingFlag" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import lazyImage from "../../../components/lazy-image.vue"
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	
	export default {
		components: {
			lazyImage,
			uniLoadMore
		},
		data() {
			return {
				placeholderSrc: "../../../static/defaultImg.jpg",
				loading: false,
				loveList: [],
				imgArr: [],
				num: 1,
				total: 0,
				size: 10,
				loadingType: 1,
				loadingFlag: false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			};
		},
		methods: {
			// 预览图片
			previewImage(imageList, image_index) {
				console.log(imageList, image_index)
				var current = imageList[image_index]
				uni.previewImage({
					current: current,
					urls: imageList
				});
			},
			//	跳转到发布
			openRelease (event) {
				let id = event.currentTarget.dataset.id
				uni.navigateTo({
					url: '../../love/reply/reply?id=' + id + '&type=friend'
				})
			},
			//	点赞
			handleClickLike (event) {
				let memberid = uni.getStorageSync("memberid")
				let id = event.currentTarget.dataset.id
				uni.request({
					url: config.api_base_url + "bbsarticleprize",
					method: 'POST',
					data: {
						artid: id,
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
								for (let i=0;i<this.loveList.length;i++) {
									if (this.loveList[i].id == id) {
										if (this.loveList[i].hasfav == 1) {
											this.loveList[i].hasfav = 0
											this.loveList[i].prizenum--
											for (let j=0;j<this.loveList[i].prise.length;j++) {
												if (uni.getStorageSync("nickname") === this.loveList[i].prise[j].nickname) {
													this.loveList[i].prise.splice(j, 1)
												}
											}
										} else {
											this.loveList[i].hasfav = 1
											this.loveList[i].prizenum++
											this.loveList[i].prise.unshift({
												nickname: uni.getStorageSync("nickname")
											})
										}
									} 
								}
							}
						}
					},
					fail: () => {},
					complete: () => {}
				})
			},
			// 请求数据
			_getLoveList () {
				let memberid = uni.getStorageSync("memberid")
				uni.request({
					url: config.api_base_url + "bbsarticle/index",
					method: "GET",
					data: {
						p: this.num,
						size: this.size,
						memberid: memberid
					},
					success: (res) => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						this.loading = true
						this.loadingFlag = true
						res = res.data
						this.total = Number(res.total)
						this.loveList = res.data
						if (this.total <= 10) {
							this.loadingType = 2
						}
					}
				})
			}
		},
		// 上拉加载
		onReachBottom() {
			if (this.loadingType == 2) {
				return
			}
			this.num = this.num + 1
			if ((this.num-1) * this.size <= this.total) {
				uni.request({
					url: config.api_base_url + "bbsarticle/index",
					data: {
						p: this.num,
						size: this.size,
						memberid: uni.getStorageSync("memberid")
					},
					success: (res) => {
						if (res.statusCode == 200) {
							res = res.data
							this.loveList = this.loveList.concat(res.data)
							if (this.loveList.length === this.total) {
								this.loadingType = 2
							}
						}
					}
				})
		    } else {
		        this.loadingType = 2
		    }
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.loveList = []
			this.total = 0
			this.num = 1
			this.loadingType = 1
			this._getLoveList()
		},
		// 导航栏跳转
		onNavigationBarButtonTap(event) {
			let index = event.index
			if (index === 0) {
				uni.navigateTo({
					url: '../../love/release/release'
				});
			}
			if (index === 1) {
				uni.navigateTo({
					url: '../../info/index/index'
				});
			}
		},
		onShow (options) {
			// 修改名字之后首次进入
			if (this.$store.state.isName) {
				this.loveList = []
				this.total = 0
				this.num = 1
				this.loadingFlag = false
				this.loadingType = 1
				uni.showLoading({
					title: "加载中"
				})
				this._getLoveList()
			}
			// 发表动态
			if (this.$store.state.isPublish) {
				this.loveList = []
				this.total = 0
				this.num = 1
				this.loadingFlag = false
				this.loadingType = 1
				uni.showLoading({
					title: "加载中"
				})
				this._getLoveList()
			}
			// 提交评论
			if (this.$store.state.replayId != "" && this.$store.state.replyInfo != "") {
				let id = this.$store.state.replyId
				let replyinfo = this.$store.state.replyInfo
				for (let i=0;i<this.loveList.length;i++) {
					if (this.loveList[i].id == id) {
						this.loveList[i].comments.push({
							nickname: uni.getStorageSync("nickname"),
							replyinfo: replyinfo
						})
					}
				}
			}
		},
		onHide () {
			this.$store.commit('clearReply')
			this.$store.commit('clearPublish', false)
			this.$store.commit('changeName', false)
		},
		onLoad (options) {
			uni.showLoading({
				title: "加载中"
			})
			this._getLoveList()
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';
	
	uni-page-head .uni-page-head * {
		color: #fff !important;
	}
	page {
		height: 100%;
	}
	.love {
		width: 100%;
		height: 100%;
		.home-pic {
			width: 100%;
			position: relative;
			height: 500upx;
			background: url('https://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/f85ebc484cdd6d9a01b6bc45c81ab65a.jpg_r_640x290x70_0b576618.jpg') no-repeat;
			background-size: cover;
		}
		.content {
			padding: 0 24upx;
			height: 100%;
			.item {
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
					.title {
						display: flex;
						align-items: center;
						.avatar {
							width: 110upx;
							height: 110upx;
							border-radius: 50%;
							margin-right: 10upx;
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
		}
	}
</style>
