<template>
    <div class="earthquake-container">
        <Map3D></Map3D>
        <NewsAnnounce class="news"></NewsAnnounce>
    </div>
</template>

<script setup>
import Map3D from '@/components/map/Map3D/Map3D.vue'
import NewsAnnounce from './components/NewsAnnounce.vue';
</script>

<style lang="scss" scoped>
.earthquake-container {
    width: 100%;
    height: calc(100vh - 80px);
    position: relative;

    .news {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 2;
    }
}
</style>