<template>
  <me-expansion-list
    :items="items"
    :headers="headers"
    :type="model"
  >
    <template #[`header.expanded`]="{ item }">
      <me-armor-title :item="item" />
    </template>
    <template #[`header.name`]="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
    </template>
    <template #[`header.type`]="{ item }">
      {{ $t(`armor_types.${item.type}`) }}
    </template>
    <template #[`header.cost`]="{ item }">
      {{ item.cost | groupDigits(',') }}
    </template>
    <template #[`header.stealthDisadvantage`]="{ item }">
      {{ item.stealthDisadvantage ? 'Disadvantage' : '' }}
    </template>
    <template #[`header.properties`]="{ item }">
      <span class="text-capitalize">
        {{ item.properties | propertiesString() }}
      </span>
    </template>
    <template #body="{ item }">
      <me-armor-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'

export default {
  name: 'MeArmorList',
  mixins: [ListPageHelpers],
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      model: 'armor'
    }
  }
}
</script>
