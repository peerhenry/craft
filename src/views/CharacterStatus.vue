<template lang="pug">
.character-status
  span nourishment: {{ nourishmentHearts }}
  span status: {{ status }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('character', ['nourishment']),
    ...mapGetters('activity', ['status']),
    nourishmentHearts() {
      const greenHearts = Math.round(this.nourishment / 10)
      let hearts = ''
      for (let i = 0; i < 10; i++) {
        if (i < greenHearts) {
          hearts += '💚'
        } else {
          hearts += '🖤'
        }
      }
      return hearts
    },
  },
}
</script>

<style scoped lang="scss">
.character-status {
  font-size: 1.8rem;
  margin: 2rem 0;
}
</style>
