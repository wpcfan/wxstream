import xs from '../lib/xstream/index'

let location =  {}

location.get = (type='wgs84') => {
  const producer = {
    start: listener => {
      wx.getLocation({
        type: type,
        success: res => listener.next(res),
        fail: res => listener.error(new Error(res.errMsg)),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

location.choose = () => {
  const producer = {
    start: listener => {
      wx.chooseLocation({
        success: res => listener.next(res),
        cancel:  () => listener.complete(),
        fail: res => listener.error(new Error(res.errMsg)),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

location.open = (latitude, longitude, scale=18, name='', address='') => {
  const producer = {
    start: listener => {
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: scale,
        name: name,
        address: address,
        success: res => listener.next(res),
        fail: res => listener.error(new Error(res.errMsg)),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

module.exports = {
  location: location
}