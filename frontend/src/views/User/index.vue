<template>
  <main class="user-page">
    <div class="user-page__wash user-page__wash--one"></div>
    <div class="user-page__wash user-page__wash--two"></div>

    <header class="user-header page-shell">
      <RouterLink class="brand" to="/index">
        <span class="brand__mark">G</span>
        <span class="brand__copy">
          <strong>地理空间资源信息平台</strong>
          <small>GEOGRAPHICAL SPATIAL RESOURCE INFORMATION PLATFORM</small>
        </span>
      </RouterLink>

      <div class="user-header__actions">
        <span class="header-badge">
          <span class="header-badge__dot"></span>
          账户中心
        </span>
        <RouterLink class="back-link" to="/index">
          <el-icon><ArrowLeft /></el-icon>
          <span>返回平台</span>
        </RouterLink>
      </div>
    </header>

    <section class="page-shell user-content">
      <!-- <div class="page-heading">
        <div>
          <p class="eyebrow">MY SPACE · PERSONAL DASHBOARD</p>
          <h1>用户中心</h1>
          <p class="page-heading__description">
            管理你的平台资料，查看账号状态，继续探索空间信息。
          </p>
        </div>
        <div class="heading-coordinate">
          <span>USER / {{ userId }}</span>
          <span class="heading-coordinate__line"></span>
          <span>DATA IS EVERYWHERE</span>
        </div>
      </div> -->

      <div v-if="loading" class="loading-card">
        <div class="loading-card__spinner"></div>
        <span>正在加载账号信息…</span>
      </div>

      <div v-else-if="!userStore.user" class="empty-card">
        <div class="empty-card__icon">
          <el-icon><Avatar /></el-icon>
        </div>
        <h2>登录后查看你的用户中心</h2>
        <p>登录平台即可管理个人资料与安全设置。</p>
        <RouterLink class="primary-action" to="/login">
          去登录
          <el-icon><ArrowRight /></el-icon>
        </RouterLink>
      </div>

      <template v-else>
        <section class="profile-banner">
          <div class="profile-banner__grid"></div>
          <div class="profile-identity">
            <div class="avatar-frame">
              <el-avatar class="profile-avatar" :src="avatarUrl">
                {{ initials }}
              </el-avatar>
              <button
                class="avatar-edit"
                type="button"
                aria-label="更换头像"
                @click="notifyComingSoon('头像上传')"
              >
                <el-icon><Camera /></el-icon>
              </button>
            </div>
            <div class="profile-copy">
              <p class="profile-copy__kicker">PERSONAL ACCOUNT</p>
              <h2>{{ displayName }}</h2>
              <p class="profile-copy__username">
                @{{ userStore.user.username }}
              </p>
              <div class="profile-tags">
                <span class="profile-tag profile-tag--active">
                  <el-icon><Check /></el-icon>
                  账号正常
                </span>
                <span class="profile-tag">ID {{ userStore.user.id }}</span>
              </div>
            </div>
          </div>
          <div class="profile-banner__aside">
            <span class="profile-banner__aside-label">加入平台</span>
            <strong>{{ formatDate(userStore.user.created_at) }}</strong>
            <span class="profile-banner__aside-caption">开始探索空间数据</span>
          </div>
        </section>

        <div class="dashboard-layout">
          <aside class="dashboard-sidebar">
            <nav class="dashboard-nav" aria-label="用户中心导航">
              <button
                v-for="item in navItems"
                :key="item.key"
                class="dashboard-nav__item"
                :class="{ 'is-active': activePanel === item.key }"
                type="button"
                @click="activePanel = item.key"
              >
                <span class="dashboard-nav__icon">
                  <el-icon><component :is="item.icon" /></el-icon>
                </span>
                <span class="dashboard-nav__copy">
                  <strong>{{ item.label }}</strong>
                  <small>{{ item.description }}</small>
                </span>
                <el-icon class="dashboard-nav__arrow"><ArrowRight /></el-icon>
              </button>
            </nav>

            <div class="sidebar-note">
              <div class="sidebar-note__icon">
                <el-icon><MapLocation /></el-icon>
              </div>
              <div>
                <strong>探索平台</strong>
                <p>把分散的信息放回地理空间中。</p>
              </div>
              <RouterLink to="/geology" aria-label="浏览空间信息">
                <el-icon><ArrowRight /></el-icon>
              </RouterLink>
            </div>
          </aside>

          <div class="dashboard-main">
            <section v-if="activePanel === 'profile'" class="content-card">
              <div class="content-card__heading">
                <div>
                  <p class="card-kicker">ACCOUNT PROFILE</p>
                  <h2>个人资料</h2>
                </div>
                <button
                  class="text-action"
                  type="button"
                  @click="notifyComingSoon('资料编辑')"
                >
                  <el-icon><EditPen /></el-icon>
                  编辑资料
                </button>
              </div>

              <div class="profile-fields">
                <div class="profile-field">
                  <span class="profile-field__label">昵称</span>
                  <span class="profile-field__value">{{ displayName }}</span>
                  <span class="profile-field__hint">展示给平台的称呼</span>
                </div>
                <div class="profile-field">
                  <span class="profile-field__label">用户名</span>
                  <span
                    class="profile-field__value profile-field__value--mono"
                    >{{ userStore.user.username }}</span
                  >
                  <button
                    class="copy-action"
                    type="button"
                    aria-label="复制用户名"
                    @click="copyUsername"
                  >
                    <el-icon><CopyDocument /></el-icon>
                  </button>
                  <span class="profile-field__hint">登录平台使用的账号</span>
                </div>
                <div class="profile-field">
                  <span class="profile-field__label">注册时间</span>
                  <span class="profile-field__value">{{
                    formatDate(userStore.user.created_at)
                  }}</span>
                  <span class="profile-field__hint"
                    >你的平台旅程从这里开始</span
                  >
                </div>
                <div class="profile-field">
                  <span class="profile-field__label">最近登录</span>
                  <span class="profile-field__value">{{
                    formatDateTime(userStore.user.last_login_at)
                  }}</span>
                  <span class="profile-field__hint"
                    >最近一次访问平台的时间</span
                  >
                </div>
              </div>
            </section>

            <section
              v-else-if="activePanel === 'security'"
              class="content-card"
            >
              <div class="content-card__heading">
                <div>
                  <p class="card-kicker">ACCOUNT SECURITY</p>
                  <h2>安全设置</h2>
                </div>
                <span class="heading-status"><span></span>基础安全良好</span>
              </div>

              <div class="security-list">
                <div class="security-row">
                  <div class="security-row__icon security-row__icon--blue">
                    <el-icon><Lock /></el-icon>
                  </div>
                  <div class="security-row__copy">
                    <strong>登录密码</strong>
                    <span>定期更新密码，保护账号安全</span>
                  </div>
                  <button
                    class="outline-action"
                    type="button"
                    @click="notifyComingSoon('密码修改')"
                  >
                    修改密码
                  </button>
                </div>
                <div class="security-row">
                  <div class="security-row__icon security-row__icon--green">
                    <el-icon><Check /></el-icon>
                  </div>
                  <div class="security-row__copy">
                    <strong>登录状态</strong>
                    <span>当前设备已通过安全验证</span>
                  </div>
                  <span class="security-row__status">已保护</span>
                </div>
                <div class="security-row">
                  <div class="security-row__icon security-row__icon--amber">
                    <el-icon><Monitor /></el-icon>
                  </div>
                  <div class="security-row__copy">
                    <strong>设备管理</strong>
                    <span>查看账号最近使用的设备</span>
                  </div>
                  <button
                    class="outline-action"
                    type="button"
                    @click="notifyComingSoon('设备管理')"
                  >
                    查看设备
                  </button>
                </div>
              </div>
            </section>

            <section
              v-else-if="activePanel === 'activity'"
              class="content-card"
            >
              <div class="content-card__heading">
                <div>
                  <p class="card-kicker">RECENT ACTIVITY</p>
                  <h2>最近动态</h2>
                </div>
                <span class="heading-status heading-status--muted"
                  >仅展示本设备记录</span
                >
              </div>

              <div class="activity-list">
                <div class="activity-item">
                  <span class="activity-item__mark activity-item__mark--blue"
                    ><el-icon><DataAnalysis /></el-icon
                  ></span>
                  <div>
                    <strong>登录平台</strong>
                    <p>欢迎回来，继续探索空间信息。</p>
                  </div>
                  <time>{{
                    formatDateTime(userStore.user.last_login_at)
                  }}</time>
                </div>
                <div class="activity-item">
                  <span class="activity-item__mark activity-item__mark--teal"
                    ><el-icon><MapLocation /></el-icon
                  ></span>
                  <div>
                    <strong>账号创建</strong>
                    <p>完成注册，开启你的空间数据之旅。</p>
                  </div>
                  <time>{{ formatDate(userStore.user.created_at) }}</time>
                </div>
              </div>
            </section>

            <section v-else class="content-card">
              <div class="content-card__heading">
                <div>
                  <p class="card-kicker">PLATFORM PREFERENCES</p>
                  <h2>偏好设置</h2>
                </div>
              </div>
              <div class="preference-list">
                <div class="preference-row">
                  <div>
                    <strong>平台通知</strong>
                    <span>接收平台服务与资讯更新</span>
                  </div>
                  <el-switch v-model="preferences.notification" />
                </div>
                <div class="preference-row">
                  <div>
                    <strong>紧凑模式</strong>
                    <span>在列表中展示更多信息</span>
                  </div>
                  <el-switch v-model="preferences.compact" />
                </div>
                <div class="preference-row">
                  <div>
                    <strong>隐私保护</strong>
                    <span>仅在必要时展示个人公开信息</span>
                  </div>
                  <el-switch v-model="preferences.privacy" />
                </div>
              </div>
            </section>

            <section class="quick-section">
              <div class="quick-section__heading">
                <div>
                  <p class="card-kicker">QUICK ACCESS</p>
                  <h2>继续探索</h2>
                </div>
                <span>选择一个入口开始</span>
              </div>
              <div class="quick-grid">
                <RouterLink class="quick-card quick-card--blue" to="/geology">
                  <span class="quick-card__icon"
                    ><el-icon><MapLocation /></el-icon
                  ></span>
                  <span
                    ><strong>空间信息</strong
                    ><small>在地图中浏览区域</small></span
                  >
                  <el-icon><ArrowRight /></el-icon>
                </RouterLink>
                <RouterLink class="quick-card quick-card--teal" to="/weather">
                  <span class="quick-card__icon"
                    ><el-icon><Sunny /></el-icon
                  ></span>
                  <span
                    ><strong>天气信息</strong><small>感知环境变化</small></span
                  >
                  <el-icon><ArrowRight /></el-icon>
                </RouterLink>
                <RouterLink class="quick-card quick-card--amber" to="/theme">
                  <span class="quick-card__icon"
                    ><el-icon><TrendCharts /></el-icon
                  ></span>
                  <span
                    ><strong>特色专题</strong
                    ><small>探索更多应用场景</small></span
                  >
                  <el-icon><ArrowRight /></el-icon>
                </RouterLink>
              </div>
            </section>
          </div>
        </div>
      </template>
    </section>

    <footer class="user-footer page-shell">
      <span>© 2026 地理空间资源信息平台</span>
      <span class="user-footer__line"></span>
      <span>SPACE · DATA · INSIGHT</span>
    </footer>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { getPublicUrl } from "@/utils/common";
