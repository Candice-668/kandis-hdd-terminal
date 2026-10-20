# Agent 战术大屏 · v3.0

一个纯前端的 **AI 智能体调度可视化大屏**。v3.0 在 OPS 纸面工程与 SPIDER 蛛网战术之外，新增 WebGL 主题 NEURAL 神经星环。在同一个 HTML 页面里切换三款主题，展示任务流、智能体接力、质检、交付与 token 成本。

单文件，无需构建、无需后端，双击即可打开，适合展厅、办公室电视或直播背景。

> 页面中的任务、指标、token 与成本全部是**模拟示例数据**，由内置模拟器生成，并未连接真实 agent、账单或业务接口。真实数据接入需要自行改造，见「配置」一节。成本使用示例单价：输入 ¥2 / 百万 token、缓存命中 ¥0.5 / 百万 token、输出 ¥8 / 百万 token。

## 主题

| 编号 | 主题 | 风格 | 直达 |
| --- | --- | --- | --- |
| 01 | OPS 纸面工程 | 纸面工程图 + 调度飞轮，可切粒子荧光 | `index.html#ops` |
| 02 | SPIDER 蛛网战术 | 粉框作战室 + 巡检蛛 + token 账 + 交付飞轮 | `index.html#spider` |
| 03 | NEURAL 神经星环 | 3D 神经团 + 任务脉冲 + HUD 星环 + token 账 | `index.html#neural` |

点各主题的「主题 / 换主题」按钮打开主题面板，按 T 键依次轮换 OPS → SPIDER → NEURAL，按 Esc 关闭面板。选择保存在 localStorage；地址中的 `#ops`、`#spider` 或 `#neural` 优先于上次选择。没有有效选择记录时默认打开 SPIDER。

每款主题运行在独立的 Shadow DOM 中，样式和元素 id 互不干扰。隐藏主题暂停主动画与主要模拟刷新，减少资源占用。三款主题和主题面板使用系列水印「DEVELOPED BY @赛博老爸」。主题面板另有「04 · 下一款」占位。

## 功能一览

### 01 · OPS 纸面工程

原 v1 的调度飞轮与面板作为主题 01 保留，提供「换主题」与「全屏」按钮。

- **数据飞轮**：左侧汇聚连线与三个工作流节点，中间旋转的代码和执行记录环带，右侧外射谱线，以及齿环、扫光与质检浮层。悬停节点可查看工作流详情。
- **顶部指标**：任务、运行中智能体、工作流、产出、已匹配、待复核，以及实时时钟。
- **底部四个面板**：任务日志、粒子求解器、执行代码打字展示、12 个智能体的任务与进度。
- **纸面 / 粒子荧光**：默认跟随系统深浅色；点「粒子」按钮切到荧光绿画面，按钮变为「纸面」，再点切回。深色画面包含柔光与偶发横向故障效果。
- **粒子交互**：点击粒子面板或聚焦后按 Enter 加入涡流；ADVECT / PROJECT 切换流动模式，RERUN 重置。
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
- **其他面板与控制**：dispatch 流程芯片、执行代码打字、任务流、12 席负载、今日进度、全屏和时钟。悬停作战室角色可查看任务、排队数、今日交付和 token。

### 03 · NEURAL 神经星环

three.js（WebGL）渲染的 3D agent 协同大屏。13 团神经元代表 CHIEF 总调度与 12 个执行智能体，另有 CRAWLER 巡检探针在各团之间飞行。角色、11 条工作流与 6 个交付渠道沿用 SPIDER 的配置内容；源码在两个挂载函数内分别定义这些配置。

