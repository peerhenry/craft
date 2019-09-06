<template lang="pug">
.character-status
  .status-bars
    .nourishment
      .absolute-bar
        .empty-hearts 🖤🖤🖤🖤🖤🖤🖤🖤🖤🖤
      .absolute-bar
        .filled-hearts(:style="{ width: nourishmentPercentage }") 💚💚💚💚💚💚💚💚💚💚
  span status: {{ status }}
  span.xp xp: {{ xp }}
</template>

<script>
// span {{ nourishmentHearts }}
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('character', ['nourishment', 'xp']),
    ...mapGetters('activity', ['status']),
    nourishmentPercentage() {
      return `${Math.round(this.nourishment)}%`
    },
  },
}
</script>

<style scoped lang="scss">
.character-status {
  font-size: 1.8rem;
  margin: 2rem 0;
  .status-bars {
    position: absolute;
    bottom: 1em;
    left: 1em;
    width: 50vw;

    .nourishment {
      position: relative;
      width: 100%;

      .absolute-bar {
        position: absolute;
        bottom: 1em;
        left: 1em;
      }

      .filled-hearts {
        white-space: nowrap;
        text-overflow: clip;
        overflow: hidden;
      }
    }
  }
}

.xp {
  margin-left: 2em;
}
</style>
