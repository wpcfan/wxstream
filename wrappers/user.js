import xs from '../lib/xstream/index'

let user =  {}

user.login = () => {
  const producer = {
    start: listener => {
      wx.login({
        success: res => listener.next(res),
        fail: res => listener.error(new Error(res.errMsg)),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

user.check = () => {
  const producer = {
    start: listener => {
      wx.checkSession({
        success: res => listener.next(res),
        fail: res => listener.error(new Error(res.errMsg)),
        complete: () => listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

user.info = () => {
  const producer = {
    start: listener => {
      wx.getUserInfo({
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
  user: user
}