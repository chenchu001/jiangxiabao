<template>
	<view class="reply" @tap="hideEmoji">
		<view class="wrap">
			<!-- 文本 -->
			<view class="uni-textarea">
				<textarea @focus="focusInput" @blur="blurInput" focus maxlength="-1" placeholder="这一刻的想法..." v-model="input_content" />
				</view>
			<!-- 提示 -->
			<view class="release-hint">
				<view class="left">
					<image src="../../../static/love-icon3.png" @tap.stop="showEmoji"></image>
				</view>
			</view>
		</view>
		<!-- 表情 -->
		<view class="emoji" v-if="faceShow && faceList.length">
			<view class="item">
				<!-- <swiper :indicator-dots="true">
					<swiper-item v-for="(page, index) in pages" :key="index">
						<view class="list" v-for="(item, i) in page" :key="i" @tap="getBrow(index)">
							{{item}}
						</view>
					</swiper-item>
				</swiper> -->
				<view class="list" v-for="(item, index) in faceList" :key="index" @tap.stop="getBrow(index)">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'
	const appData = require('../../../static/emojis.json')
	export default {
		data() {
			return {
				id: "",
				address: "",
				input_content: "",
				faceList: [],
				faceShow: false,
				getBrowString: ""
			};
		},
		computed: {
			pages () {
				const pages = []
				if (this.faceList.length) {
					this.faceList.forEach((item, index) => {
						const page = Math.floor(index/21)
						if (!pages[page]) {
							pages[page] = []
						}
						pages[page].push(item)
					})
					console.log(pages[1])
				}
				return pages
			}
		},
		methods: {
			blurInput (event) {
			},
			focusInput () {
				this.faceShow = false
				this.faceList = []
			},
			hideEmoji () {
				this.faceShow = false
				this.faceList = []
			},
			showEmoji () {
				this.faceShow = !this.faceShow
				if (this.faceShow == true) {
					for (let i in appData) {
						this.faceList.push(appData[i].char)
					}
				} else {
					this.faceList = []
				}
			},
			getBrow (index) {
				for (let i in this.faceList) {
					if (index == i) {
						this.getBrowString = this.faceList[index]
						this.input_content += this.getBrowString
					}
				}
			},
			_getList (api, url) {
				uni.request({
					url: config.api_base_url + api,
					method: 'POST',
					data: {
						memberid: uni.getStorageSync("memberid"),
						artid: this.id,
						replyinfo: this.input_content
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: res => {
						if (res.statusCode == 200) {
							res = res.data
							if (res.rescode === "0000") {
								sucToast("评论成功")
								setTimeout(() => {
									if (this.address === "friend") {
										this.$store.commit('changeInfo', this.input_content)
										uni.switchTab({
											url: url + this.id
										})
									} else {
										uni.redirectTo({
											url: url + this.id
										})
									}
								}, 1500)
							}
						}
					}
				})
			}
		},
		// 导航栏跳转
		onNavigationBarButtonTap(event) {
			let index = event.index
			// 发表
			if (index === 0) {
				// 首页详情请求
				if (this.address === "indexDetail") {
					this._getList("articlecomment", '../../tabBar/index/detail/detail?id=')
				}
				//	图集请求
				if (this.address === "pic") {
					this._getList("articlecomment", '../../beauty/pic/pic?id=')
				}
				// 视频请求
				if (this.address === "video") {
					this._getList("articlecomment", '../../beauty/video/video?id=')
				}
				// 朋友圈请求
				if (this.address === "friend") {
					this._getList("bbsarticlecomment", '../../tabBar/love/love?id=')
				}
			}
		},
		onLoad (options) {
			this.id = options.id
			this.address = options.type
			this.$store.commit('changeReply', this.id)
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}
	.uni-uploader__input-box {
		margin: 0px;
	}
	uni-swiper {
		width: 100%;
	}
	.close-view{
	    text-align: center;
		line-height:22upx;
		height: 24upx;
		width: 24upx;
		border-radius: 50%;
		background: #ef5350;
		color: #FFFFFF;
		position: absolute;
		top: 6upx;
		right: 8upx;
		font-size: 24upx;
	}
	.reply {
		height: 100%;
		position: relative;
		overflow: hidden;
		.emoji {
			width: 100%;
			height: 310upx;
			position: absolute;
			left: 0;
			bottom: 0;
			background: #e6e6e6;
			overflow: scroll;
			.item {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				height: 100%;
				.list {
					width: 14.25%;
					font-size: 40upx;
					list-style: none;
					text-align: center;
					display: inline-block;
					line-height: 2.1;
				}
			}
		}
		.wrap {
			width: 100%;
			padding: 0 24upx;
			box-sizing: border-box;
			overflow: hidden;
			.uni-textarea {
				width: auto;
				line-height: 1.6;
				height: 300upx;
				margin-top: 10upx;
				border-bottom: 1px solid #eee;
				box-sizing: border-box;
				textarea {
					width: 100%;
					height: 100%;
					padding: 0;
					overflow: hidden;
				}
			}
			.release-hint {
				margin: 18upx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left {
					height: 48upx;
					display: flex;
					image {
						width: 48upx;
						height: 48upx;
						&:nth-child(2) {
							margin-left: 20upx;
						}
					}
				}
				.right {
					text {
						color: #2c2c2c;
					}
				}
			}
			.release-body {
				width: 100%;
				height: 100%;
				.uni-uploader__files {
					
				}
			}
		}
	}
</style>
