<template>
  <Panel2
    closable
    eyebrow="Earthquake Details"
    title="地震详情"
    class="details"
    @close="$emit('close')"
  >
    <div class="details__headline">
      <span class="details__signal" aria-hidden="true"><i></i></span>
      <div class="details__headline-copy">
        <span class="details__headline-label">SELECTED EVENT</span>
        <h3>{{ data.content || "未知地震位置" }}</h3>
      </div>
    </div>

    <div class="details__metrics">
      <div class="details__metric details__metric--magnitude">
        <span>震级</span>
        <strong>M {{ data.magnitude ?? "-" }}</strong>
      </div>
      <div class="details__metric">
        <span>震源深度</span>
        <strong>{{ data.depth ?? "-" }}<small> km</small></strong>
      </div>
    </div>

    <div class="details__section-title">事件信息</div>
    <table aria-label="地震事件详细信息">
      <tbody>
        <tr>
          <th scope="row">时间</th>
          <td>{{ data.detailTime || "-" }}</td>
        </tr>
        <tr>
          <th scope="row">经度</th>
          <td>{{ data.longitude ?? "-" }}°</td>
        </tr>
        <tr>
          <th scope="row">纬度</th>
          <td>{{ data.latitude ?? "-" }}°</td>
        </tr>
        <tr>
          <th scope="row">地点</th>
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
  right: 16px;
  z-index: 2;

  width: min(380px, calc(100vw - 32px)) !important;

  :deep(.panel2__header) {
    padding-bottom: 14px;
  }

  :deep(.panel2__body) {
    padding: 14px 18px 20px;
  }

  &__headline {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-width: 0;
    padding: 2px 0 16px;
    border-bottom: 1px solid rgba(109, 191, 220, 0.16);
  }

  &__signal {
    position: relative;
    display: inline-flex;
    width: 28px;
    height: 28px;
    flex: none;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    border: 1px solid rgba(247, 174, 92, 0.42);
    border-radius: 50%;
    background: rgba(184, 105, 44, 0.14);

    &::before,
    &::after,
    i {
      position: absolute;
      display: block;
      border: 1px solid rgba(248, 179, 95, 0.74);
      border-radius: 50%;
      content: "";
    }

    &::before {
      width: 15px;
      height: 15px;
    }

    &::after {
      width: 7px;
      height: 7px;
      background: #f0a257;
      box-shadow: 0 0 8px rgba(240, 162, 87, 0.65);
    }

    i {
      width: 23px;
      height: 23px;
      border-color: rgba(248, 179, 95, 0.3);
    }
  }

  &__headline-copy {
    min-width: 0;
  }

  &__headline-label {
    display: block;
    margin-bottom: 5px;
    color: #79c8e4;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    line-height: 1.2;
  }

  h3 {
    margin: 0;
    color: #e8f7ff;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    overflow-wrap: anywhere;
    word-break: break-word;
    white-space: normal;
  }

  &__metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    padding: 16px 0 18px;
  }

  &__metric {
    min-width: 0;
    padding: 10px 12px;
    border: 1px solid rgba(104, 178, 205, 0.17);
    border-radius: 3px;
    background: rgba(30, 75, 96, 0.2);

    span {
      display: block;
      margin-bottom: 7px;
      color: #7f9bad;
      font-size: 11px;
    }

    strong {
      display: block;
      overflow: hidden;
      color: #d7edf5;
      font-size: 19px;
      font-weight: 600;
      line-height: 1.1;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    small {
      color: #9bb8c5;
      font-size: 11px;
      font-weight: 400;
    }
  }

  &__metric--magnitude {
    border-color: rgba(235, 157, 77, 0.32);
    background: rgba(136, 79, 37, 0.17);

    strong {
      color: #ffc37e;
    }
  }

  &__section-title {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 5px;
    color: #92b6c5;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;

    &::after {
      height: 1px;
      flex: 1;
      background: rgba(109, 191, 220, 0.16);
      content: "";
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid rgba(126, 185, 207, 0.1);

      &:last-child {
        border-bottom: 0;
      }
    }

    th,
    td {
      padding: 10px 4px;
      line-height: 1.4;
    }

    th {
      width: 70px;
      color: #7898a7;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
    }

    td {
      overflow: hidden;
      color: #c8dce4;
      font-size: 13px;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

@media (max-width: 560px) {
  .details {
    top: 84px;
    right: 16px;
    left: 16px;
    width: auto !important;
  }
}
</style>
