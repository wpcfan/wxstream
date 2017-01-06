import xs from '../lib/xstream/index'

let audio = {}

audio.state = () => {
  const producer = {
		start: listener => {
			wx.getBackgroundAudioPlayerState({
				success: res => listener.next(res),
				fail: res => listener.error(new Error(res.errMsg)),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

audio.play = (dataUrl, title, coverImageUrl) => {
  const producer = {
		start: listener => {
			wx.playBackgroundAudio({
        dataUrl: dataUrl,
        title: title,
        coverImageUrl: coverImageUrl,
				success: res => listener.next(res),
				fail: res => listener.error(new Error(res.errMsg)),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

audio.pause = () => {
  const producer = {
		start: listener => {
			wx.pauseBackgroundAudio()
      listener.next(null) //just need a signal
      listener.complete()
		},
		stop: () => {}
	}
  return xs.create(producer)
}

audio.seek = (position) => {
  const producer = {
		start: listener => {
			wx.playBackgroundAudio({
        position: position,
				success: res => listener.next(res),
				fail: res => listener.error(new Error(res.errMsg)),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
  return xs.create(producer)
}

audio.stop = () => {
  const producer = {
		start: listener => {
			wx.stopBackgroundAudio()
      listener.next(null) //just need a signal
      listener.complete()
		},
		stop: () => {}
	}
  return xs.create(producer)
}

audio.createContext = (audioId) => {
  const producer = {
		start: listener => {
			let ctx = wx.createAudioContext(audioId)
      listener.next(ctx)
      listener.complete()
		},
		stop: () => {}
	}
  return xs.create(producer)
}

audio.onPlay = (callback) => {
	const producer = {
		start: listener => {
			wx.onBackgroundAudioPlay(callback)
      listener.next(null)
		},
		stop: () => {}
	}
  return xs.create(producer)
}

audio.onPause = (callback) => {
	const producer = {
		start: listener => {
			wx.onBackgroundAudioPause(callback)
      listener.next(null)
		},
		stop: () => {}
	}
  return xs.create(producer)
}

audio.onStop = (callback) => {
	const producer = {
		start: listener => {
			wx.onBackgroundAudioStop(callback)
      listener.next(null)
		},
		stop: () => {}
	}
  return xs.create(producer)
}

module.exports = {
  audio: audio
}