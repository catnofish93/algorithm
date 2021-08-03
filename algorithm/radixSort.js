/**
 * 基数排序, 比较非整形的数组
 * 平均时间复杂度为O(nk), 最坏时间复杂度为O(nk), 是稳定排序
 * @param arr
 * @returns {*}
 */
function radixSort(arr) {
  let length = arr.length;
  if (!Array.isArray(arr) || length <= 1) return
  let bucket = [],
      max = arr[0],
      loo;
  for(let i = 1; i< length; i++) {
    if (max < arr[i]) {
      max = arr[i]
    }
  }
  loop = (max + '').length
  for(let i = 0; i < 10; i++) {
    bucket[i] = []
  }
  for(let i = 0; i<loop; i++) {
    for(let j = 0; j<length; j++) {
      let str = arr[j] + ''
      if(str.length >= i+1) {
        let k = parseInt(str[str.length - 1 -i]);
        bucket[k].push(arr[j])
      } else {
        bucket[0].push(arr[j])
      }
    }
    arr.splice(0, length)

    for(let i = 0;i< 10;i++) {
      let t = bucket[i].length;
      for(let j = 0; j < t;j++) {
        arr.push(bucket[i][j]);
      }
    }
  }
  return arr
}
const arr = [1,9,4,2,4,6,1,51]
console.log(radixSort(arr))
