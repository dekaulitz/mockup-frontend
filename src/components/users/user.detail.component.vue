<template>
  <div>
    <app-breadcrumb :currentBreadCrumb="breadcrumbs"/>
    <div class="container-fluid content">
      <div class="row ">
        <div class="col-md-12 no-padding">
          <div class="card content-box ">
            <div class="card-header">
              <div class="float-left"><h4>Detail Users</h4></div>
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
                      <form role="form" @submit="updateUser">
                        <div class="box-body">
                          <div class="form-group">
                            <label for="usernameInput" class="label-bold">Username</label>
                            <input
                              id="usernameInput"
                              v-model="username"
                              type="text"
                              class="form-control input-default"
                              placeholder="Enter username"
                            >
                          </div>
                          <div class="form-group">
                            <label for="passwordInput" class="label-bold">Password</label>
                            <input
                              id="passwordInput"
                              v-model="password"
                              type="password"
                              class="form-control input-default"
                              placeholder="Password"
                            >
                          </div>
                          <div class="form-group">
                            <label for="mocksAccess" class="label-bold">Management Mocks</label>
                            <select
                              id="mocksAccess"
                              class="form-control input-default" v-model="mocksAccess"
                            >
                              <option value="MOCKS_READ"selected>Read</option>
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
                        <div v-show="hasAccess">
                          <div class="box-footer">
                            <button class="btn btn-success col-md-12" type="submit" v-bind:class="updateButton">
                              Update
                            </button>
                          </div>
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
  import Auth from '../../service/auth.service'
  import {mixGeneral} from '../../shared/mixins/mixin.general'

  export default {
    name: "user.detail.component",
    mixins: [mixGeneral],
    data: function () {
      return {
        showAlert: false,
        hasAccess: false,
        messageAlert: "",
        username: "",
        password: "",
        mocksAccess: "",
        userAccess: "",
        breadcrumbs: [
          {"frontEndUrl": '/users', 'menuName': "Users List"},
          {
            "frontEndUrl": this.$router.currentRoute.fullPath,
            'menuName': "Detail User "
          },
        ],

      }
    }, components: {
      "app-breadcrumb": Breadcrumb,
    },
    methods: {
      updateUser: function () {
        this.updateButton = "disabled";
        let access = [];
        if (this.userAccess !== "NONE") access.push(this.userAccess);
        if (this.mocksAccess !== "NONE") access.push(this.mocksAccess);
        let data = {
          username: this.username,
          password: this.password,
          accessList: access
        };
        Service.updateUserById(this.$router.currentRoute.params.id, data, (err, response) => {
          this.updateButton = "enabled";
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            alert("updated !");
            this.$router.push({name: 'listusers'})
          }
        })
      },
      getData: function () {
        if (Auth.hasUpdateUsersAccess())
          this.hasAccess = true;
        Service.getUserId(this.$router.currentRoute.params.id, (err, response) => {
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            let res = response.data;
            console.log(res);



            this.username = res.username;
            this.accessList = res.accessList;
            if (res.accessList.includes(Auth.USERS_READ_WRITE)) {
              this.userAccess = Auth.USERS_READ_WRITE
            } else if (res.accessList.includes(Auth.USERS_READ)) {
              this.userAccess = Auth.USERS_READ
            } else {
              this.userAccess = "NONE"
            }
            if (res.accessList.includes(Auth.MOCKS_READ_WRITE)) {
              this.mocksAccess = Auth.MOCKS_READ_WRITE
            } else if (res.accessList.includes(Auth.MOCKS_READ)) {
              this.mocksAccess = Auth.MOCKS_READ
            } else {
              this.mocksAccess = "NONE"
            }
          }
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped>

</style>

