import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App, { props: { msg: 'hello world!', num: 123 } })
})