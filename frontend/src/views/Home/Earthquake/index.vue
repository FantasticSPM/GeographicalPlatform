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

import { addBillboards, removeBillboards } from "@/utils/viewer.js";

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
let billboardInfo = null;
function handleClick(data) {
  billboardInfo && removeBillboards(window.viewer, billboardInfo.id);
  // const result = await apiGetEarthquakeDetail(item.id);
  billboardInfo = addBillboards(window.viewer, data);
  isShowDetail.value = true;
  details.value = data;
}

function handleDetailsClose() {
  isShowDetail.value = false;
  billboardInfo && removeBillboards(window.viewer, billboardInfo.id);
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
