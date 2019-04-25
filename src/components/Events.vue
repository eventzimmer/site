<template>
  <div></div>
</template>

<script>
export default {
  name: 'Events.vue',
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    let vm = this
    vm.$store.dispatch('fetchEvents').then(() => {
      vm.loading = false
    })
  }
}
</script>

<style scoped>

</style>
