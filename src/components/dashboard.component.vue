<template>
  <div>
    <app-menu></app-menu>

    <div class="container-fluid content content-wrapper">

      <div class="alert  alert-dismissible fade show add-space-top" role="alert" v-bind:class="alertMessageCss"
           v-show="isAlertShowup">
        <h4 class="alert-heading">Hai {{getUsernameAccount}}!</h4>
        <div class="validation" v-html="alertMessage"></div>
        <button aria-label="Close" class="close" type="button" @click="alertClosed">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <transition appear mode="out-in" name="fade">
        <router-view @pushMessage="alertShow"/>
      </transition>
    </div>
    <app-footer/>
  </div>
</template>

<script>
  import Menu from "../shared/components/menu.component"
  import Breadcrumb from "../shared/components/breadcrumb.component"
  import Footer from "../shared/components/footer.menu.component"
  import Auth from '../service/auth.service'

  export default {
    name: "dashboard.component",
    data: function () {
      return {
        alertMessageCss: "",
        alertMessage: "",
        isAlertShowup: false,
      }
    },
    components: {
      "app-menu": Menu,
      "app-breadcrumb": Breadcrumb,
      "app-footer": Footer
    },
    computed: {
      getUsernameAccount: function () {
        let username = Auth.getAuth().username;
        return username.charAt(0).toUpperCase() + username.slice(1)
      }

    },
    methods: {
      alertClosed:function(){
        this.isAlertShowup = false

      },
      alertShow: function (cssValue, message) {
        this.isAlertShowup = true;
        this.alertMessageCss = cssValue;
        this.alertMessage = message;
        setTimeout(() => {
          this.isAlertShowup = false
        }, 4500)
      }
    }
  }
</script>

<style>

</style>
