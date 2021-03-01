import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component:()=>import('../views/layout'),
    redirect:"/index",
    children:[
      {
        path:'/index',
        name:"index",
        component:()=>import('@/views/index/index')
      },
      {
        path:"/account/all",
        name:"account_all",
        meta:{bread:["账户管理","所有人员"]},
        component:()=>import("@/views/account/all.vue")
      },
      {
        path:'/product/all',
        name:'product_all',
        meta:{bread:["产品管理","全部产品"],keepAlive:true},
        component:()=>import('@/views/product/all')
      },
      {
        path:'/product/detail',
        name:'product_detail',
        meta:{bread:["产品管理","全部产品","详细页面"]},
        component:()=>import("@/views/product/detail")
      },
      {
        path:"/orders/all",
        name:'orders_all',
        meta:{bread:["订单管理","所有订单"]},
        component:()=>import('@/views/orders/all'),
        children:[
          {
            path:"tab1",
            name:'tab1',
            component:()=>import('@/views/orders/tabs1')
          },
          {
            path:"tab2",
            name:'tab2',
            component:()=>import('@/views/orders/tabs2')
          }
        ]
      },
      {
        path:"/customer/info",
        name:"customer_info",
        meta:{bread:["客户管理","基本信息"]},
        component:()=>import('@/views/customer/info')
      },
      {
        path:"/todo",
        name:"todo",
        component:()=>import("@/views/todo/todo")
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
  },
  {
    path:'*',
    name:"404",
    component:()=>import('@/views/404')
  }
]

const router = new VueRouter({
  routes
});


export default router
