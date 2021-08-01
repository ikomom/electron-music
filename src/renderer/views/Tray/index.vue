<template>
  <div class="tray">
    <div class="tray-box">
      退出
    </div>
  </div>
</template>

<script>
export default {
  name: "Tray",
  data() {
    return {
      isFixed: false,
    };
  },
};
</script>

<style lang="less" scoped>
.tray {
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 350px;
  z-index: 9999999;
  opacity: 0.97;

  .tray-box {
    position: absolute;
    left: 8px;
    top: 8px;
    right: 8px;
    bottom: 8px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  }
}
</style>
