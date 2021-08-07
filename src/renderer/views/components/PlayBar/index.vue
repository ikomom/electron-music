<template>
  <div class="play-bar-contain">
    <div class="play-music">
      <template v-if="currentMusic.id">
        <el-avatar
          shape="square"
          :src="currentMusic.picUrl"
          class="avatar"
        />
        <div>
          <div>
            {{ currentMusic.name }}
            <!--  todo   -->
            <span
              class="label"
              style="display: none"
            >({{ '芭蕾短裙' }})</span>
          </div>
          <div>{{ currentMusic.song.artists.map(i => i.name).join(' / ') }}</div>
        </div>
      </template>
    </div>
    <div class="play-controller">
      <div class="play-icon">
        <m-space
          align="center"
          :size="18"
        >
          <icon-svg
            icon-class="pre"
            style="font-size: 20px;"
          />
          <icon-svg
            :icon-class="playIcon"
            style="font-size: 28px"
            hover-color="red"
            @click="onClickPlayBtn"
          />
          <icon-svg
            icon-class="next"
            style="font-size: 20px;"
          />
        </m-space>
      </div>
      <progress-bar
        :max-time="maxTime"
        :current="currentTime"
      />
    </div>
    <div class="play-other">
      <m-space>
        <icon-svg
          icon-class="voice"
          style="font-size: 18px"
        />
        <icon-svg
          icon-class="playList"
          style="font-size: 18px"
        />
      </m-space>
    </div>
    <audio
      :loop="loop"
      preload="auto"
      ref="audio"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnd"
      @progress="onProgress"
      @timeupdate="updateTime"
      @waiting="onWaiting"
      @playing="onPlaying"
      @error="onError"
    />
  </div>
</template>

<script>

import {PLAY_STATUS} from "@/utils/constant";
import ProgressBar from "@/views/components/PlayBar/ProgressBar";
import MSpace from "@/components/Space";
import {mapState} from "vuex";

const videoIcon = {
  [PLAY_STATUS.IDLE]: 'play',
  [PLAY_STATUS.PLAY]: 'pause',
  [PLAY_STATUS.PAUSE]: 'play'
}


export default {
  name: "PlayBar",
  components: {MSpace, ProgressBar},
  data() {
    return {
      loop: false,
      maxTime: undefined,
      currentTime: undefined,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  computed: {
    playIcon() {
      return videoIcon[this.playState]
    },
    ...mapState('play', ['currentMusic', 'playState'])
  },
  methods: {
    onProgress() {
      console.log('onProgress')
    },
    onPlay() {
      console.log('onPlay')
    },
    onWaiting(e) {
      console.log('onWaiting', e)
    },
    onPlaying(e) {
      console.log('onPlaying', e)
      this.maxTime = e.target.duration
    },
    updateTime(e) {
      // console.log('updateTime', e.timeStamp)
      this.currentTime = e.target.currentTime
    },
    onPause(e) {
      console.log('onPause', e)
    },
    onEnd(e) {
      console.log('onEnd', e)
    },
    onError(e) {
      console.log('onError', e)
    },
    onClickPlayBtn() {
      if (this.currentMusic.id) {
        this.$store.commit('play/SET_PLAY_STATE', this.playState === PLAY_STATUS.PLAY ? PLAY_STATUS.PAUSE : PLAY_STATUS.PLAY)
      } else {
        this.$store.commit("play/SET_PLAY_STATE", PLAY_STATUS.IDLE)
      }
    },
    changeState(val) {
      const audio = this.$refs.audio;
      switch (val) {
        case PLAY_STATUS.PLAY:
          if (audio.src) {
            audio.play().then(res => {
              console.log('audio:play', res)
            }).catch(e => {
              console.error(e)
            });
          }
          break;
        case PLAY_STATUS.PAUSE:
          audio.pause();
          break;
        case PLAY_STATUS.IDLE:
          this.$refs.audio.src = ''
          break;
      }
    }
  },
  watch: {
    currentMusic: {
      handler(val) {
        this.$refs.audio.src = val.songUrl
        console.log('currentMusic', val, this.$refs.audio)
        this.changeState(this.playState)
      }
    },
    playState: {
      handler(val) {
        this.changeState(val)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.play-bar-contain {
  @include thinBorder(top);
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 1fr minmax(200px, 1fr);
  align-items: center;
  height: 100%;
  padding: 0 20px 0 10px;


  .play-music {
    @include flexBox(row, flex-start, center);

    .avatar {
      border-radius: 5px;
      margin-right: 10px;
    }

    .label {
      color: $label-gray;
    }
  }

  .play-controller {
    text-align: center;

    .play-icon {
    }
  }

  .play-other {
    @include flexBox(row, flex-end)
  }
}
</style>