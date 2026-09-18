<template>
  <el-container class="ai-assistant">
    <el-aside class="left-bar" v-if="isShowLeft">
      <SessionManagment @show="(val) => (isShowLeft = val)"></SessionManagment>
    </el-aside>
    <el-main class="ai-assistant-message">
      <div class="opt flex-center" v-if="!isShowLeft">
        <logo></logo>
        <div class="btns">
          <el-button text circle @click="isShowLeft = true">
            <el-icon><Expand /></el-icon>
          </el-button>
          <el-button text circle @click="isShowLeft = true">
            <el-icon><ChatLineRound /></el-icon>
          </el-button>
        </div>
      </div>
      <DialogBox></DialogBox>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import logo from "@/components/logo.vue";
import SessionManagment from "./components/SessionManagment.vue";
import DialogBox from "./components/DialogBox.vue";

const isShowLeft = ref(true);
</script>

<style lang="scss" scoped>
.ai-assistant {
  height: calc(100vh - 80px);
  .left-bar {
    background-color: #f9fafb;
  }

  .ai-assistant-message {
    background-color: #fff;
    position: relative;
  }

  .opt {
    position: absolute;
    top: 25px;
    left: 12px;

    .btns {
      margin-left: 20px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      background: #fff;
      border-radius: 100px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
      padding: 2px 10px;
      .el-button + .el-button {
        margin: unset;
      }
    }

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
</style>
