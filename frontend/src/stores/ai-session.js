import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAiSessiontore = defineStore("ai-session", () => {
  const sessionList = ref([]);
  const currentSession = ref(null);
  const messageList = ref([]);

  // 创建对话
  function createSession(id, name = "新对话") {
    if (currentSession.value && messageList.value.length === 0) return false;
    if (currentSession.value && messageList.value.length > 0) {
      savaMessage(currentSession.value, messageList.value);
    }
    sessionList.value.unshift({
      id,
      name: name + id,
    });
    currentSession.value = id;
  }

  // 切换对话
  function switchSession(id) {
    savaMessage(currentSession.value, messageList.value);
    currentSession.value = id;
    messageList.value =
      sessionList.value.find((i) => i.id === id).messages || [];
  }

  // 保存对话
  function savaMessage(id, messages) {
    const oldSession = sessionList.value.find((item) => item.id === id);
    if (oldSession) {
      oldSession.messages = messages;
    }
  }

  // 添加消息
  function addMessage(message) {
    messageList.value.push(message);
  }

  // 清空消息
  function clearMessage() {
    messageList.value = [];
  }

  return {
    sessionList,
    currentSession,
    messageList,
    createSession,
    switchSession,
    addMessage,
    clearMessage,
  };
});
