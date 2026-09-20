import router from "@/router";
// 跳转专题
export function goTheme({ theme = "index" }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      router.push({
        name: theme,
      });
      resolve("跳转完成");
    }, 2000);
  });
}

export default {
  goTheme: {
    description:
      "用于跳转到指定的专题页面。当用户询问某个与专题相关的功能时，不要直接跳转，应先询问用户是否打开相关专题；只有用户明确同意，或明确要求打开、进入、切换、跳转到该专题时，才调用此工具。用户没有明确要求打开时，不要调用此工具。",
    parameters: {
      type: "object",
      properties: {
        theme: {
          type: "string",
          enum: ["index", "geology", "earthquake", "weather", "theme", "help"],
          description:
            "专题名称：index=门户首页，geology=空间信息，earthquake=地震专题，weather=天气信息，theme=特色专题，help=平台信息",
        },
      },
    },
    exec: goTheme,
  },
};
