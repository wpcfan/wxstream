import xs from '../lib/xstream/index'

let device = {}

device.sysInfo = () => {
  const producer = {
		start: listener => {
			wx.getSystemInfo({
				success: res => listener.next(res),
				fail: res => listener.error(new Error(res.errMsg)),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

device.network = () => {
  const producer = {
		start: listener => {
			wx.getNetworkType({
				success: res => listener.next(res),
				fail: res => listener.error(new Error(res.errMsg)),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

device.onAccChange = () => {
  const producer = {
		start: listener => {
			wx.onAccelerometerChange(res => {
        listener.next(res) //it seems an infinite stream so it never ends
      })
		},
		stop: () => {}
	}
  return xs.create(producer)
}

device.onCompChange = () => {
  const producer = {
		start: listener => {
			wx.onCompassChange(res => {
        listener.next(res) //it seems an infinite stream so it never ends
      })
		},
		stop: () => {}
	}
  return xs.create(producer)
}

device.dial = (phoneNumber) => {
  const producer = {
		start: listener => {
			wx.makePhoneCall({
        phoneNumber: phoneNumber,
				success: res => listener.next(res),
				fail: res => listener.error(new Error(res.errMsg)),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

device.scan = () => {
  const producer = {
		start: listener => {
			wx.scanCode({
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
  device: device
}