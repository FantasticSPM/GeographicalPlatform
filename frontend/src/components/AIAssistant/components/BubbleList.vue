<template>
  <div class="bubble-list" ref="bubbleList">
    <template v-for="i in list" :key="i.key">
      <Bubble
        :data="i"
        v-if="
          ['assistant', 'ai', 'human', 'user'].includes(i.role) && i.content
        "
      ></Bubble>
    </template>
    <Bubble v-if="thinking" :data="data"></Bubble>
  </div>
</template>

<script setup>
import { watch, ref, nextTick, onUnmounted } from "vue";
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
  thinking: {
    type: Boolean,
    default: false,
  },
});

const bubbleList = ref(null);
const data = ref({
  role: "assistant",
  content: "思考中...",
});

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
