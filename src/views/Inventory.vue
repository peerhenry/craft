<template lang="pug">
.inventory
  h2.section-header Inventory
  p(v-for="(value, itemKey) in inventory") {{ displayItem(itemKey) }}: {{ value }}
</template>

<script>
import { mapState } from 'vuex'
import itemDisplay from '@/mixins/itemDisplay.js'

export default {
  mixins: [itemDisplay],
  computed: mapState({ inventory: state => state.inventory }),
}
</script>

<style scoped lang="scss">
p {
  text-align: left;
  font-size: 1.8rem;
}
</style>
