<template>
  <aside class="position-picker" aria-label="位置拾取器">
    <div class="position-picker__ambient-light" aria-hidden="true"></div>

    <header class="position-picker__header">
      <div class="position-picker__heading">
        <span class="position-picker__eyebrow">MAP TOOLS</span>
        <div class="position-picker__title-row">
          <span class="position-picker__icon" aria-hidden="true">
            <el-icon><Aim /></el-icon>
          </span>
          <div>
            <h2>位置拾取</h2>
            <p>点击地图获取经纬度</p>
          </div>
        </div>
      </div>

      <span class="position-picker__status" :class="{ 'is-ready': position }">
        <span class="position-picker__status-dot" aria-hidden="true"></span>
        {{ position ? "已定位" : "待选择" }}
      </span>
    </header>

    <div class="position-picker__divider" aria-hidden="true">
      <span></span>
    </div>

    <div class="position-picker__body">
      <div
        class="position-picker__coordinate"
        :class="{ 'is-ready': position }"
      >
        <span class="position-picker__label">
          <el-icon aria-hidden="true"><Location /></el-icon>
          当前点击位置
        </span>
        <output
          class="position-picker__value"
          aria-live="polite"
          v-if="position"
        >
          <div>经度：{{ position[0] }}</div>
          <div>纬度：{{ position[1] }}</div>
          <div>高度：{{ position[2] }}</div>
        </output>
        <span class="position-picker__value" v-else>在地图上点击任意位置</span>
      </div>

      <button
        class="position-picker__copy"
        type="button"
        :disabled="!position"
        :aria-label="position ? '复制当前位置' : '请先在地图上选择位置'"
        @click="copyPosition"
      >
        <el-icon v-if="copied" aria-hidden="true"><Check /></el-icon>
        <el-icon v-else aria-hidden="true"><CopyDocument /></el-icon>
        <span>{{ copied ? "已复制" : "复制位置" }}</span>
      </button>

      <p class="position-picker__tip">
        <el-icon aria-hidden="true"><InfoFilled /></el-icon>
        坐标保留 6 位小数，可直接粘贴使用
      </p>
    </div>
  </aside>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import * as Cesium from "cesium";
