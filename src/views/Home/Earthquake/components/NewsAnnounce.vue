<template>
    <div class="news-announce">
        <el-icon>
            <Bell />
        </el-icon>
        <span>台风“科罗旺”最新位置：北纬29.7度， 东经128.0度，中心附近最大风力8级</span>
    </div>
</template>

<style scoped lang="scss">
.news-announce {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    cursor: pointer;

    .el-icon {
        margin-right: 5px;
    }
}
</style>