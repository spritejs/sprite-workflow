import Vue from 'vue'
import Router from 'vue-router'
import demos from '../views/home/routes.js'
Vue.use(Router)


export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('../views/home/index.vue'),
      children: demos
    }
  ]
})
