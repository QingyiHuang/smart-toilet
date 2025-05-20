import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/src/pages/index/index'
import Guide from '@/src/pages/guide/Guide'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(Router)

export const staticRoutes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    meta: { deep: 0 }
  },
  {
    path: '/guide',
    name: 'guide',
    component: Guide,
    meta: { deep: 1 }
  }
]

const router = new Router({
  mode: 'hash',
  routes: staticRoutes
})

router.beforeEach((to, from, next) => {
  to.meta.cache = to.query.cache || true
  Vue.prototype.$direction = to.meta.deep >= from.meta.deep ? 'left' : 'right'
  next()
})

export default router
