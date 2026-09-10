<template>
  <div class="news">
    <NewsAnnounce
      v-for="i in data"
      :message="i.content"
      :key="i.id"
      @click="handleClick(i)"
    ></NewsAnnounce>
  </div>
  <el-dialog
    title="新闻详情"
    width="1500px"
    v-model="isShowDialog"
    top="5vh"
    v-if="isShowDialog"
  >
    <IframePage height="800px" :src="details.link"></IframePage>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import NewsAnnounce from "./NewsAnnounce.vue";
import IframePage from "@/components/IframePage.vue";
import { apiGetEarthquakeNewsList } from "@/apis/backend/earthquake.js";
import { ElMessage } from "element-plus";

const isShowDialog = ref(false);
const details = ref({});
function handleClick(data) {
  isShowDialog.value = true;
  details.value = data;
}

const data = ref([]);
async function getNews() {
  const result = await apiGetEarthquakeNewsList();
  if (result?.success) {
    data.value = result.data.slice(0, 1);
  } else {
    ElMessage.error(result?.msg ?? "获取新闻失败");
  }
}

getNews();
</script>

<style scoped lang="scss">
.news {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
