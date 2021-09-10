function cssStyle2DomStyle(sName) {
  let arr = sName.split('-')
  arr = arr.filter(item => {
    return item !== ''
  }).map((item, index) => {
    if (index !== 0) {
      item = item.substring(0, 1).toUpperCase() + item.substring(1)
    }
    return item
  })
  return arr.join('')
}
console.log(cssStyle2DomStyle('webkitBackgroundComposite'))
