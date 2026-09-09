<template>
  <div class="news">
    <NewsAnnounce
      v-for="i in data"
      :message="i.content"
      :key="i.id"
    ></NewsAnnounce>
  </div>
</template>

<script setup>
import NewsAnnounce from "./NewsAnnounce.vue";
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
.news {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