- **任务脉冲**：派单、交接沿突触束飞行，打回显示红色脉冲；抵达时神经团亮起，交付光束射向外环渠道并点亮它。
- **HUD 星环**：72 块 × 6 道能量格记录 token 流水与智能体忙碌程度，包含反向充能波、超预算琥珀提示、执行记录文字带、智能体扇区与交付渠道环。神经网与标签约三分钟一圈，标签自动翻正。
- **视角与交互**：工具栏按钮或 V 键切换环绕、正视、斜看、贴近四种视角；拖动转视角、滚轮缩放；点击神经团聚焦，悬停查看详情。
- **状态与指标**：左列展示 14 个角色状态与最近交接，右列展示神经活动热力格、突触日志和巡检统计；底部展示拓扑规模、脉冲频率、交付进度、审校通过率、token、成本与帧率。
- **性能与适配**：辉光效果使用 UnrealBloom；持续低帧率时先降低清晰度，再减少粒子。画板随比例伸展，窄屏或竖屏使用只保留星环和三个核心数字的精简版。
- **背景效果**：`AMBIENT` 控制背景粒子和流星，默认全部关闭，可按需调整。

v3.0 三款主题均移除暂停按钮与空格键暂停；SPIDER 移除倍速按钮。系统开启「减少动态效果」时，大屏仍照常运行，部分 CSS 动画和故障闪烁仍会减少。

## 快速开始

### 本地打开

直接双击 `index.html`，用支持 Shadow DOM 和 Canvas 的现代 Chrome / Edge / Safari / Firefox 打开。NEURAL 的 3D 画面另需 WebGL 与可访问 jsDelivr 的网络，three.js 及后处理脚本会在首次切入时加载。

也可以任选一种方式启动静态服务器：

```bash
python3 -m http.server 8000
# 或
npx serve .
```

使用 Python 命令后访问 `http://localhost:8000`；使用 `npx serve .` 时访问终端显示的地址。加上 `#ops`、`#spider` 或 `#neural` 可直达主题。

### 部署到 GitHub Pages

1. 将文件推送到 GitHub 仓库。
2. 在仓库 Settings → Pages 中，将 Source 选为 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。
3. 等待部署完成，使用 Pages 设置页提供的地址访问；在地址末尾加 `#ops`、`#spider` 或 `#neural` 检查三款主题。

也可以部署到其他静态托管服务，无需安装运行时或构建项目。

### 放到大屏上

在电脑或小主机上打开页面，使用浏览器全屏功能；常见快捷键为 F11（Mac 为 Ctrl+Cmd+F）。三款主题均提供「全屏」按钮。推荐 1920×1080 或更高分辨率。

## 配置（换成你自己的数据）

业务与视觉配置主要位于 `index.html` 的各主题挂载函数内；按需加载的 CDN 地址及依赖列表位于页面末尾的系列外壳脚本。

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
| `mountNeural(host, SR)` | `AG`、`WF`、`CH`、`CHECKS` | 角色、工作流、渠道与质检项 |
| `mountNeural(host, SR)` | `PRICE`、`TOKR`、`INR` | token 示例单价、各 agent 用量速率、输入占比 |
| `mountNeural(host, SR)` | `DAY_TARGET`、`PER_MIN` | 今日产出目标、初始化历史交付量的每分钟基准 |
| `mountNeural(host, SR)` | `AMBIENT` | 背景粒子与流星；`chatter`、`spark`、`meteor`、`burst` 默认均为 0 |
| 系列外壳脚本 | `THREE_CDN`、`NEURAL_DEPS` | three.js CDN 基址及按需加载的脚本列表 |

配色在对应 `<template>` 内的 `<style>` 中。OPS 使用 `:host` 定义纸面配色，使用 `:host([data-theme="dark"])` 和系统深色媒体查询定义粒子荧光配色；Canvas 从这些变量读取颜色。

### 接入真实数据的改造方向

当前没有现成的数据连接器或后端服务。下面是改造入口，需要开发者自行实现接口、字段映射、状态更新与错误处理。

