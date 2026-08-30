<template>
    <main class="register-page">
        <header class="register-header">
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

        <div class="register-layout">
            <section class="intro">
                <p class="intro__kicker">BUILD YOUR SPATIAL VIEW</p>
                <h1>创建账号，<br /><span>探索无界空间。</span></h1>
                <p class="intro__description">
                    注册平台，收藏感兴趣的地质、天气与专题内容，让重要的空间信息始终触手可及。
                </p>

                <div class="intro__features">
                    <div class="intro__feature">
                        <span class="intro__feature-icon">
                            <el-icon>
                                <MapLocation />
                            </el-icon>
                        </span>
                        <span>
                            <strong>发现空间</strong>
                            <small>从地图开始探索</small>
                        </span>
                    </div>
                    <div class="intro__feature">
                        <span class="intro__feature-icon">
                            <el-icon>
                                <DataAnalysis />
                            </el-icon>
                        </span>
                        <span>
                            <strong>沉淀数据</strong>
                            <small>保存你的关注内容</small>
                        </span>
                    </div>
                    <div class="intro__feature">
                        <span class="intro__feature-icon">
                            <el-icon>
                                <Monitor />
                            </el-icon>
                        </span>
                        <span>
                            <strong>随时访问</strong>
                            <small>多设备无缝衔接</small>
                        </span>
                    </div>
                </div>

                <p class="intro__coordinates">31°14′N&nbsp;&nbsp; 121°29′E&nbsp;&nbsp; / &nbsp;&nbsp;DISCOVER MORE</p>
            </section>

            <section class="register-panel">
                <div class="register-panel__heading">
                    <p class="panel-kicker">START YOUR JOURNEY</p>
                    <h2>创建新账号</h2>
                    <p>加入平台，开启你的空间信息之旅</p>
                </div>

                <el-form ref="formRef" class="register-form" :model="form" :rules="rules" label-position="top"
                    @submit.prevent="handleSubmit">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="form.username" size="large" placeholder="请输入账号" autocomplete="username"
                            :prefix-icon="User" />
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email" size="large" type="email" placeholder="请输入常用邮箱"
                            autocomplete="email" :prefix-icon="Message" />
                    </el-form-item>


                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" size="large" :type="passwordVisible ? 'text' : 'password'"
                            placeholder="至少 6 位密码" autocomplete="new-password" :prefix-icon="Lock">
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

                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input v-model="form.confirmPassword" size="large"
                            :type="confirmPasswordVisible ? 'text' : 'password'" placeholder="请再次输入密码"
                            autocomplete="new-password" :prefix-icon="Lock">
                            <template #suffix>
                                <button class="password-toggle" type="button"
                                    :aria-label="confirmPasswordVisible ? '隐藏密码' : '显示密码'"
                                    @click="confirmPasswordVisible = !confirmPasswordVisible">
                                    <el-icon>
                                        <View v-if="!confirmPasswordVisible" />
                                        <Hide v-else />
                                    </el-icon>
                                </button>
                            </template>
                        </el-input>
                    </el-form-item>


                    <el-form-item class="agreement-item" prop="agreement">
                        <el-checkbox v-model="form.agreement">
                            <span>我已阅读并同意</span>
                            <a href="">《平台服务协议与隐私政策》</a>
                        </el-checkbox>
                    </el-form-item>

                    <el-button class="submit-button" native-type="submit" type="primary" size="large"
                        :loading="submitting">
                        <span>{{ submitting ? '正在创建' : '创建账号' }}</span>
                        <el-icon v-if="!submitting">
                            <ArrowRight />
                        </el-icon>
                    </el-button>

                    <div class="login-prompt">
                        <span>已有账号？</span>
                        <RouterLink class="login-link" :to="loginLocation">立即登录</RouterLink>
                    </div>
                </el-form>

                <div class="register-panel__footer">
                    <span class="status-dot"></span>
                    <span>注册信息仅用于平台服务</span>
                    <span class="footer-divider"></span>
                    <span>安全可信</span>
                </div>
            </section>
        </div>

        <footer class="register-footer">
            <span>© 2026 地理空间资源信息平台</span>
            <span class="footer-line"></span>
            <span>SPACE · DATA · INSIGHT</span>
        </footer>
    </main>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
    ArrowLeft,
    ArrowRight,
    DataAnalysis,
    Hide,
    Lock,
    MapLocation,
    Message,
    Monitor,
    User,
    View,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const submitting = ref(false)
const passwordVisible = ref(false)
const confirmPasswordVisible = ref(false)
const form = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: false,
})

const loginLocation = computed(() => {
    const rawUrl = Array.isArray(route.query.url) ? route.query.url[0] : route.query.url
    return rawUrl
        ? { name: 'login', query: { url: rawUrl } }
        : { name: 'login' }
})

const validateConfirmPassword = (_rule, value, callback) => {
    if (!value) {
        callback(new Error('请再次输入密码'))
    } else if (value !== form.password) {
        callback(new Error('两次输入的密码不一致'))
    } else {
        callback()
    }
}

