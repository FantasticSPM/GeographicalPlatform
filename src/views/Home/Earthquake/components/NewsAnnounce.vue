<template>
    <article class="news-announce" aria-label="消息播报" aria-live="polite">
        <div class="news-announce__bar">
            <span class="news-announce__icon" aria-hidden="true">
                <el-icon>
                    <Bell />
                </el-icon>
            </span>
            <p class="news-announce__message">{{ message }}</p>
        </div>
    </article>
</template>

<script setup>
import { Bell } from '@element-plus/icons-vue'

defineProps({
    message: {
        type: String,
        default: ''
    }
})
</script>

<style scoped lang="scss">
.news-announce {
    --news-blue: #0b7ae1;
    --news-bg: #142736;
    --news-text: #f1f7fb;

    position: relative;
    width: min(500px, calc(100vw - 40px));
    min-width: 0;
    overflow: hidden;
    border: 1px solid rgba(122, 180, 218, 0.45);
    border-radius: 2px;
    color: var(--news-text);
    background: var(--news-bg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.28);
    transition: border-color 180ms ease, transform 180ms ease;
    padding: 5px;
}

.news-announce:hover {
    border-color: rgba(122, 203, 247, 0.78);
    transform: translateY(-1px);
}

.news-announce__bar {
    display: flex;
    align-items: center;
    min-width: 0;
    gap: 0;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
}

.news-announce__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    border: 0;
    border-radius: 0;
    color: #fff;
    font-size: 16px;
}

.news-announce__message {
    min-width: 0;
    flex: 1 1 auto;
    margin: 0;
    padding: 0 10px;
    overflow: hidden;
    color: var(--news-text);
    font-size: 13px;
    line-height: 21px;
    letter-spacing: 0.01em;
    text-overflow: ellipsis;
}

@media (max-width: 640px) {
    .news-announce {
        width: calc(100vw - 24px);
    }

    .news-announce__bar {
        overflow-x: auto;
        scrollbar-width: none;
    }

    .news-announce__bar::-webkit-scrollbar {
        display: none;
    }

    .news-announce__message {
        flex: 0 0 auto;
        padding-right: 18px;
    }
}
</style>
