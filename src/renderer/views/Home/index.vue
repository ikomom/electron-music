<template>
  <div class="home">
    <el-carousel
      trigger="click"
      :interval="8000"
      type="card"
      :height="bannerHeight + 'px'"
    >
      <el-carousel-item
        v-for="(item, index) in bannerList"
        :key="index"
      >
        <el-image
          style="height: 100%"
          draggable="false"
          :src="item.imageUrl"
        />
        <span class="label">{{ item.typeTitle }}</span>
      </el-carousel-item>
    </el-carousel>
    <el-card
      v-for="item in NAVS"
      :key="item.key"
      style="margin-bottom: 10px;"
      shadow="hover"
      :body-style="{paddingBottom: 0}"
    >
      <div slot="header">
        {{ item.name }}
      </div>

      <el-row>
        <template v-for="(chunked, index) in chunkArr($store.state.home[item.key])">
          <el-row
            :gutter="16"
            type="flex"
            :key="index"
          >
            <el-col
              :span="chunked.length < 6 ? 24 /chunked.length : 5"
              v-for="cell in chunked"
              :key="cell.id"
              style="text-align: center;margin-bottom: 16px"
            >
              <el-button
                style="padding: 5px"
                @click="onCellClick(cell)"
              >
                <el-image
                  fit="contain"
                  draggable="false"
                  :src="cell.picUrl"
                />
              </el-button>
              <span style="word-break: break-word"> {{ cell.name }}</span>
            </el-col>
          </el-row>
        </template>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {mapState} from "vuex";
import chunk from 'lodash/chunk'
import {getUrl} from "@/utils/song";

const NAVS = [
  {
    name: "推荐歌单",
    key: "personalizedPlaylist",
  },
  {
    name: "独家放送",
    key: "privateContentList",
  },
  {
    name: "最新音乐",
    key: "newSongList",
  },
  {
    name: "推荐MV",
    key: "recommendMvList",
  },
  {
    name: "主播电台",
    key: "recommendDjList",
  },
];

export default {
  name: 'Home',
  data() {
    return {
      NAVS,
      bannerHeight: 200,
      imgHeight: 380
    }
  },
  computed: {
    ...mapState('home', ['bannerList'])
  },
  mounted () {
    this.setSize();
    window.addEventListener('resize', this.setSize, false);
  },
  destroyed() {
    window.removeEventListener('resize', this.setSize)
  },
  methods: {
    setSize() {
      // 最大适配2560分辨率
      this.bannerHeight = this.imgHeight / 2560 * document.documentElement.clientWidth
      console.log('bannerHeight', this.bannerHeight, document.documentElement.clientWidth)
    },
    chunkArr(arr) {
      // todo 缓存渲染结果
      return chunk(arr, arr.length > 6 ? 6 : arr.length).slice(0, 2)
    },
    onCellClick(item) {
      console.log('item', item)
      getUrl(item.id).then(songUrl => {
        console.log('url', songUrl)
        // todo
      })
    }
  }
}
</script>
<style scoped lang="scss">
.home {
  padding: 10px 30px;

  .label {
    background: red;
    color: #ffffff;
    font-size: 13px;
    padding: 2px 8px;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>
