<template>
  <nav class="navbar navbar-expand-md navbar-dark main-navigation">
    <router-link to="/" class="btn btn-primary my-2 my-sm-0 app-name">
      MOCK-UP | Swagger Mockup Server
    </router-link>


    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#menuNavbar"
            aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse collapse" id="menuNavbar">

      <ul class="navbar-nav mr-auto">
        <div v-show="hasUserAccess">
        <li class="nav-item dropdown active">
          <router-link to="/users" class="btn btn-primary my-2 my-sm-0 app-name">
            <font-awesome-icon icon="users" /> Users
          </router-link>
        </li>
        </div>
      </ul>

      <ul class="navbar-nav mr-1">
        <li class="nav-item dropdown active">
          <a class="nav-item nav-link dropdown-toggle mr-md-12" href="#" id="bd-versions1"
             data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false">
         Sign in as  {{username}}         <font-awesome-icon icon="user" />
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions1">
            <a class="dropdown-item pointer" @click="onLogout"><span class="fa fa-sign-out"></span>
              <font-awesome-icon icon="sign-out-alt" />   Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>

</template>

<script>
  import Auth from './../../service/auth.service'
  export default {
    name: "navigation-header",
    data: function () {
      return {
        username:"",
        hasUserAccess:false,
      }
    },
    created: function () {
      let auth=Auth.getAuth()
      if (Auth.hasUsersAccessMenu()) this.hasUserAccess = true
      this.username=auth.username.toString().charAt(0).toUpperCase()+auth.username.slice(1);
    },
    methods: {
      onLogout:function () {
        Auth.delAuth()
        this.$router.push("/login")
      }
    },
    computed: {}
  }
</script>
<style scoped>
  .nav-link :active{
    color: white;
  }
</style>

