<template>
  <Panel2
    title="位置专题"
    eyebrow="POSITION EXPLORER"
    subtitle="选择点位，快速查看区域三维视图"
    width="min(390px, calc(100vw - 32px))"
    class="position-list"
  >
    <template #actions>
      <span class="position-list__count">{{ list.length }} 个点位</span>
    </template>

    <ul class="position-list__items" aria-label="位置点位">
      <li v-for="(item, index) in list" :key="item.id">
        <button
          class="position-list__item"
          :class="{ 'is-active': activeId === item.id }"
          type="button"
          :aria-current="activeId === item.id ? 'location' : undefined"
          @click="handleClick(item)"
        >
          <span class="position-list__index">{{
            String(index + 1).padStart(2, "0")
          }}</span>
          <span class="position-list__item-main">
            <span class="position-list__item-title">{{ item.name }}</span>
            <span class="position-list__item-meta">
              <el-icon aria-hidden="true"><Location /></el-icon>
              {{ formatCoordinates(item.position) }}
            </span>
          </span>
          <span class="position-list__item-action">
            <el-icon
              aria-hidden="true"
              v-if="activeId === item.id"
              class="position-list__selected"
              ><Location
            /></el-icon>
            <el-icon aria-hidden="true"><ArrowRight /></el-icon>
          </span>
        </button>
      </li>
    </ul>

    <div class="position-list__tip">
      <el-icon aria-hidden="true"><Aim /></el-icon>
      <span>点击卡片飞行至目标位置</span>
      <span class="position-list__tip-line"></span>
    </div>
  </Panel2>
</template>

<script setup>
import * as Cesium from "cesium";
import { ref } from "vue";
import { Aim, ArrowRight, Location } from "@element-plus/icons-vue";
import Panel2 from "@/components/panel/Panel2.vue";
import { flyToLookAt } from "@/utils/viewer";

const list = [];

const activeId = ref("");

function formatCoordinates(position) {
  const [longitude, latitude] = position;
  const longitudeDirection = longitude >= 0 ? "E" : "W";
  const latitudeDirection = latitude >= 0 ? "N" : "S";

  return `${Math.abs(longitude).toFixed(3)}°${longitudeDirection} · ${Math.abs(latitude).toFixed(3)}°${latitudeDirection}`;
}

function handleClick(item) {
  if (!window.viewer) return;

  activeId.value = item.id;
  const position = item.position;

  flyToLookAt(
    window.viewer,
    Cesium.Cartesian3.fromDegrees(
      position[0],
      position[1],
      position[2] * viewer.scene.verticalExaggeration,
    ),
    new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(item.heading ?? 0),
      Cesium.Math.toRadians(item.pitch ?? -45),
      position[3] ?? 0,
    ),
  );
}
</script>

<style scoped lang="scss">
.position-list {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 2;
}

.position-list__count {
  display: inline-flex;
  min-height: 24px;
  align-items: center;
  padding: 0 9px;
  border: 1px solid rgba(115, 219, 255, 0.24);
  border-radius: 999px;
  color: #9ddff5;
  background: rgba(43, 146, 188, 0.13);
  font-size: 11px;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.position-list__items {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.position-list__item {
  display: flex;
  width: 100%;
  min-height: 68px;
  align-items: center;
  gap: 11px;
  padding: 11px 12px 11px 10px;
  border: 1px solid rgba(111, 192, 224, 0.16);
  border-radius: 3px;
  color: inherit;
  background: rgba(15, 36, 57, 0.56);
  cursor: pointer;
  text-align: left;
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.position-list__item:hover {
  border-color: rgba(115, 219, 255, 0.46);
  background: rgba(28, 71, 97, 0.66);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
  transform: translateY(-1px);
}

.position-list__item:focus-visible {
  outline: 2px solid rgba(115, 219, 255, 0.72);
  outline-offset: 2px;
}

.position-list__item.is-active {
  border-color: rgba(100, 220, 255, 0.68);
  background: linear-gradient(
    100deg,
    rgba(33, 111, 151, 0.55),
    rgba(15, 47, 73, 0.68)
  );
  box-shadow:
    0 0 0 1px rgba(73, 208, 255, 0.1) inset,
    0 0 20px rgba(36, 166, 213, 0.12);
}

.position-list__index {
  display: inline-flex;
  width: 27px;
  height: 27px;
  flex: none;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(109, 200, 230, 0.28);
  border-radius: 2px;
  color: #67cee9;
  background: rgba(49, 148, 184, 0.11);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
}

.position-list__item.is-active .position-list__index {
  border-color: rgba(135, 231, 255, 0.64);
  color: #e5fbff;
  background: rgba(67, 190, 231, 0.28);
}

.position-list__item-main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 7px;
}

.position-list__item-title {
  overflow: hidden;
  color: #e6f6fc;
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.position-list__item-meta {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  overflow: hidden;
  color: #7898aa;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10px;
  letter-spacing: 0.1px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.position-list__item-meta .el-icon {
  flex: none;
  color: #5cc9ed;
  font-size: 13px;
}

.position-list__item-action {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 5px;
  color: #4f7d91;
  font-size: 15px;
}

.position-list__item:hover .position-list__item-action,
.position-list__item.is-active .position-list__item-action {
  color: #80ddff;
}

.position-list__selected {
  color: #8be8cb;
  font-size: 20px;
  letter-spacing: 0.2px;
}

.position-list__tip {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 16px;
  color: #7291a2;
  font-size: 11px;
}

.position-list__tip .el-icon {
  color: #6ed7f7;
  font-size: 14px;
}

.position-list__tip-line {
  height: 1px;
  flex: 1;
  margin-left: 3px;
  background: linear-gradient(90deg, rgba(97, 187, 219, 0.24), transparent);
}
</style>
