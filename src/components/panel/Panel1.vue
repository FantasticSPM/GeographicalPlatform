<template>
    <div class="panel1" :style="{
        width,
    }">
        <div class="panel-header">
            <div class="panel-title">
                <span class="panel-title__mark"></span>
                <div class="panel-title__content">
                    <slot name="header">
                        <slot name="title">
                            <h2>{{ title }}</h2>
                        </slot>
                    </slot>
                </div>
            </div>
            <button class="close-button" type="button" aria-label="关闭面板" title="关闭面板" @click="handleClose">
                <el-icon>
                    <CloseBold />
                </el-icon>
            </button>
        </div>
        <div class="panel-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '400px'
    }
})

const emit = defineEmits(['close'])
function handleClose() {
    emit('close')
}
</script>


<style lang="scss" scoped>
.panel1 {
    --panel-blue: #0b7ae1;
    --panel-ink: #17324d;
    --panel-line: #e3edf3;
    height: 100%;
    display: flex;
    float: right;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 12px 30px rgba(24, 59, 91, 0.16), 0 2px 8px rgba(24, 59, 91, 0.08);
    border-radius: 8px;
    padding: 10px;
    margin: 20px 0;
    overflow: hidden;
    will-change: transform, opacity;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #b9cedc transparent;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border: 1px solid transparent;
        border-radius: 999px;
        background-color: #b9cedc;
        background-clip: padding-box;
        transition: background-color 180ms ease;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #86aec6;
    }

    &::-webkit-scrollbar-corner {
        background-color: transparent;
    }

    .panel-header {
        display: flex;
        min-height: 36px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--panel-line);
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        // margin-bottom: 16px;
    }

    .panel-title {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 10px;
    }

    .panel-title__mark {
        width: 4px;
        height: 22px;
        flex: none;
        border-radius: 3px;
        background-color: var(--panel-blue);
        box-shadow: 0 0 8px rgba(11, 122, 225, 0.32);
    }

    .panel-title__content {
        min-width: 0;
        color: var(--panel-ink);
    }

    .panel-title__content :deep(h2) {
        margin: 0;
        overflow: hidden;
        font-size: 17px;
        font-weight: 700;
        line-height: 1.35;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .close-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        flex: none;
        padding: 0;
        border: 1px solid transparent;
        border-radius: 5px;
        color: #8ca0af;
        background-color: transparent;
        cursor: pointer;
        transition: color 180ms ease, border-color 180ms ease, background-color 180ms ease;
    }

    .close-button:hover {
        border-color: #d7e7f1;
        color: var(--panel-blue);
        background-color: #f2f8fc;
    }

    .close-button:focus-visible {
        outline: 2px solid rgba(11, 122, 225, 0.35);
        outline-offset: 2px;
    }

    .close-button .el-icon {
        font-size: 16px;
    }

    .close-icon {
        cursor: pointer;
    }

    .panel-content {
        padding: 10px;
    }
}

.panel-slide-enter-active,
.panel-slide-leave-active {
    transition: opacity 650ms ease, transform 650ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.panel-slide-enter-from,
.panel-slide-leave-to {
    opacity: 0;
    transform: translateX(70px);
}
</style>
