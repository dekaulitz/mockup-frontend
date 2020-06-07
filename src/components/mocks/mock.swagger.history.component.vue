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
  import Auth from "../../service/auth.service";

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
          alert(err.response.data.response_message != null ? err.response.data.response_message : err.response.data);
          if (Auth.shouldLogout(err)) this.$router.push({name: 'Login'});
          else
            setTimeout(() => {
              this.$router.push({name: "listmock"})
            }, 1000)
        } else {
          console.log(response.data);
          // const swaggerUi = require("../../assets/js/swagger-ui-bundle");
          // const preset = require("../../assets/js/swagger-ui-standalone-preset");
          // Begin Swagge//sdasd//r UI call region
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


