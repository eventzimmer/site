import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VCalendar from 'v-calendar'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import store from './store'
import './registerServiceWorker'

import de from './assets/i18n/de.json'
import en from './assets/i18n/en.json'

Vue.use(VCalendar)
Vue.use(VueI18n)
Vue.use(VueCookies)
Vue.config.productionTip = false

const messages = {
  en: en,
  de: de
}

const i18n = new VueI18n({
  locale: VueCookies.get('lang', 'de'),
  messages,
})

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
