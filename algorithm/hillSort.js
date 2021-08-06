/**
 * 希尔排序，先把数据进行分组，对每组进行插入算法排序
 * 平均时间复杂度为O(nlogn), 最差时间复杂度为O(n2)
 * @param arr
 * @returns {*}
 */
function hillSort(arr) {
  let length = arr.length
  if (!Array.isArray(arr) || length <=1) return
  for(let gap = parseInt(length >> 1); gap >= 1; gap = parseInt(gap >> 1) ) {
    for (let i = gap; i < length; i++) {
      let temp = arr[i];
      let j = i;
      while (j - gap >= 0 && arr[j - gap] > temp) {
        console.log(j, gap)
        // console.log(arr[j], arr[j - gap])
        arr[j] = arr[j - gap]
        j -= gap
      }
      arr[j] = temp
    }
  }
  return arr
}
const arr = [1,9,4,2,4,6,1,51]
console.log(hillSort(arr))

