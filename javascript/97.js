Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    console.error('typeof err')
  }
  let args = [...arguments].slice(1),
      results = null;

  context = context || window
  context.fn = this
  results = context.fn(...args)
  delete context.fn
  return results
}

Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    console.error('typeof err')
  }
  let args = arguments.slice(1),
      result = null;
  context = context || window
  context.fn = this;
  result = context.fn(...arguments[1])
  delete context.fn
  return result
}

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    console.error('typeof err')
  }
  let args = [...arguments].slice(1),
      fn = this
  return function Fn() {
    return fn.apply(
        this instanceof  Fn ? this : context,
        args.concat(...arguments)
    )
  }
}
