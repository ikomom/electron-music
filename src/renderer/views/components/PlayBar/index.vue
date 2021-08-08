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
          <div class="label">
            {{ currentMusic.song.artists.map(i => i.name).join(' / ') }}
          </div>
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
        @onDrag="onProcessDrag"
        @onPercentChange="onPercentChange"
      />
    </div>
    <div class="play-other">
      <m-space :size="20">
        <icon-svg
          icon-class="single"
          style="font-size: 20px;"
          :style="{color: loop ? 'red' : 'currentColor'}"
          @click="loop = !loop"
        />
        <el-popover
          placement="top-start"
          width="80"
          trigger="hover"
        >
          <process-bar
            :percentage="volume * 100"
            @onPercent="setVolume"
          />
          <icon-svg
            :icon-class="volume ? 'voice' : 'muted'"
            style="font-size: 18px"
            hover-color="red"
            slot="reference"
            @click="onVolumeClick"
          />
        </el-popover>

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
import ProcessBar from "@/components/ProcessBar";

const videoIcon = {
  [PLAY_STATUS.IDLE]: 'play',
  [PLAY_STATUS.PLAY]: 'pause',
  [PLAY_STATUS.PAUSE]: 'play'
}

export default {
  name: "PlayBar",
  components: {ProcessBar, MSpace, ProgressBar},
  data() {
    return {
      loop: false,
      maxTime: undefined,
      currentTime: undefined,
      volume: 0.3,
      lastVolume: 0.3
    }
  },
  computed: {
    playIcon() {
      return videoIcon[this.playState]
    },
    ...mapState('play', ['currentMusic', 'playState'])
  },
  mounted() {
    this.setVolume(this.volume)
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
      if (!this.loop) {
        this.$store.commit("play/SET_PLAY_STATE", PLAY_STATUS.PAUSE)
      }
    },
    onError(e) {
      console.log('onError', e)
    },
    setVolume(volume = 0) {
      this.lastVolume = this.volume
      this.$refs.audio.volume = volume
      this.volume = volume
    },
    onVolumeClick() {
      if (this.volume) {
        this.setVolume(0)
      } else {
        this.setVolume(this.lastVolume)
      }
    },
    onProcessDrag(isDrag) {
      if (isDrag) {
        this.$store.commit("play/SET_PLAY_STATE", PLAY_STATUS.PAUSE)
      } else {
        this.$store.commit("play/SET_PLAY_STATE", PLAY_STATUS.PLAY)
      }
    },
    onPercentChange({currentTime}) {
      this.$refs.audio.currentTime = currentTime
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
      font-size: 14px;
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