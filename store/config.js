export const state = () => ({
  damageTypeAttributes: {
    acid: { icon: 'liquid-spot', color: 'light-green darken-1' },
    bludgeoning: { icon: 'hammer', color: 'blue-grey lighten-3' },
    cold: { icon: 'snowflake', color: 'cyan lighten-3' },
    fire: { icon: 'fire', color: 'orange darken-1' },
    force: { icon: 'laser-pointer', color: 'purple lighten-1' },
    lightning: { icon: 'flash', color: 'blue darken-2' },
    necrotic: { icon: 'chemical-weapon', color: 'deep-purple darken-3' },
    piercing: { icon: 'bullseye-arrow', color: 'red darken-4' },
    poison: { icon: 'skull', color: 'lime lighten-1' },
    psychic: { icon: 'head-snowflake', color: 'pink lighten-1' },
    radiant: { icon: 'radioactive-circle', color: 'brown lighten-1' },
    slashing: { icon: 'sword', color: 'grey darken-1' },
    thunder: { icon: 'nuke', color: 'indigo darken-3' },
    bleeding: { icon: 'water', color: 'red darken-4' },
    hp: { icon: 'heart-plus', color: 'green' },
    shields: { icon: 'shield-plus', color: 'blue' },
    temp: { icon: 'heart-flash', color: 'blue-grey lighten-1' }
  },
  rarityColors: {
    varies: 'white',
    basic: 'white',
    unenhanced: 'white',
    standard: 'grey darken-3',
    premium: 'green darken-3',
    prototype: 'blue darken-2',
    advanced: 'purple',
    legendary: 'orange',
    artifact: 'red'
  },
  rarityTextColors: {
    light: {
      varies: 'grey--text text--darken-4',
      basic: 'grey--text text--darken-4',
      unenhanced: 'grey--text text--darken-4',
      standard: 'grey--text text--darken-1',
      premium: 'green--text text--accent-4',
      prototype: 'blue--text text--accent-4',
      advanced: 'purple--text text--darken-2',
      legendary: 'orange--text text--darken-3',
      artifact: 'red--text text--accent-1'
    },
    dark: {
      varies: 'grey--text text--lighten-5',
      basic: 'grey--text text--lighten-5',
      unenhanced: 'grey--text text--lighten-5',
      standard: 'grey--text text--darken-1',
      premium: 'green--text text--accent-4',
      prototype: 'blue--text',
      advanced: 'purple--text text--lighten-1',
      legendary: 'orange--text text--darken-3',
      artifact: 'red--text text--accent-1'
    }
  },
  primeTypeText: {
    light: {
      force: 'purple--text text--darken-1',
      necrotic: 'blue-grey--text text--darken-2',
      fire: 'deep-orange--text text--accent-4',
      cold: 'cyan--text text--darken-3',
      lightning: 'blue--text text--darken-3',
      detonates: 'secondary--text'
    },
    dark: {
      force: 'purple--text text--lighten-2',
      necrotic: 'blue-grey--text text--lighten-2',
      fire: 'deep-orange--text',
      cold: 'cyan--text text--darken-1',
      lightning: 'blue--text text--lighten-1',
      detonates: 'red--text text--lighten-1'
    }
  },
  searchFilters: [
    {
      id: 'character',
      color: {
        base: 'light-green',
        dark: 'darken-1',
        light: 'darken-4'
      },
      icon: 'mdi-face-agent'
    },
    {
      id: 'equipment',
      color: {
        base: 'deep-orange',
        dark: 'lighten-1',
        light: 'darken-4'
      },
      icon: 'mdi-hammer-wrench'
    },
    {
      id: 'manual',
      color: {
        base: 'indigo',
        dark: 'accent-1',
        light: 'darken-4'
      },
      icon: 'mdi-gavel'
    },
    {
      id: 'power',
      color: {
        base: 'purple',
        dark: 'lighten-1',
        light: 'darken-4'
      },
      icon: 'mdi-fire'
    },
    {
      id: 'bestiary',
      color: {
        base: 'red',
        dark: 'lighten-1',
        light: 'darken-4'
      },
      icon: 'mdi-paw'
    }
  ],
  classThemes: {
    adept: {
      dark: 'deep-purple darken-1',
      light: 'deep-purple lighten-2'
    },
    engineer: {
      dark: 'amber darken-1'
    },
    explorer: {
      dark: 'indigo darken-3',
      light: 'indigo accent-2'
    },
    infiltrator: {
      dark: 'deep-orange darken-4',
      light: 'deep-orange'
    },
    musician: {
      dark: 'teal darken-1',
      light: 'teal accent-2'
    },
    sentinel: {
      dark: 'brown',
      light: 'brown lighten-2'
    },
    soldier: {
      dark: 'red darken-4',
      light: 'red accent-2'
    },
    tracker: {
      dark: 'green darken-4',
      light: 'green accent-3'
    },
    vanguard: {
      dark: 'pink darken-4',
      light: 'pink lighten-2'
    },
    experiment: {
      dark: 'blue-grey darken-2',
      light: 'blue-grey lighten-1'
    },
    DEFAULT: {
      dark: 'blue-grey darken-2',
      light: 'blue-grey lighten-1'
    }
  },
  sklTypes: {
    item: { type: 'paragraph', types: { paragraph: 'text@6' } },
    expansionList: { type: 'table-tbody', types: { 'table-row': 'table-cell' } },
    articleList: { type: 'article-list', types: { 'article-list': 'article-divider@12', 'article-divider': 'article, divider' } },
    listPage: { type: 'list-page', types: { 'list-page': 'table-row-divider@10', 'table-row': 'table-cell@5' } },
    classPage: { type: 'class-page', types: { 'class-page': 'avatar, article' } }
  }
})

