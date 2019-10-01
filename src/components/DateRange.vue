<template>
  <div class="d-flex">
      <v-date-picker
        :min-date="new Date()"
        :max-date="maxDate"
        mode="range"
        v-model="range"
        class="w-100"
      >
      <!--Custom Input Slot-->
      <input
        slot-scope="{ inputProps, inputEvents }"
        id="date-range"
        class="custom-select"
        v-bind="inputProps"
        v-on="inputEvents"
        :placeholder="$t('msg.timespan')"
        readonly
      >
      </v-date-picker>
      <button type="button" class="btn btn-secondary" @click="range = null"><i class="fas fa-undo"></i></button>
  </div>
</template>

<script>
import { addMonths } from 'date-fns'

export default {
  name: 'DateRange',
  data () {
    return {
      maxDate: addMonths(new Date(), 2)
    }
  },
  computed: {
    range: {
      get () {
        return this.$store.getters.range
      },
      set (range) {
        this.$store.commit('changeRange', range)
      }
    }
  }
}
</script>
