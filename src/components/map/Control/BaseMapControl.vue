<template>
    <div class="base-map-control">
        <div class="current-base-map" :title="currentBaseMap.name">
            <img :src="currentBaseMap.image" alt="">
        </div>
        <div class="base-map-list">
            <div v-for="i in baseMapList" class="base-map-item" @click="changeBaseMap(i)" :title="i.name">
                <img :src="i.image" alt="">
                <span class="base-map-item-name" :title="i.name">{{ i.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const baseMapName = 'base-map'
const baseMapKey = 'currentBaseMap'
const baseMapList = [
    {
        id: 'gaode-satellite',
        name: '高德卫星',
        image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/satellite-imagery.640c3d8a.png',
        url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    },
    {
        id: 'gaode-standard',
        name: '高德矢量',
        image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/standard-map-icon.a56733ec.png',
        url: 'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
    },
    // {
    //     id: 'baidu-satellite',
    //     name: '百度卫星',
    //     image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/satellite-imagery.640c3d8a.png',
    //     url: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
    // },
    // {
    //     id: 'baidu-standard',
    //     name: '百度矢量',
    //     image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/standard-map-icon.a56733ec.png',
    //     url: 'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
    // }
    {
        id: 'ArcGIS',
        name: 'ArcGIS卫星',
        image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/satellite-imagery.640c3d8a.png',
        url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png'
    }, {
        id: 'ArcGIS-vector',
        name: 'ArcGIS矢量',
        image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/standard-map-icon.a56733ec.png',
        url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png'
    }
]

const currentId = localStorage.getItem(baseMapKey)
const currentBaseMap = ref(currentId ? baseMapList.find(i => i.id === currentId) : baseMapList[0])

// 移除底图
function removeBaseMap() {
    const layer = window.map.getLayer(baseMapName)
    if (layer) {
        window.map.removeLayer(baseMapName)
        window.map.removeSource(baseMapName)
    }
}

// 添加底图
function addBaseMap(options = {}) {
    removeBaseMap()
    const layers = window.map.getStyle()?.layers
    const bottomLayer = layers?.[0]?.id
    map.addSource(baseMapName, {
        type: "raster",
        tiles: [
            options.url
        ],
        tileSize: 256,
        maxzoom: 18,
    });

    map.addLayer({
        id: baseMapName,
        type: "raster",
        source: baseMapName,
        paint: {
            "raster-saturation": 0,
        },
    }, bottomLayer);
    localStorage.setItem(baseMapKey, options.id)
}

// 修改底图
function changeBaseMap(options) {
    if (options.id === currentBaseMap.value.id) return
    currentBaseMap.value = options
    addBaseMap(options)
}

onMounted(() => {
    removeBaseMap()
    addBaseMap(currentBaseMap.value)
})

onBeforeUnmount(() => {
    if (!window.map) return
    removeBaseMap()
})
</script>

<style lang="scss" scoped>
.base-map-control {
    position: relative;

    &:hover .base-map-list {
        visibility: visible;
        opacity: 1;
        pointer-events: auto;
    }

    &::before {
        position: absolute;
        top: 0;
        right: 100%;
        width: 8px;
        height: 100%;
        content: '';
    }

    .current-base-map {
        >img {
            width: 68px;
            height: 68px;
        }
    }

    .base-map-list {
        position: absolute;
        right: calc(100% + 8px);
        bottom: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, .12);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        white-space: nowrap;
        transition: opacity .2s ease, visibility .2s;
    }

    .base-map-item {
        cursor: pointer;
        width: 60px;

        >img {
            width: 100%;
            aspect-ratio: 1;
        }

        .base-map-item-name {
            display: block;
            font-size: 12px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
