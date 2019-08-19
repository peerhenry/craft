<template lang="pug">
.crafting
  h2.section-header Crafting
  .craft-grid
    div(v-for="(recipe, itemKey) of recipes")
      ActionButton(@click="enqueueCraft(itemKey)" :disabled="!canCraft(itemKey)") craft {{ recipe.name }}
      Spinner(v-show="isCraftingItem(itemKey)")
      .bar
        ProgressBar(v-show="isCraftingItem(itemKey)" :progress="Math.round(craftProgress)" height="8px")
  h2.section-header Crafting Queue
    div(v-for="recipe of craftQueue")
      p {{ recipe.name }}
</template>

<script>
import { ADD_ITEM } from '@s/mutation-types.js'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import Spinner from '@c/Spinner.vue'
import ProgressBar from '@c/ProgressBar.vue'
import ActionButton from '@c/ActionButton.vue'
const { mapMutations } = createNamespacedHelpers('inventory')
const { mapActions, mapState } = createNamespacedHelpers('activity')

export default {
  name: 'Crafting',
  components: { Spinner, ProgressBar, ActionButton },
  computed: {
    ...mapGetters(['recipes']),
    ...mapGetters('activity', ['isCraftingItem', 'canCraft', 'craftProgress']),
    ...mapState(['craftQueue']),
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

.bar {
  height: 8px;
}
</style>
