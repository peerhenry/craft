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
  border: 1px solid #222;
  box-shadow: 2px 2px 4px rgba(0.2, 0.2, 0.2, 0.5);
  text-shadow: 2px 2px 4px rgba(0.2, 0.2, 0.2, 0.5);

  &:hover:enabled {
    // background-color: #00aac0;
    background-color: #49a14c;
    opacity: 1;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
}
</style>
