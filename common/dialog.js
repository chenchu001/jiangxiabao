// 无图标弹窗
export function Toast (title) {
	uni.showToast({
		title: title,
		icon: "none",
		mask: false,
		duration: 1500
	})
}
// 成功弹窗
export function sucToast (title) {
	uni.showToast({
		title: title,
		icon: "success",
		mask: false,
		duration: 1500
	})
}
// 验证手机号
export function checkphone (phone) {
	if (!(/^1[34578]\d{9}$/.test(phone)) || phone == "") {
		return false
	} else {
		return true
	}
}

// 请求链接
export const config = {
    api_base_url: "http://mrjx.weasing.cn/index.php/v1/"
}

// 分享到微信
export function shareWeiXin(url, title, summary, imageUrl, callback) {
	uni.share({
		provider: "weixin",
		scene: "WXSceneSession",
		type: 0,
		href: url,
		title: title,
		summary: summary,
		imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
		success: function(res) {
			console.log("success:" + JSON.stringify(res));
			callback(res)
		},
		fail: function(err) {
			console.log("fail:" + JSON.stringify(err));
		}
	});
}

// 分享到朋友圈
export function shareFriend(url, title, summary, imageUrl, callback) {
	uni.share({
		provider: "weixin",
		scene: "WXSenceTimeline",
		type: 0,
		href: url,
		title: title,
		summary: summary,
		imageUrl: imageUrl,
		success: function(res) {
			console.log("success:" + JSON.stringify(res));
			callback(res)
		},
		fail: function(err) {
			console.log("fail:" + JSON.stringify(err));
		}
	});
}