- **OPS**：`mountOps` 中的 `tasks`、`agents`、`wfs` 保存模拟状态，`step()` 每 900 毫秒更新，`renderAll()` 刷新面板。可替换模拟更新逻辑，将业务接口返回的数据映射到这些状态；日志可通过 `log(verb, task)` 追加，动作包括 `read`、`build`、`check`、`review`。
- **SPIDER**：`mountSpider` 中的 `simStep(dt)` 驱动任务接力模拟，`tokenStep(dt)` 生成 token 用量；任务、角色、质检、账本和可视化相互关联。接入时需要将真实运行事件和用量记录映射到相应状态，并替换模拟推进与初始化数据，避免模拟值与真实指标混用。
- **NEURAL**：`mountNeural` 内有独立的模拟状态与 `simStep(dt)`，维护任务、角色、信号脉冲及 token 状态。需要替换模拟初始化与推进逻辑，将真实事件映射到面板和 3D 信号。修改 SPIDER 的配置不会自动同步到 NEURAL。
- `PRICE`、`TOKR`、`INR` 等参数的调整只会改变演示，不会自动接入真实账单或 agent 执行记录。

## 新增主题的步骤

1. 新建 `<template id="tpl-xxx">`，放入主题的 `<style>` 与页面结构，样式中使用 `:host` 代替 `:root`；同时添加对应的主题 host 容器。
2. 新建 `mountXxx(host, SR)` 函数，用 `SR.querySelector` 查询主题元素。在动画循环中跳过隐藏主题，并为定时刷新添加对应检查。
3. 在页面末尾外壳脚本的 `THEMES` 和 `ORDER` 中登记主题。
4. 在主题面板 `.pk-list` 中加入卡片，设置对应的 `data-theme-id`。
5. 在主题里放一个带 `data-series-pick` 属性的按钮，用于打开主题面板。需要外部库时，可参照 NEURAL 在 `THEMES` 中的 `deps` 列表登记按需依赖。

## 技术说明

- 单文件 HTML，无构建步骤。OPS 与 SPIDER 使用原生 JavaScript + CSS + Canvas 2D；NEURAL 使用 three.js（WebGL）与后处理效果。
- 系列外壳按需挂载主题；每款主题由 `<template>`、独立 Shadow DOM 与对应的 `mountXxx(host, SR)` 函数组成。选择保存在 localStorage 的 `agent-series-theme` 中。
- **NEURAL 按需依赖**：首次切入神经星环时，从 `https://cdn.jsdelivr.net/npm/three@0.147.0/` 依次加载 `build/three.min.js`，以及 `examples/js` 下的 CopyShader、LuminosityHighPassShader、EffectComposer、RenderPass、ShaderPass、UnrealBloomPass。打开 OPS 或 SPIDER 时不会请求这组脚本。
- **3D 故障提示**：依赖加载失败或无法初始化 WebGL 时，NEURAL 显示 3D 画面不可用的提示，数据面板仍可运行，OPS 与 SPIDER 不受影响。网络请求长时间无响应可能延迟初始化，恢复后可刷新重试。若仅辉光后处理不可用，源码会关闭辉光渲染。
- 字体为 Archivo、JetBrains Mono、Noto Sans SC、Michroma，经 Google Fonts 加载。字体无法加载时回退至系统字体；完全离线使用需要自行本地化字体及 NEURAL 的依赖脚本。
- 系统的 `prefers-reduced-motion` 设置不再让大屏默认停住；部分 CSS 动画及故障闪烁仍会降级。
- OPS 的部分静态图层使用离屏画布缓存；荧光发光会增加渲染开销。不支持 Canvas 柔光或锥形渐变时，相关效果会降级。

## 目录结构

```text
agent-display/
├── index.html          # 三款主题与系列外壳（HTML + CSS + JS）
├── README.md
├── CHANGELOG.md
└── LICENSE             # MIT 许可证
```

版本记录见 [CHANGELOG.md](CHANGELOG.md)。

## 致谢

OPS 纸面工程的视觉风格灵感来自网上流传的 Claude Code「Paper Lab」演示视频（纸面工程图 / 夜间荧光两种风格）。本项目为独立实现，代码和示例数据均为原创，与原视频作者及 Anthropic 没有关联。

DEVELOPED BY @赛博老爸

## 许可证

MIT，详见 [LICENSE](LICENSE)。
