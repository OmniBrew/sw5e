<template>
  <div v-if="!$fetchState.pending" class="mb-3 mt-n3 text-body-2">
    <p v-for="(item, index) in list" :key="index" class="my-0">
      <span class="font-italic">
        {{ item.perDay }}:
      </span>
      <span v-for="(powerIdObj, powerIdIndex) in item.powerIds" :key="`powerId-${powerIdIndex}`" class="px-1 d-inline-flex flex-wrap">
        <me-power-dialog v-if="powerIdObj.exists" :id="powerIdObj.powerId" hide-advancements />
        <span v-else>{{ powerIdObj.powerId }}</span>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      default: () => {
        return {
          list: []
        }
      }
    },
    innate: {
      type: Boolean,
      default: false
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_LOTS', ['classes', 'powers'])
  },
  computed: {
    powers () {
      return this.$store.getters.getData('powers')
    },
    powerIds () {
      return this.powers.map(i => i.id)
    },
    list () {
      const list = []
      const hasLines = this.feature.DescriptionWithLinks.match(/[\r\n]+/g)
      const castingTraitRegex = /\s{1,2}(The).*?asting.*?\)/gm
      if (hasLines) {
        const groups = this.feature.DescriptionWithLinks.split(/[\r\n]+/)
        for (const group of groups) {
          if (group.match(castingTraitRegex)) {
            continue
          } else {
            const [perDayRaw, powersRaw] = group.split(':')
            if (!powersRaw || !perDayRaw) {
              continue
            }
            const powersRawArray = powersRaw.split(',')
            const powerIds = []
            const powerNameRegex = /\[(.*?)\]/gi
            for (const pr of powersRawArray) {
              const match = pr.match(powerNameRegex)
              if (match) {
                const powerId = match[0].replace(/[^\w ]/gi, '').replaceAll(' ', '-')
                if (powerId === '') {
                  continue
                }
                if (this.powerIds.includes(powerId)) {
                  powerIds.push({ exists: true, powerId })
                } else {
                  powerIds.push({ exists: false, powerId })
                }
              }
            }
            if (powerIds.length) {
              const powerGroup = {
                perDay: perDayRaw.trim(),
                powerIds
              }
              list.push(powerGroup)
            }
          }
        }
        // console.log(list)
      } else {
        console.log('no lines')
        const splits = this.feature.DescriptionWithLinks.split(',')
        let i = -1
        for (const split of splits) {
          if (split.includes(':')) {
            const [perDay, potentialPower] = split.split(':')
            if (potentialPower) {
              const potentialCleanedPower = potentialPower.trim().replace(/[^\w ]/gi, '').replaceAll(' ', '-')
              if (this.powerIds.includes(potentialCleanedPower)) {
                i++
                const powerGroup = {
                  perDay: perDay.trim(),
                  powerIds: [{ exists: true, powerId: potentialCleanedPower }]
                }
                list[i] = powerGroup
              }
            }
          } else {
            const potentialPower = split.trim().replace(/[^\w ]/gi, '').replaceAll(' ', '-')
            if (this.powerIds.includes(potentialPower) && list[i]) {
              list[i].powerIds.push({ exists: true, powerId: potentialPower })
            }
          }
        }
        // console.log(list)
      }
      return list
    }
  }
}
</script>
