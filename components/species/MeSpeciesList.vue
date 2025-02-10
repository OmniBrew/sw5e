<template>
  <div class="mt-sm-5">
    <v-card v-for="item in items" :key="item.id" :to="`/species/${item.id}`" class="my-2">
      <v-row no-gutters class="mr-5">
        <v-col cols="2" sm="2">
          <v-img
            v-if="$vuetify.breakpoint.smAndUp"
            :src="item.img"
            height="88px"
            width="88px"
            position="top center"
            class="ml-3 mt-4"
          />
          <v-avatar v-if="$vuetify.breakpoint.xsOnly" size="48" class="ma-3">
            <v-img
              :src="item.img"
              position="top center"
            />
          </v-avatar>
        </v-col>
        <v-col cols="3" sm="2" class="d-flex flex-column justify-center pl-4">
          {{ item.name }}
        </v-col>
        <v-col v-if="$vuetify.breakpoint.smAndUp" cols="6" sm="5" lg="3" class="d-flex flex-column justify-center text-center">
          {{ item.abilityScoreIncrease }}
        </v-col>
        <v-col cols="3" sm="2" lg="2" class="d-flex flex-column justify-center text-center">
          <span class="text-capitalize">{{ item.cSize }}</span>
        </v-col>
        <v-col cols="3" sm="1" lg="2" class="d-flex flex-column justify-center text-center">
          {{ $t(`sources.${item.source}.abbr`) }}
        </v-col>
        <v-col
          v-if="$vuetify.breakpoint.xsOnly"
          cols="10"
          offset="2"
          class="text-caption mt-n5 mb-2 pl-4"
        >
          {{ item.abilityScoreIncrease }}
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'
export default {
  name: 'MeSpeciesList',
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
      model: 'species'
    }
  }
}
</script>
