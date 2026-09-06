<template>
  <div class="earthquake-container">
    <Map3D></Map3D>
    <div class="news" v-if="earthquakeList.length">
      <NewsAnnounce :message="earthquakeList[0].content"></NewsAnnounce>
    </div>
    <Panel2
      eyebrow="Latest Earthquake"
      subtitle=""
      title="最新地震"
      class="info"
    >
      <ul v-if="earthquakeList.length">
        <li
          v-for="i in earthquakeList"
          :key="i.id"
          :title="i.content"
          @click="handleDetailsClick(i)"
        >
          <span class="content">{{ i.content }}</span>
          <span class="time">{{ i.time }}</span>
        </li>
      </ul>
      <el-empty
        v-loading="isLoading"
        element-loading-text="正在加载中..."
        element-loading-background="rgba(0,0,0,0.3)"
        v-else
        description="暂无数据"
      ></el-empty>
    </Panel2>
    <Panel2
      v-if="isShowDetail"
      closable
      eyebrow="Earthquake Details"
      title="地震详情"
      class="details"
      @close="handleDetailsClose"
    >
      <h3>{{ details.content }}</h3>
      <table>
        <tbody>
          <tr>
            <th>时间：</th>
            <td>{{ details.detailTime || "-" }}</td>
          </tr>
          <tr>
            <th>震级：</th>
            <td>M {{ details.magnitude ?? "-" }}</td>
          </tr>
          <tr>
            <th>深度：</th>
            <td>{{ details.depth ?? "-" }}千米</td>
          </tr>
          <tr>
            <th>经度：</th>
            <td>{{ details.longitude ?? "-" }}°</td>
          </tr>
          <tr>
            <th>纬度：</th>
            <td>{{ details.latitude ?? "-" }}°</td>
          </tr>
          <tr>
            <th>地点：</th>
            <td>{{ details.location ?? "-" }}</td>
          </tr>
        </tbody>
      </table>
    </Panel2>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import Map3D from "@/components/map/Map3D/Map3D.vue";
import NewsAnnounce from "./components/NewsAnnounce.vue";
import Panel2 from "@/components/panel/Panel2.vue";
import { ElLoading, ElMessage } from "element-plus";
import {
  apiGetEarthquakeList,
  apiGetEarthquakeDetail,
} from "@/apis/backend/earthquake.js";
import { addBillboards, removeBillboards } from "@/utils/viewer.js";

const isLoading = ref(false);
const earthquakeList = ref([]);
async function getEarthquakeList() {
  isLoading.value = true;
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
    isLoading.value = false;
    loading.close();
  }
}

getEarthquakeList();

const isShowDetail = ref(false);
const details = ref({});

let billboardInfo = null;
async function handleDetailsClick(item) {
  billboardInfo && removeBillboards(window.viewer, billboardInfo.id);
  // const result = await apiGetEarthquakeDetail(item.id);
  details.value = item;
  isShowDetail.value = true;
  billboardInfo = addBillboards(window.viewer, details.value);
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

  .info {
    position: absolute;
    top: 100px;
    left: 10px;
    z-index: 2;
    ul {
      max-height: 400px;

      li {
        padding: 5px 0px;
        cursor: pointer;
        color: #888888;
        font-size: 14px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        --time-width: 40px;
        .time {
          width: var(--time-width);
          display: inline-block;
          color: #888888;
          font-size: 12px;
          text-align: right;
        }
        .content {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: calc(100% - var(--time-width));
          margin-left: 10px;
        }
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #888888;
        }
        &:hover {
          color: #ffffff;
        }
      }
    }
  }

  .details {
    position: absolute;
    top: 100px;
    right: 10px;
    z-index: 2;
    h3 {
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        th {
          width: 70px;
          text-align: right;
          padding: 5px 10px;
        }
        td {
          padding: 5px 10px;
        }
      }
    }
  }
}
</style>
