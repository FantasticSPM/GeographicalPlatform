<template>
  <div class="bubble-list" ref="bubbleList">
    <template v-for="i in all_list" :key="i.key">
      <Bubble
        :data="i"
        v-if="
          ['assistant', 'ai', 'human', 'user'].includes(i.role) && i.content
        "
      ></Bubble>
    </template>
  </div>
</template>

<script setup>
import { watch, ref, nextTick, onUnmounted, computed } from "vue";
import Bubble from "./Bubble.vue";
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  maxHeight: {
    type: String,
    default: "auto",
  },
});
const actionList = ref([]);
const all_list = computed(() => {
  return [...props.list, ...actionList.value];
});
const bubbleList = ref(null);

watch(
  () => props.list,
  () => {
    nextTick(() => {
      bubbleList.value.scrollTo({
        top: bubbleList.value.scrollHeight,
      });
    });
  },
  {
    deep: true,
  },
);

function startAction(text) {
  endAction();
  actionList.value.push({
    key: Math.random(),
    role: "assistant",
    content: text,
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    avatarSize: "24px", // 头像占位大小
    avatarGap: "12px", // 头像与气泡之间的距离
  });
}

function endAction() {
  actionList.value.length = 0;
}

defineExpose({
  startAction,
  endAction,
});
</script>

<style scoped lang="scss">
.bubble-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: v-bind(maxHeight);
  overflow: auto;
  padding: 5px;
  scroll-behavior: smooth;
}
</style>
