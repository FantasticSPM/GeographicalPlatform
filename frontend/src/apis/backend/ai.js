import request from "@/utils/request";

// 发送对话
export function apiSendDialogue(content) {
  if (content.stream) {
    const baseURL = import.meta.env.VITE_API_URL;
    const url = new URL(baseURL + "/chat");

    return fetch(url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
  } else {
    return request({
      url: "/chat",
      method: "post",
      data: {
        ...content,
      },
    });
  }
}
