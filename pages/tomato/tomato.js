Page({
  timer: null,
  seconds: null,
  defaultSeconds: 5,

  data: {
    time: "",
    timerStatus: 'beforeStart' || 'started' || 'paused' || 'completed' || 'abandoned',
    abandonTapped: false,
    tomatoCompleted: false
  },

  onShow: function () {
    setInterval(() => {
      console.log(this.data.timerStatus)
    }, 1000)
    if (this.data.timerStatus === 'beforeStart')
      this.setData({
        time: this.formatTime(this.defaultSeconds)
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
      if (this.seconds === 0) {
        return this.endTimer()
      }
    }, 1000)
  },
  startTimer() {
    this.seconds = this.defaultSeconds
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
  confirmAbandon() {
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
  confirmCompleted() {
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