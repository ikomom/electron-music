<template>
  <div class="progress-bar">
    {{ current }}
    <el-progress
      :percentage="50"
      :show-text="false"
    />
    {{ max }}
  </div>
</template>

<script>

export default {
  name: "ProgressBar",
  data() {
    return {
      current: '00:00',
      max: '3:25'
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.progress-bar {
  @include flexBox(row, center, center);
  font-size: 12px;
  color: $label-gray;

  ::v-deep {
    .el-progress {
      width: 100%;
      max-width: 40vw;
      margin: 0 8px;
      .el-progress-bar__outer{
        height: 3px !important;
        margin-top: 1px;

        &:hover {
          height: 7px !important;
          cursor: pointer;
        }
      }
    }
  }
}
</style>