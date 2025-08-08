# 部署和运维指南

本指南将详细介绍如何部署和维护 RicMoe 主题项目，包括不同的部署方案、自动化流程和运维最佳实践。

## 🚀 部署方案

### 1. GitHub Pages 部署（推荐）

**优势**: 免费、自动化、与 GitHub 集成良好

**配置步骤**:

1. **设置 GitHub Actions**

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

2. **配置 docusaurus.config.ts**:

```typescript
const config: Config = {
  url: 'https://yourusername.github.io',
  baseUrl: '/your-repo-name/',
  organizationName: 'yourusername',
  projectName: 'your-repo-name',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
};
```

3. **启用 GitHub Pages**:
   - 进入仓库设置
   - 选择 Pages 选项
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "gh-pages"

### 2. Vercel 部署

**优势**: 极快的 CDN、自动 HTTPS、预览部署

**部署步骤**:

1. 连接 GitHub 仓库到 Vercel
2. 设置构建命令: `npm run build`
3. 设置输出目录: `build`
4. 配置环境变量（如需要）

**vercel.json 配置**:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm run start",
  "installCommand": "npm ci"
}
```

### 3. Netlify 部署

**优势**: 强大的表单处理、Edge Functions、分支预览

**部署步骤**:

1. 连接 GitHub 仓库
2. 设置构建命令: `npm run build`
3. 发布目录: `build`

**netlify.toml 配置**:

```toml
[build]
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 4. 服务器部署

**适用场景**: 需要更多控制权、自定义域名、服务器端功能

**部署步骤**:

```bash
# 1. 安装 Node.js 和 npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 克隆项目
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# 3. 安装依赖
npm ci

# 4. 构建项目
npm run build

# 5. 使用 nginx 或 apache 服务静态文件
sudo cp -r build/* /var/www/html/
```

**Nginx 配置示例**:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 设置缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔄 自动化工作流

### 1. 微信 JSAPI Ticket 自动更新

**GitHub Actions 配置**:

```yaml
name: Update JSAPI Ticket

on:
  schedule:
    - cron: '0 */2 * * *'  # 每2小时执行一次
  workflow_dispatch:

jobs:
  update-ticket:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
          
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          
      - name: Update JSAPI Ticket
        env:
          WECHAT_APPID: ${{ secrets.WECHAT_APPID }}
          WECHAT_SECRET: ${{ secrets.WECHAT_SECRET }}
        run: |
          python WeChatAccess.py
          
      - name: Commit and push if changed
        run: |
          git config --global user.name 'GitHub Action'
          git config --global user.email 'action@github.com'
          git add -A
          git diff --staged --quiet || (git commit -m "Auto update JSAPI ticket" && git push)
```

### 2. 依赖更新自动化

**Dependabot 配置** (`.github/dependabot.yml`):

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "monthly"
```

### 3. 代码质量检查

**ESLint + Prettier 集成**:

```yaml
name: Code Quality

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
          
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run format:check
```

## 📊 监控和分析

### 1. 性能监控

**Google PageSpeed Insights 集成**:

```yaml
name: Performance Audit

on:
  schedule:
    - cron: '0 0 * * 0'  # 每周运行
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - name: Audit URLs using Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://your-site.com
            https://your-site.com/docs
            https://your-site.com/blog
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### 2. 链接检查

**自动检查失效链接**:

```yaml
name: Check Links

on:
  schedule:
    - cron: '0 0 * * 0'  # 每周检查
  workflow_dispatch:

jobs:
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check links
        uses: gaurav-nelson/github-action-markdown-link-check@v1
        with:
          use-quiet-mode: 'yes'
          use-verbose-mode: 'yes'
          config-file: '.github/workflows/link-check-config.json'
```

### 3. SEO 优化检查

**SEO 分析自动化**:

```bash
# 安装 SEO 分析工具
npm install -g lighthouse lighthouse-cli

# 运行 SEO 分析
lighthouse https://your-site.com --only-categories=seo --output=html --output-path=./seo-report.html
```

## 🛡️ 安全最佳实践

### 1. 环境变量管理

**在 GitHub Secrets 中存储敏感信息**:

- `WECHAT_APPID` - 微信应用 ID
- `WECHAT_SECRET` - 微信应用密钥
- `ALGOLIA_API_KEY` - Algolia 搜索 API 密钥

**在代码中使用**:

```typescript
const config = {
  algolia: {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
  }
};
```

### 2. 内容安全策略 (CSP)

**配置 CSP 头**:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               font-src 'self' https://fonts.gstatic.com;">
```

### 3. HTTPS 强制跳转

**Nginx 配置**:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # SSL 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
}
```

## 📈 性能优化

### 1. 构建优化

**Webpack Bundle Analyzer**:

```bash
npm install --save-dev webpack-bundle-analyzer
ANALYZE=true npm run build
```

**代码分割优化**:

```typescript
// 动态导入
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 路由级别的代码分割
const routes = [
  {
    path: '/moments',
    component: React.lazy(() => import('./pages/moments')),
  },
];
```

### 2. 图片优化

**自动图片压缩**:

```bash
# 安装 imagemin
npm install --save-dev imagemin imagemin-webp imagemin-mozjpeg imagemin-pngquant

# 构建脚本
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

(async () => {
  await imagemin(['static/img/*.{jpg,png}'], {
    destination: 'static/img/optimized',
    plugins: [
      imageminWebp({quality: 75})
    ]
  });
})();
```

### 3. CDN 集成

**配置 CDN 加速**:

```typescript
const config: Config = {
  staticDirectories: ['static'],
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/library@version/dist/library.min.js',
      async: true,
    },
  ],
};
```

## 🔧 故障排查

### 1. 常见构建错误

**内存不足**:

```bash
# 增加 Node.js 内存限制
NODE_OPTIONS="--max_old_space_size=4096" npm run build
```

**依赖冲突**:

```bash
# 清理依赖缓存
rm -rf node_modules package-lock.json
npm install
```

### 2. 部署问题

**路径问题**:

```typescript
// 检查 baseUrl 配置
const config: Config = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/repo-name/' : '/',
};
```

**静态资源加载失败**:

```bash
# 检查静态资源路径
ls -la static/
```

### 3. 性能问题

**Bundle 体积过大**:

```bash
# 分析 bundle 大小
npm run build -- --analyze
```

**运行时性能问题**:

```javascript
// 使用 React DevTools Profiler
// 检查组件重渲染
console.time('component-render');
// ... 组件逻辑
console.timeEnd('component-render');
```

## 📋 运维检查清单

### 日常维护
- [ ] 检查网站可访问性
- [ ] 验证关键功能正常
- [ ] 监控构建状态
- [ ] 检查错误日志

### 每周维护
- [ ] 更新依赖包
- [ ] 检查安全漏洞
- [ ] 性能监控分析
- [ ] 备份重要数据

### 每月维护
- [ ] 全面安全审计
- [ ] 性能优化分析
- [ ] 用户反馈收集
- [ ] 服务器资源监控

---

通过遵循这些部署和运维最佳实践，你可以确保 RicMoe 主题项目稳定、安全、高效地运行。记住定期监控和更新，保持项目的健康状态。
