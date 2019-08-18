<template lang="pug">
.crafting
  h2.section-header Crafting
  div(v-for="(recipe, item) of recipes")
    button.action-btn(@click="craft(item)" :disabled="!canCraft(item)") craft {{ recipe.name }}
    Spinner(v-show="isCrafting(item)")
    ProgressBar(v-show="isCrafting(item)" :progress="Math.round(craftProgress)")
</template>

<script>
import { ADD_ITEM } from '@s/mutation-types.js'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import Spinner from '@c/Spinner.vue'
import ProgressBar from '@c/ProgressBar.vue'
const { mapMutations } = createNamespacedHelpers('inventory')
const { mapActions } = createNamespacedHelpers('activity')

export default {
  name: 'Crafting',
  components: { Spinner, ProgressBar },
  computed: {
    ...mapGetters(['recipes']),
    ...mapGetters('activity', ['isCrafting', 'canCraft', 'craftProgress']),
  },
  methods: {
    ...mapMutations([ADD_ITEM]),
    ...mapActions(['craft']),
  },
}
</script>

<style scoped lang="scss"></style>
