const axios = require('axios');
const instance = axios.create({
  baseURL: HOST_API,
  timeout: TIME_OUT,
  headers: {'client-id': 'mockup-frontend'}
});
const mockService = {
  Authorization:""
}

mockService.getListMocks = function (callback) {
  instance.get("/mocks/list").then((response) => {
    return callback(null, response.data)
  }).catch((err) => {
    return callback(err, null)
  });
}

mockService.getMockPage = function (query,callback) {
  instance.get("/mocks/page"+query).then((response) => {
    return callback(null, response.data)
  }).catch((err) => {
    return callback(err, null)
  });
}

mockService.getDetailMock = (id, callback) => {
  instance.get("/mocks/" + id).then((response) => {
    return callback(null, response)
  }).catch((err) => {
    return callback(err, null)
  })
}

mockService.storeMock = (data, callback) => {
  instance.post("/mocks/store", data).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}

mockService.updateMock = (id, data, callback) => {
  instance.put("/mocks/" + id, data).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}


mockService.doLogin=(data,callback)=>{
  instance.post("/mocks/login", data).then(response => {
    return callback(null, response)
  }).catch(err => {
    return callback(err, null)
  })
}

module.exports = mockService
