import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import UserGuideView from '../views/UserGuideView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import NotFoundView from '../views/NotFoundView.vue'

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
    path: '/privacy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicyView,
    meta: { title: 'Privacy Policy — DEKA ERP' },
  },
  {
    path: '/sitemap',
    name: 'SiteMap',
    component: () => import('../views/SiteMapView.vue'),
    meta: { title: 'Site Map — DEKA ERP' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: 'Page Not Found — DEKA ERP' },
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
