<template>
  <div>
    <app-breadcrumb :currentBreadCrumb="breadcrumbs"/>
    <div class="card content-box">
      <div class="card-header">
        <div class="float-left"><h4>{{title}}</h4></div>
        <div class="float-right">
          <router-link :to="('/create')" class="btn btn-success">Create New Mockup</router-link>
          <!--<button class="btn btn-danger" v-on:click="onDelete"><span class="fa fa-close"></span> Trash-->
          <!--</button>-->
          <!--<a class="btn btn-info" href="#"><span class="fa fa-file-excel-o"></span> Export</a>-->
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
                Title
              </th>
              <th class="header-pagination">
                Spec Title
              </th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in rows">
              <td>
                <router-link :to="'/detail/'+item.id">
                  <font-awesome-icon icon="edit"/>
                </router-link>
              </td>

              <td>{{item.id}}</td>
              <td>{{item.title}}</td>
              <td v-if="item.spec.info!=null">{{item.spec.info.title}}</td>
              <td v-else></td>
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

  export default {
    name: "dashboard.page.component",
    mixins: [basePage],
    data: function () {
      return {
        title: "List Swagger Mockup",
        searchingProperty: {
          "title": "Title"
        },
        searchingAttribute:"",
        targetApi: "/mocks/page",
        query: {
          page: 1,
          size: 10,
          sort:"id,desc"
        },
        rows: [],
        sortingVariable:
          {
            "id,desc": "New Project",
            "id,asc": "Old Project",
          },

        breadcrumbs: [
          {"frontEndUrl": '/', 'menuName': "Mockup List"}
        ]
      }
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
