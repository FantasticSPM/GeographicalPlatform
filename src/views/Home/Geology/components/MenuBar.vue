<template>
    <el-menu class="menu-bar" :default-active="activeIndex" router>
        <el-menu-item v-for="item in items" :key="item.index" :index="item.index">
            <el-icon>
                <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FolderOpened, UploadFilled, Share } from '@element-plus/icons-vue'
const route = useRoute()
const activeIndex = ref(route.fullPath)

const items = [
    { index: '/geology/catalog', name: '目录', icon: FolderOpened },
    { index: '/geology/upload', name: '数据上传', icon: UploadFilled },
    { index: '/geology/data1', name: '分享', icon: Share },
]
</script>

<style lang="scss" scoped>
.menu-bar.el-menu {
    height: 100%;
    border-right: none;
    padding: 5px;

    .el-menu-item {
        gap: 5px;
        flex-direction: column;
        line-height: 1;
        --el-menu-active-color: #fff;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        height: auto;

        .el-icon {
            margin: 0;
        }

        &:hover {
            font-weight: 600;
            // color: #60778d;
        }

        &.is-active {
            font-weight: 600;
            background-color: #0b7ae1;
            border-radius: 10px;
        }

        >span {
            width: 100%;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
        }
    }

}
</style>