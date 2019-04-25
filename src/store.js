import Vue from 'vue'
import Vuex from 'vuex'

import { getMonth } from 'date-fns'

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
    }
  },
  actions: {
    fetchEvents (context) {
      if (typeof webpackHotUpdate !== 'undefined') { // eslint-disable-line no-undef
        return context.commit('addEvents', FIXTURE_EVENTS)
      } else {
        return fetch(`${ENDPOINT}/events`)
          .then((events) => context.commit('addEvents', events))
          .catch((err) => console.error(err))
      }
    }
  },
  getters: {
    events (state) {
      let currentMonth = getMonth(new Date())
      let events = state.events.map((e) => {
        e.starts_at = new Date(e.starts_at)
        return e
      })
      return events.filter((e) => getMonth(e.starts_at) === currentMonth).sort((a, b) => {
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
