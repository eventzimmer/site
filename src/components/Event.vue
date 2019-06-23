<template>
  <div class="card mb-1">
    <div class="card-body">
      <a :href="event.url" class="card-link" target="_blank" rel="noopener"><h6 class="card-subtitle mb-2 text-muted">{{ event.name }}
        <span class="badge badge-pill badge-secondary ml-1">{{ distanceInWordsToNow(event.starts_at) }}</span>
        <span class="badge badge-pill badge-secondary ml-1">{{ formatEventDate(event.starts_at) }}</span>
        <span class="badge badge-pill badge-secondary ml-1 text-truncate" style="max-width: 100%">{{ event.location.name }}</span>
      </h6></a>
      <span v-html="htmlDecode(event.description.substring(0, (collapsed) ? 200 : event.description.length))"></span>
      <button type="button" class="btn btn-outline-secondary btn-sm ml-1" @click="collapsed = !collapsed">{{ (collapsed) ? 'Mehr' : 'Weniger' }}</button>
    </div>
  </div>
</template>

<script>
import { format, distanceInWordsToNow } from 'date-fns'
import de from 'date-fns/locale/de'

export default {
  name: 'Event',
  data () {
    return {
      collapsed: true
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    htmlDecode (value) {
      return $('<div/>').html(value).text() // eslint-disable-line no-undef
    },
    distanceInWordsToNow (date) {
      return distanceInWordsToNow(date, { locale: de, addSuffix: true })
    },
    formatEventDate (date) {
      return format(date, 'DD MMMM HH:mm', { locale: de })
    }
  }
}
</script>
