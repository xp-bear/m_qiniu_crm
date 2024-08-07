// index.js
import http from "./request";

// 1.查询文件接口
export function msearchfile(params) {
  return http("/msearchfile", {
    method: "post",
    params: params,
  });
}
// 2.新建文件接口
export function minsertfileApi(params) {
  return http("/minsertfile", {
    method: "post",
    params: params,
  });
}
// 3.删除文件接口
export function deletefileApi(params) {
  return http("/deletefile", {
    method: "post",
    params: params,
  });
}
// 4.改变文件公开隐私状态
export function isPublicChangeApi(params) {
  return http("mispublic", {
    method: "post",
    params: params,
  });
}

// 5.移动端 查询共享文件的数据
export function mSearchShareFileApi(params) {
  return http("msearchsharefile", {
    method: "post",
    params: params,
  });
}

// // 5.移动端 增加浏览量的接口
export function minsertviewApi(params) {
  return http("minsertview", {
    method: "get",
    params: params,
  });
}

// 6.移动端 根据文件id增加收藏量
export function minsertlikeApi(params) {
  return http("minsertlike", {
    method: "get",
    params: params,
  });
}
// 7.查询用户对文件的收藏情况
export function msearchlikefileApi(params) {
  return http("msearchlikefile", {
    method: "post",
    params: params,
  });
}
// 8.新增一条收藏红心数据
export function minsertlikefileApi(params) {
  return http("minsertlikefile", {
    method: "post",
    params: params,
  });
}

// ----------------------------------------------------------------------------

// 七牛云删除文件
export function deleteQiNiuFileApi(params) {
  return http("/delete", {
    method: "post",
    params: params,
  });
}

// 请求七牛云的token函数
export function getQiNiuTokenApi(params) {
  return http("/token", {
    method: "get",
    params: params,
  });
}

// 注册接口
export function createuserApi(params) {
  return http("/createuser", {
    method: "post",
    params: params,
  });
}

//登录接口
export function userloginApi(params) {
  return http("/userlogin", {
    method: "post",
    params: params,
  });
}

// 发送邮件接口
export function sendmailApi(params) {
  return http("/sendmail", {
    method: "post",
    params: params,
  });
}

// 判断当前邮箱是否有注册
export function sameemailApi(params) {
  return http("/sameemail", {
    method: "post",
    params: params,
  });
}
