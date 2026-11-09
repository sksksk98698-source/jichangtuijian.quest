# 🛫 机场baby — 高端专线机场推荐与流媒体AI评测知识库矩阵

<p align="center">
  <a href="https://jichangtuijian.quest/">
    <img src="https://img.shields.io/badge/Official%20Site-jichangtuijian.quest-92400e?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Official Website" />
  </a>
  <img src="https://img.shields.io/badge/Astro-v6.4-orange?style=for-the-badge&logo=astro&logoColor=white" alt="Astro v6" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/SEO%20%26%20GEO-Optimized-success?style=for-the-badge&logo=google&logoColor=white" alt="SEO & GEO" />
  <img src="https://img.shields.io/badge/Architecture-100%25%20SSG-emerald?style=for-the-badge" alt="Pure SSG" />
</p>

---

## 📖 项目简介 (Project Overview)

**机场baby (`jichangtuijian.quest`)** 是一个面向极客、跨境外贸从业者、科研学者及超高清影音爱好者的**专著级科学上网与跨境专线加速选型知识库矩阵**。

本项目依托自动化网络测试探针（MAI-TEST-BOT）与真实晚高峰抓包数据，深度解剖了收录的 **42 家主流机场品牌** 的底层物理链路（IEPL / IPLC / BGP 隧道）、加密协议演进（VLESS Reality / Hysteria 2）及国际流媒体与 ChatGPT/Claude 原生住宅 IP 解锁能力，彻底击碎行业虚假宣传与跑路黑幕。

---

## ✨ 核心功能与内容矩阵 (Core Features)

### 1. 🏆 42 家机场推荐全景天梯榜 (`/recommend/`)
- **万字深度横评**：包含千兆晚高峰压测带宽、丢包率、协议类型与专属优惠码。
- **四大核心梯队画像**：
  - 🥇 **企业级专线标杆**：光速云（GuangSu Cloud，2020年老牌 · IEPL双专线 · VLESS协议）
  - 🥈 **商务多设备高可用**：暮光加速（MuGuang）
  - 🥉 **极高清流媒体发烧友**：飞猫云（FeiMaoYun）
  - 🏅 **学生党高性价比通勤**：微风网络（WeiFeng）

### 2. 📚 5 大万字级支柱专题矩阵 (Topic Clusters)
| 专题路由 | 专题名称 | 核心搜索意图与交付价值 |
| :--- | :--- | :--- |
| **`/recommend/`** | **42 家机场全景天梯榜** | 晚高峰实测数据、速率排名与资费横向大表 |
| **`/free-nodes/`** | **免费节点与公共订阅安全白皮书** | 中间人劫持原理解析、公网节点风险防护与排毒指南 |
| **`/faq/`** | **机场疑难排障与技术百科 100 问** | 解决测速快但打不开网页、DNS 污染、TUN 模式配置等高频痛点 |
| **`/risk-warning/`** | **机场跑路预警与黑名单风控体系** | 庞氏圈钱模式揭秘、低价年付陷阱识别与资金止损应急方案 |
| **`/free-trial/`** | **免费试用与 1 元体验机场全景清单** | 零成本防坑测速方法、试用防刷验证机制与高可用换乘策略 |

### 3. 🧪 实验室 17 家重点品牌晚高峰高精度实测画廊 (`/#speedtest`)
- 提供晚高峰（20:00 - 23:30）真实的节点下行速率、单节点抖动及全球三网回程丢包抓包图。

### 4. 💻 全平台客户端大全与配置指南 (`/clients/`)
- 覆盖 Windows、macOS、iOS、Android、Linux 及 OpenWrt 软路由。
- 重点推荐与指导：**Clash Verge Rev**（基于 Mihomo 内核）、**v2rayN**、**Shadowrocket 小火箭** 与 **Sing-box**。

---

## 🛠 技术架构与工程亮点 (Tech Stack & SEO Specs)

