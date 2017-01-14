import xs from './lib/xstream/index'
import debounce from './lib/xstream/extra/debounce'
import concat from './lib/xstream/extra/concat'
import dropRepeats from './lib/xstream/extra/dropRepeats'
import { http } from './wrappers/http'
import { event } from './wrappers/event'
import { image } from './wrappers/image'
import { socket } from './wrappers/socket'
import { file } from './wrappers/file'
import { record } from './wrappers/record'
import { voice } from './wrappers/voice'
import { audio } from './wrappers/audio'
import { video } from './wrappers/video'
import { storage } from './wrappers/storage'
import { location } from './wrappers/storage'
import { device } from './wrappers/device'
import { user } from './wrappers/user'

module.exports = {
  xs: xs,
  http: http,
  event: event,
  file: file,
  image: image,
  socket: socket,
  record: record,
  voice: voice,
  audio: audio,
  video: video,
  storage: storage,
  location: location,
  device: device,
  user: user,
  debounce: debounce,
  concat: concat,
  dropRepeats: dropRepeats
}