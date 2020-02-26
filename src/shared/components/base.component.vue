<template>

</template>

<script>
  export default {
    name: "base-component",
    data: function () {
      return {
        id: '',
        breadcrumbs: [],
        data: {},
        targetApi: "",
        title: "",
        formValidation: false,
        form: {}
      }
    },
    watch: {
      formValidation: function (value) {
        if (value)
          this.onSubmit()
      }
    },
    methods: {
      onSubmit: function (evt) {
        HttpReq.service("post", this.targetApi + '/create', this.form).then(response => {
          console.log(response)
        }).catch(error => {
          this.$store.commit('displayErrorMessage', true)
          this.$store.commit('message', error.message)
        })
      }
    }
  }
</script>

<style scoped>

</style>
