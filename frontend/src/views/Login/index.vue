<template>
    <main class="login-page">
        <header class="login-header">
            <RouterLink class="brand" to="/index">
                <span class="brand__mark">G</span>
                <span class="brand__text">
                    <strong>地理空间资源信息平台</strong>
                    <small>Geographical Spatial Resource Information Platform</small>
                </span>
            </RouterLink>

            <RouterLink class="back-link" to="/index">
                <el-icon>
                    <ArrowLeft />
                </el-icon>
                <span>返回首页</span>
            </RouterLink>
        </header>

        <div class="login-layout">
            <section class="intro">
                <p class="intro__kicker">SPATIAL RESOURCE · INFORMATION SERVICE</p>
                <h1>连接地图，<br /><span>看见更大的世界。</span></h1>
                <p class="intro__description">
                    登录平台，继续探索空间信息、天气动态与特色专题，及时了解平台资讯，让每一份空间信息都清晰可见。
                </p>

                <div class="intro__features">
                    <div class="intro__feature">
                        <span class="intro__feature-icon"><el-icon>
                                <MapLocation />
                            </el-icon></span>
                        <span>
                            <strong>空间信息</strong>
                            <small>建立区域认知</small>
                        </span>
                    </div>
                    <div class="intro__feature">
                        <span class="intro__feature-icon"><el-icon>
                                <DataAnalysis />
                            </el-icon></span>
                        <span>
                            <strong>天气信息</strong>
                            <small>感知环境变化</small>
                        </span>
                    </div>
                    <div class="intro__feature">
                        <span class="intro__feature-icon"><el-icon>
                                <Monitor />
                            </el-icon></span>
                        <span>
                            <strong>特色专题</strong>
                            <small>探索更多应用场景</small>
                        </span>
                    </div>
                </div>

                <p class="intro__coordinates">31°14′N&nbsp;&nbsp; 121°29′E&nbsp;&nbsp; / &nbsp;&nbsp;DATA IS EVERYWHERE
                </p>
            </section>

            <section class="login-panel">
                <div class="login-panel__heading">
                    <p class="panel-kicker">WELCOME BACK</p>
                    <h2>欢迎回来</h2>
                    <p>登录后继续使用平台的各项信息服务</p>
                </div>

                <el-form ref="formRef" class="login-form" :model="form" :rules="rules" label-position="top"
                    @submit.prevent="handleSubmit">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="form.username" size="large" placeholder="请输入账号" autocomplete="username"
                            :prefix-icon="User" />
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" size="large" :type="passwordVisible ? 'text' : 'password'"
                            placeholder="请输入密码" autocomplete="current-password" :prefix-icon="Lock">
                            <template #suffix>
                                <button class="password-toggle" type="button"
                                    :aria-label="passwordVisible ? '隐藏密码' : '显示密码'"
                                    @click="passwordVisible = !passwordVisible">
                                    <el-icon>
                                        <View v-if="!passwordVisible" />
                                        <Hide v-else />
                                    </el-icon>
                                </button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <div class="form-options">
                        <el-checkbox v-model="rememberAccount">记住账号</el-checkbox>
                        <button class="text-button" type="button" @click="handleForgotPassword">忘记密码？</button>
                    </div>

                    <el-button class="submit-button" native-type="submit" type="primary" size="large"
                        :loading="submitting">
                        <span>{{ submitting ? '正在登录' : '登录平台' }}</span>
                        <el-icon v-if="!submitting">
                            <ArrowRight />
                        </el-icon>
                    </el-button>

                    <div class="register-prompt">
                        <span>没有账号？</span>
                        <RouterLink class="register-link" :to="getRegisterLocation()">
                            去注册
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </RouterLink>
                    </div>
                </el-form>

                <div class="login-panel__footer">
                    <span class="status-dot"></span>
                    <span>平台服务正常运行</span>
                    <span class="footer-divider"></span>
                    <span>安全登录</span>
                </div>
            </section>
        </div>

        <footer class="login-footer">
            <span>© 2026 地理空间资源信息平台</span>
            <span class="footer-line"></span>
            <span>SPACE · DATA · INSIGHT</span>
        </footer>
    </main>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
    ArrowLeft,
    ArrowRight,
    DataAnalysis,
    Hide,
    Lock,
    MapLocation,
    Monitor,
    User,
    View,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const submitting = ref(false)
const passwordVisible = ref(false)
const rememberAccount = ref(true)
const form = reactive({
    username: '',
    password: '',
})

const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 2, max: 30, message: '账号长度应为 2-30 个字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' },
    ],
}

onMounted(() => {
    const rememberedUsername = localStorage.getItem('geographical-platform-username')
    if (rememberedUsername) {
        form.username = rememberedUsername
    }
})

