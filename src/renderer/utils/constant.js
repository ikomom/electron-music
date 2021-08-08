export const PLAY_STATUS = {
  IDLE: 'idle',// 无音乐播放
  PLAY: 'play',// 正在播放
  PAUSE: 'pause',// 暂停
}

export const PLAY_MODE = {
  MUSIC: 'music', // 音乐
  RADIO: 'radio', // 广播
  FM: 'fm', // 私人fm
  VIDEO: 'video', // 视频
}

export const PLAY_TYPE = {
  recommend: 0, // 歌单
  type: 1, // 电台
  music: 4, // 音乐
  video: 5,// 视频
}

export const PLAY_LIST_STATE = [
  {key: 0, title: '列表循环', icon: 'circle'},
  {key: 1, title: '单曲循环', icon: 'single'},
  {key: 2, title: '随机播放', icon: 'random'},
]