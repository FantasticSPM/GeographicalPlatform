import request from "@/utils/request";

// 获取地震列表
export function apiGetEarthquakeList() {
  return request({
    url: "/earthquake/list",
    method: "get",
  });
}

// 通过id获取地震详情
export function apiGetEarthquakeDetail(id) {
  return request({
    url: "/earthquake/list/" + id,
    method: "get",
  });
}

// 获取地震新闻列表
export function apiGetEarthquakeNewsList() {
  return request({
    url: "/earthquake/news",
    method: "get",
  });
}
