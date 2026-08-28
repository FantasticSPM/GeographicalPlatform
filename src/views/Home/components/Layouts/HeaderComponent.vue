<template>
    <div class="header_wrap">
        <div class="left">
            <div class="cn">地理空间资源信息平台</div>
            <div class="en">Geographical Spatial Resource Information Platform</div>
        </div>
        <div class="center">
            <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
                <el-menu-item index="index">门户首页</el-menu-item>
                <el-menu-item index="geology">地质信息</el-menu-item>
                <el-menu-item index="weather">天气信息</el-menu-item>
                <el-menu-item index="news">新闻动态</el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <el-button type="primary" size="small">登录</el-button>
            <el-button type="primary" size="small">注册</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const activeIndex = ref(route.name)
watch(route, (newRoute) => {
    activeIndex.value = newRoute.name
})
</script>

<style lang="scss" scoped>
.header_wrap {
    width: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 100px;

    .left {
        position: relative;
        min-width: 0;
        padding-left: 15px;
        color: rgba(255, 255, 255, 0.98);
        font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
        font-weight: 600;
        text-shadow: 0 1px 3px rgba(4, 35, 78, 0.28);

        &::before {
            content: "";
            position: absolute;
            top: 2px;
            bottom: 2px;
            left: 0;
            width: 3px;
            border-radius: 2px;
            background-color: #8bd4ff;
            box-shadow: 0 0 8px rgba(139, 212, 255, 0.6);
        }

        .cn {
            max-width: 100%;
            overflow: hidden;
            font-size: 24px;
            line-height: 1.2;
            letter-spacing: 4px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-text-stroke: 0.45px rgba(6, 56, 104, 0.38);
        }

        .en {
            max-width: 100%;
            margin-top: 7px;
            overflow: hidden;
            color: rgba(255, 255, 255, 0.78);
            font-size: 11px;
            font-weight: 400;
            line-height: 1.2;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-text-stroke: 0.2px rgba(6, 56, 104, 0.24);
        }
    }

    @media (max-width: 1200px) {
        .left {
            padding-left: 12px;

            .cn {
                font-size: 20px;
                letter-spacing: 1px;
            }

            .en {
                margin-top: 5px;
                font-size: 10px;
                letter-spacing: 0.4px;
            }
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

    .right {
        width: 300px;
        text-align: right;
    }
}
</style>
