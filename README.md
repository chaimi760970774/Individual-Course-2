# Individual Course 2 — 视频评分实验

实验流程：**Demographics → Part1（4 个视频，7 点量表评分）→ 完成页**。

- 前端：React + Vite + react-router（HashRouter），部署在 GitHub Pages
- 后端：Express 5 + MongoDB 官方驱动，负责保存视频顺序和实验结果
- 视频：存放在 Firebase Storage，前端只使用公开下载 URL

## 项目结构

```
.
├── Individual Course 2/          # 前端（Vite 项目，目录名带空格）
│   ├── src/
│   │   ├── reactjs/              # Presenter：ReactRoot（路由）、demographics、part1、complete
│   │   ├── views/                # View：纯展示组件
│   │   └── data/                 # 数据和逻辑
│   │       ├── part1Data.js              # 4 个视频（motion / condition）
│   │       ├── experimentData.js         # PART1_DIMENSIONS、量表大小
│   │       ├── monteCarloRandomization.js# Monte Carlo 随机化 + 被试间平衡
│   │       ├── saveData.js               # 提交结果到后端
│   │       └── api.js                    # 后端地址（VITE_API_URL）
│   ├── .env.example
│   └── vite.config.js            # base: /Individual-Course-2/
├── server/                       # 后端
│   ├── db.js                     # MongoDB 连接
│   ├── index.js                  # 路由、CORS、输入校验
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml            # 本地 mongo + backend
└── .github/workflows/deploy.yml  # 前端自动部署到 GitHub Pages
```

## 后端接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/orders/part1` | 返回已有的所有视频顺序 `[{ videoOrder: [id...] }]`，用于计算平衡分数 |
| POST | `/api/orders/part1` | 保存新顺序，body：`{ videoOrder: [id...] }` |
| POST | `/api/results/part1` | 保存结果，body：`{ participantInfo, ratings: [...] }` |
| GET | `/api/health` | 健康检查 |

MongoDB 集合：`part1_orders`（`videoOrder`, `createdAt`）和 `part1_results`（`participantInfo`, `ratings`, `completedAt`）。时间戳由服务端生成。`ratings` 每行包含 `order`, `motion`, `condition`, `videoId` 和四个维度（`valence`, `trustworthy`, `relationship`, `dominance`），结构与上一轮 Firestore 数据一致。非法请求返回 400。

## 环境变量

**后端**（`server/.env`，参考 `server/.env.example`）

| 变量 | 说明 |
| --- | --- |
| `MONGODB_URI` | MongoDB 连接串。本地如 `mongodb://localhost:27018/individual_course`；可直接换成 Atlas 的 `mongodb+srv://...` |
| `MONGODB_DB` | 可选，数据库名（连接串里没有 `/<数据库名>` 时使用） |
| `PORT` | 监听端口，默认 3000 |
| `ALLOWED_ORIGIN` | CORS 允许的前端来源，多个用逗号分隔，只写协议+域名，例如 `https://<用户名>.github.io`。留空时只允许 `http://localhost:*` / `http://127.0.0.1:*` |

**前端**（`Individual Course 2/.env`，参考 `.env.example`）

| 变量 | 说明 |
| --- | --- |
| `VITE_API_URL` | 后端地址，不带末尾斜杠，例如 `http://localhost:3000`。构建时写入前端代码 |

所有 `.env` 文件都已加入 `.gitignore`，不要把密码或连接串提交到仓库。

## 本地运行

需要 Node.js 22（≥ 20.19）和 Docker。

**1. 启动后端和数据库（一条命令）**

```bash
docker compose up -d --build
```

- 后端：http://localhost:3000（健康检查 `/api/health`）
- MongoDB：`localhost:27018`
- 端口被占用时可以改：`BACKEND_PORT=3010 MONGO_PORT=27028 docker compose up -d --build`
- 想让本地后端直接连 Atlas：`MONGODB_URI="mongodb+srv://..." docker compose up -d --build backend`（或写在根目录 `.env` 里）
- 停止：`docker compose down`（加 `-v` 会同时删除本地数据库数据）

也可以不用 Docker 跑后端：

```bash
cd server
cp .env.example .env    # 按需修改 MONGODB_URI
npm install
npm run dev
```

**2. 启动前端**

```bash
cd "Individual Course 2"
cp .env.example .env    # 后端端口不是 3000 时修改 VITE_API_URL
npm install
npm run dev
```

打开终端里显示的地址（因为设置了 base，路径是 `/Individual-Course-2/`）。

## 部署前端到 GitHub Pages

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会在 `Individual Course 2/` 下执行 `npm ci` 和 `npm run build`，然后把 `dist` 部署到 GitHub Pages。

首次部署前需要在 GitHub 仓库里设置两处：

1. **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. **Settings → Secrets and variables → Actions → Variables** 标签页，点击 **New repository variable**，添加 `VITE_API_URL`，值为已部署的后端地址（例如 `https://your-backend.example.com`）。未设置时 workflow 会直接报错停止。

部署后的地址为 `https://<用户名>.github.io/Individual-Course-2/`。记得把 `https://<用户名>.github.io` 加到后端的 `ALLOWED_ORIGIN`，否则浏览器会因 CORS 拦截请求。

后端需单独部署（可使用 `server/Dockerfile`），并把 `MONGODB_URI` 设置为 MongoDB Atlas 连接串。
