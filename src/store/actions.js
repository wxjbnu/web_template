import Vue from 'vue'

import { webService, apiActions } from '../api'
import router from './../router'
import co from 'co'
import { log } from 'util';

const actions = {

	initWeixin({ commit, dispatch, state }, ) {
		return new Promise((resolve, reject) => {
			dispatch("weixin", { params: {} }).then(data => {
        if (data.status == 200) {
          // wx.config({
					// 	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					// 	appId: '', // 必填，公众号的唯一标识
					// 	timestamp: '', // 必填，生成签名的时间戳
					// 	nonceStr: '', // 必填，生成签名的随机串
					// 	signature: '',// 必填，签名
					// 	jsApiList: [] // 必填，需要使用的JS接口列表
					// })
        } else {
          
				}
			})
				
			// Vue.http.post(params.url, { params: params.data })
			// .then((res) => {
			// 	if (res.status === 200) {
			// 		resolve(res.body.result)
					
			// 	} else {
			// 		// 
			// 		reject(res.status)
			// 	}
			// }, (res) => {
			// 	// 
			// 	reject(res)
			// })
		})
	},

	initToggle({ commit, dispatch, state }, apiAction) {
		// commit(types.SET_API_TOGGLE_INIT, { apiAction })
	},
	/**
	 * 
	 * @param {*} params
	 */
	getGeoByLocationBaidu({ commit, dispatch, state }, params) {
		let url = 'http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&output=json&pois=1'
		//百度的sdk码 好房：U6nWyKDQMVeNwgktgP5yFvhMkEDgBFnc  私人：D88d8d944644b5787c85b27ca7b4eeca
		const ak = 'U6nWyKDQMVeNwgktgP5yFvhMkEDgBFnc'
		// const location = '1.757537,115.664063'
		// const params = {location, ak}
		url = `${url}&ak=${ak}`
		// console.log(params)
		return new Promise((resolve, reject) => {
			Vue.http.jsonp(url, { params: params.params }).then((res) => {
				if (res.status === 200) {
					resolve(res.body.result)
				} else {
					// 
					reject(res.status)
				}
			}, (res) => {
				// 
				reject(res)
			})
		})
	},
	/**
	 * 通过经纬度获取地理位置
	 * @param {*经纬度} params 
	 */
	getGeoByLocation({ commit, dispatch, state }, params) {
		return new Promise((resolve, reject) => {
			// const res = {latitude: 13.82031, longitude: 100.66471} 28.226970,109.687500
			// const coord = new qq.maps.LatLng(params.params.latitude, params.params.longitude)
			// alert(JSON.stringify(params))
			// alert(params.params.latitude)
			// const coord = new qq.maps.LatLng(45.951150,100.898438)
			const coord = new qq.maps.LatLng(28.226970, 109.687500)
			const geocoder = new qq.maps.Geocoder({
				complete: function (result) {
					// alert('complete')
					resolve(result)
				},
				error: function () {
					alert('err')
					reject('出错了，请输入正确的经纬度！！！')
				}
			})
			geocoder.getAddress(coord)
		})
	},

}
// 将api中定义的apiActions制作成action
for (let i in apiActions) {
	let obj = {
		[i]: function ({ commit, dispatch, state }, { params = {}, options = {} } = {}) {
			let apiAction = i
			return webService({ commit, dispatch, apiAction }, { params, apiOptions: options }).then((data) => {
				// console.log(data);
				return data
			}).catch((reason) => {
				throw reason
			})
		},
	}
	Object.assign(actions, obj)
}
// console.log(actions.homePageArea);

export default actions