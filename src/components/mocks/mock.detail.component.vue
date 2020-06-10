<template>
  <div>
    <app-breadcrumb :currentBreadCrumb="breadcrumbs"/>
    <div class="container-fluid content">
      <div class="row ">
        <div class="col-md-12 no-padding">
          <div class="card content-box">
            <div class="card-header">
              <div class="float-left"><h4>{{mainHeader}}</h4></div>
              <div class="float-right">
                <router-link :to="('/')" class="btn btn-success">Back</router-link>
              </div>
            </div>
            <div class="card-body content-box-body">


              <div class="border add-space-bottom">
                <div class="">
                  <h3 class="headerline">{{title}}</h3>
                  <label>
                    <font-awesome-icon icon="calendar"/>
                    {{mockDetail.dateUpdated|localdate}}</label>
                </div>
                <p class="lead">{{mockDetail.description}}</p>

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
                      <div id="jsoneditor" style="height: 750px;width: 100%"></div>
                    </div>
                    <div class="col-md-6">
                      <div class="border add-space-bottom">
                        <button class="btn btn-primary" type="button" v-bind:class="updateButton"
                                v-on:click="updateMocks()" v-show="hasAccess">
                          Update
                          Mocks
                        </button>
                        <button class="btn btn-primary" type="button" v-on:click="generateSwagger()">Validate Swagger
                        </button>
                        <router-link :to="('/swagger/'+mockDetail.id)" class="btn btn-success">
                          Swagger UI
                        </router-link>
                      </div>
                      <div class="card">
                        <div id="swagger-ui"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <app-users :has-access="hasAccess" :mock-users="mockUsers"
                             @getUsersOfMocks="getUsersOfMocks"></app-users>
                </div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <app-histories :mock-histories="mockHistories"></app-histories>
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
  import {mixGeneral} from '../../shared/mixins/mixin.general.js'
  import Histories from '../mocks/childs/mock.detail.histories.component'
  import Users from '../mocks/childs/mock.detail.users.component'

  export default {
    name: "mock.detail.component",
    mixins: [mixGeneral],
    data: function () {
      return {
        searchUserListResult: [],
        showUserList: false,
        userId: "",
        username: "",
        mocksAccess: "MOCKS_READ",
        mockDetail: {},
        mockHistories: [],
        mockUsers: [],
        dataEditor: {},
        swagggerMockUrl: "",
        hasAccess: false,
        updatedBy: {
          username: ""
        },
        breadcrumbs: [
          {"frontEndUrl": '/', 'menuName': "Mockup List"},
          {
            "frontEndUrl": this.$router.currentRoute.fullPath,
            'menuName': "Detail " + this.$router.currentRoute.params.id
          },
        ],

      }
    },
    computed: {
      mainHeader: function () {
        return this.mockDetail.title + " | " + this.mockDetail.id
      },
      title: function () {
        let updatedBy = this.updatedBy.username = "" ? "" : this.updatedBy.username;
        return "Project Title " + this.mockDetail.title + " | Created by " + updatedBy.toString().charAt(0).toUpperCase() + updatedBy.slice(1)
      }
    },
    components: {
      "app-breadcrumb": Breadcrumb,
      "app-histories": Histories,
      "app-users": Users
    },
    methods: {
      generateSwagger: function () {
        const ui = SwaggerUIBundle({
          spec: this.dataEditor.get(),
          dom_id: '#swagger-ui',
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
        })
      },
      getData: function () {
        Service.getDetailMockWithAccess(this.$router.currentRoute.params.id, (err, response) => {
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            this.mockDetail = response.data;
            this.updatedBy = response.data.updatedBy;
            if (this.checkAccessCurretUser(this.mockDetail)) {
              this.hasAccess = true
            }
            const options = {
              modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
              name: "jsonContent",
            };
            const container = document.getElementById("jsoneditor");
            const editor = new global.constants.JSONEditor(container, options);
            editor.set(this.mockDetail.spec);
            this.dataEditor = editor;
            this.generateSwagger()
          }
        })
      },
      getDataHistory: function () {
        Service.getHistoriesMocks(this.$router.currentRoute.params.id, (err, response) => {
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            this.mockHistories = response.data
          }
        })
      },
      getUsersOfMocks: function () {
        Service.getUsersMock(this.$router.currentRoute.params.id, (err, response) => {
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            this.mockUsers = response.data
          }
        })
      },
      updateMocks: function () {
        this.updateButton = "disabled";
        this.mockDetail.spec = this.dataEditor.get();
        Service.updateMock(this.$router.currentRoute.params.id, this.mockDetail, (err, response) => {
          this.updateButton = "enabled";
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            alert("Mockup ID" + response.data.id + " Updated !");
            this.getDataHistory()

          }
        })
      },
    },
    created() {
      this.getData();
      this.getDataHistory();
      this.getUsersOfMocks()
    }

  }
</script>

<style scoped>

</style>

