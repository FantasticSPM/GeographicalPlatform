import request from "@/utils/request";

// 获取地震列表
export function apiGetEarthquakeList() {
  return request({
    url: "/earthquake",
    method: "get",
  });
}

// 通过id获取地震详情
export function apiGetEarthquakeDetail(id) {
  return request({
    url: "/earthquake/" + id,
    method: "get",
  });
}
