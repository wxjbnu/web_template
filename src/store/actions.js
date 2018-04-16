import Vue from 'vue'

import { webService, apiActions } from '../api'
import router from './../router'
// import co from 'co'

const actions = {
	actionsTest({ commit, dispatch, state }, apiAction) {
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