import http from '../../lib/http.js'
Page({
  timer: null,
  seconds: null,
  defaultSeconds: 5,

  data: {
    time: "",
    tomatoes: {},
    timerStatus: 'beforeStart' || 'started' || 'paused' || 'completed' || 'abandoned',
    abandonTapped: false,
    tomatoCompleted: false
  },

  onShow: function () {
    this.render()
  },
  render() {
    if (this.data.timerStatus === 'beforeStart' || 'abandoned' || 'completed')
      this.setData({
        time: this.formatTime(this.defaultSeconds)
      })
    else this.setData({
      time: this.formatTime(this.seconds)
    })
  },

  formatTime(sec) {
    let minute = Math.floor(sec / 60)
    let second = Math.floor(sec % 60)
    if (second === 0) {
      second = "00"
    }
    if ((second + "").length === 1) {
      second = "0" + second
    }
    if ((minute + "").length === 1) {
      minute = "0" + minute
    }
    return `${minute}:${second}`
  },

  continueTimer() {
    this.setData({
      timerStatus: 'started'
    })
    this.setData({
      time: this.formatTime(this.seconds)
    })
    this.timer = setInterval(() => {
      this.seconds -= 1
      this.setData({
        time: this.formatTime(this.seconds)
      })
      if (this.seconds <= 0) {
        return this.endTimer()
      }
    }, 1000)
  },
  startTimer() {
    this.seconds = this.defaultSeconds
    wx.vibrateLong()
    http.post('/tomatoes').then(response => {
      this.setData({
        tomatoes: response.data.resource
      })
    })
    this.continueTimer()
  },
  pauseTimer() {
    clearInterval(this.timer)
    this.timer = null
    this.setData({
      timerStatus: 'paused'
    })
  },
  endTimer() {
    wx.vibrateLong()
    clearInterval(this.timer)
    this.timer = null
    this.setData({
      tomatoCompleted: true
    })
  },
  abandonTomato() {
    this.pauseTimer()
    this.setData({
      abandonTapped: true
    })
  },
  confirmAbandon(event) {
    let content
    if (event.detail.replace(/(^\s*)|(\s*$)/g, "").length === 0) content = '放弃番茄'
    else content = event.detail
    http.put(`/tomatoes/${this.data.tomatoes.id}`, {
      description: content,
      aborted: true
    })
    this.setData({
      abandonTapped: false,
      timerStatus: 'abandoned',
      time: this.formatTime(this.defaultSeconds)
    })
  },
  cancelAbandon() {
    this.setData({
      abandonTapped: false,
    })
    this.continueTimer()
  },
  confirmCompleted(event) {
    let content
    if (event.detail.replace(/(^\s*)|(\s*$)/g, "").length === 0) content = '完成番茄'
    else content = event.detail
    http.put(`/tomatoes/${this.data.tomatoes.id}`, {
      description: content,
    })
    this.setData({
      tomatoCompleted: false,
      timerStatus: 'completed',
      time: this.formatTime(this.defaultSeconds)
    })
  },
  cancelCompleted() {
    this.setData({
      tomatoCompleted: false,
      timerStatus: 'abandoned',
      time: this.formatTime(this.defaultSeconds)
    })
  }
})