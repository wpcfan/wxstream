import xs from '../lib/xstream/index'

let fromEvent = {}

fromEvent.fromInputEvent = (srcObj, propertyName) => {
  const evProducer = {
    start: (listener) => {
      Object.defineProperty(
        srcObj, 
        propertyName, 
        {value: ev => listener.next(ev.detail.value)})
    },
    stop: () => {}
  }
  return xs.create(evProducer)
}

module.exports = {
  fromEvent: fromEvent
}