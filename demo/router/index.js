import Vue from 'vue'
import Router from 'vue-router'

// import docs from '../views/api/routes.js'
// import demos from '../views/demo/routes.js'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('../views/home/index.vue')
    },

    // {
    //   path: '/api',
    //   component: () => import('../views/api/index.vue'),
    //   children: docs
    // },

    // {
    //   path: '/demo',
    //   component: () => import('../views/demo/index.vue'),
    //   children: demos
    // },
  ]
})
