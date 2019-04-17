import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		replyId: "",
		replyInfo: "",
		headimgurl: "",
		nickname: "",
		isPublish: false,
		isName: false,
    },
    mutations: {
		changeName (state, status) {
			state.isName = status
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
