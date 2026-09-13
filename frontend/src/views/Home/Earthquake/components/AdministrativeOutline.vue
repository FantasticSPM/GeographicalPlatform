<template>
  <div class="administrative-outline">
    <el-switch
      @change="handleChange"
      v-model="value"
      class="ml-2"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    />
  </div>
</template>

<script setup>
import * as Cesium from "cesium";
import { polygonToLine } from "@turf/turf";
import chinaData from "@/assets/data/china.json";
console.log(chinaData);

const outline = polygonToLine(chinaData.features[0]);
console.log(outline);
import { ref } from "vue";
const value = ref(false);

let ds;
let ds1;
function handleChange(value) {
  if (value) {
    Cesium.GeoJsonDataSource.load(chinaData, {
      clampToGround: true,
    }).then((dataSource) => {
      ds = dataSource;
      viewer.dataSources.add(dataSource);
    });

    Cesium.GeoJsonDataSource.load(outline, {
      clampToGround: true,
    }).then((dataSource) => {
      ds1 = dataSource;
      viewer.dataSources.add(dataSource);
    });
  } else {
    if (ds) {
      viewer.dataSources.remove(ds);
      viewer.dataSources.remove(ds1);
      ds = null;
      ds1 = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.administrative-outline {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
