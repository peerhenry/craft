import getters from '@s/modules/activity/getters.js'
import mutations from '@s/modules/activity/mutations.js'
import actions from '@s/modules/activity/actions.js'
import { idleActivity } from '@s/modules/activity/activity-types.js'

export const state = {
  craftQueue: [],
  currentActivity: idleActivity,
  craftProgress: 0,
  interval: null,
  timeout: null,
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
