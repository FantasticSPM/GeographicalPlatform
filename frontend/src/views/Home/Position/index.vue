<template>
  <div class="position-container">
    <Map3D />

    <PositionList></PositionList>
    <PositionPicker></PositionPicker>
    <AdministrativeOutline
      class="administrative-outline"
    ></AdministrativeOutline>
  </div>
</template>

<script setup>
import Map3D from "@/components/map/Map3D/Map3D.vue";
import PositionList from "./components/PositionList.vue";
import PositionPicker from "./components/PositionPicker.vue";
import AdministrativeOutline from "@/components/map/Map3D/AdministrativeOutline.vue";
</script>

<style scoped lang="scss">
.position-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
}

.administrative-outline {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
</style>
