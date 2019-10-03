import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { getMonth, addMonths, getDate } from 'date-fns'

Vue.use(Vuex)

const PAST_HOUR_LIMIT = 3 // How many hours in the past would we like to include on the current day. In the future this may additionally depend on the length of the event.
const ENDPOINT = (process.env.VUE_APP_ENDPOINT !== undefined) ? process.env.VUE_APP_ENDPOINT : 'http://localhost:3000'

const LOCATIONS_ANNOTATED = require('@/assets/locations_annotated.json')
const CATEGORIES_PER_LOCATION = LOCATIONS_ANNOTATED
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

const selection = {
  state: {
    categories: [],
    start: null,
    end: null,
    language: 'de'
  },
  getters: {
    range (state) {
      return (state.start !== null) ? {
        start: new Date(state.start),
        end: new Date(state.end)
      } : null
    }
  },
  mutations: {
    changeCategories (state, categories) {
      state.categories = categories
    },
    changeRange (state, range) {
      if (range !== null) {
        state.start = range.start.toISOString()
        state.end = range.end.toISOString()
      } else {
        state.start = state.end = null
      }
    },
    changeLanguage (state, language) {
      state.language = language
    }
  }
}

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
    changeEvents (state, events) {
      state.events = events
    },
    changeLocation (state, location) {
      state.location = location
    }
  },
  actions: {
    fetchEvents (context) {
      // eslint-disable-next-line no-undef
      return fetch(`${ENDPOINT}/rpc/events_by_radius?${new URLSearchParams({
        latitude: context.state.location.latitude,
        longitude: context.state.location.longitude,
        select: 'name,url,description,created_at,starts_at,location(*),source(*)',
        order: 'starts_at'
      })}`, {
        'Content-Type': 'application/json'
      }).then((response) => response.json())
        .then((events) => context.commit('changeEvents', events))
        .catch((err) => {
          throw err
        })
    }
  },
  getters: {
    nextMonthEvents (state, getters) {
      const nextMonth = getMonth(addMonths(new Date(), 1))
      return getters.eventsBySelectedCategories.filter((e) => getMonth(e.starts_at) === nextMonth)
    },
    currentMonthEvents (state, getters) {
      const today = new Date()
      const currentDay = getDate(today)
      const currentMonth = getMonth(today)
      return getters.eventsBySelectedCategories.filter((e) => (getMonth(e.starts_at) === currentMonth) && (getDate(e.starts_at) >= currentDay) && ((getDate(e.starts_at) === currentDay) ? (today.getHours() - e.starts_at.getHours() <= PAST_HOUR_LIMIT) : true))
    },
    eventsBySelectedCategories (state, getters) {
      if (state.selection.categories.length) {
        return getters.eventsWithCategories.filter((e) => e.categories.some((c) => state.selection.categories.includes(c)))
      } else {
        return getters.eventsWithCategories
      }
    },
    eventsByRange (state, getters) {
      return (state.selection.start !== null) ? getters.events.filter((e) => (e.starts_at >= getters.range.start) && (e.starts_at <= getters.range.end)) : getters.events
    },
    eventsWithCategories (state, getters) {
      return getters.eventsByRange.map((event) => {
        event.categories = CATEGORIES_PER_LOCATION[event.location.name]
        return event
      })
    },
    events (state) {
      return state.events.map((e) => {
        e.starts_at = new Date(e.starts_at)
        return e
      })
    },
    categories () {
      return new Set(Object.values(CATEGORIES_PER_LOCATION).reduce((acc, val) => acc.concat(val), [])) // NOTE: This can be replaced with Array.flat
    }
  },
  modules: {
    selection: selection
  },
  plugins: [
    createPersistedState({
      key: 'eventzimmer',
      paths: ['location', 'selection'],
      filter: (mutation) => !['changeEvents'].includes(mutation.type)
    })
  ]
})
