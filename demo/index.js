import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BlockDemo from './components/BlockDemo.vue'
import 'highlight.js/styles/atom-one-dark.css'

import * as spriteWorkflow from '../src'

Vue.config.productionTip = false

Vue.component('block-demo', BlockDemo)

window.spriteWorkflow = spriteWorkflow

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
