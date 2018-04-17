import Vue from 'vue'

export default {
	SET_GOODS_DETAIL(state, { data }) {
		state.goodsDetail = Object.assign({}, data)
	},
	
	GET_USERAGENT(state, { }) {
		const u = navigator.userAgent
		const browser = { // 移动终端浏览器版本信息
			IE: u.indexOf('MSIE') > -1, // IE内核
			presto: u.indexOf('Presto') > -1, // opera内核
			webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, // 是否iPad
			webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
			weChat: !!u.match(/MicroMessenger/i), // 是否微信
			aliPay: !!u.match(/Alipay/i) // 是否支付宝
		}
		if (browser.weChat) {
			// 微信
			state.userAgent = 'weChat'
			return
		}
		if (browser.aliPay) {
			// 支付宝
			state.userAgent = 'aliPay'
			return
		}
		if (!browser.mobile) {
			// PC
			state.userAgent = 'PC'
			return
		}
		if (browser.mobile) {
			// H5
			state.userAgent = 'H5'
		}
	},

}