<template>
  <div v-if="!loading">
    <h3 class="lead" v-if="$store.getters.currentMonthEvents.length">{{ $t("msg.events_in") }} {{ formatMonth(new Date()) }}</h3>
    <event :event="event" v-for="event in $store.getters.currentMonthEvents" v-bind:key="event.url"></event>
    <h3 class="lead mt-3" v-if="$store.getters.nextMonthEvents.length">{{ $t("msg.events_in") }} {{ formatMonth(nextMonth()) }}</h3>
    <event :event="event" v-for="event in $store.getters.nextMonthEvents" v-bind:key="event.url"></event>
  </div>
  <div v-else>
    <p class="lead">{{ $t("msg.page_wakeup") }}</p>
  </div>
</template>

<script>
import { addMonths, format } from 'date-fns'
import Event from '@/components/Event'
import LocaleMixin from '@/mixins/LocaleMixin'


export default {
  name: 'Events',
  mixins: [ LocaleMixin ],
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
      const locale = this.dateLocale()
      return format(date, 'MMMM', { locale: locale })
    }
  }
}
</script>
