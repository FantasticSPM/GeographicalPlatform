<template>
    <Panel title="目录">
        <el-tree class="catalog-tree" :data="data" show-checkbox check-strictly node-key="id" :props="defaultProps">
            <template #default="{ node, data }">
                <template v-if="node.expanded && !node.isLeaf">
                    <el-icon class="el-icon-folder">
                        <FolderOpened />
                    </el-icon>
                </template>
                <template v-else-if="!node.isLeaf">
                    <el-icon class="el-icon-folder">
                        <Folder />
                    </el-icon>
                </template>
                <span>{{ data.label }}</span>
            </template>
        </el-tree>
    </Panel>

</template>

<script setup>
import Panel from '@/components/panel/Panel.vue';

const defaultProps = {
    children: 'children',
    label: 'label',
    class: (_data, node) => node.isLeaf ? 'is-leaf-node' : 'is-directory-node',
}
const data = [
    {
        id: 1,
        label: '资源目录',
        children: [
            {
                id: 4,
                label: '资源目录1-1',
                children: [
                    {
                        id: 9,
                        label: '资源目录1-1-1',
                    },
                    {
                        id: 10,
                        label: '资源目录1-1-2',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: '上传目录',
        children: [
            {
                id: 5,
                label: '上传目录 2-1',
            },
        ],
    },
    {
        id: 3,
        label: '勾画目录',
        children: [
            {
                id: 7,
                label: '上传目录 3-1',
            },
        ],
    },
]
</script>

<style lang="scss" scoped>
.catalog-tree {
    width: 100%;

    .el-icon-folder {
        margin-right: 5px;
    }

    &:deep(.is-directory-node) {
        >.el-tree-node__content {
            >.el-checkbox {
                display: none;
            }
        }
    }
}

// .catalog-tree 
</style>
