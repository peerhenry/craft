<template lang="pug">
.crafting
  h2.section-header Crafting
  .craft-grid
    div(v-for="(recipe, recipeKey) of recipes")
      ActionButton.craft-button.tooltip(@click="enqueueCraft(recipeKey)" :disabled="!canCraft(recipeKey)") 
        span.tooltip-text
          p(v-for="line of displayCostLines(recipeKey)") {{ line }}
        span {{ displayRecipe(recipeKey) }}
        Spinner.craft-spinner(v-show="isCraftingRecipe(recipeKey)")
</template>

<script>
import { ADD_ITEM } from '@s/mutation-types.js'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import Spinner from '@c/Spinner.vue'
import ActionButton from '@c/ActionButton.vue'
const { mapMutations } = createNamespacedHelpers('inventory')
const { mapActions } = createNamespacedHelpers('activity')
import recipeDisplay from '@/mixins/recipeDisplay.js'
import CraftingQueue from '@/views/CraftingQueue.vue'

export default {
  name: 'Crafting',
  components: { Spinner, ActionButton, CraftingQueue },
  mixins: [recipeDisplay],
  computed: {
    ...mapGetters(['recipes']),
    ...mapGetters('activity', ['isCraftingRecipe', 'canCraft']),
  },
  methods: {
    ...mapMutations([ADD_ITEM]),
    ...mapActions(['enqueueCraft']),
  },
}
</script>

<style scoped lang="scss">
.craft-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

.craft-button {
  position: relative;
}

.craft-spinner {
  position: absolute;
  right: 1em;
}

.tooltip {
  position: relative;
  display: inline-block;
  $tooltip-width: 120px;
  $tooltip-color: #222;
  $triangle-size: 5px;

  .tooltip-text {
    opacity: 1;
    font-size: 1.4rem;
    visibility: hidden;
    position: absolute;
    z-index: 2;
    bottom: 110%;
    left: 50%;
    width: $tooltip-width;
    margin-left: -$tooltip-width/2;
    background-color: $tooltip-color;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;

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
</style>
