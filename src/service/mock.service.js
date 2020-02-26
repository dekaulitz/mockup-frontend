const axios = require('axios');
const instance = axios.create({
  baseURL: hostApi,
  timeout: 5000,
  headers: {'client-id': 'mockup-frontend'}
});
const mockService = {}

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

module.exports = mockService
