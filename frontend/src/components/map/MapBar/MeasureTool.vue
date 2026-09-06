<template>
    <Panel1 title="量算工具" width="min(400px, calc(100vw - 24px))" @close="handleClose" class="measure-tool">
        <div class="measure-content">
            <section class="measure-intro">
                <div class="measure-intro__icon" aria-hidden="true">
                    <el-icon>
                        <Measure />
                    </el-icon>
                </div>
                <div class="measure-intro__copy">
                    <h3>地图量算</h3>
                    <p>选择量算方式，在地图上获取空间信息</p>
                </div>
            </section>

            <el-form class="measure-form" @submit.prevent="startMeasure">
                <section class="measure-card">
                    <div class="measure-card__heading">
                        <span>量算方式</span>
                        <span class="measure-card__badge">{{ tools.length }} 种工具</span>
                    </div>

                    <el-select v-model="selectedTool" class="measure-select" popper-class="measure-select-popper"
                        placeholder="选择量算类型" aria-label="选择量算类型">
                        <template #prefix>
                            <el-icon :size="20">
                                <component :is="selectedToolInfo.icon" />
                            </el-icon>
                        </template>
                        <el-option v-for="tool in tools" :key="tool.id" :label="tool.name" :value="tool.id">
                            <div class="measure-option">
                                <el-icon class="measure-option__icon" :size="22">
                                    <component :is="tool.icon" />
                                </el-icon>
                                <span class="measure-option__copy">
                                    <strong>{{ tool.name }}</strong>
                                    <small>{{ tool.description }}</small>
                                </span>
                                <el-icon v-if="selectedTool === tool.id" class="measure-option__check">
                                    <Check />
                                </el-icon>
                            </div>
                        </el-option>
                    </el-select>

                    <div class="measure-hint">
                        <el-icon aria-hidden="true">
                            <InfoFilled />
                        </el-icon>
                        <span>{{ selectedToolInfo.hint }}</span>
                    </div>
                </section>

                <div class="btns">
                    <el-button type="primary" native-type="submit">
                        <el-icon>
                            <Aim />
                        </el-icon>
                        <span>开始量算</span>
                    </el-button>
                </div>
            </el-form>

            <p class="measure-tip">
                <el-icon aria-hidden="true">
                    <InfoFilled />
                </el-icon>
                <span>开始后，请按照地图提示完成操作</span>
            </p>
        </div>
    </Panel1>
</template>

<script setup>
import { computed, ref } from 'vue'
import Panel1 from '@/components/panel/Panel1.vue'
import Distance from '@/components/Icon/Distance.vue'
import Point from '@/components/Icon/Point.vue'
import Area from '@/components/Icon/Area.vue'
import Measure from '@/components/Icon/Measure.vue'

const tools = [
    {
        id: 'distance',
        name: '距离量算',
        description: '测量地图上的折线长度',
        hint: '在地图上依次点击多个点，计算路径总长度',
        icon: Distance
    },
    {
        id: 'area',
        name: '面积量算',
        description: '计算闭合区域的面积',
        hint: '在地图上绘制闭合区域，计算覆盖范围面积',
        icon: Area
    },
    {
        id: 'coordinate',
        name: '坐标量算',
        description: '读取地图位置的坐标',
        hint: '在地图上点击位置，查看该点的经纬度信息',
        icon: Point
    }
]

const selectedTool = ref(tools[0].id)
const selectedToolInfo = computed(() => tools.find((tool) => tool.id === selectedTool.value) || tools[0])

function startMeasure() {
    console.log(`开始量算: ${selectedTool.value}`)
    // 在这里添加量算逻辑
}

function clearMeasure() {
    console.log('清除量算')
    // 在这里添加清除量算的逻辑
}

const emits = defineEmits(['close'])
function handleClose() {
    // console.log('关闭量算工具')
    emits('close')
}
</script>

<style lang="scss" scoped>
.measure-content {
    --measure-blue: #0b7ae1;
    --measure-ink: #17324d;
    --measure-muted: #7d94a4;
    --measure-line: #e3edf3;
    color: var(--measure-ink);
}

.measure-intro {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border: 1px solid #d8eaf5;
    border-radius: 8px;
    background-color: #f4faff;
}

.measure-intro__icon {
    display: grid;
    width: 40px;
    height: 40px;
    flex: none;
    place-items: center;
    border-radius: 10px;
    color: var(--measure-blue);
    background-color: #dff1ff;
    box-shadow: inset 0 0 0 1px rgba(11, 122, 225, 0.08);
}

