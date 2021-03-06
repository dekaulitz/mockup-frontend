const AUTHORIZATION = "AUTHORIZATION"

const auth = {
  MOCKS_READ: "MOCKS_READ",
  MOCKS_READ_WRITE: "MOCKS_READ_WRITE",
  USERS_READ: "USERS_READ",
  USERS_READ_WRITE: "USERS_READ_WRITE",
  RESPONSE_DO_REFRESH: "MOCK011",
  RESPONSE_DO_LOGOUT: "MOCK012"
}

auth.getAuth = function () {
  return JSON.parse(localStorage.getItem(AUTHORIZATION))
}

auth.setAuth = function (auth) {
  localStorage.setItem(AUTHORIZATION, JSON.stringify(auth))
}

auth.delAuth = function () {
  localStorage.removeItem(AUTHORIZATION)
}

auth.shouldLogout = function (err) {
  if (err.response.data.response_code === this.RESPONSE_DO_LOGOUT) {
    this.delAuth()
    return true
  }
  return false
}

//has access for create mocks
auth.hasCreateMockaccess = function () {
  let isAuthenticated = this.getAuth()
  if (isAuthenticated !== null) {
    if (isAuthenticated.accessMenus !== null) {
      if (isAuthenticated.accessMenus.includes(this.MOCKS_READ_WRITE))
        return true;
    }
  }
}
//has access for updating the mocks
auth.hasUpdateMocks = function () {
  let isAuthenticated = this.getAuth()
  if (isAuthenticated !== null) {
    if (isAuthenticated.accessMenus !== null) {
      if (isAuthenticated.accessMenus.includes(this.MOCKS_READ_WRITE))
        return true;
    }
  }
}
//has access for access menu users
auth.hasUsersAccessMenu = function () {
  let isAuthenticated = this.getAuth()
  if (isAuthenticated !== null) {
    if (isAuthenticated.accessMenus !== null) {
      if (isAuthenticated.accessMenus.includes(this.USERS_READ) || isAuthenticated.accessMenus.includes(this.USERS_READ_WRITE))
        return true;
    }
  }
}
//has access for
auth.hasUsersAccess = function () {
  let isAuthenticated = this.getAuth()
  if (isAuthenticated !== null) {
    if (isAuthenticated.accessMenus !== null) {
      if (isAuthenticated.accessMenus.includes(this.USERS_READ_WRITE))
        return true;
    }
  }
}

auth.hasCreateUsersAccess = function () {
  let isAuthenticated = this.getAuth()
  if (isAuthenticated !== null) {
    if (isAuthenticated.accessMenus !== null) {
      if (isAuthenticated.accessMenus.includes(this.USERS_READ_WRITE))
        return true;
    }
  }
}
auth.hasUpdateUsersAccess = function () {
  let isAuthenticated = this.getAuth()
  if (isAuthenticated !== null) {
    if (isAuthenticated.accessMenus !== null) {
      if (isAuthenticated.accessMenus.includes(this.USERS_READ_WRITE))
        return true;
    }
  }
}


module.exports = auth;
