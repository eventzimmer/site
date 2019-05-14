<template>
  <div id="app">
    <h3 class="mt-5">eventzimmer</h3>
    <cities></cities>
    <events></events>
  </div>
</template>

<script>
import Events from '@/components/Events'
import Cities from '@/components/Cities'

export default {
  name: 'app',
  components: {
    Events,
    Cities
  }
}
</script>
