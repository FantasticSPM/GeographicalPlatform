<template>
  <div class="earthquake-container">
    <Map3D></Map3D>
    <EarthquakeNews></EarthquakeNews>
    <LatestEarthquake
      :data="earthquakeList"
      @click="handleClick"
    ></LatestEarthquake>
    <EarthquakeDetails
      :data="details"
      v-if="isShowDetail"
      @close="handleDetailsClose"
    ></EarthquakeDetails>
    <AdministrativeOutline></AdministrativeOutline>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import { ElLoading, ElMessage } from "element-plus";
import Map3D from "@/components/map/Map3D/Map3D.vue";

import { apiGetEarthquakeList } from "@/apis/backend/earthquake";
import EarthquakeNews from "./components/EarthquakeNews.vue";
import EarthquakeDetails from "./components/EarthquakeDetails.vue";
import LatestEarthquake from "./components/LatestEarthquake.vue";
import AdministrativeOutline from "@/components/map/Map3D/AdministrativeOutline.vue";

import * as Cesium from "cesium";
import {
  addBillboards,
  addLabels,
  removeBillboards,
  removeLabels,
  createCircle,
  removeCircle,
} from "@/utils/viewer.js";

// 获取地震数据
const earthquakeList = ref([]);
async function getEarthquakeList() {
  const loading = ElLoading.service({
    text: "正在加载中...",
    background: "rgba(0, 0, 0, 0.3)",
  });
  try {
    const res = await apiGetEarthquakeList();
    earthquakeList.value = res.data;
  } catch (err) {
    ElMessage.error("请求异常!");
  } finally {
    loading.close();
  }
}
getEarthquakeList();

const isShowDetail = ref(false);
const details = ref({});

const id = "earthquake";
const circleId = "earthquake-circle";
function handleClick(data) {
  removeBillboards(window.viewer, id);
  removeLabels(window.viewer, id);
  removeCircle(window.viewer, circleId);
  addBillboards(
    window.viewer,
    data,
    {
      scale: 1,
      width: 45,
      height: 45,
    },
    id,
  );

  createCircle(window.viewer, data, {
    id: circleId,
    // 地震没有自带影响半径，默认使用 50 km 的最大扩散范围。
    maxRadius: data.depth * 100 ?? 50000,
    ringCount: 3,
    duration: 2800,
  });
  addLabels(
    window.viewer,
    data,
    {
      text: data.content,
      showBackground: true,
      backgroundColor: Cesium.Color.fromCssColorString("#0c1a26"),
      pixelOffset: new Cesium.Cartesian2(0, -48),
    },
    id,
  );
  isShowDetail.value = true;
  details.value = data;
}

function handleDetailsClose() {
  isShowDetail.value = false;
  removeBillboards(window.viewer, id);
  removeLabels(window.viewer, id);
  removeCircle(window.viewer, circleId);
}

onBeforeUnmount(() => {
  handleDetailsClose();
});
</script>

<style lang="scss" scoped>
.earthquake-container {
  width: 100%;
  height: calc(100vh - 80px);
  position: relative;
}
</style>
