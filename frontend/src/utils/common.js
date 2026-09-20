// 获取公共资源路径
export function getPublicUrl(path) {
  if (path.startsWith("/")) {
    path = `.${path}`;
  }
  const baseUrl = import.meta.env.BASE_URL;
  const url = new URL(baseUrl, import.meta.url).href;

  return new URL(path, url).href;
}

/**
 * 深度合并
 * @param {*} target 源对象
 * @param {*} source 要合并的对象
 * @returns {*} 合并完之后的值
 */
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

/**
 * 去除对象中的空字段
 * @param {object} obj 对象
 * @returns {object} 去除空字段的对象
 */
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

/**
 * 复制文字
 * @param {string} text
 * @returns
 */
export async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    writeClipboard = async function (text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // Fall back to the legacy API when clipboard permissions are unavailable.
      }
    };
    return;
  }

  writeClipboard = function (text) {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    try {
      input.select();
      if (!document.execCommand("copy")) throw new Error("copy failed");
    } finally {
      input.remove();
    }
  };
  writeClipboard(text);
}
