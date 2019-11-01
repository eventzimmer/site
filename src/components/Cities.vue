<template>
  <div class="d-flex">
    <select class="custom-select" v-model="city" id="citySelect" :disabled="loading">
      <label for="citySelect">{{ $t("msg.cities") }}</label>
      <option v-for="city in cities" :value="city.name" v-bind:key="city.name">{{ city.name }}</option>
    </select>
    <button class="btn btn-secondary" @click="locateCity"><i class="fas fa-compass"></i></button>
  </div>
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
  methods: {
    async locateCity () {
      const getPosition = (options) => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options)
        })
      }

      try {
        const position = await getPosition()
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${new URLSearchParams({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          format: 'json'
        }).toString()}`)
        const geocoding = await response.json()
        this.cities.push({
          name: geocoding.address.town || geocoding.address.village,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        this.city = geocoding.address.town || geocoding.address.village
      } catch (err) {
        console.error(err)
      }
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
