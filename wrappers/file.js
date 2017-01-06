import xs from '../lib/xstream/index'

let file = {}

file.save = (tempFilePath) => {
  const producer = {
    start: listener => {
      wx.saveFile({
        tempFilePath: tempFilePath,
        success: res => listener.next(res),
        fail: () => listener.error('file cannot be saved'),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

file.list = () => {
  const producer = {
    start: listener => {
      wx.getSavedFileList({
        success: res => listener.next(res),
        fail: res => listener.error(res),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

file.info = (filePath) => {
  const producer = {
    start: listener => {
      wx.getSavedFileInfo({
        filePath: filePath,
        success: res => listener.next(res),
        fail: res => listener.error(res),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

file.remove = (filePath) => {
  const producer = {
    start: listener => {
      wx.removeSavedFile({
        filePath: filePath,
        success: res => listener.next(res),
        fail: res => listener.error(res),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

file.open = (filePath) => {
  const producer = {
    start: listener => {
      wx.openDocument({
        filePath: filePath,
        success: res => listener.next(res),
        fail: res => listener.error(res),
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