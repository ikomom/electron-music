import {getBanner} from "@/api/banner";
import {getPersonalizedPlaylist} from "@/api/playlist";
import {getNewSong} from "@/api/song";
import {getPersonalizedMV} from "@/api/mv";
import {getRecommendDjprogram} from "@/api/dj";
import {getPrivateContent} from "@/api/privatecontent";

export default {
  namespaced: true,
  state: {
    bannerList: [],
    personalizedPlaylist: [],
    recommendMvList: [],
    newSongList: [],
    privateContentList: [],
    recommendDjList: []
  },
  mutations: {
    setBannerList(state, bannerList) {
      state.bannerList = bannerList || []
    },
    setPersonalizedPlaylist(state, list) {
      state.personalizedPlaylist = list || []
    },
    setNewSong(state, list) {
      state.newSongList = list || []
    },
    setRecommendMv(state, list) {
      state.recommendMvList = list || []
    },
    setRecommendDj(state, list) {
      state.recommendDjList = list || []
    },
    setPrivateContent(state, list) {
      state.privateContentList = list || []
    },
  },
  actions: {
    getHome({dispatch}){
      dispatch("getBannerList");
      dispatch("getPersonalizedPlaylist");
      dispatch("getNewSong");
      dispatch("getRecommendMv");
      dispatch("getRecommendDj");
      dispatch("getPrivateContent");
    },
    getBannerList({ commit }) {
      return getBanner().then(res => {
        if (res.code === 200) {
          commit('setBannerList', res.banners)
        }
      })
    },
    getPersonalizedPlaylist({ commit }) {
      return getPersonalizedPlaylist().then(res => {
        if (res.code === 200) {
          commit('setPersonalizedPlaylist', res.result)
        }
      })
    },
    getNewSong({ commit }) {
      return getNewSong(12).then(res => {
        if (res.code === 200) {
          commit('setNewSong', res.result)
        }
      })
    },
    getPrivateContent({ commit }) {
      return getPrivateContent().then(res => {
        if (res.code === 200) {
          commit('setPrivateContent', res.result)
        }
      })
    },
    getRecommendMv({ commit }) {
      return getPersonalizedMV().then(res => {
        if (res.code === 200) {
          commit('setRecommendMv', res.result)
        }
      })
    },
    getRecommendDj({ commit }) {
      return getRecommendDjprogram().then(res => {
        if (res.code === 200) {
          commit('setRecommendDj', res.result)
        }
      })
    },
  }
}