<template>
  <div>
   <div class="card content-box">
     <div class="card-header">
       <div class="float-left"><h4>{{title}}</h4></div>
       <div class="float-right">
         <router-link :to="('/create')" class="btn btn-success">Create New Mockup</router-link>
         <!--<button class="btn btn-danger" v-on:click="onDelete"><span class="fa fa-close"></span> Trash-->
         <!--</button>-->
         <!--<a class="btn btn-info" href="#"><span class="fa fa-file-excel-o"></span> Export</a>-->
       </div>
     </div>
     <div class="card-body content-box-body">
     <div id="swagger-ui"></div>
     </div>
   </div>

  </div>
</template>

<script>
  export default {
    name: "mock.swagger.component",

    beforeMount() {
    },
    mounted() {
    const swaggerUi=require("./../../assets/js/swagger-ui-bundle")
    const preset=require("./../../assets/js/swagger-ui-standalone-preset")
      // Begin Swagge//sdasd//r UI call region
      const ui = swaggerUi({
        url: "https://dududev.ovo.id/mocks/5e4b60cb204f7c23d145ecb9/spec",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          swaggerUi.presets.apis,
          preset
        ]
      })

      // End Swagger UI call region

      window.ui = ui


      window.on()
    }
  }
</script>


