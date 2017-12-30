export const Ac = {
  methods: {
    setGruntAc(config, grunt) {
      const acModArray = [-2, -1, -1, 0, +1, +1, +2];

      if (config.race.id === 'geth' || config.race.id === 'unshackled-ai') {
        grunt.ac = 13 + this.abilityScoreBonus(grunt.abilityScores.dex);
        return;
      }

      if (config.sc.id === 'adept' || config.sc.id === 'infiltrator') {
        acModArray.push(-2);
        acModArray.push(-2);
        acModArray.push(-3);
        acModArray.push(-3);
      } else if (config.sc.id === 'soldier' || config.sc.id === 'sentinel') {
        acModArray.push(+2);
        acModArray.push(+2);
        acModArray.push(+3);
        acModArray.push(+3);
      } else {
        acModArray.push(0);
        acModArray.push(0);
      }

      const acMod = this.randomValue(acModArray);
      grunt.ac = config.cr.acDc + acMod;
    }
  }
};
