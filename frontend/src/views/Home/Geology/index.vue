<template>
    <div class="geology-container">
        <div class="geology-left">
            <MenuBar></MenuBar>
        </div>
        <div class="geology-body">
            <div class="geology-content">
                <RouterView></RouterView>
            </div>
            <Map2D></Map2D>
            <MapBar class="map-bar-tool"></MapBar>
            <BaseMapControl class="base-map-control"></BaseMapControl>
        </div>
    </div>
</template>

<script setup>
import MenuBar from './components/MenuBar.vue';
import Map2D from '@/components/map/Map2D/Map2D.vue';
import MapBar from '@/components/map/MapBar/MapBar.vue';
import BaseMapControl from '@/components/map/Control/BaseMapControl/BaseMapControl.vue';
</script>

<style lang="scss" scoped>
.geology-container {
    display: flex;
    height: calc(100vh - 80px);

    .geology-left {
        width: 80px;
        height: 100%;
    }

    .geology-body {
        width: 100%;
        position: relative;
        overflow: hidden;
        display: flex;

        .map-bar-tool {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 999;
            pointer-events: auto;
        }

        .base-map-control {
            position: absolute;
            bottom: 10px;
            right: 10px;
            z-index: 999;
            pointer-events: auto;
        }

        .geology-content {
            // position: absolute;
            // top: 0;
            // left: 0;
            // z-index: 999;
            // pointer-events: none;
            height: 100%;
            padding: 5px;
        }
    }
}
</style>