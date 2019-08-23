<template lang="pug">
  h2.section-header Crafting Queue
    div(v-for="recipeKey of craftQueue")
      p {{ displayRecipe(recipeKey) }}
</template>

<script>
import { mapState } from 'vuex'
import recipes from '@/settings/recipes.js'
import recipeDisplay from '@/mixins/recipeDisplay.js'

export default {
  name: 'CraftingQueue',
  mixins: [recipeDisplay],
  date() {
    return { recipes }
  },
  computed: mapState('activity', ['craftQueue']),
}
</script>

<style scoped lang="scss"></style>
