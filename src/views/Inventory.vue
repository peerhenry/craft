<template lang="pug">
.inventory
  h2.section-header Inventory
  .inventory-contents
    .inventory-item(v-for="(value, itemKey) in inventory") {{ displayItem(itemKey) }}: {{ value }}
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
.inventory-contents {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

.inventory-item {
  text-align: left;
  font-size: 1.8rem;
  padding: 1em;
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #222;
  font-weight: bold;
  box-shadow: 2px 2px 4px rgba(0.2, 0.2, 0.2, 0.5);
}
</style>
