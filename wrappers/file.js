import xs from '../lib/xstream/index'

let file = {}

file.save = (tempFilePath) => {
  const producer = {
    start: listener => {
      wx.saveFile({
        tempFilePath: tempFilePath,
        success: function(res) {
          listener.next(res)
        },
        fail: () => listener.error('file cannot be saved'),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

module.exports = {
  file: file
}