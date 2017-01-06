import xs from '../lib/xstream/index'

let voice = {}

voice.play = (filePath) => {
  const producer = {
		start: listener => {
			wx.playVoice({
        filePath: filePath,
				success: res => listener.next(res),
				fail: res => listener.error(new Error(res.errMsg)),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

voice.pause = () => {
  const producer = {
		start: listener => {
			wx.pauseVoice()
			listener.next(null)
			listener.complete()
		},
		stop: () => {}
	}
  return xs.create(producer)
}

voice.stop = () => {
  const producer = {
		start: listener => {
			wx.stopVoice()
			listener.next(null)
			listener.complete()
		},
		stop: () => {}
	}
  return xs.create(producer)
}

module.exports = {
	voice: voice
}