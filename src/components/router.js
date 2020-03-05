import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './dashboard.component'
import ListMocks from './dashboard.child/dashboard.page.component'
import MockDetail from './dashboard.child/mock.detail.component'
import CreateMock from './dashboard.child/mock.create.component'
import SwaggerMock from './dashboard.child/mock.swagger.component'

Vue.use(Router)
export default new Router({
  mode: 'history',
  name: "router",
  routes: [
    {
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
          path: '/swagger',
          name: "swagger",
          component: SwaggerMock
        }
      ]
    },


    // children: [
    //   {
    //     path: '',
    //     name: 'dashboard',
    //     component: Dashboard
    //   },
    //   {
    //     path: 'project',
    //     name: 'project-list',
    //     component: ProjectList
    //   },
    //   {
    //     path: 'profile',
    //     name: 'profile',
    //     component: ProfileUser
    //   },
    //   {
    //     path: 'project/:id',
    //     component: ProjectDetail,
    //     children: [
    //       {
    //         path: '/',
    //         name: 'project-information',
    //         component: ProjectInfo
    //
    //       }
    //     ]
    //   },
    // ]

    // {
    //   path: '*',
    //   name: 'not-found',
    //   component: NotFound
    // }
  ]

})
