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
