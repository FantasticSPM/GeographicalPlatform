<template>
  <div
    class="bubble"
    :class="{
      'flex-end': data.role === 'user',
    }"
  >
    <img :src="data.avatar" alt="" class="avatar" />
    <div class="content">{{ data.content }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="scss">
.bubble {
  display: flex;
  align-items: center;
  gap: v-bind("props.data.avatarGap");

  .avatar {
    width: v-bind("props.data.avatarSize");
    height: v-bind("props.data.avatarSize");
  }
  .content {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    white-space: pre-wrap;
  }
}
.flex-end {
  flex-direction: row-reverse;
}
</style>
