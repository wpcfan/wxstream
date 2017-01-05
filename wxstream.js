import { xs } from './lib/xstream/index'
import { debounce } from './lib/xstream/extra/debounce'
import { http } from './wrappers/http'
import { fromEvent } from './wrappers/from-event'
import { image } from './wrappers/image'
import { socket } from './wrappers/socket'
import { file } from './wrappers/file'

module.exports = {
  xs: xs,
  http: http,
  fromEvent: fromEvent,
  file: file,
  image: image,
  socket: socket,
  debounce: debounce
}