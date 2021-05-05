<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
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
    <HelloWorld
      class="dragButton"
      :msg="`Welcome to Your Vue.js App ${index}`"
    />
  </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from "@/components/HelloWorld";
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      index: 0
    }
  },
  created() {
    console.log('home ')
  },
  methods: {
    getBaidu() {
      axios.get('https://www.baidu.com').then(res => {
        console.log(res)
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
}
</style>
