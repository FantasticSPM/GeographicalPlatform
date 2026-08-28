<template>
  <el-container>
    <el-header>
      <HeaderComponent></HeaderComponent>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer>
      <FooterComponent></FooterComponent>
    </el-footer>
  </el-container>
</template>

<script setup>
import HeaderComponent from './components/Layouts/HeaderComponent.vue'
import FooterComponent from './components/Layouts/FooterComponent.vue'
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  background-color: #0b7ae1;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-main {
  padding: 10px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 80px - 60px);
}

.el-footer {
  padding: 0;
  background-color: #0b7ae1;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
