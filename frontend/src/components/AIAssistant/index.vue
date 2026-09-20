<template>
  <div class="ai-assistant">
    <button
      class="robot"
      type="button"
      aria-label="打开 AI 智能助手"
      @click="showDialog = true"
    >
      <img :src="getPublicUrl('/robot.gif')" alt="" />
      <span class="robot__dot" aria-hidden="true"></span>
    </button>
    <el-dialog
      v-model="showDialog"
      top="10vh"
      width="60%"
      :show-close="false"
      class="ai-dialog"
    >
      <template #header></template>
      <el-container class="ai-assistant-dialog">
        <el-aside class="left-bar" v-if="isShowLeft">
          <SessionManagment
            @show="(val) => (isShowLeft = val)"
          ></SessionManagment>
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
      <el-button text circle class="close-btn" @click="showDialog = false">
        <el-icon><CloseBold /></el-icon>
      </el-button>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import logo from "@/components/logo.vue";
import SessionManagment from "./components/SessionManagment.vue";
import DialogBox from "./components/DialogBox.vue";
import { getPublicUrl } from "@/utils/common.js";

const showDialog = ref(false);
const isShowLeft = ref(true);
</script>

<style lang="scss" scoped>
.ai-assistant {
  .robot {
    position: relative;
    display: block;
    width: 80px;
    height: 80px;
    padding: 4px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    background: linear-gradient(145deg, #ffffff 0%, #e8f6ff 100%);
    box-shadow:
      0 0 0 2px #102b3f,
      0 0 0 5px rgba(255, 255, 255, 0.96),
      0 10px 24px rgba(18, 91, 137, 0.3),
      inset 0 0 12px rgba(74, 174, 224, 0.18);
    box-sizing: border-box;
    cursor: pointer;
    appearance: none;
    isolation: isolate;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      filter 180ms ease;
  }

  .robot > img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .robot__dot {
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 11px;
    height: 11px;
    border: 2px solid #fff;
    border-radius: 50%;
    background: #27d889;
    box-shadow:
      0 2px 7px rgba(0, 0, 0, 0.42),
      inset 0 0 3px rgba(255, 255, 255, 0.72);
    box-sizing: border-box;
    z-index: 1;
  }

  .robot:hover {
    box-shadow:
      0 14px 30px rgba(18, 91, 137, 0.34),
      0 0 0 7px rgba(255, 255, 255, 0.28),
      inset 0 0 14px rgba(74, 174, 224, 0.24);
    filter: saturate(1.08) brightness(1.03);
    transform: translateY(-3px) scale(1.04);
  }

  .robot:active {
    transform: translateY(-1px) scale(0.98);
  }

  .robot:focus-visible {
    outline: 3px solid rgba(71, 174, 235, 0.55);
    outline-offset: 4px;
  }

  .ai-assistant-dialog {
    height: 70vh;
  }
  .left-bar {
    background-color: #f9fafb;
    min-width: 248px;
    flex: 0 0 248px;
    overflow: hidden auto;
    border-right: 1px solid #e4edf4;
    background:
      radial-gradient(
        circle at 20% 0%,
        rgba(125, 194, 239, 0.15),
        transparent 32%
      ),
      linear-gradient(180deg, #f8fbff 0%, #f5f8fc 100%);
  }

  .close-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 999;
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

<style lang="scss">
.ai-dialog {
  padding: 0;
  border-radius: 15px;
  overflow: hidden;
  .el-dialog__header {
    display: none;
  }
}
</style>
