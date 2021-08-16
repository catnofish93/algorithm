function jsonp(url, params, callback) {
  let queryString = url.indexOf('?') !== -1 ? '?' : '&'
  for(var k in params) {
    if (params.hasOwnProperty('k')) {
      queryString += k + '=' + params[k] + '&'
    }
  }
  let random = Math.random()
      .toString()
      .replace('.', ''),
      callBackName = 'myJsonP' + random
  queryString += 'callback=' + callBackName
  let scriptNode = document.createElement('script')
  scriptNode.url = url + queryString
  window[callBackName] = function () {
    callback(...arguments)
    document.getElementsByTagName('head')[0].removeChild(scriptNode)
  }
  document.getElementsByTagName('head')[0].appendChild(scriptNode)
}
