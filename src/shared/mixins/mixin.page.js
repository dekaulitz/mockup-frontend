export const basePage = {
  // extend: BaseComponent,
  data: function () {
    return {
      searchingProperty: {},
      searching: "",
      selectedIds: [],
      query: {
        page: 1,
        size: 10,
        sort: ""
      },
      searchingAttribute: "",
      totalPage: "",
      currentPage: "",
      totalData: "",
      breadcrumbs: [],
      sortingVariable: {},
      rows: {}
    }
  },
  props: {
    isModalSubmited: false,
  },
  mounted: function () {
    // loaderActivate()
    // this.getData()
  },
  computed: {
    selectedAll: {
      get: function () {
        return this.rows ? this.selectedIds.length === this.rows.length : false;
      },
      set: function (value) {
        let selected = [];
        if (value) {
          this.rows.forEach(function (data) {
            selected.push(data.ID);
          });
        }
        this.selectedIds = selected
      }
    }
  },
  watch: {
    isModalSubmited: function (value) {
      if (value)
        this.processDelete()
    }
  },
  methods: {
    sortingTable: function (option) {
      this.query.sort = option;
      this.query.page = 1;
      this.getData();
    },
    listingTable: function (option) {
      this.query.size = option;
      this.query.page = 1;
      this.getData();
    },
    previousPage: function (option) {
      this.query.page = option;
      this.getData();
    },
    nextPage: function (option) {
      this.query.page = option;
      this.getData()
    },
    onReset: function () {
      delete this.query.q;
      this.searchingAttribute = "";
      this.getData()
    },
    onSearching: function (attribute, value) {
      this.query.q = attribute + ':' + value;
      this.query.page = 1;
      this.getData()
    },
    onDelete: function () {
      $("#generalModal").modal('show');
      this.$emit("modalProperties", {
        title: "Delete Approval ",
        message: "Are you sure want to delete this data?",
        submit: true,
        type: 1,
      })
    },
    processDelete: function () {
      let ids = this.selectedIds.toString();
      if (!ids) {
        this.$emit("modalProperties", {
          title: "Warning ",
          message: "There is no data selected, please select data first !",
          submit: true,
          type: 2,
        })
      } else {
        $("#generalModal").modal('hide');
        HttpReq.service("get", this.targetApi + '/' + ids + '/delete').then(response => {
          this.$store.dispatch('displaySuccessMessage', true);
          this.$store.dispatch('message', response.meta.message);
          this.getData()

        }).catch(error => {
          this.$store.commit('displayErrorMessage', true);
          this.$store.commit('message', error.message)
        })

      }

    },
  }
};
