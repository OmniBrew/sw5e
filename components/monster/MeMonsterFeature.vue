<template>
  <div class="text-body-2 mb-4">
    <span class="font-weight-medium font-italic">
      {{ title }}
    </span>
    <span class="font-weight-light">
      <slot name="description">
        {{ description }}
      </slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'MeMonsterFeature',
  props: {
    feature: {
      type: Object,
      default: () => {
        return {
          name: '',
          description: ''
        }
      }
    }
  },
  computed: {
    title () {
      const text = this.feature.Restrictions ? this.$t('npc.feature_w_limitation', { name: this.feature.Name, limitation: this.feature.Restrictions }) : this.feature.Name
      return this.$t('lists.sentences[1]', [text])
    },
    description () {
      if (this.feature.casting) {
        const cleanedDwl = this.feature.DescriptionWithLinks.replace(/[\r\n]+/g, ' ')
        const castingTraitRegex = /\s{1,2}(The).*?asting.*?\).*?:/gm
        const match = cleanedDwl.match(castingTraitRegex)
        if (match) {
          return match[0].trim()
        } else {
          return this.feature.Description
        }
      } else {
        return this.feature.Description
      }
    }
  }
}
</script>
