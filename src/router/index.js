import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Splash from '@/components/splash/splash'
import Data from '../data/data';

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (!Data.collection.length && to.name !== 'Splash') {
    next('/');
  } else {
    next()
  }
});  
export default router;