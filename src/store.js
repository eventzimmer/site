import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { getMonth, setMonth, addMonths, addDays, getDate, compareAsc } from 'date-fns'

Vue.use(Vuex)

const PAST_HOUR_LIMIT = 3 // How many hours in the past would we like to include on the current day. In the future this may additionally depend on the length of the event.
const ENDPOINT = (process.env.VUE_APP_ENDPOINT !== undefined) ? process.env.VUE_APP_ENDPOINT : 'http://localhost:8080/v1'

const LOCATIONS_ANNOTATED = require('@/assets/locations_annotated.json')
const TAGS_PER_LOCATION = LOCATIONS_ANNOTATED
  .map((location) => {
    return {
      name: location.name,
      tags: location.tags.split(',').filter((part) => part.length)
    }
  })
  .reduce((accumulator, location) => {
    accumulator[location.name] = location.tags
    return accumulator
  }, {})

export default new Vuex.Store({
  state: {
    selection: {
      categories: []
    },
    location: {
      name: 'Tübingen',
      latitude: 48.52,
      longitude: 9.05556
    },
    events: []
  },
  mutations: {
    changeEvents (state, events) {
      state.events = events
    },
    changeLocation (state, location) {
      state.location = location
    }
  },
  actions: {
    fetchEvents (context) {
      if (typeof webpackHotUpdate !== 'undefined') { // eslint-disable-line no-undef
        let today = new Date()
        let currentDay = getDate(today)
        let currentMonth = getMonth(today)
        return fetch(`${ENDPOINT}/events`, {
          headers: {
            Latitude: context.state.location.latitude,
            Longitude: context.state.location.longitude
          }
        })
          .then((response) => response.json())
          .then((events) => events.map((e) => {
            e.starts_at = new Date(e.starts_at)
            e.starts_at = setMonth(e.starts_at, currentMonth)
            e.starts_at = addDays(e.starts_at, currentDay)
            e.starts_at = e.starts_at.toISOString()
            return e
          }))
          .then((events) => context.commit('changeEvents', events))
          .catch((err) => {
            throw err
          })
      } else {
        return fetch(`${ENDPOINT}/events`, {
          headers: {
            Latitude: context.state.location.latitude,
            Longitude: context.state.location.longitude
          }
        })
          .then((response) => response.json())
          .then((events) => context.commit('changeEvents', events))
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
      let currentDay = getDate(today)
      let currentMonth = getMonth(today)
      return getters.events.filter((e) => (getMonth(e.starts_at) === currentMonth) && (getDate(e.starts_at) >= currentDay) && ((getDate(e.starts_at) === currentDay) ? (today.getHours() - e.starts_at.getHours() <= PAST_HOUR_LIMIT) : true))
    },
    locations () {
      return new Set(Object.values(TAGS_PER_LOCATION).reduce((acc, val) => acc.concat(val), []))
    },
    annotatedEvents (state, getters) {
      return getters.events.map((event) => {
        event.tags = TAGS_PER_LOCATION[event.location.name]
        return event
      })
    },
    events (state) {
      let events = state.events.map((e) => {
        e.starts_at = new Date(e.starts_at)
        return e
      })
      return events.sort((a, b) => compareAsc(a.starts_at, b.starts_at))
    }
  },
  plugins: [
    createPersistedState({
      key: 'eventzimmer',
      paths: ['location'],
      filter: (mutation) => !['changeEvents'].includes(mutation.type)
    })
  ]
})
