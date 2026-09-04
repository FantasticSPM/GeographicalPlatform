<template>
    <article class="news-announce" aria-label="实时消息播报">
        <div class="news-announce__topline">
            <span class="news-announce__live">
                <i aria-hidden="true"></i>
                实时播报
            </span>
            <span class="news-announce__source">气象中心</span>
        </div>

        <div class="news-announce__heading">
            <span class="news-announce__icon" aria-hidden="true">
                <el-icon>
                    <Bell />
                </el-icon>
            </span>
            <div class="news-announce__title">
                <span>气象预警</span>
                <h2>台风“科罗旺”</h2>
            </div>
            <strong class="news-announce__severity">8 级</strong>
        </div>

        <p class="news-announce__message">中心附近最大风力 8 级，当前位于西北太平洋海域。</p>

        <div class="news-announce__metrics" aria-label="台风位置数据">
            <div>
                <span>纬度</span>
                <strong>29.7°N</strong>
            </div>
            <div>
                <span>经度</span>
                <strong>128.0°E</strong>
            </div>
            <div>
                <span>更新</span>
                <strong>刚刚</strong>
            </div>
        </div>

        <footer class="news-announce__footer">
            <span>
                <el-icon aria-hidden="true">
                    <Location />
                </el-icon>
                西北太平洋
            </span>
            <time>刚刚更新</time>
        </footer>
    </article>
</template>

<script setup>
import { Bell, Location } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.news-announce {
    --news-blue: #67c7e7;
    --news-text: #eef7fb;
    --news-subtle: #9aadb8;
    --news-dim: #657781;

    position: relative;
    width: min(334px, calc(100vw - 32px));
    padding: 12px 13px 10px;
    overflow: hidden;
    border: 1px solid rgba(144, 178, 191, 0.3);
    border-radius: 7px;
    color: var(--news-text);
    background: linear-gradient(145deg, rgba(39, 49, 56, 0.97), rgba(24, 31, 37, 0.97));
    box-shadow: 0 7px 18px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}

.news-announce::before,
.news-announce::after {
    position: absolute;
    content: '';
    pointer-events: none;
}

.news-announce::before {
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background: linear-gradient(180deg, #e6a23c 0 42%, rgba(103, 199, 231, 0.7) 42% 100%);
}

.news-announce::after {
    top: 0;
    right: 0;
    width: 34px;
    height: 34px;
    border-top: 1px solid rgba(103, 199, 231, 0.38);
    border-right: 1px solid rgba(103, 199, 231, 0.38);
    border-top-right-radius: 7px;
    opacity: 0.7;
}

.news-announce:hover {
    border-color: rgba(103, 199, 231, 0.52);
    transform: translateY(-1px);
    box-shadow: 0 9px 22px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(103, 199, 231, 0.08);
}

.news-announce__topline,
.news-announce__live,
.news-announce__heading,
.news-announce__footer,
.news-announce__footer > span {
    display: flex;
    align-items: center;
}

.news-announce__topline {
    justify-content: space-between;
    margin-bottom: 10px;
    padding-left: 1px;
    color: var(--news-subtle);
    font-size: 10px;
    line-height: 14px;
}

.news-announce__live {
    gap: 6px;
    color: var(--news-blue);
    font-weight: 600;
    letter-spacing: 0.08em;
}

.news-announce__live i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #5de0a4;
    box-shadow: 0 0 0 3px rgba(93, 224, 164, 0.1);
}

.news-announce__source {
    color: var(--news-dim);
    letter-spacing: 0.04em;
}

.news-announce__heading {
    gap: 10px;
}

.news-announce__icon {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 31px;
    height: 31px;
    border: 1px solid rgba(103, 199, 231, 0.35);
    border-radius: 6px;
    color: var(--news-blue);
    background: rgba(103, 199, 231, 0.1);
    font-size: 16px;
}

.news-announce__title {
    min-width: 0;
    flex: 1;
}

.news-announce__title > span {
    display: block;
    margin-bottom: 1px;
    color: var(--news-subtle);
    font-size: 10px;
    line-height: 13px;
}

.news-announce__title h2 {
    overflow: hidden;
    margin: 0;
    color: var(--news-text);
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.news-announce__severity {
    flex: 0 0 auto;
    align-self: flex-start;
    padding: 3px 6px;
    border: 1px solid rgba(230, 162, 60, 0.38);
    border-radius: 4px;
    color: #efbd70;
    background: rgba(230, 162, 60, 0.1);
    font-size: 11px;
    font-weight: 600;
    line-height: 15px;
}

.news-announce__message {
    margin: 10px 0 11px;
    color: rgba(231, 240, 245, 0.82);
    font-size: 12px;
    line-height: 1.6;
}

.news-announce__metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid rgba(193, 216, 226, 0.12);
    border-bottom: 1px solid rgba(193, 216, 226, 0.12);
}

.news-announce__metrics > div {
    min-width: 0;
    padding: 8px 9px 7px;
}

.news-announce__metrics > div + div {
    border-left: 1px solid rgba(193, 216, 226, 0.12);
}

.news-announce__metrics span,
.news-announce__metrics strong {
    display: block;
}

.news-announce__metrics span {
    margin-bottom: 3px;
    color: var(--news-dim);
    font-size: 10px;
    line-height: 13px;
}

.news-announce__metrics strong {
    overflow: hidden;
    color: #dcebf1;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.news-announce__footer {
    justify-content: space-between;
    gap: 12px;
    padding-top: 9px;
    color: var(--news-subtle);
    font-size: 10px;
    line-height: 15px;
}

.news-announce__footer > span {
    min-width: 0;
    gap: 5px;
}

.news-announce__footer .el-icon {
    flex: 0 0 auto;
    color: var(--news-blue);
    font-size: 12px;
}

.news-announce__footer time {
    flex: 0 0 auto;
    color: var(--news-dim);
}

@media (max-width: 560px) {
    .news-announce {
        width: min(334px, calc(100vw - 24px));
    }
}
</style>
