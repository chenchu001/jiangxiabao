<template>
	<view class="datum">
		<view class="datum-wrap">
			<!-- 头像 -->
			<view class="avatar" @tap="openChangeAvatar">
				<text>头像</text>
				<view class="avatar-img">
					<image class="icon" :src="headimgurl"></image>
					<image class="more" src="../../../static/black-more.png"></image>
				</view>
			</view>
			<!-- 昵称 -->
			<view class="name" @tap="openChangeName">
				<text>昵称</text>
				<view class="name-text">
					<text>{{nickname}}</text>
					<image class="more" src="../../../static/black-more.png"></image>
				</view>
			</view>
			<!-- 手机号 -->
			<view class="phone">
				<text>手机号</text>
				<view class="name-text">
					<text>{{myInfo.telphone}}</text>
				</view>
			</view>
			<!-- 性别 -->
			<view class="sex" @tap="changeSex">
				<text>性别</text>
				<view class="name-text">
					<text>{{sex}}</text>
					<image class="more" src="../../../static/black-more.png"></image>
				</view>
			</view>
			<!-- 生日 -->
			<view class="birthday">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						出生年月
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :start="startDate" :end="endDate" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
						<image class="more" src="../../../static/black-more.png"></image>
					</view>
				</view>
			</view>
			<!-- 地区 -->
			<view class="address" @tap="changeCity">
				<text>地区</text>
				<view class="name-text">
					<text>{{city}}</text>
					<image class="more" src="../../../static/black-more.png"></image>
				</view>
			</view>
		</view>
		<!-- 选择性别 -->
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="sexConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<!-- 选择城市 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="cityConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue';
	import cityData from '../../../common/city.data.js';
	import {Toast, sucToast, checkphone, config} from '../../../common/dialog.js'

	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				headimgurl: "http://mrjx.weasing.cn/defaultimg.png",
				nickname: "",
				myInfo: {},
				date: "",
				sex: "",
				sexId: 1,
				city: "暂未选择",
				themeColor: '#007AFF',
				pickerValueArray: [],
				cityPickerValueDefault: [16, 0, 10],
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerSingleArray: [{
						label: '男',
						value: 1
					},
					{
						label: '女',
						value: 2
					}
				]
			};
		},
		methods: {
			// 修改头像
			openChangeAvatar() {
				uni.navigateTo({
					url: '../crop/crop'
				});
			},
			// 修改姓名
			openChangeName() {
				uni.navigateTo({
					url: '../name/name'
				});
			},
			// 修改性别
			changeSex() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			// 修改生日
			bindDateChange (event) {
				this.date = event.target.value
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: 'POST',
					data: {
						memberid: uni.getStorageSync("memberid"),
						actname: "savemyinfo",
						birthday: this.date
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: res => {
					}
				})
			},
			// 修改城市
			changeCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(event) {
			},
			cityConfirm(event) {
				this.city = event.label
				this.cityPickerValueDefault = event.value
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: 'POST',
					data: {
						memberid: uni.getStorageSync("memberid"),
						actname: "savemyinfo",
						province: this.city.split("-")[0],
						city: this.city.split("-")[1],
						country: this.city.split("-")[2]
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: res => {
						
					}
				})
			},
			sexConfirm(event) {
				this.sex = event.label
				this.sexId = event.value
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: 'POST',
					data: {
						memberid: uni.getStorageSync("memberid"),
						actname: "savemyinfo",
						sex: this.sexId
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: res => {
						
					}
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			_getList () {
				uni.request({
					url: config.api_base_url + "mycenter/index",
					method: 'GET',
					data: {
						memberid: uni.getStorageSync("memberid"),
						actname: "myinfo"
					},
					header: {
						"content-type": "application/x-www-form-urlencoded" 
					},
					success: res => {
						res = res.data
						if (res.rescode === "0000") {
							this.myInfo = res.data
							if (res.data.sex === null) {
								this.sex = "暂未选择"
							} else if (res.data.sex == 1) {
								this.sex = "男"
							} else {
								this.sex = "女"
							}
							if (res.data.birthday === null) {
								this.date = "暂未选择"
							} else {
								this.date = res.data.birthday
							}
							if (res.data.province === null) {
								this.city = "暂未选择"
							} else {
								this.city = res.data.province + "-" + res.data.city + "-" + res.data.country
							}
						}
					}
				})
			}
		},
		onShow () {
			this.nickname = uni.getStorageSync("nickname")
			if (uni.getStorageSync("headimgurl") != null) {
				this.headimgurl = uni.getStorageSync("headimgurl")
			}
		},
		onLoad  () {
			this._getList()
		}
	}
</script>

<style lang="scss">
	@import './../../../uni.scss';

	page {
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.uni-list-cell-db {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	uni-picker {
		width: 100%;
	}
	.more {
		width: 36upx;
		height: 36upx;
	}
	.datum {
		background: #f6f5fb;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		.datum-wrap {
			width: 100%;
			background: #fff;
			padding: 0 24upx;
			box-sizing: border-box;
			.avatar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 110upx;
				border-bottom: 1px solid #e6e6ed;
				text {
					font-size: $login-size;
				}
				.avatar-img {
					display: flex;
					align-items: center;
					.icon {
						width: 66upx;
						height: 66upx;
						margin-right: 4upx;
					}
					.more {
						width: 36upx;
						height: 36upx;
					}
				}
			}
			.name,.phone,.sex,.birthday,.address {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 110upx;
				border-bottom: 1px solid #e6e6ed;
				text {
					font-size: $login-size;
				}
				.name-text {
					display: flex;
					align-items: center;
					text {
						font-size: $login-size;
					}
					.more {
						width: 36upx;
						height: 36upx;
					}
				}
			}
			.birthday .uni-list-cell::after {
				height: 0px;
			}
			.uni-input {
				padding: 0px;
				text-align: right;
			}
			.birthday .uni-list-cell {
				width: 100%;
				border: none;
				.uni-list-cell-left {
					padding: 0px;
				}
			}
		}
	}
</style>
