# Agent 战术大屏 · v2.0

一个纯前端的 **AI 智能体调度可视化大屏**。v2.0 从单页升级为主题系列：在同一个 HTML 页面里切换 OPS 纸面工程与 SPIDER 蛛网战术，展示任务流、智能体接力、质检、交付与 token 成本。

单文件，无需构建、无需后端，双击即可打开，适合展厅、办公室电视或直播背景。

> 页面中的任务、指标、token 与成本全部是**模拟示例数据**，由内置模拟器生成，并未连接真实 agent、账单或业务接口。真实数据接入需要自行改造，见「配置」一节。成本使用示例单价：输入 ¥2 / 百万 token、缓存命中 ¥0.5 / 百万 token、输出 ¥8 / 百万 token。

## 主题

| 编号 | 主题 | 风格 | 直达 |
| --- | --- | --- | --- |
| 01 | OPS 纸面工程 | 纸面工程图 + 调度飞轮，可切夜间荧光 | `index.html#ops` |
| 02 | SPIDER 蛛网战术 | 粉框作战室 + 巡检蛛 + token 账 + 交付飞轮 | `index.html#spider` |

点各主题的「主题 / 换主题」按钮打开主题面板，按 T 键直接轮换主题，按 Esc 关闭面板。选择保存在 localStorage；地址中的 `#ops` 或 `#spider` 优先于上次选择。没有有效选择记录时默认打开 SPIDER。

每款主题运行在独立的 Shadow DOM 中，样式和元素 id 互不干扰。隐藏主题暂停主动画与主要模拟刷新，减少资源占用。两款主题主画面左下角均有淡色系列水印「DEVELOP BY @赛博老爸」。

## 功能一览

### 01 · OPS 纸面工程

原 v1 的调度飞轮与面板作为主题 01 保留，并加入「换主题」按钮和系列水印。

- **数据飞轮**：左侧汇聚连线与三个工作流节点，中间旋转的代码和执行记录环带，右侧外射谱线，以及齿环、扫光与质检浮层。悬停节点可查看工作流详情。
- **顶部指标**：任务、运行中智能体、工作流、产出、已匹配、待复核，以及实时时钟。
- **底部四个面板**：任务日志、粒子求解器、执行代码打字展示、12 个智能体的任务与进度。
- **纸面 / 夜间**：默认跟随系统深浅色，可用按钮切换；夜间有荧光、柔光与偶发横向故障效果。
- **交互**：按钮或空格键暂停 / 继续；点击粒子面板或聚焦后按 Enter 加入涡流；ADVECT / PROJECT 切换流动模式，RERUN 重置。
- **自适应**：宽屏四列面板，宽度 ≤1100px 时两列，手机竖屏单列。

### 02 · SPIDER 蛛网战术

以 1920×1080 横屏为设计尺寸，按窗口等比缩放，推荐电脑或手机横屏观看。

- **14 张角色卡**：总调度 CHIEF、12 个 agent、巡检蛛 CRAWLER，显示当前任务、进度和台词。
- **作战室**：12 个工位与总调度台，模拟派单 → 接手 → 交接 → 质检 → 交付。交接会飞出光点，或由角色踩滑板送到下一工位；空闲 agent 优先接单，久候会去沙发。质检不通过会打回重写并触发碎纸效果。
- **巡检蛛**：在屏幕上巡逻，腿抓住事件元素四角，显示锁定框和说明；打回时亮出 REWORK LOCKED，巡逻工位时织网。
- **token 消耗墙屏**：按 agent 颜色分段堆叠，显示预算线、当前速率和 TOP BURN 前四名。
- **交付飞轮**：汇聚节点轮换展示在途较多的工作流，环带滚动任务记录与 token 账；交付推动飞轮并射出光束，打回时减速。悬停节点查看接力顺序。
- **产出与成本**：今日交付、今日 token、今日成本，以及单件 token / 成本。
- **质检台**：需求覆盖、事实核验、品牌口径、合规敏感词、重复率、交付时限逐项 PASS / DROP，展示近 30 次得分曲线及最近三条结果。
- **rules.py 面板**：模拟校验 token 上限、队列深度、通过率、周期、打回次数，以及单件 token、品牌口径、事实覆盖和重复率；它是页面展示内容，无需 Python 环境。
- **其他面板与控制**：dispatch 流程芯片、执行代码打字、任务流、12 席负载、今日进度、×3 加速、暂停、全屏和时钟。悬停作战室角色可查看任务、排队数、今日交付和 token。

## 快速开始

### 本地打开

直接双击 `index.html`，用支持 Shadow DOM 和 Canvas 的现代 Chrome / Edge / Safari / Firefox 打开。

也可以任选一种方式启动静态服务器：

```bash
python3 -m http.server 8000
# 或
npx serve .
```

使用 Python 命令后访问 `http://localhost:8000`；使用 `npx serve .` 时访问终端显示的地址。加上 `#ops` 或 `#spider` 可直达主题。

### 部署到 GitHub Pages

