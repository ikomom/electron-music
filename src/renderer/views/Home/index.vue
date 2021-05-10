<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../../assets/logo.png"
    >
    你好世界，好不好
    <el-button
      @click="increase"
      type="primary"
    >
      加1s
    </el-button>
    <el-button @click="reset">
      reset
    </el-button>
    <el-button @click="getBaidu">
      getBaidu
    </el-button>
    <el-carousel
      :interval="4000"
      type="card"
      height="200px"
    >
      <el-carousel-item
        v-for="(item, index) in bannerList"
        :key="index"
      >
        <el-image
          draggable="false"
          :src="item.imageUrl"
        />
        <!--        <h3 class="medium">-->
        <!--          {{ item }}-->
        <!--        </h3>-->
      </el-carousel-item>
    </el-carousel>
    <HelloWorld
      class="dragButton"
      :msg="`Welcome to Your Vue.js App ${index}`"
    />
  </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from "@/components/HelloWorld";
import {getBanner} from "@/api/banner";
import log from "@/utils/log-util";

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      index: 0,
      bannerList: []
    }
  },
  created() {
    console.log('home ')
  },
  methods: {
    getBaidu() {
      getBanner().then(res => {
        log('getBanner', res)
        if (res.code === 200) {
          this.bannerList = res.banners
        }
      })
    },
    increase() {
      this.index++
    },
    reset() {
      this.index = 0
      // eslint-disable-next-line no-debugger
      debugger
    }
  }
}
</script>
<style scoped lang="scss">
.home {
  padding: 10px;
  border: 1px solid $test-red;

  .dragButton {
    @include app-region-draggable(no-drag);
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>
