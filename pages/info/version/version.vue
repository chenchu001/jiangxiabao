<template>
	<view class="version">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in news" :key="index">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.text}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: [
					{
						text: "7.0.03版本主要更新",
						time: "2019-03-05"
					},
					{
						text: "7.0.02版本主要更新",
						time: "2019-02-05"
					},
					{
						text: "7.0.01版本主要更新",
						time: "2019-01-05"
					}
				]
			};
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';
	
	page {
		height: 100%;
	}
	.release {
		width: 100%;
		height: 100%;
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
