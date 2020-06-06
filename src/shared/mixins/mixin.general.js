import Auth from "../../service/auth.service";

export const mixGeneral = {
  data: function () {
    return {
      hasAccess: false
    }
  },
  methods: {
    checkAccessCurretUser: function (mockDetail) {
      if (mockDetail.currentAccessUser) {
        return this.hasAccess = mockDetail.currentAccessUser && mockDetail.currentAccessUser.access === Auth.MOCKS_READ_WRITE
      }
      return this.hasAccess
    }
  }

};
