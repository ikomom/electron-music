<template>
  <svg
    class="svg-icon"
    :style="hoverStyle"
    aria-hidden="true"
    @click="onClick"
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
    // 本机assets\svg下默认icon前缀
    iconPrefix: {
      type: String,
      default: 'icon-'
    },
    hoverColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName({iconPrefix, iconClass}) {
      return `#${iconPrefix}${iconClass}`
    },
    hoverStyle({hoverColor}) {
      return hoverColor ? {
        '--hover-color': hoverColor,
        cursor: 'pointer'
      } : undefined
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  --hover-color: currentColor;

  &:hover {
    color: var(--hover-color);
  }
}
</style>


