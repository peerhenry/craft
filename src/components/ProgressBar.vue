<template lang="pug">
.bar(:style="{ height }")
  .progress(:style="{width: percentage}")
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
  },
  computed: {
    percentage() {
      return this.progress + '%' || 0
    },
  },
}
</script>

<style scoped lang="scss">
.bar {
  background-color: #e8e8e8;
}

.progress {
  height: 100%;
  background-color: green;
}
</style>
