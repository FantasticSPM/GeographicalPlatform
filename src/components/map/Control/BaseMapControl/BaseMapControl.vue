<template>
    <div class="base-map-control">
        <div class="current-base-map" :title="currentBaseMap.name">
            <img :src="currentBaseMap.image" alt="">
        </div>
        <div class="base-map-list">
            <div v-for="i in baseMapList" class="base-map-item" :class="{ 'is-current': i.id === currentBaseMap.id }"
                @click="changeBaseMap(i)" :title="i.name">
                <img :src="i.image" alt="">
                <span class="base-map-item-name" :title="i.name">{{ i.name }}</span>
            </div>
        </div>

        <DivisionSetting v-model="dialogVisible" @submit="submit" :setting="defaultSettings"></DivisionSetting>


    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElLoading } from 'element-plus'
import DivisionSetting from './DivisionSetting.vue'
import { handleGeojson } from '@/utils/map.js'
import { apiGetDistrictByAdcode } from '@/apis/online'
import { levelMap } from '@/utils/constants'

const baseMapName = 'base-map'
const baseMapKey = 'currentBaseMap'
const baseMapList = [
    {
        id: 'gaode-satellite',
        type: "raster",
        name: '高德卫星',
        image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/satellite-imagery.640c3d8a.png',
        url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    },
    {
        id: 'gaode-standard',
        type: "raster",
        name: '高德矢量',
        image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/standard-map-icon.a56733ec.png',
        url: 'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
    },
    {
        id: 'ArcGIS',
        type: "raster",
        name: 'ArcGIS卫星',
        image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/satellite-imagery.640c3d8a.png',
        url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png'
    }, {
        id: 'ArcGIS-vector',
        type: "raster",
        name: 'ArcGIS矢量',
        image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/standard-map-icon.a56733ec.png',
        url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png'
    }, {
        id: 'division',
        type: 'vector',
        name: '行政区划',
        image: 'https://ssr-next.amap.com/static/amap-pc-ssr/production/b8a20474/_next/static/media/standard-map-icon.a56733ec.png',
    }
]

const defaultSettings = ref()

const currentId = localStorage.getItem(baseMapKey)
const currentBaseMap = ref(currentId ? JSON.parse(currentId) : baseMapList[0])
const dialogVisible = ref(false)
getSetting(currentBaseMap.value)

// 移除底图
function removeBaseMap() {
    const layer = window.map.getLayer(baseMapName)
    if (layer) {
        window.map.removeLayer(baseMapName)
        window.map.getLayer(baseMapName + '_other') && window.map.removeLayer(baseMapName + '_other')
        window.map.removeSource(baseMapName)
    }
}

// 添加底图
async function addBaseMap(options = {}) {
    const loading = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    removeBaseMap()
    const layers = window.map.getStyle()?.layers
    const bottomLayer = layers?.[0]?.id
    const type = options.type
    if (type === 'raster') {
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
    } else if (type === 'vector') {
        const result = await apiGetDistrictByAdcode(options.data)
        handleGeojson(window.map, result.data, baseMapName, undefined, bottomLayer)
    }
    localStorage.setItem(baseMapKey, JSON.stringify(options))
    loading.close()
}

// 修改底图
function changeBaseMap(options) {
    if (options.id === 'division') {
        dialogVisible.value = true
        return
    }
    if (options.id === currentBaseMap.value.id) return
    currentBaseMap.value = options
    addBaseMap(options)
}

function submit(data) {
    const cur = baseMapList.find(i => i.id === 'division')
    cur.data = data
    currentBaseMap.value = cur
    addBaseMap(cur)
}

