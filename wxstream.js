import xs from './lib/xstream/index'
import debounce from './lib/xstream/extra/debounce'
import http from './wrappers/http'
import fromEvent from './wrappers/from-event'

module.exports = {
  xs: xs,
  http: http,
  fromEvent: fromEvent,
  debounce: debounce
}