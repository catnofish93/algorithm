/**
 * 快速排序
 * 平均时间复杂度为O(nlogn),最差时间复杂度为O(n2)
 * 空间最好复杂度为O(logn),最差空间复杂度为O(n)
 * @param array
 * @param start
 * @param end
 */
function quickSort(array, start, end) {
  let length = array.length
  if (!Array.isArray(array) || length <=1 || start >= end) return;
  let index = partition(array, start, end)
  quickSort(array, start, index - 1)
  quickSort(array, index + 1, end)
}
function partition(array, start, end) {
  let pivot = array[start]
  while (start < end) {
    while (array[end] >= pivot && start < end) {
      end--
    }
    array[start] = array[end]
    while (array[start] < pivot && start < end) {
      start++
    }
    array[end] = array[start]
  }
  array[start] = pivot
  return start
}
const arr = [1,9,4,2,4,6,1,51]
console.log(quickSort(arr, 0, arr.length - 1))
console.log(arr)
