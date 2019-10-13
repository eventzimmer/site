const selection = {
  state: {
  categories: [],
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

export default selection;