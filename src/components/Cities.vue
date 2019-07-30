<template>
  <select class="custom-select" v-model="city" id="citySelect" :disabled="loading">
    <label for="citySelect">Städte</label>
    <option v-for="city in cities" :value="city.name" v-bind:key="city.name">{{ city.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'Cities',
  data () {
    return {
      loading: false,
      cities: [
        {
          name: 'Tübingen',
          latitude: 48.52,
          longitude: 9.05556
        },
        {
          name: 'Kirchheim unter Teck',
          latitude: 48.6480545,
          longitude: 9.4510227
        },
        {
          name: 'Stuttgart',
          latitude: 48.7784485,
          longitude: 9.1800132
        },
        {
          name: 'Balingen',
          latitude: 48.2737512,
          longitude: 8.8557862
        }
      ]
    }
  },
  computed: {
    city: {
      get () {
        return this.$store.state.location.name
      },
      set (cityName) {
        let vm = this
        let location = vm.cities.find((c) => c.name === cityName)
        vm.loading = true
        vm.$store.commit('changeLocation', location)
        vm.$store.dispatch('fetchEvents')
          .then(() => {
            vm.loading = false
          }).catch((err) => {
            console.error(err)
            vm.loading = false
          })
      }
    }
  }
}
</script>
