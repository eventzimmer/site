<template>
  <div id="app d-flex flex-column h-100">
    <main role="main" class="flex-shrink-0 w-auto">
      <div class="container w-auto">
        <img alt="eventzimmer logo" src="./assets/icon-192x192.png" class="logo mt-3">
        <h3 class="mt-5">eventzimmer</h3>
        <p class="lead">Veranstaltungen im {{ month() }}</p>
        <events></events>
      </div>
    </main>
    <footer class="footer mt-auto py-3 fixed-bottom">
      <hr />
      <div class="container">
        <span class="text-muted">Impressum | Datenschutzerklärung</span>
      </div>
    </footer>
  </div>
</template>

<script>
import Events from '@/components/Events'
import { format } from 'date-fns'
import de from 'date-fns/locale/de'

export default {
  name: 'app',
  components: {
    Events
  },
  methods: {
    month () {
      return format(new Date(), 'MMMM', { locale: de })
    }
  }
}
</script>

<style>
html {
  background-color: rgba(245,245,245, 0.6);
  /*background-image: linear-gradient(to bottom, #358fa1, #74a6bd, #a8bdd3, #d3d7e4, #f5f5f5) !important;*/
}

.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

body {
  background-color: transparent !important;
}

#app {

}
</style>
