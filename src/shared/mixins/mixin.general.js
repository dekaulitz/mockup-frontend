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
      console.log(error)
      if (!error.response) {
        this.$emit("pushMessage", "alert-warning", error);
      } else
        switch (error.response.status) {
          case 401:
            this.$emit("pushMessage", "alert-warning", error.response.data.response_message);
            if (error.response.data.response_code === "MOCK012") {
              if (Auth.shouldLogout(error)) setTimeout(() => {
                this.$router.push({name: 'Login'});
              }, 1000);
              break;
            }
          case 403:
            this.$emit("pushMessage", "alert-warning", error.response.data.response_message);
            break;
          case 400:
            this.$emit("pushMessage", "alert-warning", error.response.data.response_message);
            break;
          case 422:
            if (error.response.data.response_code === "MOCK027") {
              let extraMessage="<ul>"
              for(let i =0;i<error.response.data.extraMessages.length;i++){
                extraMessage+="<li>"+error.response.data.extraMessages[i]+"</li>"
              }
              extraMessage+="</ul>"
              this.$emit("pushMessage", "alert-warning", extraMessage);
            } else
              this.$emit("pushMessage", "alert-warning", error.response.data.response_message);
            break;
          case 500:
            this.$emit("pushMessage", "alert-danger", error.response.data.response_message + ", something wrong with you're request with requestId " + error.response.data.requestId);
            break;

        }

    }
  }

};
