import Vue from 'vue'

export default {
	SET_GOODS_LIST(state, { data }) {
		// 设置订单
		console.log(data);
		
		state.goodsList.splice(0, state.goodsList.length)
		for (let i = 0; i < data.length; i++) {
			state.goodsList.push(data[i])
		}
	},
	SET_GOODS_DETAIL(state, { data }) {
		// 选择当前商品
		// console.log(JSON.stringify(data))
		state.goodsDetail = Object.assign({}, data)
		// console.log(JSON.stringify(state.goodsDetail))
	},
	DEL_CART(state, { data }) {
		// 删除购物车
		const cartList = []
		for (let index = 0; index < data.length; index++) {
			cartList.push(state.shopCart[data[index]])
		}
		// console.log(JSON.stringify(cartList));
		
		// 先清空以前的
		state.shopCart.splice(0, state.shopCart.length)

		for (let index = 0; index < cartList.length; index++) {
			state.shopCart.push(JSON.parse(JSON.stringify(cartList[index])))
		}

		// console.log(cartList);
	},
	EDIT_CART(state, { data }){
		// 设置购物车商品数量
		// console.log(data)
		state.shopCart[data.index].ownNum = data.num
	},
	CHECK_CART(state, { data }){
		// 购物车选择商品
		// console.log(data)
		state.shopCart[data.index].checked = data.checked
	},
	CHECK_ALL_CART(state, { data }){
		// 全选购物车商品
		// console.log(data)
		for (const i in state.shopCart) {
			state.shopCart[i].checked = data
		}
		// state.shopCart[data.index].checked = data.checked
	},
	ADD_CART(state, { data }){
		// 添加到购物车
		let inCart = false
console.log(data);

		for (const i in state.shopCart) {
			if (state.shopCart[i].cid == data.cid && state.shopCart[i].id == data.id) {
				state.shopCart[i].ownNum += 1
				state.shopCart[i].checked = true
				inCart = true
			}
		}
		if (!inCart) {
			// Object.assign({}, data)
			state.shopCart.push(Object.assign({}, data))
		}
		console.log(JSON.stringify(state.shopCart))
	},
	SET_ORDER(state, { data }) {
		// 设置订单
		state.order = JSON.parse(JSON.stringify(data))
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
	


//-------***********************************----------
	SET_USERINFO(state, { data }) {
		console.log(data);
		state.userInfo = Object.assign({}, data)
		// 设置机器的列表
		// state.urlParams = urlParams
	},
	SET_DEVICE_EDIT(state, { data }) {
		// 设置在编辑的机器
		// state.urlParams = urlParams
	},

	SET_URL_PARAMS(state, { urlParams }) {
		state.urlParams = urlParams
	},
	SET_CITY(state, { data }) {
		state.cityList.list = Object.assign(state.cityList.list, data.list)
		state.cityList.hascity = data.hascity
	},

}