<template>
    <div class="new-container">
        <div v-for="item in list" :key="item.id" class="news-item">
            <div class="news-item-title">{{ item.title }}</div>
            <div class="news-item-content">{{ item.content }}</div>
        </div>
    </div>
</template>

<script setup>
const list = [
    {
        id: 1,
        title: '地理空间数据智能服务（GeoAgent）正式上线',
        content: '地理空间数据智能服务（GeoAgent）正式发布（访问网址：https://www.gscloud.cn/geoagent），标志着地理空间数据库在智能服务领域迈出关键一步。GeoAgent围绕地理空间数据的“高效检索、精准筛选、智能分析”进行建设，旨在为用户提供更便捷、更智能的一站式地理空间数据服务。'
    },
    {
        id: 2,
        title: '【调查问卷】地理空间数据云“用户满意度”调查-帮我们一起变得更好！',
        content: '您的每一个肯定，都是我们进步的力量！系统体验调研现已开启'
    },
    {
        id: 3,
        title: '众包任务，报酬2600元，欢迎报名（长江口北支演变历史-长时序遥感解译）',
        content: '基于Landsat或Sentinel 2A系列数据，进行长江口北支岸线及沙洲数据解译。时相总体为1980s、1990s、2000s、2008年、2015年和2023年，共6期，具体根据Landsat数据的可用性确定。各期影像时相间隔均匀，每一期尽量选取该年内7~10月份，云量小且为低潮位的影像。'
    }
]
</script>

<style lang="scss" scoped>
.new-container {
    padding: 20px;

    .news-item {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;

        &:hover {
            .news-item-title {
                color: #006fff;
            }
        }

        .news-item-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
        }

        .news-item-content {
            font-weight: 200;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
</style>