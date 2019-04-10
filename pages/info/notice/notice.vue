<template>
	<view class="notice">
		<view class="notice-item" v-if="notices.length">
			<view class="notice-list" v-for="(item,index) in notices" :key="index">
				<view class="left">
					<image src="../../../static/info-icon8.png"></image>
					<text>通知</text>
				</view>
				<view class="middle uni-ellipsis">{{item.text}}</view>
				<view class="right">{{item.time}}</view>
			</view>
		</view>
		<image v-if="!notices.length" class="notice-none" src="../../../static/info-icon9.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notices: [
					{
						text: "每日江夏app改版上线啦，快来看看吧......",
						time: "2019-02-28"
					},
					{
						text: "小米9要上线啦，快来看看吧......",
						time: "2019-02-28"
					},
					{
						text: "军运会要来了，你确定不来大武汉看一看吗",
						time: "2019-02-28"
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';
	
	page {
		background: #f6f5fb;
		height: 100%;
	}
	.notice {
		width: 100%;
		height: 100%;
		padding: 0 24upx;
		box-sizing: border-box;
		position: relative;
		.notice-none {
			width: 125upx;
			height: 172upx;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -64upx;
			margin-top: -86upx;
		}
		.notice-item {
			padding: 40upx 0;
			box-sizing: border-box;
			width: 100%;
			.notice-list {
				width: 100%;
				height: 79upx;
				border-radius: 16upx;
				background: #fff;
				border: 1px solid #eee;
				display: flex;
				align-items: center;
				padding: 0 24upx;
				box-sizing: border-box;
				margin-bottom: 16upx;
				.left {
					width: 120upx;
					flex: 0 0 120upx;
					display: flex;
					align-items: center;
					border-right: 2upx solid #eee;
					image {
						width: 38upx;
						height: 31upx;
					}
					text {
						font-size: $login-size;
						margin-left: 12upx;
					}
				}
				.middle {
					flex: 1;
					margin: 0 16upx;
				}
				.right {
					flex: 0 0 140upx;
					width: 140upx;
					font-size: 20upx;
				}
			}
		}
	}
</style>
