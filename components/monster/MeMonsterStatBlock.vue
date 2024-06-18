<template>
  <div v-if="!$fetchState.pending">
    <!-- TITLE -->
    <me-monster-title v-if="title" :item="stats" />
    <v-row>
      <v-col cols="12">
        <!-- BASE STATS -->
        <me-hr />
        <me-stat-list>
          <me-stat-list-item :label="$t('ac_title')">
            {{ stats.ArmorClass }} <span v-if="stats.ArmorType">({{ stats.ArmorType }})</span>
          </me-stat-list-item>
          <me-stat-list-item :label="$t('hit_points_title')">
            {{ stats.HitPoints }} ({{ stats.HitPointRoll }})
          </me-stat-list-item>
          <me-stat-list-item :label="$t('speed_title')">
            {{ stats.Speeds }}
          </me-stat-list-item>
        </me-stat-list>

        <!-- ABILITIES -->
        <me-hr />
        <v-row>
          <v-col
            v-for="(score, ability) in abilityScores"
            :key="ability"
            cols="6"
            sm="2"
            class="text-center"
          >
            <div class="text-button">
              {{ $t(`abilities.${ability}.abbr`) }}
            </div>
            <div class="text-body-2">
              {{ score }} ({{ abilityBonus(score) }})
            </div>
          </v-col>
        </v-row>

        <!-- Skills --->
        <me-hr />
        <me-stat-list>
          <me-stat-list-item v-if="savingThrows" :label="$t('saving_throws_title')">
            {{ savingThrows }}
          </me-stat-list-item>
          <me-stat-list-item v-if="skills" :label="$t('skills_title')">
            {{ skills }}
          </me-stat-list-item>
          <me-stat-list-item v-if="vulnerabilities" :label="$t('npc.damage_vulnerabilities')">
            {{ vulnerabilities }}
          </me-stat-list-item>
          <me-stat-list-item v-if="resistances" :label="$t('npc.damage_resistances')">
            {{ resistances }}
          </me-stat-list-item>
          <me-stat-list-item v-if="immunities" :label="$t('npc.damage_immunities')">
            {{ immunities }}
          </me-stat-list-item>
          <me-stat-list-item v-if="conImmunities" :label="$t('npc.condition_immunities')">
            {{ conImmunities }}
          </me-stat-list-item>
          <me-stat-list-item v-if="senses" :label="$t('senses_title')">
            {{ senses }}
          </me-stat-list-item>
          <me-stat-list-item v-if="languages" label="Languages">
            {{ languages }}
          </me-stat-list-item>
          <me-stat-list-item :label="$t('cr_title')">
            {{ stats.ChallengeRating }} ({{ stats.ExperiencePoints }} XP)
          </me-stat-list-item>
        </me-stat-list>

        <me-hr />
        <div v-if="features.length">
          <me-npc-set-title>
            Traits
          </me-npc-set-title>
          <div v-for="(feature, index) in features" :key="`feature-${index}`">
            <me-monster-feature :feature="feature" :monster-name="stats.Name" />
            <me-monster-powercasting-list v-if="feature.casting" :feature="feature" :monster-name="stats.Name" />
          </div>
        </div>

        <!-- ACTIONS --->
        <div v-if="actions.length">
          <me-npc-set-title>
            {{ $t('npc.actions_title') }}
          </me-npc-set-title>
          <div v-for="(action, actionIndex) in actions" :key="`action-${actionIndex}`">
            <me-monster-feature :feature="action" :monster-name="stats.Name" />
          </div>
        </div>

        <!-- LEGENDARY ACTIONS -->
        <div v-if="legendary.length">
          <me-npc-set-title>
            {{ $t('npc.legendary_title') }}
          </me-npc-set-title>
          <p class="body-2">
            The {{ stats.Name }} can take 3 legendary actions, choosing from the options below.
            Only one legendary action option can be used at a time and only at the end of another creature's turn.
            The {{ stats.Name }} regains spent legendary actions at the start of their turn.
          </p>
          <p v-for="(lgAction, lgIndex) in legendary" :key="`legendary-${lgIndex}`">
            <me-monster-feature :feature="lgAction" :monster-name="stats.Name" />
          </p>
        </div>

        <!-- REACTIONS -->
        <div v-if="reactions.length">
          <me-npc-set-title>
            {{ $t('npc.reactions_title') }}
          </me-npc-set-title>
          <p v-for="(reaction, reactionIndex) in reactions" :key="`reaction-${reactionIndex}`">
            <me-monster-feature :feature="reaction" :monster-name="stats.Name" />
          </p>
        </div>
      </v-col>

      <!--
      <v-col v-if="stats.image" cols="12" md="4">
        <v-img
          :src="stats.image"
          :max-height="$vuetify.breakpoint.smAndDown ? 150 : null"
          :contain="$vuetify.breakpoint.smAndDown"
        />
      </v-col>
      -->
      <v-col v-if="stats.SectionText || stats.FlavorText" cols="12">
        <v-card outlined>
          <v-card-title>Description</v-card-title>
          <v-card-text>
            <p v-if="stats.FlavorText">
              {{ stats.FlavorText }}
            </p>
            <p v-if="stats.SectionText">
              {{ stats.SectionText }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { AbilityScoreBonus } from '~/mixins/abilityScoreBonus'

export default {
  name: 'MeMonsterStatBlock',
  mixins: [AbilityScoreBonus],
  props: {
    stats: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: [String, Boolean],
      default: false
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_LOTS', ['skills', 'conditions'])
  },
  computed: {
    abilityScores () {
      return {
        str: this.stats.Strength,
        dex: this.stats.Dexterity,
        con: this.stats.Constitution,
        int: this.stats.Intelligence,
        wis: this.stats.Wisdom,
        cha: this.stats.Charisma
      }
    },
    savingThrows () {
      if (!this.stats.SavingThrowsJson || this.stats.SavingThrowsJson[0] === '-' || this.stats.SavingThrowsJson === '') {
        return null
      }
      return this.stats.SavingThrowsJson.join(', ')
    },
    skills () {
      if (!this.stats.SkillsJson || this.stats.SkillsJson[0] === '-' || this.stats.SkillsJson === '') {
        return null
      }
      return this.stats.SkillsJson.join(', ')
    },
    senses () {
      if (!this.stats.SensesJson || this.stats.SensesJson[0] === '-' || this.stats.SensesJson === '') {
        return null
      }
      return this.stats.SensesJson.join(', ')
    },
    languages () {
      if (!this.stats.LanguagesJson || this.stats.LanguagesJson[0] === '-' || this.stats.LanguagesJson === '') {
        return null
      }
      return this.stats.LanguagesJson.join(', ')
    },
    resistances () {
      return this.getIrvString(this.stats.DamageResistancesParsedJson, this.stats.DamageResistancesOtherJson)
    },
    vulnerabilities () {
      return this.getIrvString(this.stats.DamageVulnerabilitiesParsedJson, this.stats.DamageVulnerabilitiesOtherJson)
    },
    immunities () {
      return this.getIrvString(this.stats.DamageImmunitiesParsedJson, this.stats.DamageImmunitiesOtherJson)
    },
    conImmunities () {
      return this.getIrvString(this.stats.ConditionImmunitiesParsedJson, this.stats.ConditionImmunitiesOtherJson)
    },
    features () {
      return this.stats.BehaviorsJson.filter(i => i.MonsterBehaviorType === 'Trait').map((i) => {
        const [namePart] = this.stats.Name.split(' ')
        const castingRegexSearch = new RegExp(`\\s{1,2}${namePart}.*?asting.*?\\)`, 'gi')
        if (i.DescriptionWithLinks.match(castingRegexSearch)) {
          return {
            ...i,
            casting: true
          }
        } else {
          return i
        }
      })
    },
    actions () {
      return this.stats.BehaviorsJson.filter(i => i.MonsterBehaviorType === 'Action')
    },
    legendary () {
      return this.stats.BehaviorsJson.filter(i => i.MonsterBehaviorType === 'Legendary')
    },
    reactions () {
      return this.stats.BehaviorsJson.filter(i => i.MonsterBehaviorType === 'Reaction')
    }
  },
  methods: {
    abilityBonus (score) {
      const abilityScoreBonus = this.abilityScoreBonus(score)
      return abilityScoreBonus >= 0 ? `+${abilityScoreBonus}` : abilityScoreBonus
    },
    getIrvString (parsed, other) {
      const array = []
      if (parsed) {
        if (Array.isArray(parsed)) {
          array.push(...parsed)
        }
        if (typeof parsed === 'string' && parsed !== '') {
          array.push(parsed)
        }
      }
      if (other) {
        if (Array.isArray(other)) {
          array.push(...other)
        }
        if (typeof other === 'string' && other !== '') {
          array.push(other)
        }
      }
      return array.length ? array.join(', ') : null
    }
  }
}
</script>
