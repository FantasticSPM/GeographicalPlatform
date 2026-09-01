<template>
    <div class="header_wrap">
        <div class="left">
            <div class="cn">地理空间资源信息平台</div>
            <div class="en">Geographical Spatial Resource Information Platform</div>
        </div>
        <div class="center">
            <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
                <el-menu-item v-for="item in items" :key="item.index" :index="item.index">{{ item.label
                    }}</el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <el-button type="primary" size="small" @click="login">登录</el-button>
            <el-button type="primary" size="small" @click="register">注册</el-button>
        </div>
        <button class="mobile-toggle" type="button" :aria-expanded="mobileMenuOpen" aria-label="打开导航菜单"
            @click="mobileMenuOpen = !mobileMenuOpen">
            <el-icon v-if="!mobileMenuOpen">
                <Menu />
            </el-icon>
            <el-icon v-else>
                <Close />
            </el-icon>
        </button>
        <nav v-if="mobileMenuOpen" class="mobile-menu" aria-label="移动端导航">
            <RouterLink v-for="item in items" :key="item.index" class="mobile-menu__item"
                :class="{ 'is-active': activeIndex === item.index }" :to="{ name: item.index }"
                @click="mobileMenuOpen = false">
                <span>{{ item.label }}</span>
                <el-icon>
                    <ArrowRight />
                </el-icon>
            </RouterLink>
            <div class="mobile-menu__account">
                <el-button type="primary" size="small" @click="login">登录</el-button>
                <el-button type="primary" size="small" @click="register">注册</el-button>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const activeIndex = ref(route.matched?.[1].path || route.path)
const mobileMenuOpen = ref(false)

const items = [
    { index: '/index', label: '门户首页' },
    { index: '/geology', label: '空间信息' },
    { index: '/weather', label: '天气信息' },
    { index: '/theme', label: '特色专题' },
    { index: '/help', label: '平台信息' }
]

watch(() => route.path, (newRoutePath) => {
    activeIndex.value = route.matched?.[1].path || newRoutePath
    mobileMenuOpen.value = false
})

function login() {
    router.push({
        name: 'login',
        query: {
            url: window.location.href
        }
    })
}

function register() {
    router.push({
        name: 'register',
        query: {
            url: window.location.href
        }
    })
}
</script>

<style lang="scss" scoped>
.header_wrap {
    position: relative;
    // width: min(1440px, calc(100% - 48px));
    width: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(28px, 5vw, 100px);

    .brand__mark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border: 1px solid rgba(139, 212, 255, 0.88);
        border-radius: 50%;
        color: #dff6ff;
        font-size: 19px;
        font-weight: 700;
        line-height: 1;
    }

    .left {
        position: relative;
        min-width: 0;
        padding-left: 15px;
        color: rgba(255, 255, 255, 0.98);
        font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
        font-weight: 600;
        text-shadow: 0 1px 3px rgba(4, 35, 78, 0.28);

        &::before {
            content: "";
            position: absolute;
            top: 2px;
            bottom: 2px;
            left: 0;
            width: 3px;
            border-radius: 2px;
            background-color: #8bd4ff;
            box-shadow: 0 0 8px rgba(139, 212, 255, 0.6);
        }

        .cn {
            max-width: 100%;
            overflow: hidden;
            font-size: 24px;
            line-height: 1.2;
            letter-spacing: 4px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-text-stroke: 1px rgba(6, 56, 104, 0.38);
        }

        .en {
            max-width: 100%;
            margin-top: 7px;
            overflow: hidden;
            color: rgba(255, 255, 255, 0.78);
            font-size: 11px;
            font-weight: 400;
            line-height: 1.2;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-text-stroke: 0.2px rgba(6, 56, 104, 0.24);
        }
    }

    @media (max-width: 1200px) {
        .left {
            padding-left: 12px;

            .cn {
                font-size: 20px;
                letter-spacing: 1px;
            }

            .en {
                margin-top: 5px;
                font-size: 10px;
                letter-spacing: 0.4px;
            }
        }
    }

    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        flex: 1 1 auto;
        min-width: 0;

        --el-menu-bg-color: transparent;
        --el-menu-text-color: #fff;

        .el-menu {
            display: flex;
            justify-content: center;
            height: 80px;
            --el-menu-border-color: transparent;
            --el-menu-hover-bg-color: transparent;
            --el-menu-active-color: #fff;

            .el-menu-item {
                height: 80px;
                padding: 0 20px;
                line-height: 80px;
            }

            .el-menu-item.is-active {
                font-weight: bold;
            }
        }
    }

    .right {
        display: flex;
        flex: 0 0 auto;
        gap: 8px;

        .el-button+.el-button {
            margin-left: 0;
        }
    }

    .mobile-toggle,
    .mobile-menu {
        display: none;
    }

    @media (max-width: 1200px) {
        width: calc(100% - 40px);
        gap: 28px;

        .center .el-menu .el-menu-item {
            padding: 0 13px;
            font-size: 13px;
        }

        .right .el-button {
            padding-right: 12px;
            padding-left: 12px;
        }
    }

    @media (max-width: 960px) {
        width: calc(100% - 32px);
        gap: 18px;

        .left {
            .cn {
                font-size: 18px;
                letter-spacing: 1px;
            }

            .en {
                max-width: 250px;
                font-size: 9px;
                letter-spacing: 0;
            }
        }

        .center .el-menu .el-menu-item {
            padding: 0 8px;
            font-size: 12px;
        }
    }

    @media (max-width: 760px) {
        width: calc(100% - 32px);
        min-height: 64px;

        .left {
            flex: 1 1 auto;
            padding-left: 11px;

            .cn {
                font-size: 17px;
            }

            .en {
                max-width: 100%;
                margin-top: 5px;
                font-size: 8px;
                white-space: nowrap;
                text-overflow: clip;
            }
        }

        .center,
        .right {
            display: none;
        }

        .mobile-toggle {
            display: inline-flex;
            flex: 0 0 40px;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            padding: 0;
            border: 1px solid rgba(255, 255, 255, 0.42);
            border-radius: 3px;
            color: #fff;
            background-color: rgba(255, 255, 255, 0.1);
            cursor: pointer;
            transition: background-color 180ms ease, border-color 180ms ease;
        }

        .mobile-toggle:hover {
            border-color: rgba(255, 255, 255, 0.76);
            background-color: rgba(255, 255, 255, 0.18);
        }

        .mobile-menu {
            position: absolute;
            z-index: 20;
            top: calc(100% + 10px);
            right: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            padding: 8px;
            border: 1px solid rgba(14, 65, 111, 0.16);
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 14px 30px rgba(5, 38, 72, 0.2);
        }

        .mobile-menu__item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 46px;
            padding: 0 12px;
            border-radius: 2px;
            color: #1a3b5d;
            font-size: 14px;
            text-decoration: none;
            transition: color 180ms ease, background-color 180ms ease;
        }

        .mobile-menu__item:hover,
        .mobile-menu__item.is-active {
            color: #0b7ae1;
            background-color: #edf7ff;
        }

        .mobile-menu__account {
            display: flex;
            gap: 8px;
            margin-top: 8px;
            padding: 8px 4px 0;
            border-top: 1px solid #e7eef4;
        }

        .mobile-menu__account .el-button {
            flex: 1;
            margin: 0;
        }
    }

    @media (max-width: 380px) {
        width: calc(100% - 24px);

        .left {
            .cn {
                font-size: 16px;
                letter-spacing: 0;
            }

            .en {
                font-size: 7px;
            }
        }
    }
}
</style>
