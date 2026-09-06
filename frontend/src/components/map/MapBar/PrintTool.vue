<template>
    <Panel1 title="打印" width="min(400px, calc(100vw - 24px))" @close="$emit('close')">
        <div class="print-content">
            <section class="print-intro">
                <div class="print-intro__icon" aria-hidden="true">
                    <el-icon>
                        <Printer />
                    </el-icon>
                </div>
                <div class="print-intro__copy">
                    <h3>地图打印</h3>
                    <p>选择纸张尺寸和方向，输出当前地图视图</p>
                </div>
            </section>

            <el-form class="print-form" @submit.prevent>
                <section class="preview-card">
                    <div class="preview-card__header">
                        <span>打印预览</span>
                        <span class="preview-status">
                            <span class="preview-status__dot"></span>
                            已就绪
                        </span>
                    </div>
                    <div class="preview-stage">
                        <div class="paper-preview" :class="{ 'paper-preview--portrait': !isLandscape }">
                            <div class="paper-preview__map" aria-hidden="true">
                                <span class="map-line map-line--one"></span>
                                <span class="map-line map-line--two"></span>
                                <span class="map-line map-line--three"></span>
                                <span class="map-point map-point--one"></span>
                                <span class="map-point map-point--two"></span>
                            </div>
                            <span class="paper-preview__compass">N</span>
                        </div>
                    </div>
                    <div class="preview-meta">
                        <span>{{ selectedOption.label }}</span>
                        <span>当前地图范围</span>
                    </div>
                </section>

                <section class="settings-card">
                    <div class="settings-card__heading">
                        <span>纸张设置</span>
                        <span class="settings-card__hint">选择输出格式</span>
                    </div>
                    <el-form-item label="尺寸:" class="paper-field">
                        <el-select v-model="value" placeholder="请选择" aria-label="选择纸张尺寸和方向">
                            <template #prefix>
                                <el-icon>
                                    <Document />
                                </el-icon>
                            </template>
                            <el-option v-for="option in options" :key="option.value" :label="option.label"
                                :value="option.value"></el-option>
                        </el-select>
                    </el-form-item>
                </section>

                <div class="btns">
                    <el-button type="primary" native-type="submit">
                        <el-icon>
                            <Printer />
                        </el-icon>
                        <span>打印地图</span>
                    </el-button>
                </div>
            </el-form>

            <p class="print-tip">
                <el-icon aria-hidden="true">
                    <InfoFilled />
                </el-icon>
                <span>打印内容将按照当前地图视野生成</span>
            </p>
        </div>
    </Panel1>
</template>

<script setup>
import { computed, ref } from 'vue'
import Panel1 from '@/components/panel/Panel1.vue'
const options = [
    {
        label: 'A4纸横向',
        value: 'A4-1'
    },
    {
        label: 'A4纸纵向',
        value: 'A4-2'
    },
    {
        label: 'A3纸横向',
        value: 'A3-1'
    },
    {
        label: 'A3纸纵向',
        value: 'A3-2'
    }
]
const value = ref('A4-1')

const selectedOption = computed(() => options.find((option) => option.value === value.value) || options[0])
const isLandscape = computed(() => value.value.endsWith('-1'))

</script>

<style lang="scss" scoped>
.print-content {
    --print-blue: #0b7ae1;
    --print-ink: #17324d;
    --print-muted: #7d94a4;
    --print-line: #e3edf3;
    color: var(--print-ink);
}

.print-intro {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border: 1px solid #d8eaf5;
    border-radius: 8px;
    background-color: #f4faff;
}

.print-intro__icon {
    display: grid;
    width: 40px;
    height: 40px;
    flex: none;
    place-items: center;
    border-radius: 10px;
    color: var(--print-blue);
    background-color: #dff1ff;
    box-shadow: inset 0 0 0 1px rgba(11, 122, 225, 0.08);
}

.print-intro__icon .el-icon {
    font-size: 21px;
}

.print-intro__copy {
    min-width: 0;
}

.print-intro__copy h3 {
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.35;
}

.print-intro__copy p {
    margin: 0;
    overflow: hidden;
    color: var(--print-muted);
    font-size: 12px;
    line-height: 1.45;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.print-form {
    margin-top: 14px;
}

.preview-card,
.settings-card {
    padding: 14px;
    border: 1px solid var(--print-line);
    border-radius: 8px;
    background-color: #fbfdfe;
}

.preview-card__header,
.settings-card__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 14px;
    font-weight: 700;
}

