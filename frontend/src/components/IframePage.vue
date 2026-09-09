<template>
  <iframe :src="src" class="iframe-page" :height="height"></iframe>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    default: "100%",
  },
});
</script>

<style scoped lang="scss">
.iframe-page {
  width: 100%;
  border: none;
  display: block;
}
</style>
