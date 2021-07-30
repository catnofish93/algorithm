/**
 * 插入排序 将一个待排序的记录，插入到有序序列中，直到插完所有元素
 * 最好时间复杂度为O(n),最差为O(n2)
 * @param array
 * @returns {*}
 */
function insertSort(array) {
  let length = array.length;
  if (!Array.isArray(array) || length <=1) return;
  for(let i = 1; i < length; i++) {
    let temp = array[i];
    let j = i;
    while (j - 1 >=0&&array[j-1] > temp) {
      array[j] = array[j - 1]
      j--;
    }
    array[j] = temp
  }
  return array
}
const arr = [1,9,4,2,4,6,1,51]
console.log(insertSort(arr))
