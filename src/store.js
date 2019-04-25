import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const ENDPOINT = (process.env.VUE_APP_ENDPOINT !== undefined) ? process.env.VUE_APP_ENDPOINT : 'http://localhost:8080/v1'

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
      fetch(`${ENDPOINT}/events`)
        .then((events) => context.commit('addEvents', events))
        .catch((err) => console.error(err))
    }
  }
})
