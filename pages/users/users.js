import http from '../../lib/http.js'
import day from '../../lib/dayjs.js'
let tomatoHistory, hashArray, hash = {}

Page({
  data: {
    tomatoes: {}
  },
  onShow() {
    http.get('/tomatoes').then(response => {
      tomatoHistory = response.data.resources
      tomatoHistory.map(r => {
        let key = day(r.created_at).format('YYYY年MM月DD日');
        r['time'] = day(r.created_at).format('HH:mm');
        if (!(key in hash)) {
          hash[key] = [];
        }
        hash[key].push(r);
      });
      hashArray = Object.entries(hash).sort((a, b) => {
        if (a[0] === b[0]) return 0;
        if (a[0] > b[0]) return -1;
        if (a[0] < b[0]) return 1;
        return 0;
      });
      this.setData({
        tomatoes: hashArray
      })
    })
  }
})