1. 将文件推送到 GitHub 仓库。
2. 在仓库 Settings → Pages 中，将 Source 选为 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。
3. 等待部署完成，使用 Pages 设置页提供的地址访问；在地址末尾加 `#ops` 或 `#spider` 检查两款主题。

也可以部署到其他静态托管服务，无需安装运行时或构建项目。

### 放到大屏上

在电脑或小主机上打开页面，使用浏览器全屏功能；常见快捷键为 F11（Mac 为 Ctrl+Cmd+F）。SPIDER 也提供「全屏」按钮。推荐 1920×1080 或更高分辨率。

## 配置（换成你自己的数据）

所有配置都在 `index.html` 的脚本中，分别位于各主题的挂载函数内。

| 位置 | 配置 | 内容 |
| --- | --- | --- |
| `mountOps(host, SR)` | `CONFIG` | agent 名单、任务名称、工作流、执行代码示例 |
| `mountOps(host, SR)` | `CODEBITS`、`SPIN` | 环带代码片段、飞轮转速 |
| `mountSpider(host, SR)` | `AG` | 角色名单、颜色、形状、话术、速度 |
| `mountSpider(host, SR)` | `WF`、`CH` | 工作流、接力顺序、交付渠道 |
| `mountSpider(host, SR)` | `CHECKS`、`CODESETS` | 质检项、执行代码示例 |
| `mountSpider(host, SR)` | `PRICE` | token 示例单价（¥ / 百万 token） |
| `mountSpider(host, SR)` | `TOKR`、`INR` | 各 agent 工作时每秒 token、输入占比 |
| `mountSpider(host, SR)` | `BUDGET`、`DAY_TARGET` | 每分钟 token 预算、今日产出目标 |

配色在对应 `<template>` 内的 `<style>` 中。OPS 使用 `:host` 定义纸面配色，使用 `:host([data-theme="dark"])` 和系统深色媒体查询定义夜间配色；Canvas 从这些变量读取颜色。

### 接入真实数据的改造方向

当前没有现成的数据连接器或后端服务。下面是改造入口，需要开发者自行实现接口、字段映射、状态更新与错误处理。

- **OPS**：`mountOps` 中的 `tasks`、`agents`、`wfs` 保存模拟状态，`step()` 每 900 毫秒更新，`renderAll()` 刷新面板。可替换模拟更新逻辑，将业务接口返回的数据映射到这些状态；日志可通过 `log(verb, task)` 追加，动作包括 `read`、`build`、`check`、`review`。
- **SPIDER**：`mountSpider` 中的 `simStep(dt)` 驱动任务接力模拟，`tokenStep(dt)` 生成 token 用量；任务、角色、质检、账本和可视化相互关联。接入时需要将真实运行事件和用量记录映射到相应状态，并替换模拟推进与初始化数据，避免模拟值与真实指标混用。
- `PRICE`、`TOKR`、`INR` 等参数的调整只会改变演示，不会自动接入真实账单或 agent 执行记录。

## 新增主题的步骤

1. 新建 `<template id="tpl-xxx">`，放入主题的 `<style>` 与页面结构，样式中使用 `:host` 代替 `:root`；同时添加对应的主题 host 容器。
2. 新建 `mountXxx(host, SR)` 函数，用 `SR.querySelector` 查询主题元素。在动画循环中跳过隐藏主题，并为定时刷新添加对应检查。
3. 在页面末尾外壳脚本的 `THEMES` 和 `ORDER` 中登记主题。
4. 在主题面板 `.pk-list` 中加入卡片，设置对应的 `data-theme-id`。
5. 在主题里放一个带 `data-series-pick` 属性的按钮，用于打开主题面板。

## 技术说明

- 单文件 HTML，原生 JavaScript + CSS + Canvas 2D，无第三方 JavaScript 库，无构建步骤。
- 系列外壳按需挂载主题；两款主题由 `<template>`、Shadow DOM 与各自的 mount 函数组成。
- 字体为 Archivo、JetBrains Mono、Noto Sans SC，经 Google Fonts 加载，均采用 SIL 开源字体协议。字体无法加载时回退至系统字体；若需完全离线使用，可自行改成本地字体引用。
- 支持系统的减少动态效果设置（`prefers-reduced-motion`），默认暂停，并减少部分 CSS 动画。
- OPS 的部分静态图层使用离屏画布缓存；夜间发光会增加渲染开销。不支持 Canvas 柔光或锥形渐变时，相关效果会降级。

## 目录结构

```text
agent-display/
├── index.html          # 两款主题与系列外壳（HTML + CSS + JS）
├── README.md
├── CHANGELOG.md
└── LICENSE             # MIT 许可证
```

版本记录见 [CHANGELOG.md](CHANGELOG.md)。

## 致谢

OPS 纸面工程的视觉风格灵感来自网上流传的 Claude Code「Paper Lab」演示视频（纸面工程图 / 夜间荧光两种风格）。本项目为独立实现，代码和示例数据均为原创，与原视频作者及 Anthropic 没有关联。

DEVELOP BY @赛博老爸

## 许可证

MIT，详见 [LICENSE](LICENSE)。
