import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './dashboard.component'
import ListMocks from './dashboard.child/dashboard.page.component'
import ListUsers from './dashboard.child/dashboard.users.component'
import UsersCreate from './dashboard.child/user.create.component'
import UsersDetail from './dashboard.child/user.detail.component'
import MockDetail from './dashboard.child/mock.detail.component'
import CreateMock from './dashboard.child/mock.create.component'
import SwaggerMock from './dashboard.child/mock.swagger.component'
import Login from './login.component'

Vue.use(Router)
export default new Router({
  name: "router",
  routes: [
    {
      path: "/login",
      component: Login,
      name: 'Login'
    },
    {
      path: '/',
      component: Dashboard,
      name: 'dashboard',
      beforeEnter: function (to, from, next) {
        let isAuthenticated = window.localStorage.getItem(constants.AUTHORIZATION);
        if ( isAuthenticated===null) return next({name: 'Login'})
        else {
          next()
        }
      },
      children: [
        {
          path: '',
          name: 'listmock',
          component: ListMocks
        },
        {
          path: 'users',
          name: 'listusers',
          component: ListUsers
        },
        {
          path: 'users/create',
          name: 'createuser',
          component: UsersCreate
        },
        {
          path: 'users/detail/:id',
          name: 'userdetail',
          component: UsersDetail
        },
        {
          path: 'detail/:id',
          name: 'mockdetail',
          component: MockDetail
        },
        ,
        {
          path: 'create',
          name: 'createmock',
          component: CreateMock
        },
        {
          path: 'swagger/:id',
          name: "swagger",
          component: SwaggerMock
        }
      ]
    },
  ],


})
