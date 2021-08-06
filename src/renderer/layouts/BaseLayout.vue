<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
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
    />
  </el-container>
</template>

<script>
import BaseAside from "@/components/BaseAside";
import PlayBar from "@/views/components/PlayBar";
import Header from "@/views/components/Header";
export default {
  name: "BaseLayout",
  components: {Header, PlayBar, BaseAside}
}
</script>

<style scoped lang="scss">
$header-height: 60px;
$footer-height: 60px;

.el-container {
  height: calc(100vh - #{$header-height} - #{$footer-height});
}
.el-header {
  padding: 0;
  height: #{$header-height};
}
.el-footer {
  padding: 0;
  height: #{$footer-height};
}

.el-aside {
  background-color: #D3DCE6;
}

.el-main {
  background-color: #E9EEF3;
  padding: 0
}

</style>
