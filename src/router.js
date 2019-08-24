import Vue from 'vue'
import Router from 'vue-router'
import GatheringPage from '@/pages/GatheringPage.vue'
import CraftingPage from '@/pages/CraftingPage.vue'
import ToolsPage from '@/pages/ToolsPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'gathering',
      component: GatheringPage,
    },
    {
      path: '/crafting',
      name: 'crafting',
      component: CraftingPage,
    },
    {
      path: '/tools',
      name: 'tools',
      component: ToolsPage,
    },
  ],
})
