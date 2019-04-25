import Vue from 'vue'
import Vuex from 'vuex'

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
      if (webpackHotUpdate) { // eslint-disable-line no-undef
        context.commit('addEvents', FIXTURE_EVENTS)
      } else {
        fetch(`${ENDPOINT}/events`)
          .then((events) => context.commit('addEvents', events))
          .catch((err) => console.error(err))
      }
    }
  }
})
