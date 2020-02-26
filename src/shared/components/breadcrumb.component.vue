<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">

      <li class="breadcrumb-item" v-for="item in currentBreadCrumb">
        <router-link :to="item.frontEndUrl">{{item.menuName}}</router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
  export default {
    name: "breadcrumb",
    data: function () {
      return {}
    }, props: ['currentBreadCrumb']
  }

</script>

<style scoped>

</style>
