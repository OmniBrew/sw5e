<template>
  <me-item-title
    :title="item.RowKey"
    subtitle
  >
    <template #title>
      <span :class="textColor">
        {{ item.RowKey }}
      </span>
      <span v-if="item.ContentSource" class="text-caption font-italic">
        {{ item.ContentSource }}
      </span>
    </template>
    <template #subtitle>
      <div class="font-italic">
        {{ item.Size }} {{ item.TypesJson }}, {{ item.Alignment }}
      </div>
    </template>
  </me-item-title>
</template>

<script>
export default {
  name: 'MeMonsterTitle',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          name: '',
          size: '',
          alignment: '',
          type: ''
        }
      }
    }
  },
  computed: {
    textColor () {
      return this.$vuetify.theme.dark ? 'red--text text--darken-2' : 'secondary--text'
    }
  }
}
</script>
