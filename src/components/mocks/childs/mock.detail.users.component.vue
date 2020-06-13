<template>
  <div>
    <div class="border add-space-top col-sm-12 col-md-12" v-show="hasAccess">
      <form>
        <div class="form-group">
          <label for="inpuUserName">Add new User</label>
          <input aria-describedby="userHelp" class="form-control" id="inpuUserName" type="text"
                 v-bind:userId="userId" v-model="username" v-on:keyup="onUserSearch">
        </div>
        <div class="user-search-list" v-show="showUserList">
          <ul class="list-group">
            <li class="list-group-item active">List of users</li>
            <li :key="index" @click="addUser(user)" class="list-group-item user-item"
                v-for="(user,index) in searchUserListResult">
              {{user.id}} | {{user.username|ucFirst}}
            </li>

          </ul>
        </div>

        <div class="form-group">
          <label class="label-bold" for="mocksAccess">Management Mocks</label>
          <select
            class="form-control input-default"
            id="mocksAccess" v-model="mocksAccess"
          >
            <option value="MOCKS_READ">Read</option>
            <option value="MOCKS_READ_WRITE">Read and Write</option>
          </select>
        </div>
        <div class="box-footer">
          <button @click.prevent="addOrUpdateUserAccessToMock" class="btn btn-success" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
    <div :key="x" v-for="(mockusers,x) in mockUsers">
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">UserId</th>
          <th scope="col">Username</th>
          <th scope="col">Access</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr :key="index" v-for="(user,index) in mockusers.users">
          <th scope="row">{{index+1}}</th>
          <td>{{user.id}}</td>
          <td>{{user.username|ucFirst}}</td>
          <td><b>{{user.access}}</b></td>
          <td v-bind:userId="user.id">
            <div class="mr-1" v-show="hasAccess">
              <button v-on:click="removeUserAccess(user.id)">delete</button>
              <button v-on:click="editUser(user)">edit</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  import Service from '../../../service/mock.service'

  export default {
    name: "mock.detail.users.componennt",
    data: function () {
      return {
        mockUsers: [],
        hasAccess: false,
        showUserList: false,
        userId: "", username: "", mocksAccess: "MOCKS_READ",
        searchUserListResult: [],
      }
    },
    props: {
      mockUsers: Array,
      hasAccess: Boolean,
    },
    methods: {
      onUserSearch: function (evt) {
        if (this.username.length < 1) this.showUserList = false;
        else {
          let querystring = require('querystring');
          let query = {username: this.username};
          Service.searchUserByName('?' + querystring.stringify(query), (err, response) => {
            if (err !== null) {
              this.validateResponseHandler(err)
            }
            this.showUserList = true;
            this.searchUserListResult = response.data
          })
        }
      },

      addOrUpdateUserAccessToMock: function () {
        let data = {"userId": this.userId, "access": this.mocksAccess};
        Service.addUserAccesOnMock(this.$router.currentRoute.params.id, data, (err, response) => {
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            this.$emit("getUsersOfMocksModification", true)
          }
        })
      },
      removeUserAccess: function (userId) {
        Service.removeAccessUserOnMock(this.$router.currentRoute.params.id, userId, (err, response) => {
          if (err != null) {
            this.validateResponseHandler(err)
          } else {
            this.$emit("getUsersOfMocksModification", true)
          }
        })
      },
      addUser: function (user) {
        this.showUserList = false;
        this.username = user.username;
        this.userId = user.id

      },
      editUser: function (user) {
        this.showUserList = false;
        this.username = user.username;
        this.mocksAccess = user.access;
        this.userId = user.id

      }
    }
  }
</script>

<style scoped>


</style>
