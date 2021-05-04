<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    你好世界，好不好
    <button @click="increase">
      加1s
    </button>
    <button @click="reset">
      reset
    </button>
    <button @click="getBaidu">
      getBaidu
    </button>
    <HelloWorld :msg="`Welcome to Your Vue.js App ${index}`" />
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
