<template>

</template>

<script>
  import BaseComponent from "./base.component"
  import Service from '../../service/mock.service'
  export default {
    name: "base.paging.component",
    // extend: BaseComponent,
    data: function () {
      return {
        searchingProperty: {},
        searching: "",
        selectedIds: [],
        query: {
          page: 1,
          size: 10,
          sort: ""
        },
        totalPage: "",
        currentPage: "",
        totalData: "",
        breadcrumbs: [],
        sortingVariable: {},
        rows: {}
      }
    },
    props: {
      isModalSubmited: false,
    },
    mounted: function () {
      alert("berak")
      // loaderActivate()
      alert("berak")
      this.getData()
    },
    computed: {
      selectedAll: {
        get: function () {
          return this.rows ? this.selectedIds.length === this.rows.length : false;
        },
        set: function (value) {
          let selected = []
          if (value) {
            this.rows.forEach(function (data) {
              selected.push(data.ID);
            });
          }
          this.selectedIds = selected
        }
      }
    },
    watch: {
      isModalSubmited: function (value) {
        if (value)
          this.processDelete()
      }
    },
    methods: {
      getData: function () {

        this.$router.push({path: this.$router.path, query: this.query})
        let querystring = require('querystring');
        Service.getMockPage('?' + querystring.stringify(this.$route.query),(err,response)=>{
          if(err!=null){
            alert(err)
          }
          this.rows = response.rows
          this.totalPage = response.pageCount
          this.currentPage = response.page
          this.totalData = response.rowCount
        })
        // HttpReq.service("get", this.targetApi + '?' + querystring.stringify(this.$route.query), {}, this).then(response => {
        //
        //   global.loaderDeactivate()
        // }).catch(error => {
        //   this.$store.commit('displayErrorMessage', true)
        //   this.$store.commit('message', error.message)
        //   global.loaderDeactivate()
        // })
        // this.selectedIds = []
      },
      sortingTable: function (option) {
        this.query.sort = option
        this.query.page = 1
        this.getData();
      },
      listingTable: function (option) {
        this.query.size = option
        this.query.page = 1
        this.getData();
      },
      previousPage: function (option) {
        this.query.page = option
        this.getData();
      },
      nextPage: function (option) {
        this.query.page = option
        this.getData()
      },
      onReset: function () {
        delete this.query.q
        this.getData()
      },
      onSearching: function (attribute, value) {
        this.query.q = attribute + ',' + value
        this.query.page = 1
        this.getData()
      },
      onDelete: function () {
        $("#generalModal").modal('show')
        this.$emit("modalProperties", {
          title: "Delete Approval ",
          message: "Are you sure want to delete this data?",
          submit: true,
          type: 1,
        })
      },
      processDelete: function () {
        let ids = this.selectedIds.toString();
        if (!ids) {
          this.$emit("modalProperties", {
            title: "Warning ",
            message: "There is no data selected, please select data first !",
            submit: true,
            type: 2,
          })
        } else {
          $("#generalModal").modal('hide')
          HttpReq.service("get", this.targetApi + '/' + ids + '/delete').then(response => {
            this.$store.dispatch('displaySuccessMessage', true)
            this.$store.dispatch('message', response.meta.message)
            this.getData()

          }).catch(error => {
            this.$store.commit('displayErrorMessage', true)
            this.$store.commit('message', error.message)
          })

        }

      }
    }
  }
</script>

<style scoped>

</style>
