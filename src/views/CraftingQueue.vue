<template lang="pug">
.craft-queueu
  h2.section-header Crafting Queue
  .queue-item(v-for="(recipeKey, index) of craftQueue")
    span {{ displayRecipe(recipeKey) }}
    span.resume-craft(v-show="index === 0 && craftingIsPaused")
      span.resume-craft-button.tooltip(@click="resumeCraft") ▶
        span.tooltip-text Resume
    span.cancel-craft
      span.cancel-craft-button.tooltip(@click="cancelCraft(index)") ✖
        span.tooltip-text Cancel
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
    ...mapGetters('activity', [
      'isCraftingRecipe',
      'craftProgress',
      'craftingIsPaused',
    ]),
  },
  methods: mapActions('activity', ['cancelCraft', 'resumeCraft']),
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

  $button-size: 1em;
  $button-padding: 0.3em;

  .resume-craft,
  .cancel-craft {
    position: absolute;
    top: 50%;
    z-index: 1;
    margin-top: -($button-size)/2 - $button-padding;
  }

  .resume-craft-button,
  .cancel-craft-button {
    position: relative;
    display: inline-block;
    padding: $button-padding;
    width: $button-size;
    height: $button-size;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid darkgray;
    font-family: arial;

    &:hover {
      background-color: white;
    }
  }

  .cancel-craft {
    right: $button-size;
  }

  .resume-craft {
    right: 3 * $button-size;
  }

  .tooltip {
    position: relative;
    display: inline-block;
    $tooltip-width: 120px;
    $tooltip-color: #222;
    $triangle-size: 5px;

    .tooltip-text {
      visibility: hidden;
      position: absolute;
      z-index: 2;
      bottom: 130%;
      left: 50%;
      width: $tooltip-width;
      margin-left: -$tooltip-width/2;
      background-color: $tooltip-color;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;

      // triangle
      &:after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -$triangle-size;
        border-width: $triangle-size;
        border-style: solid;
        border-color: $tooltip-color transparent transparent transparent;
      }
    }

    &:hover {
      .tooltip-text {
        visibility: visible;
      }
    }
  }
}
</style>
