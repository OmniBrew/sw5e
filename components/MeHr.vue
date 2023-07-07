<template>
  <v-progress-linear :value="100" :height="size" class="my-2" :color="color" />
</template>

<script>
export default {
  name: 'MeHr',
  props: {
    size: {
      type: [Number, String],
      default: 4
    },
    color: {
      type: String,
      default: 'rgb(13, 153, 204)'
    }
  }
}
</script>
