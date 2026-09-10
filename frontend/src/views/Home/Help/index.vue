<template>
  <div class="help-container">
    <div class="help-left">
      <el-menu router :default-active="activeIndex">
        <el-menu-item v-for="i in menulist" :key="i.path" :index="i.path">
          <el-icon> <component :is="i.icon" /> </el-icon>{{ i.title }}
        </el-menu-item>
        <!-- <el-menu-item index="/help/service">
          <el-icon> <Tickets /> </el-icon>服务条款
        </el-menu-item> -->
      </el-menu>
    </div>
    <div class="help-body">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Postcard, Tickets, Warning } from "@element-plus/icons-vue";
const route = useRoute();
const activeIndex = ref(route.fullPath);

const menulist = [
  {
    path: "/help/news",
    title: "新闻公告",
    icon: Postcard,
  },
  {
    path: "/help/service",
    title: "服务条款",
    icon: Tickets,
  },
  {
    path: "/help/about",
    title: "关于我们",
    icon: Warning,
  },
];
</script>

<style lang="scss" scoped>
.help-container {
  display: flex;
  height: calc(100vh - 80px);

  .help-left {
    width: 200px;
    background-color: #edeef0;
  }

  .el-menu {
    border-right: none;
    --el-menu-bg-color: transparent;

    .el-menu-item {
      --el-menu-active-color: #0b7ae1;

      &:hover {
        font-weight: 600;
        color: var(--el-menu-active-color);
      }

      &.is-active {
        font-weight: 600;
        background-color: #d3e3fd;
      }
    }
  }

  .help-body {
    flex: 1;
    height: 100%;
    overflow: auto;
    background-color: #fff;
  }
}
</style>
