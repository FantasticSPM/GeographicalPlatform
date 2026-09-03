<template>
    <Panel title="目录">
        <el-tree class="catalog-tree" :data="sourceStore.source" show-checkbox node-key="id" :props="defaultProps"
            empty-text="暂无目录数据" @node-click="handleNodeClick" @check-change="handleNodeCheck"
            :default-checked-keys="['upload']">
            <template #default="{ node, data }">
                <el-icon v-if="isDirectoryData(data)" class="catalog-expand-icon"
                    :class="{ 'is-expanded': node.expanded }" @click.stop="toggleNode(node)">
                    <CaretRight />
                </el-icon>
                <template v-if="node.expanded && isDirectoryData(data)">
                    <el-icon class="el-icon-folder">
                        <FolderOpened />
                    </el-icon>
                </template>
                <template v-else-if="isDirectoryData(data)">
                    <el-icon class="el-icon-folder">
                        <Folder />
                    </el-icon>
                </template>
                <template v-else>
                    <el-icon style="margin-right: 5px;">
                        <component :is="Icons[data.type]" />
                    </el-icon>
                </template>
                <span>{{ data.name }}</span>
            </template>
        </el-tree>
    </Panel>

</template>

<script setup>
import Panel from '@/components/panel/Panel.vue';
import { useSourceStore } from '@/stores/source';
import { CaretRight, Folder, FolderOpened } from '@element-plus/icons-vue';
import Point from '@/components/Icon/Point.vue'
import Line from '@/components/Icon/Line.vue'
import Polygon from '@/components/Icon/Polygon.vue'

const Icons = {
    point: Point,
    line: Line,
    polygon: Polygon
}

const sourceStore = useSourceStore();

const isDirectoryData = (data) => Array.isArray(data?.children)

const toggleNode = (node) => {
    if (node.expanded) {
        node.collapse()
    } else {
        node.expand()
    }
}

// 节点点击
const handleNodeClick = (data, node) => {
    if (isDirectoryData(data) && node.isLeaf) {
        toggleNode(node)
    }
}

// 节点勾选变化
function handleNodeCheck(data, checked) {
    if (isDirectoryData(data)) return
    if (checked) {

    } else {

    }
}

const defaultProps = {
    children: 'children',
    label: 'name',
    class: (data) => isDirectoryData(data) ? 'is-directory-node' : 'is-leaf-node',
}

</script>

<style lang="scss" scoped>
.catalog-tree {
    width: 100%;

    .el-icon-folder {
        margin-right: 5px;
    }

    .catalog-expand-icon {
        flex: 0 0 24px;
        width: 24px;
        height: 24px;
        margin-right: 0;
        color: var(--el-tree-expand-icon-color);
        cursor: pointer;
        transition: transform 0.2s ease;

        &.is-expanded {
            transform: rotate(90deg);
        }
    }

    &:deep(.is-directory-node) {
        >.el-tree-node__content {
            >.el-tree-node__expand-icon {
                display: none;
            }

            >.el-checkbox {
                display: none;
            }
        }
    }
}
</style>
