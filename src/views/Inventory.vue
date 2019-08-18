<template lang="pug">
.inventory
  h2.section-header Inventory
  p(v-for="(value, item) in inventory") {{ item }}: {{ value }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({ inventory: state => state.inventory }),
}
</script>

<style scoped lang="scss"></style>
