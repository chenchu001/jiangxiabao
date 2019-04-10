<template>
	<view class="release" @tap="hideEmoji">
		<view class="wrap">
			<!-- 文本 -->
			<view class="uni-textarea">
				<textarea @focus="focusInput" @blur="blurInput" focus maxlength="-1" placeholder="这一刻的想法..." v-model="input_content" />
				</view>
			<!-- 提示 -->
			<view class="release-hint">
				<view class="left">
					<image src="../../../static/love-icon3.png" @tap.stop="showEmoji"></image>
					<image src="../../../static/love-icon4.png" @tap="chooseImage"></image>
				</view>
				<view class="right">
					<text>{{imageList.length}}/9</text>
				</view>
			</view>
			<!-- 照片 -->
			<view class="release-body">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file" style="position: relative;">
							<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
								<view class="close-view" @click="close(index)">x</view>
						</view>
					</block>
					<!-- <view class="uni-uploader__input-box" v-show="imageList.length < 9">
						<view class="uni-uploader__input" @tap="chooseImage"></view>
					</view> -->
				</view>
			</view>
		</view>
		<!-- -->
		<view class="emoji" v-if="faceShow">
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
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	const appData = require('../../../static/emojis.json')
	export default {
		data() {
			return {
				input_content: "",
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				faceList: [],
				faceShow: false,
				getBrowString: ""
			};
		},
// 		computed: {
// 			pages () {
// 				const pages = []
// 				this.faceList.forEach((item, index) => {
// 					const page = Math.floor(index/21)
// 					console.log(page)
// 					if (!pages[page]) {
// 						pages[page] = []
// 					}
// 					pages[page].push(item)
// 				})
// 				console.log(pages)
// 				return pages
// 			}
// 		},
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
			close(event){
			    this.imageList.splice(event,1);
			},
			// 预览图片
			previewImage (e) {
				var current = e.target.dataset.src
				//console.log(current);
				//console.log(this.imageList);
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			// 选择图片
			chooseImage () {
				if (this.imageList.length >= 9) {
					return
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						var successUp = 0
						var failUp = 0
						var length = res.tempFilePaths.length
						var i = 0
						uni.showLoading({
							title: "正在上传"
						})
						this.uploadPic(res.tempFilePaths, successUp, failUp, i, length)
					}
				})
			},
			// 上传传图片
			uploadPic (filePaths, successUp, failUp, i, length) {
				uni.uploadFile({
					url: "http://mrjx.weasing.cn/uploadfile.php",
					filePath: filePaths[i],
					name: 'pic',
					success: (res) => {
						successUp++
					},
					fail: (res) => {
						failUp++
					},
					complete: (res) => {
						this.imageList.push(res.data)
						i++
						if (i == length) {
							uni.hideLoading()
						} else {
							this.uploadPic(filePaths, successUp, failUp, i, length)
						}
					}
				})
			},
			// 提交数据
			_getList () {
				if (this.input_content === "") {
					Toast("写点东西在提交呗")
					return
				}
				uni.request({
					url: config.api_base_url + "bbsarticle/save",
					method: 'POST',
					data: {
						memberid: uni.getStorageSync("memberid"),
						bbstitle: this.input_content,
						pic: this.imageList
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: res => {
						if (res.statusCode == 200) {
							res = res.data
							if (res.rescode === "0000") {
								this.$store.commit('changePublish', true)
								sucToast("评论成功")
								setTimeout(() => {
									uni.switchTab({
										url: '../../tabBar/love/love'
									})
								}, 1500)
							} else {
								Toast(res.resmsg)
							}
						}
					}
				})
			}
		},
		// 导航栏跳转
		onNavigationBarButtonTap(event) {
			let index = event.index
			if (index === 0) {
				this._getList()
			}
		},
		onUnload() {
			this.imageList = [],
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex = 2,
			this.sizeType = ['压缩', '原图', '压缩或原图'],
			this.countIndex = 8;
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
	.release {
		height: 100%;
		position: relative;
		overflow: hidden;
		.emoji {
			width: 100%;
			height: 400upx;
			position: absolute;
			left: 0;
			bottom: 0;
			background: #e6e6e6;
			overflow: scroll;
			.item {
				display: flex;
				flex-wrap: wrap;
				padding-left: 2%;
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				.list {
					width: 14%;
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
