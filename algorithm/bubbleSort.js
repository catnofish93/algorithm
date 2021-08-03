/**
 * 冒泡排序，最好的时间复杂度为O(n), 最坏时间复杂度为O(n2), 空间复杂度为O(1)
 * @param arr
 * @returns {*}
 */
function bubbleSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return;
  let lastIndex = arr.length - 1;
  // 当最后一个交换元素为第一个时，说明已排序完毕
  while (lastIndex > 0) {
    let flag = true, k = lastIndex;
    for (let j = 0; j< k; j++) {
      if (arr[j] > arr[j+1]) {
        flag = false;
        lastIndex = j;
        [arr[j], arr[j + 1]] = [arr[j+1], arr[j]];
      }
    }
    if (flag) break
  }
  return arr
}
const arr = [1,9,4,2,4,6,1,51]
console.log(bubbleSort(arr))
