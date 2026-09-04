<template>
    <div id="map3d"></div>
</template>

<script setup>
import * as Cesium from 'cesium';
import { onMounted, onUnmounted } from 'vue';
import 'cesium/Build/Cesium/Widgets/widgets.css';

const baseUrl = new URL(import.meta.env.BASE_URL, import.meta.url).href
window.CESIUM_BASE_URL = new URL('/Cesium', baseUrl).href;

function initMap() {
    const viewer = new Cesium.Viewer('map3d', {
        animation: false, // 控制场景动画的播放速度控件
        baseLayerPicker: false, // 底图切换控件
        fullscreenButton: false, // 全屏按钮
        geocoder: false, // 地理位置查询定位控件
        homeButton: false, // 默认相机位置控件
        infoBox: false, // 点击要素之后显示的信息
        sceneModePicker: false, // 场景模式切换控件
        selectionIndicator: false, // 点击显示绿色小圆圈
        timeline: false, // 时间滚动条控件
        navigationHelpButton: false, // 默认的相机控制提示控件
        baseLayer: new Cesium.ImageryLayer(new Cesium.UrlTemplateImageryProvider({
            url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        })),
    });
    window.viewer = viewer;
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.scene.globe.showGroundAtmosphere = true; // 显示地球大气层

    const heading = Cesium.Math.toRadians(0);
    const pitch = Cesium.Math.toRadians(-90);
    const center = [116.404, 39.915, 6000000];
    viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(center[0], center[1], center[2]), new Cesium.HeadingPitchRange(heading, pitch, 0.0000000001));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
}

onMounted(() => {
    initMap();
})

onUnmounted(() => {
    if (window.viewer) {
        window.viewer.destroy();
        delete window.viewer;
    }
})
</script>

<style scoped>
#map3d {
    width: 100%;
    height: 100%;
}
</style>