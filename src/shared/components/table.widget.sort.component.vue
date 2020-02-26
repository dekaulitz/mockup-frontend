<template>
  <div class="card-title content-box-title add-space">
    <div class="row">
      <div class="col-md-12 ">
        <div class="float-left">
          <div class="addon-box-list">
            <div class="form-group-inline">
              <span class="addon">Show</span>
              <select class="form-control" v-model="listingTable" title="listing" v-on:change="onChangeListingTable"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span class="addon">Data</span>
            </div>
          </div>
        </div>
        <div class="float-right">
          <div class="addon-box-list ">
            <div class="form-group-inline">
              <span class="addon ">Ordering by</span>
              <select class="form-control" v-on:change="onChangeOrdering" v-model="sorting"
                      title="Ordering">
                <option value="0" selected>Ordering By</option>
                <option v-for="(value,key) in sortingVariable" :value="key">{{value}}</option>

              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "table.widget.sort.component",
    data: function () {
      return {
        sorting: 0,
        listingTable: 10
      }
    },
    props: [
      'sortingVariable'
    ],
    methods: {
      onChangeOrdering: function () {
        if (this.sorting !== "0")
          this.$emit("sortingTable", this.sorting)
      },
      onChangeListingTable: function () {
        this.$emit("listingTable", this.listingTable)
      }
    }

  }
</script>

<style scoped>

</style>
