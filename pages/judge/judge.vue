<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad(){
			this.loadExecution()
		},
		methods: {
			loadExecution: function(){
				// #ifdef APP-PLUS
				try {
				    const value = uni.getStorageSync('launchFlag')
					const memberid = uni.getStorageSync('memberid')
				    if (value) {
				        if (value == true) {
							if (memberid != null) {
								uni.switchTab({
								    url: '/pages/tabBar/index/index'
								})
							} else {
								uni.redirectTo({
								    url: '/pages/login/login'
								})
							}
				        } else {
				            uni.redirectTo({
				                url: '/pages/index/guide'
				            });
				        }
				    } else {
// 				        uni.setStorage({
// 				            key: 'launchFlag',
// 				            data: true,
// 				            success: function() {
// 								console.log('存储launchFlag');
// 							}
// 				        });
				        uni.redirectTo({
				            url: '/pages/index/guide'
				        });
				    }
				} catch(e) { 
					// error 
					uni.setStorage({ 
						key: 'launchFlag', 
						data: true, 
						success: function () {
							console.log('error时存储launchFlag');
						} 
					}); 
					uni.redirectTo({ url: '/pages/index/guide' }); 
				}
				return;
				// #endif
				uni.switchTab({
				    url: '/pages/tabBar/index/index'
				});
			}
		}
	}
</script>
<style>
	
</style>
