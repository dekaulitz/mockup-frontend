<template>
  <div>
    <app-breadcrumb :currentBreadCrumb="breadcrumbs"/>
    <div class="card content-box">
      <div class="card-header">
        <div class="float-left"><h4>Swagger</h4></div>
        <div class="float-right">
          <router-link :to="('/')" class="btn btn-success">Mockup List</router-link>
        </div>
      </div>
      <div class="card-body content-box-body">
        <div id="swagger-ui"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import Breadcrumb from '../../shared/components/breadcrumb.component'

  export default {
    name: "mock.swagger.component",
    data: function () {
      {
        return {
          breadcrumbs: [
            {"frontEndUrl": '/', 'menuName': "Mockup List"},
            {
              "frontEndUrl": '/detail/'+this.$router.currentRoute.params.id,
              'menuName': "Detail " + this.$router.currentRoute.params.id
            },
            {
              "frontEndUrl": this.$router.currentRoute.fullPath,
              'menuName': "Swagger  "
            }
          ],
        }
      }
    },
    beforeMount() {
    },
    mounted() {
      let mockId = this.$router.currentRoute.params.id
      const swaggerUi = require("./../../assets/js/swagger-ui-bundle")
       const preset = require("./../../assets/js/swagger-ui-standalone-preset")
      // Begin Swagge//sdasd//r UI call region
      const ui = swaggerUi({
        url: HOST_API + "/mocks/" + mockId + "/spec",
        dom_id: '#swagger-ui',
        presets: [
          swaggerUi.presets.apis,
          preset
        ],
        plugins: [
          swaggerUi.plugins.DownloadUrl
        ],
      })

    },
    components: {
      "app-breadcrumb": Breadcrumb
    }
  }
</script>