async function handleSubmit() {
    if (submitting.value) return

    const valid = await formRef.value?.validate().catch(() => false)
    if (!valid) return

    submitting.value = true
    if (rememberAccount.value) {
        localStorage.setItem('geographical-platform-username', form.username)
    } else {
        localStorage.removeItem('geographical-platform-username')
    }

    window.setTimeout(() => {
        submitting.value = false
        ElMessage({
            type: 'success',
            message: '登录成功，正在返回平台',
        })
        router.replace(getReturnLocation())
    }, 500)
}

function handleForgotPassword() {
    ElMessage.info('密码找回功能即将开放')
}

function getRegisterLocation() {
    const rawUrl = Array.isArray(route.query.url) ? route.query.url[0] : route.query.url
    return rawUrl
        ? { name: 'register', query: { url: rawUrl } }
        : { name: 'register' }
}

function getReturnLocation() {
    const rawUrl = Array.isArray(route.query.url) ? route.query.url[0] : route.query.url
    if (typeof rawUrl !== 'string' || !rawUrl) {
        return { name: 'index' }
    }

    try {
        const target = new URL(rawUrl, window.location.origin)
        if (target.origin !== window.location.origin) {
            return { name: 'index' }
        }

        const basePath = import.meta.env.BASE_URL === './'
            ? ''
            : import.meta.env.BASE_URL.replace(/\/$/, '')
        const path = basePath && target.pathname.startsWith(basePath)
            ? target.pathname.slice(basePath.length) || '/'
            : target.pathname

        return `${path}${target.search}${target.hash}`
    } catch {
        return { name: 'index' }
    }
}
</script>

<style lang="scss" scoped>
.login-page {
    --blue: #0b7ae1;
    --deep-blue: #082945;
    --ink: #17324d;
    --muted: #758597;
    position: relative;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    overflow: hidden;
    color: #fff;
    background-color: #09233b;
    background-image: url("/portal-earth.jpg");
    background-position: center;
    background-size: cover;
    isolation: isolate;
}

.login-page::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background-color: rgba(5, 25, 46, 0.74);
}

.login-page::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    width: 44%;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(9, 36, 59, 0.18);
}

.login-header,
.login-footer,
.login-layout {
    width: min(1280px, calc(100% - 80px));
    margin-right: auto;
    margin-left: auto;
}

.login-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 88px;
}

.brand,
.back-link {
    color: #fff;
    text-decoration: none;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
}

.brand__mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border: 1px solid rgba(139, 212, 255, 0.88);
    border-radius: 50%;
    color: #dff6ff;
    font-size: 19px;
    font-weight: 700;
    line-height: 1;
}

.brand__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.brand__text strong {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 1px;
}

.brand__text small {
    color: rgba(255, 255, 255, 0.58);
    font-size: 9px;
    letter-spacing: 0.5px;
}

.back-link {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 13px;
    transition: color 180ms ease;
}

.back-link:hover {
    color: #fff;
}

.login-layout {
    display: grid;
    flex: 1;
    grid-template-columns: minmax(0, 1fr) minmax(380px, 430px);
    align-items: center;
    gap: clamp(60px, 10vw, 160px);
    padding-top: 30px;
    padding-bottom: 56px;
}

.intro {
    align-self: center;
    padding: 36px 0;
}

.intro__kicker,
.panel-kicker {
    margin: 0;
    color: #8bd4ff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    line-height: 1.4;
}

.intro h1 {
    margin: 22px 0 22px;
    color: #fff;
    font-size: clamp(42px, 5vw, 68px);
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 1.14;
    text-shadow: 0 3px 18px rgba(0, 0, 0, 0.32);
}

.intro h1 span {
    color: #d9f3ff;
    font-weight: 500;
}

.intro__description {
    max-width: 500px;
    margin: 0;
    color: rgba(255, 255, 255, 0.76);
    font-size: 15px;
    line-height: 1.9;
}

.intro__features {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-top: 48px;
}

.intro__feature {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.intro__feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border: 1px solid rgba(139, 212, 255, 0.5);
    color: #8bd4ff;
    background-color: rgba(255, 255, 255, 0.06);
}

