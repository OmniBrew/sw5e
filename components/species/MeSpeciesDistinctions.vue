<template>
  <div class="species-distinctions-table">
    <template v-for="(section, index) in sections">
      <div :key="`header-${index}`" class="text-uppercase sdt-header">
        {{ section.title }} Characteristics
      </div>
      <table :key="`table-${index}`">
        <tbody>
          <tr v-for="row in section.parts" :key="`tr-${row.label}`">
            <td>
              <strong>
                <em>
                  {{ row.label }}
                </em>
              </strong>
            </td>
            <td v-if="row.key">
              {{ item[row.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MeSpeciesDistinctions',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      sections: [
        {
          title: 'Visual',
          parts: [
            { label: 'Skin Color', key: 'skinColor' },
            { label: 'Hair Color', key: 'hairColor' },
            { label: 'Eye Color', key: 'eyeColor' },
            { label: 'Distinctions', key: 'distinctions' }
          ]
        },
        {
          title: 'Physical',
          parts: [
            {
              label: 'Height'
            },
            {
              label: 'Weight'
            }
          ]
        },
        {
          title: 'Sociocultural',
          parts: [
            { label: 'Homeworld', key: 'homeworld' },
            { label: 'Language', key: 'language' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.species-distinctions-table {
  padding: 15px 10px;
  margin: 15px;
  background-color: #bdc8cc;
  border-top: 0.2em solid #0d99cc;
  border-bottom: 0.2em solid #0d99cc;
  border-left: 0;
  border-right: 0;
  -webkit-box-shadow: 0 0 1.5em rgba(13,153,204,.5);
  box-shadow: 0 0 1.5em rgba(13,153,204,.5);
  overflow-x: auto;
}

.sdt-header {
  font-family: 'Russo One', sans-serif;
}
</style>
