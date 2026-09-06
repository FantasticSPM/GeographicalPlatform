# GeographicalPlatform

地理空间资源信息平台（Geographical Spatial Resource Information Platform）是一个面向地图、地理数据和环境信息的 Web 可视化项目。平台以统一的空间入口组织地理信息、地震专题、天气信息、特色专题和平台资讯，支持桌面端与移动端访问。

> 当前仓库以 Vue 3 前端为主，`backend/` 目录暂未实现具体后端服务。

## 功能概览

- **门户首页**：展示平台介绍、核心模块入口和平台概览。
- **空间信息**：基于 MapLibre GL 的二维地图能力，支持地图工具栏、底图切换、定位、测量、绘制和打印等交互；地理数据页面提供目录与地理矢量数据（GeoJSON）上传入口。
- **三维地图与特色专题**：基于 Cesium 展示三维地球，并预留交通、可视化等专题场景入口。
- **地震专题**：提供地震专题信息页面及相关资讯展示。
- **天气信息**：提供天气信息查看入口。
- **平台信息**：提供新闻公告、帮助和服务信息页面。
- **用户入口**：提供登录、注册页面（后端鉴权接口尚待接入）。
- **响应式布局**：导航栏和主要页面适配桌面端、平板及移动端。

## 技术栈

- Vue 3、Vue Router、Pinia
- Vite 8
- Element Plus 与 `@element-plus/icons-vue`
- MapLibre GL（二维地图）
- Cesium（二维/三维地球场景中的三维地图能力）
- Turf.js（地理空间计算）
- Axios（HTTP 请求）
- Sass Embedded

## 项目结构

```text
.
├── frontend/                  # Vue 3 + Vite 前端应用
│   ├── public/                # 图片、地图图标等静态资源
│   ├── src/
│   │   ├── apis/              # 外部数据接口封装
│   │   ├── components/        # 地图、布局、通用组件
│   │   ├── router/            # 路由配置
│   │   ├── stores/            # Pinia 状态
│   │   ├── utils/             # 地图及通用工具
│   │   └── views/             # 门户、空间信息、天气等业务页面
│   ├── package.json
│   └── vite.config.js
├── backend/                   # 后端预留目录
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages 自动部署流程
└── README.md
```

## 环境要求

- Node.js `22.18+`（或 `24.12+`）
- pnpm `11.x`
- 可访问互联网的浏览器环境（部分地图底图、天气/资讯数据依赖外部服务）

## 本地运行

在前端目录执行：

```bash
cd frontend
pnpm install
pnpm dev
```

开发服务器启动后，按终端提示打开本地地址（通常为 `http://localhost:5173`）。

## 构建与预览

```bash
cd frontend
pnpm build
pnpm preview
```

生产构建默认使用 `/GeographicalPlatform/` 作为 Vite base 路径，以适配 GitHub Pages 项目站点。

## 自动部署

`.github/workflows/deploy.yml` 会在 `main` 分支中 `frontend/**` 或工作流文件发生变更时执行：

1. 使用 Node.js 22 和 pnpm 11 安装依赖；
2. 执行 `pnpm build` 构建前端；
3. 将 `dist/index.html` 复制为 `dist/404.html`，兼容 Vue Router 的 history 路由刷新；
4. 将构建产物发布到 `gh-pages` 分支。

启用部署前，请在仓库设置中开启 GitHub Pages，并将发布源设置为 `gh-pages` 分支。

## 外部数据与配置说明

- 部分地图服务使用高德地图瓦片或 Cesium 世界地形服务，实际部署时请根据服务条款、配额和跨域策略配置对应服务。
- 地理行政区 GeoJSON 接口目前封装在 `frontend/src/apis/online.js` 中，使用阿里云 DataV 行政区数据接口。
- 如需接入正式后端，请在 `backend/` 中补充服务实现，并将登录、注册、天气、地震及业务数据请求统一迁移到后端接口。

## 开发建议

- 新增页面时，在 `frontend/src/views/` 创建业务目录，并在 `frontend/src/router/index.js` 注册路由。
- 地图图层操作优先复用 `frontend/src/utils/map.js` 中的 GeoJSON 加载、定位、移除和样式更新方法。
- 提交前执行 `pnpm build`，确认生产环境下 `/GeographicalPlatform/` base 路径和 Cesium 静态资源均能正常加载。

## 当前状态

前端核心页面和地图组件已搭建完成；后端服务、用户鉴权、部分实时数据接口和生产环境密钥管理仍需按部署场景继续完善。

## 许可证

仓库当前未声明开源许可证。如需对外发布或二次分发，请先补充许可证文件及第三方地图数据的授权说明。
