<template>
	<view class="set">
		<view class="title">
			<image class="logo" src="../../../static/login-logo.png" ></image>
			<text class="text">每日江夏</text>
			<text class="version">版本号：2.1.1</text>
		</view>
		<view class="content">
			<view class="item">
				<view class="list" @tap="openVersion">
					<text>版本更新</text>
					<image src="../../../static/black-more.png" mode=""></image>
				</view>
				<view class="list" @tap="openSuggest">
					<text>平台建议</text>
					<image src="../../../static/black-more.png" mode=""></image>
				</view>
				<view class="list">
					<text>推送设置</text>
					<switch checked @change="switchChange" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setVal: true
			};
		},
		methods: {
			openSuggest () {
				uni.navigateTo({
					url: '../suggest/suggest'
				});
			},
			openVersion () {
				uni.navigateTo({
					url: '../version/version'
				});
			},
			switchChange (event) {
				// console.log(event.detail.value)
				this.setVal = event.detail.value
			}
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';
	
	page {
		width: 100%;
		height: 100%;
	}
	.set {
		width: 100%;
		height: 100%;
		overflow: hidden;
		.title {
			margin-top: 140upx;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			.logo {
				width: 160upx;
				height: 160upx;
			}
			.text {
				font-size: 40upx;
				font-weight: 700;
				margin: 10upx 0 2upx;
			}
			.version {
				font-size: 24upx;
				color: #666;
			}
		}
		.content {
			margin-top: 60upx;
			width: 100%;
			padding: 0 50upx;
			box-sizing: border-box;
			.item {
				width: 100%;
				.list {
					display: flex;
					justify-content: space-between;
					border-top: 1px solid #e6e6ed;
					height: 106upx;
					line-height: 106upx;
					align-items: center;
					text {
						font-size: $login-large-size;
						color: #666;
					}
					image {
						width: 48upx;
						height: 48upx;
					}
				}
			}
		}
	}
</style>