export const getters = {
  classTheme: state => (klass) => {
    return state.classThemes[klass] ? state.classThemes[klass] : state.classThemes.DEFAULT
  },
  primeTypeText: state => state.primeTypeText,
  rarityTextColors: state => state.rarityTextColors,
  rarityTextColor: (state, getters) => rarity => state.rarityTextColors[getters.darkMode ? 'dark' : 'light'][rarity],
  classThemes: state => state.classThemes,
  darkMode: (state, getters, rootState, rootGetters) => rootGetters['user/darkMode'],
  isDarkOnlyClassTheme: state => klass => typeof getters.classTheme(klass).light === 'undefined',
  classThemeHrColor: (state, getters) => (klass) => {
    if (getters.isDarkOnlyClassTheme(klass)) {
      return getters.classTheme(klass).dark
    }
    return getters.classTheme(klass)[getters.darkMode ? 'light' : 'dark']
  },
  classThemeTabColor: (state, getters) => (klass) => {
    if (getters.isDarkOnlyClassTheme(klass)) {
      return 'grey darken-3'
    }
    return getters.classTheme(klass)[getters.darkMode ? 'light' : 'dark']
  },
  classThemeTabsColor: (state, getters) => (klass) => {
    if (getters.isDarkOnlyClassTheme(klass)) {
      return getters.classTheme(klass).dark
    }
    return undefined
  },
  classThemeDark: state => (klass) => {
    return getters.classTheme(klass).dark
  },
  classThemeLight: (state, getters) => (klass) => {
    if (getters.isDarkOnlyClassTheme(klass)) {
      return getters.classTheme(klass).dark
    }
    return getters.classTheme(klass).light
  },
  classThemeTextOnDark: (state, getters) => klass => getters.isDarkOnlyClassTheme(klass) ? 'light' : 'dark',
  classThemeTabsMode: (state, getters) => (klass) => {
    return getters.isDarkOnlyClassTheme(klass)
      ? 'light'
      : getters.darkMode
        ? 'dark'
        : 'light'
  },
  sklTypes: state => state.sklTypes,
  searchFilters: state => state.searchFilters,
  searchFilterColor: (state, getters) => (sf) => {
    const filter = state.searchFilters.find(i => i.id === sf)
    return `${filter.color.base} ${getters.darkMode ? filter.color.dark : filter.color.light}`
  },
  searchFilterTextColor: (state, getters) => (sf) => {
    const filter = state.searchFilters.find(i => i.id === sf)
    return `${filter.color.base}--text text--${getters.darkMode ? filter.color.dark : filter.color.light}`
  }
}
