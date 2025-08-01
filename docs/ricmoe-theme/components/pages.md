# 📄 页面组件

详细介绍 RicMoe 主题中各个页面组件的功能、配置和使用方法。

## 🏠 首页组件 (index.tsx)

### 功能概览

首页是整个网站的入口，展示网站的核心信息和特色功能。

**位置**: `src/pages/index.tsx`

### 组件结构

```tsx
export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
```

### 核心模块

#### 1. HomepageHeader 头部区域

- **Hero 横幅**: 主标题和副标题展示
- **打字效果**: 使用 `TypeEffectSubtitle` 组件
- **行动按钮**: 引导用户进入文档或体验功能

#### 2. HomepageFeatures 特性展示

- **三栏布局**: 展示网站三大核心特性
- **图标+文字**: 直观的特性说明
- **响应式设计**: 移动端自动适配

### 自定义配置

**修改特性内容**: 编辑 `data/Features.tsx`

```tsx
export const FeatureList: FeatureItem[] = [
  {
    title: '特性标题',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        特性描述内容
      </>
    ),
  },
  // 更多特性...
];
```

## 📝 关于页面 (about)

### 功能概览

展示个人信息、技能专长和联系方式的专门页面。

**位置**: `src/pages/about/`

### 页面特性

- **个人简介**: Markdown 支持的详细介绍
- **技能展示**: 可视化技能等级
- **项目经历**: 时间轴式项目展示
- **联系方式**: 多种联系方式集合

### 内容管理

页面内容通过 Markdown 文件管理，支持：

- 富文本格式
- 代码高亮
- 图片插入
- 链接跳转

## 🔗 友链页面 (links)

### 功能概览

展示和管理友情链接的专门页面，支持分类展示和状态检测。

**位置**: `src/pages/links/`

### 核心功能

#### 1. 友链展示

- **卡片式布局**: 每个友链独立卡片
- **头像展示**: 支持友链站点头像
- **基本信息**: 站点名称、描述、链接
- **分类标签**: 友链分类管理

#### 2. 数据管理

**友链数据**: 存储在 `data/Links.tsx`

```tsx
export interface LinkItem {
  name: string;
  desc: string;
  url: string;
  avatar: string;
  category?: string;
}

export const LinksList: LinkItem[] = [
  {
    name: '站点名称',
    desc: '站点描述',
    url: 'https://example.com',
    avatar: '/img/links/example.png',
    category: '技术博客'
  },
  // 更多友链...
];
```

#### 3. 分类筛选

- **全部**: 显示所有友链
- **按分类**: 根据 category 字段筛选
- **动态切换**: JavaScript 实现前端筛选

### 友链申请

页面底部提供友链申请说明：

1. **申请要求**: 网站质量和更新频率要求
2. **申请方式**: GitHub Issue 或邮件联系
3. **互链原则**: 先友后链的基本原则

## ⏰ 时刻页面 (moments)

### 功能概览

展示动态内容和时刻分享的核心功能页面。

**位置**: `src/pages/moments/`

### 核心功能

#### 1. 时刻展示

- **时间轴布局**: 按时间倒序排列
- **富媒体支持**: 文字、图片、链接
- **动态分类**: 支持多种内容分类
- **响应式卡片**: 移动端优化显示

#### 2. 交互功能

- **分类筛选**: 按类型筛选时刻内容
- **搜索功能**: 关键词搜索
- **加载更多**: 分页加载机制
- **动态按钮**: 实时交互反馈

#### 3. 数据管理

**时刻数据**: 存储在 `data/Moments.tsx`

```tsx
export interface MomentItem {
  id: string;
  content: string;
  timestamp: string;
  category: string;
  images?: string[];
  links?: LinkInfo[];
}

export const MomentsList: MomentItem[] = [
  {
    id: '1',
    content: '时刻内容',
    timestamp: '2024-01-01T00:00:00Z',
    category: 'life',
    images: ['/img/moments/photo1.jpg']
  },
  // 更多时刻...
];
```

### 详细功能说明

查看 [Moments 系统文档](../moments) 了解完整功能和配置。

## 💬 反馈页面 (feedback)

### 功能概览

收集用户反馈和建议的专门页面，集成安全验证功能。

**位置**: `src/pages/feedback/`

### 核心功能

#### 1. 反馈表单

- **多字段输入**: 姓名、邮箱、反馈类型、内容
- **表单验证**: 客户端和服务端双重验证
- **文件上传**: 支持截图和附件上传
- **格式化输入**: Markdown 支持的富文本输入

#### 2. 安全验证

集成 Cloudflare Turnstile 组件：

```tsx
import CloudflareTurnstile from '@site/src/components/CloudflareTurnstile';

<CloudflareTurnstile
  sitekey="your-turnstile-sitekey"
  onVerify={handleVerify}
  onError={handleError}
/>
```

#### 3. 数据处理

- **表单提交**: 异步 AJAX 提交
- **数据验证**: 服务端数据格式验证
- **反馈确认**: 提交成功后的确认信息
- **错误处理**: 完善的错误提示机制

### 配置说明

#### Turnstile 配置

在 `feedback` 页面中配置 Cloudflare Turnstile：

1. 获取 Turnstile Site Key
2. 配置验证回调函数
3. 处理验证结果

## 🎨 页面样式规范

### 1. 布局一致性

所有页面遵循统一的布局规范：

- **容器最大宽度**: 1200px
- **内容边距**: 左右 20px
- **区块间距**: 上下 40px

### 2. 响应式断点

```css
/* 移动端 */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}

/* 平板端 */
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    padding: 0 32px;
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .container {
    padding: 0 48px;
  }
}
```

### 3. 主题色彩

- **主色**: `var(--ifm-color-primary)`
- **背景色**: `var(--ifm-background-color)`
- **文字色**: `var(--ifm-font-color-base)`
- **边框色**: `var(--ifm-color-emphasis-300)`

## 📱 移动端优化

### 1. 触摸友好

- **按钮大小**: 最小 44px × 44px
- **间距适配**: 增加移动端触摸间距
- **手势支持**: 滑动和点击手势

### 2. 性能优化

- **图片懒加载**: Intersection Observer API
- **代码分割**: React.lazy 动态导入
- **缓存策略**: Service Worker 缓存

### 3. 用户体验

- **加载状态**: 显示加载动画
- **错误提示**: 友好的错误信息
- **离线支持**: PWA 离线功能

## 🔧 开发和维护

### 1. 页面创建

创建新页面的标准流程：

1. 在 `src/pages/` 创建页面目录
2. 创建 `index.tsx` 主文件
3. 添加 `styles.module.css` 样式文件
4. 更新导航配置

### 2. 数据管理

- **静态数据**: 存储在 `data/` 目录
- **动态数据**: 通过 API 获取
- **缓存策略**: 合理使用浏览器缓存

### 3. SEO 优化

- **页面标题**: 动态设置页面 title
- **Meta 描述**: 添加页面描述
- **结构化数据**: JSON-LD 格式的结构化数据

## 🔗 相关文档

- [🎨 主题组件概览](./overview)
- [🎯 交互组件使用指南](./interactive)
- [⏰ Moments 系统文档](../moments)

---

*需要自定义页面？查看开发指南或参考现有页面实现！*
