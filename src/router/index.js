import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/login/index'

Vue.use(Login)
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginIndex',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
