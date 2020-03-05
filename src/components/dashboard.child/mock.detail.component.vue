<template>
  <div>
    <app-breadcrumb :currentBreadCrumb="breadcrumbs"/>
    <div class="container-fluid content">
      <div class="row ">
        <div class="col-md-12 no-padding">
        <div class="card content-box">
          <div class="card-header">
            <div class="float-left"><h4>Edit Mock {{mockDetail.title}} | {{mockDetail.id}} </h4></div>
            <div class="float-right">
              <router-link :to="('/')" class="btn btn-success">Back</router-link>
              <button type="button" class="btn btn-primary" v-on:click="updateMocks()">Update Mocks</button>
              <router-link :to="('/swagger/'+mockDetail.id)" class="btn btn-success">
              <span class="fa fa-undo"></span> Swagger UI
              </router-link>
            </div>
          </div>
          <div class="card-body content-box-body">
           <div class="row">
             <div class="col-md-6">
               <div id="jsoneditor" style="height: 650px;width: 100%"></div>
             </div>
             <div class="col-md-6">
               <div class="card">
                 <div id="swagger-ui"></div>
               </div>
             </div>
           </div>
          </div>
        </div>
      </div></div>
    </div>
  </div>
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
        mockDetail: {},
        dataEditor: {},
        swagggerMockUrl: "",
        breadcrumbs: [
          {"frontEndUrl": '/', 'menuName': "Mockup List"},
          {
            "frontEndUrl": this.$router.currentRoute.fullPath,
            'menuName': "Detail " + this.$router.currentRoute.params.id
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
          url: HOST_API + "/mocks/" + this.$router.currentRoute.params.id + "/spec",
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            swaggerUi.presets.apis,
            preset
          ]
        })
      },
      getData: function () {
        Service.getDetailMock(this.$router.currentRoute.params.id, (err, response) => {
          if (err != null) {
            alert(err)
            setTimeout(() => {
              this.$router.push({name: "listmock"})
            }, 1000)
          }
          this.mockDetail = response.data
          const options = {
            modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
            name: "jsonContent",
          };
          const container = document.getElementById("jsoneditor")
          const editor = new JSONEditor(container, options)
          editor.set(this.mockDetail)
          this.dataEditor = editor
          this.swagggerMockUrl=HOST_API+"/mocks/swagger?url="+HOST_API+"/mocks/"+this.mockDetail.id+"/spec"
        })
      },
      updateMocks: function () {
        console.log(this.dataEditor.get())
        Service.updateMock(this.$router.currentRoute.params.id, this.dataEditor.get(), (err, response) => {
          if (err != null) {
            alert(err.response.data)
          }
          alert("Mockup ID" + response.data.id + " Updated !")
          this.generateSwagger()
        })
      }
    },
    created: function () {

    },
    mounted() {
      this.getData()
      this.generateSwagger()
    }

  }
</script>

<style scoped>
  textarea {
    width: 100%;
    height: 550px;
  }
</style>

