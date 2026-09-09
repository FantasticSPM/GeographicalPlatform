<template>
  <Panel2
    closable
    eyebrow="Earthquake Details"
    title="地震详情"
    class="details"
    @close="$emit('close')"
  >
    <h3>{{ data.content }}</h3>
    <table>
      <tbody>
        <tr>
          <th>时间：</th>
          <td>{{ data.detailTime || "-" }}</td>
        </tr>
        <tr>
          <th>震级：</th>
          <td>M {{ data.magnitude ?? "-" }}</td>
        </tr>
        <tr>
          <th>深度：</th>
          <td>{{ data.depth ?? "-" }}千米</td>
        </tr>
        <tr>
          <th>经度：</th>
          <td>{{ data.longitude ?? "-" }}°</td>
        </tr>
        <tr>
          <th>纬度：</th>
          <td>{{ data.latitude ?? "-" }}°</td>
        </tr>
        <tr>
          <th>地点：</th>
          <td>{{ data.location ?? "-" }}</td>
        </tr>
      </tbody>
    </table>
  </Panel2>
</template>

<script setup>
import Panel2 from "@/components/panel/Panel2.vue";
defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="scss">
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
</style>
