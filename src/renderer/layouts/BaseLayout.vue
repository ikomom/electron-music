<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <BaseAside />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BaseAside from "@/components/BaseAside";
export default {
  name: "BaseLayout",
  components: {BaseAside}
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  /*text-align: center;*/
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 200px;*/
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  /*text-align: center;*/
  /*line-height: 160px;*/
}

</style>
