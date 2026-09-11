import request from "@/utils/request";

// 注册
export function apiRegister(data) {
  return request({
    url: "/auth/register",
    method: "post",
    data,
  });
}

// 登录
export function apiLogin(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

// 登出
export function apiLogout() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}

// 刷新token
export function apiRefreshToken() {
  return request({
    url: "/auth/refresh",
    method: "post",
    __isRefreshToken: true,
  });
}

export function isFreshToken(config) {
  return !!config.__isRefreshToken;
}

// 获取个人信息
export function apiGetUserInfo() {
  return request({
    url: "/auth/me",
    method: "get",
  });
}
