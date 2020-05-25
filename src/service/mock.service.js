const axios = require('axios');
const auth = require('./auth.service')
const instance = axios.create({
  baseURL: HOST_API,
  timeout: TIME_OUT,
  headers: {'client-id': 'mockup-frontend'}
});
const mockService = {
  Authorization: ""
}


const getAuthorizationHeader = function () {
  let isAuthenticated = auth.getAuth()
  if (isAuthenticated === null) {
    throw new Error("user not authenticated")
  }
  return "Bearer " + isAuthenticated.token
}
mockService.getListUsers = function (query, callback) {
  instance.get("/mocks/users" + query, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response.data)
  }).catch((err) => {
    return callback(err, null)
  });
}

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
}

mockService.getMockPage = function (query, callback) {
  instance.get("/mocks/page" + query, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response.data)
  }).catch((err) => {
    return callback(err, null)
  });
}

mockService.getDetailMock = (id, callback) => {
  instance.get("/mocks/" + id + "/detail", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response)
  }).catch((err) => {
    return callback(err, null)
  })
}

mockService.storeMock = (data, callback) => {
  instance.post("/mocks/store", data, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}

mockService.updateMock = (id, data, callback) => {
  instance.put("/mocks/" + id + "/update", data, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}

mockService.getSpec = (id, callback) => {
  instance.get("/mocks/" + id + "/spec", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}

mockService.doLogin = (data, callback) => {
  instance.post("/mocks/login", data).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}
mockService.getUserList = function (query, callback) {
  instance.get("/mocks/users/list" + query, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then((response) => {
    return callback(null, response.data)
  }).catch((err) => {
    return callback(err, null)
  });
}

mockService.getUserId = function (id, callback) {
  instance.get("/mocks/users/" + id + "/detail", {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}
mockService.updateUserById = function (id, data, callback) {
  instance.put("/mocks/users/" + id + "/update", data, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}
mockService.createNewUser=function(data,callback){
  instance.post("/mocks/addUser", data, {
    headers: {
      Authorization: getAuthorizationHeader()
    }
  }).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}

module.exports = mockService
