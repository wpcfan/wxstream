import xs from '../lib/xstream/index'

const CONN_METHOD = {
  OPTIONS: 'OPTIONS',
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  TRACE: 'TRACE',
  CONNECT: 'CONNECT'
}

let socket =  {
  CONN_METHOD: CONN_METHOD
}

socket.connect = (
  url, 
  data = {}, 
  header = {'content-type': 'application/json'}, 
  method=CONN_METHOD.GET) => {
  const producer = {
    start: listener => {
      wx.connectSocket({
        url: url,
        data: data,
        header: header,
        method: method,
        success: res => listener.next(res),
        fail: res => listener.error(new Error(res.errMsg))
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

socket.onOpen = () => {
  const producer = {
    start: listener => {
      wx.onSocketOpen(res => {
        listener.next(res)
        listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

socket.onErr = () => {
  const producer = {
    start: listener => {
      wx.onSocketError(res => listener.next(res))
    },
    stop: () => {}
  }
  return xs.create(producer)
}

socket.sendMsg = (data) => {
  const producer = {
    start: listener => {
      const isArray = Array.isArray(data)
      if(isArray){
        data.map(element => wx.sendSocketMessage({
          element,
          success: () => listener.next(element),
          fail: res => listener.error(new Error(res.errMsg))
        }))
      } else {
        wx.sendSocketMessage({
          data,
          success: () => listener.next(data),
          fail: res => listener.error(new Error(res.errMsg))
        })
      }
    },
    stop: () => {}
  }
  return xs.create(producer)
}

socket.onMsg = () => {
  const producer = {
    start: listener => {
      wx.onSocketMessage(res => {
        listener.next(res) // it should be an infinite stream
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

socket.close = () => {
  const producer = {
    start: listener => {
      wx.closeSocket()
      wx.onSocketClose(res => {
        listener.next(res)
        listener.complete()
      })
    },
    stop: () => {}
  }
  return xs.create(producer)
}

module.exports = {
  socket: socket
}