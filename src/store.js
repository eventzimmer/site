import Vue from 'vue'
import Vuex from 'vuex'

import { getMonth, setMonth, addMonths } from 'date-fns'

Vue.use(Vuex)

const ENDPOINT = (process.env.VUE_APP_ENDPOINT !== undefined) ? process.env.VUE_APP_ENDPOINT : 'http://localhost:8080/v1'
const FIXTURE_EVENTS = require('@/assets/events.json')

export default new Vuex.Store({
  state: {
    location: {
      name: 'Tübingen',
      latitude: 48.52,
      longitude: 9.05556
    },
    events: []
  },
  mutations: {
    addEvents (state, events) {
      state.events = events
    },
    changeLocation (state, location) {
      state.location = location
    }
  },
  actions: {
    fetchEvents (context) {
      if (typeof webpackHotUpdate !== 'undefined') { // eslint-disable-line no-undef
        let currentMonth = getMonth(new Date())
        let updatedFixtures = FIXTURE_EVENTS.map((e) => {
          e.starts_at = new Date(e.starts_at)
          e.starts_at = setMonth(e.starts_at, currentMonth)
          e.starts_at = e.starts_at.toISOString()
          return e
        })
        return Promise.resolve(context.commit('addEvents', updatedFixtures))
      } else {
        return fetch(`${ENDPOINT}/events`, {
          headers: {
            Latitude: context.state.location.latitude,
            Longitude: context.state.location.longitude
          }
        })
          .then((response) => response.json())
          .then((events) => context.commit('addEvents', events))
          .catch((err) => {
            throw err
          })
      }
    }
  },
  getters: {
    nextMonthEvents (state, getters) {
      let nextMonth = getMonth(addMonths(new Date(), 1))
      return getters.events.filter((e) => getMonth(e.starts_at) === nextMonth)
    },
    currentMonthEvents (state, getters) {
      let today = new Date()
      let currentMonth = getMonth(today)
      return getters.events.filter((e) => (getMonth(e.starts_at) === currentMonth) && (e.starts_at >= today))
    },
    events (state) {
      let events = state.events.map((e) => {
        e.starts_at = new Date(e.starts_at)
        return e
      })
      return events.sort((a, b) => {
        if (a.starts_at < b.starts_at) {
          return -1
        } else if (a.starts_at > b.starts_at) {
          return 1
        } else {
          return 0
        }
      })
    }
  }
})
