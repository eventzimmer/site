<template>
  <div id="app">
    <h3 class="mt-5">eventzimmer</h3>
    <button type="button" @click="backToTop" id="backToTop" class="btn btn-secondary btn-back-to-top fixed-bottom mb-2" style="display: none"><i class="fas fa-angle-up"></i></button>
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
  },
  mounted () {
    window.onscroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 100) {
        document.getElementById('backToTop').style.display = 'block'
      } else {
        document.getElementById('backToTop').style.display = 'none'
      }
    }
  },
  methods: {
    backToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
.btn-back-to-top {
  left: 85%;
}
</style>
