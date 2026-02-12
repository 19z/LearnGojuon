# 日语五十音学习 (Japanese 50-Sound Learning)

一个基于 React + Tailwind CSS 的日语五十音互动学习网站，支持 PWA 离线使用。

## 功能特点

### 核心功能
- **多种学习模式**: 在罗马音、平假名、片假名、语音中选择两种进行练习
- **互动测验**: 随机题目，4选1答案
- **即时反馈**:
  - 答对立即进入下一题
  - 答错显示正确答案，手动进入下一题
- **语音支持**:
  - 语音作为题目时自动播放
  - 语音作为选项时点击播放
- **静音模式**: 右上角切换，静音时不会出现语音题目或选项
- **分数统计**: 左上角显示正确/错误数量，刷新后重置

### PWA 特性
- ✅ 完整的 Apple PWA 支持
- ✅ 离线可用（所有音频文件预缓存）
- ✅ 可安装到主屏幕
- ✅ 独立窗口运行

### 设计特点
- 🎨 圆润、色彩鲜艳的界面
- 📱 大字体，易于阅读
- 🚫 单屏布局，无需滚动
- 📱 移动优先，响应式设计

## 技术栈

- **构建工具**: Vite
- **框架**: React 18
- **样式**: Tailwind CSS
- **PWA**: vite-plugin-pwa (Workbox)
- **状态管理**: React Context + useReducer
- **包管理器**: Bun

## 项目结构

```
JapaneseLearn/
├── mp3/                          # 46个五十音音频文件
├── public/
│   └── icons/                    # PWA 图标（需要生成）
├── src/
│   ├── components/               # React 组件
│   │   ├── QuizModeSelector.jsx  # 模式选择界面
│   │   ├── QuizInterface.jsx     # 测验主界面
│   │   ├── QuestionDisplay.jsx   # 题目显示
│   │   ├── AnswerOptions.jsx     # 答案选项
│   │   ├── ScoreDisplay.jsx      # 分数显示
│   │   ├── MuteToggle.jsx        # 静音切换
│   │   └── AudioButton.jsx       # 音频按钮
│   ├── hooks/
│   │   └── useAudioPreloader.js  # 音频预加载
│   ├── context/
│   │   └── AppContext.jsx        # 全局状态管理
│   ├── data/
│   │   └── soundsData.js         # 46个五十音数据
│   ├── utils/
│   │   ├── quizGenerator.js      # 题目生成逻辑
│   │   └── audioManager.js       # 音频播放管理
│   ├── App.jsx                   # 根组件
│   ├── main.jsx                  # 入口文件
│   └── index.css                 # 全局样式
├── vite.config.js                # Vite + PWA 配置
├── tailwind.config.js            # Tailwind 配置
└── package.json

## 快速开始

### 安装依赖
```bash
bun install
```

### 开发模式
```bash
bun run dev
```

访问 http://localhost:5173/

### 构建生产版本
```bash
bun run build
```

### 预览生产版本
```bash
bun run preview
```

## PWA 图标

在部署前，需要在 `public/icons/` 目录下添加以下图标：

- `icon-192x192.png` - 192x192 像素
- `icon-512x512.png` - 512x512 像素
- `apple-touch-icon.png` - 180x180 像素

推荐使用以下工具生成图标：
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

## 使用说明

### 1. 选择学习模式
- 首次进入，选择学习模式，当前只有【五十音】。

### 2. 开始测验
- 开始测验 后，每一题都是随机的从【罗马音、平假名、片假名、语音】选择两个分别作为题目和选项（静音模式没有语音）。
- 上方显示题目
- 下方显示4个选项
- 点击选择答案

### 3. 答题反馈
- **答对**: 绿色高亮，自动进入下一题
- **答错**: 红色高亮，显示正确答案，点击"下一题"继续

### 4. 静音模式
- 点击右上角 🔊/🔇 图标切换
- 静音时无法选择语音作为题目或答案类型
- 如果当前模式包含语音，切换静音会返回模式选择

### 5. 查看分数
- 左上角显示：正确 X / 错误 Y
- 刷新页面后重置

## 离线使用

### iOS (Safari)
1. 在 Safari 中打开网站
2. 点击分享按钮
3. 选择"添加到主屏幕"
4. 完成后可离线使用

### Android (Chrome)
1. 在 Chrome 中打开网站
2. 点击菜单（三个点）
3. 选择"安装应用"或"添加到主屏幕"
4. 完成后可离线使用

## 音频文件

项目使用 `mp3/` 目录下的 46 个音频文件：

- 元音: a, i, u, e, o
- K行: ka, ki, ku, ke, ko
- S行: sa, si, su, se, so
- T行: ta, ti, tu, te, to
- N行: na, ni, nu, ne, no
- H行: ha, hi, hu, he, ho
- M行: ma, mi, mu, me, mo
- Y行: ya, yu, yo
- R行: ra, ri, ru, re, ro
- W行: wa, wo
- N: n

所有音频文件在应用启动时预加载，确保即时播放和离线可用。

## 浏览器兼容性

- ✅ Chrome/Edge (最新版本)
- ✅ Safari (iOS 11.3+)
- ✅ Firefox (最新版本)
- ✅ Samsung Internet

## 开发说明

### 添加新的五十音
在 `src/data/soundsData.js` 中添加新的条目：

```javascript
{
  id: 'ga',
  romaji: 'ga',
  hiragana: 'が',
  katakana: 'ガ',
  audio: '/mp3/ga.mp3'
}
```

### 修改颜色主题
在 `tailwind.config.js` 中修改颜色配置。

### 调整题目逻辑
在 `src/utils/quizGenerator.js` 中修改题目生成逻辑。

## 性能优化

- ✅ 所有音频文件预加载（约 550KB）
- ✅ Service Worker 缓存策略
- ✅ 代码分割和懒加载
- ✅ Tailwind CSS 按需生成
- ✅ Vite 快速构建

## 许可证

MIT

## 作者

Created with Claude Code
