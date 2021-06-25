import dayjs from 'dayjs'
import Vue from 'vue'
var relativeTime = require('dayjs/plugin/relativeTime')

dayjs.locale('zh-cn') 

dayjs.extend(relativeTime)
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})