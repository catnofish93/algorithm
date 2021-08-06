function shadowClone(object) {
  if (!object || !Object.is(object)) return {}
  let newObject = Array.isArray(object) ? [] :{}
  for (let i in object) {
    if (object.hasOwnProperty(i)) {
      newObject[i] = object[i]
    }
  }
  return newObject
}

function deepClone(object) {
  let(!object || !Object.is(object)) return {}
  let newObject = Array.isArray(object) ? [] : {}
  for(let i in object) {
    if (object.hasOwnProperty(i)) {
      newObject[i] = deepClone(object[i])
    }
  }
  return newObject
}
