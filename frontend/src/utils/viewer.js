import * as Cesium from "cesium";
import { getPublicUrl } from "./common";

const billboards = new Map();
export function addBillboards(
  viewer,
  data,
  style = {
    image: getPublicUrl("/images/earthquake.png"),
    scale: 0.2,
  },
  id = Cesium.createGuid(),
  fly = true,
) {
  const billboardCollection = new Cesium.BillboardCollection({
    scene: viewer.scene,
  });
  viewer.scene.primitives.add(billboardCollection);
  billboards.set(id, billboardCollection);

  function addBillboard(data) {
    const { longitude, latitude, height = 0 } = data;
    console.log(style);
    const billboard = billboardCollection.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
      image: style.image,
      scale: style.scale,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
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
