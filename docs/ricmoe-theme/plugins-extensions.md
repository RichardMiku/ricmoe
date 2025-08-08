# 插件和扩展

RicMoe 主题支持多种插件和扩展，让你可以轻松集成第三方服务和添加额外功能。

## 🧩 集成的插件

### 1. Waline 评论系统

**功能**: 现代化的评论系统，支持多种登录方式和丰富的功能。

**配置位置**: `src/components/WalineComment/`

```typescript
// 基本配置示例
const walineConfig = {
  serverURL: 'https://your-waline-server.vercel.app',
  lang: 'zh-cn',
  dark: 'auto',
  emoji: ['//unpkg.com/@waline/emojis@1.1.0/weibo'],
  requiredMeta: ['nick', 'mail'],
  wordLimit: [0, 1000],
}
```

**特性**:
- 🔐 多种登录方式（微信、QQ、GitHub 等）
- 😊 表情包支持
- 🎨 暗黑模式适配
- 📱 移动端优化
- 🛡️ 垃圾评论过滤

### 2. Framer Motion 动画

**功能**: 为页面添加流畅的动画效果。

**使用示例**:
```typescript
import { motion } from 'framer-motion';

const variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
}

<motion.div
  custom={index}
  initial="hidden"
  animate="visible" 
  variants={variants}
>
  {content}
</motion.div>
```

### 3. Algolia DocSearch

**功能**: 强大的全站搜索功能。

**配置**: 在 `docusaurus.config.ts` 中配置
```typescript
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY', 
  indexName: 'YOUR_INDEX_NAME',
  contextualSearch: true,
  searchPagePath: 'search',
}
```

### 4. 微信 JSAPI 集成

**功能**: 微信分享功能和 JSAPI Ticket 自动更新。

**配置文件**: 
- `WeChatAccess.py` - Python 自动更新脚本
- `static/js-helper/wx-share.js` - 前端分享脚本
- `static/js-helper/pure-sign.js` - 签名生成

**自动更新**: 通过 GitHub Actions 定期更新 access_token

## 🔌 可选扩展

### 1. Cloudflare Turnstile

**功能**: 人机验证，保护网站安全。

**集成位置**: `src/components/CloudflareTurnstile/`

```typescript
interface TurnstileProps {
  siteKey: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  onVerify?: (token: string) => void;
}
```

### 2. Google Analytics

**安装**:
```bash
npm install --save @docusaurus/plugin-google-gtag
```

**配置**:
```typescript
plugins: [
  [
    '@docusaurus/plugin-google-gtag',
    {
      trackingID: 'G-XXXXXXXXXX',
      anonymizeIP: true,
    },
  ],
]
```

### 3. PWA 支持

**安装**:
```bash
npm install --save @docusaurus/plugin-pwa
```

**配置**:
```typescript
plugins: [
  [
    '@docusaurus/plugin-pwa',
    {
      debug: true,
      offlineModeActivationStrategies: [
        'appInstalled',
        'standalone',
        'queryString',
      ],
      pwaHead: [
        {
          tagName: 'link',
          rel: 'icon',
          href: '/img/logo.png',
        },
        {
          tagName: 'link',
          rel: 'manifest',
          href: '/manifest.json',
        },
        {
          tagName: 'meta',
          name: 'theme-color',
          content: 'rgb(37, 194, 160)',
        },
      ],
    },
  ],
]
```

### 4. 内容搜索增强

**安装本地搜索**:
```bash
npm install --save @easyops-cn/docusaurus-search-local
```

**配置**:
```typescript
themes: [
  [
    '@easyops-cn/docusaurus-search-local',
    {
      hashed: true,
      language: ['en', 'zh'],
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
    },
  ],
]
```

## 🛠️ 自定义插件开发

### 插件结构

```typescript
// plugins/my-plugin/index.js
module.exports = function(context, options) {
  return {
    name: 'my-plugin',
    configureWebpack(config, isServer) {
      // 修改 webpack 配置
    },
    getThemePath() {
      // 返回主题路径
    },
    getTypeScriptThemePath() {
      // 返回 TypeScript 主题路径
    },
  };
};
```

### 生命周期钩子

```typescript
module.exports = function(context, options) {
  return {
    name: 'my-plugin',
    
    async loadContent() {
      // 加载内容
    },
    
    async contentLoaded({content, actions}) {
      // 内容加载完成后
      const {addRoute, createData} = actions;
    },
    
    configureWebpack(config, isServer, utils) {
      // 配置 webpack
    },
  };
};
```

## 🎨 主题扩展

### Swizzling 组件

使用 Docusaurus 的 swizzling 功能自定义组件：

```bash
# 查看可 swizzle 的组件
npm run swizzle

# swizzle 特定组件
npm run swizzle @docusaurus/theme-classic NavbarItem/DefaultNavbarItem
```

### 自定义 CSS

在 `src/css/custom.css` 中添加自定义样式：

```css
/* 自定义主色调 */
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
}

/* 自定义组件样式 */
.custom-hero {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .custom-hero {
    padding: 2rem 1rem;
  }
}
```

### 自定义 React 组件

创建可复用的 React 组件：

```typescript
// src/components/CustomCard/index.tsx
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface CustomCardProps {
  title: string;
  description: string;
  className?: string;
}

export default function CustomCard({
  title, 
  description, 
  className
}: CustomCardProps) {
  return (
    <div className={clsx(styles.card, className)}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

## 📦 推荐插件列表

### 内容增强
- **@docusaurus/plugin-content-blog** - 博客功能
- **@docusaurus/plugin-content-docs** - 文档功能  
- **docusaurus-plugin-sass** - Sass 支持
- **@docusaurus/plugin-ideal-image** - 图片优化

### SEO 和分析
- **@docusaurus/plugin-sitemap** - 生成站点地图
- **@docusaurus/plugin-google-gtag** - Google Analytics
- **docusaurus-plugin-baidu-analytics** - 百度统计

### 开发体验
- **@docusaurus/plugin-debug** - 调试工具
- **docusaurus-plugin-typedoc** - TypeDoc 集成
- **docusaurus-lunr-search** - 本地搜索

### 社交功能
- **docusaurus-plugin-openapi-docs** - OpenAPI 文档
- **docusaurus-plugin-remote-content** - 远程内容
- **docusaurus2-dotenv** - 环境变量支持

## 🔧 插件配置最佳实践

### 1. 性能优化
- 只加载需要的插件
- 使用懒加载减少初始包大小
- 配置适当的缓存策略

### 2. 开发环境
- 在开发环境禁用不必要的插件
- 使用热重载提高开发效率

### 3. 生产环境
- 启用压缩和优化
- 配置适当的分析工具
- 设置错误监控

### 4. 安全考虑
- 定期更新插件版本
- 检查插件的安全性
- 使用可信的插件源

## 🚀 部署优化

### 构建优化
```typescript
// 生产环境配置
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    // 只在生产环境启用的插件
    isProd && ['@docusaurus/plugin-google-gtag', options],
  ].filter(Boolean),
}
```

### Bundle 分析
```bash
# 分析构建包大小
ANALYZE=true npm run build
```

---

通过合理使用插件和扩展，你可以大大增强 RicMoe 主题的功能和用户体验。记住始终测试新插件的兼容性，并在生产环境中监控性能影响。
