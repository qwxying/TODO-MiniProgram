Page({
  timer: null,
  data: {
    defaultSeconds: 3,
    time: ""
  },
  onShow: function () {
    this.countDownTimer()

  },
  formatTime() {
    let minutes = Math.floor(this.data.defaultSeconds / 60)
    let seconds = Math.floor(this.data.defaultSeconds % 60)
    if (seconds === 0) {
      seconds = "00"
    }
    if ((seconds + "").length === 1) {
      seconds = "0" + seconds
    }
    if ((minutes + "").length === 1) {
      minutes = "0" + minutes
    }
    this.setData({
      time: `${minutes}:${seconds}`
    })
  },
  countDownTimer() {
    this.formatTime()
    this.timer = setInterval(() => {
      if (this.data.defaultSeconds === 0) {
        console.log(this.data.defaultSeconds)
        return this.clearTimer()
      }
      this.data.defaultSeconds -= 1
      this.formatTime()
    }, 1000)
  },
  clearTimer() {
    clearInterval(this.timer)
    this.timer = null
  }
})