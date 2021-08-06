
<template>
  <div class="play-bar-contain">
    <div class="play-music">
      <el-avatar
        shape="square"
        :src="circleUrl"
        class="avatar"
      />
      <div>
        <div>tutu <span class="label">({{ '芭蕾短裙' }})</span></div>
        <div>22</div>
      </div>
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
          />
          <icon-svg
            icon-class="next"
            style="font-size: 20px;"
          />
        </m-space>
      </div>
      <progress-bar />
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
    <audio ref="audio" />
  </div>
</template>

<script>

import {PLAY_STATUS} from "@/utils/constant";
import ProgressBar from "@/views/components/PlayBar/ProgressBar";
import MSpace from "@/components/Space";

const videoIcon = {
  [PLAY_STATUS.IDLE]: 'play',
  [PLAY_STATUS.PLAY]: 'play',
  [PLAY_STATUS.PAUSE]: 'pause'
}


export default {
  name: "PlayBar",
  components: {MSpace, ProgressBar},
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  computed: {
    playIcon() {
      return videoIcon[this.$store.state.play.playState]
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.play-bar-contain {
  @include thinBorder(top);
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 80px;
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
      margin-bottom: 3px;
    }
  }
  .play-other {
    @include flexBox(row, flex-end)
  }
}
</style>