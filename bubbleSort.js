function bubbleSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return;
  let lastIndex = arr.length - 1;
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
