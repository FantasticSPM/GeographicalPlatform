<template>
    <div class="item-card">
        <div class="card-image">
            <img :src="data.image ?? '/p.png'" alt="" />
        </div>
        <div class="card-info">
            <div class="card-title" :title="data.title">{{ data.title }}</div>
            <div class="card-desc">

                <el-tooltip effect="dark" content="浏览">
                    <el-icon @click="handleCViewClick">
                        <View />
                    </el-icon>
                </el-tooltip>


                <div class="card-desc-right">
                    <div>
                        <span>发布时间：</span>
                        <span>2026-8-30</span>
                    </div>
                    <el-tooltip effect="dark" content="收藏">
                        <el-icon @click="handleStarClick">
                            <Star />
                        </el-icon>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})

function handleStarClick(e) {
    ElMessageBox.confirm(
        '你暂未登录，请先登录！',
        '提示',
        {
            confirmButtonText: '去登陆',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '正在跳转登录页...',
            })
            router.replace({
                name: 'login',
                query: {
                    url: window.location.href
                }
            })
        })
        .catch(() => {
        })
}

function handleCViewClick(e) {
    window.open(props.data?.link)
}
</script>

<style lang="scss" scoped>
.item-card {
    background-color: #fff;
    overflow: hidden;
    color: #000;
    cursor: pointer;

    .card-image {
        height: 200px;
        overflow: hidden;

        >img {
            transition: transform .5s;
            width: 100%;
            height: 100%;
        }
    }

    .card-info {
        padding: 10px;

        .card-title {
            font-size: 16px;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .card-desc {
            font-size: 13px;
            color: #707782;
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 2;

            .el-icon {
                font-size: 15px;
            }

            .card-desc-right {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        }

        // .card-edit {
        //     display: flex;
        //     align-items: center;


        // }
    }

    &:hover .card-image>img {
        transform: scale(1.5);
    }

}
</style>