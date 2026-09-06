<template>
    <div class="earthquake-container">
        <Map3D></Map3D>
        <div class="news">
            <NewsAnnounce v-for="i in messages" :key="i.id" :message="i.message"></NewsAnnounce>
        </div>
    </div>
</template>

<script setup>
import Map3D from '@/components/map/Map3D/Map3D.vue'
import NewsAnnounce from './components/NewsAnnounce.vue';

const messages = [
    {
        id: 1,
        message: '2023年10月1日，我国某地区发生7.5级地震，造成重大人员伤亡和财产损失。'
    },
    {
        id: 2,
        message: '台风“科罗旺”最新位置：北纬29.2度，东经127.2度，中心附近最大风力8级。'
    },
    {
        id: 3,
        message: '2023年10月3日，我国某地区发生5.5级地震，造成轻微的人员伤亡和财产损失。'
    }
]
</script>

<style lang="scss" scoped>
.earthquake-container {
    width: 100%;
    height: calc(100vh - 80px);
    position: relative;

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
}
</style>