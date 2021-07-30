/**
 * 选择排序，每次循环，确定最小的元素，并将元素交换到首位置
 * 时间复杂度均为O(n2)
 * @param array
 * @returns {*}
 */
function selectSort(array) {
  let length = array.length;
  if (!Array.isArray(arr) || length < 1) return;
  for (let i = 0; i < length; i++) {
    let minIndex = i;
    for ( let j = i + 1; j <length; j++) {
      if (array[minIndex] > array[j]) {
        minIndex = j;
      }
    }
    swap(array, i , minIndex);
  }
  return array;
}

function swap(array, left, right) {
  let temp = array[left];
  array[left] = array[right]
  array[right] = temp;
}

const arr = [1,9,4,2,4,6,1,51]
console.log(selectSort(arr))
