<template>
  <div class="progress-bar">
    {{ current | timeFormat }}
    <div
      class="process"
      @mousemove="onMouseMoveAtProcess"
      @mouseleave="onMouseLeaveAtProcess"
    >
      <el-progress
        :percentage="percentage"
        :show-text="false"
      />
      <!--      <span class="handle" />-->
    </div>
    {{ maxTime | timeFormat }}
  </div>
</template>

<script>

import { timeFormat} from "@/utils/common";

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
    }
  },
  computed: {
    percentage({current, maxTime}){
      return Math.floor(current / maxTime * 100)
    }
  },
  filters: {
    timeFormat(val) {
      return timeFormat(val)
    }
  },
  methods: {
    onMouseMoveAtProcess(e) {
      // console.log('moveProcess', e)
    },
    onMouseLeaveAtProcess(e) {
      // console.log('moveLeave', e)
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

  .process {
    max-width: 40vw;
    width: 100%;
    position: relative;

    .handle {
      //display: none;
      position: absolute;
      border-radius: 50%;
      border: 1px solid red;
      background: #306eff;
      width: 10px;
      height: 10px;
      top: -2px;
      left: 2px;
      cursor: pointer;
    }

    ::v-deep {
      .el-progress {
        width: 100%;
        max-width: 40vw;
        .el-progress-bar__outer{
          height: var(--bar-height) !important;
          margin-top: 1px;
          &:hover {
            height: 7px !important;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>