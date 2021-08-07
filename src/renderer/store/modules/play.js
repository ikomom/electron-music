import {PLAY_MODE, PLAY_STATUS} from "@/utils/constant";

export default {
  namespaced: true,
  state: {
    mode: PLAY_MODE.MUSIC, // 播放模式
    currentMusic: {}, // 当前播放音乐
    currentMusicTrace: {},// 当前播放音乐歌词
    playList: [], // 播放列表
    playState: PLAY_STATUS.IDLE, // 播放状态
  },
  getters: {},
  mutations: {
    PLAY_MUSIC(state, payload = {}) {
      state.currentMusic = payload
      state.mode = PLAY_MODE.MUSIC
      state.playState = PLAY_STATUS.PLAY
      if (!state.playList.find(l => l.id === payload.id)) {
        state.playList.push(payload)
      }
    },
    SET_PLAY_STATE(state, payload) {
      state.playState = payload || PLAY_STATUS.IDLE
    }
  },
  actions: {
  }
}