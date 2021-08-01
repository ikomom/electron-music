<template>
  <el-container>
    <el-header>Headers</el-header>
    <el-container>
      <el-aside width="200px">
        <BaseAside />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer>
      <play-bar />
    </el-footer>

    <el-backtop
      target=".el-main"
      :bottom="100"
      :right="15"
    >
      <!--      <div-->
      <!--        style="{-->
      <!--        height: 100%;-->
      <!--        width: 100%;-->
      <!--        background-color: #f2f5f6;-->
      <!--        box-shadow: 0 0 6px rgba(0,0,0, .12);-->
      <!--        text-align: center;-->
      <!--        line-height: 40px;-->
      <!--        color: #1989fa;-->
      <!--      }"-->
      <!--      >-->
      <!--        UP-->
      <!--      </div>-->
    </el-backtop>
  </el-container>
</template>

<script>
import BaseAside from "@/components/BaseAside";
import PlayBar from "@/views/components/PlayBar";
export default {
  name: "BaseLayout",
  components: {PlayBar, BaseAside}
}
</script>

<style scoped lang="scss">
$header-height: 60px;
$footer-height: 60px;

.el-container {
  height: calc(100vh - #{$header-height} - #{$footer-height});
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  line-height: $header-height;
}

.el-aside {
  background-color: #D3DCE6;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  /*text-align: center;*/
  /*line-height: 160px;*/
}

</style>
