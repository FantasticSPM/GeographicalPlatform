# 地理空间资源信息平台

GeographicalPlatform 是一个面向地理数据浏览、空间分析和专题信息展示的 Web 平台。项目采用 Vue 3 + Vite 构建前端，NestJS + TypeORM 构建后端，提供二维/三维地图、地理数据导入、地震专题、用户认证和平台信息等能力。

> 项目当前处于持续开发阶段。地图展示、用户认证和地震数据读取链路已接入；部分业务模块仍是前端演示或占位实现。

## 功能概览

- **门户与平台信息**：首页门户、新闻公告、服务条款、关于平台和用户中心。
- **空间信息**：基于 MapLibre GL 的二维地图，支持资源目录、底图切换、行政区划边界、定位、全屏、打印、标绘和量算工具。
- **底图与行政区划**：高德卫星/矢量、ArcGIS 卫星/矢量底图；行政区划边界通过 GeoJSON 数据加载。
- **本地空间数据**：在浏览器中导入 GeoJSON/JSON，自动识别点、线、面并加载到地图，可修改颜色、定位和移除图层。
- **地震专题**：基于 Cesium 的三维地球、最新地震列表、地震详情和地震新闻；数据由后端抓取中国地震台网公开页面并做短时缓存。
- **天气与特色专题**：天气信息页面和专题入口页面，部分内容目前为演示数据或外部链接。
- **账号体系**：注册、登录、退出、退出全部会话、当前用户信息和基于 HttpOnly Cookie 的 Access/Refresh Token 会话续期。

## 技术栈

### 前端

- Vue 3、Vue Router 5、Pinia 4
- Vite 8、Sass Embedded
- Element Plus、`@element-plus/icons-vue`
- MapLibre GL 6（二维地图）
- Cesium 1.145（三维地球）
- Turf.js（空间计算工具）
- Axios（HTTP 请求）

### 后端

- Node.js、NestJS 12、TypeScript 6
- TypeORM、PostgreSQL、`pg`
- Passport、JWT、Cookie Parser
- `class-validator` / `class-transformer`
- Axios + Cheerio（抓取并解析地震公开数据）
- Vitest、Supertest、oxlint

## 项目结构

```text
.
├── frontend/                         # Vue 3 + Vite 前端
│   ├── public/                       # Cesium 和地图静态资源、图标、图片
│   └── src/
│       ├── apis/                     # 后端及在线数据接口
│       ├── assets/                   # 样式、Logo、本地 GeoJSON 数据
│       ├── components/               # 地图、面板、工具栏和通用组件
│       ├── router/                   # Vue Router 路由
│       ├── stores/                   # Pinia 状态管理
│       ├── utils/                    # 地图、请求、全屏等工具
│       └── views/                    # 门户、空间信息、地震、天气、用户等页面
├── backend/                          # NestJS + TypeORM 后端
│   ├── src/auth/                     # 注册、登录、会话和 JWT 守卫
│   ├── src/earthquake/               # 地震列表、详情和新闻接口
│   ├── src/common/                   # 全局异常过滤器、响应拦截器和工具
│   └── test/                         # E2E 测试
└── .github/workflows/deploy.yml      # 前端 GitHub Pages 部署工作流
```

## 环境要求

- Node.js `22.18+`，或 `24.12+`
- pnpm `11.x`
- PostgreSQL（后端默认连接本机 `5432` 端口）
- 可访问互联网的浏览器环境（地图瓦片、行政区划、地震数据来自外部服务）

前端 `package.json` 已声明 Node.js 引擎范围；建议使用与 CI 一致的 Node.js 22 和 pnpm 11。

## 快速开始

### 1. 准备数据库

创建后端默认使用的数据库：

```sql
CREATE DATABASE geographicalplatform;
```

当前数据库连接参数直接写在 `backend/src/app.module.ts` 中：

```text
host: localhost
port: 5432
username: postgres
password: admin
database: geographicalplatform
```

如本机 PostgreSQL 用户名、密码或数据库地址不同，请先修改该文件。应用启用了 TypeORM `synchronize: true`，仅建议用于本地开发环境。

### 2. 启动后端

```bash
cd backend
pnpm install
pnpm start:dev
```

后端默认监听 `http://localhost:3000`，也可以通过 `PORT` 环境变量修改端口。

### 3. 启动前端

另开一个终端：

```bash
cd frontend
pnpm install
pnpm dev
```

开发服务器默认地址为 `http://localhost:5173`。前端开发环境配置位于 `frontend/.env.development`：

```dotenv
VITE_BASE_URL=/
VITE_API_URL=http://localhost:3000
VITE_TITLE=地理空间资源信息平台
```

如需覆盖本地配置，可创建 `frontend/.env.local`。修改环境变量后需要重启 Vite 开发服务器。

## 常用命令

### 前端

```bash
cd frontend
pnpm dev       # 启动开发服务器
pnpm build     # 构建生产版本
pnpm preview   # 预览构建产物
```

### 后端

