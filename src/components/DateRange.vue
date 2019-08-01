<template>
  <div class="input-group d-flex justify-content-end">
      <v-date-picker
        :min-date="new Date()"
        :max-date="maxDate"
        mode="range"
        v-model="range"
        class="w-50"
      >
      <!--Custom Input Slot-->
      <input
        slot-scope="{ inputProps, inputEvents }"
        id="date-range"
        class="custom-select"
        v-bind="inputProps"
        v-on="inputEvents"
      >
      </v-date-picker>
    <div class="input-group-append">
        <label class="input-group-text" for="date-range" @click="$store.commit('changeRange', null)"><i class="fas fa-undo"></i></label>
      </div>
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
        return this.$store.state.selection.range
      },
      set (range) {
        this.$store.commit('changeRange', range)
      }
    }
  }
}
</script>
