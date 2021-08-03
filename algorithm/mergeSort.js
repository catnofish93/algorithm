/**
 * 归并排序， 递归将数组两两分开，直到只包含一个元素，然后进行数据排序合并
 * 平均时间复杂度为O(nlogn)， 最坏时间复杂度为O(nlogn)，空间复杂度为O(n)
 * @param array
 * @returns {[]|*}
 */
function mergeSort(array) {
  let length = array.length
  if (!Array.isArray(array) || length === 0) return;
  if (length === 1) {
    return array
  }
  let mid = parseInt(length >> 1),
      left = array.slice(0, mid),
      right = array.slice(mid, length);
  console.log(left, right)
  return merge(mergeSort(left), mergeSort(right))
}
function merge(leftArray, rightArray) {
  let result = [],
      leftLength = leftArray.length,
      rightLength = rightArray.length,
      il = 0,
      ir = 0;
  while(il < leftLength && ir < rightLength) {
    if (leftArray[il] < rightArray[ir]) {
      result.push(leftArray[il++])
    } else {
      result.push(rightArray[ir++])
    }
  }
  while(il < leftLength) {
    result.push(leftArray[il++])
  }
  while(ir < rightLength) {
    result.push(rightArray[ir++])
  }
  return result
}
const arr = [1,9,4,2,4,6,1,51]
console.log(mergeSort(arr))
