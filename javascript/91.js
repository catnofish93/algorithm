function debounce(fn, wait) {
  var timer = null;
  return function() {
    let context = this,
        args = arguments;
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

function throttle(fn, delay) {
  let preTime = Date.now()
  return function () {
    let context = this,
        args = arguments,
        nowTime = Date.now()
    if (nowTime - preTime > delay) {
      preTime = Date.now()
      fn.apply(context, args)
    }
  }

}
