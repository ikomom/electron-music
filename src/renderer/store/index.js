import Vue from 'vue'
import Vuex from 'vuex'
import home from "@/store/modules/home";
import play from "@/store/modules/play";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    play
  }
})
