<template>
  <div>
    <el-menu
      router
    >
      <el-menu-item
        v-for="item in recommendMap"
        :index="item.path"
        :key="item.name"
      >
        <icon-svg
          :icon-class="item.meta.icon"
          :style="item.meta.iconStyle"
        />
        <span slot="title"> {{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {recommendMap} from "@/router/modules/recommend";

export default {
  name: "BaseAside",
  created () {
    console.log(this.$route, recommendMap)
  },
  data () {
    return {
      recommendMap,
    }
  }
}
</script>

<style scoped>

</style>
