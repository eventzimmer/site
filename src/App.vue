<template>
  <div id="app">
    <h3 class="mt-5">eventzimmer</h3>
    <p class="lead">Veranstaltungen im {{ month() }}</p>
    <events></events>
  </div>
</template>

<script>
import Events from '@/components/Events'
import { format } from 'date-fns'
import de from 'date-fns/locale/de'

export default {
  name: 'app',
  components: {
    Events
  },
  methods: {
    month () {
      return format(new Date(), 'MMMM', { locale: de })
    }
  }
}
</script>