const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 2, max: 30, message: '账号长度应为 2-30 个字符', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 30, message: '密码长度应为 6-30 位', trigger: 'blur' },
    ],
    confirmPassword: [
        { validator: validateConfirmPassword, trigger: ['blur', 'change'] },
    ],
    agreement: [
        {
            validator: (_rule, value, callback) => value
                ? callback()
                : callback(new Error('请先同意平台服务协议')),
            trigger: 'change',
        },
    ],
}

async function handleSubmit() {
    if (submitting.value) return

    const valid = await formRef.value?.validate().catch(() => false)
    if (!valid) return

    submitting.value = true
    window.setTimeout(() => {
        submitting.value = false
        localStorage.setItem('geographical-platform-username', form.username)
        ElMessage({
            type: 'success',
            message: '注册成功，请登录平台',
        })
        router.replace(loginLocation.value)
    }, 500)
}
</script>

<style lang="scss" scoped>
.register-page {
    --blue: #0b7ae1;
    --ink: #17324d;
    --muted: #758597;
    position: relative;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    overflow-x: hidden;
    color: #fff;
    background-color: #09233b;
    background-image: url("/portal-earth.jpg");
    background-position: center;
    background-size: cover;
    isolation: isolate;
}

.register-page::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background-color: rgba(5, 25, 46, 0.74);
}

.register-page::after {
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

.register-header,
.register-footer,
.register-layout {
    width: min(1280px, calc(100% - 80px));
    margin-right: auto;
    margin-left: auto;
}

.register-header {
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

.register-layout {
    display: grid;
    flex: 1;
    grid-template-columns: minmax(0, 1fr) minmax(380px, 430px);
    align-items: center;
    gap: clamp(60px, 9vw, 140px);
    padding-top: 20px;
    padding-bottom: 38px;
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
    margin: 22px 0;
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

.register-panel {
    width: 100%;
    padding: 36px 40px 26px;
    border: 1px solid rgba(255, 255, 255, 0.38);
    background-color: rgba(255, 255, 255, 0.96);
    box-shadow: 0 22px 55px rgba(2, 18, 35, 0.28);
}

.register-panel__heading h2 {
    margin: 11px 0 8px;
    color: var(--ink);
    font-size: 30px;
    font-weight: 700;
    line-height: 1.25;
}

.register-panel__heading>p:last-child {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
}

.panel-kicker {
    color: var(--blue);
    font-size: 10px;
    letter-spacing: 1.8px;
}

.register-form {
    margin-top: 24px;
}

.register-form :deep(.el-form-item) {
    margin-bottom: 15px;
}

.register-form :deep(.el-form-item__label) {
    margin-bottom: 7px;
    padding: 0;
    color: #3c536a;
    font-size: 12px;
    line-height: 1;
}

.register-form :deep(.el-input__wrapper) {
    min-height: 42px;
    border: 1px solid #d8e3eb;
    border-radius: 2px;
    box-shadow: none;
    transition: border-color 180ms ease, box-shadow 180ms ease;
}

.register-form :deep(.el-input__wrapper:hover) {
    border-color: #9ac8e9;
}

.register-form :deep(.el-input__wrapper.is-focus) {
    border-color: var(--blue);
    box-shadow: 0 0 0 2px rgba(11, 122, 225, 0.12);
}

.register-form :deep(.el-input__prefix-inner) {
    color: #8da0b2;
}

.register-form :deep(.el-input__inner) {
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

.agreement-item {
    margin-top: 1px;
    margin-bottom: 20px !important;
}

.agreement-item :deep(.el-form-item__content) {
    line-height: 1.35;
}

.agreement-item :deep(.el-checkbox) {
    height: auto;
    white-space: normal;
}

.agreement-item :deep(.el-checkbox__label) {
    color: #65788a;
    font-size: 12px;
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

.login-prompt {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 18px;
    color: #91a0ad;
    font-size: 12px;
}

.login-link {
    color: var(--blue);
    text-decoration: none;
    transition: color 180ms ease;
}

.login-link:hover {
    color: #075aa8;
    text-decoration: underline;
}

.register-panel__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 22px;
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

.register-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 58px;
    color: rgba(255, 255, 255, 0.48);
    font-size: 10px;
    letter-spacing: 0.8px;
}

@media (max-width: 960px) {

    .register-header,
    .register-footer,
    .register-layout {
        width: min(680px, calc(100% - 48px));
    }

    .register-layout {
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

    .register-panel {
        max-width: 430px;
        margin: 0 auto;
    }

    .register-page::after {
        display: none;
    }
}

@media (max-width: 560px) {

    .register-header,
    .register-footer,
    .register-layout {
        width: calc(100% - 32px);
    }

    .register-header {
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

    .register-panel {
        padding: 28px 22px 23px;
    }

    .register-panel__heading h2 {
        font-size: 26px;
    }

    .register-form {
        margin-top: 22px;
    }

    .register-footer {
        min-height: 48px;
        font-size: 9px;
    }

    .register-footer .footer-line {
        width: 12px;
    }
}
</style>
