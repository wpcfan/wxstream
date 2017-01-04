import xs from '../libs/xstream/index'

let http =  {}

http.get = (url, data={}, header={'content-type': 'application/json'}) => {
  return http_request(url, 'GET', data, header) 
}

http.post = (url, data={}, header={'content-type': 'application/json'}) => {
  return http_request(url, 'POST', data, header)
}

http.put = (url, data={}, header={'content-type': 'application/json'}) => {
  return http_request(url, 'PUT', data, header)
}

http.delete = (url, data={}, header={'content-type': 'application/json'}) => {
  return http_request(url, 'DELETE', data, header)
}

function http_request(
  url, 
  method='GET', 
  data={}, 
  header={'content-type': 'application/json'}) {
  const producer = {
    start: listener => {
      wx.request({
        url: url,
        data: JSON.stringify(data),
        header: header,
        method: method, 
        success: res => listener.next(res),
        fail: () => listener.error('something is wrong'),
        complete: () => listener.complete()
      })
    },
    stop: ()=>{

    }
  }
  return xs.create(producer)
}

module.exports = {
  http: http
}