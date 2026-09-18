<template>
  <Panel2 eyebrow="Latest Earthquake" subtitle="" title="最新地震" class="info">
    <ul v-if="data.length">
      <li
        v-for="i in data"
        :key="i.id"
        :title="i.content"
        @click="handleDetailsClick(i)"
      >
        <span class="magnitude">{{ i.magnitude }}</span>
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

const emits = defineEmits(["click"]);
async function handleDetailsClick(item) {
  emits("click", item);
}
</script>

<style scoped lang="scss">
.info {
  position: absolute;
  top: 104px;
  left: 24px;
  z-index: 2;
  width: min(360px, calc(100vw - 48px)) !important;

  :deep(.panel2__header) {
    padding: 18px 18px 14px;
  }

  :deep(.panel2__body) {
    padding: 2px 18px 16px;
  }

  ul {
    max-height: 380px;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    list-style: none;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 99px;
      background: rgba(117, 177, 198, 0.35);
    }
  }

  li {
    position: relative;
    display: grid;
    min-height: 48px;
    grid-template-columns: 44px minmax(0, 1fr) 25px;
    gap: 5px;
    align-items: center;
    padding: 9px 2px 9px 8px;
    border-bottom: 1px solid rgba(126, 185, 207, 0.13);
    cursor: pointer;
    color: #afc3cc;
    font-size: 13px;
    transition:
      background-color 160ms ease,
      color 160ms ease;

    &:last-child {
      border-bottom: 0;
    }

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 3px;
      height: 18px;
      border-radius: 0 2px 2px 0;
      background: #52bfdc;
      content: "";
      opacity: 0;
      transform: translateY(-50%);
      transition: opacity 160ms ease;
    }

    .magnitude {
      display: inline-flex;
      width: 36px;
      height: 24px;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      color: #bdebf7;
      background: rgba(53, 137, 163, 0.34);
      font-size: 12px;
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    .content {
      min-width: 0;
      overflow: hidden;
      line-height: 1.45;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .time {
      color: #718f9c;
      font-size: 11px;
      text-align: right;
      white-space: nowrap;
    }

    &:hover {
      background: rgba(57, 139, 166, 0.12);
      color: #effcff;

      &::before {
        opacity: 1;
      }

      .magnitude {
        color: #e0f9ff;
        background: rgba(53, 157, 190, 0.58);
      }

      .time {
        color: #a7d2df;
      }
    }
  }

  :deep(.el-empty) {
    padding: 20px 0 12px;
  }

  :deep(.el-empty__description) {
    color: #7f9bad;
  }
}

@media (max-width: 560px) {
  .info {
    top: 84px;
    left: 16px;
    width: calc(100vw - 32px) !important;
  }
}
</style>
