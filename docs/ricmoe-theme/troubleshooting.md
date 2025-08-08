# 故障排查和常见问题

本文档收集了使用 RicMoe 主题时可能遇到的常见问题和解决方案。

## 🚨 构建错误

### 1. Node.js 版本不兼容

**错误信息**:
```
error @docusaurus/core@3.8.1: The engine "node" is incompatible with this module.
```

**解决方案**:
- 确保使用 Node.js >= 18.0
- 使用 nvm 切换 Node.js 版本:

```bash
# 安装并使用 Node.js 18
nvm install 18
nvm use 18

# 验证版本
node --version  # 应该显示 v18.x.x
```

### 2. 内存不足错误

**错误信息**:
```
JavaScript heap out of memory
```

**解决方案**:

```bash
# 临时增加内存限制
NODE_OPTIONS="--max_old_space_size=4096" npm run build

# 或者在 package.json 中设置
{
  "scripts": {
    "build": "NODE_OPTIONS='--max_old_space_size=4096' docusaurus build"
  }
}
```

### 3. 依赖冲突

**错误信息**:
```
npm ERR! peer dep missing: react@^18.0.0
```

**解决方案**:

```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 或强制安装（谨慎使用）
npm install --force
```

### 4. TypeScript 类型错误

**错误信息**:
```
Property 'customProp' does not exist on type 'ThemeConfig'
```

**解决方案**:

扩展类型定义:

```typescript
// types/index.d.ts
declare module '@docusaurus/theme-common' {
  interface ExtendedThemeConfig {
    subtitleConfig?: {
      effect: boolean;
      loop: boolean;
      // ... 其他属性
    };
  }
}
```

## ⚡ 运行时错误

### 1. 微信分享不生效

**问题描述**: 微信分享时显示默认信息，不显示自定义内容。

**排查步骤**:

1. **检查 JSAPI Ticket 是否有效**:

```javascript
// 在浏览器控制台执行
console.log(window.wxShare);
console.log(window.jsapi_ticket);
```

2. **验证域名配置**:
   - 确保微信公众号后台已配置 JS 安全域名
   - 域名需要与访问域名完全一致（不含协议和端口）

3. **检查签名生成**:

```javascript
// 检查签名参数
const params = {
  jsapi_ticket: 'your_ticket',
  noncestr: 'random_string', 
  timestamp: Math.floor(Date.now() / 1000),
  url: window.location.href.split('#')[0]
};
console.log('签名参数:', params);
```

### 2. Moments 卡片按钮无响应

**问题描述**: 点击 Moments 卡片上的按钮没有反应。

**排查步骤**:

1. **检查按钮配置**:

```typescript
// 确保按钮有正确的 action 配置
const moment: MomentProps = {
  // ... 其他属性
  buttons: [
    {
      text: '了解更多',
      action: {
        type: 'link',
        target: 'https://example.com'
      }
    }
  ]
};
```

2. **检查事件处理函数**:

```typescript
// 在 data/Moments/actions.ts 中检查
export const handleButtonClick = (action: ButtonAction) => {
  console.log('Button clicked:', action);
  // ... 处理逻辑
};
```

### 3. 搜索功能无法使用

**问题描述**: Algolia 搜索框无法正常工作。

**排查步骤**:

1. **检查 Algolia 配置**:

```typescript
// docusaurus.config.ts
algolia: {
  appId: 'YOUR_APP_ID',          // 检查是否正确
  apiKey: 'YOUR_SEARCH_API_KEY', // 使用 Search API Key，不是 Admin API Key  
  indexName: 'YOUR_INDEX_NAME',  // 检查索引名称
  contextualSearch: true,
}
```

2. **验证索引状态**:
   - 登录 Algolia 控制台
   - 检查索引是否存在且有数据
   - 确认爬虫配置正确运行

3. **检查网络连接**:

```javascript
// 在浏览器控制台测试
fetch('https://YOUR_APP_ID-dsn.algolia.net/1/indexes/YOUR_INDEX_NAME/query', {
  method: 'POST',
  headers: {
    'X-Algolia-API-Key': 'YOUR_SEARCH_API_KEY',
    'X-Algolia-Application-Id': 'YOUR_APP_ID',
  },
  body: JSON.stringify({ query: 'test' })
}).then(r => r.json()).then(console.log);
```

## 🎨 样式问题

### 1. 暗黑模式样式异常

**问题描述**: 切换到暗黑模式时部分元素显示异常。

**解决方案**:

确保 CSS 变量正确定义:

```css
/* src/css/custom.css */
:root {
  --ifm-color-primary: #2e8555;
  /* 其他亮色模式变量 */
}

[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  /* 确保所有变量都有暗色版本 */
  --custom-background: #1b1b1d;
  --custom-text: #ffffff;
}

/* 使用变量而不是硬编码颜色 */
.my-component {
  background-color: var(--custom-background);
  color: var(--custom-text);
}
```

### 2. 移动端布局问题

**问题描述**: 在移动设备上布局错乱或元素溢出。

**解决方案**:

1. **添加响应式断点**:

```css
/* 移动端优先设计 */
.my-component {
  width: 100%;
  padding: 1rem;
}

/* 平板端调整 */
@media (min-width: 768px) {
  .my-component {
    width: 50%;
    padding: 2rem;
  }
}

/* 桌面端调整 */
@media (min-width: 1024px) {
  .my-component {
    width: 33.333%;
    padding: 3rem;
  }
}
```

2. **检查容器宽度**:

