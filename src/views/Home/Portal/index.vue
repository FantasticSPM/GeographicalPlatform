<template>
    <div class="portal-page">
        <section class="hero">
            <div class="hero__content">
                <p class="eyebrow">GEOGRAPHICAL SPATIAL RESOURCE INFORMATION PLATFORM</p>
                <h1>让每一寸土地<br /><span>都看得见、读得懂</span></h1>
                <p class="hero__description">
                    汇聚空间、天气、专题与平台资讯，以更清晰的视角感知环境变化，为区域研判与公共服务提供可靠依据。
                </p>
                <div class="hero__actions">
                    <RouterLink class="hero__action hero__action--primary" to="/geology">
                        <el-icon>
                            <MapLocation />
                        </el-icon>
                        <span>浏览空间信息</span>
                        <el-icon class="action-arrow">
                            <ArrowRight />
                        </el-icon>
                    </RouterLink>
                    <RouterLink class="hero__action hero__action--ghost" to="/weather">
                        <el-icon>
                            <Sunny />
                        </el-icon>
                        <span>查看天气动态</span>
                    </RouterLink>
                </div>
            </div>

            <div class="hero__meta">
                <span class="hero__meta-label">LIVE VIEW</span>
                <span class="hero__meta-line"></span>
                <span>空间数据 · 环境感知 · 信息洞察</span>
            </div>

            <div class="hero__scroll">
                <span>向下探索</span>
                <el-icon>
                    <ArrowDown />
                </el-icon>
            </div>
        </section>

        <section class="explore-section">
            <div class="section-heading">
                <p class="section-kicker">EXPLORE THE PLATFORM</p>
                <h2>从地图开始，理解一座区域</h2>
                <p>把分散的信息放回地理空间中，让每一次观察都拥有清晰的坐标。</p>
            </div>

            <div class="feature-grid">
                <RouterLink class="feature-card feature-card--blue" to="/geology">
                    <div class="feature-card__topline">
                        <span class="feature-card__index">01</span>
                        <el-icon class="feature-card__icon">
                            <MapLocation />
                        </el-icon>
                    </div>
                    <div class="feature-card__body">
                        <h3>空间信息</h3>
                        <p>在地图中浏览空间信息，建立对区域环境与地理资源的整体认知。</p>
                        <span class="feature-card__link">进入专题 <el-icon>
                                <ArrowRight />
                            </el-icon></span>
                    </div>
                </RouterLink>

                <RouterLink class="feature-card feature-card--teal" to="/weather">
                    <div class="feature-card__topline">
                        <span class="feature-card__index">02</span>
                        <el-icon class="feature-card__icon">
                            <Sunny />
                        </el-icon>
                    </div>
                    <div class="feature-card__body">
                        <h3>天气信息</h3>
                        <p>掌握实时天气变化，为出行、生产与环境观察提供参考。</p>
                        <span class="feature-card__link">进入专题 <el-icon>
                                <ArrowRight />
                            </el-icon></span>
                    </div>
                </RouterLink>

                <RouterLink class="feature-card feature-card--amber" to="/theme">
                    <div class="feature-card__topline">
                        <span class="feature-card__index">03</span>
                        <el-icon class="feature-card__icon">
                            <TrendCharts />
                        </el-icon>
                    </div>
                    <div class="feature-card__body">
                        <h3>特色专题</h3>
                        <p>汇集实景三维、交通枢纽与可视化平台，发现更多空间应用场景。</p>
                        <span class="feature-card__link">进入专题 <el-icon>
                                <ArrowRight />
                            </el-icon></span>
                    </div>
                </RouterLink>

                <RouterLink class="feature-card feature-card--green" to="/help">
                    <div class="feature-card__topline">
                        <span class="feature-card__index">04</span>
                        <el-icon class="feature-card__icon">
                            <Postcard />
                        </el-icon>
                    </div>
                    <div class="feature-card__body">
                        <h3>平台信息</h3>
                        <p>查看新闻公告与服务条款，及时了解平台动态和服务边界。</p>
                        <span class="feature-card__link">进入专题 <el-icon>
                                <ArrowRight />
                            </el-icon></span>
                    </div>
                </RouterLink>
            </div>
        </section>

        <section class="metrics-section">
            <div class="metrics-intro">
                <p class="section-kicker">A CLEARER VIEW</p>
                <h2>让信息抵达决策之前</h2>
            </div>
            <div class="metrics-grid">
                <div class="metric">
                    <strong>04</strong>
                    <span>核心模块</span>
                </div>
                <div class="metric">
                    <strong>24<span>H</span></strong>
                    <span>天气持续感知</span>
                </div>
                <div class="metric">
                    <strong>01</strong>
                    <span>统一空间入口</span>
                </div>
                <div class="metric">
                    <strong>01</strong>
                    <span>平台资讯中心</span>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.portal-page {
    --ink: #17324d;
    --muted: #637487;
    --line: #dce6ed;
    --blue: #0b7ae1;
    --teal: #12a69b;
    --amber: #e9a92f;
    width: 100%;
    overflow: hidden;
    color: var(--ink);
    background-color: #f7f9fb;
}

.hero {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 500px;
    padding: 72px clamp(28px, 7vw, 112px);
    overflow: hidden;
    isolation: isolate;
    background-color: #06182b;
    background-image: url("/portal-earth.jpg");
    background-position: center 56%;
    background-size: cover;
}

.hero::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background-color: rgba(3, 22, 41, 0.58);
}

.hero::after {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    border: 1px solid rgba(255, 255, 255, 0.12);
    pointer-events: none;
}

.hero__content {
    width: min(620px, 100%);
    color: #fff;
}

