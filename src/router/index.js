import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ScoresTable from '@/components/ScoresTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/scores',
      name: 'scores-table',
      component: ScoresTable
    }
  ]
})
