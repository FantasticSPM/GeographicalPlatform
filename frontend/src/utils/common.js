export function getPublicUrl(path) {
  if (path.startsWith("/")) {
    path = `.${path}`;
  }
  const baseUrl = import.meta.env.BASE_URL;
  const url = new URL(baseUrl, import.meta.url).href;

  return new URL(path, url).href;
}

export function mergeDeep(target, source) {
  if (typeof target !== "object" || typeof source !== "object") {
    return source;
  }

  for (const key in source) {
    if (source[key] instanceof Object) {
      if (!target[key]) {
        target[key] = {};
      }
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

export function removeEmptyFields(obj) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && value !== "",
    ),
  );
}