import { ElMessage } from "element-plus";
import {
  ArrowLeft,
  ArrowRight,
  Avatar,
  Camera,
  Check,
  Clock,
  CopyDocument,
  DataAnalysis,
  EditPen,
  Lock,
  MapLocation,
  Monitor,
  Setting,
  Sunny,
  TrendCharts,
} from "@element-plus/icons-vue";

const userStore = useUserStore();
const loading = ref(true);
const activePanel = ref("profile");
const preferences = reactive({
  notification: true,
  compact: false,
  privacy: true,
});

const navItems = [
  {
    key: "profile",
    label: "个人资料",
    description: "查看账号基本信息",
    icon: Avatar,
  },
  {
    key: "security",
    label: "安全设置",
    description: "保护你的账号安全",
    icon: Lock,
  },
  {
    key: "activity",
    label: "最近动态",
    description: "回顾平台访问记录",
    icon: Clock,
  },
  {
    key: "preferences",
    label: "偏好设置",
    description: "定制你的使用体验",
    icon: Setting,
  },
];

const avatarUrl = computed(() => {
  return userStore.user?.avatar || getPublicUrl("/images/defaultAvatar.jpg");
});

const displayName = computed(() => {
  return userStore.user?.nick_name || userStore.user?.username || "空间探索者";
});

