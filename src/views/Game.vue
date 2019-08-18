<template lang="pug">
  #game
    h1 Craft
    p state: {{ state }}
    p wood: {{ wood }}
    p stone: {{ stone }}
    div
      button(@click="gather('wood')") gather wood
    div
      button(@click="gather('stone')") gather stone
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      wood: 0,
      stone: 0,
      gathering: null,
    }
  },
  computed: {
    state() {
      if (this.gathering) return `gathering ${this.gathering}`
      else return 'idle'
    },
  },
  methods: {
    gather(resource) {
      if (this.isValidResource(resource)) {
        this.gathering = resource
      } else {
        this.gathering = null
      }
    },
    isValidResource(resource) {
      return resource === 'wood' || resource === 'stone'
    },
  },
}
</script>

<style lang="scss">
#game {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.4rem;
}
</style>
