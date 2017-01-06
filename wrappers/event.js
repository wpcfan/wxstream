import xs from '../lib/xstream/index'

let event = {}

event.fromInputEvent = (srcObj, propertyName) => {
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
  event: event
}