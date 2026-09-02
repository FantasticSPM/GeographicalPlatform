<template>
    <Panel1 title="空间定位" width="min(400px, calc(100vw - 24px))" @close="$emit('close')">
        <div class="location-content">
            <section class="location-intro">
                <div class="location-intro__icon" aria-hidden="true">
                    <el-icon>
                        <LocationInformation />
                    </el-icon>
                </div>
                <div class="location-intro__copy">
                    <h3>坐标定位</h3>
                    <p>输入经纬度，快速移动到地图上的目标位置</p>
                </div>
            </section>

            <el-form class="location-form" @submit.prevent="handleSubmit" :model="formData" :rules="rules" ref="form">
                <div class="coordinate-card">
                    <div class="coordinate-card__header">
                        <span>目标坐标</span>
                        <span class="coordinate-card__format">WGS84</span>
                    </div>

                    <div class="coordinate-grid">
                        <el-form-item class="coordinate-field" label="经度:" prop="longitude">
                            <el-input v-model="formData.longitude" placeholder="例如 116" clearable inputmode="decimal">
                                <template #prefix>
                                    <span class="axis-badge">E</span>
                                </template>
                                <template #suffix>
                                    <span class="coordinate-unit">°</span>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="coordinate-field" label="纬度:" prop="latitude">
                            <el-input v-model="formData.latitude" placeholder="例如 39" clearable inputmode="decimal">
                                <template #prefix>
                                    <span class="axis-badge">N</span>
                                </template>
                                <template #suffix>
                                    <span class="coordinate-unit">°</span>
                                </template>
                            </el-input>
                        </el-form-item>
                    </div>

                    <p class="coordinate-range">经度范围 -180° 至 180° · 纬度范围 -90° 至 90°</p>
                </div>

                <div class="btns">
                    <el-button type="primary" native-type="submit">
                        <el-icon>
                            <Aim />
                        </el-icon>
                        <span>开始定位</span>
                    </el-button>
                </div>
            </el-form>

            <p class="location-tip">
                <el-icon aria-hidden="true">
                    <InfoFilled />
                </el-icon>
                <span>定位后地图会自动缩放到目标位置</span>
            </p>
        </div>
    </Panel1>
</template>

<script setup>
import { ref } from 'vue'
import Panel1 from '@/components/panel/Panel1.vue'
const form = ref(null)
const formData = ref({
    longitude: '',
    latitude: ''
})

const rules = {
    longitude: [
        { required: true, message: '请输入经度', trigger: 'blur' },
        { pattern: /^-?\d+(\.\d+)?$/, message: '请输入正确的经度', trigger: 'blur' }
    ],
    latitude: [
        { required: true, message: '请输入纬度', trigger: 'blur' },
        { pattern: /^-?\d+(\.\d+)?$/, message: '请输入正确的纬度', trigger: 'blur' }
    ]
}
const handleSubmit = () => {
    form.value.validate((valid) => {
        if (valid) {
            const coordinates = [+formData.value.longitude, +formData.value.latitude]
            locate(coordinates)
        } else {
            return false
        }
    })
}

// 进行定位
function locate(coordinates) {
    window.map.flyTo({
        center: coordinates,
        zoom: 15
    })
}
</script>

<style lang="scss" scoped>
.location-content {
    --location-blue: #0b7ae1;
    --location-ink: #17324d;
    --location-muted: #7d94a4;
    --location-line: #e3edf3;
    color: var(--location-ink);
}

.location-intro {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border: 1px solid #d8eaf5;
    border-radius: 8px;
    background-color: #f4faff;
}

.location-intro__icon {
    display: grid;
    width: 40px;
    height: 40px;
    flex: none;
    place-items: center;
    border-radius: 10px;
    color: var(--location-blue);
    background-color: #dff1ff;
    box-shadow: inset 0 0 0 1px rgba(11, 122, 225, 0.08);
}

.location-intro__icon .el-icon {
    font-size: 21px;
}

.location-intro__copy {
    min-width: 0;
}

.location-intro__copy h3 {
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.35;
}

.location-intro__copy p {
    margin: 0;
    overflow: hidden;
    color: var(--location-muted);
    font-size: 12px;
    line-height: 1.45;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.location-form {
    margin-top: 14px;
}

.coordinate-card {
    padding: 14px;
    border: 1px solid var(--location-line);
    border-radius: 8px;
    background-color: #fbfdfe;
}

.coordinate-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 700;
}

.coordinate-card__format {
    padding: 3px 7px;
    border: 1px solid #cce4f3;
    border-radius: 4px;
    color: var(--location-blue);
    background-color: #eef8ff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.3px;
}

.coordinate-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5px;
}

.coordinate-field {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    gap: 3px;
}

.coordinate-field :deep(.el-form-item__label) {
    height: auto;
    padding: 0 0 6px;
    color: #526b7c;
    font-size: 12px;
    line-height: 1.4;
}

.coordinate-field :deep(.el-input__wrapper) {
    min-height: 40px;
    padding: 1px 10px;
    border: 1px solid #d5e4ec;
    border-radius: 6px;
    box-shadow: none;
    transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.coordinate-field :deep(.el-input__wrapper:hover) {
    border-color: #9bcce9;
}

.coordinate-field :deep(.el-input__wrapper.is-focus) {
    border-color: var(--location-blue);
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(11, 122, 225, 0.1);
}

.coordinate-field :deep(.el-input__inner) {
    color: var(--location-ink);
    font-size: 13px;
}

.coordinate-field :deep(.el-input__inner::placeholder) {
    color: #a5b5bf;
    font-size: 12px;
}

.axis-badge {
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;

    place-items: center;
    border-radius: 4px;
    color: var(--location-blue);
    background-color: #e7f4fd;
    font-size: 11px;
    font-weight: 700;
}

.coordinate-unit {
    color: #8ba0ad;
    font-size: 13px;
}

.coordinate-range {
    margin: 10px 0 0;
    color: var(--location-muted);
    font-size: 11px;
    line-height: 1.4;
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

.location-tip {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 12px 2px 0;
    color: var(--location-muted);
    font-size: 12px;
    line-height: 1.4;
}

.location-tip .el-icon {
    flex: none;
    color: var(--location-blue);
    font-size: 14px;
}

@media (max-width: 360px) {
    .location-intro {
        padding: 12px;
    }

    .location-intro__copy p {
        display: none;
    }

    .coordinate-card {
        padding: 12px;
    }

    .coordinate-grid {
        grid-template-columns: 1fr;
        gap: 8px;
    }
}
</style>
