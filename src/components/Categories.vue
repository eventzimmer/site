<template>
  <select class="custom-select" size="2" v-model="categories" id="categorySelect" multiple>
    <label for="categorySelect">{{ $t("msg.categories") }}</label>
    <option :value="[]" selected disabled hidden>{{ $t("msg.select_categories") }}</option>
    <option v-for="category in $store.getters.categories" :value="category" v-bind:key="category">{{ category }}</option>
  </select>
</template>

<script>
export default {
  name: 'Categories',
  computed: {
    categories: {
      get () {
        return this.$store.state.selection.categories
      },
      set (categories) {
        this.$store.commit('changeCategories', categories)
      }
    }
  }
}
</script>

<style scoped>

</style>
