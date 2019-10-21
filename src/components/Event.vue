<template>
  <div class="card mb-2">
    <div class="card-body">
      <div class="row no-gutters">
        <div class="col-md-2">
          <h4 class="text-muted overflow-auto">{{ formatEventDate(event.starts_at) }}</h4>
          <hr class="visible-sm"/>
        </div>
        <div class="col-md-6">
          <h4 class="card-subtitle text-muted">{{ event.name }}</h4>
          <p>{{ distanceInWordsToNow(event.starts_at ) }}</p>
        </div>
        <div class="col-md-4">
          <h6>
            <span class="badge badge-pill badge-secondary d-inline-block text-truncate" style="max-width: 100%">{{ event.location.name }}</span>
          </h6>
          <span class="badge badge-pill badge-secondary mr-1 d-inline-block text-truncate" v-for="category in event.categories" :key="category">{{ category }}</span>
        </div>
      </div>
      <div v-if="!collapsed">
        <hr/>
        <span v-html="htmlDecode(event.description.substring(0, (collapsed) ? 30 : event.description.length))"></span>
      </div>
    </div>
    <div class="card-footer">
      <button type="button" v-if="event.description.length > max" class="btn btn-outline-secondary btn-sm" @click="collapsed = !collapsed">{{ $tc('msg.more_less', collapsed) }}</button>
      <a :href="event.url" class="btn btn-outline-secondary btn-sm ml-2" target="_blank" rel="noopener">{{ event.source.aggregator }}</a>
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
