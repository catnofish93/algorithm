/**
 * 堆排序
 * 平均时间复杂度为O(nlogn),最坏时间复杂度为O(nlogn)
 * @param arr
 * @returns {*}
 */
function heapSort(arr) {
  let length = arr.length;
  if (!Array.isArray(arr) || length <= 1) return arr
  buildMaxHeap(arr)

  for(let i = length - 1; i> 0;i--) {
    swap(arr, 0, i)
    adjustMaxHeap(arr, 0 , i)
  }
  return arr
}
function adjustMaxHeap(arr, index, heapSize) {
  let iMax, iLeft, iRight;
  while(true) {
    iMax = index;
    iLeft = 2 * index + 1;
    iRight = 2 * index + 2;
    if (iLeft < heapSize && arr[iMax] < arr[iLeft]) {
      iMax = iLeft
    }
    if (iRight < heapSize && arr[iMax] < arr[iRight]) {
      iMax = iRight
    }
    if (iMax !== index) {
      swap(arr, index, iMax)
      index = iMax
    } else {
      break
    }
  }
}
function buildMaxHeap(arr) {
  let length = arr.length,
      iParent = parseInt(length>>1) - 1;
  for(let i = iParent;i>=0;i--) {
    adjustMaxHeap(arr, i , length)
  }
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp
}
const arr = [1,9,4,2,4,6,1,51]
console.log(heapSort(arr))
