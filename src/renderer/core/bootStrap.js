import store from "@/store"
import {printANSI} from "@/utils/log-util";

export default function Initializer () {
  printANSI() // 请自行移除该行.  please remove this line
  store.dispatch('home/getHome')
}