const initials = computed(() => {
  return displayName.value.trim().slice(0, 1).toUpperCase();
});

const userId = computed(() => userStore.user?.id || "—");

onMounted(async () => {
  try {
    if (!userStore.user) {
      await userStore.getUser();
    }
  } catch {
    // 未登录时显示登录引导，不阻塞页面渲染。
  } finally {
    loading.value = false;
  }
});

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date
    .toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");
}

function formatDateTime(value) {
  if (!value) return "暂未记录";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return (
    formatDate(value) +
    " " +
    date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

async function copyUsername() {
  const username = userStore.user?.username;
  if (!username) return;
  try {
    await navigator.clipboard.writeText(username);
    ElMessage.success("用户名已复制");
  } catch {
    ElMessage.info("用户名：" + username);
  }
}

function notifyComingSoon(label) {
  ElMessage.info(label + "功能即将开放");
}
</script>

<style lang="scss" scoped>
.user-page {
  --blue: #0b7ae1;
  --deep-blue: #092b49;
  --ink: #17324d;
  --muted: #718396;
  --line: #dce7ef;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: var(--ink);
  background: #f4f8fb;
  isolation: isolate;
}

.user-page::before {
  position: absolute;
  z-index: -2;
  inset: 0;
  content: "";
  background:
    linear-gradient(
      180deg,
      rgba(238, 247, 253, 0.78) 0,
      rgba(247, 250, 252, 0.96) 330px
    ),
    radial-gradient(circle at 88% 0, rgba(139, 212, 255, 0.32), transparent 32%);
}

.user-page__wash {
  position: absolute;
  z-index: -1;
  border: 1px solid rgba(11, 122, 225, 0.1);
  border-radius: 50%;
  pointer-events: none;
}

.user-page__wash--one {
  top: -215px;
  right: -120px;
  width: 530px;
  height: 530px;
}

.user-page__wash--two {
  top: -165px;
  right: -70px;
  width: 440px;
  height: 440px;
  border-color: rgba(18, 166, 155, 0.09);
}

.page-shell {
  width: min(1580px, calc(100% - 56px));
  margin-right: auto;
  margin-left: auto;
}

.user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  border-bottom: 1px solid rgba(125, 162, 187, 0.2);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: var(--ink);
  text-decoration: none;
}

.brand__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--blue);
  border-radius: 50%;
  color: var(--blue);
  font-size: 18px;
  font-weight: 700;
}

