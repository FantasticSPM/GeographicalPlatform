<template>
    <iframe :src="src" class="iframe-page" height="100%"></iframe>
</template>

<script setup>
defineProps(['src'])
</script>

<style scoped lang="scss">
.iframe-page {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
}
</style>