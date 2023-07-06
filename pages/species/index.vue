<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      model="species"
      component="MeSpeciesList"
      default-sort="name"
      :custom-filter="customFilter"
      no-header-padding
    />
  </v-container>
</template>

<script>

export default {
  layout: 'list',
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('species_title', 2),
      description: this.$t('meta.species')
    })
    await this.$store.dispatch('FETCH_LOTS', ['species'])
  },
  methods: {
    customFilter: (item, search = null, filters = [], selectedFilters = {}) => {
      const matches = []
      if (search && search.length > 0) {
        matches.push(item.name.toLowerCase().includes(search.toLowerCase()))
      }
      for (const filter of filters) {
        // ability score increase check
        if (filter.key === 'asi') {
          const asiSelected = selectedFilters[filter.key] || []
          if (!asiSelected.length) {
            continue
          }
          // get matching mechanics
          const asiMechanics = (item.mechanics || []).filter(i => ['asi', 'asi-choice'].includes(i.type))
          let asiCheck = false
          for (const asiM of asiMechanics) {
            if (asiCheck) {
              continue
            }
            if (asiM.type === 'asi' && asiSelected.includes(asiM.ability)) {
              asiCheck = true
              continue
            }
            if (asiM.type === 'asi-choise' && (asiM.limit || []).some(e => asiSelected.includes(e))) {
              asiCheck = true
            }
          }
          matches.push(asiCheck)
          continue
        }

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