.brand__copy {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.brand__copy strong {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
}

.brand__copy small {
  color: #8a9bab;
  font-size: 8px;
  letter-spacing: 0.8px;
}

.user-header__actions {
  display: flex;
  align-items: center;
  gap: 26px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #6e8192;
  font-size: 11px;
}

.header-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #27b982;
  box-shadow: 0 0 0 3px rgba(39, 185, 130, 0.13);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #557087;
  font-size: 12px;
  text-decoration: none;
  transition: color 180ms ease;
}

.back-link:hover {
  color: var(--blue);
}

.user-content {
  padding-top: 15px;
  padding-bottom: 15px;
}

.page-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 30px;
}

.eyebrow,
.card-kicker {
  margin: 0;
  color: var(--blue);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.8px;
}

.page-heading h1 {
  margin: 11px 0 8px;
  color: var(--deep-blue);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.2;
}

.page-heading__description {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.heading-coordinate {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 4px;
  color: #96a7b5;
  font-size: 9px;
  letter-spacing: 1px;
}

.heading-coordinate__line {
  display: inline-block;
  width: 36px;
  height: 1px;
  background: #adc6d7;
}

.loading-card,
.empty-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  flex-direction: column;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.8);
}

.loading-card {
  gap: 12px;
  color: var(--muted);
  font-size: 13px;
}

