import Vue from 'vue';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import VueResource from 'vue-resource';

// Layout
import Default from './containers/Default.vue';

// Pages
import Armor from './pages/Armor.vue';
import ArmorMods from './pages/ArmorMods.vue';
import ArmorSets from './pages/ArmorSets.vue';
import Backgrounds from './pages/Backgrounds.vue';
import Bestiary from './pages/Bestiary.vue';
import Classes from './pages/Classes.vue';
import ClassView from './pages/ClassView.vue';
import Combat from './pages/Combat.md';
import Conditions from './pages/Conditions.md';
import Equipment from './pages/Equipment.md';
import Feats from './pages/Feats.vue';
import General from './pages/General.md';
import Grenades from './pages/Grenades.vue';
import Home from './pages/Home.vue';
import ParagonRenegade from './pages/ParagonRenegade.md';
import Race from './pages/Race.vue';
import Races from './pages/Races.vue';
import Skills from './pages/Skills.vue';
import Spell from './pages/Spell.vue';
import Spells from './pages/Spells.vue';
import Spellcasting from './pages/Spellcasting.md';
import ThermalClips from './pages/ThermalClips.vue';
import Weapons from './pages/Weapons.vue';
import Weapon from './pages/Weapon.vue';

require('./stylus/main.styl');

Vue.use(Router);
Vue.use(Vuetify);
Vue.use(VueResource);

const router = new Router({
  mode: 'hash',
  routes: [
    {path: '/', component: Default, redirect: '/home',
      children: [
        {path: 'armor/mods', component: ArmorMods},
        {path: 'armor/sets', component: ArmorSets},
        {path: 'backgrounds', component: Backgrounds},
        {path: 'bestiary', component: Bestiary},
        {path: 'classes', component: Classes},
        {path: 'classes/:id', component: ClassView, name: 'class'},
        {path: 'conditions', component: Conditions},
        {path: 'feats', component: Feats},
        {path: 'grenades', component: Grenades},
        {path: 'home', component: Home},
        {path: 'races', component: Races, name: 'races'},
        {path: 'races/:id', component: Race, name: 'race', props: true},
        {path: 'skills', component: Skills},
        {path: 'spells', component: Spells},
        {path: 'spells/:id', component: Spell},
        {path: 'thermal-clips', component: ThermalClips},
        {path: 'weapons', component: Weapons},
        {path: 'weapons/:id', component: Weapon}
      ]
    },
    {path: '/rules', component: Default,
      children: [
        {path: 'combat', component: Combat},
        {path: 'equipment', component: Equipment},
        {path: 'armor', component: Armor},
        {path: 'general', component: General},
        {path: 'paragon-and-renegade', component: ParagonRenegade},
        {path: 'spellcasting', component: Spellcasting}
      ]
    }
  ]
});

import store from './store';

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h('router-view')
});
