import Vue from 'vue'
import VueResource from 'vue-resource'
import router from '../router'
import store from '../store'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

const host = ``

export const apiActions = {
	storeItems: {
		url: `${host}/api/store/items`,
		method: 'POST'
	},
}
export const apiv2 = {

}

Vue.resource.actions = Object.assign(apiActions, apiv2, {})// 使用自定义的vue-resource action
// Vue.resource.actions = apiActions;//使用自定义的vue-resource action

// 使用vue-resource调用接口
export const webService = ({ dispatch, commit, apiAction }, { params = {}, apiOptions = {
	progress: (evt) => {
		if (evt.lengthComputable) {
			var percentComplete = Math.round(evt.loaded * 100 / evt.total)
			// console.log(percentComplete + "%");
		}
	}
} } = {}) => {

	// Vue.$indicator.open()

	return Vue.resource(null, null, null, apiOptions)[apiAction](params)
		.then((response) => {
			// console.log(response)
			// store.commit('SET_PATH`, { data: { path: that.name, query: that.query, params: that.params } })
			// store.dispatch('openUrl`, { path: 'code_login`, query: router.app.$route.query })
			if (typeof response.data === 'string') {
				response.data = JSON.parse(response.data)
			}

			if (response.data.status === 200) {

				// Vue.$indicator.close()

				return response.data
			} else {
				var statusArr = [403, 201, 2012, 2011]
				// commit(types.SET_API_TOGGLE_FAIL, { apiAction }) // 将state中的状态设为加载失败
				// Vue.$indicator.close()

				if (response.data.status === 401) {
					console.log('没有权限')
					router.push({path: 'login'})
				}

				// 不是这些的状态码就自动弹出提示
				if (statusArr.indexOf(response.data.status) === -1 && !params.noToast) {
					// router.app.$toast({ duration: 3000, message: response.data.message + ':)' })
				}


				if (response.data.status === 403 || response.data.status === 2011) {
					// 需要去登录的情况

				}
				return response.data
			}
		}).catch(function (response) {
			console.log(response)
			let msg = ''
			if (response.status >= 0) {

				if (response.status == 0) {
					msg = '网络不给力哦！'
					// router.app.$notify.error({duration:3000,title:'出错了`,message:msg});
				} else if (response.status >= 200 && response.status < 400) {
					if (response.data.status < 1000) {
						msg = response.data.message

					}

				} else {

				}
			} else {
				if (response.toString() == '[object Object]') {
					msg = apiAction + ': ' + JSON.stringify(response)
				} else {
					msg = apiAction + ': ' + response
				}
				// router.app.$notify.error({duration:3000,title:'出错了`,message:msg});
			}
			// Vue.$indicator.close()

			// router.app.$toast({ duration: 3000, message: msg + ':)' })
			throw response.body// 抛出错误信息
		})
}
