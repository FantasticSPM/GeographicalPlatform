<template>
  <el-container>
    <el-header>
      <HeaderComponent></HeaderComponent>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
  <AIAssiant class="ai"></AIAssiant>
</template>

<script setup>
import HeaderComponent from "./components/Layouts/HeaderComponent.vue";
import AIAssiant from "@/components/AIAssistant/index.vue";
</script>

<style lang="scss" scoped>
.ai {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2;
}

.el-header {
  // padding: 0;
  background-color: #0b7ae1;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-main {
  padding: 0px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 80px);
}
</style>
