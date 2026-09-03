<template>
    <Panel title="">
        <template #header>
            <div>
                <p class="panel-kicker">GEO DATA SERVICE</p>
                <h2>数据上传</h2>
            </div>
            <span class="heading-icon">
                <el-icon>
                    <UploadFilled />
                </el-icon>
            </span>
        </template>
        <section class="upload-section">
            <div class="section-title">
                <span>导入空间数据</span>
                <span class="required-mark">必填</span>
            </div>
            <p class="section-description">上传文件后，平台将自动解析并加载至当前地图。</p>

            <el-upload class="upload-area" drag action="#" :auto-upload="false" :show-file-list="false"
                accept=".geojson,.json,.zip,.tif,.tiff" :on-change="handleFileChange">
                <el-icon class="upload-icon">
                    <UploadFilled />
                </el-icon>
                <div class="upload-title">拖拽文件到这里</div>
                <div class="upload-subtitle">或 <span>点击选择文件</span></div>
            </el-upload>

            <div class="format-hint">
                <el-icon>
                    <InfoFilled />
                </el-icon>
                <span>支持 GeoJSON、JSON、ZIP、TIFF，单个文件不超过 100MB</span>
            </div>
        </section>

        <section v-if="selectedFile" class="file-section">
            <div class="section-title">
                <span>待上传文件</span>
                <span class="file-status">已就绪</span>
            </div>

            <div class="file-item">
                <span class="file-icon">
                    <el-icon>
                        <Document />
                    </el-icon>
                </span>
                <span class="file-details">
                    <strong :title="selectedFile.name">{{ selectedFile.name }}</strong>
                    <small>{{ formatFileSize(selectedFile.size) }}</small>
                </span>
                <button class="remove-button" type="button" aria-label="移除文件" title="移除文件" @click="clearFile">
                    <el-icon>
                        <Delete />
                    </el-icon>
                </button>
            </div>
        </section>

        <section v-if="uploadList.length > 0">
            <div class="section-title">
                <span>已上传文件</span>
                <span class="file-status">已完成</span>
            </div>
            <div class="file-list">
                <div v-for="file in uploadList" :key="file.name" class="file-item">
                    <el-icon class="file-icon" :color="file.info.color">
                        <template v-if="styleMap[file.type]">
                            <component :is="styleMap[file.type].icon"></component>
                        </template>
                        <Document v-else />
                    </el-icon>
                    <span class="file-details">
                        <strong :title="file.name">{{ file.name }}</strong>
                    </span>
                    <el-icon class="success-icon" title="上传成功" color="#67c23a">
                        <SuccessFilled />
                    </el-icon>
                    <div class="edit-buttons">
                        <el-color-picker size="small" v-model="file.info.color" @change="(e) => change(file.id, e)" />
                        <el-icon @click="locate(file.id)" title="定位">
                            <Position />
                        </el-icon>
                        <el-icon @click="remove(file.id)" title="移除">
                            <Delete />
                        </el-icon>
                    </div>
                </div>
            </div>
        </section>

        <template #footer>
            <button class="el-button el-button--primary" @click="handleUpload">
                <span>上传文件</span>
            </button>
        </template>
    </Panel>
</template>

<script setup>
import Panel from '@/components/panel/Panel.vue'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import Point from '@/components/Icon/Point.vue'
import Line from '@/components/Icon/Line.vue'
import Polygon from '@/components/Icon/Polygon.vue'
import { hasData, handleGeojson, removeData, locateData, changeColor } from '@/utils/map'

import { useSourceStore } from '@/stores/source'
const sourceStore = useSourceStore()

const selectedFile = ref(null)
const uploadList = computed(() => {
    return sourceStore.source.find(i => i.id === 'upload')?.children || []
})

const styleMap = {
    'polygon': {
        color: '#008888',
        opacity: 0.5,
        icon: Polygon
    },
    'line': {
        color: '#0b7ae1',
        width: 1,
        icon: Line
    },
    'point': {
        radius: 6,
        color: '#007acc',
        icon: Point
    }
}

function handleFileChange(uploadFile) {
    const file = uploadFile.raw
    if (!file) return

    if (file.size > 100 * 1024 * 1024) {
        ElMessage.warning('单个文件不能超过 100MB')
        return
    }

    selectedFile.value = file
}

function clearFile() {
    selectedFile.value = null
}

function formatFileSize(size = 0) {
    if (size < 1024 * 1024) {
        return `${Math.max(1, Math.round(size / 1024))} KB`
    }

    return `${(size / 1024 / 1024).toFixed(2)} MB`
}

