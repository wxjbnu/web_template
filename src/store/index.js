import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
// import { apiActions } from '../api'

Vue.use(Vuex)

const state = {
	userAgent: '', // PC H5(需要选择微信还是支付宝支付) alipay weChat
	
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