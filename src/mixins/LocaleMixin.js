import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en'

export default {
  data () {
    return {
      dateLocales: {
        de,
        en,
      }
    }
  },
  methods: {
    dateLocale () {
      return this.dateLocales[this.$store.state.selection.language]
    }
  },
  mounted () {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'changeLanguage') {
        this.$forceUpdate()
      }
    })
  }
}
