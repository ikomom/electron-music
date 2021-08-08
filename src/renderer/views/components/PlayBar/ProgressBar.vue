<template>
  <div
    class="progress-bar"
    @mouseleave="isMouseDown = false"
  >
    {{ current | timeFormat }}
    <div
      class="process"
      ref="process"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      @click="onClick"
    >
      <el-progress
        :percentage="percentage"
        :show-text="false"
        :style="barStyle"
      />
      <span
        class="handle"
        :style="handleStyle"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
      />
    </div>
    {{ maxTime | timeFormat }}
  </div>
</template>

<script>

import {timeFormat} from "@/utils/common";

export default {
  name: "ProgressBar",
  props: {
    current: {
      type: Number,
      default: 0
    },
    maxTime: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      hover: false,
      isMouseDown: false,
    }
  },
  computed: {
    percentage({current, maxTime}) {
      return Math.floor(current / maxTime * 100) || 0
    },
    barStyle() {
      return {
        '--bar-height': this.hover ? '7px' : '3px',
        '--bar-transition': this.isMouseDown ? 'none' : 'width .2s ease'
      }
    },
    handleStyle({percentage, hover}) {
      if (!hover) {
        return {display: 'none'}
      }
      return {
        left: (percentage / 100 * this.$refs.process?.getBoundingClientRect().width - 6 || 0) + 'px',
      }
    },
  },
  filters: {
    timeFormat(val) {
      return timeFormat(val)
    }
  },
  created() {
    window.addEventListener('mousemove', this.onMouseMoveAtProcess, false)
  },
  destroyed() {
    window.removeEventListener('mousemove', this.onMouseMoveAtProcess)
  },
  methods: {
    onMouseMoveAtProcess(e) {
      if (this.isMouseDown) {
        // console.log('moveProcess', e.clientX, e)
        this.changePercent(e.clientX)
      }
    },
    onClick(e) {
      this.changePercent(e.clientX)
    },
    changePercent(clientX) {
      const {left, width} = this.$refs.process.getBoundingClientRect()
      const percent = (clientX - left) / width
      const currentTime = percent * this.maxTime
      this.$emit('onPercentChange', {percent, currentTime})
    },
  },
  watch: {
    isMouseDown: {
      handler(val) {
        this.$emit('onDrag', val)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.progress-bar {
  @include flexBox(row, center, center);
  font-size: 12px;
  color: $label-gray;
  gap: 10px;
  --bar-height: 3px;
  user-select: none;

  .process {
    max-width: 40vw;
    width: 100%;
    position: relative;

    .handle {
      position: absolute;
      border-radius: 50%;
      background: #409EFF;
      width: 12px;
      height: 12px;
      top: -2px;
      left: 2px;
      cursor: pointer;

    }

    ::v-deep {
      .el-progress {
        width: 100%;
        max-width: 40vw;

        .el-progress-bar__outer {
          height: var(--bar-height) !important;
          margin-top: 1px;

          &:hover {
            cursor: pointer;
          }
        }

        .el-progress-bar__inner {
          transition: var(--bar-transition)
        }
      }
    }
  }
}
</style>