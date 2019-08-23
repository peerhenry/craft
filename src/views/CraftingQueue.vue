<template lang="pug">
.craft-queueu
  h2.section-header Crafting Queue
  .queue-item(v-for="(recipeKey, index) of craftQueue")
    span {{ displayRecipe(recipeKey) }}
    ProgressBar.progress-bar(v-if="index === 0" :progress="Math.round(craftProgress)" height="8px")
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import recipes from '@/settings/recipes.js'
import recipeDisplay from '@/mixins/recipeDisplay.js'
import ProgressBar from '@c/ProgressBar.vue'

export default {
  name: 'CraftingQueue',
  components: { ProgressBar },
  mixins: [recipeDisplay],
  date() {
    return { recipes }
  },
  computed: {
    ...mapState('activity', ['craftQueue']),
    ...mapGetters('activity', ['isCraftingRecipe', 'craftProgress']),
  },
}
</script>

<style scoped lang="scss">
.craft-queueu {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

.queue-item {
  padding: 1em 0;
  border: 1px solid grey;
  position: relative;
  background-color: #eee;
  border-radius: 5px;

  .progress-bar {
    height: 8px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
