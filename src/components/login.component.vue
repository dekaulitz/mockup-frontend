<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark main-navigation fixed-top">
      <router-link to="/login" class="btn btn-primary my-2 my-sm-0 app-name">
        MOCK-UP | Swagger Mockup Server
      </router-link>
    </nav>
    <div class="container">
      <div class="login-page">
        <div class="login-title">
          <h1>Mockyup | Your mockup server</h1>
        </div>
        <div class="row">
          <div class="col-md-7 col-sm-12">
            <div class="login-intro">
              <h4>Login Dashboard Mockyup</h4>
              <p>API Contract and Mock server base on swagger </p>
              <ul>
                <li>As Mock Server</li>
                <li>As API Contract</li>
                <li>As simplify your collaboration kit</li>
              </ul>
            </div>
          </div>
          <div class="col-md-5 col-sm-12">
            <div class="login-form">
              <div class="card panel-default ">
                <div class="alert alert-warning" v-show="showAlert">
                  {{messageAlert}}
                </div>
                <div class="card-body  ">
                  <form role="form" v-on:submit="doLogin">
                    <div class="box-body">
                      <div class="form-group">
                        <label for="usernameInput" class="label-bold">Username</label>
                        <input type="text" class="form-control input-default" id="usernameInput"
                               placeholder="Enter username" v-model="username">
                      </div>
                      <div class="form-group">
                        <label for="passwordInput" class="label-bold">Password</label>
                        <input type="password" class="form-control input-default"
                               id="passwordInput"
                               placeholder="Password" v-model="password">
                      </div>
                    </div>
                    <div class="box-footer">
                      <button type="submit" class="btn btn-success col-md-12">Login</button>
                    </div>
                  </form>
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
  import Service from '../service/mock.service'

  export default {
    name: "login.component",
    data: function () {
      return {
        showAlert: false,
        messageAlert: "",
        username: "",
        password: ""
      }
    },
    beforeMount:function(){
      let isAuthenticated=localStorage.getItem(constants.AUTHORIZATION)
      if (isAuthenticated!=null || isAuthenticated!==undefined)
        this.$router.push("/");
    },
    methods: {
      doLogin: function (e) {
        let data = {
          'username': this.username,
          'password': this.password
        }
        Service.doLogin(data, (err, response) => {
          if (err != null) {
            console.log(err.response.data.message)
            this.messageAlert = err
            this.showAlert = true
            setTimeout(() => {
              this.showAlert = false
            }, 5000)
          }
          localStorage.setItem(constants.AUTHORIZATION,response.data)
          this.$router.push("/");
        })
        e.preventDefault();
      }
    }
  }
</script>

<style scoped>
  .main-navigation btn {
    align-items: center;
  }

  .login-title {
    margin-bottom: 15px;
  }

  .login-intro {
    margin-bottom: 15px;
    font-size: 18px;
    line-height: 1.5;
  }

  .login-intro p {
    font-size: 16px;
    color: #888;
  }

  .login-page {
    min-height: 100%;
    position: relative;
    padding: 65px 15px;
  }

  .login-form {
    width: 100%
  }

  .login-form label {

  }
</style>
