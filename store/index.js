import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		replyId: "",
		replyInfo: "",
		headimgurl: "",
		nickname: "",
		isPublish: false
    },
    mutations: {
		saveHeadimgurl (state, url) {
			state.headimgurl = url
		},
		saveNickname (state, name) {
			state.nickname = name
		},
        changeReply (state, id) {
			state.replyId = id
		},
		changeInfo (state, info) {
			state.replyInfo = info
		},
		changePublish (state, status) {
			state.isPublish = status
		},
		clearPublish (state, status) {
			state.isPublish = status
		},
		clearReply (state) {
			state.replyId = ""
		}
    }
})

export default store
