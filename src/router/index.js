import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/adminIndex.vue'),
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/admin/user.vue')
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../views/admin/account.vue')
        },
        {
          path: 'notice',
          name: 'notice',
          component: () => import('../views/admin/notice.vue')
        },
        {
          path: 'experienceContent',
          name: 'experienceContent',
          component: () => import('../views/admin/experienceContent.vue')
        },
        {
          path: 'score',
          name: 'score',
          component: () => import('../views/admin/score.vue')
        },
        {
          path: 'resource',
          name: 'resource',
          component: () => import('../views/admin/resource.vue')
        }
      ]
    }
  ]
})
