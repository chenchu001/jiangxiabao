<template>
	<view class="content">
		<swiper class="swiper" 
		:indicator-dots="indicatorDots" 
		:indicator-color="baise" 
		:indicator-active-color="lanse"
		:autoplay="autoplay" 
		:duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image class="guide-img1" src="../../static/judge-img1.png" mode=""></image>
						<image class="guide-img2" src="../../static/judge-img2.png" mode=""></image>
						<image class="guide-img3" src="../../static/judge-img3.png" mode=""></image>
					</view>
					<view class="jump-over" @tap="launchFlag()">跳过</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image class="guide-img4" src="../../static/judge-img4.png" mode=""></image>
						<image class="guide-img2" src="../../static/judge-img5.png" mode=""></image>
						<image class="guide-img3" src="../../static/judge-img6.png" mode=""></image>
					</view>
					<view class="jump-over" @tap="launchFlag()">跳过</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image class="guide-img7" src="../../static/judge-img7.png" mode=""></image>
						<image class="guide-img2" src="../../static/judge-img8.png" mode=""></image>
						<image class="guide-img3" src="../../static/judge-img9.png" mode=""></image>
					</view>
					<view class="jump-over" @tap="launchFlag()">跳过</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image class="guide-img10" src="../../static/judge-img10.png"></image>
						<image class="guide-img11" src="../../static/judge-img11.png"></image>
					</view>
					<view class="experience-now" @tap="launchFlag()">立即体验</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: false,
				duration: 500,
				baise:'#918984',
				lanse: '#395bf6'
			}
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
						key: 'launchFlag',
						data: true,
				})
				uni.redirectTo({
				    url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	page,
	.content{
		width: 100%;
		height: 100%;
		background-size: 100% auto ;
		padding: 0;
		background: #fff;
	}
	.swiper{
		width: 100%;
		height: 100%;
	}
	.swiper-item {
		display: block;
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
	}
	.swiper-item-img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.swiper-item-img .guide-img1 {
		width: 343upx;
		height: 283upx; 
	}
	.swiper-item-img .guide-img2 {
		width: 223upx;
		height: 31upx;
		margin: 66upx 0 16upx 0
	}
	.swiper-item-img .guide-img3 {
		width: 223upx;
		height: 55upx; 
	}
	.swiper-item-img .guide-img4 {
		width: 349upx;
		height: 409upx;
	}
	.swiper-item-img .guide-img7 {
		width: 349upx;
		height: 375upx;
	}
	.swiper-item-img .guide-img10 {
		width: 299upx;
		height: 299upx;
		margin-top: -200upx;
	}
	.swiper-item-img .guide-img11 {
		width: 222upx;
		height: 54upx;
		margin-top: 55upx;
	}
	.swiper-item-text {
		padding-top: 40upx;
		width: 430upx;
		height: 130upx;
		margin: 0 auto;
	}
	.swiper-text{
		width: 100%;
		position: absolute;
		bottom: 80upx;
	}
	.swiper-text view{
		width: 100%;
		text-align: center;
		color: #FFF;
	}
	.swiper-text-cn{
		font-size: 40upx;
	}
	.swiper-text-us{
		font-size: 28upx;
	}
	.jump-over{
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		right: 45upx;
		top: 125upx;
		color: #37393b;
		background: rgba(0, 0, 0, .2);
		z-index: 999;
	}
	.experience-now{
		position: absolute;
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		padding:5upx 40upx;
		border-radius: 35upx;
		font-size: 32upx;
		left: 50%;
		margin-left: -140upx;
		bottom: 220upx;
		color: #fff;
		background: #9cadff;
		z-index: 9999;
	}
</style>
