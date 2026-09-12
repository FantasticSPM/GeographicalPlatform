import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";
import { apiRefreshToken, isFreshToken } from "@/apis/backend/auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let isSessionExpired = false;
let sessionAbortController = new AbortController();
const requestsQueue = [];

// 登录、注册必须允许在会话过期后继续发送，否则用户无法重新建立会话。
const publicAuthPaths = ["/auth/login", "/auth/register"];

function isPublicAuthRequest(config) {
  const url = String(config?.url ?? "").split("?")[0];
  return publicAuthPaths.some((path) => url === path || url.endsWith(path));
}

function createSessionExpiredError() {
  return new axios.CanceledError("登录已过期");
}

function resetSessionState() {
  isSessionExpired = false;
  sessionAbortController = new AbortController();
}

// 拒绝所有等待刷新 Token 的请求，避免刷新失败后它们继续重试。
function flushRequests(error) {
  const queue = requestsQueue.splice(0);

  queue.forEach(({ config, resolve, reject }) => {
    if (error) {
      reject(error);
      return;
    }

    config._retry = true;
    resolve(instance(config));
  });
}

function expireSession() {
  const error = createSessionExpiredError();

  if (isSessionExpired) {
    return error;
  }

  isSessionExpired = true;

  // 取消已经发出但仍在等待响应的业务请求；登录和注册请求不使用此 signal。
  sessionAbortController.abort();
  flushRequests(error);

  ElMessage.error("登录过期，请重新登录");

  const route = router.currentRoute.value;
  router.push({
    name: "login",
    query: {
      url: route.name !== "login" ? route.fullPath : "",
    },
  });

  return error;
}

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (isPublicAuthRequest(config)) {
      // 用户从登录页重新登录时，开启一个新的会话请求生命周期。
      if (isSessionExpired) {
        resetSessionState();
      }
      return config;
    }

    if (isSessionExpired) {
      return Promise.reject(createSessionExpiredError());
    }

    // 让会话失效时可以主动取消已发出的业务请求。
    if (!config.signal) {
      config.signal = sessionAbortController.signal;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  async (response) => {
    const { config, data } = response;

    if (isSessionExpired && !isPublicAuthRequest(config)) {
      return Promise.reject(createSessionExpiredError());
    }

    if (
      isPublicAuthRequest(config) ||
      !data ||
      data.code !== 401 ||
      config?._retry
    ) {
      return data;
    }

    return handle401(data, config);
  },
  async (error) => {
    // 被会话失效主动取消的请求不应再次触发刷新逻辑。
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const response = error?.response;
    const config = response?.config ?? error?.config;

    if (
      !response ||
      response.status !== 401 ||
      !config ||
      isPublicAuthRequest(config) ||
      config._retry
    ) {
      return Promise.reject(error);
    }

    return handle401(response.data, config);
  },
);

async function handle401(data, config) {
  if (isSessionExpired) {
    return Promise.reject(createSessionExpiredError());
  }

  // 刷新接口本身返回 401，说明 Refresh Token 已失效，不能再次刷新。
  if (isFreshToken(config)) {
    return Promise.reject(expireSession());
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      requestsQueue.push({ config, resolve, reject });
    });
  }

  isRefreshing = true;
  config._retry = true;

  try {
    await apiRefreshToken();
    const request = instance(config);
    flushRequests();
    return request;
  } catch {
    // 刷新请求失败时，统一阻止所有后续请求并结束等待队列。
    return Promise.reject(expireSession());
  } finally {
    isRefreshing = false;
  }
}

export default instance;
