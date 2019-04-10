<template>
	<view class="tcp">
		<rich-text :nodes="strings" class="richText"></rich-text>
	</view>
</template>

<script>
	import {Toast, sucToast, checkphone, config} from '../../common/dialog.js'
	
	export default {
		data() {
			return {
				strings: ""
			};
		},
		methods: {
			_getTcpList () {
				uni.request({
					url: config.api_base_url + "webconfig/getmianze",
					method: "POST",
					success: (res) => {
						let ret = res.data
						this.strings = ret.data.iteminfo
					}
				})
			}
		},
		onLoad () {
			this._getTcpList()
		}
	}
</script>

<style lang="scss">
	@import './../../uni.scss';
	
	body.pages-tcp-tcp uni-page-body {
		background: #fff;
		height: 100%;
	}
	.tcp {
		width: 100%;
		height: 100%;
		padding: 30upx 40upx;
		box-sizing: border-box;
	}
	.tcp text {
		font-size: $login-large-size;
		display: block;
		text-align: justify;
	}
</style>
