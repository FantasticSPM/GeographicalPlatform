import * as Cesium from "cesium";
import { getPublicUrl, mergeDeep } from "./common";
import defaultImage from "@/assets/image/earthquake.png?inline";

export function flyToLookAt(viewer, target, hpr, options = {}) {
  const camera = viewer.camera;

  // 保存当前相机
  const oldPosition = camera.positionWC.clone();
  const oldDirection = camera.directionWC.clone();
  const oldUp = camera.upWC.clone();

  // 临时使用 lookAt 计算目标相机状态
  camera.lookAt(target, hpr);

  const destination = camera.positionWC.clone();
  const direction = camera.directionWC.clone();
  const up = camera.upWC.clone();

  // 恢复
  camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  camera.setView({
    destination: oldPosition,
    orientation: {
      direction: oldDirection,
      up: oldUp,
    },
  });

  // 飞过去
  camera.flyTo({
    destination,
    orientation: {
      direction,
      up,
    },
    duration: options.duration ?? 3,
  });
}

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
      offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 7000),
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

const circles = new Map();
const defaultCircleColor = new Cesium.Color(1.0, 0.85, 0.0, 1.0);

/**
 * 创建循环扩散的同心圆。
 *
 * 第三个参数可以继续传入 Cesium.Color，也可以传入配置对象：
 * createCircle(viewer, data, {
 *   color: Cesium.Color.YELLOW,
 *   maxRadius: 30000,
 *   duration: 2400,
 *   ringCount: 3,
 *   timeSpeed: 0.005,
 * })
 */
export function createCircle(viewer, data, colorOrOptions, maybeOptions = {}) {
  const options = normalizeCircleOptions(colorOrOptions, maybeOptions);
  const { longitude, latitude, height = 0, radius } = data;

  const id = options.id ?? `circle-${data.id ?? Cesium.createGuid()}`;
  const maxRadius = Math.max(
    1,
    toFiniteNumber(options.maxRadius ?? radius, 50000),
  );
  const minRadius = Math.min(
    maxRadius - 0.01,
    Math.max(0, toFiniteNumber(options.minRadius, maxRadius * 0.04)),
  );
  const duration = Math.max(250, toFiniteNumber(options.duration, 2800));
  const frameRate = Math.max(1, toFiniteNumber(options.frameRate, 60));
  const timeSpeed = Math.max(
    0,
    toFiniteNumber(options.timeSpeed, 1000 / (duration * frameRate)),
  );
  const ringCount = Math.min(
    6,
    Math.max(1, Math.floor(toFiniteNumber(options.ringCount, 3))),
  );
  const color = toCesiumColor(options.color, defaultCircleColor);
  const fillAlpha = clamp(toFiniteNumber(options.fillAlpha, 0.06), 0, 1);
  const ringAlpha = clamp(toFiniteNumber(options.ringAlpha, 0.95), 0, 1);
  const ringWidth = clamp(
    toFiniteNumber(options.ringWidth, 0.018),
    0.001,
    0.12,
  );

  removeCircle(viewer, id);

  const center = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
  const geometry = new Cesium.EllipseGeometry({
    center,
    semiMajorAxis: maxRadius,
    semiMinorAxis: maxRadius,
    height: 1,
    vertexFormat:
      Cesium.MaterialAppearance.MaterialSupport.TEXTURED.vertexFormat,
  });

  const material = new Cesium.Material({
    fabric: {
      type: "RippleCircle",
      uniforms: {
        color,
        minRadius: minRadius / maxRadius,
        ringCount,
        ringWidth,
        fillAlpha,
        ringAlpha,
        timeSpeed,
      },
      source: `
        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;

            // 将当前片元到圆心的距离归一化到 0~1。
            float distanceFromCenter = distance(st, vec2(0.5)) / 0.5;
            float ripple = 0.0;
            float core = 0.0;

            // czm_frameNumber 在每次渲染时递增，动画完全由 GPU 驱动。
            float time = czm_frameNumber * timeSpeed;

            // 每个波纹拥有不同相位，因此始终能看到多个同心圆。
            for (int i = 0; i < 6; i++) {
                if (float(i) >= ringCount) {
                    break;
                }

                float phase = float(i) / ringCount;
                float progress = fract(time + phase);
                float ringRadius = minRadius + progress * (1.0 - minRadius);
                float distanceToRing = abs(distanceFromCenter - ringRadius);

                float currentRipple = 1.0 - smoothstep(
                    ringWidth,
                    ringWidth * 3.5,
                    distanceToRing
                );
                float currentCore = 1.0 - smoothstep(
                    ringWidth * 0.15,
                    ringWidth * 0.5,
                    distanceToRing
                );

                ripple = max(ripple, currentRipple);
                core = max(core, currentCore);
            }

            // 轻微填充地图，主要亮度集中在扩散边缘。
            float fill = (1.0 - smoothstep(0.0, 1.0, distanceFromCenter)) * fillAlpha;
            float alpha = clamp(fill + ripple * ringAlpha, 0.0, 1.0);

            material.diffuse = color.rgb;
            material.emission = color.rgb * (ripple * 1.35 + core * 0.65);
            material.alpha = alpha;
            return material;
        }
      `,
    },
  });

  const primitive = viewer.scene.primitives.add(
    new Cesium.GroundPrimitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry,
      }),
      appearance: new Cesium.MaterialAppearance({
        material,
        translucent: true,
        faceForward: true,
      }),
    }),
  );

  // 不需要通过 scene.preUpdate 修改 uniform。默认 requestRenderMode=false，
  // Cesium 会持续渲染，czm_frameNumber 也会持续递增。
  // 如果外部开启了 requestRenderMode，则需要由外部持续调用 scene.requestRender()。
  circles.set(id, primitive);

  return {
    id,
    primitive,
  };
}

export function removeCircle(viewer, id) {
  const circle = circles.get(id);
  if (!circle) return;

  if (!circle.isDestroyed()) {
    viewer.scene.primitives.remove(circle);
  }
  circles.delete(id);
}

function normalizeCircleOptions(colorOrOptions, maybeOptions) {
  if (colorOrOptions == null) {
    return {
      ...maybeOptions,
    };
  }

  if (
    colorOrOptions instanceof Cesium.Color ||
    typeof colorOrOptions === "string"
  ) {
    return {
      ...maybeOptions,
      color: colorOrOptions,
    };
  }

  return colorOrOptions ?? {};
}

function toCesiumColor(value, fallback) {
  if (value instanceof Cesium.Color) {
    return value.clone();
  }
  if (typeof value === "string") {
    return Cesium.Color.fromCssColorString(value);
  }
  return fallback.clone();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toFiniteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}
