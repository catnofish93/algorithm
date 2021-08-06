// 观察者模式
var eventes = (function () {
  var topics = {}
  return {
    subscribe(topic, handle) {
      if (!topics.hasOwnProperty(topic)) {
        topics[topic] = []
      }
      topics.push(topic)
    },
    publish(topic, info) {
      if(topics.hasOwnProperty(topic)) {
        topics[topic].forEach(handle => {
          handle(info)
        })
      }
    },
    remove(topic, handle) {
      if (!topics.hasOwnProperty(topic)) {
        return
      }
      var handleIndex = -1
      topics[topic].forEach((item, index) => {
        if (item === handle) {
          handleIndex = index
        }
      })
      topics[topic].splice(handleIndex, 1)
    },
    removeAll(topic) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic] = []
      }
    }
  }
})
// 发布/订阅者模式
