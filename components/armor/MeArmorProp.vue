<template>
  <v-skeleton-loader
    :loading="$fetchState.pending"
    type="text"
    class="d-inline-block"
    width="75"
  >
    <me-more-info-dialog
      :title="name"
      :content="item.html"
    />
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'MeArmorProp',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'armor-properties')
  },
  computed: {
    parsedItem () {
      if (this.id.includes('-')) {
        const split = this.id.split('-')
        return {
          property: split[0],
          qualifier: split.slice(1).join('')
        }
      } else {
        return {
          property: this.id,
          qualifier: null
        }
      }
    },
    item () {
      return this.$store.getters.getItem('armor-properties', this.parsedItem.property.toString()) || {}
    },
    name () {
      return this.parsedItem.qualifier ? `${this.item.name} ${this.parsedItem.qualifier}` : this.item.name
    }
  }
}
</script>
