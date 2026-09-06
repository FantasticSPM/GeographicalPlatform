import request from "@/utils/request";

export function apiGetEarthquakeList() {
    return request({
        url: "/earthquake",
        method: "get",
    });
}