import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sygl',
      component: () => import('../views/user/sygl.vue'),
      children: [
        {
          path: 'uIndex',
          name: 'uIndex',
          component: () => import('../views/user/uIndex.vue')
        },
        {
          path: 'uIntroduction',
          name: 'uIntroduction',
          component: () => import('../views/user/uIntroduction.vue')
        },
        {
          path: 'uNotice',
          name: 'uNotice',
          component: () => import('../views/user/uNotice.vue')
        },
        {
          path: 'uExperience',
          name: 'uExperience',
          component: () => import('../views/user/uExperience.vue')
        },
        {
          path: 'uResource',
          name: 'uResource',
          component: () => import('../views/user/uResource.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/adIndex',
      name: 'adIndex',
      component: () => import('../views/admin/adIndex.vue'),
      children: [
        {
          path: 'adUser',
          name: 'adUser',
          component: () => import('../views/admin/adUser.vue')
        },
        {
          path: 'adAccount',
          name: 'adAccount',
          component: () => import('../views/admin/adAccount.vue')
        },
        {
          path: 'adNotice',
          name: 'adNotice',
          component: () => import('../views/admin/adNotice.vue')
        },
        {
          path: 'adExperienceContent',
          name: 'adExperienceContent',
          component: () => import('../views/admin/adExperienceContent.vue')
        },
        {
          path: 'adScore',
          name: 'adScore',
          component: () => import('../views/admin/adScore.vue')
        },
        {
          path: 'adResource',
          name: 'adResource',
          component: () => import('../views/admin/adResource.vue')
        }
      ]
    }
  ]
})
