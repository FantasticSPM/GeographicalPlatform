<template>
    <div class="weather-container">
        <el-menu class="weather-left">
            <el-menu-item index="1">当前</el-menu-item>
            <el-menu-item index="2">每小时预报</el-menu-item>
            <el-menu-item index="3">详细信息</el-menu-item>
            <el-menu-item index="4">地图</el-menu-item>
            <el-menu-item index="5">趋势</el-menu-item>
        </el-menu>
        <div class="weather-content">
            <div class="weather-content-top weather-content-item">
                <el-autocomplete class="city-search-box" popper-class="city-search-box-popper" v-model="state"
                    :fetch-suggestions="querySearch" placeholder="搜索位置" :show-after="false" @select="handleSelect">
                    <template #suffix>
                        <el-icon class="el-input__icon">
                            <Search />
                        </el-icon>
                    </template>
                    <template #header>位置列表</template>
                    <template #default="{ item }">
                        <div>
                            <div class="city-info-name">洪山区</div>
                            <div class="city-info-detail">湖北省，武汉市，洪山区</div>
                        </div>
                        <div class="city-info-edit">
                            <el-icon>
                                <Position />
                            </el-icon>
                            <span>27°</span>
                        </div>
                    </template>
                </el-autocomplete>
                <div class="city-info">
                    <div>
                        <span class="city-name">洪山区</span>
                        <span class="city-temp">25°C</span>
                    </div>
                    <div class="city-desc">多云</div>
                </div>
            </div>
            <div class="weather-content-message weather-content-item">
                <el-alert show-icon title="台风“艾涛”向北偏西方向移动  “班朗”加强为台风级" type="info" />
                <el-alert show-icon title="警惕！湖南广西云南西藏等地部分地区发生地质灾害的气象风险较高" type="info" />
                <el-alert show-icon title="暴雨预警：9省区部分地区有大到暴雨 湖南广西等地有大暴雨" type="info" />
                <el-alert show-icon title="红色山洪灾害气象预警发布 湖南广西局地发生山洪灾害可能性很大" type="info" />
                <el-alert show-icon title="注意！湖南广西等4省区部分地区发生中小河流洪水的气象风险较高" type="info" />
            </div>
            <div class="weather-content-info weather-content-item">
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">2</div>
            </div>
            <div class="weather-content-item weather-content-card">
                1
            </div>
            <div class="weather-content-detail weather-content-item">
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">1</div>
                <div class="weather-content-card">1</div>
            </div>
        </div>
    </div>
    <FooterComponent></FooterComponent>
</template>

<script setup>
import FooterComponent from '../components/Layouts/FooterComponent.vue'
import { onMounted, ref } from 'vue'
const state = ref('')
const links = ref([])
const querySearch = (queryString, cb) => {
    const results = queryString
        ? links.value.filter(createFilter(queryString))
        : links.value
    cb(results)
}
const createFilter = (queryString) => {
    return (restaurant) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}

const handleSelect = (item) => {
    console.log(item)
}
onMounted(() => {
    links.value = [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
    ]
})
</script>

<style lang="scss" scoped>
.weather-container {
    width: 100%;
    color: #fff;
    padding: 10px;
    background: linear-gradient(180deg, #203580 0px, #443E73 60px, #443A66 300px, #27284F 600px, #171E44 1000px);
    position: relative;

    .weather-left {
        position: fixed;
        top: 325px;
        left: 8px;
        z-index: 100;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.20);
        backdrop-filter: blur(20px);
        padding: 16px 16px 12px 16px;
        border-right: none;

        .el-menu-item {
            --el-menu-text-color: #fff;
            --el-menu-item-height: 2;
            --el-menu-base-level-padding: 10px;
            --el-menu-hover-bg-color: #FFD02C;
            --el-menu-active-color: #000;
            --el-menu-active-radius: 8px;
            margin-bottom: 10px;
            transition: none;

            &:hover,
            &.is-active {
                color: var(--el-menu-active-color);
                border-radius: var(--el-menu-active-radius);
                background-color: var(--el-menu-hover-bg-color);
            }
        }
    }

    .weather-content {
        width: 70%;
        height: 100%;
        margin: 0 auto;

        --weather-card-bg-color: rgba(255, 255, 255, 0.05);

        .weather-content-item {
            margin-bottom: 20px;
        }

        .weather-content-top {
            display: flex;
            gap: 10px;
            height: 40px;
            --el-border-color: rgba(250, 249, 248, 0.15);
            --el-fill-color-blank: #434882;
            --el-border-radius-base: 10px;
            --el-text-color-placeholder: #fff;
            --el-text-color-regular: #fff;

            :deep(.city-search-box) {
                width: 250px;
                height: 100%;
            }

            .city-info {
                width: 170px;
                display: flex;
                background-color: var(--el-fill-color-blank);
                border-radius: var(--el-border-radius-base);
                padding: 2px 11px;
                border: 1px solid var(--el-border-color);
                font-size: 14px;
                color: var(--el-text-color-placeholder);
                align-items: center;
                justify-content: space-between;
            }
        }

        .weather-content-message {
            .el-alert {
                margin-bottom: 10px;
                --el-alert-bg-color: rgba(255, 255, 255, 0.20);
                --el-color-info: #ccc;
                --el-alert-padding: 5px 10px;
            }
        }

        .weather-content-card {
            background-color: var(--weather-card-bg-color);
            border-radius: 6px;
            padding: 10px;
            min-height: 270px;
        }

        .weather-content-info {
            display: flex;
            gap: 20px;

            div {
                flex: 1;
                height: 270px;
            }
        }

        .weather-content-detail {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
    }
}
</style>

<style lang="scss">
.city-search-box-popper {
    --el-popper-bg-color-light: #292929;
    --el-text-color-regular: #fff;
    --el-popper-border-radius: 15px;
    --el-border-color-light: transparent;

    --el-fill-color-light: #494949;
    color: var(--el-text-color-regular);

    .el-autocomplete-suggestion__header {
        padding: 10px 20px;
        padding-bottom: 0px;
        border-bottom: none;
        color: rgba(255, 255, 255, 0.6);
    }

    .el-autocomplete-suggestion li {
        line-height: 1.5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .city-info-name {
            font-weight: bold;
        }

        .city-info-detail {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
        }

        .city-info-edit {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
}
</style>
