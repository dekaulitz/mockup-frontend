<template>
  <div>
    <app-breadcrumb :currentBreadCrumb="breadcrumbs"/>
    <div class="container-fluid content">
      <div class="row ">
        <div class="col-md-12 no-padding">
          <div class="card content-box ">
            <div class="card-header">
              <div class="float-left"><h4>Create New Users</h4></div>
              <div class="float-right">
                <router-link :to="('/users')" class="btn btn-success">Back</router-link>
              </div>
            </div>
            <div class="card-body content-box-body">
              <div class="row">
                <div class="col-md-6 ">
                  <div class="border">
                    <div v-show="showAlert" class="alert alert-warning">
                      {{ messageAlert }}
                    </div>
                    <fieldset>
                      <legend>Users Data:</legend>
                      <form role="form">
                        <div class="box-body">
                          <div class="form-group">
                            <label for="usernameInput" class="label-bold">Username</label>
                            <input
                              id="usernameInput"
                              v-model="username"
                              type="text"
                              class="form-control input-default"
                              placeholder="Enter username" required
                            >
                          </div>
                          <div class="form-group">
                            <label for="passwordInput" class="label-bold">Password</label>
                            <input
                              id="passwordInput"
                              v-model="password"
                              type="password"
                              class="form-control input-default"
                              placeholder="Password" required
                            >
                          </div>
                          <div class="form-group">
                            <label for="mocksAccess" class="label-bold">Management Mocks</label>
                            <select
                              id="mocksAccess"
                              class="form-control input-default" v-model="mocksAccess"
                            >
                              <option value="MOCKS_READ" >Read</option>
                              <option value="MOCKS_READ_WRITE">Read and Write</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label for="userAccess" class="label-bold">Management Users</label>
                            <select
                              id="userAccess"
                              class="form-control input-default" v-model="userAccess"
                            >
                              <option value="NONE" selected>None</option>
                              <option value="USERS_READ">Read</option>
                              <option value="USERS_READ_WRITE">Read and Write</option>
                            </select>
                          </div>
                        </div>
                        <div class="box-footer">
                          <button @click.prevent="createUser" class="btn btn-success col-md-12" type="submit"
                                  v-bind:class="saveButton">
                            Create
                          </button>
                        </div>
                      </form>
                    </fieldset>
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
        showAlert: false,
        hasAccess: false,
        messageAlert: "",
        username: "",
        password: "",
        mocksAccess: "MOCKS_READ",
        userAccess: "NONE",
        breadcrumbs: [
          {"frontEndUrl": '/users', 'menuName': "Users List"},
          {
            "frontEndUrl": this.$router.currentRoute.fullPath,
            'menuName': "Create New User "
          },
        ],

      }
    }, components: {
      "app-breadcrumb": Breadcrumb,
    },
    methods: {
      createUser: function () {
        this.saveButton = "disabled";
        let access = [];
        if (this.userAccess !== "NONE") access.push(this.userAccess);
        if (this.mocksAccess !== "NONE") access.push(this.mocksAccess);
        let data = {
          username: this.username,
          password: this.password,
          accessList: access
        };
        Service.createNewUser(data, (err, response) => {
          this.saveButton = "enabled";
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            this.$emit("pushMessage", "alert-info", "User created !");
            this.$router.push({name: 'listusers'})
          }
        })
      },

    }
  }
</script>

<style scoped>

</style>

