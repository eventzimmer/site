<template>
	<div class="container">
    <div class="row">
      <div class="col-sm-10">
      <span class="text-dark">
      <a href="impressum.html" class="text-dark">{{ $t("msg.imprint") }}</a> |
      <a href="datenschutz.html" class="text-dark">{{ $t("msg.privacy") }}</a> |
      <a href="https://www.instagram.com/eventzimmer_tuebingen/" aria-label="eventzimmer Instagram profile"><i class="fab fa-instagram text-dark"></i></a>
      </span>
      </div>
      <div class="form-group col-md-2">
        <div class="mt-2 visible-sm"></div>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-language"></i></div>
          </div>
          <select class="form-control form-control-sm" @change="updateLanguage">
            <option v-for="(language) in languages" :key="language" :value="language" :selected="$store.state.selection.language === language">{{ language }}</option>
          </select>
        </div>
      </div>
      <div class="col-sm-7">

      </div>
    </div>
	</div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      languages: ['de', 'en']
    }
  },
  methods: {
    updateLanguage (event) {
      const language = event.target.value
      this.$store.commit('changeLanguage', language)
      this.$i18n.locale = language
    }
  }
}
</script>
