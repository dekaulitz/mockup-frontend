<template>
  <div>
    <app-breadcrumb :currentBreadCrumb="breadcrumbs"/>
    <div class="card content-box">
      <div class="card-header">
        <div class="float-left"><h4>{{title}}</h4></div>
        <div v-show="hasAccess">
          <div class="float-right">
            <router-link :to="('/users/create')" class="btn btn-success">Create New Users</router-link>
          </div>
        </div>
      </div>
      <div class="card-body content-box-body">
        <div>
          <table-widget-searching
            :searchingValue="searching"
            :attributes="searchingProperty"
            @onSearching="onSearching"
            @onReset="onReset" class="col-md-9 float-left"
          />

          <table-widget-sorting :sortingVariable="sortingVariable" @sortingTable="sortingTable"
                                @listingTable="listingTable" class="col-md-3 float-right"/>

        </div>
        <div class="table-responsive">
          <table class="table table-hover table-striped widget-table">
            <thead>
            <tr>
              <th class="header-pagination">
                Action
              </th>
              <th class="header-pagination">
                Mongodb ID
              </th>
              <th class="header-pagination">
                Username
              </th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in rows">
              <td>
                <router-link :to="'/users/detail/'+item.id">
                  <font-awesome-icon icon="edit"/>
                </router-link>
              </td>
              <td>{{item.id}}</td>
              <td>{{item.username}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <table-widget-footer :currentPage="currentPage" :totalPage="totalPage" :totalData="totalData"
                             @previousPage="previousPage" @nextPage="nextPage"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '../../shared/components/breadcrumb.component'
  import Service from '../../service/mock.service'
  //import BasePage from '../shared/base.paging.component'
  import {basePage} from '../../shared/mixins/mixin.page'
  import WidgetSearching from '../../shared/components/table.widget.search.component'
  import WidgetSorting from '../../shared/components/table.widget.sort.component'
  import WidgetFooter from '../../shared/components/table.widget.footer.component'
  import Auth from '../../service/auth.service'

  export default {
    name: "dashboard.page.component",
    mixins: [basePage],
    data: function () {
      return {
        title: "List Users",
        searchingProperty: {
          "username": "Username"
        },
        hasAccess: false,
        searchingAttribute: "",
        targetApi: "/mocks/page",
        query: {
          page: 1,
          size: 10,
          sort: "id,desc"
        },
        rows: [],
        sortingVariable:
          {
            "id,desc": "New Users",
            "id,asc": "Old Users",
          },

        breadcrumbs: [
          {"frontEndUrl": '/users', 'menuName': "Users List"}
        ]
      }
    },
    methods:{
      getData: function () {
        // this.$router.push({path: this.$router.path, query: this.query})
        let querystring = require('querystring');
        Service.getListUsers('?' + querystring.stringify(this.query), (err, response) => {
          if (err != null) {
            alert(err)
          }
          this.rows = response.rows
          this.totalPage = response.pageCount
          this.currentPage = response.page
          this.totalData = response.rowCount
        })
      }
    },
    created() {
      this.getData()
      if (Auth.hasCreateUsersAccess()) this.hasAccess = true
    },
    // mounted:function () {
    //    BasePage.methods.getData(this)
    //   setTimeout(function () {
    //     console.log(this.rows)
    //   },10000)
    // },
    components: {
      "app-breadcrumb": Breadcrumb,
      "table-widget-searching": WidgetSearching,
      "table-widget-sorting": WidgetSorting,
      "table-widget-footer": WidgetFooter
    }
  }
</script>

<style scoped>

</style>
