import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Type from '../views/Type.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/type/:id',
    name: 'Type',
    component: Type
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
