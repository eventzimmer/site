<template>
  <div class="card mb-2">
    <div class="card-body">
      <div class="row no-gutters">
        <div class="col-md-2">
          <h4 class="text-muted overflow-auto">{{ formatEventDate(event.starts_at) }}</h4>
          <hr class="d-md-none"/>
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
      <button type="button" v-if="event.description.length > max" class="btn btn-outline-secondary btn-sm mr-2" @click="readMore()">{{ $tc('msg.more_less', collapsed) }}</button>
      <a :href="event.url" class="btn btn-outline-secondary btn-sm mr-2" @click="trackExternalLink()" target="_blank" rel="noopener">{{ event.source.aggregator }}</a>
      <button type="button" v-bind:class="['btn', ($store.getters.bookmarks.has(event.url)) ? 'btn-secondary' : 'btn-outline-secondary', 'btn-sm']" @click="bookmark()"><i v-bind:class="[ ($store.getters.bookmarks.has(event.url)) ? 'fas fa-bookmark' : 'far fa-bookmark' ]"></i></button>
    </div>
  </div>
</template>

<script>
import { format, distanceInWordsToNow } from 'date-fns'
import LocaleMixin from '@/mixins/LocaleMixin'
import { track } from 'insights-js'

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
    trackExternalLink () {
      track({
        id: 'external-link',
        parameters: {
          source: this.event.source.url,
          url: this.event.url
        }
      })
    },
    bookmark() {
      this.$store.commit('bookmarkEvent', this.event.url)
      track({
        id: 'bookmark',
        parameters: {
          bookmarked: !this.$store.getters.has(this.event.url),
          url: this.event.url
        }
      })
    },
    readMore () {
      this.collapsed = !this.collapsed
      track({
        id: 'read-more',
        parameters: {
          collapsed: this.collapsed,
          url: this.event.url
        }
      })
    },
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
