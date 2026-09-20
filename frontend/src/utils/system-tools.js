import router from "@/router";
// 跳转专题
export function goTheme({ theme = "index" }) {
  router.push({
    name: theme,
  });
  return "跳转完成";
}

export default {
  goTheme: {
    description: "跳转专题",
    parameters: {
      type: "object",
      properties: {
        theme: {
          type: "string",
          description:
            "专题名称,目前门户首页，专题名称为'index',空间信息为'geology',地震专题为'earthquake',天气信息为'weather',特色专题为'theme'，平台信息为'help",
        },
      },
    },
    exec: goTheme,
  },
};
