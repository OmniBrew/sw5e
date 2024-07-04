import Vue from 'vue'

import article from './article'
import featureTitle from './featureTitle'
import formatDate from './formatDate'
import groupDigits from './groupDigits'
import listOfChoices from './listOfChoices'
import removeActionId from './removeActionId'
import titlecase from './titlecase'
import fidtt from './fidtt'
import getImage from './getImage'
import propertiesString from './propertiesString'

const customFilters = {
  article,
  featureTitle,
  formatDate,
  groupDigits,
  listOfChoices,
  removeActionId,
  titlecase,
  fidtt,
  getImage,
  propertiesString
}

const Filters = {
  install (Vue) {
    for (const filter in customFilters) {
      if (Object.prototype.hasOwnProperty.call(customFilters, filter)) {
        Vue.filter(filter, customFilters[filter])
      }
    }
  }
}

Vue.use(Filters)