.preview-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #26a269;
    font-size: 11px;
    font-weight: 600;
}

.preview-status__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #27ae73;
    box-shadow: 0 0 0 3px rgba(39, 174, 115, 0.12);
}

.preview-stage {
    display: flex;
    height: 164px;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    border: 1px dashed #cbdfe9;
    border-radius: 6px;
    background-color: #f3f8fb;
}

.paper-preview {
    position: relative;
    width: 150px;
    height: 106px;
    padding: 8px;
    border: 1px solid #c2d5df;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 7px 14px rgba(35, 70, 91, 0.12);
    transition: width 180ms ease, height 180ms ease;
}

.paper-preview--portrait {
    width: 106px;
    height: 150px;
}

.paper-preview__map {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid #d6e7ee;
    background-color: #edf5f8;
}

.paper-preview__map::before,
.paper-preview__map::after {
    position: absolute;
    display: block;
    border: 1px solid rgba(11, 122, 225, 0.28);
    border-radius: 50%;
    content: '';
}

.paper-preview__map::before {
    width: 72%;
    height: 60%;
    top: 9%;
    left: 15%;
    transform: rotate(18deg);
    background-color: rgba(126, 196, 143, 0.38);
}

.paper-preview__map::after {
    width: 48%;
    height: 42%;
    right: -7%;
    bottom: 3%;
    transform: rotate(-25deg);
    background-color: rgba(255, 207, 102, 0.42);
}

.map-line {
    position: absolute;
    z-index: 1;
    display: block;
    height: 1px;
    background-color: rgba(74, 132, 160, 0.5);
    transform-origin: left center;
}

.map-line--one {
    width: 82%;
    top: 28%;
    left: 5%;
    transform: rotate(17deg);
}

.map-line--two {
    width: 76%;
    top: 55%;
    left: 13%;
    transform: rotate(-12deg);
}

.map-line--three {
    width: 70%;
    top: 76%;
    left: 3%;
    transform: rotate(7deg);
}

.map-point {
    position: absolute;
    z-index: 2;
    display: block;
    width: 6px;
    height: 6px;
    border: 1px solid #fff;
    border-radius: 50%;
    background-color: var(--print-blue);
    box-shadow: 0 1px 3px rgba(23, 50, 77, 0.25);
}

.map-point--one {
    top: 30%;
    left: 25%;
}

.map-point--two {
    right: 18%;
    bottom: 21%;
}

.paper-preview__compass {
    position: absolute;
    z-index: 3;
    top: 12px;
    right: 14px;
    color: #466b7d;
    font-size: 8px;
    font-weight: 700;
}

.preview-meta {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
    color: var(--print-muted);
    font-size: 11px;
}

.preview-meta span:first-child {
    color: var(--print-blue);
    font-weight: 600;
}

.settings-card {
    margin-top: 12px;
}

.settings-card__hint {
    color: var(--print-muted);
    font-size: 11px;
    font-weight: 400;
}

.paper-field {
    margin: 12px 0 0;
    display: flex;
    align-items: center;
}

.paper-field :deep(.el-form-item__label) {
    height: auto;
    padding: 0 0 6px;
    color: #526b7c;
    font-size: 12px;
    line-height: 1.4;
}

.paper-field :deep(.el-select) {
    width: 100%;
}

.paper-field :deep(.el-select__wrapper) {
    min-height: 40px;
    border: 1px solid #d5e4ec;
    border-radius: 6px;
    box-shadow: none;
    transition: border-color 180ms ease, box-shadow 180ms ease;
}

.paper-field :deep(.el-select__wrapper:hover) {
    border-color: #9bcce9;
}

.paper-field :deep(.el-select__wrapper.is-focused) {
    border-color: var(--print-blue);
    box-shadow: 0 0 0 3px rgba(11, 122, 225, 0.1);
}

.paper-field :deep(.el-select__selected-item) {
    color: var(--print-ink);
    font-size: 13px;
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

.print-tip {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 12px 2px 0;
    color: var(--print-muted);
    font-size: 12px;
    line-height: 1.4;
}

.print-tip .el-icon {
    flex: none;
    color: var(--print-blue);
    font-size: 14px;
}

@media (max-width: 360px) {
    .print-intro {
        padding: 12px;
    }

    .print-intro__copy p {
        display: none;
    }

    .preview-card,
    .settings-card {
        padding: 12px;
    }
}
</style>