.eyebrow,
.section-kicker {
    margin: 0;
    color: #8bd4ff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    line-height: 1.4;
}

.hero h1 {
    margin: 20px 0 18px;
    color: #fff;
    font-size: 52px;
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 1.16;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
}

.hero h1 span {
    color: #d7f2ff;
    font-weight: 500;
}

.hero__description {
    max-width: 550px;
    margin: 0;
    color: rgba(255, 255, 255, 0.82);
    font-size: 15px;
    line-height: 1.9;
}

.hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
}

.hero__action {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    gap: 9px;
    padding: 0 16px;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.hero__action:hover {
    transform: translateY(-2px);
}

.hero__action--primary {
    color: #12304a;
    background-color: #fff;
}

.hero__action--primary:hover {
    background-color: #dff4ff;
}

.hero__action--ghost {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.48);
    background-color: rgba(255, 255, 255, 0.08);
}

.hero__action--ghost:hover {
    border-color: rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.16);
}

.action-arrow {
    margin-left: 5px;
}

.hero__meta,
.hero__scroll {
    position: absolute;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.68);
    font-size: 11px;
    letter-spacing: 1px;
}

.hero__meta {
    right: clamp(28px, 7vw, 112px);
    bottom: 34px;
    gap: 12px;
}

.hero__meta-label {
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
}

.hero__meta-line {
    display: block;
    width: 42px;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.55);
}

.hero__scroll {
    bottom: 34px;
    left: clamp(28px, 7vw, 112px);
    gap: 8px;
}

.hero__scroll .el-icon {
    animation: scroll-hint 1.8s ease-in-out infinite;
}

.explore-section {
    max-width: 1280px;
    margin: 0 auto;
    padding: 72px clamp(24px, 5vw, 72px) 78px;
}

.section-heading {
    max-width: 600px;
}

.section-kicker {
    color: var(--blue);
}

.section-heading h2,
.metrics-intro h2 {
    margin: 12px 0 10px;
    color: var(--ink);
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.25;
}

.section-heading>p:last-child {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.8;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    margin-top: 34px;
}

.feature-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 254px;
    padding: 24px;
    overflow: hidden;
    border: 1px solid var(--line);
    border-top: 3px solid var(--card-accent);
    color: var(--ink);
    background-color: #fff;
    text-decoration: none;
    transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.feature-card::after {
    content: "";
    position: absolute;
    right: -30px;
    bottom: -32px;
    width: 120px;
    height: 120px;
    border: 1px solid var(--card-accent);
    border-radius: 50%;
    opacity: 0.12;
}

.feature-card:hover {
    border-color: var(--card-accent);
    box-shadow: 0 12px 26px rgba(22, 50, 77, 0.1);
    transform: translateY(-4px);
}

.feature-card--blue {
    --card-accent: var(--blue);
}

.feature-card--teal {
    --card-accent: var(--teal);
}

.feature-card--amber {
    --card-accent: var(--amber);
}

.feature-card--green {
    --card-accent: #46a878;
}

.feature-card__topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.feature-card__index {
    color: #9aabb9;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
}

.feature-card__icon {
    color: var(--card-accent);
    font-size: 24px;
}

.feature-card__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
}

.feature-card h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
}

.feature-card p {
    margin: 10px 0 20px;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.8;
}

.feature-card__link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: auto;
    color: var(--card-accent);
    font-size: 12px;
    font-weight: 700;
}

.metrics-section {
    display: grid;
    grid-template-columns: minmax(230px, 0.9fr) minmax(0, 1.4fr);
    align-items: center;
    gap: 48px;
    padding: 56px max(24px, calc((100% - 1136px) / 2));
    color: #fff;
    background-color: #102f49;
}

.metrics-intro h2 {
    margin-bottom: 0;
    color: #fff;
    font-size: 25px;
}

.metrics-intro .section-kicker {
    color: #8bd4ff;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.metric {
    display: flex;
    min-height: 72px;
    flex-direction: column;
    justify-content: center;
    padding: 0 28px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.metric strong {
    color: #fff;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 1;
}

.metric strong span {
    margin-left: 3px;
    color: #8bd4ff;
    font-size: 16px;
}

.metric>span {
    margin-top: 9px;
    color: rgba(255, 255, 255, 0.64);
    font-size: 12px;
}

@keyframes scroll-hint {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(4px);
    }
}

@media (max-width: 900px) {
    .hero {
        min-height: 540px;
    }

    .hero h1 {
        font-size: 44px;
    }

    .hero__meta {
        display: none;
    }

    .feature-grid {
        grid-template-columns: 1fr;
    }

    .feature-card {
        min-height: 210px;
    }

    .metrics-section {
        grid-template-columns: 1fr;
        gap: 28px;
    }

}

@media (max-width: 1100px) and (min-width: 901px) {
    .feature-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 560px) {
    .hero {
        min-height: 560px;
        padding: 56px 22px 76px;
        background-position: 62% center;
    }

    .hero h1 {
        margin-top: 16px;
        font-size: 35px;
    }

    .hero__description {
        font-size: 14px;
    }

    .hero__actions {
        align-items: stretch;
        flex-direction: column;
    }

    .hero__action {
        justify-content: center;
    }

    .hero__scroll {
        bottom: 24px;
        left: 22px;
    }

    .explore-section {
        padding: 52px 20px 58px;
    }

    .section-heading h2 {
        font-size: 26px;
    }

    .metrics-section {
        padding: 46px 22px 50px;
    }

    .metrics-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .metric {
        min-height: auto;
        padding: 0 0 0 18px;
    }
}
</style>
