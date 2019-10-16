import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VCalendar from 'v-calendar'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

import de from './assets/i18n/de.json'
import en from './assets/i18n/en.json'

Vue.use(VCalendar)
Vue.use(VueI18n)
Vue.config.productionTip = false
const i18n = new VueI18n({
  locale: store.state.selection.language ? store.state.selection.language : navigator.language.substring(0, 2) || 'de',
  fallbackLocale: 'en',
  messages: {
    en,
    de,
  }
})

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