.loading-card__spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #dceaf3;
  border-top-color: var(--blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.empty-card {
  padding: 40px 20px;
}

.empty-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: var(--blue);
  font-size: 25px;
  background: #e8f4fd;
}

.empty-card h2 {
  margin: 18px 0 7px;
  color: var(--ink);
  font-size: 20px;
}

.empty-card p {
  margin: 0 0 22px;
  color: var(--muted);
  font-size: 13px;
}

.primary-action,
.outline-action,
.text-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  font: inherit;
  text-decoration: none;
}

.primary-action {
  min-height: 38px;
  padding: 0 18px;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  background: var(--blue);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.primary-action:hover {
  background: #0868bf;
  transform: translateY(-1px);
}

.profile-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 178px;
  padding: 34px 40px;
  overflow: hidden;
  color: #fff;
  background:
    linear-gradient(120deg, rgba(5, 37, 65, 0.97), rgba(11, 90, 145, 0.96)),
    url("/images/portal-earth.jpg") center / cover;
  box-shadow: 0 15px 36px rgba(17, 62, 93, 0.12);
}

.profile-banner::before {
  position: absolute;
  top: -130px;
  right: 18%;
  width: 300px;
  height: 300px;
  border: 1px solid rgba(139, 212, 255, 0.2);
  border-radius: 50%;
  content: "";
}

.profile-banner__grid {
  position: absolute;
  inset: 0;
  opacity: 0.16;
  background-image:
    linear-gradient(rgba(139, 212, 255, 0.28) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 212, 255, 0.28) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 30%,
    #000 76%,
    transparent
  );
}

.profile-identity,
.profile-banner__aside {
  position: relative;
  z-index: 1;
}

.profile-identity {
  display: flex;
  align-items: center;
  gap: 22px;
}

.avatar-frame {
  position: relative;
}

.profile-avatar {
  --el-avatar-size: 92px;
  border: 3px solid rgba(255, 255, 255, 0.82);
  color: #0b5d95;
  font-size: 29px;
  font-weight: 700;
  background: #dff3ff;
  box-shadow: 0 7px 20px rgba(0, 0, 0, 0.18);
}

.avatar-edit {
  position: absolute;
  right: -4px;
  bottom: -3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 2px solid #0a4772;
  border-radius: 50%;
  color: #fff;
  background: var(--blue);
  cursor: pointer;
}

.avatar-edit:hover {
  background: #0b92ed;
}

.profile-copy__kicker {
  margin: 0 0 6px;
  color: #8bd4ff;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.8px;
}

.profile-copy h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
}

.profile-copy__username {
  margin: 7px 0 13px;
  color: rgba(255, 255, 255, 0.63);
  font-size: 12px;
}

.profile-tags {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 23px;
  padding: 0 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.68);
  font-size: 10px;
  letter-spacing: 0.3px;
}

.profile-tag--active {
  border-color: rgba(126, 229, 193, 0.35);
  color: #a5f2d5;
  background: rgba(52, 193, 139, 0.12);
}

.profile-banner__aside {
  display: flex;
  min-width: 150px;
  flex-direction: column;
  padding-left: 28px;
  border-left: 1px solid rgba(255, 255, 255, 0.18);
}

.profile-banner__aside-label,
.profile-banner__aside-caption {
  color: rgba(255, 255, 255, 0.55);
  font-size: 10px;
}

.profile-banner__aside strong {
  margin: 7px 0 5px;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 264px minmax(0, 1fr);
  align-items: start;
  gap: 18px;
  margin-top: 18px;
}

.dashboard-sidebar {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dashboard-nav,
.content-card,
.sidebar-note,
.quick-section {
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.9);
}

.dashboard-nav {
  padding: 7px;
}

.dashboard-nav__item {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 66px;
  padding: 0 10px;
  border: 0;
  color: #62778a;
  text-align: left;
  background: transparent;
  cursor: pointer;
  transition:
    color 180ms ease,
    background 180ms ease;
}

.dashboard-nav__item:hover {
  color: var(--blue);
  background: #f2f8fc;
}

.dashboard-nav__item.is-active {
  color: var(--blue);
  background: #eaf5fc;
}

