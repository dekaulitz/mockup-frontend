<template>
  <div>
    <app-menu></app-menu>
    <div class="container-fluid content content-wrapper">
      <router-view/>
    </div>
    <app-footer/>
  </div>
</template>

<script>
  import Menu from "../shared/components/menu.component"
  import Breadcrumb from "../shared/components/breadcrumb.component"
  import Footer from "../shared/components/footer.menu.component"

  export default {
    name: "dashboard.component",
    components: {
      "app-menu": Menu,
      "app-breadcrumb": Breadcrumb,
      "app-footer":Footer
    }
  }
</script>

<style>

</style>
