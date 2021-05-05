<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'IconSvg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconPrefix: {// 本机assets\svg下默认icon
      type: String,
      default: 'icon-'
    }
  },
  computed: {
    iconName({iconPrefix, iconClass}) {
      return `#${iconPrefix}${iconClass}`
    }
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  /*vertical-align: -0.15em;*/
  fill: currentColor;
  overflow: hidden;
}
</style>


