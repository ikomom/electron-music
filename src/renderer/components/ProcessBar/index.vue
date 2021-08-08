<template>
  <div
    class="progress"
    @click="onClick"
  >
    <el-progress
      ref="process"
      :percentage="percentage"
      :show-text="false"
    />
  </div>
</template>

<script>
export default {
  name: "ProcessBar",
  props: {
    percentage: {// 0 ~ 100
      type: Number,
      default: 0
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
      this.changePercent(e.clientX)
    },
    changePercent(clientX) {
      const {left, width} = this.$refs.process.$el.getBoundingClientRect()
      const percent = (clientX - left) / width
      this.$emit('onPercent', percent)
    },
  }
}
</script>

<style scoped lang="scss">
.progress {
  ::v-deep {
    .el-progress {
      cursor: pointer;
      //transform: rotateX(90deg);
    }
  }
}

</style>