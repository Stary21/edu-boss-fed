import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = JSON.parse(data)
      window.localStorage.setItem('user', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
