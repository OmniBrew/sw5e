<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      rule-link="/manual/bestiary"
      model="bestiary"
      component="MeMonsterList"
      default-sort="RowKey"
      :custom-filter="customFilter"
    />
  </v-container>
</template>

<script>
export default {
  layout: 'list',
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('bestiary_title', 2),
      description: this.$t('meta.bestiary')
    })
    await this.$store.dispatch('FETCH_LOTS', ['bestiary', 'npc-stats'])
  },
  methods: {
    customFilter: (item, search = null, filters = [], selectedFilters = {}) => {
      const matches = []
      if (search && search.length > 0) {
        matches.push(item.RowKey.toLowerCase().includes(search.toLowerCase()))
      }
      for (const filter of filters) {
        // filter value
        const testValue = item[filter.key]
        const selected = selectedFilters[filter.key]
        if (typeof selected === 'undefined' || selected === null || selected.length === 0 || !testValue) {
          // continue if null
          continue
        }
        const selectedIsArray = Array.isArray(selected)
        const testValueIsArray = Array.isArray(testValue)
        if (selectedIsArray && testValueIsArray) {
          // multi-select filter comparing to another array
          matches.push(testValue.some(i => selected.includes(i)))
        } else if (selectedIsArray && !testValueIsArray) {
          // multi-select filter comparing to a string
          matches.push(selected.includes(testValue))
        } else if (!selectedIsArray && testValueIsArray) {
          // single-select filters comparing to array
          matches.push(testValue.includes(selected))
        } else if (!selectedIsArray && !testValueIsArray) {
          // single-select filter comparing to a string
          matches.push(selected === testValue)
        }
      }
      return matches.every(value => value)
    }
  }
}
</script>
