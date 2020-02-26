<template>
  <nav class="navbar navbar-expand-md navbar-dark main-navigation">
    <router-link to="/" class="btn btn-primary my-2 my-sm-0 app-name">
      MOCKY - up | Swagger Mockup Server
    </router-link>


    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#menuNavbar"
            aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

<!--    <div class="navbar-collapse collapse" id="menuNavbar">-->
<!--      <div class="mr-auto"></div>-->
<!--      <ul class="navbar-nav mr-1">-->
<!--        <li class="nav-item dropdown active">-->
<!--          <a class="nav-item nav-link dropdown-toggle mr-md-12" href="#" id="bd-versions1"-->
<!--             data-toggle="dropdown"-->
<!--             aria-haspopup="true" aria-expanded="false">-->
<!--            <font-awesome-icon icon="user" />-->
<!--          </a>-->
<!--          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions1">-->
<!--            <router-link to="/profile" class="dropdown-item">-->
<!--              <span class="fa fa-user"></span> <span class="text-left">Profile</span>-->
<!--            </router-link>-->
<!--            &lt;!&ndash;<router-link to="/profile-setting" class="dropdown-item">&ndash;&gt;-->
<!--            &lt;!&ndash;<span class="fa fa-cogs"></span> Settings&ndash;&gt;-->
<!--            &lt;!&ndash;</router-link>&ndash;&gt;-->
<!--            <a class="dropdown-item cursor" @click="onLogout"><span class="fa fa-sign-out"></span>-->
<!--              Logout</a>-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </nav>

</template>

<script>
  export default {
    name: "navigation-header",
    data: function () {
      return {
        username:""
      }
    },
    created: function () {

    },
    methods: {
      onLogout:function () {
        alert("berak")
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

