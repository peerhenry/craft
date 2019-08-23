<template lang="pug">
.loader(:style="loaderStyle")
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '1.4rem',
    },
    borderThickness: {
      type: String,
      default: '0.4rem',
    },
    color1: {
      type: String,
      default: 'rgba(0,0,0,0.3)', // '#f3f3f3',
    },
    color2: {
      type: String,
      default: '#f3f3f3', // '#3498db'
    },
  },
  computed: {
    loaderStyle() {
      return {
        width: this.size,
        height: this.size,
        border: `${this.borderThickness} solid ${this.color1}`,
        borderTop: `${this.borderThickness} solid ${this.color2}`,
      }
    },
  },
}
</script>

<style scoped lang="scss">
$border-thickness: 0.4rem;
$spinner-size: 1.4rem;

.loader {
  display: inline-block;
  border-radius: 50%;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
