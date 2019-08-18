<template lang="pug">
.bar(:style="{ height, backgroundColor }")
  .progress(:style="{width: percentage, backgroundColor: foregroundColor }")
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    height: {
      type: String,
      default: '8px',
    },
    backgroundColor: {
      type: String,
      default: '#e8e8e8',
    },
    foregroundColor: {
      type: String,
      default: 'green',
    },
  },
  computed: {
    percentage() {
      return this.progress + '%' || 0
    },
  },
}
</script>

<style scoped lang="scss">
.progress {
  height: 100%;
}
</style>