.measure-intro__icon .el-icon {
    font-size: 21px;
}

.measure-intro__copy {
    min-width: 0;
}

.measure-intro__copy h3 {
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.35;
}

.measure-intro__copy p {
    margin: 0;
    overflow: hidden;
    color: var(--measure-muted);
    font-size: 12px;
    line-height: 1.45;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.measure-form {
    margin-top: 14px;
}

.measure-card {
    padding: 14px;
    border: 1px solid var(--measure-line);
    border-radius: 8px;
    background-color: #fbfdfe;
}

.measure-card__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 700;
}

.measure-card__badge {
    padding: 3px 7px;
    border: 1px solid #cce4f3;
    border-radius: 4px;
    color: var(--measure-blue);
    background-color: #eef8ff;
    font-size: 10px;
    font-weight: 700;
}

.measure-select {
    width: 100%;
}

.measure-select :deep(.el-select__wrapper) {
    min-height: 48px;
    padding: 3px 12px;
    border: 1px solid #c8dfe9;
    border-radius: 7px;
    box-shadow: 0 2px 6px rgba(35, 70, 91, 0.04);
    transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.measure-select :deep(.el-select__wrapper:hover) {
    border-color: #9bcce9;
}

.measure-select :deep(.el-select__wrapper.is-focused) {
    border-color: var(--measure-blue);
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(11, 122, 225, 0.1);
}

.measure-select :deep(.el-select__selected-item) {
    color: var(--measure-ink);
    font-size: 13px;
    font-weight: 600;
}

.measure-select :deep(.el-select__prefix) {
    display: inline-flex;
    align-items: center;
    margin-right: 7px;
    color: var(--measure-blue);
}

.measure-option {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 10px;
    padding: 5px 2px;
}

.measure-option__icon {
    display: grid;
    width: 34px;
    height: 34px;
    flex: none;
    place-items: center;
    border-radius: 6px;
    color: var(--measure-blue);
    background-color: #eef8ff;
}

.measure-option__copy {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: 2px;
}

.measure-option__copy strong {
    color: var(--measure-ink);
    font-size: 13px;
    font-weight: 600;
    line-height: 1.3;
}

.measure-option__copy small {
    overflow: hidden;
    color: var(--measure-muted);
    font-size: 11px;
    line-height: 1.3;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.measure-option__check {
    flex: none;
    color: var(--measure-blue);
    font-size: 16px;
}

:global(.measure-select-popper) {
    min-width: 280px !important;
}

:global(.measure-select-popper .el-select-dropdown__item) {
    height: auto;
    min-height: 50px;
    padding: 4px 12px;
    line-height: normal;
}

:global(.measure-select-popper .el-select-dropdown__item.is-hovering) {
    background-color: #f0f8ff;
}

.measure-hint {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    margin-top: 11px;
    color: var(--measure-muted);
    font-size: 12px;
    line-height: 1.45;
}

.measure-hint .el-icon {
    flex: none;
    margin-top: 1px;
    color: var(--measure-blue);
    font-size: 14px;
}

.btns {
    margin-top: 16px;

    .el-button {
        display: inline-flex;
        height: 42px;
        align-items: center;
        justify-content: center;
        gap: 7px;
        width: 100%;
        border: none;
        border-radius: 6px;
        box-shadow: 0 6px 14px rgba(11, 122, 225, 0.2);
        font-size: 13px;
        font-weight: 600;
        transition: transform 180ms ease, box-shadow 180ms ease;
    }

    .el-button:hover,
    .el-button:focus-visible {
        box-shadow: 0 8px 18px rgba(11, 122, 225, 0.28);
        transform: translateY(-1px);
    }

    .el-icon {
        font-size: 17px;
    }
}

.measure-tip {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 12px 2px 0;
    color: var(--measure-muted);
    font-size: 12px;
    line-height: 1.4;
}

.measure-tip .el-icon {
    flex: none;
    color: var(--measure-blue);
    font-size: 14px;
}

@media (max-width: 360px) {
    .measure-intro {
        padding: 12px;
    }

    .measure-intro__copy p {
        display: none;
    }

    .measure-card {
        padding: 12px;
    }

    :global(.measure-select-popper) {
        min-width: 250px !important;
    }
}
</style>
