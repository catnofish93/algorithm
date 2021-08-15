function checkNullObj(obj) {
  return Object.keys(obj).length === 0 && Object.getOwnPropertySymbols().length === 0
}
