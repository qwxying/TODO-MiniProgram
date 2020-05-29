Component({
  properties: {
    placeholder: {
      type: String,
      value: ""
    },
    visible: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ""
    }
  },
  data: {
    content: ''
  },
  methods: {
    confirm() {
      this.triggerEvent("confirm", this.data.content)
    },
    cancel() {
      this.triggerEvent("cancel", this.data.content)
    },
    watchContent(event) {
      this.data.content = event.detail.value
    }
  },



})