.intro__feature>span:last-child {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.intro__feature strong {
    color: #fff;
    font-size: 13px;
    font-weight: 600;
}

.intro__feature small {
    color: rgba(255, 255, 255, 0.52);
    font-size: 11px;
}

.intro__coordinates {
    margin: 58px 0 0;
    color: rgba(255, 255, 255, 0.38);
    font-size: 10px;
    letter-spacing: 1.2px;
}

.login-panel {
    width: 100%;
    padding: 42px 40px 30px;
    border: 1px solid rgba(255, 255, 255, 0.38);
    background-color: rgba(255, 255, 255, 0.96);
    box-shadow: 0 22px 55px rgba(2, 18, 35, 0.28);
}

.login-panel__heading h2 {
    margin: 11px 0 8px;
    color: var(--ink);
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.25;
}

.login-panel__heading>p:last-child {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
}

.panel-kicker {
    color: var(--blue);
    font-size: 10px;
    letter-spacing: 1.8px;
}

.login-form {
    margin-top: 30px;
}

.login-form :deep(.el-form-item) {
    margin-bottom: 22px;
}

.login-form :deep(.el-form-item__label) {
    margin-bottom: 8px;
    padding: 0;
    color: #3c536a;
    font-size: 12px;
    line-height: 1;
}

.login-form :deep(.el-input__wrapper) {
    min-height: 44px;
    border: 1px solid #d8e3eb;
    border-radius: 2px;
    box-shadow: none;
    transition: border-color 180ms ease, box-shadow 180ms ease;
}

.login-form :deep(.el-input__wrapper:hover) {
    border-color: #9ac8e9;
}

.login-form :deep(.el-input__wrapper.is-focus) {
    border-color: var(--blue);
    box-shadow: 0 0 0 2px rgba(11, 122, 225, 0.12);
}

.login-form :deep(.el-input__prefix-inner) {
    color: #8da0b2;
}

.login-form :deep(.el-input__inner) {
    color: var(--ink);
    font-size: 13px;
}

.password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 28px;
    padding: 0;
    border: 0;
    color: #8da0b2;
    background-color: transparent;
    cursor: pointer;
}

.password-toggle:hover {
    color: var(--blue);
}

.form-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: -2px 0 24px;
}

.form-options :deep(.el-checkbox__label) {
    color: #65788a;
    font-size: 12px;
}

.text-button {
    padding: 0;
    border: 0;
    color: var(--blue);
    font-size: 12px;
    background-color: transparent;
    cursor: pointer;
}

.text-button:hover {
    color: #075aa8;
    text-decoration: underline;
}

.submit-button {
    width: 100%;
    min-height: 44px;
    border: 0;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
}

.submit-button :deep(.el-button__text) {
    display: inline-flex;
    align-items: center;
    gap: 7px;
}

.register-prompt {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 20px;
    color: #91a0ad;
    font-size: 12px;
}

.register-link {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    color: var(--blue);
    text-decoration: none;
    transition: color 180ms ease;
}

.register-link:hover {
    color: #075aa8;
}

.login-panel__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 26px;
    color: #91a0ad;
    font-size: 11px;
}

.status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #24b47e;
    box-shadow: 0 0 0 3px rgba(36, 180, 126, 0.12);
}

.footer-divider,
.footer-line {
    display: inline-block;
    width: 22px;
    height: 1px;
    background-color: #d8e3eb;
}

.login-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 58px;
    color: rgba(255, 255, 255, 0.48);
    font-size: 10px;
    letter-spacing: 0.8px;
}

@media (max-width: 960px) {

    .login-header,
    .login-footer,
    .login-layout {
        width: min(680px, calc(100% - 48px));
    }

    .login-layout {
        grid-template-columns: 1fr;
        gap: 28px;
        padding-top: 16px;
        padding-bottom: 36px;
    }

    .intro {
        padding: 24px 0 0;
    }

    .intro h1 {
        margin-top: 16px;
        font-size: 44px;
    }

    .intro__features,
    .intro__coordinates {
        display: none;
    }

    .login-panel {
        max-width: 430px;
        margin: 0 auto;
    }

    .login-page::after {
        display: none;
    }
}

@media (max-width: 560px) {

    .login-header,
    .login-footer,
    .login-layout {
        width: calc(100% - 32px);
    }

    .login-header {
        min-height: 76px;
    }

    .brand__text strong {
        font-size: 13px;
    }

    .brand__text small {
        max-width: 210px;
        overflow: hidden;
        font-size: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .back-link span {
        display: none;
    }

    .intro {
        padding-top: 18px;
    }

    .intro__kicker {
        font-size: 9px;
        letter-spacing: 1.2px;
    }

    .intro h1 {
        margin: 13px 0 15px;
        font-size: 34px;
    }

    .intro__description {
        font-size: 13px;
        line-height: 1.75;
    }

    .login-panel {
        padding: 30px 22px 24px;
    }

    .login-panel__heading h2 {
        font-size: 26px;
    }

    .login-form {
        margin-top: 24px;
    }

    .login-footer {
        min-height: 48px;
        font-size: 9px;
    }

    .login-footer .footer-line {
        width: 12px;
    }
}
</style>
