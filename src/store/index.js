import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
// import { apiActions } from '../api'

Vue.use(Vuex)

const state = {
	userAgent: '', // PC H5(需要选择微信还是支付宝支付) alipay weChat
	goodsDetail: {
		id: 1,                                    //商品ID
		imgUrl: "http://smartshop.rfmember.net/img/t/435/icon.png",  //商品主图
		name: "可可",                         //商品名称
		num: 10,                                  //库存数量
		payPrice: 3,                              //实际支付价格
		storePrice: 3,                            //商品显示价格
		sorting: 1     
	},
	goodsList: [ // 商品列表
		// {
		// 	"id": 2,                                //分类ID
		// 	"imgUrl": "http://smartshop.rfmember.net/img/t/435/icon.png",       //分类图
		// 	"name": "热销",                         //分类名称
		// 	"sorting": 1,                           //排序号
		// 	"items": [
		// 		{
		// 			id: 1,                                    //商品ID
		// 			imgUrl: "http://smartshop.rfmember.net/img/t/435/icon.png",  //商品主图
		// 			name: "可可",                         //商品名称
		// 			num: 10,                                  //库存数量
		// 			payPrice: 3,                              //实际支付价格
		// 			storePrice: 3,                            //商品显示价格
		// 			sorting: 1                               //排序号
		// 		}, 
		// 		{
		// 			id: 11,                                    //商品ID
		// 			imgUrl: "http://smartshop.rfmember.net/img/t/435/icon.png",  //商品主图
		// 			name: "小老板紫菜",                         //商品名称
		// 			num: 10,                                  //库存数量
		// 			payPrice: 3,                              //实际支付价格
		// 			storePrice: 3,                            //商品显示价格
		// 			sorting: 1  
		// 		}
		// 	]
		// }
	],
	shopCart: [ // 购物车列表
		// {
		// 	cid: 1,                                    //商品ID
		// 	id: 1,                                    //商品ID
		// 	imgUrl: "http://smartshop.rfmember.net/img/t/435/icon.png",  //商品主图
		// 	name: "可口",                         //商品名称
		// 	num: 10,                                  //库存数量
		// 	payPrice: 3,                              //实际支付价格
		// 	storePrice: 3,                            //商品显示价格
		// 	amount: 1,
		// 	checked: true,
		// }
	],
	order: { // 订单详情

	},
	wxShare: { // 分享内容
		title: '第一时间掌握好房资讯！',
		desc:'汇集富力地产精品好房，抢占先机尽享独家折扣，尽在富力好房！',
		onedesc:'富力好房汇集富力地产精品好房，抢占先机尽享独家折扣！',
		link: 'http://smartshop.rfchina.com/rfhouse-front/#/main',
		imgUrl: 'http://smartshop.rfmember.net/img/t/435/icon.png',
	},
	dateOptions: {
		disabledDate(time) {
			return time.getTime() < Date.now() - 24*60*60*1000
		},
	},
}

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
})