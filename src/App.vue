<template>
  <div id="app">
    <h3 class="mt-5">eventzimmer</h3>
    <events></events>
  </div>
</template>

<script>
import Events from '@/components/Events'

export default {
  name: 'app',
  components: {
    Events
  }
}
</script>
