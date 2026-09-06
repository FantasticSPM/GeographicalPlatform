<template>
    <div class="theme-container">
        <div class="theme-container-header">
            <div class="theme-box">
                <el-input placeholder="搜索特色专题..." class="theme-search-box">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>

                <span>共{{ items.length }}个特色专题</span>
            </div>

            <el-popover popper-class="theme-container-mode" title="" placement="top-start">
                <template #reference>
                    <el-button>
                        <el-icon>
                            <Operation />
                        </el-icon>
                    </el-button>
                </template>
                <el-menu>
                    <el-menu-item index="card">
                        <el-icon>
                            <Grid />
                        </el-icon>卡片模式</el-menu-item>
                    <el-menu-item index="chart">
                        <el-icon>
                            <Tickets />
                        </el-icon>图表模式</el-menu-item>
                </el-menu>
            </el-popover>
        </div>

        <div class="theme-container-body">
            <ItemCard :data="item" v-for="item in items" :key="item.link"></ItemCard>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import ItemCard from './components/ItemCard.vue'
const items = [
    {
        link: 'http://www.baidu.com',
        title: 'xxx市实景三维平台',
    },
    {
        link: 'http://www.360.com',
        title: 'xxx市实景三维',
    },
    {
        link: 'http://www.sougou.com',
        title: 'xxx交通枢纽管控平台',
    },
    {
        link: 'http://www.google.com',
        title: 'xxx交通枢纽管控平台1',
    },
    {
        link: 'http://studio.mars3d.cn/open.html#/map?to=scene-view&id=2085229134230470656',
        title: 'xxx交通枢纽管控平台2',
    },
    {
        link: 'http://studio.mars3d.cn/open.html#/map?to=scene-view&id=20852291342304706561',
        title: 'xxx交通枢纽管控平台3',
    },
    {
        link: 'http://studio.mars3d.cn/open.html#/map?to=scene-view&id=20852291342304706562',
        title: 'xxx可视化平台',
    }
]
</script>

<style lang="scss" scoped>
.theme-container {
    padding: 20px;

    .theme-container-header {
        display: flex;
        justify-content: space-between;

        .theme-box {
            .theme-search-box {
                width: 300px;
            }

            >span {
                margin-left: 20px;
                font-size: 14px;
                color: #333;
            }
        }

    }

    .theme-container-body {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        margin-top: 20px;


    }

}
</style>

<style>
.theme-container-mode {
    .el-menu {
        border-right: none;
        --el-menu-item-height: 1;

        .el-menu-item {
            padding: 10px;

            &:hover {
                color: #0b7ae1;
            }

            &.is-active {
                background-color: #d3e3fd;
            }
        }
    }
}
</style>