function handleUpload() {
    if (!selectedFile.value) {
        return ElMessage.warning('请先选择文件')
    }

    const type = selectedFile.value.type || selectedFile.value.name.split('.').pop()
    if (type === 'application/json' || type === 'application/geo+json' || type === 'geojson' || type === 'json') {
        const reader = new FileReader()
        reader.onload = (event) => {
            const data = JSON.parse(event.target.result)
            let name = selectedFile.value.name.split('.').slice(0, -1).join('.')
            if (hasData(window.map, name)) {
                name = `${name}-${uploadList.value.length}`
            }

            const result = handleGeojson(window.map, data, name, styleMap)

            const info = {
                id: name,
                name: name,
                type: result.geometryType,
                info: {
                    size: selectedFile.value.size,
                    fileType: selectedFile.value.type,
                    color: result.color,
                    data,
                }
            }

            sourceStore.addSource('upload', info)
            clearFile()
        }
        reader.readAsText(selectedFile.value)
    } else {
        ElMessage.warning('不支持的文件类型')
    }
}


function locate(id) {
    locateData(window.map, id)
}

function remove(id) {
    removeData(window.map, id)
    sourceStore.removeSource('upload', id)
}

function change(id, color) {
    changeColor(window.map, id, color)
}

</script>

<style lang="scss" scoped>
.panel-kicker {
    margin: 0 0 7px;
    color: var(--blue);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    line-height: 1.2;
}

.heading-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    color: var(--blue);
    background-color: #eaf5ff;
}


.upload-section,
.file-section {
    flex: none;
}

.section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #334f67;
    font-size: 13px;
    font-weight: 600;
}

.required-mark,
.file-status {
    padding: 3px 7px;
    border-radius: 10px;
    color: #6c8ba3;
    background-color: #f0f6fa;
    font-size: 10px;
    font-weight: 500;
}

.file-status {
    color: #15956a;
    background-color: #e9f8f1;
}

.section-description {
    margin: 8px 0 15px;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.6;
}

.upload-area {
    width: 100%;
}

.upload-area :deep(.el-upload) {
    width: 100%;
}

.upload-area :deep(.el-upload-dragger) {
    display: flex;
    width: 100%;
    min-height: 175px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 22px 14px;
    border: 1px dashed #b8d6ea;
    border-radius: 6px;
    background-color: #f8fbfd;
    transition: border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.upload-area :deep(.el-upload-dragger:hover) {
    border-color: var(--blue);
    background-color: #f3faff;
    box-shadow: 0 4px 14px rgba(11, 122, 225, 0.08);
}

.upload-icon {
    margin-bottom: 13px;
    color: var(--blue);
    font-size: 32px;
}

.upload-title {
    color: #405f77;
    font-size: 13px;
    font-weight: 600;
}

.upload-subtitle {
    margin-top: 7px;
    color: #95a6b4;
    font-size: 11px;
}

.upload-subtitle span {
    color: var(--blue);
}

.format-hint {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    margin-top: 12px;
    color: #9aaab6;
    font-size: 10px;
    line-height: 1.5;
}

.format-hint .el-icon {
    flex: none;
    margin-top: 1px;
    color: #8db8d6;
}

section {
    margin-bottom: 23px;
}

.file-item {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    margin-top: 11px;
    padding: 10px;
    border: 1px solid #e1edf4;
    border-radius: 5px;
    background-color: #fbfdfe;

    .edit-buttons {
        display: none;

        .el-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 27px;
            height: 27px;
            flex: none;
            padding: 0;
            border: 0;
            border-radius: 4px;
            color: #9aaab6;
            background-color: transparent;
            cursor: pointer;
            transition: color 180ms ease, background-color 180ms ease;
        }
    }

    &:hover {
        .edit-buttons {
            display: flex;
            align-items: center;
        }

        .success-icon {
            display: none;
        }
    }
}

.file-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex: none;
    border-radius: 4px;
    background-color: #eaf5ff;
}

.file-details {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: 4px;
}

.file-details strong {
    overflow: hidden;
    color: #486279;
    font-size: 11px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.file-details small {
    color: #9aaab6;
    font-size: 10px;
}

.remove-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    flex: none;
    padding: 0;
    border: 0;
    border-radius: 4px;
    color: #9aaab6;
    background-color: transparent;
    cursor: pointer;
    transition: color 180ms ease, background-color 180ms ease;
}

.remove-button:hover {
    color: #e35d6a;
    background-color: #fff0f1;
}

.panel-footer {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: auto;
    padding-top: 20px;
}

.footer-note {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #94a4b1;
    font-size: 10px;
}

.status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #24b47e;
    box-shadow: 0 0 0 3px rgba(36, 180, 126, 0.12);
}

.upload-button {
    width: 100%;
    min-height: 40px;
    border: 0;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.upload-button .el-icon {
    margin-right: 5px;
}
</style>
