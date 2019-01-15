import Vue from 'vue'
import App from './App.vue'

import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/github.css'

/**
 * Import datepicker and define component
 */
import VuePersianDatetimePicker from './picker/VuePersianDatetimePicker.vue'

import Card from './components/card.vue'

/*
 * Use Vue Highlight.js
 */
Vue.use(VueHighlightJS)

/**
 * Define some global variables
 */
Vue.use({
  install (Vue, options) {
    Vue.prototype.$prefix = 'vpd-' // shorted to reduce the css size
  }
})
Vue.component('date-picker', VuePersianDatetimePicker)
Vue.component('card', Card)

Vue.config.ignoredElements = [
  'date-picker'
]

new Vue({
  el: '#app',
  render: h => h(App)
})
