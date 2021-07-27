/**
 * 冒泡排序
 *
 * 其外层循环执行 N - 1次
 *
 * 内层循环最多的时候执行N次，最少的时候执行1次，平均执行 (N+1)/2次。所以循环体内的比较交换约执行 `(N - 1)(N + 1) / 2 = (N^2 - 1)/2`。按照计算复杂度的原则，去掉常数，去掉最高项系数，其复杂度为O(N^2)
 *
 * 也可以用等差数列来解释百度的计算方法https://baike.baidu.com/item/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F/4602306?fr=aladdin
 * (1 + (n-1)) * (n-1) / 2 = n * (n-1) / 2
 *
 * @param {Array} a
 */
export function bubbleSort(a = []) {
  let swapped = false
  let lastIndex = a.length;
  console.time('bubbleSort')
  do {
    swapped = false;
    for (let i = 0; i < lastIndex; i++) {
      if (a[i + 1] < a[i]) {
        const temp = a[i + 1];
        a[i + 1] = a[i];
        a[i] = temp
        swapped = true
      }
    }
    lastIndex--;
  } while (swapped)
  console.timeEnd('bubbleSort')
}