import xs from '../lib/xstream/index'

let image =  {}

image.choose = (count=9, size=['original', 'compressed'], soure=['album', 'camera']) => {
  const producer = {
    start: listener => {
      wx.chooseImage({
        count: count,
        sizeType: size,
        sourceType: soure,
        success: res => listener.next(res),
        fail: () => listener.error('image choosing failed'),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

image.preview = (urls=[], current='') => {
  const producer = {
    start: listener => {
      wx.previewImage({
        current: current,
        urls: urls,
        success: res => listener.next(res),
        fail: () => listener.error('image preview failed'),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

image.info = (src='') => {
  const producer = {
    start: listener => {
      wx.getImageInfo({
        src: src,
        success: res => listener.next(res),
        fail: () => listener.error('image preview failed'),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

module.exports = {
  image: image
}