<template>
    <Panel1 title="全屏" width="min(400px, calc(100vw - 24px))" @close="$emit('close')">
        <div class="fullscreen-content">
            <section class="fullscreen-intro">
                <div class="fullscreen-intro__icon" :class="{ 'is-active': isFullScreen }" aria-hidden="true">
                    <el-icon>
                        <FullScreen v-if="!isFullScreen" />
                        <ScaleToOriginal v-else />
                    </el-icon>
                </div>
                <div class="fullscreen-intro__copy">
                    <h3>{{ isFullScreen ? '正在全屏浏览' : '全屏浏览地图' }}</h3>
                    <p>{{ isFullScreen ? '当前页面已进入全屏模式' : '扩大地图视野，获得更完整的浏览空间' }}</p>
                </div>
            </section>

            <section class="fullscreen-status" :class="{ 'fullscreen-status--active': isFullScreen }"
                aria-live="polite">
                <div class="fullscreen-status__indicator">
                    <span></span>
                </div>
                <div class="fullscreen-status__copy">
                    <strong>{{ isFullScreen ? '全屏已开启' : '当前为窗口模式' }}</strong>
                    <span>{{ isSupported ? '浏览器全屏功能可用' : '当前浏览器不支持全屏功能' }}</span>
                </div>
                <el-icon class="fullscreen-status__symbol">
                    <CircleCheckFilled v-if="isFullScreen && isSupported" />
                    <WarningFilled v-else-if="!isSupported" />
                    <Monitor v-else />
                </el-icon>
            </section>

            <div class="btns">
                <el-button v-if="!isFullScreen" type="primary" :disabled="!isSupported" :loading="isLoading"
                    @click="enterFullScreen">
                    <el-icon>
                        <FullScreen />
                    </el-icon>
                    <span>进入全屏</span>
                </el-button>
                <el-button v-else type="primary" :loading="isLoading" @click="leaveFullScreen">
                    <el-icon>
                        <ScaleToOriginal />
                    </el-icon>
                    <span>退出全屏</span>
                </el-button>
            </div>

            <p class="fullscreen-tip">
                <el-icon aria-hidden="true">
                    <InfoFilled />
                </el-icon>
                <span>{{ isFullScreen ? '退出后将恢复页面原有布局' : '全屏模式下地图操作区域会自动扩展' }}</span>
            </p>
        </div>
    </Panel1>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import Panel1 from '@/components/panel/Panel1.vue'
import { exitFullScreen, fullScreen, getFullscreenElement, supportsFullscreen } from '@/utils/fullscreen'

const isFullScreen = ref(false)
const isSupported = ref(true)
const isLoading = ref(false)

function syncFullscreenState() {
    isFullScreen.value = Boolean(getFullscreenElement())
}

function showFullscreenError(error, fallbackMessage) {
    ElMessage.error(error?.message || fallbackMessage)
}

async function enterFullScreen() {
    if (!isSupported.value || isLoading.value) {
        return
    }

    isLoading.value = true
    try {
        await fullScreen('.geology-container')
        syncFullscreenState()
    } catch (error) {
        showFullscreenError(error, '进入全屏失败，请检查浏览器权限')
    } finally {
        isLoading.value = false
    }
}

async function leaveFullScreen() {
    if (isLoading.value) {
        return
    }

    isLoading.value = true
    try {
        await exitFullScreen()
        syncFullscreenState()
    } catch (error) {
        showFullscreenError(error, '退出全屏失败，请稍后重试')
    } finally {
        isLoading.value = false
    }
}

const fullscreenEvents = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange']

onMounted(() => {
    isSupported.value = supportsFullscreen()
    syncFullscreenState()
    fullscreenEvents.forEach((eventName) => document.addEventListener(eventName, syncFullscreenState))
})

onBeforeUnmount(() => {
    fullscreenEvents.forEach((eventName) => document.removeEventListener(eventName, syncFullscreenState))
})
</script>

<style lang="scss" scoped>
.fullscreen-content {
    --fullscreen-blue: #0b7ae1;
    --fullscreen-ink: #17324d;
    --fullscreen-muted: #7d94a4;
    --fullscreen-line: #e3edf3;
    color: var(--fullscreen-ink);
}

.fullscreen-intro {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border: 1px solid #d8eaf5;
    border-radius: 8px;
    background-color: #f4faff;
}

.fullscreen-intro__icon {
    display: grid;
    width: 40px;
    height: 40px;
    flex: none;
    place-items: center;
    border-radius: 10px;
    color: var(--fullscreen-blue);
    background-color: #dff1ff;
    box-shadow: inset 0 0 0 1px rgba(11, 122, 225, 0.08);
    transition: color 180ms ease, background-color 180ms ease;
}

.fullscreen-intro__icon.is-active {
    color: #fff;
    background-color: var(--fullscreen-blue);
}

.fullscreen-intro__icon .el-icon {
    font-size: 21px;
}

.fullscreen-intro__copy {
    min-width: 0;
}

.fullscreen-intro__copy h3 {
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.35;
}

.fullscreen-intro__copy p {
    margin: 0;
    overflow: hidden;
    color: var(--fullscreen-muted);
    font-size: 12px;
    line-height: 1.45;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.fullscreen-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 14px;
    padding: 13px 14px;
    border: 1px solid var(--fullscreen-line);
    border-radius: 8px;
    background-color: #fbfdfe;
    transition: border-color 180ms ease, background-color 180ms ease;
}

.fullscreen-status--active {
    border-color: #b9ddf3;
    background-color: #f2f9fe;
}

.fullscreen-status__indicator {
    display: grid;
    width: 22px;
    height: 22px;
    flex: none;
    place-items: center;
    border-radius: 50%;
    background-color: #edf2f5;
}

.fullscreen-status__indicator span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #95a7b2;
}

.fullscreen-status--active .fullscreen-status__indicator {
    background-color: #dff5ea;
}

.fullscreen-status--active .fullscreen-status__indicator span {
    background-color: #27ae73;
    box-shadow: 0 0 0 3px rgba(39, 174, 115, 0.12);
}

.fullscreen-status__copy {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: 3px;
}

.fullscreen-status__copy strong {
    font-size: 13px;
    line-height: 1.35;
}

.fullscreen-status__copy span {
    overflow: hidden;
    color: var(--fullscreen-muted);
    font-size: 11px;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.fullscreen-status__symbol {
    flex: none;
    color: #9badb7;
    font-size: 18px;
}

.fullscreen-status--active .fullscreen-status__symbol {
    color: #27ae73;
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
        margin: 0;
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

    .el-button.is-disabled {
        box-shadow: none;
        transform: none;
    }

    .el-icon {
        font-size: 17px;
    }
}

.fullscreen-tip {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 12px 2px 0;
    color: var(--fullscreen-muted);
    font-size: 12px;
    line-height: 1.4;
}

.fullscreen-tip .el-icon {
    flex: none;
    color: var(--fullscreen-blue);
    font-size: 14px;
}

@media (max-width: 360px) {
    .fullscreen-intro {
        padding: 12px;
    }

    .fullscreen-intro__copy p {
        display: none;
    }

    .fullscreen-status {
        padding: 12px;
    }
}
</style>
