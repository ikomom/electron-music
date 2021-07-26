<template>
  <div>
    {{ timeText }}
    <canvas
      ref="canvas"
      :width="canvasLayout.width"
      :height="canvasLayout.height"
      @mousemove="onMouseMove"
    />
  </div>
</template>

<script>
import RBush from 'rbush';

export default {
  name: "Fm",
  data() {
    return {
      timeText: '',
      img: 'https://ztifly.oss-cn-hangzhou.aliyuncs.com/%E6%B2%B9%E7%94%BB.jpeg',
      brush: new RBush(9),
      canvasLayout: {
        width: 800,
        height: 600
      },
      reactSize: 120,
      bbox: {},
      memCtx: null,
      memCanv: null
    }
  },
  created() {
    this.memCanvas()
    this.fillCanvas()
    this.loadItems()
  },
  mounted() {

  },
  computed: {
    ctx() {
      return this.$refs.canvas?.getContext('2d')
    }
  },
  methods: {
    // 填充背景
    fillCanvas() {
      const {width, height} = this.canvasLayout;
      const img = new Image();
      img.src = this.img;
      img.width = width;
      img.height = height;

      img.onload = () => {
        this.ctx.drawImage(img, 0, 0, width, height);
        // 填充矩形
        this.memCtx.stroke()
        this.ctx.drawImage(this.memCanv, 0, 0)
        this.pattern = this.ctx.createPattern(img, '');
        // console.log('pattern', pattern)
        // this.ctx.fillStyle = pattern
        // this.ctx.fillRect(0, 0, 200, 100)
      }
    },
    // 加载项目
    loadItems(n = 1000) {
      console.time('generateReact')
      let items = []
      for (let i = 0; i < n; i++) {
        const item = this.randomRect()
        items.push(item)
        this.memCtx.rect(
          item.minX,
          item.minY,
          item.maxX - item.minX,
          item.maxY - item.minY
        )
      }
      console.timeEnd('generateReact')
      console.time('loadItem')
      this.brush.load(items)
      console.timeEnd('loadItem')
    },
    // 随机矩形
    randomRect() {
      const {width, height} = this.canvasLayout;
      const rect = {}
      rect.minX = Math.random() * width
      rect.maxX = rect.minX + Math.random() * this.reactSize
      rect.minY = Math.random() * height
      rect.maxY = rect.minY + Math.random() * this.reactSize
      rect.name = 'rect' + new Date().getTime()
      return rect
    },
    // 新建canvas
    memCanvas() {
      const {width, height} = this.canvasLayout;
      this.memCanv = document.createElement('canvas')
      this.memCanv.height = height
      this.memCanv.width = width
      this.memCtx = this.memCanv.getContext('2d')
      this.memCtx.strokeStyle = 'rgba(0,0,255,0.7)'
    },
    onMouseMove(e) {
      this.ctx.clearRect(0, 0, this.canvasLayout.width, this.canvasLayout.height);
      const x = e.offsetX
      const y = e.offsetY
      this.bbox.minX = x - 20
      this.bbox.maxX = x + 20
      this.bbox.minY = y - 20
      this.bbox.maxY = y + 20
      const start = performance.now()
      const res = this.brush.search(this.bbox)
      this.ctx.fillStyle = this.pattern
      this.ctx.strokeStyle = 'rgba(212,22,22,0.7)'
      res.forEach((item) => {
        this.ctx.rect(
          item.minX,
          item.minY,
          item.maxX - item.minX,
          item.maxY - item.minY
        )
      })
      this.ctx.fill()
      this.timeText =
        'Search Time (ms): ' + (performance.now() - start).toFixed(3)
    }
  }
}
</script>

<style scoped>

</style>
