<template>
    <Panel title="资源目录">
        <el-tree class="catalog-tree" :data="sourceStore.source" show-checkbox node-key="id" :props="defaultProps"
            empty-text="暂无目录数据" @node-click="handleNodeClick" @check-change="handleNodeCheck"
            :default-checked-keys="['upload']">
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <div class="flex-center">
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
                    </div>
                    <el-popover width="auto" trigger="click" placement="right"
                        v-if="!isDirectoryData(data) && node.isLeaf" popper-class="catalog-operation-popper">
                        <template #reference>
                            <el-icon class="more-icon" @click.stop="">
                                <MoreFilled />
                            </el-icon>
                        </template>

                        <div class="catalog-operation-item" v-for="i in editTypes" :key="i.id">
                            <el-icon>
                                <component :is="i.icon" />
                            </el-icon>
                            <span>{{ i.label }}</span>
                        </div>

                    </el-popover>
                </div>
            </template>
        </el-tree>
    </Panel>

</template>

<script setup>
import Panel from '@/components/panel/Panel.vue';
import { useSourceStore } from '@/stores/source';
import { CaretRight, Folder, FolderOpened, Document, View, MoreFilled, Position } from '@element-plus/icons-vue';
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

const editTypes = [
    {
        id: 'open',
        label: '打开',
        icon: View
    }, {
        id: 'attribute',
        label: '属性表',
        icon: Document
    }, {
        id: 'locate',
        label: '定位',
        icon: Position
    }
]

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

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 8px;

        .more-icon {
            display: none;
        }
    }

    .el-tree-node.is-leaf-node {
        &:hover {
            .more-icon {
                display: block;
            }
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

<style lang="scss">
.catalog-operation-popper {
    --catalog-operation-text: #35566f;
    --catalog-operation-muted: #7892a5;
    --catalog-operation-primary: #0b7ae1;
    --catalog-operation-hover-bg: rgba(11, 122, 225, 0.08);
    --catalog-operation-active-bg: rgba(11, 122, 225, 0.14);
    --el-popover-padding: 4px;
    --el-popover-bg-color: rgba(255, 255, 255, 0.98);
    --el-popover-border-color: rgba(180, 204, 220, 0.8);
    --el-popover-border-radius: 10px;
    --el-popper-bg-color-light: var(--el-popover-bg-color);
    --el-border-color-light: var(--el-popover-border-color);
    --el-box-shadow-light: 0 10px 24px rgba(24, 59, 91, 0.14), 0 2px 6px rgba(24, 59, 91, 0.08);

    color: var(--catalog-operation-text);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    // Element Plus 默认最小宽度为 150px，这里按目录操作项的内容收窄弹层。
    &.el-popover {
        min-width: 100px;
    }

    .catalog-operation-item {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 30px;
        padding: 5px 8px;
        border-radius: 6px;
        color: inherit;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        cursor: pointer;
        user-select: none;
        transition: color 180ms ease, background-color 180ms ease, transform 180ms ease;

        &:hover {
            color: var(--catalog-operation-primary);
            background-color: var(--catalog-operation-hover-bg);
        }

        &:active {
            background-color: var(--catalog-operation-active-bg);
            transform: scale(0.98);
        }

        &:focus-visible {
            outline: 2px solid rgba(11, 122, 225, 0.38);
            outline-offset: -2px;
        }

        >span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .el-icon {
            flex: 0 0 auto;
            width: 14px;
            height: 14px;
            margin-right: 0;
            color: var(--catalog-operation-muted);
            font-size: 14px;
            transition: color 180ms ease, transform 180ms ease;
        }

        &:hover .el-icon {
            color: var(--catalog-operation-primary);
            transform: translateX(1px);
        }
    }

    .catalog-operation-item+.catalog-operation-item {
        margin-top: 2px;
    }
}
</style>
