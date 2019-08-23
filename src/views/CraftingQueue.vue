<template lang="pug">
.craft-queueu
  h2.section-header Crafting Queue
  .queue-item(v-for="(recipeKey, index) of craftQueue")
    span {{ displayRecipe(recipeKey) }}
    span.cancel-craft(@click="cancelCraft(index)") ✖
    ProgressBar.progress-bar(v-if="index === 0" :progress="Math.round(craftProgress)" height="8px")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
  methods: mapActions('activity', ['cancelCraft']),
}
</script>

<style scoped lang="scss">
.craft-queueu {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

.queue-item {
  padding: 1.2em 0;
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
    border-top: 1px solid lightgray;
  }

  .cancel-craft {
    $size: 1em;
    $padding: 0.3em;
    padding: $padding;
    position: absolute;
    top: 50%;
    z-index: 1;
    margin-top: -($size)/2 - $padding;
    right: $size;
    width: $size;
    height: $size;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid darkgray;
    font-family: arial;

    &:hover {
      background-color: white;
    }
  }
}
</style>
