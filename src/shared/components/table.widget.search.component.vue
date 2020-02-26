<template>
  <div class="row">
    <div class="col-md-3 col-xs-12">
      <select class="form-control input-default" v-model="searchingAttribute">
        <option value="">Search By</option>
        <option v-for="(value,key) in attributes" :value="key"> {{value}}</option>
      </select>
    </div>
    <div class="col-md-3 col-xs-12">
      <input class="form-control input-default" v-model="searchingValue">
    </div>
    <div class="col-md-6">
      <button class="btn btn-success " v-on:click="onSearching"><span class="fa fa-search"></span> Search
      </button>
      <button class="btn btn-warning bg-yellow " v-on:click="onReset"><span class="fa fa-trash-o"></span> Reset
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "table.widget.header.component",
    data: function () {
      return {
         searchingAttribute: "",
        searchingValue: ""
      }
    },
    props: [
      "attributes",
    ],
    methods: {
      onReset: function () {
        this.searchingAttribute=""
        this.searchingValue=""
        this.$emit("onReset")
      },
      onSearching: function () {
        this.$emit("onSearching", this.searchingAttribute, this.searchingValue)
      }
    }

  }
</script>

<style scoped>

</style>