```bash
cd backend
pnpm start:dev  # 监听模式启动
pnpm start       # 普通启动
pnpm start:prod  # 启动 dist/main.js
pnpm build       # 编译到 dist/
pnpm lint        # oxlint 检查
pnpm test        # 单元测试
pnpm test:e2e    # E2E 测试
pnpm test:cov    # 覆盖率
```

## 主要页面路由

| 路径 | 页面 |
| --- | --- |
| `/`、`/index` | 门户首页 |
| `/geology/catalog` | 空间信息 / 资源目录 |
| `/geology/upload` | 空间数据导入 |
| `/earthquake` | 地震三维专题 |
| `/weather` | 天气信息 |
| `/theme` | 特色专题 |
| `/help/news` | 新闻公告 |
| `/help/service` | 服务条款 |
| `/help/about` | 关于平台 |
| `/login`、`/register` | 登录、注册 |
| `/user` | 用户中心 |

## 后端接口概览

所有成功响应由全局拦截器包装为 `{ code, message, data, success, timestamp, path }`；异常响应也会统一返回 JSON。认证接口使用 Cookie 保存令牌，前端请求已开启 `withCredentials`。

| 方法 | 路径 | 认证 | 说明 |
| --- | --- | --- | --- |
| `GET` | `/` | 否 | 服务连通性检查 |
| `POST` | `/auth/register` | 否 | 注册用户 |
| `POST` | `/auth/login` | 否 | 登录并写入会话 Cookie |
| `POST` | `/auth/refresh` | Refresh Cookie | 刷新令牌 |
| `POST` | `/auth/logout` | Access Token | 退出当前会话 |
| `POST` | `/auth/logoutAll` | Access Token | 注销当前用户的全部会话 |
| `GET` | `/auth/me` | Access Token | 获取当前用户 |
| `GET` | `/earthquake/list` | Access Token | 获取最新地震列表 |
| `GET` | `/earthquake/news` | Access Token | 获取地震新闻 |
| `POST` | `/earthquake` | Access Token | 创建地震记录（当前为占位实现） |

地震详情、更新和删除接口在控制器中当前声明为 `list:id`，而前端调用约定为 `/earthquake/list/:id`；如需启用详情、更新或删除，请先统一该路由定义。

## 构建与部署

### 本地生产构建

```bash
cd frontend
pnpm build
pnpm preview
```

生产配置 `frontend/.env.production` 默认使用：

```dotenv
VITE_BASE_URL=/GeographicalPlatform/
VITE_API_URL=http://localhost:3000
```

部署到正式环境前，请将 `VITE_API_URL` 改成可从浏览器访问的后端地址；不能继续使用 `localhost`，否则线上页面无法调用后端。

### GitHub Pages

推送到 `main` 分支且 `frontend/**` 或工作流发生变化时，`.github/workflows/deploy.yml` 会：

1. 使用 Node.js 22 和 pnpm 11 安装前端依赖；
2. 执行 `pnpm build`；
3. 将 `dist/index.html` 复制为 `dist/404.html`，兼容 Vue Router history 模式；
4. 将 `frontend/dist` 发布到 `gh-pages` 分支。

该工作流只部署前端，不会部署 NestJS 后端。启用 GitHub Pages 前，请将发布源设置为 `gh-pages` 分支，并确认 Cesium 静态资源和后端 CORS 配置允许正式域名访问。

## 外部数据与授权注意事项

- 高德和 ArcGIS 底图瓦片、Cesium World Terrain、阿里云 DataV 行政区划接口以及中国地震台网页面均属于外部服务，使用时应遵守对应服务条款、调用频率和署名要求。
- 地图和地震页面依赖网络；外部服务不可用时，相关图层或数据可能无法加载。
- 当前数据库连接信息和 JWT 密钥位于源码中，正式环境必须迁移到环境变量或密钥管理服务，并更换默认密钥。
- 登录 Cookie 在生产环境会根据 `NODE_ENV=production` 设置 `secure` 属性；正式部署应使用 HTTPS。

## 当前限制

- 空间数据导入目前主要在浏览器内解析和管理，不会上传到后端或持久化到数据库；界面虽预留 ZIP/TIFF 类型，当前实际解析逻辑主要支持 GeoJSON/JSON。
- “空间分析”面板和部分特色专题仍为演示/占位内容。
- 地震数据由后端抓取公开网页并缓存约 5 分钟，源站页面结构变化可能导致解析失败。
- 后端 TypeORM 使用 `synchronize: true`，尚未提供生产级迁移脚本和完整的环境变量配置。

## 开发约定

- 新增前端页面放在 `frontend/src/views/`，并在 `frontend/src/router/index.js` 注册路由。
- 地图图层加载、定位、移除和样式更新优先复用 `frontend/src/utils/map.js`。
- 后端新增业务模块时，在 `backend/src/` 下创建模块、控制器、服务、DTO 和实体，并在 `app.module.ts` 中注册。
- 提交前至少执行前端 `pnpm build` 和后端 `pnpm lint`；涉及后端接口时补充测试。

## 许可证

仓库当前未声明开源许可证。若要公开发布或二次分发，请补充许可证文件，并确认第三方地图、地形和数据服务的授权范围。
