<template>
  <div v-if="!loading">
    <p class="lead" v-if="$store.getters.currentMonthEvents.length">Veranstaltungen im {{ currentMonth() }}</p>
    <div class="card mb-1" v-for="event in $store.getters.currentMonthEvents" v-bind:key="event.url">
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted" @click="openEventInTab(event.url)">{{ event.name }} am {{ formatEventDate(event.starts_at) }} ({{ event.location.name }})</h6>
        <truncate :text="event.description" clamp="Mehr" less="Weniger!"></truncate>
      </div>
    </div>
    <p class="lead" v-if="$store.getters.nextMonthEvents.length">Veranstaltungen im {{ nextMonth() }}</p>
    <div class="card mb-1" v-for="event in $store.getters.nextMonthEvents" v-bind:key="event.url">
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted" @click="openEventInTab(event.url)">{{ event.name }} am {{ formatEventDate(event.starts_at) }} ({{ event.location.name }})</h6>
        <truncate :text="event.description" clamp="Mehr" less="Weniger!"></truncate>
      </div>
    </div>
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
    formatMonth (date) {
      return format(date, 'MMMM', { locale: de })
    },
    nextMonth () {
      return this.formatMonth(addMonths(new Date(), 1))
    },
    currentMonth () {
      return this.formatMonth(new Date())
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
