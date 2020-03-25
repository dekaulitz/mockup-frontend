<template>
  <div>
    <app-menu></app-menu>
    <div class="container-fluid content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Menu from "../shared/components/menu.component"
  import Breadcrumb from "../shared/components/breadcrumb.component"

  export default {
    name: "dashboard.component",
    components: {
      "app-menu": Menu,
      "app-breadcrumb": Breadcrumb
    }
  }
</script>

<style>

</style>
