import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
{
  path:'/login',
  name:'login',
  component: () => import('@/views/Login')
 
},
{
  path:'/',
  component: () => import('@/views/tt'),
  children:[{
  path:'/qa',
  component: () => import('@/views/qa/')
  },
  {
  path:'/video',
  component: () => import('@/views/video/')
  },
  {
  path:'/my',
  component: () => import('@/views/my/')
  },
  {
  path:'/',
  component: () => import('@/views/home/')
  }
]
  
}
] 
const router = new VueRouter({
  routes
})

export default router 
