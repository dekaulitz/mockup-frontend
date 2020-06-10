import Auth from "../../service/auth.service";

export const mixGeneral = {
  data: function () {
    return {
      hasAccess: false,
      saveButton: "enabled",
      updateButton: "enabled"
    }
  },
  methods: {
    checkAccessCurretUser: function (mockDetail) {
      if (mockDetail.currentAccessUser) {
        return this.hasAccess = mockDetail.currentAccessUser && mockDetail.currentAccessUser.access === Auth.MOCKS_READ_WRITE
      }
      return this.hasAccess
    },
    validateResponseHandler: function (error) {

      console.log(error.response);
      switch (error.response.status) {
        case 401: {
          if (error.response.data.response_code === "MOCK012") {
            if (Auth.shouldLogout(error)) setTimeout(() => {
              this.$router.push({name: 'Login'});
            }, 1000);
            break;
          }
        }
        case 403: {
          console.log(this.$router);
          this.$emit("pushMessage", "alert-warning", error.response.data.response_message);
          break;
        }
        case 500: {
          if (error.response.data.response_code === "MOCK012")
            this.$emit("pushMessage", "alert-danger", error.response.data.response_message);
          break;
        }
      }

    }
  }

};
