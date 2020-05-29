Page({
  data: {
    list: [{
        id: 1,
        text: '第1个番茄',
        completed: true
      },
      {
        id: 2,
        text: '第2个番茄',
        completed: true
      },
      {
        id: 3,
        text: '第3个番茄',
        completed: true
      },
      {
        id: 4,
        text: '第4个番茄',
        completed: true
      },
      {
        id: 5,
        text: '第5个番茄',
        completed: false
      },
      {
        id: 6,
        text: '第6个番茄',
        completed: false
      },
      {
        id: 7,
        text: '第7个番茄',
        completed: true
      },
      {
        id: 8,
        text: '第8个番茄',
        completed: false
      },
      {
        id: 9,
        text: '第9个番茄',
        completed: false
      },
      {
        id: 10,
        text: '第10个番茄',
        completed: true
      },
    ],
    promptVisible: false,
  },
  confirmCreate(event) {
    let content = event.detail;
    if (content) {
      let todo = [{
        id: this.data.list.length + 1,
        text: content,
        completed: false
      }]
      this.data.list = todo.concat(this.data.list)
      this.setData({
        list: this.data.list
      })
    }
    this.hidePrompt()
  },
  hidePrompt(event) {
    this.setData({
      promptVisible: false
    })
  },
  showPrompt() {
    this.setData({
      promptVisible: true
    })
  }
})