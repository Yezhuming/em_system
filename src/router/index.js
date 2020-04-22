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
          component: () => import('../views/user/uIndex.vue'),
          meta: {
            requireLogin: false
          }
        },
        {
          path: 'uIntroduction',
          name: 'uIntroduction',
          component: () => import('../views/user/uIntroduction.vue'),
          meta: {
            requireLogin: false
          }
        },
        {
          path: 'uNotice',
          name: 'uNotice',
          component: () => import('../views/user/uNotice.vue'),
          children: [
            {
              path: 'uNoticeList/:type',
              name: 'uNoticeList',
              component: () => import('../views/user/uNoticeList')
            },
            {
              path: 'uNoticeDetails',
              name: 'uNoticeDetails',
              component: () => import('../views/user/uNoticeDetails')
            }
          ],
          meta: {
            requireLogin: false
          }
        },
        {
          path: 'uExperiment',
          name: 'uExperiment',
          component: () => import('../views/user/uExperiment.vue'),
          children: [
            {
              path: 'uExperimentList/:type',
              name: 'uExperimentList',
              component: () => import('../views/user/uExperimentList'),
              meta: {
                requireLogin: true
              }
            }
          ],
          meta: {
            requireLogin: true
          }
        },
        {
          path: 'uResource',
          name: 'uResource',
          component: () => import('../views/user/uResource.vue'),
          children: [
            {
              path: 'uResourceList/:type',
              name: 'uResourceList',
              component: () => import('../views/user/uResourceList')
            }
          ],
          meta: {
            requireLogin: false
          }
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
          path: 'adArticleDetails',
          name: 'adArticleDetails',
          component: () => import('../views/admin/adArticleDetails.vue')
        },
        {
          path: 'adExperiment',
          name: 'adExperiment',
          component: () => import('../views/admin/adExperiment.vue')
        },
        {
          path: 'adScore',
          name: 'adScore',
          component: () => import('../views/admin/adScore.vue')
        },
        {
          path: 'adScoreDetails',
          name: 'adScoreDetails',
          component: () => import('../views/admin/adScoreDetails.vue')
        },
        {
          path: 'adResource',
          name: 'adResource',
          component: () => import('../views/admin/adResource.vue')
        },
        {
          path: 'adAttendance',
          name: 'adAttendance',
          component: () => import('../views/admin/adAttendance.vue')
        },
        {
          path: 'adAttendanceDetails',
          name: 'adAttendanceDetails',
          component: () => import('../views/admin/adAttendanceDetails.vue')
        }
      ]
    }
  ]
})
