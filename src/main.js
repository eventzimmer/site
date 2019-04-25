import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
