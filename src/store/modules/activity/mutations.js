import Vue from 'vue'
import { idleActivity } from '@s/modules/activity/activity-types.js'

const mutations = {
  SET_CURRENT_ACTIVITY: (state, activity) =>
    Vue.set(state, 'currentActivity', activity),
  SET_IDLE: state => Vue.set(state, 'currentActivity', idleActivity),
  SET_INTERVAL: (state, interval) => (state.interval = interval),
  SET_TIMEOUT: (state, timeout) => (state.timeout = timeout),
  RESET_CRAFT_PROGRESS: state => (state.craftProgress = 0),
  SET_CRAFT_PROGRESS: (state, progress) => (state.craftProgress = progress),
  ENQUEUE_CRAFT: (state, recipe) => {
    state.craftQueue.push(recipe)
  },
  DEQUEUE_CRAFT: state => state.craftQueue.shift(),
  QUEUE_REMOVE_CRAFT: (state, index) => state.craftQueue.splice(index, 1),
}

export default mutations
