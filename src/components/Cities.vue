<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-sm"></div>
    <div class="col-sm-2">
      <select class="custom-select" v-model="city" id="inlineFormCustomSelect">
        <option v-for="city in cities" :value="city.name" v-bind:key="city.name">{{ city.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cities',
  data () {
    return {
      city: 'Tübingen',
      cities: [
        {
          name: 'Tübingen',
          latitude: 48.52,
          longitude: 9.05556
        },
        {
          name: 'Reutlingen',
          latitude: 48.4919508,
          longitude: 9.2114144
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
  watch: {
    city (cityName) {
      let location = this.cities.find((c) => c.name === cityName)
      this.$store.commit('changeLocation', location)
      this.$store.dispatch('fetchEvents')
        .then(() => console.debug(`Fetched events for city ${cityName}`))
    }
  }
}
</script>