.dashboard-nav__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-right: 11px;
  color: #7b93a5;
  font-size: 17px;
  background: #f0f5f8;
}

.dashboard-nav__item.is-active .dashboard-nav__icon {
  color: var(--blue);
  background: #d8edfb;
}

.dashboard-nav__copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
}

.dashboard-nav__copy strong {
  color: inherit;
  font-size: 13px;
  font-weight: 600;
}

.dashboard-nav__copy small {
  overflow: hidden;
  color: #9aaab7;
  font-size: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dashboard-nav__arrow {
  margin-left: auto;
  color: #b2c0ca;
  font-size: 13px;
}

.dashboard-nav__item.is-active .dashboard-nav__arrow {
  color: var(--blue);
}

.sidebar-note {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 18px 15px;
  color: #4b6579;
  background: #eef8fd;
}

.sidebar-note__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 29px;
  flex: 0 0 29px;
  color: var(--blue);
  background: #d8effc;
}

.sidebar-note strong {
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
}

.sidebar-note p {
  max-width: 145px;
  margin: 0;
  color: #7890a1;
  font-size: 10px;
  line-height: 1.55;
}

.sidebar-note > a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  margin-left: auto;
  color: var(--blue);
  text-decoration: none;
}

.dashboard-main {
  min-width: 0;
}

.content-card {
  min-height: 320px;
  padding: 27px 30px;
}

.content-card__heading,
.quick-section__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.card-kicker {
  color: var(--blue);
  font-size: 9px;
  letter-spacing: 1.5px;
}

.content-card h2,
.quick-section h2 {
  margin: 8px 0 0;
  color: var(--ink);
  font-size: 21px;
  font-weight: 700;
}

.text-action {
  padding: 6px 0;
  border: 0;
  color: var(--blue);
  font-size: 11px;
  background: transparent;
}

.text-action:hover {
  color: #075aa8;
}

.profile-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 26px;
  margin-top: 26px;
}

.profile-field {
  position: relative;
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  align-items: center;
  min-height: 78px;
  border-bottom: 1px solid #edf2f5;
}

.profile-field__label {
  color: #8b9aa7;
  font-size: 11px;
}

.profile-field__value {
  min-width: 0;
  overflow: hidden;
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-field__value--mono {
  color: #346682;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  padding-right: 28px;
}

.profile-field__hint {
  grid-column: 2;
  margin-top: -22px;
  color: #a8b4bd;
  font-size: 10px;
}

.copy-action {
  position: absolute;
  top: calc(50% - 11px);
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-left: auto;
  padding: 0;
  border: 0;
  color: #8ea8b9;
  background: transparent;
  cursor: pointer;
}

.copy-action:hover {
  color: var(--blue);
}

.heading-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding-top: 5px;
  color: #2c9d72;
  font-size: 10px;
}

.heading-status span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #35bc88;
}

.heading-status--muted {
  color: #9aaab7;
}

.heading-status--muted span {
  display: none;
}

.security-list,
.activity-list,
.preference-list {
  margin-top: 24px;
}

.security-row {
  display: flex;
  align-items: center;
  min-height: 78px;
  gap: 13px;
  border-bottom: 1px solid #edf2f5;
}

.security-row:last-child,
.activity-item:last-child,
.preference-row:last-child {
  border-bottom: 0;
}

.security-row__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  font-size: 16px;
}

.security-row__icon--blue {
  color: var(--blue);
  background: #e6f3fc;
}

.security-row__icon--green {
  color: #21a778;
  background: #e5f8f0;
}

.security-row__icon--amber {
  color: #d68e1b;
  background: #fff4de;
}

.security-row__copy,
.preference-row > div {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 5px;
}

.security-row__copy strong,
.preference-row strong {
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
}

.security-row__copy span,
.preference-row span {
  color: #9aa8b4;
  font-size: 10px;
}

.outline-action {
  min-height: 28px;
  margin-left: auto;
  padding: 0 10px;
  border: 1px solid #c9dce8;
  border-radius: 2px;
  color: #4f7991;
  font-size: 10px;
  background: #fff;
}

.outline-action:hover {
  border-color: var(--blue);
  color: var(--blue);
}

.security-row__status {
  margin-left: auto;
  color: #2b9d73 !important;
  font-size: 10px !important;
}

