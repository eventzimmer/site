<template>
  <div v-if="!loading">
    <p class="lead" v-if="$store.getters.currentMonthEvents.length">{{ $t("msg.events_in") }} {{ formatMonth(new Date()) }}</p>
    <event :event="event" v-for="event in $store.getters.currentMonthEvents" v-bind:key="event.url"></event>
    <p class="lead mt-3" v-if="$store.getters.nextMonthEvents.length">{{ $t("msg.events_in") }} {{ formatMonth(nextMonth()) }}</p>
    <event :event="event" v-for="event in $store.getters.nextMonthEvents" v-bind:key="event.url"></event>
  </div>
  <div v-else>
    <p class="lead">{{ $t("msg.page_wakeup") }}</p>
  </div>
</template>

<script>
import { addMonths, format } from 'date-fns'
import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en'
import Event from '@/components/Event'

window.locales = {
	de,
	en
}

export default {
  name: 'Events',
  components: {
    Event
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    let vm = this
    vm.$store.dispatch('fetchEvents').then(() => {
      vm.loading = false
    })
  },
  methods: {
    nextMonth () {
      return addMonths(new Date(), 1)
    },
    formatMonth (date) {
      return format(date, 'MMMM', { locale: window.locales[this.$i18n.locale] })
    }
  }
}
</script>
