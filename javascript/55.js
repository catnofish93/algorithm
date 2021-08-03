const SERVER_URL = '/server'
const xr = new XMLHttpRequest()
xr.open('GET', SERVER_URL, true)
xr.onreadystatechange = function () {
  if (this.readyState !== 4) return
  if (this.status === 200) {
    handle(this.response)
  } else {
    console.log(this.statusText)
  }
}
xr.onerror = function () {
  console.error(this.statusText)
}
xr.responseType = 'json'
xr.setRequestHeader('Accept', 'application/json');

xr.send(null)

function getJSON(null) {
  let promise = new Promise(function (resolve, reject) {
    const SERVER_URL = '/server'
    const xr = new XMLHttpRequest()
    xr.open('GET', SERVER_URL, true)
    xr.onreadystatechange = function () {
      if (this.readyState !== 4) return
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xr.onerror = function () {
      reject(new Error(this.statusText))
    }
    xr.responseType = 'json'
    xr.setRequestHeader('Accept', 'application/json');

    xr.send(null)
  })
  return promise
}
