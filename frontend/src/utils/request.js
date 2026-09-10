import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const data = response.data;
    const { code, msg } = data;
    switch (code) {
      case 200:
        return data;
      case 401:
        ElMessage.error(msg || "登录过期，请重新登录");
        const route = router.currentRoute.value;
        router.push({
          name: "login",
          query: {
            url: route.name !== "login" ? route.fullPath : "",
          },
        });
        return Promise.reject(data);
      default:
        return data;
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default instance;
