import  request from "./request"
function test(data) {
  return request({
    url: '/WebService.asmx/InitService',
    method: 'post',
    data
  })
}
function testGet() {
  return request({
    url: '/api/getSubjectQuesTypeGenereInfo',
    method: 'get'
  })
}
export {test,testGet}
