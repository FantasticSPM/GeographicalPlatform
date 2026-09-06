<template>
    <div>
        <el-menu class="map-bar" mode="horizontal" :ellipsis="false" :default-active="activeTool"
            @select="activeTool = $event">
            <el-menu-item v-for="i in bars" :key="i.id" :index="i.id">
                <el-icon>
                    <component :is="i.icon" />
                </el-icon>
                <span>{{ i.label }}</span>
            </el-menu-item>

        </el-menu>
        <Transition name="panel-slide" mode="out-in">
            <component :is="tools[activeTool]" v-if="tools[activeTool]" :key="activeTool" @close="handleClose" />
        </Transition>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MeassureTool from './MeasureTool.vue'
import AnalysisTool from './AnalysisTool.vue'
import LocationTool from './LocationTool.vue'
import PrintTool from './PrintTool.vue'
import FullTool from './FullTool.vue'
import PlotTool from './PlotTool.vue'
import {
    DataAnalysis,
    EditPen,
    FullScreen,
    LocationInformation,
    Printer,
} from '@element-plus/icons-vue'
import Measure from '@/components/Icon/Measure.vue'
const tools = {
    MeassureTool,
    AnalysisTool,
    LocationTool,
    PrintTool,
    FullTool,
    PlotTool,
}

const bars = [
    {
        id: 'MeassureTool',
        label: '量算',
        icon: Measure,
        component: MeassureTool
    },
    {
        id: 'AnalysisTool',
        label: '空间分析',
        icon: DataAnalysis,
        component: AnalysisTool
    }, {
        id: 'PlotTool',
        label: '标绘',
        icon: EditPen,
        component: PlotTool
    },
    {
        id: 'LocationTool',
        label: '定位',
        icon: LocationInformation,
        component: LocationTool
    },
    {
        id: 'PrintTool',
        label: '打印',
        icon: Printer,
        component: PrintTool
    },
    {
        id: 'FullTool',
        label: '全屏',
        icon: FullScreen,
        component: FullTool
    }
]

const activeTool = ref('')

function handleClose() {
    activeTool.value = ''
}
</script>

<style lang="scss" scoped>
.map-bar {
    height: auto;
    border: 1px solid rgba(210, 224, 235, 0.9);
    border-radius: 8px;
    box-shadow: 0 12px 30px rgba(24, 59, 91, 0.16), 0 2px 8px rgba(24, 59, 91, 0.08);
    overflow: hidden;

    .el-menu-item {
        line-height: 1;
        border: none;
        padding: 8px;
        --el-menu-active-color: #fff;

        &.is-active {
            background-color: #409eff;
        }

        &:hover {
            color: #000;
        }
    }
}
</style>