.activity-item {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) auto;
  align-items: center;
  min-height: 82px;
  gap: 13px;
  border-bottom: 1px solid #edf2f5;
}

.activity-item__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
}

.activity-item__mark--blue {
  color: var(--blue);
  background: #e7f3fc;
}

.activity-item__mark--teal {
  color: #159a90;
  background: #e4f7f5;
}

.activity-item strong {
  display: block;
  color: var(--ink);
  font-size: 12px;
  font-weight: 600;
}

.activity-item p {
  margin: 5px 0 0;
  color: #9aa8b4;
  font-size: 10px;
}

.activity-item time {
  color: #a0adb7;
  font-size: 10px;
  white-space: nowrap;
}

.preference-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  border-bottom: 1px solid #edf2f5;
}

.quick-section {
  margin-top: 18px;
  padding: 25px 30px 27px;
}

.quick-section__heading {
  align-items: flex-end;
}

.quick-section__heading > span {
  color: #9aa9b5;
  font-size: 10px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.quick-card {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) 15px;
  align-items: center;
  gap: 10px;
  min-height: 70px;
  padding: 0 13px;
  border: 1px solid #e2ebf0;
  color: var(--ink);
  text-decoration: none;
  transition:
    border-color 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;
}

.quick-card:hover {
  border-color: var(--quick-color);
  box-shadow: 0 7px 16px rgba(29, 76, 104, 0.08);
  transform: translateY(-2px);
}

.quick-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--quick-color);
  font-size: 16px;
  background: var(--quick-bg);
}

.quick-card > span:nth-child(2) {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 5px;
}

.quick-card strong {
  color: var(--ink);
  font-size: 11px;
  font-weight: 600;
}

.quick-card small {
  overflow: hidden;
  color: #9baab5;
  font-size: 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quick-card > .el-icon {
  color: #adc0cc;
  font-size: 13px;
}

.quick-card--blue {
  --quick-color: #0b7ae1;
  --quick-bg: #e6f3fc;
}

.quick-card--teal {
  --quick-color: #159a90;
  --quick-bg: #e3f7f4;
}

.quick-card--amber {
  --quick-color: #d9941f;
  --quick-bg: #fff3dd;
}

.user-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 62px;
  border-top: 1px solid rgba(125, 162, 187, 0.2);
  color: #94a4b1;
  font-size: 10px;
  letter-spacing: 0.7px;
}

.user-footer__line {
  width: 26px;
  height: 1px;
  background: #b9cbd7;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .page-shell {
    width: min(680px, calc(100% - 40px));
  }

  .page-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }

  .heading-coordinate {
    padding-bottom: 0;
  }

  .dashboard-layout {
    grid-template-columns: 1fr;
  }

  .dashboard-nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sidebar-note {
    display: none;
  }
}

@media (max-width: 620px) {
  .page-shell {
    width: calc(100% - 28px);
  }

  .user-header {
    min-height: 70px;
  }

  .brand__copy small,
  .header-badge {
    display: none;
  }

  .user-header__actions {
    gap: 0;
  }

  .user-content {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .page-heading h1 {
    font-size: 28px;
  }

  .profile-banner {
    align-items: flex-start;
    flex-direction: column;
    gap: 25px;
    padding: 28px 22px;
  }

  .profile-banner__aside {
    width: 100%;
    padding-top: 17px;
    padding-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    border-left: 0;
  }

  .profile-avatar {
    --el-avatar-size: 76px;
  }

  .profile-copy h2 {
    font-size: 23px;
  }

  .dashboard-nav {
    grid-template-columns: 1fr;
  }

  .content-card,
  .quick-section {
    padding-right: 18px;
    padding-left: 18px;
  }

  .profile-fields {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .profile-field {
    grid-template-columns: 70px minmax(0, 1fr);
  }

  .quick-grid {
    grid-template-columns: 1fr;
  }

  .activity-item {
    grid-template-columns: 32px minmax(0, 1fr);
  }

  .activity-item time {
    grid-column: 2;
    margin-top: -8px;
  }

  .user-footer {
    min-height: 54px;
    font-size: 9px;
  }
}
</style>
