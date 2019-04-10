<template>
	<view class="header">
		<view class="left-icon" @tap="openInfo"></view>
		<view class="header-text">{{headerText}}</view>
		<view class="right-icon"></view>
	</view>
</template>

<script>
	export default {
		props: {
			headerText: {
				type: String
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			openInfo () {
				this.$emit("openInfo")
			}
		}
	}
</script>

<style lang="scss">
	@import './../uni.scss';
	
	.header {
		width: 100%;
		height: 88rpx;
		padding: 0 23upx;
		box-sizing: border-box;
		background: $login-bg;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		.left-icon {
			background: url(../static/avatar.png) no-repeat;
			width: 66upx;
			height: 66upx;
			background-size: 100% 100%;
		}
		.header-text {
			font-size: 34upx;
		}
		.right-icon {
			background: url(../static/header-icon.png) no-repeat;
			width: 120upx;
			height: 54upx;
			background-size: 100% 100%;
		}
	}
</style>
