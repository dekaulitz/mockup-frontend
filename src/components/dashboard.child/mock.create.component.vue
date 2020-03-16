<template>
  <div>
    <app-breadcrumb :currentBreadCrumb="breadcrumbs"/>
    <div class="container-fluid content">
      <div class="row ">
        <div class="col-md-12 no-padding">
        <div class="card content-box ">
          <div class="card-header">
            <div class="float-left"><h4>Create New Mockup</h4></div>
            <div class="float-right">
              <router-link :to="('/')" class="btn btn-success">Back</router-link>
              <button type="button" class="btn btn-primary" v-on:click="generateSwagger()">Validate Swagger</button>
              <button type="button" class="btn btn-primary" v-on:click="storeMockup()">Save Mockup</button>
            </div>
          </div>
          <div class="card-body content-box-body">
            <div class="row">
              <div class="col-md-6">
                <div id="jsoneditor-create" style="height: 650px;width: 100%"></div>
              </div>
              <div class="col-md-6">
                <div class="card">
                  <div id="swagger-ui-create"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></div>
</template>

<script>
  import Breadcrumb from '../../shared/components/breadcrumb.component'
  import Service from '../../service/mock.service'
  import 'jsoneditor/dist/jsoneditor.min.css'
  import JSONEditor from 'jsoneditor/dist/jsoneditor.min'

  export default {
    name: "mock.detail.component",
    data: function () {
      return {
        mockDetail: {
          "title": "Mockup title",
          "description": "Mock description",
          "spec": {}
        },
        dataEditor: {},
        swagggerMockUrl: "",
        breadcrumbs: [
          {"frontEndUrl": '/', 'menuName': "Mockup List"},
          {
            "frontEndUrl": this.$router.currentRoute.fullPath,
            'menuName': "Create New Mockup "
          },
        ],

      }
    }, components: {
      "app-breadcrumb": Breadcrumb,
    },
    methods: {
      generateSwagger:function(){
        const swaggerUi = require("./../../assets/js/swagger-ui-bundle")
        const preset = require("./../../assets/js/swagger-ui-standalone-preset")
        // Begin Swagge//sdasd//r UI call region
        const ui = swaggerUi({
          spec: this.dataEditor.get().spec,
          dom_id: '#swagger-ui-create',
          deepLinking: true,
          presets: [
            swaggerUi.presets.apis,
            preset
          ]
        })
      },
      getData: function () {

      },
      storeMockup: function () {
        console.log(this.dataEditor.get())
        Service.storeMock(this.dataEditor.get(), (err, response) => {
          if (err != null) {
            alert(err)
            setTimeout(() => {
              this.$router.push({name: "listmock"})
            }, 1000)
          }
          if (err != null) {
            alert(err)
            setTimeout(() => {
              this.$router.push({name: "listmock"})
            }, 1000)
          }
          alert("Mockup ID" + response.data.id + " Created !")
          setTimeout(() => {
            this.$router.push({name: "listmock"})
          }, 1000)
        })
      }
    },
    created: function () {
    },
    mounted() {
      const options = {
        modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
        name: "jsonContent",
      };
      const container = document.getElementById("jsoneditor-create")
      const editor = new JSONEditor(container, options)
      editor.set(this.mockDetail)
      this.dataEditor = editor
      this.generateSwagger()
    }

  }
</script>

<style scoped>

</style>

