# 🎨 RicMoe Personal Website

基于 Docusaurus 3 构建的现代化个人网站，集成了博客、文档、时刻分享和微信集成等功能。

## ✨ 项目特色

### 🎯 核心功能
- **📝 博客系统** - 支持 MDX 格式的文章发布
- **📚 文档系统** - 完整的主题使用文档
- **⏰ Moments 系统** - 时刻分享和动态展示
- **💬 微信集成** - 自动化 JSAPI Ticket 更新和分享功能
- **🔗 友链管理** - 友情链接展示和管理
- **📱 PWA 支持** - 渐进式 Web 应用体验

### 🛠️ 技术栈
- **框架**: Docusaurus 3.x
- **前端**: React 18 + TypeScript
- **样式**: CSS Modules + CSS Variables
- **构建**: Webpack 5 + Babel
- **部署**: GitHub Actions + GitHub Pages
- **集成**: 微信 JS-SDK + Cloudflare Turnstile

## 🚀 快速开始

### 环境要求
- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器

### 安装和运行

```bash
# 克隆项目
git clone https://github.com/RichardMiku/ricmoe-docusaurus.git
cd ricmoe-docusaurus

# 安装依赖
npm install

# 启动开发服务器
npm start
```

开发服务器将在 `http://localhost:3000` 启动。

### 构建和部署

```bash
# 构建项目
npm run build

# 预览构建结果
npm run serve

# 部署到 GitHub Pages
npm run deploy
```

## 📁 项目结构

```
ricmoe-docusaurus/
├── 📁 .github/workflows/    # GitHub Actions 工作流
├── 📁 blog/                 # 博客文章
├── 📁 docs/                 # 文档内容
├── 📁 data/                 # 数据配置文件
├── 📁 i18n/                 # 国际化语言包
├── 📁 src/                  # 源代码
│   ├── components/          # React 组件
│   ├── pages/              # 页面组件
│   ├── css/                # 全局样式
│   └── theme/              # 主题定制
├── 📁 static/               # 静态资源
├── 📁 reports/              # 项目报告文件
├── 📄 docusaurus.config.ts  # Docusaurus 配置
├── 📄 sidebars.ts           # 侧边栏配置
└── 📄 package.json          # 项目依赖
```

## 📖 文档

完整的使用文档请访问：`/docs/ricmoe-theme/`

### 📚 主要文档模块

- **⏰ [Moments 系统](./docs/ricmoe-theme/moments/)** - 时刻分享功能详解
- **💬 [微信集成](./docs/ricmoe-theme/wechat/)** - 微信分享和 JSAPI 配置
- **🧩 [组件系统](./docs/ricmoe-theme/components/)** - 可复用组件使用指南
- **🛠️ [开发指南](./docs/ricmoe-theme/development/)** - 架构、构建和部署

## 🔧 配置说明

### 环境变量配置

项目需要配置以下环境变量（用于 GitHub Actions）：

```env
WECHAT_APP_ID=your_wechat_app_id
WECHAT_APP_SECRET=your_wechat_app_secret
```

### 微信集成配置

1. 在微信公众平台配置 JS 安全域名
2. 在 GitHub 仓库设置中添加相应的 Secrets
3. GitHub Actions 会自动更新 JSAPI Ticket

详细配置请参考：[微信集成文档](./docs/ricmoe-theme/wechat/)

## 🎨 自定义配置

### 数据配置

- **特性配置**: `data/Features.tsx`
- **友链配置**: `data/Links.tsx`  
- **时刻配置**: `data/Moments.tsx`

### 样式定制

- **全局样式**: `src/css/custom.css`
- **组件样式**: `src/components/*/styles.module.css`
- **主题覆盖**: `src/theme/`

### 内容管理

- **博客文章**: `blog/` 目录
- **文档内容**: `docs/` 目录
- **静态资源**: `static/` 目录

## 🌍 多语言支持

项目支持中文（简体）和英文两种语言：

```bash
# 生成翻译文件
npm run write-translations

# 构建指定语言
npm run build -- --locale en-US
```

## 📱 PWA 功能

网站支持 PWA 功能，包括：

- 离线访问
- 应用安装
- 推送通知
- 后台同步

## 🔒 安全特性

- **内容安全策略** (CSP)
- **Cloudflare Turnstile** 人机验证
- **HTTPS 强制重定向**
- **安全响应头**

## 📊 性能优化

- **代码分割** - 自动按路由分割
- **图片优化** - 支持 WebP 格式和懒加载
- **缓存策略** - 静态资源长期缓存
- **CDN 加速** - Azure Static Website App

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支
3. 提交代码变更
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源。详情请查看 [LICENSE](LICENSE) 文件。

## 🔗 相关链接

- **在线预览**: [RICMOE](https://www.ric.moe)
- **项目仓库**: [https://github.com/RichardMiku/ricmoe-docusaurus](https://github.com/RichardMiku/ricmoe-docusaurus)
- **问题反馈**: [GitHub Issues](https://github.com/RichardMiku/ricmoe-docusaurus/issues)
- **功能建议**: [GitHub Discussions](https://github.com/RichardMiku/ricmoe-docusaurus/discussions)

## 📞 联系方式

- **作者**: RichardMiku
- **邮箱**: [mail@ric.moe]
- **主页**: [https://www.ric.moe](https://www.ric.moe)

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
