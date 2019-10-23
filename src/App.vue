<template>
  <div id="app">
    <h1 class="mt-5">eventzimmer</h1>
	<h2>{{ $t("msg.slogan") }}</h2>
	<p>{{ $t("msg.introText") }}</p>

    <button type="button" @click="backToTop" id="back-to-top" class="btn btn-secondary btn-back-to-top fixed-bottom mb-2" style="display: none"><i class="fas fa-angle-up"></i></button>
    <div class="row mb-1 mt-1">
      <div class="col-sm"></div>
      <div class="col-sm-3 col-md-2">
        <date-range></date-range>
        <div class="mt-2 d-md-none"></div>
      </div>
      <div class="col-sm-2 col-md-2">
        <categories></categories>
        <div class="mt-2 d-md-none"></div>
      </div>
      <div class="col-sm-2 col-md-2">
        <cities></cities>
      </div>
    </div>
    <events></events>
    <Footer class="footer mt-auto py-3"></Footer>
  </div>
</template>

<script>
import Events from '@/components/Events'
import Cities from '@/components/Cities'
import Categories from '@/components/Categories'
import DateRange from '@/components/DateRange'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    Events,
    Cities,
    Categories,
    DateRange,
    Footer
  },
  mounted () {
    window.onscroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 100) {
        document.getElementById('back-to-top').style.display = 'block'
      } else {
        document.getElementById('back-to-top').style.display = 'none'
      }
    }
  },
  methods: {
    updateLanguage (event) {
      const language = event.target.value
      this.$store.commit('changeLanguage', language)
      this.$i18n.locale = language
    },
    backToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
@media (max-width: 767.98px) {
  .btn-back-to-top {
    left: 85%;
  }
}

@media (min-width: 767.98px) {
  .btn-back-to-top {
    left: 80%;
  }
}
</style>
