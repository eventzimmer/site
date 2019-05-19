<template>
  <div v-if="!loading">
    <p class="lead" v-if="$store.getters.currentMonthEvents.length">Veranstaltungen im {{ formatMonth(currentMonth()) }}</p>
    <div class="card mb-1" v-for="event in $store.getters.currentMonthEvents" v-bind:key="event.url">
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted" @click="openEventInTab(event.url)">{{ event.name }}
          <span class="badge badge-pill badge-secondary ml-1">{{ formatEventDate(event.starts_at) }}</span>
          <span class="badge badge-pill badge-secondary ml-1">{{ event.location.name }}</span>
        </h6>
        <truncate :text="htmlDecode(event.description)" clamp="Mehr" less="Weniger!"></truncate>
      </div>
    </div>
    <p class="lead mt-3" v-if="$store.getters.nextMonthEvents.length">Veranstaltungen im {{ formatMonth(nextMonth()) }}</p>
    <div class="card mb-1" v-for="event in $store.getters.nextMonthEvents" v-bind:key="event.url">
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted" @click="openEventInTab(event.url)">{{ event.name }} am {{ formatEventDate(event.starts_at) }} ({{ event.location.name }})</h6>
        <truncate :text="htmlDecode(event.description)" clamp="Mehr" less="Weniger!"></truncate>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="lead">Die Seite schläft gerade noch 💤. Gib uns einen Moment um sie aufzuwecken.</p>
  </div>
</template>

<script>
import truncate from 'vue-truncate-collapsed'
import { format, addMonths } from 'date-fns'
import de from 'date-fns/locale/de'

export default {
  name: 'Events',
  components: {
    truncate
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
    htmlDecode (value) {
      return $('<div/>').html(value).text() // eslint-disable-line no-undef
    },
    formatMonth (date) {
      return format(date, 'MMMM', { locale: de })
    },
    nextMonth () {
      return addMonths(new Date(), 1)
    },
    currentMonth () {
      return new Date()
    },
    openEventInTab (url) {
      window.open(url, '_blank')
    },
    formatEventDate (date) {
      return format(date, 'DD MMMM HH:mm', { locale: de })
    }
  }
}
</script>

<style scoped>
.card-subtitle {
  cursor: pointer;
}
</style>
