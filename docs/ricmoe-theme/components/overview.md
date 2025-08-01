# 🎨 主题组件概览

RicMoe 主题包含多种可复用组件，提供丰富的交互体验和页面功能。

## 🏗️ 组件架构

### 组件分层结构

```
src/components/          # 可复用组件
├── HomepageFeatures/   # 首页特性展示
├── TypeEffectSubtitle/ # 打字效果组件
└── CloudflareTurnstile/ # 安全验证组件

src/pages/              # 页面组件
├── index.tsx          # 首页
├── about/            # 关于页面
├── links/            # 友链页面
├── moments/          # 时刻页面
└── feedback/         # 反馈页面

src/theme/              # 主题定制组件
├── Footer/           # 自定义页脚
└── Navbar/           # 自定义导航栏
```

## 🧩 核心组件详解

### 1. HomepageFeatures 首页特性组件

**位置**: `src/components/HomepageFeatures/`

**功能**: 展示网站主要特性和亮点

**特点**:
- 响应式网格布局
- 图标 + 标题 + 描述的卡片式设计
- 支持自定义特性内容

**使用场景**: 首页特性展示区域

### 2. TypeEffectSubtitle 打字效果组件

**位置**: `src/components/TypeEffectSubtitle/`

**功能**: 实现动态打字效果的副标题

**特点**:
- 逐字符显示动画
- 可配置打字速度
- 支持多行文本

**使用场景**: 首页副标题、介绍文字

### 3. CloudflareTurnstile 安全验证组件

**位置**: `src/components/CloudflareTurnstile/`

**功能**: 集成 Cloudflare Turnstile 人机验证

**特点**:
- 无侵入式验证体验
- 自动主题适配
- 错误处理机制

**使用场景**: 表单提交、敏感操作验证

## 📄 页面组件系统

### 首页组件 (index.tsx)

**核心功能**:
- Hero 区域展示
- 特性介绍区域
- 响应式布局

**使用的组件**:
- `HomepageFeatures`
- `TypeEffectSubtitle`

### About 页面组件

**核心功能**:
- 个人介绍展示
- 技能和经历展示
- 联系方式展示

### Links 页面组件

**核心功能**:
- 友情链接展示
- 分类管理
- 链接状态检测

### Moments 页面组件

**核心功能**:
- 动态内容展示
- 分类筛选
- 时间轴展示

### Feedback 页面组件

**核心功能**:
- 反馈表单
- Cloudflare Turnstile 验证
- 数据收集

## 🎯 主题定制组件

### 自定义 Footer

**位置**: `src/theme/Footer/`

**定制功能**:
- 自定义版权信息
- 社交媒体链接
- 备案信息展示
- 多语言支持

### 自定义 Navbar

**位置**: `src/theme/Navbar/`

**定制功能**:
- 自定义导航菜单
- Logo 和品牌展示
- 主题切换按钮
- 多语言切换

## 🔧 组件开发规范

### 1. 组件结构

```
ComponentName/
├── index.tsx          # 组件主文件
├── styles.module.css  # 样式文件
├── types.ts          # 类型定义
└── README.md         # 组件文档
```

### 2. 组件模板

```tsx
import React from 'react';
import styles from './styles.module.css';

interface ComponentNameProps {
  // 定义 props 类型
}

export default function ComponentName({ ...props }: ComponentNameProps): JSX.Element {
  return (
    <div className={styles.container}>
      {/* 组件内容 */}
    </div>
  );
}
```

### 3. 样式规范

```css
/* styles.module.css */
.container {
  /* 容器样式 */
}

.title {
  /* 标题样式 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    /* 移动端样式 */
  }
}
```

## 🎨 设计系统

### 颜色规范

- **主色调**: Docusaurus 默认蓝色
- **辅助色**: 灰色系列
- **强调色**: 橙色、绿色
- **状态色**: 红色（错误）、黄色（警告）

### 字体规范

- **主字体**: 系统默认字体栈
- **代码字体**: Monaco, Consolas, monospace
- **中文字体**: PingFang SC, Microsoft YaHei

### 间距规范

- **基础间距**: 8px 的倍数
- **组件内边距**: 16px, 24px
- **组件外边距**: 32px, 48px

## 📱 响应式设计

### 断点设置

```css
/* 移动端 */
@media (max-width: 768px) { }

/* 平板 */
@media (min-width: 769px) and (max-width: 1024px) { }

/* 桌面端 */
@media (min-width: 1025px) { }
```

### 组件适配原则

1. **移动优先**: 从小屏幕开始设计
2. **渐进增强**: 大屏幕添加更多功能
3. **内容优先**: 确保核心内容在所有设备上可用

## 🔄 组件生命周期

### React 组件生命周期

1. **初始化**: 组件创建和 props 传递
2. **渲染**: 组件渲染到 DOM
3. **更新**: props 或 state 变化时重新渲染
4. **销毁**: 组件从 DOM 中移除

### Docusaurus 集成

- **SSR 支持**: 所有组件支持服务器端渲染
- **构建优化**: 自动代码分割和优化
- **主题集成**: 与 Docusaurus 主题系统集成

## 📚 最佳实践

### 1. 性能优化

- 使用 `React.memo` 优化重复渲染
- 合理使用 `useCallback` 和 `useMemo`
- 图片懒加载和压缩

### 2. 可访问性

- 添加适当的 ARIA 标签
- 确保键盘导航支持
- 提供良好的色彩对比度

### 3. 代码质量

- 使用 TypeScript 提供类型安全
- 编写单元测试
- 遵循 ESLint 规范

## 🔗 相关文档

- [📄 页面组件详细文档](./pages)
- [🎯 交互组件使用指南](./interactive)
- [🛠️ 开发指南](../development)

---

*想要贡献新组件？查看开发指南或提出 Issue！*
