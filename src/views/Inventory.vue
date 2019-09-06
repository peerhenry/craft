<template lang="pug">
.inventory
  h2.section-header Inventory
  .inventory-contents
    .inventory-item(v-for="(value, itemKey) in inventory")
      span {{ displayItem(itemKey) }}: {{ value }}
      span.consume(v-show="isConsumable(itemKey)")
        span.consume-button.tooltip(@click="consume(itemKey)" style="border: none") 👄
          span.tooltip-text Consume
</template>

<script>
import { mapState } from 'vuex'
import itemDisplay from '@/mixins/itemDisplay.js'
import items from '@/settings/items.js'

export default {
  mixins: [itemDisplay],
  computed: mapState({ inventory: state => state.inventory }),
  methods: {
    isConsumable(itemKey) {
      return !!items[itemKey].consumable
    },
    consume(itemKey) {
      const nourishment = items[itemKey].consumable.nourishment
      this.$store.commit('inventory/ADD_ITEM', { item: itemKey, amount: -1 })
      if (nourishment) {
        this.$store.commit('character/ADD_NOURISHMENT', nourishment)
      }
    },
  },
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
  position: relative;

  $button-size: 1em;
  $button-padding: 0.3em;

  // todo: remove duplicate code with CraftingQueue
  .consume {
    position: absolute;
    top: 50%;
    right: $button-size;
    z-index: 1;
    margin-top: -($button-size)/2 - $button-padding;
  }

  .consume-button {
    position: relative;
    display: inline-block;
    padding: $button-padding;
    width: $button-size;
    height: $button-size;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid darkgray;
    font-family: arial;
    -webkit-user-select: none; /* webkit (safari, chrome) browsers */
    -moz-user-select: none; /* mozilla browsers */
    -khtml-user-select: none; /* webkit (konqueror) browsers */
    -ms-user-select: none; /* IE10+ */

    &:hover {
      background-color: white;
    }
  }

  // todo: remove duplicate code with CraftingQueue
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
