<template lang="pug">
.bar
  .progress(:style="{width: percentage}")
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
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
  height: 14px;
  background-color: #e8e8e8;
}

.progress {
  height: 100%;
  background-color: green;
}
</style>
