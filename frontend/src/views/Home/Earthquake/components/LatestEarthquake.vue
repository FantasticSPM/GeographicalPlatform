<template>
  <Panel2 eyebrow="Latest Earthquake" subtitle="" title="最新地震" class="info">
    <ul v-if="data.length">
      <li
        v-for="i in data"
        :key="i.id"
        :title="i.content"
        @click="handleDetailsClick(i)"
      >
        <span class="content">{{ i.content }}</span>
        <span class="time">{{ i.time }}</span>
      </li>
    </ul>
    <el-empty v-else description="暂无数据"></el-empty>
  </Panel2>
</template>

<script setup>
import Panel2 from "@/components/panel/Panel2.vue";

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["clickItem"]);
async function handleDetailsClick(item) {
  emits("clickItem", item);
}
</script>

<style scoped lang="scss">
.info {
  position: absolute;
  top: 100px;
  left: 10px;
  z-index: 2;
  ul {
    max-height: 400px;

    li {
      padding: 5px 0px;
      cursor: pointer;
      color: #888888;
      font-size: 14px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      --time-width: 40px;
      .time {
        width: var(--time-width);
        display: inline-block;
        color: #888888;
        font-size: 12px;
        text-align: right;
      }
      .content {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: calc(100% - var(--time-width));
        margin-left: 10px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #888888;
      }
      &:hover {
        color: #ffffff;
      }
    }
  }
}
</style>