- **框架核心**：[Astro 6.4](https://astro.build/)，采用纯静态网页生成（SSG），零客户端 JS 阻断，首屏秒开。
- **设计系统**：无外部 CSS 框架依赖，基于原生 CSS 变量设计令牌（Design Tokens），完美适配全屏幕响应式排版。
- **SEO & GEO 深度基础设施**：
  - **规范化地址**：全局严格统一为 `https://jichangtuijian.quest/`，强制尾部斜杠（`trailingSlash: "always"`）。
  - **结构化数据 (JSON-LD)**：全站页面完备嵌入 `WebSite`、`Organization`、`TechArticle`、`FAQPage` 与 `BreadcrumbList` Schema。
  - **分级网站地图**：定制 `@astrojs/sitemap` 序列化管道，按页面权重自动分配 `priority`（1.0 ~ 0.3）与 `changefreq`。
  - **爬虫友好**：`robots.txt` 专门对 `Googlebot`、`bingbot`、`Baiduspider` 与 `yisouspider`（神马/夸克/UC）进行针对性抓取预算引导。

---

## 🚀 快速上手与本地开发 (Getting Started)

### 运行环境
- Node.js `>= 18.14.1` (推荐 Node.js v20+)
- npm 或 pnpm

### 安装与启动
```bash
# 1. 克隆代码仓库
git clone https://github.com/sksksk98698-source/jichangtuijian.quest.git
cd jichangtuijian.quest

# 2. 安装项目依赖
npm install

# 3. 启动本地开发热重载服务器
npm run dev
# 浏览器访问: http://localhost:4321/

# 4. 生产环境静态打包构建
npm run build

# 5. 本地预览打包产物
npm run preview
```

---

## 📂 目录结构 (Directory Structure)

```text
├── public/                  # 静态公共资源 (图标、测速实测真迹图片)
├── scripts/                 # 自动化评测数据生成与审计脚本
├── src/
│   ├── components/          # Astro 页面组件 (Header, Footer, BrandCard, Seo...)
│   │   └── sections/        # 首页各功能板块组件 (Hero, SpeedtestGallery, Faq...)
│   ├── config/              # 站点中央配置文件 (site.ts)
│   ├── data/                # 42 家品牌档案数据库与客户端配置数据 (brands.ts, clients.ts)
│   ├── layouts/             # 全局页面模版 (Base.astro)
│   ├── pages/               # 路由层 (54 条静态 SSG 路由)
│   │   ├── brand/           # 42 家独立品牌详情页 (/brand/[slug]/)
│   │   ├── clients/         # 客户端下载指南 (/clients/)
│   │   ├── faq/             # 百科 FAQ 支柱专题 (/faq/)
│   │   ├── free-nodes/      # 免费节点白皮书 (/free-nodes/)
│   │   ├── free-trial/      # 试用测速指南 (/free-trial/)
│   │   ├── guide/           # 专著级全景白皮书 (/guide/)
│   │   ├── recommend/       # 42家天梯榜支柱页 (/recommend/)
│   │   ├── risk-warning/    # 跑路风控预警 (/risk-warning/)
│   │   ├── index.astro      # 门户首页
│   │   ├── robots.txt.ts    # 动态 robots.txt 生成端点
│   │   └── sitemap.xml.ts   # 动态 sitemap 引导端点
│   └── styles/              # 全局视觉样式与色彩设计令牌 (tokens.css, global.css)
├── astro.config.ts          # Astro 与 Sitemap 配置文件
└── package.json
```

---

## ⚖️ 免责声明 (Disclaimer)

本项目所有评测内容、测速图谱与对比数据均仅用于网络工程学术研究、前沿协议加密机制探讨及流媒体/AI服务可用性观测。请所有使用者严格遵守所在地法律法规，合理合规使用互联网技术。

---

<p align="center">
  <sub>Designed & Maintained with ❤️ by <b>机场baby 网络实验室工程组</b> · 2026</sub>
</p>
