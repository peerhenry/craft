<template lang="pug">
  #app
    Game
</template>

<script>
import Game from '@/views/Game.vue'

export default {
  components: {
    Game,
  },
}
</script>

<style lang="scss">
@import 'assets/reset.css';

html {
  font-size: 62.5%; // 10px
}
</style>
