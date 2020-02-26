<template>
  <div class=" content-box-footer">
    <div class="row">
      <div class="col-md-6 text-left col-xs-12">
        Page {{currentPage}} of <span id="pageCount">{{totalPage}}</span>
        Total
        Row <span id="totalRow">{{totalData}}</span>
      </div>
      <div class="col-md-6  col-xs-12">
        <ul class="pagination float-right">
          <li class="page-item ">
            <a class="page-link" v-on:click="gotoFirst">First</a>
          </li>
          <li class="page-item" v-bind:class="{'disabled': disablePrev}"><a class="page-link"
                                                                            v-on:click="onPrev">Prev</a></li>
          <li class="page-item" v-bind:class="{'disabled': disableNext}"><a class="page-link"
                                                                            v-on:click="onNext">Next</a></li>
          <li class="page-item">
            <a class="page-link" v-on:click="gotoLast">Last</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "table.widget.footer",
      data: function () {
        return {
          disablePrev: true,
          disableNext: false
        }
      },
      props: [
        "currentPage",
        "totalPage",
        "totalData"
      ],
      watch: {
        currentPage: function () {
          let pageNow = parseInt(this.currentPage);
          let lastPage = parseInt(this.totalPage)
          this.disablePrev = pageNow === 1
          this.disableNext = pageNow === lastPage
        }
      },
      computed: {},
      methods: {
        onPrev: function () {
          let pageNow = parseInt(this.currentPage);
          this.$emit("previousPage", pageNow - 1)
        },
        onNext: function () {
          let pageNow = parseInt(this.currentPage);
          this.$emit("nextPage", pageNow + 1)
        },
        gotoFirst: function () {
          this.$emit("previousPage", 1)
        },
        gotoLast: function () {
          this.$emit("nextPage", this.totalPage)
        }
      }

    }
</script>

<style scoped>

</style>
