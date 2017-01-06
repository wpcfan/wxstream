import xs from '../lib/xstream/index'

let video = {}

video.choose = (sourceType=['album', 'camera'], maxDuration=60, camera='back') => {
	const producer = {
		start: listener => {
			wx.chooseVideo({
        sourceType: sourceType,
				maxDuration: maxDuration,
				camera: camera,
				success: res => listener.next(res),
				fail: res => listener.error(res),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

video.createContext = (videoId) => {
	const producer = {
		start: listener => {
			let ctx = wx.createVideoContext(videoId)
			listener.next(ctx)
			listener.complete()
		},
		stop: () => {}
	}
  return xs.create(producer)
}

module.exports = {
	video: video
}