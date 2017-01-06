import xs from '../lib/xstream/index'

let record = {}

record.start = () => {
	const producer = {
		start: listener => {
			wx.startRecord({
				success: res => listener.next(res),
				fail: res => listener.error(new Error(res.errMsg)),
				complete: () => listener.complete()
			})
		},
		stop: () => {}
	}
	return xs.create(producer)
}

record.stop = () => {
	const producer = {
		start: listener => {
			wx.stopRecord({
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
	record: record
}