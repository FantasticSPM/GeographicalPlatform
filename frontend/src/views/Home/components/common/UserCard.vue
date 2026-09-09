<template>
  <el-dropdown
    placement="bottom"
    trigger="click"
    popper-class="user_dropdown"
    :show-arrow="false"
  >
    <template #dropdown>
      <div class="user_dropdown_item">
        <div class="flex-between">
          <div
            class="title"
            @click="
              $router.push({
                name: 'user',
              })
            "
          >
            <el-icon><Avatar /></el-icon>
            <span>账号</span>
            <el-icon><ArrowRight /></el-icon>
          </div>
          <el-button size="small">退出登录</el-button>
        </div>
        <div class="flex-center" style="gap: 10px">
          <el-avatar class="avatar" :src="avatarUrl" />
          <div class="user-info">
            <div class="nick-name">
              <span>{{ userStore.user?.nick_name || "" }}</span>
              <el-icon><CopyDocument /></el-icon>
            </div>
            <div class="user-name">
              <span>用户名：{{ userStore.user?.username || "" }}</span>
              <el-icon><CopyDocument /></el-icon>
            </div>
            <el-tag size="small" type="primary">个人账号</el-tag>
          </div>
        </div>
      </div>
    </template>

    <div class="user" id="user">
      <el-avatar :src="avatarUrl" />
      <span>{{ userStore.user?.nick_name || "" }}</span>
    </div>
    >
  </el-dropdown>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { getPublicUrl } from "@/utils/common";
const userStore = useUserStore();
const avatarUrl = computed(() => {
  return userStore.user?.avatar || getPublicUrl("/images/defaultAvatar.jpg");
});
</script>

<style scoped lang="scss">
.user {
  display: flex;
  gap: 8px;
  color: #fff;
  align-items: center;
  cursor: pointer;
}
</style>

<style lang="scss">
.user_dropdown {
  width: 300px;
  top: 80px !important;
  // right: 12px !important;
  // left: inherit !important;
  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    font-size: 14px;
    &:hover {
      cursor: pointer;
      color: #0b7ae1;
    }
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .user_dropdown_item {
    padding: 10px;
    border-bottom: 1px solid #e7eef4;
  }

  .user-info {
    .nick-name {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
    }
    .user-name {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 400;
      color: #888888;
    }
  }
}
</style>
