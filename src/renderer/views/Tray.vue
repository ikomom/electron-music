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

    .control-box {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      padding: 0 15px;

      .control-icon {
        font-size: 44px;
        color: rgba(0, 0, 0, 0.7);
        cursor: pointer;

        &:hover {
          color: rgba(0, 0, 0, 1);
        }

        &.step {
          font-size: 18px;
          padding: 5px;
          border: 1px solid #333;
          border-radius: 50%;
        }
      }
    }

    .song-box {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;

      .song-name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #222;
        font-size: 14px;
      }

      .play-mode {
        flex: 0 0 24px;
        color: #666;
        font-size: 16px;
        cursor: pointer;
      }
    }

    .volume-box {
      height: 36px;
      display: flex;
      align-items: center;
      padding: 0 15px;
    }

    .menu-item {
      height: 42px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: #222;
      font-size: 14px;

      &.disabled {
        color: #999;
      }

      &:hover {
        background: #f3f5f9;
      }

      &.quit {
        border-top: 1px solid #ddd;
        margin: 4px 0;
      }

      .anticon {
        margin-right: 15px;
      }
    }
  }
}
</style>
