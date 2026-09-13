import * as Cesium from "cesium";
import { getPublicUrl, mergeDeep } from "./common";
import defaultImage from "@/assets/image/earthquake.png?inline";

const billboards = new Map();
export function addBillboards(
  viewer,
  data,
  style = {},
  id = Cesium.createGuid(),
  fly = true,
) {
  const defaultStyle = {
    image: defaultImage,
    scale: 0.2,
  };
  style = mergeDeep(defaultStyle, style);

  const billboardCollection = new Cesium.BillboardCollection({
    scene: viewer.scene,
  });
  viewer.scene.primitives.add(billboardCollection);
  billboards.set(id, billboardCollection);

  function addBillboard(data) {
    const { longitude, latitude, height = 0 } = data;

    const billboard = billboardCollection.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
      image: style.image,
      scale: style.scale,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      ...style,
    });
    return billboard;
  }

  const positions = [];
  if (Array.isArray(data)) {
    data.forEach((item) => {
      const billboard = addBillboard(item);
      positions.push(billboard.position);
    });
    return billboardCollection;
  } else if (typeof data === "object") {
    const billboard = addBillboard(data);
    positions.push(billboard.position);
  }

  if (fly) {
    const boundingSphere = new Cesium.BoundingSphere();
    Cesium.BoundingSphere.fromPoints(positions, boundingSphere);

    viewer.camera.flyToBoundingSphere(boundingSphere, {
      offset: new Cesium.HeadingPitchRange(
        0,
        Cesium.Math.toRadians(-45),
        100000,
      ),
    });
  }
  return {
    id,
    billboardCollection,
  };
}

export function removeBillboards(viewer, id) {
  const billboardCollection = billboards.get(id);
  if (billboardCollection) {
    billboardCollection.removeAll();
    billboards.delete(id);
    viewer.scene.primitives.remove(billboardCollection);
  }
}

const labels = new Map();
export function addLabels(
  viewer,
  data,
  style = {
    image: defaultImage,
    scale: 1,
  },
  id = Cesium.createGuid(),
  fly = false,
) {
  const labelCollection = new Cesium.LabelCollection({
    scene: viewer.scene,
  });
  viewer.scene.primitives.add(labelCollection);
  labels.set(id, labelCollection);

  function addLabel(data) {
    const { longitude, latitude, height = 0 } = data;

    const label = labelCollection.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
      text: data.text,
      font: "15px sans-serif",
      scale: style.scale,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      ...style,
    });
    return label;
  }

  const positions = [];
  if (Array.isArray(data)) {
    data.forEach((item) => {
      const label = addLabel(item);
      positions.push(label.position);
    });
    return labelCollection;
  } else if (typeof data === "object") {
    const label = addLabel(data);
    positions.push(label.position);
  }

  if (fly) {
    const boundingSphere = new Cesium.BoundingSphere();
    Cesium.BoundingSphere.fromPoints(positions, boundingSphere);

    viewer.camera.flyToBoundingSphere(boundingSphere, {
      offset: new Cesium.HeadingPitchRange(
        0,
        Cesium.Math.toRadians(-45),
        100000,
      ),
    });
  }

  return {
    id,
    labelCollection,
  };
}

export function removeLabels(viewer, id) {
  const labelCollection = labels.get(id);
  if (labelCollection) {
    labelCollection.removeAll();
    labels.delete(id);
    viewer.scene.primitives.remove(labelCollection);
  }
}
