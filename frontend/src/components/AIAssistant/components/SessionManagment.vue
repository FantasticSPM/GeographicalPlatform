<template>
  <div class="session-management">
    <div class="top">
      <div class="flex-center">
        <logo></logo>
        <h3 class="title">AI智能助手-小空</h3>
      </div>
      <el-button circle text @click="handleShow">
        <el-icon><Fold /></el-icon>
      </el-button>
    </div>
    <el-button plain class="start-btn" :icon="ChatLineRound" @click="create"
      >创建新会话</el-button
    >

    <div
      class="session-management-list"
      v-if="aiSessionStore.sessionList.length > 0"
    >
      <!-- <div class="session-management-group-title">今天</div> -->
      <div
        v-for="i in aiSessionStore.sessionList"
        :key="i.id"
        class="session-management-item"
        :class="{
          'session-management-item-active':
            aiSessionStore.currentSession === i.id,
        }"
        @click="aiSessionStore.switchSession(i.id)"
      >
        <div>{{ i.name }}</div>
        <div class="operation">
          <el-icon><More /></el-icon>
        </div>
      </div>
    </div>
    <div v-else class="session-management-empty">
      <Chat></Chat>
      <span>暂无历史对话</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Chat from "@/components/Icon/Chat.vue";
import { ChatLineRound } from "@element-plus/icons-vue";
import logo from "@/components/logo.vue";
import { useAiSessiontore } from "@/stores/ai-session";

const aiSessionStore = useAiSessiontore();

const emits = defineEmits(["show", "create"]);
function handleShow() {
  emits("show", false);
}

function create() {
  const sessionKey = new Date().getTime();
  aiSessionStore.createSession(sessionKey, "新会话");
  if (aiSessionStore.currentSession && aiSessionStore.messageList.length > 0) {
    aiSessionStore.clearMessage();
  }
}
</script>

<style scoped lang="scss">
.session-management {
  padding: 6px 12px 0;
  height: 100%;
  .flex-center {
    gap: 10px;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    img {
      width: 30px;
    }
  }
  .title {
    color: #3964fe;
    text-align: center;
    font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    letter-spacing: 2px;
  }

  .start-btn {
    width: calc(100%);
    --el-border-radius-base: 15px;
  }

  .session-management-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 75px - 32px);
    span {
      margin-top: 10px;
      color: #81858c;
    }
  }

  .session-management-list {
    margin-top: 24px;
  }

  .session-management-group-title {
    z-index: 20;
    color: #81858c;
    background-color: #f9fafb;
    box-shadow: 4px 0 0 #f9fafb;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 2px 10px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .session-management-item {
    cursor: pointer;
    outline: none;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    display: flex;
    position: relative;
    padding: 9px 6px 9px 10px;
    color: #0f1115;
    font-size: 14px;
    border-radius: 12px;
    height: 40px;
    line-height: 22px;
    &:hover {
      background-color: #f1f3f5;
    }

    &:hover .operation {
      display: block;
    }

    .operation {
      display: none;
    }
  }

  .session-management-item-active {
    background-color: #e4edfd;
    color: #3964fe;
  }
}
</style>
