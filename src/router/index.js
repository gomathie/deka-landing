import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import UserGuideView from '../views/UserGuideView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingView,
  },
  {
    path: '/guide',
    name: 'UserGuide',
    component: UserGuideView,
    children: [
      {
        path: ':section?',
        name: 'GuideSection',
        component: UserGuideView,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
