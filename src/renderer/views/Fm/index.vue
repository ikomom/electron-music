<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>

<script>
import RBush from 'rbush';

export default {
  name: "Fm",
  data() {
    return {
      img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg93.pp.sohu.com%2Fimages%2Fblog%2F2006%2F10%2F18%2F17%2F13%2F10eee8d2901.jpg&refer=http%3A%2F%2Fimg93.pp.sohu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629883945&t=9e7a0f2745d8204bee2ad2d8ecf9e834',
      brush: new RBush(9),
    }
  },
  created() {
    const item = {
      minX: 20,
      minY: 40,
      maxX: 30,
      maxY: 50,
      foo: 'bar'
    };
    this.brush.insert(item)
    console.log('========', this.brush)
    const result = this.brush.search({
      minX: 10,
      minY: 20,
      maxX: 80,
      maxY: 70
    });
    console.log('result', result)
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
