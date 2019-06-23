<template>
  <div v-if="!loading">
    <p class="lead" v-if="$store.getters.currentMonthEvents.length">Veranstaltungen im {{ formatMonth(new Date()) }}</p>
    <event :event="event" v-for="event in $store.getters.currentMonthEvents" v-bind:key="event.url"></event>
    <p class="lead mt-3" v-if="$store.getters.nextMonthEvents.length">Veranstaltungen im {{ formatMonth(nextMonth()) }}</p>
    <event :event="event" v-for="event in $store.getters.nextMonthEvents" v-bind:key="event.url"></event>
  </div>
  <div v-else>
    <p class="lead">Die Seite schläft gerade noch 💤. Gib uns einen Moment um sie aufzuwecken.</p>
  </div>
</template>

<script>
import { addMonths, format } from 'date-fns'
import de from 'date-fns/locale/de'
import Event from '@/components/Event'

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
      return format(date, 'MMMM', { locale: de })
    }
  }
}
</script>
