import Vue from 'vue'
import VCalendar from 'v-calendar'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

Vue.use(VCalendar)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
