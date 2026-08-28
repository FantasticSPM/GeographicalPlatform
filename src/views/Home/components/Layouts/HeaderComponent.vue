<template>
    <!-- <el-header class="header"> -->
    <div class="header_wrap">
        <div class="left">
            <div class="cn">地理空间资源信息平台</div>
            <div class="en">Geographical Spatial Resource Information Platform</div>
        </div>
        <div class="center">
            <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                @select="handleSelect">
                <el-menu-item index="index">门户首页</el-menu-item>
                <el-menu-item index="geology">地质信息</el-menu-item>
                <el-menu-item index="weather">天气信息</el-menu-item>
                <el-menu-item index="news">新闻动态</el-menu-item>
            </el-menu>
        </div>
        <div class="right"></div>
    </div>
    <!-- </el-header> -->
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const activeIndex = ref(route.name)
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.header_wrap {
    width: 62.5%;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 100px;

    .left {
        text-align: center;
        color: #154e98;
        font-weight: bold;
        text-shadow: 0 0 3px #fff;

        .cn {
            font-size: 25px;
        }

        .en {
            font-size: 12px;
        }
    }

    .center {
        // width: 600px;
        --el-menu-bg-color: transparent;
        --el-menu-text-color: #fff;

        .el-menu {
            --el-menu-border-color: transparent;
            --el-menu-hover-bg-color: transparent;
            --el-menu-active-color: #fff;

            .el-menu-item.is-active {
                font-weight: bold;
            }
        }
    }
}
</style>