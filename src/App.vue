<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import 'jsoneditor/dist/jsoneditor.min.css'

  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="scss">
</style>