import {
  Aim,
  Check,
  CopyDocument,
  InfoFilled,
  Location,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const position = ref("");
const copied = ref(false);

let handler;
let copiedTimer;

function initHandler() {
  const viewer = window.viewer;
  if (!viewer?.scene?.canvas) return;

  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((event) => {
    const cartesian = viewer.scene.pickPosition(event.position);
    if (!cartesian) return;

    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    if (!cartographic) return;

    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    const height = cartographic.height;
    position.value = [
      longitude.toFixed(6),
      latitude.toFixed(6),
      height.toFixed(6),
    ];
    copied.value = false;
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back to the legacy API when clipboard permissions are unavailable.
    }
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  try {
    input.select();
    if (!document.execCommand("copy")) throw new Error("copy failed");
  } finally {
    input.remove();
  }
}

async function copyPosition() {
  if (!position.value) {
    ElMessage.warning("请先在地图上点击位置");
    return;
  }

  try {
    await writeClipboard(position.value);

    copied.value = true;
    ElMessage.success("位置已复制");
    clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch {
    ElMessage.error("复制失败，请手动复制坐标");
  }
}

onMounted(() => {
  initHandler();
});

onBeforeUnmount(() => {
  handler?.destroy();
  clearTimeout(copiedTimer);
});
</script>

<style scoped lang="scss">
.position-picker {
  --picker-bg: rgba(7, 19, 33, 0.94);
  --picker-line: rgba(107, 196, 238, 0.2);
  --picker-text: #e8f7ff;
  --picker-muted: #7f9bad;
  --picker-blue: #55cfff;
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
  width: min(320px, calc(100vw - 32px));
  overflow: hidden;
  border: 1px solid var(--picker-line);
  border-radius: 4px;
  color: var(--picker-text);
  background:
    linear-gradient(135deg, rgba(37, 116, 160, 0.12), transparent 42%),
    var(--picker-bg);
  box-shadow:
    0 16px 36px rgba(0, 0, 0, 0.38),
    0 0 0 1px rgba(24, 105, 145, 0.08) inset,
    0 0 28px rgba(38, 161, 211, 0.08);
  isolation: isolate;
  backdrop-filter: blur(14px);
}

.position-picker::before,
.position-picker::after {
  position: absolute;
  z-index: -1;
  content: "";
  pointer-events: none;
}

.position-picker::before {
  inset: 0;
  opacity: 0.16;
  background-image:
    linear-gradient(rgba(133, 213, 245, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(133, 213, 245, 0.12) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, #000, transparent 78%);
}

.position-picker::after {
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(55, 192, 240, 0.16),
    transparent 68%
  );
  transform: translate(38%, -44%);
}

.position-picker__ambient-light {
  position: absolute;
  z-index: -1;
  bottom: -90px;
  left: -90px;
  width: 210px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(27, 113, 193, 0.15),
    transparent 68%
  );
  pointer-events: none;
}

.position-picker__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 18px 15px;
}

.position-picker__heading {
  min-width: 0;
}

.position-picker__eyebrow {
  display: block;
  margin-bottom: 7px;
  color: var(--picker-blue);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.8px;
  line-height: 1.2;
}

.position-picker__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.position-picker__icon {
  display: inline-flex;
  width: 30px;
  height: 30px;
  flex: none;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(115, 219, 255, 0.28);
  border-radius: 3px;
  color: #8be8ff;
  background: rgba(54, 166, 209, 0.14);
  box-shadow: 0 0 14px rgba(36, 166, 213, 0.14);
}

.position-picker__title-row h2 {
  margin: 0;
  color: var(--picker-text);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.4px;
  line-height: 1.3;
}

.position-picker__title-row p {
  margin: 3px 0 0;
  color: var(--picker-muted);
  font-size: 11px;
  line-height: 1.4;
}

.position-picker__status {
  display: inline-flex;
  min-height: 23px;
  flex: none;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  border: 1px solid rgba(127, 155, 173, 0.2);
  border-radius: 999px;
  color: #7898aa;
  background: rgba(40, 65, 82, 0.22);
  font-size: 10px;
  white-space: nowrap;
}

.position-picker__status.is-ready {
  border-color: rgba(103, 224, 181, 0.32);
  color: #8be8cb;
  background: rgba(50, 157, 126, 0.12);
}

.position-picker__status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 8px currentColor;
}

.position-picker__divider {
  height: 1px;
  margin: 0 18px;
  background: var(--picker-line);
}

.position-picker__divider span {
  display: block;
  width: 62px;
  height: 1px;
  background: var(--picker-blue);
  box-shadow: 0 0 10px rgba(85, 207, 255, 0.75);
}

.position-picker__body {
  padding: 16px 18px 17px;
}

.position-picker__coordinate {
  display: flex;
  min-height: 76px;
  flex-direction: column;
  justify-content: center;
  padding: 12px 13px;
  border: 1px solid rgba(111, 192, 224, 0.15);
  border-radius: 3px;
  background: rgba(15, 36, 57, 0.56);
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.position-picker__coordinate.is-ready {
  border-color: rgba(115, 219, 255, 0.36);
  background: linear-gradient(
    110deg,
    rgba(29, 91, 122, 0.42),
    rgba(15, 44, 67, 0.6)
  );
  box-shadow: 0 0 18px rgba(36, 166, 213, 0.08) inset;
}

.position-picker__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--picker-muted);
  font-size: 11px;
}

.position-picker__label .el-icon {
  color: #6ed7f7;
  font-size: 13px;
}

.position-picker__value {
  display: block;
  margin-top: 8px;
  overflow: hidden;
  color: #dff8ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: text;
}

.position-picker__coordinate:not(.is-ready) .position-picker__value {
  color: #7898aa;
  font-family: inherit;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
}

.position-picker__copy {
  display: inline-flex;
  width: 100%;
  min-height: 36px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 11px;
  padding: 0 12px;
  border: 1px solid rgba(115, 219, 255, 0.34);
  border-radius: 3px;
  color: #a9eaff;
  background: rgba(43, 146, 188, 0.14);
  cursor: pointer;
  font-size: 12px;
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.position-picker__copy:hover:not(:disabled) {
  border-color: rgba(115, 219, 255, 0.68);
  color: #e5fbff;
  background: rgba(43, 146, 188, 0.28);
  box-shadow: 0 0 18px rgba(36, 166, 213, 0.16);
  transform: translateY(-1px);
}

.position-picker__copy:focus-visible {
  outline: 2px solid rgba(115, 219, 255, 0.72);
  outline-offset: 2px;
}

.position-picker__copy:disabled {
  border-color: rgba(111, 192, 224, 0.12);
  color: #527083;
  background: rgba(15, 36, 57, 0.34);
  cursor: not-allowed;
}

.position-picker__copy .el-icon {
  font-size: 14px;
}

.position-picker__tip {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 12px 1px 0;
  color: #628397;
  font-size: 10px;
  line-height: 1.4;
}

.position-picker__tip .el-icon {
  flex: none;
  color: #5cc9ed;
  font-size: 13px;
}

@media (max-width: 560px) {
  .position-picker {
    top: 16px;
    right: 16px;
  }
}
</style>
