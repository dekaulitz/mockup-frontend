<template>
  <div>
    <div class="mock-list add-space-top">
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Updated By</th>
          <th scope="col">Updated On</th>
          <th scope="col">Swagger UI</th>
        </tr>
        </thead>
        <tbody>
        <tr :key="index" v-for="(history,index) in mockHistories">
          <th scope="row">{{index+1}}</th>
          <td>{{history.updatedBy.username|ucFirst}}</td>
          <td>{{history.updatedDate|localdate}}</td>
          <td><a href="">Swagger UI</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mock.detail.histories.component",
    props: {
      mockHistories: Array,
    }
  }
</script>

<style scoped>

</style>