function getSetting(options) {
    if (options.id === 'division') {
        const data = options.data

        const a = data.split('_')
        defaultSettings.value = {
            type: '',
            province: '',
            city: '',
            county: '',
            details: a.length > 1,
            level: levelMap.PROVINCE
        }
        const code = a[0]

        if (code.endsWith('00000')) {
            defaultSettings.value.type = levelMap.COUNTRY
            defaultSettings.value.level = a.length === 2 ? levelMap.PROVINCE : a.length === 3 ? levelMap.CITY : levelMap.COUNTY
        } else if (code.endsWith('0000')) {
            defaultSettings.value.type = levelMap.PROVINCE
            defaultSettings.value.province = code.substring(0, 2) + '0000'
            defaultSettings.value.level = a.length === 2 ? levelMap.CITY : a.length === 3 ? levelMap.COUNTY : ''
        } else if (code.endsWith('00')) {
            defaultSettings.value.type = levelMap.CITY
            defaultSettings.value.province = code.substring(0, 2) + '0000'
            defaultSettings.value.city = code.substring(0, 4) + '00'
            defaultSettings.value.level = a.length === 2 ? levelMap.COUNTY : ''
        } else {
            defaultSettings.value.type = levelMap.COUNTY
            defaultSettings.value.province = code.substring(0, 2) + '0000'
            defaultSettings.value.city = code.substring(0, 4) + '00'
            defaultSettings.value.county = code.substring(0, 6)
        }
    }
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
    width: 72px;
    height: 72px;

    &:hover .base-map-list {
        visibility: visible;
        opacity: 1;
        pointer-events: auto;
        transform: translateX(0);
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
        position: relative;
        width: 72px;
        height: 72px;
        overflow: hidden;
        border: 2px solid #fff;
        border-radius: 8px;
        background-color: #dce9ef;
        box-shadow: 0 3px 10px rgba(16, 47, 73, 0.2), 0 1px 2px rgba(16, 47, 73, 0.12);
        cursor: pointer;
        transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;

        &::before {
            position: absolute;
            z-index: 1;
            right: 0;
            bottom: 7px;
            left: 0;
            overflow: hidden;
            padding: 0 5px;
            color: #fff;
            content: attr(title);
            font-size: 11px;
            font-weight: 600;
            line-height: 1.3;
            text-align: center;
            text-overflow: ellipsis;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
            white-space: nowrap;
        }

        &::after {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 28px;
            background: linear-gradient(180deg, transparent, rgba(8, 31, 49, 0.64));
            content: '';
            pointer-events: none;
        }

        &:hover {
            border-color: #eaf7ff;
            box-shadow: 0 6px 14px rgba(16, 47, 73, 0.26), 0 2px 4px rgba(16, 47, 73, 0.14);
            transform: translateY(-2px);
        }

        >img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 220ms ease;
        }
    }

    .base-map-list {
        position: absolute;
        right: calc(100% + 8px);
        bottom: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        min-height: 94px;
        padding: 8px;
        border: 1px solid #d9e7ee;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 8px 20px rgba(24, 59, 91, 0.16), 0 2px 5px rgba(24, 59, 91, 0.08);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        white-space: nowrap;
        transition: opacity 180ms ease, visibility 180ms ease, transform 180ms ease;
        transform: translateX(4px);

        &:hover {
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
        }
    }

    .base-map-item {
        position: relative;
        width: 64px;
        flex: none;
        padding: 4px 3px 5px;
        border: 1px solid transparent;
        border-radius: 7px;
        color: #4d6878;
        cursor: pointer;
        transition: color 180ms ease, border-color 180ms ease, background-color 180ms ease, transform 180ms ease;

        &:hover {
            border-color: #b8dcef;
            color: #0b7ae1;
            background-color: #f3f9fc;
            transform: translateY(-2px);
        }

        &.is-current {
            border-color: #0b7ae1;
            color: #0b7ae1;
            background-color: #eef8ff;
            box-shadow: 0 0 0 2px rgba(11, 122, 225, 0.12);

            &::after {
                position: absolute;
                top: 7px;
                right: 6px;
                width: 7px;
                height: 7px;
                border: 2px solid #fff;
                border-radius: 50%;
                background-color: #0b7ae1;
                box-shadow: 0 0 0 1px rgba(11, 122, 225, 0.25);
                content: '';
            }

            >img {
                border-color: #0b7ae1;
                box-shadow: 0 0 0 2px rgba(11, 122, 225, 0.16);
            }
        }

        >img {
            display: block;
            width: 100%;
            height: 54px;
            aspect-ratio: 1;
            border: 1px solid #d8e6ec;
            border-radius: 5px;
            object-fit: cover;
            box-shadow: 0 1px 4px rgba(24, 59, 91, 0.1);
        }

        .base-map-item-name {
            display: block;
            margin-top: 5px;
            overflow: hidden;
            font-size: 11px;
            font-weight: 600;
            line-height: 1.3;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}

@media (max-width: 520px) {
    .base-map-control {
        .base-map-list {
            right: 0;
            bottom: calc(100% + 8px);
            max-width: calc(100vw - 20px);
            overflow-x: auto;
            scrollbar-width: thin;
            transform: translateY(4px);
        }

        &:hover .base-map-list,
        .base-map-list:hover {
            transform: translateY(0);
        }
    }
}
</style>
