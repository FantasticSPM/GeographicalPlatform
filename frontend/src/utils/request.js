import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";
import { apiRefreshToken, isFreshToken } from "@/apis/backend/auth";

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

let isRefreshing = false;
const requestsQueue = [];
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => response.data,
  async function (error) {
    const { config, response } = error;

    if (!response || response.status !== 401 || config._retry) {
      return Promise.reject(error);
    }
    if (isFreshToken(config)) {
      logout(response?.data?.msg);
      return Promise.reject(error);
    }
    if (isRefreshing) {
      return new Promise((resolve) => {
        requestsQueue.push(() => {
          config._retry = true;
          resolve(instance(config));
        });
      });
    }

    isRefreshing = true;
    config._retry = true;

    try {
      await apiRefreshToken();
      requestsQueue.forEach((cb) => cb());
      requestsQueue.length = 0;
      return instance(config);
    } catch (err) {
      requestsQueue.length = 0;
      logout();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

function logout(msg) {
  ElMessage.error(msg || "登录过期，请重新登录");
  const route = router.currentRoute.value;
  router.push({
    name: "login",
    query: {
      url: route.name !== "login" ? route.fullPath : "",
    },
  });
}

export default instance;
