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
        <div id="swagger-ui-history"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import Breadcrumb from '../../shared/components/breadcrumb.component'
  import Service from '../../service/mock.service'

  export default {
    name: "mock.swagger.history.component",
    data: function () {
      {
        return {
          dataEditor: {},
          breadcrumbs: [
            {"frontEndUrl": '/', 'menuName': "Mockup List"},
            {
              "frontEndUrl": '/detail/' + this.$router.currentRoute.params.id,
              'menuName': "Detail " + this.$router.currentRoute.params.id
            },
            {
              "frontEndUrl": this.$router.currentRoute.fullPath,
              'menuName': "History " + this.$router.currentRoute.params.historyId
            }
          ],
        }
      }
    },
    beforeMount() {
    },
    mounted() {
      let mockId = this.$router.currentRoute.params.id;
      let historyId = this.$router.currentRoute.params.historyId;
      Service.getSpecHistory(mockId, historyId, (err, response) => {
        if (err != null) {
          this.validateResponseHandler(err)
        } else {
          const b = SwaggerUIBundle({
            dom_id: '#swagger-ui-history',
            spec: response.data.swagger,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
          })
        }
      })

    },
    components: {
      "app-breadcrumb": Breadcrumb
    }
  }
</script>


