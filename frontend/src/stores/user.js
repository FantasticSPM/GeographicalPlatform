import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { apiGetUserInfo } from "@/apis/backend/auth";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);

  async function getUser() {
    const result = await apiGetUserInfo();
    if (result?.success) {
      user.value = result.data;
      return result.data;
    } else {
      ElMessage.error(result?.msg || "获取用户信息失败");
    }
  }

  function setUser(data) {
    user.value = data;
  }

  return { user, setUser, getUser };
});
