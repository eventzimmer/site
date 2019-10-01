import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VCalendar from 'v-calendar'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

Vue.use(VCalendar)
Vue.use(VueI18n)
Vue.config.productionTip = false

const messages = {
  en: {
    msg: {
      page_wakeup: 'Page is still sleeping 💤. Give us a moment to wake up.',
	  events_in: 'Events in',
	  cities: 'Cities',
	  select_categories: 'Select categories',
	  categories: 'Categories',
	  more_less: 'More | Less',
	  timespan: 'Set time span'
    }
  },
  de: {
    msg: {
      page_wakeup: 'Die Seite schläft gerade noch 💤. Gib uns einen Moment um sie aufzuwecken.',
	  events_in: 'Veranstaltungen im',
	  cities: 'Städte',
	  select_categories: 'Kategorie(n) auswählen',
	  categories: 'Kategorien',
	  more_less: 'Mehr | Weniger',
	  timespan: 'Zeitraum wählen'
    }
  }
}

const i18n = new VueI18n({
  locale: 'de',
  messages,
})

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
