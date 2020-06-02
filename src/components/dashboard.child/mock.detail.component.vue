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
                <button type="button" class="btn btn-primary" v-on:click="updateMocks()" v-show="hasAccess">Update
                  Mocks
                </button>
                <button type="button" class="btn btn-primary" v-on:click="generateSwagger()">Validate Swagger</button>
                <router-link :to="('/swagger/'+mockDetail.id)" class="btn btn-success">
                  <span class="fa fa-undo"></span> Swagger UI
                </router-link>
                <router-link :to="('/')" class="btn btn-success">Back</router-link>
              </div>
            </div>
            <div class="card-body content-box-body">
              <div class="border add-space-bottom">
                <h3>Project Title {{mockDetail.title}}</h3>
                <h5>Project Description: {{mockDetail.description}}</h5>
              </div>

              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
                     aria-controls="nav-home" aria-selected="true">Swagger</a>
                  <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
                     aria-controls="nav-profile" aria-selected="false">User Permissions</a>
                  <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab"
                     aria-controls="nav-contact" aria-selected="false">Histories</a>
                </div>
              </nav>
              <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                  <div class="row add-space-top">
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
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <ul class="list-group add-space-top">
                    <div v-for="(mockusers,index) in this.mockUsers">
                      <li class="list-group-item" v-for="(user,index) in mockusers.users" :key="index">
                        {{user.id}}-{{user.username}}{{user.access}}
                        {{user.updatedDate}}
                      </li>
                    </div>
                  </ul>
                </div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <ul class="list-group add-space-top">
                    <li class="list-group-item" v-for="(history,index) in mockHistories" :key="index">
                      {{history.id}} updatedBy {{history.updatedBy.username}}
                      {{history.updatedDate}}
                    </li>
                  </ul>
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
  import Auth from '../../service/auth.service'


  export default {
    name: "mock.detail.component",
    data: function () {
      return {
        mockDetail: {},
        mockHistories: [],
        mockUsers: [],
        dataEditor: {},
        swagggerMockUrl: "",
        hasAccess: false,
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
      generateSwagger: function () {
        const swaggerUi = require("./../../assets/js/swagger-ui-bundle")
        const preset = require("./../../assets/js/swagger-ui-standalone-preset")
        // Begin Swagge//sdasd//r UI call region
        const ui = swaggerUi({
          spec: this.dataEditor.get().spec,
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
      getData: function () {
        Service.getDetailMock(this.$router.currentRoute.params.id, (err, response) => {
          if (err != null) {
            alert(err.response.data.response_message != null ? err.response.data.response_message : err.response.data)
            if (Auth.shouldLogout(err)) this.$router.push({name: 'Login'})
            else setTimeout(() => {
              this.$router.push({name: "listmock"})
            }, 1000)
          } else {
            this.mockDetail = response.data
            if (Array.isArray(this.mockDetail.users)) {
              if (this.mockDetail.users[0].access !== undefined && this.mockDetail.users[0].access === Auth.MOCKS_READ_WRITE)
                this.hasAccess = true
            }
            const options = {
              modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
              name: "jsonContent",
            };

            const container = document.getElementById("jsoneditor")
            const editor = new global.constants.JSONEditor(container, options)
            editor.set(this.mockDetail)
            this.dataEditor = editor
            this.generateSwagger()
            Service.getHistoriesMocks(this.$router.currentRoute.params.id, (err, response) => {
              if (err != null) {
                alert(err.response.data.response_message != null ? err.response.data.response_message : err.response.data)
                if (Auth.shouldLogout(err)) this.$router.push({name: 'Login'})
                else setTimeout(() => {
                  this.$router.push({name: "listmock"})
                }, 1000)
              } else {
                this.mockHistories = response.data
                Service.getUsersMock(this.$router.currentRoute.params.id, (err, response) => {
                  if (err != null) {
                    alert(err.response.data.response_message != null ? err.response.data.response_message : err.response.data)
                    if (Auth.shouldLogout(err)) this.$router.push({name: 'Login'})
                    else setTimeout(() => {
                      this.$router.push({name: "listmock"})
                    }, 1000)
                  } else {
                    this.mockUsers = response.data

                  }
                })
              }
            })

          }
        })

      },
      updateMocks: function () {
        console.log(this.dataEditor.get())
        this.mockDetail.spec = this.dataEditor.get()
        Service.updateMock(this.$router.currentRoute.params.id, this.mockDetail, (err, response) => {
          if (err != null) {
            alert(err.response.data.response_message != null ? err.response.data.response_message : err.response.data)
            if (Auth.shouldLogout(err)) this.$router.push({name: 'Login'})
            else
              setTimeout(() => {
                this.$router.push({name: "listmock"})
              }, 1000)
          } else {
            alert("Mockup ID" + response.data.id + " Updated !")
            this.generateSwagger()
          }
        })
      }
    },
    created() {
      this.getData()
    }

  }
</script>

<style scoped>
</style>

