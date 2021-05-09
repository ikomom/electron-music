import Vue from "vue";
import VueWait from 'vue-wait'

Vue.use(VueWait)

export const waitInstance = new VueWait({ registerComponent: true })
