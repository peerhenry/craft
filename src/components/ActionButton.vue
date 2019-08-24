<template lang="pug">
button.action-btn(v-on="$listeners" v-bind="$attrs")
  slot
</template>

<script>
export default {
  name: 'ActionButton',
  inheritAttrs: false,
}
</script>

<style scoped lang="scss">
.action-btn {
  padding: 0.8em;
  outline: none;
  border: none;
  color: white;
  background-color: #3e9141;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-bottom: 0.5em;
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 1rem;
  font-family: inherit;
  width: 100%;

  &:hover {
    background-color: #00aac0;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
}
</style>
