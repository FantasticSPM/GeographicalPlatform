import request from "@/utils/request";

// 获取个人信息
export function apiGetUserInfo() {
  return request({
    url: "/user/me",
    method: "get",
  });
}
