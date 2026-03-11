<div align="center">

# 🍵 普洱茶百科

**云南普洱茶科普百科**

*产区地图 · 山头图鉴 · 名词百科 · 历史时间线*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer)](https://www.framer.com/motion/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)](https://vercel.com/)

简体中文 | **[English](./README.md)**

</div>

---

## 项目简介

**普洱茶百科**是一个面向普洱茶新手的扫盲级科普网站，用精美的视觉和有趣的交互让用户轻松理解普洱茶的历史、名词、产区和山头知识。

本项目采用**新中式**设计风格 — 不是传统红金配色的"老中式"，而是用现代设计语言重新诠释东方美学：宣纸纹理背景、水墨晕染效果、茶烟粒子动画，配合大量留白与呼吸感排版，打造沉浸式的知识探索体验。

> 纯粹做知识科普，不做电商。

## 核心功能

| 模块 | 路由 | 说明 |
|------|------|------|
| **首页** | `/` | 全屏 Hero 茶烟动画 + Bento Grid 导航卡片 + 数据亮点滚动动画 |
| **历史长河** | `/history` | 横向/纵向滚动时间轴，从东汉到当代的普洱茶千年历程 |
| **名词百科** | `/glossary` | 分类 Tab + 搜索过滤 + 卡片展开详情，涵盖基础概念、茶树类型、工艺术语、品饮术语等 |
| **产区地图** | `/regions` | 基于真实 GeoJSON 的交互式云南地图，覆盖四大产区（西双版纳、临沧、普洱、保山） |
| **山头图鉴** | `/mountains` | 瀑布流卡片 + 筛选器，收录 20+ 知名山头 |
| **山头详情** | `/mountains/[slug]` | 六维风味雷达图（SVG 动画）+ 基本信息 + 口感描述 + 相似推荐 |
| **关于** | `/about` | 项目介绍与数据来源说明 |

## 设计亮点

- **新中式色彩体系** — 深茶绿 `#2D5016` · 琥珀金 `#8B6914` · 宣纸米白 `#F5F0E8` · 朱砂红 `#C4451C`
- **茶烟粒子动画** — 首页 Hero 区 Canvas 实现的缓慢上升茶烟效果
- **水墨晕染交互** — 卡片 hover 时边缘出现水墨扩散效果
- **风味雷达图** — 山头详情页六维雷达图（苦、涩、甜、香、回甘、茶气），进入视口时动画绘制
- **交互式产区地图** — SVG 路径 hover 高亮、点击展开、平滑过渡
- **暗色/亮色模式** — 默认宣纸风亮色，支持切换墨色风暗色
- **响应式设计** — 完美适配桌面端与移动端

## 收录山头

首批收录 20+ 知名山头：

| 产区 | 山头 |
|------|------|
| **西双版纳** | 老班章、新班章、老曼峨、易武、刮风寨、薄荷塘、弯弓、铜箐河、南糯山、贺开、那卡、曼松 |
| **临沧** | 冰岛、昔归、小户赛、大雪山 |
| **普洱** | 景迈山、困鹿山 |
| **保山** | 高黎贡山、黄家寨 |

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [Next.js 16](https://nextjs.org/)（App Router，SSG 静态生成） |
| UI 库 | [React 19](https://react.dev/) |
| 样式 | [Tailwind CSS 4](https://tailwindcss.com/) |
| 动画 | [Framer Motion 12](https://www.framer.com/motion/) |
| 地图 | [react-simple-maps](https://www.react-simple-maps.io/) + GeoJSON |
| 图标 | [Lucide React](https://lucide.dev/) |
| 字体 | Noto Serif SC（标题衬线宋体）+ Noto Sans SC（正文无衬线） |
| 部署 | [Vercel](https://vercel.com/) |

## 项目结构

```
puer-tea-wiki/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── page.tsx            # 首页
│   │   ├── history/            # 历史长河
│   │   ├── glossary/           # 名词百科
│   │   ├── regions/            # 产区地图
│   │   ├── mountains/          # 山头图鉴
│   │   │   └── [slug]/         # 山头详情
│   │   └── about/              # 关于
│   ├── components/
│   │   ├── layout/             # 导航栏、页脚
│   │   ├── home/               # Hero、BentoGrid、数据统计
│   │   ├── history/            # 时间轴组件
│   │   ├── glossary/           # 词条卡片、搜索、分类
│   │   ├── regions/            # 云南地图、产区面板
│   │   ├── mountains/          # 山头卡片、雷达图、筛选器
│   │   └── ui/                 # 通用 UI 组件
│   ├── data/                   # JSON 数据文件
│   │   ├── history.json        # 历史时间线
│   │   ├── glossary.json       # 名词百科
│   │   ├── regions.json        # 产区数据
│   │   └── mountains/          # 山头数据（每个山头一个 JSON）
│   ├── lib/                    # 工具函数
│   └── styles/                 # 全局样式、CSS 变量
├── public/                     # 静态资源
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 快速开始

### 环境要求

- Node.js 18+
- npm / yarn / pnpm / bun

### 本地开发

```bash
git clone https://github.com/midasism/puer-tea-wiki.git
cd puer-tea-wiki
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 即可预览。

### 构建部署

```bash
# 构建生产版本
npm run build

# 本地预览
npm start
```

#### Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmidasism%2Fpuer-tea-wiki)

## 参与贡献

所有茶山数据以 JSON 格式存储在 `src/data/mountains/` 目录下，欢迎通过 PR 补充更多山头信息。

山头 JSON 结构示例：

```json
{
  "id": "lao-ban-zhang",
  "name": "老班章",
  "region": "xishuangbanna",
  "subRegion": "勐海·布朗山",
  "altitude": "1700-1900m",
  "treeType": "古树乔木",
  "flavor": {
    "bitter": 8, "astringent": 6, "sweet": 7,
    "aroma": 8, "huigan": 9, "chaqi": 10
  },
  "description": "普洱茶中的'茶王'，以霸气著称...",
  "tags": ["霸气型", "布朗山", "古树"]
}
```

## 许可证

[MIT](LICENSE)

## 致谢

本项目数据来源于公开的普洱茶知识资料，仅供学习交流使用。
