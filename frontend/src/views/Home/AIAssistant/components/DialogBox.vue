<template>
  <div class="dialog-box">
    <BubbleList
      class="dialog-box-list"
      :list="aiSessionStore.messageList"
      maxHeight="calc(100% - 120px)"
      v-if="aiSessionStore.messageList.length"
    ></BubbleList>
    <div
      class="center"
      :class="{
        bottom: aiSessionStore.messageList.length > 0,
      }"
    >
      <div
        class="flex-center"
        style="justify-content: center"
        v-if="aiSessionStore.messageList.length === 0"
      >
        <logo></logo>
        <h3>你好，让我们开始聊天吧</h3>
      </div>
      <Sender
        v-model="senderValue"
        clearable
        :auto-size="{ minRows: 2, maxRows: 5 }"
        placeholder="快与AI智能助手-小空进行对话吧~"
        @submit="handleSubmit"
      >
      </Sender>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { XSender, BubbleList } from "vue-element-plus-x";
import Sender from "./Sender.vue";
import logo from "@/components/logo.vue";
import { apiSendDialogue } from "@/apis/backend/ai.js";
import { useAiSessiontore } from "@/stores/ai-session.js";
const aiSessionStore = useAiSessiontore();
const senderValue = ref("");

async function handleSubmit(e) {
  if (aiSessionStore.messageList.length === 0) {
    const sessionKey = new Date().getTime();
    aiSessionStore.createSession(sessionKey);
  }
  aiSessionStore.addMessage(
    getItem({
      key: new Date().getTime(),
      role: "user",
      content: senderValue.value,
    }),
  );

  // const res = await apiSendDialogue(getItems());

  aiSessionStore.addMessage(
    getItem({
      key: new Date().getTime() + Math.random(),
      role: "assistant",
      content: "你好，我是AI智能助手-小空，有什么可以帮助你的吗？",
      // ...res.data,
    }),
  );
  senderValue.value = "";
}

function getItem(item) {
  const { role } = item;

  const placement = role === "assistant" ? "start" : "end";
  const loading = false;
  const shape = "corner";
  const variant = role === "assistant" ? "filled" : "outlined";
  const isMarkdown = true;
  const typing = role === "assistant" ? true : false;
  const isFog = role === "assistant";
  const avatar =
    role === "assistant"
      ? "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      : "https://avatars.githubusercontent.com/u/76239030?v=4";
  return {
    ...item,
    placement, // start | end 气泡位置
    loading, // 当前气泡的加载状态
    shape, // 气泡的形状
    variant, // 气泡的样式
    isMarkdown, // 是否渲染为 markdown
    typing, // 是否开启打字器效果 该属性不会和流式接受冲突
    isFog, // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
    avatar,
    avatarSize: "24px", // 头像占位大小
    avatarGap: "12px", // 头像与气泡之间的距离
  };
}

function getItems() {
  return aiSessionStore.messageList.map((i) => {
    return {
      role: i.role,
      content: i.content,
    };
  });
}
</script>

<style scoped lang="scss">
.dialog-box {
  width: 70%;
  margin: 0 auto;
  margin-top: 60px;
  position: relative;
  height: calc(100% - 60px);
  // display: flex;
  // flex-direction: column;
  // height: 230px;
  // justify-content: space-between;
}

.center {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h3 {
    text-align: center;
    padding: 20px;
  }
}

.bottom {
  position: absolute;
  left: unset;
  bottom: 0;
  right: unset;
  top: unset;
  transform: unset;
}

.isSelect {
  color: #626aef;
  border: 1px solid #626aef !important;
  border-radius: 15px;
  padding: 3px 12px;
  font-weight: 700;
}

.btn {
  padding: 2px 12px;
  border: 1px solid silver;
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
}
</style>
