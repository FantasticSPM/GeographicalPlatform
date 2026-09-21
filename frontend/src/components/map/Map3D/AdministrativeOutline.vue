<template>
  <div class="administrative-outline">
    <el-switch
      @change="handleChange"
      v-model="value"
      class="ml-2"
      inline-prompt
      :active-icon="Check"
      :inactive-icon="Close"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    />
  </div>
</template>

<script setup>
import { Check, Close } from "@element-plus/icons-vue";
import * as Cesium from "cesium";
import { polygonToLine } from "@turf/turf";
import chinaData from "@/assets/data/china.json";

const outline = polygonToLine(chinaData.features[0]);

import { ref } from "vue";
const value = ref(false);

let ds;

async function handleChange(value) {
  if (value) {
    ds = await Promise.all([
      Cesium.GeoJsonDataSource.load(outline, {
        clampToGround: true,
      }),
      Cesium.GeoJsonDataSource.load(chinaData, {
        clampToGround: true,
      }),
    ]);

    ds.forEach((item) => {
      viewer.dataSources.add(item);
    });
  } else {
    if (ds) {
      ds.forEach((item) => {
        viewer.dataSources.remove(item);
      });
      ds = null;
    }
  }
}
</script>

<style lang="scss" scoped></style>
