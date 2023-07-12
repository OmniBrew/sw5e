<template>
  <div>
    <div v-if="!noLabel" class="text-subtitle">
      Tool Proficiency
    </div>
    <me-cb-choices-v-select
      :items="items"
      :label="label"
      :total-selections="selections"
      :value="currentValue.map(i => i.value)"
      :acquired="alreadyAcquired"
      @change="upsert"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/profs')
export default {
  name: 'MeCbChoicesTool',
  props: {
    mechanic: {
      type: Object,
      required: true
    },
    currentValue: {
      type: Array,
      required: true
    },
    noLabel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['profs']),
    selections () {
      return this.mechanic.selections || 1
    },
    label () {
      return `Choose ${this.$tc(`string_numbers[${this.selections}]`)}...`
    },
    profOptions () {
      const items = []
      for (const prof of this.$store.getters.getData('tool-profs')) {
        if (prof.id === 'vehicles') {
          for (const vehicleType of ['air', 'land', 'space', 'water']) {
            const id = `vehicle-${vehicleType}`
            items.push({
              value: id,
              group: 'vehicle',
              text: `Vehicles: ${this.$options.filters.titlecase(vehicleType)}`
            })
          }
        } else if (prof.choices && prof.choices.length) {
          for (const choiceType of prof.choices) {
            const key = Object.keys(choiceType)[0]
            // const id = `${prof.id}-${key}`
            items.push({
              value: key,
              group: prof.type,
              text: `${choiceType[key]}`,
              parent: prof.id
            })
          }
        } else {
          items.push({
            value: prof.id,
            text: prof.name,
            group: prof.type
          })
        }
      }
      return items
    },
    items () {
      if (this.mechanic.limit) {
        return this.profOptions.filter(i => this.mechanic.limit.includes(i.value) || this.mechanic.limit.includes(i.group))
      } else {
        return this.profOptions
      }
    },
    appended () {
      return {
        type: 'tool'
      }
    }
  },
  methods: {
    alreadyAcquired (item) {
      return this.profs.tool.includes(item.value)
    },
    upsert (value) {
      this.$emit('upsert', value.map((i) => {
        const parent = this.profOptions.find(item => item.value === i).parent
        return { value: i, parent, ...this.appended }
      }))
    }
  }
}
</script>
