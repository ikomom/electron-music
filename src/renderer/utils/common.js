export function timeFormat(time) {
  // 小时
  const hr = Math.floor(time / 3600 % 24);
  // 分钟
  const min = Math.floor(time / 60 % 60);
  // 秒
  const sec = Math.floor(time % 60);
  const arr = hr ? [hr, min, sec] : [min, sec]

  return arr.reduce((acc, cur) => {
    return acc + ':' + formatNumber(cur)
  })
}

export function formatNumber(number) {
  const _num = Number(number)
  if (number < 10) {
    return '0' + number
  }
  return _num
}