const axios = require('axios');
const auth = require('./auth.service');
const instance = axios.create({
  baseURL: HOST_API,
  timeout: TIME_OUT,
  headers: {'client-id': 'mockup-frontend'},
});
const mockService = {
  Authorization: ""
};

/**
 * Authentication request
 */
//do login
mockService.doLogin = (data, callback) => {
  instance.post("/mocks/login", data).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
};

/**
 * Authorization request
 */
//do refresh token
mockService.doRefresh = function (err, callback) {
  if (!err.response) {
    return callback(err, null)
  } else if (err.response.data.response_code === auth.RESPONSE_DO_REFRESH) {
    console.log("do refresh");
    instance.get("/mocks/auth/refresh", {
      headers: {
        Authorization: getAuthorizationHeader()
      }
    }).then(response => {
      return callback(null, response)
    }).catch(err => {
      return callback(err, null)
    })
  } else {
    return callback(err, null)
  }
};


//get token and pass on the header
const getAuthorizationHeader = function () {
  let isAuthenticated = auth.getAuth();
  if (isAuthenticated === null) {
    throw new Error("user not authenticated")
  }
  return "Bearer " + isAuthenticated.token
};

//get user list
mockService.getListUsers = function (query, callback) {
  instance.get("/mocks/users" + query, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response.data)
  }).catch((err) => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getListUsers(query, callback)
    })
  });
};

//get list mocks
mockService.getListMocks = function (callback) {
  instance.get("/mocks/list", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response.data)
  }).catch((err) => {
    return callback(err, null)
  });
};

//get mocks page
mockService.getMockPage = (query, callback) => {
  instance.get("/mocks/page" + query, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response.data)
  }).catch((err) => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getMockPage(query, callback)
    })
  });
};

//get detail mocks
mockService.getDetailMock = (id, callback) => {
  instance.get("/mocks/" + id + "/detail", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response)
  }).catch((err) => {
    alert(err);
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getDetailMock(id, callback)
    })
  })
};

//add users access
mockService.addUserAccesOnMock = (id, data, callback) => {
  instance.put("/mocks/" + id + "/addUser", data, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response)
  }).catch((err) => {
    alert(err);
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.addUserAccesOnMock(id, data, callback)
    })
  })
};

//get detail mocks
mockService.getDetailMockWithAccess = (id, callback) => {
  instance.get("/mocks/" + id + "/detailWithAccess", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response)
  }).catch((err) => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getDetailMockWithAccess(id, callback)
    })
  })
};

//get detail mocks
mockService.searchUserByName = (q, callback) => {
  instance.get("/mocks/users/list" + q, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response)
  }).catch((err) => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.searchUserByName(id, callback)
    })
  })
};

mockService.getUsersMock = function (id, callback) {
  instance.get("/mocks/" + id + "/users", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response)
  }).catch((err) => {
    console.log(err.response);
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getUsersMock(id, callback)
    })
  })
};
mockService.getHistoriesMocks = function (id, callback) {
  instance.get("/mocks/" + id + "/histories", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response)
  }).catch((err) => {
    console.log(err.response);
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getHistoriesMocks(id, callback)
    })
  })
};
//create new mock
mockService.storeMock = (data, callback) => {
  instance.post("/mocks/store", data, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.storeMock(data, callback)
    })
  })
};


//update mock
mockService.updateMock = (id, data, callback) => {
  instance.put("/mocks/" + id + "/update", data, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.updateMock(id, data, callback)
    })
  })
};
//update mock
mockService.removeAccessUserOnMock = (id, userId, callback) => {
  instance.delete("/mocks/" + id + "/remove/" + userId, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.removeAccessUserOnMock(id, data, callback)
    })
  })
};

//get spec
mockService.getSpec = (id, callback) => {
  instance.get("/mocks/" + id + "/spec", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getSpec(id, callback)
    })
  })
};

//get spec
mockService.getSpecHistory = (id, historyId, callback) => {
  instance.get("/mocks/" + id + "/histories/" + historyId, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getSpecHistory(id, historyId, callback)
    })
  })
};

//get user list page
mockService.getUserList = function (query, callback) {
  instance.get("/mocks/users/list" + query, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response.data)
  }).catch((err) => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getUserList(query, callback)
    })
  });
};

//get user detail
mockService.getUserId = function (id, callback) {
  instance.get("/mocks/users/" + id + "/detail", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.getUserId(id, callback)
    })
  })
};

//update user id
mockService.updateUserById = function (id, data, callback) {
  instance.put("/mocks/users/" + id + "/update", data, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.updateUserById(id, data, callback)
    })
  })
};

//create new user
mockService.createNewUser = function (data, callback) {
  console.log("data");
  instance.post("/mocks/addUser", data, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    console.log(response);
    return callback(null, response)
  }).catch(err => {
    return mockService.doRefresh(err, (errResponse, response) => {
      if (errResponse != null) {
        return callback(errResponse, null)
      }
      auth.setAuth(response.data);
      return mockService.createNewUser(data, callback)
    })
  })
};


module.exports = mockService;
