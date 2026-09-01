<template>
    <div class="geology-container">
        <div class="geology-left">
            <MenuBar></MenuBar>
        </div>
        <div class="geology-body">
            <MapContainer></MapContainer>
            <div class="geology-content">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script setup>
import MenuBar from './components/MenuBar.vue';
import MapContainer from '@/components/map/MapContainer.vue';
</script>

<style lang="scss" scoped>
.geology-container {
    display: flex;
    height: calc(100vh - 80px - 60px);

    .geology-left {
        width: 80px;
        height: 100%;
    }

    .geology-body {
        width: 100%;
        position: relative;

        .geology-content {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
            pointer-events: none;
            width: 100%;
            height: 100%;
            padding: 10px;
        }
    }
}
</style>