<template>
    <Panel1 title="标绘" width="min(400px, calc(100vw - 24px))" @close="$emit('close')">
        <div class="plot-content">
            <section class="plot-intro">
                <div class="plot-intro__icon" aria-hidden="true">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                </div>
                <div class="plot-intro__copy">
                    <h3>地图标绘</h3>
                    <p>选择一个符号，在地图上添加位置标记</p>
                </div>
            </section>

            <div class="operation" role="toolbar" aria-label="标绘操作">
                <button class="operation-button" type="button" title="打开标绘数据" aria-label="打开标绘数据">
                    <el-icon>
                        <FolderOpened />
                    </el-icon>
                    <span>打开</span>
                </button>
                <button class="operation-button" type="button" title="保存标绘数据" aria-label="保存标绘数据">
                    <el-icon>
                        <DocumentChecked />
                    </el-icon>
                    <span>保存</span>
                </button>
                <button class="operation-button operation-button--danger" type="button" title="清空标绘数据"
                    aria-label="清空标绘数据">
                    <el-icon>
                        <Delete />
                    </el-icon>
                    <span>清空</span>
                </button>
            </div>

            <div class="section-heading">
                <div>
                    <span class="section-heading__title">选择标记</span>
                    <span class="section-heading__hint">点击图标后在地图上标注</span>
                </div>
                <span class="plot-count">{{ plots.length }} 个</span>
            </div>

            <div class="plot" role="listbox" aria-label="标绘符号">
                <button v-for="plot in plots" :key="plot.id" class="plot-item"
                    :class="{ 'plot-item--selected': selectedPlot === plot.id }" type="button" role="option"
                    :aria-selected="selectedPlot === plot.id" :title="plot.name" @click="selectedPlot = plot.id">
                    <span class="plot-item__preview">
                        <img :src="plot.icon" :alt="plot.name" />
                    </span>
                    <span class="plot-item__name">{{ plot.name }}</span>
                    <span v-if="selectedPlot === plot.id" class="plot-item__check" aria-hidden="true">
                        <el-icon>
                            <Check />
                        </el-icon>
                    </span>
                </button>
            </div>

            <p class="plot-tip">
                <el-icon aria-hidden="true">
                    <InfoFilled />
                </el-icon>
                <span>当前选择：{{ currentPlot.name }}</span>
            </p>
        </div>

    </Panel1>
</template>

<script setup>
import { computed, ref } from 'vue'
import Panel1 from '@/components/panel/Panel1.vue'

const selectedPlot = ref('point')

const plots = [
    { id: 'point', name: '定位点', icon: '/images/point.png' },
    { id: 'point-round', name: '圆形点', icon: '/images/point1.png' },
    { id: 'marker', name: '图钉', icon: '/images/marker.png' },
    { id: 'marker-2', name: '地点', icon: '/images/marker2.png' },
    { id: 'marker-3', name: '旗帜', icon: '/images/marker3.png' },
    { id: 'marker-4', name: '气泡', icon: '/images/marker4.png' },
    { id: 'marker-5', name: '提示', icon: '/images/marker5.png' },
    { id: 'marker-6', name: '标注', icon: '/images/marker6.png' },
    { id: 'monitor', name: '监控点', icon: '/images/monitor.png' },
    { id: 'hospital', name: '医院', icon: '/images/hospital.png' },
    { id: 'school', name: '学校', icon: '/images/school.png' },
    { id: 'store', name: '商店', icon: '/images/store.png' },
    { id: 'government', name: '政府', icon: '/images/government.png' },
    { id: 'plane', name: '机场', icon: '/images/plane.png' },
    { id: 'car', name: '汽车', icon: '/images/car.png' },
    { id: 'train', name: '火车', icon: '/images/train.png' },
    { id: 'car', name: '汽车', icon: '/images/car.png' },
    { id: 'train', name: '火车', icon: '/images/train.png' },
]

const currentPlot = computed(() => plots.find((plot) => plot.id === selectedPlot.value) || plots[0])
</script>

<style scoped lang="scss">
.plot-content {
    --plot-blue: #0b7ae1;
    --plot-ink: #17324d;
    --plot-muted: #7d94a4;
    --plot-line: #e3edf3;
    color: var(--plot-ink);
}

.plot-intro {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border: 1px solid #d8eaf5;
    border-radius: 8px;
    background-color: #f4faff;
}

