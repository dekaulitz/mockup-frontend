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
                <button class="btn btn-primary" type="button" v-bind:class="saveButton" v-on:click="storeMockup()">Save
                  Mockup
                </button>
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
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '../../shared/components/breadcrumb.component'
  import Service from '../../service/mock.service'
  import 'jsoneditor/dist/jsoneditor.min.css'
  import {mixGeneral} from '../../shared/mixins/mixin.general'

  export default {
    name: "mock.detail.component",
    mixins: [mixGeneral],
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
      generateSwagger: function () {
        const ui = SwaggerUIBundle({
          spec: this.dataEditor.get().spec,
          dom_id: '#swagger-ui-create',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ]
        })
      },
      getData: function () {

      },
      storeMockup: function () {
        this.saveButton = "disabled";
        Service.storeMock(this.dataEditor.get(), (err, response) => {
          this.saveButton = "enabled";
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            this.$emit("pushMessage", "alert-info", "Mock created !");
            setTimeout(() => {
              this.$router.push({name: "listmock"})
            }, 1000)
          }
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
      const container = document.getElementById("jsoneditor-create");
      const editor = new global.constants.JSONEditor(container, options);
      editor.set(this.mockDetail);
      this.dataEditor = editor;
      this.generateSwagger()
    }

  }
</script>

<style scoped>

</style>

