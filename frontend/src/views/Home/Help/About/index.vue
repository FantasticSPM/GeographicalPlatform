<template>
  <main class="about-container">
    <section class="about-card intro-card">
      <header class="page-title">
        <h1>关于 {{ title }}</h1>
        <p>地理空间信息服务平台</p>
      </header>

      <div class="intro-content">
        <img :src="getPublicUrl('/favicon.png')" :alt="`${title} logo`" />
        <div>
          <h2>{{ title }}</h2>
          <p>
            {{ title }} 是一个基于 Vue 3 和 Element Plus 的 Web
            应用程序，致力于提供简洁、易用的地理空间信息服务。
          </p>
          <p>这是一个开源项目，你可以自由地使用和修改。</p>
        </div>
      </div>
    </section>

    <section class="about-card info-card">
      <h2>其他信息</h2>
      <div class="info-row">
        <span class="info-label">项目性质</span>
        <span>开源项目</span>
      </div>
      <div class="info-row">
        <span class="info-label">技术栈</span>
        <span>Vue 3 · Element Plus</span>
      </div>
      <div class="info-row">
        <span class="info-label">联系我们</span>
        <span>欢迎提出问题与建议</span>
      </div>
    </section>
  </main>
</template>

<script setup>
import { getPublicUrl } from "@/utils/common";

const title = import.meta.env.VITE_TITLE || "地理空间资源信息平台";
</script>

<style lang="scss" scoped>
.about-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
  padding: 10px;
  color: #303133;
  background-color: #f5f7fa;
}

.about-card {
  width: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  background-color: #fff;
}

.intro-card {
  padding: 26px 28px;
}

.page-title {
  padding-bottom: 18px;
  border-bottom: 1px solid #ebeef5;

  h1 {
    margin: 0;
    color: #303133;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.4;
  }

  p {
    margin-top: 6px;
    color: #909399;
    font-size: 13px;
  }
}

.intro-content {
  display: flex;
  align-items: center;
  gap: 22px;
  padding-top: 24px;

  img {
    flex: 0 0 auto;
    width: 76px;
    height: 76px;
    padding: 7px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    object-fit: contain;
  }

  h2 {
    margin-bottom: 8px;
    color: #303133;
    font-size: 17px;
    font-weight: 500;
  }

  p {
    color: #606266;
    font-size: 14px;
    line-height: 1.8;
  }
}

.info-card {
  padding: 24px 28px;

  h2 {
    margin-bottom: 4px;
    color: #303133;
    font-size: 17px;
    font-weight: 500;
  }
}

.info-row {
  display: flex;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid #f0f2f5;
  color: #606266;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
}

.info-label {
  flex: 0 0 80px;
  color: #909399;
}

@media (max-width: 640px) {
  .about-container {
    gap: 12px;
    padding: 16px 12px 24px;
  }

  .intro-card,
  .info-card {
    padding: 20px;
  }

  .intro-content {
    align-items: flex-start;
    gap: 16px;

    img {
      width: 60px;
      height: 60px;
    }

    p {
      font-size: 13px;
      line-height: 1.7;
    }
  }
}
</style>