.plot-intro__icon {
    display: grid;
    width: 40px;
    height: 40px;
    flex: none;
    place-items: center;
    border-radius: 10px;
    color: var(--plot-blue);
    background-color: #dff1ff;
    box-shadow: inset 0 0 0 1px rgba(11, 122, 225, 0.08);
}

.plot-intro__icon .el-icon {
    font-size: 21px;
}

.plot-intro__copy {
    min-width: 0;
}

.plot-intro__copy h3 {
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.35;
}

.plot-intro__copy p {
    margin: 0;
    overflow: hidden;
    color: var(--plot-muted);
    font-size: 12px;
    line-height: 1.45;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.operation {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin: 14px 0 18px;
    padding: 8px;
    border: 1px solid var(--plot-line);
    border-radius: 8px;
    background-color: #f8fbfd;
}

.operation-button {
    display: inline-flex;
    min-width: 0;
    min-height: 38px;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 6px 8px;
    border: 1px solid transparent;
    border-radius: 6px;
    color: #4e6879;
    background-color: #fff;
    cursor: pointer;
    font: inherit;
    font-size: 12px;
    transition: color 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.operation-button:hover,
.operation-button:focus-visible {
    border-color: #b9ddf3;
    color: var(--plot-blue);
    background-color: #f0f8ff;
    box-shadow: 0 3px 8px rgba(11, 122, 225, 0.1);
    outline: none;
}

.operation-button--danger:hover,
.operation-button--danger:focus-visible {
    border-color: #f2c7c7;
    color: #d94c4c;
    background-color: #fff7f7;
    box-shadow: 0 3px 8px rgba(217, 76, 76, 0.08);
}

.operation-button .el-icon {
    flex: none;
    font-size: 16px;
}

.section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
}

.section-heading>div {
    display: flex;
    min-width: 0;
    align-items: baseline;
    gap: 8px;
}

.section-heading__title {
    font-size: 14px;
    font-weight: 700;
}

.section-heading__hint {
    overflow: hidden;
    color: var(--plot-muted);
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.plot-count {
    flex: none;
    color: var(--plot-blue);
    font-size: 12px;
    font-weight: 600;
}

.plot {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 9px;
    max-height: min(400px, calc(100vh - 330px));
    padding: 2px;
    overflow-y: auto;
    scrollbar-color: #bed7e7 transparent;
    scrollbar-width: thin;
}

.plot-item {
    position: relative;
    display: flex;
    min-width: 0;
    aspect-ratio: 1 / 1.08;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 8px 5px;
    border: 1px solid var(--plot-line);
    border-radius: 8px;
    color: #567181;
    background-color: #fff;
    cursor: pointer;
    font: inherit;
    transition: transform 180ms ease, color 180ms ease, border-color 180ms ease, background-color 180ms ease,
        box-shadow 180ms ease;
}

.plot-item:hover,
.plot-item:focus-visible {
    border-color: #b8dcef;
    color: var(--plot-blue);
    background-color: #f7fcff;
    box-shadow: 0 5px 14px rgba(24, 83, 120, 0.1);
    outline: none;
    transform: translateY(-2px);
}

.plot-item--selected {
    border-color: var(--plot-blue);
    color: var(--plot-blue);
    background-color: #eef8ff;
    box-shadow: 0 0 0 3px rgba(11, 122, 225, 0.1);
}

.plot-item__preview {
    display: grid;
    width: 42px;
    height: 42px;
    flex: none;
    place-items: center;
    border-radius: 7px;
    background-color: #f6fafc;
}

.plot-item img {
    display: block;
    width: 34px;
    height: 34px;
    object-fit: contain;
}

.plot-item__name {
    max-width: 100%;
    overflow: hidden;
    font-size: 12px;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.plot-item__check {
    position: absolute;
    top: 5px;
    right: 5px;
    display: grid;
    width: 16px;
    height: 16px;
    place-items: center;
    border-radius: 50%;
    color: #fff;
    background-color: var(--plot-blue);
}

.plot-item__check .el-icon {
    font-size: 11px;
}

.plot-tip {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 12px 2px 0;
    color: var(--plot-muted);
    font-size: 12px;
    line-height: 1.4;
}

.plot-tip .el-icon {
    flex: none;
    color: var(--plot-blue);
    font-size: 14px;
}

@media (max-width: 420px) {
    .plot-intro {
        padding: 12px;
    }

    .plot-intro__copy p,
    .section-heading__hint {
        display: none;
    }

    .plot {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        max-height: calc(100vh - 290px);
    }
}
</style>
