<template>
    <div id="map2d"></div>
</template>

<script setup>
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
    options: {
        type: Object,
        default: () => ({}),
    },
});

onMounted(() => {
    initMap();
});

const defaultOptions = {
    // style: "https://demotiles.maplibre.org/style.json",
    center: [102.77000056284464, 31.527867648804005],
    zoom: 3.19,
    minZoom: 2.5,
};

let map = null;
function initMap() {
    map = new maplibregl.Map({
        ...defaultOptions,
        ...props.options,
        container: "map2d", // container ID
        attributionControl: false,
        // projection: {
        //   type: "globe",
        // },
    });
    // map.setProjection({
    //   type: "globe",
    // });
    window.map = map;
    // map.addControl(new maplibregl.NavigationControl(), "bottom-right");
    // // 添加全屏按钮
    // map.addControl(new maplibregl.FullscreenControl(), "top-left");

    mapload();

    function mapload() {
        // 卫星底图
        // map.addSource("base-map", {
        //     type: "raster",
        //     tiles: [
        //         // "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        //         "https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
        //     ],
        //     tileSize: 256,
        //     maxzoom: 18,
        // });

        // map.addLayer({
        //     id: "base-map",
        //     type: "raster",
        //     source: "base-map",
        //     paint: {
        //         // "raster-contrast": 0.2,
        //         // "raster-brightness-min": 0.3,
        //         "raster-saturation": 0,
        //     },
        // });
    }
}

function destroyMap() {
    if (map) {
        map.remove();
        map = null;
        window.map = null;
        console.log("地图销毁");
    }
}

onBeforeUnmount(() => {
    destroyMap();
});
</script>

<style scoped>
#map2d {
    width: 100%;
    height: 100%;
    /* background-color: #ccc; */
}
</style>

<style>
.maplibregl-popup-content {
    padding: 5px 10px;
}
</style>
