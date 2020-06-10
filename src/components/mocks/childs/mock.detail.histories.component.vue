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
          <td>{{title(history)}}</td>
          <td>{{history.updatedDate|localdate}}</td>
          <td>
            <router-link :to="('/swagger/'+history.mockId+'/history/'+history.id)" class="btn btn-success">
              Swagger UI
            </router-link>
          </td>
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
    },
    methods: {
      title: function (history) {
        let updatedBy = "Unknown";
        if (history.updatedBy)
          updatedBy = history.updatedBy.username = "" ? "Unknown" : history.updatedBy.username;
        return "Updated by " + updatedBy.toString().charAt(0).toUpperCase() + updatedBy.slice(1)
      }
    }

  }
</script>

<style scoped>

</style>
