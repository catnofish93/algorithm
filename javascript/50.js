function objectFactory() {
  let newObject = null,
      constructor = Array.prototype.shift.call(arguments),
      result = null;
  if (typeof constructor !== 'function') {
    console.error("type error");
    return;
  }
  newObject = Object.create(constructor.prototype)
  result = constructor.apply(newObject, arguments)
  let flag =
      result && (typeof result === "object" || typeof result === "function");
  return flag ? result : newObject
}
