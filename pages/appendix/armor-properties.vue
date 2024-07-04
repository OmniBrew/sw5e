<template>
  <v-container>
    <me-page-title />
    <me-skeleton-loader :pending="$fetchState.pending" type="articleList">
      <v-list class="mt-5">
        <v-list-item
          v-for="item in items"
          :key="item.name"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}<me-rule-chip :item="item" x-small />
            </v-list-item-title>
            <div class="text-body-2 font-weight-light">
              <me-html :content="item.html" />
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: 'Armor Properties',
      subtitle: this.$t('appendix_title'),
      description: 'Armor properties'
    })
    await this.$store.dispatch('FETCH_DATA', 'armor-properties')
  },
  computed: {
    items () {
      return this.$store.getters.getData('armor-properties')
    }
  }
}
</script>
