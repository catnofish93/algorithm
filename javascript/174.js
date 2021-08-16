function findMostWord(article) {
  if (!article) {
    return
  }

  article = article.trim().toLocaleLowerCase()
  let wordList = article.match(/[a-z]+/g),
      visited = [],
      maxNum = 0,
      maxWord = '';
  article = ' ' + wordList.join(' ') + ' '
  wordList.forEach(function (item) {
    if (visited.indexOf(item) < 0) {
      visited.push(item)
      let word = new RegExp(" " + item + " ", "g"),
          num = article.match(word).length
      if (num > maxNum) {
        maxNum = num
        maxWord = item
      }
    }
  })
  return maxWord + ' ' + maxNum
}
