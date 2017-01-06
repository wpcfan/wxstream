import xs from '../lib/xstream/index'

let storage = {}

storage.set = (key, data) => {
  const producer = {
		start: listener => {
			wx.setStorage({
        key: key,
        data: data,
				success: res => listener.next(res),
				fail: res => listener.error(res),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

storage.get = (key) => {
  const producer = {
		start: listener => {
			wx.getStorage({
        key: key,
				success: res => listener.next(res),
				fail: res => listener.error(res),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

storage.info = () => {
  const producer = {
		start: listener => {
			wx.getStorageInfo({
				success: res => listener.next(res),
				fail: res => listener.error(res),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

storage.remove = () => {
  const producer = {
		start: listener => {
			wx.removeStorage({
        key: key,
				success: res => listener.next(res),
				fail: res => listener.error(res),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

storage.clear = () => {
  const producer = {
		start: listener => {
			wx.clearStorage({
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
	storage: storage
}