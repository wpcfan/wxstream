import xs from './libs/xstream/index'
import debounce from './libs/xstream/extra/debounce'
import http from './wrappers/http'
import fromEvent from './wrappers/from-event'

module.exports = {
  xs: xs,
  http: http,
  fromEvent: fromEvent,
  debounce: debounce
}