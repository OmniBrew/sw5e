<template>
  <me-monster-expansion-list
    :headers="headers"
    :items="items"
    :type="model"
  >
    <template #[`header.expanded`]="{ item }">
      <me-monster-title :item="item" />
    </template>
    <template #[`header.Alignment`]="{ item }">
      <div class="text-capitalize">
        {{ item.Alignment }}
      </div>
    </template>
    <template #body="{ item }">
      <me-monster-stat-block :stats="item" />
    </template>
  </me-monster-expansion-list>
</template>

<script>
import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'
export default {
  name: 'MeMonsterList',
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
      model: 'bestiary'
    }
  }
}
</script>
