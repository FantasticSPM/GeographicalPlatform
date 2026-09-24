<template>
  <el-avatar v-if="userInfo.avatar" :src="userInfo.avatar" />
  <div class="default-avatar" v-else>{{ userInfo.nick_name[0] }}</div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
const userStore = useUserStore();
const props = defineProps({
  user: {
    type: Object,
  },
});

const userInfo = computed(() => {
  return props.user ?? userStore.user;
});
</script>

<style scoped lang="scss">
.default-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
