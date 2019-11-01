const selection = {
  state: {
    categories: [],
    bookmarks: [],
    cities: [],
    start: null,
    end: null,
    language: null
  },
  getters: {
    range (state) {
      return (state.start !== null) ? {
        start: new Date(state.start),
        end: new Date(state.end)
      } : null
    },
    bookmarks (state) {
      return new Set(state.bookmarks)
    }
  },
  mutations: {
    bookmarkEvent(state, url) {
      let bookmark = state.bookmarks.indexOf(url)
      if (bookmark !== -1) {
        state.bookmarks.splice(bookmark, 1)
      } else {
        state.bookmarks.push(url)
      }
    },
    addCity (state, city) {
      if (state.cities.findIndex((c) => c.name === city.name) === -1) {
        state.cities.push(city)
      }
    },
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
  },
}

export default selection;
