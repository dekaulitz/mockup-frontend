import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './dashboard.component'
import ListMocks from './dashboard.child/dashboard.page.component'
import MockDetail from './dashboard.child/mock.detail.component'
import CreateMock from './dashboard.child/mock.create.component'
import SwaggerMock from './dashboard.child/mock.swagger.component'
import Login from './login.component'

Vue.use(Router)
export default new Router({
  name: "router",
  routes: [
    {
      path:"/login",
      component:Login,
      name:'Login'
    },
    {
      beforeEnter:(to,from,next)=>{
        let isAuthenticated=window.localStorage.getItem(constants.AUTHORIZATION);
        if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
        else {
          next()
        }
      },
      path: '/',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'listmock',
          component: ListMocks
        },
        {
          path: '/detail/:id',
          name: 'mockdetail',
          component: MockDetail
        },
        ,
        {
          path: '/create',
          name: 'createmock',
          component: CreateMock
        },
        {
          path: '/swagger/:id',
          name: "swagger",
          component: SwaggerMock
        }
      ]
    },
  ],


})