```css
/* 确保容器不会超出视口 */
.container {
  max-width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
}
```

### 3. Framer Motion 动画卡顿

**问题描述**: 页面动画不流畅或有延迟。

**解决方案**:

1. **优化动画配置**:

```typescript
const optimizedVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,      // 增加阻尼减少弹跳
      stiffness: 100,   // 调整刚度
      duration: 0.3,    // 缩短动画时间
    },
  },
  hidden: { 
    opacity: 0, 
    y: 30,
    transition: { duration: 0.2 } // 添加退出动画
  },
}
```

2. **启用 GPU 加速**:

```css
.animated-element {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}
```

## 📱 部署问题

### 1. GitHub Pages 部署失败

**问题描述**: GitHub Actions 构建失败或部署后页面空白。

**解决方案**:

1. **检查 baseUrl 配置**:

```typescript
// docusaurus.config.ts
const config: Config = {
  url: 'https://yourusername.github.io',
  baseUrl: '/your-repo-name/',  // 注意前后斜杠
  organizationName: 'yourusername',
  projectName: 'your-repo-name',
  trailingSlash: false,
};
```

2. **检查 GitHub Actions 权限**:
   - 进入仓库设置 → Actions → General
   - 确保 "Workflow permissions" 设置为 "Read and write permissions"

3. **验证构建输出**:

```bash
# 本地测试构建
npm run build
npm run serve

# 检查生成的文件
ls -la build/
```

### 2. 自定义域名 HTTPS 问题

**问题描述**: 使用自定义域名时 HTTPS 证书无效。

**解决方案**:

1. **添加 CNAME 文件**:

```bash
# static/CNAME
yourdomain.com
```

2. **等待 DNS 生效**:
   - DNS 更改可能需要 24-48 小时生效
   - 使用 `nslookup yourdomain.com` 检查 DNS 解析

3. **强制刷新 HTTPS 设置**:
   - 在 GitHub Pages 设置中取消勾选 "Enforce HTTPS"
   - 等待几分钟后重新勾选

### 3. Vercel 部署环境变量问题

**问题描述**: 环境变量在 Vercel 上不生效。

**解决方案**:

1. **在 Vercel 控制台设置环境变量**:
   - 进入项目设置 → Environment Variables
   - 添加所需的环境变量

2. **检查环境变量前缀**:

```typescript
// 只有 NEXT_PUBLIC_ 前缀的变量在客户端可用
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;

// 或使用 Docusaurus 的环境变量方式
const config = {
  customFields: {
    algoliaApiKey: process.env.ALGOLIA_API_KEY,
  },
};
```

## 🔧 性能问题

### 1. 首次加载时间过长

**问题描述**: 网站首次访问加载很慢。

**优化方案**:

1. **代码分割**:

```typescript
// 懒加载组件
const LazyMoments = React.lazy(() => import('./components/Moments'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyMoments />
    </React.Suspense>
  );
}
```

2. **图片优化**:

```markdown
<!-- 使用 WebP 格式 -->
![alt text](./image.webp)

<!-- 添加 loading="lazy" -->
<img src="./image.jpg" loading="lazy" alt="description" />
```

3. **移除未使用的依赖**:

```bash
# 分析 bundle 大小
npm run build -- --analyze

# 移除未使用的包
npm uninstall unused-package
```

### 2. 搜索响应慢

**问题描述**: Algolia 搜索结果返回很慢。

**优化方案**:

1. **优化搜索配置**:

```typescript
algolia: {
  // 限制搜索结果数量
  searchParameters: {
    hitsPerPage: 10,
    attributesToRetrieve: ['title', 'content', 'url'],
  },
  // 启用缓存
  contextualSearch: true,
}
```

2. **添加搜索防抖**:

```javascript
// 自定义搜索组件中添加防抖
import { debounce } from 'lodash';

const debouncedSearch = debounce((query) => {
  // 执行搜索
}, 300);
```

## 📋 排查检查清单

### 构建问题
- [ ] 检查 Node.js 版本 (>= 18.0)
- [ ] 清理 node_modules 和重新安装
- [ ] 检查 TypeScript 配置
- [ ] 验证依赖版本兼容性

### 运行时问题
- [ ] 检查浏览器控制台错误
- [ ] 验证网络请求状态
- [ ] 检查环境变量配置
- [ ] 测试不同浏览器兼容性

### 部署问题
- [ ] 验证构建配置
- [ ] 检查部署平台设置
- [ ] 确认域名和 DNS 配置
- [ ] 测试 HTTPS 证书

### 性能问题
- [ ] 分析 bundle 大小
- [ ] 检查图片和资源大小
- [ ] 验证缓存策略
- [ ] 监控网络请求

## 🆘 获取帮助

如果以上解决方案都无法解决你的问题，可以通过以下方式获取帮助:

1. **查看项目 Issues**: [GitHub Issues](https://github.com/RichardMiku/ricmoe-docusaurus/issues)
2. **提交新问题**: 详细描述问题、错误信息和环境信息
3. **参考 Docusaurus 官方文档**: [Docusaurus Docs](https://docusaurus.io/docs)
4. **社区讨论**: [Docusaurus Discord](https://discord.gg/docusaurus)

**提问时请包含以下信息**:
- 操作系统和版本
- Node.js 和 npm 版本
- 错误信息和堆栈跟踪
- 重现步骤
- 相关配置文件

---

记住，大部分问题都有解决方案，关键是系统性地排查和定位问题。保持耐心，逐步排除可能的原因，通常都能找到解决办法。
