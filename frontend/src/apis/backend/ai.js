import request from "@/utils/request";

// 发送对话
export function apiSendDialogue(content) {
  return request({
    url: "/chat",
    method: "post",
    data: content,
  });
}
