import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
// import { apiActions } from '../api'

Vue.use(Vuex)

const state = {
	userAgent: '',

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