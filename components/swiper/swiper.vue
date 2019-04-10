<template>
	<swiper class="swiper-container" previous-margin="20rpx" next-margin="20rpx" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="autoplay">
			<swiper-item class="swiper-item" v-for="(item, index) in imgUrls" :key="index" @tap="openDetail" :data-id="item.id">
				<image :src="item.pic" class="slide-image" />
				<text class="slide-text uni-ellipsis">{{item.summary}}</text>
			</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props: {
			imgUrls: {
				type: Array
			}
		},
		data () {
			return {
				autoplay: true,
				interval: 5000,
				duration: 500
			}
		},
		methods: {
			openDetail (event) {
				let id = event.currentTarget.dataset.id
				this.$emit("openSwiperDetail", id)
			}
		}
	}
</script>

<style lang="scss">
	@import './../../uni.scss';
	
	.swiper-container {
	    width: 100%;
		height: 100%;
	}
	.swiper-item {
	    width: 100%;
	    border-left:6rpx solid #fff;
	    border-right: 6rpx solid #fff;
	    position: relative;
	    box-sizing: border-box;
	}
	.slide-image {
	    width: 100%;
	    height: 100%;
	}
	.slide-text {
	    position: absolute;
	    height: 40px;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    line-height: 40px;
	    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 1)));
	    background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
	    padding: 0 10px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    color: #fff;
	    font-size: 32rpx;
	}
</style>
