<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark main-navigation fixed-top">
      <router-link to="/login" class="btn btn-primary my-2 my-sm-0 app-name">
        MOCK-UP | Swagger Mockup Server
      </router-link>
    </nav>
    <div>
      <div class="content-wrapper">
        <div class="container">
          <div class="login-page add-space-top">
            <div class="login-title">
              <h1>Mockyup | Your mockup server</h1>
            </div>
            <div class="row">
              <div class="col-12 col-md-7 ">
                <div class="login-intro">
                  <h4>Login Dashboard Mockyup</h4>
                  <p>API Contract and Mock server base on swagger </p>
                  <ul>
                    <li>As Mock Server</li>
                    <li>As API Contract</li>
                    <li>As Simplify your collaboration kit</li>
                  </ul>
                </div>
              </div>
              <div class="col-12 col-md-5 ">
                <div class="login-form">
                  <div class="card panel-default ">
                    <div v-show="showAlert" class="alert alert-warning">
                      {{ messageAlert }}
                    </div>
                    <div class="card-body  ">
                      <form role="form" @submit="doLogin">
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
                        </div>
                        <div class="box-footer">
                          <button type="submit" class="btn btn-success col-md-12">
                            Login
                          </button>
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
    </div>
    <Footer/>
  </div>

</template>
<script>
  import Service from '../service/mock.service'
  import Auth from '../service/auth.service'
  import Footer from '../shared/components/footer.login.menu.component'

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
    components:{
      Footer
    },
    beforeMount: function () {
      let isAuthenticated = localStorage.getItem(constants.AUTHORIZATION);
      if (isAuthenticated !== null)
        this.$router.push("/");
    },
    methods: {
      doLogin: function (e) {
        let data = {
          'username': this.username,
          'password': this.password
        };
        Service.doLogin(data, (err, response) => {
          if (err != null) {
            this.messageAlert = err.response.data.response_message;
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false
            }, 5000)
          }
          Auth.setAuth(response.data);
          this.$router.push("/");
        });
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

