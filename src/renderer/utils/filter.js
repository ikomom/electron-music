import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
   // 将整数部分逢三一断
  return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dataStr ? dayjs(dataStr).format(pattern) : undefined
})

Vue.filter('fromNow', function (date) {
  return dayjs(date).fromNow()
})
// 给样式加单位
Vue.filter('getStyle', function getStyle(style = {}, unit = 'px') {
  if (typeof style === 'object') {
    const newStyle = {}
    newStyle[style] = style
    Object
      .keys(style)
      .forEach(key => {
        newStyle[key] = typeof style[key] === 'number' ? style[key] + unit : style[key]
      })
    return newStyle
  } else if (typeof style === 'number') {
    return style + unit
  }
  return style
})
