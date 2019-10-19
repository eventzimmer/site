<template>
  <div class="card mb-1" :key="$store.state.selection.locale">
    <div class="card-body">
      <a :href="event.url" class="card-link" target="_blank" rel="noopener">
        <h6 class="card-subtitle mb-1 text-muted">
          {{ event.name }}
        </h6>
        <span class="badge badge-pill badge-secondary ml-1 overflow-auto">{{ distanceInWordsToNow(event.starts_at) }}</span>
        <span class="badge badge-pill badge-secondary ml-1 overflow-auto">{{ formatEventDate(event.starts_at) }}</span>
        <span class="badge badge-pill badge-secondary ml-1 d-inline-block text-truncate" style="max-width: 50%">{{ event.location.name }}</span>
        <span class="badge badge-pill badge-secondary ml-1 overflow-auto" v-if="event.categories.length === 1">{{ event.categories[0] }}</span>
        <br/>
      </a>
      <span v-html="htmlDecode(event.description.substring(0, (collapsed) ? 100 : event.description.length))"></span>
      <button type="button" v-if="event.description.length > max" class="btn btn-outline-secondary btn-sm ml-1" @click="collapsed = !collapsed">{{ $tc('msg.more_less', collapsed) }}</button>
    </div>
  </div>
</template>

<script>
import { format, distanceInWordsToNow } from 'date-fns'
import LocaleMixin from '@/mixins/LocaleMixin'

export default {
  name: 'Event',
  mixins: [ LocaleMixin ],
  data () {
    return {
      collapsed: true
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    max: {
      type: Number,
      default: 200
    }
  },
  methods: {
    htmlDecode (value) {
      return $('<div/>').html(value).text() // eslint-disable-line no-undef
    },
    distanceInWordsToNow (date) {
      const locale = this.dateLocale()
      return distanceInWordsToNow(date, { locale: locale, addSuffix: true })
    },
    formatEventDate (date) {
      const locale = this.dateLocale()
      return format(date, 'DD MMMM HH:mm', { locale: locale })
    }
  }
}
</script>
